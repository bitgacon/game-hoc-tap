/* ================================================================
   CHUYÊN ĐỀ TOÁN TƯ DUY — PHẦN LÕI ĐẦU (hàm dùng chung + registry)
   File này là đoạn đầu của assets/data/chuyende.js sau khi lắp ráp.
   Chỉ định nghĩa hàm cd* và registry rỗng; KHÔNG chạy gì lúc nạp.
   ================================================================ */
window.__CD_BANDS = window.__CD_BANDS || [];

function cdRand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function cdPick(arr) { return arr[cdRand(0, arr.length - 1)]; }
function cdShuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = cdRand(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function cdGCD(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
/* Phân số hiển thị theo quy tắc của chủ dự án: luôn tối giản; mẫu = 1 → số nguyên, không "/1". */
function cdFrac(n, d) {
  if (d < 0) { n = -n; d = -d; }
  var g = cdGCD(n, d); n = Math.round(n / g); d = Math.round(d / g);
  return d === 1 ? String(n) : (n + "/" + d);
}
/* Khóa GIÁ TRỊ của một lựa chọn (khử trùng theo giá trị như cổng của game):
   số nguyên/thập phân/phân số/phần trăm so theo giá trị số; còn lại theo chữ thường hoá. */
function cdValKey(x) {
  var t = String(x == null ? "" : x).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().toLowerCase();
  var m = /^(-?\d+(?:[.,]\d+)?)\s*%$/.exec(t);
  if (m) return "n|" + (parseFloat(m[1].replace(",", ".")) / 100);
  m = /^(-?\d+)\s*\/\s*(-?\d+)$/.exec(t);
  if (m && +m[2] !== 0) return "n|" + (Math.round((+m[1] / +m[2]) * 1e9) / 1e9);
  if (/^-?\d+(?:[.,]\d+)?$/.test(t)) return "n|" + parseFloat(t.replace(",", "."));
  return "t|" + t;
}
/* Bù nhiễu số gần đáp án khi họ sinh thiếu nhiễu sạch (chỉ cho đáp án nguyên/phân số). */
function cdNearMiss(correct, have) {
  var t = String(correct), out = [];
  function push(v) { if (v == null) return; var s = String(v); if (cdValKey(s) !== cdValKey(t) && !have[cdValKey(s)]) { have[cdValKey(s)] = true; out.push(s); } }
  var fm = /^(-?\d+)\s*\/\s*(-?\d+)$/.exec(t);
  if (fm) {
    var n = +fm[1], d = +fm[2];
    push(cdFrac(n + 1, d)); push(cdFrac(n - 1, d)); push(cdFrac(n, d + 1)); push(cdFrac(n + 1, d + 1)); push(cdFrac(n + d, d)); push(cdFrac(2 * n, d));
    return out;
  }
  if (/^-?\d+$/.test(t)) {
    var v = parseInt(t, 10);
    push(v + 1); push(v - 1); push(v + 2); push(v - 2); push(v + 10); push(v - 10); push(v * 2); push(v + 5);
    if (Math.abs(v) >= 12) { var s = String(Math.abs(v)), sw = +(s.charAt(1) + s.charAt(0)); push(v < 0 ? -sw : sw); }
    return out;
  }
  if (/^-?\d+[.,]\d+$/.test(t)) {
    var f = parseFloat(t.replace(",", "."));
    push(String(Math.round((f + 0.5) * 100) / 100).replace(".", ",")); push(String(Math.round((f - 0.5) * 100) / 100).replace(".", ","));
    push(String(Math.round((f + 1) * 100) / 100).replace(".", ",")); push(String(Math.round((f * 2) * 100) / 100).replace(".", ","));
    return out;
  }
  return out;
}
/* MCQ của chuyên đề: khử trùng nhiễu theo GIÁ TRỊ; không đủ 2 nhiễu sạch → null.
   opt: { visual, figure, figureOnly, cols, badge } */
function cdMCQ(prompt, correct, distractors, explain, opt) {
  opt = opt || {};
  correct = String(correct);
  var ck = cdValKey(correct), have = {}, pool = [];
  have[ck] = true;
  (distractors || []).forEach(function (d) {
    var s = String(d), k = cdValKey(s);
    if (!have[k]) { have[k] = true; pool.push(s); }
  });
  if (pool.length < 3) { cdNearMiss(correct, have).forEach(function (s) { if (pool.length < 3) pool.push(s); }); }
  if (pool.length < 2) return null;
  var chosen = cdShuffle(pool).slice(0, 3);
  var all = cdShuffle([correct].concat(chosen));
  var q = {
    prompt: prompt, visual: opt.visual || "",
    options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }),
    answer: all.indexOf(correct), cols: opt.cols || (all.length >= 4 ? 2 : all.length),
    optStack: all.some(function (o) { return String(o).length > 16; })
  };
  if (opt.badge) q.badge = opt.badge;
  if (explain) q.explain = explain;
  if (opt.figure) { q.figure = opt.figure; if (opt.figureOnly) q.figureOnly = true; }
  return q;
}
/* Câu điền của chuyên đề (khuôn factBlank của game): thẻ đáp án chọn vào chỗ trống. */
function cdBlank(prompt, correct, distractors, explain, visualHTML) {
  correct = String(correct);
  var ck = cdValKey(correct), have = {}, pool = [];
  have[ck] = true;
  (distractors || []).forEach(function (d) {
    var s = String(d), k = cdValKey(s);
    if (!have[k]) { have[k] = true; pool.push(s); }
  });
  if (pool.length < 2) { cdNearMiss(correct, have).forEach(function (s) { if (pool.length < 2) pool.push(s); }); }
  if (pool.length < 2) return null;
  var all = cdShuffle([correct].concat(cdShuffle(pool).slice(0, 2)));
  return {
    kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: prompt, blankText: correct,
    explain: explain || null,
    visual: visualHTML || ('<div class="sentence">Đáp án: ' + blankSlot() + "</div>"),
    options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }),
    answer: all.indexOf(correct), cols: 3, optStack: true
  };
}
/* TF của chuyên đề: rounds = [{ stmt, truth, explain }] — mệnh đề khẳng định viết trực tiếp,
   người gọi tự cân bằng phán quyết trong màn (không đồng loạt Đúng hoặc Sai). */
function cdTF(rounds, prompt) {
  var rs = rounds.map(function (r) {
    return { visual: '<div class="sentence" style="font-size:clamp(20px,5vw,27px)">' + r.stmt + "</div>", truth: !!r.truth, explain: r.explain };
  });
  return tfQ(prompt || "Đúng hay sai? Chạm nhanh nhé!", rs);
}
/* Câu nối của chuyên đề (bọc pairsMatch của game + gắn giải thích). */
function cdMatch(prompt, pairs, explain) {
  var q = pairsMatch(prompt, pairs);
  if (explain) q.explain = explain;
  return q;
}
var cdNames = ["An", "Bình", "Chi", "Dũng", "Hà", "Hùng", "Lan", "Linh", "Minh", "Nam", "Ngọc", "Phúc", "Quân", "Thảo", "Tuấn", "Vy", "Đạt", "Hạnh"];
/* ================================================================
   CHUYÊN ĐỀ TOÁN TƯ DUY — DẢI TIỂU HỌC (Lớp 3–5)
   Đoạn của assets/data/chuyende.js: đẩy 1 band vào window.__CD_BANDS.
   Câu hỏi tự viết mới theo dạng toán kinh điển; giọng văn ngắn, một ý.
   ================================================================ */
(function () {
  "use strict";
  function tag(q, fam, v) { if (q) { q.__fam = fam; q.__var = v; } return q; }
  function expr(html) { return '<div class="expr">' + html + "</div>"; }
  function sent(html) { return '<div class="sentence">' + html + "</div>"; }
  function seqText(terms, tail) { return terms.join(", ") + (tail ? ", …" : ""); }

  /* ================= (a) DÃY SỐ & QUY LUẬT ================= */
  function gDaysoCong() {
    var a = cdRand(2, 60), d = cdPick([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15]);
    var terms = [a, a + d, a + 2 * d, a + 3 * d];
    var ask6 = Math.random() < 0.35;
    var ans = ask6 ? a + 5 * d : a + 4 * d;
    var shown = ask6 ? terms.concat([a + 4 * d]) : terms;
    var q = cdMCQ(
      "Dãy số: " + seqText(shown, true) + (ask6 ? " Số thứ sáu trong dãy là bao nhiêu?" : " Số tiếp theo trong dãy là bao nhiêu?"),
      ans, [ans - d, ans + d, ans + 2 * d, a + 3 * d],
      "Mỗi số hơn số đứng trước " + d + " đơn vị. Số cuối đã cho là " + shown[shown.length - 1] + ", cộng thêm " + d + " được " + ans + ".",
      {});
    return tag(q, "th-dayso", ask6 ? "cong-thu6" : "cong-tiep");
  }
  function gDaysoCongXuong() {
    var d = cdPick([3, 4, 5, 6, 8, 9, 10]);
    var a = cdRand(40, 95);
    var terms = [a, a - d, a - 2 * d, a - 3 * d];
    var ans = a - 4 * d;
    var q = cdMCQ(
      "Dãy số: " + seqText(terms, true) + " Số tiếp theo trong dãy là bao nhiêu?",
      ans, [ans + d, ans - d, ans + 2 * d, a - 3 * d],
      "Mỗi số kém số đứng trước " + d + " đơn vị. Lấy " + terms[3] + " trừ " + d + " được " + ans + ".",
      {});
    return tag(q, "th-dayso", "cong-xuong");
  }
  function gDaysoHieuTang() {
    var s = cdRand(1, 20), base = cdPick([1, 1, 2]);
    var terms = [s];
    var cur = s;
    for (var i = 0; i < 4; i++) { cur += base + i; terms.push(cur); }
    var ans = cur + base + 4;
    var diffs = []; for (var j = 1; j < terms.length; j++) diffs.push(terms[j] - terms[j - 1]);
    var q = cdMCQ(
      "Dãy số: " + seqText(terms, true) + " Số tiếp theo trong dãy là bao nhiêu?",
      ans, [ans - 1, ans + 1, cur + base + 3, cur + base + 5],
      "Hiệu hai số liền nhau tăng dần: " + diffs.join(", ") + " rồi đến " + (base + 4) + ". Vậy số tiếp theo là " + cur + " + " + (base + 4) + " = " + ans + ".",
      {});
    return tag(q, "th-dayso", "hieu-tang");
  }
  function gDaysoNhan() {
    var kind = cdPick(["x2", "x2c1", "x2t1", "x3"]);
    var a = kind === "x3" ? cdRand(1, 4) : cdRand(2, 7);
    function nxt(x) { return kind === "x2" ? x * 2 : kind === "x2c1" ? x * 2 + 1 : kind === "x2t1" ? x * 2 - 1 : x * 3; }
    var ruleText = kind === "x2" ? "gấp đôi số trước" : kind === "x2c1" ? "gấp đôi số trước rồi cộng 1" : kind === "x2t1" ? "gấp đôi số trước rồi trừ 1" : "gấp ba số trước";
    var terms = [a]; for (var i = 0; i < 3; i++) terms.push(nxt(terms[terms.length - 1]));
    var ans = nxt(terms[terms.length - 1]);
    var q = cdMCQ(
      "Dãy số: " + seqText(terms, true) + " Số tiếp theo trong dãy là bao nhiêu?",
      ans, [ans + 2, ans - 2, terms[3] * 2, ans + 10],
      "Quy luật: mỗi số bằng " + ruleText + ". Vậy số tiếp theo là " + ans + ".",
      {});
    return tag(q, "th-dayso", "nhan-" + kind);
  }
  function gDaysoBlank() {
    var a = cdRand(3, 70), d = cdPick([2, 3, 4, 5, 6, 8, 9, 10, 12]);
    var ans = a + 2 * d;
    var vis = sent(a + ", " + (a + d) + ", " + blankSlot() + ", " + (a + 3 * d));
    var q = cdBlank("Điền số còn thiếu trong dãy số nhé!", ans, [ans - d, ans + d, a + d, a + 3 * d],
      "Hai số liền nhau hơn kém nhau " + d + " đơn vị, nên số còn thiếu là " + (a + d) + " + " + d + " = " + ans + ".", vis);
    return tag(q, "th-dayso", "blank-giua");
  }
  function gDaysoMatch() {
    var made = [], guard = 0;
    while (made.length < 4 && guard++ < 60) {
      var kind = cdPick(["cong", "nhan2", "hieu"]);
      var left, right;
      if (kind === "cong") { var a = cdRand(2, 50), d = cdPick([3, 4, 5, 6, 7, 9, 11]); left = seqText([a, a + d, a + 2 * d, a + 3 * d], true); right = a + 4 * d; }
      else if (kind === "nhan2") { var s = cdRand(1, 5); left = seqText([s, s * 2, s * 4, s * 8], true); right = s * 16; }
      else { var b = cdRand(1, 15), t = [b]; var c = b; for (var i = 0; i < 3; i++) { c += 1 + i; t.push(c); } left = seqText(t, true); right = c + 4; }
      if (made.some(function (m) { return m[0] === left || String(m[1]) === String(right); })) continue;
      made.push([left, String(right)]);
    }
    if (made.length < 4) return null;
    var q = cdMatch("Nối mỗi dãy số với số tiếp theo của dãy nhé!", made,
      "Tìm quy luật của từng dãy (cộng đều, gấp đôi, hiệu tăng dần) rồi suy ra số tiếp theo.");
    return tag(q, "th-dayso", "match");
  }
  function gDaysoTF() {
    var a = cdRand(3, 40), d = cdPick([2, 3, 4, 5, 6, 8, 10]);
    var terms = [a, a + d, a + 2 * d, a + 3 * d];
    var next = a + 4 * d;
    var wrongNext = next + cdPick([-d, d, 2 * d]);
    var inSeq = a + cdPick([5, 6, 7]) * d;
    var notIn = inSeq + (d > 2 ? 1 : d - 1);
    if (notIn === inSeq) notIn = inSeq + 1;
    var pat = cdPick([[true, true, false], [true, false, true], [false, true, true], [true, false, false], [false, true, false], [false, false, true]]);
    var claims = [
      { t: "Số tiếp theo của dãy là " + next + ".", f: "Số tiếp theo của dãy là " + wrongNext + ".", e: "Mỗi số hơn số trước " + d + " đơn vị, số tiếp theo là " + terms[3] + " + " + d + " = " + next + "." },
      { t: "Mỗi số trong dãy hơn số đứng trước " + d + " đơn vị.", f: "Mỗi số trong dãy hơn số đứng trước " + (d + 1) + " đơn vị.", e: "Hiệu hai số liền nhau đều bằng " + d + "." },
      { t: "Số " + inSeq + " thuộc dãy số này.", f: "Số " + notIn + " thuộc dãy số này.", e: "Các số của dãy là " + seqText(terms, true) + " " + inSeq + (notIn !== inSeq ? " thuộc dãy; còn " + notIn + " không thuộc dãy." : ".") }
    ];
    var rounds = claims.map(function (c, i) { return { stmt: pat[i] ? c.t : c.f, truth: pat[i], explain: c.e }; });
    var head = sent("Dãy số: " + seqText(terms, false));
    var q = cdTF(rounds.map(function (r) { return { stmt: r.stmt, truth: r.truth, explain: r.explain }; }));
    if (q) { q.prompt = "Đúng hay sai? Dãy số: " + seqText(terms, false); q.__cdHead = head; }
    return tag(q, "th-dayso", "tf");
  }

  /* ================= (b) TÌM SỐ CÒN THIẾU ================= */
  function gThieuMotBuoc() {
    var kind = cdPick(["+x", "x+", "x-", "-x", "xx", "x:"]);
    var A, B, ans, text;
    if (kind === "+x") { ans = cdRand(2, 60); A = cdRand(2, 80); B = ans + A; text = "□ + " + A + " = " + B; }
    else if (kind === "x+") { ans = cdRand(2, 60); A = cdRand(2, 80); B = A + ans; text = A + " + □ = " + B; }
    else if (kind === "x-") { A = cdRand(3, 60); ans = cdRand(2, A - 1); B = A - ans; text = A + " − □ = " + B; }
    else if (kind === "-x") { A = cdRand(2, 50); ans = A + cdRand(2, 60); B = ans - A; text = "□ − " + A + " = " + B; }
    else if (kind === "xx") { A = cdPick([2, 3, 4, 5, 6, 7, 8, 9]); ans = cdRand(2, 9); B = A * ans; text = "□ × " + A + " = " + B; }
    else { A = cdPick([2, 3, 4, 5, 6, 7, 8, 9]); ans = cdRand(2, 9); B = A * ans; text = B + " : □ = " + ans; }
    var expl = {
      "+x": "Muốn tìm số hạng chưa biết, lấy tổng trừ số hạng đã biết: " + B + " − " + A + " = " + ans + ".",
      "x+": "Muốn tìm số hạng chưa biết, lấy tổng trừ số hạng đã biết: " + B + " − " + A + " = " + ans + ".",
      "x-": "Muốn tìm số trừ, lấy số bị trừ trừ đi hiệu: " + text.split("=")[0].trim() + " cho kết quả " + ans + ".",
      "-x": "Muốn tìm số bị trừ, lấy hiệu cộng số trừ: " + B + " + " + A + " = " + ans + ".",
      "xx": "Muốn tìm thừa số chưa biết, lấy tích chia thừa số đã biết: " + B + " : " + A + " = " + ans + ".",
      "x:": "Muốn tìm số chia, lấy số bị chia chia cho thương: " + B + " : " + ans + " = " + A + ", vậy □ = " + A + "."
    }[kind];
    if (kind === "x:") { var tmp = ans; ans = A; expl = "Muốn tìm số chia, lấy số bị chia chia cho thương: " + B + " : " + tmp + " = " + ans + "."; }
    if (kind === "x-") expl = "Muốn tìm số trừ, lấy số bị trừ trừ đi hiệu: " + A + " − " + B + " = " + ans + ".";
    var q = cdMCQ("Tìm số trong ô trống nhé!", ans, [ans + 1, ans - 1, ans + 2, ans + 10], expl, { visual: expr(text) });
    return tag(q, "th-thieuso", "mot-buoc-" + kind);
  }
  function gThieuHaiBuoc() {
    var x = cdRand(2, 9), a = cdPick([2, 3, 4, 5, 6, 7, 8, 9]), b = cdRand(2, 20);
    var minus = Math.random() < 0.4 && x * a > b;
    var c = minus ? x * a - b : x * a + b;
    var text = "□ × " + a + (minus ? " − " : " + ") + b + " = " + c;
    var expl = "Đưa về một bước: □ × " + a + " = " + c + (minus ? " + " + b : " − " + b) + " = " + (x * a) + ", rồi lấy " + (x * a) + " : " + a + " = " + x + ".";
    var q = cdMCQ("Tìm số trong ô trống nhé!", x, [x + 1, x - 1, x + 2, x * a], expl, { visual: expr(text) });
    return tag(q, "th-thieuso", minus ? "hai-buoc-tru" : "hai-buoc-cong");
  }
  function canSVG(a, b) {
    return figOpen("0 0 240 140", "Cân thăng bằng") +
      '<line x1="30" y1="42" x2="210" y2="42" stroke="#33302a" stroke-width="3"/>' +
      '<polygon points="120,42 104,96 136,96" fill="#dcecfb" stroke="#2f6db3" stroke-width="2"/>' +
      '<rect x="104" y="96" width="32" height="6" fill="#33302a"/>' +
      '<path d="M30 42 L18 62 L66 62 Z" fill="none" stroke="#33302a" stroke-width="2"/>' +
      '<path d="M210 42 L162 62 L210 62 Z" fill="none" stroke="#33302a" stroke-width="2" transform="translate(-12,0)"/>' +
      '<rect x="24" y="34" width="20" height="16" fill="#fff" stroke="#e4572e" stroke-width="2"/>' +
      figText(34, 46, "?", "middle", 13, "#e4572e") +
      '<rect x="46" y="34" width="20" height="16" fill="#dcecfb" stroke="#2f6db3" stroke-width="2"/>' +
      figText(56, 46, String(a), "middle", 12, "#33302a") +
      '<rect x="182" y="34" width="22" height="16" fill="#dcecfb" stroke="#2f6db3" stroke-width="2"/>' +
      figText(193, 46, String(b), "middle", 12, "#33302a") +
      "</svg>";
  }
  function gThieuCan() {
    var a = cdRand(2, 30), x = cdRand(2, 40), b = a + x;
    var q = cdMCQ("Cân đang thăng bằng. Bên trái có một hộp chưa biết nặng bao nhiêu ki-lô-gam và một quả cân " + a + " kg. Bên phải có một quả cân " + b + " kg. Hộp nặng bao nhiêu ki-lô-gam?",
      x, [x + 1, x - 1, x + a, b],
      "Cân thăng bằng nên hai bên bằng nhau: hộp + " + a + " = " + b + ". Vậy hộp nặng " + b + " − " + a + " = " + x + " kg.",
      { figure: canSVG(a, b), figureOnly: false });
    return tag(q, "th-thieuso", "can");
  }
  function gThieuBlank() {
    var a = cdPick([2, 3, 4, 5, 6, 7, 8, 9]), x = cdRand(2, 9), b = a * x;
    var vis = sent(a + " × " + blankSlot() + " = " + b);
    var q = cdBlank("Điền số còn thiếu vào ô trống nhé!", x, [x + 1, x - 1, x + 2, b],
      "Muốn tìm thừa số chưa biết, lấy tích chia thừa số đã biết: " + b + " : " + a + " = " + x + ".", vis);
    return tag(q, "th-thieuso", "blank-nhan");
  }
  function gThieuMatch() {
    var made = [], guard = 0;
    while (made.length < 4 && guard++ < 80) {
      var kind = cdPick(["+", "-", "x", ":"]);
      var text, val;
      if (kind === "+") { var x = cdRand(3, 60), A = cdRand(3, 70); text = "□ + " + A + " = " + (x + A); val = x; }
      else if (kind === "-") { var y = cdRand(3, 60), B = cdRand(3, 70); text = "□ − " + B + " = " + y; val = y + B; }
      else if (kind === "x") { var f = cdPick([2, 3, 4, 5, 6, 7, 8, 9]), z = cdRand(2, 9); text = "□ × " + f + " = " + (f * z); val = z; }
      else { var g2 = cdPick([2, 3, 4, 5, 6, 7, 8, 9]), w = cdRand(2, 9); text = (g2 * w) + " : □ = " + w; val = g2; }
      if (made.some(function (m) { return m[0] === text || String(m[1]) === String(val); })) continue;
      made.push([text, String(val)]);
    }
    if (made.length < 4) return null;
    var q = cdMatch("Nối mỗi phép tính với số trong ô trống nhé!", made,
      "Tìm từng ô trống bằng phép tính ngược (cộng ↔ trừ, nhân ↔ chia) rồi nối với kết quả.");
    return tag(q, "th-thieuso", "match");
  }
  function gThieuTF() {
    var cases = [], guard = 0;
    while (cases.length < 3 && guard++ < 60) {
      var kind = cdPick(["+", "x", "-"]);
      var text, val;
      if (kind === "+") { var x = cdRand(3, 50), A = cdRand(3, 60); text = "□ + " + A + " = " + (x + A); val = x; }
      else if (kind === "x") { var f = cdPick([2, 3, 4, 5, 6, 7, 8, 9]), z = cdRand(2, 9); text = "□ × " + f + " = " + (f * z); val = z; }
      else { var y = cdRand(3, 50), B = cdRand(3, 60); text = "□ − " + B + " = " + y; val = y + B; }
      if (cases.some(function (c) { return c.text === text; })) continue;
      cases.push({ text: text, val: val });
    }
    if (cases.length < 3) return null;
    var pat = cdPick([[true, true, false], [true, false, true], [false, true, true], [true, false, false], [false, false, true]]);
    var rounds = cases.map(function (c, i) {
      var shown = pat[i] ? c.val : c.val + cdPick([-2, -1, 1, 2, 10]);
      if (!pat[i] && shown === c.val) shown = c.val + 1;
      if (!pat[i] && shown <= 0) shown = c.val + 2;
      return { stmt: "Trong phép tính " + c.text + ", số trong ô trống là " + shown + ".", truth: pat[i], explain: "Tính ngược lại, số trong ô trống đúng là " + c.val + "." };
    });
    var q = cdTF(rounds);
    return tag(q, "th-thieuso", "tf");
  }

  /* ================= (c) TOÁN ĐỐ SUY LUẬN ================= */
  var ITEMS = [["cây bút", 3], ["quyển vở", 5], ["viên kẹo", 2], ["quả bóng", 10], ["cái bánh", 6], ["tờ giấy màu", 4], ["hòn bi", 3], ["chiếc tem", 2]];
  function gMuaBan() {
    var it = cdPick(ITEMS), n = cdRand(2, 9), price = it[1] * cdPick([1, 1, 2]);
    var cost = n * price;
    var note = cost <= 40 ? 50 : 100;
    var change = note - cost;
    var two = Math.random() < 0.4;
    if (two) {
      var it2 = cdPick(ITEMS.filter(function (x) { return x[0] !== it[0]; }));
      var n2 = cdRand(2, 6), price2 = it2[1];
      var total = cost + n2 * price2;
      note = total <= 80 ? 100 : 200;
      var q = cdMCQ("Bạn " + cdPick(cdNames) + " mua " + n + " " + it[0] + ", mỗi cái " + price + " nghìn đồng và " + n2 + " " + it2[0] + ", mỗi cái " + price2 + " nghìn đồng. Bạn đưa tờ " + note + " nghìn đồng. Cô bán hàng trả lại bao nhiêu nghìn đồng?",
        note - total, [note - total + price, note - total - price2, total, note - cost],
        "Tổng tiền mua là " + n + " × " + price + " + " + n2 + " × " + price2 + " = " + total + " nghìn đồng. Tiền trả lại: " + note + " − " + total + " = " + (note - total) + " nghìn đồng.", {});
      return tag(q, "th-toando", "mua-hai-loai");
    }
    var q2 = cdMCQ("Bạn " + cdPick(cdNames) + " mua " + n + " " + it[0] + ", mỗi cái giá " + price + " nghìn đồng. Bạn đưa cô bán hàng tờ " + note + " nghìn đồng. Cô bán hàng trả lại bao nhiêu nghìn đồng?",
      change, [change + price, change - price, cost, note - price],
      "Tiền mua " + it[0] + " là " + n + " × " + price + " = " + cost + " nghìn đồng. Tiền trả lại: " + note + " − " + cost + " = " + change + " nghìn đồng.", {});
    return tag(q2, "th-toando", "mua-mot-loai");
  }
  function gGapChia() {
    var k = cdPick([2, 3, 4, 5, 6]);
    var per = cdRand(2, 12);
    var start = per * k / 2;
    if (start !== Math.floor(start)) { per += 1; start = per * k / 2; }
    var name = cdPick(cdNames);
    var q = cdMCQ("Trong rổ có " + start + " quả cam. " + name + " gấp đôi số cam trong rổ rồi chia đều cho " + k + " bạn. Mỗi bạn được bao nhiêu quả cam?",
      per, [per + 1, per - 1, start, per * 2],
      "Gấp đôi số cam được " + start + " × 2 = " + (start * 2) + " quả. Chia đều cho " + k + " bạn: " + (start * 2) + " : " + k + " = " + per + " quả.", {});
    return tag(q, "th-toando", "gap-doi-chia");
  }
  function gChiaKeo() {
    var k = cdPick([3, 4, 5, 6, 7, 8]);
    var per = cdRand(2, 9), r = cdRand(1, k - 1);
    var total = per * k + r;
    var ask = cdPick(["per", "du", "them"]);
    var name = cdPick(cdNames);
    var base = name + " có " + total + " viên kẹo, chia đều cho " + k + " bạn. ";
    if (ask === "per") {
      var q = cdMCQ(base + "Mỗi bạn được bao nhiêu viên kẹo?", per, [per + 1, per - 1, total, r],
        total + " : " + k + " = " + per + " (dư " + r + "), nên mỗi bạn được " + per + " viên kẹo.", {});
      return tag(q, "th-toando", "chia-hoi-moi-ban");
    }
    if (ask === "du") {
      var q2 = cdMCQ(base + "Còn thừa bao nhiêu viên kẹo?", r, [r + 1, k - r, per, 0].filter(function (v, i, arr) { return arr.indexOf(v) === i; }),
        k + " bạn mỗi bạn " + per + " viên là " + (per * k) + " viên. Còn thừa " + total + " − " + (per * k) + " = " + r + " viên.", {});
      return tag(q2, "th-toando", "chia-hoi-du");
    }
    var q3 = cdMCQ(base + "Muốn chia hết cho " + k + " bạn, không thừa viên nào, " + name + " cần thêm bao nhiêu viên kẹo nữa?", k - r, [r, k - r + 1, k, 1],
      "Chia đều còn thừa " + r + " viên. Muốn đủ một lượt chia nữa cần thêm " + k + " − " + r + " = " + (k - r) + " viên.", {});
    return tag(q3, "th-toando", "chia-hoi-them");
  }
  function gTrongCay() {
    var gap = cdPick([3, 4, 5, 6, 8, 10]);
    var spans = cdRand(3, 10);
    var L = gap * spans;
    var twoEnds = Math.random() < 0.6;
    var ans = twoEnds ? spans + 1 : spans - 1;
    var q = cdMCQ("Một con đường dài " + L + " m. Người ta trồng cây cách đều nhau " + gap + " m dọc một bên đường. " + (twoEnds ? "Ở hai đầu đường đều có trồng cây." : "Ở hai đầu đường đều không trồng cây (cây chỉ trồng ở giữa các khoảng).") + " Hỏi trồng được bao nhiêu cây?",
      ans, [spans, ans + 1, ans - 1, L],
      "Đường được chia thành " + L + " : " + gap + " = " + spans + " khoảng. " + (twoEnds ? "Trồng ở cả hai đầu nên số cây hơn số khoảng 1 cây: " + spans + " + 1 = " + ans + " cây." : "Không trồng ở hai đầu nên số cây kém số khoảng 1 cây: " + spans + " − 1 = " + ans + " cây."), {});
    return tag(q, "th-toando", twoEnds ? "cay-hai-dau" : "cay-khong-dau");
  }
  function gTuoiGap() {
    var a = cdRand(3, 12), k = cdPick([2, 3, 4, 5]);
    var anh = a * k;
    var askTong = Math.random() < 0.5;
    var q = cdMCQ("Em năm nay " + a + " tuổi. Tuổi anh gấp " + k + " lần tuổi em. " + (askTong ? "Cả hai anh em bao nhiêu tuổi?" : "Anh năm nay bao nhiêu tuổi?"),
      askTong ? a + anh : anh, [anh + 1, anh - 1, a + k, anh + k],
      askTong ? "Tuổi anh là " + a + " × " + k + " = " + anh + " tuổi. Cả hai anh em: " + a + " + " + anh + " = " + (a + anh) + " tuổi." : "Tuổi anh là " + a + " × " + k + " = " + anh + " tuổi.", {});
    return tag(q, "th-toando", askTong ? "tuoi-tong" : "tuoi-anh");
  }
  function gToandoBlank() {
    var it = cdPick(ITEMS), n = cdRand(2, 8), price = it[1];
    var cost = n * price;
    var note = cost <= 45 ? 50 : 100;
    var change = note - cost;
    var vis = sent("Mua hàng hết " + cost + " nghìn đồng, đưa tờ " + note + " nghìn đồng, tiền trả lại là " + blankSlot() + " nghìn đồng.");
    var q = cdBlank("Bạn mua " + n + " " + it[0] + ", mỗi cái " + price + " nghìn đồng. Điền số tiền được trả lại nhé!", change, [change + 1, change - 1, cost, change + price],
      "Tiền mua hàng là " + n + " × " + price + " = " + cost + " nghìn đồng. Tiền trả lại: " + note + " − " + cost + " = " + change + " nghìn đồng.", vis);
    return tag(q, "th-toando", "blank-tien-le");
  }
  function gToandoMatch() {
    var scenes = [
      ["Mua 3 cây bút, mỗi cây 4 nghìn đồng", "12 nghìn đồng"],
      ["Chia đều 20 viên kẹo cho 5 bạn, mỗi bạn", "4 viên kẹo"],
      ["Gấp đôi của 7", "14"],
      ["Một tá trứng có", "12 quả"],
      ["Nửa của 18", "9"],
      ["Gấp ba của 6", "18"],
      ["Chia đều 24 quả cho 4 bạn, mỗi bạn", "6 quả"],
      ["Mua 2 quyển vở, mỗi quyển 7 nghìn đồng", "14 nghìn đồng"]
    ];
    var chosen = cdShuffle(scenes).slice(0, 4);
    if (new Set(chosen.map(function (s) { return s[1]; })).size < 4) return null;
    var q = cdMatch("Nối mỗi tình huống với kết quả đúng nhé!", chosen,
      "Tính từng tình huống: nhân số lượng với giá, hoặc chia đều, rồi nối với kết quả.");
    return tag(q, "th-toando", "match");
  }
  function gToandoTF() {
    var name = cdPick(cdNames);
    var n = cdRand(10, 30), k = cdPick([2, 3, 4, 5]);
    var half = n % 2 === 0 ? n / 2 : null;
    var per = Math.floor(n / k), r = n % k;
    var stmts = [];
    stmts.push({ t: name + " có " + n + " viên bi, chia đều cho " + k + " bạn thì mỗi bạn được " + per + " viên.", f: name + " có " + n + " viên bi, chia đều cho " + k + " bạn thì mỗi bạn được " + (per + 1) + " viên.", e: n + " : " + k + " = " + per + " (dư " + r + "), mỗi bạn được " + per + " viên." });
    stmts.push({ t: "Chia " + n + " viên bi cho " + k + " bạn" + (r ? " còn thừa " + r + " viên." : " thì vừa hết, không thừa viên nào."), f: "Chia " + n + " viên bi cho " + k + " bạn" + (r ? " thì vừa hết, không thừa viên nào." : " còn thừa 1 viên."), e: n + " : " + k + " được " + per + ", dư " + r + "." });
    stmts.push({ t: "Gấp đôi của " + n + " là " + (n * 2) + ".", f: "Gấp đôi của " + n + " là " + (n * 2 + 2) + ".", e: "Gấp đôi nghĩa là nhân 2: " + n + " × 2 = " + (n * 2) + "." });
    var pat = cdPick([[true, true, false], [true, false, true], [false, true, true], [false, true, false]]);
    var rounds = stmts.map(function (s, i) { return { stmt: pat[i] ? s.t : s.f, truth: pat[i], explain: s.e }; });
    return tag(cdTF(rounds), "th-toando", "tf");
  }

  /* ================= (d) ĐẾM HÌNH & HÌNH HỌC TƯ DUY ================= */
  function comb2(n) { return n * (n - 1) / 2; }
  function triSVG(m) {
    var W = 240, H = 150, apex = 120, top = 18, base = 128;
    var rays = m + 2;
    var s = figOpen("0 0 " + W + " " + H, "Hình tam giác được chia bởi các đường từ đỉnh");
    for (var i = 0; i < rays; i++) {
      var x = 30 + i * ((W - 60) / (rays - 1));
      s += '<line x1="' + apex + '" y1="' + top + '" x2="' + x + '" y2="' + base + '" stroke="#2f6db3" stroke-width="2"/>';
    }
    s += '<line x1="30" y1="' + base + '" x2="' + (W - 30) + '" y2="' + base + '" stroke="#2f6db3" stroke-width="2"/>';
    s += figText(apex, top - 4, "A", "middle", 13, "#33302a");
    return s + "</svg>";
  }
  function gDemTamGiac() {
    var m = cdPick([1, 2, 3, 4]);
    var rays = m + 2;
    var ans = comb2(rays);
    var q = cdMCQ("Trong hình tam giác lớn, từ đỉnh A kẻ " + (m === 1 ? "một đường" : m + " đường") + " xuống cạnh đáy. Đếm tất cả các hình tam giác có đỉnh A trong hình. Có bao nhiêu hình tam giác?",
      ans, [m + 1, ans + 1, ans - 1, rays],
      "Cạnh đáy được chia thành " + (m + 1) + " đoạn. Mỗi hình tam giác chọn 2 trong " + rays + " đường từ đỉnh A, nên có " + rays + " × " + (rays - 1) + " : 2 = " + ans + " hình tam giác.",
      { figure: triSVG(m), figureOnly: true });
    return tag(q, "th-demhinh", "tam-giac-tia");
  }
  function gridSVG(cols, rows, squares) {
    var cell = 34, x0 = 40, y0 = 16, W = x0 * 2 + cols * cell, H = y0 * 2 + rows * cell;
    var s = figOpen("0 0 " + W + " " + H, squares ? "Lưới ô vuông" : "Lưới hình chữ nhật");
    s += '<rect x="' + x0 + '" y="' + y0 + '" width="' + cols * cell + '" height="' + rows * cell + '" fill="#dcecfb" stroke="#2f6db3" stroke-width="2"/>';
    for (var i = 1; i < cols; i++) s += '<line x1="' + (x0 + i * cell) + '" y1="' + y0 + '" x2="' + (x0 + i * cell) + '" y2="' + (y0 + rows * cell) + '" stroke="#2f6db3" stroke-width="1.5"/>';
    for (var j = 1; j < rows; j++) s += '<line x1="' + x0 + '" y1="' + (y0 + j * cell) + '" x2="' + (x0 + cols * cell) + '" y2="' + (y0 + j * cell) + '" stroke="#2f6db3" stroke-width="1.5"/>';
    return s + "</svg>";
  }
  function gDemChuNhat() {
    var cols = cdPick([2, 3, 4]), rows = cdPick([2, 3]);
    var ans = comb2(cols + 1) * comb2(rows + 1);
    var q = cdMCQ("Hình dưới là một lưới " + cols + " cột × " + rows + " hàng ô chữ nhật. Đếm tất cả các hình chữ nhật trong hình (kể cả hình lớn nhất). Có bao nhiêu hình chữ nhật?",
      ans, [cols * rows, ans + comb2(rows + 1), ans - comb2(cols + 1), ans + 3],
      "Một hình chữ nhật được chọn bởi 2 đường dọc trong " + (cols + 1) + " đường và 2 đường ngang trong " + (rows + 1) + " đường: " + comb2(cols + 1) + " × " + comb2(rows + 1) + " = " + ans + ".",
      { figure: gridSVG(cols, rows, false), figureOnly: true });
    return tag(q, "th-demhinh", "luoi-chunhat");
  }
  function gDemVuong() {
    var a = cdPick([2, 3, 4]);
    var ans = 0; for (var k = 1; k <= a; k++) ans += (a - k + 1) * (a - k + 1);
    var parts = []; for (var k2 = 1; k2 <= a; k2++) parts.push((a - k2 + 1) * (a - k2 + 1));
    var q = cdMCQ("Hình dưới là một lưới ô vuông " + a + " × " + a + ". Đếm tất cả các hình vuông trong hình. Có bao nhiêu hình vuông?",
      ans, [a * a, ans + a, parts[0] + parts[parts.length - 1], ans - 1],
      "Đếm theo kích thước: " + parts.join(" + ") + " = " + ans + " hình vuông (ô nhỏ, rồi hình ghép 2 × 2, …).",
      { figure: gridSVG(a, a, true), figureOnly: true });
    return tag(q, "th-demhinh", "luoi-vuong");
  }
  function gChuViSuyLuan() {
    var kind = cdPick(["rect", "square"]);
    if (kind === "square") {
      var side = cdRand(3, 25), P = side * 4;
      var q = cdMCQ("Một hình vuông có chu vi " + P + " cm. Cạnh của hình vuông dài bao nhiêu xăng-ti-mét?",
        side, [side + 1, side - 1, P / 2, side * 2],
        "Hình vuông có 4 cạnh bằng nhau nên mỗi cạnh là " + P + " : 4 = " + side + " cm.", {});
      return tag(q, "th-demhinh", "chu-vi-vuong");
    }
    var s = cdRand(3, 20), o = cdRand(3, 20);
    var P2 = 2 * (s + o);
    var askOther = Math.random() < 0.5;
    var known = askOther ? s : o, ans = askOther ? o : s;
    var q2 = cdMCQ("Một hình chữ nhật có chu vi " + P2 + " cm, một cạnh dài " + known + " cm. Cạnh còn lại dài bao nhiêu xăng-ti-mét?",
      ans, [ans + 2, ans - 2 < 0 ? ans + 4 : ans - 2, P2 / 2, known],
      "Nửa chu vi là " + P2 + " : 2 = " + (P2 / 2) + " cm. Cạnh còn lại: " + (P2 / 2) + " − " + known + " = " + ans + " cm.", {});
    return tag(q2, "th-demhinh", "chu-vi-chunhat");
  }
  function lshapeSVG(W, H, w, h) {
    var sc = 9, x0 = 46, y0 = 14;
    var pts = [[0, 0], [W, 0], [W, H - h], [W - w, H - h], [W - w, H], [0, H]];
    var s = figOpen("0 0 " + (x0 * 2 + W * sc) + " " + (y0 * 2 + H * sc + 8), "Hình chữ L");
    s += '<polygon points="' + pts.map(function (p) { return (x0 + p[0] * sc) + "," + (y0 + p[1] * sc); }).join(" ") + '" fill="#dcecfb" stroke="#2f6db3" stroke-width="2"/>';
    s += figText(x0 + W * sc / 2, y0 - 3, W + " cm", "middle", 12, "#33302a");
    s += figText(x0 - 6, y0 + H * sc / 2, H + " cm", "end", 12, "#33302a");
    s += figText(x0 + (W - w / 2) * sc, y0 + (H - h) * sc - 4, w + " cm", "middle", 11, "#e4572e");
    s += figText(x0 + (W - w) * sc + 4, y0 + (H - h / 2) * sc, h + " cm", "start", 11, "#e4572e");
    return s + "</svg>";
  }
  function gDienTichL() {
    var W = cdRand(8, 14), H = cdRand(6, 10), w = cdRand(3, W - 4), h = cdRand(2, H - 3);
    var ans = W * H - w * h;
    var q = cdMCQ("Hình dưới là một hình chữ L: hình chữ nhật lớn " + W + " cm × " + H + " cm bị khuyết một góc hình chữ nhật " + w + " cm × " + h + " cm (phần khuyết ghi số đo màu cam). Diện tích hình chữ L là bao nhiêu xăng-ti-mét vuông?",
      ans, [W * H, ans + w * h, W * H - w - h, ans - w],
      "Lấy diện tích hình lớn trừ phần khuyết: " + W + " × " + H + " − " + w + " × " + h + " = " + (W * H) + " − " + (w * h) + " = " + ans + " cm².",
      { figure: lshapeSVG(W, H, w, h), figureOnly: true });
    return tag(q, "th-demhinh", "dien-tich-L");
  }
  function gDemhinhBlank() {
    var cols = cdPick([2, 3]), rows = 2;
    var ans = comb2(cols + 1) * comb2(rows + 1);
    var vis = sent("Lưới " + cols + " cột × " + rows + " hàng có tất cả " + blankSlot() + " hình chữ nhật.");
    var q = cdBlank("Điền số hình chữ nhật đếm được trong lưới nhé!", ans, [cols * rows, ans + 3, ans - 3, ans + 6],
      "Chọn 2 đường dọc trong " + (cols + 1) + " đường và 2 đường ngang trong " + (rows + 1) + " đường: " + comb2(cols + 1) + " × " + comb2(rows + 1) + " = " + ans + ".", vis);
    return tag(q, "th-demhinh", "blank-luoi");
  }
  function gDemhinhMatch() {
    var cases = [
      ["Lưới chữ nhật 2 cột × 2 hàng", comb2(3) * comb2(3)],
      ["Lưới chữ nhật 3 cột × 2 hàng", comb2(4) * comb2(3)],
      ["Lưới chữ nhật 4 cột × 2 hàng", comb2(5) * comb2(3)],
      ["Tam giác kẻ 1 đường từ đỉnh xuống đáy", comb2(3)],
      ["Tam giác kẻ 2 đường từ đỉnh xuống đáy", comb2(4)],
      ["Tam giác kẻ 3 đường từ đỉnh xuống đáy", comb2(5)],
      ["Lưới ô vuông 2 × 2 (số hình vuông)", 5],
      ["Lưới ô vuông 3 × 3 (số hình vuông)", 14]
    ];
    var chosen = cdShuffle(cases).slice(0, 4);
    if (new Set(chosen.map(function (c) { return String(c[1]); })).size < 4) return null;
    var pairs = chosen.map(function (c) { return [c[0], String(c[1])]; });
    var q = cdMatch("Nối mỗi hình với số hình đếm được nhé!", pairs,
      "Nhớ cách đếm: lưới chữ nhật — chọn 2 đường dọc × 2 đường ngang; tam giác chia từ đỉnh — chọn 2 đường trong các đường từ đỉnh.");
    return tag(q, "th-demhinh", "match");
  }
  function gDemhinhTF() {
    var cols = cdPick([2, 3]), rows = 2;
    var rects = comb2(cols + 1) * comb2(rows + 1);
    var sq2 = 5, sq3 = 14;
    var stmts = [
      { t: "Lưới chữ nhật 2 cột × 2 hàng có " + (comb2(3) * comb2(3)) + " hình chữ nhật.", f: "Lưới chữ nhật 2 cột × 2 hàng có " + (comb2(3) * comb2(3) - 1) + " hình chữ nhật.", e: "Chọn 2 trong 3 đường dọc và 2 trong 3 đường ngang: 3 × 3 = 9 hình chữ nhật." },
      { t: "Lưới ô vuông 2 × 2 có 5 hình vuông.", f: "Lưới ô vuông 2 × 2 có 4 hình vuông.", e: "Có 4 ô vuông nhỏ và 1 hình vuông lớn ghép từ 4 ô: tất cả 5 hình vuông." },
      { t: "Lưới ô vuông 3 × 3 có 14 hình vuông.", f: "Lưới ô vuông 3 × 3 có 9 hình vuông.", e: "Đếm theo cỡ: 9 ô nhỏ + 4 hình 2 × 2 + 1 hình 3 × 3 = 14 hình vuông." },
      { t: "Hình vuông có chu vi 20 cm thì cạnh dài 5 cm.", f: "Hình vuông có chu vi 20 cm thì cạnh dài 4 cm.", e: "Cạnh hình vuông bằng chu vi chia 4: 20 : 4 = 5 cm." }
    ];
    var chosen = cdShuffle(stmts).slice(0, 3);
    var pat = cdPick([[true, true, false], [true, false, true], [false, true, true], [false, false, true]]);
    var rounds = chosen.map(function (s, i) { return { stmt: pat[i] ? s.t : s.f, truth: pat[i], explain: s.e }; });
    return tag(cdTF(rounds), "th-demhinh", "tf");
  }

  /* ================= (e) LOGIC THỨ TỰ & LOẠI TRỪ ================= */
  var RANKLBL = ["cao nhất", "cao thứ hai", "cao thứ ba", "thấp nhất"];
  function perms(arr) {
    if (arr.length <= 1) return [arr];
    var out = [];
    arr.forEach(function (x, i) {
      var rest = arr.slice(0, i).concat(arr.slice(i + 1));
      perms(rest).forEach(function (p) { out.push([x].concat(p)); });
    });
    return out;
  }
  function makeOrderScenario() {
    for (var tries = 0; tries < 80; tries++) {
      var kids = cdShuffle(cdNames).slice(0, 4);
      var order = cdShuffle(kids); /* order[0] = cao nhất */
      var pos = {}; order.forEach(function (nm, i) { pos[nm] = i; });
      var clues = [];
      for (var i = 0; i < 3; i++) clues.push([order[i], order[i + 1]]); /* A cao hơn B */
      if (Math.random() < 0.5) clues.push([order[0], order[3]]);
      clues = cdShuffle(clues);
      /* kiểm duy nhất: liệt kê mọi hoán vị thỏa manh mối */
      var sols = perms(kids).filter(function (p) {
        var pp = {}; p.forEach(function (nm, ix) { pp[nm] = ix; });
        return clues.every(function (c) { return pp[c[0]] < pp[c[1]]; });
      });
      if (sols.length === 1) return { kids: kids, order: order, pos: pos, clues: clues };
    }
    return null;
  }
  function clueText(sc) {
    return sc.clues.map(function (c) { return c[0] + " cao hơn " + c[1]; }).join(". ") + ".";
  }
  function gLogicThuTu() {
    var sc = makeOrderScenario(); if (!sc) return null;
    var ask = cdPick(["max", "min", "rank"]);
    var q;
    if (ask === "max") {
      q = cdMCQ("Bốn bạn " + sc.kids.join(", ") + " có chiều cao khác nhau. Biết: " + clueText(sc) + " Bạn nào cao nhất?",
        sc.order[0], sc.kids.filter(function (k) { return k !== sc.order[0]; }),
        "Xếp theo manh mối: " + sc.order.join(" cao hơn ") + ". Vậy " + sc.order[0] + " cao nhất.", {});
      return tag(q, "th-logic", "cao-nhat");
    }
    if (ask === "min") {
      q = cdMCQ("Bốn bạn " + sc.kids.join(", ") + " có chiều cao khác nhau. Biết: " + clueText(sc) + " Bạn nào thấp nhất?",
        sc.order[3], sc.kids.filter(function (k) { return k !== sc.order[3]; }),
        "Xếp theo manh mối: " + sc.order.join(" cao hơn ") + ". Vậy " + sc.order[3] + " thấp nhất.", {});
      return tag(q, "th-logic", "thap-nhat");
    }
    var who = sc.order[cdPick([1, 2])];
    q = cdMCQ("Bốn bạn " + sc.kids.join(", ") + " có chiều cao khác nhau. Biết: " + clueText(sc) + " " + who + " cao thứ mấy (tính từ cao xuống thấp)?",
      "Thứ " + (sc.pos[who] + 1), ["Thứ 1", "Thứ 2", "Thứ 3", "Thứ 4"].filter(function (r) { return r !== "Thứ " + (sc.pos[who] + 1); }),
      "Thứ tự từ cao xuống thấp: " + sc.order.join(", ") + ". Vậy " + who + " đứng thứ " + (sc.pos[who] + 1) + ".", {});
    return tag(q, "th-logic", "thu-may");
  }
  function gLogicBlank() {
    var sc = makeOrderScenario(); if (!sc) return null;
    var who = sc.order[1];
    var vis = sent("Thứ tự từ cao xuống thấp: " + blankSlot() + " là bạn cao thứ hai.");
    var q = cdBlank("Bốn bạn " + sc.kids.join(", ") + " có chiều cao khác nhau. Biết: " + clueText(sc) + " Điền tên bạn cao thứ hai nhé!",
      who, sc.kids.filter(function (k) { return k !== who; }),
      "Xếp theo manh mối: " + sc.order.join(" cao hơn ") + ". Bạn cao thứ hai là " + who + ".", vis);
    return tag(q, "th-logic", "blank-thu-hai");
  }
  function gLogicMatch() {
    var sc = makeOrderScenario(); if (!sc) return null;
    var pairs = sc.order.map(function (nm, i) { return [nm, RANKLBL[i]]; });
    var q = cdMatch("Bốn bạn " + sc.kids.join(", ") + " có chiều cao khác nhau. Biết: " + clueText(sc) + " Nối mỗi bạn với vị trí đúng nhé!", pairs,
      "Xếp thứ tự đầy đủ: " + sc.order.join(" cao hơn ") + " rồi nối từng bạn với vị trí tương ứng.");
    return tag(q, "th-logic", "match");
  }
  function gLogicTF() {
    var sc = makeOrderScenario(); if (!sc) return null;
    var o = sc.order;
    var stmts = [
      { t: o[0] + " cao hơn " + o[2] + ".", f: o[2] + " cao hơn " + o[0] + ".", e: "Thứ tự đúng: " + o.join(" cao hơn ") + "." },
      { t: o[3] + " thấp hơn " + o[1] + ".", f: o[1] + " thấp hơn " + o[3] + ".", e: "Thứ tự đúng: " + o.join(" cao hơn ") + "." },
      { t: o[1] + " cao thứ hai.", f: o[2] + " cao thứ hai.", e: o[1] + " đứng thứ hai từ trên xuống; " + o[2] + " đứng thứ ba." }
    ];
    var pat = cdPick([[true, true, false], [true, false, true], [false, true, true], [true, false, false]]);
    var rounds = stmts.map(function (s, i) { return { stmt: pat[i] ? s.t : s.f, truth: pat[i], explain: s.e }; });
    var q = cdTF(rounds, "Đúng hay sai? Bốn bạn " + sc.kids.join(", ") + ". Biết: " + clueText(sc));
    return tag(q, "th-logic", "tf");
  }
  var PETS = ["chó", "mèo", "cá", "chim", "thỏ"];
  function gLogicVat() {
    for (var tries = 0; tries < 120; tries++) {
      var kids = cdShuffle(cdNames).slice(0, 3);
      var pets = cdShuffle(PETS).slice(0, 3);
      var assign = {}; kids.forEach(function (k, i) { assign[k] = pets[i]; });
      /* manh mối: 2 phủ định + 1 khẳng định, kiểm duy nhất bằng liệt kê */
      var neg = [];
      var cand = [];
      kids.forEach(function (k) { pets.forEach(function (p) { if (assign[k] !== p) cand.push([k, p]); }); });
      cand = cdShuffle(cand);
      neg = cand.slice(0, 2);
      var posKid = cdPick(kids);
      var clues = neg.map(function (n) { return { txt: n[0] + " không nuôi " + n[1], test: function (a) { return a[n[0]] !== n[1]; } }; });
      clues.push({ txt: posKid + " nuôi " + assign[posKid], test: function (a) { return a[posKid] === assign[posKid]; } });
      var sols = perms(pets).filter(function (p) {
        var a = {}; kids.forEach(function (k, i) { a[k] = p[i]; });
        return clues.every(function (c) { return c.test(a); });
      });
      if (sols.length !== 1) continue;
      var askKid = cdPick(kids.filter(function (k) { return k !== posKid; }));
      var clueTxt = cdShuffle(clues).map(function (c) { return c.txt; }).join(". ") + ".";
      var q = cdMCQ("Ba bạn " + kids.join(", ") + " nuôi ba con vật khác nhau: " + pets.join(", ") + " (mỗi bạn một con). Biết: " + clueTxt + " " + askKid + " nuôi con gì?",
        assign[askKid], pets.filter(function (p) { return p !== assign[askKid]; }),
        "Loại trừ theo manh mối: " + kids.map(function (k) { return k + " nuôi " + assign[k]; }).join(", ") + ". Vậy " + askKid + " nuôi " + assign[askKid] + ".", {});
      return tag(q, "th-logic", "loai-tru-vat");
    }
    return null;
  }

  /* ================= ĐĂNG KÝ CHỦ ĐỀ + BAND ================= */
  var topics = [
    { id: "cd-th-dayso", emoji: "🔢", name: "Dãy số & quy luật", sub: "Tìm số tiếp theo, số còn thiếu trong dãy số",
      pools: { choose: [gDaysoCong, gDaysoCongXuong, gDaysoHieuTang, gDaysoNhan], blank: [gDaysoBlank], match: [gDaysoMatch], games: [gDaysoTF] },
      knowledge: { notes: ["Nhìn hiệu hai số liền nhau: nếu hiệu không đổi, dãy cộng đều — cộng thêm hiệu đó.", "Nếu hiệu tăng dần đều (1, 2, 3, …) thì cộng hiệu tiếp theo lớn hơn.", "Dãy gấp đôi/gấp ba: mỗi số nhân với cùng một số.", "Muốn chắc, thử quy luật với cả dãy đã cho trước khi kết luận."],
        facts: [{ q: "Dãy 5, 9, 13, 17, … Số tiếp theo là bao nhiêu?", a: "21", ex: "Mỗi số hơn số trước 4 đơn vị: 17 + 4 = 21." }, { q: "Dãy 2, 3, 5, 8, 12, … Số tiếp theo là bao nhiêu?", a: "17", ex: "Hiệu tăng dần 1, 2, 3, 4 rồi 5: 12 + 5 = 17." }],
        pairs: [["Dãy cộng đều", "Hiệu hai số liền nhau không đổi"], ["Dãy hiệu tăng dần", "Hiệu lớn dần theo thứ tự"], ["Dãy gấp đôi", "Mỗi số × 2"], ["Kiểm tra quy luật", "Thử với mọi số đã cho"]] } },
    { id: "cd-th-thieuso", emoji: "🔍", name: "Tìm số còn thiếu", sub: "Tìm số trong ô trống bằng phép tính ngược",
      pools: { choose: [gThieuMotBuoc, gThieuHaiBuoc, gThieuCan], blank: [gThieuBlank], match: [gThieuMatch], games: [gThieuTF] },
      knowledge: { notes: ["Tìm số hạng chưa biết: lấy tổng trừ số hạng đã biết.", "Tìm số bị trừ: lấy hiệu cộng số trừ. Tìm số trừ: lấy số bị trừ trừ hiệu.", "Tìm thừa số chưa biết: lấy tích chia thừa số đã biết. Tìm số chia: lấy số bị chia chia thương.", "Phép tính hai bước: gộp về một bước trước (ví dụ □ × a = c ∓ b) rồi mới tính ngược."],
        facts: [{ q: "□ + 28 = 75. Số trong ô trống là bao nhiêu?", a: "47", ex: "Lấy tổng trừ số hạng đã biết: 75 − 28 = 47." }, { q: "□ × 6 − 4 = 32. Số trong ô trống là bao nhiêu?", a: "6", ex: "□ × 6 = 32 + 4 = 36; 36 : 6 = 6." }],
        pairs: [["□ + a = b", "□ = b − a"], ["□ − a = b", "□ = b + a"], ["□ × a = b", "□ = b : a"], ["b : □ = c", "□ = b : c"]] } },
    { id: "cd-th-toando", emoji: "🧺", name: "Toán đố suy luận", sub: "Bài toán hai bước: mua bán, chia đều, trồng cây",
      pools: { choose: [gMuaBan, gGapChia, gChiaKeo, gTrongCay, gTuoiGap], blank: [gToandoBlank], match: [gToandoMatch], games: [gToandoTF] },
      knowledge: { notes: ["Đọc đề chậm, gạch chân số đã biết và điều cần tìm.", "Bài hai bước: làm bước trong ngoặc đơn trong đầu trước (tính tổng tiền, gấp đôi…) rồi mới làm bước sau.", "Trồng cây hai đầu đường: số cây = số khoảng + 1; không trồng hai đầu: số cây = số khoảng − 1.", "Chia có dư: muốn chia hết thì thêm vào cho tròn một lượt chia nữa."],
        facts: [{ q: "Mua 4 cây bút, mỗi cây 5 nghìn đồng, đưa tờ 50 nghìn. Trả lại bao nhiêu?", a: "30 nghìn đồng", ex: "Tiền mua: 4 × 5 = 20 nghìn. Trả lại: 50 − 20 = 30 nghìn đồng." }, { q: "Đường dài 40 m, trồng cây cách đều 5 m, cả hai đầu đều trồng. Bao nhiêu cây?", a: "9 cây", ex: "Số khoảng: 40 : 5 = 8. Số cây = 8 + 1 = 9 cây." }],
        pairs: [["Tiền trả lại", "Tiền đưa − tiền mua"], ["Số khoảng cách", "Độ dài : khoảng cách"], ["Cây hai đầu đường", "Số khoảng + 1"], ["Chia có dư", "Thương và phần còn thừa"]] } },
    { id: "cd-th-demhinh", emoji: "📐", name: "Đếm hình & hình học tư duy", sub: "Đếm tam giác, hình chữ nhật trong lưới, chu vi suy luận",
      pools: { choose: [gDemTamGiac, gDemChuNhat, gDemVuong, gChuViSuyLuan, gDienTichL], blank: [gDemhinhBlank], match: [gDemhinhMatch], games: [gDemhinhTF] },
      knowledge: { notes: ["Đếm hình: đếm theo thứ tự kích thước (nhỏ trước, ghép lớn sau) để không sót, không trùng.", "Lưới chữ nhật: một hình chữ nhật chọn 2 đường dọc và 2 đường ngang.", "Tam giác chia từ một đỉnh: mỗi hình tam giác chọn 2 đường trong các đường kẻ từ đỉnh.", "Chu vi hình chữ nhật: nửa chu vi = dài + rộng; biết nửa chu vi và một cạnh thì trừ ra cạnh kia."],
        facts: [{ q: "Lưới ô vuông 2 × 2 có bao nhiêu hình vuông?", a: "5 hình vuông", ex: "4 ô nhỏ + 1 hình lớn ghép từ 4 ô = 5." }, { q: "Hình chữ nhật có chu vi 30 cm, một cạnh 8 cm. Cạnh còn lại dài bao nhiêu?", a: "7 cm", ex: "Nửa chu vi: 30 : 2 = 15 cm. Cạnh còn lại: 15 − 8 = 7 cm." }],
        pairs: [["Đếm hình nhỏ trước", "Rồi đến hình ghép lớn"], ["Nửa chu vi chữ nhật", "Dài + rộng"], ["Cạnh hình vuông", "Chu vi : 4"], ["Diện tích hình ghép", "Cộng hoặc trừ các phần"]] } },
    { id: "cd-th-logic", emoji: "🧩", name: "Logic thứ tự & loại trừ", sub: "Xếp thứ tự từ manh mối, loại trừ tìm đáp án",
      pools: { choose: [gLogicThuTu, gLogicVat], blank: [gLogicBlank], match: [gLogicMatch], games: [gLogicTF] },
      knowledge: { notes: ["Viết các manh mối thành một hàng: ai đứng trước, ai đứng sau.", "Nối các manh mối có chung một bạn để thành một dãy dài.", "Câu loại trừ: gạch bỏ khả năng sai theo từng manh mối, khả năng còn lại duy nhất là đáp án.", "Kiểm lại đáp án với TẤT CẢ manh mối trước khi chọn."],
        facts: [{ q: "An cao hơn Bình. Bình cao hơn Chi. Ai cao nhất, ai thấp nhất?", a: "An cao nhất, Chi thấp nhất", ex: "Nối hai manh mối: An cao hơn Bình cao hơn Chi." }, { q: "Ba bạn nuôi chó, mèo, cá. An không nuôi chó, Bình nuôi cá. An nuôi con gì?", a: "Mèo", ex: "Bình nuôi cá; An không nuôi chó nên An nuôi mèo, còn lại chó cho bạn thứ ba." }],
        pairs: [["Manh mối 'cao hơn'", "Viết thành dấu > giữa hai bạn"], ["Nối manh mối", "Gộp thành một dãy thứ tự"], ["Loại trừ", "Gạch khả năng sai, giữ khả năng còn lại"], ["Kiểm tra cuối", "Đối chiếu mọi manh mối"]] } }
  ];
  window.__CD_BANDS.push({ id: "th", name: "Toán tư duy Tiểu học (Lớp 3–5)", grades: [3, 4, 5], topics: topics });
})();
/* ================================================================
   CHUYÊN ĐỀ TOÁN TƯ DUY — DẢI THCS (Lớp 6–9)
   Đoạn của assets/data/chuyende.js. Câu hỏi tự viết mới.
   ================================================================ */
(function () {
  "use strict";
  function tag(q, fam, v) { if (q) { q.__fam = fam; q.__var = v; } return q; }
  function sent(html) { return '<div class="sentence">' + html + "</div>"; }
  function comb2(n) { return n * (n - 1) / 2; }
  function Cnk(n, k) { var r = 1; for (var i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); }
  function perms(arr) {
    if (arr.length <= 1) return [arr.slice()];
    var out = [];
    arr.forEach(function (x, i) { var rest = arr.slice(0, i).concat(arr.slice(i + 1)); perms(rest).forEach(function (p) { out.push([x].concat(p)); }); });
    return out;
  }

  /* ================= (a) DÃY SỐ & QUY LUẬT NÂNG CAO ================= */
  function fibSeq(s1, s2, n) { var t = [s1, s2]; while (t.length < n) t.push(t[t.length - 1] + t[t.length - 2]); return t; }
  function gFib() {
    var s1 = cdRand(1, 5), s2 = s1 + cdRand(1, 4);
    var t = fibSeq(s1, s2, 6);
    var askSum = Math.random() < 0.3;
    if (askSum) {
      var sum5 = t.slice(0, 5).reduce(function (x, y) { return x + y; }, 0);
      var q = cdMCQ("Cho dãy số: " + t.slice(0, 5).join(", ") + ", … (từ số thứ ba, mỗi số bằng tổng hai số đứng trước). Tổng của 5 số đầu tiên trong dãy là bao nhiêu?",
        sum5, [sum5 + t[0], sum5 - t[4], sum5 + 2, t[5]],
        "Năm số đầu là " + t.slice(0, 5).join(", ") + ". Cộng lại: " + sum5 + ".", {});
      return tag(q, "thcs-dayso", "fib-tong");
    }
    var q2 = cdMCQ("Cho dãy số: " + t.slice(0, 5).join(", ") + ", … (từ số thứ ba, mỗi số bằng tổng hai số đứng trước). Số tiếp theo là bao nhiêu?",
      t[5], [t[5] + 1, t[5] - 1, t[4] * 2, t[5] + t[0]],
      "Số tiếp theo bằng tổng hai số đứng trước nó: " + t[3] + " + " + t[4] + " = " + t[5] + ".", {});
    return tag(q2, "thcs-dayso", "fib-tiep");
  }
  function gChinhPhuong() {
    var kind = cdPick(["sq", "sq1", "cube", "tri"]);
    var terms, ans, expl;
    if (kind === "sq") { var n0 = cdPick([1, 2, 3]); terms = [0, 1, 2, 3, 4].map(function (i) { return (n0 + i) * (n0 + i); }); ans = (n0 + 5) * (n0 + 5); expl = "Các số là số chính phương liên tiếp: " + terms.join(", ") + " = " + [0, 1, 2, 3, 4].map(function (i) { return (n0 + i) + "²"; }).join(", ") + ". Tiếp theo là " + (n0 + 5) + "² = " + ans + "."; }
    else if (kind === "sq1") { terms = [2, 5, 10, 17, 26]; ans = 37; expl = "Mỗi số bằng số chính phương cộng 1: 1²+1, 2²+1, 3²+1, 4²+1, 5²+1. Tiếp theo: 6² + 1 = 37."; }
    else if (kind === "cube") { terms = [1, 8, 27, 64, 125]; ans = 216; expl = "Các số là lập phương liên tiếp: 1³, 2³, 3³, 4³, 5³. Tiếp theo là 6³ = 216."; }
    else { terms = [1, 3, 6, 10, 15]; ans = 21; expl = "Hiệu tăng dần 2, 3, 4, 5 rồi 6: 15 + 6 = 21 (đây là các số tam giác)."; }
    var q = cdMCQ("Dãy số: " + terms.join(", ") + ", … Số tiếp theo là bao nhiêu?", ans, [ans + 2, ans - 2, ans + 10, terms[4] * 2], expl, {});
    return tag(q, "thcs-dayso", "cp-" + kind);
  }
  var PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67];
  function gNguyenTo() {
    var i0 = cdRand(0, 9);
    var shown = PRIMES.slice(i0, i0 + 5), ans = PRIMES[i0 + 5];
    var cands = [ans + 2, ans + 4, ans - 2, ans + 6].filter(function (v) { return PRIMES.indexOf(v) < 0 && v > shown[4]; });
    var q = cdMCQ("Dãy số: " + shown.join(", ") + ", … là dãy các số nguyên tố tăng dần. Số tiếp theo là bao nhiêu?",
      ans, cands.slice(0, 3),
      "Số nguyên tố là số lớn hơn 1, chỉ có hai ước là 1 và chính nó. Sau " + shown[4] + ", số nguyên tố tiếp theo là " + ans + " (các số ở giữa đều có thêm ước khác).", {});
    return tag(q, "thcs-dayso", "nguyen-to");
  }
  function gDaysoBlank2() {
    var s1 = cdRand(1, 4), s2 = s1 + cdRand(1, 3);
    var t = fibSeq(s1, s2, 5);
    var vis = sent(t[0] + ", " + t[1] + ", " + blankSlot() + ", " + t[3] + ", " + t[4]);
    var q = cdBlank("Dãy số có quy luật: từ số thứ ba, mỗi số bằng tổng hai số đứng trước. Điền số còn thiếu nhé!", t[2], [t[2] + 1, t[2] - 1, t[1] * 2, t[3]],
      "Số còn thiếu bằng tổng hai số đứng trước: " + t[0] + " + " + t[1] + " = " + t[2] + ".", vis);
    return tag(q, "thcs-dayso", "blank-fib");
  }
  function gDaysoMatch2() {
    var cases = [
      ["1, 4, 9, 16, 25, …", 36], ["2, 6, 12, 20, 30, …", 42], ["1, 2, 4, 7, 11, …", 16],
      ["3, 6, 11, 18, 27, …", 38], ["1, 1, 2, 3, 5, …", 8], ["2, 3, 5, 7, 11, …", 13],
      ["1, 8, 27, 64, 125, …", 216], ["5, 10, 20, 40, 80, …", 160]
    ];
    var chosen = cdShuffle(cases).slice(0, 4);
    if (new Set(chosen.map(function (c) { return String(c[1]); })).size < 4) return null;
    var q = cdMatch("Nối mỗi dãy số với số tiếp theo của dãy nhé!", chosen.map(function (c) { return [c[0], String(c[1])]; }),
      "Xác định quy luật từng dãy: chính phương, hiệu tăng dần, dạng Fibonacci, số nguyên tố, gấp đôi.");
    return tag(q, "thcs-dayso", "match");
  }
  function gDaysoTF2() {
    var t = fibSeq(cdRand(1, 3), cdRand(2, 5), 7);
    var stmts = [
      { t: "Số thứ sáu của dãy là " + t[5] + ".", f: "Số thứ sáu của dãy là " + (t[5] + 1) + ".", e: "Dãy đầy đủ: " + t.join(", ") + "." },
      { t: "Số thứ bảy bằng tổng số thứ năm và số thứ sáu.", f: "Số thứ bảy bằng tổng số thứ tư và số thứ sáu.", e: "Mỗi số (từ số thứ ba) bằng tổng hai số ngay trước nó, nên số thứ bảy = số thứ năm + số thứ sáu." },
      { t: "Tổng ba số đầu của dãy là " + (t[0] + t[1] + t[2]) + ".", f: "Tổng ba số đầu của dãy là " + (t[0] + t[1] + t[2] + 2) + ".", e: t[0] + " + " + t[1] + " + " + t[2] + " = " + (t[0] + t[1] + t[2]) + "." }
    ];
    var pat = cdPick([[true, true, false], [true, false, true], [false, true, true], [false, true, false]]);
    var rounds = stmts.map(function (s, i) { return { stmt: pat[i] ? s.t : s.f, truth: pat[i], explain: s.e }; });
    var q = cdTF(rounds, "Đúng hay sai? Dãy số: " + t.slice(0, 5).join(", ") + ", … với quy luật: từ số thứ ba, mỗi số bằng tổng hai số đứng trước.");
    return tag(q, "thcs-dayso", "tf");
  }

  /* ================= (b) SUY LUẬN LOGIC ================= */
  function makeOrder5() {
    for (var tries = 0; tries < 200; tries++) {
      var kids = cdShuffle(cdNames).slice(0, 5);
      var ctx = cdPick(["chạy nhanh", "làm toán nhanh", "hát hay"]);
      var order = cdShuffle(kids);
      var pos = {}; order.forEach(function (nm, i) { pos[nm] = i; });
      var clues = [];
      for (var i = 0; i < 4; i++) clues.push([order[i], order[i + 1]]);
      if (Math.random() < 0.5) clues.push([order[0], order[4]]);
      if (Math.random() < 0.4) clues.push([order[1], order[3]]);
      clues = cdShuffle(clues);
      var sols = perms(kids).filter(function (p) {
        var pp = {}; p.forEach(function (nm, ix) { pp[nm] = ix; });
        return clues.every(function (c) { return pp[c[0]] < pp[c[1]]; });
      });
      if (sols.length === 1) return { kids: kids, order: order, pos: pos, clues: clues, ctx: ctx };
    }
    return null;
  }
  function gOrder5() {
    var sc = makeOrder5(); if (!sc) return null;
    var better = sc.ctx === "chạy nhanh" ? "chạy nhanh hơn" : sc.ctx === "làm toán nhanh" ? "làm toán nhanh hơn" : "hát hay hơn";
    var head = "Năm bạn " + sc.kids.join(", ") + ". Biết: " + sc.clues.map(function (c) { return c[0] + " " + better + " " + c[1]; }).join("; ") + ". ";
    var ask = cdPick(["first", "last", "rank"]);
    var explFull = "Thứ tự từ cao xuống: " + sc.order.join(", ") + ".";
    if (ask === "first") {
      var best = sc.ctx === "chạy nhanh" ? "chạy nhanh nhất" : sc.ctx === "làm toán nhanh" ? "làm toán nhanh nhất" : "hát hay nhất";
      var q = cdMCQ(head + "Bạn nào " + best + "?", sc.order[0], sc.kids.filter(function (k) { return k !== sc.order[0]; }), explFull, {});
      return tag(q, "thcs-logic", "order-first");
    }
    if (ask === "last") {
      var q2 = cdMCQ(head + "Bạn nào đứng cuối trong thứ tự này?", sc.order[4], sc.kids.filter(function (k) { return k !== sc.order[4]; }), explFull, {});
      return tag(q2, "thcs-logic", "order-last");
    }
    var who = sc.order[cdPick([1, 2, 3])];
    var q3 = cdMCQ(head + who + " đứng thứ mấy (từ cao xuống thấp)?", "Thứ " + (sc.pos[who] + 1), ["Thứ 1", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5"].filter(function (r) { return r !== "Thứ " + (sc.pos[who] + 1); }).slice(0, 3), explFull, {});
    return tag(q3, "thcs-logic", "order-rank");
  }
  function vennParams() {
    var both = cdRand(2, 9), onlyA = cdRand(3, 15), onlyB = cdRand(3, 15), neither = cdRand(2, 12);
    return { both: both, onlyA: onlyA, onlyB: onlyB, neither: neither, A: onlyA + both, B: onlyB + both, N: onlyA + onlyB + both + neither };
  }
  function gVenn() {
    var v = vennParams();
    var ask = cdPick(["neither", "onlyA", "total"]);
    var base = "Lớp có " + v.N + " học sinh. Có " + v.A + " bạn tham gia câu lạc bộ Toán, " + v.B + " bạn tham gia câu lạc bộ Tiếng Anh, trong đó " + v.both + " bạn tham gia cả hai câu lạc bộ. ";
    if (ask === "neither") {
      var q = cdMCQ(base + "Có bao nhiêu bạn không tham gia câu lạc bộ nào?", v.neither,
        [v.neither + v.both, v.N - v.A - v.B, v.neither + 2, v.onlyA],
        "Số bạn tham gia ít nhất một câu lạc bộ: " + v.A + " + " + v.B + " − " + v.both + " = " + (v.A + v.B - v.both) + " (trừ phần giao nhau bị đếm hai lần). Không tham gia CLB nào: " + v.N + " − " + (v.A + v.B - v.both) + " = " + v.neither + ".", {});
      return tag(q, "thcs-logic", "venn-neither");
    }
    if (ask === "onlyA") {
      var q2 = cdMCQ(base + "Có bao nhiêu bạn chỉ tham gia câu lạc bộ Toán (không tham gia Tiếng Anh)?", v.onlyA,
        [v.A, v.onlyA + v.both, v.onlyB, v.neither],
        "Chỉ Toán = tổng số bạn CLB Toán trừ đi số bạn tham gia cả hai: " + v.A + " − " + v.both + " = " + v.onlyA + ".", {});
      return tag(q2, "thcs-logic", "venn-onlyA");
    }
    var q3 = cdMCQ("Một lớp có " + v.onlyA + " bạn chỉ tham gia CLB Toán, " + v.onlyB + " bạn chỉ tham gia CLB Tiếng Anh, " + v.both + " bạn tham gia cả hai và " + v.neither + " bạn không tham gia CLB nào. Lớp có bao nhiêu học sinh?",
      v.N, [v.N - v.neither, v.onlyA + v.onlyB + v.both + v.neither + v.both, v.A + v.B, v.N + v.both],
      "Cộng bốn nhóm rời nhau: " + v.onlyA + " + " + v.onlyB + " + " + v.both + " + " + v.neither + " = " + v.N + " học sinh.", {});
    return tag(q3, "thcs-logic", "venn-total");
  }
  var SUBJ3 = ["Toán", "Ngữ văn", "Tiếng Anh"];
  function gElim3() {
    for (var tries = 0; tries < 150; tries++) {
      var kids = cdShuffle(cdNames).slice(0, 3);
      var assign = {}; var subs = cdShuffle(SUBJ3); kids.forEach(function (k, i) { assign[k] = subs[i]; });
      var cand = [];
      kids.forEach(function (k) { SUBJ3.forEach(function (s) { if (assign[k] !== s) cand.push([k, s]); }); });
      cand = cdShuffle(cand);
      var neg = cand.slice(0, 2), posKid = cdPick(kids);
      var clues = neg.map(function (n) { return { txt: n[0] + " không thích nhất môn " + n[1], test: function (a) { return a[n[0]] !== n[1]; } }; });
      clues.push({ txt: posKid + " thích nhất môn " + assign[posKid], test: function (a) { return a[posKid] === assign[posKid]; } });
      var sols = perms(SUBJ3).filter(function (p) { var a = {}; kids.forEach(function (k, i) { a[k] = p[i]; }); return clues.every(function (c) { return c.test(a); }); });
      if (sols.length !== 1) continue;
      var askKid = cdPick(kids.filter(function (k) { return k !== posKid; }));
      var q = cdMCQ("Ba bạn " + kids.join(", ") + " mỗi bạn thích nhất một môn khác nhau trong ba môn Toán, Ngữ văn, Tiếng Anh. Biết: " + cdShuffle(clues).map(function (c) { return c.txt; }).join(". ") + ". " + askKid + " thích nhất môn nào?",
        assign[askKid], SUBJ3.filter(function (s) { return s !== assign[askKid]; }),
        "Loại trừ theo manh mối: " + kids.map(function (k) { return k + " — " + assign[k]; }).join("; ") + ".", {});
      return tag(q, "thcs-logic", "elim3");
    }
    return null;
  }
  function gLogicBlank2() {
    var sc = makeOrder5(); if (!sc) return null;
    var better = sc.ctx === "chạy nhanh" ? "chạy nhanh hơn" : sc.ctx === "làm toán nhanh" ? "làm toán nhanh hơn" : "hát hay hơn";
    var who = sc.order[2];
    var vis = sent("Bạn đứng thứ ba là " + blankSlot() + ".");
    var q = cdBlank("Năm bạn " + sc.kids.join(", ") + ". Biết: " + sc.clues.map(function (c) { return c[0] + " " + better + " " + c[1]; }).join("; ") + ". Điền tên bạn đứng thứ ba (từ cao xuống thấp) nhé!",
      who, sc.kids.filter(function (k) { return k !== who; }).slice(0, 3),
      "Thứ tự đầy đủ: " + sc.order.join(", ") + ". Bạn thứ ba là " + who + ".", vis);
    return tag(q, "thcs-logic", "blank-rank3");
  }
  function gLogicMatch2() {
    var sc = makeOrder5(); if (!sc) return null;
    var better = sc.ctx === "chạy nhanh" ? "chạy nhanh hơn" : sc.ctx === "làm toán nhanh" ? "làm toán nhanh hơn" : "hát hay hơn";
    var lbl = ["Thứ nhất", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm"];
    var pairs = sc.order.map(function (nm, i) { return [nm, lbl[i]]; });
    var q = cdMatch("Năm bạn " + sc.kids.join(", ") + ". Biết: " + sc.clues.map(function (c) { return c[0] + " " + better + " " + c[1]; }).join("; ") + ". Nối mỗi bạn với thứ hạng đúng nhé!", pairs,
      "Thứ tự đầy đủ: " + sc.order.join(", ") + ".");
    return tag(q, "thcs-logic", "match");
  }
  function gLogicTF2() {
    var v = vennParams();
    var stmts = [
      { t: "Số bạn tham gia ít nhất một câu lạc bộ là " + (v.A + v.B - v.both) + ".", f: "Số bạn tham gia ít nhất một câu lạc bộ là " + (v.A + v.B) + ".", e: "Phải trừ phần giao nhau " + v.both + " bạn bị đếm hai lần: " + v.A + " + " + v.B + " − " + v.both + " = " + (v.A + v.B - v.both) + "." },
      { t: "Số bạn chỉ tham gia CLB Toán là " + v.onlyA + ".", f: "Số bạn chỉ tham gia CLB Toán là " + v.A + ".", e: "Chỉ Toán = " + v.A + " − " + v.both + " = " + v.onlyA + " (phải bỏ các bạn tham gia cả hai)." },
      { t: "Số bạn không tham gia CLB nào là " + v.neither + ".", f: "Số bạn không tham gia CLB nào là " + (v.neither + v.both) + ".", e: "Không tham gia = sĩ số − số tham gia ít nhất một CLB = " + v.N + " − " + (v.A + v.B - v.both) + " = " + v.neither + ". (Con số " + (v.neither + v.both) + " là lỗi quên cộng lại phần giao nhau.)" }
    ];
    var pat = cdPick([[true, true, false], [true, false, true], [false, true, true], [true, false, false]]);
    var rounds = stmts.map(function (s, i) { return { stmt: pat[i] ? s.t : s.f, truth: pat[i], explain: s.e }; });
    var q = cdTF(rounds, "Đúng hay sai? Lớp có " + v.N + " học sinh, " + v.A + " bạn ở CLB Toán, " + v.B + " bạn ở CLB Tiếng Anh, " + v.both + " bạn ở cả hai CLB.");
    return tag(q, "thcs-logic", "tf-venn");
  }

  /* ================= (c) ĐẾM & XÁC SUẤT TƯ DUY ================= */
  function gHandshake() {
    var n = cdRand(5, 15);
    var ans = comb2(n);
    var q = cdMCQ("Trong một buổi gặp mặt có " + n + " bạn. Mỗi hai bạn bắt tay nhau đúng một lần. Tất cả có bao nhiêu cái bắt tay?",
      ans, [n * (n - 1), ans + n, ans - 1, n * n],
      "Mỗi bạn bắt tay với " + (n - 1) + " bạn còn lại, nhưng mỗi cái bắt tay bị đếm hai lần nên tổng số là " + n + " × " + (n - 1) + " : 2 = " + ans + ".", {});
    return tag(q, "thcs-demxs", "bat-tay");
  }
  function gPaths() {
    var m = cdPick([2, 2, 3, 3, 4]), n = cdPick([2, 3, 3, 4]);
    if (m + n > 7) n = 3;
    var ans = Cnk(m + n, m);
    var q = cdMCQ("Trên lưới đường đi, để đi từ góc dưới-trái đến góc trên-phải của một bảng " + m + " cột × " + n + " hàng ô, bạn chỉ được đi sang phải hoặc đi lên, mỗi bước qua một cạnh ô. Có bao nhiêu đường đi khác nhau?",
      ans, [(m + 1) * (n + 1), m * n, ans + Cnk(m + n - 1, m), Cnk(m + n, 1)],
      "Mỗi đường đi gồm " + (m + n) + " bước, trong đó chọn " + m + " bước sang phải: C(" + (m + n) + ", " + m + ") = " + ans + " đường.", {});
    return tag(q, "thcs-demxs", "duong-di");
  }
  function gDiag() {
    var n = cdPick([5, 6, 7, 8, 9, 10]);
    var ans = n * (n - 3) / 2;
    var q = cdMCQ("Một đa giác lồi có " + n + " cạnh. Hỏi đa giác có bao nhiêu đường chéo?",
      ans, [comb2(n), ans + n, n * (n - 3), n - 3],
      "Từ mỗi đỉnh kẻ được " + (n - 3) + " đường chéo (trừ chính đỉnh đó và hai đỉnh kề). Mỗi đường chéo bị đếm hai lần: " + n + " × " + (n - 3) + " : 2 = " + ans + ".", {});
    return tag(q, "thcs-demxs", "duong-cheo");
  }
  function gProb() {
    var r = cdRand(2, 6), b = cdRand(2, 6);
    var tot = r + b;
    var askBlue = Math.random() < 0.4;
    var fav = askBlue ? b : r;
    var ans = cdFrac(fav, tot);
    var other = cdFrac(tot - fav, tot);
    var plus = cdFrac(fav + 1, tot + 1);
    var g = cdGCD(fav, tot);
    var unred = g > 1 ? (fav + "/" + tot) : null;
    var distr = [other, plus];
    if (unred && cdValKey(unred) !== cdValKey(ans)) distr.push(unred);
    distr.push(cdFrac(fav, tot + 2));
    var q = cdMCQ("Một hộp có " + r + " viên bi đỏ và " + b + " viên bi xanh, các bi giống hệt nhau về kích thước. Lấy ngẫu nhiên một viên bi. Xác suất lấy được bi " + (askBlue ? "xanh" : "đỏ") + " là bao nhiêu?",
      ans, distr,
      "Có " + tot + " kết quả có thể, trong đó " + fav + " kết quả thuận lợi. Xác suất = " + fav + "/" + tot + (g > 1 ? " = " + ans + " (đã rút gọn)." : "."), {});
    return tag(q, "thcs-demxs", askBlue ? "xac-suat-xanh" : "xac-suat-do");
  }
  function gProbBlank() {
    var total = cdPick([4, 5, 6, 8, 10, 12]);
    var fav = cdRand(1, total - 1);
    var vis = sent("Túi có " + total + " quả bóng giống hệt nhau, trong đó " + fav + " quả màu vàng. Xác suất rút được quả màu vàng là " + blankSlot() + ".");
    var q = cdBlank("Điền xác suất đúng (viết dạng phân số tối giản) nhé!", cdFrac(fav, total),
      [cdFrac(total - fav, total), cdFrac(fav + 1, total), cdFrac(fav, total + 1)],
      "Xác suất = số kết quả thuận lợi : tổng số kết quả = " + fav + "/" + total + " = " + cdFrac(fav, total) + ".", vis);
    return tag(q, "thcs-demxs", "blank-xac-suat");
  }
  function gDemMatch() {
    var n1 = cdPick([6, 8, 10, 12]);
    var cases = [
      [n1 + " bạn, mỗi hai bạn bắt tay một lần — số cái bắt tay", comb2(n1)],
      ["Số đường chéo của đa giác 6 cạnh", 9],
      ["Số đường chéo của đa giác 8 cạnh", 20],
      ["Đường đi trên bảng 2 × 2 (chỉ đi phải/lên)", 6],
      ["Đường đi trên bảng 3 × 2 (chỉ đi phải/lên)", 10],
      ["Số cách chọn 2 bạn trong 7 bạn", 21],
      ["Số cách chọn 3 bạn trong 7 bạn", 35]
    ];
    var chosen = cdShuffle(cases).slice(0, 4);
    if (new Set(chosen.map(function (c) { return String(c[1]); })).size < 4) return null;
    var q = cdMatch("Nối mỗi tình huống đếm với kết quả đúng nhé!", chosen.map(function (c) { return [c[0], String(c[1])]; }),
      "Dùng các quy tắc: bắt tay n(n−1)/2; đường chéo n(n−3)/2; đường đi trên lưới là hệ số tổ hợp.");
    return tag(q, "thcs-demxs", "match");
  }
  function gDemTF() {
    var n = cdRand(6, 12);
    var hs = comb2(n);
    var dg = cdPick([6, 7, 8]);
    var dc = dg * (dg - 3) / 2;
    var stmts = [
      { t: n + " bạn bắt tay nhau mỗi hai bạn một lần thì có " + hs + " cái bắt tay.", f: n + " bạn bắt tay nhau mỗi hai bạn một lần thì có " + (n * (n - 1)) + " cái bắt tay.", e: "Mỗi cái bắt tay bị đếm hai lần khi nhân " + n + " × " + (n - 1) + ", phải chia 2: " + hs + "." },
      { t: "Đa giác " + dg + " cạnh có " + dc + " đường chéo.", f: "Đa giác " + dg + " cạnh có " + comb2(dg) + " đường chéo.", e: "Đường chéo = " + dg + " × " + (dg - 3) + " : 2 = " + dc + " (số " + comb2(dg) + " là số đoạn nối mọi cặp đỉnh, gồm cả cạnh)." },
      { t: "Một túi có 3 bi đỏ, 3 bi xanh. Xác suất rút được bi đỏ là 1/2.", f: "Một túi có 3 bi đỏ, 3 bi xanh. Xác suất rút được bi đỏ là 1/3.", e: "Xác suất = 3/6 = 1/2 (phân số phải rút gọn)." }
    ];
    var pat = cdPick([[true, true, false], [true, false, true], [false, true, true], [false, false, true]]);
    var rounds = stmts.map(function (s, i) { return { stmt: pat[i] ? s.t : s.f, truth: pat[i], explain: s.e }; });
    return tag(cdTF(rounds), "thcs-demxs", "tf");
  }

  /* ================= (d) TOÁN ĐỐ NHIỀU BƯỚC ================= */
  function gPercent() {
    var price = cdPick([100, 200, 250, 400, 500, 800, 1000]) * 1000;
    var pct = cdPick([10, 20, 25, 30, 40, 50]);
    var up = Math.random() < 0.35;
    var ans = Math.round(price * (up ? 1 + pct / 100 : 1 - pct / 100));
    var fmt = function (v) { return String(v / 1000).replace(".", ",") + " nghìn đồng"; };
    var q = cdMCQ("Một chiếc áo giá " + fmt(price) + ". Cửa hàng " + (up ? "tăng giá " : "giảm giá ") + pct + "%. Giá chiếc áo sau khi " + (up ? "tăng" : "giảm") + " là bao nhiêu?",
      fmt(ans), [fmt(Math.round(price * (up ? 1 - pct / 100 : 1 + pct / 100))), fmt(price - pct * 1000), fmt(ans + price / 10)],
      (up ? "Tăng " : "Giảm ") + pct + "% của " + fmt(price) + " là " + fmt(Math.round(price * pct / 100)) + ". Giá mới: " + fmt(price) + (up ? " + " : " − ") + fmt(Math.round(price * pct / 100)) + " = " + fmt(ans) + ".", {});
    return tag(q, "thcs-toando", up ? "phan-tram-tang" : "phan-tram-giam");
  }
  function gRatioShare() {
    var a = cdPick([2, 3, 4, 5]), b = cdPick([1, 2, 3, 4, 5, 6]);
    if (b === a) b = a + 1;
    var k = cdRand(4, 20);
    var total = k * (a + b);
    var askB = Math.random() < 0.5;
    var ans = askB ? k * b : k * a;
    var ctx = cdPick(["viên kẹo", "quyển sách", "cây bút", "nghìn đồng tiền thưởng"]);
    var money = ctx.indexOf("nghìn") === 0;
    var unit = money ? " nghìn đồng" : "";
    var other = k * (askB ? a : b);
    var noun = money ? "tiền" : (ctx.split(" ").slice(1).join(" ") || "");
    var q = cdMCQ("Hai bạn An và Bình chia nhau " + total + " " + ctx + " theo tỉ lệ " + a + " : " + b + " (phần của An : phần của Bình = " + a + " : " + b + "). " + (askB ? "Bình" : "An") + " nhận được bao nhiêu " + noun + "?",
      String(ans) + unit,
      [other, total, ans + k].map(function (v) { return String(v) + unit; }),
      "Tổng số phần bằng nhau: " + a + " + " + b + " = " + (a + b) + " phần. Mỗi phần: " + total + " : " + (a + b) + " = " + k + ". " + (askB ? "Bình" : "An") + " nhận " + (askB ? b : a) + " phần: " + k + " × " + (askB ? b : a) + " = " + ans + ".", {});
    return tag(q, "thcs-toando", "chia-ti-le");
  }
  var WORKPAIRS = [[3, 6], [4, 12], [6, 12], [5, 20], [8, 24], [10, 15], [12, 12], [6, 3], [12, 4], [20, 5]];
  function gWork() {
    var pr = cdPick(WORKPAIRS), a = pr[0], b = pr[1];
    var together = a * b / (a + b);
    if (together !== Math.floor(together)) return null;
    var mode = Math.random() < 0.5 ? "cung-lam" : "mot-phan";
    if (mode === "mot-phan") {
      var h = cdPick([1, 2]);
      if (h >= a) h = 1;
      var fracAns = cdFrac(h, a);
      var q = cdMCQ("Một mình bạn An làm xong một công việc trong " + a + " giờ. Nếu An làm trong " + h + " giờ thì được bao nhiêu phần của công việc?",
        fracAns, [cdFrac(1, a), cdFrac(h + 1, a), cdFrac(a, h), cdFrac(h, a + 1)],
        "Mỗi giờ An làm được 1/" + a + " công việc. Trong " + h + " giờ: " + h + " × 1/" + a + " = " + fracAns + " công việc.", {});
      return tag(q, "thcs-toando", "nang-suat-phan");
    }
    var q2 = cdMCQ("Bạn An làm một mình xong một công việc trong " + a + " giờ, bạn Bình làm một mình xong công việc đó trong " + b + " giờ. Nếu hai bạn cùng làm thì sau bao lâu xong công việc?",
      together + " giờ", [(together + 1) + " giờ", String((a + b) / 2).replace(".", ",") + " giờ", (a + b) + " giờ", (together + 2) + " giờ"],
      "Mỗi giờ hai bạn làm được 1/" + a + " + 1/" + b + " = " + cdFrac(a + b, a * b) + " công việc. Thời gian cùng làm: 1 : " + cdFrac(a + b, a * b) + " = " + together + " giờ.", {});
    return tag(q2, "thcs-toando", "nang-suat-cung");
  }
  function gMeet() {
    var v1 = cdPick([3, 4, 5, 6, 8, 10]), v2 = cdPick([2, 3, 4, 5, 7, 9]);
    var t = cdPick([1, 2, 2, 3, 4]);
    var D = (v1 + v2) * t;
    var askDist = Math.random() < 0.4;
    if (askDist) {
      var d1 = v1 * t;
      var q = cdMCQ("Hai bạn ở hai đầu một quãng đường dài " + D + " km, đi về phía nhau. Bạn thứ nhất đi " + v1 + " km mỗi giờ, bạn thứ hai đi " + v2 + " km mỗi giờ. Khi gặp nhau, bạn thứ nhất đã đi được bao nhiêu ki-lô-mét?",
        d1 + " km", [(d1 + v1) + " km", (v2 * t) + " km", (D - v2) + " km"],
        "Thời gian đến lúc gặp nhau: " + D + " : (" + v1 + " + " + v2 + ") = " + t + " giờ. Bạn thứ nhất đi: " + v1 + " × " + t + " = " + d1 + " km.", {});
      return tag(q, "thcs-toando", "gap-nhau-quang-duong");
    }
    var q2 = cdMCQ("Hai bạn ở hai đầu một quãng đường dài " + D + " km, cùng lúc đi về phía nhau. Bạn thứ nhất đi " + v1 + " km mỗi giờ, bạn thứ hai đi " + v2 + " km mỗi giờ. Sau bao lâu hai bạn gặp nhau?",
      t + " giờ", [(t + 1) + " giờ", v1 !== v2 ? String(Math.round(D / Math.abs(v1 - v2) * 10) / 10).replace(".", ",") + " giờ" : (t + 3) + " giờ", (t + 2) + " giờ"],
      "Mỗi giờ hai bạn lại gần nhau " + v1 + " + " + v2 + " = " + (v1 + v2) + " km. Thời gian gặp nhau: " + D + " : " + (v1 + v2) + " = " + t + " giờ.", {});
    return tag(q2, "thcs-toando", "gap-nhau-thoi-gian");
  }
  function gToandoBlank2() {
    var price = cdPick([200, 400, 500, 1000]);
    var pct = cdPick([10, 20, 25, 50]);
    var ans = price * (100 - pct) / 100;
    var vis = sent("Giá sau giảm: " + price + " × (100% − " + pct + "%) = " + blankSlot() + " nghìn đồng.");
    var q = cdBlank("Một món đồ giá " + price + " nghìn đồng, giảm giá " + pct + "%. Điền giá sau khi giảm (nghìn đồng) nhé!",
      ans, [price - pct, ans + price / 10, price * (100 - pct - 10) / 100, price],
      "Số tiền giảm: " + price + " × " + pct + "% = " + (price * pct / 100) + " nghìn đồng. Giá sau giảm: " + price + " − " + (price * pct / 100) + " = " + ans + " nghìn đồng.", vis);
    return tag(q, "thcs-toando", "blank-phan-tram");
  }
  function gToandoMatch2() {
    var cases = [
      ["Giảm 50% của 300 nghìn đồng", "150 nghìn đồng"],
      ["Tăng 10% của 200 nghìn đồng", "220 nghìn đồng"],
      ["Giảm 25% của 400 nghìn đồng", "300 nghìn đồng"],
      ["Chia 60 theo tỉ lệ 1 : 2 — phần lớn", "40"],
      ["Chia 90 theo tỉ lệ 2 : 3 — phần nhỏ", "36"],
      ["Một mình 6 giờ xong việc — làm 2 giờ được", "1/3 công việc"],
      ["Một mình 4 giờ xong việc — làm 1 giờ được", "1/4 công việc"]
    ];
    var chosen = cdShuffle(cases).slice(0, 4);
    if (new Set(chosen.map(function (c) { return c[1]; })).size < 4) return null;
    var q = cdMatch("Nối mỗi tình huống với kết quả đúng nhé!", chosen,
      "Tính phần trăm của một số, chia theo tỉ lệ (tổng số phần), và phân số công việc theo thời gian.");
    return tag(q, "thcs-toando", "match");
  }
  function gToandoTF2() {
    var stmts = [
      { t: "Giảm 20% rồi tăng 20% thì giá trở về giá ban đầu.", truth: false, e: "Sai: giảm 20% còn 80%, tăng 20% của 80% là 96% giá ban đầu — vẫn thấp hơn giá gốc." },
      { t: "Chia một số theo tỉ lệ 2 : 3 thì phần thứ nhất chiếm 2/5 của số đó.", truth: true, e: "Tổng số phần là 5, phần thứ nhất có 2 phần nên chiếm 2/5." },
      { t: "Một người 3 giờ xong việc, người kia 6 giờ xong việc; cùng làm thì 2 giờ xong.", truth: true, e: "Mỗi giờ cùng làm được 1/3 + 1/6 = 1/2 công việc, nên 2 giờ là xong." },
      { t: "Tăng 50% một số rồi giảm 50% số mới thì được số ban đầu.", truth: false, e: "Sai: tăng 50% thành 150%, giảm 50% của 150% chỉ còn 75% số ban đầu." }
    ];
    var chosen = cdShuffle(stmts).slice(0, 3);
    var truths = chosen.map(function (s) { return s.truth; });
    if (truths.every(function (x) { return x; }) || truths.every(function (x) { return !x; })) return null;
    return tag(cdTF(chosen.map(function (s) { return { stmt: s.t, truth: s.truth, explain: s.e }; })), "thcs-toando", "tf");
  }

  /* ================= (e) HÌNH HỌC SUY LUẬN ================= */
  var TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25]];
  function gPytago() {
    var tr = cdPick(TRIPLES), a = tr[0], b = tr[1], c = tr[2];
    var askLeg = Math.random() < 0.45;
    if (askLeg) {
      var giveA = Math.random() < 0.5;
      var known = giveA ? a : b, ans = giveA ? b : a;
      var q = cdMCQ("Một tam giác vuông có cạnh huyền dài " + c + " cm và một cạnh góc vuông dài " + known + " cm. Cạnh góc vuông còn lại dài bao nhiêu xăng-ti-mét?",
        ans, [ans + 2, ans - 2 > 0 ? ans - 2 : ans + 3, c - known, Math.round(Math.sqrt(c * c - known * known)) === ans ? ans + 5 : Math.round(Math.sqrt(c * c - known * known))],
        "Theo định lí Pythagoras: cạnh còn lại = √(" + c + "² − " + known + "²) = √" + (c * c - known * known) + " = " + ans + " cm.",
        { figure: figRightTriSVG(known, ans, known + " cm", "?", c + " cm"), figureOnly: false });
      return tag(q, "thcs-hinh", "py-ta-go-canh");
    }
    var q2 = cdMCQ("Một tam giác vuông có hai cạnh góc vuông dài " + a + " cm và " + b + " cm. Cạnh huyền dài bao nhiêu xăng-ti-mét?",
      c, [c + 1, c - 1, a + b, Math.round(Math.sqrt(a * a + b * b)) === c ? c + 4 : Math.round(Math.sqrt(a * a + b * b))],
      "Theo định lí Pythagoras: cạnh huyền = √(" + a + "² + " + b + "²) = √" + (a * a + b * b) + " = " + c + " cm.",
      { figure: figRightTriSVG(a, b, a + " cm", b + " cm", "?"), figureOnly: false });
    return tag(q2, "thcs-hinh", "py-ta-go-huyen");
  }
  function gAngles() {
    var kind = cdPick(["ke-bu", "bu", "tong-tg", "doi-dinh"]);
    if (kind === "ke-bu") {
      var x = cdRand(25, 160); if (x === 90) x = 95;
      var ans = 180 - x;
      var q = cdMCQ("Hai góc kề bù có một góc bằng " + x + "°. Góc còn lại bằng bao nhiêu độ?", ans + "°", [(ans + 10) + "°", (90 - (x % 90) + 90) % 180 + "°", (180 - ans + 20) + "°"],
        "Hai góc kề bù có tổng 180°. Góc còn lại: 180° − " + x + "° = " + ans + "°.", {});
      return tag(q, "thcs-hinh", "goc-ke-bu");
    }
    if (kind === "bu") {
      var y = cdRand(15, 80), ans2 = 90 - y;
      var q2 = cdMCQ("Hai góc phụ nhau có một góc bằng " + y + "°. Góc còn lại bằng bao nhiêu độ?", ans2 + "°", [(ans2 + 10) + "°", (180 - y) + "°", (ans2 - 5) + "°"],
        "Hai góc phụ nhau có tổng 90°. Góc còn lại: 90° − " + y + "° = " + ans2 + "°.", {});
      return tag(q2, "thcs-hinh", "goc-phu");
    }
    if (kind === "tong-tg") {
      var A = cdRand(30, 90), B = cdRand(20, 140 - A), C = 180 - A - B;
      var q3 = cdMCQ("Một tam giác có hai góc bằng " + A + "° và " + B + "°. Góc thứ ba bằng bao nhiêu độ?", C + "°", [(C + 10) + "°", (C - 10) + "°", (360 - A - B) + "°"],
        "Tổng ba góc trong tam giác là 180°. Góc thứ ba: 180° − " + A + "° − " + B + "° = " + C + "°.", {});
      return tag(q3, "thcs-hinh", "goc-tam-giac");
    }
    var z = cdRand(30, 160);
    var q4 = cdMCQ("Hai đường thẳng cắt nhau tạo thành một góc " + z + "°. Góc đối đỉnh với góc đó bằng bao nhiêu độ?", z + "°", [(180 - z) + "°", (90 - z % 90) + "°", (z + 20) + "°"],
      "Hai góc đối đỉnh thì bằng nhau, nên góc đối đỉnh cũng bằng " + z + "°. (Góc kề bù với nó mới bằng " + (180 - z) + "°.)", {});
    return tag(q4, "thcs-hinh", "goc-doi-dinh");
  }
  function gCircle2() {
    var r = cdPick([5, 10, 20]);
    var area = Math.random() < 0.5;
    var round2 = function (x) { return Math.round(x * 100) / 100; };
    var ans = round2(area ? (3.14 * r * r) : (2 * 3.14 * r));
    var ansTxt = String(ans).replace(".", ",");
    var other = round2(area ? (2 * 3.14 * r) : (3.14 * r * r));
    var distr = [String(other).replace(".", ","), String(Math.round(ans * 2 * 100) / 100).replace(".", ","), String(Math.round(ans / 2 * 100) / 100).replace(".", ",")];
    var q = cdMCQ("Một hình tròn có bán kính " + r + " cm. Lấy π ≈ 3,14. " + (area ? "Diện tích" : "Chu vi") + " của hình tròn là bao nhiêu xăng-ti-mét" + (area ? " vuông" : "") + "?",
      ansTxt, distr,
      (area ? "Diện tích = π × r² = 3,14 × " + r + "² = " : "Chu vi = 2 × π × r = 2 × 3,14 × " + r + " = ") + ansTxt + (area ? " cm²." : " cm."),
      { figure: figCircleSVG(r), figureOnly: false });
    return tag(q, "thcs-hinh", area ? "tron-dien-tich" : "tron-chu-vi");
  }
  function gHinhBlank() {
    var tr = cdPick(TRIPLES);
    var vis = sent("Tam giác vuông: cạnh góc vuông " + tr[0] + " cm và " + tr[1] + " cm, cạnh huyền là " + blankSlot() + " cm.");
    var q = cdBlank("Điền độ dài cạnh huyền (cm) của tam giác vuông nhé!", tr[2], [tr[2] + 1, tr[2] - 1, tr[0] + tr[1]],
      "Pythagoras: √(" + tr[0] + "² + " + tr[1] + "²) = √" + (tr[0] * tr[0] + tr[1] * tr[1]) + " = " + tr[2] + " cm.", vis);
    return tag(q, "thcs-hinh", "blank-huyen");
  }
  function gHinhMatch() {
    var cases = [
      ["Tam giác vuông cạnh 3 cm, 4 cm — cạnh huyền", "5 cm"],
      ["Tam giác vuông cạnh 6 cm, 8 cm — cạnh huyền", "10 cm"],
      ["Góc kề bù với góc 70°", "110°"],
      ["Góc phụ với góc 35°", "55°"],
      ["Tam giác có hai góc 50°, 60° — góc còn lại", "70°"],
      ["Hình tròn bán kính 10 cm, π ≈ 3,14 — chu vi", "62,8 cm"],
      ["Hình tròn bán kính 5 cm, π ≈ 3,14 — diện tích", "78,5 cm²"]
    ];
    var chosen = cdShuffle(cases).slice(0, 4);
    if (new Set(chosen.map(function (c) { return c[1]; })).size < 4) return null;
    var q = cdMatch("Nối mỗi tình huống hình học với kết quả đúng nhé!", chosen,
      "Dùng Pythagoras cho tam giác vuông, tổng 180° cho góc kề bù và góc trong tam giác, 90° cho góc phụ nhau.");
    return tag(q, "thcs-hinh", "match");
  }
  function gHinhTF() {
    var A = cdRand(35, 80), B = cdRand(30, 90), C = 180 - A - B;
    var stmts = [
      { t: "Tam giác có hai góc " + A + "° và " + B + "° thì góc còn lại là " + C + "°.", f: "Tam giác có hai góc " + A + "° và " + B + "° thì góc còn lại là " + (C + 10) + "°.", e: "Tổng ba góc là 180°: 180 − " + A + " − " + B + " = " + C + "°." },
      { t: "Tam giác có các cạnh 5 cm, 12 cm, 13 cm là tam giác vuông.", f: "Tam giác có các cạnh 5 cm, 12 cm, 14 cm là tam giác vuông.", e: "5² + 12² = 25 + 144 = 169 = 13² nên bộ 5-12-13 là tam giác vuông; 14² = 196 ≠ 169." },
      { t: "Hai góc đối đỉnh thì bằng nhau.", f: "Hai góc kề bù thì bằng nhau.", e: "Góc đối đỉnh luôn bằng nhau; góc kề bù chỉ bằng nhau khi cùng là 90° (tổng của chúng là 180°)." },
      { t: "Hình tròn bán kính 10 cm có chu vi khoảng 62,8 cm (π ≈ 3,14).", f: "Hình tròn bán kính 10 cm có chu vi khoảng 31,4 cm (π ≈ 3,14).", e: "Chu vi = 2 × 3,14 × 10 = 62,8 cm (31,4 là nửa chu vi)." }
    ];
    var chosen = cdShuffle(stmts).slice(0, 3);
    var pat = cdPick([[true, true, false], [true, false, true], [false, true, true], [false, true, false]]);
    var rounds = chosen.map(function (s, i) { return { stmt: pat[i] ? s.t : s.f, truth: pat[i], explain: s.e }; });
    return tag(cdTF(rounds), "thcs-hinh", "tf");
  }

  /* ================= ĐĂNG KÝ ================= */
  var topics = [
    { id: "cd-thcs-dayso", emoji: "🔢", name: "Dãy số & quy luật nâng cao", sub: "Dạng Fibonacci, số chính phương, số nguyên tố",
      pools: { choose: [gFib, gChinhPhuong, gNguyenTo], blank: [gDaysoBlank2], match: [gDaysoMatch2], games: [gDaysoTF2] },
      knowledge: { notes: ["Dãy dạng Fibonacci: từ số thứ ba, mỗi số bằng tổng hai số đứng trước.", "Số chính phương: 1, 4, 9, 16, 25… là bình phương của 1, 2, 3, 4, 5…", "Số nguyên tố chỉ có hai ước là 1 và chính nó; số 1 không phải số nguyên tố.", "Luôn thử quy luật trên ít nhất hai bước liên tiếp trước khi áp dụng."],
        facts: [{ q: "Dãy 1, 2, 3, 5, 8, … Số tiếp theo là bao nhiêu?", a: "13", ex: "Mỗi số bằng tổng hai số trước: 5 + 8 = 13." }, { q: "Dãy 1, 4, 9, 16, 25, … Số tiếp theo là bao nhiêu?", a: "36", ex: "Đó là các số chính phương: tiếp theo là 6² = 36." }],
        pairs: [["Dãy Fibonacci", "Mỗi số = tổng hai số trước"], ["Số chính phương", "n² với n nguyên"], ["Số nguyên tố", "Chỉ có ước 1 và chính nó"], ["Số tam giác", "Hiệu tăng dần 2, 3, 4…"]] } },
    { id: "cd-thcs-logic", emoji: "🧩", name: "Suy luận logic", sub: "Thứ tự 5 bạn, bảng loại trừ, sơ đồ Venn hai tập hợp",
      pools: { choose: [gOrder5, gVenn, gElim3], blank: [gLogicBlank2], match: [gLogicMatch2], games: [gLogicTF2] },
      knowledge: { notes: ["Thứ tự: nối các manh mối thành một dãy duy nhất rồi đọc vị trí.", "Sơ đồ Venn hai tập hợp: |A ∪ B| = |A| + |B| − |A ∩ B| — phần giao bị đếm hai lần nên phải trừ đi một lần.", "Chỉ thuộc A = thuộc A trừ đi phần giao. Không thuộc tập nào = tổng số trừ đi phần hợp.", "Loại trừ: lập bảng, đánh dấu ✗ theo manh mối, ô còn lại duy nhất trong hàng/cột là đáp án."],
        facts: [{ q: "Lớp 30 bạn: 18 bạn ở CLB Toán, 15 bạn ở CLB Anh, 8 bạn ở cả hai. Bao nhiêu bạn không ở CLB nào?", a: "5 bạn", ex: "Tham gia ít nhất một CLB: 18 + 15 − 8 = 25. Không tham gia: 30 − 25 = 5." }, { q: "A cao hơn B, B cao hơn C, C cao hơn D. Ai thấp nhất?", a: "D", ex: "Dãy thứ tự: A > B > C > D nên D thấp nhất." }],
        pairs: [["Phần giao A ∩ B", "Thuộc cả hai tập hợp"], ["Phần hợp A ∪ B", "|A| + |B| − |A ∩ B|"], ["Chỉ thuộc A", "|A| − |A ∩ B|"], ["Loại trừ đúng", "Mỗi hàng/cột còn đúng một khả năng"]] } },
    { id: "cd-thcs-demxs", emoji: "🎲", name: "Đếm & xác suất tư duy", sub: "Bắt tay, đường đi trên lưới, đường chéo, xác suất rút bi",
      pools: { choose: [gHandshake, gPaths, gDiag, gProb], blank: [gProbBlank], match: [gDemMatch], games: [gDemTF] },
      knowledge: { notes: ["Số cái bắt tay giữa n người: n × (n − 1) : 2 (mỗi cái bắt tay bị đếm hai lần).", "Số đường chéo của đa giác n cạnh: n × (n − 3) : 2.", "Đường đi trên lưới chỉ đi phải/lên: tổng số bước chọn số bước sang phải — C(tổng, phải).", "Xác suất = số kết quả thuận lợi : tổng số kết quả; luôn rút gọn phân số."],
        facts: [{ q: "8 bạn bắt tay nhau mỗi hai bạn một lần. Có bao nhiêu cái bắt tay?", a: "28 cái", ex: "8 × 7 : 2 = 28." }, { q: "Túi có 4 bi đỏ, 6 bi xanh. Xác suất rút được bi đỏ là bao nhiêu?", a: "2/5", ex: "4/10 rút gọn được 2/5." }],
        pairs: [["Bắt tay", "n(n − 1) : 2"], ["Đường chéo", "n(n − 3) : 2"], ["Xác suất", "Thuận lợi : tất cả"], ["Phân số xác suất", "Luôn rút gọn về tối giản"]] } },
    { id: "cd-thcs-toando", emoji: "🧮", name: "Toán đố nhiều bước", sub: "Phần trăm, chia tỉ lệ, năng suất, gặp nhau",
      pools: { choose: [gPercent, gRatioShare, gWork, gMeet], blank: [gToandoBlank2], match: [gToandoMatch2], games: [gToandoTF2] },
      knowledge: { notes: ["Phần trăm: giảm p% → nhân (100 − p)%; tăng p% → nhân (100 + p)%. Giảm rồi tăng cùng p% KHÔNG trở về giá gốc.", "Chia theo tỉ lệ a : b: cộng tổng số phần a + b, lấy tổng chia cho số phần được giá trị một phần.", "Năng suất: mỗi giờ làm được 1/thời gian-riêng phần việc; cùng làm thì cộng phần việc mỗi giờ.", "Gặp nhau: cộng hai vận tốc (quãng đường gần nhau mỗi giờ) rồi lấy quãng đường chia tổng vận tốc."],
        facts: [{ q: "Áo 400 nghìn đồng giảm 25%. Giá sau giảm là bao nhiêu?", a: "300 nghìn đồng", ex: "Giảm 400 × 25% = 100 nghìn; còn 400 − 100 = 300 nghìn đồng." }, { q: "A một mình 4 giờ xong việc, B một mình 12 giờ. Cùng làm bao lâu xong?", a: "3 giờ", ex: "Mỗi giờ cùng làm: 1/4 + 1/12 = 1/3 việc; cần 3 giờ." }],
        pairs: [["Giảm p%", "Nhân (100 − p)%"], ["Một phần tỉ lệ", "Tổng : tổng số phần"], ["Cùng làm việc", "Cộng phần việc mỗi giờ"], ["Đi ngược chiều gặp nhau", "Cộng hai vận tốc"]] } },
    { id: "cd-thcs-hinh", emoji: "📐", name: "Hình học suy luận", sub: "Pythagoras, góc kề bù/phụ nhau, hình tròn",
      pools: { choose: [gPytago, gAngles, gCircle2], blank: [gHinhBlank], match: [gHinhMatch], games: [gHinhTF] },
      knowledge: { notes: ["Định lí Pythagoras: trong tam giác vuông, huyền² = tổng bình phương hai cạnh góc vuông.", "Bộ ba Pythagoras hay gặp: 3-4-5, 6-8-10, 5-12-13, 8-15-17.", "Góc kề bù tổng 180°; góc phụ nhau tổng 90°; góc đối đỉnh bằng nhau.", "Hình tròn: chu vi = 2πr, diện tích = πr², lấy π ≈ 3,14."],
        facts: [{ q: "Tam giác vuông có hai cạnh góc vuông 9 cm và 12 cm. Cạnh huyền dài bao nhiêu?", a: "15 cm", ex: "√(9² + 12²) = √225 = 15 cm (bộ ba 9-12-15)." }, { q: "Góc kề bù với góc 115° bằng bao nhiêu?", a: "65°", ex: "180° − 115° = 65°." }],
        pairs: [["Pythagoras", "a² + b² = c²"], ["Góc kề bù", "Tổng 180°"], ["Góc phụ nhau", "Tổng 90°"], ["Chu vi hình tròn", "2πr"]] } }
  ];
  window.__CD_BANDS.push({ id: "thcs", name: "Toán tư duy THCS (Lớp 6–9)", grades: [6, 7, 8, 9], topics: topics });
})();
/* ================================================================
   CHUYÊN ĐỀ TOÁN TƯ DUY — DẢI THPT (Lớp 10–12)
   Đoạn của assets/data/chuyende.js. Câu hỏi tự viết mới.
   ================================================================ */
(function () {
  "use strict";
  function tag(q, fam, v) { if (q) { q.__fam = fam; q.__var = v; } return q; }
  function sent(html) { return '<div class="sentence">' + html + "</div>"; }
  function Cnk(n, k) { if (k < 0 || k > n) return 0; var r = 1; for (var i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); }
  function sign(q) { return q > 0 ? " + " + q : q < 0 ? " − " + (-q) : ""; }

  /* ================= (a) DÃY SỐ & TRUY HỒI ================= */
  function gTruyHoi() {
    var a = cdRand(1, 9), p = cdPick([2, 2, 3]), q = cdRand(-5, 8);
    var u = [a];
    for (var i = 0; i < 3; i++) u.push(p * u[u.length - 1] + q);
    var askIdx = cdPick([2, 3]); /* u3 hoặc u4 (chỉ số mảng 2,3) */
    var ans = u[askIdx];
    var expl = "u₂ = " + p + " × " + u[0] + sign(q).replace("−", "−") + " = " + u[1] + "; u₃ = " + p + " × " + u[1] + sign(q) + " = " + u[2] + (askIdx === 3 ? "; u₄ = " + p + " × " + u[2] + sign(q) + " = " + u[3] + "." : ".");
    var qq = cdMCQ("Cho dãy số xác định bởi u₁ = " + a + " và uₙ₊₁ = " + p + "uₙ" + sign(q) + " với mọi n ≥ 1. Giá trị của u" + (askIdx === 2 ? "₃" : "₄") + " là bao nhiêu?",
      ans, [ans + p, ans - q === ans ? ans + 1 : ans - q, p * ans, ans + 2 * p],
      expl, {});
    return tag(qq, "thpt-dayso", "truy-hoi");
  }
  function gCapSoCong2() {
    for (var tries = 0; tries < 60; tries++) {
      var u1 = cdRand(-5, 20), d = cdPick([-6, -4, -3, -2, 2, 3, 4, 5, 6, 7, 9]), n = cdRand(5, 12);
      var askSum = Math.random() < 0.45;
      if (askSum) {
        var num = n * (2 * u1 + (n - 1) * d);
        if (num % 2 !== 0) continue;
        var S = num / 2;
        var q = cdMCQ("Cho cấp số cộng có u₁ = " + u1 + " và công sai d = " + d + ". Tổng của " + n + " số hạng đầu tiên S" + n + " bằng bao nhiêu?",
          S, [S + d, S - n, n * (u1 + (u1 + (n - 1) * d)), S + u1],
          "Sₙ = n × (2u₁ + (n−1)d) : 2 = " + n + " × (" + (2 * u1) + (d < 0 ? " − " + (-(n - 1) * d) : " + " + ((n - 1) * d)) + ") : 2 = " + S + ".", {});
        return tag(q, "thpt-dayso", "csc-tong");
      }
      var un = u1 + (n - 1) * d;
      var q2 = cdMCQ("Cho cấp số cộng có u₁ = " + u1 + " và công sai d = " + d + ". Số hạng u" + n + " bằng bao nhiêu?",
        un, [un + d, un - d, u1 + n * d, un + 2],
        "uₙ = u₁ + (n−1)d = " + u1 + " + " + (n - 1) + " × (" + d + ") = " + un + ".", {});
      return tag(q2, "thpt-dayso", "csc-un");
    }
    return null;
  }
  function gCapSoNhan2() {
    var kind = cdPick(["q2", "q3", "qm2", "qhalf"]);
    var u1, qq, k;
    if (kind === "q2") { u1 = cdRand(1, 5); qq = 2; k = cdRand(4, 6); }
    else if (kind === "q3") { u1 = cdRand(1, 2); qq = 3; k = cdRand(4, 5); }
    else if (kind === "qm2") { u1 = cdRand(1, 4); qq = -2; k = cdRand(4, 5); }
    else { u1 = cdPick([8, 16, 32, 64]); qq = 0.5; k = cdRand(3, 5); }
    var val = u1 * Math.pow(qq, k - 1);
    var ansTxt = qq === 0.5 ? cdFrac(u1, Math.pow(2, k - 1)) : String(val);
    if (qq === 0.5) val = u1 / Math.pow(2, k - 1);
    var distr = qq === 0.5
      ? [cdFrac(u1, Math.pow(2, k - 2)), cdFrac(u1, Math.pow(2, k)), cdFrac(u1 * 2, Math.pow(2, k - 1))]
      : [String(u1 * Math.pow(qq, k)), String(u1 * Math.pow(qq, k - 2)), String(val + u1)];
    var qTxt = cdMCQ("Cho cấp số nhân có u₁ = " + u1 + " và công bội q = " + (qq === 0.5 ? "1/2" : qq) + ". Số hạng u" + k + " bằng bao nhiêu?",
      ansTxt, distr,
      "uₙ = u₁ × qⁿ⁻¹ = " + u1 + " × (" + (qq === 0.5 ? "1/2" : qq) + ")^" + (k - 1) + " = " + ansTxt + ".", {});
    return tag(qTxt, "thpt-dayso", "csn-" + kind);
  }
  function gGapDoiTang() {
    var N0 = cdPick([50, 100, 200, 500, 1000]), h = cdRand(2, 6);
    var ans = N0 * Math.pow(2, h);
    var money = Math.random() < 0.4;
    var prompt = money
      ? "Một khoản đầu tư ban đầu là " + N0 + " triệu đồng. Sau mỗi năm, tổng giá trị của khoản đầu tư gấp đôi năm trước. Sau " + h + " năm, tổng giá trị là bao nhiêu triệu đồng?"
      : "Một quần thể vi khuẩn ban đầu có " + N0 + " cá thể. Sau mỗi giờ, số cá thể gấp đôi giờ trước. Sau " + h + " giờ, quần thể có bao nhiêu cá thể?";
    var q = cdMCQ(prompt,
      ans, [N0 * Math.pow(2, h - 1), N0 * Math.pow(2, h + 1), N0 * (h + 1), N0 * 2 * h],
      "Sau mỗi bước, số lượng nhân 2. Sau " + h + " bước: " + N0 + " × 2^" + h + " = " + N0 + " × " + Math.pow(2, h) + " = " + ans + ".", {});
    return tag(q, "thpt-dayso", "tang-gap-doi");
  }
  var FAM_FORMULA = [
    { terms: [1, 4, 9, 16, 25], f: "uₙ = n²", why: "Các số hạng là 1², 2², 3², 4², 5² nên uₙ = n²." },
    { terms: [2, 5, 10, 17, 26], f: "uₙ = n² + 1", why: "Mỗi số hạng bằng số chính phương tương ứng cộng 1: uₙ = n² + 1." },
    { terms: [1, 3, 5, 7, 9], f: "uₙ = 2n − 1", why: "Đó là dãy số lẻ: uₙ = 2n − 1." },
    { terms: [1, 3, 6, 10, 15], f: "uₙ = n(n + 1)/2", why: "Hiệu tăng dần 2, 3, 4, 5 — đây là số tam giác: uₙ = n(n+1)/2." },
    { terms: [2, 4, 8, 16, 32], f: "uₙ = 2ⁿ", why: "Mỗi số gấp đôi số trước, bắt đầu từ 2: uₙ = 2ⁿ." },
    { terms: [3, 7, 11, 15, 19], f: "uₙ = 4n − 1", why: "Dãy cộng đều với hiệu 4, bắt đầu từ 3: uₙ = 3 + (n−1)×4 = 4n − 1." }
  ];
  function gCongThuc() {
    var fam = cdPick(FAM_FORMULA);
    var wrongs = FAM_FORMULA.filter(function (x) { return x.f !== fam.f; }).map(function (x) { return x.f; });
    var q = cdMCQ("Cho dãy số: " + fam.terms.join(", ") + ", … Công thức số hạng tổng quát của dãy là gì?",
      fam.f, cdShuffle(wrongs).slice(0, 3), fam.why, {});
    return tag(q, "thpt-dayso", "cong-thuc");
  }
  function gDaysoMatch3() {
    var cases = [
      ["5, 9, 13, 17, …", "21"], ["3, 6, 12, 24, …", "48"], ["100, 90, 80, 70, …", "60"],
      ["1, 2, 4, 7, 11, …", "16"], ["2, 5, 10, 17, 26, …", "37"], ["81, 27, 9, 3, …", "1"],
      ["1, 1, 2, 3, 5, …", "8"], ["7, 10, 13, 16, …", "19"]
    ];
    var chosen = cdShuffle(cases).slice(0, 4);
    if (new Set(chosen.map(function (c) { return c[1]; })).size < 4) return null;
    var q = cdMatch("Nối mỗi dãy số với số tiếp theo của dãy nhé!", chosen,
      "Phân loại từng dãy: cấp số cộng (hiệu không đổi), cấp số nhân (tỉ số không đổi), hiệu tăng dần, dạng Fibonacci.");
    return tag(q, "thpt-dayso", "match");
  }
  function gDaysoTF3() {
    var u1 = cdRand(1, 10), d = cdPick([2, 3, 4, 5]);
    var u5 = u1 + 4 * d, S5 = 5 * (2 * u1 + 4 * d) / 2;
    var stmts = [
      { t: "Cấp số cộng u₁ = " + u1 + ", d = " + d + " có u₅ = " + u5 + ".", f: "Cấp số cộng u₁ = " + u1 + ", d = " + d + " có u₅ = " + (u1 + 5 * d) + ".", e: "u₅ = u₁ + 4d = " + u1 + " + " + (4 * d) + " = " + u5 + " (chỉ cộng 4 lần công sai)." },
      { t: "Tổng 5 số hạng đầu của cấp số cộng đó là " + S5 + ".", f: "Tổng 5 số hạng đầu của cấp số cộng đó là " + (S5 + d) + ".", e: "S₅ = 5 × (u₁ + u₅) : 2 = 5 × (" + u1 + " + " + u5 + ") : 2 = " + S5 + "." },
      { t: "Dãy 2, 6, 18, 54, … là cấp số nhân với công bội 3.", f: "Dãy 2, 6, 18, 54, … là cấp số cộng với công sai 4.", e: "Mỗi số gấp 3 lần số trước (2 × 3 = 6, 6 × 3 = 18) — đó là cấp số nhân, không phải cấp số cộng." }
    ];
    var pat = cdPick([[true, true, false], [true, false, true], [false, true, true], [true, false, false]]);
    var rounds = stmts.map(function (s, i) { return { stmt: pat[i] ? s.t : s.f, truth: pat[i], explain: s.e }; });
    return tag(cdTF(rounds), "thpt-dayso", "tf");
  }
  function gDaysoBlank3() {
    var u1 = cdRand(2, 15), d = cdPick([2, 3, 4, 5, 6]);
    var n = cdPick([6, 7, 8, 9, 10]);
    var ans = u1 + (n - 1) * d;
    var vis = sent("Cấp số cộng u₁ = " + u1 + ", d = " + d + " có u" + n + " = " + blankSlot() + ".");
    var q = cdBlank("Điền số hạng còn thiếu của cấp số cộng nhé!", ans, [ans + d, ans - d, u1 + n * d],
      "u" + n + " = u₁ + (" + n + " − 1) × d = " + u1 + " + " + ((n - 1) * d) + " = " + ans + ".", vis);
    return tag(q, "thpt-dayso", "blank-csc");
  }

  /* ================= (b) LOGIC MỆNH ĐỀ ================= */
  var PAIRS_MD = [
    { s: "n chia hết cho 6", w: "n chia hết cho 3", ctx: "số nguyên n", rel: "du" },
    { s: "n chia hết cho 10", w: "n chia hết cho 5", ctx: "số nguyên n", rel: "du" },
    { s: "n chia hết cho 12", w: "n chia hết cho 4", ctx: "số nguyên n", rel: "du" },
    { s: "n chia hết cho 9", w: "n chia hết cho 3", ctx: "số nguyên n", rel: "du" },
    { s: "tứ giác là hình vuông", w: "tứ giác là hình chữ nhật", ctx: "một tứ giác", rel: "du" },
    { s: "tam giác có ba cạnh bằng nhau", w: "tam giác có ba góc bằng nhau", ctx: "một tam giác", rel: "tuongduong" },
    { s: "n là số chẵn và chia hết cho 3", w: "n chia hết cho 6", ctx: "số nguyên n", rel: "tuongduong" }
  ];
  function capFirst(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function gCanDu() {
    var it = cdPick(PAIRS_MD);
    var mode = cdPick(["PduQ", "QcanP", "rel"]);
    var P = "P: «" + capFirst(it.s) + "»", Q = "Q: «" + capFirst(it.w) + "»";
    var head = "Xét " + it.ctx + ". Cho hai mệnh đề ";
    if (it.rel === "tuongduong") {
      var q0 = cdMCQ(head + P + "; " + Q + ". Khẳng định nào đúng?",
        "P là điều kiện cần và đủ của Q", ["P là điều kiện đủ nhưng không cần của Q", "P là điều kiện cần nhưng không đủ của Q", "P không là điều kiện cần, cũng không là điều kiện đủ của Q"],
        "Hai mệnh đề kéo theo nhau cả hai chiều: «" + it.s + "» khi và chỉ khi «" + it.w + "», nên mỗi mệnh đề là điều kiện cần và đủ của mệnh đề kia.", {});
      return tag(q0, "thpt-menhde", "can-va-du");
    }
    if (mode === "PduQ") {
      var q = cdMCQ(head + P + "; " + Q + ". P là điều kiện gì của Q?",
        "Điều kiện đủ", ["Điều kiện cần", "Điều kiện cần và đủ", "Không cần, không đủ"],
        "P kéo theo Q («" + it.s + "» thì chắc chắn «" + it.w + "») nên P là điều kiện đủ của Q. Ngược lại Q không kéo theo P, nên P không là điều kiện cần.", {});
      return tag(q, "thpt-menhde", "du");
    }
    if (mode === "QcanP") {
      var q2 = cdMCQ(head + P + "; " + Q + ". Q là điều kiện gì của P?",
        "Điều kiện cần", ["Điều kiện đủ", "Điều kiện cần và đủ", "Không cần, không đủ"],
        "Muốn có P thì trước hết phải có Q (P kéo theo Q), nên Q là điều kiện cần của P. Nhưng có Q chưa chắc có P, nên Q không là điều kiện đủ.", {});
      return tag(q2, "thpt-menhde", "can");
    }
    var q3 = cdMCQ(head + P + "; " + Q + ". Mệnh đề nào sau đây đúng?",
      "Nếu P thì Q", ["Nếu Q thì P", "P khi và chỉ khi Q", "Nếu không P thì không Q"],
      "«" + it.s + "» kéo theo «" + it.w + "» (ví dụ chia hết cho số lớn hơn thì chia hết cho ước của nó), nhưng chiều ngược lại không đúng.", {});
    return tag(q3, "thpt-menhde", "keo-theo");
  }
  var NEG_BANK = [
    { s: "Mọi học sinh lớp 10A đều nộp bài đúng hạn.", neg: "Có học sinh lớp 10A không nộp bài đúng hạn.", wrongs: ["Mọi học sinh lớp 10A đều không nộp bài đúng hạn.", "Không có học sinh lớp 10A nào nộp bài đúng hạn.", "Có học sinh lớp 10A nộp bài đúng hạn."], why: "Phủ định của «mọi … đều …» là «có … không …»: chỉ cần một học sinh nộp muộn là mệnh đề gốc sai." },
    { s: "Có ít nhất một bạn trong nhóm đạt điểm 10.", neg: "Không có bạn nào trong nhóm đạt điểm 10.", wrongs: ["Mọi bạn trong nhóm đều đạt điểm 10.", "Có bạn trong nhóm không đạt điểm 10.", "Có đúng một bạn trong nhóm đạt điểm 10."], why: "Phủ định của «có ít nhất một» là «không có … nào»: mọi bạn đều không đạt điểm 10." },
    { s: "x > 5 (x là số thực).", neg: "x ≤ 5.", wrongs: ["x < 5.", "x ≥ 5.", "x = 5."], why: "Trên trục số thực, phần bù của (5; +∞) là (−∞; 5], tức x ≤ 5 (phải kể cả trường hợp x = 5)." },
    { s: "Mọi số nguyên tố đều là số lẻ.", neg: "Có số nguyên tố không là số lẻ.", wrongs: ["Mọi số nguyên tố đều là số chẵn.", "Không có số nguyên tố nào là số lẻ.", "Có số nguyên tố là số lẻ."], why: "Phủ định của «mọi A đều B» là «có A không B» — thật vậy, số nguyên tố 2 là số chẵn." },
    { s: "Có một hình bình hành là hình vuông.", neg: "Không có hình bình hành nào là hình vuông.", wrongs: ["Mọi hình bình hành đều là hình vuông.", "Mọi hình vuông đều là hình bình hành.", "Có hình bình hành không là hình vuông."], why: "Phủ định của «có một … là …» là «không có … nào là …»." },
    { s: "Tam giác ABC có ít nhất hai góc nhọn.", neg: "Tam giác ABC có tối đa một góc nhọn.", wrongs: ["Tam giác ABC không có góc nhọn nào.", "Tam giác ABC có ba góc nhọn.", "Tam giác ABC có đúng hai góc tù."], why: "«Ít nhất hai» phủ định là «tối đa một»: tam giác chỉ có thể có 0 hoặc 1 góc nhọn trong trường hợp phủ định (và thật ra một tam giác luôn có ít nhất hai góc nhọn)." }
  ];
  function gPhuDinh2() {
    var it = cdPick(NEG_BANK);
    var q = cdMCQ("Phủ định của mệnh đề «" + it.s + "» là mệnh đề nào?",
      it.neg, it.wrongs, it.why, {});
    return tag(q, "thpt-menhde", "phu-dinh");
  }
  function gPhanDao() {
    /* chỉ dùng cặp số học: mệnh đề phản đảo của cặp hình học dài quá 60 ký tự (giới hạn đáp án của game) */
    var it = cdPick(PAIRS_MD.filter(function (x) { return x.rel === "du" && x.s.indexOf("n ") === 0; }));
    var P = it.s, Q = it.w;
    var NEGS = {
      "n chia hết cho 6": "n không chia hết cho 6", "n chia hết cho 3": "n không chia hết cho 3",
      "n chia hết cho 10": "n không chia hết cho 10", "n chia hết cho 5": "n không chia hết cho 5",
      "n chia hết cho 12": "n không chia hết cho 12", "n chia hết cho 4": "n không chia hết cho 4",
      "n chia hết cho 9": "n không chia hết cho 9", "tứ giác là hình vuông": "tứ giác không là hình vuông",
      "tứ giác là hình chữ nhật": "tứ giác không là hình chữ nhật"
    };
    var nP = NEGS[it.s], nQ = NEGS[it.w];
    var cap = function (t) { return t.charAt(0).toUpperCase() + t.slice(1); };
    var right = "Nếu " + nQ + " thì " + nP + ".";
    var wrongs = [
      "Nếu " + Q + " thì " + P + ".",
      "Nếu " + nP + " thì " + nQ + ".",
      "Nếu " + P + " thì " + nQ + "."
    ];
    var q = cdMCQ("Cho mệnh đề: «Nếu " + P + " thì " + Q + ".» Mệnh đề nào sau đây TƯƠNG ĐƯƠNG với mệnh đề đã cho?",
      cap(right), wrongs.map(cap),
      "Mệnh đề P ⇒ Q tương đương với mệnh đề phản đảo ¬Q ⇒ ¬P: «Nếu " + nQ + " thì " + nP + "». Mệnh đề đảo Q ⇒ P và mệnh đề phản ¬P ⇒ ¬Q không tương đương với mệnh đề gốc.", {});
    return tag(q, "thpt-menhde", "phan-dao");
  }
  function gMenhdeTF2() {
    var n = cdRand(6, 30);
    function isPrime(x) { if (x < 2) return false; for (var i = 2; i * i <= x; i++) if (x % i === 0) return false; return true; }
    var ev = n % 2 === 0, dv3 = n % 3 === 0, dv6 = n % 6 === 0, pr = isPrime(n);
    var bank = [
      { t: n + " chia hết cho 3 kéo theo " + n + " chia hết cho 6.", truth: (!dv3 || dv6), e: "Mệnh đề kéo theo chỉ sai khi giả thiết đúng mà kết luận sai. Ở đây giả thiết «" + n + " chia hết cho 3» " + (dv3 ? "đúng" : "sai") + " và kết luận «chia hết cho 6» " + (dv6 ? "đúng" : "sai") + "." },
      { t: n + " là số chẵn kéo theo " + n + " chia hết cho 4.", truth: (!ev || n % 4 === 0), e: "Kiểm tra trực tiếp: " + n + (n % 4 === 0 ? " chia hết cho 4." : " không chia hết cho 4, và " + n + (ev ? " là số chẵn nên mệnh đề kéo theo sai." : " là số lẻ nên giả thiết sai, mệnh đề kéo theo đúng.")) },
      { t: "Phủ định của mệnh đề «" + n + " là số nguyên tố» là «" + n + " không là số nguyên tố».", truth: true, e: "Phủ định chỉ thêm/phủ nhận đúng phần khẳng định, giữ nguyên đối tượng: «không là số nguyên tố»." },
      { t: n + " là số chính phương.", truth: Math.sqrt(n) === Math.floor(Math.sqrt(n)), e: n + (Math.sqrt(n) === Math.floor(Math.sqrt(n)) ? " = " + Math.sqrt(n) + "² nên là số chính phương." : " nằm giữa hai số chính phương liên tiếp nên không phải số chính phương.") },
      { t: n + " là hợp số.", truth: !pr && n > 1, e: n + (pr ? " là số nguyên tố, không phải hợp số." : " có ước khác 1 và chính nó nên là hợp số.") }
    ];
    var trues = bank.filter(function (b) { return b.truth; }), falses = bank.filter(function (b) { return !b.truth; });
    if (!trues.length || !falses.length) return null; /* n khiến mọi mệnh đề cùng phán quyết → bỏ lượt */
    var chosen = [cdPick(trues), cdPick(falses)];
    var rest = bank.filter(function (b) { return chosen.indexOf(b) < 0; });
    chosen.push(cdPick(rest));
    chosen = cdShuffle(chosen);
    var q = cdTF(chosen.map(function (s) { return { stmt: s.t, truth: s.truth, explain: s.e }; }), "Đúng hay sai? Xét số nguyên n = " + n + ".");
    return tag(q, "thpt-menhde", "tf-cu-the");
  }
  function gMenhdeMatch() {
    var chosen = cdShuffle(NEG_BANK).slice(0, 4);
    var pairs = chosen.map(function (it) { return ["«" + it.s + "»", "«" + it.neg + "»"]; });
    if (new Set(pairs.map(function (p) { return p[1]; })).size < 4) return null;
    var q = cdMatch("Nối mỗi mệnh đề với phủ định đúng của nó nhé!", pairs,
      "Quy tắc: «mọi … đều …» ↔ «có … không …»; «có …» ↔ «không có … nào»; bất đẳng thức đổi chiều và giữ dấu bằng (x > 5 ↔ x ≤ 5).");
    return tag(q, "thpt-menhde", "match");
  }
  function gMenhdeBlank() {
    var cases = [
      { ineq: ">", num: 5, ans: "≤", why: "Phần bù của x > 5 là x ≤ 5 (kể cả giá trị bằng 5)." },
      { ineq: "<", num: 3, ans: "≥", why: "Phần bù của x < 3 là x ≥ 3." },
      { ineq: "≥", num: 7, ans: "<", why: "Phần bù của x ≥ 7 là x < 7." },
      { ineq: "≤", num: 2, ans: ">", why: "Phần bù của x ≤ 2 là x > 2." },
      { ineq: "=", num: 4, ans: "≠", why: "Phủ định của đẳng thức là bất đẳng thức khác: x ≠ 4." }
    ];
    var c = cdPick(cases);
    /* ký hiệu < và > phải mã hoá thực thể ở mọi nơi chèn vào HTML (câu hiển thị và thẻ lựa chọn) */
    var enc = function (s) { return s === "<" ? "&lt;" : s === ">" ? "&gt;" : s; };
    var vis = sent("Phủ định của «x " + enc(c.ineq) + " " + c.num + "» là «x " + blankSlot() + " " + c.num + "».");
    var q = cdBlank("Điền dấu đúng để được mệnh đề phủ định nhé!", enc(c.ans), ["<", ">", "≤", "≥", "≠", "="].filter(function (s) { return s !== c.ans; }).slice(0, 3).map(enc),
      c.why, vis);
    if (q) q.blankText = c.ans;
    return tag(q, "thpt-menhde", "blank-dau");
  }

  /* ================= (c) TỔ HỢP TƯ DUY ================= */
  function gPin() {
    var kind = cdPick(["nozero", "distinct", "any"]);
    var ans, expl, prompt;
    if (kind === "nozero") {
      ans = 9 * 10 * 10 * 10;
      prompt = "Một mã PIN gồm 4 chữ số, chữ số đầu tiên khác 0 (các chữ số còn lại tùy ý, có thể lặp lại). Có bao nhiêu mã PIN như vậy?";
      expl = "Chữ số đầu có 9 cách chọn (1–9), mỗi chữ số sau có 10 cách. Tổng số: 9 × 10 × 10 × 10 = " + ans + ".";
    } else if (kind === "distinct") {
      ans = 9 * 9 * 8 * 7;
      prompt = "Một số tự nhiên có 4 chữ số đôi một khác nhau được lập từ các chữ số 0–9 (chữ số đầu khác 0). Có bao nhiêu số như vậy?";
      expl = "Chữ số đầu: 9 cách (khác 0). Chữ số thứ hai: 9 cách (dùng được 0 nhưng khác chữ số đầu). Tiếp theo 8 và 7 cách. Tổng: 9 × 9 × 8 × 7 = " + ans + ".";
    } else {
      ans = 10 * 10 * 10 * 10;
      prompt = "Một mật khẩu gồm 4 ký tự, mỗi ký tự là một chữ số 0–9, các ký tự có thể lặp lại và ký tự đầu có thể là 0. Có bao nhiêu mật khẩu như vậy?";
      expl = "Mỗi vị trí có 10 cách chọn độc lập: 10⁴ = " + ans + ".";
    }
    var q = cdMCQ(prompt, ans, [ans / 10 * 9 === ans ? ans - 1000 : Math.round(ans * 0.9), ans + 1000, ans - 900, 4 * 10 * 10],
      expl, {});
    return tag(q, "thpt-tohop", "ma-" + kind);
  }
  function gChucVu() {
    var n = cdPick([8, 9, 10, 11, 12]);
    var mode = cdPick(["perm", "comb", "contrast"]);
    if (mode === "perm") {
      var ans = n * (n - 1);
      var q = cdMCQ("Lớp có " + n + " học sinh. Cần bầu một lớp trưởng và một lớp phó (hai bạn khác nhau). Có bao nhiêu cách bầu?",
        ans, [Cnk(n, 2), ans + n, n * n],
        "Chọn lớp trưởng: " + n + " cách; chọn lớp phó: " + (n - 1) + " cách. Hai chức vụ khác nhau nên thứ tự có ý nghĩa: " + n + " × " + (n - 1) + " = " + ans + " cách.", {});
      return tag(q, "thpt-tohop", "chinh-hop");
    }
    if (mode === "comb") {
      var k = cdPick([3, 4]);
      var ans2 = Cnk(n, k);
      var q2 = cdMCQ("Lớp có " + n + " học sinh. Cần chọn một nhóm " + k + " bạn đi dự hoạt động (không phân chức vụ). Có bao nhiêu cách chọn?",
        ans2, [ans2 * k, n * (n - 1) * (n - 2), ans2 + n],
        "Chọn nhóm không thứ tự: C(" + n + ", " + k + ") = " + ans2 + " cách.", {});
      return tag(q2, "thpt-tohop", "to-hop");
    }
    var ansP = n * (n - 1), ansC = Cnk(n, 2);
    var q3 = cdMCQ("Lớp có " + n + " học sinh. Số cách bầu một lớp trưởng và một lớp phó (hai chức vụ khác nhau) gấp mấy lần số cách chọn một nhóm 2 bạn không phân chức vụ?",
      "2 lần", ["Bằng nhau", (ansP - ansC) + " lần", n + " lần"],
      "Bầu chức vụ: " + n + " × " + (n - 1) + " = " + ansP + " cách. Chọn nhóm 2 bạn: C(" + n + ", 2) = " + ansC + ". Mỗi nhóm 2 bạn ứng với 2 cách phân chức vụ, nên tỉ lệ là 2 lần.", {});
    return tag(q3, "thpt-tohop", "so-sanh");
  }
  function factN(x) { var r = 1; for (var i = 2; i <= x; i++) r *= i; return r; }
  function gBanTron() {
    var mode = cdPick(["tron", "tron", "ke-nhau"]);
    if (mode === "tron") {
      var n = cdPick([4, 5, 6, 7]);
      var ans = factN(n - 1);
      var q = cdMCQ("Có " + n + " bạn ngồi quanh một bàn tròn, các ghế không đánh số. Hỏi có bao nhiêu cách xếp chỗ ngồi khác nhau? (Hai cách xếp chỉ khác nhau bởi phép quay bàn được coi là một.)",
        ans, [factN(n), ans * 2, Math.round(ans / 2)],
        "Cố định chỗ của một bạn làm mốc, " + (n - 1) + " bạn còn lại xếp tự do: (" + n + " − 1)! = " + ans + " cách. Xếp quanh bàn tròn luôn ít hơn xếp hàng ngang " + n + " lần vì các phép quay trùng nhau.", {});
      return tag(q, "thpt-tohop", "ban-tron");
    }
    var m = cdPick([5, 6]);
    var ans2 = 2 * factN(m - 2);
    var q2 = cdMCQ("Có " + m + " bạn ngồi quanh một bàn tròn, trong đó có hai bạn An và Bình. Có bao nhiêu cách xếp để An và Bình ngồi cạnh nhau?",
      ans2, [factN(m - 1), 2 * factN(m - 1), factN(m - 2)],
      "Gom An và Bình thành một khối: còn " + (m - 1) + " đơn vị xếp quanh bàn tròn: (" + (m - 1) + " − 1)! = " + factN(m - 2) + " cách. Trong khối, An và Bình đổi chỗ được 2 cách. Tổng: 2 × " + factN(m - 2) + " = " + ans2 + " cách.", {});
    return tag(q2, "thpt-tohop", "ban-tron-ke");
  }
  function gItNhatMot() {
    var nam = cdPick([5, 6, 7]), nu = cdPick([4, 5, 6]), k = 3;
    var total = Cnk(nam + nu, k), none = Cnk(nam, k), ans = total - none;
    var q = cdMCQ("Một nhóm có " + nam + " bạn nam và " + nu + " bạn nữ. Chọn ngẫu nhiên " + k + " bạn. Có bao nhiêu cách chọn sao cho có ít nhất một bạn nữ?",
      ans, [total, none, Cnk(nu, 1) * Cnk(nam + nu - 1, k - 1) === ans ? ans + 5 : Cnk(nu, k) + Cnk(nu, 1) * Cnk(nam, 2), ans + none],
      "Dùng phần bù: tổng số cách chọn là C(" + (nam + nu) + ", " + k + ") = " + total + ". Số cách không có bạn nữ nào (chọn toàn nam) là C(" + nam + ", " + k + ") = " + none + ". Vậy đáp án: " + total + " − " + none + " = " + ans + ".", {});
    return tag(q, "thpt-tohop", "it-nhat-mot");
  }
  function gChuongBoCau() {
    var kind = cdPick(["sock", "month", "card"]);
    if (kind === "sock") {
      var c = cdPick([3, 4, 5, 6]);
      var q = cdMCQ("Trong ngăn kéo có tất và tất cả đều khác nhau từng chiếc, gồm " + c + " màu khác nhau (mỗi màu có rất nhiều chiếc). Bạn nhắm mắt lấy từng chiếc một. Phải lấy ít nhất bao nhiêu chiếc để CHẮC CHẮN có hai chiếc cùng màu?",
        c + 1, [c, c + 2, 2 * c],
        "Trường hợp xấu nhất: lấy được mỗi màu đúng một chiếc sau " + c + " lần. Chiếc thứ " + (c + 1) + " chắc chắn trùng màu với một chiếc đã lấy (nguyên lý chuồng bồ câu).", {});
      return tag(q, "thpt-tohop", "tat-cung-mau");
    }
    if (kind === "month") {
      var q2 = cdMCQ("Một lớp có 25 học sinh. Khẳng định nào sau đây CHẮC CHẮN đúng?",
        "Có ít nhất 3 bạn sinh cùng một tháng", ["Có đúng 2 bạn sinh cùng một tháng", "Mọi tháng đều có bạn sinh nhật", "Có ít nhất 4 bạn sinh cùng một tháng"],
        "25 bạn chia vào 12 tháng: 25 = 12 × 2 + 1, nên theo nguyên lý chuồng bồ câu có ít nhất một tháng chứa từ 3 bạn trở lên.", {});
      return tag(q2, "thpt-tohop", "thang-sinh");
    }
    var q3 = cdMCQ("Trong một hộp có 5 cây bút đỏ, 4 cây bút xanh và 3 cây bút đen (các bút cùng màu giống hệt nhau). Bạn nhắm mắt lấy từng cây. Phải lấy ít nhất bao nhiêu cây để CHẮC CHẮN lấy được một cây bút đỏ?",
      8, [6, 5, 12],
      "Trường hợp xấu nhất: lấy hết 4 xanh + 3 đen = 7 cây mà chưa có đỏ. Cây thứ 8 chắc chắn là đỏ.", {});
    return tag(q3, "thpt-tohop", "but-do");
  }
  function gBaoHam() {
    var A = cdPick([12, 15, 18, 20]), B = cdPick([10, 14, 16]), both = cdPick([4, 5, 6, 7, 8]);
    if (both > Math.min(A, B)) both = Math.min(A, B) - 2;
    var ans = A + B - both;
    var q = cdMCQ("Trong một lớp, có " + A + " bạn biết chơi cờ vua, " + B + " bạn biết chơi cờ tướng, " + both + " bạn biết chơi cả hai môn. Có bao nhiêu bạn biết chơi ít nhất một trong hai môn?",
      ans, [A + B, ans + both, A + B + both, Math.max(A, B)],
      "Cộng hai nhóm rồi trừ phần giao bị đếm hai lần: " + A + " + " + B + " − " + both + " = " + ans + ".", {});
    return tag(q, "thpt-tohop", "bao-ham-loai-tru");
  }
  function gTohopBlank() {
    var n = cdPick([6, 7, 8, 9, 10]), k = cdPick([2, 3]);
    var ans = Cnk(n, k);
    var vis = sent("Số cách chọn " + k + " bạn trong " + n + " bạn (không thứ tự) là C(" + n + ", " + k + ") = " + blankSlot() + ".");
    var q = cdBlank("Điền số cách chọn đúng nhé!", ans, [ans * k, n * (n - 1), ans + n],
      "C(" + n + ", " + k + ") = " + ans + ".", vis);
    return tag(q, "thpt-tohop", "blank-cnk");
  }
  function gTohopMatch() {
    var cases = [
      ["Chọn 2 bạn trong 6 bạn (không thứ tự)", "15"],
      ["Bầu trưởng + phó từ 5 bạn", "20"],
      ["Mã gồm 2 chữ số, có thể lặp lại", "100"],
      ["Số đường chéo của ngũ giác", "5"],
      ["Chọn 3 bạn trong 5 bạn", "10"],
      ["Xếp 4 bạn thành một hàng", "24"]
    ];
    var chosen = cdShuffle(cases).slice(0, 4);
    var q = cdMatch("Nối mỗi tình huống đếm với số cách đúng nhé!", chosen,
      "Phân biệt chọn có thứ tự (chỉnh hợp/hoán vị) và không thứ tự (tổ hợp) trước khi tính.");
    return tag(q, "thpt-tohop", "match");
  }
  function gTohopTF() {
    var stmts = [
      { t: "Số cách chọn 2 bạn trong 5 bạn là 10.", f: "Số cách chọn 2 bạn trong 5 bạn là 20.", e: "C(5, 2) = 10. Số 20 là số cách chọn có thứ tự (5 × 4)." },
      { t: "Xếp 4 bạn khác nhau thành một hàng có 24 cách.", f: "Xếp 4 bạn khác nhau thành một hàng có 16 cách.", e: "Hoán vị 4 phần tử: 4! = 4 × 3 × 2 × 1 = 24." },
      { t: "13 học sinh thì chắc chắn có hai bạn sinh cùng tháng.", f: "12 học sinh thì chắc chắn có hai bạn sinh cùng tháng.", e: "Có 12 tháng; cần 12 + 1 = 13 học sinh mới chắc chắn có hai bạn trùng tháng (12 bạn có thể mỗi người một tháng khác nhau)." },
      { t: "Số mã PIN 3 chữ số (có thể lặp, kể cả số 0 ở đầu) là 1000.", f: "Số mã PIN 3 chữ số (có thể lặp, kể cả số 0 ở đầu) là 720.", e: "Mỗi vị trí 10 lựa chọn: 10³ = 1000 (720 là số mã không lặp chữ số)." }
    ];
    var chosen = cdShuffle(stmts).slice(0, 3);
    var pat = cdPick([[true, false, true], [false, true, true], [true, true, false], [false, true, false], [true, false, false]]);
    /* bank quy ước: t là mệnh đề ĐÚNG, f là mệnh đề SAI cùng nội dung */
    var rounds = chosen.map(function (s, i) {
      return pat[i] ? { stmt: s.t, truth: true, explain: s.e } : { stmt: s.f, truth: false, explain: s.e };
    });
    return tag(cdTF(rounds), "thpt-tohop", "tf");
  }

  /* ================= (d) BÀI TOÁN THỰC TẾ & ƯỚC LƯỢNG ================= */
  function fmtNum(v) { return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
  var FERMI = [
    { s: "Số học sinh trung học phổ thông trên cả nước vào khoảng bao nhiêu?", ans: "3 000 000", opts: ["300 000", "3 000 000", "30 000 000"], why: "Dân số khoảng 100 triệu người; học sinh THPT chiếm chừng 3% dân số, vào khoảng 3 triệu — đúng bậc độ lớn." },
    { s: "Một người trưởng thành chớp mắt khoảng bao nhiêu lần trong một ngày?", ans: "15 000 lần", opts: ["1 500 lần", "15 000 lần", "150 000 lần"], why: "Chớp mắt chừng 15–20 lần mỗi phút; 16 giờ thức là khoảng 1 000 phút, nhân lên được chừng 15 000 lần." },
    { s: "Chiều dài đường bờ biển của Việt Nam vào khoảng bao nhiêu ki-lô-mét?", ans: "3 260 km", opts: ["326 km", "3 260 km", "32 600 km"], why: "Đường bờ biển Việt Nam được công bố khoảng 3 260 km — chọn bậc độ lớn khớp với con số quen thuộc này." },
    { s: "Một chiếc xe buýt thành phố chở đầy khách có khoảng bao nhiêu hành khách?", ans: "60 người", opts: ["6 người", "60 người", "600 người"], why: "Xe buýt lớn có chừng 40–50 ghế ngồi cộng khách đứng, đầy xe vào khoảng 60 người." },
    { s: "Số trang của một bộ sách giáo khoa Toán từ lớp 1 đến lớp 12 cộng lại vào khoảng bao nhiêu?", ans: "4 000 trang", opts: ["400 trang", "4 000 trang", "40 000 trang"], why: "Mỗi cuốn khoảng 150–300 trang; khoảng 15–20 cuốn sách Toán cho 12 năm học cho ra chừng 4 000 trang." }
  ];
  function gFermi() {
    var it = cdPick(FERMI);
    var q = cdMCQ(it.s + " (Chọn ước lượng hợp lý nhất theo bậc độ lớn.)", it.ans, it.opts.filter(function (o) { return o !== it.ans; }), it.why, {});
    return tag(q, "thpt-thucte", "fermi");
  }
  function gLaiKep() {
    var round2 = Math.random() < 0.5;
    var P, years, rate = 10;
    if (round2) { P = cdPick([100, 200, 250, 400, 500]) * 10000; years = 2; }
    else { P = cdPick([100, 200, 300, 500]) * 100000; years = 3; }
    var factor = Math.pow(1 + rate / 100, years);
    var A = Math.round(P * factor);
    var simple = Math.round(P * (1 + rate / 100 * years));
    var wrongYears = Math.round(P * Math.pow(1 + rate / 100, years - 1));
    var A2 = Math.round(P * Math.pow(1 + rate / 100, years + 1));
    var q = cdMCQ("Gửi tiết kiệm " + fmtNum(P) + " đồng với lãi suất " + rate + "%/năm, lãi nhập vào gốc mỗi năm (lãi kép). Sau " + years + " năm, tổng số tiền (gốc và lãi) là bao nhiêu đồng?",
      fmtNum(A), [fmtNum(simple), fmtNum(wrongYears), fmtNum(A2)],
      "Lãi kép: A = P × (1 + r)^n = " + fmtNum(P) + " × 1,1^" + years + " = " + fmtNum(A) + " đồng. (Lãi đơn cho cùng kỳ hạn chỉ được " + fmtNum(simple) + " đồng.)", {});
    return tag(q, "thpt-thucte", "lai-kep-" + years + "nam");
  }
  function gPhanTramKep() {
    var price = cdPick([100, 200, 400, 500, 800]) * 1000;
    var up = cdPick([10, 20, 25]), down = cdPick([10, 20, 25]);
    var after = Math.round(price * (1 + up / 100) * (1 - down / 100));
    var naive = Math.round(price * (1 + (up - down) / 100));
    var f = function (v) { return (v === Math.round(v) ? fmtNum(v) : String(Math.round(v * 100) / 100).replace(".", ",")) + " nghìn đồng"; };
    var priceTxt = fmtNum(price / 1000) + " nghìn đồng";
    var q = cdMCQ("Một món hàng giá " + priceTxt + ". Đầu năm tăng giá " + up + "%, cuối năm lại giảm " + down + "% so với giá sau tăng. Giá cuối cùng là bao nhiêu?",
      f(after / 1000), [f(naive / 1000), priceTxt, f(Math.round(price * (1 - down / 100)) / 1000)],
      "Sau tăng: " + fmtNum(price / 1000) + " × " + (100 + up) + "% = " + f(Math.round(price * (1 + up / 100)) / 1000).replace(" nghìn đồng", "") + " nghìn đồng. Sau giảm: nhân tiếp " + (100 - down) + "% được " + f(after / 1000) + ". Lưu ý phần trăm giảm tính trên giá MỚI, nên kết quả khác cách tính " + up + "% − " + down + "%.", {});
    return tag(q, "thpt-thucte", "tang-giam-lien-tiep");
  }
  function gToiUuChuVi() {
    var P = cdPick([20, 24, 28, 32, 36, 40]);
    var half = P / 2;
    var best = Math.floor(half / 2), best2 = half - best;
    var maxA = best * best2;
    var variant = Math.random() < 0.5 ? "area" : "dims";
    if (variant === "area") {
      var q = cdMCQ("Dùng một sợi dây dài " + P + " m rào một mảnh vườn hình chữ nhật (dùng hết dây cho cả 4 phía). Diện tích lớn nhất có thể của mảnh vườn là bao nhiêu mét vuông?",
        maxA + " m²", [(best - 1) * (best2 + 1) + " m²", (half - 1) * 1 + " m²", (P / 4) * (P / 4) === maxA ? (maxA + 2) + " m²" : (P / 4) * (P / 4) + " m²"],
        "Nửa chu vi là " + half + " m: dài + rộng = " + half + ". Tích hai số có tổng cố định lớn nhất khi hai số gần nhau nhất: " + best + " × " + best2 + " = " + maxA + " m².", {});
      return tag(q, "thpt-thucte", "toi-uu-dien-tich");
    }
    var opts = [];
    var pairs = [[best, best2], [best - 1, best2 + 1], [best - 2, best2 + 2], [1, half - 1]];
    pairs.forEach(function (pr) { if (pr[0] >= 1) opts.push(pr[0] + " m × " + pr[1] + " m"); });
    var q2 = cdMCQ("Chu vi một hình chữ nhật là " + P + " m (các cạnh đo bằng mét nguyên). Kích thước nào cho diện tích lớn nhất?",
      opts[0], opts.slice(1), "Với chu vi cố định, hình chữ nhật có diện tích lớn nhất khi hai cạnh gần bằng nhau nhất (hình vuông khi chia hết). Ở đây là " + best + " m × " + best2 + " m với diện tích " + maxA + " m².", {});
    return tag(q2, "thpt-thucte", "toi-uu-kich-thuoc");
  }
  function gSoSanhGia() {
    var combo = cdPick([[3, 24000], [3, 30000], [3, 36000], [4, 24000], [4, 36000], [4, 40000], [5, 30000], [5, 40000], [5, 35000]]);
    var n1 = combo[0], p1 = combo[1];
    var per1 = p1 / n1;
    var delta = cdPick([-2000, -1000, 1000, 2000]);
    var n2 = n1 + cdPick([1, 2]);
    var per2 = per1 + delta;
    var p2 = per2 * n2;
    var cheaper2 = delta < 0;
    var q = cdMCQ("Gói A gồm " + n1 + " hộp giá " + fmtNum(p1) + " đồng. Gói B gồm " + n2 + " hộp cùng loại giá " + fmtNum(p2) + " đồng. Tính theo giá mỗi hộp, gói nào rẻ hơn?",
      cheaper2 ? "Gói B" : "Gói A", [cheaper2 ? "Gói A" : "Gói B", "Hai gói bằng nhau"],
      "Mỗi hộp gói A: " + fmtNum(p1) + " : " + n1 + " = " + fmtNum(per1) + " đồng. Mỗi hộp gói B: " + fmtNum(p2) + " : " + n2 + " = " + fmtNum(per2) + " đồng. Vậy gói " + (cheaper2 ? "B" : "A") + " rẻ hơn mỗi hộp.", {});
    return tag(q, "thpt-thucte", "so-sanh-don-gia");
  }
  function gThucteBlank() {
    var P = cdPick([2, 4, 5, 10]) * 1000000, r = cdPick([5, 6, 8, 10]), t = cdPick([2, 3]);
    var interest = P * r * t / 100;
    var vis = sent("Lãi đơn: " + fmtNum(P) + " × " + r + "% × " + t + " = " + blankSlot() + " đồng.");
    var q = cdBlank("Gửi " + fmtNum(P) + " đồng lãi đơn " + r + "%/năm trong " + t + " năm (lãi không nhập gốc). Điền số tiền lãi (đồng) nhé!",
      fmtNum(interest), [fmtNum(Math.round(P * Math.pow(1 + r / 100, t)) - P), fmtNum(P * r / 100), fmtNum(interest * 2)],
      "Lãi đơn = gốc × lãi suất × thời gian = " + fmtNum(P) + " × " + r + "% × " + t + " = " + fmtNum(interest) + " đồng.", vis);
    return tag(q, "thpt-thucte", "blank-lai-don");
  }
  function gThucteMatch() {
    var cases = [
      ["Gửi 100 triệu, lãi đơn 10%/năm, 2 năm — tiền lãi", "20 triệu đồng"],
      ["Gửi 100 triệu, lãi kép 10%/năm, 2 năm — tiền lãi", "21 triệu đồng"],
      ["Tăng 100% một giá 50 nghìn đồng", "100 nghìn đồng"],
      ["Giảm 50% một giá 80 nghìn đồng", "40 nghìn đồng"],
      ["Chu vi 20 m — hình vuông có diện tích", "25 m²"]
    ];
    var chosen = cdShuffle(cases).slice(0, 4);
    if (new Set(chosen.map(function (c) { return c[1]; })).size < 4) return null;
    var q = cdMatch("Nối mỗi tình huống với kết quả đúng nhé!", chosen,
      "Chú ý phân biệt lãi đơn (chỉ tính trên gốc) và lãi kép (lãi nhập gốc); với chu vi cố định, hình vuông cho diện tích lớn nhất.");
    return tag(q, "thpt-thucte", "match");
  }
  function gThucteTF() {
    var stmts = [
      { t: "Tăng một giá lên 20% rồi giảm giá mới 20% thì trở về giá ban đầu.", truth: false, e: "Sai: sau tăng giá là 120%, giảm 20% của 120% còn 96% giá gốc." },
      { t: "Lãi kép luôn cho tổng tiền lớn hơn lãi đơn cùng gốc, cùng lãi suất, sau từ 2 kỳ trở lên.", truth: true, e: "Đúng: từ kỳ thứ hai, lãi được tính cả trên phần lãi đã sinh ra." },
      { t: "Với chu vi cố định, hình chữ nhật càng «dẹt» thì diện tích càng lớn.", truth: false, e: "Ngược lại: hai cạnh càng gần bằng nhau thì diện tích càng lớn; cực đại ở hình vuông." },
      { t: "Ước lượng Fermi chỉ cần đúng bậc độ lớn (hàng chục, trăm, nghìn…), không cần con số chính xác.", truth: true, e: "Đúng: mục tiêu của ước lượng Fermi là bậc độ lớn tin cậy được bằng các phép nhân/chia đơn giản." }
    ];
    var chosen = cdShuffle(stmts).slice(0, 3);
    var truths = chosen.map(function (s) { return s.truth; });
    if (truths.every(function (x) { return x; }) || truths.every(function (x) { return !x; })) return null;
    return tag(cdTF(chosen.map(function (s) { return { stmt: s.t, truth: s.truth, explain: s.e }; })), "thpt-thucte", "tf");
  }

  /* ================= (e) ĐỌC ĐỒ THỊ & SUY LUẬN SỐ LIỆU ================= */
  function gDocDuongThang() {
    for (var tries = 0; tries < 40; tries++) {
      var a = cdPick([1, 2]), b = cdRand(0, 4), x0 = cdRand(1, 5);
      var y = a * x0 + b;
      if (y < 1 || y > 10) continue;
      var q = cdMCQ("Đồ thị là đường thẳng y = " + (a === 1 ? "x" : a + "x") + (b > 0 ? " + " + b : "") + ". Điểm được đánh dấu trên đồ thị có hoành độ x = " + x0 + ". Tung độ của điểm đó bằng bao nhiêu?",
        y, [y + a, y - a > 0 ? y - a : y + 2 * a, a * x0, y + 1],
        "Thay x = " + x0 + " vào công thức: y = " + a + " × " + x0 + (b > 0 ? " + " + b : "") + " = " + y + ". Điểm đánh dấu trên đồ thị cũng cho đúng giá trị này.", { figure: figLineSVG(a, b, x0), figureOnly: false });
      return tag(q, "thpt-dothi", "doc-duong-thang");
    }
    return null;
  }
  function barSVG(cats, vals, unit) {
    var maxV = Math.max.apply(null, vals), W = 300, base = 150, top = 26;
    var s = figOpen("0 0 " + W + " 186", "Biểu đồ cột");
    var bw = 40, gap = (W - 40 - cats.length * bw) / (cats.length + 1);
    vals.forEach(function (v, i) {
      var h = Math.round((base - top) * v / maxV);
      var x = 20 + gap + i * (bw + gap);
      s += '<rect x="' + x + '" y="' + (base - h) + '" width="' + bw + '" height="' + h + '" fill="#dcecfb" stroke="#2f6db3" stroke-width="2"/>';
      s += figText(x + bw / 2, base - h - 6, String(v), "middle", 13, "#33302a");
      s += figText(x + bw / 2, base + 16, cats[i], "middle", 11, "#33302a");
    });
    s += '<line x1="16" y1="' + base + '" x2="' + (W - 10) + '" y2="' + base + '" stroke="#33302a" stroke-width="2"/>';
    s += figText(W / 2, 180, unit, "middle", 11, "#777777");
    return s + "</svg>";
  }
  var BARCTX = [
    { cats: ["A", "B", "C", "D"], unit: "Số học sinh của 4 tổ", thing: "tổ" },
    { cats: ["T2", "T3", "T4", "T5"], unit: "Số bài tập hoàn thành theo ngày", thing: "ngày" },
    { cats: ["Đỏ", "Xanh", "Vàng", "Tím"], unit: "Số học sinh yêu thích mỗi màu", thing: "màu" }
  ];
  function gDocCot() {
    var ctx = cdPick(BARCTX);
    var vals = [cdRand(4, 28), cdRand(4, 28), cdRand(4, 28), cdRand(4, 28)];
    var guard = 0;
    while (new Set(vals).size < 4 && guard++ < 40) vals = [cdRand(4, 28), cdRand(4, 28), cdRand(4, 28), cdRand(4, 28)];
    if (new Set(vals).size < 4) return null;
    var total = vals.reduce(function (x, y) { return x + y; }, 0);
    var maxI = vals.indexOf(Math.max.apply(null, vals));
    var mode = cdPick(["max", "total", "diff"]);
    var fig = barSVG(ctx.cats, vals, ctx.unit);
    if (mode === "max") {
      var q = cdMCQ("Quan sát biểu đồ cột (" + ctx.unit.toLowerCase() + "). " + (ctx.thing === "ngày" ? "Ngày" : ctx.thing === "màu" ? "Màu" : "Tổ") + " nào có số lượng cao nhất?",
        ctx.cats[maxI], ctx.cats.filter(function (c, i) { return i !== maxI; }),
        "Cột cao nhất là cột " + ctx.cats[maxI] + " với giá trị " + vals[maxI] + ".", { figure: fig, figureOnly: true });
      return tag(q, "thpt-dothi", "cot-cao-nhat");
    }
    if (mode === "total") {
      var q2 = cdMCQ("Quan sát biểu đồ cột (" + ctx.unit.toLowerCase() + "). Tổng số lượng của cả bốn cột là bao nhiêu?",
        total, [total + vals[0], total - vals[3], Math.max.apply(null, vals)],
        "Cộng chiều cao bốn cột: " + vals.join(" + ") + " = " + total + ".", { figure: fig, figureOnly: true });
      return tag(q2, "thpt-dothi", "cot-tong");
    }
    var i1 = cdRand(0, 3), i2 = cdRand(0, 3);
    if (i1 === i2) i2 = (i2 + 1) % 4;
    var diff = Math.abs(vals[i1] - vals[i2]);
    var q3 = cdMCQ("Quan sát biểu đồ cột (" + ctx.unit.toLowerCase() + "). Số lượng ở cột " + ctx.cats[i1] + " nhiều/ít hơn cột " + ctx.cats[i2] + " bao nhiêu?",
      diff, [diff + 2, diff + 5, vals[i1] + vals[i2]],
      "Cột " + ctx.cats[i1] + " có giá trị " + vals[i1] + ", cột " + ctx.cats[i2] + " có giá trị " + vals[i2] + ". Chênh lệch: |" + vals[i1] + " − " + vals[i2] + "| = " + diff + ".", { figure: fig, figureOnly: true });
    return tag(q3, "thpt-dothi", "cot-chenh");
  }
  function gDocST() {
    var t = cdPick([2, 3, 4, 5, 6]), v = cdPick([3, 4, 5, 6, 8, 10, 12]);
    var s = t * v;
    var q = cdMCQ("Đồ thị quãng đường – thời gian của một chuyển động thẳng đều được vẽ như hình bên (đoạn thẳng đi qua gốc tọa độ và điểm cuối được đánh dấu). Vận tốc của chuyển động là bao nhiêu m/s?",
      v, [v + 1, v - 1 > 0 ? v - 1 : v + 2, s, t],
      "Điểm cuối của đồ thị cho biết tại t = " + t + " s, vật đi được s = " + s + " m. Vận tốc: v = s : t = " + s + " : " + t + " = " + v + " m/s.", { figure: figSTSVG(t, s), figureOnly: true });
    return tag(q, "thpt-dothi", "do-thi-st");
  }
  function gBangSoLieu() {
    var years = [2021, 2022, 2023, 2024];
    var base = cdRand(40, 90), step = cdPick([3, 5, 6, 8, 10]);
    var up = Math.random() < 0.6;
    var vals = years.map(function (y, i) { return up ? base + step * i : base - step * i; });
    if (vals.some(function (x) { return x <= 5; })) return null;
    var rows = years.map(function (y, i) { return '<tr><td>' + y + '</td><td style="text-align:right">' + vals[i] + '</td></tr>'; }).join("");
    var vis = '<table class="fig-table" style="margin:6px auto;border-collapse:collapse"><tr><th style="padding:2px 10px">Năm</th><th style="padding:2px 10px">Số lượng (nghìn)</th></tr>' + rows + "</table>";
    var growth = vals[3] - vals[0];
    var mode = cdPick(["trend", "growth"]);
    if (mode === "growth") {
      var q = cdMCQ("Bảng số liệu cho sản lượng (nghìn tấn) của một nhà máy qua các năm. Từ năm 2021 đến năm 2024, sản lượng thay đổi bao nhiêu nghìn tấn?",
        (growth > 0 ? "Tăng " : "Giảm ") + Math.abs(growth), ["Tăng " + Math.abs(growth + step), "Giảm " + Math.abs(growth), "Không đổi"],
        "Lấy giá trị năm cuối trừ năm đầu: " + vals[3] + " − " + vals[0] + " = " + growth + ", tức " + (growth > 0 ? "tăng" : "giảm") + " " + Math.abs(growth) + " nghìn tấn.", { visual: vis });
      return tag(q, "thpt-dothi", "bang-tang-truong");
    }
    var q2 = cdMCQ("Bảng số liệu cho sản lượng (nghìn tấn) của một nhà máy qua các năm. Nhận xét nào đúng về xu hướng sản lượng?",
      up ? "Tăng đều mỗi năm " + step + " nghìn tấn" : "Giảm đều mỗi năm " + step + " nghìn tấn",
      [up ? "Giảm đều mỗi năm " + step + " nghìn tấn" : "Tăng đều mỗi năm " + step + " nghìn tấn", "Lúc tăng lúc giảm thất thường", "Không thay đổi qua các năm"],
      "Hiệu hai năm liên tiếp luôn bằng " + (up ? "+" : "−") + step + " nghìn tấn, nên sản lượng " + (up ? "tăng" : "giảm") + " đều mỗi năm " + step + " nghìn tấn.", { visual: vis });
    return tag(q2, "thpt-dothi", "bang-xu-huong");
  }
  function gDothiBlank() {
    for (var tries = 0; tries < 40; tries++) {
      var a = cdPick([1, 2]), b = cdRand(0, 3), x0 = cdRand(1, 5);
      var y = a * x0 + b;
      if (y < 1 || y > 10) continue;
      var vis = sent("Đồ thị y = " + (a === 1 ? "x" : a + "x") + (b > 0 ? " + " + b : "") + " tại x = " + x0 + " có y = " + blankSlot() + ".");
      var q = cdBlank("Quan sát đồ thị đường thẳng và điền tung độ còn thiếu nhé!", y, [y + a, y - a > 0 ? y - a : y + 2, y + 1],
        "Thay x = " + x0 + ": y = " + a + " × " + x0 + (b > 0 ? " + " + b : "") + " = " + y + ".", vis);
      if (q) q.figure = figLineSVG(a, b, x0);
      return tag(q, "thpt-dothi", "blank-duong-thang");
    }
    return null;
  }
  function gDothiMatch() {
    var cases = [
      ["Đường thẳng y = 2x tại x = 3", "y = 6"],
      ["Đường thẳng y = x + 4 tại x = 3", "y = 7"],
      ["Đường thẳng y = 3x − 1 tại x = 2", "y = 5"],
      ["Đường thẳng y = 12 − 2x tại x = 2", "y = 8"],
      ["Đường thẳng y = x/2 tại x = 8", "y = 4"]
    ];
    var chosen = cdShuffle(cases).slice(0, 4);
    /* đảm bảo vế phải phân biệt theo giá trị */
    var seen = {};
    for (var i = 0; i < chosen.length; i++) { if (seen[chosen[i][1]]) return null; seen[chosen[i][1]] = 1; }
    var q = cdMatch("Nối mỗi đường thẳng (tại x cho trước) với tung độ tương ứng nhé!", chosen,
      "Thay x vào công thức của từng đường thẳng để tính y.");
    return tag(q, "thpt-dothi", "match");
  }
  function gDothiTF() {
    var vals = [cdRand(5, 20), cdRand(5, 20), cdRand(5, 20)];
    var total = vals[0] + vals[1] + vals[2];
    var mx = Math.max.apply(null, vals);
    var stmts = [
      { t: "Biểu đồ cột có ba cột giá trị " + vals.join(", ") + " thì tổng ba cột là " + total + ".", f: "Biểu đồ cột có ba cột giá trị " + vals.join(", ") + " thì tổng ba cột là " + (total + vals[0]) + ".", e: "Cộng trực tiếp: " + vals.join(" + ") + " = " + total + "." },
      { t: "Biểu đồ cột có ba cột giá trị " + vals.join(", ") + ". Cột cao nhất có giá trị " + mx + ".", f: "Biểu đồ cột có ba cột giá trị " + vals.join(", ") + ". Cột cao nhất có giá trị " + (mx + 3) + ".", e: "Giá trị lớn nhất trong ba số " + vals.join(", ") + " là " + mx + "." },
      { t: "Đường thẳng y = 2x + 1 đi qua điểm có hoành độ 3 với tung độ 7.", f: "Đường thẳng y = 2x + 1 đi qua điểm có hoành độ 3 với tung độ 6.", e: "Thay x = 3: y = 2 × 3 + 1 = 7." },
      { t: "Đồ thị s–t là đoạn thẳng qua gốc tọa độ ứng với chuyển động thẳng đều.", f: "Đồ thị s–t là đoạn thẳng qua gốc tọa độ ứng với chuyển động nhanh dần đều.", e: "s tỉ lệ thuận với t (s = vt) là chuyển động thẳng đều; nhanh dần đều cho đồ thị cong (parabol)." }
    ];
    var chosen = cdShuffle(stmts).slice(0, 3);
    var pat = cdPick([[true, true, false], [true, false, true], [false, true, true], [false, true, false]]);
    var rounds = chosen.map(function (s, i) { return { stmt: pat[i] ? s.t : s.f, truth: pat[i], explain: s.e }; });
    return tag(cdTF(rounds), "thpt-dothi", "tf");
  }

  /* ================= ĐĂNG KÝ ================= */
  var topics = [
    { id: "cd-thpt-dayso", emoji: "🔢", name: "Dãy số & truy hồi, quy luật", sub: "Cấp số cộng/nhân, công thức truy hồi, số hạng tổng quát",
      pools: { choose: [gTruyHoi, gCapSoCong2, gCapSoNhan2, gGapDoiTang, gCongThuc], blank: [gDaysoBlank3], match: [gDaysoMatch3], games: [gDaysoTF3] },
      knowledge: { notes: ["Cấp số cộng: uₙ = u₁ + (n−1)d; Sₙ = n(u₁ + uₙ)/2.", "Cấp số nhân: uₙ = u₁ × qⁿ⁻¹.", "Công thức truy hồi: tính lần lượt từng số hạng từ số hạng đầu, không nhảy bước.", "Tìm số hạng tổng quát: thử các dạng quen thuộc (n², 2n−1, 2ⁿ, n(n+1)/2…) và kiểm chứng với mọi số đã cho."],
        facts: [{ q: "u₁ = 3, uₙ₊₁ = 2uₙ + 1. Tính u₃.", a: "15", ex: "u₂ = 2 × 3 + 1 = 7; u₃ = 2 × 7 + 1 = 15." }, { q: "Cấp số nhân u₁ = 5, q = 3. Tính u₄.", a: "135", ex: "u₄ = 5 × 3³ = 5 × 27 = 135." }],
        pairs: [["Cấp số cộng", "uₙ = u₁ + (n−1)d"], ["Cấp số nhân", "uₙ = u₁qⁿ⁻¹"], ["Truy hồi", "Tính theo số hạng trước"], ["Số hạng tổng quát", "Công thức theo n"]] } },
    { id: "cd-thpt-menhde", emoji: "🧠", name: "Logic mệnh đề", sub: "Điều kiện cần/đủ, phủ định, mệnh đề phản đảo",
      pools: { choose: [gCanDu, gPhuDinh2, gPhanDao], blank: [gMenhdeBlank], match: [gMenhdeMatch], games: [gMenhdeTF2] },
      knowledge: { notes: ["P ⇒ Q: P là điều kiện ĐỦ của Q; Q là điều kiện CẦN của P.", "P ⇔ Q khi cả hai chiều kéo theo đều đúng: P là điều kiện cần và đủ của Q.", "P ⇒ Q tương đương với mệnh đề phản đảo ¬Q ⇒ ¬P; mệnh đề đảo Q ⇒ P không tương đương.", "Phủ định: «mọi … đều …» → «có … không …»; «có …» → «không có … nào»; x > a → x ≤ a (giữ dấu bằng phía phủ định)."],
        facts: [{ q: "«n chia hết cho 6» là điều kiện gì của «n chia hết cho 3»?", a: "Điều kiện đủ", ex: "Chia hết cho 6 kéo theo chia hết cho 3, nhưng chiều ngược lại không đúng." }, { q: "Phủ định của «mọi bạn đều qua môn» là gì?", a: "Có bạn không qua môn", ex: "Phủ định của «mọi … đều …» là «có … không …»." }],
        pairs: [["P ⇒ Q đúng", "P đủ, Q cần"], ["Mệnh đề phản đảo", "¬Q ⇒ ¬P"], ["Phủ định của ∀", "«Có … không …»"], ["Phủ định của ∃", "«Không có … nào»"]] } },
    { id: "cd-thpt-tohop", emoji: "🎲", name: "Tổ hợp tư duy", sub: "Đếm có ràng buộc, phần bù, nguyên lý chuồng bồ câu",
      pools: { choose: [gPin, gChucVu, gBanTron, gItNhatMot, gChuongBoCau, gBaoHam], blank: [gTohopBlank], match: [gTohopMatch], games: [gTohopTF] },
      knowledge: { notes: ["Câu hỏi đếm có thứ tự (chức vụ, xếp hàng, mã số) dùng chỉnh hợp/hoán vị; không thứ tự (chọn nhóm) dùng tổ hợp C(n, k).", "«Ít nhất một» — thường đếm phần bù: tổng số cách trừ số cách «không có cái nào».", "Nguyên lý chuồng bồ câu: n + 1 vật vào n ngăn thì có ngăn chứa ít nhất 2 vật; dạng «chắc chắn» luôn xét trường hợp xấu nhất.", "Bao hàm – loại trừ hai tập hợp: |A ∪ B| = |A| + |B| − |A ∩ B|."],
        facts: [{ q: "Có bao nhiêu cách chọn 3 bạn trong 10 bạn (không thứ tự)?", a: "120 cách", ex: "C(10, 3) = 10 × 9 × 8 : 6 = 120." }, { q: "Ngăn kéo có tất 4 màu. Lấy ít nhất mấy chiếc để chắc chắn có hai chiếc cùng màu?", a: "5 chiếc", ex: "Xấu nhất lấy 4 chiếc khác màu nhau; chiếc thứ 5 chắc chắn trùng màu." }],
        pairs: [["Có thứ tự", "Chỉnh hợp / hoán vị"], ["Không thứ tự", "Tổ hợp C(n, k)"], ["Ít nhất một", "Đếm phần bù"], ["Chắc chắn có cặp", "Chuồng bồ câu + trường hợp xấu nhất"]] } },
    { id: "cd-thpt-thucte", emoji: "💰", name: "Bài toán thực tế & ước lượng", sub: "Lãi kép, phần trăm liên tiếp, tối ưu nhẹ, ước lượng Fermi",
      pools: { choose: [gFermi, gLaiKep, gPhanTramKep, gToiUuChuVi, gSoSanhGia], blank: [gThucteBlank], match: [gThucteMatch], games: [gThucteTF] },
      knowledge: { notes: ["Lãi kép: A = P(1 + r)ⁿ — lãi nhập gốc nên tăng nhanh hơn lãi đơn P(1 + rn).", "Phần trăm liên tiếp nhân với nhau, không cộng/trừ trực tiếp: tăng a% rồi giảm b% → nhân (1 + a%) rồi nhân (1 − b%).", "Tổng hai số cố định → tích lớn nhất khi hai số bằng nhau (hoặc gần nhau nhất). Áp dụng cho chu vi cố định → diện tích lớn nhất.", "Ước lượng Fermi: chia bài toán thành các thừa số dễ ước lượng, chỉ cần đúng bậc độ lớn."],
        facts: [{ q: "Gửi 100 triệu đồng, lãi kép 10%/năm. Sau 2 năm có bao nhiêu?", a: "121 triệu đồng", ex: "100 × 1,1² = 100 × 1,21 = 121 triệu đồng." }, { q: "Chu vi hình chữ nhật 36 m. Diện tích lớn nhất là bao nhiêu?", a: "81 m²", ex: "Nửa chu vi 18 m; hai cạnh bằng nhau 9 m cho diện tích lớn nhất 9 × 9 = 81 m²." }],
        pairs: [["Lãi kép", "A = P(1 + r)ⁿ"], ["Lãi đơn", "A = P(1 + rn)"], ["% liên tiếp", "Nhân các hệ số"], ["Tích lớn nhất", "Hai số bằng nhau"]] } },
    { id: "cd-thpt-dothi", emoji: "📈", name: "Đọc đồ thị & suy luận số liệu", sub: "Đọc giá trị trên đồ thị, biểu đồ cột, bảng số liệu",
      pools: { choose: [gDocDuongThang, gDocCot, gDocST, gBangSoLieu], blank: [gDothiBlank], match: [gDothiMatch], games: [gDothiTF] },
      knowledge: { notes: ["Đọc điểm trên đồ thị: từ hoành độ x₀ dóng lên đường đồ thị rồi dóng sang trục tung để đọc y — hoặc thay x₀ vào công thức để kiểm chứng.", "Biểu đồ cột: so sánh chiều cao các cột; tổng/hiệu đọc từ các giá trị ghi trên đầu cột.", "Đồ thị s–t của chuyển động thẳng đều là đoạn thẳng qua gốc O; độ dốc càng lớn vận tốc càng lớn, v = s/t tại điểm bất kỳ.", "Bảng số liệu: tính hiệu số hai mốc để nói về tăng/giảm; kiểm tra hiệu các năm liên tiếp để nhận xét «tăng đều»."],
        facts: [{ q: "Đường thẳng y = 2x + 3 tại x = 4 có tung độ bao nhiêu?", a: "11", ex: "y = 2 × 4 + 3 = 11." }, { q: "Đồ thị s–t qua điểm (5 s; 40 m). Vận tốc là bao nhiêu?", a: "8 m/s", ex: "v = 40 : 5 = 8 m/s." }],
        pairs: [["Đọc tung độ", "Dóng từ x lên đồ thị rồi sang trục y"], ["Độ dốc s–t", "Bằng vận tốc v"], ["Tăng đều", "Hiệu các năm liên tiếp bằng nhau"], ["Tổng cột", "Cộng giá trị trên đầu các cột"]] } }
  ];
  window.__CD_BANDS.push({ id: "thpt", name: "Toán tư duy THPT (Lớp 10–12)", grades: [10, 11, 12], topics: topics });
})();
/* ================================================================
   CHUYÊN ĐỀ TOÁN TƯ DUY — PHẦN LÕI CUỐI (đăng ký Kiến thức, màn hình
   chuyên đề, mở vòng chơi, móc ngữ cảnh cho Ôn câu sai)
   Đây là đoạn cuối của assets/data/chuyende.js sau khi lắp ráp.
   ================================================================ */
(function () {
  var BANDS = window.__CD_BANDS || [];
  var CD_SUBJ = { id: "chuyende", name: "🧠 Chuyên đề nâng cao", emoji: "🧠", desc: "Toán tư duy", cls: "", topics: [] };
  BANDS.forEach(function (b) { (b.topics || []).forEach(function (t) { CD_SUBJ.topics.push(t); }); });

  function findTopic(id) {
    for (var i = 0; i < CD_SUBJ.topics.length; i++) if (CD_SUBJ.topics[i].id === id) return CD_SUBJ.topics[i];
    return null;
  }
  function bandOf(t) {
    for (var i = 0; i < BANDS.length; i++) { var ts = BANDS[i].topics || []; for (var j = 0; j < ts.length; j++) if (ts[j] === t) return BANDS[i]; }
    return null;
  }

  /* --- Đăng ký Kiến thức cho từng chủ đề con ---
     t.knowledge theo đúng khuôn hộp Kiến thức của game; notes đăng ký vào
     __MATH_KNOWLEDGE_NOTES bằng GÁN THÊM KHÓA (giữ nguyên tham chiếu đối tượng). */
  var mn = window.__MATH_KNOWLEDGE_NOTES = window.__MATH_KNOWLEDGE_NOTES || {};
  CD_SUBJ.topics.forEach(function (t) {
    var k = t.knowledge || {};
    t.knowledge = {
      facts: (k.facts || []).map(function (f) { return { q: f.q, a: f.a, ex: f.ex || "", visual: f.visual || "" }; }),
      pairs: k.pairs || [],
      grade: (bandOf(t) || { grades: [3] }).grades[0],
      subject: "Toán tư duy"
    };
    if (k.notes && k.notes.length) mn[t.id] = k.notes.slice();
  });

  /* --- Móc ngữ cảnh cho A1 (Ôn câu sai / ghi nhận Học tiếp) ---
     Vỏ gọi hàm này từ topicContext() khi khóa vòng chơi là "<lớp>|chuyende|<mã chủ đề>". */
  window.__cdTopicContext = function (parts) {
    try {
      if (!parts || parts[1] !== "chuyende") return null;
      var t = findTopic(parts[2]);
      if (!t) return null;
      return { grade: parseInt(parts[0], 10), subj: CD_SUBJ, topic: t };
    } catch (e) { return null; }
  };

  function curGradeNum() {
    try { return (typeof currentGrade !== "undefined" && currentGrade) ? +currentGrade : (typeof profile !== "undefined" && profile ? +profile.grade : 1); }
    catch (e) { return 1; }
  }
  function escT(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function render() {
    var body = document.getElementById("cd-body");
    if (!body) return;
    var g = curGradeNum();
    body.innerHTML = "";
    var intro = document.createElement("p");
    intro.className = "topics-sub";
    intro.style.cssText = "text-align:center;margin:2px 0 14px";
    intro.textContent = "Các bài toán suy luận ngoài sách giáo khoa — mỗi câu đều có giải thích cách nghĩ. Chọn một chủ đề để luyện nhé!";
    body.appendChild(intro);
    BANDS.forEach(function (band) {
      var isCurrent = band.grades.indexOf(g) !== -1;
      var sec = document.createElement("div");
      sec.className = "cd-band" + (isCurrent ? " current" : "");
      var head = document.createElement("div");
      head.className = "cd-band-head";
      head.innerHTML = '<span class="cd-band-name">' + escT(band.name) + "</span>" +
        (isCurrent ? '<span class="cd-band-tag">Dải của em ⭐</span>' : "");
      sec.appendChild(head);
      if (band.id === "th" && g < 3) {
        var note = document.createElement("p");
        note.className = "cd-band-note";
        note.textContent = "Dải này dành cho Lớp 3–5 — em học lớp nhỏ vẫn chơi thử được nhé!";
        sec.appendChild(note);
      }
      var grid = document.createElement("div");
      grid.className = "topic-grid";
      (band.topics || []).forEach(function (t) {
        var wrap = document.createElement("div");
        wrap.className = "topic-unit";
        var best = 0;
        try { if (typeof profile !== "undefined" && profile && profile.best) best = profile.best[g + "|chuyende|" + t.id] || 0; } catch (e) {}
        var card = document.createElement("button");
        card.className = "topic-card";
        card.innerHTML = '<span class="t-emoji">' + (t.emoji || "🧠") + '</span><span class="t-name">' + escT(t.name) + '</span><span class="t-sub">' + escT(t.sub || "") + "</span>" +
          (best ? '<span class="best-tag">⭐ Cao nhất: ' + best + "/10</span>" : "");
        card.addEventListener("click", function () { launchTopic(CD_SUBJ, t); });
        wrap.appendChild(card);
        var kb = document.createElement("button");
        kb.className = "knowledge-link";
        kb.textContent = "📖 Kiến thức cần ghi nhớ";
        kb.addEventListener("click", function () {
          t.knowledge.grade = g;
          if (window.__showKnowledge) window.__showKnowledge(t);
        });
        wrap.appendChild(kb);
        grid.appendChild(wrap);
      });
      sec.appendChild(grid);
      body.appendChild(sec);
    });
  }

  window.__CD = {
    bands: BANDS,
    subj: CD_SUBJ,
    findTopic: findTopic,
    render: render
  };
})();
