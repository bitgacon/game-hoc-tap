"use strict";
/*__CHUYENDE_SHELL_BEGIN__*/
/* ============================================================
   CHUYÊN ĐỀ NÂNG CAO — ĐỢT THỬ TOÁN TƯ DUY (vu chốt 2026-10-16)
   - Thẻ vào trên màn hình chính của MỌI lớp; dữ liệu nằm riêng ở
     assets/data/chuyende.js, nạp lười khi mở màn hình chuyên đề
     (đúng khuôn bộ nạp file lớp __ensureGrade).
   - Chuyên đề KHÔNG nằm trong GRADES nên tự động đứng ngoài
     Kiểm tra năng lực, Thử thách mỗi ngày, In phiếu và tìm kiếm.
   - Vòng chơi dùng lại launchTopic/startGame/buildPlaylist của game;
     ngữ cảnh Ôn câu sai qua móc window.__cdTopicContext ở topicContext().
   ============================================================ */
(function () {
  if (window.__cdShellInstalled) return;
  window.__cdShellInstalled = true;

  var style = document.createElement("style");
  style.textContent =
    ".subj-card.cd-card{grid-column:1/-1;background:linear-gradient(135deg,#0e7a5f,#12a37c);min-height:0;padding:16px 12px}" +
    ".cd-band{margin:0 0 22px}" +
    ".cd-band-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 10px;padding:10px 14px;border:3px solid var(--line);border-radius:16px;background:var(--card)}" +
    ".cd-band.current .cd-band-head{border-color:#12a37c;background:#e7f7f1}" +
    ".cd-band-name{font-size:19px;font-weight:800}" +
    ".cd-band-tag{font-size:13px;font-weight:800;color:#0e7a5f;background:#d8f3e8;border-radius:999px;padding:3px 10px}" +
    ".cd-band-note{margin:0 0 10px;color:var(--ink-soft);font-weight:600}" +
    ".cd-branch-card{display:flex;align-items:center;gap:14px;width:100%;text-align:left;margin:0 0 14px;padding:16px;border:3px solid var(--line);border-radius:20px;background:var(--card);cursor:pointer;font-family:inherit}" +
    ".cd-branch-card:hover{border-color:#12a37c}" +
    ".cd-branch-emoji{font-size:38px;line-height:1}" +
    ".cd-branch-main{flex:1;display:flex;flex-direction:column;gap:3px}" +
    ".cd-branch-name{font-size:20px;font-weight:800;color:var(--ink)}" +
    ".cd-branch-desc{font-size:15px;font-weight:600;color:var(--ink-soft)}" +
    ".cd-branch-meta{font-size:13px;font-weight:700;color:#0e7a5f}" +
    ".cd-branch-arrow{font-size:30px;font-weight:800;color:var(--ink-soft)}" +
    ".cd-backbar{margin:0 0 14px;padding:9px 16px;border:3px solid var(--line);border-radius:999px;background:var(--card);font-family:inherit;font-size:15px;font-weight:800;color:#0e7a5f;cursor:pointer}";
  document.head.appendChild(style);

  try { if (typeof screens !== "undefined" && screens.indexOf("scr-chuyende") === -1) screens.push("scr-chuyende"); } catch (e) {}

  window.__cdScript = window.__cdScript || "";
  window.__cdWaiters = [];
  window.__ensureChuyenDe = function (cb) {
    if (window.__CD) { if (cb) cb(true); return; }
    if (window.__cdScript === "loading") { window.__cdWaiters.push(cb); return; }
    if (window.__cdScript === "error") { if (cb) cb(false); return; }
    window.__cdScript = "loading";
    var waiters = window.__cdWaiters = [].concat(cb || []);
    var sc = document.createElement("script");
    sc.src = "assets/data/chuyende.js";
    sc.onload = function () {
      window.__cdScript = "loaded";
      var ws = waiters.slice(); waiters.length = 0;
      ws.forEach(function (f) { if (f) try { f(!!window.__CD); } catch (e) {} });
    };
    sc.onerror = function () {
      window.__cdScript = "error";
      var ws = waiters.slice(); waiters.length = 0;
      ws.forEach(function (f) { if (f) try { f(false); } catch (e) {} });
    };
    (document.body || document.head).appendChild(sc);
  };

  window.__khScript = window.__khScript || "";
  window.__khWaiters = [];
  window.__ensureKhoaHoc = function (cb) {
    if (window.__KH) { if (cb) cb(true); return; }
    if (window.__khScript === "loading") { window.__khWaiters.push(cb); return; }
    if (window.__khScript === "error") { if (cb) cb(false); return; }
    window.__khScript = "loading";
    var waiters = window.__khWaiters = [].concat(cb || []);
    var sc = document.createElement("script");
    sc.src = "assets/data/khoahoc.js";
    sc.onload = function () {
      window.__khScript = "loaded";
      var ws = waiters.slice(); waiters.length = 0;
      ws.forEach(function (f) { if (f) try { f(!!window.__KH); } catch (e) {} });
    };
    sc.onerror = function () {
      window.__khScript = "error";
      var ws = waiters.slice(); waiters.length = 0;
      ws.forEach(function (f) { if (f) try { f(false); } catch (e) {} });
    };
    (document.body || document.head).appendChild(sc);
  };

  window.__enScript = window.__enScript || "";
  window.__enWaiters = [];
  window.__ensureTiengAnh = function (cb) {
    if (window.__EN) { if (cb) cb(true); return; }
    if (window.__enScript === "loading") { window.__enWaiters.push(cb); return; }
    if (window.__enScript === "error") { if (cb) cb(false); return; }
    window.__enScript = "loading";
    var waiters = window.__enWaiters = [].concat(cb || []);
    var sc = document.createElement("script");
    sc.src = "assets/data/tienganh.js";
    sc.onload = function () {
      window.__enScript = "loaded";
      var ws = waiters.slice(); waiters.length = 0;
      ws.forEach(function (f) { if (f) try { f(!!window.__EN); } catch (e) {} });
    };
    sc.onerror = function () {
      window.__enScript = "error";
      var ws = waiters.slice(); waiters.length = 0;
      ws.forEach(function (f) { if (f) try { f(false); } catch (e) {} });
    };
    (document.body || document.head).appendChild(sc);
  };

  /* --- Thư mục chuyên đề (v12, vu chốt 2026-10-16): vào chuyên đề thấy
     DANH SÁCH NHÁNH trước; bấm từng nhánh mới vào nội dung của nhánh đó,
     để khu chuyên đề mở rộng dần mà không rối màn hình. --- */
  window.__cdView = "dir";
  var CD_BRANCHES = [
    { id: "toan", emoji: "🧮", name: "Toán tư duy",
      desc: "Dãy số, logic, đếm hình, tổ hợp… — câu hỏi suy luận có giải thích cách nghĩ.",
      meta: "3 dải • 15 chủ đề — Tiểu học (Lớp 1–5) • THCS (6–9) • THPT (10–12)" },
    { id: "en", emoji: "🌍", name: "Tiếng Anh luyện thi",
      desc: "Từ vựng, ngữ pháp, đọc hiểu và nghe — luyện theo khung thi quốc tế.",
      meta: "Tiểu học: Cambridge Starters • Movers • Flyers — THCS: KET • PET — THPT: TOEIC • IELTS" },
    { id: "khoa", emoji: "🔬", name: "Khám phá khoa học",
      desc: "Hiện tượng quanh em: dự đoán, giải thích và tự kiểm chứng — từ Khoa học tiểu học nối tới Vật lí, Hoá học, Sinh học phổ thông.",
      meta: "3 dải • 17 chủ đề — Tiểu học (Lớp 1–5) • THCS (6–9) • THPT (10–12)" }
  ];
  function escS(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function attachBranchChrome() {
    var body = el("cd-body"); if (!body) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cd-backbar";
    btn.textContent = "← Tất cả chuyên đề";
    btn.addEventListener("click", function () { window.__openChuyenDe(); });
    body.insertBefore(btn, body.firstChild);
  }
  function renderCDDirectory() {
    var body = el("cd-body"); if (!body) return;
    body.innerHTML = "";
    var intro = document.createElement("p");
    intro.className = "topics-sub";
    intro.style.cssText = "text-align:center;margin:2px 0 14px";
    intro.textContent = "Chọn một nhánh chuyên đề để luyện thêm ngoài sách giáo khoa — mỗi câu đều có giải thích.";
    body.appendChild(intro);
    CD_BRANCHES.forEach(function (b) {
      var card = document.createElement("button");
      card.className = "cd-branch-card";
      card.setAttribute("data-branch", b.id);
      card.innerHTML = '<span class="cd-branch-emoji">' + b.emoji + '</span><span class="cd-branch-main"><span class="cd-branch-name">' + escS(b.name) + '</span><span class="cd-branch-desc">' + escS(b.desc) + '</span><span class="cd-branch-meta">' + escS(b.meta) + '</span></span><span class="cd-branch-arrow">›</span>';
      card.addEventListener("click", function () { window.__openCDBranch(b.id); });
      body.appendChild(card);
    });
  }
  window.__openChuyenDe = function () {
    window.__cdView = "dir";
    show("scr-chuyende");
    renderCDDirectory();
  };
  window.__openCDBranch = function (which) {
    var body = el("cd-body");
    if (which === "toan") {
      window.__ensureChuyenDe(function (ok) {
        show("scr-chuyende");
        if (ok && window.__CD) {
          window.__cdView = "toan";
          try { window.__CD.render(); attachBranchChrome(); }
          catch (e) { if (body) body.innerHTML = '<p class="cd-band-note">Chưa mở được chuyên đề — em thử lại nhé!</p>'; }
        } else if (body) {
          body.innerHTML = '<p class="cd-band-note">Chưa tải được dữ liệu chuyên đề — em kiểm tra mạng rồi thử lại nhé!</p>';
        }
      });
    } else if (which === "khoa") {
      window.__ensureKhoaHoc(function (ok) {
        show("scr-chuyende");
        if (ok && window.__KH) {
          window.__cdView = "khoa";
          try { window.__KH.render(); attachBranchChrome(); }
          catch (e) { if (body) body.innerHTML = '<p class="cd-band-note">Chưa mở được chuyên đề — em thử lại nhé!</p>'; }
        } else if (body) {
          body.innerHTML = '<p class="cd-band-note">Chưa tải được dữ liệu chuyên đề — em kiểm tra mạng rồi thử lại nhé!</p>';
        }
      });
    } else if (which === "en") {
      window.__ensureTiengAnh(function (ok) {
        show("scr-chuyende");
        if (ok && window.__EN) {
          window.__cdView = "en";
          try { window.__EN.render(); attachBranchChrome(); }
          catch (e) { if (body) body.innerHTML = '<p class="cd-band-note">Chưa mở được chuyên đề — em thử lại nhé!</p>'; }
        } else if (body) {
          body.innerHTML = '<p class="cd-band-note">Chưa tải được dữ liệu chuyên đề — em kiểm tra mạng rồi thử lại nhé!</p>';
        }
      });
    }
  };

  function injectCDCard() {
    try {
      if (typeof profile === "undefined" || !profile || !profile.name) return;
      var grid = el("subject-dynamic"); if (!grid) return;
      if (grid.querySelector(".cd-card")) return;
      var card = document.createElement("button");
      card.className = "subj-card cd-card";
      card.innerHTML = '<span class="big-emoji">🧠</span><span class="name">Chuyên đề nâng cao</span><span class="desc">Toán tư duy • Tiếng Anh luyện thi — theo cấp, câu hỏi có giải thích</span>';
      card.addEventListener("click", function () { window.__openChuyenDe(); });
      grid.appendChild(card);
    } catch (e) {}
  }
  if (typeof renderSubjects === "function") {
    var origRSCD = renderSubjects;
    renderSubjects = function () { var r = origRSCD.apply(this, arguments); injectCDCard(); return r; };
  }
  injectCDCard();

  var back = el("btn-cd-back");
  if (back) back.addEventListener("click", function () {
    if (window.__cdView === "toan" || window.__cdView === "en" || window.__cdView === "khoa") window.__openChuyenDe();
    else show("scr-home");
  });
})();
/*__CHUYENDE_SHELL_END__*/
/*__GIAITRI_SHELL_BEGIN__*/
/* ============================================================
   GÓC GIẢI TRÍ (vu mở đợt 2026-10-16) — thư mục giải trí mở rộng dần:
   - Thẻ "🎉 Góc giải trí" trên màn hình chính của MỌI lớp, cạnh thẻ
     Chuyên đề nâng cao; vào thư mục mới thấy các mục; dữ liệu nằm riêng
     ở assets/data/giaitri.js, nạp lười khi mở từng mục.
   - Registry riêng (KHÔNG nằm trong GRADES) nên đứng ngoài Kiểm tra
     năng lực, Thử thách mỗi ngày, In phiếu và tìm kiếm chủ đề.
   - Vòng chơi dùng lại launchTopic/startGame/buildPlaylist của game;
     ngữ cảnh Ôn câu sai qua móc window.__gtTopicContext ở topicContext()
     (điểm sao theo khóa "<lớp>|giaitri|<id>").
   ============================================================ */
(function () {
  if (window.__gtShellInstalled) return;
  window.__gtShellInstalled = true;

  var style = document.createElement("style");
  style.textContent =
    ".subj-card.gt-card{grid-column:1/-1;background:linear-gradient(135deg,#b45309,#e8871e);min-height:0;padding:16px 12px}" +
    ".login-loading{grid-column:1/-1;text-align:center;font-weight:800;color:var(--ink-soft);font-size:16px;margin:8px 0}" +
    ".gt-soon{opacity:.55;cursor:not-allowed}" +
    ".gt-soon .cd-branch-meta{color:#b45309}" +
    ".gt-cards-title{margin:18px 0 10px;font-size:18px}" +
    ".gt-card-grid{display:flex;flex-direction:column;gap:10px}" +
    ".gt-explore-card{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:13px 14px;border:3px solid var(--line);border-radius:16px;background:var(--card);cursor:pointer;font-family:inherit}" +
    ".gt-explore-card:hover{border-color:#e8871e}" +
    ".gt-explore-ic{font-size:30px;line-height:1}" +
    ".gt-explore-tx{display:flex;flex-direction:column;gap:2px}" +
    ".gt-explore-tx b{font-size:16px;color:var(--ink)}" +
    ".gt-explore-tx small{font-size:13px;font-weight:600;color:var(--ink-soft)}" +
    ".gt-story{font-size:17px;line-height:1.65;background:var(--card);border:3px solid var(--line);border-radius:16px;padding:16px 18px;margin:12px 0;text-align:justify}" +
    ".gt-factbox{background:#fdf3e3;border:3px solid #e8871e;border-radius:16px;padding:12px 16px;margin:0 0 14px;font-size:16px;line-height:1.7}";
  document.head.appendChild(style);

  try { if (typeof screens !== "undefined" && screens.indexOf("scr-giaitri") === -1) screens.push("scr-giaitri"); } catch (e) {}

  window.__gtScript = window.__gtScript || "";
  window.__gtWaiters = [];
  window.__ensureGiaiTri = function (cb) {
    if (window.__GT) { if (cb) cb(true); return; }
    if (window.__gtScript === "loading") { window.__gtWaiters.push(cb); return; }
    if (window.__gtScript === "error") { if (cb) cb(false); return; }
    window.__gtScript = "loading";
    var waiters = window.__gtWaiters = [].concat(cb || []);
    var sc = document.createElement("script");
    sc.src = "assets/data/giaitri.js";
    sc.onload = function () {
      window.__gtScript = "loaded";
      var ws = waiters.slice(); waiters.length = 0;
      ws.forEach(function (f) { if (f) try { f(!!window.__GT); } catch (e) {} });
    };
    sc.onerror = function () {
      window.__gtScript = "error";
      var ws = waiters.slice(); waiters.length = 0;
      ws.forEach(function (f) { if (f) try { f(false); } catch (e) {} });
    };
    (document.body || document.head).appendChild(sc);
  };

  window.__gtView = "dir";
  var GT_ITEMS = [
    { id: "dovui", emoji: "🌾", name: "Đố vui dân gian",
      desc: "Những câu đố truyền thống quen thuộc của ông cha — đoán đáp án và khám phá cách giải mã hình ảnh ẩn dụ.",
      meta: "Câu đố về đồ vật • con vật • thiên nhiên • cây quả • con người" },
    { id: "lichsu", emoji: "🏯", name: "Tìm hiểu lịch sử",
      desc: "12 thẻ khám phá theo dòng thời gian cùng ngân hàng câu hỏi từ bảng sự kiện đã kiểm chứng.",
      meta: "Từ Hùng Vương dựng nước đến Đại thắng mùa Xuân 1975" },
    { id: "rungchuong", emoji: "🔔", name: "Rung chuông vàng",
      desc: "Thử thách 15 câu từ ngân hàng của lớp em — sai một câu là dừng, có 3 quyền trợ giúp và huy hiệu Chuông đồng, bạc, vàng.",
      meta: "Chế độ sinh tồn • Dành cho Lớp 3–12" },
    { id: "tiachop", emoji: "⚡", name: "Tia chớp",
      desc: "Đua tốc độ 60 giây với ngân hàng của lớp em — trả lời đúng càng nhanh điểm càng cao, sai không bị trừ điểm.",
      meta: "Đua tốc độ 60 giây • Dành cho Lớp 3–12" },
    { id: "album", emoji: "📖", name: "Album thẻ anh hùng",
      desc: "Bộ sưu tập 12 thẻ khám phá lịch sử: mở thẻ và đạt bài quiz kèm theo để sưu tập vào album của em.",
      meta: "Sưu tập thẻ • Gắn với Tìm hiểu lịch sử" }
  ];
  function escG(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function attachGTChrome() {
    var body = el("gt-body"); if (!body) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cd-backbar";
    btn.textContent = "← Tất cả mục giải trí";
    btn.addEventListener("click", function () { window.__openGiaiTri(); });
    body.insertBefore(btn, body.firstChild);
  }
  function renderGTDirectory() {
    var body = el("gt-body"); if (!body) return;
    body.innerHTML = "";
    var intro = document.createElement("p");
    intro.className = "topics-sub";
    intro.style.cssText = "text-align:center;margin:2px 0 14px";
    intro.textContent = "Học nhiều rồi, ghé góc giải trí thư giãn một chút nhé — chơi mà vẫn học thêm bao điều hay!";
    body.appendChild(intro);
    GT_ITEMS.forEach(function (b) {
      var card = document.createElement("button");
      card.className = "cd-branch-card";
      card.setAttribute("data-gt-item", b.id);
      card.innerHTML = '<span class="cd-branch-emoji">' + b.emoji + '</span><span class="cd-branch-main"><span class="cd-branch-name">' + escG(b.name) + '</span><span class="cd-branch-desc">' + escG(b.desc) + '</span><span class="cd-branch-meta">' + escG(b.meta) + '</span></span><span class="cd-branch-arrow">›</span>';
      card.addEventListener("click", function () { window.__openGTItem(b.id); });
      body.appendChild(card);
    });
  }
  window.__openGiaiTri = function () {
    window.__gtView = "dir";
    show("scr-giaitri");
    renderGTDirectory();
  };
  window.__openGTItem = function (which) {
    var body = el("gt-body");
    window.__ensureGiaiTri(function (ok) {
      show("scr-giaitri");
      if (ok && window.__GT) {
        try {
          if (which === "dovui") window.__GT.renderDovui();
          else if (which === "lichsu") window.__GT.renderLichSu();
          else if (which === "rungchuong" && window.__GT.renderRungChuong) window.__GT.renderRungChuong();
          else if (which === "tiachop" && window.__GT.renderTiaChop) window.__GT.renderTiaChop();
          else if (which === "album" && window.__GT.renderAlbum) window.__GT.renderAlbum();
          else { window.__openGiaiTri(); return; }
          attachGTChrome();
        } catch (e) { if (body) body.innerHTML = '<p class="cd-band-note">Chưa mở được mục này — em thử lại nhé!</p>'; }
      } else if (body) {
        body.innerHTML = '<p class="cd-band-note">Chưa tải được dữ liệu giải trí — em kiểm tra mạng rồi thử lại nhé!</p>';
      }
    });
  };

  function injectGTCard() {
    try {
      if (typeof profile === "undefined" || !profile || !profile.name) return;
      var grid = el("subject-dynamic"); if (!grid) return;
      if (grid.querySelector(".gt-card")) return;
      var card = document.createElement("button");
      card.className = "subj-card gt-card";
      card.innerHTML = '<span class="big-emoji">🎉</span><span class="name">Góc giải trí</span><span class="desc">Đố vui dân gian • Tìm hiểu lịch sử — chơi mà học, thư giãn sau giờ học</span>';
      card.addEventListener("click", function () { window.__openGiaiTri(); });
      grid.appendChild(card);
    } catch (e) {}
  }
  if (typeof renderSubjects === "function") {
    var origRSGT = renderSubjects;
    renderSubjects = function () { var r = origRSGT.apply(this, arguments); injectGTCard(); return r; };
  }
  injectGTCard();

  var back = el("btn-gt-back");
  if (back) back.addEventListener("click", function () {
    if (window.__gtView === "item") {
      if (window.__GT && window.__GT.handleBack && window.__GT.handleBack()) return;
      window.__openGiaiTri();
    } else show("scr-home");
  });
})();
/*__GIAITRI_SHELL_END__*/
