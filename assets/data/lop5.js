/* ================================================================
   GAME HỌC TẬP — FILE DỮ LIỆU RIÊNG LỚP 5 (assets/data/lop5.js)
   Dữ liệu Lớp 5 (gốc: block Lớp 5 của master).
   Tách nguyên văn từ bản master đã kiểm chứng (MD5 5f54145de040cb8cefc9eeb7cb915cd5);
   trang vỏ nạp động file này khi người chơi chọn Lớp 5.
   ================================================================ */

/* ============================================================
   LỚP 5 — Kết nối tri thức + Global Success (Toán Bài 1–75 theo
   12 chủ đề, Tiếng Việt theo mạch LTVC, Tiếng Anh Starter + 20
   Unit, Khoa học, Lịch sử & Địa lí, Đạo đức, Tin học, Công nghệ)
   Đăng kí vào GRADES[5]; chống lặp + nhãn số câu như Lớp 3, 4.
   ============================================================ */
"use strict";
function qSig5(q) {
  if (!q) return "?";
  var s = (q.prompt || "") + "|";
  try {
    if (q.visual) s += String(q.visual).replace(/<[^>]+>/g, " ");
    if (q.pairs) s += q.pairs.map(function (p) { return (p.l || p.a || "") + "=" + (p.r || p.b || ""); }).join(";");
    if (q.items) s += q.items.map(function (it) { return it.html || ""; }).join(";");
    if (q.rounds) s += q.rounds.map(function (r) { return String(r.visual || "").replace(/<[^>]+>/g, " "); }).join(";");
  } catch (e) {}
  s = s.replace(/Đáp án:\s*\?/g, "");
  return s.replace(/\s+/g, " ").trim().slice(0, 140);
}
/* ---------- Số thập phân: dùng số nguyên phần trăm để tránh lỗi làm tròn ---------- */
function decStr(h) { /* h = giá trị x100 (số nguyên) */
  var neg = h < 0; h = Math.abs(h);
  var ip = Math.floor(h / 100), fp = h % 100, s;
  if (fp === 0) s = fmtN(ip);
  else if (fp % 10 === 0) s = ip + "," + (fp / 10);
  else s = ip + "," + (fp < 10 ? "0" + fp : fp);
  return (neg ? "−" : "") + s;
}
function numStr5(x) { /* số có thể có ,5 */
  if (Math.abs(x - Math.round(x)) < 0.001) return fmtN(Math.round(x));
  return decStr(Math.round(x * 100));
}
function decOpts(h, n) {
  var seen = {}, out = [h]; seen[h] = 1;
  var deltas = [10, -10, 100, -100, 1, -1, 1000, -1000, 20, -20, 200, -200, 5, -5, 50, -50, 2, -2];
  var guard = 0;
  while (out.length < (n || 4) && guard++ < 300) {
    var d = h + pick(deltas) * pick([1, 1, 2]);
    if (d > 0 && !seen[d]) { seen[d] = 1; out.push(d); }
  }
  while (out.length < (n || 4)) { var r = h + rand(3, 900); if (!seen[r]) { seen[r] = 1; out.push(r); } }
  return shuffle(out);
}
function decMCQ(prompt, expr, ansH, explain) {
  var opts = decOpts(ansH, 4);
  var q = { prompt: prompt, visual: expr ? '<div class="expr">' + expr + "</div>" : "", options: opts.map(function (o) { return { html: '<span class="opt-num">' + decStr(o) + "</span>" }; }), answer: opts.indexOf(ansH), cols: 2 };
  if (explain) q.explain = explain;
  return q;
}
function decBlank(prompt, expr, ansH, explain) {
  var all = decOpts(ansH, 3);
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: prompt, blankText: decStr(ansH), explain: explain || null,
    visual: '<div class="expr">' + expr.replace("?", blankSlot()) + "</div>",
    options: all.map(function (o) { return { html: '<span class="opt-num">' + decStr(o) + "</span>" }; }), answer: all.indexOf(ansH), cols: 3 };
}
/* ---------- Phân số / hỗn số ---------- */
function gcd5(a, b) { while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function fr5(n, d) { var g = gcd5(n, d); n = Math.floor(n / g); d = Math.floor(d / g); return d === 1 ? String(n) : n + "/" + d; }
/* Toán hạng CÓ GIÁ TRỊ NGUYÊN thì viết số nguyên (n/n -> 1, 6/2 -> 3) trong câu tính
   phân số (đợt sửa phân số 2026-10-15); toán hạng không nguyên giữ nguyên dạng. */
function opFrac5(n, d) { return n % d === 0 ? String(n / d) : n + "/" + d; }
function frWrongs5(n, d) {
  var g = gcd5(n, d); n = Math.floor(n / g); d = Math.floor(d / g);
  var ans = fr5(n, d), out = [], seen = {}; seen[ans] = 1;
  var cands = [fr5(n + 1, d), fr5(n, d + 1), fr5(n + d, d), d > 2 ? fr5(n, d - 1) : fr5(n + 2, d), n !== d ? fr5(d, n) : fr5(n + 1, d + 1), fr5(n * 2, d * 2), fr5(Math.max(1, n - 1), d), fr5(n + 1, d + 2)];
  for (var i = 0; i < cands.length && out.length < 3; i++) { if (!seen[cands[i]]) { seen[cands[i]] = 1; out.push(cands[i]); } }
  var k = 2;
  while (out.length < 3) { var c = fr5(n + k, d + k); if (!seen[c]) { seen[c] = 1; out.push(c); } k++; }
  return out;
}
function frMCQ5(prompt, n, d, explain, visual) { return mcqQ(prompt, frWrongs5(n, d), fr5(n, d), explain, visual); }
function frBlank5(prompt, n, d, explain) {
  var ans = fr5(n, d);
  var opts = shuffle([ans].concat(frWrongs5(n, d).slice(0, 2)));
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: prompt, blankText: ans, explain: explain || null,
    visual: '<div class="sentence">Đáp án: ' + blankSlot() + "</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 3, optStack: true };
}
/* ================= TOÁN 5 — bộ sinh ================= */
/* --- Ôn tập: số tự nhiên --- */
function g5NatCalc() {
  var v = rand(0, 3);
  if (v === 0) { var a = rand(12345, 899999), b = rand(1234, 99999); return calcMCQ("Tính (cộng, trừ số tự nhiên)", fmtN(a) + " + " + fmtN(b) + " = ?", a + b, 0, 1000000, fmtN(a) + " + " + fmtN(b) + " = " + fmtN(a + b) + "."); }
  if (v === 1) { var c = rand(123456, 999999), d = rand(12345, c - 1000); return calcMCQ("Tính (cộng, trừ số tự nhiên)", fmtN(c) + " − " + fmtN(d) + " = ?", c - d, 0, 1000000, fmtN(c) + " − " + fmtN(d) + " = " + fmtN(c - d) + "."); }
  if (v === 2) { var e = rand(123, 999), f = rand(12, 99); return calcMCQ("Tính (nhân số tự nhiên)", fmtN(e) + " × " + f + " = ?", e * f, 0, 100000, fmtN(e) + " × " + f + " = " + fmtN(e * f) + "."); }
  var dv = rand(12, 99), qt = rand(12, 999), pr = dv * qt;
  return calcMCQ("Tính (chia số tự nhiên)", fmtN(pr) + " : " + dv + " = ?", qt, 0, 10000, fmtN(pr) + " : " + dv + " = " + fmtN(qt) + " vì " + dv + " × " + fmtN(qt) + " = " + fmtN(pr) + ".");
}
function g5FracAddSubDiff() {
  var dens = [[2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [2, 7], [3, 7], [5, 6], [2, 9], [4, 9], [5, 8], [3, 8]];
  var pr = pick(dens), d1 = pr[0], d2 = pr[1];
  var a = rand(1, d1), b = rand(1, d2);
  var sub = Math.random() < 0.45 && a * d2 > b * d1;
  var n = sub ? a * d2 - b * d1 : a * d2 + b * d1, d = d1 * d2;
  return frMCQ5((sub ? "Tính: " : "Tính: ") + opFrac5(a, d1) + (sub ? " − " : " + ") + opFrac5(b, d2) + " = ?", n, d,
    "Quy đồng mẫu số chung là " + d + ": " + opFrac5(a, d1) + " = " + (a * d2) + "/" + d + ", " + opFrac5(b, d2) + " = " + (b * d1) + "/" + d + ". Kết quả rút gọn: " + fr5(n, d) + ".");
}
function g5Mixed() {
  var v = rand(0, 2);
  if (v === 0) { var w = rand(1, 6), d = pick([2, 3, 4, 5, 6, 8]), n = rand(1, d - 1);
    return frMCQ5("Hỗn số " + w + " " + n + "/" + d + " viết dưới dạng phân số là?", w * d + n, d, w + " " + n + "/" + d + " = (" + w + " × " + d + " + " + n + ")/" + d + " = " + (w * d + n) + "/" + d + "."); }
  if (v === 1) { var d2 = pick([2, 3, 4, 5, 6]), w2 = rand(1, 6), n2 = rand(1, d2 - 1), imp = w2 * d2 + n2;
    var ans = w2 + " " + fr5(n2, d2), wrongs = [(w2 + 1) + " " + fr5(n2, d2), w2 + " " + fr5(Math.min(d2 - 1, n2 + 1), d2), (w2 - 1 > 0 ? w2 - 1 : w2 + 2) + " " + fr5(n2, d2)];
    return mcqQ("Phân số " + imp + "/" + d2 + " viết dưới dạng hỗn số là?", wrongs, ans, imp + " : " + d2 + " = " + w2 + " (dư " + n2 + ") nên " + imp + "/" + d2 + " = " + ans + "."); }
  var d3 = pick([2, 3, 4, 5]), w3 = rand(1, 4), n3 = rand(1, d3 - 1), w4 = rand(1, 4), n4 = rand(1, d3 - 1);
  return frMCQ5("Tính: " + w3 + " " + n3 + "/" + d3 + " + " + w4 + " " + n4 + "/" + d3 + " = ? (viết dưới dạng phân số tối giản)", (w3 + w4) * d3 + n3 + n4, d3,
    "Cộng phần nguyên: " + w3 + " + " + w4 + " = " + (w3 + w4) + "; cộng phần phân số: " + n3 + "/" + d3 + " + " + n4 + "/" + d3 + " = " + (n3 + n4) + "/" + d3 + ". Gộp lại được " + fr5((w3 + w4) * d3 + n3 + n4, d3) + ".");
}
function g5DecFrac() {
  var v = rand(0, 2);
  if (v === 0) { var d = pick([10, 100, 1000]); var n = d === 1000 ? rand(1, 99) * 10 : rand(1, d - 1);
    return decMCQ("Phân số thập phân " + n + "/" + d + " viết dưới dạng số thập phân là?", "", Math.round(n * 100 / d), n + "/" + d + " = " + decStr(Math.round(n * 100 / d)) + " (mẫu số " + fmtN(d) + " gợi ý số chữ số sau dấu phẩy)."); }
  if (v === 1) { var h2 = rand(5, 999); if (h2 % 100 === 0) h2 += 5;
    var dd, nn; if (h2 % 10 === 0) { dd = 10; nn = h2 / 10; } else { dd = 100; nn = h2; }
    var ans = nn + "/" + dd;
    var wrongs = [(nn + 1) + "/" + dd, nn + "/" + (dd === 10 ? 100 : 1000), (nn * 10) + "/" + dd];
    return mcqQ("Số thập phân " + decStr(h2) + " viết dưới dạng phân số thập phân là?", wrongs.filter(function (x) { return x !== ans; }), ans, decStr(h2) + " = " + ans + " (đếm số chữ số sau dấu phẩy để chọn mẫu số 10, 100)."); }
  var d3 = pick([10, 100]), n3 = rand(1, d3 - 1);
  return decMCQ("Số thập phân nào bằng phân số " + n3 + "/" + d3 + "?", "", Math.round(n3 * 100 / d3), n3 + "/" + d3 + " = " + decStr(Math.round(n3 * 100 / d3)) + ".");
}
/* --- Số thập phân --- */
function g5DecRead() {
  var h = rand(105, 99999);
  var ip = Math.floor(h / 100);
  return decMCQ("Số thập phân “" + vnNum3(ip) + " phẩy " + (h % 100) + "” viết là?", "", h, "Phần nguyên là " + fmtN(ip) + ", phần thập phân ghi sau dấu phẩy: " + decStr(h) + ".");
}
function g5DecParts() {
  var cases = [
    ["3,57", "5", "hàng phần mười"], ["3,57", "7", "hàng phần trăm"], ["12,48", "4", "hàng phần mười"], ["12,48", "8", "hàng phần trăm"],
    ["0,95", "9", "hàng phần mười"], ["205,6", "6", "hàng phần mười"], ["7,03", "3", "hàng phần trăm"], ["45,21", "2", "hàng phần mười"],
    ["45,21", "1", "hàng phần trăm"], ["9,876", "8", "hàng phần trăm"], ["9,876", "6", "hàng phần nghìn"], ["60,5", "5", "hàng phần mười"]
  ];
  var c = pick(cases);
  var wrongs = ["hàng đơn vị", "hàng phần mười", "hàng phần trăm", "hàng phần nghìn", "hàng chục"].filter(function (x) { return x !== c[2]; });
  return mcqQ("Trong số " + c[0] + ", chữ số " + c[1] + " thuộc hàng nào?", [wrongs[0], wrongs[1]], c[2], "Sau dấu phẩy: chữ số thứ nhất là hàng phần mười, thứ hai là hàng phần trăm, thứ ba là hàng phần nghìn. Trong số " + c[0] + ", chữ số " + c[1] + " ở " + c[2] + ".");
}
function g5DecCompare() {
  var a = rand(105, 9999), b = a + pick([-300, -105, -50, -11, -2, -1, 1, 2, 11, 50, 105, 300]);
  if (b <= 0) b = a + 25;
  var bigger = Math.random() < 0.5;
  return decMCQ(bigger ? "Số thập phân nào LỚN hơn?" : "Số thập phân nào BÉ hơn?", decStr(a) + " và " + decStr(b), bigger ? Math.max(a, b) : Math.min(a, b),
    "So sánh phần nguyên trước, rồi đến hàng phần mười, phần trăm. " + decStr(Math.max(a, b)) + " > " + decStr(Math.min(a, b)) + ".");
}
function g5DecSign() {
  var a = rand(105, 9999), b = Math.random() < 0.25 ? a : a + pick([-150, -40, -9, -1, 1, 9, 40, 150]);
  if (b <= 0) b = a + 30;
  var sign = a > b ? ">" : a < b ? "<" : "=";
  var opts = shuffle([">", "<", "="]);
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền dấu >, < hoặc = thích hợp!", blankText: sign,
    visual: '<div class="expr">' + decStr(a) + " " + blankSlot() + " " + decStr(b) + "</div>",
    explain: decStr(a) + " " + sign + " " + decStr(b) + " (so sánh phần nguyên rồi đến phần thập phân).",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(sign), cols: 3 };
}
function g5DecRound() {
  var v = rand(0, 1);
  if (v === 0) { var h = rand(115, 99995), ans = Math.round(h / 100);
    return calcMCQ("Làm tròn số thập phân đến số tự nhiên gần nhất", decStr(h) + " ≈ ?", ans, 0, 1200, "Nhìn chữ số hàng phần mười: " + decStr(h) + " làm tròn thành " + ans + "."); }
  var h2 = rand(105, 9999), ansH = Math.round(h2 / 10) * 10;
  return decMCQ("Làm tròn số thập phân đến hàng phần mười", decStr(h2) + " ≈ ?", ansH, "Nhìn chữ số hàng phần trăm của " + decStr(h2) + ": làm tròn đến hàng phần mười được " + decStr(ansH) + ".");
}
function g5DecMeasure() {
  var cases = [
    function () { var m = rand(1, 9), dm = rand(1, 9); return [m + " m " + dm + " dm = ? m", m * 100 + dm * 10, dm + " dm = 0," + dm + " m nên kết quả là " + decStr(m * 100 + dm * 10) + " m."]; },
    function () { var kg = rand(1, 9), g = rand(1, 19) * 50; return [kg + " kg " + g + " g = ? kg", kg * 100 + g / 10, g + " g = " + decStr(g / 10) + " kg nên kết quả là " + decStr(kg * 100 + g / 10) + " kg."]; },
    function () { var km = rand(1, 9), m = rand(1, 19) * 50; return [km + " km " + m + " m = ? km", km * 100 + m / 10, m + " m = " + decStr(m / 10) + " km nên kết quả là " + decStr(km * 100 + m / 10) + " km."]; },
    function () { var t = rand(1, 9), ta = rand(1, 9); return [t + " tấn " + ta + " tạ = ? tấn", t * 100 + ta * 10, ta + " tạ = 0," + ta + " tấn nên kết quả là " + decStr(t * 100 + ta * 10) + " tấn."]; },
    function () { var l = rand(1, 9), ml = rand(1, 19) * 50; return [l + " l " + ml + " ml = ? l", l * 100 + ml / 10, ml + " ml = " + decStr(ml / 10) + " l nên kết quả là " + decStr(l * 100 + ml / 10) + " l."]; },
    function () { var m = rand(1, 9), cm = rand(1, 19) * 5; return [m + " m " + cm + " cm = ? m", m * 100 + cm, cm + " cm = " + decStr(cm) + " m nên kết quả là " + decStr(m * 100 + cm) + " m."]; }
  ];
  var c = pick(cases)();
  return decMCQ("Viết số đo dưới dạng số thập phân", c[0], c[1], c[2]);
}
/* --- Diện tích: km², héc-ta --- */
var G5_AREA_CASES = [
  ["km²", "ha", 100], ["ha", "m²", 10000], ["km²", "m²", 1000000], ["ha", "km²", 0.01], ["m²", "ha", 0.0001]
];
function g5AreaConv() {
  var c = pick(G5_AREA_CASES.slice(0, 3)), k = rand(2, 30), ans = k * c[2];
  return calcMCQ("Đổi đơn vị diện tích", k + " " + c[0] + " = ? " + c[1], ans, 0, 30000000, "1 " + c[0] + " = " + fmtN(c[2]) + " " + c[1] + " nên " + k + " " + c[0] + " = " + fmtN(ans) + " " + c[1] + ".");
}
function g5AreaBlank() {
  var c = pick(G5_AREA_CASES.slice(0, 3)), k = rand(2, 25), ans = k * c[2];
  return g3NumBlank("Điền số thích hợp vào chỗ trống!", '<div class="expr">' + k + " " + c[0] + " = " + blankSlot() + " " + c[1] + "</div>", ans, 0, ans * 2 + 1000);
}
function g5AreaWord() {
  var cases = [
    ["Đơn vị đo diện tích thường dùng cho diện tích một tỉnh, một khu rừng lớn là gì?", "Ki-lô-mét vuông (km²)", "Mét vuông (m²)", "Mi-li-mét vuông (mm²)", "Diện tích lớn như tỉnh, thành phố, khu rừng thường đo bằng km²."],
    ["1 héc-ta bằng bao nhiêu mét vuông?", "10 000 m²", "1 000 m²", "100 m²", "1 ha = 10 000 m² (một hình vuông cạnh 100 m)."],
    ["1 km² bằng bao nhiêu héc-ta?", "100 ha", "10 ha", "1 000 ha", "1 km² = 100 ha."],
    ["Một sân trường hình chữ nhật dài 60 m, rộng 40 m. Diện tích sân trường là bao nhiêu héc-ta?", "0,24 ha", "2,4 ha", "24 ha", "Diện tích = 60 × 40 = 2 400 m² = 0,24 ha."],
    ["Diện tích nước Việt Nam khoảng 331 000 km². Số đo này dùng đơn vị nào là hợp lí nhất?", "Ki-lô-mét vuông", "Héc-ta", "Mét vuông", "Diện tích một quốc gia rất lớn nên dùng km²."],
    ["Một thửa ruộng có diện tích 2 ha. Thửa ruộng đó rộng bao nhiêu mét vuông?", "20 000 m²", "2 000 m²", "200 m²", "2 ha = 2 × 10 000 = 20 000 m²."]
  ];
  var c = pick(cases);
  return mcqQ(c[0], [c[2], c[3]], c[1], c[4]);
}
/* --- Phép tính với số thập phân --- */
function g5DecAddSub() {
  var a = rand(125, 99999), b = rand(115, 89999);
  if (Math.random() < 0.5) return decMCQ("Tính (cộng số thập phân)", decStr(a) + " + " + decStr(b) + " = ?", a + b, "Đặt tính thẳng cột theo dấu phẩy rồi cộng như số tự nhiên: " + decStr(a) + " + " + decStr(b) + " = " + decStr(a + b) + ".");
  if (b >= a) { var t = a; a = b; b = t; }
  return decMCQ("Tính (trừ số thập phân)", decStr(a) + " − " + decStr(b) + " = ?", a - b, "Đặt tính thẳng cột theo dấu phẩy rồi trừ như số tự nhiên: " + decStr(a) + " − " + decStr(b) + " = " + decStr(a - b) + ".");
}
function g5DecMul() {
  var v = rand(0, 2);
  if (v === 0) { var a = rand(115, 9999), k = rand(2, 9); return decMCQ("Tính (nhân số thập phân với số tự nhiên)", decStr(a) + " × " + k + " = ?", a * k, "Nhân như số tự nhiên rồi đếm chữ số sau dấu phẩy: " + decStr(a) + " × " + k + " = " + decStr(a * k) + "."); }
  if (v === 1) { var t1 = rand(11, 99), t2 = rand(11, 99); return decMCQ("Tính (nhân hai số thập phân)", decStr(t1 * 10) + " × " + decStr(t2 * 10) + " = ?", t1 * t2, decStr(t1 * 10) + " × " + decStr(t2 * 10) + " = " + decStr(t1 * t2) + " (mỗi thừa số có 1 chữ số thập phân nên tích có 2 chữ số thập phân)."); }
  var m = rand(12, 999), k2 = rand(2, 9);
  return decMCQ("Tính (nhân số thập phân với số tự nhiên)", decStr(m) + " × " + k2 + " = ?", m * k2, decStr(m) + " × " + k2 + " = " + decStr(m * k2) + ".");
}
function g5DecDiv() {
  var v = rand(0, 2);
  if (v === 0) { var q = rand(115, 9999), d = rand(2, 9); return decMCQ("Tính (chia số thập phân cho số tự nhiên)", decStr(q * d) + " : " + d + " = ?", q, "Chia như số tự nhiên, đánh dấu phẩy ở thương khi hạ chữ số phần thập phân: " + decStr(q * d) + " : " + d + " = " + decStr(q) + "."); }
  if (v === 1) { var a = rand(1, 49), b = pick([2, 4, 5, 8, 10, 20, 25]); var h = Math.round(a * 100 / b); if (a * 100 % b !== 0) { a = b * rand(1, 9) + rand(1, b - 1); h = Math.round(a * 100 / b); }
    return decMCQ("Tính (chia hai số tự nhiên, thương là số thập phân)", a + " : " + b + " = ?", h, a + " : " + b + " = " + decStr(h) + " (chia tiếp phần thập phân khi còn dư)."); }
  var q2 = rand(105, 5000), d2 = pick([2, 4, 5, 8]);
  return decMCQ("Tính (chia số thập phân cho số tự nhiên)", decStr(q2 * d2) + " : " + d2 + " = ?", q2, decStr(q2 * d2) + " : " + d2 + " = " + decStr(q2) + ".");
}
function g5DecPow() {
  var v = rand(0, 3), p = pick([10, 100, 1000]);
  if (v === 0) { var a = rand(105, 99999); return decMCQ("Nhân số thập phân với 10, 100, 1 000", decStr(a) + " × " + fmtN(p) + " = ?", a * p, "Nhân với " + fmtN(p) + ": chuyển dấu phẩy của " + decStr(a) + " sang phải " + (p === 10 ? "một" : p === 100 ? "hai" : "ba") + " chữ số, được " + decStr(a * p) + "."); }
  if (v === 1) { var q = rand(105, 99999); return decMCQ("Chia số thập phân cho 10, 100, 1 000", decStr(q * p) + " : " + fmtN(p) + " = ?", q, "Chia cho " + fmtN(p) + ": chuyển dấu phẩy của " + decStr(q * p) + " sang trái " + (p === 10 ? "một" : p === 100 ? "hai" : "ba") + " chữ số, được " + decStr(q) + "."); }
  if (v === 2) { var q2 = rand(105, 99999), p2 = pick([10, 100]); return decMCQ("Nhân số thập phân với 0,1; 0,01", decStr(q2 * p2) + " × " + (p2 === 10 ? "0,1" : "0,01") + " = ?", q2, "Nhân với " + (p2 === 10 ? "0,1" : "0,01") + " cũng là chia cho " + p2 + ": chuyển dấu phẩy sang trái, được " + decStr(q2) + "."); }
  var a3 = rand(105, 99999), p3 = pick([10, 100]);
  return decMCQ("Chia số thập phân cho 0,1; 0,01", decStr(a3) + " : " + (p3 === 10 ? "0,1" : "0,01") + " = ?", a3 * p3, "Chia cho " + (p3 === 10 ? "0,1" : "0,01") + " cũng là nhân với " + p3 + ": chuyển dấu phẩy sang phải, được " + decStr(a3 * p3) + ".");
}
/* --- Hình phẳng: tam giác, hình thang, hình tròn --- */
function circleSVG5(kind) {
  var line = kind === "r"
    ? '<line x1="100" y1="100" x2="152" y2="100" stroke="#e4572e" stroke-width="4"/><text x="118" y="92" font-size="17" fill="#e4572e" font-weight="bold">r</text>'
    : '<line x1="48" y1="100" x2="152" y2="100" stroke="#2a9d8f" stroke-width="4"/><text x="94" y="92" font-size="17" fill="#2a9d8f" font-weight="bold">d</text>';
  return '<div style="text-align:center"><svg viewBox="0 0 200 200" style="width:min(52vw,190px)"><circle cx="100" cy="100" r="52" fill="#eaf6ff" stroke="#3a7ca5" stroke-width="4"/>' + line + '<circle cx="100" cy="100" r="5" fill="#333"/></svg></div>';
}
function g5ShapeIdentify() {
  var v = rand(0, 2);
  if (v === 0) return mcqQ("Đoạn thẳng nối tâm với một điểm trên đường tròn gọi là gì?", ["Đường kính", "Chu vi"], "Bán kính", "Đoạn thẳng từ tâm đến một điểm trên đường tròn là bán kính (r).", circleSVG5("r"));
  if (v === 1) return mcqQ("Đoạn thẳng đi qua tâm và nối hai điểm trên đường tròn gọi là gì?", ["Bán kính", "Chu vi"], "Đường kính", "Đường kính (d) dài gấp đôi bán kính: d = r × 2.", circleSVG5("d"));
  var facts = [
    ["Hình thang có đặc điểm nào?", "Có một cặp cạnh đối diện song song", "Có bốn cạnh bằng nhau", "Có bốn góc vuông", "Hình thang chỉ cần một cặp cạnh đối diện song song."],
    ["Muốn tính diện tích hình tam giác, ta làm thế nào?", "Lấy độ dài đáy nhân chiều cao rồi chia cho 2", "Lấy độ dài đáy nhân chiều cao", "Lấy độ dài đáy cộng chiều cao rồi chia cho 2", "S tam giác = (a × h) : 2."],
    ["Muốn tính diện tích hình thang, ta làm thế nào?", "Lấy tổng hai đáy nhân chiều cao rồi chia cho 2", "Lấy hai đáy nhân nhau rồi chia cho 2", "Lấy tổng hai đáy nhân chiều cao", "S hình thang = (a + b) × h : 2."],
    ["Số π (pi) thường lấy gần đúng bằng bao nhiêu?", "3,14", "3,04", "3,41", "π ≈ 3,14 dùng trong tính chu vi, diện tích hình tròn."]
  ];
  var f = pick(facts);
  return mcqQ(f[0], [f[2], f[3]], f[1], f[4]);
}
function g5TriArea() {
  var a = rand(4, 30), h = rand(3, 24), s = a * h / 2;
  var opts = [], seen = {}; seen[s] = 1;
  [a * h, (a + h) / 2 * 2, s + a, s + h, Math.abs(s - h), a * h / 4].forEach(function (x) { if (x > 0 && !seen[x] && opts.length < 3) { seen[x] = 1; opts.push(x); } });
  var all = shuffle([s].concat(opts));
  return { prompt: "Tính diện tích hình tam giác", figure: figTriSVG(a, h), visual: '<div class="expr">Đáy ' + a + " cm, chiều cao " + h + " cm — S = ?</div>",
    options: all.map(function (o) { return { html: '<span class="opt-num">' + numStr5(o) + " cm²</span>" }; }), answer: all.indexOf(s), cols: 2,
    explain: "S = (" + a + " × " + h + ") : 2 = " + numStr5(s) + " cm²." };
}
function g5TrapArea() {
  var a = rand(4, 20), b = rand(3, 18), h = rand(3, 16), s = (a + b) * h / 2;
  var opts = [], seen = {}; seen[s] = 1;
  [(a + b) * h, a * b * h / 2, (a + b + h) / 2, s + h, Math.abs(a - b) * h / 2].forEach(function (x) { if (x > 0 && !seen[x] && opts.length < 3) { seen[x] = 1; opts.push(x); } });
  var all = shuffle([s].concat(opts));
  return { prompt: "Tính diện tích hình thang", figure: figTrapSVG(a, b, h), visual: '<div class="expr">Đáy lớn ' + a + " cm, đáy bé " + b + " cm, chiều cao " + h + " cm — S = ?</div>",
    options: all.map(function (o) { return { html: '<span class="opt-num">' + numStr5(o) + " cm²</span>" }; }), answer: all.indexOf(s), cols: 2,
    explain: "S = (" + a + " + " + b + ") × " + h + " : 2 = " + numStr5(s) + " cm²." };
}
function g5Circle() {
  var v = rand(0, 2), r = pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20]);
  var q;
  if (v === 0) { q = decMCQ("Tính chu vi hình tròn", "Bán kính r = " + numStr5(r) + " cm — C = ?", Math.round(r * 2 * 314), "C = r × 2 × 3,14 = " + numStr5(r) + " × 2 × 3,14 = " + decStr(Math.round(r * 2 * 314)) + " cm."); q.figure = figCircleSVG(r, "r"); return q; }
  if (v === 1) { q = decMCQ("Tính chu vi hình tròn", "Đường kính d = " + numStr5(r * 2) + " cm — C = ?", Math.round(r * 2 * 314), "C = d × 3,14 = " + numStr5(r * 2) + " × 3,14 = " + decStr(Math.round(r * 2 * 314)) + " cm."); q.figure = figCircleSVG(r, "d"); return q; }
  q = decMCQ("Tính diện tích hình tròn", "Bán kính r = " + numStr5(r) + " cm — S = ?", Math.round(r * r * 314), "S = r × r × 3,14 = " + numStr5(r) + " × " + numStr5(r) + " × 3,14 = " + decStr(Math.round(r * r * 314)) + " cm²."); q.figure = figCircleSVG(r, "r"); return q;
}
/* --- Tỉ số, tỉ số phần trăm --- */
function g5Ratio() {
  var v = rand(0, 2);
  if (v === 0) { var a = rand(2, 30), b = rand(2, 30);
    return frMCQ5("Tỉ số của " + a + " và " + b + " viết dưới dạng phân số tối giản là?", a, b, "Tỉ số của " + a + " và " + b + " là " + a + " : " + b + " = " + fr5(a, b) + "."); }
  if (v === 1) { var k = rand(2, 9), g = rand(2, 8), a2 = k * g, b2 = (k + rand(1, 5)) * g;
    return frMCQ5("Rút gọn tỉ số " + a2 + " : " + b2 + " về tỉ số tối giản (dạng phân số)!", a2, b2, "Chia cả hai số cho " + g + ": " + a2 + " : " + b2 + " = " + fr5(a2, b2) + "."); }
  var a3 = rand(3, 40), b3 = rand(3, 40);
  return mcqQ("Tỉ số của " + b3 + " và " + a3 + " là gì?", [a3 + " : " + b3, b3 + " : " + a3 + " (đảo ngược)", a3 + " + " + b3], b3 + " : " + a3, "Tỉ số của hai số viết số thứ nhất trước: tỉ số của " + b3 + " và " + a3 + " là " + b3 + " : " + a3 + ".");
}
function g5MapScale() {
  var v = rand(0, 1);
  if (v === 0) { var scale = pick([100, 1000, 10000, 100000]), cm = rand(2, 12), real = cm * scale;
    var unit = real >= 100000 ? (real / 100000) + " km" : real >= 100 ? (real / 100) + " m" : real + " cm";
    var wrongs = [cm * scale / 10 >= 100 ? (cm * scale / 1000) + " m" : (cm * 10) + " cm", (cm * scale * 10 / 100) + " m", cm + " km"].filter(function (x) { return x !== unit; });
    return mcqQ("Trên bản đồ tỉ lệ 1 : " + fmtN(scale) + ", đoạn thẳng dài " + cm + " cm. Độ dài thật là bao nhiêu?", wrongs.slice(0, 2), unit, "Độ dài thật = " + cm + " × " + fmtN(scale) + " = " + fmtN(real) + " cm = " + unit + "."); }
  var scale2 = pick([1000, 10000]), realKm = rand(2, 20), cmMap = realKm * 100000 / scale2;
  return calcMCQ("Trên bản đồ tỉ lệ 1 : " + fmtN(scale2) + ", quãng đường thật " + realKm + " km vẽ thành đoạn dài bao nhiêu xăng-ti-mét?", realKm + " km = " + fmtN(realKm * 100000) + " cm; " + fmtN(realKm * 100000) + " : " + fmtN(scale2) + " = ?", cmMap, 0, 500, "Độ dài trên bản đồ = " + fmtN(cmMap) + " cm.");
}
function g5SumDiffRatio() {
  var v = rand(0, 1);
  var parts = pick([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [1, 3], [3, 7], [5, 3]]);
  var unitVal = rand(4, 25);
  if (v === 0) { var total = (parts[0] + parts[1]) * unitVal, small = parts[0] * unitVal, big = parts[1] * unitVal;
    return calcMCQ("Bài toán tổng – tỉ: hai số có tổng bằng " + total + ", tỉ số của hai số là " + parts[0] + "/" + parts[1] + ". Tìm số bé.", "Tổng số phần: " + parts[0] + " + " + parts[1] + " = " + (parts[0] + parts[1]), small, 0, 500,
      "Giá trị một phần = " + total + " : " + (parts[0] + parts[1]) + " = " + unitVal + ". Số bé = " + unitVal + " × " + parts[0] + " = " + small + " (số lớn = " + big + ")."); }
  var diff = Math.abs(parts[1] - parts[0]) * unitVal, s2 = Math.min(parts[0], parts[1]) * unitVal, b2 = Math.max(parts[0], parts[1]) * unitVal;
  return calcMCQ("Bài toán hiệu – tỉ: hai số có hiệu bằng " + diff + ", tỉ số của hai số là " + parts[0] + "/" + parts[1] + ". Tìm số lớn.", "Hiệu số phần: " + Math.abs(parts[1] - parts[0]), b2, 0, 500,
    "Giá trị một phần = " + diff + " : " + Math.abs(parts[1] - parts[0]) + " = " + unitVal + ". Số lớn = " + b2 + ", số bé = " + s2 + ".");
}
function g5Percent() {
  var v = rand(0, 1);
  if (v === 0) { var pairs = [[25, 100], [1, 4], [1, 2], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10], [15, 50], [12, 40], [18, 60], [45, 90], [24, 80], [36, 120]];
    var pr = pick(pairs), pct = Math.round(pr[0] * 100 / pr[1]);
    var opts = [], seen = {}; seen[pct] = 1;
    [pct + 10, pct - 10, pct * 2, Math.round(pct / 2), pct + 25, 100 - pct].forEach(function (x) { if (x > 0 && x !== pct && !seen[x] && opts.length < 3) { seen[x] = 1; opts.push(x); } });
    var all = shuffle([pct].concat(opts));
    return { prompt: "Tìm tỉ số phần trăm của " + pr[0] + " và " + pr[1], visual: "",
      options: all.map(function (o) { return { html: '<span class="opt-num">' + o + "%</span>" }; }), answer: all.indexOf(pct), cols: 2,
      explain: pr[0] + " : " + pr[1] + " = " + decStr(Math.round(pr[0] * 10000 / pr[1]) / 100 * 100 / 100) + "… viết dưới dạng phần trăm là " + pct + "% (" + pr[0] + "/" + pr[1] + " = " + (pr[0] * 100 / pr[1]) + "%)." };
  }
  var pcts = [[10, 200], [25, 80], [50, 60], [20, 150], [75, 40], [30, 90], [5, 400], [40, 75], [60, 45], [15, 240]];
  var c = pick(pcts), val = c[0] * c[1] / 100;
  return calcMCQ("Tìm giá trị phần trăm của một số", c[0] + "% của " + c[1] + " = ?", val, 0, 500, c[0] + "% của " + c[1] + " = " + c[1] + " × " + c[0] + "% = " + val + ".");
}
/* --- Thể tích, hình hộp chữ nhật, hình lập phương --- */
function g5VolConv() {
  var v = rand(0, 2);
  if (v === 0) { var k = rand(2, 40); return calcMCQ("Đổi đơn vị thể tích", k + " dm³ = ? cm³", k * 1000, 0, 50000, "1 dm³ = 1 000 cm³ nên " + k + " dm³ = " + fmtN(k * 1000) + " cm³."); }
  if (v === 1) { var k2 = rand(2, 30); return calcMCQ("Đổi đơn vị thể tích", k2 + " m³ = ? dm³", k2 * 1000, 0, 40000, "1 m³ = 1 000 dm³ nên " + k2 + " m³ = " + fmtN(k2 * 1000) + " dm³."); }
  var k3 = rand(2, 60) * 1000;
  return calcMCQ("Đổi đơn vị thể tích", fmtN(k3) + " cm³ = ? dm³", k3 / 1000, 0, 100, fmtN(k3) + " cm³ = " + (k3 / 1000) + " dm³ (chia cho 1 000).");
}
function g5Box() {
  var v = rand(0, 2), a = rand(3, 15), b = rand(3, 12), c = rand(2, 10);
  var q;
  if (v === 0) { q = calcMCQ("Tính thể tích hình hộp chữ nhật", "Dài " + a + " cm, rộng " + b + " cm, cao " + c + " cm — V = ?", a * b * c, 0, 2000, "V = " + a + " × " + b + " × " + c + " = " + (a * b * c) + " cm³."); q.figure = figBoxSVG(a, b, c); return q; }
  if (v === 1) { var sxq = (a + b) * 2 * c; q = calcMCQ("Tính diện tích xung quanh hình hộp chữ nhật", "Dài " + a + " cm, rộng " + b + " cm, cao " + c + " cm — Sxq = ?", sxq, 0, 1000, "Sxq = (dài + rộng) × 2 × cao = (" + a + " + " + b + ") × 2 × " + c + " = " + sxq + " cm²."); q.figure = figBoxSVG(a, b, c); return q; }
  var stp = (a + b) * 2 * c + 2 * a * b;
  q = calcMCQ("Tính diện tích toàn phần hình hộp chữ nhật", "Dài " + a + " cm, rộng " + b + " cm, cao " + c + " cm — Stp = ?", stp, 0, 1500, "Stp = Sxq + diện tích 2 đáy = " + ((a + b) * 2 * c) + " + 2 × " + a + " × " + b + " = " + stp + " cm²."); q.figure = figBoxSVG(a, b, c); return q;
}
function g5Cube() {
  var v = rand(0, 2), a = rand(2, 12);
  var q;
  if (v === 0) { q = calcMCQ("Tính thể tích hình lập phương", "Cạnh " + a + " cm — V = ?", a * a * a, 0, 2000, "V = cạnh × cạnh × cạnh = " + a + " × " + a + " × " + a + " = " + (a * a * a) + " cm³."); q.figure = figCubeSVG(a); return q; }
  if (v === 1) { q = calcMCQ("Tính diện tích toàn phần hình lập phương", "Cạnh " + a + " cm — Stp = ?", 6 * a * a, 0, 1000, "Hình lập phương có 6 mặt vuông bằng nhau: Stp = " + a + " × " + a + " × 6 = " + (6 * a * a) + " cm²."); q.figure = figCubeSVG(a); return q; }
  q = calcMCQ("Tính diện tích xung quanh hình lập phương", "Cạnh " + a + " cm — Sxq = ?", 4 * a * a, 0, 1000, "Sxq gồm 4 mặt bên: " + a + " × " + a + " × 4 = " + (4 * a * a) + " cm²."); q.figure = figCubeSVG(a); return q;
}
/* --- Số đo thời gian, chuyển động đều --- */
function g5TimeMeasure() {
  var v = rand(0, 3);
  if (v === 0) { var h1 = rand(1, 5), m1 = rand(10, 50), h2 = rand(1, 4), m2 = rand(5, 55 - 0); if (m1 + m2 >= 60) { m2 = rand(60 - m1, 59); } /* Sửa B1-P0 (2026-10-15): trước đây m2 = 60 - m1 + rand(0,20) có thể tới 70 → mốc "1 giờ 62 phút" không tồn tại; nay m2 luôn trong [60-m1, 59] để tổng phút nhớ đúng 1 giờ và mỗi mốc đều hợp lệ (phút 0–59). */
    var tm = m1 + m2, th = h1 + h2 + Math.floor(tm / 60); tm = tm % 60;
    var ans = th + " giờ " + tm + " phút";
    var wrongs = [(th - 1) + " giờ " + (tm + 60 > 59 ? tm : tm + 60) + " phút", th + " giờ " + ((tm + 10) % 60) + " phút", (th + 1) + " giờ " + tm + " phút"];
    return mcqQ("Tính: " + h1 + " giờ " + m1 + " phút + " + h2 + " giờ " + m2 + " phút = ?", wrongs.filter(function (x) { return x !== ans; }), ans, "Cộng phút với phút, giờ với giờ; nếu phút ≥ 60 thì đổi 60 phút = 1 giờ. Kết quả: " + ans + "."); }
  if (v === 1) { var H = rand(2, 6), M = rand(20, 55), h3 = rand(1, H - 1), m3 = rand(5, M - 1);
    var ans2 = (H - h3) + " giờ " + (M - m3) + " phút";
    var wrongs2 = [(H - h3) + " giờ " + (M - m3 + 10 > 59 ? M - m3 - 10 : M - m3 + 10) + " phút", (H - h3 + 1) + " giờ " + (M - m3) + " phút", (H - h3) + " giờ " + Math.abs(M - m3 - 15) + " phút"];
    return mcqQ("Tính: " + H + " giờ " + M + " phút − " + h3 + " giờ " + m3 + " phút = ?", wrongs2.filter(function (x) { return x !== ans2; }), ans2, "Trừ giờ với giờ, phút với phút. Kết quả: " + ans2 + "."); }
  if (v === 2) { var h4 = rand(1, 3), m4 = pick([10, 15, 20, 30]), k = rand(2, 5), tot = (h4 * 60 + m4) * k;
    var ans3 = Math.floor(tot / 60) + " giờ " + (tot % 60) + " phút";
    var wrongs3 = [(Math.floor(tot / 60) + 1) + " giờ " + (tot % 60) + " phút", h4 * k + " giờ " + m4 + " phút", Math.floor(tot / 60) + " giờ " + ((tot % 60 + 15) % 60) + " phút"];
    return mcqQ("Tính: (" + h4 + " giờ " + m4 + " phút) × " + k + " = ?", wrongs3.filter(function (x) { return x !== ans3; }), ans3, "Đổi ra phút: " + (h4 * 60 + m4) + " phút × " + k + " = " + fmtN(tot) + " phút = " + ans3 + "."); }
  var combo = pick([[90, 2], [90, 3], [90, 5], [120, 3], [120, 4], [150, 5], [180, 3], [180, 6], [240, 4], [240, 6], [300, 5], [300, 6]]);
  var tot2 = combo[0], k2 = combo[1];
  var per = tot2 / k2;
  var ans4 = per >= 60 ? Math.floor(per / 60) + " giờ " + (per % 60) + " phút" : per + " phút";
  var wrongs4 = [(per + 10) + " phút", (per >= 20 ? per - 10 : per + 20) + " phút", tot2 + " phút"];
  return mcqQ("Tính: " + (tot2 / 60 % 1 === 0 ? (tot2 / 60) + " giờ" : Math.floor(tot2 / 60) + " giờ " + (tot2 % 60) + " phút") + " : " + k2 + " = ?", wrongs4.filter(function (x) { return x !== ans4; }), ans4, "Đổi ra phút: " + tot2 + " phút : " + k2 + " = " + per + " phút" + (per >= 60 ? " = " + ans4 : "") + ".");
}
function g5TimeConv() {
  var cases = [
    function () { var h = rand(1, 5); return [h + " giờ = ? phút", h * 60, "1 giờ = 60 phút."]; },
    function () { var m = rand(2, 9) * 60; return [m + " phút = ? giờ", m / 60, "60 phút = 1 giờ."]; },
    function () { var s = rand(1, 5); return [s + " phút = ? giây", s * 60, "1 phút = 60 giây."]; },
    function () { var d = rand(1, 3); return [d + " ngày = ? giờ", d * 24, "1 ngày = 24 giờ."]; },
    function () { var y = rand(2, 9) * 100; return [y + " năm = ? thế kỉ", y / 100, "1 thế kỉ = 100 năm."]; }
  ];
  var c = pick(cases)();
  return calcMCQ("Đổi số đo thời gian", c[0], c[1], 0, 5000, c[2] + " Kết quả: " + fmtN(c[1]) + ".");
}
function g5Motion() {
  var v = rand(0, 2);
  if (v === 0) { var t = rand(2, 8), vv = rand(5, 60), s = vv * t;
    return calcMCQ("Chuyển động đều: tìm vận tốc", "Đi " + s + " km trong " + t + " giờ — v = ?", vv, 0, 200, "v = s : t = " + s + " : " + t + " = " + vv + " km/giờ."); }
  if (v === 1) { var vv2 = rand(5, 60), t2 = rand(2, 9);
    return calcMCQ("Chuyển động đều: tìm quãng đường", "Vận tốc " + vv2 + " km/giờ, đi trong " + t2 + " giờ — s = ?", vv2 * t2, 0, 600, "s = v × t = " + vv2 + " × " + t2 + " = " + (vv2 * t2) + " km."); }
  var vv3 = rand(4, 50), t3 = rand(2, 10), s3 = vv3 * t3;
  return calcMCQ("Chuyển động đều: tìm thời gian", "Quãng đường " + s3 + " km, vận tốc " + vv3 + " km/giờ — t = ?", t3, 0, 60, "t = s : v = " + s3 + " : " + vv3 + " = " + t3 + " giờ.");
}
/* --- Thống kê: biểu đồ hình quạt, tỉ số số lần lặp lại --- */
var G5_PIE_SETS = [
  { title: "Tỉ số phần trăm số học sinh thích các môn học", groups: [["Toán", 40, "#e4572e"], ["Tiếng Việt", 25, "#2a9d8f"], ["Tiếng Anh", 20, "#ffb703"], ["Mĩ thuật", 15, "#7b5ea7"]] },
  { title: "Tỉ số phần trăm các loại sách trong thư viện", groups: [["Truyện tranh", 30, "#e4572e"], ["Sách khoa học", 30, "#2a9d8f"], ["Sách văn học", 25, "#ffb703"], ["Sách tham khảo", 15, "#7b5ea7"]] },
  { title: "Tỉ số phần trăm phương tiện học sinh đến trường", groups: [["Đi bộ", 35, "#e4572e"], ["Xe đạp", 30, "#2a9d8f"], ["Xe máy (đi cùng bố mẹ)", 25, "#ffb703"], ["Xe buýt", 10, "#7b5ea7"]] },
  { title: "Tỉ số phần trăm các môn thể thao được yêu thích", groups: [["Bóng đá", 45, "#e4572e"], ["Bơi lội", 20, "#2a9d8f"], ["Cầu lông", 20, "#ffb703"], ["Điền kinh", 15, "#7b5ea7"]] }
];
function pieSVG5(set) {
  var cx = 100, cy = 95, r = 62, start = -90, paths = "";
  set.groups.forEach(function (g) {
    var sweep = g[1] * 3.6, end = start + sweep;
    var x1 = cx + r * Math.cos(start * Math.PI / 180), y1 = cy + r * Math.sin(start * Math.PI / 180);
    var x2 = cx + r * Math.cos(end * Math.PI / 180), y2 = cy + r * Math.sin(end * Math.PI / 180);
    paths += '<path d="M' + cx + " " + cy + " L" + x1.toFixed(1) + " " + y1.toFixed(1) + " A" + r + " " + r + " 0 " + (sweep > 180 ? 1 : 0) + " 1 " + x2.toFixed(1) + " " + y2.toFixed(1) + ' Z" fill="' + g[2] + '" stroke="#fff" stroke-width="2"/>';
    start = end;
  });
  var legend = set.groups.map(function (g) { return "■ " + g[0] + ": " + g[1] + "%"; }).join(" • ");
  return '<div style="text-align:center"><svg viewBox="0 0 200 190" style="width:min(56vw,200px)">' + paths + '</svg><div class="chart-box">' + set.title + "<br>" + legend + "</div></div>";
}
function g5Pie() {
  var set = pick(G5_PIE_SETS), v = rand(0, 2), visual = pieSVG5(set);
  var sorted = set.groups.slice().sort(function (a, b) { return b[1] - a[1]; });
  if (v === 0) { var g = pick(set.groups);
    var opts = [], seen = {}; seen[g[1]] = 1;
    set.groups.forEach(function (x) { if (!seen[x[1]]) { seen[x[1]] = 1; opts.push(x[1]); } });
    [g[1] + 5, g[1] - 5, 100 - g[1]].forEach(function (x) { if (x > 0 && !seen[x] && opts.length < 3) { seen[x] = 1; opts.push(x); } });
    var all = shuffle([g[1]].concat(opts));
    return { prompt: "Nhìn biểu đồ hình quạt: nhóm “" + g[0] + "” chiếm bao nhiêu phần trăm?", visual: visual,
      options: all.map(function (o) { return { html: '<span class="opt-num">' + o + "%</span>" }; }), answer: all.indexOf(g[1]), cols: 2,
      explain: "Theo biểu đồ, nhóm " + g[0] + " chiếm " + g[1] + "%." };
  }
  if (v === 1) return mcqQ("Nhìn biểu đồ hình quạt: nhóm nào chiếm tỉ lệ LỚN nhất?", set.groups.filter(function (x) { return x !== sorted[0]; }).map(function (x) { return x[0]; }), sorted[0][0], "Nhóm lớn nhất là " + sorted[0][0] + " với " + sorted[0][1] + "%.", visual);
  return mcqQ("Nhìn biểu đồ hình quạt: nhóm nào chiếm tỉ lệ NHỎ nhất?", set.groups.filter(function (x) { return x !== sorted[3]; }).map(function (x) { return x[0]; }), sorted[3][0], "Nhóm nhỏ nhất là " + sorted[3][0] + " với " + sorted[3][1] + "%.", visual);
}
function g5EventRatio() {
  var cases = [
    function () { var tot = pick([10, 20, 25, 40, 50]), k = rand(2, tot - 2); return ["Tung một đồng xu " + tot + " lần, mặt ngửa xuất hiện " + k + " lần. Tỉ số của số lần mặt ngửa xuất hiện và tổng số lần tung là?", k, tot, "Tỉ số = số lần xuất hiện : tổng số lần = " + k + " : " + tot + " = " + fr5(k, tot) + "."]; },
    function () { var tot = pick([12, 18, 20, 24, 30]), k = rand(2, tot - 2); return ["Quay một vòng quay may mắn " + tot + " lần, trúng ô màu đỏ " + k + " lần. Tỉ số của số lần trúng ô đỏ và tổng số lần quay là?", k, tot, "Tỉ số = " + k + " : " + tot + " = " + fr5(k, tot) + "."]; },
    function () { var tot = pick([15, 20, 30, 40]), k = rand(2, tot - 2); return ["Một đội chơi ném bóng " + tot + " lượt, trúng đích " + k + " lượt. Tỉ số của số lượt trúng đích và tổng số lượt ném là?", k, tot, "Tỉ số = " + k + " : " + tot + " = " + fr5(k, tot) + "."]; }
  ];
  var c = pick(cases)();
  return frMCQ5(c[0], c[1], c[2], c[3]);
}
/* ================= TOÁN 5 — chủ đề ================= */
var MATH5_TOPICS = [
  { id: "m5-ontap", emoji: "🔁", name: "Ôn tập: số tự nhiên, phân số, hỗn số", sub: "Bài 1–8 • Cộng trừ phân số khác mẫu, phân số thập phân, hỗn số", pools: { choose: [g5NatCalc, g5FracAddSubDiff, g5Mixed, g5DecFrac, g5FracAddSubDiff, g5NatCalc, g5Mixed], blank: [function () { var pr = pick([[2, 3], [3, 4], [2, 5], [4, 5], [3, 5]]); var a = rand(1, pr[0]), b = rand(1, pr[1]); return frBlank5("Điền kết quả của phép tính " + opFrac5(a, pr[0]) + " + " + opFrac5(b, pr[1]) + "!", a * pr[1] + b * pr[0], pr[0] * pr[1], "Quy đồng mẫu số chung là " + (pr[0] * pr[1]) + " rồi cộng hai tử số, sau đó rút gọn."); }, function () { var d = pick([10, 100]), n = rand(1, d - 1), ansH = Math.round(n * 100 / d), os = decOpts(ansH, 3); return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền số thập phân bằng phân số " + n + "/" + d + "!", blankText: decStr(ansH), visual: '<div class="sentence">Đáp án: ' + blankSlot() + "</div>", options: os.map(function (o) { return { html: '<span class="opt-num">' + decStr(o) + "</span>" }; }), answer: os.indexOf(ansH), cols: 3, explain: n + "/" + d + " = " + decStr(ansH) + "." }; }],
    match: [function () { var prs = [], used = {}; var guard = 0; while (prs.length < 4 && guard++ < 300) { var d = pick([3, 4, 5, 6, 8]); var a = rand(1, d - 1), b = rand(1, d - a); var key = a + "/" + d + "+" + b; if (used[key]) continue; used[key] = 1; prs.push([a + "/" + d + " + " + b + "/" + d, fr5(a + b, d)]); } return pairsMatch("Nối phép tính phân số với kết quả đúng nhé!", prs); }],
    games: [factsTF([["Cộng hai phân số khác mẫu số phải quy đồng mẫu số trước", "Đúng", "Sai", null], ["Hỗn số 2 1/3 bằng phân số 7/3", "Đúng", "Sai", null], ["Phân số thập phân là phân số có mẫu số là 10, 100, 1000...", "Đúng", "Sai", null], ["Khi cộng hai phân số, ta cộng cả tử số và mẫu số", "Sai", "Đúng", null]]), factsCatch([["Tính 1/2 + 1/4 = ?", "3/4", "2/6", "1/6", "Quy đồng: 1/2 = 2/4; 2/4 + 1/4 = 3/4."], ["Hỗn số 1 1/2 bằng phân số nào?", "3/2", "2/2", "1/2", "1 1/2 = (1 × 2 + 1)/2 = 3/2."]])] } },
  { id: "m5-thapphan", emoji: "🔢", name: "Số thập phân", sub: "Khái niệm, hàng của chữ số, so sánh, làm tròn, viết số đo dạng thập phân", pools: { choose: [g5DecRead, g5DecParts, g5DecCompare, g5DecRound, g5DecMeasure, g5DecParts, g5DecCompare], blank: [g5DecSign, function () { var h = rand(115, 9999); return decBlank("Điền số thập phân thích hợp!", "? = " + vnNum3(Math.floor(h / 100)) + " phẩy " + (h % 100), h, "Viết phần nguyên, dấu phẩy, rồi phần thập phân: " + decStr(h) + "."); }],
    match: [function () { var prs = [], used = {}; var guard = 0; while (prs.length < 4 && guard++ < 300) { var m = rand(1, 9), dm = rand(1, 9); var key = m + "m" + dm; if (used[key]) continue; used[key] = 1; prs.push([m + " m " + dm + " dm", decStr(m * 100 + dm * 10) + " m"]); } return pairsMatch("Nối số đo với số thập phân đúng nhé!", prs); }],
    games: [factsTF([["Số 5,03 đọc là “năm phẩy không ba”", "Đúng", "Sai", null], ["Số thập phân 7,5 bằng số thập phân 7,50", "Đúng", "Sai", null], ["Mọi số thập phân đều lớn hơn 1", "Sai", "Đúng", null], ["Làm tròn 6,78 đến hàng phần mười được 6,8", "Đúng", "Sai", null]]), function () { var hs = []; while (hs.length < 4) { var h = rand(105, 9999); if (hs.indexOf(h) === -1) hs.push(h); } return memQ("Lật thẻ tìm cặp đúng: cách đọc và số thập phân!", hs.map(function (h) { return { a: '<span class="mem-text">' + vnNum3(Math.floor(h / 100)) + " phẩy " + (h % 100) + "</span>", b: '<span class="mem-num">' + decStr(h) + "</span>" }; })); }] } },
  { id: "m5-dientich", emoji: "🗺️", name: "Đơn vị đo diện tích: km², héc-ta", sub: "km², ha, m² • Đổi đơn vị và bài toán diện tích", pools: (function () { var kp = knowledgePools([
      ["1 ki-lô-mét vuông bằng bao nhiêu héc-ta?", "100 ha", "10 ha", "1 000 ha", "1 km² = 100 ha."],
      ["1 héc-ta bằng bao nhiêu mét vuông?", "10 000 m²", "1 000 m²", "100 000 m²", "1 ha = 10 000 m²."],
      ["1 ki-lô-mét vuông bằng bao nhiêu mét vuông?", "1 000 000 m²", "100 000 m²", "10 000 m²", "1 km² = 1 000 000 m²."],
      ["Đơn vị héc-ta thường dùng để đo diện tích nào?", "Ruộng đất, khu rừng, trang trại", "Diện tích trang vở", "Diện tích mặt bàn", "Héc-ta là đơn vị đo diện tích đất đai quen thuộc."],
      ["Một khu đất hình vuông có cạnh 100 m. Diện tích khu đất là bao nhiêu héc-ta?", "1 ha", "10 ha", "0,1 ha", "100 × 100 = 10 000 m² = 1 ha."],
      ["Sắp xếp tăng dần: 5 000 m²; 1 ha; 2 km². Thứ tự đúng là?", "5 000 m² < 1 ha < 2 km²", "1 ha < 5 000 m² < 2 km²", "2 km² < 1 ha < 5 000 m²", "1 ha = 10 000 m²; 2 km² là lớn nhất."],
      ["Diện tích một tỉnh thường được đo bằng đơn vị nào?", "Ki-lô-mét vuông", "Mi-li-mét vuông", "Xăng-ti-mét vuông", "Đơn vị lớn cho diện tích lớn."],
      ["Một mảnh vườn hình chữ nhật dài 50 m, rộng 20 m. Diện tích mảnh vườn bằng bao nhiêu héc-ta?", "0,1 ha", "1 ha", "10 ha", "50 × 20 = 1 000 m² = 0,1 ha."],
      ["Đổi: 3 km² = ? ha", "300 ha", "30 ha", "3 000 ha", "Nhân với 100: 3 km² = 300 ha."],
      ["Đổi: 45 000 m² = ? ha", "4,5 ha", "45 ha", "0,45 ha", "Chia cho 10 000: 45 000 m² = 4,5 ha."],
      ["Một khu rừng có diện tích 12 km². Khu rừng đó rộng bao nhiêu héc-ta?", "1 200 ha", "120 ha", "12 000 ha", "12 × 100 = 1 200 ha."],
      ["Số đo nào lớn nhất: 0,5 km²; 60 ha; 400 000 m²?", "60 ha (= 0,6 km²)", "0,5 km²", "400 000 m² (= 0,4 km²)", "Đổi về km²: 60 ha = 0,6 km² là lớn nhất."],
      ["Diện tích mặt nước hồ Hoàn Kiếm khoảng 12 ha. Đổi ra mét vuông là?", "120 000 m²", "12 000 m²", "1 200 m²", "12 × 10 000 = 120 000 m²."]
    ], [["1 km²", "100 ha"], ["1 ha", "10 000 m²"], ["1 km²", "1 000 000 m²"], ["100 m × 100 m", "1 ha"]], "Nối đơn vị với giá trị đúng nhé!");
    kp.choose.push(g5AreaConv, g5AreaConv, g5AreaWord);
    kp.blank.push(g5AreaBlank);
    return kp; })() },
  { id: "m5-pheptinh", emoji: "➗", name: "Phép tính với số thập phân", sub: "Cộng, trừ, nhân, chia • Nhân chia với 10, 100, 1 000 và 0,1; 0,01", pools: { choose: [g5DecAddSub, g5DecMul, g5DecDiv, g5DecPow, g5DecAddSub, g5DecMul, g5DecDiv, g5DecPow], blank: [function () { var a = rand(115, 9999), k = pick([10, 100]); return decBlank("Điền kết quả của phép tính!", decStr(a) + " × " + k + " = ?", a * k, "Nhân với " + k + ": chuyển dấu phẩy sang phải."); }, function () { var a = rand(125, 9999), b = rand(115, a - 50); return decBlank("Điền kết quả của phép tính!", decStr(a) + " − " + decStr(b) + " = ?", a - b, "Trừ như số tự nhiên, đặt thẳng cột theo dấu phẩy."); }],
    match: [function () { var prs = [], used = {}; var guard = 0; while (prs.length < 4 && guard++ < 300) { var a = rand(12, 99), k = pick([10, 100, 1000]); var key = a + "x" + k; if (used[key]) continue; used[key] = 1; prs.push([decStr(a * 10) + " × " + fmtN(k), decStr(a * 10 * k)]); } return pairsMatch("Nối phép tính với kết quả đúng nhé!", prs); }],
    games: [factsTF([["Nhân một số thập phân với 10, dấu phẩy chuyển sang phải một chữ số", "Đúng", "Sai", null], ["Chia một số thập phân cho 100, dấu phẩy chuyển sang trái hai chữ số", "Đúng", "Sai", null], ["Nhân với 0,1 cũng giống như nhân với 10", "Sai", "Đúng", null], ["Khi cộng số thập phân, phải đặt các chữ số thẳng cột theo dấu phẩy", "Đúng", "Sai", null]]), factsCatch([["Tính 2,5 × 10 = ?", "25", "2,50", "0,25", "Chuyển dấu phẩy sang phải một chữ số: 25."], ["Tính 48,6 : 10 = ?", "4,86", "486", "48,06", "Chuyển dấu phẩy sang trái một chữ số: 4,86."]])] } },
  { id: "m5-hinhphang", emoji: "📐", name: "Hình phẳng: tam giác, hình thang, hình tròn", sub: "Diện tích hình tam giác, hình thang • Chu vi, diện tích hình tròn (π ≈ 3,14)", pools: { choose: [g5TriArea, g5TrapArea, g5Circle, g5ShapeIdentify, g5TriArea, g5Circle, g5TrapArea], blank: [function () { var r = pick([2, 3, 4, 5, 6, 8, 10]); var q = decBlank("Điền chu vi của hình tròn có bán kính " + r + " cm!", "C = ?", Math.round(r * 2 * 314), "C = r × 2 × 3,14."); q.figure = figCircleSVG(r, "r"); return q; }, function () { var a = rand(4, 20), h = rand(3, 18); var s = a * h / 2; var opts = shuffle([s, a * h, s + a].filter(function (x, i, arr) { return arr.indexOf(x) === i; })); return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền diện tích hình tam giác có đáy " + a + " cm, chiều cao " + h + " cm!", figure: figTriSVG(a, h), blankText: numStr5(s) + " cm²", visual: '<div class="sentence">Đáp án: ' + blankSlot() + "</div>", options: opts.map(function (o) { return { html: '<span class="opt-num">' + numStr5(o) + " cm²</span>" }; }), answer: opts.indexOf(s), cols: 3, explain: "S = (" + a + " × " + h + ") : 2 = " + numStr5(s) + " cm²." }; }],
    match: [function () { return pairsMatch("Nối hình với công thức đúng nhé!", [["Hình tam giác", "S = (a × h) : 2"], ["Hình thang", "S = (a + b) × h : 2"], ["Hình tròn (chu vi)", "C = d × 3,14"], ["Hình tròn (diện tích)", "S = r × r × 3,14"]]); }],
    games: [factsTF([["Đường kính dài gấp đôi bán kính", "Đúng", "Sai", null], ["Diện tích hình tam giác bằng đáy nhân chiều cao", "Sai", "Đúng", null], ["π (pi) lấy gần đúng bằng 3,14", "Đúng", "Sai", null], ["Hình thang có hai cặp cạnh đối diện song song", "Sai", "Đúng", null]]), factsCatch([["Hình tròn có bán kính 10 cm thì đường kính dài bao nhiêu?", "20 cm", "10 cm", "5 cm", "d = r × 2 = 20 cm."], ["Tính diện tích hình tam giác: đáy 6 cm, cao 4 cm?", "12 cm²", "24 cm²", "10 cm²", "(6 × 4) : 2 = 12 cm²."]])] } },
  { id: "m5-tiso", emoji: "⚖️", name: "Tỉ số và tỉ số phần trăm", sub: "Tỉ lệ bản đồ • Tổng – tỉ, hiệu – tỉ • Tỉ số phần trăm • Máy tính cầm tay", pools: (function () { var kp = knowledgePools([
      ["Tỉ số của hai số a và b (b khác 0) là gì?", "Thương của phép chia a cho b", "Tổng của a và b", "Hiệu của a và b", "Tỉ số của a và b là a : b hay a/b."],
      ["Muốn tìm tỉ số phần trăm của hai số, ta làm thế nào?", "Lấy số thứ nhất chia cho số thứ hai, nhân với 100 rồi viết thêm kí hiệu %", "Lấy hai số cộng với 100", "Lấy số lớn trừ số bé rồi thêm %", "Ví dụ: 3 : 4 = 0,75 = 75%."],
      ["25% của 200 là bao nhiêu?", "50", "25", "75", "200 × 25% = 50."],
      ["Một lớp có 40 học sinh, 100% là toàn lớp. 50% của lớp là bao nhiêu học sinh?", "20 học sinh", "40 học sinh", "10 học sinh", "50% của 40 = 20."],
      ["Tỉ lệ bản đồ 1 : 1 000 có nghĩa là gì?", "1 cm trên bản đồ ứng với 1 000 cm ngoài thực tế", "1 cm trên bản đồ ứng với 1 cm thực tế", "Bản đồ to gấp 1 000 lần thực tế", "Tỉ lệ bản đồ cho biết mức thu nhỏ so với thực tế."],
      ["Trong bài toán tổng – tỉ, bước đầu tiên cần tìm là gì?", "Tổng số phần bằng nhau (và giá trị một phần)", "Hiệu hai số", "Tích hai số", "Biết tổng và tỉ số, ta chia tổng cho tổng số phần để tìm giá trị một phần."],
      ["Trong bài toán hiệu – tỉ, giá trị một phần được tìm bằng cách nào?", "Lấy hiệu chia cho hiệu số phần", "Lấy hiệu nhân với tổng số phần", "Lấy hiệu cộng với tỉ số", "Hiệu hai số tương ứng với hiệu số phần."],
      ["Máy tính cầm tay dùng để làm gì trong học Toán?", "Tính toán nhanh và kiểm tra kết quả phép tính", "Vẽ tranh", "Chơi nhạc", "Máy tính cầm tay giúp tính tỉ số phần trăm, các phép tính dài nhanh và đúng hơn."],
      ["Muốn biết một cửa hàng giảm giá 20% thì phải trả bao nhiêu phần trăm giá gốc?", "80%", "20%", "120%", "100% − 20% = 80% giá gốc."],
      ["Tỉ số 3 : 5 đọc và có ý nghĩa thế nào?", "“Ba trên năm” – số thứ nhất bằng 3/5 số thứ hai", "“Năm trên ba”", "Hai số bằng nhau", "Tỉ số 3 : 5 = 3/5."],
      ["Một bản đồ có tỉ lệ 1 : 500 000. Đo trên bản đồ được 2 cm thì ngoài thực tế là bao nhiêu?", "10 km", "1 km", "100 km", "2 × 500 000 = 1 000 000 cm = 10 km."],
      ["Số học sinh nữ là 18, nam là 12. Tỉ số của số học sinh nữ và tổng số học sinh là?", "18/30 = 3/5", "18/12 = 3/2", "12/30 = 2/5", "Tổng số học sinh = 30; tỉ số = 18/30 = 3/5."],
      ["Một số tăng từ 80 lên 100. Số đó tăng bao nhiêu phần trăm?", "25%", "20%", "125%", "Phần tăng = 20; 20 : 80 = 0,25 = 25%."]
    ], [["1/2", "50%"], ["1/4", "25%"], ["3/4", "75%"], ["1/10", "10%"]], "Nối phân số với tỉ số phần trăm nhé!");
    kp.choose.push(g5Ratio, g5Percent, g5SumDiffRatio, g5MapScale);
    kp.games.push(function () { return sortQ("Sắp xếp các tỉ số phần trăm theo thứ tự TĂNG dần!", ["10%", "25%", "50%", "75%", "100%"]); });
    return kp; })() },
  { id: "m5-thetich", emoji: "🧊", name: "Thể tích; hình hộp chữ nhật, hình lập phương", sub: "cm³, dm³, m³ • Diện tích xung quanh, toàn phần và thể tích • Hình khai triển", pools: (function () { var kp = knowledgePools([
      ["Thể tích của một hình là gì?", "Lượng không gian mà hình đó chiếm chỗ", "Diện tích bề mặt của hình", "Chu vi của hình", "Thể tích đo bằng các đơn vị khối: cm³, dm³, m³."],
      ["1 đề-xi-mét khối bằng bao nhiêu xăng-ti-mét khối?", "1 000 cm³", "100 cm³", "10 cm³", "1 dm³ = 1 000 cm³."],
      ["1 mét khối bằng bao nhiêu đề-xi-mét khối?", "1 000 dm³", "100 dm³", "10 000 dm³", "1 m³ = 1 000 dm³."],
      ["Hình hộp chữ nhật có bao nhiêu mặt?", "6 mặt", "4 mặt", "8 mặt", "Hình hộp chữ nhật có 6 mặt, 8 đỉnh, 12 cạnh."],
      ["Hình lập phương có đặc điểm gì?", "Có 6 mặt đều là hình vuông bằng nhau", "Có 6 mặt hình chữ nhật khác nhau", "Có 4 mặt hình vuông", "Tất cả các cạnh của hình lập phương đều bằng nhau."],
      ["Muốn tính thể tích hình hộp chữ nhật, ta làm thế nào?", "Lấy chiều dài nhân chiều rộng rồi nhân chiều cao", "Lấy chiều dài cộng chiều rộng cộng chiều cao", "Lấy diện tích đáy chia chiều cao", "V = a × b × c."],
      ["Muốn tính thể tích hình lập phương, ta làm thế nào?", "Lấy cạnh nhân cạnh nhân cạnh", "Lấy cạnh nhân 6", "Lấy cạnh nhân cạnh", "V = a × a × a."],
      ["Diện tích xung quanh của hình hộp chữ nhật gồm diện tích của những mặt nào?", "4 mặt bên (không gồm 2 mặt đáy)", "Cả 6 mặt", "Chỉ 2 mặt đáy", "Diện tích toàn phần = diện tích xung quanh + diện tích 2 mặt đáy."],
      ["Hình khai triển của hình lập phương gồm bao nhiêu hình vuông?", "6 hình vuông", "4 hình vuông", "8 hình vuông", "Gập 6 hình vuông theo đúng cách sẽ được hình lập phương."],
      ["Một bể nước hình hộp chữ nhật dài 2 m, rộng 1 m, cao 1 m. Thể tích bể là?", "2 m³", "4 m³", "1 m³", "V = 2 × 1 × 1 = 2 m³."],
      ["1 lít bằng bao nhiêu đề-xi-mét khối?", "1 dm³", "1 cm³", "1 m³", "1 lít = 1 dm³ = 1 000 ml."],
      ["Một hộp phấn có thể tích 500 cm³. Đổi ra đề-xi-mét khối là?", "0,5 dm³", "5 dm³", "50 dm³", "500 cm³ = 500 : 1 000 = 0,5 dm³."],
      ["Hình hộp chữ nhật có mấy kích thước?", "3 kích thước: chiều dài, chiều rộng, chiều cao", "2 kích thước", "4 kích thước", "Ba kích thước khác nhau (có thể có hai kích thước bằng nhau)."]
    ], [["1 m³", "1 000 dm³"], ["1 dm³", "1 000 cm³"], ["1 lít", "1 dm³"], ["Hình lập phương", "6 mặt vuông bằng nhau"]], "Nối cho đúng nhé!");
    kp.choose.push(g5Box, g5Cube, g5VolConv, g5Box);
    kp.blank.push(function () { var a = rand(2, 12); return g3NumBlank("Điền thể tích hình lập phương cạnh " + a + " cm!", '<div class="expr">V = ' + blankSlot() + " cm³</div>", a * a * a, 0, 2000); });
    return kp; })() },
  { id: "m5-chuyendong", emoji: "🚗", name: "Số đo thời gian và chuyển động đều", sub: "Cộng trừ nhân chia số đo thời gian • Vận tốc, quãng đường, thời gian (v = s : t)", pools: { choose: [g5TimeMeasure, g5Motion, g5TimeConv, g5TimeMeasure, g5Motion, g5TimeConv, g5Motion], blank: [function () { var v = rand(5, 60), t = rand(2, 9); return g3NumBlank("Điền quãng đường đi được với vận tốc " + v + " km/giờ trong " + t + " giờ!", '<div class="expr">s = ' + blankSlot() + " km</div>", v * t, 0, 600); }, function () { var h = rand(1, 5); return g3NumBlank("Điền số thích hợp vào chỗ trống!", '<div class="expr">' + h + " giờ = " + blankSlot() + " phút</div>", h * 60, 0, 400); }],
    match: [function () { return pairsMatch("Nối công thức với ý đúng nhé!", [["v = s : t", "Tìm vận tốc"], ["s = v × t", "Tìm quãng đường"], ["t = s : v", "Tìm thời gian"], ["1 giờ", "60 phút"]]); }],
    games: [factsTF([["Vận tốc được tính bằng quãng đường chia cho thời gian", "Đúng", "Sai", null], ["60 phút bằng 1 giờ, 1 phút bằng 60 giây", "Đúng", "Sai", null], ["Muốn tìm quãng đường, lấy thời gian chia cho vận tốc", "Sai", "Đúng", null], ["Một người đi nhanh hơn thì vận tốc lớn hơn", "Đúng", "Sai", null]]), factsCatch([["Xe đi 120 km trong 2 giờ. Vận tốc của xe là?", "60 km/giờ", "240 km/giờ", "118 km/giờ", "v = 120 : 2 = 60 km/giờ."], ["Đổi 2 giờ 30 phút ra phút là?", "150 phút", "230 phút", "120 phút", "2 giờ = 120 phút, cộng 30 phút = 150 phút."]])] } },
  { id: "m5-thongke", emoji: "📊", name: "Thống kê và xác suất", sub: "Biểu đồ hình quạt tròn • Tỉ số số lần lặp lại của sự kiện", pools: (function () { var kp = knowledgePools([
      ["Biểu đồ hình quạt tròn cho biết điều gì?", "Tỉ số phần trăm của từng phần so với toàn bộ", "Chiều cao của các cột", "Thứ tự các sự việc theo thời gian", "Cả hình tròn ứng với 100%, mỗi hình quạt ứng với một phần."],
      ["Trong biểu đồ hình quạt, toàn bộ hình tròn ứng với bao nhiêu phần trăm?", "100%", "50%", "360%", "Tổng tỉ số phần trăm của các phần bằng 100%."],
      ["Một hình quạt chiếm nửa hình tròn. Phần đó ứng với bao nhiêu phần trăm?", "50%", "25%", "75%", "Nửa của 100% là 50%."],
      ["Một hình quạt chiếm 1/4 hình tròn. Phần đó ứng với bao nhiêu phần trăm?", "25%", "40%", "20%", "1/4 = 25%."],
      ["Tung đồng xu 20 lần, mặt sấp xuất hiện 11 lần. Tỉ số số lần mặt sấp xuất hiện và tổng số lần tung là?", "11/20", "20/11", "9/20", "Tỉ số = 11 : 20 = 11/20."],
      ["Một sự kiện “chắc chắn xảy ra” có nghĩa là gì?", "Luôn xảy ra trong mọi lần thực hiện", "Không bao giờ xảy ra", "Có thể xảy ra hoặc không", "Ví dụ: Mặt Trời mọc ở phía đông là sự kiện chắc chắn."],
      ["Một sự kiện “không thể xảy ra” là sự kiện nào?", "Tung một con xúc xắc được mặt 8 chấm", "Tung xúc xắc được mặt 3 chấm", "Tung đồng xu được mặt ngửa", "Xúc xắc chỉ có các mặt từ 1 đến 6 chấm."],
      ["Quay vòng quay may mắn 30 lần, có 6 lần trúng ô quà tặng. Tỉ số số lần trúng quà và tổng số lần quay là?", "6/30 = 1/5", "30/6 = 5", "24/30 = 4/5", "Tỉ số = 6 : 30 = 1/5 sau khi rút gọn."],
      ["Vì sao khi thực hiện lặp lại một việc nhiều lần, tỉ số số lần lặp lại của sự kiện gần ổn định hơn?", "Số lần thực hiện càng nhiều, kết quả càng ít bị ngẫu nhiên chi phối", "Vì mọi lần đều cho kết quả giống hệt nhau", "Vì sự kiện tự thay đổi", "Thực nghiệm nhiều lần giúp tỉ số ổn định dần quanh một giá trị."],
      ["Trong biểu đồ hình quạt về sở thích, phần “Bóng đá 45%” cho biết điều gì?", "Có 45% số học sinh được hỏi thích bóng đá", "Có 45 học sinh thích bóng đá", "Bóng đá chiếm 45 hình quạt", "Tỉ số phần trăm luôn so với toàn bộ số người được hỏi."],
      ["Một lớp khảo sát 100 bạn: 30 bạn thích bơi. Tỉ số phần trăm bạn thích bơi là?", "30%", "3%", "70%", "30 : 100 = 30%."],
      ["Khi đọc biểu đồ hình quạt, để biết phần nào lớn nhất ta làm gì?", "So sánh các tỉ số phần trăm, phần có % lớn nhất là lớn nhất", "Đếm số hình quạt", "Nhìn màu sắc đậm nhất", "Phần chiếm % cao nhất tương ứng hình quạt rộng nhất."],
      ["Tổng tỉ số phần trăm của tất cả các phần trong một biểu đồ hình quạt luôn bằng bao nhiêu?", "100%", "90%", "120%", "Các phần ghép lại thành toàn bộ hình tròn = 100%."]
    ], [["Cả hình tròn", "100%"], ["Nửa hình tròn", "50%"], ["1/4 hình tròn", "25%"], ["3/4 hình tròn", "75%"]], "Nối phần hình tròn với tỉ số phần trăm nhé!");
    kp.choose.push(g5Pie, g5Pie, g5EventRatio);
    kp.blank.push(function () { var c = pick([[20, 9], [25, 7], [40, 13], [30, 11], [50, 21]]); return frBlank5("Tung đồng xu " + c[0] + " lần, mặt ngửa xuất hiện " + c[1] + " lần. Điền tỉ số số lần mặt ngửa xuất hiện và tổng số lần tung!", c[1], c[0], "Tỉ số = " + c[1] + " : " + c[0] + " = " + fr5(c[1], c[0]) + "."); });
    return kp; })() }
];
/* ================= TIẾNG VIỆT 5 — theo mạch Luyện từ và câu ================= */
var TV5_TOPICS = [
  topic("tv5-tuloai", "🔤", "Từ loại và đại từ", "Danh từ, động từ, tính từ • Đại từ trong câu", [
    ["Từ nào dưới đây là DANH TỪ?", "học sinh", "học tập chăm chỉ", "xinh đẹp", "“Học sinh” chỉ người nên là danh từ."],
    ["Từ nào dưới đây là ĐỘNG TỪ?", "chạy, nhảy, đọc, viết", "bàn, ghế, sách, vở", "cao, thấp, nhanh, chậm", "Động từ chỉ hoạt động, trạng thái của sự vật."],
    ["Từ nào dưới đây là TÍNH TỪ?", "thông minh, hiền lành", "chạy, bơi, hát", "trường học, lớp học", "Tính từ chỉ đặc điểm, tính chất của sự vật."],
    ["Trong câu “Cô giáo rất tận tâm”, từ “tận tâm” thuộc từ loại nào?", "Tính từ", "Danh từ", "Động từ", "“Tận tâm” chỉ đặc điểm của cô giáo nên là tính từ."],
    ["Trong câu “Bố em là bác sĩ”, từ “bác sĩ” thuộc từ loại nào?", "Danh từ", "Động từ", "Tính từ", "“Bác sĩ” chỉ người làm nghề y nên là danh từ chỉ người."],
    ["Đại từ là gì?", "Từ dùng để xưng hô hoặc thay thế cho danh từ, động từ, tính từ trong câu", "Từ chỉ màu sắc", "Từ chỉ số lượng", "Ví dụ: tôi, bạn, nó, họ, đây, đó... là các đại từ."],
    ["Từ nào dưới đây là đại từ xưng hô?", "tôi, chúng ta, anh ấy", "bàn, ghế, cửa", "đẹp, cao, rộng", "Đại từ xưng hô dùng để gọi tên người trong giao tiếp: tôi, bạn, nó, họ..."],
    ["Trong câu “Lan rất chăm học. Cô ấy luôn đứng đầu lớp”, đại từ “cô ấy” thay thế cho từ nào?", "Lan", "lớp", "học", "“Cô ấy” thay thế cho “Lan” để tránh lặp từ."],
    ["Từ “nó” trong câu “Chiếc cặp này đẹp quá. Nó là quà của mẹ tặng em” thay thế cho từ nào?", "chiếc cặp", "mẹ", "quà sinh nhật của bạn", "“Nó” thay thế cho “chiếc cặp” ở câu trước."],
    ["Nhóm từ nào gồm toàn DANH TỪ chỉ sự vật?", "sông, núi, cây cối, trường học", "chảy, bay, nở, cười", "xanh, đỏ, cao, thấp", "Danh từ là từ chỉ người, vật, hiện tượng, khái niệm."],
    ["Trong câu “Đàn chim bay về tổ”, từ “bay” thuộc từ loại nào?", "Động từ", "Danh từ", "Tính từ", "“Bay” chỉ hoạt động của đàn chim nên là động từ."],
    ["Đại từ nghi vấn trong câu “Ai đang gõ cửa thế?” là từ nào?", "Ai", "đang", "cửa", "“Ai” là đại từ dùng để hỏi về người."],
    ["Vì sao trong văn viết ta nên dùng đại từ thay thế hợp lí?", "Để tránh lặp lại một từ nhiều lần, câu văn gọn và hay hơn", "Để câu văn dài hơn", "Để người đọc khó hiểu hơn", "Dùng đại từ thay thế giúp đoạn văn mạch lạc, không bị lặp từ."]
  ], [["Danh từ", "Chỉ người, vật (học sinh, sông núi)"], ["Động từ", "Chỉ hoạt động (chạy, đọc)"], ["Tính từ", "Chỉ đặc điểm (cao, đẹp)"], ["Đại từ", "Xưng hô, thay thế (tôi, nó)"]], "Nối từ loại với ý đúng nhé!"),
  topic("tv5-dongnghia", "🪞", "Từ đồng nghĩa, trái nghĩa, từ đa nghĩa", "Nhận biết và dùng từ đồng nghĩa, trái nghĩa, đa nghĩa", [
    ["Từ đồng nghĩa với “siêng năng” là từ nào?", "chăm chỉ", "lười biếng", "chậm chạp", "“Siêng năng” và “chăm chỉ” gần nghĩa với nhau."],
    ["Từ trái nghĩa với “kiên trì” là từ nào?", "nản chí (dễ bỏ cuộc)", "bền bỉ", "quyết tâm", "“Kiên trì” >< “nản chí, bỏ dở giữa chừng”."],
    ["Cặp từ nào là cặp từ ĐỒNG NGHĨA?", "lớn – to", "lớn – nhỏ", "cao – thấp", "“Lớn” và “to” cùng chỉ kích thước hơn mức thường."],
    ["Cặp từ nào là cặp từ TRÁI NGHĨA?", "nóng – lạnh", "nóng – oi", "ấm – ấm áp", "Từ trái nghĩa có nghĩa ngược hẳn nhau: nóng >< lạnh."],
    ["Từ đa nghĩa là từ như thế nào?", "Có nhiều nghĩa khác nhau nhưng các nghĩa có liên quan với nhau", "Chỉ có đúng một nghĩa", "Có nghĩa hoàn toàn không liên quan", "Ví dụ: “mũi” – mũi người, mũi thuyền, mũi kim..."],
    ["Trong câu “Mũi thuyền rẽ sóng”, từ “mũi” được dùng với nghĩa nào?", "Phần nhô ra phía trước của thuyền", "Bộ phận để ngửi của người", "Mũi kim khâu", "Đây là nghĩa chuyển của từ “mũi”, vẫn liên quan đến ý “phần nhô ra”."],
    ["Từ đồng nghĩa với “dũng cảm” là từ nào?", "gan dạ", "nhút nhát", "sợ hãi", "“Dũng cảm” ≈ “gan dạ”: không sợ nguy hiểm, khó khăn."],
    ["Từ trái nghĩa với “tiết kiệm” là từ nào?", "lãng phí", "gìn giữ", "chắt chiu", "“Tiết kiệm” >< “lãng phí”."],
    ["Nhóm từ nào đồng nghĩa với “vui vẻ”?", "phấn khởi, hớn hở, rạng rỡ", "buồn bã, ủ rũ", "lo lắng, sợ sệt", "Các từ “phấn khởi, hớn hở” đều gợi niềm vui."],
    ["Trong câu “Em ăn cơm chưa?”, từ “ăn” mang nghĩa gốc là gì?", "Đưa thức ăn vào miệng, nhai và nuốt", "Uống nước", "Nhận lấy cái gì đó", "Nghĩa gốc của “ăn” là hoạt động ăn uống; “ăn ảnh, ăn gian” là nghĩa chuyển."],
    ["Từ “chân” trong “chân bàn” có quan hệ gì với “chân” trong “chân người”?", "Là nghĩa chuyển, vì chân bàn cũng là bộ phận ở dưới để đỡ vật", "Hoàn toàn không liên quan", "Là hai từ khác nhau viết giống nhau", "Từ đa nghĩa: các nghĩa vẫn có nét nghĩa chung."],
    ["Dùng từ đồng nghĩa phù hợp giúp câu văn thế nào?", "Sinh động, tránh lặp từ, diễn đạt chính xác sắc thái nghĩa", "Dài dòng, khó hiểu", "Không thay đổi gì", "Mỗi từ đồng nghĩa có sắc thái riêng, chọn đúng từ sẽ hay hơn."],
    ["Từ trái nghĩa với “đoàn kết” là từ nào?", "chia rẽ", "gắn bó", "đồng lòng", "“Đoàn kết” >< “chia rẽ”."]
  ], [["Đồng nghĩa", "Nghĩa giống nhau (lớn – to)"], ["Trái nghĩa", "Nghĩa ngược nhau (nóng – lạnh)"], ["Đa nghĩa", "Một từ, nhiều nghĩa có liên quan"], ["Nghĩa gốc", "Nghĩa đầu tiên của từ"]], "Nối khái niệm với ý đúng nhé!"),
  topic("tv5-caughep", "🧩", "Câu đơn, câu ghép và kết từ", "Câu ghép, cách nối các vế câu, kết từ", [
    ["Câu ghép là câu như thế nào?", "Có từ hai cụm chủ – vị (vế câu) trở lên ghép lại", "Chỉ có một chủ ngữ, một vị ngữ", "Không có chủ ngữ", "Mỗi vế của câu ghép có cấu tạo như một câu đơn."],
    ["Câu nào dưới đây là CÂU GHÉP?", "Trời mưa to nên đường rất trơn.", "Trời mưa to.", "Đường rất trơn.", "Câu có hai vế: “Trời mưa to” và “đường rất trơn”, nối bằng “nên”."],
    ["Các vế trong câu ghép có thể được nối với nhau bằng cách nào?", "Bằng kết từ hoặc bằng dấu câu (dấu phẩy, dấu chấm phẩy)", "Chỉ bằng dấu chấm", "Không cần nối", "Ví dụ: “Mẹ đi chợ, em ở nhà học bài” – nối bằng dấu phẩy."],
    ["Kết từ trong câu “Vì trời mưa nên em mang theo ô” là cặp từ nào?", "Vì ... nên ...", "trời ... mưa", "em ... ô", "Cặp kết từ “vì... nên...” chỉ quan hệ nguyên nhân – kết quả."],
    ["Cặp kết từ nào chỉ quan hệ điều kiện – kết quả?", "Nếu ... thì ...", "Tuy ... nhưng ...", "Vừa ... đã ...", "“Nếu... thì...”: vế đầu nêu điều kiện, vế sau nêu kết quả."],
    ["Cặp kết từ “tuy ... nhưng ...” chỉ quan hệ gì giữa hai vế câu?", "Tương phản (đối lập)", "Nguyên nhân – kết quả", "Tăng tiến", "“Tuy nhà xa nhưng bạn Nam vẫn đi học đúng giờ” – hai vế tương phản."],
    ["Điền kết từ thích hợp: “... em chăm học ... em đạt kết quả cao.”", "Vì ... nên ...", "Tuy ... nhưng ...", "Không những ... mà còn ...", "Vế đầu là nguyên nhân, vế sau là kết quả: dùng “vì... nên...”."],
    ["Câu “Bạn Hoa hát hay, nhảy cũng đẹp” có mấy vế câu?", "Hai vế", "Một vế", "Ba vế", "Vế 1: Bạn Hoa hát hay; vế 2: (bạn Hoa) nhảy cũng đẹp."],
    ["Trong câu ghép “Nắng vừa lên, sương đã tan”, quan hệ giữa hai vế là gì?", "Tiếp nối theo thời gian", "Nguyên nhân – kết quả", "Tương phản", "“Vừa... đã...” diễn tả hai việc nối tiếp nhau rất nhanh."],
    ["Kết từ “và, rồi, thì, mà” thường dùng để làm gì trong câu ghép?", "Nối các vế câu có quan hệ gần gũi, tiếp nối", "Chấm dứt câu", "Tạo câu hỏi", "Đây là những kết từ nối phổ biến trong câu ghép."],
    ["Câu nào là CÂU ĐƠN?", "Con mèo đang ngủ trên hiên nhà.", "Con mèo ngủ, còn con chó chạy ra sân.", "Vì mưa nên mèo trốn trong nhà.", "Câu đơn chỉ có một cụm chủ – vị."],
    ["Khi hai vế câu ghép có quan hệ nguyên nhân – kết quả, ta có thể dùng cặp kết từ nào?", "Bởi vì ... cho nên ...", "Không những ... mà còn ...", "Ngày càng ... càng ...", "“Bởi vì... cho nên...” là cặp kết từ chỉ nguyên nhân – kết quả."],
    ["Vế câu “mà em vẫn cố gắng hoàn thành bài” cần vế đầu nào để tạo câu ghép có quan hệ tương phản?", "Dù bài tập rất khó", "Vì bài tập rất dễ", "Nếu bài tập khó", "“Dù... vẫn...” là quan hệ tương phản (nhượng bộ)."]
  ], [["Câu đơn", "Một cụm chủ – vị"], ["Câu ghép", "Từ hai vế câu trở lên"], ["Kết từ", "Nối các vế câu (và, nên, nhưng)"], ["Vế câu", "Một cụm chủ – vị trong câu ghép"]], "Nối khái niệm với ý đúng nhé!"),
  topic("tv5-lienket", "🔗", "Liên kết câu trong đoạn văn; điệp từ, điệp ngữ", "Lặp từ ngữ • Từ ngữ nối • Từ ngữ thay thế • Điệp từ, điệp ngữ", [
    ["Liên kết câu trong đoạn văn là gì?", "Mối quan hệ gắn bó giữa các câu, làm cho đoạn văn mạch lạc, rõ ý", "Việc các câu đứng riêng lẻ", "Việc dùng nhiều dấu chấm", "Các câu trong đoạn phải liên kết với nhau về nội dung và hình thức."],
    ["Biện pháp lặp từ ngữ để liên kết câu là gì?", "Lặp lại ở câu đứng sau một từ ngữ đã có ở câu đứng trước", "Dùng một từ hoàn toàn mới", "Xoá hết các từ trùng nhau", "Ví dụ: “Cây đa đứng uy nghi. Cây đa là chứng nhân của làng.”"],
    ["Từ ngữ nào dưới đây có tác dụng NỐI hai câu trong đoạn văn?", "sau đó, tiếp theo, tuy nhiên, vì vậy", "cây, bàn, sông, núi", "đẹp, cao, xanh, đỏ", "Từ ngữ nối (sau đó, nhưng, vì thế...) giúp các câu liên kết mạch lạc."],
    ["Dùng từ ngữ thay thế để liên kết câu là dùng từ như thế nào?", "Dùng đại từ hoặc từ đồng nghĩa thay cho từ đã dùng ở câu trước", "Lặp nguyên văn cả câu trước", "Dùng từ không liên quan", "Ví dụ: “Bác Hồ rất yêu thiếu nhi. Người luôn dành cho các cháu tình thương đặc biệt.”"],
    ["Trong hai câu “Hùng rất thích đá bóng. Cậu ấy là đội trưởng của lớp”, cách liên kết được dùng là gì?", "Thay thế bằng đại từ “cậu ấy”", "Lặp từ ngữ", "Dùng từ ngữ nối", "“Cậu ấy” thay thế cho “Hùng”."],
    ["Điệp từ, điệp ngữ là biện pháp tu từ gì?", "Lặp lại một từ hoặc một cụm từ để nhấn mạnh ý, tạo nhịp điệu", "Dùng từ khó hiểu", "Rút gọn câu", "Ví dụ: “Học, học nữa, học mãi.”"],
    ["Câu thơ “Trăng ơi... từ đâu đến? Trăng ơi...” dùng biện pháp nào?", "Điệp ngữ “Trăng ơi”", "Nhân hoá", "So sánh", "Cụm từ “Trăng ơi” được lặp lại để nhấn mạnh cảm xúc."],
    ["Đoạn văn sau dùng cách liên kết nào là chính: “Quê em có dòng sông xanh. Dòng sông ấy ôm lấy làng em.”?", "Lặp từ ngữ (“dòng sông”)", "Từ ngữ nối", "Thay thế bằng đại từ", "Từ “dòng sông” được lặp lại ở câu sau."],
    ["Từ ngữ nối “Tuy nhiên” thường diễn tả quan hệ gì giữa hai câu?", "Tương phản, đối lập ý", "Tiếp nối thời gian", "Nguyên nhân – kết quả", "“Trời nắng đẹp. Tuy nhiên, gió vẫn lạnh.”"],
    ["Vì sao một đoạn văn cần có sự liên kết giữa các câu?", "Để đoạn văn thống nhất, dễ hiểu, người đọc theo dõi được ý", "Để đoạn văn dài hơn", "Để có nhiều câu hơn", "Thiếu liên kết, đoạn văn rời rạc, khó hiểu."],
    ["Trong đoạn “Mẹ em dậy sớm. Mẹ nấu cơm, rồi chuẩn bị đồ cho em đi học”, từ nào được lặp để liên kết?", "Từ “Mẹ”", "Từ “sớm”", "Từ “cơm”", "Lặp từ “Mẹ” ở hai câu liên tiếp."],
    ["Biện pháp điệp ngữ trong câu “Chúng ta phải bảo vệ môi trường, bảo vệ môi trường sống của chính mình” có tác dụng gì?", "Nhấn mạnh ý phải bảo vệ môi trường", "Làm câu dài thêm vô ích", "Thay đổi hoàn toàn ý câu", "Điệp ngữ giúp nhấn mạnh, gây ấn tượng với người đọc."],
    ["Câu thứ hai nối với câu thứ nhất bằng từ ngữ nối trong đoạn nào?", "Hôm nay trời đẹp. Vì vậy, cả lớp rủ nhau đi dã ngoại.", "Hôm nay trời đẹp. Trời đẹp thật.", "Hôm nay trời đẹp. Cả lớp rất vui.", "“Vì vậy” là từ ngữ nối chỉ kết quả."]
  ], [["Lặp từ ngữ", "Lặp lại từ ở câu trước"], ["Từ ngữ nối", "Sau đó, vì vậy, tuy nhiên"], ["Thay thế", "Dùng đại từ, từ đồng nghĩa"], ["Điệp từ, điệp ngữ", "Lặp lại để nhấn mạnh"]], "Nối cách liên kết với ý đúng nhé!"),
  topic("tv5-chinhta", "✒️", "Chính tả và dấu câu", "Dấu gạch ngang • Từ điển • Viết hoa • Tên người, tên địa lí nước ngoài", [
    ["Dấu gạch ngang trong câu thường dùng để làm gì?", "Đánh dấu lời nói trực tiếp, liệt kê, hoặc nối các từ trong một liên danh", "Kết thúc câu", "Thay cho dấu chấm hỏi", "Ví dụ: — Mẹ ơi, con đi học! (đánh dấu lời nói bắt đầu)."],
    ["Khi viết lời nói trực tiếp của nhân vật ở đầu câu, em dùng dấu nào?", "Dấu gạch ngang", "Dấu chấm", "Dấu phẩy", "Lời nói trực tiếp thường bắt đầu bằng dấu gạch ngang đặt ở đầu dòng."],
    ["Muốn tra nghĩa của một từ khó, em sử dụng cuốn sách nào?", "Từ điển tiếng Việt", "Sách toán", "Truyện tranh", "Từ điển giải thích nghĩa của từ và cách dùng từ."],
    ["Trong từ điển, các từ được sắp xếp theo thứ tự nào?", "Theo thứ tự bảng chữ cái (a, b, c...)", "Theo độ dài của từ", "Theo chủ đề ngẫu nhiên", "Tra từ điển cần biết thứ tự chữ cái để tìm nhanh."],
    ["Trường hợp nào viết hoa danh từ chung để thể hiện sự tôn trọng đặc biệt?", "Khi nói về Bác Hồ: “Người”, “Bác” trong văn bản trang trọng", "Mọi danh từ chung đều viết hoa", "Chỉ viết hoa ở cuối câu", "Ví dụ: “Bác vẫn khỏe” – viết hoa “Bác” để tỏ lòng kính trọng."],
    ["Tên người nước ngoài được phiên âm viết như thế nào? Ví dụ tên nhà bác học Pháp “Louis Pasteur”", "Lu-i Pa-xtơ (các tiếng nối bằng dấu gạch ngang, viết hoa tiếng đầu)", "LUI PAXTO viết liền", "lu-i pa-xtơ viết thường hết", "Tên người nước ngoài phiên âm: viết hoa chữ đầu mỗi tiếng, nối bằng gạch ngang."],
    ["Tên địa lí nước ngoài “Paris” được viết theo quy định nào khi dùng trong tiếng Việt?", "Viết theo dạng phiên âm hoặc giữ nguyên dạng quen thuộc (Pa-ri / Paris)", "Viết thường toàn bộ", "Bỏ qua không viết", "Tên địa lí nước ngoài thường được phiên âm: Pa-ri, Luân Đôn, Niu Oóc..."],
    ["Câu nào viết đúng dấu gạch ngang để liệt kê?", "Đồ dùng học tập gồm: sách – vở – bút – thước.", "Đồ dùng học tập gồm_ sách, vở, bút.", "Đồ dùng. Học tập gồm sách vở bút", "Dấu gạch ngang có thể dùng để liệt kê, tách các ý song song."],
    ["Dấu gạch ngang khác dấu gạch nối ở điểm nào?", "Gạch ngang dài hơn, tách các thành phần câu; gạch nối ngắn hơn, nối các tiếng trong từ mượn/phiên âm", "Hai dấu hoàn toàn giống nhau", "Gạch nối dùng ở cuối câu", "Ví dụ: “cà-phê” dùng gạch nối; liệt kê dùng gạch ngang."],
    ["Khi tra từ điển và gặp từ có nhiều nghĩa, em cần làm gì?", "Đọc hết các nghĩa và chọn nghĩa phù hợp với văn cảnh", "Chỉ lấy nghĩa đầu tiên gặp", "Bỏ qua từ đó", "Từ đa nghĩa cần chọn nghĩa đúng theo câu văn cụ thể."],
    ["Cụm từ nào được viết hoa đúng để tỏ sự tôn trọng khi viết về Bác Hồ?", "“Người là niềm tin của cả dân tộc”", "“người là niềm tin”", "“NGƯỜI LÀ” viết in toàn bộ", "Viết hoa một cách đặc biệt thể hiện thái độ tôn kính."],
    ["Tên nhà khoa học nước ngoài “Marie Curie” viết phiên âm đúng là?", "Ma-ri Quy-ri", "marie curie", "MA-RI QUY-RI", "Tên riêng nước ngoài: viết hoa chữ cái đầu mỗi tiếng, các tiếng nối bằng gạch ngang."],
    ["Dấu gạch ngang trong câu “Hà Nội – Huế – Sài Gòn là ba thành phố lớn” có tác dụng gì?", "Nối các từ trong một liên danh (liệt kê ngang hàng)", "Đánh dấu lời nói", "Kết thúc câu", "Gạch ngang nối các tên gọi cùng loại trong một cụm liệt kê."]
  ], [["Dấu gạch ngang", "Lời nói trực tiếp, liệt kê, liên danh"], ["Từ điển", "Tra nghĩa và cách dùng từ"], ["Viết hoa tôn trọng", "Bác, Người (nói về Bác Hồ)"], ["Phiên âm tên nước ngoài", "Ma-ri Quy-ri, Pa-ri"]], "Nối nội dung với ý đúng nhé!"),
  topic("tv5-tungu", "🎨", "Từ ngữ theo 8 chủ đề bài đọc", "Thế giới tuổi thơ • Thiên nhiên kì thú • Học tập • Nghệ thuật • Cuộc sống • Hương sắc trăm miền • Tiếp bước cha ông • Thế giới của chúng ta", [
    ["Chủ đề “Thế giới tuổi thơ” thường có những từ ngữ nào?", "trò chơi, bạn bè, hồn nhiên, vui đùa", "chiến tranh, gian khổ", "máy móc, nhà xưởng", "Tuổi thơ gắn với sự hồn nhiên, trong sáng, vui chơi cùng bạn bè."],
    ["Nhóm từ nào thuộc chủ đề “Thiên nhiên kì thú”?", "kì vĩ, hùng vĩ, bí ẩn, hoang sơ", "nhộn nhịp, ồn ào, chen chúc", "bàn ghế, sách vở, bảng đen", "Thiên nhiên kì thú là vẻ đẹp lạ lùng, hùng vĩ của thiên nhiên."],
    ["Từ ngữ nào thuộc chủ đề “Trên con đường học tập”?", "chăm chỉ, say mê, khám phá tri thức", "chán nản, bỏ cuộc", "ngủ quên, đi trễ", "Học tập cần chăm chỉ, say mê và ham hiểu biết."],
    ["Chủ đề “Nghệ thuật muôn màu” nhắc tới những lĩnh vực nào?", "âm nhạc, hội hoạ, múa, sân khấu, văn chương", "nông nghiệp, chăn nuôi", "giao thông, xây dựng", "Nghệ thuật muôn màu: nhiều loại hình nghệ thuật phong phú."],
    ["Từ “hương sắc trăm miền” trong tên chủ đề gợi điều gì?", "Vẻ đẹp, đặc sản phong phú của nhiều vùng đất nước", "Mùi thơm của một loài hoa", "Màu sắc của một bức tranh", "“Trăm miền” chỉ nhiều vùng miền của Tổ quốc."],
    ["Chủ đề “Tiếp bước cha ông” gợi nhắc điều gì?", "Noi gương, tiếp nối truyền thống tốt đẹp của thế hệ trước", "Đi theo dấu chân cha ông đúng nghĩa đen", "Quên hết truyền thống", "Tiếp bước cha ông là phát huy truyền thống của dân tộc."],
    ["Nhóm từ nào thuộc chủ đề “Vẻ đẹp cuộc sống”?", "yêu thương, sẻ chia, niềm vui, hạnh phúc", "bon chen, đố kị", "buồn chán, thất vọng", "Vẻ đẹp cuộc sống đến từ tình yêu thương và sự sẻ chia."],
    ["Chủ đề “Thế giới của chúng ta” khuyến khích em điều gì?", "Quan tâm đến các vấn đề chung: môi trường, hoà bình, bạn bè năm châu", "Chỉ lo việc của riêng mình", "Không cần biết chuyện thế giới", "Chúng ta là công dân của một thế giới chung."],
    ["Từ đồng nghĩa với “kì thú” trong “Thiên nhiên kì thú” là từ nào?", "kì lạ, thú vị", "quen thuộc", "tẻ nhạt", "“Kì thú” = lạ lùng và hấp dẫn."],
    ["Từ ngữ nào tả đúng tâm thế của người nghệ sĩ trong chủ đề “Nghệ thuật muôn màu”?", "say mê, sáng tạo, tài hoa", "thờ ơ, qua loa", "sợ hãi, rụt rè", "Nghệ sĩ sáng tạo bằng niềm say mê và tài năng."],
    ["Cụm từ “hương sắc” thuộc chủ đề nào khi nói về các lễ hội, món ăn đặc trưng của từng vùng?", "Hương sắc trăm miền", "Thế giới tuổi thơ", "Tiếp bước cha ông", "Hương sắc trăm miền: vẻ đẹp riêng của mỗi vùng quê."],
    ["Từ ngữ nào KHÔNG thuộc chủ đề “Trên con đường học tập”?", "lười biếng, chểnh mảng", "nỗ lực, kiên trì", "ham học, sáng tạo", "Lười biếng đi ngược lại tinh thần học tập."],
    ["Chủ đề nào gắn với hình ảnh các anh hùng, truyền thống yêu nước của dân tộc?", "Tiếp bước cha ông", "Thế giới tuổi thơ", "Nghệ thuật muôn màu", "Tiếp bước cha ông: nhớ ơn và noi theo thế hệ đi trước."]
  ], [["Thế giới tuổi thơ", "Hồn nhiên, vui chơi"], ["Thiên nhiên kì thú", "Hùng vĩ, bí ẩn"], ["Hương sắc trăm miền", "Đặc sắc các vùng quê"], ["Tiếp bước cha ông", "Noi gương người đi trước"]], "Nối chủ đề với ý đúng nhé!"),
  topic("tv5-dochieu", "📖", "Đọc hiểu: những bài nổi tiếng", "Sơn Đoòng • Thư gửi các học sinh • Dế Mèn • Hạt gạo làng ta • Văn Miếu • Danh y Tuệ Tĩnh", [
    ["Hang Sơn Đoòng nổi tiếng thế giới vì điều gì?", "Là hang động tự nhiên lớn nhất thế giới, nằm ở tỉnh Quảng Bình", "Hang nhân tạo lớn nhất Việt Nam", "Nơi có bãi biển đẹp nhất", "Sơn Đoòng thuộc Vườn quốc gia Phong Nha – Kẻ Bàng (Quảng Bình)."],
    ["“Thư gửi các học sinh” là của ai viết, gửi nhân dịp nào?", "Bác Hồ viết, nhân ngày khai trường đầu tiên của nước Việt Nam độc lập (1945)", "Một thầy giáo viết cuối năm học", "Bác Hồ viết vào ngày Tết", "Trong thư, Bác căn dặn học sinh chăm học để xây dựng đất nước."],
    ["Câu nói nổi tiếng trong thư của Bác Hồ: Non sông Việt Nam có trở nên tươi đẹp hay không... “chính là nhờ một phần lớn ở công học tập của các em” nhắc học sinh điều gì?", "Phải ra sức học tập để xây dựng đất nước", "Chỉ cần vui chơi", "Không cần đến trường", "Bác đặt niềm tin vào thế hệ học sinh."],
    ["Tác phẩm “Dế Mèn phiêu lưu kí” là của nhà văn nào?", "Tô Hoài", "Trần Đăng Khoa", "Nguyễn Nhật Ánh", "“Dế Mèn phiêu lưu kí” (1941) là tác phẩm nổi tiếng của nhà văn Tô Hoài."],
    ["Nhân vật chính trong “Dế Mèn phiêu lưu kí” là ai?", "Chú Dế Mèn ưa phiêu lưu, ban đầu kiêu căng rồi dần trưởng thành", "Một chú thỏ nhút nhát", "Một con mèo lười", "Qua các chuyến đi, Dế Mèn học được nhiều bài học về lòng nhân ái."],
    ["Bài thơ “Hạt gạo làng ta” là sáng tác của ai?", "Trần Đăng Khoa", "Tô Hoài", "Xuân Quỳnh", "Trần Đăng Khoa viết bài thơ khi còn là “thần đồng thơ” nhỏ tuổi."],
    ["Bài thơ “Hạt gạo làng ta” ca ngợi điều gì?", "Giá trị của hạt gạo và công sức của người nông dân lao động", "Vẻ đẹp của trăng rằm", "Trò chơi dân gian", "Qua hình ảnh hạt gạo, bài thơ nhắc ta biết ơn người làm ra thóc gạo."],
    ["Câu thơ “Hạt gạo làng ta / Có vị phù sa / Của sông Kinh Thầy” nói lên điều gì?", "Hạt gạo thấm đượm công sức con người và hồn quê hương", "Hạt gạo chỉ là thức ăn bình thường", "Hạt gạo được nhập từ nước ngoài", "Thể hiện tình yêu quê hương qua hình ảnh gần gũi."],
    ["Bài “Nghìn năm văn hiến” giới thiệu về di tích nào?", "Văn Miếu – Quốc Tử Giám ở Hà Nội", "Cố đô Huế", "Phố cổ Hội An", "Văn Miếu là trường đại học đầu tiên của nước ta, biểu tượng của truyền thống hiếu học."],
    ["Văn Miếu – Quốc Tử Giám gắn với truyền thống tốt đẹp nào của dân tộc?", "Hiếu học, tôn sư trọng đạo", "Đánh giặc giữ nước", "Buôn bán sầm uất", "Hằng năm, nhiều học sinh đến Văn Miếu để cầu mong học hành tiến bộ."],
    ["Tuệ Tĩnh được tôn vinh là ai trong lịch sử y học Việt Nam?", "Danh y, ông tổ của nền y dược cổ truyền Việt Nam", "Danh tướng thời Trần", "Nhà thơ nổi tiếng", "Tuệ Tĩnh (thời Trần) để lại nhiều sách thuốc quý, chủ trương “Nam dược trị Nam nhân”."],
    ["Chủ trương nổi tiếng của danh y Tuệ Tĩnh là gì?", "“Nam dược trị Nam nhân” – dùng thuốc Nam chữa bệnh cho người Nam", "Chỉ dùng thuốc nhập ngoại", "Không cần dùng thuốc", "Ông khuyến khích dùng cây thuốc sẵn có trong nước."],
    ["Hang Sơn Đoòng được phát hiện và khám phá rộng rãi trong thời gian nào?", "Được người dân địa phương phát hiện lại năm 1990, đoàn thám hiểm Anh – Việt khám phá năm 2009", "Thời nhà Nguyễn", "Năm 1945", "Sơn Đoòng trở thành điểm du lịch thám hiểm nổi tiếng của Việt Nam."]
  ], [["Sơn Đoòng", "Hang tự nhiên lớn nhất thế giới"], ["Tô Hoài", "Dế Mèn phiêu lưu kí"], ["Trần Đăng Khoa", "Hạt gạo làng ta"], ["Tuệ Tĩnh", "Danh y, “Nam dược trị Nam nhân”"]], "Nối cho đúng nhé!")
];
/* ================= TIẾNG ANH 5 — Global Success ================= */
var UNITS5 = [
  { n: 0, title: "Starter", words: [["Monday", "📅", "thứ Hai"], ["maths", "🔢", "môn toán"], ["English", "🔤", "tiếng Anh"], ["art", "🎨", "mĩ thuật"], ["music", "🎵", "âm nhạc"], ["school", "🏫", "trường học"], ["friend", "🧑‍🤝‍🧑", "bạn"], ["teacher", "👩‍🏫", "thầy, cô giáo"], ["book", "📕", "quyển sách"], ["pencil", "✏️", "bút chì"]],
    patterns: [{ q: "What's your favourite subject? — It's …", a: "maths", w: ["maths", "Monday", "school"] }, { q: "What day is it today? — It's …", a: "Monday", w: ["Monday", "music", "art"] }, { q: "Hello! I'm … . I'm in Class 5A.", a: "Minh", w: ["Minh", "maths", "book"] }],
    stress: [["teacher", 1, "TEACH-er"], ["pencil", 1, "PEN-cil"]] },
  { n: 1, title: "All about me!", words: [["city", "🏙️", "thành phố"], ["class", "🏫", "lớp học"], ["countryside", "🌾", "nông thôn, vùng quê"], ["dolphin", "🐬", "cá heo"], ["pink", "🩷", "màu hồng"], ["sandwich", "🥪", "bánh mì kẹp"], ["table tennis", "🏓", "bóng bàn"]],
    patterns: [{ q: "Can you tell me about yourself? — I live in the …", a: "countryside", w: ["countryside", "city", "dolphin"] }, { q: "What's your favourite animal? — It's the …", a: "dolphin", w: ["dolphin", "sandwich", "pink"] }, { q: "What's your favourite sport? — It's …", a: "table tennis", w: ["table tennis", "sandwich", "city"] }],
    stress: [["dolphin", 1, "DOL-phin"], ["sandwich", 1, "SAND-wich"], ["countryside", 1, "COUN-try-side"]] },
  { n: 2, title: "Our homes", words: [["building", "🏢", "toà nhà"], ["flat", "🏠", "căn hộ"], ["house", "🏡", "ngôi nhà"], ["tower", "🗼", "toà tháp"], ["twenty-three", "🔢", "hai mươi ba (23)"], ["thirty-eight", "🔢", "ba mươi tám (38)"], ["ninety-three", "🔢", "chín mươi ba (93)"], ["one hundred and sixteen", "🔢", "một trăm mười sáu (116)"]],
    patterns: [{ q: "Do you live in that …? — Yes, I do.", a: "tower", w: ["tower", "flat", "sandwich"] }, { q: "What's your address? — It's … Nguyen Trai Street.", a: "38", w: ["38", "23", "93"] }, { q: "Do you live in this …? — No, I don't. I live in a flat.", a: "house", w: ["house", "tower", "building"] }],
    stress: [["building", 1, "BUIL-ding"], ["tower", 1, "TOW-er"]] },
  { n: 3, title: "My foreign friends", words: [["American", "🇺🇸", "người Mỹ"], ["Australian", "🇦🇺", "người Úc"], ["Japanese", "🇯🇵", "người Nhật"], ["Malaysian", "🇲🇾", "người Malaysia"], ["active", "🏃", "năng động"], ["clever", "🧠", "thông minh"], ["friendly", "😊", "thân thiện"], ["helpful", "🤝", "hay giúp đỡ người khác"]],
    patterns: [{ q: "What nationality is he? — He's …", a: "Japanese", w: ["Japanese", "American", "friendly"] }, { q: "What's she like? — She's …", a: "friendly", w: ["friendly", "clever", "Japanese"] }, { q: "What nationality is she? — She's …", a: "American", w: ["American", "Australian", "active"] }],
    stress: [["American", 2, "a-MER-i-can"], ["Japanese", 3, "Ja-pa-NESE"], ["friendly", 1, "FRIEND-ly"]] },
  { n: 4, title: "Our free-time activities", words: [["go for a walk", "🚶", "đi dạo"], ["play the violin", "🎻", "chơi đàn vi-ô-lông"], ["surf the Internet", "🌐", "lướt mạng Internet"], ["water the flowers", "🌷", "tưới hoa"], ["always", "🟢", "luôn luôn"], ["often", "🔵", "thường"], ["sometimes", "🟡", "đôi khi"], ["usually", "🔷", "thường thường"]],
    patterns: [{ q: "What do you like doing in your free time? — I like to …", a: "surf the Internet", w: ["surf the Internet", "water the flowers", "play the violin"] }, { q: "How often do you play the violin? — I … play it after school.", a: "always", w: ["always", "sometimes", "often"] }, { q: "What does she like doing in her free time? — She likes to …", a: "go for a walk", w: ["go for a walk", "water the flowers", "surf the Internet"] }],
    stress: [["Internet", 1, "IN-ter-net"], ["violin", 3, "vi-o-LIN"]] },
  { n: 5, title: "My future job", words: [["firefighter", "🧑‍🚒", "lính cứu hoả"], ["gardener", "🧑‍🌾", "người làm vườn"], ["reporter", "🎤", "phóng viên"], ["writer", "✍️", "nhà văn"], ["future", "🔮", "tương lai"], ["grow flowers", "🌷", "trồng hoa"], ["report the news", "📰", "đưa tin, tường thuật tin tức"], ["teach children", "👩‍🏫", "dạy trẻ em"], ["write stories", "📖", "viết truyện"]],
    patterns: [{ q: "What would you like to be in the future? — I'd like to be a …", a: "firefighter", w: ["firefighter", "gardener", "future"] }, { q: "What would you like to be? — I'd like to be a …", a: "writer", w: ["writer", "reporter", "firefighter"] }, { q: "Would you like to be a … in the future? — Yes, I would.", a: "gardener", w: ["gardener", "writer", "reporter"] }, { q: "Why would you like to be a writer? — Because I'd like to …", a: "write stories", w: ["write stories", "report the news", "grow flowers"] }, { q: "Why would you like to be a gardener? — Because I'd like to …", a: "grow flowers", w: ["grow flowers", "teach children", "write stories"] }],
    stress: [["reporter", 2, "re-PORT-er"], ["firefighter", 1, "FIRE-fight-er"]] },
  { n: 6, title: "Our school rooms", words: [["first floor", "1️⃣", "tầng một"], ["ground floor", "🏢", "tầng trệt"], ["second floor", "2️⃣", "tầng hai"], ["third floor", "3️⃣", "tầng ba"], ["go along", "➡️", "đi dọc theo"], ["go downstairs", "⬇️", "đi xuống cầu thang"], ["go past", "🚶", "đi qua"], ["go upstairs", "⬆️", "đi lên cầu thang"]],
    patterns: [{ q: "Where's the computer room? — It's on the … floor.", a: "second", w: ["second", "ground", "first"] }, { q: "Could you tell me the way to the music room? — …, please.", a: "Go upstairs", w: ["Go upstairs", "Go downstairs", "Go past"] }, { q: "Where's the library? — It's on the … floor.", a: "third", w: ["third", "first", "ground"] }],
    stress: [["upstairs", 2, "up-STAIRS"], ["downstairs", 2, "down-STAIRS"]] },
  { n: 7, title: "Our favourite school activities", words: [["do projects", "📊", "làm dự án"], ["play games", "🎲", "chơi trò chơi"], ["read books", "📚", "đọc sách"], ["solve maths problems", "🧮", "giải bài toán"], ["fun", "😄", "vui"], ["interesting", "🤔", "thú vị"], ["useful", "✅", "hữu ích"], ["good for group work", "👥", "tốt cho làm việc nhóm"]],
    patterns: [{ q: "Why does he like doing projects? — Because he thinks it's …", a: "interesting", w: ["interesting", "useful", "fun"] }, { q: "What does she like doing at school? — She likes to …", a: "read books", w: ["read books", "play games", "do projects"] }, { q: "Why do you like solving maths problems? — Because I think it's …", a: "useful", w: ["useful", "interesting", "fun"] }],
    stress: [["interesting", 1, "IN-ter-est-ing"], ["useful", 1, "USE-ful"]] },
  { n: 8, title: "In our classroom", words: [["above", "⬆️", "ở phía trên"], ["beside", "↔️", "ở bên cạnh"], ["in front of", "🔜", "ở phía trước"], ["under", "⬇️", "ở phía dưới"], ["crayon", "🖍️", "bút sáp màu"], ["glue stick", "🧴", "keo dán, hồ dán"], ["pencil sharpener", "✏️", "cái gọt bút chì"], ["set square", "📐", "thước ê-ke"]],
    patterns: [{ q: "Where are the crayons? — They're … the desk.", a: "under", w: ["under", "above", "beside"] }, { q: "Whose … is this? — It's Mai's.", a: "glue stick", w: ["glue stick", "crayon", "set square"] }, { q: "Where's the book? — It's … the bag.", a: "beside", w: ["beside", "under", "above"] }],
    stress: [["above", 2, "a-BOVE"], ["crayon", 1, "CRAY-on"]] },
  { n: 9, title: "Our outdoor activities", words: [["aquarium", "🐠", "thuỷ cung"], ["campsite", "🏕️", "khu cắm trại"], ["funfair", "🎡", "hội chợ vui chơi"], ["theatre", "🎭", "nhà hát"], ["yesterday", "📅", "hôm qua"]],
    patterns: [{ q: "Were you at the … yesterday? — Yes, I was.", a: "aquarium", w: ["aquarium", "funfair", "theatre"] }, { q: "What did you do yesterday? — We went to the …", a: "funfair", w: ["funfair", "campsite", "aquarium"] }, { q: "Were you at the theatre yesterday? — No, I …", a: "wasn't", w: ["wasn't", "weren't", "isn't"] }],
    stress: [["aquarium", 2, "a-QUA-ri-um"], ["theatre", 1, "THE-a-tre"]], extra: "past" },
  { n: 10, title: "Our school trip", words: [["Ba Na Hills", "🏔️", "Bà Nà Hills"], ["Bai Dinh Pagoda", "🛕", "chùa Bái Đính"], ["Hoan Kiem Lake", "🌊", "hồ Hoàn Kiếm"], ["Suoi Tien Theme Park", "🎢", "khu du lịch Suối Tiên"]],
    patterns: [{ q: "Did they go to …? — Yes, they did.", a: "Bai Dinh Pagoda", w: ["Bai Dinh Pagoda", "Ba Na Hills", "Hoan Kiem Lake"] }, { q: "What did they do there? — They … a lot of photos.", a: "took", w: ["took", "take", "takes"] }, { q: "Did they go to Hoan Kiem Lake? — No, they …", a: "didn't", w: ["didn't", "don't", "isn't"] }],
    stress: [["pagoda", 2, "pa-GO-da"], ["theme park", 1, "THEME park"]], extra: "past" }
,
  { n: 11, title: "Family time", words: [["buy souvenirs", "🎁", "mua quà lưu niệm"], ["collect seashells", "🐚", "nhặt vỏ sò"], ["eat seafood", "🦐", "ăn hải sản"], ["take a boat trip", "⛵", "đi thuyền"], ["swim", "🏊", "bơi"], ["take photos", "📸", "chụp ảnh"], ["walk on the beach", "🏖️", "đi dạo trên bãi biển"], ["see interesting places", "🏞️", "xem những nơi thú vị"], ["sunbathe", "🌞", "tắm nắng"]],
    patterns: [{ q: "Did you … on your trip? — Yes, I did.", a: "eat seafood", w: ["eat seafood", "buy souvenirs", "take a boat trip"] }, { q: "What did your family do in Ha Long Bay? — We …", a: "took a boat trip", w: ["took a boat trip", "takes a boat trip", "take a boat trip"] }, { q: "Did you collect seashells? — No, I …", a: "didn't", w: ["didn't", "don't", "wasn't"] }, { q: "When did you go to Ha Long? — We went there …", a: "last summer", w: ["last summer", "last Sunday", "yesterday"] }, { q: "Did you swim? — Yes, I did. I … with my mother.", a: "swam", w: ["swam", "swim", "swims"] }, { q: "Where were you last summer? — We were in …", a: "Ha Long", w: ["Ha Long", "Nha Trang", "Sydney"] }, { q: "What did your family do in Nha Trang? — We …", a: "ate seafood", w: ["ate seafood", "eat seafood", "eats seafood"] }, { q: "What did your family do in Sydney? — We …", a: "saw interesting places", w: ["saw interesting places", "see interesting places", "sees interesting places"] }, { q: "What did you do in London? — We took photos and visited …", a: "Big Ben", w: ["Big Ben", "Ha Long Bay", "Fansipan Mountain"] }, { q: "Where did your family go last Sunday? — We went to the …", a: "beach", w: ["beach", "mountains", "river"] }, { q: "What did your family do in Singapore? — We …", a: "bought souvenirs", w: ["bought souvenirs", "buy souvenirs", "buys souvenirs"] }, { q: "When did you go to Nha Trang? — We went there …", a: "last weekend", w: ["last weekend", "last summer", "yesterday"] }, { q: "What did Linda's family do on Saturday? — They … on the beach.", a: "sunbathed", w: ["sunbathed", "sunbathe", "sunbathes"] }, { q: "What did Linda and her brother buy in Ha Long Bay? — They bought some …", a: "souvenirs", w: ["souvenirs", "postcards", "seafood"] }],
    stress: [["souvenir", 3, "sou-ve-NIR"], ["seafood", 1, "SEA-food"]], extra: "past" },
  { n: 12, title: "Our Tet holiday", words: [["buy a branch of peach blossoms", "🌸", "mua một cành hoa đào"], ["decorate the house", "🏮", "trang trí nhà cửa"], ["make banh chung", "🎋", "gói bánh chưng"], ["make spring rolls", "🌯", "làm nem rán, chả giò"], ["fireworks show", "🎆", "màn bắn pháo hoa"], ["flower festival", "💐", "lễ hội hoa"]],
    patterns: [{ q: "Will you … for Tet? — Yes, I will.", a: "make banh chung", w: ["make banh chung", "decorate the house", "buy a branch of peach blossoms"] }, { q: "Will you decorate the house for Tet? — No, I …", a: "won't", w: ["won't", "will", "don't"] }, { q: "What will you do for Tet? — I'll go to a …", a: "flower festival", w: ["flower festival", "fireworks show", "spring rolls"] }],
    stress: [["decorate", 1, "DE-co-rate"], ["festival", 1, "FES-ti-val"]], extra: "will" },
  { n: 13, title: "Our special days", words: [["Mid-Autumn Festival", "🏮", "Tết Trung thu"], ["Children's Day", "🧒", "Ngày Quốc tế Thiếu nhi"], ["Sports Day", "🏅", "Ngày hội thể thao"], ["Teachers' Day", "💐", "Ngày Nhà giáo"], ["apple juice", "🧃", "nước ép táo"], ["burgers", "🍔", "bánh mì kẹp thịt"], ["milk tea", "🧋", "trà sữa"], ["pizza", "🍕", "bánh pizza"]],
    patterns: [{ q: "What will you do on Children's Day? — We'll …", a: "play games", w: ["play games", "pizza", "milk tea"] }, { q: "What food will you have at the party? — We'll have …", a: "burgers", w: ["burgers", "apple juice", "milk tea"] }, { q: "What drinks will you have on Teachers' Day? — We'll have …", a: "apple juice", w: ["apple juice", "burgers", "pizza"] }],
    stress: [["pizza", 1, "PIZ-za"], ["burgers", 1, "BUR-gers"]], extra: "will" },
  { n: 14, title: "Staying healthy", words: [["do morning exercise", "🤸", "tập thể dục buổi sáng"], ["do yoga", "🧘", "tập yoga"], ["drink fresh juice", "🍊", "uống nước ép tươi"], ["eat healthy food", "🥗", "ăn thức ăn lành mạnh"], ["once a week", "1️⃣", "một lần một tuần"], ["twice a week", "2️⃣", "hai lần một tuần"], ["every day", "📆", "mỗi ngày"]],
    patterns: [{ q: "How often does he do morning exercise? — He does it …", a: "every day", w: ["every day", "once a week", "twice a week"] }, { q: "How often does she do yoga? — She does yoga …", a: "twice a week", w: ["twice a week", "every day", "once a week"] }, { q: "What does he do to stay healthy? — He …", a: "eats healthy food", w: ["eats healthy food", "eat healthy food", "eating healthy food"] }],
    stress: [["exercise", 1, "EX-er-cise"], ["healthy", 1, "HEALTH-y"]] },
  { n: 15, title: "Our health", words: [["headache", "🤕", "đau đầu"], ["sore throat", "😖", "đau họng"], ["stomach ache", "🤢", "đau bụng"], ["toothache", "🦷", "đau răng"], ["drink warm water", "☕", "uống nước ấm"], ["go to the dentist", "🏥", "đi khám răng"], ["have a rest", "🛌", "nghỉ ngơi"], ["take some medicine", "💊", "uống thuốc"]],
    patterns: [{ q: "What's the matter? — I have a …", a: "headache", w: ["headache", "toothache", "stomach ache"] }, { q: "What's the matter? — I have a sore throat. — You should …", a: "drink warm water", w: ["drink warm water", "take some medicine", "go to the dentist"] }, { q: "I have a toothache. — You should …", a: "go to the dentist", w: ["go to the dentist", "have a rest", "drink warm water"] }],
    stress: [["medicine", 1, "MED-i-cine"], ["headache", 1, "HEAD-ache"]] },
  { n: 16, title: "Seasons and the weather", words: [["autumn", "🍂", "mùa thu"], ["spring", "🌸", "mùa xuân"], ["summer", "☀️", "mùa hè"], ["winter", "❄️", "mùa đông"], ["cold", "🥶", "lạnh"], ["cool", "🌤️", "mát mẻ"], ["hot", "🥵", "nóng"], ["warm", "🌡️", "ấm"], ["blouse", "👚", "áo cánh (áo kiểu)"], ["jeans", "👖", "quần bò"], ["jumper", "🧥", "áo len chui đầu"], ["trousers", "👖", "quần dài"]],
    patterns: [{ q: "How's the weather in Ha Noi in autumn? — It's …", a: "cool", w: ["cool", "hot", "cold"] }, { q: "What's the weather like in summer? — It's … and sunny.", a: "hot", w: ["hot", "cold", "warm"] }, { q: "What do you usually wear in winter? — I usually wear a …", a: "jumper", w: ["jumper", "blouse", "jeans"] }],
    stress: [["autumn", 1, "AU-tumn"], ["weather", 1, "WEATH-er"]] },
  { n: 17, title: "Stories for children", words: [["ant", "🐜", "con kiến"], ["crow", "🐦‍⬛", "con quạ"], ["dwarfs", "🧙", "chú lùn"], ["fox", "🦊", "con cáo"], ["grasshopper", "🦗", "châu chấu"], ["hare", "🐇", "thỏ rừng"], ["Snow White", "👸", "Bạch Tuyết"], ["tortoise", "🐢", "con rùa"], ["cook well", "👨‍🍳", "nấu ăn ngon"], ["run fast", "🏃", "chạy nhanh"], ["sing beautifully", "🎤", "hát hay"], ["work hard", "💪", "làm việc chăm chỉ"]],
    patterns: [{ q: "Who are the main characters in the story? — The … and the tortoise.", a: "hare", w: ["hare", "fox", "ant"] }, { q: "How did the tortoise run? — It ran …", a: "slowly", w: ["slowly", "fast", "well"] }, { q: "How does the ant work? — It works …", a: "hard", w: ["hard", "beautifully", "well"] }],
    stress: [["grasshopper", 1, "GRASS-hop-per"], ["tortoise", 1, "TOR-toise"]] },
  { n: 18, title: "Means of transport", words: [["by bicycle", "🚲", "bằng xe đạp"], ["by bus", "🚌", "bằng xe buýt"], ["by taxi", "🚕", "bằng taxi"], ["on foot", "🚶", "đi bộ"], ["Dragon Bridge", "🌉", "cầu Rồng (Đà Nẵng)"], ["Ha Noi Opera House", "🏛️", "Nhà hát Lớn Hà Nội"]],
    patterns: [{ q: "Where do you want to visit? — I want to visit …", a: "Dragon Bridge", w: ["Dragon Bridge", "Ha Noi Opera House", "by bus"] }, { q: "How can I get to the Opera House? — You can go …", a: "by taxi", w: ["by taxi", "by bus", "on foot"] }, { q: "How can I get there? — You can go … foot.", a: "on", w: ["on", "by", "in"] }],
    stress: [["bicycle", 1, "BI-cy-cle"], ["dragon", 1, "DRA-gon"]] },
  { n: 19, title: "Places of interest", words: [["beautiful", "🌺", "đẹp"], ["exciting", "🎉", "thú vị, hào hứng"], ["fantastic", "🤩", "tuyệt vời"], ["peaceful", "🕊️", "yên bình"], ["twenty-nine", "🔢", "hai mươi chín (29)"], ["forty", "🔢", "bốn mươi (40)"], ["one hundred", "🔢", "một trăm (100)"], ["one hundred and twenty-nine", "🔢", "một trăm hai mươi chín (129)"]],
    patterns: [{ q: "What do you think of Phu Quoc Island? — I think it's …", a: "beautiful", w: ["beautiful", "exciting", "fantastic"] }, { q: "How far is it from Ha Noi to Hai Phong? — It's about … kilometres.", a: "100", w: ["100", "10", "1 000"] }, { q: "What do you think of Da Lat? — I think it's …", a: "peaceful", w: ["peaceful", "beautiful", "exciting"] }, { q: "How far is it from your house to the zoo? — It's about … kilometres.", a: "29", w: ["29", "40", "129"] }, { q: "What do you think of Ha Long Bay? — I think it's …", a: "fantastic", w: ["fantastic", "peaceful", "beautiful"] }],
    stress: [["exciting", 2, "ex-CI-ting"], ["beautiful", 1, "BEAU-ti-ful"]] },
  { n: 20, title: "Our summer holidays", words: [["Dam Sen Aquarium", "🐠", "Thuỷ cung Đầm Sen"], ["Huong River", "🌊", "sông Hương"], ["Phong Nha Cave", "🏞️", "động Phong Nha"], ["Phu Quoc Island", "🏝️", "đảo Phú Quốc"], ["go camping", "🏕️", "đi cắm trại"], ["join a music club", "🎼", "tham gia câu lạc bộ âm nhạc"], ["practise swimming", "🏊", "luyện bơi"]],
    patterns: [{ q: "Where are you going to visit this summer? — I'm going to visit …", a: "Phu Quoc Island", w: ["Phu Quoc Island", "Huong River", "Phong Nha Cave"] }, { q: "What are you going to do this summer? — I'm going to …", a: "go camping", w: ["go camping", "join a music club", "practise swimming"] }, { q: "Where are you going to visit? — I'm going to visit …", a: "Dam Sen Aquarium", w: ["Dam Sen Aquarium", "Phong Nha Cave", "Huong River"] }],
    stress: [["island", 1, "IS-land"], ["camping", 1, "CAMP-ing"]], extra: "goingto" }
];
var ALL_WORDS5 = [];
UNITS5.forEach(function (u) { u.words.forEach(function (w) { ALL_WORDS5.push(w); }); });
(function () { var seen = {}; for (var i = ALL_WORDS5.length - 1; i >= 0; i--) { if (seen[ALL_WORDS5[i][0]]) ALL_WORDS5.splice(i, 1); else seen[ALL_WORDS5[i][0]] = 1; } })();
/* --- Dạng điền động từ: quá khứ đơn / will / be going to --- */
var ENG5_PAST = [
  ["Yesterday, I ___ to the zoo.", "went", "go", "goes", "“Yesterday” là dấu hiệu thì quá khứ đơn: go → went."],
  ["Last Sunday, we ___ seafood at the beach.", "ate", "eat", "eats", "eat → ate (quá khứ)."],
  ["My mum ___ a cake yesterday.", "bought", "buy", "buys", "buy → bought (quá khứ)."],
  ["He ___ a boat trip last week.", "took", "take", "takes", "take → took (quá khứ)."],
  ["They ___ seashells at the beach yesterday.", "collected", "collect", "collects", "Động từ có quy tắc thêm –ed: collect → collected."],
  ["I ___ a dolphin at the aquarium.", "saw", "see", "sees", "see → saw (quá khứ)."],
  ["She ___ in the sea yesterday.", "swam", "swim", "swims", "swim → swam (quá khứ)."],
  ["We ___ Bai Dinh Pagoda last week.", "visited", "visit", "visits", "visit → visited."],
  ["Tom ___ football yesterday afternoon.", "played", "play", "plays", "play → played."],
  ["We ___ a film at the theatre last night.", "watched", "watch", "watchs", "watch → watched (không phải “watchs”)."]
];
var ENG5_WILL = [
  ["___ you make banh chung for Tet? — Yes, I will.", "Will", "Do", "Did", "Câu hỏi về việc sẽ làm trong tương lai dùng “Will”."],
  ["I ___ decorate the house for Tet.", "will", "did", "does", "Việc sẽ làm (tương lai) dùng “will + động từ nguyên thể”."],
  ["What will you do on Children's Day? — We ___ have a big party.", "will", "did", "are", "“will” cho việc sẽ xảy ra trong tương lai."],
  ["Will you buy flowers for Tet? — No, I ___.", "won't", "will", "am", "Câu trả lời phủ định: won't (= will not)."],
  ["She ___ make spring rolls for Tet.", "will", "did", "makes yesterday", "Sau “will” dùng động từ nguyên thể: will make."],
  ["What food will you have at the party? — We ___ have pizza and burgers.", "will", "did", "eaten", "We will have... (sẽ ăn/uống)."]
];
var ENG5_GOING = [
  ["I'm ___ to visit Phu Quoc Island this summer.", "going", "go", "goes", "Dự định tương lai: be going to + động từ nguyên thể."],
  ["Where are you ___ to visit this summer?", "going", "go", "went", "Are you going to...? — hỏi về dự định."],
  ["She is going ___ visit the Huong River.", "to", "for", "go", "Cấu trúc: be going TO + động từ nguyên thể."],
  ["We are ___ to go camping this summer.", "going", "go", "went", "We are going to go camping."],
  ["What are you going to do? — I'm going to ___ swimming.", "practise", "practises", "practised", "Sau “going to” dùng động từ nguyên thể: practise."]
];
function eng5FormGen(list, asBlank) {
  return function () {
    var c = pick(list);
    var opts = shuffle([c[1], c[2], c[3]]);
    var sentence = c[0].replace("___", asBlank ? blankSlot() : "______");
    if (asBlank) return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền dạng đúng của từ để hoàn thành câu!", blankText: c[1], explain: c[4],
      visual: '<div class="sentence">' + sentence + "</div>",
      options: opts.map(function (o) { return { html: '<span class="opt-word">' + o + "</span>" }; }), answer: opts.indexOf(c[1]), cols: 3 };
    return { prompt: "Choose the correct word to complete the sentence!", visual: '<div class="sentence">' + sentence + "</div>",
      options: opts.map(function (o) { return { html: '<span class="opt-word">' + o + "</span>" }; }), answer: opts.indexOf(c[1]), cols: 3, optStack: true, explain: c[4] };
  };
}
function eng5StressGen(u) {
  return function () {
    var s = pick(u.stress);
    var labels = ["Âm tiết thứ nhất", "Âm tiết thứ hai", "Âm tiết thứ ba"];
    var opts = shuffle([0, 1, 2]);
    return { prompt: "Từ “" + s[0] + "” có trọng âm rơi vào âm tiết thứ mấy?", visual: '<div class="big-word">' + s[0] + "</div>",
      options: opts.map(function (i) { return { html: '<span class="opt-text">' + labels[i] + "</span>" }; }), answer: opts.indexOf(s[1] - 1), cols: 3,
      explain: "Đọc: " + s[2] + " — trọng âm rơi vào " + labels[s[1] - 1].toLowerCase() + "." };
  };
}
function eng5Pools(u) {
  var base = engPools(u.words);
  var pats = u.patterns || [];
  function patGen() {
    var pat = pick(pats);
    var all = shuffle(pat.w.slice());
    return { prompt: pat.q, visual: "", options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: all.indexOf(pat.a), cols: all.length, optStack: true };
  }
  function patBlank() {
    var pat = pick(pats);
    var all = shuffle(pat.w.slice());
    return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền từ còn thiếu để hoàn thành câu!", blankText: pat.a,
      visual: '<div class="sentence">' + pat.q.replace("…", blankSlot()) + "</div>",
      options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: all.indexOf(pat.a), cols: all.length, optStack: true };
  }
  function yesNoGen() {
    /* v16: vòng tranh chỉ dùng từ qua cổng tranh trong unit; thiếu từ thì lùi về TF khẳng định nghĩa (dạng chữ). */
    var pw = engPicWords(u.words);
    if (pw.length >= 2) {
      var w = pick(pw);
      var truth = Math.random() < 0.5;
      var shown = truth ? w : (engDistractors(w, u.words, 1, { pic: true, gloss: true })[0] || w);
      return { kind: "tf", badge: "🎮 Trò chơi!", prompt: "Đúng hay sai? Chạm nhanh nhé!", rounds: [{ visual: '<div class="big-pic">' + picHTML(w) + '</div><div class="big-word">' + shown[0] + "</div>", truth: truth, explain: "Từ đúng là “" + w[0] + "”" }] };
    }
    var w2 = pick(u.words);
    var truth2 = Math.random() < 0.5;
    var shown2 = truth2 ? w2 : (engDistractors(w2, u.words, 1, { gloss: true })[0] || w2);
    return { kind: "tf", badge: "🎮 Trò chơi!", prompt: "Đúng hay sai? Chạm nhanh nhé!", rounds: [{ visual: '<div class="big-word">' + w2[0] + '</div><div class="sentence">Nghĩa là “' + shown2[2] + "”</div>", truth: truth2, explain: "“" + w2[0] + "” nghĩa là “" + w2[2] + "”" }] };
  }
  var choose = base.choose.slice();
  if (pats.length) choose.push(patGen, patGen);
  if (u.stress && u.stress.length) choose.push(eng5StressGen(u), eng5StressGen(u));
  var blank = [function () { return qEngBlankLetter(u.words); }];
  if (pats.length) blank.push(patBlank);
  if (u.extra === "past") { choose.push(eng5FormGen(ENG5_PAST, false), eng5FormGen(ENG5_PAST, false)); blank.push(eng5FormGen(ENG5_PAST, true)); }
  if (u.extra === "will") { choose.push(eng5FormGen(ENG5_WILL, false), eng5FormGen(ENG5_WILL, false)); blank.push(eng5FormGen(ENG5_WILL, true)); }
  if (u.extra === "goingto") { choose.push(eng5FormGen(ENG5_GOING, false), eng5FormGen(ENG5_GOING, false)); blank.push(eng5FormGen(ENG5_GOING, true)); }
  return { choose: choose, blank: blank, match: base.match, games: base.games.concat([yesNoGen]) };
}
/* ================= KHOA HỌC 5 ================= */
var KH5_TOPICS = [
  (function () { var kp = knowledgePools([
      ["Đất có thành phần chính gồm những gì?", "Chất khoáng, mùn, nước và không khí", "Chỉ có đá và cát", "Chỉ có nước", "Mùn là thành phần quan trọng giúp đất tơi xốp, tốt cho cây."],
      ["Đất có vai trò gì đối với cây trồng?", "Là nơi cây bám rễ, hút nước và chất dinh dưỡng", "Chỉ để trang trí", "Không có vai trò gì", "Hầu hết cây trồng sống nhờ vào đất."],
      ["Nguyên nhân nào gây ô nhiễm đất?", "Rác thải, hoá chất, thuốc trừ sâu dùng bừa bãi", "Trồng cây xanh", "Mưa xuống đồng ruộng", "Đất bị ô nhiễm làm cây trồng và nguồn nước ngầm bị ảnh hưởng."],
      ["Xói mòn đất thường xảy ra mạnh ở đâu?", "Vùng đồi núi dốc, mưa lớn cuốn trôi lớp đất mặt", "Ở đáy biển sâu", "Trong nhà kính", "Trồng cây chắn gió, làm ruộng bậc thang giúp chống xói mòn."],
      ["Việc làm nào giúp bảo vệ và cải tạo đất?", "Bón phân hữu cơ, trồng cây che phủ đất", "Đổ dầu thải xuống đất", "Đốt hết rơm rạ trên đồng", "Đất tốt là tài nguyên quý cần được gìn giữ."],
      ["Hỗn hợp là gì?", "Nhiều chất trộn lẫn, mỗi chất giữ nguyên tính chất", "Một chất duy nhất bị biến đổi", "Chất đã cháy thành tro", "Ví dụ: hỗn hợp cát và sỏi, hỗn hợp rau củ thái nhỏ."],
      ["Dung dịch là gì?", "Hỗn hợp có chất hoà tan đều vào chất khác", "Hỗn hợp cát và đá", "Hai chất không thể trộn vào nhau", "Ví dụ: nước đường, nước muối là các dung dịch."],
      ["Cách nào giúp đường tan nhanh hơn trong nước?", "Khuấy đều và dùng nước ấm", "Để yên trong tủ lạnh", "Cho thêm cát", "Khuấy và tăng nhiệt độ làm chất rắn tan nhanh hơn."],
      ["Chất tồn tại ở những trạng thái (thể) nào?", "Rắn, lỏng và khí", "Chỉ rắn và lỏng", "Chỉ ở thể lỏng", "Nước đá (rắn), nước (lỏng), hơi nước (khí)."],
      ["Khi đun sôi, nước biến đổi trạng thái thế nào?", "Từ thể lỏng sang thể khí (bay hơi)", "Từ thể rắn sang thể lỏng", "Từ thể khí sang thể rắn", "Đun nóng làm nước bay hơi nhanh hơn."],
      ["Biến đổi hoá học là gì?", "Biến đổi tạo thành chất mới", "Chỉ thay đổi hình dạng, kích thước", "Nước đá tan thành nước", "Biến đổi hoá học sinh ra chất mới có tính chất khác hẳn chất ban đầu."],
      ["Hiện tượng nào là biến đổi HOÁ HỌC?", "Đinh sắt để ngoài trời lâu ngày bị gỉ", "Thuỷ tinh vỡ thành mảnh", "Cắt giấy thành hình ngôi sao", "Gỉ sắt là chất mới tạo thành khi sắt tác dụng với ô-xi và nước."],
      ["Đốt một tờ giấy, giấy biến thành tro và khói. Đây là biến đổi gì?", "Biến đổi hoá học (tạo chất mới)", "Biến đổi trạng thái đơn thuần", "Không có biến đổi nào", "Giấy cháy không thể trở lại thành giấy được nữa."],
      ["Đất trồng bị bạc màu là do đâu?", "Trồng trọt lâu năm làm đất mất chất dinh dưỡng", "Do đất có quá nhiều mùn", "Do tưới nước đều đặn", "Cần bón phân và luân canh cây trồng để phục hồi đất bạc màu."],
      ["Để tách cát ra khỏi hỗn hợp cát và sỏi, em dùng cách nào?", "Dùng sàng (rây) lọc theo kích thước hạt", "Đun nóng hỗn hợp lên", "Hoà tan tất cả vào nước", "Hạt to – nhỏ khác nhau nên dùng sàng, rây để tách."],
      ["Để tách muối ra khỏi nước muối, cách làm phù hợp là gì?", "Đun cho nước bay hơi, muối còn lại", "Lọc bằng giấy lọc", "Dùng nam châm hút muối", "Đây là cách diêm dân làm muối từ nước biển."],
      ["Nam châm có thể tách chất nào ra khỏi hỗn hợp?", "Vật bằng sắt (đinh, mạt sắt)", "Cát và sỏi", "Đường đã tan trong nước", "Nam châm chỉ hút các vật liệu có tính từ như sắt, thép."],
      ["Hơi nước gặp lạnh sẽ xảy ra hiện tượng gì?", "Ngưng tụ thành nước ở thể lỏng", "Đông đặc thành nước đá", "Bay hơi nhanh hơn", "Hơi nước gặp lạnh ngưng tụ thành sương, giọt nước trên lá."],
      ["Nước đá để ngoài trời nắng sẽ thế nào?", "Tan thành nước (hiện tượng nóng chảy)", "Bay hơi hết ngay lập tức", "Đông cứng thêm nữa", "Nóng chảy là sự biến đổi từ thể rắn sang thể lỏng."],
      ["Hiện tượng nào là biến đổi LÍ HỌC (không tạo chất mới)?", "Xé giấy thành nhiều mảnh nhỏ", "Đốt giấy cháy thành tro", "Đinh sắt bị gỉ", "Xé giấy chỉ làm thay đổi hình dạng, giấy vẫn là giấy."],
      ["Thức ăn để lâu bị ôi thiu là biến đổi gì?", "Biến đổi hoá học, tạo chất mới có mùi chua", "Biến đổi trạng thái", "Không có biến đổi nào", "Thức ăn ôi thiu không nên ăn vì có hại cho sức khoẻ."],
      ["Đất sét thường được dùng để làm gì?", "Làm gốm sứ, gạch ngói", "Làm đường nhựa", "Làm phân bón trực tiếp", "Đất sét dẻo, nặn được; làng gốm Bát Tràng nổi tiếng với đồ gốm đất sét."],
      ["Vì sao cần giữ cho đất không bị ô nhiễm?", "Đất sạch thì cây tốt, nước ngầm an toàn", "Để đất trông đẹp mắt hơn", "Không cần thiết phải giữ", "Bảo vệ đất là bảo vệ lương thực và sức khoẻ con người."],
      ["Lớp đất nào quý nhất đối với cây trồng?", "Lớp đất mặt ở trên cùng, giàu mùn", "Lớp đá cứng ở sâu dưới", "Lớp cát khô ở giữa", "Lớp đất mặt tuy mỏng nhưng chứa nhiều chất dinh dưỡng nhất."],
      ["Đất cát có đặc điểm gì?", "Thoát nước nhanh, giữ nước và dinh dưỡng kém", "Giữ nước rất tốt", "Luôn ẩm ướt quanh năm", "Đất cát cần bón nhiều phân hữu cơ mới trồng cây tốt."],
      ["Đất phù sa màu mỡ là nhờ đâu?", "Sông ngòi bồi đắp lớp phù sa mang về", "Do con người đổ cát vào", "Do đá núi vỡ ra", "Đồng bằng sông Hồng và sông Cửu Long nổi tiếng đất phù sa màu mỡ."],
      ["Làm ruộng bậc thang trên đồi dốc có tác dụng gì?", "Giữ đất, giữ nước, chống xói mòn", "Làm đất trôi nhanh hơn", "Chỉ để ngắm cảnh đẹp", "Ruộng bậc thang ở vùng núi vừa giúp trồng lúa vừa bảo vệ đất."],
      ["Trồng cây họ đậu (đỗ, lạc) giúp đất thế nào?", "Bổ sung chất đạm, làm đất tốt hơn", "Làm đất cạn kiệt nhanh", "Không ảnh hưởng gì", "Luân canh cây họ đậu là cách cải tạo đất tự nhiên."],
      ["Trong dung dịch nước đường, đường đóng vai trò gì?", "Là chất tan, nước là dung môi", "Là dung môi", "Là chất không tan", "Chất tan hoà tan vào dung môi tạo thành dung dịch đồng nhất."],
      ["Trộn dầu ăn vào nước, em quan sát thấy gì?", "Dầu không tan, nổi thành lớp ở trên", "Dầu tan đều thành dung dịch", "Dầu chìm xuống đáy cốc", "Dầu nhẹ hơn nước và không tan trong nước nên nổi lên trên."],
      ["Muốn tách cát ra khỏi nước cát, em làm thế nào?", "Lọc qua giấy lọc, cát bị giữ lại", "Đun sôi cả hỗn hợp", "Dùng nam châm hút cát", "Lọc là cách tách chất rắn không tan ra khỏi chất lỏng."],
      ["Đông đặc là hiện tượng gì?", "Chất lỏng chuyển sang thể rắn khi lạnh", "Chất rắn chuyển sang thể lỏng", "Chất lỏng chuyển sang thể khí", "Nước để trong ngăn đá tủ lạnh đông đặc thành nước đá."],
      ["Bay hơi xảy ra ở đâu trên chất lỏng?", "Ở mặt thoáng, ở mọi nhiệt độ", "Chỉ khi nước sôi ở 100°C", "Chỉ ở đáy nồi", "Quần áo ướt khô dần chính nhờ nước bay hơi ở mặt thoáng."],
      ["Vì sao gương nhà tắm bị mờ khi tắm nước nóng?", "Hơi nước gặp gương lạnh ngưng tụ thành giọt", "Do gương bị bẩn", "Do nước nóng làm gương nở ra", "Ngưng tụ là hiện tượng hơi nước chuyển thành nước lỏng khi gặp lạnh."],
      ["Sáp nến chảy lỏng khi được đốt nóng, đó là biến đổi gì?", "Biến đổi lí học (nóng chảy)", "Biến đổi hoá học", "Không có biến đổi", "Sáp chỉ thay đổi trạng thái, nguội lại sẽ đông cứng như cũ."],
      ["Không khí quanh ta có phải là hỗn hợp không?", "Phải, gồm nhiều chất khí trộn lẫn nhau", "Không, là một chất duy nhất", "Không, không khí là chất rắn", "Không khí gồm ni-tơ, ô-xi, các-bô-níc và nhiều khí khác."],
      ["Sữa tươi để lâu bị chua là biến đổi gì?", "Biến đổi hoá học (lên men chua)", "Biến đổi lí học", "Chỉ là biến đổi trạng thái", "Sữa lên men có kiểm soát (sữa chua) thì có lợi; sữa hỏng tự nhiên không nên dùng."],
      ["Chất ở thể khí có đặc điểm gì?", "Không có hình dạng và thể tích xác định", "Có hình dạng xác định như chất rắn", "Không chiếm thể tích", "Chất khí lan ra chiếm hết không gian của vật chứa."],
      ["Chất lỏng có đặc điểm gì?", "Có thể tích xác định, hình dạng theo vật chứa", "Có hình dạng cố định", "Không có thể tích xác định", "Đổ nước từ cốc sang chai, thể tích không đổi nhưng hình dạng thay đổi theo vật chứa."],
      ["Hoà tan muối ăn vào nước là biến đổi gì?", "Biến đổi lí học, muối giữ nguyên tính chất", "Biến đổi hoá học tạo chất mới", "Không phải biến đổi", "Đun cho nước bay hơi sẽ thu lại được muối ăn như ban đầu."],
    ], [["Mùn", "Giúp đất tơi xốp, màu mỡ"], ["Dung dịch", "Chất tan đều trong nước"], ["Biến đổi hoá học", "Tạo thành chất mới"], ["Xói mòn", "Nước cuốn trôi lớp đất mặt"], ["Nóng chảy", "Rắn chuyển sang thể lỏng"], ["Ngưng tụ", "Hơi nước thành nước lỏng"], ["Sàng (rây)", "Tách hạt theo kích thước"], ["Bay hơi", "Lỏng chuyển sang thể khí"]], "Nối khái niệm với ý đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước LÀM MUỐI từ nước biển theo đúng thứ tự!", ["Cho nước biển vào ruộng muối", "Phơi nắng cho nước bay hơi dần", "Muối kết tinh trắng trên ruộng", "Cào muối và thu hoạch về kho"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các bước LỌC tách cát khỏi nước theo đúng thứ tự!", ["Chuẩn bị phễu và giấy lọc", "Đổ hỗn hợp cát – nước vào phễu lọc", "Nước trong chảy xuống cốc ở dưới", "Cát được giữ lại trên giấy lọc"]); });
    return { id: "kh5-chat", emoji: "🌍", name: "Chất: đất, hỗn hợp, biến đổi chất", sub: "Bài 1–7 • Đất và bảo vệ đất • Hỗn hợp, dung dịch • Trạng thái của chất • Biến đổi hoá học", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Năng lượng có vai trò gì trong đời sống?", "Giúp mọi vật hoạt động: thắp sáng, nấu ăn, chạy máy", "Không cần thiết cho cuộc sống", "Chỉ dùng để trang trí", "Không có năng lượng, con người không thể sản xuất và sinh hoạt."],
      ["Việc làm nào sử dụng điện AN TOÀN?", "Tay khô khi chạm ổ điện, không tự ý sửa điện", "Chọc vật kim loại vào ổ điện", "Chạm tay ướt vào ổ điện", "Điện rất hữu ích nhưng cũng nguy hiểm nếu dùng sai cách."],
      ["Một mạch điện đơn giản gồm những bộ phận nào?", "Nguồn điện (pin), dây dẫn, bóng đèn, công tắc", "Chỉ có bóng đèn", "Chỉ có dây điện", "Mạch điện phải kín thì dòng điện mới chạy và đèn mới sáng."],
      ["Khi công tắc (khoá K) đang mở, bóng đèn trong mạch thế nào?", "Đèn không sáng vì mạch điện bị hở", "Đèn sáng bình thường", "Đèn sáng hơn lúc đóng công tắc", "Đóng công tắc để mạch kín, đèn mới sáng."],
      ["Nhóm vật nào DẪN ĐIỆN tốt?", "Kim loại: đồng, nhôm, sắt", "Nhựa, gỗ khô, cao su", "Giấy, vải, sứ", "Dây điện thường làm bằng đồng vì đồng dẫn điện tốt."],
      ["Nhóm vật nào CÁCH ĐIỆN?", "Nhựa, cao su, gỗ khô, sứ", "Đồng, nhôm", "Nước muối, sắt", "Vỏ dây điện bằng nhựa, cao su để cách điện, bảo vệ người dùng."],
      ["Năng lượng mặt trời được dùng vào việc gì?", "Phơi khô đồ, sưởi ấm, tạo điện bằng pin mặt trời", "Làm cho trời tối đi", "Tạo mưa nhân tạo", "Năng lượng mặt trời luôn sẵn có và thân thiện với môi trường."],
      ["Năng lượng gió và nước chảy thường được dùng để làm gì?", "Quay tuabin phát điện (điện gió, thuỷ điện)", "Đốt cháy nhiên liệu", "Làm lạnh đồ vật", "Nhà máy thuỷ điện dùng sức nước chảy để phát điện."],
      ["Chất đốt (than, củi, dầu, khí ga) khi cháy tạo ra năng lượng nào?", "Năng lượng nhiệt và ánh sáng", "Năng lượng điện trực tiếp", "Không tạo năng lượng", "Chất đốt cho năng lượng để nấu ăn, sưởi ấm, chạy động cơ."],
      ["Việc làm nào giúp TIẾT KIỆM điện?", "Tắt đèn khi ra khỏi phòng", "Bật tất cả đèn cả ngày", "Mở tủ lạnh liên tục", "Tiết kiệm điện là bảo vệ tài nguyên và môi trường."],
      ["Khi thấy người bị điện giật, em nên làm gì?", "Không chạm vào nạn nhân; ngắt điện, gọi người lớn", "Lại gần kéo tay người đó ra ngay", "Đổ nước lên người bị giật", "Chạm vào người bị điện giật rất nguy hiểm; cần cắt điện và gọi cấp cứu 115."],
      ["Pin trong mạch điện có vai trò gì?", "Là nguồn điện, cung cấp năng lượng cho mạch", "Là vật cách điện", "Chỉ để trang trí", "Không có nguồn điện, mạch không hoạt động."],
      ["Tuabin gió thường được đặt ở nơi nào để phát điện hiệu quả?", "Nơi có gió mạnh và ổn định (ven biển, cao nguyên)", "Trong phòng kín", "Dưới đáy sông", "Năng lượng gió là năng lượng tái tạo, sạch."],
      ["Điện dùng trong gia đình được sản xuất ở đâu?", "Ở các nhà máy điện rồi truyền qua đường dây", "Ngay trong ổ cắm điện", "Trong bóng đèn của nhà", "Thuỷ điện, nhiệt điện, điện gió... đều là nhà máy điện."],
      ["Hoạt động nào KHÔNG cần dùng điện vẫn làm được?", "Đạp xe đi học", "Xem ti vi", "Bật đèn bàn học bài", "Nhiều hoạt động dùng sức người, không cần đến điện."],
      ["Lõi dây điện thường làm bằng kim loại nào?", "Đồng (hoặc nhôm) vì dẫn điện tốt", "Nhựa cứng", "Cao su đặc", "Vỏ dây bằng nhựa, cao su cách điện; lõi bằng kim loại dẫn điện."],
      ["Nhiên liệu nào thuộc nhóm năng lượng tái tạo được?", "Củi và rơm rạ (năng lượng sinh khối)", "Than đá", "Dầu mỏ", "Than, dầu là nhiên liệu hoá thạch, dùng mãi sẽ cạn kiệt."],
      ["Đèn LED và đèn sợi đốt, loại nào tiết kiệm điện hơn?", "Đèn LED tiết kiệm điện hơn nhiều", "Đèn sợi đốt", "Hai loại tốn điện như nhau", "Đèn LED sáng tốt mà tiêu thụ rất ít điện năng."],
      ["Pin đã hết điện cần được xử lí thế nào?", "Bỏ vào điểm thu gom pin thải", "Vứt xuống sông cho trôi đi", "Đốt chung với rác nhà", "Pin thải chứa chất độc hại, cần thu gom riêng để xử lí."],
      ["Đồng hồ điện trong nhà dùng để làm gì?", "Đo lượng điện đã sử dụng để tính tiền điện", "Trang trí trên tường", "Báo giờ cho cả nhà", "Theo dõi số điện giúp gia đình dùng điện tiết kiệm hơn."],
      ["Năng lượng mặt trời là nguồn năng lượng thế nào?", "Sạch, sẵn có và không bao giờ cạn", "Có hạn, sắp hết hẳn", "Gây ô nhiễm rất lớn", "Việt Nam nhiều nắng, thuận lợi để dùng năng lượng mặt trời."],
      ["Sức nước chảy xưa nay còn được dùng vào việc gì?", "Quay cối xay lúa, guồng nước đưa nước lên ruộng", "Sạc điện thoại trực tiếp", "Thắp bóng đèn không cần máy phát", "Con người đã biết dùng sức nước từ rất lâu trong sản xuất."],
      ["Khi ra khỏi lớp học cuối cùng, em nên làm gì để tiết kiệm điện?", "Tắt đèn và quạt trong lớp", "Để đèn sáng cho đẹp lớp", "Bật thêm đèn hành lang", "Tắt thiết bị khi không dùng là thói quen tiết kiệm điện."],
      ["Bóng đèn điện chuyển điện năng thành dạng năng lượng nào?", "Ánh sáng (và một phần nhiệt)", "Chuyển động", "Âm thanh", "Đèn LED chuyển điện thành ánh sáng hiệu quả hơn đèn sợi đốt."],
      ["Quạt điện chuyển điện năng thành dạng năng lượng nào?", "Chuyển động quay của cánh quạt", "Ánh sáng", "Nhiệt để nấu ăn", "Mô-tơ trong quạt biến điện năng thành chuyển động quay."],
      ["Ấm điện đun nước chuyển điện năng thành gì?", "Nhiệt năng làm nước nóng lên", "Ánh sáng", "Chuyển động quay", "Nhiều thiết bị điện biến điện năng thành nhiệt: ấm điện, bếp điện, bàn là."],
      ["Vì sao không nên thả diều gần đường dây điện?", "Diều vướng dây điện gây điện giật nguy hiểm", "Diều sẽ bay thấp hơn", "Không có lí do gì", "Chỉ thả diều ở nơi thoáng đãng, xa đường dây điện."],
      ["Khi trời có giông sét, em nên làm gì để an toàn?", "Ở trong nhà, rút phích cắm thiết bị điện", "Ra ngoài xem sét cho rõ", "Đứng dưới gốc cây to tránh mưa", "Sét rất nguy hiểm; không đứng nơi trống trải khi có giông sét."],
      ["Ngửi thấy mùi ga rò rỉ trong bếp, việc đầu tiên cần làm là gì?", "Khoá van ga, mở cửa cho thoáng khí", "Bật bếp kiểm tra ngay", "Bật quạt điện cho bay mùi", "Tuyệt đối không bật lửa hay công tắc điện khi có mùi ga — dễ gây cháy nổ."],
      ["Nhà máy thuỷ điện Sơn La dùng sức nước của con sông nào?", "Sông Đà", "Sông Hồng", "Sông Mê Công", "Thuỷ điện Sơn La là một trong những nhà máy thuỷ điện lớn của nước ta."],
      ["Át-tô-mát (cầu dao tự động) trong nhà có tác dụng gì?", "Tự ngắt điện khi quá tải, tránh cháy nổ", "Làm đèn sáng hơn", "Đo lượng điện đã dùng", "Khi có sự cố chập điện, át-tô-mát ngắt mạch để bảo vệ cả nhà."],
      ["Đèn pin hoạt động được nhờ những bộ phận nào?", "Pin, bóng đèn và mạch kín khi bật công tắc", "Chỉ cần vỏ đèn pin", "Nhờ ánh sáng mặt trời", "Đèn pin chính là một mạch điện đơn giản mang theo người."],
      ["Tiết kiệm chất đốt khi nấu ăn, việc nào là đúng?", "Đậy vung nồi, dùng lửa vừa với đáy nồi", "Để lửa thật to tràn ra ngoài nồi", "Mở vung suốt khi nấu", "Đậy vung giúp thức ăn nhanh chín, tốn ít ga và củi hơn."],
      ["Tay cầm của bàn là thường làm bằng vật liệu nào để an toàn?", "Nhựa chịu nhiệt (cách điện, cách nhiệt)", "Kim loại trần", "Thuỷ tinh mỏng", "Tay cầm bằng nhựa giúp cầm không bị nóng và an toàn về điện."],
      ["Pin mặt trời phát được nhiều điện nhất khi nào?", "Khi nắng to, ánh sáng chiếu thẳng vào tấm pin", "Khi trời nhiều mây đen", "Vào ban đêm", "Đặt tấm pin nghiêng về phía Mặt Trời giúp thu được nhiều điện hơn."],
      ["Đi xe đạp thay vì đi xe máy quãng ngắn giúp ích gì?", "Tiết kiệm nhiên liệu, giảm khói bụi", "Tốn xăng hơn", "Không giúp ích gì", "Dùng sức người cho quãng ngắn vừa khoẻ người vừa bảo vệ môi trường."],
      ["Nhóm năng lượng nào sẽ cạn kiệt nếu dùng mãi?", "Than đá, dầu mỏ, khí đốt (hoá thạch)", "Mặt trời, gió", "Nước chảy, sức gió", "Nhiên liệu hoá thạch hình thành hàng triệu năm, khai thác mãi sẽ hết."],
      ["Khi tay đang ướt, vì sao không được chạm vào công tắc điện?", "Nước dẫn điện, dễ bị điện giật", "Vì công tắc sẽ bị bẩn", "Không có nguy hiểm gì", "Luôn giữ tay khô ráo khi sử dụng thiết bị điện."],
      ["Bình nước nóng năng lượng mặt trời trên mái nhà hoạt động nhờ đâu?", "Hấp thụ nhiệt từ ánh nắng mặt trời", "Đốt khí ga", "Dùng điện lưới cả ngày", "Nhiều gia đình dùng bình nước nóng mặt trời để tiết kiệm điện, ga."],
      ["Cắm chung quá nhiều thiết bị vào một ổ cắm gây nguy hiểm gì?", "Quá tải, nóng chảy dây, dễ cháy nổ", "Không có nguy hiểm gì", "Làm thiết bị chạy nhanh hơn", "Mỗi ổ cắm chỉ chịu được một lượng điện nhất định."],
    ], [["Đồng, nhôm", "Vật dẫn điện"], ["Nhựa, cao su", "Vật cách điện"], ["Pin", "Nguồn điện của mạch"], ["Tuabin gió", "Phát điện nhờ sức gió"], ["Tấm pin mặt trời", "Biến ánh sáng thành điện"], ["Thuỷ điện", "Dùng sức nước chảy"], ["Khoá K (công tắc)", "Đóng, ngắt mạch điện"], ["Chất đốt", "Tạo nhiệt và ánh sáng khi cháy"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước LẮP MẠCH ĐIỆN thắp sáng đơn giản theo đúng thứ tự!", ["Chuẩn bị pin, dây dẫn, bóng đèn, công tắc", "Nối các bộ phận thành vòng mạch kín", "Đóng công tắc (khoá K)", "Dòng điện chạy qua, bóng đèn sáng"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các việc cần làm khi phát hiện DÂY ĐIỆN BỊ HỞ theo thứ tự an toàn!", ["Không chạm tay vào chỗ dây hở", "Ngắt cầu dao điện nếu làm được an toàn", "Báo ngay cho người lớn", "Chờ thợ điện đến sửa chữa"]); });
    return { id: "kh5-nangluong", emoji: "⚡", name: "Năng lượng và điện", sub: "Vai trò của năng lượng • Sử dụng điện an toàn • Mạch điện đơn giản • Vật dẫn điện, vật cách điện • Năng lượng mặt trời, gió, nước chảy", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Sự sinh sản của thực vật có hoa diễn ra nhờ các bộ phận nào?", "Nhị (cơ quan đực) và nhuỵ (cơ quan cái) của hoa", "Chỉ nhờ vào lá", "Chỉ nhờ vào rễ", "Phấn hoa từ nhị được đưa đến nhuỵ (thụ phấn) thì hoa mới đậu quả, kết hạt."],
      ["Thụ phấn là hiện tượng gì?", "Hạt phấn từ nhị được chuyển đến đầu nhuỵ", "Cây rụng lá vào mùa đông", "Hạt nảy mầm thành cây con", "Thụ phấn nhờ gió, côn trùng như ong, bướm..."],
      ["Sau khi thụ phấn và thụ tinh, bộ phận nào của hoa phát triển thành quả?", "Bầu nhuỵ thành quả, noãn thành hạt", "Cánh hoa thành quả", "Cuống hoa thành quả", "Quả chứa hạt để duy trì nòi giống của cây."],
      ["Hạt nảy mầm cần những điều kiện nào?", "Đủ nước, không khí và nhiệt độ thích hợp", "Chỉ cần ánh sáng mạnh", "Chỉ cần để trong nước nhiều ngày", "Hạt giống tốt, đủ ẩm và ấm sẽ nảy mầm thành cây con."],
      ["Cây con mọc lên từ đâu trong hạt?", "Từ phôi trong hạt (mầm và rễ mầm)", "Từ vỏ hạt", "Từ cánh hoa khô", "Phôi là phần sống trong hạt, phát triển thành cây mới."],
      ["Động vật đẻ trứng gồm những loài nào sau đây?", "Gà, vịt, chim, cá, ếch", "Chó, mèo, lợn", "Trâu, bò, ngựa", "Động vật đẻ trứng: trứng nở thành con non ở ngoài cơ thể mẹ."],
      ["Vòng đời của ếch theo thứ tự nào?", "Trứng → nòng nọc → ếch con → ếch trưởng thành", "Trứng → ếch trưởng thành ngay", "Nòng nọc → trứng → ếch con", "Ếch là động vật biến thái: nòng nọc sống dưới nước, khác hẳn ếch trưởng thành."],
      ["Vòng đời của bướm gồm các giai đoạn nào?", "Trứng → sâu → nhộng → bướm trưởng thành", "Trứng → bướm con → bướm lớn", "Nhộng → trứng → sâu", "Bướm biến thái hoàn toàn qua 4 giai đoạn."],
      ["Thú (động vật có vú) sinh sản bằng cách nào?", "Đẻ con và nuôi con bằng sữa mẹ", "Đẻ trứng như gà", "Tự phân đôi cơ thể", "Chó, mèo, trâu, bò... đều là thú đẻ con."],
      ["Cây trồng mới có thể được nhân giống bằng cách nào ngoài gieo hạt?", "Giâm cành, chiết cành, ghép cành", "Chỉ có thể gieo hạt", "Tưới nước nhiều lần", "Nhiều cây như mía, sắn, hoa hồng được trồng bằng cành."],
      ["Vì sao ong, bướm có ích cho sự sinh sản của cây?", "Giúp thụ phấn khi hút mật giữa các hoa", "Chúng ăn hết hoa của cây", "Chúng làm cây rụng quả", "Nhiều loài cây nhờ côn trùng thụ phấn mới đậu quả tốt."],
      ["Giai đoạn nào trong vòng đời của muỗi sống ở dưới nước?", "Bọ gậy (ấu trùng của muỗi)", "Muỗi trưởng thành", "Trứng muỗi khô trên cạn", "Đậy kín các dụng cụ chứa nước giúp phòng muỗi sinh sản."],
      ["Sự phát triển của cây con từ hạt theo thứ tự nào?", "Hạt nảy mầm → cây con → cây trưởng thành ra hoa", "Cây ra hoa → hạt nảy mầm → cây con", "Cây kết quả → cây con → hạt", "Vòng đời của cây có hoa khép kín: hạt → cây → hoa → quả → hạt."],
      ["Bộ phận nào của hoa có màu sắc và hương thơm để thu hút ong, bướm?", "Cánh hoa", "Lá xanh", "Thân cây", "Khi hút mật, côn trùng vô tình mang phấn hoa giúp cây thụ phấn."],
      ["Hạt giống gồm những bộ phận chính nào?", "Vỏ hạt và phôi (mầm, rễ mầm)", "Chỉ có vỏ hạt", "Vỏ hạt và cánh hoa", "Phôi trong hạt sẽ lớn lên thành cây con khi nảy mầm."],
      ["Muốn hạt nảy mầm nhanh và đều, người ta thường làm gì trước khi gieo?", "Ủ hạt trong khăn ẩm và ấm", "Để hạt ngoài nắng gắt nhiều ngày", "Ngâm hạt trong nước đá lạnh", "Ủ hạt giúp hạt hút đủ nước và đủ ấm để nảy mầm."],
      ["Cây nào sau đây sinh sản chủ yếu bằng củ?", "Khoai tây, khoai lang, gừng", "Cây lúa", "Cây cam", "Củ chứa chất dự trữ và có mầm để mọc thành cây mới."],
      ["Trứng ếch được đẻ ở đâu?", "Dưới nước, thành chùm có chất nhầy bao quanh", "Trên cành cây cao", "Trong tổ xây trên mặt đất", "Nòng nọc nở ra sống dưới nước và thở bằng mang."],
      ["Côn trùng nào biến thái KHÔNG hoàn toàn (con non gần giống con trưởng thành)?", "Châu chấu", "Bướm", "Muỗi", "Châu chấu con chỉ nhỏ hơn và cánh chưa phát triển đầy đủ."],
      ["Chim non mới nở được bố mẹ chăm sóc thế nào?", "Mớm mồi và ủ ấm cho đến khi tự kiếm ăn", "Tự đi kiếm ăn ngay khi nở", "Sống hoàn toàn độc lập", "Hầu hết các loài chim đều chăm sóc con non rất tận tình."],
      ["Vì sao cần bảo vệ các loài ong và bướm?", "Chúng giúp cây thụ phấn, tăng năng suất", "Chỉ vì chúng trông đẹp", "Không có lí do gì cả", "Thiếu côn trùng thụ phấn, nhiều cây không đậu quả được."],
      ["Cá sinh sản bằng cách nào?", "Đẻ trứng và thụ tinh ở trong nước", "Đẻ con như các loài thú", "Tự phân đôi cơ thể", "Mỗi lần cá đẻ rất nhiều trứng để bù số trứng bị mất."],
      ["Cây chuối sinh sản chủ yếu bằng cách nào?", "Cây con mọc lên từ gốc cây mẹ", "Bằng hoa khô rụng xuống", "Bằng lá già", "Người trồng chuối thường tách cây con từ bụi chuối mẹ."],
      ["Hoa lưỡng tính là hoa như thế nào?", "Có cả nhị và nhuỵ trên cùng một hoa", "Chỉ có nhị, không có nhuỵ", "Không có cả nhị và nhuỵ", "Hoa dâm bụt, hoa đậu là hoa lưỡng tính."],
      ["Bộ phận nào của nhị hoa chứa hạt phấn?", "Bao phấn ở đầu chỉ nhị", "Bầu nhuỵ", "Cánh hoa", "Khi bao phấn chín, hạt phấn sẵn sàng cho việc thụ phấn."],
      ["Thụ tinh ở thực vật có hoa là hiện tượng gì?", "Hạt phấn kết hợp với noãn trong bầu nhuỵ", "Hạt nảy mầm trong đất", "Quả chín rụng xuống đất", "Sau khi thụ tinh, noãn phát triển thành hạt, bầu nhuỵ phát triển thành quả."],
      ["Hạt bồ công anh phát tán đi xa nhờ cách nào?", "Nhờ gió, hạt nhẹ có chùm lông như dù", "Nhờ nước biển", "Tự lăn trên mặt đất", "Hạt có cánh hoặc có lông nhẹ dễ bay theo gió đi xa."],
      ["Quả ké có gai móc thường phát tán bằng cách nào?", "Bám vào lông động vật hoặc quần áo người", "Bay theo gió", "Nổ tung khi chín", "Động vật đi qua mang theo hạt đến nơi khác để nảy mầm."],
      ["Cây lá bỏng (cây sống đời) sinh sản bằng bộ phận nào?", "Cây con mọc từ mép lá già", "Chỉ bằng hạt", "Bằng rễ củ", "Lá rụng xuống đất ẩm sẽ mọc thành nhiều cây con."],
      ["Gà mái ấp trứng khoảng bao lâu thì trứng nở?", "Khoảng 21 ngày", "Khoảng 3 ngày", "Khoảng 3 tháng", "Ấp trứng là giữ ấm cho phôi trong trứng phát triển thành gà con."],
      ["Vì sao trứng chim cần được chim bố mẹ ấp?", "Giữ ấm để phôi trong trứng phát triển", "Để trứng đẹp hơn", "Để trứng cứng lại", "Trứng bị lạnh lâu, phôi sẽ ngừng phát triển."],
      ["Rùa biển đẻ trứng ở đâu?", "Lên bãi cát đào hố đẻ trứng rồi lấp cát", "Dưới đáy biển sâu", "Trên cây ven biển", "Rùa con nở ra tự bò xuống biển."],
      ["Cá và ếch thụ tinh theo hình thức nào?", "Thụ tinh ngoài, diễn ra ở trong nước", "Thụ tinh trong cơ thể mẹ", "Không cần thụ tinh", "Con cái đẻ trứng ra nước, con đực phóng tinh trùng lên trứng."],
      ["Vòng đời của gà theo thứ tự nào?", "Trứng → gà con → gà trưởng thành", "Gà con → trứng → gà trưởng thành", "Trứng → gà trưởng thành ngay", "Gà trưởng thành lại đẻ trứng, vòng đời cứ thế tiếp tục."],
      ["Cây con lớn lên khoẻ mạnh cần những điều kiện nào?", "Nước, ánh sáng, không khí và chất dinh dưỡng", "Chỉ cần bóng tối", "Chỉ cần để trong nhà kín", "Thiếu ánh sáng, cây con vống cao, yếu và vàng lá."],
      ["Giâm cành là cách nhân giống như thế nào?", "Cắt đoạn cành cắm xuống đất ẩm cho ra rễ", "Gieo hạt vào đất", "Ghép hai cây với nhau", "Rau muống, khoai lang, hoa hồng thường được trồng bằng giâm cành."],
      ["Thú con mới sinh được nuôi bằng gì?", "Sữa của mẹ trong những tháng đầu", "Tự kiếm ăn ngay", "Chỉ uống nước", "Sữa mẹ là thức ăn tốt nhất cho con non của các loài thú."],
      ["Quả chín thơm, ngọt có vai trò gì cho cây?", "Thu hút động vật ăn và mang hạt đi xa", "Chỉ để trang trí cho cây", "Làm cây ngừng lớn", "Hạt theo phân động vật đến đất mới, mọc thành cây con."],
      ["Muỗi cái đẻ trứng ở đâu?", "Trên mặt nước đọng trong chum, vại, lốp xe", "Trong đất khô", "Trên lá cây cao", "Lật úp dụng cụ chứa nước là cách diệt nơi muỗi đẻ trứng."],
      ["Chiết cành khác giâm cành ở điểm nào?", "Cành vẫn dính cây mẹ cho đến khi ra rễ", "Cắt cành cắm xuống đất ngay", "Không cần cây mẹ", "Chiết cành thường dùng cho cây ăn quả như cam, bưởi, vải."],
    ], [["Nhị hoa", "Cơ quan sinh sản đực của hoa"], ["Nhuỵ hoa", "Cơ quan sinh sản cái của hoa"], ["Nòng nọc", "Con non của ếch"], ["Nhộng", "Giai đoạn giữa sâu và bướm"], ["Bọ gậy", "Con non của muỗi sống dưới nước"], ["Bầu nhuỵ", "Phát triển thành quả"], ["Phôi", "Phần trong hạt mọc thành cây con"], ["Thụ phấn", "Hạt phấn chuyển đến đầu nhuỵ"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp vòng đời của BƯỚM theo đúng thứ tự!", ["Trứng", "Sâu (ấu trùng)", "Nhộng", "Bướm trưởng thành"]); });
    kp.games.push(function () { return sortQ("Sắp xếp vòng đời của ẾCH theo đúng thứ tự!", ["Trứng ở dưới nước", "Nòng nọc", "Ếch con mọc chân, rụng đuôi", "Ếch trưởng thành"]); });
    return { id: "kh5-sinhsan", emoji: "🌸", name: "Sinh sản của thực vật và động vật", sub: "Sinh sản của thực vật có hoa • Sự phát triển của cây con • Sinh sản và vòng đời của động vật", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Vi khuẩn là sinh vật như thế nào?", "Sinh vật rất nhỏ, phải nhìn bằng kính hiển vi", "Con vật nhìn thấy bằng mắt thường", "Một loại cây nhỏ", "Vi khuẩn có trong đất, nước, không khí, trên cơ thể người..."],
      ["Vi khuẩn có ích được dùng trong chế biến thực phẩm nào?", "Làm sữa chua, muối dưa, làm dấm, làm nước mắm", "Làm bánh bị mốc", "Làm thức ăn bị ôi thiu", "Vi khuẩn lactic giúp lên men sữa thành sữa chua ngon, tốt cho tiêu hoá."],
      ["Muối dưa, muối cà chua ngon được là nhờ đâu?", "Nhờ vi khuẩn có ích lên men", "Nhờ để ngoài nắng gắt", "Nhờ thêm chất bảo quản độc hại", "Lên men là cách chế biến, bảo quản thực phẩm lâu đời."],
      ["Vi khuẩn gây bệnh lây lan qua những đường nào?", "Qua đường ăn uống, hô hấp, tiếp xúc với đồ vật bẩn", "Qua ánh sáng mặt trời", "Qua giấc mơ", "Bệnh tả, thương hàn lây qua ăn uống; cúm lây qua hô hấp."],
      ["Việc làm nào giúp phòng tránh bệnh do vi khuẩn gây ra?", "Rửa tay bằng xà phòng trước khi ăn và sau khi đi vệ sinh", "Ăn thức ăn ôi thiu", "Dùng chung khăn mặt với người bệnh", "Rửa tay sạch là cách phòng bệnh đơn giản, hiệu quả."],
      ["Vì sao cần ăn chín, uống sôi?", "Nhiệt độ cao diệt phần lớn vi khuẩn gây bệnh", "Để thức ăn thơm hơn mà thôi", "Không có tác dụng phòng bệnh", "Thức ăn sống, tái dễ chứa vi khuẩn gây bệnh đường ruột."],
      ["Thực phẩm để lâu có mùi ôi, chua là do đâu?", "Vi khuẩn phát triển làm hỏng thực phẩm", "Do thực phẩm tự thay đổi màu", "Do hơi nước trong tủ lạnh", "Thức ăn ôi thiu ăn vào dễ bị ngộ độc, đau bụng."],
      ["Khi ho, hắt hơi, em nên làm gì để không lây bệnh cho người khác?", "Che miệng bằng khuỷu tay, đeo khẩu trang khi ốm", "Ho thẳng vào mặt bạn", "Không cần làm gì", "Vi khuẩn, vi rút gây bệnh đường hô hấp phát tán qua giọt bắn."],
      ["Bảo quản thực phẩm trong tủ lạnh có tác dụng gì?", "Làm chậm vi khuẩn phát triển, thực phẩm lâu hỏng", "Tiêu diệt mọi vi khuẩn ngay lập tức", "Làm thực phẩm ngon gấp đôi", "Dù để tủ lạnh, thực phẩm vẫn phải dùng trong thời gian hợp lí và nấu chín kĩ."],
      ["Vi khuẩn có ở những đâu xung quanh ta?", "Trong đất, nước, không khí và trên cơ thể người", "Chỉ ở trong bệnh viện", "Chỉ ở dưới biển sâu", "Phần lớn vi khuẩn vô hại, một số có ích, một số ít gây bệnh."],
      ["Tiêm vắc-xin có tác dụng gì?", "Giúp cơ thể phòng được một số bệnh nguy hiểm", "Chữa khỏi mọi bệnh ngay lập tức", "Thay thế cho việc ăn uống", "Tiêm chủng đầy đủ là cách phòng bệnh chủ động cho trẻ em."],
      ["Vì sao không nên dùng chung cốc, thìa với người đang bị ốm?", "Vi khuẩn gây bệnh có thể lây qua đồ dùng chung", "Vì đồ dùng sẽ mau hỏng", "Vì trông không đẹp", "Đồ dùng cá nhân nên dùng riêng, nhất là khi có người bệnh."],
      ["Nước uống an toàn cho sức khoẻ là nước thế nào?", "Nước sạch, đã đun sôi hoặc nước đóng chai đạt chuẩn", "Nước ao hồ uống trực tiếp", "Nước có màu đẹp", "Nước bẩn chứa nhiều vi khuẩn gây bệnh tiêu hoá."],
      ["Kính hiển vi được dùng để làm gì khi học về vi khuẩn?", "Quan sát sinh vật rất nhỏ mà mắt thường không thấy được", "Ngắm các vì sao trên trời", "Đọc chữ ở rất xa", "Nhờ kính hiển vi, con người mới khám phá được thế giới vi khuẩn."],
      ["Vi khuẩn lactic có ích trong món ăn nào sau đây?", "Sữa chua và dưa muối", "Bánh kem để lâu ngoài trời", "Thịt đã bị ôi thiu", "Vi khuẩn lactic lên men tạo vị chua dễ chịu và giúp bảo quản thức ăn."],
      ["Sữa chua cần được bảo quản thế nào cho an toàn?", "Để trong tủ lạnh và dùng trước hạn sử dụng", "Để ngoài nắng cho ấm", "Mở nắp để nhiều ngày", "Hạn sử dụng cho biết khoảng thời gian thực phẩm còn an toàn."],
      ["Bệnh tiêu chảy cấp thường lây truyền qua đường nào?", "Đường ăn uống (thức ăn, nước uống nhiễm khuẩn)", "Qua tiếng nói chuyện", "Qua ánh nắng mặt trời", "Giữ vệ sinh ăn uống là cách phòng bệnh tiêu chảy hiệu quả nhất."],
      ["Những thời điểm nào em cần rửa tay bằng xà phòng?", "Trước khi ăn, sau khi đi vệ sinh, sau khi chơi ngoài trời", "Chỉ khi tay nhìn thấy bẩn", "Không cần rửa tay bao giờ", "Rửa tay với xà phòng giúp loại bỏ phần lớn vi khuẩn gây bệnh."],
      ["Ủ phân hữu cơ để bón cây có liên quan gì đến vi khuẩn?", "Vi khuẩn phân giải chất hữu cơ thành mùn tốt cho đất", "Vi khuẩn làm cho phân mất chất", "Hoàn toàn không liên quan", "Vi sinh vật trong đất giúp đất màu mỡ một cách tự nhiên."],
      ["Vì sao không nên để thức ăn chín ngay cạnh thịt sống trong tủ lạnh?", "Vi khuẩn từ thịt sống có thể lây sang thức ăn chín", "Vì trông lộn xộn, không đẹp", "Vì thịt sống sẽ bị chín mất", "Để riêng thực phẩm sống và chín là nguyên tắc an toàn thực phẩm."],
      ["Men vi sinh trong sữa chua có tác dụng gì?", "Hỗ trợ hệ tiêu hoá khoẻ mạnh", "Làm tóc mọc dài nhanh", "Giúp cao lên ngay lập tức", "Ruột khoẻ giúp cơ thể hấp thu tốt chất dinh dưỡng."],
      ["Thức ăn thừa sau bữa ăn nên xử lí thế nào?", "Đậy kín, cất tủ lạnh, ăn hết sớm và hâm nóng kĩ khi ăn lại", "Để trên bàn qua đêm", "Trộn lẫn vào thức ăn mới nấu", "Thức ăn để ngoài lâu dễ nhiễm khuẩn gây đau bụng, ngộ độc."],
      ["Dung dịch rửa tay khô có thay thế hoàn toàn được rửa tay bằng xà phòng không?", "Không; rửa tay bằng xà phòng vẫn là tốt nhất", "Thay thế hoàn toàn trong mọi trường hợp", "Hoàn toàn không có tác dụng", "Chỉ khi không có nước sạch mới tạm dùng dung dịch sát khuẩn tay."],
      ["Vi khuẩn thường có những hình dạng nào?", "Hình cầu, hình que và hình xoắn", "Hình vuông, hình sao", "Hình lá cây", "Dù hình dạng khác nhau, vi khuẩn đều rất nhỏ."],
      ["Vi khuẩn sinh sản bằng cách nào?", "Tự phân chia một thành hai (phân đôi)", "Đẻ trứng như gà", "Nở hoa kết hạt", "Gặp điều kiện thuận lợi, vi khuẩn nhân lên rất nhanh."],
      ["Bệnh sâu răng chủ yếu do đâu?", "Vi khuẩn trong miệng tạo a-xít phá men răng", "Do ăn quá nhiều rau", "Do uống nước lọc", "Đánh răng sau khi ăn và trước khi đi ngủ giúp phòng sâu răng."],
      ["Thuốc kháng sinh cần dùng thế nào cho đúng?", "Chỉ dùng khi bác sĩ kê đơn, uống đủ liều", "Tự mua uống khi hơi mệt", "Ngừng ngay khi thấy đỡ", "Dùng kháng sinh bừa bãi gây nhờn thuốc và hại sức khoẻ."],
      ["Nước mắm và tương được làm ra nhờ quá trình nào?", "Vi sinh vật lên men nguyên liệu", "Phơi nắng cho thật khô", "Đun sôi nhiều lần", "Lên men là cách chế biến truyền thống tạo nhiều món ăn ngon."],
      ["Vi khuẩn trong đất có vai trò gì với cây trồng?", "Phân giải xác sinh vật thành mùn cho đất", "Làm đất cứng lại", "Ăn hết rễ cây", "Đất giàu vi sinh vật có ích thì màu mỡ, cây trồng tốt."],
      ["Đeo khẩu trang khi đến nơi đông người giúp ích gì?", "Giảm hít phải giọt bắn mang mầm bệnh", "Không có tác dụng gì", "Thay thế được rửa tay", "Khẩu trang kết hợp rửa tay giúp phòng bệnh đường hô hấp tốt hơn."],
      ["Phơi chăn màn, quần áo ngoài nắng có tác dụng gì?", "Ánh nắng diệt bớt vi khuẩn và nấm mốc", "Làm chăn màn nặng hơn", "Không có tác dụng", "Nắng gắt và khô ráo là kẻ thù của nhiều vi khuẩn, nấm mốc."],
      ["Trước khi ăn rau sống, em cần làm gì?", "Rửa sạch nhiều lần dưới vòi nước", "Ăn ngay không cần rửa", "Chỉ cần phủi bụi", "Rau sống dễ bám đất bẩn và vi khuẩn gây bệnh đường ruột."],
      ["Ăn tiết canh, gỏi sống có nguy cơ gì?", "Dễ nhiễm vi khuẩn và kí sinh trùng", "Hoàn toàn an toàn", "Giúp cơ thể khoẻ hơn", "Thức ăn sống, tái là nguồn lây nhiều bệnh nguy hiểm."],
      ["Sữa tươi tiệt trùng là sữa như thế nào?", "Đã xử lí nhiệt để diệt vi khuẩn gây bệnh", "Sữa vừa vắt chưa xử lí", "Sữa để ngoài trời lâu ngày", "Trên hộp sữa luôn ghi rõ hạn sử dụng cần tuân thủ."],
      ["Sau khi chơi với chó, mèo, em cần làm gì?", "Rửa tay sạch bằng xà phòng", "Ăn ngay cho đỡ đói", "Không cần làm gì", "Lông và da vật nuôi có thể mang vi khuẩn gây bệnh."],
      ["Lớp học nên được vệ sinh thế nào để ít mầm bệnh?", "Quét dọn, lau bàn ghế, mở cửa thoáng khí", "Đóng kín cửa cả ngày", "Một tháng dọn một lần", "Không khí lưu thông và phòng sạch giúp giảm vi khuẩn."],
      ["Vi khuẩn có ích ở rễ cây họ đậu giúp cây điều gì?", "Lấy thêm chất đạm từ không khí cho cây", "Làm cây héo đi", "Không giúp gì", "Nhờ chúng, đất trồng cây họ đậu trở nên tốt hơn."],
      ["Khi bị ốm, vì sao em nên nghỉ học ở nhà?", "Để mau khỏi bệnh và không lây cho bạn", "Để được chơi nhiều hơn", "Không có lí do gì", "Nghỉ ngơi và uống thuốc theo hướng dẫn giúp bệnh mau khỏi."],
      ["Mở nắp hộp sữa chua thấy phồng, có mùi lạ, em nên làm gì?", "Không ăn, bỏ đi vì sữa đã hỏng", "Vẫn ăn bình thường", "Đun sôi là ăn được", "Thực phẩm biến mùi, đổi màu là dấu hiệu đã nhiễm khuẩn."],
      ["Vì sao không nên uống nước lã trực tiếp từ ao hồ?", "Nước chưa xử lí chứa nhiều vi khuẩn gây bệnh", "Vì nước lã không ngon", "Vì nước lã quá lạnh", "Chỉ uống nước đun sôi hoặc nước đóng chai đạt chuẩn."],
    ], [["Sữa chua", "Vi khuẩn có ích lên men sữa"], ["Rửa tay xà phòng", "Phòng bệnh đường tiêu hoá"], ["Ăn chín uống sôi", "Diệt vi khuẩn trong thức ăn"], ["Vắc-xin", "Phòng bệnh chủ động"], ["Kính hiển vi", "Quan sát vi khuẩn rất nhỏ"], ["Kháng sinh", "Thuốc diệt vi khuẩn, dùng theo đơn"], ["Sâu răng", "Vi khuẩn phá hỏng men răng"], ["Ủ phân hữu cơ", "Vi khuẩn phân giải thành mùn"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước RỬA TAY đúng cách theo đúng thứ tự!", ["Làm ướt tay và thoa xà phòng", "Chà kĩ lòng tay, kẽ ngón, móng tay", "Rửa lại dưới vòi nước sạch", "Lau khô tay bằng khăn sạch"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các bước MUỐI DƯA CHUA theo đúng thứ tự!", ["Rửa sạch rau, để ráo nước", "Pha nước muối ấm vừa miệng", "Cho rau vào lọ, đổ nước muối ngập rau", "Đậy kín, chờ dưa lên men chua"]); });
    return { id: "kh5-vikhuan", emoji: "🦠", name: "Vi khuẩn quanh ta", sub: "Vi khuẩn có ích trong chế biến thực phẩm • Vi khuẩn gây bệnh và cách phòng tránh", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Cơ thể người được hình thành và lớn lên qua các giai đoạn nào?", "Trẻ em → dậy thì → trưởng thành → tuổi già", "Chỉ có một giai đoạn duy nhất", "Người già → trẻ em", "Mỗi giai đoạn cơ thể có những thay đổi riêng."],
      ["Tuổi dậy thì là giai đoạn cơ thể có thay đổi gì?", "Lớn nhanh, cao nhiều, tâm sinh lí thay đổi", "Cơ thể ngừng lớn hoàn toàn", "Không có thay đổi gì", "Dậy thì là giai đoạn bình thường mà ai cũng trải qua (thường từ khoảng 10–15 tuổi)."],
      ["Để cơ thể khoẻ mạnh ở tuổi dậy thì, em nên làm gì?", "Ăn đủ chất, ngủ đủ giấc, vận động mỗi ngày", "Thức khuya chơi điện tử thường xuyên", "Bỏ bữa sáng hằng ngày", "Thói quen tốt giúp cơ thể phát triển toàn diện."],
      ["Vùng riêng tư (vùng kín) trên cơ thể là vùng nào?", "Vùng được đồ bơi che phủ của cơ thể", "Bàn tay và khuôn mặt", "Bàn chân", "Nhận biết vùng riêng tư giúp em tự bảo vệ bản thân."],
      ["Nếu có người chạm vào vùng riêng tư khiến em khó chịu, em phải làm gì?", "Nói KHÔNG, tránh xa và kể ngay với người lớn", "Im lặng và giấu kín", "Cho là chuyện bình thường", "Kể với người lớn tin cậy là cách bảo vệ mình; đó không bao giờ là lỗi của em."],
      ["Hành vi nào là KHÔNG AN TOÀN, cần từ chối?", "Người lạ cho quà, rủ đi theo và dặn “giữ bí mật” với bố mẹ", "Bạn cùng lớp rủ chơi nhảy dây", "Cô giáo dặn làm bài tập", "Những “bí mật” khiến em khó chịu, sợ hãi thì phải kể ngay với người lớn."],
      ["Khi đi một mình và cảm thấy có người lạ bám theo, em nên làm gì?", "Đến nơi đông người, nhờ giúp đỡ và gọi bố mẹ", "Chạy vào ngõ vắng", "Đứng yên chờ người lạ đến gần", "Tìm nơi an toàn và người lớn để được giúp ngay."],
      ["Ai là người lớn tin cậy mà em có thể kể mọi chuyện khó nói?", "Bố mẹ, ông bà, thầy cô giáo, người thân mà em tin tưởng", "Người lạ trên mạng xã hội", "Bạn mới quen qua mạng", "Luôn có người lớn sẵn sàng lắng nghe và bảo vệ em."],
      ["Trên mạng Internet, em nên ứng xử thế nào cho an toàn?", "Không chia sẻ ảnh riêng tư, địa chỉ, mật khẩu", "Gửi ảnh cho bất kì ai yêu cầu", "Cho mọi người biết mật khẩu", "An toàn trên mạng cũng quan trọng như an toàn ngoài đời."],
      ["Em nhìn thấy bạn bị trêu chọc, sờ vào cơ thể khiến bạn khóc. Em nên làm gì?", "Đứng về phía bạn, yêu cầu dừng lại và báo ngay với thầy cô", "Cười đùa cùng cho vui", "Quay clip đăng lên mạng", "Bảo vệ bạn cũng là trách nhiệm của mỗi người."],
      ["Câu nói nào thể hiện em biết tự bảo vệ bản thân?", "“Không! Dừng lại! Cháu sẽ kể với bố mẹ cháu.”", "“Cháu sẽ giữ bí mật này mãi.”", "“Cháu sợ nhưng sẽ im lặng.”", "Nói không, tránh xa, kể với người lớn tin cậy — ba bước bảo vệ bản thân."],
      ["Ngủ đủ giấc ở tuổi học sinh tiểu học (khoảng 9–11 tiếng) giúp cơ thể thế nào?", "Giúp lớn cao, học tập tỉnh táo, ít ốm vặt", "Không ảnh hưởng gì", "Làm trí nhớ kém đi", "Giấc ngủ rất quan trọng cho sự phát triển chiều cao và trí não."],
      ["Khi cơ thể có dấu hiệu bất thường hoặc bị thương, em nên làm gì?", "Kể ngay với bố mẹ, thầy cô để được chăm sóc", "Tự ý uống thuốc của người khác", "Giấu không cho ai biết", "Người lớn sẽ giúp em xử lí đúng cách và an toàn."],
      ["Tuổi dậy thì của mỗi người thường bắt đầu vào khoảng độ tuổi nào?", "Khoảng 10–15 tuổi, mỗi người một thời điểm khác nhau", "Đúng ngày sinh nhật 20 tuổi", "Ngay từ khi mới sinh ra", "Dậy thì sớm hay muộn hơn một chút đều là điều bình thường."],
      ["Ăn uống đầy đủ ở tuổi dậy thì cần có những nhóm chất nào?", "Bột đường, đạm, béo, vi-ta-min và khoáng chất", "Chỉ cần ăn thật nhiều kẹo ngọt", "Chỉ ăn một món mình thích nhất", "Ăn đa dạng các loại thực phẩm giúp cơ thể phát triển cân đối."],
      ["Vận động và chơi thể thao mỗi ngày mang lại điều gì?", "Khoẻ mạnh, cao lớn, tinh thần vui vẻ", "Chỉ làm em mệt mỏi vô ích", "Hoàn toàn không có tác dụng", "Học sinh nên vận động ít nhất 60 phút mỗi ngày."],
      ["Cảm xúc thay đổi thất thường ở tuổi dậy thì, em nên làm gì?", "Chia sẻ với bố mẹ, thầy cô để được thấu hiểu và giúp đỡ", "Giấu kín mọi cảm xúc trong lòng", "Cho rằng đó hoàn toàn là lỗi của mình", "Chia sẻ cảm xúc giúp em nhẹ lòng và được hỗ trợ kịp thời."],
      ["“Quy tắc 5 ngón tay” giúp em ghi nhớ điều gì?", "Các vòng người thân và giới hạn tiếp xúc phù hợp", "Cách đếm số bằng tay", "Cách rửa tay đúng quy trình", "Gia đình ruột thịt là vòng gần nhất; người lạ ở vòng ngoài cùng."],
      ["Khi ở nhà một mình, quy tắc an toàn nào em phải nhớ?", "Không mở cửa cho người lạ khi ở nhà một mình", "Mở cửa tiếp khách giúp bố mẹ", "Khoe trên mạng là mình ở nhà một mình", "Có việc bất thường, hãy gọi ngay cho bố mẹ hoặc hàng xóm tin cậy."],
      ["Khi đi bơi, quy tắc an toàn nào sau đây là đúng?", "Thay đồ ở phòng riêng, không ai được nhìn, chụp ảnh", "Thay đồ ở chỗ đông người cho nhanh", "Nhờ người lạ chụp ảnh giúp", "Không gian thay đồ là riêng tư và cần được mọi người tôn trọng."],
      ["Có người đề nghị chụp “ảnh bí mật” của em và dặn không nói với bố mẹ. Em làm gì?", "Từ chối ngay và kể lại với bố mẹ, thầy cô", "Đồng ý nếu họ hứa không đăng lên mạng", "Chỉ kể cho bạn thân của em", "Mọi bí mật liên quan đến cơ thể và hình ảnh của em đều phải nói với người lớn."],
      ["Khi bị lạc ở nơi đông người, em nên tìm ai để nhờ giúp đỡ?", "Công an, bảo vệ hoặc nhân viên tại nơi đó", "Bất kì người lạ nào đi ngang qua", "Tự đi tìm đường một mình thật xa", "Người mặc đồng phục làm việc tại nơi đó thường đáng tin cậy."],
      ["Em cần ghi nhớ những số điện thoại nào để phòng khi khẩn cấp?", "Số của bố mẹ, người thân và các số 111, 113, 115", "Chỉ cần nhớ số của bạn thân", "Không cần nhớ số nào cả", "Thuộc số điện thoại của bố mẹ giúp em liên lạc khi không có máy riêng."],
      ["Em bé ở trong bụng mẹ khoảng bao lâu thì chào đời?", "Khoảng 9 tháng", "Khoảng 1 tháng", "Khoảng 2 năm", "Trong bụng mẹ, em bé lớn dần lên mỗi ngày cho đến khi đủ tháng."],
      ["Trẻ sơ sinh cần được chăm sóc thế nào?", "Bú sữa mẹ, giữ ấm, tiêm chủng đầy đủ", "Ăn cơm như người lớn", "Không cần tiêm chủng", "Sữa mẹ là thức ăn tốt nhất cho trẻ sơ sinh."],
      ["Tuổi vị thành niên kéo dài trong khoảng nào?", "Từ khoảng 10 đến 19 tuổi", "Từ 1 đến 5 tuổi", "Từ 30 đến 40 tuổi", "Dậy thì là một phần của tuổi vị thành niên."],
      ["Ở tuổi dậy thì, da thường thay đổi thế nào và em cần làm gì?", "Da nhiều dầu, dễ nổi mụn; cần rửa mặt sạch", "Da khô hẳn, không cần vệ sinh", "Tự nặn mụn cho nhanh khỏi", "Không tự nặn mụn để tránh nhiễm trùng và để lại sẹo."],
      ["Uống đủ nước mỗi ngày mang lại lợi ích gì?", "Cơ thể khoẻ, da đẹp, học tập tỉnh táo", "Không có lợi ích gì", "Làm em mệt hơn", "Học sinh nên uống nước lọc đều trong ngày, khoảng 1,5 lít tuỳ vận động."],
      ["Thuốc lá và rượu bia ảnh hưởng thế nào đến cơ thể đang lớn?", "Rất có hại cho phổi, gan và sự phát triển", "Giúp cơ thể khoẻ hơn", "Không ảnh hưởng gì", "Trẻ em tuyệt đối không thử thuốc lá, rượu bia."],
      ["Bạn bè rủ em xem hình ảnh không phù hợp về cơ thể người khác, em nên làm gì?", "Từ chối, rời đi và kể với người lớn tin cậy", "Xem cùng cho vui", "Chia sẻ tiếp cho bạn khác", "Hình ảnh không lành mạnh có thể làm em khó chịu, lo lắng — hãy tránh xa."],
      ["Một người quen ôm, hôn làm em khó chịu. Em có quyền gì?", "Có quyền từ chối — cơ thể là của em", "Phải chịu đựng vì là người quen", "Không được nói gì", "Dù là người quen, em vẫn được tôn trọng giới hạn của mình."],
      ["Người lạ nhắn tin rủ em gửi ảnh cơ thể, em phải làm gì?", "Không gửi, chặn và kể ngay với bố mẹ", "Gửi nếu họ hứa giữ bí mật", "Chỉ kể cho bạn thân", "Tuyệt đối không gửi ảnh riêng tư cho bất kì ai trên mạng."],
      ["Khi đi học về muộn, trời tối, em nên đi đường nào?", "Đường sáng đèn, đông người, đi cùng bạn", "Đường tắt vắng vẻ cho nhanh", "Đi một mình trong ngõ tối", "Báo trước cho bố mẹ nếu em về muộn bất thường."],
      ["Bị trêu chọc về cơ thể trên mạng (bình luận xấu), em nên làm gì?", "Không đáp trả, lưu lại và kể với người lớn", "Trả đũa bằng lời lẽ xấu", "Giấu kín, chịu đựng một mình", "Người lớn và nhà trường sẽ giúp em xử lí việc bắt nạt."],
      ["Khám sức khoẻ định kì ở trường giúp em điều gì?", "Phát hiện sớm vấn đề về mắt, răng, chiều cao", "Không giúp ích gì", "Chỉ để được nghỉ học", "Đo thị lực, khám răng định kì giúp chữa trị kịp thời."],
      ["Để răng chắc khoẻ, em cần làm gì mỗi ngày?", "Đánh răng sáng và tối, hạn chế đồ ngọt", "Chỉ đánh răng khi đau răng", "Ăn nhiều kẹo rồi súc miệng", "Khám răng 6 tháng một lần giúp phát hiện sâu răng sớm."],
      ["Ngồi học và dùng máy tính đúng tư thế là thế nào?", "Lưng thẳng, mắt cách màn hình vừa phải", "Cúi sát vào màn hình", "Nằm dài khi học", "Tư thế đúng giúp tránh gù lưng và cận thị."],
      ["Người già trong gia đình cần được chăm sóc thế nào?", "Ăn uống điều độ, vận động nhẹ, khám định kì", "Không cần quan tâm", "Chỉ cần cho ăn thật nhiều", "Quan tâm, trò chuyện giúp ông bà vui khoẻ mỗi ngày."],
      ["Bạn thân khóc và nói “đây là bí mật” về việc bị chạm vào cơ thể. Em nên làm gì?", "Khuyên bạn kể với người lớn và cùng bạn đi kể", "Giữ bí mật giúp bạn mãi mãi", "Mặc kệ bạn", "Bí mật khiến bạn sợ hãi, tổn thương thì phải nói với người lớn ngay."],
      ["Khi tắm ở bể bơi công cộng, quy tắc nào giúp em an toàn?", "Tắm cùng người lớn, không xuống vùng nước sâu", "Tự bơi ra xa một mình", "Chạy nhảy trên bờ bể trơn", "An toàn dưới nước quan trọng không kém an toàn về cơ thể."],
    ], [["Vùng riêng tư", "Vùng đồ bơi che phủ"], ["Nói KHÔNG", "Từ chối hành vi không an toàn"], ["Người lớn tin cậy", "Bố mẹ, ông bà, thầy cô"], ["Tổng đài 111", "Bảo vệ trẻ em quốc gia"], ["9–11 tiếng ngủ", "Cần cho trẻ em mỗi đêm"], ["Sữa mẹ", "Thức ăn tốt nhất cho trẻ sơ sinh"], ["Dậy thì", "Giai đoạn cơ thể lớn nhanh"], ["Vận động mỗi ngày", "Cơ thể khoẻ, học tốt hơn"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp 4 BƯỚC TỰ BẢO VỆ bản thân theo đúng thứ tự!", ["Nói KHÔNG rõ ràng", "Tránh xa người đó ngay lập tức", "Chạy đến nơi đông người", "Kể ngay với người lớn tin cậy"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các GIAI ĐOẠN PHÁT TRIỂN của con người theo đúng thứ tự!", ["Trẻ sơ sinh", "Trẻ em", "Tuổi dậy thì – vị thành niên", "Người trưởng thành"]); });
    return { id: "kh5-suckhoe", emoji: "🧒", name: "Con người và sức khoẻ", sub: "Sự hình thành cơ thể người • Các giai đoạn phát triển • Chăm sóc sức khoẻ tuổi dậy thì • Phòng tránh bị xâm hại (an toàn)", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Môi trường có chức năng gì đối với con người và sinh vật?", "Cung cấp nơi sống, thức ăn, nước và không khí", "Chỉ để làm cảnh đẹp", "Không liên quan đến sự sống", "Môi trường còn là nơi chứa đựng chất thải; bảo vệ môi trường là bảo vệ chính cuộc sống của chúng ta."],
      ["Hành động nào của con người gây hại cho môi trường?", "Chặt phá rừng bừa bãi, xả rác và nước thải bẩn ra sông hồ", "Trồng thêm cây xanh", "Dọn vệ sinh khu phố", "Rác thải nhựa rất lâu phân huỷ, gây ô nhiễm đất và nước."],
      ["Phá rừng gây ra những hậu quả gì?", "Xói mòn đất, lũ lụt, động vật mất nơi sống", "Không có hậu quả gì", "Làm đất màu mỡ hơn", "Rừng được gọi là “lá phổi xanh” của Trái Đất."],
      ["Việc làm nào giúp bảo vệ môi trường nước?", "Không xả rác, dầu mỡ xuống sông hồ; tiết kiệm nước sạch", "Đổ nước rửa bát trực tiếp ra ao", "Vứt pin cũ xuống sông", "Nước sạch là tài nguyên quý, ngày càng khan hiếm."],
      ["Phân loại rác tại nguồn có lợi ích gì?", "Giúp tái chế rác, giảm rác chôn lấp", "Làm rác nhiều thêm", "Không có lợi ích gì", "Rác hữu cơ, rác tái chế và rác khó phân huỷ cần được phân loại."],
      ["Tái chế chai nhựa, giấy cũ giúp ích gì?", "Giảm rác, tiết kiệm nguyên liệu, năng lượng", "Làm ô nhiễm thêm", "Không thay đổi gì", "Nhiều đồ vật quanh em được làm từ vật liệu tái chế."],
      ["Khói bụi từ nhà máy và xe cộ gây tác hại gì?", "Ô nhiễm không khí, gây bệnh hô hấp cho con người", "Làm không khí trong lành hơn", "Giúp cây lớn nhanh", "Trồng cây xanh giúp lọc bụi, làm mát không khí."],
      ["Hành động nào của học sinh góp phần bảo vệ môi trường?", "Bỏ rác đúng nơi, trồng cây, tiết kiệm điện nước", "Vứt rác ra sân trường", "Bẻ cành cây trong vườn trường", "Mỗi hành động nhỏ đều góp phần làm môi trường xanh – sạch – đẹp."],
      ["Động vật hoang dã cần được bảo vệ vì sao?", "Nhiều loài đang có nguy cơ tuyệt chủng", "Để bắt về nuôi chơi", "Vì chúng không quan trọng", "Không săn bắt, buôn bán động vật hoang dã là bảo vệ đa dạng sinh học."],
      ["Biến đổi khí hậu gây ra hiện tượng nào?", "Nắng nóng gay gắt hơn, bão lũ bất thường, nước biển dâng", "Thời tiết luôn ổn định", "Bốn mùa giống hệt nhau", "Giảm khí thải và trồng cây giúp hạn chế biến đổi khí hậu."],
      ["Nguồn năng lượng nào thân thiện với môi trường?", "Năng lượng mặt trời, gió, nước chảy", "Than đá, dầu mỏ đốt cháy nhiều khói", "Đốt rác nhựa lấy nhiệt", "Năng lượng tái tạo sạch, không cạn kiệt."],
      ["Túi ni-lông khó phân huỷ gây hại thế nào?", "Tồn tại rất lâu, gây ô nhiễm đất và nước", "Tự tan ngay trong nước", "Nên dùng càng nhiều càng tốt", "Hạn chế đồ nhựa dùng một lần là việc ai cũng làm được."],
      ["Khu bảo tồn thiên nhiên được lập ra để làm gì?", "Bảo vệ sinh vật và môi trường sống của chúng", "Xây khu mua sắm", "Khai thác gỗ tự do", "Việt Nam có nhiều vườn quốc gia, khu bảo tồn nổi tiếng như Cúc Phương, Cát Tiên."],
      ["Môi trường “chứa đựng chất thải” có nghĩa là gì?", "Tiếp nhận rác thải, nước thải của con người", "Môi trường tự sinh ra rác thải", "Môi trường không liên quan đến chất thải", "Nếu chất thải vượt quá khả năng tiếp nhận, môi trường sẽ bị ô nhiễm."],
      ["Nguồn nước bị ô nhiễm có thể gây ra bệnh gì?", "Bệnh đường ruột như tiêu chảy, tả, thương hàn", "Bệnh cận thị", "Không gây bệnh gì cả", "Ăn chín, uống nước đun sôi là cách phòng bệnh hiệu quả."],
      ["Đốt rác thải nhựa ngoài trời gây hại gì?", "Tạo khói độc, ô nhiễm không khí, hại sức khoẻ", "Làm rác biến mất hoàn toàn vô hại", "Giúp khử trùng không khí", "Rác nhựa cần được thu gom và xử lí đúng quy trình."],
      ["Hành động nào giúp giảm rác nhựa dùng một lần?", "Mang bình nước cá nhân, dùng hộp cơm dùng nhiều lần", "Mỗi lần mua nước đều lấy một chai mới", "Lấy thật nhiều túi ni-lông cho chắc", "Thói quen nhỏ mỗi ngày giúp giảm một lượng rác rất lớn."],
      ["Ao hồ bị phủ kín bèo lục bình dày đặc là dấu hiệu gì?", "Nước thừa chất thải hữu cơ làm thiếu ô-xi cho cá (phú dưỡng)", "Nước trong ao rất sạch", "Ao hồ đang đẹp lên", "Cá và sinh vật dưới nước cần ô-xi hoà tan trong nước để sống."],
      ["Trồng rừng ngập mặn ven biển mang lại lợi ích gì?", "Chắn sóng gió, chống xói lở bờ, là nơi sống của tôm cá", "Làm cho biển hẹp lại vô ích", "Chỉ để lấy gỗ làm củi", "Rừng ngập mặn là “bức tường xanh” bảo vệ vùng ven biển."],
      ["Tiết kiệm giấy giúp bảo vệ môi trường như thế nào?", "Giấy làm từ cây rừng nên tiết kiệm giấy là giữ rừng xanh", "Hoàn toàn không liên quan đến rừng", "Giấy không được làm từ cây", "Dùng cả hai mặt giấy và thu gom giấy cũ tái chế là việc nên làm."],
      ["Tiếng ồn lớn trong khu dân cư gây hại gì?", "Ảnh hưởng giấc ngủ, sức khoẻ và việc học tập của mọi người", "Không gây hại gì cả", "Làm mọi người vui vẻ hơn", "Giữ yên tĩnh nơi công cộng cũng là bảo vệ môi trường sống."],
      ["Đi dã ngoại trong rừng, “không để lại gì ngoài dấu chân” nghĩa là gì?", "Mang rác về, không bẻ cây, không hại thiên nhiên", "Khắc tên lên cây để làm kỉ niệm", "Vứt rác hữu cơ tuỳ ý trong rừng", "Du lịch có trách nhiệm giúp thiên nhiên mãi xanh đẹp."],
      ["Em có thể làm gì để bảo vệ nguồn nước ở quê hương?", "Không vứt rác xuống kênh rạch, sông hồ", "Đổ nước giặt thẳng ra sông", "Mặc kệ vì nước sẽ tự chảy đi", "Giữ nguồn nước sạch là giữ sức khoẻ cho cả cộng đồng."],
      ["Giờ Trái Đất là hoạt động gì?", "Tắt đèn 1 giờ để tiết kiệm điện", "Bật tất cả đèn cùng lúc", "Đốt nến suốt đêm", "Giờ Trái Đất nhắc mọi người tiết kiệm năng lượng, bảo vệ môi trường."],
      ["Túi ni-lông dùng một lần nên được thay bằng gì?", "Túi vải, giỏ đi chợ dùng nhiều lần", "Thêm nhiều túi ni-lông hơn", "Túi giấy đốt ngay sau khi dùng", "Mang theo túi vải khi đi chợ giúp giảm rác nhựa rất nhiều."],
      ["Rác điện tử (pin cũ, đồ điện hỏng) cần xử lí thế nào?", "Đưa đến điểm thu gom riêng để xử lí", "Vứt chung với rác nhà", "Chôn xuống vườn", "Rác điện tử chứa chất độc hại nên cần được thu gom, xử lí riêng."],
      ["Tiết kiệm nước ở nhà, việc nào là đúng?", "Khoá vòi khi đánh răng, sửa vòi rò rỉ", "Để vòi chảy suốt khi rửa tay", "Rửa xe bằng vòi xịt thật lâu", "Nước vo gạo có thể dùng tưới cây — vừa tiết kiệm vừa có ích."],
      ["Sinh vật biển ăn phải túi ni-lông sẽ thế nào?", "Bị tắc đường ruột, có thể chết", "Không sao cả", "Lớn nhanh hơn", "Rùa biển thường nhầm túi ni-lông với sứa — thức ăn của chúng."],
      ["Săn bắt, buôn bán động vật hoang dã là hành vi thế nào?", "Vi phạm pháp luật, bị xử phạt", "Được khuyến khích", "Hoàn toàn tự do", "Nhiều loài quý hiếm được pháp luật bảo vệ nghiêm ngặt."],
      ["Đốt rơm rạ sau mùa gặt gây tác hại gì?", "Khói bụi ô nhiễm không khí, hại hô hấp", "Làm không khí trong lành", "Không có tác hại", "Rơm rạ nên ủ làm phân hoặc làm thức ăn gia súc thay vì đốt."],
      ["Rừng đầu nguồn bị phá gây hậu quả gì?", "Lũ quét, sạt lở đất khi mưa lớn", "Nước sông trong hơn", "Không có hậu quả", "Rừng giữ nước mưa rồi nhả dần ra — phá rừng là mất “bể chứa” tự nhiên."],
      ["Đi bộ, đạp xe quãng đường ngắn giúp ích gì cho môi trường?", "Giảm khói xe, không khí trong lành hơn", "Tốn nhiều xăng hơn", "Không giúp ích gì", "Vừa rèn sức khoẻ vừa giảm khí thải ra môi trường."],
      ["Ao hồ, đầm lầy là môi trường sống của những sinh vật nào?", "Cá, ếch nhái, chim nước và nhiều côn trùng", "Chỉ có cá cảnh", "Không sinh vật nào sống được", "Đất ngập nước còn giúp lọc nước và chống lũ."],
      ["Tái sử dụng chai lọ cũ ở nhà có lợi ích gì?", "Giảm rác thải, tiết kiệm tiền mua mới", "Làm nhà bừa bộn thêm", "Không có lợi ích", "Chai thuỷ tinh rửa sạch có thể đựng đồ khô dùng nhiều lần."],
      ["Khi tham quan vườn quốc gia, em cần tuân thủ điều gì?", "Đi theo lối mòn, không hái cây, không cho thú ăn", "Hái hoa làm kỉ niệm", "Chọc ghẹo động vật", "Tôn trọng quy định giúp bảo vệ thiên nhiên hoang dã."],
      ["Khí thải từ xe máy, ô tô gây ra điều gì?", "Ô nhiễm không khí, ảnh hưởng sức khoẻ", "Làm trời mát hơn", "Giúp cây quang hợp nhanh", "Đi phương tiện công cộng giúp giảm số xe và khí thải."],
      ["Nước thải từ nhà máy chưa xử lí chảy ra sông gây hậu quả gì?", "Cá chết hàng loạt, người dùng nước bị bệnh", "Sông sạch thêm", "Cá lớn nhanh hơn", "Nhà máy bắt buộc phải xử lí nước thải trước khi xả ra môi trường."],
      ["Em nhặt được vỏ chai nhựa trên bãi biển, em nên làm gì?", "Bỏ vào thùng rác hoặc mang về tái chế", "Vứt lại xuống biển", "Chôn xuống cát", "Rác trên bãi biển theo sóng trôi ra đại dương, hại sinh vật biển."],
      ["Trồng cây xanh quanh nhà mang lại những lợi ích gì?", "Bóng mát, lọc bụi, không khí trong lành", "Chỉ làm nhà tối hơn", "Không có lợi ích gì", "Cây xanh còn là nhà của chim chóc và côn trùng có ích."],
      ["Để lớp học xanh – sạch – đẹp, học sinh cần làm gì?", "Trực nhật đều, trồng cây, không xả rác bừa bãi", "Chỉ cần treo tranh đẹp", "Chờ cô lao công làm hết", "Môi trường lớp học sạch đẹp giúp em học tập vui vẻ, khoẻ mạnh."],
    ], [["Rừng", "“Lá phổi xanh” của Trái Đất"], ["Phân loại rác", "Giúp tái chế rác thải"], ["Năng lượng mặt trời", "Năng lượng sạch, tái tạo"], ["Khu bảo tồn", "Bảo vệ sinh vật hoang dã"], ["Giờ Trái Đất", "Tắt đèn 1 giờ, tiết kiệm điện"], ["Túi vải", "Thay túi ni-lông, dùng nhiều lần"], ["Rừng ngập mặn", "Chắn sóng, nơi sống của tôm cá"], ["Tiết kiệm giấy", "Giữ rừng xanh"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước LÀM PHÂN HỮU CƠ từ rác nhà bếp theo đúng thứ tự!", ["Thu gom vỏ rau củ và lá cây khô", "Cho vào thùng ủ cùng đất và lá khô", "Đảo trộn, giữ ẩm đều đặn", "Phân hoai mục dùng bón cho cây"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các bước tham gia DỌN VỆ SINH khu phố theo đúng thứ tự!", ["Chuẩn bị găng tay, bao rác, chổi", "Nhặt rác và phân loại rác tái chế", "Tập kết rác đúng nơi quy định", "Rửa tay sạch bằng xà phòng"]); });
    return { id: "kh5-moi", emoji: "🌏", name: "Sinh vật và môi trường", sub: "Chức năng của môi trường • Tác động của con người • Bảo vệ môi trường", pools: kp }; })()
];
/* ================= LỊCH SỬ & ĐỊA LÍ 5 ================= */
var LSD5_TOPICS = [
  topic("ls5-vietnam", "🇻🇳", "Đất nước và con người Việt Nam", "Vị trí địa lí, lãnh thổ • Đơn vị hành chính • Quốc kì, Quốc huy, Quốc ca • Thiên nhiên, biển đảo • 54 dân tộc", [
    ["Việt Nam nằm ở khu vực nào của châu Á?", "Đông Nam Á, ven biển Đông", "Bắc Á", "Tây Âu", "Lãnh thổ Việt Nam gồm phần đất liền hình chữ S và vùng biển, đảo rộng lớn."],
    ["Quốc kì nước Cộng hoà xã hội chủ nghĩa Việt Nam có đặc điểm gì?", "Nền đỏ, ở giữa có ngôi sao vàng năm cánh", "Nền xanh, có mặt trăng vàng", "Nền trắng, có ngôi sao đỏ", "Lá cờ đỏ sao vàng là biểu tượng thiêng liêng của Tổ quốc."],
    ["Bài Quốc ca của Việt Nam là bài hát nào?", "“Tiến quân ca” của nhạc sĩ Văn Cao", "“Đoàn quân Việt Nam đi” là câu đầu của bài khác", "“Việt Nam ơi”", "Quốc ca được hát trang nghiêm trong các lễ chào cờ."],
    ["Quốc huy Việt Nam có hình ảnh nào nổi bật?", "Bông lúa vàng bao quanh, ngôi sao vàng trên nền đỏ, bánh xe răng phía dưới", "Một con rồng vàng", "Một bông sen hồng", "Quốc huy thể hiện nền nông nghiệp và công nghiệp của đất nước."],
    ["Tính đến nay, nước ta có bao nhiêu tỉnh và thành phố trực thuộc trung ương (theo SGK phổ thông)?", "63 tỉnh, thành phố", "54 tỉnh, thành phố", "100 tỉnh, thành phố", "Đất nước được chia thành 63 tỉnh, thành phố (sách giáo khoa phổ thông)."],
    ["Dân tộc nào có số dân đông nhất nước ta?", "Dân tộc Kinh", "Dân tộc Tày", "Dân tộc Mường", "54 dân tộc anh em cùng sinh sống trên đất nước Việt Nam, dân tộc Kinh đông nhất."],
    ["Việt Nam có bao nhiêu dân tộc anh em?", "54 dân tộc", "45 dân tộc", "63 dân tộc", "Mỗi dân tộc có tiếng nói, trang phục, phong tục riêng, tạo nên bản sắc văn hoá phong phú."],
    ["Biển, đảo của Việt Nam có vai trò gì?", "Cung cấp hải sản, dầu khí, đường giao thông biển và bảo vệ chủ quyền đất nước", "Không có vai trò kinh tế", "Chỉ để tắm biển", "Hai quần đảo Hoàng Sa và Trường Sa là của Việt Nam."],
    ["Hai quần đảo lớn thuộc chủ quyền của Việt Nam là?", "Hoàng Sa và Trường Sa", "Côn Đảo và Phú Quốc", "Cát Bà và Lý Sơn", "Cần khẳng định chủ quyền biển đảo của Tổ quốc."],
    ["Địa hình nước ta chủ yếu là gì?", "Đồi núi ở phía tây, đồng bằng ven biển ở phía đông (3/4 diện tích là đồi núi)", "Toàn là đồng bằng", "Toàn là núi cao", "Sông ngòi dày đặc bồi đắp nên các đồng bằng màu mỡ."],
    ["Khí hậu Việt Nam thuộc kiểu khí hậu nào?", "Nhiệt đới gió mùa, nóng ẩm, mưa nhiều", "Ôn đới lạnh", "Khí hậu sa mạc khô", "Khí hậu có hai mùa gió mùa rõ rệt: gió mùa đông bắc và gió mùa tây nam."],
    ["Dòng sông nào dài nhất, bồi đắp đồng bằng châu thổ lớn ở miền Nam?", "Sông Mê Công (Cửu Long)", "Sông Hồng", "Sông Đà", "Đồng bằng sông Cửu Long là vựa lúa lớn nhất nước ta."],
    ["Thủ đô của nước Việt Nam là thành phố nào?", "Hà Nội", "Thành phố Hồ Chí Minh", "Huế", "Hà Nội là thủ đô, trung tâm chính trị – văn hoá của cả nước."],
    ["Lãnh thổ đất liền nước ta có hình dạng giống chữ gì?", "Chữ S, hẹp ngang và kéo dài theo bờ biển", "Chữ O tròn khép kín", "Chữ V rất ngắn", "Chiều dài đất nước hơn 1 600 km từ Bắc vào Nam."],
    ["Cột cờ Lũng Cú, điểm cực Bắc của nước ta, thuộc tỉnh nào?", "Hà Giang", "Cà Mau", "Điện Biên", "Cột cờ Lũng Cú là biểu tượng chủ quyền thiêng liêng ở cực Bắc."],
    ["Mũi Cà Mau, điểm cực Nam của đất liền nước ta, thuộc tỉnh nào?", "Tỉnh Cà Mau", "Tỉnh Kiên Giang", "Tỉnh Bạc Liêu", "Đất mũi Cà Mau mỗi năm còn lấn ra biển nhờ phù sa bồi đắp."],
    ["Đồng bằng lớn nhất nước ta là đồng bằng nào?", "Đồng bằng sông Cửu Long ở Nam Bộ", "Đồng bằng sông Hồng", "Đồng bằng duyên hải miền Trung", "Đồng bằng sông Cửu Long là vựa lúa lớn nhất cả nước."],
    ["Phù sa sông Hồng bồi đắp nên đồng bằng nào?", "Đồng bằng sông Hồng ở Bắc Bộ", "Đồng bằng sông Cửu Long", "Đồng bằng Thanh – Nghệ", "Phù sa màu đỏ nên con sông mang tên sông Hồng."],
    ["Đỉnh Phan Xi Păng thuộc dãy núi nào?", "Dãy Hoàng Liên Sơn", "Dãy Trường Sơn", "Dãy Bạch Mã", "Phan Xi Păng cao 3 143 m, được gọi là nóc nhà Đông Dương."],
    ["Đảo lớn nhất của Việt Nam là đảo nào?", "Đảo Phú Quốc (tỉnh Kiên Giang)", "Đảo Cát Bà", "Đảo Lý Sơn", "Phú Quốc nổi tiếng với nước mắm và những bãi biển đẹp."],
    ["Vịnh nào của nước ta là Di sản thiên nhiên thế giới?", "Vịnh Hạ Long (tỉnh Quảng Ninh)", "Vịnh Cam Ranh", "Vịnh Vân Phong", "Hạ Long có nghĩa là “rồng xuống”, với hàng nghìn đảo đá vôi."],
    ["Khí hậu miền Trung nước ta có đặc điểm nổi bật nào?", "Hay có bão, lũ vào mùa mưa và nắng nóng, gió Lào vào mùa hè", "Lạnh quanh năm như vùng ôn đới", "Không bao giờ có bão", "Người dân miền Trung rất kiên cường trước thiên tai."],
    ["54 dân tộc anh em của nước ta phân bố như thế nào?", "Khắp cả nước, mỗi vùng có các dân tộc sinh sống đặc trưng", "Chỉ sinh sống ở miền núi", "Chỉ sinh sống ở đồng bằng", "Văn hoá phong phú của các dân tộc tạo nên bản sắc Việt Nam."],
  ], [["Cờ đỏ sao vàng", "Quốc kì Việt Nam"], ["Tiến quân ca", "Quốc ca (Văn Cao)"], ["54 dân tộc", "Dân tộc Kinh đông nhất"], ["Hoàng Sa, Trường Sa", "Quần đảo của Việt Nam"]], "Nối cho đúng nhé!"),
  topic("ls5-dautieng", "🏯", "Những quốc gia đầu tiên trên đất nước ta", "Văn Lang – Hùng Vương • Âu Lạc – An Dương Vương, thành Cổ Loa • Phù Nam • Chăm-pa", [
    ["Nhà nước đầu tiên trên đất nước ta có tên là gì?", "Văn Lang", "Âu Lạc", "Đại Việt", "Nước Văn Lang do các vua Hùng dựng nên, kinh đô ở vùng Phong Châu (Phú Thọ ngày nay)."],
    ["Ai là người lập nên nước Văn Lang?", "Các vua Hùng (Hùng Vương)", "An Dương Vương", "Lý Thái Tổ", "Lễ giỗ Tổ Hùng Vương (10/3 âm lịch) tưởng nhớ công ơn dựng nước."],
    ["Người dân nước Văn Lang được gọi là gì?", "Người Lạc Việt", "Người Chăm", "Người Phù Nam", "Truyền thuyết “Con Rồng cháu Tiên” gắn với thời Hùng Vương."],
    ["An Dương Vương lập nên nước nào sau Văn Lang?", "Âu Lạc", "Chăm-pa", "Nam Việt", "An Dương Vương xây thành Cổ Loa và có nỏ thần nổi tiếng."],
    ["Thành Cổ Loa (Đông Anh, Hà Nội) có hình dáng đặc biệt nào?", "Hình xoáy ốc, nhiều vòng thành đất", "Hình vuông hoàn hảo bằng đá", "Hình tròn một vòng duy nhất", "Cổ Loa là kinh đô của nước Âu Lạc."],
    ["Truyện “Nỏ thần” gắn với nhân vật và sự kiện nào?", "An Dương Vương, Mị Châu – Trọng Thuỷ; bài học về cảnh giác giữ nước", "Hùng Vương chọn đất đóng đô", "Thánh Gióng đánh giặc Ân", "Câu chuyện nhắc bài học: mất cảnh giác sẽ mất nước."],
    ["Vương quốc Phù Nam xưa nằm ở khu vực nào ngày nay?", "Đồng bằng sông Cửu Long (Nam Bộ)", "Đồng bằng sông Hồng", "Miền Trung", "Phù Nam là vương quốc cổ thịnh vượng ở phương Nam, có cảng thị Óc Eo."],
    ["Vương quốc Chăm-pa xưa nằm ở khu vực nào ngày nay?", "Duyên hải miền Trung nước ta", "Tây Nguyên cao nguyên", "Đồng bằng Bắc Bộ", "Chăm-pa để lại nhiều tháp Chăm nổi tiếng như tháp Mỹ Sơn, tháp Pô Nôgar."],
    ["Di sản nào là của người Chăm nổi tiếng thế giới?", "Thánh địa Mỹ Sơn (Quảng Nam) – được UNESCO công nhận", "Thành Cổ Loa", "Đền Hùng", "Tháp Chăm thể hiện nghệ thuật kiến trúc, tôn giáo độc đáo."],
    ["Cư dân Văn Lang – Âu Lạc làm nghề gì là chính?", "Trồng lúa nước, chăn nuôi, đánh cá, làm đồ đồng", "Buôn bán đường biển là chính", "Khai thác mỏ hiện đại", "Trống đồng Đông Sơn là sản phẩm nổi tiếng của nghệ thuật đúc đồng thời đó."],
    ["Trống đồng Đông Sơn gắn với thời kì nào?", "Thời Hùng Vương – An Dương Vương (văn hoá Đông Sơn)", "Thời nhà Nguyễn", "Thời Pháp thuộc", "Trên mặt trống đồng có hình ngôi sao, chim Lạc, người... phản ánh đời sống cư dân xưa."],
    ["Câu nói “Các Vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước” là của ai?", "Bác Hồ (nói với bộ đội tại Đền Hùng, 1954)", "Vua Hùng Vương", "An Dương Vương", "Câu nói khẳng định trách nhiệm giữ nước của các thế hệ sau."],
    ["Kinh đô của nước Văn Lang đặt ở đâu?", "Phong Châu (vùng Phú Thọ ngày nay)", "Thăng Long (Hà Nội)", "Hoa Lư (Ninh Bình)", "Đền Hùng ở Phú Thọ là nơi thờ cúng các Vua Hùng."],
    ["Đứng đầu nhà nước Văn Lang là ai?", "Vua Hùng, dưới vua có lạc hầu, lạc tướng giúp việc", "Một vị tổng thống", "Vua của nước ngoài sang cai trị", "Con trai của vua Hùng được gọi là quan lang."],
    ["Bánh chưng, bánh giầy trong truyện Lang Liêu tượng trưng cho điều gì?", "Trời tròn, đất vuông và lòng hiếu thảo với cha", "Sự giàu sang xa hoa của vua chúa", "Món ăn du nhập từ nước ngoài", "Bánh chưng, bánh giầy là món ăn truyền thống ngày Tết của dân tộc."],
    ["Lạc hầu, lạc tướng là những chức quan ở thời kì nào?", "Thời Hùng Vương (nước Văn Lang)", "Thời nhà Nguyễn", "Thời Pháp thuộc", "Đất nước thời Hùng Vương được chia thành 15 bộ."],
    ["Thành Cổ Loa có bao nhiêu vòng thành chính?", "Ba vòng: thành nội, thành trung, thành ngoại", "Chỉ một vòng duy nhất", "Mười vòng thành", "Thành hình xoáy ốc giúp kinh đô Âu Lạc phòng thủ vững chắc."],
    ["Cảng thị Óc Eo xưa thuộc vương quốc cổ nào?", "Phù Nam", "Chăm-pa", "Văn Lang", "Óc Eo ở An Giang ngày nay từng là cảng buôn bán sầm uất."],
    ["Người Chăm-pa xưa nổi tiếng với nghề truyền thống nào?", "Đi biển, đóng thuyền và làm gốm, dệt vải", "Khai thác dầu mỏ", "Làm đường sắt", "Tháp Chăm và nghề đi biển là dấu ấn văn hoá Chăm-pa."],
    ["Thánh địa Mỹ Sơn thuộc nền văn hoá cổ nào?", "Văn hoá Chăm-pa", "Văn hoá Óc Eo", "Văn hoá Đông Sơn", "Mỹ Sơn từng là trung tâm tôn giáo của vương quốc Chăm-pa."],
    ["Theo truyền thuyết, các Vua Hùng đã dạy dân làm nghề gì?", "Trồng lúa nước và cày cấy", "Đúc súng thần công", "In sách chữ quốc ngữ", "Nghề trồng lúa nước là nền tảng đời sống của cư dân Văn Lang."],
    ["Truyện Sơn Tinh – Thuỷ Tinh phản ánh ước mơ gì của người xưa?", "Chế ngự lũ lụt, trị thuỷ để bảo vệ mùa màng", "Bay lên mặt trăng", "Khai phá đại dương", "Câu chuyện giải thích hiện tượng lũ lụt hằng năm ở đồng bằng sông Hồng."],
    ["An Dương Vương mất nước Âu Lạc chủ yếu vì lí do gì?", "Mất cảnh giác, để lộ bí mật nỏ thần cho kẻ địch", "Vì quân lính của nước ta quá ít", "Vì thành Cổ Loa xây chưa xong", "Câu chuyện Mị Châu – Trọng Thuỷ nhắc bài học cảnh giác giữ nước."],
  ], [["Văn Lang", "Hùng Vương dựng nước"], ["Âu Lạc", "An Dương Vương, Cổ Loa"], ["Phù Nam", "Nam Bộ, cảng Óc Eo"], ["Chăm-pa", "Miền Trung, tháp Chăm"]], "Nối quốc gia cổ với ý đúng nhé!"),
  (function () { var kp = knowledgePools([
      ["Thời Bắc thuộc, nhân dân ta liên tục đấu tranh giành độc lập. Cuộc khởi nghĩa nào mở đầu truyền thống đó?", "Khởi nghĩa Hai Bà Trưng (năm 40)", "Khởi nghĩa Lam Sơn", "Chiến thắng Điện Biên Phủ", "Hai Bà Trưng phất cờ khởi nghĩa ở Mê Linh, giành lại độc lập sau hơn 200 năm Bắc thuộc."],
      ["Vua Lý Thái Tổ dời đô từ Hoa Lư ra Thăng Long vào năm nào?", "Năm 1010", "Năm 938", "Năm 1945", "Chiếu dời đô của Lý Công Uẩn – Thăng Long (Hà Nội ngày nay) là kinh đô lâu dài của nước ta."],
      ["Triều Trần nổi tiếng với chiến công nào?", "Ba lần đánh thắng quân Mông – Nguyên xâm lược", "Đánh thắng quân Thanh", "Đánh thắng quân Nam Hán", "Trần Hưng Đạo là vị tướng tài ba chỉ huy kháng chiến chống Mông – Nguyên."],
      ["Hội nghị Diên Hồng và câu nói quyết tâm “Đánh!” gắn với triều đại nào?", "Triều Trần (chống Mông – Nguyên)", "Triều Lý", "Triều Nguyễn", "Các bô lão hô vang “Đánh!” thể hiện ý chí quyết chiến của toàn dân tộc."],
      ["Khởi nghĩa Lam Sơn do ai lãnh đạo, đánh thắng quân Minh xâm lược?", "Lê Lợi", "Nguyễn Huệ", "Trần Hưng Đạo", "Sau thắng lợi, Lê Lợi lập ra triều Lê (Lê Thái Tổ)."],
      ["Vị vua nào gắn với chiến thắng Ngọc Hồi – Đống Đa, đại phá quân Thanh năm 1789?", "Nguyễn Huệ (Quang Trung)", "Lê Lợi", "Gia Long", "Quang Trung tiến quân thần tốc ra Bắc, đánh tan quân Thanh vào dịp Tết Kỷ Dậu 1789."],
      ["Triều Nguyễn là triều đại phong kiến nào của Việt Nam?", "Triều đại phong kiến cuối cùng (1802–1945)", "Triều đại đầu tiên", "Triều đại ngắn nhất", "Kinh đô triều Nguyễn đặt ở Phú Xuân (Huế)."],
      ["Cách mạng tháng Tám năm 1945 thành công đã khai sinh ra nước nào?", "Nước Việt Nam Dân chủ Cộng hoà", "Nước Cộng hoà xã hội chủ nghĩa Việt Nam", "Nước Đại Nam", "Ngày 2/9/1945, Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình."],
      ["Chiến thắng Điện Biên Phủ diễn ra vào năm nào?", "Năm 1954", "Năm 1945", "Năm 1975", "Chiến thắng “lừng lẫy năm châu, chấn động địa cầu” kết thúc kháng chiến chống Pháp."],
      ["Chiến dịch Hồ Chí Minh lịch sử kết thúc thắng lợi vào ngày tháng nào?", "Ngày 30/4/1975", "Ngày 2/9/1975", "Ngày 7/5/1975", "Xe tăng tiến vào Dinh Độc Lập trưa 30/4/1975, miền Nam hoàn toàn giải phóng, đất nước thống nhất."],
      ["Sự kiện năm 1976 có ý nghĩa gì với đất nước ta?", "Nước Việt Nam thống nhất, đổi tên là Cộng hoà xã hội chủ nghĩa Việt Nam", "Kí hoà ước với Pháp", "Dời đô về Huế", "Từ năm 1976, đất nước thống nhất về mặt nhà nước."],
      ["Công cuộc Đổi mới của nước ta được khởi xướng từ năm nào?", "Năm 1986", "Năm 1975", "Năm 2000", "Đổi mới giúp kinh tế đất nước phát triển, đời sống nhân dân ngày càng nâng cao."],
      ["Ngô Quyền đánh thắng quân Nam Hán trên sông Bạch Đằng vào năm nào, mở ra thời kì độc lập lâu dài?", "Năm 938", "Năm 1010", "Năm 40", "Trận Bạch Đằng với cọc gỗ bịt sắt nhọn là chiến công lừng danh của Ngô Quyền."],
      ["Khởi nghĩa Bà Triệu (năm 248) chống lại quân xâm lược nào?", "Quân Ngô", "Quân Minh", "Quân Pháp", "Bà Triệu là nữ anh hùng nổi tiếng thời Bắc thuộc, quyết tâm đánh giặc cứu nước."],
      ["Lí Bí khởi nghĩa thắng lợi năm 544, lập nên nước nào?", "Nước Vạn Xuân", "Nước Đại Việt", "Nước Âu Lạc", "Lí Bí xưng là Lý Nam Đế, vị hoàng đế đầu tiên của nước ta."],
      ["Trận Bạch Đằng năm 1288 của Trần Hưng Đạo đánh thắng quân nào?", "Quân Mông – Nguyên xâm lược", "Quân Nam Hán", "Quân Thanh", "Chiến thuật cắm cọc ngầm trên sông Bạch Đằng lại lập công lớn."],
      ["Chiến thắng Chi Lăng – Xương Giang (1427) thuộc cuộc kháng chiến nào?", "Khởi nghĩa Lam Sơn chống quân Minh", "Kháng chiến chống quân Tống", "Kháng chiến chống quân Nguyên", "Sau chiến thắng này, quân Minh phải chấp nhận rút về nước."],
      ["Phong trào Tây Sơn bùng nổ đầu tiên ở vùng đất nào ngày nay?", "Bình Định ở miền Trung", "Đồng bằng sông Cửu Long", "Cao Bằng ở miền Bắc", "Ba anh em họ Nguyễn dựng cờ khởi nghĩa ở đất Tây Sơn."],
      ["Năm 1911, Bác Hồ ra đi tìm đường cứu nước từ nơi nào?", "Bến cảng Nhà Rồng (Sài Gòn)", "Cảng Hải Phòng", "Bến đò ở quê nhà Nghệ An", "Người ra đi với khát vọng tìm con đường giải phóng cho dân tộc."],
      ["Đảng Cộng sản Việt Nam được thành lập vào ngày tháng nào?", "Ngày 3/2/1930", "Ngày 2/9/1945", "Ngày 19/8/1945", "Nguyễn Ái Quốc chủ trì hội nghị hợp nhất các tổ chức cộng sản ở Hồng Kông."],
      ["Phong trào Xô viết Nghệ – Tĩnh diễn ra trong những năm nào?", "Những năm 1930 – 1931", "Những năm 1945 – 1946", "Những năm 1954 – 1955", "Đây là phong trào cách mạng lớn của công nhân và nông dân trước năm 1945."],
      ["Hiệp định Giơ-ne-vơ năm 1954 đã quyết định điều gì?", "Chấm dứt chiến tranh ở Đông Dương, tạm thời chia nước ta thành hai miền", "Thống nhất đất nước ngay trong năm 1954", "Pháp được ở lại miền Bắc lâu dài", "Sau hiệp định, miền Bắc nước ta hoàn toàn được giải phóng."],
      ["Nhà Hồ là triều đại do ai lập nên vào năm 1400?", "Hồ Quý Ly", "Lê Lợi", "Nguyễn Ánh", "Nhà Hồ tồn tại ngắn ngủi nhưng có nhiều cải cách về tiền giấy và thi cử."],
    ], [["1010", "Lý Thái Tổ dời đô ra Thăng Long"], ["1945", "Cách mạng tháng Tám, Quốc khánh 2/9"], ["1954", "Chiến thắng Điện Biên Phủ"], ["1975", "Giải phóng miền Nam, thống nhất đất nước"]], "Nối năm với sự kiện nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các sự kiện theo thứ tự thời gian!", ["1010 – Lý Thái Tổ dời đô ra Thăng Long", "1945 – Cách mạng tháng Tám thành công", "1954 – Chiến thắng Điện Biên Phủ", "1975 – Thống nhất đất nước", "1986 – Bắt đầu công cuộc Đổi mới"]); });
    return { id: "ls5-lichsu", emoji: "⏳", name: "Xây dựng và bảo vệ đất nước", sub: "Bắc thuộc • Triều Lý, Trần, Lê • Cách mạng tháng Tám • Điện Biên Phủ • 1975 • Đổi mới 1986", pools: kp }; })(),
  topic("ls5-langgieng", "🤝", "Các nước láng giềng của Việt Nam", "Trung Quốc • Lào • Cam-pu-chia • ASEAN (thành lập 1967)", [
    ["Nước láng giềng nào nằm ở phía bắc nước ta, có thủ đô là Bắc Kinh?", "Trung Quốc", "Lào", "Cam-pu-chia", "Trung Quốc là nước láng giềng lớn ở phía bắc, có nền văn minh lâu đời (Vạn Lý Trường Thành, sông Hoàng Hà...)."],
    ["Nước láng giềng ở phía tây, có thủ đô Viêng Chăn, được gọi là “đất nước Triệu Voi” là nước nào?", "Lào", "Trung Quốc", "Thái Lan", "Lào có tình hữu nghị đặc biệt, gắn bó với Việt Nam."],
    ["Nước láng giềng có thủ đô Phnôm Pênh và di sản nổi tiếng Ăng-co Vát là nước nào?", "Cam-pu-chia", "Lào", "Mi-an-ma", "Ăng-co Vát là quần thể đền đài đá nổi tiếng thế giới của người Khơ-me."],
    ["Hiệp hội các quốc gia Đông Nam Á có tên viết tắt là gì?", "ASEAN", "UNESCO", "APEC", "ASEAN thành lập năm 1967, Việt Nam gia nhập năm 1995."],
    ["ASEAN được thành lập vào năm nào?", "Năm 1967", "Năm 1945", "Năm 1995", "Việt Nam là thành viên tích cực của ASEAN từ năm 1995."],
    ["Con sông nào chảy qua cả Trung Quốc, Lào, Cam-pu-chia và Việt Nam?", "Sông Mê Công", "Sông Hồng", "Sông Đà", "Sông Mê Công khi vào Việt Nam chia thành sông Tiền, sông Hậu (cửu Long = 9 cửa)."],
    ["Học sinh các nước láng giềng cần ứng xử thế nào với nhau?", "Đoàn kết, hữu nghị, tôn trọng và giúp đỡ lẫn nhau", "Xa lánh, không giao tiếp", "Tranh giành lẫn nhau", "Việt Nam luôn coi trọng tình hữu nghị với các nước láng giềng."],
    ["Công trình nào của Trung Quốc được coi là kì quan nổi tiếng thế giới?", "Vạn Lý Trường Thành", "Ăng-co Vát", "Tháp Eiffel", "Vạn Lý Trường Thành dài hàng nghìn ki-lô-mét, xây qua nhiều triều đại."],
    ["Biểu tượng hoa sen và điệu múa Apsara gắn với văn hoá nước nào?", "Cam-pu-chia", "Trung Quốc", "Hàn Quốc", "Điệu múa Apsara mềm mại là di sản văn hoá nổi tiếng của Cam-pu-chia."],
    ["Lào còn được biết đến với lễ hội té nước vào dịp Tết cổ truyền tên là gì?", "Bun Pi May", "Tết Nguyên đán", "Lễ hội Ok Om Bok", "Bun Pi May là Tết cổ truyền của người Lào (tháng 4 hằng năm)."],
    ["Việt Nam có đường biên giới chung trên đất liền với những nước nào?", "Trung Quốc, Lào và Cam-pu-chia", "Chỉ với Trung Quốc", "Với Thái Lan và Mi-an-ma", "Nước ta giáp ba nước láng giềng trên đất liền."],
    ["Đỉnh núi nào cao nhất Đông Dương, nằm ở Lào Cai (Việt Nam), là điểm đến nổi tiếng?", "Phan Xi Păng (3 143 m)", "Phu Khao", "Doi Inthanon", "Phan Xi Păng được gọi là “nóc nhà Đông Dương”."],
    ["Ý nghĩa của việc giữ gìn quan hệ hữu nghị với các nước láng giềng là gì?", "Giúp các nước cùng hoà bình, ổn định và phát triển", "Không có ý nghĩa gì", "Chỉ tốt cho một phía", "“Láng giềng gần còn hơn bà con xa” — hoà bình, hợp tác là quý nhất."],
    ["Việt Nam gia nhập ASEAN vào năm nào?", "Năm 1995", "Năm 1967", "Năm 1977", "Việt Nam là thành viên thứ 7 của ASEAN và tham gia rất tích cực."],
    ["ASEAN hiện nay gồm bao nhiêu nước thành viên?", "10 nước ở Đông Nam Á", "5 nước sáng lập", "20 nước khắp châu Á", "Các nước ASEAN hợp tác về kinh tế, văn hoá, giáo dục và hoà bình."],
    ["Sông Mê Công bắt nguồn từ đâu?", "Từ cao nguyên Tây Tạng (Trung Quốc)", "Từ dãy Trường Sơn", "Từ hồ Tonlé Sap", "Sông chảy qua 6 nước rồi đổ ra Biển Đông qua cửa sông ở nước ta."],
    ["Hồ Tonlé Sap (Biển Hồ) của Cam-pu-chia có đặc điểm gì đặc biệt?", "Mùa lũ, nước sông Mê Công chảy ngược vào hồ làm hồ mở rộng lớn", "Là hồ nước mặn ven biển", "Là hồ nhân tạo rất nhỏ", "Biển Hồ là vựa cá nước ngọt quan trọng của Cam-pu-chia."],
    ["Mối quan hệ Việt Nam – Lào được gọi là gì?", "Quan hệ hữu nghị đặc biệt, đoàn kết gắn bó", "Quan hệ buôn bán thông thường", "Quan hệ xa lạ, ít qua lại", "Hai nước kề vai sát cánh trong đấu tranh giành độc lập và xây dựng đất nước."],
    ["Lăm Vông là điệu múa truyền thống của nước nào?", "Lào", "Cam-pu-chia", "Thái Lan", "Khách đến Lào thường được mời cùng múa Lăm Vông trong các lễ hội."],
    ["Thủ đô của Thái Lan, một nước bạn trong ASEAN, là thành phố nào?", "Băng Cốc", "Viêng Chăn", "Phnôm Pênh", "Thái Lan là một trong năm nước sáng lập ASEAN năm 1967."],
    ["Việc học sinh ASEAN giao lưu với nhau mang lại lợi ích gì?", "Hiểu biết văn hoá lẫn nhau, thêm yêu hoà bình và tình hữu nghị", "Không có lợi ích gì thiết thực", "Chỉ để đi du lịch vui chơi", "Nhiều chương trình giao lưu học sinh ASEAN được tổ chức hằng năm."],
    ["Trung Quốc có di sản thế giới nổi tiếng nào sau đây?", "Cố Cung và lăng Tần Thuỷ Hoàng", "Ăng-co Vát", "Tháp đôi Petronas", "Trung Quốc là một trong những nền văn minh lâu đời nhất thế giới."],
    ["Các nước láng giềng hợp tác bảo vệ sông Mê Công vì lí do gì?", "Vì dòng sông chung mang nước, phù sa và nguồn cá cho nhiều nước", "Chỉ để làm du lịch", "Không cần hợp tác gì", "Sử dụng và bảo vệ nguồn nước chung là trách nhiệm của các nước ven sông."],
  ], [["Trung Quốc", "Thủ đô Bắc Kinh"], ["Lào", "Thủ đô Viêng Chăn"], ["Cam-pu-chia", "Thủ đô Phnôm Pênh"], ["ASEAN", "Thành lập năm 1967"]], "Nối nước với ý đúng nhé!"),
  topic("ls5-thegioi", "🌐", "Tìm hiểu thế giới", "Các châu lục và đại dương • Dân số và các chủng tộc • Văn minh Ai Cập, Hy Lạp cổ đại", [
    ["Trên Trái Đất có mấy châu lục được học ở tiểu học (theo SGK)?", "6 châu lục: Á, Âu, Phi, Mỹ, Đại Dương, Nam Cực", "4 châu lục", "10 châu lục", "Châu Á là châu lục lớn nhất, đông dân nhất."],
    ["Có mấy đại dương trên thế giới?", "4 đại dương: Thái Bình Dương, Đại Tây Dương, Ấn Độ Dương, Bắc Băng Dương", "3 đại dương", "6 đại dương", "Thái Bình Dương là đại dương lớn nhất."],
    ["Châu lục nào lớn nhất và đông dân nhất thế giới?", "Châu Á", "Châu Âu", "Châu Phi", "Việt Nam nằm ở châu Á."],
    ["Châu lục nào nóng nhất, có sa mạc Xa-ha-ra lớn nhất thế giới?", "Châu Phi", "Châu Âu", "Châu Nam Cực", "Châu Phi là quê hương của nhiều loài động vật hoang dã lớn."],
    ["Ba chủng tộc chính của loài người (theo màu da, được học trong sách) là?", "Chủng tộc da vàng, da trắng và da đen", "Chỉ có một chủng tộc", "Chủng tộc da đỏ, da tím, da xanh", "Mọi chủng tộc đều bình đẳng, cùng là con người."],
    ["Người Việt Nam thuộc chủng tộc nào?", "Chủng tộc da vàng (chủ yếu ở châu Á)", "Chủng tộc da trắng", "Chủng tộc da đen", "Người dân châu Âu chủ yếu thuộc chủng tộc da trắng; châu Phi thuộc chủng tộc da đen."],
    ["Nền văn minh Ai Cập cổ đại hình thành ven con sông nào?", "Sông Nin", "Sông Hằng", "Sông Hoàng Hà", "Kim tự tháp và tượng Nhân sư là di sản nổi tiếng của Ai Cập."],
    ["Kim tự tháp Ai Cập được xây dựng để làm gì?", "Làm lăng mộ cho các Pha-ra-ông (vua Ai Cập cổ đại)", "Làm kho chứa lương thực", "Làm trường học", "Kim tự tháp Kê-ốp là kì quan cổ đại duy nhất còn tồn tại đến nay."],
    ["Người Ai Cập cổ đại nổi tiếng với loại chữ viết nào?", "Chữ tượng hình", "Chữ La-tinh", "Chữ Hán", "Chữ tượng hình được khắc, vẽ trên đá và giấy pa-pi-rút."],
    ["Văn minh Hy Lạp cổ đại nổi tiếng với điều gì?", "Thần thoại Hy Lạp, Thế vận hội Ô-lim-píc, nhiều nhà khoa học, triết học lớn", "Kim tự tháp", "Vạn Lý Trường Thành", "Đại hội thể thao Ô-lim-píc bắt nguồn từ Hy Lạp cổ đại."],
    ["Thế vận hội Ô-lim-píc hiện đại được tổ chức mấy năm một lần?", "4 năm một lần", "2 năm một lần", "Mỗi năm một lần", "Ô-lim-píc là ngày hội thể thao lớn nhất hành tinh, biểu tượng của hoà bình."],
    ["Châu lục lạnh nhất, hầu như không có dân cư sinh sống lâu dài là?", "Châu Nam Cực", "Châu Âu", "Châu Đại Dương", "Nam Cực được bao phủ bởi băng tuyết quanh năm."],
    ["Quốc gia nào có dân số đông nhất thế giới (theo sách giáo khoa)?", "Trung Quốc và Ấn Độ là hai nước đông dân nhất", "Việt Nam", "Nhật Bản", "Dân số thế giới hiện nay hơn 8 tỉ người."],
    ["Châu lục có diện tích lớn thứ hai thế giới là châu nào?", "Châu Phi", "Châu Âu", "Châu Mỹ", "Châu Phi rộng lớn với sa mạc, thảo nguyên và rừng nhiệt đới."],
    ["Đại dương nằm giữa châu Mỹ và châu Âu – châu Phi là đại dương nào?", "Đại Tây Dương", "Thái Bình Dương", "Ấn Độ Dương", "Đại Tây Dương là đại dương lớn thứ hai trên thế giới."],
    ["Sa mạc lớn nhất thế giới nằm ở châu Phi tên là gì?", "Sa mạc Xa-ha-ra", "Sa mạc Gô-bi", "Sa mạc A-ta-ca-ma", "Xa-ha-ra nóng và khô, diện tích gần bằng cả nước Mỹ."],
    ["Sông nào thường được coi là sông dài nhất thế giới?", "Sông Nin ở châu Phi", "Sông A-ma-dôn", "Sông Mê Công", "Sông Nin chảy qua nhiều nước châu Phi rồi đổ ra Địa Trung Hải."],
    ["Người Ai Cập cổ đại viết chữ tượng hình trên chất liệu gì?", "Giấy pa-pi-rút làm từ cây cói", "Giấy dó của Việt Nam", "Vỏ cây tre", "Từ “paper” nghĩa là giấy trong tiếng Anh bắt nguồn từ pa-pi-rút."],
    ["Thế vận hội Ô-lim-píc thời cổ đại được tổ chức nhằm mục đích gì?", "Tôn vinh thần Dớt và tinh thần thể thao, hoà bình", "Thi đấu để tranh giành đất đai", "Buôn bán hàng hoá giữa các nước", "Trong thời gian diễn ra Ô-lim-píc, các cuộc chiến tranh tạm dừng."],
    ["Châu Đại Dương tiêu biểu gồm những phần nào?", "Nước Ô-xtrây-li-a và nhiều đảo ở Thái Bình Dương", "Chỉ có đảo Phú Quốc", "Các nước ở châu Âu", "Ô-xtrây-li-a là nước lớn nhất của châu Đại Dương."],
    ["Châu Mỹ được chia thành những phần nào?", "Bắc Mỹ, Trung Mỹ và Nam Mỹ", "Chỉ gồm Bắc Mỹ", "Đông Mỹ và Tây Mỹ", "Châu Mỹ nằm hoàn toàn ở phía tây bán cầu."],
    ["Dân số thế giới hiện nay khoảng bao nhiêu người?", "Hơn 8 tỉ người", "Khoảng 1 tỉ người", "Hơn 100 tỉ người", "Riêng châu Á đã chiếm hơn một nửa dân số toàn thế giới."],
    ["Châu Nam Cực dự trữ phần lớn lượng nước ngọt của Trái Đất ở dạng nào?", "Băng tuyết khổng lồ phủ khắp châu lục", "Hồ nước ngầm sâu", "Sông băng nhỏ trên núi", "Nếu băng Nam Cực tan hết, mực nước biển sẽ dâng rất cao."],
  ], [["Châu Á", "Lớn nhất, đông dân nhất"], ["Sông Nin", "Văn minh Ai Cập"], ["Kim tự tháp", "Lăng mộ Pha-ra-ông"], ["Hy Lạp cổ đại", "Quê hương Ô-lim-píc"]], "Nối cho đúng nhé!"),
  topic("ls5-chungtay", "🕊️", "Chung tay xây dựng thế giới", "Thế giới xanh – sạch – đẹp • Hoà bình cho mọi người", [
    ["Vì sao các nước trên thế giới cần chung tay bảo vệ môi trường?", "Vì môi trường Trái Đất là ngôi nhà chung; ô nhiễm, biến đổi khí hậu ảnh hưởng đến mọi quốc gia", "Chỉ một nước tự làm là đủ", "Môi trường không ảnh hưởng gì đến các nước khác", "Khí thải, rác thải... không dừng lại ở biên giới một nước."],
    ["“Hoà bình” có ý nghĩa như thế nào với trẻ em thế giới?", "Trẻ em được sống an toàn, đến trường, vui chơi và phát triển", "Không có ý nghĩa gì", "Chỉ người lớn mới cần hoà bình", "Nhiều tổ chức quốc tế ra đời để gìn giữ hoà bình (Liên hợp quốc)."],
    ["Tổ chức Liên hợp quốc (UN) được thành lập với mục đích chính là gì?", "Gìn giữ hoà bình, an ninh thế giới và hợp tác giữa các nước", "Buôn bán vũ khí", "Chỉ lo việc thể thao", "Việt Nam là thành viên của Liên hợp quốc từ năm 1977."],
    ["Tổ chức nào của Liên hợp quốc chuyên chăm lo cho trẻ em?", "UNICEF (Quỹ Nhi đồng Liên hợp quốc)", "UNESCO", "ASEAN", "UNICEF hỗ trợ trẻ em về sức khoẻ, giáo dục trên toàn thế giới, trong đó có Việt Nam."],
    ["Ngày Trái Đất (22/4) nhắc mọi người điều gì?", "Cùng hành động bảo vệ môi trường sống", "Mua sắm thật nhiều", "Dùng nhiều đồ nhựa hơn", "Các hoạt động như trồng cây, dọn rác được tổ chức khắp nơi vào ngày này."],
    ["Hành động nào của em góp phần xây dựng thế giới hoà bình?", "Yêu thương, đoàn kết với bạn bè, không phân biệt đối xử, giúp đỡ người khác", "Trêu chọc, bắt nạt bạn yếu hơn", "Chỉ chơi với người giống mình", "Hoà bình bắt đầu từ những việc nhỏ tốt đẹp quanh ta."],
    ["Vì sao cần tiết kiệm năng lượng và tài nguyên trên toàn thế giới?", "Tài nguyên có hạn; tiết kiệm giúp bảo vệ môi trường cho các thế hệ sau", "Tài nguyên là vô tận", "Tiết kiệm chỉ dành cho người nghèo", "Dùng năng lượng sạch là xu hướng của thế giới."],
    ["Trẻ em các nước gửi thông điệp hoà bình bằng hoạt động nào nổi tiếng?", "Gấp hạc giấy (theo câu chuyện của cô bé Nhật Bản Xa-đa-cô)", "Xé giấy vứt đi", "Không làm gì cả", "Ngàn con hạc giấy là biểu tượng ước mơ hoà bình, không có chiến tranh, bom nguyên tử."],
    ["Khi thấy bạn khác màu da, khác quốc tịch, em nên ứng xử thế nào?", "Thân thiện, tôn trọng, kết bạn và học hỏi điều hay từ bạn", "Xa lánh, trêu chọc bạn", "Không nói chuyện với bạn", "Mọi trẻ em trên thế giới đều bình đẳng và đáng được yêu thương."],
    ["Chiến tranh gây ra những hậu quả gì?", "Người dân mất nhà cửa, trẻ em không được đến trường, môi trường bị tàn phá", "Làm thế giới đẹp hơn", "Không ảnh hưởng đến trẻ em", "Vì vậy, nhân loại luôn đấu tranh cho hoà bình."],
    ["Việt Nam được bạn bè quốc tế biết đến là đất nước thế nào?", "Yêu chuộng hoà bình, thân thiện, giàu truyền thống nhân ái", "Khép kín, ít giao lưu", "Không có bạn bè quốc tế", "Việt Nam tích cực tham gia các hoạt động gìn giữ hoà bình của Liên hợp quốc."],
    ["“Thế giới xanh – sạch – đẹp” là mong ước hướng tới điều gì?", "Môi trường sống trong lành cho mọi người hôm nay và mai sau", "Chỉ riêng cho một khu phố", "Sơn mọi thứ thành màu xanh", "Trồng cây, giảm rác thải là việc làm vì một thế giới xanh."],
    ["Em có thể kể một việc làm nhỏ mỗi ngày vì một thế giới tốt đẹp hơn. Việc nào sau đây là đúng?", "Tắt điện khi không dùng, nhặt rác bỏ thùng, yêu thương bạn bè", "Vứt rác xuống sông cho trôi đi", "Đánh nhau để giải quyết mâu thuẫn", "Việc nhỏ của mỗi người cộng lại thành thay đổi lớn."],
    ["“Ngôi nhà chung” của toàn nhân loại được nhắc đến là gì?", "Trái Đất", "Mặt Trăng", "Một toà nhà rất lớn", "Tất cả mọi người cùng sống chung trên một hành tinh."],
    ["Việt Nam tham gia gìn giữ hoà bình của Liên hợp quốc bằng việc gì?", "Cử sĩ quan và bệnh viện dã chiến đến giúp người dân ở châu Phi", "Chỉ theo dõi tình hình từ xa", "Không tham gia hoạt động nào", "Hình ảnh bộ đội Việt Nam giúp dân châu Phi được bạn bè quốc tế yêu mến."],
    ["Ngày Quốc tế Thiếu nhi 1/6 nhắc nhở mọi người điều gì?", "Quan tâm, chăm sóc và bảo vệ trẻ em", "Chỉ là ngày để mua quà", "Là ngày nghỉ của riêng người lớn", "Trẻ em là tương lai của thế giới, cần được yêu thương."],
    ["Khi thiên tai xảy ra ở một nước bạn, các nước khác thường làm gì?", "Gửi hàng cứu trợ và quyên góp giúp đỡ người dân vùng thiên tai", "Mặc kệ vì không liên quan đến mình", "Chờ đợi mà không hành động gì", "Tinh thần tương thân tương ái vượt qua biên giới quốc gia."],
    ["“Phát triển bền vững” có nghĩa là gì?", "Phát triển hôm nay mà vẫn giữ tài nguyên, môi trường cho mai sau", "Phát triển càng nhanh càng tốt bằng mọi giá", "Chỉ phát triển cho riêng một nước", "Đây là mục tiêu chung của Liên hợp quốc và các quốc gia."],
    ["Chim bồ câu trắng ngậm cành ô-liu là biểu tượng của điều gì?", "Hoà bình", "Chiến tranh", "Thể thao", "Hình ảnh này xuất hiện trong rất nhiều hoạt động vì hoà bình."],
    ["Vì sao các nước phải hợp tác chống biến đổi khí hậu?", "Khí hậu là vấn đề chung toàn cầu, một nước không tự giải quyết được", "Chỉ các nước lớn mới cần lo lắng", "Biến đổi khí hậu không ảnh hưởng đến ai", "Việt Nam cũng chịu ảnh hưởng nặng nề của nước biển dâng."],
    ["UNICEF đã đồng hành cùng trẻ em Việt Nam trong những việc gì?", "Tiêm chủng, dinh dưỡng, nước sạch và giáo dục cho trẻ em khó khăn", "Chỉ giúp đỡ đúng một lần duy nhất", "Không hề hoạt động ở Việt Nam", "UNICEF có mặt ở Việt Nam từ rất lâu và luôn bên cạnh trẻ em."],
    ["Học sinh Việt Nam thể hiện tình hữu nghị quốc tế qua hoạt động nào?", "Viết thư, vẽ tranh giao lưu với học sinh các nước bạn", "Chỉ ngồi học trong lớp của mình", "Không cần giao lưu với ai", "Giao lưu giúp em hiểu biết thêm và yêu quý bạn bè khắp năm châu."],
    ["Em là “công dân toàn cầu có trách nhiệm” khi làm điều gì?", "Tiết kiệm tài nguyên, bảo vệ môi trường, tôn trọng văn hoá các nước", "Chỉ quan tâm đến việc của riêng mình", "Lãng phí điện và nước thoải mái", "Mỗi người đều là một phần của thế giới chung."],
  ], [["Liên hợp quốc", "Gìn giữ hoà bình thế giới"], ["UNICEF", "Chăm lo cho trẻ em"], ["Ngày Trái Đất 22/4", "Hành động vì môi trường"], ["Hạc giấy", "Biểu tượng ước mơ hoà bình"]], "Nối cho đúng nhé!")
];
/* ================= ĐẠO ĐỨC 5 ================= */
var DD5_TOPICS = [
  topic("dd5-bieton", "🙏", "Biết ơn người có công với quê hương, đất nước", "Biết ơn anh hùng, thương binh, liệt sĩ và những người có công", [
    ["Vì sao chúng ta phải biết ơn những người có công với quê hương, đất nước?", "Vì họ đã lao động, hi sinh để xây dựng và bảo vệ quê hương, cho ta cuộc sống hôm nay", "Vì đó là việc phải làm cho có lệ", "Vì họ giàu có, nổi tiếng", "Lòng biết ơn thể hiện ở việc học tập tốt, chăm sóc gia đình thương binh, tham gia đền ơn đáp nghĩa."],
    ["Việc làm nào thể hiện lòng biết ơn các anh hùng liệt sĩ?", "Thăm viếng, dọn dẹp nghĩa trang liệt sĩ; viết thư, tặng hoa tri ân", "Nói chuyện ồn ào trong lễ tưởng niệm", "Vẽ bậy lên bia tưởng niệm", "Ngày 27/7 là Ngày Thương binh – Liệt sĩ của nước ta."],
    ["Ngày Thương binh – Liệt sĩ của Việt Nam là ngày nào?", "Ngày 27 tháng 7", "Ngày 2 tháng 9", "Ngày 20 tháng 11", "Ngày này nhắc nhở mọi người “uống nước nhớ nguồn”."],
    ["Em gặp một bác thương binh đang cần sang đường. Em nên làm gì?", "Lại gần, lễ phép đề nghị giúp bác sang đường an toàn", "Đi thẳng, coi như không thấy", "Cười đùa với bạn về bác", "Giúp đỡ người có công là việc làm đẹp, thể hiện lòng biết ơn."],
    ["Câu tục ngữ nào dạy ta biết ơn người đã giúp đỡ, tạo dựng cho mình?", "“Uống nước nhớ nguồn.”", "“Ăn cây nào rào cây ấy.” (hiểu theo nghĩa ích kỉ là sai)", "“Há miệng chờ sung.”", "“Uống nước nhớ nguồn” — nhớ ơn người đã đào giếng cho ta uống nước."],
    ["Ở địa phương em có đài tưởng niệm liệt sĩ. Việc làm đúng khi đến đó là gì?", "Giữ trật tự, trang nghiêm, không leo trèo, xả rác", "Chạy nhảy vui đùa ầm ĩ", "Khắc tên mình lên đài", "Nơi tưởng niệm cần sự tôn nghiêm."],
    ["Người nông dân cày cấy làm ra hạt gạo cho mọi người ăn. Lòng biết ơn với họ thể hiện thế nào?", "Quý trọng hạt gạo, không lãng phí thức ăn, tôn trọng người lao động", "Để cơm thừa đổ đi thoải mái", "Chê bai nghề nông", "Mọi nghề lao động chân chính đều đáng trân trọng."],
    ["Khi nhà trường tổ chức thăm gia đình chính sách, em nên có thái độ nào?", "Nghiêm túc, lễ phép, lắng nghe và thể hiện sự quan tâm chân thành", "Đi cho vui, không cần chú ý", "Xin quà của gia đình bạn", "Thăm hỏi ân cần là cách đền ơn thiết thực."],
    ["“Anh hùng” trong thời bình có thể là những ai?", "Những người dũng cảm cứu người, cống hiến quên mình cho cộng đồng", "Chỉ người nổi tiếng trên ti-vi", "Chỉ các nhân vật trong truyện cổ tích", "Nhiều tấm gương anh hùng đời thường quanh ta rất đáng học tập."],
    ["Em có thể làm gì để thể hiện lòng biết ơn với thầy cô đã dạy em nên người?", "Chăm học, lễ phép, nhớ và làm theo những điều hay thầy cô dạy", "Chỉ tặng quà thật đắt tiền", "Học cho qua môn", "Món quà quý nhất với thầy cô là học trò chăm ngoan, tiến bộ."],
    ["Việc sưu tầm, kể lại câu chuyện về các anh hùng của quê hương có ý nghĩa gì?", "Giúp thế hệ trẻ hiểu, tự hào và tiếp nối truyền thống", "Không có ý nghĩa gì", "Chỉ để giải trí", "Truyền thống tốt đẹp cần được gìn giữ và lan toả."],
    ["Khi được hưởng thành quả của người đi trước (cầu đường, trường học), thái độ đúng là gì?", "Biết ơn, giữ gìn và tiếp tục xây dựng tốt hơn", "Coi là đương nhiên, phá hỏng cũng được", "Chỉ biết hưởng thụ", "Giữ gìn của chung cũng là đền đáp công ơn người xây dựng."],
    ["Trong ngày giỗ Tổ Hùng Vương, em được nhắc nhở về điều gì?", "Nhớ ơn tổ tiên đã có công dựng nước và đoàn kết dân tộc", "Chỉ là ngày nghỉ vui chơi", "Ngày bán hàng giảm giá", "“Dù ai đi ngược về xuôi / Nhớ ngày giỗ Tổ mồng mười tháng ba.”"],
    ["Câu ca dao “Công cha như núi Thái Sơn...” nhắc em nhớ ơn ai?", "Cha mẹ, người sinh thành và dưỡng dục em", "Các vị vua thời xưa", "Thầy cô giáo ở trường", "Cha mẹ là những người có công đầu tiên đối với mỗi chúng ta."],
    ["Em được nhận học bổng từ những cô chú hảo tâm ở xa. Thái độ đúng là gì?", "Biết ơn và chăm chỉ học tập để không phụ lòng người giúp đỡ", "Coi đó là việc đương nhiên, không cần cảm ơn", "Chỉ nhận tiền học bổng rồi thôi", "Học tập tốt là cách cảm ơn thiết thực nhất."],
    ["Bác lao công quét dọn trường mỗi ngày. Em thể hiện lòng biết ơn thế nào?", "Giữ vệ sinh chung, chào hỏi lễ phép và cảm ơn bác", "Xả rác nhiều để bác có việc làm", "Coi thường công việc của bác", "Hãy biết ơn cả những người lao động thầm lặng quanh ta."],
    ["Câu tục ngữ “Ăn quả nhớ kẻ trồng cây” có nghĩa là gì?", "Hưởng thành quả phải nhớ ơn người đã tạo ra nó", "Ăn quả xong phải trồng cây ngay lập tức", "Quả ngon là nhờ cây tốt", "Đây là câu tục ngữ quen thuộc dạy về lòng biết ơn."],
    ["Em dùng thư viện do các anh chị khoá trước đóng góp xây dựng. Em cần làm gì?", "Giữ gìn sách cẩn thận, đọc xong để lại ngăn nắp cho khoá sau", "Vẽ và xé sách theo ý thích", "Mang sách về nhà giữ làm của riêng", "Giữ gìn thành quả chung chính là biết ơn người đi trước."],
    ["Lòng biết ơn chân thành khác với “trả ơn cho xong” ở điểm nào?", "Biết ơn là tình cảm thật kèm hành động tốt đẹp lâu dài", "Hoàn toàn không khác nhau", "Biết ơn chỉ cần nói cảm ơn một lần", "Lòng biết ơn xuất phát từ trái tim, không phải việc làm gượng ép."],
    ["Người thợ xây trường học, làm cầu đường cho quê hương. Em biết ơn họ bằng cách nào?", "Giữ gìn công trình công cộng, không phá hoại, không vẽ bậy", "Coi đó là việc của riêng người lớn", "Viết tên mình lên tường mới xây", "Công trình công cộng là thành quả lao động của rất nhiều người."],
    ["Trong lễ kỉ niệm ngày thành lập trường, học sinh thường tri ân bằng cách nào?", "Làm báo tường, văn nghệ và thăm hỏi các thầy cô giáo cũ", "Nghỉ học ở nhà chơi", "Không cần tham gia hoạt động nào", "Tri ân thầy cô cũ là truyền thống đẹp của mọi nhà trường."],
    ["Vào dịp 27/7, hoạt động đền ơn đáp nghĩa nào thường diễn ra ở địa phương?", "Thăm hỏi, tặng quà gia đình thương binh, liệt sĩ và dọn nghĩa trang liệt sĩ", "Tổ chức ăn mừng ầm ĩ tại nghĩa trang", "Không có hoạt động gì", "Mỗi địa phương đều có những việc làm tri ân thiết thực vào dịp này."],
    ["Khi nhận được sự giúp đỡ lúc khó khăn, việc làm nào thể hiện em biết ơn đúng cách?", "Ghi nhớ, cảm ơn và sẵn sàng giúp lại người khác khi có thể", "Quên ngay khi đã qua khó khăn", "Chỉ cảm ơn bằng quà thật đắt tiền", "Lòng biết ơn đẹp nhất là tiếp tục lan toả điều tốt cho người khác."],
  ], [["27/7", "Ngày Thương binh – Liệt sĩ"], ["Uống nước nhớ nguồn", "Biết ơn người đi trước"], ["Đền ơn đáp nghĩa", "Việc làm tri ân"], ["Giỗ Tổ Hùng Vương", "Mồng 10 tháng 3 âm lịch"]], "Nối cho đúng nhé!"),
  topic("dd5-ton trong", "🌈", "Tôn trọng sự khác biệt", "Tôn trọng bạn bè khác biệt về hoàn cảnh, khả năng, sở thích", [
    ["Bạn mới chuyển đến lớp em nói giọng địa phương khác, vài bạn cười chê. Em nên làm gì?", "Nhắc các bạn không trêu chọc, thân thiện giúp bạn hoà nhập", "Cười cùng các bạn cho vui", "Không chơi với bạn mới", "Mỗi người có giọng nói, quê quán khác nhau — cần được tôn trọng."],
    ["Sự khác biệt giữa mọi người có thể là những điều gì?", "Hoàn cảnh gia đình, ngoại hình, khả năng, sở thích, phong tục", "Chỉ khác nhau về chiều cao", "Không ai khác ai cả", "Tôn trọng sự khác biệt giúp mọi người sống hoà thuận."],
    ["Bạn Lan học chậm môn Toán hơn em. Thái độ đúng là gì?", "Kiên nhẫn giúp bạn, không coi thường hay gắn nhãn bạn “học dốt”", "Không thèm chơi với bạn", "Khoe khoang mình giỏi hơn bạn", "Mỗi người có điểm mạnh, điểm yếu riêng."],
    ["Bạn An phải ngồi xe lăn. Cả lớp đi dã ngoại, em nên làm gì?", "Đề nghị cô và các bạn cùng hỗ trợ để bạn An cũng được tham gia vui vẻ", "Kệ bạn ở lại lớp", "Nói bạn không đi được đâu", "Người khuyết tật có quyền được đối xử công bằng và được hoà nhập."],
    ["Một bạn trong lớp có đạo (tôn giáo) khác với em và có những ngày lễ riêng. Em nên ứng xử thế nào?", "Tôn trọng tín ngưỡng của bạn, không trêu chọc", "Bắt bạn phải giống mình", "Xa lánh bạn", "Tự do tín ngưỡng là quyền của mỗi người, cần được tôn trọng."],
    ["Em thích bóng đá, bạn thích vẽ tranh. Điều đó nói lên điều gì?", "Mỗi người có sở thích riêng, không có sở thích nào đáng bị chê bai", "Bạn vẽ tranh là không tốt", "Chỉ bóng đá mới đáng thích", "Tôn trọng sở thích của nhau giúp tình bạn bền chặt."],
    ["Khi nghe một bạn kể về món ăn quê bạn ấy mà em chưa từng ăn, em nên phản ứng thế nào?", "Lắng nghe, tìm hiểu với thái độ tôn trọng, có thể ăn thử nếu được mời", "Chê món ăn “kì cục”", "Bịt mũi cười lớn", "Ẩm thực mỗi vùng miền là nét văn hoá đáng trân trọng."],
    ["Câu nói nào thể hiện sự tôn trọng sự khác biệt?", "“Bạn khác mình cũng không sao, chúng mình vẫn là bạn tốt.”", "“Ai khác mình thì đừng chơi.”", "“Bạn phải giống tớ mới được.”", "Chấp nhận sự khác biệt là biểu hiện của người văn minh."],
    ["Trong nhóm học tập có bạn ít nói, hay rụt rè. Em nên làm gì?", "Khích lệ, tạo cơ hội cho bạn được nói lên ý kiến của mình", "Chiếm hết phần nói của nhóm", "Phớt lờ ý kiến của bạn", "Mỗi thành viên đều có đóng góp riêng cho nhóm."],
    ["Vì sao không nên đặt biệt danh xấu về ngoại hình cho bạn?", "Vì đó là hành vi trêu chọc, làm bạn tổn thương và thiếu tôn trọng", "Vì biệt danh không hay", "Vì thầy cô không cho phép mà thôi", "Lời nói cũng có thể làm người khác đau lòng."],
    ["Bạn mới học kém tiếng Việt vì là người dân tộc thiểu số mới chuyển về. Em nên làm gì?", "Giúp bạn học, nói chậm rãi, thân thiện với bạn", "Không nói chuyện với bạn", "Cười khi bạn nói sai", "54 dân tộc anh em — ai cũng đáng được yêu thương, giúp đỡ."],
    ["Tôn trọng sự khác biệt mang lại lợi ích gì cho tập thể lớp?", "Lớp đoàn kết, ai cũng được là chính mình và phát huy điểm mạnh", "Làm lớp mất trật tự", "Không có lợi ích gì", "Một tập thể tôn trọng nhau sẽ học tập và vui chơi tốt hơn."],
    ["Khi em và bạn bất đồng ý kiến, cách giải quyết đúng là gì?", "Bình tĩnh lắng nghe nhau, tôn trọng ý kiến khác và tìm điểm chung", "Cãi nhau thật to cho thắng", "Giận dỗi không thèm nói chuyện", "Khác ý kiến là chuyện bình thường, quan trọng là cách ứng xử văn minh."],
    ["Bạn Hùng có hoàn cảnh gia đình khó khăn, đồ dùng cũ hơn các bạn. Em nên ứng xử thế nào?", "Chơi với bạn bình thường, không trêu chọc hay xa lánh bạn", "Không chơi với bạn vì nhà bạn nghèo", "Khoe đồ mới của mình trước mặt bạn", "Hoàn cảnh gia đình không quyết định giá trị của một người bạn."],
    ["Bạn nói giọng địa phương bị các bạn bắt chước cười theo. Em nên làm gì?", "Bênh vực bạn và khuyên các bạn dừng việc trêu chọc", "Cười cùng các bạn cho vui", "Quay mặt đi, coi như không thấy", "Giọng nói của quê hương là điều đáng tự hào, không phải để cười chê."],
    ["Trong lớp có bạn theo đạo Phật, bạn theo đạo Thiên Chúa. Điều đúng là gì?", "Mọi bạn đều được tôn trọng tín ngưỡng như nhau", "Chỉ một bạn là theo đạo đúng", "Không nên chơi với bạn khác đạo", "Quyền tự do tín ngưỡng của mọi người đều được tôn trọng."],
    ["Vì sao không nên ép bạn thay đổi kiểu tóc, cách ăn mặc theo ý mình?", "Mỗi người có quyền lựa chọn phù hợp với mình, miễn gọn gàng, lịch sự", "Chỉ vì sợ bạn giận mình", "Hoàn toàn không có lí do nào", "Tôn trọng lựa chọn cá nhân cũng là tôn trọng bạn bè."],
    ["Bạn mới từ nước ngoài về học cùng lớp, có phong tục khác các bạn. Em nên làm gì?", "Tìm hiểu, tôn trọng phong tục của bạn và giúp bạn hoà nhập", "Chê phong tục của bạn là lạ lùng", "Không kết bạn với bạn ấy", "Hiểu biết thêm về các nền văn hoá giúp em trưởng thành hơn."],
    ["Câu nói nào sau đây thể hiện sự tôn trọng bạn bè?", "“Ý kiến của bạn cũng hay, mình nghe bạn nói hết đã.”", "“Bạn biết gì mà nói chứ.”", "“Im đi, để tớ nói trước.”", "Lắng nghe bạn nói hết lời là biểu hiện tôn trọng cơ bản nhất."],
    ["Khi bầu lớp trưởng, có bạn nói “bạn nữ thì không làm được”. Em nghĩ thế nào?", "Cần đánh giá theo năng lực và sự tín nhiệm, nam nữ đều bình đẳng", "Đồng ý ngay cho xong chuyện", "Chỉ nên bầu các bạn nam", "Nam và nữ đều có quyền và khả năng như nhau trong học tập, làm việc."],
    ["Em giỏi vẽ, bạn giỏi hát. Điều đó cho thấy điều gì?", "Mỗi người có một năng khiếu riêng, không ai hơn kém ai tuyệt đối", "Vẽ bao giờ cũng hay hơn hát", "Chỉ một môn năng khiếu là đáng quý", "Điểm mạnh của mỗi người làm cho tập thể thêm phong phú."],
    ["Một bạn ít nói bị các bạn trêu là “lập dị”. Em nên làm gì?", "Đứng về phía bạn, giải thích rằng mỗi người có tính cách riêng cần tôn trọng", "Trêu cùng các bạn cho hoà đồng", "Khuyên bạn phải thay đổi ngay tính cách", "Tính cách hướng nội hay hướng ngoại đều đáng được tôn trọng."],
    ["Tôn trọng sự khác biệt giúp ích gì cho tình bạn?", "Bạn bè tin tưởng, gắn bó và vui vẻ khi ở bên nhau", "Làm tình bạn dễ rạn nứt hơn", "Không có lợi ích gì", "Khi được là chính mình, ai cũng cảm thấy an toàn và hạnh phúc."],
  ], [["Tôn trọng", "Không trêu chọc, coi thường bạn"], ["Khác biệt", "Mỗi người một điểm riêng"], ["Hoà nhập", "Giúp bạn cùng tham gia"], ["Bình đẳng", "Ai cũng đáng được tôn trọng"]], "Nối cho đúng nhé!"),
  topic("dd5-vuotkho", "💪", "Vượt qua khó khăn", "Không nản chí trước khó khăn trong học tập và cuộc sống", [
    ["Bài tập hôm nay rất khó, em làm mãi chưa được. Em nên làm gì?", "Bình tĩnh nghĩ cách khác, hỏi thầy cô, bạn bè và kiên trì làm tiếp", "Bỏ cuộc, không làm nữa", "Chép bài của bạn cho xong", "Khó khăn là cơ hội để em rèn luyện và tiến bộ."],
    ["Em được giao nhiệm vụ trực nhật nhưng hôm đó em hơi mệt. Em nên làm gì?", "Cố gắng hoàn thành phần việc hoặc nhờ bạn hỗ trợ và báo với cô", "Bỏ về nhà không nói với ai", "Đổ việc cho bạn khác", "Trách nhiệm và kiên trì giúp em được mọi người tin yêu."],
    ["Bạn Minh bị ốm phải nghỉ học dài ngày, bài vở bị chậm. Khi bạn đi học lại, em nên làm gì?", "Giúp bạn chép bài, giảng lại phần bạn chưa hiểu", "Không quan tâm", "Chê bạn học kém đi", "Giúp đỡ bạn vượt qua khó khăn cũng là giúp mình hiểu bài hơn."],
    ["Câu tục ngữ nào khuyên ta kiên trì vượt khó?", "“Có công mài sắt, có ngày nên kim.”", "“Há miệng chờ sung.”", "“Nước đến chân mới nhảy.”", "Kiên trì làm việc nhỏ mỗi ngày sẽ thành công lớn."],
    ["Em tập đi xe đạp bị ngã vài lần. Việc làm đúng là gì?", "Đứng dậy tập tiếp, nhờ người lớn hướng dẫn cách giữ thăng bằng", "Vứt xe, không bao giờ tập nữa", "Đổ lỗi cho chiếc xe", "Ai học kĩ năng mới cũng cần thời gian luyện tập."],
    ["Trước một kì thi quan trọng, em cảm thấy lo lắng. Cách nào giúp em vượt qua?", "Lập kế hoạch ôn tập từng phần, ngủ đủ giấc, tin vào sự chuẩn bị của mình", "Bỏ ôn tập vì lo quá", "Thức trắng đêm hôm trước thi", "Chuẩn bị kĩ là cách tốt nhất để tự tin."],
    ["Khi gặp khó khăn, việc nhờ người khác giúp đỡ có phải là yếu đuối không?", "Không. Biết nhờ giúp đỡ đúng lúc là khôn ngoan; quan trọng là em vẫn nỗ lực hết sức", "Có, không được nhờ ai bao giờ", "Chỉ người yếu mới cần giúp đỡ", "Thầy cô, gia đình, bạn bè luôn sẵn sàng hỗ trợ em."],
    ["Tấm gương nào sau đây thể hiện ý chí vượt khó?", "Bạn học sinh nghèo vẫn chăm chỉ học và đạt thành tích cao", "Bạn giàu có nhưng lười học", "Bạn bỏ học vì một lần điểm kém", "Hoàn cảnh khó khăn không ngăn được người có ý chí."],
    ["Em đặt mục tiêu đọc hết một cuốn sách dày trong tháng. Cách làm hợp lí là gì?", "Chia nhỏ mục tiêu: mỗi ngày đọc một số trang nhất định", "Để đến ngày cuối cùng mới đọc", "Bỏ mục tiêu vì sách quá dày", "Chia nhỏ mục tiêu giúp việc khó trở nên dễ thực hiện."],
    ["Khi làm bài kiểm tra gặp câu khó, em nên làm gì trước?", "Làm các câu dễ trước, quay lại câu khó sau và suy nghĩ kĩ", "Ngồi khóc và bỏ trắng cả bài", "Quay cóp bài bạn bên cạnh", "Bình tĩnh, phân bổ thời gian hợp lí là kĩ năng cần thiết."],
    ["Thất bại trong một cuộc thi có phải là điều xấu hoàn toàn?", "Không. Thất bại giúp em rút kinh nghiệm và cố gắng hơn lần sau", "Đúng, nên không bao giờ thi nữa", "Đúng, chứng tỏ em kém cỏi", "“Thất bại là mẹ thành công.”"],
    ["Em hứa sẽ dậy sớm tập thể dục nhưng sáng nào cũng muốn ngủ nướng. Cách nào giúp em giữ quyết tâm?", "Đặt báo thức, chuẩn bị đồ từ tối, rủ bạn cùng tập để có động lực", "Từ bỏ kế hoạch ngay ngày đầu", "Đổ lỗi cho chiếc giường", "Tạo thói quen tốt cần kiên trì từng ngày."],
    ["Khi bị bạn hiểu lầm và giận, em cảm thấy rất buồn. Em nên làm gì?", "Tìm lúc thích hợp, bình tĩnh giải thích rõ ràng với bạn", "Giận lại và không bao giờ nói chuyện", "Nói xấu bạn với cả lớp", "Giao tiếp chân thành giúp hoá giải khó khăn trong quan hệ bạn bè."],
    ["Em học bơi mãi vẫn chưa biết bơi trong khi bạn đã bơi giỏi. Em nên làm gì?", "Tiếp tục luyện tập từng bước, mỗi người tiến bộ một tốc độ khác nhau", "Bỏ học bơi ngay lập tức", "Giấu mọi người việc mình chưa biết bơi", "Kiên trì tập đúng kĩ thuật, em sẽ tiến bộ dần theo thời gian."],
    ["Em bị điểm kém môn Toán sau một thời gian học chủ quan. Việc nên làm là gì?", "Tìm nguyên nhân, ôn lại phần kiến thức bị hổng và nhờ thầy cô giúp", "Buồn chán rồi bỏ bê luôn môn Toán", "Giấu bài kiểm tra không cho ai biết", "Một lần điểm kém là lời nhắc để em điều chỉnh cách học."],
    ["Câu nói “Thất bại là mẹ thành công” khuyên em điều gì?", "Đừng sợ thất bại, hãy rút kinh nghiệm để lần sau thành công", "Thất bại càng nhiều càng tốt", "Không cần cố gắng cũng thành công", "Những người thành công đều từng trải qua nhiều lần thất bại."],
    ["Em đặt mục tiêu thuộc bảng cửu chương nhưng học hay quên. Cách học nào hiệu quả?", "Chia nhỏ ra học mỗi ngày và ôn lại thường xuyên", "Học dồn một đêm thật khuya trước ngày kiểm tra", "Chép phạt thật nhiều lần cho nhớ", "Ôn tập ngắt quãng nhiều lần giúp trí nhớ bền lâu hơn."],
    ["Khi việc khó kéo dài làm em mệt mỏi, điều gì giúp em không bỏ cuộc?", "Nhớ lại mục tiêu ban đầu, chia nhỏ việc và tự động viên mình", "Tự trách mình là người kém cỏi", "So sánh mình với bạn giỏi nhất lớp", "Tự động viên đúng lúc là sức mạnh giúp em đi tiếp."],
    ["Bạn Nam bị khuyết tật ở chân nhưng vẫn đi học đều và học rất giỏi. Em học được gì?", "Ý chí và nghị lực vượt lên hoàn cảnh của bạn", "Bạn ấy chỉ gặp may mắn mà thôi", "Khuyết tật chẳng ảnh hưởng gì đến ai", "Nghị lực của bạn là tấm gương sáng cho cả lớp noi theo."],
    ["Thái độ “đổ lỗi hết cho hoàn cảnh” khi gặp khó khăn có tốt không?", "Không tốt; nên chủ động tìm cách giải quyết thay vì chỉ than phiền", "Rất tốt vì lỗi là của hoàn cảnh", "Đổ lỗi giúp em nhẹ lòng là đủ rồi", "Người chủ động tìm giải pháp sẽ trưởng thành nhanh hơn."],
    ["Em muốn tham gia đội tuyển của trường nhưng sợ không được chọn. Em nên làm gì?", "Vẫn đăng kí và cố gắng hết sức, dù kết quả thế nào cũng có kinh nghiệm", "Không đăng kí để khỏi thất vọng", "Chờ thầy cô mời mới tham gia", "Dám thử sức đã là một bước em vượt qua chính mình."],
    ["Đường đến trường bị ngập sau trận mưa lớn. Em nên xử lí thế nào?", "Tìm đường an toàn khác hoặc nhờ người lớn đưa đi, không lội chỗ nước sâu", "Lội qua chỗ ngập sâu cho nhanh", "Nghỉ học mà không báo cho ai biết", "An toàn của bản thân luôn là điều quan trọng nhất."],
    ["Gia đình gặp khó khăn, em không có nhiều đồ dùng mới như các bạn. Em nên nghĩ thế nào?", "Trân trọng những gì mình có, tập trung học tập, khó khăn chỉ là tạm thời", "Xấu hổ và tránh mặt tất cả bạn bè", "Đòi bố mẹ mua bằng được đồ giống bạn", "Nhiều tấm gương vượt khó học giỏi rất đáng để em noi theo."],
  ], [["Kiên trì", "Không bỏ cuộc giữa chừng"], ["Nỗ lực", "Cố gắng hết sức mình"], ["Có công mài sắt", "Có ngày nên kim"], ["Thất bại", "Bài học để thành công"]], "Nối cho đúng nhé!"),
  topic("dd5-baove", "🛡️", "Bảo vệ cái đúng, cái tốt", "Dũng cảm bảo vệ điều đúng, phê phán điều sai", [
    ["Em thấy một bạn lớn bắt nạt bạn nhỏ ở sân trường. Em nên làm gì?", "Báo ngay với thầy cô hoặc bảo vệ trường; nếu an toàn thì lên tiếng ngăn lại", "Đứng xem cho vui", "Quay clip để đăng mạng", "Bảo vệ người yếu thế là việc làm dũng cảm và đúng đắn."],
    ["Bạn thân rủ em nói dối cô giáo về việc chưa làm bài tập. Em nên làm gì?", "Từ chối, khuyên bạn nhận lỗi và làm bài đầy đủ", "Nói dối giúp bạn cho xong chuyện", "Im lặng mặc kệ", "Bảo vệ cái đúng đôi khi cần dũng cảm nói “không” với cả bạn thân."],
    ["Em nhặt được tiền rơi trong lớp. Việc làm đúng là gì?", "Mang nộp cho thầy cô để trả lại người mất", "Giữ lấy tiêu riêng", "Chia cho các bạn trong nhóm", "Trung thực là bảo vệ điều tốt đẹp trong chính mình."],
    ["Thấy bạn quay cóp trong giờ kiểm tra, em nên làm gì?", "Nhắc bạn dừng lại; nếu bạn vẫn tiếp tục thì báo thầy cô", "Cho bạn chép bài của mình", "Quay cóp cùng bạn", "Gian lận là hành vi sai trái, không công bằng với các bạn trung thực."],
    ["Một người lạ rủ em lấy trộm đồ trong cửa hàng. Em phải làm gì?", "Từ chối ngay, tránh xa và kể với người lớn", "Làm theo vì sợ", "Rủ thêm bạn cùng làm", "Việc xấu dù ai rủ rê cũng phải kiên quyết từ chối."],
    ["Em vô tình làm vỡ chậu hoa của lớp. Em nên làm gì?", "Thành thật nhận lỗi với cô giáo và tìm cách khắc phục", "Đổ lỗi cho bạn bên cạnh", "Giấu kín, không ai biết là được", "Dũng cảm nhận lỗi là biểu hiện của người trung thực."],
    ["Vì sao cần phê phán những việc làm sai trái?", "Để ngăn chặn điều xấu lan rộng và bảo vệ điều tốt đẹp", "Để tỏ ra mình giỏi hơn người khác", "Để được mọi người chú ý", "Phê phán đúng cách là góp ý chân thành, không phải là chê bai, xúc phạm."],
    ["Khi góp ý cho bạn về một việc làm sai, em nên nói thế nào?", "Nói riêng, nhẹ nhàng, chân thành, chỉ rõ việc sai và cách sửa", "La mắng bạn giữa lớp cho bạn xấu hổ", "Nói xấu bạn sau lưng", "Góp ý đúng cách giúp bạn tiến bộ mà không tổn thương."],
    ["Em thấy người lớn vứt rác xuống sông. Em có thể làm gì?", "Nhắc nhở lễ phép hoặc báo với người có trách nhiệm; tự mình không vứt rác bừa bãi", "Vứt theo cho vui", "Chụp ảnh chế giễu trên mạng", "Bảo vệ môi trường là bảo vệ cái tốt chung của cộng đồng."],
    ["Câu nói nào thể hiện thái độ bảo vệ cái đúng?", "“Việc này sai rồi, mình không thể làm ngơ.”", "“Việc của người khác, kệ họ.”", "“Sai cũng được, miễn có lợi cho mình.”", "Không làm ngơ trước cái sai là trách nhiệm của mỗi người."],
    ["Khi bị ép làm một việc mà em biết là sai, em cần có thái độ nào?", "Kiên quyết từ chối và tìm sự giúp đỡ của người lớn nếu cần", "Làm theo để khỏi bị ghét", "Im lặng làm theo rồi hối hận", "Bản lĩnh giúp em đứng về phía điều đúng."],
    ["Trong lớp có bạn hay nói tục, chửi bậy. Em nên làm gì?", "Không nói theo; góp ý để bạn sửa, cùng xây dựng lớp văn minh", "Nói tục theo cho hoà đồng", "Cười cổ vũ bạn", "Môi trường học đường văn minh bắt đầu từ lời nói đẹp."],
    ["Bảo vệ cái đúng, cái tốt mang lại điều gì cho tập thể?", "Tập thể trong sạch, đoàn kết, mọi người tin tưởng lẫn nhau", "Gây mất đoàn kết", "Không có tác dụng gì", "Cái tốt được bảo vệ, cái xấu sẽ dần bị đẩy lùi."],
    ["Em thấy bạn vẽ bậy lên bức tường lớp học vừa sơn mới. Em nên làm gì?", "Nhắc bạn dừng lại và cùng báo cô giáo, giữ cho lớp luôn đẹp", "Vẽ thêm cùng bạn cho vui", "Coi như không nhìn thấy gì", "Giữ gìn trường lớp sạch đẹp là trách nhiệm của mọi học sinh."],
    ["Bạn trong nhóm giấu đồ của bạn khác “cho vui” và rủ em giữ bí mật. Em làm gì?", "Khuyên bạn trả lại đồ và xin lỗi, không tham gia trò đùa gây hại", "Giúp bạn giấu đồ thật kĩ hơn", "Đứng cười xem bạn mất đồ phản ứng", "Trò đùa làm người khác lo lắng, buồn bã là trò đùa sai trái."],
    ["Em bị một bạn lớn tuổi hơn ép đưa tiền ăn sáng. Em nên làm gì?", "Không đưa tiền, tránh xa bạn đó và kể ngay với thầy cô, bố mẹ", "Đưa tiền mãi cho yên chuyện", "Đánh lại bạn đó một trận", "Hành vi trấn lột là sai trái, cần người lớn can thiệp ngay."],
    ["Thái độ “làm ngơ” khi thấy điều sai trái sẽ dẫn đến hậu quả gì?", "Điều xấu lan rộng, người bị hại không được ai giúp đỡ", "Hoàn toàn không có hậu quả gì", "Mọi việc sẽ tự tốt lên theo thời gian", "Sự im lặng đôi khi chính là tiếp tay cho cái xấu."],
    ["Khi khen ngợi việc tốt của bạn trước lớp, em đang làm điều gì?", "Khích lệ và lan toả điều tốt đẹp trong tập thể", "Nịnh bợ để lấy lòng bạn", "Một việc không có tác dụng gì", "Cái tốt khi được biểu dương sẽ ngày càng nhiều thêm."],
    ["Trong thư viện, em thấy bạn xé trang sách để chép lại. Em nên làm gì?", "Nhắc bạn dừng lại ngay và báo với thủ thư nếu bạn không nghe", "Xé thêm một trang nữa cho mình", "Mặc kệ vì đó là sách của trường", "Sách thư viện là tài sản chung, mọi người cùng có trách nhiệm giữ gìn."],
    ["“Phê phán” khác với “chê bai, xúc phạm” ở điểm nào?", "Phê phán nhằm giúp sửa sai, còn xúc phạm làm tổn thương người khác", "Hai việc hoàn toàn giống hệt nhau", "Phê phán luôn phải dùng lời lẽ nặng nề", "Góp ý chân thành và tôn trọng người nghe mới là phê phán đúng cách."],
    ["Em nghe được kế hoạch trêu chọc khiến một bạn có thể bị thương. Em nên làm gì?", "Báo ngay với thầy cô để ngăn chặn kịp thời", "Giữ bí mật cho nhóm bạn của mình", "Chờ xem chuyện gì sẽ xảy ra", "Ngăn chặn trước khi hậu quả xảy ra là việc làm đúng đắn nhất."],
    ["Có người lạ vào trường dụ dỗ học sinh bằng quà bánh. Em nên làm gì?", "Báo ngay với thầy cô và bảo vệ trường", "Lại gần nói chuyện với người đó", "Giữ im lặng vì sợ bị trả thù", "Cảnh giác và báo cho người lớn là cách bảo vệ an toàn cho cả trường."],
    ["Bạn rủ em cùng phá hàng cây xanh ven đường “cho vui”. Em trả lời thế nào?", "Từ chối dứt khoát vì phá hoại cây xanh là việc sai trái", "Đồng ý ngay vì bạn thân rủ rê", "Đứng xem bạn phá cũng được", "Biết nói “không” với việc sai là em đang bảo vệ cái tốt."],
  ], [["Trung thực", "Không nói dối, không gian lận"], ["Dũng cảm", "Dám bảo vệ điều đúng"], ["Phê phán", "Góp ý để sửa điều sai"], ["Bản lĩnh", "Không làm theo điều xấu"]], "Nối cho đúng nhé!"),
  topic("dd5-moitruong", "🌳", "Bảo vệ môi trường sống", "Giữ gìn môi trường ở nhà, ở trường và nơi công cộng", [
    ["Việc làm nào giúp bảo vệ môi trường sống quanh em?", "Bỏ rác đúng nơi quy định, trồng cây, tiết kiệm nước và điện", "Vứt rác ra đường cho nhanh", "Đốt rác nhựa trước nhà", "Môi trường sống sạch đẹp bắt đầu từ thói quen nhỏ mỗi ngày."],
    ["Em uống xong chai nước ở công viên mà không thấy thùng rác gần đó. Em nên làm gì?", "Cầm chai theo đến khi gặp thùng rác hoặc mang về nhà bỏ đúng nơi", "Vứt xuống bãi cỏ", "Giấu dưới ghế đá", "Không có thùng rác không phải là lí do để xả rác."],
    ["Vì sao cần trồng và bảo vệ cây xanh?", "Cây cho bóng mát, lọc không khí, là nhà của nhiều loài vật", "Cây chiếm chỗ, nên chặt hết", "Cây không có tác dụng gì", "Mỗi người trồng một cây, Trái Đất thêm xanh."],
    ["Hành động nào giúp tiết kiệm nước ở trường học?", "Khoá vòi nước sau khi dùng, báo ngay khi thấy vòi nước rò rỉ", "Mở vòi nước chảy chơi", "Để vòi chảy thoải mái", "Nước sạch không phải là vô tận."],
    ["Rác thải nhựa nguy hại cho môi trường như thế nào?", "Rất lâu phân huỷ, làm ô nhiễm đất, nước, hại sinh vật biển", "Tan ngay trong đất", "Là thức ăn cho cá", "Hạn chế dùng đồ nhựa một lần là việc cần làm ngay."],
    ["Ở nhà, em có thể phân loại rác như thế nào?", "Rác hữu cơ (thức ăn thừa), rác tái chế (chai, giấy), rác khó phân huỷ để riêng", "Trộn hết mọi loại rác vào một túi", "Đổ rác ra sau nhà", "Phân loại rác giúp rác được xử lí và tái chế tốt hơn."],
    ["Thấy bạn bẻ cành cây, hái hoa trong vườn trường, em nên làm gì?", "Nhắc bạn dừng lại và cùng chăm sóc vườn trường", "Hái cùng bạn cho vui", "Mặc kệ, không phải việc của mình", "Cây xanh ở trường là tài sản chung cần được giữ gìn."],
    ["Ngày Môi trường thế giới là ngày nào?", "Ngày 5 tháng 6", "Ngày 1 tháng 1", "Ngày 20 tháng 11", "Nhiều hoạt động trồng cây, dọn vệ sinh được tổ chức vào ngày này."],
    ["Việc tắt điện khi không sử dụng giúp bảo vệ môi trường bằng cách nào?", "Giảm lượng điện phải sản xuất, giảm khí thải gây ô nhiễm", "Không giúp gì cả", "Chỉ để tiết kiệm tiền điện", "Tiết kiệm năng lượng là bảo vệ môi trường."],
    ["Em có thể tái sử dụng đồ vật nào trong học tập?", "Giấy một mặt làm giấy nháp, hộp cũ đựng đồ dùng", "Không tái sử dụng được gì", "Chỉ dùng đồ mới hoàn toàn", "Tái sử dụng giúp giảm rác thải và tiết kiệm tài nguyên."],
    ["Khói xe và khói nhà máy gây hại gì cho môi trường sống?", "Làm ô nhiễm không khí, gây bệnh về hô hấp", "Làm không khí thêm trong lành", "Giúp cây mọc nhanh", "Đi xe đạp, đi bộ quãng ngắn vừa khoẻ vừa bảo vệ môi trường."],
    ["Khi tham gia lao động vệ sinh khu phố cùng mọi người, em đang thể hiện điều gì?", "Trách nhiệm bảo vệ môi trường sống chung của cộng đồng", "Làm việc không công vô ích", "Chỉ làm cho người lớn vui", "Môi trường sống là của chung, ai cũng có trách nhiệm giữ gìn."],
    ["Bảo vệ môi trường sống quan trọng vì điều gì?", "Môi trường trong lành giúp con người khoẻ mạnh, sinh vật phát triển", "Chỉ để được khen", "Không quan trọng lắm", "Bảo vệ môi trường chính là bảo vệ cuộc sống của chúng ta."],
    ["Dùng túi vải đi chợ thay túi ni-lông có lợi ích gì?", "Dùng được nhiều lần, giảm rác nhựa khó phân huỷ", "Túi vải đắt tiền hơn nên tốt hơn", "Hoàn toàn không khác túi ni-lông", "Thay đổi một thói quen nhỏ giúp giảm ô nhiễm rất lớn."],
    ["Nước thải sinh hoạt cần được xử lí thế nào trước khi ra môi trường?", "Qua bể tự hoại hoặc hệ thống xử lí nước thải", "Đổ thẳng xuống ao hồ gần nhà", "Đổ ra vườn rau ăn ngay", "Xử lí nước thải giúp bảo vệ nguồn nước và sức khoẻ cộng đồng."],
    ["Em thấy vòi nước ở nhà vệ sinh trường bị rò rỉ suốt ngày. Em nên làm gì?", "Báo ngay với thầy cô hoặc bác bảo vệ để sửa chữa", "Kệ đi, đó không phải việc của em", "Mở thêm vòi nước để chơi", "Một vòi nước rò rỉ có thể lãng phí rất nhiều nước mỗi ngày."],
    ["Vì sao nên đi bộ hoặc đi xe đạp khi quãng đường ngắn?", "Giảm khói bụi, tiết kiệm nhiên liệu và tốt cho sức khoẻ", "Vì đi bộ bao giờ cũng nhanh hơn", "Hoàn toàn không có tác dụng gì", "Phương tiện “xanh” giúp thành phố trong lành hơn."],
    ["Lá cây rụng trong sân trường nên được xử lí thế nào?", "Quét dồn lại ủ làm phân bón cho vườn trường", "Đốt ngay tại sân cho gọn", "Vứt hết ra đường phố", "Lá rụng là rác hữu cơ, ủ thành phân rất tốt cho cây trồng."],
    ["Tiếng ồn lớn ở khu dân cư gây ra tác hại gì?", "Ảnh hưởng giấc ngủ, sức khoẻ và việc học tập của mọi người", "Không gây ra tác hại gì", "Làm mọi người thêm vui vẻ", "Giữ yên tĩnh nơi công cộng cũng là bảo vệ môi trường sống."],
    ["Ở lớp học, em có thể làm gì để giảm rác thải?", "Dùng giấy cả hai mặt, thu gom giấy vụn để tái chế", "Mỗi ngày vứt đi một quyển vở", "Không thể làm được việc gì", "Lớp học xanh sạch bắt đầu từ thói quen của từng học sinh."],
    ["Khi đi dã ngoại trong rừng, em cần ghi nhớ điều gì?", "Mang rác của mình về, không bẻ cây, không làm hại thiên nhiên", "Khắc tên lên thân cây làm kỉ niệm", "Vứt rác hữu cơ tuỳ ý trong rừng", "Du lịch có trách nhiệm giúp thiên nhiên mãi xanh đẹp."],
    ["Thùng rác ba ngăn ở trường học có ý nghĩa gì?", "Giúp phân loại rác ngay tại nguồn: hữu cơ, tái chế và rác còn lại", "Chỉ để sân trường thêm nhiều màu sắc", "Không có ý nghĩa thực tế nào", "Phân loại đúng ngay từ đầu giúp việc tái chế dễ dàng hơn nhiều."],
    ["Ao hồ trong thành phố cần được bảo vệ vì sao?", "Giúp điều hoà không khí, thoát nước và là nơi sống của sinh vật thuỷ sinh", "Chỉ để làm cảnh cho đẹp", "Có thể lấp hết đi để xây nhà", "Hồ Gươm ở Hà Nội là ví dụ về hồ nước gắn với lịch sử và đời sống."],
  ], [["Phân loại rác", "Giúp tái chế, giảm ô nhiễm"], ["Trồng cây", "Thêm bóng mát, lọc không khí"], ["Tiết kiệm nước", "Khoá vòi sau khi dùng"], ["5/6", "Ngày Môi trường thế giới"]], "Nối cho đúng nhé!"),
  topic("dd5-kehoach", "🗓️", "Lập kế hoạch cá nhân", "Lập và thực hiện kế hoạch học tập, rèn luyện cho bản thân", [
    ["Lập kế hoạch cá nhân là làm gì?", "Sắp xếp trước những việc cần làm theo thời gian để thực hiện có hiệu quả", "Làm việc tuỳ hứng, nhớ đâu làm đó", "Nhờ người khác làm thay việc của mình", "Kế hoạch giúp em chủ động, không bỏ sót việc quan trọng."],
    ["Một kế hoạch tốt cần có những yếu tố nào?", "Mục tiêu rõ ràng, việc cụ thể, thời gian thực hiện và cách kiểm tra kết quả", "Chỉ ghi mục tiêu thật lớn", "Không cần thời gian cụ thể", "Kế hoạch càng rõ ràng càng dễ thực hiện."],
    ["Em muốn cải thiện môn Tiếng Anh trong học kì này. Bước đầu tiên nên làm là gì?", "Xác định mục tiêu cụ thể (VD: mỗi ngày học 10 từ mới) và lên lịch thực hiện", "Chờ đến cuối kì mới học dồn", "Bỏ qua vì môn này khó", "Mục tiêu cụ thể, vừa sức sẽ dễ duy trì."],
    ["Vì sao nên viết kế hoạch ra giấy hoặc bảng nhắc việc?", "Để không quên, dễ theo dõi và kiểm tra tiến độ thực hiện", "Để trang trí cho đẹp", "Không cần thiết", "Viết ra giúp kế hoạch rõ ràng và nghiêm túc hơn."],
    ["Trong một ngày, em nên sắp xếp thời gian như thế nào là hợp lí?", "Học tập, vui chơi, thể dục, nghỉ ngơi cân đối theo thời gian biểu", "Chơi suốt ngày, tối mới học", "Học liên tục không nghỉ ngơi", "Thời gian biểu cân đối giúp em khoẻ mạnh và học hiệu quả."],
    ["Khi kế hoạch bị thay đổi vì việc đột xuất, em nên làm gì?", "Linh hoạt điều chỉnh kế hoạch và hoàn thành phần việc còn lại sau", "Bỏ luôn cả kế hoạch", "Giận dỗi, không làm gì nữa", "Kế hoạch cần linh hoạt nhưng không được dễ dàng từ bỏ."],
    ["Việc nào thể hiện em thực hiện kế hoạch nghiêm túc?", "Đánh dấu việc đã hoàn thành mỗi ngày, tự nhận xét và cố gắng hôm sau tốt hơn", "Lập kế hoạch xong để đó", "Chỉ làm khi có người nhắc", "Tự giác là chìa khoá của mọi kế hoạch."],
    ["Mục tiêu “đọc 20 cuốn sách trong năm học” có đặc điểm gì tốt?", "Cụ thể, đo được, có thời hạn rõ ràng", "Mơ hồ, chung chung", "Không thể thực hiện được", "Chia nhỏ ra: mỗi tháng đọc khoảng 2 cuốn sẽ dễ đạt hơn."],
    ["Em nên ưu tiên làm việc nào trước trong danh sách việc cần làm?", "Việc quan trọng và gấp trước, việc ít quan trọng làm sau", "Việc dễ nhất trước bất kể quan trọng hay không", "Việc mình thích nhất, bỏ qua việc quan trọng", "Sắp xếp thứ tự ưu tiên giúp em không bị quá tải."],
    ["Nguyên nhân thường khiến kế hoạch thất bại là gì?", "Đặt mục tiêu quá cao so với khả năng, thiếu kiên trì, không theo dõi tiến độ", "Kế hoạch viết quá đẹp", "Có quá nhiều người ủng hộ", "Rút kinh nghiệm sau mỗi lần thất bại giúp kế hoạch sau tốt hơn."],
    ["Cuối tuần, em nên làm gì với kế hoạch của mình?", "Nhìn lại những việc đã làm được, chưa làm được và điều chỉnh cho tuần sau", "Xé bỏ kế hoạch cũ", "Không cần quan tâm nữa", "Đánh giá hằng tuần giúp em tiến bộ đều đặn."],
    ["Lập kế hoạch giúp em đạt được điều gì?", "Chủ động về thời gian, học tập hiệu quả, rèn tính kỉ luật và tự lập", "Có thêm nhiều việc hơn", "Phụ thuộc vào người khác hơn", "Người biết lập kế hoạch thường hoàn thành công việc tốt hơn."],
    ["Khi lập kế hoạch rèn luyện thân thể, em nên ghi những gì?", "Môn tập, thời gian tập mỗi ngày, số ngày trong tuần và mục tiêu sức khoẻ", "Chỉ ghi “tập thể dục” chung chung", "Không ghi thời gian cụ thể", "Ví dụ: chạy bộ 15 phút lúc 6 giờ sáng, thứ 2-4-6 hằng tuần."],
    ["Việc đầu tiên khi lập kế hoạch cho một tuần học mới là gì?", "Liệt kê các việc cần làm và thời hạn của từng việc", "Làm ngay việc dễ nhất trong đầu", "Chờ đến cuối tuần mới tổng kết", "Biết rõ mình có những việc gì mới sắp xếp được thời gian."],
    ["“Học bài 30 phút sau bữa tối” tốt hơn “học lúc nào rảnh” ở điểm nào?", "Có thời gian cụ thể nên dễ thực hiện và dễ kiểm soát", "Không hơn ở điểm nào cả", "Chỉ vì câu chữ nghe dài hơn", "Thời gian cụ thể giúp em không trì hoãn việc học."],
    ["Một việc trong kế hoạch chưa hoàn thành đúng hạn, em nên làm gì?", "Xem lại nguyên nhân, chuyển sang khung giờ phù hợp và rút kinh nghiệm", "Tự phạt mình thật nặng nề", "Bỏ qua luôn việc đó không làm nữa", "Điều chỉnh kịp thời giúp kế hoạch vẫn đi đúng hướng."],
    ["Em muốn để dành tiền mua một quyển sách hay trong 4 tuần. Kế hoạch hợp lí là gì?", "Mỗi tuần để dành một phần tiền tiêu vặt bằng nhau cho đến khi đủ", "Tuần đầu tiêu hết tiền, tuần sau tính tiếp", "Nhịn ăn sáng để có tiền thật nhanh", "Chia mục tiêu thành các phần nhỏ theo tuần sẽ dễ thực hiện hơn."],
    ["“Việc quan trọng” trong kế hoạch được nhận biết bằng cách nào?", "Là việc ảnh hưởng lớn đến mục tiêu và thường có thời hạn rõ ràng", "Là việc em thích làm nhất", "Là việc dễ nhất trong danh sách", "Ôn tập trước kì kiểm tra là một việc quan trọng điển hình."],
    ["Khi lập kế hoạch làm việc nhóm, cần phân công thế nào?", "Mỗi bạn một phần việc cụ thể, có thời hạn và có người theo dõi chung", "Ai rảnh lúc nào thì làm lúc đó", "Một bạn làm hết mọi việc cho nhanh", "Phân công rõ ràng là chìa khoá để kế hoạch nhóm thành công."],
    ["Xem lại kế hoạch vào mỗi buổi tối mang lại lợi ích gì?", "Nhìn lại ngày đã qua và chuẩn bị chủ động cho ngày mai", "Chỉ tốn thêm thời gian vô ích", "Để viết cho đẹp cuốn sổ", "Năm phút mỗi tối đổi lấy một ngày hôm sau ngăn nắp, hiệu quả."],
    ["Vì sao trong kế hoạch cần có cả thời gian nghỉ ngơi, vui chơi?", "Nghỉ ngơi giúp cơ thể và đầu óc phục hồi, kế hoạch mới cân đối", "Nghỉ ngơi là biểu hiện của lười biếng", "Kế hoạch chỉ nên gồm việc học", "Học tập hiệu quả luôn cần xen kẽ thư giãn một cách hợp lí."],
    ["Bạn em lập kế hoạch rất chi tiết nhưng không bao giờ làm theo. Vấn đề nằm ở đâu?", "Thiếu sự thực hiện và kỉ luật với chính bản thân", "Kế hoạch của bạn chưa đủ chi tiết", "Hoàn toàn không có vấn đề gì", "Kế hoạch tốt phải luôn đi đôi với hành động kiên trì."],
    ["Thời gian biểu buổi sáng hợp lí trước khi đi học gồm những việc gì?", "Thức dậy, vệ sinh cá nhân, ăn sáng, chuẩn bị sách vở rồi đến trường", "Chơi điện tử, ăn sáng qua loa rồi chạy vội đến trường", "Ngủ đến sát giờ học mới bật dậy", "Một buổi sáng ngăn nắp giúp em có ngày học tập hiệu quả."],
  ], [["Mục tiêu", "Điều em muốn đạt được"], ["Thời gian biểu", "Sắp xếp việc theo thời gian"], ["Ưu tiên", "Việc quan trọng làm trước"], ["Kiểm tra tiến độ", "Xem lại việc đã làm"]], "Nối cho đúng nhé!"),
  topic("dd5-xamhai", "🆘", "Phòng tránh xâm hại", "Nhận biết hành vi không an toàn, biết từ chối và tìm người lớn giúp đỡ", [
    ["“Quy tắc đồ bơi” giúp em nhận biết điều gì?", "Vùng được đồ bơi che phủ là vùng riêng tư, không ai được nhìn hay chạm vào khi em không đồng ý", "Cách chọn đồ bơi đẹp", "Cách bơi không bị chìm", "Ngoại lệ duy nhất: bố mẹ giúp tắm rửa khi còn nhỏ, bác sĩ khám bệnh có bố mẹ bên cạnh."],
    ["Một người hàng xóm bảo em “giữ bí mật” về việc họ chạm vào người em. Em phải làm gì?", "Không giữ bí mật đó; kể ngay cho bố mẹ hoặc người lớn tin cậy", "Giữ bí mật như đã hứa", "Chỉ kể cho bạn cùng lớp", "Bí mật khiến em sợ hãi, khó chịu là bí mật xấu — phải nói ra ngay."],
    ["Người lạ cho em kẹo và rủ lên xe đi chơi. Em nên làm gì?", "Từ chối, không đi theo, đi về nơi đông người và kể với người lớn", "Nhận kẹo và đi theo vì người đó cười rất hiền", "Đi theo nhưng không ăn kẹo", "Không nhận quà, không đi theo người lạ trong mọi trường hợp."],
    ["Ai đó gửi cho em hình ảnh không phù hợp qua mạng và dặn không được nói với ai. Em nên làm gì?", "Không xem tiếp, không trả lời, chặn người đó và báo ngay cho bố mẹ", "Giữ bí mật và xem tiếp", "Gửi lại ảnh của mình cho họ", "Người lớn sẽ giúp em xử lí và bảo vệ em."],
    ["Khi cảm thấy không an toàn, ba bước em cần làm là gì?", "Nói KHÔNG – Tránh xa – Kể với người lớn tin cậy", "Im lặng – Chịu đựng – Giấu kín", "Khóc – Bỏ chạy thật xa một mình – Không nói với ai", "Ba bước này giúp em tự bảo vệ mình hiệu quả."],
    ["Bạn của em kể rằng bạn bị một người lớn chạm vào vùng riêng tư và rất sợ. Em nên làm gì?", "Động viên bạn, cùng bạn kể ngay với thầy cô hoặc bố mẹ", "Khuyên bạn giữ im lặng cho yên chuyện", "Kể lại cho cả lớp nghe", "Giúp bạn nói ra là cách bảo vệ bạn tốt nhất."],
    ["Hành vi nào sau đây là hành vi xâm hại cần cảnh giác?", "Người lớn bắt em xem, chạm vào cơ thể họ hoặc chạm vào vùng riêng tư của em", "Cô giáo bắt tay động viên em", "Bố mẹ ôm em chào buổi sáng", "Bất kì hành vi nào khiến em khó chịu, sợ hãi về cơ thể đều cần nói ra."],
    ["Em đang ở nhà một mình, có người lạ gõ cửa nói là bạn của bố mẹ. Em nên làm gì?", "Không mở cửa, gọi điện cho bố mẹ để xác nhận", "Mở cửa mời vào nhà", "Cho người đó số điện thoại của bố mẹ qua cửa", "An toàn là trên hết: không mở cửa cho người lạ."],
    ["Số điện thoại khẩn cấp nào em có thể gọi khi gặp nguy hiểm?", "113 (cảnh sát), 115 (cấp cứu), hoặc tổng đài bảo vệ trẻ em 111", "Chỉ gọi cho bạn bè", "Không có số nào cả", "Tổng đài 111 là đường dây nóng bảo vệ trẻ em quốc gia, gọi miễn phí."],
    ["Vì sao em không nên chia sẻ địa chỉ nhà, trường học với người lạ trên mạng?", "Kẻ xấu có thể lợi dụng thông tin đó để làm hại em", "Vì địa chỉ là bí mật quốc gia", "Vì mạng xã hội cấm", "Thông tin cá nhân cần được giữ kín với người không quen biết."],
    ["Khi bị ai đó đe doạ “nếu nói ra sẽ bị phạt”, em nên hiểu thế nào?", "Đó là chiêu trò doạ nạt; em cứ mạnh dạn kể với người lớn tin cậy, em không có lỗi", "Nên im lặng vì chắc chắn sẽ bị phạt", "Đó là lỗi của em", "Trẻ em bị xâm hại không bao giờ có lỗi; người lớn có trách nhiệm bảo vệ em."],
    ["Em nên làm gì để an toàn khi đi học về?", "Đi theo tuyến đường quen thuộc, đi cùng bạn, không la cà, về nhà đúng giờ", "Đi đường tắt vắng vẻ một mình", "Đi theo người lạ rủ đi đường khác", "Báo cho bố mẹ biết em đã về đến nhà."],
    ["Người lớn nào em có thể tin cậy để kể chuyện khó nói?", "Bố mẹ, ông bà, thầy cô giáo, cô chú thân thiết trong gia đình", "Bất kì người lạ nào hứa giúp đỡ", "Người quen qua mạng chưa từng gặp", "Hãy nhớ ít nhất hai người lớn tin cậy để tìm đến khi cần."],
    ["Khi thay đồ bơi ở bể bơi công cộng, quy tắc an toàn nào là đúng?", "Thay đồ trong phòng thay riêng, không để ai nhìn hay chụp ảnh mình", "Thay đồ ở chỗ đông người cho nhanh", "Nhờ người lạ trông đồ và chụp ảnh giúp", "Phòng thay đồ là không gian riêng tư cần được mọi người tôn trọng."],
    ["Một người quen đề nghị chụp “ảnh bí mật” của em và dặn không nói với bố mẹ. Em làm gì?", "Từ chối ngay và kể lại với bố mẹ hoặc thầy cô", "Đồng ý nếu họ hứa không đăng lên mạng", "Chỉ kể cho bạn thân của mình", "Mọi “bí mật” liên quan đến cơ thể và hình ảnh của em đều phải nói với người lớn."],
    ["Dấu hiệu nào cho thấy một yêu cầu là KHÔNG an toàn đối với em?", "Yêu cầu em giữ bí mật với bố mẹ và làm em sợ, khó chịu", "Yêu cầu em làm bài tập về nhà", "Yêu cầu em giúp bố mẹ việc nhà", "Cảm giác sợ hãi, khó chịu là tín hiệu cảnh báo quan trọng cần lắng nghe."],
    ["Khi bị lạc ở nơi công cộng đông người, em nên tìm ai để nhờ giúp đỡ?", "Chú công an, bảo vệ hoặc nhân viên đang làm việc tại nơi đó", "Bất kì người lạ nào đi ngang qua", "Tự mình đi tìm đường thật xa", "Người mặc đồng phục, làm việc tại chỗ thường đáng tin cậy hơn."],
    ["Số lạ tự xưng là thầy cô nhắn tin yêu cầu em gửi ảnh cá nhân. Em làm gì?", "Không gửi ảnh, kiểm chứng lại với thầy cô thật và bố mẹ", "Gửi ngay vì sợ bị trừ điểm", "Hỏi lại vài câu rồi gửi ảnh", "Kẻ xấu có thể mạo danh người quen để lừa gạt trẻ em."],
    ["Em nên ghi nhớ những số điện thoại nào để phòng trường hợp khẩn cấp?", "Số của bố mẹ, người thân và các số 111, 113, 115", "Chỉ cần nhớ số điện thoại của bạn thân", "Không cần ghi nhớ số nào cả", "Thuộc số điện thoại của bố mẹ giúp em liên lạc được khi không có máy riêng."],
    ["Người lạ trong trò chơi trực tuyến xin địa chỉ nhà để “gửi quà”. Em nên làm gì?", "Không cho địa chỉ, thoát khỏi cuộc trò chuyện và kể với bố mẹ", "Cho địa chỉ của trường thay thế", "Cho địa chỉ của nhà hàng xóm", "Những món quà hứa hẹn trên mạng có thể là cái bẫy của kẻ xấu."],
    ["Ngoài bố mẹ và thầy cô, em có thể tin cậy kể chuyện khó nói với ai?", "Ông bà, cô chú thân thiết trong gia đình", "Bất kì người lạ nào hứa sẽ giúp đỡ", "Người chỉ mới quen qua mạng", "Hãy nhớ ít nhất hai người lớn tin cậy để tìm đến khi cần giúp đỡ."],
    ["Nếu em lỡ giữ một “bí mật xấu” một thời gian, điều đúng nhất cần làm là gì?", "Vẫn kể lại ngay với người lớn tin cậy để được giúp đỡ", "Giữ kín mãi mãi vì đã trót lỡ", "Chỉ biết mong là không sao", "Nói ra không bao giờ là muộn để em được bảo vệ an toàn."],
    ["Khi cảm thấy có người lạ bám theo trên đường về nhà, em nên làm gì ngay?", "Đi vào cửa hàng hoặc nhà dân gần nhất và gọi điện cho bố mẹ", "Rẽ vào ngõ vắng để cắt đuôi", "Quay lại hỏi thẳng người đó muốn gì", "Nơi đông người và có người lớn sẽ giúp em được an toàn."],
  ], [["Vùng riêng tư", "Vùng đồ bơi che phủ"], ["Nói KHÔNG", "Từ chối dứt khoát"], ["Tổng đài 111", "Bảo vệ trẻ em"], ["Người lớn tin cậy", "Bố mẹ, thầy cô"]], "Nối cho đúng nhé!"),
  topic("dd5-tien", "💰", "Sử dụng tiền hợp lí", "Phân biệt cần và muốn, tiết kiệm, chi tiêu có kế hoạch", [
    ["Em có 50 000 đồng tiền mừng tuổi. Cách sử dụng nào hợp lí nhất?", "Chia một phần để dành tiết kiệm, một phần mua đồ dùng học tập cần thiết", "Mua hết kẹo và đồ chơi ngay", "Cho bạn mượn hết không cần lấy lại", "Chi tiêu hợp lí là cân đối giữa nhu cầu, mong muốn và tiết kiệm."],
    ["Phân biệt “cần” và “muốn”: đồ vật nào thuộc nhóm CẦN?", "Sách vở, bút, cặp sách cho năm học mới", "Đồ chơi theo trào lưu", "Kẹo ngọt ăn vặt mỗi ngày", "“Cần” là thứ thiết yếu; “muốn” là thứ có cũng được, không có cũng không sao."],
    ["Vì sao nên để dành một phần tiền mỗi khi có tiền?", "Để dùng cho việc quan trọng sau này và phòng khi cần thiết", "Để khoe với bạn bè", "Để tiền trong heo đất cho vui", "Tiết kiệm từ nhỏ tạo thói quen tài chính tốt."],
    ["Em rất thích một món đồ chơi đắt tiền. Cách làm đúng là?", "Lên kế hoạch để dành dần, cân nhắc xem có thật cần không", "Đòi bố mẹ mua ngay bằng được", "Lấy tiền tiết kiệm của anh chị", "Nhiều khi sau vài ngày, mong muốn nhất thời cũng qua đi."],
    ["Khi đi mua đồ cùng mẹ, em học được điều gì về sử dụng tiền?", "So sánh giá, chọn đồ vừa chất lượng vừa vừa túi tiền, không mua thừa thãi", "Cứ chọn đồ đắt nhất là tốt nhất", "Mua càng nhiều càng tốt", "Mua sắm thông minh giúp gia đình tiết kiệm và tránh lãng phí."],
    ["Việc ghi chép những khoản đã chi tiêu giúp em điều gì?", "Biết tiền đã dùng vào đâu, tránh chi tiêu lãng phí", "Không giúp gì cả", "Chỉ làm tốn thời gian", "Sổ chi tiêu nhỏ giúp em quản lí tiền của mình."],
    ["Bạn rủ em góp tiền mua đồ chơi chung của nhóm. Em nên xử lí thế nào?", "Hỏi rõ giá tiền, cân nhắc khả năng của mình và thoả thuận rõ ràng với bạn", "Góp hết tiền mình có cho xong", "Từ chối mọi hoạt động của nhóm", "Thoả thuận rõ ràng giúp tránh hiểu lầm về tiền bạc giữa bạn bè."],
    ["Hành động nào là LÃNG PHÍ tiền bạc?", "Mua nhiều đồ ăn vặt rồi bỏ dở, mua đồ chơi về không chơi", "Mua sách hay để đọc", "Để dành tiền mua xe đạp", "Lãng phí là chi tiền vào thứ không cần thiết, không sử dụng."],
    ["Em được tặng tiền thưởng vì học giỏi. Em dự định dùng vào việc có ích. Việc nào sau đây là hợp lí?", "Mua sách tham khảo, ủng hộ một phần cho quỹ giúp bạn khó khăn", "Mua hết đồ chơi điện tử", "Tiêu hết trong một ngày", "Dùng tiền có ý nghĩa giúp em vui và trưởng thành hơn."],
    ["Câu tục ngữ nào khuyên ta tiết kiệm, phòng xa?", "“Tích tiểu thành đại.”", "“Tiêu tiền như nước.”", "“Được đồng nào xào đồng ấy.”", "Góp nhặt từng ít một lâu ngày sẽ thành khoản lớn."],
    ["Vì sao không nên vay mượn tiền của bạn để mua đồ ăn vặt?", "Vay mượn vì thứ không cần thiết dễ thành thói quen xấu, mất tự chủ về tiền", "Vì bạn sẽ không cho vay", "Vì đồ ăn vặt không ngon", "Chỉ vay mượn khi thật cần thiết và phải trả đúng hẹn."],
    ["Bố mẹ cho em tiền ăn sáng cả tuần. Cách quản lí nào tốt?", "Chia đều cho từng ngày, ăn đủ chất, không tiêu hết vào ngày đầu", "Tiêu hết ngày đầu, những ngày sau nhịn", "Mua kẹo thay cho bữa sáng", "Ăn sáng đầy đủ giúp em học tập tỉnh táo, khoẻ mạnh."],
    ["“Quỹ đen” (giấu tiền riêng không cho bố mẹ biết) để mua thứ bị cấm — thái độ đúng là?", "Không nên; việc chi tiêu của trẻ em cần có sự đồng ý, hướng dẫn của bố mẹ", "Rất tốt, tự do chi tiêu", "Ai cũng nên có", "Sự minh bạch với bố mẹ giúp em tránh được những việc chi tiêu sai lầm."],
    ["Em có 20 000 đồng tiêu vặt. Thứ tự ưu tiên chi tiêu hợp lí là gì?", "Việc cần thiết trước, để dành tiết kiệm, rồi mới đến thứ mình muốn", "Mua đồ chơi mình thích trước tiên", "Tiêu hết ngay rồi tính sau", "Ưu tiên “cần” trước “muốn” là nguyên tắc chi tiêu khôn ngoan."],
    ["“Tiền tiêu vặt” nên được quản lí như thế nào?", "Chia theo ngày hoặc theo mục đích, tránh tiêu vượt kế hoạch", "Có bao nhiêu thì tiêu hết bấy nhiêu", "Vay thêm tiền của bạn khi đã hết", "Quản lí tốt khoản tiền nhỏ là nền tảng để quản lí tiền lớn sau này."],
    ["Một món đồ đang giảm giá mạnh nhưng em không thật sự cần. Em nên làm gì?", "Cân nhắc kĩ, không cần thì không mua dù giá rẻ", "Mua ngay kẻo hết đợt giảm giá", "Mua thật nhiều để dành bán lại", "Mua thứ không cần với giá rẻ thì vẫn là lãng phí."],
    ["Để dành 5 000 đồng mỗi tuần, sau 10 tuần em sẽ có bao nhiêu?", "50 000 đồng", "15 000 đồng", "500 000 đồng", "5 000 × 10 = 50 000. Tiết kiệm đều đặn sẽ tạo thành khoản tiền đáng kể."],
    ["Vì sao không nên khoe khoang số tiền mình có với bạn bè?", "Dễ gây so bì, mất đoàn kết và không an toàn cho bản thân", "Vì tiền đem khoe ra sẽ bị mất giá trị", "Hoàn toàn không có lí do gì", "Khiêm tốn trong chuyện tiền bạc giúp tình bạn luôn trong sáng."],
    ["Trước khi trả tiền mua một món đồ, em nên kiểm tra điều gì?", "Giá tiền, chất lượng và hạn sử dụng nếu là thực phẩm", "Chỉ cần nhìn bao bì có đẹp không", "Không cần kiểm tra bất cứ điều gì", "Người mua hàng thông minh luôn kiểm tra kĩ trước khi trả tiền."],
    ["Em vô tình làm vỡ đồ dùng của trường và phải bồi thường. Thái độ đúng là gì?", "Nhận trách nhiệm, xin lỗi và bàn với bố mẹ cách giải quyết", "Đổ lỗi cho bạn khác để khỏi phải đền", "Giấu kín không cho ai biết", "Chịu trách nhiệm về hành vi của mình là đức tính đáng quý."],
    ["“Chi tiêu có kế hoạch” được hiểu là gì?", "Quyết định trước sẽ dùng tiền vào việc gì và trong giới hạn bao nhiêu", "Tiêu tiền xong rồi mới ghi chép lại", "Chỉ mua đồ vào những ngày khuyến mãi", "Có kế hoạch chi tiêu giúp em làm chủ được đồng tiền của mình."],
    ["Cho bạn vay tiền ăn sáng liên tục nhiều ngày liền có nên không?", "Không nên thành thói quen; nên khuyên bạn nói với bố mẹ và thầy cô", "Cho vay càng nhiều thì càng quý bạn", "Thu thêm tiền lãi khi cho bạn vay", "Giúp bạn đúng cách là hướng bạn đến sự hỗ trợ của người lớn."],
    ["Gửi tiền vào heo đất khác với gửi ngân hàng ở điểm nào dễ thấy nhất?", "Heo đất ở nhà tiện để dành tiền nhỏ; ngân hàng an toàn hơn và có lãi", "Hoàn toàn không khác nhau ở điểm nào", "Heo đất cho lãi cao hơn ngân hàng", "Nhiều ngân hàng có chương trình tiết kiệm dành cho thiếu nhi cùng bố mẹ."],
  ], [["Cần", "Thứ thiết yếu (sách vở, thức ăn)"], ["Muốn", "Thứ thích nhưng không thiết yếu"], ["Tiết kiệm", "Để dành một phần tiền"], ["Tích tiểu thành đại", "Góp ít thành nhiều"]], "Nối cho đúng nhé!")
];
/* ================= TIN HỌC 5 ================= */
var TIN5_TOPICS = [
  (function () { var kp = knowledgePools([
      ["Máy tính có thể giúp em làm những việc gì?", "Học tập, soạn thảo, vẽ, tính toán, tìm thông tin", "Chỉ để chơi trò chơi", "Không giúp ích gì cho học sinh", "Máy tính là công cụ đa năng phục vụ học tập và đời sống."],
      ["Để máy tính làm được việc, con người cần làm gì?", "Tạo ra chương trình (phần mềm) để điều khiển máy tính", "Máy tính tự biết mọi việc", "Chỉ cần cắm điện là đủ", "Chương trình do con người viết ra hướng dẫn máy tính thực hiện công việc."],
      ["Làm việc nhóm với sự trợ giúp của máy tính có lợi ích gì?", "Cùng soạn thảo, chia sẻ tài liệu dù ở xa nhau", "Mỗi người làm riêng không cần trao đổi", "Máy tính thay thế hoàn toàn các bạn trong nhóm", "Các công cụ trực tuyến giúp nhóm học tập hiệu quả hơn."],
      ["Khi dùng máy tính học tập, em nên giữ tư thế và thời gian thế nào?", "Ngồi thẳng lưng, giữ khoảng cách mắt, nghỉ sau một lúc", "Ngồi càng gần màn hình càng tốt", "Dùng máy tính liên tục nhiều giờ không nghỉ", "Giữ gìn sức khoẻ mắt và cột sống khi dùng máy tính rất quan trọng."],
      ["Thiết bị nào là thiết bị VÀO của máy tính?", "Bàn phím, chuột, máy quét", "Màn hình, loa", "Máy in", "Thiết bị vào đưa thông tin vào máy tính để xử lí."],
      ["Thiết bị nào là thiết bị RA của máy tính?", "Màn hình, máy in, loa", "Bàn phím, chuột", "Ổ cứng", "Thiết bị ra đưa thông tin đã xử lí ra ngoài cho người dùng."],
      ["Bộ phận nào được coi là “bộ não” của máy tính?", "Bộ xử lí trung tâm (CPU)", "Màn hình", "Bàn phím", "CPU xử lí mọi thông tin, phép tính trong máy tính."],
      ["Thông tin trong máy tính được lưu trữ lâu dài ở đâu?", "Ổ cứng, USB, thẻ nhớ", "Chỉ ở màn hình", "Trong con chuột", "Tắt máy, dữ liệu trên bộ nhớ lưu trữ vẫn còn."],
      ["Việc sao lưu (backup) dữ liệu có ích gì?", "Phòng khi máy hỏng hoặc mất dữ liệu vẫn còn bản dự phòng", "Làm máy chạy chậm hơn", "Không có ích gì", "Bài tập, tài liệu quan trọng nên được sao lưu thường xuyên."],
      ["Phần mềm nào giúp em soạn thảo văn bản?", "Microsoft Word, WPS Writer...", "Phần mềm nghe nhạc", "Trình duyệt web", "Mỗi phần mềm phục vụ một mục đích khác nhau."],
      ["Khi máy tính bị treo, không thao tác được, em nên làm gì?", "Bình tĩnh, nhờ người lớn hướng dẫn, tránh tắt nguồn đột ngột", "Đập vào màn hình", "Rút điện thật nhanh nhiều lần", "Xử lí sự cố cần bình tĩnh và đúng cách."],
      ["Theo em, điều gì là giới hạn của máy tính?", "Chỉ làm theo chương trình, không tự suy nghĩ như người", "Máy tính làm được mọi việc", "Máy tính không cần điện", "Con người sáng tạo chương trình — máy tính thực thi chính xác, nhanh chóng."],
      ["Sử dụng máy tính bao lâu mỗi buổi là hợp lí với học sinh tiểu học?", "Khoảng 20–30 phút rồi nghỉ, vận động, nhìn xa", "Càng lâu càng tốt", "Suốt cả ngày không nghỉ", "Quy tắc nghỉ ngơi giúp bảo vệ mắt và sức khoẻ."],
      ["Một máy tính để bàn cơ bản gồm những bộ phận nào?", "Màn hình, thân máy, bàn phím và chuột", "Chỉ có màn hình và loa", "Chỉ có bàn phím", "Các bộ phận được nối với nhau tạo thành một hệ thống hoàn chỉnh."],
      ["Bộ nhớ RAM của máy tính có vai trò gì?", "Lưu tạm dữ liệu khi máy đang chạy, tắt máy là mất", "Lưu trữ dữ liệu vĩnh viễn nhiều năm", "Hiển thị hình ảnh lên màn hình", "RAM càng lớn, máy càng chạy được nhiều chương trình cùng lúc mượt mà."],
      ["Thiết bị nào vừa là thiết bị vào, vừa là thiết bị ra?", "Màn hình cảm ứng", "Máy in", "Bàn phím rời", "Màn hình cảm ứng vừa hiển thị thông tin, vừa nhận lệnh bằng chạm tay."],
      ["Hệ điều hành của máy tính có nhiệm vụ gì?", "Quản lí phần cứng và các phần mềm khác (ví dụ Windows)", "Dùng để vẽ tranh", "Dùng để soạn thảo văn bản", "Hệ điều hành là phần mềm nền tảng không thể thiếu của máy tính."],
      ["Khi làm việc nhóm trực tuyến, quy tắc ứng xử nào là đúng?", "Lắng nghe, chờ đến lượt phát biểu và tắt micro khi không nói", "Nói chen vào bất cứ lúc nào mình muốn", "Tắt camera rồi đi làm việc riêng", "Ứng xử văn minh trên mạng thể hiện một học sinh ngoan."],
      ["Dùng USB lạ cắm vào máy tính cần lưu ý điều gì?", "Quét virus trước khi mở tệp, rút USB đúng cách an toàn", "Cắm mọi USB lạ vào máy ngay lập tức", "Cho người lạ mượn USB của mình tuỳ ý", "USB lạ có thể chứa mã độc làm hại máy tính và dữ liệu."],
      ["“Dữ liệu” trong máy tính được hiểu là gì?", "Thông tin lưu dưới dạng số: chữ, số, hình, âm thanh", "Chỉ là các con số khô khan", "Là phần cứng bằng kim loại của máy", "Mọi hoạt động của em trên máy tính đều tạo ra dữ liệu."],
      ["Máy tính giúp bạn học sinh khiếm thị học tập bằng cách nào?", "Phần mềm đọc màn hình chuyển chữ viết thành tiếng nói", "Máy tính không giúp được gì", "Chỉ cần phóng to chữ là đủ", "Công nghệ hỗ trợ giúp mọi người đều được học tập bình đẳng."],
      ["Khi hai bạn cùng chỉnh sửa một tài liệu trực tuyến, lợi ích là gì?", "Thấy thay đổi của nhau ngay, tiết kiệm thời gian", "Dễ làm mất tài liệu hơn làm riêng", "Hoàn toàn không khác gì làm riêng", "Cộng tác trực tuyến là kĩ năng quan trọng trong thời đại số."],
      ["Máy tính bảng khác máy tính để bàn ở điểm nổi bật nào?", "Nhỏ gọn, có màn hình cảm ứng và dễ mang theo", "Mạnh hơn máy để bàn ở mọi mặt", "Không bao giờ cần sạc pin", "Mỗi loại thiết bị phù hợp với những nhu cầu sử dụng khác nhau."],
      ["Phần cứng của máy tính là gì?", "Các bộ phận vật lí chạm được: màn hình, bàn phím, chuột", "Các chương trình cài trong máy", "Các tệp tin và thư mục", "Phần cứng gồm thân máy, màn hình, bàn phím, chuột...; phần mềm là các chương trình."],
      ["Phần mềm của máy tính là gì?", "Các chương trình giúp máy thực hiện công việc", "Các bộ phận bằng kim loại", "Dây điện và ổ cắm", "Ví dụ phần mềm: Word, Paint, Scratch, trình duyệt web."],
      ["Máy tính giúp em học trực tuyến bằng cách nào?", "Học qua video bài giảng, lớp học trực tuyến", "Tự làm bài tập thay cho em", "Không giúp được việc học trực tuyến", "Học trực tuyến cần có Internet và sự hướng dẫn của thầy cô, bố mẹ."],
      ["Thiết bị nào giúp em nghe âm thanh từ máy tính?", "Tai nghe, loa", "Máy in", "Máy quét", "Loa và tai nghe là thiết bị ra âm thanh."],
      ["Thiết bị nào giúp em đưa tài liệu giấy vào máy tính?", "Máy quét (scanner)", "Loa", "Màn hình", "Máy quét biến tài liệu giấy thành tệp trong máy tính."],
      ["Máy in có chức năng gì?", "In văn bản, hình ảnh từ máy tính ra giấy", "Đưa thông tin vào máy tính", "Lưu trữ dữ liệu lâu dài", "Máy in là thiết bị ra thông tin."],
      ["Khi gõ bàn phím, em nên ngồi và đặt tay thế nào?", "Ngồi thẳng, cổ tay thoải mái, mắt nhìn màn hình", "Cúi sát vào bàn phím", "Đứng gõ cho nhanh", "Tư thế đúng giúp em tránh mỏi mắt, đau lưng."],
      ["Máy tính xách tay (laptop) có đặc điểm gì nổi bật?", "Nhỏ gọn, có pin, mang theo được", "Phải cắm điện liên tục như ti vi", "Không có bàn phím", "Laptop tích hợp màn hình, bàn phím và pin trong một thân máy."],
      ["Em liên lạc với bạn ở xa bằng máy tính qua cách nào?", "Gửi thư điện tử (email), nhắn tin, gọi video", "Chỉ viết thư giấy gửi bưu điện", "Không liên lạc được bằng máy tính", "Internet giúp việc liên lạc ở xa trở nên nhanh chóng."],
      ["Bộ phận nào hiển thị kết quả làm việc cho em thấy?", "Màn hình", "Ổ cứng", "Nguồn điện", "Màn hình là thiết bị ra hiển thị hình ảnh, chữ."],
      ["Chuột máy tính giúp em làm gì?", "Di chuyển con trỏ và chọn lệnh trên màn hình", "Gõ chữ vào văn bản", "Phát ra âm thanh", "Nhấn chuột để chọn, kéo thả để di chuyển đối tượng."],
      ["Muốn máy tính nghe được giọng nói của em, cần thiết bị nào?", "Micro (micrô)", "Máy in", "Ổ USB", "Micro là thiết bị vào thu âm thanh."],
      ["Webcam trên máy tính dùng để làm gì?", "Quay hình ảnh của em khi học, họp trực tuyến", "In tài liệu ra giấy", "Lưu trữ tệp tin", "Webcam giúp em xuất hiện trong các buổi học trực tuyến."],
      ["Tắt máy tính đúng cách là làm thế nào?", "Chọn lệnh tắt máy (Shut down) trong hệ điều hành", "Rút phích điện đột ngột", "Đóng mạnh nắp máy khi đang chạy", "Tắt máy đúng cách giúp dữ liệu không bị mất, máy bền hơn."],
      ["Khi làm việc nhóm trên máy tính, mỗi thành viên nên làm gì?", "Làm phần việc được phân công và chia sẻ kết quả", "Để một bạn làm hết mọi việc", "Không cần trao đổi với nhóm", "Phân công rõ ràng giúp công việc nhóm hiệu quả, công bằng."],
      ["Máy tính có thay thế hoàn toàn thầy cô, bạn bè trong học tập không?", "Không, máy tính chỉ là công cụ hỗ trợ học tập", "Có, không cần đến trường nữa", "Có, máy tính biết mọi thứ", "Học tập cần sự tương tác với thầy cô và bạn bè."],
      ["Sử dụng máy tính xong, em nên làm gì với nơi học tập?", "Sắp xếp gọn gàng, tắt máy, để thiết bị đúng chỗ", "Để nguyên mọi thứ bừa bộn", "Vứt chuột và bàn phím xuống sàn", "Thói quen gọn gàng giúp thiết bị bền và nơi học tập sạch đẹp."],
    ], [["Bàn phím, chuột", "Thiết bị vào"], ["Màn hình, loa", "Thiết bị ra"], ["CPU", "“Bộ não” máy tính"], ["Ổ cứng, USB", "Lưu trữ dữ liệu"], ["RAM", "Lưu tạm dữ liệu khi máy chạy"], ["Máy in", "In văn bản, hình ảnh ra giấy"], ["Máy quét", "Đưa tài liệu giấy vào máy"], ["Hệ điều hành", "Quản lí phần cứng và phần mềm"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước MỞ MÁY TÍNH VÀ BẮT ĐẦU HỌC theo đúng thứ tự!", ["Bật máy tính và chờ khởi động", "Mở phần mềm hoặc trang học tập", "Ngồi đúng tư thế và học bài", "Tắt máy đúng cách khi học xong"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các bước SAO LƯU (backup) một bài làm quan trọng!", ["Mở thư mục chứa bài làm", "Sao chép tệp bài làm", "Dán vào USB hoặc thư mục dự phòng", "Kiểm tra lại bản sao đã lưu"]); });
    return { id: "tin5-may", emoji: "🖥️", name: "Em có thể làm gì với máy tính?", sub: "Khả năng của máy tính • Tạo chương trình • Làm việc nhóm với máy tính", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Mạng Internet giúp em tìm kiếm thông tin như thế nào?", "Dùng trình duyệt, gõ từ khoá vào công cụ tìm kiếm", "Phải đến thư viện mới có thông tin", "Hỏi máy tính bằng miệng là xong", "Từ khoá rõ ràng giúp tìm được thông tin đúng nhanh hơn."],
      ["Từ khoá tìm kiếm tốt là từ khoá thế nào?", "Ngắn gọn, đúng trọng tâm nội dung cần tìm", "Càng dài, càng lan man càng tốt", "Không liên quan đến nội dung", "Ví dụ cần tìm “cách chăm sóc cây hoa hồng” thay vì gõ một câu hỏi dài."],
      ["Website (trang web) là gì?", "Trang thông tin trên Internet, có địa chỉ riêng để truy cập", "Một phần mềm cài trong máy in", "Một loại bàn phím", "Địa chỉ trang web thường bắt đầu bằng www. hoặc https://."],
      ["Khi tìm thông tin cho bài tập, em nên chọn trang web thế nào?", "Trang giáo dục, báo chí uy tín; đối chiếu nhiều nguồn", "Bất kì trang nào hiện lên đầu tiên", "Trang không rõ nguồn gốc", "Thông tin trên mạng có đúng, có sai — cần biết chọn lọc."],
      ["Cây thư mục là gì?", "Tổ chức thư mục theo cấp: thư mục lớn chứa thư mục con", "Một loại cây trong vườn trường", "Sơ đồ lớp học", "Cây thư mục giúp em tìm lại tệp nhanh chóng."],
      ["Trong cây thư mục, thư mục “Lớp 5” chứa thư mục “Toán” và “Tiếng Việt”. Thư mục “Toán” là gì của “Lớp 5”?", "Thư mục con", "Thư mục cha ở cấp cao nhất", "Một tệp tin", "Thư mục con nằm trong thư mục lớn hơn (thư mục gốc/cha)."],
      ["Để tìm một bài làm đã lưu, cách làm hiệu quả là gì?", "Mở theo cây thư mục đã lưu hoặc dùng chức năng tìm kiếm", "Mở lần lượt mọi tệp trong máy", "Nhờ bạn tìm hộ trong máy của bạn", "Tổ chức thư mục khoa học ngay từ đầu giúp tiết kiệm thời gian."],
      ["Khi dùng thông tin tìm được trên mạng vào bài làm, em nên làm gì?", "Ghi rõ nguồn thông tin đã tham khảo", "Coi như ý của mình, không cần ghi nguồn", "Sao chép nguyên văn cả bài dài", "Trích dẫn nguồn là thái độ học thuật trung thực."],
      ["Thông tin cá nhân nào KHÔNG nên đăng công khai trên Internet?", "Địa chỉ nhà, số điện thoại, mật khẩu, ảnh riêng tư", "Tên một cuốn sách hay", "Môn học yêu thích", "Bảo vệ thông tin cá nhân là kĩ năng an toàn số quan trọng."],
      ["Em thấy một thông tin giật gân trên mạng chưa rõ đúng sai. Em nên làm gì?", "Kiểm chứng ở nguồn uy tín, hỏi thầy cô, không chia sẻ vội", "Chia sẻ ngay cho mọi người", "Tin ngay vì nhiều người chia sẻ", "Tin giả lan truyền nhanh — người dùng thông minh phải biết kiểm chứng."],
      ["Trình duyệt web là phần mềm dùng để làm gì?", "Truy cập và xem trang web trên Internet (Chrome, Cốc Cốc)", "Vẽ tranh", "Nghe nhạc offline", "Muốn mở trang web, em cần trình duyệt và kết nối Internet."],
      ["Khi tìm kiếm xong, em nên chọn kết quả thế nào để đọc?", "Kết quả đúng nội dung cần tìm, từ nguồn đáng tin cậy", "Kết quả quảng cáo đầu tiên", "Kết quả có nhiều chữ “sốc, giật gân”", "Đọc lướt mô tả trước khi nhấn vào giúp chọn đúng trang cần thiết."],
      ["Việc đặt tên tệp rõ ràng (VD: “Bai-tap-Toan-tuan5”) giúp ích gì?", "Dễ nhận biết và tìm lại tệp khi cần", "Làm tệp nặng hơn", "Không có tác dụng gì", "Tên tệp có ý nghĩa là bước đầu của quản lí tệp khoa học."],
      ["Muốn tìm hình ảnh “hoa sen” cho bài tập, em làm thế nào?", "Vào mục tìm kiếm hình ảnh và gõ từ khoá “hoa sen”", "Gõ từ khoá vào phần mềm vẽ tranh", "Tìm trong thùng rác của máy tính", "Công cụ tìm kiếm có riêng chế độ tìm hình ảnh và video."],
      ["Đặt cụm từ trong dấu ngoặc kép khi tìm kiếm có tác dụng gì?", "Tìm đúng cụm từ đó theo đúng thứ tự", "Làm cho từ khoá dài thêm vô ích", "Hoàn toàn không có tác dụng gì", "Ví dụ tìm “cách mạng tháng Tám” sẽ cho kết quả chính xác hơn."],
      ["Thư mục ở cấp cao nhất trong cây thư mục được gọi là gì?", "Thư mục gốc (thư mục cha lớn nhất)", "Thư mục con nhỏ nhất", "Một tệp tin đặc biệt", "Ổ đĩa như C: hay D: thường là cấp cao nhất trong cây thư mục."],
      ["Bài vẽ được lưu trong thư mục “Mĩ thuật” nằm trong thư mục “Lớp 5”. Đường dẫn đúng là?", "Lớp 5 → Mĩ thuật → tên tệp bài vẽ", "Tên tệp → Lớp 5 → Mĩ thuật", "Mĩ thuật → Lớp 5 → tên tệp", "Đường dẫn cho biết vị trí chính xác của tệp trong máy tính."],
      ["Kết quả tìm kiếm có ghi chữ “Quảng cáo” ở đầu thường là gì?", "Trang trả tiền để hiện đầu, cần cân nhắc khi chọn", "Luôn là trang uy tín nhất", "Là trang web của nhà trường", "Hãy ưu tiên các kết quả tự nhiên đến từ nguồn đáng tin cậy."],
      ["Dấu hiệu nào cho thấy một trang web đáng tin cậy?", "Có tổ chức, tác giả rõ ràng, khớp sách báo chính thống", "Tiêu đề giật gân, nhiều lỗi chính tả", "Không ghi nguồn gốc ở đâu cả", "Biết kiểm chứng thông tin là kĩ năng quan trọng của người dùng mạng."],
      ["Sắp xếp tệp theo “thời gian sửa đổi” giúp ích gì cho em?", "Tìm nhanh được tệp vừa làm gần đây nhất", "Làm cho tệp nhẹ đi nhiều", "Hoàn toàn không có tác dụng", "Máy tính cho phép sắp xếp tệp theo tên, loại, ngày tháng và dung lượng."],
      ["Bạn gửi cho em một đường liên kết lạ hứa tặng quà miễn phí. Em nên làm gì?", "Không nhấn vào và báo với người lớn vì có thể là lừa đảo", "Nhấn vào ngay để nhận quà", "Gửi tiếp đường liên kết cho nhiều bạn", "Liên kết lạ là cách kẻ xấu đánh cắp thông tin rất phổ biến."],
      ["Tìm kiếm bằng giọng nói tiện lợi ở điểm nào?", "Không cần gõ phím, chỉ cần nói từ khoá cho máy tìm", "Kết quả luôn đúng một trăm phần trăm", "Không cần kết nối Internet", "Nói rõ ràng và chậm rãi giúp máy nhận đúng từ khoá của em."],
      ["Để tránh mở nhầm trang web xấu khi tìm kiếm, em nên làm gì?", "Xem trước địa chỉ, mô tả; ưu tiên trang giáo dục", "Nhấn vào kết quả đầu tiên thật nhanh", "Mở tất cả các kết quả cùng một lúc", "Đuôi tên miền như .edu.vn hay .gov.vn gợi ý loại trang web."],
      ["Công cụ tìm kiếm (như Google) giúp em điều gì?", "Tìm trang web theo từ khoá em gõ vào", "Tự viết bài tập cho em", "Lưu trữ mọi tệp trong máy", "Gõ từ khoá, công cụ tìm kiếm sẽ liệt kê các trang liên quan."],
      ["Khi tìm thông tin để giải quyết một vấn đề, bước đầu tiên là gì?", "Xác định rõ em cần tìm thông tin gì", "Mở ngay trang web đầu tiên thấy được", "Hỏi bạn bè đoán hộ", "Biết rõ mình cần gì mới chọn được từ khoá đúng."],
      ["Từ khoá nào tốt để tìm thông tin về đời sống của hổ?", "“đời sống của hổ”", "“con vật”", "Một đoạn văn thật dài bất kì", "Từ khoá càng cụ thể, kết quả càng đúng ý."],
      ["Em cần nghe bài hát “Đi học”. Em gõ từ khoá nào?", "Tên bài hát “Đi học” kèm chữ “nghe nhạc”", "Chữ “bài hát” chung chung", "Tên của em", "Kết hợp tên riêng với loại nội dung giúp tìm nhanh, đúng."],
      ["Tìm thông tin trên website của trường học có lợi ích gì?", "Thông tin chính xác, do nhà trường đăng tải", "Toàn là quảng cáo bán hàng", "Không khác gì trang vô danh", "Website của trường đăng thông báo, lịch học đáng tin cậy."],
      ["Thư mục (folder) dùng để làm gì?", "Chứa và sắp xếp các tệp, thư mục con", "Vẽ tranh trên máy tính", "Phát nhạc và video", "Thư mục giống như ngăn tủ để đựng tài liệu gọn gàng."],
      ["Tệp (file) là gì?", "Một bài làm, bức tranh hay bản nhạc được lưu trong máy", "Một thư mục lớn chứa nhiều thư mục", "Một phím trên bàn phím", "Mỗi tệp có tên và phần mở rộng cho biết loại tệp."],
      ["Muốn tạo thư mục mới trong máy tính, em làm thế nào?", "Nhấn chuột phải, chọn lệnh tạo thư mục mới", "Ném tệp ra ngoài màn hình nền", "Tắt máy tính rồi mở lại", "Đặt tên thư mục rõ ràng ngay khi tạo."],
      ["Đặt tên tệp rõ ràng, dễ hiểu giúp ích gì ngoài việc tìm lại nhanh?", "Tránh nhầm lẫn giữa các bài làm với nhau", "Làm tệp nhẹ đi rất nhiều", "Không có thêm tác dụng gì", "Tên như “Bai-tap-Toan-tuan5” rõ ràng hơn “Tai-lieu-1”."],
      ["Khi xoá tệp, tệp thường được chuyển vào đâu trước?", "Thùng rác (Recycle Bin) để có thể khôi phục", "Biến mất ngay không lấy lại được", "Vào thư mục Âm nhạc", "Chưa dọn thùng rác thì vẫn khôi phục được tệp đã xoá."],
      ["Sao chép (copy) một tệp khác di chuyển (cut) ở điểm nào?", "Copy giữ lại bản gốc, cut thì dời bản gốc đi", "Hai thao tác hoàn toàn giống nhau", "Copy xoá hẳn bản gốc", "Copy là nhân bản; Cut là chuyển đi nơi khác."],
      ["Tìm kiếm tệp trong máy tính bằng cách nào nhanh nhất?", "Gõ tên tệp vào ô tìm kiếm (Search) của máy tính", "Mở từng thư mục bằng tay suốt cả ngày", "Hỏi loa thông minh của nhà bạn", "Gõ một phần tên tệp vào ô tìm kiếm là cách nhanh nhất."],
      ["Hai trang web nói khác nhau về cùng một thông tin. Em nên làm gì?", "Đối chiếu thêm nguồn uy tín, hỏi thầy cô", "Tin trang nào viết dài hơn", "Chọn trang mình thích hơn", "Thông tin cần được kiểm chứng từ nhiều nguồn đáng tin."],
      ["Ghi chép lại thông tin tìm được giúp ích gì?", "Có tư liệu để làm bài và ghi nguồn tham khảo", "Làm bài tập dài thêm vô ích", "Không có ích gì", "Ghi chép và lưu trữ là bước cuối của quá trình tìm kiếm."],
      ["Đường dẫn (path) của tệp cho em biết điều gì?", "Vị trí lưu tệp trong cây thư mục", "Dung lượng của tệp", "Ngày tạo ra tệp", "Ví dụ: Lớp 5 → Tiếng Việt → bài tập là một đường dẫn."],
      ["Sắp xếp thư mục riêng cho từng môn học có lợi ích gì?", "Tìm bài của từng môn nhanh, không lẫn lộn", "Làm máy tính đẹp hơn mà thôi", "Không có lợi ích gì", "Tổ chức khoa học ngay từ đầu là thói quen tốt."],
      ["Khi tìm thông tin làm bài tập nhóm, nhóm em nên làm gì?", "Phân công mỗi bạn tìm một phần, tổng hợp và ghi nguồn", "Một bạn tìm hết, các bạn ngồi chơi", "Chép nguyên văn trang web đầu tiên", "Làm việc nhóm hiệu quả cần phân công và tổng hợp."],
    ], [["Từ khoá", "Từ trọng tâm để tìm kiếm"], ["Trình duyệt web", "Mở các trang web"], ["Cây thư mục", "Thư mục cha chứa thư mục con"], ["Nguồn uy tín", "Trang giáo dục, báo chí chính thống"], ["Thư mục con", "Nằm trong thư mục lớn hơn"], ["Đường dẫn", "Vị trí của tệp trong máy"], ["Ghi nguồn", "Nêu nơi tham khảo thông tin"], ["Thùng rác", "Nơi chứa tạm tệp đã xoá"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước TÌM KIẾM THÔNG TIN trên Internet theo đúng thứ tự!", ["Mở trình duyệt web", "Gõ từ khoá vào ô tìm kiếm", "Đọc và chọn kết quả phù hợp từ nguồn uy tín", "Ghi lại thông tin và nguồn tham khảo"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các bước TỔ CHỨC THƯ MỤC học tập khoa học!", ["Tạo thư mục lớn cho từng môn học", "Tạo thư mục con theo tuần hoặc chủ đề", "Đặt tên tệp bài làm rõ ràng", "Lưu bài làm đúng thư mục của môn"]); });
    return { id: "tin5-timkiem", emoji: "🔎", name: "Tìm kiếm thông tin; cây thư mục", sub: "Tìm kiếm trên website • Tìm kiếm trong giải quyết vấn đề • Cây thư mục", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Bản quyền (quyền tác giả) là gì?", "Quyền của người sáng tạo đối với tác phẩm của mình", "Quyền được sao chép mọi thứ tuỳ ý", "Một loại thuế khi dùng Internet", "Tôn trọng bản quyền là tôn trọng công sức của người sáng tạo."],
      ["Em muốn dùng một bức tranh trên mạng cho bài thuyết trình. Việc làm đúng là gì?", "Ghi rõ nguồn, tác giả; ưu tiên tranh được phép dùng", "Tải về dùng và nhận là tranh của mình", "Xoá tên tác giả cho gọn", "Ghi nguồn là yêu cầu tối thiểu khi sử dụng tác phẩm của người khác."],
      ["Hành vi nào vi phạm bản quyền?", "Sao chép bài văn của bạn và nộp như bài của mình", "Đọc sách ở thư viện rồi tóm tắt bằng lời văn của mình", "Vẽ lại tranh theo phong cách của mình", "Đạo văn là hành vi sai trái nghiêm trọng trong học tập."],
      ["Phần mềm “bẻ khoá” (crack) là gì và có nên dùng không?", "Phần mềm dùng trái phép — không nên dùng, dễ chứa mã độc", "Là phần mềm miễn phí chính hãng", "Là trò chơi phá băng", "Nên dùng phần mềm có bản quyền hoặc phần mềm miễn phí hợp pháp."],
      ["Khi chia sẻ một bài hát, đoạn phim lên mạng xã hội, em cần lưu ý điều gì?", "Tôn trọng bản quyền; không đăng lại tuỳ ý nội dung", "Cứ đăng thoải mái, không ai quản lí", "Đổi tên tác giả thành tên mình", "Mỗi tác phẩm đều thuộc về người (hoặc tổ chức) sáng tạo ra nó."],
      ["Trích dẫn một đoạn ngắn trong sách vào bài làm cần làm gì?", "Để trong dấu ngoặc kép, ghi rõ tên sách và tác giả", "Không cần dấu ngoặc kép và nguồn", "Sửa vài chữ là thành của mình", "Trích dẫn đúng quy định thể hiện sự trung thực."],
      ["Vì sao tôn trọng bản quyền lại quan trọng?", "Khích lệ sáng tạo; đúng pháp luật và đạo đức", "Chỉ là hình thức, không quan trọng", "Để người khác không sáng tạo nữa", "Bản quyền được pháp luật bảo vệ."],
      ["Em chụp được một bức ảnh đẹp dự thi. Một bạn lấy ảnh của em gửi thi thay tên bạn ấy. Việc đó thế nào?", "Sai — đó là chiếm đoạt tác phẩm của người khác", "Bình thường, ảnh ai chụp cũng như nhau", "Tốt, giúp ảnh được nhiều người biết", "Em có quyền yêu cầu bạn gỡ bỏ và đính chính."],
      ["Nội dung nào thường được sử dụng TỰ DO cho học tập (vẫn nên ghi nguồn)?", "Tư liệu sách giáo khoa, thư viện, trang giáo dục", "Đề thi đang diễn ra", "Bài làm của bạn cùng lớp", "Sử dụng tự do không có nghĩa là nhận làm của mình."],
      ["Logo, bài hát, nhân vật truyện nổi tiếng thuộc về ai?", "Thuộc về tác giả hoặc tổ chức sở hữu bản quyền", "Thuộc về mọi người, ai dùng cũng được kể cả để bán hàng", "Không thuộc về ai", "Dùng hình ảnh nổi tiếng để kinh doanh cần được chủ sở hữu cho phép."],
      ["Khi nghe bạn rủ tải phim “lậu” trên trang web lạ, em nên làm gì?", "Từ chối vì vi phạm bản quyền, trang lạ có mã độc", "Tải ngay vì miễn phí", "Rủ thêm nhiều bạn cùng tải", "Xem phim ở kênh chính thống là lựa chọn an toàn, hợp pháp."],
      ["Câu nói nào thể hiện thái độ tôn trọng bản quyền?", "“Mình sẽ ghi rõ tác giả bức tranh trong bài thuyết trình.”", "“Cứ chép về, không ai biết đâu.”", "“Tác giả ở xa, không quan trọng.”", "Trung thực trong học tập bắt đầu từ những việc nhỏ như ghi nguồn."],
      ["Nếu em sáng tạo ra một sản phẩm (bài thơ, tranh vẽ), em mong người khác đối xử thế nào?", "Tôn trọng, ghi tên em khi sử dụng sản phẩm đó", "Tuỳ ý lấy dùng không cần hỏi", "Nhận là của họ", "Đặt mình vào vị trí người sáng tạo giúp em hiểu giá trị của bản quyền."],
      ["Kí hiệu © in trên sách và tranh có nghĩa là gì?", "Tác phẩm đã được bảo hộ bản quyền", "Ai cũng được chép lại tác phẩm tự do", "Là chữ viết tắt tên của tác giả", "Nhìn thấy kí hiệu ©, em càng cần tôn trọng quyền của tác giả."],
      ["Em dùng một bài nhạc có bản quyền trong video đăng công khai có thể gặp điều gì?", "Video có thể bị tắt tiếng hoặc gỡ bỏ vì vi phạm bản quyền", "Không gặp vấn đề gì cả", "Video sẽ được nhiều người xem hơn", "Nên chọn nhạc miễn phí bản quyền cho sản phẩm của mình."],
      ["Phần mềm miễn phí hợp pháp (freeware) khác phần mềm “bẻ khoá” ở điểm nào?", "Freeware được tác giả cho phép dùng miễn phí hợp pháp", "Hai loại hoàn toàn giống nhau", "Freeware chính là phần mềm lậu", "Có rất nhiều phần mềm học tập miễn phí và hợp pháp cho học sinh."],
      ["Khi tham khảo ý tưởng trong sách vào bài làm của mình, cách làm đúng là gì?", "Viết lại bằng lời văn của mình và ghi nguồn đã tham khảo", "Chép y nguyên cả đoạn mà không ghi nguồn", "Đổi vài chữ trong đoạn văn cho khác đi", "Tóm tắt và diễn đạt lại cho thấy em thật sự hiểu nội dung."],
      ["Vì sao không nên mua bán sách in lậu (sách giả)?", "Vi phạm bản quyền, chất lượng kém, hại người làm sách", "Chỉ vì sách lậu bán rẻ hơn", "Sách lậu không gây hại gì", "Mua sách thật là cách ủng hộ tác giả và nhà xuất bản."],
      ["“Giấy phép mở” như Creative Commons cho phép người dùng điều gì?", "Dùng tác phẩm theo điều kiện tác giả, thường ghi nguồn", "Sử dụng tuỳ ý mà không cần điều kiện nào", "Cấm mọi hình thức sử dụng tác phẩm", "Nhiều hình ảnh và bản nhạc học tập được chia sẻ theo giấy phép mở."],
      ["Khi sản phẩm nhóm có dùng hình ảnh trên mạng, em nên ghi nguồn ở đâu?", "Ở trang cuối của sản phẩm hoặc chú thích ngay dưới hình ảnh", "Không cần ghi nguồn ở đâu cả", "Ghi trong vở nháp riêng của em", "Danh sách nguồn tham khảo giúp sản phẩm thêm đáng tin cậy."],
      ["Sách giáo khoa em đang học thuộc quyền sở hữu của ai?", "Các tác giả biên soạn và nhà xuất bản", "Riêng mỗi học sinh, muốn sao chép bán lại cũng được", "Không thuộc về bất kì ai", "Tôn trọng sách giáo khoa là tôn trọng công sức của các tác giả."],
      ["Bạn chép nguyên văn bài văn của em rồi nộp cho cô giáo. Hành vi đó là gì?", "Đạo văn, vi phạm sự trung thực và quyền tác giả", "Bạn chỉ đang ham học hỏi", "Là chuyện bình thường trong lớp học", "Sao chép bài của người khác là hành vi sai trái trong học tập."],
      ["Tranh của em bị một bạn chụp lại đăng lên mạng mà không ghi tên em. Việc đó thế nào?", "Sai, vì không tôn trọng tác giả của bức tranh", "Rất tốt, giúp tranh của em nổi tiếng", "Hoàn toàn bình thường, không sao cả", "Hãy luôn ghi tên tác giả khi chia sẻ tác phẩm của người khác."],
      ["Tác giả của một bài thơ là ai?", "Người sáng tác ra bài thơ đó", "Người đọc bài thơ", "Người bán cuốn sách thơ", "Tác giả là người tạo ra tác phẩm."],
      ["Em tự vẽ một bức tranh. Ai là tác giả của bức tranh?", "Chính em", "Bạn ngồi cạnh em", "Cô giáo dạy mĩ thuật", "Người tạo ra tác phẩm là tác giả của tác phẩm đó."],
      ["Khi dùng đoạn nhạc trong video của nhóm, việc làm đúng là gì?", "Chọn nhạc miễn phí bản quyền hoặc ghi nguồn rõ ràng", "Dùng nhạc nổi tiếng tuỳ ý", "Đổi tên bài hát thành tên nhóm", "Nhiều thư viện nhạc miễn phí dành cho học tập."],
      ["“Sao chép nguyên văn mà không ghi nguồn” gọi là gì?", "Đạo văn", "Trích dẫn", "Tóm tắt", "Đạo văn là hành vi bị nghiêm cấm trong học tập."],
      ["Em chụp lại vài trang sách để học thêm ở nhà. Điều này thế nào?", "Được ở mức tham khảo học tập, không sao chép để bán", "Không bao giờ được chạm vào sách", "Sao chép cả cuốn để bán cũng được", "Học tập cá nhân khác với sao chép vì mục đích thương mại."],
      ["Bài tập nhóm có dùng ảnh trên mạng, cuối bài nên có phần nào?", "Danh sách nguồn tham khảo", "Danh sách đồ ăn yêu thích", "Không cần thêm phần nào", "Ghi nguồn giúp bài làm trung thực, đáng tin cậy."],
      ["Phần mềm học tập nào em được dùng miễn phí hợp pháp?", "Phần mềm tác giả cho phép miễn phí (freeware, mã nguồn mở)", "Phần mềm bẻ khoá trên trang lạ", "Phần mềm mua lậu giá rẻ", "Scratch là phần mềm miễn phí cho học sinh học lập trình."],
      ["Bạn đăng video dùng bài hát nổi tiếng lên mạng. Điều gì có thể xảy ra?", "Video có thể bị gỡ hoặc tắt tiếng vì bản quyền", "Được ca sĩ cảm ơn ngay", "Không có chuyện gì xảy ra", "Nền tảng video kiểm tra bản quyền âm nhạc rất chặt chẽ."],
      ["Trích dẫn đúng cách gồm những việc nào?", "Dấu ngoặc kép, ghi tên tác giả và tên tác phẩm", "Chỉ cần chép lại là đủ", "Đổi họ tên tác giả", "Trích dẫn ngắn, đúng nguồn là cách học tập trung thực."],
      ["Bạn dùng tranh của em mà không xin phép. Em nên làm gì?", "Nhắc bạn nhẹ nhàng và yêu cầu ghi tên tác giả", "Giận dữ và xé tranh của bạn", "Mặc kệ, không nói gì", "Ứng xử văn minh giúp cả hai hiểu về tôn trọng bản quyền."],
      ["Sách điện tử hợp pháp khác sách lậu tải trái phép ở điểm nào?", "Được tác giả, nhà xuất bản cho phép phát hành", "Nội dung hoàn toàn khác nhau", "Sách lậu luôn đẹp hơn", "Ủng hộ sách hợp pháp là ủng hộ người làm sách."],
      ["Vì sao các trang cho tải phần mềm lậu thường nguy hiểm?", "Dễ chứa virus, mã độc đánh cắp thông tin", "Vì tải về rất chậm", "Vì giao diện xấu", "Chỉ tải phần mềm từ trang chính thức của nhà phát hành."],
      ["Ảnh có dấu mờ (watermark) của tác giả trên ảnh nghĩa là gì?", "Ảnh thuộc về tác giả, không tự ý sử dụng", "Ảnh bị lỗi khi chụp", "Ảnh ai cũng dùng tự do được", "Dấu mờ là cách tác giả bảo vệ tác phẩm của mình."],
      ["Em sáng tác một bài hát trong lớp nhạc. Bạn muốn hát lại trong hội diễn. Điều đúng là gì?", "Bạn nên xin phép và ghi tên em là tác giả", "Cứ hát và nhận là của nhóm bạn", "Không ai được hát lại", "Tôn trọng tác giả ngay cả khi tác giả là bạn cùng lớp."],
      ["Trước khi đăng ảnh chụp chung với bạn lên mạng, em nên làm gì?", "Hỏi ý kiến bạn có trong ảnh", "Đăng ngay không cần hỏi", "Cắt mặt bạn ra khỏi ảnh", "Hình ảnh của người khác cũng cần được tôn trọng."],
      ["“Tôn trọng bản quyền” thể hiện phẩm chất nào của học sinh?", "Trung thực, tôn trọng công sức của người khác", "Lanh lợi, biết lách luật", "Không thể hiện phẩm chất gì", "Trung thực trong học tập là nền tảng của người học trò tốt."],
      ["Muốn dùng ảnh đẹp cho bài học mà vẫn đúng bản quyền, em chọn cách nào?", "Tìm ảnh miễn phí bản quyền và ghi nguồn", "Lấy ảnh bất kì trên mạng", "Ảnh có dấu © càng nên lấy", "Nhiều kho ảnh miễn phí dành cho giáo dục."],
    ], [["Bản quyền", "Quyền của tác giả với tác phẩm"], ["Đạo văn", "Sao chép rồi nhận là của mình"], ["Ghi nguồn", "Trích dẫn đúng khi tham khảo"], ["Phần mềm có bản quyền", "Dùng hợp pháp, an toàn"], ["Kí hiệu ©", "Tác phẩm được bảo hộ bản quyền"], ["Freeware", "Phần mềm miễn phí hợp pháp"], ["Sách lậu", "In bán trái phép, chất lượng kém"], ["Creative Commons", "Giấy phép mở, ghi nguồn khi dùng"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước TRÍCH DẪN một đoạn văn từ sách vào bài làm!", ["Đọc và hiểu đoạn văn trong sách", "Chép đoạn trích vào dấu ngoặc kép", "Ghi tên tác giả và tên sách", "Kiểm tra lại đoạn trích đúng nguyên văn"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các việc cần làm khi DÙNG ẢNH trên mạng cho bài thuyết trình!", ["Tìm ảnh phù hợp nội dung", "Kiểm tra ảnh có được phép sử dụng không", "Tải ảnh và dùng trong bài", "Ghi tên tác giả và nguồn ảnh ở cuối bài"]); });
    return { id: "tin5-banquyen", emoji: "©️", name: "Bản quyền nội dung thông tin", sub: "Tôn trọng bản quyền khi dùng và chia sẻ thông tin, hình ảnh, phần mềm", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Định dạng kí tự trong văn bản gồm những thao tác nào?", "Chọn phông, cỡ chữ, kiểu chữ và màu chữ", "Chỉ việc gõ chữ vào trang", "In văn bản ra giấy", "Định dạng giúp văn bản rõ ràng, đẹp và dễ đọc."],
      ["Muốn làm nổi bật tiêu đề bài văn, em thường làm gì?", "Đặt tiêu đề ở giữa trang, chữ to hơn và in đậm", "Viết tiêu đề nhỏ nhất", "Không cần tiêu đề", "Tiêu đề nổi bật giúp người đọc nắm được nội dung chính ngay."],
      ["Tổ hợp phím nào dùng để sao chép (copy) đoạn văn bản đã chọn?", "Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + V là dán (paste), Ctrl + X là cắt (cut)."],
      ["Tổ hợp phím nào dùng để DÁN đoạn văn bản đã sao chép?", "Ctrl + V", "Ctrl + C", "Ctrl + A", "Chọn văn bản → Sao chép (Ctrl+C) → đặt con trỏ → Dán (Ctrl+V)."],
      ["Khi chèn hình ảnh vào văn bản, em cần chú ý điều gì?", "Hình liên quan nội dung, kích thước vừa, bố trí hợp lí", "Chèn càng nhiều hình càng tốt", "Hình ảnh che hết chữ cũng được", "Có thể đặt chữ bao quanh hình hoặc hình nằm giữa hai đoạn văn."],
      ["Vì sao cần căn lề và giãn dòng khi soạn thảo?", "Để văn bản ngay ngắn, dễ đọc, trình bày khoa học", "Chỉ để tốn thời gian", "Không có tác dụng gì", "Văn bản trình bày tốt thể hiện sự cẩn thận của người soạn."],
      ["Muốn xoá một đoạn văn bản, em làm thế nào?", "Chọn (bôi đen) đoạn văn rồi nhấn phím Delete hoặc Backspace", "Tắt máy tính đi là xong", "In ra rồi xé bỏ", "Thao tác “chọn” là bước đầu của hầu hết lệnh chỉnh sửa."],
      ["Nút lệnh “Hoàn tác” (Undo) có tác dụng gì?", "Quay lại thao tác vừa làm sai (phím tắt Ctrl + Z)", "Lưu văn bản", "In văn bản", "Hoàn tác giúp sửa sai nhanh khi soạn thảo."],
      ["Khi soạn một bài thơ, em cần chú ý điều gì về trình bày?", "Mỗi câu thơ một dòng, có thể căn giữa trang cho đẹp", "Viết liền thành một đoạn dài", "Không cần xuống dòng", "Trình bày phù hợp với thể loại văn bản."],
      ["Trước khi in văn bản, em nên làm thao tác nào?", "Xem trước bản in (Print Preview) và kiểm tra lỗi chính tả", "In ngay không cần kiểm tra", "Tắt màn hình rồi in", "Xem trước giúp phát hiện lỗi trình bày trước khi tốn giấy, mực."],
      ["Lưu văn bản bằng phím tắt nào?", "Ctrl + S", "Ctrl + P", "Ctrl + N", "Ctrl + P là in, Ctrl + N là tạo văn bản mới. Nên lưu thường xuyên khi soạn thảo."],
      ["Đánh số trang cho văn bản dài có lợi ích gì?", "Giúp sắp xếp, tra cứu trang dễ, không lẫn khi in", "Làm văn bản dài thêm", "Không có lợi ích", "Sách, báo đều đánh số trang vì lí do này."],
      ["Chèn bảng (table) vào văn bản thích hợp khi nào?", "Khi trình bày dữ liệu theo hàng và cột", "Khi viết thư cho bạn", "Khi viết đoạn văn miêu tả", "Bảng giúp thông tin rõ ràng, dễ so sánh."],
      ["Tổ hợp phím nào dùng để IN văn bản?", "Ctrl + P", "Ctrl + S", "Ctrl + C", "Chữ P là viết tắt của Print, nghĩa là in. Nhớ xem trước khi in."],
      ["Muốn chọn toàn bộ nội dung văn bản, em dùng tổ hợp phím nào?", "Ctrl + A", "Ctrl + V", "Ctrl + X", "Chữ A là viết tắt của All, nghĩa là tất cả."],
      ["Kiểu chữ in nghiêng thường được dùng để làm gì?", "Nhấn mạnh một từ hoặc ghi tên tác phẩm, từ nước ngoài", "Viết tiêu đề chính của bài", "Viết toàn bộ bài văn từ đầu đến cuối", "In nghiêng có phím tắt là Ctrl + I."],
      ["Căn lề giữa thường được dùng cho phần nào của văn bản?", "Tiêu đề của bài viết", "Toàn bộ các đoạn văn dài", "Số trang ở cuối bài", "Tiêu đề căn giữa giúp trang văn bản cân đối và dễ nhìn."],
      ["Nút lệnh “dấu đầu dòng” (bullet) được dùng khi nào?", "Khi liệt kê các ý không cần xếp theo thứ tự", "Khi viết một đoạn văn thật dài", "Khi chèn hình ảnh vào bài", "Danh sách đánh số được dùng khi các ý cần thứ tự 1, 2, 3."],
      ["Chế độ chữ “bao quanh hình ảnh” khi chèn hình có tác dụng gì?", "Chữ sẽ xếp xung quanh hình cho bố cục đẹp và gọn", "Hình ảnh sẽ che mất toàn bộ chữ", "Hình ảnh tự động biến mất", "Bố trí hình hợp lí giúp văn bản sinh động mà vẫn dễ đọc."],
      ["Trước khi gửi bài cho thầy cô qua mạng, em nên làm gì?", "Đọc lại toàn bài, sửa lỗi chính tả và đặt tên tệp rõ ràng", "Gửi đi ngay khi vừa gõ xong", "Đặt tên tệp tuỳ ý, không cần dấu", "Tên tệp rõ ràng giúp thầy cô dễ dàng quản lí bài của học sinh."],
      ["Vì sao nên lưu văn bản thành nhiều bản khi làm bài dài?", "Phòng khi một bản bị lỗi hoặc bị mất vẫn còn bản dự phòng", "Để máy tính nhanh đầy bộ nhớ", "Hoàn toàn không có lí do gì", "Sao lưu tài liệu là thói quen tốt với mọi sản phẩm quan trọng."],
      ["Chọn phông chữ cho bài tập thế nào là phù hợp?", "Phông dễ đọc, cỡ chữ vừa phải và thống nhất trong cả bài", "Mỗi đoạn văn dùng một phông chữ lạ mắt", "Cỡ chữ càng nhỏ thì càng tốt", "Sự thống nhất giúp văn bản trông chuyên nghiệp và dễ đọc."],
      ["Khi gõ văn bản tiếng Việt, em cần chú ý nhất điều gì?", "Gõ đúng chính tả, dấu câu và quy tắc gõ dấu tiếng Việt", "Gõ càng nhanh càng tốt, sai cũng không sao", "Không cần dùng đến dấu câu", "Viết đúng chính tả thể hiện sự cẩn thận của người soạn văn bản."],
      ["Phím tắt nào dùng để CẮT đoạn văn bản đã chọn?", "Ctrl + X", "Ctrl + C", "Ctrl + B", "Ctrl + X cắt, Ctrl + C sao chép, Ctrl + V dán."],
      ["Phím tắt in ĐẬM chữ là gì?", "Ctrl + B", "Ctrl + I", "Ctrl + U", "B là Bold (đậm), I là Italic (nghiêng), U là Underline (gạch chân)."],
      ["Phím tắt in NGHIÊNG chữ là gì?", "Ctrl + I", "Ctrl + B", "Ctrl + S", "Chữ nghiêng thường dùng nhấn mạnh từ hoặc tên tác phẩm."],
      ["Phím tắt GẠCH CHÂN chữ là gì?", "Ctrl + U", "Ctrl + Z", "Ctrl + P", "Gạch chân giúp làm nổi bật nội dung quan trọng."],
      ["Muốn tăng cỡ chữ của tiêu đề, em làm gì?", "Chọn tiêu đề rồi tăng số cỡ chữ (font size)", "Gõ lại tiêu đề nhiều lần", "In tiêu đề ra giấy dán vào", "Cỡ chữ tiêu đề thường lớn hơn chữ nội dung."],
      ["Căn lề trái, phải, giữa, đều hai bên thuộc nhóm lệnh nào?", "Căn lề đoạn văn (Alignment)", "Định dạng phông chữ", "Chèn đối tượng", "Căn đều hai bên làm các đoạn văn trông ngay ngắn, trang trọng."],
      ["Khi gõ văn bản, dấu chấm, dấu phẩy phải gõ thế nào?", "Sát vào chữ trước, sau đó mới cách một khoảng", "Cách xa chữ trước một khoảng", "Không cần gõ dấu câu", "Quy tắc gõ dấu câu giúp văn bản đúng chuẩn trình bày."],
      ["Để xuống dòng tạo đoạn văn mới, em nhấn phím nào?", "Phím Enter", "Phím Shift", "Phím Caps Lock", "Enter xuống dòng mới; giữ Shift + Enter là xuống dòng trong cùng đoạn."],
      ["Phím Caps Lock có tác dụng gì khi gõ chữ?", "Bật/tắt chế độ viết chữ IN HOA", "Xoá toàn bộ văn bản", "Lưu văn bản", "Đèn Caps Lock sáng là đang ở chế độ chữ hoa."],
      ["Đầu trang (Header) thường dùng để ghi gì?", "Tên bài, tên lớp lặp lại ở đầu mỗi trang", "Toàn bộ nội dung bài văn", "Hình minh hoạ lớn", "Đầu trang và chân trang giúp văn bản dài trông chuyên nghiệp."],
      ["Khi soạn thiệp chúc mừng, em nên chọn phông chữ thế nào?", "Phông đẹp, dễ đọc, màu sắc vui tươi phù hợp", "Phông chữ rối mắt khó đọc", "Chỉ dùng một màu đen", "Thiệp chúc mừng cần trình bày đẹp và trang trọng."],
      ["Để kiểm tra lỗi chính tả trong văn bản, em làm gì?", "Đọc lại chậm rãi từng câu sau khi gõ xong", "Nhờ máy tính đọc thay hết", "Không cần kiểm tra", "Đọc lại bài là bước quan trọng trước khi nộp bài."],
      ["Hình ảnh đặt ở giữa hai đoạn văn có tác dụng gì?", "Minh hoạ đúng chỗ, không che mất chữ", "Che hết cả đoạn văn", "Làm rối mắt người đọc", "Vị trí hình ảnh phải phù hợp với nội dung đoạn văn."],
      ["Số hàng và số cột của bảng được quyết định khi nào?", "Khi tạo bảng mới (Insert Table)", "Sau khi đã gõ xong hết chữ", "Khi in văn bản", "Có thể thêm hoặc xoá hàng, cột sau khi tạo bảng."],
      ["Muốn xoá một hàng trong bảng, em làm thế nào?", "Chọn hàng đó rồi dùng lệnh xoá hàng (Delete Row)", "Nhấn phím Delete một lần là xong", "Xoá cả văn bản rồi làm lại", "Lệnh xoá hàng nằm trong nhóm công cụ của bảng."],
      ["Vì sao văn bản dài nên chia thành các mục có tiêu đề?", "Giúp bài rõ ràng, dễ tìm phần cần đọc", "Làm văn bản nặng thêm", "Không có tác dụng gì", "Tiêu đề mục còn giúp tạo mục lục tự động."],
      ["Tên tệp văn bản nên đặt thế nào khi lưu bài?", "Rõ nghĩa, có tên bài (VD: Bai-van-ta-canh)", "Đặt là “Tai lieu 1” cho nhanh", "Không cần đặt tên", "Tên tệp rõ ràng giúp tìm lại bài nhanh chóng."],
    ], [["Ctrl + C", "Sao chép"], ["Ctrl + V", "Dán"], ["Ctrl + S", "Lưu văn bản"], ["Ctrl + Z", "Hoàn tác"], ["Ctrl + X", "Cắt"], ["Ctrl + B", "In đậm"], ["Ctrl + P", "In văn bản"], ["Ctrl + A", "Chọn tất cả"]], "Nối phím tắt với chức năng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước SOẠN THẢO một bài văn trên máy tính!", ["Mở phần mềm soạn thảo, tạo văn bản mới", "Gõ nội dung bài văn", "Định dạng: tiêu đề, phông chữ, căn lề", "Đọc lại, sửa lỗi và lưu văn bản"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các bước IN một văn bản!", ["Mở văn bản cần in", "Xem trước bản in (Print Preview)", "Chọn máy in và số bản in", "Nhấn lệnh In (Print)"]); });
    return { id: "tin5-soanthao", emoji: "📝", name: "Soạn thảo văn bản", sub: "Định dạng kí tự • Bố trí hình ảnh trong văn bản", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Phần mềm đồ hoạ dùng để làm gì?", "Vẽ và chỉnh sửa hình ảnh trên máy tính", "Soạn thảo văn bản dài", "Tính toán bảng điểm", "Ví dụ: Paint là phần mềm vẽ đơn giản cho học sinh."],
      ["Công cụ “bút vẽ” (Pencil/Brush) trong phần mềm vẽ có tác dụng gì?", "Vẽ các nét tự do theo di chuyển của chuột", "Tô màu kín một vùng", "Xoá hình vẽ", "Mỗi công cụ trong phần mềm đồ hoạ đảm nhiệm một việc riêng."],
      ["Công cụ “thùng sơn” (Fill) có tác dụng gì?", "Tô màu cho một vùng kín", "Vẽ đường thẳng", "Chọn toàn bộ tranh", "Nhấn vào vùng kín, màu sẽ lan đầy vùng đó."],
      ["Trước khi đóng phần mềm vẽ, em cần làm gì với bức tranh của mình?", "Lưu tranh vào thư mục với tên dễ nhớ", "Đóng ngay không cần lưu", "In ra rồi xoá tệp", "Chưa lưu mà đóng phần mềm, bức tranh sẽ bị mất."],
      ["Sản phẩm số là gì?", "Sản phẩm tạo và lưu trên thiết bị số: tranh, phim, nhạc", "Sản phẩm làm bằng tay từ giấy, gỗ", "Đồ chơi bằng nhựa", "Em có thể tạo nhiều sản phẩm số phục vụ học tập."],
      ["“Đa phương tiện” có nghĩa là gì?", "Kết hợp chữ, hình, âm thanh, video trong một sản phẩm", "Chỉ có chữ viết", "Chỉ có âm thanh", "Bài trình chiếu có chữ, hình và nhạc là sản phẩm đa phương tiện."],
      ["Muốn bài trình chiếu sinh động, em có thể thêm những yếu tố đa phương tiện nào?", "Hình minh hoạ, âm thanh, video ngắn phù hợp nội dung", "Chỉ thêm thật nhiều hiệu ứng nhấp nháy", "Thêm nhạc thật to át cả lời trình bày", "Đa phương tiện phải phục vụ nội dung, không lạm dụng gây rối mắt."],
      ["Khi chọn hình ảnh cho sản phẩm số, em cần lưu ý điều gì?", "Hình rõ nét, hợp nội dung, tôn trọng bản quyền", "Hình nào cũng được, kể cả hình mờ", "Lấy hình của người khác và nhận là của mình", "Kết hợp bài học về bản quyền khi làm sản phẩm số."],
      ["Định dạng tệp hình ảnh phổ biến là?", "JPG, PNG", "DOCX, XLSX", "MP3, MP4", "MP3 là âm thanh, MP4 là video, DOCX là văn bản."],
      ["Tệp âm thanh thường có phần mở rộng nào?", "MP3, WAV", "JPG, PNG", "TXT, PDF", "Nhìn phần mở rộng giúp đoán loại tệp."],
      ["Để tạo một sản phẩm số tốt, thứ tự hợp lí là?", "Ý tưởng → chuẩn bị nội dung → thực hiện → kiểm tra", "Mở phần mềm rồi mới nghĩ nội dung", "Làm xong không cần kiểm tra", "Lên kế hoạch trước giúp sản phẩm chất lượng hơn."],
      ["Chia sẻ sản phẩm số của nhóm lên lớp cần chú ý điều gì?", "Ghi tên tác giả, trình bày rõ, tôn trọng nhóm khác", "Nhận sản phẩm nhóm khác là của mình", "Chê bai sản phẩm của nhóm bạn", "Tôn trọng công sức sáng tạo của nhau là văn hoá số."],
      ["Phần mềm nào thường dùng để tạo bài trình chiếu?", "Microsoft PowerPoint", "Paint", "Máy tính (Calculator)", "Trang chiếu kết hợp chữ, hình ảnh, âm thanh phục vụ thuyết trình."],
      ["Công cụ “chọn vùng” trong phần mềm vẽ dùng để làm gì?", "Chọn một vùng hình để di chuyển, sao chép hoặc đổi màu", "Vẽ một đường cong bất kì", "Tẩy xoá toàn bộ bức tranh", "Chọn đúng vùng cần sửa giúp em chỉnh sửa chính xác hơn."],
      ["Muốn vẽ một hình tròn thật đều trong phần mềm Paint, em làm thế nào?", "Chọn công cụ hình bầu dục và giữ phím Shift khi kéo chuột", "Vẽ bằng tay thật khéo léo", "Dùng bút chì vẽ một vòng tròn", "Giữ phím Shift giúp hình vẽ cân đối, không bị méo."],
      ["Độ phân giải của hình ảnh ảnh hưởng đến điều gì?", "Độ rõ nét của hình khi phóng to hoặc in ra giấy", "Tên gọi của tệp hình ảnh", "Màu nền của bức tranh", "Hình có độ phân giải thấp sẽ bị vỡ hạt khi phóng to."],
      ["Chỉnh sửa độ sáng cho ảnh có tác dụng gì?", "Giúp ảnh rõ ràng, dễ nhìn hơn khi ảnh quá tối hoặc quá sáng", "Làm ảnh trở nên nặng hơn vô ích", "Thay đổi toàn bộ nội dung của ảnh", "Chỉnh sửa vừa phải sẽ giữ cho bức ảnh trông tự nhiên."],
      ["Phần mềm trình chiếu và phần mềm đồ hoạ khác nhau chính ở điểm nào?", "Trình chiếu để thuyết trình, đồ hoạ để vẽ, sửa hình", "Hai phần mềm hoàn toàn giống hệt nhau", "Phần mềm đồ hoạ không tạo được hình ảnh", "Chọn đúng phần mềm cho đúng công việc giúp em làm nhanh và đẹp hơn."],
      ["Âm thanh trong sản phẩm đa phương tiện cần chú ý điều gì?", "Âm lượng vừa phải, không lấn át lời thuyết trình", "Mở âm thanh càng to càng hay", "Không cần kiểm tra âm thanh trước", "Nhạc nền nhẹ nhàng giúp bài trình chiếu thêm sinh động."],
      ["“Cắt ảnh” (crop) có nghĩa là làm gì với bức ảnh?", "Bỏ bớt phần thừa ở rìa để tập trung vào chủ thể chính", "Xoá toàn bộ bức ảnh đi", "Đổi màu của bức ảnh", "Cắt ảnh hợp lí giúp bố cục gọn gàng và nổi bật hơn."],
      ["Tệp video phổ biến thường có phần mở rộng nào?", "MP4", "JPG", "DOCX", "MP4 là định dạng video thông dụng trên hầu hết các thiết bị."],
      ["Thứ tự đúng khi tạo một đoạn phim ngắn từ nhiều bức ảnh là gì?", "Chọn ảnh, sắp xếp, thêm nhạc, xuất video và xem lại", "Xuất video trước rồi mới chọn ảnh", "Chỉ cần chọn bản nhạc là xong", "Nhiều phần mềm làm video đơn giản được thiết kế cho học sinh."],
      ["Khi dùng hình ảnh do bạn khác chụp trong sản phẩm của nhóm, em cần làm gì?", "Xin phép bạn và ghi tên tác giả trong sản phẩm", "Tự ý sử dụng mà không cần nói gì", "Xoá tên của bạn ấy đi", "Tôn trọng bản quyền áp dụng với cả sản phẩm của bạn bè."],
      ["Paint là phần mềm gì?", "Phần mềm vẽ đơn giản trên máy tính", "Phần mềm soạn thảo văn bản", "Phần mềm nghe nhạc", "Paint giúp em vẽ và tô màu các bức tranh đơn giản."],
      ["Công cụ “cục tẩy” (Eraser) dùng để làm gì?", "Xoá nét vẽ sai để vẽ lại", "Tô màu cho tranh", "Vẽ đường thẳng", "Cục tẩy giúp em sửa lỗi khi vẽ trên máy tính."],
      ["Muốn vẽ đường thẳng thật thẳng trong Paint, em dùng công cụ nào?", "Công cụ đường thẳng (Line)", "Bút vẽ tự do", "Thùng sơn", "Giữ thêm phím Shift để đường thẳng ngang hoặc dọc hoàn toàn."],
      ["Công cụ hình chữ nhật, hình bầu dục giúp em vẽ gì nhanh?", "Các hình cơ bản: khung cửa, nhà, mặt trời", "Chữ viết tay", "Âm thanh", "Kết hợp các hình cơ bản để tạo bức tranh phong phú."],
      ["Phóng to (zoom) bức tranh khi vẽ giúp em điều gì?", "Vẽ chi tiết nhỏ chính xác hơn", "Làm tranh tự đẹp lên", "Không giúp gì", "Phóng to để sửa chi tiết, thu nhỏ để xem toàn cảnh."],
      ["Khi tô màu bằng thùng sơn, vì sao nét vẽ phải kín?", "Để màu không bị tràn ra ngoài vùng cần tô", "Để tranh trông đẹp hơn", "Không cần kín", "Thùng sơn chỉ tô được vùng kín hoàn toàn."],
      ["Lưu tranh vẽ với tên rõ ràng giúp ích gì?", "Tìm lại tranh nhanh, không nhầm với tranh khác", "Làm tranh đẹp hơn", "Không có ích gì", "Thói quen đặt tên tệp tốt áp dụng cho mọi sản phẩm số."],
      ["Xem video hướng dẫn làm đồ thủ công, em nên làm gì trước khi bắt tay làm?", "Xem hết một lượt, chuẩn bị đủ dụng cụ, vật liệu", "Vừa xem vừa làm ngay từ giây đầu", "Tua nhanh bỏ qua các bước khó", "Làm sản phẩm thủ công theo video hướng dẫn cần chuẩn bị kĩ."],
      ["Khi làm theo video hướng dẫn, tạm dừng video để làm gì?", "Làm theo từng bước cho kịp và đúng", "Để video tự chạy hết một mình", "Không bao giờ nên tạm dừng", "Nút tạm dừng giúp em học theo tốc độ của mình."],
      ["Làm xong sản phẩm thủ công theo video, em nên làm gì?", "So sánh với mẫu, chỉnh sửa và dọn dẹp nơi làm", "Bỏ ngay không xem lại", "Đổ lỗi nếu chưa giống mẫu", "Đối chiếu với hướng dẫn giúp em rút kinh nghiệm."],
      ["Đồ dùng gia đình em có thể tự làm theo video hướng dẫn là gì?", "Hộp đựng bút, khung ảnh, đèn giấy trang trí", "Ti vi, tủ lạnh", "Máy giặt", "Tạo đồ dùng gia đình đơn giản từ vật liệu sẵn có quanh em."],
      ["Khi làm sản phẩm thủ công, an toàn cần chú ý điều gì?", "Dùng kéo, keo cẩn thận; nhờ người lớn khi cần vật sắc nhọn", "Cầm kéo chạy quanh lớp", "Tự ý dùng dao rọc giấy sắc", "An toàn là yêu cầu đầu tiên trong mọi hoạt động thực hành."],
      ["Để bài trình chiếu dễ đọc, em chọn màu chữ và màu nền thế nào?", "Tương phản rõ: chữ sáng trên nền tối hoặc ngược lại", "Chữ và nền cùng một màu", "Càng nhiều màu càng tốt", "Màu sắc hài hoà giúp người xem dễ đọc, dễ nhớ."],
      ["Hiệu ứng chuyển trang trong bài trình chiếu nên dùng thế nào?", "Vừa phải, nhất quán, không gây rối mắt", "Mỗi trang một hiệu ứng khác nhau", "Càng nhiều hiệu ứng càng hay", "Hiệu ứng phục vụ nội dung, không lấn át nội dung."],
      ["Chèn âm thanh vào bài trình chiếu cần kiểm tra điều gì?", "Âm thanh phát đúng, âm lượng vừa nghe", "Không cần kiểm tra trước", "Mở âm lượng to nhất", "Kiểm tra thiết bị trước khi trình chiếu thật."],
      ["Một sản phẩm đa phương tiện tốt cần yếu tố nào?", "Nội dung đúng, hình đẹp, âm thanh rõ, bố cục hợp lí", "Chỉ cần nhiều hiệu ứng", "Chỉ cần nhạc thật hay", "Chất lượng nội dung là quan trọng nhất."],
      ["Sau khi hoàn thành sản phẩm số, nhóm em nên làm gì?", "Trình bày, lắng nghe góp ý và hoàn thiện sản phẩm", "Giấu sản phẩm không cho ai xem", "Chê sản phẩm của nhóm khác", "Góp ý chân thành giúp mọi nhóm tiến bộ."],
    ], [["Phần mềm đồ hoạ", "Vẽ, chỉnh sửa ảnh"], ["Đa phương tiện", "Chữ + hình + âm thanh + video"], ["JPG, PNG", "Tệp hình ảnh"], ["MP3", "Tệp âm thanh"], ["Thùng sơn", "Tô màu vùng kín"], ["Cục tẩy", "Xoá nét vẽ sai"], ["Cắt ảnh (crop)", "Bỏ phần thừa ở rìa ảnh"], ["MP4", "Tệp video"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước VẼ một bức tranh trên phần mềm đồ hoạ!", ["Mở phần mềm vẽ và tạo tranh mới", "Phác thảo hình chính", "Tô màu và thêm chi tiết", "Lưu tranh vào thư mục với tên rõ ràng"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các bước LÀM SẢN PHẨM theo video hướng dẫn!", ["Xem hết video hướng dẫn một lượt", "Chuẩn bị dụng cụ và vật liệu", "Làm theo từng bước, tạm dừng khi cần", "Hoàn thiện sản phẩm và dọn dẹp"]); });
    return { id: "tin5-dohoa", emoji: "🎨", name: "Phần mềm đồ hoạ và đa phương tiện", sub: "Làm quen phần mềm đồ hoạ • Tạo sản phẩm số • Đa phương tiện", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Trong lập trình trực quan (Scratch), chương trình được tạo bằng cách nào?", "Kéo thả và xếp các khối lệnh nối với nhau", "Gõ mã bằng tiếng Anh phức tạp", "Vẽ tranh bằng tay", "Mỗi khối lệnh là một hành động cho nhân vật thực hiện."],
      ["Cấu trúc tuần tự trong chương trình là gì?", "Các lệnh thực hiện lần lượt theo thứ tự đã xếp", "Các lệnh lặp lại nhiều lần", "Lệnh rẽ hai hướng", "Phần lớn chương trình đơn giản chạy theo cấu trúc tuần tự."],
      ["Cấu trúc lặp dùng để làm gì?", "Lặp lại một nhóm lệnh nhiều lần, khỏi xếp lại", "Kết thúc chương trình", "Đổi màu nhân vật", "Ví dụ: lặp 4 lần “đi 10 bước, quay 90 độ” để vẽ hình vuông."],
      ["Cấu trúc rẽ nhánh (nếu – thì) hoạt động thế nào?", "Kiểm tra điều kiện: đúng thì làm, sai thì việc khác", "Lặp mãi mãi không dừng", "Thực hiện lệnh ngẫu nhiên", "Ví dụ: NẾU chạm biên THÌ quay lại."],
      ["Biến trong lập trình là gì?", "Ô nhớ có tên, lưu giá trị có thể thay đổi", "Một khối lệnh vẽ hình", "Tên của nhân vật", "Biến “điểm” tăng lên mỗi khi nhân vật ăn được một quả táo trong trò chơi."],
      ["Biểu thức trong lập trình là gì?", "Phép tính hay phép so sánh cho ra một giá trị", "Một đoạn hội thoại", "Hình vẽ của nhân vật", "Biểu thức thường dùng trong các khối lệnh rẽ nhánh và gán giá trị cho biến."],
      ["Kịch bản (script) trong chương trình trực quan là gì?", "Một dãy các khối lệnh xếp nối nhau cho một nhân vật", "Một vở kịch sân khấu", "Bản nhạc nền", "Một nhân vật có thể có nhiều kịch bản khác nhau."],
      ["Để chuyển một ý tưởng thành chương trình, thứ tự đúng là?", "Ý tưởng → viết kịch bản → xếp khối lệnh → chạy thử", "Xếp khối lệnh tuỳ ý rồi mới nghĩ ý tưởng", "Chạy chương trình trước khi viết", "Chạy thử và sửa lỗi là bước không thể thiếu."],
      ["Khi chạy thử, chương trình không hoạt động như mong muốn. Em nên làm gì?", "Kiểm tra từng khối lệnh, tìm lỗi, sửa và chạy thử lại", "Xoá hết làm lại từ đầu nhiều lần không suy nghĩ", "Bỏ cuộc ngay", "Tìm lỗi (debug) là kĩ năng quan trọng của người lập trình."],
      ["Muốn nhân vật vẽ một hình vuông bằng cấu trúc lặp, em cần lặp những lệnh nào?", "Lặp 4 lần: di chuyển một đoạn, quay 90 độ", "Lặp 3 lần: di chuyển, quay 60 độ", "Đi một lần thật dài", "Hình vuông có 4 cạnh bằng nhau và 4 góc vuông."],
      ["Trong trò chơi “mèo bắt táo”, biến “điểm” thay đổi thế nào?", "Mỗi lần mèo chạm quả táo, điểm tăng thêm 1", "Điểm luôn bằng 0", "Điểm giảm dần theo thời gian tuỳ ý", "Biến giúp chương trình ghi nhớ và cập nhật thông tin."],
      ["Khối lệnh “nếu chạm vào cạnh thì bật lại” thuộc cấu trúc nào?", "Cấu trúc rẽ nhánh", "Cấu trúc tuần tự", "Cấu trúc lặp vô hạn", "Điều kiện “chạm cạnh” quyết định hành động tiếp theo."],
      ["Lặp vô hạn (mãi mãi) khác lặp theo số lần ở điểm nào?", "Lặp mãi mãi không tự dừng; lặp số lần dừng khi đủ lần", "Hai loại hoàn toàn giống nhau", "Lặp mãi mãi chỉ chạy một lần", "Cần cẩn thận để chương trình biết điểm dừng hợp lí."],
      ["Khối lệnh “lặp lại 10 lần” thực hiện nhóm lệnh bên trong bao nhiêu lần?", "10 lần rồi dừng lại", "Đúng 1 lần duy nhất", "Lặp mãi mãi không bao giờ dừng", "Số lần lặp do người lập trình đặt trước trong khối lệnh."],
      ["Điều kiện trong khối lệnh “nếu – thì” cho ra kết quả thế nào?", "Đúng hoặc sai, chỉ có hai khả năng", "Luôn luôn cho kết quả đúng", "Có vô số kết quả khác nhau", "Biểu thức so sánh như “điểm > 10” luôn cho kết quả đúng hoặc sai."],
      ["Muốn nhân vật nói “Xin chào!” ngay khi chương trình bắt đầu, em xếp khối lệnh nào?", "Khối lệnh “nói” ở đầu kịch bản, sau sự kiện bắt đầu", "Khối lệnh “đợi” ở cuối kịch bản", "Không cần thêm khối lệnh nào", "Sự kiện “khi bấm lá cờ xanh” thường mở đầu chương trình Scratch."],
      ["Trong trò chơi, biến “số mạng” giảm khi nào là hợp lí?", "Khi nhân vật chạm vào chướng ngại vật hoặc kẻ địch", "Khi nhân vật giành chiến thắng", "Không bao giờ được giảm", "Thiết kế quy tắc rõ ràng giúp trò chơi công bằng và thú vị."],
      ["Để nhân vật xuất hiện ở vị trí ngẫu nhiên, em dùng khối lệnh nào?", "Khối lệnh “đi tới vị trí ngẫu nhiên”", "Khối lệnh “xoay 15 độ”", "Khối lệnh “phát âm thanh”", "Tính ngẫu nhiên làm cho trò chơi thêm bất ngờ và hấp dẫn."],
      ["Khi sửa lỗi chương trình (debug), bước đầu tiên em nên làm là gì?", "Chạy thử, quan sát chỗ sai và đối chiếu với kịch bản dự định", "Xoá hết chương trình và làm lại", "Đổ lỗi cho máy tính bị hỏng", "Tìm lỗi từng bước một là cách học lập trình hiệu quả nhất."],
      ["Hai nhân vật trong cùng một chương trình có thể có kịch bản khác nhau không?", "Có, mỗi nhân vật có các kịch bản riêng của mình", "Không, mọi nhân vật phải dùng chung một kịch bản", "Chỉ nhân vật chính mới có kịch bản", "Hãy chọn đúng nhân vật trước khi xếp các khối lệnh cho nhân vật đó."],
      ["Khối lệnh “đợi 1 giây” có tác dụng gì?", "Tạm dừng chương trình 1 giây rồi mới chạy lệnh tiếp theo", "Kết thúc toàn bộ chương trình", "Làm chương trình chạy nhanh hơn", "Lệnh đợi giúp em điều khiển nhịp độ hành động của nhân vật."],
      ["Biểu thức “điểm + 5” trong lập trình được dùng để làm gì?", "Tính ra giá trị mới cho biến “điểm”", "Phát một âm thanh vui nhộn", "Đặt tên cho nhân vật", "Biểu thức toán học là nền tảng của rất nhiều chương trình."],
      ["Trước khi chia sẻ trò chơi cho bạn chơi thử, em nên làm gì?", "Chạy thử kĩ, sửa lỗi, viết hướng dẫn cách chơi", "Chia sẻ ngay bản nháp đầu tiên", "Giấu đi mọi lỗi mình đã biết", "Bạn chơi thử sẽ giúp em phát hiện những lỗi mà mình chưa thấy."],
      ["Sân khấu (Stage) trong Scratch là gì?", "Nơi nhân vật hoạt động và hiển thị kết quả", "Nơi chứa các khối lệnh", "Nơi lưu trữ âm thanh", "Sân khấu có phông nền thay đổi theo cảnh của chương trình."],
      ["Nhân vật (Sprite) trong Scratch là gì?", "Đối tượng được điều khiển bằng khối lệnh: mèo, quả bóng", "Một loại phông nền", "Một khối lệnh đặc biệt", "Em có thể thêm, xoá và đổi trang phục cho nhân vật."],
      ["Khối lệnh sự kiện “khi bấm lá cờ xanh” có vai trò gì?", "Bắt đầu chạy chương trình", "Kết thúc chương trình", "Đổi màu nhân vật", "Hầu hết chương trình Scratch bắt đầu bằng khối sự kiện này."],
      ["Muốn nhân vật di chuyển, em dùng nhóm khối lệnh nào?", "Nhóm khối lệnh Chuyển động (Motion)", "Nhóm khối lệnh Âm thanh", "Nhóm khối lệnh Hiển thị", "Khối “đi 10 bước” thuộc nhóm Chuyển động."],
      ["Khối lệnh “nói Xin chào trong 2 giây” thuộc nhóm nào?", "Nhóm Hiển thị (Looks)", "Nhóm Chuyển động", "Nhóm Điều khiển", "Nhóm Hiển thị điều khiển lời nói, trang phục của nhân vật."],
      ["Để nhân vật vẽ hình bằng bút, em cần khối lệnh nào trước?", "Khối lệnh “đặt bút xuống”", "Khối lệnh “phát âm thanh”", "Khối lệnh “đợi 1 giây”", "Bút vẽ thuộc nhóm mở rộng Bút (Pen) trong Scratch."],
      ["Vẽ hình tam giác đều bằng cấu trúc lặp, em lặp mấy lần và quay bao nhiêu độ?", "Lặp 3 lần, mỗi lần quay 120 độ", "Lặp 3 lần, quay 90 độ", "Lặp 4 lần, quay 60 độ", "Tổng góc quay đủ 360 độ: 3 × 120 = 360."],
      ["Vẽ hình tròn trong Scratch, cách làm phổ biến là gì?", "Lặp nhiều lần: đi bước nhỏ, quay 1 độ", "Chỉ cần một khối lệnh duy nhất", "Dùng khối lệnh rẽ nhánh", "Lặp 360 lần “đi 1 bước, quay 1 độ” sẽ vẽ được vòng tròn."],
      ["Biến “điểm” khi bắt đầu trò chơi nên đặt bằng bao nhiêu?", "Bằng 0 để tính điểm từ đầu", "Bằng 100", "Không cần đặt", "Đặt giá trị ban đầu cho biến là bước quan trọng khi bắt đầu."],
      ["Muốn tăng điểm lên 1 mỗi khi ăn táo, em dùng khối lệnh nào?", "Khối lệnh “thay đổi điểm thêm 1”", "Khối lệnh “đặt điểm bằng 1”", "Khối lệnh “xoá biến điểm”", "“Thay đổi thêm” cộng dồn giá trị, khác với “đặt bằng”."],
      ["Biểu thức so sánh “điểm > 10” cho kết quả gì?", "Đúng hoặc sai tuỳ giá trị của điểm", "Luôn luôn đúng", "Một con số bất kì", "Biểu thức so sánh dùng trong khối “nếu – thì”."],
      ["Khối lệnh “nếu – thì – ngược lại” khác “nếu – thì” ở điểm nào?", "Có thêm việc làm khi điều kiện sai", "Chạy nhanh hơn hẳn", "Không khác gì nhau", "Ví dụ: nếu thắng thì chúc mừng, ngược lại thì chơi lại."],
      ["Âm thanh trong trò chơi được thêm bằng nhóm khối lệnh nào?", "Nhóm Âm thanh (Sound)", "Nhóm Chuyển động", "Nhóm Biến", "Có thể ghi âm hoặc chọn âm thanh có sẵn trong thư viện."],
      ["Phông nền (backdrop) của sân khấu thay đổi khi nào?", "Khi chương trình chạy tới lệnh đổi phông nền", "Không bao giờ thay đổi được", "Chỉ khi tắt máy", "Đổi phông giúp chuyển cảnh: từ sân trường sang lớp học."],
      ["Kịch bản tốt cho một trò chơi cần có những phần nào?", "Bắt đầu, diễn biến hành động và điều kiện thắng/thua", "Chỉ cần nhân vật đẹp", "Chỉ cần âm thanh hay", "Từ kịch bản đến chương trình: kịch bản rõ thì lập trình dễ."],
      ["Khi hai nhân vật cần phối hợp nói chuyện lần lượt, em dùng khối lệnh nào?", "Khối lệnh “đợi” và “phát tin/nhận tin”", "Chỉ khối lệnh lặp", "Không thể làm được", "Tin nhắn (broadcast) giúp các nhân vật phối hợp với nhau."],
      ["Để chương trình dừng hẳn khi trò chơi kết thúc, em dùng khối lệnh nào?", "Khối lệnh “dừng tất cả” (stop all)", "Khối lệnh “lặp mãi mãi”", "Khối lệnh “đi 10 bước”", "Kết thúc đúng lúc giúp trò chơi trọn vẹn."],
    ], [["Cấu trúc tuần tự", "Lệnh chạy lần lượt"], ["Cấu trúc lặp", "Lặp lại nhóm lệnh"], ["Cấu trúc rẽ nhánh", "Nếu – thì, kiểm tra điều kiện"], ["Biến", "Ô nhớ lưu giá trị thay đổi"], ["Nhân vật (Sprite)", "Đối tượng được điều khiển"], ["Sân khấu (Stage)", "Nơi nhân vật hoạt động"], ["Lá cờ xanh", "Sự kiện bắt đầu chương trình"], ["Biểu thức", "Phép tính cho ra giá trị"]], "Nối cấu trúc với ý đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước TẠO MỘT CHƯƠNG TRÌNH theo đúng thứ tự!", ["Nghĩ ý tưởng và việc cần làm", "Viết kịch bản các bước", "Xếp các khối lệnh theo kịch bản", "Chạy thử, sửa lỗi và hoàn thiện"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các lệnh để nhân vật VẼ HÌNH VUÔNG (lặp 4 lần)!", ["Đặt bút xuống", "Đi 100 bước", "Quay 90 độ", "Nhấc bút lên khi đã đủ 4 cạnh"]); });
    return { id: "tin5-laptrinh", emoji: "🧩", name: "Lập trình trực quan", sub: "Cấu trúc tuần tự, lặp, rẽ nhánh • Biến và biểu thức • Từ kịch bản đến chương trình", pools: kp }; })()
];
/* ================= CÔNG NGHỆ 5 ================= */
var CN5_TOPICS = [
  (function () { var kp = knowledgePools([
      ["Công nghệ có vai trò gì trong đời sống?", "Giúp lao động nhẹ nhàng, năng suất cao, đời sống tiện nghi", "Không ảnh hưởng gì đến đời sống", "Chỉ dùng để giải trí", "Từ bóng đèn điện đến máy giặt, công nghệ có mặt khắp nơi quanh ta."],
      ["Nhà sáng chế là người như thế nào?", "Người tạo ra sản phẩm hoặc giải pháp kĩ thuật mới", "Người bán hàng ở chợ", "Người chỉ sử dụng sản phẩm", "Ê-đi-xơn là nhà sáng chế nổi tiếng với bóng đèn điện."],
      ["Ê-đi-xơn (Thomas Edison) nổi tiếng với sáng chế nào?", "Bóng đèn điện sợi đốt", "Máy bay", "Điện thoại di động", "Ông đã thử hàng nghìn lần mới thành công — tấm gương kiên trì trong sáng tạo."],
      ["Thiết kế sản phẩm là công việc gì?", "Vẽ ý tưởng, hình dáng, cấu tạo sản phẩm trước khi chế tạo", "Bán sản phẩm ra thị trường", "Sửa chữa sản phẩm hỏng", "Bản thiết kế giúp hình dung sản phẩm và cách làm ra nó."],
      ["Khi tìm hiểu một bản thiết kế, em cần chú ý những thông tin nào?", "Hình vẽ sản phẩm, kích thước, vật liệu và ghi chú", "Chỉ cần nhìn màu sắc", "Không cần đọc ghi chú", "Đọc đúng thiết kế mới làm được sản phẩm đúng ý tưởng."],
      ["Sử dụng điện thoại đúng cách, em nên làm gì?", "Dùng khi cần, không quá lâu, không vừa sạc vừa dùng", "Chơi điện thoại suốt ngày đêm", "Dùng điện thoại khi đang đi trên đường", "Điện thoại là công cụ tốt nếu biết dùng đúng mục đích và thời gian."],
      ["Vì sao không nên vừa sạc điện thoại vừa sử dụng?", "Có nguy cơ cháy nổ, điện giật, làm pin nhanh hỏng", "Vì sạc sẽ chậm hơn một chút", "Không có lí do gì", "An toàn điện là bài học quan trọng với mọi thiết bị."],
      ["Tủ lạnh có công dụng chính là gì?", "Bảo quản thực phẩm tươi lâu hơn nhờ nhiệt độ thấp", "Nấu chín thức ăn", "Giặt quần áo", "Nhiệt độ thấp làm chậm sự phát triển của vi khuẩn trong thực phẩm."],
      ["Sử dụng tủ lạnh tiết kiệm điện: việc nào là đúng?", "Đóng kín cửa, không mở lâu, để thức ăn nguội mới cho vào", "Mở cửa tủ đứng ngắm thật lâu", "Cho nồi canh đang sôi thẳng vào tủ", "Sắp xếp thực phẩm gọn gàng giúp hơi lạnh lưu thông đều."],
      ["Thực phẩm sống và chín trong tủ lạnh nên để thế nào?", "Để riêng, thực phẩm chín để ngăn trên, đựng trong hộp kín", "Trộn lẫn tất cả với nhau", "Để thịt sống lên trên thức ăn chín", "Để riêng tránh lây nhiễm vi khuẩn, giữ vệ sinh an toàn thực phẩm."],
      ["Sản phẩm công nghệ nào giúp việc học tập của em thuận tiện hơn?", "Máy tính, đèn bàn, máy chiếu, loa...", "Chỉ có ti vi giải trí", "Không có sản phẩm nào", "Công nghệ phục vụ tốt cho học tập nếu dùng đúng cách."],
      ["Khi một thiết bị điện ở nhà bị hỏng, em nên làm gì?", "Không tự ý sửa chữa; báo cho người lớn và gọi thợ sửa chữa", "Tự tháo ra sửa ngay", "Cắm điện thử xem có cháy không", "Điện có thể gây nguy hiểm, chỉ người có chuyên môn mới được sửa."],
      ["Để sản phẩm công nghệ bền lâu, em cần làm gì?", "Sử dụng đúng hướng dẫn, vệ sinh và bảo quản cẩn thận", "Dùng xong vứt bừa bãi", "Để nơi ẩm ướt, bụi bặm", "Giữ gìn đồ dùng là thói quen tốt và tiết kiệm cho gia đình."],
      ["Sáng chế khác với hiện tượng có sẵn trong tự nhiên ở điểm nào?", "Giải pháp kĩ thuật mới do con người tạo ra", "Sáng chế là thứ có sẵn ở trong tự nhiên", "Hai khái niệm hoàn toàn giống nhau", "Nhà sáng chế Ê-đi-xơn có hơn một nghìn sáng chế trong cuộc đời ông."],
      ["Khi đọc hướng dẫn sử dụng một thiết bị mới, em cần chú ý nhất điều gì?", "Các cảnh báo an toàn và cách vận hành đúng của thiết bị", "Chỉ xem các hình ảnh quảng cáo", "Bỏ qua hết phần cảnh báo", "Đọc kĩ hướng dẫn giúp em dùng thiết bị an toàn và bền lâu."],
      ["Máy giặt mang lại lợi ích gì cho gia đình?", "Giặt quần áo nhanh, sạch và đỡ tốn sức hơn giặt bằng tay", "Làm quần áo tự khô ngay lập tức", "Giặt mà không cần dùng đến nước", "Dùng máy giặt đúng khối lượng quy định sẽ giúp máy bền hơn."],
      ["Đèn bàn học nên được đặt thế nào để bảo vệ mắt?", "Ánh sáng vừa đủ, chiếu từ phía tay không thuận", "Đặt sau lưng cho ánh sáng chiếu qua vai", "Càng sáng chói lọi thì càng tốt", "Ánh sáng học tập đúng cách giúp mắt em không bị mỏi."],
      ["Ý tưởng thiết kế một sản phẩm mới thường bắt đầu từ đâu?", "Từ nhu cầu thực tế và vấn đề cần giải quyết trong đời sống", "Từ việc sao chép nguyên mẫu của người khác", "Không cần bắt đầu từ lí do nào", "Quan sát đời sống quanh mình giúp em nghĩ ra nhiều ý tưởng sáng tạo."],
      ["Vì sao tay cầm của chảo nấu ăn thường làm bằng nhựa chịu nhiệt hoặc gỗ?", "Vì các vật liệu này cách nhiệt, cầm không bị nóng tay", "Vì kim loại trần cầm chắc hơn", "Vì thuỷ tinh mỏng trông đẹp hơn", "Chọn vật liệu phù hợp với tính chất công việc là yêu cầu của thiết kế."],
      ["Sử dụng điện thoại để học tập hiệu quả, việc nào sau đây là đúng?", "Dùng ứng dụng học tập, tra từ điển, xem bài giảng", "Vừa học vừa chơi trò chơi trên điện thoại", "Để điện thoại reo chuông liên tục khi học", "Điện thoại là công cụ tốt hay xấu phụ thuộc vào cách em sử dụng."],
      ["Khi thiết kế sản phẩm, vì sao nên vẽ nhiều phương án khác nhau?", "Để so sánh và chọn phương án tốt nhất", "Để tốn thêm nhiều giấy vẽ", "Hoàn toàn không cần thiết", "Càng nhiều ý tưởng, sản phẩm cuối cùng càng hoàn thiện hơn."],
      ["Thiết bị công nghệ nào giúp người khiếm thính nghe được tốt hơn?", "Máy trợ thính", "Kính lúp đọc sách", "Gậy dò đường", "Công nghệ hỗ trợ giúp người khuyết tật hoà nhập tốt với cuộc sống."],
      ["Ti vi là sản phẩm công nghệ giúp con người làm gì?", "Xem tin tức, học tập và giải trí ngay tại nhà", "Chỉ dùng để bắt sóng đài phát thanh", "Nấu ăn nhanh hơn trước", "Xem ti vi cũng cần chọn lọc nội dung và giới hạn thời gian hợp lí."],
      ["Sản phẩm công nghệ nào giúp nấu ăn nhanh và tiện lợi hơn?", "Nồi cơm điện, bếp điện", "Máy giặt, tủ lạnh", "Quạt điện, đèn bàn", "Nồi cơm điện tự ngắt khi cơm chín, bếp điện nấu nhanh — rất tiện cho gia đình."],
      ["Máy thu thanh (radio) dùng để làm gì?", "Nghe tin tức và chương trình phát thanh", "Chiếu phim lên màn hình", "Đông lạnh thực phẩm", "Radio chỉ truyền âm thanh, không có hình ảnh như ti vi."],
      ["Khi xem ti vi và nghe radio, em nên làm gì để bảo vệ mắt, tai?", "Âm lượng vừa nghe, không xem quá lâu", "Bật âm lượng thật to", "Xem liên tục nhiều giờ liền", "Ngồi đúng khoảng cách và nghỉ ngơi hợp lí giúp mắt, tai khỏe mạnh."],
      ["Đèn học tốt cho mắt cần có đặc điểm gì?", "Ánh sáng đều, không nhấp nháy, vừa sáng", "Ánh sáng chói, nhấp nháy liên tục", "Chỉ cần hình dáng thật đẹp", "Đèn học chống cận cho ánh sáng ổn định, dịu mắt."],
      ["Vì sao nên tắt đèn và thiết bị điện khi không sử dụng?", "Tiết kiệm điện, giảm nguy cơ cháy nổ", "Vì đèn sẽ tự hỏng nhanh", "Không có lí do gì cả", "Tiết kiệm điện là bảo vệ môi trường và tiết kiệm tiền cho gia đình."],
      ["Khi tủ lạnh mất điện lâu, em nên làm gì?", "Ít mở cửa tủ, dùng thực phẩm dễ hỏng trước", "Mở cửa tủ cho thoáng khí", "Để nguyên thực phẩm cả tuần", "Giữ cửa tủ đóng kín giúp hơi lạnh ở lại trong tủ lâu hơn."],
      ["Số điện thoại 114 dùng để gọi khi nào?", "Khi có cháy, gọi cứu hỏa", "Khi muốn đặt đồ ăn", "Khi cần hỏi đường đi", "114 là số cứu hỏa; 113 là công an, 115 là cấp cứu y tế."],
      ["Khi người lạ gọi điện thoại đến nhà, em nên làm gì?", "Không cho thông tin cá nhân, báo người lớn", "Cho họ biết địa chỉ nhà mình", "Hẹn gặp họ ở ngoài đường", "Cẩn thận với người lạ qua điện thoại giúp em luôn an toàn."],
      ["Ngoài bóng đèn, Ê-đi-xơn còn sáng chế thiết bị nào?", "Máy hát ghi âm đầu tiên", "Ti vi màu", "Máy tính điện tử", "Ê-đi-xơn có hơn một nghìn bằng sáng chế trong cuộc đời mình."],
      ["Bản thiết kế sản phẩm thường thể hiện bằng hình thức nào?", "Hình vẽ kĩ thuật kèm kích thước", "Tranh phong cảnh màu nước", "Không cần vẽ hình gì", "Hình vẽ từ nhiều phía kèm kích thước giúp hình dung rõ sản phẩm."],
      ["Trước khi thiết kế sản phẩm, em cần xác định điều gì?", "Sản phẩm dùng để làm gì, cho ai dùng", "Màu sơn của sản phẩm", "Giá bán thật cao", "Hiểu rõ nhu cầu giúp em thiết kế đúng hướng ngay từ đầu."],
      ["Vật liệu làm sản phẩm thiết kế cần đáp ứng yêu cầu gì?", "Phù hợp công dụng, an toàn, dễ tìm", "Càng đắt tiền càng tốt", "Chỉ cần đẹp mắt là đủ", "Nhiều sản phẩm tốt được làm từ vật liệu tái chế sẵn có quanh ta."],
      ["Tư thế dùng điện thoại nào tốt cho mắt và cổ?", "Ngồi thẳng, giữ khoảng cách vừa phải", "Nằm sấp, cúi sát màn hình", "Vừa đi vừa nhìn điện thoại", "Dùng điện thoại đúng tư thế giúp em tránh gù lưng và mỏi mắt."],
      ["Thực phẩm nào không nên giữ lại trong tủ lạnh?", "Thức ăn để lâu ngày, đã có mùi lạ", "Rau củ tươi mới mua về", "Trứng gà còn nguyên vỏ", "Thức ăn có mùi lạ, nhớt hoặc mốc phải bỏ đi ngay để tránh ngộ độc."],
      ["Công nghệ giúp việc liên lạc ở xa trở nên thế nào?", "Nhanh chóng, tiện lợi hơn nhiều", "Chậm hơn gửi thư tay ngày xưa", "Hoàn toàn không thể liên lạc", "Nhờ điện thoại và thư điện tử, tin nhắn đi rất xa chỉ trong vài giây."],
      ["Khi chọn mua sản phẩm công nghệ cho gia đình, cần chú ý gì?", "Phù hợp nhu cầu, tiết kiệm điện, có bảo hành", "Chỉ chọn sản phẩm đắt nhất", "Mua càng nhiều càng tốt", "Sản phẩm dán nhãn năng lượng nhiều sao thường tiết kiệm điện hơn."],
      ["Sản phẩm công nghệ hỏng, không dùng được nữa, em xử lí thế nào?", "Đưa đến điểm thu gom rác điện tử", "Vứt chung với rác sinh hoạt", "Đốt bỏ ở sân nhà", "Rác điện tử chứa chất độc hại nên cần được thu gom, xử lí riêng."],
    ], [["Ê-đi-xơn", "Sáng chế bóng đèn điện"], ["Thiết kế", "Vẽ ý tưởng sản phẩm trước khi làm"], ["Tủ lạnh", "Bảo quản thực phẩm ở nhiệt độ thấp"], ["Điện thoại", "Dùng đúng mục đích, vừa đủ thời gian"], ["Máy thu thanh (radio)", "Nghe tin tức, chương trình phát thanh"], ["Đèn bàn học", "Chiếu sáng khi học bài"], ["Máy giặt", "Giặt quần áo nhanh, đỡ tốn sức"], ["Nồi cơm điện", "Nấu cơm tự động, giữ ấm cơm"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước TÌM HIỂU THIẾT KẾ một sản phẩm theo đúng thứ tự!", ["Quan sát hình vẽ tổng thể của sản phẩm", "Đọc các kích thước và ghi chú trên bản thiết kế", "Nhận biết vật liệu cần dùng", "Hình dung cách chế tạo sản phẩm"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các việc SỬ DỤNG TỦ LẠNH ĐÚNG CÁCH theo thứ tự hợp lí!", ["Để thức ăn nguội bớt trước khi cho vào tủ", "Đựng thức ăn vào hộp kín, để riêng sống và chín", "Đóng kín cửa tủ ngay sau khi lấy đồ", "Thường xuyên kiểm tra, bỏ thực phẩm đã hỏng"]); });
    return { id: "cn5-doishong", emoji: "💡", name: "Công nghệ và đời sống", sub: "Bài 1–6 • Vai trò của công nghệ • Nhà sáng chế • Thiết kế sản phẩm • Dùng điện thoại, tủ lạnh an toàn", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Mô hình xe điện chạy bằng pin gồm những bộ phận chính nào?", "Thân xe, bánh xe, mô-tơ, pin, công tắc và dây dẫn", "Chỉ có thân xe và bánh xe", "Chỉ có pin và bóng đèn", "Pin cấp điện cho mô-tơ, mô-tơ quay làm bánh xe chuyển động."],
      ["Trong mô hình xe điện, bộ phận nào tạo chuyển động cho xe?", "Động cơ điện (mô-tơ)", "Công tắc", "Thân xe bằng nhựa", "Mô-tơ biến điện năng thành chuyển động quay."],
      ["Muốn mô hình xe điện chạy được, mạch điện của xe phải thế nào?", "Mạch kín: pin nối với mô-tơ qua dây dẫn và công tắc đóng", "Để hở mạch cho an toàn", "Không cần pin", "Kiểm tra mạch điện là bước quan trọng khi lắp ráp mô hình."],
      ["Mô hình máy phát điện gió gồm những bộ phận nào?", "Cánh quạt, máy phát điện nhỏ, trụ đỡ và đèn LED", "Chỉ có cánh quạt giấy", "Pin và công tắc", "Gió quay cánh quạt → máy phát tạo điện → đèn LED sáng."],
      ["Mô hình điện mặt trời hoạt động dựa vào bộ phận nào?", "Tấm pin mặt trời (hấp thụ ánh sáng, tạo điện)", "Pin tiểu thông thường", "Động cơ xăng nhỏ", "Pin mặt trời tạo điện mạnh hơn khi có nắng tốt."],
      ["Khi lắp ráp mô hình kĩ thuật, bước đầu tiên em nên làm gì?", "Đọc hướng dẫn, kiểm tra đủ chi tiết, dụng cụ trước khi lắp", "Lắp ngay không cần xem hướng dẫn", "Chọn bừa các chi tiết", "Chuẩn bị đầy đủ giúp lắp ráp nhanh và đúng."],
      ["Sau khi lắp xong mô hình, em cần làm gì?", "Kiểm tra, chạy thử và điều chỉnh nếu chưa tốt", "Cất ngay vào hộp không cần thử", "Tháo ra vứt đi", "Chạy thử giúp phát hiện lỗi lắp ráp để sửa."],
      ["Dụng cụ nào thường dùng khi lắp ráp mô hình kĩ thuật?", "Tua-vít, kìm nhỏ, kéo, thước", "Búa tạ, máy khoan lớn của người lớn", "Dao bếp sắc", "Dùng dụng cụ phù hợp và cẩn thận để an toàn."],
      ["Mô hình máy phát điện gió cho thấy lợi ích gì của năng lượng gió?", "Gió là nguồn năng lượng sạch, tái tạo, có thể tạo ra điện", "Gió chỉ dùng để thả diều", "Năng lượng gió không ứng dụng được", "Ngoài thực tế, tuabin gió lớn phát điện cho nhiều hộ gia đình."],
      ["Để mô hình xe điện chạy nhanh và thẳng, em cần chú ý điều gì?", "Lắp bánh cân đối, chắc chắn; nối dây đúng cực pin", "Lắp bánh xe lệch cũng không sao", "Nối dây tuỳ ý", "Chi tiết nhỏ ảnh hưởng lớn đến hoạt động của mô hình."],
      ["Khi mô hình không hoạt động, cách xử lí đúng là gì?", "Kiểm tra pin, dây dẫn và công tắc theo thứ tự", "Đập nhẹ vào mô hình cho nó chạy", "Bỏ mô hình, không tìm hiểu", "Hãy kiểm tra lần lượt: pin còn điện không, dây có lỏng không, công tắc đã đóng chưa. Kiểm tra có hệ thống là kĩ năng của người làm kĩ thuật."],
      ["Làm việc nhóm khi lắp ráp mô hình có lợi ích gì?", "Phân công công việc, hỗ trợ nhau, làm nhanh hơn", "Càng đông càng chậm", "Không khác gì làm một mình", "Tinh thần đồng đội rất quan trọng trong các dự án kĩ thuật."],
      ["Sản phẩm mô hình sau khi hoàn thành có ý nghĩa gì?", "Hiểu nguyên lí thiết bị thật, rèn khéo tay và sáng tạo", "Chỉ để trưng bày cho đẹp", "Không học được điều gì", "Mỗi mô hình là một bài học khoa học – kĩ thuật sinh động."],
      ["Pin tiểu thông thường dùng trong mô hình có điện áp khoảng bao nhiêu?", "Khoảng 1,5 vôn (V)", "Khoảng 220 vôn", "Khoảng 12 vôn", "Các mô hình học tập thường dùng pin 1,5V nên an toàn cho học sinh."],
      ["Khi nối pin vào mạch điện của mô hình, em cần chú ý điều gì?", "Nối đúng cực dương (+) và cực âm (−) theo hướng dẫn", "Nối cực nào trước cũng hoàn toàn như nhau", "Không cần chú ý đến cực của pin", "Nối ngược cực có thể làm mô-tơ quay ngược chiều hoặc không quay."],
      ["Cánh quạt của mô hình điện gió quay nhanh hay chậm phụ thuộc vào điều gì?", "Sức gió thổi mạnh hay yếu và độ nghiêng của cánh quạt", "Màu sơn của cánh quạt", "Tên gọi của mô hình", "Thí nghiệm thay đổi góc nghiêng cánh giúp hiểu cách tận dụng sức gió."],
      ["Để biết mô hình điện gió có phát ra điện hay không, em nhìn vào đâu?", "Bóng đèn LED nối với máy phát: đèn sáng là có điện", "Nghe tiếng kêu của trụ đỡ", "Nhìn màu sắc của cánh quạt", "Đèn LED là thiết bị kiểm tra đơn giản và trực quan nhất."],
      ["Tấm pin mặt trời tạo ra nhiều điện nhất trong điều kiện nào?", "Khi nắng to và ánh sáng chiếu thẳng vào bề mặt tấm pin", "Khi trời nhiều mây đen", "Vào ban đêm không có nắng", "Nghiêng tấm pin hướng về phía Mặt Trời giúp thu được nhiều điện hơn."],
      ["Bánh xe của mô hình xe điện cần lắp thế nào để xe chạy ổn định?", "Hai bên cân đối, trục thẳng và bánh quay trơn tru", "Một bánh to, một bánh nhỏ lắp tuỳ ý", "Siết thật chặt để bánh không quay được", "Bánh xe bị kẹt là nguyên nhân xe chạy chậm và lệch hướng."],
      ["Dây dẫn trong mô hình thường có vỏ bọc bằng gì, để làm gì?", "Vỏ nhựa cách điện để an toàn và tránh chập mạch", "Vỏ bằng kim loại trần", "Không cần có vỏ bọc", "Hai sợi dây trần chạm vào nhau sẽ gây chập mạch và hỏng pin."],
      ["Khi làm mô hình theo nhóm, phân công công việc thế nào là hợp lí?", "Chia việc cắt dán, lắp ráp, kiểm tra, hỗ trợ nhau", "Một người làm hết, các bạn ngồi xem", "Ai thích làm gì thì tự làm việc đó", "Phân công rõ ràng giúp mọi thành viên đều học được và đóng góp được."],
      ["Sau khi hoàn thành mô hình, phần trình bày sản phẩm cần có những gì?", "Giới thiệu cấu tạo, nguyên lí và vận hành thử", "Chỉ cần cất mô hình vào tủ trưng bày", "Không cần giải thích bất cứ điều gì", "Trình bày sản phẩm giúp em rèn khả năng diễn đạt và sự tự tin."],
      ["Mô hình xe điện dùng nguồn năng lượng gì và có ưu điểm gì?", "Dùng điện từ pin, sạch và không thải khói ra môi trường", "Dùng xăng để chạy nhanh hơn", "Dùng sức gió thổi từ phía sau", "Xe điện thật ngày nay cũng đang dần thay thế xe xăng để bảo vệ môi trường."],
      ["Động cơ điện nhỏ trong mô hình còn được gọi là gì?", "Mô-tơ điện", "Máy phát điện", "Công tắc điện", "Mô-tơ là bộ phận biến điện năng thành chuyển động quay."],
      ["Trục trong mô hình xe điện có nhiệm vụ gì?", "Truyền chuyển động quay cho bánh xe", "Chứa điện cho xe chạy", "Bật và tắt nguồn điện", "Trục quay cùng mô-tơ làm bánh xe quay theo."],
      ["Bộ phận nào giữ pin cố định trong mô hình xe điện?", "Hộp đựng pin (khay pin)", "Bánh xe cao su", "Thân xe bằng nhựa", "Hộp pin giúp pin không xê dịch khi xe chạy."],
      ["Vì sao cần siết chặt các vít khi lắp mô hình?", "Để chi tiết chắc chắn, không lỏng khi chạy", "Để mô hình nặng thêm", "Hoàn toàn không cần thiết", "Vít lỏng làm mô hình rung lắc, dễ hỏng khi vận hành."],
      ["Súng bắn keo nến dùng để làm gì khi lắp mô hình?", "Dán, gắn cố định các chi tiết nhẹ", "Cắt các chi tiết cứng", "Đo kích thước chi tiết", "Đầu súng keo rất nóng, em nên nhờ người lớn hỗ trợ khi dùng."],
      ["Thước kẻ và bút chì cần thiết ở bước nào khi lắp ráp?", "Đo và đánh dấu vị trí chi tiết", "Bước chạy thử cuối cùng", "Không cần dùng khi lắp ráp", "Đo và đánh dấu chính xác giúp mô hình cân đối, đẹp hơn."],
      ["Mô hình điện mặt trời thường minh họa cho thiết bị gì?", "Đèn, quạt chạy bằng năng lượng mặt trời", "Máy giặt gia đình", "Tủ lạnh hai cánh lớn", "Ngày nay nhiều đồ dùng thật đã chạy bằng điện mặt trời."],
      ["Khi trời nắng yếu, mô hình điện mặt trời hoạt động thế nào?", "Tạo ít điện, mô-tơ quay chậm hoặc đứng yên", "Hoạt động mạnh hơn bình thường", "Tự chuyển sang chạy bằng xăng", "Hiệu quả của tấm pin mặt trời phụ thuộc nhiều vào ánh nắng."],
      ["Muốn mô hình điện gió phát điện tốt, em đặt mô hình ở đâu?", "Nơi có gió thổi đều và đủ mạnh", "Trong phòng kín không có gió", "Dưới gầm bàn học", "Ngoài thực tế, tuabin gió thường đặt trên đồi cao hoặc ven biển."],
      ["Bóng đèn LED trong các mô hình có vai trò gì?", "Phát sáng báo hiệu mạch có điện", "Sưởi ấm cho mô hình", "Tạo tiếng kêu khi chạy", "LED tiêu thụ rất ít điện và sáng ngay khi có dòng điện nhỏ."],
      ["Vật liệu nào thường dùng làm thân mô hình xe điện học tập?", "Nhựa, bìa cứng hoặc gỗ mỏng nhẹ", "Gang đúc rất nặng", "Kính dày dễ vỡ", "Thân xe nhẹ giúp mô-tơ kéo xe dễ dàng và chạy nhanh hơn."],
      ["Trước khi nối dây vào pin, em cần kiểm tra điều gì?", "Dây không đứt, đầu dây tuốt vỏ vừa đủ", "Màu sắc của dây dẫn", "Tên nhà sản xuất pin", "Đầu dây tuốt vừa đủ giúp tiếp xúc điện tốt và an toàn."],
      ["Mô hình xe điện chạy lệch sang một bên, nguyên nhân có thể là gì?", "Hai bánh không cân đối hoặc trục bị lệch", "Pin có màu khác nhau", "Công tắc đặt ở phía trái", "Kiểm tra bánh xe và trục là bước đầu tiên khi xe chạy lệch."],
      ["Điện gió và điện mặt trời có điểm chung gì?", "Đều là năng lượng sạch, tái tạo được", "Đều phải đốt nhiên liệu", "Đều lấy điện từ pin tiểu", "Nắng và gió là nguồn năng lượng không bao giờ cạn kiệt."],
      ["Bộ phận nào trong mô hình điện gió biến chuyển động thành điện?", "Máy phát điện nhỏ nối với cánh quạt", "Trụ đỡ của mô hình", "Bóng đèn LED kiểm tra", "Cánh quạt quay kéo máy phát quay theo và sinh ra điện."],
      ["Khi trình bày mô hình trước lớp, vì sao cần vận hành thử?", "Chứng minh mô hình hoạt động đúng thiết kế", "Để mô hình chạy cho vui", "Không cần vận hành thử", "Vận hành thử là bằng chứng rõ nhất cho sản phẩm của nhóm em."],
      ["Hai viên pin tiểu 1,5V nối tiếp đúng cực cho tổng điện áp bao nhiêu?", "3 vôn (V)", "1,5 vôn (V)", "220 vôn (V)", "Nối tiếp hai pin 1,5V đúng cực sẽ được 3V — đủ cho nhiều mô hình học tập."],
    ], [["Mô-tơ", "Tạo chuyển động cho xe điện"], ["Tấm pin mặt trời", "Biến ánh sáng thành điện"], ["Cánh quạt gió", "Quay để phát điện"], ["Công tắc", "Đóng/ngắt mạch điện"], ["Pin tiểu 1,5V", "Cung cấp điện cho mô hình"], ["Đèn LED", "Sáng lên khi có điện"], ["Hộp đựng pin", "Giữ pin cố định trong mô hình"], ["Tua-vít", "Siết và tháo các vít nối"]], "Nối bộ phận với chức năng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước LẮP MÔ HÌNH XE ĐIỆN theo đúng thứ tự!", ["Đọc hướng dẫn và kiểm tra đủ chi tiết", "Lắp thân xe và bánh xe", "Lắp mô-tơ, pin và nối dây dẫn", "Đóng công tắc, chạy thử và điều chỉnh"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các bước làm MÔ HÌNH MÁY PHÁT ĐIỆN GIÓ theo đúng thứ tự!", ["Chuẩn bị cánh quạt, máy phát, trụ đỡ", "Lắp cánh quạt vào trục máy phát", "Dựng mô hình lên trụ đỡ và nối đèn LED", "Đưa ra nơi có gió, quan sát đèn sáng"]); });
    return { id: "cn5-thucong", emoji: "🛠️", name: "Thủ công kĩ thuật: mô hình điện", sub: "Bài 7–9 • Mô hình xe điện chạy bằng pin • Máy phát điện gió • Điện mặt trời", pools: kp }; })()
];
/* ================= ĐĂNG KÍ LỚP 5 + ĐẾM + NHÃN + CHỐNG LẶP ================= */
(function () {
  if (typeof GRADES === "undefined" || !GRADES || GRADES[5]) return;
  GRADES[5] = { label: "Lớp 5", subjects: [
    { id: "g5-math", emoji: "🔢", name: "Toán", desc: "9 chủ đề • Số thập phân • Tỉ số phần trăm • Thể tích • Chuyển động đều", cls: "c-coral", topics: MATH5_TOPICS },
    { id: "g5-tv", emoji: "📖", name: "Tiếng Việt", desc: "Từ loại, đại từ • Câu ghép • Liên kết câu • Dấu câu • Đọc hiểu", cls: "c-pink", topics: TV5_TOPICS },
    { id: "g5-eng", emoji: "🔤", name: "Tiếng Anh", desc: "Global Success • Starter + 20 Unit", cls: "c-teal", topics: UNITS5.map(function (u) {
        if (u.n === 0) return { id: "g5-starter", emoji: "🌟", name: "Starter — Làm quen", sub: "Ôn tập: ngày trong tuần • Môn học • Trường lớp", pools: eng5Pools(u) };
        return { id: "g5-u" + u.n, emoji: "📗", name: "Unit " + u.n + " — " + u.title, sub: u.words.map(function (w) { return w[0]; }).join(" • "), pools: eng5Pools(u) };
      }).concat([{ id: "g5-review", emoji: "🌈", name: "Ôn tập tất cả", sub: "Trộn từ của Starter và cả 20 Unit", pools: engPools(ALL_WORDS5) }]) },
    { id: "g5-kh", emoji: "🔬", name: "Khoa học", desc: "6 chủ đề • Chất, năng lượng, sinh sản, vi khuẩn, sức khoẻ, môi trường", cls: "c-sky", topics: KH5_TOPICS },
    { id: "g5-lsdl", emoji: "🗺️", name: "Lịch sử & Địa lí", desc: "6 chủ đề • Việt Nam, các quốc gia đầu tiên, láng giềng, thế giới", cls: "c-brown", topics: LSD5_TOPICS },
    { id: "g5-dd", emoji: "💛", name: "Đạo đức", desc: "8 chủ đề • Tình huống ứng xử, phòng tránh xâm hại, tiền hợp lí", cls: "c-sun", topics: DD5_TOPICS },
    { id: "g5-tin", emoji: "💻", name: "Tin học", desc: "6 chủ đề • Tìm kiếm, bản quyền, soạn thảo, đồ hoạ, lập trình", cls: "c-sky", topics: TIN5_TOPICS },
    { id: "g5-cn", emoji: "🌸", name: "Công nghệ", desc: "Công nghệ và đời sống • Mô hình xe điện, điện gió, điện mặt trời", cls: "c-leaf", topics: CN5_TOPICS }
  ] };
  /* Vẽ lại các nút chọn lớp ở màn hình đăng nhập để Lớp 5 sáng lên */
  function reloginTabs5() {
    renderGradeTabs("login-grades", loginGrade, function (g) { loginGrade = g; reloginTabs5(); }, function (g) { el("login-err").textContent = "Lớp " + g + " sắp ra mắt — hiện đã có Lớp 1, Lớp 2, Lớp 3, Lớp 4, Lớp 5 và Lớp 7 nhé!"; });
  }
  reloginTabs5();
  if (typeof profile !== "undefined" && profile && profile.name && typeof renderSubjects === "function") {
    if (profile.grade === 5) currentGrade = 5;
    renderSubjects(); renderProfileBar();
  }
  /* ---------- Đếm ngân hàng + gắn nhãn + chống lặp ---------- */
  var LS_KEY5 = "gameHocTap_recentQ5_v1";
  var recentStore5 = {};
  try { recentStore5 = JSON.parse(localStorage.getItem(LS_KEY5) || "{}") || {}; } catch (e) { recentStore5 = {}; }
  function saveRecent5() { try { localStorage.setItem(LS_KEY5, JSON.stringify(recentStore5)); } catch (e) {} }
  var G5BANK = {};
  var KNOWLEDGE5 = { "g5-tv": 1, "g5-kh": 1, "g5-lsdl": 1, "g5-dd": 1, "g5-tin": 1, "g5-cn": 1 };
  function capFor5(key) { return Math.max(24, Math.min(80, G5BANK[key] || 30)); }
  function recentHas5(key, sig) { return (recentStore5[key] || []).indexOf(sig) !== -1; }
  function recentAdd5(key, sig) {
    var arr = recentStore5[key] || (recentStore5[key] = []);
    if (arr.indexOf(sig) === -1) arr.push(sig);
    var cap = capFor5(key);
    while (arr.length > cap) arr.shift();
    saveRecent5();
  }
  var roundSeen5 = {};
  var realSetTimeout5 = window.setTimeout;
  window.setTimeout = function () { return 0; };
  try {
    GRADES[5].subjects.forEach(function (subj) {
      subj.topics.forEach(function (t) {
        var key = "5|" + subj.id + "|" + t.id, bankN;
        if (KNOWLEDGE5[subj.id]) {
          bankN = t.pools.choose.length * 3 + 4;
        } else {
          var sigs = {};
          ["choose", "blank", "match", "games"].forEach(function (pk) {
            (t.pools[pk] || []).forEach(function (g) {
              for (var i = 0; i < 12; i++) { try { sigs[qSig5(g())] = 1; } catch (e) {} }
            });
          });
          bankN = Object.keys(sigs).length;
        }
        G5BANK[key] = bankN;
        if (String(t.sub).indexOf("câu hỏi") === -1) t.sub = t.sub + " • " + bankN + "+ câu hỏi";
      });
    });
  } finally { window.setTimeout = realSetTimeout5; }
  GRADES[5].subjects.forEach(function (subj) {
    subj.topics.forEach(function (t) {
      var key = "5|" + subj.id + "|" + t.id;
      ["choose", "blank", "match", "games"].forEach(function (pk) {
        var rawPool = (t.pools[pk] || []).slice();
        if (!rawPool.length) return;
        t.pools[pk] = rawPool.map(function (gen) {
          return function () {
            if (roundSelectionActive) return gen();
            var q = gen(), sig = qSig5(q), tries = 0;
            while ((roundSeen5[sig] || recentHas5(key, sig)) && tries < 12) {
              var alt = rawPool.length > 1 ? pick(rawPool) : gen;
              q = alt(); sig = qSig5(q); tries++;
            }
            roundSeen5[sig] = true;
            recentAdd5(key, sig);
            return q;
          };
        });
      });
    });
  });
  var prevStartGame5 = startGame;
  startGame = function (title, pools) {
    roundSeen5 = {};
    try {
      var key = (typeof currentTopicKey !== "undefined") ? currentTopicKey : "";
      if (key && G5BANK[key] && (recentStore5[key] || []).length >= capFor5(key)) { recentStore5[key] = []; saveRecent5(); }
    } catch (e) {}
    return prevStartGame5(title, pools);
  };
  window.__BANK5 = G5BANK;
})();

/* ---------- Công thức và cách làm (Toán) của Lớp 5 — tách từ bảng ghi chú chung của master ---------- */
window.__MATH_KNOWLEDGE_NOTES = window.__MATH_KNOWLEDGE_NOTES || {};
Object.assign(window.__MATH_KNOWLEDGE_NOTES, {
"m5-ontap": ["Phân số thập phân là phân số có mẫu số 10, 100, 1000… Hỗn số gồm phần nguyên và phần phân số bé hơn 1.","Đổi hỗn số thành phân số: tử số = phần nguyên × mẫu số + tử số của phần phân số; giữ nguyên mẫu số.","Cộng, trừ phân số khác mẫu số: quy đồng mẫu số rồi cộng, trừ các tử số."],
"m5-thapphan": ["Số thập phân gồm phần nguyên và phần thập phân cách nhau bởi dấu phẩy; các hàng thập phân là phần mười, phần trăm, phần nghìn…","So sánh hai số thập phân: so phần nguyên trước; nếu phần nguyên bằng nhau thì so từng hàng thập phân từ trái sang phải.","Làm tròn số thập phân: xét chữ số ngay bên phải hàng cần làm tròn."],
"m5-dientich": ["1 km² = 100 ha; 1 ha = 10 000 m²; 1 km² = 1 000 000 m².","Hai đơn vị đo diện tích kề nhau gấp (hoặc kém) nhau 100 lần.","Giải bài toán diện tích: đổi các số đo về cùng một đơn vị trước khi tính."],
"m5-pheptinh": ["Cộng, trừ số thập phân: đặt dấu phẩy thẳng cột rồi tính như số tự nhiên.","Nhân một số thập phân với 10, 100, 1000: chuyển dấu phẩy sang phải 1, 2, 3 chữ số; chia cho 10, 100, 1000: chuyển dấu phẩy sang trái.","Nhân hai số thập phân: nhân như số tự nhiên, rồi đếm tổng số chữ số ở phần thập phân của hai thừa số để đặt dấu phẩy vào tích.","Chia một số thập phân cho một số thập phân: đếm số chữ số thập phân của số chia để chuyển dấu phẩy ở cả số bị chia và số chia, rồi chia như với số tự nhiên."],
"m5-hinhphang": ["Diện tích hình tam giác = (độ dài đáy × chiều cao) : 2.","Diện tích hình thang = (đáy lớn + đáy bé) × chiều cao : 2.","Chu vi hình tròn = đường kính × 3,14; diện tích hình tròn = bán kính × bán kính × 3,14."],
"m5-tiso": ["Tỉ số của hai số a và b là a : b hay a/b (b khác 0).","Bài toán tổng – tỉ: tìm tổng số phần bằng nhau, tính giá trị một phần = tổng : tổng số phần, rồi nhân với số phần của từng số. Bài toán hiệu – tỉ làm tương tự với hiệu số phần.","Tỉ số phần trăm viết kèm kí hiệu %; tỉ lệ bản đồ cho biết khoảng cách thật gấp khoảng cách trên bản đồ bao nhiêu lần."],
"m5-thetich": ["Thể tích hình hộp chữ nhật = chiều dài × chiều rộng × chiều cao; thể tích hình lập phương = cạnh × cạnh × cạnh.","Diện tích xung quanh của hình hộp chữ nhật = chu vi mặt đáy × chiều cao; diện tích toàn phần = diện tích xung quanh + diện tích hai mặt đáy.","1 m³ = 1000 dm³; 1 dm³ = 1000 cm³; 1 dm³ = 1 lít."],
"m5-chuyendong": ["Vận tốc = quãng đường : thời gian (v = s : t); quãng đường = vận tốc × thời gian (s = v × t); thời gian = quãng đường : vận tốc (t = s : v).","Cộng, trừ, nhân, chia số đo thời gian theo từng đơn vị tương ứng; nhớ 1 giờ = 60 phút, 1 phút = 60 giây.","Hai vật chuyển động ngược chiều: mỗi giờ chúng gần nhau thêm một quãng bằng tổng hai vận tốc."],
"m5-thongke": ["Biểu đồ hình quạt tròn: mỗi hình quạt cho biết tỉ lệ phần trăm của một loại dữ liệu; tổng các tỉ lệ luôn bằng 100%.","Tỉ số số lần lặp lại của một sự kiện = số lần sự kiện xảy ra : tổng số lần thử; tỉ số càng gần 1, sự kiện càng hay xảy ra."]
});
  if (typeof window.__phaseBProcessGrade === "function") window.__phaseBProcessGrade(5);
  if (typeof window.__phaseCompleteGrade === "function") window.__phaseCompleteGrade(5);

/* ================= MỤC 9 (v18) — SVG KHOA HỌC: gắn hình K1/K2/K4 cho Khoa học 5 ================= */
(function () {
  function findT(id) { return findTopic127(5, id); }
  var STATE_NAMES = { ran: "thể rắn", long: "thể lỏng", khi: "thể khí" };
  var STATE_EX = "Hạt xếp khít và có trật tự là thể rắn; hạt khít nhưng lộn xộn là thể lỏng; hạt ở rất xa nhau là thể khí.";
  function k1PanelsGen() {
    var order = shuffle(["ran", "long", "khi"].slice());
    var q;
    if (Math.random() < 0.5) {
      var idx = rand(0, 2);
      q = mcqQ("Quan sát hình ba ô hạt. Ô thứ " + (idx + 1) + " (từ trái sang) cho thấy chất ở thể nào?",
        ["thể rắn", "thể lỏng", "thể khí"].filter(function (s) { return s !== STATE_NAMES[order[idx]]; }),
        STATE_NAMES[order[idx]], STATE_EX);
    } else {
      var st = pick(["ran", "long", "khi"]), pos = order.indexOf(st) + 1;
      q = mcqQ("Quan sát hình ba ô hạt. Ô nào cho thấy chất ở " + STATE_NAMES[st] + "?",
        ["Ô 1", "Ô 2", "Ô 3"].filter(function (s) { return s !== "Ô " + pos; }),
        "Ô " + pos, STATE_EX);
    }
    q.figure = figK1PanelsSVG(order);
    return q;
  }
  var PROC_EX5 = { nc: "Nóng chảy là sự chuyển từ thể rắn sang thể lỏng.", dd: "Đông đặc là sự chuyển từ thể lỏng sang thể rắn.", bh: "Bay hơi là sự chuyển từ thể lỏng sang thể khí.", nt: "Ngưng tụ là sự chuyển từ thể khí sang thể lỏng." };
  function k1TransGen() {
    var procs = [["nc", "Nóng chảy"], ["dd", "Đông đặc"], ["bh", "Bay hơi"], ["nt", "Ngưng tụ"]];
    var ask = pick(procs);
    var labels = { nc: "Nóng chảy", dd: "Đông đặc", bh: "Bay hơi", nt: "Ngưng tụ" };
    labels[ask[0]] = "";
    var q = mcqQ("Quan sát sơ đồ chuyển thể của chất. Quá trình được đánh dấu ? là quá trình nào?",
      procs.filter(function (p) { return p[0] !== ask[0]; }).map(function (p) { return p[1]; }),
      ask[1], PROC_EX5[ask[0]]);
    q.figure = figK1TransSVG(labels);
    return q;
  }
  var CHAINS5 = [
    ["Lúa", "Chuột đồng", "Rắn", "Diều hâu"],
    ["Cỏ", "Dê", "Hổ"],
    ["Tảo", "Tôm nhỏ", "Cá", "Mực"],
    ["Lá cây", "Sâu", "Chim sâu", "Cú mèo"]
  ];
  var OUTS5 = ["Bướm", "Ong mật", "Kiến", "Nhện", "Bọ ngựa", "Chuồn chuồn"];
  function k2ChainGen() {
    var chain = pick(CHAINS5);
    var q;
    if (Math.random() < 0.6) {
      var blank = rand(0, chain.length - 1);
      q = mcqQ("Quan sát chuỗi thức ăn trong hình. Sinh vật ở vị trí ? là sinh vật nào?",
        shuffle(OUTS5.slice()).slice(0, 2), chain[blank],
        "Chuỗi thức ăn: " + chain.join(" → ") + ".");
      q.figure = figK2ChainSVG(chain, blank, false);
    } else {
      var sh = shuffle(chain.slice());
      q = mcqQ("Các sinh vật trong hình thuộc cùng một chuỗi thức ăn. Sinh vật nào là sinh vật SẢN XUẤT (đứng đầu chuỗi)?",
        shuffle(chain.slice(1)).slice(0, 2), chain[0],
        "Sinh vật sản xuất đứng đầu chuỗi thức ăn: " + chain.join(" → ") + ".");
      q.figure = figK2ChainSVG(sh, -1, true);
    }
    return q;
  }
  function k4ShadowGen() {
    var near = Math.random() < 0.5;
    var q;
    if (Math.random() < 0.5) {
      q = mcqQ("Quan sát hình: nguồn sáng chiếu vào một vật cản, phía sau vật là màn. Vùng tối trên màn được gọi là gì?",
        ["Vùng sáng", "Ảnh của vật"], "Bóng của vật",
        "Phần màn không nhận được ánh sáng vì bị vật cản che khuất tạo thành bóng của vật.");
    } else {
      q = mcqQ("Quan sát hình: vì sao trên màn xuất hiện một vùng tối sau vật cản?",
        ["Vì màn tự phát ra màu tối", "Vì nguồn sáng bị tắt"], "Vì vật cản che khuất ánh sáng, vùng đó không nhận được ánh sáng",
        "Ánh sáng truyền theo đường thẳng; vật cản che mất ánh sáng nên phía sau vật có vùng tối là bóng của vật.");
    }
    q.figure = figK4ShadowSVG(near);
    return q;
  }
  var t;
  t = findT("kh5-chat"); if (t) { t.pools.choose.push(k1PanelsGen, k1PanelsGen, k1TransGen); }
  t = findT("kh5-moi"); if (t) { t.pools.choose.push(k2ChainGen, k2ChainGen, k2ChainGen); }
  t = findT("kh5-nangluong"); if (t) { t.pools.choose.push(k4ShadowGen, k4ShadowGen); }
})();
