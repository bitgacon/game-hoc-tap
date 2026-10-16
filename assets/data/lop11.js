/* ================================================================
   GAME HỌC TẬP — FILE DỮ LIỆU RIÊNG LỚP 11 (assets/data/lop11.js)
   Nạp động SAU trang vỏ (bản master đã chạy xong), đăng kí GRADES[11]
   theo đúng khuôn các khối lớp 6–9 của engine:
   - chủ đề = { id, emoji, name, sub, pools: { choose, blank, match, games } }
   - facts  = [câu hỏi, đáp án ĐÚNG (≤ 60 ký tự), đáp án sai 1, đáp án sai 2, giải thích]
   - Kiến thức cần ghi nhớ gắn thẳng vào t.knowledge đúng cấu trúc
     showKnowledge() đọc: { facts: [{q,a,wrongs,ex,visual}], pairs, unit, examples }
   Mọi đáp án sai phải khác đáp án đúng sau chuẩn hoá của engine.
   ================================================================ */
(function () {
  "use strict";
  if (typeof GRADES === "undefined" || !GRADES || GRADES[11]) return;

  /* ---------- tiện ích cục bộ ---------- */
  // pools từ facts + bảng cặp, theo khuôn knowledgePools của engine
  function KP(facts, pairs, mp) { return knowledgePools(facts, pairs || [], mp || "Nối cho đúng nhé!"); }
  // gộp hai bộ pools (vd: facts + bộ sinh mẫu)
  function MP(base, extra) {
    var out = { choose: [], blank: [], match: [], games: [] };
    [base, extra].forEach(function (p) {
      if (!p) return;
      ["choose", "blank", "match", "games"].forEach(function (k) { out[k] = out[k].concat(p[k] || []); });
    });
    if (base && base.referenceFacts) Object.defineProperty(out, "referenceFacts", { value: base.referenceFacts });
    return out;
  }
  // đối tượng kiến thức cho showKnowledge
  function KN(facts, pairs, subjName, unit) {
    return {
      facts: (facts || []).map(function (f) {
        return { q: f[0], a: f[1], wrongs: [f[2], f[3]].filter(Boolean), ex: f[4] || "", visual: "", id: "fact|" + f[0], src: "ref" };
      }),
      pairs: (pairs || []).map(function (p) { return [p[0], p[1]]; }),
      unit: unit || null, examples: [], grade: 11, subject: subjName
    };
  }
  function TP(id, emoji, name, sub, pools, kn) {
    var t = { id: id, emoji: emoji, name: name, sub: sub, pools: pools };
    if (kn) t.knowledge = kn;
    return t;
  }
  function gcd2(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var r = a % b; a = b; b = r; } return a || 1; }
  function fracStr(n, d) { if (d < 0) { n = -n; d = -d; } var g = gcd2(n, d); n /= g; d /= g; return d === 1 ? String(n) : (n + "/" + d); }
  /* ==================================================================
     TOÁN 11 — Kết nối tri thức
     ================================================================== */
  /* ----- Chương I: Hàm số lượng giác và phương trình lượng giác ----- */
  var m11c1F = [
    ["Đổi 1 radian ra độ được kết quả nào?", "180°/π, xấp xỉ 57,3°", "π/180°, xấp xỉ 0,017°", "Đúng 60°", "Ta có π rad = 180° nên 1 rad = 180°/π ≈ 57,3°."],
    ["Góc π/3 rad bằng bao nhiêu độ?", "60°", "30°", "45°", "π/3 rad = 180°/3 = 60°."],
    ["Cung tròn bán kính R chắn góc ở tâm α rad có độ dài bằng bao nhiêu?", "l = R·α", "l = R/α", "l = R·α²", "Độ dài cung: l = Rα với α đo bằng radian."],
    ["Trên đường tròn lượng giác, sin α là gì của điểm biểu diễn góc α?", "Tung độ của điểm biểu diễn", "Hoành độ của điểm biểu diễn", "Khoảng cách từ điểm biểu diễn đến gốc toạ độ", "Điểm M(x; y) biểu diễn góc α thì cos α = x, sin α = y."],
    ["Trên đường tròn lượng giác, cos α là gì của điểm biểu diễn góc α?", "Hoành độ của điểm biểu diễn", "Tung độ của điểm biểu diễn", "Tổng hoành độ và tung độ", "cos α là hoành độ, sin α là tung độ của điểm biểu diễn."],
    ["Hệ thức nào đúng với mọi góc α?", "sin²α + cos²α = 1", "sin α + cos α = 1", "sin²α − cos²α = 1", "Đây là hệ thức lượng giác cơ bản."],
    ["tan α được định nghĩa bằng tỉ số nào?", "tan α = sin α / cos α (cos α ≠ 0)", "tan α = cos α / sin α", "tan α = sin α · cos α", "tan α = sin α/cos α, xác định khi cos α ≠ 0."],
    ["cot α bằng tỉ số nào?", "cot α = cos α / sin α (sin α ≠ 0)", "cot α = sin α / cos α", "cot α = 1/(sin α + cos α)", "cot α = cos α/sin α và cot α = 1/tan α khi cả hai đều xác định."],
    ["Công thức cộng: sin(a + b) bằng gì?", "sin a cos b + cos a sin b", "sin a cos b − cos a sin b", "sin a sin b + cos a cos b", "sin(a + b) = sin a cos b + cos a sin b; còn sin(a − b) = sin a cos b − cos a sin b."],
    ["Công thức cộng: cos(a − b) bằng gì?", "cos a cos b + sin a sin b", "cos a cos b − sin a sin b", "sin a cos b + cos a sin b", "cos(a − b) = cos a cos b + sin a sin b (chú ý dấu cộng)."],
    ["Công thức nhân đôi của sin là gì?", "sin 2a = 2 sin a cos a", "sin 2a = sin a cos a", "sin 2a = 2 sin²a", "sin 2a = 2 sin a cos a, suy ra từ công thức cộng khi lấy b = a."],
    ["Công thức nhân đôi nào của cos là đúng?", "cos 2a = 2cos²a − 1", "cos 2a = 2sin²a − 1", "cos 2a = cos²a + sin²a", "cos 2a = cos²a − sin²a = 2cos²a − 1 = 1 − 2sin²a."],
    ["Công thức hạ bậc của cos²a là gì?", "cos²a = (1 + cos 2a)/2", "cos²a = (1 − cos 2a)/2", "cos²a = 1 + cos 2a", "Từ cos 2a = 2cos²a − 1 suy ra cos²a = (1 + cos 2a)/2; còn sin²a = (1 − cos 2a)/2."],
    ["Tập giá trị của hàm số y = sin x là gì?", "[−1; 1]", "ℝ", "(−1; 1)", "Với mọi x thuộc ℝ, ta luôn có −1 ≤ sin x ≤ 1."],
    ["Hàm số y = sin x có tính chẵn lẻ thế nào và chu kì bao nhiêu?", "Hàm lẻ, tuần hoàn chu kì 2π", "Hàm chẵn, tuần hoàn chu kì 2π", "Hàm lẻ, tuần hoàn chu kì π", "sin(−x) = −sin x nên là hàm lẻ; sin(x + 2π) = sin x nên chu kì 2π."],
    ["Hàm số y = cos x có tính chẵn lẻ và chu kì thế nào?", "Hàm chẵn, tuần hoàn chu kì 2π", "Hàm lẻ, tuần hoàn chu kì π", "Không chẵn không lẻ, chu kì π", "cos(−x) = cos x nên y = cos x là hàm chẵn, chu kì 2π."],
    ["Hàm số y = tan x có chu kì tuần hoàn bằng bao nhiêu?", "π", "2π", "π/2", "tan(x + π) = tan x nên chu kì của y = tan x là π."],
    ["Điều kiện để phương trình sin x = m có nghiệm là gì?", "|m| ≤ 1", "m ≥ 0", "Mọi m thuộc ℝ đều được", "Vì tập giá trị của sin là [−1; 1] nên sin x = m có nghiệm khi và chỉ khi |m| ≤ 1."],
    ["Nếu sin x = sin α thì nghiệm của phương trình là gì?", "x = α + k2π hoặc x = π − α + k2π (k ∈ ℤ)", "Chỉ x = α + kπ (k ∈ ℤ)", "x = ±α + k2π (k ∈ ℤ)", "PT sin x = sin α có hai họ nghiệm: x = α + k2π và x = π − α + k2π."],
    ["Nếu cos x = cos α thì nghiệm của phương trình là gì?", "x = ±α + k2π (k ∈ ℤ)", "Chỉ x = α + kπ (k ∈ ℤ)", "x = π − α + k2π (k ∈ ℤ)", "PT cos x = cos α có nghiệm x = α + k2π hoặc x = −α + k2π, viết gọn x = ±α + k2π."],
    ["Phương trình tan x = m (m tuỳ ý) có nghiệm dạng nào?", "x = arctan m + kπ (k ∈ ℤ)", "x = arctan m + k2π (k ∈ ℤ)", "Chỉ có nghiệm khi |m| ≤ 1", "Hàm tan có tập giá trị ℝ nên tan x = m luôn có nghiệm x = arctan m + kπ."],
    ["Giá trị sin(π/6) + cos(π/3) bằng bao nhiêu?", "1", "1/2", "√3", "sin(π/6) = 1/2 và cos(π/3) = 1/2 nên tổng bằng 1."],
    ["Phương trình sin x = 1 có nghiệm là gì?", "x = π/2 + k2π (k ∈ ℤ)", "x = k2π (k ∈ ℤ)", "x = π + k2π (k ∈ ℤ)", "sin x = 1 tại điểm cao nhất của đường tròn lượng giác: x = π/2 + k2π."],
    ["Tập xác định của hàm số y = tan x là gì?", "ℝ trừ các điểm π/2 + kπ (k ∈ ℤ)", "Toàn bộ ℝ", "ℝ trừ các điểm kπ (k ∈ ℤ)", "tan x xác định khi cos x ≠ 0, tức x ≠ π/2 + kπ."]
  ];
  var m11c1P = [["sin²α + cos²α", "1"], ["tan α", "sin α / cos α"], ["cot α", "cos α / sin α"], ["sin 2α", "2 sin α cos α"], ["Chu kì của y = sin x", "2π"], ["Chu kì của y = tan x", "π"], ["sin(π/2 − α)", "cos α"], ["sin(−α)", "−sin α"]];
  function x11TrigVal() {
    var T = [
      ["sin", "30°", "1/2", ["√3/2", "√2/2"]],
      ["sin", "45°", "√2/2", ["1/2", "√3/2"]],
      ["sin", "60°", "√3/2", ["1/2", "√2/2"]],
      ["cos", "30°", "√3/2", ["1/2", "√2/2"]],
      ["cos", "45°", "√2/2", ["√3/2", "1/2"]],
      ["cos", "60°", "1/2", ["√3/2", "√2/2"]],
      ["tan", "30°", "1/√3", ["1", "√3"]],
      ["tan", "45°", "1", ["√3", "1/√3"]],
      ["tan", "60°", "√3", ["1", "1/√3"]]
    ];
    var t = pick(T);
    return mcqQ("Giá trị của " + t[0] + " " + t[1] + " bằng bao nhiêu?", t[3], t[2], "Giá trị lượng giác đặc biệt: " + t[0] + " " + t[1] + " = " + t[2] + ".");
  }
  function x11ArcLen() {
    var v = rand(0, 1);
    if (v === 0) { var R = rand(2, 10), a = pick([1, 2, 3]); return numBlank6("Cung tròn bán kính " + R + " chắn góc ở tâm " + a + " rad. Độ dài cung bằng bao nhiêu?", "l = R·α = ?", R * a, "l = Rα = " + R + "·" + a + " = " + (R * a) + "."); }
    var R2 = pick([2, 4, 6]), a2 = pick([1, 2]);
    return numBlank6("Diện tích hình quạt tròn bán kính " + R2 + ", góc ở tâm " + a2 + " rad bằng bao nhiêu?", "S = (1/2)R²α = ?", (R2 * R2 * a2) / 2, "S = (1/2)R²α = (1/2)·" + (R2 * R2) + "·" + a2 + " = " + ((R2 * R2 * a2) / 2) + ".");
  }

  /* ----- Chương II: Dãy số. Cấp số cộng và cấp số nhân ----- */
  var m11c2F = [
    ["Dãy số là gì?", "Một hàm số xác định trên tập số nguyên dương ℕ*", "Một dãy các số viết tuỳ ý không theo quy tắc", "Một tập hợp các số phân biệt", "Mỗi số hạng uₙ là giá trị của hàm số tại n; dãy số có thể cho bằng công thức số hạng tổng quát, cách truy hồi hoặc mô tả."],
    ["Dãy số (uₙ) cho bởi uₙ = 2n − 1. Số hạng u₅ bằng bao nhiêu?", "9", "10", "11", "u₅ = 2·5 − 1 = 9."],
    ["Dãy số được gọi là dãy tăng khi nào?", "Khi uₙ₊₁ > uₙ với mọi n", "Khi mọi số hạng đều dương", "Khi uₙ₊₁ < uₙ với mọi n", "Dãy tăng: số hạng sau lớn hơn số hạng trước với mọi n; dãy giảm thì ngược lại."],
    ["Cấp số cộng là dãy số có tính chất nào?", "Mỗi số hạng (từ thứ hai) bằng số hạng trước cộng hằng số d", "Mỗi số hạng bằng số hạng trước nhân một hằng số", "Các số hạng tăng gấp đôi đều nhau", "Hằng số d gọi là công sai: uₙ₊₁ = uₙ + d."],
    ["Công sai d của cấp số cộng 3; 7; 11; 15; … bằng bao nhiêu?", "4", "3", "7", "d = 7 − 3 = 4."],
    ["Số hạng tổng quát của cấp số cộng có số hạng đầu u₁ và công sai d là gì?", "uₙ = u₁ + (n − 1)d", "uₙ = u₁ + nd", "uₙ = u₁ · dⁿ⁻¹", "Đi từ u₁ tới uₙ cần cộng d đúng n − 1 lần."],
    ["Tính chất số hạng giữa của cấp số cộng là gì?", "Mỗi số hạng bằng trung bình cộng hai số hạng kề nó", "Mỗi số hạng bằng trung bình nhân hai số hạng kề nó", "Mỗi số hạng bằng tổng hai số hạng kề nó", "uₖ = (uₖ₋₁ + uₖ₊₁)/2 với k ≥ 2."],
    ["Tổng n số hạng đầu của cấp số cộng được tính bằng công thức nào?", "Sₙ = n(u₁ + uₙ)/2", "Sₙ = n·u₁·uₙ/2", "Sₙ = (u₁ + uₙ)/2", "Sₙ = n[2u₁ + (n − 1)d]/2 = n(u₁ + uₙ)/2."],
    ["Tổng 1 + 2 + 3 + … + 100 bằng bao nhiêu?", "5050", "5000", "10000", "Đây là cấp số cộng có u₁ = 1, u₁₀₀ = 100: S = 100·(1 + 100)/2 = 5050."],
    ["Cấp số nhân là dãy số có tính chất nào?", "Mỗi số hạng bằng số hạng đứng trước nhân với công bội q", "Mỗi số hạng bằng số hạng trước cộng một hằng số", "Các số hạng đều bằng nhau", "Công bội q ≠ 0 và uₙ₊₁ = uₙ · q."],
    ["Công bội q của cấp số nhân 2; 6; 18; 54; … bằng bao nhiêu?", "3", "2", "4", "q = 6/2 = 3."],
    ["Số hạng tổng quát của cấp số nhân có số hạng đầu u₁, công bội q là gì?", "uₙ = u₁ · qⁿ⁻¹", "uₙ = u₁ + (n − 1)q", "uₙ = u₁ · qⁿ", "Từ u₁ tới uₙ phải nhân thêm q đúng n − 1 lần."],
    ["Tính chất số hạng giữa của cấp số nhân (các số hạng khác 0) là gì?", "uₖ² = uₖ₋₁ · uₖ₊₁", "uₖ = (uₖ₋₁ + uₖ₊₁)/2", "uₖ² = uₖ₋₁ + uₖ₊₁", "Trong cấp số nhân, bình phương mỗi số hạng bằng tích hai số hạng kề nó."],
    ["Tổng n số hạng đầu của cấp số nhân (q ≠ 1) là gì?", "Sₙ = u₁(1 − qⁿ)/(1 − q)", "Sₙ = u₁(qⁿ − 1)/(1 − q)", "Sₙ = n·u₁·qⁿ⁻¹", "Sₙ = u₁(1 − qⁿ)/(1 − q) khi q ≠ 1; nếu q = 1 thì Sₙ = n·u₁."],
    ["Cấp số nhân có u₁ = 3, q = 2. Số hạng u₅ bằng bao nhiêu?", "48", "24", "96", "u₅ = 3 · 2⁴ = 3 · 16 = 48."],
    ["Cấp số cộng có u₁ = 5, d = 3. Số hạng u₁₀ bằng bao nhiêu?", "32", "35", "30", "u₁₀ = 5 + 9·3 = 32."],
    ["Dãy số nào sau đây là cấp số cộng?", "2; 5; 8; 11", "2; 4; 8; 16", "1; 2; 4; 7", "Hiệu hai số hạng liên tiếp đều bằng 3 nên là cấp số cộng công sai 3; dãy 2; 4; 8; 16 là cấp số nhân."],
    ["Dãy số nào sau đây là cấp số nhân?", "3; 6; 12; 24", "3; 5; 7; 9", "1; 4; 9; 16", "Tỉ số hai số hạng liên tiếp đều bằng 2 nên là cấp số nhân công bội 2."],
    ["Nếu cấp số cộng có công sai d = 0 thì dãy số thế nào?", "Mọi số hạng đều bằng nhau (dãy hằng)", "Dãy tăng rất nhanh", "Dãy không xác định được", "d = 0: uₙ₊₁ = uₙ nên mọi số hạng đều bằng u₁."],
    ["Cấp số nhân có công bội q = 1 thì tổng n số hạng đầu bằng bao nhiêu?", "Sₙ = n · u₁", "Sₙ = u₁", "Sₙ = u₁ⁿ", "q = 1: mọi số hạng đều bằng u₁ nên Sₙ = n·u₁."],
    ["Dãy số (uₙ) được gọi là bị chặn trên khi nào?", "Tồn tại số M sao cho uₙ ≤ M với mọi n", "Mọi số hạng đều nhỏ hơn 0", "Dãy chỉ có hữu hạn số hạng", "Bị chặn trên: mọi số hạng không vượt quá một hằng số M; bị chặn dưới được định nghĩa tương tự với hằng số m."],
    ["Dãy số cho bằng cách truy hồi nghĩa là gì?", "Cho số hạng đầu và cách tính số hạng sau theo số hạng trước", "Cho sẵn mọi số hạng của dãy", "Cho công thức tính trực tiếp theo n", "Ví dụ u₁ = 1, uₙ₊₁ = uₙ + 2 là một cách cho dãy bằng truy hồi."],
    ["Một cấp số cộng có u₁ = −2, d = 5. Số hạng u₄ bằng bao nhiêu?", "13", "8", "18", "u₄ = −2 + 3·5 = 13."],
    ["Tổng 3 + 6 + 12 + 24 (cấp số nhân u₁ = 3, q = 2) bằng bao nhiêu?", "45", "42", "48", "S₄ = 3(1 − 2⁴)/(1 − 2) = 3 · 15 = 45."]
  ];
  var m11c2P = [["Số hạng tổng quát CSC", "uₙ = u₁ + (n − 1)d"], ["Số hạng tổng quát CSN", "uₙ = u₁ · qⁿ⁻¹"], ["Tổng n số hạng đầu CSC", "Sₙ = n(u₁ + uₙ)/2"], ["Tổng n số hạng đầu CSN (q ≠ 1)", "Sₙ = u₁(1 − qⁿ)/(1 − q)"], ["Tính chất số hạng giữa CSC", "uₖ = (uₖ₋₁ + uₖ₊₁)/2"], ["Tính chất số hạng giữa CSN", "uₖ² = uₖ₋₁ · uₖ₊₁"]];
  function x11AP() {
    var v = rand(0, 1);
    if (v === 0) { var u1 = rand(1, 9), d = rand(2, 6), n = rand(4, 10); return numBlank6("Cấp số cộng có u₁ = " + u1 + ", công sai d = " + d + ". Số hạng thứ " + n + " bằng bao nhiêu?", "u" + n + " = u₁ + (n − 1)d = ?", u1 + (n - 1) * d, "uₙ = u₁ + (n − 1)d = " + u1 + " + " + (n - 1) + "·" + d + " = " + (u1 + (n - 1) * d) + "."); }
    var u2 = rand(1, 8), d2 = rand(1, 5), n2 = rand(4, 9); var S = n2 * (2 * u2 + (n2 - 1) * d2) / 2;
    if (!Number.isInteger(S)) return x11AP();
    return numBlank6("Cấp số cộng có u₁ = " + u2 + ", công sai d = " + d2 + ". Tổng " + n2 + " số hạng đầu bằng bao nhiêu?", "S = n[2u₁ + (n − 1)d]/2 = ?", S, "Sₙ = n[2u₁ + (n − 1)d]/2 = " + S + ".");
  }
  function x11GP() {
    var v = rand(0, 1);
    if (v === 0) { var u1 = pick([2, 3, 5]), q = pick([2, 3]), n = rand(3, 5); return numBlank6("Cấp số nhân có u₁ = " + u1 + ", công bội q = " + q + ". Số hạng thứ " + n + " bằng bao nhiêu?", "u" + n + " = u₁·q^(n−1) = ?", u1 * Math.pow(q, n - 1), "uₙ = u₁ · qⁿ⁻¹ = " + u1 + " · " + q + "^" + (n - 1) + " = " + (u1 * Math.pow(q, n - 1)) + "."); }
    var u2 = pick([1, 2, 3]), q2 = 2, n2 = rand(3, 6); var S2 = u2 * (Math.pow(q2, n2) - 1) / (q2 - 1);
    return numBlank6("Cấp số nhân có u₁ = " + u2 + ", công bội q = 2. Tổng " + n2 + " số hạng đầu bằng bao nhiêu?", "S = u₁(q^n − 1)/(q − 1) = ?", S2, "Sₙ = u₁(1 − qⁿ)/(1 − q) = " + S2 + ".");
  }

  /* ----- Chương III: Các số đặc trưng của mẫu số liệu ghép nhóm ----- */
  var m11c3F = [
    ["Mẫu số liệu ghép nhóm là mẫu thế nào?", "Mẫu mà các giá trị được ghép thành các nhóm (lớp) liên tiếp", "Mẫu gồm toàn các giá trị bằng nhau", "Mẫu chỉ có một giá trị duy nhất", "Ví dụ chiều cao học sinh được ghép vào các nhóm [140; 150), [150; 160), …"],
    ["Tần số của một nhóm trong mẫu ghép nhóm là gì?", "Số giá trị của mẫu thuộc nhóm đó", "Độ dài của nhóm", "Trung điểm của nhóm", "Tần số của nhóm ký hiệu nᵢ; tổng các tần số bằng cỡ mẫu n."],
    ["Tần suất của một nhóm được tính thế nào?", "Bằng tần số của nhóm chia cho cỡ mẫu", "Bằng tần số nhân với cỡ mẫu", "Bằng độ dài nhóm chia cho tần số", "Tần suất fᵢ = nᵢ/n; tổng các tần suất bằng 1 (hay 100%)."],
    ["Giá trị đại diện của nhóm [a; b) là gì?", "Trung điểm của đoạn [a; b]: (a + b)/2", "Đầu mút trái a", "Đầu mút phải b", "Giá trị đại diện dùng để tính gần đúng các số đặc trưng của mẫu ghép nhóm."],
    ["Nhóm [150; 160) có giá trị đại diện bằng bao nhiêu?", "155", "150", "160", "Giá trị đại diện = (150 + 160)/2 = 155."],
    ["Số trung bình của mẫu ghép nhóm được tính bằng cách nào?", "Trung bình cộng các giá trị đại diện, có trọng số là tần số", "Trung bình của đầu mút nhóm đầu và nhóm cuối", "Giá trị đại diện của nhóm có tần số lớn nhất", "x̄ ≈ (n₁c₁ + n₂c₂ + … + nₖcₖ)/n với cᵢ là giá trị đại diện của nhóm i."],
    ["Vì sao các số đặc trưng của mẫu ghép nhóm chỉ là giá trị xấp xỉ?", "Vì mỗi giá trị gốc được thay bằng giá trị đại diện của nhóm", "Vì tần số luôn bị đếm sai", "Vì mẫu ghép nhóm không có số trung bình", "Ghép nhóm làm mất thông tin chi tiết của từng giá trị nên kết quả chỉ gần đúng."],
    ["Nhóm chứa trung vị của mẫu ghép nhóm được xác định thế nào?", "Nhóm đầu tiên có tần số tích lũy lớn hơn hoặc bằng n/2", "Nhóm có tần số lớn nhất", "Nhóm ở chính giữa bảng theo thứ tự", "Tính tần số tích lũy tăng dần; nhóm đầu tiên đạt mức n/2 là nhóm chứa trung vị."],
    ["Trung vị của mẫu ghép nhóm cho ta biết điều gì?", "Khoảng một nửa số liệu nhỏ hơn và một nửa lớn hơn giá trị đó", "Giá trị xuất hiện nhiều nhất trong mẫu", "Giá trị trung bình của mẫu", "Trung vị chia mẫu thành hai phần bằng nhau về số lượng."],
    ["Tứ phân vị thứ nhất Q₁ xấp xỉ ở vị trí nào của mẫu đã sắp xếp?", "Vị trí n/4 (theo tần số tích lũy)", "Vị trí n/2", "Vị trí 3n/4", "Q₁ ứng với mức tích lũy n/4, Q₂ (trung vị) mức n/2, Q₃ mức 3n/4."],
    ["Tứ phân vị thứ ba Q₃ xấp xỉ ở vị trí nào của mẫu đã sắp xếp?", "Vị trí 3n/4 (theo tần số tích lũy)", "Vị trí n/4", "Vị trí cuối cùng của mẫu", "Q₃ là giá trị mà khoảng ba phần tư số liệu nhỏ hơn nó."],
    ["Nhóm chứa mốt của mẫu ghép nhóm là nhóm thế nào?", "Nhóm có tần số lớn nhất", "Nhóm đầu tiên của bảng", "Nhóm chứa trung vị", "Mốt nằm trong nhóm “đông” nhất; công thức tính mốt dùng thêm tần số của hai nhóm kề bên."],
    ["Mốt của mẫu ghép nhóm có ý nghĩa gì?", "Giá trị xấp xỉ xuất hiện “đông nhất” trong mẫu", "Giá trị lớn nhất của mẫu", "Giá trị trung bình của mẫu", "Mốt cho biết khoảng giá trị mà số liệu tập trung nhiều nhất."],
    ["Cỡ mẫu của mẫu ghép nhóm bằng gì?", "Tổng tần số của mọi nhóm", "Số nhóm trong bảng", "Tần số của nhóm lớn nhất", "n = n₁ + n₂ + … + nₖ."],
    ["Khi lập bảng ghép nhóm, các nhóm thường được chọn thế nào?", "Các đoạn liên tiếp, không chồng chéo nhau", "Các đoạn rời nhau tuỳ ý", "Chỉ gồm đúng hai nhóm bất kỳ", "Mỗi giá trị của mẫu thuộc đúng một nhóm; thường dùng các nửa khoảng [a; b)."],
    ["Một mẫu ghép nhóm có tần số các nhóm là 5; 9; 6. Cỡ mẫu bằng bao nhiêu?", "20", "9", "45", "n = 5 + 9 + 6 = 20."],
    ["Nhóm [20; 30) có tần số 8 trong mẫu cỡ 40. Tần suất của nhóm bằng bao nhiêu?", "0,2 (tức 20%)", "0,8", "5", "Tần suất = 8/40 = 0,2."],
    ["Độ dài của nhóm [12; 20) bằng bao nhiêu?", "8", "12", "20", "Độ dài nhóm = 20 − 12 = 8."],
    ["Để so sánh chiều cao trung bình của hai lớp, số đặc trưng nào của mẫu ghép nhóm thường được dùng?", "Số trung bình của mẫu ghép nhóm", "Mốt của mẫu ghép nhóm", "Độ dài của nhóm", "Số trung bình (tính từ giá trị đại diện và tần số) là số đo xu thế trung tâm phổ biến nhất."],
    ["Mẫu ghép nhóm thường được dùng khi nào?", "Khi mẫu có nhiều giá trị, cần thu gọn để phân tích", "Khi mẫu chỉ có hai giá trị", "Khi không cần tính số đặc trưng nào", "Dữ liệu lớn (chiều cao, cân nặng, điểm thi…) thường được ghép nhóm để dễ xử lí."]
  ];
  var m11c3P = [["Tần số", "Số giá trị thuộc nhóm"], ["Tần suất", "Tần số ÷ cỡ mẫu"], ["Giá trị đại diện", "Trung điểm của nhóm"], ["Cỡ mẫu", "Tổng các tần số"], ["Nhóm chứa mốt", "Nhóm có tần số lớn nhất"], ["Q₂ của mẫu ghép nhóm", "Trung vị của mẫu"]];
  function x11GroupedMean() {
    var base = pick([0, 10, 20]);
    var a = rand(1, 5), b = rand(1, 6);
    var r1 = base + 5, r2 = base + 15, r3 = base + 25;
    return numBlank6("Mẫu ghép nhóm: [" + base + "; " + (base + 10) + ") có " + a + " giá trị, [" + (base + 10) + "; " + (base + 20) + ") có " + b + " giá trị, [" + (base + 20) + "; " + (base + 30) + ") có " + a + " giá trị. Số trung bình của mẫu bằng bao nhiêu?", "x̄ = ?",
      r2, "Giá trị đại diện là " + r1 + "; " + r2 + "; " + r3 + ". Mẫu đối xứng quanh nhóm giữa nên x̄ = (" + (a * r1) + " + " + (b * r2) + " + " + (a * r3) + ")/" + (2 * a + b) + " = " + r2 + ".");
  }
  function x11GroupedMedian() {
    var S = [
      ["30", "6; 16; 26", "Nhóm 2", ["Nhóm 1", "Nhóm 3"], "n/2 = 15; tần số tích lũy đạt 15 lần đầu ở nhóm 2 (tích lũy 16)."],
      ["40", "10; 18; 30", "Nhóm 3", ["Nhóm 1", "Nhóm 2"], "n/2 = 20; tần số tích lũy đạt 20 lần đầu ở nhóm 3 (tích lũy 30)."],
      ["24", "5; 11; 19; 24", "Nhóm 3", ["Nhóm 2", "Nhóm 4"], "n/2 = 12; tần số tích lũy đạt 12 lần đầu ở nhóm 3 (tích lũy 19)."]
    ];
    var s = pick(S);
    return mcqQ("Mẫu ghép nhóm cỡ n = " + s[0] + " có tần số tích lũy của các nhóm lần lượt là " + s[1] + ". Nhóm chứa trung vị là nhóm nào?", s[3], s[2], s[4]);
  }

  /* ----- Chương IV: Quan hệ song song trong không gian ----- */
  var m11c4F = [
    ["Qua ba điểm không thẳng hàng, có bao nhiêu mặt phẳng xác định?", "Đúng một mặt phẳng", "Vô số mặt phẳng", "Đúng hai mặt phẳng", "Ba điểm không thẳng hàng xác định duy nhất một mặt phẳng."],
    ["Nếu một đường thẳng có hai điểm phân biệt thuộc một mặt phẳng thì kết luận gì?", "Đường thẳng nằm hoàn toàn trong mặt phẳng đó", "Đường thẳng cắt mặt phẳng tại một điểm", "Đường thẳng song song với mặt phẳng", "Hai điểm của đường thẳng thuộc mặt phẳng thì cả đường thẳng nằm trong mặt phẳng."],
    ["Hai đường thẳng trong không gian có những vị trí tương đối nào?", "Trùng nhau, song song, cắt nhau hoặc chéo nhau", "Chỉ song song hoặc cắt nhau", "Chỉ trùng nhau hoặc chéo nhau", "Hai đường chéo nhau là hai đường không cùng nằm trong một mặt phẳng nào."],
    ["Hai đường thẳng chéo nhau là hai đường thẳng thế nào?", "Không cùng nằm trong một mặt phẳng nào", "Song song nhưng không trùng nhau", "Cắt nhau tại đúng một điểm", "Đường thẳng chéo nhau không có điểm chung và cũng không song song."],
    ["Đường thẳng d song song với mặt phẳng (P) khi nào?", "Khi d không nằm trong (P) và không có điểm chung với (P)", "Khi d có đúng một điểm chung với (P)", "Khi d nằm hoàn toàn trong (P)", "Đường thẳng và mặt phẳng có ba vị trí: nằm trong, song song (không điểm chung), cắt nhau (một điểm chung)."],
    ["Điều kiện để đường thẳng d song song với mặt phẳng (P) là gì?", "d ⊄ (P) và d song song một đường thẳng nằm trong (P)", "d vuông góc với mặt phẳng (P)", "d có hai điểm phân biệt thuộc (P)", "Đây là định lí thường dùng để chứng minh đường thẳng song song với mặt phẳng."],
    ["Hai mặt phẳng song song là hai mặt phẳng thế nào?", "Không có điểm chung nào", "Có đúng một điểm chung", "Có một đường thẳng chung", "Hai mặt phẳng phân biệt không có điểm chung thì song song; nếu có điểm chung thì chúng cắt nhau theo một giao tuyến."],
    ["Nếu hai mặt phẳng song song bị cắt bởi một mặt phẳng thứ ba thì hai giao tuyến thế nào?", "Song song với nhau", "Trùng nhau", "Chéo nhau", "Đây là tính chất giao tuyến của hai mặt phẳng song song."],
    ["Định lí Thales trong không gian phát biểu thế nào?", "Ba mặt phẳng song song chắn trên hai cát tuyến đoạn tỉ lệ", "Ba đường thẳng song song chắn các đoạn thẳng bằng nhau", "Hai tam giác có các cạnh tương ứng song song thì bằng nhau", "Nếu ba mặt phẳng song song cắt hai đường thẳng tại A, B, C và A′, B′, C′ thì AB/A′B′ = BC/B′C′ = AC/A′C′."],
    ["Nếu đường thẳng a song song mặt phẳng (P), mặt phẳng (Q) chứa a và cắt (P) theo giao tuyến b thì b thế nào với a?", "b song song với a", "b trùng với a", "b chéo với a", "Giao tuyến của (Q) với (P) song song với a — tính chất hay dùng để tìm giao tuyến."],
    ["Hình lăng trụ là hình thế nào?", "Hai đáy bằng nhau, song song; các mặt bên là hình bình hành", "Có tất cả các mặt đều là tam giác", "Có một đáy là đa giác và các mặt bên là tam giác chung đỉnh", "Hình có một đáy và một đỉnh là hình chóp; lăng trụ có hai đáy song song và bằng nhau."],
    ["Hình hộp là hình lăng trụ có đáy là hình gì?", "Hình bình hành (cả 6 mặt đều là hình bình hành)", "Hình chữ nhật bất kỳ", "Hình tam giác", "Hình hộp là lăng trụ tứ giác có đáy là hình bình hành; hộp chữ nhật là trường hợp riêng."],
    ["Hình hộp có bao nhiêu đỉnh, cạnh và mặt?", "8 đỉnh, 12 cạnh, 6 mặt", "6 đỉnh, 12 cạnh, 8 mặt", "8 đỉnh, 8 cạnh, 6 mặt", "Hộp là lăng trụ tứ giác: đỉnh 2·4 = 8, cạnh 3·4 = 12, mặt 4 + 2 = 6."],
    ["Trong hình hộp, bốn đường chéo có tính chất gì?", "Đồng quy tại trung điểm của mỗi đường", "Song song với nhau từng đôi", "Vuông góc với nhau từng đôi", "Bốn đường chéo của hình hộp cùng đi qua một điểm, điểm đó là trung điểm của mỗi đường."],
    ["Phép chiếu song song biến một đường thẳng (không song song phương chiếu) thành gì?", "Một đường thẳng (hoặc một điểm nếu song song phương chiếu)", "Một đường cong", "Một đoạn thẳng luôn ngắn hơn ban đầu", "Hình chiếu song song của một đường thẳng là một đường thẳng, trừ khi đường thẳng song song phương chiếu thì ảnh là một điểm."],
    ["Phép chiếu song song có tính chất bảo toàn nào?", "Bảo toàn tỉ số độ dài các đoạn cùng phương", "Bảo toàn độ dài mọi đoạn thẳng", "Bảo toàn độ lớn mọi góc", "Chiếu song song không bảo toàn độ dài và góc nói chung, nhưng bảo toàn tính song song và tỉ số độ dài trên cùng một đường thẳng."],
    ["Phép chiếu song song biến hai đường thẳng song song thành gì?", "Hai đường thẳng song song hoặc trùng nhau", "Hai đường thẳng cắt nhau", "Hai đường thẳng chéo nhau", "Tính song song được bảo toàn qua phép chiếu song song (khi các đường không song song phương chiếu)."],
    ["Để xác định giao tuyến của hai mặt phẳng phân biệt, ta cần tìm gì?", "Hai điểm chung phân biệt của hai mặt phẳng", "Một điểm chung duy nhất", "Một đường thẳng song song với cả hai mặt phẳng", "Giao tuyến là đường thẳng đi qua hai điểm chung của hai mặt phẳng."],
    ["Nếu hai mặt phẳng phân biệt cùng song song với một đường thẳng thì giao tuyến của chúng (nếu có) thế nào với đường thẳng đó?", "Song song với đường thẳng đó", "Vuông góc với đường thẳng đó", "Cắt đường thẳng đó", "Đây là hệ quả thường dùng khi phải tìm giao tuyến song song với một đường thẳng cho trước."],
    ["Hình chóp có đáy là ngũ giác thì có bao nhiêu mặt?", "6 mặt (5 mặt bên tam giác và 1 mặt đáy)", "5 mặt", "10 mặt", "Chóp n-giác có n mặt bên cộng 1 mặt đáy, tức n + 1 mặt; với n = 5 ta được 6 mặt."],
    ["Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì thế nào?", "Song song với nhau (tính bắc cầu trong không gian)", "Chéo nhau", "Luôn trùng nhau", "Trong không gian, quan hệ song song giữa các đường thẳng có tính bắc cầu."],
    ["Một mặt phẳng được xác định duy nhất bởi yếu tố nào sau đây?", "Một đường thẳng và một điểm không thuộc đường thẳng đó", "Hai điểm phân biệt bất kỳ", "Bốn điểm bất kỳ", "Ngoài ba điểm không thẳng hàng, mặt phẳng còn được xác định bởi: một đường thẳng và một điểm ngoài nó, hai đường thẳng cắt nhau, hai đường thẳng song song phân biệt."]
  ];
  var m11c4P = [["Hai đường chéo nhau", "Không cùng nằm trong một mặt phẳng"], ["Đường thẳng song song mặt phẳng", "Không có điểm chung với mặt phẳng"], ["Hai mặt phẳng song song", "Không có điểm chung"], ["Giao tuyến", "Đường thẳng chung của hai mặt phẳng"], ["Hình hộp", "Lăng trụ có đáy là hình bình hành"], ["Phép chiếu song song", "Bảo toàn tính song song và tỉ số cùng phương"]];
  function x11Prism() {
    var n = pick([3, 4, 5, 6]);
    var v = rand(0, 2);
    if (v === 0) return numBlank6("Hình lăng trụ có đáy là đa giác " + n + " cạnh. Số mặt của lăng trụ bằng bao nhiêu?", "Số mặt = n + 2 = ?", n + 2, "Lăng trụ n-giác có n mặt bên và 2 mặt đáy: tổng " + (n + 2) + " mặt.");
    if (v === 1) return numBlank6("Hình lăng trụ có đáy là đa giác " + n + " cạnh. Số đỉnh của lăng trụ bằng bao nhiêu?", "Số đỉnh = 2n = ?", 2 * n, "Mỗi đáy có " + n + " đỉnh, hai đáy có " + (2 * n) + " đỉnh.");
    return numBlank6("Hình lăng trụ có đáy là đa giác " + n + " cạnh. Số cạnh của lăng trụ bằng bao nhiêu?", "Số cạnh = 3n = ?", 3 * n, "Gồm " + n + " cạnh đáy dưới, " + n + " cạnh đáy trên và " + n + " cạnh bên: tổng " + (3 * n) + " cạnh.");
  }
  function x11Pyramid() {
    var n = pick([4, 5, 6, 7]);
    var v = rand(0, 1);
    if (v === 0) return numBlank6("Hình chóp có đáy là đa giác " + n + " cạnh. Số mặt của hình chóp bằng bao nhiêu?", "Số mặt = n + 1 = ?", n + 1, "Chóp n-giác có " + n + " mặt bên và 1 mặt đáy: tổng " + (n + 1) + " mặt.");
    return numBlank6("Hình chóp có đáy là đa giác " + n + " cạnh. Số cạnh của hình chóp bằng bao nhiêu?", "Số cạnh = 2n = ?", 2 * n, "Gồm " + n + " cạnh đáy và " + n + " cạnh bên: tổng " + (2 * n) + " cạnh.");
  }

  /* ----- Chương V: Giới hạn. Hàm số liên tục ----- */
  var m11c5F = [
    ["Giới hạn của dãy số (1/n) khi n → +∞ bằng bao nhiêu?", "0", "1", "Không tồn tại", "1/n càng nhỏ khi n càng lớn và dần tới 0."],
    ["Nếu |q| < 1 thì lim qⁿ (khi n → +∞) bằng bao nhiêu?", "0", "1", "q", "Ví dụ (1/2)ⁿ dần tới 0; ngược lại nếu |q| > 1 thì |qⁿ| tăng vô hạn."],
    ["Tổng của cấp số nhân lùi vô hạn có số hạng đầu u₁, công bội |q| < 1 bằng gì?", "S = u₁/(1 − q)", "S = u₁(1 − q)", "S = u₁/(1 + q)", "Tổng vô hạn thu gọn được vì qⁿ dần tới 0 trong công thức tổng hữu hạn."],
    ["Dãy số có giới hạn là một số thực hữu hạn được gọi là dãy thế nào?", "Dãy hội tụ", "Dãy phân kỳ", "Dãy bị chặn", "Dãy có giới hạn hữu hạn gọi là hội tụ; dãy không hội tụ gọi là phân kỳ."],
    ["lim (2n + 1)/(n + 3) khi n → +∞ bằng bao nhiêu?", "2", "1/3", "0", "Chia tử và mẫu cho n: (2 + 1/n)/(1 + 3/n) dần tới 2/1 = 2."],
    ["lim (5 − 3/n) khi n → +∞ bằng bao nhiêu?", "5", "2", "−3", "Vì 3/n dần tới 0 nên giới hạn bằng 5."],
    ["Khi tính giới hạn dãy phân thức, nếu bậc của tử lớn hơn bậc của mẫu (hệ số dẫn đầu dương) thì giới hạn thế nào?", "Bằng +∞", "Bằng 0", "Bằng tỉ số hai hệ số cao nhất", "Bậc tử lớn hơn bậc mẫu thì giới hạn vô cực; bậc tử nhỏ hơn thì giới hạn 0; hai bậc bằng nhau thì giới hạn là tỉ số hệ số cao nhất."],
    ["Giới hạn của hàm số f(x) = x + 3 khi x → 2 bằng bao nhiêu?", "5", "2", "3", "Thay trực tiếp x = 2 được 2 + 3 = 5 vì hàm đa thức liên tục tại mọi điểm."],
    ["Dạng vô định thường gặp khi tính giới hạn hàm số là dạng nào?", "Dạng 0/0", "Dạng 1/0", "Dạng 0 nhân với 5", "Khi thay điểm vào được 0/0 cần biến đổi: rút gọn nhân tử chung, nhân lượng liên hợp…"],
    ["Giới hạn đặc biệt lim (sin x)/x khi x → 0 bằng bao nhiêu?", "1", "0", "Không tồn tại", "lim (sin x)/x = 1 khi x → 0 (x tính bằng radian) là giới hạn đặc biệt quan trọng."],
    ["Hàm số f(x) liên tục tại điểm x₀ khi nào?", "f xác định tại x₀ và lim f(x) khi x → x₀ bằng f(x₀)", "Chỉ cần f xác định tại x₀", "Chỉ cần tồn tại giới hạn của f khi x → x₀", "Thiếu một trong các điều kiện trên thì hàm số gián đoạn tại x₀."],
    ["Hàm đa thức có tính liên tục thế nào?", "Liên tục trên toàn bộ ℝ", "Chỉ liên tục tại các điểm nguyên", "Không liên tục tại điểm 0", "Mọi hàm đa thức đều liên tục trên ℝ."],
    ["Hàm phân thức hữu tỉ liên tục ở đâu?", "Trên từng khoảng của tập xác định của nó", "Trên toàn bộ ℝ kể cả điểm mẫu bằng 0", "Chỉ tại các nghiệm của tử số", "Tại điểm mẫu bằng 0 hàm không xác định nên không xét tính liên tục tại đó."],
    ["Trong định lí giá trị trung gian, nếu f liên tục trên [a; b] và f(a)·f(b) < 0 thì kết luận gì?", "Tồn tại c ∈ (a; b) sao cho f(c) = 0", "f đạt giá trị 0 tại a hoặc tại b", "Mọi hàm đều có nghiệm trong (a; b)", "Đồ thị cắt trục hoành tại ít nhất một điểm trong khoảng (a; b)."],
    ["Hàm số f(x) = 1/x gián đoạn tại điểm nào?", "x = 0", "x = 1", "Liên tục tại mọi điểm", "Tại x = 0 hàm số không xác định nên gián đoạn tại đó."],
    ["Tổng và tích của hai hàm số liên tục tại một điểm là hàm thế nào tại điểm đó?", "Cũng liên tục tại điểm đó", "Luôn gián đoạn tại điểm đó", "Chỉ liên tục nếu hai hàm bằng nhau", "Hiệu và thương (với mẫu khác 0) của các hàm liên tục cũng liên tục."],
    ["lim (n² + 1)/(2n² + 3) khi n → +∞ bằng bao nhiêu?", "1/2", "1", "0", "Chia tử và mẫu cho n²: (1 + 1/n²)/(2 + 3/n²) dần tới 1/2."],
    ["lim (x² − 1)/(x − 1) khi x → 1 bằng bao nhiêu?", "2", "0", "Không tồn tại", "x² − 1 = (x − 1)(x + 1), rút gọn còn x + 1, dần tới 2 khi x → 1 (dạng vô định 0/0)."],
    ["Nếu lim uₙ = a và lim vₙ = b thì lim (uₙ · vₙ) bằng gì?", "a · b", "a + b", "a − b", "Giới hạn của tổng, hiệu, tích, thương (mẫu khác 0) bằng tổng, hiệu, tích, thương của các giới hạn."],
    ["Dãy số uₙ = (−1)ⁿ có giới hạn không?", "Không, dãy dao động giữa −1 và 1 nên phân kỳ", "Có, giới hạn bằng 0", "Có, giới hạn bằng 1", "(−1)ⁿ không tiến tới một số cố định nào nên dãy không có giới hạn."],
    ["Hàm số y = sin x liên tục trên tập nào?", "Trên toàn bộ ℝ", "Chỉ trên đoạn [−1; 1]", "Trên ℝ trừ các điểm kπ", "Các hàm lượng giác cơ bản liên tục trên tập xác định của chúng; sin và cos xác định trên ℝ."],
    ["Để chứng minh phương trình f(x) = 0 có nghiệm trong (a; b), ta thường dùng điều kiện nào?", "f liên tục trên [a; b] và f(a)·f(b) < 0", "f(a) = f(b)", "f phải là hàm đa thức bậc lẻ", "Đây là ứng dụng trực tiếp của định lí giá trị trung gian."]
  ];
  var m11c5P = [["Tổng cấp số nhân lùi vô hạn", "S = u₁/(1 − q)"], ["Dạng vô định điển hình", "0/0"], ["Hàm đa thức", "Liên tục trên ℝ"], ["Định lí giá trị trung gian", "f(a)·f(b) < 0 thì phương trình có nghiệm"], ["lim (sin x)/x khi x → 0", "1"], ["Dãy có giới hạn hữu hạn", "Dãy hội tụ"]];
  function x11LimSeq() {
    var v = rand(0, 2);
    if (v === 0) { var a = rand(2, 6), b = rand(1, 9), c = rand(1, 9); return numBlank6("Tính lim (" + a + "n + " + b + ")/(n + " + c + ") khi n → +∞.", "lim = ?", a, "Chia tử và mẫu cho n: (" + a + " + " + b + "/n)/(1 + " + c + "/n) dần tới " + a + "/1 = " + a + "."); }
    if (v === 1) { var a2 = rand(2, 9), b2 = rand(1, 8); return numBlank6("Tính lim (" + a2 + " − " + b2 + "/n) khi n → +∞.", "lim = ?", a2, "Vì " + b2 + "/n dần tới 0 nên giới hạn bằng " + a2 + "."); }
    var u = pick([4, 6, 8]);
    return numBlank6("Tổng của cấp số nhân lùi vô hạn có số hạng đầu u₁ = " + u + ", công bội q = 1/2 bằng bao nhiêu?", "S = u₁/(1 − q) = ?", 2 * u, "S = " + u + "/(1 − 1/2) = " + u + "/(1/2) = " + (2 * u) + ".");
  }
  function x11LimFunc() {
    var v = rand(0, 1);
    if (v === 0) { var a = rand(1, 4), b = rand(1, 6), c = rand(1, 6), x0 = rand(1, 4); var val = a * x0 * x0 + b * x0 + c; return numBlank6("Tính giới hạn của hàm số f(x) = " + a + "x² + " + b + "x + " + c + " khi x → " + x0 + ".", "lim f(x) = ?", val, "Thay trực tiếp x = " + x0 + ": " + a + "·" + (x0 * x0) + " + " + b + "·" + x0 + " + " + c + " = " + val + "."); }
    var k = rand(2, 6);
    return numBlank6("Tính lim (x² − " + (k * k) + ")/(x − " + k + ") khi x → " + k + ".", "lim = ?", 2 * k, "x² − " + (k * k) + " = (x − " + k + ")(x + " + k + "); rút gọn rồi thay x = " + k + " được " + k + " + " + k + " = " + (2 * k) + ".");
  }

  /* ----- Chương VI: Hàm số mũ và hàm số lôgarit ----- */
  var m11c6F = [
    ["Với a ≠ 0, a⁰ bằng bao nhiêu?", "1", "0", "a", "Mọi cơ số khác 0 lũy thừa với số mũ 0 đều bằng 1."],
    ["a⁻ⁿ (với a ≠ 0) bằng gì?", "1/aⁿ", "−aⁿ", "aⁿ", "Lũy thừa với số mũ nguyên âm là nghịch đảo của lũy thừa với số mũ dương."],
    ["Lũy thừa với số mũ 1/n liên hệ với căn thế nào (a > 0)?", "a^(1/n) bằng căn bậc n của a", "a^(1/n) bằng aⁿ", "a^(1/n) bằng 1/a", "Tổng quát: a^(m/n) bằng căn bậc n của a^m."],
    ["Tính chất nào đúng với lũy thừa cùng cơ số?", "aᵐ · aⁿ = aᵐ⁺ⁿ", "aᵐ · aⁿ = aᵐⁿ", "aᵐ · aⁿ = aᵐ⁻ⁿ", "Nhân hai lũy thừa cùng cơ số: cộng các số mũ; chia hai lũy thừa: trừ các số mũ."],
    ["(aᵐ)ⁿ bằng gì?", "aᵐⁿ", "aᵐ⁺ⁿ", "a^(m/n)", "Lũy thừa của lũy thừa: nhân hai số mũ với nhau."],
    ["Theo định nghĩa, log_a b = c tương đương với điều gì?", "a^c = b (với a > 0, a ≠ 1, b > 0)", "a · b = c", "b^c = a", "Lôgarit là số mũ mà cơ số phải được nâng lên để bằng b."],
    ["log_a 1 bằng bao nhiêu (0 < a ≠ 1)?", "0", "1", "Không xác định", "Vì a⁰ = 1 nên log_a 1 = 0 với mọi cơ số hợp lệ."],
    ["log₂ 32 bằng bao nhiêu?", "5", "4", "16", "Vì 2⁵ = 32 nên log₂ 32 = 5."],
    ["log_a (x·y) bằng gì (với x, y > 0)?", "log_a x + log_a y", "log_a x · log_a y", "log_a x − log_a y", "Lôgarit của một tích bằng tổng các lôgarit."],
    ["log_a (xⁿ) bằng gì (với x > 0)?", "n · log_a x", "log_a x + n", "(log_a x)ⁿ", "Đưa số mũ xuống thành hệ số: log_a xⁿ = n log_a x."],
    ["Công thức đổi cơ số của log_a b là gì?", "log_a b = log_c b / log_c a", "log_a b = log_c a / log_c b", "log_a b = log_c b · log_c a", "Hay dùng c = 10 hoặc c = e để tính lôgarit bằng máy tính."],
    ["ln là ký hiệu của lôgarit với cơ số nào?", "Cơ số e ≈ 2,718 (lôgarit tự nhiên)", "Cơ số 10", "Cơ số 2", "lg là lôgarit thập phân cơ số 10; ln là lôgarit tự nhiên cơ số e."],
    ["Hàm số mũ y = a^x (a > 0, a ≠ 1) có tập giá trị là gì?", "(0; +∞)", "ℝ", "[0; +∞)", "a^x > 0 với mọi x nên đồ thị nằm hoàn toàn phía trên trục hoành."],
    ["Đồ thị hàm số mũ y = a^x luôn đi qua điểm nào?", "(0; 1)", "(1; 0)", "(0; 0)", "Vì a⁰ = 1 nên đồ thị qua (0; 1); còn đồ thị hàm log_a x qua (1; 0)."],
    ["Hàm số mũ y = a^x đồng biến trên ℝ khi nào?", "Khi a > 1", "Khi 0 < a < 1", "Với mọi a > 0", "a > 1: hàm mũ đồng biến; 0 < a < 1: hàm mũ nghịch biến."],
    ["Hàm số logarit y = log_a x có tập xác định là gì?", "(0; +∞)", "ℝ", "[0; +∞)", "Chỉ tính được lôgarit của các số dương."],
    ["Phương trình a^{f(x)} = a^{g(x)} (0 < a ≠ 1) tương đương với điều gì?", "f(x) = g(x)", "f(x) · g(x) = 0", "f(x) = −g(x)", "Hàm mũ đơn điệu nên hai lũy thừa cùng cơ số bằng nhau khi và chỉ khi số mũ bằng nhau."],
    ["Nghiệm của phương trình 3^x = 27 là gì?", "x = 3", "x = 9", "x = 27", "Vì 27 = 3³ nên x = 3."],
    ["Khi giải phương trình logarit, việc đầu tiên cần làm là gì?", "Đặt điều kiện: biểu thức dưới dấu log phải dương", "Khai triển lôgarit ngay lập tức", "Bình phương cả hai vế", "Thiếu điều kiện xác định dễ dẫn tới nhận nghiệm ngoại lai."],
    ["Với a > 1, bất phương trình a^{f(x)} > a^{g(x)} tương đương với gì?", "f(x) > g(x) (giữ nguyên chiều)", "f(x) < g(x) (đổi chiều)", "f(x) · g(x) > 0", "Cơ số lớn hơn 1: hàm mũ đồng biến nên giữ nguyên chiều; cơ số thuộc (0; 1) thì đổi chiều."],
    ["Với 0 < a < 1, bất phương trình log_a f(x) > log_a g(x) tương đương với gì?", "0 < f(x) < g(x) (đổi chiều, kèm điều kiện)", "f(x) > g(x) > 0", "f(x) < 0 < g(x)", "Hàm logarit cơ số nhỏ hơn 1 nghịch biến nên phải đổi chiều bất đẳng thức và giữ điều kiện dương."],
    ["Giá trị của 2^{log₂ 5} bằng bao nhiêu?", "5", "2", "10", "a^{log_a b} = b với b > 0: lũy thừa và lôgarit cùng cơ số triệt tiêu lẫn nhau."],
    ["log₃ (1/9) bằng bao nhiêu?", "−2", "2", "−1/2", "Vì 3⁻² = 1/9 nên log₃ (1/9) = −2."],
    ["Số e có giá trị xấp xỉ bao nhiêu?", "2,718", "3,14159", "1,618", "e ≈ 2,71828 là cơ số của lôgarit tự nhiên và của hàm số mũ tự nhiên e^x."]
  ];
  var m11c6P = [["log_a 1", "0"], ["log_a a", "1"], ["log_a (x·y)", "log_a x + log_a y"], ["log_a (x/y)", "log_a x − log_a y"], ["log_a (xⁿ)", "n · log_a x"], ["Đồ thị y = a^x", "Qua điểm (0; 1)"], ["Đồ thị y = log_a x", "Qua điểm (1; 0)"], ["ln x", "log_e x (lôgarit tự nhiên)"]];
  function x11ExpLog() {
    var v = rand(0, 2);
    if (v === 0) { var a = pick([2, 3, 5]), k = rand(2, 4); return numBlank6("Giá trị của " + a + "^" + k + " bằng bao nhiêu?", a + "^" + k + " = ?", Math.pow(a, k), a + "^" + k + " = " + Math.pow(a, k) + "."); }
    if (v === 1) { var a2 = pick([2, 3, 4, 5, 10]), k2 = rand(2, 4); return numBlank6("Giá trị của log_" + a2 + " " + Math.pow(a2, k2) + " bằng bao nhiêu?", "log_" + a2 + " " + Math.pow(a2, k2) + " = ?", k2, "Vì " + a2 + "^" + k2 + " = " + Math.pow(a2, k2) + " nên logarit bằng " + k2 + "."); }
    var k3 = rand(2, 5);
    return numBlank6("Giá trị của ln(e^" + k3 + ") bằng bao nhiêu?", "ln(e^" + k3 + ") = ?", k3, "ln và e^x là hai phép toán ngược nhau nên ln(e^" + k3 + ") = " + k3 + ".");
  }
  function x11ExpEq() {
    var v = rand(0, 1);
    if (v === 0) { var a = pick([2, 3, 5]), m = rand(2, 5); return numBlank6("Phương trình " + a + "^x = " + Math.pow(a, m) + " có nghiệm x bằng bao nhiêu?", "x = ?", m, Math.pow(a, m) + " = " + a + "^" + m + " nên x = " + m + "."); }
    var a2 = pick([2, 3]), k = rand(2, 4);
    return numBlank6("Phương trình log_" + a2 + " x = " + k + " có nghiệm x bằng bao nhiêu?", "x = ?", Math.pow(a2, k), "Theo định nghĩa lôgarit: x = " + a2 + "^" + k + " = " + Math.pow(a2, k) + ".");
  }

  /* ----- Chương VII: Quan hệ vuông góc trong không gian ----- */
  var m11c7F = [
    ["Góc giữa hai đường thẳng trong không gian nằm trong khoảng nào?", "Từ 0° đến 90°", "Từ 0° đến 180°", "Từ 90° đến 180°", "Góc giữa hai đường thẳng lấy giá trị không tù: 0° ≤ φ ≤ 90°."],
    ["Đường thẳng d vuông góc với mặt phẳng (P) khi nào?", "Khi d vuông góc với mọi đường thẳng nằm trong (P)", "Khi d vuông góc với một đường thẳng trong (P)", "Khi d chỉ cắt (P) tại một điểm", "Chỉ vuông góc với một đường thẳng trong (P) là chưa đủ để kết luận d ⊥ (P)."],
    ["Điều kiện đủ để đường thẳng d vuông góc với mặt phẳng (P) là gì?", "d vuông góc với hai đường thẳng cắt nhau nằm trong (P)", "d vuông góc với hai đường thẳng song song trong (P)", "d song song với một đường thẳng trong (P)", "Hai đường thẳng đó phải cắt nhau và cùng thuộc (P)."],
    ["Hai mặt phẳng được gọi là vuông góc nhau khi nào?", "Khi góc giữa chúng bằng 90°", "Khi chúng không có điểm chung nào", "Khi chúng có đúng một điểm chung", "Góc giữa hai mặt phẳng thuộc đoạn [0°; 90°]; bằng 90° thì hai mặt phẳng vuông góc."],
    ["Điều kiện để hai mặt phẳng (P) và (Q) vuông góc với nhau là gì?", "(P) chứa một đường thẳng vuông góc với (Q)", "(P) song song với (Q)", "(P) và (Q) có giao tuyến", "Nếu (P) chứa một đường thẳng vuông góc với (Q) thì (P) ⊥ (Q)."],
    ["Góc giữa đường thẳng d và mặt phẳng (P) (d không vuông góc với (P)) được xác định thế nào?", "Là góc giữa d và hình chiếu vuông góc của d trên (P)", "Là góc giữa d và một đường thẳng bất kỳ trong (P)", "Luôn bằng 90°", "Nếu d ∥ (P) hoặc d nằm trong (P) thì góc bằng 0°; nếu d ⊥ (P) thì góc bằng 90°."],
    ["Khoảng cách từ điểm M đến mặt phẳng (P) là gì?", "Độ dài đoạn vuông góc kẻ từ M xuống (P)", "Độ dài đoạn xiên kẻ từ M tới một điểm của (P)", "Khoảng cách từ M tới một đường thẳng trong (P)", "Đó cũng là khoảng cách ngắn nhất từ M tới mọi điểm của (P)."],
    ["Khoảng cách giữa hai đường thẳng chéo nhau được xác định thế nào?", "Độ dài đoạn vuông góc chung của hai đường thẳng", "Khoảng cách giữa hai điểm bất kỳ trên hai đường", "Độ dài đoạn nối hai điểm gần nhau nhất tuỳ chọn", "Đoạn vuông góc chung là đoạn thẳng vuông góc với cả hai đường chéo nhau."],
    ["Thể tích khối chóp được tính bằng công thức nào?", "V = (1/3)·S_đáy · h", "V = S_đáy · h", "V = (1/2)·S_đáy · h", "Khối chóp có thể tích bằng một phần ba khối lăng trụ cùng đáy và cùng chiều cao."],
    ["Thể tích khối lăng trụ được tính bằng công thức nào?", "V = S_đáy · h", "V = (1/3)·S_đáy · h", "V = S_đáy · h/2", "Lăng trụ: thể tích bằng diện tích đáy nhân chiều cao."],
    ["Khối chóp có diện tích đáy 12, chiều cao 5 thì thể tích bằng bao nhiêu?", "20", "60", "30", "V = (1/3)·12·5 = 20 (đơn vị thể tích)."],
    ["Khối hộp chữ nhật có các kích thước 2; 3; 4 thì thể tích bằng bao nhiêu?", "24", "9", "28", "V = 2·3·4 = 24."],
    ["Theo định lí ba đường vuông góc, nếu hình chiếu của đường xiên lên mặt phẳng vuông góc với một đường thẳng trong mặt phẳng thì đường xiên thế nào với đường thẳng đó?", "Cũng vuông góc với đường thẳng đó", "Song song với đường thẳng đó", "Trùng với đường thẳng đó", "Định lí ba đường vuông góc phát biểu hai chiều: đường xiên ⊥ đường thẳng trong mp khi và chỉ khi hình chiếu của nó cũng vậy."],
    ["Phát biểu nào đúng về đường xiên và đoạn vuông góc kẻ từ một điểm tới mặt phẳng?", "Đường xiên dài hơn đoạn vuông góc kẻ từ cùng một điểm", "Đường xiên là đoạn ngắn nhất", "Đoạn vuông góc dài hơn mọi đường xiên", "Đoạn vuông góc là khoảng cách từ điểm tới mặt phẳng nên ngắn nhất."],
    ["Góc nhị diện là góc có đặc điểm gì?", "Có đỉnh thuộc cạnh chung của hai nửa mặt phẳng tạo thành nó", "Là góc của một tam giác bất kỳ", "Là góc giữa hai đường thẳng chéo nhau", "Số đo góc nhị diện bằng số đo góc phẳng của nó: góc giữa hai tia cùng thuộc hai nửa mặt phẳng và cùng vuông góc với cạnh nhị diện."],
    ["Góc giữa hai mặt phẳng cắt nhau được đo bằng góc nào?", "Góc phẳng của góc nhị diện tạo bởi hai mặt phẳng", "Góc giữa hai đường thẳng bất kỳ trong hai mặt phẳng", "Góc giữa hai đường chéo của hai mặt phẳng", "Từ một điểm trên giao tuyến, kẻ hai tia thuộc hai mặt phẳng và cùng vuông góc giao tuyến; góc giữa hai tia là góc cần tìm."],
    ["Khoảng cách giữa hai mặt phẳng song song được tính thế nào?", "Bằng khoảng cách từ một điểm của mặt này tới mặt kia", "Luôn bằng 0", "Bằng độ dài giao tuyến của chúng", "Mọi điểm của mặt phẳng này đều cách mặt phẳng kia một khoảng như nhau."],
    ["Trong hình chóp đều, chân đường cao hạ từ đỉnh xuống mặt đáy là gì?", "Tâm của đa giác đáy (tâm đường tròn ngoại tiếp đáy)", "Một đỉnh bất kỳ của đáy", "Trung điểm của một cạnh đáy", "Chóp đều có đỉnh chiếu vuông góc xuống tâm đáy và các cạnh bên bằng nhau."],
    ["Khối lăng trụ có diện tích đáy 7, chiều cao 6 thì thể tích bằng bao nhiêu?", "42", "14", "21", "V = 7 · 6 = 42."],
    ["Thể tích khối chóp cụt đều có hai diện tích đáy S₁, S₂ và chiều cao h là gì?", "V = (h/3)(S₁ + S₂ + √(S₁S₂))", "V = h(S₁ + S₂)/2", "V = (h/3)(S₁ + S₂)", "Chóp cụt đều: cộng hai diện tích đáy với trung bình nhân của chúng rồi nhân h/3."],
    ["Nếu đường thẳng d song song với mặt phẳng (P) thì khoảng cách từ d tới (P) là gì?", "Khoảng cách từ một điểm bất kỳ trên d xuống (P)", "Bằng 0", "Độ dài một đoạn xiên từ điểm trên d tới (P)", "Mọi điểm trên d đều cách (P) một khoảng bằng nhau khi d ∥ (P)."],
    ["Quan hệ nào đúng về đường thẳng vuông góc với mặt phẳng?", "Đường thẳng vuông góc mp thì vuông góc mọi đường trong mp đó", "Đường thẳng cắt mp thì vuông góc với mp", "Đường thẳng song song mp thì vuông góc mọi đường trong mp", "Đây chính là định nghĩa của đường thẳng vuông góc với mặt phẳng."],
    ["Khối lập phương cạnh a có thể tích bằng bao nhiêu?", "a³", "a²", "6a²", "V = a · a · a = a³; còn 6a² là diện tích toàn phần của khối lập phương."],
    ["Chóp tứ giác đều có cạnh đáy 4, chiều cao 3 thì thể tích bằng bao nhiêu?", "16", "48", "12", "Đáy là hình vuông diện tích 16; V = (1/3)·16·3 = 16."]
  ];
  var m11c7P = [["Thể tích khối chóp", "V = (1/3)·S_đáy·h"], ["Thể tích khối lăng trụ", "V = S_đáy·h"], ["Thể tích hộp chữ nhật", "V = a·b·c"], ["Thể tích lập phương cạnh a", "V = a³"], ["Khoảng cách từ điểm tới mặt phẳng", "Độ dài đoạn vuông góc"], ["Đoạn vuông góc chung", "Khoảng cách hai đường chéo nhau"], ["Đường thẳng ⊥ mặt phẳng", "Vuông góc với mọi đường trong mặt phẳng"]];
  function x11Volume() {
    var v = rand(0, 2);
    if (v === 0) { var S = pick([6, 9, 12, 15, 18]), h = rand(2, 8); return numBlank6("Khối chóp có diện tích đáy " + S + ", chiều cao " + h + ". Thể tích khối chóp bằng bao nhiêu?", "V = (1/3)·S·h = ?", (S * h) / 3, "V = (1/3)·" + S + "·" + h + " = " + ((S * h) / 3) + "."); }
    if (v === 1) { var S2 = rand(3, 12), h2 = rand(2, 9); return numBlank6("Khối lăng trụ có diện tích đáy " + S2 + ", chiều cao " + h2 + ". Thể tích khối lăng trụ bằng bao nhiêu?", "V = S·h = ?", S2 * h2, "V = " + S2 + "·" + h2 + " = " + (S2 * h2) + "."); }
    var a = rand(2, 5), b = rand(2, 5), c = rand(2, 6);
    return calcMCQ("Khối hộp chữ nhật có các kích thước " + a + "; " + b + "; " + c + ". Thể tích của khối hộp bằng bao nhiêu?", "V = " + a + "·" + b + "·" + c, a * b * c, 5, 200, "V = a·b·c = " + (a * b * c) + ".");
  }
  function x11PythDist() {
    var k = pick([1, 2]);
    return numBlank6("Từ điểm A ngoài mặt phẳng (P), kẻ đoạn vuông góc AH và đường xiên AB có độ dài " + (5 * k) + ", hình chiếu của AB lên (P) có độ dài " + (4 * k) + ". Khoảng cách từ A tới (P) bằng bao nhiêu?", "AH = ?", 3 * k, "Tam giác AHB vuông tại H: AH² = AB² − HB² = " + (25 * k * k) + " − " + (16 * k * k) + " = " + (9 * k * k) + " nên AH = " + (3 * k) + ".");
  }

  /* ----- Chương VIII: Các quy tắc tính xác suất ----- */
  var m11c8F = [
    ["Biến cố hợp của hai biến cố A và B là biến cố thế nào?", "Biến cố “A xảy ra hoặc B xảy ra”", "Biến cố “cả A và B cùng xảy ra”", "Biến cố “A không xảy ra”", "Hợp ký hiệu A ∪ B; còn giao A ∩ B là biến cố cả hai cùng xảy ra."],
    ["Biến cố giao của hai biến cố A và B là biến cố thế nào?", "Biến cố “cả A và B cùng xảy ra”", "Biến cố “A hoặc B xảy ra”", "Biến cố “B không xảy ra”", "Giao ký hiệu A ∩ B, còn viết là AB."],
    ["Hai biến cố được gọi là xung khắc khi nào?", "Khi chúng không thể cùng xảy ra (A ∩ B = ∅)", "Khi xác suất của chúng bằng nhau", "Khi chúng luôn cùng xảy ra", "Ví dụ khi gieo xúc xắc: “ra mặt chẵn” và “ra mặt lẻ” là hai biến cố xung khắc."],
    ["Biến cố đối của A, ký hiệu Ā, là biến cố thế nào?", "Biến cố “A không xảy ra”", "Biến cố “A xảy ra đúng hai lần”", "Biến cố giống hệt A", "A và Ā xung khắc nhau và hợp của chúng là biến cố chắc chắn."],
    ["Công thức xác suất của biến cố đối là gì?", "P(Ā) = 1 − P(A)", "P(Ā) = P(A)", "P(Ā) = 1/P(A)", "Dùng biến cố đối rất tiện cho các bài toán dạng “ít nhất một lần xảy ra”."],
    ["Công thức cộng xác suất cho hai biến cố bất kỳ là gì?", "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)", "P(A ∪ B) = P(A) · P(B)", "P(A ∪ B) = P(A) + P(B) + P(A ∩ B)", "Phải trừ đi phần giao vì phần đó đã bị đếm hai lần."],
    ["Nếu A và B xung khắc thì P(A ∪ B) bằng gì?", "P(A) + P(B)", "P(A) · P(B)", "P(A) − P(B)", "Xung khắc nên P(A ∩ B) = 0 trong công thức cộng xác suất."],
    ["Hai biến cố A, B được gọi là độc lập khi nào?", "Việc xảy ra của biến cố này không ảnh hưởng biến cố kia", "Khi chúng không thể cùng xảy ra", "Khi chúng có xác suất bằng nhau", "Độc lập khác xung khắc: hai biến cố xung khắc có xác suất dương thì không độc lập."],
    ["Công thức nhân xác suất cho hai biến cố độc lập là gì?", "P(A ∩ B) = P(A) · P(B)", "P(A ∩ B) = P(A) + P(B)", "P(A ∩ B) = P(A) − P(B)", "Với hai biến cố không độc lập phải dùng tới xác suất có điều kiện."],
    ["Xác suất của biến cố chắc chắn và biến cố không thể lần lượt là gì?", "1 và 0", "0 và 1", "1/2 và 1/2", "Mọi biến cố đều có xác suất thuộc đoạn [0; 1]."],
    ["Gieo một xúc xắc cân đối, đồng chất. Xác suất ra mặt chẵn là bao nhiêu?", "1/2", "1/3", "2/3", "Có 3 mặt chẵn (2, 4, 6) trong 6 mặt nên P = 3/6 = 1/2."],
    ["Gieo hai đồng xu cân đối. Xác suất được hai mặt ngửa là bao nhiêu?", "1/4", "1/2", "1/3", "Hai lần gieo độc lập: (1/2)·(1/2) = 1/4."],
    ["Gieo hai đồng xu cân đối. Xác suất được ít nhất một mặt ngửa là bao nhiêu?", "3/4", "1/2", "1/4", "Dùng biến cố đối: 1 − P(hai mặt đều sấp) = 1 − 1/4 = 3/4."],
    ["Nếu P(A) = 0,3 thì P(Ā) bằng bao nhiêu?", "0,7", "0,3", "1,3", "P(Ā) = 1 − 0,3 = 0,7."],
    ["Hai biến cố A, B độc lập với P(A) = 0,4 và P(B) = 0,5. P(A ∩ B) bằng bao nhiêu?", "0,2", "0,9", "0,45", "Độc lập nên P(A ∩ B) = 0,4 · 0,5 = 0,2."],
    ["Hai biến cố xung khắc có P(A) = 0,25 và P(B) = 0,35. P(A ∪ B) bằng bao nhiêu?", "0,6", "0,1", "0,0875", "Xung khắc nên P(A ∪ B) = 0,25 + 0,35 = 0,6."],
    ["Rút ngẫu nhiên một lá bài từ bộ bài 52 lá. Xác suất được lá cơ là bao nhiêu?", "1/4", "1/13", "4/13", "Có 13 lá cơ trong 52 lá nên P = 13/52 = 1/4."],
    ["Khi nào nên dùng công thức nhân xác suất?", "Khi tính xác suất cả hai cùng xảy ra và chúng độc lập", "Khi tính xác suất ít nhất một biến cố xảy ra", "Khi hai biến cố xung khắc nhau", "Giao của hai biến cố độc lập: nhân hai xác suất của chúng."],
    ["Biến cố “ít nhất một trong hai biến cố A, B xảy ra” là biến cố nào?", "Biến cố hợp A ∪ B", "Biến cố giao A ∩ B", "Biến cố đối của A", "“Ít nhất một” tương ứng biến cố hợp; “cả hai” tương ứng biến cố giao; “không cái nào” là đối của hợp."],
    ["Một hộp có 3 bi đỏ, 2 bi xanh cùng kích thước. Rút ngẫu nhiên 1 bi. Xác suất được bi đỏ là bao nhiêu?", "3/5", "2/5", "3/2", "Tổng số có 5 bi, trong đó 3 bi đỏ nên P = 3/5."],
    ["Nếu A và B là hai biến cố độc lập thì kết luận nào đúng?", "Ā và B cũng là hai biến cố độc lập", "A xung khắc với B", "P(A ∩ B) = 0", "Tính độc lập được bảo toàn khi thay một biến cố bằng biến cố đối của nó."],
    ["Chọn ngẫu nhiên một số nguyên từ 1 đến 10. Xác suất chọn được số chia hết cho 3 là bao nhiêu?", "3/10", "1/3", "3/7", "Các số chia hết cho 3 là 3, 6, 9: có 3 số trong 10 số."]
  ];
  var m11c8P = [["Biến cố hợp", "A hoặc B xảy ra"], ["Biến cố giao", "Cả A và B cùng xảy ra"], ["Biến cố đối", "A không xảy ra"], ["Hai biến cố xung khắc", "Không thể cùng xảy ra"], ["Hai biến cố độc lập", "Không ảnh hưởng lẫn nhau"], ["P(Ā)", "1 − P(A)"], ["P(A ∩ B) khi A, B độc lập", "P(A) · P(B)"]];
  function x11ProbBall() {
    var a = rand(2, 6), b = rand(1, 5);
    var ans = fracStr(a, a + b), w1 = fracStr(b, a + b), w2 = fracStr(a, a + b + 1);
    if (ans === w1 || ans === w2 || w1 === w2) return x11ProbBall();
    return mcqQ("Một hộp có " + a + " bi đỏ và " + b + " bi xanh cùng kích thước, khối lượng. Rút ngẫu nhiên 1 viên bi. Xác suất rút được bi đỏ là bao nhiêu?", [w1, w2], ans, "Tổng số có " + (a + b) + " bi, trong đó " + a + " bi đỏ nên P = " + a + "/" + (a + b) + " = " + ans + ".");
  }
  function x11ProbRule() {
    var v = rand(0, 1);
    if (v === 0) { var a = rand(1, 4), b = rand(1, 9 - a); var ans = fracStr(a + b, 10), w1 = fracStr(a * b, 100), w2 = fracStr(Math.abs(a - b), 10); if (ans === w1 || ans === w2 || w1 === w2) return x11ProbRule(); return mcqQ("Hai biến cố xung khắc A, B có P(A) = " + fracStr(a, 10) + " và P(B) = " + fracStr(b, 10) + ". Xác suất P(A ∪ B) bằng bao nhiêu?", [w1, w2], ans, "Xung khắc: P(A ∪ B) = P(A) + P(B) = " + fracStr(a, 10) + " + " + fracStr(b, 10) + " = " + ans + "."); }
    var a2 = pick([2, 4, 5]), b2 = pick([2, 5]);
    var ans2 = fracStr(a2 * b2, 100), w3 = fracStr(a2 + b2, 10), w4 = fracStr(a2 * b2, 10);
    if (ans2 === w3 || ans2 === w4 || w3 === w4) return x11ProbRule();
    return mcqQ("Hai biến cố độc lập A, B có P(A) = " + fracStr(a2, 10) + " và P(B) = " + fracStr(b2, 10) + ". Xác suất P(A ∩ B) bằng bao nhiêu?", [w3, w4], ans2, "Độc lập: P(A ∩ B) = P(A)·P(B) = " + fracStr(a2, 10) + " · " + fracStr(b2, 10) + " = " + ans2 + ".");
  }

  /* ----- Chương IX: Đạo hàm ----- */
  var m11c9F = [
    ["Đạo hàm của hàm số f(x) tại điểm x₀ được định nghĩa bằng giới hạn nào?", "Giới hạn của tỉ số [f(x) − f(x₀)]/(x − x₀) khi x → x₀", "Giới hạn của f(x) khi x → x₀", "Tỉ số f(x₀)/x₀", "f′(x₀) = lim của [f(x) − f(x₀)]/(x − x₀) khi x → x₀, nếu giới hạn đó tồn tại và hữu hạn."],
    ["Ý nghĩa hình học của đạo hàm f′(x₀) là gì?", "Hệ số góc của tiếp tuyến với đồ thị tại điểm hoành độ x₀", "Độ dài cung của đồ thị", "Diện tích dưới đồ thị", "Tiếp tuyến tại điểm (x₀; f(x₀)) có hệ số góc k = f′(x₀)."],
    ["Phương trình tiếp tuyến của đồ thị y = f(x) tại điểm M(x₀; f(x₀)) là gì?", "y = f′(x₀)(x − x₀) + f(x₀)", "y = f(x₀)(x − x₀) + f′(x₀)", "y = f′(x₀)·x + x₀", "Tiếp tuyến đi qua M và có hệ số góc bằng f′(x₀)."],
    ["Theo ý nghĩa vật lí, nếu s(t) là quãng đường đi được thì s′(t) là gì?", "Vận tốc tức thời tại thời điểm t", "Quãng đường trung bình mỗi giây", "Gia tốc tức thời tại thời điểm t", "v(t) = s′(t); còn gia tốc a(t) = v′(t) = s″(t)."],
    ["Đạo hàm của hàm hằng f(x) = c bằng bao nhiêu?", "0", "c", "1", "Hàm hằng không thay đổi nên đạo hàm của nó bằng 0."],
    ["Đạo hàm của xⁿ (n nguyên dương) là gì?", "n·xⁿ⁻¹", "xⁿ⁻¹", "n·xⁿ", "Ví dụ (x³)′ = 3x²."],
    ["Đạo hàm của sin x là gì?", "cos x", "−cos x", "−sin x", "(sin x)′ = cos x; còn (cos x)′ = −sin x."],
    ["Đạo hàm của cos x là gì?", "−sin x", "sin x", "−cos x", "(cos x)′ = −sin x."],
    ["Đạo hàm của e^x là gì?", "e^x", "x · e^(x − 1)", "e^x · ln x", "(e^x)′ = e^x; tổng quát (a^x)′ = a^x · ln a."],
    ["Đạo hàm của ln x (với x > 0) là gì?", "1/x", "x", "(ln x)/x", "(ln x)′ = 1/x; còn (log_a x)′ = 1/(x · ln a)."],
    ["Đạo hàm của √x (với x > 0) là gì?", "1/(2√x)", "√x/2", "2√x", "(√x)′ = 1/(2√x), cũng suy được từ công thức lũy thừa với số mũ 1/2."],
    ["Quy tắc đạo hàm của tổng hai hàm số là gì?", "(u + v)′ = u′ + v′", "(u + v)′ = u′ · v′", "(u + v)′ = u + v", "Đạo hàm của tổng (hay hiệu) bằng tổng (hay hiệu) các đạo hàm."],
    ["Quy tắc đạo hàm của tích hai hàm số là gì?", "(uv)′ = u′v + uv′", "(uv)′ = u′v′", "(uv)′ = u′v − uv′", "Nhớ: “đạo hàm nhân giữ, cộng giữ nhân đạo hàm”."],
    ["Quy tắc đạo hàm của thương u/v (v ≠ 0) là gì?", "(u/v)′ = (u′v − uv′)/v²", "(u/v)′ = (u′v + uv′)/v²", "(u/v)′ = u′/v′", "Tử số của đạo hàm thương là u′v − uv′, mẫu số là v²."],
    ["Đạo hàm của hàm hợp y = f(u(x)) được tính thế nào?", "y′ = f′(u) · u′(x)", "y′ = f′(u) + u′(x)", "y′ = f′(x) · u(x)", "Phải nhân thêm đạo hàm của hàm trong; ví dụ (sin 2x)′ = 2cos 2x."],
    ["Đạo hàm của (2x + 1)³ là gì?", "6(2x + 1)²", "3(2x + 1)²", "(2x + 1)²", "Hàm hợp: 3(2x + 1)² · (2x + 1)′ = 3(2x + 1)² · 2 = 6(2x + 1)²."],
    ["Đạo hàm cấp hai của hàm số là gì?", "Đạo hàm của đạo hàm cấp một: f″(x) = (f′(x))′", "Đạo hàm cấp một nhân với 2", "Hàm số được nâng lên lũy thừa 2", "Ký hiệu f″ hoặc y″; trong vật lí, s″(t) chính là gia tốc tức thời."],
    ["Cho f(x) = x³. Giá trị f′(2) bằng bao nhiêu?", "12", "6", "8", "f′(x) = 3x² nên f′(2) = 3 · 4 = 12."],
    ["Hệ số góc của tiếp tuyến của đồ thị y = x² tại điểm có hoành độ 3 bằng bao nhiêu?", "6", "9", "3", "y′ = 2x, tại x = 3 hệ số góc k = 2 · 3 = 6."],
    ["Một vật chuyển động có s(t) = t² (mét). Vận tốc của vật tại t = 3 giây là bao nhiêu?", "6 m/s", "9 m/s", "3 m/s", "v(t) = s′(t) = 2t nên v(3) = 6 m/s."],
    ["Đạo hàm của a^x (0 < a ≠ 1) là gì?", "a^x · ln a", "x · a^(x − 1)", "a^x / ln a", "(a^x)′ = a^x · ln a; trường hợp riêng a = e cho (e^x)′ = e^x."],
    ["Nếu hàm số có đạo hàm tại điểm x₀ thì suy ra điều gì tại điểm đó?", "Hàm số liên tục tại x₀", "Hàm số đạt cực trị tại x₀", "Hàm số không liên tục tại x₀", "Có đạo hàm tại một điểm thì liên tục tại điểm đó; khẳng định ngược lại không đúng."]
  ];
  var m11c9P = [["(xⁿ)′", "n·xⁿ⁻¹"], ["(sin x)′", "cos x"], ["(cos x)′", "−sin x"], ["(e^x)′", "e^x"], ["(ln x)′", "1/x"], ["(√x)′", "1/(2√x)"], ["(1/x)′", "−1/x²"], ["(c)′ với c là hằng số", "0"]];
  function x11Deriv() {
    var v = rand(0, 2);
    if (v === 0) { var a = rand(1, 5), b = rand(1, 8), c = rand(1, 9), x0 = rand(1, 5); return numBlank6("Cho f(x) = " + a + "x² + " + b + "x + " + c + ". Giá trị f′(" + x0 + ") bằng bao nhiêu?", "f′(x) = 2ax + b, f′(" + x0 + ") = ?", 2 * a * x0 + b, "f′(x) = " + (2 * a) + "x + " + b + " nên f′(" + x0 + ") = " + (2 * a * x0 + b) + "."); }
    if (v === 1) { var a2 = rand(1, 4), x2 = rand(1, 4); return numBlank6("Cho f(x) = " + a2 + "x³. Giá trị f′(" + x2 + ") bằng bao nhiêu?", "f′(x) = 3ax², f′(" + x2 + ") = ?", 3 * a2 * x2 * x2, "f′(x) = " + (3 * a2) + "x² nên f′(" + x2 + ") = " + (3 * a2 * x2 * x2) + "."); }
    var a3 = rand(1, 4), b3 = rand(1, 6), t0 = rand(1, 5);
    return numBlank6("Một vật chuyển động có phương trình s(t) = " + a3 + "t² + " + b3 + "t (mét). Vận tốc của vật tại t = " + t0 + " giây bằng bao nhiêu m/s?", "v(t) = s′(t) = ?", 2 * a3 * t0 + b3, "v(t) = " + (2 * a3) + "t + " + b3 + " nên v(" + t0 + ") = " + (2 * a3 * t0 + b3) + " m/s.");
  }
  function x11Tangent() {
    var k = rand(2, 5);
    return mcqQ("Phương trình tiếp tuyến của đồ thị y = x² tại điểm có hoành độ " + k + " là gì?",
      ["y = " + k + "x + " + (k * k), "y = " + (2 * k) + "x + " + (k * k)],
      "y = " + (2 * k) + "x − " + (k * k),
      "y′ = 2x nên hệ số góc tại x = " + k + " là " + (2 * k) + "; điểm tiếp xúc (" + k + "; " + (k * k) + ") nên tiếp tuyến: y = " + (2 * k) + "(x − " + k + ") + " + (k * k) + " = " + (2 * k) + "x − " + (k * k) + ".");
  }

  /* ----- Chuyên đề 1: Phép biến hình trong mặt phẳng ----- */
  var m11cd1F = [
    ["Phép biến hình trong mặt phẳng là gì?", "Quy tắc đặt tương ứng mỗi điểm với đúng một điểm", "Quy tắc đặt tương ứng mỗi điểm với hai điểm", "Một hình vẽ bất kỳ trong mặt phẳng", "Phép biến hình là một quy tắc mà với mỗi điểm M của mặt phẳng, ta xác định được duy nhất một điểm M′."],
    ["Phép biến hình biến mọi điểm của mặt phẳng thành chính nó được gọi là phép gì?", "Phép đồng nhất", "Phép tịnh tiến", "Phép đối xứng tâm", "Phép đồng nhất giữ nguyên mọi điểm; nó cũng là phép tịnh tiến theo vectơ không."],
    ["Trong phép tịnh tiến theo vectơ v, ảnh M′ của điểm M thỏa mãn điều gì?", "Vectơ MM′ bằng vectơ v", "Vectơ MM′ ngược hướng với vectơ v", "M và M′ đối xứng nhau qua gốc toạ độ", "Phép tịnh tiến theo vectơ v biến M thành M′ sao cho vectơ MM′ = v."],
    ["Phép tịnh tiến biến một đoạn thẳng thành đoạn thẳng thế nào?", "Thành đoạn thẳng bằng nó", "Thành đoạn thẳng dài gấp đôi", "Thành một đường thẳng", "Phép tịnh tiến là phép dời hình nên bảo toàn độ dài đoạn thẳng."],
    ["Điểm nằm trên trục đối xứng d thì ảnh của nó qua phép đối xứng trục d là gì?", "Chính điểm đó", "Điểm đối xứng qua một trục khác", "Không có ảnh xác định", "Mọi điểm thuộc trục đối xứng đều biến thành chính nó."],
    ["Điểm M′ là ảnh của M qua phép đối xứng trục d khi nào?", "d là đường trung trực của đoạn MM′", "d đi qua trung điểm của đoạn MM′", "d song song với đoạn MM′", "Đối xứng trục: trục là đường trung trực của đoạn nối điểm và ảnh (trừ điểm nằm trên trục)."],
    ["Ảnh của tâm đối xứng I qua phép đối xứng tâm I là điểm nào?", "Chính điểm I", "Một điểm bất kỳ khác I", "Không xác định được", "Tâm đối xứng là điểm duy nhất biến thành chính nó trong phép đối xứng tâm."],
    ["Điểm M′ là ảnh của M qua phép đối xứng tâm I khi nào?", "I là trung điểm của đoạn MM′", "I nằm trên đường thẳng MM′", "IM bằng một nửa IM′", "Đối xứng tâm: tâm là trung điểm của đoạn nối điểm và ảnh của nó."],
    ["Trong phép quay tâm O, ảnh của chính tâm O là điểm nào?", "Chính điểm O", "Điểm đối xứng của O qua một điểm khác", "Không có ảnh", "Tâm quay là điểm bất động duy nhất của phép quay (với góc quay không phải bội của 360°)."],
    ["Phép quay tâm O với góc quay 180° tương đương với phép biến hình nào?", "Phép đối xứng tâm O", "Phép đối xứng trục qua O", "Phép tịnh tiến theo vectơ OO", "Quay nửa vòng quanh O đưa mỗi điểm tới điểm đối xứng với nó qua O."],
    ["Trong phép quay tâm O, khoảng cách từ O tới điểm M và tới ảnh M′ của M thế nào?", "Bằng nhau: OM bằng OM′", "OM′ dài gấp đôi OM", "OM′ bằng một nửa OM", "Phép quay là phép dời hình và giữ nguyên tâm nên OM = OM′."],
    ["Phép vị tự tâm O, tỉ số k biến điểm M thành điểm M′ thỏa mãn điều gì?", "Vectơ OM′ bằng k lần vectơ OM", "Vectơ OM′ bằng vectơ OM cộng k", "OM′ luôn bằng OM với mọi k", "Định nghĩa phép vị tự: ảnh M′ nằm trên đường thẳng OM và vectơ OM′ = k · vectơ OM."],
    ["Phép vị tự tỉ số k biến một đoạn thẳng thành đoạn thẳng có độ dài thế nào?", "Bằng |k| lần độ dài đoạn ban đầu", "Bằng k² lần độ dài đoạn ban đầu", "Luôn bằng độ dài đoạn ban đầu", "Độ dài được nhân với |k|; hướng có thể đảo ngược khi k âm."],
    ["Phép vị tự với tỉ số k = 1 là phép biến hình nào?", "Phép đồng nhất", "Phép đối xứng tâm", "Phép quay góc 180°", "k = 1: vectơ OM′ = vectơ OM nên mọi điểm giữ nguyên."],
    ["Phép vị tự với tỉ số k = −1 là phép biến hình nào?", "Phép đối xứng tâm với tâm là tâm vị tự", "Phép đối xứng trục", "Phép tịnh tiến", "k = −1: M′ đối xứng với M qua tâm vị tự O."],
    ["Phép dời hình là phép biến hình có tính chất nổi bật nào?", "Bảo toàn khoảng cách giữa hai điểm bất kỳ", "Nhân mọi khoảng cách với cùng một số khác 1", "Bảo toàn mọi góc nhưng thay đổi độ dài", "Nhờ bảo toàn khoảng cách, phép dời hình biến hình này thành hình bằng nó."],
    ["Phép dời hình biến một tam giác thành tam giác thế nào?", "Thành tam giác bằng tam giác ban đầu", "Thành tam giác đồng dạng tỉ số 2", "Thành một đoạn thẳng", "Ba cạnh và ba góc đều được bảo toàn nên hai tam giác bằng nhau."],
    ["Những phép biến hình nào sau đây đều là phép dời hình?", "Tịnh tiến, đối xứng trục, đối xứng tâm, phép quay", "Vị tự tỉ số 2, vị tự tỉ số 3", "Chỉ riêng phép vị tự", "Các phép tịnh tiến, đối xứng và quay đều bảo toàn khoảng cách; vị tự tỉ số khác ±1 thì không."],
    ["Phép đồng dạng tỉ số k (k > 0) biến mỗi đoạn thẳng thành đoạn thế nào?", "Có độ dài bằng k lần đoạn ban đầu", "Có độ dài bằng đoạn ban đầu cộng k", "Có độ dài không thay đổi với mọi k", "Phép đồng dạng nhân mọi độ dài với cùng một hệ số k dương."],
    ["Phép vị tự tỉ số k có phải là phép đồng dạng không?", "Có, là phép đồng dạng tỉ số |k|", "Không, vị tự không liên quan tới đồng dạng", "Chỉ khi k là số nguyên dương", "Mọi phép vị tự đều là phép đồng dạng với tỉ số |k|."],
    ["Hợp thành của hai phép tịnh tiến là phép biến hình nào?", "Một phép tịnh tiến", "Một phép quay", "Một phép vị tự", "Tịnh tiến theo vectơ u rồi theo vectơ v cho kết quả là tịnh tiến theo vectơ u + v."],
    ["Phép đối xứng trục biến một đường tròn thành đường tròn thế nào?", "Thành đường tròn bằng nó (cùng bán kính)", "Thành đường tròn có bán kính gấp đôi", "Thành một đường thẳng", "Đối xứng trục là phép dời hình nên bán kính đường tròn được giữ nguyên."],
    ["Phép tịnh tiến theo vectơ không là phép biến hình nào?", "Phép đồng nhất", "Phép đối xứng tâm", "Phép quay góc 90°", "Vectơ tịnh tiến bằng vectơ không thì mọi điểm đều giữ nguyên vị trí."]
  ];
  var m11cd1P = [["Phép tịnh tiến", "Dời điểm theo một vectơ"], ["Phép đối xứng trục", "Qua một đường thẳng"], ["Phép đối xứng tâm", "Qua một điểm"], ["Phép quay", "Quanh một tâm theo một góc"], ["Phép vị tự", "Theo một tâm và tỉ số k"], ["Phép dời hình", "Bảo toàn khoảng cách"], ["Phép đồng dạng", "Bảo toàn tỉ số độ dài"], ["Phép đồng nhất", "Giữ nguyên mọi điểm"]];

  /* ----- Chuyên đề 2: Lí thuyết đồ thị ----- */
  var m11cd2F = [
    ["Một đồ thị gồm những thành phần cơ bản nào?", "Tập hợp các đỉnh và tập hợp các cạnh", "Chỉ gồm các đỉnh, không có cạnh", "Chỉ gồm các đường thẳng song song", "Mỗi cạnh nối hai đỉnh của đồ thị; đồ thị thường được vẽ bằng các điểm (đỉnh) và đoạn cong/thẳng (cạnh)."],
    ["Hai đỉnh của đồ thị được gọi là kề nhau khi nào?", "Khi có một cạnh nối trực tiếp hai đỉnh đó", "Khi chúng có cùng bậc", "Khi giữa chúng có một đường đi bất kỳ", "Hai đỉnh kề nhau là hai đầu mút của cùng một cạnh."],
    ["Bậc của một đỉnh trong đồ thị là gì?", "Số cạnh liên thuộc với đỉnh đó", "Số đỉnh kề với mọi đỉnh còn lại", "Số đường đi đi qua đỉnh đó", "Một khuyên tại đỉnh đóng góp 2 vào bậc của đỉnh; đỉnh bậc 0 gọi là đỉnh cô lập."],
    ["Một khuyên (cạnh nối một đỉnh với chính nó) đóng góp bao nhiêu vào bậc của đỉnh đó?", "Đóng góp 2", "Đóng góp 1", "Đóng góp 0", "Khuyên có cả hai đầu mút cùng là đỉnh đó nên được tính hai lần trong bậc."],
    ["Theo định lí bắt tay (bổ đề bắt tay), tổng bậc của mọi đỉnh trong đồ thị bằng gì?", "Hai lần số cạnh của đồ thị", "Bằng số cạnh của đồ thị", "Bằng số đỉnh của đồ thị", "Mỗi cạnh đóng góp đúng 2 vào tổng bậc (một cho mỗi đầu mút) nên tổng bậc luôn là số chẵn."],
    ["Đồ thị đơn là đồ thị thỏa mãn điều kiện nào?", "Không có khuyên và không có cạnh song song", "Mọi đỉnh đều có bậc bằng nhau", "Không có đỉnh nào bậc 0", "Đồ thị đơn: giữa hai đỉnh có tối đa một cạnh và không có khuyên."],
    ["Cạnh song song trong đồ thị là gì?", "Hai cạnh khác nhau cùng nối một cặp đỉnh", "Hai cạnh không có đầu mút chung", "Một cạnh nối một đỉnh với chính nó", "Cạnh nối một đỉnh với chính nó gọi là khuyên, không phải cạnh song song."],
    ["Đồ thị đầy đủ với n đỉnh có tính chất gì?", "Mọi cặp đỉnh phân biệt đều được nối bằng một cạnh", "Mọi đỉnh đều có bậc 0", "Đồ thị không có cạnh nào", "Đồ thị đầy đủ n đỉnh ký hiệu Kₙ; mỗi đỉnh có bậc n − 1."],
    ["Số cạnh của đồ thị đầy đủ Kₙ bằng bao nhiêu?", "n(n − 1)/2", "n(n − 1)", "n²", "Có n đỉnh, mỗi đỉnh nối với n − 1 đỉnh còn lại; mỗi cạnh bị đếm hai lần nên số cạnh là n(n − 1)/2."],
    ["Đồ thị đầy đủ K₅ có bao nhiêu cạnh?", "10 cạnh", "5 cạnh", "20 cạnh", "Số cạnh của K₅ là 5 · 4/2 = 10."],
    ["Đường đi trong đồ thị là gì?", "Dãy các đỉnh mà hai đỉnh liên tiếp luôn kề nhau", "Tập hợp mọi đỉnh của đồ thị", "Một cạnh duy nhất của đồ thị", "Độ dài của đường đi là số cạnh trên đường đi đó."],
    ["Chu trình trong đồ thị là đường đi có đặc điểm gì?", "Bắt đầu và kết thúc tại cùng một đỉnh", "Đi qua mọi đỉnh đúng một lần", "Không chứa cạnh nào", "Chu trình là đường đi khép kín, trừ điểm đầu/cuối thì các đỉnh thường không lặp lại."],
    ["Đồ thị được gọi là liên thông khi nào?", "Giữa hai đỉnh bất kỳ đều có một đường đi", "Mọi đỉnh đều kề với mọi đỉnh khác", "Đồ thị có đúng một chu trình", "Đồ thị đầy đủ là trường hợp riêng của đồ thị liên thông, nhưng liên thông không cần đầy đủ."],
    ["Đường đi Euler của đồ thị là đường đi có đặc điểm gì?", "Đi qua mỗi cạnh của đồ thị đúng một lần", "Đi qua mỗi đỉnh đúng một lần", "Đi qua cạnh dài nhất đúng một lần", "Đường đi qua mỗi đỉnh đúng một lần là đường đi Hamilton, khác với đường đi Euler."],
    ["Đồ thị liên thông có chu trình Euler khi nào?", "Khi mọi đỉnh đều có bậc chẵn", "Khi mọi đỉnh đều có bậc lẻ", "Khi đồ thị có đúng hai đỉnh bậc lẻ", "Có đúng hai đỉnh bậc lẻ thì đồ thị có đường đi Euler (không khép kín) nhưng không có chu trình Euler."],
    ["Đồ thị của bài toán bảy cây cầu ở Königsberg có đường đi Euler không?", "Không, vì có các đỉnh bậc lẻ", "Có, và đó là một chu trình Euler", "Có, vì đồ thị có ít cạnh", "Bài toán nổi tiếng này dẫn tới kết luận: không có đường đi nào qua mỗi cầu đúng một lần — khởi nguồn của lí thuyết đồ thị."],
    ["Đường đi Hamilton của đồ thị là đường đi có đặc điểm gì?", "Đi qua mỗi đỉnh của đồ thị đúng một lần", "Đi qua mỗi cạnh đúng một lần", "Chỉ đi qua các đỉnh bậc chẵn", "Chu trình Hamilton là đường đi Hamilton khép kín, quay về đỉnh xuất phát."],
    ["Chu trình Hamilton khác đường đi Hamilton ở điểm nào?", "Chu trình quay về đỉnh xuất phát sau khi qua hết các đỉnh", "Chu trình đi qua mỗi cạnh đúng một lần", "Chu trình ngắn hơn mọi đường đi khác", "Chu trình Hamilton thăm mỗi đỉnh đúng một lần rồi trở lại điểm đầu."],
    ["Cây trong lí thuyết đồ thị là đồ thị thế nào?", "Liên thông và không có chu trình", "Đầy đủ và có nhiều chu trình", "Không liên thông và không có cạnh", "Cây là đồ thị liên thông tối thiểu: bỏ đi bất kỳ cạnh nào cũng làm nó mất liên thông."],
    ["Một cây có n đỉnh thì có bao nhiêu cạnh?", "Đúng n − 1 cạnh", "Đúng n cạnh", "Đúng n(n − 1)/2 cạnh", "Mọi cây với n đỉnh đều có n − 1 cạnh; thêm một cạnh bất kỳ sẽ tạo đúng một chu trình."],
    ["Bài toán tìm đường đi tối ưu trên đồ thị có trọng số thường yêu cầu điều gì?", "Tìm đường đi có tổng trọng số nhỏ nhất", "Tìm đường đi qua nhiều cạnh nhất", "Tìm đường đi có tổng trọng số lớn nhất", "Trọng số của cạnh thường là độ dài, thời gian hoặc chi phí; đường đi tối ưu là đường rẻ/ngắn nhất."],
    ["Trọng số của một cạnh trong đồ thị là gì?", "Số được gán cho cạnh, chỉ độ dài hay chi phí", "Số đỉnh kề với cạnh đó", "Bậc của hai đầu mút của cạnh", "Đồ thị mà mỗi cạnh có một trọng số được gọi là đồ thị có trọng số."],
    ["Đỉnh có bậc bằng 0 trong đồ thị được gọi là gì?", "Đỉnh cô lập", "Đỉnh treo", "Đỉnh kề", "Đỉnh cô lập không kề với bất kỳ đỉnh nào; đỉnh bậc 1 được gọi là đỉnh treo (lá trong cây)."],
    ["Tổng bậc của mọi đỉnh trong một đồ thị luôn là số gì?", "Luôn là một số chẵn", "Luôn là một số lẻ", "Luôn bằng số đỉnh", "Vì tổng bậc bằng hai lần số cạnh nên nó luôn chẵn — hệ quả của định lí bắt tay."]
  ];
  var m11cd2P = [["Đỉnh bậc 0", "Đỉnh cô lập"], ["Tổng bậc của mọi đỉnh", "Hai lần số cạnh"], ["Đường đi Euler", "Qua mỗi cạnh đúng một lần"], ["Đường đi Hamilton", "Qua mỗi đỉnh đúng một lần"], ["Cây có n đỉnh", "Có đúng n − 1 cạnh"], ["Đồ thị đầy đủ K₅", "Có 10 cạnh"], ["Chu trình trong đồ thị", "Đường đi khép kín"], ["Khuyên tại một đỉnh", "Đóng góp 2 vào bậc"]];

  /* ----- Chuyên đề 3: Một số yếu tố vẽ kĩ thuật ----- */
  var m11cd3F = [
    ["Hình chiếu vuông góc của một vật thể thu được bằng phép chiếu nào?", "Phép chiếu có tia chiếu vuông góc mặt phẳng chiếu", "Phép chiếu có tia chiếu xiên tuỳ ý", "Phép chiếu xuyên tâm từ một điểm", "Trong phép chiếu vuông góc, các tia chiếu song song nhau và vuông góc với mặt phẳng hình chiếu."],
    ["Phương pháp hình chiếu vuông góc cơ bản dùng ba hình chiếu nào?", "Hình chiếu đứng, hình chiếu bằng và hình chiếu cạnh", "Hình chiếu xiên, hình chiếu xuyên tâm và hình cắt", "Chỉ một hình chiếu duy nhất", "Ba hình chiếu trên ba mặt phẳng chiếu đôi một vuông góc cho thông tin đầy đủ về vật thể."],
    ["Hình chiếu đứng của vật thể thu được khi chiếu lên mặt phẳng nào?", "Mặt phẳng hình chiếu đứng (mặt chính diện)", "Mặt phẳng nằm ngang phía dưới vật", "Mặt phẳng bên cạnh vật", "Hình chiếu đứng cho thấy chiều dài và chiều cao của vật thể."],
    ["Hình chiếu bằng của vật thể thu được khi nhìn theo hướng nào?", "Nhìn từ phía trên xuống mặt phẳng nằm ngang", "Nhìn từ phía trước tới", "Nhìn từ phía bên trái sang", "Hình chiếu bằng cho thấy chiều dài và chiều rộng của vật thể."],
    ["Theo cách bố trí thông dụng, hình chiếu bằng được đặt ở đâu so với hình chiếu đứng?", "Ngay phía dưới hình chiếu đứng", "Ngay phía trên hình chiếu đứng", "Ngay bên phải hình chiếu đứng", "Hình chiếu bằng đặt dưới, hình chiếu cạnh đặt bên phải hình chiếu đứng để dễ liên hệ các kích thước."],
    ["Theo cách bố trí thông dụng, hình chiếu cạnh được đặt ở đâu so với hình chiếu đứng?", "Ngay bên phải hình chiếu đứng", "Ngay phía dưới hình chiếu đứng", "Ngay phía trên hình chiếu đứng", "Vị trí của các hình chiếu phải tuân theo quy ước để người đọc liên hệ đúng các chiều của vật."],
    ["Hình chiếu trục đo của vật thể là hình biểu diễn có đặc điểm gì?", "Thể hiện ba chiều của vật trên một mặt phẳng", "Chỉ thể hiện một chiều của vật", "Luôn có kích thước bằng vật thật", "Hình chiếu trục đo dựng bằng phép chiếu song song, cho hình ảnh trực quan giống khi quan sát vật."],
    ["Trong hình chiếu trục đo vuông góc đều, hệ số biến dạng theo ba trục toạ độ thế nào?", "Bằng nhau theo cả ba trục", "Chỉ bằng nhau theo hai trục", "Khác nhau hoàn toàn theo ba trục", "Hệ số biến dạng bằng nhau nên vật ít bị biến dạng lệch, góc giữa các trục chiếu đều bằng 120°."],
    ["Trong hình chiếu trục đo xiên góc cân, hệ số biến dạng của trục nghiêng bằng bao nhiêu so với hai trục còn lại?", "Bằng một nửa của chúng", "Bằng hai lần của chúng", "Bằng đúng của chúng", "Hai trục giữ hệ số 1, trục nghiêng (chiều sâu) rút còn 1/2 để hình gọn và dễ vẽ."],
    ["Bản vẽ kĩ thuật là tài liệu được trình bày bằng cách nào?", "Bằng hình vẽ và ký hiệu theo quy tắc thống nhất", "Bằng văn bản mô tả tự do, không có quy tắc", "Chỉ bằng ảnh chụp của sản phẩm", "Bản vẽ kĩ thuật là phương tiện thông tin thống nhất trong sản xuất và xây dựng."],
    ["Tỉ lệ của bản vẽ kĩ thuật được định nghĩa là gì?", "Tỉ số kích thước trên bản vẽ và kích thước thực", "Tỉ số kích thước thực và kích thước trên bản vẽ", "Hiệu của kích thước thực và kích thước vẽ", "Ví dụ tỉ lệ 1 : 2 nghĩa là kích thước trên bản vẽ bằng một nửa kích thước thực."],
    ["Tỉ lệ 1 : 2 trên bản vẽ kĩ thuật thuộc loại tỉ lệ nào?", "Tỉ lệ thu nhỏ", "Tỉ lệ phóng to", "Tỉ lệ nguyên hình", "Số thứ nhất nhỏ hơn số thứ hai: hình vẽ nhỏ hơn vật thật."],
    ["Tỉ lệ 2 : 1 trên bản vẽ kĩ thuật thuộc loại tỉ lệ nào?", "Tỉ lệ phóng to", "Tỉ lệ thu nhỏ", "Tỉ lệ nguyên hình", "Tỉ lệ phóng to dùng cho các chi tiết nhỏ cần vẽ lớn để dễ đọc."],
    ["Tỉ lệ 1 : 1 trên bản vẽ kĩ thuật thuộc loại tỉ lệ nào?", "Tỉ lệ nguyên hình (bằng kích thước thật)", "Tỉ lệ thu nhỏ một nửa", "Tỉ lệ phóng to gấp đôi", "Với tỉ lệ 1 : 1, kích thước trên bản vẽ đúng bằng kích thước thực của vật."],
    ["Dù bản vẽ dùng tỉ lệ nào, các số kích thước ghi trên bản vẽ là kích thước gì?", "Kích thước thực của vật thể", "Kích thước đo được trên giấy vẽ", "Kích thước đã nhân với tỉ lệ", "Người gia công luôn căn cứ vào số ghi kích thước thật, không đo trực tiếp trên bản vẽ."],
    ["Trên bản vẽ kĩ thuật, nét liền đậm được dùng để vẽ loại đường nào?", "Đường bao thấy của vật thể", "Đường bao khuất của vật thể", "Đường tâm và trục đối xứng", "Nét liền đậm là nét nổi bật nhất, thể hiện các cạnh nhìn thấy được của vật."],
    ["Trên bản vẽ kĩ thuật, nét đứt được dùng để vẽ loại đường nào?", "Đường bao khuất của vật thể", "Đường bao thấy của vật thể", "Đường kích thước", "Các cạnh bị che khuất được vẽ bằng nét đứt mảnh."],
    ["Trên bản vẽ kĩ thuật, nét gạch chấm mảnh thường dùng để vẽ đường nào?", "Đường tâm và trục đối xứng", "Đường bao thấy của vật thể", "Đường bao khuất của vật thể", "Đường tâm giúp xác định vị trí tâm của lỗ, đường tròn và tính đối xứng của chi tiết."],
    ["Khổ giấy A4 theo tiêu chuẩn có kích thước bao nhiêu?", "210 mm × 297 mm", "297 mm × 420 mm", "148 mm × 210 mm", "A3 là 297 × 420 mm, A5 là 148 × 210 mm; A4 là khổ giấy thông dụng nhất."],
    ["Khung tên của bản vẽ kĩ thuật thường được bố trí ở vị trí nào?", "Ở góc dưới bên phải của bản vẽ", "Ở góc trên bên trái của bản vẽ", "Ở chính giữa bản vẽ", "Khung tên ghi tên bản vẽ, tỉ lệ, người vẽ, đơn vị… và luôn nằm ở góc dưới bên phải."],
    ["Hình chiếu vuông góc của một đoạn thẳng song song với mặt phẳng chiếu có độ dài thế nào?", "Bằng độ dài thật của đoạn thẳng", "Luôn ngắn hơn độ dài thật", "Luôn bằng một nửa độ dài thật", "Đoạn thẳng song song mặt phẳng chiếu thì hình chiếu giữ nguyên độ dài; nếu xiên góc thì hình chiếu ngắn hơn."],
    ["Muốn xác định vị trí của một điểm trong không gian bằng hình chiếu vuông góc, cần tối thiểu mấy hình chiếu của điểm đó?", "Hai hình chiếu vuông góc", "Một hình chiếu là đủ", "Bốn hình chiếu vuông góc", "Một hình chiếu chỉ cho hai toạ độ; hai hình chiếu trên hai mặt phẳng khác nhau mới xác định đủ vị trí của điểm."],
    ["Hình cắt trên bản vẽ kĩ thuật được dùng với mục đích gì?", "Biểu diễn cấu tạo bên trong của vật thể", "Trang trí cho bản vẽ đẹp hơn", "Thay thế hoàn toàn hình chiếu đứng", "Khi cần, mặt phẳng cắt tưởng tượng cắt vật để lộ rõ phần bên trong trong hình cắt."]
  ];
  var m11cd3P = [["Hình chiếu đứng", "Nhìn từ phía trước"], ["Hình chiếu bằng", "Nhìn từ phía trên xuống"], ["Hình chiếu cạnh", "Nhìn từ phía bên"], ["Tỉ lệ 1 : 2", "Tỉ lệ thu nhỏ"], ["Tỉ lệ 2 : 1", "Tỉ lệ phóng to"], ["Nét liền đậm", "Đường bao thấy"], ["Nét đứt", "Đường bao khuất"], ["Khổ giấy A4", "210 mm × 297 mm"]];

  var MATH11 = [
    TP("m11-c1", "🌀", "Chương I: Hàm số lượng giác và phương trình lượng giác", "Bài 1–4 • Góc lượng giác, công thức lượng giác, hàm số lượng giác, PTLG cơ bản", MP(KP(m11c1F, m11c1P), { choose: [x11TrigVal, x11ArcLen], blank: [x11ArcLen], match: [], games: [] }), KN(m11c1F, m11c1P, "Toán")),
    TP("m11-c2", "🔢", "Chương II: Dãy số. Cấp số cộng và cấp số nhân", "Bài 5–7 • Dãy số, cấp số cộng, cấp số nhân", MP(KP(m11c2F, m11c2P), { choose: [x11AP, x11GP], blank: [x11AP, x11GP], match: [], games: [] }), KN(m11c2F, m11c2P, "Toán")),
    TP("m11-c3", "📊", "Chương III: Các số đặc trưng của mẫu số liệu ghép nhóm", "Bài 8–9 • Mẫu ghép nhóm, trung bình, trung vị, tứ phân vị, mốt", MP(KP(m11c3F, m11c3P), { choose: [x11GroupedMean, x11GroupedMedian], blank: [x11GroupedMean], match: [], games: [] }), KN(m11c3F, m11c3P, "Toán")),
    TP("m11-c4", "🧊", "Chương IV: Quan hệ song song trong không gian", "Bài 10–14 • Đường thẳng, mặt phẳng, song song, phép chiếu song song", MP(KP(m11c4F, m11c4P), { choose: [x11Prism, x11Pyramid], blank: [x11Prism, x11Pyramid], match: [], games: [] }), KN(m11c4F, m11c4P, "Toán")),
    TP("m11-c5", "🎯", "Chương V: Giới hạn. Hàm số liên tục", "Bài 15–17 • Giới hạn dãy số, giới hạn hàm số, hàm liên tục", MP(KP(m11c5F, m11c5P), { choose: [x11LimSeq, x11LimFunc], blank: [x11LimSeq, x11LimFunc], match: [], games: [] }), KN(m11c5F, m11c5P, "Toán")),
    TP("m11-c6", "📈", "Chương VI: Hàm số mũ và hàm số lôgarit", "Bài 18–21 • Luỹ thừa, lôgarit, hàm mũ – lôgarit, PT/BPT mũ – lôgarit", MP(KP(m11c6F, m11c6P), { choose: [x11ExpLog, x11ExpEq], blank: [x11ExpLog, x11ExpEq], match: [], games: [] }), KN(m11c6F, m11c6P, "Toán")),
    TP("m11-c7", "📐", "Chương VII: Quan hệ vuông góc trong không gian", "Bài 22–27 • Vuông góc, góc, khoảng cách, thể tích", MP(KP(m11c7F, m11c7P), { choose: [x11Volume, x11PythDist], blank: [x11PythDist], match: [], games: [] }), KN(m11c7F, m11c7P, "Toán")),
    TP("m11-c8", "🎲", "Chương VIII: Các quy tắc tính xác suất", "Bài 28–30 • Biến cố hợp/giao/độc lập, công thức cộng và nhân xác suất", MP(KP(m11c8F, m11c8P), { choose: [x11ProbRule, x11ProbBall], blank: [], match: [], games: [] }), KN(m11c8F, m11c8P, "Toán")),
    TP("m11-c9", "↗️", "Chương IX: Đạo hàm", "Bài 31–33 • Định nghĩa, ý nghĩa, quy tắc tính đạo hàm, đạo hàm cấp hai", MP(KP(m11c9F, m11c9P), { choose: [x11Deriv, x11Tangent], blank: [x11Deriv], match: [], games: [] }), KN(m11c9F, m11c9P, "Toán")),
    TP("m11-cd1", "🔄", "Chuyên đề 1: Phép biến hình trong mặt phẳng", "Chuyên đề Toán • Phép biến hình, tịnh tiến, đối xứng, quay, vị tự, dời hình – đồng dạng", KP(m11cd1F, m11cd1P), KN(m11cd1F, m11cd1P, "Toán")),
    TP("m11-cd2", "🕸️", "Chuyên đề 2: Lí thuyết đồ thị", "Chuyên đề Toán • Đỉnh, cạnh, bậc, đường đi Euler – Hamilton, cây, đường đi tối ưu", KP(m11cd2F, m11cd2P), KN(m11cd2F, m11cd2P, "Toán")),
    TP("m11-cd3", "✏️", "Chuyên đề 3: Một số yếu tố vẽ kĩ thuật", "Chuyên đề Toán • Hình chiếu vuông góc, hình chiếu trục đo, bản vẽ kĩ thuật, tỉ lệ bản vẽ", KP(m11cd3F, m11cd3P), KN(m11cd3F, m11cd3P, "Toán"))
  ];
  /* ==================================================================
     NGỮ VĂN 11 — Kết nối tri thức
     ================================================================== */
  var nv11b1F = [
    ["Điểm nhìn trong truyện kể là gì?", "Vị trí, góc độ người kể chọn để quan sát sự việc", "Tên địa điểm diễn ra câu chuyện", "Thời gian bắt đầu câu chuyện", "Điểm nhìn quyết định người đọc thấy sự việc qua mắt ai và hiểu nhân vật tới đâu."],
    ["Người kể chuyện ngôi thứ nhất có đặc điểm gì?", "Là nhân vật trong truyện, xưng “tôi” để kể", "Luôn biết hết mọi bí mật của mọi nhân vật", "Không tham gia bất kì sự việc nào trong truyện", "Người kể ngôi thứ nhất kể những gì mình chứng kiến, trải qua, nên gần gũi nhưng có giới hạn."],
    ["Người kể chuyện ngôi thứ ba có đặc điểm gì?", "Đứng ngoài truyện, kể về các nhân vật khác", "Chính là nhân vật chính xưng “tôi”", "Chỉ kể đúng một cảnh duy nhất", "Người kể ngôi thứ ba có thể toàn tri hoặc chỉ quan sát từ bên ngoài."],
    ["Điểm nhìn toàn tri là điểm nhìn thế nào?", "Người kể biết hết nội tâm của mọi nhân vật", "Người kể không biết gì về nhân vật", "Nhân vật tự kể lại đời mình", "Điểm nhìn toàn tri thường gặp trong truyện kể truyền thống và truyện của Nam Cao."],
    ["“Vợ nhặt” là truyện ngắn của nhà văn nào?", "Kim Lân", "Nam Cao", "Ngô Tất Tố", "Kim Lân (1920–2007) nổi tiếng với các truyện viết về nông thôn và nạn đói 1945."],
    ["Tên thật của nhà văn Kim Lân là gì?", "Nguyễn Văn Tài, quê ở Từ Sơn, Bắc Ninh", "Trần Hữu Tri, quê ở Hà Nam", "Nguyễn Văn Tài, quê ở Hà Tĩnh", "Kim Lân là bút danh; ông chuyên viết về đời sống nông thôn Việt Nam."],
    ["“Vợ nhặt” đặt trong bối cảnh lịch sử nào?", "Nạn đói năm 1945, ở xóm ngụ cư nghèo", "Chiến tranh biên giới năm 1979", "Cải cách ruộng đất ở miền Bắc", "Nạn đói 1945 làm hơn hai triệu người chết; truyện dựng lại đời sống người nghèo trong thảm cảnh ấy."],
    ["Nhân vật chính của “Vợ nhặt” là ai?", "Anh cu Tràng, người kéo xe thóc thuê", "Chí Phèo, người nông dân bị tha hoá", "Lão Hạc, người nông dân nghèo", "Tràng nghèo, xấu trai, ế vợ, bỗng “nhặt” được vợ giữa nạn đói — tình huống vừa lạ vừa cảm động."],
    ["Người vợ trong “Vợ nhặt” được gọi thế nào?", "Không có tên riêng, thường gọi là “thị”", "Thị Nở", "Chị Dậu", "Việc không đặt tên nhấn mạnh thân phận vô danh, trôi dạt của người nghèo trong nạn đói."],
    ["Mẹ của Tràng trong “Vợ nhặt” là ai?", "Bà cụ Tứ", "Bà cụ Hạc", "U Tràng, tên là cụ Nhị", "Bà cụ Tứ đón nhận nàng dâu “nhặt” bằng tấm lòng bao dung và niềm tin vào ngày mai."],
    ["Chi tiết bữa cơm đón dâu trong “Vợ nhặt” có gì đáng nhớ?", "Cháo cám đắng chát mà vẫn ấm tình người", "Mâm cỗ đầy thịt cá sang trọng", "Bữa tiệc ở nhà địa chủ giàu có", "Nồi cháo cám là chi tiết đắt: cái đói hiện hình mà tình người, hi vọng vẫn nảy nở."],
    ["Hình ảnh cuối truyện “Vợ nhặt” gợi điều gì?", "Đám người đói và lá cờ đỏ trong tâm trí Tràng", "Cảnh Tràng bỏ làng ra đi mãi mãi", "Một đám cưới linh đình ở xóm ngụ cư", "Kết thúc mở gợi hướng đi, niềm tin của người nghèo khổ vào tương lai đổi đời."],
    ["Giá trị nhân đạo nổi bật của “Vợ nhặt” là gì?", "Ca ngợi khát vọng sống và tình người trong đói khổ", "Châm biếm người nông dân nghèo", "Ca ngợi sự giàu sang của địa chủ", "Ngay bên bờ cái chết, con người vẫn hướng về sự sống, mái ấm và tình thương."],
    ["“Chí Phèo” là truyện ngắn của nhà văn nào?", "Nam Cao", "Kim Lân", "Tô Hoài", "Nam Cao (1915–1951) là bậc thầy truyện ngắn hiện thực phê phán của văn học Việt Nam."],
    ["Tên thật của nhà văn Nam Cao là gì?", "Trần Hữu Tri", "Nguyễn Văn Tài", "Trần Hữu Thụ", "Nam Cao quê ở làng Đại Hoàng, phủ Lí Nhân, tỉnh Hà Nam — nguyên mẫu của làng Vũ Đại."],
    ["Nhân vật Chí Phèo vốn có bản chất thế nào trước khi vào tù?", "Anh canh điền hiền lành, lương thiện, tự trọng", "Một tên lưu manh chuyên nghiệp từ nhỏ", "Một viên quan tham lam, độc ác", "Nhà tù phong kiến đã biến người nông dân lương thiện thành “con quỷ dữ của làng Vũ Đại”."],
    ["Ai là kẻ đã đẩy Chí Phèo vào con đường tha hoá?", "Bá Kiến, lí trưởng gian ác của làng Vũ Đại", "Thị Nở, người phụ nữ dở hơi", "Ông giáo Thứ, người trí thức nghèo", "Bá Kiến ghen tuông, vu vạ và đẩy Chí vào tù; ra tù, Chí bị xã hội đẩy tới lưu manh hoá."],
    ["Thị Nở có vai trò gì trong đời Chí Phèo?", "Đánh thức nhân tính, khát vọng lương thiện của Chí", "Đẩy Chí vào tù oan bảy năm", "Cướp hết ruộng đất của Chí", "Tình thương giản dị của Thị Nở làm Chí lần đầu muốn hoàn lương, làm người tử tế."],
    ["Chi tiết “bát cháo hành” trong “Chí Phèo” có ý nghĩa gì?", "Tình thương giản dị làm Chí tỉnh ngộ, muốn hoàn lương", "Món ăn xa xỉ của nhà Bá Kiến", "Bằng chứng Chí mắc nợ Thị Nở", "Bát cháo hành nóng hổi khi ốm là lần đầu Chí được chăm sóc bằng tình người thật sự."],
    ["Bi kịch lớn nhất của Chí Phèo là gì?", "Bị xã hội cự tuyệt quyền làm người lương thiện", "Không có ruộng để cày cấy", "Không được uống rượu thoả thích", "Khi Chí muốn hoàn lương, định kiến xã hội và bà cô Thị Nở đã đóng sập cánh cửa trở lại."],
    ["Kết thúc của truyện “Chí Phèo” diễn ra thế nào?", "Chí giết Bá Kiến rồi tự kết liễu đời mình", "Chí được minh oan và làm lại cuộc đời", "Chí bỏ làng đi biệt tích", "Cái chết của Chí là tiếng kêu tố cáo xã hội phong kiến chà đạp quyền sống của con người."],
    ["Ngôn ngữ nói có đặc điểm nổi bật nào?", "Giao tiếp trực tiếp, tự nhiên, kèm cử chỉ, nét mặt", "Phải trau chuốt từng chữ như văn bản luật", "Chỉ tồn tại dưới dạng chữ viết", "Ngôn ngữ nói linh hoạt, có người nghe đáp lại ngay; SGK Bài 1 phân biệt nói và viết."],
    ["Ngôn ngữ viết có đặc điểm nổi bật nào?", "Dùng chữ viết, trau chuốt, đọc lại được nhiều lần", "Bộc phát, không cần đúng chính tả", "Chỉ dùng trong hội thoại hằng ngày", "Văn viết đòi hỏi chính xác, mạch lạc vì người đọc không có mặt để hỏi lại."],
    ["Vì sao truyện kể cần chọn điểm nhìn phù hợp?", "Điểm nhìn hay làm câu chuyện sâu sắc, hấp dẫn hơn", "Điểm nhìn chỉ để câu chuyện dài thêm", "Điểm nhìn không ảnh hưởng tới ý nghĩa truyện", "Đổi điểm nhìn là đổi cách hiểu sự việc: cùng một chuyện, kể qua mắt Tràng hay bà cụ Tứ sẽ khác hẳn."]
  ];
  var nv11b1P = [["Vợ nhặt", "Kim Lân"], ["Chí Phèo", "Nam Cao"], ["Anh cu Tràng", "Nhân vật chính của Vợ nhặt"], ["Bà cụ Tứ", "Mẹ của Tràng"], ["Thị Nở", "Người nấu cháo hành cho Chí"], ["Bá Kiến", "Kẻ đẩy Chí Phèo vào tù"], ["Bát cháo hành", "Chi tiết đánh thức nhân tính Chí"]];
  var nv11b2F = [
    ["“Nhớ đồng” là bài thơ của nhà thơ nào?", "Tố Hữu", "Huy Cận", "Xuân Diệu", "Tố Hữu (1920–2002) là lá cờ đầu của thơ ca cách mạng Việt Nam."],
    ["Tên thật của nhà thơ Tố Hữu là gì?", "Nguyễn Kim Thành", "Cù Huy Cận", "Nguyễn Kim Tố", "Tố Hữu quê ở Thừa Thiên Huế, tham gia cách mạng từ rất sớm và bị thực dân Pháp bắt giam."],
    ["“Nhớ đồng” được viết trong hoàn cảnh nào?", "Khi tác giả bị thực dân Pháp giam giữ", "Khi tác giả đi du học ở nước ngoài", "Sau khi tác giả đã về hưu", "Bị giam, cách biệt quê hương, nhà thơ nghe tiếng hò ngoài song sắt mà nhớ đồng quê da diết."],
    ["Nỗi nhớ trung tâm trong “Nhớ đồng” là gì?", "Nhớ đồng quê, ruộng đồng và những người dân quê", "Nhớ một thành phố lớn ở châu Âu", "Nhớ chiến trường khói lửa ác liệt", "Từ nhớ đồng, bài thơ mở ra tình yêu quê hương và đồng cảm với người nông dân lao khổ."],
    ["Hình ảnh nào khơi dậy nỗi nhớ trong “Nhớ đồng”?", "Tiếng hò quê hương vang lên lẻ loi", "Tiếng còi tàu hoả trong đêm", "Tiếng chuông nhà thờ buổi sáng", "Tiếng hò “lẻ loi” xuyên qua tù ngục, đánh thức cả trời quê trong tâm hồn người tù trẻ."],
    ["“Tràng giang” là bài thơ nổi tiếng của ai?", "Huy Cận", "Tố Hữu", "Hàn Mặc Tử", "Huy Cận (1919–2005) là nhà thơ tiêu biểu của phong trào Thơ mới."],
    ["Tên thật của nhà thơ Huy Cận là gì?", "Cù Huy Cận", "Nguyễn Huy Cận", "Cù Huy Tưởng", "Huy Cận quê ở Hà Tĩnh, sớm nổi tiếng với tập thơ “Lửa thiêng”."],
    ["“Tràng giang” được in trong tập thơ nào?", "Tập “Lửa thiêng” (1940)", "Tập “Từ ấy” (1937)", "Tập “Gió lộng” (1938)", "Bài thơ sáng tác năm 1939, là một trong những bài thơ hay nhất của Huy Cận trước Cách mạng."],
    ["“Tràng giang” gợi cảm hứng từ dòng sông nào?", "Sông Hồng mênh mông, sóng nước dạt dào", "Sông Hương thơ mộng ở Huế", "Sông Đà hung dữ ở Tây Bắc", "Đứng trước sông dài, nhà thơ bâng khuâng trước vũ trụ rộng lớn và kiếp người nhỏ bé."],
    ["Câu thơ nào mở đầu bài “Tràng giang”?", "“Sóng gợn tràng giang buồn điệp điệp”", "“Lớp lớp mây cao đùn núi bạc”", "“Con thuyền xuôi mái nước song song”", "Điệp từ “điệp điệp” gợi sóng nối sóng vô tận và nỗi buồn triền miên của nhân vật trữ tình."],
    ["Tâm trạng chủ đạo trong “Tràng giang” là gì?", "Buồn, cô đơn, bâng khuâng trước vũ trụ bao la", "Vui tươi, phấn khởi trước mùa xuân", "Phẫn nộ, căm thù giặc xâm lược", "Nỗi buồn Thơ mới: cái “tôi” lẻ loi khao khát hoà hợp với đời, với quê hương đất nước."],
    ["Hình ảnh “bèo dạt” trong “Tràng giang” gợi điều gì?", "Kiếp người trôi nổi, lạc lõng giữa dòng đời", "Cảnh mùa màng bội thu của làng quê", "Đội thuyền đánh cá ra khơi", "Những cánh bèo “dạt về đâu” là ẩn dụ thân phận con người bơ vơ thời trước Cách mạng."],
    ["“Con đường mùa đông” là bài thơ của nhà thơ nào?", "A-lếch-xan-đrơ Pu-skin (Nga)", "Sê-khốp (Nga)", "Léc-man-tốp (Nga)", "Pu-skin (1799–1837) được tôn vinh là “mặt trời thi ca Nga”, người đặt nền móng văn học Nga hiện đại."],
    ["Pu-skin được tôn vinh bằng danh hiệu nào?", "“Mặt trời của thi ca Nga”", "“Thi thánh của nước Nga”", "“Ông hoàng truyện ngắn Nga”", "Pu-skin là đại thi hào dân tộc Nga, mất sớm ở tuổi 38 trong một cuộc đấu súng."],
    ["Khung cảnh trong “Con đường mùa đông” là gì?", "Con đường tuyết phủ, xe tam mã lặng lẽ trong đêm", "Cánh đồng lúa chín vàng rực", "Bến cảng nhộn nhịp tàu thuyền", "Đêm đông Nga lạnh giá, ánh trăng mờ và tiếng nhạc ngựa tạo không khí buồn, mơ màng."],
    ["Nhân vật trữ tình trong “Con đường mùa đông” mong ước gì?", "Về bên người yêu, bên bếp lửa ấm áp, quên buồn", "Ra trận lập chiến công hiển hách", "Đi chu du khắp các nước châu Âu", "Giữa hành trình đơn độc, niềm an ủi của thi nhân là tình yêu và mái ấm chờ đợi phía trước."],
    ["Cấu tứ trong thơ trữ tình là gì?", "Cách triển khai, tổ chức ý thơ và hình ảnh thơ", "Số chữ trong mỗi dòng thơ", "Cách gieo vần ở cuối các dòng thơ", "Cấu tứ là “ý đồ” bố cục cảm xúc: thơ phát triển theo mạch cảm xúc, liên tưởng của tác giả."],
    ["Hình ảnh trong thơ trữ tình có vai trò gì?", "Gợi cảm xúc, thể hiện tâm trạng của cái “tôi” trữ tình", "Chỉ để trang trí cho bài thơ dài thêm", "Thay thế hoàn toàn cho nhịp điệu thơ", "Hình ảnh thơ không chỉ tả cảnh mà là cảnh mang tâm trạng, “cảnh nào cũng mang tâm hồn người”."],
    ["Thơ trữ tình khác truyện kể ở điểm cốt yếu nào?", "Thơ bộc lộ cảm xúc; truyện dựng sự việc, nhân vật", "Thơ không bao giờ có hình ảnh", "Truyện không bao giờ có cảm xúc", "Đây là kiến thức nền xuyên suốt Bài 1 và Bài 2 của SGK Ngữ văn 11."],
    ["Tố Hữu thuộc dòng thơ nào của văn học Việt Nam?", "Thơ cách mạng, gắn lí tưởng với cảm xúc cá nhân", "Thơ tượng trưng thuần tuý nghệ thuật", "Thơ hài hước châm biếm xã hội", "Thơ Tố Hữu là tiếng nói của người chiến sĩ cách mạng, tiêu biểu là tập “Từ ấy”."],
    ["Huy Cận trước Cách mạng thuộc phong trào thơ nào?", "Phong trào Thơ mới (1932–1945)", "Phong trào thơ cách mạng kháng chiến", "Phong trào thơ đồng quê trung đại", "Cùng Xuân Diệu, Hàn Mặc Tử, Huy Cận là gương mặt lớn của Thơ mới với nỗi buồn vũ trụ."],
    ["Điệp ngữ trong “Tràng giang” có tác dụng gì?", "Nhấn mạnh nỗi buồn triền miên, sóng nối tiếp sóng", "Làm bài thơ trở nên vui nhộn", "Giúp đếm số câu trong bài thơ", "Các điệp từ “điệp điệp”, “song song”, “lớp lớp” tạo nhịp mênh mang cho bài thơ."],
    ["Nhan đề “Tràng giang” nên hiểu là gì?", "Dòng sông dài, rộng lớn, mênh mông sóng nước", "Tên riêng của một con sông ở Huế", "Một bến đò nhỏ ở làng quê", "“Tràng giang” là từ Hán Việt chỉ sông dài; nhan đề đã gợi không gian vũ trụ bao la của bài thơ."],
    ["Thông điệp chung của chùm thơ Bài 2 là gì?", "Cái “tôi” trữ tình trước thiên nhiên, quê hương, tình yêu", "Ca ngợi chiến công của các vị tướng", "Hướng dẫn kĩ thuật làm thơ lục bát", "Ba bài thơ của ba nền thơ cùng cho thấy sức mạnh của cấu tứ và hình ảnh trữ tình."]
  ];
  var nv11b2P = [["Nhớ đồng", "Tố Hữu"], ["Tràng giang", "Huy Cận"], ["Con đường mùa đông", "Pu-skin"], ["Lửa thiêng", "Tập thơ của Huy Cận"], ["Từ ấy", "Tập thơ của Tố Hữu"], ["Mặt trời thi ca Nga", "Danh hiệu của Pu-skin"], ["Sóng gợn tràng giang", "Câu mở đầu Tràng giang"]];
  var nv11b3F = [
    ["“Chiếu cầu hiền” là tác phẩm của ai?", "Ngô Thì Nhậm", "Nguyễn Trãi", "Lê Thánh Tông", "Ngô Thì Nhậm (1746–1803) soạn chiếu này thay vua Quang Trung để chiêu mộ hiền tài."],
    ["“Chiếu cầu hiền” được ban hành nhân danh vị vua nào?", "Vua Quang Trung (Nguyễn Huệ)", "Vua Lê Chiêu Thống", "Vua Gia Long", "Sau khi lên ngôi, Quang Trung mời các sĩ phu Bắc Hà ra giúp nước xây dựng triều đại mới."],
    ["Mục đích chính của “Chiếu cầu hiền” là gì?", "Mời hiền tài ra giúp nước, xây dựng triều Tây Sơn", "Tuyên bố chiến thắng quân Thanh xâm lược", "Phong tước cho các tướng lĩnh có công", "Bài chiếu thể hiện tầm nhìn trọng dụng nhân tài và lòng cầu thị hiếm có của Quang Trung."],
    ["“Chiếu” là thể loại văn bản như thế nào?", "Văn bản vua ban bố mệnh lệnh, chủ trương cho thần dân", "Bài thơ trữ tình của nhà vua", "Truyện kể về đời sống cung đình", "Chiếu thuộc văn hành chính trung đại, ngôn ngữ trang trọng, lập luận chặt chẽ, thuyết phục."],
    ["Thái độ của vua Quang Trung trong “Chiếu cầu hiền” thế nào?", "Cầu thị, khiêm tốn, trân trọng người hiền tài", "Kiêu ngạo, ra lệnh cưỡng ép kẻ sĩ", "Thờ ơ với việc dùng người tài", "Bài chiếu vừa phê phán thái độ ẩn dật né tránh, vừa mở rộng cửa đón hiền tài về triều."],
    ["Ngô Thì Nhậm là danh sĩ thời đại nào?", "Cuối Lê – đầu Tây Sơn, thế kỉ XVIII", "Thời Trần, thế kỉ XIV", "Thời Nguyễn, thế kỉ XX", "Ngô Thì Nhậm là mưu sĩ trụ cột của Quang Trung, từng giữ chức Thượng thư bộ Binh."],
    ["“Tôi có một ước mơ” là bài diễn thuyết của ai?", "Mác-tin Lu-thơ King (Martin Luther King)", "Áp-ra-ham Lin-côn", "Nen-xơn Man-đê-la", "King (1929–1968) là mục sư, nhà lãnh đạo phong trào đòi quyền bình đẳng cho người da đen ở Mĩ."],
    ["Bài diễn thuyết “Tôi có một ước mơ” đọc vào thời gian nào?", "Ngày 28 tháng 8 năm 1963, tại thủ đô Oa-sinh-tơn", "Ngày 4 tháng 7 năm 1776, tại Phi-la-đen-phi-a", "Ngày 1 tháng 1 năm 2000, tại Niu Oóc", "King đọc diễn văn trước Đài tưởng niệm Lin-côn, trước hàng trăm nghìn người tuần hành vì tự do."],
    ["Ước mơ trung tâm trong diễn văn của King là gì?", "Mọi người bình đẳng, không còn phân biệt chủng tộc", "Người Mĩ da đen được giàu có nhất thế giới", "Nước Mĩ trở thành đế quốc lớn nhất", "King mơ con cháu của nô lệ và chủ nô cùng ngồi chung bàn tiệc của tình anh em."],
    ["Điệp ngữ nổi tiếng nhất trong diễn văn của King là gì?", "“Tôi có một ước mơ” (I have a dream)", "“Tự do hay là chết”", "“Không có gì quý hơn độc lập tự do”", "Điệp câu này được lặp lại như nhịp điệu truyền cảm, kết tinh khát vọng công lí và bình đẳng."],
    ["King chủ trương đấu tranh bằng phương pháp nào?", "Bất bạo động, bằng tình thương và lí lẽ", "Bạo lực vũ trang để giành quyền", "Im lặng, không hành động gì cả", "King chịu ảnh hưởng tư tưởng bất bạo động của Gan-đi và đoạt giải Nobel Hoà bình năm 1964."],
    ["“Một thời đại trong thi ca” là tiểu luận của ai?", "Hoài Thanh", "Xuân Diệu", "Thế Lữ", "Hoài Thanh (1909–1982) là nhà phê bình văn học kiệt xuất, chủ biên “Thi nhân Việt Nam”."],
    ["“Một thời đại trong thi ca” trích từ công trình nào?", "“Thi nhân Việt Nam” (1942)", "“Việt Nam văn học sử yếu”", "“Lửa thiêng” (1940)", "Bài tiểu luận mở đầu tập “Thi nhân Việt Nam”, tổng kết và khẳng định giá trị của phong trào Thơ mới."],
    ["Theo Hoài Thanh, tinh thần của Thơ mới là gì?", "Chữ “tôi” cá nhân thay cho cái “ta” chung xưa", "Quay lại hoàn toàn với thơ Đường luật", "Bỏ hết cảm xúc, chỉ viết lí trí", "Cái “tôi” Thơ mới bơ vơ, buồn nhưng khao khát yêu, khao khát sống và hoà nhập với đời."],
    ["Hoài Thanh đánh giá thế nào về Thơ mới?", "Thơ mới thắng lợi về tinh thần, là một thời đại huy hoàng", "Thơ mới hoàn toàn thất bại, không giá trị", "Thơ mới chỉ là trò chơi chữ nghĩa", "Câu kết nổi tiếng: “Đời chúng ta nằm trong vòng chữ tôi…” tóm lược bi kịch và khát vọng Thơ mới."],
    ["Văn bản nghị luận có cấu trúc cơ bản nào?", "Luận đề – luận điểm – luận cứ – lập luận", "Nhân vật – cốt truyện – cao trào", "Khổ thơ – hình ảnh – nhịp điệu", "Bài 3 của SGK rèn cách nhận diện và xây dựng cấu trúc chặt chẽ của văn bản nghị luận."],
    ["Luận điểm trong văn bản nghị luận là gì?", "Ý kiến bộ phận triển khai và chứng minh luận đề", "Nhan đề của bài văn nghị luận", "Câu chuyện minh hoạ vui trong bài", "Mỗi luận điểm cần luận cứ (lí lẽ, dẫn chứng) xác thực, tiêu biểu để thuyết phục người đọc."],
    ["Luận cứ gồm những yếu tố nào?", "Lí lẽ và dẫn chứng dùng để chứng minh luận điểm", "Vần điệu và hình ảnh thơ", "Lời thoại của các nhân vật", "Lí lẽ phải đúng, dẫn chứng phải thật và tiêu biểu thì lập luận mới vững chắc."],
    ["Lập luận trong văn nghị luận là gì?", "Cách tổ chức luận điểm, luận cứ để thuyết phục", "Việc kể lại một câu chuyện dài", "Cách gieo vần trong bài thơ", "Lập luận có thể theo lối diễn dịch, quy nạp, so sánh, nhân quả… tuỳ mục đích bài viết."],
    ["Vì sao “Chiếu cầu hiền” có sức thuyết phục lớn?", "Lập luận chặt, giọng cầu thị, viện dẫn đạo lí sâu xa", "Vì bài chiếu rất ngắn, chỉ vài câu", "Vì bài chiếu do nhiều người cùng viết", "Tác giả kết hợp phê phán nhẹ nhàng, phân tích thiệt hơn và hứa hẹn trọng dụng hiền tài."],
    ["Diễn văn của King thuyết phục người nghe bằng gì?", "Hình ảnh, điệp ngữ, lí tưởng bình đẳng lay động lòng người", "Những con số thống kê khô khan", "Lời đe doạ dùng vũ lực", "Văn chính luận của King giàu chất thơ và chất Kinh Thánh, vang như một bài giảng truyền cảm."],
    ["Tiểu luận của Hoài Thanh có phong cách thế nào?", "Tài hoa, tinh tế, giàu hình ảnh và cảm xúc phê bình", "Khô khan, toàn thuật ngữ khó hiểu", "Chỉ liệt kê tên tác giả, tác phẩm", "Hoài Thanh nổi tiếng với lối phê bình “lấy hồn tôi để hiểu hồn thơ” của các thi nhân."],
    ["Điểm chung của ba văn bản Bài 3 là gì?", "Đều là văn nghị luận có lập luận chặt, sức thuyết phục cao", "Đều là truyện ngắn hiện thực phê phán", "Đều là thơ trữ tình bốn chữ", "Ba văn bản thuộc ba thời đại, ba lĩnh vực nhưng cùng mẫu mực về nghệ thuật nghị luận."],
    ["Khi viết văn nghị luận, dẫn chứng cần đáp ứng yêu cầu gì?", "Thật, tiêu biểu, phù hợp và được phân tích rõ", "Càng nhiều càng tốt, không cần phân tích", "Chỉ chọn dẫn chứng từ mạng xã hội", "Dẫn chứng không phân tích sẽ trở thành “chất đống” tư liệu, làm yếu sức thuyết phục của bài."]
  ];
  var nv11b3P = [["Chiếu cầu hiền", "Ngô Thì Nhậm"], ["Tôi có một ước mơ", "Mác-tin Lu-thơ King"], ["Một thời đại trong thi ca", "Hoài Thanh"], ["Thi nhân Việt Nam", "Công trình của Hoài Thanh"], ["Quang Trung", "Vua cho soạn Chiếu cầu hiền"], ["Luận điểm", "Ý kiến cần chứng minh"], ["Luận cứ", "Lí lẽ và dẫn chứng"]];
  var nv11b4F = [
    ["“Lời tiễn dặn” trích từ tác phẩm dân gian nào?", "Truyện thơ “Tiễn dặn người yêu” của người Thái", "Truyện thơ “Lục Vân Tiên” của Nguyễn Đình Chiểu", "Sử thi “Đăm Săn” của người Ê-đê", "“Tiễn dặn người yêu” (Xống chụ xôn xao) là truyện thơ trữ tình nổi tiếng của dân tộc Thái ở Tây Bắc."],
    ["“Lời tiễn dặn” thể hiện tình cảm chủ đạo nào?", "Tình yêu đôi lứa tha thiết, bị chia lìa đau xót", "Tình đồng chí trên chiến trường", "Tình yêu thiên nhiên núi rừng", "Chàng trai tiễn người yêu về nhà chồng, dặn dò từng điều nhỏ nhặt vì không được sống bên nhau."],
    ["Vì sao đôi trẻ trong “Lời tiễn dặn” phải chia lìa?", "Lễ giáo, cha mẹ ép duyên người con gái lấy chồng khác", "Chàng trai phải đi lính xa nhiều năm", "Hai gia đình có mối thù truyền kiếp", "Bi kịch tình yêu bị lễ giáo phong kiến và hủ tục mua bán hôn nhân chà đạp là chủ đề của truyện thơ."],
    ["Lời dặn của chàng trai trong “Lời tiễn dặn” có gì đặc biệt?", "Dặn tỉ mỉ từng việc nhỏ, chan chứa yêu thương, lo lắng", "Dặn người yêu hãy quên mình đi ngay", "Chỉ dặn đúng một câu ngắn ngủi", "Càng dặn nhiều càng lộ rõ tình yêu sâu nặng và nỗi đau không nỡ rời xa của chàng trai."],
    ["Truyện thơ dân gian thường có đặc điểm gì?", "Truyện bằng thơ, truyền miệng, giàu tính trữ tình, tự sự", "Truyện văn xuôi do một nhà văn viết", "Kịch bản sân khấu có nhiều màn", "Truyện thơ kết hợp kể chuyện bằng thơ với cảm xúc trữ tình của nhân vật."],
    ["“Dương phụ hành” là bài thơ của ai?", "Cao Bá Quát", "Nguyễn Công Trứ", "Hồ Xuân Hương", "Cao Bá Quát (1809–1855) là nhà thơ tài hoa, khí phách, được gọi là “Thần Siêu, Thánh Quát”."],
    ["“Dương phụ hành” nghĩa là gì?", "Bài hành về người phụ nữ phương Tây", "Bài thơ về người vợ đi biển", "Bài hành ca ngợi vị tướng ra trận", "Trên đường đi sứ, Cao Bá Quát quan sát người phụ nữ phương Tây và suy ngẫm về văn minh, con người."],
    ["Thể “hành” trong thơ ca trung đại là gì?", "Thể thơ ca hành, phóng khoáng, thường viết khi đi đường", "Thể thơ bốn chữ dành cho trẻ em", "Thể văn tế viết cho người đã mất", "Các bài hành nổi tiếng thường gắn với hành trình đi sứ hoặc chu du của nhà thơ."],
    ["Cao Bá Quát nổi tiếng với khí phách nào?", "Tài hoa, ngang tàng, khát vọng đổi thay thời thế", "An phận, cam chịu mọi sắp đặt", "Chỉ thích ẩn cư nơi núi rừng", "Ông từng tham gia khởi nghĩa chống triều Nguyễn và nổi tiếng với câu thơ đề cao chí làm trai."],
    ["“Thuyền và biển” là bài thơ tình nổi tiếng của ai?", "Xuân Quỳnh", "Hàn Mặc Tử", "Tế Hanh", "Xuân Quỳnh (1942–1988) là nhà thơ nữ hàng đầu của thơ Việt Nam hiện đại, thơ tình sâu sắc, đằm thắm."],
    ["Trong “Thuyền và biển”, hình tượng thuyền và biển tượng trưng cho ai?", "Thuyền là anh, biển là em trong tình yêu", "Thuyền là cha, biển là con", "Thuyền là vua, biển là thần dân", "Cặp ẩn dụ thuyền – biển thể hiện tình yêu gắn bó, thuỷ chung và những sóng gió của tình yêu."],
    ["Câu thơ nào nổi tiếng trong “Thuyền và biển”?", "“Chỉ có thuyền mới hiểu / Biển mênh mông nhường nào”", "“Sóng bắt đầu từ gió / Gió bắt đầu từ đâu”", "“Thuyền ơi có nhớ bến chăng”", "Hai câu thơ khẳng định sự thấu hiểu, đồng điệu tuyệt đối giữa hai tâm hồn yêu nhau."],
    ["Thơ Xuân Quỳnh có đặc điểm nổi bật nào?", "Giàu nữ tính, chân thành, lo âu và khát khao hạnh phúc", "Hùng tráng, sử thi, ít tình cảm riêng", "Châm biếm, hài hước là chủ đạo", "Xuân Quỳnh viết nhiều về tình yêu, gia đình với giọng thơ tự bạch, thiết tha."],
    ["Lỗi thiếu thành phần câu thường gặp là lỗi nào?", "Câu thiếu chủ ngữ hoặc thiếu vị ngữ", "Câu thừa một dấu chấm phẩy", "Câu dùng một từ Hán Việt", "Ví dụ viết tách một cụm từ thành câu riêng khiến câu cụt, thiếu thành phần chính."],
    ["Câu “Qua bài thơ, đã cho thấy tình yêu quê hương sâu nặng” mắc lỗi gì?", "Thiếu chủ ngữ", "Thiếu vị ngữ", "Thừa dấu câu", "Cụm “qua bài thơ” là trạng ngữ, câu không có chủ ngữ; cần thêm chủ ngữ như “tác giả”."],
    ["Câu “Những học sinh chăm chỉ, luôn đạt kết quả cao” mắc lỗi gì?", "Thiếu vị ngữ", "Thiếu chủ ngữ", "Sai chính tả tên riêng", "Câu mới có chủ ngữ và định ngữ, chưa có vị ngữ; cần thêm “là những tấm gương sáng” chẳng hạn."],
    ["Khi sửa lỗi thành phần câu, bước đầu tiên là gì?", "Xác định câu thiếu chủ ngữ hay vị ngữ rồi bổ sung", "Xoá cả câu và bỏ qua", "Thêm nhiều từ ngữ hoa mĩ vào câu", "Thực hành tiếng Việt Bài 4 rèn nhận diện và sửa các câu thiếu thành phần thường gặp khi viết."],
    ["Tự sự trong truyện thơ dân gian được thể hiện thế nào?", "Kể chuyện bằng thơ, gắn lời kể với cảm xúc nhân vật", "Chỉ liệt kê sự kiện khô khan theo năm tháng", "Không có nhân vật và cốt truyện", "Yếu tố tự sự giúp truyện thơ có cốt truyện, còn trữ tình làm nên chiều sâu cảm xúc."],
    ["Hình ảnh thiên nhiên Tây Bắc trong “Lời tiễn dặn” có vai trò gì?", "Làm nền, cộng hưởng với nỗi buồn chia lìa của đôi trẻ", "Chỉ để giới thiệu đặc sản vùng miền", "Không liên quan tới tâm trạng nhân vật", "Núi rừng, đường xa, sương khói đều thấm buồn tiễn biệt trong lời dặn của chàng trai."],
    ["Điểm gặp nhau của ba văn bản Bài 4 là gì?", "Đều có yếu tố tự sự gắn với trữ tình sâu sắc", "Đều là văn bản nghị luận xã hội", "Đều là kịch bản sân khấu dân gian", "Từ truyện thơ dân gian tới thơ trung đại và thơ hiện đại, tự sự và trữ tình luôn đan xen."],
    ["“Dương phụ hành” thể hiện thái độ nào của Cao Bá Quát?", "Trân trọng vẻ đẹp tự do, phóng khoáng của con người", "Khinh miệt mọi nền văn hoá khác", "Thờ ơ trước những gì mắt thấy", "Qua hình ảnh người phụ nữ phương Tây, nhà thơ bộc lộ tư tưởng tiến bộ, ham hiểu biết thế giới."],
    ["Ẩn dụ trong “Thuyền và biển” được xây dựng thế nào?", "Dựa trên sự tương đồng: thuyền trôi như đời người yêu", "Dựa trên quan hệ bộ phận – toàn thể", "Chỉ là phép so sánh có từ “như”", "Thuyền – biển là cặp hình tượng ẩn dụ sóng đôi xuyên suốt bài thơ của Xuân Quỳnh."],
    ["Vì sao cần tránh câu thiếu thành phần khi viết văn?", "Câu thiếu thành phần làm ý tối nghĩa, sai ngữ pháp", "Câu thiếu thành phần luôn hay hơn câu đủ", "Chỉ cần đúng chính tả là đủ hay", "Viết đúng câu là yêu cầu tối thiểu để bài văn rõ ràng, mạch lạc và thuyết phục."],
    ["Tình yêu trong “Lời tiễn dặn” kết thúc ra sao?", "Đôi trẻ hẹn kiếp sau, quyết không quên nhau", "Cô gái bỏ trốn theo chàng trai ngay", "Hai người tổ chức đám cưới vui vẻ", "Lời thề hẹn kiếp sau là phản kháng lặng lẽ nhưng mãnh liệt trước lễ giáo nghiệt ngã."]
  ];
  var nv11b4P = [["Lời tiễn dặn", "Truyện thơ của người Thái"], ["Dương phụ hành", "Cao Bá Quát"], ["Thuyền và biển", "Xuân Quỳnh"], ["Tiễn dặn người yêu", "Truyện thơ dân gian Thái"], ["Thần Siêu, Thánh Quát", "Danh gọi dành cho Cao Bá Quát"], ["Thuyền", "Ẩn dụ chỉ người con trai"], ["Biển", "Ẩn dụ chỉ người con gái"]];
  var nv11b5F = [
    ["“Hamlet” (Hăm-lét) là vở bi kịch nổi tiếng của ai?", "Uy-li-am Sếch-xpia (Shakespeare)", "Mô-li-e (Pháp)", "Sô-phốc-lơ (Hy Lạp)", "Shakespeare (1564–1616) là nhà viết kịch vĩ đại nhất của nước Anh và của nhân loại."],
    ["Hamlet là nhân vật thuộc quốc gia nào trong vở kịch?", "Hoàng tử nước Đan Mạch", "Vua nước Anh thời trung cổ", "Hoàng tử nước Tây Ban Nha", "Hamlet đau khổ khi cha bị giết, mẹ tái hôn với chú — kẻ đã sát hại cha mình."],
    ["Câu nói nổi tiếng nhất của Hamlet là gì?", "“Tồn tại hay không tồn tại” (To be, or not to be)", "“Tôi có một ước mơ lớn lao”", "“Học, học nữa, học mãi”", "Câu độc thoại này thể hiện khủng hoảng, suy tư của Hamlet trước sống – chết, hành động – do dự."],
    ["Ai đã giết cha của Hamlet?", "Clô-đi-ớt, chú của Hamlet, em của vua cha", "Pô-lô-ni-ớt, quan thị vệ già", "Hô-ra-ti-ô, bạn thân của Hamlet", "Hồn ma vua cha hiện về báo cho Hamlet biết sự thật và yêu cầu chàng trả thù cho cha."],
    ["Vì sao Hamlet chần chừ, chưa trả thù ngay?", "Chàng suy tư, muốn kiểm chứng tội ác của chú trước", "Chàng hoàn toàn quên mất lời dặn của cha", "Chàng sợ bóng tối và hồn ma", "Sự do dự của Hamlet là trung tâm bi kịch: con người trí tuệ hành động trong thế giới xấu xa."],
    ["Bi kịch là thể loại kịch như thế nào?", "Kịch về xung đột gay gắt, kết thúc đau thương, mất mát", "Kịch hài hước, kết thúc đoàn viên vui vẻ", "Kịch chỉ dành cho thiếu nhi", "Bi kịch gây xúc động mạnh, thanh lọc tâm hồn người xem qua số phận nhân vật cao cả."],
    ["Xung đột trong bi kịch thường có tính chất gì?", "Gay gắt, không thể hoà giải giữa các thế lực, khát vọng", "Nhẹ nhàng, giải quyết ngay ở màn đầu", "Chỉ là hiểu lầm nhỏ giữa bạn bè", "Xung đột bi kịch đẩy nhân vật tới lựa chọn nghiệt ngã và kết cục bi thương."],
    ["“Vĩnh biệt Cửu Trùng Đài” trích từ vở kịch nào?", "Vở kịch “Vũ Như Tô” của Nguyễn Huy Tưởng", "Vở kịch “Hồn Trương Ba, da hàng thịt”", "Vở chèo “Quan Âm Thị Kính”", "Đoạn trích là hồi cuối của vở kịch lịch sử “Vũ Như Tô” viết về một bi kịch nghệ sĩ."],
    ["Tác giả của vở kịch “Vũ Như Tô” là ai?", "Nguyễn Huy Tưởng", "Lưu Quang Vũ", "Nguyễn Huy Thiệp", "Nguyễn Huy Tưởng (1912–1960) là nhà văn, nhà viết kịch lớn của văn học Việt Nam hiện đại."],
    ["Vũ Như Tô là nhân vật có tài năng gì?", "Kiến trúc sư tài ba, xây Cửu Trùng Đài cho vua Lê", "Tướng quân cầm quân đánh giặc giỏi", "Nhà thơ làm thơ Đường luật hay nhất", "Vũ Như Tô là nghệ sĩ tài hoa bị cuốn vào mộng xây đài cao cho triều đình hôn quân."],
    ["Cửu Trùng Đài trong vở kịch tượng trưng cho điều gì?", "Khát vọng nghệ thuật lớn lao nhưng xa rời nhân dân", "Một công trình thuỷ lợi giúp dân", "Ngôi chùa cổ linh thiêng của làng", "Đài cao xây bằng xương máu, tiền của của dân nên bị dân nổi loạn thiêu huỷ, Vũ Như Tô bị giết."],
    ["Bi kịch của Vũ Như Tô nằm ở đâu?", "Tài hoa, hoài bão lớn mà phải phục vụ hôn quân, xa dân", "Không có tài năng gì đặc biệt", "Bị mất trí nhớ khi về già", "Mâu thuẫn giữa nghệ thuật cao cả và đời sống nhân dân là chủ đề lớn của vở kịch."],
    ["Nhân vật Đan Thiềm trong “Vũ Như Tô” là ai?", "Cung nữ thấu hiểu, khuyến khích hoài bão của Vũ Như Tô", "Hoàng hậu ghen ghét tài năng của Vũ Như Tô", "Người vợ quê của Vũ Như Tô", "Đan Thiềm và Vũ Như Tô là cặp nhân vật cùng say mê cái đẹp, cùng chết với Cửu Trùng Đài."],
    ["“Prô-mê-tê bị xiềng” là bi kịch của tác giả nào?", "Ét-sin (Aeschylus), Hy Lạp cổ đại", "Sếch-xpia, nước Anh", "Ibsen, Na Uy", "Ét-sin được coi là cha đẻ của bi kịch Hy Lạp cổ đại; vở kịch ca ngợi thần Prô-mê-tê."],
    ["Prô-mê-tê trong thần thoại Hy Lạp có công gì với loài người?", "Đánh cắp lửa của thần linh trao cho loài người", "Dạy loài người cách đóng tàu vượt biển", "Ban cho loài người chữ viết đầu tiên", "Vì yêu thương con người, Prô-mê-tê bị thần Dớt (Zeus) xiềng vào núi, cho chim ăn gan mỗi ngày."],
    ["Hình phạt của Prô-mê-tê thể hiện phẩm chất gì của thần?", "Kiên cường, bất khuất, hi sinh vì loài người", "Hèn nhát, sẵn sàng xin tha thứ", "Tham lam, ích kỉ chỉ nghĩ cho mình", "Prô-mê-tê là biểu tượng bất tử của tinh thần phản kháng và khát vọng tự do của con người."],
    ["Nhân vật chính trong bi kịch thường là người thế nào?", "Có lí tưởng, tài năng, khát vọng cao cả nhưng gặp nạn", "Hoàn toàn xấu xa, không có điểm tốt nào", "Không có suy nghĩ, cảm xúc gì", "Chính sự cao cả của nhân vật làm cho kết cục bi thương càng lay động người xem."],
    ["Độc thoại trong bi kịch có tác dụng gì?", "Bộc lộ nội tâm, xung đột trong lòng nhân vật", "Thông báo giờ nghỉ giữa các màn kịch", "Giới thiệu danh sách diễn viên", "Độc thoại “Tồn tại hay không tồn tại” của Hamlet là đoạn độc thoại nội tâm nổi tiếng nhất."],
    ["Shakespeare sống và sáng tác ở thế kỉ nào?", "Thế kỉ XVI – đầu XVII, thời Phục hưng ở Anh", "Thế kỉ XX, thời hiện đại", "Thế kỉ X, thời trung cổ sơ kì", "Ông viết khoảng 37 vở kịch, trong đó có các bi kịch lớn: Hamlet, Ô-ten-lô, Vua Lia, Mắc-bét."],
    ["Đoạn trích “Vĩnh biệt Cửu Trùng Đài” thuộc hồi nào của vở kịch?", "Hồi cuối, khi đài bị thiêu và Vũ Như Tô bị xử tử", "Hồi mở đầu, khi Vũ Như Tô mới vào cung", "Phần phụ lục ngoài vở kịch chính", "Lời “vĩnh biệt” của Đan Thiềm và Vũ Như Tô với đài cao khép lại bi kịch nghệ sĩ đầy ám ảnh."],
    ["Chủ đề chung của chùm văn bản Bài 5 là gì?", "Nhân vật và xung đột trong bi kịch qua các thời đại", "Tình yêu đôi lứa trong thơ trữ tình", "Cách viết văn bản thông tin khoa học", "Ba vở bi kịch Hy Lạp, Anh và Việt Nam cho thấy sức sống vượt thời gian của thể loại bi kịch."],
    ["Khi đọc một vở bi kịch, cần chú ý nhất yếu tố nào?", "Xung đột kịch và hành động, lời thoại của nhân vật", "Số lượng trang của kịch bản", "Tên nhà hát biểu diễn vở kịch", "SGK Bài 5 hướng dẫn đọc bi kịch qua phân tích xung đột, nhân vật và ngôn ngữ kịch."],
    ["Ngôn ngữ của bi kịch thường có đặc điểm gì?", "Trang trọng, giàu hình ảnh, triết lí và cảm xúc mạnh", "Toàn từ ngữ đời thường suồng sã", "Chỉ gồm các câu hỏi ngắn", "Ngôn ngữ bi kịch nâng đời sống lên tầm khái quát về số phận và lẽ sống của con người."],
    ["Hồn ma vua cha trong “Hamlet” có vai trò gì?", "Tiết lộ tội ác, thúc đẩy hành động trả thù của Hamlet", "Làm vua thay cho Clô-đi-ớt", "Cưới mẹ của Hamlet làm vợ", "Yếu tố hồn ma tạo không khí bi kịch và là ngòi nổ của toàn bộ xung đột vở kịch."]
  ];
  var nv11b5P = [["Hamlet", "Bi kịch của Sếch-xpia"], ["Vĩnh biệt Cửu Trùng Đài", "Trích kịch Vũ Như Tô"], ["Vũ Như Tô", "Nguyễn Huy Tưởng"], ["Prô-mê-tê bị xiềng", "Bi kịch của Ét-sin"], ["Clô-đi-ớt", "Chú của Hamlet, kẻ giết vua"], ["Đan Thiềm", "Cung nữ tri âm của Vũ Như Tô"], ["Tồn tại hay không tồn tại", "Độc thoại nổi tiếng của Hamlet"]];
  var nv11b6F = [
    ["Nguyễn Du sống ở thời đại nào?", "Cuối thế kỉ XVIII – đầu XIX (1766–1820)", "Thế kỉ XX, thời kháng chiến chống Mĩ", "Thế kỉ XV, thời Lê Thánh Tông", "Nguyễn Du là đại thi hào dân tộc, danh nhân văn hoá thế giới được UNESCO vinh danh."],
    ["Nguyễn Du quê ở đâu?", "Tiên Điền, Nghi Xuân, Hà Tĩnh", "Thăng Long, Hà Nội ngày nay", "Làng Đường Lâm, Sơn Tây", "Ông xuất thân trong gia đình đại quý tộc, từng làm quan dưới triều Lê, Tây Sơn và Nguyễn."],
    ["Tác phẩm nổi tiếng nhất của Nguyễn Du là gì?", "“Truyện Kiều” (Đoạn trường tân thanh)", "“Chinh phụ ngâm khúc”", "“Quốc âm thi tập”", "Truyện Kiều gồm 3.254 câu thơ lục bát, là kiệt tác của văn học Việt Nam mọi thời đại."],
    ["Nhan đề Bài 6 “Những điều trông thấy mà đau đớn lòng” lấy từ đâu?", "Câu thơ trong “Truyện Kiều” của Nguyễn Du", "Câu thơ trong “Truyện Lục Vân Tiên”", "Một câu ca dao về thân phận phụ nữ", "“Những điều trông thấy mà đau đớn lòng” tóm lược tấm lòng nhân đạo của Nguyễn Du trước đời khổ."],
    ["“Trao duyên” là đoạn trích thuộc phần nào của Truyện Kiều?", "Đoạn Kiều nhờ Thuý Vân thay mình trả nghĩa cho Kim Trọng", "Đoạn Kiều gặp Từ Hải lần đầu", "Đoạn Kiều báo ân báo oán cuối truyện", "Đêm trao duyên là một trong những đoạn thơ cảm động và nghệ thuật bậc nhất của Truyện Kiều."],
    ["Thuý Kiều trao duyên cho Thuý Vân vì lí do gì?", "Kiều phải bán mình chuộc cha, không giữ được lời thề", "Kiều không còn yêu Kim Trọng nữa", "Thuý Vân ép Kiều phải nhường duyên", "Trao kỉ vật và lời thề cho em, Kiều đau đớn như trao đi cả trái tim và hạnh phúc của mình."],
    ["Kỉ vật Kiều trao cho Thuý Vân gồm những gì?", "Chiếc vành và tờ mây (phiến tóc thề)", "Một thanh kiếm và một con ngựa", "Quyển sách và cây đàn cổ", "Những kỉ vật nhỏ bé chứa đựng mối tình đầu trong trắng, thiêng liêng của Kiều với Kim Trọng."],
    ["Tâm trạng của Kiều trong đoạn “Trao duyên” thế nào?", "Đau đớn, giằng xé, thương em và tiếc nuối tình đầu", "Vui vẻ, nhẹ nhõm vì thoát nợ tình", "Thờ ơ, không chút cảm xúc nào", "Đoạn thơ là tiếng khóc cho thân phận và tình yêu dang dở của người con gái tài sắc."],
    ["“Độc Tiểu Thanh kí” nghĩa là gì?", "“Đọc truyện Tiểu Thanh mà ghi lại cảm xúc”", "“Bài kí về một mình Tiểu Thanh”", "“Truyện về cô gái tên Thanh nhỏ”", "Nguyễn Du đọc tập thơ của Tiểu Thanh — nàng ca kĩ tài hoa bạc mệnh đời Minh (Trung Quốc)."],
    ["Tiểu Thanh trong thơ Nguyễn Du là người thế nào?", "Ca kĩ tài hoa, bạc mệnh, chết trẻ ở tuổi mười tám", "Nữ tướng cầm quân ra trận thời Minh", "Hoàng hậu nổi tiếng quyền lực đời Minh", "Nguyễn Du thương Tiểu Thanh như thương chính mình: người tài hoa cùng chịu số phận bất hạnh."],
    ["Câu thơ nổi tiếng trong “Độc Tiểu Thanh kí” là câu nào?", "“Thiên hạ hà nhân khấp Tố Như” — ai khóc cho Tố Như?", "“Việc nhân nghĩa cốt ở yên dân”", "“Người buồn cảnh có vui đâu bao giờ”", "Hai câu kết: không biết hơn ba trăm năm sau, thiên hạ có ai khóc cho Tố Như (Nguyễn Du) không."],
    ["Tố Như là tên hiệu (tên tự) của nhà thơ nào?", "Nguyễn Du", "Nguyễn Trãi", "Hồ Xuân Hương", "Nguyễn Du tự là Tố Như, hiệu Thanh Hiên; ông lấy tên mình đặt cho nỗi niềm trong bài thơ."],
    ["“Chí khí anh hùng” là đoạn trích về nhân vật nào?", "Từ Hải, người anh hùng lí tưởng trong Truyện Kiều", "Kim Trọng, chàng thư sinh si tình", "Hồ Tôn Hiến, viên quan gian ác", "Đoạn trích kể cảnh Kiều tiễn Từ Hải ra đi lập nghiệp lớn, chí tang bồng hồ thỉ."],
    ["Từ Hải được Nguyễn Du xây dựng theo mẫu người nào?", "Người anh hùng vũ trụ, chí lớn bốn phương trời", "Người thư sinh yếu đuối, chỉ giỏi thơ phú", "Tên cướp biển hung ác, tàn bạo", "Từ Hải “vai năm tấc rộng, thân mười thước cao”, là khát vọng tự do và công lí của Nguyễn Du."],
    ["Câu thơ “Chí làm trai dặm nghìn da ngựa” gợi chí khí gì?", "Chí tang bồng, quyết lập công danh nơi sa trường", "Ước muốn đi du lịch khắp nơi", "Sở thích cưỡi ngựa của Từ Hải", "Hình ảnh “da ngựa bọc thây” gợi chí nam nhi thời xưa coi nhẹ cái chết vì nghiệp lớn."],
    ["Giá trị nhân đạo trong thơ Nguyễn Du thể hiện thế nào?", "Thương người khổ, nhất là người tài hoa bạc mệnh", "Ca ngợi vua chúa và triều đình phong kiến", "Châm biếm mọi tầng lớp trong xã hội", "“Chữ tâm kia mới bằng ba chữ tài” — tấm lòng nhân đạo là cốt lõi thơ Nguyễn Du."],
    ["Tu từ lặp cấu trúc là biện pháp gì?", "Lặp lại một cấu trúc câu để nhấn mạnh, tạo nhịp điệu", "Lặp lại một âm đầu ở các từ gần nhau", "Dùng từ đồng âm để chơi chữ", "Ví dụ các câu song hành cùng khuôn “Bao giờ… bấy giờ…” tạo nhịp và nhấn mạnh cảm xúc."],
    ["Tu từ đối là biện pháp gì?", "Đặt hai vế cân xứng, đối nhau về ý và thanh điệu", "Nói ngược hoàn toàn sự thật", "Phóng đại sự vật quá mức thật", "Đối là đặc trưng của thơ luật và câu đối; trong Truyện Kiều, Nguyễn Du dùng đối rất tài tình."],
    ["Câu thơ Kiều “Phận sao phận bạc như vôi” thuộc đoạn trích nào?", "Đoạn “Trao duyên”, Kiều than cho thân phận mình", "Đoạn Kiều ở lầu Ngưng Bích", "Đoạn Kiều gặp Đạm Tiên đầu truyện", "Lời than thân trách phận mở ra bi kịch của người con gái tài sắc trong xã hội phong kiến."],
    ["Nguyễn Du được UNESCO vinh danh vào năm nào?", "Năm 2013, là danh nhân văn hoá thế giới", "Năm 1980, cùng Nguyễn Trãi", "Chưa từng được vinh danh quốc tế", "Lễ kỉ niệm 250 năm ngày sinh Nguyễn Du (2015) được tổ chức theo nghị quyết của UNESCO."],
    ["Thể thơ của “Truyện Kiều” là thể thơ nào?", "Lục bát, thể thơ dân tộc của Việt Nam", "Thất ngôn bát cú Đường luật", "Song thất lục bát", "Nguyễn Du nâng lục bát dân gian lên đỉnh cao nghệ thuật bác học trong Truyện Kiều."],
    ["“Độc Tiểu Thanh kí” được viết bằng chữ gì?", "Chữ Hán, thuộc thơ chữ Hán của Nguyễn Du", "Chữ Nôm, như Truyện Kiều", "Chữ quốc ngữ thời bấy giờ", "Ngoài Truyện Kiều chữ Nôm, Nguyễn Du còn có tập thơ chữ Hán “Thanh Hiên thi tập”."],
    ["Đoạn “Chí khí anh hùng” cho thấy Kiều có phẩm chất gì?", "Hiểu và trân trọng chí lớn của Từ Hải, giàu tình nghĩa", "Ích kỉ, chỉ muốn giữ Từ Hải bên mình", "Hoàn toàn không hiểu việc của chồng", "Kiều tiễn chồng bằng lời lẽ thấu hiểu chí anh hùng, dù lòng đầy lo lắng cho ngày trở về."],
    ["Tư tưởng “tài mệnh tương đố” trong thơ Nguyễn Du là gì?", "Tài hoa và số mệnh thường kị nhau, gây bất hạnh", "Người có tài luôn gặp nhiều may mắn", "Tài năng không liên quan gì tới số phận", "Quan niệm “tài mệnh tương đố” (tài và mệnh ghét nhau) bao trùm số phận Kiều và Tiểu Thanh."]
  ];
  var nv11b6P = [["Trao duyên", "Đoạn trích Truyện Kiều"], ["Độc Tiểu Thanh kí", "Thơ chữ Hán của Nguyễn Du"], ["Chí khí anh hùng", "Đoạn về Từ Hải trong Truyện Kiều"], ["Truyện Kiều", "Kiệt tác của Nguyễn Du"], ["Tố Như", "Tên tự của Nguyễn Du"], ["Thuý Vân", "Em gái được Kiều trao duyên"], ["Từ Hải", "Người anh hùng lí tưởng của Kiều"]];
  var nv11b7F = [
    ["“Ai đã đặt tên cho dòng sông?” là bút kí của ai?", "Hoàng Phủ Ngọc Tường", "Nguyễn Tuân", "Trần Tuấn", "Hoàng Phủ Ngọc Tường (1937–2023) là nhà văn xứ Huế, bút kí của ông giàu chất thơ và triết lí."],
    ["Văn bản “Ai đã đặt tên cho dòng sông?” viết về dòng sông nào?", "Sông Hương của xứ Huế", "Sông Hồng của đồng bằng Bắc Bộ", "Sông Cửu Long của miền Tây", "Tác giả lần theo sông Hương từ thượng nguồn về biển để lí giải vẻ đẹp và tên gọi của nó."],
    ["“Ai đã đặt tên cho dòng sông?” sáng tác vào thời gian nào?", "Năm 1981, giữa lòng thành phố Huế", "Năm 1945, tại chiến khu Việt Bắc", "Năm 2000, tại Thành phố Hồ Chí Minh", "Bút kí được viết ngày 4 tháng 1 năm 1981 và in trong tập cùng tên xuất bản năm 1984."],
    ["Ở thượng nguồn, sông Hương được ví như hình tượng nào?", "“Bản trường ca của rừng già”, dữ dội, hoang dại", "Một thiếu nữ dịu dàng, e ấp", "Một dải lụa mềm giữa thành phố", "Sông Hương đổi tính cách theo hành trình: hoang dại ở nguồn, dịu dàng khi về đồng bằng và Huế."],
    ["Khi chảy qua thành phố Huế, sông Hương có vẻ đẹp nào?", "Dịu dàng, trầm mặc như tâm hồn người Huế", "Hung dữ, cuốn phăng mọi vật", "Khô cạn, đầy đá sỏi trơ trụi", "Sông Hương qua Huế “chậm chạp”, uốn mình như đi tìm người tình trăm năm của nó."],
    ["Theo bút kí, ai đã đặt tên cho dòng sông Hương?", "Không một ai cụ thể; tên gọi gắn với làng mạc, lịch sử", "Một vị vua nhà Nguyễn đặt tên", "Chính tác giả đặt tên khi viết", "Nhan đề là câu hỏi tu từ: dòng sông mang tên của cả một vùng văn hoá, lịch sử xứ Huế."],
    ["Chất thơ trong bút kí của Hoàng Phủ Ngọc Tường thể hiện thế nào?", "Ngôn ngữ giàu hình ảnh, liên tưởng bất ngờ, nhạc điệu", "Toàn số liệu thống kê về dòng sông", "Chỉ kể sự kiện khô khan theo thứ tự", "Bút kí của ông được coi là “thơ văn xuôi”, kết hợp kiến thức sâu rộng và xúc cảm trữ tình."],
    ["Thể loại kí có đặc điểm cơ bản nào?", "Ghi chép sự thật, có hình tượng và cảm xúc của tác giả", "Hư cấu hoàn toàn như tiểu thuyết", "Chỉ gồm lời thoại của nhân vật", "Kí gồm bút kí, tuỳ bút, hồi kí, du kí… vừa ghi chép vừa tưởng tượng, liên tưởng phong phú."],
    ["Bút kí khác tuỳ bút ở điểm nhấn nào?", "Bút kí nặng ghi chép; tuỳ bút nặng cảm xúc, liên tưởng", "Bút kí luôn ngắn hơn tuỳ bút", "Tuỳ bút không được dùng hình ảnh", "Bài 7 của SGK giúp phân biệt các thể kí qua yếu tố ghi chép và tưởng tượng."],
    ["“Cà Mau quê xứ” là văn bản kí của tác giả nào?", "Trần Tuấn", "Hoàng Phủ Ngọc Tường", "Sơn Nam", "Trần Tuấn là nhà báo, nhà văn viết nhiều về đất và người phương Nam, đặc biệt là Cà Mau."],
    ["“Cà Mau quê xứ” ghi chép về vùng đất nào?", "Đất mũi Cà Mau, cực Nam của Tổ quốc", "Đất cảng Hải Phòng ở phía Bắc", "Vùng cao nguyên Đắk Lắk", "Văn bản dẫn người đọc về vùng đất cuối trời Nam với sông nước, rừng đước và con người hào sảng."],
    ["Con người Cà Mau trong văn bản có phẩm chất nổi bật nào?", "Phóng khoáng, hào sảng, gắn bó với sông nước quê xứ", "Khép kín, ngại giao tiếp với người lạ", "Chỉ sống bằng nghề buôn bán xa xỉ", "Đất mở, sông mở làm nên tính cách người Cà Mau mở lòng, trọng nghĩa tình."],
    ["Yếu tố tưởng tượng trong kí có vai trò gì?", "Làm sự thật thêm sống động, giàu ý nghĩa và cảm xúc", "Thay thế hoàn toàn sự thật được ghi chép", "Làm cho văn bản kí mất hết giá trị", "Tưởng tượng trong kí phải dựa trên sự thật, giúp người đọc hình dung và đồng cảm sâu hơn."],
    ["Vì sao kí được coi là thể loại “nửa sự thật, nửa văn chương”?", "Kí ghi việc thật nhưng bằng ngôn ngữ hình tượng, cảm xúc", "Kí toàn là chuyện bịa đặt giải trí", "Kí chỉ chép số liệu như báo cáo", "Cái “tôi” của người viết kí là cầu nối giữa sự kiện thật và cảm xúc nghệ thuật."],
    ["Sông Hương gắn với di sản văn hoá nào của Huế?", "Nhã nhạc, ca Huế và các lăng tẩm triều Nguyễn", "Quan họ và hội Lim của Bắc Ninh", "Cồng chiêng của Tây Nguyên", "Dòng sông chảy qua thành phố di sản, là biểu tượng văn hoá của cố đô Huế."],
    ["Trong bút kí, sông Hương được so sánh với người phụ nữ thế nào?", "Từ cô gái hoang dại tới người mẹ, người tình của Huế", "Một nữ tướng ra trận đánh giặc", "Một bà lão khắc khổ, lặng lẽ", "Chuỗi liên tưởng nhân hoá làm dòng sông có đời sống, tâm hồn như một con người xứ Huế."],
    ["Đoạn sông Hương rời thành phố Huế được tả ra sao?", "Sông lưu luyến, quay lại hôn thành phố trước khi ra biển", "Sông chảy thẳng, khô cạn dần", "Sông đổ vào một hồ nước nhỏ", "Chi tiết sông “ôm ấp” đảo Hến rồi mới xuôi về biển thể hiện tình yêu Huế tha thiết của tác giả."],
    ["Giá trị lớn nhất của “Ai đã đặt tên cho dòng sông?” là gì?", "Ca ngợi, trân trọng vẻ đẹp và văn hoá xứ Huế", "Hướng dẫn du lịch thuần tuý cho du khách", "Phê phán nạn ô nhiễm dòng sông", "Bút kí là lời tình yêu gửi Huế, khơi dậy ý thức giữ gìn di sản văn hoá, thiên nhiên."],
    ["Khi viết văn bản kí, người viết cần kết hợp những gì?", "Quan sát thật, tư liệu chắc và cảm xúc, liên tưởng riêng", "Chỉ cần tưởng tượng càng nhiều càng tốt", "Chỉ chép lại sách báo đã có", "Kĩ năng viết kí được rèn trong Bài 7: đi thực tế, ghi chép, chọn chi tiết tiêu biểu."],
    ["“Người mẹ phù sa” là hình ảnh Hoàng Phủ Ngọc Tường dành cho ai?", "Dòng sông Hương nuôi dưỡng văn hoá xứ Huế", "Một nhân vật trong truyện cổ tích Huế", "Người phụ nữ bán hàng trên sông", "Sông Hương bồi đắp phù sa và “sinh thành” nên cả một nền văn hoá, tâm hồn Huế."],
    ["Giọng điệu chung của bút kí về sông Hương là gì?", "Trữ tình, say đắm, tự hào và giàu triết lí", "Châm biếm, mỉa mai sâu cay", "Khô khan, lạnh lùng như báo cáo", "Giọng điệu ấy làm nên phong cách Hoàng Phủ Ngọc Tường: tài hoa, uyên bác, đắm say."],
    ["Điểm chung của hai văn bản Bài 7 là gì?", "Đều là kí viết về một vùng đất, con người Việt Nam", "Đều là truyện ngắn hư cấu hoàn toàn", "Đều là văn bản nghị luận xã hội", "Từ sông Hương xứ Huế tới đất mũi Cà Mau, kí đưa người đọc đi khắp đất nước bằng trang văn."],
    ["Tư liệu trong văn bản kí cần đáp ứng yêu cầu gì?", "Chính xác, được quan sát hoặc kiểm chứng thực tế", "Càng lạ, càng giật gân càng tốt", "Không cần kiểm chứng, chỉ cần hay", "Sự thật là nền tảng của kí; sai tư liệu sẽ làm mất niềm tin của người đọc vào tác giả."],
    ["Nhan đề “Cà Mau quê xứ” gợi tình cảm gì của tác giả?", "Tình quê gắn bó với vùng đất cực Nam Tổ quốc", "Nỗi buồn xa xứ không ngày trở lại", "Ý muốn rời bỏ quê hương đi xa", "Chữ “quê xứ” khẳng định Cà Mau là quê hương tinh thần, niềm tự hào của người viết."]
  ];
  var nv11b7P = [["Ai đã đặt tên cho dòng sông?", "Hoàng Phủ Ngọc Tường"], ["Cà Mau quê xứ", "Trần Tuấn"], ["Sông Hương", "Dòng sông xứ Huế trong bút kí"], ["Đất mũi Cà Mau", "Cực Nam của Tổ quốc"], ["Bút kí", "Kí nặng ghi chép sự thật"], ["Tuỳ bút", "Kí nặng cảm xúc, liên tưởng"], ["Người mẹ phù sa", "Hình ảnh dành cho sông Hương"]];
  var nv11b8F = [
    ["“Nữ phóng viên đầu tiên” là văn bản của tác giả nào?", "Trần Nhật Vy", "Trần Tuấn", "Nguyễn Nhật Ánh", "Trần Nhật Vy là nhà báo, tác giả nhiều sách nghiên cứu về báo chí và Sài Gòn xưa."],
    ["Văn bản “Nữ phóng viên đầu tiên” viết về đối tượng nào?", "Người phụ nữ tiên phong làm báo ở Việt Nam", "Nữ phi hành gia đầu tiên của thế giới", "Nữ vận động viên giành huy chương vàng", "Văn bản thông tin giới thiệu chân dung và đóng góp của nữ nhà báo tiên phong nước ta."],
    ["Nữ phóng viên được nhắc tới gắn với tờ báo phụ nữ nào xưa?", "Báo “Phụ nữ Tân văn” ở Sài Gòn đầu thế kỉ XX", "Báo “Nhân Dân” thời kháng chiến", "Báo “Tuổi Trẻ” thời hiện đại", "“Phụ nữ Tân văn” là tờ báo phụ nữ nổi tiếng, nơi các cây bút nữ đầu tiên khẳng định mình."],
    ["Văn bản thông tin có mục đích chính là gì?", "Cung cấp thông tin chính xác, khách quan về sự việc", "Kể chuyện hư cấu để giải trí là chính", "Bộc lộ cảm xúc cá nhân của tác giả", "Bài 8 của SGK tập trung vào cấu trúc và cách đọc, viết văn bản thông tin."],
    ["Một văn bản thông tin thường gồm những thành phần nào?", "Nhan đề, đề mục, nội dung chi tiết, hình ảnh minh hoạ", "Chỉ một đoạn văn dài không xuống dòng", "Lời thoại của nhiều nhân vật", "Cấu trúc rõ ràng giúp người đọc tra cứu, nắm thông tin nhanh và chính xác."],
    ["“Trí thông minh nhân tạo” là văn bản thuộc lĩnh vực nào?", "Khoa học – công nghệ, về AI trong đời sống hiện đại", "Thể thao quốc tế", "Lịch sử văn học trung đại", "Văn bản thông tin tổng hợp giúp học sinh hiểu AI là gì, ứng dụng và tác động của nó."],
    ["Trí thông minh nhân tạo (AI) được hiểu là gì?", "Khả năng máy móc mô phỏng trí tuệ của con người", "Trí tuệ của người máy trong phim viễn tưởng", "Một loại phần mềm diệt vi-rút máy tính", "AI có thể học từ dữ liệu để nhận diện hình ảnh, dịch ngôn ngữ, trò chuyện với con người."],
    ["Ứng dụng nào sau đây là của trí thông minh nhân tạo?", "Trợ lí ảo, gợi ý phim, nhận diện khuôn mặt", "In sách bằng máy in cơ học", "Đóng tàu bằng thủ công truyền thống", "AI hiện diện trong điện thoại, y tế, giáo dục, giao thông… và đặt ra nhiều vấn đề đạo đức mới."],
    ["Văn bản về Paralympic giới thiệu sự kiện thể thao nào?", "Thế vận hội dành cho vận động viên khuyết tật", "Thế vận hội mùa đông cho thanh niên", "Giải bóng đá vô địch thế giới", "Paralympic được tổ chức ngay sau Olympic, tôn vinh ý chí vượt lên số phận của con người."],
    ["Tinh thần nổi bật của các vận động viên Paralympic là gì?", "Nghị lực phi thường, vượt qua giới hạn của cơ thể", "Thi đấu chỉ để nhận tiền thưởng lớn", "Tránh mọi khó khăn trong cuộc sống", "Họ truyền cảm hứng cho toàn xã hội bằng câu chuyện khổ luyện và khát vọng hoà nhập."],
    ["Paralympic lần đầu được tổ chức chính thức vào năm nào?", "Năm 1960, tại Rô-ma (Ý)", "Năm 1896, tại A-ten (Hy Lạp)", "Năm 2000, tại Xít-ni (Úc)", "Tiền thân của Paralympic là đại hội thể thao cho cựu chiến binh bị thương sau Chiến tranh thế giới II."],
    ["Phương tiện phi ngôn ngữ trong văn bản là gì?", "Hình ảnh, biểu đồ, sơ đồ, kí hiệu hỗ trợ thông tin", "Các từ ngữ địa phương khó hiểu", "Dấu câu đặc biệt trong câu văn", "Phương tiện phi ngôn ngữ giúp thông tin trực quan, dễ hiểu, đặc biệt với số liệu, quy trình."],
    ["Khi nào nên dùng biểu đồ trong văn bản thông tin?", "Khi trình bày số liệu cần so sánh, thấy xu hướng", "Khi kể một câu chuyện tình cảm", "Khi viết lời chào mở đầu bài", "Biểu đồ cột, đường, tròn mỗi loại phù hợp với một kiểu dữ liệu khác nhau."],
    ["Nhan đề của văn bản thông tin cần đáp ứng yêu cầu gì?", "Ngắn gọn, chính xác, phản ánh đúng nội dung chính", "Càng dài, càng nhiều chi tiết càng tốt", "Giật gân, sai lệch để thu hút chú ý", "Nhan đề tốt giúp người đọc quyết định đọc tiếp và định hướng đúng nội dung văn bản."],
    ["Đề mục (tiêu đề nhỏ) trong văn bản thông tin có tác dụng gì?", "Chia ý, giúp người đọc theo dõi cấu trúc văn bản", "Trang trí cho trang văn bản đẹp hơn", "Thay thế hoàn toàn cho đoạn văn", "Hệ thống đề mục là “bản đồ” của văn bản thông tin dài, nhiều dữ kiện."],
    ["Độ tin cậy của văn bản thông tin được đánh giá qua đâu?", "Nguồn tin, tác giả, số liệu và thời điểm công bố", "Số lượng người chia sẻ trên mạng", "Văn phong hoa mĩ của người viết", "Trong thời đại số, kiểm chứng nguồn là kĩ năng sống còn khi đọc thông tin."],
    ["Văn bản “Nữ phóng viên đầu tiên” thuộc kiểu văn bản nào?", "Văn bản thông tin tổng hợp về một nhân vật báo chí", "Truyện ngắn trữ tình hiện đại", "Kịch bản sân khấu lịch sử", "Văn bản kết hợp tiểu sử, sự kiện và đánh giá, giúp hiểu lịch sử báo chí Việt Nam."],
    ["Vì sao nghề báo của phụ nữ xưa là bước tiến đáng ghi nhận?", "Phụ nữ vượt định kiến để khẳng định tiếng nói xã hội", "Vì nghề báo xưa rất nhàn hạ, ít áp lực", "Vì chỉ phụ nữ mới được phép viết báo", "Nữ phóng viên đầu tiên mở đường cho phụ nữ tham gia đời sống báo chí, văn hoá nước nhà."],
    ["Khi viết văn bản thông tin, cần trình bày thông tin theo thứ tự nào?", "Theo thời gian, không gian hoặc tầm quan trọng", "Tuỳ hứng, nghĩ đến đâu viết đến đó", "Theo thứ tự bảng chữ cái của từ đầu tiên", "Trật tự hợp lí giúp người đọc tiếp nhận thông tin không bị rối, không bỏ sót ý."],
    ["Hình ảnh trong văn bản thông tin cần chú thích thế nào?", "Chú thích rõ nội dung, nguồn của hình ảnh", "Không cần chú thích gì cả", "Chú thích bằng thơ cho sinh động", "Chú thích ảnh là yêu cầu nghề nghiệp, giúp thông tin minh bạch và đáng tin."],
    ["AI đặt ra thách thức đạo đức nào cho xã hội?", "Việc làm, quyền riêng tư và tin giả do máy tạo ra", "Máy móc chiếm hết oxy của con người", "Con người không cần học tập nữa", "Hiểu cả cơ hội và thách thức của AI giúp học sinh sử dụng công nghệ có trách nhiệm."],
    ["Điểm khác nhau giữa văn bản thông tin và văn bản văn học là gì?", "Thông tin thiên về sự thật; văn học giàu tưởng tượng", "Văn bản thông tin không bao giờ có hình ảnh", "Văn bản văn học không bao giờ có sự thật", "Hai loại văn bản khác nhau về mục đích, ngôn ngữ và cách tổ chức thông tin."],
    ["Đọc văn bản thông tin hiệu quả cần kĩ năng nào?", "Đọc lướt tìm ý chính, đọc kĩ chi tiết và ghi chú", "Đọc thuộc lòng từng chữ trong văn bản", "Chỉ đọc nhan đề rồi đoán nội dung", "SGK Bài 8 rèn chiến lược đọc văn bản thông tin dài, nhiều phương tiện phi ngôn ngữ."],
    ["Từ “Paralympic” được ghép từ những yếu tố nào?", "“Para” (song song) và “Olympic”: song song với Olympic", "Tên của một vận động viên nổi tiếng", "Tên thành phố đầu tiên đăng cai", "Cách đặt tên khẳng định vị thế ngang hàng của thể thao người khuyết tật với Olympic."]
  ];
  var nv11b8P = [["Nữ phóng viên đầu tiên", "Trần Nhật Vy"], ["Trí thông minh nhân tạo", "Văn bản về công nghệ AI"], ["Paralympic", "Thế vận hội người khuyết tật"], ["Phương tiện phi ngôn ngữ", "Hình ảnh, biểu đồ, sơ đồ"], ["Phụ nữ Tân văn", "Tờ báo phụ nữ xưa ở Sài Gòn"], ["Nhan đề văn bản thông tin", "Ngắn gọn, đúng nội dung chính"], ["Biểu đồ", "Trình bày số liệu trực quan"]];
  var nv11b9F = [
    ["“Bài ca ngất ngưởng” là tác phẩm của ai?", "Nguyễn Công Trứ", "Nguyễn Du", "Cao Bá Quát", "Nguyễn Công Trứ (1778–1858) là nhà thơ, vị quan tài năng, tác giả nhiều bài ca trù nổi tiếng."],
    ["“Ngất ngưởng” trong nhan đề bài thơ có nghĩa là gì?", "Ngông nghênh, khác đời, không chịu khuôn phép gò bó", "Say rượu, đi đứng loạng choạng", "Buồn bã, chán nản với cuộc đời", "Chữ “ngất ngưởng” là tuyên ngôn sống của Nguyễn Công Trứ: làm quan, làm lính, làm thơ đều khác người."],
    ["Thể loại của “Bài ca ngất ngưởng” là gì?", "Hát nói (ca trù), thể thơ tự do phóng khoáng", "Lục bát dân gian", "Thất ngôn bát cú Đường luật", "Hát nói là thể loại sở trường của Nguyễn Công Trứ, phù hợp để khoe tài và tuyên ngôn cá tính."],
    ["Nguyễn Công Trứ tự kể cuộc đời mình trong bài thơ thế nào?", "Từng làm quan to, cầm quân, rồi về hưu ngất ngưởng", "Suốt đời chỉ ở ẩn trong núi rừng", "Chưa từng đỗ đạt hay làm quan", "Bài thơ là bản “tự thuật” kiêu hãnh: vào triều làm quan, ra trận làm tướng, về già vui thú riêng."],
    ["Câu thơ nào của Nguyễn Công Trứ thể hiện khát vọng lập danh?", "“Phải có danh gì với núi sông”", "“Người buồn cảnh có vui đâu bao giờ”", "“Chí làm trai dặm nghìn da ngựa”", "Câu thơ nổi tiếng này thể hiện quan niệm sống tích cực, khẳng định tài năng và cá tính của Nguyễn Công Trứ."],
    ["Tư tưởng chủ đạo của “Bài ca ngất ngưởng” là gì?", "Khẳng định cá tính, tài năng và lối sống tự do của cái “tôi”", "Ca ngợi sự an phận, nhún nhường tuyệt đối", "Than khóc cho thân phận bần hàn", "Bài thơ tiêu biểu cho ý thức cá nhân nổi bật trong văn học trung đại giai đoạn cuối."],
    ["“Văn tế nghĩa sĩ Cần Giuộc” là tác phẩm của ai?", "Nguyễn Đình Chiểu", "Nguyễn Công Trứ", "Phan Văn Trị", "Nguyễn Đình Chiểu (1822–1888) là nhà thơ mù yêu nước lớn của văn học Nam Bộ thế kỉ XIX."],
    ["“Văn tế nghĩa sĩ Cần Giuộc” viết để tưởng nhớ ai?", "Những nông dân nghĩa sĩ hi sinh khi đánh đồn Tây ở Cần Giuộc", "Các vị tướng triều đình tử trận", "Những nhà thơ cùng thời với tác giả", "Năm 1861, nghĩa quân nông dân tập kích đồn Pháp ở Cần Giuộc (Long An) và hi sinh anh dũng."],
    ["Hình tượng người nghĩa sĩ trong bài văn tế có đặc điểm gì?", "Nông dân chân đất, ít học mà anh hùng, xả thân vì nước", "Quan lại giàu sang, học rộng tài cao", "Thương nhân buôn bán khắp nơi", "Lần đầu trong văn học, người nông dân lao động bước vào văn tế với tư thế anh hùng cứu nước."],
    ["Câu văn nào mở đầu “Văn tế nghĩa sĩ Cần Giuộc”?", "“Hỡi ôi! Súng giặc đất rền; lòng dân trời tỏ”", "“Việc nhân nghĩa cốt ở yên dân”", "“Hỡi ôi! Trời Nam, đất Việt”", "Lời than mở đầu dựng bối cảnh giặc Pháp xâm lược và tấm lòng yêu nước của nhân dân."],
    ["Thể văn tế là thể loại như thế nào?", "Văn đọc trong lễ tế, tưởng nhớ người đã khuất", "Văn bản hành chính bổ nhiệm quan lại", "Truyện kể về thần thánh, ma quỷ", "Văn tế vừa trang trọng, vừa giàu cảm xúc bi thương và ngợi ca công đức người đã mất."],
    ["Nguyễn Đình Chiểu có số phận đặc biệt nào?", "Bị mù cả hai mắt, vẫn dạy học, làm thuốc, làm thơ yêu nước", "Đi du học nhiều năm ở châu Âu", "Làm quan lớn đứng đầu triều đình", "Đôi mắt mù nhưng tấm lòng sáng; ông là tấm gương nghị lực và khí tiết của đất Nam Bộ."],
    ["“Cộng đồng và cá thể” là văn bản của nhà khoa học nào?", "An-be Anh-xtanh (Albert Einstein)", "Niu-tơn (Isaac Newton)", "Ga-li-lê (Galileo Galilei)", "Einstein (1879–1955) là nhà vật lí vĩ đại, cha đẻ của thuyết tương đối."],
    ["Văn bản “Cộng đồng và cá thể” bàn về vấn đề gì?", "Quan hệ giữa cá nhân và cộng đồng trong đời sống xã hội", "Cách chế tạo vũ khí hạt nhân hiện đại", "Lịch sử của môn vật lí học", "Einstein khẳng định: cá nhân chỉ tồn tại và phát triển nhờ cộng đồng, phải có trách nhiệm với cộng đồng."],
    ["Theo Einstein, cá thể con người phụ thuộc cộng đồng thế nào?", "Cá nhân được cộng đồng nuôi dưỡng, bảo vệ và giáo dục", "Cá nhân hoàn toàn không cần tới cộng đồng", "Cộng đồng chỉ kìm hãm mọi cá nhân", "Ngôn ngữ, thức ăn, tri thức của mỗi người đều là sản phẩm của bao thế hệ cộng đồng đi trước."],
    ["Thông điệp của Einstein gửi tới mỗi cá nhân là gì?", "Sống có ích, đóng góp trở lại cho cộng đồng đã nuôi mình", "Chỉ lo hưởng thụ cho bản thân mình", "Tách mình khỏi xã hội để sống ẩn dật", "Bài viết là lời nhắc về trách nhiệm xã hội của mỗi người, nhất là người có tài năng."],
    ["Nhan đề Bài 9 “Lựa chọn và hành động” gợi chủ đề gì?", "Con người trước lựa chọn sống và hành động theo lựa chọn ấy", "Cách lựa chọn nghề nghiệp trong tương lai", "Lựa chọn trang phục phù hợp thời tiết", "Ba văn bản ở ba thời đại cùng đặt câu hỏi: sống thế nào cho có ý nghĩa và có trách nhiệm với đời."],
    ["Điểm chung giữa Nguyễn Công Trứ và người nghĩa sĩ Cần Giuộc là gì?", "Đều hành động quyết liệt theo lựa chọn sống của mình", "Đều là những nhà thơ mù nổi tiếng", "Đều sống ẩn dật, tránh việc đời", "Một bên là cái “tôi” tài tử ngất ngưởng, một bên là người nông dân xả thân — cùng đề cao hành động."],
    ["Văn tế thường có cấu trúc mấy phần chính?", "Bốn phần: lung khởi, thích thực, ai điếu, kết thúc", "Chỉ một phần duy nhất, không chia đoạn", "Hai phần: mở đầu và kết thúc", "Cấu trúc văn tế cổ điển giúp triển khai từ bối cảnh, công đức người mất tới lời than và an ủi."],
    ["Tác phẩm nào của Nguyễn Đình Chiểu nổi tiếng nhất?", "Truyện thơ “Lục Vân Tiên”", "“Bài ca ngất ngưởng”", "“Dương phụ hành”", "“Lục Vân Tiên” là truyện thơ Nôm được nhân dân Nam Bộ thuộc lòng, ca ngợi đạo lí làm người."],
    ["Nguyễn Công Trứ còn nổi tiếng với công lao gì trong lịch sử?", "Khai hoang, lập các huyện Tiền Hải và Kim Sơn", "Sáng lập trường Quốc Tử Giám ở Huế", "Dịch Truyện Kiều sang chữ quốc ngữ", "Ông là doanh điền sứ có công mở đất ven biển Bắc Bộ, được dân lập đền thờ khi còn sống."],
    ["Giọng điệu của “Văn tế nghĩa sĩ Cần Giuộc” là gì?", "Bi tráng, ngợi ca, chan chứa xót thương và tự hào", "Hài hước, châm biếm nhẹ nhàng", "Lạnh lùng, dửng dưng như ghi chép", "Văn tế của Nguyễn Đình Chiểu được đánh giá là “khúc ca” bất tử về người nông dân yêu nước."],
    ["Khi bàn về lựa chọn sống, bài học rút ra từ Bài 9 là gì?", "Chọn lẽ sống có ích và dám hành động vì cộng đồng", "Sống sao cũng được, không cần lựa chọn", "Chỉ chọn điều có lợi cho riêng mình", "Từ thơ ca tới văn chính luận, Bài 9 hướng học sinh tới lối sống trách nhiệm và chủ động."],
    ["“Bài ca ngất ngưởng” được viết khi tác giả ở giai đoạn nào?", "Khi đã về hưu, nhìn lại cả cuộc đời làm quan, làm tướng", "Khi còn là cậu học trò mười tuổi", "Khi đang bị giam trong ngục tối", "Bài thơ là lời tự thuật ngông nghênh, tự hào của vị quan đã trải đủ vinh quang khi về già."]
  ];
  var nv11b9P = [["Bài ca ngất ngưởng", "Nguyễn Công Trứ"], ["Văn tế nghĩa sĩ Cần Giuộc", "Nguyễn Đình Chiểu"], ["Cộng đồng và cá thể", "An-be Anh-xtanh"], ["Lục Vân Tiên", "Truyện thơ của Nguyễn Đình Chiểu"], ["Hát nói", "Thể loại của Bài ca ngất ngưởng"], ["Nghĩa sĩ Cần Giuộc", "Nông dân anh hùng đánh Pháp"], ["Thuyết tương đối", "Học thuyết của Einstein"]];
  var nv11cd1F = [
    ["Chuyên đề 1 Ngữ văn 11 nghiên cứu về lĩnh vực nào?", "Văn học trung đại Việt Nam", "Văn học hiện đại sau 1975", "Văn học nước ngoài dịch", "Chuyên đề rèn nghiên cứu và viết báo cáo về một vấn đề văn học trung đại."],
    ["Văn học trung đại Việt Nam kéo dài trong khoảng thời gian nào?", "Từ thế kỉ X đến hết thế kỉ XIX", "Từ năm 1945 đến nay", "Chỉ trong thế kỉ XVIII", "Đây là giai đoạn văn học chữ Hán và chữ Nôm, gắn với chế độ phong kiến Việt Nam."],
    ["Hai bộ phận lớn của văn học trung đại Việt Nam là gì?", "Văn học chữ Hán và văn học chữ Nôm", "Văn học viết và văn học mạng", "Văn học trong nước và văn học hải ngoại", "Chữ Hán là chữ viết chính thống; chữ Nôm do người Việt sáng tạo để ghi tiếng Việt."],
    ["Một báo cáo nghiên cứu văn học cần có phần nào quan trọng nhất?", "Nội dung nghiên cứu có luận điểm, dẫn chứng, phân tích", "Chỉ cần bìa và mục lục thật đẹp", "Chỉ cần danh sách người thực hiện", "Báo cáo khoa học phải trình bày vấn đề, tư liệu, kết quả và kết luận rõ ràng."],
    ["Bước đầu tiên khi nghiên cứu một vấn đề văn học trung đại là gì?", "Xác định đề tài, câu hỏi và phạm vi nghiên cứu", "Viết ngay phần kết luận của báo cáo", "In báo cáo để nộp cho giáo viên", "Đề tài tốt phải vừa sức, có tư liệu và có ý nghĩa học tập rõ ràng."],
    ["Nguồn tư liệu nghiên cứu văn học trung đại gồm những gì?", "Văn bản tác phẩm, sách nghiên cứu, bài báo khoa học", "Chỉ ý kiến cá nhân trên mạng xã hội", "Tin đồn truyền miệng không kiểm chứng", "Tư liệu phải ghi rõ nguồn để người đọc kiểm chứng được tính xác thực."],
    ["Khi đọc tác phẩm trung đại, khó khăn lớn nhất thường là gì?", "Ngôn ngữ cổ, điển tích, điển cố và bối cảnh lịch sử xa lạ", "Sách in quá nhiều hình minh hoạ", "Tác phẩm nào cũng rất ngắn", "Cần tra từ điển Hán Nôm, đọc chú giải và tìm hiểu lịch sử thời đại của tác phẩm."],
    ["Điển tích, điển cố trong thơ văn trung đại là gì?", "Chuyện xưa, sách xưa được viện dẫn để nói ý hiện tại", "Tên các nhân vật do tác giả bịa ra", "Các con số thống kê trong bài thơ", "Hiểu điển cố là chìa khoá mở nhiều câu thơ của Nguyễn Du, Nguyễn Trãi, Cao Bá Quát."],
    ["Tác giả trung đại tiêu biểu nào thuộc thế kỉ XV?", "Nguyễn Trãi với “Bình Ngô đại cáo” và “Ức Trai thi tập”", "Nguyễn Công Trứ với bài hát nói", "Xuân Quỳnh với thơ tình hiện đại", "Nguyễn Trãi là đỉnh cao văn học thế kỉ XV, kết hợp văn chính luận và thơ trữ tình."],
    ["Tác giả trung đại tiêu biểu nào thuộc thế kỉ XVIII–XIX?", "Nguyễn Du, Hồ Xuân Hương, Nguyễn Đình Chiểu", "Tố Hữu, Huy Cận, Xuân Diệu", "Nam Cao, Kim Lân, Tô Hoài", "Đây là giai đoạn văn học trung đại đạt đỉnh cao và dần chuyển sang hiện đại."],
    ["Phương pháp so sánh trong nghiên cứu văn học dùng để làm gì?", "Đối chiếu tác phẩm, tác giả để thấy nét chung và riêng", "So sánh giá tiền của các cuốn sách", "So sánh số trang giữa hai tác phẩm", "So sánh giúp làm nổi bật phong cách, tư tưởng của từng tác giả, thời đại."],
    ["Phần tài liệu tham khảo trong báo cáo cần ghi thế nào?", "Đủ tác giả, tên tài liệu, nơi và năm xuất bản", "Chỉ ghi tên trang web đã truy cập", "Không cần ghi nếu tư liệu ít", "Ghi tài liệu tham khảo thể hiện thái độ trung thực và nghiêm túc khoa học."],
    ["Trích dẫn trong báo cáo nghiên cứu phải tuân thủ điều gì?", "Trích đúng nguyên văn, ghi rõ nguồn và trang trích", "Được sửa ý của tác giả cho hay hơn", "Không cần ghi nguồn nếu trích ngắn", "Sai trích dẫn là lỗi học thuật nghiêm trọng, có thể bị coi là đạo văn."],
    ["Khi thuyết trình báo cáo nghiên cứu, cần chuẩn bị gì?", "Dàn ý rõ, ví dụ tiêu biểu và trả lời được câu hỏi phản biện", "Đọc nguyên văn toàn bộ báo cáo thật nhanh", "Chỉ cần thuộc lòng phần mở đầu", "Thuyết trình tốt giúp kết quả nghiên cứu đến được với người nghe một cách thuyết phục."],
    ["Một vấn đề văn học trung đại có thể nghiên cứu là gì?", "Hình tượng người anh hùng trong thơ văn yêu nước trung đại", "Cách dùng điện thoại của học sinh hiện nay", "Lịch sử giải bóng đá thế giới", "Đề tài phải thuộc phạm vi chuyên đề: tác giả, tác phẩm, thể loại, tư tưởng văn học trung đại."],
    ["Vì sao cần đọc văn bản gốc hoặc bản dịch tin cậy khi nghiên cứu?", "Để hiểu đúng ý tác giả, tránh hiểu sai qua lời kể lại", "Vì bản gốc luôn ngắn hơn bản kể lại", "Để khoe khả năng đọc chữ Hán", "Nhiều tác phẩm trung đại viết bằng chữ Hán, Nôm nên bản dịch, bản phiên âm rất quan trọng."],
    ["Kết luận của báo cáo nghiên cứu cần đạt yêu cầu gì?", "Khái quát kết quả, trả lời đúng câu hỏi nghiên cứu đã đặt", "Lặp lại nguyên văn phần mở đầu", "Nêu thêm nhiều vấn đề không liên quan", "Kết luận tốt còn gợi được hướng nghiên cứu tiếp theo về đề tài."],
    ["Tính mới trong một báo cáo học sinh có thể nằm ở đâu?", "Góc nhìn riêng, cách sắp xếp tư liệu và nhận xét cá nhân", "Sao chép nguyên văn một bài nghiên cứu có sẵn", "Chọn đề tài càng rộng càng tốt", "Dù ở mức phổ thông, báo cáo vẫn cần tiếng nói riêng của người nghiên cứu."],
    ["Nhóm nghiên cứu nên phân công công việc thế nào?", "Rõ người tìm tư liệu, người viết, người thuyết trình", "Một người làm hết, còn lại chỉ đứng tên", "Không cần phân công, tuỳ hứng làm", "Làm việc nhóm hiệu quả là kĩ năng trọng tâm của các chuyên đề Ngữ văn."],
    ["Khi gặp tư liệu trái ngược nhau về một tác giả, cần làm gì?", "Đối chiếu nhiều nguồn, chọn nguồn đáng tin và ghi chú rõ", "Chọn nguồn nào viết hay nhất là xong", "Bỏ qua, không nhắc tới trong báo cáo", "Thái độ khoa học đòi hỏi tôn trọng sự thật và trình bày minh bạch các ý kiến khác nhau."],
    ["Văn học trung đại có hệ thống thể loại đặc trưng nào?", "Chiếu, cáo, hịch, văn tế, thơ luật, truyện thơ Nôm", "Tiểu thuyết chương hồi hiện đại", "Kịch bản phim truyền hình", "Nhận diện thể loại là bước cơ bản khi nghiên cứu bất kì tác phẩm trung đại nào."],
    ["Mục tiêu cuối cùng của chuyên đề 1 là gì?", "Biết nghiên cứu và trình bày một vấn đề văn học trung đại", "Học thuộc lòng toàn bộ thơ trung đại", "Trở thành nhà văn chuyên nghiệp ngay", "Chuyên đề hướng tới năng lực tự học, tự nghiên cứu văn học suốt đời."]
  ];
  var nv11cd1P = [["Văn học trung đại", "Từ thế kỉ X đến hết XIX"], ["Chữ Hán", "Chữ viết chính thống trung đại"], ["Chữ Nôm", "Chữ do người Việt sáng tạo"], ["Điển tích, điển cố", "Chuyện xưa được viện dẫn"], ["Báo cáo nghiên cứu", "Trình bày kết quả nghiên cứu"], ["Tài liệu tham khảo", "Ghi nguồn tư liệu đã dùng"], ["Nguyễn Trãi", "Tác giả trung đại thế kỉ XV"]];
  var nv11cd2F = [
    ["Chuyên đề 2 Ngữ văn 11 nghiên cứu về vấn đề gì?", "Ngôn ngữ trong đời sống xã hội hiện đại", "Ngôn ngữ của người ngoài hành tinh", "Ngôn ngữ cổ của các triều đại xưa", "Chuyên đề tìm hiểu bản chất xã hội – văn hoá và sự phát triển của ngôn ngữ hôm nay."],
    ["Ngôn ngữ có bản chất xã hội thể hiện ở điểm nào?", "Ngôn ngữ do xã hội tạo ra, mọi người cùng tuân theo", "Ngôn ngữ là khả năng bẩm sinh riêng từng người", "Mỗi người tự bịa một ngôn ngữ riêng", "Không ai tự đặt ra tiếng Việt; mỗi cá nhân học và dùng ngôn ngữ chung của cộng đồng."],
    ["Ngôn ngữ gắn với văn hoá như thế nào?", "Ngôn ngữ lưu giữ, phản ánh văn hoá của cộng đồng nói nó", "Ngôn ngữ không liên quan gì tới văn hoá", "Văn hoá chỉ thể hiện qua ẩm thực", "Từ ngữ về lễ hội, phong tục, cách xưng hô… đều in dấu văn hoá của một dân tộc."],
    ["Ngôn ngữ có phát triển theo xã hội không?", "Có, ngôn ngữ luôn biến đổi cùng đời sống xã hội", "Không, ngôn ngữ bất biến vĩnh viễn", "Chỉ phát triển ở các nước lớn", "Xã hội có sự vật, khái niệm mới thì ngôn ngữ sinh từ mới; sự vật mất đi, từ cũng dần mất."],
    ["Từ mới xuất hiện trong tiếng Việt gần đây thường do đâu?", "Nhu cầu gọi tên sự vật, công nghệ và lối sống mới", "Do một cá nhân nổi tiếng tự đặt ra", "Do dịch sai từ tiếng nước ngoài", "Ví dụ các từ về internet, mạng xã hội ra đời cùng sự phát triển của công nghệ số."],
    ["Hiện tượng vay mượn từ ngữ nước ngoài có ý nghĩa gì?", "Làm giàu vốn từ, đáp ứng nhu cầu giao tiếp mới", "Làm tiếng Việt bị mất hoàn toàn bản sắc", "Là hiện tượng cấm trong giao tiếp", "Tiếng Việt từng vay nhiều từ Hán, Pháp, Anh; vay mượn là quy luật chung của mọi ngôn ngữ."],
    ["Tiếng lóng trong giới trẻ có đặc điểm gì?", "Chỉ dùng trong nhóm nhỏ, lan nhanh và cũng mau tàn", "Được ghi chính thức trong mọi từ điển", "Là ngôn ngữ chuẩn mực của báo chí", "Tiếng lóng thể hiện sự sáng tạo, cá tính của nhóm người dùng nhưng cần dùng đúng nơi, đúng lúc."],
    ["Ngôn ngữ mạng xã hội khác ngôn ngữ chuẩn ở điểm nào?", "Ngắn gọn, nhiều viết tắt, biểu tượng cảm xúc, biến tấu", "Luôn trang trọng và đầy đủ dấu câu", "Chỉ dùng từ ngữ Hán Việt cổ", "Hiểu các kiểu ngôn ngữ giúp học sinh giao tiếp linh hoạt mà vẫn giữ sự trong sáng của tiếng Việt."],
    ["Vì sao cần giữ gìn sự trong sáng của tiếng Việt?", "Để ngôn ngữ giàu đẹp, giao tiếp rõ ràng, đúng chuẩn mực", "Để cấm mọi từ ngữ mới xuất hiện", "Để chỉ dùng từ Hán Việt khi nói", "Giữ gìn không có nghĩa là đóng kín; tiếng Việt vừa tiếp thu cái mới vừa giữ bản sắc riêng."],
    ["Xưng hô trong tiếng Việt phản ánh điều gì?", "Quan hệ thân sơ, thứ bậc và văn hoá ứng xử của người Việt", "Chỉ là thói quen không có ý nghĩa gì", "Giống hệt cách xưng hô của tiếng Anh", "Hệ thống anh, chị, em, cô, chú… giàu sắc thái là nét đặc sắc văn hoá trong tiếng Việt."],
    ["Ngôn ngữ chuyên ngành là gì?", "Hệ thống thuật ngữ riêng của một lĩnh vực nghề nghiệp", "Ngôn ngữ bí mật của một nhóm bạn", "Cách nói lắp của một số người", "Thuật ngữ y học, tin học, kinh tế… giúp giao tiếp chính xác trong từng chuyên ngành."],
    ["Phương ngữ là gì?", "Biến thể ngôn ngữ của một vùng miền trong một nước", "Một ngôn ngữ hoàn toàn khác của nước ngoài", "Lỗi phát âm của một cá nhân", "Tiếng Việt có ba vùng phương ngữ chính: Bắc, Trung, Nam với khác biệt về ngữ âm, từ vựng."],
    ["Sự khác biệt phương ngữ có gây khó giao tiếp không?", "Có thể gây khó hiểu cục bộ nhưng làm giàu tiếng Việt", "Làm người Việt không hiểu nhau chút nào", "Là điều cần xoá bỏ hoàn toàn", "Tôn trọng phương ngữ là tôn trọng đa dạng văn hoá vùng miền trong cộng đồng nói tiếng Việt."],
    ["Ngôn ngữ cơ thể thuộc loại hình giao tiếp nào?", "Giao tiếp phi ngôn ngữ: cử chỉ, nét mặt, ánh mắt", "Giao tiếp bằng văn bản viết tay", "Giao tiếp qua điện thoại cố định", "Ngôn ngữ cơ thể hỗ trợ hoặc đôi khi thay thế lời nói trong giao tiếp trực tiếp."],
    ["Khi ngôn ngữ xã hội thay đổi, từ điển cần làm gì?", "Cập nhật từ mới, nghĩa mới và ghi chú cách dùng", "Giữ nguyên mãi, không thêm từ nào", "Xoá bỏ mọi từ cổ trong ngôn ngữ", "Từ điển là tấm gương ghi lại sự phát triển của ngôn ngữ qua từng thời kì."],
    ["Hiện tượng “nói chen tiếng nước ngoài” cần nhìn nhận thế nào?", "Dùng đúng lúc thì tiện lợi, lạm dụng sẽ làm mất trong sáng", "Hoàn toàn bị cấm trong mọi trường hợp", "Càng chen nhiều càng chứng tỏ giỏi", "Chuyên đề hướng học sinh tới thái độ chừng mực, tôn trọng tiếng mẹ đẻ khi giao tiếp."],
    ["Ngôn ngữ quảng cáo có đặc điểm nổi bật nào?", "Ngắn gọn, gây ấn tượng, nhiều chơi chữ và khẩu hiệu", "Dài dòng, đầy đủ mọi thông tin chi tiết", "Chỉ dùng thuật ngữ khoa học khó hiểu", "Quảng cáo là lĩnh vực thể hiện rõ sức sáng tạo và biến đổi nhanh của ngôn ngữ hiện đại."],
    ["Vì sao ngôn ngữ của mỗi thế hệ có nét riêng?", "Mỗi thế hệ sống trong điều kiện xã hội, công nghệ khác nhau", "Do thế hệ sau cố ý nói sai ngôn ngữ", "Do trường học dạy khác nhau mỗi năm", "Khác biệt thế hệ trong ngôn ngữ là hiện tượng bình thường, cần hiểu để giao tiếp hài hoà."],
    ["Chuẩn mực ngôn ngữ là gì?", "Quy tắc chung được xã hội thừa nhận khi dùng ngôn ngữ", "Cách nói riêng của một người nổi tiếng", "Luật do một cá nhân ban hành", "Chuẩn mực giúp giao tiếp thống nhất, rõ ràng trong văn bản chính thức, học tập và báo chí."],
    ["Nghiên cứu ngôn ngữ trong đời sống cần phương pháp nào?", "Quan sát, thu thập ngữ liệu thực tế rồi phân tích, khái quát", "Chỉ ngồi tưởng tượng trong phòng kín", "Sao chép kết luận của người khác", "Ngữ liệu từ báo chí, mạng xã hội, giao tiếp hằng ngày là nguồn tư liệu phong phú của chuyên đề."],
    ["Ngôn ngữ biến đổi nhanh nhất ở tầng nào?", "Từ vựng: từ mới sinh ra, từ cũ mất đi liên tục", "Ngữ pháp thay đổi hoàn toàn mỗi năm", "Chữ viết thay đổi theo từng tháng", "Ngữ âm và ngữ pháp biến đổi rất chậm; từ vựng là tầng nhạy cảm nhất với đời sống xã hội."],
    ["Mục tiêu của chuyên đề 2 là gì?", "Hiểu ngôn ngữ để dùng tiếng Việt đúng, hay, có văn hoá", "Học thêm một ngoại ngữ mới hoàn toàn", "Chế tạo một ngôn ngữ nhân tạo riêng", "Từ hiểu bản chất ngôn ngữ, học sinh biết trân trọng và làm giàu tiếng nói của dân tộc."]
  ];
  var nv11cd2P = [["Bản chất xã hội của ngôn ngữ", "Ngôn ngữ do cộng đồng tạo ra"], ["Phương ngữ", "Biến thể ngôn ngữ theo vùng miền"], ["Tiếng lóng", "Ngôn ngữ riêng của nhóm nhỏ"], ["Từ mới", "Sinh ra cùng sự vật, khái niệm mới"], ["Thuật ngữ", "Từ riêng của ngành chuyên môn"], ["Ngôn ngữ mạng", "Ngắn gọn, nhiều viết tắt, biểu tượng"], ["Chuẩn mực ngôn ngữ", "Quy ước chung khi dùng ngôn ngữ"]];
  var nv11cd3F = [
    ["Chuyên đề 3 Ngữ văn 11 có nội dung chính là gì?", "Đọc, viết và giới thiệu về một tác giả văn học", "Học thuộc tiểu sử của mọi nhà văn", "Diễn kịch về cuộc đời nhà văn", "Chuyên đề rèn cách tìm hiểu sâu một tác giả và trình bày kết quả trước người nghe."],
    ["Khi tìm hiểu một tác giả văn học, cần nắm những gì?", "Tiểu sử, thời đại, sự nghiệp và phong cách sáng tác", "Chỉ cần biết năm sinh của tác giả", "Chỉ cần đọc một bài thơ của tác giả", "Bốn yếu tố ấy giúp hiểu vì sao tác giả viết như vậy và đóng góp gì cho văn học."],
    ["Phong cách sáng tác của tác giả là gì?", "Nét riêng ổn định trong cách viết, đề tài và giọng điệu", "Chữ viết tay đẹp hay xấu của tác giả", "Sở thích ăn mặc của tác giả", "Phong cách làm nên “vân tay nghệ thuật” phân biệt tác giả này với tác giả khác."],
    ["Bài giới thiệu về một tác giả nên gồm những phần nào?", "Tiểu sử, sự nghiệp, tác phẩm tiêu biểu, đánh giá đóng góp", "Chỉ liệt kê danh sách tác phẩm", "Chỉ kể các câu chuyện đời tư vui", "Cấu trúc rõ ràng giúp người nghe hình dung trọn vẹn chân dung nhà văn."],
    ["Vì sao cần đặt tác giả trong bối cảnh thời đại của họ?", "Thời đại chi phối đề tài, tư tưởng và số phận tác giả", "Để bài giới thiệu dài thêm vài trang", "Thời đại không ảnh hưởng gì tới sáng tác", "Hiểu thời đại phong kiến giúp hiểu Nguyễn Du; hiểu thời chống Mĩ giúp hiểu các nhà thơ chiến trường."],
    ["Khi chọn tác giả để giới thiệu, tiêu chí nào quan trọng?", "Tác giả có đóng góp rõ và có tư liệu đáng tin cậy", "Chỉ chọn tác giả đang nổi trên mạng xã hội", "Chọn tác giả càng ít người biết càng tốt", "Nên chọn tác giả mình thật sự yêu thích và đọc kĩ tác phẩm của họ."],
    ["Nguồn tư liệu về tác giả văn học đáng tin cậy gồm gì?", "Sách nghiên cứu, từ điển văn học, hồi kí và tác phẩm gốc", "Bình luận chưa kiểm chứng trên mạng xã hội", "Tin đồn về đời tư của nhà văn", "Kiểm chứng tư liệu là yêu cầu bắt buộc trước khi viết và thuyết trình giới thiệu."],
    ["Trích dẫn thơ văn khi giới thiệu tác giả có tác dụng gì?", "Minh chứng sinh động cho nhận xét về phong cách tác giả", "Làm bài viết dài ra không cần thiết", "Thay thế hoàn toàn phần đánh giá", "Một đoạn trích đúng chỗ giúp người nghe tự cảm nhận được tài năng của nhà văn."],
    ["Thuyết trình giới thiệu tác giả cần kĩ năng gì?", "Nói mạch lạc, dẫn chứng hay, giao lưu với người nghe", "Đọc thuộc lòng toàn bộ bài viết thật nhanh", "Chỉ đứng yên và nhìn vào giấy", "Người thuyết trình tốt biến bài viết thành lời nói sống động, có điểm nhấn."],
    ["Đánh giá đóng góp của tác giả cần căn cứ vào đâu?", "Giá trị tác phẩm và vị trí của tác giả trong văn học", "Số lượng giải thưởng tác giả nhận được", "Mức độ nổi tiếng trên truyền hình", "Đánh giá phải công bằng, có dẫn chứng từ tác phẩm chứ không ca ngợi chung chung."],
    ["Nếu giới thiệu Nguyễn Du, tác phẩm nào không thể bỏ qua?", "“Truyện Kiều”, kiệt tác thơ Nôm của dân tộc", "“Bài ca ngất ngưởng” của Nguyễn Công Trứ", "“Lục Vân Tiên” của Nguyễn Đình Chiểu", "Cùng với Truyện Kiều, cần nhắc thơ chữ Hán và tấm lòng nhân đạo của đại thi hào."],
    ["Nếu giới thiệu Nam Cao, nét phong cách nào cần nhấn mạnh?", "Hiện thực, nhân đạo, đào sâu nội tâm người nghèo", "Lãng mạn, bay bổng, thoát li hiện thực", "Hài hước, châm biếm là chủ đạo", "Nam Cao là bậc thầy truyện ngắn hiện thực với các tác phẩm “Chí Phèo”, “Lão Hạc”, “Đời thừa”."],
    ["Phần mở đầu bài giới thiệu tác giả nên làm gì?", "Gây ấn tượng, nêu lí do chọn và giới thiệu khái quát tác giả", "Kể ngay toàn bộ tiểu sử chi tiết của tác giả", "Đọc danh sách tài liệu tham khảo trước", "Mở đầu có thể bằng một câu thơ, một nhận định nổi tiếng về tác giả để cuốn hút người nghe."],
    ["Sơ đồ, hình ảnh khi thuyết trình về tác giả có vai trò gì?", "Trực quan hoá tiểu sử, sự nghiệp, giúp người nghe dễ nhớ", "Chỉ để trang trí cho bài thuyết trình", "Thay thế hoàn toàn lời thuyết trình", "Dòng thời gian cuộc đời tác giả là công cụ trình bày rất hiệu quả trong chuyên đề này."],
    ["Viết về tác giả cần tránh lỗi nào khi dùng tư liệu?", "Bịa chi tiết đời tư, chép nguyên văn mà không ghi nguồn", "Trích dẫn ngắn và ghi nguồn đầy đủ", "Nêu cảm nhận riêng của bản thân", "Trung thực học thuật là phẩm chất cốt lõi khi nghiên cứu và giới thiệu văn học."],
    ["“Đọc” trong chuyên đề 3 khác đọc thông thường ở điểm nào?", "Đọc có mục đích nghiên cứu: ghi chép, phân tích, so sánh", "Đọc càng nhanh càng tốt để lấy số lượng", "Chỉ đọc phần tóm tắt tác phẩm", "Đọc sâu một tác giả giúp hình thành thói quen đọc văn học nghiêm túc, lâu dài."],
    ["Kết bài giới thiệu tác giả nên làm gì?", "Khẳng định giá trị, đóng góp và gợi mở hứng thú đọc tác phẩm", "Lặp lại nguyên văn phần mở đầu", "Kể thêm một chuyện không liên quan", "Kết bài tốt để lại ấn tượng và thôi thúc người nghe tìm đọc tác phẩm của tác giả."],
    ["Làm việc nhóm khi thực hiện chuyên đề 3 cần lưu ý gì?", "Phân công tìm tư liệu, viết và thuyết trình rõ ràng", "Để một người làm thay cả nhóm", "Không cần họp nhóm trước khi trình bày", "Sản phẩm nhóm tốt là kết quả của phối hợp và góp ý qua lại giữa các thành viên."],
    ["Tiêu chí đánh giá một bài giới thiệu tác giả là gì?", "Nội dung đúng, sâu; trình bày hấp dẫn; tư liệu tin cậy", "Chỉ cần trình bày thật dài", "Chỉ cần nhiều hình ảnh đẹp mắt", "Người nghe hiểu và nhớ được chân dung tác giả là thước đo thành công của bài giới thiệu."],
    ["Vì sao học sinh nên tập giới thiệu một tác giả yêu thích?", "Rèn đọc sâu, viết, nói và bồi dưỡng tình yêu văn học", "Để đạt điểm cao duy nhất một lần", "Để học thuộc lòng cho kì thi", "Chuyên đề khép lại chương trình Ngữ văn 11 bằng hoạt động trải nghiệm văn học thiết thực."],
    ["Khi trả lời câu hỏi sau thuyết trình, nên làm gì?", "Lắng nghe, trả lời đúng trọng tâm, thừa nhận điều chưa rõ", "Trả lời qua loa cho xong chuyện", "Tránh né mọi câu hỏi của người nghe", "Phần hỏi – đáp giúp làm rõ và đào sâu thêm hiểu biết về tác giả được giới thiệu."],
    ["Sản phẩm cuối cùng của chuyên đề 3 thường là gì?", "Bài viết và buổi thuyết trình giới thiệu một tác giả văn học", "Một bài kiểm tra trắc nghiệm ngắn", "Một vở kịch do học sinh tự đóng", "Sản phẩm là dịp học sinh vận dụng tổng hợp kĩ năng đọc, viết, nói và nghe của cả năm học."]
  ];
  var nv11cd3P = [["Phong cách sáng tác", "Nét riêng ổn định của tác giả"], ["Tiểu sử tác giả", "Cuộc đời và thời đại của nhà văn"], ["Sự nghiệp văn học", "Hành trình sáng tác của tác giả"], ["Tác phẩm tiêu biểu", "Tác phẩm nổi bật nhất của tác giả"], ["Thuyết trình giới thiệu", "Trình bày về một tác giả"], ["Tư liệu tin cậy", "Sách nghiên cứu, tác phẩm gốc"], ["Đóng góp văn học", "Giá trị tác giả để lại cho văn học"]];

  var NV11 = [
    TP("nv11-b1", "📖", "Bài 1: Câu chuyện và điểm nhìn trong truyện kể", "Vợ nhặt (Kim Lân) • Chí Phèo (Nam Cao) • Ngôn ngữ nói và ngôn ngữ viết", KP(nv11b1F, nv11b1P), KN(nv11b1F, nv11b1P, "Ngữ văn")),
    TP("nv11-b2", "🌊", "Bài 2: Cấu tứ và hình ảnh trong thơ trữ tình", "Nhớ đồng (Tố Hữu) • Tràng giang (Huy Cận) • Con đường mùa đông (Pu-skin)", KP(nv11b2F, nv11b2P), KN(nv11b2F, nv11b2P, "Ngữ văn")),
    TP("nv11-b3", "🗣️", "Bài 3: Cấu trúc của văn bản nghị luận", "Chiếu cầu hiền (Ngô Thì Nhậm) • Tôi có một ước mơ (M. L. King) • Một thời đại trong thi ca (Hoài Thanh)", KP(nv11b3F, nv11b3P), KN(nv11b3F, nv11b3P, "Ngữ văn")),
    TP("nv11-b4", "🛶", "Bài 4: Tự sự trong truyện thơ dân gian và thơ trữ tình", "Lời tiễn dặn • Dương phụ hành (Cao Bá Quát) • Thuyền và biển (Xuân Quỳnh) • Lỗi thành phần câu", KP(nv11b4F, nv11b4P), KN(nv11b4F, nv11b4P, "Ngữ văn")),
    TP("nv11-b5", "🎭", "Bài 5: Nhân vật và xung đột trong bi kịch", "Hamlet (Shakespeare) • Vĩnh biệt Cửu Trùng Đài (Nguyễn Huy Tưởng) • Prô-mê-tê bị xiềng", KP(nv11b5F, nv11b5P), KN(nv11b5F, nv11b5P, "Ngữ văn")),
    TP("nv11-b6", "🌸", "Bài 6: Nguyễn Du — “Những điều trông thấy mà đau đớn lòng”", "Trao duyên • Độc Tiểu Thanh kí • Chí khí anh hùng • Tu từ lặp cấu trúc, đối", KP(nv11b6F, nv11b6P), KN(nv11b6F, nv11b6P, "Ngữ văn")),
    TP("nv11-b7", "🖋️", "Bài 7: Ghi chép và tưởng tượng trong kí", "Ai đã đặt tên cho dòng sông? (Hoàng Phủ Ngọc Tường) • Cà Mau quê xứ (Trần Tuấn)", KP(nv11b7F, nv11b7P), KN(nv11b7F, nv11b7P, "Ngữ văn")),
    TP("nv11-b8", "📰", "Bài 8: Cấu trúc của văn bản thông tin", "Nữ phóng viên đầu tiên (Trần Nhật Vy) • Trí thông minh nhân tạo • Paralympic • Phương tiện phi ngôn ngữ", KP(nv11b8F, nv11b8P), KN(nv11b8F, nv11b8P, "Ngữ văn")),
    TP("nv11-b9", "⚖️", "Bài 9: Lựa chọn và hành động", "Bài ca ngất ngưởng (Nguyễn Công Trứ) • Văn tế nghĩa sĩ Cần Giuộc (Nguyễn Đình Chiểu) • Cộng đồng và cá thể (Einstein)", KP(nv11b9F, nv11b9P), KN(nv11b9F, nv11b9P, "Ngữ văn")),
    TP("nv11-cd1", "🔍", "Chuyên đề 1: Nghiên cứu và viết báo cáo về văn học trung đại Việt Nam", "Chuyên đề Ngữ văn • Phương pháp nghiên cứu, viết báo cáo về một vấn đề văn học trung đại", KP(nv11cd1F, nv11cd1P), KN(nv11cd1F, nv11cd1P, "Ngữ văn")),
    TP("nv11-cd2", "💬", "Chuyên đề 2: Ngôn ngữ trong đời sống xã hội hiện đại", "Chuyên đề Ngữ văn • Bản chất xã hội – văn hoá của ngôn ngữ, sự phát triển của ngôn ngữ", KP(nv11cd2F, nv11cd2P), KN(nv11cd2F, nv11cd2P, "Ngữ văn")),
    TP("nv11-cd3", "✍️", "Chuyên đề 3: Đọc, viết và giới thiệu về một tác giả văn học", "Chuyên đề Ngữ văn • Đọc – viết – thuyết trình giới thiệu một tác giả văn học", KP(nv11cd3F, nv11cd3P), KN(nv11cd3F, nv11cd3P, "Ngữ văn"))
  ];
  /* ==================================================================
     TIẾNG ANH 11 — Global Success
     words = [từ, hình, nghĩa]; patterns = mẫu câu ngữ pháp; gfacts = sự kiện ngữ pháp
     ================================================================== */
  /* B6-T9: khử nhiễm chữ cái cho Lớp 6–12 (xem eng10NoLetter ở lop10.js). */
  function eng11NoLetter(base) {
    function has(f, name) { return String(f).indexOf(name) !== -1; }
    return {
      choose: base.choose.filter(function (f) { return !has(f, "qEngFirstLetter"); }),
      blank: base.blank.filter(function (f) { return !has(f, "qEngBlankLetter"); }),
      match: base.match.filter(function (f) { return f !== mEngLetterWord && !has(f, "mEngLetterWord"); }),
      games: base.games.filter(function (f) { return f !== gSortLetters && !has(f, "gSortLetters"); })
    };
  }
  function eng11Pools(u, gfacts) {
    var base = eng11NoLetter(engPools(u.words));
    function patGen() {
      var pat = pick(u.patterns);
      var all = shuffle(pat.w.slice());
      return { prompt: pat.q, visual: "", options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: all.indexOf(pat.a), cols: all.length, optStack: true };
    }
    function patBlank() {
      var pat = pick(u.patterns);
      var all = shuffle(pat.w.slice());
      return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền từ còn thiếu để hoàn thành câu!", blankText: pat.a,
        visual: '<div class="sentence">' + pat.q.replace("…", blankSlot()) + "</div>",
        options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: all.indexOf(pat.a), cols: all.length, optStack: true };
    }
    var choose = base.choose.slice();
    var blank = base.blank.slice();
    if (u.patterns && u.patterns.length) { choose.push(patGen, patGen); blank.push(patBlank); }
    (gfacts || []).forEach(function (f) {
      choose.push(function () { return factMCQ(f); });
      blank.push(function () { return factBlank(f); });
    });
    return { choose: choose, blank: blank, match: base.match, games: base.games };
  }
  function eng11Topic(u, gfacts, sub) {
    var pairs = u.words.slice(0, 12).map(function (w) { return [w[0], w[2]]; });
    return TP("g11-u" + u.n, "🇬🇧", "Unit " + u.n + ": " + u.title, sub, eng11Pools(u, gfacts),
      KN(gfacts, pairs, "Tiếng Anh", { words: u.words }));
  }
  var U11_1 = { n: 1, title: "A Long and Healthy Life", words: [["life expectancy", "🎂", "tuổi thọ"], ["healthy diet", "🥗", "chế độ ăn lành mạnh"], ["regular exercise", "🏃", "tập thể dục đều đặn"], ["balanced diet", "⚖️", "chế độ ăn cân bằng"], ["muscle", "💪", "cơ bắp"], ["workout", "🏋️", "buổi tập luyện"], ["nutrient", "🥦", "chất dinh dưỡng"], ["disease", "🦠", "bệnh tật"], ["treatment", "💊", "sự điều trị"], ["virus", "🧫", "vi-rút"], ["bacteria", "🔬", "vi khuẩn"], ["strength training", "🏅", "tập luyện sức mạnh"], ["avoid", "🚫", "tránh"], ["sleep well", "😴", "ngủ ngon"], ["check-up", "🩺", "khám sức khoẻ định kỳ"], ["reduce stress", "🧘", "giảm căng thẳng"]],
    patterns: [{ q: "She … a healthy diet since 2020.", a: "has followed", w: ["has followed", "followed", "follow"] }, { q: "They … their last check-up two weeks ago.", a: "had", w: ["had", "have had", "has had"] }, { q: "I … never tried strength training before.", a: "have", w: ["have", "did", "has"] }] };
  var G11_1 = [
    ["Present perfect is used for…?", "Actions started in the past and continuing to now", "Actions finished at an exact past time", "Future plans only", "Signal words: since, for, ever, never, already, yet, just. E.g. She has exercised since 2022."],
    ["Past simple is used for…?", "Completed actions at a specific past time", "Actions still happening now", "Actions started in the past and unfinished", "Signal words: yesterday, last week, two days ago, in 2010."],
    ["Which time word goes with the present perfect?", "Since 2020 (since + a point in time)", "Yesterday", "Two weeks ago", "Since + mốc thời gian; for + khoảng thời gian: for three years."],
    ["Which time word goes with the past simple?", "Last month (last + time expression)", "Since last month", "For many years until now", "“Ago” and “last…” mark finished past time, not present perfect."],
    ["Which sentence is correct?", "She has exercised regularly since 2022.", "She has exercised regularly yesterday.", "She have exercised regularly since 2022.", "Has + V3, and no finished-time word like yesterday."],
    ["The past participle of “take” is…?", "Taken (take – took – taken)", "Took", "Taking", "Irregular verbs: eat – ate – eaten; go – went – gone."],
    ["“Have you … a health check-up?” — the missing word is…?", "Ever (Have you ever…?)", "Yesterday", "Ago", "“Ever” is common in present-perfect questions about experience."]
  ];
  var U11_2 = { n: 2, title: "The Generation Gap", words: [["generation gap", "👨‍👩‍👧", "khoảng cách thế hệ"], ["curious", "🧐", "tò mò"], ["argument", "🗣️", "cuộc tranh cãi"], ["disagreement", "⚡", "sự bất đồng"], ["screen time", "📱", "thời gian dùng màn hình"], ["social media", "💬", "mạng xã hội"], ["value", "💎", "giá trị, quan niệm"], ["traditional", "🏮", "truyền thống"], ["experience", "🧭", "kinh nghiệm"], ["freedom", "🕊️", "sự tự do"], ["permission", "✅", "sự cho phép"], ["advice", "💡", "lời khuyên"], ["respect", "🙏", "sự tôn trọng"], ["behaviour", "🎭", "hành vi"], ["complain", "😤", "phàn nàn"], ["independent", "🦅", "độc lập, tự lập"]],
    patterns: [{ q: "Students … wear uniforms at this school. It's a strict rule.", a: "must", w: ["must", "don't have to", "shouldn't"] }, { q: "You … stay up too late the night before an exam.", a: "shouldn't", w: ["shouldn't", "must", "have to"] }, { q: "He … get his parents' permission before the trip.", a: "has to", w: ["has to", "mustn't", "don't have to"] }] };
  var G11_2 = [
    ["“Must” expresses…?", "Strong obligation, often from the speaker", "No necessity at all", "A gentle suggestion only", "E.g. You must respect your grandparents. Must + bare infinitive."],
    ["“Have to” expresses…?", "Obligation from outside rules or circumstances", "Prohibition", "Ability in the past", "E.g. Students have to wear uniforms — it is the school rule."],
    ["“Mustn't” means…?", "Prohibited: you are not allowed to do it", "It is not necessary to do it", "It is a good idea to do it", "Mustn't (cấm) khác don't have to (không cần)."],
    ["“Don't have to” means…?", "No necessity: it is not necessary to do it", "It is forbidden to do it", "It is compulsory to do it", "E.g. You don't have to come early — đến sớm cũng được, không bắt buộc."],
    ["“Should” is used for…?", "Giving advice or recommendations", "Strict laws and rules", "Finished past actions", "E.g. Teenagers should listen to their parents' advice."],
    ["Which sentence is correct?", "You should listen to your parents' advice.", "You should to listen to your parents' advice.", "You should listens to your parents' advice.", "Modal verb + bare infinitive: should listen, must go, have to study."],
    ["After modal verbs (must, should), we use…?", "The bare infinitive (must go, should study)", "The to-infinitive", "The -ing form", "He/She/It does not change the modal: she must go (not musts)."]
  ];
  var U11_3 = { n: 3, title: "Cities of the Future", words: [["smart city", "🏙️", "thành phố thông minh"], ["sensor", "📡", "cảm biến"], ["sustainable", "♻️", "bền vững"], ["renewable energy", "🔋", "năng lượng tái tạo"], ["high-rise building", "🏢", "toà nhà cao tầng"], ["public transport", "🚌", "giao thông công cộng"], ["infrastructure", "🛣️", "cơ sở hạ tầng"], ["pedestrian", "🚶", "người đi bộ"], ["traffic jam", "🚗", "ùn tắc giao thông"], ["urban", "🌆", "thuộc đô thị"], ["efficient", "⚡", "hiệu quả"], ["predict", "🔮", "dự đoán"], ["city dweller", "🧑", "cư dân thành phố"], ["livable", "🌳", "đáng sống"], ["automated", "🤖", "tự động hoá"], ["green space", "🌿", "không gian xanh"]],
    patterns: [{ q: "The city … greener after the new parks opened.", a: "looks", w: ["looks", "look at", "looking"] }, { q: "This soup … delicious with fresh herbs.", a: "tastes", w: ["tastes", "is tasting at people", "taste them"] }, { q: "I … of moving to a smart city next year.", a: "am thinking", w: ["am thinking", "thinks", "thinked"] }] };
  var G11_3 = [
    ["Stative verbs describe…?", "States, feelings and opinions, not actions", "Actions in progress right now", "Completed past events", "Stative verbs: know, believe, love, own, seem, understand."],
    ["Which group contains only stative verbs?", "Know, believe, love, own, seem", "Run, build, collect, drive", "Watch, listen, play, cook", "Động từ trạng thái thường không dùng ở thì tiếp diễn."],
    ["Linking verbs connect the subject to…?", "A description (be, seem, look, taste, smell)", "An object that receives an action", "Another main verb only", "E.g. The city looks modern. The soup tastes good."],
    ["After a linking verb we usually use…?", "An adjective, not an adverb (She looks happy)", "An adverb (She looks happily)", "A past participle only", "Look/feel/seem/smell/taste + tính từ."],
    ["Some stative verbs can be continuous when…?", "The meaning changes to a dynamic action", "The sentence is about the past", "The subject is plural", "E.g. I am thinking of moving (= đang cân nhắc), khác I think that… (= tôi cho rằng)."],
    ["Which sentence is correct?", "The flowers smell wonderful in spring.", "The flowers are smelling wonderful in spring now-state.", "The flowers smells wonderful in spring.", "Smell as a linking verb (trạng thái) không dùng tiếp diễn."],
    ["“Feel” as a linking verb describes…?", "How someone or something is (I feel tired)", "An action of touching an object", "A plan for the future", "Feel + adjective: feel tired/happy/confident."]
  ];
  var U11_4 = { n: 4, title: "ASEAN and Viet Nam", words: [["ASEAN", "🌏", "Hiệp hội các quốc gia Đông Nam Á"], ["member state", "🗺️", "quốc gia thành viên"], ["cooperation", "🤝", "sự hợp tác"], ["culture", "🎎", "văn hoá"], ["exchange", "🔁", "sự trao đổi"], ["promote", "📣", "thúc đẩy"], ["peace", "🕊️", "hoà bình"], ["stability", "⚖️", "sự ổn định"], ["economic growth", "📈", "tăng trưởng kinh tế"], ["community", "🏘️", "cộng đồng"], ["charter", "📜", "hiến chương"], ["conference", "🎤", "hội nghị"], ["propose", "✋", "đề xuất"], ["represent", "🧑‍💼", "đại diện"], ["cultural identity", "🎭", "bản sắc văn hoá"], ["relation", "🔗", "mối quan hệ"]],
    patterns: [{ q: "… ASEAN helps Viet Nam share its culture with the region.", a: "Joining", w: ["Joining", "Join yesterday", "To joining"] }, { q: "Viet Nam enjoys … part in ASEAN activities.", a: "taking", w: ["taking", "take", "to take"] }, { q: "They suggested … a cultural exchange for students.", a: "organizing", w: ["organizing", "organize", "to organizing"] }] };
  var G11_4 = [
    ["A gerund is…?", "Verb + -ing used as a noun (Swimming is fun)", "Verb + -ed used as an adjective", "To + verb used as a command", "Gerund (danh động từ) làm chủ ngữ, tân ngữ hoặc sau giới từ."],
    ["A gerund as subject goes…?", "At the start of a sentence (Learning is useful)", "Only after the main verb", "Only in questions", "E.g. Joining ASEAN brought Viet Nam many opportunities."],
    ["After prepositions (in, at, of, about), we use…?", "The gerund (interested in learning)", "The to-infinitive", "The bare infinitive", "Be good at singing; look forward to meeting you."],
    ["After enjoy, avoid and suggest, we use…?", "The gerund (suggest holding a meeting)", "The to-infinitive", "The past simple form", "Enjoy/avoid/suggest/finish/mind + V-ing."],
    ["Which sentence is correct?", "Travelling around ASEAN broadens our minds.", "Travelling around ASEAN broaden our minds.", "Travel around ASEAN broadens our minds yesterday.", "Gerund làm chủ ngữ số ít → động từ chia số ít (broadens)."],
    ["In “She is good at singing”, “singing” is…?", "A gerund after a preposition (at)", "A present continuous verb", "A past participle", "Sau giới từ at luôn dùng V-ing."],
    ["After want, decide and hope, we use…?", "To-infinitive, not gerund (want to join)", "Gerund only", "Past participle only", "Phân biệt: want/decide/hope + to V; enjoy/suggest + V-ing."]
  ];
  var U11_5 = { n: 5, title: "Global Warming", words: [["global warming", "🌡️", "sự nóng lên toàn cầu"], ["greenhouse gas", "🏭", "khí nhà kính"], ["carbon dioxide", "💨", "khí carbon dioxide"], ["emission", "🌫️", "lượng khí thải"], ["fossil fuel", "⛽", "nhiên liệu hoá thạch"], ["deforestation", "🪓", "nạn phá rừng"], ["sea level", "🌊", "mực nước biển"], ["drought", "🏜️", "hạn hán"], ["flood", "🏠", "lũ lụt"], ["melt", "🧊", "tan chảy"], ["consequence", "⚠️", "hậu quả"], ["renewable", "🔄", "có thể tái tạo"], ["capture", "🫙", "thu giữ (khí)"], ["release", "🎈", "thải ra"], ["climate change", "🌍", "biến đổi khí hậu"], ["atmosphere", "☁️", "khí quyển"]],
    patterns: [{ q: "… by global warming, many glaciers are melting fast.", a: "Caused", w: ["Caused", "Causing people", "Cause"] }, { q: "… fossil fuels, factories release huge amounts of CO₂.", a: "Burning", w: ["Burning", "Burned by", "Burn"] }, { q: "… in direct sunlight, ice melts much faster.", a: "Placed", w: ["Placed", "Placing people", "Place"] }] };
  var G11_5 = [
    ["A present participle clause uses…?", "V-ing, with an active meaning", "V3, with a passive meaning", "To + V, with a future meaning", "E.g. Burning coal pollutes the air — chủ ngữ chủ động đốt than."],
    ["A past participle clause uses…?", "V3, with a passive meaning", "V-ing, with an active meaning", "The bare infinitive", "E.g. Caused by emissions, warming is getting worse — warming bị gây ra."],
    ["Participle clauses can replace…?", "Relative or adverbial clauses, to shorten sentences", "The main verb of a sentence", "Nouns in a sentence", "Mệnh đề phân từ giúp câu ngắn gọn, trang trọng hơn."],
    ["In a participle clause, the two clauses must…?", "Share the same subject", "Have two different subjects", "Use two different tenses", "E.g. Walking home (I), I saw… — cùng chủ ngữ I."],
    ["Which sentence has a present participle clause?", "Walking to school, I save fuel and money.", "Walked to school, I save fuel and money.", "To walking to school, I save fuel and money.", "Walking = V-ing, nghĩa chủ động."],
    ["Which sentence has a past participle clause?", "Built in 2020, the plant uses solar power.", "Building in 2020, the plant uses solar power.", "Build in 2020, the plant uses solar power.", "Built = V3, nghĩa bị động: nhà máy được xây năm 2020."],
    ["A participle clause can show…?", "Reason, time or result", "Only possession", "Only future plans", "E.g. Being ill (reason), he stayed at home."]
  ];
  var U11_6 = { n: 6, title: "Preserving Our Heritage", words: [["heritage", "🏛️", "di sản"], ["preserve", "🛡️", "bảo tồn"], ["ancient", "🗿", "cổ xưa"], ["monument", "🗽", "tượng đài"], ["temple", "🛕", "ngôi đền"], ["citadel", "🏯", "thành cổ"], ["folk song", "🎶", "dân ca"], ["traditional craft", "🧺", "nghề thủ công truyền thống"], ["restore", "🔧", "khôi phục"], ["damage", "💥", "gây hư hại"], ["promote", "📣", "quảng bá"], ["recognise", "🏅", "công nhận"], ["landscape", "🏞️", "phong cảnh"], ["historical", "📚", "thuộc lịch sử"], ["tourism", "🧳", "du lịch"], ["festival", "🎉", "lễ hội"]],
    patterns: [{ q: "Ha Long Bay is the most beautiful place … in Viet Nam.", a: "to visit", w: ["to visit", "visit", "visiting"] }, { q: "We have a lot of work … to protect the old temple.", a: "to do", w: ["to do", "do", "doing"] }, { q: "This is the best way … our cultural heritage.", a: "to preserve", w: ["to preserve", "preserve", "preserving"] }] };
  var G11_6 = [
    ["A to-infinitive clause often follows…?", "The first, the last, the only + noun", "A past simple verb only", "A preposition only", "E.g. the first student to visit the citadel; the only song to sing."],
    ["The basic pattern is…?", "Noun + to-infinitive (a place to visit)", "Noun + V-ing always", "Noun + past participle always", "A book to read; something to see; a house to rent."],
    ["Which sentence is correct?", "Hue is a great city to explore on foot.", "Hue is a great city explore on foot.", "Hue is a great city exploring on foot now.", "Danh từ city + to explore — mệnh đề to-infinitive bổ nghĩa cho danh từ."],
    ["A to-infinitive can also show…?", "Purpose (We work to preserve heritage)", "A finished past habit only", "Possession", "Phân biệt: ở Unit 6, to-infinitive chủ yếu bổ nghĩa cho danh từ đứng trước."],
    ["After “something / anything / nothing”, we use…?", "To-infinitive (something to see)", "The past simple form", "An adjective only", "E.g. There is nothing to do at the site today."],
    ["A to-infinitive clause can replace…?", "A relative clause (the first man to arrive)", "A conditional clause", "A reported question", "The first man to arrive = the first man who arrived."],
    ["“A book to read” means…?", "A book that can or should be read", "A book that is reading now", "A book read yesterday only", "Nghĩa bị động/ngụ ý: sách để đọc."]
  ];
  var U11_7 = { n: 7, title: "Education Options for School-Leavers", words: [["vocational school", "🛠️", "trường nghề"], ["apprenticeship", "🧑‍🔧", "sự học nghề"], ["qualification", "🎓", "bằng cấp"], ["university degree", "📜", "bằng đại học"], ["entrance exam", "📝", "kỳ thi đầu vào"], ["school-leaver", "🧑‍🎓", "học sinh vừa tốt nghiệp"], ["option", "🔀", "lựa chọn"], ["career", "💼", "sự nghiệp"], ["practical skill", "🙌", "kỹ năng thực hành"], ["institution", "🏫", "cơ sở đào tạo"], ["scholarship", "💰", "học bổng"], ["course", "📚", "khoá học"], ["brochure", "📰", "tờ rơi giới thiệu"], ["campus", "🌳", "khuôn viên trường"], ["graduate", "🎉", "tốt nghiệp"], ["mechanic", "🔩", "thợ cơ khí"]],
    patterns: [{ q: "… his mistake, he apologised to the teacher.", a: "Having admitted", w: ["Having admitted", "Admit", "Admits"] }, { q: "She denied … my calculator without asking.", a: "having taken", w: ["having taken", "take", "to take"] }, { q: "… the course, she found a good job in the city.", a: "Having finished", w: ["Having finished", "Finish", "Finishes"] }] };
  var G11_7 = [
    ["The perfect gerund is formed with…?", "Having + past participle (having done)", "Have + verb-ing only", "To have + verb only in questions", "Perfect gerund: having done, having finished, having taken."],
    ["The perfect gerund is used for…?", "An action completed before another past action", "An action happening right now", "A future plan only", "Nó nhấn mạnh hành động xảy ra TRƯỚC hành động còn lại."],
    ["A perfect gerund can follow verbs like…?", "Deny, admit and regret", "Want, hope and decide", "Can, must and should", "E.g. He denied having taken the money; she regretted having left."],
    ["A perfect participle clause is formed with…?", "Having + V3 at the start of a clause", "V-ing only, with no time order", "To + V at the end of a clause", "E.g. Having read the brochure, Mai applied for the course."],
    ["A perfect participle clause emphasises…?", "Completion before the main action", "A repeated daily habit", "A future possibility", "Having finished school (trước), he looked for a job (sau)."],
    ["Which sentence is correct?", "Having read the brochure, Mai applied.", "Having read the brochure, Mai apply yesterday-now.", "Have read the brochure, Mai applied.", "Having + V3, hai mệnh đề cùng chủ ngữ Mai."],
    ["In “He regretted having left school early”, “having left” is…?", "A perfect gerund", "A present participle clause", "A to-infinitive", "Sau động từ regretted, having left làm tân ngữ → perfect gerund."]
  ];
  var U11_8 = { n: 8, title: "Becoming Independent", words: [["self-reliant", "🦅", "tự lực"], ["life skill", "🧰", "kỹ năng sống"], ["manage money", "💵", "quản lý tiền bạc"], ["time management", "⏰", "quản lý thời gian"], ["decision", "🧭", "quyết định"], ["responsibility", "📋", "trách nhiệm"], ["confidence", "😎", "sự tự tin"], ["goal", "🎯", "mục tiêu"], ["household chore", "🧹", "việc nhà"], ["budget", "🧾", "ngân sách"], ["problem-solving", "🧩", "giải quyết vấn đề"], ["cope with", "🌧️", "đối phó với"], ["laundry", "🧺", "việc giặt giũ"], ["first aid", "🩹", "sơ cứu"], ["interpersonal skill", "🤝", "kỹ năng giao tiếp"], ["independent", "🏠", "độc lập, tự lập"]],
    patterns: [{ q: "It … Mai who taught herself to cook last year.", a: "was", w: ["was", "is", "are"] }, { q: "It is money management … teenagers need to learn early.", a: "that", w: ["that", "who people", "which thing"] }, { q: "It was last summer … he started living alone.", a: "that", w: ["that", "when", "who"] }] };
  var G11_8 = [
    ["A cleft sentence is used to…?", "Emphasise a part of the sentence", "Ask a yes/no question", "Report what someone said", "Cleft sentence (câu chẻ) nhấn mạnh chủ ngữ, tân ngữ hoặc trạng ngữ."],
    ["To emphasise the subject, we use…?", "It is/was + subject + who/that + verb", "It is/was + verb + subject + that", "Was it + subject + to + verb", "E.g. It was Mai who did the laundry (chính Mai, không phải ai khác)."],
    ["To emphasise the object, we use…?", "It is/was + object + that + subject + verb", "It is/was + object + who + verb only", "It was + subject + object + when", "E.g. It is life skills that teenagers need most."],
    ["To emphasise time or place, we use…?", "That (not when or where)", "When for time, where for place", "Who for both", "E.g. It was last summer that he moved out — vẫn dùng that."],
    ["Which sentence is a cleft sentence?", "It was Lan who won the scholarship.", "Lan won the scholarship last year.", "Did Lan win the scholarship?", "Câu chẻ bắt đầu bằng It is/was + phần nhấn mạnh + that/who."],
    ["The verb “be” in a cleft sentence…?", "Matches the tense of the original sentence", "Is always in the present simple", "Is always plural", "Quá khứ → It was…; hiện tại → It is…"],
    ["“Who” and “that” in cleft sentences…?", "Who for people, that for things and times", "Who for things, that for people only", "When for people, who for times", "It was my brother who…; It was the budget that…"]
  ];
  var U11_9 = { n: 9, title: "Social Issues", words: [["bullying", "🚫", "sự bắt nạt"], ["cyberbullying", "💻", "bắt nạt trên mạng"], ["poverty", "🏚️", "sự nghèo đói"], ["unemployment", "📉", "thất nghiệp"], ["crime", "🚔", "tội phạm"], ["alcohol", "🍺", "đồ uống có cồn"], ["awareness", "📣", "nhận thức"], ["campaign", "📢", "chiến dịch"], ["pressure", "😰", "áp lực"], ["victim", "🆘", "nạn nhân"], ["support", "🤲", "sự hỗ trợ"], ["solution", "💡", "giải pháp"], ["discrimination", "⚖️", "sự phân biệt đối xử"], ["teenager", "🧑", "thanh thiếu niên"], ["survey", "📊", "cuộc khảo sát"], ["protect", "🛡️", "bảo vệ"]],
    patterns: [{ q: "… the campaign was small, it helped many victims.", a: "Although", w: ["Although", "Because", "So that"] }, { q: "Bullying is very harmful; …, schools must act firmly.", a: "therefore", w: ["therefore", "however contrast", "although"] }, { q: "He told the teacher … he felt unsafe at school.", a: "because", w: ["because", "despite", "however"] }] };
  var G11_9 = [
    ["“However” is used to show…?", "Contrast between two ideas", "A result of an action", "An additional example", "However (tuy nhiên) nối hai ý đối lập, thường đứng đầu câu/mệnh đề."],
    ["“Therefore” is used to show…?", "Result or consequence", "Contrast between ideas", "A reason for an action", "Therefore (vì vậy) chỉ kết quả: …, therefore, schools must act."],
    ["“Besides” and “Moreover” are used to…?", "Add extra information or ideas", "Show a contrast", "Give a reason", "Besides/Moreover (hơn nữa) bổ sung thêm ý."],
    ["“In spite of” is followed by…?", "Noun / gerund, not a clause (in spite of the rain)", "A full clause with subject + verb", "To + verb", "In spite of/Despite + danh từ/V-ing; Although + mệnh đề."],
    ["“Because” and “because of” differ in that…?", "Because + clause; because of + noun/gerund", "Both are followed by clauses", "Both are followed by nouns", "Because he was ill…; because of his illness…"],
    ["Which sentence is correct?", "Although he was tired, he joined the campaign.", "Although he was tired, but he joined the campaign.", "Although of being tired, he joined the campaign.", "Đã có Although thì không dùng but nữa."],
    ["“Firstly”, “Secondly”, “Finally” are used to…?", "List points in order in a paragraph", "Show contrast between points", "End a letter politely", "Từ nối liệt kê giúp bài viết mạch lạc, rõ thứ tự ý."]
  ];
  var U11_10 = { n: 10, title: "The Ecosystem", words: [["ecosystem", "🌿", "hệ sinh thái"], ["food chain", "🔗", "chuỗi thức ăn"], ["rainforest", "🌴", "rừng mưa nhiệt đới"], ["wildlife", "🦒", "động vật hoang dã"], ["endangered species", "🐼", "loài nguy cấp"], ["habitat", "🌳", "môi trường sống"], ["climate change", "🌡️", "biến đổi khí hậu"], ["carbon footprint", "👣", "lượng khí thải carbon"], ["sea level", "🌊", "mực nước biển"], ["polar bear", "🐻‍❄️", "gấu Bắc Cực"], ["coral reef", "🪸", "rạn san hô"], ["national park", "🏞️", "vườn quốc gia"], ["greenhouse gas", "🏭", "khí nhà kính"], ["solar energy", "☀️", "năng lượng mặt trời"], ["water cycle", "💧", "vòng tuần hoàn nước"], ["air pollution", "🌫️", "ô nhiễm không khí"]],
    patterns: [{ q: "We saw a beautiful coral … during the boat trip.", a: "reef", w: ["reef", "rain", "chain"] }, { q: "Polar … live in the cold Arctic region.", a: "bears", w: ["bears", "bear", "bearing"] }, { q: "The food … shows how energy passes between species.", a: "chain", w: ["chain", "chains", "chaining"] }] };
  var G11_10 = [
    ["A compound noun is…?", "A noun made of two or more words (food chain)", "A verb made of two words", "An adjective with two meanings", "Compound noun (danh từ ghép): rainforest, food chain, polar bear."],
    ["In compound nouns, stress usually falls on…?", "The first part (RAINforest, FOOD chain)", "The last word always", "Both words equally always", "Trọng âm thường rơi vào thành phần đầu tiên."],
    ["The plural of a compound noun is usually made by…?", "Adding -s/-es to the last word (polar bears)", "Adding -s to the first word", "Changing every word", "National parks, coral reefs, greenhouse gases."],
    ["Which item is a compound noun?", "Greenhouse gas", "Very green", "Grows quickly", "Greenhouse (nhà kính) + gas (khí) → một danh từ ghép."],
    ["Compound nouns can be formed by…?", "Noun + noun, adjective + noun, V-ing + noun", "Verb + adverb only", "Pronoun + verb only", "E.g. noun+noun: sea level; adj+noun: wildlife (wild+life); V-ing+noun: swimming pool."],
    ["A compound noun has…?", "A single meaning as one unit", "Exactly the meanings of each word added", "No meaning of its own", "Blackboard (bảng đen trong lớp) khác a black board (tấm bảng màu đen)."],
    ["Which plural form is correct?", "National parks", "Nationals park", "National parkes only", "Thêm -s vào từ cuối cùng của danh từ ghép."]
  ];
  var ENG11 = [
    eng11Topic(U11_1, G11_1, "Từ vựng chủ đề sức khoẻ • Past simple vs. Present perfect"),
    eng11Topic(U11_2, G11_2, "Từ vựng khoảng cách thế hệ • Modal verbs: must, have to, should"),
    eng11Topic(U11_3, G11_3, "Từ vựng thành phố tương lai • Stative verbs & linking verbs"),
    eng11Topic(U11_4, G11_4, "Từ vựng ASEAN • Gerunds as subjects and objects"),
    eng11Topic(U11_5, G11_5, "Từ vựng nóng lên toàn cầu • Present & past participle clauses"),
    eng11Topic(U11_6, G11_6, "Từ vựng di sản • To-infinitive clauses"),
    eng11Topic(U11_7, G11_7, "Từ vựng lựa chọn sau tốt nghiệp • Perfect gerunds & perfect participle clauses"),
    eng11Topic(U11_8, G11_8, "Từ vựng tự lập • Cleft sentences"),
    eng11Topic(U11_9, G11_9, "Từ vựng vấn đề xã hội • Linking words and phrases"),
    eng11Topic(U11_10, G11_10, "Từ vựng hệ sinh thái • Compound nouns")
  ];
  /* ==================================================================
     VẬT LÍ 11 — Kết nối tri thức (lấy g = 10 m/s², k = 9·10⁹ khi tính)
     ================================================================== */
  var vl11c1F = [
    ["Dao động cơ là chuyển động thế nào?", "Qua lại quanh một vị trí cân bằng", "Thẳng đều theo một hướng mãi mãi", "Tròn đều quanh một tâm cố định", "Vị trí cân bằng là vị trí vật đứng yên khi không dao động."],
    ["Dao động tuần hoàn là dao động có đặc điểm gì?", "Lặp lại sau những khoảng thời gian bằng nhau", "Biên độ tăng dần theo thời gian", "Chỉ diễn ra đúng một lần rồi dừng", "Sau một chu kì, trạng thái dao động của vật lặp lại như cũ."],
    ["Dao động điều hoà là dao động mà li độ của vật là gì?", "Hàm cosin (hoặc sin) của thời gian", "Hàm bậc hai của thời gian", "Hằng số không đổi theo thời gian", "Phương trình dao động điều hoà: x = A·cos(ωt + φ)."],
    ["Trong phương trình x = A·cos(ωt + φ), A là đại lượng nào?", "Biên độ: độ lệch cực đại so với vị trí cân bằng", "Chu kì của dao động", "Pha ban đầu của dao động", "Biên độ A luôn dương, cho biết giới hạn chuyển động của vật."],
    ["Pha của dao động (ωt + φ) cho biết điều gì?", "Trạng thái dao động của vật tại thời điểm t", "Biên độ của dao động", "Khối lượng của vật dao động", "φ là pha ban đầu (pha tại t = 0); pha xác định li độ và chiều chuyển động."],
    ["Chu kì T của dao động là gì?", "Thời gian vật thực hiện một dao động toàn phần", "Số dao động trong một giây", "Thời gian vật đi từ biên này sang biên kia", "Đơn vị của chu kì là giây (s)."],
    ["Tần số f của dao động là gì?", "Số dao động toàn phần trong một giây", "Thời gian thực hiện một dao động", "Số dao động trong một phút", "Đơn vị của tần số là héc (Hz); f = 1/T."],
    ["Quan hệ giữa tần số f và chu kì T là gì?", "f = 1/T", "f = 2πT", "f = T²", "Chu kì càng nhỏ thì tần số càng lớn, dao động càng nhanh."],
    ["Tần số góc ω liên hệ với chu kì và tần số thế nào?", "ω = 2π/T = 2πf (đơn vị rad/s)", "ω = T/2π", "ω = f/T", "Tần số góc là tốc độ biến thiên của pha dao động."],
    ["Vận tốc của vật dao động điều hoà đạt cực đại khi nào?", "Khi vật qua vị trí cân bằng, v_max = Aω", "Khi vật ở vị trí biên", "Khi li độ bằng một nửa biên độ", "Ở vị trí biên vận tốc bằng 0; ở vị trí cân bằng vận tốc lớn nhất."],
    ["Gia tốc trong dao động điều hoà có đặc điểm gì?", "a = −ω²x, luôn hướng về vị trí cân bằng", "a = ω²x, luôn hướng ra xa vị trí cân bằng", "Luôn bằng 0 vì tốc độ góc không đổi", "Dấu trừ cho thấy gia tốc ngược chiều với li độ, luôn kéo vật về vị trí cân bằng."],
    ["Gia tốc của vật dao động điều hoà đạt độ lớn cực đại khi nào?", "Ở vị trí biên, a_max = Aω²", "Ở vị trí cân bằng", "Khi vận tốc đạt cực đại", "Ở vị trí cân bằng gia tốc bằng 0 vì li độ bằng 0."],
    ["Ở vị trí biên, vận tốc và gia tốc của vật dao động điều hoà thế nào?", "Vận tốc bằng 0, gia tốc có độ lớn cực đại", "Vận tốc cực đại, gia tốc bằng 0", "Cả vận tốc và gia tốc đều bằng 0", "Tại biên vật đổi chiều chuyển động nên vận tốc tức thời bằng 0."],
    ["Chu kì dao động của con lắc lò xo được tính thế nào?", "T = 2π√(m/k)", "T = 2π√(k/m)", "T = 2π√(l/g)", "m là khối lượng vật (kg), k là độ cứng lò xo (N/m)."],
    ["Chu kì dao động nhỏ của con lắc đơn được tính thế nào?", "T = 2π√(l/g)", "T = 2π√(g/l)", "T = 2π√(m/k)", "l là chiều dài dây (m), g là gia tốc trọng trường (m/s²)."],
    ["Khi tăng chiều dài dây của con lắc đơn thì chu kì của nó thay đổi thế nào?", "Chu kì tăng, con lắc dao động chậm lại", "Chu kì giảm, con lắc dao động nhanh hơn", "Chu kì không thay đổi", "Vì T tỉ lệ thuận với √l: dây dài gấp 4 thì chu kì tăng gấp 2."],
    ["Chu kì dao động nhỏ của con lắc đơn phụ thuộc vào những yếu tố nào?", "Chiều dài dây và gia tốc trọng trường g", "Khối lượng của vật nặng", "Biên độ góc của dao động", "Với dao động nhỏ, chu kì con lắc đơn không phụ thuộc khối lượng vật và biên độ."],
    ["Khi bỏ qua ma sát, cơ năng của con lắc lò xo dao động điều hoà thế nào?", "Không đổi: W = (1/2)kA²", "Tăng dần theo thời gian", "Giảm dần tới 0", "Động năng và thế năng chuyển hoá qua lại nhưng tổng của chúng không đổi."],
    ["Tại vị trí cân bằng của con lắc lò xo nằm ngang, năng lượng của hệ thế nào?", "Động năng cực đại, thế năng đàn hồi cực tiểu", "Động năng bằng 0, thế năng cực đại", "Động năng và thế năng đều bằng 0", "Tại hai vị trí biên thì ngược lại: động năng bằng 0, thế năng cực đại."],
    ["Dao động tắt dần có đặc điểm và nguyên nhân gì?", "Biên độ giảm dần do ma sát và lực cản môi trường", "Biên độ tăng dần do được truyền thêm năng lượng", "Chu kì tăng dần vô hạn", "Cơ năng của hệ giảm dần, chuyển hoá thành nhiệt do ma sát."],
    ["Bộ phận giảm xóc của ô tô, xe máy là ứng dụng của hiện tượng nào?", "Dao động tắt dần", "Hiện tượng cộng hưởng", "Dao động cưỡng bức duy trì", "Giảm xóc làm dao động của xe tắt nhanh, giúp xe chạy êm và an toàn."],
    ["Tần số của dao động cưỡng bức bằng đại lượng nào?", "Bằng tần số của ngoại lực cưỡng bức", "Luôn bằng tần số riêng của hệ", "Bằng trung bình tần số riêng và tần số ngoại lực", "Khi hệ đã ổn định, nó dao động theo tần số của lực cưỡng bức tác dụng."],
    ["Hiện tượng cộng hưởng xảy ra khi nào?", "Tần số ngoại lực bằng tần số riêng của hệ", "Tần số ngoại lực rất nhỏ so với tần số riêng", "Ngoại lực ngừng tác dụng lên hệ", "Khi cộng hưởng, biên độ dao động cưỡng bức đạt cực đại."],
    ["Hiện tượng cộng hưởng có thể gây ra tác hại nào?", "Làm cầu, nhà cửa rung mạnh tới hư hỏng, sập đổ", "Làm mọi dao động dừng lại ngay", "Không gây ảnh hưởng gì trong thực tế", "Cộng hưởng cũng có lợi: hộp đàn ghita, mạch chọn sóng của radio ứng dụng cộng hưởng."]
  ];
  var vl11c1P = [["Biên độ A", "Độ lệch cực đại khỏi vị trí cân bằng"], ["Chu kì T", "Đơn vị giây (s)"], ["Tần số f", "Đơn vị héc (Hz)"], ["Tần số góc ω", "Đơn vị rad/s"], ["Vận tốc cực đại", "v_max = Aω"], ["Gia tốc cực đại", "a_max = Aω²"], ["Chu kì con lắc đơn", "T = 2π√(l/g)"], ["Chu kì con lắc lò xo", "T = 2π√(m/k)"]];
  function vl11Osc() {
    var v = rand(0, 3);
    if (v === 0) { var A = pick([2, 4, 5, 10]), om = pick([2, 5, 10]); return numBlank6("Vật dao động điều hoà với biên độ " + A + " cm, tần số góc " + om + " rad/s. Vận tốc cực đại của vật bằng bao nhiêu cm/s?", "v_max = Aω = ?", A * om, "v_max = A·ω, đạt được khi vật qua vị trí cân bằng."); }
    if (v === 1) { var pr = pick([[18, 3], [20, 4], [24, 6], [30, 5], [28, 4]]); return numBlank6("Một vật thực hiện " + pr[0] + " dao động toàn phần trong " + pr[1] + " s. Tần số dao động của vật bằng bao nhiêu Hz?", "f = N/t = ?", pr[0] / pr[1], "f = số dao động / thời gian."); }
    if (v === 2) { var A2 = pick([2, 4, 5, 10]), om2 = pick([2, 5, 10]); return numBlank6("Vật dao động điều hoà với biên độ " + A2 + " cm, tần số góc " + om2 + " rad/s. Gia tốc cực đại của vật bằng bao nhiêu cm/s²?", "a_max = Aω² = ?", A2 * om2 * om2, "a_max = A·ω², đạt được ở vị trí biên."); }
    var tr = pick([[100, 1, 10], [100, 4, 5], [400, 1, 20], [160, 10, 4], [90, 10, 3], [250, 10, 5]]); return numBlank6("Con lắc lò xo có độ cứng " + tr[0] + " N/m, vật nặng " + tr[1] + " kg. Tần số góc của dao động bằng bao nhiêu rad/s?", "ω = √(k/m) = ?", tr[2], "ω = √(k/m) với k = " + tr[0] + " N/m, m = " + tr[1] + " kg.");
  }
  var vl11c2F = [
    ["Sóng cơ là gì?", "Dao động cơ lan truyền trong môi trường vật chất", "Dòng chảy của chất lỏng trong ống", "Chuyển động của một vật rắn trên mặt phẳng", "Sóng cơ không truyền được trong chân không vì cần môi trường vật chất."],
    ["Khi sóng cơ truyền đi, sóng truyền những gì?", "Năng lượng; các phần tử chỉ dao động tại chỗ", "Vật chất đi theo sóng tới nơi xa", "Khối lượng của nguồn sóng", "Các phần tử môi trường dao động quanh vị trí cân bằng, không dịch chuyển theo sóng."],
    ["Sóng ngang là sóng có đặc điểm gì?", "Phương dao động vuông góc phương truyền sóng", "Phương dao động trùng phương truyền sóng", "Các phần tử không dao động", "Ví dụ sóng ngang: sóng trên mặt nước, sóng trên sợi dây."],
    ["Sóng dọc là sóng có đặc điểm gì?", "Phương dao động trùng phương truyền sóng", "Phương dao động vuông góc phương truyền sóng", "Chỉ truyền được trên mặt nước", "Ví dụ sóng dọc: sóng âm, sóng trên lò xo khi nén – giãn."],
    ["Sóng ngang truyền được trong những môi trường nào?", "Chất rắn và trên bề mặt chất lỏng", "Chỉ trong chất khí", "Trong mọi môi trường kể cả chân không", "Sóng dọc truyền được trong cả rắn, lỏng và khí."],
    ["Sóng âm thuộc loại sóng nào và truyền được ở đâu?", "Sóng dọc, truyền trong rắn, lỏng và khí", "Sóng ngang, chỉ truyền trong chất rắn", "Sóng điện từ, truyền trong chân không", "Âm không truyền được trong chân không."],
    ["Bước sóng λ là gì?", "Quãng đường sóng truyền được trong một chu kì", "Khoảng cách từ nguồn tới điểm xa nhất", "Biên độ lớn nhất của sóng", "Bước sóng cũng là khoảng cách ngắn nhất giữa hai điểm dao động cùng pha."],
    ["Bước sóng liên hệ với tốc độ truyền sóng và tần số thế nào?", "λ = v/f = v·T", "λ = f/v", "λ = v·f", "Tần số sóng bằng tần số nguồn và không đổi khi sóng đổi môi trường."],
    ["Tốc độ truyền sóng cơ phụ thuộc vào yếu tố nào?", "Bản chất và tính chất của môi trường truyền", "Biên độ của sóng", "Tần số của nguồn phát sóng", "Khi sóng truyền sang môi trường khác, tốc độ và bước sóng đổi còn tần số giữ nguyên."],
    ["Sóng điện từ khác sóng cơ ở điểm cơ bản nào?", "Truyền được trong chân không với tốc độ c ≈ 3·10⁸ m/s", "Cần môi trường vật chất mới truyền được", "Chỉ truyền được trong kim loại", "Sóng điện từ là sự lan truyền của điện từ trường biến thiên."],
    ["Trong thang sóng điện từ, thứ tự bước sóng tăng dần là gì?", "Gamma, tia X, tử ngoại, ánh sáng, hồng ngoại, vô tuyến", "Vô tuyến, hồng ngoại, ánh sáng, tử ngoại, tia X, gamma", "Hồng ngoại, vô tuyến, gamma, tia X, ánh sáng, tử ngoại", "Bước sóng tăng thì tần số giảm vì c = λ·f không đổi trong chân không."],
    ["Loại sóng điện từ nào có bước sóng dài nhất, tần số nhỏ nhất?", "Sóng vô tuyến", "Tia gamma", "Tia X", "Sóng vô tuyến dùng trong phát thanh, truyền hình và thông tin liên lạc."],
    ["Điều kiện để hai nguồn sóng giao thoa được với nhau (nguồn kết hợp) là gì?", "Cùng tần số, cùng phương, hiệu số pha không đổi", "Hai nguồn bất kì đặt gần nhau", "Cùng biên độ nhưng tần số khác nhau", "Giao thoa là hiện tượng đặc trưng của sóng, khẳng định bản chất sóng."],
    ["Tại điểm cực đại giao thoa của hai sóng cùng pha, hiệu đường đi thoả mãn gì?", "Bằng số nguyên lần bước sóng: d₂ − d₁ = kλ", "Bằng số bán nguyên lần bước sóng", "Bằng 0 ở mọi điểm cực đại", "Tại cực đại, hai sóng tới cùng pha và tăng cường lẫn nhau."],
    ["Tại điểm cực tiểu giao thoa của hai sóng cùng pha, hiệu đường đi thoả mãn gì?", "Bằng số bán nguyên lần bước sóng: (k + 1/2)λ", "Bằng số nguyên lần bước sóng: kλ", "Bằng hai lần bước sóng", "Tại cực tiểu, hai sóng tới ngược pha và triệt tiêu lẫn nhau."],
    ["Sóng dừng là hiện tượng gì?", "Giao thoa sóng tới và sóng phản xạ, có nút và bụng cố định", "Sóng ngừng truyền trong môi trường", "Sóng có tốc độ truyền bằng 0", "Sóng dừng không truyền năng lượng đi xa như sóng chạy."],
    ["Nút sóng trong sóng dừng là điểm có đặc điểm gì?", "Luôn đứng yên, biên độ dao động bằng 0", "Dao động với biên độ cực đại", "Dao động với biên độ bằng một nửa bụng sóng", "Bụng sóng là điểm dao động với biên độ cực đại, xen kẽ với nút sóng."],
    ["Khoảng cách giữa hai nút sóng liên tiếp trong sóng dừng bằng bao nhiêu?", "Nửa bước sóng (λ/2)", "Một bước sóng (λ)", "Một phần tư bước sóng (λ/4)", "Khoảng cách nút – bụng kề nhau bằng λ/4; hai bụng liên tiếp cách nhau λ/2."],
    ["Điều kiện để có sóng dừng trên dây hai đầu cố định là gì?", "Chiều dài dây l = kλ/2 với k nguyên dương", "Chiều dài dây l = kλ với k nguyên dương", "Chiều dài dây bất kì cũng có sóng dừng", "Hai đầu cố định là hai nút sóng; số bụng sóng bằng k."],
    ["Hiện tượng sóng lệch khỏi phương truyền thẳng khi gặp khe hẹp gọi là gì?", "Nhiễu xạ sóng", "Phản xạ sóng", "Khúc xạ sóng", "Nhiễu xạ rõ rệt khi kích thước khe/vật cản cỡ bước sóng."],
    ["Trong bài thực hành đo tốc độ truyền âm, người ta dùng hiện tượng nào?", "Cộng hưởng sóng dừng trong cột khí", "Hiện tượng giao thoa ánh sáng", "Hiện tượng cảm ứng điện từ", "Từ chiều dài cột khí lúc cộng hưởng và tần số âm, suy ra tốc độ truyền âm."],
    ["Dao động kí dùng để đo tần số sóng âm bằng cách nào?", "Hiển thị đồ thị tín hiệu, đo chu kì rồi tính f = 1/T", "Đếm số lần loa rung bằng mắt thường", "Đo cường độ âm bằng thang chia sẵn", "Dao động kí biến tín hiệu âm (qua micro) thành đồ thị điện trên màn hình."]
  ];
  var vl11c2P = [["Sóng ngang", "Dao động vuông góc phương truyền"], ["Sóng dọc", "Dao động trùng phương truyền"], ["Bước sóng λ", "λ = v/f"], ["Sóng điện từ", "Truyền được trong chân không"], ["Cực đại giao thoa", "Hiệu đường đi bằng kλ"], ["Cực tiểu giao thoa", "Hiệu đường đi bằng (k + 1/2)λ"], ["Nút sóng dừng", "Biên độ bằng 0"], ["Bụng sóng dừng", "Biên độ cực đại"]];
  function vl11Wave() {
    var v = rand(0, 3);
    if (v === 0) { var tr = pick([[340, 170, 2], [340, 85, 4], [340, 68, 5], [340, 34, 10], [300, 60, 5], [240, 40, 6], [200, 25, 8]]); return numBlank6("Sóng truyền với tốc độ " + tr[0] + " m/s, tần số " + tr[1] + " Hz. Bước sóng bằng bao nhiêu mét?", "λ = v/f = ?", tr[2], "λ = v/f = " + tr[0] + "/" + tr[1] + " = " + tr[2] + " m."); }
    if (v === 1) { var lam = pick([2, 3, 4, 5, 6, 10]), f = pick([5, 10, 20, 50]); return numBlank6("Sóng có bước sóng " + lam + " m, tần số " + f + " Hz. Tốc độ truyền sóng bằng bao nhiêu m/s?", "v = λf = ?", lam * f, "v = λ·f."); }
    if (v === 2) { var lam2 = pick([4, 6, 8, 10, 12, 20]); return numBlank6("Trên dây có sóng dừng với bước sóng " + lam2 + " cm. Khoảng cách giữa hai nút sóng liên tiếp bằng bao nhiêu cm?", "d = λ/2 = ?", lam2 / 2, "Hai nút (hoặc hai bụng) liên tiếp cách nhau λ/2."); }
    var k = pick([1, 2, 3]), lam3 = pick([2, 4, 5, 10]); return numBlank6("Trong giao thoa sóng, tại một điểm cực đại bậc " + k + " (hai nguồn cùng pha) có bước sóng " + lam3 + " cm. Hiệu đường đi từ hai nguồn tới điểm đó bằng bao nhiêu cm?", "d₂ − d₁ = kλ = ?", k * lam3, "Cực đại giao thoa: hiệu đường đi bằng số nguyên lần bước sóng.");
  }
  var vl11c3F = [
    ["Định luật Coulomb cho độ lớn lực tương tác giữa hai điện tích điểm là gì?", "F = k|q₁q₂|/r²", "F = k|q₁q₂|·r²", "F = k|q₁ + q₂|/r", "Hai điện tích cùng dấu đẩy nhau, trái dấu hút nhau; lực tỉ lệ nghịch bình phương khoảng cách."],
    ["Hằng số điện k trong công thức Coulomb có giá trị bao nhiêu?", "k = 9·10⁹ N·m²/C²", "k = 9·10⁻⁹ N·m²/C²", "k = 6,67·10⁻¹¹ N·m²/C²", "k = 1/(4πε₀) với ε₀ là hằng số điện của chân không."],
    ["Khi khoảng cách giữa hai điện tích điểm tăng gấp đôi thì lực tương tác thay đổi thế nào?", "Giảm 4 lần", "Giảm 2 lần", "Tăng 2 lần", "Vì lực tỉ lệ nghịch với bình phương khoảng cách: r tăng 2 lần thì F giảm 4 lần."],
    ["Khi đưa hai điện tích vào điện môi đồng chất có hằng số điện môi ε, lực tương tác thế nào?", "Giảm ε lần so với trong chân không", "Tăng ε lần so với trong chân không", "Không thay đổi", "Trong điện môi: F = k|q₁q₂|/(εr²)."],
    ["Điện trường là gì?", "Dạng vật chất bao quanh điện tích, gây lực điện", "Vùng không gian chứa các electron tự do", "Dòng chuyển dời của các điện tích", "Điện tích đặt trong điện trường sẽ chịu lực điện tác dụng."],
    ["Cường độ điện trường tại một điểm được định nghĩa thế nào?", "E = F/q, đơn vị N/C hoặc V/m", "E = F·q, đơn vị N", "E = q/F, đơn vị C/N", "Vectơ E cùng chiều lực điện khi điện tích thử q dương, ngược chiều khi q âm."],
    ["Cường độ điện trường do điện tích điểm Q gây ra tại khoảng cách r là gì?", "E = k|Q|/r²", "E = k|Q|·r²", "E = k|Q|/r", "Độ lớn E tỉ lệ nghịch với bình phương khoảng cách tới điện tích."],
    ["Vectơ cường độ điện trường do điện tích dương Q gây ra có chiều thế nào?", "Hướng ra xa Q", "Hướng vào Q", "Vuông góc với đường nối tới Q", "Điện tích âm gây điện trường có vectơ E hướng vào nó."],
    ["Đường sức điện có tính chất nào sau đây?", "Không cắt nhau; ra từ (+), vào (−)", "Luôn cắt nhau tại điện tích", "Là đường cong kín khép kín", "Nơi đường sức mau thì điện trường mạnh, nơi thưa thì điện trường yếu."],
    ["Điện trường đều có đặc điểm gì?", "Đường sức song song, cách đều; E không đổi", "Đường sức là các đường tròn đồng tâm", "E tăng dần theo một chiều cố định", "Điện trường giữa hai bản kim loại phẳng song song tích điện trái dấu là điện trường đều."],
    ["Công của lực điện khi điện tích dịch chuyển trong điện trường có đặc điểm gì?", "Không phụ thuộc đường đi, chỉ điểm đầu và cuối", "Phụ thuộc vào hình dạng đường đi", "Luôn bằng 0 với mọi đường đi", "Tính chất này cho phép định nghĩa thế năng điện và điện thế."],
    ["Điện thế tại một điểm trong điện trường đặc trưng cho điều gì?", "Khả năng sinh công của điện trường tại điểm đó", "Độ mạnh yếu của lực điện tại điểm đó", "Số đường sức đi qua điểm đó", "Điện thế là đại lượng vô hướng, đơn vị là vôn (V)."],
    ["Công của lực điện khi điện tích q dịch chuyển giữa hai điểm có hiệu điện thế U là gì?", "A = q·U", "A = q/U", "A = U/q", "Hiệu điện thế U = A/q, đo bằng vôn kế mắc song song giữa hai điểm."],
    ["Trong điện trường đều, cường độ điện trường liên hệ với hiệu điện thế thế nào?", "E = U/d", "E = U·d", "E = d/U", "d là khoảng cách giữa hai điểm dọc theo đường sức (hình chiếu lên phương đường sức)."],
    ["Tụ điện có cấu tạo thế nào?", "Hai bản kim loại song song, giữa là lớp điện môi", "Một cuộn dây quấn quanh lõi sắt", "Hai điện cực nhúng trong dung dịch muối", "Tụ điện có khả năng tích và phóng điện trong mạch."],
    ["Điện dung của tụ điện được định nghĩa thế nào?", "C = Q/U, đơn vị là fara (F)", "C = U/Q, đơn vị là vôn", "C = Q·U, đơn vị là jun", "Điện dung đặc trưng cho khả năng tích điện của tụ ở một hiệu điện thế nhất định."],
    ["Điện dung của tụ điện phẳng phụ thuộc vào những yếu tố nào?", "Diện tích bản, khoảng cách hai bản và điện môi", "Hiệu điện thế đặt vào hai bản tụ", "Điện tích đang có trên bản tụ", "Tăng diện tích bản hoặc đưa điện môi vào thì điện dung tăng; tăng khoảng cách bản thì điện dung giảm."],
    ["Năng lượng của tụ điện đã tích điện được tính thế nào?", "W = (1/2)C·U²", "W = C·U", "W = (1/2)C²·U", "Cũng có thể viết W = (1/2)Q·U = Q²/(2C); năng lượng này dự trữ trong điện trường của tụ."],
    ["Khi ghép các tụ điện song song, điện dung của bộ tụ thế nào?", "C_b = C₁ + C₂ + …", "Nhỏ hơn điện dung mỗi tụ thành phần", "1/C_b = 1/C₁ + 1/C₂", "Ghép song song: các tụ có cùng hiệu điện thế, điện tích bộ bằng tổng điện tích các tụ."],
    ["Khi ghép các tụ điện nối tiếp, điện dung của bộ tụ thế nào?", "1/C_b = 1/C₁ + 1/C₂", "C_b = C₁ + C₂", "C_b = C₁·C₂", "Ghép nối tiếp: các tụ có cùng điện tích, hiệu điện thế bộ bằng tổng hiệu điện thế các tụ."],
    ["Khi tăng khoảng cách giữa hai bản của tụ điện phẳng, điện dung của tụ thế nào?", "Điện dung giảm", "Điện dung tăng", "Điện dung không đổi", "Điện dung tỉ lệ nghịch với khoảng cách hai bản: d tăng thì C giảm."],
    ["Thế năng điện của điện tích q tại điểm có điện thế V được tính thế nào?", "W = q·V", "W = q/V", "W = V/q", "Từ đó suy ra công của lực điện bằng độ giảm thế năng điện."]
  ];
  var vl11c3P = [["Lực Coulomb", "F = k|q₁q₂|/r²"], ["Cường độ điện trường", "E = F/q"], ["Điện trường của điện tích điểm", "E = k|Q|/r²"], ["Điện trường đều", "E = U/d"], ["Điện dung của tụ", "C = Q/U"], ["Năng lượng của tụ", "W = (1/2)C·U²"], ["Công của lực điện", "A = q·U"], ["Đơn vị điện dung", "Fara (F)"]];
  function vl11Field() {
    var v = rand(0, 2);
    if (v === 0) { var tr = pick([[2, 5, 1], [4, 5, 2], [5, 6, 3], [5, 8, 4], [10, 6, 6], [10, 10, 10]]); return numBlank6("Hai điện tích điểm q₁ = " + tr[0] + " μC và q₂ = " + tr[1] + " μC đặt cách nhau 30 cm trong chân không. Độ lớn lực tương tác giữa chúng bằng bao nhiêu N?", "F = k|q₁q₂|/r² = ?", tr[2], "F = 9·10⁹·|q₁q₂|/r² với r = 0,3 m cho kết quả " + tr[2] + " N."); }
    if (v === 1) { var C = pick([2, 4, 5, 10, 20]), U = pick([3, 6, 10, 12, 20]); return numBlank6("Tụ điện có điện dung " + C + " μF được đặt dưới hiệu điện thế " + U + " V. Điện tích của tụ bằng bao nhiêu μC?", "Q = CU = ?", C * U, "Q = C·U với C đo bằng μF, U bằng V thì Q bằng μC."); }
    var E = pick([200, 400, 500, 1000]), d = pick([5, 10, 20]); return numBlank6("Trong điện trường đều có cường độ " + E + " V/m, hai điểm dọc đường sức cách nhau " + d + " cm. Hiệu điện thế giữa hai điểm bằng bao nhiêu V?", "U = Ed = ?", E * d / 100, "U = E·d với d = " + d + " cm = " + (d / 100) + " m.");
  }
  var vl11c4F = [
    ["Dòng điện là gì?", "Dòng chuyển dời có hướng của các điện tích", "Chuyển động nhiệt hỗn loạn của electron", "Sự nhiễm điện của các vật do cọ xát", "Trong kim loại, dòng điện là dòng chuyển dời có hướng của các electron tự do."],
    ["Chiều dòng điện được quy ước thế nào?", "Là chiều chuyển dời của điện tích dương", "Là chiều chuyển dời của electron", "Ngược chiều chuyển dời của điện tích dương", "Trong mạch kim loại, electron chuyển dời ngược chiều dòng điện quy ước."],
    ["Cường độ dòng điện được định nghĩa thế nào?", "I = q/t, đơn vị là ampe (A)", "I = q·t, đơn vị là vôn", "I = t/q, đơn vị là ôm", "Cường độ dòng điện đặc trưng cho độ mạnh yếu của dòng điện qua một tiết diện."],
    ["Định luật Ohm cho đoạn mạch chỉ chứa điện trở phát biểu thế nào?", "I = U/R", "I = U·R", "I = R/U", "Cường độ dòng điện tỉ lệ thuận hiệu điện thế, tỉ lệ nghịch điện trở."],
    ["Điện trở của dây dẫn đồng chất, tiết diện đều được tính thế nào?", "R = ρ·l/S", "R = ρ·S/l", "R = l/(ρ·S)", "ρ là điện trở suất (Ω·m), l là chiều dài dây, S là tiết diện dây."],
    ["Khi tăng chiều dài dây dẫn (giữ nguyên tiết diện, vật liệu) thì điện trở thay đổi thế nào?", "Điện trở tăng tỉ lệ thuận với chiều dài", "Điện trở giảm tỉ lệ nghịch với chiều dài", "Điện trở không thay đổi", "Ngược lại, tăng tiết diện dây thì điện trở giảm."],
    ["Điện trở của kim loại thay đổi thế nào khi nhiệt độ tăng?", "Điện trở tăng khi nhiệt độ tăng", "Điện trở giảm khi nhiệt độ tăng", "Điện trở không phụ thuộc nhiệt độ", "Với chất điện phân và bán dẫn, chiều thay đổi điện trở theo nhiệt độ có thể khác kim loại."],
    ["Suất điện động của nguồn điện đặc trưng cho điều gì?", "Khả năng sinh công của nguồn điện", "Điện trở của mạch ngoài", "Công suất tiêu thụ của mạch ngoài", "Suất điện động ℰ đo bằng vôn (V), bằng hiệu điện thế mạch ngoài khi mạch hở (r nhỏ)."],
    ["Định luật Ohm cho toàn mạch phát biểu thế nào?", "I = ℰ/(R + r)", "I = ℰ/(R − r)", "I = ℰ·(R + r)", "R là điện trở mạch ngoài, r là điện trở trong của nguồn."],
    ["Hiện tượng đoản mạch xảy ra khi nào và có đặc điểm gì?", "Khi R ≈ 0, dòng điện I = ℰ/r rất lớn", "Khi mạch hở, dòng điện bằng 0", "Khi điện trở trong bằng 0", "Đoản mạch nguy hiểm vì dòng rất lớn gây nóng chảy, cháy nổ; cần cầu chì bảo vệ."],
    ["Điện năng tiêu thụ của một đoạn mạch được tính thế nào?", "A = U·I·t", "A = U/I·t", "A = U·I/t", "Điện năng đo bằng jun (J) hoặc kilôoát giờ (kW·h) trong thực tế."],
    ["Công suất điện của một đoạn mạch được tính thế nào?", "P = U·I = I²R = U²/R", "P = U/I", "P = I/U", "Công suất cho biết tốc độ tiêu thụ điện năng, đơn vị là oát (W)."],
    ["Định luật Joule – Lenz cho nhiệt lượng toả ra trên điện trở là gì?", "Q = I²·R·t", "Q = I·R·t", "Q = U²·R·t", "Nhiệt lượng toả ra tỉ lệ thuận điện trở, bình phương cường độ dòng điện và thời gian."],
    ["Công suất của nguồn điện được tính thế nào?", "P_ng = ℰ·I", "P_ng = U·I của mạch ngoài", "P_ng = I²·r", "Công suất nguồn bằng công suất tiêu thụ mạch ngoài cộng công suất hao phí do điện trở trong."],
    ["Hiệu suất của nguồn điện được tính thế nào?", "H = U/ℰ = R/(R + r)", "H = ℰ/U", "H = r/(R + r)", "Điện trở trong càng nhỏ so với mạch ngoài thì hiệu suất nguồn càng cao."],
    ["Ampe kế dùng để đo đại lượng nào và mắc thế nào trong mạch?", "Đo cường độ dòng điện, mắc nối tiếp", "Đo hiệu điện thế, mắc song song", "Đo điện trở, mắc nối tiếp", "Ampe kế có điện trở rất nhỏ; mắc sai song song với nguồn dễ gây đoản mạch."],
    ["Vôn kế dùng để đo đại lượng nào và mắc thế nào trong mạch?", "Đo hiệu điện thế, mắc song song", "Đo cường độ dòng điện, mắc nối tiếp", "Đo công suất, mắc nối tiếp", "Vôn kế có điện trở rất lớn nên dòng qua vôn kế không đáng kể."],
    ["Trong bài thực hành xác định suất điện động và điện trở trong, đồ thị U theo I có dạng gì?", "Đường thẳng U = ℰ − rI, hệ số góc là −r", "Đường parabol U = ℰ·I²", "Đường thẳng qua gốc toạ độ U = rI", "Kéo dài đồ thị cắt trục U tại ℰ và trục I tại dòng đoản mạch ℰ/r."],
    ["Điện trở trong của nguồn gây ra hệ quả nào?", "Hiệu điện thế mạch ngoài nhỏ hơn suất điện động", "Hiệu điện thế mạch ngoài lớn hơn suất điện động", "Dòng điện trong mạch tăng vô hạn", "Khi mạch hở (I = 0), hiệu điện thế hai cực nguồn bằng suất điện động ℰ."],
    ["Một bóng đèn ghi 220 V – 100 W cho biết điều gì?", "Điện áp định mức 220 V, công suất định mức 100 W", "Đèn dùng tối đa 220 giờ, công suất 100 W", "Điện trở đèn là 220 Ω, dòng định mức 100 A", "Đèn sáng bình thường khi mắc vào hiệu điện thế 220 V và tiêu thụ 100 W."],
    ["Đơn vị kilôoát giờ (kW·h) của điện năng bằng bao nhiêu jun?", "1 kW·h = 3,6·10⁶ J", "1 kW·h = 1000 J", "1 kW·h = 3,6·10³ J", "Số đếm của công tơ điện chính là điện năng tiêu thụ tính bằng kW·h."],
    ["Khi cường độ dòng điện qua điện trở tăng gấp đôi (giữ nguyên R), nhiệt lượng toả ra thay đổi thế nào?", "Tăng gấp 4 lần", "Tăng gấp 2 lần", "Giảm đi 2 lần", "Vì Q = I²Rt tỉ lệ với bình phương cường độ dòng điện."]
  ];
  var vl11c4P = [["Cường độ dòng điện", "I = q/t"], ["Định luật Ohm đoạn mạch", "I = U/R"], ["Điện trở của dây dẫn", "R = ρ·l/S"], ["Định luật Ohm toàn mạch", "I = ℰ/(R + r)"], ["Điện năng tiêu thụ", "A = U·I·t"], ["Công suất điện", "P = U·I"], ["Định luật Joule – Lenz", "Q = I²·R·t"], ["Công suất của nguồn", "P_ng = ℰ·I"]];
  function vl11Ohm() {
    var v = rand(0, 3);
    if (v === 0) { var tr = pick([[12, 3, 4], [15, 5, 3], [24, 4, 6], [36, 6, 6], [40, 8, 5], [45, 9, 5]]); var q0 = numBlank6("Đặt hiệu điện thế " + tr[0] + " V vào hai đầu điện trở " + tr[1] + " Ω. Cường độ dòng điện qua điện trở bằng bao nhiêu A?", "I = U/R = ?", tr[2], "Định luật Ohm: I = U/R."); q0.figure = figCircuit1SVG(tr[0], tr[1]); return q0; }
    if (v === 1) { var U = pick([6, 10, 12, 20, 24]), I = pick([2, 3, 4, 5]); return numBlank6("Một thiết bị hoạt động ở hiệu điện thế " + U + " V, dòng điện qua nó là " + I + " A. Công suất điện của thiết bị bằng bao nhiêu W?", "P = UI = ?", U * I, "P = U·I."); }
    if (v === 2) { var tr2 = pick([[12, 3, 1, 3], [24, 5, 1, 4], [18, 8, 1, 2], [30, 9, 1, 3], [16, 7, 1, 2], [20, 4, 1, 4]]); var q2 = numBlank6("Nguồn có suất điện động " + tr2[0] + " V, điện trở trong " + tr2[2] + " Ω, mắc với mạch ngoài " + tr2[1] + " Ω. Cường độ dòng điện trong mạch bằng bao nhiêu A?", "I = ℰ/(R + r) = ?", tr2[3], "Định luật Ohm toàn mạch: I = ℰ/(R + r)."); q2.figure = figCircuitFullSVG(tr2[0], tr2[2], tr2[1]); return q2; }
    var I2 = pick([1, 2, 3]), R = pick([5, 10, 20]), t = pick([2, 5, 10]); return numBlank6("Dòng điện " + I2 + " A chạy qua điện trở " + R + " Ω trong " + t + " s. Nhiệt lượng toả ra trên điện trở bằng bao nhiêu J?", "Q = I²Rt = ?", I2 * I2 * R * t, "Định luật Joule – Lenz: Q = I²·R·t.");
  }
  var vl11cd1F = [
    ["Định luật vạn vật hấp dẫn cho độ lớn lực hấp dẫn giữa hai chất điểm là gì?", "F = G·m₁m₂/r²", "F = G·m₁m₂·r²", "F = G·(m₁ + m₂)/r", "Lực hấp dẫn tỉ lệ thuận tích hai khối lượng, tỉ lệ nghịch bình phương khoảng cách."],
    ["Hằng số hấp dẫn G có giá trị xấp xỉ bao nhiêu?", "G ≈ 6,67·10⁻¹¹ N·m²/kg²", "G ≈ 9·10⁹ N·m²/kg²", "G ≈ 9,8 m/s²", "G rất nhỏ nên lực hấp dẫn chỉ đáng kể với các vật có khối lượng lớn như Trái Đất."],
    ["Lực hấp dẫn giữa hai vật là cặp lực có đặc điểm gì?", "Trực đối, cùng độ lớn, luôn là lực hút", "Cùng chiều, cùng độ lớn", "Luôn là lực đẩy", "Hai lực hấp dẫn đặt vào hai vật khác nhau, dọc theo đường nối hai vật."],
    ["Trường hấp dẫn là gì?", "Dạng trường quanh vật có khối lượng, gây lực hấp dẫn", "Vùng không gian không có trọng lực", "Dòng chuyển động của các thiên thể", "Mọi vật có khối lượng đều tạo trường hấp dẫn xung quanh nó."],
    ["Cường độ trường hấp dẫn tại một điểm được định nghĩa thế nào?", "Lực hấp dẫn trên một đơn vị khối lượng: g = F/m", "Lực hấp dẫn nhân với khối lượng thử", "Khối lượng của vật gây trường tại điểm đó", "Cường độ trường hấp dẫn còn gọi là gia tốc trọng trường, đơn vị m/s²."],
    ["Cường độ trường hấp dẫn do vật khối lượng M gây ra tại khoảng cách r là gì?", "g = G·M/r²", "g = G·M·r²", "g = G/r²", "Càng xa vật gây trường, cường độ trường hấp dẫn càng nhỏ."],
    ["Khi đi từ mặt đất lên cao, cường độ trường hấp dẫn của Trái Đất thay đổi thế nào?", "Giảm dần, tỉ lệ nghịch với bình phương khoảng cách tới tâm", "Tăng dần theo độ cao", "Không thay đổi ở mọi độ cao", "Tại độ cao h: g = G·M/(R + h)² với R là bán kính Trái Đất."],
    ["Đường sức của trường hấp dẫn có chiều thế nào?", "Hướng vào tâm của vật gây trường", "Hướng ra xa vật gây trường", "Là các đường tròn quanh vật", "Đường sức trường hấp dẫn là các đường thẳng xuyên tâm, vật càng nặng đường sức càng mau."],
    ["Thế năng hấp dẫn được quy ước bằng 0 ở đâu?", "Ở xa vô cùng; ở khoảng cách hữu hạn thế năng luôn âm", "Ở mặt đất", "Ở tâm của vật gây trường", "Mốc thế năng ở vô cực giúp biểu thức thế năng hấp dẫn có dạng đơn giản."],
    ["Thế năng hấp dẫn của vật m trong trường của vật M được tính thế nào?", "W_t = −G·M·m/r", "W_t = G·M·m/r", "W_t = −G·M·m·r", "Dấu trừ thể hiện lực hấp dẫn là lực hút và thế năng ở vô cực bằng 0."],
    ["Thế hấp dẫn tại một điểm được định nghĩa thế nào?", "φ = W_t/m = −G·M/r, đơn vị J/kg", "φ = W_t·m, đơn vị J", "φ = G·M·m/r, đơn vị N/kg", "Thế hấp dẫn là đại lượng vô hướng, đặc trưng cho trường hấp dẫn về mặt năng lượng."],
    ["Công của lực hấp dẫn khi vật dịch chuyển trong trường hấp dẫn có đặc điểm gì?", "Không phụ thuộc đường đi, chỉ vị trí đầu và cuối", "Phụ thuộc vào quãng đường đã đi", "Luôn bằng 0 trên mọi quỹ đạo", "Công của lực hấp dẫn bằng độ giảm thế năng hấp dẫn của vật."],
    ["Lực nào đóng vai trò lực hướng tâm giữ vệ tinh trên quỹ đạo tròn quanh Trái Đất?", "Lực hấp dẫn của Trái Đất", "Lực đẩy của động cơ vệ tinh", "Lực ma sát với khí quyển", "Vệ tinh liên tục “rơi” về Trái Đất nhưng quỹ đạo cong theo bề mặt Trái Đất."],
    ["Tốc độ của vệ tinh trên quỹ đạo tròn bán kính r quanh Trái Đất là gì?", "v = √(G·M/r)", "v = √(G·M·r)", "v = G·M/r²", "Quỹ đạo càng cao (r càng lớn) thì vệ tinh chuyển động càng chậm."],
    ["Tốc độ vũ trụ cấp 1 của Trái Đất có giá trị khoảng bao nhiêu?", "Khoảng 7,9 km/s", "Khoảng 11,2 km/s", "Khoảng 3 km/s", "Đây là tốc độ tối thiểu để vật thành vệ tinh bay sát mặt đất theo quỹ đạo tròn; 11,2 km/s là tốc độ vũ trụ cấp 2."],
    ["Vệ tinh địa tĩnh có đặc điểm quỹ đạo nào?", "Chu kì 24 giờ, bay trên mặt phẳng xích đạo", "Chu kì 90 phút, bay qua hai cực", "Đứng yên so với Mặt Trời", "Vệ tinh địa tĩnh luôn ở trên một điểm cố định của xích đạo, dùng cho truyền hình và viễn thông."],
    ["Khi bán kính quỹ đạo tròn của vệ tinh tăng lên, chu kì của vệ tinh thay đổi thế nào?", "Chu kì tăng lên", "Chu kì giảm xuống", "Chu kì không đổi", "Các vệ tinh địa tĩnh ở rất xa (khoảng 36 000 km trên xích đạo) nên chu kì dài tới 24 giờ."],
    ["Cường độ trường hấp dẫn trên bề mặt Mặt Trăng so với Trái Đất thế nào?", "Nhỏ hơn khoảng 6 lần", "Lớn hơn khoảng 6 lần", "Bằng nhau", "Vì vậy trọng lượng của vật trên Mặt Trăng chỉ bằng khoảng 1/6 ở Trái Đất, còn khối lượng không đổi."],
    ["Khi khối lượng của cả hai vật đều tăng gấp đôi, lực hấp dẫn giữa chúng thay đổi thế nào?", "Tăng gấp 4 lần", "Tăng gấp 2 lần", "Không thay đổi", "Vì lực hấp dẫn tỉ lệ thuận với tích m₁·m₂, tích này tăng 4 lần khi mỗi khối lượng tăng gấp đôi."],
    ["Để vật thoát hẳn khỏi trường hấp dẫn Trái Đất (tốc độ vũ trụ cấp 2), tốc độ cần thiết khoảng bao nhiêu?", "Khoảng 11,2 km/s", "Khoảng 7,9 km/s", "Khoảng 16,7 km/s", "16,7 km/s là tốc độ vũ trụ cấp 3 để thoát khỏi hệ Mặt Trời từ Trái Đất."]
  ];
  var vl11cd1P = [["Lực hấp dẫn", "F = G·m₁m₂/r²"], ["Cường độ trường hấp dẫn", "g = G·M/r²"], ["Thế năng hấp dẫn", "W_t = −G·M·m/r"], ["Thế hấp dẫn", "φ = −G·M/r"], ["Hằng số hấp dẫn G", "6,67·10⁻¹¹ N·m²/kg²"], ["Tốc độ vũ trụ cấp 1", "Khoảng 7,9 km/s"], ["Vệ tinh địa tĩnh", "Chu kì 24 giờ trên xích đạo"]];
  function vl11Grav() {
    var v = rand(0, 1);
    if (v === 0) { var tr = pick([["Mặt Trăng", "1,6", 10, 16], ["Mặt Trăng", "1,6", 20, 32], ["Sao Hoả", "3,7", 10, 37], ["Sao Hoả", "3,7", 20, 74], ["Sao Mộc", "25", 4, 100], ["Sao Mộc", "25", 6, 150]]); return numBlank6("Trên " + tr[0] + ", cường độ trường hấp dẫn g ≈ " + tr[1] + " m/s². Một vật khối lượng " + tr[2] + " kg có trọng lượng bằng bao nhiêu N?", "P = m·g = ?", tr[3], "P = m·g = " + tr[2] + " × " + tr[1] + " = " + tr[3] + " N."); }
    var tr2 = pick([[100, 10, 10], [120, 20, 6], [90, 10, 9], [200, 25, 8], [60, 12, 5]]); return numBlank6("Một vật có trọng lượng " + tr2[0] + " N tại nơi có cường độ trường hấp dẫn " + tr2[1] + " m/s². Khối lượng của vật bằng bao nhiêu kg?", "m = P/g = ?", tr2[2], "Từ P = m·g suy ra m = P/g; khối lượng không đổi theo vị trí.");
  }
  var vl11cd2F = [
    ["Sóng vô tuyến dùng trong truyền thông tin là loại sóng nào?", "Sóng điện từ mang thông tin trong không gian", "Sóng âm tần số rất cao", "Sóng cơ truyền trong dây dẫn", "Sóng vô tuyến truyền được trong chân không với tốc độ ánh sáng."],
    ["Tín hiệu tương tự (analog) có đặc điểm gì?", "Biến thiên liên tục theo thời gian", "Chỉ gồm hai mức 0 và 1", "Không thay đổi theo thời gian", "Ví dụ tín hiệu tương tự: tín hiệu điện từ micro theo sóng âm, tín hiệu hình ảnh của camera đời cũ."],
    ["Tín hiệu số (digital) có đặc điểm gì?", "Gồm các mức rời rạc, thường biểu diễn bằng 0 và 1", "Biến thiên liên tục như sóng sin", "Chỉ truyền được trong dây đồng", "Máy tính và điện thoại hiện nay xử lí, lưu trữ thông tin chủ yếu ở dạng số."],
    ["Ưu điểm nổi bật của tín hiệu số so với tín hiệu tương tự là gì?", "Chống nhiễu tốt, dễ lưu trữ và xử lí", "Không cần năng lượng để truyền", "Truyền nhanh hơn tốc độ ánh sáng", "Tín hiệu số ít bị suy giảm chất lượng khi sao chép và truyền xa."],
    ["Biến điệu sóng vô tuyến là quá trình gì?", "Ghép tín hiệu cần truyền lên sóng mang cao tần", "Khuếch đại tín hiệu âm thanh lên nhiều lần", "Chuyển tín hiệu số thành tín hiệu tương tự", "Ở nơi thu, quá trình tách tín hiệu khỏi sóng mang gọi là giải điều chế."],
    ["Vì sao tín hiệu âm tần không được phát trực tiếp mà phải biến điệu?", "Để phát xạ hiệu quả bằng ăng-ten và truyền đi xa", "Vì sóng âm tần truyền nhanh hơn sóng mang", "Vì máy thu không nhận được tín hiệu âm tần", "Ăng-ten hiệu quả phải có kích thước cỡ bước sóng; sóng âm tần có bước sóng quá dài nên ăng-ten không khả thi."],
    ["Biến điệu biên độ (AM) là quá trình thế nào?", "Biên độ sóng mang biến đổi theo tín hiệu cần truyền", "Tần số sóng mang biến đổi theo tín hiệu", "Pha sóng mang giữ nguyên không đổi", "AM dùng cho phát thanh sóng trung và sóng ngắn, dễ bị nhiễu biên độ."],
    ["Biến điệu tần số (FM) là quá trình thế nào?", "Tần số sóng mang biến đổi theo tín hiệu cần truyền", "Biên độ sóng mang biến đổi theo tín hiệu", "Sóng mang bị ngắt quãng theo tín hiệu", "FM cho âm thanh trung thực hơn, ít nhiễu hơn AM, dùng trong phát thanh chất lượng cao."],
    ["Sóng mang trong truyền thông vô tuyến là gì?", "Sóng điện từ cao tần mang tín hiệu cần truyền", "Sóng âm do loa phát ra", "Dây dẫn nối máy phát với máy thu", "Tần số sóng mang quyết định kênh (đài) mà máy thu phải chọn để nghe."],
    ["Ăng-ten trong hệ thống truyền thông vô tuyến có vai trò gì?", "Phát và thu sóng vô tuyến", "Khuếch đại công suất tín hiệu âm tần", "Lưu trữ tín hiệu để phát lại", "Kích thước ăng-ten hiệu quả thường cỡ một phần của bước sóng sóng mang."],
    ["Tín hiệu vô tuyến bị suy giảm khi truyền xa chủ yếu do những nguyên nhân nào?", "Lan toả theo khoảng cách, hấp thụ, phản xạ, tán xạ", "Do sóng vô tuyến tự ngừng truyền", "Do máy thu tiêu thụ hết sóng", "Suy giảm làm tín hiệu yếu và méo, cần trạm lặp và khuếch đại ở nơi thu."],
    ["Với nguồn phát đẳng hướng, cường độ sóng thay đổi theo khoảng cách thế nào?", "Giảm tỉ lệ nghịch với bình phương khoảng cách", "Giảm tỉ lệ nghịch với khoảng cách", "Không thay đổi theo khoảng cách", "Vì năng lượng sóng trải đều trên mặt cầu có diện tích tỉ lệ với r²."],
    ["Bộ chuyển đổi ADC có chức năng gì?", "Chuyển tín hiệu tương tự thành tín hiệu số", "Chuyển tín hiệu số thành tín hiệu tương tự", "Khuếch đại tín hiệu vô tuyến", "ADC gồm các khâu lấy mẫu, lượng tử hoá và mã hoá tín hiệu."],
    ["Bộ chuyển đổi DAC có chức năng gì?", "Chuyển tín hiệu số thành tín hiệu tương tự", "Chuyển tín hiệu tương tự thành tín hiệu số", "Phát sóng vô tuyến ra ăng-ten", "Ví dụ: DAC trong điện thoại biến nhạc số thành tín hiệu tương tự đưa ra loa/tai nghe."],
    ["Lấy mẫu tín hiệu là quá trình gì?", "Đo giá trị tín hiệu tại các thời điểm rời rạc đều nhau", "Khuếch đại tín hiệu lên nhiều lần", "Lọc bỏ hoàn toàn nhiễu trong tín hiệu", "Tần số lấy mẫu càng cao, tín hiệu số càng trung thực với tín hiệu gốc."],
    ["Tốc độ truyền dữ liệu được đo bằng đơn vị nào?", "Bit trên giây (bit/s)", "Héc (Hz)", "Oát (W)", "Các bội thường gặp: kbit/s, Mbit/s, Gbit/s; 1 byte = 8 bit."],
    ["Băng thông của một kênh truyền là gì?", "Khoảng tần số mà kênh truyền cho tín hiệu đi qua", "Công suất phát của máy phát", "Khoảng cách truyền xa nhất của sóng", "Băng thông càng rộng, kênh càng truyền được nhiều thông tin trong một giây."],
    ["Nhiễu trong truyền thông tin là gì?", "Tín hiệu không mong muốn làm sai lệch thông tin", "Phần tín hiệu chính cần truyền", "Thiết bị dùng để chống sét", "Mã hoá và lọc tín hiệu giúp giảm ảnh hưởng của nhiễu."],
    ["Khi truyền tín hiệu số, việc mã hoá kèm bit kiểm tra có tác dụng gì?", "Giúp phát hiện và sửa lỗi khi truyền", "Làm tín hiệu truyền chậm hơn một nửa", "Biến tín hiệu số thành tín hiệu tương tự", "Nhờ sửa lỗi, thông tin số giữ được độ chính xác cao sau nhiều lần truyền và sao chép."],
    ["Đài phát thanh FM hoạt động ở dải tần nào?", "Khoảng 88 – 108 MHz", "Khoảng 530 – 1600 kHz", "Khoảng 3 – 30 kHz", "Phát thanh AM sóng trung dùng dải tần thấp hơn nhiều so với FM."]
  ];
  var vl11cd2P = [["AM", "Biến điệu biên độ sóng mang"], ["FM", "Biến điệu tần số sóng mang"], ["ADC", "Tương tự chuyển thành số"], ["DAC", "Số chuyển thành tương tự"], ["Sóng mang", "Sóng cao tần mang tín hiệu"], ["Tín hiệu số", "Các mức rời rạc 0 và 1"], ["Ăng-ten", "Phát và thu sóng vô tuyến"], ["Băng thông", "Khoảng tần số kênh truyền cho qua"]];
  function vl11Radio() {
    var v = rand(0, 1);
    if (v === 0) { var f = pick([3, 5, 6, 10, 15, 25, 30, 50, 60, 100, 150]); return numBlank6("Sóng vô tuyến có tần số " + f + " MHz truyền trong chân không (c = 3·10⁸ m/s). Bước sóng của sóng bằng bao nhiêu mét?", "λ = c/f = ?", 300 / f, "λ = c/f; với f đo bằng MHz thì λ = 300/f (m)."); }
    var lam = pick([2, 3, 5, 6, 10, 12, 20, 30, 50, 60, 100]); return numBlank6("Sóng vô tuyến có bước sóng " + lam + " m truyền trong chân không (c = 3·10⁸ m/s). Tần số của sóng bằng bao nhiêu MHz?", "f = c/λ = ?", 300 / lam, "f = c/λ; đổi ra MHz bằng cách lấy 300/λ(m).");
  }
  var vl11cd3F = [
    ["Cảm biến là thiết bị có chức năng gì?", "Biến đại lượng cần đo thành tín hiệu điện", "Khuếch đại mọi tín hiệu điện lên nhiều lần", "Phát ra ánh sáng khi có dòng điện", "Cảm biến là khâu đầu vào của các hệ thống đo lường và điều khiển tự động."],
    ["Một hệ thống cảm biến thường gồm những phần chính nào?", "Phần tử cảm nhận và mạch xử lí tín hiệu", "Chỉ một điện trở cố định", "Nguồn điện và một công tắc", "Phần tử cảm nhận tiếp xúc với đại lượng đo (nhiệt, sáng, áp suất…) và sinh tín hiệu."],
    ["Quang điện trở (LDR) hoạt động dựa trên nguyên tắc nào?", "Điện trở giảm khi cường độ sáng chiếu vào tăng", "Điện trở tăng khi cường độ sáng tăng", "Tự phát sáng khi có dòng điện chạy qua", "LDR dùng trong mạch tự bật đèn đường khi trời tối."],
    ["Nhiệt điện trở loại NTC có đặc điểm gì?", "Điện trở giảm khi nhiệt độ tăng", "Điện trở tăng khi nhiệt độ tăng", "Điện trở không đổi theo nhiệt độ", "NTC dùng làm cảm biến nhiệt độ trong nhiệt kế điện tử, điều hoà."],
    ["Nhiệt điện trở loại PTC có đặc điểm gì?", "Điện trở tăng khi nhiệt độ tăng", "Điện trở giảm khi nhiệt độ tăng", "Chỉ dẫn điện ở nhiệt độ rất thấp", "PTC còn được dùng làm phần tử tự ngắt bảo vệ quá dòng, quá nhiệt."],
    ["Mạch chia áp trong mạch cảm biến có vai trò gì?", "Chuyển sự thay đổi điện trở cảm biến thành điện áp", "Tăng điện áp nguồn lên gấp nhiều lần", "Chuyển tín hiệu số thành tín hiệu tương tự", "Điện áp ra của mạch chia áp thay đổi theo điện trở của cảm biến, đưa vào mạch xử lí."],
    ["Bộ khuếch đại thuật toán (op-amp) có đặc điểm cơ bản nào?", "Hệ số khuếch đại điện áp rất lớn", "Chỉ khuếch đại dòng điện một chiều", "Không cần nguồn nuôi để hoạt động", "Op-amp có hai đầu vào (đảo và không đảo) và một đầu ra, là linh kiện cốt lõi của điện tử tương tự."],
    ["Mạch khuếch đại đảo dùng op-amp có đặc điểm tín hiệu ra thế nào?", "Ngược pha với tín hiệu vào ở đầu đảo (−)", "Cùng pha với tín hiệu vào", "Bị triệt tiêu hoàn toàn", "Dấu trừ trong hệ số khuếch đại A = −R₂/R₁ thể hiện sự ngược pha này."],
    ["Mạch khuếch đại không đảo dùng op-amp có đặc điểm tín hiệu ra thế nào?", "Cùng pha với tín hiệu vào ở đầu không đảo (+)", "Ngược pha với tín hiệu vào", "Luôn bằng 0", "Hệ số khuếch đại của mạch không đảo: A = 1 + R₂/R₁, luôn lớn hơn hoặc bằng 1."],
    ["Hệ số khuếch đại của mạch khuếch đại không đảo được tính thế nào?", "A = 1 + R₂/R₁", "A = −R₂/R₁", "A = R₁/R₂", "R₂ là điện trở hồi tiếp, R₁ là điện trở từ đầu đảo xuống đất trong sơ đồ chuẩn."],
    ["Hệ số khuếch đại của mạch khuếch đại đảo được tính thế nào?", "A = −R₂/R₁", "A = 1 + R₂/R₁", "A = R₂·R₁", "Độ lớn khuếch đại do tỉ số hai điện trở ngoài quyết định, không phụ thuộc bản thân op-amp."],
    ["Mạch so sánh dùng op-amp có chức năng gì?", "So sánh hai điện áp, đầu ra ở mức cao hoặc thấp", "Cộng hai tín hiệu điện áp lại với nhau", "Ổn định điện áp nguồn nuôi", "Mạch so sánh là nền của các mạch báo động, tự động bật/tắt theo ngưỡng cảm biến."],
    ["Transistor trong mạch điện tử có những vai trò chính nào?", "Khuếch đại tín hiệu và đóng – ngắt như công tắc", "Tích trữ điện năng như tụ điện", "Chuyển điện xoay chiều thành một chiều", "Một tín hiệu nhỏ ở cực điều khiển có thể điều khiển dòng lớn hơn qua transistor."],
    ["Khi transistor hoạt động như một công tắc, nó được điều khiển bằng gì?", "Tín hiệu nhỏ ở cực điều khiển (cực gốc/base)", "Nhiệt độ môi trường xung quanh", "Ánh sáng chiếu vào vỏ transistor", "Transistor đóng – ngắt nhanh là nền tảng của các mạch số và máy tính."],
    ["Thiết bị đầu ra trong hệ thống điện tử là gì?", "Thiết bị biến tín hiệu điện thành dạng năng lượng khác", "Thiết bị biến đại lượng đo thành tín hiệu điện", "Thiết bị lưu trữ dữ liệu lâu dài", "Ví dụ thiết bị đầu ra: LED, loa, động cơ, rơ-le, màn hình hiển thị."],
    ["Điôt phát quang (LED) có đặc điểm gì?", "Phát sáng khi mắc đúng chiều dòng điện", "Phát sáng theo cả hai chiều dòng điện", "Chỉ phát sáng ở điện áp rất cao", "LED tiết kiệm điện, bền, dùng làm đèn báo và chiếu sáng."],
    ["Loa điện động biến đổi năng lượng thế nào?", "Biến tín hiệu điện thành âm thanh", "Biến âm thanh thành tín hiệu điện", "Biến điện năng thành ánh sáng", "Thiết bị biến âm thanh thành tín hiệu điện là micro, đóng vai trò cảm biến."],
    ["Rơ-le điện từ có chức năng gì trong mạch điều khiển?", "Đóng ngắt mạch điện bằng nam châm điện", "Khuếch đại điện áp tín hiệu", "Đo cường độ dòng điện trong mạch", "Rơ-le cho phép mạch điều khiển dòng nhỏ đóng ngắt mạch tải dòng lớn, an toàn và cách li."],
    ["Động cơ điện là thiết bị đầu ra biến đổi năng lượng thế nào?", "Biến điện năng thành cơ năng quay", "Biến cơ năng thành điện năng", "Biến điện năng thành nhiệt năng", "Động cơ điện xuất hiện trong quạt, máy bơm, robot và xe điện."],
    ["Micro là cảm biến biến đổi tín hiệu nào?", "Biến âm thanh thành tín hiệu điện", "Biến ánh sáng thành tín hiệu điện", "Biến nhiệt độ thành tín hiệu điện", "Cảm biến ánh sáng (quang điện) biến ánh sáng thành tín hiệu điện, dùng trong máy ảnh và đo sáng."]
  ];
  var vl11cd3P = [["Quang điện trở LDR", "Điện trở giảm khi sáng mạnh"], ["Nhiệt điện trở NTC", "Điện trở giảm khi nhiệt độ tăng"], ["Khuếch đại không đảo", "Tín hiệu ra cùng pha tín hiệu vào"], ["Khuếch đại đảo", "Tín hiệu ra ngược pha tín hiệu vào"], ["Transistor", "Khuếch đại và đóng – ngắt"], ["Rơ-le", "Đóng ngắt mạch bằng nam châm điện"], ["LED", "Phát sáng khi có dòng thuận"], ["Loa", "Biến tín hiệu điện thành âm thanh"]];
  function vl11Sensor() {
    var v = rand(0, 1);
    if (v === 0) { var tr = pick([[10, 10, 2], [20, 10, 3], [30, 10, 4], [40, 20, 3], [90, 10, 10]]), vin = pick([1, 2, 3]); return numBlank6("Mạch khuếch đại không đảo có R₂ = " + tr[0] + " kΩ, R₁ = " + tr[1] + " kΩ, điện áp vào " + vin + " V. Điện áp ra bằng bao nhiêu V?", "V_ra = (1 + R₂/R₁)·V_vào = ?", tr[2] * vin, "Hệ số khuếch đại A = 1 + R₂/R₁ = " + tr[2] + "; V_ra = A·V_vào."); }
    var tr2 = pick([[12, 10, 10, 6], [9, 10, 20, 6], [12, 20, 10, 4], [10, 40, 10, 2], [8, 10, 30, 6]]); return numBlank6("Mạch chia áp gồm nguồn " + tr2[0] + " V, điện trở cố định " + tr2[1] + " kΩ nối tiếp cảm biến " + tr2[2] + " kΩ. Điện áp lấy ra trên cảm biến bằng bao nhiêu V?", "V = U·R_cb/(R + R_cb) = ?", tr2[3], "Điện áp trên một điện trở của mạch chia áp tỉ lệ với giá trị điện trở đó.");
  }
  var VL11 = [
    TP("vl11-c1", "🎵", "Chương I: Dao động", "Bài 1–7 • Dao động điều hoà, năng lượng dao động, dao động tắt dần – cưỡng bức, cộng hưởng", MP(KP(vl11c1F, vl11c1P), { choose: [vl11Osc], blank: [vl11Osc], match: [], games: [] }), KN(vl11c1F, vl11c1P, "Vật lí")),
    TP("vl11-c2", "🌊", "Chương II: Sóng", "Bài 8–15 • Sóng cơ, sóng điện từ, giao thoa, sóng dừng, đo tần số/tốc độ truyền âm", MP(KP(vl11c2F, vl11c2P), { choose: [vl11Wave], blank: [vl11Wave], match: [], games: [] }), KN(vl11c2F, vl11c2P, "Vật lí")),
    TP("vl11-c3", "⚡", "Chương III: Điện trường", "Bài 16–21 • Lực Coulomb, điện trường, điện thế, tụ điện", MP(KP(vl11c3F, vl11c3P), { choose: [vl11Field], blank: [vl11Field], match: [], games: [] }), KN(vl11c3F, vl11c3P, "Vật lí")),
    TP("vl11-c4", "🔋", "Chương IV: Dòng điện. Mạch điện", "Bài 22–26 • Cường độ dòng điện, định luật Ohm, nguồn điện, năng lượng và công suất", MP(KP(vl11c4F, vl11c4P), { choose: [vl11Ohm], blank: [vl11Ohm], match: [], games: [] }), KN(vl11c4F, vl11c4P, "Vật lí")),
    TP("vl11-cd1", "🌍", "Chuyên đề 1: Trường hấp dẫn", "Chuyên đề Vật lí • Cường độ trường hấp dẫn, thế năng hấp dẫn, lực hấp dẫn", MP(KP(vl11cd1F, vl11cd1P), { choose: [vl11Grav], blank: [vl11Grav], match: [], games: [] }), KN(vl11cd1F, vl11cd1P, "Vật lí")),
    TP("vl11-cd2", "📡", "Chuyên đề 2: Truyền thông tin bằng sóng vô tuyến", "Chuyên đề Vật lí • Biến điệu, tín hiệu tương tự – số, suy giảm tín hiệu", MP(KP(vl11cd2F, vl11cd2P), { choose: [vl11Radio], blank: [vl11Radio], match: [], games: [] }), KN(vl11cd2F, vl11cd2P, "Vật lí")),
    TP("vl11-cd3", "🔌", "Chuyên đề 3: Điện tử học, cảm biến, thiết bị đầu ra", "Chuyên đề Vật lí • Cảm biến, bộ khuếch đại thuật toán, transistor, thiết bị đầu ra", MP(KP(vl11cd3F, vl11cd3P), { choose: [vl11Sensor], blank: [vl11Sensor], match: [], games: [] }), KN(vl11cd3F, vl11cd3P, "Vật lí"))
  ];
  /* ==================================================================
     HOÁ HỌC 11 — Kết nối tri thức
     ================================================================== */
  var hh11c1F = [
    ["Phản ứng thuận nghịch là phản ứng thế nào?", "Xảy ra đồng thời theo hai chiều ngược nhau", "Chỉ xảy ra theo một chiều duy nhất", "Không bao giờ tạo thành sản phẩm", "Kí hiệu bằng hai mũi tên ngược chiều ⇌ trong phương trình hoá học."],
    ["Trạng thái cân bằng hoá học là trạng thái thế nào?", "Tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch", "Phản ứng dừng hẳn, không còn chất phản ứng", "Nồng độ mọi chất đều bằng nhau", "Ở cân bằng, nồng độ các chất không đổi theo thời gian nhưng phản ứng vẫn diễn ra."],
    ["Ở trạng thái cân bằng, nồng độ các chất có đặc điểm gì?", "Không thay đổi theo thời gian", "Tăng dần mãi không ngừng", "Giảm dần về bằng không", "Cân bằng hoá học là cân bằng động, không phải cân bằng tĩnh."],
    ["Hằng số cân bằng Kc phụ thuộc vào yếu tố nào?", "Chỉ phụ thuộc vào nhiệt độ", "Phụ thuộc vào nồng độ ban đầu", "Phụ thuộc vào chất xúc tác", "Với một phản ứng xác định, Kc chỉ thay đổi khi nhiệt độ thay đổi."],
    ["Nguyên lí Le Chatelier phát biểu thế nào?", "Cân bằng chuyển dịch theo chiều chống lại tác động", "Cân bằng luôn chuyển dịch sang phải", "Cân bằng không bị ảnh hưởng bởi tác động ngoài", "Áp dụng cho các tác động: nồng độ, áp suất, nhiệt độ."],
    ["Khi tăng nồng độ một chất trong hệ cân bằng, cân bằng chuyển dịch thế nào?", "Theo chiều làm giảm nồng độ chất đó", "Theo chiều làm tăng thêm nồng độ chất đó", "Không chuyển dịch chút nào", "Hệ chống lại sự tăng nồng độ bằng cách tiêu thụ bớt chất đó."],
    ["Tăng áp suất hệ khí ở cân bằng thì cân bằng chuyển dịch về phía nào?", "Phía có tổng số mol khí ít hơn", "Phía có tổng số mol khí nhiều hơn", "Không chuyển dịch trong mọi trường hợp", "Nếu hai phía có số mol khí bằng nhau, áp suất không làm chuyển dịch cân bằng."],
    ["Chất xúc tác ảnh hưởng thế nào đến cân bằng hoá học?", "Không làm chuyển dịch cân bằng, chỉ đạt nhanh hơn", "Làm cân bằng chuyển dịch sang phải", "Làm tăng hằng số cân bằng Kc", "Xúc tác làm tăng tốc độ cả phản ứng thuận và phản ứng nghịch như nhau."],
    ["Chất điện li là chất thế nào?", "Tan trong nước phân li ra ion, dung dịch dẫn điện", "Tan trong nước nhưng không phân li ra ion", "Không tan trong nước ở mọi điều kiện", "Ví dụ chất điện li: acid, base, muối tan trong nước."],
    ["Chất điện li mạnh có đặc điểm phân li thế nào?", "Phân li hoàn toàn thành ion trong dung dịch", "Chỉ phân li một phần rất nhỏ", "Không phân li thành ion", "Ví dụ: HCl, NaOH, NaCl là các chất điện li mạnh."],
    ["Chất điện li yếu có đặc điểm phân li thế nào?", "Chỉ phân li một phần thành ion trong dung dịch", "Phân li hoàn toàn thành ion", "Không tan trong nước", "Ví dụ: CH₃COOH, NH₃ trong nước là các chất điện li yếu."],
    ["Theo thuyết Bronsted – Lowry, acid là chất thế nào?", "Chất cho proton (H⁺)", "Chất nhận proton (H⁺)", "Chất cho electron", "Base theo Bronsted – Lowry là chất nhận proton H⁺."],
    ["Theo thuyết Bronsted – Lowry, base là chất thế nào?", "Chất nhận proton (H⁺)", "Chất cho proton (H⁺)", "Chất nhận electron", "NH₃ nhận H⁺ của nước tạo thành NH₄⁺ nên NH₃ là base."],
    ["Thang pH thường dùng có khoảng giá trị thế nào?", "Từ 0 đến 14 ở điều kiện thường", "Từ 0 đến 7", "Từ 1 đến 100", "pH = −log[H⁺]; dung dịch càng acid thì pH càng nhỏ."],
    ["Dung dịch có pH < 7 có môi trường gì?", "Môi trường acid", "Môi trường base", "Môi trường trung tính", "Ví dụ nước chanh, dung dịch HCl loãng có pH nhỏ hơn 7."],
    ["Dung dịch có pH > 7 có môi trường gì?", "Môi trường base (kiềm)", "Môi trường acid", "Môi trường trung tính", "Ví dụ dung dịch NaOH, nước xà phòng có pH lớn hơn 7."],
    ["Dung dịch trung tính ở 25 °C có pH bằng bao nhiêu?", "pH = 7", "pH = 0", "pH = 14", "Nước cất ở 25 °C có pH = 7 và là môi trường trung tính."],
    ["Dung dịch có [H⁺] = 10⁻³ mol/L thì pH bằng bao nhiêu?", "pH = 3", "pH = 11", "pH = 10⁻³", "pH = −log(10⁻³) = 3, dung dịch có môi trường acid."],
    ["Quỳ tím đổi màu thế nào trong dung dịch acid và base?", "Acid: hoá đỏ; base: hoá xanh", "Acid: hoá xanh; base: hoá đỏ", "Không đổi màu trong cả hai", "Phenolphtalein không màu trong acid, hoá hồng trong base."],
    ["Sự thuỷ phân của muối là gì?", "Ion của muối tác dụng với nước tạo acid/base yếu", "Muối bị phân huỷ bởi nhiệt", "Muối tan hoàn toàn trong nước nóng", "Muối tạo bởi acid yếu và base mạnh thuỷ phân cho môi trường base."],
    ["Dung dịch muối Na₂CO₃ có môi trường gì?", "Môi trường base, pH > 7", "Môi trường acid, pH < 7", "Môi trường trung tính, pH = 7", "CO₃²⁻ thuỷ phân tạo OH⁻ nên dung dịch Na₂CO₃ làm quỳ tím hoá xanh."],
    ["Dung dịch muối NH₄Cl có môi trường gì?", "Môi trường acid, pH < 7", "Môi trường base, pH > 7", "Môi trường trung tính, pH = 7", "NH₄⁺ thuỷ phân tạo H⁺ nên dung dịch NH₄Cl có tính acid yếu."],
    ["Phản ứng tổng hợp ammonia N₂ + 3H₂ ⇌ 2NH₃ toả nhiệt; tăng nhiệt độ thì cân bằng chuyển dịch phía nào?", "Phía trái, chiều phản ứng nghịch (thu nhiệt)", "Phía phải, chiều tạo thêm NH₃", "Không chuyển dịch", "Giảm nhiệt độ mới thuận lợi cho chiều toả nhiệt tạo NH₃, nhưng tốc độ sẽ chậm."],
    ["Với cân bằng N₂ + 3H₂ ⇌ 2NH₃, tăng áp suất thì cân bằng chuyển dịch phía nào?", "Phía phải, phía ít mol khí hơn (2 mol)", "Phía trái, phía nhiều mol khí hơn (4 mol)", "Không chuyển dịch", "Đây là lí do công nghiệp tổng hợp NH₃ dùng áp suất cao."],
    ["Nước nguyên chất có sự điện li thế nào?", "Điện li rất yếu: H₂O ⇌ H⁺ + OH⁻", "Điện li hoàn toàn thành ion", "Hoàn toàn không điện li", "Ở 25 °C, tích số ion của nước [H⁺][OH⁻] = 10⁻¹⁴."]
  ];
  var hh11c1P = [["Phản ứng thuận nghịch", "Diễn ra theo hai chiều ngược nhau"], ["Chất điện li mạnh", "Phân li hoàn toàn thành ion"], ["Chất điện li yếu", "Phân li một phần thành ion"], ["pH < 7", "Môi trường acid"], ["pH = 7", "Môi trường trung tính"], ["pH > 7", "Môi trường base"], ["Hằng số cân bằng Kc", "Chỉ phụ thuộc nhiệt độ"], ["Chất xúc tác", "Không chuyển dịch cân bằng"]];
  var hh11c2F = [
    ["Đơn chất nitrogen (N₂) chiếm khoảng bao nhiêu phần trăm thể tích không khí?", "Khoảng 78% thể tích không khí", "Khoảng 21% thể tích không khí", "Khoảng 1% thể tích không khí", "Oxygen chiếm khoảng 21%, còn lại chủ yếu là nitrogen."],
    ["Phân tử N₂ rất bền, khó phản ứng ở điều kiện thường do đâu?", "Giữa hai nguyên tử N có liên kết ba rất bền", "Phân tử N₂ có khối lượng rất lớn", "N₂ không chứa electron hoá trị", "Cần tia lửa điện hoặc nhiệt độ rất cao N₂ mới phản ứng với oxygen."],
    ["Ammonia (NH₃) có tính chất vật lí đặc trưng nào?", "Khí không màu, mùi khai, nhẹ hơn không khí", "Khí màu nâu đỏ, mùi hắc", "Chất lỏng sánh như dầu, không mùi", "NH₃ tan rất nhiều trong nước tạo dung dịch ammonia."],
    ["Dung dịch ammonia có tính chất hoá học cơ bản nào?", "Tính base yếu, làm quỳ tím hoá xanh", "Tính acid mạnh", "Tính oxi hoá rất mạnh", "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ nên dung dịch có môi trường base yếu."],
    ["Ion ammonium (NH₄⁺) được tạo thành bằng cách nào?", "NH₃ nhận một proton H⁺", "NH₃ nhường một proton H⁺", "N₂ kết hợp với H₂O", "Liên kết giữa N và H⁺ trong NH₄⁺ là liên kết cho – nhận."],
    ["Để nhận biết ion NH₄⁺ trong dung dịch, dùng cách nào?", "Đun với NaOH, khí mùi khai làm xanh quỳ ẩm", "Thêm BaCl₂ thấy kết tủa trắng", "Thêm AgNO₃ thấy kết tủa vàng", "NH₄⁺ + OH⁻ → NH₃↑ + H₂O; khí NH₃ có mùi khai đặc trưng."],
    ["Muối ammonium dễ bị phân huỷ bởi tác động nào?", "Bởi nhiệt và bởi dung dịch base mạnh", "Bởi ánh sáng mặt trời thường", "Bởi nước lạnh tinh khiết", "Vì vậy phân đạm ammonium không nên bón cùng vôi (base)."],
    ["Nitric acid (HNO₃) là acid thế nào?", "Acid mạnh và có tính oxi hoá mạnh", "Acid yếu, không oxi hoá", "Base yếu tan trong nước", "HNO₃ đặc oxi hoá được hầu hết kim loại, kể cả Cu và Ag."],
    ["HNO₃ tác dụng với kim loại thường tạo sản phẩm khử nào thay vì khí H₂?", "NO, NO₂ hoặc muối ammonium tuỳ điều kiện", "Luôn tạo khí H₂ như acid thường", "Không tạo sản phẩm khử nào", "Do HNO₃ có tính oxi hoá mạnh nên không giải phóng H₂ với kim loại."],
    ["Hiện tượng mưa acid chủ yếu do những khí nào gây ra?", "SO₂ và các oxide của nitrogen (NO, NO₂)", "CO₂ và hơi nước", "NH₃ và CH₄", "Các khí này tan trong nước mưa tạo H₂SO₄ và HNO₃ loãng."],
    ["Hiện tượng phú dưỡng (eutrophication) ở ao hồ do thừa chất nào?", "Hợp chất của nitrogen và phosphorus", "Hợp chất của sắt và nhôm", "Khí oxygen hoà tan", "Thừa dinh dưỡng làm tảo bùng phát, thiếu oxygen, sinh vật thuỷ sinh chết."],
    ["Oxide NO₂ có màu sắc và tính chất gì đáng chú ý?", "Khí màu nâu đỏ, độc, gây mưa acid", "Khí không màu, không độc", "Chất rắn màu trắng, bền", "2NO + O₂ → 2NO₂; NO₂ tan trong nước tạo HNO₃ và HNO₂."],
    ["Sulfur (S) ở điều kiện thường là chất thế nào?", "Chất rắn màu vàng, không tan trong nước", "Chất khí màu lục nhạt, độc", "Chất lỏng màu nâu đỏ", "Sulfur là phi kim, dẫn điện và dẫn nhiệt kém."],
    ["Sulfur dioxide (SO₂) có tính chất hoá học đặc trưng nào?", "Vừa có tính oxi hoá, vừa có tính khử", "Chỉ có tính acid rất mạnh", "Không phản ứng với chất nào", "SO₂ làm mất màu dung dịch bromine và cánh hoa hồng (tính tẩy màu)."],
    ["SO₂ là oxide acid; khi tan trong nước tạo thành acid nào?", "Sulfurous acid (H₂SO₃), acid yếu", "Sulfuric acid (H₂SO₄)", "Hydrochloric acid (HCl)", "SO₂ + H₂O ⇌ H₂SO₃; H₂SO₃ là acid yếu, không bền."],
    ["Sulfuric acid (H₂SO₄) đặc có tính chất nguy hiểm đặc trưng nào?", "Tính háo nước mạnh và oxi hoá mạnh, gây bỏng nặng", "Dễ bay hơi và có mùi thơm dễ chịu", "Không phản ứng với kim loại nào", "Pha loãng phải rót từ từ acid đặc vào nước, tuyệt đối không làm ngược lại."],
    ["H₂SO₄ loãng thể hiện tính chất của một acid mạnh điển hình nào?", "Quỳ đỏ, tác dụng kim loại trước H tạo H₂", "Oxi hoá được cả vàng và bạch kim", "Làm than hoá đường ngay lập tức", "Tính oxi hoá mạnh và háo nước là của H₂SO₄ đặc, nóng."],
    ["H₂SO₄ đặc có thể làm than hoá đường, giấy, vải do tính chất nào?", "Tính háo nước: hút nước khỏi hợp chất hữu cơ", "Tính acid yếu của nó", "Tính dễ bay hơi của nó", "Đường bị H₂SO₄ đặc hút nước chỉ còn lại carbon màu đen."],
    ["Để nhận biết ion sulfate (SO₄²⁻), dùng thuốc thử nào?", "Dung dịch BaCl₂ (hoặc Ba²⁺): kết tủa trắng BaSO₄", "Dung dịch AgNO₃: kết tủa trắng AgCl", "Quỳ tím hoá đỏ", "BaSO₄ là kết tủa trắng không tan trong acid mạnh."],
    ["Muối sulfate nào được dùng làm Thạch cao trong xây dựng và y tế?", "Calcium sulfate (CaSO₄·2H₂O là thạch cao sống)", "Barium sulfate (BaSO₄)", "Copper(II) sulfate (CuSO₄)", "Thạch cao nung (CaSO₄·0,5H₂O) trộn nước sẽ đông cứng lại."],
    ["Copper(II) sulfate khan màu trắng dùng để làm gì?", "Nhận biết nước: gặp nước chuyển màu xanh", "Làm phân bón kali cho cây", "Tẩy trắng vải và giấy", "CuSO₄·5H₂O màu xanh lam; dạng khan hút nước chuyển xanh."],
    ["Trong công nghiệp, NH₃ được tổng hợp từ những chất nào và bằng quá trình gì?", "Từ N₂ và H₂, quá trình Haber, xúc tác Fe", "Từ HNO₃ và H₂, quá trình Ostwald", "Từ không khí và than đá nung chảy", "Điều kiện Haber: nhiệt độ cao, áp suất cao, xúc tác sắt."],
    ["Nitrogen trong tự nhiên được cây hấp thụ chủ yếu ở dạng nào?", "Ion nitrate (NO₃⁻) và ion ammonium (NH₄⁺)", "Khí N₂ tự do trong không khí", "Khí ammonia (NH₃) khô", "Chỉ một số vi sinh vật cố định được N₂ thành hợp chất cây dùng được."],
    ["Vì sao không nên bón phân đạm ammonium cùng lúc với vôi bột?", "Vôi (base) đẩy NH₃ bay hơi, mất đạm", "Vôi làm phân đạm bốc cháy", "Vôi làm đất chuyển thành acid mạnh", "NH₄⁺ + OH⁻ → NH₃↑ + H₂O nên đạm bị thất thoát dưới dạng khí."],
    ["Sulfur được ứng dụng phổ biến nhất trong sản xuất chất nào?", "Sản xuất sulfuric acid (H₂SO₄)", "Sản xuất ammonia (NH₃)", "Sản xuất phân kali", "H₂SO₄ là hoá chất công nghiệp quan trọng hàng đầu, sản xuất từ sulfur."],
    ["Quá trình sản xuất H₂SO₄ từ sulfur gồm giai đoạn oxi hoá SO₂ thành gì?", "SO₃, xúc tác V₂O₅, rồi hấp thụ tạo H₂SO₄", "SO, xúc tác sắt, rồi hoà tan nước", "H₂S, xúc tác niken, rồi đốt cháy", "S → SO₂ → SO₃ → H₂SO₄ là sơ đồ sản xuất acid sulfuric công nghiệp."]
  ];
  var hh11c2P = [["N₂", "Nitrogen"], ["NH₃", "Ammonia"], ["HNO₃", "Nitric acid"], ["H₂SO₄", "Sulfuric acid"], ["SO₂", "Sulfur dioxide"], ["NO₂", "Nitrogen dioxide"], ["(NH₄)₂SO₄", "Amoni sulfate"], ["NH₄NO₃", "Amoni nitrate"], ["CuSO₄·5H₂O", "Đồng(II) sulfate ngậm nước"], ["BaSO₄", "Bari sulfate (kết tủa trắng)"]];
  var hh11c3F = [
    ["Hợp chất hữu cơ là hợp chất của nguyên tố nào?", "Hợp chất của carbon (trừ CO, CO₂, muối carbonate…)", "Hợp chất của oxygen", "Hợp chất của hydrogen", "Hoá học hữu cơ là ngành hoá học nghiên cứu hợp chất của carbon."],
    ["Đặc điểm chung của hầu hết hợp chất hữu cơ là gì?", "Dễ cháy, kém bền nhiệt, phản ứng thường chậm", "Rất bền nhiệt, không bao giờ cháy", "Tan tốt và phân li mạnh trong nước", "Liên kết trong hợp chất hữu cơ chủ yếu là liên kết cộng hoá trị."],
    ["Liên kết hoá học chủ yếu trong hợp chất hữu cơ là loại nào?", "Liên kết cộng hoá trị", "Liên kết ion", "Liên kết kim loại", "Vì vậy hợp chất hữu cơ thường có nhiệt độ nóng chảy, sôi thấp."],
    ["Nhóm chức là gì?", "Nguyên tử/nhóm nguyên tử gây tính chất đặc trưng", "Toàn bộ phần hydrocarbon của phân tử", "Số nguyên tử carbon trong phân tử", "Ví dụ nhóm –OH gây tính chất của alcohol, –COOH của carboxylic acid."],
    ["Đồng đẳng là hiện tượng thế nào?", "Cùng dãy, hơn kém nhau một hay nhiều nhóm CH₂", "Có cùng công thức phân tử, khác cấu tạo", "Có cùng khối lượng phân tử chính xác", "Các chất đồng đẳng có tính chất hoá học tương tự nhau."],
    ["Đồng phân là hiện tượng thế nào?", "Cùng công thức phân tử nhưng khác cấu tạo", "Hơn kém nhau một nhóm CH₂", "Cùng cấu tạo nhưng khác khối lượng", "Đồng phân khác cấu tạo nên có tính chất khác nhau."],
    ["Công thức phân tử cho biết thông tin gì?", "Số nguyên tử mỗi nguyên tố trong một phân tử", "Cách liên kết giữa các nguyên tử", "Hình dạng không gian của phân tử", "Ví dụ công thức phân tử của glucose là C₆H₁₂O₆."],
    ["Công thức đơn giản nhất (thực nghiệm) cho biết điều gì?", "Tỉ lệ tối giản số nguyên tử các nguyên tố", "Tổng số nguyên tử trong phân tử", "Thứ tự liên kết các nguyên tử", "Ví dụ CH₂O là công thức đơn giản nhất của glucose C₆H₁₂O₆."],
    ["Công thức cấu tạo cho biết thông tin gì?", "Thứ tự và cách liên kết giữa các nguyên tử", "Chỉ số nguyên tử mỗi nguyên tố", "Khối lượng phân tử của chất", "Công thức cấu tạo có dạng khai triển, thu gọn và khung carbon."],
    ["Phương pháp chưng cất dùng để tách chất dựa trên sự khác nhau về tính chất nào?", "Nhiệt độ sôi của các chất lỏng", "Độ tan trong nước", "Khối lượng riêng và màu sắc", "Chưng cất tách rượu khỏi hỗn hợp lên men hoặc tách các chất lỏng."],
    ["Phương pháp chiết dùng để tách chất dựa trên nguyên tắc nào?", "Độ tan khác nhau trong hai dung môi không trộn lẫn", "Nhiệt độ sôi khác nhau", "Kích thước hạt khác nhau", "Chiết lỏng – lỏng và chiết lỏng – rắn đều dựa trên sự phân bố chất tan."],
    ["Phương pháp kết tinh lại dùng để làm gì?", "Tinh chế chất rắn dựa vào độ tan thay đổi theo nhiệt độ", "Tách hai chất lỏng dễ bay hơi", "Tách chất khí khỏi hỗn hợp", "Hoà tan nóng, lọc, làm lạnh để chất cần tinh chế kết tinh lại."],
    ["Phương pháp sắc kí dựa trên nguyên tắc nào?", "Các chất di chuyển với tốc độ khác nhau trên pha tĩnh", "Các chất có nhiệt độ sôi khác nhau", "Các chất có độ cứng khác nhau", "Sắc kí cột, sắc kí lớp mỏng dùng phân tích và tinh chế chất hữu cơ."],
    ["Phổ hồng ngoại (IR) được dùng để xác định điều gì trong phân tử hữu cơ?", "Các nhóm chức đặc trưng có trong phân tử", "Khối lượng phân tử chính xác", "Số đồng vị của carbon", "Mỗi nhóm chức hấp thụ bức xạ IR ở vùng số sóng đặc trưng."],
    ["Phổ khối lượng (MS) giúp xác định đại lượng nào của hợp chất?", "Khối lượng phân tử (phân tử khối)", "Nhiệt độ sôi của hợp chất", "Màu sắc của hợp chất", "Peak ion phân tử trong phổ MS cho giá trị phân tử khối của chất."],
    ["Thuyết cấu tạo hoá học nêu: tính chất của chất phụ thuộc vào những gì?", "Thành phần phân tử và thứ tự liên kết các nguyên tử", "Chỉ phụ thuộc vào khối lượng phân tử", "Chỉ phụ thuộc vào màu sắc của chất", "Thuyết do Butlerov đề xuất, là nền tảng của hoá học hữu cơ."],
    ["Trong phân tử hữu cơ, carbon luôn có hoá trị mấy?", "Hoá trị IV (tạo bốn liên kết cộng hoá trị)", "Hoá trị II", "Hoá trị I", "Carbon tạo được liên kết đơn, đôi, ba và mạch vòng phong phú."],
    ["Mạch carbon trong hợp chất hữu cơ có những dạng nào?", "Mạch hở thẳng, mạch hở phân nhánh và mạch vòng", "Chỉ có mạch thẳng duy nhất", "Chỉ có mạch vòng duy nhất", "Sự đa dạng mạch carbon là nguyên nhân có rất nhiều hợp chất hữu cơ."],
    ["Hydrocarbon là hợp chất hữu cơ có thành phần thế nào?", "Chỉ gồm hai nguyên tố carbon và hydrogen", "Gồm carbon, hydrogen và oxygen", "Gồm carbon và oxygen", "Ví dụ hydrocarbon: CH₄, C₂H₄, C₆H₆; dẫn xuất chứa thêm nguyên tố khác."],
    ["Dẫn xuất của hydrocarbon là hợp chất thế nào?", "Thay H bằng nguyên tử/nhóm nguyên tử khác", "Chỉ gồm carbon và hydrogen", "Không chứa nguyên tử carbon nào", "Ví dụ dẫn xuất: C₂H₅OH, CH₃COOH, CH₃Cl."],
    ["Phản ứng đặc trưng để xác định phần trăm nguyên tố trong hợp chất hữu cơ là gì?", "Phân tích nguyên tố (đốt cháy, đo sản phẩm)", "Phản ứng tráng bạc", "Phản ứng với quỳ tím", "Phân tích định tính và định lượng nguyên tố là bước đầu xác định công thức."],
    ["Khi đốt cháy hoàn toàn hợp chất hữu cơ chứa C, H, sản phẩm luôn có những chất nào?", "CO₂ và H₂O", "CO và H₂", "C và H₂O", "Từ khối lượng CO₂ suy ra lượng C, từ H₂O suy ra lượng H trong mẫu."],
    ["Chất hữu cơ CₓH_yO_z có phân tử khối 60 và 40% C, 6,67% H; phần còn lại là O. Số nguyên tử O là bao nhiêu?", "2 nguyên tử O", "1 nguyên tử O", "3 nguyên tử O", "Khối lượng O = 60 × 53,33% = 32 → 2 nguyên tử O; chất là C₂H₄O₂."],
    ["Liên kết σ (sigma) và liên kết π (pi) khác nhau cơ bản ở điểm nào?", "σ bền hơn π; π dễ bị phá vỡ trong phản ứng cộng", "π bền hơn σ trong mọi trường hợp", "Hai loại liên kết hoàn toàn giống nhau", "Liên kết đôi gồm 1σ + 1π; liên kết ba gồm 1σ + 2π."],
    ["Gốc hydrocarbon (gốc alkyl) được tạo thành thế nào?", "Bớt một nguyên tử H khỏi phân tử alkane", "Bớt một nguyên tử C khỏi phân tử alkane", "Thêm một nguyên tử O vào alkane", "Ví dụ CH₄ bớt 1H cho gốc methyl –CH₃; C₂H₆ cho gốc ethyl –C₂H₅."],
    ["Vì sao số lượng hợp chất hữu cơ rất lớn, lên tới hàng chục triệu chất?", "Carbon liên kết đa dạng: mạch, vòng, liên kết bội, đồng phân", "Vì carbon là nguyên tố phổ biến nhất vũ trụ", "Vì mọi chất đều chứa carbon", "Hiện tượng đồng phân và đồng đẳng làm số hợp chất hữu cơ tăng vọt."]
  ];
  var hh11c3P = [["–OH", "Nhóm chức alcohol"], ["–COOH", "Nhóm chức carboxylic acid"], ["–CHO", "Nhóm chức aldehyde"], ["–NH₂", "Nhóm chức amine"], ["C₆H₁₂O₆", "Công thức phân tử của glucose"], ["–CH₃", "Gốc methyl"], ["–C₂H₅", "Gốc ethyl"], ["Chưng cất", "Tách theo nhiệt độ sôi"], ["Chiết", "Tách theo độ tan khác nhau"], ["Kết tinh lại", "Tinh chế chất rắn theo độ tan"]];
  var hh11c4F = [
    ["Alkane là hydrocarbon có đặc điểm cấu tạo nào?", "No, mạch hở, chỉ có liên kết đơn C–C và C–H", "Có một liên kết đôi C=C trong phân tử", "Có vòng benzene trong phân tử", "Alkane còn gọi là parafin, công thức chung CₙH₂ₙ₊₂ (n ≥ 1)."],
    ["Công thức chung của dãy đồng đẳng alkane là gì?", "CₙH₂ₙ₊₂ (n ≥ 1)", "CₙH₂ₙ (n ≥ 2)", "CₙH₂ₙ₋₂ (n ≥ 2)", "CH₄, C₂H₆, C₃H₈, C₄H₁₀… là các alkane đầu dãy đồng đẳng."],
    ["Công thức chung của alkene là gì?", "CₙH₂ₙ (n ≥ 2), có một liên kết đôi C=C", "CₙH₂ₙ₊₂ (n ≥ 1)", "CₙH₂ₙ₋₂ (n ≥ 2)", "Alkene đơn giản nhất là ethylene C₂H₄."],
    ["Công thức chung của alkyne là gì?", "CₙH₂ₙ₋₂ (n ≥ 2), có một liên kết ba C≡C", "CₙH₂ₙ (n ≥ 2)", "CₙH₂ₙ₊₂ (n ≥ 1)", "Alkyne đơn giản nhất là acetylene C₂H₂."],
    ["Arene là hydrocarbon có đặc điểm cấu tạo nào?", "Có vòng benzene trong phân tử", "Chỉ có liên kết đơn mạch hở", "Có một liên kết ba mạch hở", "Arene đơn giản nhất là benzene C₆H₆."],
    ["Phản ứng đặc trưng của alkane là phản ứng nào?", "Phản ứng thế (với halogen khi chiếu sáng/nhiệt)", "Phản ứng cộng với dung dịch bromine", "Phản ứng trùng hợp tạo polymer", "Alkane kém hoạt động, không làm mất màu nước bromine."],
    ["Phản ứng đặc trưng của alkene và alkyne là phản ứng nào?", "Phản ứng cộng (cộng H₂, Br₂, HX, H₂O…)", "Phản ứng thế với halogen ở điều kiện thường", "Phản ứng cháy không hoàn toàn duy nhất", "Liên kết π kém bền nên dễ tham gia phản ứng cộng."],
    ["Dung dịch bromine (nước Br₂) được dùng để nhận biết chất nào?", "Hydrocarbon không no: alkene, alkyne làm mất màu", "Alkane làm mất màu ngay lập tức", "Benzene làm mất màu nhanh ở thường", "Alkene/alkyne làm mất màu nâu đỏ của nước bromine."],
    ["Phản ứng trùng hợp của ethylene tạo thành sản phẩm gì?", "Polyethylene (PE) – chất dẻo phổ biến", "Polyvinyl chloride (PVC)", "Cao su thiên nhiên tổng hợp", "nCH₂=CH₂ → –(CH₂–CH₂)ₙ– dưới xúc tác, nhiệt độ, áp suất."],
    ["Quy tắc Markovnikov áp dụng cho loại phản ứng nào?", "Cộng HX vào alkene bất đối xứng", "Thế halogen vào alkane", "Đốt cháy hydrocarbon", "H cộng vào carbon nhiều H hơn, X vào carbon ít H hơn của nối đôi."],
    ["Acetylene (C₂H₂) cháy trong oxygen cho ngọn lửa thế nào, ứng dụng gì?", "Ngọn lửa rất nóng, dùng đèn xì hàn cắt kim loại", "Ngọn lửa yếu, dùng thắp sáng nhà ở", "Không cháy trong oxygen", "Phản ứng cháy acetylene toả nhiệt rất lớn, nhiệt độ tới ~3000 °C."],
    ["Để nhận biết alkyne có liên kết ba đầu mạch (như acetylene), dùng thuốc thử nào?", "Dung dịch AgNO₃/NH₃: kết tủa vàng AgC≡CAg", "Dung dịch BaCl₂: kết tủa trắng", "Quỳ tím hoá xanh rõ rệt", "Alkyne đầu mạch có H linh động nên phản ứng với AgNO₃ trong NH₃."],
    ["Benzene (C₆H₆) có phản ứng đặc trưng nào với bromine khan, xúc tác FeBr₃?", "Phản ứng thế: tạo bromobenzene và HBr", "Phản ứng cộng làm mất màu Br₂ ngay", "Không phản ứng trong mọi điều kiện", "Vòng benzene bền nên ưu tiên phản ứng thế, giữ nguyên vòng thơm."],
    ["Benzene có làm mất màu dung dịch bromine ở điều kiện thường không?", "Không, benzene không cộng Br₂ ở điều kiện thường", "Có, mất màu ngay như ethylene", "Có, nhưng cần chiếu sáng mạnh", "Đây là điểm phân biệt benzene với alkene dù benzene không no cao."],
    ["Phản ứng cracking alkane dài có mục đích gì?", "Bẻ gãy alkane dài thành alkane ngắn và alkene", "Nối dài mạch carbon của alkane", "Biến alkane thành benzene trực tiếp", "Cracking xăng dầu làm tăng lượng xăng và tạo nguyên liệu hoá dầu."],
    ["Phản ứng reforming (rifominh) alkane nhằm mục đích gì?", "Tạo hydrocarbon thơm và alkane nhánh, tăng chỉ số octane", "Tạo thêm nhiều alkane mạch thẳng dài", "Loại bỏ hoàn toàn carbon khỏi xăng", "Reforming cải thiện chất lượng xăng dùng cho động cơ."],
    ["Khí thiên nhiên và khí mỏ dầu chứa chủ yếu hydrocarbon nào?", "Methane (CH₄) chiếm thành phần chính", "Ethylene (C₂H₄) chiếm thành phần chính", "Benzene (C₆H₆) chiếm thành phần chính", "Khí thiên nhiên thường chứa 70–95% methane."],
    ["Sản phẩm cháy hoàn toàn của mọi hydrocarbon là gì?", "CO₂ và H₂O", "CO và H₂", "C và CO₂", "Cháy không hoàn toàn (thiếu O₂) tạo thêm CO độc và muội than C."],
    ["Toluene (methylbenzene) là arene có công thức thế nào?", "C₆H₅CH₃ (C₇H₈), vòng benzene gắn nhóm –CH₃", "C₆H₆ không có nhóm thế nào", "C₆H₅OH có nhóm –OH gắn vòng", "Toluene là dung môi hữu cơ phổ biến, dễ thế hơn benzene."],
    ["Styrene là hợp chất thơm có nhóm thế nào trên vòng benzene?", "Nhóm vinyl –CH=CH₂, dùng trùng hợp tạo PS", "Nhóm –OH tạo thành phenol", "Nhóm –COOH tạo acid thơm", "Polystyrene (PS) là nhựa xốp, hộp đựng thực phẩm dùng một lần."],
    ["Để phân biệt hexane (alkane) và hex-1-ene (alkene), dùng thuốc thử nào?", "Nước bromine: hexene làm mất màu, hexane không", "Quỳ tím: cả hai đều đổi màu khác nhau", "Dung dịch NaOH: hexene tạo kết tủa", "Chỉ hydrocarbon không no mới cộng Br₂ làm mất màu dung dịch."],
    ["Ethylene được ứng dụng trong nông nghiệp ở vai trò gì?", "Khí làm quả chín nhanh (hormone thực vật dạng khí)", "Phân bón cung cấp đạm cho cây", "Thuốc trừ sâu diệt côn trùng", "Ethylene sinh ra tự nhiên khi quả chín và kích thích quả khác chín theo."],
    ["Phản ứng đốt cháy alkane cần điều kiện và cho sản phẩm thế nào khi đủ oxygen?", "Cháy hoàn toàn, toả nhiều nhiệt, tạo CO₂ và H₂O", "Không toả nhiệt, tạo C và H₂", "Tạo acid hữu cơ và muối", "Vì toả nhiệt lớn nên alkane là nhiên liệu quan trọng (gas, xăng, dầu)."],
    ["Tên gọi của alkane C₃H₈ và C₄H₁₀ lần lượt là gì?", "Propane và butane", "Ethane và pentane", "Methane và hexane", "Propane + butane hoá lỏng tạo khí gas LPG dùng đun nấu."],
    ["Xăng là hỗn hợp hydrocarbon chủ yếu thuộc khoảng carbon nào?", "Khoảng C₅–C₁₂, chủ yếu là alkane và arene", "Chủ yếu là C₁–C₄ dạng khí", "Chủ yếu là C₂₀ trở lên dạng rắn", "Dầu diesel chứa hydrocarbon nặng hơn, khoảng C₁₀–C₂₀."],
    ["Chỉ số octane của xăng cho biết điều gì?", "Khả năng chống kích nổ của xăng trong động cơ", "Hàm lượng chì có trong xăng", "Nhiệt độ sôi chính xác của xăng", "Xăng có chỉ số octane càng cao càng khó bị cháy kích nổ sớm."]
  ];
  var hh11c4P = [["CH₄", "Metan"], ["C₂H₆", "Etan"], ["C₃H₈", "Propan"], ["C₂H₄", "Eten (etilen)"], ["C₃H₆", "Propen"], ["C₂H₂", "Axetilen (etin)"], ["C₆H₆", "Benzen"], ["C₆H₅CH₃", "Toluen"], ["CₙH₂ₙ₊₂", "Công thức chung alkane"], ["CₙH₂ₙ", "Công thức chung alkene"]];
  var hh11c5F = [
    ["Dẫn xuất halogen là hợp chất hữu cơ thế nào?", "Thay một hay nhiều H bằng nguyên tử halogen", "Chỉ gồm carbon và hydrogen", "Chứa nhóm –OH gắn vào carbon no", "Ví dụ dẫn xuất halogen: CH₃Cl, C₂H₅Br, CHCl₃."],
    ["Chloroform (CHCl₃) và DDT thuộc nhóm hợp chất nào?", "Dẫn xuất halogen của hydrocarbon", "Alcohol đa chức", "Hợp chất carbonyl", "Nhiều dẫn xuất halogen bền, khó phân huỷ nên cần kiểm soát môi trường."],
    ["Alcohol là hợp chất hữu cơ có nhóm chức nào?", "Nhóm –OH gắn vào carbon no (gốc hydrocarbon)", "Nhóm –COOH ở đầu mạch", "Nhóm –CHO ở đầu mạch", "Ví dụ alcohol: CH₃OH (methanol), C₂H₅OH (ethanol)."],
    ["Ethanol (C₂H₅OH) có tính chất vật lí nào?", "Chất lỏng, tan vô hạn trong nước, sôi ~78 °C", "Chất khí không tan trong nước", "Chất rắn màu trắng, không mùi", "Ethanol là thành phần chính của cồn và đồ uống có cồn."],
    ["Methanol (CH₃OH) nguy hiểm ở điểm nào?", "Rất độc, uống phải gây mù mắt, tử vong", "Hoàn toàn vô hại như ethanol", "Chỉ gây cay mắt nhẹ tạm thời", "Rượu giả pha methanol là nguyên nhân nhiều vụ ngộ độc rượu."],
    ["Ethanol được sản xuất bằng phương pháp sinh học nào?", "Lên men glucose/tinh bột nhờ men rượu", "Chưng cất trực tiếp dầu mỏ", "Tổng hợp từ CO₂ và H₂ ở thường", "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ là phương trình lên men rượu."],
    ["Ethanol cũng được tổng hợp công nghiệp bằng phản ứng nào?", "Cộng nước vào ethylene, xúc tác acid, nhiệt độ cao", "Thuỷ phân benzene trong nước", "Đốt cháy methane trong oxygen", "CH₂=CH₂ + H₂O → C₂H₅OH là con đường hoá dầu sản xuất ethanol."],
    ["Alcohol tác dụng với kim loại kiềm (Na) tạo sản phẩm gì?", "Giải phóng khí H₂, tạo muối alcoholate", "Tạo kết tủa trắng ngay lập tức", "Không có phản ứng nào xảy ra", "2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑; phản ứng nhẹ hơn Na với nước."],
    ["Phản ứng tách nước của ethanol ở 170 °C, H₂SO₄ đặc, tạo chất gì?", "Ethylene (C₂H₄) – phản ứng tách nước nội phân tử", "Diethyl ether – ở nhiệt độ thấp hơn", "Acetic acid ngay lập tức", "Ở ~140 °C, tách nước liên phân tử tạo diethyl ether."],
    ["Oxi hoá không hoàn toàn ethanol bằng CuO nung nóng tạo chất gì?", "Acetaldehyde (CH₃CHO)", "Acetic acid ngay từ đầu", "CO₂ và H₂O hoàn toàn", "Oxi hoá mạnh hơn (KMnO₄…) ethanol chuyển tiếp thành acetic acid."],
    ["Glycerol là alcohol có đặc điểm cấu tạo nào?", "Alcohol đa chức: C₃H₅(OH)₃, ba nhóm –OH", "Alcohol đơn chức chỉ một –OH", "Không chứa nhóm –OH nào", "Glycerol sánh, ngọt, dùng trong mĩ phẩm và thực phẩm."],
    ["Để nhận biết alcohol đa chức có nhóm –OH kề nhau (như glycerol), dùng thuốc thử nào?", "Cu(OH)₂: tạo dung dịch xanh lam trong suốt", "Nước bromine: mất màu ngay", "Quỳ tím: hoá đỏ rõ rệt", "Glycerol và ethylene glycol đều hoà tan Cu(OH)₂ tạo phức xanh lam."],
    ["Phenol (C₆H₅OH) khác alcohol ở điểm cấu tạo nào?", "Nhóm –OH gắn trực tiếp vào vòng benzene", "Nhóm –OH gắn vào carbon no", "Không chứa nguyên tử oxygen", "Do gắn vòng thơm nên phenol có tính acid yếu, khác hẳn alcohol."],
    ["Phenol có tính acid thế nào so với ethanol?", "Phenol có tính acid yếu, ethanol gần như không có", "Ethanol có tính acid mạnh hơn phenol", "Cả hai đều là acid mạnh", "Phenol tác dụng được NaOH, ethanol thì không."],
    ["Phenol tác dụng với dung dịch NaOH tạo sản phẩm gì?", "Muối sodium phenolate và nước", "Khí H₂ và phenolate", "Không phản ứng với NaOH", "C₆H₅OH + NaOH → C₆H₅ONa + H₂O chứng tỏ phenol có tính acid."],
    ["Thuốc thử đặc trưng để nhận biết phenol là gì?", "Nước bromine: kết tủa trắng 2,4,6-tribromophenol", "Dung dịch AgNO₃/NH₃: gương bạc", "Cu(OH)₂: dung dịch xanh lam", "Phenol làm mất màu nước Br₂ đồng thời tạo kết tủa trắng."],
    ["Phenol có độc tính và tác dụng lên da thế nào?", "Độc, gây bỏng da, cần tránh tiếp xúc trực tiếp", "Hoàn toàn an toàn cho da", "Chỉ dùng uống trực tiếp làm thuốc", "Phenol dùng làm chất sát trùng, nguyên liệu sản xuất nhựa phenol-formaldehyde."],
    ["Theo bậc alcohol, alcohol bậc I có đặc điểm gì?", "Carbon mang –OH gắn với tối đa một gốc alkyl khác", "Carbon mang –OH gắn với hai gốc alkyl", "Carbon mang –OH gắn với ba gốc alkyl", "Ví dụ ethanol là alcohol bậc I; isopropanol là bậc II."],
    ["Độ rượu (độ cồn) cho biết điều gì?", "Số mL ethanol nguyên chất trong 100 mL dung dịch", "Số gam ethanol trong 1 lít dung dịch", "Phần trăm khối lượng ethanol", "Ví dụ cồn 70° chứa 70 mL ethanol trong 100 mL dung dịch."],
    ["Vì sao ethanol tan vô hạn trong nước còn phenol ít tan?", "Ethanol tạo liên kết hydrogen mạnh, phân tử nhỏ gọn", "Phenol có khối lượng phân tử nhỏ hơn", "Ethanol không tạo liên kết hydrogen", "Gốc phenyl lớn, kị nước làm phenol chỉ tan ít trong nước lạnh."],
    ["Phản ứng thuỷ phân dẫn xuất halogen trong NaOH đun nóng tạo sản phẩm gì?", "Alcohol tương ứng và muối halide", "Alkene và nước tinh khiết", "Acid carboxylic ngay lập tức", "R–Cl + NaOH → R–OH + NaCl là cách điều chế alcohol từ dẫn xuất halogen."],
    ["Dẫn xuất halogen đun với NaOH trong ethanol thường cho phản ứng gì?", "Tách HX tạo alkene (quy tắc Zaitsev)", "Thế halogen bằng –OH luôn luôn", "Không phản ứng gì xảy ra", "Môi trường nước ưu tiên thế, môi trường alcohol ưu tiên tách."],
    ["Cồn 70° sát khuẩn hiệu quả hơn cồn tuyệt đối vì sao?", "Nước giúp cồn thấm, biến tính protein vi khuẩn tốt hơn", "Cồn tuyệt đối chứa nhiều nước hơn", "Cồn 70° rẻ hơn nên dùng nhiều hơn", "Cồn quá đặc làm protein bề mặt đông cứng, cản cồn thấm sâu."],
    ["Ứng dụng quan trọng của ethylene glycol (HOCH₂–CH₂OH) là gì?", "Chất chống đông và nguyên liệu sản xuất nhựa PET", "Làm đồ uống có cồn phổ biến", "Làm thuốc sát trùng da tay", "Ethylene glycol là alcohol đa chức hai nhóm –OH kề nhau."],
    ["Freon (dẫn xuất chlorofluorocarbon) từng bị hạn chế sử dụng vì sao?", "Phá huỷ tầng ozone của khí quyển Trái Đất", "Gây cháy nổ rất mạnh khi rò rỉ", "Làm tăng độ acid của đất nhanh", "Các chất CFC bị thay thế dần theo Nghị định thư Montreal."],
    ["Nhựa phenol-formaldehyde (bakelite) được tạo từ những nguyên liệu nào?", "Phenol và formaldehyde trùng ngưng với nhau", "Ethylene trùng hợp ở áp suất cao", "Glycerol và acid béo đun nóng", "Bakelite là nhựa nhiệt rắn đầu tiên, cách điện tốt, dùng làm vỏ thiết bị điện."]
  ];
  var hh11c5P = [["CH₃OH", "Metanol"], ["C₂H₅OH", "Etanol"], ["C₃H₅(OH)₃", "Glycerol"], ["C₆H₅OH", "Phenol"], ["CH₃Cl", "Clorometan"], ["C₂H₅Br", "Bromoetan"], ["CHCl₃", "Cloroform"], ["HOCH₂–CH₂OH", "Etilen glicol"]];
  var hh11c6F = [
    ["Hợp chất carbonyl là hợp chất chứa nhóm chức nào?", "Nhóm carbonyl C=O (>C=O) trong phân tử", "Nhóm –OH gắn vào carbon no", "Nhóm –COOH ở cuối mạch", "Aldehyde và ketone đều là hợp chất carbonyl."],
    ["Aldehyde là hợp chất có nhóm chức nào?", "Nhóm –CHO, carbonyl gắn với ít nhất một H", "Nhóm –COOH chứa hai nguyên tử O", "Nhóm carbonyl giữa hai gốc hydrocarbon", "Ví dụ aldehyde: HCHO (formaldehyde), CH₃CHO (acetaldehyde)."],
    ["Ketone là hợp chất có nhóm chức nào?", "Nhóm carbonyl C=O gắn với hai gốc hydrocarbon", "Nhóm –CHO ở đầu mạch carbon", "Nhóm –OH gắn với vòng benzene", "Ví dụ ketone đơn giản nhất là acetone (propanone) CH₃COCH₃."],
    ["Formaldehyde (HCHO) có ứng dụng và tính chất gì nổi bật?", "Khí độc; dung dịch 37–40% (formon) bảo quản mẫu vật", "Chất lỏng ngọt, dùng làm thực phẩm", "Hoàn toàn vô hại với sức khoẻ", "Formaldehyde còn là nguyên liệu sản xuất nhựa, keo dán gỗ công nghiệp."],
    ["Acetaldehyde (CH₃CHO) là chất thế nào và có ở đâu?", "Chất lỏng dễ bay hơi, sản phẩm trung gian chuyển hoá rượu", "Chất rắn kết tinh màu trắng bền", "Khí trơ không phản ứng hoá học", "Acetaldehyde tích tụ khi uống rượu gây cảm giác khó chịu, mệt mỏi."],
    ["Acetone (propanone) được dùng phổ biến làm gì?", "Dung môi: tẩy sơn móng tay, hoà tan nhựa, sơn", "Chất bảo quản thực phẩm chính", "Phân bón cho cây trồng", "Acetone là chất lỏng dễ cháy, bay hơi nhanh, tan vô hạn trong nước."],
    ["Phản ứng tráng bạc (tráng gương) là phản ứng đặc trưng của nhóm chất nào?", "Aldehyde, với thuốc thử Tollens (AgNO₃/NH₃)", "Ketone, với thuốc thử Tollens", "Alcohol bậc III, với Cu(OH)₂", "Aldehyde bị oxi hoá tạo muối ammonium carboxylate và bạc kim loại sáng."],
    ["Aldehyde tác dụng Cu(OH)₂ đun nóng cho hiện tượng gì?", "Kết tủa đỏ gạch Cu₂O (thuốc thử Fehling/Benedict)", "Dung dịch xanh lam trong suốt mãi", "Kết tủa trắng không tan", "Đây cũng là phản ứng nhận biết aldehyde và glucose."],
    ["Ketone có tham gia phản ứng tráng bạc như aldehyde không?", "Không, ketone không bị oxi hoá bởi Tollens", "Có, cho gương bạc như aldehyde", "Có, nhưng tạo kết tủa đen", "Tính chất này phân biệt aldehyde với ketone."],
    ["Khử aldehyde bằng H₂ (xúc tác Ni, nhiệt độ) tạo sản phẩm gì?", "Alcohol bậc I tương ứng", "Ketone tương ứng", "Carboxylic acid tương ứng", "Ngược lại, oxi hoá nhẹ alcohol bậc I tạo aldehyde."],
    ["Oxi hoá aldehyde tạo thành sản phẩm gì?", "Carboxylic acid tương ứng", "Ketone tương ứng", "Alcohol bậc II", "Ví dụ CH₃CHO bị oxi hoá thành CH₃COOH (acetic acid)."],
    ["Carboxylic acid là hợp chất có nhóm chức nào?", "Nhóm carboxyl –COOH", "Nhóm –CHO ở đầu mạch", "Nhóm –OH đơn độc", "Ví dụ: HCOOH (formic acid), CH₃COOH (acetic acid)."],
    ["Acetic acid (CH₃COOH) có trong sản phẩm quen thuộc nào?", "Giấm ăn (dung dịch acetic acid 2–5%)", "Nước ngọt có gas", "Sữa tươi nguyên chất", "Acetic acid đặc nguyên chất gọi là acid băng vì dễ đông ở 16,6 °C."],
    ["Formic acid (HCOOH) có trong tự nhiên ở đâu?", "Trong nọc kiến và một số côn trùng, lá cây tầm ma", "Trong nước biển và muối ăn", "Trong sữa của động vật", "Tên formic acid bắt nguồn từ tiếng Latin chỉ con kiến (formica)."],
    ["Carboxylic acid có tính acid thế nào so với phenol và alcohol?", "Mạnh hơn phenol và alcohol, làm quỳ tím hoá đỏ", "Yếu hơn cả alcohol", "Hoàn toàn không có tính acid", "Acid carboxylic vẫn là acid yếu so với HCl, H₂SO₄."],
    ["Acetic acid tác dụng với kim loại đứng trước H (như Zn, Mg) tạo sản phẩm gì?", "Tạo muối acetate và giải phóng khí H₂", "Không phản ứng với kim loại nào", "Tạo muối và khí CO₂", "2CH₃COOH + Zn → (CH₃COO)₂Zn + H₂↑ thể hiện tính acid điển hình."],
    ["Acetic acid tác dụng với CaCO₃ (đá vôi, vỏ trứng) cho hiện tượng gì?", "Sủi bọt khí CO₂, muối tan dần", "Kết tủa trắng bền vững", "Không có hiện tượng gì", "Phản ứng này dùng tẩy cặn ấm đun nước bằng giấm ăn."],
    ["Phản ứng ester hoá là phản ứng giữa những chất nào?", "Carboxylic acid và alcohol, xúc tác H₂SO₄ đặc, nhiệt", "Aldehyde và ketone với nhau", "Acid vô cơ mạnh và base mạnh", "Sản phẩm là ester và nước; phản ứng thuận nghịch cần hút nước."],
    ["Ester tạo thành từ acetic acid và ethanol có tên và mùi gì?", "Ethyl acetate, mùi thơm dễ chịu như trái cây", "Methyl salicylate, mùi dầu gió", "Isoamyl acetate, mùi chuối chín", "Nhiều ester có mùi thơm hoa quả, dùng làm hương liệu."],
    ["Phản ứng xà phòng hoá ester là phản ứng thế nào?", "Ester tác dụng dung dịch kiềm tạo muối và alcohol", "Ester cháy trong oxygen tạo CO₂", "Ester cộng H₂ vào nối đôi", "Thuỷ phân ester trong môi trường kiềm là không thuận nghịch."],
    ["Tên IUPAC của CH₃CHO và CH₃COOH lần lượt là gì?", "Ethanal và ethanoic acid", "Methanal và methanoic acid", "Propanal và propanoic acid", "HCHO là methanal; HCOOH là methanoic acid (formic acid)."],
    ["Sắp xếp tính acid tăng dần đúng là dãy nào?", "Ethanol < phenol < acetic acid", "Acetic acid < phenol < ethanol", "Phenol < ethanol < acetic acid", "Nhóm –COOH phân li H⁺ dễ nhất trong ba chất trên."],
    ["Aldehyde và ketone giống nhau ở điểm nào?", "Đều chứa nhóm carbonyl C=O và có phản ứng cộng H₂", "Đều cho phản ứng tráng bạc", "Đều có nhóm –CHO trong phân tử", "Cả hai đều bị khử tạo alcohol tương ứng."],
    ["Để phân biệt acetaldehyde và acetone, dùng thuốc thử nào đơn giản nhất?", "Thuốc thử Tollens: acetaldehyde tráng bạc, acetone không", "Quỳ tím: cả hai đổi màu khác hẳn", "Nước bromine: acetone mất màu ngay", "Chỉ aldehyde mới khử được ion Ag⁺ thành bạc kim loại."],
    ["Citric acid trong quả chanh thuộc nhóm hợp chất nào?", "Carboxylic acid hữu cơ đa chức (có 3 nhóm –COOH)", "Aldehyde thơm tự nhiên", "Alcohol đa chức no", "Citric acid tạo vị chua của chanh và nhiều quả họ cam quýt."],
    ["Stearic acid và oleic acid là những acid béo thuộc nhóm nào?", "Carboxylic acid mạch dài, thành phần của chất béo", "Aldehyde mạch dài thơm", "Ketone dùng làm dung môi", "Acid béo là nguyên liệu tạo xà phòng khi xà phòng hoá chất béo."]
  ];
  var hh11c6P = [["HCHO", "Metanal (fomanđehit)"], ["CH₃CHO", "Etanal (axetanđehit)"], ["CH₃COCH₃", "Propanon (axeton)"], ["HCOOH", "Axit metanoic (fomic)"], ["CH₃COOH", "Axit etanoic (axetic)"], ["CH₃COOC₂H₅", "Etyl axetat"], ["C₆H₅CHO", "Benzenđehit"], ["CH₃COCH₂CH₃", "Butanon"]];
  var hh11cd1F = [
    ["Phân bón hoá học cung cấp cho cây trồng chủ yếu những nguyên tố đa lượng nào?", "Nitrogen (N), phosphorus (P) và potassium (K)", "Sắt (Fe), kẽm (Zn) và đồng (Cu)", "Carbon (C), hydrogen (H) và oxygen (O)", "N, P, K là ba nguyên tố dinh dưỡng đa lượng quan trọng nhất."],
    ["Phân đạm cung cấp nguyên tố dinh dưỡng nào cho cây?", "Nitrogen (N), giúp cây sinh trưởng, xanh lá", "Phosphorus (P), giúp cây ra hoa", "Potassium (K), giúp cây cứng cáp", "Thiếu đạm cây còi cọc, lá vàng úa, năng suất thấp."],
    ["Urea là phân đạm phổ biến nhất có công thức và hàm lượng đạm thế nào?", "(NH₂)₂CO, chứa khoảng 46% N, cao nhất trong phân đạm rắn", "NH₄NO₃, chứa khoảng 35% N", "(NH₄)₂SO₄, chứa khoảng 21% N", "Urea tan tốt trong nước, được dùng rộng rãi cho lúa và cây trồng."],
    ["Phân lân cung cấp nguyên tố nào và có vai trò gì?", "Phosphorus (P): kích thích ra rễ, ra hoa, đậu quả", "Nitrogen (N): giúp lá xanh tốt", "Calcium (Ca): làm cứng thành tế bào", "Thiếu lân cây chậm lớn, lá có màu tím đỏ bất thường."],
    ["Superphosphate (supe lân) là phân lân chứa chất chính nào?", "Calcium dihydrogenphosphate Ca(H₂PO₄)₂ dễ tan", "Calcium phosphate Ca₃(PO₄)₂ khó tan", "Potassium chloride KCl tinh khiết", "Supe lân đơn còn chứa CaSO₄; supe lân kép giàu P₂O₅ hơn."],
    ["Phân kali cung cấp nguyên tố nào và có vai trò gì?", "Potassium (K): tăng cứng cây, chống đổ, ngọt quả", "Nitrogen (N): tăng trưởng lá nhanh", "Sulfur (S): tạo protein cho cây", "Phân kali phổ biến là KCl và K₂SO₄."],
    ["Phân bón NPK là loại phân gì?", "Phân hỗn hợp chứa đồng thời N, P và K theo tỉ lệ", "Phân chỉ chứa riêng nguyên tố nitrogen", "Phân hữu cơ ủ từ phân chuồng", "Kí hiệu như NPK 16-16-8 cho biết %N, %P₂O₅, %K₂O trong phân."],
    ["Phân ammonium sulfate ((NH₄)₂SO₄) ngoài đạm còn cung cấp thêm nguyên tố nào?", "Sulfur (S) cho cây trồng", "Potassium (K) cho cây trồng", "Calcium (Ca) cho cây trồng", "Phân này còn gọi là phân SA, làm chua đất nếu bón lâu dài."],
    ["Vì sao phân đạm ammonium không nên bón chung với vôi hoặc tro bếp (kiềm)?", "Mất đạm do NH₄⁺ gặp OH⁻ giải phóng khí NH₃", "Phân đạm sẽ bốc cháy ngay", "Đạm chuyển thành lân khó tan", "Bón vôi và bón đạm ammonium cần cách nhau một thời gian."],
    ["Phân bón hữu cơ có ưu điểm nổi bật nào so với phân hoá học?", "Cải tạo đất, tăng mùn, hệ vi sinh; hiệu quả chậm, bền", "Cung cấp dinh dưỡng nhanh và đậm đặc nhất", "Không chứa vi sinh vật nào", "Phân hữu cơ gồm phân chuồng, phân xanh, compost ủ hoai."],
    ["Nguyên tố vi lượng là những nguyên tố cây cần thế nào?", "Cần rất ít nhưng không thể thiếu (Fe, Zn, Mn, Cu, B…)", "Cần với lượng rất lớn mỗi vụ", "Cây hoàn toàn không cần đến", "Thiếu vi lượng cây vẫn có thể mắc bệnh sinh lí dù đủ NPK."],
    ["Bón phân quá liều gây ra những tác hại nào?", "Cháy cây, ô nhiễm nguồn nước, phú dưỡng ao hồ", "Cây luôn cho năng suất cao hơn mãi", "Không gây tác hại gì cho môi trường", "Nguyên tắc bón phân: đúng loại, đúng liều, đúng lúc, đúng cách."],
    ["Phân lân nung chảy thường dùng tốt cho loại đất nào?", "Đất chua, phèn vì phân có tính kiềm nhẹ", "Đất kiềm mạnh ven biển", "Đất cát hoàn toàn không giữ nước", "Phân lân nung chảy chứa Ca, Mg giúp khử chua cho đất."],
    ["Hàm lượng dinh dưỡng của phân lân thường quy đổi theo chất nào?", "Theo %P₂O₅ (diphosphorus pentoxide)", "Theo %P nguyên tố trực tiếp", "Theo %CaO trong phân", "Tương tự, phân kali quy đổi theo %K₂O để so sánh các loại phân."],
    ["Phân bón lá được sử dụng bằng cách nào?", "Phun dung dịch loãng lên lá để cây hấp thụ nhanh", "Bón trực tiếp vào gốc cây như phân thường", "Trộn vào hạt giống trước khi gieo", "Phân bón lá bổ sung nhanh vi lượng và đạm khi cây cần gấp."],
    ["Quặng apatite và phosphorite ở Việt Nam dùng làm nguyên liệu sản xuất phân gì?", "Phân lân (superphosphate và lân nung chảy)", "Phân đạm urea tổng hợp", "Phân kali khai thác mỏ", "Mỏ apatite Lào Cai là nguồn nguyên liệu lân quan trọng của nước ta."],
    ["Đạm cá, bánh dầu, phân xanh thuộc nhóm phân bón nào?", "Phân bón hữu cơ truyền thống", "Phân bón vô cơ tổng hợp", "Phân bón vi lượng hoá học", "Phân xanh là cây họ đậu trồng rồi vùi vào đất để tăng đạm tự nhiên."],
    ["Cây họ đậu tự làm giàu đạm cho đất nhờ cơ chế nào?", "Vi khuẩn nốt sần cố định N₂ khí quyển thành hợp chất đạm", "Lá cây hấp thụ trực tiếp phân urea", "Rễ cây tự tổng hợp được khí NH₃", "Luân canh cây họ đậu giúp giảm nhu cầu phân đạm hoá học."],
    ["Phân potassium sulfate (K₂SO₄) thích hợp cho cây nào hơn KCl?", "Cây nhạy cảm với Cl⁻: thuốc lá, khoai, cây ăn quả", "Mọi cây đều như nhau hoàn toàn", "Chỉ dùng cho cây thuỷ sinh", "K₂SO₄ mắc hơn KCl nhưng không chứa Cl⁻ gây hại cây nhạy cảm."],
    ["Ammonium nitrate (NH₄NO₃) là phân đạm có đặc điểm gì cần lưu ý?", "Hàm lượng đạm cao ~35%, dễ hút ẩm, cần bảo quản an toàn", "Hoàn toàn không chứa nitrogen", "Là phân lân chứa nhiều P₂O₅", "NH₄NO₃ chứa cả đạm ammonium và đạm nitrate nên cây hấp thụ nhanh."],
    ["Vôi bón ruộng (CaO, Ca(OH)₂, CaCO₃) có tác dụng chính gì?", "Khử chua đất, cung cấp calcium cho cây", "Cung cấp đạm cho cây trồng", "Diệt hết vi sinh vật có ích trong đất", "Đất chua (pH thấp) bón vôi giúp nâng pH, cây hấp thụ dinh dưỡng tốt hơn."],
    ["Phân bón hữu cơ vi sinh khác phân hữu cơ thường ở điểm nào?", "Có bổ sung vi sinh vật có ích đã được tuyển chọn", "Hoàn toàn không chứa chất hữu cơ", "Chỉ chứa các nguyên tố vi lượng", "Vi sinh vật giúp cố định đạm, phân giải lân khó tan trong đất."],
    ["Khi đọc nhãn NPK 20-20-15, các con số lần lượt chỉ điều gì?", "20% N, 20% P₂O₅, 15% K₂O theo khối lượng", "20 kg N, 20 kg P, 15 kg K mỗi bao", "Độ ẩm, độ mịn và khối lượng của phân", "Biết đọc nhãn giúp chọn đúng loại phân cho từng giai đoạn của cây."],
    ["Bón phân thúc và bón phân lót khác nhau ở thời điểm nào?", "Bón lót: lúc gieo trồng; bón thúc: khi cây lớn", "Bón lót: sau thu hoạch; bón thúc: trước gieo", "Hai cách bón hoàn toàn giống nhau", "Phân lân thường bón lót vì chậm tan, phân đạm thường bón thúc."],
    ["Tro bếp là phân bón truyền thống chủ yếu cung cấp nguyên tố nào?", "Potassium (K) và một ít calcium, vi lượng", "Nitrogen (N) với hàm lượng cao", "Phosphorus (P) là thành phần chính", "Tro bếp có tính kiềm nên cũng không trộn chung phân đạm ammonium."]
  ];
  var hh11cd1P = [["Urê (NH₂)₂CO", "Phân đạm, 46% N"], ["Super lân", "Cung cấp lân (P)"], ["KCl", "Phân kali phổ biến"], ["NPK 16-16-8", "Phân hỗn hợp N, P, K"], ["Phân chuồng ủ hoai", "Phân bón hữu cơ"], ["(NH₄)₂SO₄", "Đạm SA, thêm lưu huỳnh"], ["NH₄NO₃", "Đạm cao, hút ẩm mạnh"], ["Vôi bột", "Khử chua đất"]];
  var hh11cd2F = [
    ["Tinh dầu là hỗn hợp chất hữu cơ có đặc điểm gì?", "Dễ bay hơi, có mùi thơm đặc trưng, nhẹ hơn nước, ít tan", "Không bay hơi, tan vô hạn trong nước", "Là chất rắn kết tinh ở nhiệt độ thường", "Tinh dầu có trong vỏ cam, sả, quế, hồi, bạc hà…"],
    ["Phương pháp phổ biến để tách tinh dầu từ thực vật là gì?", "Chưng cất lôi cuốn hơi nước", "Kết tinh lại từ dung dịch nóng", "Điện phân dung dịch chiết", "Hơi nước cuốn theo tinh dầu, ngưng tụ rồi tách lớp khỏi nước."],
    ["Vì sao có thể tách tinh dầu ra khỏi nước sau khi chưng cất?", "Tinh dầu ít tan, nhẹ hơn nước nên nổi thành lớp riêng", "Tinh dầu tan hoàn toàn tạo dung dịch đồng nhất", "Tinh dầu nặng hơn nước, chìm hoàn toàn xuống đáy", "Dùng phễu chiết để tách lớp tinh dầu khỏi lớp nước."],
    ["Ngoài chưng cất, tinh dầu còn được tách bằng phương pháp nào?", "Chiết bằng dung môi hữu cơ hoặc ép lạnh (vỏ cam quýt)", "Phương pháp điện phân nóng chảy", "Phương pháp lọc qua giấy lọc thường", "Ép lạnh giữ được hương thơm tự nhiên của tinh dầu vỏ quả."],
    ["Xà phòng là hỗn hợp muối của acid béo với kim loại nào?", "Muối sodium hoặc potassium của acid béo mạch dài", "Muối calcium của acid acetic ngắn mạch", "Muối ammonium của acid vô cơ mạnh", "Xà phòng sodium cứng, xà phòng potassium mềm hơn (xà phòng lỏng)."],
    ["Phản ứng xà phòng hoá là phản ứng giữa chất béo với chất gì?", "Dung dịch kiềm (NaOH/KOH) đun nóng, tạo xà phòng và glycerol", "Dung dịch acid loãng ở nhiệt độ thường", "Nước cất tinh khiết đun sôi", "Chất béo là triester của glycerol với các acid béo."],
    ["Trong phản ứng xà phòng hoá chất béo, sản phẩm phụ có giá trị là gì?", "Glycerol, dùng trong mĩ phẩm và thực phẩm", "Khí CO₂ dùng làm nước ngọt", "Ethanol dùng làm nhiên liệu", "Tách glycerol làm tăng hiệu quả kinh tế của sản xuất xà phòng."],
    ["Chất béo là triester tạo bởi glycerol và những acid nào?", "Các acid béo mạch dài như stearic, oleic, palmitic acid", "Acetic acid và formic acid ngắn mạch", "Acid vô cơ như HCl và H₂SO₄", "Chất béo lỏng (dầu) chứa nhiều gốc acid béo không no hơn mỡ rắn."],
    ["Vì sao xà phòng có khả năng làm sạch dầu mỡ?", "Phân tử có đầu ưa nước và đuôi kị nước cuốn lấy vết bẩn", "Xà phòng hoà tan hoàn toàn mọi chất bẩn", "Xà phòng là acid mạnh ăn mòn vết bẩn", "Đuôi kị nước bám dầu mỡ, đầu ưa nước hướng ra nước, tạo hạt micelle."],
    ["Xà phòng giặt trong nước cứng (nhiều Ca²⁺, Mg²⁺) kém hiệu quả vì sao?", "Tạo kết tủa muối Ca/Mg của acid béo, mất tác dụng", "Xà phòng bị phân huỷ thành acid mạnh", "Nước cứng làm xà phòng bốc cháy", "Chất giặt rửa tổng hợp khắc phục được nhược điểm này của xà phòng."],
    ["Glucosamine là chất có vai trò gì với sức khoẻ con người?", "Thành phần tạo sụn, hỗ trợ khớp khoẻ", "Chất tạo ngọt chính trong nước giải khát", "Vitamin thiết yếu tan trong dầu", "Glucosamine thường dùng dạng muối sulfate hoặc hydrochloride."],
    ["Glucosamine trong công nghiệp được sản xuất từ nguyên liệu nào?", "Chitin trong vỏ tôm, cua (thuỷ phân bằng acid HCl)", "Tinh bột ngô lên men rượu", "Dầu mỏ qua quá trình cracking", "Tận dụng vỏ tôm cua phế thải thuỷ sản vừa kinh tế vừa bảo vệ môi trường."],
    ["Chitin là polymer tự nhiên có ở đâu?", "Vỏ tôm, cua, mai mực và vách tế bào nấm", "Trong thân cây gỗ và bông vải", "Trong sữa của động vật có vú", "Chitin là polymer sinh học phổ biến thứ hai sau cellulose."],
    ["Quy trình chiết glucosamine từ vỏ tôm gồm bước khử khoáng bằng chất nào?", "Dung dịch HCl loãng loại CaCO₃, rồi thuỷ phân chitin", "Dung dịch NaOH đặc đun sôi ngay từ đầu", "Nước muối bão hoà ngâm dài ngày", "Vỏ tôm còn được khử protein bằng NaOH loãng trước khi thuỷ phân."],
    ["Thực hành tách tinh dầu sả trong phòng thí nghiệm dùng bộ dụng cụ nào?", "Bộ chưng cất: bình cầu, sinh hàn ngưng tụ, bình hứng", "Bộ điện phân có hai điện cực than", "Phễu lọc chân không và giấy lọc", "Sinh hàn giúp hơi nước và tinh dầu ngưng tụ thành chất lỏng."],
    ["Khi làm xà phòng thủ công từ dầu dừa và NaOH, cần lưu ý an toàn gì?", "NaOH ăn da mạnh: đeo găng, kính; khuấy đúng quy trình", "Có thể nếm thử để kiểm tra độ chín", "Đổ nước vào NaOH rắn thật nhanh", "Hoà tan NaOH vào nước toả nhiệt mạnh, phải làm từ từ và cẩn thận."],
    ["Dầu ăn đã qua sử dụng có thể tái chế thành sản phẩm gì?", "Xà phòng tái chế hoặc nhiên liệu biodiesel", "Dầu ăn mới tinh khiết để nấu lại", "Phân đạm cho cây trồng", "Tái chế dầu thải giúp giảm ô nhiễm nguồn nước."],
    ["Biodiesel là nhiên liệu sinh học được tạo từ nguyên liệu nào?", "Dầu thực vật/mỡ động vật phản ứng với methanol, xúc tác kiềm", "Dầu mỏ chưng cất phân đoạn trực tiếp", "Than đá hoá lỏng ở nhiệt độ cao", "Sản phẩm phụ của sản xuất biodiesel cũng là glycerol."],
    ["Tinh dầu sả chanh được ứng dụng phổ biến để làm gì?", "Xua muỗi, khử mùi, tạo hương cho mĩ phẩm", "Làm phân bón lá cho cây trồng", "Tẩy rửa công nghiệp nặng", "Thành phần chính của tinh dầu sả là citral có mùi chanh đặc trưng."],
    ["Phương pháp ép lạnh thường dùng để lấy tinh dầu từ bộ phận nào của cây?", "Vỏ quả họ cam quýt (cam, chanh, bưởi)", "Rễ cây lâu năm khô cứng", "Hạt ngũ cốc chứa tinh bột", "Ép lạnh tránh nhiệt nên giữ trọn mùi thơm tự nhiên của vỏ quả."],
    ["Trong thí nghiệm xà phòng hoá, để phản ứng xảy ra nhanh và hoàn toàn cần điều kiện gì?", "Đun nóng hỗn hợp chất béo với dung dịch kiềm, khuấy đều", "Để yên ở nhiệt độ phòng vài phút", "Thêm thật nhiều nước lạnh vào hỗn hợp", "Sau phản ứng thêm NaCl bão hoà để xà phòng tách lớp (muối hoá)."],
    ["Bước thêm dung dịch NaCl bão hoà vào hỗn hợp xà phòng hoá gọi là gì và có tác dụng gì?", "Muối hoá: làm xà phòng giảm độ tan, nổi lên tách lớp", "Trung hoà: làm mất hoàn toàn tính kiềm", "Kết tinh: tạo tinh thể muối ăn lớn", "Nhờ bước này thu được khối xà phòng rắn tách khỏi glycerol và nước."],
    ["Chất giặt rửa tổng hợp khác xà phòng ở điểm nào?", "Dùng tốt trong nước cứng, không tạo kết tủa với Ca²⁺, Mg²⁺", "Hoàn toàn không có khả năng tạo bọt", "Chỉ làm sạch được bằng nước nóng", "Chất giặt rửa tổng hợp có gốc sulfate/sulfonate thay cho carboxylate."],
    ["Khi chưng cất lôi cuốn hơi nước, nhiệt độ sôi của hỗn hợp thế nào so với từng chất?", "Thấp hơn 100 °C, bảo vệ tinh dầu khỏi phân huỷ nhiệt", "Cao hơn nhiều so với điểm sôi của nước", "Bằng đúng nhiệt độ sôi của tinh dầu nguyên chất", "Đây là ưu điểm lớn của phương pháp lôi cuốn hơi nước."]
  ];
  var hh11cd2P = [["Mỡ động vật + NaOH", "Xà phòng và glycerol"], ["Vỏ tôm, cua", "Nguồn chitin tạo glucosamine"], ["Sả chanh", "Tinh dầu chứa citral"], ["Vỏ cam, bưởi", "Tinh dầu ép lạnh"], ["Dầu thực vật + methanol", "Biodiesel và glycerol"], ["Chưng cất lôi cuốn hơi nước", "Tách tinh dầu thực vật"], ["Đầu ưa nước – đuôi kị nước", "Cấu tạo phân tử xà phòng"], ["NaCl bão hoà", "Muối hoá tách xà phòng"]];
  var hh11cd3F = [
    ["Dầu mỏ (dầu thô) có nguồn gốc hình thành thế nào?", "Từ xác sinh vật cổ chôn vùi, biến đổi lâu dài", "Do núi lửa phun trào tạo thành", "Do nước biển cô đặc qua nhiều năm", "Quá trình hình thành dầu mỏ kéo dài hàng triệu năm, áp suất và nhiệt độ cao."],
    ["Thành phần hoá học chính của dầu mỏ là hỗn hợp chất nào?", "Hỗn hợp nhiều hydrocarbon (alkane, cycloalkane, arene…)", "Chủ yếu là các acid hữu cơ", "Chủ yếu là muối vô cơ hoà tan", "Ngoài hydrocarbon, dầu thô còn chứa hợp chất của S, N, O."],
    ["Dầu mỏ ở trạng thái tự nhiên có tính chất vật lí nào?", "Lỏng sánh, nâu đen, nhẹ hơn nước, không tan", "Chất lỏng trong suốt, tan tốt trong nước", "Chất rắn kết tinh màu vàng nhạt", "Dầu tràn ra biển nổi thành váng gây ô nhiễm nghiêm trọng."],
    ["Phương pháp chính để tách các thành phần của dầu mỏ là gì?", "Chưng cất phân đoạn theo nhiệt độ sôi tăng dần", "Chiết bằng dung môi hữu cơ lạnh", "Kết tinh lại nhiều lần liên tiếp", "Tháp chưng cất phân đoạn là thiết bị trung tâm của nhà máy lọc dầu."],
    ["Trong tháp chưng cất phân đoạn, các phân đoạn nhẹ (sôi thấp) thu ở đâu?", "Ở phần trên của tháp, nơi nhiệt độ thấp hơn", "Ở đáy tháp, nơi nhiệt độ cao nhất", "Ở giữa tháp trong mọi trường hợp", "Phân đoạn nặng sôi cao ngưng tụ ở phần dưới của tháp."],
    ["Phân đoạn khí dầu mỏ (khí hoá lỏng LPG) gồm chủ yếu hydrocarbon nào?", "Propane và butane (C₃–C₄)", "Methane nguyên chất duy nhất", "Hydrocarbon C₂₀ trở lên", "LPG dùng làm nhiên liệu đun nấu và một số động cơ."],
    ["Xăng (gasoline) là phân đoạn có khoảng nhiệt độ sôi và số carbon thế nào?", "Khoảng C₅–C₁₂, sôi thấp hơn dầu hoả và diesel", "Khoảng C₂₀ trở lên, sôi cao nhất", "Chỉ gồm duy nhất hydrocarbon C₈", "Xăng là nhiên liệu cho động cơ đốt trong đánh lửa."],
    ["Dầu hoả (kerosene) được dùng chủ yếu làm nhiên liệu cho phương tiện nào?", "Máy bay phản lực và đèn dầu truyền thống", "Ô tô chạy xăng thông thường", "Tàu biển chạy dầu nặng", "Kerosene có khoảng sôi cao hơn xăng, khoảng C₁₀–C₁₆."],
    ["Dầu diesel là phân đoạn nặng hơn xăng, dùng cho loại động cơ nào?", "Động cơ diesel của xe tải, tàu, máy phát điện", "Động cơ xăng của xe máy nhỏ", "Động cơ phản lực siêu âm", "Diesel chứa hydrocarbon khoảng C₁₀–C₂₀."],
    ["Phân đoạn nặng nhất sau chưng cất dầu mỏ, dùng trải mặt đường, là chất gì?", "Nhựa đường (bitum/asphalt)", "Xăng máy bay tinh chế", "Khí hoá lỏng LPG", "Trước nhựa đường còn có dầu mazut (FO) dùng làm nhiên liệu lò đốt."],
    ["Quá trình cracking dầu mỏ nhằm mục đích gì?", "Tăng xăng từ phân đoạn nặng, tạo alkene", "Tách nước ra khỏi dầu thô", "Biến xăng thành nhựa đường", "Cracking nhiệt và cracking xúc tác đều bẻ gãy mạch hydrocarbon dài."],
    ["Các alkene nhẹ thu được từ cracking (ethylene, propylene) dùng để làm gì?", "Nguyên liệu hoá dầu: sản xuất nhựa, cao su, dung môi", "Đốt bỏ vì không có giá trị", "Làm phân bón trực tiếp cho cây", "Hoá dầu là hướng chế biến mang lại giá trị cao nhất của dầu mỏ."],
    ["Khí đồng hành với dầu mỏ chứa chủ yếu chất nào?", "Methane và các hydrocarbon nhẹ C₂–C₄", "Oxygen và nitrogen của không khí", "Carbon dioxide gần như nguyên chất", "Khí đồng hành thu từ các mỏ dầu khí, khác khí thiên nhiên ở thành phần."],
    ["Mỏ dầu nổi tiếng, khai thác sớm nhất của Việt Nam ở thềm lục địa phía Nam là mỏ nào?", "Mỏ Bạch Hổ (bể Cửu Long)", "Mỏ khí Lan Tây (bể Nam Côn Sơn)", "Mỏ than Quảng Ninh trên đất liền", "Mỏ Bạch Hổ do Liên doanh Vietsovpetro khai thác từ năm 1986."],
    ["Nhà máy lọc dầu đầu tiên của Việt Nam đặt tại đâu?", "Dung Quất (Quảng Ngãi), vận hành từ năm 2009", "Nghi Sơn (Thanh Hoá), vận hành sau Dung Quất", "Vũng Tàu (Bà Rịa – Vũng Tàu)", "Nhà máy lọc hoá dầu Nghi Sơn là nhà máy thứ hai, quy mô lớn hơn."],
    ["Tập đoàn/đơn vị chủ lực của ngành dầu khí Việt Nam là gì?", "Petrovietnam (Tập đoàn Dầu khí Việt Nam)", "Tập đoàn Điện lực Việt Nam (EVN)", "Tập đoàn Công nghiệp Than – Khoáng sản", "Petrovietnam quản lí thăm dò, khai thác, chế biến dầu khí toàn quốc."],
    ["Nhiên liệu hoá thạch như dầu mỏ thuộc loại tài nguyên nào?", "Tài nguyên không tái tạo, sẽ cạn kiệt dần", "Tài nguyên tái tạo vô tận", "Tài nguyên do con người tổng hợp dễ dàng", "Vì vậy cần tiết kiệm và phát triển năng lượng tái tạo thay thế."],
    ["Đốt nhiên liệu hoá thạch gây ra vấn đề môi trường toàn cầu nào?", "Phát thải CO₂ gây hiệu ứng nhà kính, biến đổi khí hậu", "Làm tăng tầng ozone bảo vệ Trái Đất", "Làm lạnh khí hậu toàn cầu xuống", "Ngoài CO₂ còn có SO₂, NOₓ gây mưa acid nếu không xử lí."],
    ["Chỉ số octane của xăng liên quan đến hydrocarbon dạng nào?", "Alkane mạch nhánh và arene có octane cao hơn alkane thẳng", "Alkane mạch thẳng dài luôn cao nhất", "Hàm lượng nước trong xăng quyết định", "Reforming tạo cấu trúc nhánh và vòng thơm để nâng chỉ số octane."],
    ["Dầu mazut (fuel oil – FO) được dùng chủ yếu vào việc gì?", "Nhiên liệu cho lò đốt công nghiệp, nhà máy điện, tàu biển", "Nhiên liệu cho xe máy và ô tô con", "Nguyên liệu nấu ăn trong gia đình", "Mazut là phân đoạn nặng, độ nhớt cao, giá rẻ hơn diesel."],
    ["Sáp paraffin và vaseline thu từ dầu mỏ thuộc phân đoạn thế nào?", "Phân đoạn nặng: alkane rắn mạch dài và dầu nhờn", "Phân đoạn khí nhẹ nhất của dầu mỏ", "Phân đoạn xăng sôi thấp nhất", "Dầu nhờn dùng bôi trơn động cơ cũng thuộc nhóm phân đoạn nặng."],
    ["Hoá dầu (petrochemistry) là ngành công nghiệp làm gì?", "Chế biến dầu khí thành hoá chất, nhựa, sợi tổng hợp, cao su", "Chỉ khai thác dầu thô rồi xuất khẩu", "Sản xuất phân bón từ than đá duy nhất", "Sản phẩm hoá dầu có mặt khắp đời sống: nhựa PE, PP, PVC, polyester…"],
    ["Sự cố tràn dầu trên biển gây hậu quả nghiêm trọng nhất vì sao?", "Váng dầu ngăn oxygen, huỷ hoại sinh vật biển", "Dầu tan nhanh nên tự biến mất sau vài giờ", "Dầu là thức ăn tốt cho cá biển", "Xử lí tràn dầu cần phao quây, chất phân tán và vi sinh phân huỷ dầu."],
    ["Khí thiên nhiên ở Việt Nam được dùng nhiều cho ngành nào?", "Sản xuất điện (nhà máy điện khí) và sản xuất phân đạm", "Sản xuất thuỷ tinh trang trí", "Khai thác và chế biến muối biển", "Cụm khí – điện – đạm Cà Mau và Phú Mỹ là ví dụ điển hình."],
    ["Vì sao cần chế biến sâu dầu mỏ thay vì xuất khẩu dầu thô?", "Tạo giá trị cao, chủ động xăng dầu trong nước", "Dầu thô không bán được ra nước ngoài", "Chưng cất dầu tốn ít vốn hơn khai thác", "Lọc hoá dầu còn cung cấp nguyên liệu cho nhiều ngành công nghiệp khác."],
    ["Quá trình reforming xúc tác trong chế biến dầu mỏ tạo ra sản phẩm chính nào?", "Xăng chất lượng cao giàu arene và khí hydrogen", "Nhựa đường dùng trải mặt đường", "Phân đoạn khí LPG duy nhất", "Hydrogen thu được dùng cho các quá trình làm sạch nhiên liệu khác."]
  ];
  var hh11cd3P = [["LPG (khí hoá lỏng)", "Nhiên liệu đun nấu"], ["Xăng", "Động cơ đánh lửa ô tô, xe máy"], ["Dầu hoả (kerosene)", "Nhiên liệu máy bay phản lực"], ["Dầu diesel", "Động cơ diesel xe tải, tàu"], ["Dầu mazut (FO)", "Nhiên liệu lò đốt công nghiệp"], ["Nhựa đường (bitum)", "Trải mặt đường giao thông"], ["Cracking", "Bẻ gãy mạch dài, tăng xăng"], ["Mỏ Bạch Hổ", "Mỏ dầu lớn ở bể Cửu Long"]];
  var HH11 = [
    TP("hh11-c1", "⚖️", "Chương 1: Cân bằng hoá học", "Bài 1–3 • Cân bằng hoá học, cân bằng trong dung dịch nước (điện li, pH)", KP(hh11c1F, hh11c1P), KN(hh11c1F, hh11c1P, "Hoá học")),
    TP("hh11-c2", "🧪", "Chương 2: Nitrogen – Sulfur", "Bài 4–9 • Nitrogen, ammonia, hợp chất nitrogen với oxygen, sulfur, H₂SO₄ và muối sulfate", KP(hh11c2F, hh11c2P), KN(hh11c2F, hh11c2P, "Hoá học")),
    TP("hh11-c3", "🔬", "Chương 3: Đại cương về hoá học hữu cơ", "Bài 10–14 • Hợp chất hữu cơ, tách biệt – tinh chế, công thức phân tử, cấu tạo hoá học", KP(hh11c3F, hh11c3P), KN(hh11c3F, hh11c3P, "Hoá học")),
    TP("hh11-c4", "⛽", "Chương 4: Hydrocarbon", "Bài 15–18 • Alkane, hydrocarbon không no (alkene, alkyne), arene", KP(hh11c4F, hh11c4P), KN(hh11c4F, hh11c4P, "Hoá học")),
    TP("hh11-c5", "🍶", "Chương 5: Dẫn xuất halogen – Alcohol – Phenol", "Bài 19–22 • Dẫn xuất halogen, alcohol, phenol", KP(hh11c5F, hh11c5P), KN(hh11c5F, hh11c5P, "Hoá học")),
    TP("hh11-c6", "🧴", "Chương 6: Hợp chất carbonyl – Carboxylic acid", "Bài 23–25 • Aldehyde, ketone, carboxylic acid", KP(hh11c6F, hh11c6P), KN(hh11c6F, hh11c6P, "Hoá học")),
    TP("hh11-cd1", "🌱", "Chuyên đề 1: Phân bón", "Chuyên đề Hoá học • Phân bón vô cơ (đạm, lân, kali), phân bón hữu cơ", KP(hh11cd1F, hh11cd1P), KN(hh11cd1F, hh11cd1P, "Hoá học")),
    TP("hh11-cd2", "🧼", "Chuyên đề 2: Trải nghiệm, thực hành hoá học hữu cơ", "Chuyên đề Hoá học • Tách tinh dầu, xà phòng từ chất béo, glucosamine từ vỏ tôm", KP(hh11cd2F, hh11cd2P), KN(hh11cd2F, hh11cd2P, "Hoá học")),
    TP("hh11-cd3", "🛢️", "Chuyên đề 3: Dầu mỏ và chế biến dầu mỏ", "Chuyên đề Hoá học • Nguồn gốc, thành phần, chế biến dầu mỏ; ngành dầu mỏ ở Việt Nam", KP(hh11cd3F, hh11cd3P), KN(hh11cd3F, hh11cd3P, "Hoá học"))
  ];
  /* ==================================================================
     SINH HỌC 11 — Kết nối tri thức
     Phần ba: Sinh học cơ thể (đánh số phần xuyên THPT, tiếp Sinh học 10)
     ================================================================== */
  var sh11c1F = [
    ["Cây hấp thụ nước và muối khoáng chủ yếu qua bộ phận nào?", "Lông hút ở vùng rễ", "Khí khổng ở lá", "Tế bào biểu bì thân", "Lông hút có thành mỏng, không thấm cutin, tăng diện tích tiếp xúc với đất."],
    ["Nước và muối khoáng từ rễ lên lá được vận chuyển chủ yếu qua mạch nào?", "Mạch gỗ (xilem)", "Mạch rây (phloem)", "Tế bào khí khổng", "Mạch gỗ gồm quản bào và mạch ống đã chết, dẫn dòng đi lên."],
    ["Chất hữu cơ quang hợp được vận chuyển trong cây chủ yếu qua mạch nào?", "Mạch rây (phloem)", "Mạch gỗ (xilem)", "Mạch dẫn ở lông hút", "Mạch rây vận chuyển saccarozơ từ lá tới cơ quan dự trữ và cơ quan đang sinh trưởng."],
    ["Thoát hơi nước ở lá diễn ra chủ yếu qua cấu trúc nào?", "Khí khổng ở biểu bì lá", "Lông hút ở rễ", "Tế bào thịt lá", "Thoát hơi nước tạo động lực hút nước, giúp cây điều hoà nhiệt độ."],
    ["Quang hợp ở cây xanh diễn ra chủ yếu ở bào quan nào?", "Lục lạp trong tế bào thịt lá", "Ti thể trong tế bào rễ", "Nhân tế bào lá", "Lục lạp chứa diệp lục hấp thụ ánh sáng cho quang hợp."],
    ["Pha sáng của quang hợp diễn ra ở đâu?", "Màng thylakoid của lục lạp", "Chất nền lục lạp", "Màng trong ti thể", "Pha sáng cần ánh sáng trực tiếp nên gắn với hệ màng thylakoid."],
    ["Pha sáng của quang hợp tạo ra những sản phẩm nào?", "ATP, NADPH và O2", "Glucose và CO2", "Tinh bột và nước", "ATP và NADPH của pha sáng được dùng cho pha tối cố định CO2."],
    ["Oxi thải ra trong quang hợp có nguồn gốc từ chất nào?", "Nước bị quang phân li", "CO2 bị phân giải", "Glucose bị phân giải", "Ở pha sáng, nước bị phân li giải phóng O2, electron và H+."],
    ["Pha tối (chu trình Calvin) của quang hợp diễn ra ở đâu?", "Chất nền (stroma) lục lạp", "Màng thylakoid", "Tế bào chất của lá", "Pha tối không cần ánh sáng trực tiếp nhưng phụ thuộc sản phẩm của pha sáng."],
    ["Pha tối sử dụng những sản phẩm nào của pha sáng để cố định CO2?", "ATP và NADPH", "O2 và glucose", "ADP và nước", "Nhờ ATP và NADPH, CO2 được khử thành chất hữu cơ."],
    ["Hô hấp tế bào ở sinh vật nhân thực diễn ra chủ yếu ở bào quan nào?", "Ti thể", "Lục lạp", "Bộ máy Golgi", "Giai đoạn đường phân diễn ra ở tế bào chất, các giai đoạn sau diễn ra trong ti thể."],
    ["Giai đoạn đường phân của hô hấp tế bào diễn ra ở đâu?", "Tế bào chất", "Chất nền ti thể", "Màng trong ti thể", "Đường phân phân giải glucose thành pyruvate, không cần oxi."],
    ["Giai đoạn nào của hô hấp tế bào tạo ra nhiều ATP nhất?", "Chuỗi truyền electron ở màng trong ti thể", "Đường phân ở tế bào chất", "Chu trình Krebs ở chất nền", "Chuỗi truyền electron dùng NADH, FADH2 để tổng hợp phần lớn ATP."],
    ["Sản phẩm cuối cùng của hô hấp hiếu khí phân giải hoàn toàn glucose là gì?", "CO2, nước và năng lượng ATP", "Axit lactic và ATP", "Rượu etylic và CO2", "Hô hấp hiếu khí phân giải triệt để glucose khi có đủ oxi."],
    ["Khi thiếu oxi, tế bào cơ của người lên men tạo ra chất nào gây mỏi cơ?", "Axit lactic", "Rượu etylic", "Axit axetic", "Axit lactic tích lũy gây mỏi cơ; sau đó được chuyển về gan xử lí."],
    ["Ở người, chất dinh dưỡng được hấp thụ chủ yếu ở cơ quan tiêu hoá nào?", "Ruột non", "Dạ dày", "Ruột già", "Ruột non có lông ruột và vi lông ruột làm tăng diện tích hấp thụ rất lớn."],
    ["Dịch mật do gan tiết ra có vai trò gì trong tiêu hoá?", "Nhũ tương hoá mỡ, hỗ trợ tiêu hoá lipit", "Phân giải tinh bột thành glucose", "Phân giải protein thành axit amin", "Mật không chứa enzyme nhưng giúp lipase tiếp xúc tốt hơn với mỡ."],
    ["Hệ tuần hoàn hở có đặc điểm nào?", "Máu chảy một phần trong xoang cơ thể", "Máu luôn kín trong mạch", "Chỉ có ở động vật có xương sống", "Tuần hoàn hở gặp ở nhiều động vật thân mềm và chân khớp."],
    ["Hệ tuần hoàn kín có đặc điểm nào?", "Máu luôn chảy trong hệ thống mạch kín", "Máu tràn trực tiếp vào xoang cơ thể", "Không có tim bơm máu", "Tuần hoàn kín giúp máu chảy nhanh, áp lực cao, phân phối hiệu quả hơn."],
    ["Tim của người gồm bao nhiêu ngăn?", "4 ngăn: 2 tâm nhĩ, 2 tâm thất", "2 ngăn: 1 nhĩ, 1 thất", "3 ngăn: 2 nhĩ, 1 thất", "Vách ngăn tim hoàn chỉnh giúp máu giàu O2 và máu nghèo O2 không pha trộn."],
    ["Loại mạch nào đưa máu từ tim đi tới các cơ quan?", "Động mạch", "Tĩnh mạch", "Mao mạch", "Trao đổi chất giữa máu và tế bào diễn ra qua thành mao mạch mỏng."],
    ["Miễn dịch không đặc hiệu ở người có tính chất gì?", "Bẩm sinh, đáp ứng chung với mầm bệnh", "Chỉ đáp ứng với một kháng nguyên", "Hình thành sau khi tiêm vắc-xin", "Da, niêm mạc, dịch tiết và bạch cầu thực bào là hàng rào miễn dịch không đặc hiệu."],
    ["Miễn dịch đặc hiệu dựa trên cơ chế nào?", "Kháng thể và tế bào lympho nhớ đặc hiệu", "Chỉ nhờ da và niêm mạc", "Chỉ nhờ sốt và viêm chung", "Nhờ tế bào nhớ, lần gặp lại kháng nguyên đáp ứng nhanh và mạnh hơn."],
    ["Cơ quan nào của người lọc máu và tạo nước tiểu?", "Thận", "Gan", "Phổi", "Mỗi thận có khoảng một triệu đơn vị chức năng là nephron."],
    ["Cân bằng nội môi được hiểu là gì?", "Duy trì ổn định môi trường trong cơ thể", "Giữ cơ thể không lớn lên nữa", "Duy trì nhiệt độ bằng môi trường ngoài", "Thận, gan, da, hệ thần kinh và nội tiết cùng tham gia giữ cân bằng nội môi."],
    ["Ba nguyên tố khoáng đa lượng cây thường cần với lượng lớn là gì?", "Đạm (N), lân (P), kali (K)", "Sắt (Fe), kẽm (Zn), đồng (Cu)", "Bo (B), molipđen (Mo), clo (Cl)", "N, P, K là thành phần chính của nhiều loại phân bón NPK."]
  ];
  var sh11c1P = [["Pha sáng quang hợp", "Màng thylakoid, tạo ATP, NADPH, O2"], ["Pha tối quang hợp", "Chất nền lục lạp, cố định CO2"], ["Đường phân", "Ở tế bào chất, tạo pyruvate"], ["Mạch gỗ", "Dẫn nước và muối khoáng đi lên"], ["Mạch rây", "Dẫn chất hữu cơ trong cây"], ["Tuần hoàn hở", "Máu chảy qua xoang cơ thể"], ["Tuần hoàn kín", "Máu chảy trong hệ mạch kín"]];
  var sh11c2F = [
    ["Cảm ứng ở sinh vật được hiểu là gì?", "Phản ứng trước kích thích của môi trường", "Quá trình tạo giao tử", "Sự tăng kích thước của cơ thể", "Cảm ứng giúp sinh vật tồn tại và thích nghi với môi trường luôn biến đổi."],
    ["Hướng động ở thực vật là hình thức vận động nào?", "Sinh trưởng hướng theo hướng kích thích", "Vận động không liên quan kích thích", "Di chuyển toàn bộ cơ thể tới nơi khác", "Hướng động gồm hướng sáng, hướng trọng lực, hướng nước, hướng hoá, hướng tiếp xúc."],
    ["Thân cây mọc hướng về phía ánh sáng thuộc loại hướng động nào?", "Hướng sáng dương", "Hướng trọng lực âm", "Ứng động sinh trưởng", "Thân có tính hướng sáng dương, rễ thường hướng sáng âm."],
    ["Rễ cây mọc hướng xuống đất thuộc loại hướng động nào?", "Hướng trọng lực dương", "Hướng trọng lực âm", "Hướng nước âm", "Nhờ hướng trọng lực, rễ luôn đâm sâu xuống đất để hút nước và khoáng."],
    ["Rễ cây mọc tìm tới nguồn nước thuộc loại hướng động nào?", "Hướng nước dương", "Hướng sáng dương", "Hướng tiếp xúc", "Hướng nước giúp rễ tìm nước ở nơi đất ẩm hơn."],
    ["Vận động quấn của tua cuốn cây leo quanh giá thể thuộc hướng động nào?", "Hướng tiếp xúc", "Hướng hoá", "Hướng trọng lực", "Khi tiếp xúc giá thể, hai phía tua cuốn sinh trưởng không đều làm tua quấn lại."],
    ["Ứng động ở thực vật khác hướng động ở điểm nào?", "Không định hướng theo hướng kích thích", "Luôn hướng về phía kích thích", "Chỉ xảy ra ở động vật", "Ứng động gồm ứng động sinh trưởng và ứng động không sinh trưởng."],
    ["Lá cây xấu hổ (trinh nữ) cụp lại khi bị chạm là ví dụ của hiện tượng gì?", "Ứng động không sinh trưởng", "Hướng sáng dương", "Hướng trọng lực dương", "Sự cụp lá do thay đổi sức trương nước ở thể gối lá, không do sinh trưởng."],
    ["Hormone thực vật nào phân bố không đều gây hiện tượng hướng sáng ở thân?", "Auxin", "Ethylene", "Axit abxixic", "Auxin dồn về phía khuất sáng, kích thích phía đó kéo dài nhanh hơn nên thân cong về phía sáng."],
    ["Ở động vật, cảm ứng được thực hiện chủ yếu nhờ hệ cơ quan nào?", "Hệ thần kinh và các giác quan", "Hệ tiêu hoá và gan", "Hệ bài tiết và da", "Động vật càng tiến hoá, hệ thần kinh càng phát triển nên phản ứng càng nhanh và chính xác."],
    ["Cung phản xạ ở động vật gồm những thành phần cơ bản nào theo thứ tự?", "Thụ thể → trung ương → cơ quan đáp ứng", "Cơ quan đáp ứng → thụ thể → trung ương", "Trung ương → đáp ứng → thụ thể", "Đường đi đầy đủ còn qua neuron hướng tâm và neuron li tâm."],
    ["Phản xạ là phản ứng có đặc điểm gì?", "Trả lời kích thích qua hệ thần kinh", "Trả lời kích thích không qua thần kinh", "Chỉ xảy ra ở thực vật", "Phản xạ giúp động vật đáp ứng nhanh với thay đổi của môi trường."],
    ["Tập tính ở động vật được hiểu là gì?", "Chuỗi phản ứng trả lời kích thích môi trường", "Một phản xạ đơn lẻ duy nhất", "Hoạt động chỉ của cơ quan tiêu hoá", "Tập tính giúp động vật thích nghi, kiếm ăn, sinh sản và bảo vệ lãnh thổ."],
    ["Tập tính bẩm sinh có đặc điểm gì?", "Sinh ra đã có, di truyền, đặc trưng cho loài", "Hình thành hoàn toàn qua học tập", "Chỉ có ở động vật bậc cao", "Ví dụ: nhện giăng tơ, chim di cư theo mùa là tập tính bẩm sinh."],
    ["Tập tính học được có đặc điểm gì?", "Hình thành qua trải nghiệm và rèn luyện", "Sinh ra đã có sẵn hoàn toàn", "Di truyền nguyên vẹn cho đời sau", "Tập tính học được thay đổi được theo kinh nghiệm sống của cá thể."],
    ["Nhện giăng tơ bắt mồi là ví dụ của loại tập tính nào?", "Tập tính bẩm sinh", "Tập tính học được", "Tập tính xã hội", "Nhện không cần học vẫn giăng được tơ đúng kiểu của loài."],
    ["Chó tiết nước bọt khi nghe tiếng chuông gắn với bữa ăn là ví dụ của hiện tượng gì?", "Tập tính học được (điều kiện hoá)", "Tập tính bẩm sinh", "Ứng động ở động vật", "Đây là dạng học tập liên kết kích thích với thức ăn qua lặp lại nhiều lần."],
    ["Ong thợ thông báo vị trí nguồn mật cho đồng loại bằng cách nào?", "Thực hiện “vũ điệu” lắc bụng", "Tiết ra âm thanh siêu âm", "Thay đổi màu sắc cơ thể", "Hướng và độ dài vũ điệu của ong cho biết hướng và khoảng cách tới nguồn hoa."],
    ["Tập tính di cư theo mùa ở chim giúp chúng điều gì?", "Tránh rét, tìm nơi sống và sinh sản thuận lợi", "Trốn tránh hoàn toàn kẻ thù", "Tăng kích thước cơ thể", "Di cư là tập tính bẩm sinh chịu tác động của sự thay đổi mùa."],
    ["Tập tính bảo vệ lãnh thổ ở động vật có ý nghĩa gì?", "Bảo vệ nguồn thức ăn và nơi sinh sản", "Giúp động vật ngủ ngon hơn", "Làm tăng số lượng kẻ thù", "Động vật dùng mùi, tiếng kêu, động tác đe doạ để đánh dấu và giữ lãnh thổ."],
    ["Ở thực vật, cảm ứng thường diễn ra với tốc độ thế nào so với động vật?", "Chậm hơn, khó nhận thấy bằng mắt thường", "Nhanh hơn mọi phản xạ động vật", "Ngay lập tức như tia chớp", "Cảm ứng thực vật chủ yếu là vận động sinh trưởng nên diễn ra chậm."],
    ["Kích thích nào thường gây hiện tượng lá cây bắt mồi cụp lại ở cây nắp ấm/bắt ruồi?", "Tiếp xúc cơ học của con mồi", "Thay đổi nhiệt độ đất", "Tiếng động lớn xung quanh", "Vận động bắt mồi là ứng động tiếp xúc kết hợp ứng động hoá."],
    ["Dạng tập tính nào giúp động vật sống theo đàn phối hợp kiếm ăn, tự vệ?", "Tập tính xã hội", "Tập tính sinh sản", "Tập tính di cư", "Ong, kiến, mối có tập tính xã hội với phân công lao động rõ rệt."],
    ["Vì sao tập tính học được giúp động vật thích nghi linh hoạt hơn tập tính bẩm sinh?", "Thay đổi được theo điều kiện sống mới", "Luôn di truyền cho thế hệ sau", "Không cần hệ thần kinh tham gia", "Số lượng tập tính học được tăng theo mức độ phát triển của hệ thần kinh."]
  ];
  var sh11c2P = [["Hướng sáng", "Thân mọc về phía ánh sáng"], ["Hướng trọng lực", "Rễ mọc xuống đất"], ["Hướng nước", "Rễ mọc tìm nguồn nước"], ["Hướng tiếp xúc", "Tua cuốn quấn giá thể"], ["Ứng động", "Cụp lá cây xấu hổ khi chạm"], ["Tập tính bẩm sinh", "Nhện giăng tơ"], ["Tập tính học được", "Chó quen chuông gắn với thức ăn"]];
  var sh11c3F = [
    ["Sinh trưởng ở sinh vật được hiểu là gì?", "Tăng kích thước và khối lượng cơ thể", "Quá trình tạo giao tử", "Sự phân hoá thành mô mới", "Sinh trưởng gắn với tăng số lượng và kích thước tế bào."],
    ["Phát triển ở sinh vật bao gồm những quá trình nào?", "Sinh trưởng, phân hoá và phát sinh hình thái", "Chỉ tăng chiều cao cơ thể", "Chỉ tăng số lượng tế bào", "Phát triển là tổng thể các biến đổi từ hợp tử tới cơ thể trưởng thành."],
    ["Mô phân sinh đỉnh ở thực vật nằm ở vị trí nào?", "Đỉnh thân và đỉnh rễ", "Trong tầng sinh mạch", "Ở bề mặt lá già", "Mô phân sinh đỉnh giúp cây tăng chiều dài thân và rễ."],
    ["Mô phân sinh bên ở cây hai lá mầm có vai trò gì?", "Làm thân và rễ to ngang", "Làm cây cao thêm nhanh", "Tạo hoa và quả", "Tầng sinh mạch và tầng sinh bần là các mô phân sinh bên."],
    ["Sinh trưởng sơ cấp ở thực vật tạo ra kết quả gì?", "Tăng chiều dài của thân và rễ", "Tăng đường kính thân gỗ", "Tạo vòng gỗ hằng năm", "Sinh trưởng sơ cấp do mô phân sinh đỉnh và mô phân sinh lóng đảm nhiệm."],
    ["Sinh trưởng thứ cấp ở cây thân gỗ tạo ra kết quả gì?", "Tăng đường kính của thân và rễ", "Tăng chiều dài của lá", "Tạo hạt phấn và noãn", "Sinh trưởng thứ cấp tạo gỗ và vỏ, hình thành vòng tăng trưởng."],
    ["Hormone auxin ở thực vật có tác dụng nổi bật nào?", "Kích thích kéo dài tế bào, gây hướng sáng", "Thúc quả chín nhanh", "Gây rụng lá và ngủ nghỉ", "Auxin còn kích thích ra rễ ở cành giâm khi dùng đúng liều."],
    ["Hormone gibberellin ở thực vật có tác dụng nổi bật nào?", "Kéo dài thân, kích thích hạt nảy mầm", "Ức chế mọi sinh trưởng", "Làm đóng khí khổng khi khô hạn", "Gibberellin phá trạng thái ngủ của hạt và củ."],
    ["Hormone cytokinin ở thực vật có tác dụng nổi bật nào?", "Kích thích phân chia tế bào", "Thúc chín quả và rụng lá", "Ức chế phân chia tế bào", "Cytokinin kết hợp auxin điều hoà sự hình thành chồi và rễ trong nuôi cấy mô."],
    ["Hormone axit abxixic (ABA) ở thực vật có tác dụng gì?", "Ức chế sinh trưởng, gây ngủ nghỉ, đóng khí khổng", "Kích thích hạt nảy mầm mạnh", "Kéo dài thân nhanh", "ABA tích lũy khi cây gặp khô hạn, giúp cây chống chịu điều kiện bất lợi."],
    ["Hormone ethylene ở thực vật có tác dụng nổi bật nào?", "Thúc quả chín và rụng lá, hoa", "Kích thích ra rễ bất định", "Kéo dài tế bào thân", "Ethylene là hormone dạng khí, quả chín thải ra làm quả xung quanh chín theo."],
    ["Hiện tượng xuân hoá ở một số loài cây là gì?", "Cây cần nhiệt độ thấp một thời gian mới ra hoa", "Cây chỉ ra hoa vào mùa xuân ấm", "Cây ra hoa khi ngày dài hơn đêm", "Lúa mì mùa đông là ví dụ cây cần xuân hoá để chuyển sang giai đoạn ra hoa."],
    ["Cây ngày ngắn ra hoa trong điều kiện nào?", "Đêm dài hơn một giới hạn nhất định", "Ngày dài hơn đêm nhiều", "Không phụ thuộc ánh sáng", "Quang chu kì là độ dài ngày đêm ảnh hưởng tới sự ra hoa của cây."],
    ["Biến thái hoàn toàn ở côn trùng gồm các giai đoạn nào?", "Trứng → sâu → nhộng → trưởng thành", "Trứng → sâu → trưởng thành", "Trứng → trưởng thành ngay", "Bướm, ong, ruồi phát triển qua biến thái hoàn toàn; sâu và trưởng thành khác hẳn nhau."],
    ["Biến thái không hoàn toàn ở côn trùng có đặc điểm gì?", "Ấu trùng gần giống trưởng thành, qua lột xác lớn lên", "Phải qua giai đoạn nhộng nằm yên", "Ấu trùng sống hoàn toàn khác trưởng thành", "Châu chấu, gián, chuồn chuồn phát triển qua biến thái không hoàn toàn."],
    ["Động vật nào sau đây phát triển không qua biến thái?", "Gà, chó và người", "Bướm và ruồi", "Ếch và cóc", "Ở động vật không biến thái, con non sinh ra đã có cấu tạo giống trưởng thành."],
    ["Phát triển của ếch thuộc kiểu nào?", "Biến thái hoàn toàn qua nòng nọc", "Không qua biến thái", "Biến thái không hoàn toàn", "Nòng nọc sống dưới nước, thở bằng mang; ếch trưởng thành sống trên cạn, thở bằng phổi và da."],
    ["Hormone nào ở côn trùng gây hiện tượng lột xác?", "Ecdysone", "Juvenile hormone giữ dạng ấu trùng", "Thyroxine của tuyến giáp", "Sự phối hợp ecdysone và hormone juvenin quyết định kiểu biến thái của côn trùng."],
    ["Hormone sinh trưởng (GH) ở người được tiết ra từ tuyến nào?", "Tuyến yên", "Tuyến giáp", "Tuyến tuỵ", "Thiếu GH ở tuổi nhỏ gây thấp lùn; thừa GH gây bệnh khổng lồ hoặc to đầu chi."],
    ["Hormone thyroxine của tuyến giáp có vai trò gì ở người?", "Điều hoà chuyển hoá và sinh trưởng, phát triển", "Điều hoà đường huyết trực tiếp", "Tạo tế bào máu mới", "Thiếu iod làm giảm thyroxine, có thể gây bướu cổ và chậm phát triển trí tuệ ở trẻ."],
    ["Ở tuổi dậy thì, cơ thể người biến đổi mạnh chủ yếu do tác động của nhóm hormone nào?", "Hormone sinh dục từ tuyến sinh dục", "Hormone tuyến tuỵ insulin", "Hormone tuyến cận giáp", "Dậy thì xuất hiện các đặc tính sinh dục phụ như vỡ giọng ở nam, phát triển ngực ở nữ."],
    ["Yếu tố nào sau đây thuộc nhóm yếu tố bên trong ảnh hưởng tới sinh trưởng, phát triển ở động vật?", "Di truyền và hormone", "Nhiệt độ môi trường", "Chế độ ánh sáng ngoài trời", "Yếu tố bên ngoài gồm thức ăn, nhiệt độ, ánh sáng; yếu tố bên trong gồm gen và hormone."],
    ["Chế độ dinh dưỡng thiếu protein kéo dài ảnh hưởng thế nào tới trẻ em?", "Chậm lớn, còi cọc, giảm sức đề kháng", "Trẻ cao lớn nhanh hơn", "Không ảnh hưởng gì đáng kể", "Dinh dưỡng đầy đủ, cân đối là điều kiện cần cho sinh trưởng và phát triển bình thường."],
    ["Sinh trưởng ở động vật và thực vật khác nhau cơ bản ở điểm nào?", "Cây sinh trưởng suốt đời, động vật có giới hạn", "Động vật sinh trưởng suốt đời không ngừng", "Cây chỉ sinh trưởng khi còn non", "Nhờ mô phân sinh, nhiều loài cây sinh trưởng không hạn định; động vật thường ngừng lớn khi trưởng thành."]
  ];
  var sh11c3P = [["Auxin", "Kích thích kéo dài tế bào"], ["Gibberellin", "Kéo dài thân, hạt nảy mầm"], ["Cytokinin", "Kích thích phân chia tế bào"], ["Axit abxixic", "Ngủ nghỉ, đóng khí khổng"], ["Ethylene", "Thúc quả chín, rụng lá"], ["Biến thái hoàn toàn", "Qua giai đoạn nhộng"], ["Biến thái không hoàn toàn", "Ấu trùng gần giống trưởng thành"]];
  var sh11c4F = [
    ["Sinh sản vô tính ở sinh vật có đặc điểm gì?", "Không kết hợp giao tử, con giống hệt mẹ", "Luôn có thụ tinh giữa hai giao tử", "Con luôn khác hẳn bố mẹ", "Sinh sản vô tính dựa trên nguyên phân nên giữ nguyên bộ gen của cơ thể mẹ."],
    ["Sinh sản hữu tính ở sinh vật có đặc điểm gì?", "Kết hợp giao tử đực và cái tạo hợp tử", "Chỉ cần một tế bào của mẹ phân đôi", "Không qua giảm phân tạo giao tử", "Hợp tử phát triển thành cơ thể mới mang vật chất di truyền của cả hai bố mẹ."],
    ["Giâm cành là hình thức sinh sản vô tính nào ở thực vật?", "Cắm đoạn cành vào đất ẩm để ra rễ thành cây mới", "Ghép cành lên gốc cây khác", "Cho hạt phấn thụ tinh với noãn", "Giâm cành áp dụng cho mía, sắn, hoa hồng và nhiều cây ăn quả."],
    ["Chiết cành khác giâm cành ở điểm nào?", "Cành ra rễ ngay trên cây mẹ rồi mới cắt trồng", "Cành cắt rời rồi mới cắm xuống đất", "Phải ghép hai cây khác loài với nhau", "Chiết cành cho cây con giữ đặc tính của cây mẹ và mau ra hoa, quả."],
    ["Ghép cây là hình thức nhân giống thế nào?", "Gắn mô của cây này lên gốc cây khác cùng họ", "Gieo hạt của cây mẹ để trồng", "Nuôi cấy tế bào trong ống nghiệm", "Ghép kết hợp bộ rễ khoẻ của gốc ghép với đặc tính tốt của cành ghép."],
    ["Nuôi cấy mô thực vật thuộc hình thức sinh sản nào?", "Sinh sản vô tính", "Sinh sản hữu tính", "Sinh sản bằng bào tử", "Từ một mẩu mô nhỏ có thể tái sinh hàng loạt cây con giống hệt nhau."],
    ["Cây khoai tây trồng bằng củ thuộc hình thức sinh sản nào?", "Sinh sản sinh dưỡng vô tính bằng thân củ", "Sinh sản hữu tính bằng hạt", "Sinh sản bằng bào tử", "Thân củ, thân rễ, thân bò đều là cơ quan sinh sản sinh dưỡng của cây."],
    ["Thụ phấn ở thực vật có hoa được hiểu là gì?", "Hạt phấn chuyển tới đầu nhuỵ của hoa", "Hạt phấn kết hợp với noãn trong bầu", "Noãn biến thành hạt sau thụ tinh", "Thụ phấn là bước trước thụ tinh, nhờ gió, nước, côn trùng hoặc con người."],
    ["Tự thụ phấn khác giao phấn (thụ phấn chéo) ở điểm nào?", "Tự thụ phấn trong cùng hoa/cây, giao phấn khác cây", "Giao phấn xảy ra trong cùng một hoa", "Tự thụ phấn nhờ cây khác cùng loài", "Giao phấn tạo biến dị tổ hợp cao hơn tự thụ phấn."],
    ["Thụ tinh kép ở thực vật có hoa tạo ra những thành phần nào?", "Hợp tử (2n) và tế bào nội nhũ (3n)", "Chỉ tạo một hợp tử duy nhất", "Hạt phấn và túi phôi", "Một tinh tử kết hợp với noãn tạo hợp tử, tinh tử còn lại kết hợp với nhân cực tạo nội nhũ nuôi phôi."],
    ["Sau thụ tinh ở thực vật có hoa, noãn biến đổi thành gì?", "Hạt", "Quả", "Hoa mới", "Bầu nhuỵ phát triển thành quả bao bọc hạt bên trong."],
    ["Sau thụ tinh, bầu nhuỵ của hoa phát triển thành gì?", "Quả", "Hạt", "Cánh hoa", "Vỏ quả do vách bầu nhuỵ biến đổi thành."],
    ["Hình thức sinh sản vô tính phân đôi gặp ở sinh vật nào?", "Trùng roi, trùng giày và vi khuẩn", "Thuỷ tức và san hô", "Sao biển và giun dẹp", "Phân đôi là hình thức đơn giản nhất: một cơ thể tách thành hai cơ thể mới."],
    ["Thuỷ tức sinh sản vô tính chủ yếu bằng hình thức nào?", "Nảy chồi", "Phân mảnh", "Trinh sinh", "Chồi mọc trên cơ thể mẹ, lớn dần rồi tách ra thành cá thể độc lập."],
    ["Trinh sinh (trinh sản) ở ong mật tạo ra cá thể nào?", "Ong đực đơn bội từ trứng không thụ tinh", "Ong chúa lưỡng bội", "Ong thợ lưỡng bội", "Ong chúa và ong thợ phát triển từ trứng đã thụ tinh (2n)."],
    ["Thụ tinh ngoài ở động vật thường gặp ở nhóm nào?", "Cá và lưỡng cư đẻ trứng trong nước", "Bò, chim và người", "Côn trùng sống trên cạn", "Thụ tinh ngoài cần môi trường nước để tinh trùng bơi tới trứng."],
    ["Thụ tinh trong ở động vật có ưu điểm gì so với thụ tinh ngoài?", "Hiệu suất thụ tinh cao, ít phụ thuộc môi trường nước", "Tạo ra nhiều trứng hơn hẳn", "Không cần cơ quan sinh dục đực", "Thụ tinh trong phổ biến ở động vật sống trên cạn."],
    ["Động vật đẻ con (thai sinh) có đặc điểm gì?", "Phôi phát triển trong tử cung, nuôi bằng nhau thai", "Phôi phát triển trong trứng ngoài cơ thể", "Con non tự lớn không cần sữa mẹ", "Hầu hết thú thuộc nhóm đẻ con và nuôi con bằng sữa."],
    ["Ưu điểm nổi bật của sinh sản vô tính là gì?", "Sinh sản nhanh, giữ nguyên đặc tính tốt của mẹ", "Tạo đa dạng di truyền rất cao", "Con luôn chống chịu bệnh tốt hơn", "Nhược điểm của sinh sản vô tính là đời con đồng nhất, dễ bị hại hàng loạt khi môi trường đổi xấu."],
    ["Ưu điểm nổi bật của sinh sản hữu tính là gì?", "Tạo đa dạng di truyền, tăng khả năng thích nghi", "Sinh sản nhanh hơn vô tính nhiều", "Con giống hệt bố mẹ hoàn toàn", "Biến dị tổ hợp từ giảm phân và thụ tinh là nguyên liệu cho chọn lọc tự nhiên."],
    ["Hoa lưỡng tính có đặc điểm gì?", "Có cả nhị và nhuỵ trên cùng một hoa", "Chỉ có nhị hoặc chỉ có nhuỵ", "Không có cơ quan sinh sản", "Hoa đơn tính chỉ có nhị (hoa đực) hoặc chỉ có nhuỵ (hoa cái)."],
    ["Hạt phấn của thực vật có hoa chứa thành phần nào?", "Tế bào sinh sản đực (tinh tử)", "Noãn và nhân cực", "Phôi và nội nhũ", "Khi hạt phấn nảy mầm tạo ống phấn đưa tinh tử tới túi phôi trong noãn."],
    ["Sinh sản bằng bào tử gặp phổ biến ở nhóm thực vật nào?", "Rêu và dương xỉ", "Cây có hoa và cây hạt trần", "Tảo biển đa bào lớn", "Bào tử là tế bào sinh sản đơn bội, phát tán nhờ gió và nước."],
    ["Trong chăn nuôi, thụ tinh nhân tạo mang lại lợi ích gì?", "Chọn lọc giống tốt, tăng nhanh số con chất lượng", "Làm vật nuôi tự sinh sản vô tính", "Loại bỏ hoàn toàn bệnh di truyền", "Thụ tinh nhân tạo giúp một con đực giống tốt phối giống cho nhiều con cái."]
  ];
  var sh11c4P = [["Giâm cành", "Cắm cành xuống đất ẩm ra rễ"], ["Chiết cành", "Cành ra rễ trên cây mẹ"], ["Ghép cây", "Gắn cành ghép lên gốc ghép"], ["Nảy chồi", "Hình thức vô tính ở thuỷ tức"], ["Phân đôi", "Hình thức vô tính ở trùng roi"], ["Thụ tinh ngoài", "Cá, ếch thụ tinh trong nước"], ["Thụ tinh trong", "Động vật sống trên cạn"]];
  var sh11c5F = [
    ["Các quá trình sinh lí trong một cơ thể có mối quan hệ thế nào?", "Liên quan chặt chẽ, hỗ trợ và điều hoà lẫn nhau", "Hoàn toàn độc lập, không ảnh hưởng nhau", "Chỉ liên quan khi cơ thể bị bệnh", "Cơ thể là một thể thống nhất nên mọi quá trình sinh lí phối hợp nhịp nhàng."],
    ["Quang hợp có vai trò gì đối với các quá trình sinh lí khác của cây?", "Cung cấp chất hữu cơ và O2 cho hô hấp", "Cung cấp nước cho thoát hơi nước", "Cung cấp muối khoáng cho rễ", "Sản phẩm quang hợp là nguồn nguyên liệu và năng lượng cho mọi hoạt động sống của cây."],
    ["Hô hấp tế bào cung cấp gì cho mọi hoạt động sống của cơ thể?", "Năng lượng ATP", "Oxi cho quang hợp", "Giao tử cho sinh sản", "Mọi quá trình như vận chuyển chủ động, tổng hợp chất đều cần ATP từ hô hấp."],
    ["Hệ tuần hoàn hỗ trợ các quá trình sinh lí khác bằng cách nào?", "Vận chuyển chất dinh dưỡng, O2, hormone đi khắp cơ thể", "Trực tiếp phân giải thức ăn", "Trực tiếp lọc máu tạo nước tiểu", "Nhờ tuần hoàn, các cơ quan xa nhau vẫn trao đổi và phối hợp được với nhau."],
    ["Bài tiết góp phần giữ ổn định cho các quá trình sinh lí bằng cách nào?", "Thải chất độc, duy trì cân bằng nội môi", "Tạo năng lượng ATP cho tế bào", "Tổng hợp hormone sinh trưởng", "Nội môi ổn định là điều kiện để enzyme và tế bào hoạt động bình thường."],
    ["Tiêu hoá liên hệ với tuần hoàn và hô hấp ở điểm nào?", "Cung cấp chất dinh dưỡng để máu vận chuyển tới tế bào", "Trực tiếp bơm máu đi nuôi cơ thể", "Trực tiếp lấy oxi từ không khí", "Chất dinh dưỡng từ tiêu hoá và O2 từ hô hấp cùng phục vụ hô hấp tế bào tạo năng lượng."],
    ["Hệ thần kinh và hệ nội tiết phối hợp điều hoà cơ thể theo cách nào?", "Thần kinh nhanh qua xung, nội tiết chậm qua hormone", "Cả hai đều chỉ qua đường máu", "Cả hai đều chỉ qua dây thần kinh", "Hai hệ điều hoà bổ sung nhau giúp cơ thể thích nghi với biến đổi môi trường."],
    ["Khi cơ thể vận động mạnh, các hệ cơ quan phối hợp thay đổi thế nào?", "Tim đập nhanh, thở gấp, toát mồ hôi tăng", "Tim đập chậm lại, hô hấp giảm", "Tiêu hoá tăng mạnh nhất", "Đây là ví dụ rõ về sự phối hợp đồng bộ của tuần hoàn, hô hấp, bài tiết và thần kinh."],
    ["Nếu thận suy giảm chức năng kéo dài, cơ thể bị ảnh hưởng thế nào?", "Chất độc tích lũy, rối loạn cân bằng nội môi toàn thân", "Chỉ ảnh hưởng riêng tới thận", "Cơ thể hoàn toàn không bị ảnh hưởng", "Suy thận cho thấy một quá trình sinh lí rối loạn sẽ kéo theo nhiều quá trình khác rối loạn."],
    ["Ở cây, quá trình hút nước của rễ liên hệ chặt chẽ với quá trình nào ở lá?", "Thoát hơi nước và quang hợp ở lá", "Thụ phấn và thụ tinh ở hoa", "Nảy mầm của hạt", "Thoát hơi nước ở lá tạo động lực kéo dòng nước từ rễ lên nuôi quang hợp."],
    ["Hiểu biết về sinh lí cơ thể được ứng dụng trực tiếp trong ngành y học ở việc nào?", "Chẩn đoán, phòng và điều trị bệnh cho người", "Thiết kế máy móc cơ khí", "Khai thác khoáng sản", "Sinh lí học là nền tảng của y học và dược học."],
    ["Ngành nghề nào gắn trực tiếp với nghiên cứu sinh lí và chăm sóc sức khoẻ con người?", "Bác sĩ, điều dưỡng, kĩ thuật viên xét nghiệm", "Kĩ sư cầu đường", "Thợ khai thác mỏ", "Nhóm ngành y – dược luôn cần kiến thức sinh học cơ thể người."],
    ["Kiến thức sinh lí thực vật được ứng dụng nhiều nhất trong lĩnh vực nào?", "Trồng trọt và chọn tạo giống cây trồng", "Chế tạo thiết bị điện tử", "Xây dựng công trình", "Hiểu quang hợp, dinh dưỡng khoáng giúp bón phân, tưới nước hợp lí và tăng năng suất."],
    ["Kiến thức sinh lí động vật được ứng dụng nhiều nhất trong lĩnh vực nào?", "Chăn nuôi và thú y", "Luyện kim và cơ khí", "In ấn và xuất bản", "Hiểu tiêu hoá, sinh sản động vật giúp nuôi dưỡng và phòng bệnh cho vật nuôi hiệu quả."],
    ["Ngành công nghệ thực phẩm cần kiến thức sinh học cơ thể ở điểm nào?", "Tiêu hoá, dinh dưỡng và vệ sinh an toàn thực phẩm", "Thiết kế bao bì quảng cáo", "Vận chuyển hàng hoá quốc tế", "Chuyên gia dinh dưỡng cũng là ngành nghề dựa trên sinh lí tiêu hoá và chuyển hoá."],
    ["Nuôi trồng thuỷ sản vận dụng kiến thức sinh lí ở nội dung nào?", "Hô hấp, tiêu hoá và sinh sản của cá, tôm", "Địa chất đáy biển sâu", "Khí tượng thuỷ văn đại dương", "Kiểm soát oxi hoà tan, thức ăn và sinh sản giúp thuỷ sản lớn nhanh, ít bệnh."],
    ["Người làm công tác bảo vệ môi trường cần hiểu sinh lí sinh vật để làm gì?", "Đánh giá tác động môi trường lên sinh vật và con người", "Thiết kế đường cao tốc", "Khai thác dầu khí ngoài khơi", "Sinh thái học và sinh lí học phối hợp trong bảo tồn và bảo vệ môi trường."],
    ["Ứng dụng hiểu biết về hormone sinh trưởng trong chăn nuôi, trồng trọt cần tuân thủ nguyên tắc gì?", "Đúng liều, đúng quy định, đảm bảo an toàn thực phẩm", "Dùng càng nhiều càng tốt", "Không cần kiểm soát dư lượng", "Lạm dụng chất kích thích sinh trưởng gây hại cho sức khoẻ người tiêu dùng và bị pháp luật cấm."],
    ["Khi xây dựng chế độ ăn và luyện tập hợp lí cho người, cần dựa trên kiến thức nào?", "Chuyển hoá vật chất, năng lượng và cân bằng nội môi", "Chỉ dựa trên sở thích cá nhân", "Chỉ dựa trên quảng cáo thực phẩm", "Sinh lí học giúp xây dựng lối sống khoa học, phòng bệnh không lây nhiễm."],
    ["Vì sao người nghiên cứu sinh học cơ thể cần kết hợp quan sát, thực nghiệm và đo đạc?", "Để kiểm chứng giả thuyết và thu số liệu khách quan", "Chỉ để hoàn thành thủ tục báo cáo", "Để thay thế hoàn toàn lí thuyết", "Phương pháp thực nghiệm là nền tảng của mọi ngành nghề nghiên cứu sinh học."],
    ["Nghề giảng dạy và nghiên cứu sinh học có vai trò gì với các ngành nghề sinh học khác?", "Đào tạo nhân lực và tạo tri thức mới cho các ngành", "Không liên quan tới thực tiễn sản xuất", "Chỉ phục vụ thi cử cho học sinh", "Nghiên cứu cơ bản về sinh lí là nguồn tri thức cho y học, nông nghiệp và công nghệ sinh học."],
    ["Trong tương lai, ngành nghề nào kết hợp sinh học cơ thể với công nghệ hiện đại?", "Công nghệ sinh học và y học tái tạo", "Khai thác than thủ công", "Đóng tàu gỗ truyền thống", "Công nghệ sinh học ứng dụng gen, tế bào và sinh lí vào y học, nông nghiệp, môi trường."]
  ];
  var sh11c5P = [["Tiêu hoá", "Cung cấp chất dinh dưỡng"], ["Tuần hoàn", "Vận chuyển chất, O2, hormone"], ["Bài tiết", "Thải chất độc, giữ cân bằng nội môi"], ["Hô hấp tế bào", "Cung cấp năng lượng ATP"], ["Quang hợp", "Tạo chất hữu cơ và O2"], ["Điều hoà thần kinh – nội tiết", "Phối hợp hoạt động các cơ quan"]];
  var sh11cd1F = [
    ["Dinh dưỡng khoáng ở thực vật được hiểu là gì?", "Cây hấp thụ và sử dụng các nguyên tố khoáng", "Cây tự tổng hợp mọi nguyên tố khoáng", "Cây chỉ hấp thụ nước, không cần khoáng", "Nguyên tố khoáng tham gia cấu tạo và điều tiết mọi quá trình sống của cây."],
    ["Nguyên tố khoáng thiết yếu đối với cây có đặc điểm gì?", "Thiếu thì cây không hoàn thành được chu trình sống", "Cây có hay không cũng không sao", "Chỉ cần cho cây khi ra hoa", "Nguyên tố thiết yếu còn không thể thay thế bởi nguyên tố khác."],
    ["Nhóm nguyên tố khoáng đa lượng gồm những nguyên tố tiêu biểu nào?", "N, P, K, Ca, Mg, S", "Fe, Zn, Cu, B, Mo", "Chỉ gồm N và K", "Cây cần nguyên tố đa lượng với lượng lớn để xây dựng cơ thể."],
    ["Nhóm nguyên tố khoáng vi lượng có đặc điểm gì?", "Cần lượng rất ít nhưng không thể thiếu", "Cây không cần dùng tới", "Cần nhiều hơn nguyên tố đa lượng", "Fe, Mn, Zn, Cu, B, Mo, Cl là các nguyên tố vi lượng tiêu biểu."],
    ["Cây thiếu đạm (N) thường có biểu hiện nào?", "Lá vàng, cây sinh trưởng chậm, còi cọc", "Lá xanh đậm, cây lớn rất nhanh", "Quả chín sớm hàng loạt", "Đạm là thành phần của protein, diệp lục và axit nucleic nên thiếu đạm cây kém phát triển toàn diện."],
    ["Bón phân hợp lí cho cây trồng cần đảm bảo nguyên tắc “bốn đúng” nào?", "Đúng loại, đúng lượng, đúng lúc, đúng cách", "Đúng giá, đúng nơi mua, đúng bao bì", "Đúng mùa mưa, đúng ngày lễ", "Bón thừa phân gây lãng phí, ô nhiễm đất nước và có thể làm cây bị “cháy” rễ."],
    ["Trồng cây thuỷ canh là phương pháp nào?", "Trồng cây trong dung dịch dinh dưỡng, không cần đất", "Trồng cây ngập sâu trong nước ao", "Trồng cây chỉ bằng nước máy sạch", "Thuỷ canh cần cung cấp đủ khoáng, oxi cho rễ và kiểm soát pH dung dịch."],
    ["Trồng cây khí canh khác thuỷ canh ở điểm nào?", "Rễ treo trong không khí, phun sương dinh dưỡng", "Rễ ngập hoàn toàn trong dung dịch", "Cây trồng trong đất mùn xốp", "Khí canh giúp rễ nhận nhiều oxi và tiết kiệm dung dịch dinh dưỡng."],
    ["Ưu điểm nổi bật của mô hình thuỷ canh là gì?", "Kiểm soát dinh dưỡng tốt, tiết kiệm nước, ít sâu bệnh đất", "Không cần chăm sóc gì cả", "Cây không cần ánh sáng nữa", "Thuỷ canh thích hợp sản xuất rau sạch quy mô lớn gần đô thị."],
    ["Khi trồng thuỷ canh, hai chỉ số nào của dung dịch cần kiểm tra thường xuyên?", "pH và độ dẫn điện (EC)", "Màu sắc và mùi của dung dịch", "Nhiệt độ không khí trong nhà kính", "EC phản ánh nồng độ muối khoáng; pH ảnh hưởng khả năng hút khoáng của rễ."],
    ["Nông nghiệp sạch được hiểu là gì?", "Sản xuất an toàn, hạn chế hoá chất độc hại", "Không sử dụng bất kì kĩ thuật nào", "Chỉ trồng cây hoang dã tự nhiên", "Nông nghiệp sạch bảo vệ sức khoẻ người dùng, người sản xuất và môi trường."],
    ["Phân hữu cơ và phân vi sinh có lợi ích gì trong nông nghiệp sạch?", "Cải tạo đất, bổ sung dinh dưỡng bền vững, an toàn", "Làm đất chai cứng nhanh hơn", "Tiêu diệt mọi vi sinh vật trong đất", "Phân hữu cơ giúp đất tơi xốp, giữ ẩm và nuôi hệ vi sinh vật có ích."],
    ["Luân canh cây trồng mang lại lợi ích gì?", "Cải tạo đất, cắt nguồn sâu bệnh tích lũy", "Làm đất nghèo dinh dưỡng nhanh hơn", "Tăng độc canh một loại cây", "Luân canh với cây họ đậu còn bổ sung đạm cho đất nhờ vi khuẩn cố định đạm."],
    ["Quản lí dịch hại tổng hợp (IPM) trong nông nghiệp sạch dựa trên nguyên tắc nào?", "Ưu tiên biện pháp sinh học, hạn chế thuốc hoá học", "Phun thuốc hoá học càng nhiều càng tốt", "Chỉ dùng một biện pháp duy nhất", "IPM kết hợp giống kháng bệnh, thiên địch, bẫy và thuốc đúng lúc, đúng liều."],
    ["Quy trình VietGAP trong trồng trọt có ý nghĩa gì?", "Thực hành nông nghiệp tốt, sản phẩm an toàn, truy xuất được", "Chứng nhận cho sản phẩm nhập khẩu", "Quy định về giống cây nhập nội", "VietGAP kiểm soát từ giống, phân bón, thuốc tới thu hoạch và bảo quản."],
    ["Dư lượng thuốc bảo vệ thực vật vượt mức cho phép gây nguy cơ gì?", "Gây hại sức khoẻ người dùng và ô nhiễm môi trường", "Làm rau ngon và giòn hơn", "Không gây hại gì đáng kể", "Thời gian cách li sau phun thuốc phải được tuân thủ nghiêm ngặt trước thu hoạch."],
    ["Hệ thống tưới nhỏ giọt có ưu điểm gì?", "Tiết kiệm nước, đưa nước và phân tới tận gốc cây", "Tốn nhiều nước hơn tưới tràn", "Chỉ dùng được cho cây ăn quả lớn", "Tưới nhỏ giọt kết hợp bón phân qua nước gọi là tưới phân, rất hiệu quả ở vùng khô hạn."],
    ["Trồng rau trong nhà lưới, nhà màng giúp ích gì cho nông nghiệp sạch?", "Hạn chế côn trùng, giảm thuốc trừ sâu, chủ động thời tiết", "Cây không cần tưới nước nữa", "Loại bỏ hoàn toàn mọi loại bệnh", "Nhà màng còn giúp trồng rau trái vụ với năng suất ổn định."],
    ["Nguồn nước tưới trong nông nghiệp sạch cần đảm bảo yêu cầu gì?", "Sạch, không ô nhiễm kim loại nặng và vi sinh gây bệnh", "Nước thải sinh hoạt chưa xử lí", "Nước càng nhiều phù sa càng tốt", "Nước tưới bẩn là đường đưa mầm bệnh và chất độc vào nông sản."],
    ["Vì sao không nên lạm dụng phân đạm hoá học khi trồng rau?", "Rau tích lũy nitrat dư thừa, hại sức khoẻ và ô nhiễm nước", "Rau sẽ không lớn được chút nào", "Phân đạm làm rau mất hết vitamin ngay", "Bón đạm đúng liều, đúng thời điểm và ngừng bón trước thu hoạch đủ ngày là yêu cầu bắt buộc."],
    ["Thiên địch trong nông nghiệp sạch được hiểu là sinh vật nào?", "Sinh vật ăn hoặc kí sinh trên sâu hại cây trồng", "Sinh vật gây bệnh cho cây trồng", "Cỏ dại cạnh tranh với cây trồng", "Bọ rùa ăn rệp, ong kí sinh đẻ trứng vào sâu là những thiên địch quen thuộc."],
    ["Sản phẩm nông nghiệp sạch khi đưa ra thị trường cần có đặc điểm gì để người dùng tin tưởng?", "Có chứng nhận, nhãn mác và truy xuất nguồn gốc rõ ràng", "Giá càng rẻ càng tốt", "Không cần thông tin nguồn gốc", "Truy xuất nguồn gốc giúp quản lí chất lượng và bảo vệ thương hiệu nông sản sạch."]
  ];
  var sh11cd1P = [["Thuỷ canh", "Trồng cây trong dung dịch dinh dưỡng"], ["Khí canh", "Phun sương dinh dưỡng lên rễ treo"], ["Phân hữu cơ", "Cải tạo đất bền vững"], ["Luân canh", "Đổi cây trồng, cải tạo đất"], ["Tưới nhỏ giọt", "Tiết kiệm nước tới tận gốc"], ["VietGAP", "Thực hành nông nghiệp tốt"]];
  var sh11cd2F = [
    ["Bệnh dịch được hiểu là gì?", "Bệnh truyền nhiễm lây lan nhanh thành dịch trong cộng đồng", "Bệnh di truyền trong một gia đình", "Bệnh chỉ của từng cá nhân, không lây", "Khi bệnh dịch lan ra nhiều nước, nhiều châu lục gọi là đại dịch."],
    ["Các tác nhân gây bệnh truyền nhiễm phổ biến gồm những nhóm nào?", "Virus, vi khuẩn, nấm và kí sinh trùng", "Chỉ có virus và vi khuẩn", "Chỉ có yếu tố thời tiết", "Mỗi tác nhân có đường lây và biện pháp phòng chống khác nhau."],
    ["Bệnh sốt xuất huyết lây truyền qua con đường nào?", "Muỗi vằn Aedes đốt truyền virus Dengue", "Qua đường hô hấp khi nói chuyện", "Qua thức ăn nấu chưa chín", "Phòng sốt xuất huyết trọng tâm là diệt muỗi, diệt lăng quăng và ngủ màn."],
    ["Bệnh sốt rét do tác nhân nào gây ra và lây qua đâu?", "Kí sinh trùng Plasmodium, muỗi Anopheles truyền", "Virus Dengue, muỗi vằn truyền", "Vi khuẩn lao, qua hô hấp", "Sốt rét gây sốt theo cơn, thiếu máu; cần chẩn đoán và điều trị đúng phác đồ."],
    ["Bệnh cúm mùa lây truyền chủ yếu qua đường nào?", "Đường hô hấp qua giọt bắn", "Qua vết đốt của muỗi", "Qua nguồn nước uống", "Tiêm vắc-xin cúm hằng năm là biện pháp phòng bệnh chủ động hiệu quả."],
    ["Bệnh lao phổi do tác nhân nào gây ra?", "Vi khuẩn lao", "Virus cúm A", "Nấm mốc trong không khí", "Lao lây qua đường hô hấp khi người bệnh ho, hắt hơi; điều trị phải đủ liều, đủ thời gian."],
    ["HIV lây truyền qua những con đường nào?", "Qua máu, tình dục không an toàn và mẹ sang con", "Qua bắt tay, ăn uống chung", "Qua muỗi đốt và không khí", "HIV không lây qua tiếp xúc thông thường nên không kì thị người nhiễm HIV."],
    ["Bệnh viêm gan B lây truyền chủ yếu qua đường nào và phòng bằng cách nào?", "Qua máu và dịch cơ thể; phòng bằng vắc-xin", "Qua đường ăn uống như viêm gan A", "Qua muỗi đốt; phòng bằng ngủ màn", "Viêm gan A và E chủ yếu lây qua đường tiêu hoá, khác với viêm gan B, C."],
    ["Biện pháp phòng bệnh truyền nhiễm chủ động và hiệu quả nhất cho nhiều bệnh là gì?", "Tiêm vắc-xin phòng bệnh đầy đủ, đúng lịch", "Uống kháng sinh dự phòng thường xuyên", "Tránh tiếp xúc với mọi người xung quanh", "Vắc-xin tạo miễn dịch đặc hiệu giúp cơ thể chống lại mầm bệnh khi gặp thật."],
    ["Vì sao kháng sinh không chữa được bệnh do virus gây ra?", "Kháng sinh chỉ ức chế hoặc diệt vi khuẩn", "Virus có kích thước quá lớn", "Kháng sinh chỉ dùng cho động vật", "Lạm dụng kháng sinh còn gây kháng thuốc rất nguy hiểm."],
    ["Thói quen nào giúp phòng nhiều bệnh lây qua đường tiêu hoá?", "Rửa tay bằng xà phòng, ăn chín uống sôi", "Ăn thức ăn để qua đêm không đậy", "Uống nước lã ở ao hồ", "Tiêu chảy cấp, tả, thương hàn, viêm gan A đều phòng được bằng vệ sinh ăn uống."],
    ["Để phòng bệnh sốt xuất huyết tại hộ gia đình, biện pháp cốt lõi là gì?", "Đậy kín dụng cụ chứa nước, diệt lăng quăng, diệt muỗi", "Phun thuốc diệt muỗi một lần duy nhất", "Đóng kín cửa cả ngày không thông gió", "Không có lăng quăng thì không có muỗi vằn truyền bệnh."],
    ["Khi có dịch bệnh đường hô hấp, biện pháp cá nhân nào cần thực hiện?", "Đeo khẩu trang, che miệng khi ho, rửa tay thường xuyên", "Tập trung đông người nơi kín", "Dùng chung khăn mặt và cốc uống", "Giữ khoảng cách và thông khí nơi ở cũng giúp giảm lây nhiễm."],
    ["Cách li người mắc bệnh truyền nhiễm có tác dụng gì?", "Cắt đường lây truyền từ nguồn bệnh sang người lành", "Giúp người bệnh khỏi bệnh ngay lập tức", "Thay thế hoàn toàn việc điều trị", "Cách li kết hợp điều trị và theo dõi người tiếp xúc là biện pháp chống dịch quan trọng."],
    ["Nguồn nước sinh hoạt sạch giúp phòng nhóm bệnh nào?", "Bệnh đường tiêu hoá như tả, lị, thương hàn", "Bệnh sốt rét và sốt xuất huyết", "Bệnh cúm và sởi", "Xử lí chất thải và bảo vệ nguồn nước là biện pháp phòng bệnh từ môi trường."],
    ["Bệnh tay chân miệng ở trẻ em lây chủ yếu qua đường nào?", "Đường tiêu hoá và tiếp xúc dịch tiết, đồ chơi bẩn", "Qua muỗi đốt", "Qua đường máu", "Phòng bệnh bằng rửa tay, vệ sinh đồ chơi, lớp học và cách li trẻ bệnh."],
    ["Bệnh sởi lây truyền qua đường nào và phòng bằng cách nào hiệu quả nhất?", "Qua đường hô hấp; phòng bằng vắc-xin sởi", "Qua đường ăn uống; phòng bằng ăn chín", "Qua vết đốt côn trùng; phòng bằng ngủ màn", "Sởi có thể gây biến chứng viêm phổi, viêm não, đặc biệt nguy hiểm ở trẻ nhỏ suy dinh dưỡng."],
    ["Khi phát hiện ổ dịch trong cộng đồng, việc cần làm đầu tiên là gì?", "Báo ngay cho cơ sở y tế địa phương", "Tự ý mua thuốc về uống dự phòng", "Che giấu thông tin để tránh hoang mang", "Phát hiện sớm, báo cáo kịp thời giúp khoanh vùng và dập dịch hiệu quả."],
    ["Người bệnh truyền nhiễm cần tuân thủ điều gì để tránh lây cho cộng đồng?", "Điều trị đủ phác đồ, cách li và vệ sinh đúng hướng dẫn", "Tự ngừng thuốc khi thấy đỡ", "Đi lại bình thường không cần thông báo", "Tuân thủ điều trị cũng giúp hạn chế vi sinh vật kháng thuốc."],
    ["Tiêm chủng mở rộng cho trẻ em nhằm mục đích gì?", "Phòng các bệnh truyền nhiễm nguy hiểm thường gặp ở trẻ", "Chữa bệnh ngay khi trẻ đang ốm nặng", "Thay thế chế độ dinh dưỡng của trẻ", "Lao, bại liệt, bạch hầu, ho gà, uốn ván, sởi… đều có vắc-xin trong chương trình tiêm chủng."],
    ["Vệ sinh môi trường sống giúp phòng bệnh dịch theo cơ chế nào?", "Loại bỏ nơi sinh sản của vật trung gian và mầm bệnh", "Làm tăng số lượng muỗi và ruồi", "Thay thế hoàn toàn tiêm vắc-xin", "Thu gom rác, khơi thông cống rãnh, diệt ruồi muỗi là vệ sinh phòng dịch cơ bản."],
    ["Thái độ đúng đối với người mắc bệnh truyền nhiễm là gì?", "Quan tâm, hỗ trợ điều trị, không kì thị xa lánh", "Tránh xa và cô lập hoàn toàn về xã hội", "Công khai thông tin cá nhân của họ", "Không kì thị giúp người bệnh yên tâm điều trị và cộng đồng phòng dịch hiệu quả hơn."]
  ];
  var sh11cd2P = [["Sốt xuất huyết", "Muỗi vằn truyền virus Dengue"], ["Sốt rét", "Muỗi Anopheles truyền kí sinh trùng"], ["Lao phổi", "Vi khuẩn lao, lây qua hô hấp"], ["HIV", "Lây qua máu, tình dục, mẹ sang con"], ["Cúm mùa", "Virus lây qua giọt bắn hô hấp"], ["Viêm gan A", "Lây qua đường tiêu hoá"], ["Tay chân miệng", "Lây qua tiêu hoá và tiếp xúc"]];
  var sh11cd3F = [
    ["Vệ sinh an toàn thực phẩm được hiểu là gì?", "Giúp thực phẩm không gây hại sức khoẻ người dùng", "Cách bày thực phẩm cho đẹp mắt", "Quy định về giá bán thực phẩm", "An toàn thực phẩm phải được kiểm soát suốt chuỗi từ sản xuất tới bàn ăn."],
    ["Ngộ độc thực phẩm thường do những nguyên nhân chính nào?", "Vi sinh vật, độc tố, hoá chất và chất độc tự nhiên", "Chỉ do ăn quá no", "Chỉ do thời tiết nóng bức", "Triệu chứng thường gặp là đau bụng, buồn nôn, nôn, tiêu chảy, sốt."],
    ["Nguyên tắc ăn uống nào là cơ bản nhất để phòng ngộ độc thực phẩm?", "Ăn chín, uống sôi", "Ăn tái để giữ vitamin", "Ăn thức ăn để lâu ngoài trời", "Nấu chín kĩ giúp tiêu diệt hầu hết vi sinh vật gây bệnh trong thực phẩm."],
    ["Vì sao phải rửa tay bằng xà phòng trước khi chế biến và ăn uống?", "Loại bỏ vi sinh vật gây bệnh bám trên tay", "Làm tay thơm hơn khi ăn", "Thay thế việc rửa sạch thực phẩm", "Rửa tay là biện pháp rẻ và hiệu quả hàng đầu trong an toàn thực phẩm."],
    ["Để tránh nhiễm chéo trong chế biến thực phẩm, cần làm gì?", "Tách riêng thực phẩm sống và chín, dụng cụ riêng", "Dùng chung một dao thớt cho mọi thực phẩm", "Để thịt sống chồng lên rau ăn sống", "Nhiễm chéo là con đường vi khuẩn từ thực phẩm sống lây sang thực phẩm chín."],
    ["Bảo quản thực phẩm trong tủ lạnh có tác dụng gì?", "Làm chậm sự phát triển của vi sinh vật gây hỏng, gây bệnh", "Tiêu diệt hoàn toàn mọi vi khuẩn", "Giữ thực phẩm tươi mãi không hạn", "Thực phẩm chín để ở nhiệt độ phòng quá 2 giờ rất dễ nhiễm khuẩn."],
    ["Thực phẩm có biểu hiện nào sau đây thì tuyệt đối không nên dùng?", "Ôi thiu, mốc, đổi mùi vị, bao bì phồng rách", "Màu sắc tự nhiên hơi đậm", "Vừa hết hạn sử dụng trong ngày", "Nấm mốc trên ngũ cốc, lạc có thể sinh độc tố aflatoxin gây hại gan."],
    ["Khi chọn mua thực phẩm, cần chú ý thông tin nào trên bao bì?", "Hạn sử dụng, nguồn gốc, bao bì nguyên vẹn", "Màu sắc bao bì bắt mắt nhất", "Quảng cáo khuyến mãi lớn nhất", "Thực phẩm quá hạn sử dụng có thể đã biến chất dù chưa có mùi lạ."],
    ["Rửa rau quả trước khi ăn có tác dụng gì?", "Loại bỏ đất cát, trứng giun, dư lượng thuốc trừ sâu bề mặt", "Làm rau quả tăng thêm dinh dưỡng", "Tiêu diệt mọi vi khuẩn bên trong rau", "Nên rửa rau quả nhiều lần dưới vòi nước sạch và ngâm rửa đúng cách."],
    ["Phụ gia thực phẩm được sử dụng đúng quy định là thế nào?", "Chỉ dùng loại được phép, đúng liều lượng cho phép", "Dùng bất kì hoá chất nào cho đẹp màu", "Dùng càng nhiều càng bảo quản lâu", "Hàn the, phẩm màu công nghiệp không được phép dùng trong thực phẩm."],
    ["Hàn the bị cấm dùng trong thực phẩm vì lí do gì?", "Là chất độc, tích lũy gây hại gan, thận và sức khoẻ", "Làm thực phẩm mất vị ngon", "Làm tăng giá thành sản phẩm", "Hàn the từng bị lạm dụng để làm giò chả, bún dai giòn trái phép."],
    ["Người chế biến thực phẩm đang mắc bệnh truyền nhiễm đường hô hấp, tiêu hoá cần làm gì?", "Không trực tiếp chế biến, phục vụ thực phẩm", "Vẫn làm bình thường, chỉ cần đeo găng", "Chỉ cần rửa tay qua loa", "Người chế biến phải khám sức khoẻ định kì và giữ vệ sinh cá nhân nghiêm ngặt."],
    ["Nguồn nước dùng chế biến thực phẩm cần đảm bảo yêu cầu gì?", "Nước sạch đạt quy chuẩn, không ô nhiễm", "Nước ao hồ lắng trong là dùng được", "Nước tái sử dụng từ rửa thực phẩm sống", "Nước bẩn là nguồn lây nhiều bệnh đường tiêu hoá qua thực phẩm."],
    ["Thức ăn đã nấu chín cần được sử dụng và bảo quản thế nào?", "Ăn ngay hoặc bảo quản lạnh, đun lại kĩ trước khi ăn", "Để ngoài trời cả ngày vẫn ăn được", "Đun lại nhiều lần trong nhiều ngày", "Đun sôi lại giúp giảm nguy cơ vi khuẩn phát triển trong thức ăn để lâu."],
    ["Khi bị ngộ độc thực phẩm nhẹ, việc cần ưu tiên tại nhà là gì?", "Bù nước và điện giải, theo dõi diễn biến", "Tự uống kháng sinh liều cao ngay", "Nhịn uống nước hoàn toàn", "Nếu nôn, tiêu chảy nhiều, sốt cao, mất nước phải đến ngay cơ sở y tế."],
    ["Triệu chứng nào cho thấy ngộ độc thực phẩm cần đi cấp cứu ngay?", "Nôn, tiêu chảy nhiều, mất nước, li bì, khó thở", "Chỉ hơi đầy bụng sau ăn", "Ngáp ngủ sau bữa ăn no", "Trẻ em, người già, phụ nữ mang thai bị ngộ độc cần được theo dõi chặt chẽ hơn."],
    ["Ăn tiết canh, gỏi sống tiềm ẩn nguy cơ gì?", "Nhiễm vi khuẩn, kí sinh trùng và liên cầu lợn", "Không có nguy cơ gì đáng kể", "Chỉ gây đầy bụng nhẹ", "Nhiều bệnh nguy hiểm như liên cầu lợn, sán lá gan lây qua món ăn sống, tái."],
    ["Khu vực bếp và dụng cụ chế biến cần được giữ thế nào?", "Sạch sẽ, khô ráo, vệ sinh thường xuyên, diệt côn trùng", "Chỉ lau khi thấy bẩn rõ", "Để lẫn hoá chất với thực phẩm", "Chuột, gián, ruồi là trung gian mang mầm bệnh vào thực phẩm."],
    ["Thực phẩm đường phố an toàn cần đáp ứng điều kiện cơ bản nào?", "Nơi bán sạch, che đậy, nguyên liệu rõ nguồn gốc", "Chỉ cần giá rẻ và đông khách", "Bán ngay cạnh cống rãnh vẫn an toàn", "Người tiêu dùng nên chọn hàng quán đảm bảo vệ sinh, tránh xa nguồn ô nhiễm."],
    ["Độc tố tự nhiên trong thực phẩm thường gặp ở trường hợp nào?", "Măng, sắn chưa chế biến kĩ; cá nóc; nấm độc", "Cơm trắng nấu chín kĩ", "Rau xanh rửa sạch nấu chín", "Cyanide trong sắn, măng và tetrodotoxin trong cá nóc là độc tố tự nhiên rất nguy hiểm."],
    ["Trách nhiệm đảm bảo an toàn thực phẩm thuộc về những ai?", "Cả người sản xuất, kinh doanh, tiêu dùng và quản lí", "Chỉ thuộc về cơ quan nhà nước", "Chỉ thuộc về người bán hàng", "Mỗi người tiêu dùng thông thái cũng góp phần đẩy lùi thực phẩm bẩn."],
    ["Khi phát hiện cơ sở sản xuất thực phẩm bẩn, người dân nên làm gì?", "Thông báo cho cơ quan chức năng có thẩm quyền", "Tự ý đăng tin chưa kiểm chứng lên mạng xã hội", "Bỏ qua vì không liên quan tới mình", "Phản ánh có căn cứ giúp cơ quan quản lí kiểm tra, xử lí và bảo vệ cộng đồng."]
  ];
  var sh11cd3P = [["Ăn chín uống sôi", "Diệt vi sinh vật gây bệnh"], ["Rửa tay xà phòng", "Loại bỏ mầm bệnh trên tay"], ["Tách sống – chín", "Tránh nhiễm chéo"], ["Bảo quản lạnh", "Làm chậm vi sinh vật phát triển"], ["Kiểm tra hạn dùng", "Tránh thực phẩm biến chất"], ["Nguồn nước sạch", "Phòng bệnh đường tiêu hoá"]];
  var SH11 = [
    TP("sh11-c1", "🌿", "Chương 1: Trao đổi chất và chuyển hoá năng lượng ở sinh vật", "Phần ba • Bài 1–13 • Trao đổi nước – khoáng, quang hợp, hô hấp, tiêu hoá, tuần hoàn, miễn dịch, bài tiết", KP(sh11c1F, sh11c1P), KN(sh11c1F, sh11c1P, "Sinh học")),
    TP("sh11-c2", "🦋", "Chương 2: Cảm ứng ở sinh vật", "Phần ba • Bài 14–18 • Cảm ứng ở thực vật và động vật, tập tính ở động vật", KP(sh11c2F, sh11c2P), KN(sh11c2F, sh11c2P, "Sinh học")),
    TP("sh11-c3", "🌱", "Chương 3: Sinh trưởng và phát triển ở sinh vật", "Phần ba • Bài 19–23 • Sinh trưởng – phát triển ở thực vật và động vật, biến thái", KP(sh11c3F, sh11c3P), KN(sh11c3F, sh11c3P, "Sinh học")),
    TP("sh11-c4", "🌸", "Chương 4: Sinh sản ở sinh vật", "Phần ba • Bài 24–27 • Sinh sản vô tính/hữu tính ở thực vật và động vật", KP(sh11c4F, sh11c4P), KN(sh11c4F, sh11c4P, "Sinh học")),
    TP("sh11-c5", "🧍", "Chương 5: Mối quan hệ giữa các quá trình sinh lí và ngành nghề", "Phần ba • Bài 28–29 • Liên hệ các quá trình sinh lí trong cơ thể, ngành nghề sinh học cơ thể", KP(sh11c5F, sh11c5P), KN(sh11c5F, sh11c5P, "Sinh học")),
    TP("sh11-cd1", "🥬", "Chuyên đề 1: Dinh dưỡng khoáng và nông nghiệp sạch", "Chuyên đề Sinh học • Dinh dưỡng khoáng, mô hình thuỷ canh, nông nghiệp sạch", KP(sh11cd1F, sh11cd1P), KN(sh11cd1F, sh11cd1P, "Sinh học")),
    TP("sh11-cd2", "🦠", "Chuyên đề 2: Một số bệnh dịch ở người và cách phòng, chống", "Chuyên đề Sinh học • Bệnh dịch, tác nhân lây nhiễm, biện pháp phòng chống", KP(sh11cd2F, sh11cd2P), KN(sh11cd2F, sh11cd2P, "Sinh học")),
    TP("sh11-cd3", "🍽️", "Chuyên đề 3: Vệ sinh an toàn thực phẩm", "Chuyên đề Sinh học • Vệ sinh an toàn thực phẩm, ngộ độc thực phẩm", KP(sh11cd3F, sh11cd3P), KN(sh11cd3F, sh11cd3P, "Sinh học"))
  ];
  /* ==================================================================
     LỊCH SỬ 11 — Kết nối tri thức
     ================================================================== */
  var ls11t1F = [
    ["Cách mạng tư sản Anh bùng nổ vào thời gian nào?", "Năm 1640, giữa thế kỉ XVII", "Năm 1776, cuối thế kỉ XVIII", "Năm 1789, cuối thế kỉ XVIII", "Nội chiến Anh bắt đầu năm 1642 sau khi mâu thuẫn vua – Quốc hội bùng nổ từ năm 1640."],
    ["Ai là lãnh tụ nổi bật của Cách mạng tư sản Anh?", "Ô-li-vơ Crom-oen (Oliver Cromwell)", "Giô-giơ Oa-sinh-tơn", "Mắc-xi-mi-liêng Rô-be-spie", "Cromwell lãnh đạo quân Quốc hội thắng quân vua và lập nền cộng hoà Anh năm 1649."],
    ["Vua Anh nào bị xử tử năm 1649 trong cách mạng tư sản?", "Vua Sác-lơ I (Charles I)", "Vua Sác-lơ II", "Vua Giêm II", "Việc xử tử Sác-lơ I đánh dấu thắng lợi lớn của cách mạng, nền cộng hoà được thành lập."],
    ["Sau cách mạng, nước Anh thiết lập thể chế chính trị nào?", "Quân chủ lập hiến", "Quân chủ chuyên chế tuyệt đối", "Cộng hoà tổng thống", "Từ năm 1688 – 1689, quyền lực của vua Anh bị Hiến pháp giới hạn, Quốc hội nắm thực quyền."],
    ["Tuyên ngôn Độc lập của nước Mĩ được thông qua khi nào?", "Ngày 4 tháng 7 năm 1776", "Ngày 14 tháng 7 năm 1789", "Ngày 7 tháng 11 năm 1917", "Tuyên ngôn do Thô-mát Giép-phơ-sơn soạn thảo chính, tuyên bố 13 thuộc địa độc lập khỏi Anh."],
    ["Ai là Tổng thống đầu tiên của Hợp chúng quốc Mĩ?", "Giô-giơ Oa-sinh-tơn (George Washington)", "A-bra-ham Lin-côn", "Thô-mát Giép-phơ-sơn", "Oa-sinh-tơn là Tổng chỉ huy quân thuộc địa trong chiến tranh giành độc lập 1775 – 1783."],
    ["Chiến tranh giành độc lập của các thuộc địa Anh ở Bắc Mĩ diễn ra khi nào?", "Từ năm 1775 đến năm 1783", "Từ năm 1640 đến năm 1649", "Từ năm 1914 đến năm 1918", "Hoà ước Pa-ri năm 1783 công nhận nền độc lập của nước Mĩ."],
    ["Sự kiện mở đầu Cách mạng tư sản Pháp năm 1789 là gì?", "Quần chúng tấn công ngục Ba-xti ngày 14 – 7", "Quốc hội Pháp ban hành Hiến pháp mới", "Na-pô-lê-ông lên làm hoàng đế", "Ngày 14 tháng 7 trở thành Quốc khánh của nước Pháp."],
    ["Văn kiện nổi tiếng của Cách mạng Pháp năm 1789 là gì?", "Tuyên ngôn Nhân quyền và Dân quyền", "Tuyên ngôn Độc lập của nước Mĩ", "Tuyên ngôn của Đảng Cộng sản", "Tuyên ngôn khẳng định các quyền tự do, bình đẳng và quyền tư hữu của con người."],
    ["Phái nào đưa Cách mạng Pháp lên đỉnh cao năm 1793 – 1794?", "Phái Gia-cô-banh, đứng đầu là Rô-be-spie", "Phái Bảo hoàng", "Phái Gi-rông-đanh ôn hoà", "Chính quyền Gia-cô-banh thi hành nhiều biện pháp mạnh vì lợi ích của quần chúng lao động."],
    ["Giai cấp nào lãnh đạo các cuộc cách mạng tư sản thế kỉ XVII – XVIII?", "Giai cấp tư sản", "Giai cấp vô sản", "Giai cấp địa chủ phong kiến", "Tư sản lãnh đạo, còn quần chúng nhân dân là lực lượng đông đảo tham gia đấu tranh."],
    ["Mục tiêu chung của các cuộc cách mạng tư sản là gì?", "Lật đổ phong kiến, mở đường cho chủ nghĩa tư bản", "Xây dựng chủ nghĩa xã hội ngay lập tức", "Khôi phục chế độ chiếm hữu nô lệ", "Cách mạng tư sản xoá bỏ trở ngại phong kiến cho kinh tế tư bản chủ nghĩa phát triển."],
    ["Hiến pháp đầu tiên của nước Mĩ được ban hành năm nào?", "Năm 1787", "Năm 1776", "Năm 1791", "Hiến pháp 1787 quy định Mĩ là cộng hoà liên bang theo chế độ tổng thống."],
    ["Chủ nghĩa tư bản độc quyền xuất hiện vào thời gian nào?", "Cuối thế kỉ XIX – đầu thế kỉ XX", "Giữa thế kỉ XVII", "Sau năm 1945", "Khi sản xuất và tư bản tập trung cao, các tổ chức độc quyền chi phối đời sống kinh tế."],
    ["Tổ chức độc quyền trong chủ nghĩa tư bản độc quyền là gì?", "Liên minh các xí nghiệp lớn chi phối thị trường", "Hiệp hội của các hộ buôn bán nhỏ lẻ", "Tổ chức từ thiện của nhà nước", "Các hình thức tiêu biểu là các-ten, xanh-đi-ca, tơ-rớt, công-xoóc-xi-om."],
    ["Đặc trưng kinh tế nổi bật của chủ nghĩa đế quốc là gì?", "Xuất khẩu tư bản sang các nước thuộc địa", "Chỉ buôn bán trong phạm vi trong nước", "Xoá bỏ hoàn toàn cạnh tranh trên thị trường", "Xuất khẩu tư bản cùng xuất khẩu hàng hoá là đặc trưng của giai đoạn độc quyền."],
    ["Chủ nghĩa tư bản hiện đại có điểm mới nào sau năm 1945?", "Nhà nước điều tiết, can thiệp vào kinh tế", "Nhà nước hoàn toàn không can thiệp kinh tế", "Quay lại sản xuất thủ công nhỏ lẻ", "CNTB hiện đại còn gắn với cách mạng khoa học – công nghệ và toàn cầu hoá."],
    ["Cách mạng tư sản Pháp lật đổ chế độ nào?", "Chế độ quân chủ chuyên chế phong kiến", "Chế độ cộng hoà tư sản", "Chế độ xã hội chủ nghĩa", "Cách mạng Pháp là cuộc cách mạng tư sản triệt để nhất thời cận đại."],
    ["Lực lượng nào là động lực đông đảo của cách mạng tư sản?", "Quần chúng nhân dân lao động", "Quý tộc phong kiến nước ngoài", "Tăng lữ bảo thủ", "Không có sự tham gia của nhân dân, cách mạng tư sản khó giành thắng lợi."],
    ["Na-pô-lê-ông Bô-na-pác lên ngôi Hoàng đế Pháp năm nào?", "Năm 1804", "Năm 1789", "Năm 1799", "Năm 1799 Na-pô-lê-ông đảo chính, năm 1804 ông lên ngôi Hoàng đế."],
    ["Giai đoạn tự do cạnh tranh của chủ nghĩa tư bản diễn ra khi nào?", "Trước khi xuất hiện các tổ chức độc quyền", "Sau khi xuất hiện các tổ chức độc quyền", "Chỉ từ sau năm 1945 đến nay", "Tự do cạnh tranh là giai đoạn đầu, độc quyền là giai đoạn cao hơn của CNTB."],
    ["Ý nghĩa lớn nhất của các cuộc cách mạng tư sản là gì?", "Mở đường cho chủ nghĩa tư bản phát triển", "Chấm dứt mọi áp bức, bóc lột trong xã hội", "Đưa giai cấp công nhân lên nắm chính quyền", "Cách mạng tư sản cũng cổ vũ phong trào giải phóng ở các nước thuộc địa."],
    ["Cuộc cách mạng tư sản nào đồng thời là chiến tranh giành độc lập?", "Cách mạng Mĩ thế kỉ XVIII", "Cách mạng Anh thế kỉ XVII", "Cách mạng Pháp năm 1789", "13 thuộc địa Anh ở Bắc Mĩ vừa lật đổ ách thống trị thực dân, vừa mở đường cho CNTB."],
    ["Tư tưởng khai sáng nào ảnh hưởng tới cách mạng tư sản?", "Tư tưởng của Mông-te-xki-ơ, Vôn-te, Rút-xô", "Tư tưởng thần quyền phong kiến", "Tư tưởng bảo thủ của tăng lữ", "Các nhà khai sáng Pháp phê phán chế độ chuyên chế và đề cao quyền tự nhiên của con người."]
  ];
  var ls11t1P = [["Cách mạng tư sản Anh", "Năm 1640, thế kỉ XVII"], ["Tuyên ngôn Độc lập Mĩ", "Ngày 4 – 7 – 1776"], ["Tấn công ngục Ba-xti", "Ngày 14 – 7 – 1789"], ["Xử tử vua Sác-lơ I", "Năm 1649 ở Anh"], ["Hiến pháp Mĩ đầu tiên", "Năm 1787"], ["Na-pô-lê-ông lên ngôi", "Năm 1804 ở Pháp"], ["CNTB độc quyền xuất hiện", "Cuối thế kỉ XIX – đầu XX"]];
  var ls11t2F = [
    ["Cách mạng Tháng Mười Nga thắng lợi vào thời gian nào?", "Ngày 25 – 10 – 1917 theo lịch cũ", "Ngày 7 – 3 – 1917 theo lịch cũ", "Ngày 30 – 12 – 1922", "Theo lịch mới là ngày 7 – 11 – 1917, do Đảng Bôn-sê-vích Nga lãnh đạo."],
    ["Ai là lãnh tụ của Cách mạng Tháng Mười Nga?", "V. I. Lê-nin", "I. Xta-lin", "L. Tơ-rốt-xki", "Lê-nin lãnh đạo Đảng Bôn-sê-vích và chính quyền Xô viết non trẻ."],
    ["Đảng nào lãnh đạo Cách mạng Tháng Mười Nga?", "Đảng Bôn-sê-vích Nga", "Đảng Men-sê-vích", "Đảng Xã hội chủ nghĩa Pháp", "Đảng Bôn-sê-vích sau này là Đảng Cộng sản Liên Xô."],
    ["Hai sắc lệnh đầu tiên của chính quyền Xô viết là gì?", "Sắc lệnh Hoà bình và Sắc lệnh Ruộng đất", "Sắc lệnh về thuế và Sắc lệnh về quân đội", "Sắc lệnh về giáo dục và y tế", "Hai sắc lệnh đáp ứng nguyện vọng hoà bình và ruộng đất của nhân dân lao động."],
    ["Liên bang Cộng hoà xã hội chủ nghĩa Xô viết thành lập khi nào?", "Ngày 30 tháng 12 năm 1922", "Ngày 7 tháng 11 năm 1917", "Ngày 9 tháng 5 năm 1945", "Liên Xô ban đầu gồm Nga cùng một số nước cộng hoà Xô viết, sau mở rộng thành 15 nước."],
    ["Cách mạng Tháng Hai năm 1917 ở Nga đã lật đổ chế độ nào?", "Chế độ Nga hoàng chuyên chế", "Chính phủ lâm thời tư sản", "Chính quyền Xô viết", "Sau Cách mạng Tháng Hai xuất hiện tình trạng hai chính quyền song song tồn tại."],
    ["Mô hình kinh tế Xô viết thời kì đầu xây dựng Liên Xô là gì?", "Công nghiệp hoá và kế hoạch hoá tập trung", "Kinh tế thị trường tự do hoàn toàn", "Kinh tế tự cung tự cấp của nông hộ", "Các kế hoạch 5 năm giúp Liên Xô trở thành cường quốc công nghiệp."],
    ["Liên Xô có vai trò quyết định trong thắng lợi nào năm 1945?", "Thắng lợi trước chủ nghĩa phát xít", "Thắng lợi trong Chiến tranh thế giới thứ nhất", "Thắng lợi trong Chiến tranh lạnh", "Hồng quân Liên Xô tiêu diệt chủ lực quân phát xít Đức ở mặt trận phía Đông."],
    ["Sự kiện nào đánh dấu Liên Xô chính thức tan rã?", "Liên Xô tan rã vào cuối năm 1991", "Liên Xô tan rã vào năm 1985", "Liên Xô tan rã vào năm 1956", "Ngày 25 – 12 – 1991, lá cờ Liên Xô hạ xuống ở Điện Crem-li."],
    ["Nước xã hội chủ nghĩa nào ra đời ở châu Á năm 1949?", "Cộng hoà Nhân dân Trung Hoa", "Cộng hoà Nhân dân Triều Tiên", "Việt Nam Dân chủ Cộng hoà", "Ngày 1 – 10 – 1949, nước Trung Hoa mới ra đời do Đảng Cộng sản Trung Quốc lãnh đạo."],
    ["Cách mạng Cu-ba thắng lợi vào năm nào?", "Năm 1959", "Năm 1945", "Năm 1975", "Phi-đen Cát-xtơ-rô lãnh đạo cách mạng lật đổ chế độ độc tài Ba-ti-xta thân Mĩ."],
    ["Công cuộc cải cách, mở cửa của Trung Quốc bắt đầu khi nào?", "Từ năm 1978, do Đặng Tiểu Bình khởi xướng", "Từ năm 1949", "Từ năm 1991", "Trung Quốc xây dựng chủ nghĩa xã hội đặc sắc Trung Quốc và đạt tăng trưởng cao."],
    ["Đại hội nào mở đầu công cuộc Đổi mới ở Việt Nam?", "Đại hội VI của Đảng, năm 1986", "Đại hội IV của Đảng, năm 1976", "Đại hội X của Đảng, năm 2006", "Đổi mới chuyển nền kinh tế sang kinh tế thị trường định hướng xã hội chủ nghĩa."],
    ["Hệ thống xã hội chủ nghĩa thế giới hình thành sau thời điểm nào?", "Sau Chiến tranh thế giới thứ hai, năm 1945", "Ngay sau Cách mạng Tháng Mười 1917", "Sau khi Liên Xô tan rã năm 1991", "Sau 1945, CNXH mở rộng sang Đông Âu và châu Á, trở thành hệ thống thế giới."],
    ["Nguyên nhân sâu xa dẫn tới sự sụp đổ của mô hình Xô viết ở Đông Âu và Liên Xô là gì?", "Mô hình tập trung, quan liêu, chậm đổi mới", "Do thiếu hoàn toàn tài nguyên thiên nhiên", "Do nhân dân không muốn hoà bình", "Cùng với đó là sai lầm trong cải tổ và sự chống phá của các thế lực thù địch."],
    ["Cách mạng Tháng Mười mở ra thời kì mới nào trong lịch sử nhân loại?", "Thời kì quá độ từ tư bản lên xã hội chủ nghĩa", "Thời kì phong kiến trên toàn thế giới", "Thời kì chiếm hữu nô lệ", "Đây là cuộc cách mạng vô sản thắng lợi đầu tiên trên thế giới."],
    ["Chính quyền Xô viết là chính quyền của ai?", "Của công nhân, nông dân và binh lính", "Của giai cấp tư sản và địa chủ", "Của Nga hoàng và quý tộc", "Xô viết là hình thức chính quyền do quần chúng lao động sáng tạo ra."],
    ["Liên Xô phóng thành công vệ tinh nhân tạo đầu tiên khi nào?", "Năm 1957, vệ tinh Xpút-nhích 1", "Năm 1961, tàu của Ga-ga-rin", "Năm 1969, tàu A-pô-lô 11", "Năm 1961, I-u-ri Ga-ga-rin là người đầu tiên bay vào vũ trụ."],
    ["Hội đồng Tương trợ Kinh tế (SEV) của các nước XHCN thành lập năm nào?", "Năm 1949", "Năm 1955", "Năm 1991", "SEV là tổ chức hợp tác kinh tế của các nước xã hội chủ nghĩa, tồn tại đến năm 1991."],
    ["Khối quân sự của các nước XHCN ở châu Âu sau 1945 tên là gì?", "Khối Vác-sa-va, thành lập năm 1955", "Khối NATO, thành lập năm 1949", "Khối SEATO ở Đông Nam Á", "Khối Vác-sa-va đối trọng với NATO trong thời kì Chiến tranh lạnh."],
    ["Việt Nam, Lào, Cam-pu-chia đi theo con đường XHCN gắn với sự kiện nào?", "Thắng lợi của cách mạng giải phóng dân tộc", "Sự sụp đổ của Liên Xô năm 1991", "Chiến tranh thế giới thứ nhất kết thúc", "Ở Đông Dương, CNXH gắn liền với độc lập dân tộc sau năm 1945 và 1975."],
    ["Điểm chung của cải cách ở Trung Quốc và Đổi mới ở Việt Nam là gì?", "Phát triển kinh tế thị trường định hướng XHCN", "Từ bỏ vai trò lãnh đạo của Đảng Cộng sản", "Tư nhân hoá toàn bộ nền kinh tế ngay lập tức", "Cả hai nước đều giữ ổn định chính trị và đạt nhiều thành tựu phát triển."],
    ["Cách mạng Tháng Mười Nga diễn ra ở thành phố nào?", "Pê-tơ-rô-grát (nay là Xanh Pê-tec-bua)", "Mát-xcơ-va", "Xta-lin-grát", "Quân khởi nghĩa chiếm Cung điện Mùa Đông trong đêm 25 – 10 – 1917."],
    ["Sau khi Liên Xô tan rã, nước nào tiếp tục con đường XHCN?", "Trung Quốc, Việt Nam, Lào, Cu-ba", "Tất cả các nước Đông Âu", "Ba Lan, Hung-ga-ri, Tiệp Khắc", "Các nước này tiến hành cải cách, đổi mới để phù hợp thực tiễn đất nước."]
  ];
  var ls11t2P = [["Cách mạng Tháng Mười Nga", "Năm 1917"], ["Liên Xô thành lập", "Năm 1922"], ["Liên Xô thắng phát xít", "Năm 1945"], ["Trung Quốc mới ra đời", "Năm 1949"], ["Cách mạng Cu-ba thắng lợi", "Năm 1959"], ["Đổi mới ở Việt Nam", "Từ năm 1986"], ["Liên Xô tan rã", "Năm 1991"]];
  var ls11t3F = [
    ["Chủ nghĩa thực dân phương Tây bắt đầu xâm nhập Đông Nam Á từ khi nào?", "Từ thế kỉ XVI, mạnh lên ở thế kỉ XIX", "Từ thế kỉ XX", "Từ sau Chiến tranh thế giới thứ hai", "Bồ Đào Nha, Tây Ban Nha đến trước, sau đó là Hà Lan, Anh, Pháp và Mĩ."],
    ["Nước thực dân nào cai trị In-đô-nê-xi-a trong nhiều thế kỉ?", "Hà Lan", "Anh", "Pháp", "Hà Lan thiết lập chế độ thuộc địa ở quần đảo In-đô-nê-xi-a từ thế kỉ XVII."],
    ["Ai tuyên bố In-đô-nê-xi-a độc lập ngày 17 – 8 – 1945?", "Xu-các-nô (Sukarno)", "Hồ Chí Minh", "Aung San", "Xu-các-nô là Tổng thống đầu tiên của Cộng hoà In-đô-nê-xi-a."],
    ["Việt Nam tuyên bố độc lập vào thời gian nào?", "Ngày 2 tháng 9 năm 1945", "Ngày 17 tháng 8 năm 1945", "Ngày 4 tháng 7 năm 1946", "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, Hà Nội."],
    ["Phi-líp-pin từng là thuộc địa của những nước nào?", "Tây Ban Nha, sau đó là Mĩ", "Anh, sau đó là Pháp", "Hà Lan, sau đó là Bồ Đào Nha", "Mĩ công nhận độc lập cho Phi-líp-pin vào ngày 4 – 7 – 1946."],
    ["Mi-an-ma giành độc lập từ tay thực dân Anh vào năm nào?", "Năm 1948", "Năm 1945", "Năm 1957", "Mi-an-ma từng được gọi là Miến Điện, là thuộc địa của Anh ở Đông Nam Á."],
    ["Liên bang Ma-lai-xi-a giành độc lập từ Anh vào năm nào?", "Năm 1957", "Năm 1948", "Năm 1965", "Năm 1963, Liên bang Ma-lai-xi-a được thành lập với quy mô rộng hơn."],
    ["Xin-ga-po tách ra thành quốc gia độc lập vào năm nào?", "Năm 1965", "Năm 1957", "Năm 1945", "Xin-ga-po tách khỏi Ma-lai-xi-a và trở thành nước cộng hoà độc lập."],
    ["Cam-pu-chia giành độc lập từ Pháp vào năm nào?", "Năm 1953, dưới thời Quốc vương Xi-ha-núc", "Năm 1945, dưới thời vua Bảo Đại", "Năm 1975, sau chiến tranh Đông Dương", "Quốc vương Nô-rô-đôm Xi-ha-núc lãnh đạo cuộc vận động giành độc lập."],
    ["Lào tuyên bố độc lập lần đầu vào thời gian nào?", "Năm 1945", "Năm 1953", "Năm 1975", "Năm 1975, nước Cộng hoà Dân chủ Nhân dân Lào chính thức ra đời."],
    ["Nước nào ở Đông Nam Á giữ được độc lập trước làn sóng thực dân?", "Xiêm (Thái Lan ngày nay)", "Việt Nam", "In-đô-nê-xi-a", "Xiêm thực hiện cải cách và chính sách ngoại giao khôn khéo giữa Anh và Pháp."],
    ["Vua nào tiến hành cải cách đưa Xiêm thoát khỏi thuộc địa?", "Vua Ra-ma V (Chu-la-lông-con)", "Vua Ra-ma I", "Vua Nô-rô-đôm I", "Cải cách của Ra-ma V hiện đại hoá hành chính, quân đội và giáo dục của Xiêm."],
    ["Phong trào đấu tranh ở Đông Nam Á đầu thế kỉ XX mang màu sắc nào mới?", "Xu hướng tư sản và vô sản xuất hiện", "Chỉ còn xu hướng phong kiến thuần tuý", "Hoàn toàn do nước ngoài tổ chức", "Xuất hiện các đảng cộng sản và các đảng tư sản dân tộc ở nhiều nước."],
    ["Nguyên nhân chung giúp Đông Nam Á giành độc lập năm 1945 và sau đó là gì?", "Phát xít Nhật đầu hàng, phong trào dâng cao", "Thực dân tự nguyện trao trả độc lập", "Không có phong trào đấu tranh nào cả", "Nhiều nước chớp thời cơ Nhật đầu hàng Đồng minh để tuyên bố độc lập."],
    ["Đông Ti-mo giành độc lập hoàn toàn vào thời gian nào?", "Đầu thế kỉ XXI, năm 2002", "Năm 1945", "Năm 1975", "Đông Ti-mo từng là thuộc địa Bồ Đào Nha, sau bị In-đô-nê-xi-a sáp nhập."],
    ["Bru-nây giành độc lập từ Anh vào năm nào?", "Năm 1984", "Năm 1965", "Năm 1957", "Bru-nây là quốc gia quân chủ giàu dầu mỏ trên đảo Booc-nê-ô."],
    ["Hiệp hội các quốc gia Đông Nam Á (ASEAN) thành lập năm nào?", "Năm 1967, tại Băng Cốc (Thái Lan)", "Năm 1945, tại Gia-các-ta", "Năm 1995, tại Hà Nội", "ASEAN ban đầu có 5 nước sáng lập, nay gồm hầu hết các nước Đông Nam Á."],
    ["Nước Đông Nam Á nào gia nhập ASEAN muộn trong nhóm CLMV?", "Việt Nam gia nhập ASEAN năm 1995", "Thái Lan gia nhập ASEAN năm 1995", "In-đô-nê-xi-a gia nhập năm 1995", "Lào, Mi-an-ma gia nhập năm 1997, Cam-pu-chia gia nhập năm 1999."],
    ["Thực dân Pháp xâm lược nước nào ở Đông Nam Á đầu tiên trong nhóm Đông Dương?", "Việt Nam, từ năm 1858", "Cam-pu-chia, từ năm 1863", "Lào, từ năm 1893", "Pháp lần lượt lập thuộc địa ở Việt Nam, Cam-pu-chia và Lào, lập Liên bang Đông Dương."],
    ["Phong trào Cần Vương ở Việt Nam thuộc giai đoạn đấu tranh nào?", "Cuối thế kỉ XIX, chống thực dân Pháp", "Đầu thế kỉ XX, xu hướng tư sản", "Sau năm 1945, chống Mĩ", "Các phong trào theo ngọn cờ phong kiến dần thất bại, nhường chỗ cho khuynh hướng mới."],
    ["Lãnh tụ phong trào độc lập nổi tiếng của Mi-an-ma là ai?", "Aung San (Ôn San)", "Xu-các-nô", "Tunku Abdul Rahman", "Aung San lãnh đạo đấu tranh giành độc lập cho Mi-an-ma trước khi bị ám sát năm 1947."],
    ["Tunku Abdul Rahman gắn với nền độc lập của nước nào?", "Ma-lai-xi-a", "Xin-ga-po", "Bru-nây", "Ông là Thủ tướng đầu tiên của Liên bang Ma-lai-xi-a độc lập."],
    ["Đặc điểm chung của quá trình giành độc lập ở Đông Nam Á là gì?", "Kết hợp nhiều hình thức, lực lượng đấu tranh", "Chỉ dùng đàm phán, không đấu tranh vũ trang", "Chỉ do một giai cấp duy nhất thực hiện", "Mỗi nước có con đường riêng tuỳ điều kiện lịch sử cụ thể."],
    ["Sau khi độc lập, các nước Đông Nam Á đối mặt thách thức nào?", "Tái thiết đất nước, bảo vệ chủ quyền non trẻ", "Không còn khó khăn nào nữa", "Quay lại chế độ thuộc địa tự nguyện", "Nhiều nước tiếp tục đấu tranh chống can thiệp và xâm lược từ bên ngoài."]
  ];
  var ls11t3P = [["In-đô-nê-xi-a độc lập", "Ngày 17 – 8 – 1945"], ["Việt Nam độc lập", "Ngày 2 – 9 – 1945"], ["Phi-líp-pin độc lập", "Năm 1946 từ Mĩ"], ["Mi-an-ma độc lập", "Năm 1948 từ Anh"], ["Cam-pu-chia độc lập", "Năm 1953 từ Pháp"], ["Ma-lai-xi-a độc lập", "Năm 1957 từ Anh"], ["ASEAN thành lập", "Năm 1967"]];
  var ls11t4F = [
    ["Cuộc kháng chiến chống quân xâm lược đầu tiên trong lịch sử Việt Nam gắn với nhân vật nào?", "An Dương Vương chống quân Triệu Đà", "Hùng Vương chống quân Ân", "Đinh Bộ Lĩnh chống quân Tống", "Cuối thế kỉ III TCN, nước Âu Lạc bị Triệu Đà thôn tính năm 179 TCN."],
    ["Khởi nghĩa Hai Bà Trưng bùng nổ vào năm nào?", "Năm 40", "Năm 248", "Năm 938", "Hai Bà Trưng phất cờ khởi nghĩa ở Hát Môn, lập ra chính quyền độc lập trong 3 năm."],
    ["Khởi nghĩa Bà Triệu diễn ra vào năm nào?", "Năm 248", "Năm 40", "Năm 542", "Bà Triệu (Triệu Thị Trinh) khởi nghĩa chống ách đô hộ của nhà Ngô."],
    ["Ai lãnh đạo khởi nghĩa thắng lợi, lập nước Vạn Xuân?", "Lý Bí (Lý Bôn), năm 542", "Mai Thúc Loan, năm 722", "Phùng Hưng, thế kỉ VIII", "Lý Bí lên ngôi Lý Nam Đế, đặt quốc hiệu Vạn Xuân."],
    ["Ngô Quyền đánh thắng quân Nam Hán trên sông nào năm 938?", "Sông Bạch Đằng", "Sông Như Nguyệt", "Sông Hồng", "Trận Bạch Đằng năm 938 chấm dứt hơn một nghìn năm Bắc thuộc."],
    ["Chiến thuật nổi bật của Ngô Quyền ở Bạch Đằng là gì?", "Cắm cọc gỗ dưới lòng sông nhử thuyền địch", "Xây thành cao hào sâu để phòng thủ", "Dùng voi chiến tấn công trực diện", "Khi thuỷ triều rút, thuyền địch mắc cạn trên bãi cọc và bị tiêu diệt."],
    ["Lý Thường Kiệt chủ động tấn công quân Tống vào thời gian nào?", "Năm 1075 – 1077, kháng chiến chống Tống", "Năm 1258, kháng chiến chống Nguyên", "Năm 1789, kháng chiến chống Thanh", "Phòng tuyến sông Như Nguyệt là nơi diễn ra trận quyết chiến năm 1077."],
    ["Bài thơ “Nam quốc sơn hà” gắn với cuộc kháng chiến nào?", "Kháng chiến chống Tống thời Lý", "Kháng chiến chống Nguyên thời Trần", "Khởi nghĩa Lam Sơn chống Minh", "Bài thơ được coi là bản Tuyên ngôn Độc lập đầu tiên của dân tộc."],
    ["Nhà Trần đánh thắng quân Nguyên – Mông mấy lần?", "Ba lần: 1258, 1285 và 1287 – 1288", "Hai lần: 1258 và 1285", "Một lần duy nhất năm 1288", "Trần Hưng Đạo là Tổng chỉ huy trong hai lần kháng chiến sau."],
    ["Ai là anh hùng lãnh đạo kháng chiến chống Nguyên – Mông thời Trần?", "Trần Hưng Đạo (Trần Quốc Tuấn)", "Lý Thường Kiệt", "Lê Lợi", "Ông là tác giả của “Hịch tướng sĩ” và “Binh thư yếu lược”."],
    ["Chiến thắng Bạch Đằng năm 1288 do ai chỉ huy?", "Trần Hưng Đạo", "Ngô Quyền", "Quang Trung", "Quân Trần tiêu diệt đoàn thuyền lương của Ô Mã Nhi trên sông Bạch Đằng."],
    ["Khởi nghĩa Lam Sơn do ai lãnh đạo, chống quân xâm lược nào?", "Lê Lợi lãnh đạo, chống quân Minh", "Nguyễn Huệ lãnh đạo, chống quân Thanh", "Trần Hưng Đạo lãnh đạo, chống quân Nguyên", "Khởi nghĩa kéo dài 10 năm (1418 – 1427), kết thúc bằng thắng lợi hoàn toàn."],
    ["Nguyễn Trãi có vai trò gì trong khởi nghĩa Lam Sơn?", "Mưu sĩ, tác giả “Bình Ngô đại cáo”", "Tổng chỉ huy quân đội trên chiến trường", "Sứ giả sang nhà Minh đàm phán chính", "“Bình Ngô đại cáo” được coi là bản Tuyên ngôn Độc lập thứ hai của dân tộc."],
    ["Quang Trung đánh thắng quân Thanh vào dịp nào?", "Tết Kỉ Dậu năm 1789", "Tết năm 1785", "Mùa xuân năm 1428", "Đại quân Tây Sơn tiến thần tốc ra Thăng Long, đánh tan 29 vạn quân Thanh."],
    ["Chiến thắng Rạch Gầm – Xoài Mút năm 1785 là thắng lợi trước quân nào?", "Quân Xiêm", "Quân Thanh", "Quân Minh", "Nguyễn Huệ chỉ huy quân Tây Sơn đánh tan quân Xiêm ở Mỹ Tho ngày nay."],
    ["Phong trào Tây Sơn bùng nổ vào năm nào?", "Năm 1771", "Năm 1789", "Năm 1802", "Ba anh em Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ dựng cờ khởi nghĩa ở Tây Sơn."],
    ["Khi thực dân Pháp nổ súng xâm lược Việt Nam năm 1858, triều đình nào đang cai trị?", "Triều Nguyễn, vua Tự Đức", "Triều Lê, vua Lê Hiển Tông", "Triều Tây Sơn, vua Quang Trung", "Pháp tấn công Đà Nẵng năm 1858, mở đầu quá trình xâm lược Việt Nam."],
    ["Ai là người chỉ huy chống Pháp ở Đà Nẵng và Gia Định buổi đầu?", "Nguyễn Tri Phương", "Hoàng Diệu", "Phan Thanh Giản", "Ở mặt trận Gia Định còn có nhiều nghĩa sĩ như Trương Định kiên quyết chống Pháp."],
    ["Trương Định nổi tiếng với hành động nào chống Pháp?", "Không tuân lệnh bãi binh, ở lại đánh Pháp", "Đầu hàng Pháp ngay từ trận đầu", "Sang Pháp đàm phán xin hoà", "Trương Định được nhân dân tôn là Bình Tây Đại nguyên soái."],
    ["Phong trào Cần Vương bùng nổ sau sự kiện nào?", "Vua Hàm Nghi ra chiếu Cần Vương năm 1885", "Pháp đánh Đà Nẵng năm 1858", "Triều đình kí Hiệp ước Nhâm Tuất 1862", "Phong trào quy tụ nhiều sĩ phu yêu nước như Phan Đình Phùng, Nguyễn Thiện Thuật."],
    ["Khởi nghĩa Hương Khê do ai lãnh đạo?", "Phan Đình Phùng", "Hoàng Hoa Thám", "Nguyễn Thiện Thuật", "Đây là khởi nghĩa tiêu biểu và kéo dài nhất trong phong trào Cần Vương."],
    ["Khởi nghĩa Yên Thế do ai lãnh đạo?", "Hoàng Hoa Thám (Đề Thám)", "Phan Đình Phùng", "Đinh Công Tráng", "Khởi nghĩa Yên Thế ở Bắc Giang kéo dài gần 30 năm cuối thế kỉ XIX – đầu XX."],
    ["Truyền thống nổi bật trong các cuộc chiến tranh bảo vệ Tổ quốc của Việt Nam là gì?", "Toàn dân đánh giặc, lấy ít địch nhiều", "Chỉ dựa vào quân đội nước ngoài", "Chỉ phòng thủ bị động trong thành luỹ", "Tư tưởng “lấy đại nghĩa thắng hung tàn, lấy chí nhân thay cường bạo” của Nguyễn Trãi."],
    ["Hội nghị Diên Hồng thời Trần thể hiện truyền thống gì?", "Đoàn kết toàn dân, quyết tâm đánh giặc", "Chia rẽ trong nội bộ triều đình", "Chủ trương đầu hàng quân Nguyên", "Các bô lão cả nước đồng thanh hô “Đánh!” khi vua Trần hỏi nên hoà hay chiến."]
  ];
  var ls11t4P = [["Khởi nghĩa Hai Bà Trưng", "Năm 40"], ["Chiến thắng Bạch Đằng của Ngô Quyền", "Năm 938"], ["Kháng chiến chống Tống thời Lý", "Năm 1075 – 1077"], ["Chiến thắng Bạch Đằng thời Trần", "Năm 1288"], ["Khởi nghĩa Lam Sơn thắng lợi", "Năm 1418 – 1427"], ["Đại phá quân Thanh", "Năm 1789"], ["Pháp xâm lược Việt Nam", "Từ năm 1858"]];
  var ls11t5F = [
    ["Hồ Quý Ly thực hiện cải cách vào cuối triều đại nào?", "Cuối triều Trần, cuối thế kỉ XIV", "Đầu triều Lý, thế kỉ XI", "Cuối triều Nguyễn, thế kỉ XIX", "Hồ Quý Ly từng bước nắm quyền rồi lập ra nhà Hồ năm 1400."],
    ["Biện pháp tài chính nổi bật nhất của Hồ Quý Ly là gì?", "Phát hành tiền giấy Thông bảo hội sao năm 1396", "Đúc thêm thật nhiều tiền đồng mới", "Bãi bỏ hoàn toàn việc dùng tiền", "Tiền giấy thay tiền đồng nhằm giúp nhà nước chủ động tài chính, nhưng dân chưa quen dùng."],
    ["Chính sách “hạn điền” của Hồ Quý Ly nhằm mục đích gì?", "Hạn chế ruộng tư của vương hầu, quý tộc", "Chia đều ruộng cho mọi địa chủ lớn", "Bãi bỏ quyền sở hữu ruộng đất của nông dân", "Hạn điền (1397) quy định số ruộng tối đa được sở hữu, phần dư sung công."],
    ["Chính sách “hạn nô” của Hồ Quý Ly quy định điều gì?", "Hạn chế số nô tì của quý tộc, quan lại", "Tăng số nô tì cho các gia đình giàu", "Bãi bỏ mọi hình thức lao động phục dịch", "Số nô tì dư ra được sung vào quân đội và cơ quan nhà nước."],
    ["Hồ Quý Ly cho xây dựng kinh đô mới ở đâu?", "Thành Tây Đô (Thanh Hoá ngày nay)", "Thăng Long (Hà Nội ngày nay)", "Phú Xuân (Huế ngày nay)", "Thành nhà Hồ bằng đá ở Tây Đô nay là Di sản văn hoá thế giới."],
    ["Trong cải cách giáo dục, Hồ Quý Ly chú trọng điều gì?", "Mở rộng trường học, sửa đổi thi cử, đề cao Nho học", "Bãi bỏ hoàn toàn thi cử và trường học", "Chỉ dạy chữ Nôm, cấm dạy chữ Hán", "Ông đặt thêm học quan ở địa phương và đưa toán vào nội dung thi."],
    ["Lê Thánh Tông trị vì vào thời gian nào?", "Thế kỉ XV, từ năm 1460 đến năm 1497", "Thế kỉ XIV, từ năm 1397 đến năm 1400", "Thế kỉ XIX, từ năm 1820 đến năm 1840", "Lê Thánh Tông là vua Lê ở ngôi lâu nhất, đưa Đại Việt đạt đỉnh cao phong kiến."],
    ["Bộ luật nổi tiếng thời Lê Thánh Tông tên là gì?", "Quốc triều hình luật (luật Hồng Đức)", "Hoàng Việt luật lệ (luật Gia Long)", "Hình thư thời Lý", "Luật Hồng Đức bảo vệ quyền lợi của phụ nữ hơn nhiều bộ luật phong kiến cùng thời."],
    ["Lê Thánh Tông lập ra văn học hội nào nổi tiếng?", "Hội Tao Đàn, gồm 28 vị sao (Nhị thập bát tú)", "Hội thơ của các nhà Nho ẩn dật", "Câu lạc bộ văn học của thương nhân", "Vua Lê Thánh Tông là nguyên soái của Hội Tao Đàn, sáng tác nhiều thơ văn."],
    ["Cải cách hành chính của Lê Thánh Tông tập trung vào điều gì?", "Hoàn thiện quan chế, tăng quyền lực của vua", "Phân chia quyền lực cho các chúa phong kiến", "Bãi bỏ bộ máy quan lại ở địa phương", "Ông bãi bỏ chức tướng quốc, chia nước thành 13 đạo thừa tuyên, đặt lục bộ, lục tự."],
    ["Lê Thánh Tông cho vẽ và biên soạn bộ tài liệu địa lí nào?", "Hồng Đức bản đồ", "Dư địa chí của Nguyễn Trãi", "Đại Nam nhất thống chí", "Hồng Đức bản đồ là bộ bản đồ địa lí chính thức đầu tiên của Đại Việt."],
    ["Trong quân sự, Lê Thánh Tông tổ chức quân đội ra sao?", "Chia quân thành 5 phủ đô đốc, luyện tập thường xuyên", "Bãi bỏ quân đội thường trực", "Chỉ dựa vào quân của các địa phương tự lập", "Cải cách quân sự giúp quân đội Đại Việt tinh nhuệ, kỉ luật nghiêm."],
    ["Minh Mạng là vị vua thuộc triều đại nào?", "Triều Nguyễn, trị vì 1820 – 1840", "Triều Lê, trị vì 1460 – 1497", "Triều Hồ, trị vì 1400 – 1407", "Minh Mạng là con vua Gia Long, vị vua thứ hai của triều Nguyễn."],
    ["Cải cách hành chính lớn của Minh Mạng diễn ra khi nào?", "Năm 1831 – 1832", "Năm 1396 – 1397", "Năm 1460 – 1471", "Đây là cuộc cải cách hành chính quy mô lớn cuối cùng của chế độ phong kiến Việt Nam."],
    ["Nội dung chính của cải cách hành chính thời Minh Mạng là gì?", "Bỏ Bắc thành, Gia Định thành; chia nước thành tỉnh", "Chia nước thành 13 đạo thừa tuyên", "Lập thêm các trấn và tổng trấn lớn", "Cả nước được chia thành 30 tỉnh và phủ Thừa Thiên, đứng đầu tỉnh là tổng đốc, tuần phủ."],
    ["Minh Mạng đặt chức quan đứng đầu tỉnh là gì?", "Tổng đốc (tỉnh lớn) và tuần phủ (tỉnh nhỏ)", "Thừa tuyên sứ", "Lạc tướng", "Cải cách thống nhất bộ máy hành chính từ trung ương tới địa phương trong cả nước."],
    ["Mục đích chung của cải cách Minh Mạng là gì?", "Tập trung quyền lực, thống nhất quản lí đất nước", "Phân quyền cho các địa phương tự trị", "Chuẩn bị giao quyền cho thực dân Pháp", "Sau cải cách, bộ máy nhà nước Nguyễn chặt chẽ nhưng cũng quan liêu, cứng nhắc hơn."],
    ["Điểm chung của ba cuộc cải cách Hồ Quý Ly, Lê Thánh Tông, Minh Mạng là gì?", "Đều nhằm tăng cường quyền lực trung ương", "Đều bãi bỏ chế độ quân chủ", "Đều do giai cấp tư sản lãnh đạo", "Các cải cách đều xuất phát từ yêu cầu quản lí đất nước trong từng hoàn cảnh cụ thể."],
    ["Hạn chế lớn của cải cách Hồ Quý Ly là gì?", "Chưa được nhân dân ủng hộ, nhà Hồ mất nước nhanh", "Không có bất kì hạn chế nào", "Làm kinh tế đất nước sụp đổ hoàn toàn ngay", "Năm 1407, nhà Minh xâm lược, nhà Hồ sụp đổ sau 7 năm tồn tại."],
    ["Lê Thánh Tông quy định chế độ thi cử và tuyển quan thế nào?", "Định lệ 3 năm mở một khoa thi, tuyển người tài", "Chỉ tuyển con em quý tộc không cần thi", "Bãi bỏ thi cử, chỉ mua bán quan chức", "Thời Lê sơ, Nho giáo độc tôn, giáo dục và thi cử phát triển mạnh."],
    ["Cơ quan nào thời Lê Thánh Tông giúp vua kiểm soát quan lại?", "Ngự sử đài", "Hội Tao Đàn", "Ty Thông chính", "Ngự sử đài có nhiệm vụ đàn hặc, giám sát quan lại các cấp."],
    ["Hồ Quý Ly cải cách chế độ quân đội theo hướng nào?", "Xây dựng quân thường trực, chế tạo súng thần cơ", "Giải tán toàn bộ quân đội", "Chỉ dùng quân thuê của nước ngoài", "Hồ Nguyên Trừng, con Hồ Quý Ly, là người chế tạo súng thần cơ nổi tiếng."],
    ["Sau cải cách của Minh Mạng, đơn vị hành chính lớn nhất dưới trung ương là gì?", "Tỉnh", "Đạo thừa tuyên", "Trấn", "Tên gọi “tỉnh” và địa giới nhiều tỉnh ngày nay bắt đầu từ cải cách năm 1831 – 1832."],
    ["Vì sao cải cách của Lê Thánh Tông được đánh giá toàn diện nhất?", "Cải cách trên mọi lĩnh vực: chính trị, luật, quân sự", "Chỉ cải cách duy nhất về tiền tệ", "Chỉ cải cách duy nhất về giáo dục", "Dưới thời Lê Thánh Tông, Đại Việt hùng mạnh và mở rộng lãnh thổ về phía nam."]
  ];
  var ls11t5P = [["Phát hành tiền giấy Thông bảo hội sao", "Hồ Quý Ly, năm 1396"], ["Chính sách hạn điền, hạn nô", "Hồ Quý Ly, cuối thế kỉ XIV"], ["Quốc triều hình luật (Hồng Đức)", "Lê Thánh Tông – lĩnh vực luật pháp"], ["Hội Tao Đàn văn học", "Lê Thánh Tông – lĩnh vực văn học"], ["Chia nước thành 13 đạo thừa tuyên", "Lê Thánh Tông – cải cách hành chính"], ["Chia nước thành các tỉnh năm 1831", "Minh Mạng, năm 1831 – 1832"], ["Bỏ Bắc thành và Gia Định thành", "Minh Mạng – thống nhất hành chính"]];
  var ls11t6F = [
    ["Biển Đông có vị trí chiến lược quan trọng vì lí do nào?", "Nằm trên tuyến hàng hải nối Thái Bình – Ấn Độ Dương", "Là biển kín, ít tàu thuyền qua lại", "Không có tài nguyên gì đáng kể", "Mỗi năm có lượng hàng hoá khổng lồ qua Biển Đông, nối Đông Á với thế giới."],
    ["Hai quần đảo lớn của Việt Nam ở Biển Đông là quần đảo nào?", "Hoàng Sa và Trường Sa", "Côn Đảo và Phú Quốc", "Cát Bà và Cô Tô", "Hoàng Sa thuộc thành phố Đà Nẵng, Trường Sa thuộc tỉnh Khánh Hoà."],
    ["Quần đảo Hoàng Sa thuộc đơn vị hành chính nào của Việt Nam?", "Huyện đảo Hoàng Sa, thành phố Đà Nẵng", "Huyện đảo Trường Sa, tỉnh Khánh Hoà", "Huyện đảo Lý Sơn, tỉnh Quảng Ngãi", "Hoàng Sa nằm gần bờ biển miền Trung của Việt Nam nhất."],
    ["Quần đảo Trường Sa thuộc đơn vị hành chính nào của Việt Nam?", "Huyện đảo Trường Sa, tỉnh Khánh Hoà", "Huyện đảo Hoàng Sa, thành phố Đà Nẵng", "Huyện đảo Phú Quốc, tỉnh Kiên Giang", "Trường Sa nằm ở phía đông nam vùng biển Việt Nam."],
    ["Công ước Liên hợp quốc về Luật Biển (UNCLOS) được kí năm nào?", "Năm 1982", "Năm 1958", "Năm 2012", "UNCLOS 1982 là “Hiến chương của đại dương”, có hiệu lực từ năm 1994."],
    ["Theo UNCLOS 1982, vùng đặc quyền kinh tế rộng bao nhiêu?", "200 hải lí tính từ đường cơ sở", "12 hải lí tính từ đường cơ sở", "Không giới hạn phạm vi", "Trong vùng này, quốc gia ven biển có quyền chủ quyền về thăm dò, khai thác tài nguyên."],
    ["Theo UNCLOS 1982, lãnh hải của quốc gia ven biển rộng bao nhiêu?", "12 hải lí", "200 hải lí", "24 hải lí", "Lãnh hải là vùng biển thuộc chủ quyền hoàn toàn của quốc gia ven biển."],
    ["Thềm lục địa theo UNCLOS được hiểu là gì?", "Phần kéo dài tự nhiên của lục địa dưới biển", "Vùng biển quốc tế không thuộc nước nào", "Vùng nước trên không phận quốc tế", "Quốc gia ven biển có quyền chủ quyền khai thác tài nguyên ở thềm lục địa."],
    ["Luật Biển Việt Nam được Quốc hội thông qua năm nào?", "Năm 2012", "Năm 1982", "Năm 1994", "Luật Biển Việt Nam phù hợp với UNCLOS 1982 mà Việt Nam phê chuẩn năm 1994."],
    ["Đội Hoàng Sa kiêm quản Bắc Hải thời chúa Nguyễn làm nhiệm vụ gì?", "Khai thác, đo đạc, cắm mốc ở Hoàng Sa, Trường Sa", "Buôn bán với các nước phương Tây", "Xây dựng hải cảng ở miền Bắc", "Từ thế kỉ XVII, các chúa Nguyễn tổ chức đội Hoàng Sa ra quần đảo hằng năm."],
    ["Vua Minh Mạng có hoạt động gì khẳng định chủ quyền ở Hoàng Sa?", "Cho cắm bia, dựng miếu, đo đạc thuỷ trình", "Giao Hoàng Sa cho nước ngoài quản lí", "Không quan tâm tới biển đảo", "Châu bản triều Nguyễn là bằng chứng pháp lí quan trọng về chủ quyền biển đảo."],
    ["Bằng chứng lịch sử – pháp lí về chủ quyền biển đảo Việt Nam gồm những gì?", "Châu bản, bản đồ cổ, sắc phong và thư tịch cổ", "Chỉ là truyền thuyết dân gian không kiểm chứng", "Các bài báo nước ngoài gần đây", "Việt Nam quản lí hoà bình, liên tục Hoàng Sa và Trường Sa từ nhiều thế kỉ."],
    ["Biển Đông giàu tài nguyên nào quan trọng cho kinh tế?", "Dầu khí, hải sản và tài nguyên sinh vật biển", "Chỉ có cát và nước biển", "Không có sinh vật biển nào sinh sống", "Trữ lượng dầu khí và ngư trường lớn là cơ sở kinh tế biển của Việt Nam."],
    ["Việt Nam tuyên bố về chủ quyền ở Biển Đông dựa trên cơ sở nào?", "Lịch sử quản lí lâu đời và luật pháp quốc tế", "Chỉ dựa trên sức mạnh quân sự", "Không cần cơ sở pháp lí nào", "Việt Nam chủ trương giải quyết tranh chấp bằng biện pháp hoà bình, theo UNCLOS."],
    ["Đường cơ sở dùng để tính chiều rộng các vùng biển là gì?", "Đường nối các điểm nhô ra nhất của bờ biển, đảo", "Đường biên giới trên đất liền kéo dài", "Đường hàng hải quốc tế qua Biển Đông", "Từ đường cơ sở tính ra lãnh hải 12 hải lí và vùng đặc quyền kinh tế 200 hải lí."],
    ["Vùng tiếp giáp lãnh hải theo UNCLOS rộng bao nhiêu?", "24 hải lí tính từ đường cơ sở", "200 hải lí tính từ đường cơ sở", "12 hải lí tính từ đường cơ sở", "Trong vùng tiếp giáp, quốc gia ven biển kiểm soát về hải quan, thuế, y tế, nhập cư."],
    ["Biển Đông tiếp giáp với bao nhiêu quốc gia và vùng lãnh thổ ven biển?", "Khoảng 9 quốc gia và vùng lãnh thổ", "Chỉ 2 quốc gia", "Khoảng 20 quốc gia", "Các nước ven Biển Đông gồm Việt Nam, Trung Quốc, Phi-líp-pin, Ma-lai-xi-a, Bru-nây…"],
    ["Tuyên bố của Chính phủ Việt Nam năm 1977 và 1988 khẳng định điều gì?", "Chủ quyền của Việt Nam với Hoàng Sa, Trường Sa", "Việt Nam từ bỏ chủ quyền biển đảo", "Chỉ khẳng định chủ quyền trên đất liền", "Các tuyên bố, sách trắng ngoại giao đều nhất quán khẳng định chủ quyền biển đảo."],
    ["Ngư dân Việt Nam gắn bó với Hoàng Sa, Trường Sa thể hiện điều gì?", "Sinh kế lâu đời và sự hiện diện liên tục của Việt Nam", "Hoạt động đánh bắt mới xuất hiện gần đây", "Không liên quan gì tới chủ quyền", "Lễ khao lề thế lính Hoàng Sa ở Lý Sơn tưởng nhớ đội Hoàng Sa xưa."],
    ["Chủ trương của Việt Nam trong giải quyết tranh chấp Biển Đông là gì?", "Hoà bình, trên cơ sở luật pháp quốc tế, UNCLOS 1982", "Dùng vũ lực để giải quyết mọi tranh chấp", "Đơn phương từ bỏ mọi quyền lợi biển", "Việt Nam đồng thời kiên trì bảo vệ chủ quyền và giữ môi trường hoà bình, ổn định."],
    ["Hải đội Hoàng Sa xuất phát từ địa phương nào ngày nay?", "Đảo Lý Sơn, tỉnh Quảng Ngãi", "Đảo Phú Quốc, tỉnh Kiên Giang", "Đảo Cát Bà, thành phố Hải Phòng", "Đội Hoàng Sa gồm những trai tráng giỏi biển ở làng An Vĩnh, An Hải trên đảo Lý Sơn."],
    ["Năm 1974 và 1988 xảy ra sự kiện đau thương nào ở biển đảo?", "Trung Quốc dùng vũ lực chiếm đóng trái phép một số đảo", "Việt Nam tự nguyện giao đảo cho nước ngoài", "Các đảo bị chìm hoàn toàn do bão lớn", "Việt Nam luôn khẳng định việc chiếm đóng bằng vũ lực là trái luật pháp quốc tế."],
    ["Kinh tế biển đóng góp gì cho sự phát triển của Việt Nam?", "Nguồn lực lớn về thương mại, năng lượng, du lịch, thuỷ sản", "Không đóng góp gì cho kinh tế đất nước", "Chỉ gây khó khăn cho phát triển", "Chiến lược phát triển bền vững kinh tế biển Việt Nam đặt mục tiêu đến năm 2030, tầm nhìn 2045."],
    ["Học sinh cần làm gì để góp phần bảo vệ chủ quyền biển đảo?", "Hiểu đúng lịch sử, pháp lí; tuyên truyền thông tin đúng", "Chia sẻ mọi tin chưa kiểm chứng trên mạng", "Không cần quan tâm vì đã có nhà nước lo", "Mỗi công dân là một tuyên truyền viên về chủ quyền biển đảo Tổ quốc."]
  ];
  var ls11t6P = [["Quần đảo Hoàng Sa", "Thuộc Đà Nẵng"], ["Quần đảo Trường Sa", "Thuộc Khánh Hoà"], ["UNCLOS – Công ước Luật Biển", "Năm 1982"], ["Vùng đặc quyền kinh tế", "200 hải lí"], ["Lãnh hải", "12 hải lí"], ["Luật Biển Việt Nam", "Năm 2012"], ["Đội Hoàng Sa thời Nguyễn", "Từ đảo Lý Sơn"]];
  var ls11cd1F = [
    ["Nghệ thuật thời Lý – Trần chịu ảnh hưởng mạnh của tôn giáo nào?", "Phật giáo", "Thiên Chúa giáo", "Hồi giáo", "Thời Lý – Trần, Phật giáo thịnh hành, nhiều chùa tháp được xây dựng khắp nước."],
    ["Công trình Phật giáo tiêu biểu được xây ở Thăng Long thời Lý là gì?", "Chùa Một Cột", "Chùa Hương", "Tháp Phổ Minh", "Chùa Một Cột (1049) có kiến trúc hoa sen độc đáo, biểu tượng của Hà Nội."],
    ["Tháp Phổ Minh là di tích Phật giáo nổi tiếng thời nào?", "Thời Trần, ở Nam Định ngày nay", "Thời Lý, ở Bắc Ninh ngày nay", "Thời Nguyễn, ở Huế ngày nay", "Tháp Phổ Minh cao 14 tầng, là trung tâm Phật giáo lớn thời Trần."],
    ["Múa rối nước của Việt Nam ra đời vào thời kì nào?", "Thời Lý", "Thời Nguyễn", "Thời Lê trung hưng", "Rối nước gắn với nền văn minh lúa nước và lễ hội làng quê Bắc Bộ."],
    ["Gốm thời Lý – Trần có màu men đặc trưng nào?", "Men ngọc, men nâu và hoa nâu", "Men lam duy nhất", "Men đa sắc ngũ thái", "Gốm hoa nâu thời Trần với hoa văn khắc chìm mang đậm bản sắc dân tộc."],
    ["Kiến trúc thời Lê sơ chịu ảnh hưởng tư tưởng nào là chủ đạo?", "Nho giáo", "Phật giáo", "Đạo giáo", "Thời Lê sơ, Nho giáo độc tôn nên kiến trúc, điêu khắc mang tính quy củ, chuẩn mực."],
    ["Văn Miếu – Quốc Tử Giám được tôn tạo lớn vào thời kì nào?", "Thời Lê sơ", "Thời Lý", "Thời Nguyễn", "Các bia tiến sĩ ở Văn Miếu được dựng từ thời Lê sơ (từ năm 1484)."],
    ["Nghệ thuật thời Mạc có điểm đáng chú ý nào?", "Chùa tháp, tượng Phật vẫn phát triển ở làng quê", "Nghệ thuật hoàn toàn suy tàn, biến mất", "Chỉ phát triển nghệ thuật cung đình", "Triều Mạc (1527 – 1592) để lại nhiều chùa, tượng có giá trị ở vùng đồng bằng Bắc Bộ."],
    ["Đình làng Việt Nam phát triển rực rỡ vào thời kì nào?", "Thời Lê trung hưng, thế kỉ XVII – XVIII", "Thời Lý, thế kỉ XI – XII", "Thời Nguyễn, thế kỉ XIX", "Đình là trung tâm sinh hoạt cộng đồng làng, nổi tiếng với chạm khắc gỗ tinh xảo."],
    ["Đình Đình Bảng, đình Tây Đằng nổi tiếng vì nét nghệ thuật nào?", "Chạm khắc gỗ dân gian tinh xảo, sống động", "Sơn mài khảm trai cầu kì", "Kiến trúc bằng đá nguyên khối", "Đề tài chạm khắc đình làng gần gũi đời sống: rồng, phượng, cảnh sinh hoạt dân gian."],
    ["Tranh dân gian Đông Hồ có nguồn gốc ở tỉnh nào ngày nay?", "Bắc Ninh", "Hà Nội", "Nam Định", "Tranh Đông Hồ in bằng bản khắc gỗ, màu từ nguyên liệu tự nhiên, bán dịp Tết."],
    ["Tranh dân gian Hàng Trống có nguồn gốc ở đâu?", "Hà Nội", "Bắc Ninh", "Hải Phòng", "Hàng Trống là dòng tranh thờ và tranh Tết của kinh thành Thăng Long xưa."],
    ["Nghệ thuật kiến trúc thời Nguyễn tiêu biểu nhất ở đâu?", "Cố đô Huế với kinh thành, lăng tẩm", "Thăng Long với hoàng thành", "Phố Hiến với thương cảng", "Quần thể di tích Cố đô Huế được UNESCO công nhận Di sản văn hoá thế giới năm 1993."],
    ["Nhã nhạc cung đình triều Nguyễn được UNESCO công nhận năm nào?", "Năm 2003, di sản phi vật thể", "Năm 1993, di sản vật thể", "Năm 2009, di sản tư liệu", "Nhã nhạc là di sản văn hoá phi vật thể đầu tiên của Việt Nam được UNESCO vinh danh."],
    ["Ca trù là loại hình nghệ thuật truyền thống của vùng nào?", "Đồng bằng Bắc Bộ", "Tây Nguyên", "Nam Bộ", "Ca trù được UNESCO ghi danh năm 2009 vào danh sách cần bảo vệ khẩn cấp."],
    ["Đờn ca tài tử là nghệ thuật đặc trưng của vùng nào?", "Nam Bộ", "Bắc Bộ", "Trung Bộ", "Đờn ca tài tử Nam Bộ được UNESCO công nhận là Di sản phi vật thể năm 2013."],
    ["Tượng gỗ đình làng thời Lê trung hưng thể hiện điều gì?", "Đời sống, ước vọng của người nông dân", "Chỉ ca ngợi vua chúa và quan lại", "Hoàn toàn sao chép mẫu tượng nước ngoài", "Chạm khắc đình làng là đỉnh cao của điêu khắc gỗ dân gian Việt Nam."],
    ["Gốm Chu Đậu nổi tiếng thuộc địa phương nào ngày nay?", "Hải Dương", "Bắc Ninh", "Hà Nội", "Gốm Chu Đậu thời Lê sơ có men trắng, hoa văn lam tinh tế, xuất khẩu ra nhiều nước."],
    ["Gốm Bát Tràng phát triển mạnh từ thời kì nào?", "Từ thời Lê, ở làng Bát Tràng bên sông Hồng", "Từ thời Nguyễn, ở Huế", "Từ thế kỉ XX, thời hiện đại", "Bát Tràng (Hà Nội ngày nay) là làng gốm truyền thống nổi tiếng hàng trăm năm."],
    ["Nghệ thuật sân khấu truyền thống lâu đời của Bắc Bộ là gì?", "Chèo", "Cải lương", "Tuồng", "Chèo là sân khấu dân gian tổng hợp hát, múa, diễn xuất gắn với làng quê Bắc Bộ."],
    ["Tuồng (hát bội) phát triển mạnh ở khu vực nào?", "Trung Bộ và cung đình thời Nguyễn", "Chỉ ở Tây Nguyên", "Chỉ ở vùng cao phía Bắc", "Tuồng mang tính bác học, ước lệ cao, đề cao trung – hiếu – tiết – nghĩa."],
    ["Cải lương ra đời và phát triển ở đâu vào đầu thế kỉ XX?", "Nam Bộ", "Bắc Bộ", "Trung Bộ", "Cải lương kết hợp đờn ca tài tử, hát bội và tân nhạc, rất được ưa chuộng ở Nam Bộ."],
    ["Điểm chung của nghệ thuật truyền thống Việt Nam là gì?", "Gắn với làng quê, cộng đồng và lễ hội", "Chỉ phục vụ riêng cho vua chúa", "Tách rời hoàn toàn đời sống nhân dân", "Nghệ thuật truyền thống là kết tinh lao động sáng tạo của nhiều thế hệ người Việt."],
    ["Tranh dân gian Việt Nam thường được dùng nhiều nhất vào dịp nào?", "Dịp Tết Nguyên đán", "Dịp lễ hội mùa thu hoạch lúa chiêm", "Quanh năm không theo mùa nào", "Tranh Tết mang ước vọng phúc, lộc, no đủ cho năm mới."]
  ];
  var ls11cd1P = [["Chùa Một Cột", "Thời Lý"], ["Tháp Phổ Minh", "Thời Trần"], ["Bia tiến sĩ Văn Miếu dựng nhiều", "Thời Lê sơ"], ["Đình làng chạm khắc rực rỡ", "Thời Lê trung hưng"], ["Tranh Đông Hồ", "Bắc Ninh"], ["Tranh Hàng Trống", "Hà Nội"], ["Nhã nhạc cung đình", "Triều Nguyễn ở Huế"]];
  var ls11cd2F = [
    ["Chiến tranh thế giới thứ nhất diễn ra vào thời gian nào?", "Từ năm 1914 đến năm 1918", "Từ năm 1939 đến năm 1945", "Từ năm 1917 đến năm 1922", "Chiến tranh giữa phe Hiệp ước và phe Liên minh, gây tổn thất nặng nề cho nhân loại."],
    ["Chiến tranh thế giới thứ hai diễn ra vào thời gian nào?", "Từ năm 1939 đến năm 1945", "Từ năm 1914 đến năm 1918", "Từ năm 1945 đến năm 1991", "Đức phát xít tấn công Ba Lan ngày 1 – 9 – 1939, mở đầu chiến tranh."],
    ["Sự kiện nào mở đầu Chiến tranh thế giới thứ hai?", "Đức tấn công Ba Lan ngày 1 – 9 – 1939", "Nhật tấn công Trân Châu Cảng năm 1941", "Đức tấn công Liên Xô năm 1941", "Ngày 2 – 9 – 1945, Nhật kí văn kiện đầu hàng, chiến tranh kết thúc."],
    ["Mĩ ném bom nguyên tử xuống hai thành phố nào của Nhật năm 1945?", "Hi-rô-si-ma và Na-ga-xa-ki", "Tô-ki-ô và Ô-xa-ca", "Ki-ô-tô và Na-gôi-a", "Vụ ném bom tháng 8 – 1945 khiến hàng trăm nghìn dân thường thiệt mạng."],
    ["Liên hợp quốc được thành lập vào năm nào?", "Năm 1945", "Năm 1919", "Năm 1955", "Liên hợp quốc ra đời sau Thế chiến II nhằm duy trì hoà bình và an ninh quốc tế."],
    ["Tổ chức tiền thân của Liên hợp quốc sau Thế chiến thứ nhất là gì?", "Hội Quốc liên, thành lập năm 1919", "Tổ chức NATO", "Liên minh châu Âu", "Hội Quốc liên yếu kém, không ngăn được Chiến tranh thế giới thứ hai bùng nổ."],
    ["Chiến tranh lạnh là trạng thái đối đầu giữa hai phe nào?", "Mĩ, phương Tây với Liên Xô, các nước XHCN", "Anh với Pháp", "Đức với Nhật Bản", "Chiến tranh lạnh kéo dài từ năm 1947 đến năm 1991, không nổ ra chiến tranh trực tiếp."],
    ["Sự kiện nào đánh dấu Chiến tranh lạnh chấm dứt?", "Liên Xô tan rã năm 1991", "Liên hợp quốc thành lập năm 1945", "Bức tường Béc-lin xây dựng năm 1961", "Thế giới chuyển từ đối đầu hai cực sang xu thế đa cực, hoà bình, hợp tác."],
    ["Khối quân sự NATO được thành lập năm nào?", "Năm 1949, do Mĩ đứng đầu", "Năm 1955, do Liên Xô đứng đầu", "Năm 1945, do Liên hợp quốc lập", "Khối Vác-sa-va (1955) là đối trọng của NATO trong Chiến tranh lạnh."],
    ["Chiến tranh Triều Tiên diễn ra vào thời gian nào?", "Từ năm 1950 đến năm 1953", "Từ năm 1955 đến năm 1975", "Từ năm 1962 đến năm 1963", "Bán đảo Triều Tiên bị chia cắt thành hai miền từ sau năm 1945 đến nay."],
    ["Phong trào giải phóng dân tộc sau 1945 có tác động gì?", "Làm sụp đổ hệ thống thuộc địa của chủ nghĩa đế quốc", "Khôi phục hệ thống thuộc địa cũ", "Không ảnh hưởng tới trật tự thế giới", "Hàng loạt quốc gia Á, Phi, Mĩ La-tinh giành độc lập sau Thế chiến II."],
    ["Hội nghị Ban-đung năm 1955 có ý nghĩa gì?", "Đánh dấu các nước Á – Phi bước lên vũ đài quốc tế", "Thành lập khối quân sự NATO", "Kí hiệp ước kết thúc Thế chiến II", "Hội nghị ở In-đô-nê-xi-a mở đầu Phong trào Không liên kết."],
    ["Phong trào Không liên kết chính thức ra đời năm nào?", "Năm 1961, tại Bê-ô-grát", "Năm 1945, tại Xan Phran-xi-xcô", "Năm 1955, tại Ban-đung", "Phong trào tập hợp các nước không liên minh quân sự với Mĩ hay Liên Xô."],
    ["Ngày 6 tháng 8 hằng năm được nhiều nơi tưởng niệm vì sự kiện gì?", "Vụ ném bom nguyên tử xuống Hi-rô-si-ma năm 1945", "Ngày kết thúc Chiến tranh thế giới thứ nhất", "Ngày thành lập Liên hợp quốc", "Phong trào hoà bình thế giới đấu tranh đòi cấm vũ khí hạt nhân."],
    ["Hiệp ước cấm thử vũ khí hạt nhân và giải trừ quân bị thuộc nội dung nào?", "Đấu tranh vì hoà bình, chống chạy đua vũ trang", "Cạnh tranh kinh tế giữa các nước", "Mở rộng thuộc địa", "Nhiều hiệp ước quốc tế về giải trừ quân bị được kí trong và sau Chiến tranh lạnh."],
    ["Việt Nam có đóng góp gì cho phong trào hoà bình thế giới?", "Kí Hiệp định Giơ-ne-vơ 1954 và Pa-ri 1973", "Không tham gia hoạt động quốc tế nào", "Chỉ tập trung vào chiến tranh", "Thắng lợi của nhân dân Việt Nam cổ vũ mạnh phong trào hoà bình, giải phóng dân tộc."],
    ["Chiến tranh thế giới thứ hai kết thúc với thắng lợi của phe nào?", "Phe Đồng minh chống phát xít", "Phe phát xít Đức, Italia, Nhật", "Không phe nào thắng lợi cả", "Liên Xô, Mĩ, Anh là ba cường quốc chính của phe Đồng minh."],
    ["Hậu quả nặng nề nhất của hai cuộc chiến tranh thế giới là gì?", "Hàng chục triệu người chết, tàn phá khủng khiếp", "Chỉ thiệt hại nhẹ về kinh tế", "Không ảnh hưởng tới dân thường", "Thế chiến II làm hơn 60 triệu người chết, nhiều thành phố bị huỷ diệt."],
    ["Tổ chức UNESCO thuộc hệ thống nào, hoạt động vì mục tiêu gì?", "Thuộc Liên hợp quốc, vì giáo dục, văn hoá, hoà bình", "Thuộc NATO, vì mục tiêu quân sự", "Tổ chức thương mại thuần tuý", "UNESCO xây dựng hoà bình bằng giáo dục, khoa học và văn hoá."],
    ["Xu thế lớn của thế giới sau khi Chiến tranh lạnh kết thúc là gì?", "Hoà bình, hợp tác, phát triển và toàn cầu hoá", "Đối đầu quân sự ngày càng gay gắt hơn", "Quay lại trật tự hai cực như cũ", "Các nước vừa hợp tác, vừa đấu tranh, cạnh tranh vì lợi ích quốc gia."],
    ["Bức tường Béc-lin sụp đổ năm 1989 báo hiệu điều gì?", "Chế độ XHCN ở Đông Âu sụp đổ, nước Đức thống nhất", "Chiến tranh lạnh bắt đầu bùng nổ", "Liên Xô mở rộng ảnh hưởng sang Tây Âu", "Năm 1990, nước Đức chính thức thống nhất."],
    ["Phong trào hoà bình thế giới sau 1945 đấu tranh chống điều gì trước tiên?", "Chống chiến tranh hạt nhân, chạy đua vũ trang", "Chống thương mại quốc tế", "Chống giao lưu văn hoá giữa các nước", "Đại hội hoà bình thế giới và các tổ chức nhân dân tiến bộ ra đời sau Thế chiến II."],
    ["Hiệp định Pa-ri về Việt Nam được kí vào năm nào?", "Năm 1973", "Năm 1954", "Năm 1975", "Hiệp định buộc Mĩ rút quân khỏi miền Nam Việt Nam, tôn trọng độc lập của Việt Nam."],
    ["Bài học lớn nhất rút ra từ hai cuộc chiến tranh thế giới là gì?", "Phải bảo vệ hoà bình, ngăn ngừa chiến tranh từ sớm", "Chiến tranh là cách tốt nhất giải quyết mâu thuẫn", "Các nước nhỏ không cần quan tâm hoà bình", "Đây cũng là mục tiêu xuyên suốt của Liên hợp quốc từ năm 1945 đến nay."]
  ];
  var ls11cd2P = [["Chiến tranh thế giới thứ nhất", "Năm 1914 – 1918"], ["Chiến tranh thế giới thứ hai", "Năm 1939 – 1945"], ["Liên hợp quốc thành lập", "Năm 1945"], ["Khối NATO thành lập", "Năm 1949"], ["Hội nghị Ban-đung", "Năm 1955"], ["Hiệp định Pa-ri về Việt Nam", "Năm 1973"], ["Chiến tranh lạnh kết thúc", "Năm 1991"]];
  var ls11cd3F = [
    ["Danh nhân nào được UNESCO vinh danh là Anh hùng giải phóng dân tộc, nhà văn hoá lớn?", "Hồ Chí Minh và Nguyễn Trãi, Nguyễn Du", "Chỉ có các danh nhân nước ngoài", "Chưa có danh nhân Việt Nam nào", "Nguyễn Trãi (1980), Hồ Chí Minh (1990), Nguyễn Du (2015) được UNESCO vinh danh."],
    ["Chu Văn An là danh nhân tiêu biểu ở lĩnh vực nào?", "Giáo dục, nhà giáo mẫu mực thời Trần", "Quân sự, tướng lĩnh thời Trần", "Y học, thầy thuốc thời Lê", "Chu Văn An từng dạy học ở Quốc Tử Giám, nổi tiếng cương trực, dâng “Thất trảm sớ”."],
    ["Nguyễn Trãi có đóng góp lớn nào cho dân tộc?", "Giúp Lê Lợi thắng Minh, viết “Bình Ngô đại cáo”", "Lãnh đạo kháng chiến chống Tống", "Sáng lập triều Nguyễn năm 1802", "Nguyễn Trãi là nhà chính trị, quân sự, văn hoá kiệt xuất thế kỉ XV."],
    ["Lê Thánh Tông được đánh giá là danh nhân ở lĩnh vực nào?", "Chính trị, luật pháp và văn học", "Chỉ ở lĩnh vực y học", "Chỉ ở lĩnh vực toán học", "Ông vừa là vua cải cách, tác giả luật Hồng Đức, vừa là thi nhân Hội Tao Đàn."],
    ["Lương Thế Vinh nổi tiếng là danh nhân ở lĩnh vực nào?", "Toán học, trạng nguyên thời Lê sơ", "Âm nhạc cung đình", "Kiến trúc chùa tháp", "Lương Thế Vinh được dân gian gọi là “Trạng Lường”, giỏi toán và đo lường."],
    ["Lê Quý Đôn được coi là danh nhân ở lĩnh vực nào?", "Khoa học, bác học đa lĩnh vực thời Lê trung hưng", "Chỉ là võ tướng đánh giặc", "Chỉ là nghệ nhân dân gian", "Lê Quý Đôn để lại nhiều bộ bách khoa như “Đại Việt thông sử”, “Kiến văn tiểu lục”."],
    ["Hải Thượng Lãn Ông là danh nhân của ngành nào?", "Y học, tên thật là Lê Hữu Trác", "Thiên văn học", "Địa lí học", "Bộ “Hải Thượng y tông tâm lĩnh” là công trình y học đồ sộ của ông."],
    ["Nguyễn Du là danh nhân văn hoá với tác phẩm nào?", "“Truyện Kiều”", "“Bình Ngô đại cáo”", "“Hịch tướng sĩ”", "Nguyễn Du là đại thi hào dân tộc, được UNESCO vinh danh Danh nhân văn hoá thế giới."],
    ["Hồ Xuân Hương được mệnh danh là gì trong văn học?", "“Bà chúa thơ Nôm”", "“Bà chúa thơ Đường luật”", "“Nữ trạng nguyên” duy nhất", "Thơ Hồ Xuân Hương sắc sảo, khẳng định tiếng nói của người phụ nữ."],
    ["Trần Hưng Đạo là danh nhân tiêu biểu ở lĩnh vực nào?", "Quân sự, anh hùng chống Nguyên – Mông", "Văn học, nhà thơ cung đình", "Giáo dục, nhà giáo thời Trần", "Ông để lại “Hịch tướng sĩ” khơi dậy tinh thần yêu nước của quân sĩ."],
    ["Lý Thường Kiệt là danh nhân quân sự gắn với chiến công nào?", "Đánh thắng quân Tống trên sông Như Nguyệt", "Đánh thắng quân Nguyên ở Bạch Đằng", "Đánh thắng quân Thanh ở Ngọc Hồi", "Ông chủ trương “ngồi yên đợi giặc không bằng đem quân đánh trước”."],
    ["Quang Trung – Nguyễn Huệ là danh nhân ở lĩnh vực nào?", "Quân sự và chính trị, thủ lĩnh Tây Sơn", "Chỉ ở lĩnh vực văn học", "Chỉ ở lĩnh vực y học", "Quang Trung đại phá quân Xiêm (1785) và quân Thanh (1789)."],
    ["Võ Nguyên Giáp là danh nhân quân sự gắn với thắng lợi nào?", "Chiến thắng Điện Biên Phủ năm 1954", "Chiến thắng Bạch Đằng năm 1288", "Chiến thắng Ngọc Hồi năm 1789", "Đại tướng Võ Nguyên Giáp là Tổng tư lệnh trong hai cuộc kháng chiến chống Pháp, chống Mĩ."],
    ["Phan Huy Chú là danh nhân ở lĩnh vực nào?", "Sử học, tác giả “Lịch triều hiến chương loại chí”", "Toán học", "Y học", "Bộ sách của Phan Huy Chú được coi là bách khoa thư về chế độ, văn hoá Việt Nam xưa."],
    ["Đào Duy Từ có đóng góp gì nổi bật thời chúa Nguyễn?", "Cố vấn chính trị, quân sự; cho xây luỹ Thầy", "Sáng lập triều Nguyễn", "Lãnh đạo phong trào Tây Sơn", "Luỹ Thầy ở Quảng Bình giúp chúa Nguyễn chống quân Trịnh ở Đàng Ngoài."],
    ["Nguyễn Bỉnh Khiêm được dân gian tôn xưng là gì?", "Trạng Trình, nhà tiên tri, nhà thơ lớn", "Trạng Lường, nhà toán học", "Trạng Bùng, nhà ngoại giao", "Nguyễn Bỉnh Khiêm là danh nhân văn hoá thế kỉ XVI, tác giả tập thơ “Bạch Vân am thi tập”."],
    ["Tôn Thất Tùng là danh nhân của ngành nào ở Việt Nam hiện đại?", "Y học, nổi tiếng về phẫu thuật gan", "Vật lí hạt nhân", "Kiến trúc đô thị", "Giáo sư Tôn Thất Tùng có phương pháp cắt gan mang tên ông, nổi tiếng thế giới."],
    ["Trần Đại Nghĩa là danh nhân ở lĩnh vực nào?", "Khoa học quân sự, chế tạo vũ khí kháng chiến", "Văn học nghệ thuật", "Sử học cổ điển", "Giáo sư Trần Đại Nghĩa góp phần chế tạo ba-dô-ca, súng không giật trong kháng chiến chống Pháp."],
    ["Đặng Văn Ngữ nổi tiếng với đóng góp nào cho y học?", "Nghiên cứu sản xuất penicillin kháng chiến", "Phẫu thuật gan", "Nghiên cứu về tim mạch", "Giáo sư Đặng Văn Ngữ hi sinh ở Trường Sơn năm 1967 khi nghiên cứu sốt rét."],
    ["Nguyễn Đình Chiểu là danh nhân văn hoá tiêu biểu của vùng nào?", "Nam Bộ, tác giả “Lục Vân Tiên”", "Bắc Bộ, tác giả “Truyện Kiều”", "Trung Bộ, tác giả “Chinh phụ ngâm”", "Nguyễn Đình Chiểu là nhà thơ mù yêu nước, biểu tượng văn hoá Nam Bộ thế kỉ XIX."],
    ["Cao Bá Quát, Nguyễn Văn Siêu được tôn vinh ở lĩnh vực nào?", "Văn học, giáo dục ở Thăng Long thế kỉ XIX", "Quân sự chống Pháp", "Y học dân tộc", "Dân gian có câu “Thần Siêu, thánh Quát” ca ngợi văn tài của hai ông."],
    ["Bà Huyện Thanh Quan là danh nhân ở lĩnh vực nào?", "Thơ Nôm Đường luật, nữ sĩ thời Nguyễn", "Chính trị, nữ tướng thời Tây Sơn", "Khoa học, nhà toán học nữ", "Bà nổi tiếng với bài thơ “Qua Đèo Ngang” và “Thăng Long thành hoài cổ”."],
    ["Điểm chung của các danh nhân trong lịch sử Việt Nam là gì?", "Tài năng gắn liền với cống hiến cho dân tộc", "Chỉ nổi tiếng nhờ dòng dõi quý tộc", "Không để lại di sản gì cho đời sau", "Danh nhân là tấm gương để thế hệ trẻ học tập về tài năng và nhân cách."],
    ["Việc tôn vinh danh nhân có ý nghĩa gì đối với thế hệ trẻ?", "Giáo dục truyền thống, khơi dậy khát vọng cống hiến", "Chỉ để tổ chức lễ hội hình thức", "Không có ý nghĩa thực tế nào", "Nhiều danh nhân Việt Nam được đặt tên cho đường phố, trường học trên cả nước."]
  ];
  var ls11cd3P = [["Nguyễn Trãi", "Tác giả Bình Ngô đại cáo"], ["Chu Văn An", "Nhà giáo thời Trần"], ["Lương Thế Vinh", "Nhà toán học, Trạng Lường"], ["Hải Thượng Lãn Ông", "Danh y Lê Hữu Trác"], ["Nguyễn Du", "Tác giả Truyện Kiều"], ["Trần Hưng Đạo", "Anh hùng chống Nguyên – Mông"], ["Tôn Thất Tùng", "Bác sĩ phẫu thuật gan"]];
  var LS11 = [
    TP("ls11-t1", "🏭", "Chủ đề 1: Cách mạng tư sản và sự phát triển của chủ nghĩa tư bản", "Bài 1–2 • Cách mạng tư sản Anh, Mỹ, Pháp; CNTB độc quyền và hiện đại", KP(ls11t1F, ls11t1P), KN(ls11t1F, ls11t1P, "Lịch sử")),
    TP("ls11-t2", "🚩", "Chủ đề 2: Chủ nghĩa xã hội từ năm 1917 đến nay", "Bài 3–4 • Cách mạng Tháng Mười Nga, Liên Xô, CNXH sau 1945 đến nay", KP(ls11t2F, ls11t2P), KN(ls11t2F, ls11t2P, "Lịch sử")),
    TP("ls11-t3", "🌏", "Chủ đề 3: Quá trình giành độc lập dân tộc của các quốc gia Đông Nam Á", "Bài 5–6 • Chủ nghĩa thực dân ở Đông Nam Á và hành trình giành độc lập", KP(ls11t3F, ls11t3P), KN(ls11t3F, ls11t3P, "Lịch sử")),
    TP("ls11-t4", "⚔️", "Chủ đề 4: Chiến tranh bảo vệ Tổ quốc và chiến tranh giải phóng dân tộc trong lịch sử Việt Nam", "Bài 7–8 • Khởi nghĩa và chiến tranh giải phóng từ thế kỉ III TCN đến cuối thế kỉ XIX", KP(ls11t4F, ls11t4P), KN(ls11t4F, ls11t4P, "Lịch sử")),
    TP("ls11-t5", "📜", "Chủ đề 5: Một số cuộc cải cách lớn trong lịch sử Việt Nam (trước năm 1858)", "Bài 9–11 • Cải cách của Hồ Quý Ly, Lê Thánh Tông, Minh Mạng", KP(ls11t5F, ls11t5P), KN(ls11t5F, ls11t5P, "Lịch sử")),
    TP("ls11-t6", "🌊", "Chủ đề 6: Lịch sử bảo vệ chủ quyền của Việt Nam ở Biển Đông", "Bài 12–13 • Vị trí, tầm quan trọng của Biển Đông; Việt Nam và Biển Đông", KP(ls11t6F, ls11t6P), KN(ls11t6F, ls11t6P, "Lịch sử")),
    TP("ls11-cd1", "🎨", "Chuyên đề 1: Lịch sử nghệ thuật truyền thống Việt Nam", "Chuyên đề Lịch sử • Nghệ thuật thời Lý – Trần, Lê sơ – Mạc, Lê trung hưng, Nguyễn", KP(ls11cd1F, ls11cd1P), KN(ls11cd1F, ls11cd1P, "Lịch sử")),
    TP("ls11-cd2", "🕊️", "Chuyên đề 2: Chiến tranh và hoà bình trong thế kỉ XX", "Chuyên đề Lịch sử • Hai cuộc thế chiến, Chiến tranh lạnh, đấu tranh vì hoà bình", KP(ls11cd2F, ls11cd2P), KN(ls11cd2F, ls11cd2P, "Lịch sử")),
    TP("ls11-cd3", "🌟", "Chuyên đề 3: Danh nhân trong lịch sử Việt Nam", "Chuyên đề Lịch sử • Danh nhân chính trị, quân sự, văn hoá, khoa học – giáo dục", KP(ls11cd3F, ls11cd3P), KN(ls11cd3F, ls11cd3P, "Lịch sử"))
  ];
  /* ==================================================================
     ĐỊA LÍ 11 — Kết nối tri thức
     Địa lí khu vực và quốc gia
     ================================================================== */
  var dl11p1F = [
    ["Các nước phát triển thường có đặc điểm kinh tế – xã hội nào?", "Thu nhập cao, dịch vụ chiếm tỉ trọng lớn", "Thu nhập thấp, nông nghiệp chiếm ưu thế", "Tỉ lệ dân thành thị rất thấp", "Nhóm nước phát triển tập trung chủ yếu ở Bắc Mĩ, Tây Âu, Nhật Bản và Ô-xtrây-li-a."],
    ["Các nước đang phát triển có đặc điểm nổi bật nào?", "Đang công nghiệp hoá, thu nhập còn thấp hơn", "Già hoá dân số đã ở mức rất cao khắp nơi", "Kinh tế tri thức chiếm hoàn toàn ưu thế", "Nhóm này chiếm phần lớn dân số thế giới và phân bố chủ yếu ở châu Á, Phi và Mĩ La tinh."],
    ["Chỉ số HDI dùng để đánh giá điều gì?", "Trình độ phát triển con người của một nước", "Diện tích lãnh thổ của một nước", "Trữ lượng khoáng sản của một nước", "HDI gồm ba thành phần: sức khoẻ (tuổi thọ), giáo dục và thu nhập."],
    ["Nước có HDI càng cao thì đời sống người dân thường thế nào?", "Thu nhập, giáo dục và tuổi thọ càng cao", "Dân số càng đông", "Diện tích càng rộng", "HDI từ 0,800 trở lên được xếp vào nhóm phát triển con người rất cao."],
    ["Toàn cầu hoá là quá trình gì?", "Liên kết kinh tế – xã hội giữa các nước tăng lên", "Mỗi nước đóng cửa, tự cung tự cấp hoàn toàn", "Chỉ liên quan tới hoạt động quân sự", "Toàn cầu hoá thể hiện qua thương mại, đầu tư, tài chính và di chuyển lao động quốc tế."],
    ["Biểu hiện rõ nhất của toàn cầu hoá kinh tế là gì?", "Thương mại và đầu tư quốc tế tăng nhanh", "Thương mại quốc tế bị xoá bỏ hoàn toàn", "Các công ty đa quốc gia biến mất", "Các công ty đa quốc gia và chuỗi sản xuất toàn cầu là lực lượng thúc đẩy toàn cầu hoá."],
    ["Khu vực hoá kinh tế là gì?", "Các nước trong khu vực liên kết thành tổ chức", "Một nước tách khỏi mọi liên kết quốc tế", "Quá trình đô thị hoá trong một quốc gia", "Ví dụ khu vực hoá: EU, ASEAN, USMCA — nhiều tổ chức vừa hợp tác vừa cạnh tranh."],
    ["Hệ quả tích cực của toàn cầu hoá đối với các nước đang phát triển là gì?", "Thu hút vốn, công nghệ và mở rộng thị trường", "Không phải cạnh tranh với nước ngoài nữa", "Tự động xoá bỏ mọi khoảng cách giàu nghèo", "Bên cạnh cơ hội, toàn cầu hoá cũng làm tăng cạnh tranh và nguy cơ lệ thuộc."],
    ["Thách thức lớn mà toàn cầu hoá đặt ra cho các quốc gia là gì?", "Cạnh tranh gay gắt, chênh lệch giàu nghèo tăng", "Không còn quốc gia nào cần hội nhập", "Mọi nước đều giàu lên với tốc độ như nhau", "Các vấn đề toàn cầu như dịch bệnh, khủng hoảng tài chính lan truyền rất nhanh giữa các nước."],
    ["Tổ chức Liên Hợp Quốc (UN) được thành lập năm nào và nhằm mục đích gì?", "Năm 1945, duy trì hoà bình và hợp tác quốc tế", "Năm 1995, chỉ điều tiết thương mại thế giới", "Năm 1957, liên kết các nước châu Âu", "Việt Nam là thành viên Liên Hợp Quốc từ năm 1977."],
    ["Tổ chức Thương mại Thế giới (WTO) có vai trò chính là gì?", "Thúc đẩy thương mại tự do giữa các nước", "Cho các nước nghèo vay vốn dài hạn", "Quản lí các vấn đề y tế toàn cầu", "WTO có hơn 160 thành viên; Việt Nam gia nhập WTO năm 2007."],
    ["Quỹ Tiền tệ Quốc tế (IMF) hoạt động chủ yếu trong lĩnh vực nào?", "Tài chính – tiền tệ quốc tế", "Giáo dục và văn hoá thế giới", "Bảo vệ môi trường biển", "IMF hỗ trợ các nước gặp khó khăn về cán cân thanh toán và ổn định tiền tệ."],
    ["Ngân hàng Thế giới (WB) hỗ trợ các nước chủ yếu bằng cách nào?", "Cho vay vốn phát triển kinh tế – xã hội", "Ban hành luật thương mại toàn cầu", "Điều hành các lực lượng gìn giữ hoà bình", "Việt Nam nhận nhiều khoản vay và hỗ trợ kĩ thuật của WB cho giảm nghèo, hạ tầng."],
    ["Kinh tế tri thức là nền kinh tế dựa chủ yếu vào yếu tố nào?", "Tri thức, khoa học – công nghệ và lao động giỏi", "Tài nguyên thiên nhiên khai thác thô", "Lao động thủ công không qua đào tạo", "Trong kinh tế tri thức, thông tin và sáng tạo trở thành nguồn lực hàng đầu."],
    ["Ngành nào là biểu hiện điển hình của kinh tế tri thức?", "Công nghệ thông tin, công nghệ sinh học", "Khai thác than thủ công", "Nông nghiệp quảng canh truyền thống", "Các trung tâm tri thức lớn gắn với trường đại học và viện nghiên cứu."],
    ["Dân số thế giới hiện nay có xu hướng biến đổi nổi bật nào?", "Tăng chậm lại, già hoá ở nhiều nước", "Tăng bùng nổ ở mọi quốc gia", "Giảm nhanh ở tất cả các châu lục", "Nhiều nước phát triển đối mặt thiếu lao động do tỉ suất sinh thấp kéo dài."],
    ["Vấn đề toàn cầu nào đe doạ trực tiếp đời sống mọi quốc gia?", "Biến đổi khí hậu và suy thoái môi trường", "Chỉ thiếu điện ở một vài thành phố", "Chỉ tranh chấp trong nội bộ một nước", "Giải quyết các vấn đề toàn cầu đòi hỏi hợp tác của toàn nhân loại, không một nước nào làm riêng được."],
    ["Chênh lệch giàu – nghèo giữa các nhóm nước có xu hướng thế nào?", "Còn lớn, là thách thức của phát triển toàn cầu", "Đã được xoá bỏ hoàn toàn", "Không tồn tại trong thực tế", "Một bộ phận dân cư thế giới vẫn sống trong nghèo đói, thiếu nước sạch và dịch vụ y tế."],
    ["An ninh lương thực toàn cầu bị đe doạ bởi nhân tố nào?", "Biến đổi khí hậu, xung đột và dịch bệnh", "Sản lượng lương thực tăng đều khắp nơi", "Diện tích đất trồng tăng không giới hạn", "Khoảng hàng trăm triệu người trên thế giới vẫn trong tình trạng thiếu đói."],
    ["Cách mạng công nghiệp lần thứ tư tác động tới kinh tế thế giới ra sao?", "Tự động hoá, số hoá làm thay đổi sản xuất", "Đưa sản xuất quay về thủ công hoàn toàn", "Không ảnh hưởng tới việc làm", "Các nước cần đào tạo lại lao động để thích ứng với CMCN 4.0."],
    ["Hợp tác quốc tế trong bảo vệ môi trường thể hiện qua văn kiện nào?", "Thỏa thuận Paris về biến đổi khí hậu (2015)", "Hiệp định thương mại tự do song phương", "Tuyên bố thành lập một liên minh quân sự", "Thỏa thuận Paris đặt mục tiêu giữ mức tăng nhiệt độ toàn cầu dưới 2 °C."],
    ["Một biểu hiện của khu vực hoá là các nước cùng khu vực hình thành gì?", "Thị trường chung và liên kết thương mại nội khối", "Hàng rào ngăn cách tuyệt đối giữa các nước", "Một quốc gia duy nhất xoá bỏ mọi biên giới chính trị", "ASEAN đang hướng tới Cộng đồng Kinh tế ASEAN (AEC) với lưu thông hàng hoá, vốn và lao động."],
    ["Nguồn lao động trẻ dồi dào là lợi thế của nhóm nước nào?", "Nhiều nước đang phát triển ở châu Á, châu Phi", "Các nước già hoá dân số ở châu Âu", "Các nước đã qua đỉnh dân số từ lâu", "Lợi thế này chỉ phát huy khi lao động được đào tạo và có việc làm ổn định."],
    ["Vì sao các nước cần tham gia các tổ chức quốc tế?", "Để hợp tác giải quyết vấn đề chung, mở rộng thị trường", "Để từ bỏ hoàn toàn chủ quyền quốc gia", "Để tránh mọi quan hệ với nước khác", "Hội nhập quốc tế là xu thế tất yếu, mang lại cả cơ hội và thách thức cho mỗi quốc gia."]
  ];
  var dl11p1P = [
    ["Liên Hợp Quốc (UN)", "Duy trì hoà bình, an ninh quốc tế"],
    ["Tổ chức Thương mại Thế giới (WTO)", "Thúc đẩy thương mại tự do toàn cầu"],
    ["Quỹ Tiền tệ Quốc tế (IMF)", "Ổn định tài chính – tiền tệ quốc tế"],
    ["Ngân hàng Thế giới (WB)", "Cho vay vốn phát triển, giảm nghèo"],
    ["Tổ chức Y tế Thế giới (WHO)", "Chăm sóc sức khoẻ toàn cầu"],
    ["UNESCO", "Hợp tác giáo dục, khoa học, văn hoá"]
  ];
  var dl11mltF = [
    ["Khu vực Mỹ La tinh gồm những bộ phận lãnh thổ nào?", "Mê-hi-cô, Trung Mĩ, Ca-ri-bê và Nam Mĩ", "Chỉ gồm các nước ở Bắc Mĩ", "Chỉ gồm Bra-xin và Ác-hen-ti-na", "Tên gọi Mĩ La tinh bắt nguồn từ việc đa số dân cư nói tiếng Tây Ban Nha, Bồ Đào Nha (ngữ hệ La tinh)."],
    ["Khu vực Mỹ La tinh tiếp giáp những đại dương nào?", "Thái Bình Dương ở phía tây, Đại Tây Dương ở phía đông", "Chỉ tiếp giáp Ấn Độ Dương", "Không tiếp giáp đại dương nào", "Vị trí cầu nối giữa Bắc Mĩ và Nam Mĩ giúp khu vực có ý nghĩa giao thương lớn."],
    ["Dãy núi cao, đồ sộ ở phía tây Nam Mĩ là dãy nào?", "Dãy An-đét chạy dọc bờ Thái Bình Dương", "Dãy Hi-ma-lay-a", "Dãy An-pơ ở châu Âu", "An-đét là dãy núi dài hàng đầu thế giới, giàu khoáng sản như đồng, thiếc."],
    ["Đồng bằng lớn nhất ở Mỹ La tinh, nổi tiếng với rừng mưa nhiệt đới, là đồng bằng nào?", "Đồng bằng A-ma-dôn ở Bra-xin", "Đồng bằng La Pla-ta", "Đồng bằng duyên hải Mê-hi-cô", "Rừng A-ma-dôn được gọi là “lá phổi xanh” của Trái Đất."],
    ["Khí hậu chủ yếu của phần lớn Mỹ La tinh là gì?", "Nhiệt đới và cận nhiệt, nóng ẩm", "Hàn đới lạnh giá quanh năm", "Ôn đới hải dương là chủ yếu", "Khí hậu phân hoá theo vĩ độ và độ cao: cao nguyên An-đét mát mẻ hơn vùng thấp."],
    ["Quốc gia có diện tích và dân số lớn nhất Mỹ La tinh là nước nào?", "Bra-xin, chiếm khoảng một nửa Nam Mĩ", "Mê-hi-cô", "Ác-hen-ti-na", "Bra-xin cũng là nước nói tiếng Bồ Đào Nha duy nhất ở châu Mĩ."],
    ["Thủ đô của Bra-xin là thành phố nào?", "Bra-xi-li-a, thành phố xây dựng mới trong nội địa", "Ri-ô đê Gia-nây-rô", "Xao Pao-lô", "Xao Pao-lô là thành phố lớn nhất và là trung tâm kinh tế của Bra-xin."],
    ["Ngôn ngữ chính được dùng ở đa số nước Mỹ La tinh là gì?", "Tiếng Tây Ban Nha, riêng Bra-xin dùng Bồ Đào Nha", "Tiếng Anh ở tất cả các nước", "Tiếng Pháp là ngôn ngữ duy nhất", "Dấu ấn văn hoá La tinh thể hiện trong kiến trúc, lễ hội và tôn giáo (chủ yếu Thiên Chúa giáo)."],
    ["Dân cư Mỹ La tinh có đặc điểm nổi bật nào?", "Đa dạng chủng tộc, nhiều người lai, đô thị hoá cao", "Hoàn toàn là người bản địa In-đi-an", "Dân cư rất thưa thớt ở mọi nơi", "Tỉ lệ dân thành thị của khu vực thuộc hàng cao nhất thế giới (khoảng 80%)."],
    ["Vấn đề xã hội nổi cộm ở nhiều đô thị Mỹ La tinh là gì?", "Khu nhà ổ chuột (favela), chênh lệch giàu nghèo", "Thiếu dân cư ở mọi thành phố", "Không có vấn đề xã hội nào", "Favela phổ biến quanh các siêu đô thị như Xao Pao-lô, Ri-ô đê Gia-nây-rô."],
    ["Nền văn minh bản địa nổi tiếng từng phát triển ở vùng An-đét là văn minh nào?", "Văn minh In-ca", "Văn minh Ai Cập", "Văn minh Lưỡng Hà", "Ngoài In-ca, vùng Trung Mĩ còn có văn minh Maya và Aztec."],
    ["Cây trồng xuất khẩu nổi tiếng của Bra-xin và Cô-lôm-bi-a là cây gì?", "Cà phê", "Lúa mì ôn đới", "Chè ở vùng núi cao lạnh", "Bra-xin là nước sản xuất và xuất khẩu cà phê hàng đầu thế giới."],
    ["Khoáng sản nổi bật của Chi-lê, đứng đầu thế giới về khai thác, là gì?", "Đồng (mỏ ở vùng khô hạn phía bắc)", "Than đá", "Kim cương", "Chi-lê chiếm tỉ trọng lớn trong sản lượng đồng toàn cầu."],
    ["Kênh đào nào ở Trung Mĩ nối Đại Tây Dương với Thái Bình Dương?", "Kênh đào Pa-na-ma", "Kênh đào Xuy-ê", "Kênh đào Ki-en ở Đức", "Kênh Pa-na-ma rút ngắn rất nhiều hành trình biển giữa hai đại dương."],
    ["Kinh tế Mỹ La tinh hiện nay có đặc điểm gì?", "Phát triển không đều, phụ thuộc xuất khẩu nguyên liệu", "Đã đồng đều như các nước phát triển", "Hoàn toàn chỉ dựa vào nông nghiệp", "Bra-xin, Mê-hi-cô và Ác-hen-ti-na là những nền kinh tế lớn nhất khu vực."],
    ["Bra-xin có thế mạnh công nghiệp nổi bật nào?", "Sản xuất ô tô, máy bay, thép phát triển", "Không có ngành công nghiệp nào", "Chỉ khai thác dầu mỏ ngoài khơi", "Hãng máy bay Embraer của Bra-xin xuất khẩu đi nhiều nước."],
    ["Cao nguyên Bra-xin có điều kiện thuận lợi cho ngành nào?", "Trồng cà phê, cao su và chăn nuôi gia súc", "Trồng lúa nước ngập sâu", "Khai thác băng tuyết quanh năm", "Đất đỏ badan trên cao nguyên thích hợp cho cây công nghiệp nhiệt đới."],
    ["Vấn đề môi trường nghiêm trọng nhất ở A-ma-dôn là gì?", "Phá rừng làm mất đa dạng sinh học, tăng phát thải", "Rừng tự mở rộng quá nhanh", "Băng tan làm ngập rừng", "Bảo vệ rừng A-ma-dôn là vấn đề được cả thế giới quan tâm."],
    ["Mê-hi-cô có vị thế kinh tế nổi bật nhờ yếu tố nào?", "Giáp Hoa Kỳ, xuất khẩu lớn, thành viên USMCA", "Nằm tách biệt hoàn toàn với Bắc Mĩ", "Chỉ dựa vào du lịch biển", "Mê-hi-cô là nền kinh tế lớn thứ hai của Mĩ La tinh sau Bra-xin."],
    ["Đồng bằng La Pla-ta ở Ác-hen-ti-na nổi tiếng với hoạt động kinh tế nào?", "Trồng lúa mì và chăn nuôi bò trên đồng cỏ pampa", "Trồng lúa nước nhiệt đới", "Khai thác dầu khí là chủ yếu", "Ác-hen-ti-na là nước xuất khẩu thịt bò và ngũ cốc lớn."],
    ["Sông nào là sông lớn nhất ở Mỹ La tinh về lưu lượng nước?", "Sông A-ma-dôn ở Bra-xin", "Sông Pa-ra-na", "Sông Ô-ri-nô-cô", "A-ma-dôn là sông có lưu lượng nước lớn nhất thế giới."],
    ["Du lịch Mỹ La tinh thu hút du khách nhờ những tài nguyên nào?", "Bãi biển Ca-ri-bê, di tích In-ca, lễ hội carnaval", "Tuyết rơi quanh năm ở mọi nơi", "Chỉ có sa mạc khô cằn", "Thành cổ Machu Picchu (Pê-ru) là di sản thế giới nổi tiếng của văn minh In-ca."],
    ["Nguyên nhân chính khiến kinh tế Mỹ La tinh thiếu ổn định là gì?", "Phụ thuộc vốn, thị trường nước ngoài và giá nguyên liệu", "Do không có tài nguyên thiên nhiên", "Do dân số quá ít", "Nhiều nước trong khu vực từng trải qua khủng hoảng nợ công."],
    ["Vùng Ca-ri-bê của Mỹ La tinh có thế mạnh kinh tế nào?", "Du lịch biển đảo và trồng mía, chuối xuất khẩu", "Khai thác than đá quy mô lớn", "Công nghiệp nặng là chủ đạo", "Cu-ba là quốc đảo lớn nhất vùng Ca-ri-bê."]
  ];
  var dl11mltP = [
    ["Bra-xin", "Bra-xi-li-a"],
    ["Mê-hi-cô", "Mê-hi-cô Xi-ti"],
    ["Ác-hen-ti-na", "Bu-ê-nốt Ai-rết"],
    ["Chi-lê", "Xan-ti-a-gô"],
    ["Pê-ru", "Li-ma"],
    ["Cô-lôm-bi-a", "Bô-gô-ta"],
    ["Vê-nê-du-ê-la", "Ca-ra-cát"]
  ];
  var dl11euF = [
    ["Liên minh châu Âu (EU) hiện có bao nhiêu nước thành viên sau Brexit?", "27 nước thành viên", "28 nước thành viên", "15 nước thành viên", "Vương quốc Anh rời EU (Brexit) chính thức từ năm 2020."],
    ["EU được coi là hình mẫu của quá trình nào?", "Liên kết khu vực sâu rộng nhất thế giới", "Đóng cửa kinh tế giữa các nước", "Liên minh quân sự thuần tuý", "EU có thị trường chung, nhiều chính sách chung và đồng tiền chung cho nhiều thành viên."],
    ["Đồng tiền chung của EU (đồng euro) được sử dụng ở bao nhiêu nước thành viên?", "Khoảng 20 nước thuộc khu vực đồng euro", "Tất cả 27 nước bắt buộc dùng euro", "Chỉ có 5 nước dùng euro", "Một số nước như Đan Mạch vẫn giữ đồng tiền riêng."],
    ["Cơ quan của EU đặt trụ sở chính tại thành phố nào của Bỉ?", "Brúc-xen, nơi đặt Uỷ ban châu Âu", "Pa-ri (Pháp)", "Béc-lin (Đức)", "Nghị viện châu Âu họp chủ yếu tại Xtơ-ra-xbua (Pháp)."],
    ["Thị trường chung châu Âu đảm bảo những tự do lưu thông nào?", "Hàng hoá, dịch vụ, vốn và con người", "Chỉ lưu thông hàng hoá", "Chỉ lưu thông vốn đầu tư", "Công dân EU có quyền sinh sống, làm việc ở bất kì nước thành viên nào."],
    ["Khu vực Schengen trong EU có đặc điểm gì?", "Bỏ kiểm soát biên giới nội bộ giữa các nước tham gia", "Mọi nước đều đóng kín biên giới", "Chỉ áp dụng cho hàng hoá, không cho người", "Phần lớn nước EU cùng một số nước ngoài EU tham gia Schengen."],
    ["Nước có nền kinh tế lớn nhất EU là nước nào?", "Đức (CHLB Đức)", "Pháp", "I-ta-li-a", "Đức là đầu tàu kinh tế của EU và là nước xuất khẩu lớn hàng đầu thế giới."],
    ["Ngành công nghiệp nổi tiếng nhất của Đức là ngành nào?", "Sản xuất ô tô và cơ khí chính xác", "Khai thác dầu mỏ", "Dệt may giá rẻ", "Các hãng ô tô Đức như Volkswagen, BMW, Mercedes-Benz nổi tiếng toàn cầu."],
    ["Vùng công nghiệp Ruhr (Rua) của Đức nổi tiếng với ngành nào truyền thống?", "Khai thác than và luyện thép", "Đóng tàu biển là duy nhất", "Công nghệ thông tin thuần tuý", "Ruhr đang chuyển đổi sang công nghệ cao và dịch vụ để giảm ô nhiễm."],
    ["EU là trung tâm kinh tế có vị thế thế nào trên thế giới?", "Một trong ba trung tâm kinh tế lớn nhất thế giới", "Khu vực kinh tế nhỏ, kém phát triển", "Không có vai trò trong thương mại toàn cầu", "EU cùng Hoa Kỳ và Trung Quốc là ba trung tâm kinh tế – thương mại hàng đầu."],
    ["Nông nghiệp EU có đặc điểm nổi bật nào?", "Hiện đại, năng suất cao, được trợ cấp chung", "Hoàn toàn lạc hậu, thủ công", "Không được nhà nước hỗ trợ", "Chính sách nông nghiệp chung (CAP) chiếm phần lớn ngân sách EU."],
    ["Pháp có thế mạnh nông nghiệp nào trong EU?", "Nước xuất khẩu nông sản lớn nhất EU", "Không sản xuất nông sản", "Chỉ nhập khẩu lương thực", "Pháp nổi tiếng với lúa mì, rượu vang và sản phẩm sữa."],
    ["Một thách thức lớn của EU hiện nay là gì?", "Già hoá dân số, chênh lệch phát triển giữa các nước", "Dân số tăng quá nhanh gây bùng nổ", "Thiếu hoàn toàn lao động có tay nghề", "EU còn đối mặt vấn đề nhập cư và an ninh năng lượng."],
    ["Hiệp ước nào đặt nền móng thành lập EU theo tên gọi hiện nay?", "Hiệp ước Maastricht (1992)", "Hiệp ước Versailles (1919)", "Hiệp định Paris về khí hậu (2015)", "Tiền thân của EU là Cộng đồng Than – Thép châu Âu (1951) với 6 nước sáng lập."],
    ["Sáu nước sáng lập cộng đồng châu Âu ban đầu gồm những nước tiêu biểu nào?", "Pháp, Đức, I-ta-li-a và ba nước Benelux", "Anh, Pháp, Đức và Tây Ban Nha", "Chỉ có Pháp và Đức", "Benelux gồm Bỉ, Hà Lan và Lúc-xăm-bua."],
    ["EU mở rộng mạnh nhất về phía nào trong các thập kỉ gần đây?", "Sang các nước Trung và Đông Âu", "Sang các nước Bắc Phi", "Sang các nước Đông Nam Á", "Đợt mở rộng năm 2004 kết nạp thêm 10 nước, chủ yếu ở Đông Âu."],
    ["Ngành dịch vụ của EU phát triển mạnh ở lĩnh vực nào?", "Tài chính, du lịch, vận tải và thương mại", "Chỉ có buôn bán nhỏ lẻ", "Dịch vụ chưa phát triển", "Luân Đôn từng là trung tâm tài chính lớn; sau Brexit, Pa-ri và Frankfurt cạnh tranh mạnh hơn."],
    ["Điều kiện tự nhiên của châu Âu thuận lợi cho kinh tế vì sao?", "Khí hậu ôn hoà, nhiều đồng bằng, sông và bờ biển dài", "Khí hậu cực kì khắc nghiệt quanh năm", "Hoàn toàn không có sông ngòi", "Mạng lưới sông và kênh đào dày đặc giúp giao thông thuỷ phát triển."],
    ["Đức có đặc điểm dân cư nào đáng chú ý?", "Dân số đông nhất EU, đang già hoá nhanh", "Dân số ít nhất EU", "Tỉ lệ sinh rất cao, dân số trẻ", "Đức thu hút nhiều lao động nhập cư để bù đắp thiếu hụt lao động."],
    ["Công nghiệp Đức phân bố tập trung ở những khu vực nào?", "Vùng Ruhr, dọc sông Ranh và các đô thị lớn", "Chỉ ở vùng núi cao phía nam", "Chỉ ở ven biển phía bắc", "Các trung tâm lớn: Munich (điện tử), Stuttgart và Wolfsburg (ô tô)."],
    ["EU hợp tác với Việt Nam qua hiệp định thương mại nào?", "EVFTA — hiệp định thương mại tự do EU – Việt Nam", "Không có hiệp định nào", "Hiệp định chỉ về quân sự", "EVFTA có hiệu lực từ năm 2020, cắt giảm hầu hết thuế quan hai chiều."],
    ["Lợi ích lớn nhất của liên kết EU đối với các nước thành viên nhỏ là gì?", "Được vào thị trường lớn, nhận hỗ trợ phát triển", "Phải từ bỏ mọi chính sách kinh tế riêng", "Không nhận được lợi ích nào", "Các quỹ cấu trúc của EU hỗ trợ vùng kém phát triển trong khối."],
    ["Vì sao EU được đánh giá là liên kết khu vực thành công?", "Hoà bình lâu dài, thị trường thống nhất, sức mạnh chung", "Vì các nước thành viên hoàn toàn giống nhau", "Vì EU không gặp thách thức nào", "Sau các cuộc thế chiến, liên kết châu Âu giúp duy trì hoà bình hơn 70 năm."],
    ["Ngành công nghiệp mới phát triển mạnh ở Đức và EU là ngành nào?", "Năng lượng tái tạo, công nghiệp xanh và số hoá", "Khai thác than đá thủ công", "Công nghiệp gây ô nhiễm nặng", "Đức là nước đi đầu về điện mặt trời và điện gió ở châu Âu."]
  ];
  var dl11euP = [
    ["Đức", "Béc-lin"],
    ["Pháp", "Pa-ri"],
    ["I-ta-li-a", "Rô-ma"],
    ["Tây Ban Nha", "Ma-đrít"],
    ["Ba Lan", "Vác-sa-va"],
    ["Hà Lan", "Am-xtéc-đam"],
    ["Bỉ", "Brúc-xen"]
  ];
  var dl11dnaF = [
    ["Khu vực Đông Nam Á gồm bao nhiêu quốc gia?", "11 quốc gia (kể cả Ti-mo Lét-xtê)", "10 quốc gia", "9 quốc gia", "Trong 11 nước, 10 nước là thành viên ASEAN; Ti-mo Lét-xtê là quan sát viên, đang trong lộ trình gia nhập."],
    ["Đông Nam Á gồm hai bộ phận lãnh thổ nào?", "Đông Nam Á lục địa và Đông Nam Á hải đảo", "Chỉ gồm các đảo trên biển", "Chỉ gồm phần đất liền", "Phần hải đảo gồm In-đô-nê-xi-a, Phi-líp-pin, và phần hải đảo của Ma-lai-xi-a, Bru-nây."],
    ["Vị trí địa lí của Đông Nam Á có ý nghĩa chiến lược vì sao?", "Cầu nối Á – Úc, trên tuyến hàng hải quốc tế lớn", "Nằm biệt lập giữa đại dương", "Nằm ở vùng cực lạnh giá", "Biển Đông là một trong những tuyến vận tải biển nhộn nhịp nhất thế giới."],
    ["Khí hậu chủ đạo của Đông Nam Á là gì?", "Nhiệt đới gió mùa, nóng ẩm, mưa nhiều", "Ôn đới lạnh quanh năm", "Hoang mạc khô hạn", "Khí hậu thuận lợi cho trồng lúa nước và cây công nghiệp nhiệt đới."],
    ["Cây lương thực chính của Đông Nam Á là cây gì?", "Lúa gạo, trồng nhiều ở các đồng bằng châu thổ", "Lúa mì ôn đới", "Ngô là cây duy nhất", "Thái Lan, Việt Nam thuộc nhóm xuất khẩu gạo hàng đầu thế giới."],
    ["Đồng bằng châu thổ lớn ở Đông Nam Á lục địa là đồng bằng nào?", "Châu thổ sông Mê Công và sông Hồng", "Châu thổ sông A-ma-dôn", "Châu thổ sông Nin", "Sông Mê Công chảy qua 6 nước, bồi đắp đồng bằng rộng lớn ở Việt Nam và Cam-pu-chia."],
    ["In-đô-nê-xi-a có đặc điểm địa lí nổi bật nào?", "Quốc gia quần đảo lớn nhất thế giới", "Quốc gia không có biển", "Quốc gia nhỏ nhất khu vực", "In-đô-nê-xi-a có hơn 17 nghìn đảo và là nước đông dân nhất Đông Nam Á."],
    ["Đông Nam Á nằm trên vành đai địa chất nào gây nhiều động đất, núi lửa?", "“Vành đai lửa Thái Bình Dương” ở phía đông khu vực", "Vùng địa chất ổn định tuyệt đối", "Không có núi lửa hoạt động", "In-đô-nê-xi-a là nước có nhiều núi lửa hoạt động hàng đầu thế giới."],
    ["Dân cư Đông Nam Á có đặc điểm gì?", "Đông, đa dạng dân tộc, tôn giáo và văn hoá", "Rất thưa, chỉ vài triệu người", "Đồng nhất hoàn toàn về văn hoá", "Khu vực có hơn 650 triệu dân, gồm cả Phật giáo, Hồi giáo, Thiên Chúa giáo…"],
    ["Nước đông dân nhất Đông Nam Á là nước nào?", "In-đô-nê-xi-a (hơn 270 triệu người)", "Xin-ga-po", "Bru-nây", "In-đô-nê-xi-a cũng là nước có số tín đồ Hồi giáo đông nhất thế giới."],
    ["ASEAN được thành lập năm nào và ở đâu?", "Năm 1967 tại Băng Cốc (Thái Lan)", "Năm 1995 tại Hà Nội", "Năm 1945 tại Gia-các-ta", "ASEAN ban đầu có 5 nước sáng lập; Việt Nam gia nhập năm 1995."],
    ["ASEAN hiện có bao nhiêu nước thành viên chính thức?", "10 nước thành viên", "11 nước thành viên", "5 nước thành viên", "Bru-nây, Cam-pu-chia, In-đô-nê-xi-a, Lào, Ma-lai-xi-a, Mi-an-ma, Phi-líp-pin, Xin-ga-po, Thái Lan, Việt Nam."],
    ["Mục tiêu chính của ASEAN là gì?", "Hoà bình, ổn định và hợp tác phát triển khu vực", "Thành lập một liên minh quân sự tấn công", "Xoá bỏ biên giới chính trị của các nước", "Ba trụ cột Cộng đồng ASEAN: Chính trị – An ninh, Kinh tế và Văn hoá – Xã hội."],
    ["Nền kinh tế phát triển nhất Đông Nam Á hiện nay là nước nào?", "Xin-ga-po, thu nhập bình quân hàng đầu khu vực", "Lào", "Mi-an-ma", "Xin-ga-po là trung tâm tài chính, thương mại và cảng biển lớn của thế giới."],
    ["Cảng biển trung chuyển lớn hàng đầu thế giới ở Đông Nam Á là cảng nào?", "Cảng Xin-ga-po", "Cảng Hải Phòng", "Cảng Đà Nẵng", "Vị trí trên eo biển Ma-lắc-ca giúp Xin-ga-po trở thành điểm trung chuyển quốc tế."],
    ["Eo biển nào là tuyến hàng hải huyết mạch qua Đông Nam Á?", "Eo biển Ma-lắc-ca giữa Ma-lai-xi-a và In-đô-nê-xi-a", "Eo biển Bê-ring", "Eo biển Gi-bran-ta", "Một phần lớn hàng hoá và dầu mỏ của châu Á đi qua eo Ma-lắc-ca."],
    ["Cây công nghiệp nhiệt đới nổi bật của Ma-lai-xi-a và In-đô-nê-xi-a là cây gì?", "Cọ dầu và cao su", "Ô liu Địa Trung Hải", "Nho ôn đới", "Hai nước này chiếm phần lớn sản lượng dầu cọ thế giới."],
    ["Thái Lan có thế mạnh kinh tế nổi bật nào?", "Xuất khẩu gạo, ô tô và du lịch phát triển", "Chỉ khai thác dầu mỏ", "Không có ngành du lịch", "Thái Lan được coi là “công xưởng ô tô” của Đông Nam Á."],
    ["Việt Nam trong ASEAN có lợi thế phát triển nào?", "Vị trí ven Biển Đông, lao động dồi dào, hội nhập sâu", "Nằm sâu trong nội địa, không có biển", "Dân số rất ít", "Việt Nam là cửa ngõ của Đông Nam Á lục địa ra Biển Đông."],
    ["Thiên tai thường gặp ở Đông Nam Á hải đảo và ven biển là gì?", "Bão, động đất, sóng thần và núi lửa", "Bão tuyết kéo dài", "Không có thiên tai nào", "Trận sóng thần năm 2004 ở Ấn Độ Dương gây thiệt hại nặng cho In-đô-nê-xi-a và Thái Lan."],
    ["Ngành kinh tế biển có vai trò thế nào với Đông Nam Á?", "Rất quan trọng: vận tải, dầu khí, thuỷ sản, du lịch", "Không đáng kể vì ít nước có biển", "Chỉ phục vụ đánh bắt nhỏ lẻ", "Hầu hết các nước Đông Nam Á đều có biển, trừ Lào là nước không giáp biển."],
    ["Nước duy nhất ở Đông Nam Á không giáp biển là nước nào?", "Lào", "Cam-pu-chia", "Mi-an-ma", "Lào phát triển giao thông qua sông Mê Công và hợp tác quá cảnh qua cảng biển Việt Nam, Thái Lan."],
    ["Sự chênh lệch trình độ phát triển trong ASEAN thể hiện thế nào?", "Xin-ga-po, Bru-nây cao; một số nước còn thấp hơn", "Mọi nước đều phát triển như nhau", "Không có nước nào phát triển", "ASEAN có sáng kiến thu hẹp khoảng cách phát triển (IAI) hỗ trợ các thành viên mới."],
    ["Văn hoá Đông Nam Á chịu ảnh hưởng của những nền văn minh lớn nào?", "Văn minh Ấn Độ và Trung Hoa, giao thoa bản địa", "Chỉ chịu ảnh hưởng châu Âu", "Hoàn toàn biệt lập, không giao lưu", "Ảnh hưởng thể hiện qua chữ viết, tôn giáo, kiến trúc đền tháp như Ăng-co Vát (Cam-pu-chia)."],
    ["Xu hướng hợp tác nổi bật của ASEAN hiện nay là gì?", "Xây dựng Cộng đồng, liên kết kinh tế và kết nối hạ tầng", "Từng nước đóng cửa, giảm hợp tác", "Chỉ hợp tác về quân sự", "ASEAN còn mở rộng hợp tác với các đối tác qua ASEAN+3, RCEP và các FTA khác."]
  ];
  var dl11dnaP = [
    ["Việt Nam", "Hà Nội"],
    ["Thái Lan", "Băng Cốc"],
    ["In-đô-nê-xi-a", "Gia-các-ta"],
    ["Ma-lai-xi-a", "Cua-la Lăm-pơ"],
    ["Phi-líp-pin", "Ma-ni-la"],
    ["Mi-an-ma", "Nây-pi-đô"],
    ["Lào", "Viêng Chăn"],
    ["Cam-pu-chia", "Phnôm Pênh"]
  ];
  var dl11tnaF = [
    ["Khu vực Tây Nam Á nằm ở vị trí ngã ba của những châu lục nào?", "Ngã ba châu Á, châu Âu và châu Phi", "Ngã ba châu Á, châu Âu và châu Úc", "Chỉ nằm hoàn toàn trong châu Á, không giáp châu khác", "Vị trí cầu nối ba châu lục làm Tây Nam Á có ý nghĩa chiến lược đặc biệt."],
    ["Tây Nam Á tiếp giáp những biển và vịnh quan trọng nào?", "Địa Trung Hải, Biển Đỏ, vịnh Péc-xích", "Chỉ giáp Biển Đông", "Không giáp biển nào", "Vịnh Péc-xích là nơi tập trung nhiều mỏ dầu lớn nhất thế giới."],
    ["Kênh đào nào nối Biển Đỏ với Địa Trung Hải, nằm ở cửa ngõ Tây Nam Á?", "Kênh đào Xuy-ê (Ai Cập)", "Kênh đào Pa-na-ma", "Kênh đào Ki-en", "Kênh Xuy-ê rút ngắn hành trình biển giữa châu Âu và châu Á."],
    ["Khí hậu chủ đạo của Tây Nam Á là gì?", "Khô hạn, hoang mạc và cận nhiệt khô", "Nhiệt đới ẩm mưa nhiều quanh năm", "Hàn đới lạnh giá", "Phần lớn khu vực lượng mưa thấp, nhiều hoang mạc như A-rập, Xi-ri."],
    ["Tài nguyên quan trọng nhất của Tây Nam Á là gì?", "Dầu mỏ và khí tự nhiên, trữ lượng hàng đầu thế giới", "Than đá và sắt", "Rừng nhiệt đới phong phú", "Khoảng một nửa trữ lượng dầu mỏ thế giới tập trung ở khu vực này."],
    ["Các nước xuất khẩu dầu mỏ lớn ở Tây Nam Á gồm những nước tiêu biểu nào?", "A-rập Xê-út, I-rắc, I-ran, Cô-oét, UAE", "Chỉ có Thổ Nhĩ Kỳ", "Không có nước nào xuất khẩu dầu", "A-rập Xê-út là một trong những nước sản xuất và xuất khẩu dầu lớn nhất thế giới."],
    ["Tổ chức OPEC có vai trò gì đối với Tây Nam Á?", "Điều phối sản lượng, ảnh hưởng giá dầu thế giới", "Tổ chức du lịch của khu vực", "Liên minh quân sự của các nước A-rập", "Nhiều nước Tây Nam Á là thành viên chủ chốt của OPEC."],
    ["Eo biển nào là cửa ngõ xuất khẩu dầu của vịnh Péc-xích?", "Eo biển Hoóc-mút (Hormuz)", "Eo biển Ma-lắc-ca", "Eo biển Bê-ring", "Một phần lớn lượng dầu vận chuyển bằng biển của thế giới đi qua eo Hoóc-mút."],
    ["Tây Nam Á là cái nôi của những tôn giáo lớn nào?", "Do Thái giáo, Thiên Chúa giáo và Hồi giáo", "Chỉ có Phật giáo", "Chỉ có Ấn Độ giáo", "Giê-ru-xa-lem là thánh địa chung của ba tôn giáo lớn."],
    ["Tôn giáo chiếm đa số dân cư ở hầu hết nước Tây Nam Á là tôn giáo nào?", "Hồi giáo", "Phật giáo", "Thiên Chúa giáo", "Méc-ca (A-rập Xê-út) là thánh địa linh thiêng nhất của Hồi giáo."],
    ["Dân cư Tây Nam Á phân bố có đặc điểm gì?", "Tập trung ở ven biển, thung lũng sông và ốc đảo", "Phân bố đều khắp hoang mạc", "Hoàn toàn sống ở vùng núi cao", "Các thung lũng sông lớn như Ti-grơ và Ơ-phrát là nơi dân cư tập trung lâu đời."],
    ["Hai con sông lớn gắn với nền văn minh Lưỡng Hà cổ đại là sông nào?", "Sông Ti-grơ và sông Ơ-phrát", "Sông Nin và sông Công-gô", "Sông Hằng và sông Ấn", "Vùng Lưỡng Hà (nay thuộc I-rắc) là một trong những cái nôi văn minh sớm nhất của nhân loại."],
    ["Nguyên nhân sâu xa gây bất ổn kéo dài ở Tây Nam Á là gì?", "Tranh giành dầu mỏ, xung đột sắc tộc, can thiệp ngoài", "Do khí hậu quá lạnh giá", "Do khu vực không có tài nguyên nào", "Nhiều điểm nóng như xung đột I-xra-en – Pa-le-xtin kéo dài nhiều thập kỉ."],
    ["Nước có diện tích lớn nhất Tây Nam Á là nước nào?", "A-rập Xê-út", "Ca-ta", "Ba-ranh", "A-rập Xê-út chiếm phần lớn bán đảo A-rập."],
    ["Bán đảo lớn ở Tây Nam Á, phần lớn là hoang mạc, là bán đảo nào?", "Bán đảo A-rập", "Bán đảo Đông Dương", "Bán đảo Ban-căng", "Bán đảo A-rập bao quanh bởi Biển Đỏ, biển A-rập và vịnh Péc-xích."],
    ["Thổ Nhĩ Kỳ có đặc điểm vị trí địa lí đặc biệt nào?", "Lãnh thổ nằm ở cả châu Á và châu Âu", "Hoàn toàn nằm ở châu Phi", "Là một quốc đảo giữa biển", "Eo biển Bốt-pho-rơ qua I-xtan-bun nối Biển Đen với Địa Trung Hải."],
    ["I-ran có thế mạnh tài nguyên và vị thế nào trong khu vực?", "Giàu dầu khí, dân số đông, diện tích lớn", "Không có dầu khí", "Quốc gia nhỏ, ít dân", "I-ran là một trong những nước có trữ lượng khí tự nhiên lớn nhất thế giới."],
    ["Nông nghiệp Tây Nam Á gặp khó khăn lớn nhất là gì?", "Thiếu nước ngọt, khô hạn kéo dài", "Thừa nước gây ngập lụt quanh năm", "Đất quá màu mỡ khó canh tác", "Nông nghiệp tập trung ở vùng có tưới tiêu: thung lũng sông, ven biển và ốc đảo."],
    ["Giải pháp nước nổi tiếng của I-xra-en cho nông nghiệp khô hạn là gì?", "Tưới nhỏ giọt và công nghệ tiết kiệm nước", "Chuyển toàn bộ nước biển chưa xử lí vào ruộng", "Bỏ hoàn toàn sản xuất nông nghiệp", "I-xra-en là hình mẫu nông nghiệp công nghệ cao trên đất khô hạn."],
    ["Các quốc gia vùng Vịnh giàu lên nhanh chóng chủ yếu nhờ nguồn thu nào?", "Xuất khẩu dầu mỏ và khí tự nhiên", "Xuất khẩu lúa gạo", "Khai thác gỗ rừng", "Nguồn thu dầu mỏ được đầu tư vào hạ tầng, đô thị hiện đại như Đu-bai (UAE)."],
    ["Đu-bai nổi tiếng thế giới với hình ảnh kinh tế nào?", "Trung tâm tài chính, thương mại và du lịch lớn", "Trung tâm trồng lúa nước lớn nhất", "Vùng nông thôn thuần nông", "Toà tháp Burj Khalifa ở Đu-bai là toà nhà cao nhất thế giới."],
    ["Vấn đề dầu khí ở Tây Nam Á có ảnh hưởng toàn cầu vì sao?", "Giá dầu biến động tác động kinh tế mọi nước", "Dầu ở khu vực chỉ dùng trong nội bộ", "Không nước nào nhập dầu từ khu vực", "Các cuộc khủng hoảng dầu mỏ thập kỉ 1970 bắt nguồn từ khu vực này."],
    ["Xu hướng kinh tế mới của nhiều nước vùng Vịnh là gì?", "Đa dạng hoá, giảm phụ thuộc vào dầu mỏ", "Chỉ tăng khai thác dầu, bỏ ngành khác", "Đóng cửa với du lịch quốc tế", "A-rập Xê-út có chương trình Tầm nhìn 2030 phát triển du lịch, công nghệ và giải trí."],
    ["Để ổn định lâu dài, Tây Nam Á cần giải quyết vấn đề cốt lõi nào?", "Hoà bình, hợp tác và chia sẻ lợi ích tài nguyên", "Tăng chạy đua vũ trang trong khu vực", "Đóng kín mọi tuyến giao thương", "Ổn định ở Tây Nam Á có ý nghĩa lớn với an ninh năng lượng toàn cầu."]
  ];
  var dl11tnaP = [
    ["I-ran", "Tê-hê-ran"],
    ["I-rắc", "Bát-đa"],
    ["A-rập Xê-út", "Ri-át"],
    ["Thổ Nhĩ Kỳ", "An-ca-ra"],
    ["Các Tiểu vương quốc A-rập Thống nhất", "A-bu Đa-bi"],
    ["Ca-ta", "Đô-ha"],
    ["Cô-oét", "Thành phố Cô-oét"]
  ];
  var dl11hkF = [
    ["Hợp chúng quốc Hoa Kỳ gồm bao nhiêu bang?", "50 bang và một đặc khu liên bang", "48 bang", "52 bang", "Hai bang tách rời phần chính là A-lát-xka (phía tây bắc) và Ha-oai (giữa Thái Bình Dương)."],
    ["Thủ đô của Hoa Kỳ là thành phố nào?", "Oa-sinh-tơn (đặc khu Cô-lôm-bi-a)", "Niu Oóc", "Lốt An-giơ-lét", "Oa-sinh-tơn là trung tâm chính trị, nơi đặt Nhà Trắng và Quốc hội Hoa Kỳ."],
    ["Hoa Kỳ tiếp giáp những đại dương nào?", "Đại Tây Dương, Thái Bình Dương và Bắc Băng Dương", "Chỉ tiếp giáp Ấn Độ Dương", "Không tiếp giáp đại dương", "Bờ biển dài ở cả hai đại dương giúp Hoa Kỳ giao thương khắp thế giới."],
    ["Địa hình phần chính của Hoa Kỳ sắp xếp theo chiều tây – đông thế nào?", "Núi cao phía tây, đồng bằng giữa, núi thấp phía đông", "Hoàn toàn là đồng bằng bằng phẳng", "Núi cao ở cả phía đông và giữa", "Phía tây có hệ thống Coóc-đi-e, giữa là đồng bằng Trung tâm, phía đông là dãy A-pa-lát."],
    ["Dãy núi cổ, thấp ở phía đông Hoa Kỳ là dãy nào?", "Dãy A-pa-lát", "Dãy Rốc-ki", "Dãy An-đét", "Phía tây là dãy Rốc-ki trẻ, cao và đồ sộ hơn."],
    ["Sông lớn nhất Hoa Kỳ, chảy qua đồng bằng Trung tâm, là sông nào?", "Sông Mi-xi-xi-pi", "Sông Cô-lô-ra-đô", "Sông Ri-ô Gran-đê", "Hệ thống Mi-xi-xi-pi – Mi-xu-ri là một trong những hệ thống sông dài nhất thế giới."],
    ["Hệ thống hồ nước ngọt lớn ở biên giới Hoa Kỳ – Ca-na-đa là hệ nào?", "Hệ thống Ngũ Hồ (5 hồ lớn)", "Hồ Bai-can", "Hồ Vic-to-ri-a", "Ngũ Hồ là tuyến giao thông thuỷ và nguồn nước ngọt quan trọng của Bắc Mĩ."],
    ["Khí hậu Hoa Kỳ có đặc điểm gì nổi bật?", "Đa dạng, chủ yếu ôn đới, có cả cận nhiệt và hàn đới", "Hoàn toàn là khí hậu nhiệt đới", "Hoàn toàn là khí hậu hoang mạc", "Sự đa dạng khí hậu giúp nông nghiệp Hoa Kỳ trồng được nhiều loại cây, nuôi nhiều vật nuôi."],
    ["Dân cư Hoa Kỳ hình thành chủ yếu từ nguồn nào?", "Dân nhập cư từ nhiều châu lục qua các thời kì", "Hoàn toàn là dân bản địa", "Chỉ có nguồn gốc châu Âu duy nhất", "Hoa Kỳ là quốc gia đa chủng tộc, đa văn hoá; người bản địa chiếm tỉ lệ nhỏ."],
    ["Dân cư Hoa Kỳ phân bố tập trung nhất ở khu vực nào?", "Vùng Đông Bắc và ven biển, các đô thị lớn", "Vùng núi cao phía tây", "Bang A-lát-xka lạnh giá", "Vùng Đông Bắc có dải siêu đô thị từ Bốt-xtơn tới Oa-sinh-tơn."],
    ["Thành phố lớn nhất Hoa Kỳ là thành phố nào?", "Niu Oóc, trung tâm tài chính – thương mại lớn", "Hiu-xtơn", "Phi-ních", "Phố Wall ở Niu Oóc là trung tâm tài chính hàng đầu thế giới."],
    ["Hoa Kỳ có vị thế kinh tế thế nào trên thế giới?", "Nền kinh tế lớn nhất thế giới theo GDP", "Nền kinh tế nhỏ, đang phát triển", "Không tham gia thương mại quốc tế", "Hoa Kỳ dẫn đầu nhiều lĩnh vực: công nghệ, tài chính, dịch vụ và nông nghiệp hiện đại."],
    ["Thung lũng Silicon ở bang Ca-li-phoóc-ni-a nổi tiếng về lĩnh vực nào?", "Công nghệ thông tin và đổi mới sáng tạo", "Khai thác than đá", "Trồng bông truyền thống", "Đây là nơi đặt trụ sở của nhiều tập đoàn công nghệ lớn nhất thế giới."],
    ["Ngành dịch vụ chiếm tỉ trọng thế nào trong kinh tế Hoa Kỳ?", "Khoảng ba phần tư GDP, cao nhất trong cơ cấu", "Chỉ chiếm một phần nhỏ GDP", "Không có ngành dịch vụ", "Tài chính, y tế, giáo dục, công nghệ là những ngành dịch vụ chủ lực."],
    ["Nông nghiệp Hoa Kỳ có đặc điểm hiện đại nào?", "Cơ giới hoá cao, trang trại lớn, năng suất dẫn đầu", "Hoàn toàn sản xuất thủ công nhỏ lẻ", "Chỉ trồng một loại cây duy nhất", "Hoa Kỳ là nước xuất khẩu nông sản hàng đầu: ngô, đậu tương, lúa mì."],
    ["Vành đai nông nghiệp nổi tiếng ở vùng Ngũ Hồ và Đông Bắc Hoa Kỳ là vành đai gì?", "Vành đai sữa (chăn nuôi bò sữa)", "Vành đai bông ở phía nam", "Vành đai cà phê nhiệt đới", "Các vành đai chuyên canh hình thành theo điều kiện khí hậu, đất đai từng vùng."],
    ["Công nghiệp Hoa Kỳ hiện nay tập trung phát triển các ngành nào?", "Ngành hiện đại: điện tử, vũ trụ, hoá dầu, công nghệ", "Chỉ còn các ngành truyền thống nặng", "Không còn sản xuất công nghiệp", "Các ngành truyền thống (thép, ô tô) tập trung ở Đông Bắc và vùng Ngũ Hồ."],
    ["Trung tâm công nghiệp ô tô truyền thống của Hoa Kỳ là thành phố nào?", "Đi-troi (bang Mi-si-gân)", "Mai-a-mi", "Đen-vơ", "Đi-troi từng là “thủ đô ô tô” của thế giới."],
    ["Hoa Kỳ là nước tiêu thụ và sản xuất năng lượng ở vị thế nào?", "Sản xuất và tiêu thụ năng lượng hàng đầu thế giới", "Hoàn toàn phụ thuộc nhập khẩu năng lượng", "Không sử dụng dầu khí đá phiến", "Công nghệ dầu khí đá phiến giúp Hoa Kỳ tăng mạnh sản lượng dầu khí."],
    ["Vấn đề xã hội nổi cộm của Hoa Kỳ là gì?", "Chênh lệch giàu nghèo, bất bình đẳng và nhập cư", "Dân số quá ít và thiếu lao động tuyệt đối", "Không có đô thị hoá", "Hoa Kỳ cũng đối mặt già hoá dân số dù chậm hơn châu Âu và Nhật Bản."],
    ["Bang có diện tích lớn nhất Hoa Kỳ là bang nào?", "A-lát-xka", "Tếch-dát", "Ca-li-phoóc-ni-a", "Bang đông dân nhất là Ca-li-phoóc-ni-a; Tếch-dát lớn thứ hai về diện tích."],
    ["Hệ thống giao thông của Hoa Kỳ có đặc điểm gì?", "Phát triển đồng bộ, hàng không và cao tốc hàng đầu", "Chỉ có giao thông đường thuỷ", "Giao thông rất kém phát triển", "Hoa Kỳ có số sân bay và chiều dài đường bộ cao tốc hàng đầu thế giới."],
    ["Ngành kinh tế đối ngoại của Hoa Kỳ có đặc điểm gì?", "Xuất nhập khẩu lớn nhất thế giới, nhiều tập đoàn đa quốc gia", "Gần như không buôn bán với nước ngoài", "Chỉ xuất khẩu, không nhập khẩu", "Đồng đô la Mỹ là đồng tiền dự trữ chính của thế giới."],
    ["Điều kiện tự nhiên nào giúp miền Trung Hoa Kỳ thành vùng nông nghiệp lớn?", "Đồng bằng rộng, đất tốt, sông lớn và khí hậu ôn hoà", "Núi cao hiểm trở khắp nơi", "Hoang mạc khô cằn chiếm toàn bộ", "Đồng bằng Trung tâm được gọi là “vựa lúa mì và ngô” của Hoa Kỳ."],
    ["Du lịch Hoa Kỳ nổi tiếng với những điểm đến tự nhiên nào?", "Đại vực Grand Canyon, thác Ni-a-ga-ra, công viên Yellowstone", "Chỉ có các trung tâm mua sắm", "Không có cảnh quan tự nhiên nổi tiếng", "Hệ thống vườn quốc gia của Hoa Kỳ là vườn quốc gia lâu đời hàng đầu thế giới."]
  ];
  var dl11hkP = [
    ["A-lát-xka", "Bang lớn nhất về diện tích"],
    ["Tếch-dát", "Bang lớn thứ hai về diện tích"],
    ["Ca-li-phoóc-ni-a", "Bang đông dân nhất Hoa Kỳ"],
    ["Phlo-ri-đa", "Bán đảo ở phía đông nam"],
    ["Ha-oai", "Quần đảo giữa Thái Bình Dương"],
    ["Niu Oóc", "Thành phố lớn nhất Hoa Kỳ"],
    ["Oa-sinh-tơn", "Thủ đô của Hoa Kỳ"]
  ];
  var dl11ngaF = [
    ["Liên bang Nga có vị thế diện tích thế nào trên thế giới?", "Nước có diện tích lớn nhất thế giới", "Nước có diện tích lớn thứ năm thế giới", "Nước có diện tích nhỏ ở châu Âu", "Diện tích Nga khoảng 17 triệu km², chiếm một phần lớn phía bắc lục địa Á – Âu."],
    ["Lãnh thổ Nga trải dài trên những châu lục nào?", "Cả châu Âu và châu Á, lấy dãy U-ran làm ranh giới", "Chỉ nằm ở châu Âu", "Chỉ nằm ở châu Á", "Phần châu Âu chiếm khoảng một phần tư diện tích nhưng tập trung đa số dân cư."],
    ["Thủ đô và thành phố lớn nhất của Nga là thành phố nào?", "Mát-xcơ-va", "Xanh Pê-téc-bua", "Nô-vô-xi-biếc-xcơ", "Xanh Pê-téc-bua là thành phố lớn thứ hai, cảng biển quan trọng phía tây bắc."],
    ["Địa hình Nga phía đông dãy U-ran chủ yếu là gì?", "Đồng bằng Tây Xi-bê-ri rộng lớn và cao nguyên", "Hoàn toàn là núi cao hiểm trở", "Hoàn toàn là hoang mạc nóng", "Phía đông còn có vùng núi và cao nguyên Trung Xi-bê-ri."],
    ["Khí hậu chủ đạo của phần lớn lãnh thổ Nga là gì?", "Ôn đới lục địa khắc nghiệt, mùa đông rất lạnh", "Nhiệt đới nóng ẩm quanh năm", "Khí hậu Địa Trung Hải là chủ yếu", "Bắc Xi-bê-ri có khí hậu cận cực, cực; nhiều vùng đóng băng vĩnh cửu."],
    ["Hồ nước ngọt sâu nhất và trữ lượng lớn nhất thế giới ở Nga là hồ nào?", "Hồ Bai-can ở Xi-bê-ri", "Hồ Ladoga ở phía tây bắc", "Biển Cát-xpi", "Hồ Bai-can chứa khoảng một phần năm lượng nước ngọt bề mặt của thế giới."],
    ["Sông dài nhất châu Âu, chảy trên đồng bằng Nga, là sông nào?", "Sông Von-ga", "Sông Đa-nuýp", "Sông Ô-bi", "Các sông lớn ở Xi-bê-ri như Ô-bi, I-ê-nít-xây, Lê-na chảy ra Bắc Băng Dương."],
    ["Dân cư Nga phân bố có đặc điểm gì?", "Tập trung ở phía tây (phần châu Âu), thưa ở Xi-bê-ri", "Phân bố đều khắp lãnh thổ", "Tập trung chủ yếu ở Viễn Đông", "Mật độ dân số giảm mạnh từ tây sang đông do khí hậu khắc nghiệt và địa hình khó khăn."],
    ["Dân số Nga có biến động đáng chú ý nào?", "Từng giảm, tỉ lệ sinh thấp, già hoá dân số", "Tăng bùng nổ liên tục", "Dân số trẻ nhất thế giới", "Chính phủ Nga có nhiều chính sách khuyến khích sinh đẻ."],
    ["Nga là đất nước đa dân tộc với tôn giáo truyền thống chính nào?", "Chính thống giáo Nga chiếm đa số tín đồ", "Hồi giáo là tôn giáo duy nhất", "Không có tôn giáo nào", "Ngoài ra còn có Hồi giáo, Phật giáo và các tôn giáo khác ở các vùng."],
    ["Tài nguyên thiên nhiên nổi bật nhất của Nga là gì?", "Dầu mỏ, khí tự nhiên, than, kim loại phong phú", "Gần như không có khoáng sản", "Chỉ có tài nguyên rừng", "Nga thuộc nhóm nước có trữ lượng khí tự nhiên lớn nhất thế giới."],
    ["Ngành công nghiệp khai thác dầu khí của Nga tập trung ở vùng nào?", "Tây Xi-bê-ri là vùng khai thác chính", "Chỉ ở bán đảo Crưm", "Chỉ ở vùng núi Cau-ca-dơ", "Dầu khí là nguồn thu xuất khẩu chủ lực của Nga."],
    ["Nga xuất khẩu chủ yếu những mặt hàng nào?", "Năng lượng, nguyên liệu và vũ khí, máy móc", "Chủ yếu là hàng dệt may", "Chủ yếu là nông sản nhiệt đới", "Cơ cấu xuất khẩu phụ thuộc nhiều vào giá dầu khí thế giới."],
    ["Rừng của Nga có vai trò toàn cầu thế nào?", "Rừng tai-ga lớn nhất thế giới, nguồn gỗ và hấp thụ CO₂", "Rừng rất ít, không đáng kể", "Chỉ có rừng cây bụi khô hạn", "Tai-ga Nga chiếm diện tích rừng lá kim lớn nhất hành tinh."],
    ["Nông nghiệp Nga tập trung chủ yếu ở khu vực nào?", "Đồng bằng phía tây và phía nam phần châu Âu", "Vùng Bắc cực lạnh giá", "Vùng núi cao Xi-bê-ri", "Nga là nước xuất khẩu lúa mì hàng đầu thế giới."],
    ["Khó khăn lớn nhất của nông nghiệp Nga là gì?", "Quỹ đất tốt hạn chế, khí hậu lạnh, mùa sinh trưởng ngắn", "Thừa đất tốt ở vùng cực", "Không có đồng bằng nào", "Phần lớn lãnh thổ nằm ở vĩ độ cao, không thuận lợi cho trồng trọt."],
    ["Các trung tâm công nghiệp lớn của Nga tập trung ở đâu?", "Phần châu Âu: Mát-xcơ-va, Xanh Pê-téc-bua, vùng U-ran", "Chỉ ở Viễn Đông xa xôi", "Chỉ ở vùng Bắc cực", "Vùng U-ran giàu khoáng sản là trung tâm luyện kim lâu đời."],
    ["Đường sắt xuyên Xi-bê-ri nổi tiếng vì đặc điểm gì?", "Tuyến đường sắt dài hàng đầu thế giới, nối hai đầu đất nước", "Là tuyến đường sắt ngắn nhất thế giới", "Chỉ chạy trong phần châu Âu", "Tuyến này nối Mát-xcơ-va với Vla-đi-vô-xtốc ở bờ Thái Bình Dương."],
    ["Cảng Vla-đi-vô-xtốc có ý nghĩa gì với Nga?", "Cửa ngõ của Nga ra Thái Bình Dương ở Viễn Đông", "Cảng nội địa trên sông Von-ga", "Không có vai trò giao thương", "Phát triển Viễn Đông là hướng chiến lược của Nga hướng về châu Á – Thái Bình Dương."],
    ["Biển nào là biển nội địa lớn nhất thế giới nằm ở phía nam Nga?", "Biển Cát-xpi", "Biển Đen", "Biển Ban-tích", "Biển Cát-xpi giàu dầu khí và cá tầm lấy trứng cá muối nổi tiếng."],
    ["Vấn đề kinh tế – xã hội lớn của Nga hiện nay là gì?", "Phụ thuộc xuất khẩu năng lượng, chênh lệch vùng", "Không có ngành công nghiệp nào", "Dân số tăng quá nhanh gây quá tải", "Nga đang đa dạng hoá kinh tế và phát triển các ngành công nghệ cao."],
    ["Khoa học – vũ trụ là thế mạnh truyền thống nào của Nga?", "Ngành vũ trụ tiên phong, trạm không gian quốc tế", "Không có hoạt động vũ trụ", "Chỉ mua công nghệ vũ trụ của nước ngoài", "Nga (Liên Xô trước đây) phóng vệ tinh nhân tạo đầu tiên và đưa người đầu tiên lên vũ trụ."],
    ["Phần lãnh thổ châu Á của Nga được gọi chung là vùng nào?", "Xi-bê-ri và Viễn Đông", "Vùng Cau-ca-dơ", "Vùng Ban-tích", "Xi-bê-ri giàu tài nguyên nhưng thưa dân, khí hậu khắc nghiệt."],
    ["Đồng bằng Đông Âu (đồng bằng Nga) có đặc điểm gì?", "Rộng lớn, tương đối bằng phẳng, đất đai canh tác được", "Hoàn toàn là núi lửa đang hoạt động", "Là hoang mạc cát không có sông", "Đây là nơi tập trung dân cư, đô thị và nông nghiệp chính của Nga."]
  ];
  var dl11ngaP = [
    ["Mát-xcơ-va", "Thủ đô của Liên bang Nga"],
    ["Xanh Pê-téc-bua", "Thành phố cảng ở phía tây bắc"],
    ["Sông Von-ga", "Sông dài nhất ở châu Âu"],
    ["Hồ Bai-can", "Hồ nước ngọt sâu nhất thế giới"],
    ["Xi-bê-ri", "Vùng rộng lớn ở phía đông nước Nga"],
    ["Dãy U-ran", "Ranh giới tự nhiên giữa châu Á và châu Âu"],
    ["Vla-đi-vô-xtốc", "Cảng biển lớn ở Viễn Đông Nga"]
  ];
  var dl11nbF = [
    ["Nhật Bản là quốc gia có đặc điểm lãnh thổ nào?", "Quốc đảo gồm hàng nghìn đảo ở Đông Á", "Quốc gia lục địa rộng lớn", "Quốc gia không có biển", "Bốn đảo lớn là Hốc-cai-đô, Hôn-su, Xi-cô-kư và Kiu-xiu."],
    ["Đảo lớn nhất của Nhật Bản, nơi có thủ đô Tô-ki-ô, là đảo nào?", "Đảo Hôn-su", "Đảo Hốc-cai-đô", "Đảo Kiu-xiu", "Phần lớn dân cư và các trung tâm kinh tế lớn của Nhật nằm trên đảo Hôn-su."],
    ["Thủ đô của Nhật Bản là thành phố nào?", "Tô-ki-ô, đô thị lớn hàng đầu thế giới", "Ki-ô-tô", "Ô-xa-ca", "Ki-ô-tô là cố đô, nổi tiếng với di sản văn hoá truyền thống."],
    ["Địa hình Nhật Bản chủ yếu là gì?", "Đồi núi chiếm phần lớn, đồng bằng nhỏ hẹp ven biển", "Đồng bằng rộng mênh mông", "Hoang mạc chiếm ưu thế", "Đồng bằng Can-tô quanh Tô-ki-ô là đồng bằng lớn nhất của Nhật."],
    ["Nhật Bản thường xuyên chịu thiên tai nào?", "Động đất, núi lửa và sóng thần", "Bão tuyết kéo dài cả năm", "Hoàn toàn không có thiên tai", "Nhật nằm trên “Vành đai lửa Thái Bình Dương”, có nhiều núi lửa đang hoạt động."],
    ["Ngọn núi cao nhất và là biểu tượng của Nhật Bản là núi nào?", "Núi Phú Sĩ (Fuji)", "Núi Phú Lương", "Núi Hôn-su", "Núi Phú Sĩ là một núi lửa đã ngừng phun từ đầu thế kỉ XVIII."],
    ["Khí hậu Nhật Bản có đặc điểm gì?", "Ôn đới gió mùa, phân hoá bắc – nam rõ rệt", "Nhiệt đới khô hạn quanh năm", "Hàn đới ở toàn bộ lãnh thổ", "Hốc-cai-đô ở phía bắc lạnh, có tuyết nhiều; phía nam ấm hơn và hay có bão."],
    ["Dân số Nhật Bản có xu hướng nổi bật nào?", "Già hoá nhanh nhất thế giới, dân số đang giảm", "Dân số trẻ, tăng rất nhanh", "Tỉ lệ người già thấp nhất thế giới", "Tuổi thọ trung bình của người Nhật thuộc hàng cao nhất thế giới."],
    ["Dân cư Nhật Bản phân bố tập trung ở đâu?", "Ven biển đảo Hôn-su, trong các siêu đô thị", "Vùng núi sâu trong nội địa", "Đảo Hốc-cai-đô là đông nhất", "Dải đô thị từ Tô-ki-ô qua Na-gô-y-a tới Ô-xa-ca tập trung phần lớn dân số."],
    ["Nhật Bản có vị thế kinh tế thế nào?", "Nền kinh tế phát triển hàng đầu thế giới", "Nền kinh tế đang phát triển thu nhập thấp", "Không có công nghiệp chế tạo", "Nhật mạnh về ô tô, điện tử, robot và máy móc chính xác."],
    ["Hạn chế lớn nhất về tài nguyên của Nhật Bản là gì?", "Nghèo khoáng sản, phải nhập hầu hết nhiên liệu, nguyên liệu", "Thừa tài nguyên không khai thác hết", "Giàu dầu mỏ nhất thế giới", "Nhật nhập khẩu gần như toàn bộ dầu mỏ, khí đốt và nhiều nguyên liệu công nghiệp."],
    ["Kinh tế đối ngoại của Nhật Bản dựa vào chiến lược nào?", "Xuất khẩu hàng chế tạo, nhập nguyên liệu và đầu tư ra ngoài", "Đóng cửa, không buôn bán quốc tế", "Chỉ xuất khẩu nông sản thô", "Các tập đoàn Nhật đầu tư nhà máy ở nhiều nước, trong đó có Việt Nam."],
    ["Ngành công nghiệp nổi tiếng toàn cầu của Nhật Bản là ngành nào?", "Ô tô, điện tử và robot công nghiệp", "Khai thác dầu mỏ ngoài khơi", "Dệt may thủ công truyền thống", "Các hãng như Toyota, Sony, Panasonic là thương hiệu toàn cầu."],
    ["Nông nghiệp Nhật Bản có đặc điểm gì?", "Thâm canh cao, diện tích ít, ứng dụng công nghệ", "Quảng canh trên diện tích mênh mông", "Không trồng lúa", "Lúa gạo vẫn là cây lương thực chính; Nhật bảo hộ nông nghiệp trong nước mạnh."],
    ["Ngành thuỷ sản của Nhật Bản phát triển nhờ điều kiện nào?", "Vùng biển giàu cá nơi dòng nóng – lạnh gặp nhau", "Nhật không có ngư trường nào", "Chỉ nuôi cá trong ao hồ nhỏ", "Chợ cá và ẩm thực hải sản là nét văn hoá kinh tế nổi tiếng của Nhật."],
    ["Giao thông nổi tiếng của Nhật Bản là phương tiện nào?", "Tàu cao tốc Shinkansen nhanh, đúng giờ", "Chỉ có giao thông đường thuỷ nội địa", "Không có đường sắt", "Shinkansen là mẫu hình tàu cao tốc đầu tiên của thế giới (từ năm 1964)."],
    ["Vấn đề lớn của kinh tế Nhật Bản trong nhiều thập kỉ gần đây là gì?", "Tăng trưởng chậm, già hoá và thiếu lao động", "Bùng nổ dân số gây thất nghiệp lớn", "Thiếu thị trường xuất khẩu hoàn toàn", "Nhật tăng cường thu hút lao động nước ngoài và tự động hoá để ứng phó."],
    ["Trung tâm kinh tế lớn ở vùng Kansai của Nhật Bản là thành phố nào?", "Ô-xa-ca", "Xáp-pô-rô", "Na-ga-xa-ki", "Ba vùng kinh tế lớn: Kanto (Tô-ki-ô), Chubu (Na-gô-y-a) và Kansai (Ô-xa-ca)."],
    ["Nhật Bản ứng phó với động đất bằng biện pháp nổi bật nào?", "Nhà cao tầng chống động đất, cảnh báo sớm, diễn tập", "Không có biện pháp phòng chống nào", "Di dời toàn bộ dân khỏi đảo", "Kiến trúc chống động đất của Nhật là hình mẫu cho nhiều nước."],
    ["Văn hoá Nhật Bản có sức ảnh hưởng toàn cầu qua lĩnh vực nào?", "Truyện tranh, hoạt hình, ẩm thực và công nghệ", "Không có sản phẩm văn hoá xuất khẩu", "Chỉ qua khai thác tài nguyên", "“Quyền lực mềm” giúp Nhật quảng bá hình ảnh và thu hút du lịch."],
    ["Du lịch Nhật Bản thu hút khách nhờ những yếu tố nào?", "Hoa anh đào, núi Phú Sĩ, di sản và ẩm thực", "Khí hậu hoang mạc đặc biệt", "Chỉ có các khu công nghiệp", "Ki-ô-tô và Na-ra là những trung tâm di sản văn hoá lớn."],
    ["Chính sách lao động của Nhật trước già hoá dân số là gì?", "Kéo dài tuổi làm việc, dùng robot, nhận lao động nước ngoài", "Cấm người già làm việc hoàn toàn", "Không thay đổi chính sách nào", "Việt Nam là một trong những nước đưa nhiều thực tập sinh, lao động sang Nhật."],
    ["Nhật Bản hợp tác kinh tế chặt chẽ với Việt Nam qua lĩnh vực nào?", "Đầu tư FDI, thương mại và hỗ trợ ODA lớn", "Không có quan hệ kinh tế nào", "Chỉ hợp tác về quân sự", "Nhật thuộc nhóm nhà đầu tư và đối tác thương mại hàng đầu của Việt Nam."],
    ["Nguồn năng lượng của Nhật Bản sau sự cố Fukushima có thay đổi gì?", "Giảm điện hạt nhân, tăng khí hoá lỏng và năng lượng tái tạo", "Tăng mạnh điện than trong nước tự khai thác", "Ngừng sử dụng điện hoàn toàn", "Nhật vẫn phải nhập khẩu phần lớn năng lượng từ nước ngoài."]
  ];
  var dl11nbP = [
    ["Hôn-su", "Đảo lớn nhất của Nhật Bản"],
    ["Hốc-cai-đô", "Đảo lớn ở phía bắc Nhật Bản"],
    ["Kiu-xiu", "Đảo lớn ở phía nam Nhật Bản"],
    ["Xi-cô-kư", "Đảo nhỏ nhất trong bốn đảo chính"],
    ["Tô-ki-ô", "Thủ đô của Nhật Bản"],
    ["Ô-xa-ca", "Trung tâm kinh tế vùng Kansai"],
    ["Ki-ô-tô", "Cố đô giàu di sản văn hoá"]
  ];
  var dl11tqF = [
    ["Trung Quốc có diện tích và dân số ở vị thế nào?", "Diện tích thuộc nhóm lớn nhất, dân số hơn 1,4 tỉ người", "Diện tích nhỏ, dân số rất ít", "Dân số chỉ vài chục triệu người", "Trung Quốc là nước đông dân thứ hai thế giới sau Ấn Độ theo số liệu gần đây."],
    ["Thủ đô của Trung Quốc là thành phố nào?", "Bắc Kinh, trung tâm chính trị – văn hoá", "Thượng Hải", "Quảng Châu", "Thượng Hải là trung tâm kinh tế, tài chính và cảng biển lớn nhất của Trung Quốc."],
    ["Địa hình Trung Quốc có xu hướng thay đổi thế nào từ tây sang đông?", "Cao dần ở phía tây, thấp dần về phía đông", "Bằng phẳng hoàn toàn khắp cả nước", "Phía đông cao hơn phía tây", "Địa hình như bậc thang ba cấp giúp sông chảy về phía đông ra biển."],
    ["Hai con sông lớn nhất Trung Quốc là sông nào?", "Sông Trường Giang và sông Hoàng Hà", "Sông Mê Công và sông Hồng", "Sông Hắc Long Giang và sông Liêu Hà", "Trường Giang là sông dài nhất Trung Quốc và châu Á."],
    ["Tam Hiệp là công trình gì nổi tiếng trên sông Trường Giang?", "Đập thuỷ điện lớn nhất thế giới", "Cầu treo dài nhất thế giới", "Kênh đào nhân tạo cổ đại", "Hồ chứa Tam Hiệp còn giúp điều tiết lũ và giao thông thuỷ."],
    ["Khí hậu Trung Quốc có đặc điểm nổi bật nào?", "Đa dạng, phía đông gió mùa ẩm, phía tây khô hạn", "Hoàn toàn là khí hậu hoang mạc", "Hoàn toàn là khí hậu nhiệt đới", "Hoàng thổ cao nguyên và hoang mạc Gô-bi nằm ở phía bắc và tây bắc."],
    ["Dân cư Trung Quốc phân bố có đặc điểm gì?", "Đông ở miền Đông ven biển, thưa ở miền Tây", "Đều khắp cả nước", "Đông nhất ở vùng hoang mạc phía tây", "Đường phân chia dân cư chạy từ Hắc Hà tới Đằng Xung: phía đông chiếm đa số dân."],
    ["Chính sách dân số nổi tiếng trước đây của Trung Quốc là chính sách gì?", "Chính sách một con (sau này nới lên hai, ba con)", "Khuyến khích sinh không giới hạn", "Không có chính sách dân số nào", "Chính sách một con giúp giảm tăng dân số nhưng làm già hoá và mất cân bằng giới tính."],
    ["Trung Quốc hiện đối mặt vấn đề dân số nào?", "Già hoá nhanh và dân số bắt đầu giảm", "Bùng nổ dân số trẻ trở lại", "Thiếu hoàn toàn người già", "Trung Quốc đang khuyến khích các gia đình sinh thêm con."],
    ["Nền kinh tế Trung Quốc có vị thế thế nào?", "Kinh tế lớn thứ hai thế giới, công xưởng chế tạo lớn", "Kinh tế nhỏ, chủ yếu nông nghiệp", "Không xuất khẩu hàng hoá", "Trung Quốc dẫn đầu thế giới về sản lượng nhiều mặt hàng công nghiệp và tổng kim ngạch thương mại hàng hoá."],
    ["Vùng kinh tế phát triển nhất của Trung Quốc nằm ở đâu?", "Duyên hải miền Đông: các châu thổ sông lớn", "Vùng hoang mạc phía tây bắc", "Cao nguyên Thanh Tạng", "Ba trung tâm lớn: châu thổ Trường Giang, châu thổ Châu Giang và vành đai Bột Hải."],
    ["Thành phố cảng và trung tâm tài chính lớn nhất Trung Quốc là thành phố nào?", "Thượng Hải", "Tây An", "Côn Minh", "Cảng Thượng Hải thuộc nhóm cảng container bận rộn nhất thế giới."],
    ["Thâm Quyến nổi tiếng là gì trong quá trình cải cách của Trung Quốc?", "Đặc khu kinh tế đầu tiên, trung tâm công nghệ lớn", "Thủ đô chính trị của Trung Quốc", "Vùng nông nghiệp trồng lúa chính", "Thâm Quyến từ làng chài trở thành “thung lũng silicon” của Trung Quốc."],
    ["Chiến lược phát triển vùng của Trung Quốc với miền Tây là gì?", "“Khai phá miền Tây” để thu hẹp chênh lệch vùng", "Bỏ mặc miền Tây không đầu tư", "Di dời toàn bộ dân miền Đông về miền Tây", "Chênh lệch giàu nghèo đông – tây vẫn là thách thức lớn của Trung Quốc."],
    ["Nông nghiệp Trung Quốc có sản lượng nổi bật nào?", "Lúa gạo và lúa mì thuộc nhóm lớn nhất thế giới", "Không sản xuất lương thực", "Chỉ trồng cây ôn đới lạnh", "Đồng bằng Hoa Bắc, Hoa Trung là những vùng nông nghiệp chính."],
    ["Công nghiệp Trung Quốc hiện đang chuyển hướng thế nào?", "Từ gia công giá rẻ lên công nghệ cao, sáng tạo", "Quay lại sản xuất thủ công", "Bỏ hoàn toàn ngành chế tạo", "Chiến lược “Made in China 2025” hướng tới các ngành công nghệ cao."],
    ["Sáng kiến “Vành đai và Con đường” của Trung Quốc nhằm mục đích gì?", "Kết nối thương mại, hạ tầng Á – Âu – Phi", "Đóng cửa giao thương với các nước", "Chỉ xây dựng đường trong nội địa", "Sáng kiến gồm Con đường Tơ lụa trên đất liền và trên biển thế kỉ XXI."],
    ["Hồng Kông và Ma Cao có địa vị gì trong Trung Quốc?", "Đặc khu hành chính với chế độ riêng", "Là hai quốc gia độc lập", "Là tỉnh bình thường như mọi tỉnh", "Nguyên tắc “một quốc gia, hai chế độ” áp dụng tại hai đặc khu này."],
    ["Vấn đề môi trường lớn của các đô thị Trung Quốc là gì?", "Ô nhiễm không khí và nước do công nghiệp hoá nhanh", "Hoàn toàn không có ô nhiễm", "Chỉ có vấn đề băng tuyết tan", "Trung Quốc đang đầu tư lớn nhất thế giới vào năng lượng tái tạo để cải thiện môi trường."],
    ["Trung Quốc dẫn đầu thế giới về lĩnh vực năng lượng nào?", "Sản xuất điện mặt trời, điện gió và xe điện", "Khai thác băng cháy ở Bắc cực", "Không phát triển năng lượng tái tạo", "Trung Quốc cũng là nước phát thải CO₂ lớn nhất hiện nay."],
    ["Đường sắt cao tốc của Trung Quốc có vị thế thế nào?", "Mạng lưới dài nhất thế giới", "Chưa có đường sắt cao tốc", "Chỉ có một tuyến ngắn duy nhất", "Tàu cao tốc nối hầu hết các thành phố lớn ở miền Đông."],
    ["Dân tộc chiếm đa số ở Trung Quốc là dân tộc nào?", "Người Hán chiếm trên 90% dân số", "Người Tạng chiếm đa số", "Người Mông Cổ chiếm đa số", "Trung Quốc có 56 dân tộc được công nhận, phân bố nhiều ở vùng biên giới và miền Tây."],
    ["Khu tự trị và vùng miền Tây Trung Quốc có lợi thế tài nguyên gì?", "Giàu khoáng sản, năng lượng và đất rộng", "Không có tài nguyên nào", "Chỉ có lợi thế biển", "Tân Cương giàu dầu khí; Thanh Tạng là nơi bắt nguồn nhiều sông lớn châu Á."],
    ["Thương mại của Trung Quốc với Việt Nam có đặc điểm gì?", "Trung Quốc là đối tác thương mại lớn nhất của Việt Nam", "Hai nước không có quan hệ thương mại", "Chỉ có thương mại biên giới nhỏ lẻ", "Hàng điện tử, linh kiện và máy móc chiếm tỉ trọng lớn trong trao đổi hai chiều."],
    ["Vạn Lí Trường Thành gắn với ý nghĩa lịch sử nào của Trung Quốc?", "Công trình phòng thủ phía bắc, nay là di sản du lịch lớn", "Đê chắn lũ trên sông Hoàng Hà", "Kênh vận chuyển hàng hoá cổ đại", "Đại Vận Hà mới là kênh đào cổ nối Bắc Kinh với Hàng Châu."]
  ];
  var dl11tqP = [
    ["Bắc Kinh", "Thủ đô của Trung Quốc"],
    ["Thượng Hải", "Trung tâm kinh tế, cảng lớn nhất"],
    ["Sông Trường Giang", "Sông dài nhất Trung Quốc"],
    ["Sông Hoàng Hà", "Sông lớn ở phía bắc Trung Quốc"],
    ["Quảng Đông", "Tỉnh duyên hải phát triển bậc nhất"],
    ["Thâm Quyến", "Đặc khu kinh tế, trung tâm công nghệ"],
    ["Hồng Kông", "Đặc khu hành chính của Trung Quốc"]
  ];
  var dl11ucnpF = [
    ["Ô-xtrây-li-a vừa là châu lục, vừa có đặc điểm quốc gia nào?", "Quốc gia duy nhất chiếm trọn một châu lục", "Quốc gia nhỏ nhất châu Đại Dương", "Quốc gia không có đường bờ biển", "Ô-xtrây-li-a là nước có diện tích lớn thứ sáu thế giới."],
    ["Thủ đô của Ô-xtrây-li-a là thành phố nào?", "Can-bê-ra (Canberra)", "Xít-ni (Sydney)", "Men-bơn (Melbourne)", "Xít-ni mới là thành phố lớn nhất và nổi tiếng nhất của Ô-xtrây-li-a."],
    ["Phần lớn nội địa Ô-xtrây-li-a có khí hậu gì?", "Khô hạn, hoang mạc và bán hoang mạc (outback)", "Nhiệt đới ẩm mưa quanh năm", "Hàn đới lạnh giá", "Dân cư và nông nghiệp tập trung ở dải duyên hải đông và đông nam mưa thuận hoà hơn."],
    ["Dân cư Ô-xtrây-li-a tập trung chủ yếu ở đâu?", "Duyên hải phía đông và đông nam, trong các đô thị lớn", "Giữa hoang mạc nội địa", "Vùng phía bắc nhiệt đới thưa thớt", "Tỉ lệ dân thành thị của Ô-xtrây-li-a thuộc hàng cao nhất thế giới."],
    ["Hệ động vật đặc trưng nổi tiếng của Ô-xtrây-li-a gồm những loài nào?", "Kang-ga-ru, gấu koala và thú mỏ vịt", "Hổ, voi và tê giác", "Gấu trắng và chim cánh cụt", "Nhiều loài thú có túi chỉ có ở châu Úc do lục địa tách biệt lâu dài."],
    ["Rạn san hô lớn nhất thế giới nằm ở vùng biển nào của Ô-xtrây-li-a?", "Rạn san hô Great Barrier ở đông bắc", "Rạn san hô ở biển phía nam lạnh giá", "Ô-xtrây-li-a không có rạn san hô", "Great Barrier Reef là di sản thiên nhiên thế giới, đang bị đe doạ bởi nóng lên của biển."],
    ["Ngành kinh tế xuất khẩu nổi bật của Ô-xtrây-li-a là ngành nào?", "Khai thác khoáng sản: quặng sắt, than, vàng", "Xuất khẩu lúa gạo là chủ yếu", "Không khai thác khoáng sản", "Ô-xtrây-li-a thuộc nhóm nước xuất khẩu quặng sắt và than lớn nhất thế giới, nhiều sang châu Á."],
    ["Ô-xtrây-li-a nổi tiếng thế giới về sản phẩm nông nghiệp nào?", "Len lông cừu và lúa mì xuất khẩu", "Cà phê và ca cao", "Gạo thơm nhiệt đới", "Đàn cừu của Ô-xtrây-li-a thuộc hàng lớn nhất thế giới, chăn thả trên đồng cỏ rộng."],
    ["Dãy núi chính chạy dọc bờ đông Ô-xtrây-li-a là dãy nào?", "Dãy Great Dividing Range (dãy phân thuỷ lớn)", "Dãy An-đét", "Dãy Hi-ma-lay-a", "Dải đất phía đông dãy núi này mưa nhiều hơn, là vùng kinh tế chính của đất nước."],
    ["Người bản địa lâu đời của Ô-xtrây-li-a là người nào?", "Người Aboriginal (thổ dân Úc)", "Người Maori", "Người Inuit", "Người Maori là dân bản địa của Niu Di-lân, nước láng giềng của Ô-xtrây-li-a."],
    ["Nam Phi nằm ở vị trí nào của châu Phi?", "Ở cực nam châu Phi, giáp hai đại dương", "Ở phía bắc châu Phi ven Địa Trung Hải", "Là một quốc đảo giữa Ấn Độ Dương", "Nam Phi giáp Đại Tây Dương ở phía tây và Ấn Độ Dương ở phía đông."],
    ["Nam Phi có điểm đặc biệt nào về thủ đô?", "Có ba thủ đô: hành chính, lập pháp và tư pháp", "Chỉ có một thủ đô duy nhất là Giô-han-ne-xbéc", "Không có thủ đô chính thức", "Prê-tô-ri-a là thủ đô hành chính, Kếp-tao là thủ đô lập pháp, Bloemfontein là thủ đô tư pháp."],
    ["Thủ đô hành chính của Nam Phi là thành phố nào?", "Prê-tô-ri-a", "Kếp-tao", "Giô-han-ne-xbéc", "Giô-han-ne-xbéc là thành phố lớn nhất và là trung tâm kinh tế của Nam Phi."],
    ["Địa hình chủ yếu của Nam Phi là gì?", "Cao nguyên rộng, viền núi cao và dải đồng bằng ven biển hẹp", "Hoàn toàn là đồng bằng thấp", "Hoàn toàn là hoang mạc cát", "Dãy Drê-ken-xbéc ở phía đông là dãy núi cao nhất của Nam Phi."],
    ["Khí hậu của phần lớn Nam Phi thuộc kiểu nào?", "Cận nhiệt và ôn đới, khô hơn về phía tây", "Xích đạo ẩm quanh năm", "Hàn đới lạnh giá", "Vùng Kếp-tao có khí hậu Địa Trung Hải: mưa vào mùa đông, khô vào mùa hạ."],
    ["Khoáng sản nổi tiếng nhất của Nam Phi là gì?", "Vàng và kim cương, cùng bạch kim và than", "Dầu mỏ và khí đốt là chủ yếu", "Không có khoáng sản quý", "Nam Phi từng là nước sản xuất vàng lớn nhất thế giới và nay vẫn dẫn đầu về bạch kim."],
    ["Dân cư Nam Phi có đặc điểm nổi bật nào?", "Đa chủng tộc, được gọi là “quốc gia cầu vồng”", "Hoàn toàn đồng nhất một chủng tộc", "Chỉ gồm người nhập cư châu Âu", "Quá khứ chế độ phân biệt chủng tộc A-pác-thai kết thúc năm 1994 với tổng thống Man-đê-la."],
    ["Nelson Mandela gắn với sự kiện lịch sử nào của Nam Phi?", "Tổng thống da đen đầu tiên sau khi A-pác-thai sụp đổ", "Người sáng lập thành phố Kếp-tao", "Vị vua cuối cùng của Nam Phi", "Ông là biểu tượng đấu tranh chống phân biệt chủng tộc, được trao giải Nobel Hoà bình."],
    ["Kinh tế Nam Phi có vị thế thế nào ở châu Phi?", "Nền kinh tế công nghiệp phát triển hàng đầu châu Phi", "Nền kinh tế kém phát triển nhất châu Phi", "Hoàn toàn dựa vào nông nghiệp tự túc", "Nam Phi mạnh về khai khoáng, tài chính, và là thành viên nhóm BRICS."],
    ["Vấn đề xã hội lớn mà Nam Phi còn phải giải quyết là gì?", "Chênh lệch giàu nghèo và thất nghiệp cao", "Dân số quá thưa không có lao động", "Không có đô thị lớn nào", "Di sản của A-pác-thai khiến bất bình đẳng ở Nam Phi thuộc hàng cao nhất thế giới."],
    ["Mũi đất nổi tiếng ở cực nam Nam Phi, nơi du khách đến Kếp-tao thường thăm, là mũi nào?", "Mũi Hảo Vọng (Cape of Good Hope)", "Mũi Sừng châu Phi", "Mũi Leeuwin của Úc", "Kếp-tao nằm dưới chân núi Bàn (Table Mountain) nổi tiếng."],
    ["Nông nghiệp Nam Phi có những sản phẩm xuất khẩu nào nổi bật?", "Ngô, trái cây cận nhiệt và rượu vang vùng Kếp", "Lúa nước nhiệt đới là chủ yếu", "Không xuất khẩu nông sản", "Khô hạn và thiếu nước là khó khăn thường xuyên của nông nghiệp Nam Phi."],
    ["Du lịch Nam Phi thu hút khách nhờ tài nguyên nào?", "Safari ngắm động vật hoang dã và cảnh quan núi – biển", "Chỉ có du lịch đô thị mua sắm", "Không có vườn quốc gia nào", "Vườn quốc gia Kruger là một trong những khu bảo tồn động vật lớn nhất châu Phi."],
    ["Điểm chung về tự nhiên của Ô-xtrây-li-a và Nam Phi là gì?", "Đều ở Nam bán cầu, giàu khoáng sản và khô hạn nhiều nơi", "Đều nằm ở Bắc bán cầu lạnh giá", "Đều là quốc đảo nhỏ", "Cả hai nước đều xuất khẩu mạnh khoáng sản và nông sản ôn đới – cận nhiệt."]
  ];
  var dl11ucnpP = [
    ["Ô-xtrây-li-a", "Can-bê-ra là thủ đô"],
    ["Nam Phi", "Prê-tô-ri-a là thủ đô hành chính"],
    ["Xít-ni", "Thành phố lớn nhất Ô-xtrây-li-a"],
    ["Men-bơn", "Thành phố lớn ở đông nam nước Úc"],
    ["Kếp-tao", "Thành phố cảng lớn của Nam Phi"],
    ["Giô-han-ne-xbéc", "Thành phố lớn nhất Nam Phi"],
    ["Rạn Great Barrier", "Rạn san hô lớn nhất thế giới"]
  ];
  var dl11cd1F = [
    ["Uỷ hội sông Mê Công (MRC) là tổ chức có chức năng gì?", "Hợp tác quản lí, sử dụng bền vững lưu vực Mê Công", "Tổ chức quân sự của các nước hạ lưu", "Công ty khai thác thuỷ điện tư nhân", "MRC gồm bốn nước thành viên hạ lưu: Cam-pu-chia, Lào, Thái Lan và Việt Nam."],
    ["Hiệp định hợp tác phát triển bền vững lưu vực Mê Công được kí năm nào?", "Năm 1995 giữa bốn nước hạ lưu Mê Công", "Năm 1967 tại Băng Cốc", "Năm 2015 tại Pa-ri", "Hiệp định Mê Công 1995 là cơ sở pháp lí chính cho hoạt động của MRC."],
    ["Sông Mê Công bắt nguồn từ đâu và chảy qua những nước nào?", "Từ cao nguyên Thanh Tạng, qua 6 nước ra Biển Đông", "Từ dãy An-đét, qua 3 nước ra Đại Tây Dương", "Từ hồ Bai-can, chỉ chảy trong một nước", "Mê Công là một trong những sông lớn nhất thế giới về lưu lượng và đa dạng sinh học thuỷ sản."],
    ["Vì sao hợp tác Mê Công có ý nghĩa đặc biệt với Việt Nam?", "Việt Nam ở cuối nguồn, chịu tác động của thượng nguồn", "Việt Nam nằm ở đầu nguồn con sông", "Sông Mê Công không chảy qua Việt Nam", "Đồng bằng sông Cửu Long phụ thuộc lớn vào dòng chảy và phù sa Mê Công."],
    ["Vấn đề lớn nhất trong khai thác sông Mê Công hiện nay là gì?", "Đập thuỷ điện thượng nguồn làm thay đổi dòng chảy, phù sa", "Sông không còn nước để sử dụng", "Không nước nào quan tâm tới con sông", "Hạn hán, xâm nhập mặn ở ĐBSCL gia tăng một phần do dòng chảy mùa khô giảm."],
    ["Nguyên tắc quan trọng khi các nước cùng khai thác một dòng sông quốc tế là gì?", "Sử dụng công bằng, hợp lí và không gây hại đáng kể", "Nước thượng nguồn được dùng toàn bộ nước", "Mọi nước tự ý xây đập không cần thông báo", "Hiệp định Mê Công yêu cầu thông báo, tham vấn trước với các dự án trên dòng chính."],
    ["Ngoài MRC, cơ chế hợp tác Mê Công nào có cả 6 nước lưu vực tham gia?", "Hợp tác Mê Công – Lan Thương (MLC)", "Hợp tác ASEAN+3", "Sáng kiến Vành đai và Con đường", "Trung Quốc và Mi-an-ma là quan sát viên của MRC, đồng thời tham gia MLC."],
    ["Khai thác tài nguyên nước Mê Công cần cân bằng những mục tiêu nào?", "Điện, nông nghiệp, thuỷ sản, giao thông và môi trường", "Chỉ ưu tiên thuỷ điện bằng mọi giá", "Chỉ phục vụ giao thông thuỷ", "Thuỷ sản Mê Công là nguồn đạm quan trọng của hàng chục triệu dân trong lưu vực."],
    ["Biển Đông có ý nghĩa quốc tế quan trọng vì sao?", "Tuyến hàng hải nhộn nhịp, giàu tài nguyên biển", "Là biển kín không có tàu qua lại", "Không có tài nguyên sinh vật nào", "Một tỉ trọng lớn thương mại hàng hải toàn cầu đi qua Biển Đông mỗi năm."],
    ["Công ước của Liên Hợp Quốc về Luật Biển (UNCLOS) được thông qua năm nào?", "Năm 1982", "Năm 1995", "Năm 1945", "UNCLOS là “hiến pháp của đại dương”, quy định vùng biển và quyền của các quốc gia ven biển."],
    ["Theo UNCLOS, vùng đặc quyền kinh tế của một nước ven biển rộng bao nhiêu?", "200 hải lí tính từ đường cơ sở", "12 hải lí tính từ đường cơ sở", "Không giới hạn", "12 hải lí là chiều rộng lãnh hải; vùng đặc quyền kinh tế mở rộng tới 200 hải lí."],
    ["Tuyên bố về ứng xử của các bên ở Biển Đông (DOC) được kí năm nào?", "Năm 2002 giữa ASEAN và Trung Quốc", "Năm 1982 tại Liên Hợp Quốc", "Năm 1967 tại Băng Cốc", "Các bên đang đàm phán Bộ quy tắc ứng xử (COC) thực chất và hiệu quả hơn DOC."],
    ["Giải quyết tranh chấp ở Biển Đông cần tuân theo nguyên tắc nào?", "Hoà bình, theo luật pháp quốc tế và UNCLOS 1982", "Dùng vũ lực để áp đặt yêu sách", "Đơn phương thay đổi hiện trạng", "Việt Nam kiên trì giải quyết tranh chấp bằng biện pháp hoà bình."],
    ["Hợp tác trên Biển Đông có thể triển khai ở những lĩnh vực ít nhạy cảm nào?", "Bảo vệ môi trường biển, cứu hộ, nghiên cứu khoa học", "Chỉ hợp tác khai thác dầu khí tranh chấp", "Không có lĩnh vực hợp tác nào khả thi", "Hợp tác nghề cá và bảo tồn sinh vật biển mang lại lợi ích cho mọi bên."],
    ["Tài nguyên nổi bật của Biển Đông đối với các nước ven biển là gì?", "Thuỷ sản phong phú, dầu khí và du lịch biển", "Không có tài nguyên kinh tế nào", "Chỉ có băng tuyết quanh năm", "Nghề cá Biển Đông nuôi sống hàng triệu ngư dân trong khu vực."],
    ["Thách thức an ninh phi truyền thống trên Biển Đông gồm những gì?", "Cướp biển, buôn lậu, ô nhiễm và thiên tai trên biển", "Chỉ có tranh chấp lãnh thổ", "Không tồn tại thách thức nào", "Hợp tác tuần tra và cứu nạn giúp giảm các nguy cơ này."],
    ["Vai trò của ASEAN trong vấn đề Biển Đông là gì?", "Thúc đẩy hoà bình, xây dựng COC và đoàn kết khu vực", "Đứng ngoài mọi vấn đề của khu vực", "Giải quyết tranh chấp bằng biện pháp quân sự", "ASEAN nhấn mạnh vai trò trung tâm trong cấu trúc an ninh khu vực."],
    ["Khai thác chung và hợp tác cùng phát triển ở Biển Đông nhằm mục đích gì?", "Vừa bảo vệ chủ quyền, vừa giữ hoà bình và lợi ích chung", "Từ bỏ mọi quyền lợi biển của quốc gia", "Đóng cửa Biển Đông với tàu bè quốc tế", "Tự do hàng hải, hàng không ở Biển Đông là lợi ích của cả khu vực và thế giới."],
    ["Biến đổi khí hậu đe doạ vùng ven Biển Đông và ĐBSCL thế nào?", "Nước biển dâng, mặn xâm nhập và bão mạnh hơn", "Làm khí hậu mát mẻ và ổn định hơn", "Không ảnh hưởng tới vùng ven biển", "Hợp tác ứng phó biến đổi khí hậu là nội dung quan trọng của hợp tác Mê Công – Biển Đông."],
    ["Đánh bắt thuỷ sản bền vững ở Biển Đông đòi hỏi điều gì?", "Khai thác trong khả năng tái tạo, bảo vệ nguồn lợi chung", "Đánh bắt càng nhiều càng tốt không giới hạn", "Cấm hoàn toàn mọi hoạt động nghề cá", "Nguồn cá suy giảm do khai thác quá mức là nguy cơ chung của các nước ven biển."],
    ["Học sinh có thể góp phần bảo vệ biển và sông ngòi bằng việc nào?", "Giảm rác nhựa, tuyên truyền bảo vệ môi trường nước", "Xả rác xuống sông để nước cuốn đi", "Không cần quan tâm tới vấn đề chung", "Rác nhựa đại dương phần lớn bắt nguồn từ đất liền và các dòng sông."],
    ["Mục tiêu cuối cùng của hợp tác khai thác Biển Đông trong hoà bình là gì?", "Biển hoà bình, hợp tác và phát triển bền vững", "Một bên kiểm soát toàn bộ vùng biển", "Ngăn cản mọi hoạt động kinh tế biển", "Đây cũng là lập trường nhất quán của Việt Nam và ASEAN."]
  ];
  var dl11cd1P = [
    ["Uỷ hội sông Mê Công (MRC)", "Hợp tác quản lí bền vững lưu vực"],
    ["Hiệp định Mê Công 1995", "Cơ sở hợp tác của bốn nước hạ lưu"],
    ["Biển Đông", "Tuyến hàng hải quốc tế quan trọng"],
    ["UNCLOS 1982", "Công ước của LHQ về Luật Biển"],
    ["DOC 2002", "Tuyên bố ứng xử ở Biển Đông"],
    ["COC", "Bộ quy tắc ứng xử đang đàm phán"]
  ];
  var dl11cd2F = [
    ["Tài nguyên du lịch được chia thành hai nhóm chính nào?", "Tài nguyên tự nhiên và tài nguyên nhân văn", "Chỉ gồm bãi biển và núi cao", "Chỉ gồm di tích lịch sử", "Tài nguyên là nền tảng để xây dựng sản phẩm du lịch của một địa phương, quốc gia."],
    ["Tài nguyên du lịch tự nhiên gồm những yếu tố nào?", "Địa hình, khí hậu, nước, sinh vật và cảnh quan", "Lễ hội và ẩm thực truyền thống", "Các công trình kiến trúc cổ", "Vịnh Hạ Long, Phong Nha là tài nguyên du lịch tự nhiên nổi tiếng của Việt Nam."],
    ["Tài nguyên du lịch nhân văn gồm những yếu tố nào?", "Di tích, lễ hội, làng nghề, ẩm thực và sự kiện", "Sông, hồ và thác nước tự nhiên", "Động thực vật quý hiếm", "Phố cổ Hội An, Cố đô Huế là tài nguyên du lịch nhân văn tiêu biểu."],
    ["Du lịch văn hoá là loại hình du lịch thế nào?", "Tham quan di tích, lễ hội, tìm hiểu bản sắc dân tộc", "Chỉ tắm biển và nghỉ dưỡng", "Chỉ leo núi mạo hiểm", "Du lịch văn hoá chiếm tỉ trọng lớn trong du lịch Việt Nam và nhiều nước châu Á."],
    ["Du lịch sinh thái hướng tới mục tiêu gì?", "Khám phá thiên nhiên gắn với bảo vệ môi trường, cộng đồng", "Khai thác tối đa tài nguyên bằng mọi giá", "Xây nhiều khách sạn trong rừng nguyên sinh", "Du khách sinh thái thường được hướng dẫn không để lại rác và tôn trọng hệ sinh thái."],
    ["Du lịch MICE là loại hình kết hợp du lịch với hoạt động gì?", "Hội họp, khen thưởng, hội nghị và triển lãm", "Hoạt động thể thao mạo hiểm", "Hành hương tôn giáo", "MICE mang lại doanh thu cao vì khách chi tiêu lớn và lưu trú theo đoàn."],
    ["Xu hướng du lịch thế giới nổi bật hiện nay là gì?", "Du lịch xanh, bền vững và trải nghiệm cá nhân hoá", "Du lịch ồ ạt, không quan tâm môi trường", "Chỉ du lịch theo đoàn lớn truyền thống", "Công nghệ số giúp du khách đặt dịch vụ, tra cứu và chia sẻ trải nghiệm dễ dàng."],
    ["Du lịch có tác động kinh tế – xã hội tích cực nào?", "Tạo việc làm, thu nhập và quảng bá hình ảnh đất nước", "Không tạo ra giá trị kinh tế nào", "Chỉ làm lợi cho doanh nghiệp nước ngoài", "Du lịch được gọi là “ngành công nghiệp không khói”."],
    ["Tác động tiêu cực cần hạn chế của du lịch ồ ạt là gì?", "Quá tải điểm đến, ô nhiễm và mai một văn hoá bản địa", "Làm tăng thu nhập cho cộng đồng địa phương", "Giúp bảo tồn di tích tốt hơn", "Nhiều điểm đến nổi tiếng thế giới đã giới hạn lượng khách để bảo vệ tài nguyên."],
    ["Việt Nam có lợi thế du lịch nổi bật nào?", "Bờ biển dài, nhiều di sản, ẩm thực phong phú", "Khí hậu băng tuyết quanh năm", "Chỉ có du lịch đô thị", "Việt Nam có nhiều di sản UNESCO như Hạ Long, Hội An, Huế, Phong Nha."],
    ["Di sản nào của Việt Nam là di sản thiên nhiên thế giới?", "Vịnh Hạ Long và Phong Nha – Kẻ Bàng", "Phố cổ Hà Nội 36 phố phường", "Địa đạo Củ Chi", "Quần thể Tràng An là di sản hỗn hợp văn hoá và thiên nhiên."],
    ["Du lịch cộng đồng có đặc điểm gì?", "Du khách trải nghiệm đời sống cùng dân bản địa", "Du khách chỉ ở trong resort khép kín", "Người dân địa phương không được tham gia", "Du lịch cộng đồng giúp người dân vùng cao, vùng nông thôn tăng thu nhập tại chỗ."],
    ["Yếu tố nào quyết định sức hấp dẫn lâu dài của một điểm đến?", "Tài nguyên độc đáo, hạ tầng tốt và dịch vụ chuyên nghiệp", "Chỉ cần quảng cáo rầm rộ một lần", "Giá càng rẻ thì càng bền vững", "An ninh, an toàn và thân thiện cũng là tiêu chí du khách quốc tế đánh giá cao."],
    ["Du lịch biển là thế mạnh của những vùng nào ở Việt Nam?", "Duyên hải miền Trung và các đảo như Phú Quốc", "Vùng núi cao phía bắc", "Đồng bằng sông Hồng nội địa", "Hạ Long, Đà Nẵng, Nha Trang, Phú Quốc là những trung tâm du lịch biển lớn."],
    ["Xu hướng du lịch sau đại dịch Covid-19 có thay đổi gì?", "Ưu tiên điểm đến an toàn, gần gũi thiên nhiên, nhóm nhỏ", "Du khách không còn quan tâm sức khoẻ", "Du lịch quốc tế ngừng hoàn toàn lâu dài", "Du lịch nội địa trở thành trụ đỡ quan trọng của nhiều nước, trong đó có Việt Nam."],
    ["“Du lịch thông minh” ứng dụng công nghệ vào hoạt động nào?", "Đặt dịch vụ trực tuyến, hướng dẫn số, thực tế ảo", "Thay thế hoàn toàn trải nghiệm thực tế", "Chỉ in tờ rơi giấy truyền thống", "Ứng dụng số giúp quản lí điểm đến và nâng trải nghiệm của du khách."],
    ["Để phát triển du lịch bền vững, cần cân bằng những lợi ích nào?", "Kinh tế, văn hoá – xã hội và bảo vệ môi trường", "Chỉ tối đa hoá lượng khách bằng mọi giá", "Chỉ lợi ích của doanh nghiệp lữ hành", "Du lịch bền vững để lại tài nguyên nguyên vẹn cho các thế hệ sau."],
    ["Khách du lịch quốc tế đến Việt Nam đông nhất từ những thị trường nào?", "Đông Bắc Á, Đông Nam Á, châu Âu và Bắc Mĩ", "Chỉ từ các nước láng giềng gần", "Chỉ từ các nước châu Phi", "Hàn Quốc, Trung Quốc, Hoa Kỳ là những thị trường gửi khách lớn của Việt Nam."],
    ["Lễ hội truyền thống đóng vai trò gì trong du lịch?", "Là sản phẩm văn hoá thu hút khách vào mùa lễ hội", "Không liên quan tới hoạt động du lịch", "Chỉ phục vụ người dân địa phương", "Ví dụ lễ hội pháo hoa Đà Nẵng, lễ hội Huế thu hút đông du khách."],
    ["Ngành du lịch cần nguồn nhân lực có yêu cầu gì?", "Ngoại ngữ tốt, nghiệp vụ và thái độ phục vụ chuyên nghiệp", "Không cần đào tạo bài bản", "Chỉ cần sức khoẻ tốt", "Hướng dẫn viên, lễ tân, đầu bếp là những nghề du lịch phổ biến."],
    ["Bảo tồn di sản gắn với du lịch cần nguyên tắc nào?", "Khai thác hợp lí, trích doanh thu để tu bổ di sản", "Khai thác tối đa, không cần tu bổ", "Đóng cửa di sản vĩnh viễn không đón khách", "Hội An và Huế là ví dụ cân bằng giữa bảo tồn phố cổ và phát triển du lịch."],
    ["Mỗi học sinh có thể quảng bá du lịch quê hương bằng cách nào?", "Giới thiệu cảnh đẹp, đặc sản qua mạng xã hội đúng sự thật", "Đăng thông tin sai lệch để câu khách", "Không thể góp phần gì", "Du lịch có trách nhiệm bắt đầu từ ý thức của từng người dân địa phương."]
  ];
  var dl11cd2P = [
    ["Du lịch văn hoá", "Tham quan di tích, lễ hội, bảo tàng"],
    ["Du lịch sinh thái", "Khám phá thiên nhiên, bảo vệ môi trường"],
    ["Du lịch nghỉ dưỡng biển", "Tắm biển, nghỉ ngơi ở vùng ven biển"],
    ["Du lịch mạo hiểm", "Leo núi, lặn biển, khám phá hang động"],
    ["Du lịch MICE", "Hội họp, hội nghị và triển lãm"],
    ["Du lịch cộng đồng", "Trải nghiệm sống cùng người dân bản địa"]
  ];
  var dl11cd3F = [
    ["Cách mạng công nghiệp lần thứ tư (4.0) dựa trên nền tảng chính nào?", "Kết nối số, dữ liệu và tự động hoá thông minh", "Động cơ hơi nước và cơ giới hoá", "Điện khí hoá và sản xuất hàng loạt", "CMCN 1.0 là hơi nước, 2.0 là điện, 3.0 là điện tử – máy tính, 4.0 là kết nối vạn vật."],
    ["Công nghệ cốt lõi nào được coi là “bộ não” của CMCN 4.0?", "Trí tuệ nhân tạo (AI)", "Động cơ đốt trong", "Máy hơi nước", "AI giúp máy học, nhận diện và hỗ trợ ra quyết định trong nhiều lĩnh vực."],
    ["Internet vạn vật (IoT) là khái niệm chỉ điều gì?", "Các thiết bị kết nối, trao đổi dữ liệu qua internet", "Mạng xã hội dành cho con người", "Hệ thống thư điện tử truyền thống", "IoT ứng dụng trong nhà thông minh, giao thông, nông nghiệp và nhà máy thông minh."],
    ["Dữ liệu lớn (Big Data) có vai trò gì trong CMCN 4.0?", "Nguyên liệu để phân tích, dự báo và ra quyết định", "Chỉ là dữ liệu lưu trữ không dùng tới", "Thay thế hoàn toàn con người trong mọi việc", "Dữ liệu được tạo ra từ điện thoại, cảm biến, giao dịch và mạng xã hội."],
    ["Nhà máy thông minh hoạt động dựa trên nguyên tắc nào?", "Robot, cảm biến và AI phối hợp tự động sản xuất", "Hoàn toàn lao động thủ công", "Không cần kết nối internet", "Sản xuất có thể tuỳ biến theo đơn hàng cá nhân của từng khách hàng."],
    ["Robot và tự động hoá tác động tới việc làm thế nào?", "Thay việc lặp lại, tạo việc mới cần kĩ năng cao hơn", "Xoá bỏ mọi loại việc làm của con người", "Không ảnh hưởng gì tới lao động", "Người lao động cần học tập suốt đời để không bị tụt hậu."],
    ["In 3D là công nghệ có đặc điểm gì?", "Tạo vật thể ba chiều bằng cách đắp từng lớp vật liệu", "In văn bản lên giấy như máy in thường", "Chụp ảnh ba chiều của vật thể", "In 3D dùng trong y tế (chi giả), cơ khí, xây dựng và giáo dục."],
    ["Điện toán đám mây giúp doanh nghiệp và cá nhân điều gì?", "Lưu trữ, xử lí dữ liệu trực tuyến không cần máy chủ riêng", "Tăng lượng mưa ở vùng khô hạn", "Thay thế hoàn toàn máy tính cá nhân vật lí", "Các dịch vụ học tập, làm việc trực tuyến đều dựa nhiều vào đám mây."],
    ["Công nghệ chuỗi khối (blockchain) nổi bật ở tính chất nào?", "Dữ liệu phân tán, minh bạch và khó sửa đổi", "Dữ liệu tập trung ở một máy chủ duy nhất", "Không cần bảo mật thông tin", "Blockchain ứng dụng trong tài chính, truy xuất nguồn gốc hàng hoá và logistics."],
    ["CMCN 4.0 tác động tới nông nghiệp theo hướng nào?", "Nông nghiệp thông minh: cảm biến, tưới tự động, dữ liệu", "Quay lại canh tác hoàn toàn thủ công", "Bỏ hẳn việc trồng trọt trong nhà kính", "Nông nghiệp 4.0 giúp tiết kiệm nước, phân bón và tăng năng suất."],
    ["Trong y tế, CMCN 4.0 mang lại tiến bộ nào?", "Khám bệnh từ xa, AI hỗ trợ chẩn đoán hình ảnh", "Bác sĩ không còn cần thiết nữa", "Chỉ thay đổi cách thu viện phí", "Robot phẫu thuật và hồ sơ sức khoẻ điện tử đang phổ biến dần."],
    ["Giáo dục thay đổi thế nào trong thời đại 4.0?", "Học trực tuyến, cá nhân hoá và học suốt đời lên ngôi", "Không cần trường lớp và giáo viên nữa", "Chỉ học thuộc lòng như truyền thống", "Kĩ năng số trở thành yêu cầu cơ bản với học sinh mọi cấp học."],
    ["Thách thức lớn của CMCN 4.0 đối với các nước đang phát triển là gì?", "Khoảng cách số, thiếu hạ tầng và nhân lực công nghệ", "Thừa quá nhiều robot trong sản xuất", "Không có thách thức nào", "Việt Nam xác định chuyển đổi số là động lực phát triển mới."],
    ["An ninh mạng trở thành vấn đề quan trọng trong CMCN 4.0 vì sao?", "Thiết bị kết nối có nguy cơ bị tấn công, rò rỉ dữ liệu", "Internet hoàn toàn an toàn tuyệt đối", "Dữ liệu cá nhân không có giá trị gì", "Bảo vệ thông tin cá nhân là trách nhiệm của cả tổ chức và mỗi người dùng."],
    ["Kinh tế số là nền kinh tế có đặc điểm gì?", "Hoạt động kinh tế dựa trên nền tảng số và internet", "Chỉ buôn bán trực tiếp tại chợ truyền thống", "Không sử dụng tiền điện tử", "Thương mại điện tử, thanh toán không tiền mặt là biểu hiện quen thuộc của kinh tế số."],
    ["Thành phố thông minh ứng dụng CMCN 4.0 vào quản lí đô thị thế nào?", "Dùng cảm biến, dữ liệu để quản lí giao thông, dịch vụ", "Chỉ xây thêm nhiều nhà chọc trời", "Không thay đổi cách quản lí nào", "Nhiều thành phố Việt Nam đang xây dựng trung tâm điều hành thông minh (IOC)."],
    ["Kĩ năng nào quan trọng nhất với người lao động thời 4.0?", "Sáng tạo, tư duy phản biện, kĩ năng số và thích ứng", "Chỉ cần sức khoẻ và làm việc lặp lại", "Không cần học thêm sau khi tốt nghiệp", "Máy móc khó thay thế con người ở các việc cần sáng tạo và cảm xúc."],
    ["CMCN 4.0 tác động tới môi trường theo hai mặt nào?", "Giúp tiết kiệm tài nguyên nhưng tăng rác thải điện tử", "Chỉ có tác động tích cực tuyệt đối", "Không liên quan tới môi trường", "Công nghệ xanh và kinh tế tuần hoàn là hướng giảm mặt trái của 4.0."],
    ["Thương mại điện tử phát triển mạnh nhờ những công nghệ 4.0 nào?", "Internet, thanh toán số, logistics thông minh và dữ liệu", "Chỉ nhờ quảng cáo truyền hình", "Không cần hạ tầng giao vận", "Việt Nam là một trong những thị trường thương mại điện tử tăng trưởng nhanh ở Đông Nam Á."],
    ["Địa lí ứng dụng CMCN 4.0 qua công nghệ nào quen thuộc?", "GIS, viễn thám và bản đồ số trong quản lí lãnh thổ", "Chỉ dùng bản đồ giấy truyền thống", "Không ứng dụng công nghệ mới nào", "Dữ liệu vệ tinh giúp theo dõi rừng, lũ lụt và biến động sử dụng đất theo thời gian thực."],
    ["Xu hướng phát triển tiếp theo sau CMCN 4.0 được dự báo là gì?", "Xã hội 5.0 lấy con người làm trung tâm công nghệ", "Quay lại sản xuất thủ công hoàn toàn", "Ngừng mọi đổi mới công nghệ", "Nhật Bản là nước đề xuất khái niệm Xã hội 5.0 (Society 5.0)."],
    ["Học sinh cần chuẩn bị gì để thích ứng với CMCN 4.0?", "Học ngoại ngữ, tin học, tư duy sáng tạo và học suốt đời", "Chỉ cần chờ đợi công nghệ làm thay mọi việc", "Không cần thay đổi cách học", "Nền tảng khoa học – công nghệ vững giúp thế hệ trẻ nắm bắt cơ hội việc làm mới."]
  ];
  var dl11cd3P = [
    ["Trí tuệ nhân tạo (AI)", "Máy học và hỗ trợ ra quyết định"],
    ["Internet vạn vật (IoT)", "Kết nối thiết bị qua internet"],
    ["Dữ liệu lớn (Big Data)", "Xử lí khối dữ liệu khổng lồ"],
    ["Robot công nghiệp", "Tự động hoá dây chuyền sản xuất"],
    ["In 3D", "Tạo vật thể bằng cách đắp từng lớp"],
    ["Điện toán đám mây", "Lưu trữ và xử lí dữ liệu trực tuyến"]
  ];
  var DL11 = [
    TP("dl11-p1", "🌐", "Phần một: Một số vấn đề về kinh tế – xã hội thế giới", "Bài 1–5 • Nhóm nước phát triển/đang phát triển, toàn cầu hoá – khu vực hoá, tổ chức quốc tế, kinh tế tri thức", KP(dl11p1F, dl11p1P), KN(dl11p1F, dl11p1P, "Địa lí")),
    TP("dl11-mlt", "🌎", "Khu vực Mỹ La tinh", "Bài 6–8 • Tự nhiên, dân cư – xã hội, kinh tế Mỹ La tinh; Bra-xin", KP(dl11mltF, dl11mltP), KN(dl11mltF, dl11mltP, "Địa lí")),
    TP("dl11-eu", "🇪🇺", "Liên minh châu Âu (EU)", "Bài 9–10 • EU — liên kết kinh tế khu vực lớn; công nghiệp Đức", KP(dl11euF, dl11euP), KN(dl11euF, dl11euP, "Địa lí")),
    TP("dl11-dna", "🌏", "Khu vực Đông Nam Á", "Bài 11–14 • Tự nhiên, dân cư, kinh tế Đông Nam Á; ASEAN", KP(dl11dnaF, dl11dnaP), KN(dl11dnaF, dl11dnaP, "Địa lí")),
    TP("dl11-tna", "🛢️", "Khu vực Tây Nam Á", "Bài 15–17 • Tự nhiên, dân cư, kinh tế Tây Nam Á; vấn đề dầu khí", KP(dl11tnaF, dl11tnaP), KN(dl11tnaF, dl11tnaP, "Địa lí")),
    TP("dl11-hk", "🗽", "Hợp chúng quốc Hoa Kỳ", "Bài 18–19 • Tự nhiên, dân cư và kinh tế Hoa Kỳ", KP(dl11hkF, dl11hkP), KN(dl11hkF, dl11hkP, "Địa lí")),
    TP("dl11-nga", "🐻", "Liên bang Nga", "Bài 20–22 • Tự nhiên, dân cư, kinh tế Nga; công nghiệp khai thác dầu khí", KP(dl11ngaF, dl11ngaP), KN(dl11ngaF, dl11ngaP, "Địa lí")),
    TP("dl11-nb", "🗾", "Nhật Bản", "Bài 23–25 • Tự nhiên, dân cư, kinh tế Nhật Bản; kinh tế đối ngoại", KP(dl11nbF, dl11nbP), KN(dl11nbF, dl11nbP, "Địa lí")),
    TP("dl11-tq", "🏮", "Cộng hoà nhân dân Trung Hoa (Trung Quốc)", "Bài 26–28 • Tự nhiên, dân cư, kinh tế Trung Quốc; vùng duyên hải", KP(dl11tqF, dl11tqP), KN(dl11tqF, dl11tqP, "Địa lí")),
    TP("dl11-ucnp", "🦘", "Ô-xtrây-li-a và Cộng hoà Nam Phi", "Bài 29–31 • Kinh tế Ô-xtrây-li-a; tự nhiên, dân cư và kinh tế Nam Phi", KP(dl11ucnpF, dl11ucnpP), KN(dl11ucnpF, dl11ucnpP, "Địa lí")),
    TP("dl11-cd1", "🌊", "Chuyên đề 11.1: Một số vấn đề về khu vực Đông Nam Á", "Chuyên đề Địa lí • Uỷ hội sông Mê Công (MRC), hợp tác hoà bình trong khai thác Biển Đông", KP(dl11cd1F, dl11cd1P), KN(dl11cd1F, dl11cd1P, "Địa lí")),
    TP("dl11-cd2", "✈️", "Chuyên đề 11.2: Một số vấn đề về du lịch thế giới", "Chuyên đề Địa lí • Tài nguyên du lịch, loại hình du lịch, xu hướng du lịch và Việt Nam", KP(dl11cd2F, dl11cd2P), KN(dl11cd2F, dl11cd2P, "Địa lí")),
    TP("dl11-cd3", "🤖", "Chuyên đề 11.3: Cuộc cách mạng công nghiệp lần thứ tư (4.0)", "Chuyên đề Địa lí • Nội dung, tác động và xu hướng của CMCN 4.0", KP(dl11cd3F, dl11cd3P), KN(dl11cd3F, dl11cd3P, "Địa lí"))
  ];
  /* ==================================================================
     GIÁO DỤC KINH TẾ VÀ PHÁP LUẬT 11 — Kết nối tri thức
     ================================================================== */
  var kt11t1F = [
    ["Cạnh tranh trong kinh tế thị trường là gì?", "Sự ganh đua giữa các chủ thể để giành lợi thế", "Sự hợp tác chia đều lợi nhuận giữa các hãng", "Hoạt động làm từ thiện của các doanh nghiệp", "Cạnh tranh diễn ra giữa người bán với người bán, người mua với người mua và giữa người bán với người mua."],
    ["Cạnh tranh xuất hiện trong kinh tế thị trường do nguyên nhân nào?", "Các chủ thể có điều kiện sản xuất, lợi ích khác nhau", "Do Nhà nước bắt buộc mọi người phải thi đua", "Do mọi chủ thể có điều kiện hoàn toàn giống nhau", "Sự khác nhau về điều kiện sản xuất và lợi ích kinh tế là gốc rễ làm nảy sinh cạnh tranh."],
    ["Mục đích chính của cạnh tranh đối với người sản xuất, kinh doanh là gì?", "Giành thị trường, khách hàng và lợi nhuận cao hơn", "Chia sẻ bí mật kinh doanh cho đối thủ", "Làm giảm chất lượng hàng hoá của mình", "Ai giành được lợi thế về giá, chất lượng và thị phần thì thu được lợi nhuận cao hơn."],
    ["Cạnh tranh lành mạnh được hiểu là cạnh tranh thế nào?", "Đúng pháp luật và đạo đức, bằng chất lượng, giá cả", "Dùng mọi thủ đoạn miễn là thắng đối thủ", "Chỉ cần không bị cơ quan chức năng phát hiện", "Cạnh tranh lành mạnh thúc đẩy sản xuất phát triển và bảo vệ người tiêu dùng."],
    ["Hành vi nào sau đây là cạnh tranh không lành mạnh?", "Gièm pha doanh nghiệp khác để giành khách hàng", "Cải tiến mẫu mã để thu hút người mua", "Giảm giá thành nhờ đổi mới công nghệ", "Quảng cáo sai sự thật, bán phá giá trái phép, xâm phạm bí mật kinh doanh đều bị pháp luật cấm."],
    ["Một cửa hàng tung tin đồn đối thủ bán hàng giả để kéo khách về phía mình. Hành vi này thuộc loại cạnh tranh nào?", "Cạnh tranh không lành mạnh, bị pháp luật nghiêm cấm", "Cạnh tranh lành mạnh bằng chất lượng", "Hoạt động quảng cáo thông thường", "Gièm pha doanh nghiệp khác là hành vi cạnh tranh không lành mạnh theo Luật Cạnh tranh."],
    ["Cung hàng hoá trên thị trường được hiểu là gì?", "Lượng hàng người bán sẵn sàng bán ở mỗi mức giá", "Lượng hàng người mua sẵn sàng mua ở mỗi mức giá", "Toàn bộ hàng tồn kho trong các doanh nghiệp", "Cung gắn với khả năng và sự sẵn sàng bán của nhà sản xuất, kinh doanh tại mỗi mức giá."],
    ["Cầu hàng hoá trên thị trường được hiểu là gì?", "Lượng hàng người mua sẵn sàng mua ở mỗi mức giá", "Lượng hàng người bán sẵn sàng bán ở mỗi mức giá", "Mọi nhu cầu tự nhiên dù không có khả năng trả tiền", "Cầu là nhu cầu có khả năng thanh toán, thể hiện qua lượng hàng người mua sẵn sàng mua ở mỗi mức giá."],
    ["Nội dung cơ bản của quy luật cung – cầu là gì?", "Cung và cầu tác động lẫn nhau, điều tiết giá cả", "Giá cả chỉ do người bán tuỳ ý quyết định", "Cung và cầu không liên quan gì tới nhau", "Giá cả thị trường dao động quanh giá trị hàng hoá dưới tác động của quan hệ cung – cầu."],
    ["Khi cung lớn hơn cầu trên thị trường, giá cả có xu hướng thế nào?", "Giá cả giảm, sản xuất có xu hướng thu hẹp", "Giá cả tăng mạnh", "Giá cả không thay đổi gì", "Hàng hoá ế thừa khiến người bán phải hạ giá để bán được hàng."],
    ["Khi cầu lớn hơn cung trên thị trường, giá cả có xu hướng thế nào?", "Giá cả tăng, sản xuất có xu hướng mở rộng", "Giá cả giảm xuống", "Người bán phải ngừng sản xuất", "Hàng khan hiếm, người mua tranh nhau mua nên giá bị đẩy lên."],
    ["Giá cân bằng trên thị trường hình thành khi nào?", "Khi lượng cung bằng lượng cầu tại một mức giá", "Khi người bán đặt mức giá cao nhất có thể", "Khi Nhà nước ấn định mọi mức giá bán", "Tại giá cân bằng, lượng hàng người bán muốn bán vừa bằng lượng hàng người mua muốn mua."],
    ["Theo quy luật cầu, khi giá của một hàng hoá tăng (các yếu tố khác không đổi) thì lượng cầu thế nào?", "Lượng cầu giảm xuống", "Lượng cầu tăng lên", "Lượng cầu không thay đổi", "Giá và lượng cầu vận động ngược chiều nhau; thu nhập, thị hiếu là các yếu tố khác làm dịch chuyển cầu."],
    ["Thu nhập của người tiêu dùng tăng lên thường làm cầu về hàng hoá thông thường thay đổi thế nào?", "Cầu tăng lên", "Cầu giảm mạnh", "Cầu biến mất hoàn toàn", "Có thêm khả năng thanh toán, người tiêu dùng mua nhiều hơn và đòi hỏi cao hơn về chất lượng."],
    ["Doanh nghiệp ứng dụng công nghệ mới làm chi phí sản xuất giảm thì cung hàng hoá thay đổi thế nào?", "Cung tăng lên", "Cung giảm xuống", "Cung không thay đổi", "Chi phí giảm, lợi nhuận ở mỗi mức giá cao hơn nên nhà sản xuất muốn bán nhiều hơn."],
    ["Giá xăng tăng cao khiến nhiều người chuyển sang xe điện. Cầu xe điện thay đổi thế nào và vì sao?", "Cầu tăng, vì xe điện là hàng thay thế xe xăng", "Cầu giảm, vì xe điện là hàng bổ sung", "Cầu không đổi, giá xăng không liên quan", "Giá của hàng hoá thay thế tăng làm cầu về hàng hoá được xét tăng lên."],
    ["Vào dịp Tết, nhu cầu hoa đào, hoa mai tăng mạnh so với ngày thường. Đây là biểu hiện của yếu tố nào tác động tới cầu?", "Thị hiếu và phong tục theo mùa vụ", "Công nghệ sản xuất thay đổi", "Số lượng nhà sản xuất giảm", "Cầu còn chịu tác động của thị hiếu, thu nhập, giá hàng liên quan và kì vọng của người mua."],
    ["Năm nay lúa được mùa lớn, cung vượt xa cầu nên giá lúa giảm, nông dân thu nhập thấp. Hiện tượng này thường được gọi là gì?", "Được mùa mất giá", "Được mùa được giá", "Khủng hoảng thừa do độc quyền", "Khi cung tăng mạnh mà cầu ít đổi, giá giảm là tác động trực tiếp của quy luật cung – cầu."],
    ["Cạnh tranh giữa những người mua xuất hiện trong điều kiện nào?", "Khi hàng hoá khan hiếm, cung nhỏ hơn cầu", "Khi hàng hoá ế thừa, cung lớn hơn cầu", "Khi thị trường không còn người bán", "Người mua tranh mua, chấp nhận giá cao hơn để có được hàng hoá khan hiếm."],
    ["Cạnh tranh mang lại lợi ích gì cho người tiêu dùng?", "Hàng phong phú, chất lượng tốt, giá hợp lí hơn", "Người tiêu dùng không còn quyền lựa chọn", "Giá cả mọi hàng hoá đều tăng lên", "Để thắng cạnh tranh, doanh nghiệp phải không ngừng cải tiến, phục vụ người mua tốt hơn."],
    ["Mặt trái của cạnh tranh trong kinh tế thị trường là gì?", "Doanh nghiệp yếu bị thôn tính, nguy cơ độc quyền", "Mọi doanh nghiệp đều phát triển như nhau", "Không còn ai muốn sản xuất kinh doanh", "Cạnh tranh quyết liệt cũng có thể dẫn tới lãng phí nguồn lực và ô nhiễm môi trường."],
    ["Nhà nước điều tiết cạnh tranh bằng biện pháp chủ yếu nào?", "Ban hành và thực thi pháp luật về cạnh tranh", "Cấm mọi hoạt động cạnh tranh trên thị trường", "Trực tiếp quyết định giá bán của mọi hàng hoá", "Luật Cạnh tranh bảo vệ cạnh tranh lành mạnh và xử lí hành vi hạn chế cạnh tranh."],
    ["Số lượng doanh nghiệp cùng sản xuất một mặt hàng tăng lên thì cung của mặt hàng đó thay đổi thế nào?", "Cung tăng lên", "Cung giảm xuống", "Cung bị triệt tiêu", "Số lượng nhà sản xuất là một yếu tố quan trọng tác động tới cung hàng hoá."],
    ["Nếu người tiêu dùng kì vọng giá hàng hoá sẽ tăng trong thời gian tới thì cầu hiện tại thường thế nào?", "Cầu hiện tại tăng do mua tích trữ trước", "Cầu hiện tại giảm hẳn", "Cầu hiện tại không thay đổi", "Kì vọng về giá và thu nhập tương lai là yếu tố làm thay đổi cầu ngay ở hiện tại."]
  ];
  var kt11t1P = [
    ["Cạnh tranh lành mạnh", "Đúng pháp luật, nâng cao chất lượng"],
    ["Cạnh tranh không lành mạnh", "Gian lận, gièm pha, phá giá trái phép"],
    ["Cung", "Lượng hàng sẵn sàng bán theo giá"],
    ["Cầu", "Lượng hàng sẵn sàng mua theo giá"],
    ["Cung lớn hơn cầu", "Giá cả có xu hướng giảm"],
    ["Cầu lớn hơn cung", "Giá cả có xu hướng tăng"],
    ["Giá cân bằng", "Mức giá khi cung bằng cầu"]
  ];
  var kt11t2F = [
    ["Lạm phát là hiện tượng kinh tế như thế nào?", "Giá cả tăng liên tục làm tiền tệ mất giá", "Giá cả giảm liên tục trong thời gian dài", "Tiền tệ tăng giá so với hàng hoá", "Lạm phát biểu hiện ở mức giá chung tăng lên liên tục và sức mua của đồng tiền giảm xuống."],
    ["Lạm phát vừa phải có mức tăng giá hằng năm khoảng bao nhiêu?", "Dưới 10% mỗi năm", "Từ 10% đến dưới 100% mỗi năm", "Hàng trăm phần trăm mỗi năm", "Lạm phát vừa phải ở mức thấp, có thể dự đoán được nên ít gây xáo trộn nền kinh tế."],
    ["Lạm phát phi mã có đặc điểm nào?", "Tỉ lệ tăng giá ở mức hai, ba con số mỗi năm", "Tỉ lệ tăng giá dưới 10% mỗi năm", "Giá cả hoàn toàn ổn định", "Lạm phát phi mã làm tiền mất giá nhanh, gây bất ổn kinh tế – xã hội nghiêm trọng."],
    ["Siêu lạm phát là tình trạng như thế nào?", "Giá tăng cực cao, tiền mất giá nghiêm trọng", "Giá tăng nhẹ dưới 5% mỗi năm", "Đồng tiền lên giá rất mạnh", "Siêu lạm phát khiến người dân mất niềm tin vào đồng tiền và tìm giữ tài sản, ngoại tệ mạnh."],
    ["Lạm phát do cầu kéo xuất hiện khi nào?", "Khi tổng cầu tăng nhanh vượt tổng cung hàng hoá", "Khi chi phí sản xuất tăng mạnh", "Khi kinh tế suy thoái, cầu sụt giảm", "Cầu tăng mạnh trong khi cung không tăng kịp làm “quá nhiều tiền đuổi theo quá ít hàng”."],
    ["Lạm phát do chi phí đẩy xuất hiện khi nào?", "Khi chi phí sản xuất tăng đẩy giá bán tăng", "Khi người dân giảm hẳn chi tiêu", "Khi cung tiền giảm mạnh", "Giá nguyên liệu, tiền lương tăng làm chi phí tăng, doanh nghiệp phải nâng giá bán."],
    ["Lạm phát do nguyên nhân tiền tệ xảy ra khi nào?", "Khi lượng tiền lưu thông tăng quá mức cần thiết", "Khi lượng tiền lưu thông giảm mạnh", "Khi ngân sách nhà nước thặng dư lớn", "Cung tiền tăng nhanh hơn nhu cầu lưu thông thực tế làm đồng tiền mất giá."],
    ["Lạm phát gây tác hại trực tiếp nào cho người có thu nhập cố định?", "Thu nhập thực tế giảm, đời sống khó khăn hơn", "Thu nhập thực tế tự động tăng theo giá", "Không ảnh hưởng gì tới đời sống", "Tiền lương danh nghĩa không đổi nhưng mua được ít hàng hoá hơn trước."],
    ["Giá mọi mặt hàng thiết yếu tăng liên tục nhiều tháng trong khi lương của anh T không đổi, gia đình anh phải cắt giảm chi tiêu. Anh T đang chịu tác động của hiện tượng nào?", "Lạm phát làm giảm sức mua của thu nhập", "Thất nghiệp chu kì", "Cạnh tranh không lành mạnh", "Đây là tác hại điển hình của lạm phát đối với người lao động hưởng lương cố định."],
    ["Biện pháp cơ bản để kiềm chế lạm phát là gì?", "Kiểm soát cung tiền và tăng cung hàng hoá", "In thêm thật nhiều tiền để bù giá", "Khuyến khích người dân vay tiêu dùng tối đa", "Kiềm chế lạm phát cần kết hợp chính sách tiền tệ thận trọng với đẩy mạnh sản xuất."],
    ["Cơ quan nào điều hành chính sách tiền tệ nhằm ổn định giá trị đồng tiền ở Việt Nam?", "Ngân hàng Nhà nước Việt Nam", "Bộ Giáo dục và Đào tạo", "Toà án nhân dân tối cao", "Ngân hàng Nhà nước dùng các công cụ như lãi suất, dự trữ bắt buộc để điều tiết lượng tiền."],
    ["Thất nghiệp được hiểu là tình trạng như thế nào?", "Người có khả năng, nhu cầu làm việc nhưng chưa có việc", "Người lao động đang nghỉ phép theo chế độ", "Người đã hết tuổi lao động và nghỉ hưu", "Thất nghiệp chỉ tính với người trong độ tuổi lao động, có khả năng và đang tìm việc làm."],
    ["Tỉ lệ thất nghiệp được tính bằng cách nào?", "Số người thất nghiệp chia tổng lực lượng lao động", "Số người thất nghiệp chia tổng dân số cả nước", "Số việc làm mới chia tổng số doanh nghiệp", "Lực lượng lao động gồm người có việc làm và người thất nghiệp đang tìm việc."],
    ["Thất nghiệp tạm thời (thất nghiệp ma sát) là gì?", "Thất nghiệp trong thời gian chuyển việc, chờ việc phù hợp", "Thất nghiệp do kinh tế suy thoái kéo dài", "Thất nghiệp do lao động thiếu hẳn kĩ năng", "Sinh viên mới tốt nghiệp đang tìm việc là ví dụ điển hình của thất nghiệp tạm thời."],
    ["Thất nghiệp cơ cấu xuất hiện khi nào?", "Khi kĩ năng của lao động không khớp nhu cầu tuyển dụng", "Khi người lao động nghỉ giữa hai công việc", "Khi kinh tế tăng trưởng quá nóng", "Cơ cấu kinh tế thay đổi làm một số ngành thừa lao động, ngành khác lại thiếu người."],
    ["Thất nghiệp chu kì xuất hiện trong giai đoạn nào của nền kinh tế?", "Khi kinh tế suy thoái, tổng cầu sụt giảm", "Khi kinh tế tăng trưởng mạnh, cầu lao động cao", "Khi người lao động tự nguyện nghỉ việc", "Suy thoái làm doanh nghiệp cắt giảm sản xuất và sa thải lao động hàng loạt."],
    ["Thất nghiệp tự nhiên của nền kinh tế gồm những loại nào?", "Thất nghiệp tạm thời và thất nghiệp cơ cấu", "Chỉ gồm thất nghiệp chu kì", "Chỉ gồm thất nghiệp do suy thoái", "Ngay cả khi kinh tế bình thường vẫn tồn tại một mức thất nghiệp tự nhiên nhất định."],
    ["Bạn M vừa tốt nghiệp, đang nộp hồ sơ và chờ phỏng vấn ở vài công ty. Tình trạng của M thuộc loại thất nghiệp nào?", "Thất nghiệp tạm thời", "Thất nghiệp chu kì", "Thất nghiệp cơ cấu", "Khoảng thời gian tìm và chờ việc phù hợp sau khi ra trường là thất nghiệp tạm thời."],
    ["Nhiều thợ may mất việc khi nhà máy chuyển sang dây chuyền tự động, trong khi nhà máy đang cần kĩ thuật viên vận hành máy mà không tuyển được. Đây là loại thất nghiệp nào?", "Thất nghiệp cơ cấu", "Thất nghiệp tạm thời", "Thất nghiệp chu kì", "Cung lao động không khớp cầu lao động về kĩ năng gây ra thất nghiệp cơ cấu."],
    ["Kinh tế suy thoái, đơn hàng giảm mạnh, công ty P phải cho 200 công nhân nghỉ việc. Công nhân P thuộc loại thất nghiệp nào?", "Thất nghiệp chu kì", "Thất nghiệp tạm thời", "Thất nghiệp tự nhiên", "Thất nghiệp chu kì biến động theo chu kì kinh doanh của nền kinh tế."],
    ["Thất nghiệp kéo dài gây tác hại nào cho bản thân người lao động?", "Mất thu nhập, kĩ năng mai một, tâm lí tự ti", "Kĩ năng nghề nghiệp tự nâng cao", "Thu nhập tăng nhờ trợ cấp cao hơn lương", "Thất nghiệp dài hạn còn ảnh hưởng sức khoẻ và hạnh phúc gia đình người lao động."],
    ["Thất nghiệp cao gây tác hại nào cho xã hội?", "Lãng phí nguồn lực, tăng tệ nạn và bất ổn", "Tiết kiệm được nguồn lực lao động", "Làm cho sản lượng quốc gia tăng lên", "Sản lượng tiềm năng bị mất đi không lấy lại được là tổn thất lớn của thất nghiệp."],
    ["Giải pháp nào giúp giảm thất nghiệp cơ cấu hiệu quả?", "Đào tạo lại, bồi dưỡng kĩ năng mới cho lao động", "Cấm doanh nghiệp ứng dụng công nghệ mới", "Giảm số lượng trường dạy nghề", "Đào tạo gắn với nhu cầu thị trường lao động giúp lao động chuyển đổi nghề thành công."],
    ["Để giảm thất nghiệp chu kì, Nhà nước thường thực hiện chính sách nào?", "Kích thích tổng cầu, hỗ trợ doanh nghiệp phục hồi", "Thắt chặt chi tiêu công tối đa", "Nâng lãi suất thật cao để giảm đầu tư", "Chính sách tài khoá và tiền tệ mở rộng giúp kinh tế phục hồi, tạo thêm việc làm."]
  ];
  var kt11t2P = [
    ["Lạm phát vừa phải", "Tăng giá dưới 10% một năm"],
    ["Lạm phát phi mã", "Tăng giá hai, ba con số một năm"],
    ["Siêu lạm phát", "Tăng giá rất cao, tiền mất giá nặng"],
    ["Thất nghiệp tạm thời", "Thất nghiệp khi chuyển, chờ việc"],
    ["Thất nghiệp cơ cấu", "Lệch kĩ năng so với nhu cầu tuyển dụng"],
    ["Thất nghiệp chu kì", "Do kinh tế suy thoái, cầu giảm"],
    ["Thất nghiệp tự nhiên", "Gồm thất nghiệp tạm thời và cơ cấu"]
  ];
  var kt11t3F = [
    ["Thị trường lao động là gì?", "Nơi diễn ra mua bán sức lao động giữa các bên", "Nơi mua bán máy móc, nhà xưởng", "Nơi nhà nước phân công việc làm bắt buộc", "Thị trường lao động kết nối người lao động và người sử dụng lao động qua quan hệ thuê mướn, tiền lương."],
    ["Chủ thể cung trên thị trường lao động là ai?", "Người lao động có khả năng và nhu cầu làm việc", "Doanh nghiệp có nhu cầu tuyển dụng", "Cơ quan giới thiệu việc làm", "Cung lao động là tổng số người sẵn sàng làm việc ở các mức tiền lương khác nhau."],
    ["Chủ thể cầu trên thị trường lao động là ai?", "Người sử dụng lao động cần thuê lao động", "Người lao động đang tìm việc", "Sinh viên chưa tốt nghiệp", "Cầu lao động phát sinh từ nhu cầu sản xuất, kinh doanh của doanh nghiệp, tổ chức."],
    ["Giá cả của hàng hoá sức lao động trên thị trường lao động là gì?", "Tiền lương, tiền công trả cho người lao động", "Giá thuê mặt bằng sản xuất", "Lợi nhuận của doanh nghiệp", "Tiền lương hình thành qua thoả thuận, không thấp hơn mức lương tối thiểu do Nhà nước quy định."],
    ["Chất lượng lao động được đánh giá qua những yếu tố nào?", "Trình độ học vấn, kĩ năng, sức khoẻ, kỉ luật", "Chỉ qua số năm làm việc", "Chỉ qua ngoại hình", "Chất lượng lao động quyết định năng suất và khả năng cạnh tranh của nền kinh tế."],
    ["Xu hướng việc làm hiện nay có đặc điểm gì nổi bật?", "Tăng việc làm công nghệ số, dịch vụ; giảm lao động giản đơn", "Mọi việc làm đều quay về nông nghiệp", "Việc làm không thay đổi theo công nghệ", "Cách mạng công nghiệp 4.0 tạo ra nhiều nghề mới đồng thời làm mất đi một số nghề truyền thống."],
    ["Người lao động cần làm gì để thích ứng với xu hướng việc làm mới?", "Học tập suốt đời, nâng cao kĩ năng số và ngoại ngữ", "Chỉ học một nghề và không học thêm nữa", "Chờ doanh nghiệp tự đào tạo toàn bộ", "Kĩ năng mềm, tư duy sáng tạo và khả năng thích ứng ngày càng được nhà tuyển dụng coi trọng."],
    ["Thị trường lao động vận hành giúp giải quyết vấn đề gì?", "Kết nối cung – cầu lao động, tạo việc làm, giảm thất nghiệp", "Quyết định giá cả mọi hàng hoá tiêu dùng", "Ấn định lợi nhuận cho doanh nghiệp", "Sàn giao dịch việc làm, trung tâm dịch vụ việc làm là cầu nối quan trọng trên thị trường này."],
    ["Anh K tốt nghiệp ngành cơ khí nhưng vùng quê anh không có nhà máy, anh phải lên thành phố tìm việc. Đây là biểu hiện của vấn đề gì?", "Cung – cầu lao động mất cân đối theo vùng, ngành", "Thất nghiệp chu kì do suy thoái", "Lao động đã có việc làm ổn định", "Mất cân đối cung – cầu lao động theo ngành nghề, trình độ và vùng miền là thực trạng cần khắc phục."],
    ["Doanh nghiệp tuyển kĩ sư phần mềm với lương cao nhưng ít người đáp ứng được. Nguyên nhân chính là gì?", "Thiếu lao động có trình độ, kĩ năng phù hợp", "Thừa lao động phổ thông quá nhiều", "Người lao động không muốn làm việc", "Đào tạo chưa gắn với nhu cầu thực tế của thị trường lao động gây thiếu hụt lao động chất lượng cao."],
    ["Giải pháp nào giúp nâng cao chất lượng nguồn lao động?", "Đổi mới giáo dục, đào tạo nghề gắn với nhu cầu thị trường", "Giảm đầu tư cho đào tạo nghề", "Chỉ tuyển lao động nước ngoài", "Đào tạo lại, bồi dưỡng thường xuyên giúp lao động đáp ứng yêu cầu công việc mới."],
    ["Vai trò của Nhà nước đối với thị trường lao động là gì?", "Hoàn thiện pháp luật, hỗ trợ tạo việc làm, bảo vệ lao động", "Trực tiếp làm thay mọi doanh nghiệp tuyển dụng", "Không can thiệp vào quan hệ lao động", "Nhà nước còn tổ chức dịch vụ việc làm công và thực hiện chính sách bảo hiểm thất nghiệp."],
    ["Bảo hiểm thất nghiệp có tác dụng gì với người lao động?", "Hỗ trợ thu nhập, học nghề và tìm việc khi mất việc", "Bảo đảm có việc làm suốt đời", "Thay thế hoàn toàn tiền lương", "Người lao động tham gia bảo hiểm thất nghiệp được hưởng trợ cấp khi đủ điều kiện theo luật."],
    ["Việc làm được hiểu là gì?", "Hoạt động lao động tạo thu nhập không bị luật cấm", "Mọi hoạt động kể cả vi phạm pháp luật", "Chỉ là công việc trong cơ quan nhà nước", "Mọi công dân có quyền làm việc, lựa chọn nghề nghiệp và nơi làm việc theo Hiến pháp."],
    ["Học sinh lựa chọn nghề nghiệp cần căn cứ vào những yếu tố nào?", "Năng lực, sở thích bản thân và nhu cầu xã hội", "Chỉ chọn nghề đang được nhiều người theo đuổi", "Chỉ chọn nghề có thu nhập cao nhất", "Chọn nghề phù hợp giúp phát huy thế mạnh và đáp ứng nhu cầu lao động của xã hội."],
    ["Lao động qua đào tạo có lợi thế gì trên thị trường lao động?", "Dễ tìm việc, thu nhập cao và ổn định hơn", "Không cần phỏng vấn tuyển dụng", "Được miễn mọi nghĩa vụ lao động", "Tỉ lệ lao động qua đào tạo có bằng, chứng chỉ là chỉ tiêu quan trọng đánh giá chất lượng lao động."],
    ["Chị H bị mất việc do công ty giải thể, chị đến trung tâm dịch vụ việc làm để được tư vấn và giới thiệu việc mới. Trung tâm đã thực hiện vai trò gì?", "Kết nối cung – cầu trên thị trường lao động", "Trực tiếp sản xuất hàng hoá", "Thu thuế của người lao động", "Trung tâm dịch vụ việc làm tư vấn, giới thiệu việc làm và cung cấp thông tin thị trường lao động."],
    ["Kĩ năng nào ngày càng quan trọng với mọi ngành nghề trong thời đại số?", "Kĩ năng sử dụng công nghệ thông tin và dữ liệu", "Kĩ năng ghi chép hoàn toàn bằng tay", "Kĩ năng tránh mọi thiết bị công nghệ", "Chuyển đổi số diễn ra ở hầu hết lĩnh vực nên lao động cần thành thạo công cụ số cơ bản."],
    ["Nguyên nhân nào khiến một bộ phận thanh niên thất nghiệp dù doanh nghiệp vẫn tuyển người?", "Ngại khó, kén chọn việc và thiếu kĩ năng thực tế", "Doanh nghiệp không còn nhu cầu lao động", "Thị trường lao động đã đóng cửa", "Bên cạnh thiếu kĩ năng, tâm lí kén việc, chờ việc lương cao cũng làm gia tăng thất nghiệp ở thanh niên."],
    ["Chính sách nào hỗ trợ người lao động ở vùng khó khăn tìm việc?", "Hỗ trợ đào tạo nghề, vay vốn tạo việc làm", "Buộc lao động phải ở lại quê hương", "Cấm lao động di chuyển nơi làm việc", "Chương trình mục tiêu quốc gia về việc làm hỗ trợ lao động nông thôn, vùng sâu, vùng xa."],
    ["Quan hệ lao động trên thị trường được xác lập chủ yếu bằng hình thức nào?", "Hợp đồng lao động giữa hai bên tự nguyện, bình đẳng", "Mệnh lệnh hành chính của cơ quan nhà nước", "Thoả thuận miệng không có giá trị gì", "Hợp đồng lao động ghi rõ công việc, tiền lương, thời giờ làm việc và quyền, nghĩa vụ các bên."],
    ["Xu hướng làm việc từ xa, việc làm trực tuyến phát triển nhờ yếu tố nào?", "Công nghệ thông tin và internet phát triển", "Do lao động không muốn đến nơi làm việc", "Do doanh nghiệp giảm hết nhu cầu tuyển dụng", "Việc làm linh hoạt, kinh tế chia sẻ và kinh tế nền tảng số là xu hướng nổi bật hiện nay."],
    ["Để giảm mất cân đối cung – cầu lao động, ngành giáo dục cần làm gì?", "Định hướng nghề, phân luồng và gắn đào tạo với doanh nghiệp", "Đào tạo thật nhiều một ngành đang thừa lao động", "Không cần dự báo nhu cầu lao động", "Dự báo nhu cầu nhân lực giúp cơ sở đào tạo điều chỉnh quy mô, ngành nghề đào tạo phù hợp."],
    ["Người lao động có quyền gì trên thị trường lao động?", "Tự do lựa chọn việc làm, nơi làm việc, không bị phân biệt", "Bắt buộc làm một nghề suốt đời", "Chỉ được làm việc tại nơi cư trú", "Hiến pháp quy định công dân có quyền làm việc, lựa chọn nghề nghiệp, việc làm và nơi làm việc."]
  ];
  var kt11t3P = [
    ["Cung lao động", "Người lao động sẵn sàng làm việc"],
    ["Cầu lao động", "Nhu cầu thuê lao động của doanh nghiệp"],
    ["Giá cả sức lao động", "Tiền lương, tiền công"],
    ["Chất lượng lao động", "Trình độ, kĩ năng, sức khoẻ, kỉ luật"],
    ["Mất cân đối cung – cầu lao động", "Thừa nghề này, thiếu nghề khác"],
    ["Bảo hiểm thất nghiệp", "Hỗ trợ khi lao động mất việc làm"],
    ["Đào tạo gắn thị trường", "Học theo nhu cầu tuyển dụng thực tế"]
  ];
  var kt11t4F = [
    ["Ý tưởng kinh doanh là gì?", "Suy nghĩ mới về sản phẩm, cách bán đáp ứng nhu cầu", "Khoản tiền dùng để mở cửa hàng", "Giấy phép đăng kí kinh doanh", "Ý tưởng kinh doanh tốt xuất phát từ nhu cầu chưa được đáp ứng tốt của khách hàng."],
    ["Cơ hội kinh doanh là gì?", "Thuận lợi về nhu cầu, thị trường để kinh doanh có lãi", "Mọi ý nghĩ thoáng qua về buôn bán", "Sự may rủi không thể nhận biết trước", "Cơ hội kinh doanh xuất hiện khi nhu cầu thị trường lớn, ít đối thủ và nguồn lực phù hợp."],
    ["Ý tưởng kinh doanh khác cơ hội kinh doanh ở điểm nào?", "Ý tưởng là suy nghĩ; cơ hội là điều kiện thuận lợi thực tế", "Hai khái niệm hoàn toàn giống nhau", "Cơ hội có trước mọi ý tưởng", "Có ý tưởng chưa chắc đã có cơ hội; cần đánh giá tính khả thi và thời điểm thị trường."],
    ["Nguồn hình thành ý tưởng kinh doanh có thể đến từ đâu?", "Quan sát nhu cầu, khó khăn và xu hướng của khách hàng", "Sao chép nguyên vẹn mô hình của đối thủ", "Chờ người khác gợi ý hoàn toàn", "Kinh nghiệm bản thân, sở thích và sự thay đổi công nghệ cũng là nguồn ý tưởng quan trọng."],
    ["Thấy nhiều bạn trong trường phải xếp hàng lâu mua đồ ăn sáng, bạn N mở quầy bánh mì nhanh gần cổng trường. Ý tưởng của N xuất phát từ đâu?", "Nhu cầu có thật chưa được phục vụ tốt của khách hàng", "Bắt chước một cửa hàng ở tỉnh khác", "Được người khác giao việc kinh doanh", "Nhận diện vấn đề của khách hàng là cách tạo ý tưởng kinh doanh hiệu quả và thực tế."],
    ["Khi đánh giá một cơ hội kinh doanh cần xem xét yếu tố nào?", "Nhu cầu thị trường, đối thủ, vốn và rủi ro", "Chỉ xem cảm giác thích hay không", "Chỉ xem bạn bè có ủng hộ không", "Phân tích điểm mạnh, điểm yếu, cơ hội và thách thức giúp đánh giá cơ hội toàn diện."],
    ["Người kinh doanh cần có năng lực cơ bản nào?", "Năng lực tổ chức, quản lí và nắm bắt cơ hội thị trường", "Chỉ cần có thật nhiều vốn ban đầu", "Chỉ cần có quan hệ rộng", "Năng lực chuyên môn, tài chính và quản trị nhân sự cũng rất cần thiết cho người kinh doanh."],
    ["Phẩm chất quan trọng của người kinh doanh là gì?", "Chịu khó, sáng tạo, dám chấp nhận rủi ro có tính toán", "Liều lĩnh bất chấp mọi rủi ro", "Bảo thủ, không thay đổi cách làm", "Người kinh doanh giỏi còn cần chữ tín, đạo đức và trách nhiệm với khách hàng, xã hội."],
    ["Vì sao người kinh doanh phải có năng lực quản lí tài chính?", "Để sử dụng vốn hiệu quả, tránh thua lỗ, phá sản", "Để không cần nộp thuế cho Nhà nước", "Để giữ toàn bộ tiền mặt tại nhà", "Quản lí dòng tiền, chi phí và giá bán quyết định sự sống còn của hoạt động kinh doanh."],
    ["Một cơ hội kinh doanh tốt thường có đặc điểm nào?", "Nhu cầu lớn, bền vững và phù hợp năng lực chủ thể", "Chỉ xuất hiện trong thời gian rất ngắn", "Ai làm cũng chắc chắn thành công", "Cơ hội tốt còn phải đúng thời điểm và không vi phạm pháp luật."],
    ["Bạn T mở dịch vụ sửa điện thoại nhưng không biết nghề, phải thuê thợ ngoài với chi phí cao. T đang thiếu yếu tố nào?", "Năng lực chuyên môn về lĩnh vực kinh doanh", "Ý tưởng kinh doanh mới lạ", "Nhu cầu của thị trường", "Hiểu biết về sản phẩm, dịch vụ mình kinh doanh là năng lực nền tảng của người kinh doanh."],
    ["Khi thị trường xuất hiện xu hướng tiêu dùng xanh, doanh nghiệp nhanh nhạy sẽ làm gì?", "Phát triển sản phẩm thân thiện môi trường đón đầu nhu cầu", "Tiếp tục sản xuất sản phẩm gây ô nhiễm", "Chờ đối thủ làm trước rồi mới tính", "Nắm bắt xu hướng thị trường kịp thời là biểu hiện của năng lực kinh doanh nhạy bén."],
    ["Rủi ro trong kinh doanh được hiểu là gì?", "Khả năng xảy ra tổn thất do biến động ngoài dự kiến", "Chắc chắn sẽ thua lỗ khi kinh doanh", "Điều không bao giờ xảy ra với người giỏi", "Người kinh doanh cần dự phòng và biết quản trị rủi ro thay vì né tránh mọi rủi ro."],
    ["Để biến ý tưởng thành hoạt động kinh doanh cần bước tiếp theo nào?", "Lập kế hoạch kinh doanh và chuẩn bị nguồn lực", "Bán hàng ngay không cần chuẩn bị gì", "Vay thật nhiều tiền trước tiên", "Kế hoạch kinh doanh nêu rõ sản phẩm, khách hàng, vốn, chi phí và cách tổ chức thực hiện."],
    ["Năng lực giao tiếp, đàm phán giúp người kinh doanh điều gì?", "Thuyết phục khách hàng, đối tác và huy động nguồn lực", "Không cần thiết nếu sản phẩm tốt", "Chỉ dùng để tranh cãi với đối thủ", "Giao tiếp tốt cũng giúp xây dựng đội ngũ và giữ chân khách hàng lâu dài."],
    ["Vì sao người kinh doanh cần hiểu biết pháp luật?", "Để kinh doanh đúng luật, tránh vi phạm và tranh chấp", "Để tìm cách lách luật khi cần thiết", "Chỉ cần khi bị cơ quan kiểm tra", "Đăng kí kinh doanh, nộp thuế và bảo vệ người tiêu dùng là những quy định phải tuân thủ."],
    ["Một quán cà phê đông khách nhờ chất lượng ổn định, phục vụ tận tâm và không ngừng đổi mới món. Chủ quán thể hiện phẩm chất nào?", "Sáng tạo, lấy khách hàng làm trung tâm, giữ chữ tín", "May mắn hoàn toàn do vị trí quán đẹp", "Chỉ giỏi giảm giá so với đối thủ", "Phẩm chất và năng lực của người kinh doanh quyết định lớn tới thành công bền vững."],
    ["Cơ hội kinh doanh có thể bị mất đi khi nào?", "Khi chậm trễ, đối thủ chiếm trước thị trường", "Cơ hội không bao giờ mất đi", "Khi đã có ý tưởng trong đầu", "Tính thời điểm rất quan trọng: cơ hội chỉ có giá trị trong một khoảng thời gian nhất định."],
    ["Khi lựa chọn lĩnh vực kinh doanh, cần ưu tiên lĩnh vực thế nào?", "Phù hợp năng lực, sở trường và điều kiện bản thân", "Lĩnh vực người khác đang lãi lớn nhất", "Lĩnh vực càng xa lạ càng dễ thành công", "Kinh doanh lĩnh vực mình am hiểu giúp giảm rủi ro và tận dụng được lợi thế sẵn có."],
    ["Sáng tạo trong kinh doanh được thể hiện qua việc gì?", "Tạo sản phẩm mới, cách phục vụ và tiếp thị khác biệt", "Sao chép y hệt đối thủ thành công", "Chỉ thay đổi tên cửa hàng liên tục", "Sáng tạo tạo ra lợi thế cạnh tranh, giúp doanh nghiệp khác biệt trên thị trường."],
    ["Người kinh doanh thiếu chữ tín sẽ gặp hậu quả gì?", "Mất khách hàng, đối tác và khó tồn tại lâu dài", "Kinh doanh càng phát đạt hơn", "Không ảnh hưởng gì nếu giá rẻ", "Chữ tín là tài sản vô hình quý giá, xây dựng lâu dài nhưng có thể mất rất nhanh."],
    ["Phân tích đối thủ cạnh tranh giúp người kinh doanh điều gì?", "Hiểu điểm mạnh, yếu của đối thủ để tạo khác biệt", "Tìm cách nói xấu đối thủ với khách hàng", "Sao chép toàn bộ chiến lược của đối thủ", "Từ phân tích đối thủ, doanh nghiệp định vị sản phẩm và chính sách giá phù hợp."],
    ["Một start-up bán đồ ăn healthy khi phong trào sống khoẻ lan rộng. Yếu tố nào tạo nên cơ hội cho start-up này?", "Xu hướng tiêu dùng và nhu cầu thị trường tăng lên", "Do không còn đối thủ nào trên thị trường", "Do được miễn mọi chi phí thuê mặt bằng", "Thay đổi trong thị hiếu, lối sống của người tiêu dùng thường mở ra cơ hội kinh doanh mới."],
    ["Để nâng cao năng lực kinh doanh, học sinh có thể rèn luyện bằng cách nào?", "Học kinh tế, trải nghiệm dự án nhỏ, quan sát thực tế", "Chỉ đọc lí thuyết mà không thực hành", "Chờ tốt nghiệp đại học mới bắt đầu học", "Tham gia câu lạc bộ khởi nghiệp, hoạt động trải nghiệm giúp rèn năng lực kinh doanh sớm."]
  ];
  var kt11t4P = [
    ["Ý tưởng kinh doanh", "Suy nghĩ mới đáp ứng nhu cầu khách hàng"],
    ["Cơ hội kinh doanh", "Điều kiện thuận lợi để kinh doanh có lãi"],
    ["Năng lực chuyên môn", "Hiểu biết sâu về sản phẩm, lĩnh vực"],
    ["Năng lực quản lí tài chính", "Dùng vốn hiệu quả, kiểm soát chi phí"],
    ["Quản trị rủi ro", "Dự phòng tổn thất do biến động"],
    ["Chữ tín kinh doanh", "Giữ cam kết với khách hàng, đối tác"],
    ["Kế hoạch kinh doanh", "Bản dự kiến sản phẩm, vốn, cách thực hiện"]
  ];
  var kt11t5F = [
    ["Đạo đức kinh doanh là gì?", "Chuẩn mực đạo đức điều chỉnh hành vi trong kinh doanh", "Biện pháp để tăng lợi nhuận bằng mọi cách", "Quy định về thuế của Nhà nước", "Đạo đức kinh doanh thể hiện qua ứng xử với khách hàng, đối tác, người lao động và xã hội."],
    ["Biểu hiện nào thể hiện đạo đức kinh doanh?", "Trung thực về chất lượng, giá cả và nguồn gốc hàng hoá", "Quảng cáo sai sự thật để bán được nhiều hàng", "Cân thiếu cho khách hàng khi bán hàng", "Giữ chữ tín, không gian lận là biểu hiện cơ bản nhất của đạo đức kinh doanh."],
    ["Doanh nghiệp giữ chữ tín trong kinh doanh là doanh nghiệp thế nào?", "Thực hiện đúng cam kết về chất lượng, thời gian giao hàng", "Hứa thật nhiều nhưng làm tuỳ ý", "Chỉ giữ cam kết với khách hàng lớn", "Chữ tín giúp doanh nghiệp có khách hàng và đối tác lâu dài."],
    ["Hành vi nào vi phạm đạo đức kinh doanh?", "Sản xuất hàng giả, hàng kém chất lượng để thu lợi", "Cải tiến sản phẩm để phục vụ khách tốt hơn", "Công khai giá bán và thành phần sản phẩm", "Buôn bán hàng giả, hàng cấm vừa vi phạm đạo đức vừa vi phạm pháp luật."],
    ["Đạo đức kinh doanh với người lao động thể hiện ở việc gì?", "Trả lương công bằng, bảo đảm an toàn và tôn trọng lao động", "Kéo dài giờ làm không trả thêm lương", "Không đóng bảo hiểm cho người lao động", "Doanh nghiệp có đạo đức coi người lao động là vốn quý, không bóc lột hay phân biệt đối xử."],
    ["Đạo đức kinh doanh với môi trường thể hiện ở việc gì?", "Xử lí chất thải đúng quy định, sản xuất sạch hơn", "Xả thải chưa xử lí ra sông để giảm chi phí", "Khai thác tài nguyên bừa bãi", "Bảo vệ môi trường là trách nhiệm xã hội và đạo đức của doanh nghiệp hiện đại."],
    ["Một cửa hàng phát hiện lô sữa sắp hết hạn, chủ cửa hàng chủ động thu hồi và tiêu huỷ dù chịu lỗ. Hành vi này thể hiện điều gì?", "Đạo đức kinh doanh, đặt an toàn của khách lên trên lợi nhuận", "Thiếu năng lực quản lí hàng hoá", "Chiến thuật quảng cáo để nổi tiếng", "Không bán hàng gây hại cho sức khoẻ người tiêu dùng là nguyên tắc đạo đức kinh doanh."],
    ["Vì sao doanh nghiệp có đạo đức kinh doanh thường phát triển bền vững?", "Được khách hàng tin tưởng, xã hội ủng hộ lâu dài", "Vì luôn được miễn thuế và ưu đãi", "Vì không còn đối thủ cạnh tranh", "Uy tín thương hiệu là tài sản lớn giúp doanh nghiệp đứng vững trước biến động thị trường."],
    ["Đạo đức kinh doanh có vai trò gì với người tiêu dùng?", "Bảo vệ quyền lợi, sức khoẻ và sự an toàn của người mua", "Làm giá hàng hoá tăng cao hơn", "Hạn chế quyền lựa chọn của người mua", "Người tiêu dùng được cung cấp thông tin trung thực và sản phẩm an toàn khi doanh nghiệp có đạo đức."],
    ["Hành vi cạnh tranh nào vừa thiếu đạo đức vừa trái pháp luật?", "Bôi nhọ đối thủ, quảng cáo gian dối để giành khách", "Giảm giá nhờ tiết kiệm chi phí hợp lí", "Nâng cao chất lượng phục vụ khách hàng", "Cạnh tranh phải lành mạnh, đúng pháp luật và tôn trọng đối thủ, khách hàng."],
    ["Trách nhiệm xã hội của doanh nghiệp gắn với đạo đức kinh doanh thế nào?", "Doanh nghiệp đóng góp cho cộng đồng, bảo vệ môi trường", "Doanh nghiệp chỉ cần tối đa hoá lợi nhuận", "Doanh nghiệp không liên quan tới cộng đồng", "Tham gia hoạt động thiện nguyện, hỗ trợ địa phương là biểu hiện trách nhiệm xã hội."],
    ["Khi khách hàng phàn nàn sản phẩm lỗi, doanh nghiệp có đạo đức nên làm gì?", "Tiếp nhận, xin lỗi và đổi trả, bồi thường theo quy định", "Đổ lỗi cho khách hàng sử dụng sai", "Im lặng để khách hàng tự bỏ qua", "Ứng xử có trách nhiệm sau bán hàng giúp giữ uy tín và khách hàng trung thành."],
    ["Người kinh doanh trung thực trong kê khai thuế thể hiện điều gì?", "Đạo đức kinh doanh và ý thức tuân thủ pháp luật", "Thiệt thòi so với người trốn thuế", "Chỉ là nghĩa vụ hình thức", "Nộp thuế đầy đủ là đóng góp cho ngân sách và thể hiện trách nhiệm công dân của doanh nghiệp."],
    ["Một công ty công khai thu hồi sản phẩm lỗi và bồi thường cho khách. Việc làm này có tác dụng gì?", "Giữ uy tín, niềm tin của khách hàng và xã hội", "Làm công ty mất hết khách hàng ngay", "Không có tác dụng gì thực tế", "Minh bạch và chịu trách nhiệm khi có sự cố là biểu hiện đạo đức kinh doanh được đánh giá cao."],
    ["Đạo đức kinh doanh đòi hỏi doanh nghiệp đối xử với đối tác thế nào?", "Bình đẳng, tôn trọng và thực hiện đúng hợp đồng", "Tìm cách chiếm lợi thế bằng mọi thủ đoạn", "Chậm thanh toán để chiếm dụng vốn", "Quan hệ đối tác bền vững dựa trên tin cậy và cùng có lợi."],
    ["Biểu hiện thiếu đạo đức trong quảng cáo là gì?", "Phóng đại công dụng, che giấu thông tin bất lợi", "Nêu rõ giá và thành phần sản phẩm", "Quảng cáo trên nhiều kênh truyền thông", "Quảng cáo trung thực là yêu cầu đạo đức và cũng là quy định của pháp luật về quảng cáo."],
    ["Vì sao không nên kinh doanh hàng hoá gây hại cho sức khoẻ cộng đồng?", "Vi phạm đạo đức kinh doanh và bị pháp luật xử lí", "Vì loại hàng này khó tìm nguồn cung", "Vì lợi nhuận của hàng này thấp", "Lợi nhuận không thể biện minh cho việc gây hại sức khoẻ, tính mạng con người."],
    ["Đạo đức kinh doanh góp phần xây dựng văn hoá doanh nghiệp thế nào?", "Tạo môi trường làm việc trung thực, tôn trọng, gắn kết", "Làm nhân viên sợ hãi và xa cách nhau", "Không liên quan tới văn hoá doanh nghiệp", "Văn hoá doanh nghiệp tốt bắt đầu từ người đứng đầu gương mẫu về đạo đức."],
    ["Học sinh bán hàng trực tuyến cho bạn bè cần thực hiện đạo đức kinh doanh thế nào?", "Mô tả đúng sản phẩm, giá rõ ràng, giao hàng đúng hẹn", "Đăng ảnh sản phẩm khác với hàng thật", "Thu tiền rồi chậm giao hàng nhiều lần", "Đạo đức kinh doanh cần rèn luyện từ những hoạt động mua bán nhỏ, đời thường nhất."],
    ["Một doanh nghiệp dùng nguyên liệu rẻ, không an toàn để giảm giá thành. Hậu quả lâu dài là gì?", "Mất uy tín, bị xử phạt và có thể phá sản", "Lợi nhuận tăng bền vững mãi mãi", "Khách hàng càng tin tưởng hơn", "Vi phạm đạo đức kinh doanh có thể mang lợi ích ngắn hạn nhưng gây hại lâu dài cho doanh nghiệp."],
    ["Đạo đức kinh doanh và pháp luật kinh doanh có quan hệ thế nào?", "Hỗ trợ nhau; pháp luật là giới hạn bắt buộc tối thiểu", "Hoàn toàn đối lập nhau", "Có đạo đức thì không cần tuân thủ pháp luật", "Nhiều chuẩn mực đạo đức được pháp luật hoá thành quy định bắt buộc trong kinh doanh."],
    ["Chủ cửa hàng niêm yết giá rõ ràng, cân đúng đủ và niềm nở với khách. Cửa hàng được nhiều người ủng hộ vì điều gì?", "Kinh doanh có đạo đức, tạo niềm tin cho khách hàng", "Do cửa hàng giảm giá sâu nhất khu vực", "Do khách hàng không có lựa chọn khác", "Đây là minh chứng đạo đức kinh doanh mang lại lợi ích thiết thực và lâu dài."]
  ];
  var kt11t5P = [
    ["Chữ tín", "Thực hiện đúng cam kết với khách, đối tác"],
    ["Trung thực kinh doanh", "Đúng chất lượng, giá cả, nguồn gốc hàng"],
    ["Quảng cáo gian dối", "Phóng đại, che giấu thông tin sản phẩm"],
    ["Hàng giả, hàng kém chất lượng", "Vi phạm đạo đức và pháp luật kinh doanh"],
    ["Trách nhiệm xã hội", "Đóng góp cộng đồng, bảo vệ môi trường"],
    ["Đạo đức với người lao động", "Lương công bằng, an toàn, tôn trọng"],
    ["Uy tín thương hiệu", "Niềm tin lâu dài của khách hàng"]
  ];
  var kt11t6F = [
    ["Văn hoá tiêu dùng là gì?", "Thói quen, giá trị và cách ứng xử trong tiêu dùng", "Tổng số tiền người dân chi cho mua sắm", "Danh sách hàng hoá được bày bán", "Văn hoá tiêu dùng thể hiện qua cách lựa chọn, sử dụng và ứng xử khi mua sắm hàng hoá, dịch vụ."],
    ["Văn hoá tiêu dùng Việt Nam có nét đẹp truyền thống nào?", "Tiết kiệm, tương trợ và coi trọng hàng hoá trong nước", "Tiêu xài hoang phí, chạy theo hàng ngoại", "Mua sắm không cần tính toán", "Tinh thần tiết kiệm, yêu nước qua việc ưu tiên dùng hàng Việt Nam là nét đẹp cần phát huy."],
    ["Người tiêu dùng thông minh là người thế nào?", "Biết chọn hàng an toàn, giá hợp lí, phù hợp nhu cầu", "Luôn mua hàng đắt nhất trên thị trường", "Mua mọi thứ đang được quảng cáo nhiều", "Tiêu dùng thông minh đòi hỏi tìm hiểu thông tin, so sánh và lập kế hoạch chi tiêu."],
    ["Tiêu dùng bền vững được hiểu là gì?", "Đáp ứng nhu cầu hiện tại, không hại thế hệ tương lai", "Tiêu dùng càng nhiều càng tốt", "Chỉ mua hàng hoá có giá rẻ nhất", "Tiêu dùng bền vững gắn với tiết kiệm tài nguyên, giảm rác thải và bảo vệ môi trường."],
    ["Hành vi nào thể hiện văn hoá tiêu dùng văn minh?", "Xếp hàng, giữ vệ sinh nơi mua sắm, ứng xử lịch sự", "Chen lấn, xả rác tại siêu thị", "Mặc cả bằng cách to tiếng với người bán", "Văn hoá tiêu dùng còn thể hiện ở ý thức cộng đồng nơi công cộng."],
    ["Bạn A luôn kiểm tra nguồn gốc, hạn sử dụng và chỉ mua đồ thật sự cần. A thể hiện lối tiêu dùng nào?", "Tiêu dùng thông minh, có kế hoạch và trách nhiệm", "Tiêu dùng chạy theo trào lưu", "Tiêu dùng hoang phí, lãng phí", "Ưu tiên nhu cầu thiết yếu trước mong muốn là nguyên tắc tiêu dùng hợp lí."],
    ["Chạy theo hàng hiệu, mua sắm vượt khả năng chi trả thể hiện điều gì?", "Lối tiêu dùng phô trương, thiếu văn hoá tiêu dùng lành mạnh", "Tiêu dùng thông minh và hiện đại", "Thể hiện đẳng cấp văn hoá cao", "Tiêu dùng cần phù hợp thu nhập và điều kiện thực tế của bản thân, gia đình."],
    ["Ưu tiên dùng hàng Việt Nam chất lượng tốt mang lại ý nghĩa gì?", "Ủng hộ sản xuất trong nước, tạo việc làm cho lao động Việt", "Không có ý nghĩa kinh tế nào", "Chỉ là khẩu hiệu hình thức", "Cuộc vận động người Việt Nam ưu tiên dùng hàng Việt Nam góp phần phát triển kinh tế đất nước."],
    ["Khi mua hàng trực tuyến, người tiêu dùng văn minh cần làm gì?", "Kiểm tra uy tín người bán, đọc đánh giá, giữ chứng từ", "Chuyển tiền ngay cho mọi người bán lạ", "Không cần xem thông tin sản phẩm", "Mua sắm trực tuyến tiện lợi nhưng tiềm ẩn rủi ro hàng giả, lừa đảo cần cảnh giác."],
    ["Giảm sử dụng túi nilon, đồ nhựa dùng một lần thể hiện xu hướng tiêu dùng nào?", "Tiêu dùng xanh, thân thiện với môi trường", "Tiêu dùng phô trương, sành điệu", "Tiêu dùng không cần thiết", "Tiêu dùng xanh ưu tiên sản phẩm tái chế, tiết kiệm năng lượng và ít rác thải."],
    ["Người tiêu dùng có quyền gì khi mua phải hàng giả, hàng kém chất lượng?", "Quyền khiếu nại, yêu cầu đổi trả và bồi thường thiệt hại", "Không có quyền gì, phải tự chịu", "Quyền tự ý đập phá cửa hàng bán hàng", "Luật Bảo vệ quyền lợi người tiêu dùng bảo vệ quyền an toàn, thông tin, khiếu nại của người mua."],
    ["Thói quen tiêu dùng nào gây lãng phí và hại môi trường?", "Mua quá nhiều thực phẩm rồi bỏ đi, dùng đồ một lần", "Lập danh sách trước khi đi mua sắm", "Tái sử dụng đồ dùng còn tốt", "Lãng phí thực phẩm và rác thải nhựa là vấn đề lớn của lối tiêu dùng hiện nay."],
    ["Văn hoá tiêu dùng ảnh hưởng thế nào tới sản xuất?", "Định hướng doanh nghiệp sản xuất hàng an toàn, xanh, sạch", "Không ảnh hưởng gì tới doanh nghiệp", "Buộc doanh nghiệp giảm chất lượng hàng", "Khi người tiêu dùng đòi hỏi cao, doanh nghiệp phải nâng chất lượng để tồn tại."],
    ["Gia đình chị B lập ngân sách tháng, ưu tiên chi thiết yếu và tiết kiệm một phần thu nhập. Gia đình B thực hiện điều gì?", "Văn hoá tiêu dùng tiết kiệm, chi tiêu có kế hoạch", "Lối sống keo kiệt, khổ sở", "Tiêu dùng chạy theo người khác", "Tiết kiệm là nét đẹp văn hoá tiêu dùng, khác với hoang phí và cũng khác với hà tiện cực đoan."],
    ["Khi phát hiện cơ sở bán thực phẩm bẩn, người tiêu dùng nên làm gì?", "Báo cơ quan chức năng, tẩy chay và cảnh báo cộng đồng", "Im lặng vì không liên quan tới mình", "Tiếp tục mua vì giá rẻ hơn", "Ứng xử có trách nhiệm của người tiêu dùng góp phần làm trong sạch thị trường."],
    ["Tiêu dùng theo phong trào, trào lưu mạng xã hội tiềm ẩn nguy cơ gì?", "Mua đồ không cần thiết, lãng phí tiền và tài nguyên", "Luôn mua được hàng tốt nhất", "Giúp tiết kiệm chi tiêu hiệu quả", "Cần tỉnh táo trước quảng cáo và trào lưu, chỉ mua khi thực sự có nhu cầu."],
    ["Sản phẩm được gắn nhãn xanh, tiết kiệm năng lượng cho biết điều gì?", "Sản phẩm thân thiện môi trường, dùng năng lượng hiệu quả", "Sản phẩm có màu xanh lá cây", "Sản phẩm đắt nhất trong cửa hàng", "Lựa chọn sản phẩm có chứng nhận môi trường là hành vi tiêu dùng bền vững."],
    ["Vì sao cần đọc kĩ thông tin, hướng dẫn trên bao bì sản phẩm?", "Để dùng an toàn, đúng cách và bảo vệ quyền lợi bản thân", "Chỉ để biết giá của sản phẩm", "Không cần thiết với hàng quen dùng", "Thông tin về thành phần, hạn dùng, cảnh báo giúp người tiêu dùng tránh rủi ro sức khoẻ."],
    ["Ứng xử nào thể hiện văn hoá khi thanh toán, đổi trả hàng?", "Lịch sự, xuất trình hoá đơn và tuân thủ quy định cửa hàng", "La hét đòi đổi trả vô lí", "Tự ý lấy hàng khác thay thế", "Văn hoá tiêu dùng thể hiện cả trong cách giải quyết tranh chấp mua bán một cách văn minh."],
    ["Xây dựng văn hoá tiêu dùng ở Việt Nam cần phát huy yếu tố nào?", "Tiêu dùng thông minh, tiết kiệm, ưu tiên hàng Việt", "Sính ngoại, coi thường hàng trong nước", "Tiêu dùng bằng vay nợ tràn lan", "Kết hợp nét đẹp truyền thống với lối tiêu dùng hiện đại, bền vững là hướng xây dựng đúng."],
    ["Thói quen mang túi vải, bình nước cá nhân khi đi mua sắm thể hiện điều gì?", "Ý thức tiêu dùng xanh, giảm rác thải nhựa", "Lối sống lạc hậu, không hiện đại", "Chỉ là sở thích cá nhân vô nghĩa", "Những hành động nhỏ của mỗi người tiêu dùng góp phần bảo vệ môi trường chung."],
    ["Người tiêu dùng có trách nhiệm gì với xã hội?", "Không tiếp tay hàng giả, hàng lậu; tiêu dùng có trách nhiệm", "Mua hàng lậu vì giá rẻ hơn nhiều", "Chỉ quan tâm lợi ích của bản thân", "Tẩy chay hàng giả, hàng không rõ nguồn gốc là trách nhiệm của người tiêu dùng văn minh."]
  ];
  var kt11t6P = [
    ["Tiêu dùng thông minh", "Chọn hàng an toàn, hợp nhu cầu, giá hợp lí"],
    ["Tiêu dùng bền vững", "Không gây hại cho thế hệ tương lai"],
    ["Tiêu dùng xanh", "Ưu tiên sản phẩm thân thiện môi trường"],
    ["Tiêu dùng phô trương", "Mua sắm vượt khả năng, chạy theo hình thức"],
    ["Hàng Việt Nam chất lượng cao", "Ưu tiên dùng để ủng hộ sản xuất trong nước"],
    ["Quyền của người tiêu dùng", "An toàn, thông tin, khiếu nại, bồi thường"],
    ["Tiết kiệm trong tiêu dùng", "Chi tiêu có kế hoạch, tránh lãng phí"]
  ];
  var kt11t7F = [
    ["Quyền bình đẳng của công dân trước pháp luật được hiểu là gì?", "Mọi công dân đều bình đẳng về quyền và nghĩa vụ pháp lí", "Chỉ công dân có chức vụ mới bình đẳng", "Công dân giàu và nghèo có quyền khác nhau", "Hiến pháp 2013 khẳng định mọi người đều bình đẳng trước pháp luật, không ai bị phân biệt đối xử."],
    ["Bình đẳng về quyền và nghĩa vụ của công dân thể hiện ở điểm nào?", "Mọi người hưởng quyền, làm nghĩa vụ như nhau theo luật", "Người giàu được hưởng nhiều quyền hơn", "Chỉ phải thực hiện nghĩa vụ, không có quyền", "Cùng điều kiện, hoàn cảnh như nhau thì quyền và nghĩa vụ của công dân là như nhau."],
    ["Một người vi phạm giao thông dù là cán bộ hay dân thường đều bị xử phạt theo cùng quy định. Điều này thể hiện nguyên tắc nào?", "Bình đẳng về trách nhiệm pháp lí trước pháp luật", "Ưu tiên cho người có chức vụ", "Phân biệt đối xử theo nghề nghiệp", "Mọi công dân vi phạm pháp luật đều bị xử lí như nhau, không có vùng cấm hay ngoại lệ."],
    ["Bình đẳng giới được hiểu là gì?", "Nam và nữ có vị trí, cơ hội ngang nhau trong mọi lĩnh vực", "Nam luôn được ưu tiên hơn nữ", "Chỉ bình đẳng trong gia đình", "Bình đẳng giới là nam, nữ bình đẳng về cơ hội học tập, việc làm, tham gia chính trị và trong gia đình."],
    ["Hành vi nào vi phạm bình đẳng giới?", "Không tuyển phụ nữ chỉ vì lí do giới tính dù đủ năng lực", "Tuyển dụng dựa trên năng lực và yêu cầu công việc", "Tạo điều kiện cho phụ nữ tham gia quản lí", "Phân biệt đối xử dựa trên giới tính trong lao động, giáo dục bị pháp luật nghiêm cấm."],
    ["Chính sách nào thể hiện bình đẳng giới trong chính trị?", "Bảo đảm tỉ lệ nữ tham gia cơ quan dân cử, quản lí nhà nước", "Cấm phụ nữ tham gia bầu cử, ứng cử", "Chỉ nam giới được giữ chức vụ lãnh đạo", "Nhà nước tạo điều kiện để phụ nữ tham gia các hoạt động chính trị, xã hội như nam giới."],
    ["Bình đẳng giữa các dân tộc ở Việt Nam thể hiện ở nguyên tắc nào?", "Các dân tộc bình đẳng, đoàn kết, giúp nhau phát triển", "Dân tộc đa số được hưởng mọi ưu tiên", "Mỗi dân tộc sống tách biệt hoàn toàn", "Hiến pháp khẳng định các dân tộc bình đẳng về quyền chính trị, kinh tế, văn hoá, giáo dục."],
    ["Chính sách ưu tiên tuyển sinh, hỗ trợ học sinh dân tộc thiểu số thể hiện điều gì?", "Tạo điều kiện thực tế để các dân tộc cùng phát triển", "Phân biệt đối xử ngược với dân tộc đa số", "Đặc quyền không dựa trên pháp luật", "Ưu tiên cho vùng, nhóm yếu thế nhằm thu hẹp khoảng cách phát triển là thực hiện bình đẳng thực chất."],
    ["Hành vi chia rẽ, kì thị dân tộc bị pháp luật xử lí thế nào?", "Bị nghiêm cấm và bị xử lí theo quy định pháp luật", "Là quyền tự do cá nhân được phép làm", "Chỉ bị nhắc nhở nhẹ nhàng", "Mọi hành vi phân biệt đối xử, chia rẽ khối đại đoàn kết dân tộc đều bị nghiêm cấm."],
    ["Bình đẳng về tôn giáo được hiểu là gì?", "Các tôn giáo bình đẳng, được Nhà nước tôn trọng, bảo hộ", "Chỉ một tôn giáo được hoạt động", "Người theo tôn giáo không có quyền công dân", "Hiến pháp quy định các tôn giáo bình đẳng trước pháp luật; không ai bị phân biệt vì tín ngưỡng, tôn giáo."],
    ["Công dân theo tôn giáo và không theo tôn giáo có quan hệ thế nào?", "Bình đẳng, đoàn kết, tôn trọng lẫn nhau", "Người theo tôn giáo cao hơn người không theo", "Không được sống chung trong cộng đồng", "Đoàn kết lương – giáo là truyền thống tốt đẹp, góp phần xây dựng khối đại đoàn kết dân tộc."],
    ["Lợi dụng tôn giáo để chia rẽ dân tộc, gây rối trật tự bị xử lí thế nào?", "Bị pháp luật nghiêm cấm và xử lí nghiêm minh", "Được bảo vệ như hoạt động tôn giáo bình thường", "Không bị xử lí nếu đông người tham gia", "Tự do tín ngưỡng, tôn giáo không đồng nghĩa với lợi dụng tôn giáo làm việc trái pháp luật."],
    ["Bình đẳng trong lao động thể hiện ở điểm nào?", "Làm như nhau, trả công như nhau, không phân biệt giới", "Nữ lao động luôn nhận lương thấp hơn nam", "Chỉ lao động nam được kí hợp đồng", "Mọi người lao động bình đẳng về cơ hội việc làm, tiền lương và điều kiện lao động theo luật."],
    ["Bình đẳng trong giáo dục thể hiện ở việc gì?", "Mọi công dân đều có quyền học tập, không phân biệt hoàn cảnh", "Chỉ con em gia đình giàu mới được học cao", "Học sinh dân tộc thiểu số không được dự thi đại học", "Nhà nước và xã hội tạo điều kiện để mọi công dân được học tập suốt đời."],
    ["Bình đẳng trong hôn nhân và gia đình được thể hiện thế nào?", "Vợ chồng bình đẳng, tôn trọng và cùng chăm lo gia đình", "Chồng có quyền quyết định mọi việc", "Vợ không có quyền sở hữu tài sản chung", "Quan hệ hôn nhân, gia đình bình đẳng là nội dung của bình đẳng giới trong gia đình."],
    ["Bạn nữ lớp 11 bị gia đình ngăn cản học tiếp vì cho rằng con gái không cần học cao. Quan niệm này vi phạm nguyên tắc nào?", "Bình đẳng giới trong giáo dục và đào tạo", "Truyền thống gia đình cần giữ nguyên", "Quyền tự do lựa chọn của gia đình", "Nam và nữ được bình đẳng về cơ hội học tập, đào tạo và nâng cao trình độ."],
    ["Khi hai công dân có cùng hành vi vi phạm và hoàn cảnh như nhau, cơ quan chức năng phải xử lí thế nào?", "Xử lí như nhau theo cùng quy định pháp luật", "Xử nhẹ cho người quen biết, có quan hệ", "Xử nặng hơn cho người không có chức vụ", "Bình đẳng về trách nhiệm pháp lí đòi hỏi áp dụng pháp luật thống nhất, không thiên vị."],
    ["Vì sao bình đẳng trước pháp luật là giá trị quan trọng của nhà nước pháp quyền?", "Bảo đảm công bằng, chống đặc quyền và phân biệt đối xử", "Để mọi người không cần tuân thủ pháp luật", "Chỉ mang ý nghĩa hình thức, tuyên truyền", "Nguyên tắc này là cơ sở bảo vệ quyền con người, quyền công dân trong xã hội dân chủ."],
    ["Người khuyết tật được Nhà nước hỗ trợ học nghề, việc làm thể hiện điều gì?", "Bình đẳng thực chất, tạo cơ hội cho nhóm yếu thế", "Ban ơn không dựa trên quyền của công dân", "Phân biệt đối xử với người bình thường", "Bình đẳng không chỉ trên danh nghĩa mà cần điều kiện thực tế để mọi người cùng thực hiện quyền."],
    ["Bình đẳng về quyền bầu cử của công dân được thể hiện ra sao?", "Mỗi cử tri một lá phiếu có giá trị ngang nhau", "Người có chức vụ được bỏ nhiều phiếu hơn", "Phụ nữ không được tham gia bầu cử", "Nguyên tắc bầu cử phổ thông, bình đẳng, trực tiếp và bỏ phiếu kín bảo đảm bình đẳng chính trị."],
    ["Một doanh nghiệp trả lương cho nữ thấp hơn nam dù cùng công việc và kết quả. Hành vi này vi phạm điều gì?", "Bình đẳng giới trong lao động và tiền lương", "Quyền tự do thoả thuận của doanh nghiệp", "Không vi phạm gì nếu hai bên đồng ý", "Người lao động có quyền khiếu nại, yêu cầu bảo vệ quyền lợi hợp pháp của mình."],
    ["Nhà nước thực hiện bình đẳng dân tộc bằng chính sách chủ yếu nào?", "Đầu tư kinh tế, giáo dục, y tế vùng dân tộc thiểu số", "Bắt buộc mọi dân tộc dùng chung một văn hoá", "Không quan tâm tới vùng khó khăn", "Chính sách dân tộc giúp thu hẹp khoảng cách giữa các vùng, các dân tộc trong cả nước."],
    ["Tôn trọng tín ngưỡng, tôn giáo của người khác thể hiện ở hành vi nào?", "Không xúc phạm, không ép người khác theo hay bỏ tôn giáo", "Chế giễu lễ nghi của tôn giáo khác", "Ép bạn bè phải theo tôn giáo của mình", "Mọi người có quyền tự do tín ngưỡng, tôn giáo; không ai được xâm phạm quyền này."],
    ["Bình đẳng trước pháp luật trong lĩnh vực kinh tế thể hiện ở việc gì?", "Mọi thành phần kinh tế bình đẳng, cạnh tranh theo pháp luật", "Doanh nghiệp nhà nước được miễn mọi quy định", "Hộ kinh doanh không có quyền kinh doanh", "Hiến pháp khẳng định các thành phần kinh tế đều là bộ phận của nền kinh tế, bình đẳng trước pháp luật."]
  ];
  var kt11t7P = [
    ["Bình đẳng trước pháp luật", "Ngang nhau về quyền, nghĩa vụ, trách nhiệm"],
    ["Bình đẳng giới", "Nam, nữ ngang cơ hội mọi lĩnh vực"],
    ["Bình đẳng dân tộc", "Các dân tộc đoàn kết, cùng phát triển"],
    ["Bình đẳng tôn giáo", "Các tôn giáo bình đẳng trước pháp luật"],
    ["Bình đẳng trong lao động", "Cùng việc, cùng công bằng lương"],
    ["Bình đẳng trong giáo dục", "Mọi công dân đều có quyền học tập"],
    ["Phân biệt đối xử", "Hành vi bị pháp luật nghiêm cấm"]
  ];
  var kt11t8F = [
    ["Quyền bầu cử của công dân Việt Nam được thực hiện từ độ tuổi nào?", "Từ đủ 18 tuổi trở lên, trừ trường hợp luật định", "Từ đủ 16 tuổi trở lên", "Từ đủ 21 tuổi trở lên", "Hiến pháp 2013 quy định công dân đủ 18 tuổi trở lên có quyền bầu cử."],
    ["Quyền ứng cử đại biểu Quốc hội, Hội đồng nhân dân được thực hiện từ độ tuổi nào?", "Từ đủ 21 tuổi trở lên theo Hiến pháp", "Từ đủ 18 tuổi trở lên", "Từ đủ 16 tuổi trở lên", "Công dân đủ 21 tuổi trở lên có quyền ứng cử, trừ những trường hợp pháp luật quy định không được ứng cử."],
    ["Nguyên tắc bầu cử ở Việt Nam gồm những nguyên tắc nào?", "Phổ thông, bình đẳng, trực tiếp và bỏ phiếu kín", "Gián tiếp qua đại diện của gia đình", "Công khai lá phiếu của từng cử tri", "Bốn nguyên tắc bầu cử bảo đảm dân chủ và quyền làm chủ của nhân dân."],
    ["Bỏ phiếu kín trong bầu cử có ý nghĩa gì?", "Bảo đảm cử tri tự do lựa chọn, không bị ép buộc", "Để cử tri không biết mình bầu cho ai", "Chỉ là thủ tục hình thức", "Cử tri viết phiếu trong khu vực riêng, không ai được biết nội dung lá phiếu của mình."],
    ["Quyền tham gia quản lí nhà nước và xã hội của công dân thể hiện qua việc gì?", "Bàn bạc, góp ý, giám sát hoạt động của cơ quan nhà nước", "Tự ý thay mặt nhà nước ra quyết định", "Chỉ dành cho cán bộ, công chức", "Công dân tham gia quản lí nhà nước trực tiếp ở cơ sở và gián tiếp qua đại biểu dân cử."],
    ["Ở cơ sở, nhân dân thực hiện dân chủ theo phương châm nào?", "Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát", "Mọi việc do cán bộ quyết định hết", "Dân chỉ biết sau khi việc đã xong", "Dân chủ ở cơ sở được thực hiện trong các việc như xây dựng hương ước, giám sát đầu tư cộng đồng."],
    ["Quyền khiếu nại của công dân là quyền gì?", "Đề nghị xem lại quyết định trái luật hại quyền lợi mình", "Tố giác hành vi phạm tội của người khác", "Yêu cầu nhà nước cấp đất, cấp nhà", "Khiếu nại hướng tới quyết định hành chính, hành vi hành chính xâm phạm quyền lợi hợp pháp của chính người khiếu nại."],
    ["Quyền tố cáo của công dân là quyền gì?", "Báo cho cơ quan có thẩm quyền hành vi vi phạm pháp luật", "Yêu cầu xem xét lại quyết định hành chính", "Kiện ra toà án để đòi bồi thường", "Tố cáo là báo về hành vi vi phạm của bất kì cơ quan, tổ chức, cá nhân nào gây hại lợi ích chung."],
    ["Khiếu nại khác tố cáo ở điểm cơ bản nào?", "Khiếu nại vì quyền lợi mình; tố cáo vì vi phạm chung", "Hai quyền hoàn toàn giống nhau", "Tố cáo chỉ dành cho cán bộ nhà nước", "Phân biệt đúng giúp công dân gửi đơn tới đúng cơ quan và được giải quyết đúng trình tự."],
    ["Phát hiện cán bộ xã nhận tiền để làm giấy tờ nhanh, anh D viết đơn báo cơ quan cấp trên. Anh D thực hiện quyền gì?", "Quyền tố cáo hành vi vi phạm pháp luật", "Quyền bầu cử đại biểu dân cử", "Quyền tự do ngôn luận trên báo chí", "Người tố cáo được pháp luật bảo vệ, nghiêm cấm trả thù, trù dập người tố cáo."],
    ["Chị P bị thu hồi đất nhưng bồi thường không đúng quy định, chị gửi đơn tới cơ quan đã ra quyết định. Chị P thực hiện quyền gì?", "Quyền khiếu nại quyết định hành chính", "Quyền tố cáo tội phạm hình sự", "Quyền ứng cử đại biểu Hội đồng nhân dân", "Người khiếu nại có quyền khiếu nại tiếp lên cấp trên hoặc khởi kiện ra toà án hành chính nếu không đồng ý."],
    ["Người khiếu nại, tố cáo có nghĩa vụ gì?", "Trình bày trung thực, chịu trách nhiệm về nội dung trình bày", "Được trình bày sai sự thật tuỳ ý", "Không cần cung cấp thông tin, tài liệu gì", "Khiếu nại, tố cáo sai sự thật cố ý sẽ bị xử lí theo pháp luật."],
    ["Cơ quan nhà nước có trách nhiệm gì khi nhận đơn khiếu nại, tố cáo?", "Tiếp nhận, giải quyết đúng thẩm quyền và thông báo kết quả", "Có thể bỏ qua không giải quyết", "Chuyển đơn vòng quanh không thời hạn", "Giải quyết khiếu nại, tố cáo đúng luật góp phần bảo vệ quyền công dân và kỉ cương pháp luật."],
    ["Cử tri muốn tìm hiểu tiểu sử, chương trình hành động của người ứng cử thì làm thế nào?", "Qua hội nghị tiếp xúc cử tri và thông tin niêm yết công khai", "Không có cách nào tìm hiểu trước", "Hỏi riêng người ứng cử tại nhà", "Tiếp xúc cử tri giúp cử tri lựa chọn sáng suốt người đại diện xứng đáng."],
    ["Những trường hợp nào không được thực hiện quyền bầu cử?", "Người đang bị tước quyền bầu cử theo bản án, người mất trí", "Người đang đi làm ăn xa quê hương", "Người không theo tôn giáo nào", "Danh sách cử tri được niêm yết công khai để mọi người kiểm tra, bổ sung nếu thiếu sót."],
    ["Quyền giám sát của công dân đối với hoạt động nhà nước được thực hiện qua đâu?", "Trực tiếp, qua đại biểu dân cử, Mặt trận, đoàn thể", "Công dân không có quyền giám sát nhà nước", "Chỉ qua mạng xã hội cá nhân", "Giám sát giúp phát hiện sai phạm, lãng phí và nâng cao hiệu quả hoạt động của bộ máy nhà nước."],
    ["Bầu cử đại biểu Quốc hội và Hội đồng nhân dân các cấp diễn ra đồng thời theo nhiệm kì bao lâu?", "Năm năm một nhiệm kì bầu cử", "Ba năm một nhiệm kì bầu cử", "Bảy năm một nhiệm kì bầu cử", "Ngày bầu cử được tổ chức thống nhất trong cả nước vào ngày chủ nhật theo quy định."],
    ["Công dân ở xa nơi thường trú trong ngày bầu cử cần làm gì để thực hiện quyền bầu cử?", "Xin cấp thẻ cử tri, bỏ phiếu tại nơi tạm trú theo luật", "Mất quyền bầu cử trong nhiệm kì đó", "Nhờ người khác bỏ phiếu thay", "Pháp luật tạo điều kiện để mọi cử tri đều thực hiện được quyền bầu cử của mình."],
    ["Việc lợi dụng khiếu nại, tố cáo để vu khống, gây rối bị xử lí thế nào?", "Bị xử lí theo pháp luật tuỳ mức độ vi phạm", "Không bị xử lí vì đó là quyền tự do", "Chỉ bị phê bình trong nội bộ", "Quyền khiếu nại, tố cáo phải được thực hiện trung thực, đúng pháp luật."],
    ["Tiếp công dân là hoạt động nhằm mục đích gì?", "Lắng nghe ý kiến, khiếu nại, tố cáo để giải quyết cho dân", "Chỉ để ghi nhận thông tin hình thức", "Thay thế hoàn toàn cơ quan xét xử", "Người đứng đầu cơ quan có trách nhiệm tiếp công dân định kì theo quy định."],
    ["Đại biểu dân cử có trách nhiệm gì với cử tri?", "Lắng nghe, phản ánh ý kiến cử tri và chịu giám sát", "Không cần gặp cử tri sau khi trúng cử", "Chỉ chịu trách nhiệm trước cấp trên", "Cử tri có quyền bãi nhiệm đại biểu không còn xứng đáng với sự tín nhiệm của nhân dân."],
    ["Một học sinh đủ 18 tuổi lần đầu đi bỏ phiếu cần chuẩn bị gì?", "Tìm hiểu ứng cử viên, mang thẻ cử tri, bỏ phiếu đúng luật", "Nhờ bố mẹ bỏ phiếu hộ", "Không cần tìm hiểu thông tin ứng cử viên", "Thực hiện quyền bầu cử là trách nhiệm và vinh dự của mỗi công dân."],
    ["Góp ý dự thảo văn bản pháp luật là hình thức công dân thực hiện quyền gì?", "Quyền tham gia quản lí nhà nước và xã hội", "Quyền tự do kinh doanh", "Quyền sở hữu tài sản cá nhân", "Cơ quan soạn thảo phải công khai dự thảo để nhân dân tham gia ý kiến theo quy định."],
    ["Người tố cáo được pháp luật bảo vệ ở những khía cạnh nào?", "Giữ bí mật thông tin, bảo vệ an toàn cho người tố cáo", "Không có biện pháp bảo vệ nào", "Chỉ bảo vệ nếu tố cáo đúng người có chức vụ thấp", "Bảo vệ người tố cáo khuyến khích công dân dũng cảm đấu tranh với vi phạm pháp luật."],
    ["Khiếu nại lần đầu được gửi tới ai?", "Người, cơ quan đã ban hành quyết định bị khiếu nại", "Gửi thẳng lên cơ quan cao nhất của Nhà nước", "Gửi cho cơ quan báo chí để đăng tải", "Nếu không đồng ý kết quả giải quyết lần đầu, công dân có quyền khiếu nại tiếp hoặc khởi kiện tại toà án."]
  ];
  var kt11t8P = [
    ["Quyền bầu cử", "Công dân đủ 18 tuổi bỏ phiếu bầu đại biểu"],
    ["Quyền ứng cử", "Công dân đủ 21 tuổi ra tranh cử"],
    ["Bỏ phiếu kín", "Bảo mật lựa chọn của cử tri"],
    ["Khiếu nại", "Đề nghị xem lại quyết định hại quyền lợi mình"],
    ["Tố cáo", "Báo hành vi vi phạm pháp luật"],
    ["Dân chủ ở cơ sở", "Dân biết, dân bàn, dân làm, dân kiểm tra"],
    ["Bảo vệ người tố cáo", "Giữ bí mật, bảo vệ an toàn người tố cáo"]
  ];
  var kt11t9F = [
    ["Quyền tự do ngôn luận của công dân được hiểu là gì?", "Được bày tỏ ý kiến, quan điểm theo quy định pháp luật", "Được nói mọi điều kể cả vu khống người khác", "Chỉ nhà báo mới có quyền bày tỏ ý kiến", "Hiến pháp 2013 quy định công dân có quyền tự do ngôn luận, tự do báo chí, tiếp cận thông tin."],
    ["Thực hiện quyền tự do ngôn luận, công dân không được làm gì?", "Xuyên tạc, vu khống, xúc phạm danh dự người khác", "Góp ý xây dựng chính sách của Nhà nước", "Bày tỏ ý kiến tại các cuộc họp dân cư", "Tự do ngôn luận phải trong khuôn khổ pháp luật, không xâm hại lợi ích nhà nước và quyền người khác."],
    ["Quyền tự do báo chí của công dân thể hiện qua việc gì?", "Sáng tạo tác phẩm, cung cấp và phản hồi thông tin báo chí", "Tự ý phát hành báo không cần giấy phép", "Đăng mọi tin đồn chưa kiểm chứng", "Công dân còn có quyền tiếp cận thông tin do cơ quan nhà nước công khai theo quy định."],
    ["Quyền tự do tín ngưỡng, tôn giáo của công dân là gì?", "Được theo hoặc không theo tôn giáo, không ai được ép buộc", "Bắt buộc mọi người theo một tôn giáo", "Chỉ được theo tôn giáo do gia đình chọn", "Hiến pháp quy định mọi người có quyền tự do tín ngưỡng, tôn giáo và Nhà nước tôn trọng, bảo hộ quyền này."],
    ["Hoạt động tín ngưỡng, tôn giáo hợp pháp cần tuân thủ điều gì?", "Tuân thủ Hiến pháp, pháp luật và bảo đảm trật tự xã hội", "Không cần tuân thủ quy định nào", "Được lợi dụng để trục lợi cá nhân", "Nghi lễ tôn giáo không được xâm hại an ninh, sức khoẻ và quyền của người khác."],
    ["Quyền bất khả xâm phạm về thân thể của công dân có nghĩa là gì?", "Không ai bị bắt, giam giữ trái pháp luật", "Công dân không bao giờ bị xử lí khi vi phạm", "Cơ quan nào cũng được bắt người tuỳ ý", "Bắt, giam giữ người phải đúng thẩm quyền, trình tự, thủ tục do luật định."],
    ["Người bị bắt trong trường hợp khẩn cấp, phạm tội quả tang được xử lí thế nào?", "Phải được giao ngay cho cơ quan có thẩm quyền giải quyết", "Có thể bị giam giữ tuỳ ý không thời hạn", "Không được thông báo cho gia đình biết", "Mọi trường hợp bắt người đều bị giám sát chặt chẽ để chống bắt oan, sai."],
    ["Quyền bất khả xâm phạm về chỗ ở được hiểu là gì?", "Không ai được tự ý vào chỗ ở của người khác khi chưa đồng ý", "Chủ nhà không được từ chối bất kì ai vào nhà", "Cơ quan chức năng vào nhà bất cứ lúc nào", "Khám xét chỗ ở chỉ được thực hiện trong trường hợp luật định, đúng trình tự, thẩm quyền."],
    ["Anh hàng xóm nghi ngờ mất đồ, tự ý xông vào nhà người khác lục soát. Hành vi này vi phạm quyền gì?", "Quyền bất khả xâm phạm về chỗ ở của công dân", "Quyền tự do đi lại của công dân", "Quyền sở hữu tài sản của người mất đồ", "Khi nghi ngờ, cần báo cơ quan công an thay vì tự ý xâm nhập chỗ ở của người khác."],
    ["Bí mật thư tín, điện thoại, điện tín của công dân được bảo đảm thế nào?", "Không ai được tự ý mở, thu giữ, nghe lén trái luật", "Ai cũng có quyền đọc thư của người khác", "Bưu điện được mở mọi thư để kiểm tra tuỳ ý", "Việc kiểm tra thư tín chỉ được thực hiện khi luật định và vì lí do an ninh, trật tự theo thủ tục chặt chẽ."],
    ["Bạn học sinh mở điện thoại của bạn cùng lớp đọc tin nhắn khi chưa được đồng ý. Hành vi này xâm phạm quyền gì?", "Quyền bí mật đời tư và thư tín của cá nhân", "Quyền tự do học tập của cá nhân", "Không xâm phạm quyền nào cả", "Tôn trọng bí mật đời tư của người khác là yêu cầu pháp luật và đạo đức."],
    ["Quyền tự do đi lại và cư trú của công dân được hiểu là gì?", "Được đi lại, lựa chọn nơi cư trú trong nước theo luật", "Không cần đăng kí cư trú ở bất cứ đâu", "Chỉ được ở tại nơi sinh ra", "Công dân còn có quyền ra nước ngoài và trở về nước theo quy định pháp luật."],
    ["Quyền tự do hội họp, lập hội của công dân cần thực hiện thế nào?", "Theo quy định pháp luật, không gây mất trật tự công cộng", "Tụ tập gây rối mà không cần thông báo", "Chỉ hội họp trong gia đình mới được phép", "Hội họp hoà bình, lập hội là quyền tự do cơ bản được Hiến pháp ghi nhận."],
    ["Khi phát hiện thông tin sai sự thật về mình trên mạng, công dân có quyền gì?", "Yêu cầu cải chính, xin lỗi và bồi thường theo pháp luật", "Đăng thông tin sai sự thật đáp trả đối phương", "Không có cách nào bảo vệ bản thân", "Danh dự, nhân phẩm, uy tín của cá nhân được pháp luật bảo vệ; người vi phạm phải chịu trách nhiệm."],
    ["Công dân có quyền tiếp cận thông tin trong những trường hợp nào?", "Thông tin nhà nước công khai, trừ bí mật theo luật định", "Mọi thông tin kể cả bí mật nhà nước", "Không có quyền tiếp cận thông tin nào", "Tiếp cận thông tin giúp công dân giám sát và tham gia quản lí nhà nước, xã hội."],
    ["Việc khám xét chỗ ở hợp pháp phải bảo đảm yêu cầu nào?", "Có quyết định của người có thẩm quyền, đúng trình tự", "Chỉ cần sự đồng ý của hàng xóm", "Tiến hành bất cứ lúc nào không cần thủ tục", "Người bị khám xét có quyền khiếu nại nếu việc khám xét trái pháp luật."],
    ["Quyền được bảo đảm an toàn về tính mạng, sức khoẻ của công dân có nghĩa là gì?", "Không được xâm hại tính mạng, sức khoẻ người khác trái luật", "Công dân không cần tuân thủ luật giao thông", "Chỉ người có chức vụ mới được bảo vệ", "Hiến pháp khẳng định công dân có quyền bất khả xâm phạm về thân thể, được pháp luật bảo hộ sức khoẻ, danh dự."],
    ["Một người bị tạm giữ nhưng không bị truy cứu trách nhiệm hình sự sau đó. Người này có quyền gì?", "Được trả tự do, xin lỗi và bồi thường nếu bị oan sai", "Vẫn bị giam giữ để chờ xử lí tiếp", "Không được yêu cầu gì vì đã bị bắt", "Bồi thường oan sai thể hiện trách nhiệm của Nhà nước và bảo vệ quyền tự do thân thể."],
    ["Sử dụng mạng xã hội để bày tỏ ý kiến, công dân cần lưu ý gì?", "Chia sẻ thông tin đúng sự thật, không xúc phạm người khác", "Đăng mọi thông tin chưa kiểm chứng cho nhanh", "Dùng tài khoản ẩn danh để vu khống người khác", "Tự do ngôn luận trên mạng cũng phải tuân thủ pháp luật như ngoài đời thực."],
    ["Quyền tự do kinh doanh của công dân được Hiến pháp ghi nhận thế nào?", "Được tự do kinh doanh ngành nghề luật không cấm", "Được kinh doanh mọi hàng hoá kể cả hàng cấm", "Chỉ doanh nghiệp nhà nước mới được kinh doanh", "Người kinh doanh phải đăng kí, nộp thuế và tuân thủ quy định của từng ngành nghề."],
    ["Công dân có quyền sở hữu những gì theo Hiến pháp?", "Thu nhập hợp pháp, tài sản, vốn và tư liệu sản xuất hợp pháp", "Chỉ được sở hữu đồ dùng cá nhân nhỏ", "Mọi tài sản đều thuộc sở hữu nhà nước", "Quyền sở hữu tư nhân và quyền thừa kế được pháp luật công nhận và bảo hộ."],
    ["Không ai được xâm phạm chỗ ở hợp pháp, vậy trường hợp nào được vào chỗ ở của người khác?", "Khi chủ nhà đồng ý hoặc có quyết định đúng thẩm quyền", "Khi hàng xóm yêu cầu vào kiểm tra", "Khi muốn tìm đồ bị mất của mình", "Lực lượng chức năng vào chỗ ở vì lí do khẩn cấp phải tuân thủ nghiêm ngặt quy định pháp luật."],
    ["Quyền tự do ngôn luận của học sinh trong trường học thể hiện qua việc gì?", "Phát biểu ý kiến xây dựng trong giờ học, họp lớp", "Nói năng tuỳ tiện, xúc phạm thầy cô, bạn bè", "Không được phát biểu ý kiến nào", "Tôn trọng nội quy và người khác là điều kiện thực hiện tự do ngôn luận lành mạnh ở trường."],
    ["Hành vi nghe lén điện thoại, đọc trộm thư của người khác bị xử lí thế nào?", "Bị xử lí hành chính hoặc hình sự tuỳ mức độ xâm phạm", "Không bị xử lí nếu không ai phát hiện", "Chỉ bị nhắc nhở miệng là xong", "Xâm phạm bí mật thư tín, điện thoại là hành vi trái pháp luật bị nghiêm cấm."],
    ["Vì sao các quyền tự do cơ bản phải gắn với giới hạn pháp luật?", "Để không xâm hại quyền người khác và trật tự xã hội", "Để Nhà nước tuỳ ý hạn chế quyền công dân", "Vì quyền tự do không quan trọng", "Giới hạn hợp lí giúp mọi người cùng được hưởng tự do trong một xã hội an toàn, công bằng."]
  ];
  var kt11t9P = [
    ["Tự do ngôn luận", "Bày tỏ ý kiến theo quy định pháp luật"],
    ["Tự do tín ngưỡng, tôn giáo", "Theo hoặc không theo tôn giáo nào"],
    ["Bất khả xâm phạm thân thể", "Không bị bắt, giam giữ trái pháp luật"],
    ["Bất khả xâm phạm chỗ ở", "Không tự ý vào nhà người khác"],
    ["Bí mật thư tín", "Không mở, nghe lén thư, điện thoại trái luật"],
    ["Tự do đi lại, cư trú", "Chọn nơi ở, đi lại trong nước theo luật"],
    ["Tiếp cận thông tin", "Xem thông tin nhà nước công khai"]
  ];
  var kt11cd1F = [
    ["Phát triển kinh tế gắn với biến đổi môi trường tự nhiên là vấn đề gì?", "Tăng trưởng kinh tế tác động mạnh tới tài nguyên, môi trường", "Kinh tế và môi trường hoàn toàn tách rời nhau", "Chỉ môi trường ảnh hưởng tới kinh tế", "Khai thác tài nguyên, xả thải làm biến đổi môi trường cả tích cực và tiêu cực."],
    ["Phát triển bền vững được hiểu là gì?", "Đáp ứng nhu cầu hiện tại, không hại thế hệ tương lai", "Tăng trưởng kinh tế càng nhanh càng tốt", "Chỉ chú trọng bảo vệ môi trường, bỏ kinh tế", "Phát triển bền vững cân bằng ba trụ cột: kinh tế, xã hội và môi trường."],
    ["Tăng trưởng xanh là gì?", "Tăng trưởng giảm phát thải, dùng hiệu quả tài nguyên", "Trồng thật nhiều cây xanh trong thành phố", "Tăng trưởng dựa hoàn toàn vào khai thác dầu khí", "Tăng trưởng xanh là hướng đi của nhiều quốc gia trước thách thức biến đổi khí hậu."],
    ["Biến đổi khí hậu gây hậu quả nào cho Việt Nam?", "Nước biển dâng, xâm nhập mặn, bão lũ cực đoan tăng", "Thời tiết ôn hoà hơn quanh năm", "Không ảnh hưởng gì tới sản xuất", "Đồng bằng sông Cửu Long và vùng ven biển chịu tác động nặng nề của biến đổi khí hậu."],
    ["Hoạt động kinh tế nào gây ô nhiễm môi trường nghiêm trọng?", "Sản xuất công nghiệp xả thải chưa xử lí, khai thác quá mức", "Sản xuất nông nghiệp hữu cơ sạch", "Dịch vụ du lịch sinh thái cộng đồng", "Ô nhiễm không khí, nước và đất ảnh hưởng trực tiếp sức khoẻ cộng đồng."],
    ["Tài nguyên thiên nhiên bị cạn kiệt chủ yếu do nguyên nhân nào?", "Khai thác bừa bãi, sử dụng lãng phí và tăng nhu cầu sản xuất", "Do tài nguyên tự biến mất theo thời gian", "Do con người ngừng sử dụng tài nguyên", "Nhiều tài nguyên không tái tạo được như than, dầu mỏ sẽ cạn dần theo khai thác."],
    ["Kinh tế tuần hoàn có đặc điểm gì?", "Tái sử dụng, tái chế tối đa, kéo dài vòng đời sản phẩm", "Sản xuất dùng một lần rồi thải bỏ", "Chỉ tập trung khai thác tài nguyên mới", "Kinh tế tuần hoàn giảm rác thải và tiết kiệm tài nguyên cho phát triển bền vững."],
    ["Doanh nghiệp áp dụng công nghệ sạch trong sản xuất mang lại lợi ích gì?", "Giảm ô nhiễm, tiết kiệm chi phí dài hạn, nâng uy tín", "Làm doanh nghiệp chắc chắn thua lỗ", "Không có lợi ích thực tế nào", "Nhiều doanh nghiệp chuyển đổi xanh để đáp ứng tiêu chuẩn thị trường quốc tế."],
    ["Người dân ven biển cần làm gì để thích ứng biến đổi khí hậu?", "Trồng rừng ngập mặn, chuyển đổi giống cây trồng, vật nuôi", "Chặt rừng ngập mặn để nuôi trồng tự do", "Không cần thay đổi cách sản xuất", "Thích ứng chủ động giúp giảm thiệt hại do xâm nhập mặn, bão và nước biển dâng."],
    ["Trách nhiệm bảo vệ môi trường trong phát triển kinh tế thuộc về ai?", "Nhà nước, doanh nghiệp và mọi người dân cùng thực hiện", "Chỉ thuộc về cơ quan quản lí môi trường", "Chỉ thuộc về doanh nghiệp sản xuất", "Bảo vệ môi trường là nghĩa vụ của mọi công dân, tổ chức theo Hiến pháp và pháp luật."],
    ["Đánh bắt thuỷ sản bằng chất nổ, điện gây hậu quả gì?", "Huỷ diệt nguồn lợi thuỷ sản và hệ sinh thái biển", "Giúp nguồn cá tăng nhanh hơn", "Là cách khai thác được khuyến khích", "Khai thác huỷ diệt bị pháp luật nghiêm cấm và bị xử lí nghiêm."],
    ["Hiệu ứng nhà kính gia tăng chủ yếu do hoạt động nào?", "Đốt nhiên liệu hoá thạch, phá rừng làm tăng khí thải", "Trồng rừng và dùng năng lượng tái tạo", "Sử dụng xe đạp thay ô tô cá nhân", "Khí nhà kính làm Trái Đất nóng lên, gây biến đổi khí hậu toàn cầu."],
    ["Năng lượng tái tạo gồm những nguồn nào?", "Năng lượng mặt trời, gió, thuỷ điện nhỏ và sinh khối", "Than đá, dầu mỏ và khí đốt tự nhiên", "Năng lượng từ đốt rác thải nhựa", "Phát triển năng lượng tái tạo giúp giảm phát thải và bảo đảm an ninh năng lượng."],
    ["Một nhà máy đầu tư hệ thống xử lí nước thải đạt chuẩn trước khi xả ra sông. Nhà máy thực hiện trách nhiệm gì?", "Trách nhiệm bảo vệ môi trường trong sản xuất kinh doanh", "Chỉ để đối phó với đoàn kiểm tra", "Trách nhiệm không bắt buộc với doanh nghiệp", "Tuân thủ quy định môi trường là điều kiện để doanh nghiệp phát triển bền vững."],
    ["Mất rừng đầu nguồn gây ra hậu quả môi trường nào?", "Lũ quét, sạt lở đất và suy giảm đa dạng sinh học", "Tăng lượng mưa điều hoà quanh năm", "Không ảnh hưởng tới vùng hạ du", "Rừng có vai trò giữ nước, chống xói mòn và cân bằng khí hậu khu vực."],
    ["Tiêu dùng xanh góp phần giảm biến đổi khí hậu thế nào?", "Giảm rác thải, tiết kiệm năng lượng và tài nguyên", "Không liên quan tới khí hậu toàn cầu", "Làm tăng nhu cầu khai thác tài nguyên", "Mỗi lựa chọn tiêu dùng thân thiện môi trường đều góp phần bảo vệ hệ sinh thái chung."],
    ["Chính sách nào thể hiện cam kết phát triển bền vững của Việt Nam?", "Chiến lược tăng trưởng xanh và cam kết giảm phát thải ròng", "Chỉ tăng khai thác tài nguyên thô", "Không đặt mục tiêu về môi trường", "Việt Nam cam kết quốc tế về đạt mức phát thải ròng bằng không vào giữa thế kỉ này."],
    ["Ô nhiễm nguồn nước ảnh hưởng trực tiếp tới đời sống thế nào?", "Gây bệnh tật, thiếu nước sạch và thiệt hại sản xuất", "Chỉ ảnh hưởng tới cảnh quan khu vực", "Không ảnh hưởng nếu không uống trực tiếp", "Bảo vệ nguồn nước là vấn đề cấp thiết ở nhiều khu công nghiệp và làng nghề."],
    ["Du lịch sinh thái gắn với bảo vệ môi trường có lợi ích gì?", "Tạo thu nhập và bảo tồn thiên nhiên, văn hoá địa phương", "Khai thác tối đa tài nguyên du lịch", "Không cần quan tâm tới môi trường", "Du lịch bền vững để lại giá trị lâu dài cho cộng đồng và thế hệ sau."],
    ["Học sinh có thể góp phần bảo vệ môi trường bằng hành động nào?", "Phân loại rác, tiết kiệm điện nước, trồng cây xanh", "Xả rác bừa bãi nơi công cộng", "Không liên quan tới học sinh", "Hành động nhỏ, thường xuyên của mỗi người tạo nên thay đổi lớn cho môi trường."],
    ["Đánh đổi môi trường lấy tăng trưởng kinh tế ngắn hạn gây hệ quả gì?", "Ô nhiễm, cạn tài nguyên và chi phí khắc phục rất lớn về sau", "Phát triển bền vững và lâu dài", "Không có hệ quả đáng kể", "Bài học nhiều nơi cho thấy tăng trưởng nóng gây hậu quả môi trường khó khắc phục."],
    ["Bảo tồn đa dạng sinh học có ý nghĩa gì với phát triển kinh tế?", "Duy trì nguồn gen, dịch vụ hệ sinh thái cho sản xuất", "Cản trở mọi hoạt động kinh tế", "Chỉ có ý nghĩa với ngành sinh học", "Hệ sinh thái khoẻ mạnh hỗ trợ nông nghiệp, thuỷ sản và sức khoẻ con người."]
  ];
  var kt11cd1P = [
    ["Phát triển bền vững", "Đáp ứng hiện tại, không hại tương lai"],
    ["Tăng trưởng xanh", "Giảm phát thải, dùng tài nguyên hiệu quả"],
    ["Kinh tế tuần hoàn", "Tái sử dụng, tái chế, giảm rác thải"],
    ["Biến đổi khí hậu", "Nước biển dâng, thời tiết cực đoan tăng"],
    ["Năng lượng tái tạo", "Mặt trời, gió và sinh khối"],
    ["Hiệu ứng nhà kính", "Khí thải làm Trái Đất nóng lên"],
    ["Đa dạng sinh học", "Sự phong phú của các loài và hệ sinh thái"]
  ];
  var kt11cd2F = [
    ["Giao dịch dân sự là gì?", "Hợp đồng hoặc hành vi đơn phương phát sinh quyền, nghĩa vụ", "Mọi cuộc trò chuyện giữa hai người", "Hoạt động mua bán không cần pháp luật", "Giao dịch dân sự phổ biến nhất là hợp đồng mua bán, vay mượn, tặng cho tài sản."],
    ["Giao dịch dân sự có hiệu lực cần điều kiện nào?", "Chủ thể có năng lực, tự nguyện, mục đích không trái luật", "Chỉ cần hai bên quen biết nhau", "Không cần điều kiện gì cả", "Giao dịch vi phạm điều cấm của luật hoặc trái đạo đức xã hội sẽ bị vô hiệu."],
    ["Năng lực hành vi dân sự của cá nhân là gì?", "Khả năng tự mình xác lập, thực hiện quyền và nghĩa vụ dân sự", "Khả năng lao động tạo ra thu nhập", "Quyền được đi bầu cử, ứng cử", "Năng lực hành vi dân sự phụ thuộc vào độ tuổi và khả năng nhận thức của cá nhân."],
    ["Người chưa thành niên thực hiện giao dịch dân sự thế nào?", "Tuỳ độ tuổi; nhiều giao dịch cần người đại diện đồng ý", "Được tự do thực hiện mọi giao dịch", "Không được thực hiện bất kì giao dịch nào", "Quy định này nhằm bảo vệ quyền lợi của người chưa thành niên trong giao dịch."],
    ["Hợp đồng dân sự là gì?", "Thoả thuận xác lập, thay đổi, chấm dứt quyền, nghĩa vụ", "Văn bản do cơ quan nhà nước ban hành", "Lời hứa miệng không có giá trị pháp lí", "Hợp đồng có thể bằng lời nói, văn bản hoặc hành vi cụ thể tuỳ loại giao dịch."],
    ["Nguyên tắc cơ bản khi giao kết hợp đồng dân sự là gì?", "Tự do giao kết, không trái luật, bình đẳng, thiện chí", "Bên mạnh hơn được áp đặt mọi điều khoản", "Chỉ cần một bên đồng ý là đủ", "Tự nguyện, bình đẳng, thiện chí và trung thực là nguyên tắc xuyên suốt của pháp luật dân sự."],
    ["Anh A thuê nhà của chị B, hai bên kí hợp đồng ghi rõ tiền thuê, thời hạn và trách nhiệm sửa chữa. Đây là loại giao dịch nào?", "Hợp đồng dân sự về thuê tài sản", "Giao dịch hành chính nhà nước", "Quan hệ lao động giữa hai bên", "Khi tranh chấp, hợp đồng là căn cứ quan trọng để bảo vệ quyền lợi các bên."],
    ["Hợp đồng bị vô hiệu khi nào?", "Khi giao kết giả tạo, lừa dối hoặc vi phạm điều cấm của luật", "Khi một bên không thích hợp đồng nữa", "Khi hợp đồng chỉ viết tay", "Hợp đồng vô hiệu thì các bên khôi phục lại tình trạng ban đầu, hoàn trả cho nhau những gì đã nhận."],
    ["Bên vi phạm hợp đồng dân sự phải chịu trách nhiệm gì?", "Thực hiện đúng cam kết, bồi thường thiệt hại nếu gây ra", "Không phải chịu trách nhiệm gì", "Chỉ bị phê bình trong cộng đồng", "Trách nhiệm dân sự chủ yếu mang tính bồi thường, khắc phục thiệt hại về tài sản."],
    ["Bồi thường thiệt hại ngoài hợp đồng phát sinh khi nào?", "Khi gây thiệt hại cho người khác dù không có hợp đồng trước", "Chỉ khi hai bên đã kí hợp đồng", "Khi một bên chậm trả tiền thuê nhà", "Ví dụ lái xe gây tai nạn làm hư xe người khác phải bồi thường dù hai bên không quen biết."],
    ["Điều kiện phát sinh trách nhiệm bồi thường ngoài hợp đồng gồm những gì?", "Có thiệt hại, hành vi trái luật, lỗi và quan hệ nhân quả", "Chỉ cần có thiệt hại là đủ", "Không cần xét lỗi của người gây hại", "Thiệt hại phải thực tế xảy ra và do chính hành vi trái pháp luật gây ra."],
    ["Bạn M làm vỡ kính cửa sổ nhà hàng xóm khi đá bóng. Trách nhiệm bồi thường thuộc về ai?", "M hoặc cha mẹ, người giám hộ bồi thường theo quy định", "Hàng xóm tự chịu vì kính dễ vỡ", "Không ai phải bồi thường cả", "Trách nhiệm bồi thường của người chưa thành niên được quy định cụ thể để bảo vệ người bị thiệt hại."],
    ["Thiệt hại được bồi thường gồm những loại nào?", "Thiệt hại tài sản, sức khoẻ, tính mạng, tinh thần", "Chỉ thiệt hại về tài sản hữu hình", "Chỉ thiệt hại do thiên tai gây ra", "Mức bồi thường do các bên thoả thuận, nếu không thoả thuận được thì toà án quyết định."],
    ["Người gây thiệt hại trong trường hợp khẩn cấp, phòng vệ chính đáng thì sao?", "Có thể không phải bồi thường hoặc giảm mức bồi thường", "Luôn phải bồi thường toàn bộ thiệt hại", "Bị xử lí hình sự trong mọi trường hợp", "Pháp luật cân nhắc hoàn cảnh gây thiệt hại để bảo đảm công bằng cho cả hai phía."],
    ["Chủ sở hữu nguồn nguy hiểm cao độ (xe cơ giới, vật nuôi nguy hiểm) gây thiệt hại thì trách nhiệm thế nào?", "Phải bồi thường cả khi không có lỗi, trừ luật định khác", "Không có lỗi thì không phải bồi thường", "Chỉ bồi thường khi cố ý gây hại", "Quy định này nhằm bảo vệ người bị thiệt hại trước các nguồn nguy hiểm đặc biệt."],
    ["Con chó của ông H cắn người đi đường bị thương. Ông H phải chịu trách nhiệm gì?", "Bồi thường chi phí chữa trị và thiệt hại cho người bị cắn", "Không liên quan vì chó tự cắn người", "Chỉ xin lỗi là xong mọi trách nhiệm", "Chủ sở hữu súc vật phải bồi thường thiệt hại do súc vật gây ra cho người khác."],
    ["Quyền sở hữu tài sản của công dân gồm những quyền nào?", "Quyền chiếm hữu, sử dụng và định đoạt tài sản", "Chỉ có quyền sử dụng tài sản", "Quyền bán tài sản của người khác", "Chủ sở hữu được toàn quyền với tài sản của mình trong giới hạn pháp luật."],
    ["Khi tranh chấp dân sự xảy ra, các bên nên giải quyết bằng cách nào trước?", "Thương lượng, hoà giải; không được thì khởi kiện ra toà án", "Tự ý dùng vũ lực đòi lại quyền lợi", "Im lặng bỏ qua mọi tranh chấp", "Hoà giải thành giúp tiết kiệm thời gian, chi phí và giữ quan hệ tốt giữa các bên."],
    ["Thời hiệu khởi kiện tranh chấp dân sự có ý nghĩa gì?", "Thời gian luật cho phép yêu cầu toà án bảo vệ quyền lợi", "Thời gian toà án xét xử một vụ án", "Hạn cuối để hai bên kí hợp đồng", "Hết thời hiệu, người có quyền có thể mất quyền yêu cầu toà án giải quyết nếu bên kia yêu cầu áp dụng thời hiệu."],
    ["Giao dịch dân sự bằng hình thức văn bản có ưu điểm gì?", "Rõ ràng, dễ chứng minh khi có tranh chấp phát sinh", "Không cần thiết trong mọi trường hợp", "Chỉ mang tính hình thức, không có giá trị", "Một số giao dịch bắt buộc lập văn bản, công chứng như chuyển nhượng nhà đất."],
    ["Người đại diện trong giao dịch dân sự là ai?", "Người nhân danh người khác xác lập giao dịch theo luật", "Người làm chứng cho giao dịch", "Người môi giới giới thiệu hai bên", "Đại diện có thể theo pháp luật như cha mẹ với con chưa thành niên, hoặc theo uỷ quyền."],
    ["Bên vay tiền không trả đúng hạn theo hợp đồng thì bên cho vay có quyền gì?", "Yêu cầu trả nợ, lãi quá hạn và khởi kiện ra toà án nếu cần", "Tự ý vào nhà bên vay lấy tài sản", "Không có quyền yêu cầu gì thêm", "Đòi nợ phải thực hiện bằng biện pháp hợp pháp, cấm dùng vũ lực, đe doạ."],
    ["Di chúc là loại giao dịch dân sự đặc biệt nào?", "Hành vi pháp lí đơn phương để lại di sản sau khi chết", "Hợp đồng giữa nhiều người thừa kế", "Văn bản của cơ quan nhà nước", "Người lập di chúc có quyền chỉ định người thừa kế và phân chia di sản theo ý nguyện hợp pháp."],
    ["Hiểu pháp luật dân sự giúp học sinh điều gì trong đời sống?", "Giao dịch an toàn, bảo vệ quyền lợi hợp pháp của mình", "Không cần thiết cho lứa tuổi học sinh", "Chỉ cần thiết với người kinh doanh", "Mua bán, vay mượn, bồi thường là những việc dân sự gần gũi hằng ngày với mọi người."]
  ];
  var kt11cd2P = [
    ["Giao dịch dân sự", "Làm phát sinh quyền, nghĩa vụ dân sự"],
    ["Hợp đồng dân sự", "Thoả thuận xác lập, thay đổi, chấm dứt quyền"],
    ["Giao dịch vô hiệu", "Trái luật, giả tạo hoặc bị lừa dối"],
    ["Bồi thường ngoài hợp đồng", "Gây hại không có hợp đồng vẫn phải bồi thường"],
    ["Năng lực hành vi dân sự", "Tự xác lập, thực hiện quyền dân sự"],
    ["Quyền sở hữu", "Chiếm hữu, sử dụng và định đoạt tài sản"],
    ["Nguồn nguy hiểm cao độ", "Gây hại phải bồi thường dù không có lỗi"]
  ];
  var kt11cd3F = [
    ["Hợp đồng lao động là gì?", "Thoả thuận việc làm có trả công và quyền, nghĩa vụ hai bên", "Cam kết làm việc không cần trả lương", "Văn bản do người lao động tự viết một mình", "Hợp đồng lao động là cơ sở pháp lí quan trọng nhất của quan hệ lao động."],
    ["Hợp đồng lao động gồm những loại nào theo thời hạn?", "Không xác định thời hạn và có thời hạn từ 12 đến 36 tháng", "Chỉ có hợp đồng làm việc suốt đời", "Chỉ có hợp đồng theo ngày công", "Sau khi hợp đồng có thời hạn hết hạn mà lao động vẫn làm việc, hai bên phải kí hợp đồng mới theo luật."],
    ["Nội dung chủ yếu của hợp đồng lao động gồm những gì?", "Công việc, lương, thời giờ làm việc, nghỉ ngơi, bảo hiểm", "Chỉ cần ghi tên hai bên là đủ", "Chỉ ghi mức lương, không cần nội dung khác", "Hợp đồng lao động phải lập thành văn bản trong hầu hết trường hợp theo luật."],
    ["Người lao động có quyền cơ bản nào?", "Được trả lương đúng hạn, nghỉ ngơi, làm việc an toàn", "Được tự ý nghỉ việc không cần báo trước", "Được làm mọi việc kể cả trái nội quy", "Người lao động còn có quyền thành lập, gia nhập công đoàn và đối thoại tại nơi làm việc."],
    ["Người lao động có nghĩa vụ cơ bản nào?", "Thực hiện hợp đồng, nội quy và an toàn lao động", "Chỉ cần đến nơi làm việc đúng giờ", "Không phải chịu trách nhiệm về công việc", "Nghĩa vụ lao động đi đôi với quyền lợi để quan hệ lao động hài hoà, ổn định."],
    ["Người sử dụng lao động có quyền gì?", "Tuyển dụng, quản lí, khen thưởng, kỉ luật theo luật", "Tuỳ ý sa thải lao động không lí do", "Không trả lương khi doanh nghiệp khó khăn", "Quyền quản lí lao động phải thực hiện trong khuôn khổ pháp luật và hợp đồng đã kí."],
    ["Người sử dụng lao động có nghĩa vụ gì?", "Trả lương đủ, đóng bảo hiểm, bảo đảm an toàn lao động", "Chỉ giao việc mà không cần quan tâm điều kiện làm việc", "Không cần kí hợp đồng với lao động", "Vi phạm nghĩa vụ với người lao động, doanh nghiệp bị xử phạt hành chính hoặc trách nhiệm khác."],
    ["Thời giờ làm việc bình thường của người lao động là bao nhiêu?", "Không quá 8 giờ một ngày và 48 giờ một tuần", "Không quá 12 giờ một ngày thường xuyên", "Không giới hạn nếu trả thêm lương", "Làm thêm giờ phải được người lao động đồng ý và có giới hạn theo luật lao động."],
    ["Tiền lương tối thiểu được hiểu là gì?", "Mức lương thấp nhất cho công việc giản đơn nhất", "Mức lương cao nhất của doanh nghiệp", "Mức lương do người lao động tự đặt ra", "Lương tối thiểu vùng do Chính phủ quy định, là căn cứ bảo vệ người lao động yếu thế."],
    ["Anh C bị công ty nợ lương ba tháng. Anh C có quyền làm gì?", "Khiếu nại, nhờ công đoàn hỗ trợ hoặc khởi kiện ra toà án", "Tự ý lấy tài sản công ty trừ lương", "Chỉ chấp nhận vì sợ mất việc", "Trả lương chậm, nợ lương là hành vi vi phạm pháp luật lao động bị xử lí."],
    ["Người lao động được nghỉ hằng năm (nghỉ phép) thế nào?", "Được nghỉ có hưởng nguyên lương theo số ngày luật định", "Không được nghỉ ngày nào trong năm", "Nghỉ phép nhưng bị trừ toàn bộ lương", "Số ngày nghỉ tăng theo thâm niên làm việc và tính chất công việc nặng nhọc, độc hại."],
    ["Lao động nữ được bảo vệ đặc biệt ở những quy định nào?", "Nghỉ thai sản, tránh việc nặng nhọc khi mang thai", "Phải làm ca đêm nhiều hơn lao động nam", "Không được hưởng chế độ đặc biệt nào", "Pháp luật lao động có nhiều quy định riêng bảo vệ lao động nữ và lao động chưa thành niên."],
    ["Lao động chưa thành niên (dưới 18 tuổi) được pháp luật bảo vệ ra sao?", "Hạn chế giờ làm, cấm làm việc nặng nhọc, độc hại, nguy hiểm", "Được làm mọi việc như người trưởng thành", "Không được tham gia lao động trong mọi trường hợp", "Sử dụng lao động chưa thành niên phải bảo đảm không ảnh hưởng học tập và phát triển của các em."],
    ["Đơn phương chấm dứt hợp đồng lao động hợp pháp cần điều kiện gì?", "Đúng lí do luật định và báo trước đủ thời hạn quy định", "Muốn nghỉ là nghỉ ngay không cần báo trước", "Chỉ người sử dụng lao động mới được chấm dứt", "Chấm dứt hợp đồng trái luật phải nhận lao động trở lại và bồi thường theo quy định."],
    ["Tranh chấp lao động cá nhân thường được giải quyết theo trình tự nào?", "Hoà giải viên lao động, sau đó toà án nếu không thành", "Tự ý đình công ngay lập tức", "Bỏ qua không giải quyết được", "Hoà giải là bước quan trọng giúp hai bên đạt thoả thuận, hạn chế tranh chấp kéo dài."],
    ["Công đoàn cơ sở có vai trò gì trong quan hệ lao động?", "Đại diện, bảo vệ quyền lợi hợp pháp của người lao động", "Thay thế ban giám đốc điều hành công ty", "Chỉ tổ chức hoạt động văn nghệ", "Công đoàn tham gia đối thoại, thương lượng tập thể và giám sát thực hiện pháp luật lao động."],
    ["Thoả ước lao động tập thể là gì?", "Thoả thuận tập thể về điều kiện lao động", "Hợp đồng cá nhân của từng lao động", "Nội quy do doanh nghiệp tự đặt một mình", "Thoả ước tập thể có thể quy định điều kiện tốt hơn cho lao động so với mức luật định tối thiểu."],
    ["An toàn, vệ sinh lao động tại nơi làm việc là trách nhiệm của ai?", "Cả người sử dụng lao động và người lao động cùng thực hiện", "Chỉ là trách nhiệm của người lao động", "Không ai phải chịu trách nhiệm", "Doanh nghiệp phải trang bị bảo hộ, huấn luyện an toàn; lao động phải tuân thủ quy trình an toàn."],
    ["Người lao động bị tai nạn lao động được hưởng quyền lợi gì?", "Được cấp cứu, bồi thường, trợ cấp, hưởng bảo hiểm", "Tự chịu toàn bộ chi phí chữa trị", "Bị chấm dứt hợp đồng ngay lập tức", "Bảo hiểm tai nạn lao động, bệnh nghề nghiệp hỗ trợ người lao động khi rủi ro xảy ra."],
    ["Kỉ luật lao động được áp dụng thế nào?", "Theo nội quy lao động, đúng trình tự luật định", "Sếp tự ý phạt tiền lao động tuỳ ý", "Áp dụng hình thức đánh đập, lăng mạ lao động", "Hình thức kỉ luật gồm khiển trách, kéo dài nâng lương, cách chức và sa thải theo luật."],
    ["Học sinh đi làm thêm trong dịp hè cần lưu ý điều gì?", "Chỉ làm việc phù hợp độ tuổi, có thoả thuận rõ ràng, an toàn", "Làm bất cứ việc gì để có thu nhập cao", "Không cần cho gia đình biết nơi làm việc", "Lao động vị thành niên được pháp luật bảo vệ đặc biệt, tránh bị bóc lột sức lao động."],
    ["Thử việc trong quan hệ lao động được quy định thế nào?", "Hai bên thoả thuận; thời gian, lương theo luật định", "Doanh nghiệp kéo dài thử việc không giới hạn", "Thử việc không được trả lương", "Mỗi công việc chỉ được thử việc một lần và có thời hạn tối đa theo trình độ công việc."],
    ["Bảo hiểm xã hội bắt buộc mang lại quyền lợi gì cho người lao động?", "Chế độ ốm đau, thai sản, tai nạn, hưu trí và tử tuất", "Chỉ là khoản tiền bị trừ vô ích", "Chỉ dành cho cán bộ quản lí doanh nghiệp", "Tham gia bảo hiểm xã hội là quyền và nghĩa vụ gắn với hợp đồng lao động."],
    ["Vì sao người lao động nên đọc kĩ hợp đồng trước khi kí?", "Để hiểu rõ quyền, nghĩa vụ và tránh bị điều khoản bất lợi", "Chỉ cần quan tâm mỗi mức lương là đủ", "Hợp đồng chỉ là thủ tục hình thức", "Khi có thắc mắc, lao động có thể nhờ công đoàn hoặc luật sư tư vấn trước khi kí kết."]
  ];
  var kt11cd3P = [
    ["Hợp đồng lao động", "Thoả thuận việc làm có trả công"],
    ["Lương tối thiểu vùng", "Mức lương sàn do Chính phủ quy định"],
    ["Thời giờ làm việc", "Không quá 8 giờ một ngày, 48 giờ một tuần"],
    ["Thoả ước lao động tập thể", "Thoả thuận điều kiện lao động cho tập thể"],
    ["Công đoàn cơ sở", "Đại diện bảo vệ quyền lợi người lao động"],
    ["Tai nạn lao động", "Được bồi thường, trợ cấp và bảo hiểm"],
    ["Kỉ luật lao động", "Áp dụng theo nội quy và đúng trình tự luật"]
  ];
  var KTPL11 = [
    TP("kt11-t1", "⚖️", "Cạnh tranh, cung – cầu trong kinh tế thị trường", "Bài 1–2 • Cạnh tranh và quy luật cung – cầu", KP(kt11t1F, kt11t1P), KN(kt11t1F, kt11t1P, "Giáo dục kinh tế và pháp luật")),
    TP("kt11-t2", "📉", "Lạm phát và thất nghiệp", "Bài 3–4 • Nguyên nhân, các loại và biện pháp kiềm chế lạm phát, thất nghiệp", KP(kt11t2F, kt11t2P), KN(kt11t2F, kt11t2P, "Giáo dục kinh tế và pháp luật")),
    TP("kt11-t3", "💼", "Thị trường lao động và việc làm", "Bài 5 • Thị trường lao động, xu hướng việc làm, giải pháp nâng cao chất lượng lao động", KP(kt11t3F, kt11t3P), KN(kt11t3F, kt11t3P, "Giáo dục kinh tế và pháp luật")),
    TP("kt11-t4", "💡", "Ý tưởng, cơ hội kinh doanh và năng lực của người kinh doanh", "Bài 6 • Ý tưởng kinh doanh, cơ hội kinh doanh, phẩm chất – năng lực người kinh doanh", KP(kt11t4F, kt11t4P), KN(kt11t4F, kt11t4P, "Giáo dục kinh tế và pháp luật")),
    TP("kt11-t5", "🤝", "Đạo đức kinh doanh", "Bài 7 • Biểu hiện, vai trò của đạo đức kinh doanh", KP(kt11t5F, kt11t5P), KN(kt11t5F, kt11t5P, "Giáo dục kinh tế và pháp luật")),
    TP("kt11-t6", "🛒", "Văn hoá tiêu dùng", "Bài 8 • Văn hoá tiêu dùng Việt Nam, tiêu dùng thông minh – bền vững", KP(kt11t6F, kt11t6P), KN(kt11t6F, kt11t6P, "Giáo dục kinh tế và pháp luật")),
    TP("kt11-t7", "👥", "Quyền bình đẳng của công dân trước pháp luật", "Bài 9–12 • Bình đẳng về quyền và nghĩa vụ, bình đẳng giới, dân tộc, tôn giáo", KP(kt11t7F, kt11t7P), KN(kt11t7F, kt11t7P, "Giáo dục kinh tế và pháp luật")),
    TP("kt11-t8", "🗳️", "Một số quyền dân chủ cơ bản của công dân", "Bài 13–16 • Quyền bầu cử/ứng cử, quản lí nhà nước, khiếu nại, tố cáo", KP(kt11t8F, kt11t8P), KN(kt11t8F, kt11t8P, "Giáo dục kinh tế và pháp luật")),
    TP("kt11-t9", "🕊️", "Một số quyền tự do cơ bản của công dân", "Bài 17–21 • Tự do ngôn luận, tín ngưỡng, bất khả xâm phạm thân thể/chỗ ở, bí mật thư tín", KP(kt11t9F, kt11t9P), KN(kt11t9F, kt11t9P, "Giáo dục kinh tế và pháp luật")),
    TP("kt11-cd1", "🌍", "Chuyên đề 1: Phát triển kinh tế và sự biến đổi môi trường tự nhiên", "Chuyên đề • Phát triển bền vững, tăng trưởng xanh, biến đổi khí hậu", KP(kt11cd1F, kt11cd1P), KN(kt11cd1F, kt11cd1P, "Giáo dục kinh tế và pháp luật")),
    TP("kt11-cd2", "📄", "Chuyên đề 2: Một số vấn đề về pháp luật dân sự", "Chuyên đề • Giao dịch dân sự, hợp đồng dân sự, bồi thường thiệt hại ngoài hợp đồng", KP(kt11cd2F, kt11cd2P), KN(kt11cd2F, kt11cd2P, "Giáo dục kinh tế và pháp luật")),
    TP("kt11-cd3", "👷", "Chuyên đề 3: Một số vấn đề về pháp luật lao động", "Chuyên đề • Hợp đồng lao động, quyền – nghĩa vụ của người lao động/sử dụng lao động", KP(kt11cd3F, kt11cd3P), KN(kt11cd3F, kt11cd3P, "Giáo dục kinh tế và pháp luật"))
  ];
  /* ==================================================================
     TIN HỌC 11 — Kết nối tri thức
     Bài 1–16 là LÕI CHUNG cho cả hai định hướng KHMT và THƯD.
     Từ Bài 17 tách hẳn: KHMT (kĩ thuật lập trình + 3 chuyên đề) và
     THƯD (thực hành CSDL + phần mềm ảnh/video + 3 chuyên đề).
     ================================================================== */
  var th11t1F = [
    ["Hệ điều hành có vai trò chính gì trong máy tính?", "Quản lí tài nguyên và điều phối hoạt động của máy tính", "Chỉ dùng để soạn thảo văn bản", "Chỉ dùng để chơi trò chơi", "Hệ điều hành là phần mềm hệ thống quan trọng nhất, làm trung gian giữa người dùng, phần mềm ứng dụng và phần cứng."],
    ["Ví dụ nào sau đây là hệ điều hành?", "Windows, Linux, macOS, Android", "Word, Excel, PowerPoint", "Chrome, Firefox, Cốc Cốc", "Hệ điều hành quản lí CPU, bộ nhớ, thiết bị và tệp; trình duyệt và phần mềm văn phòng là phần mềm ứng dụng."],
    ["Hệ điều hành quản lí những tài nguyên nào của máy tính?", "CPU, bộ nhớ, thiết bị ngoại vi và tệp dữ liệu", "Chỉ quản lí màn hình", "Chỉ quản lí bàn phím", "Quản lí tài nguyên giúp nhiều chương trình chạy cùng lúc mà không xung đột nhau."],
    ["Phần mềm nguồn mở có đặc điểm nổi bật nào?", "Mã nguồn công khai, được tự do dùng, sửa và phân phối", "Bắt buộc phải trả phí bản quyền cao", "Không ai được phép xem mã nguồn", "Ví dụ phần mềm nguồn mở: Linux, LibreOffice, GIMP; điều kiện sử dụng ghi trong giấy phép nguồn mở."],
    ["Phần mềm thương mại khác phần mềm nguồn mở ở điểm nào cốt yếu?", "Phải mua giấy phép, mã nguồn thường không công khai", "Luôn miễn phí cho mọi người dùng", "Không cần tuân theo giấy phép nào", "Dùng phần mềm thương mại lậu (bẻ khoá) là vi phạm bản quyền và tiềm ẩn nguy cơ mã độc."],
    ["Phần mềm miễn phí (freeware) khác phần mềm nguồn mở ở điểm nào?", "Miễn phí dùng nhưng mã nguồn thường không công khai", "Luôn cho phép sửa mã nguồn tự do", "Bắt buộc phải trả tiền hằng tháng", "Miễn phí về giá không đồng nghĩa với tự do về mã nguồn; cần đọc kĩ giấy phép của từng phần mềm."],
    ["Lưu trữ trực tuyến (đám mây) là hình thức lưu trữ thế nào?", "Lưu dữ liệu trên máy chủ qua Internet, truy cập mọi nơi", "Lưu dữ liệu chỉ trên một USB cá nhân", "In dữ liệu ra giấy để cất giữ", "Ví dụ: Google Drive, OneDrive, iCloud. Cần tài khoản và kết nối Internet để truy cập."],
    ["Ưu điểm nổi bật của lưu trữ trực tuyến là gì?", "Truy cập mọi nơi, dễ chia sẻ, có bản sao phòng mất mát", "Không bao giờ cần mật khẩu bảo vệ", "Tốc độ luôn nhanh hơn ổ cứng tại chỗ", "Lưu trữ đám mây vẫn cần sao lưu và bảo mật tài khoản cẩn thận, tránh phụ thuộc vào một nơi duy nhất."],
    ["Khi dùng lưu trữ trực tuyến, nguy cơ bảo mật chính là gì?", "Tài khoản bị chiếm đoạt thì dữ liệu cũng bị lộ theo", "Dữ liệu tự động biến thành giấy", "Không có nguy cơ nào đáng kể", "Nên đặt mật khẩu mạnh, bật xác thực hai lớp và không chia sẻ công khai tệp nhạy cảm."],
    ["Bên trong máy tính, hệ điều hành được nạp vào bộ phận nào khi khởi động?", "Bộ nhớ chính (RAM) để điều phối hoạt động", "Màn hình hiển thị", "Máy in gắn ngoài", "Quá trình khởi động nạp hệ điều hành từ thiết bị lưu trữ vào RAM để bắt đầu làm việc."],
    ["Giao diện của hệ điều hành phổ biến hiện nay là dạng nào?", "Giao diện đồ hoạ với cửa sổ, biểu tượng và chuột", "Chỉ có giao diện dòng lệnh duy nhất", "Không có giao diện tương tác", "Giao diện đồ hoạ (GUI) thân thiện, dễ dùng hơn giao diện dòng lệnh đối với đa số người dùng."],
    ["Hệ điều hành cho thiết bị di động phổ biến là những hệ nào?", "Android và iOS", "Windows và macOS", "Linux và Unix", "Android dựa trên nhân Linux và là hệ điều hành nguồn mở cho nhiều hãng điện thoại."],
    ["Dấu hiệu nào cho thấy một tin nhắn có thể là lừa đảo trực tuyến?", "Yêu cầu bấm link lạ, cung cấp mật khẩu hoặc mã OTP", "Tin nhắn từ người thân quen bình thường", "Thông báo chính thức trong ứng dụng ngân hàng", "Kẻ lừa đảo thường giả mạo ngân hàng, cơ quan nhà nước và tạo cảm giác khẩn cấp để nạn nhân vội làm theo."],
    ["Khi nhận cuộc gọi tự xưng cơ quan chức năng yêu cầu chuyển tiền, cần làm gì?", "Dừng lại, không chuyển tiền, kiểm chứng qua kênh chính thức", "Chuyển tiền ngay để tránh rắc rối", "Cung cấp mã OTP để xác minh", "Cơ quan chức năng không yêu cầu chuyển tiền hay cung cấp OTP qua điện thoại."],
    ["Phòng chống lừa đảo trên mạng, nguyên tắc chung quan trọng nhất là gì?", "Chậm lại, kiểm chứng độc lập trước khi tin và làm theo", "Làm càng nhanh càng an toàn", "Tin mọi tin có nhiều người chia sẻ", "Kiểm chứng qua số điện thoại, trang web chính thức giúp tránh hầu hết các chiêu lừa phổ biến."],
    ["Thông tin cá nhân nào tuyệt đối không chia sẻ công khai trên mạng?", "Số căn cước, mật khẩu, mã OTP và thông tin ngân hàng", "Sở thích âm nhạc cá nhân", "Món ăn yêu thích", "Lộ thông tin định danh và tài chính giúp kẻ xấu mạo danh, chiếm tài khoản và tiền bạc."],
    ["Phần mềm nào giúp bảo vệ máy tính khỏi mã độc?", "Phần mềm diệt virus và tường lửa được cập nhật thường xuyên", "Phần mềm soạn thảo văn bản", "Phần mềm nghe nhạc trực tuyến", "Ngoài phần mềm bảo vệ, thói quen không mở tệp/link lạ là lớp phòng thủ quan trọng không kém."],
    ["Cập nhật hệ điều hành và phần mềm thường xuyên có ích gì?", "Vá lỗ hổng bảo mật, sửa lỗi và cải thiện ổn định", "Chỉ làm máy tính chạy chậm đi", "Không có tác dụng thực tế nào", "Nhiều cuộc tấn công khai thác lỗ hổng đã có bản vá nhưng người dùng chưa cập nhật."],
    ["Sao lưu (backup) dữ liệu quan trọng nên thực hiện thế nào?", "Giữ nhiều bản ở nơi khác nhau, kiểm tra khôi phục được", "Chỉ giữ đúng một bản trên máy đang dùng", "Sao lưu xong thì xoá bản gốc ngay", "Quy tắc phổ biến là giữ ít nhất hai bản sao, trong đó có một bản ở nơi khác hoặc trên đám mây."],
    ["Thư rác và thư lừa đảo (phishing) thường có đặc điểm chung nào?", "Giả mạo tổ chức uy tín, dẫn tới trang đăng nhập giả", "Luôn gửi từ địa chỉ của bạn bè thật", "Không bao giờ chứa đường link", "Kiểm tra địa chỉ người gửi và địa chỉ trang web trước khi đăng nhập là cách nhận biết cơ bản."],
    ["Điện toán đám mây cung cấp những loại dịch vụ phổ biến nào?", "Lưu trữ, phần mềm trực tuyến và tài nguyên tính toán", "Chỉ cung cấp dịch vụ dự báo thời tiết", "Chỉ bán thiết bị phần cứng", "Người dùng dùng dịch vụ đám mây mỗi ngày qua email, lưu trữ và ứng dụng văn phòng trực tuyến."],
    ["Khi cài phần mềm, nên tải từ nguồn nào để an toàn?", "Trang chủ hoặc kho ứng dụng chính thức của nhà phát hành", "Trang chia sẻ không rõ nguồn gốc", "Link rút gọn trong bình luận lạ", "Nguồn không chính thức thường cài kèm phần mềm quảng cáo hoặc mã độc."],
    ["Quyền riêng tư khi dùng dịch vụ trực tuyến cần chú ý điều gì?", "Đọc quyền ứng dụng yêu cầu, chỉ cấp quyền thật cần thiết", "Cấp mọi quyền ứng dụng yêu cầu ngay", "Không cần quan tâm tới quyền truy cập", "Ứng dụng xin quyền vượt nhu cầu (ví dụ đèn pin xin đọc danh bạ) là dấu hiệu đáng ngờ."],
    ["Xã hội tri thức dựa chủ yếu vào nguồn lực nào để phát triển?", "Tri thức, thông tin và công nghệ số", "Chỉ dựa vào tài nguyên thiên nhiên", "Chỉ dựa vào lao động thủ công", "Trong xã hội tri thức, người lao động cần kĩ năng số và khả năng học suốt đời."]
  ];
  var th11t1P = [["Hệ điều hành", "Quản lí tài nguyên máy tính"], ["Phần mềm nguồn mở", "Mã nguồn công khai, tự do sửa"], ["Phần mềm thương mại", "Mua giấy phép sử dụng"], ["Lưu trữ trực tuyến", "Dữ liệu trên máy chủ qua Internet"], ["Phishing", "Thư, trang giả mạo lừa thông tin"], ["Sao lưu dữ liệu", "Giữ nhiều bản phòng mất mát"], ["Xác thực hai lớp", "Thêm lớp bảo vệ tài khoản"]];
  var th11t2F = [
    ["Hệ quản trị cơ sở dữ liệu (DBMS) là phần mềm có nhiệm vụ gì?", "Tạo, lưu trữ, truy vấn và quản lí cơ sở dữ liệu", "Soạn thảo văn bản hành chính", "Thiết kế hình ảnh đồ hoạ", "Ví dụ DBMS: MySQL, Access, SQL Server. DBMS giúp khai thác dữ liệu an toàn và hiệu quả."],
    ["Cơ sở dữ liệu (CSDL) được hiểu là gì?", "Tập dữ liệu có tổ chức, lưu trữ để khai thác lâu dài", "Một tệp văn bản viết tự do", "Một bức ảnh chụp dữ liệu", "CSDL được tổ chức theo mô hình nhất định để tránh trùng lặp và dễ truy vấn."],
    ["Trong CSDL quan hệ, dữ liệu được tổ chức chủ yếu dưới dạng nào?", "Các bảng gồm hàng (bản ghi) và cột (trường)", "Các trang văn bản liên tiếp", "Các hình ảnh xếp chồng nhau", "Mỗi bảng lưu một loại đối tượng; các bảng liên kết với nhau qua khoá."],
    ["Một hàng trong bảng dữ liệu được gọi là gì?", "Bản ghi (record) — thông tin về một đối tượng cụ thể", "Trường (field) của bảng", "Khoá chính của bảng", "Ví dụ bảng Học sinh: mỗi hàng là thông tin của một học sinh."],
    ["Một cột trong bảng dữ liệu được gọi là gì?", "Trường (field) — một thuộc tính của đối tượng", "Bản ghi của bảng", "Một bảng dữ liệu khác", "Ví dụ các trường của Học sinh: MãHS, HọTên, NgàySinh, Lớp."],
    ["Khoá chính (primary key) của một bảng có yêu cầu gì?", "Giá trị duy nhất, không trùng và không được rỗng", "Có thể trùng nhau thoải mái", "Luôn phải là họ tên người dùng", "Khoá chính thường là mã định danh như MãHS, MãSách để phân biệt từng bản ghi."],
    ["Khoá ngoài (foreign key) có vai trò gì?", "Liên kết bảng này với khoá chính của bảng khác", "Mã hoá toàn bộ dữ liệu trong bảng", "Tự động sắp xếp mọi bản ghi", "Khoá ngoài tạo mối quan hệ giữa các bảng, ví dụ Lớp của Học sinh tham chiếu tới bảng Lớp học."],
    ["Vì sao một bảng cần có khoá chính?", "Để phân biệt từng bản ghi và làm đầu mối liên kết", "Để bảng trông đẹp hơn khi in", "Để tăng dung lượng của bảng", "Không có khoá chính, hai bản ghi trùng nhau hoàn toàn sẽ không phân biệt được."],
    ["Ngôn ngữ SQL dùng để làm gì trong CSDL?", "Truy vấn, thêm, sửa, xoá và quản lí dữ liệu trong CSDL", "Vẽ giao diện cho trang web", "Nén tệp dữ liệu cho nhẹ đi", "SQL là ngôn ngữ chuẩn làm việc với CSDL quan hệ, dùng chung cho nhiều hệ quản trị CSDL."],
    ["Câu lệnh SQL nào dùng để lấy dữ liệu từ một bảng?", "SELECT", "DELETE", "CREATE", "Dạng cơ bản: __SELECT cột FROM bảng WHERE điều kiện__."],
    ["Trong SQL, mệnh đề WHERE có tác dụng gì?", "Lọc các bản ghi thoả điều kiện cho trước", "Sắp xếp kết quả truy vấn", "Đếm số bảng trong CSDL", "Ví dụ: __WHERE Diem >= 5__ chỉ lấy các bản ghi có điểm từ 5 trở lên."],
    ["Trong SQL, mệnh đề ORDER BY có tác dụng gì?", "Sắp xếp kết quả truy vấn theo một hoặc nhiều cột", "Lọc bản ghi theo điều kiện", "Tạo bảng dữ liệu mới", "ORDER BY mặc định sắp tăng dần (ASC); DESC là sắp giảm dần."],
    ["Từ khoá DISTINCT trong SQL có tác dụng gì?", "Loại bỏ các dòng kết quả trùng nhau", "Nhân đôi số dòng kết quả", "Đổi tên cột trong kết quả", "Ví dụ __SELECT DISTINCT Lop__ cho danh sách các lớp không trùng lặp."],
    ["Hàm COUNT trong SQL dùng để làm gì?", "Đếm số bản ghi thoả điều kiện", "Tính tổng một cột số", "Tính giá trị trung bình", "SUM tính tổng, AVG tính trung bình, MAX/MIN cho giá trị lớn nhất/nhỏ nhất."],
    ["Câu lệnh SQL nào dùng để thêm một bản ghi mới vào bảng?", "INSERT INTO", "UPDATE", "SELECT", "UPDATE sửa bản ghi đã có; DELETE xoá bản ghi khỏi bảng."],
    ["Câu lệnh SQL nào dùng để sửa dữ liệu đã có trong bảng?", "UPDATE … SET … WHERE …", "INSERT INTO", "CREATE TABLE", "Thiếu WHERE trong UPDATE hoặc DELETE sẽ tác động lên mọi bản ghi — lỗi rất nguy hiểm."],
    ["Toán tử LIKE trong SQL thường dùng để làm gì?", "Tìm chuỗi theo mẫu, dùng % thay cho nhiều kí tự", "So sánh hai số nguyên bằng nhau", "Sắp xếp chuỗi theo bảng chữ cái", "Ví dụ: __HoTen LIKE ‘N%’__ tìm họ tên bắt đầu bằng chữ N."],
    ["Toán tử BETWEEN trong SQL có ý nghĩa gì?", "Kiểm tra giá trị nằm trong một khoảng cho trước", "Nối hai bảng lại với nhau", "Chia một cột thành hai cột", "Ví dụ: __Diem BETWEEN 5 AND 8__ tương đương Diem >= 5 và Diem <= 8."],
    ["Điều kiện kết hợp AND và OR trong WHERE khác nhau thế nào?", "AND: cả hai cùng đúng; OR: chỉ cần một điều kiện đúng", "AND và OR hoàn toàn giống nhau", "OR yêu cầu cả hai cùng đúng", "Khi kết hợp nhiều điều kiện nên dùng dấu ngoặc để tránh hiểu nhầm thứ tự ưu tiên."],
    ["Truy vấn (query) trong CSDL là gì?", "Câu hỏi khai thác dữ liệu được DBMS thực hiện và trả kết quả", "Một bảng dữ liệu được in ra giấy", "Một tệp sao lưu của CSDL", "Kết quả truy vấn là một bảng tạm gồm các bản ghi thoả yêu cầu."],
    ["Vì sao nên tách dữ liệu thành nhiều bảng liên kết thay vì một bảng lớn?", "Giảm trùng lặp, tránh sai lệch khi cập nhật dữ liệu", "Để CSDL có càng nhiều bảng càng tốt", "Để việc truy vấn luôn chậm hơn", "Ví dụ tách bảng Lớp riêng giúp sửa tên lớp một lần thay vì sửa ở mọi học sinh."],
    ["Tính toàn vẹn dữ liệu trong CSDL có nghĩa là gì?", "Dữ liệu đúng, nhất quán và tuân theo các ràng buộc đặt ra", "Dữ liệu được sao chép thành nhiều bản giống nhau", "Dữ liệu luôn được in ra đầy đủ", "Ràng buộc khoá chính, khoá ngoài giúp DBMS tự động bảo vệ tính toàn vẹn tham chiếu."],
    ["Người quản trị CSDL (DBA) đảm nhiệm công việc chính nào?", "Thiết kế, cấp quyền, sao lưu, bảo đảm CSDL an toàn", "Chỉ nhập dữ liệu hằng ngày", "Chỉ sửa máy in của cơ quan", "Quản trị CSDL là một nhóm nghề quan trọng trong lĩnh vực tin học."],
    ["Khi thiết kế trường dữ liệu, việc chọn đúng kiểu dữ liệu có ích gì?", "Tiết kiệm bộ nhớ, kiểm tra đúng và tính toán chính xác", "Không ảnh hưởng gì tới dữ liệu", "Chỉ để trang trí cho bảng", "Ví dụ: điểm nên là kiểu số, ngày sinh là kiểu ngày tháng, mã là kiểu chuỗi."]
  ];
  var th11t2P = [["SELECT", "Lấy dữ liệu từ bảng"], ["WHERE", "Lọc bản ghi theo điều kiện"], ["ORDER BY", "Sắp xếp kết quả truy vấn"], ["INSERT INTO", "Thêm bản ghi mới"], ["UPDATE", "Sửa bản ghi đã có"], ["COUNT", "Đếm số bản ghi"], ["Khoá chính", "Định danh duy nhất bản ghi"], ["Khoá ngoài", "Liên kết giữa hai bảng"]];
  var th11t3F = [
    ["Ứng xử văn hoá trên môi trường số yêu cầu điều gì trước hết?", "Tôn trọng người khác, giao tiếp lịch sự như ngoài đời thật", "Được tự do xúc phạm vì là thế giới ảo", "Ẩn danh thì không cần chịu trách nhiệm", "Mọi hành vi trên mạng đều để lại dấu vết và chịu trách nhiệm trước pháp luật."],
    ["Bản quyền đối với tác phẩm, phần mềm trên mạng có nghĩa là gì?", "Có quyền với tác phẩm; dùng phải xin phép, ghi nguồn", "Mọi thứ trên mạng đều thuộc về mọi người", "Tải được về là thành của mình", "Luật Sở hữu trí tuệ bảo vệ quyền tác giả; vi phạm có thể bị xử phạt và bồi thường."],
    ["Hành vi nào sau đây vi phạm bản quyền?", "Sao chép, phát tán phần mềm, phim, sách không phép", "Mua bản quyền phần mềm để dùng", "Trích dẫn ngắn có ghi rõ nguồn", "Trích dẫn hợp lí phục vụ học tập, có ghi nguồn, khác với sao chép phát tán trái phép."],
    ["Khi dùng ảnh, nhạc của người khác trong bài làm, cần làm gì?", "Ghi rõ nguồn, chỉ dùng trong phạm vi được phép", "Không cần ghi nguồn nếu là bài tập", "Đổi tên tệp là thành của mình", "Ghi nguồn thể hiện tôn trọng tác giả và là yêu cầu của văn hoá học thuật."],
    ["Mạng xã hội mang lại lợi ích nào khi dùng đúng cách?", "Kết nối, học tập, chia sẻ thông tin hữu ích", "Bảo mật tuyệt đối mọi thông tin", "Thay thế hoàn toàn việc học ở trường", "Mạng xã hội cũng tiềm ẩn tin giả, lừa đảo và bắt nạt trực tuyến nếu thiếu tỉnh táo."],
    ["Tin giả trên mạng xã hội cần được xử lí thế nào?", "Kiểm chứng từ nguồn chính thống trước khi tin, chia sẻ", "Chia sẻ ngay để mọi người cùng biết", "Tin nếu có nhiều người chia sẻ", "Kiểm chứng chéo nhiều nguồn uy tín là thói quen của công dân số văn minh."],
    ["Bắt nạt trực tuyến (cyberbullying) là hành vi thế nào?", "Xúc phạm, đe doạ, bêu xấu người khác qua mạng lặp lại", "Tranh luận lịch sự về một vấn đề", "Nhắn tin hỏi bài với bạn bè", "Nạn nhân cần lưu bằng chứng, chặn, báo cáo và nhờ người lớn, nhà trường hỗ trợ."],
    ["Chia sẻ thông tin cá nhân của người khác khi chưa được đồng ý là hành vi gì?", "Xâm phạm quyền riêng tư, có thể vi phạm pháp luật", "Hành vi hoàn toàn bình thường", "Chỉ vi phạm khi người đó biết", "Ảnh, số điện thoại, địa chỉ của người khác đều là thông tin cần được tôn trọng."],
    ["Quy tắc ứng xử khi tranh luận trên mạng là gì?", "Tranh luận vào ý kiến, không công kích cá nhân", "Dùng lời lẽ nặng nề để thắng tranh luận", "Kéo nhiều người vào xúc phạm đối phương", "Khác quan điểm là bình thường; giữ lịch sự giúp tranh luận có ích cho mọi bên."],
    ["“Dấu chân số” của mỗi người trên mạng có đặc điểm gì?", "Khó xoá hết, tồn tại lâu và ảnh hưởng tới uy tín cá nhân", "Tự biến mất sau một ngày", "Không ai có thể nhìn thấy", "Nhà tuyển dụng, nhà trường có thể tham khảo hoạt động công khai trên mạng của mỗi người."],
    ["Đăng ảnh, video quay người khác lên mạng cần lưu ý điều gì?", "Xin phép người trong ảnh, tránh nội dung xúc phạm, riêng tư", "Cứ đăng nếu ảnh chụp ở nơi công cộng", "Không cần quan tâm cảm xúc người khác", "Ghép ảnh, chế ảnh xúc phạm người khác có thể bị xử lí theo pháp luật."],
    ["Sử dụng mạng xã hội an toàn cho học sinh gồm những việc nào?", "Đặt quyền riêng tư, kết bạn chọn lọc, không gặp người lạ", "Chấp nhận mọi lời mời kết bạn", "Công khai lịch trình và vị trí thường xuyên", "Không chia sẻ ảnh nhạy cảm và tuyệt đối không gửi cho người lạ trên mạng."],
    ["Khi bị người lạ trên mạng dụ dỗ, đe doạ, học sinh cần làm gì?", "Lưu bằng chứng, ngừng liên lạc, báo người lớn tin cậy", "Làm theo yêu cầu vì sợ lộ chuyện", "Tự giải quyết một mình trong bí mật", "Kẻ xấu lợi dụng tâm lí sợ hãi; báo sớm cho người tin cậy là cách tự bảo vệ tốt nhất."],
    ["Văn hoá bình luận trên mạng thể hiện ở điểm nào?", "Bình luận có nội dung, lịch sự, đúng chủ đề", "Bình luận càng gay gắt càng nổi bật", "Spam bình luận lặp lại nhiều lần", "Bình luận văn minh xây dựng cộng đồng mạng lành mạnh cho mọi người."],
    ["Chia sẻ mật khẩu tài khoản cho bạn bè thân có nên không?", "Không — mật khẩu là bí mật cá nhân, kể cả với bạn thân", "Nên, để bạn giúp khi quên mật khẩu", "Chỉ chia sẻ mật khẩu ít quan trọng", "Nhiều vụ mất tài khoản, lộ thông tin bắt đầu từ việc chia sẻ mật khẩu cho người quen."],
    ["Hành vi nào bị Luật An ninh mạng nghiêm cấm?", "Xuyên tạc, vu khống, xâm nhập trái phép hệ thống thông tin", "Học tập và làm việc trực tuyến", "Mua sắm trực tuyến hợp pháp", "Vi phạm trên không gian mạng bị xử lí như vi phạm ngoài đời thực."],
    ["Khi phát hiện thông tin sai sự thật về mình trên mạng, nên làm gì?", "Lưu bằng chứng, yêu cầu gỡ bỏ, báo nền tảng, cơ quan", "Đáp trả bằng thông tin sai về đối phương", "Im lặng chịu đựng mọi hậu quả", "Phản ứng đúng pháp luật giúp bảo vệ danh dự và ngăn thông tin sai lan rộng."],
    ["Tôn trọng bản quyền khi làm video đăng lên mạng cần chú ý gì?", "Dùng nhạc, ảnh có phép hoặc nguồn miễn phí bản quyền", "Dùng nhạc nổi tiếng nào cũng được", "Chỉ cần ghi tên ca sĩ là đủ phép", "Nhiều nền tảng tự động phát hiện và gỡ video vi phạm bản quyền nhạc, hình ảnh."],
    ["Nghiện mạng xã hội gây ra những tác hại nào?", "Giảm tập trung học tập, hại sức khoẻ, rối loạn giấc ngủ", "Không có tác hại gì đáng kể", "Giúp kết quả học tập luôn tốt hơn", "Tự giới hạn thời gian dùng mạng và cân bằng hoạt động ngoài trời là lối sống số lành mạnh."],
    ["Thông tin trên mạng cần được đánh giá độ tin cậy dựa vào đâu?", "Nguồn đăng, tác giả, thời gian và đối chiếu nhiều nguồn khác", "Số lượt thích và lượt chia sẻ", "Ảnh minh hoạ trông chuyên nghiệp", "Tin từ cơ quan, báo chí chính thống đáng tin hơn tin vô danh trên mạng xã hội."],
    ["Ứng xử khi được thêm vào nhóm chat có nội dung xấu, độc hại?", "Rời nhóm, không tiếp tay chia sẻ, báo người quản lí nếu cần", "Ở lại xem và chia sẻ tiếp cho vui", "Kéo thêm bạn bè vào nhóm", "Không tiếp tay lan truyền nội dung độc hại là trách nhiệm của mỗi người dùng mạng."],
    ["Quyền được bảo vệ thông tin cá nhân trên mạng thuộc về ai?", "Mọi công dân, kể cả trẻ em và học sinh", "Chỉ người trưởng thành mới có", "Chỉ người nổi tiếng mới có", "Pháp luật bảo vệ dữ liệu cá nhân; tổ chức thu thập phải có mục đích và được đồng ý."],
    ["Khi tạo tài khoản mạng xã hội, thông tin nào nên để ở chế độ riêng tư?", "Ngày sinh đầy đủ, địa chỉ, trường lớp và số điện thoại", "Biệt danh dùng trên mạng", "Sở thích phim ảnh chung chung", "Thông tin định danh chi tiết giúp kẻ xấu mạo danh và tìm tới tận nơi."],
    ["Đạo đức trong môi trường số còn thể hiện ở việc nào sau đây?", "Không lợi dụng ẩn danh làm việc xấu, chịu trách nhiệm", "Dùng nhiều tài khoản ảo để công kích người khác", "Sao chép bài của bạn rồi nhận là của mình", "Danh dự và uy tín trên mạng gắn liền với con người thật ở ngoài đời."]
  ];
  var th11t3P = [["Bản quyền", "Quyền của tác giả với tác phẩm"], ["Quyền riêng tư", "Thông tin cá nhân được bảo vệ"], ["Tin giả", "Thông tin sai cần kiểm chứng"], ["Bắt nạt trực tuyến", "Xúc phạm người khác qua mạng"], ["Dấu chân số", "Dữ liệu để lại khi hoạt động online"], ["Trích dẫn nguồn", "Ghi rõ tác giả khi sử dụng"], ["Quyền riêng tư bạn bè", "Không chia sẻ tin khi chưa đồng ý"]];
  var th11t4F = [
    ["Mô hình CSDL quan hệ do ai đề xuất và dựa trên cấu trúc nào?", "E. F. Codd đề xuất, dựa trên các bảng quan hệ", "Dựa trên các thư mục cây", "Dựa trên các trang văn bản", "Mô hình quan hệ ra đời năm 1970 và là mô hình CSDL phổ biến nhất hiện nay."],
    ["Trong CSDL quan hệ, mỗi bảng tương ứng với khái niệm nào?", "Một quan hệ — tập hợp các bộ (hàng) cùng cấu trúc", "Một thư mục chứa tệp", "Một trang tính độc lập", "Mỗi cột là một thuộc tính của quan hệ, mỗi hàng là một bộ giá trị cụ thể."],
    ["Thuộc tính (attribute) trong CSDL quan hệ là gì?", "Một cột của bảng, mô tả một đặc tính của đối tượng", "Một hàng của bảng dữ liệu", "Tên của toàn bộ CSDL", "Mỗi thuộc tính có một miền giá trị và một kiểu dữ liệu xác định."],
    ["Miền giá trị của một thuộc tính có nghĩa là gì?", "Tập các giá trị hợp lệ mà thuộc tính có thể nhận", "Tên gọi khác của khoá chính", "Số hàng tối đa của bảng", "Ví dụ miền giá trị của Điểm là các số từ 0 đến 10."],
    ["Khoá của một quan hệ (bảng) là gì?", "Tập thuộc tính phân biệt được mọi bộ trong quan hệ", "Mật khẩu mở CSDL", "Một cột bất kì của bảng", "Một quan hệ có thể có nhiều khoá dự tuyển, trong đó chọn một làm khoá chính."],
    ["Khoá dự tuyển (candidate key) khác khoá chính ở điểm nào?", "Là khoá có thể chọn làm khoá chính nhưng chưa được chọn", "Là khoá bị trùng giá trị", "Là khoá ngoài của bảng khác", "Khoá chính là một khoá dự tuyển được người thiết kế lựa chọn."],
    ["Ràng buộc khoá chính trên một bảng gồm những yêu cầu nào?", "Không trùng giá trị và không để trống (NOT NULL)", "Bắt buộc phải là kiểu số nguyên", "Phải gồm đúng hai cột", "DBMS tự động kiểm tra ràng buộc này mỗi khi thêm hoặc sửa bản ghi."],
    ["Khoá ngoài phải tham chiếu tới thành phần nào của bảng được liên kết?", "Khoá chính (hoặc khoá dự tuyển) của bảng đó", "Bất kì cột nào của bảng đó", "Hàng đầu tiên của bảng đó", "Giá trị khoá ngoài phải có trong bảng được tham chiếu hoặc để trống nếu cho phép."],
    ["Toàn vẹn tham chiếu có nghĩa là gì?", "Mọi giá trị khoá ngoài đều tồn tại ở bảng được tham chiếu", "Mọi bảng đều có cùng số hàng", "Mọi cột đều không được trống", "Vi phạm toàn vẹn tham chiếu tạo ra bản ghi “mồ côi” không liên kết được với bảng cha."],
    ["Vì sao không nên lưu họ tên học sinh lặp lại trong bảng Điểm?", "Gây trùng lặp, sửa một nơi dễ sai lệch với nơi khác", "Vì bảng Điểm không được chứa chữ", "Vì họ tên quá dài không lưu được", "Bảng Điểm chỉ cần MãHS (khoá ngoài) và điểm; họ tên tra cứu từ bảng Học sinh."],
    ["Chuẩn hoá CSDL nhằm mục đích chính nào?", "Giảm trùng lặp và tránh dị thường khi cập nhật dữ liệu", "Làm CSDL có thật nhiều bảng", "Tăng tốc độ nhập liệu bằng tay", "Chuẩn hoá tách bảng theo các phụ thuộc hàm để mỗi sự kiện chỉ lưu một nơi."],
    ["Dị thường cập nhật trong bảng chưa chuẩn hoá là hiện tượng gì?", "Sửa một sự kiện phải sửa nhiều nơi, sót sẽ gây mâu thuẫn", "Bảng tự động cập nhật mọi nơi", "Dữ liệu tự nhân lên khi truy vấn", "Ví dụ đổi tên lớp phải sửa ở hàng trăm học sinh là dị thường cập nhật điển hình."],
    ["Dạng chuẩn 1 (1NF) yêu cầu điều gì ở các thuộc tính?", "Mỗi ô chỉ chứa một giá trị đơn, không chứa danh sách", "Mọi bảng phải có đúng một cột", "Mọi thuộc tính đều là khoá", "Ví dụ ô chứa nhiều số điện thoại cách nhau bởi dấu phẩy là vi phạm 1NF."],
    ["Khi một học sinh có nhiều số điện thoại, cách thiết kế đúng chuẩn là gì?", "Tách bảng Điện thoại riêng, liên kết bằng khoá ngoài MãHS", "Ghi tất cả số vào một ô duy nhất", "Thêm cột ĐiệnThoai1, ĐiệnThoai2 tuỳ ý", "Tách bảng riêng giúp số lượng số điện thoại không bị giới hạn cứng bởi số cột."],
    ["Mối quan hệ một–nhiều giữa hai bảng được thể hiện bằng cách nào?", "Đặt khoá chính của bảng “một” làm khoá ngoài ở bảng “nhiều”", "Gộp hai bảng thành một bảng duy nhất", "Sao chép toàn bộ bảng “một” vào bảng “nhiều”", "Ví dụ: một Lớp có nhiều Học sinh, nên bảng Học sinh chứa khoá ngoài MãLớp."],
    ["Mối quan hệ nhiều–nhiều giữa Học sinh và Môn học được xử lí thế nào?", "Tạo bảng trung gian chứa khoá ngoài của cả hai bảng", "Đặt khoá ngoài qua lại trong cả hai bảng", "Không thể biểu diễn trong CSDL quan hệ", "Bảng trung gian Điểm chứa MãHS, MãMôn và điểm — mỗi hàng là một lần ghi điểm."],
    ["Câu lệnh SQL tạo một bảng mới là câu lệnh nào?", "CREATE TABLE", "INSERT INTO", "SELECT FROM", "Khi CREATE TABLE cần khai báo tên cột, kiểu dữ liệu và các ràng buộc như PRIMARY KEY."],
    ["Trong SQL, kiểu dữ liệu nào phù hợp để lưu điểm số thập phân?", "Số thực (REAL/FLOAT/DECIMAL)", "Kiểu ngày tháng (DATE)", "Kiểu luận lí (BOOLEAN)", "Chọn kiểu dữ liệu đúng giúp tính toán chính xác và DBMS kiểm tra được giá trị nhập."],
    ["Mệnh đề GROUP BY trong SQL dùng để làm gì?", "Nhóm các bản ghi theo giá trị cột để thống kê theo nhóm", "Sắp xếp kết quả giảm dần", "Nối hai bảng với nhau", "GROUP BY thường đi cùng COUNT, SUM, AVG để tính theo từng nhóm như từng lớp."],
    ["Mệnh đề HAVING trong SQL khác WHERE ở điểm nào?", "HAVING lọc theo điều kiện trên nhóm sau khi GROUP BY", "HAVING dùng để sắp xếp kết quả", "HAVING thay thế hoàn toàn FROM", "WHERE lọc từng hàng trước khi nhóm; HAVING lọc các nhóm sau khi đã thống kê."],
    ["Phép nối (JOIN) giữa hai bảng trong SQL có tác dụng gì?", "Ghép dữ kiện từ nhiều bảng theo điều kiện liên kết khoá", "Xoá các bản ghi trùng nhau", "Tạo chỉ mục cho bảng", "Ví dụ nối Học sinh với Lớp qua MãLớp để hiển thị tên lớp cạnh tên học sinh."],
    ["Điều kiện nối trong JOIN thường dựa trên cặp cột nào?", "Khoá ngoài của bảng này bằng khoá chính của bảng kia", "Hai cột họ tên giống nhau", "Hai cột đầu tiên của hai bảng", "Nối sai điều kiện sẽ cho kết quả thừa hoặc thiếu bản ghi."],
    ["HeidiSQL là công cụ dùng để làm gì?", "Phần mềm đồ hoạ làm việc với CSDL MySQL/MariaDB", "Phần mềm chỉnh sửa ảnh chuyên nghiệp", "Trình duyệt web cho máy tính", "HeidiSQL cho phép tạo bảng, nhập dữ liệu và chạy câu lệnh SQL bằng giao diện trực quan."],
    ["Trong HeidiSQL, việc tạo bảng mới thường bắt đầu bằng thao tác nào?", "Chọn CSDL, tạo bảng, khai báo các cột và kiểu dữ liệu", "Viết ngay câu truy vấn SELECT", "Xuất toàn bộ CSDL ra tệp", "Sau khi khai báo cột, cần chọn khoá chính cho bảng trước khi lưu."],
    ["Khi nhập dữ liệu trực tiếp trong HeidiSQL, cần chú ý điều gì?", "Đúng kiểu, đúng ràng buộc khoá, tránh trùng khoá", "Nhập giá trị nào cũng được chấp nhận", "Không cần quan tâm tới khoá ngoài", "Vi phạm ràng buộc sẽ bị DBMS từ chối và báo lỗi — đó là cơ chế bảo vệ dữ liệu."],
    ["Xuất (export) CSDL trong HeidiSQL thường dùng để làm gì?", "Sao lưu CSDL thành tệp SQL để khôi phục khi cần", "Tăng tốc độ truy vấn của CSDL", "Đổi tên các bảng trong CSDL", "Tệp xuất chứa cả cấu trúc bảng và dữ liệu, dùng để chuyển CSDL sang máy khác."],
    ["Chỉ mục (index) trong CSDL có tác dụng chính nào?", "Tăng tốc tìm kiếm trên cột được đánh chỉ mục", "Tự động sao lưu toàn bộ CSDL", "Mã hoá dữ liệu trong bảng", "Chỉ mục giống mục lục sách: tìm nhanh hơn nhưng tốn thêm bộ nhớ và chậm ghi một chút."]
  ];
  var th11t4P = [["Khoá chính", "Không trùng, không rỗng"], ["Khoá ngoài", "Tham chiếu khoá chính bảng khác"], ["Chuẩn hoá", "Giảm trùng lặp dữ liệu"], ["GROUP BY", "Thống kê theo nhóm"], ["HAVING", "Lọc nhóm sau khi thống kê"], ["JOIN", "Ghép dữ liệu nhiều bảng"], ["HeidiSQL", "Công cụ đồ hoạ quản trị MySQL"], ["Chỉ mục", "Tăng tốc tìm kiếm dữ liệu"]];
  var th11t5F = [
    ["Chủ đề Hướng nghiệp với tin học ở lớp 11 tập trung vào những nhóm nghề nào?", "Nhóm nghề quản trị và nhóm nghề thiết kế trong tin học", "Nhóm nghề y tế và dược phẩm", "Nhóm nghề nông nghiệp công nghệ cao", "Hiểu nhóm nghề giúp học sinh định hướng học tập và chọn ngành ở bậc học tiếp theo."],
    ["Người quản trị CSDL (DBA) làm những công việc chính nào?", "Thiết kế, vận hành, sao lưu và bảo mật CSDL của tổ chức", "Thiết kế logo cho doanh nghiệp", "Bán thiết bị máy tính tại cửa hàng", "DBA chịu trách nhiệm để dữ liệu — tài sản quan trọng của tổ chức — luôn sẵn sàng và an toàn."],
    ["Quản trị mạng là công việc đảm nhiệm việc gì?", "Cài đặt, vận hành và bảo trì hệ thống mạng của tổ chức", "Soạn nội dung cho mạng xã hội", "Lập trình trò chơi di động", "Quản trị mạng cần hiểu hệ điều hành máy chủ, thiết bị mạng và bảo mật."],
    ["Quản trị hệ thống thông tin trong doanh nghiệp gồm việc gì?", "Vận hành phần mềm, tài khoản, phân quyền cho người dùng", "Chỉ sửa chữa phần cứng máy tính", "Chỉ nhập dữ liệu bán hàng", "Quản trị hệ thống giúp hoạt động của tổ chức không bị gián đoạn vì sự cố CNTT."],
    ["Chuyên viên an toàn thông tin thuộc nhóm nghề nào và làm gì?", "Nhóm quản trị — bảo vệ hệ thống, phòng chống tấn công mạng", "Nhóm thiết kế — vẽ giao diện sản phẩm", "Nhóm bán hàng — tư vấn thiết bị", "Nhu cầu nhân lực an toàn thông tin tăng mạnh khi mọi tổ chức đều chuyển đổi số."],
    ["Nhóm nghề thiết kế trong tin học tạo ra những sản phẩm nào?", "Giao diện web/app, đồ hoạ, ảnh và video truyền thông số", "Hệ thống máy chủ của doanh nghiệp", "Đường truyền mạng nội bộ", "Thiết kế trong tin học kết hợp thẩm mĩ với công cụ phần mềm chuyên dụng."],
    ["Thiết kế đồ hoạ (graphic designer) cần năng lực nổi bật nào?", "Thẩm mĩ, sáng tạo và thành thạo phần mềm đồ hoạ", "Chỉ cần sức khoẻ thể lực tốt", "Chỉ cần giỏi lập trình hệ thống", "Sản phẩm của nghề này: logo, poster, bao bì, hình ảnh truyền thông."],
    ["Thiết kế giao diện người dùng (UI/UX) tập trung vào điều gì?", "Giao diện đẹp, dễ dùng và trải nghiệm tốt cho người dùng", "Tối ưu tốc độ của máy chủ", "Quản lí tài khoản người dùng nội bộ", "UI lo phần hình thức giao diện, UX lo trải nghiệm và hành trình sử dụng sản phẩm."],
    ["Người làm nghề chỉnh sửa ảnh, dựng video cần kĩ năng gì?", "Dùng phần mềm ảnh/video, kể chuyện bằng hình ảnh", "Chỉ cần biết quay phim bằng điện thoại", "Không cần hiểu bố cục hình ảnh", "Nghề này phục vụ quảng cáo, truyền thông, giải trí và giáo dục số."],
    ["Để làm nghề quản trị CSDL, kiến thức nền quan trọng nhất là gì?", "CSDL quan hệ, SQL và quản trị hệ CSDL", "Kiến thức vẽ tranh màu nước", "Kiến thức kế toán tài chính", "Bài học về CSDL ở lớp 11 chính là nền tảng trực tiếp cho nhóm nghề quản trị dữ liệu."],
    ["Để theo nhóm nghề thiết kế số, học sinh nên rèn luyện gì từ phổ thông?", "Phần mềm đồ hoạ, tư duy thẩm mĩ và xây dựng sản phẩm mẫu", "Chỉ học thuộc lí thuyết tin học", "Chỉ rèn tốc độ gõ phím", "Hồ sơ sản phẩm (portfolio) là bằng chứng năng lực quan trọng của nghề thiết kế."],
    ["Điểm chung của các nghề trong lĩnh vực tin học là gì?", "Công nghệ đổi nhanh, phải tự học và cập nhật suốt đời", "Học một lần là dùng cả đời không đổi", "Không cần làm việc nhóm", "Tự học là năng lực sống còn vì công cụ và công nghệ thay đổi liên tục."],
    ["Khi tìm hiểu một nghề tin học, học sinh nên tìm hiểu những gì?", "Việc làm cụ thể, yêu cầu năng lực, nơi đào tạo, triển vọng", "Chỉ cần biết tên tiếng Anh của nghề", "Chỉ cần biết mức lương khởi điểm", "Hiểu rõ nghề giúp tự đánh giá sự phù hợp và lập lộ trình học tập."],
    ["Nơi đào tạo các nghề tin học phổ biến gồm những loại hình nào?", "Đại học, cao đẳng, trung cấp và các khoá đào tạo nghề", "Chỉ có một trường đại học duy nhất", "Chỉ học qua kinh nghiệm tự do", "Nhiều nghề thiết kế, quản trị hệ thống có thể bắt đầu từ bậc cao đẳng, trung cấp."],
    ["Kĩ năng mềm nào quan trọng với cả nhóm quản trị và thiết kế?", "Giao tiếp, làm việc nhóm và trình bày ý tưởng", "Chỉ cần giỏi chuyên môn cá nhân", "Không cần giao tiếp với khách hàng", "Dự án tin học luôn làm theo nhóm và phục vụ khách hàng, người dùng cụ thể."],
    ["Đạo đức nghề nghiệp trong tin học thể hiện rõ nhất ở việc nào?", "Bảo vệ dữ liệu người dùng, tôn trọng bản quyền sản phẩm", "Sao chép sản phẩm của đồng nghiệp", "Truy cập trái phép dữ liệu được giao quản lí", "Người quản trị nắm nhiều quyền truy cập nên đạo đức nghề nghiệp đặc biệt quan trọng."],
    ["Xu hướng nào đang tác động mạnh tới các nghề tin học hiện nay?", "Trí tuệ nhân tạo, dữ liệu lớn và điện toán đám mây", "Đánh máy thuê văn bản giấy", "Sửa chữa tivi và radio", "Người lao động tin học cần biết dùng công cụ AI như một trợ thủ thay vì lo bị thay thế hoàn toàn."],
    ["Freelancer trong nghề thiết kế đồ hoạ làm việc theo hình thức nào?", "Nhận dự án tự do, thu nhập theo sản phẩm và hợp đồng", "Làm công chức hưởng lương cố định", "Không cần sản phẩm mẫu khi nhận việc", "Hình thức tự do linh hoạt nhưng đòi hỏi tự quản lí thời gian và khách hàng."],
    ["Học sinh yêu thích CSDL và tính cẩn thận, tỉ mỉ phù hợp với nghề nào?", "Quản trị CSDL và quản trị hệ thống thông tin", "Thiết kế thời trang sân khấu", "Dựng phim quảng cáo", "Tính cách cẩn thận, logic là lợi thế lớn cho nhóm nghề quản trị dữ liệu."],
    ["Học sinh yêu thích vẽ, màu sắc và hình ảnh phù hợp với nghề nào?", "Thiết kế đồ hoạ và chỉnh sửa ảnh, làm video", "Quản trị mạng doanh nghiệp", "Quản trị CSDL ngân hàng", "Đam mê hình ảnh kết hợp công cụ số mở ra nhiều nghề trong truyền thông số."],
    ["Chứng chỉ nghề nghiệp trong tin học có ý nghĩa gì?", "Chứng minh năng lực theo chuẩn, hỗ trợ xin việc làm", "Thay thế hoàn toàn bằng cấp và kinh nghiệm", "Không có giá trị tuyển dụng nào", "Chứng chỉ về mạng, CSDL, đám mây của các hãng lớn được nhiều nhà tuyển dụng công nhận."],
    ["Bước đầu tiên để định hướng nghề tin học hiệu quả là gì?", "Tự đánh giá sở thích, năng lực của bản thân", "Chọn nghề theo bạn bè cho vui", "Chọn nghề đang “hot” mà không tìm hiểu", "Tự đánh giá đúng giúp chọn lộ trình học phù hợp và bền vững."]
  ];
  var th11t5P = [["Quản trị CSDL", "Vận hành, bảo mật cơ sở dữ liệu"], ["Quản trị mạng", "Vận hành hệ thống mạng tổ chức"], ["An toàn thông tin", "Bảo vệ hệ thống, chống tấn công"], ["Thiết kế đồ hoạ", "Logo, poster, ấn phẩm truyền thông"], ["Thiết kế UI/UX", "Giao diện và trải nghiệm người dùng"], ["Portfolio", "Hồ sơ sản phẩm chứng minh năng lực"], ["Chứng chỉ nghề", "Chứng minh năng lực theo chuẩn"]];
  var th11k6F = [
    ["Mảng một chiều trong lập trình có đặc điểm gì?", "Dãy phần tử cùng kiểu, truy cập bằng chỉ số", "Chỉ lưu được đúng một giá trị", "Các phần tử không có thứ tự", "Trong Python, danh sách (list) thường được dùng như mảng một chiều, chỉ số bắt đầu từ 0."],
    ["Phần tử đầu tiên của danh sách a trong Python có chỉ số mấy?", "Chỉ số 0 — viết là a[0]", "Chỉ số 1 — viết là a[1]", "Chỉ số -1", "Phần tử cuối cùng có chỉ số len(a) - 1 hoặc viết tắt là a[-1]."],
    ["Mảng hai chiều thường được dùng để lưu dữ liệu dạng nào?", "Bảng số liệu có hàng và cột như thời khoá biểu, ma trận", "Một dãy số duy nhất", "Một chuỗi kí tự đơn", "Trong Python, mảng hai chiều là danh sách của các danh sách; phần tử ở hàng i cột j là a[i][j]."],
    ["Xâu kí tự (string) trong lập trình có đặc điểm gì?", "Dãy kí tự có chỉ số, thường không sửa trực tiếp từng kí tự", "Chỉ chứa các chữ số thập phân", "Không có độ dài xác định", "Các thao tác xâu phổ biến: nối xâu, cắt xâu, tìm xâu con, đếm kí tự."],
    ["Thuật toán sắp xếp nổi bọt (bubble sort) hoạt động thế nào?", "So sánh và đổi chỗ cặp kề nhau, phần tử lớn “nổi” về cuối", "Chia mảng làm đôi rồi trộn lại", "Chọn phần tử nhỏ nhất đưa về đầu", "Sau mỗi lượt duyệt, phần tử lớn nhất chưa sắp xếp sẽ về đúng vị trí cuối."],
    ["Thuật toán sắp xếp chọn (selection sort) hoạt động thế nào?", "Mỗi lượt chọn phần tử nhỏ nhất còn lại đưa về vị trí đầu", "Đổi chỗ mọi cặp kề nhau liên tục", "Chèn phần tử vào nửa đã sắp xếp", "Sắp xếp chọn thực hiện đúng n - 1 lần chọn cho mảng n phần tử."],
    ["Thuật toán sắp xếp chèn (insertion sort) hoạt động thế nào?", "Lấy từng phần tử chèn vào đúng vị trí trong phần đã sắp", "Chọn phần tử lớn nhất đưa về cuối", "Đảo ngược toàn bộ mảng nhiều lần", "Sắp xếp chèn hiệu quả với mảng nhỏ hoặc mảng gần như đã có thứ tự."],
    ["Tìm kiếm tuần tự (linear search) hoạt động thế nào?", "Duyệt từng phần tử từ đầu cho tới khi tìm thấy hoặc hết mảng", "Chia đôi mảng để thu hẹp phạm vi", "Chỉ kiểm tra phần tử ở giữa mảng", "Tìm kiếm tuần tự không đòi hỏi mảng phải được sắp xếp trước."],
    ["Tìm kiếm nhị phân (binary search) đòi hỏi điều kiện gì ở mảng?", "Mảng đã được sắp xếp theo thứ tự", "Mảng có toàn số nguyên tố", "Mảng có số phần tử là chẵn", "Mỗi lần so sánh với phần tử giữa, tìm kiếm nhị phân loại bỏ được một nửa mảng."],
    ["Đệ quy trong lập trình là kĩ thuật thế nào?", "Hàm tự gọi lại chính nó với bài toán nhỏ hơn", "Vòng lặp chạy vô hạn lần", "Hàm gọi một hàm khác bất kì", "Hàm đệ quy cần có trường hợp dừng (điểm neo) và phần đệ quy thu hẹp bài toán."],
    ["Trường hợp dừng (điểm neo) trong hàm đệ quy có vai trò gì?", "Kết thúc quá trình tự gọi, tránh đệ quy vô hạn", "Làm hàm đệ quy chạy nhanh hơn", "Khai báo kiểu dữ liệu cho hàm", "Thiếu điểm neo hoặc bài toán không thu hẹp sẽ gây tràn ngăn xếp (stack overflow)."],
    ["Trừu tượng hoá trong giải quyết bài toán bằng lập trình là gì?", "Bỏ chi tiết thừa, giữ đặc trưng cốt lõi để mô hình hoá", "Viết chương trình dài và chi tiết nhất có thể", "Bỏ qua hoàn toàn dữ kiện bài toán", "Trừu tượng hoá giúp nhận ra bản chất bài toán và tái sử dụng cách giải cho bài toán tương tự."],
    ["Danh sách liên kết khác mảng ở đặc điểm cơ bản nào?", "Phần tử nối bằng liên kết, không cần vùng nhớ liên tục", "Phần tử luôn nằm liên tiếp trong bộ nhớ", "Không thể thêm phần tử mới", "Chèn, xoá trong danh sách liên kết linh hoạt nhưng truy cập theo chỉ số chậm hơn mảng."],
    ["Kĩ thuật duyệt trong lập trình có nghĩa là gì?", "Xét lần lượt mọi khả năng hoặc mọi phần tử theo quy tắc", "Chỉ xét một trường hợp duy nhất", "Bỏ qua các trường hợp khó", "Duyệt toàn bộ bảo đảm không bỏ sót nghiệm nhưng có thể tốn thời gian với không gian lớn."],
    ["Độ phức tạp thuật toán cho biết điều gì?", "Mức tăng thời gian/bộ nhớ khi kích thước đầu vào tăng", "Số dòng mã của chương trình", "Số lỗi cú pháp trong chương trình", "Tìm kiếm nhị phân có độ phức tạp logarit, nhanh hơn hẳn tìm kiếm tuần tự khi dữ liệu lớn."],
    ["Khi sắp xếp mảng 6 phần tử bằng sắp xếp chọn, cần mấy lượt chọn?", "5 lượt — phần tử cuối tự về đúng vị trí", "6 lượt đầy đủ", "3 lượt là đủ", "Tổng quát: mảng n phần tử cần n - 1 lượt chọn hoặc lượt chèn/nổi bọt."],
    ["Hàm đệ quy tính giai thừa thường có điểm neo nào?", "n = 0 hoặc n = 1 thì giai thừa bằng 1", "n = 10 thì giai thừa bằng 1", "Không cần điểm neo nào", "Công thức truy hồi: n! = n × (n - 1)! với n > 1."],
    ["Dãy Fibonacci được định nghĩa đệ quy thế nào?", "F(n) = F(n-1) + F(n-2), với F(0)=0, F(1)=1", "F(n) = F(n-1) × 2 với mọi n", "F(n) = n + F(n+1)", "Đệ quy trực tiếp cho Fibonacci rất chậm vì tính lặp lại nhiều lần cùng một giá trị."],
    ["Ngăn xếp (stack) hoạt động theo nguyên tắc nào?", "Vào sau ra trước — LIFO", "Vào trước ra trước — FIFO", "Ra theo thứ tự ngẫu nhiên", "Lời gọi hàm đệ quy được quản lí bằng ngăn xếp các khung dữ liệu (call stack)."],
    ["Hàng đợi (queue) hoạt động theo nguyên tắc nào?", "Vào trước ra trước — FIFO", "Vào sau ra trước — LIFO", "Ưu tiên phần tử lớn nhất", "Hàng đợi mô phỏng xếp hàng phục vụ; ngăn xếp mô phỏng chồng đĩa chồng lên nhau."]
  ];
  var th11k6P = [["Sắp xếp nổi bọt", "Đổi chỗ cặp kề, lớn nổi về cuối"], ["Sắp xếp chọn", "Chọn nhỏ nhất đưa về đầu"], ["Sắp xếp chèn", "Chèn vào phần đã sắp xếp"], ["Tìm kiếm tuần tự", "Duyệt từng phần tử từ đầu"], ["Tìm kiếm nhị phân", "Chia đôi mảng đã sắp xếp"], ["Đệ quy", "Hàm tự gọi với bài toán nhỏ hơn"], ["Ngăn xếp", "Vào sau ra trước (LIFO)"], ["Hàng đợi", "Vào trước ra trước (FIFO)"]];
  function th11SearchGen() {
    var v = rand(0, 2);
    if (v === 0) {
      var pool = shuffle([2, 4, 6, 8, 10, 12, 14, 16, 18, 20].slice());
      var a = pool.slice(0, 6);
      var pos = rand(0, 5);
      var x = a[pos];
      return mcqQ("Tìm kiếm tuần tự giá trị " + x + " trong mảng [" + a.join(", ") + "]. Cần mấy lần so sánh mới tìm thấy?", [String(pos), String(pos + 2)], String(pos + 1), "Tìm tuần tự so sánh từ phần tử đầu; phần tử ở vị trí " + pos + " cần " + (pos + 1) + " lần so sánh.");
    }
    if (v === 1) {
      var b = [3, 7, 11, 15, 19, 23, 27];
      var idx = rand(0, 6); var y = b[idx];
      var lo = 0, hi = b.length - 1, cnt = 0;
      while (lo <= hi) { var mid = Math.floor((lo + hi) / 2); cnt++; if (b[mid] === y) break; if (b[mid] < y) lo = mid + 1; else hi = mid - 1; }
      return mcqQ("Tìm kiếm nhị phân giá trị " + y + " trong mảng đã sắp [3, 7, 11, 15, 19, 23, 27]. Cần mấy lần so sánh?", [String(cnt + 1), String(cnt === 1 ? 3 : cnt - 1)], String(cnt), "Mỗi lần so sánh với phần tử giữa rồi thu hẹp về một nửa chứa giá trị cần tìm.");
    }
    var c = shuffle([1, 3, 5, 7, 9, 11, 13].slice()).slice(0, 5);
    var s = 0; for (var i = 0; i < c.length; i++) s += c[i];
    return numBlank6("Cho mảng A = [" + c.join(", ") + "]. Tổng các phần tử của A bằng bao nhiêu?", "Tổng = ?", s, "Cộng lần lượt mọi phần tử của mảng.");
  }
  function th11RecGen() {
    var v = rand(0, 2);
    if (v === 0) {
      var n = rand(3, 6); var f = 1; for (var i = 2; i <= n; i++) f *= i;
      return numBlank6("Hàm đệ quy tính giai thừa: fact(" + n + ") với fact(0) = 1 và fact(k) = k × fact(k - 1). Kết quả bằng bao nhiêu?", "fact(" + n + ") = ?", f, n + "! = 1 × 2 × … × " + n + ".");
    }
    if (v === 1) {
      var m = rand(5, 9); var f0 = 0, f1 = 1; for (var j = 2; j <= m; j++) { var t = f0 + f1; f0 = f1; f1 = t; }
      return mcqQ("Dãy Fibonacci có F(0) = 0, F(1) = 1, F(k) = F(k-1) + F(k-2). Giá trị F(" + m + ") bằng bao nhiêu?", [String(f1 - 1), String(f1 + m)], String(f1), "Cộng hai số liền trước để được số tiếp theo trong dãy Fibonacci.");
    }
    var arr = shuffle([4, 8, 15, 16, 23, 42].slice()).slice(0, 5);
    var mx = arr[0]; for (var k = 1; k < arr.length; k++) if (arr[k] > mx) mx = arr[k];
    return mcqQ("Duyệt mảng [" + arr.join(", ") + "] để tìm giá trị lớn nhất. Kết quả là bao nhiêu?", [String(mx + 7), String(mx + 2)], String(mx), "Giữ biến max, duyệt từng phần tử và cập nhật khi gặp giá trị lớn hơn.");
  }
  var th11cdk1F = [
    ["Thiết kế thuật toán theo kĩ thuật đệ quy dựa trên ý tưởng nào?", "Chia bài toán thành bài toán con cùng dạng, nhỏ hơn", "Lặp lại một lệnh cố định nhiều lần", "Thử mọi khả năng theo thứ tự bất kì", "Đệ quy cần điểm neo cho trường hợp nhỏ nhất và công thức truy hồi cho trường hợp tổng quát."],
    ["Một hàm đệ quy đúng cần có đủ hai thành phần nào?", "Trường hợp dừng (điểm neo) và bước đệ quy thu hẹp", "Vòng lặp và biến đếm", "Mảng và chỉ số của mảng", "Thiếu một trong hai thành phần, hàm sẽ không dừng hoặc không tiến về bài toán nhỏ hơn."],
    ["Bài toán Tháp Hà Nội có quy tắc di chuyển nào?", "Mỗi lần chuyển một đĩa, đĩa lớn không đè lên đĩa nhỏ", "Chuyển nhiều đĩa cùng lúc tuỳ ý", "Đĩa lớn được đặt lên đĩa nhỏ", "Với n đĩa, số lần chuyển tối thiểu là 2^n − 1 lần."],
    ["Tháp Hà Nội với 3 đĩa cần tối thiểu bao nhiêu lần chuyển?", "7 lần", "3 lần", "6 lần", "2^3 − 1 = 7 lần; con số này tăng rất nhanh khi số đĩa tăng."],
    ["Đệ quy tính tổng S(n) = 1 + 2 + … + n có công thức nào?", "S(n) = S(n-1) + n, với S(0) = 0", "S(n) = S(n-1) × n, với S(0) = 0", "S(n) = n + n, với mọi n", "S(n-1) là bài toán con cùng dạng nhưng nhỏ hơn một đơn vị."],
    ["Kiểm chứng thuật toán đệ quy thường kiểm tra những gì?", "Đúng điểm neo, đúng bước thu hẹp và thử với giá trị nhỏ", "Chỉ kiểm tra chương trình có chạy được", "Chỉ kiểm tra tên hàm có đẹp không", "Thử tính tay với n nhỏ và đối chiếu kết quả chương trình là bước kiểm chứng cơ bản."],
    ["Vì sao đệ quy tính Fibonacci trực tiếp lại chậm với n lớn?", "Nhiều bài toán con bị tính lặp lại rất nhiều lần", "Vì Fibonacci không có điểm neo", "Vì máy tính không cộng được hai số", "Khắc phục bằng ghi nhớ kết quả đã tính (memoization) hoặc dùng vòng lặp."],
    ["Ghi nhớ (memoization) trong đệ quy có tác dụng gì?", "Lưu kết quả bài toán con để không phải tính lại", "Xoá mọi kết quả trung gian", "Biến đệ quy thành sắp xếp", "Ghi nhớ đổi thời gian tính toán lấy bộ nhớ lưu trữ thêm."],
    ["Đệ quy và vòng lặp có quan hệ thế nào?", "Mọi đệ quy đều chuyển được thành lặp nhờ ngăn xếp", "Đệ quy và lặp hoàn toàn không liên quan", "Vòng lặp luôn nhanh hơn trong mọi trường hợp", "Đệ quy thường ngắn gọn, tự nhiên với bài toán tự đồng dạng; lặp thường tiết kiệm bộ nhớ hơn."],
    ["Tràn ngăn xếp (stack overflow) trong đệ quy xảy ra khi nào?", "Đệ quy quá sâu hoặc không có điểm neo dừng", "Mảng có quá nhiều phần tử", "Chương trình in quá nhiều dòng", "Mỗi lời gọi đệ quy chiếm một khung trong ngăn xếp; gọi quá sâu sẽ vượt giới hạn bộ nhớ."],
    ["Bài toán nào sau đây rất phù hợp với cách giải đệ quy?", "Tháp Hà Nội, duyệt thư mục con, tính giai thừa", "Cộng hai số nguyên cho trước", "In một dòng chữ cố định", "Bài toán tự đồng dạng — chứa bài toán con giống hệt nhưng nhỏ hơn — là ứng viên tự nhiên của đệ quy."],
    ["Duyệt cây thư mục bằng đệ quy hoạt động dựa trên ý tưởng nào?", "Thư mục chứa thư mục con; duyệt con rồi quay lại thư mục cha", "Đọc mọi tệp theo thứ tự bảng chữ cái", "Chỉ duyệt đúng một cấp thư mục", "Cấu trúc thư mục dạng cây là ví dụ thực tế điển hình của dữ liệu đệ quy."],
    ["Trong đệ quy, “truy hồi” có nghĩa là gì?", "Biểu diễn kết quả qua kết quả của bài toán nhỏ hơn", "Quay lui thử lại phương án khác", "Lặp lại cùng một giá trị nhiều lần", "Công thức truy hồi là trái tim của một thuật toán đệ quy."],
    ["Khi thiết kế hàm đệ quy, thứ tự việc nào nên làm trước?", "Xác định điểm neo và cách thu hẹp bài toán", "Viết ngay vòng lặp chính", "Tối ưu giao diện chương trình", "Điểm neo rõ ràng giúp bước đệ quy luôn tiến về trường hợp dừng."],
    ["Giá trị của biểu thức đệ quy: f(1) = 1, f(n) = f(n-1) + 3 với f(4) là bao nhiêu?", "10", "7", "12", "f(2) = 4, f(3) = 7, f(4) = 10."],
    ["Đệ quy đuôi (tail recursion) có đặc điểm gì?", "Lời gọi đệ quy là thao tác cuối cùng của hàm", "Hàm có hai lời gọi đệ quy", "Hàm không có điểm neo", "Một số ngôn ngữ tối ưu đệ quy đuôi thành vòng lặp để tiết kiệm ngăn xếp."],
    ["Ví dụ nào thể hiện cấu trúc tự đồng dạng trong tự nhiên và hình học?", "Hình fractal như bông tuyết, cây phân nhánh", "Một đoạn thẳng đơn giản", "Một điểm duy nhất trên mặt phẳng", "Fractal được xây dựng bằng cách lặp lại một quy tắc ở mọi tỉ lệ — bản chất là đệ quy."],
    ["Khi gỡ lỗi hàm đệ quy, cách làm hiệu quả là gì?", "Vẽ cây lời gọi với n nhỏ và kiểm tra từng mức", "Tăng n thật lớn để thử ngay", "Xoá điểm neo để xem kết quả", "Cây lời gọi cho thấy thứ tự gọi và trả về, giúp phát hiện mức nào cho kết quả sai."],
    ["Bài toán tính luỹ thừa a^n bằng đệ quy có thể thu hẹp thế nào?", "a^n = a × a^(n-1), với a^0 = 1", "a^n = a + a^(n-1), với a^0 = 1", "a^n = a^n-1 × n", "Thu hẹp số mũ về 0 giúp thuật toán luôn tiến tới điểm neo."],
    ["Số lần chuyển đĩa tối thiểu của Tháp Hà Nội tăng theo quy luật nào?", "Gấp đôi cộng một khi thêm một đĩa: T(n) = 2T(n-1) + 1", "Tăng thêm đúng một lần mỗi đĩa", "Tăng theo cấp số cộng đều đặn", "Từ công thức truy hồi suy ra T(n) = 2^n − 1; với 64 đĩa con số này cực kì lớn."],
    ["Một thuật toán đệ quy tốt cần bảo đảm điều kiện gì về bài toán con?", "Mỗi lần gọi, bài toán con phải nhỏ hơn bài toán ban đầu", "Bài toán con có thể lớn hơn tuỳ ý", "Bài toán con giữ nguyên kích thước", "Nếu không thu hẹp, quá trình gọi sẽ không bao giờ chạm tới điểm neo."],
    ["Ứng dụng nào dùng đệ quy để vẽ và mô hình hoá?", "Vẽ cây phân nhánh, hình fractal trong đồ hoạ máy tính", "Soạn thảo một văn bản ngắn", "Tính tổng một cột bảng tính", "Đồ hoạ fractal cho thấy sức mạnh biểu diễn của tư duy đệ quy."]
  ];
  var th11cdk1P = [["Điểm neo", "Trường hợp dừng của đệ quy"], ["Công thức truy hồi", "Kết quả qua bài toán nhỏ hơn"], ["Tháp Hà Nội", "2^n − 1 lần chuyển tối thiểu"], ["Ghi nhớ đệ quy", "Lưu kết quả con tránh tính lại"], ["Tràn ngăn xếp", "Đệ quy quá sâu không dừng"], ["Cây lời gọi", "Sơ đồ các lần gọi đệ quy"], ["Tự đồng dạng", "Cấu trúc lặp lại ở mọi tỉ lệ"]];
  var th11cdk2F = [
    ["Thuật toán chia để trị gồm ba bước cơ bản nào theo thứ tự?", "Chia bài toán → giải bài toán con → kết hợp kết quả", "Giải ngay → chia nhỏ → bỏ kết quả", "Kết hợp → chia → đoán kết quả", "Chia để trị hiệu quả khi bài toán con độc lập và việc kết hợp không quá tốn kém."],
    ["Tìm kiếm nhị phân là ví dụ của chia để trị vì sao?", "Mỗi bước loại một nửa mảng, chỉ giải một nửa còn lại", "Vì nó sắp xếp lại toàn bộ mảng", "Vì nó duyệt mọi phần tử một lần", "Tìm kiếm nhị phân chỉ cần khoảng log2(n) lần so sánh với mảng n phần tử đã sắp xếp."],
    ["Sắp xếp trộn (merge sort) thực hiện bước “trị” và “kết hợp” thế nào?", "Chia mảng làm đôi, sắp từng nửa rồi trộn hai nửa đã sắp", "Chọn phần tử nhỏ nhất đưa về đầu mảng", "Đổi chỗ các cặp phần tử kề nhau", "Trộn hai dãy đã sắp xếp chỉ cần duyệt tuyến tính từng phần tử một lần."],
    ["Bước trộn trong sắp xếp trộn dựa trên thao tác nào?", "So sánh hai phần tử đầu hai nửa, lấy phần tử nhỏ hơn trước", "Đảo ngược cả hai nửa mảng", "Nhân đôi các phần tử của mảng", "Trộn cần một mảng phụ để chứa kết quả đã sắp xếp của hai nửa."],
    ["Sắp xếp trộn có độ ổn định thế nào và đặc điểm bộ nhớ ra sao?", "Ổn định, nhưng cần thêm mảng phụ để trộn", "Không ổn định và không tốn bộ nhớ thêm", "Ổn định và không cần mảng phụ", "Ổn định nghĩa là các phần tử bằng nhau giữ nguyên thứ tự ban đầu sau khi sắp xếp."],
    ["Chia để trị khác duyệt toàn bộ ở điểm cốt yếu nào?", "Thu hẹp bài toán nhanh nhờ loại bỏ phần không cần xét", "Luôn xét mọi trường hợp có thể", "Không bao giờ chia bài toán ra", "Nhờ thu hẹp theo tỉ lệ, nhiều thuật toán chia để trị đạt độ phức tạp logarit hoặc n log n."],
    ["Tìm kiếm nhị phân viết bằng đệ quy có điểm neo nào?", "Khoảng tìm rỗng hoặc phần tử giữa đúng bằng giá trị cần tìm", "Khi mảng còn đúng 100 phần tử", "Khi phần tử đầu bằng phần tử cuối", "Mỗi lần gọi đệ quy, khoảng [lo, hi] thu hẹp về một nửa."],
    ["Để tìm phần tử lớn nhất bằng chia để trị, cách làm đúng là gì?", "Chia mảng làm đôi, tìm max mỗi nửa rồi lấy max lớn hơn", "Cộng hai giá trị lớn nhất của hai nửa", "Chỉ xét phần tử giữa của mảng", "Kết hợp trong bài toán max đơn giản là so sánh hai kết quả con."],
    ["Sắp xếp nhanh (quick sort) thuộc nhóm thuật toán nào?", "Chia để trị — phân hoạch quanh phần tử chốt (pivot)", "Sắp xếp chèn phần tử lần lượt", "Sắp xếp chọn phần tử nhỏ nhất", "Quick sort chọn chốt, đưa nhỏ hơn sang trái, lớn hơn sang phải rồi đệ quy hai phía."],
    ["Chọn phần tử chốt (pivot) kém trong quick sort gây hậu quả gì?", "Mảng chia lệch hẳn, thuật toán chậm gần như duyệt toàn bộ", "Thuật toán cho kết quả sai thứ tự", "Mảng bị mất phần tử ở giữa", "Chọn chốt là trung vị hoặc ngẫu nhiên giúp quick sort cân bằng hơn."],
    ["Bài toán đếm số lần xuất hiện của x trong mảng có thể chia để trị thế nào?", "Đếm ở hai nửa rồi cộng hai kết quả lại", "Chỉ đếm ở nửa đầu của mảng", "Nhân đôi kết quả của nửa đầu", "Bước kết hợp cộng dồn là mẫu chung của nhiều bài toán chia để trị dạng thống kê."],
    ["Điều kiện để áp dụng chia để trị hiệu quả là gì?", "Bài toán tách được thành bài toán con độc lập cùng dạng", "Bài toán không thể chia nhỏ được nữa", "Mọi bước đều phụ thuộc chặt vào nhau", "Nếu bài toán con chồng chéo nhau nhiều lần, ghi nhớ hoặc quy hoạch động sẽ phù hợp hơn."],
    ["Độ phức tạp của sắp xếp trộn với n phần tử ở mức nào?", "n log n — hiệu quả với dữ liệu lớn", "n bình phương như sắp xếp nổi bọt", "Không phụ thuộc vào n", "n log n tăng chậm hơn n^2 rất nhiều khi n lớn, nên merge sort được dùng rộng rãi."],
    ["Nhân hai số lớn, luỹ thừa nhanh đều là ứng dụng của ý tưởng nào?", "Chia để trị kết hợp đệ quy để giảm số phép tính", "Duyệt thử mọi khả năng có thể", "Sắp xếp lại các chữ số của số", "Luỹ thừa nhanh tính a^n bằng cách bình phương và chia đôi số mũ."],
    ["Luỹ thừa nhanh tính 2^10 cần ý tưởng thu hẹp nào?", "2^10 = (2^5)^2 — chia đôi số mũ sau mỗi bước", "Cộng số 2 vào chính nó 10 lần", "Nhân 2 với 10 một lần duy nhất", "Số mũ chẵn: bình phương cơ số của nửa mũ; số mũ lẻ: tách thêm một thừa số."],
    ["Trong chia để trị, bước nào thường quyết định chi phí của thuật toán?", "Bước chia và bước kết hợp kết quả các bài toán con", "Bước đặt tên biến cho chương trình", "Bước nhập dữ liệu từ bàn phím", "Nếu kết hợp quá tốn kém, lợi ích của việc chia nhỏ sẽ bị triệt tiêu."],
    ["Ví dụ đời thường nào giống tư duy chia để trị?", "Chia lớp thành nhóm nhỏ làm từng phần rồi ghép lại", "Một người làm toàn bộ việc một mình", "Làm mọi việc cùng một lúc hỗn loạn", "Phân công theo nhóm là ứng dụng tự nhiên của nguyên tắc chia để trị."],
    ["Tìm kiếm nhị phân trên mảng 1.000 phần tử cần tối đa khoảng mấy lần so sánh?", "Khoảng 10 lần", "Khoảng 500 lần", "Đúng 1.000 lần", "2^10 = 1024 nên khoảng 10 lần chia đôi là thu hẹp hết mảng 1.000 phần tử."],
    ["Sắp xếp trộn xử lí mảng một phần tử như thế nào?", "Coi như đã sắp xếp — đó là trường hợp dừng", "Tiếp tục chia đôi mãi không dừng", "Đảo ngược phần tử đó", "Mảng 0 hoặc 1 phần tử là điểm neo của thuật toán sắp xếp trộn."],
    ["So với sắp xếp nổi bọt, sắp xếp trộn có ưu điểm chính nào?", "Nhanh hơn hẳn với dữ liệu lớn nhờ chia đôi liên tục", "Dễ cài đặt hơn cho người mới học", "Không cần viết hàm đệ quy", "Đổi lại, merge sort tốn thêm bộ nhớ cho mảng phụ khi trộn."],
    ["Một bài toán con trong chia để trị cần có tính chất gì?", "Cùng dạng với bài toán gốc nhưng kích thước nhỏ hơn", "Khác hẳn dạng của bài toán gốc", "Luôn có kích thước bằng bài toán gốc", "Tính tự đồng dạng về dạng là điều kiện để dùng chung một cách giải đệ quy."],
    ["Khi nào chia để trị không còn hiệu quả?", "Khi việc chia và kết hợp tốn kém hơn giải trực tiếp", "Khi bài toán có thể chia làm đôi", "Khi dữ liệu đã được sắp xếp", "Với bài toán rất nhỏ, giải trực tiếp thường đơn giản và nhanh hơn đệ quy chia nhỏ."]
  ];
  var th11cdk2P = [["Chia để trị", "Chia, giải con, kết hợp kết quả"], ["Sắp xếp trộn", "Chia đôi, sắp rồi trộn hai nửa"], ["Phần tử chốt", "Điểm phân hoạch trong quick sort"], ["Tìm kiếm nhị phân", "Mỗi bước loại bỏ một nửa mảng"], ["Luỹ thừa nhanh", "Chia đôi số mũ khi tính luỹ thừa"], ["Trường hợp dừng trộn", "Mảng một phần tử đã sắp xếp"], ["Độ phức tạp trộn", "n log n với dữ liệu lớn"]];
  var th11cdk3F = [
    ["Kĩ thuật duyệt trong thiết kế thuật toán có nghĩa là gì?", "Xét có hệ thống các khả năng để tìm nghiệm của bài toán", "Chỉ xét khả năng đầu tiên nghĩ ra", "Đoán đáp án theo cảm tính", "Duyệt có hệ thống bảo đảm không bỏ sót nghiệm nếu không gian tìm kiếm hữu hạn."],
    ["Duyệt quay lui (backtracking) hoạt động theo nguyên tắc nào?", "Thử từng lựa chọn, không hợp thì quay lại thử lựa chọn khác", "Luôn đi thẳng không bao giờ quay lại", "Chọn ngẫu nhiên một phương án duy nhất", "Quay lui giống như đi mê cung: gặp ngõ cụt thì quay về ngã rẽ gần nhất."],
    ["Bài toán xếp Hậu (N-Queens) yêu cầu điều gì?", "Đặt N quân hậu không quân nào ăn được quân nào", "Đặt N quân hậu trên cùng một hàng", "Đặt hậu sao cho ăn nhau nhiều nhất", "Hai hậu ăn nhau khi cùng hàng, cùng cột hoặc cùng đường chéo."],
    ["Trong bài toán 8 quân hậu, vì sao mỗi hàng chỉ đặt đúng một hậu?", "Vì hai hậu cùng hàng sẽ ăn nhau ngay", "Vì bàn cờ chỉ có một cột", "Vì quân hậu không di chuyển ngang", "Đặt mỗi hàng một hậu rút gọn bài toán thành việc chọn cột cho từng hàng."],
    ["Quay lui thường được cài đặt bằng kĩ thuật nào?", "Đệ quy kết hợp thử chọn và huỷ chọn", "Vòng lặp in kết quả liên tục", "Sắp xếp mảng tăng dần", "Cấu trúc điển hình: chọn → đệ quy bước tiếp → bỏ chọn để thử nhánh khác."],
    ["Duyệt nhánh cận khác duyệt toàn bộ ở điểm nào?", "Cắt bỏ nhánh chắc chắn không cho nghiệm tốt hơn nghiệm đã có", "Xét mọi nhánh tới cùng không loại bỏ", "Chỉ xét đúng một nhánh duy nhất", "Nhánh cận dùng cận trên/dưới để tỉa cây tìm kiếm, tiết kiệm rất nhiều thời gian."],
    ["“Tỉa” (pruning) trong duyệt nhánh cận có nghĩa là gì?", "Loại bỏ sớm nhánh không cần xét tiếp", "Thêm nhiều nhánh mới vào cây", "Đảo thứ tự các nhánh tìm kiếm", "Tỉa đúng không làm mất nghiệm tối ưu vì nhánh bị tỉa đã được chứng minh không tốt hơn."],
    ["Không gian nghiệm của một bài toán duyệt thường được hình dung thế nào?", "Cây tìm kiếm: mỗi nút là một lựa chọn từng phần", "Một đường thẳng duy nhất", "Một bảng số liệu hai chiều", "Mỗi lá của cây tìm kiếm ứng với một phương án đầy đủ cần kiểm tra."],
    ["Bài toán liệt kê các chỉnh hợp, tổ hợp thường dùng kĩ thuật nào?", "Duyệt quay lui xây dựng từng thành phần của nghiệm", "Tìm kiếm nhị phân trên mảng", "Sắp xếp trộn các phần tử", "Quay lui sinh lần lượt mọi dãy thoả điều kiện, ví dụ liệt kê hoán vị của một tập."],
    ["Bài toán người du lịch (TSP) thường được giải gần đúng hoặc nhánh cận vì sao?", "Số hành trình tăng giai thừa, duyệt toàn bộ rất chậm", "Vì bài toán không có nghiệm nào", "Vì không thể tính độ dài hành trình", "Với n thành phố có tới (n-1)!/2 hành trình khác nhau cần xét."],
    ["Điều kiện dừng của một thuật toán quay lui là gì?", "Đã xây đủ thành phần nghiệm hoặc hết lựa chọn hợp lệ", "Khi chương trình chạy đủ lâu", "Khi gặp lựa chọn đầu tiên bất kì", "Khi xây đủ, thuật toán ghi nhận nghiệm rồi quay lui tìm nghiệm khác nếu cần."],
    ["Trong xếp hậu, kiểm tra một vị trí có “an toàn” cần xét những gì?", "Không cùng cột và không cùng hai đường chéo với hậu đã đặt", "Chỉ cần khác hàng với hậu trước", "Chỉ cần ô đó chưa có quân cờ nào", "Hàng đã bảo đảm khác nhau nhờ cách đặt mỗi hàng một hậu."],
    ["Duyệt theo chiều sâu (DFS) trên cây tìm kiếm có đặc điểm gì?", "Đi sâu hết một nhánh rồi mới quay lui sang nhánh khác", "Xét mọi nút cùng mức trước tiên", "Chỉ xét các nút ở lá của cây", "Quay lui là một dạng duyệt theo chiều sâu trên cây không gian nghiệm."],
    ["Duyệt theo chiều rộng (BFS) khác DFS ở điểm nào?", "Xét theo từng mức, dùng hàng đợi để lưu các nút chờ", "Đi sâu hết một nhánh trước tiên", "Không cần lưu trữ nút nào", "BFS tìm được đường đi ngắn nhất theo số bước trong đồ thị không trọng số."],
    ["Bài toán tô màu bản đồ, xếp lịch thường dùng kĩ thuật nào?", "Quay lui gán từng giá trị và kiểm tra ràng buộc", "Sắp xếp nổi bọt các màu", "Tìm kiếm tuần tự trong mảng", "Mỗi lần gán thử một màu, nếu vi phạm ràng buộc với vùng kề thì quay lui đổi màu."],
    ["Hiệu quả của quay lui phụ thuộc nhiều nhất vào yếu tố nào?", "Thứ tự thử lựa chọn và khả năng cắt tỉa nhánh sớm", "Số lượng biến phụ trong chương trình", "Tên gọi của các hàm trong chương trình", "Thử lựa chọn hứa hẹn trước giúp tìm nghiệm sớm và tỉa được nhiều nhánh hơn."],
    ["Một nghiệm từng phần bị loại ngay khi nào trong quay lui?", "Khi đã vi phạm ràng buộc, không thể thành nghiệm", "Khi nó chưa đủ số thành phần", "Khi nó giống một nghiệm đã tìm", "Loại sớm nghiệm từng phần sai giúp cây tìm kiếm không phình to vô ích."],
    ["Bài toán cái túi (knapsack) dạng 0/1 có thể giải bằng kĩ thuật nào?", "Duyệt nhánh cận hoặc quay lui chọn/không chọn từng vật", "Chỉ sắp xếp vật theo giá trị giảm dần là luôn tối ưu", "Tìm kiếm nhị phân trên trọng lượng", "Mỗi vật chỉ chọn hoặc không chọn nên không gian nghiệm là cây nhị phân."],
    ["Sudoku là ví dụ điển hình cho kĩ thuật giải nào?", "Quay lui điền số và kiểm tra ràng buộc hàng, cột, khối", "Sắp xếp trộn các chữ số", "Duyệt các số theo thứ tự ngẫu nhiên", "Điền thử một số vào ô trống, nếu mâu thuẫn thì quay lui thử số khác."],
    ["Vì sao duyệt toàn bộ không khả thi với bài toán có không gian nghiệm khổng lồ?", "Thời gian tăng hàm mũ, vượt quá khả năng của máy tính", "Vì máy tính không lưu được kết quả", "Vì mọi bài toán đều vô nghiệm", "Khi đó cần thuật toán gần đúng, tham lam hoặc nhánh cận mạnh để tìm nghiệm tốt trong thời gian chấp nhận được."],
    ["Thuật toán tham lam khác duyệt quay lui ở điểm nào?", "Tham lam chọn tốt nhất tại chỗ và không quay lại sửa", "Tham lam xét mọi khả năng có thể", "Tham lam luôn cho nghiệm tối ưu mọi bài toán", "Tham lam nhanh nhưng có thể không tối ưu; quay lui chậm hơn nhưng xét có hệ thống."],
    ["Trong nhánh cận, “nghiệm tốt nhất đã có” đóng vai trò gì?", "Làm mốc cận để tỉa các nhánh không thể tốt hơn nó", "Là nghiệm duy nhất được giữ lại cuối cùng", "Không ảnh hưởng tới việc tỉa nhánh", "Càng sớm có nghiệm tốt, cận càng chặt và càng nhiều nhánh bị tỉa."]
  ];
  var th11cdk3P = [["Quay lui", "Thử chọn, sai thì quay lại đổi"], ["Nhánh cận", "Tỉa nhánh không thể tốt hơn"], ["Bài toán xếp Hậu", "Hậu không ăn lẫn nhau"], ["Duyệt theo chiều sâu", "Đi hết một nhánh rồi quay lui"], ["Duyệt theo chiều rộng", "Xét theo từng mức bằng hàng đợi"], ["Cây tìm kiếm", "Mỗi nút là lựa chọn từng phần"], ["Tỉa nhánh", "Loại sớm nhánh không hứa hẹn"]];
  var th11u6F = [
    ["Tạo một bảng mới trong phần mềm quản trị CSDL, bước đầu tiên cần làm là gì?", "Xác định tên bảng, các trường và kiểu dữ liệu", "Viết ngay báo cáo tổng kết", "Chạy truy vấn chọn dữ liệu", "Thiết kế cấu trúc bảng đúng ngay từ đầu giúp dữ liệu nhất quán và khai thác thuận lợi về sau."],
    ["Chế độ thiết kế (Design View) của bảng dùng để làm gì?", "Khai báo tên trường, kiểu dữ liệu và tính chất", "Nhập nhanh hàng loạt bản ghi", "In dữ liệu của bảng ra giấy", "Chế độ trang dữ liệu (Datasheet View) mới là nơi xem và nhập các bản ghi trực tiếp."],
    ["Kiểu dữ liệu văn bản ngắn (Short Text) phù hợp để lưu thông tin nào?", "Chuỗi kí tự ngắn như họ tên, mã số", "Số điểm cần tính trung bình", "Ngày tháng năm sinh", "Mã có chữ và số như MãHS vẫn là chuỗi kí tự, không tham gia tính toán số học."],
    ["Kiểu dữ liệu số (Number) phù hợp để lưu thông tin nào?", "Số cần tính toán như điểm, số lượng", "Họ tên của học sinh", "Địa chỉ nhà ở", "Chọn đúng kiểu số giúp phần mềm kiểm tra giá trị và thực hiện phép tính chính xác."],
    ["Kiểu dữ liệu Date/Time trong bảng dùng để lưu thông tin nào?", "Ngày tháng như ngày sinh, ngày mượn sách", "Đoạn văn mô tả dài", "Giá trị đúng hoặc sai", "Dữ liệu ngày tháng đúng kiểu mới sắp xếp và lọc theo thời gian chính xác được."],
    ["Kiểu dữ liệu Yes/No (Boolean) dùng để lưu thông tin nào?", "Giá trị hai trạng thái: đúng/sai, có/không", "Số tiền có nhiều chữ số", "Họ tên và địa chỉ", "Ví dụ trường ĐãTrảSách chỉ nhận một trong hai giá trị Có hoặc Không."],
    ["Để đặt khoá chính cho một bảng khi thiết kế, thao tác đúng là gì?", "Chọn trường làm khoá rồi đặt Primary Key", "Đặt tên bảng bằng chữ in hoa", "Tô màu cho trường đầu tiên", "Khoá chính bảo đảm mỗi bản ghi được phân biệt duy nhất, không trùng và không rỗng."],
    ["Trường có kiểu AutoNumber có đặc điểm nổi bật nào?", "Tự động tăng, không trùng, hợp làm khoá chính", "Tự động điền họ tên học sinh", "Cho phép nhập hai giá trị giống nhau", "Giá trị AutoNumber do phần mềm tự sinh nên người nhập không phải tự nghĩ mã mới."],
    ["Liên kết giữa hai bảng trong CSDL được tạo bằng cách nào?", "Nối khoá chính bảng cha với khoá ngoài bảng con", "Gộp hai bảng thành một bảng lớn", "Sao chép dữ liệu bảng này sang bảng kia", "Cửa sổ quan hệ (Relationships) là nơi tạo và xem các liên kết giữa các bảng."],
    ["Khi tạo liên kết, ràng buộc toàn vẹn tham chiếu yêu cầu điều gì?", "Giá trị khoá ngoài phải có ở bảng được tham chiếu", "Hai bảng phải có cùng số bản ghi", "Mọi trường đều không được để trống", "Nhờ ràng buộc này, không thể nhập một học sinh thuộc lớp không tồn tại trong bảng Lớp."],
    ["Truy vấn chọn (Select Query) trong khai thác CSDL dùng để làm gì?", "Lọc và hiển thị bản ghi thoả điều kiện đặt ra", "Thay đổi cấu trúc của bảng gốc", "Tạo biểu mẫu nhập dữ liệu", "Kết quả truy vấn là một bảng tạm, dữ liệu gốc trong bảng không bị thay đổi."],
    ["Trong lưới thiết kế truy vấn, điều kiện lọc được đặt ở hàng nào?", "Hàng Criteria của cột cần lọc", "Hàng Sort của cột đầu tiên", "Hàng Table của mọi cột", "Ví dụ đặt >= 8 ở hàng Criteria của cột Điểm để chỉ lấy bài đạt điểm từ 8 trở lên."],
    ["Hai điều kiện đặt trên cùng một hàng Criteria được hiểu thế nào?", "Phải thoả đồng thời cả hai — phép AND", "Chỉ cần thoả một trong hai — phép OR", "Hai điều kiện tự huỷ nhau", "Đặt cùng hàng là AND, đặt khác hàng (Criteria và or) là OR — quy tắc quan trọng khi thiết kế truy vấn."],
    ["Hai điều kiện đặt trên hai hàng Criteria khác nhau được hiểu thế nào?", "Chỉ cần thoả một trong hai — phép OR", "Phải thoả đồng thời cả hai — phép AND", "Chỉ điều kiện ở hàng trên có hiệu lực", "Nhờ cách đặt này có thể lọc, ví dụ, học sinh lớp 11A1 hoặc đạt điểm giỏi."],
    ["Truy vấn có tham số (Parameter Query) có đặc điểm gì khi chạy?", "Hiện hộp thoại để người dùng nhập điều kiện", "Tự xoá các bản ghi không thoả", "Không cần điều kiện lọc nào", "Tham số thường đặt trong dấu ngoặc vuông ở hàng Criteria, ví dụ [Nhập mã lớp:]."],
    ["Trong truy vấn, muốn sắp xếp kết quả theo điểm giảm dần cần đặt gì?", "Hàng Sort là Descending tại cột Điểm", "Hàng Criteria là Descending", "Đổi kiểu dữ liệu của cột Điểm", "Ascending là sắp tăng dần, Descending là sắp giảm dần theo giá trị của cột được chọn."],
    ["Biểu mẫu (Form) trong phần mềm quản trị CSDL dùng để làm gì?", "Nhập và xem dữ liệu từng bản ghi thuận tiện", "Lưu trữ toàn bộ dữ liệu của CSDL", "Thay thế hoàn toàn các bảng dữ liệu", "Biểu mẫu trình bày một bản ghi trên một màn hình, dễ nhập và hạn chế nhầm lẫn hơn nhập trực tiếp vào bảng."],
    ["Nguồn dữ liệu của một biểu mẫu thường là gì?", "Một bảng hoặc một truy vấn đã có trong CSDL", "Một tệp ảnh chụp màn hình", "Một văn bản soạn thảo bên ngoài", "Chọn nguồn dữ liệu đúng thì các trường trên biểu mẫu mới gắn được với dữ liệu thật."],
    ["Ô nhập trên biểu mẫu (hộp văn bản) có vai trò gì?", "Hiển thị và cho sửa giá trị của một trường", "Trang trí cho biểu mẫu đẹp hơn", "Lưu toàn bộ cấu trúc của bảng", "Ngoài hộp văn bản, biểu mẫu còn có nhãn, hộp chọn, nút lệnh để thao tác thuận tiện."],
    ["Báo cáo (Report) trong CSDL dùng để làm gì?", "Trình bày dữ liệu đẹp, đúng khuôn để in và tổng kết", "Nhập dữ liệu mới vào bảng", "Tạo liên kết giữa các bảng", "Ví dụ báo cáo: bảng điểm theo lớp, danh sách độc giả mượn sách, phiếu tổng kết tháng."],
    ["Khi tạo báo cáo thống kê theo lớp, dữ liệu thường được nhóm theo trường nào?", "Trường phân loại như Mã lớp hoặc Tên lớp", "Trường ghi chú tự do", "Trường số thứ tự tự tăng", "Nhóm (Group) dữ liệu giúp tính riêng tổng, trung bình cho từng nhóm trong báo cáo."],
    ["Trong báo cáo và truy vấn tổng hợp, hàm Count dùng để làm gì?", "Đếm số bản ghi trong mỗi nhóm", "Tính tổng một cột số tiền", "Tìm bản ghi có giá trị lớn nhất", "SUM tính tổng, AVG tính trung bình, MAX/MIN tìm giá trị lớn nhất/nhỏ nhất của nhóm."],
    ["Trước khi lập báo cáo, việc chuẩn bị nào giúp báo cáo đúng và đủ?", "Tạo truy vấn nguồn gồm đủ các trường cần in", "In thử toàn bộ các bảng ra giấy", "Đổi tên tất cả các bảng trong CSDL", "Báo cáo lấy dữ liệu từ bảng hoặc truy vấn nguồn, thiếu trường ở nguồn thì báo cáo không hiển thị được."],
    ["Thực hành khai thác CSDL xong, việc lưu trữ nào là cần thiết?", "Lưu tệp CSDL và sao lưu một bản phòng mất mát", "Xoá tệp CSDL để giải phóng máy", "Chỉ ghi kết quả ra giấy là đủ", "Tệp CSDL chứa cả bảng, truy vấn, biểu mẫu và báo cáo đã tạo nên cần được bảo quản cẩn thận."]
  ];
  var th11u6P = [["Chế độ thiết kế bảng", "Khai báo trường và kiểu dữ liệu"], ["Khoá chính", "Định danh duy nhất mỗi bản ghi"], ["Liên kết bảng", "Khớp khoá chính với khoá ngoài"], ["Truy vấn chọn", "Lọc bản ghi theo điều kiện"], ["Hàng Criteria", "Nơi đặt điều kiện lọc truy vấn"], ["Biểu mẫu", "Nhập, xem dữ liệu từng bản ghi"], ["Báo cáo", "Trình bày dữ liệu để in, tổng kết"]];
  var th11u7F = [
    ["Phần mềm GIMP dùng trong chỉnh sửa ảnh thuộc loại phần mềm nào?", "Nguồn mở, miễn phí, xử lí ảnh raster", "Phần mềm thương mại bắt buộc mua bản quyền", "Phần mềm chỉ dùng để xem ảnh", "GIMP là phần mềm chỉnh sửa ảnh được dùng trong chương trình Tin học 11 định hướng THƯD."],
    ["Lớp (layer) trong phần mềm chỉnh sửa ảnh có tác dụng gì?", "Chia ảnh thành lớp độc lập, sửa riêng từng lớp", "Nén ảnh xuống dung lượng nhỏ nhất", "Tự động tăng độ phân giải của ảnh", "Xếp lớp hợp lí giúp sửa một chi tiết mà không làm hỏng phần ảnh còn lại."],
    ["Ảnh màu theo hệ RGB được tổ hợp từ những kênh màu nào?", "Ba kênh: đỏ (R), lục (G) và lam (B)", "Bốn kênh: lục lam, hồng, vàng, đen", "Một kênh đen trắng duy nhất", "Chỉnh từng kênh màu giúp cân bằng lại màu sắc và sửa ảnh bị ám màu."],
    ["Vì sao ảnh raster phóng to quá mức lại bị vỡ hạt?", "Ảnh gồm điểm ảnh cố định, phóng to thấy rõ ô pixel", "Vì màn hình không đủ độ sáng", "Vì tệp ảnh bị mất lớp dữ liệu", "Muốn in ảnh lớn cần chọn ảnh gốc có độ phân giải đủ cao ngay từ đầu."],
    ["Công cụ chọn vùng trong chỉnh sửa ảnh dùng để làm gì?", "Khoanh phần ảnh cần chỉnh sửa riêng", "Lưu tệp ảnh xuống ổ đĩa", "Đổi tên các lớp của ảnh", "Có nhiều cách chọn: theo hình chữ nhật, chọn tự do, chọn theo màu tương đồng."],
    ["Công cụ nhân bản (Clone) trong chỉnh sửa ảnh thường dùng để làm gì?", "Sao chép vùng ảnh lành để che khuyết điểm", "Nhân đôi toàn bộ tệp ảnh", "Tạo thêm một lớp trống mới", "Clone lấy mẫu từ vùng ảnh tốt và vẽ đè lên vùng có vết bẩn, vật thừa."],
    ["Thao tác cắt cúp (Crop) ảnh có tác dụng gì?", "Bỏ phần thừa, tập trung vào chủ thể của ảnh", "Tăng số điểm ảnh của ảnh gốc", "Đổi hệ màu của toàn bộ ảnh", "Cắt cúp hợp lí giúp bố cục ảnh gọn và nổi bật chủ thể hơn."],
    ["Khi chỉnh sáng cho một bức ảnh bị tối, nên điều chỉnh những gì?", "Độ sáng và độ tương phản của ảnh", "Kích thước tệp và tên tệp ảnh", "Số lớp hiện có trong ảnh", "Công cụ mức sáng (Levels) và đường cong (Curves) giúp cân chỉnh sáng tối chi tiết hơn."],
    ["Định dạng tệp dự án của GIMP (XCF) có ưu điểm gì khi đang chỉnh sửa?", "Giữ nguyên các lớp để sửa tiếp về sau", "Mọi phần mềm đều mở được dễ dàng", "Dung lượng luôn nhỏ hơn ảnh JPG", "Khi hoàn thiện mới xuất sang JPG hoặc PNG để chia sẻ và đăng tải."],
    ["Khi xuất ảnh đăng lên web, định dạng nào giữ được nền trong suốt?", "PNG", "JPG", "BMP", "JPG nén tốt cho ảnh chụp nhưng không hỗ trợ nền trong suốt như PNG."],
    ["Kịch bản phân cảnh (storyboard) trong làm video là gì?", "Bản vẽ phác các cảnh chính kèm lời thoại, thời lượng", "Danh sách thiết bị quay phim cần mua", "Bản kê chi phí sản xuất video", "Storyboard giúp cả nhóm hình dung video trước khi bắt tay dựng."],
    ["Dòng thời gian (timeline) trong phần mềm làm video có vai trò gì?", "Nơi sắp xếp các clip theo trình tự thời gian", "Nơi lưu trữ tệp nhạc nền của dự án", "Bảng cài đặt tài khoản người dùng", "Mọi thao tác cắt, ghép, chèn hiệu ứng đều thể hiện trên dòng thời gian."],
    ["Các rãnh (track) riêng trên timeline dùng để làm gì?", "Chứa riêng clip hình, chữ và âm thanh chồng lớp", "Tăng tốc độ xuất bản video", "Tự động sao lưu dự án video", "Tách rãnh giúp chỉnh âm thanh, tiêu đề mà không ảnh hưởng tới clip hình."],
    ["Thao tác cắt ghép clip trong dựng video gồm những việc chính nào?", "Bỏ đoạn thừa, nối các đoạn theo kịch bản", "Vẽ lại từng khung hình của clip", "Đổi định dạng của tệp âm thanh", "Cắt chính xác tại điểm chuyển ý giúp video mạch lạc và không lê thê."],
    ["Hiệu ứng chuyển cảnh (transition) trong video là gì?", "Hiệu ứng nối mượt giữa hai cảnh hoặc hai clip", "Đoạn chữ chạy ở cuối video", "Âm thanh nền của toàn bộ video", "Chuyển cảnh hợp lí làm video liền mạch; lạm dụng hiệu ứng gây rối mắt."],
    ["Chuyển cảnh mờ dần (fade) thường được dùng trong tình huống nào?", "Mở đầu, kết thúc hoặc chuyển đoạn nhẹ nhàng", "Khi cần chuyển cảnh thật giật và nhanh", "Khi chèn bảng số liệu vào video", "Mờ đen (fade to black) thường báo hiệu kết thúc một đoạn hoặc toàn bộ video."],
    ["Chèn tiêu đề và chữ vào video cần chú ý điều gì?", "Chữ rõ, tương phản với nền, xuất hiện đủ lâu để đọc", "Chữ càng nhỏ và nhiều càng chuyên nghiệp", "Đặt chữ trùng màu với hình nền", "Tiêu đề mở đầu và phần ghi công (credit) cuối video là hai vị trí chữ phổ biến."],
    ["Phần âm thanh trong một video hoàn chỉnh thường gồm những gì?", "Lời thoại, nhạc nền và hiệu ứng âm thanh", "Chỉ một bản nhạc duy nhất", "Không cần âm thanh nếu hình đẹp", "Cần chỉnh âm lượng để lời thoại rõ và không bị nhạc nền lấn át."],
    ["Tỉ lệ khung hình phổ biến nhất của video hiện nay là bao nhiêu?", "16:9 — khung hình ngang màn hình rộng", "1:1 — khung hình vuông tuyệt đối", "4:3 — khung hình của tivi đời cũ", "Video dọc 9:16 phù hợp với nền tảng xem trên điện thoại theo chiều dọc."],
    ["Tốc độ khung hình (fps) của video có ý nghĩa gì?", "Số khung hình hiển thị trong một giây", "Số phút tối đa của một video", "Dung lượng của tệp video mỗi giây", "fps càng cao chuyển động càng mượt nhưng tệp video càng nặng."],
    ["Bước xuất bản video (export/render) có nhiệm vụ gì?", "Kết xuất dự án thành tệp video hoàn chỉnh để xem, chia sẻ", "Xoá các clip gốc trong dự án", "Chuyển dự án sang máy khác", "Định dạng xuất phổ biến là MP4 vì tương thích với hầu hết thiết bị và nền tảng."],
    ["Trước khi xuất bản, vì sao cần xem lại toàn bộ video một lượt?", "Phát hiện lỗi hình, tiếng, chữ trước khi chia sẻ", "Để tăng thời lượng của video", "Vì phần mềm bắt buộc xem lại", "Xem kiểm tra (review) là bước hậu kiểm quan trọng của quy trình làm video."],
    ["Nhạc dùng trong video đăng công khai cần lưu ý điều gì về bản quyền?", "Chỉ dùng nhạc được phép hoặc nhạc miễn phí bản quyền", "Dùng bài hát nổi tiếng nào cũng được", "Chỉ cần ghi tên ca sĩ là đủ quyền", "Vi phạm bản quyền nhạc có thể khiến video bị tắt tiếng hoặc gỡ bỏ."],
    ["Một video giới thiệu sản phẩm tốt cần đạt yêu cầu cơ bản nào?", "Nội dung rõ ràng, hình tiếng tốt, đúng thông điệp", "Thời lượng càng dài càng tốt", "Càng nhiều hiệu ứng chuyển cảnh càng tốt", "Kịch bản và thông điệp rõ ràng quan trọng hơn kĩ xảo khi làm video truyền thông."]
  ];
  var th11u7P = [["Lớp ảnh", "Phần ảnh độc lập, sửa riêng"], ["Kênh màu RGB", "Đỏ, lục, lam hợp thành màu"], ["Công cụ nhân bản", "Che khuyết điểm bằng vùng ảnh lành"], ["Kịch bản phân cảnh", "Phác cảnh chính trước khi dựng"], ["Dòng thời gian", "Sắp xếp clip theo trình tự"], ["Chuyển cảnh", "Hiệu ứng nối giữa hai cảnh"], ["Xuất bản video", "Kết xuất thành tệp hoàn chỉnh"]];
  var th11cdu1F = [
    ["Phần mềm vẽ trang trí như Inkscape làm việc chủ yếu với loại đồ hoạ nào?", "Đồ hoạ vector tạo từ đường và hình hình học", "Đồ hoạ raster tạo từ điểm ảnh", "Đồ hoạ chụp từ máy ảnh kĩ thuật số", "Đồ hoạ vector phóng to không vỡ hạt nên rất hợp để vẽ hoa văn, logo, tranh trang trí."],
    ["Đường cong Bézier trong vẽ vector được điều chỉnh bằng thành phần nào?", "Các nút điểm và tay nắm điều hướng của nút", "Bảng chọn màu và cọ vẽ điểm ảnh", "Thanh trượt độ sáng của màn hình", "Bốn điểm điều khiển quyết định hình dạng của một đoạn cong Bézier."],
    ["Một đối tượng vector có hai thành phần màu cơ bản nào?", "Màu tô nền (fill) và màu viền (stroke)", "Màu đỏ và màu lam của kênh màu", "Màu của giấy và màu của mực in", "Có thể bỏ tô nền hoặc bỏ viền tuỳ mục đích trang trí của đối tượng."],
    ["Độ dày của đường viền (stroke) ảnh hưởng thế nào tới hoạ tiết?", "Viền dày cho nét đậm, chắc; viền mỏng cho nét thanh", "Viền không ảnh hưởng gì tới hình", "Viền dày làm đối tượng trong suốt", "Phối hợp nét dày, mỏng tạo nhịp điệu và điểm nhấn cho mẫu trang trí."],
    ["Kĩ thuật lặp mẫu hoa văn trong trang trí dựa trên thao tác nào?", "Nhân bản hoạ tiết theo hàng, lưới hoặc vòng tròn", "Vẽ lại từng hoạ tiết hoàn toàn khác nhau", "Phóng to một hoạ tiết duy nhất", "Mẫu lặp đều tạo cảm giác nhịp nhàng, thường dùng trên vải, gạch, giấy gói."],
    ["Muốn tạo hoa văn đối xứng hai phía nhanh và chính xác, nên dùng cách nào?", "Vẽ một nửa rồi lật gương (mirror) nửa còn lại", "Vẽ tự do cả hai nửa bằng tay", "Xoay hình một góc 45 độ bất kì", "Đối xứng gương là nguyên tắc bố cục quen thuộc trong trang trí truyền thống."],
    ["Xoay lặp hoạ tiết quanh một tâm điểm sẽ tạo ra dạng hoa văn nào?", "Hoa văn tròn toả ra như đoá hoa, mandala", "Hoa văn đường thẳng song song", "Hoa văn dạng lưới ô vuông", "Thay đổi góc xoay và số bản sao sẽ cho nhiều biến thể hoa văn tròn khác nhau."],
    ["Công cụ nhân bản theo lưới (tiled clones) có ích gì khi vẽ trang trí?", "Tạo hàng loạt bản sao xếp đều, sửa gốc là các bản đổi theo", "Tự động tô màu ngẫu nhiên cho hình", "Xuất tệp tranh sang định dạng video", "Nhân bản liên kết giúp mẫu lặp luôn đồng nhất khi chỉnh sửa hoạ tiết gốc."],
    ["Nhóm các đối tượng (group) trong vẽ vector có tác dụng gì?", "Gom nhiều đối tượng để di chuyển, co giãn cùng nhau", "Nối các đối tượng thành một đường duy nhất", "Khoá cứng đối tượng không sửa được nữa", "Một hoạ tiết hoàn chỉnh thường gồm nhiều hình nhỏ được nhóm lại thành một khối."],
    ["Thứ tự trước — sau của các đối tượng vector được xử lí thế nào?", "Đưa lên trên hoặc xuống dưới theo lớp xếp chồng", "Đối tượng vẽ trước luôn nằm trên cùng", "Mọi đối tượng đều ngang hàng, không che nhau", "Đối tượng nằm trên sẽ che phần đối tượng nằm dưới tại vùng giao nhau."],
    ["Căn gióng (align) các đối tượng khi trang trí giúp đạt điều gì?", "Các đối tượng thẳng hàng, cách đều, cân đối", "Các đối tượng tự đổi màu hài hoà", "Các đối tượng tự liên kết thành nhóm", "Căn giữa theo trục là thao tác thường dùng để bố cục trang trí cân đối."],
    ["Lưới (grid) và bắt điểm (snap) khi vẽ có ích lợi gì?", "Đặt và căn đối tượng chính xác theo lưới", "Làm cho hình vẽ trông mềm mại hơn", "Tự động thêm hoạ tiết vào hình", "Bắt điểm giúp các nút, cạnh của đối tượng khớp nhau không lệch."],
    ["Muốn sửa hình dạng một hình cơ bản bằng cách kéo từng nút, cần làm gì trước?", "Chuyển đối tượng thành đường (path) để chỉnh nút", "Xuất đối tượng ra tệp ảnh JPG", "Đổi màu nền của toàn bộ trang vẽ", "Sau khi chuyển thành đường, mỗi nút của hình đều kéo và uốn cong được."],
    ["Cách điệu hoạ tiết tự nhiên trong trang trí có nghĩa là gì?", "Đơn giản hoá, nhấn nét đặc trưng của hoa lá, con vật", "Sao chép y hệt ảnh chụp tự nhiên", "Bỏ hết chi tiết và màu sắc của mẫu", "Hoa sen, chim hạc, sóng nước trong trang trí truyền thống đều đã được cách điệu."],
    ["Nhịp điệu trong một mẫu trang trí được tạo ra chủ yếu nhờ yếu tố nào?", "Sự lặp lại có quy luật của hoạ tiết và khoảng cách", "Dùng thật nhiều màu sắc khác nhau", "Vẽ hoạ tiết với kích thước tuỳ ý", "Nhịp điệu đều tạo cảm giác ổn định; nhịp điệu biến đổi tạo cảm giác sinh động."],
    ["Phối màu tương đồng trong trang trí là cách phối thế nào?", "Dùng các màu kề nhau trên vòng tròn màu, hài hoà", "Dùng hai màu đối nhau hoàn toàn trên vòng màu", "Chỉ dùng một màu đen duy nhất", "Phối màu bổ túc dùng hai màu đối nhau để tạo tương phản mạnh, gây ấn tượng."],
    ["Bố cục trang trí trong hình vuông thường nhấn mạnh đặc điểm nào?", "Cân đối bốn phía, hoạ tiết toả từ tâm hoặc đăng đối", "Kéo dài mãi theo chiều ngang", "Chỉ trang trí một góc duy nhất", "Trang trí hình vuông, hình tròn, đường diềm là ba dạng bố cục cơ bản được học."],
    ["Trang trí đường diềm có đặc điểm cấu trúc nào?", "Hoạ tiết lặp đều theo một dải dài liên tục", "Hoạ tiết tập trung tại một tâm điểm", "Hoạ tiết xếp chồng tự do nhiều lớp", "Diềm trang trí thường thấy ở mép vải, chân tường, bìa sách và khung tranh."],
    ["Định dạng tệp chuẩn để lưu và trao đổi đồ hoạ vector là gì?", "SVG — giữ được đường vector, phóng to không vỡ", "JPG — ảnh nén mất dữ liệu điểm ảnh", "MP3 — tệp âm thanh nén", "Tệp nguồn của phần mềm vẽ nên được lưu giữ để chỉnh sửa mẫu về sau."],
    ["Khi dùng mẫu vector cho trang web hoặc in ấn, thao tác xuất tệp cần chú ý gì?", "Chọn định dạng và độ phân giải đúng mục đích", "Luôn xuất ở độ phân giải thấp nhất", "Không cần đặt tên tệp khi xuất", "Xuất PNG độ phân giải cao cho in ấn, SVG hoặc PNG nhẹ cho hiển thị trên web."],
    ["Một mẫu hoa văn trang trí đẹp thường cần cân bằng những yếu tố nào?", "Hoạ tiết, màu sắc, khoảng trống và nhịp lặp", "Càng kín đặc hoạ tiết càng tốt", "Chỉ cần nhiều màu sặc sỡ", "Khoảng trống (không gian âm) giúp mẫu thoáng và làm hoạ tiết chính nổi bật."],
    ["Trước khi hoàn thiện mẫu trang trí, bước kiểm tra nào là cần thiết?", "Xem mẫu ở kích thước thật và kiểm tra lỗi lệch, hở", "Đổi tên tất cả các lớp trong tệp", "Xoá lưới và đường gióng của bản vẽ", "Xem thử mẫu lặp nối tiếp nhau giúp phát hiện chỗ khớp nối bị lệch hoặc đứt nét."],
    ["Hoạ tiết trang trí trên sản phẩm thủ công truyền thống Việt Nam thường lấy cảm hứng từ đâu?", "Hoa sen, mây, sóng nước, chim thú trong tự nhiên", "Hình ảnh máy móc công nghiệp hiện đại", "Chữ cái và con số nước ngoài", "Khai thác vốn cổ trang trí dân tộc giúp sản phẩm vừa đẹp vừa giàu bản sắc."],
    ["Khi vẽ trang trí bằng phần mềm, thói quen làm việc tốt là gì?", "Đặt tên lớp rõ ràng và lưu tệp thường xuyên", "Chỉ lưu tệp một lần khi đã vẽ xong", "Vẽ mọi hoạ tiết trên cùng một lớp", "Quản lí lớp và lưu phiên bản giúp quay lại bước trước khi có sai sót."]
  ];
  var th11cdu1P = [["Đồ hoạ vector", "Đường và hình hình học"], ["Đường cong Bézier", "Nút và tay nắm điều hướng"], ["Tô nền (fill)", "Màu bên trong đối tượng"], ["Đường viền (stroke)", "Màu và độ dày nét bao quanh"], ["Lặp mẫu hoa văn", "Nhân bản hoạ tiết theo quy luật"], ["Đối xứng gương", "Lật hình qua một trục"], ["Tệp SVG", "Định dạng vector chuẩn trao đổi"]];
  var th11cdu2F = [
    ["Phim hoạt hình tạo ra cảm giác chuyển động bằng cách nào?", "Chiếu nhanh chuỗi hình tĩnh có thay đổi nhỏ liên tiếp", "Quay một cảnh thật bằng máy quay tốc độ cao", "Chiếu một hình tĩnh trong thời gian dài", "Não người giữ lại hình ảnh trong tích tắc nên chuỗi hình liên tiếp được cảm nhận là chuyển động."],
    ["Tốc độ chiếu phổ biến của phim hoạt hình điện ảnh là bao nhiêu?", "24 hình trong một giây (24 fps)", "2 hình trong một giây", "240 hình trong một giây", "Hoạt hình truyền hình và web có thể dùng 12 fps cho các chuyển động đơn giản để tiết kiệm công vẽ."],
    ["Quá trình làm một bộ phim hoạt hình gồm ba pha chính nào?", "Tiền kì, sản xuất (diễn hoạt) và hậu kì", "Quay phim, rửa phim và chiếu phim", "Vẽ tranh, chụp ảnh và bán vé", "Mỗi pha có sản phẩm riêng: tiền kì cho kịch bản và thiết kế, hậu kì cho sản phẩm hoàn chỉnh."],
    ["Giai đoạn tiền kì của phim hoạt hình gồm những công việc chính nào?", "Ý tưởng, kịch bản, phân cảnh và thiết kế nhân vật", "Lồng tiếng và hoà âm cuối cùng", "Xuất phim và đăng tải lên mạng", "Tiền kì chuẩn bị kĩ sẽ giúp giai đoạn sản xuất không phải làm lại nhiều lần."],
    ["Kịch bản phân cảnh (storyboard) của phim hoạt hình có vai trò gì?", "Vẽ phác các cảnh chính kèm lời thoại và thời lượng", "Ghi chép chi phí làm phim chi tiết", "Danh sách diễn viên lồng tiếng tham gia", "Storyboard là bản đồ hình ảnh để cả đoàn làm phim thống nhất cách kể chuyện."],
    ["Thiết kế nhân vật hoạt hình cần xác định những yếu tố nào?", "Ngoại hình, tỉ lệ, bảng màu và nét tính cách", "Chỉ cần đặt tên cho nhân vật", "Giá bán của sản phẩm ăn theo nhân vật", "Bảng thiết kế nhân vật (model sheet) giữ cho nhân vật nhất quán ở mọi cảnh."],
    ["Khung hình chính (keyframe) trong diễn hoạt là gì?", "Khung thể hiện tư thế, thời điểm quan trọng của chuyển động", "Khung hình đầu tiên của toàn bộ bộ phim", "Khung hình chứa phần ghi công cuối phim", "Hoạ sĩ diễn hoạt chính vẽ keyframe, các khung trung gian sẽ nối chúng lại."],
    ["Khung hình trung gian (in-between) có nhiệm vụ gì?", "Nối giữa hai khung chính để chuyển động liền và mượt", "Thay thế toàn bộ các khung chính", "Tô màu cho các khung chính", "Càng nhiều khung trung gian, chuyển động càng mượt nhưng công vẽ càng lớn."],
    ["Nguyên tắc nén và giãn (squash and stretch) trong hoạt hình giúp điều gì?", "Chuyển động có lực, sinh động như quả bóng nảy", "Nhân vật luôn giữ hình dạng cứng nhắc", "Giảm số khung hình cần vẽ", "Đây là một trong 12 nguyên tắc hoạt hình kinh điển của Disney."],
    ["Nguyên tắc lấy đà (anticipation) trong hoạt hình có nghĩa là gì?", "Có động tác chuẩn bị ngược hướng trước hành động chính", "Nhân vật hành động ngay không cần chuẩn bị", "Lặp lại hành động chính nhiều lần", "Ví dụ nhân vật cúi xuống lấy đà trước khi nhảy lên cao."],
    ["Chuyển động trong hoạt hình tự nhiên thường đi theo quỹ đạo nào?", "Đường cong (arc) thay vì đường thẳng cứng", "Đường thẳng gấp khúc liên tục", "Đường tròn khép kín mọi lúc", "Tay, đầu, bước chân khi chuyển động đều vạch nên các đường cong mềm."],
    ["Vì sao cảnh nền (background) thường được vẽ thành lớp riêng?", "Nhân vật chuyển động trên nền mà không phải vẽ lại nền", "Để nền luôn sáng hơn nhân vật", "Để giảm dung lượng của tệp phim", "Tách lớp nền, lớp nhân vật là nguyên tắc tổ chức cơ bản của hoạt hình 2D."],
    ["Bản animatic trong sản xuất hoạt hình là gì?", "Bản phân cảnh dựng theo thời lượng kèm âm thanh tạm", "Bản phim hoàn chỉnh đã tô màu", "Bản vẽ thiết kế nhân vật chi tiết", "Animatic giúp kiểm tra nhịp kể chuyện trước khi đầu tư vẽ và diễn hoạt thật."],
    ["Dòng thời gian trong phần mềm làm phim hoạt hình chứa những gì?", "Các lớp và khung hình sắp theo trình tự thời gian", "Danh sách tệp âm thanh của máy tính", "Thông tin tài khoản của người làm phim", "Mỗi lớp trên dòng thời gian tương ứng với một thành phần như nhân vật, nền, hiệu ứng."],
    ["Hoạt hình stop motion được thực hiện bằng cách nào?", "Dịch chuyển vật thật từng chút và chụp từng khung hình", "Vẽ nhân vật trên giấy rồi lật nhanh", "Dựng mô hình 3D trong máy tính", "Vật liệu làm stop motion phổ biến là đất nặn, giấy cắt và mô hình lắp ghép."],
    ["Hoạt hình 2D trên máy tính khác stop motion ở điểm cốt yếu nào?", "Nhân vật được vẽ và diễn hoạt bằng phần mềm", "Phim không cần kịch bản phân cảnh", "Phim không có âm thanh đi kèm", "Phần mềm hoạt hình hỗ trợ khung chính và tự nội suy khung trung gian trong nhiều trường hợp."],
    ["Phần việc lồng tiếng cho phim hoạt hình thường được thực hiện ra sao?", "Thu giọng diễn viên theo lời thoại của từng nhân vật", "Dùng tiếng động môi trường thay cho lời thoại", "Bỏ qua vì hoạt hình không cần tiếng", "Lời thoại thu trước còn giúp hoạ sĩ khớp khẩu hình và nhịp diễn cho nhân vật."],
    ["Âm nhạc và hiệu ứng âm thanh trong phim hoạt hình có tác dụng gì?", "Tăng cảm xúc, nhấn mạnh hành động và tình huống", "Làm cho thời lượng phim dài thêm", "Thay thế hoàn toàn hình ảnh của phim", "Hậu kì là giai đoạn ghép nhạc, tiếng động và lời thoại vào bản phim hoàn chỉnh."],
    ["Trước khi xuất phim, việc kiểm tra bản dựng cần chú ý những gì?", "Khớp hình — tiếng, thời lượng và lỗi khung hình", "Chỉ cần kiểm tra tên tệp xuất ra", "Không cần xem lại nếu đã dựng xong", "Xem lại toàn bộ giúp phát hiện cảnh bị mất tiếng, nhảy hình hoặc sai lời thoại."],
    ["Định dạng tệp phổ biến nhất để xuất và chia sẻ phim hoạt hình là gì?", "MP4 — tương thích rộng, dung lượng hợp lí", "XCF — tệp dự án chỉnh sửa ảnh", "SVG — tệp đồ hoạ vector tĩnh", "Tệp dự án của phần mềm cần được giữ riêng để còn chỉnh sửa về sau."],
    ["Khi xuất phim để xem trên điện thoại, cần chọn thông số nào phù hợp?", "Độ phân giải và tỉ lệ khung hình theo thiết bị đích", "Luôn chọn độ phân giải cao nhất có thể", "Không quan tâm tới tỉ lệ khung hình", "Chọn sai tỉ lệ khung hình khiến phim bị méo hoặc có viền đen lớn."],
    ["Một nhân vật hoạt hình dễ nhớ thường có đặc điểm thiết kế nào?", "Silhouette (hình bóng) rõ, nét đặc trưng nổi bật", "Càng nhiều chi tiết nhỏ càng tốt", "Giống hệt các nhân vật khác", "Chỉ nhìn hình bóng đen cũng nhận ra nhân vật là tiêu chí thiết kế kinh điển."],
    ["Làm phim hoạt hình theo nhóm cần phân công thế nào để hiệu quả?", "Chia việc theo khâu: kịch bản, vẽ, diễn hoạt, âm thanh", "Một người làm toàn bộ mọi khâu", "Ai cũng làm cùng một khâu duy nhất", "Phân công rõ ràng theo sở trường giúp sản phẩm đồng đều và đúng tiến độ."],
    ["Học làm phim hoạt hình ở phổ thông rèn luyện cho học sinh điều gì?", "Sáng tạo, kiên nhẫn và phối hợp làm việc nhóm", "Chỉ rèn kĩ năng vẽ tay thuần tuý", "Không liên quan tới các môn học khác", "Mỗi giây phim cần nhiều khung hình nên hoạt hình dạy tính kiên trì rất rõ."]
  ];
  var th11cdu2P = [["Khung hình chính", "Tư thế quan trọng của chuyển động"], ["Khung trung gian", "Nối hai khung chính cho mượt"], ["Phân cảnh", "Vẽ phác các cảnh chính của phim"], ["Animatic", "Phân cảnh dựng kèm âm thanh tạm"], ["Nén và giãn", "Nguyên tắc tạo lực cho chuyển động"], ["Stop motion", "Chụp từng khung vật thật dịch chuyển"], ["Dòng thời gian", "Lớp và khung hình theo thời gian"]];
  var th11cdu3F = [
    ["Mặt nạ lớp (layer mask) trong chỉnh sửa ảnh nâng cao có tác dụng gì?", "Che hoặc hiện một phần của lớp mà không xoá hẳn", "Nén lớp ảnh thành một tệp nhỏ hơn", "Đổi tên lớp ảnh cho dễ quản lí", "Sơn đen lên mặt nạ để ẩn, sơn trắng để hiện — sửa lại được bất cứ lúc nào."],
    ["Chỉnh sửa không phá huỷ (non-destructive) có nghĩa là gì?", "Chỉnh bằng lớp riêng, ảnh gốc vẫn giữ nguyên", "Chỉnh trực tiếp và xoá luôn ảnh gốc", "Không lưu lại bất kì thay đổi nào", "Nhờ cách này, người sửa có thể quay lại thông số cũ mà không mất ảnh gốc."],
    ["Lớp điều chỉnh (adjustment layer) được dùng để làm gì?", "Chỉnh sáng, màu cho các lớp dưới mà không sửa trực tiếp", "Tạo thêm một lớp ảnh chụp mới", "Khoá các lớp dưới không cho sửa", "Tắt hoặc sửa lớp điều chỉnh bất cứ lúc nào mà ảnh gốc không bị thay đổi."],
    ["Làm mềm mép vùng chọn (feather) trước khi ghép ảnh có ích gì?", "Mép ghép chuyển dần, tự nhiên, không bị cắt cứng", "Vùng chọn tự mở rộng ra toàn ảnh", "Ảnh ghép tự tăng độ phân giải", "Feather tạo dải chuyển mờ quanh mép chọn, giúp vật ghép hoà vào nền mới."],
    ["Khi ghép một vật từ ảnh này sang nền ảnh khác, điều kiện nào quan trọng nhất?", "Ánh sáng, góc nhìn và kích thước phải khớp với nền", "Vật ghép phải ở chính giữa ảnh nền", "Hai ảnh phải chụp cùng một ngày", "Sai hướng sáng hoặc sai phối cảnh là dấu hiệu dễ nhận ra nhất của ảnh ghép vụng."],
    ["Để màu của vật ghép hài hoà với nền mới, cần chỉnh những gì?", "Cân lại độ sáng, độ tương phản và sắc độ màu", "Chỉ cần phóng to vật ghép lên", "Đổi tên các lớp trong tệp ảnh", "Công cụ cân bằng màu giúp vật ghép không bị lệch tông so với cảnh nền."],
    ["Công cụ chữa ảnh (Healing) khi retouch chân dung thường dùng để làm gì?", "Xoá mụn, vết nhỏ mà vẫn giữ chất liệu da tự nhiên", "Thay đổi hoàn toàn khuôn mặt người mẫu", "Tăng độ sáng cho toàn bộ bức ảnh", "Retouch đúng mức giữ được nét tự nhiên; lạm dụng làm da mất hết chi tiết thật."],
    ["Thay nền cho ảnh chân dung gồm trình tự việc chính nào?", "Chọn tách chủ thể, đặt nền mới, cân sáng và màu", "In ảnh ra rồi cắt dán bằng tay", "Đổi định dạng tệp của ảnh gốc", "Tách chủ thể sạch ở vùng tóc là bước khó nhất khi thay nền chân dung."],
    ["Khử nhiễu (noise) cho ảnh chụp thiếu sáng cần đánh đổi điều gì?", "Giảm nhiễu mạnh quá sẽ làm ảnh mất chi tiết, bị bệt", "Khử nhiễu làm dung lượng tệp tăng vọt", "Khử nhiễu làm đổi màu toàn bộ ảnh", "Nên khử nhiễu vừa mức rồi mới làm nét để ảnh sạch mà vẫn giữ chi tiết."],
    ["Làm nét (sharpen) ảnh nên thực hiện ở giai đoạn nào của quy trình?", "Ở bước cuối, sau khi đã chỉnh sáng, màu và cắt cúp", "Ngay khi vừa mở tệp ảnh gốc", "Trước khi tách nền cho ảnh", "Làm nét sớm rồi tiếp tục phóng to, cắt cúp sẽ làm nổi hạt và viền giả."],
    ["Một poster truyền thông hiệu quả thường có bố cục thế nào?", "Một hình chủ đạo lớn, tiêu đề ngắn và nổi bật", "Càng nhiều đoạn chữ dài càng tốt", "Nhiều hình nhỏ xếp kín không khoảng trống", "Người xem lướt qua poster trong vài giây nên thông điệp chính phải đập vào mắt ngay."],
    ["Khi tạo bài đăng mạng xã hội bằng ảnh, yếu tố nào cần kiểm tra trước tiên?", "Kích thước ảnh đúng chuẩn của nền tảng đăng", "Tên tệp ảnh phải viết bằng tiếng Anh", "Ảnh phải có đúng mười lớp chỉnh sửa", "Sai kích thước khiến ảnh bị cắt mất nội dung hoặc giảm chất lượng hiển thị."],
    ["Đồ hoạ thông tin (infographic) trình bày nội dung theo cách nào?", "Kết hợp hình ảnh, biểu đồ và chữ ngắn gọn để dễ hiểu", "Viết thành bài văn dài nhiều đoạn", "Chỉ dùng bảng số liệu thuần tuý", "Infographic biến số liệu khô khan thành hình ảnh trực quan, dễ nhớ."],
    ["Dùng ảnh lấy trên mạng để làm sản phẩm số cần tuân thủ điều gì?", "Chỉ dùng ảnh có phép, tự chụp hoặc nguồn miễn phí bản quyền", "Ảnh nào tải được đều dùng tự do", "Chỉ cần cắt bỏ logo của tác giả", "Ghi nguồn ảnh là thói quen tốt và là yêu cầu tôn trọng bản quyền."],
    ["Sản phẩm số in ấn cần độ phân giải tối thiểu khoảng bao nhiêu?", "Khoảng 300 dpi để hình in sắc nét", "Khoảng 30 dpi là đủ nét", "Độ phân giải không ảnh hưởng tới bản in", "Ảnh cho màn hình chỉ cần khoảng 72–96 dpi nhưng in ấn đòi hỏi cao hơn nhiều."],
    ["Khi thiết kế sản phẩm sẽ in ra giấy, hệ màu nào nên được dùng?", "CMYK — hệ màu của in ấn bốn màu", "RGB — hệ màu của màn hình", "Đen trắng hoàn toàn", "Thiết kế bằng RGB rồi in trực tiếp thường bị lệch màu so với xem trên màn hình."],
    ["Xuất tệp sản phẩm số theo mục đích dùng thế nào là đúng?", "In ấn: PDF chất lượng cao; web: JPG hoặc PNG", "Mọi mục đích đều xuất một định dạng duy nhất", "Web luôn dùng tệp dung lượng lớn nhất", "Giữ lại tệp nguồn có lớp để còn sửa khi khách hàng yêu cầu thay đổi."],
    ["Chữ trên sản phẩm truyền thông dễ đọc khi đạt điều kiện nào?", "Tương phản rõ với nền, cỡ chữ đủ lớn", "Chữ cùng tông màu với nền phía sau", "Dùng nhiều kiểu chữ trong một sản phẩm", "Thường chỉ nên dùng tối đa hai kiểu chữ trong một ấn phẩm để giữ thống nhất."],
    ["Khoảng trắng trong thiết kế sản phẩm số có vai trò gì?", "Tạo độ thoáng, giúp nội dung chính nổi bật và dễ đọc", "Là phần thừa cần lấp kín bằng hình ảnh", "Làm sản phẩm trông trống rỗng, thiếu ý tưởng", "Khoảng trắng được sắp đặt có chủ ý là một phần của bố cục, không phải lãng phí."],
    ["Một bộ sản phẩm truyền thông thống nhất cần giữ chung những yếu tố nào?", "Màu nhận diện, kiểu chữ và phong cách hình ảnh", "Mỗi sản phẩm một màu chủ đạo khác hẳn", "Mỗi sản phẩm dùng một logo khác nhau", "Thống nhất hình ảnh giúp người xem nhận ra thương hiệu ngay lập tức."],
    ["Trước khi đăng hoặc in sản phẩm số, bước kiểm tra cuối cùng gồm gì?", "Rà chính tả, số liệu, kích thước và chất lượng ảnh", "Đổi tên tệp thành tên thật dài", "Xoá hết các lớp dự phòng trong tệp", "Lỗi chính tả trên poster đã in là sai sót tốn kém và khó sửa nhất."],
    ["Quản lí tệp khi làm sản phẩm số nhiều phiên bản nên thực hiện thế nào?", "Đặt tên rõ ràng kèm số phiên bản, lưu thư mục riêng", "Mọi phiên bản lưu chung một tên tệp duy nhất", "Chỉ giữ phiên bản cuối, xoá hết bản nháp", "Tên tệp có ngày hoặc số phiên bản giúp tìm lại bản cần dùng mà không nhầm lẫn."],
    ["Ghép ảnh panorama từ nhiều ảnh chụp liên tiếp cần chú ý điều gì?", "Các ảnh phải chồng lấp một phần và cùng mức sáng", "Các ảnh chụp rời nhau hoàn toàn", "Mỗi ảnh dùng một mức sáng khác nhau", "Phần chồng lấp là cơ sở để phần mềm tìm điểm chung và nối các ảnh lại."],
    ["Tạo sản phẩm số phục vụ học tập, ví dụ thẻ học từ vựng, cần ưu tiên gì?", "Thông tin đúng, chữ rõ và hình minh hoạ sát nội dung", "Trang trí cầu kì che mất nội dung chính", "Dùng thật nhiều màu sắc sặc sỡ", "Sản phẩm số tốt luôn đặt mục đích sử dụng lên trên trang trí bề ngoài."]
  ];
  var th11cdu3P = [["Mặt nạ lớp", "Che, hiện một phần lớp không xoá"], ["Lớp điều chỉnh", "Chỉnh sáng màu không sửa ảnh gốc"], ["Làm mềm mép chọn", "Mép ghép chuyển dần tự nhiên"], ["Chữa ảnh (Healing)", "Xoá vết nhỏ giữ chất liệu da"], ["Poster truyền thông", "Hình chủ đạo, tiêu đề ngắn nổi bật"], ["Infographic", "Hình và chữ ngắn gọn dễ hiểu"], ["Màu CMYK", "Hệ màu dùng cho in ấn"]];
  var TIN11 = [
    TP("th11-t1", "🖥️", "Chủ đề 1: Máy tính và xã hội tri thức", "Lõi chung — Bài 1–5 • Hệ điều hành, phần mềm nguồn mở/thương mại, lưu trữ trực tuyến, phòng chống lừa đảo (dùng chung hai định hướng)", KP(th11t1F, th11t1P), KN(th11t1F, th11t1P, "Tin học")),
    TP("th11-t2", "🗄️", "Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", "Lõi chung — Bài 6–8 • Hệ quản trị CSDL, bảng và khoá, ngôn ngữ truy vấn SQL cơ bản (dùng chung hai định hướng)", KP(th11t2F, th11t2P), KN(th11t2F, th11t2P, "Tin học")),
    TP("th11-t3", "🛡️", "Chủ đề 3: Đạo đức, pháp luật và văn hoá trong môi trường số", "Lõi chung — Bài 9 • Ứng xử văn hoá, bản quyền, sử dụng mạng xã hội an toàn (dùng chung hai định hướng)", KP(th11t3F, th11t3P), KN(th11t3F, th11t3P, "Tin học")),
    TP("th11-t4", "🗃️", "Chủ đề 4: Giới thiệu các hệ cơ sở dữ liệu", "Lõi chung — Bài 10–15 • CSDL quan hệ, khoá chính/khoá ngoài, chuẩn hoá, SQL và HeidiSQL (dùng chung hai định hướng)", KP(th11t4F, th11t4P), KN(th11t4F, th11t4P, "Tin học")),
    TP("th11-t5", "🧭", "Chủ đề 5: Hướng nghiệp với tin học", "Lõi chung — Bài 16 • Nhóm nghề quản trị và thiết kế trong lĩnh vực tin học (dùng chung hai định hướng)", KP(th11t5F, th11t5P), KN(th11t5F, th11t5P, "Tin học")),
    TP("th11-k6", "💻", "Khoa học máy tính — Chủ đề 6: Kĩ thuật lập trình", "Định hướng KHMT — Bài 17–31 • Mảng, xâu, sắp xếp, tìm kiếm, đệ quy, kĩ thuật duyệt", MP(KP(th11k6F, th11k6P), { choose: [th11SearchGen, th11RecGen], blank: [th11SearchGen, th11RecGen], match: [], games: [] }), KN(th11k6F, th11k6P, "Tin học")),
    TP("th11-cdk1", "🔁", "Khoa học máy tính — Chuyên đề 1: Thực hành thiết kế thuật toán theo kĩ thuật đệ quy", "Chuyên đề KHMT • Đệ quy, bài toán Tháp Hà Nội", KP(th11cdk1F, th11cdk1P), KN(th11cdk1F, th11cdk1P, "Tin học")),
    TP("th11-cdk2", "✂️", "Khoa học máy tính — Chuyên đề 2: Thuật toán chia để trị", "Chuyên đề KHMT • Chia để trị, tìm kiếm nhị phân đệ quy, sắp xếp trộn", KP(th11cdk2F, th11cdk2P), KN(th11cdk2F, th11cdk2P, "Tin học")),
    TP("th11-cdk3", "♟️", "Khoa học máy tính — Chuyên đề 3: Kĩ thuật duyệt", "Chuyên đề KHMT • Duyệt quay lui, bài toán xếp Hậu", KP(th11cdk3F, th11cdk3P), KN(th11cdk3F, th11cdk3P, "Tin học")),
    TP("th11-u6", "🛠️", "Tin học ứng dụng — Chủ đề 6: Thực hành tạo và khai thác CSDL", "Định hướng THƯD — Bài 17–24 • Tạo bảng, liên kết, truy vấn, biểu mẫu, báo cáo trong phần mềm quản trị CSDL", KP(th11u6F, th11u6P), KN(th11u6F, th11u6P, "Tin học")),
    TP("th11-u7", "🎬", "Tin học ứng dụng — Chủ đề 7: Phần mềm chỉnh sửa ảnh và làm video", "Định hướng THƯD — Bài 25–31 • Chỉnh sửa ảnh (lớp, kênh màu), làm video, hiệu ứng chuyển cảnh", KP(th11u7F, th11u7P), KN(th11u7F, th11u7P, "Tin học")),
    TP("th11-cdu1", "🎨", "Tin học ứng dụng — Chuyên đề 1: Thực hành phần mềm vẽ trang trí", "Chuyên đề THƯD • Vẽ trang trí, lặp mẫu hoa văn, đồ hoạ vector cơ bản", KP(th11cdu1F, th11cdu1P), KN(th11cdu1F, th11cdu1P, "Tin học")),
    TP("th11-cdu2", "🐰", "Tin học ứng dụng — Chuyên đề 2: Thực hành làm phim hoạt hình", "Chuyên đề THƯD • Các pha của phim hoạt hình, nhân vật, chuyển động, xuất phim", KP(th11cdu2F, th11cdu2P), KN(th11cdu2F, th11cdu2P, "Tin học")),
    TP("th11-cdu3", "🖼️", "Tin học ứng dụng — Chuyên đề 3: Thực hành chỉnh sửa ảnh, tạo sản phẩm số", "Chuyên đề THƯD • Chỉnh sửa ảnh nâng cao, ghép ảnh, tạo sản phẩm truyền thông số", KP(th11cdu3F, th11cdu3P), KN(th11cdu3F, th11cdu3P, "Tin học"))
  ];
  /* ==================================================================
     CÔNG NGHỆ 11 — Kết nối tri thức (2 định hướng: Chăn nuôi / Cơ khí)
     ================================================================== */
  var cn11cn1F = [
    ["Chăn nuôi có vai trò quan trọng nào đối với đời sống?", "Cung cấp thực phẩm giàu dinh dưỡng cho con người", "Chỉ cung cấp nguyên liệu cho xây dựng", "Không tạo ra sản phẩm tiêu dùng nào", "Thịt, trứng, sữa là nguồn đạm động vật quan trọng trong bữa ăn."],
    ["Chăn nuôi cung cấp nguyên liệu cho ngành nào?", "Công nghiệp chế biến, da giày, dược phẩm", "Chỉ ngành khai thác mỏ", "Ngành hàng không vũ trụ", "Da, lông, sừng và nội tạng vật nuôi đều là nguyên liệu có giá trị."],
    ["Phân chuồng từ chăn nuôi có tác dụng gì với trồng trọt?", "Cung cấp chất hữu cơ, cải tạo độ phì của đất", "Làm đất bị chai cứng hoàn toàn", "Không có tác dụng gì với cây trồng", "Mô hình vườn – ao – chuồng kết hợp chăn nuôi với trồng trọt rất hiệu quả."],
    ["Chăn nuôi góp phần thế nào vào kinh tế hộ gia đình?", "Tạo thu nhập, việc làm và tận dụng phụ phẩm nông nghiệp", "Chỉ gây tốn kém, không có thu nhập", "Chỉ phù hợp với doanh nghiệp lớn", "Nhiều hộ thoát nghèo nhờ chăn nuôi lợn, gà, bò quy mô phù hợp."],
    ["Vật nuôi là gì?", "Động vật được thuần hoá, nuôi dưỡng vì lợi ích con người", "Mọi động vật sống trong tự nhiên hoang dã", "Chỉ các loài động vật sống dưới nước", "Vật nuôi được con người chọn lọc, chăm sóc qua nhiều thế hệ."],
    ["Theo mục đích sử dụng, vật nuôi được phân thành những nhóm nào?", "Lấy thịt, lấy sữa, lấy trứng, làm cảnh, kéo cày…", "Chỉ có nhóm vật nuôi lấy thịt", "Nhóm bay được và nhóm không bay được", "Một vật nuôi có thể thuộc nhiều nhóm mục đích khác nhau."],
    ["Nhóm vật nuôi nào thuộc gia súc?", "Lợn, bò, trâu, dê và cừu", "Gà, vịt, ngan và ngỗng", "Cá, tôm và cua", "Gia súc là thú nuôi lớn; gia cầm là chim nuôi như gà, vịt."],
    ["Nhóm vật nuôi nào thuộc gia cầm?", "Gà, vịt, ngan, ngỗng và chim cút", "Lợn, bò và trâu", "Chó, mèo và thỏ cảnh", "Gia cầm cho thịt, trứng và lông, sinh sản nhanh, vòng đời ngắn."],
    ["Thuỷ sản trong chăn nuôi gồm những đối tượng nào?", "Cá, tôm, cua và các loài thuỷ sinh được nuôi", "Chỉ các loài cá sống ở biển khơi", "Rong biển và tảo biển", "Nuôi trồng thuỷ sản là bộ phận quan trọng của ngành chăn nuôi."],
    ["Triển vọng của chăn nuôi Việt Nam hiện nay là gì?", "Ứng dụng công nghệ cao, an toàn sinh học, quy mô lớn", "Quay lại chăn thả tự do hoàn toàn", "Giảm dần và tiến tới xoá bỏ chăn nuôi", "Chăn nuôi trang trại, khép kín, gắn truy xuất nguồn gốc là xu hướng chính."],
    ["Chăn nuôi thông minh ứng dụng công nghệ nào?", "Cảm biến, tự động cho ăn, IoT quản lí đàn vật nuôi", "Chỉ dùng sức người như truyền thống", "Không ứng dụng công nghệ nào", "Chuồng thông minh tự điều tiết nhiệt độ, độ ẩm và cảnh báo bệnh sớm."],
    ["Yêu cầu đối với người lao động trong chăn nuôi hiện đại là gì?", "Có kiến thức giống, dinh dưỡng, thú y và an toàn lao động", "Chỉ cần sức khoẻ, không cần học tập", "Không cần tuân thủ quy trình kĩ thuật", "Người chăn nuôi hiện đại còn cần kĩ năng quản lí và xử lí dữ liệu đàn."],
    ["Chăn nuôi bền vững cần đảm bảo những yếu tố nào?", "Hiệu quả kinh tế, an toàn thực phẩm, bảo vệ môi trường", "Chỉ chạy theo năng suất cao nhất", "Không quan tâm tới môi trường xung quanh", "Phát triển bền vững cân bằng lợi ích kinh tế – xã hội – môi trường."],
    ["Sản phẩm chăn nuôi nào thuộc nhóm thực phẩm thiết yếu hằng ngày?", "Thịt, trứng và sữa tươi", "Da giày và áo lông", "Phân chuồng và khí biogas", "Sữa và trứng cung cấp đạm, canxi và vitamin quan trọng cho trẻ em."],
    ["Vật nuôi đặc sản có đặc điểm gì nổi bật?", "Giống bản địa, chất lượng cao, giá trị kinh tế lớn", "Năng suất luôn thấp và khó bán", "Chỉ nuôi được ở nước ngoài", "Gà Đông Tảo, lợn Móng Cái là vật nuôi đặc sản nổi tiếng của Việt Nam."],
    ["Chăn nuôi theo chuỗi giá trị có nghĩa là gì?", "Liên kết sản xuất – chế biến – tiêu thụ có kiểm soát", "Mỗi hộ tự nuôi và tự bán riêng lẻ", "Chỉ liên quan tới khâu bán sản phẩm", "Chuỗi giá trị giúp kiểm soát chất lượng và truy xuất nguồn gốc sản phẩm."],
    ["An toàn sinh học trong chăn nuôi là gì?", "Biện pháp ngăn mầm bệnh xâm nhập và lây lan trong trại", "Việc dùng thật nhiều kháng sinh cho vật nuôi", "Chỉ vệ sinh chuồng trại một lần mỗi năm", "An toàn sinh học gồm cách li, vệ sinh, khử trùng và kiểm soát ra vào trại."],
    ["Vì sao chăn nuôi cần gắn với bảo vệ môi trường?", "Chất thải chăn nuôi gây ô nhiễm nếu không xử lí tốt", "Chăn nuôi không tạo ra chất thải nào", "Môi trường không ảnh hưởng tới vật nuôi", "Xử lí chất thải tốt còn tạo phân bón và khí biogas có ích."],
    ["Gia cầm được nuôi phổ biến nhất ở Việt Nam là loài nào?", "Gà, vịt với nhiều giống nội và giống nhập nội", "Chim đà điểu và chim công", "Chỉ có gà chọi làm cảnh", "Gà Ri, gà Đông Tảo là giống nội; gà Lương Phượng là giống nhập được nuôi rộng rãi."],
    ["Bò sữa được nuôi tập trung nhiều ở vùng nào của nước ta?", "Vùng có khí hậu mát, đồng cỏ như Mộc Châu, Đà Lạt", "Vùng biển đảo xa bờ", "Vùng sa mạc khô cằn", "Bò sữa cần khí hậu mát mẻ và nguồn thức ăn xanh dồi dào quanh năm."],
    ["Phân loại vật nuôi theo nguồn gốc gồm những nhóm nào?", "Vật nuôi bản địa và vật nuôi nhập nội (ngoại nhập)", "Vật nuôi trên cạn và dưới nước", "Vật nuôi lớn và vật nuôi nhỏ", "Giống bản địa thích nghi tốt với điều kiện địa phương, giống nhập cho năng suất cao."],
    ["Chăn nuôi đóng vai trò gì trong an ninh lương thực?", "Đảm bảo nguồn đạm động vật ổn định cho người dân", "Không liên quan tới lương thực, thực phẩm", "Chỉ phục vụ xuất khẩu ra nước ngoài", "An ninh lương thực gồm cả đủ lượng và đủ chất dinh dưỡng cho mọi người."]
  ];
  var cn11cn1P = [
    ["Lợn", "Gia súc lấy thịt"],
    ["Bò sữa", "Gia súc lấy sữa"],
    ["Gà đẻ", "Gia cầm lấy trứng"],
    ["Vịt", "Gia cầm lấy thịt, trứng"],
    ["Trâu", "Sức kéo và lấy thịt"],
    ["Cá tra", "Thuỷ sản nuôi nước ngọt"],
    ["Chó cảnh", "Vật nuôi làm cảnh"]
  ];
  var cn11cn2F = [
    ["Chọn lọc giống vật nuôi là gì?", "Chọn cá thể tốt làm giống, loại thải cá thể kém", "Nuôi mọi cá thể không cần chọn lựa", "Chỉ chọn cá thể có màu lông đẹp nhất", "Chọn lọc làm tăng dần tỉ lệ gen tốt trong đàn qua các thế hệ."],
    ["Nhân giống vật nuôi nhằm mục đích gì?", "Tạo đàn con có đặc tính tốt của bố mẹ", "Làm giảm chất lượng đàn vật nuôi", "Chỉ để tăng số lượng mà không cần chất lượng", "Nhân giống kết hợp với chọn lọc tạo nên công tác giống vật nuôi."],
    ["Chọn lọc cá thể dựa trên tiêu chí nào?", "Ngoại hình, thể chất, năng suất và nguồn gốc (phả hệ)", "Chỉ dựa vào sở thích của người nuôi", "Chỉ chọn cá thể lớn nhất đàn ngẫu nhiên", "Cần kết hợp phả hệ, bản thân cá thể và đời con để chọn chính xác."],
    ["Nhân giống thuần chủng là gì?", "Cho giao phối cùng giống để giữ đặc tính giống", "Lai hai giống khác nhau hoàn toàn", "Lai vật nuôi với loài hoang dã", "Nhân thuần duy trì và cải tiến giống, tạo đàn hạt nhân chất lượng cao."],
    ["Lai giống vật nuôi nhằm mục đích gì?", "Kết hợp ưu điểm của các giống, tận dụng ưu thế lai", "Làm mất hết đặc tính tốt của bố mẹ", "Chỉ để tạo màu lông mới lạ", "Con lai F1 thường sinh trưởng nhanh, chống chịu tốt hơn bố mẹ."],
    ["Ưu thế lai biểu hiện ở điểm nào?", "Con lai vượt bố mẹ về sinh trưởng, năng suất, sức sống", "Con lai luôn yếu hơn cả bố mẹ", "Con lai không sinh sản được trong mọi trường hợp", "Ưu thế lai cao nhất ở thế hệ F1, giảm dần ở các thế hệ sau."],
    ["Thụ tinh nhân tạo trong chăn nuôi có ưu điểm gì?", "Phổ biến nhanh gen tốt, giảm số con đực giống cần nuôi", "Không cần con đực giống chất lượng cao", "Tỉ lệ thụ thai luôn đạt một trăm phần trăm", "Một con đực tốt có thể phối giống cho rất nhiều con cái nhờ thụ tinh nhân tạo."],
    ["Cấy truyền phôi là công nghệ gì?", "Lấy phôi từ con mẹ tốt, cấy vào con mẹ khác mang thai hộ", "Ghép một bộ phận cơ thể vật nuôi", "Nuôi vật nuôi hoàn toàn trong ống nghiệm", "Cấy truyền phôi giúp nhân nhanh đàn giống từ những con mẹ xuất sắc."],
    ["Chỉ thị phân tử hỗ trợ chọn giống vật nuôi thế nào?", "Nhận biết sớm cá thể mang gen tốt ngay từ khi còn nhỏ", "Thay thế hoàn toàn việc nuôi thử nghiệm", "Chỉ dùng để xác định màu lông vật nuôi", "Chọn giống nhờ chỉ thị phân tử rút ngắn thời gian và tăng độ chính xác."],
    ["Bảo tồn giống vật nuôi bản địa có ý nghĩa gì?", "Giữ nguồn gen quý thích nghi tốt, chống chịu cao", "Không còn ý nghĩa trong chăn nuôi hiện đại", "Chỉ để trưng bày trong vườn thú", "Lợn Móng Cái, gà Ri là nguồn gen bản địa quý cần được bảo tồn."],
    ["Giống lợn Landrace có đặc điểm nổi bật nào?", "Thân dài, sinh trưởng nhanh, tỉ lệ nạc cao", "Thân ngắn, nhiều mỡ, chậm lớn", "Chỉ nuôi làm cảnh trong nhà", "Landrace và Yorkshire là hai giống lợn ngoại được dùng nhiều trong lai kinh tế."],
    ["Giống bò Holstein Friesian (HF) nổi tiếng về điều gì?", "Cho sản lượng sữa rất cao", "Cho thịt ngon nhất trong các giống bò", "Chuyên dùng để cày kéo", "Bò HF có lông loang đen trắng, là giống bò sữa chủ lực trên thế giới."],
    ["Đánh giá đời con trong chọn giống có tác dụng gì?", "Khẳng định chính xác giá trị giống của bố mẹ", "Không cần thiết nếu bố mẹ đẹp", "Chỉ tốn thời gian mà không có ích", "Cá thể có đời con tốt mới thực sự là giống tốt, dù ngoại hình chỉ khá."],
    ["Lai kinh tế khác lai tạo giống mới ở điểm nào?", "Lai kinh tế dùng con lai nuôi thương phẩm, không làm giống", "Hai hình thức hoàn toàn giống nhau", "Lai kinh tế tạo ra giống mới ổn định", "Lai kinh tế tận dụng ưu thế lai F1 để nuôi lấy thịt, trứng, sữa."],
    ["Công nghệ gen trong chọn giống vật nuôi được ứng dụng thế nào?", "Xác định gen, chỉnh sửa gen mang tính trạng mong muốn", "Thay đổi hoàn toàn loài vật nuôi", "Không được nghiên cứu ở bất kì nước nào", "Ứng dụng công nghệ gen phải tuân thủ chặt chẽ quy định an toàn sinh học."],
    ["Chọn lọc hàng loạt (quần thể) có đặc điểm gì?", "Chọn nhiều cá thể đạt tiêu chuẩn trong đàn làm giống", "Chỉ chọn đúng một cá thể duy nhất", "Chọn ngẫu nhiên không theo tiêu chuẩn nào", "Chọn lọc hàng loạt đơn giản, dễ làm nhưng hiệu quả chậm hơn chọn lọc cá thể."],
    ["Đực giống tốt cần đáp ứng yêu cầu nào?", "Khoẻ mạnh, ngoại hình chuẩn giống, khả năng phối giống tốt", "Chỉ cần có kích thước lớn nhất đàn", "Không cần kiểm tra bệnh tật", "Đực giống ảnh hưởng tới rất nhiều con nên yêu cầu chọn lọc càng khắt khe."],
    ["Vì sao không nên cho vật nuôi giao phối cận huyết kéo dài?", "Con cháu dễ suy giảm sức sống, dị tật, năng suất thấp", "Cận huyết luôn tạo ra cá thể tốt hơn", "Không ảnh hưởng gì tới đàn vật nuôi", "Giao phối cận huyết chỉ dùng có kiểm soát trong tạo dòng thuần ở viện nghiên cứu."],
    ["Hồ sơ phả hệ (lí lịch) của vật nuôi giống dùng để làm gì?", "Theo dõi nguồn gốc, bố mẹ và năng suất qua các thế hệ", "Chỉ để trang trí hồ sơ của trang trại", "Không cần thiết với vật nuôi giống", "Phả hệ rõ ràng giúp dự đoán chất lượng đời con và tránh cận huyết."],
    ["Nuôi dưỡng vật nuôi giống khác vật nuôi thương phẩm ở điểm nào?", "Chế độ dinh dưỡng, chăm sóc khắt khe và theo dõi riêng", "Hoàn toàn giống hệt nhau mọi mặt", "Vật nuôi giống không cần cho ăn đầy đủ", "Vật nuôi giống quyết định chất lượng đàn mai sau nên đầu tư chăm sóc cao hơn."],
    ["Ứng dụng công nghệ sinh học trong nhân giống thuỷ sản gồm kĩ thuật nào?", "Cho đẻ nhân tạo, điều khiển giới tính cá nuôi", "Chỉ đánh bắt cá tự nhiên ngoài biển", "Không áp dụng được cho thuỷ sản", "Cá rô phi đơn tính đực lớn nhanh, đồng đều nhờ điều khiển giới tính."],
    ["Tiêu chuẩn chọn gà giống đẻ trứng gồm tiêu chí nào?", "Khoẻ, nhanh nhẹn, sản lượng trứng của mẹ cao", "Chỉ chọn gà có bộ lông sặc sỡ nhất", "Chọn gà nặng cân nhất đàn là tốt nhất", "Chọn giống gà đẻ cần kết hợp ngoại hình với lí lịch năng suất của đàn mẹ."]
  ];
  var cn11cn2P = [
    ["Nhân giống thuần chủng", "Giao phối cùng giống, giữ đặc tính"],
    ["Lai kinh tế", "Con lai nuôi thương phẩm, tận dụng ưu thế lai"],
    ["Thụ tinh nhân tạo", "Dùng tinh dịch phối cho nhiều con cái"],
    ["Cấy truyền phôi", "Phôi của mẹ tốt, mẹ khác mang thai hộ"],
    ["Chọn lọc cá thể", "Dựa vào phả hệ, bản thân và đời con"],
    ["Lợn Landrace", "Thân dài, tỉ lệ nạc cao"],
    ["Bò Holstein Friesian", "Giống bò cho sữa cao sản"],
    ["Lợn Móng Cái", "Giống lợn bản địa của Việt Nam"]
  ];
  var cn11cn3F = [
    ["Nhu cầu dinh dưỡng của vật nuôi gồm những chất chính nào?", "Năng lượng, protein, khoáng, vitamin và nước", "Chỉ cần nước và không khí", "Chỉ cần chất xơ từ rơm rạ", "Khẩu phần đủ và cân đối các chất giúp vật nuôi khoẻ, năng suất cao."],
    ["Protein trong thức ăn chăn nuôi có vai trò gì?", "Xây dựng cơ thể, tạo thịt, trứng, sữa và lông", "Chỉ cung cấp năng lượng cho cơ thể", "Không có vai trò sinh học nào", "Thiếu protein vật nuôi chậm lớn, giảm đẻ trứng và giảm tiết sữa."],
    ["Thức ăn tinh cho vật nuôi gồm những loại nào?", "Ngô, cám gạo, khô dầu, bột cá giàu năng lượng, đạm", "Rơm rạ và thân cây chuối", "Chỉ các loại lá cây rừng", "Thức ăn tinh giàu dinh dưỡng nên giá cao hơn thức ăn thô xanh."],
    ["Thức ăn thô xanh có đặc điểm gì?", "Nhiều xơ, nhiều nước: cỏ, rơm, thân lá cây thức ăn", "Giàu đạm nhất trong các loại thức ăn", "Hoàn toàn không chứa chất xơ", "Trâu bò dạ cỏ tiêu hoá tốt thức ăn thô xanh nhờ hệ vi sinh vật."],
    ["Khoáng chất nào cần thiết cho tạo xương và vỏ trứng?", "Canxi và phốt pho", "Sắt và đồng", "I-ốt và selen", "Thiếu canxi gà đẻ ra trứng vỏ mỏng, bò dễ bị bại liệt sau đẻ."],
    ["Vitamin A thiếu sẽ gây biểu hiện gì ở vật nuôi?", "Giảm thị lực, chậm lớn, giảm sức đề kháng", "Vật nuôi béo lên rất nhanh", "Không gây biểu hiện gì rõ rệt", "Vitamin A có nhiều trong cỏ xanh, ngô vàng và dầu gan cá."],
    ["Nước uống cho vật nuôi cần đảm bảo yêu cầu gì?", "Sạch, đủ lượng, không chứa mầm bệnh và hoá chất độc", "Nước ao tù bẩn cũng dùng được", "Vật nuôi không cần uống nước hằng ngày", "Nước chiếm tỉ lệ lớn trong cơ thể; thiếu nước vật nuôi giảm ăn rõ rệt."],
    ["Thức ăn hỗn hợp hoàn chỉnh là gì?", "Thức ăn phối trộn đủ chất theo từng giai đoạn nuôi", "Chỉ gồm một nguyên liệu duy nhất", "Thức ăn tự kiếm ngoài tự nhiên của vật nuôi", "Thức ăn công nghiệp được sản xuất theo công thức cho lợn con, gà đẻ…"],
    ["Ủ xanh thức ăn (ủ chua) nhằm mục đích gì?", "Bảo quản cỏ xanh lâu dài, tăng tính ngon miệng", "Làm cỏ bị thối hỏng hoàn toàn", "Chỉ để giảm trọng lượng thức ăn", "Ủ chua nhờ lên men lactic, dùng dự trữ thức ăn cho mùa khô, mùa đông."],
    ["Chế biến thức ăn bằng phương pháp lên men có lợi ích gì?", "Tăng dinh dưỡng, diệt mầm bệnh, vật nuôi dễ tiêu hoá", "Làm mất hết chất dinh dưỡng", "Không thay đổi gì so với thức ăn sống", "Ủ men cám, bã đậu giúp tận dụng phụ phẩm và giảm chi phí thức ăn."],
    ["Khẩu phần ăn của vật nuôi được xây dựng dựa trên cơ sở nào?", "Nhu cầu dinh dưỡng theo loài, tuổi, giai đoạn sản xuất", "Tuỳ theo lượng thức ăn sẵn có trong kho", "Mọi vật nuôi dùng chung một khẩu phần", "Lợn nái chửa, nái nuôi con và lợn thịt cần khẩu phần khác hẳn nhau."],
    ["Premix trong thức ăn chăn nuôi là gì?", "Hỗn hợp vitamin, khoáng vi lượng trộn vào thức ăn", "Một loại ngô lai mới", "Thuốc kháng sinh chữa bệnh", "Premix dùng lượng rất nhỏ nhưng quyết định sự cân đối của khẩu phần."],
    ["Vì sao thức ăn bị mốc nguy hiểm cho vật nuôi?", "Nấm mốc sinh độc tố aflatoxin gây ngộ độc, ung thư gan", "Thức ăn mốc thơm ngon hơn bình thường", "Mốc chỉ làm đổi màu thức ăn mà thôi", "Bảo quản thức ăn nơi khô ráo, thoáng mát để tránh nấm mốc phát sinh."],
    ["Giai đoạn nào lợn con cần thức ăn chất lượng cao nhất?", "Giai đoạn tập ăn và sau cai sữa", "Giai đoạn sắp xuất chuồng", "Mọi giai đoạn cần như nhau", "Thức ăn lợn con tập ăn phải thơm, dễ tiêu, giàu đạm và năng lượng."],
    ["Thức ăn cho bò sữa cần chú ý cân đối hai nhóm nào?", "Thức ăn thô xanh và thức ăn tinh theo sản lượng sữa", "Chỉ cho ăn rơm khô quanh năm", "Chỉ cho ăn thức ăn tinh đắt tiền", "Bò sữa thiếu thức ăn thô sẽ rối loạn tiêu hoá dạ cỏ và giảm mỡ sữa."],
    ["Đồng cỏ và cây thức ăn xanh có vai trò gì trong chăn nuôi?", "Cung cấp thức ăn thô rẻ, giàu vitamin cho gia súc nhai lại", "Không có vai trò, chỉ làm cảnh quan", "Chỉ dùng để che phủ đất chống xói mòn", "Cỏ voi, cỏ VA06 cho năng suất xanh rất cao, được trồng phổ biến."],
    ["Kiểm tra chất lượng nguyên liệu thức ăn cần chú ý điều gì?", "Độ ẩm, mốc, tạp chất và hàm lượng dinh dưỡng", "Chỉ cần nhìn màu sắc bên ngoài", "Không cần kiểm tra khi mua số lượng ít", "Nguyên liệu kém chất lượng làm giảm hiệu quả cả lô thức ăn thành phẩm."],
    ["Cho vật nuôi ăn đúng giờ, đúng lượng có tác dụng gì?", "Giúp tiêu hoá tốt, tránh rối loạn và lãng phí thức ăn", "Không có tác dụng gì đáng kể", "Chỉ để người nuôi dễ ghi nhớ", "Thay đổi thức ăn đột ngột dễ gây rối loạn tiêu hoá, cần chuyển đổi dần."],
    ["Enzyme bổ sung vào thức ăn chăn nuôi có tác dụng gì?", "Hỗ trợ tiêu hoá, tăng hấp thu dinh dưỡng từ thức ăn", "Giết chết mọi vi khuẩn trong chuồng", "Thay thế hoàn toàn thức ăn tinh", "Enzyme phytase giúp vật nuôi hấp thu phốt pho tốt hơn, giảm ô nhiễm."],
    ["Thức ăn thuỷ sản cần đặc tính gì khi thả xuống nước?", "Viên nổi hoặc chìm chậm, ít tan, giàu đạm", "Tan ngay lập tức trong nước", "Càng cứng như đá càng tốt", "Thức ăn cá chất lượng cao thường có hàm lượng đạm cao hơn thức ăn gia súc."],
    ["Tận dụng phụ phẩm nông nghiệp làm thức ăn có lợi ích gì?", "Giảm chi phí, giảm ô nhiễm, tăng hiệu quả kinh tế", "Làm vật nuôi chậm lớn trong mọi trường hợp", "Không được phép sử dụng trong chăn nuôi", "Rơm ủ urê, bã bia, bã sắn là phụ phẩm được tận dụng rộng rãi."],
    ["Thiếu vitamin D vật nuôi dễ mắc vấn đề gì?", "Còi xương, mềm xương do hấp thu canxi kém", "Béo phì và thừa mỡ nhanh", "Không ảnh hưởng tới xương", "Vitamin D giúp hấp thu canxi, phốt pho; vật nuôi cần được tắm nắng hợp lí."]
  ];
  var cn11cn3P = [
    ["Protein", "Tạo thịt, trứng, sữa, lông"],
    ["Canxi và phốt pho", "Tạo xương và vỏ trứng"],
    ["Vitamin A", "Tốt cho mắt và sức đề kháng"],
    ["Thức ăn tinh", "Ngô, cám, khô dầu giàu dinh dưỡng"],
    ["Thức ăn thô xanh", "Cỏ, rơm giàu chất xơ"],
    ["Premix", "Hỗn hợp vitamin, khoáng vi lượng"],
    ["Ủ chua thức ăn", "Bảo quản cỏ xanh nhờ lên men lactic"],
    ["Aflatoxin", "Độc tố nguy hiểm trong thức ăn mốc"]
  ];
  var cn11cn4F = [
    ["Bệnh ở vật nuôi do những tác nhân nào gây ra?", "Vi khuẩn, virus, kí sinh trùng, nấm và yếu tố môi trường", "Chỉ do thời tiết thay đổi gây ra", "Chỉ do thức ăn không hợp khẩu vị", "Bệnh truyền nhiễm do vi sinh vật gây ra và có khả năng lây lan nhanh."],
    ["Nguyên tắc phòng bệnh cho vật nuôi được ưu tiên thế nào?", "Phòng bệnh hơn chữa bệnh bằng vệ sinh, vắc-xin, dinh dưỡng", "Chỉ chữa khi bệnh đã bùng phát nặng", "Chỉ cần dùng kháng sinh liều cao liên tục", "Phòng bệnh tốt giúp giảm thiệt hại và giảm lạm dụng kháng sinh."],
    ["Vắc-xin phòng bệnh cho vật nuôi có cơ chế gì?", "Kích thích cơ thể tạo kháng thể chống mầm bệnh", "Tiêu diệt trực tiếp mọi mầm bệnh trong chuồng", "Cung cấp dinh dưỡng cho vật nuôi", "Tiêm vắc-xin đúng lịch và đúng liều là biện pháp phòng bệnh chủ động hiệu quả."],
    ["Bệnh lở mồm long móng ở gia súc do tác nhân nào gây ra?", "Virus gây mụn nước ở miệng, móng, lây lan rất nhanh", "Vi khuẩn gây viêm phổi", "Kí sinh trùng đường ruột", "Lở mồm long móng là bệnh nguy hiểm, phải báo thú y và cách li triệt để."],
    ["Bệnh dịch tả lợn châu Phi có đặc điểm nguy hiểm nào?", "Do virus, tỉ lệ chết rất cao, chưa có vắc-xin phổ biến rộng", "Bệnh nhẹ, tự khỏi sau vài ngày", "Chỉ gây bệnh ở lợn con mới sinh", "Phòng dịch tả lợn châu Phi chủ yếu bằng an toàn sinh học nghiêm ngặt."],
    ["Bệnh cúm gia cầm (H5N1) nguy hiểm ở điểm nào?", "Lây nhanh ở gia cầm và có thể lây sang người", "Chỉ gây giảm đẻ trứng nhẹ", "Không lây giữa các con gia cầm", "Khi có cúm gia cầm phải tiêu huỷ đàn theo quy định và khử trùng chuồng trại."],
    ["Bệnh Newcastle (dịch tả gà) có biểu hiện đặc trưng nào?", "Gà ủ rũ, tiêu chảy phân xanh, vẹo cổ, chết nhanh", "Gà chỉ hắt hơi nhẹ vài ngày", "Gà tăng trọng nhanh bất thường", "Tiêm vắc-xin Newcastle đúng lịch là biện pháp phòng bệnh quan trọng cho đàn gà."],
    ["Khi phát hiện vật nuôi mắc bệnh truyền nhiễm nguy hiểm, cần làm gì đầu tiên?", "Cách li con bệnh, báo cán bộ thú y, không bán chạy đàn", "Bán ngay đàn vật nuôi ra thị trường", "Tự ý mổ thịt chia cho hàng xóm ăn", "Che giấu dịch bệnh gây lây lan rộng và bị xử phạt theo quy định pháp luật."],
    ["Khử trùng chuồng trại có tác dụng gì?", "Tiêu diệt mầm bệnh trong môi trường nuôi", "Làm chuồng trại có mùi thơm hơn", "Thay thế hoàn toàn việc tiêm vắc-xin", "Khử trùng định kì và sau mỗi lứa nuôi là khâu bắt buộc trong quy trình chăn nuôi."],
    ["Kí sinh trùng đường ruột gây hại vật nuôi thế nào?", "Hút chất dinh dưỡng, vật nuôi gầy yếu, chậm lớn", "Giúp vật nuôi tiêu hoá tốt hơn", "Không gây hại đáng kể nào", "Tẩy giun sán định kì giúp vật nuôi sinh trưởng tốt và giảm ô nhiễm mầm bệnh."],
    ["Bệnh tụ huyết trùng ở gia súc, gia cầm do tác nhân nào?", "Vi khuẩn Pasteurella gây bệnh cấp tính, chết nhanh", "Virus gây bệnh mạn tính kéo dài", "Nấm mốc trong thức ăn gây ra", "Tụ huyết trùng thường bùng phát khi thời tiết thay đổi, vật nuôi stress."],
    ["Cách li vật nuôi mới mua về trại nhằm mục đích gì?", "Theo dõi, phát hiện bệnh trước khi nhập đàn chung", "Để vật nuôi quen với thức ăn mới", "Chỉ là thủ tục không cần thiết", "Thời gian cách li thường từ hai đến ba tuần kèm kiểm tra sức khoẻ."],
    ["Kháng sinh trong điều trị bệnh vật nuôi cần dùng thế nào?", "Đúng bệnh, đúng liều, đủ thời gian, theo hướng dẫn thú y", "Dùng càng nhiều loại cùng lúc càng tốt", "Ngừng ngay khi thấy vật nuôi đỡ bệnh", "Lạm dụng kháng sinh gây kháng thuốc và tồn dư trong sản phẩm chăn nuôi."],
    ["Bệnh viêm vú ở bò sữa gây thiệt hại thế nào?", "Giảm sản lượng, chất lượng sữa, có thể hỏng tuyến vú", "Làm bò cho sữa nhiều hơn bình thường", "Không ảnh hưởng tới chất lượng sữa", "Vệ sinh vắt sữa và bầu vú sạch sẽ là cách phòng viêm vú hiệu quả."],
    ["Bệnh đóng dấu lợn và bệnh nhiệt thán thuộc nhóm bệnh nào cần chú ý?", "Bệnh vi khuẩn nguy hiểm, nhiệt thán có thể lây sang người", "Bệnh do thiếu vitamin gây ra", "Bệnh chỉ xuất hiện ở gia cầm", "Gia súc chết do nhiệt thán không được mổ thịt, phải xử lí theo quy định thú y."],
    ["Nuôi dưỡng tốt giúp phòng bệnh cho vật nuôi bằng cách nào?", "Tăng sức đề kháng tự nhiên chống lại mầm bệnh", "Thay thế hoàn toàn vắc-xin và thuốc thú y", "Không liên quan tới khả năng chống bệnh", "Vật nuôi đủ dinh dưỡng, chuồng thoáng sạch ít mắc bệnh hơn hẳn."],
    ["Bệnh ở cá nuôi thường bùng phát khi nào?", "Khi môi trường nước ô nhiễm, mật độ nuôi quá dày", "Khi nước ao rất trong và sạch", "Không phụ thuộc vào môi trường nước", "Quản lí chất lượng nước là chìa khoá phòng bệnh cho thuỷ sản nuôi."],
    ["Vệ sinh tiêu độc sau khi xuất bán một lứa nuôi gọi là gì?", "Để trống chuồng, khử trùng trước khi nhập lứa mới", "Nhập ngay lứa mới vào chuồng cũ chưa dọn", "Chỉ quét dọn qua loa là đủ", "Thời gian trống chuồng giúp cắt đứt vòng lây nhiễm giữa các lứa nuôi."],
    ["Sổ theo dõi sức khoẻ đàn vật nuôi có ích gì?", "Ghi lịch tiêm phòng, bệnh và điều trị để quản lí đàn", "Chỉ để làm đẹp hồ sơ trang trại", "Không cần ghi chép nếu nuôi ít con", "Hồ sơ đầy đủ còn phục vụ truy xuất nguồn gốc và chứng nhận VietGAP."],
    ["Bệnh dại ở chó mèo nguy hiểm thế nào?", "Do virus, lây qua vết cắn và gây tử vong ở người", "Bệnh nhẹ, tự khỏi không cần tiêm phòng", "Chỉ lây qua đường thức ăn", "Tiêm vắc-xin dại định kì cho chó mèo là quy định bắt buộc để bảo vệ cộng đồng."],
    ["Xử lí vật nuôi chết do bệnh truyền nhiễm đúng cách là gì?", "Chôn sâu hoặc tiêu huỷ theo hướng dẫn thú y", "Vứt xuống sông, ao gần nhà", "Bán rẻ cho người khác làm thịt", "Xử lí không đúng cách làm mầm bệnh phát tán gây ô nhiễm và lây lan dịch."],
    ["Stress ở vật nuôi ảnh hưởng thế nào tới sức khoẻ?", "Làm giảm đề kháng, dễ phát bệnh và giảm năng suất", "Giúp vật nuôi chống bệnh tốt hơn", "Không ảnh hưởng gì tới vật nuôi", "Vận chuyển, thay đổi thời tiết, mật độ dày đều gây stress cho vật nuôi."]
  ];
  var cn11cn4P = [
    ["Lở mồm long móng", "Virus gây mụn nước miệng, móng gia súc"],
    ["Dịch tả lợn châu Phi", "Virus gây chết cao ở lợn, khó phòng bằng vắc-xin"],
    ["Cúm gia cầm H5N1", "Bệnh virus lây nhanh, có thể lây sang người"],
    ["Newcastle", "Bệnh virus nguy hiểm ở gà"],
    ["Tụ huyết trùng", "Vi khuẩn Pasteurella gây bệnh cấp tính"],
    ["Bệnh dại", "Virus lây qua vết cắn của chó mèo"],
    ["Vắc-xin", "Kích thích tạo kháng thể phòng bệnh"],
    ["Tẩy giun sán", "Loại bỏ kí sinh trùng đường ruột"]
  ];
  var cn11cn5F = [
    ["Chuồng nuôi lợn cần đảm bảo yêu cầu kĩ thuật nào?", "Thoáng mát, khô ráo, nền thoát nước, xa khu dân cư", "Kín mít, ẩm ướt quanh năm", "Càng gần nhà ở càng tốt", "Chuồng hướng đông nam đón gió mát, tránh gió lạnh mùa đông là lí tưởng."],
    ["Quy trình nuôi lợn thịt gồm những giai đoạn chính nào?", "Lợn con, lợn choai và lợn vỗ béo xuất chuồng", "Chỉ có một giai đoạn nuôi duy nhất", "Nuôi từ khi sinh tới già tự nhiên", "Mỗi giai đoạn lợn thịt cần khẩu phần và cách chăm sóc khác nhau."],
    ["Lợn nái sinh sản cần được chăm sóc đặc biệt ở giai đoạn nào?", "Giai đoạn mang thai cuối và nuôi con sau đẻ", "Chỉ cần chú ý lúc phối giống", "Không giai đoạn nào cần chăm sóc riêng", "Nái nuôi con cần thức ăn giàu dinh dưỡng để tiết nhiều sữa nuôi con."],
    ["Nuôi gà thịt công nghiệp có đặc điểm gì?", "Nuôi nhốt, thức ăn công nghiệp, xuất chuồng sau vài tuần", "Nuôi thả vườn hoàn toàn tự kiếm ăn", "Nuôi nhiều năm mới bán thịt", "Gà công nghiệp lớn rất nhanh nhờ giống và thức ăn được chọn lọc tối ưu."],
    ["Nuôi gà đẻ trứng cần chú ý chế độ chiếu sáng thế nào?", "Ánh sáng đủ dài kích thích gà đẻ trứng đều", "Để chuồng tối hoàn toàn cả ngày", "Chiếu sáng không ảnh hưởng tới đẻ trứng", "Gà đẻ cần khoảng 14–16 giờ sáng mỗi ngày và đủ canxi làm vỏ trứng."],
    ["Úm gà con trong những ngày đầu cần đảm bảo điều gì?", "Nhiệt độ ấm khoảng 32–35 °C, khô ráo, đủ nước uống", "Để gà con ở nơi lạnh và ẩm ướt", "Không cần sưởi ấm cho gà con", "Gà con chưa điều tiết thân nhiệt tốt nên úm đúng kĩ thuật quyết định tỉ lệ sống."],
    ["Bò thịt được vỗ béo bằng biện pháp nào?", "Tăng thức ăn tinh, cỏ chất lượng cao trước xuất bán", "Chỉ cho ăn rơm khô và nước lã", "Giảm dần lượng thức ăn mỗi ngày", "Vỗ béo đúng kĩ thuật giúp bò tăng trọng nhanh, thịt chất lượng tốt."],
    ["Vắt sữa bò đúng kĩ thuật cần thực hiện thế nào?", "Vắt đúng giờ, vệ sinh bầu vú, vắt kiệt sữa mỗi cữ", "Vắt bất cứ lúc nào tuỳ thích", "Không cần vệ sinh tay và dụng cụ vắt", "Vắt sữa không đúng kĩ thuật dễ gây viêm vú và giảm sản lượng sữa."],
    ["Hệ thống chuồng nuôi bò sữa hiện đại thường có trang bị gì?", "Máng ăn, máng uống tự động, quạt mát, máy vắt sữa", "Chỉ có nền đất và mái che đơn sơ", "Không cần nguồn nước sạch trong chuồng", "Chuồng bò sữa cần đệm lót êm và khu vực cho bò vận động thoải mái."],
    ["Mật độ nuôi vật nuôi quá dày gây hậu quả gì?", "Dễ lây bệnh, stress, chậm lớn, ô nhiễm chuồng trại", "Giúp vật nuôi lớn nhanh hơn hẳn", "Không gây hậu quả nào đáng kể", "Mỗi loài vật nuôi có quy định mật độ nuôi tối ưu theo diện tích chuồng."],
    ["Nuôi vịt trên cạn khác nuôi vịt có nước bơi thế nào?", "Vịt nuôi cạn không cần ao bơi, giảm ô nhiễm nguồn nước", "Hai cách nuôi hoàn toàn giống nhau", "Vịt nuôi cạn không cần uống nước", "Nuôi vịt cạn trong chuồng nền đệm lót sinh học đang được khuyến khích."],
    ["Đệm lót sinh học trong chuồng nuôi có tác dụng gì?", "Phân huỷ chất thải, giảm mùi hôi, giữ chuồng khô ấm", "Làm chuồng ẩm ướt và bẩn hơn", "Chỉ để trang trí nền chuồng", "Đệm lót sinh học dùng trấu, mùn cưa cấy men vi sinh, giảm công dọn chuồng."],
    ["Quy trình nuôi cá trong ao gồm những khâu chính nào?", "Cải tạo ao, chọn giống, cho ăn, quản lí nước, thu hoạch", "Chỉ thả cá xuống ao và chờ thu hoạch", "Không cần cải tạo ao trước khi thả", "Cải tạo ao gồm tát cạn, vét bùn, bón vôi khử trùng và gây màu nước."],
    ["Cho cá ăn cần tuân thủ nguyên tắc nào?", "Đủ lượng, đúng giờ, đúng chỗ và thức ăn chất lượng tốt", "Cho ăn càng nhiều càng tốt một lần", "Rải thức ăn tuỳ hứng khắp mặt ao", "Thức ăn thừa làm ô nhiễm nước ao, gây bệnh và lãng phí chi phí nuôi."],
    ["Nuôi tôm thâm canh cần quản lí chặt yếu tố nào?", "Chất lượng nước, độ mặn, pH, ôxi và thức ăn", "Chỉ cần thả giống thật dày", "Không cần theo dõi môi trường nước", "Tôm rất nhạy cảm với môi trường nên ao nuôi tôm thường có quạt nước tạo ôxi."],
    ["Ghi chép nhật kí chăn nuôi mang lại lợi ích gì?", "Theo dõi thức ăn, tăng trọng, bệnh để điều chỉnh kịp thời", "Chỉ tốn thời gian của người nuôi", "Không có ích cho quản lí đàn", "Nhật kí chăn nuôi là căn cứ tính hiệu quả kinh tế và truy xuất nguồn gốc."],
    ["Chuồng trại cần đặt cách xa khu dân cư vì lí do gì?", "Tránh ô nhiễm, mùi hôi và lây lan dịch bệnh cho người", "Để người nuôi đi lại khó khăn hơn", "Không có lí do cụ thể nào", "Quy hoạch chuồng trại xa dân cư, cuối hướng gió là yêu cầu vệ sinh cơ bản."],
    ["Thông gió trong chuồng nuôi có vai trò gì?", "Đưa khí sạch vào, đẩy khí độc và hơi ẩm ra ngoài", "Làm vật nuôi bị lạnh và ốm yếu", "Không cần thiết với chuồng nuôi kín", "Khí độc như amoniac trong chuồng kín gây bệnh hô hấp cho vật nuôi."],
    ["Nuôi dưỡng lợn con theo mẹ cần chú ý điều gì?", "Cho bú sữa đầu sớm, giữ ấm, tập ăn sớm cho lợn con", "Tách ngay lợn con khỏi mẹ từ lúc sinh", "Không cần cho lợn con bú sữa đầu", "Sữa đầu chứa nhiều kháng thể giúp lợn con chống bệnh trong những tuần đầu."],
    ["Xuất chuồng vật nuôi đúng thời điểm có ý nghĩa gì?", "Đạt trọng lượng tối ưu, hiệu quả kinh tế cao nhất", "Nuôi càng lâu càng có lãi trong mọi trường hợp", "Không ảnh hưởng tới lợi nhuận chăn nuôi", "Nuôi quá lâu tốn thức ăn mà tăng trọng chậm, giảm hiệu quả kinh tế."],
    ["Chăn nuôi hữu cơ có yêu cầu đặc trưng nào?", "Không dùng kháng sinh, hoá chất; nuôi vận động tự nhiên", "Dùng tối đa thức ăn công nghiệp tăng trọng", "Nuôi nhốt mật độ rất cao trong chuồng kín", "Sản phẩm chăn nuôi hữu cơ có giá cao nhưng đòi hỏi quy trình nghiêm ngặt."],
    ["Hệ thống cho ăn tự động trong trang trại có lợi ích gì?", "Cho ăn đúng lượng, đúng giờ, giảm nhân công và lãng phí", "Làm vật nuôi ăn quá nhiều liên tục", "Không khác gì cho ăn bằng tay", "Trang trại lớn dùng silo và đường chuyền thức ăn tự động tới từng ô chuồng."]
  ];
  var cn11cn5P = [
    ["Úm gà con", "Giữ ấm 32–35 °C những ngày đầu"],
    ["Đệm lót sinh học", "Phân huỷ chất thải, giảm mùi hôi chuồng"],
    ["Sữa đầu", "Giàu kháng thể cho con non mới sinh"],
    ["Vỗ béo bò", "Tăng thức ăn tinh trước khi xuất bán"],
    ["Quạt nước ao tôm", "Tăng ôxi hoà tan trong nước"],
    ["Máng uống tự động", "Cung cấp nước sạch liên tục cho vật nuôi"],
    ["Trống chuồng", "Để trống, khử trùng giữa hai lứa nuôi"],
    ["Cải tạo ao", "Vét bùn, bón vôi trước khi thả cá"]
  ];
  var cn11cn6F = [
    ["Chất thải chăn nuôi gồm những dạng nào?", "Phân, nước tiểu, nước rửa chuồng, xác vật nuôi chết", "Chỉ có phân khô của vật nuôi", "Khí thải từ phương tiện giao thông", "Một trang trại lớn mỗi ngày thải ra lượng chất thải rất lớn cần xử lí."],
    ["Chất thải chăn nuôi không xử lí gây hậu quả gì?", "Ô nhiễm nước, đất, không khí và lây lan mầm bệnh", "Không gây ảnh hưởng gì tới môi trường", "Làm đất đai màu mỡ hơn ngay lập tức", "Nước thải chăn nuôi chảy ra sông suối gây phú dưỡng và chết thuỷ sinh."],
    ["Hầm biogas xử lí chất thải chăn nuôi dựa trên nguyên lí nào?", "Vi sinh vật phân huỷ kị khí chất hữu cơ sinh khí metan", "Đốt cháy trực tiếp phân tươi trong hầm kín", "Dùng hoá chất tẩy mạnh phân huỷ phân", "Khí biogas dùng đun nấu, thắp sáng; bã biogas làm phân bón tốt."],
    ["Khí biogas thành phần chính là khí nào?", "Khí metan (CH₄) cháy được, sinh nhiệt", "Khí cacbonic không cháy được", "Khí ôxi nguyên chất", "Biogas là nguồn năng lượng tái tạo, giúp giảm chặt phá rừng lấy củi."],
    ["Ủ phân compost từ phân chuồng có lợi ích gì?", "Diệt mầm bệnh, tạo phân hữu cơ bón cây an toàn", "Làm phân mất hết chất dinh dưỡng", "Chỉ làm giảm khối lượng phân mà thôi", "Ủ compost đúng kĩ thuật đạt nhiệt độ cao đủ diệt trứng giun sán và hạt cỏ."],
    ["Nước thải sau biogas còn được sử dụng thế nào?", "Tưới cây, bón ruộng sau xử lí đạt quy chuẩn", "Đổ trực tiếp ra sông suối gần trại", "Uống trực tiếp cho vật nuôi trong trại", "Nước sau biogas vẫn giàu dinh dưỡng nên cần xử lí tiếp trước khi thải ra môi trường."],
    ["Giảm mùi hôi chuồng trại bằng biện pháp nào?", "Đệm lót sinh học, chế phẩm vi sinh, vệ sinh thường xuyên", "Đốt hương thật nhiều quanh chuồng", "Không có biện pháp nào khả thi", "Mùi hôi chủ yếu do khí amoniac từ phân và nước tiểu chưa phân huỷ."],
    ["Chăn nuôi gây phát thải khí nhà kính chủ yếu từ đâu?", "Khí metan từ dạ cỏ gia súc nhai lại và từ phân thải", "Từ tiếng kêu của vật nuôi trong chuồng", "Chăn nuôi không phát thải khí nhà kính", "Giảm phát thải bằng cải thiện khẩu phần và xử lí phân bằng biogas."],
    ["Mô hình VAC kết hợp chăn nuôi có đặc điểm gì?", "Vườn – ao – chuồng tuần hoàn, chất thải thành đầu vào có ích", "Mỗi khâu sản xuất hoàn toàn tách rời nhau", "Chỉ trồng cây mà không nuôi vật nuôi", "VAC là mô hình kinh tế tuần hoàn truyền thống hiệu quả ở nông thôn Việt Nam."],
    ["Thu gom phân khô tách khỏi nước thải có tác dụng gì?", "Dễ ủ phân, giảm tải cho hệ thống xử lí nước thải", "Làm tăng ô nhiễm cho khu vực chuồng nuôi", "Không có tác dụng thực tế nào", "Tách chất thải rắn – lỏng từ nguồn giúp xử lí hiệu quả và tiết kiệm hơn."],
    ["Bể lắng và hồ sinh học trong xử lí nước thải chăn nuôi dùng để làm gì?", "Lắng cặn, phân huỷ chất hữu cơ nhờ vi sinh tự nhiên", "Chứa nước thải vĩnh viễn không xử lí", "Chỉ để nuôi cá cảnh trang trí", "Hồ sinh học thường trồng thêm bèo, thực vật thuỷ sinh hấp thu dinh dưỡng thừa."],
    ["Xác vật nuôi chết do dịch bệnh cần xử lí thế nào để bảo vệ môi trường?", "Chôn sâu rắc vôi hoặc tiêu huỷ theo quy định thú y", "Vứt ra bãi rác sinh hoạt của thôn xóm", "Thả trôi theo kênh mương thoát nước", "Xử lí sai cách làm mầm bệnh lan ra đất, nước và gây dịch cho đàn khác."],
    ["Trồng cây xanh quanh khu chăn nuôi có tác dụng môi trường gì?", "Chắn mùi, chắn gió, hấp thu khí độc, tạo bóng mát", "Làm chuồng trại tối và ẩm hơn", "Không có tác dụng gì với môi trường trại", "Hàng cây xanh còn là hàng rào sinh học hạn chế mầm bệnh lây lan."],
    ["Quy định pháp luật về bảo vệ môi trường trong chăn nuôi yêu cầu gì?", "Trang trại phải có hệ thống xử lí chất thải đạt quy chuẩn", "Không có quy định nào về môi trường chăn nuôi", "Chỉ áp dụng cho nhà máy công nghiệp lớn", "Chăn nuôi gây ô nhiễm có thể bị xử phạt và buộc khắc phục theo luật định."],
    ["Nuôi giun quế từ phân chuồng mang lại lợi ích gì?", "Tạo phân giun giàu dinh dưỡng và giun làm thức ăn đạm", "Làm phân chuồng bẩn và độc hơn", "Không ứng dụng được trong thực tế", "Giun quế xử lí phân bò, phân lợn thành phân hữu cơ chất lượng cao."],
    ["Giảm thiểu chất thải chăn nuôi ngay từ nguồn bằng cách nào?", "Khẩu phần cân đối, tránh lãng phí thức ăn và nước uống", "Tăng mật độ nuôi lên mức tối đa", "Cho vật nuôi ăn càng nhiều càng tốt", "Thức ăn tiêu hoá tốt giúp giảm lượng phân thải và khí độc trong chuồng."],
    ["Nước rửa chuồng trại nên được quản lí thế nào?", "Thu gom vào hệ thống xử lí, không thải thẳng ra môi trường", "Thải trực tiếp ra ruộng của hàng xóm", "Đổ ra đường giao thông nông thôn", "Tiết kiệm nước rửa chuồng vừa giảm chi phí vừa giảm lượng nước thải."],
    ["Phân bón hữu cơ từ chăn nuôi giúp bảo vệ môi trường đất thế nào?", "Tăng mùn, giảm dùng phân hoá học, đất tơi xốp bền vững", "Làm đất bị nhiễm độc kim loại nặng ngay", "Không khác gì bón phân hoá học hoàn toàn", "Sử dụng phân hữu cơ khép kín vòng tuần hoàn dinh dưỡng trong nông nghiệp."],
    ["Ô nhiễm tiếng ồn và côn trùng ở trại chăn nuôi cần kiểm soát ra sao?", "Vệ sinh sạch, xử lí phân nhanh, trồng cây chắn quanh trại", "Để phân tích tụ lâu ngày quanh chuồng", "Không cần quan tâm tới ruồi muỗi trong trại", "Ruồi muỗi từ trại bẩn là trung gian truyền bệnh cho vật nuôi và con người."],
    ["Đánh giá tác động môi trường (ĐTM) áp dụng cho dự án chăn nuôi nào?", "Trang trại quy mô lớn theo quy định phải lập báo cáo ĐTM", "Mọi hộ nuôi một vài con gà tại nhà", "Không áp dụng cho lĩnh vực chăn nuôi", "ĐTM giúp dự báo và có biện pháp giảm ô nhiễm trước khi dự án vận hành."],
    ["Năng lượng tái tạo trong trang trại chăn nuôi gồm ứng dụng nào?", "Biogas và điện mặt trời phục vụ sản xuất, sinh hoạt", "Chỉ dùng điện lưới quốc gia mà thôi", "Không ứng dụng được ở nông thôn", "Kết hợp biogas với điện mặt trời giúp trang trại chủ động năng lượng sạch."],
    ["Người chăn nuôi có trách nhiệm gì với cộng đồng xung quanh?", "Không gây ô nhiễm, xử lí chất thải, phòng dịch bệnh tốt", "Chỉ cần lo lợi nhuận của bản thân", "Không có trách nhiệm gì với hàng xóm", "Chăn nuôi có trách nhiệm xã hội giúp ngành phát triển bền vững, được ủng hộ."]
  ];
  var cn11cn6P = [
    ["Biogas", "Khí metan từ phân huỷ kị khí chất thải"],
    ["Ủ compost", "Ủ phân hữu cơ diệt mầm bệnh"],
    ["Đệm lót sinh học", "Giảm mùi hôi, phân huỷ phân tại chuồng"],
    ["Hồ sinh học", "Xử lí nước thải nhờ vi sinh tự nhiên"],
    ["Mô hình VAC", "Vườn – ao – chuồng tuần hoàn khép kín"],
    ["Giun quế", "Xử lí phân tạo phân hữu cơ giàu dinh dưỡng"],
    ["Khí amoniac", "Khí độc gây mùi hôi trong chuồng nuôi"],
    ["Bón vôi chôn xác", "Xử lí xác vật nuôi chết do bệnh"]
  ];
  var cn11cdcn1F = [
    ["Cấy truyền phôi ở bò giúp nhân giống nhanh bằng cách nào?", "Bò mẹ tốt cho nhiều phôi, bò khác mang thai hộ", "Một bò mẹ chỉ đẻ được một con mỗi năm", "Không cần bò mẹ cho phôi chất lượng cao", "Một bò mẹ xuất sắc có thể cho hàng chục bê con mỗi năm nhờ cấy truyền phôi."],
    ["Thụ tinh nhân tạo khác thụ tinh tự nhiên ở điểm nào?", "Tinh dịch được đưa vào đường sinh dục con cái bằng dụng cụ", "Không cần tinh dịch của con đực", "Con cái tự sinh sản không cần phối giống", "Tinh dịch được pha loãng, bảo quản lạnh và phối cho nhiều con cái."],
    ["Công nghệ tế bào trong chăn nuôi gồm ứng dụng nào?", "Nuôi cấy tế bào, nhân bản, tạo dòng tế bào gốc", "Chỉ dùng để xét nghiệm bệnh thông thường", "Không liên quan tới chọn giống vật nuôi", "Nhân bản vô tính tạo cá thể có bộ gen giống hệt cá thể cho tế bào."],
    ["Cừu Dolly nổi tiếng trong lịch sử công nghệ sinh học vì điều gì?", "Động vật có vú đầu tiên được nhân bản vô tính thành công", "Cừu cho sản lượng lông cao nhất thế giới", "Cừu đầu tiên được đưa lên vũ trụ", "Dolly (1996) mở ra kỉ nguyên nhân bản động vật phục vụ nghiên cứu và chăn nuôi."],
    ["Xác định giới tính phôi trong chăn nuôi bò sữa có lợi ích gì?", "Chọn phôi cái để tăng đàn bò sữa theo nhu cầu", "Làm phôi phát triển nhanh gấp đôi", "Không có lợi ích kinh tế nào", "Công nghệ này giúp chủ động cơ cấu đàn theo mục đích sản xuất."],
    ["Thụ tinh trong ống nghiệm (IVF) ở vật nuôi là gì?", "Cho trứng thụ tinh với tinh trùng ngoài cơ thể rồi cấy phôi", "Thụ tinh xảy ra hoàn toàn tự nhiên trong cơ thể", "Chỉ áp dụng được cho cây trồng", "IVF kết hợp cấy truyền phôi giúp khai thác tối đa con mẹ và con bố tốt."],
    ["Bảo quản tinh dịch đông lạnh có ưu điểm gì?", "Lưu giữ lâu dài, vận chuyển xa, dùng khi cần phối giống", "Tinh dịch đông lạnh dùng tốt hơn tinh tươi mọi mặt", "Không cần bảo quản ở nhiệt độ thấp", "Tinh dịch bò đực giống được bảo quản trong nitơ lỏng ở −196 °C."],
    ["Công nghệ gen giúp tạo vật nuôi có đặc tính nào?", "Mang gen mong muốn như tăng trưởng nhanh, kháng bệnh", "Vật nuôi không cần thức ăn vẫn lớn được", "Thay đổi hoàn toàn hình dạng loài vật nuôi", "Vật nuôi biến đổi gen phải qua đánh giá an toàn nghiêm ngặt trước khi thương mại."],
    ["Chỉ thị phân tử DNA được dùng trong chăn nuôi để làm gì?", "Chọn giống sớm, xác định huyết thống và gen bệnh", "Thay thế hoàn toàn thức ăn và chuồng trại", "Chỉ dùng trang trí phòng thí nghiệm", "Xét nghiệm DNA giúp loại bỏ sớm cá thể mang gen bệnh di truyền."],
    ["Đồng pha (đồng bộ) chu kì động dục ở đàn cái có tác dụng gì?", "Cho nhiều con cái động dục cùng lúc, dễ phối giống hàng loạt", "Làm con cái không sinh sản được nữa", "Không có tác dụng trong quản lí đàn", "Đồng pha giúp tổ chức thụ tinh nhân tạo và cấy phôi theo kế hoạch tập trung."],
    ["Gây rụng trứng nhiều (siêu bài noãn) nhằm mục đích gì?", "Thu được nhiều trứng, nhiều phôi từ một con mẹ tốt", "Giảm số trứng của con mẹ xuống tối thiểu", "Chỉ dùng trong nghiên cứu lí thuyết", "Siêu bài noãn là khâu quan trọng trước khi thu phôi trong cấy truyền phôi."],
    ["Ngân hàng gen vật nuôi có vai trò gì?", "Lưu giữ tinh dịch, phôi, tế bào của giống quý để bảo tồn", "Là nơi cất giữ tiền của người chăn nuôi", "Chỉ lưu trữ tài liệu giấy tờ về giống", "Ngân hàng gen giúp khôi phục giống quý hiếm khi đàn sống bị dịch bệnh xoá sổ."],
    ["Nhân bản vô tính khác sinh sản hữu tính ở điểm nào?", "Con sinh ra có bộ gen giống hệt một cá thể cho tế bào", "Con luôn mang gen của hai cá thể bố mẹ", "Không cần tế bào sống để thực hiện", "Nhân bản phục vụ bảo tồn giống quý và nghiên cứu y sinh học."],
    ["Ứng dụng vi sinh vật trong chăn nuôi gồm sản phẩm nào?", "Chế phẩm probiotic, enzyme và vắc-xin tái tổ hợp", "Chỉ dùng vi khuẩn gây bệnh cho vật nuôi", "Không có sản phẩm vi sinh nào dùng được", "Probiotic bổ sung vi sinh có lợi cho đường ruột, giảm dùng kháng sinh."],
    ["Chẩn đoán bệnh bằng kĩ thuật PCR có ưu điểm gì?", "Phát hiện mầm bệnh sớm, chính xác ở mức phân tử", "Chỉ phát hiện bệnh khi vật nuôi đã chết", "Không chính xác bằng quan sát mắt thường", "PCR khuếch đại đoạn gen của mầm bệnh nên phát hiện được lượng rất nhỏ."],
    ["Vắc-xin tái tổ hợp DNA khác vắc-xin truyền thống thế nào?", "Dùng gen của mầm bệnh tạo kháng nguyên an toàn hơn", "Chứa mầm bệnh sống nguyên vẹn nguy hiểm", "Không tạo được đáp ứng miễn dịch", "Vắc-xin công nghệ mới an toàn và sản xuất nhanh hơn vắc-xin cổ điển."],
    ["Công nghệ sinh học hỗ trợ xử lí chất thải chăn nuôi bằng cách nào?", "Dùng vi sinh phân huỷ phân, khử mùi, tạo biogas", "Làm chất thải tăng lên gấp nhiều lần", "Không áp dụng được cho chất thải trại nuôi", "Chế phẩm vi sinh xử lí đệm lót và nước thải là ứng dụng sinh học phổ biến."],
    ["Chọn giới tính tinh dịch (tinh dịch phân li) dùng để làm gì?", "Tăng tỉ lệ con sinh ra thuộc giới tính mong muốn", "Làm tinh dịch mất khả năng thụ thai", "Chỉ dùng cho mục đích nghiên cứu cơ bản", "Tinh dịch phân li giới tính giúp trại bò sữa chủ động sinh bê cái."],
    ["Đạo đức và an toàn sinh học trong công nghệ sinh học chăn nuôi yêu cầu gì?", "Đánh giá rủi ro, không gây hại người, vật nuôi, môi trường", "Được tự do thí nghiệm không cần quy định", "Chỉ quan tâm lợi nhuận kinh tế thu được", "Mọi sản phẩm công nghệ sinh học đều phải qua kiểm định trước khi ra thị trường."],
    ["Nuôi cấy mô tế bào động vật được ứng dụng để sản xuất gì?", "Vắc-xin, kháng thể và nghiên cứu thuốc thú y mới", "Thức ăn chăn nuôi dạng thô xanh", "Chuồng trại thông minh tự động", "Nhiều vắc-xin virus được sản xuất bằng nuôi cấy tế bào trong phòng thí nghiệm."],
    ["Kĩ thuật chuyển gen cần công cụ phân tử nào quan trọng?", "Enzyme cắt, enzyme nối và vector mang gen vào tế bào", "Chỉ cần kính hiển vi quang học thông thường", "Dao mổ và chỉ khâu phẫu thuật", "Vector thường là plasmid hoặc virus đã được biến đổi an toàn."],
    ["Tương lai công nghệ sinh học trong chăn nuôi hướng tới điều gì?", "Giống kháng bệnh, năng suất cao, an toàn, ít phát thải", "Loại bỏ hoàn toàn người chăn nuôi khỏi trang trại", "Quay lại chăn nuôi hoàn toàn tự nhiên", "Chỉnh sửa gen chính xác bằng CRISPR là hướng nghiên cứu nổi bật hiện nay."]
  ];
  var cn11cdcn1P = [
    ["Cấy truyền phôi", "Phôi mẹ tốt cấy vào mẹ mang thai hộ"],
    ["Thụ tinh nhân tạo", "Đưa tinh dịch vào con cái bằng dụng cụ"],
    ["Nhân bản vô tính", "Con có bộ gen giống hệt cá thể cho tế bào"],
    ["Cừu Dolly", "Động vật có vú nhân bản đầu tiên"],
    ["Ngân hàng gen", "Lưu tinh dịch, phôi, tế bào giống quý"],
    ["Kĩ thuật PCR", "Phát hiện mầm bệnh ở mức phân tử"],
    ["Probiotic", "Chế phẩm vi sinh có lợi cho đường ruột"],
    ["Nitơ lỏng −196 °C", "Bảo quản tinh dịch và phôi đông lạnh"]
  ];
  var cn11cdcn2F = [
    ["Động vật cảnh phổ biến được nuôi trong gia đình gồm loài nào?", "Chó, mèo, cá cảnh, chim cảnh và thỏ cảnh", "Chỉ có chó và mèo hoang ngoài đường", "Các loài thú hoang dã nguy hiểm", "Nuôi động vật cảnh giúp con người thư giãn, gắn kết tình cảm gia đình."],
    ["Chó cảnh cần chế độ dinh dưỡng thế nào?", "Đủ đạm, béo, vitamin theo tuổi và giống chó", "Chỉ cho ăn cơm trắng với nước canh", "Cho ăn càng nhiều xương cứng càng tốt", "Chó con cần nhiều bữa nhỏ giàu đạm; chó già cần khẩu phần dễ tiêu, ít béo."],
    ["Thức ăn nào gây nguy hiểm cho chó mèo cần tránh?", "Sô-cô-la, hành tỏi, nho và xương nhọn dễ gây ngộ độc, hóc", "Thịt cá nấu chín không gia vị", "Rau củ luộc sạch cắt nhỏ", "Sô-cô-la chứa theobromine gây ngộ độc nguy hiểm cho chó mèo."],
    ["Mèo có nhu cầu dinh dưỡng đặc trưng nào?", "Cần đạm cao và axit amin taurine thiết yếu", "Chỉ cần ăn rau củ là đủ dinh dưỡng", "Không cần chất đạm trong khẩu phần", "Thiếu taurine mèo dễ mắc bệnh tim và giảm thị lực nghiêm trọng."],
    ["Tiêm phòng bắt buộc cho chó nuôi cảnh là vắc-xin nào?", "Vắc-xin phòng bệnh dại theo quy định", "Không cần tiêm phòng bệnh nào cả", "Chỉ tiêm khi chó đã mắc bệnh nặng", "Chó mèo còn cần tiêm phòng các bệnh truyền nhiễm nguy hiểm khác theo lịch thú y."],
    ["Tẩy giun cho chó mèo cảnh cần thực hiện thế nào?", "Định kì theo tuổi và hướng dẫn của bác sĩ thú y", "Chỉ tẩy một lần duy nhất trong đời", "Không cần tẩy giun cho thú cưng nuôi trong nhà", "Chó con cần tẩy giun sớm và nhắc lại thường xuyên hơn chó trưởng thành."],
    ["Chăm sóc lông cho chó mèo cảnh gồm những việc gì?", "Chải lông, tắm đúng cách, cắt tỉa và kiểm tra ve rận", "Không bao giờ được tắm cho thú cưng", "Cạo trọc lông quanh năm là tốt nhất", "Chải lông thường xuyên giảm rụng lông và phát hiện sớm bệnh ngoài da."],
    ["Dấu hiệu chó mèo bị bệnh cần đưa đi khám thú y là gì?", "Bỏ ăn, nôn, tiêu chảy, lừ đừ, sốt hoặc khó thở", "Thú cưng ngủ nhiều hơn một chút", "Thú cưng rụng vài sợi lông mỗi ngày", "Phát hiện bệnh sớm giúp điều trị hiệu quả và tránh lây sang người, vật nuôi khác."],
    ["Huấn luyện chó cảnh cơ bản cần nguyên tắc nào?", "Kiên nhẫn, khen thưởng đúng lúc, nhất quán mệnh lệnh", "Đánh mắng mạnh để chó sợ và nghe lời", "Mỗi người dạy một kiểu khác nhau tuỳ thích", "Huấn luyện tích cực bằng khen thưởng giúp chó ngoan và gắn bó với chủ."],
    ["Môi trường sống phù hợp cho chó mèo cảnh là gì?", "Sạch sẽ, thoáng mát, có chỗ vận động và nghỉ ngơi riêng", "Nhốt chật hẹp, tối tăm cả ngày dài", "Để thú cưng lang thang ngoài đường tự do", "Thú cưng cần vận động hằng ngày để tránh béo phì và stress."],
    ["Triệt sản cho chó mèo cảnh mang lại lợi ích gì?", "Kiểm soát sinh sản, giảm bệnh sinh dục và hành vi xấu", "Làm thú cưng không còn khoẻ mạnh nữa", "Không có lợi ích nào cho chủ nuôi", "Triệt sản giúp giảm số chó mèo hoang bị bỏ rơi trong cộng đồng."],
    ["Cá cảnh cần điều kiện nước thế nào trong bể nuôi?", "Nước sạch, đủ ôxi, nhiệt độ và pH ổn định phù hợp loài cá", "Nước càng bẩn cá càng khoẻ mạnh", "Không cần lọc nước và sủi ôxi", "Thay nước định kì một phần và vệ sinh lọc giúp bể cá luôn trong sạch."],
    ["Chim cảnh cần được chăm sóc những gì?", "Lồng sạch, thức ăn hạt, nước sạch, tắm nắng hợp lí", "Nhốt lồng tối hoàn toàn cả ngày", "Chỉ cho ăn một loại thức ăn duy nhất", "Chim cảnh cần không gian bay nhảy trong lồng đủ rộng để khoẻ mạnh."],
    ["Bệnh nấm da ở chó mèo có biểu hiện thế nào?", "Rụng lông từng mảng tròn, ngứa, da có vảy", "Lông mọc dày và bóng mượt hơn", "Không có biểu hiện trên da lông", "Nấm da có thể lây sang người, cần điều trị và vệ sinh chuồng, ổ nằm."],
    ["Ve, rận, bọ chét trên chó mèo gây hại thế nào?", "Hút máu gây ngứa, viêm da và truyền bệnh kí sinh trùng máu", "Không gây hại gì đáng kể cho thú cưng", "Giúp lông thú cưng bóng đẹp hơn", "Dùng thuốc phòng ve rận định kì và vệ sinh nơi ở để cắt vòng đời kí sinh trùng."],
    ["Nhận biết chó mèo bị béo phì bằng cách nào và cần làm gì?", "Sờ không thấy xương sườn; cần giảm ăn, tăng vận động", "Thú càng béo càng khoẻ mạnh đáng yêu", "Không cần điều chỉnh chế độ ăn uống", "Béo phì làm tăng nguy cơ tiểu đường, bệnh khớp và tim mạch ở thú cưng."],
    ["Khi di chuyển chó mèo đi xa cần chuẩn bị gì?", "Lồng vận chuyển chắc chắn, nước uống, giấy tiêm phòng", "Để thú cưng tự chạy theo xe trên đường", "Không cần cho uống nước suốt hành trình", "Cho thú cưng làm quen lồng vận chuyển trước giúp giảm stress khi di chuyển."],
    ["Trách nhiệm của người nuôi động vật cảnh là gì?", "Chăm sóc suốt đời, tiêm phòng đầy đủ, không thả rông", "Nuôi chán thì bỏ ra đường tuỳ ý", "Để thú cưng tự kiếm ăn ngoài phố", "Nuôi thú cưng có trách nhiệm là yêu cầu văn minh của người chủ hiện đại."],
    ["Mèo con mất mẹ cần được chăm sóc đặc biệt thế nào?", "Giữ ấm, cho bú sữa chuyên dụng theo cữ nhỏ nhiều lần", "Cho uống sữa bò tươi của người ngay", "Để mèo con tự nhịn đói vài ngày đầu", "Mèo con sơ sinh không tự điều hoà thân nhiệt và cần kích thích đi vệ sinh."],
    ["Chọn mua chó mèo cảnh khoẻ mạnh cần quan sát điều gì?", "Nhanh nhẹn, mắt sáng, lông mượt, không ho, không tiêu chảy", "Chỉ cần chọn con rẻ nhất trong đàn", "Chọn con nằm im ủ rũ một góc", "Nên mua ở nơi uy tín, có sổ tiêm phòng và nguồn gốc rõ ràng."],
    ["Không gian sống cho thỏ cảnh cần đáp ứng yêu cầu gì?", "Chuồng khô thoáng, có cỏ khô ăn chính và nước sạch", "Chuồng ẩm ướt, tối tăm quanh năm", "Chỉ cho thỏ ăn cà rốt là đủ", "Thức ăn chính của thỏ là cỏ khô giàu xơ, tốt cho răng và tiêu hoá."],
    ["Vì sao không nên nuôi động vật hoang dã làm cảnh tuỳ tiện?", "Vi phạm pháp luật, nguy cơ bệnh, hại bảo tồn thiên nhiên", "Vì động vật hoang dã luôn dễ nuôi hơn chó mèo", "Không có lí do gì đáng quan tâm", "Nhiều loài hoang dã thuộc danh mục bảo vệ, mua bán nuôi nhốt bị cấm."]
  ];
  var cn11cdcn2P = [
    ["Taurine", "Axit amin thiết yếu với mèo"],
    ["Sô-cô-la", "Thực phẩm gây ngộ độc cho chó mèo"],
    ["Vắc-xin dại", "Tiêm phòng bắt buộc cho chó mèo"],
    ["Triệt sản", "Kiểm soát sinh sản cho thú cưng"],
    ["Bọ chét, ve rận", "Kí sinh hút máu ngoài da thú cưng"],
    ["Cỏ khô", "Thức ăn chính giàu xơ của thỏ cảnh"],
    ["Lồng vận chuyển", "Dụng cụ đưa thú cưng đi xa an toàn"],
    ["Probiotic thú cưng", "Hỗ trợ tiêu hoá cho chó mèo"]
  ];
  var cn11cdcn3F = [
    ["VietGAP trong chăn nuôi là gì?", "Thực hành chăn nuôi tốt, an toàn, truy xuất được nguồn gốc", "Tên một giống vật nuôi mới năng suất cao", "Một loại thức ăn chăn nuôi công nghiệp", "VietGAP là viết tắt của Vietnamese Good Agricultural Practices."],
    ["Mục tiêu cốt lõi của chăn nuôi VietGAP là gì?", "Sản phẩm an toàn, bảo vệ môi trường và người nuôi", "Đạt năng suất cao nhất bằng mọi cách", "Chỉ để sản phẩm có bao bì đẹp hơn", "VietGAP đồng thời đảm bảo phúc lợi động vật và hiệu quả kinh tế."],
    ["Tiêu chí VietGAP về địa điểm chuồng trại yêu cầu gì?", "Xa khu dân cư, nguồn nước sạch, không ô nhiễm, ngập úng", "Đặt ngay giữa khu dân cư đông đúc", "Không có yêu cầu về địa điểm nuôi", "Địa điểm phải được đánh giá nguy cơ ô nhiễm đất, nước trước khi xây trại."],
    ["Con giống trong chăn nuôi VietGAP phải đảm bảo điều gì?", "Nguồn gốc rõ ràng, khoẻ mạnh, có kiểm dịch đầy đủ", "Mua giống trôi nổi không rõ nguồn gốc", "Chỉ cần giống rẻ nhất trên thị trường", "Giống nhập về trại phải cách li theo dõi trước khi nhập đàn chung."],
    ["Thức ăn và nước uống theo VietGAP cần đáp ứng yêu cầu nào?", "Không dùng chất cấm, nước sạch đạt quy chuẩn", "Được dùng chất tạo nạc bị cấm để tăng trọng nhanh", "Nước ao bẩn vẫn dùng cho vật nuôi uống", "Sử dụng chất cấm như salbutamol trong chăn nuôi bị pháp luật nghiêm cấm."],
    ["Quản lí dịch bệnh theo VietGAP gồm nội dung nào?", "Có lịch tiêm phòng, hồ sơ điều trị, an toàn sinh học chặt", "Tự ý dùng kháng sinh không cần ghi chép", "Không cần tiêm phòng cho đàn vật nuôi", "Vật nuôi bệnh phải cách li và điều trị theo hướng dẫn của thú y."],
    ["Thời gian ngừng thuốc (ngưng kháng sinh) trước xuất bán nhằm mục đích gì?", "Đảm bảo sản phẩm không còn tồn dư thuốc gây hại người dùng", "Để vật nuôi tăng trọng nhanh hơn trong vài ngày", "Không có mục đích cụ thể nào", "Vi phạm thời gian ngừng thuốc là lỗi nghiêm trọng trong chứng nhận VietGAP."],
    ["Ghi chép nhật kí trong chăn nuôi VietGAP có vai trò gì?", "Truy xuất nguồn gốc, minh bạch quá trình sản xuất", "Chỉ ghi chép hình thức cho đủ hồ sơ", "Không cần ghi chép nếu nuôi quy mô nhỏ", "Nhật kí ghi rõ thức ăn, thuốc, vắc-xin, xuất nhập đàn theo từng ngày."],
    ["Truy xuất nguồn gốc sản phẩm chăn nuôi là gì?", "Tra cứu được trại nuôi, quy trình, lô sản phẩm khi cần", "Chỉ in tên thương hiệu lên bao bì sản phẩm", "Không thể thực hiện với sản phẩm thịt, trứng", "Mã số, tem nhãn và hồ sơ lô hàng giúp truy xuất nhanh khi có sự cố an toàn thực phẩm."],
    ["Xử lí chất thải theo tiêu chuẩn VietGAP yêu cầu gì?", "Có xử lí chất thải đạt chuẩn, không ô nhiễm xung quanh", "Thải trực tiếp ra kênh mương gần trại", "Đốt phân tươi ngay cạnh chuồng nuôi", "Chất thải được xử lí bằng biogas, ủ compost hoặc đệm lót sinh học."],
    ["Phúc lợi động vật trong VietGAP được hiểu thế nào?", "Vật nuôi đủ ăn, thoải mái, không đau đớn, được vận động", "Nuôi nhốt chật hẹp tối đa hoá số lượng", "Không cần quan tâm tới trạng thái vật nuôi", "Phúc lợi tốt giúp vật nuôi ít bệnh, chất lượng sản phẩm cao hơn."],
    ["Người lao động trong trại VietGAP cần đáp ứng yêu cầu gì?", "Được tập huấn, khám sức khoẻ, trang bị bảo hộ lao động", "Không cần tập huấn quy trình sản xuất", "Làm việc không cần đồ bảo hộ nào", "An toàn lao động và vệ sinh cá nhân ảnh hưởng trực tiếp tới an toàn sản phẩm."],
    ["Chứng nhận VietGAP do ai đánh giá và cấp?", "Tổ chức chứng nhận được chỉ định, đánh giá định kì", "Chủ trại tự tuyên bố mà không cần kiểm tra", "Người mua hàng tự cấp chứng nhận", "Chứng nhận có hiệu lực theo thời hạn và bị thu hồi nếu vi phạm nghiêm trọng."],
    ["Sản phẩm chăn nuôi VietGAP khi bán ra thị trường có dấu hiệu nào?", "Có nhãn, mã truy xuất và chứng nhận VietGAP hợp lệ", "Không khác gì sản phẩm thông thường", "Chỉ cần quảng cáo là sản phẩm sạch", "Người tiêu dùng có thể quét mã để kiểm tra thông tin trại sản xuất."],
    ["Kiểm soát động vật gây hại và vật nuôi lạ vào trại VietGAP nhằm mục đích gì?", "Ngăn mầm bệnh lây vào đàn qua chuột, chim, chó mèo lạ", "Để trại trông gọn gàng đẹp mắt hơn", "Không liên quan tới phòng bệnh cho đàn", "Hàng rào, lưới chắn và bẫy kiểm soát là một phần của an toàn sinh học."],
    ["Thuốc thú y trong trại VietGAP được quản lí thế nào?", "Bảo quản đúng cách, dùng theo đơn, ghi chép đầy đủ", "Để thuốc lẫn lộn không nhãn mác trong kho", "Ai cũng tự ý lấy thuốc dùng tuỳ thích", "Thuốc hết hạn phải tiêu huỷ riêng, không dùng cho vật nuôi."],
    ["Đánh giá nội bộ trong quy trình VietGAP có tác dụng gì?", "Tự kiểm tra, phát hiện điểm chưa đạt để khắc phục kịp thời", "Chỉ làm khi có đoàn thanh tra tới trại", "Không cần thiết trong quy trình sản xuất", "Khắc phục điểm không phù hợp giúp trại duy trì chứng nhận lâu dài."],
    ["An toàn thực phẩm trong chuỗi chăn nuôi VietGAP bắt đầu từ đâu?", "Từ con giống, thức ăn, nuôi dưỡng tới giết mổ, vận chuyển", "Chỉ kiểm tra ở khâu bán lẻ cuối cùng", "Chỉ phụ thuộc vào người tiêu dùng cuối", "Nguyên tắc “từ trang trại tới bàn ăn” chi phối toàn bộ chuỗi sản xuất."],
    ["Lợi ích kinh tế của chăn nuôi VietGAP với người nuôi là gì?", "Sản phẩm dễ tiêu thụ, giá tốt, vào được siêu thị, xuất khẩu", "Không có lợi ích kinh tế rõ ràng nào", "Chỉ làm tăng chi phí mà không tăng thu nhập", "Nhiều chuỗi siêu thị ưu tiên thu mua sản phẩm có chứng nhận VietGAP."],
    ["Khi phát hiện lô sản phẩm không an toàn, trại VietGAP phải làm gì?", "Thu hồi sản phẩm, tìm nguyên nhân và báo cơ quan quản lí", "Tiếp tục bán hết lô hàng cho nhanh", "Che giấu thông tin với người tiêu dùng", "Thu hồi minh bạch bảo vệ người tiêu dùng và uy tín thương hiệu của trại."],
    ["Nước thải và xác vật nuôi chết trong trại VietGAP xử lí thế nào?", "Theo quy trình an toàn, không gây ô nhiễm và lây dịch bệnh", "Vứt bỏ tuỳ tiện ra môi trường xung quanh", "Chôn ngay sát nguồn nước sinh hoạt", "Xử lí đúng quy định là tiêu chí bắt buộc khi đánh giá chứng nhận."],
    ["Hồ sơ VietGAP cần lưu trữ trong thời gian bao lâu và để làm gì?", "Lưu đủ lâu để phục vụ truy xuất, thanh tra và chứng nhận lại", "Huỷ ngay sau khi bán hết sản phẩm", "Không cần lưu trữ hồ sơ giấy tờ nào", "Hồ sơ đầy đủ là bằng chứng trại tuân thủ quy trình chăn nuôi tốt."]
  ];
  var cn11cdcn3P = [
    ["VietGAP", "Thực hành chăn nuôi tốt của Việt Nam"],
    ["Truy xuất nguồn gốc", "Tra cứu trại nuôi và lô sản phẩm"],
    ["Thời gian ngừng thuốc", "Đảm bảo hết tồn dư trước xuất bán"],
    ["Chất cấm tạo nạc", "Bị pháp luật nghiêm cấm sử dụng"],
    ["Phúc lợi động vật", "Vật nuôi thoải mái, không đau đớn"],
    ["Nhật kí chăn nuôi", "Ghi thức ăn, thuốc, tiêm phòng mỗi ngày"],
    ["Tổ chức chứng nhận", "Đánh giá và cấp chứng nhận VietGAP"],
    ["Từ trang trại tới bàn ăn", "Nguyên tắc an toàn toàn chuỗi sản phẩm"]
  ];
  var cn11ck1F = [
    ["Cơ khí chế tạo là lĩnh vực nào?", "Chế tạo máy móc, thiết bị phục vụ sản xuất, đời sống", "Trồng trọt và chăn nuôi gia súc", "Khai thác khoáng sản dưới lòng đất", "Cơ khí chế tạo là nền tảng của công nghiệp, tạo ra máy móc cho mọi ngành."],
    ["Sản phẩm cơ khí chế tạo điển hình gồm những gì?", "Máy công cụ, động cơ, ô tô, thiết bị sản xuất", "Lương thực và thực phẩm tươi sống", "Quần áo và giày dép thời trang", "Từ chi tiết nhỏ như bu lông tới máy bay đều là sản phẩm cơ khí."],
    ["Vai trò của cơ khí chế tạo với các ngành kinh tế là gì?", "Cung cấp máy móc, thiết bị cho mọi ngành sản xuất", "Không liên quan tới ngành nào khác", "Chỉ phục vụ ngành giải trí", "Cơ khí được coi là ngành công nghiệp nền tảng, xương sống của nền kinh tế."],
    ["Chi tiết máy là gì?", "Phần tử nhỏ nhất không tháo rời được của máy", "Toàn bộ một dây chuyền sản xuất lớn", "Một nhà máy chế tạo hoàn chỉnh", "Ví dụ chi tiết máy: bu lông, trục, bánh răng, vòng bi."],
    ["Cơ cấu máy là gì?", "Tập hợp chi tiết liên kết, chuyển động tương đối với nhau", "Một chi tiết máy đơn lẻ đứng yên", "Vỏ bên ngoài của một chiếc máy", "Cơ cấu biến đổi chuyển động như cơ cấu tay quay – con trượt."],
    ["Máy là gì theo khái niệm cơ khí?", "Hệ thống cơ cấu thực hiện công việc có ích xác định", "Một khối kim loại bất kì chưa gia công", "Dụng cụ cầm tay đơn giản nhất", "Máy giúp thay sức người, nâng cao năng suất và độ chính xác."],
    ["Quy trình chế tạo một sản phẩm cơ khí gồm các khâu chính nào?", "Thiết kế, chế tạo phôi, gia công, lắp ráp, kiểm tra", "Chỉ cần lắp ráp là hoàn thành", "Mua vật liệu rồi bán ngay không gia công", "Kiểm tra chất lượng xuyên suốt quy trình, không chỉ ở khâu cuối."],
    ["Bản vẽ kĩ thuật có vai trò gì trong chế tạo cơ khí?", "Thể hiện hình dạng, kích thước, yêu cầu kĩ thuật chi tiết", "Chỉ để trang trí hồ sơ sản phẩm", "Không cần thiết khi thợ đã có kinh nghiệm", "Bản vẽ là ngôn ngữ chung của kĩ thuật, là căn cứ để chế tạo và kiểm tra."],
    ["Ngành nghề cơ khí chế tạo gồm những nghề tiêu biểu nào?", "Kĩ sư cơ khí, thợ tiện, thợ phay, thợ hàn, thợ lắp ráp", "Bác sĩ, giáo viên và luật sư", "Đầu bếp và nhân viên bán hàng", "Người làm cơ khí cần tay nghề, tư duy kĩ thuật và ý thức an toàn."],
    ["Thợ cơ khí cần đáp ứng yêu cầu nghề nghiệp nào?", "Đọc được bản vẽ, dùng dụng cụ đo, tuân thủ an toàn lao động", "Chỉ cần sức khoẻ, không cần học nghề", "Không cần biết sử dụng máy móc", "Đo chính xác bằng thước cặp, panme là kĩ năng cơ bản của thợ cơ khí."],
    ["An toàn lao động trong xưởng cơ khí yêu cầu điều gì?", "Mặc bảo hộ, che chắn máy, không đeo găng khi máy quay", "Đeo trang sức rườm rà khi vận hành máy", "Dùng tay hãm chi tiết đang quay", "Phôi và phoi nóng, sắc là nguy cơ gây tai nạn thường gặp trong xưởng cơ khí."],
    ["Cơ khí chế tạo ở Việt Nam đang phát triển theo hướng nào?", "Tự động hoá, chính xác cao, tham gia chuỗi cung ứng toàn cầu", "Quay lại sản xuất thủ công hoàn toàn", "Thu hẹp dần và không đầu tư mới", "Nhiều doanh nghiệp cơ khí Việt Nam đã làm linh kiện cho hãng ô tô, điện tử lớn."],
    ["Công nghệ 4.0 tác động thế nào tới cơ khí chế tạo?", "Máy CNC, robot, IoT và dữ liệu số hoá sản xuất", "Không có tác động gì đáng kể", "Làm mọi máy móc trở về điều khiển tay", "Nhà máy thông minh kết nối máy móc qua mạng để quản lí sản xuất theo thời gian thực."],
    ["Vì sao độ chính xác gia công quan trọng trong cơ khí?", "Chi tiết lắp ghép đúng, máy chạy êm, bền và an toàn", "Chỉ để chi tiết trông bóng đẹp hơn", "Không ảnh hưởng tới hoạt động của máy", "Sai số nhỏ ở chi tiết quan trọng cũng có thể làm cả máy hỏng hoặc mất an toàn."],
    ["Dung sai trong chế tạo cơ khí là gì?", "Khoảng cho phép của kích thước so với kích thước danh nghĩa", "Sai số tuyệt đối không được phép có", "Kích thước lớn nhất của chi tiết", "Ghi dung sai trên bản vẽ giúp chi tiết của nhiều nơi sản xuất vẫn lắp lẫn được."],
    ["Lắp lẫn trong cơ khí có ý nghĩa gì?", "Chi tiết cùng loại thay thế nhau mà không cần sửa thêm", "Mỗi chi tiết chỉ lắp được với một chi tiết duy nhất", "Lắp lẫn làm giảm chất lượng máy", "Lắp lẫn nhờ chế tạo theo tiêu chuẩn và dung sai thống nhất."],
    ["Vật liệu phổ biến nhất trong cơ khí chế tạo là gì?", "Kim loại và hợp kim như thép, gang, nhôm, đồng", "Gỗ và tre nứa tự nhiên", "Vải sợi và da động vật", "Thép chiếm tỉ trọng lớn nhất nhờ bền, rẻ và dễ gia công."],
    ["Bảo trì máy móc trong sản xuất cơ khí có tác dụng gì?", "Giữ máy chính xác, bền lâu, giảm hỏng hóc đột xuất", "Làm máy nhanh hỏng hơn", "Không cần thực hiện định kì", "Bôi trơn, vệ sinh và kiểm tra định kì là nội dung bảo trì cơ bản."],
    ["Sản phẩm cơ khí cần kiểm tra chất lượng bằng dụng cụ nào?", "Thước cặp, panme, đồng hồ so và dưỡng kiểm", "Chỉ nhìn bằng mắt thường là đủ", "Chỉ dùng tay sờ vào bề mặt", "Đo kiểm giúp phát hiện chi tiết không đạt yêu cầu trước khi lắp ráp."],
    ["Cơ khí chế tạo gắn với ngành ô tô, đóng tàu thế nào?", "Cung cấp chi tiết, khung vỏ, động cơ và thiết bị cho chúng", "Hoàn toàn không liên quan với nhau", "Chỉ cung cấp nhiên liệu vận hành", "Công nghiệp hỗ trợ cơ khí mạnh giúp tăng tỉ lệ nội địa hoá ô tô, tàu thuỷ."],
    ["Tự động hoá trong cơ khí chế tạo giúp đạt điều gì?", "Năng suất cao, chất lượng ổn định, giảm lao động nặng nhọc", "Làm chất lượng sản phẩm kém đi rõ rệt", "Tăng phế phẩm trong sản xuất", "Dây chuyền tự động vẫn cần kĩ thuật viên giám sát và bảo trì thường xuyên."],
    ["Học sinh muốn theo ngành cơ khí cần nền tảng môn học nào?", "Toán, Vật lí, vẽ kĩ thuật và tư duy không gian tốt", "Không cần học môn tự nhiên nào", "Chỉ cần học ngoại ngữ là đủ", "Chọn tổ hợp môn phù hợp ngay từ THPT giúp thuận lợi khi học cơ khí ở bậc cao hơn."]
  ];
  var cn11ck1P = [
    ["Bu lông, trục, bánh răng", "Chi tiết máy tiêu biểu"],
    ["Tay quay – con trượt", "Cơ cấu biến đổi chuyển động"],
    ["Thước cặp, panme", "Dụng cụ đo kích thước chính xác"],
    ["Bản vẽ kĩ thuật", "Ngôn ngữ chung của chế tạo cơ khí"],
    ["Thợ tiện, thợ phay", "Nghề gia công cắt gọt cơ khí"],
    ["Dung sai", "Khoảng kích thước cho phép của chi tiết"],
    ["Nhà máy thông minh", "Sản xuất kết nối số, tự động hoá cao"]
  ];
  var cn11ck2F = [
    ["Vật liệu cơ khí được phân thành những nhóm chính nào?", "Kim loại, hợp kim và vật liệu phi kim loại", "Chỉ có sắt và thép", "Chỉ có vật liệu tự nhiên", "Chọn đúng vật liệu quyết định độ bền, giá thành và tuổi thọ sản phẩm."],
    ["Thép là hợp kim của những nguyên tố nào?", "Sắt và cacbon, hàm lượng cacbon dưới 2,14%", "Đồng và kẽm là chủ yếu", "Nhôm và silic là chủ yếu", "Thép có độ bền cao, dẻo, dễ gia công nên được dùng rộng rãi nhất."],
    ["Gang khác thép chủ yếu ở điểm nào?", "Hàm lượng cacbon cao hơn, giòn hơn, dễ đúc hơn", "Gang không chứa cacbon chút nào", "Gang dẻo dai hơn thép rất nhiều", "Gang thường dùng đúc thân máy, vỏ hộp giảm tốc nhờ tính đúc tốt và giảm rung."],
    ["Thép cacbon và thép hợp kim khác nhau thế nào?", "Thép hợp kim có thêm nguyên tố như Cr, Ni, Mn", "Hai loại hoàn toàn giống hệt nhau", "Thép cacbon chứa nhiều nguyên tố hợp kim hơn", "Thêm nguyên tố hợp kim giúp thép cứng hơn, bền nhiệt và chống gỉ tốt hơn."],
    ["Thép không gỉ (inox) có đặc tính nổi bật nào?", "Chống ăn mòn tốt nhờ chứa nhiều crôm", "Không bao giờ cứng như thép thường", "Chỉ dùng làm đồ trang sức", "Inox dùng nhiều trong y tế, thực phẩm và chi tiết làm việc trong môi trường ẩm."],
    ["Đồng và hợp kim đồng có tính chất nổi bật nào?", "Dẫn điện, dẫn nhiệt tốt, chống ăn mòn khá", "Cách điện tốt như nhựa", "Cứng nhất trong các kim loại", "Đồng dùng làm dây điện, ống dẫn; đồng thau là hợp kim đồng – kẽm."],
    ["Đồng thau là hợp kim của những kim loại nào?", "Đồng và kẽm", "Đồng và thiếc", "Nhôm và đồng", "Đồng thau dễ gia công, màu vàng đẹp, dùng làm van, ổ trượt và chi tiết trang trí."],
    ["Đồng thanh (đồng thiếc) là hợp kim của đồng với nguyên tố nào?", "Thiếc", "Kẽm", "Chì", "Đồng thanh chịu mài mòn tốt, hay dùng làm bạc lót và bánh vít."],
    ["Nhôm và hợp kim nhôm có ưu điểm nổi bật nào?", "Nhẹ, chống ăn mòn, dẫn nhiệt và dẫn điện tốt", "Nặng hơn chì và rất giòn", "Không dẫn điện trong mọi trường hợp", "Hợp kim nhôm dùng làm vỏ máy bay, khung xe và chi tiết cần nhẹ."],
    ["Tính chất cơ học của vật liệu gồm những chỉ tiêu nào?", "Độ bền, độ cứng, độ dẻo và độ dai va đập", "Màu sắc và mùi của vật liệu", "Giá bán trên thị trường", "Tính chất cơ học quyết định khả năng chịu lực của chi tiết khi làm việc."],
    ["Độ cứng của vật liệu là gì?", "Khả năng chống lại biến dạng và mài mòn bề mặt", "Khả năng kéo dài khi chịu lực kéo", "Khả năng dẫn nhiệt của vật liệu", "Độ cứng được đo bằng các phương pháp Brinell, Rockwell, Vickers."],
    ["Độ bền kéo của vật liệu cho biết điều gì?", "Ứng suất kéo lớn nhất vật liệu chịu được trước khi đứt", "Khối lượng riêng của vật liệu", "Nhiệt độ nóng chảy của vật liệu", "Thép có độ bền kéo cao hơn gang nên chịu kéo tốt hơn."],
    ["Tính dẻo của vật liệu thể hiện ở khả năng nào?", "Biến dạng dẻo mà không nứt gãy khi gia công áp lực", "Nảy lại hoàn toàn như cao su", "Tan chảy ở nhiệt độ thấp", "Kim loại dẻo dễ rèn, cán, kéo sợi; vật liệu giòn thì ngược lại."],
    ["Tính đúc của vật liệu phụ thuộc vào yếu tố nào?", "Tính chảy loãng, độ co ngót và tính thiên tích", "Màu sắc của kim loại lỏng", "Giá thành của khuôn đúc", "Gang có tính đúc tốt nên thân máy thường được đúc bằng gang."],
    ["Tính hàn của kim loại là gì?", "Khả năng tạo liên kết bền khi hàn nối các chi tiết", "Khả năng dẫn điện của kim loại", "Khả năng bị nam châm hút", "Thép cacbon thấp dễ hàn; gang và thép cacbon cao khó hàn hơn."],
    ["Nhiệt luyện thép nhằm mục đích gì?", "Thay đổi tổ chức, tăng độ cứng và độ bền của thép", "Làm thép đổi màu cho đẹp hơn", "Làm thép nhẹ đi một nửa", "Các phương pháp nhiệt luyện: tôi, ram, ủ, thường hoá."],
    ["Tôi thép là quá trình nhiệt luyện thế nào?", "Nung nóng rồi làm nguội nhanh để thép cứng lên", "Nung nóng rồi nguội chậm trong lò", "Ngâm thép lâu trong nước lạnh thường", "Thép sau tôi rất cứng nhưng giòn, thường phải ram tiếp theo."],
    ["Ram thép sau khi tôi có tác dụng gì?", "Giảm giòn, giảm ứng suất trong, giữ độ cứng phù hợp", "Làm thép mềm như khi chưa tôi", "Làm thép tăng độ giòn thêm nữa", "Tôi và ram kết hợp giúp chi tiết vừa cứng vừa đủ dai."],
    ["Vật liệu phi kim loại dùng trong cơ khí gồm loại nào?", "Chất dẻo, cao su, gỗ, thuỷ tinh và vật liệu composite", "Chỉ có thép và gang", "Chỉ có đồng và nhôm", "Chất dẻo nhẹ, cách điện, chống ăn mòn, dùng làm tay cầm, ống và vỏ thiết bị."],
    ["Vật liệu composite có cấu tạo đặc trưng thế nào?", "Vật liệu nền kết hợp vật liệu cốt tăng bền, nhẹ", "Một kim loại nguyên chất duy nhất", "Hỗn hợp đất và nước", "Composite sợi thuỷ tinh, sợi cacbon dùng làm vỏ tàu, cánh quạt và khung xe nhẹ."],
    ["Chất dẻo nhiệt dẻo khác chất dẻo nhiệt rắn ở điểm nào?", "Nhiệt dẻo mềm lại khi nung và tái chế được", "Nhiệt dẻo không bao giờ chảy mềm", "Hai loại hoàn toàn giống nhau", "Nhựa PE, PP, PVC là nhiệt dẻo; nhựa epoxy, bakelit là nhiệt rắn."],
    ["Ăn mòn kim loại là hiện tượng gì và phòng chống thế nào?", "Kim loại bị phá huỷ do môi trường; chống bằng sơn, mạ", "Kim loại tự tăng độ bền theo thời gian", "Chỉ xảy ra với kim loại quý hiếm", "Sơn phủ, mạ kẽm, mạ crôm và dùng thép không gỉ là cách chống ăn mòn phổ biến."],
    ["Khi chọn vật liệu chế tạo chi tiết cần căn cứ vào điều gì?", "Điều kiện làm việc, tải trọng, giá thành và tính công nghệ", "Chỉ chọn vật liệu đắt tiền nhất", "Chỉ dựa vào màu sắc vật liệu", "Trục chịu xoắn lớn cần thép bền; vỏ máy cần nhẹ có thể dùng hợp kim nhôm."],
    ["Tính công nghệ của vật liệu gồm những khía cạnh nào?", "Tính đúc, tính hàn, tính rèn và khả năng gia công cắt", "Chỉ liên quan tới giá mua vật liệu", "Khả năng tái chế sau sử dụng", "Vật liệu tính công nghệ tốt giúp chế tạo dễ, rẻ và ít phế phẩm."],
    ["Gang xám có đặc điểm và ứng dụng nào?", "Giảm rung tốt, dễ đúc, dùng làm thân máy, bệ máy", "Dẻo nhất trong các hợp kim sắt", "Dùng làm lò xo đàn hồi cao", "Graphit dạng tấm trong gang xám giúp hấp thu rung động khi máy vận hành."]
  ];
  var cn11ck2P = [
    ["Thép", "Hợp kim sắt – cacbon dưới 2,14% C"],
    ["Gang", "Nhiều cacbon, giòn, tính đúc tốt"],
    ["Đồng thau", "Hợp kim đồng – kẽm"],
    ["Đồng thanh", "Hợp kim đồng – thiếc"],
    ["Hợp kim nhôm", "Nhẹ, chống ăn mòn, dẫn nhiệt tốt"],
    ["Inox", "Thép chứa crôm, chống gỉ tốt"],
    ["Composite", "Nền kết hợp cốt sợi, bền và nhẹ"],
    ["Tôi thép", "Nung nóng, nguội nhanh để tăng cứng"]
  ];
  var cn11ck3F = [
    ["Gia công cơ khí được phân thành những nhóm chính nào?", "Gia công không phoi và gia công cắt gọt có phoi", "Chỉ có gia công bằng tay", "Chỉ có đúc và hàn", "Gia công cắt gọt chiếm tỉ lệ lớn trong chế tạo chi tiết chính xác."],
    ["Gia công không phoi gồm những phương pháp nào?", "Đúc, rèn, dập, hàn và ép, không tách vật liệu thừa", "Tiện, phay và khoan", "Mài và đánh bóng bề mặt", "Phôi sau gia công không phoi thường cần gia công cắt để đạt độ chính xác cuối."],
    ["Đúc là phương pháp gia công thế nào?", "Rót kim loại lỏng vào khuôn, nguội đông đặc thành vật đúc", "Dùng dao cắt bỏ dần vật liệu", "Dùng búa đập dẹp phôi nóng", "Đúc tạo được chi tiết hình dạng phức tạp như thân máy, vỏ hộp."],
    ["Khuôn cát trong đúc có đặc điểm gì?", "Làm bằng cát chịu nhiệt, thường chỉ dùng một lần", "Dùng vĩnh viễn không bao giờ hỏng", "Làm bằng kim loại nguyên khối", "Đúc trong khuôn cát linh hoạt, rẻ, hợp với vật đúc lớn và sản xuất đơn chiếc."],
    ["Rèn là phương pháp gia công áp lực thế nào?", "Dùng lực ép hoặc đập làm phôi nóng biến dạng dẻo", "Rót kim loại lỏng vào khuôn kín", "Dùng tia lửa điện ăn mòn phôi", "Rèn giúp thớ kim loại liên tục, chi tiết bền hơn, dùng làm trục, bánh răng thô."],
    ["Dập thể tích và dập tấm khác nhau ở phôi ban đầu nào?", "Dập thể tích dùng phôi khối; dập tấm dùng phôi tấm mỏng", "Hai phương pháp dùng phôi giống hệt nhau", "Dập tấm dùng phôi đúc đặc lớn", "Dập tấm tạo vỏ ô tô, nắp và chi tiết mỏng từ tấm kim loại trên máy ép."],
    ["Hàn là phương pháp nối chi tiết thế nào?", "Nung chảy mép nối, kim loại kết dính thành một khối", "Nối bằng bu lông và đai ốc", "Dán bằng keo thông thường", "Hàn hồ quang là phương pháp hàn phổ biến nhất trong chế tạo kết cấu thép."],
    ["Gia công cắt gọt đạt độ chính xác cao nhờ nguyên lí nào?", "Dao cắt bỏ lớp vật liệu thừa (phoi) theo quỹ đạo định sẵn", "Nung chảy toàn bộ phôi rồi đông lại", "Ép phôi biến dạng trong khuôn", "Cắt gọt cho kích thước chính xác và bề mặt nhẵn hơn gia công không phoi."],
    ["Tiện là phương pháp gia công có chuyển động chính thế nào?", "Phôi quay tròn, dao tịnh tiến để cắt tạo mặt trụ, mặt côn", "Phôi đứng yên, dao quay tròn", "Phôi và dao cùng đứng yên", "Máy tiện gia công chủ yếu các chi tiết dạng tròn xoay như trục, bạc, ren."],
    ["Trên máy tiện có thể gia công những bề mặt nào?", "Mặt trụ, mặt đầu, mặt côn, lỗ và ren ngoài, ren trong", "Chỉ gia công được mặt phẳng", "Chỉ cắt được vật liệu phi kim", "Tiện là phương pháp gia công cắt gọt phổ biến nhất trong xưởng cơ khí."],
    ["Dao tiện cần đáp ứng yêu cầu vật liệu nào?", "Cứng hơn phôi, bền nhiệt, chịu mài mòn khi cắt", "Mềm hơn phôi để dễ mài sắc", "Làm bằng kim loại dễ chảy", "Dao tiện thường làm bằng thép gió hoặc hợp kim cứng gắn mảnh cắt."],
    ["Phay là phương pháp gia công có đặc điểm chuyển động nào?", "Dao phay quay tròn, phôi tịnh tiến theo bàn máy", "Phôi quay, dao đứng yên hoàn toàn", "Chỉ dao tịnh tiến, phôi quay nhanh", "Phay gia công mặt phẳng, rãnh, bánh răng và bề mặt định hình."],
    ["Máy phay khác máy tiện chủ yếu ở điểm nào?", "Dao quay là chuyển động chính, gia công được mặt phẳng, rãnh", "Máy phay không có dao cắt", "Máy phay chỉ khoan được lỗ tròn", "Một xưởng cơ khí thường trang bị cả máy tiện và máy phay để bổ sung cho nhau."],
    ["Bào và xọc gia công bề mặt nào là chủ yếu?", "Mặt phẳng và rãnh thẳng nhờ dao chuyển động tịnh tiến", "Mặt tròn xoay như tiện", "Bề mặt cong phức tạp ba chiều", "Bào năng suất thấp hơn phay nên ngày càng ít dùng trong sản xuất hàng loạt."],
    ["Khoan là phương pháp gia công tạo ra bề mặt nào?", "Tạo lỗ tròn trên phôi bằng mũi khoan quay", "Tạo ren ngoài trên trục", "Tạo mặt phẳng rộng", "Sau khoan có thể doa hoặc tarô để lỗ chính xác hơn và có ren."],
    ["Doa lỗ khác khoan lỗ ở mục đích nào?", "Doa tinh lỗ đã có để đạt độ chính xác, độ nhẵn cao", "Doa tạo lỗ đầu tiên trên phôi đặc", "Doa làm lỗ nhỏ dần đi", "Khoan – khoét – doa là trình tự gia công lỗ chính xác thường gặp."],
    ["Tarô và bàn ren dùng để gia công gì?", "Tarô tạo ren trong; bàn ren tạo ren ngoài", "Cả hai đều tạo ren trong", "Cả hai đều dùng để mài phẳng", "Ren là bề mặt ghép nối phổ biến nhất trong các mối ghép tháo được."],
    ["Mài là phương pháp gia công tinh dùng dụng cụ nào?", "Đá mài quay nhanh, hạt mài cắt lớp vật liệu rất mỏng", "Dao tiện một lưỡi cắt lớn", "Búa và đục cầm tay", "Mài đạt độ nhẵn bóng và độ chính xác cao nhất trong gia công cắt gọt."],
    ["Khi nào chi tiết cần được mài sau khi tiện hoặc phay?", "Khi yêu cầu độ chính xác, độ nhẵn bề mặt rất cao", "Với mọi chi tiết không có yêu cầu gì", "Khi chi tiết làm bằng gỗ mềm", "Cổ trục, vòng bi thường được mài tinh sau nhiệt luyện."],
    ["Chế độ cắt trong gia công cắt gọt gồm những yếu tố nào?", "Tốc độ cắt, lượng chạy dao và chiều sâu cắt", "Chỉ có tốc độ quay của máy", "Màu sơn của máy công cụ", "Chọn chế độ cắt hợp lí giúp tăng năng suất, chất lượng và tuổi bền dao."],
    ["Dung dịch trơn nguội khi gia công cắt gọt có tác dụng gì?", "Làm mát dao và phôi, bôi trơn, cuốn phoi ra khỏi vùng cắt", "Làm phôi nóng lên nhanh hơn", "Không có tác dụng thực tế nào", "Thiếu dung dịch trơn nguội, dao nhanh mòn và bề mặt gia công kém chất lượng."],
    ["Phoi là gì trong gia công cắt gọt?", "Lớp vật liệu bị dao cắt tách ra khỏi phôi", "Bụi bẩn bám trên máy công cụ", "Phần chi tiết đã hoàn thiện", "Phoi kim loại sắc và nóng, cần trang bị bảo hộ và dọn vệ sinh đúng cách."],
    ["Gia công bằng tia lửa điện (EDM) có nguyên lí thế nào?", "Phóng điện ăn mòn vật liệu, gia công vật liệu rất cứng", "Dùng dao cứng hơn để cắt gọt", "Dùng áp lực nước thông thường", "EDM gia công được khuôn mẫu cứng, hình dạng phức tạp mà dao thường khó làm."],
    ["Cắt bằng tia laser và tia nước có ưu điểm chung nào?", "Cắt nhanh, chính xác, ít biến dạng nhiệt hoặc không có", "Chỉ cắt được vật liệu mềm như vải", "Không cần điều khiển theo chương trình", "Cắt laser phổ biến với tấm kim loại; cắt tia nước cắt được cả vật liệu dày, cứng."],
    ["Thứ tự gia công hợp lí một chi tiết thường theo nguyên tắc nào?", "Gia công thô trước, gia công tinh sau, theo chuẩn định vị", "Gia công tinh trước rồi mới gia công thô", "Làm tuỳ tiện không theo trình tự", "Chuẩn định vị thống nhất giúp giảm sai số tích luỹ qua các nguyên công."]
  ];
  var cn11ck3P = [
    ["Tiện", "Phôi quay, dao tịnh tiến, tạo mặt tròn xoay"],
    ["Phay", "Dao quay, gia công mặt phẳng và rãnh"],
    ["Bào", "Dao tịnh tiến, gia công mặt phẳng thẳng"],
    ["Khoan", "Tạo lỗ tròn bằng mũi khoan quay"],
    ["Mài", "Đá mài gia công tinh, nhẵn bóng cao"],
    ["Đúc", "Rót kim loại lỏng vào khuôn"],
    ["Rèn", "Ép, đập phôi nóng biến dạng dẻo"],
    ["Hàn", "Nung chảy nối chi tiết thành một khối"]
  ];
  var cn11ck4F = [
    ["Quy trình sản xuất cơ khí gồm những bước cơ bản nào?", "Nghiên cứu thị trường, thiết kế, chế tạo, lắp ráp, bán hàng", "Chỉ có bước chế tạo chi tiết", "Chỉ có bước bán sản phẩm", "Quy trình sản xuất gắn chặt với nhu cầu thị trường và dịch vụ sau bán."],
    ["Thiết kế sản phẩm trong sản xuất cơ khí là khâu thế nào?", "Xác định cấu tạo, bản vẽ, vật liệu và công nghệ chế tạo", "Đóng gói sản phẩm trước khi bán", "Vận chuyển sản phẩm tới đại lí", "Thiết kế quyết định phần lớn chất lượng và giá thành của sản phẩm cơ khí."],
    ["Chế tạo phôi là bước gì trong quy trình công nghệ?", "Tạo phôi gần hình dạng chi tiết bằng đúc, rèn, dập, cán", "Lắp ráp các chi tiết thành máy", "Kiểm tra sản phẩm cuối cùng", "Phôi tốt giúp giảm lượng dư gia công, tiết kiệm vật liệu và thời gian cắt gọt."],
    ["Gia công cơ khí trong quy trình sản xuất làm nhiệm vụ gì?", "Biến phôi thành chi tiết đúng kích thước, hình dạng bản vẽ", "Thiết kế kiểu dáng sản phẩm mới", "Quảng cáo sản phẩm ra thị trường", "Gia công gồm nhiều nguyên công thực hiện trên các máy khác nhau."],
    ["Xử lí bề mặt chi tiết gồm những công việc nào?", "Nhiệt luyện, mạ, sơn, đánh bóng tăng bền và chống gỉ", "Cân đo khối lượng chi tiết", "Đóng thùng vận chuyển chi tiết", "Xử lí bề mặt nâng cao tuổi thọ và tính thẩm mĩ của sản phẩm cơ khí."],
    ["Lắp ráp sản phẩm cơ khí cần tuân thủ điều gì?", "Đúng trình tự, đúng kĩ thuật, kiểm tra sau mỗi cụm lắp", "Lắp tuỳ ý theo cảm tính của thợ", "Không cần dụng cụ chuyên dùng", "Lắp ráp chính xác quyết định máy chạy êm, an toàn và đúng công suất thiết kế."],
    ["Đóng gói và bảo quản sản phẩm cơ khí nhằm mục đích gì?", "Chống va đập, chống ẩm gỉ trong vận chuyển, lưu kho", "Làm sản phẩm nặng thêm không cần thiết", "Chỉ để sản phẩm trông to hơn", "Máy móc xuất khẩu đường biển càng cần chống ẩm, chống gỉ cẩn thận."],
    ["Dây chuyền sản xuất cơ khí là hình thức tổ chức thế nào?", "Máy bố trí theo trình tự công nghệ, sản phẩm đi liên tục", "Mỗi thợ làm toàn bộ sản phẩm một mình", "Máy móc đặt lộn xộn không theo trình tự", "Dây chuyền hợp với sản xuất hàng loạt lớn như ô tô, xe máy."],
    ["Sản xuất đơn chiếc khác sản xuất hàng loạt ở điểm nào?", "Đơn chiếc: ít sản phẩm, đa dạng; hàng loạt: nhiều, ổn định", "Hai hình thức hoàn toàn giống nhau", "Đơn chiếc luôn rẻ hơn hàng loạt", "Sản xuất hàng loạt dùng nhiều máy chuyên dùng và tự động hoá cao hơn."],
    ["Tự động hoá sản xuất cơ khí là gì?", "Dùng máy tự động, robot thay người ở các khâu sản xuất", "Tăng số công nhân làm thủ công", "Bỏ hết máy móc trong nhà máy", "Tự động hoá nâng cao năng suất, chất lượng và an toàn lao động."],
    ["Robot công nghiệp thường đảm nhiệm công việc nào?", "Hàn, sơn, lắp ráp, bốc xếp và gia công lặp lại chính xác", "Thiết kế ý tưởng sản phẩm mới hoàn toàn", "Đàm phán hợp đồng với khách hàng", "Robot làm việc bền bỉ trong môi trường độc hại, nặng nhọc thay con người."],
    ["Máy CNC đóng vai trò gì trong sản xuất cơ khí hiện đại?", "Gia công tự động theo chương trình số, chính xác, linh hoạt", "Chỉ dùng để vẽ bản vẽ trên giấy", "Thay thế hoàn toàn khâu thiết kế", "Một máy CNC có thể gia công nhiều chi tiết khác nhau khi đổi chương trình."],
    ["Hệ thống sản xuất linh hoạt (FMS) có đặc điểm gì?", "Liên kết máy CNC, robot, máy tính để đổi sản phẩm nhanh", "Chỉ sản xuất đúng một sản phẩm duy nhất", "Không sử dụng máy tính điều khiển", "FMS phù hợp sản xuất hàng loạt vừa và nhỏ với nhiều chủng loại chi tiết."],
    ["Kiểm tra chất lượng trong sản xuất cơ khí nhằm mục đích gì?", "Phát hiện sai hỏng, đảm bảo sản phẩm đạt tiêu chuẩn", "Làm chậm tiến độ sản xuất là chính", "Chỉ thực hiện khi khách hàng khiếu nại", "Kiểm tra được thực hiện ở đầu vào, trong quá trình và khi xuất xưởng."],
    ["Tiêu chuẩn hoá trong sản xuất cơ khí mang lại lợi ích gì?", "Thống nhất kích thước, dễ lắp lẫn, giảm chi phí chế tạo", "Làm sản phẩm khó thay thế phụ tùng", "Không có lợi ích thực tế nào", "Bu lông, vòng bi sản xuất theo tiêu chuẩn nên thay thế dễ dàng ở mọi nơi."],
    ["Bảo dưỡng, sửa chữa máy trong nhà máy thuộc khâu nào?", "Duy trì thiết bị hoạt động ổn định suốt quá trình sản xuất", "Thuộc khâu thiết kế sản phẩm mới", "Chỉ làm khi máy đã hỏng hoàn toàn", "Bảo dưỡng phòng ngừa giúp tránh dừng máy đột xuất gây thiệt hại lớn."],
    ["Ứng dụng CAD trong quy trình sản xuất cơ khí để làm gì?", "Thiết kế, vẽ và mô phỏng sản phẩm trên máy tính", "Thay thế hoàn toàn máy công cụ", "Chỉ dùng để in tài liệu quảng cáo", "CAD kết hợp CAM tạo dữ liệu gia công cho máy CNC một cách liền mạch."],
    ["Sản xuất tinh gọn (lean) hướng tới mục tiêu gì?", "Loại bỏ lãng phí, giảm tồn kho, nâng cao hiệu quả sản xuất", "Tăng tối đa hàng tồn kho trong nhà máy", "Thuê càng nhiều nhân công càng tốt", "Tinh gọn là triết lí quản lí sản xuất nổi tiếng từ ngành ô tô Nhật Bản."],
    ["An toàn và vệ sinh lao động trong nhà máy cơ khí yêu cầu gì?", "Che chắn máy, bảo hộ cá nhân, xưởng thoáng, đủ sáng", "Không cần trang bị bảo hộ cho công nhân", "Để phoi và dầu mỡ bừa bãi trên sàn", "Tai nạn cơ khí thường do máy quay, vật văng và phoi sắc gây ra."],
    ["Xu hướng sản xuất cơ khí xanh hướng tới điều gì?", "Tiết kiệm năng lượng, tái chế phế liệu, giảm phát thải", "Dùng càng nhiều nguyên liệu càng tốt", "Không quan tâm tới môi trường nhà máy", "Phoi kim loại được thu gom, tái chế thành nguyên liệu cho lò nấu mới."],
    ["Kĩ sư công nghệ chế tạo trong nhà máy làm công việc gì?", "Lập quy trình công nghệ, chọn máy, dao và chế độ gia công", "Trực tiếp bán sản phẩm tại cửa hàng", "Làm công việc kế toán tài chính", "Kĩ sư công nghệ là cầu nối giữa bản vẽ thiết kế và sản xuất thực tế."],
    ["Đổi mới công nghệ sản xuất cơ khí mang lại lợi ích gì dài hạn?", "Nâng sức cạnh tranh, chất lượng và thị phần của doanh nghiệp", "Chỉ tốn chi phí mà không có lợi ích", "Làm doanh nghiệp khó bán hàng hơn", "Doanh nghiệp cơ khí không đổi mới sẽ khó tham gia chuỗi cung ứng toàn cầu."]
  ];
  var cn11ck4P = [
    ["Chế tạo phôi", "Đúc, rèn, dập tạo hình gần chi tiết"],
    ["Lắp ráp", "Ghép chi tiết thành sản phẩm hoàn chỉnh"],
    ["Robot công nghiệp", "Hàn, sơn, lắp ráp tự động lặp lại"],
    ["Máy CNC", "Gia công tự động theo chương trình số"],
    ["Sản xuất linh hoạt FMS", "Đổi loại sản phẩm nhanh, liên kết số"],
    ["Sản xuất tinh gọn", "Loại bỏ lãng phí trong sản xuất"],
    ["Xử lí bề mặt", "Mạ, sơn, nhiệt luyện tăng bền, chống gỉ"]
  ];
  var cn11ck5F = [
    ["Cơ khí động lực là lĩnh vực cơ khí nào?", "Nghiên cứu, chế tạo máy móc có nguồn động lực riêng", "Chế tạo dụng cụ cầm tay không có động cơ", "Sản xuất đồ gỗ thủ công mỹ nghệ", "Máy cơ khí động lực tự di chuyển hoặc truyền động năng cho bộ phận công tác."],
    ["Hệ thống cơ khí động lực gồm những bộ phận chính nào?", "Nguồn động lực, hệ thống truyền lực và máy công tác", "Chỉ có một động cơ duy nhất", "Chỉ có khung vỏ bên ngoài", "Ba bộ phận phối hợp để máy thực hiện được công việc mong muốn."],
    ["Nguồn động lực trong hệ thống cơ khí động lực làm nhiệm vụ gì?", "Cung cấp năng lượng cho toàn hệ thống hoạt động", "Truyền chuyển động tới bánh xe", "Thực hiện trực tiếp việc cày, kéo", "Nguồn động lực phổ biến là động cơ đốt trong và động cơ điện."],
    ["Hệ thống truyền lực có nhiệm vụ gì?", "Truyền, biến đổi chuyển động từ động cơ tới máy công tác", "Sinh ra năng lượng cho hệ thống", "Làm mát động cơ khi làm việc", "Hộp số, li hợp, trục các đăng là những bộ phận truyền lực điển hình trên ô tô."],
    ["Máy công tác là bộ phận nào của hệ thống?", "Bộ phận trực tiếp thực hiện nhiệm vụ của máy", "Bộ phận sinh ra năng lượng ban đầu", "Bộ phận chỉ để trang trí bên ngoài", "Ví dụ máy công tác: bánh xe chủ động của ô tô, lưỡi cày của máy kéo."],
    ["Máy cơ khí động lực được phân loại theo tiêu chí nào?", "Theo nguồn động lực, công dụng và môi trường hoạt động", "Chỉ theo màu sơn của máy", "Chỉ theo kích thước của máy", "Theo môi trường có máy trên không, trên bộ, trên mặt nước và dưới nước."],
    ["Nhóm máy cơ khí động lực trên bộ gồm những máy nào?", "Ô tô, xe máy, máy kéo, máy xúc và máy ủi", "Tàu thuỷ và ca nô", "Máy bay và trực thăng", "Máy trên bộ di chuyển chủ yếu bằng bánh xe hoặc xích."],
    ["Động cơ đốt trong là nguồn động lực phổ biến vì lí do gì?", "Công suất lớn, gọn, tự hành không phụ thuộc nguồn điện ngoài", "Không cần nhiên liệu vẫn chạy được", "Không thải ra khí xả nào", "Động cơ đốt trong dùng trên ô tô, tàu thuỷ, máy nông nghiệp và máy phát điện."],
    ["Động cơ điện làm nguồn động lực có ưu điểm nào?", "Êm, sạch, hiệu suất cao, bảo dưỡng đơn giản hơn", "Không cần nguồn điện nào cả", "Công suất luôn lớn hơn mọi động cơ khác", "Xe điện ngày càng phổ biến nhờ động cơ điện và pin ngày càng tốt."],
    ["Máy kéo nông nghiệp thuộc nhóm máy cơ khí động lực nào?", "Máy động lực trên bộ dùng trong nông nghiệp", "Máy động lực trên mặt nước", "Máy công tác không có động cơ", "Máy kéo lắp các máy công tác khác nhau để cày, bừa, gieo trồng và thu hoạch."],
    ["Tàu thuỷ dùng hệ thống cơ khí động lực thế nào?", "Động cơ truyền lực qua trục tới chân vịt đẩy tàu di chuyển", "Tàu chỉ trôi theo dòng nước tự nhiên", "Động cơ chỉ dùng để phát điện chiếu sáng", "Chân vịt là máy công tác của hệ thống cơ khí động lực trên tàu thuỷ."],
    ["Máy phát điện thuộc loại máy cơ khí động lực nào?", "Động cơ kéo máy phát tạo điện phục vụ nhu cầu tại chỗ", "Máy tiêu thụ điện lưới để chạy", "Máy không có bộ phận quay nào", "Máy phát điện dự phòng quan trọng ở bệnh viện, trang trại và nơi hay mất điện."],
    ["Hiệu suất của hệ thống cơ khí động lực bị giảm do đâu?", "Ma sát, tổn thất ở khâu truyền lực và chuyển hoá", "Do màu sơn của máy quá sáng", "Do máy được bảo dưỡng quá tốt", "Bôi trơn tốt và truyền lực ít khâu giúp nâng cao hiệu suất toàn hệ thống."],
    ["Khi chọn máy cơ khí động lực cần căn cứ vào tiêu chí nào?", "Công dụng, công suất, điều kiện làm việc và chi phí vận hành", "Chỉ chọn máy có kích thước lớn nhất", "Chỉ dựa vào sở thích cá nhân", "Chọn máy quá công suất gây lãng phí; thiếu công suất máy quá tải, nhanh hỏng."],
    ["Bảo dưỡng hệ thống cơ khí động lực gồm công việc gì?", "Thay dầu, lọc, kiểm tra truyền lực và siết chặt mối ghép", "Chỉ rửa sạch vỏ bên ngoài của máy", "Không cần kiểm tra định kì nào", "Bảo dưỡng đúng hạn giúp máy bền, an toàn và tiết kiệm nhiên liệu."],
    ["Xu hướng phát triển của cơ khí động lực hiện nay là gì?", "Động cơ sạch, điện khí hoá, tiết kiệm năng lượng, thông minh", "Quay lại dùng sức người và súc vật hoàn toàn", "Tăng tối đa khí thải ra môi trường", "Ô tô điện, ô tô hybrid là biểu hiện rõ của xu hướng điện khí hoá."],
    ["Máy xúc, máy ủi trong xây dựng dùng máy công tác nào?", "Gầu xúc và lưỡi ủi thực hiện đào, san gạt đất", "Chân vịt đẩy nước phía sau máy", "Cánh quạt như máy bay trực thăng", "Máy xây dựng thường truyền lực bằng hệ thống thuỷ lực mạnh và linh hoạt."],
    ["Truyền động thuỷ lực trong máy động lực có ưu điểm gì?", "Truyền lực lớn, êm, điều khiển linh hoạt, gọn", "Không truyền được lực lớn", "Chỉ dùng cho máy rất nhỏ", "Hệ thống thuỷ lực dùng dầu áp suất cao, phổ biến trên máy xúc và máy nâng."],
    ["An toàn khi vận hành máy cơ khí động lực yêu cầu gì?", "Người vận hành được đào tạo, máy kiểm tra trước khi chạy", "Ai cũng tự ý vận hành không cần học", "Vận hành máy khi đang mệt mỏi, buồn ngủ", "Nhiều tai nạn máy động lực do chủ quan và không tuân thủ quy trình an toàn."],
    ["Nguồn động lực hơi nước ngày nay ít dùng vì sao?", "Cồng kềnh, hiệu suất thấp so với động cơ đốt trong, điện", "Vì không tạo ra được chuyển động quay", "Vì nước không thể đun sôi được", "Động cơ hơi nước từng là nguồn động lực chính của cách mạng công nghiệp lần thứ nhất."]
  ];
  var cn11ck5P = [
    ["Nguồn động lực", "Động cơ cung cấp năng lượng cho hệ thống"],
    ["Hệ thống truyền lực", "Truyền, biến đổi chuyển động và mômen"],
    ["Máy công tác", "Bộ phận trực tiếp thực hiện nhiệm vụ"],
    ["Bánh xe chủ động", "Máy công tác của ô tô"],
    ["Chân vịt tàu thuỷ", "Đẩy tàu di chuyển trên mặt nước"],
    ["Truyền động thuỷ lực", "Dùng dầu áp suất cao truyền lực lớn"],
    ["Máy kéo", "Máy động lực trên bộ trong nông nghiệp"]
  ];
  var cn11ck6F = [
    ["Động cơ đốt trong là động cơ nhiệt có đặc điểm gì?", "Đốt cháy nhiên liệu bên trong xilanh, sinh công qua pít-tông", "Đốt nhiên liệu bên ngoài rồi dẫn hơi vào máy", "Không cần đốt cháy nhiên liệu nào", "Động cơ đốt trong biến nhiệt năng thành cơ năng ngay trong xilanh."],
    ["Theo nhiên liệu, động cơ đốt trong được phân thành loại nào?", "Động cơ xăng và động cơ điêzen là hai loại chính", "Động cơ nước và động cơ gió", "Chỉ có một loại duy nhất", "Động cơ xăng cháy cưỡng bức bằng bugi; điêzen tự cháy do nén cao."],
    ["Theo số kì, động cơ đốt trong phổ biến gồm loại nào?", "Động cơ 4 kì và động cơ 2 kì", "Động cơ 10 kì và 20 kì", "Chỉ có động cơ 1 kì", "Ô tô, xe máy thông dụng chủ yếu dùng động cơ 4 kì."],
    ["Chu trình làm việc của động cơ 4 kì gồm các kì nào theo thứ tự?", "Nạp – nén – nổ (sinh công) – xả", "Nén – nạp – xả – nổ", "Xả – nổ – nạp – nén", "Mỗi chu trình động cơ 4 kì, trục khuỷu quay hai vòng."],
    ["Kì nạp của động cơ 4 kì diễn ra thế nào?", "Pít-tông đi xuống, nạp hoà khí, không khí vào xilanh", "Pít-tông nén chặt hoà khí trong xilanh", "Khí cháy thải ra ngoài qua ống xả", "Xu páp nạp mở, xu páp xả đóng trong kì nạp."],
    ["Kì nén của động cơ 4 kì có tác dụng gì?", "Pít-tông đi lên nén hoà khí, tăng áp suất và nhiệt độ", "Đưa hoà khí mới vào xilanh", "Đẩy khí thải ra khỏi xilanh", "Tỉ số nén của động cơ điêzen cao hơn động cơ xăng rõ rệt."],
    ["Kì nổ (cháy – giãn nở) là kì duy nhất có đặc điểm gì?", "Kì duy nhất sinh công, đẩy pít-tông đi xuống mạnh", "Kì nạp nhiên liệu vào xilanh", "Kì đẩy khí thải ra ngoài", "Ba kì còn lại tiêu thụ công từ bánh đà và quán tính của trục khuỷu."],
    ["Kì xả của động cơ 4 kì diễn ra thế nào?", "Pít-tông đi lên đẩy khí đã cháy ra ngoài qua xu páp xả", "Hoà khí mới được hút vào xilanh", "Nhiên liệu bốc cháy trong xilanh", "Sau kì xả, chu trình mới lại bắt đầu bằng kì nạp."],
    ["Bugi trong động cơ xăng có nhiệm vụ gì?", "Đánh tia lửa điện đốt cháy hoà khí đúng thời điểm", "Phun nhiên liệu vào xilanh", "Làm mát động cơ khi nóng", "Động cơ điêzen không có bugi đánh lửa mà có vòi phun nhiên liệu."],
    ["Động cơ điêzen cháy nhiên liệu bằng cơ chế nào?", "Không khí nén nóng, nhiên liệu phun vào tự bốc cháy", "Bugi đánh lửa đốt cháy hoà khí", "Đốt cháy bên ngoài xilanh trước", "Nhờ tự cháy do nén, động cơ điêzen tiết kiệm nhiên liệu hơn động cơ xăng."],
    ["Pít-tông trong động cơ đốt trong làm nhiệm vụ gì?", "Nhận lực khí cháy rồi truyền tới trục khuỷu", "Làm mát nước trong két nước", "Lọc dầu bôi trơn cho động cơ", "Pít-tông chuyển động tịnh tiến lên xuống trong xilanh."],
    ["Trục khuỷu có vai trò gì trong động cơ?", "Biến chuyển động tịnh tiến của pít-tông thành quay tròn", "Nạp hoà khí vào xilanh động cơ", "Đánh lửa cho hoà khí cháy", "Trục khuỷu nối với bánh đà và truyền công suất ra ngoài qua li hợp, hộp số."],
    ["Bánh đà của động cơ đốt trong có tác dụng gì?", "Tích trữ năng lượng, giúp trục khuỷu quay đều qua các kì", "Phun nhiên liệu vào buồng cháy", "Làm mát động cơ bằng gió", "Động cơ một xilanh cần bánh đà lớn hơn để vượt qua các kì không sinh công."],
    ["Xu páp (xupap) trong cơ cấu phân phối khí có nhiệm vụ gì?", "Đóng, mở cửa nạp và cửa xả đúng thời điểm của chu trình", "Truyền lực từ pít-tông tới trục khuỷu", "Bơm dầu bôi trơn lên các chi tiết", "Trục cam điều khiển đóng mở xu páp theo đúng pha phân phối khí."],
    ["Hệ thống bôi trơn của động cơ có nhiệm vụ gì?", "Đưa dầu tới bề mặt ma sát, giảm mài mòn và làm mát chi tiết", "Cung cấp nhiên liệu cho buồng cháy", "Đánh lửa đốt cháy hoà khí", "Thiếu dầu bôi trơn, động cơ nhanh nóng, bó máy và hỏng nặng."],
    ["Hệ thống làm mát động cơ có nhiệm vụ gì?", "Giữ nhiệt độ động cơ ở mức làm việc tối ưu, tránh quá nóng", "Làm động cơ lạnh càng sâu càng tốt", "Cung cấp nhiên liệu cho động cơ", "Làm mát bằng nước hiệu quả và ổn định hơn làm mát bằng không khí."],
    ["Hệ thống cung cấp nhiên liệu động cơ xăng hiện đại dùng bộ phận nào?", "Phun xăng điện tử qua vòi phun vào đường nạp hoặc xilanh", "Chỉ dùng bộ chế hoà khí cơ học", "Đổ xăng trực tiếp bằng tay mỗi lần chạy", "Phun xăng điện tử giúp tiết kiệm nhiên liệu và giảm khí thải độc hại."],
    ["Bộ chế hoà khí (cacbuarato) có nhiệm vụ gì ở động cơ xăng cũ?", "Trộn xăng với không khí thành hoà khí tỉ lệ phù hợp", "Đánh lửa cho hoà khí trong xilanh", "Làm mát động cơ khi quá nóng", "Xe máy đời mới đã chuyển sang phun xăng điện tử thay chế hoà khí."],
    ["Tỉ số nén của động cơ là tỉ số giữa hai thể tích nào?", "Thể tích toàn phần và thể tích buồng cháy của xilanh", "Thể tích xilanh và thể tích két nước", "Thể tích thùng nhiên liệu và buồng cháy", "Tỉ số nén càng cao hiệu suất nhiệt càng lớn nhưng dễ gây kích nổ ở động cơ xăng."],
    ["Động cơ 2 kì khác động cơ 4 kì ở điểm nào?", "Chu trình hoàn thành trong một vòng quay trục khuỷu", "Không cần pít-tông và xilanh", "Không đốt cháy nhiên liệu", "Động cơ 2 kì gọn, mạnh so với kích thước nhưng tốn nhiên liệu và ô nhiễm hơn."],
    ["Khí thải động cơ đốt trong chứa chất độc hại nào cần xử lí?", "CO, HC, NOx và bụi mịn cần bộ xử lí khí thải", "Chỉ có hơi nước vô hại hoàn toàn", "Chỉ có khí ôxi sạch", "Bộ chuyển đổi xúc tác trên ô tô giúp giảm mạnh khí thải độc hại ra môi trường."],
    ["Động cơ nhiều xilanh có ưu điểm gì so với động cơ một xilanh?", "Chạy êm hơn, công suất lớn, các kì nổ phân bố đều", "Luôn tốn nhiên liệu hơn gấp nhiều lần", "Cấu tạo đơn giản hơn động cơ một xilanh", "Ô tô thường dùng động cơ 4 xilanh thẳng hàng hoặc bố trí chữ V."],
    ["Điểm chết trên và điểm chết dưới của pít-tông là gì?", "Vị trí pít-tông xa nhất và gần nhất so với trục khuỷu", "Vị trí pít-tông dừng hẳn không hoạt động", "Hai vị trí của xu páp trong xilanh", "Khoảng chạy giữa hai điểm chết gọi là hành trình pít-tông."],
    ["Công suất động cơ cho biết điều gì?", "Khả năng sinh công của động cơ trong một đơn vị thời gian", "Dung tích thùng nhiên liệu của động cơ", "Khối lượng của toàn bộ động cơ", "Công suất thường đo bằng kW hoặc mã lực (HP)."]
  ];
  var cn11ck6P = [
    ["Bugi", "Đánh lửa đốt hoà khí ở động cơ xăng"],
    ["Vòi phun điêzen", "Phun nhiên liệu vào không khí nén nóng"],
    ["Pít-tông", "Nhận lực khí cháy, chuyển động tịnh tiến"],
    ["Trục khuỷu", "Biến tịnh tiến thành chuyển động quay"],
    ["Bánh đà", "Tích năng lượng, giúp máy quay đều"],
    ["Xu páp", "Đóng mở cửa nạp, xả đúng thời điểm"],
    ["Kì nổ", "Kì duy nhất sinh công của chu trình"],
    ["Bộ xúc tác khí thải", "Giảm CO, HC, NOx trong khí xả"]
  ];
  var cn11ck7F = [
    ["Ô tô được cấu tạo chung gồm những bộ phận chính nào?", "Động cơ, khung gầm, hệ thống truyền lực, điện và thân vỏ", "Chỉ có động cơ và bốn bánh xe", "Chỉ có thân vỏ và ghế ngồi", "Các hệ thống trên ô tô phối hợp chặt chẽ để xe vận hành an toàn."],
    ["Động cơ trên ô tô thường được bố trí ở vị trí nào phổ biến?", "Đặt phía trước, dẫn động cầu trước hoặc cầu sau", "Luôn đặt ở giữa nóc xe", "Luôn treo bên ngoài thân xe", "Xe điện có thể đặt động cơ ngay tại bánh xe hoặc sàn xe."],
    ["Li hợp (côn) trên ô tô có nhiệm vụ gì?", "Nối và ngắt truyền động từ động cơ tới hộp số êm dịu", "Tăng tốc độ tối đa của xe", "Phanh xe dừng lại khi cần", "Đạp bàn đạp li hợp sẽ ngắt truyền động để sang số không bị giật, hỏng răng."],
    ["Hộp số ô tô có tác dụng gì?", "Thay đổi tỉ số truyền, mômen và chiều quay bánh xe chủ động", "Làm mát động cơ khi xe chạy nhanh", "Đánh lái cho xe rẽ hướng", "Số lùi trong hộp số giúp xe chạy ngược về phía sau."],
    ["Truyền lực chính và vi sai trên ô tô làm nhiệm vụ gì?", "Truyền mômen tới bánh, cho hai bánh quay lệch tốc khi rẽ", "Phun nhiên liệu vào động cơ", "Giảm xóc cho thân xe êm ái", "Nhờ vi sai, xe rẽ vòng mà bánh trong và bánh ngoài không bị trượt cưỡng bức."],
    ["Hệ thống lái ô tô gồm nhiệm vụ chính nào?", "Điều khiển hướng chuyển động của xe theo ý người lái", "Truyền công suất từ động cơ xuống bánh", "Giảm chấn động từ mặt đường lên xe", "Trợ lực lái thuỷ lực hoặc điện giúp đánh lái nhẹ nhàng hơn."],
    ["Hệ thống phanh ô tô có vai trò quan trọng thế nào?", "Giảm tốc độ và dừng xe an toàn, giữ xe đứng yên khi đỗ", "Tăng công suất cho động cơ xe", "Làm mát lốp xe khi chạy", "Phanh ABS chống bó cứng bánh, giúp xe không trượt dài khi phanh gấp."],
    ["Hệ thống treo trên ô tô có nhiệm vụ gì?", "Nối đàn hồi khung xe với bánh, giảm chấn động từ đường", "Truyền lực kéo từ động cơ xuống đường", "Điều khiển hướng đi của xe", "Hệ thống treo gồm lò xo, giảm chấn và thanh liên kết."],
    ["Lốp ô tô cần đảm bảo yêu cầu kĩ thuật nào?", "Đúng áp suất, gai còn sâu, không nứt rách và mòn đều", "Bơm càng căng càng tốt mọi lúc", "Dùng lốp mòn hết gai vẫn an toàn", "Áp suất lốp đúng giúp xe bám đường, tiết kiệm nhiên liệu và lốp bền hơn."],
    ["Ắc quy trên ô tô có nhiệm vụ gì?", "Cung cấp điện khởi động máy và nuôi thiết bị khi chưa nổ máy", "Truyền công suất cơ học xuống bánh xe", "Làm mát động cơ trong mọi điều kiện", "Máy phát điện sạc lại cho ắc quy khi động cơ đang hoạt động."],
    ["Hệ thống khởi động ô tô hoạt động thế nào?", "Máy khởi động điện quay trục khuỷu để động cơ tự nổ máy", "Người lái quay tay quay như ô tô đời cũ", "Đẩy xe chạy rồi động cơ mới nổ", "Ô tô hiện nay khởi động bằng nút bấm hoặc chìa khoá điện tử rất tiện lợi."],
    ["Đèn chiếu sáng và tín hiệu trên ô tô có vai trò gì?", "Chiếu sáng đường, báo hướng rẽ, phanh để đảm bảo an toàn", "Chỉ để trang trí cho xe đẹp hơn", "Không ảnh hưởng tới an toàn giao thông", "Đèn phanh, đèn xi nhan hoạt động tốt giúp các xe khác phán đoán đúng ý định."],
    ["Túi khí và dây an toàn trên ô tô bảo vệ người ngồi thế nào?", "Giảm chấn thương khi va chạm, giữ người không văng khỏi ghế", "Giúp xe chạy nhanh hơn trên đường", "Thay thế hoàn toàn hệ thống phanh", "Dây an toàn là trang bị bắt buộc và là tuyến bảo vệ đầu tiên khi tai nạn."],
    ["Sử dụng ô tô đúng cách yêu cầu người lái điều gì?", "Kiểm tra xe trước chuyến đi, lái đúng luật, không quá tải", "Chạy càng nhanh càng chứng tỏ tay lái giỏi", "Không cần kiểm tra lốp và phanh", "Kiểm tra dầu, nước, lốp, phanh, đèn trước chuyến đi xa là thói quen cần thiết."],
    ["Bảo dưỡng ô tô định kì gồm những hạng mục chính nào?", "Thay dầu, lọc, kiểm tra phanh, lốp, nước làm mát, ắc quy", "Chỉ rửa xe và đánh bóng thân vỏ", "Chỉ thay lốp khi lốp đã nổ", "Bảo dưỡng theo số km hoặc thời gian ghi trong sổ tay của nhà sản xuất."],
    ["Thay dầu động cơ ô tô đúng hạn có ý nghĩa gì?", "Giữ động cơ bền, giảm ma sát, tránh bó máy do dầu bẩn", "Chỉ làm động cơ trông sạch hơn", "Không cần thay nếu xe ít chạy", "Dầu cũ mất tính bôi trơn và chứa cặn bẩn làm hại chi tiết máy."],
    ["Khi xe đang chạy mà đèn báo nhiệt độ nước làm mát sáng đỏ, cần làm gì?", "Dừng xe an toàn, tắt máy kiểm tra, không mở nắp két khi nóng", "Tiếp tục chạy nhanh hơn cho mát máy", "Mở ngay nắp két nước đang sôi", "Quá nhiệt kéo dài có thể làm cong mặt máy, thổi gioăng và hỏng động cơ nặng."],
    ["Nguyên tắc an toàn giao thông cơ bản với người lái ô tô là gì?", "Đúng tốc độ, giữ khoảng cách, không rượu bia, điện thoại", "Vượt đèn đỏ khi đường vắng người", "Lái xe sau khi uống rượu bia một chút", "Phần lớn tai nạn giao thông do lỗi chủ quan của người điều khiển phương tiện."],
    ["Khoảng cách an toàn giữa hai xe đang chạy có tác dụng gì?", "Đủ thời gian xử lí, phanh dừng không đâm vào xe trước", "Chỉ để xe sau dễ vượt lên trước", "Không ảnh hưởng tới an toàn", "Trời mưa, đường trơn cần giữ khoảng cách xa hơn bình thường."],
    ["Xe ô tô dẫn động cầu trước khác cầu sau ở điểm nào?", "Bánh trước vừa kéo xe vừa dẫn hướng; cầu sau bánh sau kéo", "Hai loại hoàn toàn giống hệt nhau", "Cầu trước không có bánh dẫn hướng", "Xe dẫn động bốn bánh (4WD, AWD) bám đường tốt hơn khi đi đường xấu."],
    ["Hệ thống điều hoà trên ô tô ngoài làm mát còn có tác dụng gì?", "Sấy khô kính, lọc bụi giúp lái xe quan sát và thoải mái", "Làm tăng công suất động cơ xe", "Thay thế hệ thống sưởi ghế ngồi", "Bật điều hoà hợp lí và bảo dưỡng lọc gió giúp tiết kiệm nhiên liệu."],
    ["Khí thải ô tô gây ô nhiễm môi trường và xử lí bằng cách nào?", "Dùng bộ xúc tác, lọc bụi và nhiên liệu sạch hơn", "Không có cách nào giảm khí thải ô tô", "Tháo bỏ ống xả cho xe nhẹ hơn", "Tiêu chuẩn khí thải Euro ngày càng khắt khe buộc hãng xe cải tiến động cơ."],
    ["Đỗ xe an toàn trên đường dốc cần thực hiện điều gì?", "Kéo phanh tay, về số phù hợp, chèn bánh nếu cần thiết", "Chỉ tắt máy là xe tự đứng yên", "Để xe ở số mo và không kéo phanh", "Phanh tay (phanh đỗ) giữ xe đứng yên độc lập với phanh chân."],
    ["Người lái xe cần làm gì khi tham gia giao thông lúc trời mưa lớn?", "Giảm tốc độ, bật đèn, tăng khoảng cách, tránh vùng ngập sâu", "Chạy nhanh qua vùng ngập để xe khỏi chết máy", "Tắt hết đèn xe cho đỡ chói", "Xe chạy qua vùng ngập sâu dễ bị thuỷ kích làm hỏng động cơ nghiêm trọng."]
  ];
  var cn11ck7P = [
    ["Li hợp", "Nối, ngắt truyền động động cơ – hộp số"],
    ["Hộp số", "Đổi tỉ số truyền và chiều quay bánh xe"],
    ["Vi sai", "Cho hai bánh chủ động quay lệch tốc khi rẽ"],
    ["Hệ thống phanh ABS", "Chống bó cứng bánh khi phanh gấp"],
    ["Hệ thống treo", "Giảm chấn động từ đường lên khung xe"],
    ["Ắc quy", "Cấp điện khởi động và nuôi thiết bị điện"],
    ["Túi khí, dây an toàn", "Bảo vệ người ngồi khi va chạm"],
    ["Bộ xúc tác", "Xử lí giảm khí thải độc hại của ô tô"]
  ];
  var cn11cdck1F = [
    ["Dự án nghiên cứu kĩ thuật cơ khí bắt đầu từ bước nào?", "Xác định vấn đề, nhu cầu thực tiễn cần giải quyết", "Chế tạo ngay sản phẩm hoàn chỉnh", "Viết báo cáo tổng kết dự án", "Vấn đề rõ ràng, khả thi là nền tảng cho toàn bộ dự án nghiên cứu."],
    ["Mục tiêu của dự án nghiên cứu cơ khí cần đáp ứng tiêu chí nào?", "Cụ thể, đo được, khả thi và có thời hạn rõ ràng", "Càng chung chung càng dễ thực hiện", "Không cần tiêu chí đánh giá nào", "Mục tiêu tốt giúp nhóm dự án biết đích đến và cách kiểm chứng kết quả."],
    ["Nghiên cứu lí thuyết trong dự án cơ khí gồm việc gì?", "Tra cứu tài liệu, nguyên lí khoa học liên quan tới sản phẩm", "Chỉ phỏng đoán không cần tài liệu", "Sao chép nguyên một sản phẩm có sẵn", "Nghiên cứu lí thuyết giúp tránh lặp lại sai lầm và chọn giải pháp đúng cơ sở."],
    ["Đề xuất giải pháp kĩ thuật trong dự án cần làm thế nào?", "Đưa nhiều phương án, so sánh ưu nhược để chọn phương án tốt", "Chọn ngay phương án đầu tiên nghĩ ra", "Không cần so sánh các phương án", "Ma trận tiêu chí giúp chọn phương án khách quan theo công năng, chi phí, an toàn."],
    ["Thiết kế sản phẩm dự án cơ khí thể hiện qua tài liệu nào?", "Bản vẽ, mô hình và thuyết minh tính toán thiết kế", "Chỉ một đoạn mô tả bằng lời nói", "Chỉ ảnh chụp sản phẩm tương tự", "Bản vẽ chi tiết là căn cứ để chế tạo và lắp ráp sản phẩm của dự án."],
    ["Chế tạo thử (prototype) trong dự án có vai trò gì?", "Hiện thực hoá thiết kế để thử nghiệm, phát hiện lỗi cần sửa", "Là sản phẩm bán ra thị trường ngay", "Chỉ để trưng bày trong buổi báo cáo", "Nguyên mẫu thử có thể đơn giản, rẻ, miễn kiểm chứng được ý tưởng cốt lõi."],
    ["Thử nghiệm sản phẩm dự án cần thực hiện thế nào?", "Đo, quan sát theo kế hoạch, ghi số liệu khách quan, lặp lại", "Chỉ thử một lần rồi kết luận ngay", "Không cần ghi chép số liệu thử nghiệm", "Số liệu thử nghiệm là bằng chứng khoa học cho kết luận của dự án."],
    ["Khi kết quả thử nghiệm không đạt yêu cầu, nhóm dự án cần làm gì?", "Phân tích nguyên nhân, sửa thiết kế và thử lại", "Bỏ qua và vẫn báo cáo là thành công", "Huỷ toàn bộ dự án ngay lập tức", "Chu trình thiết kế – thử – sửa lặp lại là bản chất của nghiên cứu kĩ thuật."],
    ["Báo cáo nghiên cứu kĩ thuật cần có cấu trúc nào?", "Đặt vấn đề, phương pháp, kết quả, thảo luận và kết luận", "Chỉ gồm ảnh chụp sản phẩm cuối cùng", "Chỉ viết cảm nghĩ của nhóm thực hiện", "Báo cáo rõ ràng giúp người khác hiểu, đánh giá và tiếp tục phát triển dự án."],
    ["Trình bày, bảo vệ dự án trước hội đồng cần chuẩn bị gì?", "Sản phẩm, poster, số liệu và lập luận phản biện", "Chỉ cần thuộc lòng bài thuyết trình", "Không cần sản phẩm minh hoạ thực tế", "Trả lời phản biện tốt cho thấy nhóm hiểu sâu sản phẩm do mình tạo ra."],
    ["Tiêu chí đánh giá sản phẩm dự án cơ khí gồm những gì?", "Hiệu quả, sáng tạo, an toàn, chi phí và khả năng ứng dụng", "Chỉ đánh giá hình thức đẹp hay xấu", "Chỉ đánh giá theo cảm tình của giám khảo", "Sản phẩm dự án học sinh được chấm theo rubric công bố trước."],
    ["Phân công công việc trong nhóm dự án cần theo nguyên tắc nào?", "Theo năng lực thành viên, có kế hoạch, kiểm tra tiến độ", "Một người làm hết, còn lại đứng xem", "Không cần phân công, ai thích làm gì thì làm", "Làm việc nhóm hiệu quả là kĩ năng quan trọng của kĩ sư tương lai."],
    ["Quản lí thời gian dự án nghiên cứu được thực hiện bằng công cụ nào?", "Kế hoạch tiến độ, bảng mốc thời gian và nhật kí dự án", "Làm việc tuỳ hứng không có kế hoạch", "Chỉ cần nhớ trong đầu là đủ", "Sơ đồ Gantt giúp nhóm theo dõi các mốc công việc của dự án trực quan."],
    ["Đạo đức nghiên cứu trong dự án học sinh yêu cầu điều gì?", "Trung thực số liệu, ghi rõ nguồn tham khảo, không sao chép", "Chỉnh sửa số liệu cho kết quả đẹp hơn", "Sao chép báo cáo của nhóm khác", "Trung thực là nguyên tắc tối thượng của nghiên cứu khoa học, kĩ thuật."],
    ["An toàn khi chế tạo sản phẩm dự án cơ khí cần chú ý gì?", "Dùng máy đúng kĩ thuật, có bảo hộ, người hướng dẫn", "Tự ý dùng máy cắt gọt không cần học", "Không cần đeo kính bảo hộ khi mài, khoan", "Xưởng thực hành trường học luôn có nội quy an toàn phải tuân thủ tuyệt đối."],
    ["Tính mới, tính sáng tạo của dự án cơ khí thể hiện ở đâu?", "Giải pháp khác biệt, cải tiến rõ so với sản phẩm đã có", "Sao chép y nguyên sản phẩm bán sẵn", "Chỉ thay đổi màu sơn của sản phẩm", "Sáng tạo có thể là cải tiến nhỏ nhưng giải quyết đúng vấn đề thực tiễn."],
    ["Đánh giá khả năng ứng dụng thực tế của sản phẩm dự án dựa vào đâu?", "Nhu cầu người dùng, chi phí chế tạo và độ bền khi sử dụng", "Chỉ dựa vào ý kiến của nhóm thực hiện", "Không cần thử với người dùng thật", "Sản phẩm giải quyết được vấn đề thật của đời sống sẽ có giá trị ứng dụng cao."],
    ["Hồ sơ dự án nghiên cứu kĩ thuật gồm những tài liệu nào?", "Kế hoạch, nhật kí, bản vẽ, số liệu thử và báo cáo tổng kết", "Chỉ gồm bài báo cáo cuối kì", "Chỉ gồm hoá đơn mua vật liệu", "Hồ sơ đầy đủ chứng minh quá trình làm việc nghiêm túc của nhóm dự án."],
    ["Sau khi hoàn thành dự án, bước cải tiến tiếp theo nhằm mục đích gì?", "Hoàn thiện sản phẩm hơn nữa dựa trên phản hồi và thử nghiệm", "Kết thúc vĩnh viễn không bao giờ sửa nữa", "Chỉ để kéo dài thời gian dự án", "Mọi sản phẩm kĩ thuật đều có thể cải tiến qua nhiều phiên bản."],
    ["Ví dụ chủ đề dự án cơ khí phù hợp học sinh là gì?", "Thiết bị thu gom rác, máy rửa tay, cơ cấu nâng hạ đơn giản", "Chế tạo động cơ máy bay phản lực", "Thiết kế cầu vượt sông lớn", "Chủ đề dự án cần vừa sức, gắn với vấn đề gần gũi ở trường học, địa phương."]
  ];
  var cn11cdck1P = [
    ["Xác định vấn đề", "Bước khởi đầu của dự án nghiên cứu"],
    ["Nguyên mẫu thử", "Hiện thực hoá thiết kế để thử nghiệm"],
    ["Sơ đồ Gantt", "Theo dõi tiến độ, mốc thời gian dự án"],
    ["Ma trận tiêu chí", "So sánh, chọn phương án thiết kế"],
    ["Nhật kí dự án", "Ghi quá trình, số liệu và quyết định"],
    ["Phản biện dự án", "Trả lời câu hỏi, bảo vệ kết quả nghiên cứu"],
    ["Trung thực số liệu", "Nguyên tắc đạo đức nghiên cứu khoa học"]
  ];
  var cn11cdck2F = [
    ["CAD là viết tắt của công nghệ nào?", "Thiết kế với sự trợ giúp của máy tính", "Chế tạo hoàn toàn bằng tay", "In ấn tài liệu văn phòng", "CAD giúp vẽ, dựng mô hình 3D và mô phỏng sản phẩm trước khi chế tạo."],
    ["CAM là công nghệ nào trong sản xuất cơ khí?", "Chế tạo với sự trợ giúp của máy tính, lập trình gia công", "Quay phim quảng cáo sản phẩm", "Quản lí nhân sự nhà máy", "CAM chuyển mô hình CAD thành chương trình điều khiển máy CNC."],
    ["CNC có nghĩa là gì?", "Điều khiển số bằng máy tính cho máy công cụ tự động", "Máy công cụ điều khiển hoàn toàn bằng tay", "Tên một loại vật liệu cơ khí mới", "Máy CNC gia công chính xác, lặp lại tốt và ít phụ thuộc tay nghề trực tiếp."],
    ["Chuỗi CAD/CAM-CNC hoạt động theo trình tự nào?", "Thiết kế CAD, lập trình CAM, gia công trên máy CNC", "Gia công trước rồi mới thiết kế sau", "Chỉ cần một khâu duy nhất là đủ", "Chuỗi số hoá liền mạch giúp rút ngắn thời gian từ ý tưởng tới sản phẩm."],
    ["Mô hình 3D trong CAD được dựng từ thao tác cơ bản nào?", "Phác thảo 2D rồi đùn, quay, cắt và bo góc khối", "Chỉ tô màu cho khối có sẵn", "Không cần phác thảo ban đầu", "Thiết kế tham số cho phép sửa kích thước và mô hình tự cập nhật."],
    ["G-code trong gia công CNC là gì?", "Ngôn ngữ lệnh điều khiển đường chạy dao và chế độ cắt", "Mã vạch in trên bao bì sản phẩm", "Tên hãng sản xuất máy CNC", "Chương trình CNC gồm nhiều câu lệnh G-code do phần mềm CAM sinh ra."],
    ["Máy CNC phay và máy CNC tiện khác nhau chủ yếu ở điểm nào?", "Phay: dao quay; tiện: phôi quay tròn gia công", "Hai loại máy hoàn toàn giống nhau", "Máy tiện CNC không có dao cắt", "Nhiều trung tâm gia công CNC kết hợp cả phay, khoan, tarô trong một máy."],
    ["Ưu điểm lớn nhất của gia công CNC so với máy thường là gì?", "Chính xác, lặp lại cao, gia công được hình dạng phức tạp", "Giá máy rẻ hơn nhiều máy thường", "Không cần người lập trình vận hành", "CNC đặc biệt hiệu quả khi sản xuất loạt chi tiết giống nhau."],
    ["Mô phỏng gia công trong CAM có tác dụng gì?", "Kiểm tra đường dao, phát hiện va chạm trước khi chạy thật", "Làm chương trình gia công dài hơn", "Không có tác dụng thực tế nào", "Mô phỏng giúp tránh hỏng dao, hỏng phôi và tai nạn trên máy thật."],
    ["Hệ toạ độ trên máy CNC dùng để làm gì?", "Xác định chính xác vị trí dao và phôi khi gia công", "Trang trí cho bảng điều khiển máy", "Đo nhiệt độ trong xưởng máy", "Lập trình viên phải khai báo gốc toạ độ phôi trước khi gia công."],
    ["Dao cụ trên máy CNC được thay tự động bằng bộ phận nào?", "Ổ dao (magazin) và cơ cấu thay dao tự động ATC", "Người thợ thay bằng tay từng lần", "Máy CNC chỉ dùng một dao duy nhất", "Thay dao tự động giúp một máy hoàn thành nhiều nguyên công liên tiếp."],
    ["Phần mềm CAD phổ biến trong thiết kế cơ khí gồm những tên nào?", "AutoCAD, SolidWorks, Inventor và Fusion 360", "Chỉ có phần mềm soạn thảo văn bản", "Chỉ có phần mềm chỉnh sửa ảnh", "Học sinh có thể bắt đầu với các phần mềm CAD 3D chạy trên trình duyệt."],
    ["Tệp dữ liệu trao đổi giữa CAD và CAM thường ở định dạng nào?", "STEP, IGES hoặc tệp gốc của phần mềm thiết kế", "Tệp nhạc và tệp video giải trí", "Chỉ có bản in giấy scan lại", "Định dạng trung gian giúp các phần mềm khác hãng vẫn đọc được mô hình."],
    ["Gia công CNC 5 trục có khả năng vượt trội nào?", "Dao tiếp cận phôi từ nhiều hướng, gia công mặt cong phức tạp", "Chỉ gia công được mặt phẳng đơn giản", "Không khác gì máy 3 trục thông thường", "Máy 5 trục dùng làm cánh tuabin, khuôn mẫu và chi tiết hàng không phức tạp."],
    ["Kiểm tra sản phẩm sau gia công CNC được thực hiện thế nào?", "Đo bằng thước, panme, máy đo 3D CMM đối chiếu bản vẽ", "Chỉ nhìn bằng mắt thường là đủ", "Không cần kiểm tra sau gia công", "Máy đo toạ độ CMM đo chính xác hàng nghìn điểm trên bề mặt chi tiết."],
    ["Người vận hành máy CNC cần kĩ năng chính nào?", "Đọc bản vẽ, lập trình, cài đặt máy và kiểm tra sản phẩm", "Chỉ cần bấm nút khởi động máy", "Không cần biết về dao cụ, vật liệu", "Kĩ thuật viên CNC là nghề có nhu cầu tuyển dụng cao trong nhà máy hiện đại."],
    ["Sản xuất có CAD/CAM-CNC giúp giảm thời gian đưa sản phẩm ra thị trường nhờ đâu?", "Thiết kế, sửa đổi và gia công đều thực hiện trên dữ liệu số", "Nhờ bỏ qua khâu kiểm tra chất lượng", "Nhờ tăng số công nhân làm thủ công", "Sửa thiết kế trên máy tính nhanh và rẻ hơn nhiều so với làm lại mẫu thật."],
    ["Khác biệt giữa in 3D và gia công CNC về nguyên lí tạo hình là gì?", "In 3D đắp thêm vật liệu; CNC cắt bỏ vật liệu thừa", "Hai công nghệ có nguyên lí giống hệt nhau", "CNC đắp vật liệu theo từng lớp", "Hai công nghệ bổ sung cho nhau trong tạo mẫu và chế tạo hiện đại."],
    ["An toàn khi vận hành máy CNC cần tuân thủ điều gì?", "Đóng cửa che chắn, không thò tay vào vùng cắt khi máy chạy", "Mở cửa máy và giữ phôi bằng tay khi gia công", "Đứng sát vùng cắt để quan sát rõ hơn", "Máy CNC quay tốc độ cao nên che chắn an toàn là bộ phận bắt buộc."],
    ["Ứng dụng CAD/CAM-CNC trong y tế có ví dụ nào?", "Chế tạo răng giả, khớp nhân tạo vừa khít từng bệnh nhân", "Chỉ dùng để in hồ sơ bệnh án", "Không ứng dụng được trong y tế", "Dữ liệu chụp CT được chuyển thành mô hình CAD để chế tạo chi tiết cấy ghép."],
    ["Xu hướng tích hợp CAD/CAM với trí tuệ nhân tạo mang lại điều gì?", "Tự tối ưu đường dao, dự báo mòn dao và lỗi gia công", "Làm máy CNC chạy chậm lại rõ rệt", "Loại bỏ hoàn toàn dữ liệu số hoá", "Nhà máy thông minh dùng AI phân tích dữ liệu cảm biến từ máy CNC theo thời gian thực."],
    ["Thiết kế cho chế tạo (DFM) trong môi trường CAD/CAM nghĩa là gì?", "Thiết kế sao cho dễ gia công, ít tốn kém ngay từ đầu", "Thiết kế càng phức tạp càng tốt", "Không quan tâm tới khả năng chế tạo", "DFM giúp tránh chi tiết đẹp trên màn hình nhưng không thể sản xuất thực tế."]
  ];
  var cn11cdck2P = [
    ["CAD", "Thiết kế bằng máy tính, mô hình 3D"],
    ["CAM", "Lập trình gia công bằng máy tính"],
    ["CNC", "Điều khiển số bằng máy tính"],
    ["G-code", "Ngôn ngữ lệnh chạy dao cho máy CNC"],
    ["Thay dao tự động ATC", "Đổi dao nhanh từ ổ chứa dao"],
    ["Máy đo CMM", "Đo toạ độ 3D kiểm tra chi tiết"],
    ["Gia công 5 trục", "Gia công mặt cong phức tạp nhiều hướng"]
  ];
  var cn11cdck3F = [
    ["In 3D thuộc nhóm công nghệ chế tạo nào?", "Chế tạo bồi đắp, đắp vật liệu theo từng lớp mỏng", "Gia công cắt gọt bỏ vật liệu", "Gia công đúc rót khuôn một lần", "In 3D còn gọi là chế tạo cộng, ngược nguyên lí với cắt gọt truyền thống."],
    ["Quy trình in 3D diễn ra theo các bước chính nào?", "Thiết kế CAD, cắt lớp, in từng lớp, xử lí hoàn thiện", "Đúc khuôn rồi rót kim loại lỏng", "Cắt phôi trên máy tiện trước", "Phần mềm cắt lớp (slicer) chuyển mô hình 3D thành lệnh cho máy in."],
    ["Tệp STL có vai trò gì trong in 3D?", "Lưu bề mặt mô hình 3D dạng lưới tam giác cho cắt lớp", "Là vật liệu nhựa dùng để in", "Là tên một hãng máy in 3D", "Slicer đọc tệp STL hoặc 3MF rồi sinh G-code cho máy in 3D."],
    ["Công nghệ in 3D FDM hoạt động theo nguyên lí nào?", "Đùn sợi nhựa nóng chảy, đắp từng lớp đông cứng dần", "Chiếu tia laser làm đông nhựa lỏng", "Phun bột kim loại ở nhiệt độ cao", "FDM là công nghệ in 3D phổ biến và rẻ nhất cho học sinh, gia đình."],
    ["Vật liệu sợi nhựa PLA có đặc điểm gì trong in 3D?", "Dễ in, ít cong vênh, nguồn gốc sinh học, độ bền vừa", "Chịu nhiệt rất cao như kim loại", "Không thể dùng cho máy FDM", "PLA là vật liệu in 3D thân thiện cho người mới bắt đầu học in."],
    ["Nhựa ABS trong in 3D khác PLA ở điểm nào nổi bật?", "Bền và chịu nhiệt tốt hơn nhưng dễ cong vênh, có mùi khi in", "Mềm dẻo như cao su hoàn toàn", "Tan ngay trong nước lạnh", "In ABS cần buồng in kín và thông gió tốt hơn so với PLA."],
    ["Công nghệ in 3D SLA dùng nguồn năng lượng nào để tạo hình?", "Tia laser hoặc ánh sáng UV làm đông cứng nhựa lỏng nhạy sáng", "Đầu đùn sợi nhựa nóng chảy", "Dao cắt quay tốc độ cao", "SLA cho chi tiết rất mịn, chính xác, dùng làm mẫu răng và trang sức."],
    ["In 3D bằng bột (SLS) có đặc điểm tạo hình thế nào?", "Laser kết khối bột từng lớp, không cần kết cấu đỡ riêng", "Đùn sợi nhựa qua đầu phun nhỏ", "Rót nhựa lỏng vào khuôn silicon", "SLS in được chi tiết cơ khí bằng nylon và cả bột kim loại ở công nghệ cao hơn."],
    ["Kết cấu đỡ (support) trong in 3D có vai trò gì?", "Đỡ phần mô hình nhô ra, treo lơ lửng khi in từng lớp", "Làm sản phẩm in nặng thêm vô ích", "Trang trí cho sản phẩm in 3D", "Sau khi in xong, support được bóc bỏ và bề mặt được xử lí nhẵn."],
    ["Độ dày lớp in (layer height) ảnh hưởng thế nào tới sản phẩm?", "Lớp càng mỏng bề mặt càng mịn nhưng in càng lâu", "Lớp dày cho bề mặt mịn nhất", "Không ảnh hưởng gì tới thời gian in", "Chọn độ dày lớp là cân đối giữa chất lượng bề mặt và thời gian in."],
    ["Tỉ lệ điền đặc (infill) trong in 3D quyết định điều gì?", "Độ đặc ruột, độ bền và lượng vật liệu của sản phẩm in", "Màu sắc của sản phẩm in ra", "Tốc độ quạt làm mát máy in", "Sản phẩm chịu lực cần infill cao; mô hình trưng bày chỉ cần infill thấp."],
    ["In 3D được ứng dụng tạo mẫu nhanh như thế nào?", "In mẫu thử trong vài giờ để kiểm tra thiết kế trước sản xuất", "Thay thế mọi dây chuyền sản xuất hàng loạt", "Chỉ in được đồ chơi trẻ em", "Tạo mẫu nhanh là ứng dụng đầu tiên và phổ biến nhất của in 3D."],
    ["Ứng dụng in 3D trong y tế có ví dụ nổi bật nào?", "Mô hình giải phẫu, răng, tay chân giả theo bệnh nhân", "In thuốc uống dạng viên nén hàng loạt", "Không có ứng dụng y tế nào", "In 3D cá nhân hoá giúp sản phẩm y tế vừa khít cơ thể từng người bệnh."],
    ["In 3D trong xây dựng có khả năng gì đang được thử nghiệm?", "In từng lớp bê tông tạo tường, nhà ở theo thiết kế số", "In toàn bộ cầu thép trong một lần", "Chỉ in mô hình nhà thu nhỏ", "Nhà in 3D giúp giảm nhân công, rút ngắn thời gian thi công phần thô."],
    ["Hạn chế chính của in 3D so với sản xuất hàng loạt truyền thống là gì?", "Chậm, vật liệu hạn chế, giá cao khi in số lượng nhiều", "Không in được bất kì hình dạng nào", "Sản phẩm in không có độ bền nào", "In 3D mạnh ở sản phẩm đơn chiếc, cá nhân hoá và hình dạng phức tạp."],
    ["Xử lí sau in (hậu xử lí) sản phẩm in 3D gồm công việc gì?", "Bóc support, mài nhẵn, sơn và lắp ghép các phần in riêng", "Đem sản phẩm đi nung chảy lại hoàn toàn", "Không cần làm gì thêm sau in", "Hậu xử lí quyết định lớn tới tính thẩm mĩ của sản phẩm in 3D."],
    ["Hiện tượng cong vênh khi in 3D FDM xảy ra do đâu?", "Nhựa co ngót không đều khi nguội, bám bàn in không tốt", "Do máy in chạy quá chậm", "Do mô hình thiết kế quá nhỏ", "Giữ bàn in nóng và dùng keo bám giúp giảm cong vênh cho sản phẩm in."],
    ["In 3D kim loại được ứng dụng ở lĩnh vực nào cao cấp?", "Hàng không, y tế chế tạo chi tiết nhẹ, phức tạp, chịu lực", "In đồ dùng nhà bếp giá rẻ hàng loạt", "In giấy tờ văn phòng số lượng lớn", "Chi tiết kim loại in 3D thường phải gia công tinh lại sau khi in."],
    ["Học sinh học in 3D cần rèn luyện năng lực nào?", "Thiết kế CAD, tư duy không gian và kiên nhẫn thử, sửa", "Chỉ cần biết bấm nút in là đủ", "Không cần học phần mềm thiết kế", "In 3D là cửa ngõ thực hành STEM hấp dẫn cho học sinh phổ thông."],
    ["Tương lai của công nghệ in 3D hướng tới điều gì?", "In nhanh hơn, nhiều vật liệu, in mô sinh học và nhà ở lớn", "Thu hẹp chỉ in đồ chơi nhựa nhỏ", "Bị thay thế hoàn toàn bởi đúc truyền thống", "In 4D với vật liệu biến đổi hình dạng theo môi trường đang được nghiên cứu."]
  ];
  var cn11cdck3P = [
    ["Chế tạo bồi đắp", "Đắp vật liệu theo từng lớp mỏng"],
    ["FDM", "Đùn sợi nhựa nóng chảy đắp lớp"],
    ["SLA", "Laser, UV làm đông nhựa lỏng nhạy sáng"],
    ["Sợi PLA", "Nhựa dễ in, thân thiện cho người mới"],
    ["Support", "Kết cấu đỡ phần nhô ra khi in"],
    ["Infill", "Tỉ lệ điền đặc ruột sản phẩm in"],
    ["Slicer", "Phần mềm cắt lớp, sinh G-code in 3D"]
  ];
  var CN11 = [
    TP("cn11-cn1", "🐄", "Chăn nuôi — Chương I: Giới thiệu chung về chăn nuôi", "Bài 1–2 • Vai trò, triển vọng chăn nuôi; vật nuôi và phân loại vật nuôi", KP(cn11cn1F, cn11cn1P), KN(cn11cn1F, cn11cn1P, "Công nghệ")),
    TP("cn11-cn2", "🧬", "Chăn nuôi — Chương II: Công nghệ giống vật nuôi", "Bài 3–6 • Chọn lọc, nhân giống, ứng dụng công nghệ sinh học trong chọn giống", KP(cn11cn2F, cn11cn2P), KN(cn11cn2F, cn11cn2P, "Công nghệ")),
    TP("cn11-cn3", "🌽", "Chăn nuôi — Chương III: Công nghệ thức ăn chăn nuôi", "Bài 7–10 • Nhu cầu dinh dưỡng, sản xuất và chế biến thức ăn chăn nuôi", KP(cn11cn3F, cn11cn3P), KN(cn11cn3F, cn11cn3P, "Công nghệ")),
    TP("cn11-cn4", "💉", "Chăn nuôi — Chương IV: Phòng, trị bệnh cho vật nuôi", "Bài 11–15 • Bệnh ở vật nuôi, phòng trị bệnh; bệnh phổ biến ở gia súc, gia cầm, thuỷ sản", KP(cn11cn4F, cn11cn4P), KN(cn11cn4F, cn11cn4P, "Công nghệ")),
    TP("cn11-cn5", "🏠", "Chăn nuôi — Chương V: Công nghệ chăn nuôi", "Bài 16–20 • Quy trình nuôi dưỡng lợn, gia cầm, bò; hệ thống chuồng trại", KP(cn11cn5F, cn11cn5P), KN(cn11cn5F, cn11cn5P, "Công nghệ")),
    TP("cn11-cn6", "♻️", "Chăn nuôi — Chương VI: Bảo vệ môi trường trong chăn nuôi", "Bài 21–22 • Chất thải chăn nuôi, biogas, bảo vệ môi trường nông thôn", KP(cn11cn6F, cn11cn6P), KN(cn11cn6F, cn11cn6P, "Công nghệ")),
    TP("cn11-cdcn1", "🔬", "Chăn nuôi — Chuyên đề 1: Công nghệ sinh học trong chăn nuôi", "Chuyên đề Chăn nuôi • Cấy truyền phôi, thụ tinh nhân tạo", KP(cn11cdcn1F, cn11cdcn1P), KN(cn11cdcn1F, cn11cdcn1P, "Công nghệ")),
    TP("cn11-cdcn2", "🐶", "Chăn nuôi — Chuyên đề 2: Nuôi dưỡng và chăm sóc động vật cảnh", "Chuyên đề Chăn nuôi • Chó, mèo cảnh: dinh dưỡng, chăm sóc, phòng bệnh", KP(cn11cdcn2F, cn11cdcn2P), KN(cn11cdcn2F, cn11cdcn2P, "Công nghệ")),
    TP("cn11-cdcn3", "✅", "Chăn nuôi — Chuyên đề 3: Chăn nuôi theo tiêu chuẩn VietGAP", "Chuyên đề Chăn nuôi • Tiêu chí VietGAP, truy xuất nguồn gốc, an toàn thực phẩm", KP(cn11cdcn3F, cn11cdcn3P), KN(cn11cdcn3F, cn11cdcn3P, "Công nghệ")),
    TP("cn11-ck1", "🔧", "Cơ khí — Chương I: Giới thiệu chung về cơ khí chế tạo", "Bài 1–2 • Khái quát cơ khí chế tạo, ngành nghề cơ khí", KP(cn11ck1F, cn11ck1P), KN(cn11ck1F, cn11ck1P, "Công nghệ")),
    TP("cn11-ck2", "🪨", "Cơ khí — Chương II: Vật liệu cơ khí", "Bài 3–6 • Vật liệu kim loại và hợp kim, vật liệu phi kim loại, tính chất vật liệu", KP(cn11ck2F, cn11ck2P), KN(cn11ck2F, cn11ck2P, "Công nghệ")),
    TP("cn11-ck3", "⚙️", "Cơ khí — Chương III: Các phương pháp gia công cơ khí", "Bài 7–10 • Gia công không phoi, gia công cắt gọt: tiện, phay, bào, khoan, mài", KP(cn11ck3F, cn11ck3P), KN(cn11ck3F, cn11ck3P, "Công nghệ")),
    TP("cn11-ck4", "🏭", "Cơ khí — Chương IV: Sản xuất cơ khí", "Bài 11–14 • Quy trình sản xuất cơ khí, tự động hoá, robot công nghiệp", KP(cn11ck4F, cn11ck4P), KN(cn11ck4F, cn11ck4P, "Công nghệ")),
    TP("cn11-ck5", "🚜", "Cơ khí — Chương V: Giới thiệu chung về cơ khí động lực", "Bài 15–16 • Hệ thống cơ khí động lực, máy cơ khí động lực", KP(cn11ck5F, cn11ck5P), KN(cn11ck5F, cn11ck5P, "Công nghệ")),
    TP("cn11-ck6", "🔥", "Cơ khí — Chương VI: Động cơ đốt trong", "Bài 17–20 • Nguyên lí, cấu tạo, phân loại động cơ đốt trong; động cơ xăng/điêzen", KP(cn11ck6F, cn11ck6P), KN(cn11ck6F, cn11ck6P, "Công nghệ")),
    TP("cn11-ck7", "🚗", "Cơ khí — Chương VII: Ô tô", "Bài 21–25 • Cấu tạo chung của ô tô, sử dụng và bảo dưỡng, an toàn giao thông", KP(cn11ck7F, cn11ck7P), KN(cn11ck7F, cn11ck7P, "Công nghệ")),
    TP("cn11-cdck1", "📐", "Cơ khí — Chuyên đề 1: Dự án nghiên cứu lĩnh vực kĩ thuật cơ khí", "Chuyên đề Cơ khí • Quy trình dự án, báo cáo nghiên cứu kĩ thuật", KP(cn11cdck1F, cn11cdck1P), KN(cn11cdck1F, cn11cdck1P, "Công nghệ")),
    TP("cn11-cdck2", "🖥️", "Cơ khí — Chuyên đề 2: Công nghệ CAD/CAM-CNC", "Chuyên đề Cơ khí • Thiết kế CAD, chế tạo CAM, máy CNC", KP(cn11cdck2F, cn11cdck2P), KN(cn11cdck2F, cn11cdck2P, "Công nghệ")),
    TP("cn11-cdck3", "🖨️", "Cơ khí — Chuyên đề 3: Công nghệ in 3D", "Chuyên đề Cơ khí • Nguyên lí in 3D, vật liệu in, ứng dụng", KP(cn11cdck3F, cn11cdck3P), KN(cn11cdck3F, cn11cdck3P, "Công nghệ"))
  ];
  /* ---------- ghi chú công thức / hệ thống cho các chủ đề tính toán ---------- */
  try {
    var NOTES11 = {
      "m11-c1": ["sin²x + cos²x = 1; tan x = sin x / cos x; cot x = cos x / sin x.", "Góc đặc biệt: sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3; sin 45° = cos 45° = √2/2; sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3.", "PT cơ bản: sin x = sin α ⇔ x = α + k360° hoặc x = 180° − α + k360°; cos x = cos α ⇔ x = ±α + k360°; tan x = tan α ⇔ x = α + k180° (k ∈ ℤ)."],
      "m11-c2": ["Cấp số cộng: u_n = u_1 + (n − 1)d; S_n = n(u_1 + u_n)/2.", "Cấp số nhân: u_n = u_1·q^(n − 1); S_n = u_1(q^n − 1)/(q − 1) (q ≠ 1).", "Tính chất: CSC: u_k = (u_(k−1) + u_(k+1))/2; CSN: u_k² = u_(k−1)·u_(k+1)."],
      "m11-c3": ["Số trung bình của mẫu ghép nhóm: x̄ = (Σ m_i x_i)/(Σ m_i) với x_i là giá trị đại diện (trung điểm) của nhóm i.", "Tứ phân vị của mẫu ghép nhóm xác định bằng nội suy trong nhóm chứa tứ phân vị.", "Mốt là giá trị (nhóm) có tần số lớn nhất."],
      "m11-c5": ["Giới hạn dãy số: lim q^n = 0 khi |q| < 1; lim (1/n) = 0; lim c/n^k = 0 (k > 0).", "Hàm liên tục tại x_0: lim f(x) khi x → x_0 bằng f(x_0).", "Định lí giá trị trung gian: hàm liên tục trên [a; b] và f(a)·f(b) < 0 thì có c ∈ (a; b) sao cho f(c) = 0."],
      "m11-c6": ["Lũy thừa: a^m · a^n = a^(m+n); (a^m)^n = a^(mn); a^(−n) = 1/a^n.", "Logarit: log_a b = c ⇔ a^c = b (0 < a ≠ 1, b > 0); log_a (xy) = log_a x + log_a y; log_a (x/y) = log_a x − log_a y; log_a x^n = n·log_a x; đổi cơ số: log_a b = ln b / ln a.", "Hàm mũ y = a^x đồng biến khi a > 1, nghịch biến khi 0 < a < 1."],
      "m11-c8": ["Xác suất: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).", "Nếu A, B xung khắc: P(A ∪ B) = P(A) + P(B).", "Nếu A, B độc lập: P(A ∩ B) = P(A)·P(B).", "Biến cố đối: P(Ā) = 1 − P(A)."],
      "m11-c9": ["Đạo hàm cơ bản: (x^n)' = n·x^(n−1); (sin x)' = cos x; (cos x)' = −sin x; (e^x)' = e^x; (a^x)' = a^x·ln a; (ln x)' = 1/x (x > 0); (log_a x)' = 1/(x ln a).", "Quy tắc: (u ± v)' = u' ± v'; (u·v)' = u'v + uv'; (u/v)' = (u'v − uv')/v² (v ≠ 0).", "Đạo hàm cấp hai f'' là đạo hàm của f'."],
      "vl11-c1": ["Dao động điều hoà: x = A·cos(ωt + φ); ω = 2π/T = 2πf (rad/s).", "Vận tốc: v = −Aω·sin(ωt + φ), v_max = Aω.", "Gia tốc: a = −ω²x, a_max = Aω².", "Con lắc lò xo: T = 2π√(m/k).", "Con lắc đơn: T = 2π√(l/g).", "Động năng W_đ = (1/2)mv²; thế năng đàn hồi W_t = (1/2)kx²; cơ năng W = (1/2)kA² = (1/2)mω²A² bảo toàn (khi không ma sát)."],
      "vl11-c2": ["Sóng cơ: λ = v·T = v/f.", "Hai điểm trên phương truyền sóng cách nhau d: cùng pha khi d = kλ; ngược pha khi d = (k + 1/2)λ.", "Giao thoa: cực đại khi d₂ − d₁ = kλ; cực tiểu khi d₂ − d₁ = (k + 1/2)λ.", "Sóng dừng: hai nút (hoặc hai bụng) liên tiếp cách nhau λ/2; nút–bụng kề nhau cách λ/4."],
      "vl11-c3": ["Lực Coulomb: F = k·|q₁q₂|/r² với k = 9·10⁹ N·m²/C².", "Cường độ điện trường: E = F/q; điện trường đều: E = U/d.", "Điện thế: V = A/q; hiệu điện thế U = V_M − V_N; công của lực điện A = qU.", "Tụ điện: C = Q/U (đơn vị fara, F); năng lượng tụ W = (1/2)QU = (1/2)CU²."],
      "vl11-c4": ["Cường độ dòng điện: I = Δq/Δt.", "Định luật Ohm cho đoạn mạch: I = U/R; cho toàn mạch: 𝓔 = I(R + r), I = 𝓔/(R + r).", "Điện trở dây dẫn: R = ρl/S.", "Công suất: P = U·I = I²R = U²/R.", "Năng lượng điện: A = P·t.", "Nhiệt lượng Joule–Lenz: Q = I²Rt."]
    };
    if (window.__MATH_KNOWLEDGE_NOTES) Object.assign(window.__MATH_KNOWLEDGE_NOTES, NOTES11);
    else window.__MATH_KNOWLEDGE_NOTES = NOTES11;
  } catch (e) {}

  /* ---------- đăng kí LỚP 11 vào engine ---------- */
  GRADES[11] = {
    label: "Lớp 11",
    subjects: [
      { id: "g11-math", emoji: "➗", name: "Toán", desc: "Lượng giác, dãy số, giới hạn, mũ – lôgarit, xác suất, đạo hàm", cls: "c-coral", topics: MATH11 },
      { id: "g11-nv", emoji: "📖", name: "Ngữ văn", desc: "Vợ nhặt, Chí Phèo, Nguyễn Du, Hamlet và văn bản thông tin", cls: "c-grape", topics: NV11 },
      { id: "g11-eng", emoji: "🇬🇧", name: "Tiếng Anh", desc: "Global Success: 10 units — từ vựng và ngữ pháp", cls: "c-sky", topics: ENG11 },
      { id: "g11-vl", emoji: "🔬", name: "Vật lí", desc: "Dao động, sóng, điện trường, dòng điện và mạch điện", cls: "c-teal", topics: VL11 },
      { id: "g11-hh", emoji: "⚗️", name: "Hoá học", desc: "Cân bằng hoá học, nitrogen – sulfur, hoá học hữu cơ", cls: "c-leaf", topics: HH11 },
      { id: "g11-sh", emoji: "🧬", name: "Sinh học", desc: "Phần ba — Sinh học cơ thể: trao đổi chất, cảm ứng, sinh trưởng, sinh sản", cls: "c-pink", topics: SH11 },
      { id: "g11-ls", emoji: "🏛️", name: "Lịch sử", desc: "Cách mạng tư sản, CNXH, cải cách Việt Nam, chủ quyền Biển Đông", cls: "c-brown", topics: LS11 },
      { id: "g11-dl", emoji: "🗺️", name: "Địa lí", desc: "Địa lí khu vực và quốc gia: EU, ASEAN, Hoa Kỳ, Nga, Nhật Bản, Trung Quốc", cls: "c-sun", topics: DL11 },
      { id: "g11-ktpl", emoji: "⚖️", name: "Giáo dục kinh tế và pháp luật", desc: "Cung – cầu, lạm phát, việc làm, quyền bình đẳng và các quyền tự do", cls: "c-slate", topics: KTPL11 },
      { id: "g11-tin", emoji: "💻", name: "Tin học", desc: "CSDL và SQL, lập trình (KHMT), phần mềm ảnh – video (THƯD)", cls: "c-grape", topics: TIN11 },
      { id: "g11-cn", emoji: "🌾", name: "Công nghệ", desc: "Định hướng Chăn nuôi và Cơ khí — chế tạo, động cơ, ô tô", cls: "c-coral", topics: CN11 }
    ]
  };

  /* ---------- BƯỚC 2 (2026-10-14): dựng tầng nâng cao "🧠 Thử thách tư duy"
     cho Lớp 11 bằng chính bộ dựng Phase B của engine — cùng đường đăng ký
     như Lớp 1–6 (bộ dựng thu hoạch dữ kiện từ pools của từng chủ đề rồi
     sinh advPools: suy luận ngược, tìm câu sai, đúng/sai, điền trống…).
     KHÔNG gọi __phaseCompleteGrade: khối đó ghi đè t.knowledge bằng dữ
     kiện thu hoạch, sẽ làm mỏng hộp "Kiến thức cần ghi nhớ" của Lớp 11
     vốn được đăng ký trực tiếp bằng KN() ở trên. ---------- */
  if (typeof window.__phaseBProcessGrade === "function") window.__phaseBProcessGrade(11);

  /* ---------- làm mới giao diện giống các khối lớp trong master ---------- */
  try {
    if (typeof renderGradeTabs === "function") {
      renderGradeTabs("login-grades", (typeof loginGrade !== "undefined" && loginGrade) || 11);
      var note = document.querySelector("#login-screen .login-note");
      if (note) note.innerHTML = "Game đã có đủ Lớp 1 đến Lớp 11. Lớp 12 đang được xây dựng tiếp.";
    }
    if (typeof profile !== "undefined" && profile && typeof renderSubjects === "function" && typeof currentGrade !== "undefined" && currentGrade === 11) renderSubjects();
    if (typeof renderProfileBar === "function") renderProfileBar();
  } catch (e) {}
})();
