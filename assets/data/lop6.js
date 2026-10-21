/* ================================================================
   GAME HỌC TẬP — FILE DỮ LIỆU RIÊNG LỚP 6 (assets/data/lop6.js)
   Dữ liệu Lớp 6 (gốc: block Lớp 6 của master).
   Tách nguyên văn từ bản master đã kiểm chứng (MD5 5f54145de040cb8cefc9eeb7cb915cd5);
   trang vỏ nạp động file này khi người chơi chọn Lớp 6.
   ================================================================ */

/* ============================================================
   LỚP 6 — Kết nối tri thức + Global Success (Toán 9 chương
   Bài 1–43, Ngữ văn Bài 1–10, Tiếng Anh 12 Unit, KHTN 10 chương,
   Lịch sử & Địa lí, GDCD 12 bài, Tin học, Công nghệ)
   Đăng kí vào GRADES[6]; chống lặp + nhãn số câu như Lớp 3, 4, 5.
   ============================================================ */
"use strict";
function qSig6(q) {
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
/* ---------- Phân số lớp 6 ---------- */
function gcd6(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function fr6(n, d) { if (d < 0) { n = -n; d = -d; } var g = gcd6(n, d); n = Math.floor(n / g); d = Math.floor(d / g); return d === 1 ? String(n) : n + "/" + d; }
/* Toán hạng CÓ GIÁ TRỊ NGUYÊN thì viết số nguyên (n/n -> 1, 6/2 -> 3) trong câu tính
   phân số (đợt sửa phân số 2026-10-15); toán hạng không nguyên giữ nguyên dạng. */
function opFrac6(n, d) { return n % d === 0 ? String(n / d) : n + "/" + d; }
function frWrongs6(n, d) {
  if (d < 0) { n = -n; d = -d; } var g = gcd6(n, d); n = Math.floor(n / g); d = Math.floor(d / g);
  var ans = fr6(n, d), out = [], seen = {}; seen[ans] = 1;
  var cands = [fr6(n + 1, d), fr6(n, d + 1), fr6(n + d, d), d > 2 ? fr6(n, d - 1) : fr6(n + 2, d), n !== d && n > 0 ? fr6(d, n) : fr6(n + 1, d + 1), fr6(n * 2, d * 2), fr6(Math.max(1, n - 1), d), fr6(n + 1, d + 2), fr6(n + 2, d + 1), fr6(n - 1, d + 1)];
  for (var i = 0; i < cands.length && out.length < 3; i++) { if (!seen[cands[i]]) { seen[cands[i]] = 1; out.push(cands[i]); } }
  var k = 3;
  while (out.length < 3) { var c = fr6(n + k, d + k); if (!seen[c]) { seen[c] = 1; out.push(c); } k++; }
  return out;
}
function frMCQ6(prompt, n, d, explain) {
  var ans = fr6(n, d), wr = frWrongs6(n, d);
  var all = shuffle([ans].concat(wr));
  var q = { prompt: prompt, visual: "", options: all.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: all.indexOf(ans), cols: all.length >= 4 ? 2 : all.length, optStack: true };
  if (explain) q.explain = explain;
  return q;
}
function frBlank6(prompt, n, d, explain) {
  var ans = fr6(n, d), wr = frWrongs6(n, d);
  var all = shuffle([ans, wr[0], wr[1]]);
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: prompt, blankText: ans, explain: explain || null,
    visual: '<div class="sentence">Đáp án: ' + blankSlot() + "</div>",
    options: all.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: all.indexOf(ans), cols: 3 };
}
function numMCQ6(prompt, expr, ans, explain, span) {
  var opts = numOptions(ans, Math.min(0, ans - 5), Math.max(10, ans + 5), 4);
  if (span) { /* mở rộng khoảng đáp án nhiễu cho số lớn */
    var seen = {}; opts.forEach(function (o) { seen[o] = 1; });
    var extra = [ans + span, ans - span, ans + 2 * span, ans * 2, ans + 1, ans - 1];
    var out = [ans], i;
    for (i = 0; i < extra.length && out.length < 4; i++) { if (extra[i] >= 0 && !seen[extra[i]]) { seen[extra[i]] = 1; out.push(extra[i]); } }
    var g = 0; while (out.length < 4 && g++ < 300) { var r = ans + rand(-span * 3, span * 3); if (r >= 0 && !seen[r]) { seen[r] = 1; out.push(r); } }
    opts = shuffle(out);
  }
  var q = { prompt: prompt, visual: expr ? '<div class="expr">' + expr + "</div>" : "", options: opts.map(function (o) { return { html: '<span class="opt-num">' + fmtN(o) + "</span>" }; }), answer: opts.indexOf(ans), cols: 2 };
  if (explain) q.explain = explain;
  return q;
}
function numBlank6(prompt, expr, ans, explain) {
  var opts = numOptions(ans, Math.min(0, ans - 3), Math.max(10, ans + 3), 3);
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: prompt, blankText: fmtN(ans), explain: explain || null,
    visual: '<div class="expr">' + expr.replace("?", blankSlot()) + "</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + fmtN(o) + "</span>" }; }), answer: opts.indexOf(ans), cols: 3 };
}
/* ================= TOÁN 6 — CHƯƠNG I: SỐ TỰ NHIÊN ================= */
function m6ReadWrite() {
  var v = rand(0, 3);
  if (v === 0) { var n = rand(12, 999) * 1000 + rand(1, 999); return numMCQ6("Số “" + fmtN(n) + "” gồm bao nhiêu nghìn?", fmtN(n), Math.floor(n / 1000), "Tách số theo lớp nghìn: phần bên trái dấu cách là số nghìn.", 7); }
  if (v === 1) { var a = rand(2, 9), b = rand(100, 999); var tot = a * 1000000 + b * 1000; return numMCQ6("Số gồm " + a + " triệu và " + b + " nghìn là số nào?", "", tot, a + " triệu = " + fmtN(a * 1000000) + "; cộng thêm " + b + " nghìn = " + fmtN(b * 1000) + ".", 111111); }
  if (v === 2) { var h = rand(1, 9), t = rand(0, 9), u = rand(0, 9); var num = h * 100 + t * 10 + u; return numMCQ6("Giá trị của chữ số " + h + " trong số " + num + " là bao nhiêu?", num, h * 100, "Chữ số " + h + " ở hàng trăm nên có giá trị " + (h * 100) + ".", 40); }
  var m = rand(21, 99) * 10000 + rand(100, 999);
  return mcqQ("Khi đọc số " + fmtN(m) + ", ta đọc thế nào cho đúng?", ["Đọc từ phải sang trái, bắt đầu từ hàng đơn vị", "Chỉ đọc các chữ số khác 0"], "Đọc từ trái sang phải theo từng lớp: nghìn, trăm, chục, đơn vị", "Khi đọc số tự nhiên, ta tách số thành từng lớp (đơn vị, nghìn, triệu...) và đọc từ trái sang phải.");
}
function m6DigitValue() {
  var posNames = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn"];
  var digits = [], n = 0, mult = 1;
  for (var i = 0; i < 5; i++) { var d = i === 4 ? rand(1, 9) : rand(0, 9); digits.push(d); n += d * mult; mult *= 10; }
  var pos = rand(0, 4); while (digits[pos] === 0) pos = rand(0, 4);
  var val = digits[pos] * Math.pow(10, pos);
  return numMCQ6("Trong số " + fmtN(n) + ", chữ số " + digits[pos] + " ở hàng " + posNames[pos] + " có giá trị là bao nhiêu?", fmtN(n), val, "Chữ số ở hàng " + posNames[pos] + " nên nhân với " + fmtN(Math.pow(10, pos)) + ": " + digits[pos] + " × " + fmtN(Math.pow(10, pos)) + " = " + fmtN(val) + ".", 900);
}
function m6Arith() {
  var v = rand(0, 3);
  if (v === 0) { var a = rand(1200, 98000), b = rand(1100, 89000); return numMCQ6("Tính!", a + " + " + b + " = ?", a + b, "Cộng lần lượt từ hàng đơn vị sang trái: " + fmtN(a) + " + " + fmtN(b) + " = " + fmtN(a + b) + ".", 1010); }
  if (v === 1) { var c = rand(5000, 99000), d = rand(1100, c - 100); return numMCQ6("Tính!", c + " − " + d + " = ?", c - d, "Trừ lần lượt từ hàng đơn vị sang trái: " + fmtN(c) + " − " + fmtN(d) + " = " + fmtN(c - d) + ".", 1010); }
  if (v === 2) { var e = rand(23, 98), f = rand(12, 49); return numMCQ6("Tính!", e + " × " + f + " = ?", e * f, e + " × " + f + " = " + fmtN(e * f) + ".", 110); }
  var g = rand(12, 60), h = rand(3, 12); var prod = g * h;
  return numMCQ6("Tính!", prod + " : " + h + " = ?", g, "Vì " + h + " × " + g + " = " + prod + " nên " + prod + " : " + h + " = " + g + ".", 6);
}
function m6Pow() {
  var v = rand(0, 2);
  if (v === 0) { var a = rand(2, 10), e = pick([2, 3]); var ans = Math.pow(a, e); return numMCQ6("Tính luỹ thừa!", a + "<sup>" + e + "</sup> = ?", ans, a + "<sup>" + e + "</sup> = " + (e === 2 ? a + " × " + a : a + " × " + a + " × " + a) + " = " + ans + ".", 9); }
  if (v === 1) { var b = rand(2, 9); return mcqQ("Luỹ thừa " + b + "<sup>2</sup> đọc là gì và bằng bao nhiêu?", [b + " mũ ba, bằng " + (b * b * b), "Hai nhân " + b + ", bằng " + (2 * b)], b + " mũ hai (bình phương của " + b + "), bằng " + (b * b), b + "<sup>2</sup> = " + b + " × " + b + " = " + (b * b) + "."); }
  var c = rand(2, 6), d = rand(2, 5); var p = Math.pow(c, d), q = Math.pow(d, c);
  if (p === q) return m6Pow();
  var big = p > q ? c + "<sup>" + d + "</sup> = " + p : d + "<sup>" + c + "</sup> = " + q;
  var small = p > q ? d + "<sup>" + c + "</sup> = " + q : c + "<sup>" + d + "</sup> = " + p;
  var all = shuffle([big, small]);
  return { prompt: "Luỹ thừa nào có giá trị LỚN hơn?", visual: '<div class="expr">' + c + "<sup>" + d + "</sup> &nbsp; và &nbsp; " + d + "<sup>" + c + "</sup></div>", options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: all.indexOf(big), cols: 2, optStack: true, explain: c + "<sup>" + d + "</sup> = " + p + "; " + d + "<sup>" + c + "</sup> = " + q + "." };
}
function m6OrderOps() {
  var v = rand(0, 3);
  if (v === 0) { var a = rand(5, 60), b = rand(3, 12), c = rand(2, 9); return numMCQ6("Tính giá trị biểu thức (nhớ thứ tự: nhân chia trước, cộng trừ sau)!", a + " + " + b + " × " + c + " = ?", a + b * c, "Nhân trước: " + b + " × " + c + " = " + (b * c) + "; rồi cộng: " + a + " + " + (b * c) + " = " + (a + b * c) + ".", 11); }
  if (v === 1) { var d = rand(5, 40), e = rand(3, 30), f = rand(2, 9); return numMCQ6("Tính giá trị biểu thức (làm trong ngoặc trước)!", "(" + d + " + " + e + ") × " + f + " = ?", (d + e) * f, "Trong ngoặc trước: " + d + " + " + e + " = " + (d + e) + "; rồi nhân: " + (d + e) + " × " + f + " = " + ((d + e) * f) + ".", 21); }
  if (v === 2) { var g = rand(40, 120), h = rand(2, 9), k = rand(2, 9); var div = g - (g % h); return numMCQ6("Tính giá trị biểu thức!", div + " : " + h + " + " + k + " × " + k + " = ?", div / h + k * k, "Chia và nhân trước: " + div + " : " + h + " = " + (div / h) + ", " + k + " × " + k + " = " + (k * k) + "; cộng lại được " + (div / h + k * k) + ".", 7); }
  var m = rand(30, 90), n = rand(2, 9), p = rand(2, 8);
  return numMCQ6("Tính giá trị biểu thức!", m + " − " + n + " × " + p + " = ?", m - n * p, "Nhân trước: " + n + " × " + p + " = " + (n * p) + "; rồi trừ: " + m + " − " + (n * p) + " = " + (m - n * p) + ".", 9);
}
function m6WordNat() {
  var v = rand(0, 2);
  if (v === 0) { var a = rand(6, 15), b = rand(120, 480); return numMCQ6("Một trường có " + a + " lớp, mỗi lớp có " + b + " quyển vở được phát đều... Tổng số vở là bao nhiêu?", a + " × " + b, a * b, "Tổng số vở = số lớp × số vở mỗi lớp = " + a + " × " + b + " = " + fmtN(a * b) + ".", 210); }
  if (v === 1) { var t = rand(240, 960), k = rand(4, 12); while (t % k !== 0) { t = rand(240, 960); } return numMCQ6("Có " + t + " cái kẹo chia đều cho " + k + " bạn. Mỗi bạn được bao nhiêu cái kẹo?", t + " : " + k, t / k, t + " : " + k + " = " + (t / k) + ".", 9); }
  var x = rand(15000, 60000), y = rand(5000, 40000);
  return numMCQ6("Mẹ mua hàng hết " + fmtN(x) + " đồng, đưa tờ 100 000 đồng. Người bán trả lại bao nhiêu?", "100 000 − " + fmtN(x), 100000 - x, "Số tiền trả lại = 100 000 − " + fmtN(x) + " = " + fmtN(100000 - x) + " đồng.", 1010);
}
/* ================= TOÁN 6 — CHƯƠNG II: TÍNH CHIA HẾT ================= */
function m6DivRule() {
  var rules = [
    { d: 2, test: function (n) { return n % 2 === 0; }, note: "Số chia hết cho 2 có chữ số tận cùng là 0, 2, 4, 6, 8." },
    { d: 5, test: function (n) { return n % 5 === 0; }, note: "Số chia hết cho 5 có chữ số tận cùng là 0 hoặc 5." },
    { d: 3, test: function (n) { return n % 3 === 0; }, note: "Số chia hết cho 3 khi tổng các chữ số của nó chia hết cho 3." },
    { d: 9, test: function (n) { return n % 9 === 0; }, note: "Số chia hết cho 9 khi tổng các chữ số của nó chia hết cho 9." }
  ];
  var r = pick(rules);
  var good = [], bad = [], guard = 0;
  while (good.length < 1 && guard++ < 500) { var n = rand(12, 999); if (r.test(n)) good.push(n); }
  while (bad.length < 3 && guard++ < 900) { var m = rand(12, 999); if (!r.test(m) && bad.indexOf(m) === -1 && good.indexOf(m) === -1) bad.push(m); }
  var all = shuffle(good.concat(bad));
  return { prompt: "Số nào sau đây chia hết cho " + r.d + "?", visual: "", options: all.map(function (o) { return { html: '<span class="opt-num">' + fmtN(o) + "</span>" }; }), answer: all.indexOf(good[0]), cols: 2, explain: r.note + " Kiểm tra: " + fmtN(good[0]) + " chia hết cho " + r.d + "." };
}
function m6DivSum() {
  var d = pick([3, 9]);
  var n = rand(111, 9999), s = 0, x = n;
  while (x > 0) { s += x % 10; x = Math.floor(x / 10); }
  var yes = (n % d === 0);
  return mcqQ("Tổng các chữ số của " + fmtN(n) + " là " + s + ". Số " + fmtN(n) + " có chia hết cho " + d + " không?", [yes ? "Không chia hết" : "Có chia hết", "Chỉ chia hết cho " + (d === 3 ? 9 : 3)], yes ? "Có, vì tổng các chữ số " + s + " chia hết cho " + d : "Không, vì tổng các chữ số " + s + " không chia hết cho " + d, "Dấu hiệu chia hết cho " + d + ": tổng các chữ số chia hết cho " + d + " thì số đó chia hết cho " + d + ". Ở đây tổng là " + s + ".");
}
function m6Prime() {
  var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
  var comps = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 33, 35, 39];
  var v = rand(0, 1);
  if (v === 0) { var p = pick(primes); var cs = shuffle(comps.slice()).slice(0, 3); var all = shuffle([p].concat(cs)); return { prompt: "Số nào là SỐ NGUYÊN TỐ?", visual: "", options: all.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: all.indexOf(p), cols: 4, explain: "Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có hai ước là 1 và chính nó. " + p + " là số nguyên tố." }; }
  var c = pick(comps); var ps = shuffle(primes.slice()).slice(0, 3); var all2 = shuffle([c].concat(ps));
  return { prompt: "Số nào là HỢP SỐ?", visual: "", options: all2.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: all2.indexOf(c), cols: 4, explain: "Hợp số là số tự nhiên lớn hơn 1, có nhiều hơn hai ước. " + c + " là hợp số." };
}
function m6GCD() {
  var a = rand(6, 60), b = rand(6, 60); while (b === a) b = rand(6, 60);
  var g = gcd6(a, b);
  return numMCQ6("Tìm ƯCLN của " + a + " và " + b + "!", "ƯCLN(" + a + ", " + b + ")", g, "Ước chung lớn nhất của " + a + " và " + b + " là " + g + " (cả hai số đều chia hết cho " + g + ").", 2);
}
function m6LCM() {
  var a = pick([4, 6, 8, 9, 10, 12, 15]), b = pick([3, 4, 5, 6, 8, 9, 10, 12]); while (b === a) b = pick([3, 4, 5, 6, 8, 9, 10, 12]);
  var l = a * b / gcd6(a, b);
  return numMCQ6("Tìm BCNN của " + a + " và " + b + "!", "BCNN(" + a + ", " + b + ")", l, "Bội chung nhỏ nhất của " + a + " và " + b + " là " + l + ".", 6);
}
function m6UocBoi() {
  var v = rand(0, 2);
  if (v === 0) { var n = pick([6, 8, 10, 12, 15, 18, 20, 24]); var u = []; for (var i = 1; i <= n; i++) if (n % i === 0) u.push(i); return numMCQ6("Số " + n + " có bao nhiêu ước tự nhiên?", "Ư(" + n + ")", u.length, "Các ước của " + n + " là: " + u.join(", ") + " — có " + u.length + " ước.", 1); }
  if (v === 1) { var m = rand(3, 9), k = rand(3, 8); return numMCQ6("Bội thứ " + k + " của " + m + " (tính từ bội khác 0 đầu tiên: " + m + ", " + (2 * m) + ", ...) là số nào?", "B(" + m + ")", m * k, "Các bội của " + m + ": " + m + ", " + (2 * m) + ", " + (3 * m) + "... Bội thứ " + k + " là " + (m * k) + ".", 3); }
  var a = rand(12, 90), b = rand(2, 9);
  var isD = a % b === 0;
  return mcqQ(a + " có là bội của " + b + " không?", [isD ? "Không" : "Có, vì " + a + " chia hết cho " + b, "Chỉ khi " + a + " < " + b], isD ? "Có, vì " + a + " : " + b + " = " + (a / b) + " (chia hết)" : "Không, vì " + a + " chia cho " + b + " còn dư " + (a % b), "a là bội của b khi a chia hết cho b.");
}
/* ================= TOÁN 6 — CHƯƠNG III: SỐ NGUYÊN ================= */
function m6IntAddSub() {
  var v = rand(0, 3);
  if (v === 0) { var a = rand(3, 40), b = rand(3, 40); return numMCQ6("Tính!", "(−" + a + ") + (−" + b + ") = ?", -(a + b), "Cộng hai số nguyên âm: cộng hai giá trị tuyệt đối rồi đặt dấu trừ: −(" + a + " + " + b + ") = −" + (a + b) + ".", 3); }
  if (v === 1) { var c = rand(5, 50), d = rand(5, 50); var ans = c - d; var opts = shuffle([ans, -(c - d) === ans ? ans + 2 : -(c - d), c + d, d - c].filter(function (x, i, arr) { return arr.indexOf(x) === i; })); while (opts.length < 4) { var r = ans + rand(-9, 9); if (opts.indexOf(r) === -1) opts.push(r); } opts = shuffle(opts); return { prompt: "Tính!", visual: '<div class="expr">' + c + " + (−" + d + ") = ?</div>", options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 4, explain: "Cộng số nguyên khác dấu: lấy số lớn trừ số bé (theo giá trị tuyệt đối), dấu theo số lớn hơn: " + c + " + (−" + d + ") = " + ans + "." }; }
  if (v === 2) { var e = rand(5, 45), f = rand(5, 45); return numMCQ6("Tính!", "(−" + e + ") − (−" + f + ") = ?", f - e, "Trừ một số nguyên âm bằng cộng số đối: (−" + e + ") + " + f + " = " + (f - e) + ".", 3); }
  var g = rand(10, 60), h = rand(10, 60);
  return numMCQ6("Tính!", g + " − (−" + h + ") = ?", g + h, "Trừ số âm bằng cộng số dương: " + g + " + " + h + " = " + (g + h) + ".", 5);
}
function m6IntMulDiv() {
  var v = rand(0, 2);
  if (v === 0) { var a = rand(2, 12), b = rand(2, 12); return numMCQ6("Tính!", "(−" + a + ") × " + b + " = ?", -a * b, "Nhân hai số nguyên khác dấu cho kết quả âm: −(" + a + " × " + b + ") = −" + (a * b) + ".", 4); }
  if (v === 1) { var c = rand(2, 12), d = rand(2, 12); return numMCQ6("Tính!", "(−" + c + ") × (−" + d + ") = ?", c * d, "Nhân hai số nguyên cùng dấu (đều âm) cho kết quả dương: " + (c * d) + ".", 4); }
  var e = rand(2, 12), f = rand(2, 12); var p = e * f;
  return numMCQ6("Tính!", "(−" + p + ") : " + f + " = ?", -e, "Chia hai số nguyên khác dấu cho kết quả âm: −" + p + " : " + f + " = −" + e + ".", 2);
}
function m6IntParen() {
  var v = rand(0, 2);
  if (v === 0) { var a = rand(10, 50), b = rand(3, 30), c = rand(3, 30); return numMCQ6("Tính (quy tắc dấu ngoặc)!", a + " − (" + b + " − " + c + ") = ?", a - b + c, "Bỏ ngoặc có dấu trừ đằng trước: đổi dấu mọi số hạng trong ngoặc: " + a + " − " + b + " + " + c + " = " + (a - b + c) + ".", 4); }
  if (v === 1) { var d = rand(5, 40), e = rand(3, 30), f = rand(3, 30); return numMCQ6("Tính (quy tắc dấu ngoặc)!", "−(" + d + " + " + e + ") + " + f + " = ?", -d - e + f, "Bỏ ngoặc sau dấu trừ: −(" + d + " + " + e + ") = −" + d + " − " + e + "; cộng " + f + " được " + (-d - e + f) + ".", 4); }
  var g = rand(10, 40), h = rand(2, 20), k = rand(2, 20);
  return numMCQ6("Tính (làm trong ngoặc trước)!", "(" + g + " − " + h + ") − " + k + " = ?", g - h - k, "Trong ngoặc trước: " + g + " − " + h + " = " + (g - h) + "; rồi trừ " + k + ": " + (g - h - k) + ".", 4);
}
function m6IntContext() {
  var v = rand(0, 2);
  if (v === 0) { var t = rand(2, 15), d = rand(3, 12); return numMCQ6("Nhiệt độ buổi sáng là −" + t + "°C. Buổi trưa nhiệt độ TĂNG " + d + "°C. Nhiệt độ buổi trưa là bao nhiêu?", "−" + t + " + " + d, d - t, "Nhiệt độ mới = −" + t + " + " + d + " = " + (d - t) + "°C.", 2); }
  if (v === 1) { var dep = rand(20, 90); return numMCQ6("Một thợ lặn đang ở độ cao −" + dep + " m so với mực nước biển (tức dưới mặt nước " + dep + " m). Anh ta nổi lên 15 m. Độ cao mới là bao nhiêu mét?", "−" + dep + " + 15", 15 - dep, "Độ cao mới = −" + dep + " + 15 = " + (15 - dep) + " m.", 3); }
  var debt = rand(50, 300), pay = rand(20, debt - 10);
  return numMCQ6("Một cửa hàng ghi sổ: đang nợ " + debt + " nghìn đồng, viết là −" + debt + ". Cửa hàng trả được " + pay + " nghìn đồng. Số ghi sổ mới là bao nhiêu (nghìn đồng)?", "−" + debt + " + " + pay, pay - debt, "Còn nợ " + (debt - pay) + " nghìn đồng nên ghi −" + (debt - pay) + ".", 10);
}
/* ================= TOÁN 6 — CHƯƠNG IV: HÌNH PHẲNG (SVG) ================= */
function shape6SVG(kind) {
  var st = 'stroke="#2f6db3" stroke-width="4" fill="#bcd7f5" stroke-linejoin="round"';
  var shapes = {
    "tamgiacdeu": '<polygon points="100,25 165,135 35,135" ' + st + "/>",
    "tamgiac": '<polygon points="45,135 175,135 130,40" ' + st + "/>",
    "vuong": '<rect x="55" y="35" width="90" height="90" ' + st + "/>",
    "chunhat": '<rect x="35" y="50" width="130" height="60" ' + st + "/>",
    "lucgiac": '<polygon points="100,22 162,55 162,115 100,148 38,115 38,55" ' + st + "/>",
    "ngugiac": '<polygon points="100,25 165,75 140,140 60,140 35,75" ' + st + "/>",
    "thoi": '<polygon points="100,25 160,85 100,145 40,85" ' + st + "/>",
    "binhhanh": '<polygon points="60,45 170,45 140,125 30,125" ' + st + "/>",
    "thangcan": '<polygon points="65,45 135,45 165,125 35,125" ' + st + "/>",
    "tron": '<circle cx="100" cy="85" r="58" ' + st + "/>"
  };
  var NAMES6 = { "tamgiacdeu": "Tam giác đều", "tamgiac": "Tam giác thường", "vuong": "Hình vuông", "chunhat": "Hình chữ nhật", "lucgiac": "Lục giác đều", "ngugiac": "Ngũ giác đều", "thoi": "Hình thoi", "binhhanh": "Hình bình hành", "thangcan": "Hình thang cân", "tron": "Hình tròn" };
  return '<svg viewBox="0 0 200 170" style="width:min(240px,70vw)"><title>' + (NAMES6[kind] || "") + "</title>" + (shapes[kind] || shapes.tron) + "</svg>";
}
var SHAPES6 = [
  ["tamgiacdeu", "Tam giác đều"], ["vuong", "Hình vuông"], ["lucgiac", "Lục giác đều"], ["chunhat", "Hình chữ nhật"],
  ["thoi", "Hình thoi"], ["binhhanh", "Hình bình hành"], ["thangcan", "Hình thang cân"], ["tamgiac", "Tam giác thường"], ["tron", "Hình tròn"]
];
function m6ShapeID() {
  var s = pick(SHAPES6);
  var others = shuffle(SHAPES6.filter(function (x) { return x[0] !== s[0]; })).slice(0, 3);
  var all = shuffle([s].concat(others));
  return { prompt: "Hình dưới đây là hình gì?", visual: shape6SVG(s[0]), options: all.map(function (o) { return { html: '<span class="opt-text">' + o[1] + "</span>" }; }), answer: all.indexOf(s), cols: 2, explain: "Đây là " + s[1].toLowerCase() + "." };
}
function m6ShapeProps() {
  var v = rand(0, 3);
  if (v === 0) return mcqQ("Tam giác đều có đặc điểm gì?", ["Có 3 cạnh không bằng nhau", "Chỉ có 2 cạnh bằng nhau"], "Có 3 cạnh bằng nhau và 3 góc bằng nhau (mỗi góc 60°)", "Tam giác đều: ba cạnh bằng nhau, ba góc đều bằng 60°.");
  if (v === 1) return mcqQ("Lục giác đều có bao nhiêu cạnh, bao nhiêu góc?", ["5 cạnh, 5 góc", "8 cạnh, 8 góc"], "6 cạnh bằng nhau, 6 góc bằng nhau", "Lục giác đều có 6 cạnh bằng nhau và 6 góc bằng nhau.");
  if (v === 2) return mcqQ("Hình thoi có đặc điểm nào sau đây?", ["Có 4 cạnh không bằng nhau", "Có hai đường chéo không cắt nhau"], "Có 4 cạnh bằng nhau, hai đường chéo vuông góc với nhau", "Hình thoi: bốn cạnh bằng nhau, các cạnh đối song song, hai đường chéo vuông góc và cắt nhau tại trung điểm.");
  return mcqQ("Hình thang cân có đặc điểm gì?", ["Có hai cạnh bên không bằng nhau", "Có hai đáy không song song"], "Có hai cạnh bên bằng nhau và hai góc kề một đáy bằng nhau", "Hình thang cân: hai cạnh bên bằng nhau, hai góc kề cùng một đáy bằng nhau, hai đường chéo bằng nhau.");
}
function m6PeriArea() {
  var v = rand(0, 5);
  if (v === 0) { var a = rand(4, 25), b = rand(3, 20); var q0 = numMCQ6("Hình chữ nhật có chiều dài " + a + " cm, chiều rộng " + b + " cm. Chu vi hình chữ nhật là bao nhiêu cm?", "C = (" + a + " + " + b + ") × 2", (a + b) * 2, "Chu vi hình chữ nhật = (dài + rộng) × 2 = (" + a + " + " + b + ") × 2 = " + ((a + b) * 2) + " cm.", 6); q0.figure = figRectSVG(a, b); return q0; }
  if (v === 1) { var c = rand(4, 25), d = rand(3, 20); var q1 = numMCQ6("Hình chữ nhật có chiều dài " + c + " cm, chiều rộng " + d + " cm. Diện tích hình chữ nhật là bao nhiêu cm²?", "S = " + c + " × " + d, c * d, "Diện tích hình chữ nhật = dài × rộng = " + c + " × " + d + " = " + (c * d) + " cm².", 9); q1.figure = figRectSVG(c, d); return q1; }
  if (v === 2) { var e = rand(3, 20); var q2 = numMCQ6("Hình vuông có cạnh " + e + " cm. Diện tích hình vuông là bao nhiêu cm²?", "S = " + e + " × " + e, e * e, "Diện tích hình vuông = cạnh × cạnh = " + (e * e) + " cm².", 7); q2.figure = figSquareSVG(e); return q2; }
  if (v === 3) { var f = rand(4, 18), g = rand(3, 15); var q3 = numMCQ6("Hình bình hành có cạnh đáy " + f + " cm, chiều cao tương ứng " + g + " cm. Diện tích là bao nhiêu cm²?", "S = " + f + " × " + g, f * g, "Diện tích hình bình hành = đáy × chiều cao = " + f + " × " + g + " = " + (f * g) + " cm².", 8); q3.figure = figParaSVG(f, g); return q3; }
  if (v === 4) { var h = rand(4, 16), k = rand(4, 16); var s = h * k / 2; var opts = shuffle([s, h * k, s + 4, h * k + 2].filter(function (x, i, arr) { return arr.indexOf(x) === i; })); while (opts.length < 4) { var r = s + rand(1, 12); if (opts.indexOf(r) === -1) opts.push(r); } opts = shuffle(opts); return { prompt: "Hình thoi có hai đường chéo dài " + h + " cm và " + k + " cm. Diện tích hình thoi là bao nhiêu cm²?", figure: figRhombusDiagSVG(h, k), visual: "", options: opts.map(function (o) { return { html: '<span class="opt-num">' + numStr5(o) + " cm²</span>" }; }), answer: opts.indexOf(s), cols: 2, explain: "Diện tích hình thoi = (đường chéo 1 × đường chéo 2) : 2 = (" + h + " × " + k + ") : 2 = " + numStr5(s) + " cm²." }; }
  var m = rand(5, 18), n = rand(3, m - 1), p = rand(3, 12); var s2 = (m + n) * p / 2;
  var opts2 = shuffle([s2, (m + n) * p, m * p, (m - n) * p].filter(function (x, i, arr) { return arr.indexOf(x) === i && x > 0; })); while (opts2.length < 4) { var r2 = s2 + rand(2, 15); if (opts2.indexOf(r2) === -1) opts2.push(r2); } opts2 = shuffle(opts2);
  return { prompt: "Hình thang có hai đáy " + m + " cm và " + n + " cm, chiều cao " + p + " cm. Diện tích hình thang là bao nhiêu cm²?", figure: figTrapSVG(m, n, p), visual: "", options: opts2.map(function (o) { return { html: '<span class="opt-num">' + numStr5(o) + " cm²</span>" }; }), answer: opts2.indexOf(s2), cols: 2, explain: "Diện tích hình thang = (đáy lớn + đáy bé) × chiều cao : 2 = (" + m + " + " + n + ") × " + p + " : 2 = " + numStr5(s2) + " cm²." };
}
/* ================= TOÁN 6 — CHƯƠNG V: TÍNH ĐỐI XỨNG ================= */
function m6SymAxis() {
  var data = [
    ["vuong", "Hình vuông", 4, true], ["chunhat", "Hình chữ nhật", 2, true], ["tamgiacdeu", "Tam giác đều", 3, true],
    ["thoi", "Hình thoi", 2, true], ["thangcan", "Hình thang cân", 1, true], ["tron", "Hình tròn", -1, true],
    ["binhhanh", "Hình bình hành", 0, false], ["tamgiac", "Tam giác thường", 0, false], ["lucgiac", "Lục giác đều", 6, true]
  ];
  var v = rand(0, 2);
  if (v === 0) { var d = pick(data); var optsArr = shuffle([{ t: "Có, hình có trục đối xứng", ok: d[3] }, { t: "Không, hình không có trục đối xứng", ok: !d[3] }]); return { prompt: d[1] + " dưới đây có trục đối xứng không?", visual: shape6SVG(d[0]), options: optsArr.map(function (o) { return { html: '<span class="opt-text">' + o.t + "</span>" }; }), answer: optsArr.findIndex(function (o) { return o.ok; }), cols: 1, optStack: true, explain: d[1] + (d[3] ? " có trục đối xứng — gấp hình theo trục đó, hai nửa trùng khít nhau." : " không có trục đối xứng.") }; }
  if (v === 1) { var e = pick(data.filter(function (x) { return x[2] > 0; })); var opts = numOptions(e[2], 0, 8, 4); return { prompt: e[1] + " có bao nhiêu trục đối xứng?", visual: shape6SVG(e[0]), options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(e[2]), cols: 4, explain: e[1] + " có " + e[2] + " trục đối xứng." }; }
  var yes = pick(data.filter(function (x) { return x[3]; })), no = shuffle(data.filter(function (x) { return !x[3]; })).slice(0, 3);
  var all = shuffle([yes].concat(no));
  return { prompt: "Hình nào sau đây CÓ trục đối xứng?", visual: "", options: all.map(function (o) { return { html: '<span class="opt-text">' + o[1] + "</span>" }; }), answer: all.indexOf(yes), cols: 2, explain: yes[1] + " có trục đối xứng; các hình còn lại (tam giác thường, hình bình hành thường) không có trục đối xứng." };
}
function m6SymLetter() {
  var letters = [["A", true], ["B", true], ["C", true], ["D", true], ["E", true], ["H", true], ["I", true], ["O", true], ["X", true], ["M", true], ["T", true], ["U", true], ["V", true], ["W", true], ["Y", true], ["N", false], ["S", false], ["P", false], ["L", false], ["G", false], ["R", false], ["F", false], ["J", false], ["Q", false]];
  var v = rand(0, 1);
  if (v === 0) {
    var yes = pick(letters.filter(function (l) { return l[1]; }));
    var nos = shuffle(letters.filter(function (l) { return !l[1]; })).slice(0, 3);
    var all = shuffle([yes].concat(nos));
    return { prompt: "Chữ cái in hoa nào sau đây CÓ trục đối xứng?", visual: "", options: all.map(function (o) { return { html: '<span class="opt-word">' + o[0] + "</span>" }; }), answer: all.indexOf(yes), cols: 4, explain: "Chữ " + yes[0] + " có trục đối xứng; các chữ " + nos.map(function (x) { return x[0]; }).join(", ") + " không có trục đối xứng." };
  }
  var no = pick(letters.filter(function (l) { return !l[1]; }));
  var yess = shuffle(letters.filter(function (l) { return l[1]; })).slice(0, 3);
  var all2 = shuffle([no].concat(yess));
  return { prompt: "Chữ cái in hoa nào sau đây KHÔNG có trục đối xứng?", visual: "", options: all2.map(function (o) { return { html: '<span class="opt-word">' + o[0] + "</span>" }; }), answer: all2.indexOf(no), cols: 4, explain: "Chữ " + no[0] + " không có trục đối xứng; các chữ còn lại đều có trục đối xứng." };
}
function m6SymCenter2() {
  var v = rand(0, 2);
  if (v === 0) return mcqQ("Hình nào sau đây KHÔNG có tâm đối xứng?", ["Hình chữ nhật", "Hình tròn"], "Tam giác đều", "Tam giác đều chỉ có trục đối xứng, không có tâm đối xứng. Hình chữ nhật, hình tròn, hình vuông, hình thoi, hình bình hành đều có tâm đối xứng.");
  if (v === 1) return mcqQ("Chữ cái in hoa nào sau đây có TÂM đối xứng?", ["Chữ A", "Chữ M"], "Chữ H", "Chữ H vừa có trục đối xứng vừa có tâm đối xứng. Chữ N, S, Z cũng có tâm đối xứng nhưng không có trục đối xứng.");
  return mcqQ("Một hình vừa có trục đối xứng vừa có tâm đối xứng là hình nào?", ["Tam giác cân", "Hình thang cân"], "Hình vuông", "Hình vuông có 4 trục đối xứng và có tâm đối xứng là giao điểm hai đường chéo.");
}
function m6SymCenter() {
  var v = rand(0, 1);
  if (v === 0) return mcqQ("Hình nào sau đây có TÂM đối xứng?", ["Tam giác đều", "Hình thang cân"], "Hình bình hành", "Hình bình hành, hình vuông, hình chữ nhật, hình thoi, hình tròn đều có tâm đối xứng. Tam giác đều và hình thang cân chỉ có trục đối xứng, không có tâm đối xứng.");
  return mcqQ("Tâm đối xứng của hình bình hành nằm ở đâu?", ["Ở một đỉnh của hình", "Ở trung điểm của một cạnh"], "Ở giao điểm của hai đường chéo", "Tâm đối xứng của hình bình hành là giao điểm hai đường chéo — điểm mà quay hình 180° quanh nó thì hình trùng với chính nó.");
}
/* ================= TOÁN 6 — CHƯƠNG VI: PHÂN SỐ ================= */
function m6FracEqual() {
  var v = rand(0, 1);
  if (v === 0) { var d = pick([3, 4, 5, 6, 8, 10]), n = rand(1, d - 1), k = rand(2, 6); return frMCQ6("Phân số bằng phân số " + n + "/" + d + " là phân số nào? (Tìm phân số " + (n * k) + "/" + (d * k) + " viết gọn)", n * k, d * k, "Nhân cả tử và mẫu với cùng một số: " + n + "/" + d + " = " + (n * k) + "/" + (d * k) + ", rút gọn bằng cách chia cả tử và mẫu cho " + k + " được " + n + "/" + d + "."); }
  var a = rand(2, 15), b = rand(3, 16); while (b === a) b = rand(3, 16);
  return frMCQ6("Rút gọn phân số " + a + "/" + b + " đến tối giản được:", a, b, "Chia cả tử và mẫu cho ƯCLN(" + a + ", " + b + ") = " + gcd6(a, b) + " được " + fr6(a, b) + ".");
}
function m6FracCompare() {
  var v = rand(0, 2);
  if (v === 0) { var d = pick([5, 6, 7, 8, 9]), a = rand(1, d - 1), b = rand(1, d - 1); while (b === a) b = rand(1, d - 1); var big = Math.max(a, b); return frMCQ6("Trong hai phân số " + a + "/" + d + " và " + b + "/" + d + ", phân số nào LỚN hơn?", big, d, "Hai phân số cùng mẫu: phân số có tử lớn hơn thì lớn hơn. " + big + "/" + d + " > " + Math.min(a, b) + "/" + d + "."); }
  if (v === 1) { var n1 = rand(1, 4), d1 = pick([3, 4, 5, 6]), n2 = rand(1, 4), d2 = pick([4, 5, 6, 8]); if (n1 * d2 === n2 * d1) return m6FracCompare(); var win = n1 * d2 > n2 * d1 ? [n1, d1] : [n2, d2]; return frMCQ6("So sánh: phân số nào LỚN hơn, " + n1 + "/" + d1 + " hay " + n2 + "/" + d2 + "?", win[0], win[1], "Quy đồng hoặc nhân chéo: " + n1 + " × " + d2 + " = " + (n1 * d2) + " và " + n2 + " × " + d1 + " = " + (n2 * d1) + ". Phân số có tích chéo lớn hơn thì lớn hơn: " + fr6(win[0], win[1]) + "."); }
  var n = rand(1, 9), d = pick([4, 5, 6, 8, 10]); var vs = n >= d ? (n === d ? "bằng 1" : "lớn hơn 1") : "bé hơn 1";
  return mcqQ("Phân số " + n + "/" + d + " so với 1 thì thế nào?", ["bé hơn 1", "bằng 1", "lớn hơn 1"].filter(function (x) { return x !== vs; }), vs, "Tử số " + n + (n < d ? " bé hơn" : n === d ? " bằng" : " lớn hơn") + " mẫu số " + d + " nên phân số " + vs + ".");
}
function m6FracArith() {
  var v = rand(0, 3);
  if (v === 0) { var d = pick([4, 5, 6, 7, 8, 9]), a = rand(1, d - 2), b = rand(1, d - 1 - a); return frMCQ6("Tính: " + a + "/" + d + " + " + b + "/" + d + " = ?", a + b, d, "Cùng mẫu: cộng hai tử số, giữ nguyên mẫu: (" + a + " + " + b + ")/" + d + " = " + fr6(a + b, d) + "."); }
  if (v === 1) { var d2 = pick([3, 4, 5, 6]), a2 = rand(1, d2 - 1), d3 = pick([4, 5, 6, 8]); while (d3 === d2) d3 = pick([4, 5, 6, 8]); var b2 = rand(1, d3 - 1); return frMCQ6("Tính: " + a2 + "/" + d2 + " + " + b2 + "/" + d3 + " = ?", a2 * d3 + b2 * d2, d2 * d3, "Quy đồng mẫu số " + (d2 * d3) + ": " + a2 + "/" + d2 + " = " + (a2 * d3) + "/" + (d2 * d3) + ", " + b2 + "/" + d3 + " = " + (b2 * d2) + "/" + (d2 * d3) + ". Cộng hai tử số: " + fr6(a2 * d3 + b2 * d2, d2 * d3) + "."); }
  if (v === 2) { var a3 = rand(1, 6), d4 = pick([2, 3, 4, 5]), a4 = rand(1, 5), d5 = pick([2, 3, 4, 6]); return frMCQ6("Tính: " + opFrac6(a3, d4) + " × " + opFrac6(a4, d5) + " = ?", a3 * a4, d4 * d5, "Nhân hai phân số: tử nhân tử, mẫu nhân mẫu: (" + a3 + " × " + a4 + ")/(" + d4 + " × " + d5 + ") = " + fr6(a3 * a4, d4 * d5) + " (đã rút gọn)."); }
  var a5 = rand(1, 6), d6 = pick([2, 3, 4, 5]), a6 = rand(1, 5), d7 = pick([2, 3, 4, 6]);
  return frMCQ6("Tính: " + opFrac6(a5, d6) + " : " + opFrac6(a6, d7) + " = ?", a5 * d7, d6 * a6, "Chia hai phân số: nhân với phân số nghịch đảo: " + opFrac6(a5, d6) + " × " + opFrac6(d7, a6) + " = " + fr6(a5 * d7, d6 * a6) + ".");
}
function m6FracSub() {
  var d1 = pick([3, 4, 5, 6]), a1 = rand(1, d1 - 1), d2 = pick([4, 5, 6, 8, 10]); while (d2 === d1) d2 = pick([4, 5, 6, 8, 10]);
  var a2 = rand(1, d2 - 1);
  return frMCQ6("Tính: " + a1 + "/" + d1 + " − " + a2 + "/" + d2 + " = ?", a1 * d2 - a2 * d1, d1 * d2, "Quy đồng mẫu số " + (d1 * d2) + ": " + a1 + "/" + d1 + " = " + (a1 * d2) + "/" + (d1 * d2) + ", " + a2 + "/" + d2 + " = " + (a2 * d1) + "/" + (d1 * d2) + ". Trừ hai tử: " + fr6(a1 * d2 - a2 * d1, d1 * d2) + ".");
}
function m6Mixed() {
  var v = rand(0, 1);
  var w = rand(1, 5), d = pick([2, 3, 4, 5, 6]), n = rand(1, d - 1);
  if (v === 0) return frMCQ6("Hỗn số " + w + " " + n + "/" + d + " viết thành phân số là:", w * d + n, d, w + " " + n + "/" + d + " = (" + w + " × " + d + " + " + n + ")/" + d + " = " + (w * d + n) + "/" + d + ".");
  var tot = w * d + n;
  var all = shuffle([w + " " + n + "/" + d, (w + 1) + " " + n + "/" + d, w + " " + (n + 1) + "/" + d, (w - 1 > 0 ? w - 1 : w + 2) + " " + n + "/" + d].filter(function (x, i, arr) { return arr.indexOf(x) === i; }));
  return { prompt: "Phân số " + tot + "/" + d + " viết thành hỗn số là:", visual: "", options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: all.indexOf(w + " " + n + "/" + d), cols: 2, optStack: true, explain: tot + " : " + d + " = " + w + " dư " + n + " nên " + tot + "/" + d + " = " + w + " " + n + "/" + d + "." };
}
function m6FracOfNum() {
  var v = rand(0, 1);
  if (v === 0) { var d = pick([2, 3, 4, 5, 6]), n = rand(1, d - 1), base = d * rand(4, 15); var ans = base * n / d; return numMCQ6("Tìm " + n + "/" + d + " của " + base + "!", base + " × " + n + "/" + d, ans, "Lấy " + base + " × " + n + "/" + d + " = " + base + " : " + d + " × " + n + " = " + ans + ".", 3); }
  var d2 = pick([2, 3, 4, 5]), n2 = rand(1, d2 - 1), part = rand(3, 20); var whole = part * d2 / n2;
  if (whole !== Math.floor(whole)) return m6FracOfNum();
  return numMCQ6("Một số có " + n2 + "/" + d2 + " của nó bằng " + part + ". Số đó là số nào?", part + " : " + n2 + "/" + d2, whole, "Muốn tìm số khi biết giá trị phân số: lấy " + part + " : " + n2 + "/" + d2 + " = " + part + " × " + d2 + "/" + n2 + " = " + whole + ".", 3);
}
/* ================= TOÁN 6 — CHƯƠNG VII: SỐ THẬP PHÂN & TỈ SỐ PHẦN TRĂM ================= */
function m6DecArith() {
  var v = rand(0, 3);
  if (v === 0) { var a = rand(125, 9999), b = rand(115, 9000); return decMCQ("Tính!", decStr(a) + " + " + decStr(b) + " = ?", a + b, "Đặt tính thẳng cột theo dấu phẩy rồi cộng như số tự nhiên: " + decStr(a) + " + " + decStr(b) + " = " + decStr(a + b) + "."); }
  if (v === 1) { var c = rand(2000, 9999), d = rand(115, c - 100); return decMCQ("Tính!", decStr(c) + " − " + decStr(d) + " = ?", c - d, "Đặt tính thẳng cột theo dấu phẩy rồi trừ: " + decStr(c) + " − " + decStr(d) + " = " + decStr(c - d) + "."); }
  if (v === 2) { var e = rand(12, 999), k = rand(2, 9); return decMCQ("Tính!", decStr(e) + " × " + k + " = ?", e * k, "Nhân như số tự nhiên rồi đếm phần thập phân: " + decStr(e) + " × " + k + " = " + decStr(e * k) + "."); }
  var f = rand(12, 99) * 100, g = pick([10, 100]);
  return decMCQ("Tính!", decStr(f) + " : " + g + " = ?", f / g, "Chia cho " + g + ": chuyển dấu phẩy sang trái " + (g === 10 ? "một" : "hai") + " chữ số: " + decStr(f / g) + ".");
}
function m6DecRound() {
  var h = rand(1005, 99999);
  var v = rand(0, 1);
  if (v === 0) { var tenth = Math.round(h / 10); return decMCQ("Làm tròn số " + decStr(h) + " đến hàng PHẦN MƯỜI!", "", tenth * 10, "Nhìn chữ số phần trăm của " + decStr(h) + " để làm tròn đến phần mười: được " + decStr(tenth * 10) + "."); }
  var unit = Math.round(h / 100);
  return decMCQ("Làm tròn số " + decStr(h) + " đến hàng ĐƠN VỊ!", "", unit * 100, "Nhìn chữ số phần mười của " + decStr(h) + " để làm tròn đến đơn vị: được " + (unit) + ".");
}
function m6Percent() {
  var v = rand(0, 2);
  if (v === 0) { var pairs = [[1, 4, 25], [1, 2, 50], [3, 4, 75], [1, 5, 20], [2, 5, 40], [3, 5, 60], [4, 5, 80], [1, 10, 10], [3, 10, 30], [7, 10, 70], [1, 20, 5], [3, 20, 15]]; var p = pick(pairs); return numMCQ6("Tỉ số phần trăm của " + p[0] + " và " + p[1] + " là bao nhiêu %?", p[0] + " : " + p[1], p[2], "Tỉ số phần trăm = " + p[0] + " : " + p[1] + " × 100% = " + p[2] + "% (vì " + p[0] + "/" + p[1] + " = " + (p[2] / 100) + ").", 5); }
  if (v === 1) { var base = pick([40, 50, 80, 100, 120, 150, 200, 240, 300, 400]); var pc = pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]); var ans = base * pc / 100; return numMCQ6("Tìm " + pc + "% của " + base + "!", base + " × " + pc + "%", ans, base + " × " + pc + "% = " + ans + ".", 5); }
  var price = pick([100, 200, 250, 400, 500, 1000]) * 1000; var off = pick([10, 20, 25, 50]); var pay = price * (100 - off) / 100;
  return numMCQ6("Một món đồ giá " + fmtN(price) + " đồng, giảm giá " + off + "%. Số tiền phải trả là bao nhiêu đồng?", fmtN(price) + " × " + (100 - off) + "%", pay, "Giảm " + off + "% tức là trả " + (100 - off) + "% giá gốc: " + fmtN(price) + " × " + (100 - off) + "% = " + fmtN(pay) + " đồng.", 5100);
}
/* ================= TOÁN 6 — CHƯƠNG VIII: HÌNH HỌC CƠ BẢN ================= */
function angle6SVG(deg) {
  var rad = deg * Math.PI / 180;
  var x2 = 100 + 78 * Math.cos(-rad), y2 = 100 + 78 * Math.sin(-rad);
  var arc = deg === 180 ? '<path d="M 122 100 A 22 22 0 0 0 78 100" fill="none" stroke="#e8590c" stroke-width="3"/>' : deg === 90 ? '<path d="M 122 100 L 122 78 L 100 78" fill="none" stroke="#e8590c" stroke-width="3"/>' : '<path d="M 124 100 A 24 24 0 0 0 ' + (100 + 24 * Math.cos(-rad)).toFixed(1) + " " + (100 + 24 * Math.sin(-rad)).toFixed(1) + '" fill="none" stroke="#e8590c" stroke-width="3"/>';
  return '<svg viewBox="0 0 200 150" style="width:min(240px,70vw)"><line x1="100" y1="100" x2="185" y2="100" stroke="#2f6db3" stroke-width="4" stroke-linecap="round"/><line x1="100" y1="100" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#2f6db3" stroke-width="4" stroke-linecap="round"/>' + arc + '<circle cx="100" cy="100" r="5" fill="#e8590c"/></svg>';
}
function m6Angle() {
  var kinds = [[30, "góc nhọn"], [45, "góc nhọn"], [60, "góc nhọn"], [90, "góc vuông"], [120, "góc tù"], [150, "góc tù"], [180, "góc bẹt"]];
  var k = pick(kinds);
  var names = ["góc nhọn", "góc vuông", "góc tù", "góc bẹt"];
  var all = shuffle(names.map(function (n) { return { t: n, ok: n === k[1] }; }));
  if (rand(0, 1) === 0) {
    var opts = numOptions(k[0], 0, 180, 4);
    return { prompt: "Góc trong hình có số đo bao nhiêu độ?", visual: angle6SVG(k[0]), options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "°</span>" }; }), answer: opts.indexOf(k[0]), cols: 4, explain: "Góc này là " + k[1] + ", số đo " + k[0] + "°. (Góc nhọn < 90°, góc vuông = 90°, góc tù từ 90° đến 180°, góc bẹt = 180°.)" };
  }
  return { prompt: "Góc trong hình là góc gì?", visual: angle6SVG(k[0]), options: all.map(function (o) { return { html: '<span class="opt-text">' + o.t + "</span>" }; }), answer: all.findIndex(function (o) { return o.ok; }), cols: 2, explain: "Số đo góc là " + k[0] + "° nên đây là " + k[1] + "." };
}
function m6Midpoint() {
  var v = rand(0, 1);
  if (v === 0) { var len = rand(4, 30) * 2; return numMCQ6("Đoạn thẳng AB dài " + len + " cm. M là trung điểm của AB. Độ dài đoạn AM là bao nhiêu cm?", "AM = " + len + " : 2", len / 2, "Trung điểm chia đoạn thẳng thành hai phần bằng nhau: AM = " + len + " : 2 = " + (len / 2) + " cm.", 3); }
  var a = rand(10, 60), b = rand(4, a - 2);
  return numMCQ6("Điểm M nằm giữa hai điểm A và B, AM = " + b + " cm, AB = " + a + " cm. Độ dài đoạn MB là bao nhiêu cm?", a + " − " + b, a - b, "M nằm giữa A và B nên AM + MB = AB, suy ra MB = " + a + " − " + b + " = " + (a - b) + " cm.", 3);
}
/* ================= TOÁN 6 — CHƯƠNG IX: DỮ LIỆU & XÁC SUẤT ================= */
var CHART6_DATA = [
  { thing: "môn học yêu thích", items: [["Toán", 0], ["Tiếng Anh", 0], ["Âm nhạc", 0], ["Thể thao", 0]] },
  { thing: "quả bán được", items: [["Táo", 0], ["Cam", 0], ["Xoài", 0], ["Nho", 0]] },
  { thing: "sách mượn", items: [["Truyện", 0], ["Khoa học", 0], ["Thơ", 0], ["Lịch sử", 0]] }
];
function barChart6(items) {
  var max = Math.max.apply(null, items.map(function (it) { return it[1]; }));
  var bars = "";
  items.forEach(function (it, i) {
    var h = Math.round(it[1] / max * 90);
    var x = 18 + i * 46;
    bars += '<rect x="' + x + '" y="' + (125 - h) + '" width="30" height="' + h + '" fill="#4dabf7" rx="3"/><text x="' + (x + 15) + '" y="' + (120 - h) + '" text-anchor="middle" font-size="14" font-weight="bold" fill="#1c3d5a">' + it[1] + '</text><text x="' + (x + 15) + '" y="142" text-anchor="middle" font-size="11" fill="#333">' + it[0] + "</text>";
  });
  return '<svg viewBox="0 0 200 150" style="width:min(280px,80vw)">' + bars + '<line x1="8" y1="125" x2="195" y2="125" stroke="#888" stroke-width="2"/></svg>';
}
function m6Chart() {
  var set = pick(CHART6_DATA);
  var vals = shuffle([rand(4, 12), rand(4, 12), rand(4, 12), rand(4, 12)]);
  var items = set.items.map(function (it, i) { return [it[0], vals[i]]; });
  var vis = barChart6(items);
  var v = rand(0, 2);
  if (v === 0) { var mx = items.reduce(function (a, b) { return b[1] > a[1] ? b : a; }); var all = shuffle(items.slice()); return { prompt: "Nhìn biểu đồ cột (" + set.thing + "): mục nào có số lượng LỚN NHẤT?", visual: vis, options: all.map(function (o) { return { html: '<span class="opt-text">' + o[0] + " (" + o[1] + ")</span>" }; }), answer: all.indexOf(mx), cols: 2, explain: "Cột cao nhất là " + mx[0] + " với " + mx[1] + "." }; }
  if (v === 1) { var tot = items.reduce(function (s, it) { return s + it[1]; }, 0); return numMCQ6("Nhìn biểu đồ cột (" + set.thing + "): tổng số lượng của cả bốn mục là bao nhiêu?", items.map(function (it) { return it[1]; }).join(" + "), tot, "Cộng số trên các cột: " + items.map(function (it) { return it[1]; }).join(" + ") + " = " + tot + ".", 3); }
  var s2 = shuffle(items.slice()); var a = s2[0], b = s2[1]; var diff = Math.abs(a[1] - b[1]);
  var opts = numOptions(diff, 0, 12, 4);
  return { prompt: "Nhìn biểu đồ cột (" + set.thing + "): " + a[0] + " và " + b[0] + " chênh nhau bao nhiêu?", visual: vis, options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(diff), cols: 4, explain: a[0] + " có " + a[1] + ", " + b[0] + " có " + b[1] + ", chênh nhau " + diff + "." };
}
function m6Prob() {
  var v = rand(0, 2);
  if (v === 0) { var tot = pick([10, 20, 25, 40, 50]); var hit = rand(2, tot - 2); return frMCQ6("Tung một đồng xu " + tot + " lần, mặt ngửa xuất hiện " + hit + " lần. Xác suất thực nghiệm của sự kiện “xuất hiện mặt ngửa” là:", hit, tot, "Xác suất thực nghiệm = số lần sự kiện xảy ra : tổng số lần thực nghiệm = " + hit + "/" + tot + " = " + fr6(hit, tot) + "."); }
  if (v === 1) { var t2 = pick([12, 18, 24, 30, 36]); var h2 = rand(2, t2 - 2); return frMCQ6("Gieo một con xúc xắc " + t2 + " lần, mặt 6 chấm xuất hiện " + h2 + " lần. Xác suất thực nghiệm của sự kiện “xuất hiện mặt 6 chấm” là:", h2, t2, "Xác suất thực nghiệm = " + h2 + " : " + t2 + " = " + fr6(h2, t2) + "."); }
  return mcqQ("Khi số lần thực nghiệm càng lớn, xác suất thực nghiệm của một sự kiện thường thế nào?", ["Luôn bằng 0", "Luôn bằng 1", "Thay đổi hoàn toàn ngẫu nhiên không theo quy luật nào"], "Càng gần với khả năng xảy ra thực tế của sự kiện (ổn định dần)", "Thực nghiệm càng nhiều lần, tỉ số số lần sự kiện xảy ra trên tổng số lần càng ổn định — đó là ý nghĩa của xác suất thực nghiệm.");
}
/* ---------- Bộ sinh phụ cho Toán 6: điền trống / ghép nối / trò chơi ---------- */
function m6BlankArith() {
  var v = rand(0, 2);
  if (v === 0) { var a = rand(15, 900), b = rand(15, 900); return numBlank6("Điền số còn thiếu vào chỗ trống!", a + " + ? = " + (a + b), b, a + " + ? = " + (a + b) + " nên số cần điền là " + (a + b) + " − " + a + " = " + b + "."); }
  if (v === 1) { var c = rand(12, 60), d = rand(3, 11); return numBlank6("Điền số còn thiếu vào chỗ trống!", c + " × ? = " + (c * d), d, "Số cần điền = " + (c * d) + " : " + c + " = " + d + "."); }
  var e = rand(200, 999), f = rand(50, e - 10);
  return numBlank6("Điền số còn thiếu vào chỗ trống!", e + " − ? = " + (e - f), f, "Số trừ = số bị trừ − hiệu = " + e + " − " + (e - f) + " = " + f + ".");
}
function m6MatchCalc(maxV) {
  return function () {
    var prs = [], used = {};
    var guard = 0;
    while (prs.length < 4 && guard++ < 400) {
      var a = rand(3, maxV), b = rand(3, maxV), op = pick(["+", "−", "×"]);
      if (op === "−" && b > a) { var t = a; a = b; b = t; }
      var res = op === "+" ? a + b : op === "−" ? a - b : a * b;
      var key = a + op + b;
      if (used[key]) continue; used[key] = 1;
      prs.push([a + " " + op + " " + b, String(res)]);
    }
    return pairsMatch("Nối phép tính với kết quả đúng nhé!", prs);
  };
}
function m6MemCalc(maxV) {
  return function () {
    var prs = [], used = {};
    var guard = 0;
    while (prs.length < 4 && guard++ < 400) {
      var a = rand(3, maxV), b = rand(2, 12);
      var key = a + "x" + b;
      if (used[key]) continue; used[key] = 1;
      prs.push([a + " × " + b, String(a * b)]);
    }
    return pairsMemory(prs);
  };
}
var MATH6_TOPICS = [
  { id: "m6-c1", emoji: "🔢", name: "Chương I: Tập hợp các số tự nhiên", sub: "Bài 1–7 • Cách ghi số, thứ tự, bốn phép tính, luỹ thừa, thứ tự thực hiện phép tính", pools: { choose: [m6ReadWrite, m6DigitValue, m6Arith, m6Pow, m6OrderOps, m6WordNat, m6Arith, m6OrderOps], blank: [m6BlankArith, function () { var a = rand(2, 12), e = pick([2, 3]); return numBlank6("Điền số còn thiếu vào chỗ trống!", a + "<sup>" + e + "</sup> = ?", Math.pow(a, e), a + "<sup>" + e + "</sup> = " + Math.pow(a, e) + "."); }], match: [m6MatchCalc(60)], games: [factsTF([["Luỹ thừa aⁿ là tích của n thừa số bằng nhau, mỗi thừa số bằng a", "Đúng", "Sai", null], ["Khi tính biểu thức không có ngoặc, ta nhân chia trước, cộng trừ sau", "Đúng", "Sai", null], ["Số tự nhiên nhỏ nhất là 1", "Sai", "Đúng", null], ["1 tỉ = 1 000 triệu", "Đúng", "Sai", null]]), factsCatch([["Tính 15 + 6 × 3 = ?", "33", "63", "45", "Nhân trước: 6 × 3 = 18; 15 + 18 = 33."], ["Tính 2³ = ?", "8", "6", "9", "2³ = 2 × 2 × 2 = 8."]]), m6MemCalc(30), gSortNumsFactory(990)] } },
  { id: "m6-c2", emoji: "➗", name: "Chương II: Tính chia hết", sub: "Bài 8–13 • Quan hệ chia hết, dấu hiệu chia hết 2/3/5/9, số nguyên tố, ƯCLN, BCNN", pools: { choose: [m6DivRule, m6DivSum, m6Prime, m6GCD, m6LCM, m6UocBoi, m6DivRule, m6GCD, m6LCM], blank: [function () { var a = rand(6, 48), b = rand(6, 48); return numBlank6("Điền ƯCLN của " + a + " và " + b + "!", "ƯCLN(" + a + ", " + b + ") = ?", gcd6(a, b), "Ước chung lớn nhất của " + a + " và " + b + " là " + gcd6(a, b) + "."); }, function () { var n = pick([12, 15, 18, 20, 24, 30]); var us = []; for (var i = 1; i <= n; i++) if (n % i === 0) us.push(i); return numBlank6("Số " + n + " có bao nhiêu ước tự nhiên?", "?", us.length, "Ư(" + n + ") = {" + us.join(", ") + "} — có " + us.length + " ước."); }], match: [function () { return pairsMatch("Nối số với tính chất đúng nhé!", shuffle([[String(pick([12, 18, 24, 30, 42])), "Chia hết cho 2 và 3"], [String(pick([15, 25, 35, 55])), "Chia hết cho 5"], [String(pick([27, 36, 54, 63])), "Chia hết cho 9"], [String(pick([7, 11, 13, 19])), "Là số nguyên tố"]]).slice(0, 4)); }], games: [factsTF([["Số nguyên tố nhỏ nhất là 2", "Đúng", "Sai", null], ["Số 1 là số nguyên tố", "Sai", "Đúng", null], ["Mọi số chia hết cho 9 cũng chia hết cho 3", "Đúng", "Sai", null], ["ƯCLN của hai số nguyên tố khác nhau luôn bằng 1", "Đúng", "Sai", null]]), factsCatch([["Số nào chia hết cho 5?", "305", "306", "307", "Số tận cùng 0 hoặc 5 thì chia hết cho 5."], ["ƯCLN(12, 18) = ?", "6", "3", "36", "Ước chung lớn nhất của 12 và 18 là 6."]])] } },
  { id: "m6-c3", emoji: "➖", name: "Chương III: Số nguyên", sub: "Bài 14–19 • Cộng, trừ, nhân số nguyên, quy tắc dấu ngoặc, chia hết, ước và bội của số nguyên", pools: { choose: [m6IntAddSub, m6IntMulDiv, m6IntParen, m6IntContext, m6IntAddSub, m6IntMulDiv, m6IntParen], blank: [function () { var a = rand(3, 30), b = rand(3, 30); return numBlank6("Điền số còn thiếu!", "(−" + a + ") + ? = " + (b - a), b, "(−" + a + ") + " + b + " = " + (b - a) + "."); }, function () { var a = rand(2, 15), b = rand(2, 15); return numBlank6("Điền số còn thiếu!", "(−" + a + ") × (−" + b + ") = ?", a * b, "Hai số nguyên âm nhân nhau cho kết quả dương: " + (a * b) + "."); }], match: [function () { var prs = [], used = {}; var guard = 0; while (prs.length < 4 && guard++ < 400) { var a = rand(2, 20), b = rand(2, 20), op = pick(["+", "−", "×"]); var res = op === "+" ? -a + b : op === "−" ? -a - b : -a * b; var expr = "(−" + a + ") " + op + " " + (op === "×" ? "(−" + b + ")" : b); if (op === "×") res = a * b; if (op === "+") expr = "(−" + a + ") + " + b; if (op === "−") expr = "(−" + a + ") − " + b; var key = expr; if (used[key]) continue; used[key] = 1; prs.push([expr, String(res)]); } return pairsMatch("Nối phép tính số nguyên với kết quả đúng nhé!", prs); }], games: [factsTF([["Tổng của hai số nguyên âm là một số nguyên âm", "Đúng", "Sai", null], ["Số đối của −7 là 7", "Đúng", "Sai", null], ["Tích của một số nguyên âm với một số nguyên dương là số dương", "Sai", "Đúng", null], ["Số nguyên âm nhỏ nhất là −1", "Sai", "Đúng", null]]), factsCatch([["Tính (−5) + 3 = ?", "−2", "2", "−8", "Khác dấu: 5 − 3 = 2, mang dấu của số lớn hơn (âm): −2."], ["Tính (−4) × (−3) = ?", "12", "−12", "7", "Cùng dấu âm × âm = dương: 12."]])] } },
  { id: "m6-c4", emoji: "📐", name: "Chương IV: Một số hình phẳng trong thực tiễn", sub: "Bài 20–22 • Tam giác đều, hình vuông, lục giác đều; hình chữ nhật, hình thoi, hình bình hành, hình thang cân; chu vi, diện tích", pools: { choose: [m6ShapeID, m6ShapeProps, m6PeriArea, m6ShapeID, m6PeriArea, m6ShapeProps, m6PeriArea], blank: [function () { var a = rand(3, 20); var q = numBlank6("Điền chu vi của hình vuông cạnh " + a + " cm!", "C = ?", a * 4, "Chu vi hình vuông = cạnh × 4 = " + (a * 4) + " cm."); q.figure = figSquareSVG(a); return q; }, function () { var a = rand(4, 20), b = rand(3, 15); var q = numBlank6("Điền diện tích hình chữ nhật dài " + a + " cm, rộng " + b + " cm!", "S = ?", a * b, "S = " + a + " × " + b + " = " + (a * b) + " cm²."); q.figure = figRectSVG(a, b); return q; }], match: [function () { return pairsMatch("Nối hình với đặc điểm đúng nhé!", [["Tam giác đều", "3 cạnh bằng nhau"], ["Lục giác đều", "6 cạnh bằng nhau"], ["Hình thoi", "4 cạnh bằng nhau, hai đường chéo vuông góc"], ["Hình thang cân", "2 cạnh bên bằng nhau"]]); }, function () { return pairsMatch("Nối hình với công thức diện tích nhé!", [["Hình chữ nhật", "S = a × b"], ["Hình bình hành", "S = a × h"], ["Hình thang", "S = (a + b) × h : 2"], ["Hình thoi", "S = (m × n) : 2"]]); }], games: [factsTF([["Hình vuông là hình có 4 cạnh bằng nhau và 4 góc vuông", "Đúng", "Sai", null], ["Hình bình hành có hai đường chéo bằng nhau luôn luôn", "Sai", "Đúng", null], ["Mọi hình thoi đều là hình bình hành", "Đúng", "Sai", null], ["Tam giác đều có 3 góc đều bằng 60°", "Đúng", "Sai", null]]), function () { var ss = shuffle(SHAPES6.slice()).slice(0, 4); return memQ("Lật thẻ tìm cặp đúng: hình và tên gọi!", ss.map(function (s) { return { a: shape6SVG(s[0]), b: '<span class="mem-text">' + s[1] + "</span>" }; })); }] } },
  { id: "m6-c5", emoji: "🦋", name: "Chương V: Tính đối xứng của hình phẳng", sub: "Bài 23–24 • Hình có trục đối xứng, hình có tâm đối xứng", pools: { choose: [m6SymAxis, m6SymCenter, m6SymLetter, m6SymCenter2, m6SymAxis, m6SymLetter, m6SymCenter, m6SymAxis], blank: [function () { var data = [["hình vuông", 4], ["hình chữ nhật", 2], ["tam giác đều", 3], ["hình thoi", 2], ["hình thang cân", 1], ["lục giác đều", 6], ["hình bình hành thường", 0], ["tam giác thường", 0], ["hình tròn", 0]]; var d = pick(data); if (d[0] === "hình tròn") { var o6 = shuffle(["vô số", "1 trục", "2 trục", "4 trục"]); return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Hình tròn có bao nhiêu trục đối xứng? Điền đáp án đúng!", blankText: "vô số", visual: '<div class="sentence">Đáp án: ' + blankSlot() + "</div>", options: o6.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: o6.indexOf("vô số"), cols: 3, explain: "Hình tròn có vô số trục đối xứng — mọi đường thẳng qua tâm đều là trục đối xứng." }; } return numBlank6("Điền số trục đối xứng của " + d[0] + "!", "?", d[1], d[0] + " có " + d[1] + " trục đối xứng."); }], match: [function () { return pairsMatch("Nối hình với số trục đối xứng nhé!", [["Hình vuông", "4 trục"], ["Tam giác đều", "3 trục"], ["Hình chữ nhật", "2 trục"], ["Hình thang cân", "1 trục"]]); }, function () { return pairsMatch("Nối hình với tính đối xứng của nó nhé!", [["Hình tròn", "Vô số trục đối xứng"], ["Hình bình hành", "Có tâm, không có trục"], ["Lục giác đều", "6 trục đối xứng"], ["Chữ H", "Vừa có trục, vừa có tâm"]]); }], games: [factsTF([["Hình tròn có vô số trục đối xứng", "Đúng", "Sai", null], ["Hình bình hành (thường) có trục đối xứng", "Sai", "Đúng", null], ["Mọi hình có tâm đối xứng đều có trục đối xứng", "Sai", "Đúng", null], ["Hình vuông vừa có trục đối xứng vừa có tâm đối xứng", "Đúng", "Sai", null], ["Chữ N có tâm đối xứng nhưng không có trục đối xứng", "Đúng", "Sai", null], ["Mọi đường thẳng qua tâm hình tròn đều là trục đối xứng của nó", "Đúng", "Sai", null]]), factsCatch([["Hình nào có tâm đối xứng?", "Hình bình hành", "Tam giác đều", "Hình thang cân", "Hình bình hành có tâm đối xứng là giao điểm hai đường chéo."], ["Chữ cái nào có trục đối xứng?", "Chữ A", "Chữ N", "Chữ S", "Chữ A có trục đối xứng dọc; N và S chỉ có tâm đối xứng."]]), function () { var ss = shuffle(SHAPES6.slice()).slice(0, 4); return memQ("Lật thẻ tìm cặp đúng: hình và tên gọi!", ss.map(function (s) { return { a: shape6SVG(s[0]), b: '<span class="mem-text">' + s[1] + "</span>" }; })); }] } },
  { id: "m6-c6", emoji: "🍕", name: "Chương VI: Phân số", sub: "Bài 25–30 • Phân số bằng nhau, so sánh, hỗn số dương, bốn phép tính, hai bài toán về phân số", pools: { choose: [m6FracEqual, m6FracCompare, m6FracArith, m6FracSub, m6Mixed, m6FracOfNum, m6FracArith, m6FracCompare], blank: [function () { var d = pick([3, 4, 5, 6, 8]), a = rand(1, d - 1), b = rand(1, d - 1); return frBlank6("Điền kết quả của phép tính " + a + "/" + d + " + " + b + "/" + d + "!", a + b, d, "Cùng mẫu: cộng hai tử: " + fr6(a + b, d) + "."); }, function () { var d = pick([2, 3, 4, 5]), n = rand(1, d - 1), base = d * rand(3, 12); return numBlank6("Điền " + n + "/" + d + " của " + base + "!", "?", base * n / d, base + " × " + n + "/" + d + " = " + (base * n / d) + "."); }], match: [function () { var prs = [], used = {}; var guard = 0; while (prs.length < 4 && guard++ < 400) { var d = pick([3, 4, 5, 6, 8]), a = rand(1, d - 1), b = rand(1, d - a > 0 ? d - a : 1); if (a + b > d) continue; var key = a + "/" + d + "+" + b; if (used[key]) continue; used[key] = 1; prs.push([a + "/" + d + " + " + b + "/" + d, fr6(a + b, d)]); } return pairsMatch("Nối phép tính phân số với kết quả nhé!", prs); }], games: [factsTF([["Muốn cộng hai phân số khác mẫu, phải quy đồng mẫu số trước", "Đúng", "Sai", null], ["Phân số 3/3 lớn hơn 1", "Sai", "Đúng", null], ["Hỗn số 1 1/2 bằng 3/2", "Đúng", "Sai", null], ["Khi nhân hai phân số, ta nhân tử với tử, mẫu với mẫu", "Đúng", "Sai", null]]), factsCatch([["Tính 1/2 + 1/4 = ?", "3/4", "2/6", "1/6", "Quy đồng: 1/2 = 2/4; 2/4 + 1/4 = 3/4."], ["Phân số nào lớn nhất?", "3/4", "1/2", "2/3", "3/4 = 0,75 là lớn nhất."]]), function () { return sortQ("Sắp xếp các phân số từ BÉ đến LỚN!", ["1/4", "1/3", "1/2", "2/3"]); }] } },
  { id: "m6-c7", emoji: "💯", name: "Chương VII: Số thập phân", sub: "Bài 31–34 • Tính toán với số thập phân, làm tròn và ước lượng, tỉ số và tỉ số phần trăm", pools: { choose: [m6DecArith, m6DecRound, m6Percent, m6DecArith, m6Percent, m6DecRound], blank: [function () { var a = rand(125, 9999); return decBlank("Điền kết quả của phép tính!", decStr(a) + " × 10 = ?", a * 10, "Nhân với 10: chuyển dấu phẩy sang phải một chữ số: " + decStr(a * 10) + "."); }, function () { var a = rand(15, 999); return decBlank("Điền kết quả của phép tính!", decStr(a) + " + " + decStr(a) + " = ?", a * 2, "Cộng gấp đôi: " + decStr(a * 2) + "."); }], match: [function () { return pairsMatch("Nối phân số với tỉ số phần trăm nhé!", [["1/2", "50%"], ["1/4", "25%"], ["3/4", "75%"], ["1/5", "20%"]]); }], games: [factsTF([["Làm tròn 3,47 đến hàng phần mười được 3,5", "Đúng", "Sai", null], ["50% của một số bằng một nửa số đó", "Đúng", "Sai", null], ["Số thập phân 0,5 bằng phân số 1/5", "Sai", "Đúng", null], ["Nhân số thập phân với 100, dấu phẩy chuyển sang phải hai chữ số", "Đúng", "Sai", null]]), factsCatch([["25% của 80 là?", "20", "25", "40", "80 × 25% = 20."], ["Làm tròn 7,86 đến hàng đơn vị được?", "8", "7", "7,9", "Phần mười là 8 (≥ 5) nên làm tròn lên: 8."]])] } },
  { id: "m6-c8", emoji: "📏", name: "Chương VIII: Những hình hình học cơ bản", sub: "Bài 35–39 • Điểm và đường thẳng, tia, đoạn thẳng, trung điểm, góc và số đo góc", pools: { choose: [m6Angle, m6Midpoint, m6Angle, m6Midpoint, m6Angle], blank: [function () { var len = rand(3, 25) * 2; return numBlank6("Đoạn thẳng CD dài " + len + " cm, N là trung điểm của CD. Điền độ dài CN!", "CN = ?", len / 2, "CN = " + len + " : 2 = " + (len / 2) + " cm."); }], match: [function () { return pairsMatch("Nối khái niệm với ý đúng nhé!", [["Góc vuông", "90°"], ["Góc bẹt", "180°"], ["Góc nhọn", "Nhỏ hơn 90°"], ["Góc tù", "Lớn hơn 90°, nhỏ hơn 180°"]]); }], games: [factsTF([["Qua hai điểm phân biệt chỉ vẽ được duy nhất một đường thẳng", "Đúng", "Sai", null], ["Trung điểm của đoạn thẳng cách đều hai đầu mút", "Đúng", "Sai", null], ["Tia là hình bị giới hạn cả hai phía", "Sai", "Đúng", null], ["Góc bẹt có số đo 180°", "Đúng", "Sai", null]]), factsCatch([["Góc có số đo 90° gọi là gì?", "Góc vuông", "Góc nhọn", "Góc tù", "Góc 90° là góc vuông."]]), (function () { var kp = knowledgePools([["Điểm được đặt tên bằng chữ gì?", "Chữ cái in hoa (A, B, C...)", "Chữ số", "Chữ cái thường", "Điểm kí hiệu bằng dấu chấm và đặt tên bằng chữ in hoa."], ["Đoạn thẳng AB khác tia AB ở điểm nào?", "Đoạn thẳng bị giới hạn cả hai đầu, tia chỉ giới hạn một đầu (gốc)", "Hai hình hoàn toàn giống nhau", "Tia dài hơn mọi đoạn thẳng nên không so sánh được giới hạn", "Tia AB có gốc A và kéo dài mãi phía B; đoạn thẳng AB có hai đầu mút A, B."]], [["Đoạn thẳng", "Giới hạn hai đầu"], ["Tia", "Giới hạn một đầu (gốc)"], ["Đường thẳng", "Không giới hạn hai phía"], ["Trung điểm", "Chia đoạn thành hai phần bằng nhau"]], "Nối cho đúng nhé!"); return kp.games[1] || kp.games[0]; })()] } },
  { id: "m6-c9", emoji: "📊", name: "Chương IX: Dữ liệu và xác suất thực nghiệm", sub: "Bài 40–43 • Bảng thống kê, biểu đồ tranh/cột/cột kép, kết quả có thể và sự kiện, xác suất thực nghiệm", pools: { choose: [m6Chart, m6Prob, m6Chart, m6Prob, m6Chart, m6Prob], blank: [function () { var tot = pick([20, 30, 40, 50]); var hit = rand(2, tot - 2); return frBlank6("Gieo xúc xắc " + tot + " lần, mặt 5 chấm xuất hiện " + hit + " lần. Điền xác suất thực nghiệm của sự kiện “xuất hiện mặt 5 chấm”!", hit, tot, "Xác suất thực nghiệm = " + hit + "/" + tot + " = " + fr6(hit, tot) + "."); }], match: [function () { return pairsMatch("Nối loại biểu đồ với ý đúng nhé!", [["Biểu đồ tranh", "Dùng hình ảnh thay số liệu"], ["Biểu đồ cột", "Chiều cao cột ứng với số liệu"], ["Biểu đồ cột kép", "So sánh hai dãy số liệu"], ["Bảng thống kê", "Trình bày dữ liệu bằng hàng và cột"]]); }], games: [factsTF([["Khi gieo một đồng xu, có hai kết quả có thể: sấp hoặc ngửa", "Đúng", "Sai", null], ["Xác suất thực nghiệm luôn đúng bằng 1/2 với mọi thực nghiệm", "Sai", "Đúng", null], ["Biểu đồ cột kép dùng để so sánh hai dãy dữ liệu", "Đúng", "Sai", null], ["Sự kiện “ngày mai Mặt Trời mọc ở phía đông” là sự kiện chắc chắn", "Đúng", "Sai", null]]), factsCatch([["Tung đồng xu 10 lần, mặt sấp xuất hiện 4 lần. Xác suất thực nghiệm của sự kiện “mặt sấp” là?", "4/10 = 2/5", "10/4", "6/10 = 3/5", "Xác suất thực nghiệm = 4 : 10 = 2/5."]]), function () { return sortQ("Sắp xếp các bước thu thập và biểu diễn dữ liệu theo đúng thứ tự!", ["Thu thập dữ liệu", "Lập bảng thống kê", "Vẽ biểu đồ", "Nhận xét, kết luận"]); }] } }
];
/* ================= NGỮ VĂN 6 — Bài 1–10 (Kết nối tri thức) ================= */
var NV6_TOPICS = [
  topic("nv6-b1", "🐜", "Bài 1: Tôi và các bạn", "Bài học đường đời đầu tiên (Tô Hoài) • Hoàng tử bé • Bắt nạt", [
    ["“Bài học đường đời đầu tiên” là trích đoạn mở đầu của tác phẩm nào?", "Dế Mèn phiêu lưu kí của Tô Hoài", "Hoàng tử bé", "Tắt đèn", "Trích đoạn là chương đầu của truyện Dế Mèn phiêu lưu kí (Tô Hoài)."],
    ["Ai là tác giả của “Dế Mèn phiêu lưu kí”?", "Tô Hoài", "Nguyễn Tuân", "Thạch Lam", "Tô Hoài (1920–2014) là nhà văn nổi tiếng với truyện loài vật và truyện thiếu nhi."],
    ["Nhân vật chính của trích đoạn “Bài học đường đời đầu tiên” là ai?", "Dế Mèn", "Dế Choắt", "Chị Cốc", "Dế Mèn là nhân vật chính, tự kể lại bài học đầu đời của mình."],
    ["Dế Mèn đã bày trò trêu chọc ai dẫn đến hậu quả đau lòng?", "Chị Cốc (trêu chị Cốc khiến Dế Choắt bị mổ chết)", "Anh Xiến Tóc", "Bọ Ngựa", "Dế Mèn trêu chị Cốc, chị Cốc tưởng lầm Dế Choắt nên mổ Dế Choắt trọng thương."],
    ["Bài học đường đời đầu tiên mà Dế Mèn rút ra là gì?", "Phải sống khiêm tốn, biết yêu thương, không kiêu căng và không làm điều ác với người yếu hơn", "Cứ mạnh là thắng", "Không cần quan tâm ai", "Cái chết của Dế Choắt dạy Dế Mèn bài học về sự kiêu căng và tình yêu thương."],
    ["“Nếu cậu muốn có một người bạn...” là trích đoạn của tác phẩm nào?", "Hoàng tử bé của Xanh-tơ Ê-xu-pe-ri (Saint-Exupéry)", "Dế Mèn phiêu lưu kí", "Cô bé bán diêm", "Hoàng tử bé là truyện nổi tiếng của nhà văn Pháp Xanh-tơ Ê-xu-pe-ri."],
    ["Trong “Hoàng tử bé”, con cáo dạy hoàng tử bé điều gì nổi tiếng?", "“Cảm hoá” một ai đó là tạo ra mối dây liên hệ, và ta phải có trách nhiệm với điều mình đã cảm hoá", "Cách đi săn mồi", "Cách bay lên các hành tinh", "Đoạn đối thoại với con cáo là phần nổi tiếng nhất của Hoàng tử bé, nói về tình bạn và trách nhiệm."],
    ["Bài thơ “Bắt nạt” của Nguyễn Thế Hoàng Linh viết về vấn đề gì?", "Lên án hành vi bắt nạt và kêu gọi yêu thương, bênh vực bạn yếu", "Ca ngợi việc bắt nạt", "Kể chuyện đi học muộn", "Bài thơ nhắc người đọc: bắt nạt là hành vi xấu, cần đứng về phía bạn bị bắt nạt."],
    ["Từ nào sau đây là DANH TỪ?", "“cái bàn”", "“chạy nhanh”", "“xinh đẹp”", "Danh từ là từ chỉ sự vật (người, vật, hiện tượng...): cái bàn, con mèo, học sinh..."],
    ["Từ nào sau đây là ĐỘNG TỪ?", "“học bài” (học)", "“học sinh”", "“chăm chỉ”", "Động từ là từ chỉ hoạt động, trạng thái: học, chạy, nghĩ..."],
    ["Từ nào sau đây là TÍNH TỪ?", "“chăm chỉ”", "“đến trường”", "“quyển vở”", "Tính từ chỉ đặc điểm, tính chất: chăm chỉ, cao, xanh..."],
    ["Trong câu “Dế Mèn rất kiêu căng”, từ “rất” thuộc loại từ nào?", "Phó từ (chỉ mức độ)", "Danh từ", "Đại từ", "“Rất” là phó từ chỉ mức độ, đứng trước tính từ."],
    ["Thể loại của “Dế Mèn phiêu lưu kí” là gì?", "Truyện đồng thoại (truyện loài vật có tính người)", "Thơ lục bát", "Kịch", "Truyện đồng thoại: lấy loài vật làm nhân vật nhưng phản ánh đời sống con người."],
    ["Dế Mèn tự tả mình là một chàng dế thế nào?", "Thanh niên cường tráng, khoẻ mạnh nhưng kiêu căng, hống hách", "Yếu ớt, ốm yếu như Dế Choắt", "Hiền lành, nhường nhịn mọi người", "Dế Mèn tự tin thái quá về sức mạnh của mình — mầm mống của thói kiêu căng."],
    ["Dế Choắt là nhân vật có ngoại hình và tính cách thế nào?", "Gầy gò, ốm yếu, nhút nhát, bị Dế Mèn khinh thường", "Khoẻ mạnh, hung hăng không kém Dế Mèn", "Giàu có và được mọi người kính nể", "Dế Choắt yếu thế nhưng hiền lành, đối lập với Dế Mèn."],
    ["Trước khi chết, Dế Choắt khuyên Dế Mèn điều gì?", "Đừng kiêu căng, hung hăng kẻo mang hoạ vào thân", "Hãy đi phiêu lưu thật xa", "Hãy trả thù giúp mình", "Lời trăn trối của Dế Choắt là bài học đầu đời thấm thía cho Dế Mèn."],
    ["Hoàng tử bé sống ở đâu trước khi đến Trái Đất?", "Một tiểu hành tinh nhỏ (hành tinh B612)", "Một cung điện lớn trên Trái Đất", "Một hòn đảo giữa đại dương", "Hành tinh của hoàng tử bé nhỏ đến mức chỉ vừa cho một người và bông hoa hồng."],
    ["Sinh vật mà hoàng tử bé chăm sóc, yêu quý nhất trên hành tinh của mình là gì?", "Một bông hoa hồng", "Một con cáo", "Một cây baobab lớn", "Bông hồng kiêu kì là mối quan tâm lớn nhất của hoàng tử bé."],
    ["Con cáo xin hoàng tử bé làm điều gì với mình?", "Được “cảm hoá” — kết bạn, tạo nên mối dây gắn bó", "Cho mình thật nhiều thức ăn", "Đưa mình về hành tinh B612", "Qua con cáo, tác giả nói về ý nghĩa của tình bạn và trách nhiệm với người mình “cảm hoá”."],
    ["Bài thơ “Bắt nạt” nhắn nhủ em điều gì khi thấy bạn bị bắt nạt?", "Hãy lên tiếng bảo vệ bạn, đừng hùa theo kẻ bắt nạt", "Hãy đứng ngoài cho an toàn", "Hãy quay video đăng lên mạng", "Bài thơ lên án thói bắt nạt và kêu gọi bênh vực bạn yếu thế."],
    ["Tác phẩm “Hoàng tử bé” thuộc thể loại nào?", "Truyện ngụ ngôn giàu chất triết lí", "Truyện kiếm hiệp", "Tiểu thuyết lịch sử", "Câu chuyện trẻ thơ chứa nhiều suy ngẫm sâu sắc về tình bạn, tình yêu và trách nhiệm."],
    ["Từ “đang” trong câu “Những chú dế đang hát vang” thuộc từ loại nào?", "Phó từ (chỉ sự tiếp diễn trong thời gian)", "Danh từ", "Tính từ", "Phó từ bổ sung ý nghĩa về thời gian, mức độ... cho động từ, tính từ."],
    ["Từ nào sau đây là DANH TỪ chỉ người?", "học sinh", "chăm chỉ", "chạy nhanh", "Danh từ là từ chỉ sự vật, trong đó có danh từ chỉ người như học sinh, thầy giáo."],
    ["Tác phẩm “Dế Mèn phiêu lưu kí” viết chính cho đối tượng độc giả nào?", "Thiếu nhi (nhưng người lớn cũng yêu thích)", "Chỉ cho các nhà khoa học", "Chỉ cho người nước ngoài", "Tô Hoài viết tác phẩm này cho thiếu nhi, với thế giới loài vật sinh động."],
    ["Cuối trích đoạn “Bài học đường đời đầu tiên”, Dế Mèn thay đổi thế nào?", "Hối hận, chôn cất Dế Choắt, thấm thía bài học đầu đời", "Càng kiêu căng hơn trước", "Bỏ đi và quên ngay chuyện cũ", "Cái chết của Dế Choắt khiến Dế Mèn ân hận, trưởng thành hơn."],
    ["Hoàng tử bé gặp con cáo ở đâu?", "Ở Trái Đất, nơi con cáo sống", "Trên hành tinh B612", "Trên hành tinh của người thắp đèn", "Cuộc gặp với con cáo ở Trái Đất dạy hoàng tử bé bài học về tình bạn."],
    ["Chủ đề bao quát của Bài 1 “Tôi và các bạn” là gì?", "Tình bạn và cách đối xử với bạn bè xung quanh", "Chiến tranh và hoà bình", "Khoa học vũ trụ", "Các văn bản trong bài đều hướng về tình bạn, sự chia sẻ và tôn trọng bạn bè."]
  ], [["Bài học đường đời đầu tiên", "Tô Hoài"], ["Hoàng tử bé", "Xanh-tơ Ê-xu-pe-ri"], ["Bắt nạt", "Nguyễn Thế Hoàng Linh"], ["Dế Mèn phiêu lưu kí", "Truyện đồng thoại"]], "Nối tác phẩm với tác giả / thể loại nhé!"),
  topic("nv6-b2", "💌", "Bài 2: Gõ cửa trái tim", "Chuyện cổ tích về loài người • Mây và sóng • Bức tranh của em gái tôi", [
    ["Bài thơ “Chuyện cổ tích về loài người” là của nhà thơ nào?", "Xuân Quỳnh", "Ta-go", "Mai Văn Phấn", "Xuân Quỳnh viết bài thơ này tặng con trai, kể nguồn gốc loài người bằng giọng cổ tích."],
    ["“Mây và sóng” là bài thơ của nhà thơ nước nào?", "Ta-go (Rabindranath Tagore) — nhà thơ Ấn Độ", "Xanh-tơ Ê-xu-pe-ri — Pháp", "An-đéc-xen — Đan Mạch", "Ta-go là nhà thơ Ấn Độ, đoạt giải Nobel Văn học năm 1913."],
    ["Trong bài thơ “Mây và sóng”, em bé từ chối đi chơi với mây và sóng vì lí do gì?", "Vì ở nhà có mẹ đang chờ em — tình yêu thương với mẹ lớn hơn mọi cuộc vui", "Vì em bé sợ nước", "Vì em bé bị ốm", "Em bé chọn ở bên mẹ, nghĩ ra trò chơi cùng mẹ còn vui hơn đi với mây, sóng."],
    ["“Bức tranh của em gái tôi” là truyện ngắn của tác giả nào?", "Tạ Duy Anh", "Thạch Lam", "Tô Hoài", "Truyện của Tạ Duy Anh, kể về hai anh em Kiều Phương."],
    ["Trong “Bức tranh của em gái tôi”, em gái Kiều Phương có biệt danh và tài năng gì?", "Biệt danh “Mèo”, có tài vẽ tranh", "Biệt danh “Cốc”, giỏi hát", "Biệt danh “Sóc”, giỏi toán", "Kiều Phương (Mèo) vẽ rất giỏi, bức tranh “Anh trai tôi” đoạt giải."],
    ["Bức tranh đoạt giải của Kiều Phương vẽ ai?", "Vẽ người anh trai", "Vẽ người mẹ", "Vẽ phong cảnh biển", "Bức tranh “Anh trai tôi” khiến người anh xúc động và tự nhận ra sự nhỏ nhen của mình."],
    ["Người anh trong truyện thay đổi thế nào sau khi xem bức tranh của em gái?", "Từ ghen tị, khó chịu chuyển sang xúc động, yêu thương và tự hào về em", "Càng ghét em hơn", "Không thay đổi gì", "Tấm lòng trong sáng của em gái cảm hoá người anh."],
    ["Biện pháp tu từ nào được dùng trong câu “Mây trắng bay khắp bầu trời” nếu nói “những đám mây như những con thuyền trắng trôi trên trời”?", "So sánh", "Điệp ngữ", "Hoán dụ", "Có từ “như” so sánh mây với thuyền — biện pháp so sánh."],
    ["Biện pháp NHÂN HOÁ là gì?", "Gán cho vật, cây cối, con vật những suy nghĩ, hành động, tình cảm như con người", "Lặp lại một từ nhiều lần", "Dùng vật này gọi vật khác có liên quan", "Nhân hoá làm cho sự vật trở nên gần gũi, có hồn."],
    ["Câu nào có dùng nhân hoá?", "“Chị gió khẽ hát ru trên ngọn tre”", "“Trời hôm nay rất xanh”", "“Em đi học lúc bảy giờ”", "“Chị gió... hát ru” — gió được gán hành động, tình cảm của người."],
    ["Trong “Chuyện cổ tích về loài người”, nhà thơ kể về điều gì qua hình thức cổ tích?", "Nguồn gốc của con người và sự ra đời của những điều thân thuộc (mặt trời, mặt trăng, cây cỏ, tiếng hát...)", "Một cuộc chiến tranh", "Lịch sử các triều vua", "Bài thơ là lời lý giải hồn nhiên về thế giới dành cho trẻ em."],
    ["Từ “gõ cửa trái tim” trong tên chủ đề Bài 2 mang nghĩa gì?", "Những văn bản mở ra và chạm đến tình cảm, cảm xúc của người đọc", "Gõ cửa một ngôi nhà thật", "Một trò chơi dân gian", "Chủ đề Bài 2 hướng đến những tác phẩm giàu cảm xúc, tình yêu thương."],
    ["Đại từ là từ dùng để làm gì?", "Dùng để xưng hô hoặc thay thế cho danh từ, động từ, tính từ trong câu", "Chỉ đồ vật", "Chỉ hành động", "Ví dụ đại từ: tôi, nó, ai, gì, bao nhiêu... dùng để trỏ người, sự vật, số lượng."],
    ["Nhà thơ Xuân Quỳnh nổi tiếng nhất với bài thơ tình nào?", "“Sóng”", "“Đồng chí”", "“Tây Tiến”", "“Sóng” là bài thơ tình được yêu thích nhất của Xuân Quỳnh."],
    ["Bài thơ “Chuyện cổ tích về loài người” mở đầu bằng hình ảnh nào?", "Trái đất trụi trần, chưa có cây cỏ, chỉ toàn trẻ con", "Một khu rừng xanh tươi đầy muông thú", "Một thành phố đông đúc", "Từ thế giới trống trơn, mọi thứ dần xuất hiện vì trẻ em."],
    ["Trong “Chuyện cổ tích về loài người”, người mẹ xuất hiện để làm gì?", "Để bế bồng, chăm sóc và yêu thương trẻ em", "Để dạy trẻ em làm toán", "Để dẫn trẻ em đi du lịch", "Mẹ và bà xuất hiện trong bài thơ vì tình yêu thương dành cho trẻ."],
    ["Nhà thơ Ta-go (Ấn Độ) đoạt giải Nobel Văn học năm nào?", "Năm 1913", "Năm 1900", "Năm 1945", "Ta-go là nhà văn châu Á đầu tiên đoạt giải Nobel Văn học."],
    ["Trong bài thơ “Mây và sóng”, mây và sóng rủ em bé làm gì?", "Bay lên trời với mây và ra khơi với sóng", "Ở nhà ngủ một giấc dài", "Đi học cùng mẹ", "Em bé từ chối vì muốn ở bên mẹ."],
    ["Trò chơi mà em bé trong “Mây và sóng” nghĩ ra cùng mẹ là gì?", "Em làm mây, mẹ làm trăng; em làm sóng, mẹ làm bờ", "Em làm thuyền, mẹ làm biển", "Em làm chim, mẹ làm gió", "Trò chơi tượng trưng cho tình mẹ con gắn bó không rời."],
    ["Trong truyện “Bức tranh của em gái tôi”, vì sao người anh khó chịu với em gái?", "Vì tự ái, ghen tị với tài năng vẽ của em gái", "Vì em gái làm hỏng bức tranh của anh", "Vì em gái không nghe lời bố mẹ", "Sự ghen tị khiến người anh xa lánh em — điều anh hối hận về sau."],
    ["Bức tranh “Anh trai tôi” của Kiều Phương thể hiện điều gì về cô bé?", "Tấm lòng trong sáng, yêu thương và ngưỡng mộ anh trai", "Sự ganh đua với anh trai", "Tài năng hội hoạ chuyên nghiệp", "Bức tranh vẽ người anh với ánh mắt hiền hoà, trong trẻo."],
    ["Câu “Những đám mây trắng xốp như bông” sử dụng biện pháp tu từ nào?", "So sánh", "Nhân hoá", "Ẩn dụ", "Mây được so sánh với bông qua từ “như”."],
    ["Từ “hun hút” thuộc loại từ nào?", "Từ láy", "Từ ghép", "Từ Hán Việt", "“Hun hút” là từ láy tượng hình, gợi chiều sâu thăm thẳm."],
    ["Trong câu “Mẹ em là giáo viên”, từ “giáo viên” thuộc từ loại nào?", "Danh từ", "Động từ", "Phó từ", "“Giáo viên” là danh từ chỉ người (nghề nghiệp)."],
    ["Tình cảm chủ đạo của bài thơ “Mây và sóng” là gì?", "Tình mẫu tử thiêng liêng, gắn bó", "Tình yêu thiên nhiên thuần tuý", "Khát vọng đi xa, phiêu lưu", "Dù mây và sóng quyến rũ, em bé chọn ở bên mẹ."],
    ["Khi viết đoạn văn ghi lại cảm xúc về một bài thơ, dẫn chứng nên lấy từ đâu?", "Câu thơ, hình ảnh thơ cụ thể trong bài", "Ý kiến của người khác trên mạng", "Không cần dẫn chứng", "Dẫn chứng từ chính văn bản giúp đoạn văn thuyết phục."],
    ["Cuối truyện “Bức tranh của em gái tôi”, người anh tự nhận xét mình thế nào?", "Thấy mình nhỏ nhen, ích kỷ; xúc động và yêu em hơn", "Thấy mình giỏi hơn em gái", "Không thay đổi suy nghĩ gì", "Sự trong sáng của em gái khiến người anh thức tỉnh."]
  ], [["Chuyện cổ tích về loài người", "Xuân Quỳnh"], ["Mây và sóng", "Ta-go"], ["Bức tranh của em gái tôi", "Tạ Duy Anh"], ["Kiều Phương", "“Mèo” — em gái tài vẽ"]], "Nối tác phẩm với tác giả nhé!"),
  topic("nv6-b3", "🕯️", "Bài 3: Yêu thương và chia sẻ", "Cô bé bán diêm • Gió lạnh đầu mùa • Con chào mào", [
    ["“Cô bé bán diêm” là truyện của nhà văn nào?", "An-đéc-xen (Hans Christian Andersen) — Đan Mạch", "Ta-go — Ấn Độ", "Tô Hoài — Việt Nam", "An-đéc-xen là nhà văn Đan Mạch nổi tiếng với truyện cổ tích cho trẻ em."],
    ["Cô bé bán diêm phải đi bán diêm vào thời điểm nào?", "Đêm giao thừa lạnh giá", "Một buổi sáng mùa hè", "Trưa ngày khai trường", "Đêm giao thừa, trời rét buốt, cô bé không bán được diêm và không dám về nhà."],
    ["Mỗi lần quẹt một que diêm, cô bé nhìn thấy những gì?", "Những hình ảnh ấm áp, hạnh phúc: lò sưởi, bàn ăn, cây thông và bà ngoại", "Những con vật hung dữ", "Cảnh trường học", "Các ảo ảnh là niềm ao ước của cô bé về hơi ấm, thức ăn và tình yêu thương."],
    ["Kết thúc truyện “Cô bé bán diêm” gợi cho người đọc cảm xúc gì?", "Thương cảm sâu sắc với số phận bất hạnh của trẻ em nghèo", "Vui sướng hả hê", "Không cảm xúc gì", "Cái chết của cô bé là tiếng tố cáo xã hội thờ ơ, thiếu tình thương."],
    ["“Gió lạnh đầu mùa” là truyện ngắn của nhà văn nào?", "Thạch Lam", "Tạ Duy Anh", "Nguyên Hồng", "Thạch Lam nổi tiếng với truyện ngắn nhẹ nhàng, giàu chất thơ về đời sống thường ngày."],
    ["Trong “Gió lạnh đầu mùa”, hai chị em Sơn và Lan đã làm gì cho bé Hiên?", "Cho bé Hiên chiếc áo bông cũ của em Duyên (và sau đó mẹ Sơn biết chuyện đã cho thêm)", "Cho bé Hiên tiền lì xì", "Không giúp gì cả", "Hành động nhỏ thể hiện tấm lòng yêu thương, biết chia sẻ của trẻ em."],
    ["Bài thơ “Con chào mào” là của nhà thơ nào?", "Mai Văn Phấn", "Xuân Quỳnh", "Lâm Thị Mỹ Dạ", "Bài thơ của Mai Văn Phấn viết về tình yêu thiên nhiên, khát vọng tự do của chú chim chào mào."],
    ["Trong bài thơ “Con chào mào”, vì sao nhân vật “tôi” thả con chim đi?", "Vì thấy chào mào chỉ vui, chỉ hót hay khi được tự do bay lượn giữa thiên nhiên", "Vì chim kêu ồn quá", "Vì không còn thức ăn cho chim", "Giữ chim trong lồng là ích kỷ; yêu thương thật sự là tôn trọng tự do của nó."],
    ["Chủ đề chung của Bài 3 “Yêu thương và chia sẻ” là gì?", "Ca ngợi tình yêu thương giữa người với người và với thiên nhiên, biết sẻ chia với người bất hạnh", "Ca ngợi sức mạnh cơ bắp", "Dạy cách buôn bán", "Các văn bản trong bài đều hướng trái tim người đọc đến tình thương và sự sẻ chia."],
    ["Từ nào là từ LÁY trong các từ sau?", "“lung linh”", "“bàn ghế”", "“học sinh”", "Từ láy có sự lặp lại âm thanh giữa các tiếng: lung linh, lao xao, rì rào..."],
    ["Trong câu “Những que diêm bùng cháy lung linh”, từ “lung linh” thuộc từ loại nào?", "Tính từ", "Danh từ", "Động từ", "“Lung linh” chỉ đặc điểm ánh sáng — là tính từ."],
    ["Dấu hai chấm (:) thường dùng để làm gì?", "Báo hiệu phần sau là lời nói của nhân vật hoặc phần giải thích, liệt kê", "Kết thúc câu hỏi", "Ngăn cách hai vế câu ghép", "Sau dấu hai chấm thường là lời trực tiếp của nhân vật trong truyện."],
    ["Khi kể lại một truyện đã đọc, em cần chú ý điều gì?", "Kể đúng trình tự sự việc, nhớ nhân vật chính và bài học, tình cảm của truyện", "Bịa thêm nhiều chi tiết không có trong truyện", "Chỉ kể đoạn cuối", "Đọc hiểu tốt mới kể lại đúng và hay được."],
    ["Cô bé bán diêm sống cùng ai?", "Người cha nghèo khó, khắc nghiệt; mẹ và bà đã mất", "Bà ngoại hiền từ", "Một gia đình giàu có", "Cô bé mồ côi mẹ, bà mất, sống với cha trong cảnh nghèo."],
    ["Bà ngoại là người như thế nào đối với cô bé bán diêm?", "Người yêu thương cô bé nhất khi còn sống", "Người hàng xóm lạnh nhạt", "Người mua diêm thường xuyên", "Hình ảnh bà hiện về trong ánh diêm là niềm an ủi lớn nhất của cô bé."],
    ["Vì sao cô bé bán diêm không dám về nhà trong đêm giao thừa?", "Sợ cha đánh mắng vì không bán được que diêm nào", "Vì nhà bị khoá cửa", "Vì muốn chơi ngoài phố", "Nỗi sợ cha và cảnh nghèo khiến cô bé ở lại góc phố trong giá rét."],
    ["Hình ảnh kết thúc truyện “Cô bé bán diêm” là gì?", "Cô bé đã chết cóng trong đêm, khuôn mặt vẫn mỉm cười", "Cô bé được một gia đình giàu nhận nuôi", "Cô bé bán hết diêm và về nhà", "Cái kết buồn tố cáo xã hội thờ ơ trước số phận trẻ em nghèo."],
    ["Những que diêm trong truyện tượng trưng cho điều gì?", "Những ước mơ, khát khao hạnh phúc nhỏ bé của cô bé", "Sự giàu sang của người mua", "Ngọn lửa chiến tranh", "Mỗi que diêm thắp lên một ước mơ: lò sưởi, bàn ăn, cây thông, bà ngoại."],
    ["Chị em Sơn – Lan trong “Gió lạnh đầu mùa” sống trong gia đình thế nào?", "Gia đình khá giả, ấm no hơn nhiều bạn trong xóm", "Gia đình nghèo nhất xóm", "Gia đình không có người lớn", "Sự đối lập hoàn cảnh làm nổi bật tình thương của chị em Sơn dành cho bé Hiên."],
    ["Bé Hiên có hoàn cảnh như thế nào?", "Nhà nghèo, mặc phong phanh giữa gió lạnh đầu mùa", "Nhà giàu, có nhiều áo ấm", "Mồ côi cả cha lẫn mẹ", "Hình ảnh Hiên co ro trong chiếc áo rách khiến Sơn động lòng thương."],
    ["Mẹ của Sơn ứng xử thế nào khi biết Sơn cho Hiên chiếc áo bông cũ?", "Nhẹ nhàng dạy con, còn giúp thêm cho gia đình bé Hiên", "Mắng và phạt hai chị em", "Đòi lại chiếc áo ngay", "Cách ứng xử nhân hậu của người mẹ dạy con bài học về lòng nhân ái."],
    ["Thông điệp chính của văn bản “Con chào mào” là gì?", "Hãy yêu thiên nhiên, tôn trọng tự do của muôn loài", "Hãy nuôi thật nhiều chim cảnh", "Hãy săn bắt chim lạ về nuôi", "Việc thả chào mào về trời thể hiện tình yêu và sự tôn trọng sự sống."],
    ["Từ “sẻ chia” có nghĩa là gì?", "Chia sẻ, san sẻ niềm vui và khó khăn với người khác", "Chia đồ vật thành nhiều phần bằng nhau", "Giữ mọi thứ cho riêng mình", "“Sẻ chia” là từ ghép đồng nghĩa với “chia sẻ”, đúng chủ đề của bài học."],
    ["Từ “ào ào” thuộc loại từ nào?", "Từ láy tượng thanh", "Từ ghép tổng hợp", "Danh từ riêng", "“Ào ào” mô phỏng âm thanh mạnh, liên tiếp của gió, nước."],
    ["Dấu phẩy trong câu liệt kê có tác dụng gì?", "Ngăn cách các thành phần liệt kê trong câu", "Kết thúc câu", "Báo hiệu lời nói trực tiếp", "Ví dụ: “Em mua bút, vở, thước và cặp sách.”"],
    ["“Cô bé bán diêm” là tác phẩm của nhà văn nào?", "An-đéc-xen (Hans Christian Andersen), Đan Mạch", "Tô Hoài", "Xuân Quỳnh", "An-đéc-xen là nhà văn viết truyện cổ tích văn học nổi tiếng thế giới."],
    ["Khi kể lại một trải nghiệm giúp đỡ người khác, đoạn kết nên làm gì?", "Nêu cảm xúc và bài học em rút ra từ trải nghiệm", "Kể thêm một câu chuyện khác", "Liệt kê lại toàn bộ sự việc", "Đoạn kết đọng lại ý nghĩa là yêu cầu của kiểu bài kể trải nghiệm."]
  ], [["Cô bé bán diêm", "An-đéc-xen"], ["Gió lạnh đầu mùa", "Thạch Lam"], ["Con chào mào", "Mai Văn Phấn"], ["Đêm giao thừa", "Thời điểm trong “Cô bé bán diêm”"]], "Nối tác phẩm với tác giả nhé!"),
  topic("nv6-b4", "🎋", "Bài 4: Quê hương yêu dấu", "Ca dao về quê hương • Chuyện cổ nước mình • Cây tre Việt Nam", [
    ["“Chuyện cổ nước mình” là bài thơ của tác giả nào?", "Lâm Thị Mỹ Dạ", "Xuân Quỳnh", "Thép Mới", "Bài thơ của Lâm Thị Mỹ Dạ bày tỏ niềm tự hào về kho tàng truyện cổ của dân tộc."],
    ["“Cây tre Việt Nam” là tác phẩm của tác giả nào?", "Thép Mới", "Nguyễn Tuân", "Thạch Lam", "Thép Mới viết tuỳ bút nổi tiếng ca ngợi cây tre — biểu tượng của làng quê Việt Nam."],
    ["Trong “Cây tre Việt Nam”, cây tre gắn bó với người Việt Nam ở những mặt nào?", "Từ ăn ở, dựng nhà, đồ dùng, đến lao động và chiến đấu giữ nước", "Chỉ để làm cảnh", "Chỉ để bán lấy tiền", "Tre xuất hiện trong mọi mặt đời sống và lịch sử của dân tộc."],
    ["Câu ca dao “Công cha như núi Thái Sơn / Nghĩa mẹ như nước trong nguồn chảy ra” dùng biện pháp gì?", "So sánh (công cha với núi, nghĩa mẹ với nước nguồn)", "Nhân hoá", "Điệp ngữ", "Từ “như” cho thấy đây là phép so sánh, ca ngợi công ơn cha mẹ."],
    ["Ca dao là thể loại văn học như thế nào?", "Thơ ca dân gian truyền miệng, giàu hình ảnh, thường dùng thể thơ lục bát", "Văn xuôi hiện đại", "Kịch nói", "Ca dao là sáng tác của nhân dân lao động, truyền miệng qua nhiều thế hệ."],
    ["“Chuyện cổ nước mình” ca ngợi kho tàng truyện cổ ở điểm nào?", "Truyện cổ chứa đựng bài học nhân hậu, ở hiền gặp lành, là niềm tự hào dân tộc", "Truyện cổ chỉ để dọa trẻ con", "Truyện cổ không có ý nghĩa gì", "Bài thơ khẳng định truyện cổ nước mình vừa hay vừa giàu tính nhân văn."],
    ["Hình ảnh cây tre trong văn hoá Việt Nam tượng trưng cho phẩm chất gì?", "Sức sống dẻo dai, đoàn kết, kiên cường, thuỷ chung của con người Việt Nam", "Sự yếu đuối", "Sự xa xỉ", "“Tre già măng mọc” — tre là biểu tượng của làng quê và tinh thần dân tộc."],
    ["Biện pháp ĐIỆP NGỮ là gì?", "Lặp lại một từ, cụm từ hoặc cấu trúc câu để nhấn mạnh ý và tạo nhịp điệu", "So sánh hai vật với nhau", "Gán tính người cho vật", "Điệp ngữ thường gặp trong ca dao, thơ: “Nhớ ai... Nhớ ai...”."],
    ["Câu thơ nào có điệp ngữ?", "“Ơi con chim chiền chiện / Hót chi mà vang trời... Ơi con chim chiền chiện” — lặp cụm từ để nhấn mạnh", "“Trời xanh thăm thẳm”", "“Em đi học”", "Việc lặp lại “Ơi con chim chiền chiện” là điệp ngữ."],
    ["Từ “quê hương” thuộc loại từ nào?", "Danh từ", "Động từ", "Phó từ", "“Quê hương” chỉ một khái niệm, sự vật trừu tượng — là danh từ."],
    ["Trong câu “Tre giữ làng, giữ nước, giữ mái nhà tranh”, phép tu từ nào được sử dụng?", "Điệp ngữ (lặp từ “giữ”) kết hợp nhân hoá (tre như người bảo vệ làng quê)", "So sánh", "Nói quá", "Câu văn nổi tiếng trong “Cây tre Việt Nam”: lặp “giữ” và gán hành động của người cho tre."],
    ["Khi viết đoạn văn ghi lại cảm xúc về một bài thơ, em mở đoạn bằng cách nào hợp lí?", "Nêu tên bài thơ, tác giả và cảm xúc chung nhất của em về bài thơ", "Sao chép nguyên văn bài thơ", "Chỉ đếm số câu thơ", "Đoạn văn cảm thụ cần có mở đoạn, thân đoạn (cảm xúc kèm dẫn chứng) và kết đoạn."],
    ["Thể thơ LỤC BÁT có đặc điểm gì?", "Câu trên 6 tiếng, câu dưới 8 tiếng, gieo vần ở tiếng thứ 6 của câu sáu và tiếng thứ 6 của câu tám", "Mỗi câu đều 7 tiếng", "Không cần gieo vần", "Lục bát là thể thơ truyền thống của dân tộc, phổ biến trong ca dao, truyện thơ."]
  ], [["Chuyện cổ nước mình", "Lâm Thị Mỹ Dạ"], ["Cây tre Việt Nam", "Thép Mới"], ["Ca dao", "Thơ ca dân gian truyền miệng"], ["Công cha như núi Thái Sơn", "Phép so sánh"]], "Nối cho đúng nhé!"),
  topic("nv6-b5", "🌊", "Bài 5: Những nẻo đường xứ sở", "Cô Tô • Hang Én • Cửu Long Giang ta ơi", [
    ["“Cô Tô” là tác phẩm của nhà văn nào?", "Nguyễn Tuân", "Thép Mới", "Nguyên Hồng", "“Cô Tô” là tuỳ bút nổi tiếng của Nguyễn Tuân về quần đảo Cô Tô (Quảng Ninh)."],
    ["“Cửu Long Giang ta ơi” là bài thơ của tác giả nào?", "Nguyên Hồng", "Mai Văn Phấn", "Lâm Thị Mỹ Dạ", "Nguyên Hồng viết bài thơ về dòng sông Cửu Long và vùng đất phương Nam."],
    ["Văn bản “Hang Én” của tác giả Hà My viết về thắng cảnh nào?", "Hang Én — một hang động lớn thuộc Vườn quốc gia Phong Nha – Kẻ Bàng (Quảng Bình)", "Hang Sơn Đoòng ở nước ngoài", "Một hang động nhân tạo", "Hang Én nổi tiếng là nơi trú ngụ của hàng vạn con chim én."],
    ["Quần đảo Cô Tô thuộc tỉnh nào của nước ta?", "Quảng Ninh", "Khánh Hoà", "Bà Rịa – Vũng Tàu", "Cô Tô là quần đảo ở vùng biển Đông Bắc, thuộc tỉnh Quảng Ninh."],
    ["Trong “Cô Tô”, Nguyễn Tuân miêu tả cảnh thiên nhiên biển đảo với ngòi bút như thế nào?", "Tinh tế, tài hoa, giàu hình ảnh và cảm xúc trước vẻ đẹp của biển sáng sớm, cơn bão biển", "Khô khan, chỉ liệt kê số liệu", "Chỉ kể chuyện đánh nhau", "Nguyễn Tuân nổi tiếng với lối văn tuỳ bút tài hoa, câu văn giàu nhạc điệu."],
    ["Dòng sông Cửu Long (Mê Kông) chảy qua vùng nào của Việt Nam?", "Đồng bằng sông Cửu Long ở miền Nam", "Đồng bằng sông Hồng", "Tây Nguyên", "Sông Mê Kông vào Việt Nam chia thành sông Tiền và sông Hậu, bồi đắp đồng bằng Nam Bộ."],
    ["Bài thơ “Cửu Long Giang ta ơi” thể hiện tình cảm gì của tác giả?", "Tình yêu tha thiết, niềm tự hào về dòng sông và quê hương phương Nam", "Sự sợ hãi dòng sông", "Không có tình cảm gì", "Giọng thơ tha thiết như lời tâm tình với dòng sông quê hương."],
    ["Văn bản “Hang Én” thuộc kiểu văn bản nào?", "Văn bản thông tin / kí ghi lại trải nghiệm khám phá thiên nhiên", "Truyện cổ tích", "Thơ lục bát", "“Hang Én” là văn bản ghi lại hành trình khám phá một thắng cảnh thật."],
    ["Khi đọc một văn bản thông tin, em cần chú ý những yếu tố nào?", "Nhan đề, đề mục, số liệu, hình ảnh minh hoạ và thông tin chính của từng phần", "Chỉ đọc dòng đầu tiên", "Bỏ qua mọi số liệu", "Văn bản thông tin trình bày có đề mục, số liệu cụ thể để người đọc nắm thông tin nhanh."],
    ["Từ nào sau đây là từ HÁN VIỆT?", "“sơn hà” (núi sông)", "“cái cày”", "“bờ đê”", "Từ Hán Việt là từ có nguồn gốc tiếng Hán nhưng đọc theo âm Hán – Việt: sơn hà, quốc gia, thiên nhiên..."],
    ["Trong câu “Biển Cô Tô trong sáng, mênh mông”, từ “mênh mông” là từ gì?", "Từ láy tượng hình (gợi không gian rộng lớn)", "Từ ghép đẳng lập", "Từ Hán Việt", "“Mênh mông” là từ láy gợi hình, gợi cảm về sự bao la."],
    ["Dấu NGOẶC KÉP (“ ”) trong văn bản thường dùng để làm gì?", "Đánh dấu lời nói trực tiếp của nhân vật hoặc từ ngữ dùng với ý đặc biệt", "Kết thúc câu", "Báo hiệu liệt kê", "Lời đối thoại của nhân vật thường đặt trong dấu ngoặc kép."],
    ["Chủ đề Bài 5 “Những nẻo đường xứ sở” gợi cho em điều gì?", "Khám phá vẻ đẹp của các vùng miền đất nước và thêm yêu quê hương Việt Nam", "Học cách đi buôn xa", "Tìm hiểu nước ngoài", "Các văn bản trong bài đưa người đọc đi khắp các miền đất nước."],
    ["Đảo lớn nhất của quần đảo Cô Tô là đảo nào?", "Đảo Cô Tô lớn (cùng Cô Tô con, Thanh Lân...)", "Đảo Quan Lạn", "Đảo Cát Bà", "Quần đảo Cô Tô thuộc tỉnh Quảng Ninh, gồm nhiều đảo lớn nhỏ."],
    ["Cảnh đẹp nổi bật được Nguyễn Tuân miêu tả trong “Cô Tô” là cảnh nào?", "Mặt trời mọc trên biển sau cơn bão, bầu trời trong trẻo", "Hoàng hôn trên núi cao", "Đêm trăng trên sông", "Sau bão, Cô Tô hiện lên trong trẻo, huy hoàng trong nắng sớm."],
    ["Phong cách viết của Nguyễn Tuân có nét nổi bật nào?", "Tài hoa, giàu hình ảnh và nhạc điệu", "Khô khan, chỉ ghi số liệu", "Chỉ dùng lời thoại ngắn", "Nguyễn Tuân nổi tiếng với lối viết tài hoa, uyên bác."],
    ["Sông Cửu Long chia thành hai nhánh chính nào?", "Sông Tiền và sông Hậu", "Sông Hồng và sông Đà", "Sông Mã và sông Lam", "Hai nhánh chính của Cửu Long trên đất Việt Nam là sông Tiền, sông Hậu."],
    ["Hang Én thuộc di sản thiên nhiên thế giới nào của Việt Nam?", "Phong Nha – Kẻ Bàng (Quảng Bình)", "Vịnh Hạ Long", "Tràng An", "Hang Én nằm trong vùng lõi vườn quốc gia Phong Nha – Kẻ Bàng."],
    ["Chim én làm tổ ở đâu trong hang Én?", "Trên vách đá cao trong hang", "Dưới mặt đất ẩm", "Trên các cây ngoài cửa hang", "Hàng vạn con én làm tổ trên vách hang — nguồn gốc tên gọi hang Én."],
    ["Văn bản “Cô Tô” thuộc thể loại nào?", "Tuỳ bút (kí)", "Truyện ngắn", "Thơ lục bát", "“Cô Tô” là tuỳ bút ghi lại chuyến đi thực tế của Nguyễn Tuân."],
    ["Đồng bằng sông Cửu Long nổi tiếng là vùng đất như thế nào?", "Vựa lúa lớn nhất cả nước, nhiều trái cây và thuỷ sản", "Vùng núi cao nhất cả nước", "Vùng hoang mạc khô cằn", "Cửu Long là vùng sản xuất lương thực, trái cây lớn nhất Việt Nam."],
    ["Từ “xứ sở” trong tên bài có nghĩa là gì?", "Quê hương, vùng đất nơi con người sinh sống", "Một đất nước xa lạ", "Khu vực không có người ở", "“Những nẻo đường xứ sở” là hành trình qua các vùng đất của Tổ quốc."],
    ["Từ “ì ầm” thuộc loại từ nào?", "Từ láy tượng thanh", "Từ ghép đẳng lập", "Từ Hán Việt", "“Ì ầm” mô phỏng tiếng sóng, tiếng máy nổ liên tục."],
    ["Khi viết văn tả cảnh sinh hoạt, em cần tập trung vào điều gì?", "Hoạt động của con người và khung cảnh theo trình tự hợp lí", "Chỉ tả đồ vật tĩnh", "Chỉ nêu cảm xúc của mình", "Cảnh sinh hoạt là cảnh hoạt động của con người trong một không gian, thời gian."],
    ["Văn bản thông tin khác văn bản truyện ở điểm nào?", "Cung cấp thông tin có thật, chính xác về sự vật, hiện tượng", "Chỉ dùng tưởng tượng", "Không cần số liệu, dẫn chứng", "Văn bản thông tin như bài về hang Én cung cấp tri thức khách quan."],
    ["Quần đảo Cô Tô thuộc vùng biển nào của nước ta?", "Vùng biển Đông Bắc (vịnh Bắc Bộ)", "Vùng biển miền Trung", "Vùng biển phía Nam", "Cô Tô là quần đảo tiền tiêu ở vùng biển Đông Bắc của Tổ quốc."],
    ["Tên gọi “Cửu Long” (chín con rồng) gợi đến điều gì?", "Chín cửa sông đổ ra biển của dòng Cửu Long xưa", "Chín ngọn núi cao", "Chín tỉnh đồng bằng", "Xưa sông có chín cửa đổ ra biển nên được gọi là Cửu Long giang."]
  ], [["Cô Tô", "Nguyễn Tuân"], ["Cửu Long Giang ta ơi", "Nguyên Hồng"], ["Hang Én", "Hà My — Phong Nha – Kẻ Bàng"], ["Cô Tô (quần đảo)", "Tỉnh Quảng Ninh"]], "Nối tác phẩm với tác giả nhé!"),
  topic("nv6-b6", "⚔️", "Bài 6: Chuyện kể về những người anh hùng", "Thánh Gióng • Sơn Tinh Thuỷ Tinh • Bánh chưng bánh giầy — truyền thuyết", [
    ["Truyền thuyết là thể loại truyện như thế nào?", "Truyện dân gian kể về nhân vật, sự kiện lịch sử có yếu tố hoang đường, kì ảo", "Truyện hoàn toàn bịa đặt không liên quan lịch sử", "Thơ ca ngợi thiên nhiên", "Truyền thuyết gắn với lịch sử nhưng được nhân dân thêu dệt thêm yếu tố kì ảo."],
    ["Truyền thuyết “Thánh Gióng” kể về người anh hùng đánh giặc nào?", "Đánh giặc Ân xâm lược", "Đánh giặc Minh", "Đánh giặc Pháp", "Gióng lớn nhanh như thổi, cưỡi ngựa sắt đánh tan giặc Ân rồi bay về trời."],
    ["Những chi tiết kì ảo nào trong “Thánh Gióng” thể hiện sức mạnh phi thường?", "Cậu bé ba tuổi chưa biết nói bỗng cất tiếng xin đi đánh giặc, lớn nhanh như thổi, ngựa sắt, roi sắt", "Gióng đi học chữ", "Gióng trồng rau giúp mẹ", "Yếu tố kì ảo làm nổi bật tầm vóc anh hùng của nhân vật."],
    ["Truyền thuyết “Sơn Tinh, Thuỷ Tinh” giải thích hiện tượng tự nhiên nào?", "Hiện tượng lũ lụt hằng năm ở đồng bằng sông Hồng và công cuộc trị thuỷ của cha ông", "Hiện tượng nhật thực", "Hiện tượng cầu vồng", "Thuỷ Tinh dâng nước đánh Sơn Tinh mỗi năm ứng với mùa mưa lũ."],
    ["Vua Hùng chọn Sơn Tinh làm rể vì lí do nổi bật nào trong truyện?", "Sơn Tinh đến trước và mang đủ lễ vật thách cưới theo yêu cầu của nhà vua", "Sơn Tinh giàu hơn", "Sơn Tinh là họ hàng của vua", "Ai mang lễ vật đến trước sẽ được cưới Mị Nương; Sơn Tinh đến trước Thuỷ Tinh."],
    ["Truyền thuyết “Sự tích bánh chưng, bánh giầy” gắn với nhân vật nào?", "Lang Liêu — hoàng tử thứ 18 của Hùng Vương thứ 6", "Sơn Tinh", "An Dương Vương", "Lang Liêu làm bánh chưng, bánh giầy từ gạo nếp dâng vua cha và được truyền ngôi."],
    ["Bánh chưng hình vuông, bánh giầy hình tròn tượng trưng cho điều gì?", "Trời tròn, đất vuông — quan niệm vũ trụ của người xưa và lòng biết ơn trời đất, tổ tiên", "Mặt trăng và mặt trời mọc", "Hai loại khuôn bánh ngẫu nhiên", "Bánh chưng, bánh giầy là biểu tượng văn hoá Tết của dân tộc."],
    ["Điểm chung của các nhân vật anh hùng trong truyền thuyết Bài 6 là gì?", "Có công lao lớn với cộng đồng, được nhân dân tôn thờ, nhớ ơn", "Đều là những người giàu có nhất", "Đều sống ở thời hiện đại", "Truyền thuyết thể hiện niềm tự hào, biết ơn của nhân dân với người có công."],
    ["Từ “anh hùng” trong bài được hiểu theo nghĩa nào?", "Người có công lao, tài năng và phẩm chất phi thường, được cộng đồng kính trọng", "Người có nhiều tiền nhất làng", "Người to khoẻ nhất", "Anh hùng là hình tượng lý tưởng mà cộng đồng gửi gắm ước mơ."],
    ["Trong câu “Gióng vươn vai thành một tráng sĩ”, từ “tráng sĩ” nghĩa là gì?", "Người trai trẻ khoẻ mạnh, có chí khí (thường chỉ người đi chiến đấu vì nghĩa lớn)", "Một cậu bé nhỏ", "Một ông lão", "“Tráng sĩ” là từ Hán Việt chỉ người đàn ông mạnh mẽ, hào hiệp."],
    ["Khi TÓM TẮT một truyện truyền thuyết, em cần làm gì?", "Nêu ngắn gọn các sự việc chính, nhân vật chính theo đúng trình tự của truyện", "Kể lại toàn bộ từng câu chữ trong truyện", "Chỉ nêu cảm nghĩ của mình", "Tóm tắt là trình bày cốt truyện một cách ngắn gọn, trung thành với văn bản."],
    ["Chi tiết “ngựa sắt, roi sắt, giáp sắt” trong Thánh Gióng có ý nghĩa gì?", "Thể hiện ước mơ của nhân dân về vũ khí, sức mạnh để chiến thắng giặc ngoại xâm", "Chỉ là đồ chơi của Gióng", "Là đồ thật còn lưu giữ trong bảo tàng", "Yếu tố kì ảo phản ánh khát vọng sức mạnh bảo vệ đất nước của nhân dân."],
    ["Bài 6 có tên “Chuyện kể về những người anh hùng”. Những “người anh hùng” đầu tiên của dân tộc được kể là ai?", "Thánh Gióng, Sơn Tinh, Lang Liêu... những nhân vật truyền thuyết thời Hùng Vương", "Các vị vua thời Nguyễn", "Các anh hùng thời chống Pháp", "Các truyền thuyết trong bài đều gắn với thời đại Hùng Vương dựng nước."]
  ], [["Thánh Gióng", "Đánh giặc Ân"], ["Sơn Tinh, Thuỷ Tinh", "Giải thích lũ lụt, trị thuỷ"], ["Bánh chưng, bánh giầy", "Lang Liêu"], ["Truyền thuyết", "Truyện dân gian có yếu tố kì ảo"]], "Nối tác phẩm với nội dung nhé!"),
  topic("nv6-b7", "🌳", "Bài 7: Thế giới cổ tích", "Thạch Sanh • Cây khế • Sọ Dừa", [
    ["Truyện cổ tích là thể loại như thế nào?", "Truyện dân gian kể về số phận nhân vật (thường là người bất hạnh, tốt bụng) với yếu tố thần kì, kết thúc có hậu, thể hiện ước mơ công lí của nhân dân", "Truyện kể sự kiện lịch sử có thật 100%", "Truyện cười châm biếm quan lại", "Cổ tích thường mở đầu “Ngày xửa ngày xưa...” và kết thúc hạnh phúc cho người tốt."],
    ["Truyện “Thạch Sanh” thuộc kiểu truyện cổ tích nào?", "Cổ tích về người dũng sĩ (người anh hùng diệt trừ cái ác, cứu người)", "Cổ tích sinh hoạt", "Cổ tích loài vật", "Thạch Sanh là mẫu nhân vật dũng sĩ: giết chằn tinh, đại bàng, cứu công chúa, đánh lui quân xâm lược."],
    ["Thạch Sanh được các nhân vật thần kì nào giúp đỡ và có bảo bối gì nổi tiếng?", "Được tiên ông dạy võ, có cây đàn thần và niêu cơm thần ăn không hết", "Có chiếc đũa thần của bà tiên", "Có con ngựa biết bay", "Đàn thần khiến quân địch buông vũ khí; niêu cơm thần nuôi quân không bao giờ vơi."],
    ["Nhân vật Lý Thông trong “Thạch Sanh” tượng trưng cho kiểu người nào?", "Kẻ gian ác, xảo trá, cướp công, hại người tốt", "Người anh hùng thầm lặng", "Người thầy thuốc tốt", "Lý Thông cướp công của Thạch Sanh nhiều lần và cuối cùng bị trừng phạt."],
    ["Truyện “Cây khế” còn có tên gọi khác là gì?", "Ăn khế trả vàng", "Sự tích cây khế chua", "Chim thần và người em", "Chim thần dặn: “Ăn khế trả vàng, may túi ba gang mà đựng”."],
    ["Trong “Cây khế”, vì sao người em được chim thần trả vàng còn người anh thì gặp nạn?", "Người em hiền lành, không tham lam (chỉ may túi ba gang); người anh tham lam may túi quá to, chim không chở nổi nên rơi xuống biển", "Người anh không biết may túi", "Chim thần thích người em đẹp trai hơn", "Truyện đề cao lòng nhân hậu, phê phán tính tham lam."],
    ["“Sọ Dừa” kể về nhân vật có ngoại hình thế nào?", "Sinh ra chỉ là một cái sọ dừa, không chân tay, nhưng thông minh, hiền lành và giàu tài năng", "Một chàng trai cao lớn đẹp đẽ từ nhỏ", "Một ông lão râu tóc bạc phơ", "Sọ Dừa là nhân vật cổ tích có hình dạng kì lạ, tượng trưng cho người thiệt thòi nhưng tài đức."],
    ["Kết thúc chung của các truyện cổ tích trong Bài 7 là gì?", "Người tốt được hạnh phúc, kẻ ác bị trừng phạt — “ở hiền gặp lành”", "Người tốt luôn phải chịu thiệt", "Không ai được hạnh phúc", "Kết thúc có hậu thể hiện niềm tin, ước mơ công lí của nhân dân."],
    ["Mô típ “nhân vật hoá thân, biến hình” trong Sọ Dừa có tác dụng gì?", "Thể hiện ước mơ của nhân dân: người tốt dù bề ngoài xấu xí, thiệt thòi vẫn sẽ được đền đáp xứng đáng", "Chỉ để gây cười", "Làm câu chuyện khó hiểu hơn", "Sọ Dừa hoá thành chàng trai khôi ngô khi chăn bò cho phú ông."],
    ["Từ “thần kì” trong truyện cổ tích nghĩa là gì?", "Có phép lạ, phi thường, không thể xảy ra trong đời thực", "Rất bình thường", "Thuộc về thần thánh trong chùa", "Yếu tố thần kì là dấu hiệu đặc trưng của truyện cổ tích."],
    ["Khi viết bài văn kể lại một truyện cổ tích, em nên làm gì?", "Đóng vai một nhân vật hoặc người kể chuyện, kể theo trình tự truyện và có thể thêm chi tiết miêu tả hợp lí", "Chép nguyên văn từng câu của truyện gốc", "Chỉ viết hai ba dòng", "Viết sáng tạo dựa trên cốt truyện đã học."],
    ["Câu mở đầu quen thuộc của truyện cổ tích là gì?", "“Ngày xửa ngày xưa...”", "“Theo số liệu thống kê...”", "“Kính thưa quý vị...”", "Mở đầu bằng thời gian mơ hồ xa xưa là công thức quen thuộc của cổ tích."],
    ["Ý nghĩa của hình tượng cây đàn thần trong “Thạch Sanh” là gì?", "Tiếng đàn là tiếng nói của công lí, cảm hoá được cả kẻ thù, làm quân xâm lược buông gươm", "Đàn chỉ để giải trí trong cung", "Đàn dùng để ru ngủ công chúa", "Tiếng đàn thần khiến 18 nước chư hầu xin hàng — chiến thắng bằng nhân nghĩa."]
  ], [["Thạch Sanh", "Người dũng sĩ, đàn thần, niêu cơm thần"], ["Cây khế", "Ăn khế trả vàng"], ["Sọ Dừa", "Nhân vật hình dạng kì lạ, tài đức"], ["Lý Thông", "Kẻ gian ác, cướp công"]], "Nối tác phẩm với đặc điểm nhé!"),
  topic("nv6-b8", "👀", "Bài 8: Khác biệt và gần gũi", "Xem người ta kìa! • Bài tập làm văn (Nhóc Ni-cô-la)", [
    ["Văn bản “Xem người ta kìa!” của tác giả Lạc Thanh bàn về vấn đề gì?", "Thói quen so sánh con cái với “con nhà người ta” và sự cần thiết của việc tôn trọng sự khác biệt của mỗi người", "Cách nuôi dạy gà vịt", "Lịch sử một ngôi trường", "Bài viết phê phán việc lấy người khác làm “chuẩn” để ép mọi người phải giống nhau."],
    ["Theo “Xem người ta kìa!”, mỗi con người có đặc điểm gì cần được tôn trọng?", "Mỗi người có một cá tính, sở trường và con đường riêng — khác biệt là điều bình thường và đáng quý", "Ai cũng phải giống hệt nhau", "Khác biệt là xấu và cần xoá bỏ", "Tôn trọng sự khác biệt giúp con người gần gũi, hoà hợp với nhau."],
    ["Trích đoạn “Bài tập làm văn” lấy từ tác phẩm nào?", "Nhóc Ni-cô-la (Le Petit Nicolas) của Gô-xi-nhi (Goscinny) và Xăng-pê (Sempé)", "Hoàng tử bé", "Dế Mèn phiêu lưu kí", "Nhóc Ni-cô-la là bộ truyện thiếu nhi nổi tiếng của Pháp về cậu bé Ni-cô-la tinh nghịch."],
    ["Trong “Bài tập làm văn”, vì sao giờ học của lớp Ni-cô-la trở nên hỗn loạn, vui nhộn?", "Thầy giáo cho cả lớp cùng làm một bài tập làm văn, các cậu học trò tranh luận, “góp ý” cho nhau đến mức mất trật tự", "Lớp bị mất điện", "Có một con mèo chạy vào lớp", "Sự hồn nhiên, tinh nghịch của trẻ em làm nên tiếng cười của trích đoạn."],
    ["Giọng kể của Ni-cô-la trong truyện có đặc điểm gì?", "Giọng kể của một đứa trẻ: hồn nhiên, hài hước, nhìn thế giới người lớn bằng con mắt ngây thơ", "Giọng kể trang trọng của nhà sử học", "Giọng kể buồn bã, u ám", "Người kể chuyện xưng “tôi” chính là cậu bé Ni-cô-la."],
    ["Bài 8 có tên “Khác biệt và gần gũi”. Hai từ này gợi thông điệp gì?", "Con người dù khác biệt về tính cách, hoàn cảnh vẫn có thể gần gũi, yêu thương nhau nếu biết tôn trọng và thấu hiểu", "Khác biệt thì phải xa lánh nhau", "Muốn gần gũi phải xoá hết khác biệt", "Đó là chủ đề nhân văn xuyên suốt cả hai văn bản trong bài."],
    ["Từ “cá tính” nghĩa là gì?", "Tính cách, nét riêng của từng người, khác với người khác", "Tính của loài cá", "Sự giống nhau của mọi người", "Cá tính là yếu tố tạo nên sự khác biệt đáng trân trọng của mỗi người."],
    ["Biện pháp tu từ nào trong câu: “Mỗi người là một bông hoa với hương sắc riêng”?", "Ẩn dụ (so sánh ngầm người với bông hoa)", "Điệp ngữ", "Liệt kê", "Không có từ “như” nhưng ngầm so sánh người với hoa — đó là ẩn dụ."],
    ["ẨN DỤ khác SO SÁNH ở điểm nào?", "Ẩn dụ là so sánh ngầm: gọi tên sự vật này bằng tên sự vật khác có nét tương đồng, không dùng từ so sánh", "Ẩn dụ không có sự so sánh nào cả", "So sánh bao giờ cũng ngắn hơn ẩn dụ", "So sánh: “Mặt trời như quả bóng lửa” (có từ “như”). Ẩn dụ: “Quả bóng lửa đang lăn chậm xuống núi” — gọi thẳng Mặt Trời bằng hình ảnh khác."],
    ["Trong văn nghị luận đơn giản ở lớp 6, một ý kiến cần có gì đi kèm?", "Lí lẽ và bằng chứng (dẫn chứng) cụ thể để thuyết phục người đọc", "Chỉ cần nói “em thích thế”", "Càng ít lí do càng tốt", "Văn bản “Xem người ta kìa!” là mẫu văn bản trình bày ý kiến có lí lẽ, bằng chứng."],
    ["Dấu chấm lửng (...) thường được dùng để làm gì?", "Thể hiện lời nói ngập ngừng, bị ngắt quãng hoặc còn nhiều ý chưa liệt kê hết", "Kết thúc một đoạn văn bất kỳ", "Báo hiệu lời nhân vật sắp nói", "Trong truyện Nhóc Ni-cô-la, dấu chấm lửng hay xuất hiện trong lời kể hồn nhiên của trẻ."],
    ["Khi tranh luận về một vấn đề trong lớp, em nên có thái độ nào?", "Lắng nghe ý kiến khác, tôn trọng người nói khác mình, bảo vệ ý kiến bằng lí lẽ", "Chỉ nghe người nói giống mình", "La lớn để át người khác", "Tôn trọng sự khác biệt cũng thể hiện trong cách tranh luận văn minh."],
    ["Câu nào thể hiện đúng thông điệp “tôn trọng sự khác biệt”?", "“Bạn ấy học chậm môn Toán nhưng vẽ rất đẹp — mỗi người có một thế mạnh riêng.”", "“Ai cũng phải giỏi Toán như bạn lớp trưởng mới được.”", "“Khác mình thì đừng chơi cùng.”", "Nhận ra thế mạnh riêng của mỗi người là biểu hiện của sự tôn trọng khác biệt."],
    ["Nhóc Ni-cô-la là bộ truyện thiếu nhi nổi tiếng của nước nào?", "Pháp", "Anh", "Mỹ", "Truyện do Gô-xi-nhi viết lời, Xăng-pê vẽ minh hoạ, được dịch ra nhiều thứ tiếng."],
    ["Trong “Bài tập làm văn”, các cậu học trò tranh nhau làm việc gì?", "“Góp ý”, sửa bài cho nhau đến mức ồn ào mất trật tự", "Chép bài của bạn giỏi nhất", "Xin thầy cho ra chơi sớm", "Ai cũng muốn bài của mình hay nhất nên lớp học trở nên hỗn loạn, vui nhộn."],
    ["Văn bản “Xem người ta kìa!” thuộc kiểu văn bản nào?", "Văn bản nghị luận (trình bày ý kiến)", "Truyện ngắn", "Thơ trữ tình", "Tác giả nêu ý kiến về thói so sánh và bảo vệ bằng lí lẽ, bằng chứng."],
    ["Từ “kìa” trong nhan đề “Xem người ta kìa!” gợi thái độ gì quen thuộc?", "Thái độ than phiền, trách móc của người lớn với con trẻ", "Thái độ vui mừng, tự hào", "Thái độ ngạc nhiên thuần tuý", "Câu nói “Xem người ta kìa!” thường được cha mẹ dùng khi so sánh con mình với con người khác."],
    ["Biện pháp tu từ trong câu “Bạn ấy là một kho báu của lớp mình” là gì?", "Ẩn dụ", "So sánh", "Điệp từ", "Bạn được gọi thẳng là “kho báu” — so sánh ngầm, không dùng từ “như”."],
    ["Muốn dùng ẩn dụ đúng, hai sự vật được ngầm so sánh với nhau cần có điều kiện gì?", "Phải có nét tương đồng (giống nhau) nào đó", "Phải hoàn toàn giống hệt nhau", "Không cần liên quan gì với nhau", "Nét tương đồng là cầu nối để người đọc hiểu được ẩn dụ."],
    ["Trong truyện Nhóc Ni-cô-la, tiếng cười chủ yếu đến từ đâu?", "Sự hồn nhiên, nghịch ngợm, hiểu lầm đáng yêu của trẻ con", "Những trò đùa ác ý làm hại người khác", "Lời châm biếm cay độc của người lớn", "Cái nhìn ngây thơ của trẻ làm lộ ra những điều buồn cười của thế giới người lớn."],
    ["Khi viết bài văn trình bày ý kiến, phần MỞ bài cần làm gì?", "Nêu vấn đề và ý kiến của người viết", "Kể một câu chuyện thật dài", "Liệt kê mọi dẫn chứng chi tiết", "Mở bài ngắn gọn, rõ ý kiến giúp người đọc định hướng ngay từ đầu."],
    ["Dấu hai chấm (:) trong câu thường báo hiệu điều gì?", "Phần sau là giải thích, liệt kê hoặc lời nói được dẫn lại", "Câu văn đã kết thúc", "Một đoạn văn mới bắt đầu", "Ví dụ: “Em có ba người bạn thân: An, Bình và Chi.”"],
    ["Câu “Mỗi người có một vẻ riêng” khuyên ta có thái độ nào với bạn khác mình?", "Tôn trọng và chấp nhận sự khác biệt của mỗi người", "Bắt bạn phải thay đổi giống mình", "Tránh xa những người khác mình", "Đó chính là thông điệp “Khác biệt và gần gũi” của Bài 8."]
  ], [["Xem người ta kìa!", "Lạc Thanh"], ["Nhóc Ni-cô-la", "Gô-xi-nhi và Xăng-pê"], ["Khác biệt", "Cá tính, nét riêng của mỗi người"], ["Gần gũi", "Thấu hiểu, tôn trọng để hoà hợp"]], "Nối cho đúng nhé!"),
  topic("nv6-b9", "🌍", "Bài 9: Trái Đất – ngôi nhà chung", "Trái Đất – cái nôi của sự sống • Văn bản thông tin về Trái Đất", [
    ["Văn bản “Trái Đất – cái nôi của sự sống” của tác giả nào?", "Hồ Thanh Trang", "Nguyễn Tuân", "Hà My", "Văn bản thông tin của Hồ Thanh Trang giới thiệu về Trái Đất và sự sống trên hành tinh."],
    ["Vì sao Trái Đất được gọi là “cái nôi của sự sống”?", "Vì Trái Đất là hành tinh duy nhất được biết đến có điều kiện phù hợp (nước, không khí, nhiệt độ) cho sự sống tồn tại và phát triển", "Vì Trái Đất có hình dáng như cái nôi", "Vì mọi hành tinh đều có sự sống", "Khoảng cách vừa phải tới Mặt Trời, có nước lỏng và khí quyển giúp sự sống hình thành."],
    ["Văn bản thông tin khác văn bản truyện ở điểm nào nổi bật?", "Cung cấp thông tin khách quan, có số liệu, đề mục, chú thích; không hư cấu nhân vật, cốt truyện", "Luôn có nhân vật và đối thoại", "Chỉ dùng hình ảnh minh hoạ", "Bài 9 tập trung vào kiểu văn bản thông tin về khoa học, môi trường."],
    ["Khi đọc văn bản thông tin có nhiều đề mục, cách đọc hiệu quả là gì?", "Đọc nhan đề và các đề mục trước để nắm bố cục, sau đó đọc kĩ từng phần và ghi lại thông tin chính", "Đọc từ cuối lên đầu", "Bỏ qua hết các đề mục", "Đề mục giúp người đọc định hướng nội dung của từng phần."],
    ["Theo các văn bản trong Bài 9, con người cần làm gì với Trái Đất?", "Bảo vệ môi trường, gìn giữ “ngôi nhà chung” cho muôn loài và các thế hệ mai sau", "Khai thác tuỳ ý vì tài nguyên vô tận", "Không cần quan tâm", "Thông điệp nhân văn: Trái Đất là nhà chung, bảo vệ Trái Đất là bảo vệ chính con người."],
    ["Từ “hành tinh” nghĩa là gì?", "Thiên thể lớn quay quanh một ngôi sao (như Trái Đất quay quanh Mặt Trời), không tự phát sáng", "Một ngôi sao tự phát sáng", "Một vệ tinh nhỏ", "Trái Đất là hành tinh thứ ba tính từ Mặt Trời trong hệ Mặt Trời."],
    ["Trong câu “Trái Đất là hành tinh xanh”, từ “xanh” gợi điều gì?", "Gợi hình ảnh Trái Đất nhìn từ vũ trụ với biển và sự sống tươi tốt, đồng thời là lời nhắc bảo vệ môi trường", "Chỉ màu sơn của quả địa cầu", "Trái Đất chỉ có màu xanh lá", "“Hành tinh xanh” là cách gọi yêu mến về Trái Đất."],
    ["Chú thích (footnote) trong văn bản thông tin có tác dụng gì?", "Giải thích thêm từ ngữ, số liệu hoặc nguồn thông tin để người đọc hiểu rõ hơn", "Trang trí cho đẹp trang sách", "Tóm tắt toàn bài", "Chú thích thường đặt ở cuối trang hoặc cuối văn bản với cỡ chữ nhỏ hơn."],
    ["Hình ảnh, sơ đồ trong văn bản thông tin có vai trò gì?", "Minh hoạ, giúp thông tin trừu tượng trở nên trực quan, dễ hiểu và dễ nhớ", "Chỉ để lấp chỗ trống", "Không liên quan nội dung", "Khi đọc cần kết hợp chữ và hình để hiểu đầy đủ thông tin."],
    ["Câu chủ đề của một đoạn văn là câu như thế nào?", "Câu nêu ý chính, khái quát nhất của đoạn văn", "Câu dài nhất đoạn", "Câu cuối cùng của bài", "Các câu còn lại trong đoạn triển khai, làm rõ cho câu chủ đề."],
    ["Khi viết văn bản thuyết minh đơn giản về một hiện tượng tự nhiên, em trình bày theo trình tự nào hợp lí?", "Giới thiệu hiện tượng → giải thích nguyên nhân, diễn biến → nêu tác hại / cách ứng phó", "Viết ngẫu hứng không cần thứ tự", "Chỉ kết luận trước", "Trình tự rõ ràng giúp người đọc theo dõi thông tin dễ dàng."],
    ["Từ nào sau đây là từ ghép ĐẲNG LẬP?", "“núi sông” (hai tiếng ngang hàng nhau)", "“xanh tươi” (từ láy)", "“học sinh” (chính – phụ)", "Từ ghép đẳng lập gồm các tiếng có quan hệ ngang hàng: núi sông, đất nước, cây cỏ..."],
    ["Nhan đề “Trái Đất – ngôi nhà chung” sử dụng dấu gạch ngang để làm gì?", "Để giải thích, nhấn mạnh thêm ý cho cụm từ đứng trước (Trái Đất chính là ngôi nhà chung)", "Để kết thúc câu", "Để ngăn cách lời thoại", "Dấu gạch ngang ở nhan đề giúp làm nổi bật thông điệp của văn bản."]
  ], [["Trái Đất – cái nôi của sự sống", "Hồ Thanh Trang"], ["Hành tinh xanh", "Cách gọi Trái Đất"], ["Văn bản thông tin", "Số liệu, đề mục, chú thích"], ["Ngôi nhà chung", "Trái Đất của mọi loài"]], "Nối cho đúng nhé!"),
  topic("nv6-b10", "📚", "Bài 10: Cuốn sách tôi yêu", "Dự án đọc sách • Giới thiệu cuốn sách yêu thích", [
    ["Bài 10 “Cuốn sách tôi yêu” chủ yếu hướng dẫn em làm hoạt động gì?", "Đọc một cuốn sách mình yêu thích, ghi chép, giới thiệu và trao đổi về cuốn sách với các bạn", "Học thuộc lòng một văn bản", "Làm bài kiểm tra cuối năm", "Đây là bài học dạng dự án đọc sách: đọc — ghi chép — trình bày — trao đổi."],
    ["Khi giới thiệu một cuốn sách, thông tin nào cần nêu đầu tiên?", "Tên cuốn sách, tên tác giả và thể loại của sách", "Giá tiền cuốn sách", "Số trang sách chính xác đến từng trang", "Giới thiệu sách cần nêu tên sách, tác giả, thể loại rồi mới đến nội dung."],
    ["Phần hấp dẫn nhất khi giới thiệu sách là phần nào?", "Giới thiệu nội dung chính, nhân vật hoặc chi tiết em thích nhất kèm cảm xúc của em", "Đọc lại toàn bộ cuốn sách", "Chỉ kể đoạn kết", "Người giới thiệu cần chọn chi tiết đắt giá để khơi gợi hứng thú của người nghe."],
    ["“Dế Mèn phiêu lưu kí” mà em học ở Bài 1 do ai viết?", "Tô Hoài", "Nguyễn Nhật Ánh", "Trần Đăng Khoa", "Đây là cuốn sách thiếu nhi kinh điển của văn học Việt Nam."],
    ["Khi ghi chép trong quá trình đọc sách (sổ tay đọc sách), em nên ghi những gì?", "Tên sách, tác giả, nhân vật em thích, câu nói hay, điều em rút ra được", "Chỉ ghi số trang đã đọc", "Không cần ghi gì", "Sổ tay đọc sách giúp em nhớ và suy ngẫm về sách đã đọc."],
    ["Cuốn sách “Hoàng tử bé” (học ở Bài 1) là của nhà văn nước nào?", "Pháp — Xanh-tơ Ê-xu-pe-ri", "Đan Mạch — An-đéc-xen", "Ấn Độ — Ta-go", "Hoàng tử bé là một trong những cuốn sách được dịch ra nhiều thứ tiếng nhất thế giới."],
    ["Đọc sách có ích lợi gì được các bài học trong năm nhiều lần nhắc tới?", "Mở rộng hiểu biết, nuôi dưỡng tâm hồn, rèn khả năng ngôn ngữ và biết yêu thương, chia sẻ", "Chỉ để giết thời gian", "Chỉ để được điểm cao môn Văn", "Sách là người bạn đồng hành trong học tập và trưởng thành."],
    ["Khi trao đổi về sách trong nhóm, thái độ nào là đúng?", "Trình bày rõ ràng ý kiến của mình, lắng nghe bạn và tôn trọng ý kiến khác biệt", "Chỉ nói phần của mình rồi bỏ đi", "Chê bai cuốn sách bạn giới thiệu", "Trao đổi sách cũng là rèn kĩ năng giao tiếp văn minh."],
    ["Từ “thể loại” của một cuốn sách nghĩa là gì?", "Kiểu loại tác phẩm theo đặc điểm nội dung và hình thức: truyện, thơ, kí, kịch...", "Tên nhà xuất bản", "Kích thước cuốn sách", "Biết thể loại giúp em chọn cách đọc và giới thiệu sách phù hợp."],
    ["Nếu em giới thiệu truyện “Thạch Sanh”, chi tiết nào sau đây là ĐÚNG với truyện?", "Thạch Sanh có cây đàn thần và niêu cơm thần, cứu công chúa, chiến thắng quân xâm lược", "Thạch Sanh may túi ba gang đựng vàng", "Thạch Sanh hoá thân từ một cái sọ dừa", "Đàn thần và niêu cơm thần là chi tiết đặc trưng của Thạch Sanh (túi ba gang là Cây khế, sọ dừa là Sọ Dừa)."],
    ["Câu văn nào phù hợp để KẾT THÚC bài giới thiệu sách?", "“Mình mong các bạn sẽ tìm đọc cuốn sách này, chắc chắn các bạn sẽ có những giờ phút thú vị và nhiều bài học quý.”", "“Hết.”", "“Cuốn sách này cũng bình thường thôi.”", "Kết thúc bài giới thiệu nên gửi gắm lời mời, thông điệp tới người nghe."],
    ["Một “câu nói hay” trích từ sách khi giới thiệu cần làm gì?", "Trích dẫn chính xác và ghi rõ trích từ sách nào, của tác giả nào", "Bịa một câu rồi gán cho tác giả", "Không cần nói trích ở đâu", "Trích dẫn đúng thể hiện sự tôn trọng tác giả và giúp bài giới thiệu đáng tin cậy."],
    ["Dự án “Cuốn sách tôi yêu” giúp em rèn luyện những kĩ năng nào?", "Kĩ năng đọc, ghi chép, nói và trình bày trước đám đông, làm việc nhóm", "Chỉ kĩ năng viết chữ đẹp", "Kĩ năng tính toán nhanh", "Bài học cuối năm là dịp tổng hợp các kĩ năng Ngữ văn đã học."]
  ], [["Cuốn sách tôi yêu", "Dự án đọc sách"], ["Dế Mèn phiêu lưu kí", "Tô Hoài"], ["Hoàng tử bé", "Xanh-tơ Ê-xu-pe-ri"], ["Sổ tay đọc sách", "Ghi chép khi đọc"]], "Nối cho đúng nhé!")
];
/* ================= TIẾNG ANH 6 — Global Success ================= */
var ENG6_FORMS = {
  presSimple: [
    ["She ___ to school by bike every day.", "goes", "go", "going", "Hiện tại đơn với chủ ngữ số ít (she) thêm –es: goes."],
    ["They ___ football after school.", "play", "plays", "played", "Chủ ngữ “they” dùng động từ nguyên thể: play."],
    ["___ your brother study English?", "Does", "Do", "Is", "Câu hỏi hiện tại đơn với chủ ngữ số ít (your brother) dùng “Does”."],
    ["Tom always ___ his homework before dinner.", "does", "do", "doing", "“does” ở đây là động từ chính (làm): Tom does his homework."],
    ["My friends often ___ books in the library.", "read", "reads", "reading", "Chủ ngữ số nhiều (my friends) đi với động từ nguyên thể: read."],
    ["He ___ TV in the evening; he studies.", "doesn't watch", "don't watch", "not watch", "Phủ định với he: doesn't + động từ nguyên thể (watch)."],
    ["Lan ___ up at six o'clock every morning.", "gets", "get", "getting", "Lan là chủ ngữ số ít nên động từ thêm –s: gets."],
    ["We ___ maths on Mondays and Thursdays.", "have", "has", "having", "“We” dùng have; “has” chỉ đi với he/she/it."]
  ],
  prepPoss: [
    ["The cat is ___ the table. (Con mèo ở DƯỚI cái bàn.)", "under", "between", "in front", "“under” nghĩa là ở dưới."],
    ["There is a lamp ___ the desk and the bed.", "between", "in front of", "under", "“between A and B” = ở giữa A và B."],
    ["This is ___, my brother's room.", "Nam's room", "Nam room", "Nams room", "Sở hữu cách: tên riêng + 's: Nam's room (phòng của Nam)."],
    ["The books are ___ the shelf. (Sách đặt TRÊN kệ.)", "on", "under", "behind", "Đồ vật đặt trên bề mặt: on the shelf."],
    ["My house is ___ the supermarket. (Nhà tôi ở PHÍA SAU siêu thị.)", "behind", "next to", "in", "“behind” = ở đằng sau."],
    ["The sofa is ___ the TV. (Ghế sô-pha ở TRƯỚC ti vi.)", "in front of", "between", "under", "“in front of” = ở phía trước."],
    ["These are my parents' ___.", "books", "book", "books'", "Sau sở hữu cách parents' là danh từ thường: books."],
    ["Put the rug ___ the bed, please. (Đặt tấm thảm BÊN CẠNH giường.)", "next to", "between", "under", "“next to” = ở ngay bên cạnh."]
  ],
  presCont: [
    ["Look! She ___ a picture now.", "is drawing", "draws", "drawing", "Hiện tại tiếp diễn (now): is + V-ing."],
    ["They ___ football at the moment.", "are playing", "is playing", "plays", "Chủ ngữ “they” dùng are + V-ing."],
    ["He is ___ in the pool now.", "swimming", "swiming", "swim", "swim → swimming (gấp đôi chữ m rồi thêm –ing)."],
    ["I ___ my homework now.", "am doing", "is doing", "does", "Chủ ngữ “I” luôn đi với am."],
    ["She is ___ a red dress today.", "wearing", "wear", "wears", "Việc đang diễn ra: is wearing."],
    ["We are ___ for the test this week.", "studying", "study", "studies", "are + V-ing: studying."],
    ["It is ___ outside. Take an umbrella!", "raining", "rain", "rains", "Trời đang mưa: is raining."],
    ["He is ___ a bike to school now.", "riding", "rideing", "rides", "ride → riding (bỏ e câm rồi thêm –ing)."]
  ],
  comparative: [
    ["This street is ___ than that one. (Phố này RỘNG hơn.)", "wider", "more wide", "widest", "So sánh hơn của tính từ ngắn wide: wider + than."],
    ["The supermarket is ___ than the market. (ĐẮT hơn.)", "more expensive", "expensiver", "most expensive", "Tính từ dài expensive dùng more expensive."],
    ["A motorbike is ___ than a bicycle. (NHANH hơn.)", "faster", "more fast", "fastest", "fast → faster."],
    ["This park is ___ than the old one. (ĐẸP hơn.)", "more beautiful", "beautifuller", "most beautiful", "beautiful là tính từ dài: more beautiful."],
    ["My neighbourhood is ___ than yours. (YÊN TĨNH hơn.)", "quieter", "more quieter", "quietest", "quiet → quieter (không dùng thêm more)."],
    ["The new bridge is ___ than the old bridge. (DÀI hơn.)", "longer", "more long", "longest", "long → longer."],
    ["English is ___ than maths for me. (DỄ hơn.)", "easier", "more easy", "easiest", "easy → easier (đổi y thành i rồi thêm –er)."],
    ["This film is ___ than that one. (HAY hơn.)", "better", "gooder", "best", "good → better (bất quy tắc); best là so sánh nhất."]
  ],
  mustCount: [
    ["You ___ pick flowers in the park.", "mustn't", "must", "don't must", "mustn't = không được phép làm. Hái hoa trong công viên bị cấm."],
    ["Visitors ___ keep the beach clean.", "must", "mustn't", "musts", "Việc bắt buộc, nên làm: must + động từ nguyên thể."],
    ["How ___ water do you drink every day?", "much", "many", "some", "“water” là danh từ không đếm được → how much."],
    ["There are ___ islands in Ha Long Bay.", "many", "much", "a", "“islands” đếm được, số nhiều → many."],
    ["You ___ take a torch when you go into a cave.", "must", "mustn't", "much", "Vào hang cần đèn pin — điều cần thiết: must."],
    ["There isn't ___ rice left in the pot.", "much", "many", "a lots", "“rice” không đếm được; câu phủ định dùng much."],
    ["Students ___ talk loudly in the library.", "mustn't", "must", "many", "Không được nói to trong thư viện: mustn't."],
    ["___ climb that tree! It's dangerous. (Câu mệnh lệnh phủ định)", "Don't", "Must", "Doesn't", "Mệnh lệnh phủ định: Don't + động từ nguyên thể."]
  ],
  shouldAny: [
    ["You ___ visit your grandparents at Tet.", "should", "shouldn't", "some", "Việc nên làm vào dịp Tết: should."],
    ["Children ___ play with fireworks. It's dangerous.", "shouldn't", "should", "any", "Pháo hoa nguy hiểm nên không nên chơi: shouldn't."],
    ["Would you like ___ peach blossoms for Tet?", "some", "any", "an", "Trong lời mời “Would you like...?” dùng some."],
    ["Do you have ___ lucky money envelopes?", "any", "some", "an", "Câu hỏi thông thường dùng any."],
    ["We should ___ our house before Tet.", "decorate", "decorates", "decorating", "Sau should là động từ nguyên thể: decorate."],
    ["You ___ eat too many sweets at Tet.", "shouldn't", "should", "any", "Ăn quá nhiều kẹo không tốt cho sức khoẻ: shouldn't."],
    ["There are ___ beautiful flowers in the garden.", "some", "any", "an", "Câu khẳng định dùng some."],
    ["Before Tet, people ___ clean their houses. It's a good tradition.", "should", "shouldn't", "any", "Dọn nhà đón Tết là phong tục đẹp: should."]
  ],
  whConj: [
    ["___ programme do you like best?", "Which", "When", "Who", "Hỏi về lựa chọn (chương trình nào): Which."],
    ["___ is your favourite TV character?", "Who", "What time", "Where", "Hỏi về người / nhân vật: Who."],
    ["I like comedies, ___ my sister likes the news.", "but", "so", "because of", "Hai ý trái ngược nhau nối bằng but."],
    ["He loves sports, ___ he watches sports programmes every day.", "so", "but", "and but", "Ý sau là hệ quả của ý trước: so (vì vậy)."],
    ["___ does the film start? — At 8 p.m.", "What time", "Who", "Which channel", "Hỏi giờ bắt đầu: What time."],
    ["We do our homework ___ watch TV in the evening.", "and", "but", "so that", "Hai việc nối tiếp, không trái ngược: and."],
    ["___ channel is the cartoon on?", "Which", "Who", "When", "Hỏi kênh nào: Which channel."],
    ["She is tired, ___ she goes to bed early.", "so", "but", "and but", "Mệt nên đi ngủ sớm — quan hệ nguyên nhân – kết quả: so."]
  ],
  pastImp: [
    ["Yesterday, we ___ football in the park.", "played", "play", "plays", "“Yesterday” → quá khứ đơn: play → played."],
    ["He ___ two goals in the match last Sunday.", "scored", "scores", "score", "score → scored (thêm –d vì tận cùng là e)."],
    ["They ___ to the stadium by bus yesterday.", "went", "go", "goes", "go → went (bất quy tắc)."],
    ["She ___ the race last year.", "won", "wins", "win", "win → won (bất quy tắc)."],
    ["We ___ a great game last night.", "watched", "watch", "watchs", "watch → watched."],
    ["Tom ___ his bike to school yesterday morning.", "rode", "rides", "ride", "ride → rode (bất quy tắc)."],
    ["The players ___ very tired after the match.", "were", "was", "are", "Chủ ngữ số nhiều (players) ở thì quá khứ: were."],
    ["___ quiet in the library, please!", "Be", "To be", "Being", "Câu mệnh lệnh bắt đầu bằng động từ nguyên thể: Be quiet!"],
    ["___ run in the classroom!", "Don't", "Not", "Doesn't", "Mệnh lệnh phủ định: Don't + động từ nguyên thể."],
    ["Please ___ your hands before eating.", "wash", "washes", "washing", "Sau “please” dùng động từ nguyên thể: wash."]
  ],
  possessive: [
    ["This book is ___. (Quyển sách này là của TÔI.)", "mine", "my", "me", "Đại từ sở hữu mine đứng độc lập sau động từ “is”."],
    ["___ house is in Da Nang. (Nhà của CHÚNG TÔI.)", "Our", "Ours", "We", "Đứng trước danh từ (house) phải dùng tính từ sở hữu: Our."],
    ["That bike is ___. (Chiếc xe đó là của CÔ ẤY.)", "hers", "her", "she", "Đại từ sở hữu của she là hers."],
    ["Is this pen ___, Tom? (Cái bút này có phải của BẠN không?)", "yours", "your", "you", "Đại từ sở hữu của you là yours."],
    ["___ school is very big. (Trường của HỌ.)", "Their", "Theirs", "Them", "Trước danh từ school dùng tính từ sở hữu: Their."],
    ["The red car is my father's. The blue one is ___. (Của CHÚNG TÔI.)", "ours", "our", "us", "Đại từ sở hữu của we là ours."],
    ["He is a friend of ___. (Anh ấy là một người bạn của TÔI.)", "mine", "my", "I", "Cấu trúc “a friend of mine” dùng đại từ sở hữu mine."]
  ],
  willMight: [
    ["In the future, robots ___ cook our meals.", "will", "wills", "will to", "will + động từ nguyên thể để nói việc tương lai."],
    ["We ___ live in a houseboat in 2050. It's possible, but we aren't sure.", "might", "will to", "mights", "Việc có thể xảy ra nhưng chưa chắc: might."],
    ["She is sure: she ___ be a doctor when she grows up.", "will", "might to", "willing", "Dự đoán / quyết tâm chắc chắn về tương lai: will."],
    ["There ___ be flying cars one day, but nobody is sure.", "might", "will to", "is will", "Không chắc chắn → might."],
    ["Our future house ___ use solar energy.", "will", "wills to", "might to", "Sau will là động từ nguyên thể use; will không thêm –s."],
    ["I think people ___ live on the Moon one day.", "will", "will to", "willing", "“I think...” + will để dự đoán tương lai."],
    ["He ___ come to the party. He isn't sure yet.", "might", "will to", "mights", "Chưa chắc chắn → might come."]
  ],
  condArt: [
    ["If we recycle bottles, we ___ less rubbish.", "will have", "have yesterday", "would has", "Câu điều kiện loại 1: If + hiện tại đơn, mệnh đề chính dùng will + V."],
    ["If it rains tomorrow, we ___ at home.", "will stay", "stay yesterday", "stays last week", "Điều kiện loại 1: will stay."],
    ["___ Earth is our only home.", "The", "A", "An", "“The Earth” — vật duy nhất nên dùng mạo từ the."],
    ["I need ___ new bag. This one is too old.", "a", "an", "the Earth", "Danh từ số ít đếm được nhắc lần đầu, bắt đầu bằng phụ âm: a."],
    ["She is ___ honest girl.", "an", "a", "the all", "“honest” phát âm bắt đầu bằng nguyên âm (h câm) nên dùng an."],
    ["If you turn off the lights, you ___ energy.", "will save", "save yesterday", "saved last night", "Điều kiện loại 1: will save."],
    ["We should use ___ reusable bag when we go shopping.", "a", "an", "the all", "“reusable” bắt đầu bằng phụ âm /r/ nên dùng a."]
  ],
  superlative: [
    ["This is the ___ robot in the shop. (TO NHẤT.)", "biggest", "bigger", "most big", "big → the biggest (gấp đôi chữ g)."],
    ["Winter is the ___ season of the year. (LẠNH NHẤT.)", "coldest", "colder", "most cold", "cold → the coldest."],
    ["He is the ___ student in our class. (CAO NHẤT.)", "tallest", "taller", "most tall", "tall → the tallest."],
    ["N-10 is the ___ robot of all. (NHANH NHẤT.)", "fastest", "faster", "most fast", "fast → the fastest."],
    ["The blue robot is the ___ of the three. (NHỎ NHẤT.)", "smallest", "smaller", "most small", "small → the smallest."],
    ["Sunday is the ___ day of the week for me. (TỐT NHẤT.)", "best", "goodest", "better", "good → the best (bất quy tắc); better là so sánh hơn."],
    ["This is the ___ exercise in the book. (DỄ NHẤT.)", "easiest", "easier", "most easy", "easy → the easiest (đổi y thành i)."]
  ]
};
var UNITS6 = [
  { n: 1, title: "My New School", words: [["boarding school", "🏫", "trường nội trú"], ["classmate", "🧑‍🤝‍🧑", "bạn cùng lớp"], ["notebook", "📓", "quyển vở"], ["calculator", "🧮", "máy tính cầm tay"], ["compass", "🧭", "cái com-pa"], ["pencil sharpener", "✏️", "cái gọt bút chì"], ["school uniform", "👕", "đồng phục học sinh"], ["subject", "📖", "môn học"], ["art", "🎨", "mĩ thuật"], ["science", "🔬", "khoa học"], ["history", "📜", "lịch sử"], ["geography", "🗺️", "địa lí"]],
    patterns: [{ q: "What's your favourite subject? — It's …", a: "science", w: ["science", "calculator", "uniform"] }, { q: "Do you wear a … at school? — Yes, I do.", a: "uniform", w: ["uniform", "notebook", "compass"] }, { q: "What do you often do after school? — I often … with my classmates.", a: "play football", w: ["play football", "art", "history"] }],
    pron: [["art", "/ɑː/"], ["class", "/ɑː/"], ["subject", "/ʌ/"], ["study", "/ʌ/"]], forms: "presSimple" },
  { n: 2, title: "My House", words: [["flat", "🏢", "căn hộ"], ["town house", "🏠", "nhà phố"], ["country house", "🏡", "nhà ở nông thôn"], ["villa", "🏰", "biệt thự"], ["living room", "🛋️", "phòng khách"], ["bedroom", "🛌", "phòng ngủ"], ["kitchen", "🍳", "nhà bếp"], ["bathroom", "🛁", "phòng tắm"], ["fridge", "🧊", "tủ lạnh"], ["wardrobe", "🚪", "tủ quần áo"], ["lamp", "💡", "cái đèn"], ["television", "📺", "ti vi"]],
    patterns: [{ q: "What type of house do you live in? — I live in a …", a: "town house", w: ["town house", "fridge", "kitchen"] }, { q: "Where is the lamp? — It's … the desk.", a: "on", w: ["on", "under", "behind"] }, { q: "Whose room is this? — It's …", a: "my brother's", w: ["my brother's", "my brothers", "my brother"] }],
    pron: [["rooms", "/z/"], ["flats", "/s/"], ["houses", "/z/"], ["books", "/s/"]], forms: "prepPoss" },
  { n: 3, title: "My Friends", words: [["arm", "💪", "cánh tay"], ["leg", "🦵", "cái chân"], ["hand", "✋", "bàn tay"], ["foot", "🦶", "bàn chân"], ["eye", "👁️", "con mắt"], ["nose", "👃", "cái mũi"], ["mouth", "👄", "cái miệng"], ["hair", "💇", "tóc"], ["friendly", "😊", "thân thiện"], ["kind", "🤗", "tốt bụng"], ["funny", "😂", "hài hước, vui tính"], ["hard-working", "📚", "chăm chỉ"], ["shy", "🙈", "hay xấu hổ"], ["confident", "😎", "tự tin"]],
    patterns: [{ q: "What is she doing now? — She's … a picture.", a: "drawing", w: ["drawing", "draw", "draws"] }, { q: "What's he like? — He's … and funny.", a: "kind", w: ["kind", "nose", "arm"] }, { q: "What does she look like? — She has long black …", a: "hair", w: ["hair", "eyes", "foot"] }],
    pron: [["bed", "/b/"], ["pen", "/p/"], ["book", "/b/"], ["play", "/p/"]], forms: "presCont" },
  { n: 4, title: "My Neighbourhood", words: [["square", "🏛️", "quảng trường"], ["temple", "🛕", "ngôi đền"], ["railway station", "🚉", "ga tàu"], ["hospital", "🏥", "bệnh viện"], ["post office", "📮", "bưu điện"], ["supermarket", "🛒", "siêu thị"], ["cinema", "🎬", "rạp chiếu phim"], ["park", "🌳", "công viên"], ["museum", "🏺", "bảo tàng"], ["market", "🧺", "cái chợ"], ["bridge", "🌉", "cây cầu"], ["cathedral", "⛪", "nhà thờ lớn"]],
    patterns: [{ q: "Is there a supermarket in your neighbourhood? — Yes, …", a: "there is", w: ["there is", "there are", "it is"] }, { q: "Which is …, the park or the square? — The square is.", a: "bigger", w: ["bigger", "big", "biggest"] }, { q: "Excuse me. Where is the …? — It's over there.", a: "post office", w: ["post office", "hospital", "bridge"] }],
    pron: [["city", "/ɪ/"], ["beach", "/iː/"], ["street", "/iː/"], ["bridge", "/ɪ/"]], forms: "comparative" },
  { n: 5, title: "Natural Wonders of Viet Nam", words: [["mountain", "⛰️", "ngọn núi"], ["river", "🏞️", "con sông"], ["waterfall", "💦", "thác nước"], ["cave", "🕳️", "hang động"], ["desert", "🏜️", "sa mạc"], ["forest", "🌲", "khu rừng"], ["island", "🏝️", "hòn đảo"], ["beach", "🏖️", "bãi biển"], ["lake", "🌊", "hồ nước"], ["backpack", "🎒", "ba lô"], ["tent", "⛺", "cái lều"], ["torch", "🔦", "đèn pin"], ["sunscreen", "🧴", "kem chống nắng"]],
    patterns: [{ q: "What is the highest … in Viet Nam? — Fansipan.", a: "mountain", w: ["mountain", "desert", "cave"] }, { q: "You … take a torch into the cave.", a: "must", w: ["must", "mustn't", "much"] }, { q: "Shall we go to the … this summer?", a: "beach", w: ["beach", "torch", "tent"] }],
    pron: [["tent", "/t/"], ["island", "/d/"], ["waterfall", "/t/"], ["desert", "/t/"]], forms: "mustCount" },
  { n: 6, title: "Our Tet Holiday", words: [["peach blossom", "🌸", "hoa đào"], ["apricot blossom", "🌼", "hoa mai"], ["banh chung", "🎋", "bánh chưng"], ["lucky money", "🧧", "tiền lì xì"], ["fireworks", "🎆", "pháo hoa"], ["kumquat tree", "🍊", "cây quất"], ["decorate the house", "🏮", "trang trí nhà cửa"], ["make a wish", "🙏", "ước nguyện, chúc"], ["visit relatives", "👨‍👩‍👧", "thăm họ hàng"], ["calendar", "📅", "quyển lịch"], ["special food", "🍱", "món ăn đặc biệt"], ["family dinner", "🍲", "bữa cơm gia đình"]],
    patterns: [{ q: "What do you do before Tet? — We …", a: "decorate the house", w: ["decorate the house", "lucky money", "calendar"] }, { q: "Children often get … at Tet.", a: "lucky money", w: ["lucky money", "fireworks", "kumquat tree"] }, { q: "You should … your grandparents at Tet.", a: "visit", w: ["visit", "visits", "visiting"] }],
    pron: [["wish", "/ʃ/"], ["should", "/ʃ/"], ["visit", "/s/"], ["see", "/s/"]], forms: "shouldAny" },
  { n: 7, title: "Television", words: [["cartoon", "🐭", "phim hoạt hình"], ["comedy", "🤣", "hài kịch"], ["news", "📰", "bản tin thời sự"], ["documentary", "🎥", "phim tài liệu"], ["game show", "🎲", "chương trình trò chơi"], ["sports programme", "⚽", "chương trình thể thao"], ["weather forecast", "🌦️", "dự báo thời tiết"], ["channel", "📡", "kênh truyền hình"], ["viewer", "👀", "người xem"], ["character", "🦸", "nhân vật"], ["clever", "🧠", "thông minh"], ["popular", "⭐", "nổi tiếng, được yêu thích"]],
    patterns: [{ q: "What's your favourite TV programme? — It's …", a: "cartoon", w: ["cartoon", "channel", "viewer"] }, { q: "… does the news start? — At 7 p.m.", a: "What time", w: ["What time", "Who", "Which"] }, { q: "I like comedies … they make me laugh.", a: "because", w: ["because", "but", "so"] }],
    pron: [["three", "/θ/"], ["think", "/θ/"], ["this", "/ð/"], ["weather", "/ð/"]], forms: "whConj" },
  { n: 8, title: "Sports and Games", words: [["football", "⚽", "bóng đá"], ["badminton", "🏸", "cầu lông"], ["volleyball", "🏐", "bóng chuyền"], ["basketball", "🏀", "bóng rổ"], ["table tennis", "🏓", "bóng bàn"], ["chess", "♟️", "cờ vua"], ["swimming", "🏊", "bơi lội"], ["running", "🏃", "chạy"], ["cycling", "🚴", "đạp xe"], ["karate", "🥋", "võ karate"], ["marathon", "🏅", "cuộc chạy marathon"], ["tennis", "🎾", "quần vợt"]],
    patterns: [{ q: "What sport do you play? — I play …", a: "badminton", w: ["badminton", "chess", "karate"] }, { q: "Did you play football yesterday? — Yes, I …", a: "did", w: ["did", "do", "does"] }, { q: "… up your hands before the game, please!", a: "Warm", w: ["Warm", "Warming", "Warms"] }],
    pron: [["tennis", "/e/"], ["badminton", "/æ/"], ["racket", "/æ/"], ["chess", "/e/"]], forms: "pastImp" },
  { n: 9, title: "Cities of the World", words: [["London", "🇬🇧", "Luân Đôn"], ["New York", "🗽", "Niu Oóc"], ["Sydney", "🦘", "Xít-ni"], ["Paris", "🗼", "Pa-ri"], ["Tokyo", "🗾", "Tô-ki-ô"], ["Singapore", "🇸🇬", "Xin-ga-po"], ["Big Ben", "🕰️", "tháp đồng hồ Big Ben"], ["Merlion", "🦁", "tượng Merlion"], ["postcard", "✉️", "bưu thiếp"], ["landmark", "🏛️", "địa danh nổi tiếng"], ["palace", "🏰", "cung điện"], ["capital", "🏙️", "thủ đô"]],
    patterns: [{ q: "Which city is the … of the UK? — London.", a: "capital", w: ["capital", "postcard", "palace"] }, { q: "Big Ben is a famous … of London.", a: "landmark", w: ["landmark", "capital", "postcard"] }, { q: "This is my postcard. That one is …", a: "yours", w: ["yours", "your", "you"] }],
    pron: [["home", "/əʊ/"], ["house", "/aʊ/"], ["photo", "/əʊ/"], ["town", "/aʊ/"]], forms: "possessive" },
  { n: 10, title: "Our Houses in the Future", words: [["penthouse", "🏙️", "căn hộ áp mái"], ["houseboat", "⛴️", "nhà thuyền"], ["motorhome", "🚐", "nhà xe lưu động"], ["tree house", "🌳", "nhà trên cây"], ["washing machine", "🧺", "máy giặt"], ["dishwasher", "🍽️", "máy rửa bát"], ["air conditioner", "❄️", "máy điều hoà"], ["solar energy", "☀️", "năng lượng mặt trời"], ["robot", "🤖", "người máy, rô-bốt"], ["smart TV", "📺", "ti vi thông minh"], ["electric cooker", "🍚", "nồi cơm điện"], ["fridge", "🧊", "tủ lạnh"]],
    patterns: [{ q: "Where will your future house be? — It will be in a …", a: "tree house", w: ["tree house", "dishwasher", "robot"] }, { q: "Robots will … our meals in the future.", a: "cook", w: ["cook", "cooks", "cooked"] }, { q: "Our house will use … to save energy.", a: "solar energy", w: ["solar energy", "houseboat", "penthouse"] }],
    stress: [["robot", 1, "RO-bot"], ["future", 1, "FU-ture"], ["washing", 1, "WASH-ing"], ["computer", 2, "com-PU-ter"], ["today", 2, "to-DAY"]], forms: "willMight" },
  { n: 11, title: "Our Greener World", words: [["reduce", "⬇️", "giảm, cắt giảm"], ["reuse", "♻️", "tái sử dụng"], ["recycle", "🔄", "tái chế"], ["plastic bag", "🛍️", "túi ni lông"], ["charity", "❤️", "việc từ thiện"], ["swap", "🔁", "trao đổi"], ["environment", "🌍", "môi trường"], ["pollution", "🏭", "sự ô nhiễm"], ["deforestation", "🪓", "nạn phá rừng"], ["rubbish", "🗑️", "rác thải"], ["turn off", "🔌", "tắt (thiết bị điện)"], ["save water", "💧", "tiết kiệm nước"]],
    patterns: [{ q: "What do the three words “reduce, reuse, recycle” help us do? — Protect the …", a: "environment", w: ["environment", "charity", "swap"] }, { q: "If we … more, the world will be greener.", a: "recycle", w: ["recycle", "rubbish", "pollution"] }, { q: "You should … the lights when you leave the room.", a: "turn off", w: ["turn off", "plastic bag", "save water"] }],
    forms: "condArt" },
  { n: 12, title: "Robots", words: [["home robot", "🏠", "rô-bốt gia đình"], ["doctor robot", "🩺", "rô-bốt bác sĩ"], ["worker robot", "🏭", "rô-bốt công nhân"], ["space robot", "🚀", "rô-bốt vũ trụ"], ["laundry", "👕", "việc giặt ủi"], ["make the bed", "🛏️", "dọn giường"], ["water the plants", "🌱", "tưới cây"], ["cook meals", "👨‍🍳", "nấu các bữa ăn"], ["sing a song", "🎤", "hát một bài"], ["dance", "💃", "nhảy múa"], ["teach children", "👩‍🏫", "dạy trẻ em"], ["guard the house", "🐶", "trông nhà"]],
    patterns: [{ q: "What can a home robot do? — It can …", a: "make the bed", w: ["make the bed", "space robot", "laundry"] }, { q: "Which robot can explore Mars? — A …", a: "space robot", w: ["space robot", "doctor robot", "home robot"] }, { q: "This is the … robot of all: it can do everything!", a: "smartest", w: ["smartest", "smarter", "smart"] }],
    forms: "superlative" }
];
var ALL_WORDS6 = [];
UNITS6.forEach(function (u) { u.words.forEach(function (w) { ALL_WORDS6.push(w); }); });
(function () { var seen = {}; for (var i = ALL_WORDS6.length - 1; i >= 0; i--) { if (seen[ALL_WORDS6[i][0]]) ALL_WORDS6.splice(i, 1); else seen[ALL_WORDS6[i][0]] = 1; } })();
function eng6FormGen(list, asBlank) {
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
function eng6PronGen(u) {
  return function () {
    var c = pick(u.pron);
    var sounds = [];
    u.pron.forEach(function (p) { if (sounds.indexOf(p[1]) === -1) sounds.push(p[1]); });
    var extraSounds = ["/s/", "/z/", "/t/", "/d/", "/b/", "/p/", "/θ/", "/e/"];
    var guard = 0;
    while (sounds.length < 3 && guard++ < 50) { var es = pick(extraSounds); if (sounds.indexOf(es) === -1) sounds.push(es); }
    var all = shuffle(sounds.slice(0, 3));
    if (all.indexOf(c[1]) === -1) { all[0] = c[1]; all = shuffle(all); }
    return { prompt: "Từ “" + c[0] + "” chứa âm nào sau đây?", visual: '<div class="big-word">' + c[0] + "</div>",
      options: all.map(function (o) { return { html: '<span class="opt-word">' + o + "</span>" }; }), answer: all.indexOf(c[1]), cols: 3,
      explain: "Từ “" + c[0] + "” chứa âm " + c[1] + "." };
  };
}
/* B6-T9: khử nhiễm chữ cái cho Lớp 6–12 (xem eng10NoLetter ở lop10.js). */
function eng6NoLetter(base) {
  function has(f, name) { return String(f).indexOf(name) !== -1; }
  return {
    choose: base.choose.filter(function (f) { return !has(f, "qEngFirstLetter"); }),
    blank: base.blank.filter(function (f) { return !has(f, "qEngBlankLetter"); }),
    match: base.match.filter(function (f) { return f !== mEngLetterWord && !has(f, "mEngLetterWord"); }),
    games: base.games.filter(function (f) { return f !== gSortLetters && !has(f, "gSortLetters"); })
  };
}
function eng6Pools(u) {
  var base = eng6NoLetter(engPools(u.words));
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
  var formList = u.forms ? ENG6_FORMS[u.forms] : null;
  if (formList) { choose.push(eng6FormGen(formList, false), eng6FormGen(formList, false)); }
  if (u.pron && u.pron.length) choose.push(eng6PronGen(u), eng6PronGen(u));
  if (u.stress && u.stress.length) choose.push(eng5StressGen(u), eng5StressGen(u));
  var blank = base.blank.slice(); /* B6-T9: thay wrapper chữ cái riêng bằng blank của base đã lọc (điền từ trong câu) */
  if (pats.length) blank.push(patBlank);
  if (formList) blank.push(eng6FormGen(formList, true));
  return { choose: choose, blank: blank, match: base.match, games: base.games.concat([yesNoGen]) };
}
/* ================= KHOA HỌC TỰ NHIÊN 6 — 10 chương ================= */
function m6UnitConvGen() {
  var convs = [
    { q: function () { var m = rand(2, 9); return ["Đổi đơn vị: " + m + " m = ? cm", m * 100, "1 m = 100 cm nên " + m + " m = " + (m * 100) + " cm."]; } },
    { q: function () { var cm = rand(2, 9) * 100; return ["Đổi đơn vị: " + cm + " cm = ? m", cm / 100, "100 cm = 1 m nên " + cm + " cm = " + (cm / 100) + " m."]; } },
    { q: function () { var kg = rand(2, 9); return ["Đổi đơn vị: " + kg + " kg = ? g", kg * 1000, "1 kg = 1000 g nên " + kg + " kg = " + fmtN(kg * 1000) + " g."]; } },
    { q: function () { var g = rand(2, 9) * 1000; return ["Đổi đơn vị: " + fmtN(g) + " g = ? kg", g / 1000, "1000 g = 1 kg nên " + fmtN(g) + " g = " + (g / 1000) + " kg."]; } },
    { q: function () { var ph = rand(2, 9); return ["Đổi đơn vị: " + ph + " giờ = ? phút", ph * 60, "1 giờ = 60 phút nên " + ph + " giờ = " + (ph * 60) + " phút."]; } },
    { q: function () { var ph = pick([60, 120, 180, 240, 300]); return ["Đổi đơn vị: " + ph + " phút = ? giờ", ph / 60, "60 phút = 1 giờ nên " + ph + " phút = " + (ph / 60) + " giờ."]; } },
    { q: function () { var km = rand(2, 9); return ["Đổi đơn vị: " + km + " km = ? m", km * 1000, "1 km = 1000 m nên " + km + " km = " + fmtN(km * 1000) + " m."]; } },
    { q: function () { var mm = rand(2, 9) * 10; return ["Đổi đơn vị: " + mm + " mm = ? cm", mm / 10, "10 mm = 1 cm nên " + mm + " mm = " + (mm / 10) + " cm."]; } }
  ];
  var c = pick(convs).q();
  return numMCQ6(c[0], "", c[1], c[2], 10);
}
var KHTN6_TOPICS = [
  (function () { var kp = knowledgePools([
      ["Khoa học tự nhiên nghiên cứu những gì?", "Các sự vật, hiện tượng và quá trình trong tự nhiên (chất, năng lượng, Trái Đất, sự sống...)", "Chỉ nghiên cứu con số và phép tính", "Chỉ nghiên cứu ngôn ngữ", "KHTN là môn khoa học nghiên cứu thế giới tự nhiên xung quanh ta."],
      ["Trong phòng thực hành, việc làm nào là AN TOÀN?", "Đeo kính, găng tay khi cần; không ăn uống trong phòng; làm theo hướng dẫn của thầy cô", "Ngửi trực tiếp hoá chất lạ", "Chạy nhảy, đùa nghịch gần bếp cồn", "An toàn phòng thực hành là quy tắc bắt buộc trước mỗi thí nghiệm."],
      ["Kính lúp dùng để làm gì?", "Quan sát rõ hơn các vật nhỏ (phóng đại hình ảnh của vật)", "Đo khối lượng của vật", "Đo nhiệt độ", "Kính lúp phóng đại giúp nhìn rõ chi tiết nhỏ như gân lá, côn trùng nhỏ."],
      ["Kính hiển vi khác kính lúp ở điểm nào?", "Kính hiển vi phóng đại lớn hơn nhiều, quan sát được những vật cực nhỏ như tế bào", "Kính hiển vi dùng để đo chiều dài", "Hai kính giống hệt nhau", "Nhờ kính hiển vi, con người mới thấy được tế bào và vi khuẩn."],
      ["Để đo chiều dài của một vật, em dùng dụng cụ nào?", "Thước (thước kẻ, thước dây, thước cuộn...)", "Cân đồng hồ", "Nhiệt kế", "Chọn thước có giới hạn đo và độ chia nhỏ nhất phù hợp với vật cần đo."],
      ["Độ chia nhỏ nhất (ĐCNN) của thước là gì?", "Độ dài giữa hai vạch chia liên tiếp trên thước", "Chiều dài tối đa thước đo được", "Bề rộng của thước", "ĐCNN cho biết độ chính xác của phép đo."],
      ["Đo khối lượng của vật bằng dụng cụ nào?", "Cân (cân đồng hồ, cân điện tử, cân Roberval...)", "Thước dây", "Bình chia độ", "Khối lượng đo bằng cân, đơn vị thường dùng là kilôgam (kg) và gam (g)."],
      ["Đơn vị đo thời gian thường dùng và kí hiệu giây là gì?", "Giây (s), phút (ph), giờ (h)", "Mét (m)", "Lít (l)", "1 giờ = 60 phút, 1 phút = 60 giây."],
      ["Nhiệt độ được đo bằng dụng cụ nào và đơn vị thường dùng ở Việt Nam?", "Nhiệt kế; đơn vị độ C (°C)", "Thước; đơn vị mét", "Cân; đơn vị kilôgam", "Nhiệt kế thuỷ ngân/điện tử đo nhiệt độ theo độ C."],
      ["Khi đo chiều dài, cách đặt mắt đọc kết quả đúng là gì?", "Nhìn vuông góc với vạch chia của thước tại điểm cần đọc", "Nhìn từ phía trên chếch xuống tuỳ ý", "Nhìn từ bất kì hướng nào cũng được", "Đặt mắt vuông góc giúp tránh sai số khi đọc."],
      ["Trước khi đo khối lượng bằng cân Roberval (cân đĩa), cần làm gì?", "Hiệu chỉnh để kim cân chỉ đúng vạch số 0 (cân thăng bằng)", "Đặt ngay vật lên đĩa", "Lắc mạnh cân cho vui", "Hiệu chỉnh về 0 giúp kết quả đo chính xác."],
      ["Đo thể tích chất lỏng bằng bình chia độ, cần đặt bình thế nào?", "Đặt bình trên mặt phẳng nằm ngang, mắt nhìn ngang mức chất lỏng", "Cầm trên tay nghiêng bình", "Đặt bình nghiêng 45 độ", "Đọc ở mức thấp nhất của mặt cong chất lỏng (mặt khum dưới)."],
      ["Vì sao khi làm thí nghiệm phải ghi chép kết quả cẩn thận?", "Để có số liệu đối chiếu, rút ra kết luận đúng và báo cáo lại được", "Chỉ để thầy cô khỏi nhắc", "Ghi chép là không cần thiết", "Ghi chép, quan sát là kĩ năng cơ bản của nhà khoa học."]
    ], [["Kính lúp", "Phóng đại vật nhỏ"], ["Kính hiển vi", "Nhìn thấy tế bào"], ["Thước", "Đo chiều dài"], ["Cân", "Đo khối lượng"]], "Nối dụng cụ với công dụng nhé!");
    kp.choose.push(m6UnitConvGen, m6UnitConvGen, m6UnitConvGen);
    kp.blank.push(function () { var m = rand(2, 9); return numBlank6("Đổi đơn vị đo!", m + " m = ? cm", m * 100, "1 m = 100 cm."); });
    return { id: "kh6-modau", emoji: "🔬", name: "Mở đầu: KHTN, an toàn và phép đo", sub: "Bài 1–7 • An toàn phòng thực hành • Kính lúp, kính hiển vi • Đo chiều dài, khối lượng, thời gian, nhiệt độ", pools: kp }; })(),
  topic("kh6-chat", "🧪", "Chất quanh ta: thể của chất, oxygen và không khí", "Các thể và sự chuyển thể • Oxygen • Thành phần không khí • Bảo vệ môi trường không khí", [
    ["Chất tồn tại ở ba thể cơ bản nào?", "Rắn, lỏng và khí", "Chỉ rắn và lỏng", "Rắn, lỏng, khí và plasma (chỉ học 3 thể cơ bản)", "Ba thể cơ bản: rắn, lỏng, khí. Vật quanh ta như đá (rắn), nước (lỏng), hơi nước (khí)."],
    ["Chất ở thể rắn có đặc điểm gì?", "Có hình dạng và thể tích xác định", "Không có hình dạng xác định", "Luôn bay hơi thành khí", "Thể rắn giữ nguyên hình dạng (trong điều kiện thường)."],
    ["Sự chuyển từ thể lỏng sang thể khí gọi là gì?", "Sự bay hơi (và sôi)", "Sự đông đặc", "Sự ngưng tụ", "Nước đun sôi bay hơi thành hơi nước là chuyển từ lỏng sang khí."],
    ["Sự chuyển từ thể khí sang thể lỏng gọi là gì?", "Sự ngưng tụ", "Sự bay hơi", "Sự nóng chảy", "Hơi nước gặp lạnh ngưng tụ thành giọt nước (sương, mây)."],
    ["Khi đun nóng một miếng sáp (nến), sáp chảy ra. Đó là sự chuyển thể nào?", "Nóng chảy (rắn → lỏng)", "Đông đặc", "Ngưng tụ", "Nóng chảy là chuyển từ thể rắn sang thể lỏng khi được cung cấp nhiệt."],
    ["Oxygen có tính chất nào sau đây?", "Khí không màu, không mùi, duy trì sự cháy và cần cho hô hấp", "Khí có màu vàng, mùi hắc", "Khí làm tắt mọi ngọn lửa", "Oxygen chiếm khoảng 1/5 thể tích không khí, rất cần cho sự sống."],
    ["Không khí gồm những thành phần chính nào?", "Chủ yếu là ni-tơ (khoảng 78%), ô-xi (khoảng 21%) và một phần nhỏ các khí khác", "100% là ô-xi", "Chỉ có ô-xi và bụi", "Ni-tơ chiếm phần lớn nhất trong không khí."],
    ["Cây xanh có vai trò gì với không khí?", "Quang hợp hấp thụ CO₂, nhả ra O₂, giúp không khí trong lành", "Làm không khí ô nhiễm hơn", "Không có vai trò gì", "Trồng và bảo vệ cây xanh là cách giữ không khí sạch."],
    ["Hành động nào gây ô nhiễm không khí?", "Đốt rác thải, khói xe và khói nhà máy thải ra không kiểm soát", "Trồng cây xanh trước nhà", "Đi xe đạp đi học", "Khói bụi từ đốt rác, giao thông, nhà máy làm không khí bẩn."],
    ["Sự cháy cần điều kiện gì?", "Cần chất cháy, oxygen và nhiệt độ đủ cao (nguồn nhiệt)", "Chỉ cần chất cháy", "Cần thật nhiều nước", "Ba yếu tố của sự cháy: chất cháy + oxygen + nhiệt. Muốn dập lửa phải loại bỏ ít nhất một yếu tố."],
    ["Để dập tắt một đám cháy nhỏ do xăng dầu, cách làm đúng là gì?", "Dùng cát hoặc chăn ướt phủ lên để ngăn oxygen (không dùng nước dội trực tiếp)", "Dội nhiều nước vào", "Quạt mạnh cho lửa tắt", "Phủ kín ngăn oxygen là nguyên tắc dập lửa; xăng dầu nhẹ hơn nước nên dội nước làm lửa lan."],
    ["Chất nào sau đây ở thể KHÍ trong điều kiện thường?", "Hơi nước, oxygen, khí cacbonic", "Nước đá", "Sắt", "Oxygen, cacbonic và hơi nước đều là chất khí."],
    ["Vì sao buổi sáng sớm mùa đông hay có sương mù?", "Hơi nước trong không khí gặp lạnh ngưng tụ thành những giọt nước nhỏ li ti", "Do khói nhà máy tạo ra toàn bộ", "Do mặt đất bốc hơi đá", "Ngưng tụ của hơi nước tạo thành sương mù."],
    ["Thể rắn có đặc điểm gì về hình dạng và thể tích?", "Có hình dạng và thể tích xác định", "Chỉ có thể tích xác định", "Không có hình dạng và thể tích xác định", "Chất rắn giữ nguyên hình dạng khi đổi vật chứa."],
    ["Thể lỏng có đặc điểm gì về hình dạng và thể tích?", "Có thể tích xác định nhưng mang hình dạng của vật chứa", "Có hình dạng xác định như thể rắn", "Không có thể tích xác định", "Đổ nước sang chai khác, thể tích không đổi nhưng hình dạng thay đổi."],
    ["Quá trình chất chuyển từ thể lỏng sang thể rắn gọi là gì?", "Sự đông đặc", "Sự nóng chảy", "Sự bay hơi", "Ví dụ: nước đóng thành băng khi để trong ngăn đá tủ lạnh."],
    ["Phơi quần áo ướt ngoài nắng, sau một lúc quần áo khô vì nước đã thế nào?", "Bay hơi thành hơi nước vào không khí", "Thấm hết vào sợi vải vĩnh viễn", "Biến thành chất rắn", "Bay hơi xảy ra ở bề mặt chất lỏng, nhanh hơn khi có nắng và gió."],
    ["Khí CO2 chiếm khoảng bao nhiêu phần trăm thể tích không khí?", "Khoảng 0,03% – 0,04% (rất ít)", "Khoảng 21%", "Khoảng 78%", "CO2 chiếm tỉ lệ rất nhỏ nhưng có vai trò lớn với cây xanh và khí hậu."],
    ["Hai thành phần chính chiếm tới 99% thể tích không khí khô là gì?", "Ni-tơ (78%) và oxygen (21%)", "Oxygen và CO2", "CO2 và hơi nước", "Ni-tơ chiếm nhiều nhất, oxygen đứng thứ hai trong không khí."],
    ["Oxygen tan được trong nước có ý nghĩa gì với sinh vật thuỷ sinh?", "Cá và sinh vật dưới nước dùng oxygen hoà tan để hô hấp", "Làm nước có màu xanh", "Không có ý nghĩa gì", "Oxygen tan ít trong nước nhưng đủ để duy trì hô hấp của sinh vật thuỷ sinh."],
    ["Để kiểm tra một lọ khí có phải oxygen không, người ta dùng cách nào?", "Đưa que đóm còn tàn đỏ vào, que đóm bùng cháy trở lại", "Đưa que đóm đang cháy, lửa tắt ngay", "Ngửi mùi của khí", "Oxygen duy trì sự cháy nên làm tàn đỏ bùng cháy."],
    ["Khí CO2 làm nước vôi trong thay đổi thế nào?", "Làm nước vôi trong vẩn đục", "Làm nước vôi trong có màu xanh", "Không làm thay đổi gì", "Thổi hơi thở (có CO2) vào nước vôi trong sẽ thấy vẩn đục."],
    ["Đốt nhiều than, dầu, xăng gây ra hậu quả gì cho môi trường?", "Thải CO2 và khói bụi, gây ô nhiễm và nóng lên toàn cầu", "Làm không khí trong lành hơn", "Không có hậu quả gì", "Hạn chế đốt nhiên liệu hoá thạch là cách bảo vệ bầu khí quyển."],
    ["Chất nào sau đây ở thể LỎNG trong điều kiện thường?", "Dầu ăn", "Muối ăn", "Khí oxygen", "Dầu ăn, xăng, nước là các chất lỏng quen thuộc."],
    ["Sự SÔI khác sự BAY HƠI ở điểm nào?", "Sôi xảy ra trong toàn khối lỏng; bay hơi chỉ ở bề mặt", "Sôi chỉ xảy ra ở bề mặt", "Hai hiện tượng hoàn toàn giống nhau", "Nước sôi ở 100°C (áp suất thường), hơi nước bốc lên trong toàn khối nước."],
    ["“Khói trắng” bốc lên trên miệng ấm nước đang sôi thực chất là gì?", "Hơi nước gặp lạnh ngưng tụ thành giọt nước nhỏ li ti", "Khói của lửa bếp bay lên", "Khí oxygen thoát ra", "Hơi nước vốn không màu; gặp không khí lạnh nó ngưng tụ thành sương nhỏ màu trắng."],
    ["Học sinh có thể bảo vệ không khí trong lành bằng việc làm nào?", "Trồng cây xanh, hạn chế đốt rác, ưu tiên đi bộ hoặc xe đạp", "Đốt rác nhựa sau nhà", "Chặt cây để sân rộng hơn", "Mỗi hành động nhỏ đều góp phần giữ bầu không khí sạch."]
  ], [["Nóng chảy", "Rắn → lỏng"], ["Đông đặc", "Lỏng → rắn"], ["Bay hơi", "Lỏng → khí"], ["Ngưng tụ", "Khí → lỏng"]], "Nối sự chuyển thể cho đúng nhé!"),
  topic("kh6-vatlieu", "🧱", "Vật liệu, nguyên liệu, nhiên liệu và thực phẩm", "Tính chất và ứng dụng • Phân loại • Tiết kiệm, bảo vệ môi trường", [
    ["Vật liệu là gì?", "Là chất hoặc hỗn hợp các chất được con người sử dụng để làm ra sản phẩm", "Là mọi thứ trong tự nhiên chưa qua chế biến", "Chỉ là kim loại", "Ví dụ vật liệu: gỗ, nhựa, kim loại, cao su, thuỷ tinh, gốm sứ..."],
    ["Nguyên liệu là gì?", "Vật liệu lấy từ tự nhiên (hoặc đã qua sơ chế) dùng làm đầu vào để sản xuất ra vật liệu, sản phẩm khác", "Sản phẩm đã hoàn thiện đem bán", "Rác thải sau sản xuất", "Ví dụ: quặng sắt là nguyên liệu để luyện thép; mía là nguyên liệu làm đường."],
    ["Nhiên liệu là gì?", "Chất khi cháy toả nhiệt và phát sáng, dùng để đun nấu, chạy máy, phát điện", "Chất dùng để xây nhà", "Chất dùng để giặt quần áo", "Nhiên liệu quen thuộc: than, củi, dầu, khí ga, xăng."],
    ["Nhóm nào gồm các vật liệu là KIM LOẠI?", "Sắt, nhôm, đồng", "Gỗ, tre, nứa", "Nhựa, cao su", "Kim loại dẫn điện, dẫn nhiệt tốt, có ánh kim."],
    ["Thuỷ tinh có tính chất nổi bật nào?", "Trong suốt, cứng nhưng giòn, dễ vỡ, không dẫn điện", "Mềm dẻo như cao su", "Cháy rất mạnh", "Thuỷ tinh dùng làm cửa kính, chai lọ, kính hiển vi..."],
    ["Vì sao nồi nấu ăn thường làm bằng kim loại còn tay cầm làm bằng nhựa hoặc gỗ?", "Kim loại dẫn nhiệt tốt giúp nấu nhanh; nhựa, gỗ cách nhiệt giúp cầm không bị bỏng", "Vì kim loại rẻ hơn nhựa", "Vì thói quen ngẫu nhiên", "Chọn vật liệu phải dựa vào tính chất phù hợp với công dụng."],
    ["Cao su thường được dùng làm lốp xe, đế giày vì tính chất gì?", "Đàn hồi, bền, không thấm nước, cách điện", "Cứng và giòn nhất", "Dẫn điện rất tốt", "Tính đàn hồi và ma sát tốt giúp lốp xe bám đường."],
    ["Lương thực là gì?", "Thức ăn có chứa tinh bột như gạo, ngô, khoai, sắn... cung cấp năng lượng chính cho con người", "Mọi loại thức ăn nói chung", "Chỉ gồm thịt và cá", "Thực phẩm gồm cả lương thực và các thức ăn khác (rau, thịt, cá, trứng, sữa...)."],
    ["Thực phẩm để lâu bị ôi thiu là do đâu?", "Vi sinh vật phát triển trong thực phẩm làm biến đổi chất", "Do thực phẩm tự biến mất chất", "Do ánh nắng làm đổi màu mà thôi", "Bảo quản đúng cách (ướp lạnh, phơi khô, đóng hộp...) giúp thực phẩm lâu hỏng."],
    ["Việc làm nào giúp tiết kiệm và sử dụng vật liệu bền vững?", "Tái chế, tái sử dụng, phân loại rác, hạn chế đồ nhựa dùng một lần", "Vứt mọi thứ sau một lần dùng", "Đốt hết rác nhựa trong vườn", "Sử dụng vật liệu thân thiện môi trường là trách nhiệm của mọi người."],
    ["Nhiên liệu nào sau đây là nhiên liệu TÁI TẠO được?", "Củi, than củi từ rừng trồng (và các nhiên liệu sinh học)", "Dầu mỏ", "Than đá", "Dầu mỏ, than đá là nhiên liệu hoá thạch, không tái tạo trong thời gian ngắn."],
    ["Gốm, sứ được làm từ nguyên liệu chính nào?", "Đất sét nung ở nhiệt độ cao", "Nhựa nóng chảy", "Bột giấy", "Gốm sứ: bát đĩa, gạch ngói, ấm chén... từ đất sét qua nung."],
    ["Vì sao cần khai thác nguyên liệu, nhiên liệu một cách hợp lí?", "Vì nguồn tài nguyên thiên nhiên có hạn, khai thác bừa bãi gây cạn kiệt và ô nhiễm môi trường", "Vì khai thác càng nhiều càng tốt vô hạn", "Không cần quan tâm vì tài nguyên vô tận", "Tiết kiệm tài nguyên là bảo vệ tương lai của chính chúng ta."],
    ["Nhựa có những tính chất nổi bật nào?", "Nhẹ, bền, không thấm nước, dễ tạo hình, cách điện", "Nặng, dẫn điện rất tốt", "Giòn và dễ vỡ như thuỷ tinh", "Nhựa được dùng làm chai lọ, ống nước, vỏ dây điện..."],
    ["Vì sao dây điện thường có lõi đồng và vỏ bọc bằng nhựa?", "Đồng dẫn điện tốt; nhựa cách điện, bảo vệ an toàn", "Đồng cách điện, nhựa dẫn điện", "Chỉ vì đồng và nhựa rẻ", "Kết hợp vật liệu theo tính chất là nguyên tắc chọn vật liệu."],
    ["Nhiên liệu hoá thạch gồm những loại nào?", "Than đá, dầu mỏ, khí thiên nhiên", "Củi và than củi", "Gió và ánh sáng Mặt Trời", "Nhiên liệu hoá thạch hình thành hàng triệu năm, không tái tạo kịp."],
    ["Than đá được dùng chủ yếu để làm gì?", "Đốt lấy nhiệt để phát điện, luyện kim, sưởi ấm", "Làm thức ăn chăn nuôi", "Dệt thành vải", "Than đá là nhiên liệu quan trọng của nhà máy nhiệt điện."],
    ["Giấy được sản xuất chủ yếu từ nguyên liệu nào?", "Gỗ (bột gỗ từ cây trồng) và giấy tái chế", "Cát trắng", "Quặng sắt", "Trồng rừng lấy gỗ làm giấy và tái chế giấy giúp bảo vệ rừng."],
    ["Sắt để ngoài không khí ẩm lâu ngày bị gỉ do tác dụng với những chất nào?", "Oxygen và hơi nước trong không khí", "Khí ni-tơ", "Chỉ do ánh nắng Mặt Trời", "Gỉ sắt làm đồ sắt hỏng dần; cần sơn, mạ hoặc bôi dầu mỡ để chống gỉ."],
    ["Để chống gỉ cho đồ vật bằng sắt, người ta thường làm gì?", "Sơn, mạ hoặc bôi dầu mỡ lên bề mặt", "Ngâm trong nước muối", "Để nơi càng ẩm càng tốt", "Lớp phủ ngăn sắt tiếp xúc trực tiếp với không khí ẩm."],
    ["Nhóm thực phẩm nào giàu CHẤT ĐẠM (protein)?", "Thịt, cá, trứng, sữa, đậu", "Cơm, bánh mì, khoai", "Rau xanh, trái cây", "Chất đạm giúp xây dựng và sửa chữa cơ thể."],
    ["Nhóm thực phẩm nào giàu VITAMIN và chất khoáng nhất?", "Rau xanh và quả chín", "Thịt, trứng, sữa", "Cơm, phở, cháo", "Rau quả cung cấp vitamin, chất khoáng và chất xơ."],
    ["Dầu ăn, mỡ lợn, bơ thuộc nhóm chất dinh dưỡng nào?", "Nhóm chất béo", "Nhóm chất đạm", "Nhóm tinh bột", "Chất béo dự trữ năng lượng và giúp hấp thụ một số vitamin."],
    ["Vật liệu nào khó phân huỷ, gây hại môi trường khi thải bỏ bừa bãi?", "Nhựa dùng một lần (túi ni lông, chai nhựa)", "Lá cây khô", "Vỏ trái cây", "Túi ni lông tồn tại hàng trăm năm trong môi trường."],
    ["Nguyên tắc “giảm thiểu – tái sử dụng – tái chế” thường được gọi tắt là gì?", "Nguyên tắc 3R", "Nguyên tắc 5S", "Quy tắc 3T", "3R: Reduce (giảm thiểu), Reuse (tái sử dụng), Recycle (tái chế)."],
    ["Kim loại nào nhẹ, thường dùng làm vỏ máy bay và xoong nồi?", "Nhôm", "Chì", "Thuỷ ngân", "Nhôm nhẹ, bền, dẫn nhiệt tốt và khó gỉ."],
    ["Nguyên liệu chính để nấu thuỷ tinh là gì?", "Cát thạch anh (cát trắng)", "Đất sét", "Bột gỗ", "Cát nấu chảy ở nhiệt độ rất cao tạo thành thuỷ tinh."]
  ], [["Quặng sắt", "Nguyên liệu luyện thép"], ["Thuỷ tinh", "Trong suốt, giòn, dễ vỡ"], ["Cao su", "Đàn hồi, cách điện"], ["Than, dầu, ga", "Nhiên liệu"]], "Nối cho đúng nhé!"),
  (function () { var kp = knowledgePools([
      ["Hỗn hợp là gì?", "Gồm hai hay nhiều chất trộn lẫn vào nhau, mỗi chất vẫn giữ tính chất của nó", "Một chất nguyên chất duy nhất", "Chất đã bị biến đổi hoàn toàn thành chất mới", "Ví dụ: hỗn hợp cát và sỏi, nước muối loãng, không khí."],
      ["Để tách cát ra khỏi hỗn hợp cát và nước, em dùng phương pháp nào?", "Lọc (dùng giấy lọc/phễu lọc giữ lại cát)", "Cô cạn", "Chưng cất", "Lọc dùng để tách chất không tan ra khỏi chất lỏng."],
      ["Để thu được muối từ nước biển, người ta dùng phương pháp nào?", "Phơi nắng cho nước bay hơi (cô cạn)", "Lọc bằng giấy lọc", "Dùng nam châm hút", "Ruộng muối phơi nắng: nước bay hơi, muối kết tinh còn lại."],
      ["Phương pháp CÔ CẠN dùng để làm gì?", "Tách chất rắn tan trong chất lỏng bằng cách đun cho chất lỏng bay hơi hết", "Tách hai chất lỏng bằng nhiệt độ sôi", "Tách sắt ra khỏi hỗn hợp", "Cô cạn nước đường, nước muối để thu chất rắn hoà tan."],
      ["Phương pháp CHƯNG CẤT dùng để tách hỗn hợp nào?", "Tách các chất lỏng có nhiệt độ sôi khác nhau (ví dụ sản xuất nước cất, rượu)", "Tách cát khỏi nước", "Tách dầu khỏi nước bằng phễu chiết", "Chưng cất dựa vào chênh lệch nhiệt độ sôi của các chất lỏng."],
      ["Để tách sắt vụn ra khỏi hỗn hợp sắt và cát, cách nhanh nhất là gì?", "Dùng nam châm hút sắt ra", "Đổ nước vào rồi lọc", "Đun nóng hỗn hợp", "Nam châm chỉ hút vật liệu từ tính như sắt."],
      ["Dầu ăn nổi trên mặt nước, để tách dầu ra khỏi nước ta dùng gì?", "Phễu chiết (để yên cho hai lớp tách ra rồi mở khoá cho nước chảy ra)", "Giấy lọc", "Đun sôi hỗn hợp", "Hai chất lỏng không tan vào nhau tách lớp, dùng phễu chiết để tách."],
      ["Hỗn hợp nước và bột mì (bột lơ lửng) khi để yên một lúc sẽ thế nào?", "Bột lắng dần xuống đáy (lắng gạn) rồi có thể gạn lấy phần nước trong", "Bột tan hoàn toàn như đường", "Bột nổi lên mặt nước mãi", "Lắng gạn là phương pháp tách đơn giản dựa vào lắng đọng."],
      ["Khi pha một cốc nước chanh đường, đường biến mất trong nước. Đó là hiện tượng gì?", "Đường hoà tan vào nước tạo thành dung dịch đồng nhất", "Đường đã bay hơi hết", "Đường biến thành chất khác", "Dung dịch là hỗn hợp đồng nhất của chất tan và dung môi."],
      ["Trong dung dịch nước đường, đâu là chất tan, đâu là dung môi?", "Đường là chất tan, nước là dung môi", "Nước là chất tan, đường là dung môi", "Cả hai đều là chất tan", "Dung môi là chất có lượng nhiều hơn, hoà tan chất tan."],
      ["Vì sao không nên đổ dầu mỡ thừa xuống cống nước?", "Dầu mỡ không tan trong nước, gây tắc cống và ô nhiễm nguồn nước", "Vì dầu sẽ tan làm nước ngon hơn", "Không có hại gì", "Dầu mỡ cần được thu gom xử lí riêng."],
      ["Muốn tách riêng từng chất trong hỗn hợp gồm: sắt vụn, cát và muối ăn, bước hợp lí nhất trước tiên là gì?", "Dùng nam châm lấy sắt vụn ra trước", "Đun sôi hỗn hợp ngay", "Hoà vào nước rồi uống thử", "Sau đó hoà nước, lọc lấy cát, cô cạn lấy muối — nhiều phương pháp kết hợp theo thứ tự hợp lí."],
      ["Không khí có phải là hỗn hợp không?", "Có, không khí là hỗn hợp của nhiều khí (ni-tơ, ô-xi, cacbonic...)", "Không, không khí là một chất nguyên chất", "Không khí không chứa chất gì", "Không khí là hỗn hợp khí quan trọng nhất với sự sống."],
      ["Chất tinh khiết (chất nguyên chất) là chất như thế nào?", "Chỉ gồm một chất duy nhất, không lẫn chất khác", "Luôn là hỗn hợp nhiều chất", "Chất nào cũng pha tạp chất", "Ví dụ chất tinh khiết: nước cất, muối tinh luyện, oxygen nguyên chất."],
      ["Dung dịch là gì?", "Hỗn hợp đồng nhất của chất tan phân bố đều trong dung môi", "Hỗn hợp luôn vẩn đục, lắng cặn", "Một chất nguyên chất duy nhất", "Nước đường, nước muối loãng là các dung dịch quen thuộc."],
      ["Dãy nào gồm toàn HỖN HỢP?", "Nước muối, không khí, nước cam", "Nước cất, vàng nguyên chất", "Oxygen, sắt nguyên chất", "Hỗn hợp gồm từ hai chất trở lên trộn lẫn."],
      ["Để tách muối ăn ra khỏi hỗn hợp muối và cát, trình tự hợp lí là gì?", "Hoà vào nước, lọc bỏ cát, cô cạn lấy muối", "Đun nóng hỗn hợp khô", "Dùng nam châm hút muối ra", "Muối tan trong nước còn cát không tan — kết hợp hoà tan, lọc và cô cạn."],
      ["Sàng cát xây dựng để loại bỏ sỏi to là ứng dụng của phương pháp nào?", "Sàng (rây) tách theo kích thước hạt", "Chưng cất", "Cô cạn", "Các hạt nhỏ lọt qua mắt sàng, hạt to bị giữ lại."],
      ["Máy lọc nước gia đình loại bỏ tạp chất chủ yếu bằng cách nào?", "Lọc qua các lõi lọc và màng lọc", "Đun sôi liên tục", "Phơi ngoài nắng", "Lõi lọc giữ lại cặn bẩn, vi khuẩn có kích thước lớn hơn lỗ lọc."],
      ["Hỗn hợp nào sau đây là hỗn hợp ĐỒNG NHẤT?", "Nước muối loãng (muối tan đều trong nước)", "Nước và dầu ăn", "Cát trộn sỏi", "Hỗn hợp đồng nhất không nhìn thấy ranh giới giữa các chất."],
      ["Khi tăng nhiệt độ, lượng đường tan được trong nước thường thay đổi thế nào?", "Tăng lên (tan được nhiều đường hơn)", "Giảm xuống rõ rệt", "Không thay đổi chút nào", "Pha nước đường nóng dễ hoà tan nhiều đường hơn nước lạnh."],
      ["Dung dịch BÃO HOÀ là dung dịch như thế nào?", "Không thể hoà tan thêm chất tan ở nhiệt độ đó nữa", "Dung dịch rất loãng", "Dung dịch có màu đậm nhất", "Thêm đường vào nước đường bão hoà, đường sẽ lắng xuống đáy."],
      ["Nước cất dùng trong phòng thí nghiệm thu được bằng phương pháp nào?", "Chưng cất nước thường", "Lọc bằng giấy lọc một lần", "Để lắng qua đêm", "Chưng cất cho nước tinh khiết hơn lọc thông thường."],
      ["Vì sao ở ruộng muối, muối kết tinh nhiều vào những ngày nắng to?", "Nước bay hơi nhanh, dung dịch đậm đặc dần rồi muối kết tinh", "Muối tự sinh ra từ cát", "Nắng làm muối từ không khí rơi xuống", "Nắng và gió làm nước biển bay hơi nhanh, muối còn lại kết tinh."],
      ["Khi hoà tan muối vào nước, khối lượng dung dịch so với tổng khối lượng muối và nước ban đầu thế nào?", "Bằng tổng khối lượng muối và nước ban đầu", "Nhỏ hơn hẳn", "Lớn hơn hẳn", "Hoà tan không làm mất khối lượng các chất."],
      ["Chất nào sau đây tan tốt trong nước?", "Đường ăn", "Dầu ăn", "Cát sạch", "Đường, muối tan tốt trong nước; dầu ăn và cát không tan."],
      ["Để làm trong nước sông đục theo cách đơn giản, người ta thường làm gì trước?", "Để nước lắng trong chum/thùng rồi gạn phần nước trong", "Lắc thật mạnh cho cặn tan ra", "Đun sôi rồi uống ngay khi còn đục", "Lắng gạn tách được phần lớn cặn lơ lửng trong nước đục."]
    ], [["Lọc", "Tách chất không tan khỏi chất lỏng"], ["Cô cạn", "Thu chất rắn hoà tan"], ["Chưng cất", "Tách chất lỏng theo nhiệt độ sôi"], ["Nam châm", "Tách sắt khỏi hỗn hợp"]], "Nối phương pháp với công dụng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước LỌC tách cát khỏi nước theo đúng thứ tự!", ["Đặt giấy lọc vào phễu, để phễu lên cốc", "Rót từ từ hỗn hợp cát – nước vào phễu", "Cát bị giữ lại trên giấy lọc", "Thu được nước trong ở cốc dưới"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các bước làm MUỐI từ nước biển theo đúng thứ tự!", ["Dẫn nước biển vào ruộng muối", "Phơi nắng cho nước bay hơi dần", "Muối kết tinh trắng trên ruộng", "Cào gom muối thành đống"]); });
    return { id: "kh6-honhop", emoji: "⚗️", name: "Hỗn hợp và tách chất", sub: "Hỗn hợp, dung dịch • Lọc, cô cạn, chưng cất, phễu chiết, lắng gạn", pools: kp }; })(),
  topic("kh6-tebao", "🦠", "Tế bào — đơn vị cơ bản của sự sống", "Cấu tạo tế bào • Chức năng các thành phần • Tế bào lớn lên và sinh sản", [
    ["Tế bào được gọi là gì của cơ thể sống?", "Đơn vị cấu tạo và chức năng cơ bản của cơ thể sống", "Cơ quan lớn nhất của cơ thể", "Một loại mô đặc biệt", "Mọi cơ thể sống đều được cấu tạo từ một hoặc nhiều tế bào."],
    ["Thành phần nào bao quanh bên ngoài, bảo vệ và kiểm soát chất ra vào tế bào?", "Màng tế bào (màng sinh chất)", "Nhân tế bào", "Thành tế bào", "Màng tế bào bao bọc, bảo vệ và chọn lọc chất trao đổi với môi trường."],
    ["Nhân tế bào có vai trò gì?", "Chứa vật chất di truyền, điều khiển mọi hoạt động sống của tế bào", "Dự trữ nước cho tế bào", "Tạo hình dạng cho tế bào", "Nhân là “trung tâm điều khiển” của tế bào."],
    ["Chất tế bào (tế bào chất) là gì?", "Chất keo lỏng bên trong màng tế bào, nơi diễn ra nhiều hoạt động sống và chứa các bào quan", "Lớp vỏ cứng ngoài cùng của tế bào thực vật", "Phần rỗng giữa tế bào", "Tế bào chất chứa các bào quan như ti thể, lục lạp..."],
    ["Lục lạp có ở loại tế bào nào và có chức năng gì?", "Ở tế bào thực vật; là nơi quang hợp tạo chất hữu cơ", "Ở mọi tế bào động vật; giúp tế bào di chuyển", "Ở tế bào vi khuẩn; chứa nhân", "Lục lạp chứa chất diệp lục, chỉ có ở tế bào thực vật (và một số sinh vật quang hợp)."],
    ["Tế bào thực vật khác tế bào động vật ở điểm nào dễ nhận biết?", "Tế bào thực vật có thành tế bào cứng và lục lạp; tế bào động vật không có hai thành phần này", "Tế bào động vật có thành tế bào", "Tế bào thực vật không có nhân", "Thành tế bào giúp tế bào thực vật cứng cáp, giữ hình dạng."],
    ["Không bào ở tế bào thực vật trưởng thành có đặc điểm gì?", "Lớn, chứa dịch tế bào (nước và chất hoà tan), nằm giữa tế bào", "Không tồn tại trong tế bào thực vật", "Là nơi chứa vật chất di truyền", "Không bào lớn là một dấu hiệu đặc trưng của tế bào thực vật."],
    ["Tế bào sinh sản (phân chia) để làm gì?", "Tạo thêm tế bào mới giúp cơ thể lớn lên và thay thế tế bào già, hỏng", "Để cơ thể nhỏ lại", "Không có tác dụng gì", "Từ một tế bào mẹ phân chia thành hai tế bào con."],
    ["Cơ thể đơn bào là cơ thể như thế nào?", "Cơ thể chỉ gồm một tế bào duy nhất nhưng tế bào đó thực hiện mọi hoạt động sống", "Cơ thể không có tế bào nào", "Cơ thể gồm đúng hai tế bào", "Ví dụ: trùng roi, trùng giày, vi khuẩn là cơ thể đơn bào."],
    ["Muốn quan sát tế bào biểu bì lá, em cần dụng cụ chính nào?", "Kính hiển vi", "Kính lúp cầm tay là đủ", "Thước kẻ", "Tế bào rất nhỏ nên cần kính hiển vi mới quan sát rõ cấu tạo."],
    ["Tế bào lớn lên nhờ quá trình nào?", "Hấp thụ chất dinh dưỡng, tăng kích thước và khối lượng tế bào chất", "Tế bào co lại", "Tế bào đổi màu", "Tế bào lớn lên rồi phân chia — hai quá trình giúp sinh vật trưởng thành."],
    ["Vi khuẩn thuộc nhóm sinh vật nào xét theo cấu tạo tế bào?", "Sinh vật đơn bào, tế bào chưa có nhân hoàn chỉnh (nhân chưa có màng bao bọc)", "Sinh vật đa bào", "Không phải sinh vật", "Vi khuẩn nhỏ bé, chỉ thấy dưới kính hiển vi."],
    ["Ti thể trong tế bào có vai trò gì (học ở mức cơ bản)?", "Là nơi tạo ra năng lượng cho các hoạt động của tế bào (hô hấp tế bào)", "Là nơi quang hợp", "Là nơi dự trữ nước chính", "Ti thể được ví như “nhà máy năng lượng” của tế bào."]
  ], [["Màng tế bào", "Bảo vệ, kiểm soát chất ra vào"], ["Nhân tế bào", "Điều khiển hoạt động sống"], ["Lục lạp", "Quang hợp (tế bào thực vật)"], ["Không bào", "Chứa dịch tế bào"]], "Nối thành phần với chức năng nhé!"),
  (function () { var kp = knowledgePools([
      ["Các mức tổ chức của cơ thể đa bào theo thứ tự từ nhỏ đến lớn là gì?", "Tế bào → mô → cơ quan → hệ cơ quan → cơ thể", "Cơ thể → hệ cơ quan → mô → tế bào", "Mô → tế bào → cơ quan → cơ thể", "Đây là trình tự tổ chức cơ bản của mọi cơ thể đa bào."],
      ["Mô là gì?", "Tập hợp các tế bào giống nhau cùng thực hiện một chức năng nhất định", "Một cơ quan hoàn chỉnh", "Một tế bào đơn độc", "Ví dụ: mô cơ, mô biểu bì, mô thần kinh ở động vật; mô phân sinh, mô dẫn ở thực vật."],
      ["Cơ quan là gì?", "Tập hợp nhiều mô cùng phối hợp thực hiện một chức năng", "Một nhóm tế bào rời rạc", "Toàn bộ cơ thể", "Ví dụ cơ quan: tim, lá, rễ, dạ dày..."],
      ["Hệ cơ quan là gì?", "Tập hợp các cơ quan phối hợp nhau thực hiện một chức năng lớn của cơ thể", "Một mô đặc biệt", "Một tế bào lớn", "Ví dụ: hệ tiêu hoá gồm miệng, thực quản, dạ dày, ruột..."],
      ["Lá của cây thuộc mức tổ chức nào?", "Lá là một CƠ QUAN của cây (gồm nhiều mô: mô biểu bì, mô thịt lá...)", "Lá là một tế bào", "Lá là một hệ cơ quan", "Lá là cơ quan quang hợp chính của cây xanh."],
      ["Hệ tiêu hoá thuộc mức tổ chức nào?", "Hệ cơ quan", "Mô", "Tế bào", "Hệ tiêu hoá gồm nhiều cơ quan phối hợp để tiêu hoá thức ăn."],
      ["Tế bào cơ vân thuộc mức tổ chức nào?", "Tế bào (mức nhỏ nhất trong các lựa chọn tổ chức cơ thể đa bào)", "Cơ quan", "Hệ cơ quan", "Nhiều tế bào cơ vân hợp thành mô cơ."],
      ["Vì sao cơ thể được coi là một thể thống nhất?", "Vì các tế bào, mô, cơ quan phối hợp hoạt động nhịp nhàng, hỗ trợ lẫn nhau", "Vì mọi bộ phận hoạt động độc lập hoàn toàn", "Vì cơ thể chỉ có một loại tế bào", "Sự phối hợp thống nhất giúp cơ thể sống và thích nghi."],
      ["Chức năng của mô thần kinh là gì?", "Tiếp nhận kích thích và truyền xung thần kinh, điều khiển hoạt động của cơ thể", "Vận chuyển nước và muối khoáng", "Quang hợp", "Mô thần kinh có ở động vật, tạo nên não, tuỷ sống và các dây thần kinh."],
      ["Mô dẫn ở thực vật có chức năng gì?", "Dẫn nước, muối khoáng từ rễ lên lá và dẫn chất hữu cơ đi nuôi cây", "Bảo vệ bề mặt lá", "Sinh sản ra hoa", "Mô dẫn giống như hệ thống “đường ống” của cây."],
      ["Rễ, thân, lá của cây thuộc nhóm cơ quan nào?", "Cơ quan dinh dưỡng (nuôi cây lớn lên)", "Cơ quan sinh sản", "Không phải cơ quan", "Hoa, quả, hạt mới là cơ quan sinh sản của cây có hoa."],
      ["Một cây hoàn chỉnh gồm những hệ cơ quan nào chính?", "Hệ rễ (rễ) và hệ chồi (thân, lá, hoa...)", "Chỉ có hệ lá", "Hệ tim mạch như động vật", "Thực vật tổ chức thành hệ rễ và hệ chồi."],
      ["Khi một cơ quan bị tổn thương, điều gì thường xảy ra?", "Ảnh hưởng đến cả cơ thể vì các bộ phận liên quan và phối hợp với nhau", "Không ảnh hưởng gì đến phần còn lại", "Cơ thể tự mọc thêm cơ quan mới ngay lập tức", "Vì cơ thể là một thể thống nhất nên các bộ phận tác động qua lại."]
    ], [["Tế bào", "Mức tổ chức nhỏ nhất"], ["Mô", "Nhiều tế bào cùng chức năng"], ["Cơ quan", "Nhiều mô phối hợp"], ["Hệ cơ quan", "Nhiều cơ quan phối hợp"]], "Nối mức tổ chức với ý đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các mức tổ chức của cơ thể từ NHỎ đến LỚN!", ["Tế bào", "Mô", "Cơ quan", "Hệ cơ quan", "Cơ thể"]); });
    return { id: "kh6-cothe", emoji: "🧩", name: "Từ tế bào đến cơ thể", sub: "Tế bào → mô → cơ quan → hệ cơ quan → cơ thể • Cơ thể đơn bào và đa bào", pools: kp }; })(),
  topic("kh6-dadang", "🦁", "Đa dạng thế giới sống", "Phân loại sinh vật • Khoá lưỡng phân • Vi khuẩn, virus, nguyên sinh vật, nấm, thực vật, động vật • Đa dạng sinh học", [
    ["Phân loại sinh vật giúp ích gì cho con người?", "Sắp xếp sinh vật thành nhóm có hệ thống để dễ nghiên cứu, nhận biết và ứng dụng", "Làm sinh vật đẹp hơn", "Không có ích gì", "Các nhà khoa học phân loại dựa trên đặc điểm giống và khác nhau."],
    ["Khoá lưỡng phân hoạt động dựa trên nguyên tắc nào?", "Ở mỗi bước, chia tập hợp sinh vật thành hai nhóm đối lập nhau dựa trên một cặp đặc điểm trái ngược", "Chọn ngẫu nhiên một tên bất kì", "Đếm số chân của mọi sinh vật", "Cứ chia đôi như vậy cho đến khi xác định được từng loài."],
    ["Vi khuẩn có ích trong đời sống là nhóm nào?", "Vi khuẩn lên men làm sữa chua, muối dưa, làm tương...", "Mọi vi khuẩn đều gây bệnh", "Vi khuẩn gây sâu răng", "Phần lớn vi khuẩn vô hại hoặc có ích; một số ít gây bệnh."],
    ["Virus khác vi khuẩn ở điểm nào cơ bản?", "Virus rất nhỏ, chưa có cấu tạo tế bào hoàn chỉnh, phải sống kí sinh trong tế bào chủ mới sinh sản được", "Virus lớn hơn vi khuẩn nhiều lần", "Virus là một loại tế bào thực vật", "Virus gây các bệnh như cúm, sởi...; không tự sống độc lập ngoài tế bào chủ."],
    ["Nguyên sinh vật là nhóm gồm những sinh vật nào?", "Các sinh vật đơn bào có nhân hoàn chỉnh như trùng roi, trùng giày, tảo đơn bào", "Các loài nấm lớn", "Cây có hoa", "Nguyên sinh vật sống chủ yếu trong nước hoặc môi trường ẩm ướt."],
    ["Nấm khác thực vật ở điểm nào quan trọng?", "Nấm không có lục lạp nên không quang hợp, sống bằng chất hữu cơ có sẵn (hoại sinh, kí sinh)", "Nấm có hoa và quả", "Nấm luôn sống dưới nước", "Nấm men, nấm mốc, nấm rơm... thuộc giới Nấm."],
    ["Thực vật được chia thành những nhóm chính nào trong chương trình lớp 6?", "Thực vật có mạch và không có mạch; trong nhóm có mạch có thực vật có hạt và không có hạt (dương xỉ)", "Chỉ chia theo màu lá", "Chỉ chia theo chiều cao", "Rêu là thực vật không có mạch; dương xỉ có mạch, không hạt; hạt trần và hạt kín có hạt."],
    ["Động vật được chia thành hai nhóm lớn nào?", "Động vật không xương sống và động vật có xương sống", "Động vật bay và động vật bò", "Động vật to và động vật nhỏ", "Cá, lưỡng cư, bò sát, chim, thú thuộc nhóm có xương sống."],
    ["Đa dạng sinh học là gì?", "Sự phong phú của các loài sinh vật, của nguồn gen và các hệ sinh thái trên Trái Đất", "Số lượng cây xanh trong một khu vườn", "Số loài vật nuôi trong nhà", "Việt Nam là một trong những nước có đa dạng sinh học cao."],
    ["Hành động nào BẢO VỆ đa dạng sinh học?", "Bảo vệ rừng, không săn bắt động vật hoang dã, lập khu bảo tồn thiên nhiên", "Phá rừng làm nương rẫy bừa bãi", "Buôn bán động vật quý hiếm", "Mỗi loài mất đi là mất một phần của sự sống trên Trái Đất."],
    ["Vai trò của sinh vật đối với con người là gì?", "Cung cấp thức ăn, thuốc, nguyên liệu, gỗ, làm sạch môi trường...", "Chỉ để ngắm cảnh", "Không có vai trò gì", "Con người phụ thuộc rất nhiều vào thế giới sinh vật."],
    ["Để nhận biết một loài mới gặp, nhà khoa học thường dùng công cụ nào?", "Khoá lưỡng phân phân loại", "Cân đo khối lượng", "Nhiệt kế", "Khoá lưỡng phân dẫn từng bước đến tên của loài."],
    ["Sinh vật nào sau đây thuộc nhóm nguyên sinh vật?", "Trùng giày", "Nấm rơm", "Cây dương xỉ", "Trùng giày là sinh vật đơn bào sống trong nước, thuộc nguyên sinh vật."]
  ], [["Vi khuẩn", "Đơn bào, chưa có nhân hoàn chỉnh"], ["Virus", "Kí sinh trong tế bào chủ"], ["Nấm", "Không quang hợp"], ["Trùng giày", "Nguyên sinh vật"]], "Nối nhóm sinh vật với đặc điểm nhé!"),
  topic("kh6-luc", "🏋️", "Lực trong đời sống", "Lực và biểu diễn lực • Biến dạng lò xo • Trọng lượng, lực hấp dẫn • Ma sát • Lực cản của nước", [
    ["Lực là gì?", "Tác dụng đẩy, kéo của vật này lên vật khác, làm vật biến dạng hoặc thay đổi chuyển động", "Một loại năng lượng phát sáng", "Khối lượng của vật", "Lực có đơn vị là niutơn (N)."],
    ["Khi biểu diễn một lực bằng mũi tên, độ dài mũi tên cho biết điều gì?", "Độ lớn của lực (theo tỉ xích đã chọn)", "Phương của lực", "Điểm đặt của lực", "Mũi tên lực: gốc là điểm đặt, hướng là hướng của lực, độ dài tỉ lệ với độ lớn."],
    ["Lò xo bị kéo dãn ra khi ta tác dụng lực. Độ dãn của lò xo phụ thuộc vào điều gì?", "Độ lớn của lực kéo: lực càng lớn, lò xo dãn càng nhiều (trong giới hạn đàn hồi)", "Màu sắc của lò xo", "Thời gian trong ngày", "Dựa vào độ dãn của lò xo, người ta chế tạo lực kế để đo lực."],
    ["Trọng lượng của một vật là gì?", "Là độ lớn của lực hút của Trái Đất tác dụng lên vật", "Là khối lượng của vật tính bằng kilôgam", "Là thể tích của vật", "Trọng lượng đo bằng lực kế, đơn vị là niutơn (N); gần đúng: vật 1 kg có trọng lượng khoảng 10 N."],
    ["Lực hấp dẫn là gì?", "Lực hút giữa các vật có khối lượng; lực hấp dẫn của Trái Đất giữ mọi vật ở trên mặt đất và giữ Mặt Trăng quay quanh Trái Đất", "Lực đẩy giữa hai nam châm", "Lực ma sát giữa hai bề mặt", "Nhờ lực hấp dẫn của Trái Đất, vật rơi xuống đất khi buông tay."],
    ["Một vật có khối lượng 2 kg thì trọng lượng gần đúng là bao nhiêu?", "Khoảng 20 N", "Khoảng 2 N", "Khoảng 200 N", "Hệ số gần đúng: P ≈ 10 × m (N) với m tính bằng kg."],
    ["Lực ma sát xuất hiện khi nào?", "Khi hai bề mặt tiếp xúc trượt hoặc có xu hướng trượt lên nhau, lực ma sát cản lại chuyển động tương đối đó", "Chỉ khi vật đứng yên trên bàn nghiêng không có tiếp xúc", "Khi vật bay trong chân không", "Ma sát có ở mặt đường, mặt bàn... nơi hai vật tiếp xúc."],
    ["Trường hợp nào ma sát có ÍCH?", "Ma sát giữa đế giày và mặt đường giúp ta đi không bị trượt; má phanh xe", "Ma sát làm mòn đế giày", "Ma sát ở trục bánh xe chưa tra dầu", "Ma sát vừa có lợi (đi lại, cầm nắm, phanh xe) vừa có hại (mài mòn chi tiết máy)."],
    ["Để giảm ma sát có hại ở trục quay của máy, người ta làm gì?", "Tra dầu mỡ bôi trơn, dùng ổ bi (vòng bi)", "Rắc cát vào trục", "Tăng độ nhám của bề mặt", "Bôi trơn là cách phổ biến để giảm ma sát."],
    ["Lực cản của nước tác dụng lên vật chuyển động trong nước có hướng thế nào?", "Ngược chiều chuyển động của vật, làm vật chuyển động chậm lại", "Cùng chiều chuyển động", "Hướng thẳng đứng lên trên luôn luôn", "Vì vậy tàu thuyền, cá có thân hình thon dài để giảm lực cản."],
    ["Khi em đá một quả bóng, chân đã tác dụng lên bóng loại tác dụng nào và kết quả là gì?", "Lực đá làm bóng thay đổi chuyển động (bay đi) và có thể biến dạng tại chỗ tiếp xúc", "Không có tác dụng gì", "Chỉ làm bóng nóng lên", "Lực có thể làm thay đổi chuyển động và làm biến dạng vật."],
    ["Dụng cụ nào dùng để ĐO LỰC?", "Lực kế (thường dùng lực kế lò xo)", "Cân Roberval", "Bình chia độ", "Lực kế hoạt động dựa trên độ dãn của lò xo tỉ lệ với lực."],
    ["Một quyển sách nằm yên trên bàn. Lực hút của Trái Đất lên sách được cân bằng bởi lực nào?", "Lực nâng (phản lực) của mặt bàn tác dụng lên sách", "Lực ma sát với không khí", "Không có lực nào", "Hai lực cân bằng giúp sách đứng yên: trọng lượng hướng xuống, lực của bàn hướng lên."],
    ["Lực kế lò xo hoạt động dựa vào tính chất nào của lò xo?", "Độ dãn của lò xo tỉ lệ với độ lớn của lực kéo", "Lò xo không bao giờ bị dãn", "Độ dãn không phụ thuộc vào lực", "Lực càng lớn lò xo dãn càng nhiều (trong giới hạn đàn hồi) — cơ sở của lực kế."],
    ["Một chiếc thùng đứng yên bị hai bạn kéo về hai phía với lực bằng nhau. Thùng sẽ thế nào?", "Vẫn đứng yên vì hai lực cân bằng nhau", "Chạy về phía bạn khoẻ hơn tự động", "Nhảy lên khỏi mặt đất", "Hai lực cân bằng tác dụng lên vật đứng yên thì vật tiếp tục đứng yên."],
    ["Ma sát lăn và ma sát trượt khác nhau thế nào về độ lớn?", "Ma sát lăn nhỏ hơn ma sát trượt nhiều", "Ma sát lăn lớn hơn hẳn", "Hai loại bằng nhau", "Vì vậy người ta dùng bánh xe và vòng bi để giảm ma sát."],
    ["Vì sao đế giày thể thao thường có nhiều rãnh và gai?", "Để tăng ma sát, chống trượt khi di chuyển", "Để giày nhẹ hơn hẳn", "Chỉ để trang trí cho đẹp", "Ma sát giữa đế giày và mặt đường giúp ta đi, chạy không bị ngã."],
    ["Vòng bi (ổ bi) ở trục bánh xe có tác dụng gì?", "Biến ma sát trượt thành ma sát lăn nhỏ hơn, giảm mài mòn", "Làm tăng ma sát cho xe nặng hơn", "Trang trí cho trục xe", "Vòng bi giúp các bộ phận quay trơn tru, bền hơn."],
    ["Khi nhảy dù, chiếc dù mở ra giúp người rơi chậm lại nhờ lực nào tăng lên?", "Lực cản của không khí", "Lực hút của Trái Đất tự giảm đi", "Lực đẩy của gió thổi lên", "Dù xoè rộng làm lực cản không khí tăng mạnh, cân bằng dần với trọng lượng."],
    ["Một vật có khối lượng 0,5 kg thì trọng lượng gần đúng là bao nhiêu?", "Khoảng 5 N", "Khoảng 50 N", "Khoảng 0,5 N", "P ≈ 10 × m: 0,5 kg → khoảng 5 N."],
    ["Cùng một vật, trọng lượng của nó trên Mặt Trăng so với trên Trái Đất thế nào?", "Nhỏ hơn (khoảng 1/6) vì lực hút của Mặt Trăng yếu hơn", "Lớn hơn nhiều", "Hoàn toàn bằng nhau", "Khối lượng không đổi nhưng trọng lượng thay đổi theo lực hút của thiên thể."],
    ["Ấn tay xuống một lò xo rồi buông ra, lò xo trở lại hình dạng cũ. Biến dạng đó gọi là gì?", "Biến dạng đàn hồi", "Biến dạng vĩnh viễn", "Không phải biến dạng", "Bỏ lực ra mà vật lấy lại hình dạng ban đầu là biến dạng đàn hồi."],
    ["Kéo thùng hàng trên xe đẩy có bánh dễ hơn kéo trực tiếp trên sàn vì sao?", "Ma sát lăn nhỏ hơn ma sát trượt rất nhiều", "Thùng hàng tự nhẹ đi", "Sàn nhà dốc hơn", "Bánh xe biến ma sát trượt thành ma sát lăn."],
    ["Đơn vị đo lực là gì?", "Niutơn, kí hiệu N", "Ki-lô-gam, kí hiệu kg", "Mét, kí hiệu m", "Ki-lô-gam là đơn vị khối lượng, không phải đơn vị lực."],
    ["Ma sát có hại rõ nhất trong trường hợp nào?", "Giữa các chi tiết máy chuyển động, làm mòn và nóng máy", "Giữa đế giày và mặt đường", "Giữa má phanh và vành xe", "Giảm ma sát có hại bằng bôi trơn và vòng bi."],
    ["Khối lượng và trọng lượng khác nhau ở điểm nào?", "Khối lượng đo bằng kg; trọng lượng là lực, đo bằng niutơn", "Hai khái niệm hoàn toàn giống nhau", "Khối lượng đo bằng niutơn", "Một vật 1 kg có khối lượng 1 kg ở mọi nơi, trọng lượng khoảng 10 N trên Trái Đất."],
    ["Điểm đặt, phương, chiều và độ lớn là những yếu tố nào của lực?", "Các yếu tố đặc trưng của một lực", "Các đơn vị đo lực", "Các loại lực khác nhau", "Biết bốn yếu tố này là xác định hoàn toàn một lực."]
  ], [["Niutơn (N)", "Đơn vị của lực"], ["Lực kế", "Dụng cụ đo lực"], ["Trọng lượng", "Lực hút của Trái Đất lên vật"], ["Ma sát", "Cản chuyển động trượt"]], "Nối cho đúng nhé!"),
  topic("kh6-nangluong", "⚡", "Năng lượng và sự chuyển hoá", "Các dạng năng lượng • Chuyển hoá • Năng lượng hao phí • Năng lượng tái tạo • Tiết kiệm năng lượng", [
    ["Năng lượng có vai trò gì?", "Giúp mọi vật hoạt động, biến đổi: thắp sáng, đun nấu, chạy máy, sinh trưởng...", "Không cần thiết cho sự sống", "Chỉ dùng trong nhà máy điện", "Mọi hoạt động đều cần năng lượng."],
    ["Động năng là dạng năng lượng của vật khi nào?", "Khi vật đang chuyển động (vật chuyển động càng nhanh, càng nặng thì động năng càng lớn)", "Khi vật bị nâng lên cao", "Khi vật bị nén lại", "Ô tô đang chạy, nước chảy, gió thổi đều có động năng."],
    ["Thế năng hấp dẫn (trọng trường) phụ thuộc vào yếu tố nào?", "Khối lượng của vật và độ cao của vật so với mốc chọn", "Màu sắc của vật", "Nhiệt độ của vật", "Vật càng nặng và càng cao thì thế năng càng lớn."],
    ["Khi một quả bóng rơi từ trên cao xuống, năng lượng chuyển hoá thế nào?", "Thế năng chuyển hoá dần thành động năng (rơi càng nhanh động năng càng lớn)", "Động năng chuyển thành thế năng", "Năng lượng tự mất hẳn", "Đây là ví dụ quen thuộc về chuyển hoá năng lượng."],
    ["Pin trong đồ chơi chuyển hoá năng lượng theo hướng nào?", "Hoá năng (trong pin) → điện năng → động năng, âm thanh, ánh sáng", "Quang năng → hoá năng", "Nhiệt năng → điện năng trực tiếp", "Pin dự trữ hoá năng và cung cấp điện năng khi dùng."],
    ["Cây xanh quang hợp là quá trình chuyển hoá năng lượng nào?", "Quang năng (ánh sáng Mặt Trời) → hoá năng (dự trữ trong chất hữu cơ)", "Điện năng → cơ năng", "Nhiệt năng → quang năng", "Quang hợp là nền tảng năng lượng cho hầu hết sự sống."],
    ["Năng lượng hao phí là gì?", "Phần năng lượng chuyển hoá thành dạng không có ích cho mục đích sử dụng (thường là nhiệt toả ra môi trường, tiếng ồn)", "Phần năng lượng dùng đúng việc cần", "Năng lượng tái tạo", "Bóng đèn, động cơ luôn có một phần năng lượng biến thành nhiệt hao phí."],
    ["Nhóm nguồn năng lượng nào là năng lượng TÁI TẠO?", "Mặt Trời, gió, nước chảy, địa nhiệt, sinh khối", "Than đá, dầu mỏ, khí đốt", "Chỉ có điện lưới", "Năng lượng tái tạo bổ sung liên tục, thân thiện hơn với môi trường."],
    ["Nhiên liệu hoá thạch (than, dầu) khi dùng hết có vấn đề gì?", "Sẽ cạn kiệt dần và khi cháy thải khí gây ô nhiễm, biến đổi khí hậu", "Tự đầy lại sau một đêm", "Không gây hại gì", "Vì vậy cần tiết kiệm và chuyển sang năng lượng tái tạo."],
    ["Việc làm nào giúp TIẾT KIỆM năng lượng ở nhà?", "Tắt đèn, quạt khi không dùng; dùng thiết bị tiết kiệm điện; tận dụng ánh sáng tự nhiên", "Bật mọi đèn cả ngày", "Mở cửa tủ lạnh lâu", "Tiết kiệm năng lượng là bảo vệ tài nguyên và giảm chi phí."],
    ["Thuỷ điện là nhà máy điện dùng năng lượng nào để phát điện?", "Năng lượng của dòng nước chảy (thế năng/động năng của nước) làm quay tuabin", "Năng lượng gió", "Năng lượng hạt nhân than đá", "Việt Nam có nhiều nhà máy thuỷ điện lớn như Sơn La, Hoà Bình."],
    ["Khi xát hai bàn tay vào nhau thấy tay nóng lên. Đó là chuyển hoá gì?", "Cơ năng (động năng của tay) → nhiệt năng do ma sát", "Quang năng → nhiệt năng", "Điện năng → nhiệt năng", "Ma sát luôn làm một phần cơ năng biến thành nhiệt."],
    ["Đơn vị của năng lượng là gì?", "Jun (J) — ngoài ra còn dùng kilôoát giờ (kWh) cho điện năng", "Niutơn (N)", "Mét (m)", "Số điện trên hoá đơn tính bằng kWh: 1 kWh = 3 600 000 J."]
  ], [["Động năng", "Năng lượng khi vật chuyển động"], ["Thế năng", "Năng lượng do độ cao/biến dạng"], ["Quang năng → hoá năng", "Quang hợp ở cây xanh"], ["Jun (J)", "Đơn vị năng lượng"]], "Nối cho đúng nhé!"),
  (function () { var kp = knowledgePools([
      ["Mặt Trời mọc ở hướng nào và lặn ở hướng nào (nhìn từ Trái Đất)?", "Mọc ở phía Đông, lặn ở phía Tây", "Mọc ở phía Tây, lặn ở phía Đông", "Mọc ở phía Bắc, lặn ở phía Nam", "Đó là chuyển động NHÌN THẤY do Trái Đất tự quay từ Tây sang Đông."],
      ["Vì sao có ngày và đêm trên Trái Đất?", "Vì Trái Đất hình cầu tự quay quanh trục: phần hướng về Mặt Trời là ban ngày, phần khuất là ban đêm", "Vì Mặt Trời quay quanh Trái Đất mỗi ngày", "Vì Mặt Trăng che Mặt Trời ban đêm", "Một vòng tự quay của Trái Đất kéo dài 24 giờ."],
      ["Trái Đất chuyển động quanh Mặt Trời theo chu kì bao lâu và gây ra hiện tượng gì?", "Khoảng 365 ngày (một năm), kết hợp trục Trái Đất nghiêng gây ra các mùa", "7 ngày, gây ra tuần lễ", "24 giờ, gây ra ngày đêm", "Trục Trái Đất nghiêng không đổi hướng khi quay quanh Mặt Trời nên có mùa."],
      ["Mặt Trăng quay quanh Trái Đất theo chu kì khoảng bao lâu?", "Khoảng một tháng (27–29,5 ngày)", "Khoảng một năm", "Đúng 24 giờ", "Các hình dạng nhìn thấy của Mặt Trăng (trăng tròn, trăng khuyết) thay đổi theo chu kì này."],
      ["Vì sao ta nhìn thấy Mặt Trăng sáng?", "Mặt Trăng phản chiếu ánh sáng Mặt Trời đến mắt ta; Mặt Trăng không tự phát sáng", "Mặt Trăng tự phát sáng như Mặt Trời", "Mặt Trăng phát sáng nhờ Trái Đất nung nóng", "Phần được Mặt Trời chiếu sáng hướng về Trái Đất thay đổi tạo nên các pha trăng."],
      ["Hệ Mặt Trời gồm những thành phần chính nào?", "Mặt Trời ở trung tâm, 8 hành tinh quay quanh, cùng các vệ tinh, sao chổi, thiên thạch...", "Chỉ có Mặt Trời và Trái Đất", "Gồm 12 hành tinh như nhau", "Trái Đất là hành tinh thứ ba tính từ Mặt Trời."],
      ["Hành tinh nào gần Mặt Trời nhất và hành tinh nào lớn nhất hệ Mặt Trời?", "Gần nhất: Thuỷ tinh; Lớn nhất: Mộc tinh", "Gần nhất: Kim tinh; Lớn nhất: Thổ tinh", "Gần nhất: Trái Đất; Lớn nhất: Mộc tinh", "Thứ tự từ Mặt Trời: Thuỷ, Kim, Trái Đất, Hoả, Mộc, Thổ, Thiên Vương, Hải Vương."],
      ["Sao băng thực chất là gì?", "Là vệt sáng của thiên thạch (mẩu đá vũ trụ) bốc cháy khi lao vào khí quyển Trái Đất", "Một ngôi sao rơi xuống đất", "Máy bay bay ban đêm", "“Sao băng” là hiện tượng thiên văn quen thuộc, không phải ngôi sao rơi."],
      ["Ngân Hà là gì?", "Là thiên hà chứa hệ Mặt Trời của chúng ta — một hệ khổng lồ gồm hàng trăm tỉ ngôi sao", "Một dòng sông trên trời có thật bằng nước", "Tên của một hành tinh", "Vào đêm tối trời quang, ta có thể thấy dải Ngân Hà vắt ngang bầu trời."],
      ["Vì sao các hành tinh không tự phát sáng nhưng ta vẫn nhìn thấy chúng?", "Vì chúng phản chiếu ánh sáng của Mặt Trời", "Vì chúng tự phát ra ánh sáng đỏ", "Vì chúng ở rất gần Trái Đất", "Giống Mặt Trăng, các hành tinh sáng nhờ ánh sáng Mặt Trời phản chiếu."],
      ["Một năm ánh sáng là đơn vị đo cái gì?", "Đo khoảng cách trong vũ trụ (quãng đường ánh sáng đi trong một năm)", "Đo thời gian một năm học", "Đo độ sáng của ngôi sao", "Khoảng cách giữa các sao rất lớn nên dùng đơn vị năm ánh sáng."],
      ["Trái Đất tự quay quanh trục theo chiều nào (nhìn từ cực Bắc xuống)?", "Từ Tây sang Đông (ngược chiều kim đồng hồ)", "Từ Đông sang Tây", "Trục Trái Đất đứng yên không quay", "Chính chiều quay này làm Mặt Trời như “mọc ở Đông, lặn ở Tây”."],
      ["Mùa hè ở nước ta thường nóng hơn mùa đông chủ yếu vì lí do nào?", "Tia nắng Mặt Trời chiếu gần như thẳng góc hơn và ngày dài hơn nên mặt đất nhận nhiều nhiệt hơn", "Mùa hè Trái Đất ở gần Mặt Trời nhất", "Mùa hè Mặt Trời toả nhiệt mạnh hơn", "Sự thay đổi mùa do trục Trái Đất nghiêng kết hợp chuyển động quanh Mặt Trời."]
    ], [["Thuỷ tinh", "Hành tinh gần Mặt Trời nhất"], ["Mộc tinh", "Hành tinh lớn nhất"], ["Trái Đất", "Hành tinh thứ ba, có sự sống"], ["Ngân Hà", "Thiên hà chứa hệ Mặt Trời"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các hành tinh theo thứ tự từ GẦN đến XA Mặt Trời!", ["Thuỷ tinh", "Kim tinh", "Trái Đất", "Hoả tinh", "Mộc tinh"]); });
    return { id: "kh6-traidat", emoji: "🌌", name: "Trái Đất và bầu trời", sub: "Chuyển động nhìn thấy của Mặt Trời, Mặt Trăng • Hệ Mặt Trời • Ngân Hà", pools: kp }; })()
];
/* ================= LỊCH SỬ & ĐỊA LÍ 6 ================= */
function m6MapScaleGen() {
  var scales = [100000, 200000, 500000, 1000000, 200000];
  var s = pick(scales), cm = rand(2, 9);
  var realCm = cm * s, realKm = realCm / 100000;
  return numMCQ6("Bản đồ tỉ lệ 1 : " + fmtN(s) + ". Khoảng cách trên bản đồ là " + cm + " cm. Khoảng cách thực tế là bao nhiêu ki-lô-mét?", cm + " cm × " + fmtN(s), realKm, "Khoảng cách thực tế = " + cm + " × " + fmtN(s) + " = " + fmtN(realCm) + " cm = " + realKm + " km.", 3);
}
var LSD6_TOPICS = [
  topic("ls6-c1", "🏺", "Lịch sử: Vì sao phải học lịch sử?", "Chương 1 • Lịch sử và cuộc sống • Tư liệu lịch sử • Cách tính thời gian", [
    ["Lịch sử (hiểu theo nghĩa hẹp) là gì?", "Là quá khứ của xã hội loài người đã trải qua", "Là chuyện tưởng tượng về tương lai", "Chỉ là danh sách các vị vua", "Học lịch sử là tìm hiểu quá khứ để hiểu hiện tại và hướng tới tương lai."],
    ["Học lịch sử giúp em điều gì?", "Hiểu nguồn gốc dân tộc, rút bài học từ quá khứ, thêm yêu quê hương đất nước", "Không có ích lợi gì thiết thực", "Chỉ để thuộc lòng các năm tháng", "“Lịch sử là người thầy của cuộc sống”."],
    ["Tư liệu lịch sử được chia thành những loại chính nào?", "Tư liệu hiện vật, tư liệu chữ viết và tư liệu truyền miệng (truyền thuyết, ca dao...)", "Chỉ có sách giáo khoa", "Chỉ có phim ảnh hiện đại", "Ví dụ hiện vật: trống đồng, bia đá; chữ viết: bia tiến sĩ, sách sử."],
    ["Di tích trống đồng Đông Sơn thuộc loại tư liệu nào?", "Tư liệu hiện vật", "Tư liệu truyền miệng", "Tư liệu phim ảnh", "Trống đồng là hiện vật thật còn lưu giữ được từ quá khứ."],
    ["Truyền thuyết Thánh Gióng là loại tư liệu nào?", "Tư liệu truyền miệng", "Tư liệu hiện vật", "Tư liệu chữ viết gốc thời Hùng Vương", "Truyền miệng là tư liệu lưu truyền bằng lời nói, ca dao, truyền thuyết qua nhiều thế hệ."],
    ["Một THẬP KỈ bằng bao nhiêu năm?", "10 năm", "100 năm", "1000 năm", "Thập kỉ = 10 năm; thế kỉ = 100 năm; thiên niên kỉ = 1 000 năm."],
    ["Một THẾ KỈ bằng bao nhiêu năm?", "100 năm", "10 năm", "1000 năm", "Năm 2026 thuộc thế kỉ XXI (thế kỉ 21)."],
    ["Năm 938 thuộc thế kỉ nào?", "Thế kỉ X (thế kỉ 10)", "Thế kỉ IX", "Thế kỉ XI", "Lấy hai chữ số đầu của năm (9) cộng 1: năm 9xx thuộc thế kỉ X (trừ năm tròn trăm)."],
    ["Kí hiệu “TCN” trong lịch sử nghĩa là gì?", "Trước Công nguyên — thời gian trước năm 1 Công nguyên (năm Chúa Giê-su ra đời theo mốc quy ước)", "Sau Công nguyên", "Thế kỉ nguyên", "Ví dụ: nhà nước Văn Lang ra đời vào khoảng thế kỉ VII TCN."],
    ["Âm lịch của người xưa thường dựa vào chuyển động của thiên thể nào?", "Mặt Trăng (chu kì trăng tròn – khuyết)", "Sao chổi", "Mặt Trời mọc đúng hướng Bắc", "Dương lịch dựa vào Trái Đất quay quanh Mặt Trời; âm lịch dựa vào Mặt Trăng."],
    ["Để biết một sự kiện lịch sử có đáng tin không, người nghiên cứu sử cần làm gì?", "Đối chiếu nhiều nguồn tư liệu khác nhau và kiểm chứng thông tin", "Chỉ tin vào một câu chuyện duy nhất", "Tin ngay vào tin đồn trên mạng", "Thái độ khoa học khi học sử: tôn trọng sự thật, kiểm chứng tư liệu."],
    ["Câu nói “Dân ta phải biết sử ta” là của ai?", "Chủ tịch Hồ Chí Minh", "Vua Quang Trung", "Trần Hưng Đạo", "Bác Hồ căn dặn: hiểu lịch sử dân tộc để yêu nước, giữ nước."],
    ["Di sản văn hoá là gì?", "Sản phẩm vật thể và phi vật thể có giá trị lịch sử, văn hoá, khoa học được lưu truyền từ thế hệ trước", "Mọi đồ vật mới sản xuất", "Chỉ là các tòa nhà cao tầng", "Ví dụ: Cố đô Huế (di sản vật thể), Nhã nhạc cung đình (di sản phi vật thể)."],
    ["Lịch sử hiểu theo nghĩa RỘNG là gì?", "Toàn bộ quá khứ của nhân loại từ khi con người xuất hiện", "Chỉ quá khứ của một vị vua", "Chỉ những chuyện trong sách giáo khoa", "Theo nghĩa rộng, lịch sử là quá khứ của toàn nhân loại."],
    ["Người chuyên nghiên cứu, tìm hiểu lịch sử được gọi là gì?", "Nhà sử học", "Nhà thiên văn học", "Nhà địa chất học", "Nhà sử học dựa vào tư liệu để phục dựng và giải thích quá khứ."],
    ["Bia đá, trống đồng, đồ gốm cổ thuộc loại tư liệu nào?", "Tư liệu hiện vật", "Tư liệu truyền miệng", "Tư liệu âm thanh", "Hiện vật là đồ vật thật còn lưu lại từ quá khứ."],
    ["Sách sử, bia ký ghi chép sự kiện thuộc loại tư liệu nào?", "Tư liệu chữ viết", "Tư liệu hiện vật", "Tư liệu truyền miệng", "Tư liệu chữ viết do người xưa ghi chép, để lại."],
    ["Ca dao, tục ngữ, truyền thuyết được lưu truyền chủ yếu bằng cách nào?", "Truyền miệng từ đời này sang đời khác", "Khắc trên bia đá", "In thành sách hiện đại", "Đó chính là tư liệu truyền miệng."],
    ["Một thiên niên kỉ bằng bao nhiêu năm?", "1 000 năm", "100 năm", "10 năm", "Thiên niên kỉ = 1 000 năm; thế kỉ = 100 năm; thập kỉ = 10 năm."],
    ["Năm 2026 thuộc thế kỉ thứ mấy?", "Thế kỉ XXI (thế kỉ 21)", "Thế kỉ XX", "Thế kỉ XIX", "Từ năm 2001 đến hết năm 2100 là thế kỉ XXI."],
    ["Năm 100 thuộc thế kỉ nào?", "Thế kỉ I", "Thế kỉ II", "Thế kỉ X", "Năm tròn trăm thuộc chính thế kỉ đó: năm 100 là năm cuối của thế kỉ I."],
    ["Dương lịch được tính dựa trên cơ sở nào?", "Chu kì Trái Đất quay quanh Mặt Trời (khoảng 365,24 ngày)", "Chu kì Mặt Trăng quay quanh Trái Đất", "Chu kì sao chổi xuất hiện", "Dương lịch hiện là lịch dùng phổ biến trên toàn thế giới."],
    ["Câu căn dặn “Dân ta phải biết sử ta” nhắc nhở em điều gì?", "Phải học và hiểu lịch sử của dân tộc mình", "Phải thuộc lòng mọi năm tháng", "Chỉ nhà sử học mới cần học sử", "Hiểu lịch sử dân tộc để thêm yêu nước, tự hào và giữ nước."],
    ["Di sản văn hoá PHI VẬT THỂ là di sản như thế nào?", "Phong tục, lễ hội, nghệ thuật không cầm nắm được", "Các công trình xây dựng cổ", "Đồ vật trưng bày ở bảo tàng", "Ví dụ: Nhã nhạc cung đình Huế, hát quan họ Bắc Ninh."],
    ["Khi đọc một truyền thuyết, em cần lưu ý điều gì?", "Có yếu tố tưởng tượng, cần đối chiếu với tư liệu khác", "Mọi chi tiết đều là sự thật tuyệt đối", "Không cần kiểm chứng điều gì", "Tư liệu truyền miệng có thể được thêm thắt qua nhiều thế hệ."],
    ["Vì sao cần bảo tồn các di tích lịch sử?", "Để giữ bằng chứng về quá khứ và giáo dục truyền thống", "Chủ yếu để thu phí tham quan", "Không có lí do gì đặc biệt", "Di tích là tư liệu lịch sử quý, mất đi không thể lấy lại."],
    ["Sơ đồ tư duy khi học lịch sử giúp em điều gì?", "Hệ thống hoá kiến thức, dễ nhớ sự kiện và liên hệ", "Không giúp ích gì", "Chỉ để trang trí vở", "Sơ đồ hoá giúp học sử hiệu quả hơn học thuộc lòng rời rạc."]
  ], [["Thập kỉ", "10 năm"], ["Thế kỉ", "100 năm"], ["Thiên niên kỉ", "1 000 năm"], ["TCN", "Trước Công nguyên"]], "Nối đơn vị thời gian cho đúng nhé!"),
  topic("ls6-c2", "🦴", "Lịch sử: Xã hội nguyên thuỷ", "Chương 2 • Nguồn gốc loài người • Xã hội nguyên thuỷ • Sự phân hoá xã hội", [
    ["Tổ tiên xa xưa của loài người tiến hoá từ loài nào?", "Từ một loài vượn cổ (vượn người) qua quá trình lao động và tiến hoá lâu dài", "Từ loài cá biển", "Loài người xuất hiện đột ngột không qua tiến hoá", "Lao động và công cụ lao động là yếu tố quyết định sự tiến hoá thành người."],
    ["“Người tối cổ” khác vượn người ở điểm nổi bật nào?", "Đã biết chế tạo và sử dụng công cụ lao động bằng đá, biết đi thẳng bằng hai chân hoàn toàn hơn", "Đã biết trồng lúa", "Đã biết luyện kim loại", "Người tối cổ xuất hiện cách đây khoảng 4 triệu năm."],
    ["Công cụ lao động đầu tiên của người nguyên thuỷ làm bằng chất liệu gì?", "Đá (thời đại đồ đá)", "Sắt thép", "Nhựa", "Thời kì đầu, con người ghè đẽo đá làm rìu, dao, mũi lao."],
    ["Việc phát hiện ra LỬA có ý nghĩa gì với người nguyên thuỷ?", "Giúp sưởi ấm, chiếu sáng, xua đuổi thú dữ và nấu chín thức ăn", "Chỉ để ngắm cho đẹp", "Không thay đổi đời sống", "Lửa là phát minh vĩ đại đầu tiên của loài người."],
    ["Xã hội nguyên thuỷ tổ chức theo hình thức nào đầu tiên?", "Bầy người nguyên thuỷ, sau đó là thị tộc (công xã thị tộc)", "Quốc gia có vua quan", "Làng xã có hương ước", "Thị tộc gồm các gia đình có cùng huyết thống, sống chung, làm chung, hưởng chung."],
    ["Chế độ mẫu hệ trong xã hội nguyên thuỷ nghĩa là gì?", "Người phụ nữ có vai trò chủ đạo trong gia đình và thị tộc; con cái mang họ mẹ", "Người đàn ông nắm mọi quyền hành tuyệt đối", "Trẻ em tự quyết định mọi việc", "Về sau, khi sản xuất phát triển, chế độ phụ hệ dần thay thế mẫu hệ."],
    ["Sự xuất hiện của nghề nông nghiệp, chăn nuôi (cách mạng đá mới) dẫn đến thay đổi gì lớn?", "Con người có nhiều lương thực hơn, xuất hiện của cải dư thừa, xã hội bắt đầu phân hoá giàu – nghèo", "Con người quay lại sống trong hang hết", "Mọi người bỏ hết công cụ đá", "Sản phẩm dư thừa là mầm mống của tư hữu và phân hoá xã hội."],
    ["Khi xã hội phân hoá thành giai cấp, hình thức tổ chức nào xuất hiện thay cho thị tộc?", "Nhà nước (xã hội có giai cấp và nhà nước)", "Bầy người nguyên thuỷ", "Gia đình lớn mẫu hệ", "Sự phân hoá giàu nghèo, thủ lĩnh và chiến tranh tranh đoạt làm nảy sinh nhà nước đầu tiên."],
    ["Người nguyên thuỷ ở Việt Nam đã để lại dấu tích nổi tiếng nào?", "Văn hoá Hoà Bình, Bắc Sơn với công cụ đá; trống đồng thuộc thời kì sau (văn hoá Đông Sơn)", "Kim tự tháp bằng đá lớn", "Vạn lí trường thành", "Việt Nam là một trong những quê hương sớm của loài người ở Đông Nam Á."],
    ["Vì sao người nguyên thuỷ phải sống thành bầy đàn, thị tộc?", "Để hợp sức lao động, săn bắt, hái lượm và chống thú dữ trong điều kiện sản xuất thấp", "Vì luật lệ bắt buộc như ngày nay", "Vì họ thích ở đông người cho vui", "Sống cộng đồng là điều kiện sinh tồn của người nguyên thuỷ."],
    ["Công cụ bằng KIM LOẠI ra đời mang lại thay đổi gì?", "Năng suất lao động tăng mạnh, khai phá đất đai mở rộng, thúc đẩy phân hoá xã hội", "Con người bỏ hẳn việc trồng trọt", "Xã hội quay lại thời đồ đá", "Đồ đồng rồi đồ sắt làm sản xuất phát triển vượt bậc so với đồ đá."],
    ["Nghệ thuật nguyên thuỷ thể hiện qua những gì còn lưu lại?", "Tranh vẽ trong hang động, tượng nhỏ, đồ trang sức, nhạc cụ đơn sơ", "Tranh sơn dầu đóng khung", "Phim ảnh và sách in", "Nghệ thuật gắn với tín ngưỡng và đời sống tinh thần của người nguyên thuỷ."],
    ["Tín ngưỡng sớm nhất của người nguyên thuỷ thường là gì?", "Tôn thờ các lực lượng tự nhiên (tô-tem giáo, thờ vật tổ, thần Mặt Trời, thần sông nước...)", "Thờ các vị vua đương thời", "Không có tín ngưỡng gì", "Do chưa hiểu tự nhiên, con người gán cho tự nhiên sức mạnh thần bí."]
  ], [["Thị tộc", "Cộng đồng cùng huyết thống"], ["Đồ đá", "Công cụ đầu tiên"], ["Lửa", "Phát minh vĩ đại đầu tiên"], ["Mẫu hệ", "Người mẹ chủ đạo gia đình"]], "Nối cho đúng nhé!"),
  topic("ls6-c3", "🏛️", "Lịch sử: Xã hội cổ đại", "Chương 3 • Ai Cập, Lưỡng Hà • Ấn Độ • Trung Quốc • Hy Lạp, La Mã", [
    ["Nền văn minh Ai Cập cổ đại hình thành bên dòng sông nào?", "Sông Nin (Nile)", "Sông Hoàng Hà", "Sông Ấn", "Sông Nin đem phù sa màu mỡ, là cái nôi của văn minh Ai Cập."],
    ["Công trình kiến trúc nổi tiếng nhất của Ai Cập cổ đại là gì?", "Kim tự tháp — lăng mộ của các pha-ra-ông", "Vạn Lí Trường Thành", "Đền Ăng-co Vát", "Kim tự tháp Giza là kì quan còn tồn tại đến ngày nay."],
    ["Vùng Lưỡng Hà nằm giữa hai con sông nào?", "Sông Tigris (Ti-grơ) và sông Euphrates (Ơ-phơ-rát)", "Sông Nin và sông Ấn", "Sông Hoàng Hà và Trường Giang", "Lưỡng Hà thuộc khu vực I-rắc ngày nay, một trong những cái nôi văn minh sớm nhất."],
    ["Văn minh Ấn Độ cổ đại hình thành bên những dòng sông nào?", "Sông Ấn và sông Hằng", "Sông Nin", "Sông Mê Kông", "Sông Hằng là dòng sông linh thiêng của Ấn Độ."],
    ["Trung Quốc cổ đại hình thành bên hai dòng sông lớn nào?", "Hoàng Hà và Trường Giang (Dương Tử)", "Sông Ấn và sông Hằng", "Sông Nin và sông Tigris", "Hoàng Hà được coi là “sông mẹ” của văn minh Trung Hoa."],
    ["Chữ số mà thế giới dùng ngày nay (0–9) có nguồn gốc từ nền văn minh nào?", "Ấn Độ cổ đại (sau được người A-rập truyền sang châu Âu)", "Ai Cập", "La Mã", "Chữ số “A-rập” thực chất bắt nguồn từ Ấn Độ, trong đó quan trọng nhất là chữ số 0."],
    ["Thế vận hội Olympic có nguồn gốc từ đất nước cổ đại nào?", "Hy Lạp cổ đại (đại hội thể thao Olympic ở Olympia thờ thần Zeus)", "La Mã cổ đại", "Ai Cập cổ đại", "Olympic thời cổ đại tổ chức 4 năm một lần ở Olympia."],
    ["Hy Lạp cổ đại nổi tiếng với hình thức nhà nước nào ở A-ten?", "Nền dân chủ (dân chủ chủ nô) — công dân được tham gia bàn việc nước", "Chế độ quân chủ chuyên chế tuyệt đối kiểu phương Đông", "Không có nhà nước", "A-ten là biểu tượng của dân chủ cổ đại."],
    ["Đế quốc La Mã cổ đại để lại di sản nổi tiếng nào về luật pháp và kiến trúc?", "Luật La Mã và các công trình như đấu trường Cô-li-dê (Colosseum), cầu máng dẫn nước", "Kim tự tháp", "Tử Cấm Thành", "Nhiều hệ thống luật châu Âu ngày nay chịu ảnh hưởng của luật La Mã."],
    ["Các quốc gia cổ đại phương Đông (Ai Cập, Ấn Độ, Trung Quốc...) hình thành sớm bên lưu vực sông lớn vì lí do chính nào?", "Đất đai màu mỡ nhờ phù sa, có nước tưới cho nông nghiệp nên cư dân định cư sớm, hình thành nhà nước sớm", "Vì ở đó không có thú dữ", "Vì khí hậu lạnh giá quanh năm", "Nông nghiệp trồng lúa/nương cần nước là nền tảng của các nhà nước cổ đại này."],
    ["Người đứng đầu nhà nước Ai Cập cổ đại được gọi là gì?", "Pha-ra-ông (vua, được coi như thần sống)", "Hoàng đế Thiên tử duy nhất", "Tổng thống", "Pha-ra-ông nắm quyền tuyệt đối về chính trị và tôn giáo."],
    ["Tầng lớp nào chiếm đa số và bị bóc lột nặng nề nhất trong xã hội cổ đại?", "Nô lệ — bị coi là “công cụ biết nói”, không có quyền gì", "Quý tộc và quan lại", "Thương nhân giàu có", "Chế độ chiếm hữu nô lệ là đặc trưng của xã hội cổ đại phương Tây."],
    ["Kim tự tháp và tượng Nhân sư (Sphinx) là di sản của nước nào?", "Ai Cập", "Hy Lạp", "Ấn Độ", "Nhân sư là tượng mình sư tử đầu người canh giữ khu kim tự tháp Giza."],
    ["Người Ai Cập cổ đại dùng loại chữ nào được khắc trên đá, viết trên giấy pa-pi-rút?", "Chữ tượng hình", "Chữ La-tinh", "Chữ quốc ngữ", "Chữ tượng hình là hệ thống chữ viết cổ của Ai Cập."],
    ["Giấy viết của người Ai Cập cổ đại làm từ cây gì?", "Cây pa-pi-rút (papyrus)", "Cây tre", "Cây bông", "Tên gọi “paper” trong tiếng Anh bắt nguồn từ papyrus."],
    ["Bộ luật thành văn nổi tiếng của Lưỡng Hà là bộ luật của vị vua nào?", "Vua Ham-mu-ra-bi", "Vua Tần Thuỷ Hoàng", "Vua A-sô-ka", "Bộ luật Ham-mu-ra-bi khắc trên cột đá đen, rất nghiêm khắc."],
    ["Người Lưỡng Hà cổ đại chia một giờ thành bao nhiêu phút theo hệ cơ số 60?", "60 phút", "100 phút", "24 phút", "Cách chia giờ, phút, giây theo cơ số 60 còn dùng đến ngày nay."],
    ["Phật giáo ra đời ở quốc gia cổ đại nào?", "Ấn Độ", "Trung Quốc", "Ai Cập", "Phật giáo do Thích Ca Mâu Ni sáng lập ở Ấn Độ khoảng thế kỉ VI TCN."],
    ["Bốn phát minh lớn của Trung Quốc cổ đại là những gì?", "Giấy, thuốc súng, la bàn và nghề in", "Kính viễn vọng, điện, máy hơi nước", "Bóng đèn, ô tô, máy bay", "Bốn phát minh này lan truyền và thay đổi cả thế giới."],
    ["Vạn Lí Trường Thành được xây dựng chủ yếu nhằm mục đích gì?", "Chống quân du mục xâm nhập từ phương Bắc", "Làm đường giao thương chính", "Làm ranh giới chia ruộng đất", "Trường Thành là công trình phòng thủ quân sự khổng lồ của Trung Quốc cổ đại."],
    ["Xã hội Ấn Độ cổ đại chia thành mấy đẳng cấp chính?", "Bốn đẳng cấp chính", "Hai đẳng cấp", "Không chia đẳng cấp", "Bốn đẳng cấp: Bà-la-môn, Sát-đế-lợi, Vệ-xá, Thủ-đà-la."],
    ["Đẳng cấp cao nhất trong xã hội Ấn Độ cổ đại là đẳng cấp nào?", "Bà-la-môn (tăng lữ)", "Thủ-đà-la", "Vệ-xá", "Bà-la-môn là tầng lớp tăng lữ, đứng đầu hệ thống đẳng cấp."],
    ["Hai thành bang tiêu biểu của Hy Lạp cổ đại là những thành bang nào?", "A-ten và Xpác-ta", "La Mã và Ba Tư", "Cát-thê và Phê-ni-xi", "A-ten theo chế độ dân chủ; Xpác-ta trọng quân sự, kỉ luật nghiêm khắc."],
    ["Hai thiên sử thi I-li-át và Ô-đi-xê là tác phẩm của ai?", "Nhà thơ Hô-me (Homer)", "Vua Dớt (Zeus)", "Nhà toán học Pi-ta-go", "Hô-me là nhà thơ mù nổi tiếng của Hy Lạp cổ đại."],
    ["Định lí về tam giác vuông mang tên nhà toán học Hy Lạp nào?", "Pi-ta-go", "Ác-si-mét", "Ơ-clít (Euclid)", "Định lí Pi-ta-go: bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông."],
    ["La Mã cổ đại bắt đầu từ một thành quốc nằm trên bán đảo nào?", "Bán đảo I-ta-li-a (Ý ngày nay)", "Bán đảo Hy Lạp", "Bán đảo Ả Rập", "Thành La Mã nằm bên sông Ti-bơ trên bán đảo I-ta-li-a."],
    ["Nền văn minh Hy Lạp – La Mã cổ đại là cái nôi của nền văn minh nào sau này?", "Văn minh châu Âu (phương Tây)", "Văn minh Đông Nam Á", "Văn minh châu Mỹ cổ đại", "Dân chủ, luật pháp, nghệ thuật Hy – La ảnh hưởng sâu rộng đến châu Âu."]
  ], [["Sông Nin", "Ai Cập"], ["Kim tự tháp", "Lăng mộ pha-ra-ông"], ["Olympic", "Hy Lạp cổ đại"], ["Hoàng Hà", "Trung Quốc cổ đại"]], "Nối cho đúng nhé!"),
  topic("ls6-c4", "🌏", "Lịch sử: Đông Nam Á từ đầu Công nguyên đến thế kỉ X", "Chương 4 • Các quốc gia sơ kì • Vương quốc phong kiến • Giao lưu văn hoá", [
    ["Khu vực Đông Nam Á gồm hai phần địa lí chính nào?", "Đông Nam Á lục địa và Đông Nam Á hải đảo", "Chỉ gồm các đảo nhỏ", "Chỉ gồm phần đất liền", "Việt Nam thuộc phần Đông Nam Á lục địa."],
    ["Các quốc gia sơ kì ở Đông Nam Á hình thành vào khoảng thời gian nào?", "Khoảng đầu Công nguyên đến thế kỉ VII (như Văn Lang – Âu Lạc, Phù Nam, Chăm-pa, các tiểu quốc Mã Lai...)", "Thế kỉ XIX", "Thế kỉ XX", "Đây là giai đoạn các nhà nước đầu tiên ra đời trong khu vực."],
    ["Vương quốc Phù Nam nằm ở khu vực nào ngày nay?", "Hạ lưu sông Mê Kông (Nam Bộ Việt Nam và Cam-pu-chia)", "Bắc Bộ Việt Nam", "Bán đảo Mã Lai phía nam", "Phù Nam từng là vương quốc hùng mạnh, có cảng biển Óc Eo nổi tiếng."],
    ["Cảng biển Óc Eo của Phù Nam nổi tiếng vì điều gì?", "Là trung tâm thương mại quốc tế sầm uất, giao thương với Ấn Độ, Trung Quốc và cả phương Tây", "Là nơi đóng tàu chiến lớn nhất thời đó", "Chỉ buôn bán nội bộ trong nước", "Di tích Óc Eo (An Giang) còn nhiều hiện vật quý của nhiều nền văn hoá."],
    ["Văn hoá Ấn Độ ảnh hưởng đến Đông Nam Á cổ chủ yếu qua con đường nào?", "Qua thương mại đường biển và các nhà truyền giáo, thương nhân Ấn Độ", "Qua chiến tranh xâm lược lớn của Ấn Độ", "Qua đường bộ từ châu Âu", "Chữ viết, tôn giáo (Ấn Độ giáo, Phật giáo), kiến trúc đền tháp chịu ảnh hưởng Ấn Độ."],
    ["Chăm-pa là vương quốc của cư dân nào, nằm ở đâu ngày nay?", "Của người Chăm, ở duyên hải miền Trung Việt Nam", "Của người Khơ-me, ở hạ lưu Mê Kông", "Của người Môn, ở Mi-an-ma", "Chăm-pa để lại hệ thống tháp Chăm nổi tiếng như Mỹ Sơn, Tháp Nhạn..."],
    ["Vương quốc cổ trên đất Cam-pu-chia ngày nay trước thời Ăng-co là?", "Chân Lạp (Chenla)", "Đại Việt", "Lan Xang", "Chân Lạp kế thừa một phần lãnh thổ Phù Nam, sau phát triển thành đế chế Ăng-co."],
    ["Nền kinh tế chủ đạo của các quốc gia Đông Nam Á cổ là gì?", "Nông nghiệp trồng lúa nước kết hợp thương mại đường biển", "Công nghiệp khai khoáng hiện đại", "Chăn nuôi du mục trên thảo nguyên", "Lúa nước là nền tảng văn hoá – kinh tế của khu vực."],
    ["Các vương quốc phong kiến Đông Nam Á hình thành và phát triển trong giai đoạn nào?", "Khoảng thế kỉ VII đến thế kỉ X (và tiếp tục thịnh đạt sau đó)", "Thế kỉ I TCN", "Thế kỉ XVIII", "Đây là thời kì các vương quốc như Đại Việt (sau này), Ăng-co, Pa-gan, Sri Vi-giay-a lớn mạnh."],
    ["Srivijaya (Sri Vi-giay-a) là vương quốc hải đảo hùng mạnh kiểm soát eo biển nào quan trọng?", "Eo biển Ma-lắc-ca — tuyến hàng hải huyết mạch giữa Ấn Độ Dương và Thái Bình Dương", "Eo biển Bê-ring", "Kênh đào Xuy-ê", "Srivijaya ở đảo Sumatra (In-đô-nê-xi-a ngày nay), mạnh về thương mại biển."],
    ["Tôn giáo nào từ Ấn Độ lan truyền mạnh vào Đông Nam Á thời kì này?", "Ấn Độ giáo và Phật giáo", "Hồi giáo (chủ yếu đến sau, từ thế kỉ XIII)", "Thiên Chúa giáo", "Đền tháp Hindu và chùa Phật giáo là dấu ấn văn hoá lớn trong khu vực."],
    ["Giao lưu văn hoá giữa các nước Đông Nam Á và với Ấn Độ, Trung Quốc diễn ra theo tinh thần nào nổi bật?", "Tiếp thu có chọn lọc, kết hợp với văn hoá bản địa tạo nên bản sắc riêng của từng dân tộc", "Sao chép nguyên xi không thay đổi", "Từ chối mọi yếu tố bên ngoài", "Ví dụ: tháp Chăm, chùa tháp Ăng-co vừa chịu ảnh hưởng Ấn Độ vừa rất độc đáo bản địa."],
    ["Yếu tố tự nhiên nào giúp Đông Nam Á trở thành cầu nối thương mại Đông – Tây?", "Vị trí nằm trên tuyến đường biển quốc tế, chịu ảnh hưởng gió mùa thuận lợi cho thuyền buồm", "Nằm sát Bắc Cực lạnh giá", "Hoàn toàn cách biệt với biển", "Gió mùa đưa thuyền buôn qua lại theo mùa — điều kiện vàng cho thương mại."],
    ["Vương quốc Phù Nam thịnh đạt nhất và bắt đầu suy yếu vào khoảng thời kì nào?", "Thịnh đạt thế kỉ I – VI, suy yếu từ cuối thế kỉ VI", "Thế kỉ X – XII", "Thế kỉ XV – XVI", "Sau thời thịnh đạt, Phù Nam dần nhường vai trò cho Chân Lạp."],
    ["Hiện vật văn hoá Óc Eo cho thấy điều gì về Phù Nam?", "Giao thương quốc tế sôi động với nhiều nước xa gần", "Phù Nam hoàn toàn khép kín", "Phù Nam chỉ buôn bán nội bộ", "Trang sức, tiền tệ, con dấu của nhiều nước được tìm thấy ở Óc Eo."],
    ["Đế quốc Ăng-co là của dân tộc nào trên đất nước Cam-pu-chia ngày nay?", "Người Khơ-me", "Người Thái", "Người Việt", "Ăng-co để lại quần thể đền tháp Ăng-co nổi tiếng thế giới."],
    ["Đền Ăng-co Vát ban đầu được xây để thờ vị thần nào của Ấn Độ giáo?", "Thần Vít-nu (Vishnu)", "Thần Bra-ma (Brahma)", "Thần Dớt (Zeus)", "Ăng-co Vát do vua Su-ri-a-vác-man II xây thờ thần Vít-nu vào thế kỉ XII."],
    ["Vương quốc Pa-gan nằm trên lãnh thổ quốc gia nào ngày nay?", "Mi-an-ma", "Thái Lan", "Lào", "Pa-gan ở vùng hạ lưu sông I-ra-oa-đi, nổi tiếng với hàng nghìn chùa tháp."],
    ["Vùng đồng bằng Pa-gan ngày nay nổi tiếng vì còn lại rất nhiều công trình nào?", "Chùa, tháp Phật giáo bằng gạch", "Kim tự tháp đá", "Tháp Chăm cao tầng", "Hàng nghìn chùa tháp cổ là dấu ấn của vương quốc Pa-gan."],
    ["Người Chăm nổi tiếng với kiến trúc và nghề thủ công nào?", "Xây tháp bằng gạch nung và điêu khắc đá", "Đúc trống đồng lớn", "Dệt vải bằng khung cửi máy", "Tháp Chăm như Mỹ Sơn, Po Nagar là di sản kiến trúc độc đáo."],
    ["Tín ngưỡng bản địa tiêu biểu của cư dân Đông Nam Á cổ là gì?", "Thờ cúng tổ tiên và thần tự nhiên (thần lúa, thần sông)", "Chỉ thờ một vị vua duy nhất", "Hoàn toàn không có tín ngưỡng", "Tín ngưỡng bản địa hoà quyện với Ấn Độ giáo, Phật giáo đến từ bên ngoài."],
    ["Lễ hội té nước mừng năm mới là truyền thống của những nước nào trong khu vực?", "Thái Lan, Lào, Cam-pu-chia, Mi-an-ma", "Nhật Bản, Hàn Quốc", "Việt Nam, Trung Quốc", "Songkran ở Thái Lan, Bunpimay ở Lào gắn với Phật giáo và ước vọng mưa thuận gió hoà."],
    ["Điều kiện tự nhiên nào giúp cư dân Đông Nam Á cổ phát triển nghề trồng lúa nước?", "Khí hậu nóng ẩm, mưa nhiều, sông ngòi và đồng bằng màu mỡ", "Khí hậu lạnh giá, khô hạn", "Địa hình núi cao quanh năm có tuyết", "Lúa nước là nền tảng kinh tế – văn hoá của khu vực đến ngày nay."],
    ["Tiền thân của vương quốc Chăm-pa là Lâm Ấp, do cư dân nào lập nên?", "Người Chăm", "Người Khơ-me", "Người Môn", "Lâm Ấp ra đời cuối thế kỉ II, sau phát triển thành Chăm-pa."],
    ["Chữ viết của nhiều nước Đông Nam Á cổ (Chăm, Khơ-me, Môn...) chịu ảnh hưởng từ chữ viết của nước nào?", "Ấn Độ", "La Mã", "Ai Cập", "Chữ Phạn và mẫu chữ Ấn Độ được các nước trong khu vực tiếp thu, cải biến."],
    ["Vì sao các vương quốc cổ Đông Nam Á thường hình thành ở lưu vực sông và ven biển?", "Thuận lợi cho trồng lúa nước và giao thương đường biển", "Để tránh mọi tiếp xúc bên ngoài", "Vì vùng núi không có đất ở", "Sông và biển là hai trục kinh tế chính của các vương quốc cổ."],
    ["Đền Bô-rô-bu-đu, kì quan Phật giáo bằng đá rất lớn, nằm ở quốc gia nào ngày nay?", "In-đô-nê-xi-a (đảo Gia-va)", "Cam-pu-chia", "Thái Lan", "Bô-rô-bu-đu xây vào khoảng thế kỉ VIII – IX thời vương quốc Sai-len-đra."]
  ], [["Phù Nam", "Hạ lưu Mê Kông, cảng Óc Eo"], ["Chăm-pa", "Miền Trung Việt Nam"], ["Chân Lạp", "Cam-pu-chia ngày nay"], ["Srivijaya", "Eo biển Ma-lắc-ca"]], "Nối vương quốc với vị trí nhé!"),
  (function () { var kp = knowledgePools([
      ["Nhà nước đầu tiên của nước ta là nhà nước nào, ra đời vào khoảng thời gian nào?", "Văn Lang, khoảng thế kỉ VII TCN, do các vua Hùng dựng nên", "Đại Việt, thế kỉ XI", "Đại Cồ Việt, năm 968", "Thời đại Hùng Vương mở đầu lịch sử dựng nước của dân tộc."],
      ["Sau Văn Lang, An Dương Vương lập nên nhà nước nào?", "Âu Lạc (sau khi liên kết Lạc Việt và Âu Việt, đóng đô ở Cổ Loa)", "Đại Ngu", "Văn Lang thứ hai", "An Dương Vương xây thành Cổ Loa và có nỏ thần nổi tiếng."],
      ["Sau khi Triệu Đà thôn tính Âu Lạc (179 TCN), nước ta rơi vào tình trạng gì kéo dài hơn 1000 năm?", "Thời kì Bắc thuộc: bị các triều đại phong kiến phương Bắc đô hộ", "Độc lập hoàn toàn và lớn mạnh", "Chia thành nhiều nước nhỏ tự trị", "Thời Bắc thuộc kéo dài từ 179 TCN đến năm 938."],
      ["Chính sách cai trị hà khắc của phong kiến phương Bắc gồm những điểm chính nào?", "Đồng hoá dân tộc ta, vơ vét của cải, bóc lột thuế khoá và sức người, chia nước ta thành quận huyện của chúng", "Tôn trọng phong tục Việt và giảm thuế", "Cho người Việt tự trị hoàn toàn", "Chính sách đồng hoá nhằm xoá bỏ bản sắc dân tộc Việt nhưng không thành công."],
      ["Cuộc khởi nghĩa nào mở đầu truyền thống đấu tranh giành độc lập thời Bắc thuộc?", "Khởi nghĩa Hai Bà Trưng (năm 40)", "Khởi nghĩa Bà Triệu (năm 248)", "Khởi nghĩa Mai Thúc Loan (năm 722)", "Hai Bà Trưng phất cờ khởi nghĩa ở Hát Môn, được đông đảo nhân dân hưởng ứng."],
      ["Hai Bà Trưng xưng vương và đóng đô ở đâu sau thắng lợi năm 40?", "Đóng đô ở Mê Linh, Trưng Vương lên ngôi", "Đóng đô ở Cổ Loa", "Đóng đô ở Thăng Long", "Nền độc lập chỉ tồn tại 3 năm (40–43) trước khi Mã Viện đem quân đàn áp."],
      ["Lí Bí khởi nghĩa năm 544, lập nên nhà nước nào?", "Nước Vạn Xuân, Lí Bí xưng Nam Việt Đế (Lí Nam Đế)", "Nước Đại Cồ Việt", "Nước Đại Việt", "Vạn Xuân nghĩa là mong đất nước trường tồn muôn xuân."],
      ["Người anh hùng nào được tôn là “Bố Cái Đại Vương”?", "Phùng Hưng — lãnh đạo nhân dân khởi nghĩa chống nhà Đường cuối thế kỉ VIII", "Ngô Quyền", "Dương Đình Nghệ", "Phùng Hưng quê ở Đường Lâm (Sơn Tây, Hà Nội ngày nay)."],
      ["Chiến thắng nào năm 938 chấm dứt thời kì Bắc thuộc, mở ra thời kì độc lập lâu dài?", "Chiến thắng Bạch Đằng của Ngô Quyền đánh bại quân Nam Hán", "Chiến thắng Như Nguyệt năm 1077", "Chiến thắng Ngọc Hồi – Đống Đa năm 1789", "Ngô Quyền dùng trận địa cọc ngầm trên sông Bạch Đằng tiêu diệt thuỷ quân Nam Hán."],
      ["Trước chiến thắng Bạch Đằng 938, sự kiện nào đặt nền móng cho thắng lợi đó?", "Họ Khúc giành quyền tự chủ (Khúc Thừa Dụ năm 905) và Dương Đình Nghệ tiếp tục giữ quyền tự chủ", "Triệu Đà đầu hàng nhà Hán", "An Dương Vương mất nước", "Từ 905, người Việt đã giành quyền tự chủ, chỉ còn danh nghĩa phụ thuộc."],
      ["Trong thời Bắc thuộc, nhân dân ta giữ gìn bản sắc văn hoá bằng cách nào?", "Giữ tiếng nói, phong tục tập quán, tín ngưỡng (thờ cúng tổ tiên), nghề truyền thống và ý chí độc lập", "Bỏ hết phong tục cổ truyền", "Chỉ học theo văn hoá phương Bắc", "Văn hoá Việt trường tồn là sức mạnh giúp dân tộc giành lại độc lập."],
      ["Vương quốc Chăm-pa trong giai đoạn đến đầu thế kỉ X nằm ở khu vực nào và có kinh đô nổi tiếng nào?", "Ở miền Trung ngày nay; các trung tâm như Trà Kiệu, sau là Vijaya (Đồ Bàn)", "Ở miền Bắc ngày nay; kinh đô Thăng Long", "Ở Nam Bộ ngày nay; kinh đô Óc Eo", "Chăm-pa là nước láng giềng phía nam của Đại Việt sau này."],
      ["Óc Eo – Ba Thê và vương quốc Phù Nam đến khoảng thế kỉ VII thì thế nào?", "Phù Nam suy yếu và diệt vong, vai trò chuyển giao cho Chân Lạp; vùng đất Nam Bộ sau này thuộc về các nước trong khu vực rồi dần thuộc Việt Nam", "Phù Nam vẫn hùng mạnh đến thế kỉ XIX", "Phù Nam di chuyển ra hải đảo hết", "Sự suy vong của Phù Nam là một bước ngoặt của lịch sử khu vực hạ lưu Mê Kông."]
    ], [["Văn Lang", "Nhà nước đầu tiên, thời Hùng Vương"], ["Âu Lạc", "An Dương Vương, thành Cổ Loa"], ["Năm 40", "Khởi nghĩa Hai Bà Trưng"], ["Năm 938", "Ngô Quyền thắng Bạch Đằng"]], "Nối sự kiện với ý đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các sự kiện theo thứ tự thời gian!", ["Văn Lang ra đời (khoảng thế kỉ VII TCN)", "Âu Lạc của An Dương Vương", "Khởi nghĩa Hai Bà Trưng (năm 40)", "Lí Bí lập nước Vạn Xuân (544)", "Ngô Quyền thắng Bạch Đằng (938)"]); });
    return { id: "ls6-c5", emoji: "🇻🇳", name: "Lịch sử: Việt Nam từ thế kỉ VII TCN đến đầu thế kỉ X", sub: "Chương 5 • Văn Lang, Âu Lạc • Bắc thuộc và đấu tranh giành độc lập • Chăm-pa, Phù Nam", pools: kp }; })(),
  topic("dl6-c1", "🗺️", "Địa lí: Bản đồ — phương tiện thể hiện bề mặt Trái Đất", "Chương 1 • Hệ thống kinh, vĩ tuyến • Toạ độ địa lí • Tỉ lệ bản đồ • Kí hiệu, chú giải • Phương hướng", [
    ["Kinh tuyến là gì?", "Là nửa đường tròn nối hai cực Bắc – Nam trên bề mặt Trái Đất", "Là đường tròn song song với Xích đạo", "Là đường biên giới giữa hai nước", "Kinh tuyến gốc là kinh tuyến 0° đi qua đài thiên văn Grienwich (Luân Đôn)."],
    ["Vĩ tuyến là gì?", "Là những đường tròn song song với Xích đạo, nhỏ dần về hai cực", "Là nửa đường tròn nối hai cực", "Là đường thẳng đứng trên bản đồ", "Xích đạo là vĩ tuyến gốc (0°), dài nhất."],
    ["Toạ độ địa lí của một điểm gồm những gì?", "Gồm kinh độ và vĩ độ của điểm đó", "Chỉ gồm tên địa điểm", "Gồm độ cao và độ sâu", "Biết toạ độ là xác định được vị trí của điểm trên bản đồ/quả Địa Cầu."],
    ["Tỉ lệ bản đồ cho biết điều gì?", "Mức độ thu nhỏ của khoảng cách trên bản đồ so với khoảng cách thực tế", "Hướng Bắc của bản đồ", "Tên của vùng đất trên bản đồ", "Ví dụ 1 : 1 000 000 nghĩa là 1 cm trên bản đồ bằng 1 000 000 cm (10 km) thực tế."],
    ["Bản đồ tỉ lệ LỚN so với bản đồ tỉ lệ NHỎ khác nhau thế nào?", "Bản đồ tỉ lệ lớn thể hiện khu vực nhỏ nhưng chi tiết hơn; tỉ lệ nhỏ thể hiện khu vực rộng, ít chi tiết", "Hai loại hoàn toàn giống nhau", "Tỉ lệ lớn thì vùng đất trên bản đồ bé hơn thực tế nhiều lần hơn", "Bản đồ lớp học, bản đồ thành phố thường có tỉ lệ lớn."],
    ["Kí hiệu bản đồ là gì?", "Là những hình vẽ, màu sắc, chữ viết quy ước dùng để thể hiện các đối tượng địa lí trên bản đồ", "Là tên tác giả vẽ bản đồ", "Là đường viền trang trí bản đồ", "Muốn đọc bản đồ phải xem BẢNG CHÚ GIẢI kí hiệu."],
    ["Trên bản đồ, hướng Bắc thường được quy ước ở phía nào?", "Ở phía trên của bản đồ (trừ khi có mũi tên chỉ hướng Bắc riêng)", "Ở phía dưới", "Ở phía bên trái", "Từ hướng Bắc, ta suy ra các hướng còn lại: Nam ở dưới, Đông bên phải, Tây bên trái."],
    ["Mũi tên la bàn trên bản đồ dùng để làm gì?", "Xác định phương hướng trên bản đồ", "Đo khoảng cách", "Trang trí", "Khi bản đồ không vẽ Bắc ở phía trên, mũi tên chỉ Bắc là căn cứ xác định hướng."],
    ["Để đo khoảng cách thực tế giữa hai điểm bằng bản đồ, em làm theo bước nào đúng?", "Đo khoảng cách hai điểm trên bản đồ (cm) rồi nhân với tỉ lệ bản đồ, sau đó đổi ra đơn vị thực tế (km)", "Cứ đo trên bản đồ được bao nhiêu cm thì thực tế là bấy nhiêu km", "Đếm số ô vuông của lưới kinh vĩ", "Ví dụ: bản đồ 1 : 100 000, đo được 5 cm → thực tế 5 × 100 000 = 500 000 cm = 5 km."],
    ["Quả Địa Cầu khắc phục được nhược điểm gì của bản đồ giấy phẳng?", "Thể hiện đúng hình dạng, diện tích tương đối của các châu lục, đại dương (không bị biến dạng như khi trải phẳng)", "Nhỏ gọn hơn bản đồ giấy", "Rẻ hơn bản đồ giấy", "Mọi bản đồ phẳng đều có sai lệch nhất định so với thực tế cong của Trái Đất."],
    ["Kinh độ của một điểm là gì?", "Là số độ của kinh tuyến đi qua điểm đó, tính từ kinh tuyến gốc (Đông hoặc Tây)", "Là khoảng cách từ điểm đó tới Xích đạo", "Là độ cao của điểm đó", "Vĩ độ tính từ Xích đạo (Bắc/Nam); kinh độ tính từ kinh tuyến gốc (Đông/Tây)."],
    ["Việt Nam nằm ở bán cầu nào xét theo Xích đạo và kinh tuyến gốc?", "Phần lớn lãnh thổ ở bán cầu Bắc và bán cầu Đông", "Bán cầu Nam và bán cầu Tây", "Đúng trên đường Xích đạo", "Vĩ độ Việt Nam khoảng 8°34′B đến 23°23′B nên thuộc bán cầu Bắc."],
    ["Ứng dụng hiện đại nào giúp xác định vị trí và tìm đường phổ biến hiện nay?", "Hệ thống định vị toàn cầu GPS trên điện thoại, bản đồ số", "Chỉ có la bàn giấy", "Nhìn sao trời là duy nhất", "GPS dùng vệ tinh để xác định toạ độ chính xác của người dùng."]
  ], [["Kinh tuyến", "Nối hai cực Bắc – Nam"], ["Vĩ tuyến", "Song song Xích đạo"], ["Tỉ lệ bản đồ", "Mức thu nhỏ so với thực tế"], ["Chú giải", "Giải thích kí hiệu bản đồ"]], "Nối khái niệm với ý đúng nhé!"),
  topic("dl6-c2", "🌍", "Địa lí: Trái Đất — hành tinh của hệ Mặt Trời", "Chương 2 • Tự quay và hệ quả • Quay quanh Mặt Trời và các mùa • Xác định phương hướng", [
    ["Trái Đất có hình dạng như thế nào?", "Hình cầu (hơi dẹt ở hai cực, phình ở Xích đạo)", "Hình vuông phẳng", "Hình tam giác", "Bằng chứng: ảnh chụp từ vũ trụ, hiện tượng tàu biển xuất hiện dần ở chân trời..."],
    ["Trái Đất tự quay quanh trục theo chiều nào và chu kì bao lâu?", "Từ Tây sang Đông, một vòng hết 24 giờ (một ngày đêm)", "Từ Đông sang Tây, hết 12 giờ", "Từ Bắc xuống Nam, hết 365 ngày", "Trục Trái Đất nghiêng 23,5° so với mặt phẳng quỹ đạo."],
    ["Hệ quả chính của sự tự quay quanh trục của Trái Đất là gì?", "Sự luân phiên ngày và đêm, giờ giấc khác nhau theo kinh độ, sự lệch hướng chuyển động của vật", "Sự thay đổi các mùa trong năm", "Hiện tượng thuỷ triều do Mặt Trăng mà thôi", "Nơi nào đang hướng về Mặt Trời thì là ban ngày."],
    ["Trái Đất quay quanh Mặt Trời theo chu kì bao lâu?", "Khoảng 365 ngày 6 giờ (một năm)", "Đúng 30 ngày", "24 giờ", "Phần 6 giờ dư tích lại thành năm nhuận có 366 ngày (4 năm một lần)."],
    ["Các mùa trong năm hình thành do đâu?", "Do trục Trái Đất nghiêng không đổi hướng trong khi Trái Đất quay quanh Mặt Trời, làm lượng nhiệt và ánh sáng nhận được ở hai bán cầu thay đổi", "Do Trái Đất lúc gần lúc xa Mặt Trời là nguyên nhân chính", "Do Mặt Trời thay đổi độ sáng theo mùa", "Khi bán cầu Bắc ngả về Mặt Trời thì Bắc bán cầu là mùa hè, Nam bán cầu là mùa đông."],
    ["Ngày 21/3 và 23/9 có hiện tượng gì đặc biệt?", "Mặt Trời chiếu thẳng góc vào Xích đạo: khắp nơi trên Trái Đất ngày và đêm dài bằng nhau (xuân phân, thu phân)", "Cả Trái Đất đều là ban ngày", "Mặt Trời không mọc ở hai cực nữa", "21/3 là xuân phân, 23/9 là thu phân ở bán cầu Bắc."],
    ["Khoảng 22/6 (hạ chí), bán cầu nào ngả về phía Mặt Trời và có mùa gì?", "Bán cầu Bắc ngả về Mặt Trời — mùa hè ở bán cầu Bắc (ngày dài, đêm ngắn)", "Bán cầu Nam — mùa hè ở bán cầu Nam", "Không bán cầu nào ngả về Mặt Trời", "Ngược lại, 22/12 (đông chí) bán cầu Nam ngả về Mặt Trời."],
    ["Dùng Mặt Trời mọc để xác định phương hướng: buổi sáng, Mặt Trời mọc ở hướng nào?", "Hướng Đông", "Hướng Tây", "Hướng Nam", "Đứng quay mặt về phía Mặt Trời mọc: trước mặt là Đông, sau lưng là Tây, tay trái là Bắc, tay phải là Nam."],
    ["Dụng cụ đơn giản, truyền thống để xác định phương hướng là gì?", "La bàn (kim la bàn luôn chỉ hướng Bắc – Nam gần đúng)", "Nhiệt kế", "Thước dây", "Kim la bàn là kim nam châm tự do, bị từ trường Trái Đất hút về hướng Bắc – Nam."],
    ["Ban đêm trời quang, người xưa xác định hướng Bắc bằng cách nào?", "Tìm sao Bắc Cực (sao Bắc Đẩu chỉ hướng) — ngôi sao gần như cố định ở phía Bắc bầu trời", "Nhìn Mặt Trăng lặn", "Nghe tiếng gió thổi", "Sao Bắc Cực nằm gần trên trục quay Trái Đất kéo dài nên ít thay đổi vị trí."],
    ["Vì sao giờ ở các nước trên thế giới lại chênh nhau?", "Vì Trái Đất hình cầu tự quay: mỗi khu vực hướng về Mặt Trời vào thời điểm khác nhau, nên người ta chia 24 múi giờ", "Vì mỗi nước tự chọn giờ tuỳ thích không theo quy luật", "Vì Mặt Trời mọc hai lần trong ngày", "Mỗi múi giờ rộng khoảng 15° kinh tuyến; Việt Nam ở múi giờ GMT+7."],
    ["Hiện tượng “ngày địa cực” (Mặt Trời không lặn suốt 24 giờ) xảy ra ở đâu và khi nào?", "Ở vùng cực vào mùa hè của bán cầu đó, do trục Trái Đất nghiêng hướng cực về phía Mặt Trời", "Ở vùng Xích đạo quanh năm", "Ở Việt Nam mỗi mùa hè", "Ngược lại mùa đông vùng cực có đêm kéo dài 24 giờ."],
    ["Mặt phẳng quỹ đạo của Trái Đất là mặt phẳng như thế nào?", "Là mặt phẳng chứa quỹ đạo chuyển động của Trái Đất quanh Mặt Trời, trục Trái Đất nghiêng 23,5° so với đường vuông góc với mặt phẳng này", "Là mặt bàn học", "Là bề mặt của Mặt Trăng", "Độ nghiêng không đổi của trục là nguyên nhân sâu xa của các mùa."]
  ], [["Tự quay quanh trục", "24 giờ — ngày và đêm"], ["Quay quanh Mặt Trời", "365 ngày — các mùa"], ["La bàn", "Xác định phương hướng"], ["Sao Bắc Cực", "Chỉ hướng Bắc ban đêm"]], "Nối cho đúng nhé!"),
  topic("dl6-c3", "🏔️", "Địa lí: Cấu tạo Trái Đất, vỏ Trái Đất, địa hình và khoáng sản", "Chương 3 • Các lớp cấu tạo • Mảng kiến tạo • Núi lửa, động đất • Các dạng địa hình • Khoáng sản", [
    ["Trái Đất gồm mấy lớp cấu tạo chính (từ ngoài vào trong)?", "Ba lớp: vỏ Trái Đất, lớp trung gian (manti) và nhân Trái Đất", "Hai lớp: vỏ và nhân", "Năm lớp đất chồng nhau", "Nhân Trái Đất rất nóng, chủ yếu là sắt và niken."],
    ["Vỏ Trái Đất có đặc điểm gì?", "Là lớp ngoài cùng, mỏng nhất, gồm vỏ lục địa (dày hơn) và vỏ đại dương (mỏng hơn)", "Là lớp dày nhất của Trái Đất", "Là lớp lỏng hoàn toàn", "Vỏ Trái Đất là nơi con người sinh sống và khai thác tài nguyên."],
    ["Thuyết kiến tạo mảng cho rằng vỏ Trái Đất như thế nào?", "Vỏ Trái Đất gồm nhiều mảng lớn nhỏ đang di chuyển chậm trên lớp vật chất dẻo nóng bên dưới", "Vỏ Trái Đất là một khối liền đứng yên tuyệt đối", "Các mảng di chuyển rất nhanh như xe chạy", "Sự di chuyển của các mảng tạo nên núi, biển, núi lửa, động đất."],
    ["Núi lửa hình thành do hiện tượng gì?", "Vật chất nóng chảy (macma) từ dưới sâu phun trào lên bề mặt Trái Đất qua các khe nứt của vỏ Trái Đất", "Do gió thổi cát thành núi", "Do sông bồi đắp phù sa", "Núi lửa đang hoạt động có thể gây thiệt hại lớn nhưng tro núi lửa làm đất đai màu mỡ."],
    ["Động đất là hiện tượng gì và đo bằng thang nào phổ biến?", "Là sự rung chuyển của mặt đất do các mảng kiến tạo va chạm/trượt lên nhau; độ mạnh đo bằng thang Richter", "Là cơn bão mạnh trên biển; đo bằng thang Beaufort", "Là hiện tượng thuỷ triều lên cao; đo bằng mét", "Động đất mạnh gây sập nhà, sóng thần (nếu ở đáy biển)."],
    ["Lực nội sinh là lực có nguồn gốc từ đâu và tạo ra điều gì?", "Từ bên trong lòng Trái Đất; tạo nên lục địa, đại dương, dãy núi, cao nguyên, động đất, núi lửa", "Từ gió, nước chảy bên ngoài", "Từ hoạt động của con người", "Nội sinh làm bề mặt Trái Đất gồ ghề, nâng lên hạ xuống."],
    ["Lực ngoại sinh là gì?", "Là lực từ bên ngoài (năng lượng Mặt Trời, nước, gió, băng...) làm mài mòn, bóc mòn và bồi đắp bề mặt Trái Đất", "Lực từ lõi Trái Đất phun ra", "Lực hút của Mặt Trăng", "Ngoại sinh có xu hướng san bằng bề mặt Trái Đất."],
    ["Địa hình núi có độ cao tuyệt đối từ bao nhiêu trở lên?", "Từ 500 m trở lên so với mực nước biển (núi thấp 500–1000 m, núi trung bình 1000–2000 m, núi cao trên 2000 m)", "Từ 50 m trở lên", "Từ 5000 m trở lên", "Địa hình núi chiếm diện tích lớn ở phía Tây và Bắc nước ta."],
    ["Cao nguyên khác đồi và đồng bằng ở điểm nào?", "Cao nguyên cao trên 500 m, bề mặt tương đối bằng phẳng hoặc hơi gợn sóng, sườn dốc", "Cao nguyên thấp dưới 200 m", "Cao nguyên là vùng trũng ngập nước", "Ví dụ: cao nguyên Mộc Châu, cao nguyên Di Linh, Tây Nguyên đất đỏ badan."],
    ["Đồng bằng được hình thành chủ yếu do quá trình nào?", "Do phù sa sông bồi đắp lâu dài (đồng bằng châu thổ) hoặc biển bồi tụ", "Do núi lửa phun trào", "Do động đất nâng lên", "Đồng bằng sông Hồng và đồng bằng sông Cửu Long là hai đồng bằng lớn nhất nước ta."],
    ["Khoáng sản được phân thành những nhóm chính nào theo công dụng?", "Khoáng sản năng lượng (than, dầu...), khoáng sản kim loại (sắt, đồng...), khoáng sản phi kim loại (apatit, đá vôi...)", "Chỉ có khoáng sản quý hiếm", "Khoáng sản ăn được và không ăn được", "Khoáng sản là tài nguyên quý nhưng có hạn, cần khai thác hợp lí."],
    ["Khi có động đất, hành động an toàn hợp lí là gì?", "Trú dưới gầm bàn chắc chắn, tránh xa cửa kính và vật dễ đổ; nếu ở ngoài trời thì tránh xa nhà cao tầng, cột điện", "Chạy vào thang máy ngay", "Đứng cạnh cửa kính để xem", "Kĩ năng ứng phó thiên tai giúp giảm thiệt hại về người."],
    ["Dạng địa hình hang động đá vôi (như Phong Nha, Hạ Long) được tạo nên chủ yếu nhờ tác động nào?", "Nước mưa, nước ngầm hoà tan và ăn mòn đá vôi trong thời gian rất dài (tác động ngoại sinh)", "Núi lửa phun trào tạo hang", "Con người đục đẽo toàn bộ", "Địa hình cacxtơ (karst) là đặc sản du lịch của Việt Nam."],
    ["Lớp nào là lớp DÀY nhất trong cấu tạo Trái Đất?", "Lớp trung gian (manti)", "Vỏ Trái Đất", "Nhân Trái Đất", "Lớp manti dày khoảng 2 900 km, chiếm phần lớn thể tích Trái Đất."],
    ["Nhân Trái Đất chủ yếu gồm những kim loại nào?", "Sắt và niken", "Đồng và chì", "Nhôm và thiếc", "Nhân rất nóng và đặc, chủ yếu là sắt – niken."],
    ["Macma là gì?", "Vật chất nóng chảy nằm sâu trong lòng Trái Đất", "Dung nham đã nguội cứng trên mặt đất", "Khí nóng trong khí quyển", "Macma phun lên bề mặt sẽ thành dung nham."],
    ["Dung nham khác macma ở điểm nào?", "Dung nham là macma đã phun ra trên bề mặt Trái Đất", "Dung nham nằm sâu dưới mặt đất", "Dung nham lạnh hơn đóng băng", "Hai tên gọi phân biệt theo vị trí: dưới sâu là macma, trên mặt đất là dung nham."],
    ["“Đai lửa Thái Bình Dương” nổi tiếng vì có nhiều hiện tượng gì?", "Núi lửa phun trào và động đất", "Bão và lũ lụt", "Hạn hán kéo dài", "Đai lửa vòng quanh Thái Bình Dương tập trung nhiều núi lửa đang hoạt động."],
    ["Núi trẻ và núi già khác nhau chủ yếu ở điểm nào?", "Núi trẻ cao, đỉnh nhọn; núi già thấp hơn, đỉnh tròn hơn", "Núi già bao giờ cũng cao hơn núi trẻ", "Hai loại núi không khác nhau điểm nào", "Núi trẻ còn đang được nâng lên; núi già bị bào mòn lâu dài nên thấp, tròn."],
    ["Địa hình đồi có độ cao tuyệt đối khoảng bao nhiêu?", "Từ 200 m đến dưới 500 m", "Trên 2 000 m", "Dưới 50 m", "Đồi thấp hơn núi, dạng bát úp, thường trồng chè, cây ăn quả."],
    ["Khoáng sản nào là nhiên liệu chính cho nhiều nhà máy nhiệt điện ở nước ta?", "Than đá (nhất là than ở Quảng Ninh)", "Đá vôi", "Cát thuỷ tinh", "Quảng Ninh là vùng than lớn nhất cả nước."],
    ["Mỏ sắt lớn nổi tiếng của nước ta là mỏ nào?", "Mỏ sắt Thạch Khê (Hà Tĩnh)", "Mỏ than Cẩm Phả (Quảng Ninh)", "Mỏ dầu Bạch Hổ (ngoài khơi)", "Thạch Khê là một trong những mỏ sắt lớn của khu vực."],
    ["Bô-xít, nguyên liệu để luyện nhôm, tập trung nhiều ở vùng nào của nước ta?", "Tây Nguyên", "Đồng bằng sông Hồng", "Đồng bằng sông Cửu Long", "Đất đỏ badan Tây Nguyên chứa nhiều quặng bô-xít."]
  ], [["Vỏ Trái Đất", "Lớp ngoài cùng, mỏng nhất"], ["Nội sinh", "Lực từ trong lòng đất"], ["Ngoại sinh", "Gió, nước mài mòn, bồi đắp"], ["Thang Richter", "Đo độ mạnh động đất"]], "Nối cho đúng nhé!"),
  topic("dl6-c4", "🌦️", "Địa lí: Khí hậu và biến đổi khí hậu", "Chương 4 • Lớp vỏ khí • Khí áp và gió • Nhiệt độ, mây, mưa • Thời tiết và khí hậu • Biểu đồ nhiệt độ – lượng mưa", [
    ["Khí quyển (lớp vỏ khí) có vai trò gì đối với sự sống?", "Cung cấp không khí cho hô hấp, bảo vệ Trái Đất khỏi tia tử ngoại và thiên thạch nhỏ, điều hoà nhiệt độ", "Chỉ dùng để máy bay bay", "Không có vai trò gì", "Khí quyển mỏng nhưng vô cùng quan trọng với sự sống."],
    ["Thành phần chính của không khí khô trong khí quyển là gì?", "Ni-tơ khoảng 78%, ô-xi khoảng 21%, còn lại là các khí khác (cacbonic, hơi nước...)", "Ô-xi chiếm 99%", "Chỉ có nitơ tinh khiết", "Hơi nước trong không khí tuy ít nhưng gây ra mây, mưa."],
    ["Khí áp là gì?", "Là sức ép (áp lực) của cột không khí lên bề mặt Trái Đất và mọi vật", "Là nhiệt độ của không khí", "Là tốc độ của gió", "Khí áp thay đổi theo độ cao: càng lên cao không khí càng loãng, khí áp càng giảm."],
    ["Gió là gì?", "Là sự chuyển động của không khí từ nơi có khí áp cao đến nơi có khí áp thấp", "Là dòng nước chảy trên mặt đất", "Là ánh nắng chiếu xiên", "Chênh lệch khí áp là nguyên nhân sinh ra gió."],
    ["Nhiệt độ không khí thay đổi theo quy luật nào theo độ cao?", "Càng lên cao nhiệt độ càng giảm (trung bình lên 100 m giảm khoảng 0,6°C)", "Càng lên cao càng nóng", "Không thay đổi theo độ cao", "Vì vậy vùng núi cao như Sa Pa, Đà Lạt mát mẻ quanh năm."],
    ["Mây hình thành như thế nào?", "Hơi nước trong không khí bốc lên cao, gặp lạnh ngưng tụ thành những hạt nước nhỏ li ti tụ lại thành mây", "Khói nhà máy bay lên trời", "Bụi từ mặt đất bay thẳng lên", "Khi hạt nước trong mây đủ lớn sẽ rơi xuống thành mưa."],
    ["Thời tiết và khí hậu khác nhau ở điểm nào cơ bản?", "Thời tiết là trạng thái khí quyển trong thời gian NGẮN ở một nơi; khí hậu là đặc trưng thời tiết của một nơi trong thời gian DÀI (nhiều năm)", "Hai khái niệm hoàn toàn giống nhau", "Khí hậu chỉ ngày hôm nay", "Ví dụ: “Hôm nay trời mưa” là thời tiết; “Miền Bắc có mùa đông lạnh” là khí hậu."],
    ["Biểu đồ nhiệt độ – lượng mưa cho biết thông tin gì?", "Diễn biến nhiệt độ trung bình (đường) và lượng mưa (cột) của các tháng trong năm ở một địa điểm", "Số dân của một thành phố", "Giá cả hàng hoá theo tháng", "Đọc biểu đồ giúp nhận xét khí hậu của địa phương."],
    ["Việt Nam nằm trong kiểu khí hậu nào?", "Khí hậu nhiệt đới gió mùa", "Khí hậu hàn đới", "Khí hậu ôn đới hải dương lạnh", "Miền Bắc có mùa đông lạnh, miền Nam nóng quanh năm với hai mùa mưa – khô."],
    ["Biến đổi khí hậu biểu hiện rõ nhất qua hiện tượng nào?", "Nhiệt độ Trái Đất tăng dần (nóng lên toàn cầu), băng tan, nước biển dâng, thời tiết cực đoan nhiều hơn", "Trái Đất ngày càng lạnh đi đều khắp", "Không có thay đổi nào đáng kể", "Biến đổi khí hậu là vấn đề toàn cầu cần chung tay ứng phó."],
    ["Hoạt động nào của con người làm tăng khí nhà kính gây biến đổi khí hậu?", "Đốt nhiều nhiên liệu hoá thạch (than, dầu), phá rừng", "Trồng rừng và dùng điện mặt trời", "Đi xe đạp thay ô tô", "Khí CO₂ từ đốt nhiên liệu là nguyên nhân chính gây hiệu ứng nhà kính."],
    ["Học sinh có thể làm gì để góp phần ứng phó biến đổi khí hậu?", "Tiết kiệm điện nước, trồng cây, phân loại rác, đi bộ/xe đạp đoạn đường gần", "Không thể làm được gì", "Đốt rác nhiều hơn cho sạch", "Mỗi hành động nhỏ đều có ý nghĩa với hành tinh."],
    ["Để đo lượng mưa, người ta dùng dụng cụ nào?", "Thùng đo mưa (vũ kế)", "Nhiệt kế", "La bàn", "Lượng mưa đo bằng milimét (mm) — chiều cao lớp nước mưa đo được."]
  ], [["Khí áp", "Sức ép của không khí"], ["Gió", "Không khí chuyển động áp cao → áp thấp"], ["Thời tiết", "Trạng thái khí quyển thời gian ngắn"], ["Khí hậu", "Đặc trưng thời tiết lâu dài"]], "Nối khái niệm với ý đúng nhé!"),
  topic("dl6-c5", "💧", "Địa lí: Nước trên Trái Đất", "Chương 5 • Thuỷ quyển và vòng tuần hoàn của nước • Sông và hồ • Nước ngầm, băng hà • Biển và đại dương", [
    ["Thuỷ quyển là gì?", "Là toàn bộ nước trên Trái Đất: nước biển, đại dương, sông, hồ, nước ngầm, băng tuyết và hơi nước", "Chỉ gồm nước biển", "Chỉ gồm nước trong sông", "Nước mặn chiếm khoảng 97,5% tổng lượng nước, nước ngọt chỉ khoảng 2,5%."],
    ["Vòng tuần hoàn của nước trong tự nhiên diễn ra theo trình tự nào?", "Nước bốc hơi → ngưng tụ thành mây → mưa rơi xuống → chảy thành sông, ngấm xuống đất → đổ ra biển → lại bốc hơi", "Nước biển chảy ngược lên trời không cần bay hơi", "Nước mưa biến mất hoàn toàn sau khi rơi", "Vòng tuần hoàn giúp nước được làm mới và phân phối khắp nơi."],
    ["Sông là gì?", "Dòng nước chảy thường xuyên, tương đối ổn định trên bề mặt lục địa, đổ ra biển, hồ hoặc sông khác", "Vùng nước đọng nhỏ trong vườn", "Nước trong ống dẫn của nhà máy", "Sông Hồng, sông Mê Kông là các con sông lớn của nước ta."],
    ["Lưu lượng nước sông thay đổi theo mùa gây ra hiện tượng gì ở miền nhiệt đới gió mùa?", "Mùa lũ (nước dâng cao) và mùa cạn (nước hạ thấp) theo mùa mưa – mùa khô", "Sông luôn đầy nước quanh năm như nhau", "Sông đông cứng vào mùa hè", "Chế độ nước sông phụ thuộc vào chế độ mưa của khí hậu."],
    ["Hồ khác sông ở điểm nào?", "Hồ là vùng nước đọng trong các chỗ trũng của lục địa, không chảy thành dòng như sông", "Hồ luôn mặn hơn sông", "Hồ không chứa nước ngọt bao giờ", "Hồ có nguồn gốc từ miệng núi lửa, băng hà, sông cũ (hồ móng ngựa)..."],
    ["Nước ngầm là gì và có vai trò ra sao?", "Là nước nằm dưới bề mặt đất trong các lớp đất đá rỗng; là nguồn nước giếng, nước mạch quan trọng cho sinh hoạt và tưới tiêu", "Là nước mưa đọng trên lá cây", "Là nước trong các đám mây", "Khai thác nước ngầm quá mức gây sụt lún và cạn kiệt nguồn nước."],
    ["Băng hà tập trung chủ yếu ở đâu trên Trái Đất?", "Ở hai vùng cực (Nam Cực, Bắc Cực – đảo Greenland) và trên các đỉnh núi cao", "Ở vùng Xích đạo nóng", "Ở giữa các sa mạc", "Băng hà chứa phần lớn lượng nước ngọt của Trái Đất."],
    ["Biển và đại dương chiếm khoảng bao nhiêu phần diện tích bề mặt Trái Đất?", "Khoảng 71% diện tích bề mặt Trái Đất", "Khoảng 30%", "Khoảng 50%", "Có 4 đại dương lớn: Thái Bình Dương, Đại Tây Dương, Ấn Độ Dương, Bắc Băng Dương."],
    ["Độ muối trung bình của nước biển khoảng bao nhiêu?", "Khoảng 35‰ (35 phần nghìn)", "Khoảng 35% (rất mặn như nước muối đặc)", "0‰ như nước ngọt", "Độ muối thay đổi theo nơi: biển nhiệt đới bốc hơi mạnh thường mặn hơn."],
    ["Thuỷ triều là hiện tượng gì?", "Nước biển dâng lên và rút xuống theo chu kì hằng ngày, chủ yếu do lực hút của Mặt Trăng", "Sóng thần sau động đất", "Mưa lớn làm biển đầy lên", "Thuỷ triều giúp tàu thuyền ra vào cảng và người dân vùng ven biển đánh bắt, làm muối."],
    ["Sóng biển sinh ra chủ yếu do đâu?", "Do gió thổi trên mặt biển (sóng càng lớn khi gió càng mạnh và kéo dài)", "Do cá voi bơi tạo thành", "Do đáy biển tự rung thường xuyên", "Sóng thần là loại sóng đặc biệt do động đất núi lửa dưới đáy biển gây ra."],
    ["Dòng biển (hải lưu) có ảnh hưởng gì đến khí hậu ven biển?", "Dòng biển nóng làm khí hậu ven bờ ấm và ẩm hơn; dòng biển lạnh làm khí hậu lạnh và khô hơn", "Không ảnh hưởng gì đến khí hậu", "Chỉ ảnh hưởng đến cá biển", "Dòng biển còn giúp tàu thuyền di chuyển thuận lợi nếu đi theo chiều dòng."],
    ["Việc làm nào bảo vệ nguồn nước ngọt quý giá?", "Không xả rác, nước thải bẩn xuống sông hồ; tiết kiệm nước sạch", "Đổ dầu thải xuống cống", "Chặt hết cây ven sông", "Nước ngọt chỉ chiếm tỉ lệ rất nhỏ nên càng phải giữ gìn."]
  ], [["Thuỷ quyển", "Toàn bộ nước trên Trái Đất"], ["Thuỷ triều", "Do lực hút của Mặt Trăng"], ["Nước ngầm", "Nước dưới mặt đất"], ["Độ muối biển", "Khoảng 35‰"]], "Nối cho đúng nhé!"),
  (function () { var kp = knowledgePools([
      ["Lớp đất (thổ nhưỡng) là gì?", "Là lớp vật chất mỏng, tơi xốp trên bề mặt lục địa, nơi cây cối sinh sống, được hình thành từ đá mẹ qua quá trình phong hoá lâu dài", "Là toàn bộ lõi Trái Đất", "Là lớp nước ngầm dưới đất", "Đất gồm chất khoáng, mùn (chất hữu cơ), nước và không khí."],
      ["Thành phần nào làm đất màu mỡ, tốt cho cây trồng?", "Chất mùn — xác sinh vật phân huỷ, giàu dinh dưỡng", "Đá cuội lớn", "Cát khô hoàn toàn", "Đất nhiều mùn thường có màu nâu sẫm, tơi xốp."],
      ["Các nhân tố hình thành đất gồm những gì chính?", "Đá mẹ, khí hậu, sinh vật, địa hình và thời gian (cả tác động của con người)", "Chỉ có mưa", "Chỉ có bàn tay con người", "Cùng một loại đá mẹ, khí hậu khác nhau cũng tạo ra đất khác nhau."],
      ["Sinh vật sống trên Trái Đất phân bố theo quy luật nào nổi bật?", "Theo vĩ độ (từ Xích đạo về hai cực) và theo độ cao, gắn với nhiệt độ và lượng mưa", "Phân bố hoàn toàn ngẫu nhiên", "Chỉ sống ở vùng ven biển", "Đới nóng gần Xích đạo sinh vật phong phú nhất."],
      ["Rừng nhiệt đới (rừng mưa) có đặc điểm gì?", "Cây cối xanh quanh năm, nhiều tầng tán, loài sinh vật vô cùng phong phú", "Cây rụng hết lá vào mùa đông", "Chỉ có một loài cây duy nhất", "Rừng nhiệt đới là “lá phổi xanh” và kho dự trữ gen của Trái Đất."],
      ["Đới thiên nhiên ôn đới có kiểu rừng đặc trưng nào?", "Rừng lá rộng rụng lá theo mùa và rừng lá kim (taiga) ở phía Bắc lạnh hơn", "Rừng ngập mặn ven biển nhiệt đới", "Hoang mạc toàn cát", "Sự thay đổi bốn mùa rõ rệt ở đới ôn hoà."],
      ["Hoang mạc hình thành ở những vùng có điều kiện khí hậu nào?", "Vùng rất khô hạn, lượng mưa cực ít, nhiệt độ chênh lệch ngày đêm lớn", "Vùng mưa nhiều quanh năm", "Vùng ven biển ẩm ướt", "Sinh vật hoang mạc thích nghi đặc biệt: xương rồng tích nước, lạc đà chịu khát."],
      ["Đài nguyên (tundra) là đới thiên nhiên ở đâu, có đặc điểm gì?", "Ở vùng cực lạnh, mặt đất đóng băng gần như quanh năm, chỉ có rêu, địa y và cây bụi thấp", "Ở vùng Xích đạo nóng ẩm", "Ở giữa sa mạc Sahara", "Đài nguyên nằm ở rìa Bắc Băng Dương của châu Á, châu Âu, Bắc Mỹ."],
      ["Vì sao rừng nhiệt đới đang bị suy giảm là vấn đề đáng lo toàn cầu?", "Phá rừng làm mất nơi sống của nhiều loài, tăng CO₂ gây biến đổi khí hậu, gây xói mòn đất", "Vì rừng không còn tác dụng gì", "Vì cây rừng tự chết hết cùng lúc", "Bảo vệ rừng là bảo vệ đa dạng sinh học và khí hậu Trái Đất."],
      ["Đất ở đồng bằng sông Hồng, sông Cửu Long màu mỡ nhờ yếu tố nào?", "Nhờ phù sa sông bồi đắp hằng năm, giàu dinh dưỡng", "Nhờ nhiều đá cứng", "Nhờ khí hậu lạnh giá", "Đất phù sa là loại đất tốt nhất cho trồng lúa nước."],
      ["Sự sống trên Trái Đất tập trung ở những môi trường nào?", "Ở mặt đất và lớp đất mặt, trong nước (biển, sông, hồ) và cả trong không khí ở tầng thấp", "Chỉ ở trong lòng đất sâu 10 km", "Chỉ ở đỉnh núi cao nhất", "Sinh quyển là “lớp vỏ sự sống” của Trái Đất."],
      ["Khi lên cao trên núi, thảm thực vật thay đổi như thế nào?", "Thay đổi theo đai cao tương tự như thay đổi theo vĩ độ: rừng nhiệt đới → rừng ôn đới → đồng cỏ, rêu ở đỉnh cao lạnh", "Không thay đổi gì từ chân lên đỉnh", "Đỉnh núi cao luôn có rừng nhiệt đới rậm nhất", "Ví dụ: dãy Hoàng Liên Sơn có nhiều đai thực vật phân tầng."],
      ["Con người tác động đến đất và sinh vật theo hai hướng nào?", "Tích cực: trồng rừng, cải tạo đất, bảo vệ loài quý; Tiêu cực: phá rừng, làm ô nhiễm, săn bắt quá mức gây tuyệt chủng", "Chỉ có tác động tích cực", "Không có tác động gì đáng kể", "Hiểu hai mặt tác động để lựa chọn hành vi thân thiện với thiên nhiên."]
    ], [["Chất mùn", "Làm đất màu mỡ"], ["Rừng nhiệt đới", "Sinh vật phong phú nhất"], ["Hoang mạc", "Khô hạn, mưa rất ít"], ["Đất phù sa", "Do sông bồi đắp"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các đới thiên nhiên theo thứ tự từ XÍCH ĐẠO về CỰC!", ["Rừng nhiệt đới", "Hoang mạc", "Rừng lá rộng ôn đới", "Đài nguyên"]); });
    return { id: "dl6-c6", emoji: "🌱", name: "Địa lí: Đất và sinh vật trên Trái Đất", sub: "Chương 6 • Lớp đất • Sự sống trên Trái Đất • Rừng nhiệt đới • Các đới thiên nhiên", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Dân số thế giới hiện nay khoảng bao nhiêu người?", "Hơn 8 tỉ người (đạt mốc 8 tỉ vào năm 2022)", "Khoảng 1 tỉ người", "Khoảng 100 triệu người", "Dân số thế giới tăng nhanh trong hai thế kỉ gần đây nhờ y tế và đời sống cải thiện."],
      ["Dân số phân bố trên thế giới có đặc điểm gì?", "Rất không đều: đông đúc ở đồng bằng, ven biển, vùng khí hậu thuận lợi; thưa thớt ở hoang mạc, vùng cực, núi cao", "Đều nhau khắp mọi nơi", "Chỉ tập trung ở sa mạc", "Hai khu vực đông dân nhất là Đông Á và Nam Á."],
      ["Mật độ dân số là gì và tính bằng cách nào?", "Là số người sống trung bình trên 1 km², tính bằng tổng số dân chia cho diện tích", "Là tổng số trẻ em trong một làng", "Là số nhà trên một con phố", "Mật độ cao chưa hẳn đã tốt: cần gắn với điều kiện phát triển kinh tế – xã hội."],
      ["Vì sao vùng hoang mạc và vùng cực dân cư rất thưa thớt?", "Vì khí hậu quá khô hạn hoặc quá lạnh, thiếu nước, đất đai khó canh tác", "Vì luật pháp cấm người ở đó", "Vì ở đó không có không khí", "Con người tránh những nơi điều kiện tự nhiên quá khắc nghiệt."],
      ["Mối quan hệ giữa con người và thiên nhiên được hiểu thế nào cho đúng?", "Con người dựa vào thiên nhiên để sống, tác động vào thiên nhiên và cũng chịu tác động ngược lại của thiên nhiên", "Con người hoàn toàn tách rời thiên nhiên", "Thiên nhiên phục vụ con người vô hạn không cần gìn giữ", "Hiểu đúng quan hệ này là nền tảng của phát triển bền vững."],
      ["Phát triển bền vững nghĩa là gì?", "Phát triển đáp ứng nhu cầu hôm nay mà không làm tổn hại khả năng đáp ứng nhu cầu của các thế hệ mai sau", "Khai thác tối đa tài nguyên càng nhanh càng tốt", "Chỉ phát triển kinh tế, không cần môi trường", "Phát triển bền vững gắn ba trụ cột: kinh tế – xã hội – môi trường."],
      ["Hành động nào thể hiện khai thác thiên nhiên một cách thông minh, bền vững?", "Khai thác đi đôi với tái tạo: trồng rừng thay thế, dùng năng lượng tái tạo, xử lí chất thải", "Khai thác cạn kiệt rừng rồi bỏ đi nơi khác", "Đổ chất thải chưa xử lí ra sông", "Khai thác thông minh giúp thiên nhiên phục hồi và phục vụ lâu dài."],
      ["Thiên tai nào thường xảy ra ở vùng đồng bằng ven biển nước ta vào mùa mưa bão?", "Bão, lũ lụt, ngập úng, sạt lở đất", "Động đất mạnh liên tục quanh năm", "Núi lửa phun trào thường xuyên", "Con người cần dự báo sớm, xây nhà an toàn, trồng rừng ngập mặn chắn sóng."],
      ["Trồng rừng ngập mặn ven biển có tác dụng gì?", "Chắn sóng, chống xói lở bờ biển, là nơi sinh sống của nhiều loài thuỷ sản", "Làm nước biển mặn hơn", "Không có tác dụng thực tế", "Rừng ngập mặn là “bức tường xanh” bảo vệ đê biển."],
      ["Vì sao cần bảo vệ nguồn nước ngọt và rừng đầu nguồn?", "Vì rừng giữ nước, chống lũ và xói mòn; nước ngọt là tài nguyên sống còn của con người", "Vì đó là việc của riêng nhà nước, dân không liên quan", "Vì rừng chỉ để ngắm cảnh", "Mọi người dân đều có trách nhiệm bảo vệ tài nguyên chung."],
      ["Ô nhiễm môi trường do con người gây ra gồm những dạng chính nào?", "Ô nhiễm không khí, ô nhiễm nước và ô nhiễm đất do chất thải sinh hoạt, công nghiệp, nông nghiệp", "Chỉ có ô nhiễm tiếng ồn trong lớp học", "Môi trường không bao giờ bị ô nhiễm", "Giảm ô nhiễm bắt đầu từ phân loại rác và xử lí chất thải đúng cách."],
      ["Siêu đô thị và đô thị hoá nhanh gây ra những vấn đề gì cần giải quyết?", "Ùn tắc giao thông, ô nhiễm, thiếu nhà ở và dịch vụ công nếu quy hoạch không theo kịp", "Không có vấn đề gì", "Làm cho nông thôn đông dân hơn", "Đô thị hoá là xu thế tất yếu cần được quy hoạch bền vững."],
      ["Câu “Sống xanh” mà học sinh hay nhắc tới nghĩa là gì?", "Lối sống thân thiện với môi trường: tiết kiệm tài nguyên, giảm rác thải nhựa, bảo vệ cây xanh", "Chỉ mặc quần áo màu xanh lá", "Sống ở vùng quê mới gọi là sống xanh", "Sống xanh bắt đầu từ những việc nhỏ mỗi ngày ở gia đình và trường học."],
      ["Hai khu vực đông dân nhất thế giới hiện nay là những khu vực nào?", "Đông Á và Nam Á", "Bắc Mỹ và châu Đại Dương", "Bắc Á và Bắc Phi", "Đông Á và Nam Á chiếm hơn một nửa dân số thế giới."],
      ["Quốc gia đông dân nhất thế giới hiện nay là nước nào?", "Ấn Độ", "Trung Quốc", "Hoa Kỳ", "Ấn Độ đã vượt Trung Quốc về dân số từ năm 2023."],
      ["Dân số Việt Nam hiện nay khoảng bao nhiêu và đứng thứ mấy thế giới?", "Hơn 100 triệu người, khoảng thứ 15 thế giới", "Khoảng 50 triệu, thứ 30", "Khoảng 200 triệu, thứ 5", "Việt Nam là một trong những nước đông dân ở châu Á."],
      ["Vùng nào ở nước ta có mật độ dân số cao nhất?", "Đồng bằng sông Hồng", "Tây Nguyên", "Trung du và miền núi phía Bắc", "Đồng bằng sông Hồng đất chật người đông, mật độ cao nhất cả nước."],
      ["Dân cư nông thôn và đô thị khác nhau chủ yếu ở điểm nào?", "Nông thôn làm nông nghiệp; đô thị làm công nghiệp, dịch vụ", "Nông thôn không có trường học", "Đô thị không có cây xanh", "Sự khác biệt về nghề nghiệp kéo theo khác biệt về lối sống."],
      ["Bùng nổ dân số gây ra những sức ép lớn nào cho xã hội?", "Sức ép về việc làm, nhà ở, y tế, giáo dục và môi trường", "Không gây sức ép gì đáng kể", "Chỉ làm tăng số học sinh giỏi", "Dân số tăng quá nhanh khiến các dịch vụ công không theo kịp."],
      ["Tỉ lệ gia tăng dân số tự nhiên phụ thuộc vào hai yếu tố nào?", "Tỉ lệ sinh và tỉ lệ tử", "Số người nhập cư vào nước", "Diện tích đất của quốc gia", "Gia tăng tự nhiên = tỉ lệ sinh trừ tỉ lệ tử trong một năm."],
      ["Chặt phá rừng đầu nguồn gây ra hậu quả trực tiếp nào vào mùa mưa?", "Lũ quét, sạt lở đất và lũ lụt nghiêm trọng ở hạ lưu", "Mưa sẽ ít đi hẳn trong cả năm", "Đất đai ngày càng màu mỡ hơn", "Rừng đầu nguồn giữ nước, giữ đất — mất rừng là tăng thiên tai."],
      ["Nhóm năng lượng nào sau đây là năng lượng sạch, tái tạo?", "Năng lượng gió và năng lượng Mặt Trời", "Than đá và dầu mỏ", "Khí đốt tự nhiên", "Năng lượng tái tạo không cạn kiệt và ít gây ô nhiễm."],
      ["Biến đổi khí hậu làm nước biển dâng đe doạ vùng nào nhất ở nước ta?", "Đồng bằng sông Cửu Long và các vùng ven biển thấp", "Vùng núi cao Tây Bắc", "Cao nguyên Tây Nguyên", "Đồng bằng thấp ven biển dễ bị ngập và nhiễm mặn khi nước biển dâng."],
      ["Để giảm rác thải nhựa, học sinh nên làm việc nào sau đây?", "Dùng túi vải, bình nước cá nhân và phân loại rác", "Đốt rác nhựa ngay tại nhà", "Vứt rác xuống sông cho trôi đi", "Giảm nhựa dùng một lần là hành động thiết thực bảo vệ môi trường."],
      ["Ngày Trái Đất (22/4) hằng năm nhằm mục đích gì?", "Kêu gọi mọi người bảo vệ môi trường và hành tinh xanh", "Kỉ niệm ngày Trái Đất được hình thành", "Là ngày nghỉ lễ trên toàn thế giới", "Ngày Trái Đất nhắc nhở trách nhiệm của mỗi người với thiên nhiên."],
      ["Sạt lở đất thường xảy ra ở địa hình nào sau những trận mưa lớn?", "Sườn núi, đồi dốc bị mất lớp cây che phủ", "Đồng bằng phẳng, rộng", "Giữa lòng sông sâu", "Đất dốc mất cây giữ đất rất dễ trượt lở khi mưa lớn."],
      ["Trồng cây gây rừng trong trường học mang lại những lợi ích gì?", "Tạo bóng mát, lọc không khí, rèn ý thức bảo vệ môi trường", "Chỉ để trang trí sân trường cho đẹp", "Không mang lại lợi ích thực tế nào", "Phong trào trồng cây ở trường gắn với lời dạy của Bác Hồ về trồng cây, trồng người."]
    ], [["Mật độ dân số", "Số dân trung bình trên 1 km²"], ["Phát triển bền vững", "Không tổn hại thế hệ mai sau"], ["Rừng ngập mặn", "Chắn sóng, bảo vệ bờ biển"], ["8 tỉ người", "Dân số thế giới (2022)"]], "Nối cho đúng nhé!");
    return { id: "dl6-c7", emoji: "👥", name: "Địa lí: Con người và thiên nhiên", sub: "Chương 7 • Dân số và phân bố dân cư • Con người – thiên nhiên • Bảo vệ tự nhiên, phát triển bền vững", pools: kp }; })()
];
/* Gắn thêm bộ sinh tỉ lệ bản đồ cho chương Bản đồ (dl6-c1) */
LSD6_TOPICS.forEach(function (t) { if (t.id === "dl6-c1") { t.pools.choose.push(m6MapScaleGen, m6MapScaleGen, m6MapScaleGen); t.pools.blank.push(function () { var s = pick([100000, 500000, 1000000]); var cm = rand(2, 8); return numBlank6("Bản đồ tỉ lệ 1 : " + fmtN(s) + ", đo được " + cm + " cm. Điền khoảng cách thực tế (km)!", "?", cm * s / 100000, "Thực tế = " + cm + " × " + fmtN(s) + " cm = " + (cm * s / 100000) + " km."); }); } });
/* ================= GIÁO DỤC CÔNG DÂN 6 — 12 bài ================= */
var GDCD6_TOPICS = [
  topic("gd6-b1", "🏠", "Tự hào về truyền thống gia đình, dòng họ", "Bài 1 • Truyền thống tốt đẹp • Giữ gìn và phát huy", [
    ["Truyền thống của gia đình, dòng họ là gì?", "Là những giá trị, phong tục, nếp sống tốt đẹp được các thế hệ trong gia đình, dòng họ tạo dựng và truyền lại", "Là số tiền của gia đình để lại", "Là ngôi nhà cũ của ông bà", "Ví dụ: truyền thống hiếu học, làm nghề thủ công, yêu thương đùm bọc..."],
    ["Gia đình bạn Lan có truyền thống hiếu học, nhiều thế hệ đều học giỏi. Lan nên làm gì để phát huy truyền thống đó?", "Chăm chỉ học tập, chia sẻ với em nhỏ tinh thần ham học của gia đình", "Không cần học vì gia đình đã nổi tiếng", "Chỉ khoe khoang với bạn bè", "Tự hào phải đi đôi với hành động tiếp nối truyền thống."],
    ["Hành động nào thể hiện biết ƠN và giữ gìn truyền thống dòng họ?", "Thăm hỏi, chăm sóc ông bà; tham gia giỗ họ; tìm hiểu lịch sử dòng họ", "Chỉ nghĩ đến bản thân mình", "Quên hết nguồn gốc gia đình", "“Uống nước nhớ nguồn” là đạo lí của dân tộc."],
    ["Truyền thống nào sau đây là truyền thống TỐT ĐẸP cần phát huy?", "Truyền thống yêu nước, hiếu học, nhân ái, đoàn kết giúp đỡ nhau", "Truyền thống mê tín dị đoan, cờ bạc", "Truyền thống coi thường người khác", "Cần biết chọn lọc: phát huy truyền thống tốt, xoá bỏ hủ tục lạc hậu."],
    ["Bạn Hùng cho rằng “truyền thống là chuyện xưa cũ, không cần quan tâm”. Em có đồng ý không?", "Không đồng ý: truyền thống tốt đẹp là cội nguồn sức mạnh tinh thần, cần trân trọng và tiếp nối", "Đồng ý hoàn toàn", "Tuỳ từng lúc mới quan tâm", "Người không nhớ nguồn cội sẽ khó trưởng thành vững vàng."],
    ["Vào ngày giỗ tổ tiên, việc làm nào là phù hợp với học sinh?", "Phụ giúp gia đình chuẩn bị, thắp hương tưởng nhớ, nghe ông bà kể chuyện dòng họ", "Bỏ đi chơi cả ngày không giúp gì", "Chê bai phong tục của gia đình", "Giỗ họ là dịp gắn kết các thế hệ và nhớ ơn tổ tiên."],
    ["Gia đình em có nghề truyền thống làm gốm đang mai một. Là học sinh, em có thể làm gì?", "Tìm hiểu, tự hào giới thiệu nghề gốm của gia đình; sau này có thể học hỏi để góp phần gìn giữ", "Chê nghề của gia đình là lạc hậu", "Giấu bạn bè về nghề của gia đình", "Nhiều nghề truyền thống là di sản văn hoá quý của quê hương."],
    ["Câu tục ngữ nào nói về đạo lí nhớ ơn nguồn cội?", "“Uống nước nhớ nguồn”", "“Ăn cây nào rào cây ấy” (nói về sự biết điều, cũng gần nghĩa)", "“Trời sinh voi, trời sinh cỏ”", "“Uống nước nhớ nguồn” là câu tục ngữ tiêu biểu về lòng biết ơn."],
    ["Tự hào về truyền thống gia đình khác với khoe khoang, tự kiêu ở điểm nào?", "Tự hào lành mạnh là trân trọng giá trị tốt đẹp và nỗ lực xứng đáng với truyền thống; khoe khoang chỉ để hơn thua với người khác", "Hai thái độ hoàn toàn giống nhau", "Tự hào là phải nói thật to mọi lúc", "Tự hào đi với khiêm tốn và hành động cụ thể mới đáng quý."],
    ["Khi bạn bè chê cười truyền thống của gia đình bạn khác, em nên làm gì?", "Không hùa theo; tôn trọng sự khác biệt của mỗi gia đình, dòng họ", "Cười theo cho vui", "Kể lại cho nhiều người cùng chê", "Mỗi gia đình có truyền thống riêng cần được tôn trọng."],
    ["Việc làm nào giúp em tìm hiểu về truyền thống gia đình mình?", "Hỏi chuyện ông bà, cha mẹ; xem gia phả, ảnh cũ; tham gia các ngày lễ của họ tộc", "Tự nghĩ ra một truyền thống cho hay", "Không cần tìm hiểu gì cả", "Ông bà là “cuốn sách sống” về lịch sử gia đình."],
    ["Truyền thống tốt đẹp của DÂN TỘC Việt Nam được nhắc nhiều nhất là gì?", "Truyền thống yêu nước, đoàn kết, nhân ái, cần cù, hiếu học", "Truyền thống chia rẽ, ích kỉ", "Không có truyền thống nào", "Truyền thống dân tộc là niềm tự hào chung của mọi người Việt Nam."],
    ["Em hiểu câu “Giấy rách phải giữ lấy lề” thế nào trong việc giữ truyền thống?", "Dù hoàn cảnh khó khăn đến đâu cũng phải giữ gìn nề nếp, phẩm giá tốt đẹp của gia đình, dòng họ", "Phải giữ lại mọi tờ giấy cũ", "Chỉ cần giữ bìa sách cho đẹp", "Câu tục ngữ dạy giữ gìn nền nếp gia phong trong mọi hoàn cảnh."],
    ["“Gia phong” có nghĩa là gì?", "Nề nếp, quy tắc ứng xử tốt đẹp trong gia đình", "Toàn bộ đồ đạc trong nhà", "Phong cảnh quanh ngôi nhà", "Giữ gìn gia phong là giữ nề nếp tốt đẹp của gia đình."],
    ["Tổ nghề được thờ cúng ở các làng nghề truyền thống là ai?", "Người sáng lập và truyền dạy nghề cho dân làng", "Vị vua đầu tiên của nước ta", "Người giàu nhất trong làng", "Thờ tổ nghề thể hiện lòng biết ơn người đã truyền nghề."],
    ["Ngày giỗ trong gia đình còn có ý nghĩa nào ngoài tưởng nhớ người đã khuất?", "Là dịp sum họp, gắn kết các thế hệ trong họ tộc", "Là dịp để khoe của cải", "Là ngày để tranh giành tài sản", "Giỗ là nét văn hoá gắn kết dòng họ của người Việt."],
    ["Câu tục ngữ “Con hơn cha là nhà có phúc” thể hiện mong muốn gì?", "Thế hệ sau tiến bộ, giỏi giang hơn thế hệ trước", "Con được quyền cãi lại cha mẹ", "Cha mẹ không cần dạy dỗ con", "Đó là niềm mong mỏi con cháu phát huy và vượt lên truyền thống gia đình."],
    ["Truyền thống “tôn sư trọng đạo” là truyền thống của ai?", "Của dân tộc Việt Nam về lòng tôn trọng thầy dạy", "Chỉ của riêng một gia đình", "Chỉ của học sinh giỏi", "Tôn sư trọng đạo là truyền thống tốt đẹp lâu đời của dân tộc."],
    ["Gia phả là gì?", "Sách ghi chép các thế hệ, huyết thống của một dòng họ", "Sách dạy nấu ăn thời xưa", "Danh sách tài sản của dòng họ", "Gia phả giúp con cháu biết nguồn gốc, thứ bậc trong họ tộc."],
    ["Hủ tục lạc hậu khác truyền thống tốt đẹp ở điểm nào?", "Hủ tục lỗi thời, gây hại; truyền thống tốt thì nhân văn", "Hủ tục mới là thứ cần giữ gìn nhất", "Hai khái niệm hoàn toàn giống nhau", "Cần phát huy truyền thống tốt đẹp và xoá bỏ hủ tục lạc hậu."],
    ["Việc lớp em thăm, tặng quà gia đình thương binh nhân ngày 27/7 thể hiện truyền thống nào?", "“Uống nước nhớ nguồn”, đền ơn đáp nghĩa", "Truyền thống hiếu học", "Truyền thống làm nghề thủ công", "Đền ơn đáp nghĩa là truyền thống quý báu của dân tộc ta."],
    ["Khi một phong tục của gia đình trái với quy định pháp luật, em nên làm gì?", "Tuân thủ pháp luật và khéo léo khuyên gia đình điều chỉnh", "Cứ làm theo gia đình, bỏ qua pháp luật", "Mặc kệ, không quan tâm đến cả hai", "Truyền thống chỉ được giữ khi phù hợp với pháp luật và đạo lí tiến bộ."],
    ["Hành động nào của học sinh góp phần giữ nghề truyền thống của quê hương?", "Tìm hiểu nghề, giới thiệu với bạn bè, trải nghiệm làm nghề", "Chê nghề thủ công là quê mùa", "Giấu bạn bè về nghề của quê mình", "Nhiều làng nghề được giữ gìn nhờ lớp trẻ biết trân trọng."]
  ], [["Hiếu học", "Truyền thống học tập"], ["Uống nước nhớ nguồn", "Biết ơn tổ tiên"], ["Giỗ họ", "Dịp tưởng nhớ, gắn kết dòng họ"], ["Yêu nước", "Truyền thống của dân tộc"]], "Nối cho đúng nhé!"),
  topic("gd6-b2", "❤️", "Yêu thương con người", "Bài 2 • Tình yêu thương • Quan tâm, giúp đỡ • Tấm lòng nhân ái", [
    ["Yêu thương con người là gì?", "Là biết quan tâm, chia sẻ, giúp đỡ người khác, nhất là người gặp khó khăn, hoạn nạn", "Chỉ yêu thương người thân trong nhà", "Yêu thương là phải cho tiền mọi người gặp trên đường", "Yêu thương con người là truyền thống quý báu của dân tộc ta."],
    ["Nhìn thấy bạn cùng lớp bị ốm phải nghỉ học dài ngày, việc làm nào thể hiện yêu thương bạn?", "Đến thăm hỏi, chép bài giúp bạn, động viên bạn mau khoẻ", "Mặc kệ vì không liên quan đến mình", "Trêu chọc bạn là yếu ớt", "Quan tâm bạn bè lúc khó khăn là biểu hiện cụ thể của tình yêu thương."],
    ["Câu ca dao “Bầu ơi thương lấy bí cùng / Tuy rằng khác giống nhưng chung một giàn” dạy ta điều gì?", "Dạy tình đoàn kết, yêu thương, đùm bọc lẫn nhau giữa những người cùng cộng đồng, dân tộc", "Dạy cách trồng bầu và bí", "Dạy không nên trồng hai loại cây cùng nhau", "Hình ảnh bầu và bí chung giàn tượng trưng cho đồng bào cùng một nước."],
    ["Trường em phát động quyên góp ủng hộ đồng bào vùng lũ. Thái độ nào là đúng?", "Tích cực tham gia trong khả năng của mình (quần áo, sách vở, tiền tiết kiệm...)", "Không tham gia vì nhà mình không bị lũ", "Chỉ tham gia nếu được lên báo khen", "“Lá lành đùm lá rách” — giúp đỡ người hoạn nạn là việc nên làm."],
    ["Em gặp một cụ già xách nặng qua đường. Em nên làm gì?", "Đến giúp cụ xách đồ và dìu cụ qua đường an toàn", "Đi qua như không thấy", "Chụp ảnh đăng mạng rồi bỏ đi", "Giúp đỡ người già là biểu hiện của lòng nhân ái và lễ phép."],
    ["Yêu thương con người cần tránh biểu hiện nào sau đây?", "Vô cảm, thờ ơ trước nỗi đau của người khác; giúp người vì vụ lợi, để được khen", "Giúp đỡ bạn bè trong học tập", "Thăm hỏi người ốm", "Yêu thương chân thành xuất phát từ tấm lòng, không vì hư danh."],
    ["Bạn lớp em có hoàn cảnh khó khăn, hay mặc cảm, ít nói. Em nên ứng xử thế nào?", "Gần gũi, chân thành kết bạn, giúp đỡ bạn một cách tế nhị, tôn trọng bạn", "Xa lánh bạn cho khỏi phiền", "Đem hoàn cảnh của bạn ra kể cho cả lớp nghe", "Giúp đỡ cần tế nhị để bạn không bị tổn thương lòng tự trọng."],
    ["Hành động nào sau đây thể hiện yêu thương con người trong đời sống hằng ngày ở trường?", "Nhường ghế cho bạn bị đau chân, chia sẻ đồ dùng học tập với bạn quên mang", "Giấu vở bài tập để bạn không chép kịp", "Nói xấu bạn sau lưng", "Yêu thương thể hiện từ những việc nhỏ nhất mỗi ngày."],
    ["“Thương người như thể thương thân” khuyên ta điều gì?", "Hãy yêu thương, đối xử với người khác như yêu chính bản thân mình", "Chỉ thương mình là đủ", "Thương người khác hơn cả bản thân trong mọi trường hợp", "Câu tục ngữ nhấn mạnh sự đồng cảm giữa người với người."],
    ["Khi thấy bạn bị một nhóm bạn khác bắt nạt, việc làm đúng là gì?", "Đứng về phía bạn bị hại, khuyên ngăn và báo với thầy cô giáo", "Đứng xem và cười", "Quay video đăng lên mạng cho vui", "Bênh vực người yếu thế là dũng cảm và nhân ái."],
    ["Chiến dịch “Mùa đông ấm” tặng áo ấm cho trẻ em vùng cao là hoạt động thể hiện điều gì?", "Tinh thần tương thân tương ái, lá lành đùm lá rách của cộng đồng", "Hoạt động quảng cáo bán hàng", "Việc làm chỉ của người lớn, trẻ em không cần biết", "Nhiều hoạt động thiện nguyện xuất phát từ lòng yêu thương con người."],
    ["Yêu thương con người có mâu thuẫn với việc nghiêm khắc chỉ ra lỗi sai của bạn không?", "Không: góp ý chân thành, đúng lúc để bạn tiến bộ cũng là một cách yêu thương", "Có: yêu thương là phải chiều theo mọi ý của bạn", "Yêu thương thì không bao giờ được phê bình ai", "Yêu thương đúng cách giúp người khác tốt lên, không bao che cái sai."],
    ["Tình yêu thương con người bắt đầu từ đâu gần gũi nhất?", "Từ gia đình: yêu thương ông bà, cha mẹ, anh chị em, rồi mở rộng ra bạn bè, cộng đồng", "Từ những người nổi tiếng trên mạng", "Từ người nước ngoài xa lạ", "Yêu thương lan toả từ những người thân yêu nhất quanh ta."]
  ], [["Lá lành đùm lá rách", "Giúp đỡ người khó khăn"], ["Bầu ơi thương lấy bí cùng", "Đoàn kết, đùm bọc"], ["Thương người như thể thương thân", "Đồng cảm, yêu thương"], ["Tương thân tương ái", "Hỗ trợ lẫn nhau"]], "Nối câu nói với ý nghĩa nhé!"),
  topic("gd6-b3", "🐜", "Siêng năng, kiên trì", "Bài 3 • Lao động và học tập • Vượt khó • Không bỏ cuộc", [
    ["Siêng năng là gì?", "Là chăm chỉ, cần cù làm việc và học tập một cách thường xuyên, không ngại khó", "Là làm việc thật nhanh trong một ngày rồi nghỉ hẳn", "Là chỉ học khi sắp kiểm tra", "Siêng năng thể hiện ở sự đều đặn, bền bỉ mỗi ngày."],
    ["Kiên trì là gì?", "Là quyết tâm làm đến cùng một việc đã đặt ra, dù gặp khó khăn cũng không bỏ cuộc", "Là làm đi làm lại một việc sai mà không sửa", "Là chờ người khác làm giúp", "“Có công mài sắt, có ngày nên kim” — kiên trì dẫn đến thành công."],
    ["Bạn Nam học Toán chưa giỏi nhưng ngày nào cũng dành 30 phút luyện bài tập. Sau một học kì, điểm Toán của Nam tiến bộ rõ rệt. Điều đó cho thấy điều gì?", "Siêng năng, kiên trì giúp ta tiến bộ và đạt kết quả tốt", "Nam gặp may mắn ngẫu nhiên", "Luyện tập hằng ngày không có tác dụng gì", "Thành quả là kết quả của quá trình rèn luyện bền bỉ."],
    ["Biểu hiện nào sau đây là THIẾU siêng năng, kiên trì?", "Học bài chỉ khi có kiểm tra; gặp bài khó là bỏ qua ngay, chờ chép bài bạn", "Lập thời gian biểu học tập và thực hiện nghiêm túc", "Tự giác làm bài tập về nhà đầy đủ", "Thiếu siêng năng dẫn đến kết quả học tập sa sút."],
    ["Câu tục ngữ “Có công mài sắt, có ngày nên kim” khuyên ta điều gì?", "Khuyên phải kiên trì, chịu khó rèn luyện thì việc khó mấy cũng thành công", "Khuyên đi mài sắt để bán", "Khuyên làm việc gì cũng phải thật nhanh", "Hình ảnh mài thỏi sắt thành cây kim nhỏ thể hiện sức mạnh của sự kiên trì."],
    ["Em đặt mục tiêu học thuộc 5 từ tiếng Anh mỗi ngày. Tuần đầu rất hào hứng, tuần sau bắt đầu lười. Cách làm nào giúp em kiên trì?", "Giữ thói quen cố định (học vào một giờ nhất định), ghi lại tiến bộ và tự thưởng khi đạt mục tiêu tuần", "Bỏ mục tiêu vì thấy chán", "Học dồn 35 từ vào cuối tuần cho xong", "Chia nhỏ mục tiêu và duy trì đều đặn là bí quyết của kiên trì."],
    ["Siêng năng trong lao động ở tuổi học sinh thể hiện qua việc nào?", "Tự giác giúp gia đình việc nhà phù hợp sức mình, giữ gìn đồ dùng, không ỷ lại", "Để bố mẹ làm hết mọi việc", "Chỉ lao động khi được trả tiền công", "Lao động giúp ta quý trọng thành quả và rèn tính tự lập."],
    ["Vì sao nói lười biếng là “kẻ thù” của thành công?", "Vì lười biếng khiến ta bỏ dở công việc, mất cơ hội học hỏi và không đạt được mục tiêu", "Vì người lười thường rất khoẻ mạnh", "Lười biếng không ảnh hưởng gì đến ai", "Mọi thành công đều cần quá trình lao động nghiêm túc."],
    ["Một vận động viên muốn đạt huy chương phải rèn luyện thế nào?", "Tập luyện đều đặn, khoa học trong thời gian dài, vượt qua mệt mỏi và chấn thương nhỏ", "Chỉ tập một tuần trước khi thi", "Không cần tập, chỉ cần may mắn", "Thành tích thể thao là kết quả của siêng năng và ý chí."],
    ["Khi gặp một bài toán rất khó, thái độ nào là kiên trì đúng cách?", "Suy nghĩ, thử nhiều cách giải, hỏi thầy cô/bạn bè để hiểu — chứ không chép đáp án vội", "Bỏ luôn và không bao giờ nhìn lại bài đó", "Chép ngay đáp án của bạn cho xong", "Kiên trì gắn với tìm tòi cách giải quyết, không phải cố chấp vô ích."],
    ["Câu nói nào sau đây thể hiện tinh thần siêng năng, kiên trì?", "“Việc học như con thuyền ngược nước, không tiến ắt lùi — phải cố gắng mỗi ngày.”", "“Để mai tính.”", "“Khó quá thì thôi.”", "Tinh thần học tập bền bỉ được nhiều danh nhân coi là chìa khoá thành công."],
    ["Để rèn luyện tính siêng năng, học sinh nên bắt đầu từ đâu?", "Từ những việc nhỏ hằng ngày: dậy đúng giờ, làm bài tập đầy đủ, sắp xếp góc học tập gọn gàng", "Từ những việc thật lớn lao, khó khăn", "Chờ đến khi trưởng thành mới rèn", "Thói quen tốt được xây dựng từ việc nhỏ, lặp lại mỗi ngày."],
    ["Kết quả của siêng năng, kiên trì trong học tập là gì?", "Kiến thức vững chắc, kĩ năng thành thạo và sự tự tin vào bản thân", "Chỉ mệt mỏi mà không được gì", "Bị bạn bè chê cười", "Người siêng năng, kiên trì thường đạt mục tiêu và được mọi người tin tưởng."],
    ["Câu nói “Thiên tài là 1% cảm hứng và 99% mồ hôi” của nhà phát minh Edison nhấn mạnh điều gì?", "Thành công chủ yếu nhờ lao động siêng năng, bền bỉ", "Chỉ cần thông minh bẩm sinh là đủ", "May mắn quyết định gần như tất cả", "Cảm hứng chỉ là phần rất nhỏ so với công sức rèn luyện."],
    ["Để học một kĩ năng mới như đàn, bơi hay vẽ, cách học nào thể hiện sự siêng năng?", "Luyện tập đều đặn mỗi ngày một ít, không bỏ giữa chừng", "Học cấp tốc một đêm trước ngày kiểm tra", "Chỉ xem người khác làm, không thực hành", "Kĩ năng được hình thành nhờ luyện tập thường xuyên."],
    ["Câu nói “Việc hôm nay chớ để ngày mai” nhắc nhở chúng ta điều gì?", "Không trì hoãn, làm ngay việc cần làm hôm nay", "Làm việc qua loa cho xong chuyện", "Để dành hết việc cho người khác làm", "Trì hoãn là thói quen xấu làm việc học dồn ứ, kém hiệu quả."],
    ["Khi một công việc lặp lại gây nhàm chán, người kiên trì sẽ ứng xử thế nào?", "Tìm ý nghĩa của việc đó và giữ kỉ luật để hoàn thành", "Bỏ ngay khi vừa thấy chán", "Làm cho có lệ, sai cũng mặc kệ", "Kiên trì là vượt qua cảm xúc nhất thời bằng mục tiêu đã đặt."],
    ["Siêng năng khác với “làm hùng hục” không kế hoạch ở điểm nào?", "Siêng năng đều đặn, có kế hoạch và mục tiêu rõ ràng", "Hai cách làm hoàn toàn giống nhau", "Càng làm bừa không tính toán càng tốt", "Siêng năng gắn với sự chủ động sắp xếp công việc hợp lí."],
    ["Học sinh siêng năng thường chuẩn bị cho bài học mới như thế nào?", "Đọc trước bài, ghi lại chỗ chưa hiểu để hỏi thầy cô", "Không bao giờ xem trước bài học", "Chỉ đọc bài khi bị kiểm tra miệng", "Chuẩn bị trước giúp tiếp thu bài trên lớp nhanh và sâu hơn."],
    ["Câu nói nào sau đây khuyên người ta bền chí khi gặp thất bại?", "“Thất bại là mẹ thành công”", "“Ăn no ngủ kĩ cho khoẻ”", "“Được ăn cả, ngã về không”", "Câu nói khuyên ta rút bài học từ thất bại để tiếp tục cố gắng."],
    ["Khi tuần học bận rộn, cách xử lí nào giúp em không bỏ dở kế hoạch đã lập?", "Điều chỉnh kế hoạch cho phù hợp chứ không huỷ bỏ hoàn toàn", "Huỷ mọi kế hoạch đã lập từ đầu", "Thức trắng đêm để học bù tất cả", "Kiên trì linh hoạt tốt hơn bỏ cuộc hoặc cố quá sức."],
    ["Kiên trì có đồng nghĩa với cố chấp làm mãi theo một cách sai không?", "Không: bền chí với mục tiêu, nhưng biết sửa cách làm sai", "Có: cứ một cách làm đến cùng là đúng", "Kiên trì là không bao giờ thay đổi điều gì", "Bền bỉ với mục tiêu và linh hoạt về cách làm mới là kiên trì đúng."],
    ["Thành ngữ “mưa dầm thấm lâu” gợi cho ta bài học gì?", "Làm đều đặn, bền bỉ lâu ngày sẽ mang lại kết quả", "Trời mưa lâu thì đất sẽ ướt", "Làm việc gì cũng phải thật ồn ào", "Hình ảnh mưa dầm nói về sức mạnh của sự bền bỉ theo thời gian."]
  ], [["Có công mài sắt, có ngày nên kim", "Kiên trì sẽ thành công"], ["Siêng năng", "Chăm chỉ, đều đặn"], ["Kiên trì", "Quyết tâm đến cùng"], ["Lười biếng", "Trái ngược với siêng năng"]], "Nối cho đúng nhé!"),
  topic("gd6-b4", "⚖️", "Tôn trọng sự thật", "Bài 4 • Trung thực • Tôn trọng lẽ thật • Không gian dối", [
    ["Tôn trọng sự thật là gì?", "Là nhận thức đúng, nói và làm đúng với những gì đã xảy ra, không xuyên tạc, bịa đặt", "Là nói những điều người khác muốn nghe", "Là giấu kín mọi sự thật", "Tôn trọng sự thật gắn liền với đức tính trung thực."],
    ["Em vô tình làm vỡ lọ hoa của lớp. Thái độ đúng là gì?", "Nhận lỗi với cô giáo và các bạn, xin lỗi và tìm cách khắc phục (dọn dẹp, đền lại nếu có thể)", "Đổ lỗi cho bạn ngồi cạnh", "Im lặng coi như không biết", "Dám nhận lỗi là biểu hiện của tôn trọng sự thật và dũng cảm."],
    ["Vì sao không nên gian lận trong kiểm tra?", "Vì điểm số gian lận không phản ánh đúng năng lực, làm mất lòng tin và vi phạm kỉ luật", "Vì gian lận rất dễ bị phát hiện nên không đáng", "Gian lận chỉ xấu nếu bị bắt gặp", "Học tập trung thực mới giúp ta tiến bộ thật sự."],
    ["Bạn thân của em làm sai và nhờ em nói dối thầy cô để bao che. Em nên làm gì?", "Từ chối nói dối; khuyên bạn tự nhận lỗi — giúp bạn đối diện sự thật mới là giúp bạn thật sự", "Nói dối giúp bạn vì tình bạn", "Kể với cả lớp để bạn bị phạt nặng hơn", "Bao che bằng nói dối làm bạn càng trượt dài trong sai lầm."],
    ["Tôn trọng sự thật trong giao tiếp trên mạng có nghĩa là gì?", "Không đăng tin giả, không chia sẻ thông tin chưa kiểm chứng, không bịa chuyện về người khác", "Chia sẻ mọi tin “nóng” càng nhanh càng tốt", "Viết bài thật giật gân dù không đúng sự thật", "Tin giả gây hại cho cá nhân và xã hội; cần kiểm chứng trước khi chia sẻ."],
    ["Khi nghe một tin đồn về bạn trong lớp, em nên làm gì trước tiên?", "Tìm hiểu sự thật từ người liên quan đáng tin cậy, không vội tin và lan truyền tin đồn", "Kể ngay cho mọi người cùng biết", "Thêm thắt chi tiết cho câu chuyện hay hơn", "Người tôn trọng sự thật luôn cẩn trọng với thông tin chưa rõ nguồn."],
    ["Câu thành ngữ “Cây ngay không sợ chết đứng” có ý nghĩa gì?", "Người ngay thẳng, trung thực thì không sợ điều tiếng, thị phi", "Cây thẳng thì dễ bị đốn trước", "Người thật thà luôn gặp rắc rối", "Sự thật và sự ngay thẳng là chỗ dựa vững chắc của con người."],
    ["Em nhặt được tiền rơi trong sân trường. Hành động nào đúng với tôn trọng sự thật và trung thực?", "Đem nộp cho thầy cô/thầy giám thị để trả lại người mất", "Giữ lại tiêu vì “của rơi là của mình”", "Chia cho bạn bè cùng tiêu", "“Nhặt được của rơi, trả lại người mất” là đức tính tốt của người Việt."],
    ["Nói dối nhiều lần sẽ dẫn đến hậu quả gì thường thấy?", "Mất uy tín, không còn ai tin tưởng; phải nói thêm nhiều lời dối khác để che giấu", "Được mọi người quý mến hơn", "Không có hậu quả gì nếu khéo léo", "“Một lần bất tín, vạn lần bất tin”."],
    ["Trong học tập, tôn trọng sự thật thể hiện ở việc nào?", "Tự làm bài, ghi chép đúng kết quả thí nghiệm dù kết quả không như mong đợi", "Sửa số liệu cho bài báo cáo đẹp hơn", "Chép bài bạn và nói là của mình", "Nhà khoa học trung thực với số liệu là nền tảng của khoa học."],
    ["Khi em nói sai một thông tin trước lớp, cách xử lí nào là tôn trọng sự thật?", "Chủ động đính chính, xin lỗi vì thông tin chưa chính xác", "Lờ đi như không có chuyện gì", "Đổ cho người khác đã nói với em như vậy", "Đính chính kịp thời thể hiện trách nhiệm với lời nói của mình."],
    ["Vì sao xã hội cần những người tôn trọng sự thật?", "Vì sự thật là nền tảng của công lí, lòng tin và sự phát triển lành mạnh của xã hội", "Vì người nói thật luôn được việc ngay lập tức", "Không có lí do cụ thể", "Mọi quan hệ tốt đẹp đều xây trên sự tin cậy lẫn nhau."],
    ["Em chứng kiến bạn bị hiểu lầm là lấy trộm đồ của bạn khác dù em biết sự thật khác. Em nên làm gì?", "Can đảm nói rõ sự thật em biết với thầy cô để minh oan cho bạn", "Im lặng để tránh phiền phức cho mình", "Hùa theo số đông kết tội bạn", "Đứng ra vì sự thật là bảo vệ công lí và bạn bè."]
  ], [["Trung thực", "Nói và làm đúng sự thật"], ["Một lần bất tín, vạn lần bất tin", "Mất lòng tin vì nói dối"], ["Tin giả", "Thông tin sai sự thật lan truyền"], ["Cây ngay không sợ chết đứng", "Người ngay thẳng không sợ thị phi"]], "Nối cho đúng nhé!"),
  topic("gd6-b5", "🧭", "Tự lập", "Bài 5 • Tự giác làm việc của mình • Không ỷ lại • Rèn luyện tính tự lập", [
    ["Tự lập là gì?", "Là tự làm lấy những việc thuộc về mình, không dựa dẫm, ỷ lại vào người khác", "Là không bao giờ nhờ ai giúp đỡ bất cứ việc gì", "Là sống tách biệt khỏi mọi người", "Tự lập khác với cố chấp không nhận sự giúp đỡ cần thiết."],
    ["Biểu hiện nào sau đây là tự lập ở học sinh?", "Tự chuẩn bị sách vở, quần áo cho ngày học mới; tự giác làm bài tập", "Để mẹ soạn cặp sách, bố gọi dậy mỗi sáng", "Chờ bạn nhắc mới làm bài tập", "Việc nhỏ tự làm được thì không nên nhờ người khác làm thay."],
    ["Bạn Lan nhà có điều kiện, mọi việc đều có người giúp việc làm, Lan không biết tự gấp quần áo, dọn phòng. Theo em, điều này có hại gì lâu dài?", "Lan sẽ thiếu kĩ năng sống, khó thích nghi khi phải sống xa gia đình hoặc gặp hoàn cảnh phải tự lo liệu", "Không có hại gì vì nhà Lan giàu", "Lan sẽ càng được mọi người phục vụ tốt hơn", "Tự lập là kĩ năng cần được rèn từ sớm, không phụ thuộc vào điều kiện giàu nghèo."],
    ["Khi gặp bài tập khó, hành vi nào thể hiện tự lập đúng cách?", "Tự suy nghĩ, tra cứu tài liệu trước; sau khi cố gắng hết sức mới hỏi thầy cô, bạn bè để hiểu sâu hơn", "Chờ bạn làm xong rồi chép ngay từ đầu", "Bỏ trống bài đó luôn", "Tự lập không có nghĩa là không được hỏi — mà là cố gắng trước, không ỷ lại."],
    ["Tự lập trong sinh hoạt hằng ngày gồm những việc nào phù hợp với học sinh lớp 6?", "Tự vệ sinh cá nhân, dọn dẹp góc học tập, sắp xếp thời gian học – chơi, chuẩn bị đồ dùng học tập", "Tự kiếm tiền nuôi cả gia đình", "Tự sửa chữa điện trong nhà", "Việc tự lập phải phù hợp với lứa tuổi và khả năng của em."],
    ["Vì sao cha mẹ nên tập cho con tự lập thay vì làm thay mọi việc?", "Vì làm thay hết khiến con thiếu kĩ năng, thụ động và khó trưởng thành; hướng dẫn để con tự làm mới là yêu thương đúng cách", "Vì cha mẹ bận việc công ty", "Không có lí do gì, làm thay cho nhanh", "“Cho con cái cần câu hơn cho con cá” — dạy con tự lập là món quà lâu dài."],
    ["Câu ca dao “Cha mẹ cho bạc cho vàng / Không bằng cho một nghề... ” (tinh thần chung) nhấn mạnh điều gì?", "Nhấn mạnh việc trang bị khả năng, nghề nghiệp để con tự lập sống, quý hơn cho của cải vật chất", "Khuyên không cần tiền bạc gì hết", "Chê bai cha mẹ cho con tiền", "Khả năng tự lập mới là “của cải” bền vững nhất."],
    ["Em đi học về trời mưa, đường ngập. Thái độ tự lập phù hợp là gì?", "Chủ động tìm cách an toàn: đợi nước rút, đi đường khác an toàn, liên hệ bố mẹ khi cần — không hoảng loạn chờ người đến cứu mọi việc nhỏ", "Đứng khóc giữa đường và chờ đợi", "Lội qua chỗ ngập sâu nguy hiểm cho nhanh", "Tự lập đi kèm với biết xử lí tình huống an toàn, không mạo hiểm."],
    ["Tự lập có mâu thuẫn với tinh thần đoàn kết, giúp đỡ lẫn nhau không?", "Không: người tự lập vẫn giúp người khác và biết nhờ giúp đỡ khi thật sự cần, trong khả năng phù hợp", "Có: tự lập là không quan hệ với ai", "Đoàn kết là phải làm thay nhau mọi việc", "Tự lập và tương trợ bổ sung cho nhau trong cuộc sống cộng đồng."],
    ["Để rèn tính tự lập, em nên bắt đầu bằng kế hoạch nào?", "Lập danh sách việc của mình mỗi ngày và tự chịu trách nhiệm hoàn thành, giảm dần sự nhắc nhở của người khác", "Đợi lớn lên tự khắc sẽ tự lập", "Làm mọi việc cùng lúc cho xong nhanh", "Thói quen tự lập được xây dần từ việc nhỏ mỗi ngày."],
    ["Người tự lập thường có phẩm chất đi kèm nào?", "Chủ động, có trách nhiệm, tự tin vào khả năng của bản thân", "Thụ động, hay phàn nàn", "Luôn đổ lỗi cho hoàn cảnh", "Tự lập giúp con người trưởng thành và được tin tưởng giao việc."],
    ["Hành vi nào KHÔNG phải là tự lập?", "Nhờ bạn làm hộ bài tập mỗi ngày và coi đó là chuyện bình thường", "Tự giặt đôi tất của mình", "Tự chuẩn bị bữa sáng đơn giản khi bố mẹ đi làm sớm", "Ỷ lại thường xuyên vào người khác là trái ngược với tự lập."],
    ["Khi tham gia cắm trại với lớp, biểu hiện tự lập của em là gì?", "Tự mang vác đồ của mình, tự dọn chỗ ngủ, tham gia phân công việc nhóm mà không đùn đẩy", "Để các bạn làm hết, mình chỉ chơi", "Đòi thầy cô phục vụ từng việc nhỏ", "Hoạt động tập thể là dịp tốt để rèn tự lập và tinh thần trách nhiệm."],
    ["Tự lập trong học tập thể hiện rõ nhất ở việc nào?", "Tự giác học bài, làm bài tập đúng hạn không cần nhắc nhở", "Đợi bố mẹ kiểm tra mới bắt đầu học", "Sao chép bài của bạn mỗi ngày", "Tự giác là biểu hiện đầu tiên của tự lập trong học tập."],
    ["Em phát hiện mình quên mang bút. Thái độ tự lập phù hợp là gì?", "Mượn bạn hoặc dùng bút dự phòng, lần sau tự kiểm tra đồ dùng", "Ngồi không viết bài suốt cả tiết", "Đổ lỗi cho mẹ vì không nhắc mình", "Tự lập là tự xử lí vấn đề của mình trước khi than phiền."],
    ["Việc tự giặt những đồ nhỏ của mình (tất, khăn) giúp em điều gì?", "Rèn kĩ năng tự phục vụ, bớt phụ thuộc vào người khác", "Không giúp ích được điều gì", "Chỉ làm tốn thời gian học tập", "Việc nhỏ tự làm được là nền tảng của tự lập."],
    ["Khi bố mẹ đi công tác vài ngày, học sinh tự lập cần làm gì?", "Giữ nề nếp sinh hoạt, học tập và biết nhờ người thân khi cần", "Bỏ học ở nhà chơi điện tử cả ngày", "Hoảng loạn, không làm được việc gì", "Tự lập giúp em vững vàng khi không có bố mẹ bên cạnh."],
    ["Thành ngữ “tự lực cánh sinh” có nghĩa là gì?", "Dựa vào sức của chính mình để sống và làm việc", "Sống một mình tách biệt mọi người", "Không cần học hành gì cả", "Tự lực cánh sinh là cách nói khác của tinh thần tự lập."],
    ["Để quản lí tốt tiền tiêu vặt, em nên làm gì?", "Ghi chép chi tiêu, ưu tiên thứ cần thiết, để dành một phần", "Tiêu hết ngay khi vừa có tiền", "Vay thêm tiền của bạn để tiêu xài", "Quản lí tiền là một kĩ năng tự lập quan trọng."],
    ["Khi ở nhà một mình, em cần nhớ quy tắc an toàn nào?", "Không mở cửa cho người lạ; nhớ số điện thoại bố mẹ, hàng xóm", "Mời người lạ vào nhà chơi cùng", "Tắt hết điện thoại để được yên tĩnh", "Tự lập luôn đi kèm với biết tự bảo vệ mình."],
    ["Bạn A luôn chờ mẹ nhắc mới tắm rửa, ăn cơm, học bài. Bạn A đang thiếu điều gì?", "Tính tự giác và tự lập trong sinh hoạt", "Thiếu tiền tiêu vặt", "Thiếu bạn bè thân thiết", "Thụ động chờ nhắc là biểu hiện của ỷ lại."],
    ["Tự lập từ nhỏ giúp học sinh chuẩn bị tốt cho điều gì trong tương lai?", "Cuộc sống xa gia đình khi học lên cao hoặc đi làm", "Để không bao giờ cần đến ai nữa", "Để bố mẹ khỏi phải quan tâm", "Người tự lập dễ thích nghi với môi trường sống mới."],
    ["Trong làm việc nhóm, thành viên tự lập là người như thế nào?", "Chủ động nhận việc và hoàn thành phần việc đúng hạn", "Chờ nhóm trưởng làm xong hết mới tham gia", "Chỉ làm khi bị đe doạ trừ điểm", "Tự lập trong nhóm là chủ động và có trách nhiệm với việc chung."],
    ["Bước đầu tiên để trở nên tự lập là gì?", "Tự làm những việc nhỏ trong khả năng của mình mỗi ngày", "Làm ngay những việc thật lớn và khó", "Đợi người khác cho phép rồi mới tự lập", "Tự lập được xây dựng dần từ những việc nhỏ nhất."],
    ["Câu nào sau đây thể hiện thái độ Ỷ LẠI?", "“Để mẹ làm cho, con không cần đụng vào việc đó.”", "“Để con tự thử làm xem sao.”", "“Con sẽ tự dọn phòng của con.”", "Nhờ người khác làm thay việc của mình là biểu hiện ỷ lại."],
    ["Tự nấu một bữa ăn đơn giản khi bố mẹ vắng nhà thể hiện điều gì?", "Kĩ năng tự phục vụ và tính tự lập trong sinh hoạt", "Chỉ là trò nghịch ngợm của trẻ con", "Việc chỉ đáng nghĩ đến khi đã trưởng thành", "Biết tự chăm sóc bản thân là mục tiêu của rèn luyện tự lập."],
    ["Vì sao trường học tổ chức cho học sinh trực nhật luân phiên, tự quản lớp?", "Để rèn tính tự lập, tự quản và trách nhiệm với tập thể", "Để giảm việc cho thầy cô là mục đích duy nhất", "Không có mục đích gì rõ ràng", "Hoạt động tập thể là môi trường rèn luyện tự lập rất tốt."]
  ], [["Tự lập", "Tự làm việc của mình"], ["Ỷ lại", "Trái với tự lập"], ["Chủ động", "Phẩm chất của người tự lập"], ["Cần câu hơn con cá", "Dạy khả năng tự sống"]], "Nối cho đúng nhé!"),
  topic("gd6-b6", "🪞", "Tự nhận thức bản thân", "Bài 6 • Điểm mạnh, điểm yếu • Sở thích, năng lực • Kế hoạch hoàn thiện bản thân", [
    ["Tự nhận thức bản thân là gì?", "Là biết rõ về chính mình: điểm mạnh, điểm yếu, sở thích, cảm xúc, khả năng và giới hạn của bản thân", "Là tự đánh giá mình giỏi hơn mọi người", "Là suy nghĩ về người khác suốt ngày", "“Biết người biết ta” — biết mình là bước đầu để hoàn thiện bản thân."],
    ["Việc làm nào giúp em tự nhận thức bản thân tốt hơn?", "Lắng nghe nhận xét góp ý của thầy cô, bạn bè, cha mẹ và tự nhìn lại hành động của mình", "Chỉ nghe những lời khen", "Không bao giờ tự xem lại mình", "Nhận xét khách quan từ người khác giúp ta nhìn rõ bản thân hơn."],
    ["Bạn Mai vẽ rất đẹp nhưng hát chưa hay. Mai buồn vì bạn chê giọng hát của mình. Lời khuyên nào hợp lí cho Mai?", "Mỗi người có điểm mạnh riêng: Mai nên phát huy tài vẽ và nếu thích hát thì luyện tập thêm, không nên tự ti", "Mai nên bỏ vẽ để tập hát cho bằng bạn", "Mai không có điểm mạnh nào cả", "Nhận thức đúng điểm mạnh – điểm yếu giúp ta tự tin và có hướng phấn đấu phù hợp."],
    ["Tự nhận thức đúng khác với TỰ TI như thế nào?", "Tự nhận thức là đánh giá khách quan cả mạnh lẫn yếu; tự ti là chỉ nhìn thấy điểm yếu và đánh giá thấp bản thân quá mức", "Hai điều hoàn toàn giống nhau", "Tự ti là biểu hiện của người giỏi", "Cần tránh cả tự ti (quá thấp) lẫn tự cao (quá mức) về bản thân."],
    ["Tự cao, tự phụ về bản thân gây hại gì?", "Khiến ta chủ quan, không chịu học hỏi, dễ thất bại và mất bạn bè", "Không gây hại gì, cứ tự tin tuyệt đối là tốt", "Giúp ta luôn thành công", "“Tự phụ” thường đi liền với việc coi thường người khác."],
    ["Em khám phá ra mình rất thích và học nhanh môn Tin học. Em nên làm gì với nhận thức này?", "Đầu tư thời gian học tốt môn này, tham gia câu lạc bộ Tin học để phát triển năng khiếu, đồng thời vẫn học đều các môn khác", "Bỏ hết các môn khác chỉ học Tin", "Giấu không cho ai biết", "Phát hiện sở trường giúp em định hướng học tập và nghề nghiệp tương lai."],
    ["Khi nhận góp ý “em hay nói chuyện riêng trong giờ”, thái độ nào thể hiện tự nhận thức tốt?", "Tiếp nhận, nhìn lại bản thân, nếu đúng thì sửa đổi để tập trung học hơn", "Cãi lại ngay và giận người góp ý", "Mặc kệ vì cho rằng mình không bao giờ sai", "Biết nhận lỗi và sửa chữa là dấu hiệu trưởng thành."],
    ["Sổ tay “Nhật kí điểm mạnh của tôi” dùng để làm gì?", "Ghi lại những việc mình làm tốt, những lời khen đúng, những thành công nhỏ để hiểu và tin vào bản thân hơn", "Ghi lại lỗi của bạn bè", "Ghi lịch trực nhật của lớp", "Ghi chép tích cực giúp xây dựng hình ảnh bản thân lành mạnh."],
    ["Để sửa một điểm yếu (ví dụ: hay quên đồ dùng học tập), cách làm hiệu quả là gì?", "Nhận ra điểm yếu, đặt mục tiêu nhỏ cụ thể (soạn cặp theo thời khoá biểu mỗi tối) và duy trì, tự kiểm tra hằng tuần", "Mặc kệ vì “tính mình thế rồi”", "Nhờ mẹ soạn cặp thay mãi mãi", "Mọi điểm yếu đều có thể cải thiện bằng kế hoạch cụ thể và kiên trì."],
    ["Câu nói “Biết người biết ta, trăm trận trăm thắng” nhấn mạnh điều gì?", "Muốn thành công phải hiểu rõ người khác và đặc biệt là hiểu chính bản thân mình", "Chỉ cần biết về đối thủ là đủ", "Không cần biết gì về bản thân", "Hiểu mình là nền tảng của mọi kế hoạch phấn đấu."],
    ["Em nên làm gì khi thấy mình thua kém bạn ở một lĩnh vực nào đó?", "Nhìn nhận khách quan, học hỏi từ bạn, đặt mục tiêu tiến bộ của riêng mình thay vì ghen tị hay bỏ cuộc", "Ghen tị và nói xấu bạn", "Bỏ hẳn lĩnh vực đó vì “mình không có khiếu”", "So sánh lành mạnh là so với chính mình của ngày hôm qua."],
    ["Tự nhận thức bản thân giúp ích gì cho việc chọn nghề trong tương lai?", "Giúp em chọn nghề phù hợp với năng lực, sở thích và đam mê, làm việc hiệu quả và hạnh phúc hơn", "Không liên quan gì đến chọn nghề", "Chọn nghề chỉ cần theo nghề của bố mẹ", "Định hướng nghề bắt đầu từ hiểu rõ chính mình."],
    ["Hoạt động nào trong nhà trường giúp em khám phá bản thân?", "Tham gia câu lạc bộ, đội nhóm, các hoạt động văn nghệ, thể thao, thi tài năng của trường", "Chỉ ngồi im trong lớp cả ngày", "Tránh mọi hoạt động tập thể", "Trải nghiệm đa dạng giúp em phát hiện năng lực và sở thích thật sự."]
  ], [["Điểm mạnh", "Điều mình làm tốt"], ["Điểm yếu", "Điều cần cải thiện"], ["Tự ti", "Đánh giá thấp bản thân quá mức"], ["Tự phụ", "Đánh giá cao bản thân quá mức"]], "Nối khái niệm với ý đúng nhé!"),
  topic("gd6-b7", "🆘", "Ứng phó với tình huống nguy hiểm", "Bài 7 • Nhận diện nguy hiểm • Giữ bình tĩnh • Tìm kiếm sự giúp đỡ", [
    ["Khi phát hiện có khói và mùi khét trong nhà lúc đang ở một mình, việc đầu tiên em nên làm là gì?", "Giữ bình tĩnh, ngắt điện nếu an toàn, nhanh chóng ra khỏi nhà và gọi người lớn/cứu hoả (114), không quay lại lấy đồ", "Lục tìm xem đồ gì đang cháy để cứu tài sản", "Đổ nước vào ổ điện đang cháy", "Ưu tiên an toàn tính mạng hơn tài sản trong mọi tình huống cháy."],
    ["Số điện thoại khẩn cấp nào dùng để gọi CỨU HOẢ ở Việt Nam?", "114", "113", "115", "113 là công an, 114 cứu hoả, 115 cấp cứu y tế."],
    ["Số điện thoại của CÔNG AN khẩn cấp ở Việt Nam là số nào?", "113", "114", "115", "Ghi nhớ: 113 công an — 114 cứu hoả — 115 cấp cứu."],
    ["Khi bị một người lạ bám theo trên đường đi học, em nên làm gì?", "Đi nhanh đến nơi đông người/cửa hàng gần nhất, nhờ người lớn giúp và gọi điện cho bố mẹ", "Dừng lại hỏi xem họ cần gì", "Chạy vào ngõ vắng để cắt đuôi", "Nơi đông người và người lớn đáng tin cậy là chỗ an toàn nhất lúc đó."],
    ["Bạn em rủ lội qua suối nước đang chảy xiết sau mưa để về nhà nhanh hơn. Em nên làm gì?", "Từ chối và khuyên bạn cùng đi đường vòng an toàn, dù xa hơn; nước lũ rất nguy hiểm", "Đồng ý vì về nhanh cho kịp bữa cơm", "Để bạn đi trước thử xem có sâu không", "Đuối nước là tai nạn thương tâm phổ biến ở trẻ em — tuyệt đối không mạo hiểm với nước lũ."],
    ["Khi xảy ra động đất lúc đang trong lớp học, hành động đúng là gì?", "Chui xuống gầm bàn chắc chắn, che đầu, giữ yên cho đến khi rung lắc ngừng mới theo hướng dẫn của thầy cô ra nơi trống trải", "Chạy ngay ra cầu thang chen lấn", "Đứng cạnh cửa kính xem chuyện gì xảy ra", "Kĩ năng “chui – che – giữ” giúp tránh vật rơi trúng đầu khi động đất."],
    ["Em thấy bạn bị điện giật khi chạm vào dây điện hở. Em phải làm gì?", "Không chạm trực tiếp vào bạn; tìm cách ngắt điện (cầu dao) hoặc dùng vật khô cách điện gạt dây điện ra, rồi gọi người lớn và 115", "Nắm tay kéo bạn ra ngay", "Dội nước lên người bạn cho tỉnh", "Chạm vào người bị điện giật khi chưa ngắt điện sẽ khiến em bị giật theo."],
    ["Một người lạ trên mạng rủ em gửi ảnh cá nhân và hứa tặng quà game. Em nên làm gì?", "Từ chối, chặn liên lạc, kể ngay với bố mẹ/thầy cô; tuyệt đối không gửi ảnh và không gặp riêng", "Gửi ảnh vì món quà rất hấp dẫn", "Hẹn gặp ở nơi vắng để nhận quà", "Đây là chiêu trò dụ dỗ trẻ em rất nguy hiểm trên mạng."],
    ["Để phòng tránh tai nạn khi đi xe đạp đến trường, em cần làm gì?", "Đi đúng phần đường, đội mũ bảo hiểm khi đi xe đạp điện/xe máy điện, quan sát trước khi rẽ, không dàn hàng ngang", "Phóng nhanh cho kịp giờ là quan trọng nhất", "Vừa đi vừa nghe nhạc bằng tai nghe hai bên", "An toàn giao thông bắt đầu từ ý thức của mỗi học sinh."],
    ["Khi bị lạc ở siêu thị đông người, em nên làm gì?", "Giữ bình tĩnh, đến quầy lễ tân/bảo vệ nhờ phát loa tìm người thân, không tự ý đi lung tung ra ngoài", "Chạy khắp nơi khóc tìm mẹ", "Đi theo bất kì người lạ nào hứa dẫn đi tìm mẹ", "Nhờ nhân viên siêu thị là cách an toàn và nhanh nhất."],
    ["Dấu hiệu nào cho thấy một tình huống có thể nguy hiểm cần tránh xa?", "Nơi vắng vẻ, không có người lớn đáng tin cậy; người lạ cho quà, rủ đi theo và dặn giữ bí mật với bố mẹ", "Sân trường giờ ra chơi đông bạn bè", "Lớp học có thầy cô giáo", "Mọi “bí mật” khiến em lo sợ, khó chịu đều phải kể với người lớn tin cậy."],
    ["Kĩ năng đầu tiên và quan trọng nhất khi đối mặt nguy hiểm là gì?", "Giữ BÌNH TĨNH để suy nghĩ và hành động đúng, sau đó tìm sự giúp đỡ", "Hoảng loạn la hét thật to trong mọi trường hợp", "Đứng yên không làm gì cả", "Bình tĩnh giúp em nhớ được các bước xử lí đã học."],
    ["Em nên chuẩn bị gì để ứng phó tốt với tình huống nguy hiểm?", "Thuộc số điện thoại của bố mẹ, các số khẩn cấp 113/114/115, địa chỉ nhà và các kĩ năng an toàn cơ bản", "Không cần chuẩn bị gì, nguy hiểm không bao giờ xảy ra", "Chỉ cần mang theo nhiều tiền", "Chuẩn bị trước giúp em xử lí nhanh và đúng khi sự cố xảy ra."],
    ["Số điện thoại TÌM KIẾM CỨU NẠN (khi có thiên tai, tai nạn lớn) ở Việt Nam là số nào?", "112", "113", "115", "112 là đầu số tìm kiếm cứu nạn quốc gia; 113 công an, 114 cứu hoả, 115 cấp cứu y tế."],
    ["Khi bị người lạ nắm tay kéo đi, em cần làm gì ngay lập tức?", "Hét to cầu cứu và chạy về phía đông người", "Im lặng đi theo người lạ", "Đứng yên khóc thật to tại chỗ", "Kêu cứu thật to để người xung quanh chú ý, giúp đỡ và em thoát về nơi an toàn."],
    ["Muốn gạt dây điện ra khỏi người đang bị điện giật, em nên dùng vật nào?", "Gậy gỗ khô hoặc vật cách điện", "Thanh sắt còn ướt", "Đôi tay trần của em", "Vật khô, cách điện giúp em gạt dây điện mà không bị điện giật lây."],
    ["Khi lửa bén vào quần áo, em cần làm gì?", "Nằm ngay xuống đất và lăn qua lăn lại để dập lửa", "Chạy thật nhanh để gió thổi tắt lửa", "Đứng yên la hét chờ người đến giúp", "Lăn qua lăn lại trên mặt đất giúp dập tắt lửa bén vào quần áo."],
    ["Trong đám cháy có nhiều khói, em nên di chuyển thế nào để thoát ra ngoài?", "Đi khom hoặc bò thấp, dùng khăn ướt che mũi và miệng", "Chạy thẳng người cho thật nhanh", "Đứng chờ khói tan bớt rồi mới đi", "Khói độc thường bay ở trên cao; bò thấp và che mũi miệng giúp em tránh hít phải khói."],
    ["Khi có cháy ở chung cư, vì sao em không nên dùng thang máy để thoát hiểm?", "Thang máy có thể mất điện, dừng đột ngột làm em bị mắc kẹt", "Vì thang máy đi chậm hơn thang bộ", "Vì thang máy chỉ dành cho người lớn", "Khi cháy phải thoát bằng cầu thang bộ theo lối thoát hiểm."],
    ["Thấy một bạn bị đuối nước ở ao gần nhà, việc đầu tiên em nên làm là gì?", "Hô hoán thật to, tìm người lớn và ném vật nổi cho bạn bám", "Nhảy xuống nước kéo bạn lên ngay", "Đứng trên bờ chờ bạn tự bơi vào", "Em chưa biết bơi giỏi nên cứu bạn bằng cách tìm người lớn và vật nổi là an toàn nhất."],
    ["Khi bản thân chẳng may bị đuối nước, em cần nhớ điều gì?", "Giữ bình tĩnh, thả lỏng người để nước đẩy mình lên mặt nước", "Vùng vẫy thật mạnh cho nổi lên", "Lặn xuống đáy rồi đi bộ vào bờ", "Hoảng loạn và vùng vẫy khiến em nhanh chìm hơn; thả lỏng giúp cơ thể nổi lên."],
    ["Trời mưa dông có sấm sét, đang ở ngoài đồng em nên làm gì?", "Tìm nơi trú ẩn an toàn, tránh gốc cây to và cột điện", "Trú dưới gốc cây to cho khỏi ướt", "Đứng giữa cánh đồng chờ mưa tạnh", "Cây cao và cột điện dễ bị sét đánh; cần vào nơi trú ẩn chắc chắn, thấp và khô ráo."],
    ["Khi trời mưa dông, lốc, sét, việc nào nên làm khi ở trong nhà?", "Tắt các thiết bị điện như tivi, rút điện thoại đang sạc", "Mở hết cửa sổ cho thoáng mát", "Ra ban công xem mưa đá rơi", "Tắt thiết bị điện giúp tránh nguy cơ sét đánh lan truyền qua đường điện."],
    ["Để phòng chống lũ quét và sạt lở đất, gia đình em nên làm gì?", "Theo dõi dự báo thời tiết, chuẩn bị đèn pin, thực phẩm", "Cất hết đồ đạc xuống gầm giường", "Không cần chuẩn bị gì trước", "Chủ động chuẩn bị và theo dõi dự báo giúp gia đình ứng phó kịp thời khi thiên tai đến."],
    ["Khi đang có lũ, vì sao em không được lội qua sông, suối?", "Nước lũ chảy xiết có thể cuốn trôi người", "Vì nước lũ lạnh dễ làm em bị cảm", "Vì lội suối sẽ làm ướt giày dép", "Tuyệt đối không qua sông, suối khi có lũ; hãy chờ nước rút hoặc nhờ người lớn và lực lượng cứu hộ."],
    ["Số điện thoại của Tổng đài quốc gia bảo vệ trẻ em là số nào?", "111", "112", "115", "111 là Tổng đài quốc gia bảo vệ trẻ em; 112 tìm kiếm cứu nạn, 115 cấp cứu y tế."],
    ["Một người lạ tự xưng là bạn của mẹ và đề nghị đưa em về nhà. Em nên làm gì?", "Không đi theo; báo thầy cô, gọi điện cho mẹ kiểm tra", "Đi theo vì người đó biết tên mẹ em", "Đi cùng nhưng chỉ ngồi ghế sau", "Chỉ đi theo người mà bố mẹ đã dặn trước và em đã xác nhận lại với bố mẹ."],
    ["Trời đang mưa đá, mấy bạn rủ em chạy ra sân nhặt đá chơi. Em nên làm gì?", "Từ chối, ở trong nhà và tránh xa cửa kính", "Chạy ra nhặt cùng cho vui", "Đội mũ rồi ra nhặt một lúc", "Đá mưa có thể rơi mạnh gây thương tích; khi mưa đá cần ở trong nhà."],
    ["Tình huống nguy hiểm từ con người là gì?", "Nguy hiểm do hành vi cố ý hoặc vô tình của con người", "Mọi hiện tượng thời tiết xấu", "Chỉ là bão, lũ và sấm sét", "Theo SGK: nguy hiểm từ con người xuất phát từ hành vi cố ý hoặc vô tình, gây tổn thất cho người và xã hội."],
    ["Tình huống nguy hiểm từ tự nhiên là gì?", "Hiện tượng tự nhiên gây tổn thất về người và tài sản", "Hành vi đùa nghịch nguy hiểm của bạn bè", "Việc quên mang đồ dùng học tập", "Theo SGK: bão, lũ, sạt lở, động đất là những tình huống nguy hiểm từ tự nhiên."]
  ], [["113", "Công an khẩn cấp"], ["114", "Cứu hoả"], ["115", "Cấp cứu y tế"], ["Bình tĩnh", "Kĩ năng đầu tiên khi gặp nguy hiểm"], ["111", "Tổng đài quốc gia bảo vệ trẻ em"], ["Lửa bén vào quần áo", "Nằm xuống đất, lăn qua lăn lại"], ["Đám cháy nhiều khói", "Bò thấp, khăn ướt che mũi miệng"], ["Mưa dông, sấm sét", "Ở trong nhà, tắt thiết bị điện"], ["Lũ quét, sạt lở đất", "Xem dự báo thời tiết, chuẩn bị trước"], ["Thấy người đuối nước", "Hô hoán, tìm người lớn, ném vật nổi"]], "Nối số điện thoại với dịch vụ nhé!"),
  topic("gd6-b8", "🐖", "Tiết kiệm", "Bài 8 • Tiết kiệm thời gian, tiền bạc, điện nước, đồ dùng • Chống lãng phí", [
    ["Tiết kiệm là gì?", "Là sử dụng hợp lí, có hiệu quả tiền bạc, thời gian, sức lực và của cải, không lãng phí", "Là không bao giờ được tiêu tiền cho bất cứ việc gì", "Là mua đồ rẻ nhất dù nhanh hỏng", "Tiết kiệm khác với keo kiệt, bủn xỉn: tiết kiệm là dùng đúng lúc, đúng mức cần thiết."],
    ["Biểu hiện nào sau đây là tiết kiệm điện trong gia đình?", "Tắt đèn, quạt khi ra khỏi phòng; dùng ánh sáng tự nhiên ban ngày; tắt TV khi không xem", "Bật đèn sáng cả nhà cả ngày lẫn đêm", "Mở tủ lạnh lâu khi tìm đồ", "Tiết kiệm điện vừa giảm chi phí vừa bảo vệ môi trường."],
    ["Bạn Hoa có thói quen mua nhiều đồ ăn vặt bằng tiền tiết kiệm rồi ăn không hết phải bỏ đi. Đó là biểu hiện gì?", "Lãng phí tiền bạc và thực phẩm", "Tiết kiệm tốt", "Biết hưởng thụ đúng cách", "Mua theo nhu cầu thật, vừa đủ là biểu hiện của tiêu dùng thông minh."],
    ["Tiết kiệm THỜI GIAN được hiểu như thế nào?", "Biết sắp xếp công việc hợp lí, làm việc đúng giờ, không để thời gian trôi qua vô ích", "Làm mọi việc cùng lúc thật nhanh", "Ngủ càng ít càng tốt để có nhiều thời gian", "Thời gian là “vốn quý” không lấy lại được."],
    ["Việc làm nào thể hiện tiết kiệm nước?", "Khoá vòi nước khi đánh răng, sửa vòi nước rò rỉ, dùng nước vo gạo tưới cây", "Để vòi nước chảy suốt khi rửa tay cho sạch", "Ngày nào cũng xả đầy bồn tắm để ngâm chơi", "Nước sạch là tài nguyên quý và có hạn."],
    ["Vì sao học sinh cần tiết kiệm sách vở, đồ dùng học tập?", "Vì đó là tiền bạc, công sức của cha mẹ và tài nguyên xã hội; giữ gìn đồ dùng còn rèn tính cẩn thận", "Vì sách vở càng cũ càng có giá", "Tiết kiệm đồ dùng không cần thiết ở tuổi đi học", "“Của bền tại người” — giữ gìn đồ dùng là tiết kiệm thiết thực nhất."],
    ["Một bạn dùng tiền lì xì mua ngay chiếc xe đồ chơi đắt tiền chỉ chơi vài hôm rồi chán, trong khi bạn rất cần một chiếc cặp mới cho năm học. Nhận xét nào đúng?", "Bạn chưa biết ưu tiên chi tiêu cho nhu cầu cần thiết trước — đó là lãng phí", "Bạn chi tiêu rất thông minh", "Tiền lì xì thì tiêu thế nào cũng được", "Nguyên tắc chi tiêu: ưu tiên nhu cầu thiết yếu, để dành cho mục tiêu lâu dài."],
    ["Tiết kiệm khác với BỦN XỈN, keo kiệt ở điểm nào?", "Tiết kiệm là chi tiêu hợp lí khi cần vẫn chi; bủn xỉn là không dám chi cả những việc cần thiết, chính đáng", "Hai từ hoàn toàn giống nhau", "Bủn xỉn là đức tính đáng học tập", "Người tiết kiệm vẫn hào phóng đúng lúc, đúng việc."],
    ["Câu tục ngữ nào khuyên con người về tiết kiệm?", "“Tích tiểu thành đại” (góp nhỏ thành lớn)", "“Ăn xổi ở thì”", "“Vung tay quá trán”", "“Tích tiểu thành đại” và “buôn tàu bán bè không bằng ăn dè ở thiện” đều ca ngợi đức tiết kiệm."],
    ["Để thực hành tiết kiệm tiền, học sinh nên làm gì?", "Nuôi heo đất với một phần tiền ăn sáng/lì xì, ghi chép chi tiêu và đặt mục tiêu tiết kiệm cụ thể", "Cho bạn vay hết tiền mà không ghi lại", "Tiêu hết tiền ngay khi có cho khỏi mất", "Kế hoạch tiết kiệm nhỏ mỗi ngày tạo thành khoản lớn theo thời gian."],
    ["Hành động nào ở trường học thể hiện chống lãng phí?", "Tắt điện, quạt khi lớp ra về; viết giấy hai mặt; giữ gìn bàn ghế, thiết bị chung", "Vặn vòi nước sân trường chảy chơi", "Xé vở vứt giấy còn trắng", "Tài sản chung của trường cũng là của cải xã hội cần giữ gìn."],
    ["Lãng phí gây ra những tác hại gì?", "Tốn kém tiền của gia đình và xã hội, cạn kiệt tài nguyên, gây ô nhiễm do rác thải, hình thành thói quen sống thiếu trách nhiệm", "Lãng phí không gây hại gì nếu nhà giàu", "Lãng phí giúp kinh tế phát triển nên cần khuyến khích", "Chống lãng phí là trách nhiệm của mọi công dân, từ việc nhỏ nhất."],
    ["Mẹ em mua rau về, một phần bị héo phải bỏ đi thường xuyên. Giải pháp tiết kiệm, hợp lí là gì?", "Mua vừa đủ ăn trong vài ngày, bảo quản rau đúng cách trong tủ lạnh", "Mua thật nhiều một lần cho đỡ mất công đi chợ", "Không bao giờ mua rau nữa", "Lên kế hoạch mua sắm thực phẩm giúp giảm lãng phí đáng kể."],
    ["Thói quen nào giúp em tiết kiệm được tiền ăn sáng mỗi ngày?", "Để dành một phần tiền vào heo đất", "Tiêu hết tiền ngay khi vừa nhận", "Ngày nào cũng mua thật nhiều đồ ăn vặt", "Tích tiểu thành đại: để dành từng khoản nhỏ mỗi ngày sẽ thành khoản lớn."],
    ["Đồ dùng học tập vẫn còn tốt mà đòi mua mới chỉ vì bạn có đồ mới là biểu hiện gì?", "Lãng phí, mua sắm không theo nhu cầu", "Tiết kiệm đúng cách", "Biết giữ gìn đồ dùng", "Chỉ mua khi thật sự cần mới là chi tiêu tiết kiệm, chống lãng phí."],
    ["Rời khỏi phòng, việc làm nào giúp tiết kiệm điện?", "Tắt đèn, quạt và thiết bị điện không dùng nữa", "Để đèn sáng cả ngày cho tiện", "Bật sẵn điều hoà từ sáng", "Tắt thiết bị điện khi không sử dụng là cách tiết kiệm điện đơn giản nhất."],
    ["Theo SGK, tiết kiệm là gì?", "Sử dụng hợp lí, đúng mức của cải, thời gian và sức lực", "Cất tiền thật kĩ, không bao giờ tiêu đến", "Chỉ mua những thứ rẻ nhất", "SGK: tiết kiệm là biết sử dụng một cách hợp lí, đúng mức của cải vật chất, thời gian, sức lực của mình và của người khác."],
    ["Đi mua đồ dùng học tập, cách nào giúp em tiết kiệm tiền?", "Ghi danh sách trước và chỉ mua thứ thật cần thiết", "Thấy gì hay cũng mua thử một cái", "Mua thật nhiều để khỏi phải đi lại", "Lập danh sách trước khi mua giúp em không mua những thứ chưa cần thiết."],
    ["Bạn Quang vừa học giỏi vừa tích cực tham gia hoạt động của trường, lớp. Bí quyết của bạn là gì?", "Tiết kiệm thời gian, sắp xếp công việc hợp lí", "Thức khuya học bài mỗi ngày", "Chỉ học, không chơi với bạn bè", "Bạn Quang chia sẻ: luôn tiết kiệm thời gian, sắp xếp công việc hợp lí để làm được những việc cần làm."],
    ["Khi chải răng, em tiết kiệm nước bằng cách nào?", "Khoá vòi nước khi đang chải, chỉ mở khi cần dùng", "Mở vòi chảy liên tục cho thật sạch", "Chải răng thật nhanh là đủ", "Khoá vòi khi không sử dụng là cách tiết kiệm nước đơn giản, ai cũng làm được."],
    ["Phát hiện ống nước trong nhà bị rò rỉ, em nên làm gì?", "Báo người lớn sửa ngay để nước không bị lãng phí", "Lấy khăn bịt tạm rồi quên luôn", "Kệ vì nước rò rỉ không đáng kể", "Sửa chữa kịp thời chỗ rò rỉ giúp tiết kiệm nước và tiền cho gia đình."],
    ["Cách nào sau đây giúp tiết kiệm điện?", "Tận dụng ánh sáng tự nhiên, dùng bóng đèn tiết kiệm điện", "Bật đèn cả ban ngày cho nhà sáng", "Để tivi chạy làm nền khi đi ngủ", "Tắt thiết bị khi không cần, dùng đèn tiết kiệm điện và ánh sáng tự nhiên là ba cách tiết kiệm điện trong SGK."],
    ["Em giữ sách vở cẩn thận để cuối năm tặng lại các bạn có hoàn cảnh khó khăn. Việc làm đó thể hiện điều gì?", "Tiết kiệm, biết nghĩ đến người khác", "Keo kiệt, không muốn mua sách mới", "Chỉ là thói quen gọn gàng ngăn nắp", "Giữ gìn sách vở vừa là tiết kiệm, vừa là việc làm nhân ái."],
    ["Em làm mất chiếc khăn do mẹ mất nhiều thời gian, công sức đan cho. Điều đó cho thấy em chưa biết làm gì?", "Chưa biết quý trọng công sức lao động của người khác", "Chưa khéo tay trong việc đan khăn", "Chưa có nhiều khăn để thay đổi", "Tiết kiệm còn là biết quý trọng thành quả lao động của người khác."],
    ["Anh Hoà thu nhập khá cao nhưng kiếm được bao nhiêu tiêu hết bấy nhiêu. Khi lâm bệnh phải nằm viện, anh gặp khó khăn vì sao?", "Không có khoản tiền dự phòng cho lúc cần thiết", "Vì anh không có bạn bè giúp đỡ", "Vì cửa hàng của anh ở xa bệnh viện", "Chi tiêu hết thu nhập, không để dành khiến anh Hoà không có tiền trả viện phí khi ốm đau."],
    ["Đi ăn tự chọn (buffet), hành vi nào thể hiện tiết kiệm?", "Chỉ lấy vừa đủ phần thức ăn mình ăn hết", "Lấy thật nhiều món cho đáng tiền", "Mỗi món lấy một ít rồi bỏ thừa", "Lấy vừa đủ ăn là tiết kiệm thực phẩm và tôn trọng công sức người làm ra món ăn."],
    ["Bạn Dương thường bật điều hoà, quạt trần, tivi suốt ngày, ngay cả khi ra sân chơi với các bạn. Việc làm đó thế nào?", "Lãng phí điện", "Tiết kiệm điện", "Bình thường vì nhà bạn có điều kiện", "Bật thiết bị điện khi không sử dụng là lãng phí điện, cần nhắc bạn tắt đi."],
    ["Tuấn được mẹ cho tiền để mua sách nhưng lại rủ bạn ra quán chơi điện tử, tiêu hết cả số tiền đó. Việc làm của Tuấn sai vì sao?", "Tiêu tiền không đúng mục đích, gây lãng phí", "Vì chơi điện tử giúp giải trí sau giờ học", "Vì Tuấn không nên rủ bạn đi cùng", "Tiền dành cho việc học cần được dùng đúng mục đích; tiêu hết vào trò chơi là lãng phí."],
    ["Tiết kiệm điện, tiết kiệm năng lượng mang lại lợi ích gì?", "Giảm ô nhiễm, tiết kiệm chi phí cho gia đình và quốc gia", "Chỉ giúp nhà máy điện đỡ vất vả hơn", "Không mang lại lợi ích gì rõ ràng", "Phong trào “Hộ gia đình tiết kiệm điện” giúp giảm tiêu thụ điện, giảm khí thải ô nhiễm và tiết kiệm chi phí."],
    ["Lập thời gian biểu và thực hiện theo thời gian biểu giúp em điều gì?", "Tiết kiệm thời gian, làm được nhiều việc cần làm", "Có thêm thời gian chơi điện tử", "Không phải làm việc nhà nữa", "Bạn trong SGK lập thời gian biểu, tránh xa tivi, điện thoại khi việc cần làm chưa xong nên vừa học giỏi vừa làm được việc nhà."]
  ], [["Tích tiểu thành đại", "Góp nhỏ thành lớn"], ["Tiết kiệm", "Dùng hợp lí, không lãng phí"], ["Lãng phí", "Dùng hoang phí, vô ích"], ["Heo đất", "Dụng cụ tiết kiệm quen thuộc"], ["Ghi danh sách trước khi mua sắm", "Tiết kiệm tiền"], ["Lập thời gian biểu", "Tiết kiệm thời gian"], ["Khoá vòi khi chải răng", "Tiết kiệm nước"], ["Tận dụng ánh sáng tự nhiên", "Tiết kiệm điện"], ["Lấy thức ăn vừa đủ", "Không lãng phí đồ ăn"], ["Nuôi heo đất", "Để dành tiền cho mục tiêu cần thiết"]], "Nối cho đúng nhé!"),
  topic("gd6-b9", "🇻🇳", "Công dân nước Cộng hoà xã hội chủ nghĩa Việt Nam", "Bài 9 • Khái niệm công dân • Quốc tịch • Nghĩa vụ và trách nhiệm của công dân nhỏ tuổi", [
    ["Công dân là gì?", "Là người dân của một nước, có các quyền và nghĩa vụ do pháp luật của nước đó quy định", "Là mọi người sống trên Trái Đất không phân biệt nước nào", "Chỉ là người từ 18 tuổi trở lên", "Học sinh tuy còn nhỏ tuổi vẫn là công dân Việt Nam."],
    ["Căn cứ chính để xác định một người là công dân Việt Nam là gì?", "Người đó có quốc tịch Việt Nam", "Người đó biết nói tiếng Việt", "Người đó đang sống trong lãnh thổ Việt Nam", "Quốc tịch là mối liên hệ pháp lí giữa cá nhân với nhà nước."],
    ["Quốc tịch Việt Nam được xác định chủ yếu dựa trên cơ sở nào khi một em bé sinh ra?", "Dựa trên quốc tịch của cha mẹ (huyết thống): cha hoặc mẹ là công dân Việt Nam thì con có quốc tịch Việt Nam", "Dựa vào tên của em bé", "Dựa vào nơi em bé sẽ đi học", "Ngoài huyết thống còn có trường hợp sinh trên lãnh thổ Việt Nam theo quy định pháp luật."],
    ["Trách nhiệm của một học sinh — công dân nhỏ tuổi của đất nước — là gì?", "Học tập tốt, rèn luyện đạo đức, yêu Tổ quốc, giữ gìn bản sắc văn hoá dân tộc, bảo vệ môi trường", "Chỉ cần quan tâm việc của riêng mình", "Chưa cần có trách nhiệm gì với đất nước", "Mỗi công dân nhỏ tuổi xây dựng đất nước bắt đầu từ học tập và rèn luyện."],
    ["Việc làm nào thể hiện lòng yêu nước của một học sinh?", "Chào cờ nghiêm trang, học tốt môn Lịch sử, giữ gìn tiếng Việt và văn hoá dân tộc, bảo vệ môi trường quê hương", "Chỉ cần hô khẩu hiệu thật to", "Chê bai mọi thứ của nước mình", "Yêu nước thể hiện trong hành động nhỏ, thiết thực mỗi ngày."],
    ["Quốc ca của nước ta là bài hát nào, do ai sáng tác?", "Bài “Tiến quân ca” của nhạc sĩ Văn Cao", "Bài “Như có Bác Hồ trong ngày vui đại thắng” của Phạm Tuyên", "Bài “Việt Nam quê hương tôi”", "“Tiến quân ca” được chọn là Quốc ca từ năm 1945."],
    ["Quốc kì nước Cộng hoà xã hội chủ nghĩa Việt Nam có đặc điểm gì?", "Cờ đỏ sao vàng năm cánh ở giữa", "Cờ xanh có mặt trời", "Cờ trắng có bông sen", "Lá cờ đỏ sao vàng là biểu tượng thiêng liêng của Tổ quốc, nhuốm máu đào của các anh hùng liệt sĩ."],
    ["Ngày Quốc khánh của nước ta là ngày nào?", "Ngày 2 tháng 9 (năm 1945, Bác Hồ đọc Tuyên ngôn Độc lập tại quảng trường Ba Đình)", "Ngày 30 tháng 4", "Ngày 1 tháng 5", "Sự kiện 2/9/1945 khai sinh nước Việt Nam Dân chủ Cộng hoà (nay là CHXHCN Việt Nam)."],
    ["Công dân Việt Nam khi ở nước ngoài vẫn được hưởng điều gì từ Nhà nước ta?", "Được Nhà nước Việt Nam bảo hộ theo pháp luật Việt Nam và điều ước quốc tế", "Không còn liên quan gì đến Việt Nam", "Tự động mang quốc tịch nước ngoài", "Bảo hộ công dân là trách nhiệm của Nhà nước đối với công dân mình."],
    ["Em hiểu thế nào về câu nói “Non sông Việt Nam có trở nên tươi đẹp hay không... chính là nhờ một phần lớn ở công học tập của các em” (thư Bác Hồ gửi học sinh)?", "Bác Hồ căn dặn học sinh phải chăm học vì tương lai đất nước phụ thuộc vào thế hệ trẻ", "Bác Hồ chỉ khen học sinh giỏi văn", "Câu nói chỉ dành cho học sinh thời chiến tranh", "Lời dạy trong thư gửi học sinh nhân ngày khai trường đầu tiên của nước Việt Nam độc lập (1945)."],
    ["Người nước ngoài sinh sống, làm việc ở Việt Nam có được coi là công dân Việt Nam không?", "Không: họ là người nước ngoài cư trú ở Việt Nam, phải tuân thủ pháp luật Việt Nam nhưng không có quốc tịch Việt Nam (trừ khi được nhập quốc tịch)", "Có: ai sống ở Việt Nam đều là công dân Việt Nam", "Tuỳ vào thời gian họ ở bao lâu là tự động thành công dân", "Công dân xác định bởi quốc tịch, không phải bởi nơi đang sinh sống."],
    ["Hành vi nào sau đây xứng đáng là việc làm của một công dân yêu nước nhỏ tuổi?", "Tham gia dọn vệ sinh đường làng, ngõ xóm; trồng cây xanh; giúp đỡ gia đình thương binh, liệt sĩ gần nhà", "Vứt rác ra đường cho người khác dọn", "Phá hoại tài sản công cộng", "Công dân yêu nước thể hiện ở hành vi văn minh và có trách nhiệm với cộng đồng."],
    ["Vì sao mỗi công dân cần hiểu biết về đất nước mình?", "Để thêm yêu, tự hào về Tổ quốc; biết bảo vệ chủ quyền và phát huy truyền thống dân tộc", "Chỉ để trả bài kiểm tra môn Lịch sử", "Không có lí do quan trọng nào", "Hiểu biết về đất nước là nền tảng của tình yêu Tổ quốc."]
  ], [["Quốc tịch", "Căn cứ xác định công dân"], ["Quốc ca", "Tiến quân ca — Văn Cao"], ["Quốc kì", "Cờ đỏ sao vàng"], ["Quốc khánh", "2 tháng 9"]], "Nối cho đúng nhé!"),
  topic("gd6-b10", "📜", "Quyền và nghĩa vụ cơ bản của công dân", "Bài 10 • Phân biệt quyền – nghĩa vụ • Quyền học tập, nghĩa vụ tuân thủ pháp luật", [
    ["Quyền của công dân là gì?", "Là những lợi ích hợp pháp mà công dân được hưởng, được Nhà nước thừa nhận và bảo đảm thực hiện", "Là mọi điều công dân muốn làm tuỳ ý", "Là đặc ân chỉ dành cho người lớn", "Ví dụ quyền: được học tập, được bảo vệ sức khoẻ, tự do ngôn luận theo pháp luật..."],
    ["Nghĩa vụ của công dân là gì?", "Là những việc công dân BUỘC phải thực hiện đối với Nhà nước và xã hội theo quy định của pháp luật", "Là những việc thích thì làm, không thích thì thôi", "Là việc chỉ dành cho quan chức", "Ví dụ nghĩa vụ: bảo vệ Tổ quốc, nộp thuế, tuân thủ Hiến pháp và pháp luật..."],
    ["“Được đi học, được học tập suốt đời” đối với công dân là quyền hay nghĩa vụ?", "Vừa là quyền, vừa là nghĩa vụ của công dân (Hiến pháp ghi: học tập là quyền và nghĩa vụ)", "Chỉ là quyền, học hay không tuỳ thích", "Chỉ người lớn mới có", "Hiến pháp 2013 khẳng định học tập là quyền và nghĩa vụ của công dân."],
    ["Việc nào sau đây là NGHĨA VỤ của công dân?", "Bảo vệ Tổ quốc; tuân thủ Hiến pháp và pháp luật; nộp thuế theo quy định", "Được khám chữa bệnh khi ốm", "Được bầu cử khi đủ 18 tuổi", "Công dân đủ 18 tuổi có nghĩa vụ quân sự theo luật định đối với nam công dân."],
    ["Việc nào sau đây là QUYỀN của công dân?", "Quyền tự do tín ngưỡng; quyền được bảo vệ tính mạng, sức khoẻ; quyền bầu cử và ứng cử khi đủ tuổi", "Nghĩa vụ đóng thuế", "Nghĩa vụ giữ gìn an ninh quốc gia", "Quyền của công dân được Hiến pháp và pháp luật ghi nhận, bảo đảm."],
    ["Mối quan hệ giữa quyền và nghĩa vụ của công dân là gì?", "Gắn bó chặt chẽ, không tách rời: công dân hưởng quyền đồng thời phải thực hiện nghĩa vụ", "Chỉ có quyền mà không có nghĩa vụ nào", "Quyền của người này có thể xâm phạm quyền của người khác tuỳ ý", "Không ai được hưởng quyền mà không làm tròn nghĩa vụ tương ứng."],
    ["Một người tự ý lấy tài sản của người khác và nói “tôi có quyền làm điều tôi thích”. Nhận xét nào đúng?", "Sai: tự do của mỗi người giới hạn bởi quyền, lợi ích hợp pháp của người khác và pháp luật", "Đúng, vì công dân có quyền tự do tuyệt đối", "Đúng một nửa", "Quyền công dân không bao giờ cho phép xâm hại người khác."],
    ["Nghĩa vụ bảo vệ môi trường thuộc về đối tượng nào?", "Thuộc về mọi tổ chức và cá nhân — mọi công dân", "Chỉ thuộc về các nhà máy lớn", "Chỉ thuộc về học sinh khi đi dã ngoại", "Bảo vệ môi trường là nghĩa vụ chung được pháp luật quy định."],
    ["Học sinh thực hiện nghĩa vụ của mình trong trường học bằng cách nào?", "Chấp hành nội quy nhà trường, kính trọng thầy cô, giữ gìn tài sản chung, học tập nghiêm túc", "Đến trường cho có mặt là đủ", "Chỉ cần tránh bị ghi sổ đầu bài", "Nội quy trường học cụ thể hoá một phần nghĩa vụ của học sinh-công dân."],
    ["Khi quyền lợi hợp pháp của em bị xâm phạm, em nên làm gì?", "Nói với bố mẹ, thầy cô; khi cần, nhờ cơ quan có thẩm quyền bảo vệ (theo quy định pháp luật)", "Tự ý trả đũa người xâm phạm mình", "Im lặng chịu đựng mãi mãi", "Pháp luật bảo vệ quyền công dân và có cơ chế để công dân khiếu nại, tố cáo đúng nơi."],
    ["Công dân có quyền bầu cử đại biểu Quốc hội, Hội đồng nhân dân khi đủ bao nhiêu tuổi?", "Đủ 18 tuổi trở lên", "Đủ 16 tuổi", "Mọi lứa tuổi đều được bầu", "Đủ 21 tuổi trở lên công dân còn có quyền ứng cử vào Quốc hội theo Hiến pháp."],
    ["Vì sao công dân phải nộp thuế cho Nhà nước?", "Thuế là nguồn thu chủ yếu để Nhà nước xây dựng trường học, bệnh viện, đường sá, bảo vệ Tổ quốc... phục vụ chính nhân dân", "Thuế là tiền phạt của người dân", "Thuế chỉ dùng để trả lương quan chức", "“Nộp thuế là nghĩa vụ thiêng liêng của công dân”."],
    ["Câu nào thể hiện đúng tinh thần “Sống và làm việc theo Hiến pháp và pháp luật”?", "Mỗi công dân cần hiểu, tôn trọng và tuân thủ pháp luật trong mọi hành động của mình", "Chỉ cần thuộc lòng tên các điều luật", "Pháp luật chỉ áp dụng cho người phạm tội", "Thượng tôn pháp luật là nền tảng của xã hội văn minh."]
  ], [["Quyền", "Lợi ích hợp pháp được hưởng"], ["Nghĩa vụ", "Việc bắt buộc phải thực hiện"], ["Được học tập", "Vừa là quyền, vừa là nghĩa vụ"], ["Nộp thuế", "Nghĩa vụ của công dân"]], "Nối cho đúng nhé!"),
  topic("gd6-b11", "🧒", "Quyền cơ bản của trẻ em", "Bài 11 • Bốn nhóm quyền: sống còn, bảo vệ, phát triển, tham gia", [
    ["Theo Luật Trẻ em và Công ước Liên hợp quốc, trẻ em là người dưới bao nhiêu tuổi?", "Dưới 16 tuổi (theo Luật Trẻ em Việt Nam 2016)", "Dưới 18 tuổi theo mọi quy định", "Dưới 12 tuổi", "Công ước quốc tế về quyền trẻ em quy định trẻ em là người dưới 18 tuổi; luật Việt Nam quy định dưới 16 tuổi."],
    ["Bốn nhóm quyền cơ bản của trẻ em gồm những nhóm nào?", "Quyền sống còn, quyền được bảo vệ, quyền được phát triển và quyền được tham gia", "Quyền ăn, quyền ngủ, quyền chơi, quyền khóc", "Chỉ có quyền được đi học", "Đây là cách phân loại phổ biến theo Công ước về quyền trẻ em."],
    ["Quyền SỐNG CÒN của trẻ em bao gồm những gì?", "Được khai sinh, có họ tên, quốc tịch; được chăm sóc sức khoẻ, dinh dưỡng để sống và lớn lên", "Được tự quyết định mọi việc trong gia đình", "Được không phải đi học", "Trẻ sinh ra phải được đăng kí khai sinh — giấy tờ pháp lí đầu tiên của đời người."],
    ["Quyền được BẢO VỆ của trẻ em có nghĩa là gì?", "Trẻ được bảo vệ khỏi bạo lực, xâm hại, bóc lột lao động, bỏ rơi và các tệ nạn xã hội", "Trẻ được bố mẹ chiều chuộng mọi yêu cầu", "Trẻ không bao giờ bị phê bình", "Mọi hành vi xâm hại trẻ em đều bị pháp luật nghiêm cấm và xử lí."],
    ["Quyền được PHÁT TRIỂN của trẻ em thể hiện qua điều gì?", "Được học tập, vui chơi giải trí lành mạnh, phát triển thể chất, trí tuệ và tài năng", "Được tự ý nghỉ học bất cứ lúc nào", "Được xem điện thoại cả ngày", "Học tập là quyền quan trọng hàng đầu trong nhóm quyền phát triển."],
    ["Quyền được THAM GIA của trẻ em có nghĩa là gì?", "Trẻ được bày tỏ ý kiến, nguyện vọng về những vấn đề liên quan đến mình và được lắng nghe, tôn trọng", "Trẻ được quyết định thay bố mẹ mọi việc trong nhà", "Trẻ được tham gia mọi hoạt động của người lớn không giới hạn", "Ý kiến của trẻ được xem xét phù hợp với độ tuổi và mức độ trưởng thành."],
    ["Một bạn học sinh bị bố mẹ bắt nghỉ học để đi làm thuê kiếm tiền. Quyền nào của bạn bị vi phạm?", "Quyền được học tập (phát triển) và quyền được bảo vệ khỏi bóc lột lao động", "Không quyền nào bị vi phạm", "Chỉ vi phạm quyền vui chơi", "Pháp luật cấm sử dụng lao động trẻ em trái quy định."],
    ["Đường dây nóng quốc gia bảo vệ trẻ em ở Việt Nam là số điện thoại nào?", "Tổng đài 111 — miễn phí, hoạt động 24/7", "Số 113", "Số 1900 bất kì", "Khi trẻ bị xâm hại, bạo hành, hãy gọi 111 để được hỗ trợ kịp thời."],
    ["Việc làm nào thể hiện người lớn tôn trọng quyền tham gia của trẻ em?", "Cha mẹ lắng nghe ý kiến của con khi quyết định việc liên quan đến con (chọn trường, lớp học thêm...)", "Người lớn quyết định hết, trẻ chỉ việc nghe theo tuyệt đối", "Hỏi ý con nhưng không bao giờ để tâm", "Tôn trọng tiếng nói của trẻ giúp trẻ tự tin và có trách nhiệm hơn."],
    ["Trẻ em khuyết tật có những quyền gì?", "Có đầy đủ các quyền như mọi trẻ em khác, đồng thời được Nhà nước và xã hội hỗ trợ đặc biệt về học tập, chữa bệnh, hoà nhập", "Ít quyền hơn trẻ em bình thường", "Chỉ có quyền ở nhà, không cần đi học", "Mọi trẻ em đều bình đẳng về quyền, không phân biệt hoàn cảnh."],
    ["Khi thấy bạn cùng lớp thường xuyên bị đánh đập, bỏ đói, em nên làm gì?", "Kể với thầy cô, người lớn tin cậy hoặc gọi tổng đài 111 để bạn được bảo vệ kịp thời", "Im lặng vì đó là chuyện nhà bạn", "Quay clip đăng mạng để câu view", "Phát hiện và thông báo xâm hại trẻ em là trách nhiệm của mọi người."],
    ["Quyền được vui chơi, giải trí của trẻ em cần được hiểu thế nào cho đúng?", "Trẻ được tham gia trò chơi, hoạt động văn hoá, thể thao lành mạnh, phù hợp lứa tuổi — cân bằng với học tập", "Trẻ được chơi game suốt ngày không cần học", "Vui chơi là việc lãng phí thời gian", "Vui chơi lành mạnh giúp trẻ phát triển toàn diện."],
    ["Vì sao trẻ em cần được đăng kí khai sinh ngay sau khi sinh?", "Giấy khai sinh là căn cứ pháp lí chứng nhận sự ra đời, họ tên, quốc tịch — điều kiện để hưởng mọi quyền khác", "Chỉ để gia đình có giấy tờ lưu niệm", "Không quan trọng, để lớn rồi làm cũng được", "“Có khai sinh là có quyền công dân” — quyền sống còn đầu tiên của trẻ."],
    ["Trẻ em được tiêm chủng mở rộng miễn phí thể hiện quyền nào?", "Quyền được chăm sóc sức khoẻ (thuộc quyền sống còn)", "Quyền tham gia", "Quyền vui chơi giải trí", "Tiêm chủng giúp trẻ phòng bệnh — một phần của quyền được sống và lớn lên khoẻ mạnh."],
    ["Hành vi nào sau đây là XÂM HẠI trẻ em?", "Đánh đập, chửi bới nặng nề, bỏ mặc không chăm sóc trẻ", "Phê bình nhẹ nhàng khi trẻ làm sai", "Cho trẻ giúp việc nhà vừa sức", "Mọi hình thức bạo lực với trẻ em đều bị pháp luật cấm."],
    ["Quyền riêng tư của trẻ em được hiểu như thế nào?", "Được bảo vệ về thư từ, hình ảnh và thông tin cá nhân", "Được giữ mọi bí mật nguy hiểm mà không nói với ai", "Người lớn được đọc trộm nhật kí của trẻ tuỳ ý", "Đăng ảnh, thông tin của trẻ lên mạng cần tôn trọng quyền riêng tư của trẻ."],
    ["Trẻ em mồ côi, không nơi nương tựa được Nhà nước và xã hội bảo đảm điều gì?", "Được nuôi dưỡng, chăm sóc thay thế và được đến trường", "Phải tự mưu sinh từ khi còn rất nhỏ", "Không thuộc diện được quan tâm đặc biệt", "Không trẻ em nào bị bỏ lại phía sau."],
    ["Việc học sinh được nói lên ý kiến trong buổi họp lớp thể hiện quyền nào của trẻ em?", "Quyền tham gia (được bày tỏ ý kiến)", "Quyền sống còn", "Quyền được bảo vệ", "Ý kiến của trẻ được lắng nghe phù hợp với độ tuổi."],
    ["Trẻ em có quyền được tiếp cận thông tin như thế nào?", "Thông tin phù hợp lứa tuổi, có lợi cho sự phát triển", "Mọi thông tin không giới hạn, kể cả độc hại", "Không được tiếp cận bất kì thông tin nào", "Người lớn cần hướng dẫn trẻ chọn lọc thông tin, nhất là trên mạng."],
    ["Ai là người đầu tiên chịu trách nhiệm chăm sóc, bảo vệ trẻ em?", "Cha mẹ, người chăm sóc trẻ trong gia đình", "Hàng xóm xung quanh", "Bạn bè cùng lớp của trẻ", "Gia đình là vòng bảo vệ đầu tiên và gần nhất của trẻ."],
    ["Khi gặp một em nhỏ bị lạc đường, khóc tìm cha mẹ, em nên làm gì?", "Báo công an, người lớn gần đó hoặc gọi tổng đài 111", "Để em tự đi tìm nhà một mình", "Không cần báo cho bất cứ ai", "Giúp trẻ lạc liên hệ cơ quan chức năng là cách an toàn nhất."],
    ["Quyền có gia đình của trẻ em có nghĩa là gì?", "Được sống cùng cha mẹ, được gia đình yêu thương, chăm sóc", "Được tự ý rời khỏi nhà bất cứ lúc nào", "Gia đình không có trách nhiệm gì với trẻ", "Gia đình là môi trường sống đầu tiên của mọi trẻ em."],
    ["Để thực hiện tốt quyền được học tập, bản thân trẻ em cần làm gì?", "Chăm lo học tập, chuyên cần và tôn trọng thầy cô", "Chỉ cần đến lớp để điểm danh", "Đòi bố mẹ làm bài tập thay", "Quyền đi đôi với bổn phận: hưởng quyền học tập thì phải chăm học."]
  ], [["Tổng đài 111", "Bảo vệ trẻ em quốc gia"], ["Quyền sống còn", "Khai sinh, chăm sóc sức khoẻ"], ["Quyền phát triển", "Học tập, vui chơi"], ["Quyền tham gia", "Được bày tỏ ý kiến"]], "Nối cho đúng nhé!"),
  topic("gd6-b12", "🌟", "Thực hiện quyền trẻ em", "Bài 12 • Bổn phận của trẻ em • Trách nhiệm của gia đình, nhà trường, xã hội", [
    ["Bên cạnh các quyền được hưởng, trẻ em có những BỔN PHẬN nào cơ bản?", "Kính trọng, lễ phép, hiếu thảo với ông bà cha mẹ; chăm lo học tập; yêu quê hương đất nước; tôn trọng pháp luật...", "Trẻ em chỉ có quyền, không có bổn phận gì", "Trẻ em phải tự nuôi sống bản thân hoàn toàn", "Luật Trẻ em quy định 5 bổn phận của trẻ em đối với gia đình, nhà trường và xã hội."],
    ["Bổn phận của trẻ em đối với GIA ĐÌNH là gì?", "Kính trọng, lễ phép, hiếu thảo với ông bà, cha mẹ; phụ giúp gia đình những việc vừa sức", "Không cần quan tâm đến ai trong nhà", "Chỉ biết đòi hỏi bố mẹ chiều theo ý mình", "Hiếu thảo là bổn phận đầu tiên của trẻ em Việt Nam."],
    ["Bổn phận của trẻ em đối với NHÀ TRƯỜNG là gì?", "Tôn trọng, lễ phép với thầy giáo, cô giáo; chăm lo học tập; chấp hành nội quy trường, lớp", "Chỉ đến trường khi thích", "Không cần tôn trọng ai nếu học giỏi", "Thực hiện tốt bổn phận giúp em phát huy đầy đủ quyền được học tập."],
    ["Trẻ em có bổn phận gì đối với BẢN THÂN mình?", "Tự rèn luyện thân thể, học tập, sống trung thực, không xa vào tệ nạn xã hội, không tự huỷ hoại bản thân", "Được phép thử mọi chất gây nghiện cho biết", "Không cần quan tâm sức khoẻ của mình", "Bảo vệ chính mình cũng là một bổn phận được luật quy định."],
    ["Ai có trách nhiệm bảo đảm thực hiện quyền trẻ em?", "Gia đình, nhà trường, Nhà nước và toàn xã hội cùng chung tay", "Chỉ có bố mẹ trẻ", "Chỉ có chính trẻ em tự lo", "Quyền trẻ em được bảo đảm bởi cả hệ thống xã hội."],
    ["Gia đình thực hiện quyền trẻ em bằng những việc gì?", "Nuôi dưỡng, chăm sóc sức khoẻ, cho con đi học, lắng nghe con, không bạo lực với con", "Chỉ cần cho con ăn no là đủ", "Đánh mắng con là cách dạy dỗ duy nhất đúng", "Gia đình là môi trường đầu tiên và quan trọng nhất bảo vệ trẻ."],
    ["Nhà trường bảo đảm quyền trẻ em qua hoạt động nào?", "Dạy học công bằng, tổ chức hoạt động vui chơi, lắng nghe ý kiến học sinh qua lớp trưởng, diễn đàn trẻ em...", "Chỉ quan tâm học sinh giỏi", "Cấm học sinh phát biểu ý kiến", "Nhà trường thân thiện là nơi quyền trẻ em được tôn trọng mỗi ngày."],
    ["Em tham gia “Diễn đàn trẻ em” ở trường để làm gì?", "Để bày tỏ ý kiến, nguyện vọng của học sinh về những vấn đề liên quan đến trẻ em — thực hiện quyền tham gia", "Để được nghỉ học một buổi", "Chỉ những học sinh giỏi mới được tham gia với quyền phát biểu", "Diễn đàn trẻ em được tổ chức ở nhiều cấp, kể cả cấp quốc gia."],
    ["Khi quyền của mình bị vi phạm mà nói với người thân không được giải quyết, em có thể tìm đến đâu?", "Thầy cô giáo, cơ quan bảo vệ trẻ em địa phương, hoặc gọi tổng đài quốc gia 111", "Tự chịu đựng, không nói với ai nữa", "Tự mình trả đũa người vi phạm", "Luôn có người lớn và tổ chức sẵn sàng bảo vệ trẻ em."],
    ["Trẻ em thực hiện quyền và bổn phận của mình cần tránh hành vi nào?", "Lạm dụng quyền để đòi hỏi vô lí, lười học, vi phạm pháp luật với lí do “em còn là trẻ con”", "Bày tỏ ý kiến một cách lễ phép", "Giúp đỡ bạn bè gặp khó khăn", "Quyền luôn đi đôi với bổn phận và trách nhiệm."],
    ["Việc học sinh tham gia lao động tự phục vụ ở trường (trực nhật, trồng cây) có ý nghĩa gì?", "Rèn luyện bổn phận lao động, ý thức giữ gìn môi trường học đường và tính tự lập", "Là hình phạt dành cho học sinh hư", "Là việc của nhân viên vệ sinh, học sinh không nên làm", "Lao động vừa sức là một phần bổn phận của trẻ em đối với tập thể."],
    ["Câu nào sau đây thể hiện một trẻ em biết thực hiện tốt quyền và bổn phận của mình?", "“Em chăm học, lễ phép với thầy cô, giúp đỡ bố mẹ việc nhà và biết nói lên ý kiến của mình một cách lễ phép.”", "“Em chỉ cần hưởng quyền, mọi bổn phận là của người lớn.”", "“Em sẽ đòi hỏi bố mẹ mọi thứ em thích.”", "Cân bằng giữa quyền được hưởng và bổn phận phải làm là dấu hiệu trưởng thành."],
    ["Vì sao nói “quyền trẻ em và bổn phận trẻ em là hai mặt của một vấn đề”?", "Vì trẻ chỉ thực sự phát triển toàn diện khi vừa được hưởng quyền, vừa học cách làm tròn bổn phận với gia đình, nhà trường và xã hội", "Vì hai khái niệm hoàn toàn trái ngược nhau, không liên quan", "Vì bổn phận quan trọng hơn nên quyền có thể bỏ qua", "Hiểu đúng hai mặt này giúp trẻ trưởng thành có trách nhiệm."],
    ["Luật Trẻ em hiện hành của Việt Nam được Quốc hội thông qua vào năm nào?", "Năm 2016", "Năm 2000", "Năm 2020", "Luật Trẻ em 2016 quy định đầy đủ quyền và bổn phận của trẻ em."],
    ["Công ước của Liên hợp quốc về quyền trẻ em ra đời vào năm nào?", "Năm 1989", "Năm 1945", "Năm 2010", "Việt Nam là một trong những nước đầu tiên phê chuẩn Công ước này (năm 1990)."],
    ["“Tháng hành động vì trẻ em” ở nước ta diễn ra vào tháng nào hằng năm?", "Tháng 6", "Tháng 3", "Tháng 9", "Tháng 6 gắn với ngày Quốc tế Thiếu nhi 1/6."],
    ["Trẻ em tham gia đội sao đỏ, giữ trật tự cổng trường là thực hiện bổn phận gì?", "Bổn phận với cộng đồng, xã hội và tôn trọng pháp luật", "Bổn phận với bản thân duy nhất", "Không phải bổn phận mà là bị ép buộc", "Tham gia việc chung vừa sức là bổn phận của trẻ với tập thể."],
    ["Phong trào “Trường học thân thiện, học sinh tích cực” góp phần bảo đảm quyền nào?", "Quyền học tập trong môi trường an toàn, lành mạnh", "Quyền được miễn mọi bài kiểm tra", "Quyền tự ý nghỉ học", "Môi trường học đường thân thiện giúp trẻ phát triển toàn diện."],
    ["Hành vi nào VI PHẠM quyền được bảo vệ của trẻ em?", "Bắt trẻ lao động nặng nhọc, nguy hiểm thay vì đi học", "Cho trẻ tham gia câu lạc bộ thể thao", "Cho trẻ bày tỏ ý kiến trong gia đình", "Lao động trẻ em trái quy định bị pháp luật nghiêm cấm."],
    ["Tổng đài điện thoại quốc gia bảo vệ trẻ em là số nào?", "111", "113", "115", "Tổng đài 111 miễn phí, hoạt động 24/24 để tiếp nhận thông tin về trẻ em bị xâm hại."],
    ["Trẻ em khuyết tật được bảo đảm những điều gì đặc biệt?", "Được chăm sóc đặc biệt, học hoà nhập và được hỗ trợ phù hợp", "Không được đến trường như trẻ em khác", "Chỉ ở nhà, không tham gia hoạt động nào", "Mọi trẻ em đều bình đẳng về quyền; trẻ khuyết tật được hỗ trợ thêm để hoà nhập."],
    ["Quyền vui chơi, giải trí của trẻ em được thể hiện ở trường học qua hoạt động nào?", "Giờ ra chơi, ngoại khoá, câu lạc bộ và thể thao học đường", "Trẻ đến trường chỉ để học, không cần chơi", "Chỉ ở công viên mới được vui chơi", "Vui chơi lành mạnh là một phần của quyền được phát triển."],
    ["Khi thấy bạn bị bạo lực học đường, việc làm nào giúp bảo vệ bạn đúng cách?", "Báo ngay với thầy cô, nhà trường và động viên bạn bị hại", "Đứng ngoài xem vì sợ bị liên luỵ", "Đánh lại nhóm bắt nạt cho hả giận", "Báo với người lớn có trách nhiệm là cách bảo vệ bạn an toàn và đúng pháp luật."],
    ["Bổn phận của trẻ em đối với cộng đồng, xã hội là gì?", "Tôn trọng pháp luật, giữ gìn môi trường, giúp người khó khăn", "Không cần quan tâm đến ai ngoài gia đình mình", "Chỉ lo cho lợi ích của bản thân", "Luật Trẻ em quy định bổn phận của trẻ đối với cộng đồng, xã hội và quê hương, đất nước."],
    ["“Quyền được lắng nghe” của trẻ em trong gia đình có nghĩa là gì?", "Cha mẹ lắng nghe ý kiến của con trong việc liên quan đến con", "Con muốn điều gì cha mẹ cũng phải chiều ngay", "Trẻ được quyền ra lệnh cho cha mẹ", "Lắng nghe khác với nuông chiều: ý kiến của trẻ được tôn trọng và cân nhắc."],
    ["Trẻ em cần được bảo vệ khỏi những thông tin nào trên mạng internet?", "Thông tin xấu, độc hại, không phù hợp với lứa tuổi", "Mọi thông tin phục vụ học tập", "Thông tin dự báo thời tiết", "Người lớn cần hướng dẫn trẻ sử dụng internet an toàn."],
    ["Việc nhà trường lấy ý kiến học sinh khi xây dựng nội quy lớp thể hiện quyền nào của trẻ em?", "Quyền tham gia", "Quyền sống còn", "Quyền được bảo vệ", "Học sinh được tham gia vào việc liên quan trực tiếp đến mình."]
  ], [["Bổn phận với gia đình", "Hiếu thảo, lễ phép"], ["Bổn phận với nhà trường", "Chăm học, tôn trọng thầy cô"], ["Tổng đài 111", "Kênh hỗ trợ trẻ em"], ["Quyền và bổn phận", "Hai mặt gắn liền"]], "Nối cho đúng nhé!")
];
/* ================= TIN HỌC 6 — 6 chủ đề ================= */
function tin6BitGen() {
  var v = rand(0, 3);
  if (v === 0) { var b = rand(2, 9); return numMCQ6("Đổi đơn vị: " + b + " byte = ? bit", b + " × 8", b * 8, "1 byte = 8 bit nên " + b + " byte = " + (b * 8) + " bit.", 2); }
  if (v === 1) { var kb = rand(2, 9); return numMCQ6("Đổi đơn vị: " + kb + " KB = ? byte", kb + " × 1024", kb * 1024, "1 KB = 1024 byte nên " + kb + " KB = " + fmtN(kb * 1024) + " byte.", 210); }
  if (v === 2) { var mb = rand(2, 8); return numMCQ6("Đổi đơn vị: " + mb + " MB = ? KB", mb + " × 1024", mb * 1024, "1 MB = 1024 KB nên " + mb + " MB = " + fmtN(mb * 1024) + " KB.", 210); }
  var gb = rand(2, 6);
  return numMCQ6("Đổi đơn vị: " + gb + " GB = ? MB", gb + " × 1024", gb * 1024, "1 GB = 1024 MB nên " + gb + " GB = " + fmtN(gb * 1024) + " MB.", 210);
}
var TIN6_TOPICS = [
  topic("tin6-c1", "📰", "Thông tin và dữ liệu, xử lí thông tin", "Chủ đề 1 • Thông tin và dữ liệu • Xử lí thông tin • Thông tin trong đời sống", [
    ["Thông tin là gì?", "Điều đem lại hiểu biết về thế giới và bản thân", "Là những con số trong máy tính", "Là giấy báo cũ", "Ví dụ: nghe dự báo thời tiết, ta biết ngày mai có mưa — đó là thông tin."],
    ["Dữ liệu là gì?", "Chữ, số, hình ảnh, âm thanh trong vật mang tin", "Là những câu chuyện kể miệng", "Là cảm xúc của con người", "Dữ liệu có thể nằm trong sách, ảnh, bản ghi âm; không chỉ trong máy tính."],
    ["Ba dạng thông tin cơ bản thường gặp trong tin học là gì?", "Văn bản, hình ảnh và âm thanh", "Chỉ có dạng chữ viết", "Chỉ có dạng hình ảnh", "Ba dạng biểu diễn thông tin cơ bản: văn bản (chữ và số), hình ảnh, âm thanh."],
    ["Hoạt động xử lí thông tin gồm những bước chính nào theo thứ tự?", "Thu nhận, lưu trữ, xử lí và truyền thông tin", "Truyền → thu nhận → xử lí → lưu trữ", "Xử lí → xoá → thu nhận", "Đây là chu trình xử lí thông tin của cả con người và máy tính."],
    ["Bộ phận nào của con người thu nhận thông tin từ môi trường?", "Các giác quan thu nhận, não xử lí và ghi nhớ", "Chỉ có đôi mắt", "Đôi tay là chính", "Con người là một “hệ thống xử lí thông tin” tự nhiên."],
    ["Khi em nhìn đèn giao thông chuyển đỏ và dừng lại, quá trình xử lí thông tin diễn ra thế nào?", "Mắt nhận tín hiệu, não quyết định, cơ thể dừng xe", "Em dừng lại hoàn toàn theo phản xạ không qua suy nghĩ", "Đèn đỏ tự điều khiển xe của em", "Ví dụ đời thường về đủ bốn bước xử lí thông tin ở con người."],
    ["Thông tin có vai trò gì trong đời sống?", "Giúp hiểu biết, ra quyết định và hành động", "Thông tin không ảnh hưởng gì đến quyết định", "Chỉ dùng để giải trí", "Cùng một việc, người có thông tin đầy đủ thường quyết định sáng suốt hơn."],
    ["Ví dụ nào sau đây là THÔNG TIN dạng hình ảnh?", "Một bức tranh vẽ bản đồ trường học", "Con số 25°C", "Đoạn văn tả cảnh trường", "Dữ liệu hình ảnh được máy tính lưu dưới dạng các điểm ảnh."],
    ["Khi máy tính tính tổng điểm học kì cho em, máy đã thực hiện bước nào của xử lí thông tin?", "Bước xử lí: tính toán từ các điểm đã nhập", "Bước thu nhận", "Bước truyền tin ra loa", "Nhập điểm là thu nhận, in bảng điểm là truyền/kết xuất thông tin."],
    ["Lưu trữ thông tin ở con người và máy tính có điểm gì khác nhau cơ bản?", "Máy lưu lượng lớn; trí nhớ con người có thể quên", "Con người nhớ chính xác 100% mãi mãi", "Máy tính không thể lưu trữ lâu", "Vì vậy người ta dùng máy tính hỗ trợ lưu trữ, xử lí thông tin."],
    ["Thông tin trên mạng Internet có đặc điểm gì cần lưu ý?", "Có cả tin đúng và sai, cần kiểm tra nguồn", "Mọi thông tin trên mạng đều đúng tuyệt đối", "Thông tin trên mạng không bao giờ lan truyền", "Kĩ năng đánh giá thông tin là rất quan trọng trong thời đại số."],
    ["Việc em ghi chép bài học vào vở tương ứng với bước nào trong xử lí thông tin của con người?", "Bước lưu trữ thông tin", "Bước thu nhận", "Bước truyền thông tin cho người khác", "Vở ghi giúp thông tin được lưu lâu hơn trí nhớ."],
    ["Dữ liệu số (digital) khác thông tin thường ở điểm nào?", "Được biểu diễn bằng dãy bit 0 và 1", "Dữ liệu số luôn là số nguyên", "Dữ liệu số không thể là hình ảnh", "Ảnh, nhạc, phim trên máy đều được mã hoá thành dãy bit."],
      ["Vật mang tin là gì?", "Phương tiện lưu trữ và truyền tải thông tin", "Chỉ máy tính đang bật", "Chỉ cảm xúc của người đọc", ""],
      ["Cuốn sách có chữ và tranh đóng vai trò gì?", "Vật mang tin", "Thiết bị xử lí điện", "Mạng không dây", ""],
      ["Con số 28°C trên nhiệt kế là gì?", "Dữ liệu", "Quyết định mặc áo", "Một thuật toán", ""],
      ["Từ số đo 28°C, em biết trời nóng. Điều em hiểu là gì?", "Thông tin", "Vỏ nhiệt kế", "Bộ nhớ máy tính", ""],
      ["Tai thu nhận dữ liệu nào khi nghe chuông?", "Âm thanh", "Mùi hương", "Nhiệt độ", ""],
      ["Mắt thu nhận dữ liệu nào khi đọc bảng tin?", "Chữ và hình ảnh", "Mùi vị", "Âm thanh từ loa", ""],
      ["Thông báo giờ vào học trên bảng giúp em làm gì?", "Biết thời điểm cần có mặt", "Biết mật khẩu của lớp", "Biết mọi tin trên mạng", ""],
      ["Em nghe dự báo mưa rồi mang áo mưa. Quyết định dựa vào gì?", "Thông tin thời tiết", "Màu của chiếc cặp", "Số trang trong sách", ""],
      ["Chụp ảnh thời khoá biểu để xem lại thuộc hoạt động nào?", "Lưu trữ thông tin", "Xoá thông tin", "Thay đổi giờ học", ""],
      ["Gửi thời khoá biểu cho bạn thuộc hoạt động nào?", "Truyền thông tin", "Chế biến thức ăn", "Xoá dữ liệu", ""],
      ["Đọc số đo nhiệt kế thuộc hoạt động nào?", "Thu nhận thông tin", "Truyền kết quả", "In văn bản", ""],
      ["Tính điểm trung bình từ bảng điểm thuộc hoạt động nào?", "Xử lí thông tin", "Chỉ lưu vỏ máy", "Thay đổi tên lớp", ""],
      ["Lưu bài vào ổ đĩa thuộc hoạt động nào?", "Lưu trữ thông tin", "Thu nhận âm thanh", "Truyền qua loa", ""],
      ["Bàn phím giúp máy tính thực hiện hoạt động nào?", "Thu nhận dữ liệu", "In ra giấy", "Phát âm thanh", ""],
      ["Micro giúp nhập dạng dữ liệu nào?", "Âm thanh", "Mùi hương", "Hương vị", ""],
      ["Màn hình giúp máy tính thực hiện hoạt động nào?", "Đưa thông tin ra", "Thu nhận tiếng nói", "Lưu tệp lâu dài", ""],
      ["Loa đưa thông tin ra dưới dạng nào?", "Âm thanh", "Mùi hương", "Chữ trên giấy", ""],
      ["Máy in đưa thông tin ra vật mang tin nào?", "Giấy", "Tai người nghe", "Sóng Wi-Fi", ""],
      ["Bộ xử lí máy tính thực hiện nhiệm vụ chính nào?", "Xử lí dữ liệu", "Chỉ phát âm thanh", "Chỉ in trên giấy", ""],
      ["Ổ đĩa được dùng chủ yếu để làm gì?", "Lưu trữ dữ liệu", "Nghe âm thanh", "Gõ kí tự", ""],
      ["Vì sao cùng một dữ liệu, hai người có thể hiểu khác nhau?", "Hiểu biết và hoàn cảnh có thể khác nhau", "Dữ liệu luôn tự đổi chữ", "Mỗi người có một Internet riêng", ""],
      ["Khi thiếu thông tin về đường đi, em nên làm gì?", "Xem bản đồ hoặc hỏi người tin cậy", "Đoán đường rồi đi ngay", "Xoá bản đồ", ""],
      ["Muốn quyết định mang áo khoác, thông tin nào hữu ích?", "Nhiệt độ và thời tiết", "Tên máy in", "Dung lượng USB", ""],
      ["Thông tin giúp giải quyết vấn đề khi nào?", "Khi phù hợp với vấn đề cần giải quyết", "Khi càng dài càng tốt", "Khi không cần kiểm chứng", ""],
      ["Biển báo giao thông chứa dữ liệu dạng nào?", "Hình ảnh và kí hiệu", "Chỉ mùi vị", "Chỉ tiếng nhạc", ""],
      ["Một bản ghi âm bài giảng là gì?", "Vật mang tin chứa âm thanh", "Chỉ một mạng máy tính", "Bộ phận xử lí", ""],
      ["Đọc lịch rồi sắp xếp giờ học thể hiện điều gì?", "Dùng thông tin để lập kế hoạch", "Thông tin không có ích", "Máy tính quyết định thay mọi việc", ""]
    ], [["Thu nhận", "Tiếp nhận thông tin"], ["Lưu trữ", "Ghi nhớ thông tin"], ["Xử lí", "Biến đổi, tính toán"], ["Truyền tin", "Chia sẻ kết quả"], ["Bàn phím", "Nhập chữ và số"], ["Micro", "Thu nhận âm thanh"], ["Màn hình", "Hiển thị thông tin"], ["Ổ đĩa", "Lưu trữ dữ liệu"]], "Nối bước xử lí thông tin nhé!"),
  (function () { var kp = knowledgePools([
      ["Bit là gì?", "Đơn vị nhỏ nhất, nhận giá trị 0 hoặc 1", "Là một loại tệp văn bản", "Là tên một thiết bị mạng", "Mọi dữ liệu trong máy tính đều được mã hoá thành dãy bit."],
      ["Byte là gì và bằng bao nhiêu bit?", "1 byte gồm 8 bit", "1 byte = 100 bit", "1 byte = 2 bit", "1 byte = 8 bit. Số byte biểu diễn một kí tự phụ thuộc bảng mã; không phải mọi kí tự đều dùng một byte."],
      ["Các đơn vị đo dung lượng thông tin theo thứ tự tăng dần là gì?", "Bit < Byte < KB < MB < GB < TB", "KB < Bit < Byte < MB", "Byte < Bit < GB < MB", "1 byte = 8 bit. Theo quy ước dùng trong bài: 1 KB = 1024 byte, 1 MB = 1024 KB, 1 GB = 1024 MB."],
      ["Một bức ảnh dung lượng 3 MB tương đương khoảng bao nhiêu KB?", "3072 KB (theo quy ước 1 MB = 1024 KB)", "Khoảng 300 KB", "Khoảng 30 KB", "Đổi đơn vị: nhân với 1024 khi đổi từ đơn vị lớn xuống nhỏ."],
      ["Thiết bị nào sau đây thường có dung lượng lưu trữ lớn nhất trong các lựa chọn?", "Ổ cứng 1 TB của máy tính", "Đĩa CD 700 MB", "Thẻ nhớ 8 GB", "1 TB = 1024 GB, lớn hơn nhiều so với GB và MB."],
      ["Văn bản, hình ảnh, âm thanh trong máy tính có điểm chung gì?", "Đều được mã hoá thành dãy bit", "Đều lưu trên giấy in", "Đều không cần điện để xem", "Đây là bản chất của thông tin trong máy tính."],
      ["Bảng mã ASCII dùng để làm gì?", "Quy ước mã hoá kí tự thành các dãy bit", "Mã hoá màu sắc của ảnh", "Nén tệp video", "ASCII là bảng mã kí tự cơ bản trong tin học."],
      ["Theo quy ước 1 GB = 1024 MB, tối đa bao nhiêu tệp 5 MB vừa trong 1 GB trống?", "204 tệp (theo quy ước 1 GB = 1024 MB)", "Khoảng 5 tệp", "Khoảng 1024 tệp", "1024 : 5 = 204 dư 4, nên tối đa 204 tệp, bỏ qua dung lượng quản lí tệp."],
      ["Khi nói “điện thoại của em có 64 GB bộ nhớ”, 64 GB cho biết điều gì?", "Dung lượng lưu trữ của thiết bị", "Tốc độ chạy của điện thoại", "Kích thước màn hình điện thoại", "Dung lượng càng lớn càng lưu được nhiều ảnh, ứng dụng, video."],
      ["Kí tự “a” khi nhập vào máy tính được lưu trữ dưới dạng gì?", "Một dãy bit theo bảng mã", "Một hình vẽ nhỏ của chữ a", "Một âm thanh", "Máy tính “hiểu” mọi thứ qua dãy 0 và 1."],
      ["Dung lượng của một tệp phụ thuộc vào yếu tố gì?", "Loại dữ liệu và độ chi tiết của nội dung", "Tên tệp đặt dài hay ngắn", "Ngày tạo tệp", "Một trang văn bản chỉ vài KB, một bộ phim có thể vài GB."],
      ["Một bit có bao nhiêu giá trị có thể có?", "2", "8", "10", ""],
      ["Hai giá trị của bit là gì?", "0 và 1", "1 và 2", "0 và 9", ""],
      ["2 byte bằng bao nhiêu bit?", "16 bit", "10 bit", "2 bit", ""],
      ["4 byte bằng bao nhiêu bit?", "32 bit", "12 bit", "4 bit", ""],
      ["16 bit bằng bao nhiêu byte?", "2 byte", "16 byte", "8 byte", ""],
      ["32 bit bằng bao nhiêu byte?", "4 byte", "32 byte", "16 byte", ""],
      ["Theo quy ước SGK, 1 KB bằng bao nhiêu byte?", "1024 byte", "8 byte", "100 byte", ""],
      ["Theo quy ước SGK, 1 MB bằng bao nhiêu KB?", "1024 KB", "8 KB", "100 KB", ""],
      ["Theo quy ước SGK, 1 GB bằng bao nhiêu MB?", "1024 MB", "8 MB", "100 MB", ""],
      ["Theo quy ước SGK, 2 KB bằng bao nhiêu byte?", "2048 byte", "1024 byte", "16 byte", ""],
      ["Theo quy ước SGK, 2 MB bằng bao nhiêu KB?", "2048 KB", "1024 KB", "16 KB", ""],
      ["Theo quy ước SGK, 2 GB bằng bao nhiêu MB?", "2048 MB", "1024 MB", "16 MB", ""],
      ["Theo quy ước SGK, 4096 byte bằng bao nhiêu KB?", "4 KB", "2 KB", "4096 KB", ""],
      ["Theo quy ước SGK, 2048 KB bằng bao nhiêu MB?", "2 MB", "1 MB", "2048 MB", ""],
      ["Theo quy ước SGK, 4096 MB bằng bao nhiêu GB?", "4 GB", "2 GB", "4096 GB", ""],
      ["Đơn vị nào lớn hơn MB và nhỏ hơn TB?", "GB", "Bit", "Byte", ""],
      ["Đơn vị nào nhỏ hơn MB và lớn hơn byte?", "KB", "GB", "TB", ""],
      ["Một byte có bao nhiêu bit?", "8", "2", "16", ""],
      ["Máy tính biểu diễn một bức ảnh bằng gì?", "Các dãy bit", "Mùi của màu vẽ", "Giấy đặt trong màn hình", ""],
      ["Âm thanh khi lưu trong máy tính được biểu diễn bằng gì?", "Các dãy bit", "Chỉ chữ viết trên giấy", "Không thể lưu được", ""],
      ["Tệp 8 MB và tệp 2 MB: tệp nào có dung lượng lớn hơn?", "Tệp 8 MB", "Tệp 2 MB", "Hai tệp bằng nhau", ""],
      ["Thẻ 8 GB và thẻ 4 GB: thẻ nào có dung lượng lớn hơn?", "Thẻ 8 GB", "Thẻ 4 GB", "Hai thẻ bằng nhau", ""],
      ["Trong 100 MB trống, tối đa bao nhiêu tệp 20 MB vừa đủ?", "5 tệp", "20 tệp", "100 tệp", ""],
      ["Trong 60 MB trống, tối đa bao nhiêu ảnh 3 MB vừa đủ?", "20 ảnh", "3 ảnh", "60 ảnh", ""],
      ["Trong 30 MB trống, lưu 4 tệp 5 MB còn bao nhiêu?", "10 MB", "20 MB", "5 MB", ""],
      ["Một tệp 12 MB chia thành 3 phần bằng nhau, mỗi phần bao nhiêu?", "4 MB", "3 MB", "36 MB", ""],
      ["Đổi từ byte sang bit phải làm gì?", "Nhân với 8", "Chia cho 8", "Nhân với 1024", ""]
    ], [["Bit", "Đơn vị nhỏ nhất, 0 hoặc 1"], ["Byte", "8 bit"], ["KB", "1024 byte"], ["GB", "1024 MB"], ["MB", "1024 KB"], ["TB", "1024 GB"], ["Dãy bit", "Dãy kí hiệu 0 và 1"], ["Dung lượng", "Lượng dữ liệu có thể lưu"]], "Nối đơn vị đo thông tin nhé!");
    kp.choose.push(tin6BitGen, tin6BitGen, tin6BitGen);
    kp.blank.push(function () { var b = rand(2, 9); return numBlank6("Đổi đơn vị thông tin!", b + " byte = ? bit", b * 8, "1 byte = 8 bit."); });
    return { id: "tin6-c2", emoji: "💾", name: "Thông tin trong máy tính", sub: "Chủ đề 1 • Bit, byte, KB, MB, GB • Biểu diễn thông tin trong máy tính", pools: kp }; })(),
  topic("tin6-c3", "🌐", "Mạng máy tính và Internet", "Chủ đề 2 • Mạng máy tính • Internet • Lợi ích của Internet", [
    ["Mạng máy tính là gì?", "Các máy tính kết nối để trao đổi, chia sẻ tài nguyên", "Là một máy tính rất lớn", "Là tập hợp các trang web", "Nhờ mạng, các máy tính có thể dùng chung máy in, dữ liệu..."],
    ["Các thành phần chính của một mạng máy tính gồm những gì?", "Thiết bị đầu cuối, kết nối và phần mềm mạng", "Chỉ gồm các máy tính", "Chỉ gồm dây cáp", "Thiếu một trong các thành phần, mạng không hoạt động được."],
    ["Mạng LAN là mạng có phạm vi như thế nào?", "Phạm vi nhỏ như phòng học hoặc một toà nhà", "Mạng toàn cầu nối các châu lục", "Mạng chỉ gồm đúng hai máy ở hai nước", "LAN = Local Area Network (mạng diện tích hẹp)."],
    ["Internet là gì?", "Mạng kết nối các mạng máy tính trên toàn thế giới", "Là một trang web duy nhất", "Là tên một phần mềm duyệt web", "Internet được gọi là “mạng của các mạng”."],
    ["Lợi ích nào sau đây thuộc về Internet?", "Học tập, tìm thông tin, liên lạc và giải trí", "Làm cho mọi thông tin đều tự động đúng", "Thay thế hoàn toàn việc đến trường học", "Internet là công cụ: dùng đúng mục đích sẽ rất hữu ích."],
    ["Thiết bị nào giúp các máy tính trong nhà kết nối wifi và ra Internet?", "Bộ định tuyến (router) Wi-Fi", "Máy in", "Loa bluetooth", "Hầu hết gia đình hiện nay dùng router wifi chung cho nhiều thiết bị."],
    ["Khi dùng Internet, nguy cơ nào em cần cảnh giác?", "Tin giả, lừa đảo, nội dung không phù hợp", "Không có nguy cơ gì cả", "Chỉ có nguy cơ hỏng máy tính", "An toàn trên Internet sẽ được học kĩ ở chủ đề sau."],
    ["Mạng không dây (wifi) khác mạng có dây ở điểm nào?", "Dùng sóng vô tuyến thay cho dây cáp", "Wifi không cần điện để hoạt động", "Wifi chỉ dùng được cho điện thoại", "Phòng máy trường học thường dùng cả hai loại kết nối."],
    ["Nhà cung cấp dịch vụ Internet (ISP) có vai trò gì?", "Cung cấp dịch vụ kết nối Internet", "Sản xuất máy tính", "Viết ra mọi trang web", "Người dùng đăng kí gói cước Internet với ISP để được nối mạng."],
    ["Một ví dụ đúng về chia sẻ tài nguyên qua mạng trường học là gì?", "Nhiều máy cùng dùng máy in và thư mục tài liệu", "Mỗi máy tự dùng máy in riêng mang từ nhà đến", "Máy tính không thể chia sẻ gì cho nhau", "Chia sẻ tài nguyên là một trong hai mục đích chính của mạng máy tính."],
    ["World Wide Web (WWW) và Internet có quan hệ thế nào?", "WWW là dịch vụ trên Internet", "WWW và Internet là hai tên gọi của cùng một thứ", "Internet là một phần nhỏ của WWW", "Ngoài WWW, Internet còn có thư điện tử, truyền tệp, trò chuyện trực tuyến..."],
    ["Để các máy tính trên Internet “nói chuyện” được với nhau, chúng cần tuân theo điều gì?", "Các giao thức truyền thông chung", "Cùng một hãng sản xuất", "Cùng đặt ở một thành phố", "Giao thức giống như “ngôn ngữ chung” của các máy tính."],
    ["Tình huống nào cho thấy Internet hỗ trợ học tập hiệu quả?", "Tra cứu, xem bài giảng, trao đổi bài với hướng dẫn", "Em chơi game suốt giờ học trực tuyến", "Em sao chép nguyên văn bài trên mạng nộp cho thầy cô", "Dùng Internet đúng cách, có mục đích mới phát huy lợi ích học tập."],
      ["Máy tính trong mạng có thể chia sẻ thiết bị nào?", "Máy in", "Quyển vở viết tay không số hoá", "Cốc uống nước", ""],
      ["Hai máy kết nối để trao đổi tệp tạo thành gì?", "Mạng máy tính", "Một tệp văn bản", "Một chiếc bàn", ""],
      ["Thiết bị đầu cuối nào có thể kết nối mạng?", "Điện thoại thông minh", "Bút chì", "Quyển vở giấy", ""],
      ["Kết nối có dây dùng phương tiện nào?", "Dây cáp mạng", "Sóng âm từ loa", "Giấy viết tay", ""],
      ["Kết nối không dây thường dùng gì?", "Sóng vô tuyến", "Dây cáp bắt buộc", "Mực in", ""],
      ["Một mạng trong phòng máy trường thuộc phạm vi nào?", "Mạng cục bộ", "Mạng toàn cầu bắt buộc", "Một trang web", ""],
      ["Internet kết nối các mạng trên phạm vi nào?", "Toàn cầu", "Chỉ một phòng", "Chỉ một trường", ""],
      ["Muốn vào Internet từ nhà, cần dịch vụ gì?", "Dịch vụ kết nối Internet", "Dịch vụ in văn bản", "Dịch vụ sửa bút", ""],
      ["Máy tính xách tay di chuyển trong lớp phù hợp kết nối nào?", "Không dây", "Chỉ dây cố định", "Không thể nối mạng", ""],
      ["Dùng chung thư mục qua mạng mang lại lợi ích gì?", "Trao đổi dữ liệu giữa các máy", "Xoá mọi tệp tự động", "Không cần phân quyền", ""],
      ["Internet có thuộc riêng một cá nhân không?", "Không, là mạng kết nối nhiều mạng", "Có, thuộc người tạo trang đầu tiên", "Có, thuộc mọi học sinh riêng lẻ", ""],
      ["Học trực tuyến qua Internet giúp ích gì?", "Trao đổi bài học từ xa", "Bỏ mọi giờ học", "Tự làm đúng mọi bài", ""],
      ["Thư điện tử là dịch vụ dùng trên hạ tầng nào?", "Internet", "Chỉ giấy thư", "Chỉ máy in", ""],
      ["Web và thư điện tử có điểm chung nào?", "Đều là dịch vụ trên Internet", "Đều chỉ gửi thư giấy", "Đều không cần thiết bị", ""],
      ["Khi mất Internet, em có thể tiếp tục làm gì trên máy?", "Soạn văn bản đã lưu trên máy", "Gửi thư qua mạng ngay", "Xem mọi trang web mới", ""],
      ["Máy in mạng có thể được sử dụng thế nào?", "Các máy được phép cùng sử dụng", "Chỉ máy đắt nhất được dùng", "Ai cũng dùng không cần kết nối", ""],
      ["Thiết bị kết nối mạng có vai trò gì?", "Kết nối các thiết bị để trao đổi dữ liệu", "Chỉ để chứa giấy", "Chỉ trang trí phòng", ""],
      ["Một mạng có thể nối thiết bị của các hãng khác nhau không?", "Có, khi hỗ trợ quy tắc kết nối chung", "Không bao giờ", "Chỉ khi cùng màu vỏ", ""],
      ["Khi dùng mạng trường, em nên truy cập tài liệu nào?", "Tài liệu được phép truy cập", "Mọi thư mục riêng của bạn", "Tài khoản của thầy cô", ""],
      ["Điều gì giúp thông tin trên Internet đến nhiều người?", "Khả năng kết nối và chia sẻ rộng", "Mỗi máy luôn bị tách biệt", "Mọi tệp đều in ra giấy", ""],
      ["Khi đọc tin trên Internet, em cần làm gì?", "Kiểm tra độ tin cậy của nguồn", "Tin mọi nội dung", "Chỉ tin tiêu đề giật gân", ""],
      ["Mạng không dây thuận lợi ở điểm nào?", "Thiết bị có thể di chuyển trong vùng phủ sóng", "Không bao giờ cần điện", "Luôn nhanh hơn mọi mạng dây", ""],
      ["Máy trong mạng chia sẻ dữ liệu cần chú ý điều gì?", "Quyền truy cập và bảo vệ dữ liệu", "Cho mọi người mật khẩu", "Xoá tên người sở hữu", ""],
      ["Liên lạc với người thân ở xa qua Internet là ví dụ gì?", "Lợi ích giao tiếp của Internet", "Bảo quản thực phẩm", "Đo dung lượng giấy", ""],
      ["Tìm bài giảng trên Internet thuộc lợi ích nào?", "Hỗ trợ học tập", "Thay thế giấc ngủ", "Tự động xoá bài tập", ""],
      ["Kết nối mạng có bảo đảm mọi thông tin đều đúng không?", "Không, vẫn cần kiểm chứng", "Có, luôn đúng", "Chỉ sai khi mạng chậm", ""],
      ["Muốn chia sẻ tài nguyên giữa nhiều máy, cần gì?", "Kết nối mạng và quyền sử dụng phù hợp", "Chỉ đặt máy cạnh nhau", "Chỉ đổi tên máy giống nhau", ""]
    ], [["LAN", "Mạng cục bộ phạm vi nhỏ"], ["Internet", "Mạng toàn cầu"], ["Router wifi", "Kết nối không dây và Internet"], ["WWW", "Dịch vụ web trên Internet"], ["Cáp mạng", "Kết nối có dây"], ["Wi-Fi", "Kết nối không dây"], ["Máy in mạng", "Tài nguyên dùng chung"], ["Thiết bị đầu cuối", "Máy tính, điện thoại"]], "Nối khái niệm với ý đúng nhé!"),
  topic("tin6-c4", "🔎", "Mạng thông tin toàn cầu, tìm kiếm và thư điện tử", "Chủ đề 3 • World Wide Web • Tìm kiếm thông tin • Thư điện tử", [
    ["Trang web (website) và trang thông tin (webpage) khác nhau thế nào?", "Website gồm các trang web có liên quan", "Hai khái niệm giống hệt nhau", "Website chỉ có đúng một trang", "Ví dụ: trang chủ trường em là một webpage thuộc website của trường."],
    ["Siêu liên kết (hyperlink) trên trang web có tác dụng gì?", "Chuyển tới trang hoặc nội dung được liên kết", "Trang trí cho trang web đẹp hơn", "Tăng dung lượng của trang web", "Chính các siêu liên kết nối các webpage thành “mạng nhện” WWW."],
    ["Trình duyệt web là phần mềm dùng để làm gì?", "Truy cập và hiển thị trang web", "Để soạn thảo văn bản ngoại tuyến", "Để diệt virus cho máy tính", "Muốn xem web phải có trình duyệt, địa chỉ trang web và kết nối Internet."],
    ["Địa chỉ của một trang web (URL) thường bắt đầu bằng cụm nào?", "http:// hoặc https://", "Chỉ bắt đầu bằng số điện thoại", "ftp:// luôn là duy nhất cho mọi trang", "Địa chỉ web thường dùng http:// hoặc https://, theo sau là tên miền và có thể có đường dẫn."],
    ["Máy tìm kiếm (search engine) dùng để làm gì?", "Tìm thông tin trên web theo từ khoá", "Tự động viết bài văn cho học sinh", "Lưu trữ mọi mật khẩu của người dùng", "Chọn từ khoá ngắn, trúng trọng tâm giúp kết quả tìm kiếm chính xác hơn."],
    ["Khi tìm kiếm, để thu hẹp kết quả chính xác, em nên làm gì?", "Dùng từ khoá cụ thể, đúng trọng tâm", "Gõ một chữ cái duy nhất", "Chỉ xem kết quả đầu tiên mà không kiểm chứng", "Kĩ năng chọn từ khoá là kĩ năng thông tin quan trọng."],
    ["Thư điện tử (email) là dịch vụ cho phép làm gì?", "Gửi và nhận thư qua Internet", "Gửi thư giấy không cần bưu điện", "Chỉ gửi được trong cùng một thành phố", "Địa chỉ email có dạng: tên-người-dùng@tên-miền, ví dụ an.nguyen@truong.edu.vn."],
    ["Một địa chỉ email hợp lệ có cấu trúc như thế nào?", "Tên người dùng@tên miền, ví dụ lan@gmail.com", "Chỉ gồm chữ số điện thoại", "Không cần kí tự @ nào", "Kí tự @ là dấu hiệu nhận biết địa chỉ email."],
    ["Khi nhận được email lạ hứa tặng quà và yêu cầu nhấp vào đường link lạ, em nên làm gì?", "Không mở liên kết, báo người lớn khi nghi lừa đảo", "Nhấp ngay để nhận quà", "Chuyển tiếp cho nhiều bạn cùng nhận quà", "Email lừa đảo (phishing) là chiêu trò phổ biến để đánh cắp thông tin."],
    ["Lợi ích của thư điện tử so với thư giấy truyền thống là gì?", "Gửi nhanh, có thể đính kèm tệp và gửi nhiều người", "Luôn đẹp hơn thư viết tay về mặt tình cảm", "Không cần kết nối Internet", "Tuy vậy thư viết tay vẫn có giá trị tình cảm riêng trong nhiều dịp."],
    ["Để tổ chức hộp thư gọn gàng, em nên làm gì?", "Phân loại thư, đặt tiêu đề rõ, dọn thư rác", "Để mọi thư chung một chỗ không bao giờ dọn", "Trả lời mọi thư rác nhận được", "Hộp thư ngăn nắp giúp tìm lại thông tin nhanh và an toàn hơn."],
    ["Khi viết email gửi thầy cô, em cần chú ý điều gì?", "Tiêu đề rõ, lời chào lễ phép, nội dung ngắn gọn", "Viết không dấu, không tiêu đề cho nhanh", "Dùng nhiều biểu tượng cảm xúc và chữ in hoa toàn bộ", "Thư điện tử cũng thể hiện văn hoá giao tiếp của người gửi."],
    ["Từ khoá tìm kiếm nào sau đây hiệu quả nhất để tìm “cách phòng tránh đuối nước cho học sinh”?", "“phòng tránh đuối nước học sinh”", "“nước”", "“cách”", "Từ khoá gồm nhiều từ cụ thể giúp máy tìm kiếm hiểu đúng nhu cầu."],
      ["Nhấp vào siêu liên kết trên trang web để làm gì?", "Mở nội dung được liên kết", "Luôn xoá trang hiện tại", "Luôn in toàn bộ website", ""],
      ["Ô địa chỉ của trình duyệt dùng để nhập gì?", "Địa chỉ trang web", "Mật khẩu của mọi tài khoản", "Tên máy in bắt buộc", ""],
      ["Trang chủ thường là gì?", "Trang chính của một website", "Mọi trang trên Internet", "Ổ cứng máy tính", ""],
      ["Một website có thể chứa gì?", "Nhiều trang web liên quan", "Chỉ một kí tự", "Chỉ tệp âm thanh", ""],
      ["Một trang web có thể chứa những dạng nào?", "Văn bản, hình ảnh, âm thanh và liên kết", "Chỉ chữ số", "Chỉ văn bản in trên giấy", ""],
      ["Muốn tìm thông tin, trước hết nên xác định gì?", "Nội dung cần tìm", "Màu bàn phím", "Giá máy in", ""],
      ["Từ khoá nào phù hợp tìm sơ đồ tư duy Tin học 6?", "sơ đồ tư duy Tin học 6", "máy", "em", ""],
      ["Muốn tìm lịch thi của trường, nên ưu tiên nguồn nào?", "Website hoặc thông báo chính thức của trường", "Tin nhắn người lạ", "Một quảng cáo bán hàng", ""],
      ["Kết quả tìm kiếm thường cung cấp gì?", "Liên kết và mô tả ngắn về trang phù hợp", "Mật khẩu của người đăng", "Toàn bộ dữ liệu trên ổ đĩa", ""],
      ["Không tìm thấy thông tin phù hợp, nên làm gì?", "Điều chỉnh từ khoá", "Nhập mật khẩu vào mọi trang", "Tin kết quả không liên quan", ""],
      ["Email cần biết thông tin nào để gửi đúng người?", "Địa chỉ thư điện tử người nhận", "Màu áo người nhận", "Dung lượng máy in", ""],
      ["Kí tự nào ngăn tên người dùng và tên miền email?", "@", "#", "%", ""],
      ["Địa chỉ nào có dạng email phù hợp?", "an@truong.edu.vn", "an truong edu vn", "an#truong.edu.vn", ""],
      ["Địa chỉ email có khoảng trắng ở giữa có phù hợp không?", "Không", "Có, luôn phù hợp", "Chỉ khi thư ngắn", ""],
      ["Tiêu đề email giúp người nhận biết gì?", "Nội dung chính của thư", "Mật khẩu máy tính", "Mọi tệp trên máy gửi", ""],
      ["Đính kèm thư điện tử để gửi gì?", "Tệp cùng với nội dung thư", "Cốc nước thật", "Bàn phím thật", ""],
      ["Trước khi gửi bài tập qua email, nên kiểm tra gì?", "Người nhận, nội dung và tệp đính kèm", "Chỉ màu nền hộp thư", "Chỉ số phím bàn phím", ""],
      ["Hộp thư đến chứa gì?", "Thư nhận được", "Chỉ thư chưa soạn", "Tất cả tệp của máy", ""],
      ["Thư đã gửi thường nằm ở mục nào?", "Đã gửi", "Thùng rác bắt buộc", "Tệp tải xuống", ""],
      ["Thư viết dở chưa gửi có thể lưu ở đâu?", "Bản nháp", "Hộp thư đến của bạn", "Máy in", ""],
      ["Khi dùng email trên máy chung, sau khi xong nên làm gì?", "Đăng xuất tài khoản", "Lưu mật khẩu cho mọi người", "Để hộp thư mở", ""],
      ["Nhận thư yêu cầu đưa mật khẩu, em nên làm gì?", "Không cung cấp, nhờ người lớn kiểm tra", "Gửi ngay mật khẩu", "Chuyển cho bạn làm theo", ""],
      ["Thư rác là thư như thế nào?", "Thư không mong muốn, thường gửi hàng loạt", "Mọi thư của thầy cô", "Mọi thư có tiêu đề", ""],
      ["Muốn đọc lại email quan trọng nhanh hơn, nên làm gì?", "Phân loại hoặc đánh dấu thư", "Xoá thư ngay", "Đổi mật khẩu của người gửi", ""],
      ["Khi trả lời thầy cô qua email, cách viết nào phù hợp?", "Lễ phép, rõ ràng, đúng nội dung", "Viết toàn lời xúc phạm", "Không cần người nhận", ""],
      ["Website khác trình duyệt ở điểm nào?", "Website là nội dung, trình duyệt là phần mềm xem", "Hai thứ luôn giống nhau", "Website là bàn phím", ""],
      ["Máy tìm kiếm khác trình duyệt ở điểm nào?", "Máy tìm kiếm tìm trang theo từ khoá", "Máy tìm kiếm là ổ đĩa", "Trình duyệt chỉ dùng in giấy", ""]
    ], [["Trình duyệt", "Phần mềm xem trang web"], ["Máy tìm kiếm", "Tìm thông tin theo từ khoá"], ["@", "Kí tự trong địa chỉ email"], ["Siêu liên kết", "Nhấp để chuyển trang"], ["Hộp thư đến", "Thư nhận được"], ["Bản nháp", "Thư viết dở chưa gửi"], ["Đính kèm", "Tệp gửi cùng thư"], ["Trang chủ", "Trang chính của website"]], "Nối cho đúng nhé!"),
  topic("tin6-c5", "🛡️", "An toàn thông tin trên Internet", "Chủ đề 4 • Bảo vệ thông tin cá nhân • Mật khẩu mạnh • Ứng xử văn minh, an toàn trên mạng", [
    ["Thông tin cá nhân nào sau đây TUYỆT ĐỐI không nên đăng công khai lên mạng?", "Địa chỉ nhà, mật khẩu, lịch ở nhà một mình", "Sở thích đọc sách nói chung", "Tên một bộ phim hay em thích", "Kẻ xấu có thể lợi dụng thông tin cá nhân để lừa đảo, xâm hại trẻ em."],
    ["Một mật khẩu MẠNH nên có đặc điểm gì?", "Dài, khó đoán; kết hợp nhiều loại kí tự", "Chỉ gồm ngày tháng năm sinh của em", "Giống hệt tên đăng nhập", "Mật khẩu mạnh là “lá chắn” đầu tiên bảo vệ tài khoản."],
    ["Vì sao không nên dùng chung một mật khẩu cho mọi tài khoản?", "Lộ một mật khẩu có thể làm lộ nhiều tài khoản", "Dùng chung mật khẩu thì đăng nhập nhanh hơn nên rất tốt", "Không có lí do gì đặc biệt", "Mỗi tài khoản quan trọng nên có mật khẩu riêng."],
    ["Bạn em xin mật khẩu tài khoản học trực tuyến “vì là bạn thân”. Em nên làm gì?", "Không chia sẻ mật khẩu với bạn", "Cho bạn vì bạn thân thì tin được", "Cho bạn nhưng dặn đừng nói ai", "Chia sẻ mật khẩu là nguyên nhân phổ biến khiến tài khoản bị chiếm đoạt."],
    ["Khi một người lạ kết bạn trên mạng và hỏi em học trường nào, ở đâu, em nên làm gì?", "Không cung cấp thông tin, báo bố mẹ", "Trả lời đầy đủ cho thân thiện", "Hẹn gặp người đó ngoài đời để làm quen", "Trẻ em là đối tượng cần được bảo vệ đặc biệt trên không gian mạng."],
    ["Dấu hiệu nào cho thấy một trang web/tin nhắn có thể là LỪA ĐẢO?", "Đòi nộp phí nhận thưởng hoặc nhập mật khẩu qua link lạ", "Trang web của trường thông báo lịch học", "Thư của thầy cô trong hộp thư lớp", "Luôn bình tĩnh kiểm chứng qua kênh chính thức trước khi tin và làm theo."],
    ["Bắt nạt trên mạng (cyberbullying) là hành vi như thế nào?", "Xúc phạm, tung tin xấu, gây tổn thương qua mạng", "Một trò đùa vô hại nếu nạn nhân không để ý", "Chỉ người lớn mới bị bắt nạt trên mạng", "Khi chứng kiến hoặc bị bắt nạt mạng: lưu bằng chứng, chặn, báo người lớn và nhà trường."],
    ["Em bị một tài khoản lạ liên tục nhắn tin quấy rối. Việc làm đúng là gì?", "Lưu bằng chứng, chặn, báo bố mẹ hoặc thầy cô", "Nhắn lại cãi nhau tay đôi", "Đưa số điện thoại của mình cho họ để nói chuyện rõ ràng", "Sự giúp đỡ của người lớn là lá chắn an toàn nhất cho em."],
    ["Vì sao cần đăng xuất tài khoản khi dùng máy tính chung ở trường, quán net?", "Ngăn người dùng sau truy cập tài khoản của em", "Đăng xuất làm máy chạy nhanh hơn", "Không cần đăng xuất vì máy tự quên hết", "Đăng xuất là thói quen bảo mật đơn giản nhưng rất hiệu quả."],
    ["Virus máy tính là gì và lan truyền qua đường nào?", "Mã độc có thể lây qua tệp, USB, thư đáng ngờ", "Là con vi khuẩn thật sống trong máy tính", "Virus chỉ có trong bệnh viện", "Cài phần mềm diệt virus và không mở tệp lạ giúp bảo vệ máy tính."],
    ["Khi tải ứng dụng/trò chơi trên mạng, nguyên tắc an toàn là gì?", "Tải từ nguồn chính thức, nhờ bố mẹ hướng dẫn", "Tải mọi bản “miễn phí full” từ trang lạ càng nhanh càng tốt", "Tắt phần mềm diệt virus để tải cho nhanh", "Phần mềm lậu, bẻ khoá là nguồn chứa mã độc phổ biến."],
    ["Ứng xử văn minh trên mạng gồm những điều nào?", "Lịch sự, tôn trọng, nghĩ kĩ trước khi đăng", "Bình luận càng sốc càng được nhiều like là tốt", "Dùng tài khoản ẩn danh để chửi ai cũng được", "“Hãy đối xử trên mạng như cách em muốn được đối xử ngoài đời”."],
    ["Thời gian dùng Internet thế nào là hợp lí với học sinh?", "Có giới hạn, cân bằng học tập, vận động và ngủ", "Càng nhiều càng tốt, thức khuya cũng không sao", "Chỉ cần không bị bố mẹ phát hiện", "Nghiện Internet là vấn đề sức khoẻ được nhiều bác sĩ cảnh báo ở trẻ em."],
      ["Nhận link nhận quà từ người lạ, em nên làm gì?", "Không mở, nhờ người lớn kiểm tra", "Nhập mật khẩu ngay", "Chuyển tiền nhận quà", ""],
      ["Thông tin nào không nên đưa lên bài đăng công khai?", "Mật khẩu tài khoản", "Tên một môn học yêu thích", "Tên một loài cây", ""],
      ["Người lạ hỏi giờ em ở nhà một mình, nên làm gì?", "Không cung cấp, báo người lớn tin cậy", "Nói lịch đầy đủ", "Hẹn gặp riêng", ""],
      ["Gặp nội dung làm em sợ trên mạng, nên làm gì?", "Dừng xem và kể với người lớn tin cậy", "Tiếp tục xem một mình", "Chia sẻ cho mọi bạn", ""],
      ["Bạn bị xúc phạm trên mạng, em nên làm gì?", "Động viên bạn, báo thầy cô hoặc bố mẹ", "Hùa theo trêu chọc", "Đăng thêm tin xấu", ""],
      ["Chứng kiến tin chưa kiểm chứng, em nên làm gì?", "Kiểm tra nguồn trước khi chia sẻ", "Chia sẻ ngay cho nhiều người", "Sửa tên người đăng", ""],
      ["Đăng ảnh của bạn lên mạng cần chú ý gì?", "Xin phép và tôn trọng sự riêng tư", "Không cần hỏi ai", "Đăng ảnh riêng tư để trêu", ""],
      ["Vì sao không nên gặp riêng người lạ quen qua mạng?", "Có thể gặp người có ý đồ gây hại", "Ai trên mạng cũng đáng tin", "Gặp riêng luôn an toàn", ""],
      ["Người lạ tự xưng là bạn, em nên làm gì?", "Kiểm tra với người quen qua kênh tin cậy", "Đưa mật khẩu để xác nhận", "Tin ngay ảnh đại diện", ""],
      ["Sau khi dùng tài khoản trên máy chung, nên làm gì?", "Đăng xuất", "Để tài khoản mở", "Ghi mật khẩu lên bàn", ""],
      ["Lưu mật khẩu trên máy dùng chung có nguy cơ gì?", "Người khác có thể truy cập tài khoản", "Luôn làm tài khoản an toàn hơn", "Không có nguy cơ", ""],
      ["Mật khẩu dùng tên và ngày sinh có hạn chế gì?", "Dễ bị đoán", "Không thể bị đoán", "Luôn mạnh nhất", ""],
      ["Muốn đặt mật khẩu, cách nào phù hợp?", "Dùng mật khẩu dài và khó đoán", "Dùng 123456", "Dùng đúng tên đăng nhập", ""],
      ["Bạn thân xin mật khẩu để làm bài hộ, nên làm gì?", "Từ chối và tự làm bài của mình", "Cho mật khẩu ngay", "Đăng mật khẩu vào nhóm", ""],
      ["Thư có tệp lạ không rõ nguồn, nên làm gì?", "Không mở, hỏi người lớn", "Mở thử ngay", "Tắt bảo vệ máy rồi mở", ""],
      ["Phần mềm không rõ nguồn có thể gây nguy cơ gì?", "Chứa mã độc gây hại dữ liệu", "Luôn giúp máy an toàn", "Không bao giờ ảnh hưởng máy", ""],
      ["Khi máy báo tệp có nguy cơ, em nên làm gì?", "Dừng mở tệp, nhờ người có trách nhiệm", "Bỏ qua và mở ngay", "Gửi tệp cho tất cả bạn", ""],
      ["Tôn trọng người khác trên mạng thể hiện ở đâu?", "Bình luận lịch sự", "Tung tin xúc phạm", "Chế ảnh để làm nhục", ""],
      ["Trước khi đăng một nội dung, nên tự hỏi gì?", "Có đúng, phù hợp và tôn trọng người khác không?", "Có làm ai tức giận nhất không?", "Có lộ nhiều bí mật nhất không?", ""],
      ["Thời gian online hợp lí cần bảo đảm gì?", "Học tập, vận động và nghỉ ngơi", "Chơi đến sáng", "Bỏ mọi hoạt động ngoài trời", ""],
      ["Mạng chậm có phải lí do để cung cấp mật khẩu cho người lạ?", "Không", "Có, để họ sửa ngay", "Luôn phải cung cấp", ""],
      ["Nội dung đã đăng có thể bị người khác làm gì?", "Sao chép và chia sẻ tiếp", "Không bao giờ xem lại", "Tự biến mất ở mọi nơi", ""],
      ["Khi lỡ gửi thông tin riêng cho người lạ, nên làm gì?", "Báo người lớn để được hỗ trợ kịp thời", "Giấu vì sợ bị mắng", "Gửi thêm thông tin", ""],
      ["Tin nhắn thúc giục nộp tiền ngay cần xử lí thế nào?", "Bình tĩnh kiểm chứng với người lớn", "Chuyển tiền trước rồi hỏi", "Đưa tài khoản cho họ", ""],
      ["Người lớn nào có thể giúp khi gặp rủi ro trên mạng?", "Bố mẹ hoặc thầy cô tin cậy", "Người lạ xin mật khẩu", "Tài khoản đang quấy rối", ""],
      ["Quấy rối trên mạng có nên giữ bằng chứng không?", "Có, lưu lại và nhờ người lớn hỗ trợ", "Không, phải xoá hết ngay", "Chỉ giữ để trả đũa", ""],
      ["Khi bị bắt nạt mạng, lỗi có phải luôn ở người bị hại không?", "Không, cần hỗ trợ và bảo vệ người bị hại", "Có, phải im lặng", "Có, không được kể ai", ""]
    ], [["Mật khẩu mạnh", "Dài, có chữ hoa/thường, số, kí tự đặc biệt"], ["Tổng đài, người lớn tin cậy", "Nơi nhờ giúp khi gặp nguy hiểm online"], ["Virus máy tính", "Chương trình độc hại"], ["Bắt nạt mạng", "Xúc phạm người khác qua mạng"], ["Đăng xuất", "Bảo vệ khi dùng máy chung"], ["Link lạ", "Không mở, nhờ người lớn kiểm tra"], ["Thông tin riêng tư", "Không đăng công khai"], ["Nguồn tải chính thức", "Giảm nguy cơ tải mã độc"]], "Nối cho đúng nhé!"),
  topic("tin6-c6", "📝", "Sơ đồ tư duy và trình bày văn bản", "Chủ đề 5 • Sơ đồ tư duy • Định dạng văn bản • Trình bày dạng bảng • Tìm kiếm và thay thế", [
    ["Sơ đồ tư duy (mind map) là gì?", "Sơ đồ có chủ đề trung tâm và các nhánh ý", "Là bản đồ địa lí của trường học", "Là một đoạn văn dài không có hình vẽ", "Sơ đồ tư duy kết hợp từ khoá, màu sắc và hình ảnh nên rất dễ nhớ."],
    ["Trong sơ đồ tư duy, các nhánh chính xuất phát từ đâu?", "Từ chủ đề trung tâm ở giữa sơ đồ", "Từ góc dưới bên phải trang giấy", "Từ một danh sách không liên quan", "Nhánh chính to, nhánh phụ nhỏ dần theo mức độ chi tiết của ý."],
    ["Phần mềm/soạn thảo văn bản dùng để làm gì?", "Tạo, chỉnh sửa, lưu và in văn bản", "Chỉ để chơi trò xếp hình", "Để vẽ bản đồ tư duy bắt buộc bằng tay", "Ví dụ phần mềm soạn thảo: Microsoft Word và các trình soạn thảo tương tự."],
    ["Định dạng văn bản gồm những thao tác phổ biến nào?", "Định dạng kí tự, đoạn văn và trang văn bản", "Xoá toàn bộ văn bản", "Đổi tên máy tính", "Định dạng đúng giúp văn bản rõ ràng, đẹp và dễ đọc."],
    ["Để làm cho tiêu đề nổi bật giữa trang, thao tác hợp lí là gì?", "Tăng cỡ chữ, in đậm và căn giữa tiêu đề", "Viết tiêu đề bằng chữ thường nhất trang", "Để tiêu đề lẫn vào đoạn văn bình thường", "Tiêu đề là phần người đọc nhìn thấy đầu tiên."],
    ["Trình bày thông tin dạng BẢNG có lợi ích gì?", "Sắp theo hàng, cột để dễ so sánh, tra cứu", "Làm văn bản dài hơn không cần thiết", "Chỉ để trang trí", "Dữ liệu có cấu trúc hàng/cột nên trình bày bằng bảng."],
    ["Trong bảng, giao của một hàng và một cột gọi là gì?", "Một ô của bảng", "Một trang bảng tính", "Một đoạn văn", "Ta có thể chèn thêm hàng, cột hoặc xoá, gộp ô khi cần."],
    ["Công cụ “Tìm kiếm” (Find) trong soạn thảo văn bản dùng để làm gì?", "Tìm vị trí của từ hoặc cụm từ trong văn bản", "Tìm trang web trên Internet", "Tìm tệp đã xoá trong thùng rác", "Phím tắt quen thuộc: Ctrl + F."],
    ["Công cụ “Thay thế” (Replace) khác “Tìm kiếm” ở điểm nào?", "Tìm và đổi từ hoặc cụm từ thành nội dung khác", "Replace chỉ đổi màu chữ", "Replace là tên khác của Find, không khác gì", "Ví dụ: thay mọi từ “hs” thành “học sinh” trong một văn bản dài."],
    ["Trước khi in văn bản, thao tác nào giúp tránh lãng phí giấy và mực?", "Xem trước bản in, kiểm tra bố cục và lỗi", "In thử nhiều bản cho chắc", "In luôn không cần xem lại", "Xem trước bản in là bước không thể thiếu khi trình bày văn bản."],
    ["Khi soạn một bài trình bày về “Trường em”, bố cục hợp lí gồm những phần nào?", "Mở bài, thân bài và kết bài", "Chỉ viết một đoạn duy nhất không xuống dòng", "Viết các câu rời rạc không theo thứ tự nào", "Văn bản có bố cục rõ ràng giúp người đọc theo dõi dễ dàng."],
    ["Sơ đồ tư duy giúp ích nhất cho việc nào sau đây?", "Tóm tắt, ôn tập các ý liên quan", "Thay thế hoàn toàn việc đọc sách giáo khoa", "Vẽ tranh giải trí không cần nội dung", "Nhiều học sinh dùng sơ đồ tư duy để ôn thi rất hiệu quả."],
    ["Tổ hợp phím nào thường dùng để LƯU văn bản đang soạn?", "Ctrl + S", "Ctrl + P", "Alt + F4 (đóng cửa sổ)", "Thường xuyên lưu bài giúp tránh mất dữ liệu khi máy gặp sự cố."],
      ["Chủ đề trung tâm của sơ đồ tư duy thường đặt ở đâu?", "Ở giữa sơ đồ", "Ngoài tờ giấy", "Trong thùng rác", ""],
      ["Nhánh của sơ đồ tư duy thể hiện gì?", "Các ý liên quan đến chủ đề", "Mật khẩu máy tính", "Tên mọi website", ""],
      ["Từ khoá trong sơ đồ tư duy nên như thế nào?", "Ngắn gọn, nêu ý chính", "Dài bằng cả trang sách", "Không liên quan chủ đề", ""],
      ["Màu sắc, hình ảnh trong sơ đồ tư duy có ích gì?", "Giúp phân biệt và ghi nhớ các ý", "Thay toàn bộ nội dung", "Làm máy tự sửa bài", ""],
      ["Muốn sửa nội dung văn bản, em dùng loại phần mềm nào?", "Soạn thảo văn bản", "Diệt virus", "Trình phát nhạc", ""],
      ["In đậm là thao tác thuộc nhóm nào?", "Định dạng kí tự", "Xoá tệp", "Kết nối mạng", ""],
      ["Đổi cỡ chữ tác động đến điều gì?", "Kích thước chữ hiển thị", "Tên người nhận email", "Dung lượng ổ cứng", ""],
      ["Đổi phông chữ để làm gì?", "Thay kiểu dáng chữ", "Xoá văn bản", "Chuyển sang mạng không dây", ""],
      ["Căn giữa đoạn văn thuộc thao tác nào?", "Định dạng đoạn văn", "Đổi mật khẩu", "Tìm website", ""],
      ["Đặt lề trang thuộc nhóm nào?", "Định dạng trang văn bản", "Chọn mạng Wi-Fi", "Đổi tên máy", ""],
      ["Muốn định dạng một đoạn chữ, trước hết thường làm gì?", "Chọn phần chữ cần định dạng", "Xoá mọi chữ", "Tắt máy tính", ""],
      ["Thời khoá biểu phù hợp trình bày dưới dạng nào?", "Bảng", "Một câu không dấu", "Danh sách âm thanh", ""],
      ["Bảng được tổ chức bởi những thành phần nào?", "Hàng, cột và ô", "Chỉ các nhánh cây", "Chỉ đoạn âm thanh", ""],
      ["Giao của hàng và cột là gì?", "Ô", "Trang", "Tệp", ""],
      ["Bảng 3 hàng, 4 cột có bao nhiêu ô nếu không gộp?", "12 ô", "7 ô", "1 ô", ""],
      ["Bảng 2 hàng, 5 cột có bao nhiêu ô nếu không gộp?", "10 ô", "7 ô", "25 ô", ""],
      ["Muốn thêm tên một bạn vào bảng danh sách, có thể làm gì?", "Chèn một hàng", "Xoá cả bảng", "Đổi phông máy tính", ""],
      ["Muốn thêm cột điểm vào bảng, nên làm gì?", "Chèn một cột", "Xoá tệp", "Tắt màn hình", ""],
      ["Tìm kiếm trong văn bản giúp tiết kiệm gì?", "Thời gian tìm từ hoặc cụm từ", "Mọi dung lượng ổ đĩa", "Toàn bộ điện của trường", ""],
      ["Muốn đổi nhiều chỗ viết “hs” thành “học sinh”, dùng gì?", "Tìm kiếm và thay thế", "Chỉ in văn bản", "Đổi mật khẩu", ""],
      ["Trước khi thay thế tất cả, nên kiểm tra gì?", "Từ cần tìm và nội dung thay thế", "Tên máy in của bạn", "Màu vỏ máy", ""],
      ["Thay thế sai từ có thể gây hậu quả gì?", "Làm thay đổi nội dung văn bản ngoài ý muốn", "Luôn làm nội dung đúng", "Không thay đổi gì", ""],
      ["Ctrl + F thường mở chức năng nào?", "Tìm kiếm", "Lưu", "In", ""],
      ["Ctrl + S thường thực hiện thao tác nào?", "Lưu văn bản", "In văn bản", "Xoá mọi tệp", ""],
      ["Ctrl + P thường mở thao tác nào?", "In văn bản", "Lưu văn bản", "Đổi mật khẩu", ""],
      ["Vì sao cần lưu bài trong khi soạn?", "Giảm nguy cơ mất phần đã làm", "Để khỏi đọc lại", "Để tự tăng điểm", ""],
      ["Muốn văn bản rõ ràng, nên làm gì?", "Định dạng nhất quán, bố cục hợp lí", "Mỗi chữ một cỡ bất kì", "Không xuống dòng bao giờ", ""]
    ], [["Sơ đồ tư duy", "Chủ đề giữa, các nhánh ý"], ["Ctrl + F", "Tìm kiếm trong văn bản"], ["Bảng", "Trình bày theo hàng – cột"], ["Ctrl + S", "Lưu văn bản"], ["Ctrl + P", "In văn bản"], ["Thay thế", "Tìm và đổi nội dung"], ["Ô", "Giao của hàng và cột"], ["Cỡ chữ", "Kích thước chữ hiển thị"]], "Nối cho đúng nhé!"),
  (function () { var kp = knowledgePools([
      ["Thuật toán là gì?", "Dãy chỉ dẫn rõ ràng, hữu hạn để giải quyết nhiệm vụ", "Là một trò chơi trên máy tính", "Là tên một ngôn ngữ lập trình", "Ví dụ thuật toán pha trà, thuật toán nấu cơm, thuật toán tính tổng hai số."],
      ["Vì sao thuật toán phải có tính DỪNG (hữu hạn)?", "Để kết thúc sau hữu hạn bước và thu được kết quả", "Vì máy tính chỉ chạy được 10 bước", "Không cần dừng cũng được", "Thuật toán không kết thúc thì không giải quyết được vấn đề."],
      ["Cấu trúc TUẦN TỰ trong thuật toán là gì?", "Các bước được thực hiện lần lượt theo thứ tự", "Bước sau chọn làm hay không tuỳ điều kiện", "Một bước lặp lại nhiều lần", "Hầu hết công việc hằng ngày (đánh răng, mặc quần áo) là thuật toán tuần tự."],
      ["Cấu trúc RẼ NHÁNH (điều kiện) có dạng thế nào?", "Chọn việc thực hiện theo điều kiện đúng hoặc sai", "Lặp một việc đúng 10 lần", "Làm các việc theo thứ tự cố định", "Ví dụ: Nếu trời mưa thì mang ô, ngược lại thì đội mũ."],
      ["Cấu trúc LẶP dùng trong trường hợp nào?", "Khi cần thực hiện một việc nhiều lần", "Khi chỉ làm việc đó đúng một lần duy nhất", "Khi không biết làm gì tiếp theo", "Ví dụ: lặp việc tưới từng chậu cây cho đến khi hết các chậu."],
      ["Sơ đồ khối (lưu đồ) thuật toán dùng hình Ô-VAN (elíp) để biểu diễn điều gì?", "Bắt đầu hoặc kết thúc thuật toán", "Phép so sánh điều kiện", "Thao tác nhập/xuất dữ liệu", "Hình thoi trong sơ đồ khối biểu diễn bước kiểm tra điều kiện."],
      ["Chương trình máy tính là gì?", "Thuật toán viết bằng ngôn ngữ lập trình", "Là danh sách bài hát trong máy", "Là quyển sách hướng dẫn dùng máy", "Con người viết chương trình để “ra lệnh” cho máy tính làm việc."],
      ["Trong thuật toán “nấu cơm điện”, bước nào là bước KIỂM TRA điều kiện (rẽ nhánh)?", "Kiểm tra cơm chín hay chưa", "Vo gạo bỏ vào nồi", "Đong nước vào nồi", "Nhận diện cấu trúc điều khiển trong thuật toán đời thường là kĩ năng quan trọng."],
      ["Thuật toán sắp xếp nổi bong bóng, thuật toán tìm kiếm... thuộc lĩnh vực nào?", "Tin học và lập trình", "Là thuật toán nấu ăn", "Là trò chơi dân gian", "Lớp 6 mới làm quen, các lớp trên sẽ học sâu hơn."],
      ["Một thuật toán tốt cần có những tính chất nào?", "Bước rõ ràng, hữu hạn, cho kết quả đúng", "Càng dài càng tốt", "Bước nào làm trước cũng được, tuỳ hứng", "Tính xác định: mỗi bước phải rõ ràng để ai thực hiện cũng cho cùng kết quả."],
      ["Khi em “dạy” rô-bốt hút bụi tránh vật cản: “Nếu gặp vật cản thì quay lại”, đó là cấu trúc nào?", "Cấu trúc rẽ nhánh", "Cấu trúc tuần tự thuần tuý", "Không phải cấu trúc nào", "Điều kiện đúng/sai quyết định hành động tiếp theo — đặc trưng của rẽ nhánh."],
      ["Việc giặt quần áo bằng máy giặt theo chu trình: giặt → xả (lặp 2–3 lần) → vắt, thể hiện cấu trúc nào nổi bật?", "Cấu trúc lặp", "Chỉ có cấu trúc rẽ nhánh", "Không có cấu trúc điều khiển", "Nhiều thiết bị gia đình hoạt động theo thuật toán có cấu trúc lặp."],
      ["Thuật toán cần mô tả các bước như thế nào?", "Rõ ràng và theo trình tự", "Mập mờ tuỳ người đoán", "Không cần thứ tự", ""],
      ["Đầu vào của bài toán cộng hai số là gì?", "Hai số cần cộng", "Tổng đã tính xong", "Tên máy in", ""],
      ["Đầu ra của bài toán cộng hai số là gì?", "Tổng hai số", "Hai số chưa cộng", "Mật khẩu máy", ""],
      ["Mũi tên trong sơ đồ khối thường chỉ điều gì?", "Hướng thực hiện các bước", "Dung lượng tệp", "Tên tác giả", ""],
      ["Hình thoi trong sơ đồ khối biểu diễn gì?", "Kiểm tra điều kiện", "Bắt đầu", "Nhập dữ liệu", ""],
      ["Hình chữ nhật trong sơ đồ khối thường biểu diễn gì?", "Bước xử lí", "Điều kiện đúng sai", "Bắt đầu và kết thúc", ""],
      ["Hình bình hành trong sơ đồ khối thường biểu diễn gì?", "Nhập hoặc xuất dữ liệu", "Kiểm tra điều kiện", "Kết thúc bắt buộc", ""],
      ["Hình ô-van trong sơ đồ khối thường biểu diễn gì?", "Bắt đầu hoặc kết thúc", "Phép so sánh", "Nhập một số", ""],
      ["Làm lần lượt A rồi B rồi C là cấu trúc gì?", "Tuần tự", "Lặp", "Rẽ nhánh", ""],
      ["Nếu trời mưa thì mang áo mưa thể hiện cấu trúc gì?", "Rẽ nhánh", "Chỉ tuần tự", "Chỉ lặp", ""],
      ["Tưới từng chậu cho đến hết các chậu là cấu trúc gì?", "Lặp", "Chỉ rẽ nhánh", "Không có cấu trúc", ""],
      ["Lặp 4 lần việc cộng thêm 2, từ 0 được kết quả nào?", "8", "6", "2", ""],
      ["Lặp 3 lần việc cộng thêm 5, từ 0 được kết quả nào?", "15", "8", "5", ""],
      ["Nếu x lớn hơn 10 thì báo “lớn”; x = 12 báo gì?", "lớn", "nhỏ", "bằng", ""],
      ["Nếu x lớn hơn 10 thì báo “lớn”, ngược lại “không lớn”; x = 8 báo gì?", "không lớn", "lớn", "không có kết quả", ""],
      ["Nhập a và b, tính s = a + b, rồi hiển thị s thuộc cấu trúc nào?", "Tuần tự", "Chỉ lặp", "Chỉ rẽ nhánh", ""],
      ["Điều kiện trong rẽ nhánh có thể nhận kết quả nào?", "Đúng hoặc sai", "Chỉ đúng", "Chỉ sai", ""],
      ["Rẽ nhánh dạng thiếu có đặc điểm gì?", "Chỉ thực hiện việc khi điều kiện đúng", "Luôn làm hai việc cùng lúc", "Bắt buộc lặp vô hạn", ""],
      ["Rẽ nhánh dạng đủ có đặc điểm gì?", "Chọn một trong hai việc theo điều kiện", "Luôn không làm gì", "Không cần điều kiện", ""],
      ["Lặp cần chú ý điều gì để thuật toán kết thúc?", "Số lần lặp hoặc điều kiện dừng", "Màu sơ đồ", "Tên người chơi", ""],
      ["Trước khi viết chương trình, cần xác định gì?", "Bài toán và thuật toán giải quyết", "Màu chuột", "Số lượng bàn học", ""],
      ["Chạy thử chương trình nhằm mục đích gì?", "Kiểm tra kết quả và phát hiện lỗi", "Luôn tăng dung lượng tệp", "Thay tên tác giả", ""],
      ["Chương trình cho kết quả sai, nên làm gì?", "Kiểm tra và sửa lỗi rồi chạy thử", "Kết luận máy luôn sai", "Giấu kết quả", ""],
      ["Một thuật toán có thể mô tả bằng cách nào?", "Liệt kê bước hoặc sơ đồ khối", "Chỉ bằng màu nền", "Chỉ bằng tiếng còi", ""],
      ["Đổi thứ tự các bước thuật toán có thể dẫn tới gì?", "Kết quả sai hoặc không thực hiện được", "Luôn đúng hơn", "Không bao giờ ảnh hưởng", ""],
      ["Điều kiện “a > b” khi a = 3, b = 5 có kết quả gì?", "Sai", "Đúng", "Không thể biết", ""],
      ["Điều kiện “a > b” khi a = 7, b = 2 có kết quả gì?", "Đúng", "Sai", "Không thể biết", ""]
    ], [["Tuần tự", "Làm lần lượt từng bước"], ["Rẽ nhánh", "Nếu... thì... ngược lại..."], ["Lặp", "Làm lại nhiều lần"], ["Hình thoi (sơ đồ khối)", "Kiểm tra điều kiện"], ["Hình ô-van", "Bắt đầu hoặc kết thúc"], ["Hình chữ nhật", "Bước xử lí"], ["Hình bình hành", "Nhập hoặc xuất dữ liệu"], ["Mũi tên", "Hướng thực hiện"]], "Nối cấu trúc với ý đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước của thuật toán ĐÁNH RĂNG theo đúng thứ tự!", ["Lấy kem lên bàn chải", "Chải răng kĩ các mặt", "Súc miệng sạch", "Rửa bàn chải, cất gọn"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các bước giải một bài toán bằng máy tính theo đúng thứ tự!", ["Xác định bài toán (đầu vào, đầu ra)", "Xây dựng thuật toán", "Viết chương trình", "Chạy thử và kiểm tra kết quả"]); });
    return { id: "tin6-c7", emoji: "🤖", name: "Thuật toán và chương trình máy tính", sub: "Chủ đề 6 • Thuật toán • Ba cấu trúc điều khiển: tuần tự, rẽ nhánh, lặp • Chương trình máy tính", pools: kp }; })()
];
/* ================= CÔNG NGHỆ 6 — 4 chương ================= */
var CN6_TOPICS = [
  (function () { var kp = knowledgePools([
      ["Nhà ở có vai trò gì đối với con người?", "Là nơi ở, sinh hoạt, nghỉ ngơi và che chở cho con người", "Chỉ là nơi để đồ đạc", "Không quan trọng, ở đâu cũng được", "Nhà ở là tài sản và không gian sống quan trọng nhất của mỗi gia đình."],
      ["Một ngôi nhà thường gồm những khu vực chức năng chính nào?", "Sinh hoạt chung, nghỉ ngơi, bếp ăn, khu vệ sinh – tắm giặt", "Chỉ gồm một phòng duy nhất cho mọi việc", "Chỉ gồm phòng ngủ", "Bố trí các khu vực hợp lí giúp sinh hoạt thuận tiện, vệ sinh."],
      ["Khu vực nào trong nhà cần ưu tiên thông thoáng, có ánh sáng và tránh ẩm mốc nhất cho sức khoẻ?", "Phòng ngủ, phòng khách — nơi nghỉ ngơi, sinh hoạt chung", "Nhà kho chứa đồ cũ", "Gầm cầu thang", "Thông gió và ánh sáng tự nhiên tốt cho sức khoẻ của mọi thành viên."],
      ["Vật liệu xây dựng nhà ở phổ biến truyền thống và hiện đại gồm những gì?", "Gỗ, tre, gạch, đá, xi măng, thép, kính...", "Chỉ có lá và đất sét", "Chỉ có nhựa", "Mỗi vùng miền chọn vật liệu phù hợp khí hậu và điều kiện địa phương (nhà sàn ở miền núi, nhà bè ở vùng sông nước...)."],
      ["Nhà sàn là kiểu nhà đặc trưng của vùng nào và có ưu điểm gì?", "Vùng núi, vùng hay ngập lụt; sàn cao tránh ẩm, thú dữ", "Vùng sa mạc khô cằn", "Trung tâm thành phố lớn", "Nhà sàn là sáng tạo thích nghi với tự nhiên của đồng bào miền núi."],
      ["Ngôi nhà thông minh (smart home) có đặc điểm gì?", "Có thiết bị điều khiển tự động/từ xa, tiện nghi, an toàn", "Nhà xây hoàn toàn bằng kính", "Nhà không cần điện vẫn tự sáng", "Hệ thống nhà thông minh hoạt động nhờ cảm biến và kết nối mạng."],
      ["Thiết bị nào sau đây thuộc hệ thống nhà thông minh?", "Đèn tự bật khi trời tối; chuông cửa có camera", "Cái chổi quét nhà thông thường", "Bàn ghế gỗ trong phòng khách", "“Thông minh” nằm ở khả năng tự động hoá và điều khiển, không phải ở mọi đồ vật trong nhà."],
      ["Khi xây dựng nhà ở cần đảm bảo những yêu cầu cơ bản nào?", "Bền chắc, an toàn, phù hợp nhu cầu, tiết kiệm chi phí", "Càng to càng tốt bất kể nhu cầu", "Chỉ cần đẹp bên ngoài", "An toàn kết cấu là yêu cầu quan trọng nhất của một ngôi nhà."],
      ["Vì sao nhà ở cần có hệ thống cấp thoát nước và xử lí rác thải hợp lí?", "Giữ vệ sinh, bảo vệ sức khoẻ và môi trường sống", "Chỉ để nhà trông hiện đại hơn", "Không quan trọng đối với sức khoẻ", "Nhà ở văn minh gắn liền với vệ sinh môi trường sống."],
      ["Hành động nào giúp ngôi nhà luôn gọn gàng, thoáng mát?", "Sắp xếp đồ ngăn nắp, vệ sinh thường xuyên, mở cửa đón gió", "Để đồ đạc chất đống khắp nhà", "Đóng kín mọi cửa cả ngày lẫn đêm", "Không gian sống sạch sẽ giúp tinh thần thoải mái, học tập tốt hơn."],
      ["Phong cách kiến trúc nhà ở Việt Nam có đặc điểm gì đáng chú ý?", "Đa dạng theo vùng miền: nhà ba gian, nhà sàn, nhà phố", "Cả nước chỉ có đúng một kiểu nhà", "Nhà ở Việt Nam sao chép hoàn toàn nước ngoài", "Khí hậu nhiệt đới gió mùa ảnh hưởng lớn đến kiến trúc nhà ở nước ta (mái dốc thoát nước mưa, nhà thoáng mát)."],
      ["Về mặt an toàn, hệ thống điện của một ngôi nhà mới xây cần được làm gì trước khi đưa vào sử dụng?", "Phải được kiểm tra, nghiệm thu bởi người có chuyên môn", "Cứ cắm điện dùng thử ngay không cần kiểm tra", "Tự ý đấu nối điện tổng cho nhanh xong", "An toàn điện là yêu cầu bắt buộc trong xây dựng và sử dụng nhà ở."],
      ["Vì sao khi thiết kế nhà ở người ta quan tâm đến hướng nhà và hướng gió?", "Đón gió mát, tránh nắng gắt, tận dụng ánh sáng tự nhiên", "Chỉ vì lí do thẩm mĩ, không liên quan đến tiện nghi", "Hướng nhà không ảnh hưởng gì đến sinh hoạt", "Ở Việt Nam, nhà hướng Nam thường được ưa chuộng vì mát về mùa hè, ấm về mùa đông."],

      ["Một ngôi nhà thường có những bộ phận cấu tạo chính nào?", "Móng, tường, mái, sàn, cửa ra vào và cửa sổ", "Chỉ có mái và cửa", "Chỉ có tường và sân", "Các bộ phận này tạo nên khung và không gian của ngôi nhà."],

      ["Móng nhà có vai trò gì?", "Đỡ toàn bộ trọng lượng ngôi nhà, giúp nhà vững chắc", "Để trang trí cho đẹp", "Không có vai trò gì", "Móng chắc thì nhà mới bền lâu."],

      ["Bước đầu tiên trong quy trình xây dựng một ngôi nhà là gì?", "Thiết kế nhà ở — lập bản vẽ thiết kế", "Sơn tường hoàn thiện", "Bàn giao nhà cho chủ", "Thiết kế → chuẩn bị → thi công thô → hoàn thiện → nghiệm thu."],

      ["Thi công phần thô khi xây nhà gồm những công việc chính nào?", "Làm móng, dựng khung, xây tường, làm mái", "Sơn và lắp nội thất", "Dọn vệ sinh, trang trí", "Phần thô là khung xương quyết định độ bền của ngôi nhà."],

      ["Cảm biến trong ngôi nhà thông minh có nhiệm vụ gì?", "Thu nhận thông tin về ánh sáng, nhiệt độ, chuyển động", "Trang trí cho tường nhà", "Thay thế hoàn toàn con người", "Nhờ cảm biến, hệ thống tự bật/tắt thiết bị đúng lúc."],

      ["Hệ thống an ninh, an toàn trong nhà thông minh thường gồm những gì?", "Camera, khoá cửa thông minh, cảm biến báo cháy", "Chỉ có một chiếc chìa khoá thường", "Hàng rào bằng tre", "Camera và cảm biến giúp phát hiện sớm trộm và cháy nổ."],

      ["Ngôi nhà thông minh giúp tiết kiệm năng lượng bằng cách nào?", "Tự tắt đèn, điều hoà khi không có người sử dụng", "Bật mọi thiết bị cả ngày", "Dùng đèn sợi đốt công suất lớn", "Tự động hoá giúp tránh lãng phí điện không cần thiết."],

      ["Chuông cửa thông minh giúp chủ nhà làm được điều gì?", "Nhìn thấy và trò chuyện với khách qua điện thoại", "Tự nấu cơm cho khách", "Mở cửa cho bất cứ ai đến", "Chủ nhà vắng nhà vẫn quan sát được khu vực cửa ra vào."],

      ["Khi bố trí khu vực bếp trong nhà cần lưu ý điều gì?", "Thông thoáng, đủ sáng, tiện cấp và thoát nước", "Kín mít, không cần cửa sổ", "Đặt cạnh kho chứa xăng dầu", "Bếp thoáng khí giúp thoát khói, mùi và an toàn cháy nổ."],

      ["Nhà ở nông thôn khác nhà ở đô thị phổ biến ở điểm nào?", "Nông thôn thấp tầng, có sân vườn; đô thị cao tầng hơn", "Nông thôn toàn nhà cao tầng", "Hai loại hoàn toàn giống hệt nhau", "Điều kiện đất đai và sinh hoạt tạo nên sự khác biệt này."]
    ], [["Nhà sàn", "Vùng núi, vùng ngập lụt"], ["Nhà thông minh", "Thiết bị điều khiển tự động"], ["Phòng khách", "Sinh hoạt chung, tiếp khách"], ["Bếp", "Nơi nấu nướng, ăn uống"], ["Móng nhà", "Đỡ trọng lượng ngôi nhà"], ["Mái nhà", "Che mưa nắng cho ngôi nhà"], ["Cảm biến", "Thu nhận thông tin, điều khiển thiết bị"], ["Phòng ngủ", "Nơi nghỉ ngơi của gia đình"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước XÂY DỰNG một ngôi nhà theo đúng thứ tự!", ["Thiết kế bản vẽ", "Chuẩn bị vật liệu, nhân công", "Thi công phần thô (móng, khung, mái)", "Hoàn thiện (sơn, lắp thiết bị)", "Nghiệm thu và bàn giao"]); });
    return { id: "cn6-c1", emoji: "🏠", name: "Nhà ở", sub: "Chương 1 • Khái quát về nhà ở • Xây dựng nhà ở • Ngôi nhà thông minh", pools: kp }; })(),
  topic("cn6-c2", "🥦", "Bảo quản và chế biến thực phẩm", "Chương 2 • Thực phẩm và dinh dưỡng • Phương pháp bảo quản • Phương pháp chế biến", [
    ["Thực phẩm cung cấp cho cơ thể những nhóm chất dinh dưỡng chính nào?", "Chất đạm, chất béo, tinh bột – đường, vitamin, khoáng chất", "Chỉ có nước và chất xơ", "Chỉ có tinh bột", "Ăn đa dạng thực phẩm giúp cơ thể đủ chất để phát triển."],
    ["Nhóm thực phẩm nào giàu CHẤT ĐẠM (protein) nhất?", "Thịt, cá, trứng, sữa, đậu đỗ", "Rau xanh và trái cây", "Cơm, bánh mì", "Chất đạm giúp xây dựng và phát triển cơ thể, rất cần cho tuổi đang lớn."],
    ["Vitamin và chất khoáng có nhiều trong nhóm thực phẩm nào?", "Rau xanh, củ quả và trái cây tươi", "Đường kính và kẹo ngọt", "Mỡ động vật", "“Ăn nhiều rau xanh” là lời khuyên dinh dưỡng quen thuộc cho học sinh."],
    ["Bảo quản thực phẩm bằng tủ lạnh dựa trên nguyên tắc nào?", "Nhiệt độ thấp làm chậm vi sinh vật phát triển", "Ánh sáng trong tủ lạnh diệt mọi vi khuẩn ngay lập tức", "Thực phẩm để tủ lạnh thì không bao giờ hỏng", "Dù để tủ lạnh, thực phẩm vẫn phải dùng trong thời gian hợp lí."],
    ["Phương pháp bảo quản thực phẩm truyền thống nào dùng muối hoặc đường?", "Ướp muối, làm mứt bằng đường, muối chua rau củ", "Luộc chín rồi để ngoài trời", "Phơi trên mái nhà nhiều tháng không thu dọn", "Muối và đường nồng độ cao làm vi sinh vật khó phát triển."],
    ["Phơi khô, sấy khô là phương pháp bảo quản dựa trên nguyên tắc gì?", "Làm giảm nước trong thực phẩm, vi sinh vật khó phát triển", "Làm tăng lượng nước trong thực phẩm", "Thay đổi màu sắc thực phẩm", "Cá khô, mực khô, măng khô... là sản phẩm của phương pháp này."],
    ["Vì sao thực phẩm chế biến xong nên ăn ngay hoặc bảo quản đúng cách?", "Để lâu, vi sinh vật phát triển làm ôi thiu, gây ngộ độc", "Vì thức ăn để lâu sẽ ngon hơn", "Không có lí do nào quan trọng", "Ngộ độc thực phẩm là nguy cơ sức khoẻ nghiêm trọng, nhất là với trẻ em."],
    ["Chế biến thực phẩm bằng phương pháp LUỘC có ưu điểm gì?", "Giữ nhiều dinh dưỡng, ít dầu mỡ, dễ tiêu hoá", "Làm thực phẩm nhiều dầu mỡ hơn", "Luộc là cách chế biến cầu kì nhất", "Hấp cũng là cách chế biến giữ dinh dưỡng tốt tương tự luộc."],
    ["Khi chế biến món ăn, việc nào đảm bảo an toàn vệ sinh thực phẩm?", "Rửa tay, rửa sạch nguyên liệu, thớt riêng sống – chín", "Dùng chung một thớt cho thịt sống và rau ăn sống", "Nếm thử thịt sống xem đã ướp vừa chưa", "Đồ sống chín lẫn lộn là nguyên nhân phổ biến gây ngộ độc."],
    ["Bữa ăn hợp lí cho học sinh cần đảm bảo điều gì?", "Đủ 4 nhóm chất, đa dạng món, không bỏ bữa sáng", "Chỉ ăn món mình thích nhất", "Ăn càng nhiều thịt càng tốt, không cần rau", "Bữa sáng là bữa quan trọng cung cấp năng lượng cho buổi học."],
    ["Đồ hộp (thực phẩm đóng hộp) bảo quản được lâu nhờ đâu?", "Được tiệt trùng và đóng kín, ngăn vi sinh vật xâm nhập", "Nhờ có nhiều chất bảo quản độc hại luôn tốt", "Nhờ hộp kim loại có phép thuật giữ tươi", "Khi dùng đồ hộp cần kiểm tra hạn sử dụng và hộp có bị phồng, rỉ hay không."],
    ["Hành động nào giúp giảm lãng phí thực phẩm trong gia đình?", "Mua, nấu vừa đủ ăn; bảo quản thức ăn thừa đúng cách", "Nấu thật nhiều cho sang rồi bỏ đi", "Vứt bỏ mọi thức ăn thừa ngay không cần bảo quản", "Lãng phí thực phẩm cũng là lãng phí tài nguyên của xã hội."],
    ["Dấu hiệu nào cho thấy thực phẩm đã bị hỏng, không nên ăn?", "Có mùi ôi, chua lạ; nhớt, đổi màu; nấm mốc xuất hiện", "Thực phẩm vừa mua ở chợ về", "Thực phẩm còn nguyên trong tủ lạnh mới một ngày", "Ngửi, quan sát là cách nhận biết ban đầu; tuyệt đối không nếm thử thực phẩm nghi hỏng."],

    ["Chế biến thực phẩm KHÔNG sử dụng nhiệt gồm những cách nào?", "Trộn gỏi/nộm, muối chua, ướp gia vị, ép nước quả", "Luộc, hấp, nướng", "Chiên, rán trong dầu nóng", "Món không dùng nhiệt giữ được vitamin nhạy cảm với nhiệt."],

    ["Muối chua dưa, cà thuộc nhóm phương pháp chế biến nào?", "Chế biến không dùng nhiệt, nhờ quá trình lên men chua", "Chế biến bằng nhiệt khô", "Đông lạnh thực phẩm", "Lên men chua tạo môi trường ức chế vi khuẩn gây hại."],

    ["Bảo quản ĐÔNG LẠNH khác bảo quản LẠNH (ngăn mát) ở điểm nào?", "Đông lạnh ở nhiệt độ dưới 0°C, giữ thực phẩm lâu hơn", "Đông lạnh ở nhiệt độ phòng", "Hai cách hoàn toàn giống nhau", "Thịt, cá trữ đông dùng được lâu hơn để ngăn mát nhiều."],

    ["Hút chân không giúp bảo quản thực phẩm lâu hơn vì sao?", "Loại bỏ không khí, hạn chế vi sinh vật và sự ôi hoá", "Làm thực phẩm nóng lên", "Thêm nước vào thực phẩm", "Nhiều thực phẩm khô được đóng gói chân không để bán."],

    ["Rã đông thực phẩm theo cách nào là an toàn?", "Chuyển xuống ngăn mát cho tan dần, nấu ngay sau đó", "Để ngoài nắng cho nhanh tan", "Ngâm nước bẩn nhiều giờ", "Rã đông đúng cách hạn chế vi sinh vật phát triển."],

    ["Chế biến bằng phương pháp HẤP có đặc điểm gì?", "Dùng hơi nước nóng làm chín thực phẩm", "Ngâm thực phẩm trong dầu lạnh", "Phơi nắng cho thật khô", "Hấp giữ được hương vị và nhiều chất dinh dưỡng."],

    ["Vì sao không nên cấp đông lại thực phẩm đã rã đông?", "Vi sinh vật đã sinh sôi lúc rã đông, dễ gây ngộ độc", "Vì tủ lạnh sẽ hỏng ngay", "Vì thực phẩm sẽ ngon hơn hẳn", "Thực phẩm rã đông nên chế biến hết trong một lần."],

    ["Trong tủ lạnh, thực phẩm sống và chín cần để thế nào?", "Để riêng, đậy kín; chín ngăn trên, sống ngăn dưới", "Để chung một hộp cho gọn", "Đồ sống để trên đồ chín", "Để riêng tránh lây nhiễm chéo vi khuẩn sang đồ chín."],

    ["Nhóm thực phẩm nào giàu CHẤT BÉO tốt cho cơ thể?", "Dầu thực vật, lạc, vừng, các loại hạt, cá béo", "Đường kính, nước ngọt", "Muối và gia vị cay", "Chất béo cung cấp năng lượng, giúp hấp thụ một số vitamin."],

    ["Thực phẩm để qua đêm muốn ăn lại cần làm gì cho an toàn?", "Bảo quản tủ lạnh, đun sôi/nấu chín kĩ lại khi ăn", "Để trên bàn rồi ăn luôn", "Chỉ cần ngửi thấy thơm là ăn", "Đun lại kĩ giúp tiêu diệt phần lớn vi sinh vật."]
  ], [["Chất đạm", "Thịt, cá, trứng, sữa"], ["Vitamin", "Rau xanh, trái cây"], ["Tủ lạnh", "Nhiệt độ thấp làm chậm vi sinh vật"], ["Ướp muối, phơi khô", "Bảo quản truyền thống"], ["Chất béo", "Dầu ăn, mỡ, bơ, lạc"], ["Muối chua, gỏi", "Chế biến không dùng nhiệt"], ["Đông lạnh", "Nhiệt độ dưới 0°C"], ["Hấp, luộc", "Chế biến có dùng nhiệt"]], "Nối cho đúng nhé!"),
  topic("cn6-c3", "👕", "Trang phục và thời trang", "Chương 3 • Trang phục trong đời sống • Lựa chọn, sử dụng và bảo quản trang phục • Thời trang", [
    ["Trang phục có những vai trò gì trong đời sống?", "Che thân, bảo vệ cơ thể, làm đẹp, thể hiện cá tính", "Chỉ để khoe giàu có", "Không có vai trò gì quan trọng", "Trang phục là nhu cầu thiết yếu thứ hai của con người sau ăn uống."],
    ["Trang phục được phân loại theo những cách nào phổ biến?", "Theo giới tính, lứa tuổi, mùa và mục đích sử dụng", "Chỉ phân loại theo giá tiền", "Chỉ theo màu sắc", "Mỗi hoàn cảnh có trang phục phù hợp riêng."],
    ["Khi chọn trang phục đi học, tiêu chí nào quan trọng nhất?", "Đúng quy định của trường, gọn gàng, sạch sẽ, vừa vặn", "Càng đắt tiền càng tốt", "Giống hệt thần tượng nổi tiếng", "Đồng phục học sinh thể hiện sự bình đẳng và nề nếp nhà trường."],
    ["Vải sợi thiên nhiên (bông, lanh...) có đặc điểm gì?", "Thấm hút mồ hôi tốt, mặc thoáng mát nhưng dễ nhàu", "Hoàn toàn không thấm nước một chút nào cũng không thấm mồ hôi", "Không bao giờ cần giặt", "Vải bông (cotton) rất phổ biến cho áo mặc mùa hè."],
    ["Vải sợi tổng hợp (polyester, nilon...) có ưu điểm gì nổi bật?", "Bền, ít nhàu, nhanh khô, giá thường rẻ hơn", "Thấm hút mồ hôi tốt nhất trong các loại vải", "Hoàn toàn không bắt lửa trong mọi trường hợp", "Nhiều trang phục thể thao dùng vải tổng hợp vì nhẹ và nhanh khô."],
    ["Để bảo quản quần áo được bền đẹp, em nên làm gì?", "Giặt phơi theo nhãn mác, gấp/treo gọn, cất nơi khô thoáng", "Giặt mọi loại vải chung với nước tẩy mạnh", "Để quần áo ẩm chất đống nhiều ngày", "Đọc nhãn hướng dẫn giặt ủi trên trang phục giúp giữ đồ bền lâu."],
    ["Thời trang là gì?", "Xu hướng ăn mặc được ưa chuộng trong một giai đoạn", "Là những bộ quần áo đắt nhất thế giới", "Là quy định bắt buộc của pháp luật về ăn mặc", "Thời trang thay đổi theo mùa, theo năm và chịu ảnh hưởng văn hoá."],
    ["Học sinh lựa chọn thời trang thế nào là phù hợp?", "Phù hợp lứa tuổi, hoàn cảnh; lịch sự hơn chạy theo mốt", "Phải mặc đồ hiệu mới tự tin đến trường", "Sao chép mọi xu hướng trên mạng dù không phù hợp", "“Ăn mặc phù hợp” thể hiện văn hoá và sự tôn trọng người xung quanh."],
    ["Trang phục truyền thống nổi tiếng nhất của Việt Nam là gì?", "Áo dài — trang phục mang đậm bản sắc văn hoá dân tộc", "Áo bà ba của riêng nước ngoài", "Váy dạ hội châu Âu", "Áo dài thường được mặc trong dịp lễ, Tết, sự kiện trang trọng và ngày càng phổ biến ở trường học."],
    ["Khi giặt quần áo màu và quần áo trắng, nên làm gì để giữ màu bền?", "Giặt riêng đồ màu với đồ trắng, lộn trái áo màu khi phơi", "Giặt chung tất cả cho tiết kiệm thời gian", "Ngâm áo trắng với nước màu đậm cho đồng màu", "Phân loại đồ trước khi giặt là kĩ năng tự phục vụ cơ bản."],
    ["Sử dụng trang phục tiết kiệm, bền vững gồm những việc nào?", "Mua vừa đủ, chọn đồ bền, sửa chữa, tái sử dụng, tặng lại", "Mua thật nhiều đồ rẻ mặc một lần rồi bỏ", "Vứt bỏ quần áo chỉ vì qua một mùa mốt", "Ngành thời trang nhanh (fast fashion) gây nhiều rác thải — tiêu dùng thông minh giúp bảo vệ môi trường."],
    ["Khi tham dự lễ hội, đám cưới, em chọn trang phục thế nào?", "Lịch sự, trang trọng, hợp không khí lễ, thuần phong mĩ tục", "Mặc đồ ngủ cho thoải mái", "Mặc trang phục càng gây sốc càng tốt", "Trang phục phù hợp hoàn cảnh thể hiện sự tôn trọng chủ nhân buổi lễ."],
    ["Nghề nghiệp nào liên quan trực tiếp đến trang phục và thời trang?", "Nhà thiết kế thời trang, thợ may, người mẫu, stylist...", "Chỉ có nghề bán hàng tạp hoá", "Không có nghề nào liên quan", "Ngành dệt may là ngành kinh tế lớn, xuất khẩu chủ lực của Việt Nam."],

    ["Vải sợi PHA là loại vải như thế nào?", "Phối hợp hai loại sợi trở lên, kết hợp ưu điểm từng loại", "Chỉ dệt từ một loại sợi duy nhất", "Vải không bao giờ cần giặt", "Ví dụ bông pha polyester: thoáng mát mà ít nhàu hơn."],

    ["Vải sợi NHÂN TẠO (như viscose) có nguồn gốc từ đâu?", "Từ nguyên liệu thiên nhiên (bột gỗ, tre) qua chế biến", "Từ dầu mỏ tổng hợp hoàn toàn", "Từ kim loại kéo thành sợi", "Viscose mềm, mát, thấm hút tốt, hay dùng may áo mùa hè."],

    ["Mùa hè nắng nóng, em nên chọn trang phục thế nào?", "Vải bông mỏng, thấm hút mồ hôi, màu sáng, rộng rãi", "Áo len dày màu đen", "Áo mưa nilon kín mít", "Màu sáng phản xạ bớt nhiệt, vải bông thấm mồ hôi giúp mát."],

    ["Trang phục dùng khi lao động cần có đặc điểm gì?", "Bền, chắc, gọn, dễ vận động, có bảo hộ khi cần thiết", "Loè loẹt, rườm rà nhiều dây", "Rộng thùng thình vướng víu", "Găng tay, mũ bảo hộ là một phần của trang phục lao động."],

    ["Khi là (ủi) quần áo, em cần chú ý điều gì?", "Chỉnh nhiệt độ bàn là phù hợp với từng loại vải", "Để nhiệt độ cao nhất cho mọi vải", "Là khi quần áo còn ướt sũng", "Vải tổng hợp dễ bị bóng, cháy ở nhiệt độ cao."],

    ["Vì sao nên phơi quần áo ở nơi thoáng gió, có nắng?", "Quần áo nhanh khô, tránh ẩm mốc và mùi hôi", "Để quần áo phai màu thật nhanh", "Không có lí do gì cả", "Ánh nắng còn giúp diệt một số vi khuẩn trên vải."],

    ["Khi cất giữ quần áo lâu ngày (trái mùa), em cần làm gì?", "Giặt sạch, phơi thật khô, gấp gọn, cất nơi khô thoáng", "Cất ngay khi quần áo còn ẩm", "Để lẫn với đồ bẩn chưa giặt", "Quần áo ẩm cất kín rất dễ bị mốc, hỏng."],

    ["Đọc nhãn mác gắn trên trang phục cho em biết điều gì?", "Chất liệu vải, kích cỡ và cách giặt, là, bảo quản", "Giá tiền của trang phục", "Tên người thiết kế nổi tiếng", "Nhãn mác chính là hướng dẫn sử dụng của trang phục."],

    ["Trang phục vừa vặn với cơ thể mang lại lợi ích gì?", "Thoải mái vận động, trông gọn gàng, tự tin hơn", "Càng chật càng đẹp", "Càng rộng càng sang trọng", "Quá chật hoặc quá rộng đều bất tiện và kém an toàn."],

    ["Theo đuổi thời trang, học sinh nên ưu tiên điều gì?", "Sự phù hợp với lứa tuổi, hoàn cảnh và tiết kiệm", "Mua đồ hiệu đắt nhất lớp", "Thay toàn bộ tủ đồ mỗi tháng", "Ăn mặc phù hợp, sạch đẹp quan trọng hơn chạy theo mốt."]
  ], [["Vải bông", "Thấm hút tốt, thoáng mát"], ["Vải tổng hợp", "Bền, ít nhàu, nhanh khô"], ["Áo dài", "Trang phục truyền thống Việt Nam"], ["Thời trang", "Xu hướng ăn mặc theo giai đoạn"], ["Vải pha", "Kết hợp ưu điểm nhiều loại sợi"], ["Đồng phục", "Trang phục đi học"], ["Bàn là (ủi)", "Làm phẳng quần áo"], ["Nhãn mác", "Hướng dẫn giặt, bảo quản"]], "Nối cho đúng nhé!"),
  topic("cn6-c4", "💡", "Đồ dùng điện trong gia đình", "Chương 4 • Khái quát đồ dùng điện • Đèn điện • Nồi cơm điện • Bếp hồng ngoại • An toàn và tiết kiệm điện", [
    ["Đồ dùng điện trong gia đình được phân thành những nhóm chính nào theo nguyên lí biến đổi điện năng?", "Điện – quang, điện – nhiệt, điện – cơ (đèn, bếp, quạt)", "Chỉ có một nhóm duy nhất là bóng đèn", "Nhóm dùng pin và nhóm không dùng gì", "Mỗi nhóm biến điện năng thành dạng năng lượng cần dùng khác nhau."],
    ["Đèn sợi đốt và đèn LED khác nhau thế nào về hiệu quả?", "Đèn LED tiết kiệm điện hơn, tuổi thọ cao hơn hẳn", "Đèn sợi đốt tiết kiệm điện nhất", "Hai loại đèn dùng điện hoàn toàn giống nhau", "Thay đèn sợi đốt bằng LED là cách tiết kiệm điện đơn giản cho gia đình."],
    ["Nồi cơm điện hoạt động theo nguyên lí nào?", "Biến điện năng thành nhiệt năng làm chín cơm", "Dùng sóng âm để nấu cơm", "Dùng sức gió làm chín cơm", "Nồi cơm điện có hai chế độ quen thuộc: nấu (cook) và giữ ấm (warm)."],
    ["Bộ phận nào của nồi cơm điện tiếp xúc trực tiếp với nồi nấu và truyền nhiệt?", "Mâm nhiệt (dây đốt nóng) ở đáy nồi cơm điện", "Nắp nhựa phía trên", "Dây điện bên ngoài", "Khi dùng cần giữ mâm nhiệt và đáy nồi nấu sạch, khô để truyền nhiệt tốt và an toàn."],
    ["Bếp hồng ngoại khác bếp từ ở điểm nào cơ bản?", "Hồng ngoại dùng mọi loại nồi; bếp từ chỉ nồi nhiễm từ", "Bếp hồng ngoại không cần điện", "Bếp từ đun được bằng củi", "Cần đọc kĩ hướng dẫn để chọn nồi phù hợp với từng loại bếp."],
    ["Khi sử dụng đồ dùng điện, nguyên tắc an toàn quan trọng nhất là gì?", "Không chạm điện khi tay ướt, không dùng thiết bị rò điện", "Cắm càng nhiều thiết bị vào một ổ càng tốt cho tiện", "Tự ý tháo sửa thiết bị điện không cần kiến thức", "Điện rất tiện ích nhưng cũng nguy hiểm chết người nếu dùng sai cách."],
    ["Thông số “220V – 1000W” ghi trên một ấm điện cho biết điều gì?", "Điện áp 220V, công suất 1000W khi hoạt động", "Ấm chứa được 220 lít nước", "Ấm nặng 1000 gam", "Công suất (W) càng lớn, thiết bị càng tiêu thụ điện nhanh và thường hoạt động mạnh hơn."],
    ["Việc làm nào giúp tiết kiệm điện khi dùng điều hoà?", "Để khoảng 26°C, đóng kín cửa, tắt khi ra ngoài", "Để 16°C và mở cửa sổ cho thoáng", "Bật điều hoà cả ngày không tắt khi đi vắng", "Tăng 1°C điều hoà giúp tiết kiệm đáng kể điện năng."],
    ["Quạt điện biến đổi điện năng thành dạng năng lượng nào là chính?", "Cơ năng (cánh quạt quay tạo gió), một phần nhỏ thành nhiệt", "Quang năng phát sáng", "Hoá năng như pin", "Quạt thuộc nhóm đồ dùng điện – cơ."],
    ["Khi thấy dây điện của thiết bị bị hở, chuột cắn, em nên làm gì?", "Ngừng dùng ngay, báo người lớn để người có chuyên môn xử lí", "Dán băng dính qua loa rồi dùng tiếp mãi", "Cầm tay kiểm tra xem có điện không", "Thiết bị rò rỉ điện là nguy cơ điện giật và cháy nổ trong nhà."],
    ["Vì sao nên rút phích cắm thiết bị khi không sử dụng lâu ngày?", "Tránh lãng phí điện chờ, giảm nguy cơ chập cháy", "Vì phích cắm để lâu sẽ tự hỏng không lí do", "Không cần thiết bao giờ", "Điện chờ (standby) tích lại gây lãng phí đáng kể trong gia đình."],
    ["Máy giặt thuộc nhóm đồ dùng điện nào và cần lưu ý gì khi dùng?", "Điện – cơ; không giặt quá tải, để nơi khô ráo, cân bằng", "Nhóm điện – quang phát sáng", "Không cần lưu ý gì đặc biệt", "Dùng đúng khối lượng giặt giúp máy bền và giặt sạch hơn."],
    ["Số điện (kWh) trên hoá đơn tiền điện cho biết điều gì?", "Lượng điện năng đã tiêu thụ; 1 kWh là một “số điện”", "Điện áp của nhà em", "Số lượng bóng đèn trong nhà", "Theo dõi số điện hằng tháng giúp gia đình điều chỉnh thói quen tiết kiệm điện."],

    ["Trong gia đình thường gặp những loại đèn điện nào?", "Đèn sợi đốt, đèn huỳnh quang (tuýp, compact), đèn LED", "Đèn dầu và đèn cầy", "Chỉ có duy nhất đèn pin", "Đèn LED đang dần thay thế các loại đèn cũ vì tiết kiệm điện."],

    ["Đèn compact (huỳnh quang) khác đèn sợi đốt ở điểm nào?", "Tiết kiệm điện hơn và ít toả nhiệt hơn đèn sợi đốt", "Tốn điện gấp đôi đèn sợi đốt", "Không phát sáng được", "Đèn compact từng phổ biến trước khi đèn LED trở nên rẻ."],

    ["Nồi cơm điện gồm những bộ phận chính nào?", "Thân nồi, nồi nấu, bộ phận sinh nhiệt, bộ phận điều khiển", "Chỉ có nắp và dây điện", "Chỉ có một nút bấm duy nhất", "Mỗi bộ phận đảm nhiệm một khâu trong quá trình nấu cơm."],

    ["Bộ phận điều khiển của nồi cơm điện có tác dụng gì?", "Chuyển chế độ nấu – giữ ấm, tự chuyển khi cơm chín", "Trang trí cho nồi đẹp hơn", "Làm cho nồi nặng thêm", "Nhờ bộ phận này, cơm chín tự chuyển sang giữ ấm."],

    ["Khi dùng nồi cơm điện, việc nào sau đây là đúng?", "Lau khô mặt ngoài nồi nấu, đậy nắp kín trước khi nấu", "Để mặt ngoài nồi nấu ướt sũng", "Mở nắp liên tục trong khi nấu", "Nồi nấu khô ráo giúp truyền nhiệt tốt và an toàn điện."],

    ["Bếp hồng ngoại gồm những bộ phận chính nào?", "Mặt bếp, mâm nhiệt hồng ngoại, thân bếp, bảng điều khiển", "Chỉ có một sợi dây điện", "Bình ga và ống dẫn ga", "Mâm nhiệt phát tia hồng ngoại làm nóng mặt bếp và đáy nồi."],

    ["Vì sao sau khi tắt bếp hồng ngoại vẫn phải cẩn thận?", "Mặt bếp còn nóng rất lâu, chạm vào dễ bị bỏng", "Vì bếp tự bật lại liên tục", "Vì mặt bếp phát sáng mãi mãi", "Nên chờ bếp nguội hẳn mới vệ sinh mặt bếp."],

    ["Thông số “220V – 9W” trên một bóng đèn LED cho biết điều gì?", "Đèn dùng điện áp 220V, công suất chỉ 9W, rất tiết kiệm", "Đèn nặng 220 gam, dài 9 mét", "Đèn sáng trong 220 giờ rồi tắt", "Công suất nhỏ mà vẫn sáng tốt là ưu điểm của đèn LED."],

    ["Gia đình em có thể tiết kiệm điện chiếu sáng bằng cách nào?", "Dùng đèn LED, tắt đèn khi không cần, tận dụng ánh sáng trời", "Bật đèn mọi phòng cả ngày", "Dùng toàn đèn sợi đốt công suất lớn", "Mở rèm đón sáng ban ngày giúp giảm giờ bật đèn."],

    ["Trước khi thay bóng đèn hay sửa thiết bị điện phải làm gì đầu tiên?", "Ngắt nguồn điện ở cầu dao (aptomat) rồi mới thao tác", "Chạm tay vào thử xem có điện", "Nhờ em nhỏ giữ hộ dây điện", "Ngắt điện là nguyên tắc an toàn bắt buộc khi sửa chữa."]
  ], [["Đèn LED", "Tiết kiệm điện, tuổi thọ cao"], ["Nồi cơm điện", "Điện năng → nhiệt năng"], ["Quạt điện", "Điện năng → cơ năng"], ["kWh", "Một “số điện” tiêu thụ"], ["Đèn sợi đốt", "Tốn điện, tuổi thọ thấp"], ["Bếp hồng ngoại", "Dùng được mọi loại nồi"], ["Cầu dao (aptomat)", "Ngắt điện khi có sự cố"], ["Công suất (W)", "Mức tiêu thụ điện của thiết bị"]], "Nối cho đúng nhé!")
];
/* ================= ĐĂNG KÍ LỚP 6 + ĐẾM + NHÃN + CHỐNG LẶP ================= */
(function () {
  if (typeof GRADES === "undefined" || !GRADES || GRADES[6]) return;
  GRADES[6] = { label: "Lớp 6", subjects: [
    { id: "g6-math", emoji: "🔢", name: "Toán", desc: "9 chương • Số nguyên • Phân số • Đối xứng • Xác suất thực nghiệm", cls: "c-coral", topics: MATH6_TOPICS },
    { id: "g6-nv", emoji: "📚", name: "Ngữ văn", desc: "Bài 1–10 • Tác phẩm – tác giả • Mạch tiếng Việt", cls: "c-grape", topics: NV6_TOPICS },
    { id: "g6-eng", emoji: "🔤", name: "Tiếng Anh", desc: "Global Success • 12 Unit", cls: "c-teal", topics: UNITS6.map(function (u) {
        return { id: "g6-u" + u.n, emoji: "📗", name: "Unit " + u.n + " — " + u.title, sub: u.words.map(function (w) { return w[0]; }).join(" • "), pools: eng6Pools(u) };
      }).concat([{ id: "g6-review", emoji: "🌈", name: "Ôn tập tất cả", sub: "Trộn từ của cả 12 Unit", pools: eng6NoLetter(engPools(ALL_WORDS6)) }]) },
    { id: "g6-khtn", emoji: "🔬", name: "Khoa học tự nhiên", desc: "10 chương • Chất – Tế bào – Lực – Năng lượng – Trái Đất", cls: "c-sky", topics: KHTN6_TOPICS },
    { id: "g6-lsdl", emoji: "🗺️", name: "Lịch sử & Địa lí", desc: "Lịch sử 5 chương • Địa lí 7 chương", cls: "c-brown", topics: LSD6_TOPICS },
    { id: "g6-gdcd", emoji: "⚖️", name: "Giáo dục công dân", desc: "12 bài • Tình huống ứng xử • Quyền trẻ em", cls: "c-slate", topics: GDCD6_TOPICS },
    { id: "g6-tin", emoji: "💻", name: "Tin học", desc: "7 nhóm chơi • Mạng máy tính • Thuật toán", cls: "c-sky", topics: TIN6_TOPICS },
    { id: "g6-cn", emoji: "🌸", name: "Công nghệ", desc: "4 chương • Nhà ở • Thực phẩm • Trang phục • Đồ dùng điện", cls: "c-leaf", topics: CN6_TOPICS }
  ] };
  /* Vẽ lại các nút chọn lớp ở màn hình đăng nhập để Lớp 6 sáng lên */
  function reloginTabs6() {
    renderGradeTabs("login-grades", loginGrade, function (g) { loginGrade = g; reloginTabs6(); }, function (g) { el("login-err").textContent = "Lớp " + g + " sắp ra mắt — hiện đã có Lớp 1, Lớp 2, Lớp 3, Lớp 4, Lớp 5, Lớp 6 và Lớp 7 nhé!"; });
  }
  reloginTabs6();
  if (typeof profile !== "undefined" && profile && profile.name && typeof renderSubjects === "function") {
    if (profile.grade === 6) currentGrade = 6;
    renderSubjects(); renderProfileBar();
  }
  /* ---------- Đếm ngân hàng + gắn nhãn + chống lặp ---------- */
  var LS_KEY6 = "gameHocTap_recentQ6_v1";
  var recentStore6 = {};
  try { recentStore6 = JSON.parse(localStorage.getItem(LS_KEY6) || "{}") || {}; } catch (e) { recentStore6 = {}; }
  function saveRecent6() { try { localStorage.setItem(LS_KEY6, JSON.stringify(recentStore6)); } catch (e) {} }
  var G6BANK = {};
  var KNOWLEDGE6 = { "g6-nv": 1, "g6-khtn": 1, "g6-lsdl": 1, "g6-gdcd": 1, "g6-tin": 1, "g6-cn": 1 };
  function capFor6(key) { return Math.max(24, Math.min(80, G6BANK[key] || 30)); }
  function recentHas6(key, sig) { return (recentStore6[key] || []).indexOf(sig) !== -1; }
  function recentAdd6(key, sig) {
    var arr = recentStore6[key] || (recentStore6[key] = []);
    if (arr.indexOf(sig) === -1) arr.push(sig);
    var cap = capFor6(key);
    while (arr.length > cap) arr.shift();
    saveRecent6();
  }
  var roundSeen6 = {};
  var realSetTimeout6 = window.setTimeout;
  window.setTimeout = function () { return 0; };
  try {
    GRADES[6].subjects.forEach(function (subj) {
      subj.topics.forEach(function (t) {
        var key = "6|" + subj.id + "|" + t.id, bankN;
        if (KNOWLEDGE6[subj.id]) {
          bankN = t.pools.choose.length * 3 + 4;
        } else {
          var sigs = {};
          ["choose", "blank", "match", "games"].forEach(function (pk) {
            (t.pools[pk] || []).forEach(function (g) {
              for (var i = 0; i < 12; i++) { try { sigs[qSig6(g())] = 1; } catch (e) {} }
            });
          });
          bankN = Object.keys(sigs).length;
        }
        G6BANK[key] = bankN;
        if (String(t.sub).indexOf("câu hỏi") === -1) t.sub = t.sub + " • " + bankN + "+ câu hỏi";
      });
    });
  } finally { window.setTimeout = realSetTimeout6; }
  GRADES[6].subjects.forEach(function (subj) {
    subj.topics.forEach(function (t) {
      var key = "6|" + subj.id + "|" + t.id;
      ["choose", "blank", "match", "games"].forEach(function (pk) {
        var rawPool = (t.pools[pk] || []).slice();
        if (!rawPool.length) return;
        t.pools[pk] = rawPool.map(function (gen) {
          return function () {
            if (roundSelectionActive) return gen();
            var q = gen(), sig = qSig6(q), tries = 0;
            while ((roundSeen6[sig] || recentHas6(key, sig)) && tries < 12) {
              var alt = rawPool.length > 1 ? pick(rawPool) : gen;
              q = alt(); sig = qSig6(q); tries++;
            }
            roundSeen6[sig] = true;
            recentAdd6(key, sig);
            return q;
          };
        });
      });
    });
  });
  var prevStartGame6 = startGame;
  startGame = function (title, pools) {
    roundSeen6 = {};
    try {
      var key = (typeof currentTopicKey !== "undefined") ? currentTopicKey : "";
      if (key && G6BANK[key] && (recentStore6[key] || []).length >= capFor6(key)) { recentStore6[key] = []; saveRecent6(); }
    } catch (e) {}
    return prevStartGame6(title, pools);
  };
  window.__BANK6 = G6BANK;
})();

/* ---------- Công thức và cách làm (Toán) của Lớp 6 — tách từ bảng ghi chú chung của master ---------- */
window.__MATH_KNOWLEDGE_NOTES = window.__MATH_KNOWLEDGE_NOTES || {};
Object.assign(window.__MATH_KNOWLEDGE_NOTES, {
"m6-c1": ["N = {0; 1; 2; …}; N* không chứa 0.","aᵐ·aⁿ = aᵐ⁺ⁿ; aᵐ:aⁿ = aᵐ⁻ⁿ với a ≠ 0, m ≥ n.","Thứ tự: ngoặc → luỹ thừa → nhân/chia → cộng/trừ."],
"m6-c2": ["Chia hết cho 2: tận cùng chẵn; cho 5: tận cùng 0 hoặc 5; cho 3/9: tổng chữ số chia hết cho 3/9.","Số nguyên tố lớn hơn 1, có đúng hai ước dương. Số 1 không phải số nguyên tố, cũng không phải hợp số.","ƯCLN: thừa số chung, số mũ nhỏ nhất. BCNN: các thừa số, số mũ lớn nhất."],
"m6-c3": ["Số nguyên gồm số âm, 0 và số dương. Trên trục số, bên phải biểu diễn số lớn hơn.","Nhân/chia cùng dấu: dương; khác dấu: âm. Không chia cho 0."],
"m6-c4": ["Hình chữ nhật: P = 2(a + b), S = ab; hình vuông: P = 4a, S = a².","Hình bình hành S = ah; hình thoi S = d₁d₂/2; hình thang S = (a + b)h/2.","Đổi về cùng đơn vị trước khi tính. Diện tích dùng đơn vị vuông."],
"m6-c5": ["Trục đối xứng: gấp hình theo trục thì hai phần chồng khít. Tâm O là trung điểm của các cặp điểm đối xứng.","Hình vuông có 4 trục và một tâm; hình chữ nhật không phải hình vuông có 2 trục và một tâm.","Tam giác đều có 3 trục, không có tâm đối xứng; đường tròn có vô số trục và có tâm đối xứng."],
"m6-c6": ["Phân số a/b có b ≠ 0; a/b = c/d khi ad = bc, b và d khác 0.","Cộng/trừ: quy đồng mẫu. Nhân: tử nhân tử, mẫu nhân mẫu. Chia: nhân với nghịch đảo của phân số khác 0."],
"m6-c7": ["p% = p/100; giá trị p% của a bằng a·p/100.","Giá sau giảm p% = giá ban đầu·(1 − p/100). Làm tròn theo độ chính xác yêu cầu."],
"m6-c8": ["Đoạn thẳng có hai đầu mút; tia có một gốc và kéo dài về một phía.","M là trung điểm AB khi nằm giữa A, B và MA = MB = AB/2.","Nhọn: 0° < α < 90°; vuông: 90°; tù: 90° < α < 180°; bẹt: 180°."],
"m6-c9": ["Dữ liệu có thể là số hoặc phân loại. Đọc biểu đồ cần xem tên, đơn vị và thang đo.","Xác suất thực nghiệm = số lần sự kiện xảy ra / tổng số lần thử."]
});
  if (typeof window.__phaseBProcessGrade === "function") window.__phaseBProcessGrade(6);
  if (typeof window.__phaseCompleteGrade === "function") window.__phaseCompleteGrade(6);

/* ================= MỤC 9 (v18) — SVG KHOA HỌC: gắn hình K1/K3/K5 cho KHTN 6 =================
   Bộ sinh câu CÓ HÌNH: tham số hình lấy từ cùng biến tính đáp án; hình
   không chứa đáp án (xem THIET-KE-MUC-9 B.3). Gắn vào pools sau Phase B/C
   như các khối tĩnh Lớp 1 — không đổi nội dung câu hỏi sẵn có. */
(function () {
  function findT(id) { return findTopic127(6, id); }
  var STATE_NAMES = { ran: "thể rắn", long: "thể lỏng", khi: "thể khí" };
  var STATE_EX = "Hạt xếp khít và có trật tự là thể rắn; hạt khít nhưng lộn xộn là thể lỏng; hạt ở rất xa nhau, chuyển động tự do là thể khí.";
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
  var PROC_EX = { nc: "Nóng chảy là sự chuyển từ thể rắn sang thể lỏng.", dd: "Đông đặc là sự chuyển từ thể lỏng sang thể rắn.", bh: "Bay hơi là sự chuyển từ thể lỏng sang thể khí.", nt: "Ngưng tụ là sự chuyển từ thể khí sang thể lỏng." };
  function k1TransGen() {
    var procs = [["nc", "Nóng chảy"], ["dd", "Đông đặc"], ["bh", "Bay hơi"], ["nt", "Ngưng tụ"]];
    var ask = pick(procs);
    var labels = { nc: "Nóng chảy", dd: "Đông đặc", bh: "Bay hơi", nt: "Ngưng tụ" };
    labels[ask[0]] = "";
    var q = mcqQ("Quan sát sơ đồ chuyển thể. Quá trình được đánh dấu ? là quá trình nào?",
      procs.filter(function (p) { return p[0] !== ask[0]; }).map(function (p) { return p[1]; }),
      ask[1], PROC_EX[ask[0]]);
    q.figure = figK1TransSVG(labels);
    return q;
  }
  function k3CycleGen() {
    var stages = [["bochoi", "Bốc hơi", "Nước ở biển, sông, hồ bị Mặt Trời đốt nóng, bốc hơi lên thành hơi nước."], ["ngungtu", "Ngưng tụ", "Hơi nước lên cao gặp lạnh, ngưng tụ thành giọt nước nhỏ tạo thành mây."], ["mua", "Mưa", "Giọt nước trong mây lớn dần, rơi xuống thành mưa."], ["chay", "Chảy về biển", "Nước mưa chảy thành suối, sông rồi đổ về biển, khép kín vòng tuần hoàn."]];
    var ask = pick(stages);
    var q = mcqQ("Quan sát vòng tuần hoàn của nước. Giai đoạn được đánh dấu ? là giai đoạn nào?",
      stages.filter(function (s) { return s[0] !== ask[0]; }).map(function (s) { return s[1]; }),
      ask[1], ask[2]);
    q.figure = figK3CycleSVG(ask[0]);
    return q;
  }
  var PLANETS = ["Sao Thuỷ", "Sao Kim", "Trái Đất", "Sao Hoả", "Sao Mộc", "Sao Thổ", "Sao Thiên Vương", "Sao Hải Vương"];
  function k3OrbitGen() {
    var idx = rand(0, 7);
    var q = mcqQ("Hình vẽ quỹ đạo của các hành tinh quanh Mặt Trời. Hành tinh ở quỹ đạo được tô đậm (quỹ đạo thứ " + (idx + 1) + " kể từ Mặt Trời) là hành tinh nào?",
      PLANETS.filter(function (p) { return p !== PLANETS[idx]; }),
      PLANETS[idx],
      "Thứ tự các hành tinh từ Mặt Trời ra xa: Sao Thuỷ, Sao Kim, Trái Đất, Sao Hoả, Sao Mộc, Sao Thổ, Sao Thiên Vương, Sao Hải Vương.");
    q.figure = figK3OrbitSVG(idx, rand(1, 999));
    return q;
  }
  function k5ThermGen() {
    var value = 5 * rand(0, 10);
    var wrongs = [value - 10, value - 5, value + 5, value + 10].filter(function (x) { return x >= 0 && x <= 50 && x !== value; });
    var q = mcqQ("Quan sát nhiệt kế trong hình. Nhiệt kế chỉ bao nhiêu độ C?",
      shuffle(wrongs).slice(0, 2).map(function (x) { return x + "°C"; }),
      value + "°C", "Đọc mức thuỷ ngân trên thang chia độ: mỗi vạch nhỏ là 5°C.");
    q.figure = figK5ThermSVG(value, 0, 50, 5);
    q.figureOnly = true;
    return q;
  }
  function k5CylGen() {
    var value = 5 * rand(2, 18);
    var wrongs = [value - 10, value - 5, value + 5, value + 10].filter(function (x) { return x > 0 && x < 100 && x !== value; });
    var q = mcqQ("Quan sát ống đong trong hình. Thể tích chất lỏng trong ống là bao nhiêu mi-li-lít?",
      shuffle(wrongs).slice(0, 2).map(function (x) { return x + " ml"; }),
      value + " ml", "Đọc ở mức thấp nhất của mặt cong chất lỏng (mặt khum), mắt nhìn ngang mức chất lỏng.");
    q.figure = figK5CylSVG(value, 100, 10);
    q.figureOnly = true;
    return q;
  }
  function k5RulerGen() {
    var len = rand(3, 13);
    var q = mcqQ("Quan sát hình: một vật đặt khít vạch 0 của thước. Vật dài bao nhiêu xăng-ti-mét?",
      [len - 1, len + 1, len + 2].map(function (x) { return x + " cm"; }),
      len + " cm", "Đọc vạch cuối của vật trên thước: vật dài " + len + " cm.");
    q.figure = figK5RulerSVG(len);
    q.figureOnly = true;
    return q;
  }
  function k5LeverGen() {
    var a = rand(1, 4), b = rand(1, 4);
    if (a === b) b = a === 4 ? 3 : a + 1;
    var side = Math.random() < 0.5 ? "L" : "R";
    var armLoad = side === "L" ? a : b, armOther = side === "L" ? b : a;
    var ans = armOther > armLoad ? "Đầu còn lại hạ xuống" : "Đầu treo vật hạ xuống";
    var q = mcqQ("Quan sát đòn bẩy trong hình (mỗi vạch là một đoạn bằng nhau, vật nặng treo ở một đầu). Nếu treo thêm một vật nặng y hệt vào đầu còn lại thì đòn bẩy sẽ thế nào?",
      ["Đòn bẩy vẫn cân bằng", ans === "Đầu còn lại hạ xuống" ? "Đầu treo vật hạ xuống" : "Đầu còn lại hạ xuống"],
      ans,
      "Phía có cánh tay đòn dài hơn sẽ có tác dụng làm quay lớn hơn nên hạ xuống. Vật treo cách điểm tựa " + armLoad + " đoạn, đầu còn lại cách " + armOther + " đoạn.");
    q.figure = figK5LeverSVG(a, b, side);
    return q;
  }
  var t;
  t = findT("kh6-chat"); if (t) { t.pools.choose.push(k1PanelsGen, k1PanelsGen, k1TransGen, k1TransGen); }
  t = findT("kh6-honhop"); if (t) { t.pools.choose.push(k1TransGen, k1TransGen); }
  t = findT("kh6-traidat"); if (t) { t.pools.choose.push(k3CycleGen, k3CycleGen, k3OrbitGen, k3OrbitGen); }
  t = findT("kh6-modau"); if (t) { t.pools.choose.push(k5ThermGen, k5CylGen, k5RulerGen); }
  t = findT("kh6-luc"); if (t) { t.pools.choose.push(k5LeverGen, k5LeverGen); }
})();
