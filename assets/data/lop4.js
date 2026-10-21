/* ================================================================
   GAME HỌC TẬP — FILE DỮ LIỆU RIÊNG LỚP 4 (assets/data/lop4.js)
   Dữ liệu Lớp 4 (gốc: block Lớp 4 của master).
   Tách nguyên văn từ bản master đã kiểm chứng (MD5 5f54145de040cb8cefc9eeb7cb915cd5);
   trang vỏ nạp động file này khi người chơi chọn Lớp 4.
   ================================================================ */

/* ============================================================
   LỚP 4 — Kết nối tri thức + Global Success (Bài 1–73 Toán,
   Tiếng Việt theo kỹ năng, Tiếng Anh 20 Unit, Khoa học,
   Lịch sử & Địa lí, Đạo đức, Tin học, Công nghệ)
   Đăng kí vào GRADES[4]; chống lặp + nhãn số câu như Lớp 3.
   ============================================================ */
"use strict";
function qSig4(q) {
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
/* ---------- Đọc số đến lớp triệu ---------- */
function vnNum4(n) {
  if (n < 1000000) return vnNum3(n);
  var tr = Math.floor(n / 1000000), rest = n % 1000000;
  var s = vnHundreds3(tr, true) + " triệu";
  var th = Math.floor(rest / 1000), r2 = rest % 1000;
  if (th > 0) s += " " + vnHundreds3(th, false) + " nghìn";
  if (r2 > 0) s += " " + vnHundreds3(r2, false);
  return s;
}
/* ---------- Phân số ---------- */
function gcd4(a, b) { while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function fracStr(n, d) { return d === 1 ? String(n) : n + "/" + d; }
/* Toán hạng CÓ GIÁ TRỊ NGUYÊN thì viết số nguyên (n/n -> 1, 6/2 -> 3) khi hiển thị
   trong câu tính phân số (đợt sửa phân số 2026-10-15); toán hạng không nguyên giữ
   nguyên dạng — KHÔNG rút gọn máy móc vì Lớp 4 đang học quy đồng/rút gọn thật. */
function opFrac4(n, d) { return n % d === 0 ? String(n / d) : n + "/" + d; }
function fracWrongs(n, d) {
  var ans = fracStr(n, d), out = [], seen = { "": 1 };
  seen[ans] = 1;
  var cands = [fracStr(n + 1, d), fracStr(n, d + 1), fracStr(n + d, d), d > 2 ? fracStr(n, d - 1) : fracStr(n + 2, d), n !== d ? fracStr(d, n) : fracStr(n + 1, d + 1), fracStr(n * 2, d * 2), fracStr(Math.max(1, n - 1), d), fracStr(n + 1, d + 2)];
  for (var i = 0; i < cands.length && out.length < 3; i++) { if (!seen[cands[i]]) { seen[cands[i]] = 1; out.push(cands[i]); } }
  var k = 2;
  while (out.length < 3) { var c = fracStr(n + k, d + k); if (!seen[c]) { seen[c] = 1; out.push(c); } k++; }
  return out;
}
function fracMCQ(prompt, visual, n, d, explain) {
  var g = gcd4(n, d); n = Math.floor(n / g); d = Math.floor(d / g);
  return mcqQ(prompt, fracWrongs(n, d), fracStr(n, d), explain, visual);
}
function fracBlank(prompt, n, d, explain) {
  var g = gcd4(n, d); n = Math.floor(n / g); d = Math.floor(d / g);
  var ans = fracStr(n, d);
  var opts = shuffle([ans].concat(fracWrongs(n, d).slice(0, 2)));
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: prompt, blankText: ans, explain: explain || null,
    visual: '<div class="sentence">Đáp án: ' + blankSlot() + "</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 3, optStack: true };
}
/* Dạng KHÔNG rút gọn: dùng cho câu hỏi yêu cầu viết phân số ở một dạng cụ thể (quy đồng mẫu số, nhân cả tử và mẫu) — đáp án giữ nguyên dạng được hỏi, phương án sai không được bằng giá trị với đáp án. */
function fracValEq(w, n, d) { var p = String(w).split("/"); var wn = parseInt(p[0], 10), wd = p.length > 1 ? parseInt(p[1], 10) : 1; return wn * d === n * wd; }
function fracWrongsRaw(n, d) {
  var out = fracWrongs(n, d).filter(function (w) { return !fracValEq(w, n, d); });
  var seen = {}; out.forEach(function (w) { seen[w] = 1; });
  var t = 2;
  while (out.length < 3) { var c = fracStr(n + t, d + t); if (!seen[c] && !fracValEq(c, n, d)) { seen[c] = 1; out.push(c); } t++; }
  return out;
}
function fracMCQRaw(prompt, visual, n, d, explain) { return mcqQ(prompt, fracWrongsRaw(n, d), fracStr(n, d), explain, visual); }
function fracBlankRaw(prompt, n, d, explain) {
  var ans = fracStr(n, d);
  var opts = shuffle([ans].concat(fracWrongsRaw(n, d).slice(0, 2)));
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: prompt, blankText: ans, explain: explain || null,
    visual: '<div class="sentence">Đáp án: ' + blankSlot() + "</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 3, optStack: true };
}
function fracBar(n, d) {
  var cells = "";
  for (var i = 0; i < d; i++) cells += '<span style="display:inline-block;width:clamp(20px,6vw,30px);height:28px;margin:2px;border:2px solid #8a8378;border-radius:5px;background:' + (i < n ? "#ffb703" : "#fffdf5") + '"></span>';
  return '<div style="text-align:center">' + cells + "</div>";
}
/* ---------- SVG: góc, đường thẳng, hình tứ giác ---------- */
function angleSVG(deg, label) {
  var cx = 100, cy = 108, r = 76, rad = deg * Math.PI / 180;
  var x2 = (cx + r * Math.cos(rad)).toFixed(1), y2 = (cy - r * Math.sin(rad)).toFixed(1);
  var pts = "", steps = Math.max(2, Math.round(deg / 12));
  for (var i = 0; i <= steps; i++) { var a = deg * i / steps * Math.PI / 180; pts += (cx + 26 * Math.cos(a)).toFixed(1) + "," + (cy - 26 * Math.sin(a)).toFixed(1) + " "; }
  var sq = deg === 90 ? '<path d="M ' + (cx + 17) + " " + cy + " L " + (cx + 17) + " " + (cy - 17) + " L " + cx + " " + (cy - 17) + '" fill="none" stroke="#12b5a5" stroke-width="3"/>' : "";
  return '<svg class="shape-svg" viewBox="0 0 200 165" role="img" aria-label="Hình vẽ góc"><line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="#33302a" stroke-width="5" stroke-linecap="round"/><line x1="' + cx + '" y1="' + cy + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#33302a" stroke-width="5" stroke-linecap="round"/><polyline points="' + pts + '" fill="none" stroke="#ff6b4a" stroke-width="3"/>' + sq + '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="#33302a"/><text x="' + cx + '" y="' + (cy + 24) + '" text-anchor="middle" font-size="17" font-weight="700" fill="#33302a">' + label + "</text></svg>";
}
function linesSVG(kind) {
  var inner = "";
  if (kind === "perp") inner = '<line x1="25" y1="80" x2="175" y2="80" stroke="#33302a" stroke-width="5" stroke-linecap="round"/><line x1="100" y1="15" x2="100" y2="145" stroke="#33302a" stroke-width="5" stroke-linecap="round"/><path d="M 100 62 L 118 62 L 118 80" fill="none" stroke="#12b5a5" stroke-width="3"/>';
  else if (kind === "parallel") inner = '<line x1="25" y1="50" x2="175" y2="50" stroke="#33302a" stroke-width="5" stroke-linecap="round"/><line x1="25" y1="115" x2="175" y2="115" stroke="#33302a" stroke-width="5" stroke-linecap="round"/><path d="M 92 42 L 104 50 L 92 58" fill="none" stroke="#ff6b4a" stroke-width="4"/><path d="M 92 107 L 104 115 L 92 123" fill="none" stroke="#ff6b4a" stroke-width="4"/>';
  else inner = '<line x1="30" y1="25" x2="170" y2="140" stroke="#33302a" stroke-width="5" stroke-linecap="round"/><line x1="170" y1="25" x2="30" y2="140" stroke="#33302a" stroke-width="5" stroke-linecap="round"/>';
  return '<svg class="shape-svg" viewBox="0 0 200 160" role="img">' + inner + "</svg>";
}
function quadSVG(type, tag) {
  var inner = "";
  if (type === "binhhanh") inner = '<polygon points="50,110 140,110 170,40 80,40" fill="#4dabf7" fill-opacity="0.55" stroke="#33302a" stroke-width="4" stroke-linejoin="round"/>';
  else if (type === "thoi") inner = '<polygon points="105,12 168,78 105,144 42,78" fill="#f06595" fill-opacity="0.5" stroke="#33302a" stroke-width="4" stroke-linejoin="round"/>';
  else if (type === "chunhat") inner = '<rect x="35" y="42" width="140" height="72" rx="4" fill="#12b5a5" fill-opacity="0.45" stroke="#33302a" stroke-width="4"/>';
  else inner = '<rect x="60" y="28" width="90" height="90" rx="4" fill="#ffb703" fill-opacity="0.55" stroke="#33302a" stroke-width="4"/>';
  return '<svg class="shape-svg" viewBox="0 0 210 156" role="img">' + inner + '<text x="12" y="24" font-size="18" font-weight="800" fill="#33302a">' + (tag || "") + "</text></svg>";
}
function barChart4(title, data, unit) {
  var max = 0; data.forEach(function (d) { if (d[1] > max) max = d[1]; });
  var cols = data.map(function (d) {
    var h = Math.max(12, Math.round(d[1] / max * 96));
    return '<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;width:64px"><div style="font-weight:800">' + d[1] + '</div><div style="width:40px;height:' + h + 'px;background:#4dabf7;border-radius:6px 6px 0 0"></div><div style="margin-top:4px;font-size:14px;text-align:center">' + d[0] + "</div></div>";
  }).join("");
  return '<div class="chart-box">📊 ' + title + '<div style="display:flex;align-items:flex-end;justify-content:center;gap:10px;margin-top:8px">' + cols + "</div><div style='font-size:13px;margin-top:4px'>Đơn vị: " + unit + "</div></div>";
}
/* ================= TOÁN 4 — bộ sinh ================= */
function g4ReadMillion() {
  var tr = rand(1, 999), ng = rand(0, 999), dv = rand(0, 999), guard = 0;
  if (ng === 0 && dv === 0) dv = rand(1, 999);
  var n = tr * 1000000 + ng * 1000 + dv, ans = vnNum4(n), wrongs = [], seen = {};
  seen[ans] = 1;
  var cands = [tr * 1000000 + dv * 1000 + ng, n + 100000, n + 1000, n - 1000, n + 1000000, tr * 100000 + ng * 1000 + dv];
  while (wrongs.length < 2 && guard++ < 60) {
    var p = cands.length ? cands.shift() : n + pick([10000, 100000, 1000000, -10000]);
    if (p > 0 && p !== n) { var w = vnNum4(p); if (!seen[w]) { seen[w] = 1; wrongs.push(w); } }
  }
  return mcqQ("Số " + fmtN(n) + " đọc là:", wrongs, ans, fmtN(n) + " đọc là: " + ans + ".");
}
function g4WriteNum() {
  var tr = rand(1, 99), ng = rand(1, 999), dv = rand(0, 999);
  var n = tr * 1000000 + ng * 1000 + dv, opts = [n], guard = 0;
  while (opts.length < 4 && guard++ < 120) {
    var p = pick([n + 1000, n - 1000, n + 100000, n + 100, n + 1000000, tr * 1000000 + dv * 1000 + ng]);
    if (p > 0 && opts.indexOf(p) === -1) opts.push(p);
  }
  opts = shuffle(opts);
  return { prompt: "Viết số: " + vnNum4(n), visual: "", options: opts.map(function (o) { return { html: '<span class="opt-num">' + fmtN(o) + "</span>" }; }), answer: opts.indexOf(n), cols: 2,
    explain: "Viết theo từng lớp: lớp triệu, lớp nghìn, lớp đơn vị — mỗi lớp gồm ba chữ số." };
}
var G4_PLACE_NAMES = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn", "triệu", "chục triệu", "trăm triệu"];
function g4DigitPlace() {
  var len = rand(6, 9);
  var pool = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  var digits = pool.slice(0, len);
  if (digits[0] === 0) { var t = digits[0]; digits[0] = digits[1]; digits[1] = t; }
  var p = rand(0, len - 1), idx = len - 1 - p, d = digits[idx];
  var n = parseInt(digits.join(""), 10);
  if (Math.random() < 0.4) {
    var cls = p < 3 ? "lớp đơn vị" : p < 6 ? "lớp nghìn" : "lớp triệu";
    var wrongs = ["lớp đơn vị", "lớp nghìn", "lớp triệu"].filter(function (x) { return x !== cls; });
    return mcqQ("Trong số " + fmtN(n) + ", chữ số " + d + " thuộc lớp nào?", wrongs, cls, "Từ phải sang: ba hàng đầu thuộc lớp đơn vị, ba hàng tiếp theo thuộc lớp nghìn, tiếp nữa là lớp triệu. Chữ số " + d + " thuộc " + cls + ".");
  }
  var ans = "hàng " + G4_PLACE_NAMES[p];
  var others = shuffle(G4_PLACE_NAMES.filter(function (x, i) { return i !== p; })).slice(0, 2).map(function (x) { return "hàng " + x; });
  return mcqQ("Trong số " + fmtN(n) + ", chữ số " + d + " thuộc hàng nào?", others, ans, "Đếm hàng từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn, triệu, chục triệu, trăm triệu. Chữ số " + d + " ở " + ans + ".");
}
function g4RoundTo(place, label) {
  return function () {
    var n = rand(place + 1, place * 90), r = Math.round(n / place) * place;
    return numMCQ3("Làm tròn số " + fmtN(n) + " đến hàng " + label + " ta được số nào?", "", r, 0, place * 100, "Xét chữ số ngay bên phải hàng " + label + ": nếu từ 5 trở lên thì làm tròn lên, còn nhỏ hơn 5 thì giữ nguyên, các chữ số bên phải thay bằng 0. Kết quả: " + fmtN(r) + ".");
  };
}
function g4Compare() {
  var a = rand(10000, 99999999), b = rand(10000, 99999999), guard = 0;
  while (b === a && guard++ < 50) b = rand(10000, 99999999);
  var bigger = Math.random() < 0.5, opts = shuffle([a, b]);
  return { prompt: bigger ? "Số nào LỚN hơn?" : "Số nào BÉ hơn?", visual: '<div class="expr">' + fmtN(a) + " &nbsp;? &nbsp; " + fmtN(b) + "</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + fmtN(o) + "</span>" }; }), answer: opts.indexOf(bigger ? Math.max(a, b) : Math.min(a, b)), cols: 2,
    explain: "So sánh số chữ số trước; nếu bằng nhau thì so sánh lần lượt từ hàng cao nhất sang phải." };
}
function g4Sign() {
  var a = rand(1000, 999999), b = Math.random() < 0.18 ? a : rand(1000, 999999), guard = 0;
  while (b !== a && Math.abs(a - b) < 3 && guard++ < 30) b = rand(1000, 999999);
  var sign = a > b ? ">" : a < b ? "<" : "=";
  var opts = shuffle([">", "<", "="]);
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền dấu >, < hoặc = thích hợp!", blankText: sign,
    visual: '<div class="expr">' + fmtN(a) + " " + blankSlot() + " " + fmtN(b) + "</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(sign), cols: 3,
    explain: fmtN(a) + " " + sign + " " + fmtN(b) + "." };
}
function g4SeqNat() {
  var step = pick([1, 10, 100, 1000, 10000]), start = rand(2, 500) * step + rand(0, 900);
  var seq = [start, start + step, start + step * 2, start + step * 3], miss = pick([1, 2]), ans = seq[miss], row = "";
  seq.forEach(function (x, i) { row += i === miss ? blankSlot() : '<span class="seq-num">' + fmtN(x) + "</span>"; });
  return g3NumBlank("Điền số còn thiếu trong dãy số tự nhiên!", '<div class="seq-row">' + row + "</div>", ans, 0, start + step * 4);
}
function g4EvenOdd() {
  if (Math.random() < 0.5) {
    var n = rand(100, 999999), ev = n % 2 === 0;
    return mcqQ("Số " + fmtN(n) + " là số chẵn hay số lẻ?", [ev ? "Số lẻ" : "Số chẵn"], ev ? "Số chẵn" : "Số lẻ", "Số có chữ số tận cùng là 0, 2, 4, 6, 8 là số chẵn; tận cùng là 1, 3, 5, 7, 9 là số lẻ. Số " + fmtN(n) + " tận cùng là " + (n % 10) + ".");
  }
  var wantEven = Math.random() < 0.5, target = rand(1000, 99999);
  if ((target % 2 === 0) !== wantEven) target++;
  var wrongs = [], guard = 0;
  while (wrongs.length < 2 && guard++ < 60) { var w = rand(1000, 99999); if ((w % 2 === 0) === wantEven) w++; if (wrongs.indexOf(w) === -1 && w !== target) wrongs.push(w); }
  return mcqQ(wantEven ? "Số nào dưới đây là số CHẴN?" : "Số nào dưới đây là số LẺ?", wrongs.map(function (x) { return fmtN(x); }), fmtN(target), "Chỉ có " + fmtN(target) + " là số " + (wantEven ? "chẵn (tận cùng là chữ số chẵn)" : "lẻ (tận cùng là chữ số lẻ)") + ".");
}
function g4ExprLetter() {
  var L = pick(["a", "b", "c", "m", "n"]), v = rand(3, 90), form = rand(0, 3), expr, ans, full;
  if (form === 0) { var k = rand(5, 500); expr = L + " + " + k; ans = v + k; full = v + " + " + k; }
  else if (form === 1) { var k2 = rand(2, v - 1); expr = L + " − " + k2; ans = v - k2; full = v + " − " + k2; }
  else if (form === 2) { var k3 = rand(2, 9); expr = L + " × " + k3; ans = v * k3; full = v + " × " + k3; }
  else { var k4 = pick([2, 3, 4, 5, 6]); v = k4 * rand(3, 30); expr = L + " : " + k4; ans = v / k4; full = v + " : " + k4; }
  return calcMCQ("Biểu thức chứa chữ", "Nếu " + L + " = " + fmtN(v) + " thì giá trị của biểu thức " + expr + " là bao nhiêu?", ans, 0, 10000, "Thay " + L + " = " + fmtN(v) + " vào biểu thức, ta tính: " + full + " = " + fmtN(ans) + ".");
}
function g4ThreeStep() {
  var v = rand(0, 2);
  if (v === 0) { var a = rand(2, 9), b = rand(3, 12), c = rand(2, 20), ans = a * b + c;
    return calcMCQ("Bài toán có ba bước tính", "Bạn An mua " + a + " hộp bút, mỗi hộp có " + b + " cái bút, rồi mua thêm " + c + " cái bút lẻ. Hỏi An có tất cả bao nhiêu cái bút?", ans, 0, 500, "Bước 1: số bút trong các hộp: " + a + " × " + b + " = " + (a * b) + " cái. Bước 2: tất cả: " + (a * b) + " + " + c + " = " + ans + " cái."); }
  if (v === 1) { var a2 = rand(400, 950), b2 = rand(60, 300), c2 = rand(40, 250); if (b2 + c2 >= a2) { b2 = 120; c2 = 90; } var ans2 = a2 - b2 - c2;
    return calcMCQ("Bài toán có ba bước tính", "Một cửa hàng có " + a2 + " kg gạo. Buổi sáng bán " + b2 + " kg, buổi chiều bán " + c2 + " kg. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?", ans2, 0, 1200, "Còn lại: " + a2 + " − " + b2 + " − " + c2 + " = " + ans2 + " kg."); }
  var x = rand(3, 15), y = rand(3, 15), z = rand(2, 6), ans3 = (x + y) * z;
  return calcMCQ("Bài toán có ba bước tính", "Một đội công nhân mỗi ngày làm được " + x + " sản phẩm vào buổi sáng và " + y + " sản phẩm vào buổi chiều. Hỏi trong " + z + " ngày, đội làm được bao nhiêu sản phẩm?", ans3, 0, 600, "Mỗi ngày làm: " + x + " + " + y + " = " + (x + y) + " sản phẩm. Trong " + z + " ngày: " + (x + y) + " × " + z + " = " + ans3 + " sản phẩm.");
}
function g4AddSub(max) {
  return function () {
    var add = Math.random() < 0.5;
    var a = rand(Math.floor(max / 8), max), b = rand(Math.floor(max / 25), Math.floor(max / 2));
    if (!add && b > a) { var t = a; a = b; b = t; }
    var ans = add ? a + b : a - b;
    return calcMCQ("Cộng, trừ số có nhiều chữ số", fmtN(a) + (add ? " + " : " − ") + fmtN(b) + " = ?", ans, 0, max * 2, "Đặt tính: viết các chữ số cùng hàng thẳng cột, tính từ phải sang trái. Kết quả: " + fmtN(ans) + ".");
  };
}
function g4AddSubWord() {
  var v = rand(0, 1);
  if (v === 0) { var a = rand(12000, 900000), b = rand(3000, 400000), ans = a + b;
    return calcMCQ("Bài toán lời văn", "Một nhà máy tháng trước sản xuất được " + fmtN(a) + " sản phẩm, tháng này sản xuất được " + fmtN(b) + " sản phẩm. Hỏi cả hai tháng nhà máy sản xuất được bao nhiêu sản phẩm?", ans, 0, 2000000, "Cả hai tháng: " + fmtN(a) + " + " + fmtN(b) + " = " + fmtN(ans) + " sản phẩm."); }
  var a2 = rand(200000, 950000), b2 = rand(50000, a2 - 10000), ans2 = a2 - b2;
  return calcMCQ("Bài toán lời văn", "Một kho chứa " + fmtN(a2) + " kg thóc. Người ta đã xuất kho " + fmtN(b2) + " kg. Hỏi trong kho còn lại bao nhiêu ki-lô-gam thóc?", ans2, 0, 1000000, "Còn lại: " + fmtN(a2) + " − " + fmtN(b2) + " = " + fmtN(ans2) + " kg.");
}
var G4_CONV_CASES = [
  ["tấn", "kg", 1000], ["tạ", "kg", 100], ["yến", "kg", 10], ["tấn", "tạ", 10], ["tạ", "yến", 10], ["tấn", "yến", 100],
  ["m²", "dm²", 100], ["dm²", "cm²", 100], ["cm²", "mm²", 100], ["m²", "cm²", 10000],
  ["giờ", "phút", 60], ["phút", "giây", 60], ["giờ", "giây", 3600], ["thế kỉ", "năm", 100], ["tuần", "ngày", 7], ["ngày", "giờ", 24]
];
function g4Convert() {
  var c = pick(G4_CONV_CASES);
  if (Math.random() < 0.65) { var k = c[2] >= 1000 ? rand(2, 12) : rand(2, 30), ans = k * c[2];
    return calcMCQ("Đổi đơn vị đo", k + " " + c[0] + " = ? " + c[1], ans, 0, ans * 2 + 100, "1 " + c[0] + " = " + fmtN(c[2]) + " " + c[1] + ", nên " + k + " " + c[0] + " = " + fmtN(ans) + " " + c[1] + "."); }
  var k2 = c[2] >= 1000 ? rand(2, 12) : rand(2, 30), big = k2 * c[2];
  return calcMCQ("Đổi đơn vị đo", fmtN(big) + " " + c[1] + " = ? " + c[0], k2, 0, 120, "Vì 1 " + c[0] + " = " + fmtN(c[2]) + " " + c[1] + " nên " + fmtN(big) + " " + c[1] + " = " + k2 + " " + c[0] + ".");
}
function g4ConvertMixed() {
  var v = rand(0, 2);
  if (v === 0) { var t = rand(1, 9), ta = rand(1, 9), ans = t * 1000 + ta * 100;
    return calcMCQ("Đổi đơn vị đo", t + " tấn " + ta + " tạ = ? kg", ans, 0, 20000, t + " tấn = " + fmtN(t * 1000) + " kg; " + ta + " tạ = " + fmtN(ta * 100) + " kg. Cộng lại: " + fmtN(ans) + " kg."); }
  if (v === 1) { var a = rand(1, 9), b = rand(5, 95), ans2 = a * 100 + b;
    return calcMCQ("Đổi đơn vị đo", a + " m² " + b + " dm² = ? dm²", ans2, 0, 1200, "1 m² = 100 dm² nên " + a + " m² " + b + " dm² = " + fmtN(ans2) + " dm²."); }
  var h = rand(1, 5), m = rand(5, 55), ans3 = h * 60 + m;
  return calcMCQ("Đổi đơn vị đo", h + " giờ " + m + " phút = ? phút", ans3, 0, 600, "1 giờ = 60 phút nên " + h + " giờ " + m + " phút = " + ans3 + " phút.");
}
function g4PropAdd() {
  var v = rand(0, 2);
  if (v === 0) { var a = rand(11, 99), b = rand(11, 99);
    return g3NumBlank("Điền số thích hợp vào chỗ trống! (Tính chất giao hoán của phép cộng: đổi chỗ hai số hạng, tổng không thay đổi.)", '<div class="expr">' + a + " + " + b + " = " + b + " + " + blankSlot() + "</div>", a, 0, 200); }
  if (v === 1) { var a2 = rand(12, 88), c2 = 100 - a2, b2 = rand(11, 99), ans = a2 + b2 + c2;
    return calcMCQ("Tính bằng cách thuận tiện nhất", a2 + " + " + b2 + " + " + c2 + " = ?", ans, 0, 400, "Nhóm " + a2 + " + " + c2 + " = 100 cho tròn trăm, rồi cộng " + b2 + ": kết quả " + ans + "."); }
  var x = rand(11, 99), y = rand(11, 99), z = rand(11, 99);
  return mcqQ("Theo tính chất kết hợp của phép cộng, biểu thức (" + x + " + " + y + ") + " + z + " bằng biểu thức nào?", ["(" + x + " + " + z + ") + " + z, x + " + " + y + " − " + z], x + " + (" + y + " + " + z + ")", "Khi cộng ba số, ta có thể cộng hai số đầu tiên hoặc hai số cuối cùng trước, kết quả vẫn bằng nhau.");
}
function g4SumDiff() {
  var small = rand(15, 400), diff = rand(5, 300), big = small + diff, sum = big + small;
  if (Math.random() < 0.5) return calcMCQ("Tìm hai số biết tổng và hiệu", "Hai số có tổng là " + sum + " và hiệu là " + diff + ". Số lớn là số nào?", big, 0, 1000, "Số lớn = (tổng + hiệu) : 2 = (" + sum + " + " + diff + ") : 2 = " + big + ".");
  return calcMCQ("Tìm hai số biết tổng và hiệu", "Hai số có tổng là " + sum + " và hiệu là " + diff + ". Số bé là số nào?", small, 0, 1000, "Số bé = (tổng − hiệu) : 2 = (" + sum + " − " + diff + ") : 2 = " + small + ".");
}
function g4SumDiffWord() {
  var small = rand(20, 300) * 10, diff = rand(5, 120) * 10, big = small + diff, sum = big + small;
  var askBig = Math.random() < 0.5;
  return calcMCQ("Bài toán tổng – hiệu", "Hai thùng chứa tất cả " + fmtN(sum) + " lít dầu. Thùng thứ nhất chứa nhiều hơn thùng thứ hai " + fmtN(diff) + " lít. Hỏi thùng thứ " + (askBig ? "nhất" : "hai") + " chứa bao nhiêu lít dầu?", askBig ? big : small, 0, 10000,
    "Thùng thứ nhất (số lớn) = (" + fmtN(sum) + " + " + fmtN(diff) + ") : 2 = " + fmtN(big) + " lít; thùng thứ hai = " + fmtN(big) + " − " + fmtN(diff) + " = " + fmtN(small) + " lít.");
}
/* ---------- Góc ---------- */
var G4_ANGLE_NAMES = ["AOB", "COD", "EOF", "MNP", "RST", "XYZ"];
function g4AngleKind() {
  var kind = pick(["nhọn", "tù", "vuông", "bẹt"]);
  var deg = kind === "nhọn" ? pick([25, 35, 45, 60, 75, 80]) : kind === "tù" ? pick([100, 115, 130, 145, 160]) : kind === "vuông" ? 90 : 180;
  var name = pick(G4_ANGLE_NAMES), vertex = name.charAt(1);
  var tpl = pick(["Góc " + name + " trong hình là góc gì?", "Quan sát hình vẽ: góc " + name + " thuộc loại góc nào?", "Hình vẽ cho thấy góc " + name + ". Đó là góc gì?"]);
  var wrongs = ["Góc nhọn", "Góc tù", "Góc vuông", "Góc bẹt"].filter(function (x) { return x !== "Góc " + kind; }).slice(0, 3);
  var all = shuffle(["Góc " + kind].concat(wrongs));
  return { prompt: tpl, visual: angleSVG(deg, vertex), options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: all.indexOf("Góc " + kind), cols: 2,
    explain: "Góc " + name + " có số đo " + deg + "°. " + (kind === "nhọn" ? "Góc nhọn nhỏ hơn 90°." : kind === "tù" ? "Góc tù lớn hơn 90° và nhỏ hơn 180°." : kind === "vuông" ? "Góc vuông bằng 90°." : "Góc bẹt bằng 180°, hai cạnh tạo thành một đường thẳng.") };
}
function g4AngleMeasure() {
  var deg = pick([20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 135, 150, 170]);
  var name = pick(G4_ANGLE_NAMES), vertex = name.charAt(1);
  var opts = numOptions(deg, 5, 180, 4);
  return { prompt: "Thước đo góc cho biết góc " + name + " có số đo là bao nhiêu độ? Hãy chọn số đo đúng với hình vẽ!", visual: angleSVG(deg, vertex),
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "°</span>" }; }), answer: opts.indexOf(deg), cols: 4,
    explain: "Đặt thước đo góc sao cho tâm thước trùng với đỉnh " + vertex + ", một cạnh của góc đi qua vạch 0, cạnh còn lại chỉ số đo " + deg + "°." };
}
function g4AngleClock() {
  var h = rand(1, 6), deg = h * 30;
  var kind = deg < 90 ? "nhọn" : deg === 90 ? "vuông" : deg === 180 ? "bẹt" : "tù";
  if (Math.random() < 0.5) {
    var wrongs = ["Góc nhọn", "Góc tù", "Góc vuông", "Góc bẹt"].filter(function (x) { return x !== "Góc " + kind; }).slice(0, 2);
    return mcqQ("Lúc " + h + " giờ đúng, kim giờ và kim phút của đồng hồ tạo thành góc gì?", wrongs, "Góc " + kind, "Mặt đồng hồ chia thành 12 phần bằng nhau, mỗi phần ứng với 30°. Lúc " + h + " giờ, hai kim cách nhau " + h + " phần, tạo góc " + deg + "° nên là góc " + kind + ".", clockSVG(h));
  }
  return numMCQ3("Lúc " + h + " giờ đúng, kim giờ và kim phút của đồng hồ tạo thành một góc bao nhiêu độ?", clockSVG(h), deg, 0, 360, "Mỗi giờ trên mặt đồng hồ ứng với 30°: " + h + " × 30° = " + deg + "°.");
}
function g4AngleCompare() {
  var v = rand(0, 2);
  if (v === 0) { var d = pick([15, 28, 44, 59, 73, 89]);
    var qa = mcqQ("Góc có số đo " + d + "° là góc gì?", ["Góc tù", "Góc bẹt"], "Góc nhọn", d + "° nhỏ hơn 90° nên là góc nhọn."); qa.figure = angleSVG(d, "O"); return qa; }
  if (v === 1) { var d2 = pick([95, 108, 126, 144, 159, 175]);
    var qb = mcqQ("Góc có số đo " + d2 + "° là góc gì?", ["Góc nhọn", "Góc vuông"], "Góc tù", d2 + "° lớn hơn 90° và nhỏ hơn 180° nên là góc tù."); qb.figure = angleSVG(d2, "O"); return qb; }
  var k = rand(2, 4);
  return mcqQ("Góc bẹt bằng " + k + " góc vuông cộng lại có đúng không? Biết góc bẹt là 180° và góc vuông là 90°.", ["Đúng, vì " + k + " × 90° = " + (k * 90) + "°", "Không so sánh được"], k === 2 ? "Đúng, góc bẹt bằng 2 góc vuông" : "Sai, góc bẹt chỉ bằng 2 góc vuông", "Góc bẹt 180° = 2 × 90°, tức bằng đúng 2 góc vuông.");
}
/* ---------- Đường thẳng và hình ---------- */
function g4LinesKind() {
  var kind = pick(["perp", "parallel", "cross"]);
  var tag = pick(["Hình A", "Hình B", "Hình C", "Hình D", "Hình vẽ"]);
  var ans = kind === "perp" ? "Hai đường thẳng vuông góc" : kind === "parallel" ? "Hai đường thẳng song song" : "Hai đường thẳng cắt nhau (không vuông góc)";
  var wrongs = ["Hai đường thẳng vuông góc", "Hai đường thẳng song song", "Hai đường thẳng cắt nhau (không vuông góc)"].filter(function (x) { return x !== ans; });
  return mcqQ(tag + ": hai đường thẳng trong hình có quan hệ gì với nhau?", wrongs, ans,
    kind === "perp" ? "Hai đường thẳng cắt nhau và tạo thành góc vuông nên chúng vuông góc với nhau." : kind === "parallel" ? "Hai đường thẳng không bao giờ cắt nhau nên chúng song song với nhau." : "Hai đường thẳng gặp nhau tại một điểm nhưng không tạo thành góc vuông.", linesSVG(kind));
}
function g4QuadKind() {
  var type = pick(["binhhanh", "thoi", "chunhat", "vuong"]);
  var names = { binhhanh: "Hình bình hành", thoi: "Hình thoi", chunhat: "Hình chữ nhật", vuong: "Hình vuông" };
  var tag = pick(["A", "B", "C", "D"]);
  var wrongs = ["Hình bình hành", "Hình thoi", "Hình chữ nhật", "Hình vuông"].filter(function (x) { return x !== names[type]; }).slice(0, 2);
  var expl = { binhhanh: "Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.", thoi: "Hình thoi có bốn cạnh bằng nhau và hai cặp cạnh đối diện song song.", chunhat: "Hình chữ nhật có bốn góc vuông, hai cặp cạnh đối diện bằng nhau.", vuong: "Hình vuông có bốn cạnh bằng nhau và bốn góc vuông." };
  return mcqQ("Hình " + tag + " dưới đây là hình gì?", wrongs, names[type], expl[type], quadSVG(type, tag));
}
function g4QuadPeri() {
  var a = rand(3, 15), b = rand(3, 15); while (b === a) b = rand(3, 15);
  var type = pick(["binhhanh", "thoi", "chunhat"]);
  if (type === "thoi") { var s = rand(3, 15);
    return calcMCQ("Chu vi hình thoi", "Một hình thoi có cạnh " + s + " cm. Chu vi của hình thoi là bao nhiêu?", s * 4, 0, 100, "Hình thoi có 4 cạnh bằng nhau: chu vi = " + s + " × 4 = " + (s * 4) + " cm."); }
  var nm = type === "binhhanh" ? "hình bình hành" : "hình chữ nhật";
  return calcMCQ("Chu vi " + nm, "Một " + nm + " có hai cạnh kề là " + a + " cm và " + b + " cm. Chu vi của hình là bao nhiêu?", (a + b) * 2, 0, 200, "Chu vi = (cạnh dài + cạnh ngắn) × 2 = (" + a + " + " + b + ") × 2 = " + ((a + b) * 2) + " cm.");
}
/* ---------- Nhân, chia ---------- */
function g4Mul1() { var a = rand(1023, 49999), b = rand(2, 9);
  return calcMCQ("Nhân với số có một chữ số", fmtN(a) + " × " + b + " = ?", a * b, 0, 999999, "Nhân lần lượt từ phải sang trái, nhớ sang hàng bên trái khi cần. " + fmtN(a) + " × " + b + " = " + fmtN(a * b) + "."); }
function g4Div1() { var b = rand(2, 9), q = rand(102, 9999), a = b * q;
  return calcMCQ("Chia cho số có một chữ số", fmtN(a) + " : " + b + " = ?", q, 0, 99999, "Vì " + b + " × " + fmtN(q) + " = " + fmtN(a) + " nên " + fmtN(a) + " : " + b + " = " + fmtN(q) + "."); }
function g4Mul2() { var a = rand(13, 999), b = rand(11, 99);
  return calcMCQ("Nhân với số có hai chữ số", fmtN(a) + " × " + b + " = ?", a * b, 0, 99999, "Nhân " + fmtN(a) + " với từng chữ số của " + b + " rồi cộng các tích riêng (tích riêng thứ hai lùi sang trái một cột). Kết quả: " + fmtN(a * b) + "."); }
function g4Div2() { var b = rand(11, 99), q = rand(11, 99), a = b * q;
  return calcMCQ("Chia cho số có hai chữ số", fmtN(a) + " : " + b + " = ?", q, 0, 999, "Vì " + b + " × " + q + " = " + fmtN(a) + " nên " + fmtN(a) + " : " + b + " = " + q + "."); }
function g4MulDivPow() {
  var k = pick([10, 100, 1000]);
  if (Math.random() < 0.5) { var a = rand(2, 999);
    return calcMCQ("Nhân với 10, 100, 1 000", fmtN(a) + " × " + fmtN(k) + " = ?", a * k, 0, 999999, "Khi nhân một số với " + fmtN(k) + ", ta viết thêm " + (k === 10 ? "một" : k === 100 ? "hai" : "ba") + " chữ số 0 vào bên phải số đó: " + fmtN(a * k) + "."); }
  var q = rand(2, 999), a2 = q * k;
  return calcMCQ("Chia cho 10, 100, 1 000", fmtN(a2) + " : " + fmtN(k) + " = ?", q, 0, 99999, "Khi chia một số tròn chục, tròn trăm cho " + fmtN(k) + ", ta bớt đi số chữ số 0 tương ứng ở bên phải: kết quả " + fmtN(q) + ".");
}
function g4Distrib() {
  var a = rand(3, 15), b = rand(3, 15), c = rand(2, 9), ans = (a + b) * c;
  if (Math.random() < 0.5) return calcMCQ("Tính chất phân phối của phép nhân đối với phép cộng", "(" + a + " + " + b + ") × " + c + " = ?", ans, 0, 300, "(" + a + " + " + b + ") × " + c + " = " + a + " × " + c + " + " + b + " × " + c + " = " + (a * c) + " + " + (b * c) + " = " + ans + ".");
  return calcMCQ("Tính chất phân phối của phép nhân đối với phép cộng", a + " × " + c + " + " + b + " × " + c + " = ?", ans, 0, 300, a + " × " + c + " + " + b + " × " + c + " = (" + a + " + " + b + ") × " + c + " = " + ans + ".");
}
function g4Average() {
  var cnt = pick([3, 4]), nums = [], sum = 0;
  for (var i = 0; i < cnt; i++) { var n = rand(4, 40); nums.push(n); sum += n; }
  while (sum % cnt !== 0) { nums[0]++; sum++; }
  var avg = sum / cnt;
  var ctx = pick([
    "Số điểm kiểm tra của bạn Mai trong " + cnt + " lần là: " + nums.join("; ") + ". Điểm trung bình mỗi lần của Mai là bao nhiêu?",
    "Một nhóm có " + cnt + " bạn nặng lần lượt là: " + nums.join("; ") + " (kg). Cân nặng trung bình của mỗi bạn là bao nhiêu ki-lô-gam?",
    "Trong " + cnt + " ngày, cửa hàng bán được số bút lần lượt là: " + nums.join("; ") + " cái. Trung bình mỗi ngày cửa hàng bán được bao nhiêu cái bút?"
  ]);
  return calcMCQ("Trung bình cộng", ctx, avg, 0, 100, "Trung bình cộng = tổng các số : số số hạng = " + sum + " : " + cnt + " = " + avg + ".");
}
function g4UnitRate() {
  var unit = pick([2000, 3000, 4000, 5000, 6000]), k = rand(2, 9), m = rand(3, 9); while (m === k) m = rand(3, 9);
  var item = pick([["quyển vở", "vở"], ["cái bút", "bút"], ["quả cam", "cam"], ["cái bánh", "bánh"]]);
  var total = unit * k, ans = unit * m;
  return calcMCQ("Bài toán rút về đơn vị", "Mua " + k + " " + item[0] + " hết " + fmtN(total) + " đồng. Hỏi mua " + m + " " + item[0] + " như thế hết bao nhiêu tiền?", ans, 0, 100000,
    "Giá 1 " + item[1] + ": " + fmtN(total) + " : " + k + " = " + fmtN(unit) + " đồng. Mua " + m + " " + item[0] + ": " + fmtN(unit) + " × " + m + " = " + fmtN(ans) + " đồng.");
}
function g4Estimate() {
  var a = rand(120, 980), b = rand(12, 98);
  var ra = Math.round(a / 100) * 100, rb = Math.round(b / 10) * 10, ans = ra * rb;
  return mcqQ("Ước lượng kết quả của phép nhân " + fmtN(a) + " × " + b + " (làm tròn " + fmtN(a) + " đến hàng trăm, " + b + " đến hàng chục) được khoảng bao nhiêu?", [fmtN(ans + rb * 2), fmtN(Math.floor(ans / 2)), fmtN(a * b)], fmtN(ans), "Làm tròn: " + fmtN(a) + " ≈ " + fmtN(ra) + ", " + b + " ≈ " + rb + ". Ước lượng: " + fmtN(ra) + " × " + rb + " = " + fmtN(ans) + ".");
}
/* ---------- Thống kê ---------- */
function g4BarRead() {
  var sets = [
    ["Số sách các lớp quyên góp (quyển)", ["Lớp 4A", "Lớp 4B", "Lớp 4C", "Lớp 4D"], "quyển sách"],
    ["Số học sinh thích mỗi môn học (bạn)", ["Toán", "Tiếng Việt", "Âm nhạc", "Mĩ thuật"], "bạn"],
    ["Số cây các tổ trồng được (cây)", ["Tổ 1", "Tổ 2", "Tổ 3", "Tổ 4"], "cây"]
  ];
  var s = pick(sets), vals = [], guard = 0;
  while (vals.length < 4) { var v = rand(6, 38); if (vals.indexOf(v) === -1) vals.push(v); }
  var data = s[1].map(function (lb, i) { return [lb, vals[i]]; });
  var visual = barChart4(s[0], data, s[2]);
  var v = rand(0, 4);
  if (v === 0) { var mx = Math.max.apply(null, vals), nm = s[1][vals.indexOf(mx)];
    return mcqQ("Nhìn biểu đồ cột: nhóm nào có số lượng NHIỀU nhất?", s[1].filter(function (x) { return x !== nm; }).slice(0, 2), nm, "Cột cao nhất là " + nm + " với " + mx + " " + s[2] + ".", visual); }
  if (v === 1) { var mn = Math.min.apply(null, vals), nm2 = s[1][vals.indexOf(mn)];
    return mcqQ("Nhìn biểu đồ cột: nhóm nào có số lượng ÍT nhất?", s[1].filter(function (x) { return x !== nm2; }).slice(0, 2), nm2, "Cột thấp nhất là " + nm2 + " với " + mn + " " + s[2] + ".", visual); }
  if (v === 2) { var idx = rand(0, 3);
    return numMCQ3("Nhìn biểu đồ cột: số lượng của " + s[1][idx] + " là bao nhiêu?", visual, vals[idx], 0, 60, "Đọc số ghi trên cột " + s[1][idx] + ": " + vals[idx] + " " + s[2] + "."); }
  if (v === 3) { var tot = vals.reduce(function (x, y) { return x + y; }, 0);
    return numMCQ3("Nhìn biểu đồ cột: tổng số lượng của cả bốn nhóm là bao nhiêu?", visual, tot, 0, 200, "Cộng số trên bốn cột: " + vals.join(" + ") + " = " + tot + " " + s[2] + "."); }
  var i1 = rand(0, 3), i2 = rand(0, 3); while (i2 === i1) i2 = rand(0, 3);
  var diff = Math.abs(vals[i1] - vals[i2]);
  return numMCQ3("Nhìn biểu đồ cột: " + s[1][i1] + " hơn (hoặc kém) " + s[1][i2] + " bao nhiêu?", visual, diff, 0, 60, s[1][i1] + " có " + vals[i1] + ", " + s[1][i2] + " có " + vals[i2] + ". Chênh lệch: |" + vals[i1] + " − " + vals[i2] + "| = " + diff + " " + s[2] + ".");
}
function g4DataSeries() {
  var days = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"];
  var temps = [], guard = 0;
  while (temps.length < 5) { var t = rand(18, 34); if (temps.indexOf(t) === -1) temps.push(t); }
  var visual = '<div class="chart-box">🌡️ Nhiệt độ lúc 12 giờ trưa trong 5 ngày:<br>' + days.map(function (d, i) { return d + ": " + temps[i] + "°C"; }).join("<br>") + "</div>";
  var v = rand(0, 2);
  if (v === 0) { var mx = Math.max.apply(null, temps), di = temps.indexOf(mx);
    return mcqQ("Nhìn dãy số liệu: ngày nào có nhiệt độ CAO nhất?", days.filter(function (x) { return x !== days[di]; }).slice(0, 2), days[di], "Nhiệt độ cao nhất là " + mx + "°C vào " + days[di] + ".", visual); }
  if (v === 1) { var mn = Math.min.apply(null, temps), dj = temps.indexOf(mn);
    return mcqQ("Nhìn dãy số liệu: ngày nào có nhiệt độ THẤP nhất?", days.filter(function (x) { return x !== days[dj]; }).slice(0, 2), days[dj], "Nhiệt độ thấp nhất là " + mn + "°C vào " + days[dj] + ".", visual); }
  return numMCQ3("Dãy số liệu nhiệt độ trên có bao nhiêu số liệu?", visual, 5, 0, 10, "Đếm số ngày được ghi: 5 ngày nên dãy có 5 số liệu.");
}
function g4EventCount() {
  if (Math.random() < 0.5) {
    var face = rand(1, 6), total = 12, cnt = 0, rolls = [];
    for (var i = 0; i < total; i++) { var r = rand(1, 6); rolls.push(r); if (r === face) cnt++; }
    if (cnt === 0) { rolls[0] = face; cnt = 1; }
    return numMCQ3("Bạn Tí gieo một con xúc xắc 12 lần và ghi lại mặt xuất hiện: " + rolls.join(", ") + ". Mặt " + face + " chấm xuất hiện bao nhiêu lần?", "", cnt, 0, 12, "Đếm trong dãy kết quả: mặt " + face + " chấm xuất hiện " + cnt + " lần.");
  }
  var seq = [], cs = 0;
  for (var j = 0; j < 10; j++) { var c = Math.random() < 0.5 ? "Ngửa" : "Sấp"; seq.push(c); if (c === "Sấp") cs++; }
  return numMCQ3("Bạn Hoa tung một đồng xu 10 lần, kết quả lần lượt là: " + seq.join(", ") + ". Mặt sấp xuất hiện bao nhiêu lần?", "", cs, 0, 10, "Đếm các kết quả “Sấp” trong 10 lần tung: " + cs + " lần.");
}
/* ---------- Phân số ---------- */
function g4FracConcept() {
  var v = rand(0, 2);
  if (v === 0) { var d = pick([3, 4, 5, 6, 8]), n = rand(1, d - 1);
    var qc = fracMCQ("Một hình được chia thành " + d + " phần bằng nhau và tô màu " + n + " phần. Phân số chỉ phần đã tô màu là bao nhiêu?", "", n, d, "Số phần tô màu là tử số (" + n + "), tổng số phần bằng nhau là mẫu số (" + d + "). Phân số là " + n + "/" + d + ".");
    /* Đợt hình Tiểu học (v22): hình tròn/thanh chia phần SVG — phần tô là DỮ
       KIỆN đề (đề cũng nói bằng lời); phân số trả lời không in trong hình. */
    qc.figure = Math.random() < 0.5 ? figFracPieSVG(n, d) : figFracBarSVG(n, d);
    return qc; }
  if (v === 1) { var d2 = pick([4, 5, 7, 9]), n2 = rand(1, d2 - 1);
    return mcqQ("Trong phân số " + n2 + "/" + d2 + ", số " + n2 + " (ở trên dấu gạch ngang) gọi là gì?", ["Mẫu số", "Số chia"], "Tử số", "Trong phân số, số viết trên dấu gạch ngang là tử số, số viết dưới là mẫu số."); }
  var dd = pick([3, 4, 5, 6]), opts = [rand(1, dd - 1) + "/" + dd, (dd + 1) + "/" + dd, dd + "/" + dd], ans = opts[0];
  return mcqQ("Phân số nào dưới đây BÉ hơn 1?", [opts[1], opts[2]], ans, "Phân số bé hơn 1 khi tử số nhỏ hơn mẫu số: " + ans + ".");
}
function g4FracDiv() {
  var a = rand(1, 9), b = pick([2, 3, 4, 5, 6, 7, 8, 9]); while (b === a) b = rand(2, 9);
  if (Math.random() < 0.5) return fracMCQ("Phép chia " + a + " : " + b + " được viết dưới dạng phân số là bao nhiêu?", "", a, b, "Mọi phép chia số tự nhiên đều viết được dưới dạng phân số: " + a + " : " + b + " = " + a + "/" + b + " (số bị chia là tử số, số chia là mẫu số).");
  return mcqQ("Phân số " + a + "/" + b + " là kết quả của phép chia nào?", [(b + " : " + a), (a + " × " + b)], a + " : " + b, "Phân số " + a + "/" + b + " ứng với phép chia " + a + " : " + b + ".");
}
function g4FracEquiv() {
  var d = pick([2, 3, 4, 5, 6]), n = rand(1, d - 1), k = rand(2, 6);
  return fracMCQ("Phân số nào bằng phân số " + n + "/" + d + "?", "", n * k, d * k, "Nhân cả tử số và mẫu số của " + n + "/" + d + " với " + k + ": được " + (n * k) + "/" + (d * k) + ". Hai phân số bằng nhau.");
}
function g4FracReduce() {
  var g = pick([2, 3, 4, 5, 6]), d = pick([2, 3, 4, 5, 6, 7, 8]), n = rand(1, d - 1);
  return fracMCQ("Rút gọn phân số " + (n * g) + "/" + (d * g) + " ta được phân số nào?", "", n, d, "Chia cả tử số và mẫu số cho " + g + ": " + (n * g) + "/" + (d * g) + " = " + n + "/" + d + ".");
}
function g4FracCommonDen() {
  var b = pick([2, 3, 4, 5]), k = pick([2, 3, 4]), d = b * k, n = rand(1, b - 1), m = rand(1, d - 1);
  return fracMCQRaw("Quy đồng mẫu số hai phân số " + n + "/" + b + " và " + m + "/" + d + " (chọn mẫu số chung là " + d + "), phân số " + n + "/" + b + " được viết thành phân số nào?", "", n * k, d, "Nhân cả tử và mẫu của " + n + "/" + b + " với " + k + ": được " + (n * k) + "/" + d + ", cùng mẫu số " + d + " với phân số kia.");
}
function g4FracCompare() {
  var v = rand(0, 2);
  if (v === 0) { var d = pick([4, 5, 6, 7, 8, 9]), a = rand(1, d - 1), b = rand(1, d - 1); while (b === a) b = rand(1, d - 1);
    var big = Math.max(a, b) + "/" + d;
    var q0 = mcqQ("Trong hai phân số " + a + "/" + d + " và " + b + "/" + d + ", phân số nào LỚN hơn?", [Math.min(a, b) + "/" + d, "Hai phân số bằng nhau"], big, "Hai phân số cùng mẫu số: phân số nào có tử số lớn hơn thì lớn hơn.");
    /* Hình tô CẢ HAI phân số được hỏi (đều là dữ kiện đề cho); phán quyết
       phân số nào lớn hơn không hề được vẽ hay ghi trong hình. */
    if (Math.random() < 0.8) q0.figure = figFracBars2SVG(a, d, b, d);
    return q0; }
  if (v === 1) { var n = rand(1, 5), d1 = pick([3, 4, 5, 6]), d2 = pick([7, 8, 9, 10]);
    var q1 = mcqQ("Trong hai phân số " + n + "/" + d1 + " và " + n + "/" + d2 + ", phân số nào LỚN hơn?", [n + "/" + d2, "Hai phân số bằng nhau"], n + "/" + d1, "Hai phân số cùng tử số: phân số nào có mẫu số bé hơn thì lớn hơn.");
    if (Math.random() < 0.8) q1.figure = figFracBars2SVG(n, d1, n, d2);
    return q1; }
  var d3 = pick([3, 4, 5]), a3 = rand(1, d3 * 2);
  var cmp = a3 < d3 ? "bé hơn 1" : a3 === d3 ? "bằng 1" : "lớn hơn 1";
  return mcqQ("Phân số " + a3 + "/" + d3 + " có đặc điểm gì?", ["bé hơn 1", "bằng 1", "lớn hơn 1"].filter(function (x) { return x !== cmp; }), cmp, "Tử số " + a3 + (a3 < d3 ? " nhỏ hơn" : a3 === d3 ? " bằng" : " lớn hơn") + " mẫu số " + d3 + " nên phân số " + cmp + ".");
}
function g4FracAddSub(sameDen) {
  return function () {
    var add = Math.random() < 0.5;
    if (sameDen) {
      var d = pick([4, 5, 6, 7, 8, 9, 10, 12]), a = rand(1, d + 2), b = rand(1, d - 1), n, expr;
      if (add) { n = a + b; expr = opFrac4(a, d) + " + " + opFrac4(b, d); }
      else { if (a <= b) { var t = a; a = b + rand(1, 3); } n = a - b; expr = opFrac4(a, d) + " − " + opFrac4(b, d); }
      var qA = fracMCQ("Tính: " + expr + " = ?", "", n, d, "Hai phân số cùng mẫu số: giữ nguyên mẫu số, " + (add ? "cộng" : "trừ") + " hai tử số với nhau. Kết quả: " + expr + " = " + n + "/" + d + (gcd4(n, d) > 1 ? " = " + fracStr(n / gcd4(n, d), d / gcd4(n, d)) + " (đã rút gọn)" : "") + ".");
      /* Hai thanh tô đúng hai số hạng (dữ kiện); tổng/hiệu không vẽ. Chỉ gắn
         khi cả hai tử số không vượt mẫu số để thanh không bị cắt cụt. */
      if (a <= d && b <= d && Math.random() < 0.75) qA.figure = figFracBars2SVG(a, d, b, d);
      return qA;
    }
    var b2 = pick([2, 3, 4, 5, 6]), k = pick([2, 3]), d2 = b2 * k, a2 = rand(1, b2 - 1), c = rand(1, d2 - 1), n2, expr2;
    if (add) { n2 = a2 * k + c; expr2 = a2 + "/" + b2 + " + " + c + "/" + d2; }
    else { var t2 = a2 * k; if (t2 <= c) { c = rand(1, t2 - 1); } n2 = t2 - c; expr2 = a2 + "/" + b2 + " − " + c + "/" + d2; }
    var qB = fracMCQ("Tính: " + expr2 + " = ?", "", n2, d2, "Quy đồng mẫu số: " + a2 + "/" + b2 + " = " + (a2 * k) + "/" + d2 + ". Sau đó " + (add ? "cộng" : "trừ") + " hai tử số, giữ nguyên mẫu số " + d2 + ", rồi rút gọn nếu được.");
    if (Math.random() < 0.75) qB.figure = figFracBars2SVG(a2, b2, c, d2);
    return qB;
  };
}
function g4FracWord() {
  var d = pick([4, 5, 8, 10]), a = rand(1, d - 2), b = rand(1, d - a - 1), n = a + b;
  var q = fracMCQ("Bạn An ăn " + a + "/" + d + " cái bánh, bạn Bình ăn " + b + "/" + d + " cái bánh đó. Cả hai bạn ăn bao nhiêu phần của cái bánh?", "", n, d, "Cộng hai phân số cùng mẫu số: " + a + "/" + d + " + " + b + "/" + d + " = " + n + "/" + d + ".");
  if (Math.random() < 0.75) q.figure = figFracBars2SVG(a, d, b, d);
  return q;
}
function g4FracMul() {
  if (Math.random() < 0.5) { var a = rand(1, 5), b = pick([2, 3, 4, 5, 6]), c = rand(1, 5), d = pick([2, 3, 4, 5, 6]);
    var q1 = fracMCQ("Tính: " + opFrac4(a, b) + " × " + opFrac4(c, d) + " = ?", "", a * c, b * d, "Nhân hai phân số: tử số nhân tử số, mẫu số nhân mẫu số: " + opFrac4(a, b) + " × " + opFrac4(c, d) + " = " + (a * c) + "/" + (b * d) + (gcd4(a * c, b * d) > 1 ? " = " + fracStr(a * c / gcd4(a * c, b * d), b * d / gcd4(a * c, b * d)) + " (đã rút gọn)" : "") + ".");
    if (a <= b && c <= d && Math.random() < 0.65) q1.figure = figFracBars2SVG(a, b, c, d);
    return q1; }
  var n = rand(1, 6), dd = pick([2, 3, 4, 5, 6, 8]), k = rand(2, 9);
  var q2 = fracMCQ("Tính: " + opFrac4(n, dd) + " × " + k + " = ?", "", n * k, dd, "Nhân phân số với số tự nhiên: giữ nguyên mẫu số, nhân tử số với số tự nhiên: " + opFrac4(n, dd) + " × " + k + " = " + (n * k) + "/" + dd + ".");
  if (n <= dd && Math.random() < 0.65) q2.figure = figFracBarSVG(n, dd);
  return q2;
}
function g4FracDivPs() {
  var a = rand(1, 6), b = pick([2, 3, 4, 5]), c = rand(1, 6), d = pick([2, 3, 4, 5]);
  return fracMCQ("Tính: " + opFrac4(a, b) + " : " + opFrac4(c, d) + " = ?", "", a * d, b * c, "Chia hai phân số: lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược: " + opFrac4(a, b) + " : " + opFrac4(c, d) + " = " + opFrac4(a, b) + " × " + opFrac4(d, c) + " = " + (a * d) + "/" + (b * c) + (gcd4(a * d, b * c) > 1 ? " = " + fracStr(a * d / gcd4(a * d, b * c), b * c / gcd4(a * d, b * c)) + " (đã rút gọn)" : "") + ".");
}
function g4FracOfNum() {
  var d = pick([2, 3, 4, 5, 6, 8]), unit = rand(2, 12), total = d * unit, n = rand(1, d - 1), ans = n * unit;
  var ctx = pick([
    "Một lớp học có " + total + " học sinh, trong đó " + n + "/" + d + " số học sinh là nữ. Hỏi lớp có bao nhiêu học sinh nữ?",
    "Một cuộn dây dài " + total + " m. Người ta đã dùng " + n + "/" + d + " cuộn dây. Hỏi đã dùng bao nhiêu mét dây?",
    "Một vườn có " + total + " cây, trong đó " + n + "/" + d + " là cây cam. Hỏi vườn có bao nhiêu cây cam?"
  ]);
  var q = calcMCQ("Tìm phân số của một số", ctx, ans, 0, 200, "Tìm " + n + "/" + d + " của " + total + ": lấy " + total + " : " + d + " = " + unit + ", rồi " + unit + " × " + n + " = " + ans + ".");
  /* Thanh tô n/d là phân số đã cho trong đề; số lượng cần tìm không vẽ. */
  if (Math.random() < 0.75) q.figure = figFracBarSVG(n, d);
  return q;
}
/* ================= TOÁN 4 — chủ đề ================= */
var MATH4_TOPICS = [
  { id: "m4-ontap", emoji: "🔢", name: "Ôn tập và bổ sung", sub: "Bài 1–6 • Số đến 100 000, số chẵn lẻ, biểu thức chứa chữ, bài toán 3 bước", pools: { choose: [g4AddSub(100000), g4AddSub(100000), g4EvenOdd, g4ExprLetter, g4ThreeStep, g4Compare, g4SeqNat, g4ReadMillion], blank: [g4Sign, g4SeqNat, g3SeqBlank([100, 1000], 100000)], match: [g3MatchRead(100000)], games: [g3MemRead(100000), gTFCalcFactory(100), gCatchAnswerFactory(100), g3SortBig(100000)] } },
  { id: "m4-goc", emoji: "📐", name: "Góc và đơn vị đo góc", sub: "Bài 7–9 • Góc nhọn, góc tù, góc bẹt, góc vuông; đơn vị độ", pools: (function () { var kp = knowledgePools([
      ["Đơn vị đo góc là gì?", "Độ (kí hiệu °)", "Mét (m)", "Ki-lô-gam (kg)", "Góc được đo bằng đơn vị độ, kí hiệu là °."],
      ["Góc vuông có số đo bao nhiêu độ?", "90°", "180°", "45°", "Góc vuông có số đo 90°."],
      ["Góc bẹt có số đo bao nhiêu độ?", "180°", "90°", "360°", "Góc bẹt có số đo 180°, hai cạnh tạo thành một đường thẳng."],
      ["Góc nhọn là góc thế nào?", "Nhỏ hơn góc vuông (nhỏ hơn 90°)", "Lớn hơn góc vuông", "Bằng 180°", "Góc nhọn có số đo nhỏ hơn 90°."],
      ["Góc tù là góc thế nào?", "Lớn hơn góc vuông và nhỏ hơn góc bẹt (từ 90° đến 180°)", "Nhỏ hơn góc vuông", "Bằng 90°", "Góc tù có số đo lớn hơn 90° và nhỏ hơn 180°."],
      ["Dụng cụ dùng để đo góc là gì?", "Thước đo góc", "Thước kẻ thẳng", "Com-pa", "Thước đo góc (thước đo độ) có hình nửa hình tròn, chia vạch độ."],
      ["Khi đo góc, tâm của thước đo góc phải đặt ở đâu?", "Trùng với đỉnh của góc", "Ở giữa một cạnh của góc", "Ở ngoài góc", "Đặt tâm thước trùng đỉnh góc, một cạnh của góc đi qua vạch 0 của thước."],
      ["Góc bẹt bằng bao nhiêu góc vuông?", "2 góc vuông", "1 góc vuông", "4 góc vuông", "180° = 2 × 90°, nên góc bẹt bằng 2 góc vuông."],
      ["Hai cạnh của góc xuất phát từ đâu?", "Từ đỉnh của góc", "Từ hai điểm khác nhau", "Từ tâm đường tròn", "Góc gồm một đỉnh và hai cạnh là hai tia xuất phát từ đỉnh."],
      ["Góc nào lớn nhất trong bốn loại góc: nhọn, vuông, tù, bẹt?", "Góc bẹt", "Góc vuông", "Góc nhọn", "Thứ tự: góc nhọn < góc vuông < góc tù < góc bẹt."]
    ], [["Góc nhọn", "Nhỏ hơn 90°"], ["Góc vuông", "Bằng 90°"], ["Góc tù", "Từ 90° đến 180°"], ["Góc bẹt", "Bằng 180°"]], "Nối loại góc với số đo nhé!");
    kp.choose.push(g4AngleKind, g4AngleKind, g4AngleClock, g4AngleMeasure, g4AngleCompare);
    kp.blank.push(g4AngleKind);
    return kp; })() },
  { id: "m4-sotrieu", emoji: "🚀", name: "Số có nhiều chữ số (lớp triệu)", sub: "Bài 10–16 • Hàng và lớp, làm tròn, so sánh, dãy số tự nhiên", pools: { choose: [g4ReadMillion, g4WriteNum, g4DigitPlace, g4DigitPlace, g4RoundTo(100000, "trăm nghìn"), g4RoundTo(10000, "chục nghìn"), g4Compare, g4SeqNat], blank: [g4Sign, g4SeqNat, g4DigitPlace], match: [function () { var ns = []; while (ns.length < 4) { var n = rand(100000, 99999999); if (ns.indexOf(n) === -1) ns.push(n); } return matchQ("Nối số với cách đọc đúng nhé!", ns.map(function (n) { return { l: '<span class="opt-num">' + fmtN(n) + "</span>", r: '<span class="match-text">' + vnNum4(n) + "</span>" }; })); }], games: [function () { var ns = []; while (ns.length < 4) { var n = rand(100000, 99999999); if (ns.indexOf(n) === -1) ns.push(n); } return memQ("Lật thẻ tìm cặp đúng: số và cách đọc!", ns.map(function (n) { return { a: '<span class="mem-num">' + fmtN(n) + "</span>", b: '<span class="mem-text">' + vnNum4(n) + "</span>" }; })); }, g3SortBig(100000), gTFCalcFactory(100)] } },
  { id: "m4-donvi", emoji: "⚖️", name: "Một số đơn vị đo đại lượng", sub: "Bài 17–21 • Yến, tạ, tấn; dm², m², mm²; giây, thế kỉ", pools: (function () { var kp = knowledgePools([
      ["1 tấn bằng bao nhiêu ki-lô-gam?", "1 000 kg", "100 kg", "10 kg", "1 tấn = 10 tạ = 100 yến = 1 000 kg."],
      ["1 tạ bằng bao nhiêu yến?", "10 yến", "100 yến", "5 yến", "1 tạ = 10 yến = 100 kg."],
      ["1 yến bằng bao nhiêu ki-lô-gam?", "10 kg", "100 kg", "1 kg", "1 yến = 10 kg."],
      ["Đơn vị nào lớn nhất: yến, tạ, tấn?", "Tấn", "Tạ", "Yến", "Thứ tự: tấn > tạ > yến > kg."],
      ["1 mét vuông bằng bao nhiêu đề-xi-mét vuông?", "100 dm²", "10 dm²", "1 000 dm²", "1 m² = 100 dm²."],
      ["1 đề-xi-mét vuông bằng bao nhiêu xăng-ti-mét vuông?", "100 cm²", "10 cm²", "1 000 cm²", "1 dm² = 100 cm²."],
      ["1 xăng-ti-mét vuông bằng bao nhiêu mi-li-mét vuông?", "100 mm²", "10 mm²", "1 000 mm²", "1 cm² = 100 mm²."],
      ["1 giờ bằng bao nhiêu phút?", "60 phút", "100 phút", "30 phút", "1 giờ = 60 phút."],
      ["1 phút bằng bao nhiêu giây?", "60 giây", "100 giây", "30 giây", "1 phút = 60 giây."],
      ["1 thế kỉ bằng bao nhiêu năm?", "100 năm", "10 năm", "1 000 năm", "1 thế kỉ = 100 năm."],
      ["Năm 2024 thuộc thế kỉ nào?", "Thế kỉ XXI (21)", "Thế kỉ XX (20)", "Thế kỉ XIX (19)", "Các năm từ 2001 đến 2100 thuộc thế kỉ XXI."],
      ["Để cân một con voi, đơn vị hợp lí nhất là gì?", "Tấn", "Yến", "Ki-lô-gam", "Vật rất nặng như voi, ô tô tải được cân bằng tấn."],
      ["Diện tích của một căn phòng được đo bằng đơn vị nào?", "Mét vuông (m²)", "Mi-li-mét vuông (mm²)", "Đề-xi-mét (dm)", "Diện tích phòng, nền nhà đo bằng mét vuông."]
    ], [["1 tấn", "1 000 kg"], ["1 m²", "100 dm²"], ["1 giờ", "60 phút"], ["1 thế kỉ", "100 năm"]], "Nối đơn vị với giá trị đúng nhé!");
    kp.choose.push(g4Convert, g4Convert, g4ConvertMixed, g4Convert);
    kp.blank.push(function () { var c = pick(G4_CONV_CASES); var k = rand(2, 20), ans = k * c[2]; return g3NumBlank("Điền số thích hợp vào chỗ trống!", '<div class="expr">' + k + " " + c[0] + " = " + blankSlot() + " " + c[1] + "</div>", ans, 0, ans * 2 + 100); });
    return kp; })() },
  { id: "m4-congtru", emoji: "➕", name: "Phép cộng và phép trừ", sub: "Bài 22–26 • Cộng trừ nhiều chữ số, tính chất, tổng – hiệu", pools: { choose: [g4AddSub(999999), g4AddSub(999999), g4AddSubWord, g4PropAdd, g4SumDiff, g4SumDiffWord, g4AddSub(99999)], blank: [g4PropAdd, g3BlankBig], match: [g3MatchCalcBig], games: [gMemCalcFactory(100), gTFCalcFactory(100), gCatchAnswerFactory(100)] } },
  { id: "m4-duongthang", emoji: "📏", name: "Đường thẳng vuông góc, song song; hình bình hành, hình thoi", sub: "Bài 27–32 • Nhận biết hình và quan hệ đường thẳng", pools: (function () { var kp = knowledgePools([
      ["Hai đường thẳng vuông góc với nhau tạo thành mấy góc vuông?", "4 góc vuông", "2 góc vuông", "1 góc vuông", "Hai đường thẳng vuông góc cắt nhau tạo thành 4 góc vuông."],
      ["Hai đường thẳng song song có đặc điểm gì?", "Không bao giờ cắt nhau", "Cắt nhau tại một điểm", "Luôn tạo thành góc vuông", "Dù kéo dài mãi, hai đường thẳng song song cũng không gặp nhau."],
      ["Hình bình hành có đặc điểm gì?", "Hai cặp cạnh đối diện song song và bằng nhau", "Có 4 góc vuông", "Có 4 cạnh bằng nhau nhưng không song song", "Đó là dấu hiệu nhận biết hình bình hành."],
      ["Hình thoi có đặc điểm gì?", "Bốn cạnh bằng nhau, hai cặp cạnh đối diện song song", "Có 4 góc vuông và 2 cạnh dài khác nhau", "Chỉ có một cặp cạnh song song", "Hình thoi là hình bình hành đặc biệt có 4 cạnh bằng nhau."],
      ["Hình nào vừa là hình bình hành, vừa có 4 cạnh bằng nhau?", "Hình thoi", "Hình chữ nhật", "Hình tam giác", "Hình thoi có đủ tính chất của hình bình hành và thêm 4 cạnh bằng nhau."],
      ["Để kiểm tra hai đường thẳng có vuông góc không, em dùng dụng cụ gì?", "Ê-ke", "Com-pa", "Thước dây", "Ê-ke có góc vuông chuẩn để kiểm tra và vẽ góc vuông."],
      ["Cạnh đối diện trong hình bình hành có quan hệ gì?", "Song song và bằng nhau", "Vuông góc với nhau", "Không có quan hệ gì", "Hai cặp cạnh đối diện của hình bình hành song song và bằng nhau."],
      ["Hình chữ nhật có phải là hình bình hành không?", "Có, vì có hai cặp cạnh đối diện song song và bằng nhau", "Không, vì có góc vuông", "Không phải hình tứ giác", "Hình chữ nhật là hình bình hành đặc biệt có 4 góc vuông."],
      ["Đường ray xe lửa là hình ảnh của hai đường thẳng thế nào?", "Song song", "Vuông góc", "Cắt nhau", "Hai đường ray luôn cách đều nhau, không bao giờ cắt nhau."],
      ["Kim đồng hồ lúc 3 giờ đúng chỉ hai đường thẳng có quan hệ gì?", "Vuông góc với nhau", "Song song với nhau", "Trùng nhau", "Lúc 3 giờ, kim giờ và kim phút tạo thành góc vuông."],
      ["Muốn vẽ hai đường thẳng song song, em thường dùng gì?", "Thước kẻ và ê-ke", "Chỉ dùng tay không", "Com-pa", "Trượt ê-ke dọc theo thước kẻ để vẽ các đường thẳng song song."]
    ], [["Đường thẳng vuông góc", "Tạo 4 góc vuông"], ["Đường thẳng song song", "Không bao giờ cắt nhau"], ["Hình thoi", "4 cạnh bằng nhau"], ["Hình bình hành", "Cạnh đối song song, bằng nhau"]], "Nối khái niệm với ý đúng nhé!");
    kp.choose.push(g4LinesKind, g4LinesKind, g4QuadKind, g4QuadKind, g4QuadPeri);
    kp.blank.push(g4QuadKind);
    return kp; })() },
  { id: "m4-nhanchia", emoji: "✖️", name: "Phép nhân và phép chia", sub: "Bài 38–48 • Nhân chia số có hai chữ số, trung bình cộng, rút về đơn vị", pools: { choose: [g4Mul1, g4Div1, g4Mul2, g4Div2, g4MulDivPow, g4Distrib, g4Average, g4UnitRate, g4Estimate], blank: [g3BlankMulDiv, g4MulDivPow], match: [g3ExprMatch], games: [gMemCalcFactory(100), gTFCalcFactory(100), gCatchAnswerFactory(100)] } },
  { id: "m4-thongke", emoji: "📊", name: "Thống kê và xác suất", sub: "Bài 49–52 • Dãy số liệu, biểu đồ cột, số lần xuất hiện của sự kiện", pools: (function () { var kp = knowledgePools([
      ["Dãy số liệu thống kê là gì?", "Dãy các số thu thập được theo một chủ đề nào đó", "Một dãy số đếm 1, 2, 3...", "Kết quả của một phép tính", "Số liệu thống kê được thu thập từ quan sát, ghi chép thực tế."],
      ["Biểu đồ cột dùng để làm gì?", "Biểu diễn số liệu bằng các cột để dễ so sánh", "Trang trí bài học", "Viết chữ cho đẹp", "Cột cao hơn ứng với số liệu lớn hơn."],
      ["Trên biểu đồ cột, cột nào cao nhất?", "Cột ứng với số liệu lớn nhất", "Cột ở bên trái nhất", "Cột ứng với số liệu nhỏ nhất", "Chiều cao của cột tỉ lệ với giá trị số liệu."],
      ["Muốn biết một sự kiện xuất hiện bao nhiêu lần, em làm thế nào?", "Đếm số lần sự kiện đó xảy ra trong dãy kết quả", "Đoán một số bất kì", "Hỏi bạn bên cạnh", "Số lần xuất hiện được đếm từ kết quả ghi lại."],
      ["Khi gieo xúc xắc nhiều lần, mỗi lần gieo được gọi là gì?", "Một lần thử (một phép thử)", "Một biểu đồ", "Một dãy số", "Ghi lại kết quả mỗi lần gieo giúp ta đếm số lần xuất hiện của từng mặt."],
      ["Bảng số liệu và biểu đồ cột giúp em điều gì?", "Đọc, so sánh số liệu nhanh và rõ ràng", "Không cần học toán nữa", "Tô màu cho đẹp", "Trình bày số liệu bằng bảng, biểu đồ giúp dễ nhận xét."],
      ["Trong dãy số liệu 5; 8; 5; 9; 5, số 5 xuất hiện mấy lần?", "3 lần", "2 lần", "1 lần", "Đếm: số 5 xuất hiện ở vị trí thứ 1, 3 và 5 — tất cả 3 lần."],
      ["Sự kiện “mặt trời mọc vào buổi sáng” thuộc loại sự kiện nào?", "Chắc chắn xảy ra", "Không thể xảy ra", "Có thể xảy ra hoặc không", "Mặt trời luôn mọc vào buổi sáng nên sự kiện chắc chắn xảy ra."]
    ], [["Biểu đồ cột", "Cột cao = số liệu lớn"], ["Dãy số liệu", "Các số thu thập được"], ["Số lần xuất hiện", "Đếm trong dãy kết quả"], ["Phép thử", "Gieo xúc xắc, tung đồng xu"]], "Nối khái niệm với ý đúng nhé!");
    kp.choose.push(g4BarRead, g4BarRead, g4DataSeries, g4EventCount, g4BarRead);
    kp.blank.push(g4EventCount);
    return kp; })() },
  { id: "m4-phanso", emoji: "🍕", name: "Phân số", sub: "Bài 53–59 • Khái niệm, tính chất cơ bản, rút gọn, quy đồng, so sánh", pools: { choose: [g4FracConcept, g4FracDiv, g4FracEquiv, g4FracReduce, g4FracCommonDen, g4FracCompare, g4FracConcept, g4FracCompare], blank: [function () { var d = pick([4, 5, 6, 8]), n = rand(1, d - 1); var qb = fracBlank("Điền phân số chỉ phần đã tô màu của hình (tô " + n + " trong " + d + " phần bằng nhau)!", n, d, "Phân số chỉ phần tô màu: tử số là số phần tô màu (" + n + "), mẫu số là tổng số phần (" + d + ")."); qb.figure = Math.random() < 0.5 ? figFracPieSVG(n, d) : figFracBarSVG(n, d); return qb; }, function () { var d = pick([3, 4, 5]), k = rand(2, 5), n = rand(1, d - 1); return fracBlankRaw("Điền phân số bằng phân số " + n + "/" + d + " sau khi nhân cả tử và mẫu với " + k + "!", n * k, d * k, n + "/" + d + " = " + (n * k) + "/" + (d * k) + "."); }], match: [function () { var ds = shuffle([2, 3, 4, 5, 6, 8]).slice(0, 4); return pairsMatch("Nối phân số với cách đọc đúng nhé!", ds.map(function (d) { return ["1/" + d, "Một phần " + ({ 2: "hai", 3: "ba", 4: "tư", 5: "năm", 6: "sáu", 8: "tám" })[d]]; })); }], games: [factsTF([["Phân số có tử số nhỏ hơn mẫu số thì bé hơn 1", "Đúng", "Sai", null], ["Rút gọn phân số là chia cả tử và mẫu cho cùng một số khác 0", "Đúng", "Sai", null], ["Hai phân số cùng mẫu số, phân số nào có tử số lớn hơn thì bé hơn", "Sai", "Đúng", null], ["Phân số 4/4 bằng 1", "Đúng", "Sai", null]]), function () { var d = pick([4, 5, 6]); var prs = [], seenV = {}; shuffle([1, 2, 3, 4, 5].filter(function (n) { return n < d; })).forEach(function (n) { if (prs.length < 4) { prs.push([n, d]); seenV[n / d] = 1; } }); [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 6], [5, 6]].forEach(function (p) { if (prs.length < 4 && !seenV[p[0] / p[1]]) { seenV[p[0] / p[1]] = 1; prs.push(p); } }); return memQ("Lật thẻ tìm cặp đúng: phân số và hình tô màu!", prs.map(function (p) { return { a: '<span class="mem-expr">' + p[0] + "/" + p[1] + "</span>", b: '<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap">Thanh tô ' + p[0] + " trong " + p[1] + " phần</span>" + fracBar(p[0], p[1]) }; })); }] } },
  { id: "m4-congtrups", emoji: "➕", name: "Cộng, trừ phân số", sub: "Bài 60–62 • Cùng mẫu số và khác mẫu số", pools: { choose: [g4FracAddSub(true), g4FracAddSub(true), g4FracAddSub(false), g4FracWord, g4FracAddSub(false)], blank: [function () { var d = pick([5, 6, 8, 9]), a = rand(1, d - 1), b = rand(1, d - a); return fracBlank("Điền kết quả của phép tính " + a + "/" + d + " + " + b + "/" + d + "!", a + b, d, "Cộng hai phân số cùng mẫu số: cộng hai tử số, giữ nguyên mẫu số."); }], match: [function () { var d = pick([5, 6, 8]); var prs = [], used = {}; var guard = 0; while (prs.length < 4 && guard++ < 200) { var a = rand(1, d - 1), b = rand(1, d - a); var key = a + "+" + b; var g = gcd4(a + b, d), rk = ((a + b) / g) + "/" + (d / g); if (used[key] || used["r" + rk]) continue; used[key] = 1; used["r" + rk] = 1; prs.push([a + "/" + d + " + " + b + "/" + d, fracStr(a + b, d)]); } return pairsMatch("Nối phép tính với kết quả đúng nhé!", prs); }], games: [factsTF([["Cộng hai phân số cùng mẫu số: cộng hai tử số, giữ nguyên mẫu số", "Đúng", "Sai", null], ["Muốn cộng hai phân số khác mẫu số, trước hết phải quy đồng mẫu số", "Đúng", "Sai", null], ["Khi cộng hai phân số, ta cộng cả tử số và mẫu số với nhau", "Sai", "Đúng", null]]), factsCatch([[ "Tính 1/4 + 2/4 = ?", "3/4", "2/4", "3/8", "Cộng tử số: 1 + 2 = 3, giữ nguyên mẫu số 4."], ["Tính 3/5 − 1/5 = ?", "2/5", "4/5", "2/10", "Trừ tử số: 3 − 1 = 2, giữ nguyên mẫu số 5."]])] } },
  { id: "m4-nhanchia-ps", emoji: "✖️", name: "Nhân, chia phân số", sub: "Bài 63–66 • Nhân, chia phân số; tìm phân số của một số", pools: { choose: [g4FracMul, g4FracMul, g4FracDivPs, g4FracOfNum, g4FracDivPs, g4FracOfNum], blank: [function () { var a = rand(1, 5), b = pick([2, 3, 4, 5]), k = rand(2, 6); return fracBlank("Điền kết quả của phép tính " + opFrac4(a, b) + " × " + k + "!", a * k, b, "Nhân phân số với số tự nhiên: nhân tử số với số tự nhiên, giữ nguyên mẫu số."); }], match: [function () { var prs = [], used = {}; var guard = 0; while (prs.length < 4 && guard++ < 200) { var a = rand(1, 4), b = pick([2, 3, 4, 5]), c = rand(1, 4), d = pick([2, 3, 4, 5]); var key = opFrac4(a, b) + " × " + opFrac4(c, d); var gg = gcd4(a * c, b * d), rk = (a * c / gg) + "/" + (b * d / gg); if (used[key] || used["r" + rk]) continue; used[key] = 1; used["r" + rk] = 1; prs.push([key, fracStr(a * c / gg, b * d / gg)]); } return pairsMatch("Nối phép nhân phân số với kết quả đúng nhé!", prs); }], games: [factsTF([["Nhân hai phân số: tử số nhân tử số, mẫu số nhân mẫu số", "Đúng", "Sai", null], ["Chia phân số là nhân với phân số đảo ngược của phân số chia", "Đúng", "Sai", null], ["Phân số đảo ngược của 2/3 là 3/2", "Đúng", "Sai", null], ["Muốn tìm 1/2 của 10, ta lấy 10 × 2", "Sai", "Đúng", null]]), factsCatch([["Tính 1/2 × 1/3 = ?", "1/6", "2/6", "1/5", "Tử nhân tử: 1 × 1 = 1; mẫu nhân mẫu: 2 × 3 = 6."], ["Tính 2/3 : 1/3 = ?", "2", "2/9", "1/2", "2/3 : 1/3 = 2/3 × 3/1 = 2."]])] } }
];
/* ================= TIẾNG VIỆT 4 — theo nhóm kỹ năng ================= */
var TV4_TOPICS = [
  topic("tv4-tuloai", "🔤", "Từ loại: danh từ, động từ, tính từ", "Danh từ chung, danh từ riêng • Động từ • Tính từ", [
    ["Từ nào dưới đây là danh từ?", "học sinh", "học bài", "xinh đẹp", "“Học sinh” là từ chỉ người nên là danh từ."],
    ["Từ nào dưới đây là danh từ riêng?", "Hà Nội", "thành phố", "con sông", "“Hà Nội” là tên riêng của một thành phố nên là danh từ riêng và được viết hoa."],
    ["Từ nào dưới đây là danh từ chung?", "bàn ghế", "Việt Nam", "Hồ Gươm", "“Bàn ghế” là tên gọi chung cho một loại đồ vật nên là danh từ chung."],
    ["Từ nào dưới đây là động từ?", "chạy nhảy", "cái bàn", "thật thà", "“Chạy nhảy” chỉ hoạt động nên là động từ."],
    ["Từ nào dưới đây là tính từ?", "xinh đẹp", "viết bài", "quyển sách", "“Xinh đẹp” chỉ đặc điểm, tính chất nên là tính từ."],
    ["Trong câu “Bé đang đọc sách”, từ nào là động từ?", "đọc", "bé", "sách", "“Đọc” chỉ hoạt động của bé nên là động từ."],
    ["Trong câu “Bông hoa rất thơm”, từ nào là tính từ?", "thơm", "bông hoa", "rất", "“Thơm” chỉ đặc điểm, tính chất của bông hoa nên là tính từ."],
    ["Danh từ riêng dùng để chỉ điều gì?", "Tên riêng của một sự vật cụ thể", "Tên chung của một loại sự vật", "Hoạt động của sự vật", "Danh từ riêng chỉ tên riêng của một người, một địa danh... cụ thể và luôn viết hoa."],
    ["Từ “thầy giáo” thuộc từ loại nào?", "Danh từ", "Động từ", "Tính từ", "“Thầy giáo” chỉ người nên là danh từ."],
    ["Nhóm từ nào gồm toàn danh từ?", "mẹ, trường học, con sông", "hát, múa, vui vẻ", "đẹp, cao, chạy", "Mẹ (chỉ người), trường học (chỉ nơi chốn), con sông (chỉ sự vật) đều là danh từ."],
    ["Từ nào chỉ hoạt động?", "bơi lội", "sông nước", "mênh mông", "“Bơi lội” chỉ hoạt động nên là động từ."],
    ["Từ nào chỉ đặc điểm, tính chất?", "mềm mại", "đi đứng", "cái ghế", "“Mềm mại” chỉ đặc điểm, tính chất nên là tính từ."],
    ["Vì sao từ “Việt Nam” được viết hoa cả hai tiếng?", "Vì đó là danh từ riêng chỉ tên đất nước", "Vì đó là danh từ chung", "Vì đó là động từ", "Tên riêng của quốc gia được viết hoa chữ cái đầu của mỗi bộ phận tạo thành tên."],
    ["Trong câu “Những chú chim đang hót trên cành”, từ nào là động từ?", "hót", "chú chim", "cành", "“Hót” chỉ hoạt động của chim nên là động từ."]
  ], [["Danh từ", "Chỉ người, vật, sự vật"], ["Động từ", "Chỉ hoạt động"], ["Tính từ", "Chỉ đặc điểm, tính chất"], ["Danh từ riêng", "Viết hoa"]], "Nối từ loại với ý đúng nhé!"),
  topic("tv4-thanhphan", "🧩", "Câu và thành phần câu: chủ ngữ, vị ngữ, trạng ngữ", "Chủ ngữ • Vị ngữ • Trạng ngữ thời gian, nơi chốn, nguyên nhân, mục đích, phương tiện", [
    ["Trong câu “Chim sơn ca hót líu lo”, chủ ngữ là bộ phận nào?", "Chim sơn ca", "hót líu lo", "líu lo", "Chủ ngữ trả lời câu hỏi “Con gì?” — đó là chim sơn ca."],
    ["Trong câu “Mẹ em đang nấu cơm”, vị ngữ là bộ phận nào?", "đang nấu cơm", "Mẹ em", "cơm", "Vị ngữ nêu hoạt động của chủ ngữ (mẹ — đang nấu cơm)."],
    ["Trạng ngữ trong câu “Sáng nay, em dậy sớm” là bộ phận nào?", "Sáng nay", "em", "dậy sớm", "“Sáng nay” là trạng ngữ chỉ thời gian."],
    ["Trong câu “Trên sân trường, các bạn đang chơi đùa”, trạng ngữ “trên sân trường” chỉ điều gì?", "Nơi chốn", "Thời gian", "Nguyên nhân", "“Trên sân trường” cho biết nơi diễn ra sự việc nên là trạng ngữ chỉ nơi chốn."],
    ["Trạng ngữ chỉ nguyên nhân thường trả lời cho câu hỏi nào?", "Vì sao?", "Ở đâu?", "Khi nào?", "Trạng ngữ chỉ nguyên nhân trả lời các câu hỏi: Vì sao? Nhờ đâu? Tại đâu?"],
    ["Trong câu “Vì trời mưa to, em nghỉ học”, trạng ngữ là bộ phận nào?", "Vì trời mưa to", "em", "nghỉ học", "“Vì trời mưa to” cho biết nguyên nhân nên là trạng ngữ chỉ nguyên nhân."],
    ["Trong câu “Để có sức khoẻ tốt, em tập thể dục mỗi sáng”, trạng ngữ chỉ mục đích là bộ phận nào?", "Để có sức khoẻ tốt", "em tập thể dục", "mỗi sáng", "“Để có sức khoẻ tốt” nêu mục đích; còn “mỗi sáng” là trạng ngữ chỉ thời gian."],
    ["Trạng ngữ chỉ phương tiện thường bắt đầu bằng từ nào?", "Bằng", "Vì", "Để", "Trạng ngữ chỉ phương tiện thường mở đầu bằng từ “bằng”: đi bằng xe đạp, viết bằng bút chì."],
    ["Trong câu “Em đi học bằng xe đạp”, trạng ngữ là bộ phận nào?", "bằng xe đạp", "Em", "đi học", "“Bằng xe đạp” cho biết phương tiện nên là trạng ngữ chỉ phương tiện."],
    ["Chủ ngữ thường trả lời cho nhóm câu hỏi nào?", "Ai? Cái gì? Con gì?", "Làm gì? Như thế nào?", "Ở đâu? Khi nào?", "Chủ ngữ trả lời Ai/Cái gì/Con gì; vị ngữ trả lời Làm gì/Như thế nào."],
    ["Trong câu “Những chú chim nhỏ đang hót vang trên cành”, vị ngữ là bộ phận nào?", "đang hót vang trên cành", "Những chú chim nhỏ", "trên cành", "Vị ngữ nêu hoạt động của những chú chim nhỏ."],
    ["Bộ phận nào KHÔNG phải là thành phần chính của câu?", "Trạng ngữ", "Chủ ngữ", "Vị ngữ", "Câu có hai thành phần chính là chủ ngữ và vị ngữ; trạng ngữ là thành phần phụ."],
    ["Trạng ngữ trong câu “Vào cuối tuần, gia đình em về quê” là bộ phận nào và nó chỉ điều gì?", "“Vào cuối tuần” — chỉ thời gian", "“gia đình em” — chỉ nơi chốn", "“về quê” — chỉ nguyên nhân", "“Vào cuối tuần” cho biết thời điểm nên là trạng ngữ chỉ thời gian."]
  ], [["Chủ ngữ", "Ai? Cái gì? Con gì?"], ["Vị ngữ", "Làm gì? Như thế nào?"], ["Trạng ngữ chỉ thời gian", "Khi nào?"], ["Trạng ngữ chỉ nguyên nhân", "Vì sao?"]], "Nối thành phần câu với câu hỏi đúng nhé!"),
  topic("tv4-nhanhoa", "🌿", "Biện pháp nhân hoá", "Gọi và tả sự vật như con người", [
    ["Câu nào có sử dụng biện pháp nhân hoá?", "Chị gió ghé thăm khu vườn", "Gió thổi mạnh qua khu vườn", "Khu vườn có rất nhiều hoa", "“Chị gió” — gió được gọi như người và có hành động “ghé thăm” như người."],
    ["Nhân hoá là biện pháp gì?", "Gọi, tả sự vật như con người", "So sánh sự vật này với sự vật khác", "Nói giảm, nói tránh", "Nhân hoá gán cho sự vật những tên gọi, hành động, tính tình của con người."],
    ["Trong câu “Ông mặt trời thức dậy từ sớm”, sự nhân hoá thể hiện ở đâu?", "Gọi mặt trời là “ông” và tả “thức dậy” như người", "Ở từ “sớm”", "Ở từ “mặt trời”", "Dùng từ gọi người (“ông”) và hành động của người (“thức dậy”) cho mặt trời."],
    ["Câu nào KHÔNG có biện pháp nhân hoá?", "Cây cối quanh năm xanh tốt", "Cây đa già đang vẫy tay chào khách", "Dòng sông hát ca suốt ngày đêm", "Câu thứ nhất chỉ tả cây như bình thường, không gán hành động, tính tình của người."],
    ["Trong câu “Chú mèo lười nằm sưởi nắng”, từ nào cho thấy biện pháp nhân hoá?", "“Chú” — gọi mèo bằng từ gọi người", "“nằm”", "“nắng”", "Dùng từ chỉ người thân (“chú”) để gọi con vật là một cách nhân hoá."],
    ["Trong câu “Dòng sông hiền hoà chảy quanh làng”, sự vật được nhân hoá là gì?", "Dòng sông", "Ngôi làng", "Quanh làng", "Dòng sông được tả bằng tính từ vốn chỉ tính tình con người: “hiền hoà”."],
    ["Biện pháp nhân hoá có tác dụng gì?", "Làm cho sự vật trở nên gần gũi, sinh động như con người", "Làm cho câu văn dài hơn", "Làm cho sự vật khó hiểu hơn", "Nhân hoá giúp đoạn văn sinh động, giàu hình ảnh và cảm xúc."],
    ["Câu nào có sử dụng biện pháp nhân hoá?", "Đàn kiến đang hành quân qua sân", "Đàn kiến có rất nhiều con", "Kiến là loài côn trùng nhỏ", "“Hành quân” là hành động của con người (đội quân) được gán cho đàn kiến."],
    ["Câu nào dùng biện pháp so sánh chứ KHÔNG phải nhân hoá?", "Mặt trăng tròn như chiếc đĩa bạc", "Chị trăng đang mỉm cười", "Anh trăng rủ em đi chơi", "“Tròn như chiếc đĩa bạc” là so sánh (có từ “như”); hai câu còn lại nhân hoá mặt trăng."],
    ["Trong câu “Những đám mây trắng đang dạo chơi trên bầu trời”, đám mây được tả bằng hành động nào của người?", "dạo chơi", "trắng", "bầu trời", "“Dạo chơi” là hoạt động của con người được gán cho đám mây."],
    ["Câu “Bác tre già đứng canh giữ đầu làng” — cây tre được gọi là gì?", "Bác", "Cây", "Già làng", "Cây tre được gọi là “Bác” — từ gọi người thân trong gia đình."],
    ["Muốn nhân hoá con sông, em có thể viết thế nào?", "“Con sông quê em hát ca suốt ngày”", "“Con sông quê em rất dài”", "“Con sông quê em có nhiều cá”", "Gán hành động của người (“hát ca”) cho con sông là nhân hoá."],
    ["Trong câu “Mưa đang gõ nhịp trên mái nhà”, hạt mưa được nhân hoá bằng hành động nào?", "gõ nhịp", "mái nhà", "đang rơi", "“Gõ nhịp” là hành động của người chơi nhạc được gán cho mưa."]
  ], [["Ông mặt trời", "thức dậy (nhân hoá)"], ["Chị gió", "ghé thăm (nhân hoá)"], ["Bác tre già", "đứng canh làng (nhân hoá)"], ["Mặt trăng như đĩa bạc", "so sánh"]], "Nối câu với biện pháp đúng nhé!"),
  topic("tv4-daucau", "✒️", "Dấu câu và viết hoa, dùng từ điển", "Dấu gạch ngang • Dấu ngoặc kép • Dấu ngoặc đơn • Viết tên cơ quan, tổ chức • Từ điển", [
    ["Dấu gạch ngang ở đầu dòng trong đoạn đối thoại dùng để làm gì?", "Đánh dấu lời nói trực tiếp của nhân vật", "Kết thúc câu", "Ngăn cách các từ trong câu", "Trong đối thoại, mỗi lời thoại bắt đầu bằng dấu gạch ngang đầu dòng."],
    ["Lời nói trực tiếp của nhân vật thường được đặt trong dấu nào?", "Dấu ngoặc kép", "Dấu ngoặc đơn", "Dấu chấm phẩy", "Ví dụ: Cô giáo nói: “Các em làm bài cẩn thận nhé!”."],
    ["Dấu ngoặc đơn dùng để làm gì?", "Đánh dấu phần chú thích, giải thích thêm", "Đánh dấu lời nói của nhân vật", "Kết thúc câu hỏi", "Ví dụ: Huế (cố đô của nước ta) nằm ở miền Trung."],
    ["Câu nào viết đúng tên cơ quan, tổ chức?", "Trường Tiểu học Kim Liên", "trường tiểu học Kim Liên", "Trường tiểu Học Kim Liên", "Tên cơ quan, tổ chức: viết hoa chữ cái đầu của các bộ phận tạo thành tên."],
    ["Tên “Bộ Giáo dục và Đào tạo” phải viết như thế nào cho đúng?", "Viết hoa chữ cái đầu của các bộ phận tạo thành tên", "Viết thường tất cả", "Viết hoa mọi chữ cái", "Quy tắc: viết hoa chữ cái đầu tiên của các bộ phận tạo thành tên cơ quan, tổ chức."],
    ["Từ điển dùng để làm gì?", "Tra cứu nghĩa của từ và cách dùng từ", "Đọc truyện giải trí", "Ghi chép bài học", "Từ điển giải thích nghĩa của các từ ngữ."],
    ["Các từ trong từ điển thường được sắp xếp theo thứ tự nào?", "Thứ tự bảng chữ cái (a, b, c...)", "Thứ tự từ dài đến ngắn", "Thứ tự ngẫu nhiên", "Biết thứ tự bảng chữ cái giúp em tra từ điển nhanh."],
    ["Trong câu: Hà Nội — thủ đô của Việt Nam — là thành phố nghìn năm văn hiến. Cặp dấu gạch ngang có tác dụng gì?", "Đánh dấu phần chú thích, giải thích thêm", "Đánh dấu lời thoại", "Ngăn cách hai câu", "Dấu gạch ngang cũng dùng để đánh dấu phần chú thích ở giữa câu."],
    ["Câu nào dùng dấu ngoặc kép đúng?", "Thầy giáo gọi em là “chú ong chăm chỉ” của lớp", "Thầy giáo gọi em là (chú ong chăm chỉ) của lớp", "Thầy giáo gọi em là - chú ong chăm chỉ - của lớp", "Dấu ngoặc kép còn đánh dấu từ ngữ được dùng với ý đặc biệt (biệt danh “chú ong chăm chỉ”)."],
    ["Khi viết một dãy liệt kê nhiều sự vật, em thường dùng dấu nào để ngăn cách?", "Dấu phẩy (,) hoặc dấu gạch ngang", "Dấu chấm than (!)", "Dấu hai chấm ở cuối câu", "Các vật được liệt kê ngăn cách bằng dấu phẩy."],
    ["Để tra từ “dũng cảm” trong từ điển, em tìm ở phần chữ cái nào trước?", "Chữ D", "Chữ C", "Chữ G", "Tra từ theo chữ cái đầu tiên của từ: “dũng cảm” bắt đầu bằng chữ D."],
    ["Dấu hai chấm (:) thường báo hiệu điều gì trong bài văn đối thoại?", "Báo hiệu lời nói trực tiếp sắp được dẫn ra", "Báo hiệu câu đã kết thúc", "Báo hiệu phần chú thích", "Sau dấu hai chấm thường là lời nói trực tiếp trong dấu ngoặc kép."],
    ["Câu nào viết đúng quy tắc viết hoa?", "Uỷ ban nhân dân phường Bến Nghé", "uỷ ban Nhân dân phường bến nghé", "Uỷ Ban Nhân Dân Phường Bến Nghé", "Viết hoa chữ cái đầu của các bộ phận tạo thành tên cơ quan, tổ chức — không viết hoa mọi chữ."]
  ], [["Dấu gạch ngang đầu dòng", "Lời thoại của nhân vật"], ["Dấu ngoặc kép", "Lời nói trực tiếp"], ["Dấu ngoặc đơn", "Phần chú thích"], ["Từ điển", "Tra nghĩa của từ"]], "Nối dấu câu với công dụng nhé!"),
  topic("tv4-tungu8", "🎨", "Từ ngữ theo 8 chủ đề trong sách", "Mỗi người một vẻ • Trải nghiệm và khám phá • Niềm vui sáng tạo • Chắp cánh ước mơ • Sống để yêu thương • Uống nước nhớ nguồn • Quê hương trong tôi • Vì một thế giới bình yên", [
    ["Nhóm từ nào thuộc chủ đề “Mỗi người một vẻ” (nói về con người)?", "ngoại hình, tính cách, nhanh nhẹn, hiền lành", "sông núi, cánh đồng, biển cả", "máy móc, rô-bốt, nhà máy", "Chủ đề “Mỗi người một vẻ” xoay quanh vẻ ngoài và tính cách của mỗi người."],
    ["Nhóm từ nào thuộc chủ đề “Trải nghiệm và khám phá”?", "thám hiểm, khám phá, kì thú, trải nghiệm", "bàn ghế, sách vở, cặp sách", "nắng mưa, gió bão, sương mù", "Trải nghiệm và khám phá là những chuyến đi, những điều mới lạ được tìm thấy."],
    ["Từ ngữ nào thuộc chủ đề “Niềm vui sáng tạo”?", "sáng tạo, phát minh, ý tưởng", "buồn bã, mệt mỏi, chán nản", "mua bán, chợ búa, hàng hoá", "Chủ đề này nói về niềm vui khi tự tay nghĩ ra và làm ra điều mới."],
    ["Nhóm từ nào thuộc chủ đề “Chắp cánh ước mơ”?", "ước mơ, hoài bão, tương lai, khát vọng", "quá khứ, kỉ niệm xưa, ngày trước", "cơm áo, gạo tiền, chợ sớm", "Chắp cánh ước mơ là nuôi dưỡng những mong ước đẹp cho tương lai."],
    ["Nhóm từ nào thuộc chủ đề “Sống để yêu thương”?", "yêu thương, chia sẻ, quan tâm, giúp đỡ", "giận dữ, ghét bỏ, vô tâm", "cạnh tranh, hơn thua, ganh đua", "Sống để yêu thương là biết quan tâm, sẻ chia với mọi người."],
    ["Câu tục ngữ “Uống nước nhớ nguồn” thuộc chủ đề nào?", "Uống nước nhớ nguồn", "Chắp cánh ước mơ", "Niềm vui sáng tạo", "Câu tục ngữ chính là tên của chủ đề, khuyên ta biết ơn những người đi trước."],
    ["Câu tục ngữ nào cũng thuộc chủ đề “Uống nước nhớ nguồn”?", "Ăn quả nhớ kẻ trồng cây", "Có công mài sắt, có ngày nên kim", "Đi một ngày đàng, học một sàng khôn", "“Ăn quả nhớ kẻ trồng cây” khuyên nhớ công ơn người đã vun trồng, chăm sóc."],
    ["Nhóm từ nào gợi nhớ chủ đề “Quê hương trong tôi”?", "cánh đồng, dòng sông, lũy tre, mái đình", "nhà cao tầng, siêu thị, tàu điện", "sa mạc, băng tuyết, cực Bắc", "Quê hương trong tôi gắn với cánh đồng, dòng sông, lũy tre làng thân thuộc."],
    ["Nhóm từ nào thuộc chủ đề “Vì một thế giới bình yên”?", "hoà bình, hữu nghị, đoàn kết, yêu thương nhân loại", "chiến tranh, xung đột, thù hận", "mưa bão, lũ lụt, hạn hán", "Vì một thế giới bình yên: mọi người sống hoà thuận, không có chiến tranh."],
    ["Từ “hoài bão” gần nghĩa nhất với nhóm từ nào thuộc chủ đề ước mơ?", "khát vọng lớn lao cho tương lai", "kỉ niệm thời thơ ấu", "công việc hằng ngày", "Hoài bão là ước mơ, khát vọng lớn mà ta hướng tới."],
    ["Câu tục ngữ “Có công mài sắt, có ngày nên kim” khuyên em điều gì gắn với chủ đề “Chắp cánh ước mơ”?", "Kiên trì theo đuổi ước mơ sẽ thành công", "Không cần cố gắng cũng đạt ước mơ", "Chỉ mơ ước mà không làm", "Muốn ước mơ thành hiện thực phải kiên trì, nỗ lực mỗi ngày."],
    ["Nhóm từ nào tả tính cách con người (chủ đề “Mỗi người một vẻ”)?", "thật thà, dũng cảm, vui tính", "cao, thấp, gần, xa", "đỏ, xanh, tròn, vuông", "Thật thà, dũng cảm, vui tính là những nét tính cách."],
    ["Từ ngữ nào thuộc chủ đề “Vì một thế giới bình yên” khi nói về trẻ em khắp nơi?", "trẻ em năm châu cùng vui chơi, học tập", "trẻ em chỉ ở một làng quê", "trẻ em trong một lớp học", "Thế giới bình yên là nơi trẻ em khắp năm châu được sống vui tươi, an toàn."]
  ], [["Mỗi người một vẻ", "Ngoại hình, tính cách"], ["Uống nước nhớ nguồn", "Biết ơn người đi trước"], ["Quê hương trong tôi", "Cánh đồng, dòng sông"], ["Vì một thế giới bình yên", "Hoà bình, hữu nghị"]], "Nối chủ đề với ý đúng nhé!"),
  topic("tv4-dochieu", "📖", "Đọc hiểu: những bài nổi tiếng", "Sự tích con Rồng cháu Tiên • Bét-tô-ven và bản xô-nát Ánh trăng • Hải Thượng Lãn Ông", [
    ["Trong truyện “Sự tích con Rồng cháu Tiên”, Lạc Long Quân thuộc giống gì?", "Giống Rồng", "Giống Tiên", "Giống người thường", "Lạc Long Quân là con của loài Rồng sống dưới biển; Âu Cơ thuộc giống Tiên ở trên núi."],
    ["Âu Cơ thuộc giống gì?", "Giống Tiên", "Giống Rồng", "Giống chim thần", "Âu Cơ thuộc giống Tiên, sống ở vùng núi cao."],
    ["Âu Cơ sinh ra bọc trứng nở thành bao nhiêu người con?", "100 người con", "50 người con", "99 người con", "Bọc trăm trứng nở thành một trăm người con trai khoẻ mạnh."],
    ["Sau khi chia tay, 50 người con theo Lạc Long Quân đi đâu?", "Xuống biển", "Lên rừng núi", "Lên trời", "50 người con theo cha xuống biển, 50 người con theo mẹ Âu Cơ lên rừng."],
    ["50 người con theo Âu Cơ đi đâu?", "Lên rừng (lên núi)", "Xuống biển", "Ra đảo xa", "Hai đoàn con đi mở mang, cai quản các vùng đất khác nhau."],
    ["Người con trưởng của Lạc Long Quân và Âu Cơ được tôn lên làm vua, hiệu là gì?", "Hùng Vương", "An Dương Vương", "Lý Thái Tổ", "Người con trưởng lên làm vua, hiệu là Hùng Vương, lập nước Văn Lang."],
    ["Truyện “Sự tích con Rồng cháu Tiên” thuộc thể loại truyện nào?", "Truyền thuyết", "Cổ tích", "Ngụ ngôn", "Đây là truyền thuyết giải thích nguồn gốc của dân tộc Việt Nam."],
    ["Người Việt thường tự hào gọi nhau bằng cụm từ nào gắn với truyện này?", "Con Rồng cháu Tiên", "Con cháu nhà Trần", "Đồng bào miền núi", "“Con Rồng cháu Tiên” nhắc mọi người Việt cùng một nguồn gốc."],
    ["Bét-tô-ven là nhà soạn nhạc nổi tiếng của nước nào?", "Đức", "Pháp", "Ý", "Bét-tô-ven (Ludwig van Beethoven) là nhà soạn nhạc thiên tài người Đức."],
    ["Bản nhạc nổi tiếng trong bài “Bét-tô-ven và bản xô-nát Ánh trăng” có tên là gì?", "Bản xô-nát Ánh trăng", "Bản xô-nát Ánh sáng", "Bản xô-nát Mùa xuân", "Bản Sonata Ánh trăng (Moonlight Sonata) là một trong những tác phẩm nổi tiếng nhất của ông."],
    ["Điều gì khiến mọi người khâm phục nghị lực của Bét-tô-ven?", "Dù bị điếc, ông vẫn sáng tác được nhiều bản nhạc bất hủ", "Dù nghèo khó, ông vẫn đi học", "Dù còn nhỏ tuổi, ông đã nổi tiếng", "Mất khả năng nghe, ông vẫn cảm nhận âm nhạc bằng trái tim và sáng tác không ngừng."],
    ["Hải Thượng Lãn Ông tên thật là gì?", "Lê Hữu Trác", "Nguyễn Du", "Chu Văn An", "Hải Thượng Lãn Ông là hiệu của danh y Lê Hữu Trác."],
    ["Hải Thượng Lãn Ông nổi tiếng là người thế nào?", "Danh y (thầy thuốc) tài giỏi, hết lòng vì người bệnh", "Danh tướng đánh giặc", "Danh hoạ vẽ tranh", "Ông là thầy thuốc lớn của nước ta, để lại bộ sách y học quý “Hải Thượng y tông tâm lĩnh”."],
    ["Bộ sách y học nổi tiếng do Hải Thượng Lãn Ông biên soạn có tên là gì?", "Hải Thượng y tông tâm lĩnh", "Truyện Kiều", "Đại Việt sử kí", "Bộ sách gồm hàng chục quyển, là tài sản quý của nền y học cổ truyền Việt Nam."]
  ], [["Lạc Long Quân", "Giống Rồng, xuống biển"], ["Âu Cơ", "Giống Tiên, lên rừng"], ["Hùng Vương", "Con trưởng, lập nước Văn Lang"], ["Lê Hữu Trác", "Hải Thượng Lãn Ông"]], "Nối nhân vật với nội dung đúng nhé!")
];
/* ================= TIẾNG ANH 4 — Global Success ================= */
function eng4WasWereMCQ() {
  var cases = [["I", "was"], ["He", "was"], ["She", "was"], ["It", "was"], ["You", "were"], ["We", "were"], ["They", "were"]];
  var c = pick(cases), ctx = pick(["at the beach", "at home", "in London", "at the campsite", "in the countryside", "in Tokyo"]);
  var all = shuffle(["was", "were"]);
  return { prompt: "Choose the correct word to complete the sentence!", visual: '<div class="sentence">' + c[0] + " ______ " + ctx + " last weekend.</div>",
    options: all.map(function (o) { return { html: '<span class="opt-word">' + o + "</span>" }; }), answer: all.indexOf(c[1]), cols: 2,
    explain: c[0] + " goes with “" + c[1] + "”. (I/He/She/It + was; You/We/They + were.)" };
}
function eng4WasWereBlank() {
  var cases = [["I", "was"], ["He", "was"], ["She", "was"], ["It", "was"], ["You", "were"], ["We", "were"], ["They", "were"]];
  var c = pick(cases), ctx = pick(["at the beach", "at home", "in Sydney", "at the campsite", "in Bangkok"]);
  var all = shuffle(["was", "were"]);
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Fill in the blank with “was” or “were”!", blankText: c[1],
    visual: '<div class="sentence">' + c[0] + " " + blankSlot() + " " + ctx + " last summer.</div>",
    options: all.map(function (o) { return { html: '<span class="opt-word">' + o + "</span>" }; }), answer: all.indexOf(c[1]), cols: 2,
    explain: c[0] + " goes with “" + c[1] + "”." };
}
var G4_ACTS = [
  ["taking a photo", "take a photo", "takes a photo", "📸"],
  ["building a campfire", "build a campfire", "builds a campfire", "🔥"],
  ["putting up a tent", "put up a tent", "puts up a tent", "⛺"],
  ["telling a story", "tell a story", "tells a story", "📖"],
  ["singing songs", "sing songs", "sings songs", "🎤"],
  ["playing card games", "play card games", "plays card games", "🃏"],
  ["dancing around the campfire", "dance around the campfire", "dances around the campfire", "💃"],
  ["playing tug of war", "play tug of war", "plays tug of war", "🪢"]
];
function eng4ContMCQ() {
  var a = pick(G4_ACTS), they = Math.random() < 0.4;
  var subj = they ? "They're" : pick(["He's", "She's"]);
  var all = shuffle([a[0], a[1], a[2]]);
  return { prompt: they ? "What are they doing?" : "What is " + (subj === "He's" ? "he" : "she") + " doing?", visual: '<div class="big-pic">' + a[3] + '</div><div class="sentence">' + subj + " ______.</div>",
    options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: all.indexOf(a[0]), cols: 3, optStack: true,
    explain: "Present continuous: be (is/are) + verb-ing. The correct sentence is: " + subj + " " + a[0] + "." };
}
function eng4ContBlank() {
  var a = pick(G4_ACTS), he = Math.random() < 0.5;
  var all = shuffle([a[0], a[1], a[2]]);
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Fill in the -ing form!", blankText: a[0],
    visual: '<div class="big-pic">' + a[3] + '</div><div class="sentence">' + (he ? "He's" : "She's") + " " + blankSlot() + ".</div>",
    options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }), answer: all.indexOf(a[0]), cols: 3, optStack: true,
    explain: "After “is” we use verb-ing: " + a[0] + "." };
}
function eng4Price() {
  var item = pick([["skirt", "👗"], ["T-shirt", "👕"], ["hat", "👒"], ["bag", "🎒"]]);
  var price = pick([40000, 50000, 60000, 80000, 90000, 100000, 120000, 150000]);
  var wrongs = [fmtN(price + 10000), fmtN(price - 10000), fmtN(price * 2)];
  return mcqQ("How much is the " + item[0] + "? — It's … dong.", wrongs, fmtN(price), "It's " + fmtN(price) + " dong. (Giá tiền được tính bằng đồng — tiền Việt Nam.)", '<div class="big-pic">' + item[1] + "</div>");
}
var UNITS4 = [
  { n: 0, title: "Starter", words: [["hello", "👋", "xin chào"], ["goodbye", "🙋", "tạm biệt"], ["teacher", "👩‍🏫", "thầy, cô giáo"], ["book", "📕", "quyển sách"], ["stand up", "🧍", "đứng lên"], ["sit down", "🪑", "ngồi xuống"], ["play football", "⚽", "chơi bóng đá"], ["fly a kite", "🪁", "thả diều"], ["ride a bike", "🚲", "đi xe đạp"], ["name", "📛", "tên"]],
    patterns: [{ q: "Hello! I'm … . Nice to meet you!", a: "Linh", w: ["Linh", "teacher", "book"] }, { q: "What's your name? — My name's …", a: "Tom", w: ["Tom", "hello", "football"] }, { q: "…, please! (the teacher asks the class to stand)", a: "Stand up", w: ["Stand up", "Goodbye", "Thank you"] }] },
  { n: 1, title: "My friends", words: [["America", "🇺🇸", "nước Mỹ"], ["Australia", "🇦🇺", "nước Úc (Australia)"], ["Britain", "🇬🇧", "nước Anh"], ["Japan", "🇯🇵", "Nhật Bản"], ["Malaysia", "🇲🇾", "Malaysia"], ["Singapore", "🇸🇬", "Singapore"], ["Thailand", "🇹🇭", "Thái Lan"], ["Viet Nam", "🇻🇳", "Việt Nam"]],
    patterns: [{ q: "Where are you from? — I'm from …", a: "Viet Nam", w: ["Viet Nam", "Japan", "Britain"] }, { q: "Where's she from? — She's from …", a: "Japan", w: ["Japan", "Malaysia", "America"] }, { q: "Where's he from? — He's from …", a: "Australia", w: ["Australia", "Thailand", "Singapore"] }] },
  { n: 2, title: "Time and daily routines", words: [["get up", "⏰", "thức dậy"], ["go to bed", "🌙", "đi ngủ"], ["go to school", "🎒", "đi học"], ["have breakfast", "🍳", "ăn sáng"], ["o'clock", "🕐", "giờ đúng"], ["thirty", "🕧", "ba mươi (phút)"], ["forty-five", "🕒", "bốn mươi lăm (phút)"], ["fifteen", "🕐", "mười lăm (phút)"]],
    patterns: [{ q: "What time is it? — It's … o'clock.", a: "seven", w: ["seven", "six", "school"] }, { q: "What time do you get up? — I get up at …", a: "six o'clock", w: ["six o'clock", "breakfast", "bed"] }, { q: "What time do you go to school? — I go to school at …", a: "seven o'clock", w: ["seven o'clock", "thirty", "fifteen"] }] },
  { n: 3, title: "My week", words: [["Monday", "📅", "thứ Hai"], ["Tuesday", "🗓️", "thứ Ba"], ["Wednesday", "📆", "thứ Tư"], ["Thursday", "📋", "thứ Năm"], ["Friday", "📌", "thứ Sáu"], ["Saturday", "🎉", "thứ Bảy"], ["Sunday", "🌞", "Chủ nhật"], ["do housework", "🧹", "làm việc nhà"], ["listen to music", "🎧", "nghe nhạc"], ["study at school", "🏫", "học ở trường"]],
    patterns: [{ q: "What day is it today? — It's …", a: "Monday", w: ["Monday", "music", "housework"] }, { q: "What do you do on Sundays? — I …", a: "listen to music", w: ["listen to music", "do housework", "study at school"] }, { q: "What do you do on Mondays? — I … at school.", a: "study", w: ["study", "listen", "do"] }] },
  { n: 4, title: "My birthday party", words: [["January", "🎆", "tháng Một"], ["February", "🧧", "tháng Hai"], ["March", "🌸", "tháng Ba"], ["April", "🌦️", "tháng Tư"], ["birthday", "🎂", "sinh nhật"], ["chips", "🍟", "khoai tây chiên"], ["grapes", "🍇", "nho"], ["jam", "🍓", "mứt"], ["juice", "🧃", "nước ép"], ["lemonade", "🍋", "nước chanh"], ["party", "🎉", "bữa tiệc"], ["water", "💧", "nước"]],
    patterns: [{ q: "When's your birthday? — It's in …", a: "March", w: ["March", "chips", "party"] }, { q: "What do you want to eat? — I want some …", a: "chips", w: ["chips", "juice", "lemonade"] }, { q: "What do you want to drink? — I want some …", a: "juice", w: ["juice", "grapes", "jam"] }] },
  { n: 5, title: "Things we can do", words: [["cook", "🍳", "nấu ăn"], ["draw", "✏️", "vẽ"], ["play the guitar", "🎸", "chơi đàn ghi-ta"], ["play the piano", "🎹", "chơi đàn piano"], ["ride a bike", "🚲", "đi xe đạp"], ["ride a horse", "🐴", "cưỡi ngựa"], ["roller skate", "🛼", "trượt patin"], ["swim", "🏊", "bơi"], ["can", "✅", "có thể"], ["but", "↔️", "nhưng"]],
    patterns: [{ q: "Can you swim? — Yes, I …", a: "can", w: ["can", "can't", "do"] }, { q: "Can he ride a bike? — No, he …, but he can swim.", a: "can't", w: ["can't", "can", "isn't"] }, { q: "Can she play the piano? — Yes, … can.", a: "she", w: ["she", "he", "it"] }] },
  { n: 6, title: "Our school facilities", words: [["city", "🏙️", "thành phố"], ["mountains", "⛰️", "vùng núi"], ["town", "🏘️", "thị trấn"], ["village", "🏡", "làng quê"], ["building", "🏢", "toà nhà"], ["computer room", "💻", "phòng máy tính"], ["garden", "🌻", "khu vườn"], ["playground", "🛝", "sân chơi"]],
    patterns: [{ q: "Where's your school? — It's in the …", a: "village", w: ["village", "city", "garden"] }, { q: "How many computer rooms are there at your school? — There … one.", a: "is", w: ["is", "are", "am"] }, { q: "Is there a garden at your school? — Yes, there …", a: "is", w: ["is", "are", "do"] }] },
  { n: 7, title: "Our timetables", words: [["art", "🎨", "mĩ thuật"], ["English", "🔤", "tiếng Anh"], ["history and geography", "🗺️", "lịch sử và địa lí"], ["maths", "🔢", "toán"], ["music", "🎵", "âm nhạc"], ["science", "🔬", "khoa học"], ["Vietnamese", "📖", "tiếng Việt"]],
    patterns: [{ q: "What subjects do you have today? — I have …", a: "maths", w: ["maths", "art", "science"] }, { q: "When do you have English? — I have it on …", a: "Mondays", w: ["Mondays", "today", "maths"] }, { q: "What subjects do you have today? — I have … and music.", a: "art", w: ["art", "Monday", "school"] }] },
  { n: 8, title: "My favourite subjects", words: [["IT", "💻", "tin học"], ["PE", "🏃", "thể dục"], ["English teacher", "👩‍🏫", "giáo viên tiếng Anh"], ["maths teacher", "👨‍🏫", "giáo viên toán"], ["painter", "🎨", "hoạ sĩ"], ["because", "💡", "bởi vì"], ["why", "❓", "tại sao"]],
    patterns: [{ q: "What's your favourite subject? — It's …", a: "IT", w: ["IT", "PE", "because"] }, { q: "Why do you like maths? — Because I want to be a …", a: "maths teacher", w: ["maths teacher", "painter", "English teacher"] }, { q: "… do you like art? — Because I want to be a painter.", a: "Why", w: ["Why", "What", "When"] }] },
  { n: 9, title: "Our sports day", words: [["May", "🌷", "tháng Năm"], ["June", "☀️", "tháng Sáu"], ["July", "🏖️", "tháng Bảy"], ["August", "🌻", "tháng Tám"], ["September", "🍂", "tháng Chín"], ["October", "🎃", "tháng Mười"], ["November", "🍁", "tháng Mười một"], ["December", "🎄", "tháng Mười hai"], ["sports day", "🏅", "ngày hội thể thao"]],
    patterns: [{ q: "Is your sports day in May? — …, it is.", a: "Yes", w: ["Yes", "No", "It"] }, { q: "When's your sports day? — It's in …", a: "October", w: ["October", "sports day", "school"] }, { q: "Is your sports day in June? — No, it … . It's in July.", a: "isn't", w: ["isn't", "is", "aren't"] }] },
  { n: 10, title: "Our summer holidays", words: [["beach", "🏖️", "bãi biển"], ["campsite", "🏕️", "khu cắm trại"], ["countryside", "🌾", "nông thôn"], ["Bangkok", "🇹🇭", "Băng Cốc"], ["London", "🇬🇧", "Luân Đôn"], ["Sydney", "🇦🇺", "Sydney"], ["Tokyo", "🇯🇵", "Tokyo"], ["yesterday", "📅", "hôm qua"], ["last", "⏮️", "vừa qua, trước"]],
    patterns: [{ q: "Where were you last summer? — I was in …", a: "Tokyo", w: ["Tokyo", "beach", "yesterday"] }, { q: "Were you at the beach last weekend? — Yes, I …", a: "was", w: ["was", "were", "am"] }, { q: "Where was he last summer? — He was at the …", a: "campsite", w: ["campsite", "countryside", "London"] }],
    extra: "waswere" },
  { n: 11, title: "My home", words: [["road", "🛣️", "đường lớn"], ["street", "🚶", "phố, đường phố"], ["big", "🐘", "to, lớn"], ["busy", "🚗", "đông đúc, bận rộn"], ["live", "🏠", "sống"], ["noisy", "🔊", "ồn ào"], ["quiet", "🤫", "yên tĩnh"]],
    patterns: [{ q: "What's the city like? — It's … and busy.", a: "big", w: ["big", "quiet", "live"] }, { q: "What's your village like? — It's …", a: "quiet", w: ["quiet", "noisy", "street"] }, { q: "Where do you live? — I live in a …", a: "village", w: ["village", "road", "street"] }] },
  { n: 12, title: "Jobs", words: [["actor", "🎭", "diễn viên"], ["farmer", "👨‍🌾", "nông dân"], ["nurse", "👩‍⚕️", "y tá"], ["office worker", "🧑‍💼", "nhân viên văn phòng"], ["policeman", "👮", "cảnh sát"], ["factory", "🏭", "nhà máy"], ["farm", "🚜", "nông trại"], ["hospital", "🏥", "bệnh viện"], ["nursing home", "🏠", "viện dưỡng lão"]],
    patterns: [{ q: "What does he do? — He's a …", a: "farmer", w: ["farmer", "hospital", "factory"] }, { q: "Where does she work? — She works at a …", a: "hospital", w: ["hospital", "farm", "factory"] }, { q: "Where does a farmer work? — He works on a …", a: "farm", w: ["farm", "hospital", "nursing home"] }] },
  { n: 13, title: "Appearance", words: [["tall", "📏", "cao"], ["short", "📐", "thấp"], ["slim", "🧍", "thon, gầy"], ["eyes", "👀", "mắt"], ["face", "😀", "khuôn mặt"], ["hair", "💇", "tóc"], ["long", "↔️", "dài"], ["round", "⭕", "tròn"]],
    patterns: [{ q: "What does he look like? — He's …", a: "tall", w: ["tall", "short", "hair"] }, { q: "What does she look like? — She has … hair.", a: "long", w: ["long", "round", "big"] }, { q: "What does he look like? — He has a … face.", a: "round", w: ["round", "long", "tall"] }] },
  { n: 14, title: "Daily activities", words: [["in the morning", "🌅", "vào buổi sáng"], ["in the afternoon", "🌤️", "vào buổi chiều"], ["in the evening", "🌆", "vào buổi tối"], ["at noon", "🕛", "vào buổi trưa"], ["clean the floor", "🧹", "lau sàn nhà"], ["help with the cooking", "👩‍🍳", "giúp nấu ăn"], ["wash the clothes", "👕", "giặt quần áo"], ["wash the dishes", "🍽️", "rửa bát"]],
    patterns: [{ q: "When do you watch TV? — I watch TV in the …", a: "evening", w: ["evening", "morning", "noon"] }, { q: "What do you do in the morning? — I …", a: "clean the floor", w: ["clean the floor", "wash the dishes", "go to bed"] }, { q: "When do you have lunch? — I have lunch at …", a: "noon", w: ["noon", "evening", "morning"] }] },
  { n: 15, title: "My family's weekends", words: [["cinema", "🎬", "rạp chiếu phim"], ["shopping centre", "🛍️", "trung tâm mua sắm"], ["sports centre", "🏟️", "trung tâm thể thao"], ["swimming pool", "🏊", "bể bơi"], ["cook meals", "🍲", "nấu các bữa ăn"], ["do yoga", "🧘", "tập yoga"], ["play tennis", "🎾", "chơi quần vợt"], ["watch films", "🎞️", "xem phim"]],
    patterns: [{ q: "Where does he go on Saturdays? — He goes to the …", a: "sports centre", w: ["sports centre", "cinema", "swimming pool"] }, { q: "What does she do on Sundays? — She … yoga.", a: "does", w: ["does", "do", "is"] }, { q: "Where does she go on Sundays? — She goes to the …", a: "shopping centre", w: ["shopping centre", "sports centre", "cinema"] }] },
  { n: 16, title: "Weather", words: [["cloudy", "☁️", "nhiều mây"], ["rainy", "🌧️", "có mưa"], ["sunny", "☀️", "nắng"], ["windy", "🌬️", "có gió"], ["weather", "🌦️", "thời tiết"], ["bakery", "🥖", "tiệm bánh"], ["bookshop", "📚", "hiệu sách"], ["food stall", "🍜", "quán ăn"], ["water park", "🏊", "công viên nước"]],
    patterns: [{ q: "What was the weather like last weekend? — It was …", a: "sunny", w: ["sunny", "rainy", "weather"] }, { q: "Do you want to go to the bookshop? — …, let's go!", a: "Great", w: ["Great", "Sorry", "Weather"] }, { q: "What was the weather like yesterday? — It was … and windy.", a: "cloudy", w: ["cloudy", "sunny", "bakery"] }] },
  { n: 17, title: "In the city", words: [["go straight", "⬆️", "đi thẳng"], ["left", "⬅️", "bên trái"], ["right", "➡️", "bên phải"], ["stop", "✋", "dừng lại"], ["turn", "🔄", "rẽ, quay"], ["turn left", "↩️", "rẽ trái"], ["turn right", "↪️", "rẽ phải"], ["turn round", "🔃", "quay lại"]],
    patterns: [{ q: "What does it say? — It says '…'.", a: "stop", w: ["stop", "go", "turn"] }, { q: "How can I get to the bookshop? — Go …, then turn left.", a: "straight", w: ["straight", "left", "stop"] }, { q: "How can I get to the bakery? — Turn … at the corner.", a: "right", w: ["right", "round", "straight"] }] },
  { n: 18, title: "At the shopping centre", words: [["behind", "🔙", "ở phía sau"], ["between", "↔️", "ở giữa"], ["near", "📍", "ở gần"], ["opposite", "🔀", "đối diện"], ["gift shop", "🎁", "cửa hàng quà tặng"], ["skirt", "👗", "chân váy"], ["T-shirt", "👕", "áo phông"], ["dong", "💵", "đồng (tiền Việt Nam)"], ["thousand", "🔢", "nghìn"]],
    patterns: [{ q: "Where's the bookshop? — It's … the gift shop.", a: "near", w: ["near", "behind", "between"] }, { q: "How much is the skirt? — It's … dong.", a: "80 000", w: ["80 000", "8 000", "800 000"] }, { q: "Where's the T-shirt? — It's … the skirt and the hat.", a: "between", w: ["between", "near", "behind"] }],
    extra: "price" },
  { n: 19, title: "The animal world", words: [["crocodiles", "🐊", "cá sấu"], ["giraffes", "🦒", "hươu cao cổ"], ["hippos", "🦛", "hà mã"], ["lions", "🦁", "sư tử"], ["dance beautifully", "💃", "nhảy đẹp"], ["roar loudly", "🔊", "gầm to"], ["run quickly", "🏃", "chạy nhanh"], ["sing merrily", "🎶", "hát vui vẻ"]],
    patterns: [{ q: "What are these animals? — They're …", a: "lions", w: ["lions", "giraffes", "hippos"] }, { q: "Why do you like lions? — Because they …", a: "roar loudly", w: ["roar loudly", "run quickly", "sing merrily"] }, { q: "Why do you like giraffes? — Because they are …", a: "tall", w: ["tall", "loud", "quick"] }] },
  { n: 20, title: "At summer camp", words: [["building a campfire", "🔥", "dựng lửa trại"], ["dancing around the campfire", "💃", "nhảy quanh lửa trại"], ["playing card games", "🃏", "chơi bài"], ["playing tug of war", "🪢", "kéo co"], ["putting up a tent", "⛺", "dựng lều"], ["singing songs", "🎤", "hát các bài hát"], ["taking a photo", "📸", "chụp ảnh"], ["telling a story", "📖", "kể chuyện"]],
    patterns: [{ q: "What's he doing? — He's …", a: "taking a photo", w: ["taking a photo", "take a photo", "takes a photo"] }, { q: "What are they doing? — They're …", a: "playing tug of war", w: ["playing tug of war", "play tug of war", "plays tug of war"] }, { q: "What's she doing? — She's …", a: "telling a story", w: ["telling a story", "tell a story", "tells a story"] }],
    extra: "cont" }
];
var ALL_WORDS4 = [];
UNITS4.forEach(function (u) { u.words.forEach(function (w) { ALL_WORDS4.push(w); }); });
(function () { var seen = {}; for (var i = ALL_WORDS4.length - 1; i >= 0; i--) { if (seen[ALL_WORDS4[i][0]]) ALL_WORDS4.splice(i, 1); else seen[ALL_WORDS4[i][0]] = 1; } })();
function eng4Pools(u) {
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
  var blank = [function () { return qEngBlankLetter(u.words); }];
  if (pats.length) blank.push(patBlank);
  if (u.extra === "waswere") { choose.push(eng4WasWereMCQ, eng4WasWereMCQ); blank.push(eng4WasWereBlank); }
  if (u.extra === "cont") { choose.push(eng4ContMCQ, eng4ContMCQ); blank.push(eng4ContBlank); }
  if (u.extra === "price") { choose.push(eng4Price, eng4Price); }
  return { choose: choose, blank: blank, match: base.match, games: base.games.concat([yesNoGen]) };
}
/* ================= KHOA HỌC 4 ================= */
var KH4_TOPICS = [
  topic("kh4-chat", "💧", "Chất: nước, không khí, gió và bão", "Bài 1–7 • Tính chất của nước, vòng tuần hoàn, bảo vệ nguồn nước và không khí, phòng chống bão", [
    ["Nước có những tính chất nào sau đây?", "Không màu, không mùi, không vị, không có hình dạng nhất định", "Có màu xanh, có mùi thơm", "Có hình dạng cố định như hòn đá", "Nước tinh khiết không màu, không mùi, không vị và chảy lan theo hình dạng vật chứa."],
    ["Nước tồn tại ở những thể nào?", "Thể rắn, thể lỏng và thể khí", "Chỉ ở thể lỏng", "Chỉ ở thể rắn và lỏng", "Nước đá (rắn), nước lỏng và hơi nước (khí) là ba thể của nước."],
    ["Hiện tượng nước lỏng biến thành nước đá (thể rắn) gọi là gì?", "Sự đông đặc", "Sự nóng chảy", "Sự bay hơi", "Khi gặp lạnh (0°C), nước lỏng đông đặc thành nước đá."],
    ["Hiện tượng hơi nước biến thành nước lỏng (như sương, mây) gọi là gì?", "Sự ngưng tụ", "Sự bay hơi", "Sự đông đặc", "Hơi nước gặp lạnh ngưng tụ thành những giọt nước nhỏ."],
    ["Vòng tuần hoàn của nước trong tự nhiên diễn ra như thế nào?", "Nước bay hơi → ngưng tụ thành mây → rơi xuống thành mưa → chảy về sông, biển", "Nước chỉ chảy từ sông ra biển rồi hết", "Nước mưa biến mất hoàn toàn xuống đất", "Nhờ sức nóng của Mặt Trời, nước liên tục bay hơi, ngưng tụ và rơi xuống thành mưa."],
    ["Việc làm nào gây ô nhiễm nguồn nước?", "Đổ rác, xả nước thải chưa xử lí xuống sông, hồ", "Trồng cây ven bờ sông", "Vớt rác trên mặt nước", "Nguồn nước bị bẩn bởi rác thải, nước thải và hoá chất độc hại."],
    ["Cách nào giúp làm sạch nước ở gia đình?", "Lọc nước và đun sôi trước khi uống", "Uống trực tiếp nước sông", "Để nước lẫn bùn đất", "Lọc qua cát, sỏi, than... và đun sôi giúp nước sạch, an toàn hơn."],
    ["Không khí có ở đâu?", "Ở khắp nơi xung quanh ta và trong các khoảng trống của mọi vật", "Chỉ ở trên bầu trời cao", "Chỉ ở trong bình kín", "Không khí chiếm mọi chỗ trống quanh ta, dù ta không nhìn thấy."],
    ["Thành phần chính của không khí gồm những khí nào?", "Khí ni-tơ (nhiều nhất), khí ô-xi và một số khí khác", "Chỉ có khí ô-xi", "Chỉ có khói và bụi", "Ô-xi chiếm khoảng 1/5 không khí và rất cần cho sự sống, sự cháy."],
    ["Khí ô-xi trong không khí có vai trò gì?", "Duy trì sự cháy và cần cho hoạt động hô hấp của người, động vật", "Làm cho nước đông đá", "Làm cây ngừng lớn", "Không có ô-xi, người và động vật không hô hấp được, lửa không cháy được."],
    ["Việc làm nào giúp bảo vệ bầu không khí trong lành?", "Trồng nhiều cây xanh, không đốt rác bừa bãi", "Đốt rác thải nhựa ngoài đường", "Xả khói từ nhà máy chưa xử lí", "Cây xanh giúp không khí trong lành; khói bụi làm ô nhiễm không khí."],
    ["Gió là gì?", "Không khí chuyển động từ nơi này đến nơi khác", "Nước chảy xiết", "Ánh sáng mặt trời chiếu xuống", "Khi không khí chuyển động, ta cảm nhận được gió."],
    ["Khi có bão lớn, em nên làm gì để an toàn?", "Ở trong nhà kiên cố, theo dõi tin dự báo, không ra ngoài, tránh xa cây to và cột điện", "Ra sân chơi cho mát", "Đứng dưới gốc cây to tránh mưa", "Bão có gió mạnh và mưa to rất nguy hiểm; cần ở nơi an toàn và nghe hướng dẫn của người lớn." ]
  ], [["Đông đặc", "Nước lỏng → nước đá"], ["Bay hơi", "Nước lỏng → hơi nước"], ["Ngưng tụ", "Hơi nước → nước lỏng"], ["Ô-xi", "Duy trì sự cháy, hô hấp"]], "Nối hiện tượng với ý đúng nhé!"),
  topic("kh4-nangluong", "💡", "Năng lượng: ánh sáng, âm thanh, nhiệt", "Bài 8–14 • Sự truyền ánh sáng và âm thanh; vật dẫn nhiệt tốt, dẫn nhiệt kém", [
    ["Ánh sáng truyền đi theo đường nào?", "Đường thẳng", "Đường cong vòng vèo", "Đường zíc-zắc", "Trong môi trường trong suốt, ánh sáng truyền theo đường thẳng (nên vật cản ánh sáng tạo thành bóng)."],
    ["Vật nào cho phép ánh sáng truyền qua gần như hoàn toàn?", "Tấm kính trong (vật trong suốt)", "Tấm gỗ (vật cản sáng)", "Tấm sắt", "Vật trong suốt cho ánh sáng đi qua; vật cản sáng không cho ánh sáng qua và tạo bóng."],
    ["Khi nào bóng của một vật thay đổi kích thước, vị trí?", "Khi vị trí của nguồn sáng hoặc của vật thay đổi", "Khi vật đứng yên mãi mãi", "Khi trời không có ánh sáng", "Nguồn sáng càng gần, bóng của vật càng lớn."],
    ["Ánh sáng có vai trò gì đối với con người và sinh vật?", "Giúp nhìn thấy mọi vật, cây xanh quang hợp, sưởi ấm", "Không có vai trò gì", "Chỉ để trang trí", "Nhờ ánh sáng, mắt ta nhìn thấy; cây cần ánh sáng để sống."],
    ["Điều gì em KHÔNG nên làm để bảo vệ mắt?", "Nhìn trực tiếp vào Mặt Trời hoặc nguồn sáng quá mạnh", "Đọc sách nơi đủ ánh sáng", "Cho mắt nghỉ ngơi sau khi học", "Ánh sáng quá mạnh (Mặt Trời, đèn hàn) làm hại mắt."],
    ["Âm thanh do đâu mà có?", "Do các vật rung động phát ra", "Do ánh sáng tạo ra", "Do nước chảy tạo ra mọi lúc", "Khi gõ, gảy, thổi..., vật rung động và phát ra âm thanh."],
    ["Âm thanh có thể truyền qua những môi trường nào?", "Chất rắn, chất lỏng và chất khí (không khí)", "Chỉ truyền qua không khí", "Truyền qua cả chân không", "Âm thanh cần môi trường để truyền đi; trong chân không, âm thanh không truyền được."],
    ["Việc nào gây ô nhiễm tiếng ồn, có hại cho sức khoẻ?", "Tiếng còi xe, tiếng máy móc quá to, kéo dài", "Tiếng chim hót buổi sáng", "Tiếng nói chuyện nhỏ nhẹ", "Tiếng ồn lớn, kéo dài làm đau tai, khó ngủ, hại sức khoẻ."],
    ["Nhiệt truyền từ vật nào sang vật nào?", "Từ vật nóng hơn sang vật lạnh hơn", "Từ vật lạnh hơn sang vật nóng hơn", "Nhiệt không truyền đi", "Ví dụ: tay ta thấy ấm khi cầm cốc nước nóng vì nhiệt truyền từ cốc sang tay."],
    ["Nhóm vật nào dẫn nhiệt TỐT?", "Kim loại: sắt, đồng, nhôm, inox", "Nhựa, gỗ, vải", "Xốp, cao su, giấy", "Kim loại dẫn nhiệt tốt nên thường dùng làm nồi, chảo."],
    ["Nhóm vật nào dẫn nhiệt KÉM?", "Nhựa, gỗ, vải, xốp", "Sắt, đồng, nhôm", "Thuỷ tinh chịu nhiệt", "Vật dẫn nhiệt kém (cách nhiệt) thường dùng làm tay cầm nồi, áo ấm."],
    ["Vì sao quai nồi thường làm bằng nhựa hoặc gỗ?", "Vì nhựa, gỗ dẫn nhiệt kém, cầm không bị bỏng", "Vì nhựa, gỗ dẫn nhiệt tốt", "Vì nhựa, gỗ rẻ hơn mọi vật liệu khác", "Thân nồi bằng kim loại dẫn nhiệt tốt để nấu nhanh; quai cách nhiệt để cầm an toàn."],
    ["Nhiệt độ của một vật được đo bằng dụng cụ nào?", "Nhiệt kế", "Thước kẻ", "Cân", "Nhiệt kế đo nhiệt độ, đơn vị là độ C (°C)."]
  ], [["Kim loại", "Dẫn nhiệt tốt"], ["Nhựa, gỗ", "Dẫn nhiệt kém"], ["Vật trong suốt", "Cho ánh sáng qua"], ["Vật rung động", "Phát ra âm thanh"]], "Nối vật với tính chất nhé!"),
  topic("kh4-thucvatdongvat", "🌱", "Thực vật và động vật", "Bài 15–18 • Điều kiện sống của cây và vật nuôi; chăm sóc cây trồng, vật nuôi", [
    ["Thực vật cần những điều kiện nào để sống và phát triển?", "Nước, không khí, ánh sáng và chất khoáng", "Chỉ cần nước", "Chỉ cần đất màu mỡ", "Cây lấy nước và chất khoáng từ đất, cần ánh sáng và không khí để quang hợp, hô hấp."],
    ["Cây xanh lấy nước và chất khoáng qua bộ phận nào?", "Rễ cây", "Lá cây", "Hoa", "Rễ hút nước và chất khoáng từ đất để nuôi cây."],
    ["Nếu cây bị che kín, không có ánh sáng lâu ngày, cây sẽ thế nào?", "Vàng úa, còi cọc và có thể chết", "Lớn nhanh hơn", "Xanh tốt hơn", "Cây cần ánh sáng để chế tạo thức ăn nuôi cây."],
    ["Động vật cần những gì để sống?", "Thức ăn, nước uống và không khí", "Chỉ cần thức ăn", "Chỉ cần chỗ ở rộng", "Mỗi loài động vật cần loại thức ăn phù hợp và nước uống sạch."],
    ["Việc làm nào giúp chăm sóc cây trồng tốt?", "Tưới nước vừa đủ, bón phân, bắt sâu, để cây nơi có ánh sáng phù hợp", "Không tưới nước bao giờ", "Để cây trong tủ kín", "Chăm sóc đúng cách giúp cây khoẻ, cho hoa quả tốt."],
    ["Việc làm nào giúp chăm sóc vật nuôi tốt?", "Cho ăn đủ chất, uống nước sạch, giữ chuồng sạch, tiêm phòng bệnh", "Nhốt vật nuôi, bỏ đói", "Không vệ sinh chuồng trại", "Vật nuôi khoẻ mạnh cần ăn uống đủ, ở sạch và được phòng bệnh."],
    ["Vì sao cần tưới nước cho cây vừa đủ, không quá nhiều?", "Tưới quá nhiều làm úng rễ, cây bị thối rễ và chết", "Nước càng nhiều cây càng tốt vô hạn", "Tưới nhiều để cây không cần ánh sáng", "Mỗi loại cây cần lượng nước khác nhau (cây xương rồng cần rất ít nước)."],
    ["Cây xương rồng sống ở sa mạc có đặc điểm gì để thích nghi với nơi khô hạn?", "Lá biến thành gai, thân mọng nước dự trữ nước", "Lá to và mỏng để thoát nhiều nước", "Rễ rất ngắn", "Thân xương rồng chứa nhiều nước, gai giúp giảm mất nước."],
    ["Khi nuôi cá cảnh, vì sao cần thay nước và sục khí (ô-xi) cho bể cá?", "Để nước sạch và có đủ ô-xi cho cá hô hấp", "Để bể cá đẹp hơn mà thôi", "Để cá lớn nhanh gấp đôi ngay", "Cá cần nước sạch, giàu ô-xi; nước bẩn làm cá yếu, bị bệnh."],
    ["Trao đổi chất ở thực vật và động vật diễn ra như thế nào?", "Lấy vào thức ăn, nước, không khí... và thải ra các chất không cần thiết", "Chỉ lấy vào mà không thải ra", "Chỉ thải ra mà không lấy vào", "Nhờ trao đổi chất với môi trường, sinh vật mới sống và lớn lên được."],
    ["Nếu vật nuôi bị bệnh, việc làm đúng là gì?", "Báo cho người lớn, cách li và chữa trị cho vật nuôi", "Bán ngay cho người khác", "Để chung với cả đàn cho lây đều", "Cách li con bệnh và chữa trị kịp thời để tránh lây lan."],
    ["Cây trồng trong nhà kính (nhà lưới) có lợi ích gì?", "Tránh được sâu bệnh, thời tiết xấu, cây lớn đều", "Cây không cần nước nữa", "Cây không cần ánh sáng nữa", "Nhà kính che chắn giúp cây tránh mưa bão, sâu bệnh."],
    ["Để hạt giống nảy mầm tốt, cần những điều kiện nào?", "Đủ nước, không khí và nhiệt độ thích hợp", "Chỉ cần để trong bóng tối hoàn toàn", "Phải ngâm trong nước mãi mãi", "Hạt cần độ ẩm, không khí và độ ấm vừa phải để nảy mầm."]
  ], [["Rễ cây", "Hút nước, chất khoáng"], ["Lá cây", "Quang hợp, tạo thức ăn"], ["Cá cảnh", "Cần nước sạch, ô-xi"], ["Cây xương rồng", "Chịu hạn, thân mọng nước"]], "Nối cho đúng nhé!"),
  topic("kh4-nam", "🍄", "Nấm", "Bài 19–22 • Đặc điểm của nấm; nấm ăn và nấm trong chế biến; nấm gây hỏng thực phẩm và nấm độc", [
    ["Nấm thường mọc và sống tốt ở nơi có điều kiện thế nào?", "Ẩm ướt, ấm áp, có chất hữu cơ (gỗ mục, rơm rạ, thực phẩm...)", "Khô ráo, nắng gắt", "Trong nước biển mặn", "Nấm không có chất diệp lục, sống nhờ vào các chất hữu cơ có sẵn."],
    ["Nấm có tự chế tạo thức ăn như cây xanh được không?", "Không, nấm sống nhờ chất hữu cơ có sẵn", "Có, nấm quang hợp như cây", "Có, nhờ lá xanh của nấm", "Nấm không có lá xanh nên không quang hợp như thực vật."],
    ["Nhóm nấm nào là nấm ĂN ĐƯỢC quen thuộc?", "Nấm rơm, nấm hương, nấm mộc nhĩ, nấm sò", "Mọi loại nấm mọc hoang trong rừng", "Nấm mốc xanh trên bánh mì", "Chỉ ăn các loại nấm quen thuộc, có nguồn gốc rõ ràng."],
    ["Nấm men có ích gì trong chế biến thực phẩm?", "Giúp bột nở xốp khi làm bánh mì, bánh bao", "Làm thực phẩm nhanh hỏng", "Làm đổi màu thực phẩm", "Nấm men là vi nấm có ích, dùng trong làm bánh và lên men."],
    ["Dấu hiệu nào cho thấy thực phẩm đã bị nấm mốc làm hỏng?", "Có các đốm mốc xanh, đen, trắng xám và mùi hôi chua", "Thực phẩm còn thơm ngon", "Thực phẩm cứng hơn bình thường", "Nấm mốc phát triển trên thực phẩm để lâu, ẩm ướt."],
    ["Khi thấy bánh mì bị mốc, em nên làm gì?", "Bỏ đi, tuyệt đối không ăn", "Cắt bỏ phần mốc rồi ăn tiếp", "Ngửi thử rồi quyết định ăn", "Nấm mốc lan cả vào phần chưa thấy mốc và có thể gây ngộ độc."],
    ["Vì sao không được ăn các loại nấm lạ hái ở ngoài tự nhiên?", "Nhiều loại nấm hoang là nấm độc, ăn vào nguy hiểm đến tính mạng", "Vì nấm lạ không ngon", "Vì nấm lạ rất đắt tiền", "Nấm độc khó phân biệt bằng mắt thường; chỉ ăn nấm biết rõ nguồn gốc."],
    ["Việc làm nào giúp bảo quản thực phẩm tránh nấm mốc?", "Để thực phẩm nơi khô ráo, thoáng mát; sấy/phơi khô; bảo quản trong tủ lạnh", "Để thực phẩm ở nơi ẩm ướt", "Để thức ăn thừa ngoài không khí nhiều ngày", "Khô ráo và lạnh làm nấm mốc khó phát triển."],
    ["Mộc nhĩ (nấm mèo) thường được bảo quản và bán ở dạng nào?", "Phơi, sấy khô; khi dùng ngâm nước cho nở", "Luôn để tươi trong nước", "Đóng băng thành đá", "Mộc nhĩ khô nhẹ, để được lâu; ngâm nước sẽ nở mềm trở lại."],
    ["Nấm linh chi được biết đến với công dụng gì?", "Dùng làm thuốc, bồi bổ sức khoẻ", "Dùng để nhuộm vải", "Dùng làm đồ chơi", "Nấm linh chi là một vị thuốc quý trong y học cổ truyền."],
    ["Nấm mốc xuất hiện trên cơm nguội để lâu là do đâu?", "Các bào tử nấm trong không khí rơi vào và phát triển khi có độ ẩm, thức ăn", "Do cơm tự biến thành nấm", "Do ruồi tạo ra", "Bào tử nấm có ở khắp nơi; cơm để lâu, ẩm là môi trường tốt cho nấm mốc."],
    ["Một số nấm dùng để chế biến món ăn ngon nào sau đây?", "Nấm hương cho vào canh, nấm rơm xào, lẩu nấm", "Nấm mốc xanh ăn trực tiếp", "Nấm độc nấu súp", "Nấm ăn được làm món ăn giàu dinh dưỡng."],
    ["Để phòng tránh ngộ độc nấm, gia đình em nên làm gì?", "Chỉ mua và ăn nấm ở nơi tin cậy, biết rõ loại nấm", "Hái nấm rừng về ăn thử", "Ăn nấm có màu sắc càng sặc sỡ càng tốt", "Tuyệt đối không ăn nấm không rõ nguồn gốc."]
  ], [["Nấm rơm, nấm hương", "Nấm ăn được"], ["Nấm men", "Làm nở bột bánh"], ["Nấm mốc", "Làm hỏng thực phẩm"], ["Nấm lạ mọc hoang", "Có thể là nấm độc"]], "Nối loại nấm với ý đúng nhé!"),
  topic("kh4-suckhoe", "🍎", "Con người và sức khoẻ", "Bài 23–28 • Chất dinh dưỡng, ăn uống cân bằng, bệnh do dinh dưỡng, thực phẩm an toàn, phòng tránh đuối nước", [
    ["Nhóm chất bột đường (có trong cơm, bún, khoai...) có vai trò chính là gì?", "Cung cấp năng lượng cho cơ thể hoạt động", "Giúp cơ thể chống bệnh tật trực tiếp", "Giúp xương cứng chắc", "Chất bột đường là nguồn năng lượng chính của cơ thể."],
    ["Chất đạm (có trong thịt, cá, trứng, sữa, đậu) có vai trò chính là gì?", "Giúp cơ thể lớn lên, xây dựng và thay thế các bộ phận", "Chỉ cung cấp nước", "Không có vai trò quan trọng", "Thiếu chất đạm, trẻ em chậm lớn, còi cọc."],
    ["Vi-ta-min và chất khoáng có nhiều trong nhóm thực phẩm nào?", "Rau xanh và quả chín", "Kẹo và nước ngọt", "Mỡ động vật", "Rau quả cung cấp nhiều vi-ta-min, khoáng chất và chất xơ."],
    ["Chế độ ăn uống cân bằng là ăn như thế nào?", "Ăn đủ các nhóm chất, đa dạng thực phẩm, lượng vừa đủ", "Chỉ ăn một món mình thích", "Ăn càng nhiều càng tốt", "Bữa ăn cân bằng gồm chất bột đường, đạm, béo, vi-ta-min và khoáng chất."],
    ["Ăn quá nhiều đồ ngọt, chất béo và ít vận động dễ dẫn đến bệnh gì?", "Thừa cân, béo phì", "Còi xương", "Thiếu máu", "Béo phì làm tăng nguy cơ nhiều bệnh khác."],
    ["Trẻ ăn uống thiếu chất trong thời gian dài sẽ bị sao?", "Suy dinh dưỡng, chậm lớn, hay ốm", "Lớn nhanh hơn bạn bè", "Không ảnh hưởng gì", "Cần ăn đủ chất để cơ thể phát triển khoẻ mạnh."],
    ["Thói quen nào dễ làm hỏng răng (sâu răng)?", "Ăn nhiều kẹo ngọt và không đánh răng", "Đánh răng mỗi ngày hai lần", "Ăn nhiều rau quả", "Đường còn lại trong miệng giúp vi khuẩn gây sâu răng."],
    ["Thực phẩm an toàn là thực phẩm thế nào?", "Có nguồn gốc rõ ràng, còn hạn sử dụng, không ôi thiu, không chứa chất độc hại", "Giá càng rẻ càng an toàn", "Có màu sắc thật bắt mắt", "Khi mua thực phẩm, em nhớ xem hạn sử dụng trên bao bì."],
    ["Trước khi ăn, em cần làm việc gì để phòng bệnh?", "Rửa tay sạch bằng xà phòng", "Chạm tay vào mọi đồ vật", "Không cần làm gì", "Rửa tay giúp loại bỏ vi khuẩn gây bệnh đường tiêu hoá."],
    ["Nguyên tắc “ăn chín, uống sôi” giúp phòng tránh điều gì?", "Phòng các bệnh đường tiêu hoá do vi khuẩn trong thức ăn sống", "Làm thức ăn ngon hơn mà thôi", "Không có tác dụng gì", "Nấu chín và đun sôi nước tiêu diệt phần lớn vi khuẩn gây bệnh."],
    ["Để phòng tránh đuối nước, em KHÔNG nên làm việc nào?", "Tắm ở sông, hồ, ao sâu một mình, không có người lớn", "Học bơi cùng người lớn hướng dẫn", "Mặc áo phao khi đi tàu, thuyền", "Tuyệt đối không tự ý tắm sông hồ; chỉ tắm ở nơi an toàn có người lớn trông."],
    ["Khi thấy một bạn bị đuối nước, em nên làm gì?", "Hô hoán, gọi ngay người lớn và tìm phao, sào để hỗ trợ từ trên bờ", "Nhảy ngay xuống nước kéo bạn lên dù em bơi chưa giỏi", "Đứng nhìn vì sợ ướt quần áo", "Tự ý nhảy xuống cứu bạn rất nguy hiểm; hãy gọi người lớn và dùng phao, sào, dây."],
    ["Khi đi thuyền, tàu trên sông nước, em cần làm gì?", "Mặc áo phao và ngồi yên theo hướng dẫn", "Đứng lên nghịch nước", "Thò tay, cúi người ra ngoài mạn thuyền", "Áo phao giúp em nổi trên nước nếu không may rơi xuống nước."]
  ], [["Chất bột đường", "Cung cấp năng lượng"], ["Chất đạm", "Giúp cơ thể lớn lên"], ["Rau quả", "Vi-ta-min, khoáng chất"], ["Áo phao", "Phòng tránh đuối nước"]], "Nối nhóm chất với vai trò nhé!"),
  (function () { var kp = knowledgePools([
      ["Chuỗi thức ăn trong tự nhiên là gì?", "Dãy sinh vật nối tiếp nhau, trong đó sinh vật này là thức ăn của sinh vật đứng sau", "Danh sách các con vật trong sở thú", "Thứ tự các cây trong vườn", "Ví dụ: Cỏ → Châu chấu → Ếch → Rắn là một chuỗi thức ăn."],
      ["Chuỗi thức ăn thường bắt đầu bằng sinh vật nào?", "Thực vật (cỏ, cây, tảo...)", "Động vật ăn thịt", "Con người", "Thực vật tự tạo thức ăn nhờ ánh sáng Mặt Trời nên là mắt xích đầu tiên."],
      ["Trong chuỗi “Cỏ → Châu chấu → Ếch → Rắn”, châu chấu ăn gì?", "Cỏ", "Ếch", "Rắn", "Mũi tên chỉ chiều “là thức ăn của”: cỏ là thức ăn của châu chấu."],
      ["Trong chuỗi “Cỏ → Châu chấu → Ếch → Rắn”, con vật nào ăn ếch?", "Rắn", "Châu chấu", "Cỏ", "Ếch là thức ăn của rắn trong chuỗi này."],
      ["Vì sao thực vật là mắt xích quan trọng đầu tiên của chuỗi thức ăn?", "Vì thực vật tự quang hợp tạo thức ăn, nuôi sống các sinh vật khác", "Vì thực vật có số lượng ít nhất", "Vì thực vật không cần ánh sáng", "Hầu hết chuỗi thức ăn đều bắt đầu từ thực vật."],
      ["Nhóm động vật nào ăn thực vật?", "Châu chấu, thỏ, hươu, bò", "Rắn, cáo, hổ", "Ếch, chim sẻ ăn sâu", "Động vật ăn thực vật là thức ăn của các động vật ăn thịt."],
      ["Trong chuỗi “Lá cây → Sâu → Chim”, chim ăn gì?", "Sâu", "Lá cây", "Cây", "Sâu ăn lá, chim ăn sâu — đó là quan hệ thức ăn."],
      ["Nếu một mắt xích trong chuỗi thức ăn biến mất, điều gì có thể xảy ra?", "Các sinh vật còn lại trong chuỗi bị ảnh hưởng (thiếu thức ăn hoặc sinh sôi quá mức)", "Không có gì thay đổi", "Các sinh vật khác đều vui hơn", "Các sinh vật trong tự nhiên gắn bó chặt chẽ với nhau."],
      ["Nguồn năng lượng khởi đầu cho hầu hết các chuỗi thức ăn là gì?", "Ánh sáng Mặt Trời", "Gió", "Nước mưa", "Thực vật dùng ánh sáng Mặt Trời để quang hợp, tạo thức ăn."],
      ["Con người thuộc vị trí nào trong chuỗi thức ăn?", "Con người cũng là một mắt xích, ăn thực vật và động vật", "Con người đứng ngoài mọi chuỗi thức ăn", "Con người chỉ ăn động vật", "Thức ăn hằng ngày của con người đến từ các chuỗi thức ăn trong tự nhiên."],
      ["Chuỗi thức ăn nào dưới nước có thể bắt đầu như thế nào?", "Tảo (thực vật phù du) → cá nhỏ → cá lớn", "Cá lớn → cá nhỏ → tảo", "Rắn → ếch → châu chấu", "Dưới nước, tảo và thực vật thuỷ sinh là mắt xích đầu tiên."],
      ["Để bảo vệ các chuỗi thức ăn trong tự nhiên, em nên làm gì?", "Bảo vệ cây xanh và các loài vật, không săn bắt, phá hoại bừa bãi", "Chặt hết cây cỏ dại", "Bắt hết các con vật nhỏ", "Giữ cân bằng tự nhiên giúp mọi sinh vật cùng tồn tại."],
      ["Trong chuỗi “Cỏ → Thỏ → Cáo”, nếu thỏ tăng lên quá nhiều, điều gì xảy ra với cỏ?", "Cỏ bị ăn nhiều, giảm đi", "Cỏ mọc tốt hơn", "Cỏ không thay đổi", "Số lượng các mắt xích trong chuỗi ảnh hưởng lẫn nhau."]
    ], [["Cỏ", "Thức ăn của châu chấu"], ["Châu chấu", "Thức ăn của ếch"], ["Ếch", "Thức ăn của rắn"], ["Thực vật", "Mắt xích đầu tiên"]], "Nối sinh vật với vị trí trong chuỗi thức ăn nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp thành chuỗi thức ăn đúng thứ tự!", ["Cỏ", "Châu chấu", "Ếch", "Rắn"]); });
    kp.games.push(function () { return sortQ("Sắp xếp thành chuỗi thức ăn đúng thứ tự!", ["Lá cây", "Sâu", "Chim sẻ", "Chim ưng"]); });
    kp.games.push(function () { return sortQ("Sắp xếp thành chuỗi thức ăn đúng thứ tự!", ["Tảo", "Cá nhỏ", "Cá lớn", "Chim bói cá"]); });
    return { id: "kh4-chuoithucan", emoji: "🐸", name: "Sinh vật và môi trường: chuỗi thức ăn", sub: "Bài 29–31 • Chuỗi thức ăn; vai trò của thực vật trong chuỗi thức ăn", pools: kp }; })()
];
/* ================= LỊCH SỬ VÀ ĐỊA LÍ 4 ================= */
var LSD4_TOPICS = [
  topic("ls4-lamquen", "🧭", "Làm quen với môn học và địa phương em", "Bài 1–3 • Bản đồ, phương hướng; thiên nhiên và con người ở địa phương em", [
    ["Trên bản đồ, phía trên cùng của tờ bản đồ thường là hướng nào?", "Hướng Bắc", "Hướng Nam", "Hướng Đông", "Theo quy ước, bản đồ thường vẽ hướng Bắc ở phía trên, Nam ở dưới, Đông bên phải, Tây bên trái."],
    ["La bàn là dụng cụ dùng để làm gì?", "Xác định phương hướng", "Đo nhiệt độ", "Đo độ dài", "Kim la bàn luôn chỉ hướng Bắc — Nam, giúp ta xác định phương hướng."],
    ["Mặt Trời mọc ở hướng nào?", "Hướng Đông", "Hướng Tây", "Hướng Bắc", "Mặt Trời mọc ở phía Đông và lặn ở phía Tây — một cách xác định phương hướng trong tự nhiên."],
    ["Mặt Trời lặn ở hướng nào?", "Hướng Tây", "Hướng Đông", "Hướng Nam", "Buổi chiều, Mặt Trời lặn dần ở phía Tây."],
    ["Bốn hướng chính là những hướng nào?", "Bắc, Nam, Đông, Tây", "Trên, dưới, trái, phải", "Sáng, trưa, chiều, tối", "Ngoài bốn hướng chính còn có các hướng phụ như Đông Bắc, Tây Nam..."],
    ["Tỉ lệ bản đồ cho em biết điều gì?", "Khoảng cách trên bản đồ đã được thu nhỏ bao nhiêu lần so với thực tế", "Tên của các tỉnh", "Số dân của một vùng", "Ví dụ tỉ lệ 1 : 100 000 nghĩa là 1 cm trên bản đồ bằng 100 000 cm ngoài thực tế."],
    ["Phần chú giải trên bản đồ dùng để làm gì?", "Giải thích ý nghĩa của các kí hiệu trên bản đồ", "Trang trí cho bản đồ đẹp hơn", "Ghi tên tác giả bản đồ", "Muốn đọc được bản đồ, phải hiểu các kí hiệu qua phần chú giải."],
    ["Môn Lịch sử giúp em tìm hiểu điều gì?", "Những sự kiện, nhân vật và truyền thống trong quá khứ", "Các phép tính số học", "Cách trồng cây", "Học lịch sử để hiểu quá khứ và thêm yêu quê hương, đất nước."],
    ["Môn Địa lí giúp em tìm hiểu điều gì?", "Thiên nhiên và con người ở các vùng, miền", "Các từ vựng tiếng Anh", "Cách làm đồ thủ công", "Địa lí cho biết về địa hình, khí hậu, dân cư, sản xuất của từng vùng."],
    ["Để tìm hiểu về địa phương em (tỉnh, thành phố nơi em sống), em có thể làm gì?", "Quan sát thực tế, đọc sách báo, hỏi người lớn và thầy cô", "Chỉ đoán mà không tìm hiểu", "Không cần tìm hiểu về quê hương", "Địa phương em là nơi em sinh sống, học tập — hãy tìm hiểu để thêm yêu quê hương."],
    ["Khi tham quan di tích lịch sử ở địa phương, em nên làm gì?", "Giữ gìn, bảo vệ di tích, không viết vẽ lên di tích", "Khắc tên mình lên tường di tích", "Bẻ cành, hái hoa trong khu di tích", "Di tích là chứng tích của lịch sử, cần được mọi người bảo vệ."],
    ["Nếu em đứng đối diện với hướng Bắc, phía sau lưng em là hướng nào?", "Hướng Nam", "Hướng Đông", "Hướng Tây", "Bắc và Nam là hai hướng ngược nhau."],
    ["Bản đồ và lược đồ giúp em điều gì khi đi tham quan, du lịch?", "Biết vị trí, đường đi và các địa điểm", "Biết trước thời tiết chắc chắn", "Không bị mệt khi đi bộ", "Đọc bản đồ là kĩ năng hữu ích trong học tập và đời sống."]
  ], [["Phía trên bản đồ", "Hướng Bắc"], ["La bàn", "Xác định phương hướng"], ["Mặt Trời mọc", "Hướng Đông"], ["Chú giải", "Giải thích kí hiệu bản đồ"]], "Nối cho đúng nhé!"),
  topic("ls4-trungdu", "⛰️", "Trung du và miền núi phía Bắc", "Bài 4–7 • Thiên nhiên, dân cư và sản xuất, văn hoá; Đền Hùng và lễ giỗ Tổ Hùng Vương", [
    ["Vùng Trung du và miền núi phía Bắc có địa hình chủ yếu là gì?", "Đồi núi, có nhiều dãy núi cao", "Đồng bằng phẳng, thấp", "Chủ yếu là biển và đảo", "Đây là vùng có địa hình cao nhất nước ta, với dãy Hoàng Liên Sơn hùng vĩ."],
    ["Đỉnh núi cao nhất của Việt Nam nằm ở vùng này, đó là đỉnh nào?", "Phan-xi-păng (cao 3 143 m)", "Bà Đen", "Lang Biang", "Phan-xi-păng thuộc dãy Hoàng Liên Sơn, được gọi là “nóc nhà Đông Dương”."],
    ["Đền Hùng — nơi thờ các vua Hùng — nằm ở tỉnh nào?", "Phú Thọ", "Hà Nội", "Ninh Bình", "Đền Hùng nằm trên núi Nghĩa Lĩnh, tỉnh Phú Thọ."],
    ["Lễ giỗ Tổ Hùng Vương được tổ chức vào ngày nào hằng năm?", "Mùng 10 tháng 3 âm lịch", "Mùng 1 tháng 1 âm lịch", "Ngày 2 tháng 9 dương lịch", "Câu ca dao nhắc: “Dù ai đi ngược về xuôi / Nhớ ngày giỗ Tổ mùng mười tháng ba”."],
    ["Câu ca dao nào nhắc về ngày giỗ Tổ Hùng Vương?", "“Dù ai đi ngược về xuôi / Nhớ ngày giỗ Tổ mùng mười tháng ba”", "“Công cha như núi Thái Sơn”", "“Bầu ơi thương lấy bí cùng”", "Câu ca dao thể hiện truyền thống uống nước nhớ nguồn của dân tộc."],
    ["Ruộng bậc thang là hình thức canh tác đặc trưng ở đâu?", "Trên các sườn đồi, sườn núi của vùng núi phía Bắc", "Ở vùng đồng bằng ven biển", "Trên các đảo ngoài khơi", "Đồng bào vùng cao san sườn đồi thành từng bậc để trồng lúa nước."],
    ["Cây chè là cây công nghiệp nổi tiếng của địa phương nào trong vùng?", "Thái Nguyên", "Cà Mau", "Đà Lạt", "Chè Thái Nguyên thơm ngon, nổi tiếng khắp cả nước."],
    ["Đồng bào các dân tộc ở vùng núi phía Bắc (như người Thái, người Mường) thường ở trong kiểu nhà nào?", "Nhà sàn", "Nhà ống", "Nhà chung cư", "Nhà sàn cao ráo, thoáng mát, phù hợp với địa hình vùng núi."],
    ["Trên các con sông lớn của vùng (như sông Đà), người dân xây dựng công trình nào để phát điện?", "Nhà máy thuỷ điện (Hoà Bình, Sơn La)", "Nhà máy nhiệt điện than", "Đê biển", "Thuỷ điện Sơn La là nhà máy thuỷ điện lớn nhất nước ta."],
    ["Chợ phiên vùng cao là nét văn hoá đặc sắc vì:", "Là nơi mua bán, giao lưu, gặp gỡ của đồng bào các dân tộc", "Chỉ bán một loại hàng duy nhất", "Chỉ họp vào ban đêm", "Chợ phiên rực rỡ sắc màu trang phục và sản vật vùng cao."],
    ["Các vua Hùng có công lao gì đối với dân tộc ta?", "Dựng nước Văn Lang — nhà nước đầu tiên của người Việt", "Xây dựng cố đô Huế", "Mở trường Quốc Tử Giám", "Giỗ Tổ Hùng Vương là dịp tưởng nhớ công ơn dựng nước của các vua Hùng."],
    ["Khí hậu vùng núi phía Bắc vào mùa đông có đặc điểm gì?", "Lạnh, có nơi rất rét, xuất hiện sương muối, băng giá ở vùng núi cao", "Nóng ẩm quanh năm như mùa hè", "Khô nóng như sa mạc", "Đỉnh Phan-xi-păng mùa đông có thể có tuyết rơi."],
    ["Ngoài trồng trọt, người dân vùng núi phía Bắc còn phát triển hoạt động sản xuất nào?", "Chăn nuôi gia súc (trâu, bò), trồng cây ăn quả, khai thác và chế biến khoáng sản", "Chỉ đánh bắt hải sản", "Chỉ làm muối biển", "Vùng có nhiều thế mạnh: chăn nuôi, cây ăn quả ôn đới như mận, đào, lê."]
  ], [["Đền Hùng", "Phú Thọ"], ["Giỗ Tổ Hùng Vương", "Mùng 10 tháng 3 âm lịch"], ["Phan-xi-păng", "Đỉnh núi cao nhất Việt Nam"], ["Ruộng bậc thang", "Trồng lúa trên sườn núi"]], "Nối địa danh, sự kiện với ý đúng nhé!"),
  topic("ls4-dbbb", "🌾", "Đồng bằng Bắc Bộ", "Bài 8–14 • Thiên nhiên, dân cư và sản xuất; sông Hồng, Thăng Long – Hà Nội, Văn Miếu – Quốc Tử Giám", [
    ["Đồng bằng Bắc Bộ được hình thành do phù sa của những con sông nào bồi đắp?", "Sông Hồng và sông Thái Bình", "Sông Cửu Long và sông Đồng Nai", "Sông Hương và sông Hàn", "Đây là đồng bằng châu thổ lớn thứ hai của nước ta."],
    ["Địa hình của Đồng bằng Bắc Bộ có đặc điểm gì?", "Thấp và bằng phẳng, có hệ thống đê dọc các con sông", "Toàn đồi núi cao", "Chủ yếu là cao nguyên đất đỏ", "Người dân đắp đê để ngăn nước lũ, bảo vệ mùa màng và làng mạc."],
    ["Sông Hồng có đặc điểm nổi bật nào?", "Là con sông lớn nhất miền Bắc, nước có nhiều phù sa màu đỏ", "Là con sông ngắn nhất nước ta", "Chảy qua vùng Nam Bộ", "Phù sa sông Hồng bồi đắp nên đồng bằng màu mỡ."],
    ["Hoạt động sản xuất chính của người dân Đồng bằng Bắc Bộ là gì?", "Trồng lúa nước; ngoài ra trồng rau màu vụ đông, chăn nuôi", "Đánh bắt cá biển khơi", "Trồng cà phê trên cao nguyên", "Đồng bằng Bắc Bộ là một trong hai vựa lúa lớn của cả nước."],
    ["Vùng này nổi tiếng với nhiều nghề thủ công truyền thống nào?", "Gốm Bát Tràng, lụa Vạn Phúc, tranh Đông Hồ...", "Làm muối biển", "Dệt thổ cẩm bằng khung gỗ lớn", "Các làng nghề có từ lâu đời, sản phẩm nổi tiếng trong và ngoài nước."],
    ["Thăng Long là tên gọi xưa của thành phố nào ngày nay?", "Hà Nội", "Huế", "Hải Phòng", "Năm 1010, vua Lý Công Uẩn dời đô từ Hoa Lư ra Đại La và đặt tên là Thăng Long."],
    ["Năm 1010 gắn với sự kiện lịch sử nào?", "Vua Lý Công Uẩn (Lý Thái Tổ) dời đô ra Thăng Long", "Thành lập trường Quốc Tử Giám", "Khởi nghĩa Hai Bà Trưng", "Thăng Long — Hà Nội đã hơn một nghìn năm tuổi."],
    ["Văn Miếu ở Hà Nội được xây dựng vào thời kì nào và để làm gì?", "Thời nhà Lý, để thờ Khổng Tử, Chu Công và các bậc hiền tài", "Thời nhà Nguyễn, để làm chợ", "Thời Pháp thuộc, để làm trường học kiểu mới", "Văn Miếu được xây năm 1070, là nơi tôn vinh truyền thống hiếu học."],
    ["Quốc Tử Giám được coi là gì trong lịch sử giáo dục Việt Nam?", "Trường đại học đầu tiên của nước ta (thành lập năm 1076, thời nhà Lý)", "Ngôi trường tiểu học đầu tiên", "Thư viện lớn nhất châu Á", "Quốc Tử Giám là nơi đào tạo nhân tài cho đất nước thời phong kiến."],
    ["Các tấm bia đá đặt tại Văn Miếu — Quốc Tử Giám ghi lại điều gì?", "Ghi tên các vị tiến sĩ đỗ đạt qua các kì thi xưa", "Ghi tên các vị vua nhà Lý", "Ghi các bài thơ về mùa xuân", "82 tấm bia tiến sĩ là di sản quý, nay vẫn còn ở Văn Miếu."],
    ["Hà Nội giữ vai trò gì đối với cả nước?", "Là thủ đô, trung tâm chính trị, văn hoá của Việt Nam", "Là hải cảng lớn nhất", "Là vùng trồng lúa lớn nhất", "Hà Nội là thủ đô nghìn năm văn hiến của nước ta."],
    ["Dân cư ở Đồng bằng Bắc Bộ có đặc điểm gì?", "Đông đúc nhất cả nước, người dân sống tập trung ở các làng, xã", "Rất thưa thớt", "Chỉ sống ở ven biển", "Đây là vùng có mật độ dân số cao nhất Việt Nam."],
    ["Mùa đông ở Đồng bằng Bắc Bộ có đặc điểm gì?", "Lạnh, có gió mùa Đông Bắc", "Nóng như mùa hè", "Mưa nhiều nhất trong năm", "Gió mùa Đông Bắc mang không khí lạnh từ phương Bắc xuống."]
  ], [["Sông Hồng", "Bồi đắp đồng bằng Bắc Bộ"], ["Thăng Long", "Hà Nội ngày nay"], ["Quốc Tử Giám", "Trường đại học đầu tiên (1076)"], ["Bia tiến sĩ", "Ghi tên người đỗ đạt"]], "Nối cho đúng nhé!"),
  topic("ls4-trungbo", "🏯", "Bắc Trung Bộ, Nam Trung Bộ và Tây Nguyên", "Bài 15–21 • Thiên nhiên, sản xuất, văn hoá; Cố đô Huế, phố cổ Hội An, lễ hội Cồng chiêng Tây Nguyên", [
    ["Vùng Bắc Trung Bộ có đặc điểm địa hình nào?", "Dải đất hẹp: phía tây là dãy Trường Sơn, phía đông là biển", "Cao nguyên rộng lớn toàn đất đỏ", "Đồng bằng châu thổ rộng mênh mông", "Mùa hè, vùng này chịu gió Lào khô nóng thổi từ phía tây sang."],
    ["Gió Lào ở Bắc Trung Bộ có tính chất thế nào?", "Khô và nóng, thổi vào mùa hè", "Lạnh và ẩm, thổi vào mùa đông", "Mát mẻ quanh năm", "Gió Lào làm thời tiết mùa hè ở Bắc Trung Bộ rất nóng."],
    ["Người dân ven biển Nam Trung Bộ phát triển những nghề nào?", "Đánh bắt, nuôi trồng hải sản và làm muối", "Trồng lúa trên ruộng bậc thang", "Khai thác than đá", "Bờ biển nhiều bãi tắm đẹp và hải sản phong phú."],
    ["Cố đô Huế từng là kinh đô của triều đại nào?", "Triều Nguyễn", "Triều Lý", "Triều Trần", "Huế là kinh đô của nước ta dưới triều Nguyễn (1802–1945)."],
    ["Cố đô Huế nổi tiếng với những di tích nào?", "Kinh thành Huế, lăng tẩm các vua Nguyễn, chùa Thiên Mụ, cầu Trường Tiền trên sông Hương", "Địa đạo Củ Chi", "Văn Miếu — Quốc Tử Giám", "Quần thể di tích Cố đô Huế được UNESCO công nhận là Di sản văn hoá thế giới."],
    ["Phố cổ Hội An thuộc tỉnh nào và nổi tiếng vì điều gì?", "Quảng Nam; là thương cảng sầm uất xưa, nổi tiếng với đèn lồng và Chùa Cầu", "Thừa Thiên Huế; nổi tiếng với lăng tẩm", "Khánh Hoà; nổi tiếng với tháp Chăm", "Hội An cũng được UNESCO công nhận là Di sản văn hoá thế giới."],
    ["Chùa Cầu ở Hội An là công trình gắn với thương nhân nước nào xây dựng?", "Nhật Bản", "Trung Quốc", "Pháp", "Chùa Cầu (cầu Nhật Bản) là biểu tượng của phố cổ Hội An."],
    ["Lễ hội Cồng chiêng là nét văn hoá đặc sắc của vùng nào?", "Tây Nguyên", "Đồng bằng Bắc Bộ", "Nam Bộ", "Không gian văn hoá Cồng chiêng Tây Nguyên được UNESCO công nhận là di sản văn hoá phi vật thể."],
    ["Tây Nguyên có loại đất và cây trồng nổi tiếng nào?", "Đất đỏ ba-dan màu mỡ, trồng nhiều cà phê", "Đất phù sa, trồng lúa nước", "Đất cát ven biển, trồng dưa hấu", "Buôn Ma Thuột (Đắk Lắk) được coi là thủ phủ cà phê của Việt Nam."],
    ["Nhà rông là công trình văn hoá đặc trưng của đồng bào nào?", "Các dân tộc ở Tây Nguyên (như Ba Na, Gia Rai)", "Người Kinh ở đồng bằng", "Người Chăm ở ven biển", "Nhà rông cao lớn là nơi sinh hoạt cộng đồng của buôn làng Tây Nguyên."],
    ["Đồng bào các dân tộc Bắc Trung Bộ và Nam Trung Bộ có truyền thống gì đáng tự hào?", "Truyền thống yêu nước, cách mạng kiên cường qua các thời kì kháng chiến", "Truyền thống buôn bán đường biển duy nhất", "Không có truyền thống đặc biệt", "Nhiều di tích cách mạng nổi tiếng nằm ở dải đất miền Trung anh hùng."],
    ["Huế còn được yêu mến bởi dòng sông và cây cầu nào?", "Sông Hương và cầu Trường Tiền", "Sông Hồng và cầu Long Biên", "Sông Hàn và cầu Rồng", "“Sông Hương, núi Ngự” là biểu tượng của xứ Huế mộng mơ."],
    ["Vì sao miền Trung thường chịu nhiều bão, lũ?", "Vì vùng biển phía đông đón bão từ Biển Đông vào, địa hình hẹp, dốc", "Vì nằm ở cực Bắc của đất nước", "Vì có quá nhiều hồ chứa nước", "Người dân miền Trung có truyền thống kiên cường chống chọi và khắc phục thiên tai."]
  ], [["Cố đô Huế", "Kinh đô triều Nguyễn"], ["Phố cổ Hội An", "Đèn lồng, Chùa Cầu"], ["Cồng chiêng", "Văn hoá Tây Nguyên"], ["Buôn Ma Thuột", "Thủ phủ cà phê"]], "Nối địa danh với ý đúng nhé!"),
  topic("ls4-nambo", "🛶", "Nam Bộ", "Bài 22–27 • Thiên nhiên, dân cư và sản xuất; Thành phố Hồ Chí Minh, địa đạo Củ Chi", [
    ["Nam Bộ là đồng bằng châu thổ của con sông lớn nào?", "Sông Cửu Long (phần cuối của sông Mê Công)", "Sông Hồng", "Sông Hương", "Đồng bằng sông Cửu Long là đồng bằng lớn nhất nước ta."],
    ["Địa hình và sông ngòi của Nam Bộ có đặc điểm gì?", "Thấp, bằng phẳng; sông ngòi, kênh rạch chằng chịt", "Núi cao trùng điệp", "Hầu như không có sông", "Giao thông đường thuỷ rất thuận tiện ở vùng này."],
    ["Nam Bộ được coi là gì của cả nước về sản xuất lúa gạo?", "Vựa lúa lớn nhất cả nước", "Vùng trồng chè lớn nhất", "Vùng khai thác than lớn nhất", "Lúa gạo Nam Bộ không chỉ đủ cho cả nước mà còn xuất khẩu nhiều."],
    ["Chợ nổi là nét văn hoá đặc sắc của vùng nào?", "Nam Bộ (như chợ nổi Cái Răng ở Cần Thơ)", "Trung du phía Bắc", "Tây Nguyên", "Chợ họp trên sông, ghe thuyền bày bán hoa quả, nông sản."],
    ["Ngoài lúa, Nam Bộ còn nổi tiếng với sản phẩm nào?", "Vườn cây ăn quả (xoài, sầu riêng, chôm chôm...) và thuỷ sản (cá tra, tôm)", "Chè và cà phê ôn đới", "Khoáng sản than đá", "Miền Tây Nam Bộ là vựa trái cây lớn của cả nước."],
    ["Mùa nước nổi ở Nam Bộ thường diễn ra thế nào?", "Nước sông dâng cao tràn vào đồng ruộng, mang theo phù sa và tôm cá", "Sông cạn khô hoàn toàn", "Nước biển xâm nhập gây mặn hoá", "Mùa nước nổi mang nguồn lợi thuỷ sản dồi dào cho người dân."],
    ["Thành phố Hồ Chí Minh trước đây có tên gọi là gì?", "Sài Gòn", "Thăng Long", "Phú Xuân", "Năm 1976, thành phố Sài Gòn — Gia Định được đổi tên là Thành phố Hồ Chí Minh."],
    ["Thành phố Hồ Chí Minh giữ vai trò gì?", "Là trung tâm kinh tế, văn hoá, khoa học lớn của cả nước", "Là thủ đô của Việt Nam", "Là tỉnh miền núi phía Bắc", "Thủ đô của nước ta là Hà Nội; TP. Hồ Chí Minh là đô thị lớn nhất cả nước."],
    ["Địa đạo Củ Chi nằm ở đâu?", "Ở huyện Củ Chi, Thành phố Hồ Chí Minh", "Ở trung tâm Hà Nội", "Ở tỉnh Phú Thọ", "Địa đạo Củ Chi là di tích lịch sử cách mạng nổi tiếng."],
    ["Địa đạo Củ Chi là công trình như thế nào?", "Hệ thống đường hầm ngầm dài hơn 200 km trong lòng đất, dùng để sinh hoạt và chiến đấu trong kháng chiến chống Mỹ", "Một hang động tự nhiên có thạch nhũ", "Một con kênh đào để dẫn nước", "Quân và dân Củ Chi đào địa đạo bằng dụng cụ thô sơ trong nhiều năm."],
    ["Vì sao Củ Chi được gọi là “đất thép thành đồng”?", "Vì quân và dân nơi đây kiên cường bám đất, chiến đấu trong điều kiện vô cùng gian khổ", "Vì đất ở Củ Chi chứa nhiều sắt thép", "Vì nơi đây có nhà máy thép lớn", "Danh hiệu ghi nhận tinh thần anh dũng của vùng đất Củ Chi."],
    ["Đờn ca tài tử là loại hình nghệ thuật đặc sắc của vùng nào?", "Nam Bộ", "Bắc Bộ", "Tây Nguyên", "Đờn ca tài tử Nam Bộ được UNESCO công nhận là di sản văn hoá phi vật thể."],
    ["Rừng tràm và vườn chim (như vườn quốc gia Tràm Chim ở Đồng Tháp) cho thấy điều gì về thiên nhiên Nam Bộ?", "Thiên nhiên phong phú, là nơi sinh sống của nhiều loài chim quý như sếu đầu đỏ", "Nam Bộ không có rừng", "Nam Bộ chỉ có đồng lúa", "Cần bảo vệ các khu rừng ngập nước và động vật quý hiếm ở đây."]
  ], [["Sông Cửu Long", "Bồi đắp đồng bằng Nam Bộ"], ["Chợ nổi Cái Răng", "Cần Thơ"], ["Địa đạo Củ Chi", "Đường hầm trong kháng chiến"], ["Đờn ca tài tử", "Nghệ thuật Nam Bộ"]], "Nối cho đúng nhé!")
];
/* ================= ĐẠO ĐỨC 4 — 8 chủ đề tình huống ================= */
var DD4_TOPICS = [
  topic("dd4-bieton", "🌾", "Biết ơn người lao động", "Bài 1 • Cảm thông và biết ơn những người lao động quanh em", [
    ["Vì sao chúng ta cần biết ơn người lao động?", "Vì nhờ lao động của họ, chúng ta có cơm ăn, áo mặc, nhà ở, sách vở...", "Vì người lớn dặn dò phải nói thế", "Vì họ là người giàu có", "Mọi sản phẩm, dịch vụ quanh ta đều do người lao động làm ra."],
    ["Sáng sớm em thấy bác lao công đang quét đường. Em nên làm gì?", "Chào hỏi lễ phép, cảm ơn và giữ đường phố sạch sẽ", "Vứt rác thêm cho bác quét", "Đi qua như không nhìn thấy", "Tôn trọng và biết ơn người lao động thể hiện bằng hành động cụ thể."],
    ["Em được bác nông dân cho một quả cam trong vườn. Em nên nói gì?", "Cảm ơn bác và hiểu rằng quả cam là thành quả lao động vất vả", "Không cần nói gì", "Chê quả cam nhỏ", "Nhận quà lao động cần trân trọng, không lãng phí."],
    ["Thấy bạn cười nhạo nghề của bố mẹ một bạn khác, em nên làm gì?", "Nhắc bạn: mọi nghề chân chính đều đáng quý, không nên trêu chọc", "Cười cùng với bạn cho vui", "Kể cho cả lớp cùng cười", "Không có nghề nào đáng xấu hổ khi đó là lao động chân chính."],
    ["Việc làm nào thể hiện sự biết ơn thợ xây dựng trường học?", "Giữ gìn trường lớp sạch đẹp, không vẽ bậy lên tường", "Phá hỏng bàn ghế mới", "Viết tên lên tường lớp", "Giữ gìn thành quả lao động chính là biết ơn người lao động."],
    ["Cơm em ăn hằng ngày là thành quả lao động của ai?", "Của bác nông dân và nhiều người lao động khác", "Tự mọc ra trong bếp", "Của riêng mẹ em làm từ đầu đến cuối", "Hạt gạo trải qua bao công đoạn: cày, cấy, gặt, xay xát, vận chuyển..."],
    ["Khi thợ sửa chữa đến nhà sửa ống nước, thái độ đúng của em là gì?", "Lễ phép chào hỏi, không nghịch dụng cụ của thợ", "Nghịch đồ nghề của thợ cho vui", "Coi thường vì đó là việc tay chân", "Tôn trọng mọi người lao động."],
    ["Câu nói nào thể hiện lòng biết ơn người lao động?", "“Nhờ có các bác công nhân, chúng cháu mới có con đường đẹp để đi học”", "“Việc đó ai làm chẳng được”", "“Học hành chẳng liên quan gì đến lao động”", "Biết ơn là ghi nhận công sức của người khác dành cho mình."],
    ["Em làm rơi cơm xuống bàn ăn rất nhiều. Việc nên làm là gì?", "Ăn uống cẩn thận, trân trọng hạt cơm — “hạt ngọc” của người nông dân", "Quét hết xuống đất, không sao cả", "Đổ cả bát cơm đi", "Lãng phí thức ăn là không trân trọng thành quả lao động."],
    ["Ngày Tết, em muốn cảm ơn cô lao công của trường. Cách làm phù hợp là gì?", "Chúc Tết lễ phép và gửi lời cảm ơn chân thành", "Tặng quà thật đắt tiền", "Không cần quan tâm", "Lời cảm ơn chân thành là món quà ý nghĩa."],
    ["Bố bạn em là thợ hồ (thợ xây). Bạn ấy đôi khi ngại vì nghề của bố. Em nên nói gì?", "Nghề của bố bạn rất đáng quý — nhờ thợ xây mới có nhà, có trường cho chúng ta", "Khuyên bạn giấu chuyện đó đi", "Đồng ý rằng nghề đó không hay", "Mọi nghề chân chính đều cao quý như nhau."],
    ["Người lao động nào giúp em đến trường an toàn mỗi sáng?", "Chú công an giao thông, bác bảo vệ, người lái xe...", "Không có ai cả", "Chỉ có thầy cô giáo", "Rất nhiều người lao động âm thầm phục vụ cuộc sống mỗi ngày."]
  ], [["Bác nông dân", "Hạt gạo, rau quả"], ["Bác lao công", "Đường phố sạch đẹp"], ["Thợ xây", "Nhà ở, trường học"], ["Bác sĩ, y tá", "Chăm sóc sức khoẻ"]], "Nối người lao động với thành quả nhé!"),
  topic("dd4-camthong", "🤝", "Cảm thông, giúp đỡ người gặp khó khăn", "Bài 2 • Chia sẻ với người khuyết tật, người nghèo, bạn gặp hoàn cảnh khó khăn", [
    ["Bạn cùng lớp có hoàn cảnh khó khăn, thiếu sách vở. Em nên làm gì?", "Chia sẻ, quyên góp sách vở và động viên bạn", "Trêu chọc bạn nghèo", "Không chơi với bạn nữa", "Giúp đỡ đúng lúc làm bạn ấm lòng và có động lực học tập."],
    ["Thấy một cụ già gặp khó khăn khi qua đường, em nên làm gì?", "Đến giúp cụ qua đường an toàn (cùng với sự cẩn thận)", "Đứng nhìn cho vui", "Chạy qua trước cho nhanh", "Giúp đỡ người già là việc làm tốt, nhưng em cũng cần chú ý an toàn giao thông."],
    ["Bạn bị khuyết tật ở lớp em bị một số bạn trêu chọc. Em nên làm gì?", "Đứng về phía bạn, nhắc các bạn dừng lại và chơi cùng bạn", "Trêu chọc cùng cho hoà đồng", "Tránh xa bạn ấy", "Người khuyết tật cần được tôn trọng và hoà nhập như mọi người."],
    ["Trường phát động quyên góp ủng hộ đồng bào vùng lũ. Việc làm tốt nhất của em là gì?", "Tiết kiệm tiền ăn sáng, đóng góp sách vở, quần áo còn tốt", "Không quan tâm vì xa nhà mình", "Đóng góp đồ rách nát bỏ đi", "“Lá lành đùm lá rách” — truyền thống tốt đẹp của dân tộc ta."],
    ["Một bạn mới chuyển đến lớp, còn rụt rè chưa quen ai. Em nên làm gì?", "Chủ động làm quen, rủ bạn chơi và học cùng", "Để mặc bạn một mình", "Nói xấu bạn với cả lớp", "Giúp bạn mới hoà nhập là cách cảm thông thiết thực."],
    ["Bạn cùng bàn bị ốm nghỉ học dài ngày. Em có thể giúp bạn điều gì?", "Chép bài và giảng lại bài cho bạn khi bạn đi học lại", "Mặc kệ, đó là việc của bạn", "Giấu vở không cho bạn mượn chép", "Giúp bạn bắt kịp bài học là tình bạn đẹp."],
    ["“Cảm thông” có nghĩa là gì?", "Hiểu và chia sẻ với khó khăn, nỗi buồn của người khác", "Chỉ thấy thương hại từ xa", "Là kể khó khăn của người khác cho mọi người", "Cảm thông bắt đầu từ việc đặt mình vào hoàn cảnh của người khác."],
    ["Thấy em nhỏ bị lạc ở công viên, đang khóc, em nên làm gì?", "Dỗ em và nhờ người lớn, chú bảo vệ, công an giúp tìm người thân", "Dẫn em đi thật xa khỏi chỗ đó", "Bỏ đi vì sợ liên quan", "Không tự ý dẫn trẻ lạ đi xa; hãy nhờ người lớn có trách nhiệm giúp đỡ."],
    ["Khi quyên góp giúp bạn khó khăn, điều quan trọng nhất là gì?", "Tấm lòng chân thành, tự nguyện", "Số tiền phải thật lớn", "Được cả lớp biết đến", "Giúp đỡ xuất phát từ tấm lòng, ít hay nhiều đều quý."],
    ["Bạn em buồn vì bố mẹ đi làm xa. Em nên làm gì?", "Quan tâm, rủ bạn tham gia các hoạt động vui cùng lớp", "Hay nhắc chuyện đó để chọc bạn", "Không chơi với bạn nữa", "Sự quan tâm của bạn bè giúp bạn vơi nỗi nhớ nhà."],
    ["Trong lớp có bạn học chậm hơn các bạn khác. Thái độ đúng là gì?", "Kiên nhẫn giúp đỡ, không chê bai bạn", "Chê bạn học dốt", "Không cho bạn vào nhóm học tập", "Mỗi người có nhịp học khác nhau; giúp đỡ nhau cùng tiến bộ."],
    ["Câu tục ngữ nào nói về tinh thần tương thân tương ái?", "“Lá lành đùm lá rách”", "“Ăn cây nào rào cây ấy”", "“Mạnh ai nấy sống”", "Tục ngữ khuyên người khoẻ mạnh, đủ đầy giúp đỡ người yếu thế, khó khăn."]
  ], [["Lá lành", "Đùm lá rách"], ["Bạn khó khăn", "Chia sẻ, giúp đỡ"], ["Người khuyết tật", "Tôn trọng, hoà nhập"], ["Đồng bào vùng lũ", "Quyên góp ủng hộ"]], "Nối cho đúng nhé!"),
  topic("dd4-laodong", "🔨", "Yêu lao động", "Bài 3 • Lao động là vinh quang; tự giác làm việc phù hợp với sức mình", [
    ["“Yêu lao động” được thể hiện qua việc làm nào?", "Tự giác quét nhà, tưới cây, giúp bố mẹ việc vừa sức", "Chỉ thích chơi, không làm việc gì", "Làm việc chỉ khi bị nhắc nhở, ép buộc", "Lao động giúp em rèn tính tự lập và trân trọng thành quả."],
    ["Câu nói nổi tiếng nào về lao động của Bác Hồ được học?", "“Lao động là vinh quang”", "“Học mà không chơi”", "“Việc hôm nay chớ để ngày mai” (tục ngữ)", "Bác Hồ dạy: lao động chân chính là vinh quang, lười biếng là đáng chê."],
    ["Em được phân công trực nhật lớp. Thái độ đúng là gì?", "Làm việc nghiêm túc, đến lượt là tự giác làm", "Trốn trực nhật để bạn làm thay", "Làm qua loa cho xong", "Trực nhật giúp lớp sạch đẹp và rèn ý thức trách nhiệm."],
    ["Thấy mẹ đang nấu bếp bận rộn, em có thể giúp gì?", "Nhặt rau, dọn bàn ăn, rửa bát sau bữa ăn", "Ngồi chơi điện tử chờ cơm", "Đòi mẹ nấu món khác ngay lập tức", "Giúp việc nhà vừa sức là yêu lao động trong gia đình."],
    ["Vì sao học sinh cần tham gia lao động ở trường (trực nhật, chăm sóc cây)?", "Để trường lớp sạch đẹp và rèn thói quen lao động", "Vì đó là hình phạt", "Để thầy cô khỏi phải làm", "Lao động ở trường là một phần của rèn luyện."],
    ["Việc làm nào là biểu hiện của lười lao động?", "Đùn đẩy công việc cho bạn, chờ người khác làm thay", "Hoàn thành phần việc của mình", "Nhận thêm việc giúp nhóm", "Lười lao động khiến em phụ thuộc vào người khác."],
    ["Sau khi chơi đồ chơi xong, việc làm đúng là gì?", "Tự dọn dẹp, cất đồ chơi vào đúng chỗ", "Để nguyên đó chờ mẹ dọn", "Giấu đồ chơi lung tung", "Tự phục vụ bản thân là bước đầu của yêu lao động."],
    ["Nhóm em được giao trồng và chăm sóc một bồn hoa. Một bạn trong nhóm không chịu làm. Em nên làm gì?", "Khuyên bạn cùng làm, phân công rõ ràng để ai cũng có phần việc", "Làm thay hết phần của bạn mãi mãi", "Bỏ cả bồn hoa không chăm nữa", "Trong lao động tập thể, mỗi người cần có trách nhiệm với phần việc của mình."],
    ["Câu tục ngữ “Có làm thì mới có ăn” khuyên em điều gì?", "Phải lao động mới có thành quả, không nên ỷ lại", "Chỉ cần chờ người khác cho", "Làm ít cũng được hưởng nhiều", "Không có thành quả nào đến từ sự lười biếng."],
    ["Em rất thích vẽ nhưng phải học bài xong mới được vẽ. Em nên làm gì?", "Hoàn thành bài học, việc lao động được giao rồi mới vẽ", "Bỏ học, cứ vẽ luôn", "Giấu vở bài tập đi", "Biết sắp xếp: hoàn thành nhiệm vụ trước, giải trí sau."],
    ["Trồng cây, chăm sóc cây ở trường giúp em hiểu điều gì?", "Giá trị của lao động: cây lớn lên nhờ công chăm sóc mỗi ngày", "Cây tự lớn, không cần ai chăm", "Lao động là việc của người lớn", "Qua lao động, em trân trọng thành quả hơn."],
    ["Việc nhà nào phù hợp với học sinh lớp 4?", "Quét nhà, lau bàn, tưới cây, gấp quần áo của mình", "Sửa điện trong nhà", "Lái xe chở em đi học", "Chỉ làm những việc vừa sức, an toàn cho lứa tuổi."]
  ], [["Trực nhật", "Lớp học sạch đẹp"], ["Chăm sóc cây", "Cây lớn, ra hoa"], ["Giúp việc nhà", "Gia đình ngăn nắp"], ["Lao động", "Vinh quang"]], "Nối cho đúng nhé!"),
  topic("dd4-taisan", "🎒", "Tôn trọng tài sản của người khác", "Bài 4 • Không tự ý lấy, dùng đồ của người khác; giữ gìn và trả lại", [
    ["Em muốn mượn thước của bạn. Việc làm đúng là gì?", "Hỏi mượn lịch sự, dùng cẩn thận và trả lại đúng hẹn", "Tự lấy dùng rồi để đâu cũng được", "Lấy dùng luôn không cần nói", "Tôn trọng tài sản của người khác bắt đầu từ việc xin phép."],
    ["Em nhặt được một chiếc bút máy đẹp của bạn lớp khác đánh rơi. Em nên làm gì?", "Nộp cho thầy cô hoặc gửi trả lại cho bạn đánh rơi", "Cất làm của riêng", "Giấu đi không cho ai biết", "“Nhặt được của rơi, trả người đánh mất” là việc làm đáng khen."],
    ["Khi mượn sách của bạn, em vô tình làm rách một trang. Em nên làm gì?", "Xin lỗi bạn, dán lại cẩn thận và nói thật với bạn", "Giấu đi, giả vờ không biết", "Đổ lỗi cho bạn khác", "Trung thực và có trách nhiệm khi làm hỏng đồ mượn."],
    ["Bạn cho em mượn đồ chơi nhưng dặn không được cho người khác mượn tiếp. Em nên làm gì?", "Tôn trọng lời dặn của bạn", "Cho bạn khác mượn luôn", "Mang đi khoe khắp xóm", "Đã nhận điều kiện khi mượn thì phải giữ lời."],
    ["Hành động nào là KHÔNG tôn trọng tài sản của người khác?", "Tự ý mở cặp của bạn để xem đồ", "Hỏi mượn bút khi quên mang", "Trả lại đồ đúng hẹn", "Đồ đạc của người khác là riêng tư, không tự ý động vào."],
    ["Em làm mất quyển truyện mượn của thư viện. Việc đúng là gì?", "Báo cho thủ thư, xin đền hoặc mua lại theo quy định", "Giấu chuyện đó, không nói với ai", "Nói là mình không hề mượn", "Chịu trách nhiệm về tài sản đã mượn là biểu hiện của sự trung thực."],
    ["Thấy bạn lấy trộm đồ của bạn khác, em nên làm gì?", "Khuyên bạn trả lại và nếu bạn không nghe, báo với thầy cô", "Xin chia phần với bạn", "Che giấu giúp bạn", "Không bao giờ lấy tài sản của người khác khi chưa được phép."],
    ["Vì sao không nên tự ý dùng điện thoại, máy tính của người khác?", "Vì đó là tài sản và không gian riêng tư của họ", "Vì điện thoại của người khác xấu", "Vì dùng sẽ hết pin ngay", "Xin phép trước khi dùng là phép lịch sự và tôn trọng."],
    ["Bạn đến nhà em chơi, tự ý mở tủ lạnh lấy đồ ăn. Em cảm thấy thế nào và nên nói gì?", "Nhắc nhẹ nhàng: lần sau bạn cứ hỏi mình trước nhé", "Giận dữ, đuổi bạn về ngay", "Không nói gì nhưng nghỉ chơi với bạn", "Góp ý lịch sự giúp bạn hiểu phép tôn trọng tài sản."],
    ["Câu nào thể hiện tôn trọng tài sản của người khác?", "“Cậu cho tớ mượn quyển truyện này đến ngày mai nhé, tớ sẽ giữ gìn cẩn thận”", "“Tớ lấy luôn cái bút này nhé”", "“Đồ của cậu cũng như của tớ thôi”", "Xin phép, giữ gìn, trả đúng hẹn — ba điều cần nhớ khi mượn đồ."],
    ["Em được bạn cho mượn áo mưa lúc trời mưa. Sau cơn mưa, em nên làm gì?", "Phơi khô, gấp gọn và trả lại bạn kèm lời cảm ơn", "Để áo ướt trong cặp nhiều ngày", "Cho bạn khác mượn tiếp", "Trả đồ trong tình trạng tốt là tôn trọng người cho mượn."],
    ["Tài sản của người khác bị em làm hỏng mà không ai biết. Việc làm đáng khen là gì?", "Tự giác nhận lỗi và tìm cách sửa chữa, đền bù", "Im lặng như không có chuyện gì", "Đổ lỗi cho một bạn khác", "Trung thực nhận lỗi mới là dũng cảm và đáng tin cậy."]
  ], [["Mượn đồ", "Xin phép, trả đúng hẹn"], ["Nhặt được của rơi", "Trả người đánh mất"], ["Làm hỏng đồ mượn", "Xin lỗi, đền bù"], ["Đồ của người khác", "Không tự ý dùng"]], "Nối cho đúng nhé!"),
  topic("dd4-cuacong", "🏫", "Bảo vệ của công", "Bài 5 • Giữ gìn tài sản công cộng: trường lớp, công viên, đường phố", [
    ["“Của công” là gì?", "Tài sản chung của mọi người như trường học, công viên, đường phố, bệnh viện...", "Đồ đạc riêng của gia đình em", "Tiền trong túi của em", "Của công do Nhà nước và nhân dân cùng xây dựng, quản lí cho mọi người dùng chung."],
    ["Việc làm nào bảo vệ của công ở trường?", "Giữ gìn bàn ghế, không vẽ bậy lên tường, tắt điện khi ra khỏi lớp", "Khắc tên lên bàn học", "Bẻ khóa cửa lớp cho vui", "Trường học là tài sản chung của thầy trò."],
    ["Em thấy một bạn đang viết, vẽ bậy lên tường công viên. Em nên làm gì?", "Nhắc bạn dừng lại vì đó là phá hoại của công", "Vẽ cùng bạn cho vui", "Đứng cổ vũ", "Nhắc nhở bạn chính là góp phần bảo vệ của công."],
    ["Vì sao cần bảo vệ của công?", "Vì của công phục vụ mọi người; hư hỏng sẽ gây lãng phí và thiếu thốn cho cộng đồng", "Vì sợ bị phạt mà thôi", "Vì người lớn hay kiểm tra", "Giữ gìn của công là trách nhiệm của mỗi công dân nhỏ tuổi."],
    ["Hành động nào phá hoại của công?", "Bẻ gãy cây xanh ven đường, đập phá ghế đá công viên", "Nhặt rác bỏ vào thùng", "Báo cho chú bảo vệ khi thấy đèn đường hỏng", "Phá hoại của công vừa lãng phí vừa là hành vi sai trái."],
    ["Ghế đá, đèn đường, biển báo giao thông là của ai?", "Là tài sản công cộng, của chung mọi người", "Của riêng người sống gần đó", "Không của ai, muốn làm gì cũng được", "Đồ vật công cộng là để phục vụ chung, ai cũng phải giữ gìn."],
    ["Em thấy vòi nước công cộng bị rò rỉ, chảy liên tục. Em nên làm gì?", "Báo cho người lớn hoặc người quản lí để sửa chữa, khóa vòi nếu có thể", "Mặc kệ, nước chảy không phải việc của mình", "Mở thêm cho chảy mạnh", "Tiết kiệm nước cũng là bảo vệ tài nguyên chung."],
    ["Trong thư viện, hành vi nào là bảo vệ sách — của chung của trường?", "Đọc sách nhẹ nhàng, không gấp trang, viết vẽ lên sách", "Xé trang sách mình thích mang về", "Để sách ẩm ướt, nhàu nát", "Sách thư viện là của chung, nhiều bạn cùng đọc."],
    ["Cây xanh trồng ven đường có tác dụng gì và cần được làm gì?", "Cho bóng mát, làm sạch không khí — cần được chăm sóc, bảo vệ", "Chặt đi cho quang đường", "Bẻ cành lá chơi cho vui", "Cây xanh công cộng là “lá phổi” của khu phố."],
    ["Khi sử dụng nhà vệ sinh công cộng, em nên làm gì?", "Dùng xong xả nước, giữ sạch sẽ cho người dùng sau", "Vứt rác bừa bãi trong nhà vệ sinh", "Vẽ bậy lên tường", "Giữ vệ sinh chung là nếp sống văn minh."],
    ["Câu nói nào thể hiện ý thức bảo vệ của công?", "“Của chung là của mình, mình phải giữ gìn như ở nhà”", "“Của công hư thì có Nhà nước lo”", "“Ai giữ thì giữ, mình không quan tâm”", "Có ý thức “của chung như của mình” là biểu hiện tốt nhất."],
    ["Em thấy đèn tín hiệu giao thông ở cổng trường bị hỏng. Việc làm đúng là gì?", "Báo cho thầy cô hoặc chú công an để kịp thời sửa chữa", "Mặc kệ, đi đường khác", "Tự trèo lên sửa đèn", "Việc sửa chữa là của người có trách nhiệm; em chỉ cần báo tin kịp thời."]
  ], [["Bàn ghế, tường lớp", "Giữ gìn, không vẽ bậy"], ["Cây xanh ven đường", "Bảo vệ, chăm sóc"], ["Sách thư viện", "Đọc nhẹ nhàng, trả đúng hạn"], ["Đèn đường hỏng", "Báo người quản lí"]], "Nối cho đúng nhé!"),
  topic("dd4-banbe", "👫", "Thiết lập và duy trì quan hệ bạn bè", "Bài 6–7 • Kết bạn, giữ gìn tình bạn, giải quyết bất đồng", [
    ["Muốn kết bạn với một bạn mới, em nên làm gì?", "Chủ động chào hỏi, giới thiệu bản thân và rủ bạn cùng học, cùng chơi", "Chờ bạn đến làm quen trước", "Chỉ chơi với bạn quen từ trước", "Sự thân thiện, cởi mở là chìa khoá để kết bạn."],
    ["Điều gì giúp tình bạn bền chặt?", "Quan tâm, giúp đỡ, trung thực và giữ lời hứa với bạn", "Chỉ chơi với bạn khi cần nhờ vả", "Hay nói xấu bạn sau lưng", "Tình bạn đẹp được nuôi dưỡng bằng sự chân thành."],
    ["Hai bạn trong nhóm bất đồng ý kiến và tranh cãi gay gắt. Em nên làm gì?", "Lắng nghe cả hai phía, cùng tìm cách giải quyết hoà bình", "Đứng về một phía và cãi to hơn", "Khích bác để hai bạn cãi nhau tiếp", "Bất đồng nên được giải quyết bằng lắng nghe và tôn trọng."],
    ["Bạn thân của em bị điểm kém và rất buồn. Em nên làm gì?", "Động viên bạn, cùng bạn ôn lại bài", "Chê cười bạn trước lớp", "Nghỉ chơi với bạn", "Chia sẻ lúc bạn buồn mới là bạn tốt thật sự."],
    ["Em hứa sẽ đến nhà bạn cùng học nhóm nhưng trời mưa to. Việc giữ lời hứa tốt nhất là gì?", "Nhắn tin/báo cho bạn biết và hẹn lại buổi khác rõ ràng", "Không đến và cũng không nói gì", "Đổ lỗi cho bạn khác", "Nếu không thực hiện được lời hứa, cần báo trước và xin lỗi bạn."],
    ["Hành động nào có thể làm mất lòng tin của bạn bè?", "Nói xấu sau lưng, thất hứa, giấu giếm điều quan trọng", "Giúp bạn khi bạn khó khăn", "Khen ngợi thành tích của bạn", "Mất lòng tin thì tình bạn rất khó bền lâu."],
    ["Bạn rủ em nói dối cô giáo để che lỗi cho bạn. Em nên làm gì?", "Từ chối, khuyên bạn nhận lỗi thật thà", "Đồng ý vì sợ mất bạn", "Nói dối thật khéo để không ai biết", "Bạn tốt không rủ nhau làm điều sai trái."],
    ["Khi bạn đạt thành tích cao hơn em, thái độ đúng là gì?", "Chúc mừng và học hỏi bạn", "Ghen tị, nói xấu bạn", "Không chơi với bạn nữa", "Vui với niềm vui của bạn là phẩm chất đẹp."],
    ["Em vô tình làm bạn buồn vì một câu nói đùa quá trớn. Em nên làm gì?", "Xin lỗi bạn chân thành và rút kinh nghiệm", "Cho rằng bạn quá nhạy cảm, kệ bạn", "Đùa thêm cho bạn tức", "Lời xin lỗi kịp thời giúp giữ gìn tình bạn."],
    ["Để duy trì quan hệ với bạn ở xa (chuyển trường), em có thể làm gì?", "Viết thư, nhắn tin hỏi thăm, kể chuyện học tập cho nhau", "Quên hẳn bạn cũ", "Chỉ nhớ bạn khi cần giúp đỡ", "Khoảng cách xa không làm mất tình bạn nếu ta biết quan tâm."],
    ["Nhóm bạn lập “phe” để tẩy chay một bạn trong lớp. Em nên làm gì?", "Không tham gia, rủ bạn bị tẩy chay chơi cùng và báo thầy cô nếu cần", "Tham gia cho khỏi bị tẩy chay theo", "Đứng ngoài xem cho vui", "Tẩy chay bạn là hành vi sai trái, gây tổn thương cho bạn."],
    ["Câu nói nào thể hiện tình bạn đẹp?", "“Bạn buồn, tớ ở đây với bạn; bạn cần gì cứ nói nhé”", "“Việc của bạn, tớ không quan tâm”", "“Tớ chỉ chơi với bạn giỏi nhất lớp thôi”", "Bạn bè là để sẻ chia cả niềm vui và nỗi buồn."]
  ], [["Kết bạn", "Chủ động, thân thiện"], ["Giữ tình bạn", "Trung thực, giữ lời hứa"], ["Bạn gặp khó khăn", "Động viên, giúp đỡ"], ["Bất đồng với bạn", "Lắng nghe, hoà giải"]], "Nối cho đúng nhé!"),
  topic("dd4-tien", "💰", "Quý trọng đồng tiền", "Bài 8 • Tiền do lao động làm ra; chi tiêu hợp lí, tiết kiệm", [
    ["Đồng tiền mà bố mẹ có được đến từ đâu?", "Từ sức lao động vất vả của bố mẹ", "Từ cây tiền mọc trong vườn", "Từ việc nhặt được ngoài đường", "Hiểu tiền đến từ lao động giúp em trân trọng và không lãng phí."],
    ["Chi tiêu hợp lí là chi tiêu như thế nào?", "Mua những thứ cần thiết trước, vừa với số tiền mình có", "Thích gì mua nấy cho bằng bạn bè", "Mua đồ chơi mới mỗi ngày", "“Cần” và “muốn” khác nhau: hãy ưu tiên thứ thật sự cần."],
    ["Em được mừng tuổi 200 000 đồng dịp Tết. Cách dùng tiền tốt nhất là gì?", "Để dành phần lớn vào lợn đất/tiết kiệm, chi một phần nhỏ cho sách vở cần thiết", "Tiêu hết ngay vào đồ chơi trong một ngày", "Cho bạn bè tiêu hộ", "Tiết kiệm từ nhỏ rèn thói quen quý trọng đồng tiền."],
    ["Vì sao cần tiết kiệm tiền?", "Để dành cho những việc cần thiết sau này và phòng khi khó khăn", "Để khoe với bạn bè", "Tiết kiệm là keo kiệt", "Tiết kiệm khác với keo kiệt: tiết kiệm là dùng tiền đúng chỗ, đúng lúc."],
    ["Em thấy một món đồ chơi rất thích nhưng trong cặp còn nhiều đồ chơi giống vậy. Em nên làm gì?", "Suy nghĩ kĩ: chưa cần mua ngay, để tiền cho việc cần hơn", "Đòi bố mẹ mua bằng được", "Khóc cho đến khi được mua", "Học cách phân biệt “cần” và “muốn” giúp chi tiêu hợp lí."],
    ["Hành động nào là lãng phí tiền bạc?", "Mua nhiều đồ ăn vặt rồi bỏ dở, vứt đi", "Mua sách truyện để đọc", "Để dành tiền mua quà sinh nhật cho mẹ", "Lãng phí là tiêu tiền vào thứ không dùng đến hoặc bỏ phí."],
    ["Bạn em hay khoe tiền và tiêu xài hoang phí. Em nên khuyên bạn thế nào?", "Tiền là mồ hôi công sức của bố mẹ, nên tiêu tiết kiệm và đúng việc", "Khen bạn giàu có cho bạn vui", "Xin bạn cho tiền tiêu chung", "Góp ý chân thành là giúp bạn tốt lên."],
    ["Em nhặt được tiền rơi trong lớp. Việc đúng là gì?", "Trả lại người mất hoặc nộp cho thầy cô", "Cất vào túi, coi như tiền của mình", "Tiêu luôn vào quà vặt", "Tiền không phải của mình thì không được tiêu."],
    ["Để mua được chiếc xe đạp yêu thích, em có thể làm gì?", "Lập kế hoạch tiết kiệm dần từ tiền tiêu vặt và tiền mừng tuổi", "Đòi bố mẹ mua ngay dù gia đình còn khó khăn", "Không làm gì, chờ may mắn", "Kế hoạch tiết kiệm giúp em đạt mục tiêu và biết quý trọng thành quả."],
    ["Câu tục ngữ nào khuyên về tiết kiệm?", "“Tích tiểu thành đại” / “Buôn tàu bán bè không bằng ăn dè hà tiện”", "“Tiền vào như nước” (nói về sự giàu có)", "“Có tiền mua tiên cũng được”", "Để dành từng ít một, lâu ngày sẽ thành khoản lớn."],
    ["Em làm vỡ chiếc cốc ở cửa hàng khi đi mua sắm cùng mẹ. Việc đúng là gì?", "Nói thật với mẹ và chủ cửa hàng, xin lỗi và đền theo quy định", "Lẳng lặng bỏ đi", "Giấu chiếc cốc vỡ vào góc", "Trung thực và chịu trách nhiệm là đức tính quý hơn tiền bạc."],
    ["Quý trọng đồng tiền còn thể hiện ở điều gì?", "Giữ tiền cẩn thận, không để rơi mất; dùng tiền đúng mục đích", "Tiêu tiền càng nhanh càng sang", "Cho bạn mượn tiền không cần trả", "Tiền là thành quả lao động của nhiều người, phải nâng niu."]
  ], [["Tiền mừng tuổi", "Tiết kiệm một phần"], ["Thứ cần thiết", "Ưu tiên mua trước"], ["Lãng phí", "Mua rồi bỏ phí"], ["Tích tiểu thành đại", "Tiết kiệm dần sẽ nhiều"]], "Nối cho đúng nhé!"),
  topic("dd4-quyen", "🧒", "Quyền và bổn phận của trẻ em", "Bài 9 • Phân biệt quyền được hưởng và bổn phận phải làm của trẻ em", [
    ["Điều nào là QUYỀN của trẻ em?", "Được học tập, vui chơi và được chăm sóc sức khoẻ", "Phải quét nhà giúp bố mẹ", "Phải tôn trọng thầy cô", "Quyền là những điều trẻ em được hưởng theo pháp luật."],
    ["Điều nào là BỔN PHẬN của trẻ em?", "Kính trọng ông bà, cha mẹ; chăm chỉ học tập", "Được đi học", "Được vui chơi giải trí", "Bổn phận là những việc trẻ em cần làm đối với gia đình, nhà trường và xã hội."],
    ["Trẻ em có quyền được khai sinh và có họ tên, quốc tịch — điều đó thuộc nhóm quyền nào?", "Quyền được sống và được bảo vệ danh tính", "Quyền được tham gia", "Không phải quyền của trẻ em", "Mọi trẻ em sinh ra đều được đăng kí khai sinh."],
    ["Khi bị bạn bắt nạt nhiều lần, em có quyền làm gì?", "Được bảo vệ: báo với thầy cô, cha mẹ để được giúp đỡ", "Phải im lặng chịu đựng", "Tự đánh lại bạn cho hả giận", "Trẻ em có quyền được bảo vệ khỏi bạo lực và bắt nạt."],
    ["Bổn phận của trẻ em đối với chính bản thân mình là gì?", "Tự chăm sóc, bảo vệ bản thân, rèn luyện thân thể, giữ gìn vệ sinh", "Không cần làm gì cho bản thân", "Chỉ lo chơi mà thôi", "Biết tự chăm sóc mình cũng là một bổn phận quan trọng."],
    ["Trẻ em có quyền bày tỏ ý kiến của mình trong các việc liên quan đến trẻ em. Điều đó có nghĩa là gì?", "Em được nói lên suy nghĩ của mình và được người lớn lắng nghe, tôn trọng", "Em muốn làm gì cũng được, không ai được góp ý", "Em không cần nghe lời ai nữa", "Quyền bày tỏ ý kiến đi cùng với thái độ lễ phép, đúng mực."],
    ["Việc làm nào thực hiện đúng bổn phận với nhà trường?", "Chăm chỉ học tập, giữ gìn trường lớp, tôn trọng thầy cô", "Được đến trường vui chơi là chính", "Được nhận phần thưởng cuối năm", "Được học tập là quyền; học tập chăm chỉ là bổn phận."],
    ["Trẻ em được sống chung với cha mẹ, được gia đình chăm sóc — đó là quyền gì?", "Quyền được chăm sóc, nuôi dưỡng trong gia đình", "Bổn phận của trẻ em", "Quyền được tham gia biểu diễn", "Gia đình là nơi trẻ em được yêu thương và chăm sóc đầu tiên."],
    ["Nếu một người lạ rủ em đi theo và cho quà, em nên làm gì theo quyền được bảo vệ?", "Từ chối, tránh xa và báo ngay cho người lớn tin cậy", "Đi theo vì có quà", "Giữ bí mật, không kể với ai", "Trẻ em có quyền được bảo vệ khỏi bị dụ dỗ, xâm hại; hãy báo người lớn ngay."],
    ["Bổn phận của trẻ em đối với cộng đồng, xã hội là gì?", "Tôn trọng pháp luật, giữ gìn trật tự và bảo vệ môi trường, của công", "Được vui chơi ở công viên", "Được người lớn nhường nhịn mọi việc", "Sống có bổn phận giúp em trở thành công dân tốt."],
    ["Em được quyền vui chơi, giải trí. Để thực hiện quyền đó đúng cách, em cần lưu ý điều gì?", "Vui chơi lành mạnh, an toàn và không quên nhiệm vụ học tập", "Chơi suốt ngày, bỏ học", "Chơi những trò nguy hiểm cho hả hê", "Quyền vui chơi đi đôi với bổn phận học tập và an toàn của bản thân."],
    ["Câu nói nào thể hiện em hiểu đúng về quyền và bổn phận?", "“Em được đi học (quyền) nên em phải học chăm chỉ (bổn phận)”", "“Trẻ em chỉ có quyền, không có bổn phận”", "“Bổn phận là việc của người lớn”", "Quyền và bổn phận luôn đi cùng nhau."]
  ], [["Được học tập", "Quyền của trẻ em"], ["Chăm chỉ học hành", "Bổn phận của trẻ em"], ["Được bảo vệ", "Quyền của trẻ em"], ["Kính trọng ông bà, cha mẹ", "Bổn phận của trẻ em"]], "Nối ý với nhóm đúng nhé!")
];
/* ================= TIN HỌC 4 ================= */
var TIN4_TOPICS = [
  topic("tin4-maytin", "🖥️", "Máy tính và em: phần cứng, phần mềm, gõ bàn phím", "Bài 1–2 • Phân loại phần cứng và phần mềm; gõ bàn phím đúng cách", [
    ["Bộ phận nào của máy tính dùng để hiển thị hình ảnh, chữ viết?", "Màn hình", "Bàn phím", "Con chuột", "Màn hình là thiết bị xuất thông tin của máy tính."],
    ["Thân máy (case) chứa bộ phận quan trọng nào?", "Bộ xử lí trung tâm (CPU) — “bộ não” của máy tính", "Màn hình", "Loa", "CPU xử lí mọi thông tin trong máy tính."],
    ["Phần cứng của máy tính là gì?", "Các bộ phận vật lí mà em có thể chạm vào: màn hình, bàn phím, chuột, thân máy...", "Các chương trình chạy trong máy", "Các trò chơi điện tử", "Phần cứng là phần “cứng” nhìn thấy, sờ thấy được."],
    ["Phần mềm của máy tính là gì?", "Các chương trình giúp máy tính hoạt động và làm việc theo yêu cầu", "Các linh kiện điện tử", "Vỏ máy tính", "Ví dụ phần mềm: phần mềm học tập, soạn thảo, trình duyệt web..."],
    ["Thiết bị nào là thiết bị NHẬP thông tin vào máy tính?", "Bàn phím và con chuột", "Màn hình và loa", "Máy in", "Bàn phím, chuột giúp đưa thông tin, lệnh vào máy."],
    ["Thiết bị nào là thiết bị XUẤT thông tin ra ngoài?", "Màn hình, loa, máy in", "Bàn phím", "Con chuột", "Thông tin sau khi xử lí được xuất ra màn hình, loa, giấy in."],
    ["Khi gõ bàn phím, hai ngón tay trỏ đặt lên hai phím nào có gờ (gai) nhỏ?", "Phím F và phím J", "Phím A và phím L", "Phím cách và phím Enter", "Gờ trên phím F và J giúp em định vị tay mà không cần nhìn bàn phím."],
    ["Hàng phím cơ sở gồm những phím nào?", "A S D F G H J K L", "Q W E R T Y U I O", "Z X C V B N M", "Khi bắt đầu gõ, các ngón tay đặt lên hàng phím cơ sở."],
    ["Ngón tay nào dùng để gõ phím cách (Space)?", "Hai ngón tay cái", "Hai ngón trỏ", "Ngón út", "Phím cách dài nhất ở hàng dưới cùng, gõ bằng ngón cái."],
    ["Tư thế ngồi gõ bàn phím đúng là thế nào?", "Ngồi thẳng lưng, mắt nhìn màn hình, tay đặt nhẹ trên hàng phím cơ sở", "Nằm bò ra bàn mà gõ", "Ngồi cong lưng, mặt sát màn hình", "Tư thế đúng giúp em gõ nhanh và không mỏi, không hại mắt."],
    ["Phần mềm nào là phần mềm TRÒ CHƠI học tập?", "Các chương trình vừa chơi vừa học trên máy tính", "Phần mềm diệt virus", "Hệ điều hành", "Mọi chương trình chạy trên máy đều là phần mềm, kể cả trò chơi."],
    ["Máy in dùng để làm gì?", "In thông tin từ máy tính ra giấy", "Nhập chữ vào máy tính", "Phát ra âm thanh", "Máy in là thiết bị xuất thông tin."]
  ], [["Màn hình", "Thiết bị xuất"], ["Bàn phím", "Thiết bị nhập"], ["CPU", "Bộ xử lí của máy tính"], ["Hàng phím cơ sở", "A S D F G H J K L"]], "Nối thiết bị với ý đúng nhé!"),
  topic("tin4-web", "🌐", "Thông tin trên trang web", "Bài 3 • Trang web, trình duyệt, siêu liên kết; chọn lọc thông tin", [
    ["Trang web là gì?", "Trang chứa thông tin (chữ, hình ảnh, âm thanh, video) trên Internet", "Một tờ giấy trong sách", "Một chương trình vẽ tranh", "Nhiều trang web liên kết với nhau tạo thành một website."],
    ["Để xem các trang web, em cần dùng phần mềm nào?", "Trình duyệt web", "Phần mềm vẽ tranh", "Phần mềm luyện gõ", "Ví dụ trình duyệt: Cốc Cốc, Chrome, Edge, Firefox..."],
    ["Mỗi trang web có một địa chỉ riêng gọi là gì?", "Địa chỉ trang web (đường dẫn/link)", "Số điện thoại", "Số nhà", "Gõ đúng địa chỉ vào thanh địa chỉ để mở trang web."],
    ["Siêu liên kết (liên kết) trên trang web thường có đặc điểm gì?", "Là chữ hoặc hình mà khi nháy chuột vào sẽ mở ra trang thông tin khác", "Là dòng chữ in đậm bình thường", "Là hình trang trí không bấm được", "Nhờ siêu liên kết, em chuyển từ trang này sang trang khác dễ dàng."],
    ["Thông tin trên Internet có phải lúc nào cũng đúng không?", "Không. Cần chọn lọc, kiểm tra từ nguồn tin cậy", "Luôn luôn đúng tuyệt đối", "Sai hết, không dùng được gì", "Hãy ưu tiên trang web của trường học, nhà xuất bản, cơ quan uy tín."],
    ["Trang web nào phù hợp và an toàn cho học sinh tiểu học?", "Trang web học tập dành cho trẻ em, có sự hướng dẫn của thầy cô, cha mẹ", "Trang web có nhiều quảng cáo độc hại", "Trang web yêu cầu cung cấp mật khẩu", "Luôn hỏi người lớn khi gặp trang web lạ."],
    ["Khi đọc thông tin trên web phục vụ học tập, em nên làm gì?", "Ghi lại ý chính, so sánh với sách giáo khoa", "Sao chép tất cả mà không đọc", "Chỉ xem hình, không đọc chữ", "Thông tin trên web hỗ trợ cho việc học, không thay thế sách vở."],
    ["Điều nào em TUYỆT ĐỐI không làm trên Internet?", "Cung cấp tên thật, địa chỉ nhà, trường lớp, mật khẩu cho người lạ", "Xem bài giảng của thầy cô", "Đọc truyện trên trang web thiếu nhi", "Bảo vệ thông tin cá nhân là nguyên tắc an toàn quan trọng nhất."],
    ["Nếu một trang web hiện quảng cáo lạ, yêu cầu bấm vào để “nhận quà”, em nên làm gì?", "Không bấm vào, đóng trang và báo cho người lớn", "Bấm ngay để nhận quà", "Nhập số điện thoại để nhận quà", "Quảng cáo lừa đảo rất phổ biến; tuyệt đối không làm theo."],
    ["Video, bài hát trên trang web thuộc loại thông tin nào?", "Thông tin đa phương tiện (âm thanh, hình ảnh động)", "Chỉ là thông tin chữ", "Không phải thông tin", "Trang web hiện đại chứa nhiều loại thông tin: chữ, hình, âm thanh, video."],
    ["Muốn quay lại trang web vừa xem trước đó, em dùng nút nào trên trình duyệt?", "Nút Quay lại (mũi tên sang trái)", "Nút Đóng trang (dấu X)", "Nút Tải lại trang", "Trình duyệt có các nút Quay lại, Tiếp theo, Tải lại rất tiện lợi."],
    ["Website của trường học thường đăng những thông tin gì?", "Thông báo, thời khoá biểu, hoạt động của trường", "Tin đồn thất thiệt", "Quảng cáo bán hàng online", "Đọc thông tin từ website chính thức giúp em nắm tin chính xác."]
  ], [["Trình duyệt web", "Phần mềm xem trang web"], ["Siêu liên kết", "Nháy vào để chuyển trang"], ["Địa chỉ trang web", "Đường dẫn riêng của trang"], ["Thông tin cá nhân", "Tuyệt đối giữ kín với người lạ"]], "Nối cho đúng nhé!"),
  topic("tin4-timkiem", "🔍", "Tìm kiếm thông tin và thao tác với tệp, thư mục", "Bài 4–5 • Từ khoá tìm kiếm; tạo, đổi tên, sao chép, xoá tệp và thư mục", [
    ["Khi tìm kiếm thông tin trên Internet, em gõ vào ô tìm kiếm điều gì?", "Từ khoá — những từ quan trọng liên quan đến điều cần tìm", "Cả một bài văn thật dài", "Một dãy số ngẫu nhiên", "Từ khoá ngắn gọn, đúng chủ đề giúp kết quả tìm kiếm chính xác hơn."],
    ["Muốn tìm thông tin về “cách chăm sóc cây hoa hồng”, từ khoá hợp lí là gì?", "“chăm sóc cây hoa hồng”", "“cây”", "“hôm nay trời đẹp”", "Từ khoá càng sát với nội dung cần tìm, kết quả càng đúng ý."],
    ["Tệp (file) là gì?", "Một tập hợp thông tin được lưu trong máy tính, có tên riêng (văn bản, hình ảnh, bài hát...)", "Một cái hộp đựng giấy", "Một bộ phận của bàn phím", "Mỗi tệp có tên và biểu tượng riêng theo loại của nó."],
    ["Thư mục (folder) dùng để làm gì?", "Chứa và sắp xếp các tệp (và thư mục con) cho gọn gàng, dễ tìm", "Phát nhạc", "In tài liệu", "Sắp xếp tệp vào thư mục giống như sắp xếp sách vào từng ngăn kệ."],
    ["Thao tác nào giúp em tạo một thư mục mới?", "Nháy chuột phải vào vùng trống, chọn lệnh Tạo mới (New) → Thư mục (Folder)", "Tắt máy rồi bật lại", "Gõ phím cách nhiều lần", "Đặt tên thư mục rõ ràng, dễ nhớ (ví dụ: “Bài tập Toán”)."],
    ["Khi đặt tên tệp, thư mục, em nên đặt như thế nào?", "Tên ngắn gọn, đúng nội dung để dễ tìm lại", "Tên toàn kí tự lạ, không dấu", "Tất cả đều đặt tên là “Mới”", "Ví dụ: “Bai van ta canh.docx” dễ tìm hơn “Tai lieu 1”."],
    ["Thao tác “sao chép” (Copy) một tệp có nghĩa là gì?", "Tạo thêm một bản giống hệt ở nơi khác, tệp gốc vẫn còn", "Xoá hẳn tệp gốc", "Đổi tên tệp", "Còn “di chuyển” (Cut) là chuyển tệp đi, tệp gốc ở chỗ cũ không còn."],
    ["Khi xoá một tệp, tệp thường được chuyển vào đâu trước khi bị xoá hẳn?", "Thùng rác (Recycle Bin)", "Thư mục Nhạc", "Màn hình nền", "Nhờ có Thùng rác, em có thể khôi phục tệp nếu xoá nhầm."],
    ["Em muốn tìm lại tệp hình ảnh đã lưu tuần trước. Cách làm hợp lí là gì?", "Mở đúng thư mục đã sắp xếp (ví dụ: thư mục “Hình ảnh”) hoặc dùng chức năng tìm kiếm của máy tính", "Mở lần lượt mọi chương trình trong máy", "Hỏi bạn bên cạnh đoán hộ", "Lưu trữ có tổ chức giúp tìm tệp nhanh chóng."],
    ["Vì sao cần sắp xếp tệp vào các thư mục theo chủ đề?", "Để máy tính gọn gàng, tìm kiếm nhanh, tránh nhầm lẫn", "Để máy tính chạy nhanh gấp đôi luôn", "Để không ai nhìn thấy tệp của mình", "Ví dụ: thư mục “Học tập”, “Trò chơi”, “Gia đình”..."],
    ["Kết quả tìm kiếm trên Internet hiện ra rất nhiều trang. Em nên làm gì?", "Đọc tiêu đề, chọn trang tin cậy và phù hợp nhất để mở xem", "Mở trang đầu tiên bất kì và chép ngay", "Đóng máy vì quá nhiều kết quả", "Hãy chọn lọc kết quả, ưu tiên nguồn uy tín."],
    ["Thao tác “đổi tên” (Rename) tệp dùng để làm gì?", "Đặt lại tên mới cho tệp mà không làm mất nội dung", "Xoá nội dung của tệp", "Nhân đôi tệp", "Đổi tên giúp tên tệp phản ánh đúng nội dung bên trong."]
  ], [["Từ khoá", "Từ quan trọng để tìm kiếm"], ["Thư mục", "Chứa, sắp xếp các tệp"], ["Sao chép (Copy)", "Thêm một bản, gốc vẫn còn"], ["Thùng rác", "Nơi tệp bị xoá tạm vào"]], "Nối khái niệm với ý đúng nhé!"),
  topic("tin4-banquyen", "⚖️", "Sử dụng phần mềm khi được phép — bản quyền", "Bài 6 • Tôn trọng bản quyền phần mềm, tình huống ứng xử trong môi trường số", [
    ["“Sử dụng phần mềm khi được phép” nghĩa là gì?", "Chỉ cài đặt và dùng phần mềm khi được chủ sở hữu cho phép (mua bản quyền hoặc phần mềm miễn phí hợp pháp)", "Muốn dùng phần mềm nào cũng được, không cần ai cho phép", "Chỉ cần bạn bè cho phép là đủ", "Phần mềm là sản phẩm trí tuệ của người làm ra nó."],
    ["Bạn rủ em cài một trò chơi “bẻ khoá” (crack) để chơi miễn phí. Em nên làm gì?", "Từ chối — dùng phần mềm không được phép là vi phạm bản quyền, còn dễ nhiễm virus", "Đồng ý ngay cho vui", "Rủ thêm nhiều bạn cùng cài", "Phần mềm lậu thường kèm mã độc hại cho máy tính."],
    ["Phần mềm miễn phí hợp pháp khác phần mềm lậu ở điểm nào?", "Được chính tác giả/nhà phát hành cho phép dùng miễn phí", "Chất lượng luôn kém hơn", "Không cần cài đặt", "Nhiều phần mềm học tập tốt được phát hành miễn phí đúng luật."],
    ["Hành vi nào tôn trọng bản quyền?", "Mua hoặc dùng phần mềm theo đúng giấy phép; ghi nguồn khi dùng hình ảnh, bài viết của người khác", "Sao chép sách, phần mềm bán lén", "Nhận sản phẩm của người khác là của mình", "Tôn trọng bản quyền là tôn trọng công sức của người sáng tạo."],
    ["Khi em dùng một bức tranh trên mạng để làm bài trình chiếu, việc làm đúng là gì?", "Ghi rõ nguồn của bức tranh và chỉ dùng cho mục đích học tập", "Nhận là tranh do em tự vẽ", "Xoá tên tác giả đi", "Ghi nguồn là phép lịch sự học thuật tối thiểu."],
    ["Vì sao không nên chia sẻ mật khẩu tài khoản của mình cho bạn bè?", "Mật khẩu là thông tin bí mật cá nhân; lộ mật khẩu có thể bị kẻ xấu lợi dụng", "Vì mật khẩu quá dài", "Vì bạn sẽ quên mật khẩu", "Chỉ dùng mật khẩu trên máy và trang web tin cậy."],
    ["Em nhận được tin nhắn lạ yêu cầu bấm vào liên kết để “nhận thưởng”. Em nên làm gì?", "Không bấm, xoá tin nhắn và báo người lớn", "Bấm ngay xem có gì", "Chuyển tiếp cho nhiều bạn", "Đây là chiêu lừa đảo phổ biến trên mạng."],
    ["Khi chơi trò chơi trực tuyến, hành vi nào là văn minh?", "Nói năng lịch sự, không chửi bậy, không lừa đảo bạn chơi", "Dùng từ ngữ thô tục cho “ngầu”", "Hack trò chơi để thắng nhanh", "Văn hoá trên mạng cũng quan trọng như ngoài đời thật."],
    ["Sao chép bài làm của bạn rồi nộp như bài của mình là hành vi thế nào?", "Sai trái, thiếu trung thực, không tôn trọng công sức của bạn", "Thông minh, nhanh gọn", "Bình thường, ai cũng làm vậy", "Trong môi trường số cũng vậy: không sao chép sản phẩm của người khác làm của mình."],
    ["Phần mềm diệt virus có tác dụng gì?", "Bảo vệ máy tính khỏi các chương trình độc hại (virus)", "Giúp máy tính chơi game nhanh hơn", "Tạo ra virus", "Chỉ cài phần mềm từ nguồn tin cậy để tránh virus."],
    ["Khi muốn dùng một phần mềm mới, em nên làm gì trước?", "Hỏi thầy cô, cha mẹ và kiểm tra phần mềm có được phép, có an toàn không", "Tự cài ngay mọi phần mềm thấy hay", "Cài càng nhiều phần mềm càng tốt", "Người lớn giúp em chọn phần mềm phù hợp, an toàn."],
    ["“Bản quyền” là gì?", "Quyền của tác giả đối với sản phẩm do mình sáng tạo ra (sách, nhạc, phần mềm...)", "Quyền được sao chép mọi thứ", "Một loại giấy phép lái xe", "Pháp luật bảo vệ quyền của người sáng tạo."]
  ], [["Bản quyền", "Quyền của tác giả"], ["Phần mềm lậu", "Dùng không được phép"], ["Mật khẩu", "Giữ bí mật tuyệt đối"], ["Ghi nguồn", "Tôn trọng tác giả"]], "Nối cho đúng nhé!"),
  topic("tin4-ungdung", "📊", "Ứng dụng tin học: bài trình chiếu và soạn thảo văn bản", "Bài 7–12 • Tạo trình chiếu, định dạng, hiệu ứng; soạn thảo và chỉnh sửa văn bản; đa phương tiện", [
    ["Bài trình chiếu là gì?", "Tập hợp nhiều trang chiếu (slide) gồm chữ, hình ảnh... để trình bày một nội dung", "Một bức tranh đơn lẻ", "Một trò chơi điện tử", "Ví dụ phần mềm trình chiếu: PowerPoint."],
    ["Một trang chiếu (slide) thường gồm những thành phần nào?", "Tiêu đề và nội dung (chữ, hình ảnh, bảng...)", "Chỉ có một màu nền", "Chỉ có duy nhất một chữ", "Tiêu đề nằm ở phía trên của trang chiếu."],
    ["Định dạng văn bản trên trang chiếu là làm những việc gì?", "Chọn phông chữ, cỡ chữ, màu chữ, in đậm, in nghiêng...", "Xoá toàn bộ văn bản", "Đổi tên tệp", "Định dạng hợp lí giúp trang chiếu rõ ràng, đẹp mắt."],
    ["Hiệu ứng chuyển trang có tác dụng gì?", "Tạo cách xuất hiện sinh động khi chuyển từ trang chiếu này sang trang chiếu khác", "Xoá nội dung trang chiếu", "In bài trình chiếu ra giấy", "Không nên lạm dụng quá nhiều hiệu ứng gây rối mắt."],
    ["Phần mềm soạn thảo văn bản dùng để làm gì?", "Gõ, chỉnh sửa và trình bày văn bản (như bài văn, đơn, thư...)", "Vẽ tranh chuyên nghiệp", "Nghe nhạc", "Ví dụ phần mềm soạn thảo: Word."],
    ["Khi soạn thảo, muốn sửa một chữ viết sai, em làm gì?", "Đưa con trỏ đến chỗ sai, xoá chữ sai và gõ lại chữ đúng", "Xoá cả bài và gõ lại từ đầu", "In ra giấy rồi sửa bằng bút", "Chỉnh sửa văn bản trên máy tính rất thuận tiện."],
    ["Thao tác “sao chép” (Copy) và “dán” (Paste) trong soạn thảo giúp em việc gì?", "Nhân bản một đoạn văn bản sang vị trí khác mà không phải gõ lại", "Xoá đoạn văn bản", "Đổi màu chữ", "Cặp thao tác Copy — Paste được dùng rất thường xuyên."],
    ["Để bài trình chiếu sinh động, em có thể chèn thêm gì?", "Hình ảnh, âm thanh, video phù hợp với nội dung (đa phương tiện)", "Càng nhiều chữ càng tốt", "Các quảng cáo lạ", "Đa phương tiện giúp bài trình chiếu hấp dẫn hơn."],
    ["Trước khi trình chiếu trước lớp, em nên làm gì?", "Chạy thử bài trình chiếu, kiểm tra lỗi chính tả và nội dung", "Không cần chuẩn bị gì", "Để đến giờ mới mở lần đầu", "Chuẩn bị kĩ giúp em tự tin khi thuyết trình."],
    ["Phần mềm luyện gõ bàn phím có tác dụng gì?", "Giúp em gõ phím nhanh và đúng cách hơn", "Giúp máy tính chống virus", "Giúp em vẽ tranh đẹp", "Luyện gõ thường xuyên sẽ gõ được mà không cần nhìn bàn phím."],
    ["Khi chèn hình ảnh vào trang chiếu, em cần lưu ý điều gì?", "Hình ảnh phù hợp nội dung, rõ nét, kích thước vừa phải, có nguồn rõ ràng", "Chèn càng nhiều hình càng tốt", "Chèn hình không liên quan gì đến bài", "Hình ảnh hỗ trợ cho nội dung, không thay thế nội dung."],
    ["Sau khi làm xong bài trình chiếu/soạn thảo, thao tác quan trọng không thể quên là gì?", "Lưu (Save) tệp vào đúng thư mục với tên dễ nhớ", "Tắt máy ngay lập tức", "Xoá tệp nháp duy nhất", "Không lưu thì mọi công sức làm bài sẽ mất khi tắt máy."]
  ], [["Trang chiếu (slide)", "Một trang của bài trình chiếu"], ["Định dạng", "Phông, cỡ, màu chữ"], ["Hiệu ứng chuyển trang", "Cách chuyển giữa các slide"], ["Lưu (Save)", "Ghi tệp vào máy"]], "Nối cho đúng nhé!"),
  topic("tin4-laptrinh", "🤖", "Giải quyết vấn đề: lập trình trực quan", "Bài 13–16 • Chơi với máy tính; chương trình là dãy lệnh; tạo chương trình diễn tả ý tưởng", [
    ["Chương trình máy tính là gì?", "Dãy các lệnh được sắp xếp theo thứ tự để máy tính thực hiện và hoàn thành một việc", "Một bức tranh vẽ trên máy", "Danh sách các bạn trong lớp", "Máy tính chỉ làm đúng theo các lệnh trong chương trình."],
    ["Trong môi trường lập trình trực quan, các lệnh thường có dạng gì?", "Các khối lệnh (mảnh ghép) kéo thả và lắp ghép với nhau", "Các câu lệnh phải gõ bằng tiếng Anh dài", "Các con số bí mật", "Kéo thả khối lệnh giúp em làm quen với lập trình dễ dàng."],
    ["Để nhân vật di chuyển, em dùng nhóm lệnh nào?", "Nhóm lệnh chuyển động (đi, quay...)", "Nhóm lệnh âm thanh", "Nhóm lệnh bút vẽ", "Mỗi nhóm lệnh có màu riêng để dễ nhận biết."],
    ["Muốn nhân vật nói “Xin chào!” trên sân khấu, em dùng lệnh nào?", "Lệnh “nói” trong nhóm lệnh hiển thị", "Lệnh di chuyển 10 bước", "Lệnh chờ 1 giây", "Lệnh nói làm xuất hiện bong bóng lời thoại của nhân vật."],
    ["Thứ tự các lệnh trong chương trình quan trọng thế nào?", "Rất quan trọng: lệnh sắp xếp sai thứ tự thì chương trình chạy sai ý tưởng", "Không quan trọng, xếp thế nào cũng được", "Chỉ lệnh cuối cùng mới quan trọng", "Giống như làm việc theo các bước, lập trình cũng cần đúng thứ tự."],
    ["Khi chương trình chạy không đúng ý tưởng, em nên làm gì?", "Kiểm tra lại từng lệnh, sửa lỗi (gỡ lỗi) rồi chạy thử lại", "Bỏ luôn, không làm nữa", "Đổ lỗi cho máy tính", "Tìm và sửa lỗi là một phần thú vị của lập trình."],
    ["“Sân khấu” trong phần mềm lập trình trực quan là gì?", "Khu vực hiển thị nhân vật và kết quả khi chạy chương trình", "Nơi để lưu tệp", "Bàn phím của máy tính", "Nhân vật biểu diễn trên sân khấu theo các lệnh em đã lắp."],
    ["Để tạo một chương trình diễn tả ý tưởng (ví dụ: mèo đi đến cái cây và chào), em cần làm theo thứ tự nào?", "Nêu ý tưởng → chọn nhân vật, sân khấu → lắp các lệnh theo thứ tự → chạy thử và sửa lỗi", "Chạy chương trình trước rồi mới nghĩ ý tưởng", "Lắp lệnh ngẫu nhiên đến khi đúng", "Làm việc theo bước giúp chương trình đúng ngay từ đầu."],
    ["Lệnh “lặp lại” trong chương trình có tác dụng gì?", "Thực hiện lại một nhóm lệnh nhiều lần mà không cần lắp lại nhiều lần", "Xoá chương trình", "Kết thúc chương trình ngay", "Ví dụ: lặp lại 4 lần “đi 10 bước, quay 90 độ” để vẽ hình vuông."],
    ["Muốn vẽ một hình vuông bằng nhân vật có bút vẽ, dãy lệnh hợp lí là:", "Lặp lại 4 lần: đi một đoạn, quay 90 độ", "Đi thẳng mãi không quay", "Quay tròn liên tục không đi", "Hình vuông có 4 cạnh bằng nhau và 4 góc vuông."],
    ["Nếu nhân vật di chuyển quá nhanh, khó nhìn, em thêm lệnh gì?", "Lệnh “chờ” (đợi) một khoảng thời gian giữa các bước", "Lệnh xoá nhân vật", "Lệnh tăng tốc độ", "Lệnh chờ giúp các hành động diễn ra chậm rãi, rõ ràng."],
    ["Học lập trình trực quan giúp em rèn luyện điều gì?", "Tư duy logic, giải quyết vấn đề theo từng bước và tính sáng tạo", "Chỉ để chơi game suốt ngày", "Không học được gì thêm", "Lập trình là cách rèn tư duy rất tốt cho học sinh."]
  ], [["Chương trình", "Dãy lệnh cho máy tính"], ["Khối lệnh", "Kéo thả, lắp ghép"], ["Sân khấu", "Nơi nhân vật biểu diễn"], ["Gỡ lỗi", "Tìm và sửa lệnh sai"]], "Nối cho đúng nhé!")
];
/* ================= CÔNG NGHỆ 4 ================= */
var CN4_TOPICS = [
  (function () { var kp = knowledgePools([
      ["Hoa và cây cảnh mang lại lợi ích gì cho đời sống?", "Làm đẹp không gian, giúp không khí trong lành, cho bóng mát và giúp con người thư giãn", "Không có lợi ích gì", "Chỉ tốn công chăm sóc", "Cây xanh còn hấp thụ khí các-bô-níc và thải ô-xi."],
      ["Loại hoa nào dưới đây rất quen thuộc, thường nở vào dịp Tết ở miền Bắc?", "Hoa đào", "Hoa mười giờ", "Hoa giấy", "Miền Nam Tết thường chưng hoa mai vàng; miền Bắc chưng hoa đào hồng."],
      ["Cây cảnh nào có lá dài, cứng, mép lá có răng cưa, thường trồng trong nhà để lọc không khí?", "Cây lưỡi hổ", "Cây hoa hồng", "Cây mười giờ", "Cây lưỡi hổ dễ trồng, chịu hạn tốt, thường đặt trong phòng."],
      ["Vật liệu chính để trồng hoa, cây cảnh trong chậu gồm những gì?", "Chậu trồng, đất (giá thể) trồng cây, phân bón", "Chỉ cần nước lã", "Cát xây dựng và xi măng", "Đất trồng cần tơi xốp, thoát nước tốt."],
      ["Dụng cụ nào dùng để tưới nước cho cây trong chậu?", "Bình tưới (ô doa) hoặc ca tưới có vòi sen", "Cái xẻng", "Cái kéo", "Tưới bằng vòi sen nhỏ giúp nước thấm đều, không làm xói đất."],
      ["Trước khi gieo hạt vào chậu, em cần chuẩn bị những gì?", "Chậu có lỗ thoát nước, đất tơi xốp và hạt giống tốt", "Chỉ cần một cái chậu rỗng", "Một ít sỏi đá thật to", "Lỗ thoát nước giúp chậu không bị úng nước."],
      ["Khi gieo hạt nhỏ (như hạt hoa mười giờ), em nên phủ đất thế nào?", "Phủ một lớp đất mỏng lên trên hạt", "Phủ lớp đất thật dày", "Không cần phủ đất và không tưới", "Hạt nhỏ phủ đất mỏng, tưới phun sương giữ ẩm."],
      ["Sau khi gieo hạt, việc chăm sóc quan trọng hằng ngày là gì?", "Tưới nước nhẹ, đều đặn giữ ẩm cho đất và để chậu nơi có ánh sáng phù hợp", "Tưới thật nhiều nước một lần rồi bỏ mặc", "Để chậu vào tủ tối hoàn toàn", "Hạt nảy mầm cần độ ẩm và ánh sáng vừa đủ."],
      ["Khi cây con đã lớn cứng cáp trong khay gieo, bước tiếp theo là gì?", "Trồng (sang chậu) cây con vào chậu lớn hơn với đất mới", "Nhổ bỏ cây con", "Cắt hết rễ cây", "Sang chậu giúp cây có không gian và dinh dưỡng để phát triển."],
      ["Chăm sóc cây cảnh trong chậu gồm những việc nào?", "Tưới nước vừa đủ, bón phân định kì, tỉa lá khô, bắt sâu, lau lá", "Chỉ tưới nước, không cần việc gì khác", "Để cây tự sống hoàn toàn", "Cây trong chậu phụ thuộc hoàn toàn vào người chăm sóc."],
      ["Dấu hiệu nào cho thấy cây đang bị thiếu nước?", "Đất khô trắng, lá héo rũ xuống", "Lá xanh mướt, đất ẩm", "Cây ra nhiều hoa", "Cần tưới bổ sung khi đất khô, tránh để cây héo kéo dài."],
      ["Vì sao không nên tưới quá nhiều nước cho cây trong chậu?", "Thừa nước làm úng, thối rễ, cây chết", "Nước nhiều làm cây cao quá nhanh", "Không có hại gì cả", "“Nhất nước” nhưng phải vừa đủ — thừa hay thiếu đều hại cây."],
      ["Đặt chậu cây ở vị trí nào là phù hợp với đa số cây hoa?", "Nơi có ánh sáng tự nhiên như ban công, cửa sổ, sân nhà", "Trong phòng tắm kín không có cửa sổ", "Trong tủ quần áo", "Hầu hết cây hoa cần ánh sáng để quang hợp và ra hoa."]
    ], [["Bình tưới", "Tưới nước cho cây"], ["Xẻng nhỏ", "Xúc đất, trồng cây"], ["Kéo", "Tỉa cành, lá khô"], ["Phân bón", "Cung cấp dinh dưỡng cho cây"]], "Nối dụng cụ với công dụng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước GIEO HẠT hoa trong chậu theo đúng thứ tự!", ["Chuẩn bị chậu và đất trồng", "Gieo hạt vào chậu", "Phủ lớp đất mỏng lên hạt", "Tưới nước nhẹ, giữ ẩm"]); });
    kp.games.push(function () { return sortQ("Sắp xếp thứ tự chăm sóc cây hoa trong chậu!", ["Tưới nước vừa đủ", "Bón phân cho cây", "Tỉa lá khô, bắt sâu", "Ngắm hoa nở"]); });
    return { id: "cn4-hoacay", emoji: "🌸", name: "Công nghệ và đời sống: hoa và cây cảnh", sub: "Bài 1–6 • Lợi ích, các loại hoa cây cảnh, gieo hạt, trồng và chăm sóc trong chậu", pools: kp }; })(),
  (function () { var kp = knowledgePools([
      ["Bộ lắp ghép mô hình kĩ thuật gồm những loại chi tiết nào?", "Các thanh thẳng, thanh chữ U, thanh chữ L, các tấm, bánh xe, trục, ốc và vít...", "Chỉ gồm các khối gỗ", "Chỉ gồm giấy và keo", "Các chi tiết lắp ghép bằng ốc, vít nên tháo lắp được nhiều lần."],
      ["Để vặn chặt ốc, vít khi lắp ghép mô hình, em dùng dụng cụ gì?", "Cờ-lê và tua-vít", "Búa và đinh", "Keo dán sắt", "Dụng cụ đi kèm bộ lắp ghép là cờ-lê và tua-vít."],
      ["Mô hình bập bênh gồm những bộ phận chính nào?", "Giá đỡ (trụ), thanh bập bênh và ghế ngồi hai đầu", "Chỉ một bánh xe lớn", "Một sợi dây và một cái móc", "Bập bênh hoạt động quanh một trục ở giữa giá đỡ."],
      ["Khi lắp mô hình, thứ tự làm việc đúng là gì?", "Xem hướng dẫn → chọn đủ chi tiết → lắp theo từng bước → kiểm tra, hoàn thiện", "Lắp ngẫu nhiên đến khi thành hình", "Lắp xong mới xem hướng dẫn", "Làm theo bước giúp mô hình chắc chắn, đúng hình dạng."],
      ["Mô hình rô-bốt lắp ghép thường có những bộ phận nào gợi hình người máy?", "Thân, đầu, tay, chân (và có thể có bánh xe để di chuyển)", "Chỉ có một tấm phẳng", "Chỉ gồm dây điện", "Từ các chi tiết của bộ lắp ghép, em sáng tạo được nhiều mô hình khác nhau."],
      ["Đồ chơi dân gian là gì?", "Đồ chơi do nhân dân sáng tạo từ lâu đời, thường làm từ vật liệu gần gũi như giấy, tre, đất...", "Đồ chơi điện tử hiện đại nhập khẩu", "Đồ chơi bằng kim loại đúc sẵn", "Đèn lồng, chuồn chuồn thăng bằng, chong chóng, diều... là đồ chơi dân gian quen thuộc."],
      ["Đèn lồng truyền thống thường được làm vào dịp lễ nào?", "Tết Trung thu (và Tết Nguyên đán)", "Ngày Nhà giáo Việt Nam", "Ngày Quốc tế Lao động", "Đèn ông sao, đèn kéo quân là hình ảnh thân thuộc của đêm Trung thu."],
      ["Làm đèn lồng giấy cần những vật liệu, dụng cụ chính nào?", "Giấy màu, que tre (nan), keo dán, kéo, dây treo", "Sắt, thép và máy hàn", "Xi măng và gạch", "Khung đèn thường bằng nan tre, dán giấy màu bên ngoài."],
      ["Chuồn chuồn thăng bằng có đặc điểm kì diệu nào?", "Đặt mỏ chuồn chuồn lên đầu ngón tay (một điểm tựa nhỏ), chuồn chuồn vẫn thăng bằng không rơi", "Chuồn chuồn tự bay được như thật", "Chuồn chuồn phát ra tiếng kêu", "Nhờ trọng tâm nằm đúng ở mỏ, chuồn chuồn thăng bằng trên một điểm tựa."],
      ["Để làm chuồn chuồn thăng bằng, vật liệu truyền thống thường dùng là gì?", "Tre (vót mỏng) và màu vẽ trang trí", "Nhựa cứng công nghiệp", "Thuỷ tinh", "Chuồn chuồn tre là đồ chơi dân gian nổi tiếng của làng Thạch Xá (Hà Nội)."],
      ["Sau khi lắp ghép hoặc làm đồ thủ công xong, em cần làm gì?", "Kiểm tra sản phẩm, dọn dẹp và cất dụng cụ, chi tiết thừa vào đúng chỗ", "Để nguyên mọi thứ bừa bộn", "Vứt hết chi tiết thừa đi", "Giữ gìn bộ lắp ghép giúp dùng được lâu dài."],
      ["Khi lắp mô hình mà thừa hoặc thiếu chi tiết, em nên làm gì?", "Kiểm tra lại bản hướng dẫn và số chi tiết đã chọn", "Tự chế chi tiết khác thay vào bằng mọi cách", "Bỏ dở mô hình", "Đếm và chọn đủ chi tiết trước khi lắp là bước quan trọng."],
      ["Ý nghĩa của việc học lắp ghép và làm đồ chơi thủ công là gì?", "Rèn sự khéo tay, kiên nhẫn, tư duy kĩ thuật và óc sáng tạo", "Chỉ để giết thời gian", "Không có ý nghĩa gì", "Nhiều kĩ sư, nhà sáng chế bắt đầu từ những mô hình lắp ghép nhỏ."]
    ], [["Cờ-lê, tua-vít", "Vặn ốc, vít"], ["Bập bênh", "Mô hình lắp ghép"], ["Đèn lồng", "Đồ chơi Tết Trung thu"], ["Chuồn chuồn thăng bằng", "Đồ chơi dân gian bằng tre"]], "Nối cho đúng nhé!");
    kp.games.push(function () { return sortQ("Sắp xếp các bước LÀM ĐÈN LỒNG theo đúng thứ tự!", ["Chuẩn bị giấy màu, nan tre, keo, kéo", "Làm khung đèn bằng nan tre", "Dán giấy màu lên khung", "Trang trí và gắn dây treo"]); });
    kp.games.push(function () { return sortQ("Sắp xếp các bước LẮP MÔ HÌNH theo đúng thứ tự!", ["Xem bản hướng dẫn lắp ghép", "Chọn đủ các chi tiết cần dùng", "Lắp ghép theo từng bước", "Kiểm tra và hoàn thiện mô hình"]); });
    return { id: "cn4-thucong", emoji: "🛠️", name: "Thủ công kĩ thuật", sub: "Bài 7–12 • Bộ lắp ghép mô hình kĩ thuật; bập bênh, rô-bốt; đồ chơi dân gian; đèn lồng, chuồn chuồn thăng bằng", pools: kp }; })()
];
/* ================= ĐĂNG KÍ LỚP 4 + ĐẾM + NHÃN + CHỐNG LẶP ================= */
(function () {
  if (typeof GRADES === "undefined" || !GRADES || GRADES[4]) return;
  GRADES[4] = { label: "Lớp 4", subjects: [
    { id: "g4-math", emoji: "🔢", name: "Toán", desc: "11 chủ đề • Số đến lớp triệu • Góc • Phân số", cls: "c-coral", topics: MATH4_TOPICS },
    { id: "g4-tv", emoji: "📖", name: "Tiếng Việt", desc: "Từ loại • Thành phần câu • Nhân hoá • Dấu câu • Đọc hiểu", cls: "c-pink", topics: TV4_TOPICS },
    { id: "g4-eng", emoji: "🔤", name: "Tiếng Anh", desc: "Global Success • Starter + 20 Unit", cls: "c-teal", topics: UNITS4.map(function (u) {
        if (u.n === 0) return { id: "g4-starter", emoji: "🌟", name: "Starter — Làm quen", sub: "Chào hỏi • Giới thiệu • Hoạt động trong lớp và ngoài trời", pools: eng4Pools(u) };
        return { id: "g4-u" + u.n, emoji: "📗", name: "Unit " + u.n + " — " + u.title, sub: u.words.map(function (w) { return w[0]; }).join(" • "), pools: eng4Pools(u) };
      }).concat([{ id: "g4-review", emoji: "🌈", name: "Ôn tập tất cả", sub: "Trộn từ của Starter và cả 20 Unit", pools: engPools(ALL_WORDS4) }]) },
    { id: "g4-kh", emoji: "🔬", name: "Khoa học", desc: "6 chủ đề • Chất, năng lượng, nấm, sức khoẻ, chuỗi thức ăn", cls: "c-sky", topics: KH4_TOPICS },
    { id: "g4-lsdl", emoji: "🗺️", name: "Lịch sử & Địa lí", desc: "5 chủ đề vùng • Đền Hùng, Văn Miếu, Cố đô Huế, Hội An, Củ Chi", cls: "c-brown", topics: LSD4_TOPICS },
    { id: "g4-dd", emoji: "💛", name: "Đạo đức", desc: "8 chủ đề • Tình huống ứng xử, quyền và bổn phận trẻ em", cls: "c-sun", topics: DD4_TOPICS },
    { id: "g4-tin", emoji: "💻", name: "Tin học", desc: "6 chủ đề • Phần cứng/phần mềm, Internet, trình chiếu, lập trình", cls: "c-sky", topics: TIN4_TOPICS },
    { id: "g4-cn", emoji: "🌸", name: "Công nghệ", desc: "Hoa và cây cảnh • Thủ công kĩ thuật", cls: "c-leaf", topics: CN4_TOPICS }
  ] };
  /* Vẽ lại các nút chọn lớp ở màn hình đăng nhập để Lớp 4 sáng lên */
  function reloginTabs4() {
    renderGradeTabs("login-grades", loginGrade, function (g) { loginGrade = g; reloginTabs4(); }, function (g) { el("login-err").textContent = "Lớp " + g + " sắp ra mắt — hiện đã có Lớp 1, Lớp 2, Lớp 3, Lớp 4 và Lớp 7 nhé!"; });
  }
  reloginTabs4();
  if (typeof profile !== "undefined" && profile && profile.name && typeof renderSubjects === "function") {
    if (profile.grade === 4) currentGrade = 4;
    renderSubjects(); renderProfileBar();
  }
  /* ---------- Đếm ngân hàng + gắn nhãn + chống lặp ---------- */
  var LS_KEY4 = "gameHocTap_recentQ4_v1";
  var recentStore4 = {};
  try { recentStore4 = JSON.parse(localStorage.getItem(LS_KEY4) || "{}") || {}; } catch (e) { recentStore4 = {}; }
  function saveRecent4() { try { localStorage.setItem(LS_KEY4, JSON.stringify(recentStore4)); } catch (e) {} }
  var G4BANK = {};
  var KNOWLEDGE4 = { "g4-tv": 1, "g4-kh": 1, "g4-lsdl": 1, "g4-dd": 1, "g4-tin": 1, "g4-cn": 1 };
  function capFor4(key) { return Math.max(24, Math.min(80, G4BANK[key] || 30)); }
  function recentHas4(key, sig) { return (recentStore4[key] || []).indexOf(sig) !== -1; }
  function recentAdd4(key, sig) {
    var arr = recentStore4[key] || (recentStore4[key] = []);
    if (arr.indexOf(sig) === -1) arr.push(sig);
    var cap = capFor4(key);
    while (arr.length > cap) arr.shift();
    saveRecent4();
  }
  var roundSeen4 = {};
  var realSetTimeout4 = window.setTimeout;
  window.setTimeout = function () { return 0; };
  try {
    GRADES[4].subjects.forEach(function (subj) {
      subj.topics.forEach(function (t) {
        var key = "4|" + subj.id + "|" + t.id, bankN;
        if (KNOWLEDGE4[subj.id]) {
          bankN = t.pools.choose.length * 3 + 4;
        } else {
          var sigs = {};
          ["choose", "blank", "match", "games"].forEach(function (pk) {
            (t.pools[pk] || []).forEach(function (g) {
              for (var i = 0; i < 12; i++) { try { sigs[qSig4(g())] = 1; } catch (e) {} }
            });
          });
          bankN = Object.keys(sigs).length;
        }
        G4BANK[key] = bankN;
        if (String(t.sub).indexOf("câu hỏi") === -1) t.sub = t.sub + " • " + bankN + "+ câu hỏi";
      });
    });
  } finally { window.setTimeout = realSetTimeout4; }
  GRADES[4].subjects.forEach(function (subj) {
    subj.topics.forEach(function (t) {
      var key = "4|" + subj.id + "|" + t.id;
      ["choose", "blank", "match", "games"].forEach(function (pk) {
        var rawPool = (t.pools[pk] || []).slice();
        if (!rawPool.length) return;
        t.pools[pk] = rawPool.map(function (gen) {
          return function () {
            if (roundSelectionActive) return gen();
            var q = gen(), sig = qSig4(q), tries = 0;
            while ((roundSeen4[sig] || recentHas4(key, sig)) && tries < 12) {
              var alt = rawPool.length > 1 ? pick(rawPool) : gen;
              q = alt(); sig = qSig4(q); tries++;
            }
            roundSeen4[sig] = true;
            recentAdd4(key, sig);
            return q;
          };
        });
      });
    });
  });
  var prevStartGame4 = startGame;
  startGame = function (title, pools) {
    roundSeen4 = {};
    try {
      var key = (typeof currentTopicKey !== "undefined") ? currentTopicKey : "";
      if (key && G4BANK[key] && (recentStore4[key] || []).length >= capFor4(key)) { recentStore4[key] = []; saveRecent4(); }
    } catch (e) {}
    return prevStartGame4(title, pools);
  };
  window.__BANK4 = G4BANK;
})();


/* ---------- Công thức và cách làm (Toán) của Lớp 4 — tách từ bảng ghi chú chung của master ---------- */
window.__MATH_KNOWLEDGE_NOTES = window.__MATH_KNOWLEDGE_NOTES || {};
Object.assign(window.__MATH_KNOWLEDGE_NOTES, {
"m4-ontap": ["Số chẵn có chữ số tận cùng là 0, 2, 4, 6, 8; số lẻ có chữ số tận cùng là 1, 3, 5, 7, 9.","Biểu thức chứa chữ: thay chữ bằng số cho trước rồi tính giá trị của biểu thức.","Bài toán nhiều bước: đọc kĩ đề, xác định phép tính trung gian trước khi tìm đáp số."],
"m4-goc": ["Góc nhọn bé hơn góc vuông; góc tù lớn hơn góc vuông, bé hơn góc bẹt; góc bẹt bằng hai góc vuông.","Đơn vị đo góc là độ (°): góc vuông = 90°, góc bẹt = 180°.","Đo góc: đặt tâm thước đo góc trùng với đỉnh góc, một cạnh của góc trùng với vạch 0."],
"m4-sotrieu": ["Các lớp từ phải sang trái: lớp đơn vị, lớp nghìn, lớp triệu; mỗi lớp gồm 3 hàng: đơn vị, chục, trăm.","Đọc số có nhiều chữ số: tách thành từng lớp rồi đọc số của từng lớp kèm tên lớp.","Làm tròn số: xét chữ số ngay bên phải hàng làm tròn, từ 5 trở lên thì tròn lên."],
"m4-donvi": ["1 tấn = 10 tạ = 100 yến = 1000 kg.","1 m² = 100 dm²; 1 dm² = 100 cm²; 1 cm² = 100 mm².","1 thế kỉ = 100 năm; 1 phút = 60 giây."],
"m4-congtru": ["Tính chất giao hoán: a + b = b + a. Tính chất kết hợp: (a + b) + c = a + (b + c).","Tìm hai số khi biết tổng và hiệu: số lớn = (tổng + hiệu) : 2; số bé = (tổng − hiệu) : 2.","Cộng, trừ các số có nhiều chữ số: đặt thẳng hàng rồi tính từ phải sang trái."],
"m4-duongthang": ["Hai đường thẳng vuông góc với nhau tạo thành 4 góc vuông; hai đường thẳng song song không bao giờ cắt nhau.","Hình bình hành có hai cặp cạnh đối song song và bằng nhau; hình thoi có 4 cạnh bằng nhau, hai cặp cạnh đối song song.","Dùng ê-ke để kiểm tra hai đường thẳng vuông góc."],
"m4-nhanchia": ["Nhân với số có hai chữ số: nhân với chữ số đơn vị, nhân với chữ số chục (viết lùi một cột), rồi cộng hai tích riêng.","Trung bình cộng của các số = tổng các số : số số hạng.","Bài toán rút về đơn vị: tìm giá trị của một phần trước, rồi tính cho số phần cần tìm."],
"m4-thongke": ["Biểu đồ cột: chiều cao của mỗi cột cho biết số lượng của nhóm tương ứng; đọc kĩ tên biểu đồ và trục số liệu.","Lập dãy số liệu theo thứ tự giúp quan sát sự thay đổi của sự kiện qua các lần quan sát."],
"m4-phanso": ["Phân số gồm tử số và mẫu số (mẫu số khác 0): mẫu số cho biết một đơn vị chia thành bao nhiêu phần bằng nhau, tử số cho biết số phần lấy ra.","Tính chất cơ bản: nhân hoặc chia cả tử số và mẫu số với cùng một số khác 0 thì được phân số bằng phân số đã cho.","Rút gọn phân số: chia cả tử và mẫu cho ước chung cho đến khi được phân số tối giản.","Muốn so sánh các phân số khác mẫu số, quy đồng mẫu số của chúng trước."],
"m4-congtrups": ["Cộng, trừ hai phân số cùng mẫu số: cộng (hoặc trừ) các tử số với nhau và giữ nguyên mẫu số.","Cộng, trừ hai phân số khác mẫu số: quy đồng mẫu số trước rồi cộng (trừ) như cùng mẫu số.","Kết quả cuối cùng nên rút gọn thành phân số tối giản."],
"m4-nhanchia-ps": ["Nhân hai phân số: tử số nhân tử số, mẫu số nhân mẫu số.","Chia hai phân số: lấy phân số thứ nhất nhân với phân số đảo ngược của phân số thứ hai.","Tìm phân số của một số: lấy số đó nhân với phân số."]
});
  if (typeof window.__phaseBProcessGrade === "function") window.__phaseBProcessGrade(4);
  if (typeof window.__phaseCompleteGrade === "function") window.__phaseCompleteGrade(4);

/* ================= MỤC 9 (v18) — SVG KHOA HỌC: gắn hình K1/K2/K3/K4 cho Khoa học 4 ================= */
(function () {
  function findT(id) { return findTopic127(4, id); }
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
  function k3CycleGen() {
    var stages = [["bochoi", "Bốc hơi", "Nước trong ao, hồ, sông bị nắng chiếu nóng, bốc hơi thành hơi nước bay lên."], ["ngungtu", "Ngưng tụ", "Hơi nước lên cao gặp lạnh, ngưng tụ thành giọt nước nhỏ tạo thành mây."], ["mua", "Mưa", "Giọt nước trong mây lớn dần rồi rơi xuống thành mưa."], ["chay", "Chảy về biển", "Nước mưa chảy theo suối, sông rồi về biển."]];
    var ask = pick(stages);
    var q = mcqQ("Quan sát vòng tuần hoàn của nước trong hình. Giai đoạn được đánh dấu ? là giai đoạn nào?",
      stages.filter(function (s) { return s[0] !== ask[0]; }).map(function (s) { return s[1]; }),
      ask[1], ask[2]);
    q.figure = figK3CycleSVG(ask[0]);
    return q;
  }
  var CHAINS4 = [
    ["Cỏ", "Châu chấu", "Ếch", "Rắn"],
    ["Lúa", "Sâu ăn lá", "Chim", "Mèo"],
    ["Rong trong ao", "Cá nhỏ", "Cá lớn", "Chim bói cá"],
    ["Ngô", "Chuột", "Rắn", "Diều hâu"]
  ];
  var OUTS4 = ["Bướm", "Ong mật", "Kiến", "Giun đất", "Nhện", "Bọ rùa"];
  function k2ChainGen() {
    var chain = pick(CHAINS4);
    var q;
    if (Math.random() < 0.6) {
      var blank = rand(0, chain.length - 1);
      q = mcqQ("Quan sát chuỗi thức ăn trong hình. Sinh vật ở vị trí ? là sinh vật nào?",
        shuffle(OUTS4.slice()).slice(0, 2), chain[blank],
        "Chuỗi thức ăn: " + chain.join(" → ") + ". Mũi tên chỉ chiều năng lượng truyền từ sinh vật bị ăn sang sinh vật ăn nó.");
      q.figure = figK2ChainSVG(chain, blank, false);
    } else {
      var sh = shuffle(chain.slice());
      q = mcqQ("Các sinh vật trong hình thuộc cùng một chuỗi thức ăn. Sinh vật nào là sinh vật SẢN XUẤT (đứng đầu chuỗi)?",
        shuffle(chain.slice(1)).slice(0, 2), chain[0],
        "Sinh vật sản xuất (cây xanh) đứng đầu chuỗi thức ăn: " + chain.join(" → ") + ".");
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
  t = findT("kh4-chat"); if (t) { t.pools.choose.push(k1PanelsGen, k1PanelsGen, k3CycleGen); }
  t = findT("kh4-chuoithucan"); if (t) { t.pools.choose.push(k2ChainGen, k2ChainGen, k2ChainGen); }
  t = findT("kh4-nangluong"); if (t) { t.pools.choose.push(k4ShadowGen, k4ShadowGen); }
})();

/* ================= ĐỢT HÌNH TIỂU HỌC (v22) — Lớp 4 =================
   Gắn hình minh hoạ theo chỉ số dữ kiện (figTagFacts của vỏ): hình là dữ
   kiện/ngữ cảnh của chính câu đó — tranh emoji theo chủ đề, lưới 100 ô cho
   quan hệ đơn vị diện tích; đáp án không nằm trong hình. */
(function () {
  function bp(e) { return '<div class="big-pic">' + e + "</div>"; }
  function grid0() { return figFracGridSVG(0); }
  figTagFacts(4, "m4-donvi", { 0: bp("⚖️"), 1: bp("⚖️"), 2: bp("⚖️"), 3: bp("⚖️"), 4: grid0, 5: grid0, 6: grid0, 7: bp("🕐"), 8: bp("🕐"), 9: bp("🗓️"), 11: bp("🐘"), 12: bp("🏠") });
  figTagFacts(4, "tv4-tungu8", { 0: bp("🙂"), 1: bp("🧭"), 2: bp("💡"), 3: bp("🌠"), 4: bp("❤️"), 5: bp("🙏"), 7: bp("🌾"), 8: bp("🕊️"), 9: bp("🌠"), 11: bp("🙂"), 12: bp("🌍") });
  figTagFacts(4, "kh4-thucvatdongvat", { 0: bp("🌱"), 1: bp("🌱"), 2: bp("🌱"), 3: bp("🐶"), 4: bp("💧"), 5: bp("🐶"), 6: bp("💧"), 7: bp("🌵"), 8: bp("🐠"), 9: bp("♻️"), 10: bp("🐾"), 11: bp("🌱"), 12: bp("🌱") });
  figTagFacts(4, "kh4-nam", { 0: bp("🍄"), 1: bp("🍄"), 2: bp("🍄"), 3: bp("🍞"), 4: bp("🍞"), 5: bp("🍞"), 6: bp("🍄"), 7: bp("❄️"), 8: bp("🍄"), 9: bp("🍄"), 10: bp("🍚"), 11: bp("🍲"), 12: bp("🍄") });
  figTagFacts(4, "kh4-suckhoe", { 0: bp("🍚"), 1: bp("🍗"), 2: bp("🥦"), 3: bp("🍽️"), 4: bp("🍬"), 5: bp("🥗"), 6: bp("🦷"), 7: bp("🛒"), 8: bp("🧼"), 9: bp("🍲"), 10: bp("🏊"), 11: bp("🛟"), 12: bp("🛟") });
})();
