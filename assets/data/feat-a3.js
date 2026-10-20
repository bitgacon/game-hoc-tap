/*__A3_FEATURES_BEGIN__*/
/* ============================================================
   ĐỢT A3 — NHÓM A (vu chốt 2026-10-14): (5) PHÁT ÂM TIẾNG ANH +
   (6) HỌC TIẾP + TÌM KIẾM CHỦ ĐỀ. Đặc tả: DAC-TA-NHOM-A.md.
   - Tính năng 5: nút 🔊 được khối Kiến thức gắn vào các hàng CẶP TỪ
     (bảng Từ vựng trọng tâm + bảng cặp) CHỈ khi môn của chủ đề là
     Tiếng Anh — nhận diện bằng ID môn trong dữ liệu GRADES (hàm
     window.__a3SubjIdOf ở khối Kiến thức; id "g<n>-eng"), không đoán
     theo tên hiển thị. Khối này chỉ xử lý SỰ KIỆN bấm nút: phát
     utterance tiếng Anh RIÊNG (lang "en-US", rate 0.9, ưu tiên giọng
     en, huỷ câu đang đọc trước). Cơ chế khen tiếng Việt (speakVi /
     speakPraise) KHÔNG bị đụng vào; lời đọc không chứa tên học sinh.
   - Tính năng 6a: thẻ "▶ Học tiếp" đọc activity_v1.lastTopic (khóa
     của A1 — CHỈ ĐỌC, không sửa cấu trúc); bấm → __ensureGrade nạp
     lớp nếu cần, đồng bộ lớp như bấm tab lớp, rồi launchTopic vào
     đúng chủ đề bằng cơ chế điều hướng sẵn có của game.
   - Tính năng 6b: ô tìm kiếm chủ đề ở màn hình chính và màn hình
     chọn chủ đề: chuẩn hoá bỏ dấu tiếng Việt + thường hoá cả hai
     phía; khớp theo tên chủ đề HOẶC tên môn; bấm kết quả → vào
     thẳng chủ đề; xoá ô tìm → giao diện trở lại nguyên trạng.
   ============================================================ */
(function () {
  "use strict";
  if (window.__a3Installed) return;
  window.__a3Installed = true;

  var LS_ACTIVITY = "gameHocTap_activity_v1";

  /* ---------------- CSS riêng (tiền tố a3-) ---------------- */
  var css = [
    ".a3-spk{display:inline-block;margin-left:7px;padding:2px 8px;border:2px solid var(--line,#f0dfba);border-radius:999px;background:#eef6ff;font-size:15px;line-height:1.35;cursor:pointer;vertical-align:middle}",
    ".a3-spk:hover{background:#dbeeff}",
    ".subj-card.a3-continue-card{grid-column:1/-1;background:linear-gradient(135deg,#e4572e,#f08a4b);min-height:0;padding:16px 12px}",
    ".a3-search{max-width:860px;margin:10px auto 4px;padding:0 2px}",
    ".a3-search input{width:100%;box-sizing:border-box;font-family:inherit;font-size:17px;font-weight:600;padding:12px 16px;border:3px solid var(--line,#f0dfba);border-radius:16px;background:var(--card,#fff);color:var(--ink,#33302a)}",
    ".a3-search input:focus{outline:none;border-color:var(--sun,#ffb703)}",
    ".a3-results{margin-top:10px;display:flex;flex-direction:column;gap:8px}",
    ".a3-result{display:flex;align-items:center;gap:10px;text-align:left;width:100%;font-family:inherit;border:3px solid var(--line,#f0dfba);background:var(--card,#fff);color:var(--ink,#33302a);border-radius:16px;padding:11px 14px;cursor:pointer}",
    ".a3-result:hover{border-color:var(--sun,#ffb703)}",
    ".a3-result .a3-r-emoji{font-size:24px;line-height:1}",
    ".a3-result .a3-r-name{font-weight:800;font-size:16px;display:block}",
    ".a3-result .a3-r-subj{font-weight:600;font-size:13.5px;color:var(--ink-soft,#6f675a);display:block}",
    ".a3-none{font-size:16px;font-weight:600;color:var(--ink-soft,#6f675a);background:#fffdf6;border:2px dashed var(--line,#f0dfba);border-radius:14px;padding:12px 14px;line-height:1.45}",
    ".a3-note{position:fixed;left:50%;bottom:22px;transform:translateX(-50%) translateY(20px);background:#33302a;color:#fff;font-size:16px;font-weight:700;padding:12px 20px;border-radius:999px;box-shadow:0 10px 26px rgba(0,0,0,.3);opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;z-index:1200;max-width:92vw;text-align:center}",
    ".a3-note.on{opacity:1;transform:translateX(-50%) translateY(0)}"
  ].join("\n");
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------------- thông báo chữ nhỏ (không đọc thành tiếng) ---------------- */
  var noteEl = null, noteTimer = 0;
  function a3Note(msg) {
    try {
      if (!noteEl) { noteEl = document.createElement("div"); noteEl.className = "a3-note"; document.body.appendChild(noteEl); }
      noteEl.textContent = msg;
      noteEl.classList.add("on");
      if (noteTimer) clearTimeout(noteTimer);
      noteTimer = setTimeout(function () { if (noteEl) noteEl.classList.remove("on"); }, 3600);
    } catch (e) {}
  }

  /* ---------------- Tính năng 5: phát âm tiếng Anh ----------------
     Utterance RIÊNG cho từ tiếng Anh; không dùng chung biến/cơ chế với
     speakVi/speakPraise nên giọng khen tiếng Việt giữ nguyên 100%. */
  function speakEn(text) {
    var tx = String(text == null ? "" : text).replace(/\s+/g, " ").trim();
    if (!tx) return false;
    try {
      if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
        a3Note("Thiết bị này chưa hỗ trợ giọng đọc — em hãy đọc to từ này nhé! 🔊");
        return false;
      }
      var ss = window.speechSynthesis;
      try { ss.cancel(); } catch (e) {} /* huỷ câu đang đọc trước khi đọc từ mới */
      var u = new SpeechSynthesisUtterance(tx);
      u.lang = "en-US";
      u.rate = 0.9;
      try {
        var vs = ss.getVoices() || [];
        for (var i = 0; i < vs.length; i++) {
          if (vs[i] && vs[i].lang && String(vs[i].lang).toLowerCase().indexOf("en") === 0) { u.voice = vs[i]; break; }
        }
      } catch (e) {}
      ss.speak(u);
      return true;
    } catch (e) {
      a3Note("Chưa đọc được từ này — em thử lại sau nhé! 🔊");
      return false;
    }
  }
  /* Uỷ nhiệm sự kiện cho nút 🔊 trong hộp Kiến thức (nội dung hộp được
     dựng lại mỗi lần mở nên gắn 1 listener ở document, đi bộ lên cha). */
  document.addEventListener("click", function (ev) {
    var n = ev.target;
    while (n && n !== document) {
      if (n.classList && n.classList.contains("a3-spk")) {
        ev.preventDefault();
        ev.stopPropagation();
        speakEn(n.getAttribute("data-a3-text"));
        return;
      }
      n = n.parentNode;
    }
  }, true);

  /* ---------------- tiện ích chung ---------------- */
  function loadJSON(key, def) { try { var v = JSON.parse(localStorage.getItem(key) || "null"); return v == null ? def : v; } catch (e) { return def; } }
  function curProfile() { try { return (typeof profile !== "undefined") ? profile : null; } catch (e) { return null; } }
  function curGrade() { try { return (typeof currentGrade !== "undefined" && currentGrade) ? +currentGrade : (curProfile() ? +curProfile().grade : 1); } catch (e) { return 1; } }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* Bỏ dấu tiếng Việt + thường hoá: NFD tách dấu, loại U+0300–U+036F
     (gồm cả dấu mũ/móc/râu), đ/Đ → d. */
  function foldVi(s) {
    return String(s == null ? "" : s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
  }

  /* ---------------- Tính năng 6a: Học tiếp ---------------- */
  function loadLastTopic() {
    var act = loadJSON(LS_ACTIVITY, null);
    var lt = act && act.lastTopic ? act.lastTopic : null;
    if (!lt || !lt.topicId || !lt.subjectId || !lt.grade) return null;
    return lt;
  }
  var continueRequest = 0;
  function goContinue(lt) {
    lt=lt||loadLastTopic(); if(!lt)return;
    var request=++continueRequest;
    window.__topics.ensure(lt,function(ctx){
      if(request!==continueRequest)return;
      if(!ctx){a3Note("Chưa mở được bài trước — em kiểm tra mạng rồi bấm Học tiếp để thử lại nhé!");return;}
      try{
        currentGrade=ctx.grade;
        var p=curProfile();if(p){p.grade=ctx.grade;try{saveProfile();}catch(e){}}
        try{renderSubjects();renderProfileBar();}catch(e){}
        launchTopic(ctx.subj,ctx.topic);
      }catch(e){a3Note("Chưa mở được bài trước — em chọn lại chủ đề nhé!");}
    });
  }
  function injectContinue() {
    var grid = document.getElementById("subject-dynamic");
    if (!grid) return;
    var old = grid.querySelector(".a3-continue-card");
    if (old) old.remove();
    if (!curProfile()) return;
    var lt = loadLastTopic();
    if (!lt) return;
    var card = document.createElement("button");
    card.className = "subj-card a3-continue-card";
    var gradeNote = (+lt.grade !== +curGrade()) ? " • Lớp " + lt.grade : "";
    card.innerHTML = '<span class="big-emoji">▶️</span><span class="name">Học tiếp</span><span class="desc">' +
      esc(lt.topicName || lt.topicId) + " • " + esc(lt.subjectName || "") + gradeNote + "</span>";
    card.addEventListener("click", function () { goContinue(lt); });
    grid.insertBefore(card, grid.firstChild);
  }
  if (typeof renderSubjects === "function") {
    var prevRSA3 = renderSubjects;
    renderSubjects = function () { var r = prevRSA3.apply(this, arguments); try { injectContinue(); } catch (e) {} return r; };
    try { injectContinue(); } catch (e) {}
  }

  /* ---------------- Tính năng 6b: Tìm kiếm chủ đề ---------------- */
  function searchTopics(grade, query) {
    var q = foldVi(query).trim();
    if (!q) return null;
    var G = (typeof GRADES !== "undefined" && GRADES) ? GRADES[grade] : null;
    if (!G || !G.subjects) return [];
    var out = [];
    G.subjects.forEach(function (s) {
      var subjHit = foldVi(s.name).indexOf(q) !== -1;
      (s.topics || []).forEach(function (t) {
        if (subjHit || foldVi(t.name).indexOf(q) !== -1) out.push({ subj: s, topic: t });
      });
    });
    return out;
  }
  var searchBoxes = []; /* {wrap, input, results, gridEl} */
  function buildSearchBox(anchorEl, gridEl) {
    if (!anchorEl || !gridEl) return null;
    var wrap = document.createElement("div");
    wrap.className = "a3-search";
    wrap.innerHTML = '<input type="search" class="a3-search-input" placeholder="🔎 Tìm chủ đề… (gõ không dấu cũng được)" aria-label="Tìm chủ đề">' +
      '<div class="a3-results" hidden></div>';
    anchorEl.parentNode.insertBefore(wrap, anchorEl);
    var box = { wrap: wrap, input: wrap.querySelector(".a3-search-input"), results: wrap.querySelector(".a3-results"), gridEl: gridEl };
    box.input.addEventListener("input", function () { renderSearch(box); });
    searchBoxes.push(box);
    return box;
  }
  function renderSearch(box) {
    var q = box.input.value || "";
    if (!foldVi(q).trim()) { resetSearchBox(box); return; }
    var hits = searchTopics(curGrade(), q) || [];
    box.results.innerHTML = "";
    if (!hits.length) {
      var none = document.createElement("div");
      none.className = "a3-none";
      none.textContent = "Không tìm thấy chủ đề nào khớp với “" + q + "” — em thử gõ ngắn hơn hoặc gõ không dấu nhé! 😊";
      box.results.appendChild(none);
    } else {
      hits.forEach(function (h) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "a3-result";
        b.innerHTML = '<span class="a3-r-emoji">' + esc(h.topic.emoji || "📘") + '</span><span><span class="a3-r-name">' +
          esc(h.topic.name) + '</span><span class="a3-r-subj">' + esc(h.subj.name) + " • Lớp " + curGrade() + "</span></span>";
        b.addEventListener("click", function () {
          resetAllSearch();
          if (typeof launchTopic === "function") launchTopic(h.subj, h.topic);
        });
        box.results.appendChild(b);
      });
    }
    box.results.hidden = false;
    box.gridEl.style.display = "none";
  }
  function resetSearchBox(box) {
    box.results.hidden = true;
    box.results.innerHTML = "";
    box.gridEl.style.display = "";
  }
  function resetAllSearch() {
    searchBoxes.forEach(function (box) { box.input.value = ""; resetSearchBox(box); });
  }
  var homeGrid = document.getElementById("subject-dynamic");
  if (homeGrid) buildSearchBox(homeGrid, homeGrid);
  var topicGrid = document.getElementById("topic-grid");
  if (topicGrid) buildSearchBox(topicGrid, topicGrid);
  /* Mở một môn mới → xoá trạng thái tìm kiếm để lưới chủ đề hiện nguyên vẹn. */
  if (typeof openSubject === "function") {
    var prevOSA3 = openSubject;
    openSubject = function () { try { resetAllSearch(); } catch (e) {} return prevOSA3.apply(this, arguments); };
  }

  /* Phơi cho kiểm chứng (cùng khuôn __a1/__a2/__assess). */
  window.__a3 = {
    speakEn: speakEn,
    foldVi: foldVi,
    loadLastTopic: loadLastTopic,
    goContinue: goContinue,
    searchTopics: searchTopics,
    injectContinue: injectContinue,
    resetSearch: resetAllSearch
  };
})();
/*__A3_FEATURES_END__*/
