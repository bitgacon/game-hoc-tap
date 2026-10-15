/* ================================================================
   GAME HỌC TẬP — FILE DỮ LIỆU RIÊNG LỚP 1 (assets/data/lop1.js)
   Đăng kí Lớp 1 + các môn bổ sung + phần bổ sung Lớp 1 trong các block 6–9 của master.
   Tách nguyên văn từ bản master đã kiểm chứng (MD5 5f54145de040cb8cefc9eeb7cb915cd5);
   trang vỏ nạp động file này khi người chơi chọn Lớp 1.
   ================================================================ */
/* ---------- Tiếng Anh Lớp 1 dùng chung bảng từ UNITS + ALL_WORDS ở trang vỏ (hạ tầng engine Tiếng Anh của mọi lớp, đúng vị trí gốc trong master) ---------- */
/* ---------- Toán Lớp 1: bảng chủ đề MATH_TOPICS (gốc: block engine của master) ---------- */
    var MATH_TOPICS = [
      { id: "count10", emoji: "🍎", name: "Đếm số 0–10", sub: "Bài 1–6 • Các số từ 0 đến 10", gens: [qCount10, qCount10, qComparePics], blankGens: [qBlankSeqFactory(10), qBlankCalcFactory(10)], matchGens: [mNumCount, mNumReadFactory(10)], gameCtx: "10" },
      { id: "shapes", emoji: "🔷", name: "Hình phẳng", sub: "Bài 7–9 • Vuông, tròn, tam giác, chữ nhật", gens: [qShapeName, qShapePick], blankGens: [qBlankSides], matchGens: [mShapeName], gameCtx: "shapes" },
      { id: "addsub10", emoji: "➕", name: "Cộng trừ phạm vi 10", sub: "Bài 10–13 • Phép cộng, phép trừ", gens: [function () { return qAddSub10(true); }, function () { return qAddSub10(false); }], blankGens: [qBlankCalcFactory(10), qBlankSeqFactory(10)], matchGens: [mCalcResultFactory(10)], gameCtx: "10" },
      { id: "compare", emoji: "⚖️", name: "So sánh số", sub: "Nhiều hơn, ít hơn • Lớn hơn, bé hơn", gens: [qComparePics, function () { return qCompareNums(10); }, function () { return qCompareNums(100); }], blankGens: [qBlankSign, qBlankSeqFactory(10)], matchGens: [mNumReadFactory(99)], gameCtx: "10" },
      { id: "num100", emoji: "💯", name: "Số đến 100", sub: "Bài 21–24 • Số có hai chữ số", gens: [qBundles, qReadNum, qBundles], blankGens: [qBlankReadFactory(99), qBlankSeqFactory(99)], matchGens: [mNumReadFactory(99)], gameCtx: "100" },
      { id: "addsub100", emoji: "🧮", name: "Cộng trừ phạm vi 100", sub: "Bài 29–33 • Cộng, trừ không nhớ", gens: [function () { return qAddSub100(true); }, function () { return qAddSub100(false); }], blankGens: [qBlankCalcFactory(100)], matchGens: [mCalcResultFactory(100)], gameCtx: "100" },
      { id: "time", emoji: "🕐", name: "Giờ và lịch", sub: "Bài 34–37 • Xem giờ, các ngày trong tuần", gens: [qClock, qClock, qWeek], blankGens: [qBlankClock], matchGens: [mClockHour], gameCtx: "time" }
    ];
/* ---------- Đăng kí Lớp 1 (gốc: bảng GRADES của master) ---------- */
(function () {
  if (typeof GRADES !== "undefined" && GRADES && !GRADES[1]) {
    GRADES[1] = { label:"Lớp 1", subjects:[
        { id:"g1-math", emoji:"🔢", name:"Toán", desc:"Đếm số • Cộng trừ • Hình học • Giờ", cls:"c-coral", topics: MATH_TOPICS.map(function(t){ return { id:"g1-"+t.id, emoji:t.emoji, name:t.name, sub:t.sub, pools: mathPools(t) }; }) },
        { id:"g1-eng", emoji:"🔤", name:"Tiếng Anh", desc:"Global Success • 16 Unit", cls:"c-teal", topics: UNITS.map(function(u){ return { id:"g1-u"+u.n, letter:u.letter, name:"Unit "+u.n, sub:u.words.map(function(w){return w[0];}).join(" • "), pools: engPools(u.words) }; }).concat([{ id:"g1-review", emoji:"🌈", name:"Ôn tập tất cả", sub:"Trộn từ của cả 16 Unit", pools: engPools(ALL_WORDS) }]) }
      ]};
  }
})();

    "use strict";
    /* ================= LỚP 1 — CÁC MÔN BỔ SUNG (Kết nối tri thức) ================= */
    /* Nút nghe tiếng Việt + nút nghe nốt nhạc trong nội dung mới */
    document.addEventListener("click", function (e) {
      if (!e.target.closest) return;
      var bv = e.target.closest("[data-vi]");
      if (bv) { speakVi(bv.getAttribute("data-vi")); return; }
      var bn = e.target.closest("[data-note]");
      if (bn) { playNotes(bn.getAttribute("data-note")); }
    });
    function playNoteFreq(f, delay, dur, vol) {
      if (!audioSettings.voice && !audioSettings.sfx) return;
      try {
        var ctx = ensureAudio(); if (!ctx) return;
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "sine"; o.frequency.value = f;
        var t = ctx.currentTime + (delay || 0), d = dur || 0.6;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol || 0.22, t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(g); g.connect(ctx.destination);
        o.start(t); o.stop(t + d + 0.05);
      } catch (e) {}
    }
    function playNotes(spec) {
      String(spec).split(",").forEach(function (p, i) {
        var kv = p.split(":");
        playNoteFreq(parseFloat(kv[0]), i * 0.55, kv[1] ? parseFloat(kv[1]) : 0.6, kv[2] ? parseFloat(kv[2]) : 0.22);
      });
    }
    function viBtn(text, label) { return '<button class="speak-btn" data-vi="' + text + '" aria-label="Nghe đọc">' + (label || "🔊") + "</button>"; }
    function autoVi(text) { setTimeout(function () { speakVi(text); }, 420); }
    function optWord(t) { return { html: '<span class="opt-word">' + t + "</span>" }; }
    function optText(t) { return { html: '<span class="opt-text">' + t + "</span>" }; }
    function textBlankQ(prompt, visual, ans, wrongs) {
      var all = shuffle([ans].concat(wrongs));
      return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: prompt, visual: visual, blankText: String(ans),
        options: all.map(optText), answer: all.indexOf(ans), cols: 3, optStack: true };
    }

    /* ---------- TIẾNG VIỆT 1a: Chữ cái ---------- */
    var LETTERS1 = [["a","a"],["b","bờ"],["c","cờ"],["d","dờ"],["đ","đờ"],["e","e"],["ê","ê"],["g","gờ"],["h","hờ"],["i","i"],["k","ca"],["l","lờ"],["m","mờ"],["n","nờ"],["o","o"],["ô","ô"],["ơ","ơ"],["p","pờ"],["r","rờ"],["s","sờ"],["t","tờ"],["u","u"],["ư","ư"],["v","vờ"],["x","xờ"],["y","y"]];
    function letterDistractors(t, count) {
      var out = [], guard = 0;
      while (out.length < count && guard++ < 100) { var c = pick(LETTERS1); if (c[0] !== t[0] && out.indexOf(c) === -1) out.push(c); }
      return out;
    }
    function qListenLetter() {
      var t = pick(LETTERS1);
      var opts = shuffle([t].concat(letterDistractors(t, 2)));
      autoVi(t[1]);
      return { prompt: "Nghe âm rồi chạm vào chữ đúng nhé!", visual: viBtn(t[1]),
        options: opts.map(function (o) { return optWord(o[0]); }), answer: opts.indexOf(t), cols: 3 };
    }
    function qUpperLower() {
      var t = pick(LETTERS1);
      var opts = shuffle([t].concat(letterDistractors(t, 2)));
      return { prompt: "Chữ hoa này đi với chữ thường nào?", visual: '<div class="big-word">' + t[0].toUpperCase() + "</div>",
        options: opts.map(function (o) { return optWord(o[0]); }), answer: opts.indexOf(t), cols: 3 };
    }
    var START_WORDS = [["🐱","on mèo","c"],["🐶","on chó","c"],["🍎","uả táo","t"],["🐔","on gà","g"],["🌸","oa","h"],["🐟","on cá","c"],["🦆","on vịt","v"],["🌙","ặt trăng","m"]];
    function qBlankFirstLetter() {
      var w = pick(START_WORDS);
      var letters = shuffle([w[2]].concat([pick("bdfhlmnstvx".split("").filter(function (x) { return x !== w[2]; })), pick("bdfhlmnstvx".split("").filter(function (x) { return x !== w[2]; }))]));
      letters = letters.filter(function (x, i) { return letters.indexOf(x) === i; });
      while (letters.length < 3) { var L = pick("bdfhlmnstvx".split("")); if (letters.indexOf(L) === -1) letters.push(L); }
      return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền chữ cái đầu còn thiếu nhé!", blankText: w[2],
        visual: '<div class="big-pic">' + w[0] + '</div><div class="big-word">' + blankSlot() + w[1] + "</div>",
        options: letters.map(optWord), answer: letters.indexOf(w[2]), cols: 3 };
    }
    function letterPairs() {
      return shuffle(LETTERS1.slice()).slice(0, 4).map(function (t) { return { l: '<span class="match-word">' + t[0].toUpperCase() + "</span>", r: '<span class="match-word">' + t[0] + "</span>" }; });
    }
    function gMemLetters() { return memQ("Lật thẻ tìm cặp: chữ hoa và chữ thường!", letterPairs().map(function (p) { return { a: p.l, b: p.r }; })); }
    function gCatchLetter() {
      var t = pick(LETTERS1);
      var items = shuffle([t].concat(letterDistractors(t, 3)));
      return catchQ("Bắt chữ! Chạm vào chữ “" + t[0] + "” đang rơi nhé!", items.map(function (o) { return { html: '<span class="opt-word">' + o[0] + "</span>", ok: o === t }; }));
    }
    function gTFLetter() {
      var rounds = [];
      for (var k = 0; k < 3; k++) {
        var t = pick(LETTERS1), truth = Math.random() < 0.5;
        var shown = truth ? t : letterDistractors(t, 1)[0];
        rounds.push({ visual: '<div class="big-word">' + t[0].toUpperCase() + " — " + shown[0] + "</div>", truth: truth, explain: "Chữ hoa của “" + t[0] + "” là “" + t[0].toUpperCase() + "”" });
      }
      return tfQ("Đúng hay sai? Chữ hoa đi với chữ thường nhé!", rounds);
    }
    function gSortLetters1() {
      var pool = ["a","b","c","d","đ","e","ê","g","h","i","k","l","m","n","o","ô","ơ","p","r","s","t","u","ư","v","x","y"];
      var i = rand(0, pool.length - 4);
      return sortQ("Sắp xếp các chữ cái theo thứ tự bảng chữ cái nhé!", pool.slice(i, i + 4));
    }

    /* ---------- TIẾNG VIỆT 1a: Dấu thanh ---------- */
    var TONES1 = [
      { id: "sac", name: "dấu sắc", words: ["cá","má","lá","bé","chó"] },
      { id: "huyen", name: "dấu huyền", words: ["bà","nhà","gà","dừa","mè"] },
      { id: "hoi", name: "dấu hỏi", words: ["cỏ","mỏ","nhỏ","của","tỏ"] },
      { id: "nga", name: "dấu ngã", words: ["vẽ","cũng","sữa","ngã","mỡ"] },
      { id: "nang", name: "dấu nặng", words: ["một","bạn","học","vịt","đẹp"] },
      { id: "ngang", name: "không dấu", words: ["ba","me","ca","tre","bi"] }
    ];
    function qToneOfWord() {
      var t = pick(TONES1), w = pick(t.words);
      var others = shuffle(TONES1.filter(function (x) { return x.id !== t.id; })).slice(0, 2);
      var opts = shuffle([t].concat(others));
      return { prompt: "Tiếng này có dấu gì?", visual: '<div class="word-with-speak"><span class="big-word">' + w + '</span><button class="speak-btn small" data-vi="' + w + '" aria-label="Nghe đọc">🔊</button></div>',
        options: opts.map(function (o) { return optText(o.name); }), answer: opts.indexOf(t), cols: 3, optStack: true };
    }
    var TONE_FAM = [["ba","bá","bà","bả","bã","bạ"],["ma","má","mà","mả","mã","mạ"],["ca","cá","cà","cả","cã","cạ"],["bo","bó","bò","bỏ","bõ","bọ"]];
    function qListenToneWord() {
      var fam = pick(TONE_FAM);
      var target = pick(fam);
      var opts = shuffle(fam.filter(function (x) { return x !== target; })).slice(0, 2).concat([target]);
      opts = shuffle(opts);
      autoVi(target);
      return { prompt: "Nghe rồi chọn tiếng đúng nhé!", visual: viBtn(target),
        options: opts.map(optWord), answer: opts.indexOf(target), cols: 3 };
    }
    var TONE_BLANKS = [["bà","b","à","á"],["cá","c","á","à"],["cỏ","c","ỏ","ó"],["một","m","ột","ốt"],["vẽ","v","ẽ","é"],["bạn","b","ạn","án"]];
    function qBlankTone() {
      var w = pick(TONE_BLANKS);
      var third = pick(["ả","ã","ạ","ẻ","ẹ","ỉ","ị","ỏ","ọ","ủ","ụ"].filter(function (x) { return x !== w[2] && x !== w[3]; }));
      var opts = shuffle([w[2], w[3], third]);
      return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền phần có dấu còn thiếu để thành tiếng “" + w[0] + "” nhé!", blankText: w[2],
        visual: '<div class="big-word">' + w[1] + blankSlot() + "</div>",
        options: opts.map(optWord), answer: opts.indexOf(w[2]), cols: 3 };
    }
    function tonePairs() {
      return shuffle(TONES1.filter(function (t) { return t.id !== "ngang"; })).slice(0, 4).map(function (t) {
        return { l: '<span class="match-word">' + pick(t.words) + "</span>", r: '<span class="match-text">' + t.name + "</span>" };
      });
    }
    function gTFTone() {
      var rounds = [];
      for (var k = 0; k < 3; k++) {
        var t = pick(TONES1), w = pick(t.words), truth = Math.random() < 0.5;
        var shown = truth ? t : pick(TONES1.filter(function (x) { return x.id !== t.id; }));
        rounds.push({ visual: '<div class="big-word">' + w + '</div><div class="sentence">Tiếng “' + w + "” có " + shown.name + "</div>", truth: truth, explain: "Tiếng “" + w + "” có " + t.name });
      }
      return tfQ("Đúng hay sai? Nhìn dấu thanh nhé!", rounds);
    }

    /* ---------- TIẾNG VIỆT 1a: Vần + Ghép tiếng ---------- */
    var VAN1 = {
      "an": ["bàn","đàn","than","cạn"], "ăn": ["chăn","lăn","ăn","bắn"], "ân": ["cân","sân","gần","tân"],
      "on": ["con","ngon","tròn","lon"], "ôn": ["bốn","trốn","ôn","tôn"], "ơn": ["ơn","hơn","sơn","mơn"],
      "am": ["cam","làm","xám","tam"], "ăm": ["năm","nằm","tằm","cắm"], "âm": ["cầm","tâm","ấm","sâm"],
      "ai": ["tai","chai","mai","gai"], "ay": ["tay","bay","may","cay"], "oi": ["voi","soi","coi","giỏi"],
      "ôi": ["nồi","bôi","môi","xôi"], "ơi": ["bơi","chơi","rơi","mơi"], "ao": ["sao","chào","bao","cao"],
      "eo": ["mèo","leo","treo","keo"], "ac": ["bác","gác","thác","xác"], "ăc": ["mặc","bắc","tắc","cắc"],
      "oc": ["ngọc","học","đọc","sóc"], "ôc": ["gốc","tốc","mốc","cốc"], "at": ["hát","mát","cát","tát"],
      "ăt": ["mắt","bắt","cắt","tắt"], "ot": ["ngọt","hót","rót","mót"], "ôt": ["một","tốt","bột","cốt"],
      "ap": ["đạp","sáp","tháp","táp"], "ăp": ["cặp","gắp","bắp","cắp"], "anh": ["canh","nhanh","chanh","xanh"],
      "ach": ["sách","khách","vách","cách"], "ang": ["sáng","vàng","làng","càng"], "ăng": ["nắng","trăng","bằng","tăng"],
      "ong": ["ong","song","mong","trong"], "ông": ["ông","công","sông","không"], "iên": ["tiên","biển","liền","điện"],
      "iêu": ["nhiều","yêu","diều","liều"], "uôi": ["chuối","đuôi","tuổi","suối"], "uôn": ["muốn","luôn","cuộn","buôn"],
      "uông": ["chuông","buồng","ruộng","xuồng"], "oa": ["hoa","hoà","khoa","loa"], "oe": ["loe","khoe","xoè","hoe"],
      "oan": ["ngoan","xoan","toàn","soàn"]
    };
    var VAN_KEYS = Object.keys(VAN1);
    function qVanWord() {
      var v = pick(VAN_KEYS);
      var good = pick(VAN1[v]);
      var others = shuffle(VAN_KEYS.filter(function (x) { return x !== v; })).slice(0, 2).map(function (x) { return pick(VAN1[x]); });
      var opts = shuffle([good].concat(others));
      return { prompt: "Tiếng nào chứa vần “" + v + "”?", visual: '<div class="big-word">vần ' + v + "</div>",
        options: opts.map(optWord), answer: opts.indexOf(good), cols: 3 };
    }
    var COMPOSE1 = [["b","an","bàn"],["th","an","than"],["c","ân","cân"],["s","ân","sân"],["t","ay","tay"],["b","ay","bay"],["m","eo","mèo"],["s","ao","sao"],["b","ác","bác"],["g","ác","gác"],["m","ắt","mắt"],["s","ách","sách"],["c","anh","canh"],["h","oa","hoa"],["ng","oan","ngoan"],["ch","uông","chuông"],["đ","uôi","đuôi"],["t","iên","tiên"],["nh","iêu","nhiều"],["b","ơi","bơi"],["ch","ơi","chơi"],["v","oi","voi"],["n","ồi","nồi"],["g","ốc","gốc"],["t","ốt","tốt"],["s","ông","sông"],["kh","ông","không"],["b","iển","biển"],["t","iếp","tiếp"],["l","ăn","lăn"],["ch","ăn","chăn"],["n","ăm","năm"],["c","ầm","cầm"],["l","àm","làm"],["c","on","con"],["ng","on","ngon"],["b","ốn","bốn"],["h","át","hát"],["c","át","cát"],["đ","ọc","đọc"],["ng","ọc","ngọc"],["s","áng","sáng"],["v","àng","vàng"],["n","ắng","nắng"],["tr","ăng","trăng"],["t","rong","trong"],["m","ong","mong"],["y","êu","yêu"],["d","iều","diều"],["ch","uối","chuối"],["m","uốn","muốn"],["l","uôn","luôn"],["kh","oe","khoe"],["x","oắn","xoắn"],["c","ặp","cặp"],["m","ột","một"]];
    function composeDistractors(e, count) {
      var out = [], guard = 0;
      while (out.length < count && guard++ < 200) {
        var c = pick(COMPOSE1);
        if (c[2] !== e[2] && out.indexOf(c[2]) === -1) out.push(c[2]);
      }
      return out;
    }
    function qCompose() {
      var e = pick(COMPOSE1);
      var opts = shuffle([e[2]].concat(composeDistractors(e, 2)));
      autoVi(e[2]);
      return { prompt: "Ghép âm đầu với vần thành tiếng nào?", visual: '<div class="expr">' + e[0] + " + " + e[1] + " = ?</div>",
        options: opts.map(optWord), answer: opts.indexOf(e[2]), cols: 3 };
    }
    function qBlankVan() {
      var e = pick(COMPOSE1);
      var others = shuffle(VAN_KEYS.filter(function (x) { return x !== e[1]; })).slice(0, 2);
      var opts = shuffle([e[1]].concat(others));
      return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền vần còn thiếu để thành tiếng “" + e[2] + "” nhé!", blankText: e[1],
        visual: '<div class="big-word">' + e[0] + blankSlot() + "</div>",
        options: opts.map(optWord), answer: opts.indexOf(e[1]), cols: 3 };
    }
    function qBlankInitial() {
      var e = pick(COMPOSE1);
      var others = shuffle(COMPOSE1.filter(function (x) { return x[0] !== e[0]; })).slice(0, 2).map(function (x) { return x[0]; });
      var opts = shuffle([e[0]].concat(others.filter(function (x, i) { return others.indexOf(x) === i; })));
      while (opts.length < 3) { var d = pick(["b","c","m","n","t","s","l","h"]); if (opts.indexOf(d) === -1) opts.push(d); }
      return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền âm đầu còn thiếu để thành tiếng “" + e[2] + "” nhé!", blankText: e[0],
        visual: '<div class="big-word">' + blankSlot() + e[1] + "</div>",
        options: opts.map(optWord), answer: opts.indexOf(e[0]), cols: 3 };
    }
    function vanPairs() {
      return shuffle(VAN_KEYS.slice()).slice(0, 4).map(function (v) {
        return { l: '<span class="match-word">vần ' + v + "</span>", r: '<span class="match-word">' + pick(VAN1[v]) + "</span>" };
      });
    }
    function composePairs() {
      return shuffle(COMPOSE1.slice()).slice(0, 4).map(function (e) {
        return { l: '<span class="match-expr">' + e[0] + " + " + e[1] + "</span>", r: '<span class="match-word">' + e[2] + "</span>" };
      });
    }
    function gMemVan() { return memQ("Lật thẻ tìm cặp: vần và tiếng chứa vần!", vanPairs().map(function (p) { return { a: p.l, b: p.r }; })); }
    function gCatchVan() {
      var v = pick(VAN_KEYS);
      var good = pick(VAN1[v]);
      var others = shuffle(VAN_KEYS.filter(function (x) { return x !== v; })).slice(0, 3).map(function (x) { return pick(VAN1[x]); });
      var items = shuffle([good].concat(others));
      return catchQ("Bắt tiếng chứa vần “" + v + "” nhé!", items.map(function (w) { return { html: '<span class="opt-word">' + w + "</span>", ok: w === good }; }));
    }
    function gTFVan() {
      var rounds = [];
      for (var k = 0; k < 3; k++) {
        var v = pick(VAN_KEYS), w = pick(VAN1[v]), truth = Math.random() < 0.5;
        var shownV = truth ? v : pick(VAN_KEYS.filter(function (x) { return x !== v && VAN1[x].indexOf(w) === -1; }));
        rounds.push({ visual: '<div class="big-word">' + w + '</div><div class="sentence">Tiếng “' + w + "” chứa vần " + shownV + "</div>", truth: truth, explain: "Tiếng “" + w + "” chứa vần " + v });
      }
      return tfQ("Đúng hay sai? Tìm vần trong tiếng nhé!", rounds);
    }
    var SORT_SYL = [["bàn","b","à","n"],["con","c","o","n"],["tay","t","a","y"],["sao","s","a","o"],["mèo","m","è","o"],["hoa","h","o","a"],["cân","c","â","n"],["bay","b","a","y"]];
    function gSortSyllable() {
      var e = pick(SORT_SYL);
      return sortQ("Sắp xếp các chữ thành tiếng “" + e[0] + "” nhé!", [e[1], e[2], e[3]]);
    }
    /* ---------- TIẾNG VIỆT 1b: Đọc hiểu theo chủ đề (Tập 2) ---------- */
    function readTopic(id, emoji, name, sub, facts, pairs) {
      return { id: id, emoji: emoji, name: name, sub: sub, pools: knowledgePools(facts, pairs, "Nối cho đúng nhé!") };
    }
    var TV1_TOPICS = [
      { id: "tv1-letters", emoji: "🔠", name: "Chữ cái", sub: "Bài 1–10 • Nghe âm, chọn chữ, chữ hoa – chữ thường", pools: { choose: [qListenLetter, qListenLetter, qUpperLower], blank: [qBlankFirstLetter], match: [function () { return matchQ("Nối chữ hoa với chữ thường nhé!", letterPairs()); }], games: [gMemLetters, gCatchLetter, gTFLetter, gSortLetters1] } },
      { id: "tv1-tones", emoji: "🎵", name: "Dấu thanh", sub: "Sắc • Huyền • Hỏi • Ngã • Nặng", pools: { choose: [qToneOfWord, qListenToneWord, qToneOfWord], blank: [qBlankTone], match: [function () { return matchQ("Nối tiếng với dấu thanh của nó nhé!", tonePairs()); }], games: [gTFTone, function () { return memQ("Lật thẻ tìm cặp: tiếng và dấu thanh!", tonePairs().map(function (p) { return { a: p.l, b: p.r }; })); }] } },
      { id: "tv1-van", emoji: "🧩", name: "Học vần", sub: "an, ăn, ân • on, ôn, ơn • am, ăm, âm • ai, ay, oi, ôi, ơi…", pools: { choose: [qVanWord, qVanWord, qCompose], blank: [qBlankVan], match: [function () { return matchQ("Nối vần với tiếng chứa vần nhé!", vanPairs()); }], games: [gMemVan, gCatchVan, gTFVan] } },
      { id: "tv1-compose", emoji: "🏗️", name: "Ghép tiếng", sub: "Âm đầu + vần = tiếng • Điền âm đầu, điền vần", pools: { choose: [qCompose, qCompose, qVanWord], blank: [qBlankInitial, qBlankVan], match: [function () { return matchQ("Nối phép ghép với tiếng đúng nhé!", composePairs()); }], games: [gSortSyllable, gMemVan, gCatchVan, gTFVan] } },
      readTopic("tv1-read1", "👋", "Tôi và các bạn", "Chủ đề 1 • Làm quen, chơi với bạn", [
        ["Đến lớp, em được gặp những ai?", "Bạn bè và thầy cô", "Chỉ gặp người lạ", "Không gặp ai", "Ở lớp em có bạn bè và thầy cô."],
        ["Thấy bạn bị ngã, em nên làm gì?", "Đỡ bạn dậy và hỏi thăm", "Cười thật to", "Bỏ đi chỗ khác", "Đỡ bạn dậy là việc làm tốt."],
        ["Chơi cùng bạn, em nên thế nào?", "Vui vẻ, nhường nhịn bạn", "Giành hết đồ chơi", "Đẩy bạn ra", "Chơi với bạn cần vui vẻ và nhường nhịn."],
        ["Có bạn mới vào lớp, em nên làm gì?", "Chào bạn và làm quen", "Không nói gì với bạn", "Trốn bạn", "Chào hỏi giúp em làm quen bạn mới."],
        ["Khi bạn buồn, em nên làm gì?", "Hỏi thăm và an ủi bạn", "Chọc cho bạn khóc thêm", "Không quan tâm", "An ủi bạn là yêu thương bạn."],
        ["Muốn mượn đồ của bạn, em nên nói thế nào?", "Hỏi mượn nhẹ nhàng", "Tự ý lấy luôn", "Giật lấy đồ", "Phải hỏi mượn trước khi dùng đồ của bạn."]
      ], [["Bạn mới vào lớp","Chào bạn, làm quen"],["Bạn bị ngã","Đỡ bạn dậy"],["Bạn buồn","An ủi bạn"],["Mượn đồ của bạn","Hỏi mượn nhẹ nhàng"]]),
      readTopic("tv1-read2", "🏠", "Mái ấm gia đình", "Chủ đề 2 • Quạt cho bà ngủ", [
        ["Trời nóng, bà đang ngủ, em nên làm gì?", "Quạt mát cho bà", "Chạy nhảy ồn ào", "Bật nhạc thật to", "Quạt cho bà ngủ là việc làm hiếu thảo."],
        ["Vì sao em quạt cho bà?", "Vì trời nóng và em thương bà", "Vì em bị phạt", "Vì em không có việc gì làm", "Em quạt vì thương bà."],
        ["Bố mẹ đi làm về mệt, em nên làm gì?", "Chào hỏi và lấy nước mời", "Đòi quà ngay", "Không nói gì", "Hỏi thăm và mời nước là quan tâm bố mẹ."],
        ["Em bé khóc, em nên làm gì?", "Dỗ em và gọi người lớn", "Bỏ mặc em", "La em thật to", "Dỗ em và gọi người lớn giúp."],
        ["Trước bữa cơm, em nên làm gì?", "Mời ông bà, bố mẹ ăn cơm", "Ăn trước một mình", "Giấu hết thức ăn ngon", "Mời người lớn trước là lễ phép."],
        ["Bà kể chuyện, em nên thế nào?", "Ngồi yên lắng nghe", "Nói chuyện riêng thật to", "Bỏ đi chơi", "Lắng nghe bà kể chuyện là ngoan."]
      ], [["Bà nóng khó ngủ","Quạt cho bà"],["Mẹ đi làm về mệt","Mời mẹ uống nước"],["Em bé khóc","Dỗ em"],["Đến bữa cơm","Mời ông bà, bố mẹ"]]),
      readTopic("tv1-read3", "🏫", "Mái trường mến yêu", "Chủ đề 3 • Tôi đi học", [
        ["Buổi sáng, em đi học ở đâu?", "Ở trường học", "Ở chợ", "Ở bãi biển", "Em đi học ở trường."],
        ["Ai dạy em học ở lớp?", "Thầy cô giáo", "Chú bán hàng", "Bác lái xe", "Thầy cô dạy em học."],
        ["Vào lớp, gặp thầy cô em nói gì?", "Em chào thầy cô ạ", "Không nói gì", "Em đòi quà ạ", "Gặp thầy cô phải chào hỏi lễ phép."],
        ["Ở trường, em học được những gì?", "Học chữ, học số, học điều hay", "Chỉ học ngủ", "Không học gì", "Đến trường để học chữ và điều hay."],
        ["Giờ ra chơi, em nên chơi thế nào?", "Chơi an toàn với bạn", "Chạy nhảy trên bàn ghế", "Đẩy xô bạn", "Ra chơi phải an toàn."],
        ["Tan học, em nên làm gì?", "Chào thầy cô và về nhà", "Chạy ngay ra đường một mình", "Ở lại trường đến tối", "Tan học chào thầy cô rồi về nhà."]
      ], [["Thầy cô giáo","Dạy em học"],["Bạn bè ở lớp","Học và chơi cùng em"],["Sách vở","Để em học bài"],["Cặp sách","Đựng đồ dùng học tập"]]),
      readTopic("tv1-read4", "🧼", "Điều em cần biết", "Chủ đề 4 • Vệ sinh, an toàn giao thông", [
        ["Trước khi ăn, em cần làm gì trước?", "Rửa tay sạch", "Chạy ra ngoài chơi", "Sờ vào đồ bẩn", "Rửa tay trước khi ăn giữ vệ sinh."],
        ["Rửa tay sạch bằng gì?", "Nước và xà phòng", "Chỉ bằng khăn khô", "Không cần gì", "Rửa tay bằng nước và xà phòng."],
        ["Thấy đèn giao thông màu đỏ, người đi bộ phải làm gì?", "Dừng lại", "Đi nhanh qua", "Chạy qua đường", "Đèn đỏ phải dừng lại."],
        ["Đèn giao thông màu xanh báo hiệu điều gì?", "Được phép đi", "Phải dừng lại", "Đường bị cấm mãi mãi", "Đèn xanh là được đi."],
        ["Nếu em bị lạc, em nên nhờ ai giúp?", "Chú công an hoặc người lớn tin cậy", "Đi theo người lạ bất kì", "Tự chạy đi tìm thật xa", "Bị lạc hãy nhờ chú công an giúp."],
        ["Sang đường cùng người lớn, em cần nhớ điều gì?", "Quan sát xe và đi trên vạch kẻ đường", "Chạy thật nhanh không nhìn", "Đi giữa lòng đường", "Sang đường phải quan sát và đi đúng vạch."]
      ], [["Đèn đỏ","Dừng lại"],["Đèn xanh","Được đi"],["Trước khi ăn","Rửa tay sạch"],["Bị lạc","Nhờ chú công an"]]),
      readTopic("tv1-read5", "🐜", "Bài học từ cuộc sống", "Chủ đề 5 • Kiến và chim bồ câu, Chú bé chăn cừu", [
        ["Kiến sắp bị nước cuốn trôi, ai đã cứu kiến?", "Chim bồ câu", "Con sói", "Không ai cứu", "Bồ câu thả lá cho kiến bám vào."],
        ["Được bồ câu cứu, kiến ghi nhớ điều gì?", "Ơn cứu giúp của bồ câu", "Quên ngay lập tức", "Giận bồ câu", "Được giúp phải biết ơn."],
        ["Chú bé chăn cừu nói dối điều gì?", "Hô “Sói đến!” dù không có sói", "Nói thật là sói đến", "Không nói gì", "Bé chăn cừu nói dối để trêu mọi người."],
        ["Nói dối nhiều lần, mọi người sẽ thế nào?", "Không còn tin bé nữa", "Càng tin bé hơn", "Thưởng cho bé", "Nói dối làm mất lòng tin."],
        ["Khi sói đến thật, vì sao không ai tới cứu bé chăn cừu?", "Vì mọi người không còn tin lời bé", "Vì mọi người đi ngủ hết", "Vì sói quá dễ thương", "Mất lòng tin nên không ai đến cứu."],
        ["Câu chuyện dạy em điều gì?", "Phải thật thà, không nói dối", "Nên nói dối cho vui", "Nói dối là giỏi", "Thật thà là bài học quan trọng."]
      ], [["Kiến gặp nạn","Bồ câu cứu giúp"],["Nói dối nhiều lần","Mất lòng tin"],["Sống thật thà","Được mọi người tin yêu"],["Được người khác giúp","Biết nói lời cảm ơn"]]),
      readTopic("tv1-read6", "🌈", "Thiên nhiên kì thú", "Chủ đề 6 • Bảy sắc cầu vồng", [
        ["Cầu vồng có bao nhiêu màu?", "7 màu", "3 màu", "1 màu", "Cầu vồng có bảy màu."],
        ["Màu nào là màu đầu tiên của cầu vồng?", "Màu đỏ", "Màu tím", "Màu đen", "Thứ tự cầu vồng bắt đầu bằng màu đỏ."],
        ["Cầu vồng thường xuất hiện khi nào?", "Sau cơn mưa, trời nắng lên", "Giữa đêm tối", "Khi trời đang bão to", "Cầu vồng hiện sau mưa khi có nắng."],
        ["Màu nào có trong bảy sắc cầu vồng?", "Màu vàng", "Màu đen", "Màu nâu xám", "Bảy sắc cầu vồng: đỏ, cam, vàng, lục, lam, chàm, tím."],
        ["Sau màu vàng của cầu vồng là màu gì?", "Màu lục (xanh lá)", "Màu đỏ", "Màu tím", "Thứ tự: đỏ, cam, vàng, lục, lam, chàm, tím."],
        ["Màu cuối cùng của cầu vồng là màu gì?", "Màu tím", "Màu đỏ", "Màu cam", "Màu cuối của cầu vồng là tím."]
      ], [["Màu đỏ","Quả táo chín"],["Màu cam","Quả cam"],["Màu vàng","Quả chuối chín"],["Màu xanh lá","Chiếc lá cây"]]),
      readTopic("tv1-read7", "🌍", "Thế giới trong mắt em", "Chủ đề 7 • Quan sát thế giới quanh em", [
        ["Con vật nào biết bay?", "Con chim", "Con cá", "Con thỏ", "Chim có cánh nên bay được."],
        ["Ban ngày, em nhìn thấy gì trên bầu trời?", "Mặt trời", "Mặt trăng và sao", "Không thấy gì", "Ban ngày có mặt trời."],
        ["Em dùng gì để nhìn ngắm thế giới?", "Đôi mắt", "Đôi tai", "Cái mũi", "Mắt dùng để nhìn."],
        ["Con cá sống ở đâu?", "Dưới nước", "Trên cây", "Trong hang trên núi", "Cá sống dưới nước."],
        ["Mùa nào hoa nở nhiều và thời tiết ấm áp?", "Mùa xuân", "Mùa đông", "Không mùa nào", "Mùa xuân hoa nở nhiều."],
        ["Em nghe tiếng chim hót bằng gì?", "Đôi tai", "Đôi mắt", "Cái miệng", "Tai dùng để nghe."]
      ], [["Con chim","Bay trên trời"],["Con cá","Bơi dưới nước"],["Con thỏ","Nhảy trên bãi cỏ"],["Con bướm","Đậu trên bông hoa"]]),
      readTopic("tv1-read8", "🧑‍🚒", "Đất nước và con người", "Chủ đề 8 • Lính cứu hoả, Ruộng bậc thang Sa Pa", [
        ["Khi có cháy, em cần gọi ai đến giúp?", "Lính cứu hoả", "Bạn cùng lớp", "Không gọi ai", "Có cháy gọi lính cứu hoả."],
        ["Số điện thoại gọi cứu hoả là số nào?", "114", "113", "115", "Số cứu hoả là 114."],
        ["Lính cứu hoả làm công việc gì?", "Dập lửa và cứu người", "Bán hàng ở chợ", "Dạy học ở lớp", "Lính cứu hoả dập lửa, cứu người."],
        ["Ruộng bậc thang nổi tiếng ở nơi nào?", "Sa Pa", "Giữa biển khơi", "Trong thành phố lớn", "Ruộng bậc thang Sa Pa rất nổi tiếng."],
        ["Ruộng bậc thang được làm để trồng gì?", "Trồng lúa", "Trồng hoa trong chậu", "Không trồng gì", "Người dân trồng lúa trên ruộng bậc thang."],
        ["Vì sao ruộng trên núi làm thành từng bậc?", "Để giữ nước và dễ trồng lúa trên sườn đồi", "Để làm cầu thang đi chơi", "Để trang trí cho đẹp", "Bậc ruộng giúp giữ nước trồng lúa."]
      ], [["Khi có cháy","Gọi số 114"],["Lính cứu hoả","Dập lửa, cứu người"],["Ruộng bậc thang","Ở Sa Pa"],["Trồng lúa","Trên ruộng bậc thang"]])
    ];

    /* ---------- TỰ NHIÊN VÀ XÃ HỘI 1 (6 chủ đề, Bài 1–28) ---------- */
    var TNXH1_TOPICS = [
      { id: "tn1-family", emoji: "👨‍👩‍👧", name: "Gia đình", sub: "Bài 1–5 • Người thân, đồ dùng trong nhà", pools: knowledgePools([
          ["Ai là người sinh ra em và chăm sóc em hằng ngày?", "Bố mẹ", "Bạn cùng lớp", "Cô bán hàng", "Bố mẹ là người thân gần gũi nhất."],
          ["Đồ dùng nào dùng để đánh răng?", "Bàn chải đánh răng", "Cái thìa", "Cái lược", "Đánh răng bằng bàn chải và kem đánh răng."],
          ["Dao, kéo trong nhà, em cần nhớ điều gì?", "Không tự ý nghịch, dễ bị đứt tay", "Cầm chạy chơi khắp nhà", "Đưa cho em bé chơi", "Dao kéo sắc nhọn, trẻ em không tự ý nghịch."],
          ["Ổ điện trong nhà có nguy hiểm không?", "Có, không được chạm tay ướt vào ổ điện", "Không, cứ chạm thoải mái", "Cắm que vào ổ điện để chơi", "Điện rất nguy hiểm, không chạm tay ướt vào ổ điện."],
          ["Buổi tối cả nhà thường làm gì cùng nhau?", "Ăn cơm, trò chuyện vui vẻ", "Không ai nói chuyện với ai", "Mỗi người một nơi xa lạ", "Gia đình quây quần bên nhau rất ấm áp."],
          ["Khi ông bà mệt, em nên làm gì?", "Hỏi thăm và giúp việc nhỏ", "Làm ồn thật to", "Không quan tâm", "Quan tâm ông bà là hiếu thảo."],
          ["Đồ dùng nào dùng để nấu cơm?", "Nồi cơm điện", "Cái gối", "Quyển sách", "Nồi cơm điện dùng để nấu cơm."],
          ["Em nên giúp bố mẹ việc gì ở nhà?", "Quét nhà, xếp đồ gọn gàng", "Làm bừa bộn thêm", "Không làm việc gì", "Giúp việc nhà vừa sức là ngoan."]
        ], [["Bàn chải","Đánh răng"],["Nồi","Nấu ăn"],["Khăn mặt","Lau mặt"],["Giường","Để ngủ"]], "Nối đồ dùng với việc dùng của nó nhé!") },
      { id: "tn1-school", emoji: "🎒", name: "Trường học", sub: "Bài 6–10 • Lớp học, đồ dùng học tập", pools: knowledgePools([
          ["Ở lớp học có những ai?", "Thầy cô và các bạn", "Chỉ có mình em", "Toàn người lạ", "Lớp học có thầy cô và bạn bè."],
          ["Đồ dùng nào dùng để viết?", "Bút chì", "Cục tẩy", "Cái thước", "Bút chì dùng để viết và vẽ."],
          ["Cục tẩy (gôm) dùng để làm gì?", "Xoá chữ viết sai", "Để ăn", "Để kẻ đường thẳng", "Tẩy dùng để xoá nét viết sai."],
          ["Giờ ra chơi ở sân trường, em chơi thế nào cho an toàn?", "Chơi nhẹ nhàng, không xô đẩy", "Chạy thật nhanh chen lấn", "Leo trèo lên lan can", "Vui chơi an toàn, không xô đẩy bạn."],
          ["Đi cầu thang ở trường, em cần nhớ gì?", "Đi chậm, bám tay vịn, không chạy nhảy", "Chạy xuống thật nhanh", "Nhảy từng hai bậc", "Đi cầu thang chậm rãi để an toàn."],
          ["Sách vở học xong, em nên để ở đâu?", "Cất vào cặp hoặc ngăn bàn gọn gàng", "Vứt xuống sàn lớp", "Để quên ngoài sân", "Giữ gìn sách vở gọn gàng."],
          ["Lớp học bẩn, em nên làm gì?", "Cùng bạn quét lớp, nhặt rác", "Mặc kệ cho bẩn", "Vứt rác thêm ra sàn", "Giữ lớp sạch là việc của mọi người."]
        ], [["Bút chì","Để viết"],["Thước kẻ","Để kẻ thẳng"],["Sách","Để đọc và học"],["Cặp sách","Đựng sách vở"]], "Nối đồ dùng học tập với công dụng nhé!") },
      { id: "tn1-community", emoji: "🏘️", name: "Cộng đồng địa phương", sub: "Bài 11–16 • Quanh em, nghề nghiệp, Tết, an toàn giao thông", pools: knowledgePools([
          ["Ai chữa bệnh cho mọi người?", "Bác sĩ", "Chú nông dân", "Cô giáo", "Bác sĩ khám và chữa bệnh."],
          ["Ai giữ gìn an ninh, trật tự?", "Chú công an", "Bác thợ xây", "Cô bán hoa", "Công an giữ an ninh trật tự."],
          ["Ai trồng lúa cho chúng ta có gạo ăn?", "Bác nông dân", "Bác sĩ", "Chú lái xe", "Nông dân trồng lúa vất vả."],
          ["Sang đường, em phải đi cùng ai?", "Cùng người lớn", "Tự đi một mình", "Chạy theo quả bóng", "Trẻ em sang đường phải có người lớn."],
          ["Ngày Tết, em thường làm gì?", "Chúc Tết ông bà, nhận lì xì và cảm ơn", "Không chào hỏi ai", "Đòi quà thật nhiều", "Tết em chúc Tết và cảm ơn người lớn."],
          ["Đi trên đường, người đi bộ đi ở đâu?", "Trên vỉa hè", "Giữa lòng đường", "Chỗ nào cũng được", "Đi bộ trên vỉa hè cho an toàn."],
          ["Thấy đèn đỏ khi đi cùng bố mẹ, em nhắc mọi người điều gì?", "Dừng lại chờ đèn xanh", "Đi nhanh qua", "Chạy qua trước", "Đèn đỏ phải dừng lại."]
        ], [["Bác sĩ","Chữa bệnh"],["Chú công an","Giữ trật tự"],["Bác nông dân","Trồng lúa"],["Cô giáo","Dạy học"]], "Nối nghề với công việc nhé!") },
      { id: "tn1-plants", emoji: "🌱", name: "Thực vật và động vật", sub: "Bài 17–21 • Cây và con vật quanh em", pools: knowledgePools([
          ["Đâu là một loài cây?", "Cây xoài", "Con gà", "Con cá", "Cây xoài là thực vật."],
          ["Đâu là một con vật?", "Con mèo", "Cây bàng", "Bông hoa", "Con mèo là động vật."],
          ["Muốn cây lớn nhanh và xanh tốt, em cần làm gì?", "Tưới nước cho cây", "Không bao giờ tưới", "Bẻ hết lá cây", "Cây cần nước để sống."],
          ["Con cá sống ở đâu?", "Dưới nước", "Trên cây", "Trong tổ chim", "Cá sống dưới nước."],
          ["Con chim thường làm tổ ở đâu?", "Trên cành cây", "Dưới đáy biển", "Trong hang đất sâu", "Chim làm tổ trên cây."],
          ["Nuôi chó, mèo ở nhà, em cần làm gì?", "Cho ăn và chăm sóc chúng", "Bỏ đói chúng", "Đuổi chúng đi", "Vật nuôi cần được chăm sóc."],
          ["Phần nào của cây nằm dưới đất?", "Rễ cây", "Lá cây", "Bông hoa", "Rễ cây hút nước dưới đất."],
          ["Con vật nào cho chúng ta trứng?", "Con gà", "Con bò", "Con lợn", "Gà đẻ trứng."]
        ], [["Con cá","Sống dưới nước"],["Con chim","Bay trên trời"],["Cây xoài","Trồng trong vườn"],["Con gà","Sống ở sân vườn"]], "Nối cây và con vật với nơi sống nhé!") },
      { id: "tn1-body", emoji: "🧍", name: "Con người và sức khoẻ", sub: "Bài 22–26 • Cơ thể, giác quan, ăn uống, vận động", pools: knowledgePools([
          ["Em dùng gì để nhìn?", "Mắt", "Tai", "Mũi", "Mắt là giác quan để nhìn."],
          ["Em dùng gì để nghe tiếng nói, tiếng nhạc?", "Tai", "Lưỡi", "Da", "Tai dùng để nghe."],
          ["Em dùng gì để ngửi mùi thơm của hoa?", "Mũi", "Mắt", "Tay", "Mũi dùng để ngửi."],
          ["Em dùng gì để nếm vị ngọt, chua?", "Lưỡi", "Tai", "Mũi", "Lưỡi giúp nếm các vị."],
          ["Ăn uống thế nào để khoẻ mạnh?", "Ăn đủ chất, ăn nhiều rau quả", "Chỉ ăn kẹo và bánh ngọt", "Bỏ bữa sáng", "Ăn đủ chất giúp cơ thể khoẻ."],
          ["Mỗi ngày em cần làm gì để cơ thể khoẻ?", "Vận động, tập thể dục và nghỉ ngơi đủ", "Ngồi yên cả ngày không vận động", "Thức thật khuya", "Vận động và nghỉ ngơi hợp lí giúp khoẻ mạnh."],
          ["Người lạ rủ em đi theo và cho kẹo, em nên làm gì?", "Không đi theo, chạy đến chỗ người lớn tin cậy", "Đi theo ngay", "Giữ bí mật không kể ai", "Không đi theo người lạ, hãy tìm người lớn giúp."],
          ["Sau khi đi vệ sinh và trước khi ăn, em cần làm gì?", "Rửa tay bằng xà phòng", "Không cần rửa", "Chỉ lau vào quần áo", "Rửa tay giữ vệ sinh, phòng bệnh."]
        ], [["Mắt","Để nhìn"],["Tai","Để nghe"],["Mũi","Để ngửi"],["Lưỡi","Để nếm"]], "Nối giác quan với việc của nó nhé!") },
      { id: "tn1-sky", emoji: "🌦️", name: "Trái đất và bầu trời", sub: "Bài 27–28 • Ngày đêm, thời tiết", pools: knowledgePools([
          ["Ban ngày, trên bầu trời có gì?", "Mặt trời", "Mặt trăng và các vì sao", "Không có gì", "Ban ngày có mặt trời chiếu sáng."],
          ["Ban đêm, em nhìn thấy gì trên bầu trời?", "Mặt trăng và các vì sao", "Mặt trời nắng gắt", "Cầu vồng rõ nhất", "Ban đêm có trăng và sao."],
          ["Trời mưa, đi ra ngoài em cần mang gì?", "Ô hoặc áo mưa", "Kính bơi", "Quạt giấy", "Trời mưa cần ô hoặc áo mưa."],
          ["Trời nắng to, em nên đội gì khi ra ngoài?", "Mũ (nón)", "Áo mưa", "Khăn len dày", "Trời nắng đội mũ để che nắng."],
          ["Trời lạnh, em nên mặc trang phục thế nào?", "Áo ấm", "Áo ba lỗ mỏng", "Đồ bơi", "Trời lạnh mặc áo ấm."],
          ["Mây đen kéo đến, gió mạnh thường báo hiệu điều gì?", "Sắp có mưa", "Trời nắng đẹp cả ngày", "Tuyết rơi ngay", "Mây đen thường báo hiệu mưa."],
          ["Mặt trời mọc vào lúc nào?", "Buổi sáng", "Buổi tối", "Nửa đêm", "Mặt trời mọc buổi sáng."]
        ], [["Trời mưa","Mang ô, áo mưa"],["Trời nắng","Đội mũ"],["Trời lạnh","Mặc áo ấm"],["Ban đêm","Có trăng và sao"]], "Nối thời tiết với đồ dùng phù hợp nhé!") }
    ];

    /* ---------- ĐẠO ĐỨC 1 (8 chủ đề, Bài 1–30) ---------- */
    function ddTopic(id, emoji, name, sub, facts, pairs) { return { id: id, emoji: emoji, name: name, sub: sub, pools: knowledgePools(facts, pairs, "Nối tình huống với việc nên làm nhé!") }; }
    var DD1_TOPICS = [
      ddTopic("dd1-care", "🧼", "Tự chăm sóc bản thân", "Chủ đề 1 • Rửa tay, răng miệng, tắm gội, gọn gàng", [
        ["Buổi sáng thức dậy, em nên làm việc nào trước?", "Đánh răng, rửa mặt", "Chạy đi chơi ngay", "Ăn kẹo trước", "Đánh răng rửa mặt mỗi sáng giữ vệ sinh."],
        ["Răng miệng sạch sẽ giúp em điều gì?", "Răng chắc khoẻ, miệng thơm tho", "Răng bị sâu hết", "Không có lợi gì", "Chăm sóc răng miệng phòng sâu răng."],
        ["Tắm gội thường xuyên giúp cơ thể thế nào?", "Sạch sẽ, thoải mái", "Bẩn hơn", "Dễ bị ngứa và bệnh ngoài da hơn", "Tắm gội giúp cơ thể sạch sẽ."],
        ["Mặc quần áo đi học, em nên chọn trang phục thế nào?", "Gọn gàng, sạch sẽ", "Nhàu nát, bẩn", "Mặc ngược cũng được", "Trang phục gọn gàng, sạch sẽ."],
        ["Tóc dài che mắt, em nên làm gì?", "Buộc tóc gọn hoặc đi cắt tóc", "Để che mắt khi học", "Không quan tâm", "Tóc gọn gàng giúp học tập tốt."],
        ["Móng tay dài và bẩn, em nên làm gì?", "Cắt móng tay sạch sẽ", "Để dài để cào bạn", "Không cần cắt", "Cắt móng tay giữ vệ sinh."]
      ], [["Buổi sáng","Đánh răng, rửa mặt"],["Trước khi ăn","Rửa tay sạch"],["Tóc che mắt","Buộc tóc gọn gàng"],["Quần áo đi học","Gọn gàng, sạch sẽ"]]),
      ddTopic("dd1-family", "❤️", "Yêu thương gia đình", "Chủ đề 2 • Quan tâm người thân", [
        ["Thể hiện yêu thương bố mẹ, em nên làm gì?", "Nghe lời và giúp việc nhỏ", "Hay cãi lại bố mẹ", "Không nói chuyện với bố mẹ", "Nghe lời, giúp đỡ là yêu thương bố mẹ."],
        ["Ông bà đau chân, đi lại khó, em nên làm gì?", "Dìu ông bà và lấy ghế mời ngồi", "Chạy chơi mặc kệ", "Đùa giỡn ồn ào", "Giúp đỡ ông bà là hiếu thảo."],
        ["Mẹ nấu cơm mệt, em có thể giúp gì?", "Nhặt rau, dọn bàn ăn", "Đòi mẹ chơi cùng ngay", "Làm đổ hết đồ ăn", "Giúp mẹ việc vừa sức."],
        ["Em gái bị ốm, em nên thế nào?", "Quan tâm, nhường nhịn em", "Tranh đồ chơi của em", "Chọc em khóc", "Quan tâm người thân khi ốm."],
        ["Sinh nhật bà, em nên làm gì?", "Chúc mừng và tặng lời chúc tốt đẹp", "Quên luôn không nói gì", "Đòi bà mua quà cho em", "Chúc mừng người thân là tình cảm đẹp."]
      ], [["Ông bà mệt","Hỏi thăm, dìu đỡ"],["Mẹ nấu cơm","Giúp nhặt rau"],["Em bị ốm","Quan tâm, nhường em"],["Sinh nhật bà","Chúc mừng bà"]]),
      ddTopic("dd1-help", "🤲", "Quan tâm, chăm sóc người thân", "Chủ đề 3 • Lễ phép, vâng lời, giúp em nhỏ", [
        ["Gặp người lớn trong nhà, em nói gì?", "Con chào ông/bà/bố/mẹ ạ", "Không nói gì", "Nói trống không", "Chào hỏi lễ phép với người lớn."],
        ["Bố mẹ dặn dò điều đúng, em nên thế nào?", "Vâng lời và làm theo", "Cãi lại ngay", "Giả vờ không nghe", "Vâng lời bố mẹ là ngoan."],
        ["Em nhỏ muốn chơi đồ chơi của em, em nên làm gì?", "Nhường và chơi cùng em", "Giật lại và mắng em", "Giấu hết đồ chơi", "Nhường nhịn em nhỏ."],
        ["Em nhỏ ngã, em nên làm gì?", "Đỡ em dậy và xem em có đau không", "Cười em", "Bỏ đi", "Đỡ em dậy là chăm sóc em."],
        ["Người lớn đang nói chuyện, em có chuyện muốn nói, em nên làm gì?", "Chờ người lớn nói xong rồi mới nói", "Nói chen thật to", "Kéo tay liên tục", "Chờ đợi là lễ phép."]
      ], [["Gặp người lớn","Chào hỏi lễ phép"],["Bố mẹ dặn dò","Vâng lời làm theo"],["Em muốn chơi cùng","Nhường và chơi với em"],["Em bị ngã","Đỡ em dậy"]]),
      ddTopic("dd1-rules", "🏫", "Thực hiện nội quy trường lớp", "Chủ đề 4 • Đúng giờ, trật tự, vệ sinh, tài sản chung", [
        ["Đi học, em cần đến trường lúc nào?", "Đúng giờ", "Muộn bao nhiêu cũng được", "Khi nào thích thì đến", "Đi học đúng giờ là nội quy."],
        ["Trong giờ học, khi cô giảng bài, em nên làm gì?", "Ngồi yên lắng nghe", "Nói chuyện riêng thật to", "Chạy quanh lớp", "Giữ trật tự trong giờ học."],
        ["Ăn quà xong, vỏ kẹo em bỏ ở đâu?", "Bỏ vào thùng rác", "Vứt xuống sân trường", "Nhét vào ngăn bàn bạn", "Bỏ rác đúng nơi giữ trường sạch."],
        ["Bàn ghế, đồ dùng chung của lớp, em cần làm gì?", "Giữ gìn cẩn thận", "Vẽ bậy lên bàn", "Làm hỏng cũng không sao", "Giữ gìn tài sản chung."],
        ["Muốn phát biểu trong lớp, em làm thế nào?", "Giơ tay xin phép cô", "Nói luôn thật to", "Đứng lên chạy đến chỗ cô", "Giơ tay khi muốn phát biểu."]
      ], [["Đi học","Đến đúng giờ"],["Giờ học","Giữ trật tự, lắng nghe"],["Có rác","Bỏ vào thùng rác"],["Đồ dùng chung của lớp","Giữ gìn cẩn thận"]]),
      ddTopic("dd1-nep", "🗂️", "Sinh hoạt nền nếp", "Chủ đề 5 • Gọn gàng, ngăn nắp, đúng giờ", [
        ["Sách vở học xong, em để ở đâu?", "Xếp gọn vào cặp hoặc giá sách", "Để bừa khắp nhà", "Ném xuống gầm giường", "Xếp gọn gàng là nền nếp tốt."],
        ["Tối đến giờ đi ngủ, em nên làm gì?", "Đi ngủ đúng giờ", "Chơi đến khuya", "Xem điện thoại mãi", "Ngủ đúng giờ giúp khoẻ mạnh."],
        ["Đồ chơi chơi xong, em nên làm gì?", "Cất vào hộp gọn gàng", "Để nguyên giữa nhà", "Vứt lung tung", "Chơi xong cất đồ chơi."],
        ["Chuẩn bị đi học buổi sáng, em nên làm từ khi nào?", "Chuẩn bị cặp sách từ tối hôm trước", "Sáng dậy mới cuống cuồng tìm đồ", "Không cần chuẩn bị", "Chuẩn bị trước giúp không bị muộn."],
        ["Ăn cơm đúng bữa giúp em điều gì?", "Cơ thể khoẻ mạnh, đúng nền nếp", "Không có lợi gì", "Dễ đau bụng hơn", "Ăn đúng bữa tốt cho sức khoẻ."]
      ], [["Học xong","Xếp sách vở gọn gàng"],["Chơi xong","Cất đồ chơi vào hộp"],["Tối hôm trước","Chuẩn bị cặp sách"],["Đến giờ ngủ","Đi ngủ đúng giờ"]]),
      ddTopic("dd1-self", "💪", "Tự giác làm việc của mình", "Chủ đề 6 • Tự học, việc nhà vừa sức", [
        ["Bài tập về nhà là việc của ai?", "Của chính em, em tự giác làm", "Của bố mẹ làm hộ", "Không cần làm", "Tự giác làm bài tập của mình."],
        ["Việc nhà nào em có thể tự làm?", "Gấp quần áo, dọn góc học tập", "Nấu bếp ga một mình", "Sửa điện trong nhà", "Làm việc nhà vừa sức, an toàn."],
        ["Quần áo thay ra, em nên làm gì?", "Để vào chậu đồ giặt, không vứt bừa", "Vứt giữa nhà cho mẹ nhặt", "Giấu dưới gầm giường", "Tự giác dọn đồ của mình."],
        ["Không hiểu bài, em nên làm gì?", "Hỏi thầy cô hoặc bố mẹ", "Bỏ luôn không học", "Chép bài bạn mà không hiểu", "Hỏi khi chưa hiểu là tự giác học tập."],
        ["Được giao tưới cây, em quên mất, em nên làm gì?", "Nhận lỗi và làm ngay, lần sau nhớ hơn", "Đổ lỗi cho người khác", "Giả vờ đã tưới rồi", "Nhận lỗi và sửa sai."]
      ], [["Bài tập về nhà","Tự giác làm"],["Góc học tập bừa bộn","Tự dọn gọn"],["Quần áo thay ra","Để đúng chỗ giặt"],["Quên việc được giao","Nhận lỗi và làm ngay"]]),
      ddTopic("dd1-honest", "🌟", "Thật thà", "Chủ đề 7 • Không nói dối, nhận lỗi, trả của rơi", [
        ["Em lỡ làm vỡ cốc, bố mẹ hỏi, em nên làm gì?", "Nhận lỗi thật thà", "Nói dối là em bé làm vỡ", "Giấu ngay không nói", "Thật thà nhận lỗi là dũng cảm."],
        ["Nhặt được tiền rơi ở sân trường, em nên làm gì?", "Nộp cho thầy cô để trả người mất", "Giữ lấy tiêu riêng", "Giấu đi không nói ai", "Nhặt được của rơi trả lại người mất."],
        ["Thích đồ chơi của bạn, em nên làm gì?", "Hỏi mượn bạn", "Tự ý lấy mang về nhà", "Giấu vào cặp mình", "Không tự ý lấy đồ của người khác."],
        ["Chưa làm bài tập nhưng cô hỏi, em nên trả lời thế nào?", "Nói thật là em chưa làm và xin làm bù", "Nói dối là em làm rồi", "Đổ lỗi cho bạn", "Nói thật và sửa sai."],
        ["Nói dối sẽ làm mọi người thế nào với em?", "Không còn tin em nữa", "Càng yêu quý em hơn", "Thưởng cho em", "Nói dối làm mất lòng tin."]
      ], [["Làm vỡ đồ","Nhận lỗi thật thà"],["Nhặt được của rơi","Trả lại người mất"],["Muốn dùng đồ của bạn","Hỏi mượn bạn"],["Chưa làm bài tập","Nói thật với cô"]]),
      ddTopic("dd1-safe", "⛑️", "Phòng tránh tai nạn", "Chủ đề 8 • Giao thông, đuối nước, bỏng, điện", [
        ["Đi bơi, em cần có gì để an toàn?", "Có người lớn đi cùng và dùng phao", "Tự đi bơi một mình", "Nhảy xuống chỗ nước sâu", "Đi bơi phải có người lớn và phao."],
        ["Chơi gần ao, hồ, sông, em cần nhớ gì?", "Không chơi gần bờ nước, dễ ngã xuống nước", "Ra mép nước nghịch thoải mái", "Rủ bạn xuống tắm khi không có người lớn", "Không chơi gần ao hồ nguy hiểm."],
        ["Nồi canh nóng vừa nấu xong, em nên làm gì?", "Tránh xa, không chạm vào, dễ bị bỏng", "Sờ thử xem nóng không", "Bê nồi một mình", "Đồ nóng dễ gây bỏng, không tự ý chạm."],
        ["Ổ điện và dây điện hở, em phải làm gì?", "Không chạm vào, báo người lớn", "Cầm tay ướt chạm thử", "Lấy que chọc vào ổ điện", "Điện rất nguy hiểm, không được chạm."],
        ["Đi trên đường đông xe, em đi thế nào?", "Đi cùng người lớn, đi trên vỉa hè", "Chạy băng qua đường một mình", "Đùa nghịch giữa đường", "Đi đường an toàn cùng người lớn."],
        ["Ngã cầu thang thường do đâu?", "Chạy nhảy, đùa nghịch trên cầu thang", "Đi chậm bám tay vịn", "Đi từng bậc cẩn thận", "Không chạy nhảy trên cầu thang."]
      ], [["Đi bơi","Có người lớn và phao"],["Nồi canh nóng","Không chạm vào"],["Ổ điện","Không sờ, báo người lớn"],["Qua đường","Đi cùng người lớn"]])
    ];
    /* ---------- ÂM NHẠC 1 (8 chủ đề SGK — gộp 4 bài chơi) ---------- */
    var NOTES1 = [{ n: "Đô", f: 261.63 }, { n: "Rê", f: 293.66 }, { n: "Mi", f: 329.63 }, { n: "Pha", f: 349.23 }, { n: "Son", f: 392.0 }];
    function qNoteListen() {
      var t = pick(NOTES1.slice(0, 3));
      var others = shuffle(NOTES1.slice(0, 3).filter(function (x) { return x.n !== t.n; }));
      var opts = shuffle([t].concat(others));
      setTimeout(function () { playNotes(String(t.f)); }, 420);
      return { prompt: "Nghe nốt nhạc rồi chọn đúng tên nốt nhé!", visual: '<button class="speak-btn" data-note="' + t.f + '" aria-label="Nghe lại nốt nhạc">🎵</button>',
        options: opts.map(function (o) { return optWord(o.n); }), answer: opts.indexOf(t), cols: 3 };
    }
    function qNoteCompare() {
      var a = pick(NOTES1), b = pick(NOTES1);
      while (b.f === a.f) b = pick(NOTES1);
      var higher = b.f > a.f;
      setTimeout(function () { playNotes(a.f + "," + b.f); }, 420);
      return { prompt: "Nghe hai nốt nhạc: nốt thứ hai cao hơn hay thấp hơn nốt thứ nhất?", visual: '<button class="speak-btn" data-note="' + a.f + "," + b.f + '" aria-label="Nghe lại hai nốt">🎵🎵</button>',
        options: [optWord("Cao hơn"), optWord("Thấp hơn")], answer: higher ? 0 : 1, cols: 2 };
    }
    function qNoteLongShort() {
      var t = pick(NOTES1.slice(0, 3)), long = Math.random() < 0.5, dur = long ? 1.5 : 0.25;
      setTimeout(function () { playNotes(t.f + ":" + dur); }, 420);
      return { prompt: "Nốt nhạc vừa nghe ngân dài hay ngắn?", visual: '<button class="speak-btn" data-note="' + t.f + ":" + dur + '" aria-label="Nghe lại">🎵</button>',
        options: [optWord("Ngân dài"), optWord("Ngân ngắn")], answer: long ? 0 : 1, cols: 2 };
    }
    function qNoteLoudSoft() {
      var t = pick(NOTES1.slice(0, 3)), loud = Math.random() < 0.5, vol = loud ? 0.3 : 0.045;
      setTimeout(function () { playNotes(t.f + ":0.7:" + vol); }, 420);
      return { prompt: "Âm thanh vừa nghe to hay nhỏ?", visual: '<button class="speak-btn" data-note="' + t.f + ":0.7:" + vol + '" aria-label="Nghe lại">🎵</button>',
        options: [optWord("Âm thanh to"), optWord("Âm thanh nhỏ")], answer: loud ? 0 : 1, cols: 2 };
    }
    function qBlankNote() {
      var seqs = [[0, 1, 2], [1, 2, 3], [2, 3, 4]];
      var s = pick(seqs), miss = 1, ans = NOTES1[s[miss]];
      var row = s.map(function (ni, i) { return i === miss ? blankSlot() : '<span class="seq-num">' + NOTES1[ni].n + "</span>"; }).join("");
      var others = shuffle(NOTES1.filter(function (x) { return x.n !== ans.n && s.indexOf(NOTES1.indexOf(x)) === -1; })).slice(0, 2);
      var opts = shuffle([ans].concat(others));
      return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền nốt còn thiếu theo thứ tự từ thấp đến cao nhé!", blankText: ans.n,
        visual: '<div class="seq-row">' + row + "</div>", options: opts.map(function (o) { return optWord(o.n); }), answer: opts.indexOf(ans), cols: 3 };
    }
    function notePairs() {
      return NOTES1.slice(0, 4).map(function (t, i) { return { l: '<span class="match-word">' + t.n + "</span>", r: '<span class="match-text">Nốt thứ ' + (i + 1) + " từ thấp đến cao</span>" }; });
    }
    function gSortNotes() { return sortQ("Sắp xếp các nốt từ thấp đến cao nhé!", ["Đô", "Rê", "Mi", "Pha", "Son"]); }
    function gTFNotes() {
      var rounds = [];
      for (var k = 0; k < 3; k++) {
        var i = rand(0, 3), truth = Math.random() < 0.5;
        var lo = NOTES1[i].n, hi = NOTES1[i + 1].n;
        var stmt = truth ? ("Nốt " + lo + " thấp hơn nốt " + hi) : ("Nốt " + hi + " thấp hơn nốt " + lo);
        rounds.push({ visual: '<div class="big-word">' + lo + " — " + hi + '</div><div class="sentence">' + stmt + "</div>", truth: truth, explain: "Thứ tự từ thấp đến cao: Đô, Rê, Mi, Pha, Son" });
      }
      return tfQ("Đúng hay sai? Nhớ thứ tự Đô – Rê – Mi – Pha – Son nhé!", rounds);
    }
    var MUSIC_FACTS = [
      ["Quốc ca là bài hát thiêng liêng của nước nào?", "Việt Nam", "Nhật Bản", "Hàn Quốc", "Khi hát Quốc ca, em đứng nghiêm trang."],
      ["Bài hát “Lớp Một thân yêu” hát về điều gì?", "Lớp học lớp Một của em", "Biển khơi", "Rừng núi xa", "Bài hát về lớp Một thân yêu."],
      ["Bài hát “Gà gáy” nhắc con gà gáy vào lúc nào?", "Buổi sáng sớm", "Nửa đêm", "Buổi trưa nắng gắt", "Gà gáy báo hiệu buổi sáng."],
      ["Bài “Ngôi sao lấp lánh” — ngôi sao xuất hiện trên bầu trời khi nào?", "Ban đêm", "Ban ngày nắng to", "Lúc trời mưa", "Sao sáng trên bầu trời đêm."],
      ["Bài hát “Vào rừng hoa” đưa em đến đâu?", "Vào rừng ngắm hoa", "Xuống đáy biển", "Lên mặt trăng", "Bài hát về rừng hoa tươi đẹp."],
      ["“Xúc xắc xúc xẻ” là bài hát vui thường hát dịp nào?", "Ngày Tết", "Ngày mưa bão", "Giờ đi ngủ", "Bài hát vui ngày Tết."],
      ["Bài “Cây gia đình” hát về điều gì?", "Gia đình yêu thương", "Cây ngoài đường", "Máy bay", "Bài hát về gia đình."]
    ];
    var AN1_TOPICS = [
      { id: "an1-notes", emoji: "🎼", name: "Nốt nhạc Đô – Rê – Mi", sub: "Chủ đề 1–2 • Nghe nốt, bậc thang âm thanh", pools: { choose: [qNoteListen, qNoteListen, qNoteCompare], blank: [qBlankNote], match: [function () { return matchQ("Nối nốt với vị trí của nó nhé!", notePairs()); }], games: [gSortNotes, gTFNotes, function () { return memQ("Lật thẻ tìm cặp: nốt và vị trí!", notePairs().map(function (p) { return { a: p.l, b: p.r }; })); }] } },
      { id: "an1-sounds", emoji: "🔊", name: "Âm thanh quanh em", sub: "Chủ đề 3–4 • To – nhỏ, cao – thấp, dài – ngắn", pools: { choose: [qNoteCompare, qNoteLoudSoft, qNoteLongShort], blank: [function () { return factBlank(pick([["Âm thanh của tiếng trống trường là âm thanh ___", "to và vang", "rất nhỏ", "im lặng hoàn toàn"], ["Tiếng thì thầm là âm thanh ___", "nhỏ", "rất to", "vang xa"]])); }], match: [function () { return pairsMatch("Nối âm thanh với tính chất của nó nhé!", [["Tiếng trống cái", "To, trầm và vang"], ["Tiếng thì thầm", "Nhỏ và nhẹ"], ["Tiếng chim hót", "Cao và trong"], ["Tiếng nói chuyện bình thường", "Vừa phải"]]); }], games: [factsTF([["Tiếng trống trường là âm thanh to và vang.", "to và vang", "rất nhỏ"], ["Tiếng thì thầm là âm thanh nhỏ.", "nhỏ", "rất to"]]), qNoteListen] } },
      { id: "an1-instruments", emoji: "🥁", name: "Nhạc cụ gõ", sub: "Chủ đề 5–6 • Trống, thanh phách, trai-en-gô", pools: knowledgePools([
          ["Nhạc cụ gõ có hình tam giác bằng kim loại là nhạc cụ nào?", "Trai-en-gô", "Trống cái", "Thanh phách", "Trai-en-gô có hình tam giác kim loại."],
          ["Thanh phách được làm bằng gì và chơi thế nào?", "Hai thanh gỗ gõ vào nhau", "Một mặt da căng", "Dây đàn căng", "Thanh phách là hai thanh gỗ (tre) gõ vào nhau giữ nhịp."],
          ["Trống cái khác trống con ở điểm nào?", "Trống cái to hơn, tiếng trầm và vang hơn", "Trống cái nhỏ hơn nhiều", "Trống cái không có tiếng", "Trống cái to, âm thanh trầm vang."],
          ["Khi chơi trống, em dùng gì để gõ?", "Dùi trống", "Bàn tay trần đập mạnh hết sức", "Cái thước nhựa", "Gõ trống bằng dùi."],
          ["Nhạc cụ gõ giúp bài hát điều gì?", "Giữ nhịp cho bài hát", "Làm bài hát mất nhịp", "Thay lời bài hát", "Nhạc cụ gõ giữ nhịp."],
          ["Nghe tiếng “tùng! tùng!” trầm và vang — đó là nhạc cụ nào?", "Trống cái", "Trai-en-gô", "Thanh phách", "Tiếng trầm vang là trống cái."]
        ], [["Trống cái", "To, tiếng trầm vang"], ["Trống con", "Nhỏ, tiếng gọn"], ["Thanh phách", "Hai thanh gỗ gõ nhau"], ["Trai-en-gô", "Tam giác kim loại"]], "Nối nhạc cụ với đặc điểm của nó nhé!") },
      { id: "an1-songs", emoji: "🎤", name: "Bài hát em yêu", sub: "Chủ đề 7–8 • Bài hát theo chủ đề, Quốc ca", pools: knowledgePools(MUSIC_FACTS, [["Lớp Một thân yêu", "Trường lớp của em"], ["Gà gáy", "Buổi sáng sớm"], ["Ngôi sao lấp lánh", "Bầu trời đêm"], ["Cây gia đình", "Gia đình yêu thương"]], "Nối bài hát với chủ đề của nó nhé!") }
    ];

    /* ---------- MĨ THUẬT 1 (9 chủ đề SGK — gộp 6 bài chơi) ---------- */
    function lineSVG1(type) {
      var inner = "";
      if (type === "thang") inner = '<line x1="10" y1="50" x2="90" y2="50"/>';
      else if (type === "cong") inner = '<path d="M10 72 Q50 8 90 72" fill="none"/>';
      else if (type === "gapkhuc") inner = '<polyline points="8,70 30,28 50,70 70,28 92,70" fill="none"/>';
      else if (type === "xoan") inner = '<path d="M50 50 m-3 0 a3 3 0 1 1 3 3 a7 7 0 1 1 -7 -7 a12 12 0 1 1 12 12 a18 18 0 1 1 -18 -18 a25 25 0 1 1 25 25" fill="none"/>';
      return '<svg class="shape-svg" viewBox="0 0 100 100" role="img" style="color:var(--ink)"><g stroke="currentColor" stroke-width="5" stroke-linecap="round">' + inner + "</g></svg>";
    }
    var LINES1 = [{ id: "thang", name: "Nét thẳng" }, { id: "cong", name: "Nét cong" }, { id: "gapkhuc", name: "Nét gấp khúc" }, { id: "xoan", name: "Nét xoắn" }];
    function qLineName() {
      var t = pick(LINES1);
      var others = shuffle(LINES1.filter(function (x) { return x.id !== t.id; })).slice(0, 2);
      var opts = shuffle([t].concat(others));
      return { prompt: "Đây là nét vẽ gì?", visual: lineSVG1(t.id), options: opts.map(function (o) { return optText(o.name); }), answer: opts.indexOf(t), cols: 3 };
    }
    function qLinePick() {
      var t = pick(LINES1);
      var others = shuffle(LINES1.filter(function (x) { return x.id !== t.id; })).slice(0, 2);
      var opts = shuffle([t].concat(others));
      return { prompt: "Chạm vào " + t.name.toLowerCase() + " nhé!", visual: "", options: opts.map(function (o) { return { html: '<span class="opt-shape">' + lineSVG1(o.id) + "</span>" }; }), answer: opts.indexOf(t), cols: 3 };
    }
    function swatch(hex, name) { return '<span style="display:inline-block;width:46px;height:46px;border-radius:13px;background:' + hex + ';border:3px solid rgba(0,0,0,0.18);vertical-align:middle"></span>' + (name ? '<span class="opt-text" style="margin-left:8px">' + name + "</span>" : ""); }
    var COLORS1 = [{ n: "Đỏ", hex: "#e03131" }, { n: "Vàng", hex: "#ffd43b" }, { n: "Xanh lam", hex: "#4dabf7" }, { n: "Xanh lá", hex: "#51cf66" }, { n: "Cam", hex: "#ff922b" }, { n: "Tím", hex: "#9775fa" }, { n: "Hồng", hex: "#f783ac" }, { n: "Trắng", hex: "#f8f9fa" }, { n: "Đen", hex: "#343a40" }];
    function colorByName(n) { for (var i = 0; i < COLORS1.length; i++) if (COLORS1[i].n === n) return COLORS1[i]; return COLORS1[0]; }
    function colorOpts(ans, wrongNames) {
      var all = shuffle([colorByName(ans)].concat(wrongNames.map(colorByName)));
      return { options: all.map(function (c) { return { html: swatch(c.hex, c.n) }; }), answer: all.indexOf(colorByName(ans)) };
    }
    var OBJECT_COLORS = [["🍎", "Quả táo chín", "Đỏ", ["Vàng", "Xanh lam"]], ["🍌", "Quả chuối chín", "Vàng", ["Đỏ", "Tím"]], ["🍃", "Chiếc lá", "Xanh lá", ["Cam", "Hồng"]], ["🍊", "Quả cam", "Cam", ["Xanh lam", "Đen"]], ["🍇", "Chùm nho chín", "Tím", ["Vàng", "Trắng"]], ["☀️", "Mặt trời", "Vàng", ["Xanh lam", "Đen"]], ["☁️", "Đám mây", "Trắng", ["Đỏ", "Xanh lá"]]];
    function qObjectColor() {
      var o = pick(OBJECT_COLORS);
      var co = colorOpts(o[2], o[3]);
      return { prompt: o[1] + " có màu gì?", visual: '<div class="big-pic">' + o[0] + "</div>", options: co.options, answer: co.answer, cols: 3 };
    }
    function qPaintColor() {
      var o = pick(OBJECT_COLORS);
      var co = colorOpts(o[2], o[3]);
      return { prompt: "Tô màu! Chạm vào màu đúng để tô cho " + o[1].toLowerCase() + " nhé!", visual: '<div class="big-pic" style="filter:grayscale(1);opacity:0.75">' + o[0] + "</div>", options: co.options, answer: co.answer, cols: 3 };
    }
    function gCatchColor() {
      var o = pick(OBJECT_COLORS);
      var items = shuffle([colorByName(o[2])].concat(o[3].map(colorByName)).concat([colorByName(pick(["Hồng", "Đen", "Trắng"].filter(function (x) { return x !== o[2] && o[3].indexOf(x) === -1; })))]));
      return catchQ("Bắt màu! Chạm vào màu " + o[2].toLowerCase() + " để tô " + o[1].toLowerCase() + " nhé!", items.map(function (c) { return { html: swatch(c.hex, ""), ok: c.n === o[2] }; }));
    }
    var MT_FACTS_COLOR = [
      ["Ba màu cơ bản trong mĩ thuật là những màu nào?", "Đỏ, vàng, xanh lam", "Đen, trắng, xám", "Cam, tím, hồng", "Đỏ, vàng, xanh lam là ba màu cơ bản."],
      ["Pha màu đỏ với màu vàng được màu gì?", "Màu cam", "Màu tím", "Màu xanh lá", "Đỏ + vàng = cam."],
      ["Pha màu vàng với màu xanh lam được màu gì?", "Màu xanh lá", "Màu cam", "Màu tím", "Vàng + xanh lam = xanh lá."],
      ["Pha màu đỏ với màu xanh lam được màu gì?", "Màu tím", "Màu cam", "Màu xanh lá", "Đỏ + xanh lam = tím."],
      ["Từ các chấm màu, em có thể tạo thành gì?", "Tạo thành hình ảnh em thích", "Không tạo được gì", "Chỉ tạo được tiếng ồn", "Chấm màu tạo nên hình ảnh sáng tạo."],
      ["Muốn vẽ đường thẳng đều, em dùng dụng cụ gì giúp?", "Thước kẻ", "Cục tẩy", "Hồ dán", "Thước giúp kẻ nét thẳng."]
    ];
    var MT1_TOPICS = [
      { id: "mt1-colors", emoji: "🎨", name: "Màu sắc cơ bản", sub: "Chủ đề 1 • Đỏ, vàng, xanh lam; màu của đồ vật", pools: { choose: [qObjectColor, qObjectColor, function () { return factMCQ(pick(MT_FACTS_COLOR.slice(0, 1))); }], blank: [function () { return factBlank(pick(MT_FACTS_COLOR)); }], match: [function () { return matchQ("Nối quả với màu của nó nhé!", shuffle(OBJECT_COLORS.slice()).slice(0, 4).map(function (o) { return { l: '<span class="opt-emoji">' + o[0] + "</span>", r: swatch(colorByName(o[2]).hex, o[2]) }; })); }], games: [gCatchColor, factsTF(MT_FACTS_COLOR)] } },
      { id: "mt1-mix", emoji: "🌈", name: "Pha màu vui", sub: "Chủ đề 2 • Pha màu cơ bản", pools: knowledgePools(MT_FACTS_COLOR.slice(1, 4), [["Đỏ + Vàng", "Cam"], ["Vàng + Xanh lam", "Xanh lá"], ["Đỏ + Xanh lam", "Tím"], ["Đỏ + Trắng", "Hồng"]], "Nối phép pha màu với màu tạo thành nhé!") },
      { id: "mt1-lines", emoji: "✏️", name: "Nét vẽ", sub: "Chủ đề 3 • Nét thẳng, nét cong, nét gấp khúc, nét xoắn", pools: { choose: [qLineName, qLinePick, qLineName], blank: [function () { var t = pick(LINES1); return textBlankQ("Điền tên nét vẽ còn thiếu nhé!", lineSVG1(t.id) + '<div class="sentence">Đây là ' + blankSlot() + "</div>", t.name, LINES1.filter(function (x) { return x.id !== t.id; }).slice(0, 2).map(function (x) { return x.name; })); }], match: [function () { return matchQ("Nối nét vẽ với tên của nó nhé!", LINES1.map(function (t) { return { l: lineSVG1(t.id), r: '<span class="match-text">' + t.name + "</span>" }; })); }], games: [function () { return memQ("Lật thẻ tìm cặp: nét vẽ và tên nét!", LINES1.map(function (t) { return { a: lineSVG1(t.id), b: '<span class="mem-text">' + t.name + "</span>" }; })); }, function () { var t = pick(LINES1); return catchQ("Bắt nét! Chạm vào " + t.name.toLowerCase() + " đang rơi nhé!", shuffle(LINES1.slice()).map(function (x) { return { html: lineSVG1(x.id), ok: x.id === t.id }; })); }] } },
      { id: "mt1-shapes", emoji: "🔷", name: "Hình và khối", sub: "Chủ đề 4 • Hình cơ bản, khối cơ bản", pools: knowledgePools([
          ["Quả bóng có dạng khối gì?", "Khối cầu", "Khối hộp", "Hình tam giác", "Quả bóng dạng khối cầu."],
          ["Hộp quà vuông có dạng khối gì?", "Khối hộp", "Khối cầu", "Hình tròn", "Hộp quà dạng khối hộp."],
          ["Lon nước có dạng khối gì?", "Khối trụ", "Khối cầu", "Hình vuông", "Lon nước dạng khối trụ."],
          ["Mặt trời trong tranh vẽ thường vẽ bằng hình gì?", "Hình tròn", "Hình vuông", "Hình chữ nhật", "Mặt trời vẽ bằng hình tròn."],
          ["Ngôi nhà trong tranh gồm những hình nào?", "Hình vuông, hình tam giác, hình chữ nhật", "Chỉ hình tròn", "Không có hình nào", "Nhà: thân hình vuông/chữ nhật, mái hình tam giác."],
          ["Từ những chấm màu xếp gần nhau, em nhìn thấy gì?", "Thành một hình ảnh", "Chấm biến mất hết", "Chỉ thấy tiếng động", "Chấm màu tạo thành hình."]
        ], [["Quả bóng", "Khối cầu"], ["Hộp quà", "Khối hộp"], ["Lon nước", "Khối trụ"], ["Mặt trời", "Hình tròn"]], "Nối vật với hình/khối của nó nhé!") },
      { id: "mt1-fruits", emoji: "🍓", name: "Hoa quả quanh em", sub: "Chủ đề 5–6 • Màu sắc hoa quả, người thân, em là học sinh", pools: { choose: [qObjectColor, qObjectColor, qPaintColor], blank: [function () { var o = pick(OBJECT_COLORS); return textBlankQ("Điền màu còn thiếu nhé!", '<div class="big-pic">' + o[0] + '</div><div class="sentence">' + o[1] + " có màu " + blankSlot() + "</div>", o[2], o[3]); }], match: [function () { return matchQ("Nối quả với màu của nó nhé!", shuffle(OBJECT_COLORS.slice()).slice(0, 4).map(function (o) { return { l: '<span class="opt-emoji">' + o[0] + "</span>", r: swatch(colorByName(o[2]).hex, o[2]) }; })); }], games: [gCatchColor, factsTF([["Quả táo chín thường có màu đỏ.", "đỏ", "xanh lam"], ["Quả chuối chín có màu vàng.", "vàng", "tím"]])] } },
      { id: "mt1-paint", emoji: "🖌️", name: "Tô màu vui", sub: "Chủ đề 7–9 • Chạm màu đúng để tô hình", pools: { choose: [qPaintColor, qPaintColor, qObjectColor], blank: [function () { var o = pick(OBJECT_COLORS); return textBlankQ("Điền màu cần tô nhé!", '<div class="big-pic" style="filter:grayscale(1);opacity:0.75">' + o[0] + '</div><div class="sentence">Tô ' + o[1].toLowerCase() + " màu " + blankSlot() + "</div>", o[2], o[3]); }], match: [function () { return matchQ("Nối đồ vật với màu cần tô nhé!", shuffle(OBJECT_COLORS.slice()).slice(0, 4).map(function (o) { return { l: '<span class="opt-emoji">' + o[0] + "</span>", r: swatch(colorByName(o[2]).hex, o[2]) }; })); }], games: [gCatchColor, gCatchColor, factsTF([["Pha đỏ với vàng được màu cam.", "cam", "tím"], ["Chiếc lá thường có màu xanh lá.", "xanh lá", "đỏ"]])] } }
    ];

    /* ---------- GIÁO DỤC THỂ CHẤT 1 ---------- */
    var COMMANDS1 = [["Nghiêm!", "Đứng nghiêm", "🧍"], ["Nghỉ!", "Đứng nghỉ", "🚶"], ["Quay trái!", "Quay sang trái", "↩️"], ["Quay phải!", "Quay sang phải", "↪️"]];
    function qCommand() {
      var c = pick(COMMANDS1);
      var others = shuffle(COMMANDS1.filter(function (x) { return x[0] !== c[0]; })).slice(0, 2);
      var opts = shuffle([c].concat(others));
      autoVi(c[0]);
      return { prompt: "Nghe khẩu lệnh “" + c[0] + "” — em phải làm động tác nào?", visual: viBtn(c[0], "📣"),
        options: opts.map(function (o) { return optText(o[2] + " " + o[1]); }), answer: opts.indexOf(c), cols: 3, optStack: true };
    }
    var REFLEX1 = [["ĐỨNG", "🧍"], ["NGỒI", "🪑"]];
    function qReflex() {
      var c = pick(REFLEX1);
      var opts = shuffle(REFLEX1.slice());
      autoVi(c[0] === "ĐỨNG" ? "Đứng!" : "Ngồi!");
      return { prompt: "Trò chơi hiệu lệnh: nghe lệnh và chạm thật nhanh!", visual: '<div class="big-word">' + c[0] + "!</div>" + viBtn(c[0] === "ĐỨNG" ? "Đứng!" : "Ngồi!", "📣"),
        options: opts.map(function (o) { return { html: '<span class="opt-emoji">' + o[1] + '</span><span class="opt-word">' + o[0] + "</span>" }; }), answer: opts.indexOf(c), cols: 2 };
    }
    function gCatchReflex() {
      var c = pick(REFLEX1);
      var items = [c, REFLEX1[0] === c ? REFLEX1[1] : REFLEX1[0], c, REFLEX1[0] === c ? REFLEX1[1] : REFLEX1[0]];
      return catchQ("Bắt hiệu lệnh! Chạm nhanh vào thẻ “" + c[0] + "” nhé!", items.map(function (o) { return { html: '<span class="opt-emoji">' + o[1] + '</span><span class="opt-word">' + o[0] + "</span>", ok: o[0] === c[0] }; }));
    }
    function gTFCommand() {
      var rounds = [];
      for (var k = 0; k < 3; k++) {
        var c = pick(COMMANDS1), truth = Math.random() < 0.5;
        var shown = truth ? c : pick(COMMANDS1.filter(function (x) { return x[0] !== c[0]; }));
        rounds.push({ visual: '<div class="big-word">' + c[0] + '</div><div class="sentence">Lệnh này nghĩa là: ' + shown[1] + "</div>", truth: truth, explain: "Lệnh “" + c[0] + "” nghĩa là " + c[1].toLowerCase() });
      }
      return tfQ("Đúng hay sai? Nhớ khẩu lệnh nhé!", rounds);
    }
    var GDTC1_TOPICS = [
      { id: "pe1-commands", emoji: "📣", name: "Khẩu lệnh và động tác", sub: "Phần 2 • Nghiêm, nghỉ, quay trái, quay phải", pools: { choose: [qCommand, qCommand, function () { return factMCQ(pick([["Khi nghe lệnh “Nghiêm!”, em đứng thế nào?", "Đứng thẳng, hai tay khép sát thân", "Đứng vẹo sang một bên", "Ngồi xuống đất", "Đứng nghiêm: đứng thẳng, mắt nhìn thẳng."]])); }], blank: [function () { return factBlank(pick([["Khi nghe lệnh “Nghiêm!”, em phải ___", "đứng nghiêm", "ngồi xuống", "chạy đi chơi"]])); }], match: [function () { return pairsMatch("Nối khẩu lệnh với động tác nhé!", COMMANDS1.map(function (c) { return [c[0], c[1]]; })); }], games: [gTFCommand, function () { return pairsMemory(COMMANDS1.map(function (c) { return [c[0], c[1]]; })); }] } },
      { id: "pe1-prepare", emoji: "🏃", name: "Chuẩn bị tập luyện", sub: "Phần 1–2 • Thứ tự trước khi tập, khởi động", pools: { choose: [function () { return factMCQ(pick([["Trước khi tập thể dục, em cần làm gì để cơ thể sẵn sàng?", "Khởi động", "Ngủ một giấc", "Ăn thật no", "Khởi động làm nóng cơ thể, tránh chấn thương."], ["Khởi động thường gồm việc nào?", "Xoay các khớp, chạy chậm tại chỗ", "Ngồi yên không động đậy", "Ăn kẹo", "Khởi động: xoay khớp, vận động nhẹ."]])); }], blank: [function () { return factBlank(pick([["Việc đầu tiên trước khi tập là ___ sân tập", "vệ sinh", "làm bẩn", "đổ nước ra"]])); }], match: [function () { return pairsMatch("Nối việc với lúc làm nhé!", [["Vệ sinh sân tập", "Trước khi tập"], ["Khởi động", "Trước khi tập luyện"], ["Tập luyện", "Sau khởi động"], ["Chơi trò chơi vận động", "Cuối buổi tập"]]); }], games: [function () { return sortQ("Sắp xếp các việc theo thứ tự buổi tập nhé!", ["Vệ sinh sân tập", "Chuẩn bị dụng cụ", "Khởi động", "Tập luyện", "Trò chơi"]); }, factsTF([["Khởi động trước khi tập giúp tránh bị đau, chấn thương.", "tránh chấn thương", "làm mệt hơn"]])] } },
      { id: "pe1-safe", emoji: "⛑️", name: "An toàn khi vận động", sub: "Phần 3 • Bơi, đá bóng, sân chơi an toàn", pools: knowledgePools([
          ["Đi bơi, em cần điều gì để an toàn?", "Có người lớn đi cùng và dùng phao", "Đi một mình cho thoải mái", "Bơi ở chỗ nước sâu không có ai", "Bơi phải có người lớn và phao."],
          ["Đá bóng, em nên chơi ở đâu?", "Ở sân bóng hoặc sân chơi rộng", "Giữa lòng đường đông xe", "Trên cầu thang", "Chơi bóng ở sân an toàn."],
          ["Sân ướt trơn sau mưa, em nên làm gì?", "Đi chậm, không chạy nhảy", "Chạy thật nhanh cho vui", "Trượt dài trên sân ướt", "Nơi trơn trượt phải đi chậm."],
          ["Tập thể dục xong, người mệt và nóng, em nên làm gì?", "Nghỉ ngơi và uống nước", "Tắm nước lạnh ngay lập tức", "Chạy tiếp thật nhanh", "Nghỉ ngơi, uống nước sau vận động."],
          ["Thấy bạn ngã khi đang chơi, em nên làm gì?", "Đỡ bạn và gọi người lớn nếu bạn đau", "Cười bạn", "Bỏ đi chơi tiếp", "Giúp bạn khi bạn ngã."]
        ], [["Đi bơi", "Có người lớn và phao"], ["Đá bóng", "Ở sân chơi an toàn"], ["Sân trơn ướt", "Đi chậm, không chạy"], ["Tập xong mệt", "Nghỉ ngơi, uống nước"]], "Nối hoạt động với cách an toàn nhé!") },
      { id: "pe1-reflex", emoji: "⚡", name: "Trò chơi hiệu lệnh", sub: "Phần 3 • Nghe lệnh Đứng / Ngồi, chạm thật nhanh", pools: { choose: [qReflex, qReflex, qCommand], blank: [function () { return factBlank(pick([["Nghe lệnh “Đứng!” thì em phải ___", "đứng dậy thẳng", "ngồi xuống", "nằm xuống"], ["Nghe lệnh “Ngồi!” thì em phải ___", "ngồi xuống", "đứng dậy", "chạy đi"]])); }], match: [function () { return pairsMatch("Nối khẩu lệnh với động tác nhé!", COMMANDS1.map(function (c) { return [c[0], c[1]]; })); }], games: [gCatchReflex, gTFCommand, gCatchReflex] } }
    ];

    /* ---------- HOẠT ĐỘNG TRẢI NGHIỆM 1 (9 chủ đề SGK — gộp 6 bài chơi) ---------- */
    function hdtnTopic(id, emoji, name, sub, facts, pairs) { return { id: id, emoji: emoji, name: name, sub: sub, pools: knowledgePools(facts, pairs, "Nối cho đúng nhé!") }; }
    var HDTN1_TOPICS = [
      hdtnTopic("hd1-hello", "🎒", "Chào năm học mới", "Chủ đề 1 • Làm quen bạn mới, giờ học giờ chơi", [
        ["Ngày đầu đến lớp, gặp bạn mới em nên làm gì?", "Chào bạn và giới thiệu tên mình", "Không nói gì với ai", "Trốn vào một góc", "Chào hỏi giúp em làm quen bạn mới."],
        ["Trong giờ học, em nên làm gì?", "Ngồi học chăm chú, nghe cô giảng", "Chạy nhảy khắp lớp", "Nói chuyện thật to", "Giờ học phải chăm chú."],
        ["Giờ chơi, em chơi với bạn thế nào?", "Chơi vui vẻ, an toàn", "Xô đẩy bạn", "Tranh giành đồ chơi", "Giờ chơi vui vẻ và an toàn."],
        ["Đồ dùng học tập của em, em cần làm gì?", "Giữ gìn và cất gọn gàng", "Vứt lung tung", "Cho bạn làm hỏng cũng được", "Giữ gìn đồ dùng học tập."]
      ], [["Bạn mới", "Chào và làm quen"], ["Giờ học", "Nghe cô giảng bài"], ["Giờ chơi", "Chơi an toàn với bạn"], ["Đồ dùng học tập", "Giữ gìn cẩn thận"]]),
      hdtnTopic("hd1-feelings", "😀", "Em biết yêu thương", "Chủ đề 2 • Cảm xúc vui, buồn; yêu thương mọi người", [
        ["Khuôn mặt cười tươi 😀 thể hiện cảm xúc gì?", "Vui vẻ", "Buồn bã", "Tức giận", "Mặt cười là cảm xúc vui."],
        ["Khuôn mặt 😢 thể hiện cảm xúc gì?", "Buồn, muốn khóc", "Vui vẻ", "Ngạc nhiên thích thú", "Mặt như sắp khóc là buồn."],
        ["Thấy bạn buồn, em nên làm gì?", "Hỏi thăm và động viên bạn", "Cười nhạo bạn", "Bỏ mặc bạn", "Động viên bạn là yêu thương."],
        ["Được bạn giúp đỡ, em nói gì?", "Cảm ơn bạn", "Không nói gì", "Đòi bạn giúp nữa", "Nói cảm ơn khi được giúp."],
        ["Ở nhà, em thể hiện yêu thương bố mẹ bằng việc nào?", "Giúp việc nhỏ và nói lời yêu thương", "Hay đòi hỏi và cáu gắt", "Không nghe lời bố mẹ", "Yêu thương qua việc làm và lời nói."]
      ], [["😀 Khuôn mặt cười", "Vui vẻ"], ["😢 Khuôn mặt buồn", "Buồn bã"], ["Bạn giúp em", "Nói cảm ơn"], ["Bạn buồn", "Động viên bạn"]]),
      hdtnTopic("hd1-school", "🏫", "Truyền thống trường em", "Chủ đề 3 • Kính yêu thầy cô, thân thiện", [
        ["Gặp thầy cô trong trường, em làm gì?", "Đứng nghiêm chào lễ phép", "Chạy tránh đi", "Không chào hỏi", "Chào thầy cô lễ phép."],
        ["Bạn bè trong trường cư xử với nhau thế nào?", "Thân thiện, giúp đỡ nhau", "Hay bắt nạt nhau", "Không chơi với ai", "Thân thiện với bạn bè."],
        ["Năm điều Bác Hồ dạy thiếu nhi có điều nào sau đây?", "Yêu Tổ quốc, yêu đồng bào", "Chỉ cần học giỏi là đủ, không cần ngoan", "Không phải giúp đỡ ai", "Điều 1 Bác Hồ dạy: Yêu Tổ quốc, yêu đồng bào."],
        ["Thầy cô ốm không đến lớp được, em nên làm gì?", "Hỏi thăm và chúc thầy cô mau khoẻ", "Nghịch phá vì không có cô", "Quên luôn thầy cô", "Quan tâm thầy cô là kính yêu."],
        ["Em giữ gìn truyền thống trường bằng việc nào?", "Học tốt, ngoan ngoãn, giữ trường sạch đẹp", "Vẽ bậy lên tường trường", "Làm hỏng cây xanh trong sân", "Học tốt và giữ trường sạch đẹp."]
      ], [["Gặp thầy cô", "Chào lễ phép"], ["Với bạn bè", "Thân thiện, giúp đỡ"], ["Bác Hồ dạy điều 1", "Yêu Tổ quốc, yêu đồng bào"], ["Trường lớp", "Giữ sạch đẹp"]]),
      hdtnTopic("hd1-safe", "🛡️", "An toàn cho em", "Chủ đề 4 • Vui chơi an toàn, phòng tránh bắt nạt", [
        ["Bị bạn lớn bắt nạt, em nên làm gì?", "Báo ngay với thầy cô hoặc người lớn", "Im lặng chịu đựng mãi", "Đánh lại bạn thật mạnh", "Bị bắt nạt hãy báo thầy cô, người lớn."],
        ["Chơi ở sân trường, việc nào là an toàn?", "Chơi ở khu vực dành cho học sinh", "Leo lên mái hiên", "Chạy ra cổng trường một mình", "Chơi ở nơi an toàn trong trường."],
        ["Đồ dùng trong nhà như bếp ga, dao kéo, em nên xử lí thế nào?", "Không tự ý dùng, nhờ người lớn", "Tự ý dùng thử cho biết", "Đưa cho bạn nghịch cùng", "Đồ nguy hiểm phải nhờ người lớn."],
        ["Người lạ cho quà và rủ em đi chơi xa, em làm gì?", "Từ chối và báo người lớn", "Đi theo ngay vì có quà", "Đi nhưng giữ bí mật", "Không đi theo người lạ."],
        ["Thấy bạn bị ngã ở cầu thang, em nên làm gì?", "Đỡ bạn và gọi thầy cô", "Đứng nhìn và cười", "Đi qua mặc kệ", "Giúp bạn và gọi người lớn."]
      ], [["Bị bắt nạt", "Báo thầy cô, người lớn"], ["Người lạ rủ đi", "Từ chối, báo người lớn"], ["Bếp ga, dao kéo", "Không tự ý dùng"], ["Bạn bị ngã", "Đỡ bạn, gọi thầy cô"]]),
      hdtnTopic("hd1-tet", "🧧", "Vui đón mùa xuân", "Chủ đề 5–6 • Quý trọng bản thân, đón Tết", [
        ["Trước Tết, cả nhà thường làm gì?", "Dọn dẹp, trang trí nhà cửa đón Tết", "Để nhà bừa bộn", "Không làm gì cả", "Dọn nhà đón Tết là phong tục đẹp."],
        ["Nhận lì xì và quà Tết, em nói gì?", "Con cảm ơn ạ, con chúc Tết ông bà", "Không nói gì, cầm luôn", "Chê quà ít", "Nhận quà phải cảm ơn và chúc Tết."],
        ["Chúc Tết ông bà, em chúc điều gì?", "Chúc ông bà mạnh khỏe, sống lâu", "Chúc ông bà cho nhiều tiền", "Không cần chúc gì", "Chúc sức khoẻ là lời chúc đẹp nhất."],
        ["Giữ vệ sinh cá nhân mỗi ngày gồm việc nào?", "Rửa tay, đánh răng, tắm gội sạch sẽ", "Cả tuần không tắm", "Không rửa tay trước khi ăn", "Vệ sinh cá nhân giúp em khoẻ mạnh."],
        ["Trời lạnh mùa đông, em chọn trang phục thế nào?", "Áo ấm, khăn, mũ len", "Áo mỏng ba lỗ", "Đồ bơi", "Trang phục phù hợp thời tiết."],
        ["Ăn uống hợp lí là thế nào?", "Ăn đủ bữa, nhiều rau quả, ít kẹo ngọt", "Chỉ ăn kẹo và uống nước ngọt", "Bỏ bữa sáng thường xuyên", "Ăn uống hợp lí giúp em khoẻ."]
      ], [["Trước Tết", "Dọn nhà đón Tết"], ["Nhận lì xì", "Cảm ơn và chúc Tết"], ["Trời lạnh", "Mặc áo ấm"], ["Mỗi ngày", "Vệ sinh cá nhân sạch sẽ"]]),
      hdtnTopic("hd1-env", "🌳", "Cộng đồng và môi trường", "Chủ đề 7–9 • Hàng xóm, quê hương, bảo vệ môi trường", [
        ["Ăn xong chiếc kẹo, vỏ kẹo em bỏ ở đâu?", "Vào thùng rác", "Vứt ra sân trường", "Nhét vào gốc cây", "Bỏ rác đúng nơi quy định."],
        ["Thấy hoa đẹp trong vườn trường, em nên làm gì?", "Ngắm hoa, không ngắt hoa bẻ cành", "Ngắt hết mang về", "Bẻ cành cây chơi", "Không ngắt hoa bẻ cành."],
        ["Dùng nước thế nào là tiết kiệm?", "Khoá vòi nước sau khi dùng", "Để nước chảy tràn cả ngày", "Mở vòi nghịch nước", "Tiết kiệm nước là việc tốt."],
        ["Hàng xóm gặp khó khăn, gia đình em có thể làm gì?", "Giúp đỡ, hỏi thăm", "Mặc kệ không quan tâm", "Chế giễu họ", "Giúp đỡ hàng xóm là tình làng nghĩa xóm."],
        ["Quê hương em đẹp ở những gì?", "Cảnh đồng quê, sông núi và con người thân thiện", "Không có gì đẹp", "Chỉ có nhà cao tầng", "Yêu quê hương tươi đẹp."],
        ["Tưới cây xong, em thấy vòi nước còn chảy, em làm gì?", "Khoá vòi nước lại", "Để chảy tiếp cho mát", "Mở thêm vòi khác", "Khoá vòi nước tiết kiệm nước."]
      ], [["Vỏ kẹo", "Bỏ vào thùng rác"], ["Hoa trong vườn", "Ngắm, không ngắt"], ["Dùng nước xong", "Khoá vòi nước"], ["Hàng xóm khó khăn", "Giúp đỡ, hỏi thăm"]])
    ];

    /* ---------- ĐĂNG KÍ CÁC MÔN MỚI VÀO LỚP 1 ---------- */
    (function () {
      var g1 = GRADES[1];
      if (!g1) return;
      var has = {};
      g1.subjects.forEach(function (s) { has[s.id] = true; });
      function addSubject(subj) { if (!has[subj.id]) { g1.subjects.push(subj); has[subj.id] = true; } }
      addSubject({ id: "g1-tv", emoji: "📖", name: "Tiếng Việt", desc: "Chữ cái • Vần • Dấu thanh • Đọc hiểu", cls: "c-pink", topics: TV1_TOPICS });
      addSubject({ id: "g1-tnxh", emoji: "🌍", name: "Tự nhiên & Xã hội", desc: "Gia đình • Trường học • Sức khoẻ • Thời tiết", cls: "c-leaf", topics: TNXH1_TOPICS });
      addSubject({ id: "g1-dd", emoji: "💛", name: "Đạo đức", desc: "Tình huống ứng xử • 8 chủ đề", cls: "c-sun", topics: DD1_TOPICS });
      addSubject({ id: "g1-an", emoji: "🎵", name: "Âm nhạc", desc: "Nốt nhạc • Nhạc cụ • Bài hát", cls: "c-grape", topics: AN1_TOPICS });
      addSubject({ id: "g1-mt", emoji: "🎨", name: "Mĩ thuật", desc: "Màu sắc • Nét vẽ • Tô màu", cls: "c-sky", topics: MT1_TOPICS });
      addSubject({ id: "g1-gdtc", emoji: "🏃", name: "Giáo dục thể chất", desc: "Khẩu lệnh • Vận động • An toàn", cls: "c-slate", topics: GDTC1_TOPICS });
      addSubject({ id: "g1-hdtn", emoji: "🌟", name: "Hoạt động trải nghiệm", desc: "Cảm xúc • An toàn • Môi trường • Tết", cls: "c-teal", topics: HDTN1_TOPICS });
      /* Sắp xếp đúng thứ tự 9 môn của Lớp 1 */
      var order = ["g1-math", "g1-tv", "g1-eng", "g1-tnxh", "g1-dd", "g1-an", "g1-mt", "g1-gdtc", "g1-hdtn"];
      g1.subjects.sort(function (a, b) { return order.indexOf(a.id) - order.indexOf(b.id); });
      if (typeof profile !== "undefined" && profile && typeof renderSubjects === "function" && currentGrade === 1) renderSubjects();
    })();
    
/* ---------- Câu hỏi thật bổ sung (bảng EXTRA_FACTS_127 của master — phần Lớp 1) ---------- */
Object.assign(window.__EXTRA127 = window.__EXTRA127 || {}, {
  "dd1-care": [
    ["Sau khi chơi ngoài sân về, trước khi ăn em cần làm gì?", "Rửa tay sạch bằng xà phòng", "Ăn ngay cho nóng", "Lau tay vào quần áo", "Rửa tay trước khi ăn giúp phòng bệnh."],
    ["Để giữ cơ thể sạch sẽ, em tắm gội khi nào?", "Tắm gội mỗi ngày", "Một tháng tắm một lần", "Khi nào bẩn lắm mới tắm", "Tắm gội mỗi ngày giúp cơ thể sạch sẽ, khoẻ mạnh."]
  ],
  "dd1-family": [
    ["Bố đi làm về, em đưa cho bố cốc nước mát. Việc làm đó thể hiện điều gì?", "Em quan tâm, yêu thương bố", "Em sợ bố mắng", "Em muốn xin bố quà", "Việc nhỏ chu đáo thể hiện tình yêu thương người thân."],
    ["Khi ăn cơm cùng cả nhà, em nên làm gì?", "Mời ông bà, bố mẹ trước rồi mới ăn", "Gắp hết món ngon về phần mình", "Vừa ăn vừa chạy nhảy", "Ăn cơm lễ phép là nét đẹp trong gia đình."]
  ],
  "dd1-help": [
    ["Thấy bà xách giỏ nặng đi chợ về, em nên làm gì?", "Chạy ra đỡ giỏ giúp bà", "Đứng nhìn bà đi qua", "Đòi bà mua quà cho em", "Giúp đỡ người thân là việc làm tốt."],
    ["Em nhỏ khóc đòi mẹ khi mẹ đang bận nấu ăn, em nên làm gì?", "Chơi cùng và dỗ dành em", "Mặc kệ em khóc", "Mắng em thật to", "Chăm sóc em nhỏ giúp mẹ yên tâm làm việc."]
  ],
  "dd1-rules": [
    ["Chuông vào lớp vang lên, em đang chơi ở sân, em nên làm gì?", "Nhanh chóng vào lớp, ngồi vào chỗ", "Chơi thêm một lúc nữa", "Rủ bạn trốn ở sân", "Vào lớp đúng giờ là thực hiện nội quy."],
    ["Thấy bạn vứt rác ra sân trường, em nên làm gì?", "Nhắc bạn nhặt rác bỏ vào thùng", "Vứt cùng bạn cho vui", "Không quan tâm", "Nhắc nhở nhau giữ trường sạch đẹp."]
  ],
  "dd1-nep": [
    ["Sáng mai đi học, tối nay em nên chuẩn bị gì?", "Soạn sách vở, quần áo cho ngày mai", "Để sáng mai dậy rồi tính", "Không cần chuẩn bị gì", "Chuẩn bị từ tối hôm trước giúp buổi sáng thong thả, không quên đồ."],
    ["Bàn học bừa bộn, khó tìm sách, em nên làm gì?", "Dọn dẹp, xếp sách vở ngăn nắp", "Để nguyên như vậy", "Đổ hết xuống sàn cho rộng", "Ngăn nắp giúp em tìm đồ nhanh và học tốt hơn."]
  ],
  "dd1-self": [
    ["Đến giờ học bài mà ti vi đang chiếu phim hay, em nên làm gì?", "Tắt ti vi, học bài xong mới xem", "Vừa học vừa xem ti vi", "Bỏ học bài để xem phim", "Tự giác làm việc của mình trước khi giải trí."],
    ["Góc học tập của em bị bẩn, em nên làm gì?", "Tự lau dọn góc học tập sạch sẽ", "Đợi mẹ dọn cho", "Học ở chỗ khác cho khỏi dọn", "Việc của mình thì mình tự giác làm."]
  ],
  "dd1-honest": [
    ["Bạn rủ em nói dối cô giáo để trốn trực nhật, em nên làm gì?", "Không nghe theo, làm đúng việc của mình", "Nghe theo bạn cho vui", "Rủ thêm bạn khác nói dối cùng", "Thật thà là đức tính quý, không nói dối dù bạn rủ rê."],
    ["Được điểm chưa tốt, về nhà em nên nói với bố mẹ thế nào?", "Nói thật kết quả và hứa cố gắng hơn", "Nói dối là được điểm cao", "Giấu bài kiểm tra đi", "Nói thật giúp bố mẹ hiểu và giúp em học tốt hơn."]
  ],
  "dd1-safe": [
    ["Chơi đá bóng, quả bóng lăn ra đường đông xe, em nên làm gì?", "Không chạy theo, nhờ người lớn lấy giúp", "Chạy thật nhanh ra nhặt bóng", "Rủ bạn cùng chạy ra", "Ra đường lấy bóng rất nguy hiểm, hãy nhờ người lớn."],
    ["Ở nhà một mình, có người lạ gõ cửa xin vào nhà, em nên làm gì?", "Không mở cửa, gọi điện cho bố mẹ", "Mở cửa mời người lạ vào", "Cho người lạ số điện thoại của bố mẹ ngay", "Không mở cửa cho người lạ khi ở nhà một mình."]
  ],
  "hd1-hello": [
    ["Em quên mang bút chì đi học, em nên làm gì?", "Mượn bạn hoặc thưa với cô giáo", "Ngồi khóc cả buổi", "Lấy bút trong cặp của bạn mà không hỏi", "Khi gặp khó khăn ở lớp, hãy nhờ bạn và thầy cô giúp đỡ."],
    ["Ngồi học trong lớp, em cần giữ gìn điều gì?", "Giữ lớp học sạch sẽ, bàn ghế ngay ngắn", "Vẽ lên bàn cho đẹp", "Để rác trong ngăn bàn", "Lớp học sạch đẹp nhờ mọi bạn cùng giữ gìn."]
  ],
  "hd1-feelings": [
    ["Nhận được quà từ bạn, khuôn mặt em thường thế nào?", "Cười vui vẻ", "Nhăn mặt khó chịu", "Quay mặt đi chỗ khác", "Được nhận quà, em vui và nhớ nói lời cảm ơn."],
    ["Làm bạn buồn, em nên làm gì để bạn vui lại?", "Xin lỗi bạn chân thành", "Giả vờ như không biết", "Đổ lỗi cho bạn khác", "Biết xin lỗi là biết yêu thương bạn bè."]
  ],
  "hd1-school": [
    ["Ngày 20 tháng 11 là ngày lễ gì ở trường?", "Ngày Nhà giáo Việt Nam", "Ngày Tết Trung thu", "Ngày Quốc tế Thiếu nhi", "Ngày 20/11 là ngày tôn vinh thầy cô giáo."],
    ["Thư viện của trường là nơi để em làm gì?", "Đọc sách và mượn sách", "Chạy nhảy vui chơi", "Ăn quà vặt", "Thư viện là nơi đọc sách, cần giữ yên lặng."]
  ],
  "hd1-safe": [
    ["Chơi cầu trượt ở sân chơi, em cần chú ý điều gì?", "Trượt lần lượt, không chen lấn xô đẩy", "Chen lên trượt cùng lúc thật nhiều bạn", "Trèo ngược lên cầu trượt", "Chơi lần lượt, an toàn cho mình và bạn."],
    ["Bị bạn trêu chọc nhiều lần làm em rất buồn, em nên làm gì?", "Nói với thầy cô và bố mẹ", "Im lặng chịu đựng mãi", "Đánh lại bạn", "Hãy tìm người lớn giúp đỡ khi bị bắt nạt."]
  ],
  "hd1-tet": [
    ["Dịp Tết, em giúp bố mẹ việc gì để đón Tết?", "Quét nhà, lau bàn ghế, trang trí cây đào", "Chỉ ngồi chờ ăn bánh chưng", "Làm bừa bộn thêm", "Giúp việc nhà vừa sức là cùng gia đình đón Tết vui."],
    ["Đi chúc Tết nhà người thân, em cần cư xử thế nào?", "Lễ phép chào hỏi, chúc Tết người lớn", "Chạy nhảy ồn ào khắp nhà", "Tự ý lấy đồ ăn trên bàn thờ", "Chúc Tết lễ phép là phong tục đẹp đầu năm."]
  ],
  "hd1-env": [
    ["Thấy bạn ngắt hoa trong vườn trường, em nên làm gì?", "Nhắc bạn không ngắt hoa để hoa đẹp cho mọi người ngắm", "Ngắt hoa cùng bạn", "Hái hết hoa mang về nhà", "Hoa ở trường là của chung, không tự ý ngắt."],
    ["Đánh răng xong, vòi nước còn chảy, em nên làm gì?", "Khoá vòi nước ngay", "Để nước chảy cho vui", "Mở thêm vòi khác", "Khoá vòi nước sau khi dùng là tiết kiệm nước."]
  ],
  "tv1-read1": [["Giờ ra chơi, bạn rủ em chơi cùng, em trả lời thế nào?", "Đồng ý và chơi vui vẻ cùng bạn", "Không thèm chơi với bạn", "Đẩy bạn ra xa", "Chơi cùng bạn giúp em có thêm niềm vui."]],
  "tv1-read2": [["Tối đến, cả nhà ăn cơm xong, em nên làm gì?", "Cùng trò chuyện vui vẻ với gia đình", "Chạy ngay ra đường chơi một mình", "Không nói chuyện với ai", "Gia đình quây quần là lúc ấm áp nhất."]],
  "tv1-read3": [["Cô giáo khen cả lớp học tốt, em cảm thấy thế nào?", "Vui và cố gắng học tốt hơn", "Không quan tâm", "Cho rằng học tốt là việc của bạn khác", "Được khen, em vui và thêm quyết tâm học tập."]],
  "tv1-read4": [["Đánh răng mỗi ngày giúp em điều gì?", "Răng trắng, chắc khoẻ, không sâu răng", "Răng yếu đi", "Không có tác dụng gì", "Đánh răng sáng và tối giúp bảo vệ răng."]],
  "tv1-read5": [["Bạn cho em mượn đồ chơi, em nói gì?", "Cảm ơn bạn và giữ gìn đồ chơi", "Không nói gì, cầm luôn", "Làm hỏng đồ chơi cũng không sao", "Biết ơn và giữ gìn đồ của bạn."]],
  "tv1-read6": [["Mưa xong trời nắng, em nhìn thấy cầu vồng ở đâu?", "Trên bầu trời", "Dưới mặt đất", "Trong nhà", "Cầu vồng xuất hiện trên bầu trời sau cơn mưa."]],
  "tv1-read7": [["Buổi tối, em nhìn lên bầu trời thấy gì?", "Mặt trăng và nhiều ngôi sao", "Mặt trời nắng gắt", "Cầu vồng bảy sắc rõ nhất", "Ban đêm có trăng và sao."]],
  "tv1-read8": [["Thấy đám cháy nhỏ, việc đầu tiên em nên làm là gì?", "Báo ngay cho người lớn và tránh xa đám cháy", "Lại gần xem cháy gì", "Tự lấy nước dội vào ổ điện đang cháy", "An toàn là trên hết: tránh xa và báo người lớn."]],
  "pe1-safe": [
    ["Chơi đu quay, xích đu ở sân chơi, em cần nhớ điều gì?", "Ngồi chắc chắn, không đứng lên khi đang quay", "Đứng trên ghế xích đu cho vui", "Đẩy bạn thật mạnh cho quay nhanh", "Chơi an toàn, không đùa nghịch nguy hiểm."],
    ["Trước khi bơi ở bể bơi, em cần làm gì?", "Khởi động và xuống nước cùng người lớn", "Nhảy ngay xuống chỗ nước sâu", "Đi bơi một mình không ai biết", "Khởi động và có người lớn đi cùng khi bơi."]
  ],
  "mt1-mix": [
    ["Pha màu xanh lam với màu trắng được màu gì?", "Màu xanh lam nhạt (xanh da trời nhạt)", "Màu đen", "Màu đỏ", "Thêm màu trắng làm màu nhạt đi."],
    ["Pha màu đen với màu trắng được màu gì?", "Màu xám", "Màu tím", "Màu xanh lá", "Đen pha trắng tạo màu xám."]
  ]
});
if (typeof __applyExtra127 === "function") __applyExtra127(1);
/* ---------- Bộ sinh biến thể Lớp 1 (gốc: block 7 của master) ---------- */
function g1NextPrev() {
  var n = rand(1, 9), after = Math.random() < 0.5, ans = after ? n + 1 : n - 1;
  return calcMCQ(after ? "Số liền sau của " + n + " là số nào?" : "Số liền trước của " + n + " là số nào?", String(n), ans, 0, 10, (after ? "Số liền sau lớn hơn 1 đơn vị: " : "Số liền trước bé hơn 1 đơn vị: ") + n + (after ? " + 1 = " : " − 1 = ") + ans + ".");
}
function g1WordAddSubRaw() {
  var names = ["Lan", "Minh", "Hoa", "Tuấn", "Mai"], items = [["🍎", "quả táo"], ["🍬", "cái kẹo"], ["🎈", "quả bóng"], ["✏️", "cái bút"], ["🍓", "quả dâu"]];
  var nm = pick(names), it = pick(items), add = Math.random() < 0.5, a, b, ans, story;
  if (add) { a = rand(2, 7); b = rand(1, 10 - a); ans = a + b; story = nm + " có " + a + " " + it[1] + ". Mẹ cho thêm " + b + " " + it[1] + " nữa. Hỏi " + nm + " có tất cả bao nhiêu " + it[1] + "?"; }
  else { a = rand(4, 10); b = rand(1, a - 1); ans = a - b; story = nm + " có " + a + " " + it[1] + ". " + nm + " cho bạn " + b + " " + it[1] + ". Hỏi " + nm + " còn lại bao nhiêu " + it[1] + "?"; }
  var opts = numOptions(ans, 0, 10, 3);
  return { prompt: story, visual: countBox(a, it[0]) + '<div class="expr">' + a + (add ? " + " : " − ") + b + " = ?</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }),
    answer: opts.indexOf(ans), cols: 3 };
}
function g1TensOnes() {
  var t = rand(2, 9), o = rand(1, 9), n = t * 10 + o;
  return mcqQ("Số " + n + " gồm mấy chục và mấy đơn vị?", [o + " chục và " + t + " đơn vị", t + " chục và " + o + " chục"], t + " chục và " + o + " đơn vị", "Số " + n + " có chữ số hàng chục là " + t + ", hàng đơn vị là " + o + ".");
}
function g1WordAddSub100() {
  var names = ["Lan", "Minh", "Hoa", "Tuấn"], a, b, ans, add = Math.random() < 0.5, guard = 0;
  if (add) { do { a = rand(21, 68); b = rand(11, 28); } while (guard++ < 200 && ((a % 10) + (b % 10) >= 10 || Math.floor(a / 10) + Math.floor(b / 10) >= 10)); ans = a + b; }
  else { a = rand(45, 98); do { b = rand(12, a - 15); } while (guard++ < 200 && (b % 10) > (a % 10)); ans = a - b; }
  var story = add ? ("Một cửa hàng hôm qua bán được " + a + " cái bút, hôm nay bán tiếp " + b + " cái bút. Hỏi cả hai ngày cửa hàng bán được bao nhiêu cái bút?")
                  : ("Lớp 1A có " + a + " bạn học sinh, trong đó có " + b + " bạn đi tham quan. Hỏi còn lại bao nhiêu bạn ở trường?");
  var opts = numOptions(ans, 1, 99, 3);
  return { prompt: story, visual: '<div class="expr">' + a + (add ? " + " : " − ") + b + " = ?</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 3 };
}
function g1DayOrder() {
  var i = rand(0, 6), mode = rand(0, 1), ansIdx, prompt;
  if (mode === 0) { ansIdx = (i + 2) % 7; prompt = "Hôm nay là " + DAYS[i] + ". Ngày kia là ngày nào?"; }
  else { ansIdx = (i + 5) % 7; prompt = "Hôm nay là " + DAYS[i] + ". Hôm kia là ngày nào?"; }
  var wrongs = shuffle([0, 1, 2, 3, 4, 5, 6].filter(function (x) { return x !== ansIdx; })).slice(0, 2).map(function (x) { return DAYS[x]; });
  return mcqQ(prompt, wrongs, DAYS[ansIdx], "Đếm thứ tự các ngày trong tuần: " + DAYS.join(" → ") + ".");
}
function g1ShapeSidesMCQ() {
  var s = pick(SHAPES), sides = SHAPE_SIDES[s.id];
  var opts = shuffle([0, 3, 4].filter(function (x) { return x !== sides; }).concat([sides]));
  var all = shuffle([String(sides)].concat([0, 3, 4].filter(function (x) { return x !== sides; }).map(String)));
  return { prompt: s.name + " có mấy cạnh?", visual: shapeSVG(s.id, pick(SHAPE_COLORS)),
    options: all.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: all.indexOf(String(sides)), cols: 3 };
}
function g1CompareWord() {
  var a = rand(11, 60), b = rand(11, 60);
  while (b === a) b = rand(11, 60);
  var bigger = Math.random() < 0.5;
  var q = "Bạn An có " + a + " viên bi, bạn Bình có " + b + " viên bi. Hỏi ai có " + (bigger ? "NHIỀU" : "ÍT") + " bi hơn?";
  var correct = bigger ? (a > b ? "Bạn An" : "Bạn Bình") : (a < b ? "Bạn An" : "Bạn Bình");
  return mcqQ(q, ["Hai bạn bằng nhau", correct === "Bạn An" ? "Bạn Bình" : "Bạn An"], correct, "An có " + a + " viên, Bình có " + b + " viên. " + a + (a > b ? " > " : " < ") + b + ".");
}
(function () {
  if (!GRADES[1]) return;
  GRADES[1].subjects.forEach(function (s) {
    if (s.id !== "g1-eng") return;
    s.topics.forEach(function (t, i) { if (i < UNITS.length) engExtraPush(t, UNITS[i].words, ALL_WORDS); });
  });
  var t;
  t = findTopic127(1, "g1-count10"); if (t) { t.pools.choose.push(g1NextPrev, g1NextPrev); t.pools.blank.push(function () { var s0 = rand(0, 7); var row = [s0, s0 + 1, s0 + 2, s0 + 3].map(function (n, ix) { return ix === 0 ? blankSlot() : '<span class="seq-num">' + n + "</span>"; }).join(""); return numBlankQ("Điền số còn thiếu vào chỗ trống nhé!", '<div class="seq-row">' + row + "</div>", s0, 0, 10); }); }
  t = findTopic127(1, "g1-shapes"); if (t) { t.pools.choose.push(g1ShapeSidesMCQ, g1ShapeSidesMCQ); }
  t = findTopic127(1, "g1-addsub10"); if (t) { t.pools.choose.push(g1WordAddSubRaw, g1WordAddSubRaw); }
  t = findTopic127(1, "g1-compare"); if (t) { t.pools.choose.push(g1CompareWord, g1CompareWord); }
  t = findTopic127(1, "g1-num100"); if (t) { t.pools.choose.push(g1TensOnes, g1TensOnes); }
  t = findTopic127(1, "g1-addsub100"); if (t) { t.pools.choose.push(g1WordAddSub100, g1WordAddSub100); }
  t = findTopic127(1, "g1-time"); if (t) { t.pools.choose.push(g1DayOrder, g1DayOrder); }
})();
/* ---------- Bổ sung chủ đề đặc biệt (block 7, phần 2) (nguyên văn master; chạy qua bộ lọc để chỉ áp dụng cho Lớp 1) ---------- */
(function () {
  var __findOrig = findTopic127;
  findTopic127 = function (gg, id) { return gg === 1 ? __findOrig(gg, id) : null; };
  try {
(function () {
  var t;
  /* Tiếng Việt 2 — Sắp xếp thành câu: thêm dữ kiện + ghép nối + sắp xếp mới */
  t = findTopic127(2, "tv2-sapxep");
  if (t) {
    pushFacts127(t, [
      ["Từ nào trả lời cho câu hỏi “Ở đâu?” trong câu “Em học bài ở lớp”?", "ở lớp", "học bài", "Em", "“Ở lớp” chỉ nơi chốn, trả lời câu hỏi Ở đâu."],
      ["Từ nào trả lời cho câu hỏi “Khi nào?” trong câu “Sáng nay, em đi học sớm”?", "Sáng nay", "đi học", "em", "“Sáng nay” chỉ thời gian, trả lời câu hỏi Khi nào."],
      ["Câu nào là câu kể hoàn chỉnh?", "Chim hót líu lo trên cành cây.", "Trên cành cây.", "Líu lo quá.", "Câu kể hoàn chỉnh có đủ bộ phận chính: ai — làm gì / thế nào."],
      ["Bộ phận “những chú chim” trong câu “Những chú chim hót líu lo” trả lời câu hỏi gì?", "Ai? (Con gì?)", "Làm gì?", "Ở đâu?", "“Những chú chim” là bộ phận trả lời câu hỏi Ai / Con gì."],
      ["Câu “Bạn Lan đang đọc sách” — bộ phận nào trả lời câu hỏi “Làm gì?”?", "đang đọc sách", "Bạn Lan", "sách", "“Đang đọc sách” nêu hoạt động của bạn Lan."],
      ["Để đặt câu hỏi cho bộ phận “ở vườn hoa”, em dùng câu hỏi nào?", "Hoa nở ở đâu?", "Hoa nở khi nào?", "Ai trồng hoa?", "Bộ phận chỉ nơi chốn được hỏi bằng câu hỏi “Ở đâu?”."]
    ]);
    t.pools.match.push(function () { return pairsMatch("Nối bộ phận câu với câu hỏi đúng nhé!", [["Bạn Lan", "Ai?"], ["đang đọc sách", "Làm gì?"], ["ở lớp học", "Ở đâu?"], ["vào buổi sáng", "Khi nào?"]]); });
    t.pools.match.push(function () { return pairsMatch("Nối câu hỏi với ý nó hỏi nhé!", [["Ai?", "Hỏi về người / vật"], ["Làm gì?", "Hỏi về hoạt động"], ["Ở đâu?", "Hỏi về nơi chốn"], ["Khi nào?", "Hỏi về thời gian"]]); });
    t.pools.games.push(function () { return sortQ("Chạm các từ theo thứ tự để thành câu nhé!", ["Những", "chú", "chim", "hót", "líu", "lo"]); });
    t.pools.games.push(function () { return sortQ("Chạm các từ theo thứ tự để thành câu nhé!", ["Em", "rửa", "tay", "trước", "khi", "ăn"]); });
  }
  /* Toán 2 — Thống kê: thêm ghép nối + điền trống từ biểu đồ */
  t = findTopic127(2, "m2-thongke");
  if (t) {
    t.pools.match.push(function () { return pairsMatch("Nối tình huống với cách nói đúng nhé!", [["Túi chỉ có bi đỏ", "Chắc chắn lấy được bi đỏ"], ["Túi có bi đỏ và bi xanh", "Có thể lấy được bi đỏ"], ["Túi không có bi đỏ", "Không thể lấy được bi đỏ"], ["Chưa xem dự báo thời tiết", "Có thể mưa, có thể không"]]); });
    t.pools.blank.push(function () {
      var a = rand(2, 8), b = rand(2, 8);
      var ans = a + b, opts = numOptions(ans, 0, 20, 3);
      return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Nhìn biểu đồ tranh rồi điền tổng số quả!", blankText: String(ans),
        visual: '<div class="chart-box">Táo: ' + emojiRow("🍎", a) + "<br>Chuối: " + emojiRow("🍌", b) + '</div><div class="sentence">Cả hai loại có ' + blankSlot() + " quả</div>",
        options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 3 };
    });
  }
  /* Toán 7 — Dữ liệu và biểu đồ: thêm dữ kiện + ghép nối */
  t = findTopic127(7, "m7-dulieu");
  if (t) { Object.defineProperty(t.pools, "referenceFacts", { value: [["Dữ liệu nào sau đây là dữ liệu định tính?", "Màu sắc yêu thích", "Cân nặng của học sinh", "Số học sinh trong lớp", "Màu sắc mô tả đặc điểm, không phải số đo nên là dữ liệu định tính."], ["Dữ liệu nào sau đây là dữ liệu định lượng?", "Số bạn trong lớp", "Tên các môn học", "Quê quán của các bạn", "Số bạn trong lớp là một số đếm được nên là dữ liệu định lượng."], ["Danh sách tên các loại trái cây thuộc loại dữ liệu nào?", "Dữ liệu định tính", "Dữ liệu định lượng", "Không phải dữ liệu", "Tên các loại trái cây không phải là số nên thuộc dữ liệu định tính."], ["Điểm kiểm tra Toán của học sinh là loại dữ liệu nào?", "Dữ liệu định lượng", "Dữ liệu định tính", "Dữ liệu chữ cái", "Điểm kiểm tra là một số nên là dữ liệu định lượng."], ["Hỏi trực tiếp từng bạn trong lớp để ghi lại sở thích là thu thập dữ liệu bằng cách nào?", "Phỏng vấn trực tiếp", "Quan sát", "Tra cứu trên mạng", "Hỏi và ghi lại câu trả lời của từng người là phương pháp phỏng vấn."], ["Phát phiếu có sẵn câu hỏi cho học sinh điền thông tin là thu thập dữ liệu bằng cách nào?", "Dùng bảng hỏi", "Quan sát", "Đo đạc trực tiếp", "Phiếu gồm các câu hỏi in sẵn cho người được khảo sát điền gọi là bảng hỏi."], ["Đứng ở cổng trường và đếm số xe đi qua là thu thập dữ liệu bằng cách nào?", "Quan sát", "Phỏng vấn", "Dùng bảng hỏi", "Nhìn và ghi lại sự việc đang diễn ra là phương pháp quan sát."], ["Lấy số liệu dân số từ một tài liệu đã công bố là thu thập dữ liệu từ đâu?", "Nguồn dữ liệu có sẵn", "Phỏng vấn người dân", "Làm thí nghiệm", "Số liệu đã có trong tài liệu công bố thuộc nguồn dữ liệu có sẵn."], ["Trong biểu đồ hình quạt tròn, một nhóm chiếm 25% thì hình quạt của nhóm đó chiếm phần nào của hình tròn?", "1/4 hình tròn", "1/2 hình tròn", "1/10 hình tròn", "25% bằng một phần tư nên hình quạt chiếm 1/4 hình tròn."], ["Một lớp có 40 học sinh. Trong biểu đồ quạt, nhóm thích bóng đá chiếm 50%. Nhóm đó có bao nhiêu bạn?", "20 bạn", "10 bạn", "40 bạn", "50% của 40 là 20 nên nhóm thích bóng đá có 20 bạn."], ["Có 300 học sinh, trong đó nhóm đi xe đạp chiếm 20% trên biểu đồ quạt. Nhóm đó có bao nhiêu học sinh?", "60 học sinh", "30 học sinh", "20 học sinh", "20% của 300 là 60 nên nhóm đi xe đạp có 60 học sinh."], ["Trên biểu đồ quạt, nhóm A chiếm 30% và nhóm B chiếm 45%. Hai nhóm chiếm tất cả bao nhiêu phần trăm?", "75%", "65%", "85%", "30% cộng 45% bằng 75%."], ["Trên biểu đồ quạt, nhóm A chiếm 35%, nhóm B chiếm 25%, phần còn lại chiếm bao nhiêu phần trăm?", "40%", "60%", "35%", "Tổng là 100% nên phần còn lại là 100% trừ 35% trừ 25% bằng 40%."], ["Trong biểu đồ đoạn thẳng theo thời gian, trục ngang thường ghi đại lượng nào?", "Thời gian", "Tỉ lệ phần trăm", "Tên các bạn học sinh", "Biểu đồ đoạn thẳng theo thời gian đặt các mốc thời gian trên trục ngang."], ["Biểu đồ đoạn thẳng cho thấy nhiệt độ ngày thứ nhất là 20°C và ngày thứ hai là 26°C. Nhiệt độ đã tăng bao nhiêu độ?", "6°C", "46°C", "20°C", "26 trừ 20 bằng 6 nên nhiệt độ đã tăng 6°C."], ["Trong biểu đồ đoạn thẳng, một đoạn thẳng đi lên cho biết đại lượng thế nào?", "Tăng lên", "Giảm xuống", "Không đổi", "Đoạn thẳng đi lên thể hiện giá trị của đại lượng tăng lên."], ["Trong biểu đồ đoạn thẳng, một đoạn thẳng nằm ngang cho biết điều gì?", "Đại lượng không đổi", "Đại lượng tăng lên", "Đại lượng giảm xuống", "Đoạn nằm ngang cho thấy giá trị của đại lượng giữ nguyên."], ["Dữ liệu không thể hiện bằng số mà mô tả đặc điểm thường thuộc loại nào?", "Dữ liệu định tính", "Dữ liệu định lượng", "Dữ liệu đo lường", "Dữ liệu mô tả đặc điểm, không phải số đo, là dữ liệu định tính."], ["Biểu đồ hình quạt tròn thường dùng để biểu diễn điều gì?", "Tỉ lệ phần trăm của từng phần so với tổng thể", "Sự thay đổi theo thời gian", "Chiều cao của các cột", "Biểu đồ quạt tròn biểu diễn tỉ lệ phần trăm từng phần trong tổng thể."], ["Biểu đồ đoạn thẳng thường dùng để biểu diễn điều gì?", "Sự thay đổi của một đại lượng theo thời gian", "Tỉ lệ phần trăm của các phần", "Tên của các đối tượng", "Biểu đồ đoạn thẳng thích hợp để theo dõi sự thay đổi của đại lượng theo thời gian."]] }); Object.defineProperty(t.pools, "referencePairs", { value: [["Biểu đồ quạt tròn", "Tỉ lệ phần trăm"], ["Biểu đồ đoạn thẳng", "Thay đổi theo thời gian"], ["Biểu đồ cột", "So sánh số liệu"], ["Bảng thống kê", "Ghi số liệu thu thập"], ["Dữ liệu định lượng", "Dữ liệu thể hiện bằng số và đo được"], ["Biểu đồ đoạn thẳng", "Biểu diễn sự thay đổi theo thời gian"], ["Bảng hỏi", "Phiếu câu hỏi dùng để thu thập dữ liệu"]] }); }
  t = findTopic127(7, "m7-dulieu");
  if (t) {
    pushFacts127(t, [
      ["Biểu đồ hình quạt tròn thích hợp để thể hiện điều gì?", "Tỉ lệ phần trăm của các thành phần trong một tổng thể", "Sự thay đổi theo thời gian", "Chiều cao của học sinh", "Biểu đồ quạt thể hiện cơ cấu, tỉ lệ các phần so với toàn thể (100%)."],
      ["Biểu đồ đoạn thẳng thích hợp để thể hiện điều gì?", "Sự thay đổi của một đại lượng theo thời gian", "Tỉ lệ phần trăm các thành phần", "Bản đồ địa lí", "Biểu đồ đoạn thẳng cho thấy xu hướng thay đổi theo thời gian."],
      ["Thu thập dữ liệu bằng cách nào sau đây?", "Phỏng vấn, quan sát, làm thí nghiệm, tra cứu tài liệu", "Đoán mò không cần căn cứ", "Chỉ hỏi một người duy nhất cho mọi vấn đề", "Có nhiều cách thu thập dữ liệu tin cậy."],
      ["Dữ liệu “màu sắc yêu thích của học sinh” thuộc loại nào?", "Dữ liệu định tính", "Dữ liệu định lượng", "Số liệu đo lường", "Định tính là dữ liệu không đo bằng số (màu sắc, tên...)."]
    ]);
    t.pools.match.push(function () { return pairsMatch("Nối loại biểu đồ với công dụng nhé!", [["Biểu đồ quạt tròn", "Tỉ lệ phần trăm"], ["Biểu đồ đoạn thẳng", "Thay đổi theo thời gian"], ["Biểu đồ cột", "So sánh số liệu"], ["Bảng thống kê", "Ghi số liệu thu thập"]]); });
  }
  /* Toán 7 — Tỉ lệ: thêm ghép nối + điền trống tỉ lệ thức */
  t = findTopic127(7, "m7-tile");
  if (t) { Object.defineProperty(t.pools, "referenceFacts", { value: [["Tỉ lệ thức là gì?", "Đẳng thức của hai tỉ số bằng nhau", "Tổng của hai tỉ số", "Hiệu của hai tỉ số", "a/b = c/d là một tỉ lệ thức."], ["Trong tỉ lệ thức a/b = c/d, hai số a và d gọi là gì?", "Hai ngoại tỉ", "Hai trung tỉ", "Hai tử số", "a, d nằm ở hai đầu ngoài nên gọi là ngoại tỉ; b, c là trung tỉ."], ["Trong tỉ lệ thức a/b = c/d, đẳng thức nào luôn đúng?", "a · d = b · c", "a · b = c · d", "a · c = b · d", "Tính chất cơ bản của tỉ lệ thức: tích ngoại tỉ bằng tích trung tỉ."], ["Từ đẳng thức 2 · 6 = 3 · 4, tỉ lệ thức nào dưới đây đúng?", "2/3 = 4/6", "2/4 = 6/3", "3/2 = 4/6", "2/3 = 4/6 vì cùng bằng 2/3 và 2 · 6 = 3 · 4."], ["Tìm x trong tỉ lệ thức x/5 = 6/10.", "x = 3", "x = 12", "x = 30", "10 · x = 5 · 6 = 30 nên x = 3."], ["Tìm x trong tỉ lệ thức 4/x = 8/12.", "x = 6", "x = 3", "x = 24", "8 · x = 4 · 12 = 48 nên x = 6."], ["Nếu a/b = c/d (b, d khác 0) thì tỉ số nào cũng bằng hai tỉ số đã cho?", "(a + c)/(b + d)", "(a · c)/(b · d)", "(a + c)/(b · d)", "Tính chất dãy tỉ số bằng nhau: a/b = c/d = (a + c)/(b + d)."], ["Chia số 30 thành hai phần tỉ lệ với 2 và 3. Phần bé là bao nhiêu?", "12", "18", "10", "Tổng số phần là 5, mỗi phần 6; phần bé 2 · 6 = 12."], ["Hai đại lượng tỉ lệ thuận y và x liên hệ bởi công thức nào?", "y = kx (k khác 0)", "y = k/x", "y = x + k", "Tỉ lệ thuận: y = kx với k là hệ số tỉ lệ."], ["x và y tỉ lệ thuận. Khi x tăng gấp đôi thì y thay đổi thế nào?", "Cũng tăng gấp đôi", "Giảm còn một nửa", "Không thay đổi", "Tỉ lệ thuận: x tăng bao nhiêu lần thì y tăng bấy nhiêu lần."], ["Hai đại lượng tỉ lệ nghịch x và y liên hệ bởi công thức nào?", "x · y = a (a khác 0)", "y = kx", "x + y = a", "Tỉ lệ nghịch: tích x · y luôn bằng hằng số a."], ["x và y tỉ lệ nghịch với hệ số tỉ lệ 12. Khi x = 3 thì y bằng bao nhiêu?", "4", "36", "9", "y = 12/3 = 4."], ["5 người làm xong một việc trong 12 ngày. 10 người (cùng năng suất) làm xong trong bao lâu?", "6 ngày", "24 ngày", "12 ngày", "Số người và thời gian tỉ lệ nghịch: 5 · 12 / 10 = 6 ngày."], ["Với cùng một quãng đường, vận tốc và thời gian chuyển động là hai đại lượng thế nào?", "Tỉ lệ nghịch với nhau", "Tỉ lệ thuận với nhau", "Không liên quan", "v · t = quãng đường không đổi nên v và t tỉ lệ nghịch."], ["y tỉ lệ thuận với x theo hệ số 4. Vậy x tỉ lệ thuận với y theo hệ số nào?", "1/4", "4", "−4", "y = 4x nên x = y/4, hệ số tỉ lệ là 1/4."], ["Tỉ số của hai số 12 và 18 bằng bao nhiêu?", "2/3", "3/2", "1/2", "12/18 rút gọn cho 6 được 2/3."], ["Biết x/3 = y/5 và x + y = 24. Giá trị của x là bao nhiêu?", "9", "15", "12", "Đặt x = 3k, y = 5k; 8k = 24 nên k = 3, x = 9."], ["Ba số tỉ lệ với 1, 2, 3 và có tổng bằng 36. Số lớn nhất là bao nhiêu?", "18", "12", "6", "Tổng số phần 6, mỗi phần 6; số lớn nhất 3 · 6 = 18."]] }); }
  t = findTopic127(7, "m7-tile");
  if (t) {
    t.pools.match.push(function () { return pairsMatch("Nối cho đúng nhé!", [["y = 3x", "Tỉ lệ thuận, hệ số 3"], ["x · y = 12", "Tỉ lệ nghịch, hệ số 12"], ["2/3 = 4/6", "Một tỉ lệ thức đúng"], ["x tăng thì y giảm", "Có thể là tỉ lệ nghịch"]]); });
    t.pools.blank.push(function () {
      var k = rand(2, 6), x = rand(2, 9), ans = k * x, opts = numOptions(ans, 0, 100, 3);
      return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền số còn thiếu! y tỉ lệ thuận với x theo hệ số " + k + ".", blankText: String(ans),
        visual: '<div class="expr">x = ' + x + " thì y = " + blankSlot() + "</div>",
        options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 3 };
    });
  }
  /* Toán 7 — Xác suất: thêm ghép nối */
  t = findTopic127(7, "m7-xacsuat");
  if (t) {
    t.pools.match.push(function () { return pairsMatch("Nối biến cố với loại của nó nhé!", [["Mặt trời mọc phía Đông", "Biến cố chắc chắn"], ["Gieo xúc xắc ra mặt 8 chấm", "Biến cố không thể"], ["Ngày mai trời mưa", "Biến cố ngẫu nhiên"], ["Xác suất biến cố chắc chắn", "Bằng 1"]]); });
  }
  /* Toán 7 — Hình khối: thêm ghép nối + dữ kiện */
  t = findTopic127(7, "m7-hinhkhoi");
  if (t) {
    t.pools.match.push(function () { return pairsMatch("Nối hình với đặc điểm nhé!", [["Hình hộp chữ nhật", "6 mặt là hình chữ nhật"], ["Hình lập phương", "6 mặt là hình vuông bằng nhau"], ["Lăng trụ đứng tam giác", "Hai đáy là tam giác"], ["V = a · b · c", "Thể tích hình hộp chữ nhật"]]); });
    pushFacts127(t, [
      ["Hình lập phương có bao nhiêu mặt, đỉnh, cạnh?", "6 mặt, 8 đỉnh, 12 cạnh", "6 mặt, 6 đỉnh, 10 cạnh", "4 mặt, 8 đỉnh, 12 cạnh", "Hình lập phương: 6 mặt, 8 đỉnh, 12 cạnh."],
      ["Lăng trụ đứng có hai mặt đáy thế nào với nhau?", "Bằng nhau và song song", "Vuông góc nhau", "Không liên quan", "Hai đáy của lăng trụ đứng là hai đa giác bằng nhau, song song."],
      ["Diện tích xung quanh của lăng trụ đứng tính thế nào?", "Chu vi đáy nhân với chiều cao", "Diện tích đáy nhân chiều cao", "Tổng diện tích hai đáy", "Sxq = chu vi đáy × chiều cao."]
    ]);
  }
  /* Tin học 7 — Thuật toán: thêm ghép nối + dữ kiện */
  t = findTopic127(7, "th4");
  if (t) {
    t.pools.match.push(function () { return pairsMatch("Nối thuật toán với đặc điểm nhé!", [["Tìm kiếm tuần tự", "Xét lần lượt từng phần tử"], ["Tìm kiếm nhị phân", "Cần danh sách đã sắp xếp"], ["Sắp xếp nổi bọt", "Đổi chỗ các cặp kề nhau"], ["Danh sách đã sắp xếp", "Điều kiện của tìm kiếm nhị phân"]]); });
    pushFacts127(t, [
      ["Tìm kiếm tuần tự trong danh sách 50 phần tử cần tối đa bao nhiêu lần so sánh (trường hợp xấu nhất)?", "50 lần", "Khoảng 6 lần", "1 lần", "Trường hợp xấu nhất phải xét đến phần tử cuối cùng: 50 lần."],
      ["Vì sao tìm kiếm nhị phân nhanh hơn tìm kiếm tuần tự trên danh sách lớn đã sắp xếp?", "Mỗi lần so sánh loại bỏ được một nửa danh sách", "Vì máy tính chạy nhanh hơn", "Vì không cần so sánh gì cả", "Thu hẹp một nửa mỗi bước giúp số lần so sánh rất ít."],
      ["Thuật toán là gì?", "Dãy các bước rõ ràng, hữu hạn để giải quyết một vấn đề", "Một trò chơi trên máy tính", "Tên một phần mềm", "Thuật toán là trình tự các bước giải quyết vấn đề."]
    ]);
  }
  /* Công nghệ 7 — Trồng trọt: thêm ghép nối thứ tự quy trình */
  t = findTopic127(7, "cn1");
  if (t) {
    t.pools.match.push(function () { return pairsMatch("Nối bước trồng trọt với thứ tự của nó nhé!", [["Làm đất", "Bước 1"], ["Gieo trồng", "Bước 2"], ["Chăm sóc", "Bước 3"], ["Thu hoạch", "Bước 4"]]); });
    t.pools.match.push(function () { return pairsMatch("Nối việc làm với bước trồng trọt nhé!", [["Cày, bừa đất", "Làm đất"], ["Tưới nước, bón phân", "Chăm sóc"], ["Gặt lúa, hái quả", "Thu hoạch"], ["Tra hạt xuống luống", "Gieo trồng"]]); });
    pushFacts127(t, [
      ["Chăm sóc cây trồng gồm những việc chính nào?", "Tưới nước, bón phân, làm cỏ, phòng trừ sâu bệnh", "Chỉ tưới nước một lần duy nhất", "Không cần làm gì sau khi gieo", "Chăm sóc đầy đủ giúp cây sinh trưởng tốt, năng suất cao."],
      ["Giâm cành là cách nhân giống thế nào?", "Cắt một đoạn cành cắm xuống đất để mọc thành cây mới", "Gieo hạt lấy từ quả", "Ghép mắt của cây này vào cây khác", "Giâm cành là nhân giống vô tính bằng đoạn cành."],
      ["Vì sao cần làm đất kĩ trước khi gieo trồng?", "Đất tơi xốp, sạch cỏ dại và mầm bệnh, hạt dễ nảy mầm", "Để ruộng trông đẹp hơn", "Không có lí do đặc biệt", "Làm đất tốt là nền tảng cho cây trồng khoẻ."]
    ]);
  }
  /* Âm nhạc 1 — Nốt nhạc: thêm biến thể nghe đủ 5 nốt, bắt nốt, điền đầu/cuối dãy */
  t = findTopic127(1, "an1-notes");
  if (t) {
    t.pools.choose.push(function () {
      var tt = pick(NOTES1);
      var others = shuffle(NOTES1.filter(function (x) { return x.n !== tt.n; })).slice(0, 2);
      var opts = shuffle([tt].concat(others));
      setTimeout(function () { playNotes(String(tt.f)); }, 420);
      return { prompt: "Nghe nốt nhạc rồi chọn đúng tên nốt nhé! (Đô – Rê – Mi – Pha – Son)", visual: '<button class="speak-btn" data-note="' + tt.f + '" aria-label="Nghe lại nốt nhạc">🎵</button>',
        options: opts.map(function (o) { return optWord(o.n); }), answer: opts.indexOf(tt), cols: 3 };
    });
    t.pools.blank.push(function () {
      var seqs = [[0, 1, 2, 3], [1, 2, 3, 4]];
      var s = pick(seqs), miss = pick([0, 3]), ans = NOTES1[s[miss]];
      var row = s.map(function (ni, ix) { return ix === miss ? blankSlot() : '<span class="seq-num">' + NOTES1[ni].n + "</span>"; }).join("");
      var others = shuffle(NOTES1.filter(function (x) { return x.n !== ans.n && s.indexOf(NOTES1.indexOf(x)) === -1; })).slice(0, 2);
      var opts = shuffle([ans].concat(others));
      return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền nốt còn thiếu theo thứ tự từ thấp đến cao nhé!", blankText: ans.n,
        visual: '<div class="seq-row">' + row + "</div>", options: opts.map(function (o) { return optWord(o.n); }), answer: opts.indexOf(ans), cols: 3 };
    });
    t.pools.games.push(function () {
      var tt = pick(NOTES1);
      var items = shuffle([tt].concat(shuffle(NOTES1.filter(function (x) { return x.n !== tt.n; })).slice(0, 3)));
      return catchQ("Bắt nốt! Chạm vào nốt “" + tt.n + "” đang rơi nhé!", items.map(function (o) { return { html: '<span class="opt-word">' + o.n + "</span>", ok: o === tt }; }));
    });
  }
  /* Mĩ thuật 1 — Nét vẽ: thêm dữ kiện về nét trong đời sống */
  /* Đợt 7: gắn referenceFacts/referencePairs cho 3 chủ đề Kiến thức trống/mỏng sau đợt 6
     (mt1-lines = 0 mục; g1-shapes và m7-dathuc chỉ có mathNotes). collectFacts đọc
     pools.referenceFacts/referencePairs trước mọi nguồn khác; Lớp 1 không qua createBank
     nên ngân hàng câu hỏi Lớp 1 không đổi, m7-dathuc chỉ cộng thêm dữ kiện thật. */
  function attachRef7(t, facts, pairs) {
    if (!t || !t.pools) return;
    if (facts) {
      if (Array.isArray(t.pools.referenceFacts)) { facts.forEach(function (f) { t.pools.referenceFacts.push(f.slice()); }); }
      else Object.defineProperty(t.pools, "referenceFacts", { value: facts });
    }
    if (pairs) {
      if (Array.isArray(t.pools.referencePairs)) { pairs.forEach(function (p) { t.pools.referencePairs.push(p.slice()); }); }
      else Object.defineProperty(t.pools, "referencePairs", { value: pairs });
    }
  }
  t = findTopic127(1, "mt1-lines");
  attachRef7(t, [["Nét thẳng là nét như thế nào?", "Nét đi thẳng một hướng, không uốn cong", "Nét uốn cong mềm mại", "Nét cuộn thành vòng", "Nét thẳng chạy theo một hướng, không cong, không gãy."], ["Nét cong là nét như thế nào?", "Nét uốn mềm, cong như cầu vồng", "Nét thẳng tắp như thước", "Nét gãy thành góc nhọn", "Nét cong uốn lượn mềm mại, không có góc nhọn."], ["Nét gấp khúc là nét như thế nào?", "Nét gồm nhiều đoạn thẳng nối nhau tạo góc", "Nét cuộn tròn nhiều vòng", "Nét cong khép kín", "Các đoạn thẳng nối nhau, đổi hướng ở các góc nên thành nét gấp khúc."], ["Nét xoắn là nét như thế nào?", "Nét cuộn thành nhiều vòng quanh một điểm", "Nét đi thẳng một hướng", "Nét gãy một góc nhọn", "Nét xoắn cuộn vòng dần vào trong như vỏ ốc."], ["Cạnh của thước kẻ là nét gì?", "Nét thẳng", "Nét cong", "Nét xoắn", "Cạnh thước kẻ thẳng tắp nên là nét thẳng."], ["Cầu vồng trên bầu trời là nét gì?", "Nét cong", "Nét thẳng", "Nét gấp khúc", "Cầu vồng uốn cong vòng cung nên là nét cong."], ["Tia chớp trên bầu trời là nét gì?", "Nét gấp khúc", "Nét cong", "Nét xoắn", "Tia chớp gãy khúc, đổi hướng bất ngờ nên là nét gấp khúc."], ["Vỏ ốc có đường nét gì?", "Nét xoắn", "Nét thẳng", "Nét gấp khúc", "Đường nét trên vỏ ốc cuộn vòng nên là nét xoắn."], ["Muốn vẽ sóng biển, em dùng nét gì?", "Nét cong lượn sóng", "Nét thẳng đứng", "Nét chấm rời", "Sóng biển uốn lượn lên xuống nên vẽ bằng nét cong."], ["Muốn vẽ hàng rào, em dùng nhiều nét gì?", "Nét thẳng đứng", "Nét xoắn", "Nét cong kín", "Các thanh hàng rào thẳng đứng, xếp cạnh nhau."], ["Muốn vẽ dãy núi có đỉnh nhọn, em dùng nét gì?", "Nét gấp khúc", "Nét cong tròn", "Nét xoắn", "Đỉnh núi nhọn lên xuống tạo thành nét gấp khúc."], ["Các nét vẽ cơ bản giúp em làm gì?", "Vẽ được mọi hình trong tranh", "Tô màu cho tranh", "Cắt giấy thành hình", "Phối hợp các nét thẳng, cong, gấp khúc, xoắn sẽ vẽ được mọi hình."]], [["Nét thẳng", "Cạnh thước kẻ, đường ray tàu"], ["Nét cong", "Cầu vồng, sóng biển"], ["Nét gấp khúc", "Tia chớp, đỉnh núi nhọn"], ["Nét xoắn", "Vỏ ốc, lò xo"], ["Nét thẳng đứng", "Thân cây, cột nhà"], ["Nét cong kín", "Quả bóng, mặt trời"]]);
  t = findTopic127(1, "g1-shapes");
  attachRef7(t, [["Hình vuông có mấy cạnh và mấy góc?", "4 cạnh bằng nhau và 4 góc vuông", "3 cạnh và 3 góc", "Không có cạnh nào", "Hình vuông có 4 cạnh dài bằng nhau và 4 góc vuông."], ["Hình tròn có đặc điểm gì?", "Không có cạnh, không có góc, cong tròn đều", "Có 4 cạnh thẳng", "Có 3 góc nhọn", "Hình tròn chỉ có một đường cong khép kín bao quanh."], ["Hình tam giác có mấy cạnh và mấy đỉnh?", "3 cạnh và 3 đỉnh", "4 cạnh và 4 đỉnh", "2 cạnh và 2 đỉnh", "Hình tam giác có 3 cạnh, 3 góc và 3 đỉnh."], ["Hình chữ nhật có đặc điểm gì?", "4 góc vuông, các cạnh đối diện bằng nhau", "Có 3 cạnh bằng nhau", "Không có góc vuông nào", "Hình chữ nhật có 4 góc vuông; hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau."], ["Hình nào không có góc: hình tròn hay hình vuông?", "Hình tròn", "Hình vuông", "Cả hai hình đều có góc", "Hình tròn cong đều, không có cạnh và góc; hình vuông có 4 góc."], ["Hình vuông và hình chữ nhật giống nhau ở điểm nào?", "Đều có 4 góc vuông", "Đều có 3 cạnh", "Đều không có góc", "Cả hai hình đều có 4 góc vuông."]], null);
  t = findTopic127(7, "m7-dathuc");
  attachRef7(t, [["Đơn thức là gì?", "Biểu thức chỉ gồm một số, một biến hoặc tích của chúng", "Tổng của hai đa thức", "Một phương trình bậc nhất", "Ví dụ: 5, x, 3xy² đều là đơn thức."], ["Đa thức là gì?", "Tổng của các đơn thức", "Tích của các đơn thức", "Một phân số có mẫu chứa biến", "Mỗi đơn thức trong tổng gọi là một hạng tử của đa thức."], ["Bậc của đơn thức là gì?", "Tổng số mũ của tất cả các biến trong đơn thức", "Số mũ lớn nhất của biến", "Hệ số của đơn thức", "Bậc của đơn thức có hệ số khác 0 là tổng số mũ của các biến."], ["Bậc của đa thức một biến là gì?", "Số mũ lớn nhất của biến trong đa thức đã thu gọn", "Số hạng tử của đa thức", "Hệ số của hạng tử đầu tiên", "Bậc của đa thức là bậc của hạng tử có bậc cao nhất."], ["Hệ số của đơn thức là gì?", "Phần số của đơn thức", "Phần biến của đơn thức", "Số mũ của biến", "Đơn thức gồm phần hệ số (phần số) và phần biến."], ["Thu gọn đa thức là làm gì?", "Cộng gộp các hạng tử đồng dạng lại với nhau", "Nhân các hạng tử với nhau", "Đổi dấu mọi hạng tử", "Đa thức thu gọn là đa thức không chứa hai hạng tử nào đồng dạng."]], null);
  t = findTopic127(1, "mt1-lines");
  if (t) {
    pushFacts127(t, [
      ["Sóng nước trên mặt hồ thường được vẽ bằng nét gì?", "Nét cong uốn lượn", "Nét thẳng đứng", "Nét chấm rời", "Sóng nước mềm mại nên vẽ bằng nét cong."],
      ["Tia nắng mặt trời thường được vẽ bằng nét gì?", "Nét thẳng", "Nét xoắn ốc", "Nét gấp khúc", "Tia nắng là những nét thẳng toả ra từ mặt trời."],
      ["Đường đi của con ốc sên để lại thường là đường nét gì?", "Nét cong", "Nét thẳng", "Nét vuông góc", "Vệt của ốc sên uốn cong mềm mại."],
      ["Hình ngọn núi nhọn thường được vẽ bằng nét gì?", "Nét gấp khúc", "Nét cong tròn", "Nét xoắn", "Đỉnh núi nhọn tạo thành nét gấp khúc."]
    ]);
  }
  /* Mĩ thuật 1 — các chủ đề màu: thêm dữ kiện màu sắc */
  ["mt1-colors", "mt1-fruits", "mt1-paint"].forEach(function (id) {
    var tt = findTopic127(1, id);
    if (tt) pushFacts127(tt, [
      ["Quả cà chua chín có màu gì?", "Màu đỏ", "Màu xanh lam", "Màu tím", "Cà chua chín có màu đỏ tươi."],
      ["Bầu trời trong xanh vào ban ngày có màu gì?", "Màu xanh lam (xanh da trời)", "Màu cam", "Màu đen", "Bầu trời ban ngày có màu xanh lam."],
      ["Lá cây non mới mọc thường có màu gì?", "Màu xanh lá non", "Màu đỏ", "Màu trắng", "Lá non có màu xanh lá tươi."],
      ["Quả bí ngô (bí đỏ) chín có màu gì?", "Màu cam", "Màu xanh lam", "Màu tím", "Bí ngô chín có vỏ màu cam."]
    ]);
  });
})();
  } finally { findTopic127 = __findOrig; }
})();
/* ---------- Bổ sung lần 2 (block 8) (nguyên văn master; chạy qua bộ lọc để chỉ áp dụng cho Lớp 1) ---------- */
(function () {
  var __findOrig = findTopic127;
  findTopic127 = function (gg, id) { return gg === 1 ? __findOrig(gg, id) : null; };
  try {
(function () {
  var t;
  /* Toán 7 — Xác suất (đo được 22): thêm dữ kiện + 3 bộ sinh xác suất mới */
  t = findTopic127(7, "m7-xacsuat");
  if (t) {
    pushFacts127(t, [
      ["Xác suất của một biến cố luôn nằm trong khoảng nào?", "Từ 0 đến 1", "Từ 0 đến 100", "Từ 1 đến 10", "Mọi xác suất đều thoả mãn 0 ≤ P ≤ 1."],
      ["Biến cố có xác suất bằng 0 là biến cố gì?", "Biến cố không thể", "Biến cố chắc chắn", "Biến cố ngẫu nhiên", "Không bao giờ xảy ra nên xác suất bằng 0."],
      ["Gieo một đồng xu cân đối, xác suất xuất hiện mặt sấp là bao nhiêu?", "1/2", "1/3", "1/4", "Đồng xu có 2 mặt như nhau, 1 mặt sấp: 1/2."],
      ["Gieo xúc xắc, xác suất xuất hiện mặt chẵn là bao nhiêu?", "1/2", "1/3", "2/3", "Có 3 mặt chẵn (2, 4, 6) trong 6 mặt: 3/6 = 1/2."],
      ["Công thức tính xác suất của biến cố trong trò chơi đơn giản là gì?", "Số kết quả thuận lợi chia cho tổng số kết quả có thể", "Tổng số kết quả chia cho số kết quả thuận lợi", "Số kết quả thuận lợi nhân tổng số kết quả", "P = (số kết quả thuận lợi) / (tổng số kết quả có thể xảy ra)."]
    ]);
    t.pools.choose.push(g7ProbBag, g7ProbSpin, g7ProbDiv, g7ProbBag, g7ProbSpin, g7ProbDiv);
    t.pools.games.push(function () {
      return tfQ("Đúng hay sai? Nghĩ về xác suất nhé!", shuffle([
        { visual: '<div class="sentence">Xác suất của biến cố chắc chắn bằng 1.</div>', truth: true, explain: "Đúng!" },
        { visual: '<div class="sentence">Xác suất có thể lớn hơn 1.</div>', truth: false, explain: "Sai! Xác suất luôn từ 0 đến 1." },
        { visual: '<div class="sentence">Gieo xúc xắc, xác suất ra mặt 7 chấm bằng 0.</div>', truth: true, explain: "Đúng! Xúc xắc chỉ có mặt 1–6." }
      ]));
    });
  }
  /* Toán 7 — Dữ liệu (đo được 38): thêm điền quạt + đọc biểu đồ cột */
  t = findTopic127(7, "m7-dulieu");
  if (t) {
    t.pools.blank.push(g7PieBlank, g7PieBlank);
    t.pools.choose.push(g7BarMost, g7BarMost);
    pushFacts127(t, [
      ["Số trung bình cộng của dãy số liệu 4; 6; 8; 10 là bao nhiêu?", "7", "6", "8", "(4 + 6 + 8 + 10) : 4 = 28 : 4 = 7."],
      ["Dữ liệu nào sau đây là dữ liệu định lượng?", "Chiều cao của học sinh (cm)", "Màu áo yêu thích", "Tên các môn học", "Định lượng là dữ liệu đo được bằng con số."]
    ]);
  }
  /* Tiếng Việt 2 — Sắp xếp câu: thêm sắp xếp + ghép nối mới */
  t = findTopic127(2, "tv2-sapxep");
  if (t) {
    t.pools.games.push(function () { return sortQ("Chạm các từ theo thứ tự để thành câu nhé!", ["Cô", "giáo", "đang", "giảng", "bài"]); });
    t.pools.games.push(function () { return sortQ("Chạm các từ theo thứ tự để thành câu nhé!", ["Bé", "ngoan", "ngoãn", "chào", "ông", "bà"]); });
    t.pools.match.push(function () { return pairsMatch("Nối mẩu câu với câu hỏi phù hợp nhé!", [["con mèo", "Con gì?"], ["đang ngủ", "Làm gì?"], ["trên sân", "Ở đâu?"], ["lúc trưa", "Khi nào?"]]); });
  }
  /* Toán 2 — Thống kê: thêm dữ kiện chắc chắn/có thể/không thể */
  t = findTopic127(2, "m2-thongke");
  if (t) {
    pushFacts127(t, [
      ["Túi có 5 viên bi, tất cả đều màu đỏ. Em chắc chắn lấy được viên bi màu gì?", "Màu đỏ", "Màu xanh", "Màu vàng", "Cả túi chỉ có bi đỏ nên chắc chắn lấy được bi đỏ."],
      ["Ngày mai trời có thể mưa. Từ nào chỉ khả năng trong câu này?", "có thể", "chắc chắn", "không thể", "“Có thể” nói về việc chưa chắc chắn xảy ra."],
      ["Cá có thể sống ở đâu?", "Dưới nước", "Trên cây", "Trên bầu trời", "Cá sống dưới nước, không thể sống trên cây hay bầu trời."],
      ["Khi đếm số ô trong biểu đồ tranh, mỗi hình vẽ tượng trưng cho mấy vật?", "Thường là 1 vật (theo chú thích)", "Luôn là 10 vật", "Không tượng trưng gì cả", "Đọc chú thích của biểu đồ: thường mỗi hình là 1 vật."]
    ]);
  }
  /* Mĩ thuật 1 — Pha màu: thêm dữ kiện làm nhạt/đậm màu */
  t = findTopic127(1, "mt1-mix");
  if (t) {
    pushFacts127(t, [
      ["Muốn màu đỏ nhạt đi (sáng hơn), em pha thêm màu gì?", "Màu trắng", "Màu đen", "Màu xanh lá", "Pha thêm trắng làm màu nhạt và sáng hơn."],
      ["Muốn một màu trở nên đậm và tối hơn, em pha thêm ít màu gì?", "Màu đen", "Màu trắng", "Màu vàng", "Pha thêm đen (một ít) làm màu đậm, tối hơn."],
      ["Màu hồng là màu đỏ pha với màu gì?", "Màu trắng", "Màu xanh lam", "Màu đen", "Đỏ + trắng = hồng."],
      ["Tranh vẽ ban đêm thường dùng gam màu gì?", "Màu tối, trầm", "Màu thật sáng chói", "Chỉ màu đỏ", "Ban đêm ít sáng nên tranh dùng màu tối như xanh đậm, tím, đen."]
    ]);
  }
  /* Mĩ thuật 1 — Nét vẽ: thêm dữ kiện nét trong tranh */
  t = findTopic127(1, "mt1-lines");
  if (t) {
    pushFacts127(t, [
      ["Hình cầu vồng sau mưa thường được vẽ bằng nét gì?", "Nét cong", "Nét thẳng đứng", "Nét chấm", "Cầu vồng cong vòng cung trên bầu trời."],
      ["Đường ray xe lửa gồm hai đường nét gì song song?", "Nét thẳng", "Nét xoắn ốc", "Nét cong tròn", "Đường ray là hai nét thẳng chạy song song."],
      ["Khi vẽ tóc xoăn, em dùng nét gì?", "Nét cong, xoắn", "Nét thẳng", "Nét vuông", "Tóc xoăn uốn lượn nên vẽ bằng nét cong, xoắn."]
    ]);
  }
  /* Âm nhạc 1 — Nốt nhạc: thêm ghép nối thứ tự nốt + lật thẻ */
  t = findTopic127(1, "an1-notes");
  if (t) {
    t.pools.match.push(function () { return pairsMatch("Nối nốt nhạc với vị trí của nó từ thấp đến cao nhé!", [["Đô", "Nốt thứ 1"], ["Rê", "Nốt thứ 2"], ["Mi", "Nốt thứ 3"], ["Pha", "Nốt thứ 4"]]); });
    t.pools.games.push(function () {
      return memQ("Lật thẻ tìm cặp nốt giống nhau nhé!", NOTES1.slice(0, 4).map(function (n) {
        return { a: '<span class="mem-word">' + n.n + "</span>", b: '<span class="mem-word">' + n.n + "</span>" };
      }));
    });
  }
  /* GDTC 1 — Phản xạ hiệu lệnh: thêm dữ kiện đội hình đội ngũ */
  t = findTopic127(1, "pe1-reflex");
  if (t) {
    pushFacts127(t, [
      ["Khi nghe hiệu lệnh “Nghiêm!”, em phải làm gì?", "Đứng thẳng, hai tay khép sát thân", "Ngồi xuống nghỉ", "Chạy quanh sân", "Đứng nghiêm là đứng thẳng, mắt nhìn thẳng, tay khép."],
      ["Khi nghe “Nghỉ!”, em được làm gì?", "Đứng thoải mái tại chỗ, không rời hàng", "Chạy đi chơi", "Nằm xuống sân", "Nghỉ là đứng thả lỏng tại chỗ, vẫn giữ hàng."],
      ["Khi tập hợp hàng dọc, các bạn đứng thế nào?", "Đứng sau lưng bạn phía trước, thẳng hàng", "Đứng vòng tròn", "Đứng tuỳ ý", "Hàng dọc: bạn sau đứng thẳng sau bạn trước."],
      ["Nghe hiệu lệnh “Quay phải — quay!”, em quay về phía nào?", "Phía bên phải", "Phía bên trái", "Quay ra sau", "Làm đúng theo phía được hô trong hiệu lệnh."]
    ]);
  }
})();
  } finally { findTopic127 = __findOrig; }
})();
/* ---------- Bộ sinh Lớp 1 (gốc: block 9 của master) ---------- */
function g1ShapeCorners() {
  var s = pick(SHAPES), sides = SHAPE_SIDES[s.id];
  var all = shuffle([String(sides)].concat([0, 3, 4].filter(function (x) { return x !== sides; }).map(String)));
  return { prompt: s.name + " có mấy góc?", visual: shapeSVG(s.id, pick(SHAPE_COLORS)),
    options: all.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: all.indexOf(String(sides)), cols: 3 };
}
function g1CountShapeRow() {
  var target = pick(SHAPES), total = rand(5, 7), cnt = rand(1, 3), row = [];
  for (var i = 0; i < cnt; i++) row.push(target.id);
  while (row.length < total) { var o = pick(SHAPES); if (o.id !== target.id) row.push(o.id); }
  row = shuffle(row);
  var visual = '<div class="seq-row">' + row.map(function (id) { return shapeSVG(id, pick(SHAPE_COLORS)); }).join("") + "</div>";
  var opts = numOptions(cnt, 0, 7, 3);
  return { prompt: "Đếm xem có bao nhiêu " + target.name.toLowerCase() + " trong hàng nhé!", visual: visual,
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(cnt), cols: 3 };
}
function g1SidesBlank() {
  var s = pick(SHAPES), sides = SHAPE_SIDES[s.id];
  var opts = shuffle([String(sides)].concat([0, 3, 4].filter(function (x) { return x !== sides; }).map(String)));
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Điền số cạnh còn thiếu nhé!", blankText: String(sides),
    visual: shapeSVG(s.id, pick(SHAPE_COLORS)) + '<div class="sentence">' + s.name + " có " + blankSlot() + " cạnh</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(String(sides)), cols: 3 };
}
/* ---------- Bổ sung lần 3 (block 9) (nguyên văn master; chạy qua bộ lọc để chỉ áp dụng cho Lớp 1) ---------- */
(function () {
  var __findOrig = findTopic127;
  findTopic127 = function (gg, id) { return gg === 1 ? __findOrig(gg, id) : null; };
  try {
(function () {
  var t;
  /* Ngữ văn 7 — Bài 1 (cặp ghép nối trùng tác giả nên không suy được dữ kiện) */
  t = findTopic127(7, "nv1");
  if (t) {
    pushFacts127(t, [
      ["“Đất rừng phương Nam” là tiểu thuyết nổi tiếng của nhà văn nào?", "Đoàn Giỏi", "Nguyễn Quang Thiều", "Võ Quảng", "Đất rừng phương Nam — Đoàn Giỏi, viết về vùng đất U Minh."],
      ["Nhân vật An trong “Đi lấy mật” vào rừng ở vùng nào?", "Rừng U Minh", "Rừng Trường Sơn", "Đồng bằng Bắc Bộ", "Bối cảnh là rừng U Minh (Cà Mau) trong Đất rừng phương Nam."],
      ["“Ngàn sao làm việc” thuộc thể loại nào?", "Thơ", "Truyện ngắn", "Tuỳ bút", "Đây là bài thơ của Võ Quảng."],
      ["Bài 1 Ngữ văn 7 (Bầu trời tuổi thơ) gồm những văn bản nào?", "Bẩy chim chìa vôi; Đi lấy mật; Ngàn sao làm việc", "Đồng dao mùa xuân; Trở gió", "Quê hương; Người thầy đầu tiên", "Ba văn bản của Bài 1 gắn với chủ điểm Bầu trời tuổi thơ."],
      ["Truyện “Bẩy chim chìa vôi” gợi lên điều gì ở người đọc?", "Tình yêu thiên nhiên và kỉ niệm tuổi thơ trong trẻo", "Không khí chiến trận", "Cảnh sinh hoạt thành phố hiện đại", "Tác phẩm viết về tuổi thơ gắn bó với thiên nhiên đồng quê."],
      ["“Đi lấy mật” cho thấy nghề lấy mật ong rừng là công việc thế nào?", "Vất vả, đòi hỏi kinh nghiệm và lòng dũng cảm", "Nhàn nhã, ai cũng làm được", "Chỉ làm trong nhà kính", "Nghề gác kèo ong ở U Minh rất vất vả, nguy hiểm."]
    ]);
    t.pools.match.push(function () { return pairsMatch("Nối thể loại với tác phẩm nhé!", [["Truyện ngắn", "Bẩy chim chìa vôi"], ["Tiểu thuyết", "Đất rừng phương Nam"], ["Bài thơ", "Ngàn sao làm việc"], ["Đoạn trích tiểu thuyết", "Đi lấy mật"]]); });
  }
  /* Tin học 7 — Thuật toán: thêm dữ kiện + bộ sinh mô phỏng */
  t = findTopic127(7, "th4");
  if (t) {
    pushFacts127(t, [
      ["Trong sơ đồ khối, hình thoi thể hiện bước nào?", "Kiểm tra điều kiện (rẽ nhánh)", "Bắt đầu thuật toán", "In kết quả", "Hình thoi dùng cho bước kiểm tra điều kiện đúng/sai."],
      ["Trong sơ đồ khối, hình ô-van thể hiện điều gì?", "Bắt đầu hoặc kết thúc thuật toán", "Phép tính", "Nhập dữ liệu", "Ô-van (hình bầu dục) đánh dấu điểm bắt đầu/kết thúc."],
      ["Một thuật toán đúng phải có tính chất nào sau đây?", "Dừng sau một số hữu hạn bước và cho kết quả đúng", "Chạy mãi không dừng", "Không cần dữ liệu đầu vào", "Tính dừng và tính đúng đắn là yêu cầu cơ bản của thuật toán."],
      ["“Dữ liệu đầu vào” của một thuật toán là gì?", "Thông tin ban đầu được đưa vào để xử lí", "Kết quả cuối cùng in ra", "Tên của thuật toán", "Input là dữ liệu ban đầu; output là kết quả sau xử lí."]
    ]);
    t.pools.choose.push(g7SeqSearch, g7BubbleSwaps, g7BinarySteps, g7SeqSearch, g7BubbleSwaps, g7BinarySteps);
  }
  /* Công nghệ 7 — Trồng trọt: thêm dữ kiện + sắp xếp quy trình + đúng/sai */
  t = findTopic127(7, "cn1");
  if (t) {
    pushFacts127(t, [
      ["Ngành trồng trọt có vai trò quan trọng nhất là gì?", "Cung cấp lương thực, thực phẩm cho con người", "Sản xuất máy móc nông nghiệp", "Khai thác khoáng sản", "Trồng trọt cung cấp lúa gạo, rau quả... cho đời sống."],
      ["Trồng cây trong nhà kính, nhà màng có ưu điểm gì?", "Chủ động được mùa vụ, hạn chế sâu bệnh và thời tiết xấu", "Không cần tưới nước bao giờ", "Cây không cần ánh sáng", "Nhà màng/nhà kính giúp kiểm soát môi trường trồng."],
      ["Biện pháp phòng trừ sâu bệnh nào thân thiện với môi trường?", "Dùng thiên địch và bẫy sinh học", "Phun thuốc hoá học càng nhiều càng tốt", "Đốt rơm rạ trên đồng", "Biện pháp sinh học an toàn cho môi trường và sức khoẻ."],
      ["Trồng trọt ngoài trời phụ thuộc nhiều vào yếu tố nào?", "Thời tiết, khí hậu tự nhiên", "Giá điện", "Màu sắc nhà kính", "Cây ngoài trời chịu tác động trực tiếp của nắng, mưa."],
      ["Sau khi thu hoạch, nông sản cần được làm gì để giữ chất lượng?", "Sơ chế và bảo quản đúng cách (phơi, sấy, để nơi khô thoáng)", "Để ngoài mưa nắng nhiều ngày", "Trộn lẫn với nông sản hỏng", "Bảo quản đúng cách giúp nông sản lâu hỏng, giữ giá trị."]
    ]);
    t.pools.games.push(function () { return sortQ("Sắp xếp các bước trồng trọt theo đúng thứ tự nhé!", ["Làm đất", "Gieo trồng", "Chăm sóc", "Thu hoạch"]); });
    t.pools.games.push(function () {
      return tfQ("Đúng hay sai? Nghĩ về trồng trọt nhé!", shuffle([
        { visual: '<div class="sentence">Làm đất là bước đầu tiên trong quy trình trồng trọt.</div>', truth: true, explain: "Đúng! Làm đất → gieo trồng → chăm sóc → thu hoạch." },
        { visual: '<div class="sentence">Thu hoạch xong mới cần gieo trồng.</div>', truth: false, explain: "Sai! Phải gieo trồng trước, thu hoạch là bước cuối." },
        { visual: '<div class="sentence">Giâm cành là một cách nhân giống vô tính.</div>', truth: true, explain: "Đúng! Giâm, chiết, ghép đều là nhân giống vô tính." }
      ]));
    });
  }
  /* Toán 2 — Ki-lô-gam và Lít */
  t = findTopic127(2, "m2-kg-lit");
  if (t) {
    pushFacts127(t, [
      ["Đơn vị đo khối lượng em được học ở lớp 2 là gì?", "Ki-lô-gam (viết tắt: kg)", "Mét (m)", "Lít (l)", "Khối lượng đo bằng ki-lô-gam, viết tắt kg."],
      ["Đơn vị đo dung tích em được học là gì?", "Lít (viết tắt: l)", "Ki-lô-gam (kg)", "Xăng-ti-mét (cm)", "Dung tích (sức chứa) đo bằng lít, viết tắt l."],
      ["Một lít nước nặng khoảng bao nhiêu ki-lô-gam?", "Khoảng 1 kg", "Khoảng 10 kg", "Khoảng 100 g", "1 lít nước ≈ 1 kg."],
      ["Bao gạo nào nặng hơn: bao 7 kg hay bao 9 kg?", "Bao 9 kg", "Bao 7 kg", "Hai bao bằng nhau", "9 > 7 nên bao 9 kg nặng hơn."],
      ["Một can chứa 5 lít dầu, rót thêm 3 lít nữa. Can có bao nhiêu lít dầu?", "8 lít", "7 lít", "2 lít", "5 + 3 = 8 (lít)."],
      ["Để biết mình nặng bao nhiêu ki-lô-gam, em dùng dụng cụ gì?", "Cái cân", "Thước kẻ", "Ca đong", "Cân dùng để đo khối lượng."]
    ]);
    t.pools.match.push(function () { return pairsMatch("Nối dụng cụ / đơn vị với việc đo nhé!", [["Cân đĩa", "Đo khối lượng"], ["Ca đong có vạch chia", "Đo dung tích"], ["1 kg", "Ki-lô-gam"], ["1 l", "Lít"]]); });
  }
  /* Toán 2 — Khối trụ, khối cầu */
  t = findTopic127(2, "m2-khoi");
  if (t) {
    pushFacts127(t, [
      ["Khối cầu có đặc điểm gì nổi bật?", "Lăn được về mọi phía, không có mặt phẳng", "Có 6 mặt phẳng", "Có hai mặt đáy là hình tròn", "Quả bóng là khối cầu: lăn được mọi hướng."],
      ["Hai mặt đáy của khối trụ là hình gì?", "Hình tròn", "Hình vuông", "Hình tam giác", "Khối trụ có hai mặt đáy tròn bằng nhau."],
      ["Vật nào sau đây có dạng khối trụ?", "Lon nước ngọt", "Quả bóng đá", "Hộp quà hình vuông", "Lon nước có dạng khối trụ."],
      ["Khối hộp chữ nhật có bao nhiêu mặt?", "6 mặt", "4 mặt", "8 mặt", "Khối hộp chữ nhật có 6 mặt, đều là hình chữ nhật."],
      ["Quả địa cầu trong lớp học có dạng khối gì?", "Khối cầu", "Khối trụ", "Khối hộp chữ nhật", "Quả địa cầu tròn như quả bóng: khối cầu."],
      ["Con xúc xắc có dạng khối gì?", "Khối lập phương", "Khối cầu", "Khối trụ", "Xúc xắc là khối lập phương với 6 mặt vuông bằng nhau."]
    ]);
    t.pools.match.push(function () { return pairsMatch("Nối đồ vật với khối của nó nhé!", [["Quả bóng đá", "Khối cầu"], ["Lon sữa", "Khối trụ"], ["Hộp sữa giấy", "Khối hộp chữ nhật"], ["Con xúc xắc", "Khối lập phương"]]); });
  }
  /* Tiếng Việt 2 — Sắp xếp thành câu */
  t = findTopic127(2, "tv2-sapxep");
  if (t) {
    pushFacts127(t, [
      ["Trong câu “Em bé đang ngủ say”, bộ phận “đang ngủ say” trả lời câu hỏi gì?", "Làm gì?", "Ai?", "Ở đâu?", "“Đang ngủ say” nêu hoạt động của em bé."],
      ["Để hỏi về nơi chốn trong câu “Em học bài ở thư viện”, em hỏi thế nào?", "Em học bài ở đâu?", "Em học bài khi nào?", "Ai học bài?", "Bộ phận “ở thư viện” chỉ nơi chốn → hỏi “Ở đâu?”."]
    ]);
    t.pools.games.push(function () { return sortQ("Chạm các từ theo thứ tự để thành câu nhé!", ["Bố", "em", "đang", "đọc", "báo"]); });
  }
  /* Toán 1 — Hình phẳng */
  t = findTopic127(1, "g1-shapes");
  if (t) { t.pools.choose.push(g1ShapeCorners, g1CountShapeRow, g1ShapeCorners, g1CountShapeRow); t.pools.blank.push(g1SidesBlank, g1SidesBlank); }
  /* GDTC 1 — Chuẩn bị tập luyện */
  t = findTopic127(1, "pe1-prepare");
  if (t) {
    pushFacts127(t, [
      ["Trước khi tập thể dục, việc đầu tiên em cần làm là gì?", "Khởi động các khớp", "Chạy thật nhanh ngay", "Ngồi nghỉ luôn", "Khởi động giúp cơ thể ấm lên, tránh bị đau khi tập."],
      ["Khi khởi động, em thường xoay những khớp nào?", "Cổ tay, cổ chân, vai và gối", "Chỉ xoay ngón tay", "Không cần xoay khớp nào", "Xoay đều các khớp chính trước khi vận động."],
      ["Sau khi tập thể dục xong, em nên làm gì?", "Đi lại nhẹ nhàng, thả lỏng cơ thể", "Ngồi xuống ngay và không cử động", "Chạy thêm thật nhanh", "Thả lỏng sau khi tập giúp cơ thể hồi phục."]
    ]);
  }
})();
  } finally { findTopic127 = __findOrig; }
})();
/* ---------- Công thức và cách làm (Toán) của Lớp 1 — tách từ bảng ghi chú chung của master ---------- */
window.__MATH_KNOWLEDGE_NOTES = window.__MATH_KNOWLEDGE_NOTES || {};
Object.assign(window.__MATH_KNOWLEDGE_NOTES, {
"g1-count10": ["Các số 0, 1, 2, …, 10 viết và đọc theo thứ tự từ bé đến lớn.","Số 0 chỉ không có vật nào. Khi đếm, vật đếm cuối cùng cho biết có tất cả bao nhiêu vật."],
"g1-shapes": ["Hình vuông có 4 cạnh bằng nhau và 4 góc vuông.","Hình chữ nhật có 4 góc vuông, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.","Hình tam giác có 3 cạnh, 3 góc; hình tròn không có cạnh, không có góc."],
"g1-addsub10": ["Phép cộng là gộp hai nhóm lại; phép trừ là bớt đi một phần.","Đổi chỗ hai số hạng thì tổng không đổi: a + b = b + a.","Một số trừ đi chính nó bằng 0; một số cộng với 0 thì bằng chính số đó."],
"g1-compare": ["Số nào đếm sau thì lớn hơn; số nào đếm trước thì bé hơn.","Dấu > đọc là “lớn hơn”, dấu < đọc là “bé hơn”, dấu = đọc là “bằng”. Đầu nhọn của dấu luôn chỉ vào số bé hơn."],
"g1-num100": ["Số có hai chữ số gồm hàng chục và hàng đơn vị: 35 = 3 chục + 5 đơn vị.","Số tròn chục: 10, 20, 30, …, 90; số 100 có ba chữ số.","So sánh hai số có hai chữ số: so hàng chục trước, hàng chục lớn hơn thì số lớn hơn."],
"g1-addsub100": ["Cộng, trừ không nhớ: đặt thẳng cột (đơn vị thẳng đơn vị, chục thẳng chục) rồi tính từ hàng đơn vị trước.","Cộng với số tròn chục thì chỉ hàng chục thay đổi, hàng đơn vị giữ nguyên."],
"g1-time": ["Một tuần có 7 ngày: thứ hai, thứ ba, thứ tư, thứ năm, thứ sáu, thứ bảy, chủ nhật.","Kim ngắn chỉ giờ, kim dài chỉ phút; kim phút chỉ vào số 12 là giờ đúng."]
});
  if (typeof __labelGrade127 === "function") __labelGrade127(1);
  if (typeof window.__phaseBProcessGrade === "function") window.__phaseBProcessGrade(1);
  if (typeof window.__phaseCompleteGrade === "function") window.__phaseCompleteGrade(1);
