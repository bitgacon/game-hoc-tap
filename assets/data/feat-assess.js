"use strict";
/*__ASSESS_FEATURE_BEGIN__*/
/* ============================================================
   TÍNH NĂNG "KIỂM TRA, ĐÁNH GIÁ NĂNG LỰC" — Lớp 4–12
   (thông số: KE-HOACH-KIEM-TRA-DANH-GIA-NANG-LUC.md, vu chốt
   2026-10-13 18:18 cho Lớp 4–9; mở rộng lên Lớp 4–12 ở Bước 3 —
   vu chốt 2026-10-14, thông số giữ nguyên — đề theo chủ đề + theo
   môn, ~30 câu, trộn
   70% thường / 30% nâng cao, đồng hồ 45 phút, chấm SAU khi nộp,
   điểm 10 + xếp loại, xem lại mọi câu kèm giải thích, báo cáo
   theo chủ đề với cờ "cần ôn" <60%, lịch sử gameHocTap_assess_v1
   tối đa 50 lượt, KHÔNG cộng sao vào hồ sơ.)
   Khối này chỉ THÊM màn hình + logic vào trang vỏ; dữ liệu lấy từ
   GRADES[g] sau __ensureGrade, dùng lại các hàm lõi của game
   (prepareRoundQuestion / roundQuestionKey / valueKeyOf /
   roundFact / roundText) nên luật trùng đáp án áp dụng nguyên vẹn.
   ============================================================ */
(function () {
  "use strict";
  if (window.__assessInstalled) return;
  window.__assessInstalled = true;

  var TEST_LEN = 30;            /* số câu mục tiêu mỗi đề */
  var STD_TARGET = 21;          /* 70% tầng thường */
  var ADV_TARGET = 9;           /* 30% tầng nâng cao */
  var TEST_SECONDS = 45 * 60;   /* 45 phút cho đề 30 câu */
  var LS_ASSESS = "gameHocTap_assess_v1";
  var MIN_GRADE = 4, MAX_GRADE = 12;

  /* ---------------- CSS riêng (tiền tố as-) ---------------- */
  var css = [
    ".as-wrap{max-width:860px;margin:0 auto;padding:6px 2px 30px}",
    ".as-card{background:var(--card,#fff);border:3px solid var(--line,#f0dfba);border-radius:22px;padding:20px;box-shadow:0 8px 24px rgba(90,70,20,.10);margin-bottom:16px}",
    ".as-card h3{margin:0 0 10px;font-size:21px}",
    ".as-note{font-size:16px;color:var(--ink-soft,#6f675a);font-weight:600;line-height:1.45}",
    ".as-formrow{margin:12px 0}",
    ".as-formrow .field-label{display:block;margin-bottom:6px}",
    ".as-select{width:100%;font-family:inherit;font-size:18px;font-weight:700;padding:12px;border:3px solid var(--line,#f0dfba);border-radius:14px;background:#fffdf6;color:var(--ink,#33302a)}",
    ".as-scope-row{display:flex;gap:10px;flex-wrap:wrap}",
    ".as-scope{flex:1;min-width:200px;text-align:left;border:3px solid var(--line,#f0dfba);background:var(--card,#fff);color:var(--ink,#33302a);border-radius:16px;padding:12px 14px;cursor:pointer;font-family:inherit}",
    ".as-scope .n{font-size:18px;font-weight:800;display:block}",
    ".as-scope .d{font-size:14px;opacity:.75;display:block;margin-top:2px;font-weight:600}",
    ".as-scope.sel{border-color:var(--sun,#ffb703);box-shadow:0 4px 0 var(--sun,#ffb703)}",
    ".subj-card.assess-card{grid-column:1/-1;background:linear-gradient(135deg,#7c5cd6,#9b7ede);min-height:0;padding:16px 12px}",
    ".as-timer{font-size:20px;font-weight:800;background:#fff3d6;border:3px solid var(--sun,#ffb703);border-radius:999px;padding:4px 16px;white-space:nowrap}",
    ".as-timer.warn{background:#ffe1e1;border-color:#e4572e;color:#a33307}",
    ".as-strip{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}",
    ".as-chip{width:38px;height:38px;border-radius:12px;border:2px solid var(--line,#f0dfba);background:#fff;font-family:inherit;font-weight:800;font-size:15px;cursor:pointer;color:var(--ink,#33302a)}",
    ".as-chip.done{background:#dcefe0;border-color:#58a05c}",
    ".as-chip.cur{border-color:var(--sun,#ffb703);box-shadow:0 0 0 3px rgba(255,183,3,.35)}",
    ".options .opt.sel{border-color:#7c5cd6;box-shadow:0 0 0 3px rgba(124,92,214,.30)}",
    ".as-navrow{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}",
    ".as-navrow .big-btn{flex:1;min-width:130px}",
    ".as-confirm{display:none;background:#fff3d6;border:3px solid var(--sun,#ffb703);border-radius:16px;padding:12px 14px;margin-top:12px;font-weight:700;font-size:16px}",
    ".as-confirm.on{display:block}",
    ".as-confirm .row{display:flex;gap:10px;margin-top:10px;flex-wrap:wrap}",
    ".as-score{font-size:clamp(40px,9vw,58px);font-weight:900;line-height:1.05}",
    ".as-level{display:inline-block;font-size:20px;font-weight:800;border-radius:999px;padding:5px 18px;background:#eef7ee;border:2px solid #58a05c;margin-top:6px;color:#33302a}",
    ".as-table{width:100%;border-collapse:collapse;font-size:16px;font-weight:600}",
    ".as-table th,.as-table td{border-bottom:2px solid var(--line,#f0dfba);padding:8px 6px;text-align:left;vertical-align:top}",
    ".as-flag{display:inline-block;background:#ffe1e1;border:2px solid #e4572e;color:#a33307;border-radius:999px;padding:1px 10px;font-size:13px;font-weight:800;margin-left:6px;white-space:nowrap}",
    ".as-oktag{display:inline-block;background:#e6f4e8;border:2px solid #58a05c;color:#256b2c;border-radius:999px;padding:1px 10px;font-size:13px;font-weight:800;margin-left:6px;white-space:nowrap}",
    ".as-mini-btn{border:2px solid var(--line,#f0dfba);background:#fffdf6;border-radius:999px;padding:4px 12px;font-family:inherit;font-weight:800;font-size:14px;cursor:pointer;margin:2px 4px 2px 0;color:var(--ink,#33302a)}",
    ".as-mini-btn:hover{border-color:var(--sun,#ffb703)}",
    ".as-review-item{border:3px solid var(--line,#f0dfba);border-radius:18px;padding:14px 16px;margin-bottom:14px;background:#fff;color:#33302a}",
    ".as-review-item.ok{border-color:#58a05c}",
    ".as-review-item.bad{border-color:#e4572e}",
    ".as-review-item.skip{border-color:#c9b98a}",
    ".as-review-head{font-weight:800;font-size:16px;margin-bottom:6px}",
    ".as-review-head .st-ok{color:#256b2c}.as-review-head .st-bad{color:#a33307}.as-review-head .st-skip{color:#8a6d1a}",
    ".as-optline{border:2px solid var(--line,#f0dfba);border-radius:12px;padding:8px 12px;margin:5px 0;font-weight:600;background:#fffdf6;color:#33302a}",
    ".as-optline.right{border-color:#58a05c;background:#eef7ee}",
    ".as-optline.mine-wrong{border-color:#e4572e;background:#fff0ec}",
    ".as-explain{background:#f4f8ff;border:2px solid #b9cdf5;border-radius:12px;padding:9px 12px;margin-top:9px;font-weight:600;line-height:1.45;color:#33302a}",
    ".as-hist{font-size:15px;font-weight:600;line-height:1.5}",
    ".as-hist li{margin-bottom:5px}",
    ".as-topic-tag{display:inline-block;background:#f3edff;border:2px solid #c9b8f5;color:#4b3485;border-radius:999px;padding:0 10px;font-size:13px;font-weight:800;margin-left:6px}"
  ].join("\n");
  var styleEl = document.createElement("style");
  styleEl.textContent = css;
  (document.head || document.body).appendChild(styleEl);

  /* ---------------- tạo 3 màn hình ---------------- */
  var wrap = document.querySelector(".wrap") || document.body;
  function mkSection(id, html) {
    var s = document.createElement("section");
    s.className = "screen"; s.id = id; s.innerHTML = html;
    wrap.appendChild(s); return s;
  }
  mkSection("scr-test-setup",
    '<div class="topbar"><button class="back-btn" id="as-setup-back" aria-label="Quay lại">⬅️</button>' +
    '<div><h2>📝 Kiểm tra năng lực</h2><div class="sub">Làm bài nghiêm túc như ở lớp — nộp bài xong mới biết điểm nhé!</div></div></div>' +
    '<div class="as-wrap"><div class="as-card">' +
    '<p class="as-note">Mỗi đề gồm <b>30 câu</b> (70% câu thường + 30% câu nâng cao), thời gian làm bài <b>45 phút</b>. ' +
    'Trong lúc làm bài sẽ <b>không</b> báo đúng/sai ngay; nộp bài xong em xem lại được <b>toàn bộ câu hỏi, đáp án đúng và giải thích</b>. ' +
    'Kết quả tính điểm thang 10 và xếp loại, không cộng vào tổng sao luyện tập.</p>' +
    '<div class="as-formrow"><span class="field-label">Dạng đề</span><div class="as-scope-row">' +
    '<button type="button" class="as-scope sel" id="as-scope-topic"><span class="n">📚 Theo chủ đề</span><span class="d">30 câu của đúng một chương/chủ đề em chọn</span></button>' +
    '<button type="button" class="as-scope" id="as-scope-subject"><span class="n">🗂️ Theo môn</span><span class="d">30 câu phủ đều các chủ đề của môn</span></button>' +
    '</div></div>' +
    '<div class="as-formrow"><label class="field-label" for="as-sel-subject">Môn học</label><select class="as-select" id="as-sel-subject"></select></div>' +
    '<div class="as-formrow" id="as-row-topic"><label class="field-label" for="as-sel-topic">Chủ đề</label><select class="as-select" id="as-sel-topic"></select></div>' +
    '<div class="login-err" id="as-setup-err"></div>' +
    '<button class="big-btn primary" id="as-btn-start" style="width:100%">▶️ Bắt đầu làm bài</button>' +
    '</div></div>');

  mkSection("scr-test",
    '<div class="game-top"><button class="back-btn" id="as-btn-quit" aria-label="Thoát bài kiểm tra">⬅️</button>' +
    '<div class="progress-wrap"><div class="progress-meta"><span id="as-counter">Câu 1/30</span><span id="as-answered">Đã làm: 0/30</span></div>' +
    '<div class="progress-bar"><div class="progress-fill" id="as-progress"></div></div></div>' +
    '<span class="as-timer" id="as-time">⏱ 45:00</span></div>' +
    '<div class="as-wrap"><div class="as-strip" id="as-strip"></div>' +
    '<div class="q-card" id="as-card">' +
    '<div class="q-badge" id="as-badge"></div>' +
    '<p class="q-prompt" id="as-prompt"></p>' +
    '<button id="as-report-btn" class="q-report-btn" type="button" title="Báo câu hỏi có vấn đề">🚩 Báo lỗi</button>' +
    '<div class="q-visual" id="as-visual"></div>' +
    '<div class="options" id="as-options"></div>' +
    '<div class="as-confirm" id="as-confirm"><span id="as-confirm-text"></span><div class="row">' +
    '<button class="big-btn primary" id="as-confirm-yes" type="button">Đồng ý</button>' +
    '<button class="big-btn ghost" id="as-confirm-no" type="button">Làm tiếp</button></div></div>' +
    '<div class="as-navrow">' +
    '<button class="big-btn ghost" id="as-btn-prev" type="button">◀ Câu trước</button>' +
    '<button class="big-btn alt" id="as-btn-next" type="button">Câu sau ▶</button>' +
    '<button class="big-btn primary" id="as-btn-submit" type="button">📮 Nộp bài</button>' +
    '</div></div></div>');

  mkSection("scr-report",
    '<div class="as-wrap"><div class="result-card">' +
    '<span class="trophy" id="as-res-trophy">🏆</span>' +
    '<div class="as-score" id="as-res-score">–</div>' +
    '<div><span class="as-level" id="as-res-level">–</span></div>' +
    '<h2 id="as-res-title">Kết quả kiểm tra</h2>' +
    '<p id="as-res-detail"></p>' +
    '<div class="result-btns">' +
    '<button class="big-btn primary" id="as-btn-newtest">📝 Làm đề khác</button>' +
    '<button class="big-btn alt" id="as-btn-review-scroll">🔍 Xem lại bài làm</button>' +
    '<button class="big-btn ghost" id="as-btn-home3">🏠 Về trang đầu</button>' +
    '</div></div>' +
    '<div class="as-card"><h3>📊 Kết quả theo chủ đề</h3><div id="as-topic-table"></div></div>' +
    '<div class="as-card" id="as-review-card"><h3>🔍 Xem lại toàn bộ bài làm</h3><div id="as-review"></div></div>' +
    '<div class="as-card"><h3>🕘 Các lần kiểm tra trước</h3><div class="as-hist" id="as-history"></div></div>' +
    '</div>');

  if (typeof screens !== "undefined" && screens.indexOf("scr-test-setup") === -1) {
    screens.push("scr-test-setup"); screens.push("scr-test"); screens.push("scr-report");
  }

  /* ---------------- tiện ích ---------------- */
  function txt(html) { try { return roundText(html == null ? "" : String(html)); } catch (e) { return String(html == null ? "" : html); } }
  function badToken(s) { return s.indexOf("undefined") !== -1 || s.indexOf("NaN") !== -1 || s.indexOf("[object") !== -1; }
  function optHtml(o) { return o && o.html != null ? o.html : String(o == null ? "" : o); }
  function fmtScore(score) { return String(score).replace(".", ","); }
  function classify(score) { return score >= 8 ? "Giỏi" : score >= 6.5 ? "Khá" : score >= 5 ? "Trung bình" : "Cần cố gắng"; }
  function fmtDuration(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m > 0 ? m + " phút " : "") + s + " giây";
  }
  function loadHistory() { try { var a = JSON.parse(localStorage.getItem(LS_ASSESS) || "[]"); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function saveHistory(rec) {
    var a = loadHistory(); a.push(rec);
    while (a.length > 50) a.shift();
    try { localStorage.setItem(LS_ASSESS, JSON.stringify(a)); } catch (e) {}
  }

  /* ---------------- rút câu đủ điều kiện từ một câu hỏi của game ----------------
     Chỉ nhận: trắc nghiệm chọn (options+answer), điền thẻ (kind blank),
     đúng/sai (rounds có truth). Loại: ghép nối (pairs), lật thẻ/bắt đáp án/
     sắp xếp (items). Mọi câu đều qua cổng prepareRoundQuestion của game
     (luật trùng giá trị sau chuẩn hoá) rồi mới được nhận. */
  function parseReasonItems(visual) {
    /* Câu bị "che đáp án" (đáp án đúng >60 ký tự): các lựa chọn đầy đủ nằm
       trong visual dạng <section class="reason-item"><b>Lựa chọn N:</b> … */
    var d = document.createElement("div"); d.innerHTML = visual || "";
    var secs = d.querySelectorAll(".reason-item");
    if (!secs.length) return null;
    var out = [];
    secs.forEach(function (s) { var c = s.cloneNode(true); var b = c.querySelector("b"); if (b) b.remove(); out.push(txt(c.innerHTML)); });
    return out.length ? out : null;
  }
  function optionItem(q, meta) {
    if (!q || q.pairs || q.items || q.rounds) return null;
    if (!q.options || typeof q.answer !== "number") return null;
    var qq = q;
    if (!prepareRoundQuestion(qq)) return null;
    if (!qq.options || qq.options.length < 2 || typeof qq.answer !== "number" || !qq.options[qq.answer]) return null;
    var disp = txt(qq.prompt || "") + " " + txt(qq.visual || "") + " " + qq.options.map(function (o) { return txt(optHtml(o)); }).join(" ");
    if (badToken(disp)) return null;
    var correctText = txt(optHtml(qq.options[qq.answer]));
    if (/^Lựa chọn \d+$/.test(correctText)) {
      var full = parseReasonItems(qq.visual || "");
      if (full && full[qq.answer]) correctText = full[qq.answer];
    }
    if (qq.kind === "blank" && qq.blankText && !/^Lựa chọn \d+$/.test(String(qq.blankText))) correctText = String(qq.blankText);
    if (!correctText) return null;
    var key = null; try { key = roundQuestionKey(qq); } catch (e) {}
    if (!key) return null;
    var factKey = null;
    if (qq.roundIdentity && qq.roundIdentity.facts && qq.roundIdentity.facts.length) {
      try { factKey = qq.roundIdentity.facts.map(roundFact).sort().join("§"); } catch (e) {}
    }
    return {
      type: qq.kind === "blank" ? "blank" : "choose", tier: meta.tier,
      grade: meta.grade, subjId: meta.subj.id, subjName: meta.subj.name,
      topicId: meta.topic.id, topicName: meta.topic.name,
      prompt: qq.prompt || "", visual: qq.visual || "", figure: qq.figure || "",
      options: qq.options.map(function (o) { return optHtml(o); }),
      answer: qq.answer, correctText: correctText,
      explain: qq.explain || "", key: key, factKey: factKey
    };
  }
  function tfItems(q, meta) {
    if (!q || !q.rounds || !q.rounds.length) return [];
    if (!prepareRoundQuestion(q)) return [];
    var out = [];
    q.rounds.forEach(function (r) {
      if (typeof r.truth !== "boolean") return;
      var vis = r.visual || "";
      if (badToken(txt(vis))) return;
      var d = document.createElement("div"); d.innerHTML = vis;
      d.querySelectorAll(".sentence").forEach(function (n) { if (/^Đáp án:/.test(n.textContent.trim())) n.remove(); });
      var stmtKey = null; try { stmtKey = roundFact(d.innerHTML); } catch (e) {}
      if (!stmtKey) return;
      var key = null; try { key = "tf1|" + roundFact(vis); } catch (e) {}
      if (!key) return;
      out.push({
        type: "tf", tier: meta.tier, grade: meta.grade, subjId: meta.subj.id, subjName: meta.subj.name,
        topicId: meta.topic.id, topicName: meta.topic.name,
        prompt: q.prompt || "Đúng hay sai?", visual: vis,
        options: ["<span class=\"opt-word\">✅ Đúng</span>", "<span class=\"opt-word\">❌ Sai</span>"],
        answer: r.truth ? 0 : 1, correctText: r.truth ? "Đúng" : "Sai",
        explain: r.explain || "", key: key, factKey: stmtKey
      });
    });
    return out;
  }
  /* Chữ ký HIỂN THỊ của một câu trong đề: chữ của prompt + visual + markup
     hình ảnh (svg/img, đã lột thuộc tính trình bày như roundQuestionKey) +
     các lựa chọn + đáp án đúng. Hai câu trùng chữ ký là trùng nhau trong
     mắt học sinh, dù khóa của game có khác — không bao giờ cùng vào một đề. */
  function itemSig(it) {
    var gfx = "";
    try {
      var d = document.createElement("div"); d.innerHTML = it.visual || "";
      gfx = Array.from(d.querySelectorAll("svg,img")).map(function (n) {
        return n.outerHTML.replace(/\s(?:id|class|style|fill|stroke)="[^"]*"/g, "");
      }).join("|");
    } catch (e) {}
    return txt(it.prompt || "") + "|" + txt(it.visual || "") + "|" + gfx + "|" +
      it.options.map(function (o) { return txt(o); }).sort().join("~") + "|" + it.correctText;
  }
  /* Rút tối đa `want` câu phân biệt từ một pools (một tầng) của một chủ đề.
     state {keys, facts, sigs} dùng chung cho cả đề: không câu nào lặp lại
     trong một đề (theo roundQuestionKey của game VÀ theo chữ ký hiển thị),
     và ưu tiên không lặp lại cùng một dữ kiện ở dạng câu khác (factKey).
     Khi relax=true (chỉ dùng ở lượt rút bổ sung khi ngân hàng mỏng), cho
     phép dùng lại dữ kiện ở một dạng câu KHÁC hẳn — đúng triết lý dự phòng
     của buildPlaylist của game (ưu tiên ít trùng nhất, không bao giờ lặp
     nguyên câu); trong lượt relax, câu dùng dữ kiện mới vẫn được ưu tiên
     trước, câu dùng lại dữ kiện chỉ lấy khi ngân sách rút đã cạn. */
  /* ---- MỤC 9 (v16): cổng lọc LỘ LOẠI ở tầng dựng đề ----
     Chỉ áp trong drawFromPools (đường dựng đề Kiểm tra — phiếu in
     dùng chung hai bộ dựng này nên cũng được lọc; vòng luyện tập
     buildPlaylist KHÔNG qua đây nên giữ nguyên hành vi). Câu chọn/
     điền đủ điều kiện mà lộ loại thì không nhận, rút câu thay thế
     trong cùng ngân sách; ngân sách cạn mà vẫn thiếu mới dùng câu
     dự phòng "lộ nhẹ nhất" và ghi nhật ký leakFallbacks. */
  var leakFallbacks = [];
  function itemLeakInfo(it) {
    if (!it || (it.type !== "choose" && it.type !== "blank")) return null;
    if (typeof window === "undefined" || !window.__typeLeak) return null;
    var texts = (it.options || []).map(function (o) { return txt(o); });
    var info = null;
    try { info = window.__typeLeak.leakInfo(texts, it.answer); } catch (e) {}
    return info && info.eligible ? info : null;
  }
  function drawFromPools(pools, meta, want, state, budget, relax) {
    var got = [];
    if (!pools || want <= 0) return got;
    var gens = [];
    ["choose", "blank", "games", "match"].forEach(function (pk) { (pools[pk] || []).forEach(function (g) { gens.push(g); }); });
    if (!gens.length) return got;
    gens = shuffle(gens.slice());
    var prevKey = null;
    try { prevKey = currentTopicKey; } catch (e) {}
    try { currentTopicKey = meta.grade + "|" + meta.subj.id + "|" + meta.topic.id + "|kt"; } catch (e) {}
    var oldFlag = roundSelectionActive;
    roundSelectionActive = true; /* như buildPlaylist: không ghi dấu "đã dùng" của chế độ luyện */
    var reserve = [];
    var leakReserve = [];
    try {
      var calls = 0, gi = 0;
      while (got.length < want && calls < budget) {
        var gen = gens[gi % gens.length]; gi++; calls++;
        var q = null;
        try { q = gen(); } catch (e) { continue; }
        if (!q) continue;
        var items = q.rounds ? tfItems(q, meta) : null;
        if (!items) { var one = optionItem(q, meta); items = one ? [one] : []; }
        for (var k = 0; k < items.length; k++) {
          var it = items[k];
          if (state.keys[it.key]) continue;
          var sig = itemSig(it);
          if (state.sigs[sig]) continue;
          var lk = itemLeakInfo(it);
          if (lk && lk.leak) { leakReserve.push({ it: it, sig: sig, soft: !lk.leakMerged, correctType: lk.correctType }); continue; }
          if (relax && it.factKey && state.facts[it.factKey]) { reserve.push({ it: it, sig: sig }); continue; }
          state.keys[it.key] = 1; state.sigs[sig] = 1; if (it.factKey) state.facts[it.factKey] = 1;
          got.push(it);
          if (got.length >= want) break;
        }
      }
      /* lượt relax: chỉ khi ngân sách đã cạn mà vẫn thiếu mới dùng câu dự trữ
         (dùng lại dữ kiện ở dạng câu khác), vẫn tuyệt đối không trùng khóa/chữ ký */
      for (var ri = 0; ri < reserve.length && got.length < want; ri++) {
        var rv = reserve[ri];
        if (state.keys[rv.it.key] || state.sigs[rv.sig]) continue;
        state.keys[rv.it.key] = 1; state.sigs[rv.sig] = 1; if (rv.it.factKey) state.facts[rv.it.factKey] = 1;
        got.push(rv.it);
      }
      /* Dự phòng lộ loại: chỉ khi ngân sách + dự trữ thường đã cạn mà
         vẫn thiếu câu — dùng câu lộ nhẹ nhất trước (không lộ theo phép
         gộp NAM+SO), ghi nhật ký; không bao giờ để đề thiếu câu. */
      leakReserve.sort(function (a, b) { return (b.soft ? 1 : 0) - (a.soft ? 1 : 0); });
      for (var li = 0; li < leakReserve.length && got.length < want; li++) {
        var lv = leakReserve[li];
        if (state.keys[lv.it.key] || state.sigs[lv.sig]) continue;
        state.keys[lv.it.key] = 1; state.sigs[lv.sig] = 1; if (lv.it.factKey) state.facts[lv.it.factKey] = 1;
        leakFallbacks.push({ grade: meta.grade, subjId: meta.subj.id, topicId: meta.topic.id, tier: meta.tier, type: lv.it.type, correctType: lv.correctType });
        got.push(lv.it);
      }
    } finally {
      roundSelectionActive = oldFlag;
      try { currentTopicKey = prevKey; } catch (e) {}
    }
    return got;
  }
  function newDrawState() { return { keys: {}, facts: {}, sigs: {} }; }

  /* ---------------- sinh đề ---------------- */
  function buildTopicTestOnce(g, subj, t) {
    var state = newDrawState();
    var metaStd = { tier: "std", grade: g, subj: subj, topic: t };
    var metaAdv = { tier: "adv", grade: g, subj: subj, topic: t };
    var adv = t.advPools ? drawFromPools(t.advPools, metaAdv, ADV_TARGET, state, 1500) : [];
    if (t.advPools && adv.length < ADV_TARGET) {
      adv = adv.concat(drawFromPools(t.advPools, metaAdv, ADV_TARGET - adv.length, state, 1500, true));
    }
    var std = drawFromPools(t.pools, metaStd, TEST_LEN - adv.length, state, 2200);
    if (std.length + adv.length < TEST_LEN) {
      std = std.concat(drawFromPools(t.pools, metaStd, TEST_LEN - std.length - adv.length, state, 2200, true));
    }
    if (std.length + adv.length < TEST_LEN && t.advPools) {
      adv = adv.concat(drawFromPools(t.advPools, metaAdv, TEST_LEN - std.length - adv.length, state, 1500, true));
    }
    var items = shuffle(std.concat(adv));
    return { items: items, meta: { scope: "topic", grade: g, subjId: subj.id, subjName: subj.name, topicId: t.id, topicName: t.name, advGot: adv.length, stdGot: items.length - adv.length } };
  }
  /* Bọc thử lại (đợt sửa phân số 2026-10-15): sinh đề theo chủ đề thử tối đa 3 lần,
     giữ bản đủ nhất (nhiều câu nhất); đủ 30 câu + đủ 9 câu nâng cao thì dừng ngay.
     Nếu cả 3 lần vẫn thiếu thì trả bản tốt nhất như hành vi cũ — bắt đầu MỀM,
     không chặn cứng học sinh (phần thiếu gốc xử lý bằng bổ sung ngân hàng). */
  function buildTopicTest(g, subj, t) {
    /* v18 P2/P3: đề phải dựng trên ngân hàng ĐẦY ĐỦ — hoàn tất đồng bộ
       Phase C + nửa nâng cao Phase B của lớp trước khi rút câu. */
    if (typeof window.__ensureCompleteGrade === "function") { try { window.__ensureCompleteGrade(g); } catch (e) {} }
    if (typeof window.__ensureAdvGrade === "function") { try { window.__ensureAdvGrade(g); } catch (e) {} }
    var best = null;
    for (var attempt = 0; attempt < 3; attempt++) {
      var built = buildTopicTestOnce(g, subj, t);
      if (!best || built.items.length > best.items.length) best = built;
      if (built.items.length === TEST_LEN && built.meta.advGot === ADV_TARGET) break;
    }
    return best;
  }
  function buildSubjectTest(g, subj) {
    if (typeof window.__ensureCompleteGrade === "function") { try { window.__ensureCompleteGrade(g); } catch (e) {} }
    if (typeof window.__ensureAdvGrade === "function") { try { window.__ensureAdvGrade(g); } catch (e) {} }
    var topics = subj.topics.slice();
    var n = Math.max(1, topics.length);
    var state = newDrawState();
    var buckets = topics.map(function (t) { return { t: t, std: [], adv: [] }; });
    /* Trần theo chủ đề tính riêng cho từng tầng để đề phủ đều chương trình:
       mỗi chủ đề góp tối đa ~21/n câu thường + ~9/n câu nâng cao. */
    var capStd = Math.ceil(STD_TARGET / n), capAdv = Math.ceil(ADV_TARGET / n);
    function drawInto(b, cs, ca) {
      var metaStd = { tier: "std", grade: g, subj: subj, topic: b.t };
      var metaAdv = { tier: "adv", grade: g, subj: subj, topic: b.t };
      if (b.t.advPools && b.adv.length < ca) {
        var gotA = drawFromPools(b.t.advPools, metaAdv, ca - b.adv.length, state, 700);
        b.adv = b.adv.concat(gotA);
      }
      if (b.std.length < cs) {
        var gotS = drawFromPools(b.t.pools, metaStd, cs - b.std.length, state, 800);
        b.std = b.std.concat(gotS);
      }
    }
    buckets.forEach(function (b) { drawInto(b, capStd, capAdv); });
    function compose() {
      var advItems = [], stdItems = [];
      var idx = buckets.map(function () { return { a: 0, s: 0 }; });
      var progressed = true;
      while ((advItems.length < ADV_TARGET || stdItems.length < STD_TARGET) && progressed) {
        progressed = false;
        for (var i = 0; i < buckets.length; i++) {
          var b = buckets[i], ix = idx[i];
          if (advItems.length < ADV_TARGET && ix.a < b.adv.length) { advItems.push(b.adv[ix.a++]); progressed = true; }
          if (stdItems.length < STD_TARGET && ix.s < b.std.length) { stdItems.push(b.std[ix.s++]); progressed = true; }
        }
      }
      return { advItems: advItems, stdItems: stdItems };
    }
    var composed = compose();
    var capExceeded = false;
    if (composed.advItems.length + composed.stdItems.length < TEST_LEN) {
      /* Nới trần theo chủ đề để đủ ~30 câu khi môn ít chủ đề/ngân hàng mỏng —
         vẫn ghi nhận đã nới trần trong meta của đề. */
      capExceeded = true;
      capStd += 2; capAdv += 1;
      buckets.forEach(function (b) { drawInto(b, capStd, capAdv); });
      composed = compose();
      if (composed.advItems.length < ADV_TARGET) {
        /* tầng nâng cao toàn môn không đủ: bù bằng câu thường */
        var needStd = TEST_LEN - composed.advItems.length - composed.stdItems.length;
        if (needStd > 0) {
          for (var i = 0; i < buckets.length && needStd > 0; i++) {
            var extra = drawFromPools(buckets[i].t.pools, { tier: "std", grade: g, subj: subj, topic: buckets[i].t }, needStd, state, 900, true);
            composed.stdItems = composed.stdItems.concat(extra); needStd -= extra.length;
          }
        }
      }
      if (composed.stdItems.length + composed.advItems.length < TEST_LEN) {
        var needAdv = TEST_LEN - composed.advItems.length - composed.stdItems.length;
        for (var j = 0; j < buckets.length && needAdv > 0; j++) {
          if (!buckets[j].t.advPools) continue;
          var extraA = drawFromPools(buckets[j].t.advPools, { tier: "adv", grade: g, subj: subj, topic: buckets[j].t }, needAdv, state, 900, true);
          composed.advItems = composed.advItems.concat(extraA); needAdv -= extraA.length;
        }
      }
    }
    var items = shuffle(composed.stdItems.concat(composed.advItems));
    return { items: items, meta: { scope: "subject", grade: g, subjId: subj.id, subjName: subj.name, topicId: null, topicName: null, advGot: composed.advItems.length, stdGot: composed.stdItems.length, capStd: Math.ceil(STD_TARGET / n), capAdv: Math.ceil(ADV_TARGET / n), capExceeded: capExceeded } };
  }

  /* ---------------- chấm điểm ---------------- */
  function gradeItems(items, answers) {
    var perTopicMap = {}, perTopic = [], correct = 0;
    items.forEach(function (it, i) {
      var ok = answers[i] != null && answers[i] === it.answer;
      if (ok) correct++;
      var pt = perTopicMap[it.topicId];
      if (!pt) { pt = { topicId: it.topicId, name: it.topicName, total: 0, correct: 0 }; perTopicMap[it.topicId] = pt; perTopic.push(pt); }
      pt.total++; if (ok) pt.correct++;
    });
    var total = items.length;
    var score = total ? Math.round((correct / total) * 100) / 10 : 0;
    return { correct: correct, total: total, score: score, level: classify(score), perTopic: perTopic };
  }

  /* ---------------- trạng thái bài làm ---------------- */
  var test = null; /* {built, items, answers, idx, startedAt, deadline, timerId, submitted, timedOut, topicRefs} */
  var setupScope = "topic";

  function topicRef(grade, subjId, topicId) {
    var G = (typeof GRADES !== "undefined" && GRADES[grade]) || null;
    if (!G) return null;
    for (var i = 0; i < G.subjects.length; i++) {
      var s = G.subjects[i]; if (s.id !== subjId) continue;
      for (var j = 0; j < s.topics.length; j++) if (s.topics[j].id === topicId) return { subj: s, topic: s.topics[j] };
    }
    return null;
  }

  function startTest(built) {
    test = {
      built: built, items: built.items, answers: built.items.map(function () { return null; }),
      idx: 0, startedAt: Date.now(), deadline: Date.now() + TEST_SECONDS * 1000,
      timerId: null, submitted: false, timedOut: false,
      refs: {}
    };
    built.items.forEach(function (it) {
      if (!test.refs[it.topicId]) { var r = topicRef(built.meta.grade, it.subjId, it.topicId); if (r) test.refs[it.topicId] = r; }
    });
    show("scr-test");
    renderStrip(); renderItem(); startTimer();
  }
  function startTimer() {
    stopTimer();
    test.timerId = setInterval(tickTimer, 250);
    tickTimer();
  }
  function stopTimer() { if (test && test.timerId) { clearInterval(test.timerId); test.timerId = null; } }
  function tickTimer() {
    if (!test || test.submitted) return;
    var left = test.deadline - Date.now();
    var box = el("as-time"); if (!box) return;
    if (left <= 0) { box.textContent = "⏱ 00:00"; submitTest(true); return; }
    var sec = Math.ceil(left / 1000);
    var mm = Math.floor(sec / 60), ss = sec % 60;
    box.textContent = "⏱ " + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
    box.classList.toggle("warn", left < 5 * 60 * 1000);
  }
  function answeredCount() { return test.answers.filter(function (a) { return a != null; }).length; }
  function renderStrip() {
    var strip = el("as-strip"); strip.innerHTML = "";
    test.items.forEach(function (it, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "as-chip" + (test.answers[i] != null ? " done" : "") + (i === test.idx ? " cur" : "");
      b.textContent = String(i + 1);
      b.addEventListener("click", function () { test.idx = i; hideConfirm(); renderStrip(); renderItem(); });
      strip.appendChild(b);
    });
    el("as-answered").textContent = "Đã làm: " + answeredCount() + "/" + test.items.length;
  }
  /* V23 — Việc D: ngữ cảnh báo lỗi cho một câu trong bài Kiểm tra. */
  function assessReportCtx(it, mode) {
    var R = window.__reportQ; if (!R || !it) return null;
    var visText = R.textOf(it.visual);
    var de = String(it.prompt || "");
    if (visText && de.indexOf(visText) === -1) de = de ? de + " | " + visText : visText;
    var opts = (it.options || []).map(function (o) { return R.textOf(o); });
    return { lop: it.grade, mon: it.subjName || "", maChuDe: it.topicId || "", tenChuDe: it.topicName || "", mode: mode,
      loaiCau: it.type === "tf" ? "Đúng/Sai" : it.type === "blank" ? "Điền đáp án" : "Trắc nghiệm",
      de: de, coHinh: !!(it.figure || (it.visual && /<svg|<img/i.test(it.visual))),
      luaChon: opts, dapAn: it.correctText || (typeof it.answer === "number" ? (opts[it.answer] || "") : ""), tf: null,
      sess: (typeof test !== "undefined" && test && test.repSess) ? test.repSess : undefined };
  }
  function wireAssessReportBtn() {
    var b = el("as-report-btn");
    if (b && !b.__repWired) {
      b.__repWired = true;
      b.addEventListener("click", function () {
        if (!test || !test.items) return;
        var ctx = assessReportCtx(test.items[test.idx], "Kiểm tra");
        if (ctx && window.__reportQ) window.__reportQ.open(ctx);
      });
    }
  }
  function renderItem() {
    wireAssessReportBtn();
    var it = test.items[test.idx];
    el("as-counter").textContent = "Câu " + (test.idx + 1) + "/" + test.items.length;
    el("as-progress").style.width = (test.items.length ? (test.idx / test.items.length * 100) : 0) + "%";
    var badge = el("as-badge");
    if (it.tier === "adv") { badge.textContent = "🧠 Câu nâng cao"; badge.className = "q-badge show"; }
    else { badge.textContent = ""; badge.className = "q-badge"; }
    el("as-prompt").textContent = it.prompt || "";
    var vis = el("as-visual"); vis.innerHTML = figHTML(it.figure) + (it.visual || "");
    vis.querySelectorAll("[data-speak]").forEach(function (btn) {
      btn.addEventListener("click", function (ev) { ev.stopPropagation(); try { speakStimulus(btn.getAttribute("data-speak"), btn); } catch (e) {} });
    });
    var box = el("as-options");
    box.innerHTML = ""; box.className = "options" + (it.type === "tf" ? " cols-2" : "");
    it.options.forEach(function (ohtml, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "opt" + (test.answers[test.idx] === i ? " sel" : "");
      b.innerHTML = ohtml;
      b.addEventListener("click", function () {
        if (!test || test.submitted) return;
        test.answers[test.idx] = i;
        box.querySelectorAll(".opt").forEach(function (o, j) { o.classList.toggle("sel", j === i); });
        renderStrip();
      });
      box.appendChild(b);
    });
    el("as-btn-prev").disabled = test.idx <= 0;
    el("as-btn-next").disabled = test.idx >= test.items.length - 1;
  }
  var confirmAction = null;
  function showConfirm(text, action) {
    el("as-confirm-text").textContent = text;
    confirmAction = action;
    el("as-confirm").classList.add("on");
  }
  function hideConfirm() { el("as-confirm").classList.remove("on"); confirmAction = null; }

  function submitTest(timedOut) {
    if (!test || test.submitted) return;
    test.submitted = true; test.timedOut = !!timedOut;
    stopTimer();
    var elapsed = timedOut ? TEST_SECONDS : Math.min(TEST_SECONDS, Math.round((Date.now() - test.startedAt) / 1000));
    var res = gradeItems(test.items, test.answers);
    var m = test.built.meta;
    var rec = {
      ts: Date.now(),
      name: (typeof profile !== "undefined" && profile && profile.name) || "",
      grade: m.grade,
      lop: (typeof profile !== "undefined" && profile && profile.lop) || "",
      subjId: m.subjId, subjName: m.subjName,
      scope: m.scope, scopeName: m.scope === "topic" ? m.topicName : "Toàn môn " + m.subjName,
      topicId: m.topicId || null,
      total: res.total, correct: res.correct, score: res.score, level: res.level,
      secs: elapsed, timedOut: !!timedOut,
      perTopic: res.perTopic
    };
    saveHistory(rec);
    test.result = res; test.record = rec;
    renderReport();
    show("scr-report");
    /* Tổng kết đọc ra tiếng: chỉ điểm + xếp loại, KHÔNG đọc tên người chơi.
       v18: mảnh đầu cố định phát tệp thu sẵn assess-01, phần điểm/xếp loại
       là câu động đi qua phễu đọc như cũ. */
    try { speakViParts(["Bài kiểm tra hoàn thành!", "Em đạt " + fmtScore(res.score) + " điểm, xếp loại " + res.level + "."]); } catch (e) {}
  }

  /* ---------------- báo cáo ---------------- */
  function renderReport() {
    var res = test.result, rec = test.record, m = test.built.meta;
    el("as-res-trophy").textContent = res.level === "Giỏi" ? "🏆" : res.level === "Khá" ? "🎉" : res.level === "Trung bình" ? "🌟" : "💪";
    el("as-res-score").textContent = fmtScore(res.score) + " điểm";
    el("as-res-level").textContent = "Xếp loại: " + res.level;
    el("as-res-title").textContent = (m.scope === "topic" ? "Kiểm tra chủ đề: " + m.topicName : "Kiểm tra môn " + m.subjName) + " — Lớp " + m.grade;
    el("as-res-detail").textContent = "Đúng " + res.correct + "/" + res.total + " câu • Thời gian làm bài: " + fmtDuration(rec.secs) + (rec.timedOut ? " (hết giờ, bài tự nộp)" : "") + " • Đề gồm " + (m.advGot != null ? (res.total - m.advGot) + " câu thường + " + m.advGot + " câu nâng cao" : res.total + " câu");
    /* bảng theo chủ đề */
    var html = '<table class="as-table"><thead><tr><th>Chủ đề</th><th>Đúng</th><th>Tỉ lệ</th><th></th></tr></thead><tbody>';
    res.perTopic.forEach(function (pt) {
      var pct = pt.total ? Math.round(pt.correct / pt.total * 100) : 0;
      var weak = pt.total > 0 && (pt.correct / pt.total) < 0.6;
      html += "<tr><td>" + pt.name + (weak ? '<span class="as-flag">⚠️ Cần ôn</span>' : '<span class="as-oktag">Ổn</span>') + "</td>" +
        "<td>" + pt.correct + "/" + pt.total + "</td><td>" + pct + "%</td>" +
        '<td><button type="button" class="as-mini-btn" data-as-know="' + pt.topicId + '">📖 Kiến thức</button>' +
        '<button type="button" class="as-mini-btn" data-as-practice="' + pt.topicId + '">🔁 Luyện lại</button></td></tr>';
    });
    html += "</tbody></table>";
    var tt = el("as-topic-table"); tt.innerHTML = html;
    tt.querySelectorAll("[data-as-know]").forEach(function (b) {
      b.addEventListener("click", function () {
        var r = test.refs[b.getAttribute("data-as-know")];
        if (r && window.__showKnowledge) window.__showKnowledge(r.topic);
      });
    });
    tt.querySelectorAll("[data-as-practice]").forEach(function (b) {
      b.addEventListener("click", function () {
        var r = test.refs[b.getAttribute("data-as-practice")];
        if (r) { try { currentGrade = test.built.meta.grade; } catch (e) {} openSubject(r.subj); launchTopic(r.subj, r.topic); }
      });
    });
    /* xem lại toàn bộ câu */
    var rv = el("as-review"); rv.innerHTML = "";
    test.items.forEach(function (it, i) {
      var mine = test.answers[i];
      var ok = mine != null && mine === it.answer;
      var div = document.createElement("div");
      div.className = "as-review-item " + (mine == null ? "skip" : ok ? "ok" : "bad");
      var head = "Câu " + (i + 1) + " — " + (mine == null ? '<span class="st-skip">Chưa trả lời</span>' : ok ? '<span class="st-ok">✓ Đúng</span>' : '<span class="st-bad">✗ Sai</span>') +
        '<span class="as-topic-tag">' + it.topicName + "</span>" + (it.tier === "adv" ? '<span class="as-topic-tag">🧠 Nâng cao</span>' : "");
      var body = '<div class="as-review-head">' + head + "</div>";
      if (it.prompt) body += '<p class="q-prompt" style="margin:4px 0">' + it.prompt.replace(/</g, "&lt;") + "</p>";
      body += '<div class="q-visual as-review-visual"></div>';
      it.options.forEach(function (ohtml, j) {
        var cls = "as-optline";
        if (j === it.answer) cls += " right";
        if (mine != null && j === mine && mine !== it.answer) cls += " mine-wrong";
        body += '<div class="' + cls + '">' + (j === it.answer ? "✓ " : (mine != null && j === mine ? "✗ " : "")) + ohtml + (j === mine ? " <i>(em chọn)</i>" : "") + "</div>";
      });
      body += '<div class="as-explain"><b>Đáp án đúng:</b> ' + it.correctText.replace(/</g, "&lt;") +
        (it.explain ? "<br><b>Giải thích:</b> " + it.explain : "") + "</div>";
      div.innerHTML = body;
      /* v18: nút nghe lại ở màn XEM LẠI sau khi nộp (trong lúc làm bài
         không có nút nghe — giữ toàn vẹn bài kiểm tra đang tính giờ). */
      var spkBtn = document.createElement("button");
      spkBtn.type = "button"; spkBtn.className = "as-speak-btn"; spkBtn.textContent = "🔊 Nghe câu này";
      spkBtn.addEventListener("click", function () {
        if (typeof window.__speakViOnDemand === "function" && it.prompt) {
          /* v18-sửa-giọng (Việc C): nút "Nghe câu này" CHỈ đọc đề bài —
             bản trước đọc cả "Đáp án đúng: …" và giải thích thành tiếng. */
          var stem = (window.__ttsVi && window.__ttsVi.stem) ? window.__ttsVi.stem(it.prompt) : it.prompt;
          if (stem) window.__speakViOnDemand([stem], spkBtn);
        }
      });
      div.appendChild(spkBtn);
      if (window.__reportQ) {
        var repBtn = document.createElement("button");
        repBtn.type = "button"; repBtn.className = "as-speak-btn"; repBtn.textContent = "🚩 Báo lỗi câu này";
        repBtn.addEventListener("click", function () { var ctx = assessReportCtx(it, "Xem lại Kiểm tra"); if (ctx) window.__reportQ.open(ctx); });
        div.appendChild(repBtn);
      }
      var holder = div.querySelector(".as-review-visual");
      holder.innerHTML = figHTML(it.figure) + (it.visual || "");
      var slot = holder.querySelector(".blank-slot");
      if (slot) { slot.textContent = it.type === "blank" ? it.correctText : slot.textContent; slot.classList.add("filled"); }
      rv.appendChild(div);
    });
    /* lịch sử */
    var hist = loadHistory().slice().reverse();
    var myName = (typeof profile !== "undefined" && profile && profile.name) || "";
    var mine = hist.filter(function (r) { return r.name === myName && r.grade === m.grade; }).slice(0, 10);
    el("as-history").innerHTML = mine.length ? "<ul>" + mine.map(function (r) {
      var d = new Date(r.ts);
      var when = d.toLocaleDateString("vi-VN") + " " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      return "<li>" + when + " — " + r.subjName + " • " + r.scopeName + ": <b>" + fmtScore(r.score) + " điểm</b> (" + r.level + "), đúng " + r.correct + "/" + r.total + " câu, làm trong " + fmtDuration(r.secs) + "</li>";
    }).join("") + "</ul>" : '<p class="as-note">Chưa có lần kiểm tra nào trước đây.</p>';
  }

  /* ---------------- màn hình thiết lập ---------------- */
  function fillSetup() {
    var g = (typeof currentGrade !== "undefined") ? currentGrade : null;
    var G = g && typeof GRADES !== "undefined" ? GRADES[g] : null;
    var selS = el("as-sel-subject"), selT = el("as-sel-topic");
    selS.innerHTML = ""; selT.innerHTML = "";
    if (!G) { el("as-setup-err").textContent = "Chưa nạp được dữ liệu lớp. Em quay lại trang đầu rồi thử lại nhé!"; return; }
    G.subjects.forEach(function (s) {
      var o = document.createElement("option"); o.value = s.id; o.textContent = s.emoji + " " + s.name; selS.appendChild(o);
    });
    fillTopics();
    el("as-setup-err").textContent = "";
  }
  function fillTopics() {
    var g = currentGrade, G = GRADES[g]; if (!G) return;
    var sid = el("as-sel-subject").value;
    var subj = null;
    G.subjects.forEach(function (s) { if (s.id === sid) subj = s; });
    var selT = el("as-sel-topic"); selT.innerHTML = "";
    if (!subj) return;
    subj.topics.forEach(function (t) {
      var o = document.createElement("option"); o.value = t.id; o.textContent = t.name; selT.appendChild(o);
    });
  }
  function openSetup() {
    fillSetup();
    show("scr-test-setup");
  }
  function setScope(scope) {
    setupScope = scope;
    el("as-scope-topic").classList.toggle("sel", scope === "topic");
    el("as-scope-subject").classList.toggle("sel", scope === "subject");
    el("as-row-topic").style.display = scope === "topic" ? "" : "none";
  }

  /* ---------------- gắn sự kiện ---------------- */
  el("as-setup-back").addEventListener("click", function () { show("scr-home"); });
  el("as-scope-topic").addEventListener("click", function () { setScope("topic"); });
  el("as-scope-subject").addEventListener("click", function () { setScope("subject"); });
  el("as-sel-subject").addEventListener("change", fillTopics);
  el("as-btn-start").addEventListener("click", function () {
    var g = currentGrade, G = (typeof GRADES !== "undefined") ? GRADES[g] : null;
    if (!G) { el("as-setup-err").textContent = "Chưa nạp được dữ liệu lớp."; return; }
    var sid = el("as-sel-subject").value;
    var subj = null; G.subjects.forEach(function (s) { if (s.id === sid) subj = s; });
    if (!subj) { el("as-setup-err").textContent = "Em hãy chọn môn học nhé!"; return; }
    var btn = el("as-btn-start");
    btn.disabled = true; btn.textContent = "⏳ Đang soạn đề…";
    setTimeout(function () {
      try {
        var built = null;
        if (setupScope === "topic") {
          var tid = el("as-sel-topic").value, topic = null;
          subj.topics.forEach(function (t) { if (t.id === tid) topic = t; });
          if (!topic) { el("as-setup-err").textContent = "Em hãy chọn chủ đề nhé!"; return; }
          built = buildTopicTest(g, subj, topic);
        } else {
          built = buildSubjectTest(g, subj);
        }
        if (!built.items.length) { el("as-setup-err").textContent = "Chưa rút đủ câu cho đề này, em thử chủ đề/môn khác nhé!"; return; }
        el("as-setup-err").textContent = "";
        startTest(built);
      } finally {
        btn.disabled = false; btn.textContent = "▶️ Bắt đầu làm bài";
      }
    }, 30);
  });
  el("as-btn-prev").addEventListener("click", function () { if (test && test.idx > 0) { test.idx--; hideConfirm(); renderStrip(); renderItem(); } });
  el("as-btn-next").addEventListener("click", function () { if (test && test.idx < test.items.length - 1) { test.idx++; hideConfirm(); renderStrip(); renderItem(); } });
  el("as-btn-submit").addEventListener("click", function () {
    if (!test || test.submitted) return;
    var left = test.items.length - answeredCount();
    if (left > 0) showConfirm("Còn " + left + " câu chưa làm. Nộp bài luôn nhé? Câu chưa làm sẽ tính là sai.", function () { hideConfirm(); submitTest(false); });
    else showConfirm("Nộp bài và xem kết quả nhé?", function () { hideConfirm(); submitTest(false); });
  });
  el("as-btn-quit").addEventListener("click", function () {
    if (!test || test.submitted) { show("scr-home"); return; }
    showConfirm("Thoát bài kiểm tra? Bài làm sẽ không được chấm và không lưu kết quả.", function () { stopTimer(); test = null; hideConfirm(); show("scr-home"); });
  });
  el("as-confirm-yes").addEventListener("click", function () { var a = confirmAction; hideConfirm(); if (a) a(); });
  el("as-confirm-no").addEventListener("click", hideConfirm);
  el("as-btn-newtest").addEventListener("click", function () { openSetup(); });
  el("as-btn-home3").addEventListener("click", function () { show("scr-home"); });
  el("as-btn-review-scroll").addEventListener("click", function () {
    var c = el("as-review-card"); if (c && c.scrollIntoView) c.scrollIntoView({ behavior: "smooth" });
  });

  /* ---------------- nút vào tính năng ở màn hình chính (chỉ Lớp 4–12) ---------------- */
  function injectAssessButton() {
    try {
      if (typeof profile === "undefined" || !profile || !profile.name) return;
      if (typeof currentGrade === "undefined" || currentGrade < MIN_GRADE || currentGrade > MAX_GRADE) return;
      var grid = el("subject-dynamic"); if (!grid) return;
      if (grid.querySelector(".assess-card")) return;
      var card = document.createElement("button");
      card.className = "subj-card assess-card";
      card.innerHTML = '<span class="big-emoji">📝</span><span class="name">Kiểm tra năng lực</span><span class="desc">Đề 30 câu • 45 phút • Chấm điểm sau khi nộp, xem lại đáp án và giải thích</span>';
      card.addEventListener("click", function () { openSetup(); });
      grid.appendChild(card);
    } catch (e) {}
  }
  if (typeof renderSubjects === "function") {
    var origRenderSubjects = renderSubjects;
    renderSubjects = function () { var r = origRenderSubjects.apply(this, arguments); injectAssessButton(); return r; };
  }
  injectAssessButton();

  /* ---------------- API phục vụ kiểm chứng (QA) ---------------- */
  window.__assess = {
    TEST_LEN: TEST_LEN, STD_TARGET: STD_TARGET, ADV_TARGET: ADV_TARGET, TEST_SECONDS: TEST_SECONDS,
    LS_KEY: LS_ASSESS,
    buildTopicTest: function (g, subjId, topicId) {
      var r = topicRef(g, subjId, topicId); if (!r) return null;
      return buildTopicTest(g, r.subj, r.topic);
    },
    buildSubjectTest: function (g, subjId) {
      var G = (typeof GRADES !== "undefined") ? GRADES[g] : null; if (!G) return null;
      var subj = null; G.subjects.forEach(function (s) { if (s.id === subjId) subj = s; });
      return subj ? buildSubjectTest(g, subj) : null;
    },
    gradeItems: gradeItems,
    classify: classify,
    leakFallbacks: function () { return leakFallbacks.slice(); },
    startBuilt: function (built) { startTest(built); },
    current: function () { return test; },
    forceTimeout: function () { if (test && !test.submitted) submitTest(true); },
    loadHistory: loadHistory,
    openSetup: openSetup
  };
})();

/*__ASSESS_FEATURE_END__*/
