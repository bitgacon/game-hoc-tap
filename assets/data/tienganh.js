/* ================================================================
   TIENG ANH LUYEN THI — file du lieu nhanh chuyen de (ban-tach-v12)
   Lap rap tu cong-viec-ta/: core-head.js + band-th.js + band-thcs.js
   + band-thpt.js + bo-sung-thpt.js + core-tail.js. Noi dung tu viet
   moi 100% theo dang bai Cambridge (Starters/Movers/Flyers),
   KET/PET, TOEIC/IELTS.
   ================================================================ */
/* ================================================================
   CHUYÊN ĐỀ TIẾNG ANH LUYỆN THI — PHẦN LÕI ĐẦU (hàm dùng chung + registry)
   Đây là đoạn đầu của assets/data/tienganh.js sau khi lắp ráp.
   Chỉ định nghĩa hàm en* và registry rỗng; band module dùng các hàm này,
   KHÔNG tự định nghĩa lại. File tự chứa hoàn toàn (không phụ thuộc
   chuyende.js — hai file nạp độc lập theo nhánh người chơi mở).
   ================================================================ */
window.__EN_BANDS = window.__EN_BANDS || [];

(function () {
  if (window.__enStyleInstalled) return;
  window.__enStyleInstalled = true;
  var style = document.createElement("style");
  style.textContent =
    ".en-passage{margin:0 0 6px;padding:12px 14px;border:3px dashed var(--line);border-radius:14px;background:#fffdf4;color:#33302a;font-size:clamp(17px,4.4vw,20px);line-height:1.55;text-align:left}" +
    ".en-passage b{color:#0e7a5f}" +
    ".en-listen{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;margin:2px 0 4px}" +
    ".en-show-text{padding:10px 16px;border:3px solid var(--line);border-radius:999px;background:#eef6ff;font-family:inherit;font-size:16px;font-weight:800;cursor:pointer;color:#33302a}" +
    ".en-transcript{display:block;width:100%;margin-top:8px;padding:10px 14px;border-radius:12px;background:#eef6ff;color:#33302a;font-size:clamp(17px,4.4vw,20px);line-height:1.55;text-align:left}" +
    ".en-transcript[hidden]{display:none!important}";
  document.head.appendChild(style);
})();

function enRand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function enPick(arr) { return arr[enRand(0, arr.length - 1)]; }
function enShuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = enRand(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
/* Khóa GIÁ TRỊ của một lựa chọn (khử trùng theo giá trị như cổng của game):
   số/phần trăm so theo giá trị số; chữ so theo dạng thường hoá, gộp khoảng trắng. */
function enValKey(x) {
  var t = String(x == null ? "" : x).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().toLowerCase();
  var m = /^(-?\d+(?:[.,]\d+)?)\s*%$/.exec(t);
  if (m) return "n|" + (parseFloat(m[1].replace(",", ".")) / 100);
  m = /^(-?\d+)\s*\/\s*(-?\d+)$/.exec(t);
  if (m && +m[2] !== 0) return "n|" + (Math.round((+m[1] / +m[2]) * 1e9) / 1e9);
  if (/^-?\d+(?:[.,]\d+)?$/.test(t)) return "n|" + parseFloat(t.replace(",", "."));
  return "t|" + t;
}
function enEsc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
/* Câu chọn của chuyên đề Anh (khuôn cdMCQ): khử trùng nhiễu theo giá trị;
   thiếu 2 nhiễu sạch → null (KHÔNG bù nhiễu tự động cho câu chữ). */
function enMCQ(prompt, correct, distractors, explain, opt) {
  opt = opt || {};
  correct = String(correct);
  var ck = enValKey(correct), have = {}, pool = [];
  have[ck] = true;
  (distractors || []).forEach(function (d) {
    var s = String(d), k = enValKey(s);
    if (!have[k]) { have[k] = true; pool.push(s); }
  });
  if (pool.length < 2) return null;
  var chosen = enShuffle(pool).slice(0, 3);
  var all = enShuffle([correct].concat(chosen));
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
/* Câu điền của chuyên đề Anh (khuôn factBlank của game). */
function enBlank(prompt, correct, distractors, explain, visualHTML) {
  correct = String(correct);
  var ck = enValKey(correct), have = {}, pool = [];
  have[ck] = true;
  (distractors || []).forEach(function (d) {
    var s = String(d), k = enValKey(s);
    if (!have[k]) { have[k] = true; pool.push(s); }
  });
  if (pool.length < 2) return null;
  var all = enShuffle([correct].concat(enShuffle(pool).slice(0, 2)));
  return {
    kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: prompt, blankText: correct,
    explain: explain || null,
    visual: visualHTML || ('<div class="sentence">Đáp án: ' + blankSlot() + "</div>"),
    options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }),
    answer: all.indexOf(correct), cols: 3, optStack: true
  };
}
/* TF của chuyên đề Anh: rounds = [{ stmt, truth, explain }] — mệnh đề khẳng
   định viết trực tiếp; người gọi tự cân bằng phán quyết trong màn. */
function enTF(rounds, prompt) {
  var rs = rounds.map(function (r) {
    return { visual: '<div class="sentence" style="font-size:clamp(20px,5vw,27px)">' + r.stmt + "</div>", truth: !!r.truth, explain: r.explain };
  });
  return tfQ(prompt || "Đúng hay sai? Chạm nhanh nhé!", rs);
}
/* Câu nối của chuyên đề Anh (bọc pairsMatch của game + gắn giải thích). */
function enMatch(prompt, pairs, explain) {
  var q = pairsMatch(prompt, pairs);
  if (explain) q.explain = explain;
  return q;
}
/* Nút nghe một từ/câu (cơ chế sẵn có của game: vòng chơi tự gắn sự kiện vào
   [data-speak] → speakStimulus đọc ngay cả khi tắt công tắc giọng; không có
   giọng đọc thì game tự hiện chữ cạnh nút). */
function enSpeakBtn(text) {
  return '<button type="button" class="speak-btn small" data-speak="' + enEsc(text) + '" aria-label="Nghe phát âm">🔊</button>';
}
/* Khối nghe chuẩn cho MỌI câu nghe (quy tắc nghe đợt v12): nút 🔊 đọc
   transcript qua data-speak + nút "👁 Hiện chữ" luôn kề bên — bấm để hiện
   transcript từ data-text (listener uỷ quyền ở phần lõi cuối). Nhờ vậy câu
   nghe không bao giờ là ngõ cụt khi mất tiếng. Span transcript để TRỐNG lúc
   dựng: nếu thiết bị không có giọng đọc, đường reveal của speakStimulus sẽ
   tự điền chữ vào cạnh nút nghe; nút Hiện chữ điền từ data-text. */
function enListenVisual(transcript) {
  var t = String(transcript == null ? "" : transcript);
  return '<div class="en-listen">' +
    '<button type="button" class="speak-btn" data-speak="' + enEsc(t) + '" aria-label="Nghe">🔊</button>' +
    '<button type="button" class="en-show-text" data-text="' + enEsc(t) + '">👁 Hiện chữ</button>' +
    '<span class="en-transcript" hidden></span></div>';
}
/* Gán danh tính vòng (cơ chế roundIdentity sẵn có của game) cho các câu mà
   nội dung phân biệt nằm ngoài prompt/visual dạng chữ nhìn thấy — điển hình
   là câu NGHE (transcript chỉ nằm trong data-speak) và câu "chọn câu đúng
   về đoạn văn". fact = chuỗi định danh thật của câu (transcript, hoặc tiêu
   đề đoạn + mệnh đề đúng). Cổng chống trùng của game dùng chính danh tính
   này, nên cùng một câu nghe không lặp lại trong một vòng. */
function enId(q, fact) { if (q) q.roundIdentity = { type: "fact", facts: [String(fact)] }; return q; }
/* Hộp đoạn văn cho câu đọc hiểu. */
function enPassage(html) { return '<div class="en-passage">' + html + "</div>"; }
function enTag(q, fam, v) { if (q) { q.__fam = fam; q.__var = v; } return q; }
/* ================================================================
   CHUYÊN ĐỀ TIẾNG ANH LUYỆN THI — DẢI TIỂU HỌC (Cambridge Starters • Movers • Flyers)
   Đoạn của assets/data/tienganh.js: đẩy đúng 1 band vào window.__EN_BANDS.
   Mọi câu, đoạn văn, hội thoại đều TỰ VIẾT MỚI; chỉ sinh từ bảng dạng cố định.
   ================================================================ */
(function () {
  "use strict";
  function shuffled(a) { return enShuffle(a.slice()); }
  function sample(a, n) { return enShuffle(a.slice()).slice(0, n); }

  var WORD_GROUPS = [["animals", "động vật", [["cat", "con mèo", "🐱"], ["dog", "con chó", "🐶"], ["bird", "con chim", "🐦"], ["fish", "con cá", "🐟"], ["duck", "con vịt", "🦆"], ["cow", "con bò", "🐄"], ["pig", "con lợn", "🐷"], ["horse", "con ngựa", "🐴"], ["frog", "con ếch", "🐸"], ["bee", "con ong", "🐝"]]], ["food", "đồ ăn", [["apple", "quả táo", "🍎"], ["banana", "quả chuối", "🍌"], ["orange", "quả cam", "🍊"], ["egg", "quả trứng", "🥚"], ["milk", "sữa", "🥛"], ["bread", "bánh mì", "🍞"], ["cake", "bánh ngọt", "🍰"], ["rice", "cơm", "🍚"], ["candy", "kẹo", "🍬"], ["juice", "nước ép", "🧃"]]], ["school", "đồ dùng học tập", [["book", "quyển sách", "📖"], ["pen", "cái bút", "🖊️"], ["pencil", "bút chì", "✏️"], ["ruler", "cái thước", "📏"], ["bag", "cặp sách", "🎒"], ["chair", "cái ghế", "🪑"], ["clock", "đồng hồ", "🕐"], ["map", "bản đồ", "🗺️"], ["crayon", "bút sáp", "🖍️"], ["scissors", "cái kéo", "✂️"]]], ["home", "đồ trong nhà", [["bed", "cái giường", "🛏️"], ["door", "cái cửa", "🚪"], ["window", "cửa sổ", "🪟"], ["lamp", "cái đèn", "💡"], ["sofa", "ghế sô-pha", "🛋️"], ["key", "chìa khoá", "🔑"], ["phone", "điện thoại", "📱"], ["TV", "ti vi", "📺"]]], ["colours", "màu sắc", [["red", "màu đỏ", "🔴"], ["blue", "màu xanh dương", "🔵"], ["green", "màu xanh lá", "🟢"], ["yellow", "màu vàng", "🟡"], ["orange", "màu cam", "🟠"], ["pink", "màu hồng", "🩷"], ["purple", "màu tím", "🟣"], ["brown", "màu nâu", "🟤"], ["black", "màu đen", "⚫"], ["white", "màu trắng", "⚪"]]], ["body", "bộ phận cơ thể", [["eye", "mắt", "👁️"], ["ear", "tai", "👂"], ["nose", "mũi", "👃"], ["mouth", "miệng", "👄"], ["hand", "bàn tay", "✋"], ["arm", "cánh tay", "💪"], ["leg", "chân", "🦵"], ["foot", "bàn chân", "🦶"]]], ["clothes", "quần áo", [["hat", "cái mũ", "🧢"], ["shirt", "áo sơ mi", "👕"], ["dress", "váy", "👗"], ["shoes", "giày", "👟"], ["socks", "tất", "🧦"], ["coat", "áo khoác", "🧥"], ["pants", "quần dài", "👖"], ["shorts", "quần ngắn", "🩳"]]], ["toys", "đồ chơi", [["ball", "quả bóng", "⚽"], ["car", "ô tô", "🚗"], ["doll", "búp bê", "🪆"], ["kite", "cái diều", "🪁"], ["train", "tàu hoả", "🚂"], ["puzzle", "trò xếp hình", "🧩"], ["teddy", "gấu bông", "🧸"], ["yo-yo", "cái yo-yo", "🪀"]]], ["family", "người trong gia đình", [["mother", "mẹ", "👩"], ["father", "bố", "👨"], ["sister", "chị em gái", "👧"], ["brother", "anh em trai", "👦"], ["baby", "em bé", "👶"], ["grandmother", "bà", "👵"], ["grandfather", "ông", "👴"], ["friend", "bạn", "🧑"]]], ["nature", "thiên nhiên", [["sun", "mặt trời", "☀️"], ["rain", "mưa", "🌧️"], ["cloud", "mây", "☁️"], ["snow", "tuyết", "❄️"], ["wind", "gió", "🌬️"], ["sea", "biển", "🌊"], ["tree", "cái cây", "🌳"], ["flower", "hoa", "🌸"]]]];

  var SAFE_BLANK = ["cat", "dog", "bird", "duck", "cow", "pig", "horse", "frog", "bee", "fish", "banana", "cake", "book", "pen", "pencil", "ruler", "bag", "chair", "clock", "map", "crayon", "bed", "door", "window", "lamp", "sofa", "key", "phone", "nose", "mouth", "hand", "leg", "foot", "hat", "shirt", "dress", "coat", "ball", "car", "doll", "kite", "train", "puzzle", "teddy", "mother", "father", "sister", "brother", "baby", "grandmother", "grandfather", "friend", "sun", "cloud", "tree", "flower"];


  var WORDS = [];
  WORD_GROUPS.forEach(function (g) { g[2].forEach(function (wd) { WORDS.push({ w: wd[0], vi: wd[1], pic: wd[2], g: g[0], gl: g[1] }); }); });
  function wordByW(w, g) { for (var i = 0; i < WORDS.length; i++) if (WORDS[i].w === w && (!g || WORDS[i].g === g)) return WORDS[i]; return null; }
  function groupWords(gid) { return WORDS.filter(function (x) { return x.g === gid; }); }
  function bigPic(pic) { return '<div style="font-size:76px;text-align:center;line-height:1.25">' + pic + "</div>"; }

  /* ---------- (1) TỪ VỰNG ---------- */
  function fPicWord() {
    var wd = enPick(WORDS);
    var dis = sample(groupWords(wd.g).filter(function (x) { return x.w !== wd.w || x.vi !== wd.vi; }), 3).map(function (x) { return x.w; });
    // for food "orange" vs colours "orange": group filter keeps meanings separate; if same spelling slips in, enMCQ dedups by value
    var q = enMCQ("Nhìn hình và chọn từ tiếng Anh đúng nhé!", wd.w, dis,
      "Hình " + wd.pic + " là " + wd.vi + ", tiếng Anh là '" + wd.w + "'.",
      { visual: bigPic(wd.pic) + '<div style="text-align:center">' + enSpeakBtn(wd.w) + "</div>" });
    return enTag(q, "vocab", "pic-" + wd.g);
  }
  function fViEn() {
    var wd = enPick(WORDS);
    var pool = groupWords(wd.g).filter(function (x) { return !(x.w === wd.w && x.vi === wd.vi); });
    var dis = sample(pool, 3).map(function (x) { return x.w; });
    var q = enMCQ("Từ tiếng Anh nào có nghĩa là '" + wd.vi + "'?", wd.w, dis,
      "'" + wd.vi + "' trong tiếng Anh là '" + wd.w + "' " + wd.pic + ".");
    return enTag(q, "vocab", "vi-en-" + wd.g);
  }
  function fEnVi() {
    var wd = enPick(WORDS);
    var pool = groupWords(wd.g).filter(function (x) { return x.vi !== wd.vi; });
    var dis = sample(pool, 3).map(function (x) { return x.vi; });
    var q = enMCQ("Từ '" + wd.w + "' nghĩa là gì?", wd.vi, dis,
      "'" + wd.w + "' nghĩa là '" + wd.vi + "' " + wd.pic + ".",
      { visual: '<div style="text-align:center;font-size:30px;font-weight:800">' + wd.w + " " + enSpeakBtn(wd.w) + "</div>" });
    return enTag(q, "vocab", "en-vi-" + wd.g);
  }
  function fOdd() {
    var gs = sample(WORD_GROUPS, 2), gA = gs[0], gB = gs[1];
    var aWords = sample(gA[2], 3);
    var aSpell = aWords.map(function (x) { return x[0]; });
    var bPool = gB[2].filter(function (x) { return aSpell.indexOf(x[0]) === -1; });
    var bWord = enPick(bPool);
    var q = enMCQ("Từ nào KHÁC nhóm với ba từ còn lại?", bWord[0],
      aWords.map(function (x) { return x[0]; }),
      "Ba từ '" + aWords.map(function (x) { return x[0]; }).join("', '") + "' đều thuộc nhóm " + gA[1] + ", còn '" + bWord[0] + "' thuộc nhóm " + gB[1] + " (" + bWord[1] + ").");
    return enTag(q, "vocab", "odd");
  }
  function fBlankWord() {
    if (Math.random() < 0.3) {
      var cw = enPick(groupWords("colours"));
      var dis = sample(groupWords("colours").filter(function (x) { return x.w !== cw.w; }), 3).map(function (x) { return x.w; });
      var qc = enBlank("Điền từ còn thiếu: The ball is ___.", cw.w, dis,
        "Quả bóng trong hình có " + cw.vi + ", nên từ đúng là '" + cw.w + "'.", bigPic(cw.pic));
      return enTag(qc, "vocab", "blank-colour");
    }
    var name = enPick(SAFE_BLANK);
    var wd = null;
    for (var i = 0; i < WORDS.length; i++) if (WORDS[i].w === name && WORDS[i].g !== "colours") { wd = WORDS[i]; break; }
    if (!wd) return null;
    var frames = ["This is a ___.", "I see a ___.", "I have a ___."];
    var fr = enPick(frames);
    var disPool = SAFE_BLANK.filter(function (x) { return x !== name; });
    var dis = sample(disPool, 3);
    var q = enBlank("Điền từ còn thiếu: " + fr, wd.w, dis,
      "Hình " + wd.pic + " là " + wd.vi + " — '" + wd.w + "'. Câu hoàn chỉnh: '" + fr.replace("___", wd.w) + "'", bigPic(wd.pic));
    return enTag(q, "vocab", "blank-word");
  }
  function fMatchWord() {
    var g = enPick(WORD_GROUPS);
    var ws = sample(g[2], 5);
    var pairs = ws.map(function (x) { return [x[0], x[1]]; });
    var q = enMatch("Nối từ tiếng Anh với nghĩa tiếng Việt nhé! (nhóm " + g[1] + ")", pairs,
      "Đọc từng từ rồi nhớ nghĩa của nó: " + ws.map(function (x) { return x[0] + " = " + x[1]; }).join("; ") + ".");
    return enTag(q, "vocab", "match-" + g[0]);
  }
  function fTFWord() {
    var pat = enPick([[true, false, true], [false, true, false], [true, true, false], [false, false, true], [true, false, false], [false, true, true]]);
    var ws = sample(WORDS, 3);
    var rounds = ws.map(function (wd, i) {
      if (pat[i]) return { stmt: "“" + wd.w + "” nghĩa là “" + wd.vi + "”.", truth: true, explain: "Đúng: '" + wd.w + "' nghĩa là '" + wd.vi + "' " + wd.pic + "." };
      var other = enPick(groupWords(wd.g).filter(function (x) { return x.vi !== wd.vi; }));
      return { stmt: "“" + wd.w + "” nghĩa là “" + other.vi + "”.", truth: false, explain: "Sai: '" + wd.w + "' nghĩa là '" + wd.vi + "', còn '" + other.vi + "' là '" + other.w + "'." };
    });
    var q = enTF(rounds, "Đúng hay sai? Đọc nghĩa của từ nhé!");
    return enTag(q, "vocab", "tf-word");
  }
  var BE = [["I", "am", "a student.", ["is", "are"], "Chủ ngữ 'I' luôn đi với 'am'."], ["You", "are", "my friend.", ["is", "am"], "Chủ ngữ 'You' đi với 'are'."], ["He", "is", "a teacher.", ["are", "am"], "Chủ ngữ 'He' (một người nam) đi với 'is'."], ["She", "is", "happy today.", ["are", "am"], "Chủ ngữ 'She' (một người nữ) đi với 'is'."], ["It", "is", "a small dog.", ["are", "am"], "Chủ ngữ 'It' (một vật/con vật) đi với 'is'."], ["We", "are", "in the classroom.", ["is", "am"], "Chủ ngữ 'We' (chúng tôi, số nhiều) đi với 'are'."], ["They", "are", "good friends.", ["is", "am"], "Chủ ngữ 'They' (họ, số nhiều) đi với 'are'."], ["Tom", "is", "nine years old.", ["are", "am"], "Tên riêng một người như 'Tom' đi với 'is'."], ["Mai", "is", "my sister.", ["are", "am"], "Tên riêng một người như 'Mai' đi với 'is'."], ["The cat", "is", "under the table.", ["are", "am"], "'The cat' là một con vật (số ít) nên đi với 'is'."], ["The dogs", "are", "big.", ["is", "am"], "'The dogs' là số nhiều nên đi với 'are'."], ["My mother", "is", "a doctor.", ["are", "am"], "'My mother' là một người nên đi với 'is'."], ["This", "is", "a new book.", ["are", "am"], "'This' (cái này, một vật) đi với 'is'."], ["These", "are", "my pencils.", ["is", "am"], "'These' (những cái này, số nhiều) đi với 'are'."], ["The bird", "is", "in the tree.", ["are", "am"], "'The bird' là một con vật (số ít) nên đi với 'is'."], ["I", "am", "from Vietnam.", ["is", "are"], "Chủ ngữ 'I' luôn đi với 'am'."]];
  var HAVE = [["I", "have got", "a new pen.", ["has got"], "Chủ ngữ 'I' đi với 'have got'."], ["You", "have got", "a red bike.", ["has got"], "Chủ ngữ 'You' đi với 'have got'."], ["We", "have got", "two cats.", ["has got"], "Chủ ngữ 'We' (số nhiều) đi với 'have got'."], ["They", "have got", "a big ball.", ["has got"], "Chủ ngữ 'They' (số nhiều) đi với 'have got'."], ["He", "has got", "a toy car.", ["have got"], "'He' là ngôi thứ ba số ít nên dùng 'has got'."], ["She", "has got", "a pretty doll.", ["have got"], "'She' là ngôi thứ ba số ít nên dùng 'has got'."], ["Tom", "has got", "a blue kite.", ["have got"], "Tên một người như 'Tom' dùng 'has got'."], ["Mai", "has got", "a new book.", ["have got"], "Tên một người như 'Mai' dùng 'has got'."], ["My father", "has got", "a phone.", ["have got"], "'My father' là một người nên dùng 'has got'."], ["My mother", "has got", "a black bag.", ["have got"], "'My mother' là một người nên dùng 'has got'."], ["The cat", "has got", "a long tail.", ["have got"], "'The cat' là một con vật (số ít) nên dùng 'has got'."]];
  var PS = [["He", "goes", "to school every day.", ["go", "going"], "Chủ ngữ 'He' là ngôi thứ ba số ít: 'go' thêm -es thành 'goes'."], ["She", "plays", "the piano.", ["play", "playing"], "Chủ ngữ 'She' là ngôi thứ ba số ít: 'play' thêm -s thành 'plays'."], ["Tom", "likes", "apples.", ["like", "liking"], "Chủ ngữ 'Tom' là ngôi thứ ba số ít: 'like' thêm -s thành 'likes'."], ["Mai", "watches", "TV in the evening.", ["watch", "watching"], "Chủ ngữ 'Mai' là ngôi thứ ba số ít: 'watch' thêm -es thành 'watches'."], ["The cat", "eats", "fish.", ["eat", "eating"], "Chủ ngữ 'The cat' là số ít: 'eat' thêm -s thành 'eats'."], ["The bird", "flies", "in the sky.", ["fly", "flying"], "Chủ ngữ 'The bird' là số ít: 'fly' đổi y thành i rồi thêm -es thành 'flies'."], ["He", "reads", "a book every night.", ["read", "reading"], "Chủ ngữ 'He' là ngôi thứ ba số ít: 'read' thêm -s thành 'reads'."], ["She", "helps", "her friends.", ["help", "helping"], "Chủ ngữ 'She' là ngôi thứ ba số ít: 'help' thêm -s thành 'helps'."], ["My father", "sings", "very well.", ["sing", "singing"], "Chủ ngữ 'My father' là số ít: 'sing' thêm -s thành 'sings'."], ["The dog", "runs", "very fast.", ["run", "running"], "Chủ ngữ 'The dog' là số ít: 'run' thêm -s thành 'runs'."], ["I", "go", "to school by bike.", ["goes", "going"], "Chủ ngữ 'I' dùng động từ nguyên thể 'go', không thêm -s/-es."], ["You", "play", "football on Sunday.", ["plays", "playing"], "Chủ ngữ 'You' dùng động từ nguyên thể 'play'."], ["We", "like", "cake very much.", ["likes", "liking"], "Chủ ngữ 'We' (số nhiều) dùng động từ nguyên thể 'like'."], ["They", "watch", "TV after dinner.", ["watches", "watching"], "Chủ ngữ 'They' (số nhiều) dùng động từ nguyên thể 'watch'."], ["I", "read", "books in the evening.", ["reads", "reading"], "Chủ ngữ 'I' dùng động từ nguyên thể 'read'."], ["You", "sing", "beautiful songs.", ["sings", "singing"], "Chủ ngữ 'You' dùng động từ nguyên thể 'sing'."], ["We", "swim", "in the pool.", ["swims", "swimming"], "Chủ ngữ 'We' dùng động từ nguyên thể 'swim'."], ["They", "eat", "rice for lunch.", ["eats", "eating"], "Chủ ngữ 'They' dùng động từ nguyên thể 'eat'."], ["I", "drink", "milk every morning.", ["drinks", "drinking"], "Chủ ngữ 'I' dùng động từ nguyên thể 'drink'."], ["You", "run", "in the park.", ["runs", "running"], "Chủ ngữ 'You' dùng động từ nguyên thể 'run'."], ["We", "draw", "pictures in art class.", ["draws", "drawing"], "Chủ ngữ 'We' dùng động từ nguyên thể 'draw'."], ["They", "visit", "their grandmother on Sundays.", ["visits", "visiting"], "Chủ ngữ 'They' dùng động từ nguyên thể 'visit'."], ["I", "help", "my mother at home.", ["helps", "helping"], "Chủ ngữ 'I' dùng động từ nguyên thể 'help'."]];
  var CAN = [["A bird", "can", "fly in the sky.", ["can't", "is"], "Chim có cánh và bay được nên dùng 'can'."], ["A fish", "can", "swim in the water.", ["can't", "is"], "Cá bơi được trong nước nên dùng 'can'."], ["A fish", "can't", "fly.", ["can", "are"], "Cá không có cánh, không bay được nên dùng 'can't'."], ["A dog", "can", "run very fast.", ["can't", "is"], "Chó chạy được rất nhanh nên dùng 'can'."], ["A baby", "can't", "read a book.", ["can", "are"], "Em bé chưa biết đọc sách nên dùng 'can't'."], ["I", "can", "sing a song.", ["can't", "is"], "Câu nói về khả năng của bản thân: 'I can sing' — tôi có thể hát."], ["Mai", "can", "draw nice pictures.", ["can't", "are"], "Câu nói Mai có khả năng vẽ đẹp nên dùng 'can'."], ["Tom", "can", "swim very well.", ["can't", "are"], "Câu nói Tom bơi giỏi, tức là có thể bơi, nên dùng 'can'."], ["A cat", "can", "climb a tree.", ["can't", "is"], "Mèo leo cây được nên dùng 'can'."], ["A horse", "can", "run fast.", ["can't", "is"], "Ngựa chạy nhanh được nên dùng 'can'."], ["A frog", "can", "jump high.", ["can't", "is"], "Ếch nhảy được rất cao nên dùng 'can'."], ["I", "can't", "fly like a bird.", ["can", "is"], "Người không bay được như chim nên dùng 'can't'."], ["A duck", "can", "swim in the lake.", ["can't", "is"], "Vịt bơi được trong hồ nên dùng 'can'."], ["A snake", "can't", "walk.", ["can", "are"], "Rắn không có chân, không đi được nên dùng 'can't'."]];
  var PREP_LOC = [["The book is", "on", "the table.", "Cuốn sách ở trên bàn.", "Giới từ 'on' nghĩa là ở trên (mặt phẳng)."], ["The cat is", "under", "the chair.", "Con mèo ở dưới cái ghế.", "Giới từ 'under' nghĩa là ở dưới."], ["The ball is", "in", "the box.", "Quả bóng ở trong cái hộp.", "Giới từ 'in' nghĩa là ở trong."], ["The dog is", "next to", "the tree.", "Con chó ở cạnh cái cây.", "Cụm 'next to' nghĩa là ở ngay cạnh."], ["The pen is", "under", "the book.", "Cái bút ở dưới quyển sách.", "Giới từ 'under' nghĩa là ở dưới."], ["The shoes are", "under", "the bed.", "Đôi giày ở dưới gầm giường.", "Giới từ 'under' nghĩa là ở dưới."], ["The toy is", "in", "the bag.", "Đồ chơi ở trong cặp.", "Giới từ 'in' nghĩa là ở trong."], ["The boy is", "behind", "the door.", "Cậu bé ở phía sau cánh cửa.", "Giới từ 'behind' nghĩa là ở phía sau."], ["The girl is", "next to", "the teacher.", "Cô bé ở cạnh cô giáo.", "Cụm 'next to' nghĩa là ở ngay cạnh."], ["The keys are", "on", "the desk.", "Chùm chìa khoá ở trên bàn học.", "Giới từ 'on' nghĩa là ở trên (mặt phẳng)."], ["The cup is", "next to", "the plate.", "Cái cốc ở cạnh cái đĩa.", "Cụm 'next to' nghĩa là ở ngay cạnh."], ["The cat is", "behind", "the sofa.", "Con mèo ở phía sau ghế sô-pha.", "Giới từ 'behind' nghĩa là ở phía sau."], ["The picture is", "on", "the wall.", "Bức tranh ở trên tường.", "Giới từ 'on' nghĩa là ở trên (bề mặt)."], ["The ball is", "under", "the table.", "Quả bóng ở dưới bàn.", "Giới từ 'under' nghĩa là ở dưới."]];
  var PREP_PHRASE = [["I go to school", "in", "the morning.", "Tôi đi học vào buổi sáng.", "Trước buổi trong ngày (morning/afternoon/evening) dùng 'in'."], ["We play football", "in", "the afternoon.", "Chúng tôi chơi bóng đá vào buổi chiều.", "Trước buổi trong ngày dùng 'in'."], ["I read a book", "in", "the evening.", "Tôi đọc sách vào buổi tối.", "Trước buổi trong ngày dùng 'in'."], ["I sleep", "at", "night.", "Tôi ngủ vào ban đêm.", "Cụm cố định 'at night' nghĩa là vào ban đêm."], ["Lan is", "at", "school now.", "Bây giờ Lan đang ở trường.", "Cụm 'at school' nghĩa là ở trường."], ["We play football", "on", "Sunday.", "Chúng tôi chơi bóng đá vào Chủ nhật.", "Trước ngày trong tuần dùng 'on'."], ["My birthday is", "on", "Saturday.", "Sinh nhật của tôi vào thứ Bảy.", "Trước ngày trong tuần dùng 'on'."]];
  var THERE = [["There", "is", "a book on the desk.", ["are"], "Sau 'There' là một vật (a book) nên dùng 'is'."], ["There", "are", "two cats in the garden.", ["is"], "Sau 'There' là hai con mèo (số nhiều) nên dùng 'are'."], ["There", "is", "a dog in the house.", ["are"], "Sau 'There' là một con chó (số ít) nên dùng 'is'."], ["There", "are", "three birds in the tree.", ["is"], "Sau 'There' là ba con chim (số nhiều) nên dùng 'are'."], ["There", "is", "an apple on the table.", ["are"], "Sau 'There' là một quả táo (số ít) nên dùng 'is'."], ["There", "are", "five pens in the bag.", ["is"], "Sau 'There' là năm cái bút (số nhiều) nên dùng 'are'."], ["There", "is", "a teacher in the classroom.", ["are"], "Sau 'There' là một người (số ít) nên dùng 'is'."], ["There", "are", "many flowers in the garden.", ["is"], "'Many flowers' là số nhiều nên dùng 'are'."], ["There", "is", "a ball under the chair.", ["are"], "Sau 'There' là một quả bóng (số ít) nên dùng 'is'."], ["There", "are", "four chairs in the room.", ["is"], "Sau 'There' là bốn cái ghế (số nhiều) nên dùng 'are'."]];
  var PLURAL = [["apple", "apples", "applees", "Số nhiều của 'apple' là 'apples' (thêm -s)."], ["box", "boxes", "boxs", "'Box' kết thúc bằng x nên số nhiều thêm -es: 'boxes'."], ["bus", "buses", "buss", "'Bus' kết thúc bằng s nên số nhiều thêm -es: 'buses'."], ["watch", "watches", "watchs", "'Watch' kết thúc bằng ch nên số nhiều thêm -es: 'watches'."], ["baby", "babies", "babys", "'Baby' kết thúc bằng phụ âm + y: đổi y thành i rồi thêm -es thành 'babies'."], ["boy", "boys", "boies", "'Boy' kết thúc bằng nguyên âm + y nên chỉ thêm -s: 'boys'."], ["day", "days", "daies", "'Day' kết thúc bằng nguyên âm + y nên chỉ thêm -s: 'days'."], ["child", "children", "childs", "Bất quy tắc: số nhiều của 'child' là 'children'."], ["fish", "fish", "fishs", "Đặc biệt: số nhiều của 'fish' vẫn là 'fish'."], ["foot", "feet", "foots", "Bất quy tắc: số nhiều của 'foot' là 'feet'."], ["tooth", "teeth", "tooths", "Bất quy tắc: số nhiều của 'tooth' là 'teeth'."], ["man", "men", "mans", "Bất quy tắc: số nhiều của 'man' là 'men'."], ["leaf", "leaves", "leafs", "'Leaf' đổi f thành v rồi thêm -es: 'leaves'."], ["key", "keys", "keies", "'Key' kết thúc bằng nguyên âm + y nên chỉ thêm -s: 'keys'."]];
  var PREP_WRONG = ["in", "on", "under", "next to", "behind"];
  var GRAM_SPLIT = [["I am", "a student."], ["She has got", "a red bike."], ["He goes", "to school every day."], ["There is", "a cat in the garden."], ["The ball is", "under the table."], ["They can", "swim very well."], ["We have got", "three books."], ["Mai likes", "apples very much."]];
  var TFG = [["Câu “He goes to school.” đúng ngữ pháp.", true, "Đúng: 'He' là ngôi thứ ba số ít nên 'go' thành 'goes'."], ["Câu “He go to school.” đúng ngữ pháp.", false, "Sai: 'He' là ngôi thứ ba số ít, phải dùng 'goes', không dùng 'go'."], ["Câu “She is happy.” đúng ngữ pháp.", true, "Đúng: 'She' đi với 'is'."], ["Câu “She are happy.” đúng ngữ pháp.", false, "Sai: 'She' đi với 'is', không đi với 'are'."], ["Câu “I am a student.” đúng ngữ pháp.", true, "Đúng: 'I' luôn đi với 'am'."], ["Câu “I is a student.” đúng ngữ pháp.", false, "Sai: 'I' đi với 'am', không đi với 'is'."], ["Câu “They have got a ball.” đúng ngữ pháp.", true, "Đúng: 'They' (số nhiều) đi với 'have got'."], ["Câu “They has got a ball.” đúng ngữ pháp.", false, "Sai: 'They' đi với 'have got'; 'has got' chỉ dùng với he/she/it."], ["Câu “There is a book on the desk.” đúng ngữ pháp.", true, "Đúng: một quyển sách (số ít) đi với 'There is'."], ["Câu “There are a book on the desk.” đúng ngữ pháp.", false, "Sai: 'a book' là số ít nên phải dùng 'There is'."], ["Câu “Mai can swim.” đúng ngữ pháp.", true, "Đúng: sau 'can' dùng động từ nguyên thể 'swim'."], ["Câu “Mai cans swim.” đúng ngữ pháp.", false, "Sai: 'can' không thêm -s; dạng đúng là 'Mai can swim.'"], ["Câu “The dogs are big.” đúng ngữ pháp.", true, "Đúng: 'The dogs' là số nhiều nên đi với 'are'."], ["Câu “The dogs is big.” đúng ngữ pháp.", false, "Sai: 'The dogs' là số nhiều nên phải dùng 'are'."], ["Câu “Lan watches TV.” đúng ngữ pháp.", true, "Đúng: 'Lan' là ngôi thứ ba số ít, 'watch' thêm -es thành 'watches'."], ["Câu “Lan watch TV.” đúng ngữ pháp.", false, "Sai: chủ ngữ 'Lan' là số ít ngôi thứ ba, phải dùng 'watches'."], ["Câu “We play football on Sunday.” đúng ngữ pháp.", true, "Đúng: 'We' dùng động từ nguyên thể 'play'."], ["Câu “We plays football on Sunday.” đúng ngữ pháp.", false, "Sai: 'We' là số nhiều, động từ giữ nguyên 'play', không thêm -s."]];

  function sentChoose(bank, fam, varName) {
    var it = enPick(bank);
    var q = enMCQ("Chọn từ đúng để hoàn thành câu: " + it[0] + " ___ " + it[2], it[1], it[3],
      it[4] + " Câu đúng: '" + it[0] + " " + it[1] + " " + it[2] + "'");
    return enTag(q, fam, varName);
  }
  function fBe() { return sentChoose(BE, "grammar-be", "be"); }
  function fHave() {
    var it = enPick(HAVE);
    var dis = it[1] === "have got" ? ["has got", "is got"] : ["have got", "is got"];
    var q = enMCQ("Chọn từ đúng để hoàn thành câu: " + it[0] + " ___ " + it[2], it[1], dis,
      it[4] + " Câu đúng: '" + it[0] + " " + it[1] + " " + it[2] + "'");
    return enTag(q, "grammar-have", "have-got");
  }
  function fPS() { return sentChoose(PS, "grammar-present", "present-simple"); }
  function fCan() { return sentChoose(CAN, "grammar-can", "can"); }
  function fThere() {
    var it = enPick(THERE);
    var dis = it[1] === "is" ? ["are", "am"] : ["is", "am"];
    var q = enMCQ("Chọn từ đúng để hoàn thành câu: " + it[0] + " ___ " + it[2], it[1], dis,
      it[4] + " Câu đúng: '" + it[0] + " " + it[1] + " " + it[2] + "'");
    return enTag(q, "grammar-there", "there-is-are");
  }
  function prepItem() { return Math.random() < 0.72 ? enPick(PREP_LOC) : enPick(PREP_PHRASE); }
  function fPrep() {
    var it = prepItem();
    var dis = sample(PREP_WRONG.filter(function (x) { return x !== it[1]; }), 3);
    /* D1: riêng mục PREP_LOC phải kèm nghĩa tiếng Việt của cảnh ngay trong prompt —
       thiếu nghĩa thì nhiều giới từ vị trí khác cũng thành câu đúng, đáp án gây tranh cãi.
       Mục PREP_PHRASE là cụm cố định, không mơ hồ, giữ nguyên prompt. */
    var q = enMCQ("Chọn giới từ đúng để hoàn thành câu: " + it[0] + " ___ " + it[2] + (PREP_LOC.indexOf(it) >= 0 ? " (Nghĩa: " + it[3] + ")" : ""), it[1], dis,
      it[4] + " Nghĩa của câu: " + it[3]);
    return enTag(q, "grammar-prep", it[1] === "in" || it[1] === "on" || it[1] === "under" || it[1] === "next to" || it[1] === "behind" ? "prep" : "prep-phrase");
  }
  function fPlural() {
    var it = enPick(PLURAL);
    var dis = it[0] === "fish" ? ["fishs", "fishes"] : [it[0], it[2]];
    var q = enMCQ("Điền dạng số nhiều đúng: One " + it[0] + ", two ___.", it[1], dis,
      it[3] + " Câu đúng: 'One " + it[0] + ", two " + it[1] + ".'");
    return enTag(q, "grammar-plural", "plural-" + it[0]);
  }
  function fGrammarBlank() {
    var kind = enPick(["be", "ps", "prep"]);
    var it, dis;
    if (kind === "prep") {
      it = enPick(PREP_LOC);
      dis = sample(PREP_WRONG.filter(function (x) { return x !== it[1]; }), 3);
      /* D1: kèm nghĩa tiếng Việt của cảnh trong prompt như fPrep (xem ghi chú ở fPrep). */
      var qp = enBlank("Điền giới từ còn thiếu: " + it[0] + " ___ " + it[2] + " (Nghĩa: " + it[3] + ")", it[1], dis,
        it[4] + " Nghĩa của câu: " + it[3]);
      return enTag(qp, "grammar-blank", "blank-prep");
    }
    var bank = kind === "be" ? BE : PS;
    it = enPick(bank);
    var q = enBlank("Điền từ còn thiếu: " + it[0] + " ___ " + it[2], it[1], it[3],
      it[4] + " Câu đúng: '" + it[0] + " " + it[1] + " " + it[2] + "'");
    return enTag(q, "grammar-blank", "blank-" + kind);
  }
  function fMatchGrammar() {
    var pairs = sample(GRAM_SPLIT, 5).map(function (x) { return [x[0], x[1]]; });
    var q = enMatch("Nối đầu câu với đuôi câu để được câu đúng nhé!", pairs,
      "Đọc từng đầu câu rồi tìm đuôi câu hợp ngữ pháp và hợp nghĩa (chủ ngữ đi với động từ đúng dạng).");
    return enTag(q, "grammar-match", "match-split");
  }
  function fTFGrammar() {
    var pat = enPick([[true, false, true], [false, true, false], [true, true, false], [false, false, true], [true, false, false], [false, true, true]]);
    var pairIdx = sample([0, 1, 2, 3, 4, 5, 6, 7, 8], 3);
    var rounds = pairIdx.map(function (pi, i) {
      var e = TFG[pi * 2 + (pat[i] ? 0 : 1)];
      return { stmt: e[0], truth: e[1], explain: e[2] };
    });
    var q = enTF(rounds, "Đúng hay sai? Xét ngữ pháp của từng câu nhé!");
    return enTag(q, "grammar-tf", "tf-grammar");
  }
  var PASSAGES = [{"title": "My Cat Miu", "text": "Miu is my cat. She is small and white. Miu likes fish and milk. She sleeps on my bed every day.", "details": [{"q": "What is Miu?", "a": "a cat", "w": ["a dog", "a bird", "a fish"], "ev": "Miu is my cat."}, {"q": "What colour is Miu?", "a": "white", "w": ["black", "brown", "yellow"], "ev": "She is small and white."}, {"q": "What does Miu like?", "a": "fish and milk", "w": ["rice and cake", "bread and eggs", "apples and bananas"], "ev": "Miu likes fish and milk."}, {"q": "Where does Miu sleep?", "a": "on my bed", "w": ["under the table", "in the garden", "on the chair"], "ev": "She sleeps on my bed every day."}], "trues": [{"s": "Miu is small and white.", "w": ["Miu is big and black.", "Miu is a small dog.", "Miu sleeps in the garden."], "ev": "She is small and white."}, {"s": "Miu likes fish and milk.", "w": ["Miu likes rice and cake.", "Miu drinks water only.", "Miu sleeps on the chair."], "ev": "Miu likes fish and milk."}], "word": {"wd": "small", "a": "nhỏ", "w": ["to lớn", "trắng", "nhanh"], "ev": "She is small and white."}, "blanks": [{"s": "She is small and ___.", "a": "white", "w": ["black", "brown", "red"], "ev": "She is small and white."}, {"s": "Miu likes fish and ___.", "a": "milk", "w": ["water", "rice", "juice"], "ev": "Miu likes fish and milk."}], "tf": [{"s": "Miu is a cat.", "t": true, "ev": "Miu is my cat."}, {"s": "Miu is a dog.", "t": false, "ev": "Miu is my cat."}, {"s": "Miu is white.", "t": true, "ev": "She is small and white."}, {"s": "Miu is black.", "t": false, "ev": "She is small and white."}, {"s": "Miu likes milk.", "t": true, "ev": "Miu likes fish and milk."}, {"s": "Miu sleeps under the table.", "t": false, "ev": "She sleeps on my bed every day."}], "facts": [["Miu", "a cat"], ["Miu's colour", "white"], ["Miu likes", "fish and milk"], ["Miu sleeps", "on my bed"]]}, {"title": "My School", "text": "My school is big and clean. There are twenty classrooms. My classroom is on the first floor. I learn English and maths at school.", "details": [{"q": "How is my school?", "a": "big and clean", "w": ["small and old", "small and dirty", "new and small"], "ev": "My school is big and clean."}, {"q": "How many classrooms are there?", "a": "twenty", "w": ["ten", "twelve", "thirty"], "ev": "There are twenty classrooms."}, {"q": "Where is my classroom?", "a": "on the first floor", "w": ["on the second floor", "near the garden", "in the library"], "ev": "My classroom is on the first floor."}, {"q": "What do I learn at school?", "a": "English and maths", "w": ["English and art", "music and maths", "English and music"], "ev": "I learn English and maths at school."}], "trues": [{"s": "The school is big and clean.", "w": ["The school is small and old.", "There are ten classrooms.", "My classroom is on the second floor."], "ev": "My school is big and clean."}, {"s": "There are twenty classrooms.", "w": ["There are twelve classrooms.", "I learn music at school.", "My school is small."], "ev": "There are twenty classrooms."}], "word": {"wd": "clean", "a": "sạch", "w": ["bẩn", "to lớn", "mới"], "ev": "My school is big and clean."}, "blanks": [{"s": "My school is big and ___.", "a": "clean", "w": ["dirty", "small", "old"], "ev": "My school is big and clean."}, {"s": "There are ___ classrooms.", "a": "twenty", "w": ["ten", "twelve", "thirty"], "ev": "There are twenty classrooms."}], "tf": [{"s": "The school is big.", "t": true, "ev": "My school is big and clean."}, {"s": "The school is small.", "t": false, "ev": "My school is big and clean."}, {"s": "There are twenty classrooms.", "t": true, "ev": "There are twenty classrooms."}, {"s": "There are ten classrooms.", "t": false, "ev": "There are twenty classrooms."}, {"s": "My classroom is on the first floor.", "t": true, "ev": "My classroom is on the first floor."}, {"s": "My classroom is on the second floor.", "t": false, "ev": "My classroom is on the first floor."}], "facts": [["the school", "big and clean"], ["classrooms", "twenty"], ["my classroom", "on the first floor"], ["subjects", "English and maths"]]}, {"title": "Lan's Family", "text": "Lan has got a small family. There are four people in her family. Her father is a teacher. Her mother is a doctor. Lan loves her family.", "details": [{"q": "How many people are in Lan's family?", "a": "four", "w": ["three", "five", "six"], "ev": "There are four people in her family."}, {"q": "What is Lan's father's job?", "a": "a teacher", "w": ["a doctor", "a driver", "a cook"], "ev": "Her father is a teacher."}, {"q": "What is Lan's mother's job?", "a": "a doctor", "w": ["a teacher", "a nurse", "a farmer"], "ev": "Her mother is a doctor."}, {"q": "How is Lan's family?", "a": "small", "w": ["big", "happy", "new"], "ev": "Lan has got a small family."}], "trues": [{"s": "There are four people in Lan's family.", "w": ["There are five people in her family.", "Lan's father is a doctor.", "Lan's family is big."], "ev": "There are four people in her family."}, {"s": "Lan's father is a teacher.", "w": ["Lan's father is a doctor.", "Lan's mother is a teacher.", "There are six people in the family."], "ev": "Her father is a teacher."}], "word": {"wd": "people", "a": "người", "w": ["gia đình", "bạn bè", "đồ vật"], "ev": "There are four people in her family."}, "blanks": [{"s": "There are ___ people in her family.", "a": "four", "w": ["three", "five", "six"], "ev": "There are four people in her family."}, {"s": "Her mother is a ___.", "a": "doctor", "w": ["teacher", "nurse", "driver"], "ev": "Her mother is a doctor."}], "tf": [{"s": "There are four people in the family.", "t": true, "ev": "There are four people in her family."}, {"s": "There are five people in the family.", "t": false, "ev": "There are four people in her family."}, {"s": "Lan's father is a teacher.", "t": true, "ev": "Her father is a teacher."}, {"s": "Lan's father is a doctor.", "t": false, "ev": "Her father is a teacher."}, {"s": "Lan's mother is a doctor.", "t": true, "ev": "Her mother is a doctor."}, {"s": "Lan's family is big.", "t": false, "ev": "Lan has got a small family."}], "facts": [["people in the family", "four"], ["Lan's father", "a teacher"], ["Lan's mother", "a doctor"], ["Lan's family", "small"]]}, {"title": "At the Zoo", "text": "Today I am at the zoo. I see a big elephant and two funny monkeys. The monkeys jump in the trees. I like the zoo very much.", "details": [{"q": "Where am I today?", "a": "at the zoo", "w": ["at the park", "at school", "at the market"], "ev": "Today I am at the zoo."}, {"q": "What big animal do I see?", "a": "an elephant", "w": ["a monkey", "a tiger", "a giraffe"], "ev": "I see a big elephant and two funny monkeys."}, {"q": "How many monkeys are there?", "a": "two", "w": ["three", "four", "five"], "ev": "I see a big elephant and two funny monkeys."}, {"q": "What do the monkeys do?", "a": "jump in the trees", "w": ["sleep in the trees", "eat bananas", "swim in the water"], "ev": "The monkeys jump in the trees."}], "trues": [{"s": "I see a big elephant.", "w": ["I see a small elephant.", "I see three monkeys.", "The monkeys sleep in the trees."], "ev": "I see a big elephant and two funny monkeys."}, {"s": "The monkeys jump in the trees.", "w": ["The monkeys eat bananas.", "The monkeys swim in the water.", "I am at the park today."], "ev": "The monkeys jump in the trees."}], "word": {"wd": "funny", "a": "buồn cười", "w": ["buồn ngủ", "to lớn", "đói bụng"], "ev": "I see a big elephant and two funny monkeys."}, "blanks": [{"s": "I see a big ___ and two funny monkeys.", "a": "elephant", "w": ["tiger", "giraffe", "horse"], "ev": "I see a big elephant and two funny monkeys."}, {"s": "The monkeys ___ in the trees.", "a": "jump", "w": ["sleep", "swim", "read"], "ev": "The monkeys jump in the trees."}], "tf": [{"s": "I am at the zoo today.", "t": true, "ev": "Today I am at the zoo."}, {"s": "I am at the park today.", "t": false, "ev": "Today I am at the zoo."}, {"s": "The elephant is big.", "t": true, "ev": "I see a big elephant and two funny monkeys."}, {"s": "There are three monkeys.", "t": false, "ev": "I see a big elephant and two funny monkeys."}, {"s": "The monkeys jump in the trees.", "t": true, "ev": "The monkeys jump in the trees."}, {"s": "The monkeys sleep in the trees.", "t": false, "ev": "The monkeys jump in the trees."}], "facts": [["the place", "the zoo"], ["the elephant", "big"], ["the monkeys", "two"], ["the monkeys jump", "in the trees"]]}, {"title": "My Best Friend", "text": "My best friend is Nam. He is nine years old. Nam is tall and kind. We play football together after school.", "details": [{"q": "Who is my best friend?", "a": "Nam", "w": ["Lan", "Tom", "Ben"], "ev": "My best friend is Nam."}, {"q": "How old is Nam?", "a": "nine years old", "w": ["eight years old", "ten years old", "seven years old"], "ev": "He is nine years old."}, {"q": "How is Nam?", "a": "tall and kind", "w": ["short and kind", "tall and quiet", "small and kind"], "ev": "Nam is tall and kind."}, {"q": "What do we play together?", "a": "football", "w": ["tennis", "badminton", "basketball"], "ev": "We play football together after school."}], "trues": [{"s": "Nam is nine years old.", "w": ["Nam is ten years old.", "Nam is short.", "We play tennis after school."], "ev": "He is nine years old."}, {"s": "We play football after school.", "w": ["We play football before school.", "We play badminton together.", "Nam is eight years old."], "ev": "We play football together after school."}], "word": {"wd": "kind", "a": "tốt bụng", "w": ["cao lớn", "chín tuổi", "ồn ào"], "ev": "Nam is tall and kind."}, "blanks": [{"s": "My best friend is ___.", "a": "Nam", "w": ["Lan", "Tom", "Ben"], "ev": "My best friend is Nam."}, {"s": "We play ___ together after school.", "a": "football", "w": ["tennis", "badminton", "chess"], "ev": "We play football together after school."}], "tf": [{"s": "Nam is nine years old.", "t": true, "ev": "He is nine years old."}, {"s": "Nam is ten years old.", "t": false, "ev": "He is nine years old."}, {"s": "Nam is tall.", "t": true, "ev": "Nam is tall and kind."}, {"s": "Nam is short.", "t": false, "ev": "Nam is tall and kind."}, {"s": "We play football after school.", "t": true, "ev": "We play football together after school."}, {"s": "We play football before school.", "t": false, "ev": "We play football together after school."}], "facts": [["my best friend", "Nam"], ["Nam's age", "nine years old"], ["Nam is", "tall and kind"], ["our game", "football"]]}, {"title": "A Rainy Day", "text": "It is rainy today. The sky is gray. I stay at home and read a book. My mother makes hot soup for me.", "details": [{"q": "What is the weather today?", "a": "rainy", "w": ["sunny", "windy", "snowy"], "ev": "It is rainy today."}, {"q": "What colour is the sky?", "a": "gray", "w": ["blue", "white", "black"], "ev": "The sky is gray."}, {"q": "What do I do at home?", "a": "read a book", "w": ["watch TV", "play football", "draw a picture"], "ev": "I stay at home and read a book."}, {"q": "What does my mother make?", "a": "hot soup", "w": ["a big cake", "hot tea", "rice and fish"], "ev": "My mother makes hot soup for me."}], "trues": [{"s": "It is rainy today.", "w": ["It is sunny today.", "The sky is blue.", "Mother makes a cake."], "ev": "It is rainy today."}, {"s": "My mother makes hot soup.", "w": ["My mother makes a cake.", "I read a book at school.", "The sky is gray and sunny."], "ev": "My mother makes hot soup for me."}], "word": {"wd": "rainy", "a": "có mưa", "w": ["nắng", "có gió", "có tuyết"], "ev": "It is rainy today."}, "blanks": [{"s": "The sky is ___.", "a": "gray", "w": ["blue", "white", "black"], "ev": "The sky is gray."}, {"s": "I stay at home and read a ___.", "a": "book", "w": ["letter", "map", "song"], "ev": "I stay at home and read a book."}], "tf": [{"s": "It is rainy today.", "t": true, "ev": "It is rainy today."}, {"s": "It is sunny today.", "t": false, "ev": "It is rainy today."}, {"s": "The sky is gray.", "t": true, "ev": "The sky is gray."}, {"s": "The sky is blue.", "t": false, "ev": "The sky is gray."}, {"s": "I read a book at home.", "t": true, "ev": "I stay at home and read a book."}, {"s": "My mother makes a cake.", "t": false, "ev": "My mother makes hot soup for me."}], "facts": [["the weather", "rainy"], ["the sky", "gray"], ["I read", "a book"], ["my mother makes", "hot soup"]]}, {"title": "Breakfast Time", "text": "I have breakfast at seven o'clock. I eat bread and eggs. I drink a glass of milk. Breakfast gives me energy for school.", "details": [{"q": "What time do I have breakfast?", "a": "seven o'clock", "w": ["six o'clock", "eight o'clock", "nine o'clock"], "ev": "I have breakfast at seven o'clock."}, {"q": "What do I eat?", "a": "bread and eggs", "w": ["rice and fish", "bread and cake", "eggs and bananas"], "ev": "I eat bread and eggs."}, {"q": "What do I drink?", "a": "a glass of milk", "w": ["a glass of juice", "a cup of tea", "a glass of water"], "ev": "I drink a glass of milk."}, {"q": "Breakfast gives me energy for what?", "a": "school", "w": ["playing games", "sleeping", "swimming"], "ev": "Breakfast gives me energy for school."}], "trues": [{"s": "I eat bread and eggs.", "w": ["I eat rice and fish.", "I have breakfast at eight o'clock.", "I drink juice."], "ev": "I eat bread and eggs."}, {"s": "I drink a glass of milk.", "w": ["I drink a glass of juice.", "I eat bread only.", "Breakfast is at nine o'clock."], "ev": "I drink a glass of milk."}], "word": {"wd": "breakfast", "a": "bữa sáng", "w": ["bữa trưa", "bữa tối", "bữa phụ"], "ev": "I have breakfast at seven o'clock."}, "blanks": [{"s": "I have breakfast at ___ o'clock.", "a": "seven", "w": ["six", "eight", "nine"], "ev": "I have breakfast at seven o'clock."}, {"s": "I drink a glass of ___.", "a": "milk", "w": ["juice", "water", "tea"], "ev": "I drink a glass of milk."}], "tf": [{"s": "Breakfast is at seven o'clock.", "t": true, "ev": "I have breakfast at seven o'clock."}, {"s": "Breakfast is at eight o'clock.", "t": false, "ev": "I have breakfast at seven o'clock."}, {"s": "I eat eggs for breakfast.", "t": true, "ev": "I eat bread and eggs."}, {"s": "I eat rice for breakfast.", "t": false, "ev": "I eat bread and eggs."}, {"s": "I drink milk.", "t": true, "ev": "I drink a glass of milk."}, {"s": "I drink juice.", "t": false, "ev": "I drink a glass of milk."}], "facts": [["breakfast time", "seven o'clock"], ["food", "bread and eggs"], ["drink", "a glass of milk"], ["breakfast gives energy", "for school"]]}, {"title": "My Birthday", "text": "Today is my birthday. I am eight years old. There is a big cake on the table. My friends sing a happy song for me.", "details": [{"q": "How old am I today?", "a": "eight years old", "w": ["seven years old", "nine years old", "ten years old"], "ev": "I am eight years old."}, {"q": "What is on the table?", "a": "a big cake", "w": ["a small cake", "a big book", "some flowers"], "ev": "There is a big cake on the table."}, {"q": "Who sings a song for me?", "a": "my friends", "w": ["my mother", "my teacher", "my sister"], "ev": "My friends sing a happy song for me."}, {"q": "What kind of song do my friends sing?", "a": "a happy song", "w": ["a sad song", "a birthday cake", "a new song"], "ev": "My friends sing a happy song for me."}], "trues": [{"s": "There is a big cake on the table.", "w": ["There is a small cake on the table.", "I am nine years old.", "My mother sings a song."], "ev": "There is a big cake on the table."}, {"s": "My friends sing a happy song.", "w": ["My friends sing a sad song.", "My teacher sings a song.", "There is a book on the table."], "ev": "My friends sing a happy song for me."}], "word": {"wd": "happy", "a": "vui vẻ", "w": ["buồn", "mệt", "đói"], "ev": "My friends sing a happy song for me."}, "blanks": [{"s": "I am ___ years old today.", "a": "eight", "w": ["seven", "nine", "ten"], "ev": "I am eight years old."}, {"s": "There is a big ___ on the table.", "a": "cake", "w": ["book", "ball", "clock"], "ev": "There is a big cake on the table."}], "tf": [{"s": "Today is my birthday.", "t": true, "ev": "Today is my birthday."}, {"s": "I am nine years old.", "t": false, "ev": "I am eight years old."}, {"s": "The cake is big.", "t": true, "ev": "There is a big cake on the table."}, {"s": "The cake is small.", "t": false, "ev": "There is a big cake on the table."}, {"s": "My friends sing a happy song.", "t": true, "ev": "My friends sing a happy song for me."}, {"s": "My friends sing a sad song.", "t": false, "ev": "My friends sing a happy song for me."}], "facts": [["my age today", "eight years old"], ["on the table", "a big cake"], ["my friends sing", "a happy song"], ["today is", "my birthday"]]}, {"title": "In the Garden", "text": "There is a small garden behind my house. There are red flowers and green trees. Birds sing in the trees in the morning. I water the flowers every day.", "details": [{"q": "Where is the garden?", "a": "behind my house", "w": ["in front of my house", "near my school", "behind the park"], "ev": "There is a small garden behind my house."}, {"q": "What colour are the flowers?", "a": "red", "w": ["yellow", "pink", "white"], "ev": "There are red flowers and green trees."}, {"q": "When do birds sing in the trees?", "a": "in the morning", "w": ["in the evening", "at night", "in the afternoon"], "ev": "Birds sing in the trees in the morning."}, {"q": "What do I do every day?", "a": "water the flowers", "w": ["cut the trees", "read a book", "play with birds"], "ev": "I water the flowers every day."}], "trues": [{"s": "The garden is behind my house.", "w": ["The garden is in front of my house.", "The flowers are yellow.", "Birds sing at night."], "ev": "There is a small garden behind my house."}, {"s": "Birds sing in the morning.", "w": ["Birds sing at night.", "The trees are red.", "I water the trees every day."], "ev": "Birds sing in the trees in the morning."}], "word": {"wd": "behind", "a": "ở phía sau", "w": ["ở phía trước", "ở bên trong", "ở bên trên"], "ev": "There is a small garden behind my house."}, "blanks": [{"s": "There are red ___ and green trees.", "a": "flowers", "w": ["leaves", "birds", "apples"], "ev": "There are red flowers and green trees."}, {"s": "I ___ the flowers every day.", "a": "water", "w": ["cut", "eat", "draw"], "ev": "I water the flowers every day."}], "tf": [{"s": "The garden is small.", "t": true, "ev": "There is a small garden behind my house."}, {"s": "The garden is in front of my house.", "t": false, "ev": "There is a small garden behind my house."}, {"s": "The flowers are red.", "t": true, "ev": "There are red flowers and green trees."}, {"s": "The trees are blue.", "t": false, "ev": "There are red flowers and green trees."}, {"s": "Birds sing in the morning.", "t": true, "ev": "Birds sing in the trees in the morning."}, {"s": "Birds sing at night.", "t": false, "ev": "Birds sing in the trees in the morning."}], "facts": [["the garden", "behind my house"], ["the flowers", "red"], ["the trees", "green"], ["birds sing", "in the morning"]]}, {"title": "At the Park", "text": "On Sunday, I go to the park with my family. We ride bikes and fly a kite. My little sister plays with a ball. We are happy together.", "details": [{"q": "When do I go to the park?", "a": "on Sunday", "w": ["on Monday", "on Saturday", "on Friday"], "ev": "On Sunday, I go to the park with my family."}, {"q": "Who do I go to the park with?", "a": "my family", "w": ["my friends", "my teacher", "my classmates"], "ev": "On Sunday, I go to the park with my family."}, {"q": "What do we fly?", "a": "a kite", "w": ["a ball", "a plane", "a bird"], "ev": "We ride bikes and fly a kite."}, {"q": "What does my little sister play with?", "a": "a ball", "w": ["a doll", "a kite", "a car"], "ev": "My little sister plays with a ball."}], "trues": [{"s": "I go to the park on Sunday.", "w": ["I go to the park on Monday.", "I go to the park with my friends.", "My sister plays with a doll."], "ev": "On Sunday, I go to the park with my family."}, {"s": "We ride bikes.", "w": ["We ride horses.", "We fly a ball.", "My sister rides a bike."], "ev": "We ride bikes and fly a kite."}], "word": {"wd": "together", "a": "cùng nhau", "w": ["một mình", "vui vẻ", "vào Chủ nhật"], "ev": "We are happy together."}, "blanks": [{"s": "We ride bikes and fly a ___.", "a": "kite", "w": ["ball", "plane", "bird"], "ev": "We ride bikes and fly a kite."}, {"s": "My little sister plays with a ___.", "a": "ball", "w": ["doll", "kite", "car"], "ev": "My little sister plays with a ball."}], "tf": [{"s": "I go to the park on Sunday.", "t": true, "ev": "On Sunday, I go to the park with my family."}, {"s": "I go to the park on Monday.", "t": false, "ev": "On Sunday, I go to the park with my family."}, {"s": "I go with my family.", "t": true, "ev": "On Sunday, I go to the park with my family."}, {"s": "I go with my friends.", "t": false, "ev": "On Sunday, I go to the park with my family."}, {"s": "We fly a kite.", "t": true, "ev": "We ride bikes and fly a kite."}, {"s": "My sister plays with a doll.", "t": false, "ev": "My little sister plays with a ball."}], "facts": [["the day", "Sunday"], ["the place", "the park"], ["we fly", "a kite"], ["my sister plays with", "a ball"]]}, {"title": "My Teacher", "text": "My teacher is Miss Hoa. She is young and friendly. She teaches us English. We love her lessons very much.", "details": [{"q": "Who is my teacher?", "a": "Miss Hoa", "w": ["Mr Nam", "Miss Lan", "Mrs Mai"], "ev": "My teacher is Miss Hoa."}, {"q": "How is my teacher?", "a": "young and friendly", "w": ["old and quiet", "young and tall", "old and friendly"], "ev": "She is young and friendly."}, {"q": "What does she teach us?", "a": "English", "w": ["maths", "music", "art"], "ev": "She teaches us English."}, {"q": "What do we love very much?", "a": "her lessons", "w": ["her books", "her songs", "her games"], "ev": "We love her lessons very much."}], "trues": [{"s": "Miss Hoa is young and friendly.", "w": ["Miss Hoa is old and quiet.", "She teaches us maths.", "We love her books."], "ev": "She is young and friendly."}, {"s": "She teaches us English.", "w": ["She teaches us music.", "My teacher is Mr Nam.", "She is old and friendly."], "ev": "She teaches us English."}], "word": {"wd": "friendly", "a": "thân thiện", "w": ["trẻ", "cao lớn", "ồn ào"], "ev": "She is young and friendly."}, "blanks": [{"s": "My teacher is Miss ___.", "a": "Hoa", "w": ["Lan", "Mai", "Linh"], "ev": "My teacher is Miss Hoa."}, {"s": "She teaches us ___.", "a": "English", "w": ["maths", "music", "art"], "ev": "She teaches us English."}], "tf": [{"s": "My teacher is Miss Hoa.", "t": true, "ev": "My teacher is Miss Hoa."}, {"s": "My teacher is Mr Nam.", "t": false, "ev": "My teacher is Miss Hoa."}, {"s": "She is friendly.", "t": true, "ev": "She is young and friendly."}, {"s": "She teaches us maths.", "t": false, "ev": "She teaches us English."}, {"s": "We love her lessons.", "t": true, "ev": "We love her lessons very much."}, {"s": "We do not like her lessons.", "t": false, "ev": "We love her lessons very much."}], "facts": [["my teacher", "Miss Hoa"], ["she is", "young and friendly"], ["her subject", "English"], ["we love", "her lessons"]]}, {"title": "A Funny Monkey", "text": "Look at the monkey in the tree. It is brown and funny. The monkey eats a banana. It can climb and jump very fast.", "details": [{"q": "Where is the monkey?", "a": "in the tree", "w": ["in the house", "on the table", "in the water"], "ev": "Look at the monkey in the tree."}, {"q": "What colour is the monkey?", "a": "brown", "w": ["black", "gray", "white"], "ev": "It is brown and funny."}, {"q": "What does the monkey eat?", "a": "a banana", "w": ["an apple", "a cake", "an orange"], "ev": "The monkey eats a banana."}, {"q": "What can the monkey do?", "a": "climb and jump", "w": ["swim and run", "read and write", "sing and dance"], "ev": "It can climb and jump very fast."}], "trues": [{"s": "The monkey is brown.", "w": ["The monkey is black.", "The monkey is in the house.", "The monkey eats an apple."], "ev": "It is brown and funny."}, {"s": "The monkey eats a banana.", "w": ["The monkey eats a cake.", "The monkey can swim.", "The monkey is gray."], "ev": "The monkey eats a banana."}], "word": {"wd": "climb", "a": "leo, trèo", "w": ["bơi", "nhảy", "ăn"], "ev": "It can climb and jump very fast."}, "blanks": [{"s": "The monkey eats a ___.", "a": "banana", "w": ["apple", "cake", "orange"], "ev": "The monkey eats a banana."}, {"s": "It can climb and ___ very fast.", "a": "jump", "w": ["swim", "read", "sing"], "ev": "It can climb and jump very fast."}], "tf": [{"s": "The monkey is in the tree.", "t": true, "ev": "Look at the monkey in the tree."}, {"s": "The monkey is in the house.", "t": false, "ev": "Look at the monkey in the tree."}, {"s": "The monkey is brown.", "t": true, "ev": "It is brown and funny."}, {"s": "The monkey is black.", "t": false, "ev": "It is brown and funny."}, {"s": "The monkey eats a banana.", "t": true, "ev": "The monkey eats a banana."}, {"s": "The monkey eats an apple.", "t": false, "ev": "The monkey eats a banana."}], "facts": [["the monkey", "in the tree"], ["its colour", "brown"], ["its food", "a banana"], ["it can", "climb and jump"]]}, {"title": "My House", "text": "My house is not big, but it is warm. There are three bedrooms in my house. My room is small and tidy. I love my house.", "details": [{"q": "How is my house?", "a": "warm", "w": ["cold", "noisy", "old"], "ev": "My house is not big, but it is warm."}, {"q": "How many bedrooms are in my house?", "a": "three", "w": ["two", "four", "five"], "ev": "There are three bedrooms in my house."}, {"q": "How is my room?", "a": "small and tidy", "w": ["big and tidy", "small and messy", "big and warm"], "ev": "My room is small and tidy."}, {"q": "How do I feel about my house?", "a": "I love it.", "w": ["I hate it.", "I am afraid of it.", "I forget it."], "ev": "I love my house."}], "trues": [{"s": "There are three bedrooms in my house.", "w": ["There are two bedrooms in my house.", "My room is big.", "My house is cold."], "ev": "There are three bedrooms in my house."}, {"s": "My room is small and tidy.", "w": ["My room is big and messy.", "There are four bedrooms.", "I hate my house."], "ev": "My room is small and tidy."}], "word": {"wd": "tidy", "a": "gọn gàng", "w": ["bừa bộn", "ấm áp", "nhỏ"], "ev": "My room is small and tidy."}, "blanks": [{"s": "There are ___ bedrooms in my house.", "a": "three", "w": ["two", "four", "five"], "ev": "There are three bedrooms in my house."}, {"s": "My room is small and ___.", "a": "tidy", "w": ["messy", "big", "cold"], "ev": "My room is small and tidy."}], "tf": [{"s": "My house is warm.", "t": true, "ev": "My house is not big, but it is warm."}, {"s": "My house is cold.", "t": false, "ev": "My house is not big, but it is warm."}, {"s": "There are three bedrooms.", "t": true, "ev": "There are three bedrooms in my house."}, {"s": "There are two bedrooms.", "t": false, "ev": "There are three bedrooms in my house."}, {"s": "My room is tidy.", "t": true, "ev": "My room is small and tidy."}, {"s": "My room is big.", "t": false, "ev": "My room is small and tidy."}], "facts": [["my house", "warm"], ["bedrooms", "three"], ["my room", "small and tidy"], ["I feel", "I love my house"]]}, {"title": "Sports Day", "text": "Today is Sports Day at my school. Minh runs very fast. Linh jumps high. Our class wins a cup. We are very proud.", "details": [{"q": "What day is today?", "a": "Sports Day", "w": ["Music Day", "Book Day", "Art Day"], "ev": "Today is Sports Day at my school."}, {"q": "Who runs very fast?", "a": "Minh", "w": ["Linh", "Nam", "Hoa"], "ev": "Minh runs very fast."}, {"q": "Who jumps high?", "a": "Linh", "w": ["Minh", "Lan", "Tuan"], "ev": "Linh jumps high."}, {"q": "What does our class win?", "a": "a cup", "w": ["a ball", "a book", "a medal"], "ev": "Our class wins a cup."}], "trues": [{"s": "Minh runs very fast.", "w": ["Minh jumps high.", "Linh runs very fast.", "Our class wins a ball."], "ev": "Minh runs very fast."}, {"s": "Our class wins a cup.", "w": ["Our class wins a medal.", "Today is Music Day.", "We are sad."], "ev": "Our class wins a cup."}], "word": {"wd": "proud", "a": "tự hào", "w": ["buồn", "mệt", "sợ"], "ev": "We are very proud."}, "blanks": [{"s": "Minh ___ very fast.", "a": "runs", "w": ["jumps", "swims", "reads"], "ev": "Minh runs very fast."}, {"s": "Linh jumps ___.", "a": "high", "w": ["low", "slowly", "fast"], "ev": "Linh jumps high."}], "tf": [{"s": "Today is Sports Day.", "t": true, "ev": "Today is Sports Day at my school."}, {"s": "Sports Day is at home.", "t": false, "ev": "Today is Sports Day at my school."}, {"s": "Minh runs fast.", "t": true, "ev": "Minh runs very fast."}, {"s": "Linh runs fast.", "t": false, "ev": "Linh jumps high."}, {"s": "Our class wins a cup.", "t": true, "ev": "Our class wins a cup."}, {"s": "Our class wins a ball.", "t": false, "ev": "Our class wins a cup."}], "facts": [["today", "Sports Day"], ["Minh", "runs very fast"], ["Linh", "jumps high"], ["our class wins", "a cup"]]}, {"title": "At the Market", "text": "My mother and I go to the market in the morning. We buy apples, bananas and eggs. The market is busy and noisy. We go home by bus.", "details": [{"q": "When do we go to the market?", "a": "in the morning", "w": ["in the afternoon", "in the evening", "at night"], "ev": "My mother and I go to the market in the morning."}, {"q": "What do we buy?", "a": "apples, bananas and eggs", "w": ["apples, oranges and milk", "bananas, bread and eggs", "apples, bananas and rice"], "ev": "We buy apples, bananas and eggs."}, {"q": "How is the market?", "a": "busy and noisy", "w": ["quiet and small", "busy and quiet", "small and noisy"], "ev": "The market is busy and noisy."}, {"q": "How do we go home?", "a": "by bus", "w": ["by bike", "by car", "on foot"], "ev": "We go home by bus."}], "trues": [{"s": "We go to the market in the morning.", "w": ["We go to the market in the evening.", "We buy oranges.", "We go home by bike."], "ev": "My mother and I go to the market in the morning."}, {"s": "We go home by bus.", "w": ["We go home by car.", "The market is quiet.", "We buy bread and milk."], "ev": "We go home by bus."}], "word": {"wd": "busy", "a": "đông đúc", "w": ["yên tĩnh", "nhỏ bé", "sạch sẽ"], "ev": "The market is busy and noisy."}, "blanks": [{"s": "We buy apples, bananas and ___.", "a": "eggs", "w": ["milk", "bread", "rice"], "ev": "We buy apples, bananas and eggs."}, {"s": "We go home by ___.", "a": "bus", "w": ["bike", "car", "train"], "ev": "We go home by bus."}], "tf": [{"s": "We go to the market in the morning.", "t": true, "ev": "My mother and I go to the market in the morning."}, {"s": "We go to the market in the afternoon.", "t": false, "ev": "My mother and I go to the market in the morning."}, {"s": "We buy bananas.", "t": true, "ev": "We buy apples, bananas and eggs."}, {"s": "We buy oranges.", "t": false, "ev": "We buy apples, bananas and eggs."}, {"s": "The market is busy.", "t": true, "ev": "The market is busy and noisy."}, {"s": "We go home by bike.", "t": false, "ev": "We go home by bus."}], "facts": [["the time", "in the morning"], ["we buy", "fruit and eggs"], ["the market", "busy and noisy"], ["we go home", "by bus"]]}, {"title": "My Red Bike", "text": "I have got a red bike. It is new and fast. I ride my bike to the park on Sundays. I wear a blue helmet when I ride.", "details": [{"q": "What colour is my bike?", "a": "red", "w": ["blue", "green", "black"], "ev": "I have got a red bike."}, {"q": "How is my bike?", "a": "new and fast", "w": ["old and slow", "new and slow", "small and old"], "ev": "It is new and fast."}, {"q": "Where do I ride my bike?", "a": "to the park", "w": ["to school", "to the market", "to the zoo"], "ev": "I ride my bike to the park on Sundays."}, {"q": "What colour is my helmet?", "a": "blue", "w": ["red", "yellow", "white"], "ev": "I wear a blue helmet when I ride."}], "trues": [{"s": "My bike is new and fast.", "w": ["My bike is old and slow.", "My helmet is red.", "I ride to school."], "ev": "It is new and fast."}, {"s": "I wear a blue helmet.", "w": ["I wear a red helmet.", "My bike is blue.", "I ride to the zoo."], "ev": "I wear a blue helmet when I ride."}], "word": {"wd": "helmet", "a": "mũ bảo hiểm", "w": ["cái mũ vải", "áo khoác", "đôi giày"], "ev": "I wear a blue helmet when I ride."}, "blanks": [{"s": "I have got a ___ bike.", "a": "red", "w": ["blue", "green", "black"], "ev": "I have got a red bike."}, {"s": "I wear a ___ helmet when I ride.", "a": "blue", "w": ["red", "yellow", "white"], "ev": "I wear a blue helmet when I ride."}], "tf": [{"s": "My bike is red.", "t": true, "ev": "I have got a red bike."}, {"s": "My bike is blue.", "t": false, "ev": "I have got a red bike."}, {"s": "My bike is new.", "t": true, "ev": "It is new and fast."}, {"s": "I ride my bike to school.", "t": false, "ev": "I ride my bike to the park on Sundays."}, {"s": "My helmet is blue.", "t": true, "ev": "I wear a blue helmet when I ride."}, {"s": "My helmet is red.", "t": false, "ev": "I wear a blue helmet when I ride."}], "facts": [["my bike", "red"], ["my bike is", "new and fast"], ["I ride to", "the park"], ["my helmet", "blue"]]}];

  function passageHTML(p, withTitle) { return enPassage((withTitle ? "<b>" + p.title + "</b><br>" : "") + p.text); }
  function fReadDetail() {
    var p = enPick(PASSAGES), d = enPick(p.details);
    var q = enMCQ("Đọc đoạn văn rồi trả lời: " + d.q, d.a, d.w,
      "Trong đoạn văn có câu: '" + d.ev + "' nên đáp án đúng là '" + d.a + "'.",
      { visual: passageHTML(p, true) });
    return enTag(q, "read", "detail-" + p.title);
  }
  function fReadTrue() {
    var p = enPick(PASSAGES), t = enPick(p.trues);
    var q = enMCQ("Câu nào ĐÚNG về đoạn văn?", t.s, t.w,
      "Đúng vì đoạn văn viết: '" + t.ev + "'",
      { visual: passageHTML(p, true) });
    enId(q, p.title + "|" + t.s);
    return enTag(q, "read", "true-" + p.title);
  }
  function fReadWord() {
    var p = enPick(PASSAGES), w = p.word;
    var q = enMCQ("Trong đoạn văn, từ '" + w.wd + "' nghĩa là gì?", w.a, w.w,
      "'" + w.wd + "' nghĩa là '" + w.a + "'. Trong đoạn: '" + w.ev + "'",
      { visual: passageHTML(p, true) });
    return enTag(q, "read", "word-" + p.title);
  }
  function fReadTitle() {
    var p = enPick(PASSAGES);
    var dis = sample(PASSAGES.filter(function (x) { return x.title !== p.title; }), 3).map(function (x) { return x.title; });
    var q = enMCQ("Tựa đề nào đúng cho đoạn văn này?", p.title, dis,
      "Cả đoạn văn nói về '" + p.title + "', nên đó là tựa đề đúng.",
      { visual: passageHTML(p, false) });
    return enTag(q, "read", "title-" + p.title);
  }
  function fReadBlank() {
    var p = enPick(PASSAGES), b = enPick(p.blanks);
    var q = enBlank("Đọc đoạn văn rồi điền từ còn thiếu: " + b.s, b.a, b.w,
      "Câu đầy đủ trong đoạn là: '" + b.ev + "' nên từ cần điền là '" + b.a + "'.",
      passageHTML(p, true));
    return enTag(q, "read-blank", "blank-" + p.title);
  }
  function fReadTF() {
    var p = enPick(PASSAGES);
    var trues = p.tf.filter(function (x) { return x.t; }), falses = p.tf.filter(function (x) { return !x.t; });
    var nT = enPick([1, 2]);
    var chosen = sample(trues, nT).concat(sample(falses, 3 - nT));
    var rounds = enShuffle(chosen).map(function (x) {
      return { stmt: x.s, truth: x.t, explain: (x.t ? "Đúng. " : "Sai. ") + "Đoạn văn viết: '" + x.ev + "'" };
    });
    var q = enTF(rounds, "Đoạn văn '" + p.title + "': " + p.text + " — Đúng hay sai?");
    return enTag(q, "read-tf", "tf-" + p.title);
  }
  function fReadMatch() {
    var p = enPick(PASSAGES);
    var pairs = p.facts.map(function (x) { return [x[0], x[1]]; });
    var q = enMatch("Nối thông tin đúng theo đoạn văn '" + p.title + "' nhé!", pairs,
      "Đối chiếu từng thông tin với đoạn văn '" + p.title + "': " + p.facts.map(function (x) { return x[0] + " — " + x[1]; }).join("; ") + ".");
    return enTag(q, "read-match", "match-" + p.title);
  }
  var DLGS = [{"scene": "Chào hỏi và hỏi tên", "before": ["Lan: Hello! What is your name?"], "gapSpeaker": "Tom", "gapAns": "My name is Tom.", "after": ["Lan: Nice to meet you, Tom.", "Tom: Nice to meet you too."], "ex": "Lan hỏi tên, nên Tom trả lời bằng mẫu 'My name is …' (Tên tôi là …).", "t": "Lan hỏi tên của Tom.", "f": ["Lan hỏi tuổi của Tom.", "Tom nói mình tên là Lan."]}, {"scene": "Hỏi tuổi", "before": ["Mai: How old are you, Ben?"], "gapSpeaker": "Ben", "gapAns": "I am nine years old.", "after": ["Mai: I am nine too!"], "ex": "Câu hỏi 'How old are you?' (Bạn bao nhiêu tuổi?) được trả lời bằng 'I am … years old.'", "t": "Ben chín tuổi.", "f": ["Ben mười tuổi.", "Mai hỏi Ben sống ở đâu."]}, {"scene": "Hỏi nơi sống", "before": ["Nam: Where do you live, Hoa?"], "gapSpeaker": "Hoa", "gapAns": "I live in Hanoi.", "after": ["Nam: I live in Hanoi too."], "ex": "Câu hỏi 'Where do you live?' (Bạn sống ở đâu?) được trả lời bằng 'I live in …'.", "t": "Hoa sống ở Hà Nội.", "f": ["Hoa sống ở Huế.", "Nam hỏi Hoa bao nhiêu tuổi."]}, {"scene": "Mua táo ở cửa hàng", "before": ["Lan: Good morning. How much are these apples?", "Seller: Good morning."], "gapSpeaker": "Seller", "gapAns": "They are 20,000 dong.", "after": ["Lan: I would like six apples, please."], "ex": "Lan hỏi giá táo ('How much are these apples?'), nên người bán trả lời bằng giá tiền.", "t": "Lan hỏi giá táo.", "f": ["Lan hỏi giá cam.", "Giá táo là mười nghìn đồng."]}, {"scene": "Hỏi đường tới trường", "before": ["Tom: Excuse me. Where is the school?"], "gapSpeaker": "Woman", "gapAns": "It is next to the park.", "after": ["Tom: Thank you very much.", "Woman: You are welcome."], "ex": "Tom hỏi trường học ở đâu, nên câu trả lời chỉ vị trí: 'It is next to the park.' (Nó ở cạnh công viên.)", "t": "Trường học ở cạnh công viên.", "f": ["Trường học ở cạnh chợ.", "Tom hỏi đường tới thư viện."]}, {"scene": "Mượn sách ở thư viện", "before": ["Linh: Excuse me. Can I borrow this book?"], "gapSpeaker": "Librarian", "gapAns": "Yes, you can.", "after": ["Linh: Thank you very much."], "ex": "Linh xin phép mượn sách ('Can I borrow this book?'), thủ thư đồng ý: 'Yes, you can.'", "t": "Linh muốn mượn một quyển sách.", "f": ["Linh muốn mua một quyển sách.", "Thủ thư không cho Linh mượn sách."]}, {"scene": "Hỏi đây là cái gì", "before": ["Teacher: What's this, Minh?"], "gapSpeaker": "Minh", "gapAns": "It is a pencil.", "after": ["Teacher: Very good, Minh."], "ex": "Câu hỏi 'What's this?' (Đây là cái gì?) được trả lời bằng 'It is a …'.", "t": "Minh nói đó là một cây bút chì.", "f": ["Minh nói đó là một cái thước.", "Cô giáo hỏi đây là màu gì."]}, {"scene": "Hỏi màu sắc", "before": ["Anna: What colour is your bag, Sue?"], "gapSpeaker": "Sue", "gapAns": "It is blue.", "after": ["Anna: It is a nice bag."], "ex": "Anna hỏi màu của chiếc cặp, nên Sue trả lời bằng một màu: 'It is blue.' (Nó màu xanh dương.)", "t": "Cặp của Sue màu xanh dương.", "f": ["Cặp của Sue màu đỏ.", "Anna hỏi tuổi của Sue."]}, {"scene": "Hỏi khả năng bơi", "before": ["Ben: Can you swim, Amy?"], "gapSpeaker": "Amy", "gapAns": "Yes, I can.", "after": ["Ben: I can swim too."], "ex": "Câu hỏi 'Can you swim?' (Bạn biết bơi không?) được trả lời 'Yes, I can.' khi biết bơi.", "t": "Amy biết bơi.", "f": ["Amy không biết bơi.", "Ben hỏi Amy có biết hát không."]}, {"scene": "Hỏi món ăn yêu thích", "before": ["Mother: What food do you like, Phong?"], "gapSpeaker": "Phong", "gapAns": "I like chicken and rice.", "after": ["Mother: Chicken is on the table."], "ex": "Mẹ hỏi Phong thích món ăn gì, nên Phong trả lời 'I like …' (Tôi thích …).", "t": "Phong thích gà và cơm.", "f": ["Phong thích cá và cơm.", "Mẹ hỏi Phong thích uống gì."]}, {"scene": "Hỏi số lượng sách", "before": ["Teacher: How many books have you got, Nga?"], "gapSpeaker": "Nga", "gapAns": "I have got five books.", "after": ["Teacher: Good. Put them on the desk, please."], "ex": "Câu hỏi 'How many books …?' (Có bao nhiêu quyển sách?) được trả lời bằng số lượng cụ thể.", "t": "Nga có năm quyển sách.", "f": ["Nga có bốn quyển sách.", "Nga không có quyển sách nào."]}, {"scene": "Hỏi thời tiết", "before": ["Father: How is the weather today, Vy?"], "gapSpeaker": "Vy", "gapAns": "It is sunny and warm.", "after": ["Father: Let's go to the park."], "ex": "Bố hỏi thời tiết hôm nay, nên Vy mô tả: 'It is sunny and warm.' (Trời nắng và ấm.)", "t": "Hôm nay trời nắng và ấm.", "f": ["Hôm nay trời mưa và lạnh.", "Bố hỏi hôm nay là thứ mấy."]}, {"scene": "Giới thiệu bạn", "before": ["Lan: Hi, Tom. This is my friend, Sara."], "gapSpeaker": "Tom", "gapAns": "Nice to meet you, Sara.", "after": ["Sara: Nice to meet you too, Tom."], "ex": "Khi được giới thiệu với người mới, ta chào bằng 'Nice to meet you.' (Rất vui được gặp bạn.)", "t": "Lan giới thiệu Sara với Tom.", "f": ["Sara là chị gái của Lan.", "Tom không chào Sara."]}, {"scene": "Xin lỗi và cảm ơn", "before": ["Minh: I am sorry. I am late."], "gapSpeaker": "Teacher", "gapAns": "That's all right. Sit down, please.", "after": ["Minh: Thank you, teacher."], "ex": "Minh xin lỗi vì đến muộn; cô giáo tha thứ và bảo Minh ngồi xuống: 'That's all right.' (Không sao đâu.)", "t": "Minh xin lỗi vì đến muộn.", "f": ["Minh xin lỗi vì quên mang sách.", "Cô giáo không cho Minh vào lớp."]}, {"scene": "Ở sở thú", "before": ["Mai: Look at the elephants, Huy.", "Huy: Wow! What are they doing?"], "gapSpeaker": "Mai", "gapAns": "They are eating grass.", "after": ["Huy: They are very big."], "ex": "Huy hỏi những con voi đang làm gì, nên Mai trả lời bằng hành động: 'They are eating grass.' (Chúng đang ăn cỏ.)", "t": "Những con voi đang ăn cỏ.", "f": ["Những con voi đang ngủ.", "Huy hỏi về những con khỉ."]}, {"scene": "Chào tạm biệt", "before": ["Sara: It is late. I must go home now."], "gapSpeaker": "Tom", "gapAns": "Goodbye, Sara. See you tomorrow.", "after": ["Sara: Goodbye, Tom."], "ex": "Sara phải về nhà, nên Tom chào tạm biệt và hẹn gặp lại ngày mai: 'See you tomorrow.'", "t": "Sara phải về nhà vì đã muộn.", "f": ["Sara ở lại chơi tiếp.", "Tom hẹn gặp Sara vào tuần sau."]}];
  var QA = [{"q": "What's your name?", "a": "My name is Lan."}, {"q": "How old are you?", "a": "I am nine years old."}, {"q": "How are you?", "a": "I am fine, thank you."}, {"q": "Where do you live?", "a": "I live in Hanoi."}, {"q": "What colour is it?", "a": "It is red."}, {"q": "Can you swim?", "a": "Yes, I can."}, {"q": "Do you like apples?", "a": "Yes, I do."}, {"q": "How many books have you got?", "a": "I have got five books."}, {"q": "What's this?", "a": "It is a pencil."}, {"q": "What time is it?", "a": "It is seven o'clock."}, {"q": "Where is your school?", "a": "It is near my house."}, {"q": "What is your favourite food?", "a": "My favourite food is rice."}, {"q": "What day is it today?", "a": "It is Monday."}, {"q": "How many people are in your family?", "a": "There are four people."}, {"q": "Who is your teacher?", "a": "My teacher is Miss Hoa."}, {"q": "Do you have a brother?", "a": "Yes, I have one brother."}, {"q": "What can you do?", "a": "I can sing and dance."}, {"q": "Where is the cat?", "a": "It is under the table."}, {"q": "What is the weather like today?", "a": "It is sunny today."}, {"q": "How do you go to school?", "a": "I go to school by bike."}, {"q": "What is your favourite animal?", "a": "My favourite animal is the dog."}, {"q": "Can I borrow your pen?", "a": "Yes, here you are."}, {"q": "Thank you very much.", "a": "You are welcome."}, {"q": "Do you have a pet?", "a": "Yes, I have a small cat."}];
  var DLG_BLANKS = [{"prompt": "— What's your name?\n— My name ___ Lan.", "a": "is", "w": ["am", "are"], "ex": "Câu 'My name … Lan' cần động từ 'is' vì chủ ngữ 'My name' là số ít; mẫu đúng: 'My name is Lan.'", "vis": ""}, {"prompt": "— How old are you?\n— I ___ nine years old.", "a": "am", "w": ["is", "are"], "ex": "Chủ ngữ 'I' luôn đi với 'am': 'I am nine years old.'", "vis": ""}, {"prompt": "— Where do you live?\n— I live ___ Hanoi.", "a": "in", "w": ["on", "at"], "ex": "Trước tên thành phố lớn như Hanoi dùng giới từ 'in': 'I live in Hanoi.'", "vis": ""}, {"prompt": "— Can you swim?\n— Yes, I ___.", "a": "can", "w": ["can't", "do"], "ex": "Câu hỏi bắt đầu bằng 'Can you …?' thì trả lời ngắn là 'Yes, I can.'", "vis": ""}, {"prompt": "— How many books have you got?\n— I have got ___ books. (Năm quyển sách)", "a": "five", "w": ["book", "a", "the"], "ex": "Câu hỏi 'How many …?' cần một số từ; 'năm' trong tiếng Anh là 'five'.", "vis": ""}, {"prompt": "— What colour is it?\n— It is ___.", "a": "red", "w": ["book", "big", "happy"], "ex": "Câu hỏi hỏi màu sắc nên đáp án phải là một từ chỉ màu; hình tròn cho biết đó là màu đỏ — 'red'.", "vis": "<div style=\"font-size:64px;text-align:center\">🔴</div>"}, {"prompt": "— What's this?\n— It is a ___.", "a": "pencil", "w": ["ruler", "book", "bag"], "ex": "Hình cho thấy một cây bút chì, tiếng Anh là 'pencil'.", "vis": "<div style=\"font-size:64px;text-align:center\">✏️</div>"}, {"prompt": "— Do you like apples?\n— Yes, I ___.", "a": "do", "w": ["does", "can"], "ex": "Câu hỏi 'Do you …?' trả lời ngắn bằng 'Yes, I do.'", "vis": ""}, {"prompt": "— What time is it?\n— It is seven ___.", "a": "o'clock", "w": ["hour", "clock", "time"], "ex": "Cụm cố định chỉ giờ: 'seven o'clock' (bảy giờ).", "vis": ""}, {"prompt": "— How is the weather today?\n— It is ___ and warm. (Trời nắng và ấm)", "a": "sunny", "w": ["rainy", "snowy", "windy"], "ex": "Mô tả tiếng Việt là 'nắng và ấm', từ chỉ trời nắng là 'sunny'.", "vis": ""}, {"prompt": "— Thank you very much.\n— You are ___.", "a": "welcome", "w": ["fine", "sorry", "ready"], "ex": "Cụm cố định đáp lại lời cảm ơn: 'You are welcome.' (Không có gì.)", "vis": ""}, {"prompt": "— Can I borrow your pen?\n— Yes, here you ___.", "a": "are", "w": ["is", "am"], "ex": "Cụm cố định khi đưa đồ cho ai: 'Here you are.'", "vis": ""}];

  function dlgLines(d, gap) {
    var lines = d.before.slice();
    lines.push(d.gapSpeaker + ": " + (gap ? "… … …" : d.gapAns));
    return lines.concat(d.after);
  }
  function fDlgGap() {
    var d = enPick(DLGS);
    var dis = sample(DLGS.filter(function (x) { return x !== d; }), 3).map(function (x) { return x.gapAns; });
    var q = enMCQ("Chọn câu còn thiếu trong hội thoại (" + d.scene + ").", d.gapAns, dis, d.ex,
      { visual: enPassage(dlgLines(d, true).join("<br>")) });
    return enTag(q, "dialogue", "gap-" + d.scene);
  }
  function fDlgMatch() {
    var made = [], usedQ = {}, usedA = {};
    var pool = shuffled(QA);
    for (var i = 0; i < pool.length && made.length < 5; i++) {
      if (usedQ[pool[i].q] || usedA[pool[i].a]) continue;
      usedQ[pool[i].q] = true; usedA[pool[i].a] = true;
      made.push([pool[i].q, pool[i].a]);
    }
    if (made.length < 5) return null;
    var q = enMatch("Nối câu hỏi với câu trả lời đúng nhé!", made,
      "Nhớ các cặp hỏi–đáp quen thuộc: hỏi tên đáp bằng tên, hỏi tuổi đáp bằng số tuổi, hỏi 'Can you…?' đáp 'Yes, I can.'");
    return enTag(q, "dialogue-match", "match-qa");
  }
  function fDlgTF() {
    var d = enPick(DLGS);
    var rounds = enShuffle([
      { stmt: d.t, truth: true, explain: "Đúng — hội thoại cho biết: '" + d.t + "'" },
      { stmt: d.f[0], truth: false, explain: "Sai — điều đúng trong hội thoại là: '" + d.t + "'" },
      { stmt: d.f[1], truth: false, explain: "Sai — điều đúng trong hội thoại là: '" + d.t + "'" }
    ]);
    var q = enTF(rounds, "Hội thoại: " + dlgLines(d, false).join(" — ") + " Đúng hay sai?");
    return enTag(q, "dialogue-tf", "tf-" + d.scene);
  }
  function fDlgBlank() {
    var b = enPick(DLG_BLANKS);
    var q = enBlank("Điền từ còn thiếu để hoàn thành hội thoại: " + b.prompt, b.a, b.w, b.ex, b.vis ? b.vis : null);
    return enTag(q, "dialogue-blank", "blank-dlg");
  }
  var SENT = [["animals", "The cat is sleeping.", "Con mèo đang ngủ."], ["animals", "The dog is running fast.", "Con chó đang chạy nhanh."], ["animals", "The bird can fly.", "Con chim có thể bay."], ["animals", "The fish is swimming.", "Con cá đang bơi."], ["animals", "The duck is in the water.", "Con vịt đang ở trong nước."], ["animals", "The frog can jump high.", "Con ếch có thể nhảy cao."], ["animals", "The monkey is eating a banana.", "Con khỉ đang ăn một quả chuối."], ["animals", "The horse is running.", "Con ngựa đang chạy."], ["animals", "The cow is eating grass.", "Con bò đang ăn cỏ."], ["animals", "The bee is on the flower.", "Con ong đang đậu trên bông hoa."], ["school", "I have a new pencil.", "Tôi có một cây bút chì mới."], ["school", "My book is on the desk.", "Quyển sách của tôi ở trên bàn học."], ["school", "The teacher is in the class.", "Cô giáo đang ở trong lớp."], ["school", "We read books at school.", "Chúng tôi đọc sách ở trường."], ["school", "Lan has got a red bag.", "Lan có một chiếc cặp màu đỏ."], ["school", "I write with a pen.", "Tôi viết bằng bút."], ["school", "There are six chairs.", "Có sáu cái ghế."], ["school", "My school is big.", "Trường của tôi to."], ["school", "We learn English today.", "Hôm nay chúng tôi học tiếng Anh."], ["school", "The clock is on the wall.", "Đồng hồ ở trên tường."], ["home", "I get up at six o'clock.", "Tôi thức dậy lúc sáu giờ."], ["home", "My mother is cooking.", "Mẹ tôi đang nấu ăn."], ["home", "I brush my teeth in the morning.", "Tôi đánh răng vào buổi sáng."], ["home", "My father is reading a book.", "Bố tôi đang đọc sách."], ["home", "The baby is sleeping now.", "Em bé đang ngủ bây giờ."], ["home", "I wash my hands before lunch.", "Tôi rửa tay trước bữa trưa."], ["home", "There is a lamp in my room.", "Có một cái đèn trong phòng của tôi."], ["home", "We eat dinner at home.", "Chúng tôi ăn tối ở nhà."], ["home", "I go to bed at nine o'clock.", "Tôi đi ngủ lúc chín giờ."], ["home", "The dog is under the table.", "Con chó ở dưới bàn."], ["food", "I like apples and bananas.", "Tôi thích táo và chuối."], ["food", "She eats bread for breakfast.", "Cô ấy ăn bánh mì vào bữa sáng."], ["food", "He drinks milk every day.", "Anh ấy uống sữa mỗi ngày."], ["food", "There is an egg on the plate.", "Có một quả trứng trên đĩa."], ["food", "My mother buys oranges.", "Mẹ tôi mua cam."], ["food", "We eat rice and fish.", "Chúng tôi ăn cơm và cá."], ["food", "The cake is sweet.", "Chiếc bánh có vị ngọt."], ["food", "I want some juice, please.", "Cho tôi xin một ít nước ép."], ["food", "Tom likes bananas.", "Tom thích chuối."], ["food", "There are three eggs.", "Có ba quả trứng."], ["colours", "The ball is blue.", "Quả bóng màu xanh dương."], ["colours", "I have two red pens.", "Tôi có hai cây bút màu đỏ."], ["colours", "There are four green trees.", "Có bốn cái cây xanh lá."], ["colours", "Her dress is pink.", "Váy của cô ấy màu hồng."], ["colours", "We see five yellow flowers.", "Chúng tôi thấy năm bông hoa màu vàng."], ["colours", "The car is black.", "Chiếc ô tô màu đen."], ["colours", "He has three white cats.", "Anh ấy có ba con mèo trắng."], ["colours", "My kite is orange.", "Cái diều của tôi màu cam."], ["colours", "There are ten brown chairs.", "Có mười cái ghế màu nâu."], ["colours", "She wears a purple hat.", "Cô ấy đội một cái mũ màu tím."]];
  var NUMS = [["There are three cats in the garden.", "three", "Có ba con mèo trong vườn."], ["I have got five books.", "five", "Tôi có năm quyển sách."], ["She has two brothers.", "two", "Cô ấy có hai anh em trai."], ["There are seven birds in the tree.", "seven", "Có bảy con chim trên cây."], ["We have four chairs in the room.", "four", "Chúng tôi có bốn cái ghế trong phòng."], ["He eats two eggs for breakfast.", "two", "Anh ấy ăn hai quả trứng vào bữa sáng."], ["My sister is nine years old.", "nine", "Chị em gái của tôi chín tuổi."], ["There are six pens in my bag.", "six", "Có sáu cây bút trong cặp của tôi."], ["I see eight ducks in the water.", "eight", "Tôi thấy tám con vịt trong nước."], ["Tom has ten crayons.", "ten", "Tom có mười cây bút sáp."], ["Mother buys five apples.", "five", "Mẹ mua năm quả táo."], ["There is one dog in the house.", "one", "Có một con chó trong nhà."], ["We read four books this week.", "four", "Tuần này chúng tôi đọc bốn quyển sách."], ["We have three lessons today.", "three", "Hôm nay chúng tôi có ba tiết học."]];
  var NUMWORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  var LDLG = [["Lan: What is your name? Tom: My name is Tom.", "What is the boy's name?", "Tom", ["Lan", "Ben", "Nam"], "Cậu bé nói 'My name is Tom.' nên tên cậu bé là Tom."], ["Mai: How old are you, Ben? Ben: I am eight years old.", "How old is Ben?", "eight years old", ["nine years old", "seven years old", "ten years old"], "Ben nói 'I am eight years old.' — Ben tám tuổi."], ["Anna: What colour is your bag, Sue? Sue: It is blue.", "What colour is Sue's bag?", "blue", ["red", "green", "black"], "Sue nói cặp 'It is blue.' — cặp màu xanh dương."], ["Tom: Do you have a pet, Lan? Lan: Yes, I have a cat.", "What pet does Lan have?", "a cat", ["a dog", "a bird", "a fish"], "Lan nói 'I have a cat.' — Lan nuôi một con mèo."], ["Mother: Do you like apples, Phong? Phong: Yes, I do.", "Does Phong like apples?", "Yes, he does.", ["No, he doesn't.", "Yes, she does.", "He likes bananas."], "Phong trả lời 'Yes, I do.' — Phong thích táo, và Phong là con trai nên đáp án là 'Yes, he does.'"], ["Ben: Can you swim, Amy? Amy: No, I can't.", "Can Amy swim?", "No, she can't.", ["Yes, she can.", "Yes, he can.", "No, he can't."], "Amy trả lời 'No, I can't.' — Amy không biết bơi."], ["Teacher: How many books have you got, Nga? Nga: I have got six books.", "How many books has Nga got?", "six books", ["five books", "four books", "seven books"], "Nga nói 'I have got six books.' — Nga có sáu quyển sách."], ["Father: How is the weather today, Vy? Vy: It is rainy.", "How is the weather today?", "rainy", ["sunny", "windy", "snowy"], "Vy nói 'It is rainy.' — hôm nay trời mưa."], ["Lan: How do you go to school, Nam? Nam: I go by bike.", "How does Nam go to school?", "by bike", ["by bus", "by car", "on foot"], "Nam nói 'I go by bike.' — Nam đi học bằng xe đạp."], ["Tom: What is your favourite animal, Sara? Sara: I like elephants.", "What animal does Sara like?", "elephants", ["monkeys", "tigers", "birds"], "Sara nói 'I like elephants.' — Sara thích voi."], ["Mother: What time is it, Minh? Minh: It is seven o'clock.", "What time is it?", "seven o'clock", ["six o'clock", "eight o'clock", "nine o'clock"], "Minh nói 'It is seven o'clock.' — bây giờ là bảy giờ."], ["Hoa: Where is the cat, Long? Long: It is under the chair.", "Where is the cat?", "under the chair", ["on the chair", "in the box", "under the table"], "Long nói con mèo 'under the chair' — ở dưới cái ghế."], ["Ben: When is your birthday, Kim? Kim: It is on Sunday.", "When is Kim's birthday?", "on Sunday", ["on Monday", "on Saturday", "today"], "Kim nói sinh nhật 'on Sunday' — vào Chủ nhật."], ["Nam: Can you play football, Peter? Peter: Yes, I can.", "What can Peter do?", "play football", ["swim", "sing a song", "draw a picture"], "Peter trả lời 'Yes, I can.' cho câu hỏi về đá bóng — Peter biết đá bóng."], ["Mother: Are you thirsty, An? An: Yes. I want some water.", "What does An want?", "some water", ["some milk", "some juice", "a cake"], "An nói 'I want some water.' — An muốn uống nước."], ["Lan: Who is your English teacher, Huy? Huy: Miss Hoa is my English teacher.", "Who is Huy's English teacher?", "Miss Hoa", ["Mr Nam", "Miss Lan", "Mrs Mai"], "Huy nói giáo viên tiếng Anh của mình là Miss Hoa."]];
  var WORDPIC = [["cat", "con mèo", "🐱"], ["dog", "con chó", "🐶"], ["bird", "con chim", "🐦"], ["fish", "con cá", "🐟"], ["duck", "con vịt", "🦆"], ["cow", "con bò", "🐄"], ["pig", "con lợn", "🐷"], ["horse", "con ngựa", "🐴"], ["frog", "con ếch", "🐸"], ["bee", "con ong", "🐝"], ["apple", "quả táo", "🍎"], ["banana", "quả chuối", "🍌"], ["orange", "quả cam", "🍊"], ["egg", "quả trứng", "🥚"], ["milk", "sữa", "🥛"], ["bread", "bánh mì", "🍞"], ["cake", "bánh ngọt", "🍰"], ["rice", "cơm", "🍚"], ["book", "quyển sách", "📖"], ["pen", "cái bút", "🖊️"], ["pencil", "bút chì", "✏️"], ["bag", "cặp sách", "🎒"], ["chair", "cái ghế", "🪑"], ["clock", "đồng hồ", "🕐"], ["bed", "cái giường", "🛏️"], ["door", "cái cửa", "🚪"], ["lamp", "cái đèn", "💡"], ["key", "chìa khoá", "🔑"], ["phone", "điện thoại", "📱"], ["sun", "mặt trời", "☀️"], ["rain", "mưa", "🌧️"], ["cloud", "mây", "☁️"], ["tree", "cái cây", "🌳"], ["flower", "hoa", "🌸"], ["ball", "quả bóng", "⚽"], ["car", "ô tô", "🚗"], ["doll", "búp bê", "🪆"], ["kite", "cái diều", "🪁"], ["train", "tàu hoả", "🚂"]];

  function fListenA() {
    var groups = ["animals", "school", "home", "food", "colours"];
    var g = enPick(groups);
    var pool = SENT.filter(function (x) { return x[0] === g; });
    var s = enPick(pool);
    var dis = sample(pool.filter(function (x) { return x[1] !== s[1]; }), 3).map(function (x) { return x[1]; });
    var q = enMCQ("Nghe câu rồi chọn câu em vừa nghe.", s[1], dis,
      "Câu em vừa nghe là '" + s[1] + "', nghĩa là '" + s[2] + "'.",
      { visual: enListenVisual(s[1]) });
    enId(q, s[1]);
    return enTag(q, "listen", "sentence-" + g);
  }
  function fListenCount() {
    var n = enPick(NUMS);
    var dis = sample(NUMWORDS.filter(function (x) { return x !== n[1]; }), 3);
    var q = enMCQ("Nghe câu rồi chọn số đúng.", n[1], dis,
      "Câu em vừa nghe là '" + n[0] + "' — '" + n[2] + "', nên số đúng là '" + n[1] + "'.",
      { visual: enListenVisual(n[0]) });
    enId(q, n[0]);
    return enTag(q, "listen", "count");
  }
  function fListenPic() {
    var w = enPick(WORDPIC);
    var dis = sample(WORDPIC.filter(function (x) { return x[0] !== w[0]; }), 3).map(function (x) { return x[2]; });
    var q = enMCQ("Nghe từ rồi chọn hình đúng.", w[2], dis,
      "Từ em vừa nghe là '" + w[0] + "', nghĩa là '" + w[1] + "', hình đúng là " + w[2] + ".",
      { visual: enListenVisual(w[0]) });
    enId(q, "word:" + w[0]);
    return enTag(q, "listen", "pic-word");
  }
  function fListenDlg() {
    var d = enPick(LDLG);
    var q = enMCQ("Nghe hội thoại rồi trả lời: " + d[1], d[2], d[3], d[4],
      { visual: enListenVisual(d[0]) });
    enId(q, d[0]);
    return enTag(q, "listen", "dialogue-listen");
  }
  function fListenBlank() {
    var n = enPick(NUMS);
    var dis = sample(NUMWORDS.filter(function (x) { return x !== n[1]; }), 3);
    var q = enBlank("Nghe câu rồi điền số từ đúng.", n[1], dis,
      "Câu em vừa nghe là '" + n[0] + "' — '" + n[2] + "', nên số từ đúng là '" + n[1] + "'.",
      enListenVisual(n[0]));
    enId(q, n[0]);
    return enTag(q, "listen-blank", "blank-count");
  }
  function fListenMatch() {
    var ws = sample(WORDPIC, 5);
    var pairs = ws.map(function (x) { return [x[0], x[2]]; });
    var q = enMatch("Nối từ với hình đúng nhé!", pairs,
      "Đọc từng từ rồi nhớ hình của nó: " + ws.map(function (x) { return x[0] + " " + x[2]; }).join("; ") + ".");
    return enTag(q, "listen-match", "match-wordpic");
  }
  function fListenTF() {
    var pat = enPick([[true, false, true], [false, true, false], [true, true, false], [false, false, true], [true, false, false], [false, true, true]]);
    var ws = sample(WORDPIC, 3);
    var rounds = ws.map(function (w, i) {
      if (pat[i]) return { stmt: w[2] + " Từ “" + w[0] + "” nghĩa là “" + w[1] + "”.", truth: true, explain: "Đúng: '" + w[0] + "' nghĩa là '" + w[1] + "' " + w[2] + "." };
      var other = enPick(WORDPIC.filter(function (x) { return x[1] !== w[1]; }));
      return { stmt: w[2] + " Từ “" + w[0] + "” nghĩa là “" + other[1] + "”.", truth: false, explain: "Sai: '" + w[0] + "' nghĩa là '" + w[1] + "', còn '" + other[1] + "' là '" + other[0] + "'." };
    });
    var q = enTF(rounds, "Đúng hay sai? Nhìn hình và đọc nghĩa của từ nhé!");
    return enTag(q, "listen-tf", "tf-wordpic");
  }

  var topics = [
    { id: "cd-en-th-vocab", emoji: "📚", name: "Từ vựng theo chủ đề", sub: "Từ vựng Cambridge: nhà, trường, thú, đồ ăn…",
      pools: { choose: [fPicWord, fViEn, fEnVi, fOdd], blank: [fBlankWord], match: [fMatchWord], games: [fTFWord] },
      knowledge: { notes: ["Học từ theo nhóm chủ đề (động vật, đồ ăn, màu sắc…) sẽ dễ nhớ hơn học rời từng từ.", "Nghe phát âm của từ rồi đọc lại thành tiếng vài lần.", "Chú ý: 'orange' vừa là quả cam vừa là màu cam — dựa vào hình và câu để hiểu đúng.", "Với câu 'từ khác nhóm': tìm điểm chung của ba từ trước, từ còn lại không có điểm chung đó là đáp án."],
        facts: [{ q: "Từ 'cat' nghĩa là gì?", a: "con mèo", ex: "'cat' là con mèo 🐱." }, { q: "'Quả táo' trong tiếng Anh là từ nào?", a: "apple", ex: "'apple' nghĩa là quả táo 🍎." }],
        pairs: [["cat", "con mèo"], ["apple", "quả táo"], ["book", "quyển sách"], ["red", "màu đỏ"], ["mother", "mẹ"]] } },
    { id: "cd-en-th-grammar", emoji: "✏️", name: "Ngữ pháp trong câu ngắn", sub: "be, have got, can, giới từ, there is/are…",
      pools: { choose: [fBe, fHave, fPS, fCan, fPrep, fThere, fPlural], blank: [fGrammarBlank], match: [fMatchGrammar], games: [fTFGrammar] },
      knowledge: { notes: ["Động từ 'be': I – am; he/she/it – is; you/we/they – are.", "'have got' dùng với I/you/we/they; 'has got' dùng với he/she/it.", "Hiện tại đơn: chủ ngữ ngôi thứ ba số ít (he/she/it, một người, một vật) thì động từ thêm -s hoặc -es.", "Sau 'can' và 'can't' luôn dùng động từ nguyên thể.", "Số nhiều bất quy tắc cần học thuộc: child–children, foot–feet, tooth–teeth, man–men, fish–fish."],
        facts: [{ q: "He ___ to school. Điền dạng đúng của 'go'.", a: "goes", ex: "'He' là ngôi thứ ba số ít nên 'go' thêm -es thành 'goes'." }, { q: "They ___ a big ball. Điền 'have got' hay 'has got'?", a: "have got", ex: "'They' là số nhiều nên dùng 'have got'." }],
        pairs: [["I", "am"], ["he / she / it", "is"], ["you / we / they", "are"], ["one book (There …)", "is"], ["two books (There …)", "are"]] } },
    { id: "cd-en-th-read", emoji: "📖", name: "Đọc hiểu đoạn ngắn", sub: "Đoạn văn 3–5 câu và câu hỏi (Starters–Flyers)",
      pools: { choose: [fReadDetail, fReadTrue, fReadWord, fReadTitle], blank: [fReadBlank], match: [fReadMatch], games: [fReadTF] },
      knowledge: { notes: ["Đọc hết đoạn văn một lần để nắm ý chung trước khi trả lời.", "Tìm trong đoạn câu chứa từ khoá của câu hỏi — đáp án thường nằm ngay trong câu đó.", "Câu hỏi về tựa đề: chọn tựa đề bao quát cả đoạn, không chỉ một chi tiết nhỏ.", "Với câu Đúng/Sai, đối chiếu từng mệnh đề với đoạn văn: sai một chi tiết là sai cả câu."],
        facts: [{ q: "Đoạn 'Miu is my cat…' cho biết Miu là con gì?", a: "con mèo (a cat)", ex: "Câu đầu tiên của đoạn viết 'Miu is my cat.'" }, { q: "Từ 'small' trong đoạn về Miu nghĩa là gì?", a: "nhỏ", ex: "'small' nghĩa là nhỏ; đoạn viết 'She is small and white.'" }],
        pairs: [["What", "hỏi sự vật / điều gì"], ["Where", "hỏi nơi chốn"], ["When", "hỏi thời gian"], ["How many", "hỏi số lượng"], ["Who", "hỏi người"]] } },
    { id: "cd-en-th-dialogue", emoji: "💬", name: "Hoàn thành hội thoại", sub: "Chào hỏi, mua đồ, hỏi đường đơn giản",
      pools: { choose: [fDlgGap], blank: [fDlgBlank], match: [fDlgMatch], games: [fDlgTF] },
      knowledge: { notes: ["Đọc cả hội thoại (câu trước và câu sau chỗ trống) để đoán câu còn thiếu.", "Câu hỏi 'How many …?' trả lời bằng số lượng; 'Where …?' trả lời bằng nơi chốn.", "Trả lời ngắn cho câu hỏi 'Can you …?' là 'Yes, I can.' hoặc 'No, I can't.'", "Học thuộc các cặp hỏi–đáp quen thuộc: What's your name? – My name is …"],
        facts: [{ q: "Câu hỏi 'What's your name?' trả lời thế nào?", a: "My name is Lan.", ex: "Mẫu trả lời tên: 'My name is …' (Tên tôi là …)." }, { q: "Bạn 9 tuổi thì trả lời 'How old are you?' thế nào?", a: "I am nine years old.", ex: "Mẫu: 'I am + số tuổi + years old.'" }],
        pairs: [["What's your name?", "My name is Lan."], ["How old are you?", "I am nine years old."], ["Can you swim?", "Yes, I can."], ["What's this?", "It is a pencil."], ["Thank you very much.", "You are welcome."]] } },
    { id: "cd-en-th-listen", emoji: "🎧", name: "Nghe và chọn", sub: "Nghe câu ngắn và hội thoại nhỏ",
      pools: { choose: [fListenA, fListenCount, fListenPic, fListenDlg], blank: [fListenBlank], match: [fListenMatch], games: [fListenTF] },
      knowledge: { notes: ["Nghe hết câu một lần để nắm ý, nghe lại lần hai để kiểm tra chi tiết (số, màu, con vật…).", "Nếu máy không có giọng đọc, bấm nút '👁 Hiện chữ' để đọc nội dung câu nghe.", "Chú ý các số từ one, two, three… và các từ chỉ màu trong câu.", "Nghe hội thoại: xác định ai đang nói và câu hỏi đang hỏi về ai."],
        facts: [{ q: "Nghe: 'The cat is sleeping.' Con vật nào đang ngủ?", a: "con mèo", ex: "'The cat' là con mèo; câu nói con mèo đang ngủ." }, { q: "Nghe: 'I have got five books.' Có mấy quyển sách?", a: "five (năm)", ex: "Số từ trong câu là 'five' — năm quyển sách." }],
        pairs: [["one", "1"], ["two", "2"], ["three", "3"], ["four", "4"], ["five", "5"]] } }
  ];
  window.__EN_BANDS.push({ id: "th", name: "Tiếng Anh Tiểu học — Cambridge (Starters • Movers • Flyers)", grades: [1, 2, 3, 4, 5], topics: topics });
})();
/* ================================================================
   DẢI THCS — "Tiếng Anh THCS — KET • PET" (grades 6–9)
   File dải cho assets/data/tienganh.js: chỉ dùng các hàm en* của
   core-head + Math.random; nội dung tiếng Anh viết mới 100%.
   ================================================================ */
(function () {
  "use strict";

  /* ---------- helpers nội bộ (không phải en*) ---------- */
  function others(arr, item, n) {
    var pool = arr.filter(function (x) { return x !== item; });
    return enShuffle(pool).slice(0, n);
  }
  function makeTF(items, promptText) {
    var trues = items.filter(function (x) { return x.truth; });
    var falses = items.filter(function (x) { return !x.truth; });
    if (trues.length < 1 || falses.length < 2) return null;
    var nt = enRand(1, 2);
    var rounds = enShuffle(trues).slice(0, nt).concat(enShuffle(falses).slice(0, 3 - nt));
    rounds = enShuffle(rounds).map(function (x) {
      return { stmt: x.stmt, truth: x.truth, explain: x.explain || x.ex || "" };
    });
    return enTF(rounds, promptText);
  }

  /* ================================================================
     (1) TỪ VỰNG — 8 chủ đề × 10 từ {w, vi, sent}
     ================================================================ */
  var VOCAB_THEMES = [
    { id: "travel", vi: "du lịch", words: [
      ["journey", "hành trình", "The long ___ took ten hours."],
      ["ticket", "vé", "Buy a ___ before the train leaves."],
      ["passenger", "hành khách", "Each ___ must wear a seat belt."],
      ["trip", "chuyến đi", "Our school ___ is tomorrow."],
      ["hotel", "khách sạn", "We stayed in a small ___ near the beach."],
      ["map", "bản đồ", "Use a ___ to find the road."],
      ["beach", "bãi biển", "Children play on the ___ in summer."],
      ["mountain", "ngọn núi", "Snow covers the ___ top in winter."],
      ["guide", "hướng dẫn viên", "The ___ showed us the old town."],
      ["travel", "đi du lịch", "I love to ___ to new places in summer."]
    ]},
    { id: "health", vi: "sức khoẻ", words: [
      ["doctor", "bác sĩ", "The ___ checks sick people."],
      ["nurse", "y tá", "The ___ helps the doctor in the hospital."],
      ["medicine", "thuốc", "Take this ___ after lunch."],
      ["exercise", "việc tập thể dục", "Daily ___ keeps you strong."],
      ["healthy", "khoẻ mạnh", "Eat vegetables to stay ___."],
      ["sick", "ốm, bệnh", "He feels ___ and stays in bed."],
      ["toothache", "đau răng", "I have a ___ and need a dentist."],
      ["hospital", "bệnh viện", "The ambulance took her to the ___."],
      ["rest", "sự nghỉ ngơi", "You need some ___ after hard work."],
      ["sleep", "giấc ngủ", "Children need enough ___ at night."]
    ]},
    { id: "technology", vi: "công nghệ", words: [
      ["computer", "máy tính", "I do my homework on the ___."],
      ["phone", "điện thoại", "Please call me on my ___ tonight."],
      ["email", "thư điện tử", "Send an ___ to your teacher."],
      ["website", "trang web", "Visit our school ___ for news."],
      ["camera", "máy ảnh", "Take a photo with this ___."],
      ["robot", "người máy", "The ___ can carry heavy boxes."],
      ["screen", "màn hình", "Do not touch the ___ of the TV."],
      ["keyboard", "bàn phím", "Type your name on the ___."],
      ["internet", "mạng internet", "We learn online via the ___."],
      ["app", "ứng dụng", "This ___ helps you learn new words."]
    ]},
    { id: "environment", vi: "môi trường", words: [
      ["tree", "cây", "We plant a ___ in the school yard."],
      ["river", "con sông", "The ___ flows through the village."],
      ["recycle", "tái chế", "We ___ old paper and bottles."],
      ["plastic", "nhựa", "Do not throw ___ bags in the sea."],
      ["nature", "thiên nhiên", "We must protect ___ around us."],
      ["forest", "khu rừng", "Many wild animals live in the ___."],
      ["rain", "mưa", "The ___ makes the grass green."],
      ["garden", "khu vườn", "Flowers grow in the ___ behind the house."],
      ["clean", "sạch", "Please keep your classroom ___."],
      ["energy", "năng lượng", "Turn off the lights to save ___."]
    ]},
    { id: "school", vi: "trường học & công việc", words: [
      ["teacher", "giáo viên", "Our ___ is very kind to us."],
      ["lesson", "bài học", "The English ___ starts at eight."],
      ["homework", "bài tập về nhà", "Finish your ___ before dinner tonight."],
      ["exam", "kỳ thi", "The maths ___ is on Friday."],
      ["library", "thư viện", "You can borrow books from the ___."],
      ["office", "văn phòng", "My dad works in an ___ in town."],
      ["job", "công việc, nghề", "Teaching is a hard but happy ___."],
      ["meeting", "cuộc họp", "We have a class ___ at nine."],
      ["question", "câu hỏi", "Ask a ___ if you are not sure."],
      ["answer", "câu trả lời", "Write the ___ in your notebook."]
    ]},
    { id: "shopping", vi: "mua sắm & tiền", words: [
      ["shop", "cửa hàng", "This ___ sells fresh bread."],
      ["money", "tiền", "Save your ___ to buy a book."],
      ["price", "giá cả", "The ___ of this bag is quite high."],
      ["cheap", "rẻ", "This shirt is ___ but very nice."],
      ["expensive", "đắt", "That watch is too ___ for me."],
      ["buy", "mua", "I want to ___ a new pen."],
      ["sell", "bán", "They ___ fruit at the market."],
      ["market", "chợ", "The ___ is very busy on Sunday."],
      ["wallet", "ví tiền", "He keeps his cards in his ___."],
      ["cost", "có giá, tốn", "How much does this bike ___?"]
    ]},
    { id: "food", vi: "ăn uống & nấu ăn", words: [
      ["breakfast", "bữa sáng", "I eat ___ at seven every morning."],
      ["lunch", "bữa trưa", "We have ___ at school at noon."],
      ["dinner", "bữa tối", "My family eats ___ together at home."],
      ["rice", "cơm, gạo", "We eat ___ with fish and vegetables."],
      ["bread", "bánh mì", "She buys fresh ___ every morning."],
      ["soup", "món súp, canh", "This hot ___ is good on cold days."],
      ["fruit", "trái cây", "Eat ___ every day to stay healthy."],
      ["vegetable", "rau củ", "Carrots are my favourite ___."],
      ["cook", "nấu ăn", "My mum can ___ very well."],
      ["hungry", "đói", "I am ___ after playing football."]
    ]},
    { id: "freetime", vi: "thời gian rảnh", words: [
      ["music", "âm nhạc", "I listen to ___ every evening."],
      ["film", "bộ phim", "We watched a funny ___ last night."],
      ["book", "cuốn sách", "She is reading an interesting ___ now."],
      ["game", "trò chơi", "Let's play a ___ together after school."],
      ["football", "bóng đá", "They play ___ in the park after school."],
      ["swimming", "bơi lội", "___ is my favourite sport in summer."],
      ["dancing", "khiêu vũ, nhảy múa", "___ is fun and good for health."],
      ["painting", "hội hoạ, vẽ tranh", "___ is a quiet and lovely hobby."],
      ["friend", "người bạn", "My best ___ lives near my house."],
      ["weekend", "cuối tuần", "We visit grandma at the ___."]
    ]}
  ];
  function allVocab() {
    var out = [];
    VOCAB_THEMES.forEach(function (t) {
      t.words.forEach(function (w) { out.push({ theme: t, w: w[0], vi: w[1], sent: w[2] }); });
    });
    return out;
  }

  var COLLOC = [
    { s: "I ___ my homework after dinner.", ans: "do", wrong: ["make", "take", "play"], ex: "Cụm đúng là 'do homework' (làm bài tập về nhà)." },
    { s: "We must ___ a decision today.", ans: "make", wrong: ["do", "get", "play"], ex: "Cụm đúng là 'make a decision' (đưa ra quyết định)." },
    { s: "Please ___ a photo of our class.", ans: "take", wrong: ["do", "make", "play"], ex: "Cụm đúng là 'take a photo' (chụp ảnh)." },
    { s: "Run fast or we cannot ___ the bus.", ans: "catch", wrong: ["do", "make", "play"], ex: "Cụm đúng là 'catch a bus' (bắt kịp xe buýt)." },
    { s: "I ___ my bike to school every day.", ans: "ride", wrong: ["drive", "do", "make"], ex: "Cụm đúng là 'ride a bike' (đi xe đạp); 'drive' dùng cho ô tô." },
    { s: "She can ___ the guitar very well.", ans: "play", wrong: ["do", "make", "take"], ex: "Cụm đúng là 'play the guitar' (chơi đàn ghi-ta)." },
    { s: "Let's ___ a film at home tonight.", ans: "watch", wrong: ["listen", "read", "do"], ex: "Cụm đúng là 'watch a film' (xem phim)." },
    { s: "I ___ to music every evening.", ans: "listen", wrong: ["watch", "read", "do"], ex: "Cụm đúng là 'listen to music' (nghe nhạc) — luôn có 'to' sau listen." },
    { s: "He likes to ___ coffee in the morning.", ans: "drink", wrong: ["eat", "read", "watch"], ex: "Cụm đúng là 'drink coffee' (uống cà phê)." },
    { s: "Can you ___ a map to find the way?", ans: "read", wrong: ["listen", "do", "make"], ex: "Cụm đúng là 'read a map' (đọc bản đồ)." },
    { s: "Please ___ an email to your teacher.", ans: "send", wrong: ["do", "make", "play"], ex: "Cụm đúng là 'send an email' (gửi thư điện tử)." },
    { s: "Students ___ a computer in this room.", ans: "use", wrong: ["play", "read", "drink"], ex: "Cụm đúng là 'use a computer' (sử dụng máy tính)." },
    { s: "Don't spend it all; ___ some money.", ans: "save", wrong: ["eat", "read", "sing"], ex: "Cụm đúng là 'save money' (tiết kiệm tiền)." },
    { s: "I love to ___ time with my family.", ans: "spend", wrong: ["save", "eat", "read"], ex: "Cụm đúng là 'spend time with…' (dành thời gian với…)." },
    { s: "Daily exercise helps you ___ fit.", ans: "keep", wrong: ["do", "make", "play"], ex: "Cụm đúng là 'keep fit' (giữ dáng, giữ sức khoẻ)." },
    { s: "Don't get wet or you may ___ sick.", ans: "get", wrong: ["do", "make", "play"], ex: "Cụm đúng là 'get sick' (bị ốm)." },
    { s: "We ___ trees in the park in spring.", ans: "plant", wrong: ["do", "make", "read"], ex: "Cụm đúng là 'plant trees' (trồng cây)." },
    { s: "We must ___ nature for our children.", ans: "protect", wrong: ["do", "make", "plant"], ex: "Cụm đúng là 'protect nature' (bảo vệ thiên nhiên)." },
    { s: "Students ___ the beach on Sunday morning.", ans: "clean", wrong: ["do", "make", "play"], ex: "Cụm đúng là 'clean the beach' (dọn sạch bãi biển)." },
    { s: "Please ___ off the lights before you leave.", ans: "turn", wrong: ["do", "make", "take"], ex: "Cụm đúng là 'turn off the lights' (tắt đèn)." },
    { s: "I ___ breakfast at six every morning.", ans: "have", wrong: ["do", "play", "read"], ex: "Cụm đúng là 'have breakfast' (ăn sáng)." },
    { s: "You should ___ your teeth twice a day.", ans: "brush", wrong: ["do", "make", "play"], ex: "Cụm đúng là 'brush your teeth' (đánh răng)." },
    { s: "Students in my school ___ a uniform.", ans: "wear", wrong: ["do", "make", "dress"], ex: "Cụm đúng là 'wear a uniform' (mặc đồng phục)." },
    { s: "Always ___ the truth to your parents.", ans: "tell", wrong: ["say", "do", "make"], ex: "Cụm đúng là 'tell the truth' (nói thật); không dùng 'say the truth'." }
  ];

  var VOCAB_TF = [
    { stmt: "\"A ticket is used to travel by bus or train.\"", truth: true, ex: "'Ticket' là vé — dùng để đi xe buýt hoặc tàu." },
    { stmt: "\"A doctor works in a hospital.\"", truth: true, ex: "Đúng: bác sĩ (doctor) làm việc ở bệnh viện (hospital)." },
    { stmt: "\"Recycle means using old things again.\"", truth: true, ex: "Đúng: 'recycle' là tái chế, dùng lại đồ cũ." },
    { stmt: "\"A wallet is used to keep money.\"", truth: true, ex: "Đúng: 'wallet' là ví tiền, dùng để đựng tiền." },
    { stmt: "\"Hungry means you want to eat.\"", truth: true, ex: "Đúng: 'hungry' nghĩa là đói, muốn ăn." },
    { stmt: "\"A keyboard is part of a computer.\"", truth: true, ex: "Đúng: 'keyboard' là bàn phím của máy tính." },
    { stmt: "\"A beach is a sandy place by the sea.\"", truth: true, ex: "Đúng: 'beach' là bãi biển cát ở cạnh biển." },
    { stmt: "\"Healthy food is good for your body.\"", truth: true, ex: "Đúng: 'healthy' là khoẻ mạnh, tốt cho cơ thể." },
    { stmt: "\"A library is a place to borrow books.\"", truth: true, ex: "Đúng: 'library' là thư viện, nơi mượn sách." },
    { stmt: "\"A mountain is a place to swim.\"", truth: false, ex: "Sai: 'mountain' là ngọn núi; nơi bơi là 'swimming pool' hoặc biển." },
    { stmt: "\"Medicine is a kind of food for parties.\"", truth: false, ex: "Sai: 'medicine' là thuốc để chữa bệnh, không phải đồ ăn tiệc." },
    { stmt: "\"A map is used to take photos.\"", truth: false, ex: "Sai: vật dùng chụp ảnh là 'camera'; 'map' là bản đồ." },
    { stmt: "\"Expensive means very cheap.\"", truth: false, ex: "Sai: 'expensive' là đắt; 'cheap' mới là rẻ." },
    { stmt: "\"A forest is a small room in a house.\"", truth: false, ex: "Sai: 'forest' là khu rừng lớn, không phải căn phòng." },
    { stmt: "\"Sleep is a sport at school.\"", truth: false, ex: "Sai: 'sleep' là giấc ngủ, không phải môn thể thao." },
    { stmt: "\"A ticket is something you eat.\"", truth: false, ex: "Sai: 'ticket' là vé để đi lại/xem phim, không ăn được." },
    { stmt: "\"Plastic trees grow in every garden.\"", truth: false, ex: "Sai: 'plastic' là nhựa (do con người làm ra); cây trong vườn là cây thật." },
    { stmt: "\"A nurse teaches English in class.\"", truth: false, ex: "Sai: người dạy học là 'teacher'; 'nurse' là y tá trong bệnh viện." }
  ];

  function fVocabDef() {
    var t = enPick(VOCAB_THEMES), it = enPick(t.words.map(function (w, i) { return i; }));
    var w = t.words[it];
    var wrong = others(t.words, w, 3).map(function (x) { return x[1]; });
    var q = enMCQ("Từ \"" + w[0] + "\" nghĩa là gì?", w[1], wrong,
      "\"" + w[0] + "\" nghĩa là \"" + w[1] + "\" (chủ đề " + t.vi + ").", {});
    return enTag(q, "fVocabDef", t.id);
  }
  function fVocabWord() {
    var t = enPick(VOCAB_THEMES), it = enPick(t.words.map(function (w, i) { return i; }));
    var w = t.words[it];
    var wrong = others(t.words, w, 3).map(function (x) { return x[0]; });
    var q = enMCQ("Nghĩa \"" + w[1] + "\" trong tiếng Anh là từ nào?", w[0], wrong,
      "\"" + w[1] + "\" trong tiếng Anh là \"" + w[0] + "\" (chủ đề " + t.vi + ").", {});
    return enTag(q, "fVocabWord", t.id);
  }
  function fVocabGap() {
    var t = enPick(VOCAB_THEMES), it = enPick(t.words.map(function (w, i) { return i; }));
    var w = t.words[it];
    var wrong = others(t.words, w, 3).map(function (x) { return x[0]; });
    var q = enBlank("Điền từ đúng vào chỗ trống: \"" + w[2] + "\"", w[0], wrong,
      "Đáp án đúng là \"" + w[0] + "\" (" + w[1] + ") — từ hợp với câu và thuộc chủ đề " + t.vi + ".");
    return enTag(q, "fVocabGap", t.id);
  }
  function fVocabColloc() {
    var it = enPick(COLLOC);
    var q = enMCQ("Chọn từ đúng để tạo cụm từ cố định: \"" + it.s + "\"", it.ans, it.wrong, it.ex, {});
    return enTag(q, "fVocabColloc", it.ans);
  }
  function fVocabOdd() {
    var t = enPick(VOCAB_THEMES);
    var other = enPick(VOCAB_THEMES.filter(function (x) { return x !== t; }));
    var three = enShuffle(t.words).slice(0, 3);
    var odd = enPick(other.words);
    var words = three.map(function (x) { return x[0]; });
    var q = enMCQ("Trong bốn từ ở các lựa chọn, từ nào KHÁC nhóm với ba từ còn lại?", odd[0],
      words,
      "\"" + odd[0] + "\" (" + odd[1] + ") thuộc chủ đề " + other.vi + "; ba từ còn lại thuộc chủ đề " + t.vi + ".", {});
    return enTag(q, "fVocabOdd", other.id);
  }
  function fMatchVocab() {
    var t = enPick(VOCAB_THEMES);
    var five = enShuffle(t.words).slice(0, 5);
    var pairs = five.map(function (x) { return [x[0], x[1]]; });
    var q = enMatch("Nối từ với nghĩa tiếng Việt (chủ đề " + t.vi + "):", pairs,
      "Năm từ đều thuộc chủ đề " + t.vi + ": " + five.map(function (x) { return x[0] + " = " + x[1]; }).join("; ") + ".");
    return enTag(q, "fMatchVocab", t.id);
  }
  function fTFVocab() {
    var q = makeTF(VOCAB_TF, "Đúng hay sai về nghĩa của từ? Chạm nhanh nhé!");
    return enTag(q, "fTFVocab", "def");
  }

  var topicVocab = {
    id: "cd-en-thcs-vocab", emoji: "🧳", name: "Từ vựng & cụm từ theo chủ đề",
    sub: "Du lịch, sức khoẻ, công nghệ, môi trường…",
    pools: {
      choose: [fVocabDef, fVocabWord, fVocabColloc, fVocabOdd],
      blank: [fVocabGap],
      match: [fMatchVocab],
      games: [fTFVocab]
    },
    knowledge: {
      notes: [
        "Học từ theo CHỦ ĐỀ và học cả CỤM từ (do homework, take a photo) — đề KET/PET rất hay hỏi cụm cố định.",
        "Mỗi từ học kèm một câu ví dụ ngắn: nhớ câu là nhớ được cách dùng từ trong ngữ cảnh.",
        "Cẩn thận các cặp dễ nhầm: cheap ↔ expensive, listen to (có 'to'), say ↔ tell (tell the truth).",
        "Khi gặp từ mới trong bài đọc, đoán nghĩa qua câu xung quanh trước khi tra từ điển."
      ],
      facts: [
        { q: "Từ \"journey\" nghĩa là gì?", a: "hành trình", ex: "\"Journey\" là hành trình, chuyến đi dài. Ví dụ: The journey took ten hours." },
        { q: "Cụm \"do homework\" nghĩa là gì?", a: "làm bài tập về nhà", ex: "\"Do\" đi với homework; không nói \"make homework\" trong tiếng Anh chuẩn." }
      ],
      pairs: [["journey", "hành trình"], ["passenger", "hành khách"], ["healthy", "khoẻ mạnh"], ["recycle", "tái chế"], ["wallet", "ví tiền"], ["take a photo", "chụp ảnh"]]
    }
  };

  /* ================================================================
     (2) NGỮ PHÁP THI — bảng dạng cố định viết tay
     ================================================================ */
  var VERBS = [
    { base: "go", past: "went", pp: "gone" }, { base: "see", past: "saw", pp: "seen" },
    { base: "eat", past: "ate", pp: "eaten" }, { base: "write", past: "wrote", pp: "written" },
    { base: "read", past: "read", pp: "read" }, { base: "make", past: "made", pp: "made" },
    { base: "take", past: "took", pp: "taken" }, { base: "give", past: "gave", pp: "given" },
    { base: "buy", past: "bought", pp: "bought" }, { base: "bring", past: "brought", pp: "brought" },
    { base: "teach", past: "taught", pp: "taught" }, { base: "speak", past: "spoke", pp: "spoken" },
    { base: "drive", past: "drove", pp: "driven" }, { base: "sing", past: "sang", pp: "sung" },
    { base: "swim", past: "swam", pp: "swum" }, { base: "break", past: "broke", pp: "broken" },
    { base: "choose", past: "chose", pp: "chosen" }, { base: "forget", past: "forgot", pp: "forgotten" },
    { base: "build", past: "built", pp: "built" }, { base: "send", past: "sent", pp: "sent" },
    { base: "find", past: "found", pp: "found" }, { base: "have", past: "had", pp: "had" },
    { base: "do", past: "did", pp: "done" }
  ];
  var ADJS = [
    { a: "big", comp: "bigger", sup: "biggest" }, { a: "good", comp: "better", sup: "best" },
    { a: "bad", comp: "worse", sup: "worst" }, { a: "happy", comp: "happier", sup: "happiest" },
    { a: "easy", comp: "easier", sup: "easiest" }, { a: "hot", comp: "hotter", sup: "hottest" },
    { a: "thin", comp: "thinner", sup: "thinnest" }, { a: "beautiful", comp: "more beautiful", sup: "most beautiful" },
    { a: "expensive", comp: "more expensive", sup: "most expensive" }, { a: "interesting", comp: "more interesting", sup: "most interesting" },
    { a: "far", comp: "farther", sup: "farthest" }, { a: "little", comp: "less", sup: "least" }
  ];

  /* Mẫu câu thì — {pre, ans, post, wrong, ex} */
  var TENSE = [
    { pre: "She", ans: "goes", post: "to school every day.", wrong: ["go", "went", "going"], ex: "Dấu hiệu 'every day' → hiện tại đơn; chủ ngữ 'She' nên động từ thêm -es: goes." },
    { pre: "They", ans: "play", post: "football on Sundays.", wrong: ["plays", "played", "playing"], ex: "'On Sundays' (thói quen) → hiện tại đơn; chủ ngữ 'They' dùng động từ nguyên thể: play." },
    { pre: "The sun", ans: "rises", post: "in the east.", wrong: ["rise", "rose", "rising"], ex: "Sự thật hiển nhiên → hiện tại đơn; 'The sun' là số ít nên dùng rises." },
    { pre: "He", ans: "studies", post: "English every evening.", wrong: ["study", "studied", "studying"], ex: "'Every evening' → hiện tại đơn; 'He' số ít nên study → studies." },
    { pre: "We", ans: "live", post: "in a small town.", wrong: ["lives", "lived", "living"], ex: "Hiện tại đơn nói về nơi ở thường xuyên; 'We' dùng động từ nguyên thể: live." },
    { pre: "My dad", ans: "works", post: "at a bank.", wrong: ["work", "worked", "working"], ex: "Hiện tại đơn (công việc thường xuyên); 'My dad' số ít nên dùng works." },
    { pre: "Birds", ans: "sing", post: "in spring.", wrong: ["sings", "sang", "singing"], ex: "Hiện tại đơn; chủ ngữ 'Birds' số nhiều nên dùng động từ nguyên thể: sing." },
    { pre: "She", ans: "brushes", post: "her teeth twice a day.", wrong: ["brush", "brushed", "brushing"], ex: "'Twice a day' → hiện tại đơn; 'She' số ít và brush kết thúc bằng -sh nên thêm -es." },
    { pre: "Look! It", ans: "is raining", post: "now.", wrong: ["rains", "rained", "rain"], ex: "'Look!' và 'now' → hiện tại tiếp diễn: is raining (đang diễn ra)." },
    { pre: "I", ans: "am doing", post: "my homework now.", wrong: ["do", "did", "does"], ex: "'Now' → hiện tại tiếp diễn; với 'I' dùng am doing." },
    { pre: "They", ans: "are swimming", post: "in the pool at the moment.", wrong: ["swims", "swam", "swim"], ex: "'At the moment' → hiện tại tiếp diễn; 'They' đi với are swimming." },
    { pre: "She", ans: "is writing", post: "a letter now.", wrong: ["writes", "wrote", "write"], ex: "'Now' → hiện tại tiếp diễn; 'She' đi với is writing." },
    { pre: "We", ans: "are studying", post: "for the test right now.", wrong: ["studies", "studied", "study"], ex: "'Right now' → hiện tại tiếp diễn; 'We' đi với are studying." },
    { pre: "He", ans: "is listening", post: "to music now.", wrong: ["listens", "listened", "listen"], ex: "'Now' → hiện tại tiếp diễn; 'He' đi với is listening." },
    { pre: "The baby", ans: "is crying", post: "now.", wrong: ["cries", "cried", "cry"], ex: "'Now' → hiện tại tiếp diễn; 'The baby' số ít nên dùng is crying." },
    { pre: "Listen! Someone", ans: "is knocking", post: "at the door.", wrong: ["knocks", "knocked", "knock"], ex: "'Listen!' → việc đang xảy ra: hiện tại tiếp diễn is knocking." },
    { pre: "We", ans: "went", post: "to Hue last year.", wrong: ["go", "gone", "goes"], ex: "'Last year' → quá khứ đơn; quá khứ của go là went." },
    { pre: "She", ans: "made", post: "a cake yesterday.", wrong: ["make", "makes", "making"], ex: "'Yesterday' → quá khứ đơn; quá khứ của make là made." },
    { pre: "They", ans: "saw", post: "a good film last night.", wrong: ["see", "seen", "sees"], ex: "'Last night' → quá khứ đơn; quá khứ của see là saw (seen là phân từ)." },
    { pre: "He", ans: "gave", post: "me a book yesterday.", wrong: ["give", "given", "gives"], ex: "'Yesterday' → quá khứ đơn; quá khứ của give là gave." },
    { pre: "She", ans: "wrote", post: "an email yesterday.", wrong: ["write", "written", "writes"], ex: "'Yesterday' → quá khứ đơn; quá khứ của write là wrote." },
    { pre: "We", ans: "swam", post: "in the sea last summer.", wrong: ["swim", "swum", "swims"], ex: "'Last summer' → quá khứ đơn; quá khứ của swim là swam." },
    { pre: "He", ans: "drove", post: "to work yesterday.", wrong: ["drive", "driven", "drives"], ex: "'Yesterday' → quá khứ đơn; quá khứ của drive là drove." },
    { pre: "They", ans: "ate", post: "breakfast early yesterday.", wrong: ["eat", "eaten", "eats"], ex: "'Yesterday' → quá khứ đơn; quá khứ của eat là ate." },
    { pre: "I think it", ans: "will rain", post: "tomorrow.", wrong: ["rains", "rained", "is rain"], ex: "'I think' + 'tomorrow' → dự đoán với will: will rain." },
    { pre: "I promise I", ans: "will help", post: "you later.", wrong: ["helps", "helped", "helping"], ex: "Lời hứa (I promise) → dùng will: will help." },
    { pre: "Look at the clouds! It", ans: "is going to rain", post: "soon.", wrong: ["are going to rain", "rains yesterday", "rained"], ex: "Có dấu hiệu trước mắt (mây đen) → be going to; 'It' đi với is going to rain." },
    { pre: "We", ans: "are going to travel", post: "to Da Lat next week.", wrong: ["is going to travel", "travelled", "travels"], ex: "Kế hoạch đã định + 'next week' → be going to; 'We' đi với are." },
    { pre: "He", ans: "will be", post: "late tomorrow, probably.", wrong: ["is be", "was be", "being"], ex: "'Probably' + 'tomorrow' → dự đoán với will: will be." },
    { pre: "They", ans: "are going to watch", post: "a film tonight.", wrong: ["is going to watch", "watched", "watches"], ex: "Dự định tối nay → be going to; 'They' đi với are going to watch." },
    { pre: "Watch out! The glass", ans: "is going to fall", post: ".", wrong: ["are going to fall", "fell now", "falling yesterday"], ex: "Sắp xảy ra trước mắt (Watch out!) → be going to; 'The glass' số ít dùng is." },
    { pre: "She", ans: "is going to buy", post: "a new bike soon.", wrong: ["are going to buy", "bought", "buys"], ex: "Dự định (soon) → be going to; 'She' đi với is going to buy." },
    { pre: "I", ans: "have", post: "just finished my homework.", wrong: ["has", "did", "do"], ex: "'Just' → hiện tại hoàn thành; với 'I' dùng have + phân từ (finished)." },
    { pre: "She", ans: "has", post: "lived here since 2020.", wrong: ["have", "did", "do"], ex: "'Since 2020' → hiện tại hoàn thành; 'She' số ít dùng has lived." },
    { pre: "They", ans: "have", post: "already seen this film.", wrong: ["has", "did", "does"], ex: "'Already' → hiện tại hoàn thành; 'They' dùng have seen (seen là phân từ của see)." },
    { pre: "He", ans: "has", post: "just eaten lunch.", wrong: ["have", "did", "do"], ex: "'Just' → hiện tại hoàn thành; 'He' dùng has eaten (eaten là phân từ của eat)." },
    { pre: "We", ans: "have", post: "known Tom for years.", wrong: ["has", "did", "does"], ex: "'For years' → hiện tại hoàn thành; 'We' dùng have known." },
    { pre: "It", ans: "has", post: "rained a lot this week.", wrong: ["have", "did", "do"], ex: "'This week' (chưa kết thúc) → hiện tại hoàn thành; 'It' dùng has rained." },
    { pre: "You", ans: "have", post: "broken the rule again!", wrong: ["has", "did", "does"], ex: "Hiện tại hoàn thành nhấn mạnh kết quả; 'You' dùng have broken (broken là phân từ của break)." },
    { pre: "My parents", ans: "have", post: "visited Hue twice.", wrong: ["has", "did", "does"], ex: "'Twice' (số lần trải nghiệm) → hiện tại hoàn thành; 'My parents' số nhiều dùng have." }
  ];

  var PASSIVE = [
    { pre: "English", ans: "is spoken", post: "in many countries.", wrong: ["speaks", "spoke", "speaking"], ex: "Bị động hiện tại: English không tự nói → is spoken (be + phân từ của speak)." },
    { pre: "This bridge", ans: "was built", post: "in 1990.", wrong: ["is built", "builds", "build"], ex: "'In 1990' → bị động quá khứ: was built (phân từ của build là built)." },
    { pre: "The room", ans: "is cleaned", post: "every day.", wrong: ["cleans", "clean", "cleaning"], ex: "'Every day' → bị động hiện tại: is cleaned (phòng được dọn)." },
    { pre: "This letter", ans: "was written", post: "yesterday.", wrong: ["is written", "writes", "write"], ex: "'Yesterday' → bị động quá khứ: was written (phân từ của write là written)." },
    { pre: "Many trees", ans: "are planted", post: "in the park every spring.", wrong: ["plant", "plants", "planting"], ex: "Chủ ngữ số nhiều 'Many trees' → bị động hiện tại: are planted." },
    { pre: "The windows", ans: "were broken", post: "last week.", wrong: ["was broken", "breaks", "break"], ex: "'Last week' + chủ ngữ số nhiều → were broken (bị động quá khứ số nhiều)." },
    { pre: "His bike", ans: "was stolen", post: "last night.", wrong: ["is steal", "steals", "steal"], ex: "'Last night' → bị động quá khứ: was stolen." },
    { pre: "Homework", ans: "is done", post: "by students every day.", wrong: ["does", "did", "doing"], ex: "Có 'by students' → bị động hiện tại: is done (phân từ của do là done)." },
    { pre: "The story", ans: "was told", post: "by my grandma last night.", wrong: ["is tell", "tells", "tell"], ex: "'Last night' + 'by…' → bị động quá khứ: was told." },
    { pre: "Cars", ans: "are made", post: "in this factory.", wrong: ["makes", "make", "making"], ex: "Chủ ngữ số nhiều 'Cars' → bị động hiện tại: are made (phân từ của make là made)." },
    { pre: "The door", ans: "is locked", post: "by the guard every night.", wrong: ["locks", "lock", "locking"], ex: "Có 'by the guard' → bị động: is locked (cửa được khoá)." },
    { pre: "That house", ans: "was sold", post: "in 2005.", wrong: ["is sell", "sells", "sell"], ex: "'In 2005' → bị động quá khứ: was sold." }
  ];

  var COND = [
    { pre: "If you heat ice, it", ans: "melts", post: ".", wrong: ["melt", "melted", "melting"], ex: "Điều kiện loại 0 (sự thật khoa học): If + hiện tại đơn, mệnh đề chính hiện tại đơn — 'it' số ít nên melts." },
    { pre: "If it rains, the grass", ans: "gets", post: "wet.", wrong: ["get", "got", "getting"], ex: "Điều kiện loại 0: sau If là hiện tại đơn thì mệnh đề chính cũng hiện tại đơn — gets." },
    { pre: "If you", ans: "heat", post: "water to 100 degrees, it boils.", wrong: ["heats", "heated", "heating"], ex: "Điều kiện loại 0: mệnh đề If dùng hiện tại đơn; chủ ngữ 'you' nên dùng heat." },
    { pre: "If plants", ans: "don't get", post: "water, they die.", wrong: ["doesn't get", "got", "getting"], ex: "Điều kiện loại 0: 'plants' số nhiều nên don't get." },
    { pre: "If it rains tomorrow, we", ans: "will stay", post: "at home.", wrong: ["would stay", "stayed", "staying"], ex: "Điều kiện loại 1 (có 'tomorrow', có thể xảy ra): If + hiện tại đơn, will + động từ — will stay." },
    { pre: "If you study hard, you", ans: "will pass", post: "the exam.", wrong: ["would pass", "passed", "passing"], ex: "Điều kiện loại 1: mệnh đề chính dùng will pass; would là của loại 2." },
    { pre: "If she", ans: "has", post: "time tomorrow, she will help us.", wrong: ["have", "will have", "had"], ex: "Điều kiện loại 1: mệnh đề If dùng hiện tại đơn (không dùng will) — 'she' nên has." },
    { pre: "If they", ans: "leave", post: "now, they will catch the bus.", wrong: ["leaves", "will leave", "left"], ex: "Điều kiện loại 1: mệnh đề If hiện tại đơn; 'they' số nhiều nên leave, không dùng will trong mệnh đề If." },
    { pre: "If I", ans: "were", post: "rich, I would travel a lot.", wrong: ["am", "will be", "be"], ex: "Điều kiện loại 2 (giả định, dấu hiệu 'would'): mệnh đề If dùng quá khứ giả định — were cho mọi chủ ngữ." },
    { pre: "If he had money, he", ans: "would buy", post: "a new bike.", wrong: ["will buy", "buys", "bought"], ex: "Điều kiện loại 2: If + quá khứ đơn (had) → mệnh đề chính would buy." },
    { pre: "If we lived near school, we", ans: "would", post: "walk there.", wrong: ["will", "walks", "walked"], ex: "Điều kiện loại 2 (lived là quá khứ giả định) → mệnh đề chính dùng would + động từ nguyên thể." },
    { pre: "If she", ans: "were", post: "taller, she would play basketball.", wrong: ["is", "will be", "be"], ex: "Điều kiện loại 2: có 'would' ở mệnh đề chính → mệnh đề If dùng were." },
    { pre: "If I knew the answer, I", ans: "would tell", post: "you.", wrong: ["will tell", "tells", "told"], ex: "Điều kiện loại 2: knew (quá khứ giả định) → would tell ở mệnh đề chính." }
  ];

  var REPORTED = [
    { orig: "He said, \"I am tired.\"", ans: "He said that he was tired.", wrong: ["He said that he is tired.", "He said that I was tired.", "He said that was he tired."], ex: "Câu gián tiếp: lùi thì am → was và đổi đại từ I → he cho khớp người nói." },
    { orig: "She said, \"I like English.\"", ans: "She said that she liked English.", wrong: ["She said that she likes English.", "She said that I liked English.", "She said that liked she English."], ex: "Lùi thì like → liked và đổi I → she; câu trần thuật giữ trật tự chủ ngữ + động từ." },
    { orig: "Tom said to me, \"I will help you.\"", ans: "Tom told me that he would help me.", wrong: ["Tom told me that he will help me.", "Tom told me that I would help him.", "Tom told me that he would helps me."], ex: "Will → would khi thuật lại; I → he (Tom), you → me (người nghe)." },
    { orig: "Lan said to me, \"I have a new bike.\"", ans: "Lan told me that she had a new bike.", wrong: ["Lan told me that she has a new bike.", "Lan told me that I had a new bike.", "Lan told me that she have a new bike."], ex: "Have → had (lùi thì) và I → she (Lan)." },
    { orig: "He asked me, \"Where do you live?\"", ans: "He asked me where I lived.", wrong: ["He asked me where did I live.", "He asked me where I live.", "He asked me where do I live."], ex: "Câu hỏi gián tiếp: dùng trật tự câu kể (I lived), lùi thì live → lived, bỏ do/does." },
    { orig: "She asked Tom, \"Are you busy?\"", ans: "She asked Tom if he was busy.", wrong: ["She asked Tom if he is busy.", "She asked Tom was he busy.", "She asked Tom if was he busy."], ex: "Câu hỏi Yes/No gián tiếp dùng if, lùi thì are → was, giữ trật tự câu kể." },
    { orig: "The teacher said to us, \"Open the book.\"", ans: "The teacher told us to open the book.", wrong: ["The teacher told us open the book.", "The teacher said us to open the book.", "The teacher told us to opened the book."], ex: "Câu mệnh lệnh gián tiếp: told + người nghe + to + động từ nguyên thể (to open)." },
    { orig: "Nam said, \"I can swim well.\"", ans: "Nam said that he could swim well.", wrong: ["Nam said that he can swim well.", "Nam said that I could swim well.", "Nam said that he could swims well."], ex: "Can → could khi thuật lại; sau could dùng động từ nguyên thể swim." },
    { orig: "She said, \"I bought a pen yesterday.\"", ans: "She said she bought a pen the day before.", wrong: ["She said she buys a pen the day before.", "She said I bought a pen yesterday.", "She said she buy a pen yesterday."], ex: "Thuật lại giữ quá khứ đơn bought, đổi yesterday → the day before và I → she." },
    { orig: "He said to her, \"I am sorry.\"", ans: "He told her that he was sorry.", wrong: ["He told her that he is sorry.", "He told her that I was sorry.", "He told her that he were sorry."], ex: "Am → was khi thuật lại; chủ ngữ he đi với was." },
    { orig: "Mai asked me, \"Do you like music?\"", ans: "Mai asked me if I liked music.", wrong: ["Mai asked me if I like music.", "Mai asked me do I like music.", "Mai asked me if did I like music."], ex: "Câu hỏi Yes/No gián tiếp dùng if + trật tự câu kể và lùi thì like → liked." }
  ];

  var COMP = [
    { adj: "big", pre: "An elephant is", ans: "bigger", post: "than a mouse.", wrong: ["big", "biggest", "more big"], ex: "Có 'than' → so sánh hơn của big là bigger (gấp đôi chữ g)." },
    { adj: "hot", pre: "Today is", ans: "hotter", post: "than yesterday.", wrong: ["hot", "hottest", "more hot"], ex: "Có 'than' → so sánh hơn: hot → hotter (gấp đôi chữ t)." },
    { adj: "easy", pre: "This exercise is", ans: "easier", post: "than that one.", wrong: ["easy", "easiest", "more easy"], ex: "Có 'than' → easy đổi y thành i thêm -er: easier." },
    { adj: "happy", pre: "She looks", ans: "happier", post: "today than yesterday.", wrong: ["happy", "happiest", "more happy"], ex: "Có 'than' → happy → happier (y → i + er)." },
    { adj: "good", pre: "He plays football", ans: "better", post: "than me.", wrong: ["good", "best", "gooder"], ex: "Có 'than' → dạng bất quy tắc: good → better (nhất là best)." },
    { adj: "bad", pre: "His result is", ans: "worse", post: "than last time.", wrong: ["bad", "worst", "badder"], ex: "Có 'than' → dạng bất quy tắc: bad → worse (nhất là worst)." },
    { adj: "thin", pre: "This book is", ans: "thinner", post: "than that one.", wrong: ["thin", "thinnest", "more thin"], ex: "Có 'than' → thin → thinner (gấp đôi chữ n)." },
    { adj: "beautiful", pre: "This garden is", ans: "more beautiful", post: "than that park.", wrong: ["beautiful", "most beautiful", "beautifuler"], ex: "Tính từ dài dùng more + tính từ khi có 'than': more beautiful." },
    { adj: "expensive", pre: "This bag is", ans: "more expensive", post: "than that one.", wrong: ["expensive", "most expensive", "expensiver"], ex: "Có 'than' → expensive là tính từ dài: more expensive." },
    { adj: "interesting", pre: "This film is", ans: "more interesting", post: "than that one.", wrong: ["interesting", "most interesting", "interestinger"], ex: "Có 'than' → tính từ dài dùng more interesting." },
    { adj: "far", pre: "My house is", ans: "farther", post: "from school than yours.", wrong: ["far", "farthest", "more far"], ex: "Có 'than' → far → farther (bất quy tắc, chỉ khoảng cách)." },
    { adj: "little", pre: "I have", ans: "less", post: "free time than you.", wrong: ["little", "least", "littler"], ex: "Có 'than' → little → less (dùng cho danh từ không đếm được như time)." },
    { adj: "big", pre: "This is the", ans: "biggest", post: "house in the village.", wrong: ["bigger", "big", "more big"], ex: "Có 'the' + 'in the village' → so sánh nhất: biggest." },
    { adj: "good", pre: "She is the", ans: "best", post: "student in the class.", wrong: ["better", "good", "goodest"], ex: "Có 'the' + 'in the class' → so sánh nhất bất quy tắc: good → best." },
    { adj: "beautiful", pre: "This is the", ans: "most beautiful", post: "beach in the country.", wrong: ["more beautiful", "beautiful", "beautifulest"], ex: "Có 'the' + 'in the country' → so sánh nhất của tính từ dài: most beautiful." }
  ];

  var VERBFORM = [
    { pre: "I enjoy", ans: "reading", post: "books in the evening.", wrong: ["to read", "read", "reads"], ex: "Sau enjoy dùng động từ -ing: enjoy reading." },
    { pre: "She finished", ans: "doing", post: "her homework at nine.", wrong: ["to do", "does", "do"], ex: "Sau finish dùng -ing: finished doing." },
    { pre: "Avoid", ans: "talking", post: "loudly in the library.", wrong: ["to talk", "talks", "talk"], ex: "Sau avoid dùng -ing: avoid talking." },
    { pre: "He keeps", ans: "making", post: "the same mistake.", wrong: ["to make", "makes", "make"], ex: "Sau keep (tiếp tục làm) dùng -ing: keeps making." },
    { pre: "Do you mind", ans: "opening", post: "the window?", wrong: ["to open", "opens", "open"], ex: "Sau mind dùng -ing: mind opening." },
    { pre: "Stop", ans: "making", post: "so much noise, please!", wrong: ["to make", "makes", "make"], ex: "Stop + -ing nghĩa là dừng việc đang làm: stop making noise." },
    { pre: "We want", ans: "to go", post: "home early today.", wrong: ["going", "go", "goes"], ex: "Sau want dùng to + động từ: want to go." },
    { pre: "He decided", ans: "to study", post: "harder this term.", wrong: ["studying", "study", "studies"], ex: "Sau decide dùng to + động từ: decided to study." },
    { pre: "They hope", ans: "to win", post: "the match on Sunday.", wrong: ["winning", "win", "wins"], ex: "Sau hope dùng to + động từ: hope to win." },
    { pre: "I plan", ans: "to visit", post: "Hue in June.", wrong: ["visiting", "visit", "visits"], ex: "Sau plan dùng to + động từ: plan to visit." },
    { pre: "She would like", ans: "to drink", post: "some tea.", wrong: ["drinking", "drink", "drinks"], ex: "Would like + to + động từ: would like to drink." },
    { pre: "You need", ans: "to rest", post: "more after school.", wrong: ["resting", "rest", "rests"], ex: "Sau need (chủ ngữ là người) dùng to + động từ: need to rest." },
    { pre: "He promised", ans: "to help", post: "me with my homework.", wrong: ["helping", "help", "helps"], ex: "Sau promise dùng to + động từ: promised to help." }
  ];

  var GRAMMAR_TF = [
    { stmt: "Câu \"She goes to school every day.\" đúng ngữ pháp.", truth: true, ex: "Đúng: chủ ngữ She (số ít) đi với goes ở hiện tại đơn." },
    { stmt: "Câu \"They are playing football now.\" đúng ngữ pháp.", truth: true, ex: "Đúng: 'now' đi với hiện tại tiếp diễn are playing." },
    { stmt: "Câu \"The room is cleaned every day.\" là câu bị động.", truth: true, ex: "Đúng: is cleaned là bị động hiện tại (be + phân từ)." },
    { stmt: "Câu \"If it rains, I will stay at home.\" là điều kiện loại 1.", truth: true, ex: "Đúng: If + hiện tại đơn, will + động từ là mẫu loại 1." },
    { stmt: "Câu \"He said that he was tired.\" đã lùi thì đúng.", truth: true, ex: "Đúng: am/is → was khi chuyển sang câu gián tiếp." },
    { stmt: "Câu \"This book is more interesting than that one.\" đúng dạng so sánh.", truth: true, ex: "Đúng: tính từ dài interesting dùng more + tính từ trước 'than'." },
    { stmt: "Câu \"I enjoy reading books.\" đúng dạng động từ.", truth: true, ex: "Đúng: sau enjoy dùng động từ -ing (reading)." },
    { stmt: "Câu \"She has lived here since 2020.\" dùng thì hiện tại hoàn thành.", truth: true, ex: "Đúng: has lived + since 2020 là hiện tại hoàn thành." },
    { stmt: "Câu \"The bridge was built in 1990.\" là bị động quá khứ.", truth: true, ex: "Đúng: was built là bị động quá khứ đơn." },
    { stmt: "Câu \"If I were you, I would rest.\" là điều kiện loại 2.", truth: true, ex: "Đúng: If + were, would + động từ là mẫu loại 2 (giả định)." },
    { stmt: "Câu \"She don't like music.\" đúng ngữ pháp.", truth: false, ex: "Sai: chủ ngữ She phải dùng doesn't, không dùng don't." },
    { stmt: "Câu \"He is more taller than me.\" đúng dạng so sánh.", truth: false, ex: "Sai: taller đã là so sánh hơn, không thêm 'more' nữa." },
    { stmt: "Câu \"I want going home.\" đúng dạng động từ.", truth: false, ex: "Sai: sau want phải dùng to go, không dùng going." },
    { stmt: "Câu \"The letter was wrote yesterday.\" đúng bị động.", truth: false, ex: "Sai: phân từ của write là written — phải là 'was written'." },
    { stmt: "Câu \"If it will rain tomorrow, I will stay home.\" đúng điều kiện loại 1.", truth: false, ex: "Sai: mệnh đề If của loại 1 dùng hiện tại đơn (rains), không dùng will." },
    { stmt: "Câu \"They has finished the work.\" đúng ngữ pháp.", truth: false, ex: "Sai: chủ ngữ They số nhiều phải dùng have, không dùng has." },
    { stmt: "Câu \"He asked me where did I live.\" đúng câu gián tiếp.", truth: false, ex: "Sai: câu hỏi gián tiếp dùng trật tự câu kể — 'where I lived'." },
    { stmt: "Câu \"She can sings very well.\" đúng dạng động từ.", truth: false, ex: "Sai: sau can dùng động từ nguyên thể — 'can sing'." },
    { stmt: "Câu \"This is the most happiest day.\" đúng so sánh nhất.", truth: false, ex: "Sai: happiest đã là so sánh nhất, không thêm 'most' nữa." },
    { stmt: "Câu \"We was at home yesterday.\" đúng ngữ pháp.", truth: false, ex: "Sai: chủ ngữ We phải dùng were ở quá khứ, không dùng was." }
  ];

  function sentOf(it) { return it.pre + " ___ " + it.post; }
  function fSampleChoose(bank, fam, promptFn) {
    return function () {
      var it = enPick(bank);
      var q = enMCQ(promptFn(it), it.ans, it.wrong, it.ex, {});
      return enTag(q, fam, it.ans);
    };
  }
  function fSampleBlank(bank, fam, promptFn) {
    return function () {
      var it = enPick(bank);
      var q = enBlank(promptFn(it), it.ans, it.wrong, it.ex);
      return enTag(q, fam, it.ans);
    };
  }
  var tensePrompt = function (it) { return "Chọn dạng đúng của động từ để hoàn thành câu: \"" + sentOf(it) + "\""; };
  var passivePrompt = function (it) { return "Chọn dạng bị động đúng để hoàn thành câu: \"" + sentOf(it) + "\""; };
  var condPrompt = function (it) { return "Chọn dạng đúng để hoàn thành câu điều kiện: \"" + sentOf(it) + "\""; };
  var compPrompt = function (it) { return "Chọn dạng đúng của tính từ \"" + it.adj + "\": \"" + sentOf(it) + "\""; };
  var verbFormPrompt = function (it) { return "Chọn dạng đúng của động từ để hoàn thành câu: \"" + sentOf(it) + "\""; };

  var fTense = fSampleChoose(TENSE, "fTense", tensePrompt);
  var fPassive = fSampleChoose(PASSIVE, "fPassive", passivePrompt);
  var fCond = fSampleChoose(COND, "fCond", condPrompt);
  var fVerbForm = fSampleChoose(VERBFORM, "fVerbForm", verbFormPrompt);
  var fComp = fSampleChoose(COMP, "fComp", compPrompt);
  var fTenseBlank = fSampleBlank(TENSE, "fTenseBlank", function (it) { return "Điền dạng đúng của động từ: \"" + sentOf(it) + "\""; });
  var fPassiveBlank = fSampleBlank(PASSIVE, "fPassiveBlank", function (it) { return "Điền dạng bị động đúng: \"" + sentOf(it) + "\""; });
  var fCompBlank = fSampleBlank(COMP, "fCompBlank", function (it) { return "Điền dạng đúng của tính từ \"" + it.adj + "\": \"" + sentOf(it) + "\""; });

  function fReported() {
    var it = enPick(REPORTED);
    var q = enMCQ("Chọn câu gián tiếp đúng của câu: " + it.orig, it.ans, it.wrong, it.ex, {});
    return enTag(q, "fReported", it.ans);
  }
  function fMatchForms() {
    var five = enShuffle(VERBS).slice(0, 5);
    var pairs = five.map(function (v) { return [v.base, v.past]; });
    var q = enMatch("Nối động từ nguyên thể với dạng quá khứ của nó:", pairs,
      "Các cặp đúng: " + five.map(function (v) { return v.base + " → " + v.past; }).join("; ") + ". Đây là các động từ bất quy tắc phải học thuộc.");
    return enTag(q, "fMatchForms", "verbs");
  }
  function fTFGrammar() {
    var q = makeTF(GRAMMAR_TF, "Đúng hay sai về ngữ pháp? Chạm nhanh nhé!");
    return enTag(q, "fTFGrammar", "rule");
  }

  var topicGrammar = {
    id: "cd-en-thcs-grammar", emoji: "📐", name: "Ngữ pháp thi",
    sub: "Các thì, bị động, điều kiện, gián tiếp, so sánh",
    pools: {
      choose: [fTense, fPassive, fCond, fReported, fComp, fVerbForm],
      blank: [fTenseBlank, fPassiveBlank, fCompBlank],
      match: [fMatchForms],
      games: [fTFGrammar]
    },
    knowledge: {
      notes: [
        "Nhìn DẤU HIỆU thời gian trước: yesterday/last… → quá khứ đơn; now/Look! → tiếp diễn; since/for → hoàn thành; every day → hiện tại đơn.",
        "Bị động: be + phân từ (V3). Chọn be theo thì và số của chủ ngữ (is/was/are/were).",
        "Điều kiện: loại 1 dùng will và mệnh đề If ở hiện tại đơn; loại 2 dùng would và mệnh đề If ở quá khứ giả định (were).",
        "Câu gián tiếp phải LÙI THÌ và đổi đại từ theo người nói/người nghe; câu hỏi gián tiếp dùng trật tự câu kể.",
        "So sánh: có 'than' → dạng hơn; có 'the … in/of' → dạng nhất. Tính từ dài dùng more/most."
      ],
      facts: [
        { q: "Chia động từ: \"She ___ (go) to school every day.\"", a: "goes", ex: "\"Every day\" là dấu hiệu hiện tại đơn; chủ ngữ She số ít nên go → goes." },
        { q: "Dạng bị động của \"They built this bridge in 1990\" là gì?", a: "This bridge was built in 1990.", ex: "Tân ngữ lên làm chủ ngữ; quá khứ đơn bị động: was + built (phân từ của build)." }
      ],
      pairs: [["go", "went"], ["see", "saw"], ["write", "wrote"], ["teach", "taught"], ["good → better", "best"], ["bad → worse", "worst"]]
    }
  };

  /* ================================================================
     (3) ĐỌC HIỂU — biển báo & đoạn văn viết mới
     ================================================================ */
  var SIGNS = [
    { text: "LIBRARY — Please be quiet. Please return books on time.", qs: [
      { q: "Biển này yêu cầu mọi người làm gì?", ans: "Giữ yên lặng trong thư viện", wrong: ["Nói chuyện thật to", "Ăn uống thoải mái", "Mang sách về nhà luôn"], ex: "Biển ghi 'Please be quiet' — hãy giữ yên lặng." },
      { q: "Sách mượn phải được trả thế nào?", ans: "Đúng hạn", wrong: ["Bất cứ lúc nào cũng được", "Sau một năm", "Không cần trả lại"], ex: "Biển ghi 'return books on time' — trả sách đúng hạn." }
    ]},
    { text: "SWIMMING POOL — Children under 8 must go with an adult. No running.", qs: [
      { q: "Ai phải đi cùng người lớn ở bể bơi?", ans: "Trẻ dưới 8 tuổi", wrong: ["Mọi người lớn", "Trẻ trên 12 tuổi", "Nhân viên bể bơi"], ex: "Biển ghi 'Children under 8 must go with an adult' — trẻ dưới 8 tuổi phải đi cùng người lớn." },
      { q: "Điều gì bị cấm ở bể bơi?", ans: "Chạy quanh bể bơi", wrong: ["Bơi trong bể", "Mặc đồ bơi", "Đi cùng người lớn"], ex: "Biển ghi 'No running' — không được chạy." }
    ]},
    { text: "MUSEUM — Open 9 a.m. to 5 p.m. Do not touch the objects.", qs: [
      { q: "Bảo tàng đóng cửa lúc mấy giờ?", ans: "5 giờ chiều", wrong: ["9 giờ tối", "5 giờ sáng", "9 giờ chiều"], ex: "Biển ghi mở cửa '9 a.m. to 5 p.m.' — đóng cửa lúc 5 giờ chiều." },
      { q: "Du khách không được làm gì?", ans: "Chạm vào hiện vật", wrong: ["Xem hiện vật", "Mua vé vào cửa", "Đi theo nhóm"], ex: "Biển ghi 'Do not touch the objects' — không chạm vào hiện vật." }
    ]},
    { text: "SCHOOL OFFICE — Parents: please sign in at the desk first.", qs: [
      { q: "Phụ huynh phải làm gì trước tiên?", ans: "Đăng ký tại bàn tiếp đón", wrong: ["Vào thẳng lớp học", "Đợi ở ngoài cổng", "Gọi điện về nhà"], ex: "Biển ghi 'please sign in at the desk first' — đăng ký tại bàn trước." },
      { q: "Biển này chủ yếu dành cho ai?", ans: "Phụ huynh", wrong: ["Học sinh mới", "Giáo viên mới", "Khách du lịch"], ex: "Biển bắt đầu bằng 'Parents:' — lời nhắn dành cho phụ huynh." }
    ]},
    { text: "TRAINS — The train to Hanoi leaves at 6.30. Buy tickets before you get on.", qs: [
      { q: "Tàu đi Hà Nội khởi hành lúc mấy giờ?", ans: "6 giờ 30", wrong: ["6 giờ", "7 giờ 30", "6 giờ 15"], ex: "Biển ghi tàu 'leaves at 6.30' — khởi hành lúc 6 giờ 30." },
      { q: "Hành khách phải làm gì trước khi lên tàu?", ans: "Mua vé", wrong: ["Mua đồ ăn", "Xuống sân ga", "Gọi điện thoại"], ex: "Biển ghi 'Buy tickets before you get on' — mua vé trước khi lên tàu." }
    ]},
    { text: "CANTEEN — Breakfast 6.30–8.00. Please take your tray back after eating.", qs: [
      { q: "Bữa sáng ở căng-tin phục vụ đến mấy giờ?", ans: "8 giờ", wrong: ["6 giờ 30", "9 giờ", "8 giờ 30"], ex: "Biển ghi 'Breakfast 6.30–8.00' — bữa sáng đến 8 giờ." },
      { q: "Sau khi ăn, học sinh phải làm gì?", ans: "Đem trả khay", wrong: ["Để khay trên bàn", "Mang khay về lớp", "Rửa khay trong lớp"], ex: "Biển ghi 'take your tray back' — đem trả khay về chỗ quy định." }
    ]},
    { text: "PARK RULES — Keep dogs on a lead. Do not pick the flowers.", qs: [
      { q: "Chó trong công viên phải được giữ thế nào?", ans: "Buộc dây dắt", wrong: ["Thả chạy tự do", "Ở trong lồng", "Đi cùng trẻ em"], ex: "Biển ghi 'Keep dogs on a lead' — giữ chó bằng dây dắt." },
      { q: "Điều gì không được làm trong công viên?", ans: "Hái hoa", wrong: ["Đi dạo", "Ngồi trên ghế", "Cho chim ăn"], ex: "Biển ghi 'Do not pick the flowers' — không hái hoa." }
    ]},
    { text: "EXAM ROOM — No phones. Work on your own and stay silent.", qs: [
      { q: "Học sinh không được mang dùng gì trong phòng thi?", ans: "Điện thoại", wrong: ["Bút viết", "Thước kẻ", "Giấy nháp"], ex: "Biển ghi 'No phones' — không dùng điện thoại." },
      { q: "Trong phòng thi, học sinh phải làm bài thế nào?", ans: "Tự làm và giữ im lặng", wrong: ["Làm bài theo nhóm", "Trao đổi với bạn", "Ra ngoài khi mệt"], ex: "Biển ghi 'Work on your own and stay silent' — tự làm bài và giữ im lặng." }
    ]},
    { text: "BICYCLES — Lock your bike here. The school is not responsible for lost bikes.", qs: [
      { q: "Học sinh phải làm gì với xe đạp?", ans: "Khoá xe lại", wrong: ["Để xe trong lớp", "Cho bạn mượn xe", "Rửa xe mỗi ngày"], ex: "Biển ghi 'Lock your bike here' — khoá xe của bạn tại đây." },
      { q: "Nếu xe bị mất thì sao?", ans: "Trường không chịu trách nhiệm", wrong: ["Trường mua xe mới cho", "Trường tìm giúp ngay", "Học sinh được bồi thường"], ex: "Biển ghi trường 'is not responsible for lost bikes' — không chịu trách nhiệm về xe bị mất." }
    ]},
    { text: "BOOKSHOP — Buy two books and get one free. This week only.", qs: [
      { q: "Khuyến mãi của hiệu sách là gì?", ans: "Mua hai cuốn, tặng một cuốn", wrong: ["Mua một cuốn, tặng hai cuốn", "Giảm nửa giá mọi sách", "Tặng sách cho mọi khách"], ex: "Biển ghi 'Buy two books and get one free' — mua hai cuốn sách, được tặng một cuốn." },
      { q: "Khuyến mãi kéo dài bao lâu?", ans: "Chỉ trong tuần này", wrong: ["Cả tháng này", "Cả năm nay", "Chỉ hôm nay"], ex: "Biển ghi 'This week only' — chỉ áp dụng trong tuần này." }
    ]},
    { text: "HOSPITAL — Please wait here. The nurse will call your name.", qs: [
      { q: "Bệnh nhân được yêu cầu làm gì?", ans: "Đợi tại đây", wrong: ["Vào phòng khám ngay", "Đi mua thuốc", "Gọi y tá liên tục"], ex: "Biển ghi 'Please wait here' — hãy đợi ở đây." },
      { q: "Ai sẽ gọi tên bệnh nhân?", ans: "Y tá", wrong: ["Bác sĩ", "Bảo vệ", "Bệnh nhân khác"], ex: "Biển ghi 'The nurse will call your name' — y tá sẽ gọi tên bạn." }
    ]},
    { text: "BEACH — Swim only in the safe area. Watch children at all times.", qs: [
      { q: "Mọi người chỉ được bơi ở đâu?", ans: "Trong khu vực an toàn", wrong: ["Ở vùng nước sâu", "Gần thuyền đánh cá", "Bất cứ chỗ nào"], ex: "Biển ghi 'Swim only in the safe area' — chỉ bơi trong khu vực an toàn." },
      { q: "Người lớn phải luôn làm gì ở bãi biển?", ans: "Trông chừng trẻ em", wrong: ["Bơi thật xa bờ", "Thu dọn rác biển", "Chụp ảnh trẻ em"], ex: "Biển ghi 'Watch children at all times' — luôn trông chừng trẻ em." }
    ]}
  ];

  var PARAS = [
    { title: "A School Trip",
      text: "Last month, our class went on a school trip to Da Lat. We left school at five in the morning and travelled by bus. In Da Lat, we visited a flower garden and a famous lake. Our teacher told us stories about the city. At lunch, we ate sandwiches under tall pine trees. Everyone took photos and bought small gifts for their families. We came back home at nine in the evening, tired but very happy.",
      qs: [
        { q: "Where did the class go on the trip?", ans: "Da Lat", wrong: ["Hue", "Ha Long Bay", "Da Nang"], ex: "Đoạn văn nói lớp đi tham quan ở Da Lat." },
        { q: "How did the class travel?", ans: "By bus", wrong: ["By train", "By plane", "By bike"], ex: "Đoạn văn ghi 'travelled by bus' — đi bằng xe buýt." },
        { q: "What did they eat at lunch?", ans: "Sandwiches", wrong: ["Noodles", "Rice and fish", "Soup"], ex: "Bữa trưa họ ăn sandwiches dưới những cây thông." },
        { q: "When did they come back home?", ans: "At nine in the evening", wrong: ["At noon", "At six in the morning", "The next day"], ex: "Họ về nhà lúc 'nine in the evening' — 9 giờ tối." }
      ],
      idea: { q: "What is the passage mainly about?", ans: "A school trip of a class", wrong: ["How to grow flowers", "The history of a famous lake", "A family lunch"], ex: "Toàn đoạn kể về chuyến đi tham quan của một lớp học." },
      tf: [
        { stmt: "The class travelled by bus.", truth: true, ex: "Đúng: đoạn văn ghi 'travelled by bus'." },
        { stmt: "They visited a flower garden.", truth: true, ex: "Đúng: họ thăm một vườn hoa (flower garden)." },
        { stmt: "They ate sandwiches at lunch.", truth: true, ex: "Đúng: bữa trưa họ ăn sandwiches." },
        { stmt: "They left school at noon.", truth: false, ex: "Sai: họ rời trường lúc 5 giờ sáng, không phải buổi trưa." },
        { stmt: "The teacher bought gifts for everyone.", truth: false, ex: "Sai: học sinh tự mua quà cho gia đình mình, không phải cô giáo mua." },
        { stmt: "They came home early in the morning.", truth: false, ex: "Sai: họ về nhà lúc 9 giờ tối." }
      ],
      blanks: [
        { s: "The class went to ___ on a school trip.", ans: "Da Lat", wrong: ["Hue", "Da Nang", "Hanoi"], ex: "Đoạn văn nói chuyến đi đến Da Lat." },
        { s: "They travelled by ___.", ans: "bus", wrong: ["train", "plane", "bike"], ex: "Đoạn văn ghi 'travelled by bus'." }
      ],
      pairs: [["Trip destination", "Da Lat"], ["Transport", "Bus"], ["Lunch food", "Sandwiches"], ["Return time", "9 p.m."], ["Teacher told", "Stories about the city"]]
    },
    { title: "The New Library",
      text: "Our school has a new library on the second floor. It opened last Monday and students are very excited. There are long tables, soft chairs and hundreds of books in English and Vietnamese. Students can borrow two books for two weeks. The library is open from seven in the morning to five in the afternoon. Mrs Lan, the librarian, helps students find books and reminds them to keep the room quiet and tidy.",
      qs: [
        { q: "Where is the new library?", ans: "On the second floor", wrong: ["On the ground floor", "On the first floor", "On the third floor"], ex: "Đoạn văn ghi thư viện ở 'on the second floor' — tầng hai." },
        { q: "When did the library open?", ans: "Last Monday", wrong: ["Last Friday", "Next Monday", "Last year"], ex: "Thư viện 'opened last Monday' — mở cửa thứ Hai tuần trước." },
        { q: "How many books can a student borrow?", ans: "Two books", wrong: ["One book", "Three books", "Five books"], ex: "Học sinh được mượn 'two books for two weeks' — hai cuốn trong hai tuần." },
        { q: "Who helps students find books?", ans: "Mrs Lan", wrong: ["Mr Nam", "The principal", "A new teacher"], ex: "Mrs Lan, thủ thư (librarian), giúp học sinh tìm sách." }
      ],
      idea: { q: "What is the passage mainly about?", ans: "The new library at school", wrong: ["How to write a book", "Mrs Lan's family", "A reading competition"], ex: "Toàn đoạn giới thiệu thư viện mới của trường." },
      tf: [
        { stmt: "The library is on the second floor.", truth: true, ex: "Đúng: đoạn văn ghi rõ thư viện ở tầng hai." },
        { stmt: "Students can borrow two books.", truth: true, ex: "Đúng: mỗi học sinh mượn được hai cuốn sách." },
        { stmt: "The library is open until five in the afternoon.", truth: true, ex: "Đúng: thư viện mở đến 5 giờ chiều." },
        { stmt: "The library opened last Friday.", truth: false, ex: "Sai: thư viện mở vào thứ Hai tuần trước (last Monday)." },
        { stmt: "Students can keep books for a month.", truth: false, ex: "Sai: học sinh mượn sách trong hai tuần (two weeks), không phải một tháng." },
        { stmt: "Mrs Lan asks students to make a lot of noise.", truth: false, ex: "Sai: Mrs Lan nhắc học sinh giữ phòng yên lặng và gọn gàng." }
      ],
      blanks: [
        { s: "The new library is on the ___ floor.", ans: "second", wrong: ["first", "third", "fourth"], ex: "Đoạn văn ghi 'on the second floor'." },
        { s: "Students can borrow ___ books at a time.", ans: "two", wrong: ["one", "three", "four"], ex: "Đoạn văn ghi học sinh mượn 'two books'." }
      ],
      pairs: [["Library floor", "Second"], ["Opened", "Last Monday"], ["Books to borrow", "Two"], ["Open until", "5 p.m."], ["Librarian", "Mrs Lan"]]
    },
    { title: "My Uncle's Job",
      text: "My uncle Minh is a train driver. He starts work very early, sometimes at four in the morning. Before each trip, he checks the train carefully with his team. He drives passengers safely between cities and must watch signals all the time. The job is hard, but he loves it because he can see many places. On his days off, he stays at home and cooks for our family.",
      qs: [
        { q: "What is Uncle Minh's job?", ans: "A train driver", wrong: ["A bus driver", "A pilot", "A farmer"], ex: "Đoạn văn mở đầu: 'My uncle Minh is a train driver' — lái tàu." },
        { q: "When does he sometimes start work?", ans: "At four in the morning", wrong: ["At noon", "At four in the afternoon", "At midnight"], ex: "Anh ấy đôi khi bắt đầu làm lúc 'four in the morning' — 4 giờ sáng." },
        { q: "What does he do before each trip?", ans: "He checks the train", wrong: ["He buys tickets", "He sleeps for an hour", "He calls the passengers"], ex: "Trước mỗi chuyến, anh ấy kiểm tra tàu cẩn thận cùng đồng đội." },
        { q: "What does he do on his days off?", ans: "He cooks for the family", wrong: ["He drives more trains", "He visits many cities", "He checks signals"], ex: "Ngày nghỉ, anh ấy ở nhà và nấu ăn cho gia đình." }
      ],
      idea: { q: "What is the passage mainly about?", ans: "Uncle Minh's work as a train driver", wrong: ["How to cook family meals", "A trip between two cities", "Rules for train passengers"], ex: "Đoạn văn kể về công việc lái tàu của chú Minh." },
      tf: [
        { stmt: "Uncle Minh sometimes starts work at four in the morning.", truth: true, ex: "Đúng: đoạn văn ghi anh ấy đôi khi bắt đầu lúc 4 giờ sáng." },
        { stmt: "He checks the train before each trip.", truth: true, ex: "Đúng: trước mỗi chuyến anh ấy kiểm tra tàu cẩn thận." },
        { stmt: "He loves his job because he can see many places.", truth: true, ex: "Đúng: đó là lý do đoạn văn nêu cho việc anh ấy yêu công việc." },
        { stmt: "Uncle Minh drives a bus between cities.", truth: false, ex: "Sai: anh ấy lái tàu (train driver), không lái xe buýt." },
        { stmt: "He checks the train alone, without his team.", truth: false, ex: "Sai: anh ấy kiểm tra tàu cùng đồng đội (with his team)." },
        { stmt: "On his days off, he drives trains for his family.", truth: false, ex: "Sai: ngày nghỉ anh ấy ở nhà nấu ăn cho gia đình." }
      ],
      blanks: [
        { s: "Uncle Minh is a ___ driver.", ans: "train", wrong: ["bus", "plane", "truck"], ex: "Đoạn văn ghi anh ấy là 'a train driver'." },
        { s: "Before each trip, he checks the ___.", ans: "train", wrong: ["ticket", "map", "road"], ex: "Anh ấy kiểm tra tàu (checks the train) trước mỗi chuyến." }
      ],
      pairs: [["Uncle's name", "Minh"], ["Job", "Train driver"], ["Start time", "4 a.m."], ["Checks before trips", "The train"], ["Day-off activity", "Cooking"]]
    },
    { title: "A Football Match",
      text: "On Sunday, our school team played a football match against Green School. The game started at three o'clock. Our team scored the first goal after ten minutes, but Green School scored two goals before half time. In the second half, Nam kicked the ball into the net and made the score 2-2. In the last minute, our captain scored again. We won the match 3-2, and all the students cheered loudly.",
      qs: [
        { q: "Who did the school team play against?", ans: "Green School", wrong: ["Blue School", "Red School", "City School"], ex: "Đội trường đấu với Green School." },
        { q: "When did the game start?", ans: "At three o'clock", wrong: ["At two o'clock", "At four o'clock", "At noon"], ex: "Trận đấu bắt đầu lúc 'three o'clock' — 3 giờ." },
        { q: "Which team scored the first goal?", ans: "Our school team", wrong: ["Green School", "The referees' team", "No team scored"], ex: "Đoạn văn ghi đội trường 'scored the first goal after ten minutes'." },
        { q: "What was the final score?", ans: "3-2", wrong: ["2-2", "2-3", "3-0"], ex: "Kết quả cuối cùng: đội trường thắng 3-2." }
      ],
      idea: { q: "What is the passage mainly about?", ans: "An exciting school football match", wrong: ["How to become a captain", "Rules of football", "Green School's best players"], ex: "Toàn đoạn kể diễn biến một trận bóng đá của trường." },
      tf: [
        { stmt: "The match was on Sunday.", truth: true, ex: "Đúng: đoạn văn mở đầu 'On Sunday'." },
        { stmt: "Green School scored two goals before half time.", truth: true, ex: "Đúng: Green School ghi hai bàn trước giờ nghỉ." },
        { stmt: "The captain scored the last goal.", truth: true, ex: "Đúng: đội trưởng ghi bàn ở phút cuối." },
        { stmt: "The game started at noon.", truth: false, ex: "Sai: trận đấu bắt đầu lúc 3 giờ chiều." },
        { stmt: "Green School won the match.", truth: false, ex: "Sai: đội trường thắng 3-2." },
        { stmt: "The final score was 2-2.", truth: false, ex: "Sai: 2-2 chỉ là tỉ số tạm thời; kết quả cuối là 3-2." }
      ],
      blanks: [
        { s: "The match started at ___ o'clock.", ans: "three", wrong: ["two", "four", "five"], ex: "Đoạn văn ghi trận đấu bắt đầu lúc 'three o'clock'." },
        { s: "The final score was ___.", ans: "3-2", wrong: ["2-2", "2-3", "3-0"], ex: "Đội trường thắng với tỉ số 3-2." }
      ],
      pairs: [["Match day", "Sunday"], ["Start time", "3 p.m."], ["Opponent", "Green School"], ["Final score", "3-2"], ["Last scorer", "The captain"]]
    },
    { title: "The Village Market",
      text: "Every Sunday morning, a market opens in my village. Farmers bring fresh vegetables, fruit, eggs and flowers from their gardens. The market starts at five and is busiest at seven. My mother usually buys fish and bananas there. Prices are low, and people know each other well, so the market is friendly and noisy. By ten o'clock, most stalls are empty and farmers go home to rest.",
      qs: [
        { q: "When does the market open?", ans: "Every Sunday morning", wrong: ["Every Saturday morning", "Every Monday morning", "Every Friday evening"], ex: "Chợ họp 'every Sunday morning' — sáng Chủ nhật hằng tuần." },
        { q: "What do farmers bring to the market?", ans: "Fresh vegetables and fruit", wrong: ["Cars and phones", "Books and clothes", "Bikes and toys"], ex: "Nông dân mang rau tươi, trái cây, trứng và hoa từ vườn nhà." },
        { q: "When is the market busiest?", ans: "At seven", wrong: ["At five", "At ten", "At noon"], ex: "Chợ đông nhất lúc 'busiest at seven' — 7 giờ." },
        { q: "What does the writer's mother usually buy?", ans: "Fish and bananas", wrong: ["Meat and rice", "Eggs and flowers", "Bread and milk"], ex: "Mẹ tác giả thường mua cá và chuối (fish and bananas)." }
      ],
      idea: { q: "What is the passage mainly about?", ans: "A friendly Sunday market in a village", wrong: ["How farmers grow vegetables", "The writer's family meals", "Prices in city shops"], ex: "Đoạn văn tả phiên chợ Chủ nhật thân thiện ở làng." },
      tf: [
        { stmt: "The market starts at five.", truth: true, ex: "Đúng: chợ bắt đầu lúc 5 giờ." },
        { stmt: "Prices at the market are low.", truth: true, ex: "Đúng: đoạn văn ghi 'Prices are low'." },
        { stmt: "Farmers go home around ten o'clock.", truth: true, ex: "Đúng: đến 10 giờ, các sạp gần như trống và nông dân về nhà nghỉ." },
        { stmt: "The market opens every Saturday morning.", truth: false, ex: "Sai: chợ họp sáng Chủ nhật (Sunday)." },
        { stmt: "The writer's mother usually buys meat and rice.", truth: false, ex: "Sai: mẹ tác giả mua cá và chuối." },
        { stmt: "The market is quiet and empty at seven.", truth: false, ex: "Sai: 7 giờ là lúc chợ đông nhất, ồn ào và thân thiện." }
      ],
      blanks: [
        { s: "The market opens every ___ morning.", ans: "Sunday", wrong: ["Saturday", "Monday", "Friday"], ex: "Đoạn văn ghi chợ họp 'every Sunday morning'." },
        { s: "My mother usually buys fish and ___.", ans: "bananas", wrong: ["apples", "oranges", "grapes"], ex: "Mẹ tác giả mua cá và chuối (bananas)." }
      ],
      pairs: [["Market day", "Sunday"], ["Starts", "5 a.m."], ["Busiest time", "7 a.m."], ["Mother buys", "Fish and bananas"], ["Prices", "Low"]]
    },
    { title: "Learning English",
      text: "Hoa is learning English because she wants to travel and make friends from other countries. She studies for thirty minutes every morning. She listens to English songs, reads short stories and writes new words in a notebook. On Fridays, she speaks English with her classmates in the English club. Her teacher says her pronunciation is better than last year. Hoa believes that small practice every day is the secret to learning well.",
      qs: [
        { q: "Why is Hoa learning English?", ans: "To travel and make friends", wrong: ["To become a singer", "To pass one exam only", "To teach her classmates"], ex: "Hoa học tiếng Anh để đi du lịch và kết bạn với người nước ngoài." },
        { q: "How long does Hoa study every morning?", ans: "Thirty minutes", wrong: ["Ten minutes", "Twenty minutes", "Fifty minutes"], ex: "Mỗi sáng Hoa học 'thirty minutes' — 30 phút." },
        { q: "When does Hoa speak English in the club?", ans: "On Fridays", wrong: ["On Mondays", "On Sundays", "Every evening"], ex: "Hoa nói tiếng Anh ở câu lạc bộ vào thứ Sáu (on Fridays)." },
        { q: "What does Hoa write in her notebook?", ans: "New words", wrong: ["Songs", "Test scores", "Stories"], ex: "Hoa ghi từ mới (new words) vào vở." }
      ],
      idea: { q: "What is the passage mainly about?", ans: "How Hoa learns English every day", wrong: ["Hoa's English club friends", "An English exam at school", "Songs in English"], ex: "Đoạn văn kể cách Hoa học tiếng Anh mỗi ngày." },
      tf: [
        { stmt: "Hoa studies English for thirty minutes every morning.", truth: true, ex: "Đúng: đoạn văn ghi rõ 30 phút mỗi sáng." },
        { stmt: "Hoa reads short stories in English.", truth: true, ex: "Đúng: cô ấy đọc truyện ngắn tiếng Anh." },
        { stmt: "Hoa's pronunciation is better than last year.", truth: true, ex: "Đúng: giáo viên nói phát âm của Hoa tốt hơn năm ngoái." },
        { stmt: "Hoa studies English only on Fridays.", truth: false, ex: "Sai: cô ấy học mỗi sáng; thứ Sáu là ngày sinh hoạt câu lạc bộ." },
        { stmt: "Hoa writes songs in her notebook.", truth: false, ex: "Sai: cô ấy ghi từ mới vào vở, không ghi bài hát." },
        { stmt: "Hoa learns English only to pass exams.", truth: false, ex: "Sai: cô ấy học để đi du lịch và kết bạn quốc tế." }
      ],
      blanks: [
        { s: "Hoa studies for ___ minutes every morning.", ans: "thirty", wrong: ["ten", "twenty", "fifty"], ex: "Đoạn văn ghi 'thirty minutes' — 30 phút." },
        { s: "Hoa writes new ___ in a notebook.", ans: "words", wrong: ["songs", "scores", "letters"], ex: "Hoa ghi từ mới (new words) vào vở." }
      ],
      pairs: [["Learner", "Hoa"], ["Study time each morning", "30 minutes"], ["Club day", "Friday"], ["Writes in notebook", "New words"], ["Goal", "Travel and make friends"]]
    },
    { title: "A Rainy Holiday",
      text: "Last summer, we went to the beach for a holiday, but the weather was rainy. On the first day, strong wind and rain kept us inside the hotel. We played cards and watched films together. The next day was sunny, so we swam in the sea and built a big sand castle. In the evening, we ate seafood at a small restaurant near the beach. Although the holiday began badly, we all had a wonderful time.",
      qs: [
        { q: "Where did the family go for the holiday?", ans: "To the beach", wrong: ["To the mountains", "To a big city", "To a village"], ex: "Cả nhà đi nghỉ ở bãi biển (the beach)." },
        { q: "What was the weather like on the first day?", ans: "Windy and rainy", wrong: ["Sunny and hot", "Cold and snowy", "Cloudy but dry"], ex: "Ngày đầu có gió mạnh và mưa (strong wind and rain)." },
        { q: "What did they do on the sunny day?", ans: "Swam and built a sand castle", wrong: ["Played cards indoors", "Watched films all day", "Went home early"], ex: "Ngày nắng họ bơi ở biển và xây lâu đài cát." },
        { q: "Where did they eat in the evening?", ans: "At a small restaurant", wrong: ["At the hotel", "At home", "At the market"], ex: "Buổi tối họ ăn hải sản ở một nhà hàng nhỏ gần bãi biển." }
      ],
      idea: { q: "What is the passage mainly about?", ans: "A rainy but happy beach holiday", wrong: ["How to build a sand castle", "A small beach restaurant", "The weather last summer"], ex: "Đoạn văn kể kỳ nghỉ ở biển bắt đầu bằng mưa nhưng vẫn vui." },
      tf: [
        { stmt: "On the first day, they stayed inside the hotel.", truth: true, ex: "Đúng: gió và mưa khiến họ ở trong khách sạn ngày đầu." },
        { stmt: "The next day was sunny.", truth: true, ex: "Đúng: ngày hôm sau trời nắng." },
        { stmt: "They ate seafood in the evening.", truth: true, ex: "Đúng: buổi tối họ ăn hải sản ở nhà hàng nhỏ." },
        { stmt: "The weather was sunny on the first day.", truth: false, ex: "Sai: ngày đầu mưa và gió mạnh." },
        { stmt: "They built a sand castle inside the hotel.", truth: false, ex: "Sai: lâu đài cát được xây ở bãi biển vào ngày nắng." },
        { stmt: "They ate seafood at lunch time.", truth: false, ex: "Sai: họ ăn hải sản vào buổi tối, không phải bữa trưa." }
      ],
      blanks: [
        { s: "On the first day, they stayed inside the ___.", ans: "hotel", wrong: ["restaurant", "school", "tent"], ex: "Đoạn văn ghi họ ở trong khách sạn (inside the hotel)." },
        { s: "The next day, they swam in the ___.", ans: "sea", wrong: ["pool", "river", "lake"], ex: "Họ bơi ở biển (in the sea)." }
      ],
      pairs: [["Holiday place", "The beach"], ["First-day weather", "Rainy"], ["Indoor game", "Cards"], ["Next-day activity", "Swimming"], ["Evening food", "Seafood"]]
    },
    { title: "The Recycling Club",
      text: "The Recycling Club at our school has twenty members. Every Friday afternoon, members collect old paper, plastic bottles and cans around the school. They sort the materials into different boxes and sell them once a month. The money is used to buy trees for the school garden. Last month, the club planted ten trees. The head teacher praised the club because it keeps the school clean and teaches students to protect nature.",
      qs: [
        { q: "How many members does the club have?", ans: "Twenty", wrong: ["Ten", "Twelve", "Thirty"], ex: "Câu lạc bộ có 'twenty members' — 20 thành viên." },
        { q: "When do members collect old materials?", ans: "Every Friday afternoon", wrong: ["Every Monday morning", "Every Sunday afternoon", "Every Friday morning"], ex: "Thành viên thu gom vào chiều thứ Sáu hằng tuần." },
        { q: "What is the money used for?", ans: "To buy trees", wrong: ["To buy books", "To buy balls", "To buy uniforms"], ex: "Tiền bán phế liệu dùng để mua cây (buy trees) cho vườn trường." },
        { q: "How many trees did the club plant last month?", ans: "Ten", wrong: ["Five", "Twenty", "Twelve"], ex: "Tháng trước câu lạc bộ trồng 'ten trees' — 10 cây." }
      ],
      idea: { q: "What is the passage mainly about?", ans: "A club that recycles and plants trees", wrong: ["How to sell old paper", "The school garden flowers", "A praise from the head teacher"], ex: "Đoạn văn kể về câu lạc bộ tái chế và trồng cây của trường." },
      tf: [
        { stmt: "The club has twenty members.", truth: true, ex: "Đúng: đoạn văn ghi câu lạc bộ có 20 thành viên." },
        { stmt: "Members sort materials into different boxes.", truth: true, ex: "Đúng: họ phân loại vật liệu vào các thùng khác nhau." },
        { stmt: "The head teacher praised the club.", truth: true, ex: "Đúng: hiệu trưởng khen ngợi câu lạc bộ." },
        { stmt: "The club sells materials every day.", truth: false, ex: "Sai: họ bán mỗi tháng một lần (once a month)." },
        { stmt: "The money is used to buy books.", truth: false, ex: "Sai: tiền dùng để mua cây cho vườn trường." },
        { stmt: "The club planted ten trees last week.", truth: false, ex: "Sai: họ trồng 10 cây vào tháng trước (last month), không phải tuần trước." }
      ],
      blanks: [
        { s: "The club has ___ members.", ans: "twenty", wrong: ["ten", "thirty", "fifteen"], ex: "Đoạn văn ghi 'has twenty members'." },
        { s: "Members collect materials every ___ afternoon.", ans: "Friday", wrong: ["Monday", "Wednesday", "Saturday"], ex: "Họ thu gom vào chiều thứ Sáu (Friday afternoon)." }
      ],
      pairs: [["Members", "Twenty"], ["Collection day", "Friday"], ["Selling time", "Once a month"], ["Money buys", "Trees"], ["Trees planted", "Ten"]]
    }
  ];

  function fSignQ() {
    var s = enPick(SIGNS), it = enPick(s.qs);
    var q = enMCQ(it.q, it.ans, it.wrong, it.ex, { visual: enPassage(s.text) });
    return enTag(q, "fSignQ", s.text.slice(0, 18));
  }
  function paraQ(it, p) {
    var q = enMCQ(it.q, it.ans, it.wrong, it.ex, { visual: enPassage("<b>" + p.title + "</b><br>" + p.text) });
    return q;
  }
  function fParaDetail() {
    var p = enPick(PARAS), it = enPick(p.qs);
    return enTag(paraQ(it, p), "fParaDetail", p.title);
  }
  function fParaIdea() {
    var p = enPick(PARAS);
    return enTag(paraQ(p.idea, p), "fParaIdea", p.title);
  }
  function fParaBlank() {
    var p = enPick(PARAS), it = enPick(p.blanks);
    var q = enBlank("Đọc đoạn \"" + p.title + "\" và điền từ đúng: \"" + it.s + "\"", it.ans, it.wrong, it.ex,
      enPassage("<b>" + p.title + "</b><br>" + p.text));
    return enTag(q, "fParaBlank", p.title);
  }
  function fParaTF() {
    var p = enPick(PARAS);
    var q = makeTF(p.tf, "Đọc đoạn văn sau rồi phán đoán: \"" + p.text + "\" — Đúng hay sai?");
    return enTag(q, "fParaTF", p.title);
  }
  function fParaMatch() {
    var p = enPick(PARAS);
    var q = enMatch("Nối thông tin đúng theo đoạn \"" + p.title + "\":", p.pairs,
      "Theo đoạn \"" + p.title + "\": " + p.pairs.map(function (pr) { return pr[0] + " — " + pr[1]; }).join("; ") + ".");
    return enTag(q, "fParaMatch", p.title);
  }

  var topicRead = {
    id: "cd-en-thcs-read", emoji: "🪧", name: "Đọc hiểu: biển báo & đoạn văn",
    sub: "Dạng đọc KET/PET: biển báo, thông báo, đoạn ngắn",
    pools: {
      choose: [fSignQ, fParaDetail, fParaIdea],
      blank: [fParaBlank],
      match: [fParaMatch],
      games: [fParaTF]
    },
    knowledge: {
      notes: [
        "Biển báo/thông báo: đọc từ khoá ra lệnh (must, no, please, only) và số liệu (giờ, giá) — đáp án thường nằm nguyên trong biển.",
        "Đoạn văn: đọc câu hỏi trước, quay lại đoạn tìm từ khoá trùng khớp; đừng chọn đáp án chỉ vì 'nghe quen'.",
        "Câu hỏi ý chính hỏi TOÀN đoạn nói về điều gì — chọn đáp án bao quát, không chọn một chi tiết nhỏ.",
        "Câu đúng/sai theo đoạn: mệnh đề sai thường bị đổi một chi tiết (ngày, giờ, số lượng, người làm)."
      ],
      facts: [
        { q: "Biển \"No running\" ở bể bơi nghĩa là gì?", a: "Không được chạy", ex: "\"No + động từ -ing\" là câu cấm: No running = không được chạy." },
        { q: "Đoạn \"A School Trip\" kể về điều gì?", a: "Chuyến tham quan của một lớp học", ex: "Ý chính bao quát cả đoạn: lớp đi Da Lat, thăm vườn hoa, ăn trưa và trở về." }
      ],
      pairs: [["Please be quiet", "Hãy giữ yên lặng"], ["Return books on time", "Trả sách đúng hạn"], ["No phones", "Cấm dùng điện thoại"], ["Open 9 a.m. to 5 p.m.", "Mở cửa 9 giờ đến 17 giờ"], ["Buy two, get one free", "Mua hai, tặng một"]]
    }
  };

  /* ================================================================
     (4) VIẾT LẠI CÂU & TÌM LỖI SAI
     ================================================================ */
  var TRANSFORM = [
    { orig: "Nam wrote this letter.", ans: "This letter was written by Nam.", wrong: ["This letter is written by Nam.", "This letter was wrote by Nam.", "This letter written by Nam."], ex: "Bị động quá khứ đơn: was + written (phân từ của write); câu gốc ở quá khứ nên không dùng is." },
    { orig: "They built this school in 2010.", ans: "This school was built in 2010.", wrong: ["This school is built in 2010.", "This school was build in 2010.", "This school built in 2010 by them."], ex: "Bị động quá khứ: was built; build có phân từ là built." },
    { orig: "She cleans the room every day.", ans: "The room is cleaned every day.", wrong: ["The room was cleaned every day.", "The room is clean every day.", "The room cleaned every day by she."], ex: "'Every day' → bị động hiện tại: is cleaned." },
    { orig: "He is too young to drive a car.", ans: "He is so young that he cannot drive a car.", wrong: ["He is so young that he can drive a car.", "He is so young to drive a car.", "He is too young that he cannot drive."], ex: "Too…to (quá…không thể) đổi thành so…that + cannot với cùng nghĩa phủ định." },
    { orig: "She is tall. She can reach the shelf.", ans: "She is tall enough to reach the shelf.", wrong: ["She is tall enough reach the shelf.", "She is enough tall to reach the shelf.", "She is too tall to reach the shelf."], ex: "Enough đặt SAU tính từ: tall enough + to + động từ, nghĩa 'đủ cao để với tới kệ'." },
    { orig: "We stayed home because it rained.", ans: "We stayed home because of the rain.", wrong: ["We stayed home because of it rained.", "We stayed home because the rain of it.", "We stayed home because of rain heavily."], ex: "Because of + cụm danh từ (the rain); because of không đi với mệnh đề." },
    { orig: "Although he was tired, he worked on.", ans: "In spite of being tired, he worked on.", wrong: ["In spite of he was tired, he worked on.", "In spite of his tired, he worked on.", "Despite of being tired, he worked on."], ex: "In spite of + danh từ/-ing: 'being tired'; không có 'despite of'." },
    { orig: "He no longer smokes.", ans: "He used to smoke.", wrong: ["He use to smoke.", "He used to smoking.", "He is used to smoke."], ex: "'No longer' (không còn nữa) → used to + động từ nguyên thể: used to smoke." },
    { orig: "Lan said, \"I am busy.\"", ans: "Lan said that she was busy.", wrong: ["Lan said that she is busy.", "Lan said that I was busy.", "Lan said that she were busy."], ex: "Gián tiếp: lùi thì am → was, đổi I → she." },
    { orig: "No one in the class is taller than Nam.", ans: "Nam is the tallest in the class.", wrong: ["Nam is the taller in the class.", "Nam is most tall in the class.", "Nam is the tallest than everyone."], ex: "'Không ai cao hơn Nam' = Nam cao nhất lớp: the tallest (so sánh nhất, không dùng than)." },
    { orig: "This is the cheapest bag in the shop.", ans: "No bag in the shop is cheaper than this.", wrong: ["No bag in the shop is cheapest than this.", "No bags in shop cheaper this.", "This bag is cheaper shop than no."], ex: "'Rẻ nhất' đổi ngược thành so sánh hơn phủ định: No bag… is cheaper than this." },
    { orig: "Let's go to the cinema.", ans: "Shall we go to the cinema?", wrong: ["Shall we going to the cinema?", "Shall us go to the cinema?", "Shall we goes to the cinema?"], ex: "Let's… (rủ rê) = Shall we + động từ nguyên thể…?" },
    { orig: "Someone stole my bike last night.", ans: "My bike was stolen last night.", wrong: ["My bike is stolen last night.", "My bike was steal last night.", "My bike stolen last night."], ex: "Bị động quá khứ (last night): was stolen." },
    { orig: "They speak English here.", ans: "English is spoken here.", wrong: ["English spoken here by them.", "English is spoke here.", "English speaks here."], ex: "Bị động hiện tại: is spoken (phân từ của speak là spoken)." },
    { orig: "We will finish the work tomorrow.", ans: "The work will be finished tomorrow.", wrong: ["The work will finished tomorrow.", "The work will be finish tomorrow.", "The work is finished tomorrow."], ex: "Bị động tương lai: will be + phân từ (finished)." },
    { orig: "He was late because of the traffic.", ans: "He was late because the traffic was bad.", wrong: ["He was late because the traffic bad.", "He was late because of the traffic was bad.", "He was late because he traffic was bad."], ex: "Because + mệnh đề đầy đủ (the traffic was bad); because of chỉ đi với cụm danh từ." },
    { orig: "The tea is too hot to drink.", ans: "The tea is so hot that I cannot drink it.", wrong: ["The tea is so hot that I can drink it.", "The tea is so hot to drink it.", "The tea is too hot that I cannot drink."], ex: "Too…to đổi thành so…that + cannot, giữ nguyên nghĩa 'quá nóng nên không uống được'." },
    { orig: "He is too short to reach the top shelf.", ans: "He is not tall enough to reach the top shelf.", wrong: ["He is tall enough to reach the top shelf.", "He is enough tall to reach top shelf.", "He is not tall enough reach the top shelf."], ex: "'Quá thấp, không với tới' = not tall enough to… (đổi sang tính từ trái nghĩa + not…enough)." },
    { orig: "I no longer live in Hue.", ans: "I used to live in Hue.", wrong: ["I use to live in Hue.", "I used to living in Hue.", "I am used to live in Hue."], ex: "'Không còn sống ở Huế nữa' → used to live (thói quen quá khứ nay không còn)." },
    { orig: "He asked, \"Where is Lan?\"", ans: "He asked where Lan was.", wrong: ["He asked where was Lan.", "He asked where is Lan now.", "He asked where Lan is."], ex: "Câu hỏi gián tiếp: trật tự câu kể (Lan was) và lùi thì is → was." },
    { orig: "You must finish this today.", ans: "This must be finished today.", wrong: ["This must finished today.", "This must be finish today.", "This must is finished today."], ex: "Bị động với must: must be + phân từ (finished)." },
    { orig: "She has lost her keys.", ans: "Her keys have been lost.", wrong: ["Her keys has been lost.", "Her keys have lost by her.", "Her keys were lose yesterday."], ex: "Bị động hiện tại hoàn thành: have been + phân từ; 'her keys' số nhiều nên have." },
    { orig: "Despite the cold, they swam in the sea.", ans: "Although it was cold, they swam in the sea.", wrong: ["Although the cold, they swam in the sea.", "Despite it was cold, they swam in sea.", "Although they swam, it was cold sea."], ex: "Despite + cụm danh từ đổi thành Although + mệnh đề (it was cold)." },
    { orig: "Tom is 160 cm tall. Ben is 160 cm tall too.", ans: "Tom is as tall as Ben.", wrong: ["Tom is as tall than Ben.", "Tom so tall as Ben is now.", "Tom is tall as Ben."], ex: "Bằng nhau dùng as + tính từ + as: as tall as." },
    { orig: "A car is faster than a bike.", ans: "A bike is not as fast as a car.", wrong: ["A bike is not as fast than a car.", "A bike is not so faster as a car.", "A bike is as not fast as a car."], ex: "Đổi chiều so sánh: xe đạp 'not as fast as' ô tô (không nhanh bằng)." },
    { orig: "Let's visit the museum.", ans: "Why don't we visit the museum?", wrong: ["Why don't we visiting the museum?", "Why we don't visit the museum?", "Why don't us visit the museum?"], ex: "Gợi ý: Why don't we + động từ nguyên thể…? cùng nghĩa với Let's…" },
    { orig: "He went out. He wanted to buy bread.", ans: "He went out to buy bread.", wrong: ["He went out to buying bread.", "He went out for buy bread.", "He went out so that buy bread."], ex: "Mục đích dùng to + động từ: went out to buy bread." },
    { orig: "The boy is my friend. He lives near me.", ans: "The boy who lives near me is my friend.", wrong: ["The boy who live near me is my friend.", "The boy lives near me is my friend.", "The boy which lives near me is friend."], ex: "Mệnh đề quan hệ chỉ người dùng who; chủ ngữ số ít nên lives." }
  ];

  var ERROR = [
    { sent: "She don't like music.", wrongForm: "don't", ans: "doesn't", wrong: ["do", "aren't", "not"], ex: "Chủ ngữ She (số ít) phải dùng doesn't ở hiện tại đơn phủ định." },
    { sent: "He go to school by bus every day.", wrongForm: "go", ans: "goes", wrong: ["going", "gone", "to go"], ex: "'Every day' → hiện tại đơn; chủ ngữ He số ít nên go → goes." },
    { sent: "They was happy yesterday.", wrongForm: "was", ans: "were", wrong: ["is", "be", "being"], ex: "Chủ ngữ They số nhiều ở quá khứ phải dùng were." },
    { sent: "I can speaks English well.", wrongForm: "speaks", ans: "speak", wrong: ["speaking", "spoke", "to speaks"], ex: "Sau động từ khuyết thiếu can dùng động từ nguyên thể: can speak." },
    { sent: "This bag is more cheaper than that one.", wrongForm: "more cheaper", ans: "cheaper", wrong: ["cheapest", "cheap", "the cheaper"], ex: "Cheaper đã là so sánh hơn, không thêm more; câu có 'than' nên không dùng cheapest." },
    { sent: "He is the most tallest boy in the class.", wrongForm: "most tallest", ans: "tallest", wrong: ["taller", "tall", "most tall"], ex: "Tallest đã là so sánh nhất (có 'the…in the class'), không thêm most." },
    { sent: "He bought an books yesterday.", wrongForm: "an", ans: "some", wrong: ["a", "one", "an"], ex: "Danh từ số nhiều 'books' không đi với a/an/one; dùng 'some books'." },
    { sent: "She was born in 12 May 2010.", wrongForm: "in", ans: "on", wrong: ["at", "by", "from"], ex: "Trước ngày tháng cụ thể (12 May) dùng giới từ on." },
    { sent: "We go to school on bus.", wrongForm: "on", ans: "by", wrong: ["in", "at", "with"], ex: "Phương tiện đi lại dùng by: by bus, by train." },
    { sent: "Three childs are playing in the yard.", wrongForm: "childs", ans: "children", wrong: ["child", "childes", "childrens"], ex: "Số nhiều bất quy tắc: child → children (không thêm -s)." },
    { sent: "I saw two mans at the gate.", wrongForm: "mans", ans: "men", wrong: ["man", "mens", "manes"], ex: "Số nhiều bất quy tắc: man → men." },
    { sent: "This book is me, not yours.", wrongForm: "me", ans: "mine", wrong: ["my", "I", "myself"], ex: "Đại từ sở hữu đứng một mình: mine (của tôi); my phải đi kèm danh từ." },
    { sent: "This is her book, and that is he book.", wrongForm: "he", ans: "his", wrong: ["him", "himself", "he's"], ex: "Trước danh từ book cần tính từ sở hữu: his book." },
    { sent: "Yesterday, I see a very good film.", wrongForm: "see", ans: "saw", wrong: ["seen", "sees", "seeing"], ex: "'Yesterday' → quá khứ đơn; quá khứ của see là saw." },
    { sent: "She has ate her lunch.", wrongForm: "ate", ans: "eaten", wrong: ["eat", "eating", "eats"], ex: "Sau has phải dùng phân từ: eaten (eat – ate – eaten)." },
    { sent: "You must finishes this work today.", wrongForm: "finishes", ans: "finish", wrong: ["finishing", "finished", "to finishes"], ex: "Sau must dùng động từ nguyên thể: must finish." },
    { sent: "He is more strong than his brother.", wrongForm: "more strong", ans: "stronger", wrong: ["strong", "strongest", "the strong"], ex: "Tính từ ngắn strong thêm -er khi so sánh hơn: stronger." },
    { sent: "I am good in English.", wrongForm: "in", ans: "at", wrong: ["on", "of", "about"], ex: "Cụm cố định: good at (giỏi về…); trái nghĩa là bad at." },
    { sent: "The list of names are very long.", wrongForm: "are", ans: "is", wrong: ["were", "be", "being"], ex: "Chủ ngữ chính là 'The list' (số ít), không phải 'names', nên dùng is." },
    { sent: "I decided studying harder this term.", wrongForm: "studying", ans: "to study", wrong: ["studies", "study", "studied"], ex: "Sau decide dùng to + động từ: decided to study." },
    { sent: "She enjoys to read books.", wrongForm: "to read", ans: "reading", wrong: ["read", "reads", "to reading"], ex: "Sau enjoys dùng động từ -ing: enjoys reading." },
    { sent: "How many money do you have?", wrongForm: "many", ans: "much", wrong: ["more", "few", "a lot"], ex: "Money là danh từ không đếm được nên dùng How much, không dùng many." },
    { sent: "He goed home early yesterday.", wrongForm: "goed", ans: "went", wrong: ["goes", "gone", "going"], ex: "Go là động từ bất quy tắc: quá khứ là went, không có 'goed'." },
    { sent: "They has finished the game.", wrongForm: "has", ans: "have", wrong: ["is", "be", "being"], ex: "Chủ ngữ They số nhiều dùng trợ động từ have ở hiện tại hoàn thành." },
    { sent: "She is the most kind girl in the class.", wrongForm: "most kind", ans: "kindest", wrong: ["kinder", "kind", "most kinder"], ex: "Tính từ ngắn kind có so sánh nhất là kindest (the…in the class)." }
  ];

  var REWRITE_TF = [
    { stmt: "Hai câu có cùng nghĩa: \"Nam wrote this letter.\" — \"This letter was written by Nam.\"", truth: true, ex: "Đúng: câu thứ hai là bị động của câu thứ nhất, cùng nghĩa." },
    { stmt: "Hai câu có cùng nghĩa: \"The tea is too hot to drink.\" — \"The tea is so hot that I cannot drink it.\"", truth: true, ex: "Đúng: too…to đổi thành so…that + cannot, nghĩa không đổi." },
    { stmt: "Hai câu có cùng nghĩa: \"Let's go to the cinema.\" — \"Shall we go to the cinema?\"", truth: true, ex: "Đúng: cả hai đều là lời rủ đi xem phim." },
    { stmt: "Hai câu có cùng nghĩa: \"No one in the class is taller than Nam.\" — \"Nam is the tallest in the class.\"", truth: true, ex: "Đúng: không ai cao hơn Nam nghĩa là Nam cao nhất lớp." },
    { stmt: "Hai câu có cùng nghĩa: \"We stayed home because it rained.\" — \"We stayed home because of the rain.\"", truth: true, ex: "Đúng: because + mệnh đề đổi thành because of + cụm danh từ." },
    { stmt: "Hai câu có cùng nghĩa: \"He no longer smokes.\" — \"He used to smoke.\"", truth: true, ex: "Đúng: 'không còn hút thuốc nữa' = trước đây từng hút (used to)." },
    { stmt: "Hai câu có cùng nghĩa: \"The book was written by Nam.\" — \"Nam wrote the book.\"", truth: true, ex: "Đúng: bị động và chủ động tương ứng, cùng một sự việc." },
    { stmt: "Hai câu có cùng nghĩa: \"Tom is as tall as Ben.\" — \"Tom and Ben are the same height.\"", truth: true, ex: "Đúng: as tall as = cùng chiều cao (the same height)." },
    { stmt: "Hai câu có cùng nghĩa: \"She cleans the room every day.\" — \"The room was cleaned every day.\"", truth: false, ex: "Sai: câu gốc ở hiện tại (cleans, every day) nhưng câu đổi lại dùng was cleaned (quá khứ)." },
    { stmt: "Hai câu có cùng nghĩa: \"He is too young to drive.\" — \"He is old enough to drive.\"", truth: false, ex: "Sai: nghĩa trái ngược — 'quá trẻ không lái được' khác 'đủ lớn để lái'." },
    { stmt: "Hai câu có cùng nghĩa: \"Although he was tired, he worked on.\" — \"He was tired, so he stopped working.\"", truth: false, ex: "Sai: câu gốc nói anh ấy vẫn làm tiếp dù mệt; câu hai nói anh ấy nghỉ làm." },
    { stmt: "Hai câu có cùng nghĩa: \"Tom is taller than Ben.\" — \"Ben is taller than Tom.\"", truth: false, ex: "Sai: chiều so sánh bị đảo ngược." },
    { stmt: "Hai câu có cùng nghĩa: \"She has lived here since 2020.\" — \"She left here in 2020.\"", truth: false, ex: "Sai: câu gốc là sống ở đây từ 2020 đến nay; câu hai là rời đi năm 2020." },
    { stmt: "Hai câu có cùng nghĩa: \"If it rains, I will stay at home.\" — \"If it rained, I would stay at home.\"", truth: false, ex: "Sai: loại 1 (khả năng thật) khác loại 2 (giả định) về nghĩa." },
    { stmt: "Hai câu có cùng nghĩa: \"I enjoy reading books.\" — \"I hate reading books.\"", truth: false, ex: "Sai: enjoy (thích) trái nghĩa với hate (ghét)." },
    { stmt: "Hai câu có cùng nghĩa: \"He must finish the work today.\" — \"He can finish the work today.\"", truth: false, ex: "Sai: must là bắt buộc phải làm; can chỉ là có thể làm." }
  ];

  function fRewrite() {
    var it = enPick(TRANSFORM);
    var q = enMCQ("Chọn câu viết lại ĐÚNG, giữ nguyên nghĩa của câu: \"" + it.orig + "\"", it.ans, it.wrong, it.ex, {});
    return enTag(q, "fRewrite", it.ans);
  }
  function fErrorFix() {
    var it = enPick(ERROR);
    var q = enMCQ("Câu sau có một lỗi sai: \"" + it.sent + "\" Chọn từ đúng thay cho \"" + it.wrongForm + "\".",
      it.ans, it.wrong, it.ex, {});
    return enTag(q, "fErrorFix", it.wrongForm);
  }
  function fErrorBlank() {
    var it = enPick(ERROR);
    var q = enBlank("Câu có lỗi: \"" + it.sent + "\" Điền dạng đúng thay cho \"" + it.wrongForm + "\".",
      it.ans, it.wrong, it.ex);
    return enTag(q, "fErrorBlank", it.wrongForm);
  }
  function fTFRewrite() {
    var q = makeTF(REWRITE_TF, "Hai câu có cùng nghĩa không? Đúng hay sai?");
    return enTag(q, "fTFRewrite", "mean");
  }

  var topicRewrite = {
    id: "cd-en-thcs-rewrite", emoji: "🔁", name: "Viết lại câu & tìm lỗi sai",
    sub: "Giữ nguyên nghĩa, sửa lỗi ngữ pháp",
    pools: {
      choose: [fRewrite, fErrorFix],
      blank: [fErrorBlank],
      match: [],
      games: [fTFRewrite]
    },
    knowledge: {
      notes: [
        "Viết lại câu: kiểm tra 3 điểm — thì có giữ nguyên không, nghĩa có bị đảo không, cấu trúc mới có đúng mẫu không.",
        "Too…to (quá…không thể) ↔ so…that + cannot; đủ…để → tính từ + enough + to (enough đứng sau tính từ).",
        "Because đi với mệnh đề; because of đi với cụm danh từ — lỗi hay gặp là trộn hai mẫu này.",
        "Tìm lỗi sai: kiểm tra lần lượt hoà hợp chủ–vị, thì, dạng sau modal (can/must + nguyên thể), so sánh và giới từ cố định."
      ],
      facts: [
        { q: "Viết lại bị động: \"Nam wrote this letter.\"", a: "This letter was written by Nam.", ex: "Tân ngữ 'this letter' lên đầu; quá khứ bị động: was + written." },
        { q: "Sửa lỗi: \"She don't like music.\"", a: "She doesn't like music.", ex: "Chủ ngữ She số ít dùng doesn't ở phủ định hiện tại đơn." }
      ],
      pairs: [["too…to", "so…that + cannot"], ["because + mệnh đề", "because of + danh từ"], ["although + mệnh đề", "in spite of + danh từ/-ing"], ["tính từ + enough", "đủ…để làm gì"], ["used to", "đã từng (nay không còn)"], ["as…as", "bằng nhau"]]
    }
  };

  /* ================================================================
     (5) HỘI THOẠI GIAO TIẾP & NGHE
     ================================================================ */
  var FUNC = [
    { cue: "Thank you very much.", ans: "You're welcome.", wrong: ["Goodbye for now.", "I'm sorry to hear that.", "See you later."], ex: "Khi ai cảm ơn, đáp lịch sự là 'You're welcome' (không có gì).",
      t: "Nghe \"Thank you very much\" thì đáp \"You're welcome\" là lịch sự và đúng.", f: "Nghe \"Thank you very much\" thì đáp \"Goodbye\" là cách đáp lại lời cảm ơn đúng nhất." },
    { cue: "I'm sorry I'm late.", ans: "That's OK. Don't worry.", wrong: ["You're welcome.", "Happy birthday!", "Good luck with it!"], ex: "Ai xin lỗi vì đến muộn, ta đáp 'That's OK. Don't worry' (không sao đâu) để bỏ qua.",
      t: "Nghe lời xin lỗi đến muộn, đáp \"That's OK. Don't worry\" là phù hợp.", f: "Nghe lời xin lỗi đến muộn, đáp \"Happy birthday\" là phù hợp nhất." },
    { cue: "Congratulations on passing the exam!", ans: "Thank you very much.", wrong: ["I'm sorry to hear that.", "Good night, sleep well.", "You're welcome."], ex: "Được chúc mừng thì đáp lại bằng lời cảm ơn: 'Thank you very much.'",
      t: "Được chúc mừng thi đỗ, đáp \"Thank you very much\" là đúng và lịch sự.", f: "Được chúc mừng thi đỗ, đáp \"I'm sorry to hear that\" là phù hợp nhất." },
    { cue: "Good luck with your test tomorrow!", ans: "Thank you. I'll try my best.", wrong: ["You're welcome.", "I'm eleven years old.", "Yes, please, thanks."], ex: "Được chúc may mắn, đáp 'Thank you. I'll try my best' (cảm ơn, mình sẽ cố hết sức).",
      t: "Được chúc may mắn trước kỳ thi, đáp cảm ơn và hứa cố gắng là phù hợp.", f: "Được chúc may mắn, đáp \"I'm eleven years old\" là phù hợp nhất." },
    { ctx: "Bạn đang khát.", cue: "Would you like some tea?", ans: "Yes, please. Thank you.", wrong: ["No, I'm not thirsty.", "I'm twelve years old.", "It's Monday today."], ex: "Đang khát và được mời trà, nhận lời lịch sự: 'Yes, please. Thank you.'",
      t: "Đang khát, được mời trà thì đáp \"Yes, please\" là nhận lời phù hợp.", f: "Đang khát, được mời trà thì đáp \"I'm twelve years old\" là phù hợp nhất." },
    { ctx: "Bạn đã ăn no.", cue: "Would you like some more cake?", ans: "No, thanks. I'm full.", wrong: ["Yes, please. I'm hungry.", "It's over there, thanks.", "Two pieces, I'm empty."], ex: "Đã no, từ chối lịch sự: 'No, thanks. I'm full' (không, cảm ơn, mình no rồi).",
      t: "Đã ăn no, từ chối thêm bánh bằng \"No, thanks. I'm full\" là lịch sự và đúng.", f: "Đã ăn no, đáp \"Yes, please. I'm hungry\" là phù hợp nhất với tình huống." },
    { ctx: "Chiều nay bạn rảnh.", cue: "Can you come to my birthday party this afternoon?", ans: "I'd love to. Thanks.", wrong: ["I'm in class 7A.", "It's raining today.", "The party is far."], ex: "Rảnh và được mời dự tiệc, nhận lời: 'I'd love to. Thanks' (mình rất muốn, cảm ơn).",
      t: "Được mời dự tiệc khi đang rảnh, đáp \"I'd love to\" là nhận lời đúng.", f: "Được mời dự tiệc, đáp \"I'm in class 7A\" là câu nhận lời phù hợp nhất." },
    { ctx: "Tối nay bạn bận học bài.", cue: "Can you come to the cinema tonight?", ans: "I'd love to, but I'm busy tonight.", wrong: ["Yes, I can come at once.", "I'm free all evening.", "The cinema is new."], ex: "Bận, từ chối lịch sự bằng mẫu 'I'd love to, but…' (rất muốn nhưng mình bận).",
      t: "Bận tối nay, từ chối bằng \"I'd love to, but I'm busy\" là lịch sự và hợp tình huống.", f: "Bận tối nay, đáp \"I'm free all evening\" là phù hợp nhất với tình huống." },
    { cue: "Can I help you?", ans: "Yes. I'm looking for a notebook.", wrong: ["No, I don't help you.", "The shop is big.", "Help is a good word."], ex: "Nhân viên hỏi 'Can I help you?', khách trả lời nhu cầu: 'I'm looking for a notebook' (tôi đang tìm một cuốn vở).",
      t: "Ở cửa hàng, nghe \"Can I help you?\" thì nêu thứ mình tìm là phù hợp.", f: "Ở cửa hàng, nghe \"Can I help you?\" thì đáp \"The shop is big\" là phù hợp nhất." },
    { cue: "Could you open the window, please?", ans: "Sure, of course.", wrong: ["It's hot today.", "The window is big.", "Thank you very much."], ex: "Được nhờ mở cửa sổ, đồng ý giúp: 'Sure, of course' (được chứ, tất nhiên rồi).",
      t: "Được nhờ việc nhỏ, đáp \"Sure, of course\" là đồng ý giúp, phù hợp.", f: "Được nhờ mở cửa sổ, đáp \"The window is big\" là câu đồng ý giúp phù hợp nhất." },
    { ctx: "Bạn có một cây bút dự phòng.", cue: "May I borrow your pen?", ans: "Sure. Here you are.", wrong: ["Sorry, I have no pen.", "No, you may not.", "Not now, I'm busy."], ex: "Cho mượn đồ, đáp 'Sure. Here you are' (được chứ, của bạn đây)." ,
      t: "Cho bạn mượn bút, đáp \"Sure. Here you are\" khi đưa bút là đúng và tự nhiên.", f: "Có bút dự phòng mà đáp \"Sorry, I have no pen\" khi bạn mượn là phù hợp nhất với tình huống." },
    { ctx: "Điện thoại của bạn đã hết pin.", cue: "Can I use your phone?", ans: "I'm sorry, its battery is empty.", wrong: ["Sure, here you are.", "Yes, take my phone.", "Of course, it's full."], ex: "Không cho mượn được, giải thích lịch sự: điện thoại hết pin (its battery is empty).",
      t: "Điện thoại hết pin, từ chối cho mượn kèm lý do hết pin là phù hợp.", f: "Điện thoại hết pin, đáp \"Of course, it's full\" là hợp tình huống nhất." },
    { cue: "Let's go to the park this afternoon.", ans: "That's a good idea.", wrong: ["You're welcome.", "I'm sorry to hear that.", "Good luck with it!"], ex: "Đồng ý với lời gợi ý: 'That's a good idea' (ý kiến hay đấy).",
      t: "Nghe gợi ý đi công viên, đáp \"That's a good idea\" là tỏ ý đồng tình, phù hợp.", f: "Nghe gợi ý đi công viên, đáp \"I'm sorry to hear that\" là tỏ ý đồng tình phù hợp nhất." },
    { ctx: "Ngoài trời đang mưa rất to.", cue: "Shall we play football outside now?", ans: "I don't think so. It's raining hard.", wrong: ["Great idea! Let's go out now.", "Yes, the rain helps us play.", "Of course, no problem at all."], ex: "Trời mưa to, phản đối nhẹ nhàng: 'I don't think so' kèm lý do thời tiết.",
      t: "Trời mưa to, đáp \"I don't think so. It's raining hard\" trước gợi ý đá bóng ngoài trời là hợp lý.", f: "Trời mưa to, đáp \"Great idea! Let's go out now\" là hợp lý nhất với tình huống." },
    { cue: "Excuse me, where is the library?", ans: "It's next to the school office.", wrong: ["It's ten o'clock now.", "I'm a new student.", "Yes, I like books."], ex: "Hỏi đường đến thư viện thì chỉ vị trí: 'next to the school office' (cạnh văn phòng trường).",
      t: "Được hỏi thư viện ở đâu, chỉ vị trí \"next to the school office\" là trả lời đúng trọng tâm.", f: "Được hỏi thư viện ở đâu, đáp \"It's ten o'clock\" là trả lời đúng trọng tâm nhất." },
    { cue: "How much is this bag?", ans: "It's fifty thousand dong.", wrong: ["It's my favourite bag.", "It's bigger than yours.", "I bought it yesterday."], ex: "Hỏi giá (How much) thì trả lời giá: 'fifty thousand dong' (năm mươi nghìn đồng).",
      t: "Nghe câu hỏi giá \"How much is this bag?\", nêu giá tiền là trả lời đúng trọng tâm.", f: "Nghe câu hỏi giá, đáp \"I bought it yesterday\" là trả lời đúng trọng tâm nhất." },
    { cue: "How are you today?", ans: "I'm fine, thank you.", wrong: ["I'm eleven years old.", "I'm from Hue city.", "It's sunny today."], ex: "Câu chào hỏi sức khoẻ 'How are you?' đáp 'I'm fine, thank you.'",
      t: "Nghe \"How are you today?\", đáp \"I'm fine, thank you\" là đúng mẫu chào hỏi.", f: "Nghe \"How are you today?\", đáp \"I'm from Hue city\" là đúng mẫu chào hỏi nhất." },
    { cue: "This is my friend, Lan.", ans: "Nice to meet you, Lan.", wrong: ["Goodbye for now, Lan.", "I'm sorry, Lan.", "Good luck, Lan!"], ex: "Khi được giới thiệu bạn mới, chào: 'Nice to meet you' (rất vui được gặp bạn).",
      t: "Được giới thiệu bạn mới, chào \"Nice to meet you\" là lịch sự và đúng.", f: "Được giới thiệu bạn mới, chào \"Goodbye for now\" là phù hợp nhất." },
    { cue: "See you tomorrow!", ans: "See you! Bye.", wrong: ["Good morning to you.", "Welcome to school.", "Thanks a lot for it."], ex: "Tạm biệt hẹn mai gặp: đáp lại 'See you! Bye.'",
      t: "Nghe \"See you tomorrow!\", đáp lại \"See you! Bye\" là phù hợp.", f: "Nghe \"See you tomorrow!\", đáp \"Welcome to school\" là phù hợp nhất." },
    { cue: "I have a terrible headache today.", ans: "I'm sorry to hear that. Take a rest.", wrong: ["Congratulations on it!", "Good luck with it!", "You're welcome."], ex: "Nghe tin không vui, chia buồn: 'I'm sorry to hear that' và khuyên nghỉ ngơi.",
      t: "Bạn kêu đau đầu, đáp chia buồn và khuyên nghỉ ngơi là phù hợp, quan tâm.", f: "Bạn kêu đau đầu, đáp \"Congratulations on it\" là phù hợp nhất." },
    { cue: "Could you speak more slowly, please?", ans: "Of course, no problem.", wrong: ["I speak very fast.", "Slowly is a word.", "You speak slowly too."], ex: "Được yêu cầu nói chậm lại, đồng ý: 'Of course, no problem.'",
      t: "Được nhờ nói chậm lại, đáp \"Of course, no problem\" là đồng ý phù hợp.", f: "Được nhờ nói chậm lại, đáp \"Slowly is a word\" là câu đồng ý phù hợp nhất." },
    { ctx: "Bạn cũng rất thích đọc sách.", cue: "I think reading is fun. What about you?", ans: "I agree. I love reading.", wrong: ["I don't like books at all.", "Reading is boring to me.", "I never read anything."], ex: "Cùng quan điểm thì nói 'I agree' (mình đồng ý) và nói rõ mình cũng thích đọc.",
      t: "Cùng thích đọc sách, đáp \"I agree. I love reading\" là thể hiện đồng ý đúng.", f: "Cùng thích đọc sách, đáp \"Reading is boring to me\" là thể hiện đồng ý phù hợp nhất." },
    { ctx: "Bạn thấy môn toán khá khó.", cue: "I think maths is very easy.", ans: "I'm not sure. It's hard for me.", wrong: ["I agree completely.", "Yes, maths is the easiest.", "You're right, it's easy."], ex: "Không đồng ý một cách lịch sự: 'I'm not sure' + ý kiến của mình.",
      t: "Thấy toán khó, đáp \"I'm not sure. It's hard for me\" là không đồng ý lịch sự.", f: "Thấy toán khó, đáp \"I agree completely\" là thể hiện không đồng ý phù hợp nhất." },
    { ctx: "Bạn rảnh vào lúc 5 giờ chiều.", cue: "Can we meet at five this afternoon?", ans: "Yes, five is fine for me.", wrong: ["No, I'm busy at five.", "It's five kilometres away.", "I get up at five daily."], ex: "Chốt giờ hẹn phù hợp: 'five is fine for me' (5 giờ thì mình rảnh/ổn).",
      t: "Hẹn gặp lúc 5 giờ khi đang rảnh, đáp \"Yes, five is fine for me\" là chốt hẹn đúng.", f: "Hẹn gặp lúc 5 giờ khi đang rảnh, đáp \"No, I'm busy at five\" là chốt hẹn phù hợp nhất." },
    { cue: "Excuse me, can you tell me the time?", ans: "It's three o'clock.", wrong: ["It's a sunny day.", "I'm a student here.", "The clock is new."], ex: "Hỏi giờ (tell me the time) thì trả lời giờ: 'It's three o'clock.'",
      t: "Được hỏi giờ, đáp \"It's three o'clock\" là trả lời đúng trọng tâm.", f: "Được hỏi giờ, đáp \"The clock is new\" là trả lời đúng trọng tâm nhất." },
    { cue: "Happy birthday to you!", ans: "Thank you very much.", wrong: ["I'm sorry to hear that.", "You're welcome.", "Good night, sleep well."], ex: "Được chúc mừng sinh nhật, đáp lại lời cảm ơn.",
      t: "Được chúc mừng sinh nhật, đáp \"Thank you very much\" là lịch sự và đúng.", f: "Được chúc mừng sinh nhật, đáp \"Good night, sleep well\" là phù hợp nhất." },
    { ctx: "Bạn chính là Lan đang nghe điện thoại.", cue: "Hello, can I speak to Lan, please?", ans: "Speaking. Who's calling?", wrong: ["Lan is not here now.", "Please call her later.", "I'm not Lan at all."], ex: "Nghe điện thoại và mình chính là người cần gặp: 'Speaking' (tôi đang nghe đây).",
      t: "Mình là Lan, nghe \"can I speak to Lan?\" thì đáp \"Speaking\" là đúng tình huống.", f: "Mình là Lan, đáp \"Lan is not here now\" là đúng tình huống nhất." }
  ];

  var FUNC_BLANK = [
    { cue: "Thank you very much.", s: "You're ___.", ans: "welcome", wrong: ["sorry", "late", "fine"], ex: "Đáp lại lời cảm ơn: 'You're welcome'." },
    { cue: "I'm sorry I'm late.", s: "That's ___. Don't worry.", ans: "OK", wrong: ["welcome", "birthday", "luck"], ex: "Đáp lại lời xin lỗi: 'That's OK' (không sao đâu)." },
    { cue: "Can you come to my party?", s: "I'd ___ to. Thanks.", ans: "love", wrong: ["busy", "sorry", "fine"], ex: "Nhận lời mời: 'I'd love to' (mình rất muốn)." },
    { cue: "Would you like some tea?", s: "Yes, ___. Thank you.", ans: "please", wrong: ["welcome", "sorry", "late"], ex: "Nhận lời mời lịch sự: 'Yes, please.'" },
    { cue: "See you tomorrow!", s: "___ you! Bye.", ans: "See", wrong: ["Meet", "Watch", "Hear"], ex: "Câu chào hẹn gặp lại: 'See you!'" },
    { ctx: "Lần đầu gặp Lan.", cue: "This is my friend, Lan.", s: "Nice to ___ you, Lan.", ans: "meet", wrong: ["look", "know", "hear"], ex: "Lần đầu gặp mặt dùng 'Nice to meet you'." },
    { cue: "I have a terrible headache.", s: "I'm sorry to ___ that.", ans: "hear", wrong: ["say", "tell", "look"], ex: "Mẫu chia buồn: 'I'm sorry to hear that'." },
    { cue: "Let's go to the park.", s: "That's a good ___.", ans: "idea", wrong: ["luck", "welcome", "sorry"], ex: "Đồng ý với gợi ý: 'That's a good idea'." },
    { cue: "May I borrow your pen?", s: "Sure. Here you ___.", ans: "are", wrong: ["is", "am", "be"], ex: "Khi đưa đồ cho ai: 'Here you are'." },
    { ctx: "Bạn rảnh lúc 5 giờ.", cue: "Can we meet at five?", s: "Yes, five is ___ for me.", ans: "fine", wrong: ["welcome", "sorry", "late"], ex: "Chốt giờ hẹn: 'five is fine for me' (5 giờ ổn với mình)." },
    { cue: "Good luck with your test!", s: "Thank you. I'll try my ___.", ans: "best", wrong: ["good", "fine", "welcome"], ex: "Cụm cố định: 'try my best' (cố hết sức)." },
    { ctx: "Bạn đã ăn no.", cue: "Would you like more cake?", s: "No, thanks. I'm ___.", ans: "full", wrong: ["hungry", "thirsty", "welcome"], ex: "Từ chối vì đã no: 'I'm full'." }
  ];

  var LISTEN = [
    { transcript: "Attention, students. The English club will meet at four o'clock on Friday in room 12.", q: "When will the English club meet?", ans: "At four on Friday", wrong: ["At four on Monday", "At five on Friday", "At four on Sunday"], ex: "Thông báo nói câu lạc bộ họp lúc 4 giờ thứ Sáu (four o'clock on Friday)." },
    { transcript: "Tom: Hello, can I speak to Mai? Ana: Sorry, she is out at the moment.", q: "Who is not at home now?", ans: "Mai", wrong: ["Tom", "Ana", "The teacher"], ex: "Ana nói Mai đang ra ngoài (she is out) — người vắng mặt là Mai." },
    { transcript: "Customer: How much is this notebook? Assistant: It is twenty thousand dong.", q: "How much is the notebook?", ans: "Twenty thousand dong", wrong: ["Ten thousand dong", "Twelve thousand dong", "Fifty thousand dong"], ex: "Người bán nói cuốn vở giá 'twenty thousand dong' — hai mươi nghìn đồng." },
    { transcript: "The train to Da Nang will leave at 6.15 from platform 3.", q: "Which platform does the train leave from?", ans: "Platform 3", wrong: ["Platform 2", "Platform 6", "Platform 15"], ex: "Thông báo nói tàu đi từ 'platform 3' — sân ga số 3." },
    { transcript: "Tomorrow will be sunny in the morning but rainy in the evening. Please take an umbrella with you.", q: "What will the weather be like in the evening?", ans: "Rainy", wrong: ["Sunny", "Snowy", "Windy"], ex: "Dự báo nói buổi tối mai trời mưa (rainy in the evening)." },
    { transcript: "Librarian: Please return the book by Friday. Student: OK, I will. Thank you.", q: "By when must the student return the book?", ans: "By Friday", wrong: ["By Monday", "By Sunday", "By next month"], ex: "Thủ thư dặn trả sách trước thứ Sáu (by Friday)." },
    { transcript: "Hi Lan, this is Minh. My birthday party is at my house at six on Sunday. Can you come?", q: "Where is Minh's birthday party?", ans: "At Minh's house", wrong: ["At school", "At Lan's house", "At a restaurant"], ex: "Minh nói bữa tiệc ở nhà mình (at my house)." },
    { transcript: "The football match on Saturday will start at three, not at two as planned.", q: "What time will the match start?", ans: "At three o'clock", wrong: ["At two o'clock", "At four o'clock", "At noon"], ex: "Thông báo sửa giờ: trận đấu bắt đầu lúc 3 giờ, không phải 2 giờ như kế hoạch." },
    { transcript: "Guide: The museum opens at nine and closes at five. Tickets are free for students on Sundays.", q: "When are tickets free for students?", ans: "On Sundays", wrong: ["On Mondays", "Every day", "On Saturdays"], ex: "Hướng dẫn viên nói vé miễn phí cho học sinh vào Chủ nhật (on Sundays)." },
    { transcript: "A blue bag was found near the library. Please come to the school office to get it back.", q: "Where was the blue bag found?", ans: "Near the library", wrong: ["Near the office", "In the classroom", "At the school gate"], ex: "Thông báo nói chiếc túi được tìm thấy gần thư viện (near the library)." },
    { transcript: "Teacher: Today we will make vegetable soup. First, wash the vegetables carefully, please.", q: "What will the class make today?", ans: "Vegetable soup", wrong: ["Fruit salad", "Fried rice", "A birthday cake"], ex: "Giáo viên nói hôm nay lớp làm súp rau (vegetable soup)." },
    { transcript: "Doctor: You should rest at home for two days and drink lots of water.", q: "How long should the patient rest at home?", ans: "For two days", wrong: ["For one day", "For a week", "For two weeks"], ex: "Bác sĩ khuyên nghỉ ở nhà hai ngày (for two days)." },
    { transcript: "The next bus to the airport leaves in ten minutes from gate two.", q: "When does the bus to the airport leave?", ans: "In ten minutes", wrong: ["In two minutes", "In an hour", "At ten o'clock"], ex: "Thông báo nói xe buýt đi trong mười phút nữa (in ten minutes)." },
    { transcript: "Anna: Let's go to the bookshop on Saturday morning. Ben: Sorry, I visit my grandma then. How about Sunday?", q: "Why can't Ben go on Saturday?", ans: "He visits his grandma", wrong: ["He goes to school", "He is sick at home", "He reads books then"], ex: "Ben nói thứ Bảy cậu ấy thăm bà (I visit my grandma then)." },
    { transcript: "Guest: I would like a room for two nights, please. Clerk: Certainly. Room 205 is free.", q: "How many nights does the guest want a room?", ans: "Two nights", wrong: ["One night", "Three nights", "Five nights"], ex: "Khách muốn đặt phòng hai đêm (for two nights)." },
    { transcript: "Students, the English exam will be on Thursday morning in your own classrooms.", q: "When will the English exam be?", ans: "On Thursday morning", wrong: ["On Tuesday morning", "On Thursday evening", "On Friday morning"], ex: "Thông báo nói kỳ thi tiếng Anh vào sáng thứ Năm (Thursday morning)." },
    { transcript: "Because of heavy rain, the road to the airport is closed. Drivers should use the bridge road.", q: "Why is the road to the airport closed?", ans: "Because of heavy rain", wrong: ["Because of an accident", "Because of road works", "Because of a festival"], ex: "Đường đóng vì mưa lớn (because of heavy rain)." }
  ];

  function funcPrompt(it, tail) {
    return (it.ctx ? it.ctx + " " : "") + "Người kia nói: \"" + it.cue + "\" " + tail;
  }
  function fFuncReply() {
    var it = enPick(FUNC);
    var q = enMCQ(funcPrompt(it, "Bạn đáp thế nào là đúng và lịch sự nhất?"), it.ans, it.wrong, it.ex, {});
    return enTag(q, "fFuncReply", it.cue);
  }
  function fFuncBlank() {
    var it = enPick(FUNC_BLANK);
    var q = enBlank(funcPrompt(it, "Câu đáp còn thiếu một cụm cố định: \"" + it.s + "\""), it.ans, it.wrong, it.ex);
    return enTag(q, "fFuncBlank", it.cue);
  }
  function fListenDlg() {
    var it = enPick(LISTEN);
    var q = enMCQ("Nghe và trả lời: " + it.q, it.ans, it.wrong, it.ex, { visual: enListenVisual(it.transcript) });
    if (q) enId(q, it.transcript);
    return enTag(q, "fListenDlg", it.q);
  }
  function fCommTF() {
    var main = enPick(FUNC);
    var othersTF = enShuffle(FUNC.filter(function (x) { return x !== main; })).slice(0, 2);
    if (othersTF.length < 2) return null;
    var rounds = enShuffle([
      { stmt: main.t, truth: true, explain: "Đúng — đây là cách đáp phù hợp với tình huống." },
      { stmt: othersTF[0].f, truth: false, explain: "Sai — câu đáp nêu trong mệnh đề không phù hợp với tình huống của nó." },
      { stmt: othersTF[1].f, truth: false, explain: "Sai — câu đáp nêu trong mệnh đề không phù hợp với tình huống của nó." }
    ]);
    var q = enTF(rounds, "Đúng hay sai về cách giao tiếp? Chạm nhanh nhé!");
    return enTag(q, "fCommTF", "func");
  }
  function fCommMatch() {
    var pool = enShuffle(FUNC), usedAns = {}, pairs = [];
    for (var i = 0; i < pool.length && pairs.length < 5; i++) {
      if (!usedAns[pool[i].ans]) { usedAns[pool[i].ans] = true; pairs.push([pool[i].cue, pool[i].ans]); }
    }
    if (pairs.length < 5) return null;
    var q = enMatch("Nối câu nói với câu đáp phù hợp nhất:", pairs,
      "Mỗi câu đáp phải khớp với chức năng giao tiếp của câu nói: cảm ơn → You're welcome; xin lỗi → That's OK; hỏi giá → nêu giá; hỏi đường → chỉ vị trí.");
    return enTag(q, "fCommMatch", "func");
  }

  var topicComm = {
    id: "cd-en-thcs-comm", emoji: "🎧", name: "Hội thoại giao tiếp & nghe",
    sub: "Câu đáp giao tiếp + nghe hiểu ngắn (KET/PET)",
    pools: {
      choose: [fFuncReply, fListenDlg],
      blank: [fFuncBlank],
      match: [fCommMatch],
      games: [fCommTF]
    },
    knowledge: {
      notes: [
        "Câu đáp giao tiếp: xác định trước CHỨC NĂNG của câu người kia nói (cảm ơn, xin lỗi, mời, hỏi giá, hỏi đường…) rồi mới chọn đáp án cùng chức năng.",
        "Từ chối lịch sự luôn kèm lý do ngắn hoặc lời cảm ơn: 'No, thanks. I'm full.', 'I'd love to, but I'm busy.'",
        "Câu nghe: nghe lần một để nắm ý chính, lần hai để bắt số liệu (giờ, giá, ngày) — đáp án sai thường đổi đúng một con số.",
        "Mất tiếng vẫn làm được bài nghe: bấm nút '👁 Hiện chữ' để đọc nội dung đoạn nghe."
      ],
      facts: [
        { q: "Người kia nói \"Thank you very much.\" Bạn đáp gì?", a: "You're welcome.", ex: "\"You're welcome\" là câu đáp chuẩn cho lời cảm ơn." },
        { q: "Người bán hỏi \"Can I help you?\" Bạn đang tìm vở, đáp gì?", a: "Yes. I'm looking for a notebook.", ex: "Nêu rõ thứ mình cần tìm bằng mẫu 'I'm looking for…'." }
      ],
      pairs: [["Thank you very much.", "You're welcome."], ["I'm sorry I'm late.", "That's OK. Don't worry."], ["How much is this bag?", "It's fifty thousand dong."], ["Where is the library?", "It's next to the office."], ["Let's go to the park.", "That's a good idea."], ["See you tomorrow!", "See you! Bye."]]
    }
  };

  window.__EN_BANDS.push({
    id: "thcs",
    name: "Tiếng Anh THCS — KET • PET",
    grades: [6, 7, 8, 9],
    topics: [topicVocab, topicGrammar, topicRead, topicRewrite, topicComm]
  });
})();
/* ================================================================
   TIẾNG ANH LUYỆN THI — DẢI THPT (Lớp 10–12): TOEIC • IELTS
   Đoạn của assets/data/tienganh.js. Mọi nội dung tiếng Anh viết mới.
   Chỉ dùng hàm en* của phần lõi đầu; dạng từ lấy từ bảng cố định
   viết tay, không suy dạng bằng cộng chuỗi.
   ================================================================ */
(function () {
  "use strict";

  /* ---------- tiện ích cục bộ (không phải en*) ---------- */
  function distinctPick(arr, n) {
    var c = enShuffle(arr), out = [], i;
    for (i = 0; i < c.length && out.length < n; i++) out.push(c[i]);
    return out;
  }
  /* 3 vòng TF bảo đảm lẫn phán quyết: 1 đúng + 1 sai + 1 ngẫu nhiên khác. */
  function pick3TF(entries) {
    var t = entries.filter(function (e) { return e.truth; });
    var f = entries.filter(function (e) { return !e.truth; });
    var a = enPick(t), b = enPick(f), c = enPick(entries), tries = 0;
    while ((c === a || c === b) && tries < 12) { c = enPick(entries); tries++; }
    return enShuffle([a, b, c]).map(function (e) { return { stmt: e.stmt, truth: e.truth, explain: e.ex }; });
  }
  function stripHtml(s) { return String(s).replace(/<br\s*\/?>/g, " ").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim(); }

  /* ================================================================
     (1) TOEIC: CÂU CHƯA HOÀN CHỈNH
     ================================================================ */
  /* Bảng gia đình từ CỐ ĐỊNH (viết tay từng dạng). */
  var WFAM = [
    { n: "success", v: "succeed", adj: "successful", adv: "successfully" },
    { n: "decision", v: "decide", adj: "decisive", adv: "decisively" },
    { n: "product", v: "produce", adj: "productive", adv: "productively" },
    { n: "employment", v: "employ", adj: "employed", person: "employer" },
    { n: "application", v: "apply", adj: "applicable", person: "applicant" },
    { n: "information", v: "inform", adj: "informative" },
    { n: "requirement", v: "require", adj: "required" },
    { n: "attendance", v: "attend", adj: "attentive", adv: "attentively" },
    { n: "payment", v: "pay" },
    { n: "agreement", v: "agree", adj: "agreeable" },
    { n: "improvement", v: "improve" },
    { n: "preparation", v: "prepare", adj: "prepared" },
    { n: "announcement", v: "announce" },
    { n: "competition", v: "compete", adj: "competitive", adv: "competitively" },
    { n: "management", v: "manage", adj: "managerial", person: "manager" },
    { n: "delivery", v: "deliver" }
  ];
  var OFFICE = [
    ["deadline", "hạn chót"], ["meeting", "cuộc họp"], ["report", "báo cáo"],
    ["customer", "khách hàng"], ["manager", "quản lý"], ["schedule", "lịch trình"],
    ["order", "đơn hàng"], ["price", "giá"], ["office", "văn phòng"],
    ["staff", "nhân viên"], ["email", "thư điện tử"], ["contract", "hợp đồng"],
    ["delivery", "việc giao hàng"], ["payment", "khoản thanh toán"],
    ["company", "công ty"], ["product", "sản phẩm"], ["service", "dịch vụ"],
    ["project", "dự án"], ["training", "đào tạo"], ["interview", "cuộc phỏng vấn"],
    ["salary", "tiền lương"], ["department", "phòng ban"]
  ];
  /* Ngân hàng mẫu câu văn phòng: {pre, ans, post, wrong[3], ex} */
  var TOEIC_BANK = [
    { pre: "The company celebrated the ", ans: "success", post: " of its new product in the local market.", wrong: ["succeed", "successful", "successfully"], ex: "Sau mạo từ “the” cần danh từ. “Success” (thành công) là danh từ của họ từ này." },
    { pre: "She handled the difficult customer ", ans: "successfully", post: " and solved the problem quickly.", wrong: ["success", "succeed", "successful"], ex: "Cần trạng từ bổ nghĩa cho động từ “handled”. “Successfully” (một cách thành công) là trạng từ." },
    { pre: "The board will ", ans: "decide", post: " on the new budget at tomorrow's meeting.", wrong: ["decision", "decisive", "decisively"], ex: "Sau “will” cần động từ nguyên thể. “Decide” (quyết định) là động từ; “decide on” nghĩa là quyết định về." },
    { pre: "His quick ", ans: "decision", post: " helped the team solve the problem at once.", wrong: ["decide", "decisive", "decisively"], ex: "Sau tính từ “quick” cần danh từ làm chủ ngữ. “Decision” (quyết định) là danh từ." },
    { pre: "The factory can ", ans: "produce", post: " five hundred units every day.", wrong: ["product", "productive", "productively"], ex: "Sau động từ khuyết thiếu “can” cần động từ nguyên thể. “Produce” (sản xuất) là động từ." },
    { pre: "Our new ", ans: "product", post: " is very popular with young customers.", wrong: ["produce", "productive", "productively"], ex: "Sau tính từ “new” cần danh từ làm chủ ngữ. “Product” (sản phẩm) là danh từ." },
    { pre: "The company plans to ", ans: "employ", post: " ten new workers this year.", wrong: ["employment", "employer", "employed"], ex: "Sau “to” cần động từ nguyên thể. “Employ” (tuyển dụng) là động từ." },
    { pre: "", ans: "Employment", post: " has increased in the city this year.", wrong: ["Employ", "Employer", "Employed"], ex: "Vị trí chủ ngữ đầu câu cần danh từ. “Employment” (việc làm) đi với “has increased”; “employer” (người sử dụng lao động) không hợp nghĩa." },
    { pre: "Please complete the job ", ans: "application", post: " and send it to us by Friday.", wrong: ["apply", "applicant", "applicable"], ex: "Cụm “job application” (đơn xin việc) cần danh từ sau “job”. “Applicant” là người xin việc, không phải tờ đơn." },
    { pre: "All staff must ", ans: "attend", post: " the safety training on Monday morning.", wrong: ["attendance", "attentive", "attentively"], ex: "Sau “must” cần động từ nguyên thể. “Attend” (tham dự) là động từ." },
    { pre: "Her regular ", ans: "attendance", post: " at work impressed her manager.", wrong: ["attend", "attentive", "attentively"], ex: "Sau tính từ “regular” cần danh từ. “Attendance” (sự có mặt/chuyên cần) là danh từ." },
    { pre: "Please make the ", ans: "payment", post: " before the end of the month.", wrong: ["pay", "paying", "paid"], ex: "Cụm cố định “make the payment” (thực hiện khoản thanh toán) cần danh từ “payment” sau “the”." },
    { pre: "The two companies reached an ", ans: "agreement", post: " after long talks last week.", wrong: ["agree", "agreeable", "agreeing"], ex: "Sau “an” cần danh từ số ít. Cụm “reach an agreement” nghĩa là đạt được thỏa thuận." },
    { pre: "The director will ", ans: "announce", post: " the results at the meeting next week.", wrong: ["announcement", "announced", "announcing"], ex: "Sau “will” cần động từ nguyên thể. “Announce” (thông báo) là động từ." },
    { pre: "The price of this product is very ", ans: "competitive", post: " in the local market.", wrong: ["compete", "competition", "competitively"], ex: "Sau “is very” cần tính từ. “Competitive” (có tính cạnh tranh) là tính từ." },
    { pre: "She is studying business ", ans: "management", post: " at a university in the city.", wrong: ["manage", "manager", "managerial"], ex: "Cụm “business management” (quản trị kinh doanh) cần danh từ “management” (sự quản lý/ngành quản trị)." },
    { pre: "The ", ans: "delivery", post: " will arrive at the office tomorrow morning.", wrong: ["deliver", "delivered", "delivering"], ex: "Sau mạo từ “the” cần danh từ làm chủ ngữ. “Delivery” (việc giao hàng) là danh từ." },
    { pre: "The meeting room was fully ", ans: "prepared", post: " before the guests arrived.", wrong: ["prepare", "preparation", "preparing"], ex: "Cấu trúc bị động “was + phân từ” cần “prepared” (đã được chuẩn bị)." },
    { pre: "The report ", ans: "was finished", post: " by the team yesterday afternoon.", wrong: ["is finished", "finishes", "finishing"], ex: "Có “by the team” và “yesterday” nên cần bị động quá khứ đơn: “was finished” (đã được hoàn thành)." },
    { pre: "She ", ans: "has worked", post: " in this office since 2020.", wrong: ["works", "worked", "work"], ex: "Dấu hiệu “since 2020” (từ năm 2020 tới nay) cần hiện tại hoàn thành: “has worked”." },
    { pre: "The meeting will start ", ans: "at", post: " 9 a.m. on Monday morning.", wrong: ["in", "on", "to"], ex: "Trước giờ cụ thể dùng giới từ “at”: “at 9 a.m.” (lúc 9 giờ sáng)." },
    { pre: "He is responsible ", ans: "for", post: " checking all the invoices in the office.", wrong: ["of", "about", "with"], ex: "Cụm cố định “be responsible for” nghĩa là chịu trách nhiệm về việc gì." },
    { pre: "The office is closed today ", ans: "because", post: " it is a public holiday.", wrong: ["despite", "although", "unless"], ex: "Cần liên từ chỉ nguyên nhân nối hai mệnh đề: “because” (bởi vì). “Despite” phải đi với danh từ/cụm danh từ." },
    { pre: "Ms. Lan sent the file to Mr. Hung and asked ", ans: "him", post: " to check it carefully.", wrong: ["he", "his", "himself"], ex: "Sau động từ “asked” cần tân ngữ. “Him” là tân ngữ của “he” (anh ấy)." },
    { pre: "The woman ", ans: "who", post: " works at the front desk is very helpful.", wrong: ["which", "whose", "where"], ex: "Đại từ quan hệ chỉ người làm chủ ngữ: “who” thay cho “the woman”." },
    { pre: "Thank you for ", ans: "helping", post: " us prepare the presentation yesterday.", wrong: ["help", "to help", "helped"], ex: "Sau giới từ “for” cần động từ thêm -ing: “for helping” (vì đã giúp)." },
    { pre: "She decided ", ans: "to apply", post: " for the new position in the sales team.", wrong: ["applying", "apply", "applies"], ex: "Cấu trúc cố định “decide to do something” (quyết định làm gì) cần “to apply”." },
    { pre: "This new printer is ", ans: "faster", post: " than the old one in the office.", wrong: ["fast", "fastest", "more fast"], ex: "Có “than” nên cần so sánh hơn. Tính từ ngắn “fast” thêm -er: “faster”." },
    { pre: "Mr. Tuan is the ", ans: "most experienced", post: " member of our project team.", wrong: ["more experienced", "experienced", "experience"], ex: "Có “the” và phạm vi “of our team” nên cần so sánh nhất: “the most experienced” (giàu kinh nghiệm nhất)." },
    { pre: "The documents ", ans: "were sent", post: " to the client this morning.", wrong: ["was sent", "send", "sending"], ex: "Chủ ngữ số nhiều “the documents” + bị động quá khứ: “were sent” (đã được gửi)." },
    { pre: "If it rains tomorrow, the outdoor event ", ans: "will be", post: " moved indoors.", wrong: ["would be", "is being", "has been"], ex: "Câu điều kiện loại 1 (có thể xảy ra): mệnh đề chính dùng “will be” + phân từ (bị động)." },
    { pre: "He has worked in this company ", ans: "since", post: " 2019.", wrong: ["for", "from", "at"], ex: "Trước mốc thời gian (2019) với hiện tại hoàn thành dùng “since”; “for” đi với khoảng thời gian." },
    { pre: "She asked me ", ans: "whether", post: " the delivery had arrived yet.", wrong: ["what", "which", "whose"], ex: "Câu hỏi gián tiếp dạng Yes/No dùng “whether” (liệu có… hay không)." },
    { pre: "The contract must be signed ", ans: "by", post: " both companies before Friday.", wrong: ["from", "with", "of"], ex: "Trong câu bị động, tác nhân thực hiện hành động đi với “by”: “signed by both companies”." },
    { pre: "He speaks English ", ans: "more fluently", post: " than his brother does.", wrong: ["fluent", "fluently", "most fluently"], ex: "Có “than” và động từ “speaks” nên cần trạng từ so sánh hơn: “more fluently” (trôi chảy hơn)." },
    { pre: "All the information ", ans: "is", post: " stored safely on the company server.", wrong: ["are", "were", "been"], ex: "“Information” là danh từ không đếm được, luôn đi với động từ số ít: “is”." },
    { pre: "We look forward to ", ans: "meeting", post: " you at the conference next week.", wrong: ["meet", "to meeting", "met"], ex: "Cụm “look forward to” có “to” là giới từ nên động từ theo sau thêm -ing: “meeting”." },
    { pre: "Our sales manager is ", ans: "more careful", post: " than the previous one when checking contracts.", wrong: ["careful", "carefuller", "most careful"], ex: "Có “than” nên cần so sánh hơn của tính từ dài: “more careful” (cẩn thận hơn)." }
  ];
  var TOEIC_TF = [
    { stmt: "Câu “The meeting starts at nine.” nói cuộc họp bắt đầu lúc 9 giờ.", truth: true, ex: "Đúng. “Starts at nine” nghĩa là bắt đầu lúc 9 giờ." },
    { stmt: "Câu “Please send the report today.” nói hãy gửi báo cáo vào ngày mai.", truth: false, ex: "Sai. “Today” là hôm nay, không phải ngày mai (tomorrow)." },
    { stmt: "Câu “The office is on the second floor.” nói văn phòng ở tầng hai.", truth: true, ex: "Đúng. “On the second floor” nghĩa là ở tầng hai." },
    { stmt: "Câu “She is our new manager.” nói cô ấy là khách hàng mới của chúng ta.", truth: false, ex: "Sai. “Manager” là người quản lý, không phải khách hàng (customer)." },
    { stmt: "Câu “The delivery will arrive on Friday.” nói hàng sẽ đến vào thứ Sáu.", truth: true, ex: "Đúng. “Will arrive on Friday” nghĩa là sẽ đến vào thứ Sáu." },
    { stmt: "Câu “He works in the sales department.” nói anh ấy làm việc ở phòng kế toán.", truth: false, ex: "Sai. “Sales department” là phòng kinh doanh/bán hàng, không phải phòng kế toán." },
    { stmt: "Câu “The price includes delivery.” nói giá đã bao gồm việc giao hàng.", truth: true, ex: "Đúng. “Includes” nghĩa là bao gồm; giá đã gồm giao hàng." },
    { stmt: "Câu “Please call the customer back.” nói hãy gọi lại cho khách hàng.", truth: true, ex: "Đúng. “Call someone back” nghĩa là gọi lại cho ai đó." },
    { stmt: "Câu “The shop opens at eight in the morning.” nói cửa hàng mở cửa lúc 8 giờ tối.", truth: false, ex: "Sai. “In the morning” là buổi sáng, nên là 8 giờ sáng." },
    { stmt: "Câu “We need ten boxes for the order.” nói chúng ta cần 10 hộp cho đơn hàng.", truth: true, ex: "Đúng. “Ten boxes” là 10 hộp; “order” là đơn hàng." },
    { stmt: "Câu “The report is ready now.” nói báo cáo vẫn chưa sẵn sàng.", truth: false, ex: "Sai. “Is ready now” nghĩa là bây giờ đã sẵn sàng." },
    { stmt: "Câu “Mr. Nam is in a meeting now.” nói ông Nam hiện đang họp.", truth: true, ex: "Đúng. “Be in a meeting” nghĩa là đang họp." },
    { stmt: "Câu “The email was sent yesterday.” nói email đã được gửi hôm qua.", truth: true, ex: "Đúng. “Was sent yesterday” nghĩa là đã được gửi hôm qua." },
    { stmt: "Câu “Our office closes on Sunday.” nói văn phòng mở cửa vào Chủ nhật.", truth: false, ex: "Sai. “Closes” là đóng cửa, trái nghĩa với mở cửa (opens)." },
    { stmt: "Câu “Please open the window.” nói hãy đóng cửa sổ lại.", truth: false, ex: "Sai. “Open” là mở ra; câu này nhờ mở cửa sổ, không phải đóng lại." },
    { stmt: "Câu “She has a new computer.” nói cô ấy có một chiếc máy tính cũ.", truth: false, ex: "Sai. “New” là mới; máy tính của cô ấy là máy mới, không phải máy cũ." }
  ];
  function fToeicGrammar() {
    var e = enPick(TOEIC_BANK);
    var q = enMCQ("Choose the correct word to complete the sentence: " + e.pre + "_____" + e.post, e.ans, e.wrong, e.ex, {});
    return enTag(q, "fToeicGrammar", e.ans);
  }
  function fToeicBlank() {
    var e = enPick(TOEIC_BANK);
    var q = enBlank("Complete the sentence with the correct word.", e.ans, e.wrong, e.ex,
      '<div class="sentence">' + e.pre + "_____" + e.post + "</div>");
    return enTag(q, "fToeicBlank", e.ans);
  }
  function fToeicMatch() {
    var pairs = distinctPick(OFFICE, 5);
    var q = enMatch("Match the English office word with its Vietnamese meaning.", pairs,
      "Ghép mỗi từ tiếng Anh với nghĩa tiếng Việt đúng của nó. Mẹo TOEIC: học từ vựng theo ngữ cảnh công việc, không học rời rạc.");
    return enTag(q, "fToeicMatch", pairs[0][0]);
  }
  function fToeicTF() {
    var q = enTF(pick3TF(TOEIC_TF), "Đọc câu tiếng Anh, rồi phán đoán mệnh đề tiếng Việt đúng hay sai.");
    return enTag(q, "fToeicTF", "mix");
  }
  var T1 = {
    id: "cd-en-thpt-toeic", emoji: "🏢", name: "TOEIC: câu chưa hoàn chỉnh",
    sub: "Ngữ pháp & từ vựng ngữ cảnh công việc",
    pools: { choose: [fToeicGrammar], blank: [fToeicBlank], match: [fToeicMatch], games: [fToeicTF] },
    knowledge: {
      notes: [
        "Mẹo dạng từ (Part 5 TOEIC): nhìn vị trí chỗ trống trước — sau mạo từ/tính từ cần danh từ, sau “will/must/can” cần động từ nguyên thể, bổ nghĩa cho động từ cần trạng từ.",
        "Mẹo thì: thấy “since + mốc thời gian” nghĩ ngay tới hiện tại hoàn thành; thấy “yesterday/last week” dùng quá khứ đơn.",
        "Mẹo bị động: có “by + người thực hiện” hoặc chủ ngữ là vật bị tác động → chọn dạng “be + phân từ”.",
        "Học cụm cố định thay vì từ rời: be responsible for, look forward to + V-ing, decide to do, reach an agreement.",
        "Khi phân vân giữa hai đáp án, đọc cả câu tới cuối: từ như “than” (so sánh hơn) hay “the + … of the team” (so sánh nhất) thường quyết định đáp án."
      ],
      facts: [
        { q: "“She has worked here since 2021.” — vì sao dùng “has worked”?", a: "Vì “since + mốc thời gian” đi với hiện tại hoàn thành", ex: "“Since 2021” chỉ khoảng thời gian kéo dài từ quá khứ tới hiện tại nên động từ chia hiện tại hoàn thành: has worked." },
        { q: "“We look forward to ___ you.” — điền “meeting” hay “meet”?", a: "meeting", ex: "Trong cụm “look forward to”, “to” là giới từ nên động từ theo sau phải thêm -ing: meeting." }
      ],
      pairs: [["deadline", "hạn chót"], ["customer", "khách hàng"], ["contract", "hợp đồng"], ["schedule", "lịch trình"], ["salary", "tiền lương"]]
    }
  };

  /* ================================================================
     (2) TOEIC: ĐỌC HIỂU VĂN BẢN NGẮN (11 văn bản viết mới)
     Mỗi văn bản: qs (detail/purpose/not), tf 6, blanks 2, mpairs 4.
     ================================================================ */
  var TEXTS = [
    {
      title: "Email: Team Meeting",
      passage: "<b>Subject: Team Meeting on Friday</b><br>Dear team,<br>Our weekly team meeting will move from Thursday to Friday this week. We will meet at 10 a.m. in Room 204. Please bring your progress reports and be ready to talk about next month's sales plan. The meeting will last about one hour. If you cannot attend, please email Ms. Hoa before Thursday afternoon so we can share the notes with you later.<br>Best regards,<br>Mr. Tuan, Office Manager",
      qs: [
        { kind: "detail", q: "When will the team meeting take place this week?", ans: "At 10 a.m. on Friday", wrong: ["At 10 a.m. on Thursday", "At 9 a.m. on Friday", "At 2 p.m. on Friday"], ex: "Văn bản nói cuộc họp chuyển từ thứ Năm sang thứ Sáu, lúc 10 giờ sáng." },
        { kind: "detail", q: "What should staff bring to the meeting?", ans: "Their progress reports", wrong: ["Their laptops", "Their ID cards", "Lunch for the team"], ex: "Câu “Please bring your progress reports” nói rõ nhân viên cần mang báo cáo tiến độ." },
        { kind: "detail", q: "In the email, the word “attend” means ______.", ans: "go to", wrong: ["leave early", "pay for", "write down"], ex: "“Attend” nghĩa là tham dự, tức “go to” (đi dự) một cuộc họp hay sự kiện." },
        { kind: "purpose", q: "What is the email mainly about?", ans: "A change to the meeting time", wrong: ["A new sales record", "A job interview", "A company holiday"], ex: "Toàn bộ email thông báo việc đổi ngày họp hàng tuần, nên ý chính là thay đổi thời gian họp." },
        { kind: "not", q: "Which information is NOT mentioned in the email?", ans: "The cost of the meeting room", wrong: ["The time of the meeting", "The room for the meeting", "The topic of the meeting"], ex: "Email nhắc giờ họp (10 a.m.), phòng họp (Room 204) và chủ đề (sales plan), nhưng không hề nhắc chi phí phòng họp." }
      ],
      tf: [
        { stmt: "Cuộc họp tuần này diễn ra vào thứ Sáu.", truth: true, ex: "Đúng. Email nói cuộc họp chuyển từ thứ Năm sang thứ Sáu tuần này." },
        { stmt: "Nhân viên cần mang theo báo cáo tiến độ.", truth: true, ex: "Đúng. “Please bring your progress reports.”" },
        { stmt: "Cuộc họp kéo dài khoảng một giờ.", truth: true, ex: "Đúng. “The meeting will last about one hour.”" },
        { stmt: "Cuộc họp vẫn diễn ra vào thứ Năm như thường lệ.", truth: false, ex: "Sai. Cuộc họp đã chuyển sang thứ Sáu." },
        { stmt: "Cuộc họp diễn ra tại phòng 402.", truth: false, ex: "Sai. Phòng họp là Room 204." },
        { stmt: "Người không dự họp phải gọi điện cho ông Tuấn.", truth: false, ex: "Sai. Người vắng phải gửi email cho Ms. Hoa." }
      ],
      blanks: [
        { s: "The meeting will be held in Room ______.", ans: "204", wrong: ["402", "240", "104"], ex: "Văn bản ghi rõ phòng họp là Room 204." },
        { s: "Staff who cannot attend should email ______.", ans: "Ms. Hoa", wrong: ["Mr. Tuan", "Ms. Lan", "Mr. Hung"], ex: "Email dặn người không dự được hãy email cho Ms. Hoa trước chiều thứ Năm." }
      ],
      mpairs: [["Friday", "ngày họp tuần này"], ["Room 204", "phòng họp"], ["Ms. Hoa", "người nhận email khi vắng"], ["progress reports", "tài liệu cần mang theo"]]
    },
    {
      title: "Email: Late Delivery",
      passage: "<b>Subject: Delay to Your Order</b><br>Dear Ms. Lan,<br>Thank you for your order of twenty office chairs on Monday. We are sorry to tell you that your delivery will arrive two days late, on Friday instead of Wednesday. This is because one of our delivery trucks is being repaired. As an apology, we will offer you a ten percent discount on this order. Please contact us if the new time is not suitable.<br>Kind regards,<br>An Phat Furniture",
      qs: [
        { kind: "detail", q: "How many chairs did Ms. Lan order?", ans: "Twenty chairs", wrong: ["Ten chairs", "Twelve chairs", "Thirty chairs"], ex: "Email ghi “your order of twenty office chairs” — đơn hàng gồm hai mươi chiếc ghế." },
        { kind: "detail", q: "Why will the delivery be late?", ans: "A delivery truck is being repaired", wrong: ["The shop is closed", "The chairs are out of stock", "The driver is on holiday"], ex: "Nguyên nhân giao chậm là một xe giao hàng đang được sửa chữa." },
        { kind: "detail", q: "When will the delivery arrive now?", ans: "On Friday", wrong: ["On Wednesday", "On Monday", "On Thursday"], ex: "Hàng sẽ đến muộn hai ngày: thứ Sáu thay vì thứ Tư." },
        { kind: "purpose", q: "What is the email mainly about?", ans: "A late delivery and a discount", wrong: ["A new furniture catalogue", "A job offer", "A payment request"], ex: "Email xin lỗi vì giao hàng chậm và thông báo giảm giá 10% — đó là nội dung chính." },
        { kind: "not", q: "Which information is NOT mentioned in the email?", ans: "The colour of the chairs", wrong: ["The number of chairs", "The new delivery day", "The discount on the order"], ex: "Email nhắc số ghế (20), ngày giao mới (thứ Sáu) và giảm giá (10%), nhưng không nhắc màu của ghế." }
      ],
      tf: [
        { stmt: "Đơn hàng gồm hai mươi chiếc ghế văn phòng.", truth: true, ex: "Đúng. “Twenty office chairs.”" },
        { stmt: "Hàng sẽ đến muộn hai ngày so với kế hoạch.", truth: true, ex: "Đúng. “Your delivery will arrive two days late.”" },
        { stmt: "Khách hàng được giảm giá mười phần trăm.", truth: true, ex: "Đúng. “A ten percent discount.”" },
        { stmt: "Hàng sẽ đến vào thứ Tư như kế hoạch ban đầu.", truth: false, ex: "Sai. Hàng chuyển sang thứ Sáu." },
        { stmt: "Đơn hàng bị chậm vì cửa hàng đã hết ghế.", truth: false, ex: "Sai. Lý do là xe giao hàng đang sửa." },
        { stmt: "Khách hàng phải trả thêm tiền vì giao hàng chậm.", truth: false, ex: "Sai. Khách được giảm giá, không phải trả thêm." }
      ],
      blanks: [
        { s: "The delivery will now arrive on ______.", ans: "Friday", wrong: ["Wednesday", "Monday", "Thursday"], ex: "Ngày giao mới là thứ Sáu, muộn hai ngày so với thứ Tư." },
        { s: "Customers get a ______ percent discount on this order.", ans: "ten", wrong: ["five", "twenty", "fifteen"], ex: "Mức giảm giá xin lỗi là mười phần trăm (ten percent)." }
      ],
      mpairs: [["Ms. Lan", "khách hàng đặt ghế"], ["twenty chairs", "số ghế đã đặt"], ["Friday", "ngày giao hàng mới"], ["ten percent", "mức giảm giá"]]
    },
    {
      title: "Email: Interview Invitation",
      passage: "<b>Subject: Invitation to a Job Interview</b><br>Dear Mr. Hung,<br>Thank you for applying for the sales assistant position at our company. We would like to invite you to an interview at 9 a.m. on Tuesday, 12 May, at our head office on Le Loi Street. Please bring your ID card and copies of your certificates. The interview will take about thirty minutes. Please reply to this email by Friday to confirm that you can come.<br>Best wishes,<br>Ms. Mai, Human Resources",
      qs: [
        { kind: "detail", q: "Which job did Mr. Hung apply for?", ans: "Sales assistant", wrong: ["Office manager", "Sales manager", "Delivery driver"], ex: "Email ghi ông Hưng ứng tuyển vị trí “sales assistant position” (nhân viên bán hàng)." },
        { kind: "detail", q: "What should Mr. Hung bring to the interview?", ans: "His ID card and certificates", wrong: ["Only his ID card", "Only his certificates", "His ID card and a photo"], ex: "Email dặn mang “your ID card and copies of your certificates” — thẻ căn cước và bản sao các chứng chỉ." },
        { kind: "detail", q: "By when must Mr. Hung reply to the email?", ans: "By Friday", wrong: ["By Monday", "By Tuesday", "By Sunday"], ex: "Câu cuối dặn trả lời email trước thứ Sáu để xác nhận." },
        { kind: "purpose", q: "What is the email mainly about?", ans: "To invite Mr. Hung to an interview", wrong: ["To offer Mr. Hung a job", "To announce a new office", "To ask for a sales report"], ex: "Email mời ông Hưng tới phỏng vấn; chưa phải thư mời nhận việc." },
        { kind: "not", q: "Which information is NOT mentioned in the email?", ans: "The salary for the job", wrong: ["The time of the interview", "The place of the interview", "What to bring"], ex: "Email có giờ (9 a.m.), nơi (head office) và đồ cần mang, nhưng không nhắc mức lương." }
      ],
      tf: [
        { stmt: "Ông Hưng ứng tuyển vị trí nhân viên bán hàng.", truth: true, ex: "Đúng. “The sales assistant position.”" },
        { stmt: "Buổi phỏng vấn diễn ra lúc 9 giờ sáng thứ Ba.", truth: true, ex: "Đúng. “At 9 a.m. on Tuesday.”" },
        { stmt: "Ông Hưng cần mang thẻ căn cước và bản sao chứng chỉ.", truth: true, ex: "Đúng. “Bring your ID card and copies of your certificates.”" },
        { stmt: "Buổi phỏng vấn kéo dài khoảng một giờ.", truth: false, ex: "Sai. Phỏng vấn chỉ khoảng ba mươi phút." },
        { stmt: "Buổi phỏng vấn diễn ra tại một cửa hàng của công ty.", truth: false, ex: "Sai. Phỏng vấn tại trụ sở chính (head office) trên phố Le Loi." },
        { stmt: "Ông Hưng phải trả lời email trước thứ Tư.", truth: false, ex: "Sai. Hạn trả lời là thứ Sáu (by Friday)." }
      ],
      blanks: [
        { s: "The interview will take about ______ minutes.", ans: "thirty", wrong: ["sixty", "fifteen", "forty-five"], ex: "Văn bản nói phỏng vấn kéo dài khoảng ba mươi phút." },
        { s: "The interview will be at the company's ______ office.", ans: "head", wrong: ["branch", "small", "new"], ex: "Cụm “head office” nghĩa là trụ sở chính của công ty." }
      ],
      mpairs: [["Mr. Hung", "ứng viên được mời phỏng vấn"], ["Ms. Mai", "người phụ trách nhân sự"], ["Tuesday", "ngày phỏng vấn"], ["9 a.m.", "giờ phỏng vấn"]]
    },
    {
      title: "Email: Training Schedule Change",
      passage: "<b>Subject: Change to the Training Schedule</b><br>Dear all,<br>Please note that the English training class on Wednesday afternoon has been moved to Thursday afternoon. The class will still be in Room 105 and will run from 2 p.m. to 4 p.m. as usual. This change is only for this week because the trainer is travelling for work. Classes will return to the normal schedule next week. Thank you for your understanding.<br>Regards,<br>Training Team",
      qs: [
        { kind: "detail", q: "On which day will the English class meet this week?", ans: "On Thursday afternoon", wrong: ["On Wednesday afternoon", "On Friday afternoon", "On Thursday morning"], ex: "Lớp tiếng Anh chuyển từ chiều thứ Tư sang chiều thứ Năm tuần này." },
        { kind: "detail", q: "How long does the class last?", ans: "Two hours", wrong: ["One hour", "Three hours", "Half an hour"], ex: "Lớp học từ 2 giờ đến 4 giờ chiều, tức hai giờ." },
        { kind: "detail", q: "Why was the class moved this week?", ans: "The trainer is travelling for work", wrong: ["The room is being repaired", "The trainer is ill", "Students asked for a change"], ex: "Lý do đổi lịch là giảng viên đang đi công tác." },
        { kind: "purpose", q: "What is the email mainly about?", ans: "To announce a class schedule change", wrong: ["To advertise a new English course", "To invite staff to a party", "To report exam results"], ex: "Email thông báo thay đổi lịch lớp đào tạo tiếng Anh tuần này." },
        { kind: "not", q: "Which information is NOT mentioned in the email?", ans: "The name of the trainer", wrong: ["The new day of the class", "The room of the class", "The reason for the change"], ex: "Email có ngày mới (thứ Năm), phòng (105) và lý do (giảng viên đi công tác), nhưng không nêu tên giảng viên." }
      ],
      tf: [
        { stmt: "Lớp tiếng Anh tuần này chuyển sang chiều thứ Năm.", truth: true, ex: "Đúng. Lớp chuyển từ thứ Tư sang thứ Năm." },
        { stmt: "Phòng học vẫn là phòng 105.", truth: true, ex: "Đúng. “The class will still be in Room 105.”" },
        { stmt: "Việc đổi lịch chỉ áp dụng cho tuần này.", truth: true, ex: "Đúng. “This change is only for this week.”" },
        { stmt: "Lớp học bắt đầu lúc 3 giờ chiều.", truth: false, ex: "Sai. Lớp chạy từ 2 giờ đến 4 giờ chiều." },
        { stmt: "Tuần sau lớp vẫn học vào thứ Năm.", truth: false, ex: "Sai. Tuần sau lớp trở lại lịch bình thường (thứ Tư)." },
        { stmt: "Lớp đổi lịch vì phòng học đang được sửa.", truth: false, ex: "Sai. Lý do là giảng viên đi công tác." }
      ],
      blanks: [
        { s: "The class has been moved to ______ afternoon.", ans: "Thursday", wrong: ["Wednesday", "Friday", "Monday"], ex: "Ngày học mới của tuần này là chiều thứ Năm." },
        { s: "The class will still be in Room ______.", ans: "105", wrong: ["205", "150", "115"], ex: "Phòng học không đổi: Room 105." }
      ],
      mpairs: [["Thursday", "ngày học mới tuần này"], ["Room 105", "phòng học"], ["2 p.m.", "giờ bắt đầu lớp"], ["the trainer", "người đang đi công tác"]]
    },
    {
      title: "Notice: Office Maintenance",
      passage: "<b>NOTICE: Office Maintenance This Weekend</b><br>Please note that our office building will be closed this Saturday for electrical maintenance. No one will be able to enter the building between 7 a.m. and 5 p.m. Please take your laptop and any important papers home on Friday evening. The building will open again as normal on Monday morning. If you have any questions, please contact the building manager, Mr. Son, on 0903 445 221.",
      qs: [
        { kind: "detail", q: "When will the office building be closed?", ans: "This Saturday", wrong: ["This Sunday", "Next Saturday", "This Friday"], ex: "Thông báo ghi tòa nhà đóng cửa vào thứ Bảy tuần này để bảo trì điện." },
        { kind: "detail", q: "What should staff take home on Friday evening?", ans: "Laptops and important papers", wrong: ["Office chairs", "Printers and desks", "Keys and phones"], ex: "Thông báo dặn mang “your laptop and any important papers” về nhà tối thứ Sáu." },
        { kind: "detail", q: "Why will the building be closed?", ans: "For electrical maintenance", wrong: ["For a company event", "For cleaning", "For a public holiday"], ex: "Lý do đóng cửa là “electrical maintenance” (bảo trì hệ thống điện)." },
        { kind: "purpose", q: "What is the notice mainly about?", ans: "To inform staff about a building closure", wrong: ["To advertise new offices", "To invite staff to a meeting", "To announce a new manager"], ex: "Thông báo cho nhân viên biết tòa nhà sẽ đóng cửa để bảo trì." },
        { kind: "not", q: "Which information is NOT mentioned in the notice?", ans: "The cost of the maintenance", wrong: ["The closing day", "The reopening day", "Who to contact"], ex: "Thông báo có ngày đóng (thứ Bảy), ngày mở lại (sáng thứ Hai) và người liên hệ (Mr. Son), nhưng không nhắc chi phí bảo trì." }
      ],
      tf: [
        { stmt: "Tòa nhà đóng cửa vào thứ Bảy để bảo trì điện.", truth: true, ex: "Đúng. “Closed this Saturday for electrical maintenance.”" },
        { stmt: "Nhân viên nên mang laptop về nhà vào tối thứ Sáu.", truth: true, ex: "Đúng. “Take your laptop … home on Friday evening.”" },
        { stmt: "Tòa nhà mở lại bình thường vào sáng thứ Hai.", truth: true, ex: "Đúng. “Open again as normal on Monday morning.”" },
        { stmt: "Nhân viên có thể vào tòa nhà lúc trưa thứ Bảy.", truth: false, ex: "Sai. Không ai được vào tòa nhà từ 7 giờ sáng đến 5 giờ chiều thứ Bảy." },
        { stmt: "Đợt bảo trì này là bảo trì hệ thống nước.", truth: false, ex: "Sai. Đây là bảo trì hệ thống điện (electrical)." },
        { stmt: "Khi có câu hỏi, hãy liên hệ với bà Hoa.", truth: false, ex: "Sai. Người liên hệ là Mr. Son, quản lý tòa nhà." }
      ],
      blanks: [
        { s: "The office building will be closed this ______ for maintenance.", ans: "Saturday", wrong: ["Sunday", "Friday", "Monday"], ex: "Ngày đóng cửa là thứ Bảy tuần này." },
        { s: "If you have questions, please contact Mr. ______.", ans: "Son", wrong: ["Nam", "Hoa", "Tuan"], ex: "Người liên hệ là quản lý tòa nhà Mr. Son." }
      ],
      mpairs: [["Saturday", "ngày tòa nhà đóng cửa"], ["Friday evening", "lúc mang đồ về nhà"], ["Monday morning", "lúc tòa nhà mở lại"], ["Mr. Son", "quản lý tòa nhà"]]
    },
    {
      title: "Notice: Job Vacancy",
      passage: "<b>JOB VACANCY: Shop Assistant Wanted</b><br>Our bookshop on Nguyen Hue Street is looking for a friendly shop assistant to work on weekends. The job is from 9 a.m. to 6 p.m. on Saturdays and Sundays. Applicants should be at least eighteen years old and enjoy helping customers. Experience is welcome but not necessary, as training will be provided. To apply, please send your CV to bookshop@email.com before 20 June.",
      qs: [
        { kind: "detail", q: "Who is the bookshop looking for?", ans: "A friendly shop assistant", wrong: ["A shop manager", "A full-time cashier", "A delivery driver"], ex: "Thông báo tuyển “a friendly shop assistant” (nhân viên bán hàng thân thiện) làm cuối tuần." },
        { kind: "detail", q: "How old must applicants be at least?", ans: "Eighteen years old", wrong: ["Sixteen years old", "Twenty years old", "Twenty-one years old"], ex: "Ứng viên phải “at least eighteen years old” — ít nhất mười tám tuổi." },
        { kind: "detail", q: "How can people apply for the job?", ans: "Send a CV by email", wrong: ["Visit the shop in person", "Call the shop manager", "Fill in a form online"], ex: "Cách ứng tuyển là gửi CV tới địa chỉ email của hiệu sách trước ngày 20 tháng 6." },
        { kind: "purpose", q: "What is the notice mainly about?", ans: "To advertise a weekend job", wrong: ["To sell old books", "To announce new opening hours", "To invite customers to an event"], ex: "Thông báo đăng tuyển nhân viên bán hàng làm việc cuối tuần." },
        { kind: "not", q: "Which information is NOT mentioned in the notice?", ans: "The salary for the job", wrong: ["The working days", "The minimum age", "How to apply"], ex: "Thông báo có ngày làm (cuối tuần), tuổi tối thiểu (18) và cách ứng tuyển (gửi CV), nhưng không nhắc mức lương." }
      ],
      tf: [
        { stmt: "Công việc dành cho các ngày cuối tuần.", truth: true, ex: "Đúng. Làm việc thứ Bảy và Chủ nhật." },
        { stmt: "Ứng viên phải ít nhất mười tám tuổi.", truth: true, ex: "Đúng. “At least eighteen years old.”" },
        { stmt: "Kinh nghiệm làm việc không bắt buộc.", truth: true, ex: "Đúng. “Experience is welcome but not necessary.”" },
        { stmt: "Ứng viên bắt buộc phải có kinh nghiệm mới được nộp hồ sơ.", truth: false, ex: "Sai. Kinh nghiệm được hoan nghênh nhưng không bắt buộc; sẽ có đào tạo." },
        { stmt: "Hồ sơ có thể gửi sau ngày 20 tháng 6.", truth: false, ex: "Sai. CV phải gửi trước ngày 20 tháng 6 (before 20 June)." },
        { stmt: "Công việc làm vào các ngày trong tuần.", truth: false, ex: "Sai. Công việc chỉ vào thứ Bảy và Chủ nhật." }
      ],
      blanks: [
        { s: "The assistant will work on Saturdays and ______.", ans: "Sundays", wrong: ["Mondays", "Fridays", "Tuesdays"], ex: "Giờ làm là 9 giờ sáng đến 6 giờ chiều thứ Bảy và Chủ nhật." },
        { s: "Please send your CV before ______ June.", ans: "20", wrong: ["12", "25", "30"], ex: "Hạn gửi CV là trước ngày 20 tháng 6." }
      ],
      mpairs: [["weekends", "thời gian làm việc"], ["eighteen", "tuổi tối thiểu của ứng viên"], ["CV", "hồ sơ cần gửi"], ["Nguyen Hue Street", "phố có hiệu sách"]]
    },
    {
      title: "Notice: New Parking Rule",
      passage: "<b>NOTICE: New Parking Rule</b><br>From 1 July, all motorbikes must be parked in the new parking area behind the office. The old parking area in front of the building will become a garden. Staff must show their parking cards when entering the new area. Anyone who parks in the wrong place will have to move their vehicle immediately. Thank you for helping to keep our workplace green and tidy.",
      qs: [
        { kind: "detail", q: "When does the new parking rule start?", ans: "From 1 July", wrong: ["From 1 June", "From 15 July", "From 1 August"], ex: "Quy định mới bắt đầu “from 1 July” — từ ngày 1 tháng 7." },
        { kind: "detail", q: "What will the old parking area become?", ans: "A garden", wrong: ["A cafe", "A new office", "A bicycle area"], ex: "Bãi đỗ cũ phía trước tòa nhà “will become a garden” — sẽ thành một khu vườn." },
        { kind: "detail", q: "What must staff show when entering the new area?", ans: "Their parking cards", wrong: ["Their ID cards", "Their driving licences", "Their staff badges"], ex: "Nhân viên phải xuất trình “their parking cards” (thẻ gửi xe) khi vào bãi mới." },
        { kind: "purpose", q: "What is the notice mainly about?", ans: "To announce a new parking rule", wrong: ["To sell parking cards", "To invite staff to plant a garden", "To report stolen vehicles"], ex: "Thông báo công bố quy định đỗ xe mới từ ngày 1 tháng 7." },
        { kind: "not", q: "Which information is NOT mentioned in the notice?", ans: "The price of a parking card", wrong: ["Where to park", "What staff must show", "The new use of the old area"], ex: "Thông báo có nơi đỗ (sau văn phòng), thứ phải xuất trình (thẻ gửi xe) và mục đích mới của bãi cũ (vườn), nhưng không nhắc giá thẻ gửi xe." }
      ],
      tf: [
        { stmt: "Quy định đỗ xe mới bắt đầu từ ngày 1 tháng 7.", truth: true, ex: "Đúng. “From 1 July.”" },
        { stmt: "Bãi đỗ xe cũ sẽ trở thành một khu vườn.", truth: true, ex: "Đúng. “The old parking area … will become a garden.”" },
        { stmt: "Nhân viên phải xuất trình thẻ gửi xe khi vào bãi mới.", truth: true, ex: "Đúng. “Staff must show their parking cards.”" },
        { stmt: "Bãi đỗ xe mới nằm ở phía trước tòa nhà.", truth: false, ex: "Sai. Bãi mới ở phía sau văn phòng (behind the office)." },
        { stmt: "Nhân viên vẫn có thể đỗ xe ở bãi cũ nếu có thẻ.", truth: false, ex: "Sai. Mọi xe máy phải đỗ ở bãi mới; đỗ sai chỗ phải di chuyển ngay." },
        { stmt: "Quy định mới bắt đầu từ tháng Sáu.", truth: false, ex: "Sai. Quy định bắt đầu từ ngày 1 tháng 7." }
      ],
      blanks: [
        { s: "All motorbikes must be parked ______ the office.", ans: "behind", wrong: ["in front of", "inside", "next to"], ex: "Bãi đỗ mới nằm phía sau văn phòng: “behind the office”." },
        { s: "The old parking area will become a ______.", ans: "garden", wrong: ["car park", "office", "cafe"], ex: "Bãi đỗ cũ sẽ trở thành một khu vườn." }
      ],
      mpairs: [["1 July", "ngày bắt đầu quy định mới"], ["behind the office", "vị trí bãi đỗ mới"], ["parking cards", "thứ phải xuất trình khi vào"], ["a garden", "bãi đỗ cũ sẽ trở thành"]]
    },
    {
      title: "Advertisement: Evening English Course",
      passage: "<b>Learn English for Work — Evening Classes</b><br>Do you want to speak English confidently at work? Join our evening English course at Sunrise Language Centre. Classes are on Tuesday and Thursday evenings from 7 p.m. to 9 p.m., starting on 5 August. The eight-week course costs 1,200,000 dong and includes a free textbook. Small classes with a maximum of twelve students. Call 0912 778 990 to book your place today!",
      qs: [
        { kind: "detail", q: "On which evenings are the classes held?", ans: "Tuesday and Thursday evenings", wrong: ["Monday and Wednesday evenings", "Tuesday and Friday evenings", "Weekend evenings"], ex: "Lớp học vào tối thứ Ba và tối thứ Năm, từ 7 giờ đến 9 giờ tối." },
        { kind: "detail", q: "How much does the course cost?", ans: "1,200,000 dong", wrong: ["1,000,000 dong", "1,500,000 dong", "2,200,000 dong"], ex: "Khóa học tám tuần có giá 1.200.000 đồng và đã gồm sách giáo khoa miễn phí." },
        { kind: "detail", q: "What is included free with the course?", ans: "A textbook", wrong: ["A dictionary", "A laptop bag", "An exam fee"], ex: "Học phí “includes a free textbook” — đã gồm một cuốn sách giáo khoa miễn phí." },
        { kind: "purpose", q: "What is the advertisement mainly about?", ans: "To advertise an evening English course", wrong: ["To sell English textbooks", "To recruit English teachers", "To announce exam results"], ex: "Quảng cáo giới thiệu khóa tiếng Anh buổi tối tại trung tâm Sunrise." },
        { kind: "not", q: "Which information is NOT mentioned in the advertisement?", ans: "The teacher's name", wrong: ["The length of the course", "The price of the course", "The maximum class size"], ex: "Quảng cáo có độ dài khóa (8 tuần), giá (1.200.000 đồng) và sĩ số tối đa (12), nhưng không nêu tên giáo viên." }
      ],
      tf: [
        { stmt: "Lớp học diễn ra vào tối thứ Ba và tối thứ Năm.", truth: true, ex: "Đúng. “On Tuesday and Thursday evenings.”" },
        { stmt: "Khóa học kéo dài tám tuần.", truth: true, ex: "Đúng. “The eight-week course.”" },
        { stmt: "Mỗi lớp có tối đa mười hai học viên.", truth: true, ex: "Đúng. “A maximum of twelve students.”" },
        { stmt: "Lớp học diễn ra vào buổi sáng.", truth: false, ex: "Sai. Đây là lớp buổi tối, từ 7 giờ đến 9 giờ tối." },
        { stmt: "Học viên phải mua thêm sách giáo khoa.", truth: false, ex: "Sai. Sách giáo khoa được tặng miễn phí trong học phí." },
        { stmt: "Khóa học bắt đầu vào tháng Chín.", truth: false, ex: "Sai. Khóa học bắt đầu ngày 5 tháng 8." }
      ],
      blanks: [
        { s: "Classes are held from 7 p.m. to ______ p.m.", ans: "9", wrong: ["8", "10", "11"], ex: "Giờ học là từ 7 giờ đến 9 giờ tối." },
        { s: "The course lasts ______ weeks.", ans: "eight", wrong: ["six", "ten", "twelve"], ex: "Khóa học kéo dài tám tuần (eight-week course)." }
      ],
      mpairs: [["Tuesday and Thursday", "ngày học trong tuần"], ["eight weeks", "độ dài khóa học"], ["twelve students", "sĩ số tối đa mỗi lớp"], ["Sunrise Language Centre", "trung tâm tổ chức khóa học"]]
    },
    {
      title: "Advertisement: Shop Opening Sale",
      passage: "<b>Grand Opening Sale at Minh Anh Store!</b><br>Our new clothes shop opens this Saturday at 88 Le Van Sy Street. On the opening day, all shirts and dresses are reduced by twenty percent, and the first fifty customers will receive a free gift. The shop is open every day from 8 a.m. to 10 p.m. Come early and enjoy great prices on quality clothes for the whole family!",
      qs: [
        { kind: "detail", q: "When does the new shop open?", ans: "This Saturday", wrong: ["This Sunday", "Next Saturday", "This Friday"], ex: "Quảng cáo ghi cửa hàng mới “opens this Saturday” — mở cửa vào thứ Bảy tuần này." },
        { kind: "detail", q: "How much are shirts and dresses reduced on the opening day?", ans: "By twenty percent", wrong: ["By ten percent", "By fifty percent", "By five percent"], ex: "Ngày khai trương, áo sơ mi và váy được giảm hai mươi phần trăm." },
        { kind: "detail", q: "Who will receive a free gift?", ans: "The first fifty customers", wrong: ["Every customer", "The first ten customers", "Customers who buy dresses"], ex: "Năm mươi khách hàng đầu tiên sẽ nhận quà miễn phí." },
        { kind: "purpose", q: "What is the advertisement mainly about?", ans: "To advertise a shop opening sale", wrong: ["To recruit shop staff", "To sell a clothes shop", "To announce new clothes prices"], ex: "Quảng cáo thông báo đợt giảm giá nhân dịp khai trương cửa hàng mới." },
        { kind: "not", q: "Which information is NOT mentioned in the advertisement?", ans: "The price of a dress", wrong: ["The shop's address", "The opening hours", "The free gift for early customers"], ex: "Quảng cáo có địa chỉ (88 Le Van Sy), giờ mở cửa (8 a.m.–10 p.m.) và quà cho khách đầu tiên, nhưng không nêu giá cụ thể của một chiếc váy." }
      ],
      tf: [
        { stmt: "Cửa hàng mới khai trương vào thứ Bảy tuần này.", truth: true, ex: "Đúng. “Opens this Saturday.”" },
        { stmt: "Áo sơ mi và váy được giảm hai mươi phần trăm trong ngày khai trương.", truth: true, ex: "Đúng. “Reduced by twenty percent.”" },
        { stmt: "Năm mươi khách hàng đầu tiên sẽ nhận quà miễn phí.", truth: true, ex: "Đúng. “The first fifty customers will receive a free gift.”" },
        { stmt: "Mọi khách hàng đều nhận được quà miễn phí.", truth: false, ex: "Sai. Chỉ năm mươi khách hàng đầu tiên mới nhận quà." },
        { stmt: "Cửa hàng đóng cửa lúc 9 giờ tối.", truth: false, ex: "Sai. Cửa hàng mở đến 10 giờ tối." },
        { stmt: "Cửa hàng mới này bán đồ điện tử.", truth: false, ex: "Sai. Đây là cửa hàng quần áo (clothes shop)." }
      ],
      blanks: [
        { s: "The first ______ customers will receive a free gift.", ans: "fifty", wrong: ["fifteen", "twenty", "hundred"], ex: "Năm mươi khách đầu tiên (the first fifty customers) nhận quà." },
        { s: "The shop is open every day until ______ p.m.", ans: "10", wrong: ["8", "9", "11"], ex: "Giờ mở cửa là từ 8 giờ sáng đến 10 giờ tối." }
      ],
      mpairs: [["Saturday", "ngày khai trương"], ["twenty percent", "mức giảm giá ngày khai trương"], ["fifty customers", "số khách đầu tiên nhận quà"], ["88 Le Van Sy Street", "địa chỉ cửa hàng"]]
    },
    {
      title: "Train Schedule",
      passage: "<b>Train Schedule — Saturday</b><br>Train SE1: leaves Ha Noi at 6:00, arrives in Hue at 19:30.<br>Train SE3: leaves Ha Noi at 9:00, arrives in Hue at 22:15.<br>Train SE5: leaves Ha Noi at 14:00, arrives in Hue at 3:45 the next day.<br>Tickets are available at the station or online. Children under five travel free.",
      qs: [
        { kind: "detail", q: "Which train leaves Ha Noi earliest?", ans: "Train SE1", wrong: ["Train SE3", "Train SE5", "All trains leave together"], ex: "SE1 khởi hành lúc 6:00, sớm nhất trong ba chuyến." },
        { kind: "detail", q: "What time does Train SE3 arrive in Hue?", ans: "At 22:15", wrong: ["At 19:30", "At 21:15", "At 23:15"], ex: "Dòng SE3 ghi tàu đến Huế lúc 22:15." },
        { kind: "detail", q: "Which passengers travel free?", ans: "Children under five", wrong: ["Students with ID cards", "Passengers over sixty", "Children under ten"], ex: "Lịch trình ghi “Children under five travel free” — trẻ dưới năm tuổi đi miễn phí." },
        { kind: "purpose", q: "What is this text mainly about?", ans: "To give train times to Hue", wrong: ["To sell cheap tickets to Ha Noi", "To describe the city of Hue", "To advertise a hotel in Hue"], ex: "Văn bản là lịch trình tàu từ Hà Nội đi Huế, liệt kê giờ đi và giờ đến." },
        { kind: "not", q: "Which information is NOT mentioned in the schedule?", ans: "The price of a ticket", wrong: ["Departure times", "Arrival times", "Free travel for children under five"], ex: "Lịch trình có giờ đi, giờ đến và trẻ dưới 5 tuổi đi miễn phí, nhưng không nêu giá vé." }
      ],
      tf: [
        { stmt: "Tàu SE1 là chuyến khởi hành sớm nhất, lúc 6 giờ.", truth: true, ex: "Đúng. SE1 đi lúc 6:00, trước SE3 (9:00) và SE5 (14:00)." },
        { stmt: "Tàu SE3 đến Huế lúc 22 giờ 15 phút.", truth: true, ex: "Đúng. Dòng SE3 ghi đến Huế lúc 22:15." },
        { stmt: "Trẻ em dưới năm tuổi được đi tàu miễn phí.", truth: true, ex: "Đúng. “Children under five travel free.”" },
        { stmt: "Tàu SE5 đến Huế vào buổi chiều cùng ngày.", truth: false, ex: "Sai. SE5 đến Huế lúc 3:45 sáng hôm sau (the next day)." },
        { stmt: "Vé tàu chỉ được bán tại nhà ga.", truth: false, ex: "Sai. Vé bán tại ga hoặc qua mạng (online)." },
        { stmt: "Tàu SE1 đến Huế lúc 19 giờ đúng.", truth: false, ex: "Sai. SE1 đến Huế lúc 19:30." }
      ],
      blanks: [
        { s: "Train SE3 arrives in Hue at ______.", ans: "22:15", wrong: ["19:30", "21:15", "23:15"], ex: "Giờ đến của SE3 là 22:15 theo lịch trình." },
        { s: "Children under ______ travel free.", ans: "five", wrong: ["three", "seven", "ten"], ex: "Trẻ dưới năm tuổi (under five) đi miễn phí." }
      ],
      mpairs: [["SE1", "the earliest train"], ["19:30", "the arrival time of SE1"], ["SE5", "the train arriving the next day"], ["Under five", "children who travel free"]]
    },
    {
      title: "Flight Schedule",
      passage: "<b>Flight Schedule — Monday</b><br>Flight VN210: departs Ho Chi Minh City at 7:30, arrives in Da Nang at 8:50.<br>Flight VN214: departs Ho Chi Minh City at 11:00, arrives in Da Nang at 12:20.<br>Flight VN218: departs Ho Chi Minh City at 16:40, arrives in Da Nang at 18:00.<br>Passengers should arrive at the airport two hours before departure.",
      qs: [
        { kind: "detail", q: "What time does Flight VN214 depart?", ans: "At 11:00", wrong: ["At 7:30", "At 12:20", "At 16:40"], ex: "Dòng VN214 ghi chuyến bay khởi hành lúc 11:00." },
        { kind: "detail", q: "What time does Flight VN218 arrive in Da Nang?", ans: "At 18:00", wrong: ["At 16:40", "At 17:00", "At 19:00"], ex: "VN218 đến Đà Nẵng lúc 18:00 theo lịch trình." },
        { kind: "detail", q: "How early should passengers arrive at the airport?", ans: "Two hours before departure", wrong: ["One hour before departure", "Three hours before departure", "Thirty minutes before departure"], ex: "Lịch trình khuyên hành khách đến sân bay hai giờ trước giờ khởi hành." },
        { kind: "purpose", q: "What is this text mainly about?", ans: "To give flight times to Da Nang", wrong: ["To advertise cheap hotels in Da Nang", "To describe Ho Chi Minh City", "To recruit flight staff"], ex: "Văn bản liệt kê giờ bay từ TP. Hồ Chí Minh đi Đà Nẵng." },
        { kind: "not", q: "Which information is NOT mentioned in the schedule?", ans: "The price of a ticket", wrong: ["Departure times", "Arrival times", "Advice for passengers"], ex: "Lịch trình có giờ đi, giờ đến và lời khuyên cho hành khách, nhưng không nêu giá vé." }
      ],
      tf: [
        { stmt: "Chuyến VN210 là chuyến bay sớm nhất trong ngày.", truth: true, ex: "Đúng. VN210 khởi hành lúc 7:30, sớm nhất trong ba chuyến." },
        { stmt: "Hành khách nên đến sân bay hai giờ trước khi bay.", truth: true, ex: "Đúng. “Arrive at the airport two hours before departure.”" },
        { stmt: "Chuyến VN214 đến Đà Nẵng lúc 12 giờ 20 phút.", truth: true, ex: "Đúng. Dòng VN214 ghi đến Đà Nẵng lúc 12:20." },
        { stmt: "Chuyến VN218 khởi hành vào buổi sáng.", truth: false, ex: "Sai. VN218 khởi hành lúc 16:40, tức buổi chiều." },
        { stmt: "Tất cả các chuyến bay trong lịch đều đến Hà Nội.", truth: false, ex: "Sai. Cả ba chuyến đều đến Đà Nẵng." },
        { stmt: "Chuyến VN210 đến Đà Nẵng lúc 9 giờ 50 phút.", truth: false, ex: "Sai. VN210 đến Đà Nẵng lúc 8:50." }
      ],
      blanks: [
        { s: "Flight VN214 arrives in Da Nang at ______.", ans: "12:20", wrong: ["11:00", "13:20", "12:50"], ex: "Giờ đến của VN214 là 12:20." },
        { s: "Passengers should arrive ______ hours before departure.", ans: "two", wrong: ["one", "three", "four"], ex: "Hành khách nên đến trước hai giờ (two hours)." }
      ],
      mpairs: [["VN210", "the earliest flight"], ["18:00", "the arrival time of VN218"], ["Da Nang", "the destination of all flights"], ["Two hours", "how early passengers should arrive"]]
    }
  ];
  function textQ(kind) {
    var t = enPick(TEXTS);
    var qs = t.qs.filter(function (x) { return x.kind === kind; });
    if (!qs.length) return null;
    var e = enPick(qs);
    var q = enMCQ(e.q, e.ans, e.wrong, e.ex, { visual: enPassage(t.passage) });
    return { q: q, t: t, e: e };
  }
  function fTextDetail() { var r = textQ("detail"); return r ? enTag(r.q, "fTextDetail", r.t.title) : null; }
  function fTextPurpose() { var r = textQ("purpose"); return r ? enTag(r.q, "fTextPurpose", r.t.title) : null; }
  function fTextNot() { var r = textQ("not"); return r ? enTag(r.q, "fTextNot", r.t.title) : null; }
  function fTextBlank() {
    var t = enPick(TEXTS), e = enPick(t.blanks);
    var q = enBlank("Complete the sentence based on the text.", e.ans, e.wrong, e.ex,
      enPassage(t.passage) + '<div class="sentence">' + e.s + "</div>");
    return enTag(q, "fTextBlank", t.title);
  }
  function fTextTF() {
    var t = enPick(TEXTS);
    var q = enTF(pick3TF(t.tf), "Văn bản: " + stripHtml(t.passage) + " — Các mệnh đề sau đúng hay sai theo văn bản?");
    return enTag(q, "fTextTF", t.title);
  }
  function fTextMatch() {
    var t = enPick(TEXTS);
    var q = enMatch("Match the items from the text “" + t.title + "” with the correct information.", t.mpairs.slice(),
      "Đối chiếu lại văn bản “" + t.title + "” để ghép mỗi mục với thông tin đúng của nó.");
    return enTag(q, "fTextMatch", t.title);
  }
  var T2 = {
    id: "cd-en-thpt-read", emoji: "📧", name: "TOEIC: đọc hiểu văn bản ngắn",
    sub: "Email, thông báo, quảng cáo, lịch trình",
    pools: { choose: [fTextDetail, fTextPurpose, fTextNot], blank: [fTextBlank], match: [fTextMatch], games: [fTextTF] },
    knowledge: {
      notes: [
        "Mẹo câu ý chính (mainly about): đọc câu đầu và câu cuối của văn bản, đừng chọn chi tiết nhỏ dù chi tiết đó có trong bài.",
        "Mẹo câu NOT: kiểm tra lần lượt từng lựa chọn trong văn bản — ba lựa chọn được nhắc tới, lựa chọn còn lại chính là đáp án.",
        "Mẹo câu chi tiết: gạch chân từ khóa trong câu hỏi (ngày, giờ, con số, tên người) rồi dò đúng vị trí đó trong văn bản.",
        "Với email/thông báo, chú ý các thay đổi: moved, changed, instead of, late — đáp án đúng thường gắn với thông tin SAU khi thay đổi.",
        "Lịch trình dạng bảng dòng: đọc theo hàng của đúng chuyến/người được hỏi, tránh nhầm giờ của chuyến bên cạnh."
      ],
      facts: [
        { q: "Câu hỏi “What is the email mainly about?” yêu cầu tìm điều gì?", a: "Ý chính của toàn bộ email", ex: "“Mainly about” hỏi nội dung chính bao quát, không phải một chi tiết nhỏ trong bài." },
        { q: "Khi gặp câu “Which is NOT mentioned?”, em nên làm gì?", a: "Đối chiếu từng lựa chọn với văn bản", ex: "Ba lựa chọn có trong văn bản sẽ bị loại; lựa chọn không xuất hiện ở đâu cả là đáp án." }
      ],
      pairs: [["purpose", "mục đích"], ["detail", "chi tiết"], ["mention", "nhắc tới, đề cập"], ["instead of", "thay vì"], ["discount", "giảm giá"]]
    }
  };

  /* ================================================================
     (3) IELTS: TỪ VỰNG HỌC THUẬT (4 chủ đề × 12 từ)
     Mỗi từ: {w, vi, def, pre, post, gw[3 nhiễu không thể điền vào câu]}
     ================================================================ */
  var ACAD = {
    education: [
      { w: "degree", vi: "bằng cấp đại học", def: "a qualification from a university", pre: "She has a ", post: " in biology from a top university.", gw: ["lecture", "library", "exam"] },
      { w: "lecture", vi: "bài giảng", def: "a talk given to students at a university", pre: "Students listened to a ", post: " about the history of art.", gw: ["degree", "skill", "course"] },
      { w: "research", vi: "nghiên cứu", def: "careful study to find new knowledge", pre: "The team is doing ", post: " on clean water for villages.", gw: ["exam", "library", "degree"] },
      { w: "scholarship", vi: "học bổng", def: "money given to help a student study", pre: "He won a ", post: " to study abroad next year.", gw: ["lecture", "exam", "subject"] },
      { w: "subject", vi: "môn học", def: "something that students study at school", pre: "Maths is her favourite ", post: " at school.", gw: ["library", "degree", "skill"] },
      { w: "knowledge", vi: "kiến thức", def: "facts and skills that a person knows", pre: "Reading books increases your ", post: " about the world.", gw: ["exam", "lecture", "library"] },
      { w: "skill", vi: "kỹ năng", def: "the ability to do something well", pre: "Speaking English is an important ", post: " for this job.", gw: ["exam", "degree", "library"] },
      { w: "graduate", vi: "người tốt nghiệp đại học", def: "a person who has finished university", pre: "She is a university ", post: " looking for her first job.", gw: ["lecture", "subject", "exam"] },
      { w: "course", vi: "khóa học", def: "a series of lessons on a subject", pre: "He is taking an English ", post: " this summer.", gw: ["degree", "library", "skill"] },
      { w: "library", vi: "thư viện", def: "a place where people read and borrow books", pre: "Students study quietly in the ", post: " every evening.", gw: ["exam", "degree", "lecture"] },
      { w: "exam", vi: "kỳ thi", def: "a formal test of knowledge", pre: "She is studying hard for her final ", post: " next week.", gw: ["library", "course", "scholarship"] },
      { w: "primary", vi: "tiểu học; đầu tiên", def: "first or earliest; for young children", pre: "He teaches at a ", post: " school in a small village.", gw: ["degree", "exam", "library"] }
    ],
    environment: [
      { w: "pollution", vi: "ô nhiễm", def: "dirt and harmful substances in air or water", pre: "Air ", post: " is a serious problem in big cities.", gw: ["climate", "forest", "energy"] },
      { w: "climate", vi: "khí hậu", def: "the usual weather in a place over time", pre: "The ", post: " in the north is cold in winter.", gw: ["waste", "forest", "carbon"] },
      { w: "energy", vi: "năng lượng", def: "power used for heat, light and machines", pre: "Solar panels produce clean ", post: " for homes.", gw: ["waste", "climate", "forest"] },
      { w: "waste", vi: "rác thải", def: "materials that are no longer needed", pre: "Factories must not dump ", post: " into rivers.", gw: ["energy", "climate", "nature"] },
      { w: "recycle", vi: "tái chế", def: "to use materials again instead of throwing them away", pre: "We should ", post: " plastic bottles and paper.", gw: ["climate", "forest", "energy"] },
      { w: "forest", vi: "rừng", def: "a large area covered with trees", pre: "Many wild animals live in the ", post: " near the river.", gw: ["climate", "waste", "energy"] },
      { w: "protect", vi: "bảo vệ", def: "to keep someone or something safe", pre: "We must ", post: " the environment for our children.", gw: ["climate", "forest", "waste"] },
      { w: "nature", vi: "thiên nhiên", def: "plants, animals and the natural world", pre: "Children should spend more time in ", post: " at weekends.", gw: ["waste", "energy", "carbon"] },
      { w: "carbon", vi: "carbon (khí CO2)", def: "a chemical element found in coal and oil", pre: "Burning coal releases ", post: " into the air.", gw: ["climate", "forest", "nature"] },
      { w: "resource", vi: "tài nguyên", def: "something useful that a country has, like water or oil", pre: "Water is a valuable natural ", post: " for farming.", gw: ["pollution", "climate", "waste"] },
      { w: "clean", vi: "sạch", def: "not dirty", pre: "The beach is now ", post: " after the weekend campaign.", gw: ["carbon", "climate", "forest"] },
      { w: "green", vi: "xanh (màu lá)", def: "the colour of grass and leaves", pre: "The hills are ", post: " in spring after the rain.", gw: ["carbon", "waste", "climate"] }
    ],
    technology: [
      { w: "device", vi: "thiết bị", def: "a machine made for a special purpose", pre: "He bought a small ", post: " to record his lectures.", gw: ["data", "screen", "software"] },
      { w: "internet", vi: "mạng internet", def: "a global system connecting computers", pre: "Students can find information on the ", post: " in seconds.", gw: ["software", "machine", "automatic"] },
      { w: "software", vi: "phần mềm", def: "computer programs", pre: "Word and Excel are examples of ", post: " used in offices.", gw: ["device", "screen", "data"] },
      { w: "data", vi: "dữ liệu", def: "facts and information stored by a computer", pre: "The computer stores a large amount of ", post: " safely.", gw: ["device", "screen", "internet"] },
      { w: "machine", vi: "máy móc", def: "a piece of equipment with moving parts", pre: "This ", post: " washes clothes in forty minutes.", gw: ["data", "internet", "software"] },
      { w: "modern", vi: "hiện đại", def: "new and using the latest ideas", pre: "The office uses ", post: " computers and fast networks.", gw: ["data", "device", "screen"] },
      { w: "invent", vi: "phát minh", def: "to create something new for the first time", pre: "Scientists ", post: " new tools to solve hard problems.", gw: ["data", "screen", "internet"] },
      { w: "screen", vi: "màn hình", def: "the flat part of a computer or phone that shows pictures", pre: "The picture on the ", post: " is very clear and bright.", gw: ["data", "software", "machine"] },
      { w: "digital", vi: "kỹ thuật số", def: "using electronic signals and numbers", pre: "We keep our family photos in ", post: " form today.", gw: ["data", "device", "screen"] },
      { w: "connect", vi: "kết nối", def: "to join two things together", pre: "You can ", post: " the printer to the computer easily.", gw: ["data", "screen", "software"] },
      { w: "automatic", vi: "tự động", def: "working by itself without human control", pre: "The doors are ", post: ", so they open by themselves.", gw: ["data", "internet", "software"] },
      { w: "electric", vi: "chạy bằng điện", def: "using electricity for power", pre: "An ", post: " car does not use petrol at all.", gw: ["data", "screen", "internet"] }
    ],
    health: [
      { w: "disease", vi: "bệnh tật", def: "an illness that affects the body", pre: "Clean water helps prevent ", post: " in poor villages.", gw: ["medicine", "doctor", "diet"] },
      { w: "medicine", vi: "thuốc", def: "a substance used to treat illness", pre: "Take this ", post: " twice a day after meals.", gw: ["diet", "patient", "hospital"] },
      { w: "exercise", vi: "bài tập thể dục", def: "activity that keeps the body strong", pre: "Daily ", post: " keeps your body strong and active.", gw: ["patient", "doctor", "hospital"] },
      { w: "patient", vi: "bệnh nhân", def: "a person who is receiving medical care", pre: "The doctor talked kindly to the ", post: " in the room.", gw: ["medicine", "exercise", "diet"] },
      { w: "treatment", vi: "việc điều trị", def: "medical care given to a sick person", pre: "He received free ", post: " at the local hospital.", gw: ["diet", "exercise", "stress"] },
      { w: "prevent", vi: "ngăn ngừa", def: "to stop something from happening", pre: "Washing hands can ", post: " many common infections.", gw: ["medicine", "patient", "doctor"] },
      { w: "diet", vi: "chế độ ăn", def: "the food that a person usually eats", pre: "A balanced ", post: " includes vegetables and fruit daily.", gw: ["medicine", "exercise", "doctor"] },
      { w: "stress", vi: "căng thẳng", def: "a feeling of worry caused by problems", pre: "Too much work can cause ", post: " and poor sleep.", gw: ["medicine", "patient", "exercise"] },
      { w: "hospital", vi: "bệnh viện", def: "a place where sick people are treated", pre: "She works as a nurse in a big ", post: " in the city.", gw: ["medicine", "diet", "exercise"] },
      { w: "recover", vi: "hồi phục", def: "to become healthy again after an illness", pre: "It took him two weeks to ", post: " from the flu.", gw: ["medicine", "patient", "doctor"] },
      { w: "healthy", vi: "khỏe mạnh", def: "strong and not ill", pre: "Eating vegetables helps you stay ", post: " all year.", gw: ["medicine", "patient", "diet"] },
      { w: "doctor", vi: "bác sĩ", def: "a person whose job is to treat sick people", pre: "The ", post: " advised him to rest at home.", gw: ["medicine", "diet", "stress"] }
    ]
  };
  var ACAD_THEMES = Object.keys(ACAD);
  function allWords() { var out = []; ACAD_THEMES.forEach(function (k) { ACAD[k].forEach(function (e) { out.push({ theme: k, e: e }); }); }); return out; }
  var COLLOC = [
    { s: "Scientists do ______ on climate change at the university.", ans: "research", wrong: ["progress", "exam", "knowledge"], ex: "Cụm cố định “do research” (làm nghiên cứu). Không nói “do progress” hay “do exam”." },
    { s: "The university will conduct ______ into new medicines.", ans: "research", wrong: ["exam", "progress", "knowledge"], ex: "“Conduct research” (tiến hành nghiên cứu) là collocation học thuật rất phổ biến trong IELTS." },
    { s: "With daily practice, she is making good ______ in English.", ans: "progress", wrong: ["research", "exam", "homework"], ex: "Cụm cố định “make progress” (tiến bộ). Động từ đi với progress luôn là “make”." },
    { s: "At the end of the course, students take a final ______.", ans: "exam", wrong: ["research", "homework", "knowledge"], ex: "“Take an exam” (thi, dự thi) — học sinh “take” kỳ thi cuối khóa." },
    { s: "Travelling helps you gain ______ about other cultures.", ans: "knowledge", wrong: ["exam", "progress", "research"], ex: "“Gain knowledge” (thu nạp kiến thức) là cụm cố định; “about” phía sau càng khẳng định đáp án." },
    { s: "Planting trees helps protect the ______ around us.", ans: "environment", wrong: ["energy", "waste", "pollution"], ex: "“Protect the environment” (bảo vệ môi trường) là collocation chuẩn chủ đề môi trường." },
    { s: "Turn off the lights when you leave to save ______.", ans: "energy", wrong: ["knowledge", "pollution", "exam"], ex: "Tắt đèn khi ra khỏi phòng là để “save energy” (tiết kiệm năng lượng)." },
    { s: "Electric buses can reduce air ______ in big cities.", ans: "pollution", wrong: ["energy", "knowledge", "research"], ex: "“Reduce air pollution” (giảm ô nhiễm không khí) — xe buýt điện giúp giảm khí thải." },
    { s: "The town has a new plan to recycle its household ______.", ans: "waste", wrong: ["energy", "knowledge", "climate"], ex: "“Recycle waste” (tái chế rác thải); rác sinh hoạt là “household waste”." },
    { s: "You can use this ______ to measure the temperature.", ans: "device", wrong: ["screen", "data", "energy"], ex: "Dụng cụ đo nhiệt độ là một “device” (thiết bị). “Data” hay “screen” không đo được nhiệt độ." },
    { s: "You need a password to connect to the ______ at this cafe.", ans: "internet", wrong: ["software", "screen", "exam"], ex: "“Connect to the internet” (kết nối vào internet) cần mật khẩu ở quán cà phê." },
    { s: "Vaccines help prevent ______ in young children.", ans: "disease", wrong: ["stress", "medicine", "exercise"], ex: "Vắc-xin giúp “prevent disease” (phòng bệnh), không phòng căng thẳng hay thuốc." },
    { s: "It took her a month to ______ from the flu.", ans: "recover", wrong: ["prevent", "protect", "reduce"], ex: "“Recover from an illness” (hồi phục sau bệnh) là cụm cố định; “prevent from” không tồn tại." },
    { s: "Regular exercise is a good way to reduce ______.", ans: "stress", wrong: ["pollution", "energy", "knowledge"], ex: "Tập thể dục thường xuyên giúp “reduce stress” (giảm căng thẳng)." },
    { s: "A balanced diet and enough sleep help you stay ______.", ans: "healthy", wrong: ["clean", "green", "modern"], ex: "“Stay healthy” (giữ sức khỏe tốt) đi với chế độ ăn cân bằng và ngủ đủ giấc." },
    { s: "The new ______ at the city hospital helped many patients.", ans: "treatment", wrong: ["diet", "exercise", "stress"], ex: "Phương pháp “treatment” (điều trị) mới tại bệnh viện đã giúp nhiều bệnh nhân." },
    { s: "Students can borrow books from the school ______.", ans: "library", wrong: ["course", "exam", "subject"], ex: "Nơi học sinh mượn sách là “library” (thư viện) của trường." },
    { s: "He won a ______ to study in Australia next year.", ans: "scholarship", wrong: ["degree", "lecture", "course"], ex: "“Win a scholarship” (giành học bổng) để đi du học; bằng cấp chỉ nhận sau khi học xong." },
    { s: "Solar power is a clean source of ______ for homes.", ans: "energy", wrong: ["data", "waste", "pollution"], ex: "Điện mặt trời là nguồn “energy” (năng lượng) sạch cho các hộ gia đình." },
    { s: "We must not waste natural ______ like water and forests.", ans: "resources", wrong: ["devices", "screens", "lectures"], ex: "“Natural resources” (tài nguyên thiên nhiên) gồm nước và rừng; dạng số nhiều “resources” là dạng cố định viết sẵn." },
    { s: "The factory releases ______ into the air every day.", ans: "carbon", wrong: ["software", "stress", "exam"], ex: "Nhà máy thải “carbon” (khí carbon) vào không khí — chủ đề môi trường trong IELTS." },
    { s: "Throwing plastic into the sea causes water ______.", ans: "pollution", wrong: ["climate", "energy", "carbon"], ex: "“Water pollution” (ô nhiễm nguồn nước) là cụm danh từ cố định." },
    { s: "Students keep their notes in ______ form on tablets.", ans: "digital", wrong: ["automatic", "electric", "modern"], ex: "“Digital form” (dạng kỹ thuật số) là cách lưu ghi chú trên máy tính bảng." },
    { s: "After four years at university, he earned a ______.", ans: "degree", wrong: ["scholarship", "lecture", "course"], ex: "Sau bốn năm đại học, anh ấy nhận “a degree” (một tấm bằng); học bổng nhận trước khi học." },
    { s: "Smoking is a major cause of heart ______.", ans: "disease", wrong: ["stress", "medicine", "exercise"], ex: "“Heart disease” (bệnh tim) là cụm danh từ cố định trong chủ đề y tế." },
    { s: "The government plans to build a new ______ to treat sick people in the town.", ans: "hospital", wrong: ["library", "course", "exam"], ex: "Nơi chữa trị cho người bệnh là “hospital” (bệnh viện)." }
  ];
  var ACAD_TF = [
    { stmt: "“Degree” nghĩa là “bằng cấp đại học”.", truth: true, ex: "Đúng. Degree là văn bằng nhận được sau khi tốt nghiệp đại học." },
    { stmt: "“Lecture” nghĩa là “học bổng”.", truth: false, ex: "Sai. Lecture là bài giảng; học bổng là “scholarship”." },
    { stmt: "“Pollution” nghĩa là “ô nhiễm”.", truth: true, ex: "Đúng. Pollution là sự ô nhiễm không khí, nước hoặc đất." },
    { stmt: "“Recycle” nghĩa là “lãng phí”.", truth: false, ex: "Sai. Recycle là tái chế; lãng phí là “waste”." },
    { stmt: "“Device” nghĩa là “thiết bị”.", truth: true, ex: "Đúng. Device là một thiết bị/máy dùng cho mục đích nhất định." },
    { stmt: "“Data” nghĩa là “màn hình”.", truth: false, ex: "Sai. Data là dữ liệu; màn hình là “screen”." },
    { stmt: "“Patient” nghĩa là “bệnh nhân”.", truth: true, ex: "Đúng. Patient là người đang được chăm sóc y tế." },
    { stmt: "“Prevent” nghĩa là “hồi phục”.", truth: false, ex: "Sai. Prevent là ngăn ngừa; hồi phục là “recover”." },
    { stmt: "“Climate” nghĩa là “khí hậu”.", truth: true, ex: "Đúng. Climate là kiểu thời tiết đặc trưng lâu dài của một vùng." },
    { stmt: "“Knowledge” nghĩa là “kỹ năng”.", truth: false, ex: "Sai. Knowledge là kiến thức; kỹ năng là “skill”." },
    { stmt: "“Treatment” nghĩa là “việc điều trị”.", truth: true, ex: "Đúng. Treatment là sự chăm sóc y tế dành cho người bệnh." },
    { stmt: "“Scholarship” nghĩa là “kỳ thi”.", truth: false, ex: "Sai. Scholarship là học bổng; kỳ thi là “exam”." },
    { stmt: "“Internet” nghĩa là “mạng internet”.", truth: true, ex: "Đúng. Internet là mạng toàn cầu kết nối các máy tính." },
    { stmt: "“Forest” nghĩa là “năng lượng”.", truth: false, ex: "Sai. Forest là rừng; năng lượng là “energy”." },
    { stmt: "“Recover” nghĩa là “hồi phục”.", truth: true, ex: "Đúng. Recover là khỏe lại sau khi ốm." },
    { stmt: "“Subject” nghĩa là “thư viện”.", truth: false, ex: "Sai. Subject là môn học; thư viện là “library”." }
  ];
  function acadEntry() { return enPick(allWords()); }
  function sameThemeWrong(e, theme, field) {
    return distinctPick(ACAD[theme].filter(function (x) { return x.w !== e.w; }), 3).map(function (x) { return x[field]; });
  }
  function fAcadDef() {
    var r = acadEntry();
    var q = enMCQ("What does the word “" + r.e.w + "” mean?", r.e.vi, sameThemeWrong(r.e, r.theme, "vi"),
      "“" + r.e.w + "” nghĩa là “" + r.e.vi + "”. Định nghĩa tiếng Anh: " + r.e.def + ".", {});
    return enTag(q, "fAcadDef", r.e.w);
  }
  function fAcadEnDef() {
    var r = acadEntry();
    var q = enMCQ("Which word means: “" + r.e.def + "”?", r.e.w, sameThemeWrong(r.e, r.theme, "w"),
      "Định nghĩa “" + r.e.def + "” chính là từ “" + r.e.w + "” (" + r.e.vi + ").", {});
    return enTag(q, "fAcadEnDef", r.e.w);
  }
  function fAcadGap() {
    var r = acadEntry();
    var q = enBlank("Complete the academic sentence with the correct word.", r.e.w, r.e.gw,
      "Đáp án là “" + r.e.w + "” (" + r.e.vi + "): " + r.e.def + ".",
      '<div class="sentence">' + r.e.pre + "_____" + r.e.post + "</div>");
    return enTag(q, "fAcadGap", r.e.w);
  }
  function fColloc() {
    var e = enPick(COLLOC);
    var q = enMCQ("Choose the correct word to complete the collocation: " + e.s, e.ans, e.wrong, e.ex, {});
    return enTag(q, "fColloc", e.ans);
  }
  function fAcadMatch() {
    var theme = enPick(ACAD_THEMES);
    var pairs = distinctPick(ACAD[theme], 5).map(function (e) { return [e.w, e.vi]; });
    var q = enMatch("Match each academic word with its Vietnamese meaning.", pairs,
      "Ghép mỗi từ học thuật với nghĩa tiếng Việt đúng. Mẹo IELTS: học từ kèm chủ đề (giáo dục, môi trường, công nghệ, y tế) để nhớ lâu.");
    return enTag(q, "fAcadMatch", theme);
  }
  function fAcadTF() {
    var q = enTF(pick3TF(ACAD_TF), "Mệnh đề về nghĩa của từ sau đây đúng hay sai?");
    return enTag(q, "fAcadTF", "mix");
  }
  var T3 = {
    id: "cd-en-thpt-vocab", emoji: "🎓", name: "IELTS: từ vựng học thuật",
    sub: "Giáo dục, môi trường, công nghệ, y tế + collocations",
    pools: { choose: [fAcadDef, fAcadEnDef, fColloc], blank: [fAcadGap], match: [fAcadMatch], games: [fAcadTF] },
    knowledge: {
      notes: [
        "Mẹo IELTS Writing/Speaking: học từ theo CỤM (collocation) — do research, make progress, protect the environment — giám khảo đánh giá cao cụm tự nhiên hơn từ đơn lẻ “khó”.",
        "Mỗi từ học kèm một định nghĩa tiếng Anh ngắn: khi gặp từ mới trong bài đọc, đoán nghĩa từ định nghĩa và ngữ cảnh trước khi tra từ điển.",
        "Chú ý họ từ học thuật: research (n/v), pollution (n) — pollute (v), prevent (v) — prevention (n); dạng từ quyết định vị trí trong câu.",
        "Bốn chủ đề xuất hiện liên tục trong IELTS: giáo dục, môi trường, công nghệ, y tế. Mỗi tuần học sâu một chủ đề 12 từ kèm câu ví dụ của riêng em."
      ],
      facts: [
        { q: "“Do” hay “make” đi với “research” và “progress”?", a: "do research — make progress", ex: "Hai cụm cố định: “do/conduct research” (làm nghiên cứu) và “make progress” (tiến bộ). Đây là lỗi collocation người Việt hay mắc nhất." },
        { q: "“Protect the environment” nghĩa là gì?", a: "Bảo vệ môi trường", ex: "Đây là collocation chuẩn chủ đề môi trường, dùng được cả trong IELTS Writing và Speaking." }
      ],
      pairs: [["research", "nghiên cứu"], ["pollution", "ô nhiễm"], ["scholarship", "học bổng"], ["treatment", "việc điều trị"], ["device", "thiết bị"]]
    }
  };

  /* ================================================================
     (4) IELTS: TRUE / FALSE / NOT GIVEN (8 đoạn viết mới)
     Mỗi đoạn: 6 mệnh đề = 2 True + 2 False + 2 Not Given, mỗi mệnh
     đề có ev (bằng chứng đối chiếu trong đoạn) và ex tiếng Việt.
     ================================================================ */
  var TFNG = [
    {
      title: "A City Library",
      passage: "The Central Library in our city opened in 1998 and is located on Tran Hung Dao Street. It opens every day from 8 a.m. to 8 p.m. Visitors can borrow up to three books at a time and keep them for two weeks. The library has a special reading room for children on the ground floor, with story books and picture books. Every Saturday morning, volunteers read stories to young children there. The library also offers free internet access on the second floor.",
      stmts: [
        { stmt: "The library opened in 1998.", verdict: "True", ev: "“The Central Library in our city opened in 1998”", ex: "True — đoạn văn nói rõ thư viện mở cửa năm 1998." },
        { stmt: "Visitors can borrow up to three books at a time.", verdict: "True", ev: "“Visitors can borrow up to three books at a time”", ex: "True — đoạn văn nói mỗi lần mượn được tối đa ba cuốn sách." },
        { stmt: "The library closes at 6 p.m.", verdict: "False", ev: "“It opens every day from 8 a.m. to 8 p.m.”", ex: "False — thư viện mở đến 8 giờ tối, không phải đóng lúc 6 giờ." },
        { stmt: "The children's reading room is on the second floor.", verdict: "False", ev: "“a special reading room for children on the ground floor” — tầng hai là khu internet", ex: "False — phòng đọc của trẻ em ở tầng trệt; tầng hai là khu internet miễn phí." },
        { stmt: "The library has more than 10,000 books.", verdict: "Not Given", ev: "Đoạn văn không hề nhắc tổng số sách của thư viện", ex: "Not Given — đoạn văn không cho biết thư viện có bao nhiêu cuốn sách." },
        { stmt: "Most visitors to the library are university students.", verdict: "Not Given", ev: "Đoạn văn không nhắc người đến thư viện chủ yếu là ai", ex: "Not Given — không có thông tin nào về đối tượng khách chính của thư viện." }
      ],
      details: [
        { q: "In which year did the Central Library open?", ans: "In 1998", wrong: ["In 1989", "In 2008", "In 1990"], ex: "Câu đầu của đoạn văn ghi thư viện mở năm 1998." },
        { q: "How long can visitors keep borrowed books?", ans: "For two weeks", wrong: ["For one week", "For one month", "For three days"], ex: "Đoạn văn nói bạn đọc giữ sách được hai tuần (keep them for two weeks)." },
        { q: "Where can visitors use the internet for free?", ans: "On the second floor", wrong: ["On the ground floor", "In the children's room", "Near the entrance"], ex: "Internet miễn phí ở tầng hai (free internet access on the second floor)." }
      ],
      blanks: [
        { s: "Visitors can borrow up to ______ books at a time.", ans: "three", wrong: ["two", "five", "ten"], ex: "Mỗi lần mượn tối đa ba cuốn sách (up to three books)." },
        { s: "Volunteers read stories to children every ______ morning.", ans: "Saturday", wrong: ["Sunday", "Friday", "Monday"], ex: "Tình nguyện viên đọc truyện vào sáng thứ Bảy hằng tuần." }
      ]
    },
    {
      title: "Bees and Farming",
      passage: "Bees play an important role in farming. When bees move from flower to flower, they carry pollen, which helps many plants produce fruit and seeds. About one third of the food we eat depends on pollination by bees and other insects. However, bee numbers are falling in many countries. Scientists believe that some farm chemicals and the loss of wild flowers are two important reasons for this decline. To help bees, some farmers now plant wild flowers along the edges of their fields.",
      stmts: [
        { stmt: "Bees help many plants produce fruit and seeds.", verdict: "True", ev: "“they carry pollen, which helps many plants produce fruit and seeds”", ex: "True — ong mang phấn hoa, giúp cây tạo quả và hạt." },
        { stmt: "Some farmers plant wild flowers to help bees.", verdict: "True", ev: "“some farmers now plant wild flowers along the edges of their fields”", ex: "True — một số nông dân trồng hoa dại ven ruộng để giúp ong." },
        { stmt: "Half of the food we eat depends on pollination by bees and other insects.", verdict: "False", ev: "“About one third of the food we eat depends on pollination”", ex: "False — tỉ lệ trong bài là khoảng một phần ba, không phải một nửa." },
        { stmt: "Bee numbers are rising in many countries.", verdict: "False", ev: "“bee numbers are falling in many countries”", ex: "False — số ong đang GIẢM ở nhiều nước, trái ngược với mệnh đề." },
        { stmt: "Bees produce a large amount of honey every year.", verdict: "Not Given", ev: "Đoạn văn không hề nhắc đến mật ong (honey)", ex: "Not Given — bài viết chỉ nói vai trò thụ phấn của ong, không nhắc sản lượng mật ong." },
        { stmt: "Wild flowers are more expensive than farm crops.", verdict: "Not Given", ev: "Đoạn văn không so sánh giá của hoa dại và cây trồng", ex: "Not Given — không có thông tin nào về giá của hoa dại." }
      ],
      details: [
        { q: "What do bees carry from flower to flower?", ans: "Pollen", wrong: ["Seeds", "Fruit", "Water"], ex: "Ong mang phấn hoa (pollen) từ hoa này sang hoa khác." },
        { q: "About how much of our food depends on pollination?", ans: "One third", wrong: ["One half", "Two thirds", "One quarter"], ex: "Đoạn văn ghi khoảng một phần ba lượng thực phẩm phụ thuộc vào thụ phấn." },
        { q: "Why are bee numbers falling?", ans: "Farm chemicals and fewer wild flowers", wrong: ["Cold weather and disease", "Too many farmers", "Lack of water and food"], ex: "Hai nguyên nhân trong bài: hóa chất nông nghiệp và sự mất đi của hoa dại." }
      ],
      blanks: [
        { s: "Bees carry ______ from flower to flower.", ans: "pollen", wrong: ["seeds", "fruit", "water"], ex: "Thứ ong mang theo là phấn hoa (pollen)." },
        { s: "Bee numbers are ______ in many countries.", ans: "falling", wrong: ["rising", "stable", "growing"], ex: "Số ong đang giảm (are falling) ở nhiều nước." }
      ]
    },
    {
      title: "Learning Online",
      passage: "Online learning has become popular with students of all ages. It allows learners to study at home and choose a time that suits them. Many online courses are cheaper than traditional classes because students do not need to travel. However, online learning also has disadvantages. Students must be self-disciplined, because no teacher watches them during lessons. Some learners also miss talking with classmates face to face. For these reasons, many schools now combine online lessons with regular classroom activities.",
      stmts: [
        { stmt: "Many online courses are cheaper than traditional classes.", verdict: "True", ev: "“Many online courses are cheaper than traditional classes”", ex: "True — đoạn văn nói thẳng nhiều khóa học trực tuyến rẻ hơn lớp truyền thống." },
        { stmt: "Some schools combine online lessons with classroom activities.", verdict: "True", ev: "“many schools now combine online lessons with regular classroom activities”", ex: "True — nhiều trường kết hợp bài học trực tuyến với hoạt động trên lớp." },
        { stmt: "Online learning has no disadvantages.", verdict: "False", ev: "“online learning also has disadvantages”", ex: "False — đoạn văn khẳng định học trực tuyến cũng có nhược điểm." },
        { stmt: "A teacher watches students during every online lesson.", verdict: "False", ev: "“no teacher watches them during lessons”", ex: "False — trong giờ học trực tuyến không có giáo viên giám sát học sinh." },
        { stmt: "Online courses are more popular than classroom courses.", verdict: "Not Given", ev: "Đoạn văn chỉ nói học trực tuyến “has become popular”, không so sánh mức phổ biến với lớp truyền thống", ex: "Not Given — bài nói học trực tuyến trở nên phổ biến, nhưng không hề so sánh với lớp học truyền thống." },
        { stmt: "Most students prefer studying in the evening.", verdict: "Not Given", ev: "Đoạn văn không nhắc thời gian học yêu thích của học sinh", ex: "Not Given — không có thông tin học sinh thích học buổi tối hay không." }
      ],
      details: [
        { q: "Why are many online courses cheaper?", ans: "Students do not need to travel", wrong: ["Teachers are paid less", "All books are free", "Lessons are much shorter"], ex: "Khóa trực tuyến rẻ hơn vì học sinh không cần đi lại (do not need to travel)." },
        { q: "What quality must online students have?", ans: "Self-discipline", wrong: ["A fast computer", "Rich parents", "A quiet house"], ex: "Học sinh phải tự giác (must be self-disciplined) vì không có giáo viên giám sát." },
        { q: "What do some learners miss when studying online?", ans: "Talking with classmates face to face", wrong: ["Watching lesson videos", "Doing homework at home", "Meeting teachers online"], ex: "Một số người học nhớ việc trò chuyện trực tiếp với bạn cùng lớp." }
      ],
      blanks: [
        { s: "Online learning allows learners to study at ______.", ans: "home", wrong: ["school", "the library", "the office"], ex: "Học trực tuyến cho phép học tại nhà (study at home)." },
        { s: "Many schools combine online lessons with regular ______ activities.", ans: "classroom", wrong: ["online", "home", "video"], ex: "Các trường kết hợp bài học trực tuyến với hoạt động trên lớp học (classroom activities)." }
      ]
    },
    {
      title: "A Famous Bridge",
      passage: "The Golden Gate Bridge in San Francisco, in the United States, was completed in 1937. The bridge is 2.7 kilometres long and connects the city of San Francisco to Marin County. Its famous orange-red colour helps ships and planes see it clearly in the fog, which is common in the area. About 100,000 vehicles cross the bridge every day. Tourists can walk or cycle across the bridge on a special path on its eastern side.",
      stmts: [
        { stmt: "The Golden Gate Bridge was completed in 1937.", verdict: "True", ev: "“was completed in 1937”", ex: "True — cây cầu hoàn thành năm 1937." },
        { stmt: "The bridge connects San Francisco to Marin County.", verdict: "True", ev: "“connects the city of San Francisco to Marin County”", ex: "True — cầu nối San Francisco với quận Marin." },
        { stmt: "The bridge is painted blue.", verdict: "False", ev: "“Its famous orange-red colour”", ex: "False — màu nổi tiếng của cầu là đỏ cam, không phải xanh dương." },
        { stmt: "Tourists are not allowed to walk on the bridge.", verdict: "False", ev: "“Tourists can walk or cycle across the bridge”", ex: "False — du khách ĐƯỢC đi bộ hoặc đạp xe qua cầu theo lối riêng." },
        { stmt: "The bridge took ten years to build.", verdict: "Not Given", ev: "Đoạn văn chỉ cho năm hoàn thành (1937), không nói thời gian xây dựng", ex: "Not Given — bài không nhắc việc xây cầu mất bao lâu." },
        { stmt: "The Golden Gate Bridge is the longest bridge in the world.", verdict: "Not Given", ev: "Đoạn văn cho chiều dài 2.7 km nhưng không gọi đây là cầu dài nhất thế giới", ex: "Not Given — bài không hề khẳng định đây là cây cầu dài nhất thế giới." }
      ],
      details: [
        { q: "How long is the Golden Gate Bridge?", ans: "2.7 kilometres", wrong: ["1.7 kilometres", "3.7 kilometres", "2.0 kilometres"], ex: "Đoạn văn ghi cầu dài 2,7 kilômét." },
        { q: "Why is the bridge painted orange-red?", ans: "So ships and planes can see it in fog", wrong: ["To attract more tourists", "Because it was the cheapest paint", "To match the colour of the sunset"], ex: "Màu đỏ cam giúp tàu và máy bay nhìn rõ cầu trong sương mù." },
        { q: "About how many vehicles cross the bridge every day?", ans: "About 100,000", wrong: ["About 10,000", "About 50,000", "About 200,000"], ex: "Khoảng 100.000 phương tiện qua cầu mỗi ngày." }
      ],
      blanks: [
        { s: "The Golden Gate Bridge was completed in ______.", ans: "1937", wrong: ["1930", "1947", "1927"], ex: "Năm hoàn thành của cầu là 1937." },
        { s: "About ______ vehicles cross the bridge every day.", ans: "100,000", wrong: ["10,000", "50,000", "200,000"], ex: "Mỗi ngày có khoảng 100.000 phương tiện qua cầu." }
      ]
    },
    {
      title: "The Story of Coffee",
      passage: "Coffee was first discovered in Ethiopia, in Africa, hundreds of years ago. According to an old story, a farmer noticed that his goats became full of energy after eating red berries from a certain bush. People later learned to dry and roast the beans inside the berries to make a drink. Coffee spread from Ethiopia to the Arab world and then to Europe. Today, coffee is grown in many warm countries, and Brazil is the largest producer in the world.",
      stmts: [
        { stmt: "Coffee was first discovered in Ethiopia.", verdict: "True", ev: "“Coffee was first discovered in Ethiopia”", ex: "True — cà phê được phát hiện đầu tiên ở Ethiopia." },
        { stmt: "Brazil is now the largest coffee producer in the world.", verdict: "True", ev: "“Brazil is the largest producer in the world”", ex: "True — ngày nay Brazil là nước sản xuất cà phê lớn nhất thế giới." },
        { stmt: "Coffee was first discovered in Brazil.", verdict: "False", ev: "“Coffee was first discovered in Ethiopia, in Africa”", ex: "False — nơi phát hiện đầu tiên là Ethiopia; Brazil chỉ là nhà sản xuất lớn nhất hiện nay." },
        { stmt: "The farmer's goats became sleepy after eating the red berries.", verdict: "False", ev: "“his goats became full of energy after eating red berries”", ex: "False — đàn dê trở nên đầy năng lượng, không phải buồn ngủ." },
        { stmt: "Coffee arrived in Europe in the fifteenth century.", verdict: "Not Given", ev: "Đoạn văn nói cà phê lan tới châu Âu nhưng không cho thế kỷ cụ thể", ex: "Not Given — bài không nêu cà phê đến châu Âu vào thế kỷ nào." },
        { stmt: "Ethiopian farmers earn a lot of money from coffee today.", verdict: "Not Given", ev: "Đoạn văn không nhắc thu nhập của nông dân Ethiopia ngày nay", ex: "Not Given — không có thông tin về thu nhập từ cà phê của nông dân Ethiopia." }
      ],
      details: [
        { q: "What did the farmer's goats eat?", ans: "Red berries", wrong: ["Coffee flowers", "Green leaves", "Dry beans"], ex: "Đàn dê ăn những quả mọng đỏ (red berries) từ một bụi cây." },
        { q: "Where did coffee spread to after the Arab world?", ans: "To Europe", wrong: ["To Brazil", "To Africa", "To Asia"], ex: "Thứ tự trong bài: Ethiopia → thế giới Ả Rập → châu Âu." },
        { q: "Which country is the largest coffee producer today?", ans: "Brazil", wrong: ["Ethiopia", "Vietnam", "Italy"], ex: "Câu cuối ghi Brazil là nhà sản xuất cà phê lớn nhất thế giới." }
      ],
      blanks: [
        { s: "Coffee was first discovered in ______.", ans: "Ethiopia", wrong: ["Brazil", "France", "China"], ex: "Nơi phát hiện cà phê đầu tiên là Ethiopia ở châu Phi." },
        { s: "The farmer noticed that his ______ became full of energy.", ans: "goats", wrong: ["cows", "horses", "sheep"], ex: "Con vật trong câu chuyện là đàn dê (goats) của người nông dân." }
      ]
    },
    {
      title: "Young Inventors",
      passage: "Every year, a national competition encourages young people in Britain to design useful inventions. Last year, the winner was a sixteen-year-old girl who designed a special backpack for cyclists. The backpack has lights that show other drivers when the cyclist is turning left or right. Another popular invention was a cup that changes colour when a drink is too hot. The organisers hope the competition will encourage more students to study science and engineering at university.",
      stmts: [
        { stmt: "The winning invention last year was a backpack for cyclists.", verdict: "True", ev: "“the winner was a sixteen-year-old girl who designed a special backpack for cyclists”", ex: "True — phát minh thắng cuộc năm ngoái là chiếc ba lô cho người đi xe đạp." },
        { stmt: "The backpack's lights show when the cyclist is turning.", verdict: "True", ev: "“lights that show other drivers when the cyclist is turning left or right”", ex: "True — đèn trên ba lô báo cho tài xế khác biết khi người đi xe đạp rẽ." },
        { stmt: "The winner last year was a sixteen-year-old boy.", verdict: "False", ev: "“the winner was a sixteen-year-old girl”", ex: "False — người thắng cuộc là một cô gái mười sáu tuổi." },
        { stmt: "The cup changes colour when a drink is too cold.", verdict: "False", ev: "“a cup that changes colour when a drink is too hot”", ex: "False — chiếc cốc đổi màu khi đồ uống quá NÓNG, không phải quá lạnh." },
        { stmt: "The winner received a prize of 1,000 pounds.", verdict: "Not Given", ev: "Đoạn văn không nhắc giá trị giải thưởng", ex: "Not Given — bài không cho biết giải thưởng là bao nhiêu tiền." },
        { stmt: "The competition has run for twenty years.", verdict: "Not Given", ev: "Đoạn văn chỉ nói cuộc thi diễn ra hằng năm (“every year”), không nói đã tổ chức bao nhiêu năm", ex: "Not Given — không có thông tin cuộc thi đã tồn tại bao lâu." }
      ],
      details: [
        { q: "Who won the competition last year?", ans: "A sixteen-year-old girl", wrong: ["A sixteen-year-old boy", "A university student", "An engineering teacher"], ex: "Người thắng cuộc là một cô gái mười sáu tuổi." },
        { q: "What does the special cup do?", ans: "Changes colour when a drink is too hot", wrong: ["Changes colour when a drink is too cold", "Makes hot drinks hotter", "Keeps drinks cold for hours"], ex: "Chiếc cốc đổi màu khi đồ uống quá nóng." },
        { q: "What do the organisers hope the competition will do?", ans: "Encourage more students to study science", wrong: ["Encourage more cyclists to buy backpacks", "Help students win more money", "Make schools teach design"], ex: "Ban tổ chức hy vọng khuyến khích thêm học sinh học khoa học và kỹ thuật ở đại học." }
      ],
      blanks: [
        { s: "The winner designed a special ______ for cyclists.", ans: "backpack", wrong: ["helmet", "cup", "gloves"], ex: "Phát minh thắng cuộc là chiếc ba lô (backpack) cho người đi xe đạp." },
        { s: "The cup changes ______ when a drink is too hot.", ans: "colour", wrong: ["size", "shape", "price"], ex: "Chiếc cốc đổi màu (changes colour) khi đồ uống quá nóng." }
      ]
    },
    {
      title: "Bicycles in the City",
      passage: "In Amsterdam, the capital of the Netherlands, bicycles are a very popular way to travel. The city has more bicycles than people, and about half of all journeys in the city centre are made by bicycle. Cycling is healthy and does not pollute the air. The city has built special bicycle lanes and large bicycle parking areas near stations. However, stolen bicycles are a common problem, so owners are advised to use strong locks.",
      stmts: [
        { stmt: "Amsterdam has more bicycles than people.", verdict: "True", ev: "“The city has more bicycles than people”", ex: "True — thành phố có nhiều xe đạp hơn số dân." },
        { stmt: "About half of all journeys in the city centre are made by bicycle.", verdict: "True", ev: "“about half of all journeys in the city centre are made by bicycle”", ex: "True — khoảng một nửa số chuyến đi ở trung tâm là bằng xe đạp." },
        { stmt: "Most journeys in the city centre are made by car.", verdict: "False", ev: "Khoảng một nửa số chuyến đi là bằng xe đạp, nên không thể “hầu hết” chuyến đi là bằng ô tô", ex: "False — một nửa số chuyến đi đã là xe đạp thì ô tô không thể chiếm hầu hết; bài cũng đề cao xe đạp ở trung tâm." },
        { stmt: "Bicycle theft is not a problem in Amsterdam.", verdict: "False", ev: "“stolen bicycles are a common problem”", ex: "False — trộm xe đạp là vấn đề PHỔ BIẾN ở Amsterdam." },
        { stmt: "Amsterdam is the only city in the Netherlands with bicycle lanes.", verdict: "Not Given", ev: "Đoạn văn nói Amsterdam có làn xe đạp, nhưng không nói đây là thành phố duy nhất có làn xe đạp", ex: "Not Given — bài không khẳng định Amsterdam là thành phố duy nhất có làn đường xe đạp." },
        { stmt: "Most bicycle owners in Amsterdam are students.", verdict: "Not Given", ev: "Đoạn văn không nhắc chủ xe đạp chủ yếu là ai", ex: "Not Given — không có thông tin người sở hữu xe đạp chủ yếu là học sinh hay ai khác." }
      ],
      details: [
        { q: "Amsterdam is the capital of which country?", ans: "The Netherlands", wrong: ["Belgium", "Denmark", "Germany"], ex: "Câu đầu ghi Amsterdam là thủ đô của Hà Lan (the Netherlands)." },
        { q: "What has the city built near stations?", ans: "Large bicycle parking areas", wrong: ["Car parks", "Bus stops", "Coffee shops"], ex: "Thành phố xây các bãi đỗ xe đạp lớn gần các nhà ga." },
        { q: "What are bicycle owners advised to do?", ans: "Use strong locks", wrong: ["Buy cheap locks", "Park only at home", "Register their bicycles"], ex: "Chủ xe được khuyên dùng khóa chắc chắn (use strong locks) vì nạn trộm xe." }
      ],
      blanks: [
        { s: "The city has more bicycles than ______.", ans: "people", wrong: ["cars", "buses", "trains"], ex: "Số xe đạp còn nhiều hơn số người (more bicycles than people)." },
        { s: "Owners are advised to use strong ______.", ans: "locks", wrong: ["keys", "wheels", "cards"], ex: "Vật được khuyên dùng là khóa chắc (strong locks)." }
      ]
    },
    {
      title: "Plastic in the Ocean",
      passage: "Millions of tonnes of plastic enter the world's oceans every year. Much of this plastic comes from rivers, which carry waste from towns and cities to the sea. In the ocean, large pieces of plastic slowly break into tiny pieces called microplastics. Sea animals may eat these tiny pieces or become trapped in larger plastic items. Scientists say that reducing the plastic we use on land is the most effective way to protect ocean life.",
      stmts: [
        { stmt: "Rivers carry much plastic waste from towns and cities to the sea.", verdict: "True", ev: "“rivers, which carry waste from towns and cities to the sea”", ex: "True — các con sông mang rác thải từ thị trấn và thành phố ra biển." },
        { stmt: "Tiny pieces of plastic in the ocean are called microplastics.", verdict: "True", ev: "“large pieces of plastic slowly break into tiny pieces called microplastics”", ex: "True — những mảnh nhựa nhỏ vỡ ra được gọi là microplastics (vi nhựa)." },
        { stmt: "Pieces of plastic become larger in the ocean.", verdict: "False", ev: "“large pieces of plastic slowly break into tiny pieces”", ex: "False — nhựa lớn VỠ RA thành mảnh nhỏ, không hề to lên." },
        { stmt: "Scientists say using more plastic on land protects ocean life.", verdict: "False", ev: "“reducing the plastic we use on land is the most effective way to protect ocean life”", ex: "False — các nhà khoa học nói phải GIẢM nhựa dùng trên đất liền, trái ngược với mệnh đề." },
        { stmt: "Microplastics have been found in drinking water.", verdict: "Not Given", ev: "Đoạn văn không nhắc vi nhựa trong nước uống", ex: "Not Given — bài chỉ nói vi nhựa trong đại dương, không nhắc nước uống." },
        { stmt: "Ocean plastic will disappear completely by the year 2030.", verdict: "Not Given", ev: "Đoạn văn không đưa ra dự đoán nào về năm 2030", ex: "Not Given — không có mốc thời gian hay dự đoán nào như vậy trong bài." }
      ],
      details: [
        { q: "Where does much of the ocean plastic come from?", ans: "From rivers", wrong: ["From ships", "From beach shops", "From fishing boats"], ex: "Phần lớn nhựa ra biển theo các con sông (comes from rivers)." },
        { q: "What are microplastics?", ans: "Tiny pieces of plastic", wrong: ["Large plastic items", "Plastic bottles", "A kind of sea animal"], ex: "Vi nhựa là những mảnh nhựa rất nhỏ vỡ ra từ mảnh lớn." },
        { q: "What is the most effective way to protect ocean life?", ans: "Reduce the plastic we use on land", wrong: ["Clean beaches every week", "Ban fishing in all oceans", "Collect plastic by ship"], ex: "Cách hiệu quả nhất theo các nhà khoa học là giảm nhựa chúng ta dùng trên đất liền." }
      ],
      blanks: [
        { s: "Tiny pieces of plastic in the ocean are called ______.", ans: "microplastics", wrong: ["waste", "rivers", "tonnes"], ex: "Tên gọi của các mảnh nhựa nhỏ là microplastics." },
        { s: "Sea animals may become ______ in larger plastic items.", ans: "trapped", wrong: ["lost", "safe", "strong"], ex: "Động vật biển có thể bị mắc kẹt (become trapped) trong các vật nhựa lớn." }
      ]
    },
{
      title: "The School Garden",
      passage: "Our school garden began in 2019 behind the science building. It is about 200 square metres and is divided into twelve small plots. Students in Grades 6 and 7 look after the garden every Tuesday and Friday afternoon. They grow tomatoes, beans and herbs such as mint and basil. Some of the vegetables are used in the school canteen, and the rest are sold at the school fair in December. A small sign at the gate reminds visitors not to pick anything without asking. Last year, the garden won second prize in a city competition for green schools.",
      stmts: [
        { stmt: "The school garden began in 2019.", verdict: "True", ev: "“Our school garden began in 2019”", ex: "True — đoạn văn nói rõ vườn trường bắt đầu từ năm 2019." },
        { stmt: "Students grow mint and basil in the garden.", verdict: "True", ev: "“herbs such as mint and basil”", ex: "True — học sinh trồng các loại rau thơm như bạc hà (mint) và húng quế (basil)." },
        { stmt: "The garden is in front of the science building.", verdict: "False", ev: "“behind the science building”", ex: "False — vườn ở phía sau tòa nhà khoa học, không phải phía trước." },
        { stmt: "Students look after the garden every day.", verdict: "False", ev: "“every Tuesday and Friday afternoon”", ex: "False — học sinh chăm vườn vào chiều thứ Ba và thứ Sáu, không phải hằng ngày." },
        { stmt: "The garden cost a lot of money to build.", verdict: "Not Given", ev: "Đoạn văn không nhắc chi phí làm vườn", ex: "Not Given — đoạn văn không nói gì về số tiền đã chi để làm vườn." },
        { stmt: "Most students in the school enjoy gardening.", verdict: "Not Given", ev: "Đoạn văn không nói đa số học sinh có thích làm vườn hay không", ex: "Not Given — chỉ biết học sinh Lớp 6 và 7 chăm vườn; không có thông tin đa số học sinh thích làm vườn." }
      ],
      details: [
        { q: "How many plots is the school garden divided into?", ans: "Twelve", wrong: ["Eight", "Ten", "Twenty"], ex: "Đoạn văn nói vườn được chia thành mười hai luống nhỏ (twelve small plots)." },
        { q: "Where are the extra vegetables sold?", ans: "At the school fair in December", wrong: ["At the school fair in June", "At a local market", "In front of the school gate"], ex: "Rau thừa được bán ở hội chợ trường vào tháng 12 (sold at the school fair in December)." },
        { q: "Which grades look after the school garden?", ans: "Grades 6 and 7", wrong: ["Grades 5 and 6", "Grades 8 and 9", "Grades 6 and 9"], ex: "Học sinh Lớp 6 và Lớp 7 chăm sóc vườn trường." }
      ],
      blanks: [
        { s: "The school garden began in ______.", ans: "2019", wrong: ["2018", "2020", "2015"], ex: "Vườn trường bắt đầu từ năm 2019." },
        { s: "Students look after the garden every Tuesday and ______ afternoon.", ans: "Friday", wrong: ["Monday", "Thursday", "Wednesday"], ex: "Học sinh chăm vườn chiều thứ Ba và thứ Sáu." }
      ]
    },
    {
      title: "A Young Chess Champion",
      passage: "Minh Anh, a 13-year-old student from Da Nang, won the national under-14 chess championship last March. She learned to play chess at the age of six from her grandfather. She practises for two hours every day after school and studies famous games at weekends. During a game, she is famous for staying calm, even when she has very little time left on the clock. Her coach says her strongest point is planning several moves ahead. Next year, Minh Anh hopes to join the national youth team and play in her first international tournament in Singapore.",
      stmts: [
        { stmt: "Minh Anh learned to play chess from her grandfather.", verdict: "True", ev: "“She learned to play chess at the age of six from her grandfather”", ex: "True — cô bé học cờ vua từ ông của mình." },
        { stmt: "Minh Anh practises chess every day after school.", verdict: "True", ev: "“She practises for two hours every day after school”", ex: "True — cô bé luyện cờ hai giờ mỗi ngày sau giờ học." },
        { stmt: "Minh Anh is 14 years old.", verdict: "False", ev: "“a 13-year-old student”", ex: "False — Minh Anh 13 tuổi; cô bé vô địch giải dưới 14 tuổi (under-14)." },
        { stmt: "Minh Anh won the championship in Singapore.", verdict: "False", ev: "“won the national under-14 chess championship last March” — Singapore là giải quốc tế cô bé hi vọng dự năm tới", ex: "False — chức vô địch là giải quốc gia; Singapore là nơi cô bé hi vọng được thi đấu năm sau." },
        { stmt: "Minh Anh's grandfather was a professional chess player.", verdict: "Not Given", ev: "Đoạn văn chỉ nói cô bé học cờ từ ông, không nói ông có phải kì thủ chuyên nghiệp", ex: "Not Given — không có thông tin ông của Minh Anh có phải vận động viên cờ chuyên nghiệp hay không." },
        { stmt: "Minh Anh is the best student in her class at school.", verdict: "Not Given", ev: "Đoạn văn không nhắc thành tích học tập trên lớp của Minh Anh", ex: "Not Given — đoạn văn nói về cờ vua, không nói cô bé có học giỏi nhất lớp hay không." }
      ],
      details: [
        { q: "How old was Minh Anh when she learned to play chess?", ans: "Six years old", wrong: ["Five years old", "Seven years old", "Eight years old"], ex: "Cô bé học cờ năm 6 tuổi (at the age of six)." },
        { q: "What is Minh Anh's strongest point, according to her coach?", ans: "Planning several moves ahead", wrong: ["Moving her pieces very quickly", "Staying calm in every game", "Remembering famous games"], ex: "Huấn luyện viên nói điểm mạnh nhất của cô bé là tính trước nhiều nước đi (planning several moves ahead). Việc giữ bình tĩnh là nét nổi tiếng chung, không phải câu trả lời của huấn luyện viên." },
        { q: "Where does Minh Anh hope to play her first international tournament?", ans: "In Singapore", wrong: ["In Thailand", "In Da Nang", "In Ha Noi"], ex: "Cô bé hi vọng dự giải quốc tế đầu tiên tại Singapore." }
      ],
      blanks: [
        { s: "Minh Anh practises chess for ______ hours every day after school.", ans: "two", wrong: ["three", "four", "five"], ex: "Cô bé luyện hai giờ mỗi ngày (two hours)." },
        { s: "Minh Anh won the national under-14 championship last ______.", ans: "March", wrong: ["May", "June", "January"], ex: "Cô bé vô địch vào tháng Ba vừa qua (last March)." }
      ]
    },
    {
      title: "Breakfast Around the World",
      passage: "Breakfast is the first meal of the day, but it looks very different around the world. In Vietnam, many people start the day with a hot bowl of pho or a banh mi from a street stall. In England, a traditional breakfast includes eggs, bacon, beans and toast, but on weekdays most people eat something quick, like cereal with milk. In Japan, breakfast often includes rice, grilled fish, miso soup and pickles. People in Mexico sometimes eat eggs with tomatoes and chili for breakfast. Doctors agree on one thing: eating something in the morning gives the body energy for the first hours of the day.",
      stmts: [
        { stmt: "A traditional English breakfast includes beans.", verdict: "True", ev: "“a traditional breakfast includes eggs, bacon, beans and toast”", ex: "True — bữa sáng truyền thống của Anh có đậu (beans)." },
        { stmt: "Japanese breakfast often includes grilled fish.", verdict: "True", ev: "“breakfast often includes rice, grilled fish, miso soup and pickles”", ex: "True — bữa sáng ở Nhật thường có cá nướng (grilled fish)." },
        { stmt: "Most people in England eat a traditional breakfast every day.", verdict: "False", ev: "“on weekdays most people eat something quick, like cereal with milk”", ex: "False — vào ngày thường, đa số người Anh ăn món nhanh như ngũ cốc với sữa, không phải bữa sáng truyền thống mỗi ngày." },
        { stmt: "People in Mexico never eat eggs for breakfast.", verdict: "False", ev: "“sometimes eat eggs with tomatoes and chili”", ex: "False — người Mexico đôi khi ăn trứng với cà chua và ớt vào bữa sáng." },
        { stmt: "Pho is more popular than banh mi in Vietnam.", verdict: "Not Given", ev: "Đoạn văn kể cả phở và bánh mì nhưng không so sánh độ phổ biến", ex: "Not Given — đoạn văn không nói món nào phổ biến hơn ở Việt Nam." },
        { stmt: "Doctors say breakfast is the most important meal of the day.", verdict: "Not Given", ev: "Đoạn văn chỉ nói bác sĩ đồng ý bữa sáng cho năng lượng vào buổi sáng", ex: "Not Given — bác sĩ trong đoạn chỉ nói ăn sáng giúp cơ thể có năng lượng; không ai gọi bữa sáng là bữa quan trọng nhất." }
      ],
      details: [
        { q: "What do most people in England eat on weekdays?", ans: "Something quick like cereal with milk", wrong: ["Eggs, bacon and toast", "Rice and grilled fish", "Pho or banh mi"], ex: "Ngày thường, đa số người Anh ăn món nhanh như ngũ cốc với sữa." },
        { q: "Which dish is part of a Japanese breakfast?", ans: "Miso soup", wrong: ["Bacon and beans", "Cereal with milk", "Banh mi"], ex: "Súp miso nằm trong bữa sáng kiểu Nhật theo đoạn văn." },
        { q: "Why is eating breakfast useful, according to doctors?", ans: "It gives the body energy", wrong: ["It helps people sleep better", "It makes people grow taller", "It saves a lot of money"], ex: "Bác sĩ đồng ý: ăn sáng giúp cơ thể có năng lượng cho những giờ đầu ngày." }
      ],
      blanks: [
        { s: "In Vietnam, many people start the day with a hot bowl of ______.", ans: "pho", wrong: ["porridge", "cereal", "pasta"], ex: "Nhiều người Việt bắt đầu ngày mới bằng một bát phở nóng." },
        { s: "People in Mexico sometimes eat eggs with tomatoes and ______.", ans: "chili", wrong: ["beans", "cheese", "bacon"], ex: "Ở Mexico, trứng ăn kèm cà chua và ớt (chili)." }
      ]
    },
    {
      title: "Weekend Volunteers",
      passage: "Every Saturday morning, about thirty volunteers meet at the City Hospital to help patients and visitors. The group started in 2020 with only five members. The volunteers wear green jackets so that people can find them easily. Their jobs include guiding visitors to the right rooms, reading books to children in the children's ward, and helping old people in wheelchairs. They do not give medicine or do the work of nurses. Students who want to join must be at least 15 years old and join a one-day training course first.",
      stmts: [
        { stmt: "The volunteer group started in 2020.", verdict: "True", ev: "“The group started in 2020”", ex: "True — nhóm tình nguyện bắt đầu năm 2020." },
        { stmt: "Volunteers wear green jackets.", verdict: "True", ev: "“The volunteers wear green jackets”", ex: "True — tình nguyện viên mặc áo xanh lá để mọi người dễ nhận ra." },
        { stmt: "The group now has only five members.", verdict: "False", ev: "“about thirty volunteers” — năm thành viên là con số lúc mới thành lập", ex: "False — nhóm bắt đầu với 5 người, nay có khoảng 30 tình nguyện viên." },
        { stmt: "Volunteers give medicine to patients.", verdict: "False", ev: "“They do not give medicine”", ex: "False — tình nguyện viên không phát thuốc và không làm việc của y tá." },
        { stmt: "The volunteers are paid for their work.", verdict: "Not Given", ev: "Đoạn văn không nhắc chuyện trả tiền hay lương", ex: "Not Given — đoạn văn không nói tình nguyện viên có được trả tiền hay không." },
        { stmt: "Most volunteers are university students.", verdict: "Not Given", ev: "Đoạn văn chỉ nêu điều kiện học sinh muốn tham gia, không nói đa số thành viên là sinh viên", ex: "Not Given — không có thông tin đa số tình nguyện viên là sinh viên đại học." }
      ],
      details: [
        { q: "How many volunteers meet at the City Hospital every Saturday?", ans: "About thirty", wrong: ["About five", "About twenty", "About fifty"], ex: "Khoảng 30 tình nguyện viên gặp nhau mỗi sáng thứ Bảy." },
        { q: "What must students do before joining the volunteer group?", ans: "Join a one-day training course", wrong: ["Pass a medical exam", "Be at least 18 years old", "Work at the hospital for a month"], ex: "Học sinh phải tham gia khóa tập huấn một ngày trước khi vào nhóm." },
        { q: "Where do volunteers read books to children?", ans: "In the children's ward", wrong: ["In the hospital library", "At the main entrance", "In the waiting room"], ex: "Tình nguyện viên đọc sách cho trẻ ở khoa nhi (the children's ward)." }
      ],
      blanks: [
        { s: "Volunteers help old people in ______.", ans: "wheelchairs", wrong: ["gardens", "classrooms", "ambulances"], ex: "Tình nguyện viên giúp người già ngồi xe lăn (wheelchairs)." },
        { s: "Students must be at least ______ years old to join the group.", ans: "15", wrong: ["14", "16", "18"], ex: "Học sinh phải từ 15 tuổi trở lên mới được tham gia." }
      ]
    },
    {
      title: "Dogs as Helpers",
      passage: "Dogs are not only pets. For many years, specially trained dogs have helped people who cannot see. A guide dog learns to stop at the edge of the road, walk around objects in the street, and find doors and stairs for its owner. Training a guide dog takes about two years and begins when the dog is a puppy. Not every dog can become a guide dog: the dog must be healthy, calm and friendly. In many countries, guide dogs are allowed to enter shops, buses and restaurants with their owners, although pet dogs are not.",
      stmts: [
        { stmt: "Training a guide dog takes about two years.", verdict: "True", ev: "“Training a guide dog takes about two years”", ex: "True — việc huấn luyện một chú chó dẫn đường mất khoảng hai năm." },
        { stmt: "A guide dog starts its training as a puppy.", verdict: "True", ev: "“begins when the dog is a puppy”", ex: "True — huấn luyện bắt đầu từ khi chó còn nhỏ (a puppy)." },
        { stmt: "Every healthy dog can become a guide dog.", verdict: "False", ev: "“Not every dog can become a guide dog: the dog must be healthy, calm and friendly”", ex: "False — không phải chó khỏe nào cũng làm được; chó còn phải điềm tĩnh và thân thiện." },
        { stmt: "Guide dogs are not allowed on buses in many countries.", verdict: "False", ev: "“guide dogs are allowed to enter shops, buses and restaurants”", ex: "False — ở nhiều nước, chó dẫn đường được vào cửa hàng, xe buýt và nhà hàng cùng chủ." },
        { stmt: "Guide dogs are usually black.", verdict: "Not Given", ev: "Đoạn văn không nhắc màu lông của chó dẫn đường", ex: "Not Given — đoạn văn không nói chó dẫn đường thường có màu gì." },
        { stmt: "It costs a lot of money to train a guide dog.", verdict: "Not Given", ev: "Đoạn văn không nhắc chi phí huấn luyện", ex: "Not Given — chỉ biết huấn luyện mất khoảng hai năm; chi phí không được nhắc tới." }
      ],
      details: [
        { q: "What must a guide dog be like?", ans: "Healthy, calm and friendly", wrong: ["Big, strong and fast", "Young, small and quiet", "Brave, loud and active"], ex: "Chó dẫn đường phải khỏe mạnh, điềm tĩnh và thân thiện." },
        { q: "Where are guide dogs allowed to go with their owners?", ans: "Shops, buses and restaurants", wrong: ["Only parks and gardens", "Only their owners' homes", "Only special dog schools"], ex: "Ở nhiều nước, chó dẫn đường được vào cửa hàng, lên xe buýt và vào nhà hàng cùng chủ." },
        { q: "When does a guide dog start its training?", ans: "When it is a puppy", wrong: ["When it is one year old", "When it is fully grown", "When it joins its first owner"], ex: "Huấn luyện bắt đầu khi chó còn là chó con (a puppy)." }
      ],
      blanks: [
        { s: "A guide dog learns to stop at the edge of the ______.", ans: "road", wrong: ["river", "stairs", "door"], ex: "Chó dẫn đường học cách dừng lại ở mép đường (the edge of the road)." },
        { s: "A guide dog must be healthy, calm and ______.", ans: "friendly", wrong: ["strong", "clever", "hungry"], ex: "Chó phải khỏe mạnh, điềm tĩnh và thân thiện (friendly)." }
      ]
    },
    {
      title: "The Four Seasons in Sa Pa",
      passage: "Sa Pa is a small town in the mountains of northern Vietnam, famous for its cool weather. Spring there is from March to May, with light rain and flowers on the hills. Summer, from June to August, is the warmest season, but the temperature rarely goes above 25 degrees. Autumn, from September to November, is the best time to see the golden rice terraces. Winter is cold and foggy; in some years, snow falls on the highest mountains in December or January. Because of this special weather, Sa Pa welcomes visitors all year round.",
      stmts: [
        { stmt: "Sa Pa is in the mountains of northern Vietnam.", verdict: "True", ev: "“a small town in the mountains of northern Vietnam”", ex: "True — Sa Pa là thị trấn vùng núi ở miền Bắc Việt Nam." },
        { stmt: "Autumn is the best time to see the golden rice terraces.", verdict: "True", ev: "“Autumn ... is the best time to see the golden rice terraces”", ex: "True — mùa thu là lúc đẹp nhất để ngắm ruộng bậc thang vàng." },
        { stmt: "The temperature in Sa Pa often goes above 30 degrees in summer.", verdict: "False", ev: "“the temperature rarely goes above 25 degrees”", ex: "False — mùa hè ở Sa Pa hiếm khi vượt 25 độ, không phải thường trên 30 độ." },
        { stmt: "Snow falls on the highest mountains in Sa Pa every winter.", verdict: "False", ev: "“in some years, snow falls”", ex: "False — tuyết chỉ rơi vào một số năm, không phải mùa đông nào cũng có." },
        { stmt: "Sa Pa is more beautiful in spring than in autumn.", verdict: "Not Given", ev: "Đoạn văn không so sánh vẻ đẹp giữa mùa xuân và mùa thu", ex: "Not Given — đoạn văn tả cả hai mùa nhưng không nói mùa nào đẹp hơn." },
        { stmt: "Most visitors to Sa Pa come from other countries.", verdict: "Not Given", ev: "Đoạn văn không nói khách đến Sa Pa chủ yếu từ đâu", ex: "Not Given — chỉ biết Sa Pa đón khách quanh năm; nguồn khách chính không được nhắc." }
      ],
      details: [
        { q: "When is the best time to see the golden rice terraces?", ans: "From September to November", wrong: ["From March to May", "From June to August", "In December and January"], ex: "Mùa thu, từ tháng 9 đến tháng 11, là thời điểm đẹp nhất ngắm ruộng bậc thang." },
        { q: "How warm does Sa Pa get in summer?", ans: "Rarely above 25 degrees", wrong: ["Often above 30 degrees", "About 35 degrees every day", "Rarely above 20 degrees"], ex: "Nhiệt độ mùa hè ở Sa Pa hiếm khi vượt 25 độ." },
        { q: "Why does Sa Pa welcome visitors all year round?", ans: "Because of its special weather", wrong: ["Because it is a very big town", "Because hotels there are cheap", "Because it is near the sea"], ex: "Nhờ thời tiết đặc biệt, Sa Pa đón khách quanh năm." }
      ],
      blanks: [
        { s: "Winter in Sa Pa is cold and ______.", ans: "foggy", wrong: ["rainy", "windy", "sunny"], ex: "Mùa đông ở Sa Pa lạnh và nhiều sương mù (foggy)." },
        { s: "Spring in Sa Pa is from March to ______.", ans: "May", wrong: ["April", "June", "August"], ex: "Mùa xuân ở Sa Pa kéo dài từ tháng 3 đến tháng 5." }
      ]
    },
    {
      title: "Learning the Piano",
      passage: "Learning to play the piano takes time and patience. Teachers usually advise beginners to practise for 20 or 30 minutes every day instead of two hours once a week. Short daily practice helps the fingers remember the keys. Students should sit up straight, keep their wrists relaxed, and start each lesson with simple finger exercises. Most teachers also tell students to listen to good pianists, because listening helps them understand how a piece of music should sound. With regular practice, many students can play simple songs after three or four months.",
      stmts: [
        { stmt: "Teachers advise beginners to practise a short time every day.", verdict: "True", ev: "“practise for 20 or 30 minutes every day”", ex: "True — giáo viên khuyên người mới học luyện 20–30 phút mỗi ngày." },
        { stmt: "Listening to good pianists helps students understand music.", verdict: "True", ev: "“listening helps them understand how a piece of music should sound”", ex: "True — nghe nghệ sĩ giỏi giúp học sinh hiểu bản nhạc nên ngân lên như thế nào." },
        { stmt: "Practising two hours once a week is better than daily practice.", verdict: "False", ev: "“instead of two hours once a week” — giáo viên khuyên luyện hằng ngày", ex: "False — giáo viên khuyên luyện ngắn mỗi ngày thay vì hai giờ một lần mỗi tuần." },
        { stmt: "Students should start each lesson with difficult songs.", verdict: "False", ev: "“start each lesson with simple finger exercises”", ex: "False — mỗi buổi học nên bắt đầu bằng bài tập ngón đơn giản, không phải bài khó." },
        { stmt: "The piano is the most difficult instrument to learn.", verdict: "Not Given", ev: "Đoạn văn không so sánh độ khó của piano với nhạc cụ khác", ex: "Not Given — đoạn văn không nói piano có phải nhạc cụ khó học nhất hay không." },
        { stmt: "Most piano students take lessons at home.", verdict: "Not Given", ev: "Đoạn văn không nói học sinh thường học đàn ở đâu", ex: "Not Given — không có thông tin đa số học sinh học piano tại nhà." }
      ],
      details: [
        { q: "How long should beginners practise the piano each day?", ans: "20 or 30 minutes", wrong: ["Two hours", "One hour", "Five minutes"], ex: "Người mới học nên luyện 20 hoặc 30 phút mỗi ngày." },
        { q: "What should students do at the start of each lesson?", ans: "Simple finger exercises", wrong: ["Difficult songs", "Listening tests", "Music theory exams"], ex: "Mỗi buổi học nên bắt đầu bằng bài tập ngón đơn giản (simple finger exercises)." },
        { q: "When can many students play simple songs?", ans: "After three or four months", wrong: ["After two weeks", "After one year", "After a few days"], ex: "Với luyện tập đều, nhiều học sinh chơi được bài đơn giản sau ba, bốn tháng." }
      ],
      blanks: [
        { s: "Students should sit up straight and keep their ______ relaxed.", ans: "wrists", wrong: ["fingers", "shoulders", "knees"], ex: "Học sinh cần ngồi thẳng và giữ cổ tay (wrists) thả lỏng." },
        { s: "Short daily practice helps the fingers remember the ______.", ans: "keys", wrong: ["songs", "notes", "lessons"], ex: "Luyện ngắn hằng ngày giúp ngón tay nhớ phím đàn (the keys)." }
      ]
    },
    {
      title: "The City Museum",
      passage: "The City Museum stands in an old building which was built in 1910 as a post office. The museum opened to the public in 1985. It has three floors of exhibits about the history of the city, from old maps and photographs to clothes and tools from 200 years ago. The museum is open from Tuesday to Sunday and closes on Mondays. Entry is free for children under 12, and on the first Sunday of every month, entry is free for everyone. The museum shop sells books and postcards near the exit.",
      stmts: [
        { stmt: "The museum building was built in 1910.", verdict: "True", ev: "“built in 1910 as a post office”", ex: "True — tòa nhà bảo tàng được xây năm 1910." },
        { stmt: "The museum is closed on Mondays.", verdict: "True", ev: "“open from Tuesday to Sunday and closes on Mondays”", ex: "True — bảo tàng mở từ thứ Ba đến Chủ nhật và đóng cửa thứ Hai." },
        { stmt: "The museum has four floors of exhibits.", verdict: "False", ev: "“three floors of exhibits”", ex: "False — bảo tàng có ba tầng trưng bày, không phải bốn." },
        { stmt: "Entry to the museum is free for everyone every Sunday.", verdict: "False", ev: "“on the first Sunday of every month, entry is free for everyone”", ex: "False — vé chỉ miễn phí cho mọi người vào Chủ nhật đầu tiên của tháng, không phải mọi Chủ nhật." },
        { stmt: "The museum is the oldest building in the city.", verdict: "Not Given", ev: "Đoạn văn không so sánh tuổi của tòa nhà với các tòa nhà khác", ex: "Not Given — tòa nhà xây năm 1910 nhưng đoạn văn không nói đây là tòa nhà cổ nhất thành phố." },
        { stmt: "Most exhibits in the museum are about 200 years old.", verdict: "Not Given", ev: "Đoạn văn chỉ nhắc quần áo và công cụ từ 200 năm trước, không nói đa số hiện vật", ex: "Not Given — chỉ một số hiện vật (quần áo, công cụ) có từ 200 năm trước; tỉ lệ đa số không được nhắc." }
      ],
      details: [
        { q: "What was the museum building in 1910?", ans: "A post office", wrong: ["A school", "A library", "A hotel"], ex: "Tòa nhà được xây năm 1910 làm bưu điện (a post office)." },
        { q: "When is entry free for everyone?", ans: "On the first Sunday of every month", wrong: ["Every Sunday", "On Mondays", "On the last Sunday of every month"], ex: "Vé miễn phí cho mọi người vào Chủ nhật đầu tiên hằng tháng." },
        { q: "What does the museum shop sell?", ans: "Books and postcards", wrong: ["Old maps and tools", "Clothes and hats", "Tickets and food"], ex: "Cửa hàng bảo tàng bán sách và bưu thiếp (books and postcards)." }
      ],
      blanks: [
        { s: "The museum opened to the public in ______.", ans: "1985", wrong: ["1910", "1980", "1995"], ex: "Bảo tàng mở cửa đón khách năm 1985 (tòa nhà xây năm 1910)." },
        { s: "Children under ______ do not have to pay for entry.", ans: "12", wrong: ["10", "8", "15"], ex: "Trẻ dưới 12 tuổi được vào miễn phí." }
      ]
    },
    {
      title: "From Letters to Emails",
      passage: "Fifty years ago, people who wanted to send news to another town wrote letters by hand and took them to the post office. A letter could take a week to travel across the country, and even longer to reach another continent. The telephone helped people talk over long distances, but calls were expensive. Everything changed with email in the 1990s. An email arrives in a few seconds and costs almost nothing. Today, billions of emails are sent every day. However, some people still write paper letters for special occasions, because a handwritten letter feels more personal.",
      stmts: [
        { stmt: "Fifty years ago, people wrote letters by hand.", verdict: "True", ev: "“wrote letters by hand”", ex: "True — năm mươi năm trước, người ta viết thư bằng tay." },
        { stmt: "An email arrives in a few seconds.", verdict: "True", ev: "“An email arrives in a few seconds”", ex: "True — một email đến nơi chỉ trong vài giây." },
        { stmt: "A letter took one day to travel across the country.", verdict: "False", ev: "“could take a week to travel across the country”", ex: "False — thư đi khắp đất nước có thể mất một tuần, không phải một ngày." },
        { stmt: "Telephone calls were cheap fifty years ago.", verdict: "False", ev: "“calls were expensive”", ex: "False — ngày xưa gọi điện đường dài rất tốn kém (expensive)." },
        { stmt: "The first email was sent in 1990.", verdict: "Not Given", ev: "Đoạn văn chỉ nói email làm thay đổi mọi thứ vào những năm 1990, không nêu năm gửi email đầu tiên", ex: "Not Given — đoạn văn nói email xuất hiện trong thập niên 1990, không khẳng định email đầu tiên gửi năm 1990." },
        { stmt: "Young people never write paper letters today.", verdict: "Not Given", ev: "Đoạn văn nói “some people” vẫn viết thư giấy, không nói riêng về người trẻ", ex: "Not Given — đoạn văn chỉ nói một số người vẫn viết thư giấy; không khẳng định người trẻ không bao giờ viết." }
      ],
      details: [
        { q: "How long could a letter take to travel across the country?", ans: "A week", wrong: ["One day", "One month", "A few hours"], ex: "Một lá thư có thể mất một tuần để đi khắp đất nước." },
        { q: "Why do some people still write paper letters?", ans: "Because they feel more personal", wrong: ["Because they are faster", "Because they are cheaper", "Because email is difficult to use"], ex: "Thư viết tay cho cảm giác riêng tư, gần gũi hơn (more personal)." },
        { q: "When did email change the way people send news?", ans: "In the 1990s", wrong: ["In the 1980s", "In the 2000s", "In the 1970s"], ex: "Mọi thứ thay đổi với email vào những năm 1990." }
      ],
      blanks: [
        { s: "Today, ______ of emails are sent every day.", ans: "billions", wrong: ["millions", "thousands", "hundreds"], ex: "Ngày nay, hàng tỉ (billions) email được gửi mỗi ngày." },
        { s: "People took their letters to the ______ office.", ans: "post", wrong: ["school", "police", "travel"], ex: "Người ta mang thư ra bưu điện (the post office)." }
      ]
    },
    {
      title: "A Farm Stay Weekend",
      passage: "Last month, our class spent a weekend at Green Valley Farm, about 40 kilometres from the city. We arrived on Saturday morning and slept in tents near the river. In the afternoon, the farmer taught us how to milk cows and collect eggs from the chicken house. On Sunday, we picked vegetables and helped cook lunch for the whole group. The farm grows its vegetables without chemicals. Before we left, the farmer gave each student a small bag of seeds to plant at home. Everyone agreed it was the best school trip of the year.",
      stmts: [
        { stmt: "The students slept in tents near the river.", verdict: "True", ev: "“slept in tents near the river”", ex: "True — cả lớp ngủ trong lều gần con sông." },
        { stmt: "The farm grows its vegetables without chemicals.", verdict: "True", ev: "“grows its vegetables without chemicals”", ex: "True — trang trại trồng rau không dùng hóa chất." },
        { stmt: "The class arrived at the farm on Friday.", verdict: "False", ev: "“We arrived on Saturday morning”", ex: "False — lớp đến trang trại vào sáng thứ Bảy, không phải thứ Sáu." },
        { stmt: "The farmer taught the students to milk cows on Sunday.", verdict: "False", ev: "“In the afternoon, the farmer taught us how to milk cows” — chiều thứ Bảy", ex: "False — buổi dạy vắt sữa bò diễn ra chiều thứ Bảy; Chủ nhật lớp hái rau và nấu ăn." },
        { stmt: "Green Valley Farm is the biggest farm in the area.", verdict: "Not Given", ev: "Đoạn văn không so sánh quy mô trang trại với nơi khác", ex: "Not Given — đoạn văn không nói đây có phải trang trại lớn nhất vùng hay không." },
        { stmt: "Most students had visited a farm before this trip.", verdict: "Not Given", ev: "Đoạn văn không nói học sinh đã từng đến trang trại trước đây hay chưa", ex: "Not Given — không có thông tin về việc học sinh từng đi trang trại trước chuyến này." }
      ],
      details: [
        { q: "How far is Green Valley Farm from the city?", ans: "About 40 kilometres", wrong: ["About 14 kilometres", "About 60 kilometres", "About 4 kilometres"], ex: "Trang trại cách thành phố khoảng 40 ki-lô-mét." },
        { q: "What did the farmer give each student before they left?", ans: "A small bag of seeds", wrong: ["A bag of vegetables", "Some fresh eggs", "A bottle of milk"], ex: "Trước khi về, bác nông dân tặng mỗi bạn một túi hạt giống nhỏ." },
        { q: "What did the students do on Sunday?", ans: "Picked vegetables and helped cook lunch", wrong: ["Milked cows and collected eggs", "Arrived at the farm by bus", "Slept in tents near the river"], ex: "Chủ nhật, lớp hái rau và phụ nấu bữa trưa cho cả đoàn." }
      ],
      blanks: [
        { s: "Green Valley Farm is about ______ kilometres from the city.", ans: "40", wrong: ["14", "60", "80"], ex: "Trang trại cách thành phố khoảng 40 ki-lô-mét." },
        { s: "The farmer taught us how to collect ______ from the chicken house.", ans: "eggs", wrong: ["milk", "wool", "honey"], ex: "Bác nông dân dạy lớp cách nhặt trứng (eggs) trong chuồng gà." }
      ]
    }
  ];
  var TFNG_VERDICTS = ["True", "False", "Not Given"];
  function tfngPassage() { return enPick(TFNG); }
  function fTFNG() {
    var p = tfngPassage(), s = enPick(p.stmts);
    var wrong = TFNG_VERDICTS.filter(function (v) { return v !== s.verdict; });
    var q = enMCQ("According to the passage “" + p.title + "”, is this statement True, False or Not Given? — “" + s.stmt + "”",
      s.verdict, wrong, s.ex, { visual: enPassage(p.passage) });
    return enTag(q, "fTFNG", p.title);
  }
  function fTFNGDetail() {
    var p = tfngPassage(), e = enPick(p.details);
    var q = enMCQ(e.q, e.ans, e.wrong, e.ex, { visual: enPassage(p.passage) });
    return enTag(q, "fTFNGDetail", p.title);
  }
  function fTFNGBlank() {
    var p = tfngPassage(), e = enPick(p.blanks);
    var q = enBlank("Complete the sentence based on the passage “" + p.title + "”.", e.ans, e.wrong, e.ex,
      enPassage(p.passage) + '<div class="sentence">' + e.s + "</div>");
    return enTag(q, "fTFNGBlank", p.title);
  }
  var T4 = {
    id: "cd-en-thpt-tfng", emoji: "🧭", name: "IELTS: True / False / Not Given",
    sub: "Đọc và phán đoán theo đoạn văn",
    pools: { choose: [fTFNG, fTFNGDetail], blank: [fTFNGBlank], match: [], games: [] },
    knowledge: {
      notes: [
        "Quy tắc vàng TFNG: True = đoạn văn NÓI ĐÚNG thông tin đó (có thể diễn đạt khác chữ); False = đoạn văn nói điều NGƯỢC LẠI; Not Given = thông tin KHÔNG có trong bài.",
        "Lỗi hay gặp nhất: thấy mệnh đề “có vẻ đúng ngoài đời” liền chọn True. Nếu đoạn văn không nhắc, dù ngoài đời đúng vẫn là Not Given.",
        "Mệnh đề chứa “only / all / most / the only” rất hay là bẫy: đoạn văn hiếm khi khẳng định tuyệt đối như vậy — kiểm tra kỹ trước khi chọn True.",
        "Với False, hãy tự chỉ ra được câu trong bài MÂU THUẪN với mệnh đề. Không chỉ ra được câu đối chiếu thì khả năng cao là Not Given.",
        "Đọc mệnh đề trước hay đoạn trước đều được, nhưng luôn quay lại đoạn văn để tìm bằng chứng cho từng mệnh đề, không trả lời theo trí nhớ."
      ],
      facts: [
        { q: "Đoạn văn không nhắc một thông tin nào đó — phán quyết là gì?", a: "Not Given", ex: "Not Given dành cho thông tin vắng mặt hoàn toàn trong bài, bất kể ngoài đời thông tin đó đúng hay sai." },
        { q: "Mệnh đề ngược hẳn với một câu trong đoạn văn — phán quyết là gì?", a: "False", ex: "False cần bằng chứng đối chiếu: đoạn văn nói điều ngược lại hoặc khác hẳn với mệnh đề." }
      ],
      pairs: [["True", "đoạn văn nói đúng thông tin đó"], ["False", "đoạn văn nói điều ngược lại"], ["Not Given", "thông tin không có trong đoạn văn"], ["evidence", "bằng chứng trong đoạn văn"]]
    }
  };

  /* ================================================================
     (5) NGHE HIỂU TOEIC
     SCRIPTS: {transcript, q, ans, wrong[3], ex, t, f[2], exT, exF[2]}
     QRESP: Part 2 — nghe câu hỏi, chọn câu đáp khớp loại câu hỏi.
     ================================================================ */
  var SCRIPTS = [
    {
      transcript: "A: Good morning. What time does the marketing meeting start? B: It starts at ten o'clock in Room 3. A: Thank you. I will bring the sales report.",
      q: "What time does the marketing meeting start?", ans: "At ten o'clock", wrong: ["At nine o'clock", "At eleven o'clock", "At ten thirty"],
      ex: "Người B trả lời rõ: cuộc họp bắt đầu “at ten o'clock” — lúc mười giờ, ở phòng 3.",
      t: "Cuộc họp marketing bắt đầu lúc mười giờ.", exT: "Đúng. Bài nghe nói cuộc họp bắt đầu lúc mười giờ (at ten o'clock).",
      f: ["Cuộc họp marketing diễn ra ở phòng 5.", "Người nói sẽ mang theo báo cáo tài chính."],
      exF: ["Sai. Cuộc họp ở phòng 3 (Room 3), không phải phòng 5.", "Sai. Tài liệu mang theo là báo cáo bán hàng (sales report), không phải báo cáo tài chính."]
    },
    {
      transcript: "A: Hello, this is An Phat Furniture. Your chairs will arrive on Friday afternoon. B: Friday afternoon is fine. Please call me when the driver arrives. A: Certainly. We will call you thirty minutes before we arrive.",
      q: "When will the chairs arrive?", ans: "On Friday afternoon", wrong: ["On Friday morning", "On Thursday afternoon", "On Saturday afternoon"],
      ex: "Bên giao hàng nói ghế sẽ đến “on Friday afternoon” — chiều thứ Sáu.",
      t: "Ghế sẽ được giao vào chiều thứ Sáu.", exT: "Đúng. Bài nghe nói ghế đến vào chiều thứ Sáu (Friday afternoon).",
      f: ["Ghế sẽ được giao vào sáng thứ Sáu.", "Tài xế sẽ không gọi điện trước khi đến."],
      exF: ["Sai. Hàng đến vào buổi CHIỀU thứ Sáu, không phải buổi sáng.", "Sai. Bên giao hàng hứa sẽ gọi trước ba mươi phút khi đến."]
    },
    {
      transcript: "A: Attention, please. The office will close early today at four o'clock because of a power cut. Please save your work and turn off your computers before you leave.",
      q: "Why will the office close early today?", ans: "Because of a power cut", wrong: ["Because of a public holiday", "Because of a staff meeting", "Because of bad weather"],
      ex: "Thông báo nói văn phòng đóng sớm “because of a power cut” — vì mất điện.",
      t: "Văn phòng đóng cửa sớm hôm nay vì mất điện.", exT: "Đúng. Nguyên nhân đóng sớm là mất điện (a power cut).",
      f: ["Văn phòng đóng cửa lúc năm giờ hôm nay.", "Nhân viên không cần tắt máy tính khi ra về."],
      exF: ["Sai. Văn phòng đóng lúc bốn giờ (at four o'clock).", "Sai. Thông báo dặn nhân viên tắt máy tính trước khi rời đi."]
    },
    {
      transcript: "A: Hello, Mr. Hung. This is Ms. Mai from Sunrise Company. Your interview has been moved to Wednesday at nine o'clock. Please call me back to confirm. Thank you.",
      q: "When is Mr. Hung's interview now?", ans: "On Wednesday at nine o'clock", wrong: ["On Tuesday at nine o'clock", "On Wednesday at ten o'clock", "On Friday at nine o'clock"],
      ex: "Thư thoại nói buổi phỏng vấn “has been moved to Wednesday at nine o'clock” — chuyển sang thứ Tư lúc chín giờ.",
      t: "Buổi phỏng vấn của ông Hưng chuyển sang thứ Tư.", exT: "Đúng. Phỏng vấn đã chuyển sang thứ Tư (moved to Wednesday).",
      f: ["Buổi phỏng vấn diễn ra lúc mười giờ.", "Bà Mai gọi điện để hủy buổi phỏng vấn."],
      exF: ["Sai. Giờ phỏng vấn là chín giờ, không phải mười giờ.", "Sai. Buổi phỏng vấn chỉ ĐỔI NGÀY sang thứ Tư, không bị hủy."]
    },
    {
      transcript: "A: Excuse me, the printer on the second floor is not working. B: I will send a technician this afternoon. A: Thank you. We need it for the meeting at three o'clock.",
      q: "Where is the broken printer?", ans: "On the second floor", wrong: ["On the first floor", "On the third floor", "In the meeting room"],
      ex: "Người A nói “the printer on the second floor is not working” — máy in hỏng ở tầng hai.",
      t: "Máy in ở tầng hai đang bị hỏng.", exT: "Đúng. Bài nghe nói máy in tầng hai không hoạt động.",
      f: ["Kỹ thuật viên sẽ đến vào buổi sáng.", "Cuộc họp bắt đầu lúc bốn giờ."],
      exF: ["Sai. Kỹ thuật viên đến vào buổi CHIỀU (this afternoon).", "Sai. Cuộc họp bắt đầu lúc ba giờ (at three o'clock)."]
    },
    {
      transcript: "A: I need to fly to Da Nang for the conference next Monday. B: There is a flight at seven thirty in the morning. A: That is perfect. Please book one ticket for me.",
      q: "Where is the first speaker travelling to?", ans: "To Da Nang", wrong: ["To Ha Noi", "To Hue", "To Ho Chi Minh City"],
      ex: "Người A nói “I need to fly to Da Nang” — cần bay tới Đà Nẵng dự hội nghị.",
      t: "Người nói cần bay đến Đà Nẵng để dự hội nghị.", exT: "Đúng. Đích đến là Đà Nẵng và mục đích là dự hội nghị (the conference).",
      f: ["Chuyến bay khởi hành lúc bảy giờ tối.", "Người nói cần đặt hai vé máy bay."],
      exF: ["Sai. Chuyến bay lúc bảy giờ ba mươi BUỔI SÁNG (in the morning).", "Sai. Người nói chỉ đặt MỘT vé (one ticket)."]
    },
    {
      transcript: "A: Welcome to our company, Ms. Hoa. Your first day of training is tomorrow. B: Thank you. What time should I arrive? A: Please come at eight thirty and bring your ID card.",
      q: "What should Ms. Hoa bring on her first training day?", ans: "Her ID card", wrong: ["Her laptop", "Her CV", "Her uniform"],
      ex: "Người A dặn “bring your ID card” — mang theo thẻ căn cước/giấy tờ tùy thân.",
      t: "Ngày đào tạo đầu tiên của cô Hoa là ngày mai.", exT: "Đúng. Bài nghe nói ngày đào tạo đầu tiên là ngày mai (tomorrow).",
      f: ["Cô Hoa cần đến lúc chín giờ.", "Cô Hoa phải mang theo máy tính xách tay."],
      exF: ["Sai. Cô Hoa cần đến lúc tám giờ ba mươi (eight thirty).", "Sai. Thứ phải mang là thẻ căn cước (ID card), không nhắc máy tính."]
    },
    {
      transcript: "A: How were our sales last month? B: They increased by ten percent compared to the month before. A: That is great news for the whole team.",
      q: "How did sales change last month?", ans: "They increased by ten percent", wrong: ["They decreased by ten percent", "They increased by five percent", "They stayed the same"],
      ex: "Người B nói doanh số “increased by ten percent” — tăng mười phần trăm so với tháng trước.",
      t: "Doanh số tháng trước tăng mười phần trăm.", exT: "Đúng. Doanh số tăng mười phần trăm (increased by ten percent).",
      f: ["Doanh số tháng trước giảm mười phần trăm.", "Doanh số tháng trước không thay đổi."],
      exF: ["Sai. Doanh số TĂNG mười phần trăm, không giảm.", "Sai. Doanh số có thay đổi: tăng mười phần trăm so với tháng trước nữa."]
    },
    {
      transcript: "A: Could we meet the client on Thursday morning? B: Thursday morning is busy, but Thursday afternoon is free. A: Then let us meet at two o'clock on Thursday afternoon.",
      q: "When will they meet the client?", ans: "At two o'clock on Thursday afternoon", wrong: ["At two o'clock on Thursday morning", "At three o'clock on Thursday afternoon", "At two o'clock on Friday afternoon"],
      ex: "Sáng thứ Năm bận nên họ chốt gặp “at two o'clock on Thursday afternoon” — hai giờ chiều thứ Năm.",
      t: "Họ sẽ gặp khách hàng vào chiều thứ Năm.", exT: "Đúng. Cuộc gặp chốt vào chiều thứ Năm lúc hai giờ.",
      f: ["Cuộc gặp với khách hàng diễn ra vào sáng thứ Năm.", "Cuộc gặp bắt đầu lúc ba giờ chiều."],
      exF: ["Sai. Sáng thứ Năm bận; cuộc gặp vào buổi CHIỀU.", "Sai. Cuộc gặp bắt đầu lúc HAI giờ chiều."]
    },
    {
      transcript: "A: Please note that the office will be closed next Monday for a public holiday. The office will open again on Tuesday morning as usual.",
      q: "When will the office open again?", ans: "On Tuesday morning", wrong: ["On Monday afternoon", "On Tuesday afternoon", "On Wednesday morning"],
      ex: "Thông báo nói văn phòng “will open again on Tuesday morning” — mở lại sáng thứ Ba.",
      t: "Văn phòng nghỉ thứ Hai tuần sau vì ngày lễ.", exT: "Đúng. Thứ Hai văn phòng đóng cửa vì ngày lễ chung (a public holiday).",
      f: ["Văn phòng mở lại vào chiều thứ Ba.", "Thứ Hai tuần sau văn phòng vẫn làm việc bình thường."],
      exF: ["Sai. Văn phòng mở lại vào SÁNG thứ Ba.", "Sai. Thứ Hai văn phòng ĐÓNG cửa nghỉ lễ."]
    },
    {
      transcript: "A: I would like to book a single room for two nights, please. B: Certainly. Would you like breakfast included? A: Yes, please. Breakfast at seven o'clock would be great.",
      q: "How long will the guest stay at the hotel?", ans: "For two nights", wrong: ["For one night", "For three nights", "For one week"],
      ex: "Khách đặt “a single room for two nights” — phòng đơn trong hai đêm.",
      t: "Khách muốn đặt một phòng đơn trong hai đêm.", exT: "Đúng. Bài nghe nói rõ phòng đơn (single room) trong hai đêm (two nights).",
      f: ["Khách không muốn ăn sáng tại khách sạn.", "Khách đặt một phòng đôi."],
      exF: ["Sai. Khách đồng ý ăn sáng lúc bảy giờ (breakfast at seven o'clock).", "Sai. Khách đặt phòng ĐƠN, không phải phòng đôi."]
    },
    {
      transcript: "A: When is the deadline for the new project report? B: The report is due on the fifteenth of June. A: We still have two weeks, so we can finish it on time.",
      q: "When is the project report due?", ans: "On the fifteenth of June", wrong: ["On the fifth of June", "On the fifteenth of July", "On the first of June"],
      ex: "Người B nói báo cáo “is due on the fifteenth of June” — đến hạn ngày mười lăm tháng Sáu.",
      t: "Báo cáo dự án đến hạn vào ngày mười lăm tháng Sáu.", exT: "Đúng. Hạn nộp là ngày mười lăm tháng Sáu (the fifteenth of June).",
      f: ["Hạn nộp báo cáo là ngày năm tháng Sáu.", "Họ chỉ còn một tuần để hoàn thành báo cáo."],
      exF: ["Sai. Hạn nộp là ngày MƯỜI LĂM tháng Sáu.", "Sai. Họ còn HAI tuần (two weeks), không phải một tuần."]
    },
    {
      transcript: "A: Could you make ten copies of this contract, please? B: Of course. Do you need them before the meeting? A: Yes, the meeting starts in twenty minutes.",
      q: "How many copies of the contract does the speaker need?", ans: "Ten copies", wrong: ["Five copies", "Twenty copies", "Two copies"],
      ex: "Người A nhờ “make ten copies of this contract” — photo mười bản hợp đồng.",
      t: "Người nói cần mười bản sao của bản hợp đồng.", exT: "Đúng. Số bản cần photo là mười (ten copies).",
      f: ["Cuộc họp bắt đầu sau mười phút nữa.", "Người nói cần hai mươi bản sao."],
      exF: ["Sai. Cuộc họp bắt đầu sau HAI MƯƠI phút (in twenty minutes).", "Sai. Số bản cần là MƯỜI, không phải hai mươi."]
    },
    {
      transcript: "A: From tomorrow, staff must park their motorbikes in the new parking area behind the building. Please do not park in front of the main entrance.",
      q: "Where must staff park their motorbikes from tomorrow?", ans: "In the new parking area behind the building", wrong: ["In front of the main entrance", "In the old parking area", "Inside the office building"],
      ex: "Thông báo yêu cầu đỗ xe ở “the new parking area behind the building” — bãi mới phía sau tòa nhà.",
      t: "Từ ngày mai, nhân viên phải đỗ xe ở bãi mới sau tòa nhà.", exT: "Đúng. Quy định áp dụng từ ngày mai (from tomorrow), bãi mới ở sau tòa nhà.",
      f: ["Nhân viên có thể đỗ xe trước cổng chính.", "Quy định đỗ xe mới bắt đầu từ tuần sau."],
      exF: ["Sai. Thông báo cấm rõ việc đỗ trước cổng chính (do not park in front of the main entrance).", "Sai. Quy định bắt đầu từ NGÀY MAI, không phải tuần sau."]
    }
  ];
  var QRESP = [
    { qline: "When does the train leave?", ans: "It leaves at six o'clock.", wrong: ["It is going to Hue.", "It is quite comfortable.", "About twenty passengers take it."], ex: "Câu hỏi “When” hỏi thời gian nên câu đáp phải cho giờ: “It leaves at six o'clock.” Các câu còn lại nói điểm đến, cảm nhận hoặc số người." },
    { qline: "Where is the meeting room?", ans: "It is on the third floor.", wrong: ["It begins at nine o'clock.", "Our manager arranged it.", "There are twelve chairs in it."], ex: "Câu hỏi “Where” cần đáp án chỉ nơi chốn: “on the third floor” (ở tầng ba)." },
    { qline: "Who is the new manager?", ans: "Ms. Parker is the new manager.", wrong: ["She arrived last week.", "Her office is upstairs.", "She manages ten people."], ex: "Câu hỏi “Who” cần đáp án chỉ NGƯỜI kèm tên: Ms. Parker. Các câu khác cho thời gian, nơi chốn hoặc số lượng." },
    { qline: "How many people are coming to the party?", ans: "About thirty people are coming.", wrong: ["It starts at seven o'clock.", "It is at the office hall.", "The manager invited them."], ex: "“How many” hỏi số lượng nên đáp án phải có con số: khoảng ba mươi người." },
    { qline: "Do you have a pen I can borrow?", ans: "Yes, here you are.", wrong: ["The pen is blue.", "I bought it yesterday.", "Mr. Tan has one too."], ex: "Câu hỏi Yes/No xin mượn đồ: đáp án tự nhiên nhất là “Yes, here you are” (Vâng, đây ạ). Các câu khác không trả lời câu hỏi." },
    { qline: "What time does the shop open?", ans: "It opens at eight in the morning.", wrong: ["It is near the station.", "The shop sells clothes.", "Mr. Hoang owns the shop."], ex: "“What time” hỏi giờ mở cửa nên đáp án phải là một mốc giờ: tám giờ sáng." },
    { qline: "Where can I buy a ticket?", ans: "At the counter over there.", wrong: ["The ticket costs ten dollars.", "The train leaves very soon.", "Tickets are printed daily."], ex: "Câu hỏi “Where” cần nơi chốn: “at the counter over there” (ở quầy đằng kia)." },
    { qline: "How long does the flight take?", ans: "It takes about two hours.", wrong: ["It leaves at noon.", "The plane is quite large.", "Da Nang is a beautiful city."], ex: "“How long” hỏi khoảng thời gian bay nên đáp án là “about two hours” (khoảng hai giờ)." },
    { qline: "Why was the meeting cancelled?", ans: "Because the manager was ill.", wrong: ["It was in Room 2.", "It lasted two hours.", "Ten people were invited."], ex: "Câu hỏi “Why” cần lý do, bắt đầu bằng “Because…”: vì quản lý bị ốm." },
    { qline: "Did you send the email yesterday?", ans: "Yes, I sent it in the morning.", wrong: ["The email was very long.", "Ms. Lan wrote the email.", "It is about the new project."], ex: "Câu hỏi Yes/No ở quá khứ: đáp án khẳng định kèm hành động đã làm — “Yes, I sent it in the morning.”" },
    { qline: "How much does this bag cost?", ans: "It costs twenty dollars.", wrong: ["It is made of leather.", "The shop opens at nine.", "Ms. Anh bought one yesterday."], ex: "“How much” hỏi giá nên đáp án phải là số tiền: hai mươi đô-la." },
    { qline: "When is your day off?", ans: "My day off is on Sunday.", wrong: ["I usually stay at home.", "I have worked here for years.", "My manager approved it."], ex: "Câu hỏi “When” về ngày nghỉ cần một ngày cụ thể: Chủ nhật (on Sunday)." },
    { qline: "Where did you put the keys?", ans: "I put them on the desk.", wrong: ["They are very important.", "Mr. Son uses them daily.", "At five o'clock this morning."], ex: "Câu hỏi “Where” cần nơi để đồ: “on the desk” (trên bàn)." },
    { qline: "Who called this morning?", ans: "The customer called this morning.", wrong: ["He called at nine o'clock.", "The phone is on the desk.", "She wants a new order."], ex: "Câu hỏi “Who” cần chỉ người gọi: “the customer” (khách hàng). Câu “He called at nine” chỉ cho giờ, không cho biết là ai." },
    { qline: "How often do you visit your parents?", ans: "I visit them every weekend.", wrong: ["They live in the countryside.", "My parents are both retired.", "I usually go by bus."], ex: "“How often” hỏi tần suất nên đáp án phải là “every weekend” (mỗi cuối tuần)." },
    { qline: "Is the office open on Saturday?", ans: "No, it is closed on Saturdays.", wrong: ["The office is very large.", "Mr. Tuan works there.", "It opens at eight o'clock."], ex: "Câu hỏi Yes/No về thứ Bảy: đáp án phủ định trực tiếp — văn phòng đóng cửa vào các ngày thứ Bảy." },
    { qline: "What would you like to drink?", ans: "I would like some coffee, please.", wrong: ["The cup is on the table.", "She drinks tea every day.", "At the cafe near here."], ex: "Câu hỏi mời đồ uống: đáp án nêu đồ uống muốn dùng — “some coffee, please”." },
    { qline: "How do I get to the station?", ans: "Take the bus number five.", wrong: ["The station is very old.", "It takes twenty minutes.", "Mr. Nam works near there."], ex: "Câu hỏi “How do I get to…” hỏi cách đi: đáp án chỉ phương tiện/đường đi — đi xe buýt số năm." },
    { qline: "When will the product arrive?", ans: "It will arrive next Friday.", wrong: ["The product is very popular.", "It costs a lot of money.", "Our factory made it."], ex: "Câu hỏi “When” ở tương lai cần mốc thời gian: thứ Sáu tuần sau (next Friday)." },
    { qline: "Would you like to join us for lunch?", ans: "Yes, I would love to.", wrong: ["Lunch is at twelve o'clock.", "The restaurant is nearby.", "Mr. Huy invited us yesterday."], ex: "Lời mời “Would you like to…” được đáp nhận lời bằng “Yes, I would love to.”" },
    { qline: "How many chairs do we need for the meeting?", ans: "We need twenty chairs.", wrong: ["The chairs are in Room 4.", "They arrived on Friday.", "Ms. Be ordered them."], ex: "“How many chairs” hỏi số lượng ghế: đáp án là hai mươi chiếc." },
    { qline: "Where is the nearest bank?", ans: "It is next to the post office.", wrong: ["The bank opens at eight.", "Mr. Long works there.", "You need your ID card there."], ex: "Câu hỏi “Where” cần vị trí: ngân hàng gần nhất ở cạnh bưu điện (next to the post office)." }
  ];
  function fListenScript() {
    var s = enPick(SCRIPTS);
    var q = enMCQ(s.q, s.ans, s.wrong, s.ex, { visual: enListenVisual(s.transcript) });
    enId(q, s.transcript);
    return enTag(q, "fListenScript", s.q);
  }
  function fListenResp() {
    var e = enPick(QRESP);
    var q = enMCQ("Nghe câu hỏi rồi chọn câu đáp đúng nhất.", e.ans, e.wrong, e.ex, { visual: enListenVisual(e.qline) });
    enId(q, e.qline);
    return enTag(q, "fListenResp", e.qline);
  }
  function fListenTF() {
    var s = enPick(SCRIPTS);
    var lv = enListenVisual(s.transcript);
    var rounds = enShuffle([
      { stmt: lv + s.t, truth: true, explain: s.exT },
      { stmt: lv + s.f[0], truth: false, explain: s.exF[0] },
      { stmt: lv + s.f[1], truth: false, explain: s.exF[1] }
    ]);
    var q = enTF(rounds, "Nghe bài nói, rồi phán đoán các mệnh đề sau đúng hay sai.");
    enId(q, s.transcript);
    return enTag(q, "fListenTF", s.q);
  }
  var T5 = {
    id: "cd-en-thpt-listen", emoji: "🎙️", name: "Nghe hiểu TOEIC",
    sub: "Hội thoại & thông báo ngắn qua giọng đọc",
    pools: { choose: [fListenScript, fListenResp], blank: [], match: [], games: [fListenTF] },
    knowledge: {
      notes: [
        "Mẹo TOEIC Part 2 (nghe câu hỏi — chọn câu đáp): xác định từ hỏi ngay khi nghe — When → đáp án có thời gian, Where → nơi chốn, Who → người, How many → số lượng. Câu đáp lạc loại từ hỏi gần như luôn sai.",
        "Cảnh giác bẫy từ đồng âm/lặp từ trong Part 2: câu đáp chứa đúng từ nghe được trong câu hỏi thường là bẫy; đáp án đúng hay dùng từ đồng nghĩa.",
        "Mẹo hội thoại (Part 3 thu nhỏ): nghe câu đầu để biết bối cảnh (ở đâu, quan hệ hai người), nghe câu cuối vì đáp án hay nằm ở lượt nói cuối.",
        "Với thông báo: tập trung vào thay đổi và mốc thời gian — moved to, from tomorrow, close early — vì câu hỏi gần như luôn xoay quanh chúng.",
        "Không nghe rõ một chi tiết vẫn có thể loại trừ: bỏ qua câu đáp sai loại thông tin (hỏi giờ mà đáp nơi chốn) rồi chọn trong số còn lại."
      ],
      facts: [
        { q: "Nghe câu hỏi “When does the train leave?” — câu đáp đúng phải chứa gì?", a: "Một mốc thời gian", ex: "Từ hỏi “When” quyết định loại đáp án: câu đáp đúng cho giờ tàu chạy, ví dụ “It leaves at six o'clock.”" },
        { q: "Nghe “Where is the meeting room?” — đáp án “It starts at nine.” đúng hay sai?", a: "Sai — đó là đáp án về thời gian", ex: "“Where” hỏi nơi chốn; câu đáp cho giờ bắt đầu thuộc loại thời gian nên bị loại ngay." }
      ],
      pairs: [["When", "hỏi thời gian"], ["Where", "hỏi nơi chốn"], ["Who", "hỏi người"], ["How many", "hỏi số lượng"], ["Why", "hỏi lý do"]]
    }
  };

  window.__EN_BANDS = window.__EN_BANDS || [];
  window.__EN_BANDS.push({
    id: "thpt",
    name: "Tiếng Anh THPT — TOEIC • IELTS",
    grades: [10, 11, 12],
    topics: [T1, T2, T3, T4, T5]
  });
})();
/* ================================================================
   BỔ SUNG DẢI THPT — điều phối viên tự viết tay (đợt v12).
   Lý do: đếm bằng thước game (count-distinct-ta, 6.000 lượt/chủ đề) cho
   cd-en-thpt-tfng = 88 và cd-en-thpt-listen = 36 — dưới mục tiêu 150 vì
   ngân hàng hữu hạn của bản đầu đã lộ hết. File này nạp NGAY SAU
   band-thpt.js (trước core-tail): tìm band "thpt" trong __EN_BANDS và
   ĐẨY THÊM bộ sinh tự chứa (ngân hàng riêng) vào pools của 2 chủ đề.
   Nội dung tự viết mới 100%; mệnh đề TFNG đối chiếu bằng chứng từng câu.
   ================================================================ */
(function () {
  var bands = window.__EN_BANDS || [];
  var band = null;
  for (var i = 0; i < bands.length; i++) if (bands[i].id === "thpt") band = bands[i];
  if (!band) return;
  function topic(id) {
    for (var i = 0; i < band.topics.length; i++) if (band.topics[i].id === id) return band.topics[i];
    return null;
  }

  /* ================= TFNG: 4 đoạn mới ================= */
  var P2 = [
    {
      title: "Working From Home",
      text: "Ten years ago, almost nobody in our company worked from home. Today, about half of our staff work at home two or three days a week. The company introduced the policy in 2020, when travel to the office was difficult. Many employees say they save time and money because they do not travel every day. However, some staff miss meeting their colleagues in person, so the office stays open five days a week for anyone who wants to come in. Managers hold one team meeting online every Monday morning.",
      stmts: [
        { stmt: "About half of the company's staff now work from home some days each week.", verdict: "True", ev: "Đoạn văn viết: “about half of our staff work at home two or three days a week”.", ex: "True — khoảng một nửa nhân viên làm việc ở nhà hai hoặc ba ngày mỗi tuần." },
        { stmt: "The company started its home-working policy in 2020.", verdict: "True", ev: "Đoạn văn viết: “The company introduced the policy in 2020”.", ex: "True — chính sách được đưa ra vào năm 2020." },
        { stmt: "Employees who work from home save money on travel.", verdict: "True", ev: "Đoạn văn viết: nhân viên “save time and money because they do not travel every day”.", ex: "True — không phải đi lại hằng ngày nên tiết kiệm tiền đi lại." },
        { stmt: "All employees must work at home two days a week.", verdict: "False", ev: "Đoạn văn viết văn phòng “stays open five days a week for anyone who wants to come in” — ai muốn đến vẫn đến được.", ex: "False — làm ở nhà không bắt buộc; văn phòng vẫn mở cho người muốn đến." },
        { stmt: "The office is closed on Mondays.", verdict: "False", ev: "Đoạn văn viết văn phòng mở “five days a week”, và cuộc họp thứ Hai là họp TRỰC TUYẾN chứ không phải văn phòng đóng cửa.", ex: "False — văn phòng mở cả năm ngày trong tuần." },
        { stmt: "Team meetings are held online every Friday.", verdict: "False", ev: "Đoạn văn viết: “one team meeting online every Monday morning”.", ex: "False — họp trực tuyến vào sáng thứ Hai, không phải thứ Sáu." },
        { stmt: "Ten years ago, half of the staff worked from home.", verdict: "False", ev: "Đoạn văn viết mười năm trước “almost nobody in our company worked from home”.", ex: "False — mười năm trước hầu như không ai làm việc ở nhà." },
        { stmt: "Most employees live far from the office.", verdict: "Not Given", ev: "Đoạn văn chỉ nói năm 2020 việc đi tới văn phòng khó khăn; không hề nói nhân viên sống xa hay gần.", ex: "Not Given — đoạn văn không cho thông tin về khoảng cách nhà của nhân viên." },
        { stmt: "The company plans to close its office next year.", verdict: "Not Given", ev: "Đoạn văn không nhắc kế hoạch đóng văn phòng; trái lại văn phòng vẫn mở năm ngày mỗi tuần.", ex: "Not Given — không có thông tin về kế hoạch đóng văn phòng." },
        { stmt: "The company measured employees' productivity last year.", verdict: "Not Given", ev: "Đoạn văn nói về tiết kiệm thời gian và tiền bạc, không nhắc việc đo năng suất.", ex: "Not Given — đoạn văn không đề cập năng suất lao động." }
      ],
      detail: [
        { q: "How many days a week do about half of the staff work at home?", ans: "Two or three days", wrong: ["Five days", "One day", "Four days"], ex: "Đoạn văn: “work at home two or three days a week”." },
        { q: "Why did the company introduce the policy in 2020?", ans: "Because travel to the office was difficult", wrong: ["Because the office was too small", "Because staff asked for higher pay", "Because the company moved to a new city"], ex: "Đoạn văn nêu lý do: “when travel to the office was difficult”." },
        { q: "When is the online team meeting?", ans: "Every Monday morning", wrong: ["Every Friday morning", "Every Monday afternoon", "Every day at nine"], ex: "Đoạn văn: “one team meeting online every Monday morning”." },
        { q: "Why do some staff still come to the office?", ans: "They miss meeting colleagues in person", wrong: ["They have no computer at home", "The office is near their homes", "Managers check their work there"], ex: "Đoạn văn: “some staff miss meeting their colleagues in person”." }
      ],
      purpose: { ans: "Working from home at one company", wrong: ["How to hold online meetings", "The history of office buildings", "Saving money on travel"] },
      blanks: [
        { sent: "The company introduced the work-from-home policy in ___.", ans: "2020", wrong: ["2010", "2015", "2025"], ex: "Đoạn văn ghi rõ chính sách ra đời năm 2020." },
        { sent: "The office stays open ___ days a week.", ans: "five", wrong: ["two", "three", "seven"], ex: "Đoạn văn: “stays open five days a week”." },
        { sent: "Managers hold one team meeting online every ___ morning.", ans: "Monday", wrong: ["Friday", "Tuesday", "Sunday"], ex: "Đoạn văn: “every Monday morning”." }
      ]
    },
    {
      title: "Saving Water in the City",
      text: "The city of Da Lat has started a new programme to save water. Engineers have repaired old pipes under the main streets, because broken pipes were wasting thousands of litres every day. Schools teach children to turn off the tap while they brush their teeth. In the first year of the programme, families used twelve per cent less water than before. The city now plans to build a small lake to store rainwater for the dry season. Farmers near the city already collect rainwater in large tanks on their farms.",
      stmts: [
        { stmt: "Broken pipes were wasting a large amount of water every day.", verdict: "True", ev: "Đoạn văn viết ống vỡ “were wasting thousands of litres every day”.", ex: "True — ống vỡ làm lãng phí hàng nghìn lít nước mỗi ngày." },
        { stmt: "Families used less water in the first year of the programme.", verdict: "True", ev: "Đoạn văn viết: “families used twelve per cent less water than before”.", ex: "True — năm đầu, các gia đình dùng ít nước hơn 12%." },
        { stmt: "Farmers near Da Lat store rainwater in tanks.", verdict: "True", ev: "Đoạn văn viết nông dân “collect rainwater in large tanks on their farms”.", ex: "True — nông dân trữ nước mưa trong các bể lớn ở trang trại." },
        { stmt: "The city has already built a lake to store rainwater.", verdict: "False", ev: "Đoạn văn viết thành phố “now plans to build a small lake” — mới là kế hoạch, chưa xây.", ex: "False — hồ chứa mới chỉ là kế hoạch, chưa được xây." },
        { stmt: "Schools teach children to save water while washing dishes.", verdict: "False", ev: "Đoạn văn viết trẻ được dạy khoá vòi “while they brush their teeth” — khi đánh răng.", ex: "False — trẻ khoá vòi khi ĐÁNH RĂNG, không phải khi rửa bát." },
        { stmt: "Families used twelve per cent more water in the first year.", verdict: "False", ev: "Đoạn văn viết “twelve per cent LESS water”.", ex: "False — các gia đình dùng ÍT HƠN 12%, không phải nhiều hơn." },
        { stmt: "The stored rainwater in the planned lake is for the dry season.", verdict: "True", ev: "Đoạn văn viết hồ để “store rainwater for the dry season”.", ex: "True — nước mưa trong hồ dành cho mùa khô." },
        { stmt: "The programme cost the city a lot of money.", verdict: "Not Given", ev: "Đoạn văn không nhắc chi phí của chương trình.", ex: "Not Given — không có thông tin về chi phí." },
        { stmt: "Da Lat has less rain than other cities.", verdict: "Not Given", ev: "Đoạn văn không so sánh lượng mưa của Đà Lạt với nơi khác.", ex: "Not Given — không có thông tin so sánh lượng mưa." },
        { stmt: "Engineers repaired pipes in all the city's schools.", verdict: "Not Given", ev: "Đoạn văn nói kỹ sư sửa ống “under the main streets”; trường học chỉ dạy trẻ tiết kiệm nước, không nói tới việc sửa ống ở trường.", ex: "Not Given — đoạn văn không nói kỹ sư sửa ống trong trường học." }
      ],
      detail: [
        { q: "Where were the old pipes that engineers repaired?", ans: "Under the main streets", wrong: ["Inside the schools", "Near the farms", "Around the lake"], ex: "Đoạn văn: “repaired old pipes under the main streets”." },
        { q: "How much less water did families use in the first year?", ans: "Twelve per cent less", wrong: ["Twenty per cent less", "Two per cent less", "Half as much"], ex: "Đoạn văn ghi “twelve per cent less water”." },
        { q: "What do schools teach children to do?", ans: "Turn off the tap while brushing their teeth", wrong: ["Drink more water", "Wash dishes quickly", "Collect rainwater in tanks"], ex: "Đoạn văn: “turn off the tap while they brush their teeth”." },
        { q: "Where do farmers collect rainwater?", ans: "In large tanks on their farms", wrong: ["In a small lake", "Under the main streets", "In bottles at school"], ex: "Đoạn văn: “collect rainwater in large tanks on their farms”." }
      ],
      purpose: { ans: "A city programme to save water", wrong: ["How farmers grow vegetables", "Building lakes for tourists", "Repairing streets in Da Lat"] },
      blanks: [
        { sent: "Engineers repaired old pipes under the ___ streets.", ans: "main", wrong: ["new", "long", "busy"], ex: "Đoạn văn dùng cụm “the main streets” (các đường chính)." },
        { sent: "Families used ___ per cent less water in the first year.", ans: "twelve", wrong: ["ten", "twenty", "fifteen"], ex: "Đoạn văn ghi “twelve per cent less water”." },
        { sent: "The city plans to build a small ___ to store rainwater.", ans: "lake", wrong: ["tank", "pipe", "school"], ex: "Đoạn văn: “build a small lake to store rainwater”." }
      ]
    },
    {
      title: "A School in the Mountains",
      text: "Den Sang is a small village high in the mountains. Its primary school has only three classrooms and forty-two pupils. Every morning, teacher Mai walks four kilometres from her home to the school because there is no road for cars. In winter, the temperature can fall below zero, so the school received warm blankets and coats from a charity in Hanoi last year. The pupils love their library corner, which has about two hundred books. This year, for the first time, the school has electricity in every classroom.",
      stmts: [
        { stmt: "The school in Den Sang has forty-two pupils.", verdict: "True", ev: "Đoạn văn viết trường “has only three classrooms and forty-two pupils”.", ex: "True — trường có đúng 42 học sinh." },
        { stmt: "Teacher Mai cannot drive to school because there is no road for cars.", verdict: "True", ev: "Đoạn văn viết cô Mai đi bộ “because there is no road for cars”.", ex: "True — không có đường cho ô tô nên cô phải đi bộ." },
        { stmt: "A charity gave the school blankets and coats last year.", verdict: "True", ev: "Đoạn văn viết trường “received warm blankets and coats from a charity in Hanoi last year”.", ex: "True — một tổ chức từ thiện ở Hà Nội tặng chăn và áo ấm năm ngoái." },
        { stmt: "Winters in Den Sang can be very cold.", verdict: "True", ev: "Đoạn văn viết mùa đông “the temperature can fall below zero”.", ex: "True — nhiệt độ có thể xuống dưới 0 độ." },
        { stmt: "The school has five classrooms.", verdict: "False", ev: "Đoạn văn viết “only three classrooms”.", ex: "False — trường chỉ có BA phòng học." },
        { stmt: "The school library has about two thousand books.", verdict: "False", ev: "Đoạn văn viết góc thư viện có “about two hundred books” — khoảng hai TRĂM cuốn.", ex: "False — khoảng 200 cuốn sách, không phải 2.000." },
        { stmt: "The school has had electricity for many years.", verdict: "False", ev: "Đoạn văn viết: “This year, for the first time, the school has electricity”.", ex: "False — năm nay trường MỚI có điện lần đầu tiên." },
        { stmt: "Teacher Mai has worked at the school for ten years.", verdict: "Not Given", ev: "Đoạn văn không nói cô Mai đã dạy ở trường bao lâu.", ex: "Not Given — không có thông tin về số năm công tác của cô Mai." },
        { stmt: "The pupils' parents built the library corner.", verdict: "Not Given", ev: "Đoạn văn chỉ nói học sinh yêu thích góc thư viện; không nói ai xây nó.", ex: "Not Given — không có thông tin ai làm góc thư viện." },
        { stmt: "Most pupils want to become teachers.", verdict: "Not Given", ev: "Đoạn văn không nhắc ước mơ nghề nghiệp của học sinh.", ex: "Not Given — không có thông tin về mong muốn của học sinh." }
      ],
      detail: [
        { q: "How many classrooms does the school have?", ans: "Three", wrong: ["Four", "Five", "Two"], ex: "Đoạn văn: “only three classrooms”." },
        { q: "How far does teacher Mai walk every morning?", ans: "Four kilometres", wrong: ["Two kilometres", "Ten kilometres", "One kilometre"], ex: "Đoạn văn: “walks four kilometres from her home to the school”." },
        { q: "Where did the blankets and coats come from?", ans: "A charity in Hanoi", wrong: ["The city government", "The pupils' parents", "A school in the village"], ex: "Đoạn văn: “from a charity in Hanoi”." },
        { q: "What is new at the school this year?", ans: "Electricity in every classroom", wrong: ["A new library", "Three new teachers", "A road for cars"], ex: "Đoạn văn: “This year, for the first time, the school has electricity in every classroom”." }
      ],
      purpose: { ans: "A small school in a mountain village", wrong: ["How to become a teacher", "Charities in Hanoi", "Winter weather in Vietnam"] },
      blanks: [
        { sent: "The school has only three classrooms and ___ pupils.", ans: "forty-two", wrong: ["forty", "fifty-two", "twenty-four"], ex: "Đoạn văn ghi “forty-two pupils” (42 học sinh)." },
        { sent: "Teacher Mai walks ___ kilometres to school every morning.", ans: "four", wrong: ["two", "five", "ten"], ex: "Đoạn văn ghi “walks four kilometres”." },
        { sent: "The library corner has about two ___ books.", ans: "hundred", wrong: ["thousand", "dozen", "million"], ex: "Đoạn văn ghi “about two hundred books” (khoảng 200 cuốn)." }
      ]
    },
    {
      title: "The Night Train",
      text: "The night train from Hanoi to Lao Cai leaves the capital at ten o'clock in the evening and arrives at about six the next morning. Many tourists take this train because they can sleep during the journey and save the cost of a hotel night. The train has soft seats during the day, but at night most passengers choose a bed in a sleeping car. Tickets for beds are more expensive than seats, especially at weekends. Passengers who want dinner must order it before the train leaves, because the kitchen car closes at eleven.",
      stmts: [
        { stmt: "The night train journey lasts about eight hours.", verdict: "True", ev: "Tàu rời Hà Nội lúc 10 giờ tối và đến nơi khoảng 6 giờ sáng hôm sau — chuyến đi kéo dài khoảng 8 giờ.", ex: "True — từ 22 giờ tới khoảng 6 giờ sáng là khoảng 8 giờ." },
        { stmt: "Beds on the train cost more than seats.", verdict: "True", ev: "Đoạn văn viết: “Tickets for beds are more expensive than seats”.", ex: "True — vé giường nằm đắt hơn vé ghế ngồi." },
        { stmt: "Tourists can save money on a hotel by taking the night train.", verdict: "True", ev: "Đoạn văn viết du khách ngủ trên tàu và “save the cost of a hotel night”.", ex: "True — ngủ trên tàu giúp tiết kiệm một đêm khách sạn." },
        { stmt: "Bed tickets cost the most at weekends.", verdict: "True", ev: "Đoạn văn viết vé giường đắt hơn “especially at weekends”.", ex: "True — vé giường đắt nhất vào cuối tuần." },
        { stmt: "The train arrives in Lao Cai at ten o'clock in the evening.", verdict: "False", ev: "10 giờ tối là giờ tàu RỜI Hà Nội; tàu đến Lào Cai khoảng 6 giờ sáng hôm sau.", ex: "False — mười giờ tối là giờ khởi hành, không phải giờ đến." },
        { stmt: "Passengers can order dinner at any time during the night.", verdict: "False", ev: "Đoạn văn viết hành khách “must order it before the train leaves” và toa bếp đóng cửa lúc 11 giờ.", ex: "False — phải đặt bữa tối TRƯỚC khi tàu chạy." },
        { stmt: "Most passengers sit on soft seats at night.", verdict: "False", ev: "Đoạn văn viết vào ban đêm “most passengers choose a bed in a sleeping car”.", ex: "False — ban đêm đa số hành khách chọn giường nằm." },
        { stmt: "The train is faster than the bus to Lao Cai.", verdict: "Not Given", ev: "Đoạn văn không nhắc tới xe buýt hay so sánh tốc độ.", ex: "Not Given — không có thông tin so sánh với xe buýt." },
        { stmt: "The sleeping cars were built in France.", verdict: "Not Given", ev: "Đoạn văn không nói toa giường nằm được sản xuất ở đâu.", ex: "Not Given — không có thông tin về nơi sản xuất toa tàu." },
        { stmt: "Breakfast is served free to all passengers.", verdict: "Not Given", ev: "Đoạn văn chỉ nhắc bữa tối (dinner); bữa sáng không được nhắc tới.", ex: "Not Given — đoạn văn không nhắc bữa sáng." }
      ],
      detail: [
        { q: "What time does the train leave Hanoi?", ans: "At ten in the evening", wrong: ["At six in the morning", "At eleven at night", "At ten in the morning"], ex: "Đoạn văn: “leaves the capital at ten o'clock in the evening”." },
        { q: "Why do many tourists take the night train?", ans: "They can sleep and save hotel costs", wrong: ["It is the fastest train", "The seats are very soft", "Dinner is free on the train"], ex: "Đoạn văn: “they can sleep during the journey and save the cost of a hotel night”." },
        { q: "When does the kitchen car close?", ans: "At eleven o'clock", wrong: ["At ten o'clock", "At midnight", "At six o'clock"], ex: "Đoạn văn: “the kitchen car closes at eleven”." },
        { q: "When are bed tickets most expensive?", ans: "At weekends", wrong: ["On Mondays", "In winter", "During the day"], ex: "Đoạn văn: “more expensive than seats, especially at weekends”." }
      ],
      purpose: { ans: "A night train journey to Lao Cai", wrong: ["How to cook dinner on a train", "Hotels in Lao Cai", "Day trains in Vietnam"] },
      blanks: [
        { sent: "The train leaves Hanoi at ___ o'clock in the evening.", ans: "ten", wrong: ["six", "nine", "eleven"], ex: "Đoạn văn ghi tàu rời ga lúc “ten o'clock in the evening”." },
        { sent: "Passengers must order dinner ___ the train leaves.", ans: "before", wrong: ["after", "when", "while"], ex: "Đoạn văn: “must order it before the train leaves”." },
        { sent: "At night, most passengers choose a bed in a ___ car.", ans: "sleeping", wrong: ["kitchen", "dining", "soft"], ex: "Đoạn văn dùng cụm “a sleeping car” (toa giường nằm)." }
      ]
    },
    {
      title: "Bees in the City",
      text: "In the last ten years, keeping bees has become popular in many large cities. In our city, the first rooftop hives appeared in 2016, on top of a hotel in the city centre. Today, there are more than three hundred hives on roofs, in parks and in private gardens. Beekeepers say city bees are often healthier than bees in the countryside, because city parks contain many different flowers and no farm chemicals are sprayed there. The city council pays for free training courses for new beekeepers every spring. Last year, the city's hives produced nearly two tonnes of honey, most of which was sold in local shops.",
      stmts: [
        { stmt: "The first rooftop hives in the city appeared in 2016.", verdict: "True", ev: "Đoạn văn viết: “the first rooftop hives appeared in 2016”.", ex: "True — tổ ong trên mái đầu tiên xuất hiện năm 2016." },
        { stmt: "City bees are often healthier than bees in the countryside.", verdict: "True", ev: "Đoạn văn viết: “city bees are often healthier than bees in the countryside”.", ex: "True — ong thành phố thường khoẻ hơn ong nông thôn." },
        { stmt: "The city council charges new beekeepers for its training courses.", verdict: "False", ev: "Đoạn văn viết hội đồng “pays for free training courses” — khoá học MIỄN PHÍ, hội đồng không thu tiền.", ex: "False — các khoá đào tạo nuôi ong miễn phí." },
        { stmt: "Last year, the city's hives produced nearly twenty tonnes of honey.", verdict: "False", ev: "Đoạn văn viết sản lượng là “nearly two tonnes” — gần hai tấn, không phải hai mươi tấn.", ex: "False — sản lượng gần HAI tấn mật ong." },
        { stmt: "Most of the city's rooftop hives belong to hotels.", verdict: "Not Given", ev: "Đoạn văn chỉ nhắc một khách sạn là nơi có tổ ong đầu tiên; không nói phần lớn tổ ong thuộc về các khách sạn.", ex: "Not Given — không có thông tin về chủ sở hữu của phần lớn tổ ong." }
      ],
      detail: [
        { q: "How many hives are there in the city today?", ans: "More than three hundred", wrong: ["About one hundred", "Nearly two thousand", "Exactly fifty"], ex: "Đoạn văn: “more than three hundred hives”." },
        { q: "When does the city council hold free training courses?", ans: "Every spring", wrong: ["Every autumn", "Twice a month", "Only in 2016"], ex: "Đoạn văn: khoá học mở “every spring”." }
      ],
      purpose: { ans: "Why beekeeping has become popular in one city", wrong: ["How to build a beehive", "The history of honey production", "Why bees are disappearing"] },
      blanks: [
        { sent: "The first rooftop hives appeared on top of a ___ in the city centre.", ans: "hotel", wrong: ["school", "library", "station"], ex: "Đoạn văn: “on top of a hotel in the city centre”." },
        { sent: "Last year, the city's hives produced nearly ___ tonnes of honey.", ans: "two", wrong: ["ten", "twenty", "five"], ex: "Đoạn văn ghi “nearly two tonnes of honey”." }
      ]
    },
    {
      title: "The Return of the Tram",
      text: "Trams were once the main form of public transport in our city, but they disappeared in the 1960s, when buses became cheaper to run. In 2019, the city opened its first new tram line, running from the railway station to the university. The line carries about fifteen thousand passengers a day. A second line, to the airport, is now being built and will open next year. Trams are slower than the metro, but they are cheaper to build, and passengers say they enjoy seeing the streets from the large windows. A ticket for the tram costs the same as a bus ticket.",
      stmts: [
        { stmt: "Trams disappeared from the city in the 1960s.", verdict: "True", ev: "Đoạn văn viết: “they disappeared in the 1960s”.", ex: "True — tàu điện biến mất khỏi thành phố vào thập niên 1960." },
        { stmt: "The first new tram line opened in 2019.", verdict: "True", ev: "Đoạn văn viết: “In 2019, the city opened its first new tram line”.", ex: "True — tuyến tàu điện mới đầu tiên mở năm 2019." },
        { stmt: "The tram line to the airport is already open.", verdict: "False", ev: "Đoạn văn viết tuyến đi sân bay “is now being built and will open next year” — đang xây, năm sau mới mở.", ex: "False — tuyến sân bay chưa mở, đang được xây." },
        { stmt: "Most passengers on the new tram line are university students.", verdict: "Not Given", ev: "Đoạn văn nói tuyến chạy tới trường đại học, nhưng không cho biết hành khách chủ yếu là ai.", ex: "Not Given — không có thông tin về thành phần hành khách." },
        { stmt: "The city is planning a third tram line.", verdict: "Not Given", ev: "Đoạn văn chỉ nhắc tuyến thứ hai đang xây; không nhắc kế hoạch tuyến thứ ba.", ex: "Not Given — không có thông tin về tuyến tàu điện thứ ba." }
      ],
      detail: [
        { q: "How many passengers does the first tram line carry each day?", ans: "About fifteen thousand", wrong: ["About five thousand", "About fifty thousand", "About fifteen hundred"], ex: "Đoạn văn: “carries about fifteen thousand passengers a day”." },
        { q: "Why did trams disappear in the 1960s?", ans: "Because buses were cheaper to run", wrong: ["Because the streets were too narrow", "Because passengers disliked trams", "Because the metro opened"], ex: "Đoạn văn: “when buses became cheaper to run”." }
      ],
      purpose: { ans: "The return of trams to one city", wrong: ["How trams work", "The history of the metro", "Building an airport railway"] },
      blanks: [
        { sent: "The first new tram line runs from the railway station to the ___.", ans: "university", wrong: ["airport", "city centre", "harbour"], ex: "Đoạn văn: “running from the railway station to the university”." },
        { sent: "A tram ticket costs the same as a ___ ticket.", ans: "bus", wrong: ["metro", "train", "plane"], ex: "Đoạn văn: “costs the same as a bus ticket”." }
      ]
    },
    {
      title: "Learning Music as an Adult",
      text: "Many adults believe they are too old to learn a musical instrument, but teachers at the City Music School disagree. The school offers evening classes for adults, and the number of adult students has doubled in five years. The oldest beginner at the school is eighty-two years old. Teachers say adults learn more slowly than children at first, but they practise more regularly. The most popular instrument among adult beginners is the piano, followed by the guitar. Students can borrow instruments from the school for the first three months, so they do not need to buy one immediately.",
      stmts: [
        { stmt: "The number of adult students at the school has doubled in five years.", verdict: "True", ev: "Đoạn văn viết: “the number of adult students has doubled in five years”.", ex: "True — số học viên người lớn tăng gấp đôi trong năm năm." },
        { stmt: "The oldest beginner at the school is seventy-two years old.", verdict: "False", ev: "Đoạn văn viết người bắt đầu học lớn tuổi nhất “is eighty-two years old” — 82 tuổi, không phải 72.", ex: "False — người học lớn tuổi nhất 82 tuổi." },
        { stmt: "Teachers say children practise more regularly than adults.", verdict: "False", ev: "Đoạn văn viết người lớn “practise more regularly” — chính người lớn mới tập đều hơn.", ex: "False — giáo viên nói người lớn tập luyện đều đặn hơn trẻ em." },
        { stmt: "Evening classes for adults cost more than children's classes.", verdict: "Not Given", ev: "Đoạn văn không hề nhắc tới học phí của bất kỳ lớp nào.", ex: "Not Given — không có thông tin về học phí." },
        { stmt: "Some adult students later join the school orchestra.", verdict: "Not Given", ev: "Đoạn văn không nhắc tới dàn nhạc của trường hay việc học viên tham gia dàn nhạc.", ex: "Not Given — không có thông tin về dàn nhạc của trường." }
      ],
      detail: [
        { q: "What is the most popular instrument among adult beginners?", ans: "The piano", wrong: ["The guitar", "The violin", "The drums"], ex: "Đoạn văn: “The most popular instrument … is the piano”." },
        { q: "How long can new students borrow instruments from the school?", ans: "For the first three months", wrong: ["For one year", "For the first month", "For five years"], ex: "Đoạn văn: “borrow instruments … for the first three months”." }
      ],
      purpose: { ans: "Adults learning musical instruments at a music school", wrong: ["How children learn music", "The history of the piano", "Choosing an instrument to buy"] },
      blanks: [
        { sent: "The school offers ___ classes for adults.", ans: "evening", wrong: ["morning", "weekend", "online"], ex: "Đoạn văn: “offers evening classes for adults”." },
        { sent: "The most popular instrument among adult beginners is the ___.", ans: "piano", wrong: ["guitar", "violin", "drums"], ex: "Đoạn văn: “The most popular instrument … is the piano”." }
      ]
    }
  ];
  function fBTFNG() {
    var p = enPick(P2), s = enPick(p.stmts);
    var others = ["True", "False", "Not Given"].filter(function (v) { return v !== s.verdict; });
    var q = enMCQ("Đọc đoạn văn “" + p.title + "”, rồi xét mệnh đề sau:", s.verdict, others,
      s.ex + " Bằng chứng: " + s.ev, { visual: enPassage("<b>" + p.title + "</b><br>" + p.text) + '<div class="sentence" style="margin-top:8px">Mệnh đề: “' + s.stmt + '”</div>' });
    if (q) enId(q, p.title + "|" + s.stmt);
    return enTag(q, "fBTFNG", p.title);
  }
  function fBTFNGDetail() {
    var p = enPick(P2), d = enPick(p.detail);
    var q = enMCQ("Đọc đoạn văn và trả lời: " + d.q, d.ans, d.wrong, d.ex, { visual: enPassage("<b>" + p.title + "</b><br>" + p.text) });
    return enTag(q, "fBTFNGDetail", p.title);
  }
  function fBTFNGPurpose() {
    var p = enPick(P2);
    var q = enMCQ("Đoạn văn này chủ yếu nói về điều gì?", p.purpose.ans, p.purpose.wrong,
      "Ý chính của đoạn “" + p.title + "” là: " + p.purpose.ans + ". Các lựa chọn còn lại chỉ là một chi tiết nhỏ hoặc không có trong đoạn.", { visual: enPassage("<b>" + p.title + "</b><br>" + p.text) });
    if (q) enId(q, p.title + "|purpose");
    return enTag(q, "fBTFNGPurpose", p.title);
  }
  function fBTFNGBlank() {
    var p = enPick(P2), b = enPick(p.blanks);
    var q = enBlank("Hoàn thành câu theo đoạn văn “" + p.title + "”: " + b.sent, b.ans, b.wrong, b.ex,
      enPassage("<b>" + p.title + "</b><br>" + p.text));
    return enTag(q, "fBTFNGBlank", p.title);
  }

  /* ================= NGHE: 10 script mới × 3 câu + TF gộp ================= */
  var S2 = [
    {
      transcript: "A: The meeting has been moved from Room 3 to Room 5. B: Thanks. Is it still at two o'clock? A: Yes, but please bring the sales report with you.",
      qs: [
        { q: "Where will the meeting be held?", ans: "In Room 5", wrong: ["In Room 3", "In Room 2", "In the hall"], ex: "Cuộc họp được chuyển “from Room 3 to Room 5” — sang Phòng 5." },
        { q: "What should the woman bring?", ans: "The sales report", wrong: ["A laptop", "The new contract", "Coffee for everyone"], ex: "Người A dặn: “please bring the sales report with you”." },
        { q: "What is NOT mentioned about the meeting?", ans: "Who will lead the meeting", wrong: ["The room for the meeting", "The time of the meeting", "A document to bring"], ex: "Đoạn nghe nhắc phòng họp (Room 5), giờ họp (two o'clock) và tài liệu mang theo (sales report); không ai nhắc người chủ trì." }
      ],
      t: "Cuộc họp được chuyển sang Phòng 5.", exT: "Đúng. Cuộc họp chuyển từ Phòng 3 sang Phòng 5.",
      f: ["Cuộc họp bị lùi sang ba giờ.", "Người phụ nữ phải mang hợp đồng mới theo."],
      exF: ["Sai. Họp vẫn lúc hai giờ (still at two o'clock).", "Sai. Tài liệu cần mang là báo cáo bán hàng (sales report), không phải hợp đồng."]
    },
    {
      transcript: "A: Attention, please. The flight to Da Nang will now leave at four thirty instead of three fifteen. Passengers should wait at Gate 7.",
      qs: [
        { q: "When will the flight to Da Nang leave now?", ans: "At four thirty", wrong: ["At three fifteen", "At five thirty", "At four fifteen"], ex: "Thông báo đổi giờ bay thành “four thirty” thay vì “three fifteen”." },
        { q: "Where should passengers wait?", ans: "At Gate 7", wrong: ["At Gate 3", "At the check-in counter", "On the plane"], ex: "Thông báo dặn hành khách chờ ở “Gate 7”." },
        { q: "What is NOT mentioned in the announcement?", ans: "The reason for the delay", wrong: ["The new departure time", "The destination", "The gate number"], ex: "Thông báo có giờ bay mới, điểm đến (Da Nang) và số cổng (Gate 7); lý do chậm chuyến không được nhắc." }
      ],
      t: "Chuyến bay đi Đà Nẵng đổi giờ khởi hành sang bốn giờ ba mươi.", exT: "Đúng. Giờ bay mới là four thirty.",
      f: ["Chuyến bay đi Đà Nẵng đã bị huỷ.", "Hành khách phải chờ ở Cổng 3."],
      exF: ["Sai. Chuyến bay chỉ đổi giờ, không bị huỷ.", "Sai. Hành khách chờ ở Cổng 7 (Gate 7)."]
    },
    {
      transcript: "A: I would like to book a table for four people on Friday evening. B: Certainly. We have a table at seven or at eight thirty. A: Eight thirty is fine, please.",
      qs: [
        { q: "How many people is the table for?", ans: "Four people", wrong: ["Two people", "Five people", "Three people"], ex: "Người A đặt “a table for four people” — bàn cho bốn người." },
        { q: "What time did the man choose?", ans: "Eight thirty", wrong: ["Seven o'clock", "Seven thirty", "Nine o'clock"], ex: "Người A chọn “Eight thirty” trong hai giờ được gợi ý." },
        { q: "What is NOT mentioned in the conversation?", ans: "The name of the restaurant", wrong: ["The day of the booking", "The number of people", "The time of the table"], ex: "Hội thoại nhắc ngày (Friday), số người (four) và giờ (eight thirty); tên nhà hàng không hề xuất hiện." }
      ],
      t: "Người đàn ông đặt bàn cho bốn người vào tối thứ Sáu.", exT: "Đúng. Bàn đặt cho bốn người, tối thứ Sáu.",
      f: ["Bàn được đặt cho tối thứ Bảy.", "Người đàn ông chọn bàn lúc bảy giờ."],
      exF: ["Sai. Bàn đặt cho tối thứ Sáu (Friday evening).", "Sai. Anh ấy chọn tám giờ rưỡi (eight thirty)."]
    },
    {
      transcript: "A: Your package arrived this morning, Mr. Lee. B: Great. Can I pick it up now? A: Yes, but please bring your ID card.",
      qs: [
        { q: "What arrived this morning?", ans: "A package for Mr. Lee", wrong: ["A letter for Mr. Lee", "A new ID card", "A contract"], ex: "Người A nói: “Your package arrived this morning”." },
        { q: "What must Mr. Lee bring?", ans: "His ID card", wrong: ["His passport", "A pen", "His keys"], ex: "Người A dặn: “please bring your ID card”." },
        { q: "What is NOT mentioned in the conversation?", ans: "The contents of the package", wrong: ["When the package arrived", "What Mr. Lee must bring", "Who the package is for"], ex: "Hội thoại nhắc thời điểm bưu phẩm đến, thứ ông Lee phải mang và người nhận; bên trong bưu phẩm có gì thì không nói." }
      ],
      t: "Bưu phẩm của ông Lee đến vào sáng nay.", exT: "Đúng. Bưu phẩm đến sáng nay (arrived this morning).",
      f: ["Ông Lee phải mang hộ chiếu để nhận bưu phẩm.", "Bưu phẩm đến vào chiều hôm qua."],
      exF: ["Sai. Ông Lee phải mang thẻ căn cước (ID card).", "Sai. Bưu phẩm đến SÁNG NAY, không phải chiều hôm qua."]
    },
    {
      transcript: "A: The office will be closed next Monday for a public holiday. B: Will we still get paid for that day? A: Yes, it is a paid holiday for all staff.",
      qs: [
        { q: "Why will the office be closed next Monday?", ans: "Because of a public holiday", wrong: ["For repairs", "For a staff party", "Because of bad weather"], ex: "Văn phòng đóng cửa “for a public holiday” — vì ngày lễ." },
        { q: "Will staff be paid for the holiday?", ans: "Yes, all staff will be paid", wrong: ["No, nobody will be paid", "Only managers will be paid", "Only full-time staff"], ex: "Người A khẳng định: “it is a paid holiday for all staff”." },
        { q: "What is NOT mentioned in the conversation?", ans: "What staff should do on the holiday", wrong: ["The day the office closes", "The reason for closing", "Whether staff are paid"], ex: "Hội thoại nhắc ngày đóng cửa, lý do và việc trả lương; không ai nói nhân viên nên làm gì vào ngày lễ." }
      ],
      t: "Văn phòng đóng cửa thứ Hai tới vì ngày lễ.", exT: "Đúng. Đóng cửa “next Monday for a public holiday”.",
      f: ["Nhân viên không được trả lương cho ngày lễ đó.", "Văn phòng đóng cửa vào thứ Ba tới."],
      exF: ["Sai. Đó là ngày lễ CÓ lương cho mọi nhân viên.", "Sai. Văn phòng đóng cửa vào thứ HAI, không phải thứ Ba."]
    },
    {
      transcript: "A: Excuse me, the printer on the second floor is broken again. B: I will send a technician this afternoon. A: Thank you. We need it for the reports tomorrow.",
      qs: [
        { q: "What is broken?", ans: "The printer on the second floor", wrong: ["The computer on the second floor", "The printer on the first floor", "The lift"], ex: "Người A báo: “the printer on the second floor is broken”." },
        { q: "When will the technician come?", ans: "This afternoon", wrong: ["Tomorrow morning", "Next week", "This evening"], ex: "Người B nói sẽ cử kỹ thuật viên đến “this afternoon”." },
        { q: "What is NOT mentioned in the conversation?", ans: "The brand of the printer", wrong: ["The floor with the problem", "When help will come", "Why the printer is needed"], ex: "Hội thoại nhắc tầng có máy hỏng, lúc kỹ thuật viên đến và lý do cần máy in (báo cáo ngày mai); hãng máy in không được nhắc." }
      ],
      t: "Máy in ở tầng hai lại bị hỏng.", exT: "Đúng. “The printer on the second floor is broken again.”",
      f: ["Kỹ thuật viên sẽ đến vào sáng mai.", "Máy in cần cho báo cáo của tuần sau."],
      exF: ["Sai. Kỹ thuật viên đến CHIỀU NAY (this afternoon).", "Sai. Báo cáo cần vào NGÀY MAI (tomorrow)."]
    },
    {
      transcript: "A: We have sold all the blue shirts. B: When will new ones arrive? A: The new stock comes on Thursday, and the red ones are on sale today.",
      qs: [
        { q: "Which shirts are sold out?", ans: "The blue shirts", wrong: ["The red shirts", "The black shirts", "All the shirts"], ex: "Người A nói đã bán hết “all the blue shirts”." },
        { q: "What is on sale today?", ans: "The red shirts", wrong: ["The blue shirts", "The new stock", "Shoes and bags"], ex: "Người A nói: “the red ones are on sale today”." },
        { q: "What is NOT mentioned in the conversation?", ans: "The price of the shirts", wrong: ["The colour sold out", "When new stock arrives", "What is on sale"], ex: "Hội thoại nhắc màu áo hết hàng, ngày hàng mới về và áo đang giảm giá; giá áo không được nhắc." }
      ],
      t: "Áo sơ mi xanh đã bán hết.", exT: "Đúng. “We have sold all the blue shirts.”",
      f: ["Hàng mới sẽ về vào thứ Ba.", "Áo đỏ cũng đã bán hết."],
      exF: ["Sai. Hàng mới về vào thứ Năm (on Thursday).", "Sai. Áo đỏ đang GIẢM GIÁ hôm nay, chưa hết hàng."]
    },
    {
      transcript: "A: Your interview is confirmed for Wednesday at ten. Please come to the fifth floor and ask for Ms. Grant. B: Thank you. Should I bring my CV? A: Yes, and two photos, please.",
      qs: [
        { q: "When is the interview?", ans: "On Wednesday at ten", wrong: ["On Tuesday at ten", "On Wednesday at two", "Next Monday"], ex: "Cuộc phỏng vấn được xác nhận “for Wednesday at ten”." },
        { q: "Who should the candidate ask for?", ans: "Ms. Grant", wrong: ["Mr. Grant", "Ms. Green", "The manager"], ex: "Người A dặn: “ask for Ms. Grant”." },
        { q: "What is NOT mentioned in the conversation?", ans: "The salary for the job", wrong: ["The day of the interview", "The floor to go to", "Things to bring"], ex: "Hội thoại nhắc ngày phỏng vấn, tầng cần đến và đồ mang theo (CV, hai ảnh); mức lương không được nhắc." }
      ],
      t: "Buổi phỏng vấn diễn ra vào thứ Tư lúc mười giờ.", exT: "Đúng. Phỏng vấn “Wednesday at ten”.",
      f: ["Ứng viên phải đến tầng ba.", "Ứng viên không cần mang CV."],
      exF: ["Sai. Ứng viên đến tầng NĂM (the fifth floor).", "Sai. Ứng viên được dặn mang CV và hai tấm ảnh."]
    },
    {
      transcript: "A: Announcement: The library will open one hour later tomorrow, at ten o'clock, because of staff training. It will close at the usual time, nine in the evening.",
      qs: [
        { q: "What time will the library open tomorrow?", ans: "At ten o'clock", wrong: ["At nine o'clock", "At eleven o'clock", "At eight o'clock"], ex: "Thông báo: ngày mai thư viện mở cửa “at ten o'clock”." },
        { q: "Why will it open later?", ans: "Because of staff training", wrong: ["Because of repairs", "Because of a holiday", "Because of an exam"], ex: "Lý do mở muộn là “because of staff training”." },
        { q: "What is NOT mentioned in the announcement?", ans: "The number of books in the library", wrong: ["The opening time tomorrow", "The closing time", "The reason for opening late"], ex: "Thông báo có giờ mở cửa ngày mai, giờ đóng cửa và lý do mở muộn; số lượng sách không được nhắc." }
      ],
      t: "Ngày mai thư viện mở cửa muộn hơn một giờ vì đào tạo nhân viên.", exT: "Đúng. Mở muộn một giờ “because of staff training”.",
      f: ["Thư viện sẽ đóng cửa sớm hơn thường lệ vào ngày mai.", "Buổi đào tạo nhân viên diễn ra lúc chín giờ tối."],
      exF: ["Sai. Thư viện đóng cửa giờ THƯỜNG LỆ (the usual time).", "Sai. Chín giờ tối là giờ ĐÓNG CỬA, không phải giờ đào tạo."]
    },
    {
      transcript: "A: I need two train tickets to Hue for Saturday morning, please. B: The nine o'clock train is full, but there are seats on the eleven o'clock train. A: That is fine. Two tickets, please.",
      qs: [
        { q: "Where does the man want to go?", ans: "To Hue", wrong: ["To Hanoi", "To Da Nang", "To Ha Long"], ex: "Người A cần “two train tickets to Hue”." },
        { q: "Why can't he take the nine o'clock train?", ans: "It is full", wrong: ["It is cancelled", "It is too expensive", "It leaves too early"], ex: "Người B nói chuyến chín giờ “is full” — đã hết chỗ." },
        { q: "What is NOT mentioned in the conversation?", ans: "The price of the tickets", wrong: ["The destination", "The day of travel", "The train he will take"], ex: "Hội thoại nhắc điểm đến (Hue), ngày đi (Saturday) và chuyến tàu sẽ đi (eleven o'clock); giá vé không được nhắc." }
      ],
      t: "Người đàn ông mua hai vé tàu đi Huế.", exT: "Đúng. Anh ấy mua “two train tickets to Hue”.",
      f: ["Chuyến tàu chín giờ đã bị huỷ.", "Người đàn ông đi tàu vào sáng Chủ nhật."],
      exF: ["Sai. Chuyến chín giờ chỉ HẾT CHỖ (full), không bị huỷ.", "Sai. Chuyến đi vào sáng thứ Bảy (Saturday morning)."]
    },
    {
      transcript: "A: Good afternoon, City Hotel. How can I help you? B: Hello, I booked a double room for this Friday, but I need to change it to Saturday. A: That is fine. The price is the same. Would you like breakfast included? B: Yes, please, for two people.",
      qs: [
        { q: "What does the guest want to change?", ans: "The day of the booking", wrong: ["The size of the room", "The price of the room", "The name on the booking"], ex: "Khách đã đặt phòng cho thứ Sáu nhưng cần đổi sang thứ Bảy: “I need to change it to Saturday”." },
        { q: "What will the guest have at the hotel?", ans: "Breakfast for two people", wrong: ["Dinner for two people", "Breakfast for one person", "A room with a sea view"], ex: "Khách đồng ý thêm bữa sáng: “Yes, please, for two people”." },
        { q: "What is NOT mentioned in the conversation?", ans: "How the guest will pay", wrong: ["The day of the booking", "The price of the room", "Breakfast at the hotel"], ex: "Hội thoại nhắc ngày đặt phòng, giá phòng (không đổi) và bữa sáng; cách thanh toán không được nhắc." }
      ],
      t: "Khách đổi ngày đặt phòng từ thứ Sáu sang thứ Bảy.", exT: "Đúng. Khách đổi đặt phòng “to Saturday”.",
      f: ["Khách đặt một phòng đơn cho một người.", "Giá phòng vào thứ Bảy cao hơn thứ Sáu."],
      exF: ["Sai. Khách đặt phòng ĐÔI (double room) cho hai người.", "Sai. Giá không đổi: “The price is the same.”"]
    },
    {
      transcript: "A: Attention, please. The train to Hai Phong, planned for platform 2, will now leave from platform 4. The departure time is unchanged: six forty-five. We are sorry for the change.",
      qs: [
        { q: "Which platform will the train leave from now?", ans: "Platform 4", wrong: ["Platform 2", "Platform 6", "Platform 1"], ex: "Thông báo đổi sân ga: “will now leave from platform 4”." },
        { q: "What time does the train leave?", ans: "At six forty-five", wrong: ["At six fifteen", "At seven forty-five", "At six thirty"], ex: "Giờ khởi hành không đổi: “six forty-five”." },
        { q: "What is NOT mentioned in the announcement?", ans: "The reason for the platform change", wrong: ["The new platform", "The destination", "The departure time"], ex: "Thông báo có sân ga mới, điểm đến (Hai Phong) và giờ đi; lý do đổi sân ga không được nói." }
      ],
      t: "Tàu đi Hải Phòng đổi sang sân ga số 4.", exT: "Đúng. Tàu rời ga từ “platform 4”.",
      f: ["Tàu đi Hải Phòng bị hoãn một giờ.", "Tàu sẽ rời ga lúc sáu giờ mười lăm."],
      exF: ["Sai. Tàu chỉ đổi sân ga, giờ đi KHÔNG đổi.", "Sai. Tàu đi lúc sáu giờ bốn mươi lăm (six forty-five)."]
    },
    {
      transcript: "A: There will be a fire drill on Friday at ten o'clock. B: Do we need to bring anything? A: No, just leave your bags in the office and use the stairs, not the lift.",
      qs: [
        { q: "When is the fire drill?", ans: "On Friday at ten o'clock", wrong: ["On Friday at two o'clock", "On Thursday at ten o'clock", "Next Monday morning"], ex: "Buổi diễn tập diễn ra “on Friday at ten o'clock”." },
        { q: "What must staff NOT use during the drill?", ans: "The lift", wrong: ["The stairs", "The main door", "The fire alarm"], ex: "Hướng dẫn nói rõ: “use the stairs, not the lift” — dùng thang bộ, không dùng thang máy." },
        { q: "Where should staff leave their bags?", ans: "In the office", wrong: ["By the stairs", "In the lift", "At the entrance"], ex: "Nhân viên được dặn “leave your bags in the office” — để túi lại trong văn phòng." }
      ],
      t: "Buổi diễn tập phòng cháy diễn ra thứ Sáu lúc mười giờ.", exT: "Đúng. Diễn tập “on Friday at ten o'clock”.",
      f: ["Nhân viên phải mang theo túi khi sơ tán.", "Nhân viên nên dùng thang máy để xuống nhanh hơn."],
      exF: ["Sai. Túi phải để LẠI trong văn phòng.", "Sai. Phải dùng thang BỘ (the stairs), không dùng thang máy."]
    },
    {
      transcript: "A: Welcome to the City Museum. Today's guided tour starts in ten minutes, at eleven o'clock, by the main entrance. The tour is free for students with a student card. Please note that photography is not allowed in the painting rooms.",
      qs: [
        { q: "Where does the tour start?", ans: "By the main entrance", wrong: ["In the painting rooms", "At the ticket office", "In the museum garden"], ex: "Chuyến tham quan bắt đầu “by the main entrance” — cạnh cổng chính." },
        { q: "Who can join the tour for free?", ans: "Students with a student card", wrong: ["All visitors", "Children under ten", "Teachers only"], ex: "Thông báo: tour “free for students with a student card” — miễn phí cho sinh viên có thẻ." },
        { q: "What is NOT allowed in the painting rooms?", ans: "Taking photographs", wrong: ["Talking quietly", "Carrying small bags", "Walking in groups"], ex: "Thông báo cấm chụp ảnh trong phòng tranh: “photography is not allowed”." }
      ],
      t: "Chuyến tham quan có hướng dẫn bắt đầu lúc mười một giờ.", exT: "Đúng. Tour bắt đầu “at eleven o'clock”.",
      f: ["Chuyến tham quan bắt đầu ở phòng tranh.", "Mọi du khách đều được tham quan miễn phí."],
      exF: ["Sai. Điểm bắt đầu là cổng chính (main entrance).", "Sai. Chỉ sinh viên có thẻ sinh viên mới được miễn phí."]
    },
    {
      transcript: "A: Hello, this is Green Garden Shop. Your order of five rose bushes is ready for collection. We are open until eight in the evening. Please collect your order before Saturday, as we cannot keep the plants after that.",
      qs: [
        { q: "What is ready for collection?", ans: "Five rose bushes", wrong: ["Five apple trees", "Fifty rose bushes", "A garden table"], ex: "Tin nhắn nói “your order of five rose bushes is ready” — năm bụi hoa hồng đã sẵn sàng." },
        { q: "Until what time is the shop open?", ans: "Until eight in the evening", wrong: ["Until six in the evening", "Until eight in the morning", "Until nine in the evening"], ex: "Cửa hàng mở “until eight in the evening” — đến tám giờ tối." },
        { q: "By when must the customer collect the order?", ans: "Before Saturday", wrong: ["After Saturday", "Next Monday", "Any time next week"], ex: "Khách phải lấy hàng “before Saturday” — trước thứ Bảy, vì tiệm không giữ cây sau đó." }
      ],
      t: "Đơn hàng năm bụi hoa hồng đã sẵn sàng để khách đến lấy.", exT: "Đúng. “Your order of five rose bushes is ready for collection.”",
      f: ["Cửa hàng mở cửa đến chín giờ tối.", "Khách có thể lấy hàng vào tuần sau."],
      exF: ["Sai. Cửa hàng mở đến TÁM giờ tối.", "Sai. Phải lấy TRƯỚC thứ Bảy; cửa hàng không giữ cây sau ngày đó."]
    },
    {
      transcript: "A: Great news for cyclists! Our bike shop's spring sale starts tomorrow. All bicycles are reduced by twenty-five percent until the end of the month. During the sale, the shop will also open on Sunday mornings.",
      qs: [
        { q: "What is reduced by twenty-five percent?", ans: "All bicycles", wrong: ["All helmets", "All sports clothes", "All bike locks"], ex: "Thông báo: “All bicycles are reduced by twenty-five percent” — toàn bộ xe đạp giảm 25%." },
        { q: "How long does the sale last?", ans: "Until the end of the month", wrong: ["For one week", "Until tomorrow", "For three days"], ex: "Đợt giảm giá kéo dài “until the end of the month” — đến cuối tháng." },
        { q: "What changes during the sale?", ans: "The shop opens on Sunday mornings", wrong: ["The shop closes earlier", "The shop moves to a new street", "Prices go up on Sundays"], ex: "Trong đợt giảm giá, cửa hàng “will also open on Sunday mornings” — mở thêm sáng Chủ nhật." }
      ],
      t: "Xe đạp được giảm giá hai mươi lăm phần trăm đến cuối tháng.", exT: "Đúng. Xe đạp giảm 25% “until the end of the month”.",
      f: ["Đợt giảm giá bắt đầu từ hôm nay.", "Trong đợt giảm giá, cửa hàng đóng cửa vào Chủ nhật."],
      exF: ["Sai. Giảm giá bắt đầu NGÀY MAI (starts tomorrow).", "Sai. Cửa hàng MỞ cửa sáng Chủ nhật trong đợt giảm giá."]
    },
    {
      transcript: "A: I would like to join the evening English course. B: The next course begins on the first of September and lasts twelve weeks. A: How much is it? B: It is two million dong, and you can pay in two parts.",
      qs: [
        { q: "When does the next course begin?", ans: "On the first of September", wrong: ["On the first of October", "Next week", "On the twelfth of September"], ex: "Khoá tới bắt đầu “on the first of September” — ngày 1 tháng 9." },
        { q: "How long is the course?", ans: "Twelve weeks", wrong: ["Ten weeks", "Twelve months", "Two months"], ex: "Khoá học kéo dài “twelve weeks” — mười hai tuần." },
        { q: "How can the student pay for the course?", ans: "In two parts", wrong: ["By card only", "All at once only", "After the course ends"], ex: "Học viên “can pay in two parts” — có thể đóng học phí làm hai đợt." }
      ],
      t: "Khoá tiếng Anh buổi tối khai giảng ngày một tháng Chín.", exT: "Đúng. Khoá bắt đầu “on the first of September”.",
      f: ["Khoá học kéo dài mười hai tháng.", "Học viên phải đóng toàn bộ học phí trong một lần."],
      exF: ["Sai. Khoá kéo dài mười hai TUẦN (twelve weeks).", "Sai. Học phí có thể đóng làm hai đợt (in two parts)."]
    },
    {
      transcript: "A: Here is the traffic news. The bridge on River Road is closed this morning because of an accident. Buses to the airport are using Lake Street instead. Drivers should expect delays of about twenty minutes.",
      qs: [
        { q: "Why is the bridge closed?", ans: "Because of an accident", wrong: ["Because of road works", "Because of the weather", "Because of a sports event"], ex: "Bản tin nói cầu đóng “because of an accident” — vì một vụ tai nạn." },
        { q: "Which street are airport buses using?", ans: "Lake Street", wrong: ["River Road", "Bridge Street", "Station Road"], ex: "Xe buýt đi sân bay chuyển sang “Lake Street”." },
        { q: "How long are the delays?", ans: "About twenty minutes", wrong: ["About ten minutes", "About two hours", "There are no delays"], ex: "Tài xế nên dự trù chậm “about twenty minutes” — khoảng hai mươi phút." }
      ],
      t: "Cây cầu trên đường River Road đóng cửa sáng nay vì tai nạn.", exT: "Đúng. Cầu đóng “because of an accident”.",
      f: ["Xe buýt đi sân bay vẫn đi qua cầu như thường lệ.", "Tài xế nên dự trù chậm khoảng hai giờ."],
      exF: ["Sai. Xe buýt chuyển sang đường Lake Street.", "Sai. Thời gian chậm chỉ khoảng hai mươi phút."]
    },
    {
      transcript: "A: Excuse me, I ordered the chicken soup, but this is tomato soup. B: I am very sorry. I will bring the chicken soup right away. A: Thank you. And could I have some more bread, please? B: Of course.",
      qs: [
        { q: "What is the problem with the order?", ans: "The wrong soup was served", wrong: ["The soup is cold", "The soup is too salty", "The bill is wrong"], ex: "Khách gọi súp gà nhưng nhà hàng mang súp cà chua: “I ordered the chicken soup, but this is tomato soup”." },
        { q: "What else does the customer ask for?", ans: "Some more bread", wrong: ["A glass of water", "The bill", "A spoon"], ex: "Khách xin thêm bánh mì: “could I have some more bread, please?”." },
        { q: "What is NOT mentioned in the conversation?", ans: "The price of the soup", wrong: ["The wrong dish", "The extra bread", "The waiter's apology"], ex: "Hội thoại nhắc món mang nhầm, bánh mì xin thêm và lời xin lỗi của phục vụ; giá món súp không được nhắc." }
      ],
      t: "Nhà hàng mang nhầm món súp cho khách.", exT: "Đúng. Khách gọi súp gà nhưng nhận súp cà chua.",
      f: ["Khách xin thêm một ly nước.", "Khách yêu cầu tính tiền ngay."],
      exF: ["Sai. Khách xin thêm BÁNH MÌ (some more bread).", "Sai. Khách không hề nhắc tới hoá đơn."]
    },
    {
      transcript: "A: The yoga class on Wednesday evening has a new teacher. B: Is it at the same time? A: Yes, from six to seven, in Studio B. Please remember to book your place online before Tuesday.",
      qs: [
        { q: "What is new about the Wednesday yoga class?", ans: "It has a new teacher", wrong: ["It has a new time", "It is in a new studio", "It is free this week"], ex: "Thông tin mới là lớp “has a new teacher” — có giáo viên mới." },
        { q: "Where is the class held?", ans: "In Studio B", wrong: ["In Studio A", "In the main hall", "Online at home"], ex: "Lớp học diễn ra “in Studio B”." },
        { q: "By when must students book a place?", ans: "Before Tuesday", wrong: ["Before Wednesday", "On Monday morning", "At the class itself"], ex: "Học viên phải đặt chỗ trực tuyến “before Tuesday” — trước thứ Ba." }
      ],
      t: "Lớp yoga tối thứ Tư có giáo viên mới.", exT: "Đúng. Lớp “has a new teacher”.",
      f: ["Lớp yoga chuyển sang Studio A.", "Học viên đặt chỗ trực tiếp tại lớp vào thứ Tư."],
      exF: ["Sai. Lớp vẫn học ở Studio B.", "Sai. Phải đặt chỗ TRỰC TUYẾN trước thứ Ba."]
    }
  ];
  function fBListenScript() {
    var s = enPick(S2), d = enPick(s.qs);
    var q = enMCQ("Nghe đoạn hội thoại/thông báo rồi trả lời: " + d.q, d.ans, d.wrong, d.ex, { visual: enListenVisual(s.transcript) });
    if (q) enId(q, s.transcript + "|" + d.q);
    return enTag(q, "fBListenScript", d.q);
  }
  function fBListenTF() {
    for (var tries = 0; tries < 30; tries++) {
      var picks = enShuffle(S2).slice(0, 3);
      var rounds = [
        { s: picks[0], stmt: picks[0].t, truth: true, ex: picks[0].exT },
        { s: picks[1], stmt: picks[1].f[0], truth: false, ex: picks[1].exF[0] },
        { s: picks[2], stmt: picks[2].f[1], truth: false, ex: picks[2].exF[1] }
      ];
      rounds = enShuffle(rounds);
      var r = rounds.map(function (x) {
        return { stmt: enListenVisual(x.s.transcript) + x.stmt, truth: x.truth, explain: x.ex };
      });
      var q = enTF(r, "Nghe từng đoạn, rồi phán đoán mệnh đề đúng hay sai.");
      if (q) enId(q, "tfpool|" + rounds.map(function (x) { return x.stmt; }).join("|"));
      return enTag(q, "fBListenTF", "pool");
    }
    return null;
  }

  /* ================= QRESP: 30 cặp hỏi–đáp mới ================= */
  var Q2 = [
    { qline: "Where is the bank?", ans: "It is opposite the post office.", wrong: ["It opens at eight.", "Mr. Long works there.", "You can save money there."], ex: "“Where” hỏi vị trí: ngân hàng ở đối diện bưu điện (opposite the post office)." },
    { qline: "When does the course start?", ans: "It starts next Monday.", wrong: ["It lasts ten weeks.", "It is about computers.", "Twenty students joined it."], ex: "“When” cần mốc thời gian: khoá học bắt đầu thứ Hai tới." },
    { qline: "Who will lead the meeting?", ans: "The sales manager will.", wrong: ["It is in Room 5.", "It begins at two.", "About ten people will come."], ex: "“Who” cần chỉ NGƯỜI: trưởng phòng kinh doanh sẽ chủ trì." },
    { qline: "How much is the ticket?", ans: "It is fifteen dollars.", wrong: ["The train is fast.", "You can buy it online.", "It leaves at nine."], ex: "“How much” hỏi giá: đáp án phải là số tiền — mười lăm đô-la." },
    { qline: "How long is the break?", ans: "Fifteen minutes.", wrong: ["At twelve o'clock.", "In the staff room.", "Everyone is tired."], ex: "“How long” hỏi độ dài thời gian: giờ nghỉ kéo dài mười lăm phút." },
    { qline: "Why did you stay home?", ans: "Because I was sick.", wrong: ["I stayed with my sister.", "For two days.", "My house is near here."], ex: "“Why” cần lý do bắt đầu bằng “Because…”: vì bị ốm." },
    { qline: "Did you enjoy the trip?", ans: "Yes, it was wonderful.", wrong: ["The trip took three days.", "We went by bus.", "My friend organized it."], ex: "Câu hỏi Yes/No về cảm nhận: đáp án khẳng định “Yes, it was wonderful.”" },
    { qline: "Can you help me with this box?", ans: "Of course, give it to me.", wrong: ["The box is heavy.", "It is on the table.", "Mr. Hai bought it."], ex: "Lời nhờ giúp đỡ được đáp nhận lời: “Of course, give it to me.”" },
    { qline: "What is your new address?", ans: "It is 25 Le Loi Street.", wrong: ["I moved last month.", "My house has three rooms.", "I live with my family."], ex: "Hỏi địa chỉ thì đáp án là địa chỉ cụ thể: 25 đường Lê Lợi." },
    { qline: "How often does the bus come?", ans: "Every twenty minutes.", wrong: ["The bus is yellow.", "It stops near the school.", "Many students take it."], ex: "“How often” hỏi tần suất: xe buýt đến mỗi hai mươi phút." },
    { qline: "Would you like some tea?", ans: "Yes, please. That is kind.", wrong: ["The tea is hot.", "She made it this morning.", "Tea is popular here."], ex: "Lời mời “Would you like…” được đáp nhận lời lịch sự: “Yes, please.”" },
    { qline: "Where did you buy that hat?", ans: "At the market near my house.", wrong: ["It cost ten dollars.", "I bought it last week.", "It looks good on you."], ex: "“Where” cần nơi mua: ở chợ gần nhà." },
    { qline: "When is the deadline?", ans: "It is this Friday.", wrong: ["The report is long.", "Ms. Chi will check it.", "We work in teams."], ex: "Hỏi hạn chót cần mốc thời gian: thứ Sáu này." },
    { qline: "How many rooms does the hotel have?", ans: "It has eighty rooms.", wrong: ["It is near the beach.", "It opened last year.", "The rooms are large."], ex: "“How many rooms” cần con số: khách sạn có tám mươi phòng." },
    { qline: "Is there a pharmacy near here?", ans: "Yes, just around the corner.", wrong: ["I need some medicine.", "The doctor is busy.", "It sells many things."], ex: "Câu hỏi Yes/No về sự tồn tại: đáp án khẳng định kèm vị trí — ngay góc đường." },
    { qline: "What time is the last train?", ans: "It leaves at eleven thirty.", wrong: ["The station is far.", "Tickets are cheap today.", "Mr. Son takes it daily."], ex: "“What time” cần giờ cụ thể: chuyến cuối rời ga lúc mười một giờ rưỡi." },
    { qline: "Who wrote this report?", ans: "Our team leader did.", wrong: ["It is about sales.", "It was finished yesterday.", "It has ten pages."], ex: "“Who” cần chỉ người viết: trưởng nhóm." },
    { qline: "Why is the shop closed?", ans: "Because the owner is on holiday.", wrong: ["It closes at nine.", "It is on Nguyen Trai Street.", "It sells fruit."], ex: "“Why” cần lý do: chủ cửa hàng đang đi nghỉ." },
    { qline: "How do you go to work?", ans: "I take the bus every day.", wrong: ["My office is downtown.", "I start at eight.", "Work finishes at five."], ex: "“How do you go” hỏi phương tiện/cách đi: đáp án là đi xe buýt." },
    { qline: "Did the package arrive?", ans: "Yes, it came this morning.", wrong: ["The package is large.", "Mr. Lee sent it.", "It contains books."], ex: "Câu hỏi Yes/No ở quá khứ: đáp án khẳng định kèm thời điểm đến." },
    { qline: "Where shall we meet?", ans: "In front of the cinema.", wrong: ["At seven o'clock.", "With our classmates.", "By motorbike."], ex: "“Where shall we meet” cần địa điểm hẹn: trước rạp chiếu phim. “At seven” trả lời cho câu hỏi When." },
    { qline: "How much time do we have?", ans: "About half an hour.", wrong: ["The clock is broken.", "We meet at noon.", "Time flies quickly."], ex: "“How much time” hỏi lượng thời gian: khoảng nửa giờ." },
    { qline: "What would you like for lunch?", ans: "I would like a bowl of noodle soup.", wrong: ["Lunch is at twelve.", "The canteen is upstairs.", "She cooks very well."], ex: "Hỏi muốn ăn gì: đáp án nêu món — một bát phở (noodle soup)." },
    { qline: "Can I pay by card?", ans: "Yes, we accept all cards.", wrong: ["The card is new.", "Prices are low here.", "Mr. Tam pays cash."], ex: "Câu hỏi xin phép Yes/No: đáp án khẳng định “Yes, we accept all cards.”" },
    { qline: "When will you visit us?", ans: "I will come next month.", wrong: ["I will bring gifts.", "Your town is beautiful.", "I miss you all."], ex: "“When” cần mốc thời gian tương lai: tháng sau." },
    { qline: "Who is speaking, please?", ans: "This is Anna from the sales team.", wrong: ["I will call later.", "The phone is ringing.", "She is in a meeting."], ex: "Hỏi người đang gọi điện: đáp án tự giới thiệu tên và bộ phận." },
    { qline: "How was the exam?", ans: "It was quite difficult.", wrong: ["It lasted two hours.", "It was in Room 12.", "Ten students took it."], ex: "“How was…” hỏi cảm nhận/đánh giá: bài thi khá khó." },
    { qline: "Where are the keys?", ans: "They are in the top drawer.", wrong: ["The keys are old.", "Mr. Duc lost them.", "We need them today."], ex: "“Where” cần vị trí: chìa khoá ở trong ngăn kéo trên cùng." },
    { qline: "Would you like to work on Saturday?", ans: "I am sorry, I have a family trip.", wrong: ["Saturday is a busy day.", "The office opens at nine.", "He works every Saturday."], ex: "Lời đề nghị bị từ chối lịch sự kèm lý do: có chuyến đi gia đình." },
    { qline: "How many pages is the report?", ans: "It is twelve pages long.", wrong: ["Ms. Hoa wrote it.", "It is about the new project.", "It was sent yesterday."], ex: "“How many pages” cần con số: báo cáo dài mười hai trang." }
  ];
  function fBListenResp() {
    var e = enPick(Q2);
    var q = enMCQ("Nghe câu hỏi rồi chọn câu đáp đúng nhất.", e.ans, e.wrong, e.ex, { visual: enListenVisual(e.qline) });
    if (q) enId(q, e.qline);
    return enTag(q, "fBListenResp", e.qline);
  }

  /* ---- Đẩy thêm bộ sinh vào pools của 2 chủ đề ---- */
  var t4 = topic("cd-en-thpt-tfng");
  if (t4) {
    t4.pools.choose.push(fBTFNG, fBTFNGDetail, fBTFNGPurpose);
    t4.pools.blank.push(fBTFNGBlank);
  }
  var t5 = topic("cd-en-thpt-listen");
  if (t5) {
    t5.pools.choose.push(fBListenScript, fBListenResp);
    t5.pools.games.push(fBListenTF);
  }
})();
/* ================================================================
   CHUYÊN ĐỀ TIẾNG ANH LUYỆN THI — PHẦN LÕI CUỐI (đăng ký Kiến thức,
   móc ngữ cảnh Ôn câu sai dạng xích, nút Hiện chữ, màn hình nhánh,
   phơi window.__EN)
   Đây là đoạn cuối của assets/data/tienganh.js sau khi lắp ráp.
   ================================================================ */
(function () {
  var BANDS = window.__EN_BANDS || [];
  var EN_SUBJ = { id: "chuyende", name: "🌍 Tiếng Anh luyện thi", emoji: "🌍", desc: "Tiếng Anh luyện thi", cls: "", topics: [] };
  BANDS.forEach(function (b) { (b.topics || []).forEach(function (t) { EN_SUBJ.topics.push(t); }); });

  function findTopic(id) {
    for (var i = 0; i < EN_SUBJ.topics.length; i++) if (EN_SUBJ.topics[i].id === id) return EN_SUBJ.topics[i];
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
  EN_SUBJ.topics.forEach(function (t) {
    var k = t.knowledge || {};
    t.knowledge = {
      facts: (k.facts || []).map(function (f) { return { q: f.q, a: f.a, ex: f.ex || "", visual: f.visual || "" }; }),
      pairs: k.pairs || [],
      grade: (bandOf(t) || { grades: [3] }).grades[0],
      subject: "Tiếng Anh luyện thi"
    };
    if (k.notes && k.notes.length) mn[t.id] = k.notes.slice();
  });

  /* --- Móc ngữ cảnh cho A1 (Ôn câu sai) — dạng XÍCH NỐI như chuyende.js v12:
     tra chủ đề Anh trước; không khớp thì uỷ quyền handler đã đăng ký trước
     (chủ đề Toán), nên thứ tự nạp hai file thế nào cũng đúng. --- */
  var __prevEnCtx = window.__cdTopicContext;
  window.__cdTopicContext = function (parts) {
    try {
      if (parts && parts[1] === "chuyende") {
        var t = findTopic(parts[2]);
        if (t) return { grade: parseInt(parts[0], 10), subj: EN_SUBJ, topic: t };
      }
    } catch (e) {}
    return (typeof __prevEnCtx === "function") ? __prevEnCtx(parts) : null;
  };

  /* --- Nút "👁 Hiện chữ" của câu nghe: listener uỷ quyền ở document (khuôn
     A3) — bấm thì hiện transcript từ data-text vào span .en-transcript
     cùng khối .en-listen; bấm lần nữa thì ẩn. Hoạt động cả trong vòng chơi,
     Ôn câu sai và mọi màn hình dùng lại visual của câu. --- */
  if (!window.__enShowTextBound) {
    window.__enShowTextBound = true;
    document.addEventListener("click", function (ev) {
      var n = ev.target;
      while (n && n !== document) {
        if (n.classList && n.classList.contains("en-show-text")) {
          ev.preventDefault();
          ev.stopPropagation();
          var host = n.parentNode;
          var sp = host ? host.querySelector(".en-transcript") : null;
          if (sp) {
            if (sp.hidden) {
              if (!sp.textContent) sp.textContent = n.getAttribute("data-text") || "";
              sp.hidden = false;
              n.textContent = "🙈 Ẩn chữ";
            } else {
              sp.hidden = true;
              n.textContent = "👁 Hiện chữ";
            }
          }
          return;
        }
        n = n.parentNode;
      }
    }, true);
  }

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
    intro.textContent = "Luyện tiếng Anh theo khung thi quốc tế — mỗi câu đều có giải thích bằng tiếng Việt. Chọn một chủ đề để luyện nhé!";
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
      var grid = document.createElement("div");
      grid.className = "topic-grid";
      (band.topics || []).forEach(function (t) {
        var wrap = document.createElement("div");
        wrap.className = "topic-unit";
        var best = 0;
        try { if (typeof profile !== "undefined" && profile && profile.best) best = profile.best[g + "|chuyende|" + t.id] || 0; } catch (e) {}
        var card = document.createElement("button");
        card.className = "topic-card";
        card.innerHTML = '<span class="t-emoji">' + (t.emoji || "🌍") + '</span><span class="t-name">' + escT(t.name) + '</span><span class="t-sub">' + escT(t.sub || "") + "</span>" +
          (best ? '<span class="best-tag">⭐ Cao nhất: ' + best + "/10</span>" : "");
        card.addEventListener("click", function () { launchTopic(EN_SUBJ, t); });
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

  window.__EN = {
    bands: BANDS,
    subj: EN_SUBJ,
    findTopic: findTopic,
    render: render
  };
})();
