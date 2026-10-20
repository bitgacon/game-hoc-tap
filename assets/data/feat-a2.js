"use strict";
/*__A2_FEATURES_BEGIN__*/
/* ============================================================
   ĐỢT A2 — NHÓM A (vu chốt 2026-10-14): (2) HỒ SƠ HỌC TẬP +
   (3) IN PHIẾU BÀI TẬP. Đặc tả: DAC-TA-NHOM-A.md.
   - Hồ sơ CHỈ ĐỌC: gameHocTap_profile_v2 (qua biến profile),
     gameHocTap_assess_v1, và các khóa của A1 qua window.__a1
     (activity / wrong / daily / badges). Không ghi, không đổi
     cấu trúc bất kỳ khóa nào. Streak dùng ĐÚNG hàm computeStreak
     của A1 (window.__a1.computeStreak) — không định nghĩa lại.
   - In phiếu: câu hỏi rút qua bộ sinh đề của Kiểm tra
     (window.__assess.buildTopicTest / buildSubjectTest — cùng
     ngân hàng pools/advPools của game, chỉ dạng choose/blank/
     true-false). Đáp án + giải thích nằm ở TRANG RIÊNG cuối
     phiếu; @media print chỉ cho hiện vùng phiếu.
   - Không đọc thành tiếng trong khối này nên không dính quy tắc
     tên học sinh trong lời đọc.
   ============================================================ */
(function () {
  if (window.__a2Installed) return;
  window.__a2Installed = true;

  var LS_ASSESS = "gameHocTap_assess_v1";

  /* ---------------- tiện ích (chỉ đọc) ---------------- */
  function loadJSON(key, def) { try { var v = JSON.parse(localStorage.getItem(key) || "null"); return v == null ? def : v; } catch (e) { return def; } }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function dayStrOf(d) { return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()); }
  function fmtDayMs(ms) { var d = new Date(ms); return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(); }
  function fmtScore(x) { return (Math.round(x * 10) / 10).toFixed(1).replace(".", ","); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function curProfile() { try { return (typeof profile !== "undefined") ? profile : null; } catch (e) { return null; } }
  function txtOf(html) {
    try { return roundText(html == null ? "" : String(html)); }
    catch (e) { var d = document.createElement("div"); d.innerHTML = html || ""; return (d.textContent || "").replace(/\s+/g, " ").trim(); }
  }
  var A1 = function () { return window.__a1 || null; };

  /* Điều kiện hiển thị cho huy hiệu chưa đạt (theo đúng điều kiện
     trao của A1 trong BADGES — chỉ là câu chữ mô tả). */
  var BADGE_COND = {
    "first-star": "Nhận ngôi sao đầu tiên khi luyện tập",
    "first-ten": "Có một bài kiểm tra đạt điểm 10",
    "streak-3": "Học liên tiếp 3 ngày",
    "streak-7": "Học liên tiếp 7 ngày",
    "daily-5": "Hoàn thành Thử thách hôm nay đủ 5 ngày",
    "chapter": "Chơi hết mọi chủ đề của một môn học",
    "stars-100": "Đạt tổng 100 sao",
    "stars-500": "Đạt tổng 500 sao",
    "clean-review": "Ôn sạch các câu sai đến hạn (khi kho từng có ít nhất 5 câu)",
    "rcv-bronze": "Leo qua nấc 5 ở Rung chuông vàng",
    "rcv-silver": "Leo qua nấc 10 ở Rung chuông vàng",
    "rcv-gold": "Rung được chuông vàng (leo hết 15 nấc)",
    "tc-bronze": "Đúng liên tiếp 5 câu trong một vòng Tia chớp (vòng đúng từ một nửa trở lên)",
    "tc-silver": "Đúng liên tiếp 8 câu trong một vòng Tia chớp (vòng đúng từ một nửa trở lên)",
    "tc-gold": "Đúng liên tiếp 14 câu trong một vòng Tia chớp (vòng đúng từ một nửa trở lên)",
    "card-collector": "Sưu tập đủ 12 thẻ anh hùng trong Album"
  };

  /* ---------------- CSS riêng (tiền tố a2- / ws-) ---------------- */
  var css = [
    ".subj-card.a2-profile-card{grid-column:1/-1;background:linear-gradient(135deg,#3f7fbf,#5b9bd5);min-height:0;padding:16px 12px}",
    ".subj-card.a2-ws-card{grid-column:1/-1;background:linear-gradient(135deg,#6a8f3f,#93b95c);min-height:0;padding:16px 12px}",
    ".a2-wrap{max-width:860px;margin:0 auto;padding:6px 2px 30px}",
    ".a2-card{background:var(--card,#fff);border:3px solid var(--line,#f0dfba);border-radius:22px;padding:20px;box-shadow:0 8px 24px rgba(90,70,20,.10);margin-bottom:16px}",
    ".a2-card h3{margin:0 0 12px;font-size:21px}",
    ".a2-h4{margin:16px 0 8px;font-size:17px}",
    ".a2-note{font-size:16px;color:var(--ink-soft,#6f675a);font-weight:600;line-height:1.45}",
    ".a2-info{display:flex;gap:16px;align-items:center;flex-wrap:wrap}",
    ".a2-info .a2-avatar{font-size:52px;line-height:1}",
    ".a2-info .a2-who{min-width:180px;flex:1}",
    ".a2-info .a2-name{font-size:24px;font-weight:900}",
    ".a2-info .a2-cls{font-size:16px;font-weight:700;color:var(--ink-soft,#6f675a)}",
    ".a2-stats{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}",
    ".a2-stat{background:#fffdf6;border:3px solid var(--line,#f0dfba);border-radius:16px;padding:8px 16px;text-align:center;min-width:104px}",
    ".a2-stat-n{display:block;font-size:24px;font-weight:900}",
    ".a2-stat-l{display:block;font-size:13px;font-weight:700;color:var(--ink-soft,#6f675a)}",
    ".a2-badges{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}",
    ".a2-badge{border:3px solid var(--line,#f0dfba);border-radius:16px;padding:12px 10px;text-align:center;background:#fffdf6}",
    ".a2-badge .a2-b-emoji{display:block;font-size:34px;line-height:1.1}",
    ".a2-badge .a2-b-name{display:block;font-weight:800;font-size:15px;margin-top:4px}",
    ".a2-badge .a2-b-sub{display:block;font-size:13px;font-weight:600;color:var(--ink-soft,#6f675a);margin-top:3px;line-height:1.35}",
    ".a2-badge.miss{opacity:.55;filter:grayscale(.8)}",
    ".a2-badge.got{border-color:var(--sun,#ffb703);background:#fff8e1}",
    ".a2-prow{display:flex;align-items:center;gap:10px;margin:7px 0}",
    ".a2-pname{flex:0 0 34%;font-weight:700;font-size:16px}",
    ".a2-pbar{flex:1;height:14px;background:#f1e8cf;border-radius:999px;overflow:hidden}",
    ".a2-pfill{display:block;height:100%;background:linear-gradient(90deg,#58a05c,#7cc47f);border-radius:999px}",
    ".a2-pnum{flex:0 0 auto;font-weight:800;font-size:15px;white-space:nowrap}",
    ".a2-table{width:100%;border-collapse:collapse;font-size:16px;font-weight:600}",
    ".a2-table th,.a2-table td{border-bottom:2px solid var(--line,#f0dfba);padding:8px 6px;text-align:left;vertical-align:top}",
    ".a2-weak{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;border:2px solid #e4572e;background:#fff5f1;border-radius:12px;padding:8px 12px;margin:6px 0}",
    ".a2-weak-name{font-weight:800}",
    ".a2-weak-meta{font-weight:700;color:#a33307;font-size:14px}",
    ".a2-week{display:flex;gap:8px;align-items:flex-end}",
    ".a2-day{flex:1;text-align:center}",
    ".a2-day-bar{display:block;height:16px;border-radius:8px;background:#eee2c4;margin:0 auto 6px;width:70%}",
    ".a2-day.on .a2-day-bar{height:52px;background:linear-gradient(180deg,#f2a541,#e07b39)}",
    ".a2-day.today .a2-day-l{color:#a33307}",
    ".a2-day-l{display:block;font-weight:800;font-size:14px}",
    ".a2-day-d{display:block;font-weight:600;font-size:12px;color:var(--ink-soft,#6f675a)}",
    ".a2-scope-row{display:flex;gap:10px;flex-wrap:wrap}",
    ".a2-scope{flex:1;min-width:190px;text-align:left;border:3px solid var(--line,#f0dfba);background:var(--card,#fff);color:var(--ink,#33302a);border-radius:16px;padding:12px 14px;cursor:pointer;font-family:inherit}",
    ".a2-scope .n{font-size:18px;font-weight:800;display:block}",
    ".a2-scope .d{font-size:14px;opacity:.75;display:block;margin-top:2px;font-weight:600}",
    ".a2-scope.sel{border-color:var(--sun,#ffb703);box-shadow:0 4px 0 var(--sun,#ffb703)}",
    ".a2-select{width:100%;font-family:inherit;font-size:18px;font-weight:700;padding:12px;border:3px solid var(--line,#f0dfba);border-radius:14px;background:#fffdf6;color:var(--ink,#33302a)}",
    ".a2-formrow{margin:12px 0}",
    ".a2-count-row{display:flex;gap:10px}",
    ".a2-count{flex:1;border:3px solid var(--line,#f0dfba);background:#fffdf6;border-radius:14px;padding:10px;font-family:inherit;font-weight:800;font-size:17px;cursor:pointer;color:var(--ink,#33302a)}",
    ".a2-count.sel{border-color:var(--sun,#ffb703);box-shadow:0 4px 0 var(--sun,#ffb703)}",
    /* ---- 2 nút mở phiếu ở thẻ mới (đợt tách In/Lưu PDF 2026-10-16) ---- */
    ".a2-ws-open{display:none;width:100%;text-align:center;text-decoration:none;box-sizing:border-box;margin-top:10px}",
    ".a2-ws-open.on{display:block}",
    ".a2-ws-note{display:none;margin-top:12px;border:3px dashed #e0a13c;background:#fff7e0;border-radius:14px;padding:12px 14px;font-size:16px;font-weight:600;line-height:1.5;color:#6b4e00}",
    ".a2-ws-note.on{display:block}",
    ".a2-ws-note a{font-weight:900;color:#1f6fb2}",
    /* ---- tờ phiếu (xem trước trên màn + bản in) ---- */
    "#a2-ws-print{margin-top:18px}",
    ".ws-paper{background:#fff;color:#1d1d1b;border:3px solid #d8d2c0;border-radius:10px;padding:26px 28px;box-shadow:0 8px 24px rgba(90,70,20,.12);font-size:16px;line-height:1.5}",
    ".ws-title{font-size:24px;font-weight:900;text-align:center;letter-spacing:.5px}",
    ".ws-meta{text-align:center;font-weight:800;font-size:17px;margin-top:4px}",
    ".ws-meta2{text-align:center;font-weight:600;font-size:14px;color:#555;margin-top:2px}",
    ".ws-fields{display:flex;gap:22px;flex-wrap:wrap;margin:16px 0 6px;font-weight:700}",
    ".ws-line{display:inline-block;border-bottom:2px solid #999;min-width:190px;height:15px;vertical-align:bottom}",
    ".ws-line.s{min-width:80px}",
    ".ws-line.long{min-width:280px}",
    ".ws-q{margin:15px 0}",
    ".ws-qp{font-weight:600}",
    ".ws-vis{margin:6px 0}",
    ".ws-fig{margin:6px 0;text-align:center}.ws-fig svg{width:230px;height:auto}",
    ".ws-opts{margin:6px 0 0 18px}",
    ".ws-opt{margin:3px 0}",
    ".ws-blank{margin:8px 0 0 18px;font-weight:700}",
    ".ws-tf{margin:8px 0 0 18px;font-weight:800;letter-spacing:1px}",
    ".ws-answers{margin-top:26px;border-top:3px dashed #bbb;padding-top:18px}",
    ".ws-a{margin:7px 0}",
    ".ws-a-key{font-weight:800}",
    ".ws-a-ex{font-weight:600}",
    "@media print{",
    "  body *{visibility:hidden!important}",
    "  #a2-ws-print,#a2-ws-print *{visibility:visible!important}",
    "  #a2-ws-print{position:absolute!important;left:0;top:0;width:100%;margin:0;padding:0}",
    "  .ws-paper{border:none;box-shadow:none;border-radius:0;padding:6px 4px}",
    "  .ws-q{page-break-inside:avoid}",
    "  .ws-answers{page-break-before:always;break-before:page;border-top:none}",
    "  @page{margin:13mm}",
    "}"
  ].join("\n");
  var styleEl = document.createElement("style");
  styleEl.id = "a2-style";
  styleEl.textContent = css;
  (document.head || document.body).appendChild(styleEl);

  /* ---------------- tạo 2 màn hình ---------------- */
  var wrap = document.querySelector(".wrap") || document.body;
  function mkSection(id, html) {
    var s = document.createElement("section");
    s.className = "screen"; s.id = id; s.innerHTML = html;
    wrap.appendChild(s); return s;
  }
  mkSection("scr-profile",
    '<div class="topbar"><button class="back-btn" id="a2-pf-back" aria-label="Quay lại">⬅️</button>' +
    '<div><h2>📊 Nhật ký học tập</h2><div class="sub">Sao, huy hiệu, tiến độ và kết quả kiểm tra của em trên máy này</div></div></div>' +
    '<div class="a2-wrap" id="a2-pf-body"></div>');
  mkSection("scr-worksheet",
    '<div class="topbar"><button class="back-btn" id="a2-ws-back" aria-label="Quay lại">⬅️</button>' +
    '<div><h2>🖨️ In phiếu bài tập</h2><div class="sub">Tạo phiếu giấy từ ngân hàng câu hỏi của game — in ra hoặc lưu PDF cho học sinh làm trên giấy</div></div></div>' +
    '<div class="a2-wrap"><div class="a2-card">' +
    '<p class="a2-note">Phiếu được rút từ <b>cùng ngân hàng câu hỏi</b> em vẫn luyện tập và kiểm tra (chỉ các dạng trắc nghiệm, điền khuyết, đúng/sai). ' +
    '<b>Đáp án và giải thích nằm ở trang riêng cuối phiếu</b> — làm xong bài hãy mở ra đối chiếu nhé.</p>' +
    '<div class="a2-formrow"><span class="field-label">Lớp</span><div class="a2-note" id="a2-ws-grade" style="font-size:18px;color:var(--ink,#33302a)">Lớp —</div></div>' +
    '<div class="a2-formrow"><span class="field-label">Phạm vi câu hỏi</span><div class="a2-scope-row">' +
    '<button type="button" class="a2-scope sel" id="a2-ws-scope-topic"><span class="n">📚 Theo chủ đề</span><span class="d">Câu hỏi của đúng một chương/chủ đề</span></button>' +
    '<button type="button" class="a2-scope" id="a2-ws-scope-subject"><span class="n">🗂️ Trộn cả môn</span><span class="d">Câu hỏi trộn đều các chủ đề của môn</span></button>' +
    '</div></div>' +
    '<div class="a2-formrow"><label class="field-label" for="a2-ws-subject">Môn học</label><select class="a2-select" id="a2-ws-subject"></select></div>' +
    '<div class="a2-formrow" id="a2-ws-row-topic"><label class="field-label" for="a2-ws-topic">Chủ đề</label><select class="a2-select" id="a2-ws-topic"></select></div>' +
    '<div class="a2-formrow"><span class="field-label">Số câu</span><div class="a2-count-row">' +
    '<button type="button" class="a2-count" data-n="10">10 câu</button>' +
    '<button type="button" class="a2-count sel" data-n="20">20 câu</button>' +
    '<button type="button" class="a2-count" data-n="30">30 câu</button>' +
    '</div></div>' +
    '<div class="login-err" id="a2-ws-err"></div>' +
    '<button class="big-btn primary" id="a2-ws-gen" style="width:100%">📄 Tạo phiếu xem trước</button>' +
    '<a class="big-btn primary a2-ws-open" id="a2-ws-btn-print2" target="_blank">🖨️ In phiếu</a>' +
    '<a class="big-btn alt a2-ws-open" id="a2-ws-btn-pdf" target="_blank">📄 Lưu PDF</a>' +
    '<div class="a2-ws-note" id="a2-ws-note"></div>' +
    '</div>' +
    '<div id="a2-ws-print"></div></div>');
  if (typeof screens !== "undefined" && screens.indexOf("scr-profile") === -1) {
    screens.push("scr-profile"); screens.push("scr-worksheet");
  }

  /* ================= TÍNH NĂNG 2 — HỒ SƠ HỌC TẬP ================= */
  function assessSummaryHtml() {
    var hist = loadJSON(LS_ASSESS, []);
    if (!Array.isArray(hist)) hist = [];
    hist = hist.filter(function (r) { return r && typeof r.score === "number"; });
    if (!hist.length) {
      return '<div class="a2-card"><h3>📝 Kết quả Kiểm tra</h3>' +
        '<p class="a2-note">Em chưa làm bài kiểm tra nào trên máy này. Khi em làm bài ở mục 📝 Kiểm tra năng lực, điểm số và các chủ đề cần ôn sẽ hiện ở đây nhé!</p></div>';
    }
    var n = hist.length, sum = 0, best = -1;
    hist.forEach(function (r) { sum += r.score; if (r.score > best) best = r.score; });
    var bySubj = {}, order = [];
    hist.forEach(function (r) {
      var label = (r.subjName || "Môn học") + " (Lớp " + r.grade + ")";
      if (!bySubj[label]) { bySubj[label] = { label: label, n: 0, sum: 0 }; order.push(label); }
      bySubj[label].n++; bySubj[label].sum += r.score;
    });
    var rows = order.map(function (k) {
      var b = bySubj[k];
      return '<tr><td>' + esc(b.label) + '</td><td>' + b.n + '</td><td>' + fmtScore(b.sum / b.n) + '</td></tr>';
    }).join("");
    /* Chủ đề cần ôn: với mỗi chủ đề lấy lần kiểm tra GẦN NHẤT có chứa nó;
       đúng dưới 60% ở lần đó thì gắn cờ. */
    var sorted = hist.slice().sort(function (a, b) { return (b.ts || 0) - (a.ts || 0); });
    var seen = {}, weak = [];
    sorted.forEach(function (r) {
      (r.perTopic || []).forEach(function (pt) {
        if (!pt || !pt.topicId || !pt.total) return;
        var k = r.grade + "|" + (r.subjId || "") + "|" + pt.topicId;
        if (seen[k]) return; seen[k] = 1;
        var ratio = pt.correct / pt.total;
        if (ratio < 0.6) weak.push({ name: pt.name || pt.topicId, subj: r.subjName || "", grade: r.grade, correct: pt.correct, total: pt.total, pct: Math.round(ratio * 100), ts: r.ts || 0 });
      });
    });
    weak.sort(function (a, b) { return a.pct - b.pct; });
    var weakHtml;
    if (weak.length) {
      weakHtml = '<h4 class="a2-h4">⚠️ Chủ đề cần ôn (lần kiểm tra gần nhất đúng dưới 60%)</h4>' + weak.map(function (w) {
        return '<div class="a2-weak"><span class="a2-weak-name">' + esc(w.name) + '</span>' +
          '<span class="a2-weak-meta">' + esc(w.subj) + ' • Lớp ' + w.grade + ' • Đúng ' + w.correct + '/' + w.total + ' (' + w.pct + '%) • ' + fmtDayMs(w.ts) + '</span></div>';
      }).join("");
    } else {
      weakHtml = '<p class="a2-note" style="margin-top:12px">Không có chủ đề nào dưới 60% ở các lần kiểm tra gần nhất. Tốt lắm, cứ thế phát huy nhé!</p>';
    }
    return '<div class="a2-card"><h3>📝 Kết quả Kiểm tra</h3>' +
      '<div class="a2-stats">' +
      '<div class="a2-stat"><span class="a2-stat-n" id="a2-as-n">' + n + '</span><span class="a2-stat-l">bài đã làm</span></div>' +
      '<div class="a2-stat"><span class="a2-stat-n" id="a2-as-avg">' + fmtScore(sum / n) + '</span><span class="a2-stat-l">điểm trung bình</span></div>' +
      '<div class="a2-stat"><span class="a2-stat-n" id="a2-as-best">' + fmtScore(best) + '</span><span class="a2-stat-l">điểm cao nhất</span></div>' +
      '</div>' +
      '<table class="a2-table" id="a2-as-table"><tr><th>Môn</th><th>Số bài</th><th>Điểm TB</th></tr>' + rows + '</table>' +
      weakHtml + '</div>';
  }

  function weekHtml(act) {
    var days = (act && act.days) || {};
    var names = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    var cols = "", any = false;
    for (var i = 6; i >= 0; i--) {
      var d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
      var on = !!days[dayStrOf(d)];
      if (on) any = true;
      cols += '<div class="a2-day' + (on ? " on" : "") + (i === 0 ? " today" : "") + '"><span class="a2-day-bar"></span>' +
        '<span class="a2-day-l">' + names[d.getDay()] + '</span><span class="a2-day-d">' + d.getDate() + '/' + (d.getMonth() + 1) + '</span></div>';
    }
    return '<div class="a2-card"><h3>📅 Hoạt động 7 ngày gần nhất</h3><div class="a2-week">' + cols + '</div>' +
      (any ? "" : '<p class="a2-note" style="margin-top:10px">Tuần này em chưa học ngày nào. Học một bài hôm nay để ngày hôm nay sáng lên nhé!</p>') + '</div>';
  }

  function fillProgress(gp, act) {
    var box = el("a2-pf-progress"); if (!box) return;
    var done = function () {
      var G = (typeof GRADES !== "undefined") ? GRADES[gp] : null;
      if (!G || !G.subjects) {
        box.innerHTML = '<p class="a2-note">Chưa nạp được dữ liệu Lớp ' + gp + '. Em quay lại trang đầu, chọn Lớp ' + gp + ' rồi mở lại nhật ký nhé!</p>';
        return;
      }
      var played = (act && act.playedTopics) || {};
      var anyPlayed = false;
      var rows = G.subjects.map(function (s) {
        var tot = s.topics.length;
        var dn = 0;
        s.topics.forEach(function (t) { if ((played[t.id] || 0) >= 1) dn++; });
        if (dn > 0) anyPlayed = true;
        var pct = tot ? Math.round(dn / tot * 100) : 0;
        return '<div class="a2-prow"><span class="a2-pname">' + s.emoji + ' ' + esc(s.name) + '</span>' +
          '<span class="a2-pbar"><span class="a2-pfill" style="width:' + pct + '%"></span></span>' +
          '<span class="a2-pnum" data-subj="' + esc(s.id) + '">' + dn + '/' + tot + ' chủ đề</span></div>';
      }).join("");
      box.innerHTML = rows + (anyPlayed ? "" :
        '<p class="a2-note">Em chưa chơi chủ đề nào của Lớp ' + gp + ' trên máy này. Học một bài là tiến độ sẽ hiện ở đây nhé!</p>');
    };
    if (typeof GRADES !== "undefined" && GRADES[gp]) done();
    else if (window.__ensureGrade) { box.innerHTML = '<p class="a2-note">Đang nạp dữ liệu Lớp ' + gp + '…</p>'; window.__ensureGrade(gp, function () { done(); }); }
    else done();
  }

  /* V14 — hai dòng Nhật ký cho Rung chuông vàng + Bộ sưu tập thẻ: CHỈ ĐỌC
     trực tiếp hai khóa mới (logic ghi nằm ở giaitri.js); đọc được kể cả khi
     tệp giải trí chưa nạp. */
  function rcvJournalHtml() {
    var r = loadJSON("gameHocTap_rcv_v1", null);
    var c = loadJSON("gameHocTap_cards_v1", null);
    var rcvLine;
    if (r && (r.runs || 0) > 0) {
      rcvLine = "🔔 Rung chuông vàng: nấc cao nhất " + (r.best || 0) + "/15 • đã chơi " + (r.runs || 0) + " lượt" +
        ((r.bells || 0) > 0 ? " • đã rung chuông " + r.bells + " lần" : "");
    } else rcvLine = "🔔 Rung chuông vàng: chưa chơi lượt nào — ghé Góc giải trí thử sức nhé!";
    var nCards = c && c.unlocked ? Object.keys(c.unlocked).length : 0;
    var cardLine = "📖 Bộ sưu tập thẻ anh hùng: đã sưu tập " + nCards + "/12 thẻ";
    return '<p class="a2-note" style="margin-top:10px">' + esc(rcvLine) + '</p>' +
      '<p class="a2-note" style="margin-top:4px">' + esc(cardLine) + '</p>';
  }
  function renderProfile() {
    var body = el("a2-pf-body"); if (!body) return;
    var pf = curProfile();
    if (!pf) {
      body.innerHTML = '<div class="a2-card"><p class="a2-note">Em hãy đăng nhập để xem nhật ký học tập của mình nhé!</p></div>';
      return;
    }
    var a1 = A1();
    var act = a1 ? a1.loadActivity() : { days: {}, playedTopics: {} };
    var st = a1 ? a1.computeStreak() : { n: 0, today: false };
    var badges = a1 ? a1.loadBadges() : { earned: {} };
    var defs = a1 ? a1.badges : [];
    var earned = badges.earned || {};
    var earnedCount = 0;
    defs.forEach(function (d) { if (earned[d.id]) earnedCount++; });
    var gp = pf.grade || 1;
    var html = "";
    html += '<div class="a2-card"><div class="a2-info"><span class="a2-avatar">🦉</span>' +
      '<div class="a2-who"><div class="a2-name">' + esc(pf.name) + '</div>' +
      '<div class="a2-cls">Lớp ' + gp + (pf.lop ? ' • Lớp học ' + esc(pf.lop) : '') + '</div></div></div>' +
      '<div class="a2-stats">' +
      '<div class="a2-stat"><span class="a2-stat-n" id="a2-pf-stars">' + (pf.totalStars || 0) + '</span><span class="a2-stat-l">⭐ tổng sao</span></div>' +
      '<div class="a2-stat"><span class="a2-stat-n" id="a2-pf-streak">' + st.n + '</span><span class="a2-stat-l">🔥 chuỗi ngày học</span></div>' +
      '<div class="a2-stat"><span class="a2-stat-n" id="a2-pf-badges">' + earnedCount + '/' + defs.length + '</span><span class="a2-stat-l">🏅 huy hiệu</span></div>' +
      '</div>' +
      (st.n > 0 && !st.today ? '<p class="a2-note" style="margin-top:10px">Hôm nay em chưa học — học một bài hôm nay để giữ chuỗi 🔥 nhé!</p>' : '') +
      rcvJournalHtml() +
      '</div>';
    html += '<div class="a2-card"><h3>🏅 Kệ huy hiệu</h3><div class="a2-badges">' + defs.map(function (d) {
      if (earned[d.id]) {
        return '<div class="a2-badge got" data-badge="' + esc(d.id) + '"><span class="a2-b-emoji">' + d.emoji + '</span>' +
          '<span class="a2-b-name">' + esc(d.name) + '</span><span class="a2-b-sub">Đạt ngày ' + fmtDayMs(earned[d.id]) + '</span></div>';
      }
      return '<div class="a2-badge miss" data-badge="' + esc(d.id) + '"><span class="a2-b-emoji">' + d.emoji + '</span>' +
        '<span class="a2-b-name">' + esc(d.name) + '</span><span class="a2-b-sub">' + esc(BADGE_COND[d.id] || "Chưa đạt") + '</span></div>';
    }).join("") + '</div></div>';
    html += '<div class="a2-card"><h3>📚 Tiến độ theo môn — Lớp ' + gp + '</h3><div id="a2-pf-progress"></div></div>';
    html += assessSummaryHtml();
    html += weekHtml(act);
    html += '<button class="big-btn alt" id="a2-pf-print" style="width:100%">🖨️ In phiếu bài tập</button>';
    body.innerHTML = html;
    var pb = el("a2-pf-print");
    if (pb) pb.addEventListener("click", function () { openWorksheet(); });
    fillProgress(gp, act);
  }
  function openProfile() { renderProfile(); show("scr-profile"); }

  /* ================= TÍNH NĂNG 3 — IN PHIẾU BÀI TẬP ================= */
  var wsScope = "topic", wsCount = 20, wsItems = null, wsBuilt = null;
  function wsGrade() {
    try { return (typeof currentGrade !== "undefined" && currentGrade) ? currentGrade : (curProfile() ? curProfile().grade : 1); }
    catch (e) { return 1; }
  }
  function wsSubject() {
    var g = wsGrade();
    var G = (typeof GRADES !== "undefined") ? GRADES[g] : null;
    if (!G) return null;
    var sel = el("a2-ws-subject");
    var id = sel ? sel.value : null;
    var found = null;
    G.subjects.forEach(function (s) { if (s.id === id) found = s; });
    return found || G.subjects[0] || null;
  }
  function fillWsTopics() {
    var sel = el("a2-ws-topic"); if (!sel) return;
    sel.innerHTML = "";
    var s = wsSubject(); if (!s) return;
    s.topics.forEach(function (t) {
      var o = document.createElement("option");
      o.value = t.id; o.textContent = t.name;
      sel.appendChild(o);
    });
  }
  function fillWsSubjects() {
    var g = wsGrade();
    var lab = el("a2-ws-grade"); if (lab) lab.textContent = "Lớp " + g + " (đổi lớp ở trang đầu nếu muốn in phiếu lớp khác)";
    var sel = el("a2-ws-subject"); if (!sel) return;
    sel.innerHTML = "";
    var G = (typeof GRADES !== "undefined") ? GRADES[g] : null;
    if (!G) return;
    G.subjects.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s.id; o.textContent = s.name;
      sel.appendChild(o);
    });
    fillWsTopics();
  }
  function openWorksheet() {
    show("scr-worksheet");
    var g = wsGrade();
    if (typeof GRADES !== "undefined" && GRADES[g]) fillWsSubjects();
    else if (window.__ensureGrade) window.__ensureGrade(g, function () { fillWsSubjects(); });
  }
  function setWsScope(sc) {
    wsScope = sc;
    el("a2-ws-scope-topic").classList.toggle("sel", sc === "topic");
    el("a2-ws-scope-subject").classList.toggle("sel", sc === "subject");
    el("a2-ws-row-topic").style.display = sc === "topic" ? "" : "none";
  }
  function renderSheet(built, items) {
    var box = el("a2-ws-print"); if (!box) return;
    box.innerHTML = "";
    var m = built.meta;
    var paper = document.createElement("div");
    paper.className = "ws-paper";
    var head = document.createElement("div");
    head.innerHTML = '<div class="ws-title">PHIẾU BÀI TẬP</div>' +
      '<div class="ws-meta">Lớp ' + m.grade + ' • Môn: ' + esc(m.subjName) +
      (m.scope === "topic" ? ' • Chủ đề: ' + esc(m.topicName) : ' • Trộn tất cả chủ đề của môn') + '</div>' +
      '<div class="ws-meta2">' + items.length + ' câu: trắc nghiệm, điền khuyết và đúng/sai. Đáp án và giải thích ở trang cuối.</div>';
    paper.appendChild(head);
    var fields = document.createElement("div");
    fields.className = "ws-fields";
    fields.innerHTML = '<span>Tên em: <i class="ws-line"></i></span><span>Ngày làm: <i class="ws-line s"></i></span>';
    paper.appendChild(fields);
    items.forEach(function (it, i) {
      var q = document.createElement("div");
      q.className = "ws-q"; q.setAttribute("data-type", it.type);
      var qp = document.createElement("div");
      qp.className = "ws-qp";
      var b = document.createElement("b"); b.textContent = "Câu " + (i + 1) + ". ";
      var sp = document.createElement("span"); sp.textContent = it.prompt || "";
      qp.appendChild(b); qp.appendChild(sp);
      q.appendChild(qp);
      if (it.figure && /^\s*<svg/.test(it.figure)) {
        var vf = document.createElement("div");
        vf.className = "ws-fig"; vf.innerHTML = it.figure;
        q.appendChild(vf);
      }
      if (it.visual) {
        var v = document.createElement("div");
        v.className = "ws-vis"; v.innerHTML = it.visual;
        q.appendChild(v);
      }
      if (it.type === "choose") {
        var opts = document.createElement("div");
        opts.className = "ws-opts";
        (it.options || []).forEach(function (o, oi) {
          var od = document.createElement("div");
          od.className = "ws-opt";
          od.innerHTML = "<b>" + "ABCD".charAt(oi) + ".</b> " + o;
          opts.appendChild(od);
        });
        q.appendChild(opts);
      } else if (it.type === "blank") {
        var bl = document.createElement("div");
        bl.className = "ws-blank";
        bl.innerHTML = 'Trả lời: <i class="ws-line long"></i>';
        q.appendChild(bl);
      } else if (it.type === "tf") {
        var tf = document.createElement("div");
        tf.className = "ws-tf";
        tf.textContent = "☐ Đúng        ☐ Sai";
        q.appendChild(tf);
      }
      paper.appendChild(q);
    });
    var ans = document.createElement("div");
    ans.className = "ws-answers";
    ans.innerHTML = '<div class="ws-title">ĐÁP ÁN VÀ GIẢI THÍCH</div>' +
      '<div class="ws-meta2">(Trang riêng — đáp án để đối chiếu sau khi làm xong)</div>';
    items.forEach(function (it, i) {
      var a = document.createElement("div");
      a.className = "ws-a";
      var bb = document.createElement("b"); bb.textContent = "Câu " + (i + 1) + ": ";
      var ct = document.createElement("span"); ct.className = "ws-a-key"; ct.textContent = it.correctText || "";
      a.appendChild(bb); a.appendChild(ct);
      if (it.explain) {
        var ex = document.createElement("span");
        ex.className = "ws-a-ex";
        ex.textContent = " — " + txtOf(it.explain);
        a.appendChild(ex);
      }
      ans.appendChild(a);
    });
    paper.appendChild(ans);
    box.appendChild(paper);
  }
  /* ---- ĐỢT TÁCH IN / LƯU PDF (vu yêu cầu 2026-10-16) ----
     Đường cũ gọi window.print() ngay trong tài liệu game. Khi chơi qua link
     chia sẻ, tài liệu game nằm trong KHUNG NHÚNG (iframe) — print() từ tài
     liệu bị nhúng bị trình duyệt bỏ qua im lặng (khung thiếu quyền mở hộp
     thoại) nên ấn in không có gì xảy ra và không bao giờ có file PDF.
     Đường mới: dựng phiếu thành một TÀI LIỆU HTML ĐỘC LẬP hoàn chỉnh rồi mở
     ở THẺ MỚI cấp cao nhất bằng thẻ <a href=blob: target=_blank> (thao tác từ
     chính cú chạm của người dùng). Ở thẻ cấp cao nhất, hộp in hoạt động bình
     thường: PC in trực tiếp; điện thoại chọn "Lưu dưới dạng PDF" trong hộp
     in rồi chia sẻ/gửi file. Nội dung phiếu lấy nguyên văn từ bản xem trước
     đã dựng (cùng .ws-paper) — phần sinh nội dung KHÔNG đổi.
     Nếu thẻ mới bị chặn, tài liệu con không gửi được tín hiệu "đã mở" về —
     game hiện thông báo + liên kết mở phiếu thủ công, không im lặng. */
  var WS_DOC_CSS = [
    "*{box-sizing:border-box}",
    "body{margin:0;background:#e8e2cf;font-family:\"Baloo 2\",\"Segoe UI\",system-ui,sans-serif;color:#1d1d1b}",
    ".ws-toolbar{position:sticky;top:0;z-index:5;display:flex;gap:12px;align-items:center;flex-wrap:wrap;background:#fff8e1;border-bottom:3px solid #e5cf8f;padding:12px 16px}",
    ".ws-thint{font-size:15px;font-weight:600;color:#6f675a}",
    ".ws-tbtn{font-family:inherit;font-size:19px;font-weight:900;color:#fff;background:#58a05c;border:none;border-radius:14px;padding:13px 22px;cursor:pointer;box-shadow:0 4px 0 #3c7240}",
    ".ws-tbtn:active{transform:translateY(2px);box-shadow:0 2px 0 #3c7240}",
    ".ws-guide{max-width:840px;margin:16px auto 0;background:#eaf4ff;border:3px solid #7db3e8;border-radius:14px;padding:16px 18px;font-size:17px;line-height:1.55}",
    ".ws-guide-t{font-size:21px;font-weight:900;margin-bottom:6px}",
    ".ws-guide ol{margin:6px 0 12px;padding-left:22px}",
    ".ws-guide li{margin:4px 0}",
    ".ws-paper{background:#fff;color:#1d1d1b;border:3px solid #d8d2c0;border-radius:10px;padding:26px 28px;box-shadow:0 8px 24px rgba(90,70,20,.12);font-size:16px;line-height:1.5;max-width:840px;margin:16px auto}",
    ".ws-title{font-size:24px;font-weight:900;text-align:center;letter-spacing:.5px}",
    ".ws-meta{text-align:center;font-weight:800;font-size:17px;margin-top:4px}",
    ".ws-meta2{text-align:center;font-weight:600;font-size:14px;color:#555;margin-top:2px}",
    ".ws-fields{display:flex;gap:22px;flex-wrap:wrap;margin:16px 0 6px;font-weight:700}",
    ".ws-line{display:inline-block;border-bottom:2px solid #999;min-width:190px;height:15px;vertical-align:bottom}",
    ".ws-line.s{min-width:80px}",
    ".ws-line.long{min-width:280px}",
    ".ws-q{margin:15px 0}",
    ".ws-qp{font-weight:600}",
    ".ws-vis{margin:6px 0}",
    ".ws-fig{margin:6px 0;text-align:center}.ws-fig svg{width:230px;height:auto}",
    ".ws-opts{margin:6px 0 0 18px}",
    ".ws-opt{margin:3px 0}",
    ".ws-blank{margin:8px 0 0 18px;font-weight:700}",
    ".ws-tf{margin:8px 0 0 18px;font-weight:800;letter-spacing:1px}",
    ".ws-answers{margin-top:26px;border-top:3px dashed #bbb;padding-top:18px}",
    ".ws-a{margin:7px 0}",
    ".ws-a-key{font-weight:800}",
    ".ws-a-ex{font-weight:600}",
    "@page{margin:13mm}",
    "@media print{",
    "  body{background:#fff}",
    "  .ws-toolbar,.ws-guide{display:none!important}",
    "  .ws-paper{border:none;box-shadow:none;border-radius:0;padding:0;margin:0;max-width:none}",
    "  .ws-q{page-break-inside:avoid}",
    "  .ws-answers{page-break-before:always;break-before:page;border-top:none}",
    "}"
  ].join("\n");
  function wsBuildDoc(mode) {
    var box = el("a2-ws-print"); if (!box || !wsBuilt) return null;
    var paper = box.querySelector(".ws-paper"); if (!paper) return null;
    var m = wsBuilt.meta || {};
    var title = "Phiếu bài tập — Lớp " + (m.grade || "") + " • " + (m.subjName || "") +
      (m.scope === "topic" && m.topicName ? " • " + m.topicName : "");
    var top = "";
    if (mode === "pdf") {
      top = '<div class="ws-guide"><div class="ws-guide-t">📄 LƯU PHIẾU THÀNH FILE PDF</div>' +
        '<ol><li>Bấm nút <b>Mở hộp in</b> bên dưới (hộp in cũng sẽ tự mở sau một lát).</li>' +
        '<li>Ở mục <b>Máy in / Đích đến</b> trong hộp in, chọn <b>“Lưu dưới dạng PDF”</b> (Save as PDF).</li>' +
        '<li>Bấm <b>Lưu</b> — file PDF sẽ nằm trong máy của em; mở file đó lên để chia sẻ hoặc gửi sang máy tính để in.</li></ol>' +
        '<button type="button" class="ws-tbtn" onclick="__wsDoPrint()">📄 Mở hộp in để lưu PDF</button></div>';
    } else {
      top = '<div class="ws-toolbar"><button type="button" class="ws-tbtn" onclick="__wsDoPrint()">🖨️ In phiếu</button>' +
        '<span class="ws-thint">Hộp in sẽ tự mở sau một lát — nếu chưa thấy hộp in, em bấm nút “In phiếu” nhé. In xong em đóng thẻ này để quay lại game.</span></div>';
    }
    var script = "<scr" + "ipt>\n" +
      "window.__wsPrint = { called: false, count: 0, at: 0, mode: \"" + mode + "\" };\n" +
      "function __wsDoPrint() { window.__wsPrint.called = true; window.__wsPrint.count++; window.__wsPrint.at = Date.now(); try { window.print(); } catch (e) {} }\n" +
      "window.addEventListener(\"load\", function () {\n" +
      "  try { if (window.opener) window.opener.postMessage({ t: \"gameHocTap-ws-opened\", mode: \"" + mode + "\" }, \"*\"); } catch (e) {}\n" +
      "  setTimeout(__wsDoPrint, 450);\n" +
      "});\n" +
      "</scr" + "ipt>";
    return "<!DOCTYPE html>\n<html lang=\"vi\"><head><meta charset=\"utf-8\">" +
      "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" +
      "<title>" + esc(title) + "</title><style>" + WS_DOC_CSS + "</style></head><body>" +
      top + paper.outerHTML + script + "</body></html>";
  }
  var wsUrls = { print: null, pdf: null };
  function wsMakeUrl(html) {
    try {
      if (!window.Blob || !window.URL || !URL.createObjectURL) return null;
      return URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
    } catch (e) { return null; }
  }
  var wsOpenSig = null, wsSigSeq = 0;
  function wsHideNote() { var n = el("a2-ws-note"); if (n) { n.classList.remove("on"); n.innerHTML = ""; } }
  function wsShowNote(mode, kind) {
    var n = el("a2-ws-note"); if (!n) return;
    if (kind === "nourl") {
      n.innerHTML = "⚠️ <b>Trình duyệt này chưa mở được phiếu ở thẻ mới.</b> Em thử mở game bằng một trình duyệt mới hơn (Chrome hoặc Safari) rồi bấm lại nhé!";
    } else {
      var url = wsUrls[mode];
      n.innerHTML = "⚠️ <b>Chưa thấy phiếu mở ở thẻ mới.</b> Có thể trình duyệt đã chặn thẻ mới (popup) từ trang này. " +
        (url ? 'Em hãy chạm vào liên kết này để mở phiếu: <a href="' + url + '" target="_blank">Mở phiếu ở thẻ mới</a>. ' : "") +
        "Nếu vẫn không mở được, hãy cho phép trang này mở thẻ mới (popup) trong cài đặt trình duyệt rồi bấm lại nút " +
        (mode === "pdf" ? "“Lưu PDF”" : "“In phiếu”") + " nhé!";
    }
    n.classList.add("on");
  }
  function wsArmOpen(mode) {
    var seq = ++wsSigSeq;
    wsOpenSig = { mode: mode, seq: seq, ok: false };
    setTimeout(function () {
      if (wsOpenSig && wsOpenSig.seq === seq && !wsOpenSig.ok) wsShowNote(mode, "blocked");
    }, 2000);
  }
  window.addEventListener("message", function (e) {
    var d = e && e.data;
    if (d && d.t === "gameHocTap-ws-opened") { if (wsOpenSig) wsOpenSig.ok = true; wsHideNote(); }
  });
  function wsSetupOpenButtons() {
    [["print", "a2-ws-btn-print2"], ["pdf", "a2-ws-btn-pdf"]].forEach(function (pair) {
      var mode = pair[0], a = el(pair[1]); if (!a) return;
      try { if (wsUrls[mode] && URL.revokeObjectURL) URL.revokeObjectURL(wsUrls[mode]); } catch (e) {}
      wsUrls[mode] = null;
      var html = wsBuildDoc(mode);
      var url = html ? wsMakeUrl(html) : null;
      wsUrls[mode] = url;
      if (url) a.setAttribute("href", url); else a.removeAttribute("href");
      a.classList.add("on");
    });
    wsHideNote();
  }

  function genSheet() {
    var err = el("a2-ws-err");
    var A = window.__assess;
    if (!A) { if (err) err.textContent = "Chưa sẵn sàng bộ rút câu. Em quay lại trang đầu rồi thử lại nhé!"; return; }
    var g = wsGrade();
    var subj = wsSubject();
    if (!subj) { if (err) err.textContent = "Chưa nạp được dữ liệu lớp. Em thử lại sau nhé!"; return; }
    var built = null;
    try {
      if (wsScope === "topic") {
        var tid = el("a2-ws-topic").value;
        built = A.buildTopicTest(g, subj.id, tid);
      } else {
        built = A.buildSubjectTest(g, subj.id);
      }
    } catch (e) { built = null; }
    if (!built || !built.items || !built.items.length) {
      if (err) err.textContent = "Chưa rút được câu cho lựa chọn này, em thử môn hoặc chủ đề khác nhé!";
      return;
    }
    var items = built.items.slice(0, wsCount);
    wsBuilt = built; wsItems = items;
    renderSheet(built, items);
    wsSetupOpenButtons();
    if (err) err.textContent = items.length < wsCount
      ? ("Ngân hàng câu của lựa chọn này hiện rút được " + items.length + " câu phù hợp — phiếu đã được tạo với " + items.length + " câu.")
      : "";
    var pv = el("a2-ws-print");
    if (pv && pv.scrollIntoView) pv.scrollIntoView({ behavior: "smooth" });
  }

  /* ---------------- gắn sự kiện + thẻ ở màn hình chính ---------------- */
  el("a2-pf-back").addEventListener("click", function () { show("scr-home"); });
  el("a2-ws-back").addEventListener("click", function () { show("scr-home"); });
  el("a2-ws-scope-topic").addEventListener("click", function () { setWsScope("topic"); });
  el("a2-ws-scope-subject").addEventListener("click", function () { setWsScope("subject"); });
  el("a2-ws-subject").addEventListener("change", function () { fillWsTopics(); });
  Array.prototype.forEach.call(document.querySelectorAll(".a2-count"), function (b) {
    b.addEventListener("click", function () {
      wsCount = parseInt(b.getAttribute("data-n"), 10) || 20;
      Array.prototype.forEach.call(document.querySelectorAll(".a2-count"), function (x) { x.classList.toggle("sel", x === b); });
    });
  });
  el("a2-ws-gen").addEventListener("click", genSheet);
  /* 2 nút mở phiếu: thẻ <a target=_blank> trỏ blob: của tài liệu phiếu độc lập.
     Bấm nút = vũ trang chờ tín hiệu "đã mở" từ tài liệu con (postMessage);
     quá 2 giây không có tín hiệu → hiện thông báo dự phòng (không im lặng). */
  [["a2-ws-btn-print2", "print"], ["a2-ws-btn-pdf", "pdf"]].forEach(function (pair) {
    var a = el(pair[0]); if (!a) return;
    a.addEventListener("click", function (ev) {
      if (!wsUrls[pair[1]]) { ev.preventDefault(); wsShowNote(pair[1], "nourl"); return; }
      wsArmOpen(pair[1]);
    });
  });

  function injectCards() {
    var grid = el("subject-dynamic");
    if (!grid || !curProfile()) return;
    if (!grid.querySelector(".a2-profile-card")) {
      var c1 = document.createElement("button");
      c1.className = "subj-card a2-profile-card";
      c1.innerHTML = '<span class="big-emoji">📊</span><span class="name">Nhật ký học tập</span><span class="desc">Sao, huy hiệu, tiến độ theo môn, điểm kiểm tra và chủ đề cần ôn</span>';
      c1.addEventListener("click", function () { openProfile(); });
      grid.appendChild(c1);
    }
    if (!grid.querySelector(".a2-ws-card")) {
      var c2 = document.createElement("button");
      c2.className = "subj-card a2-ws-card";
      c2.innerHTML = '<span class="big-emoji">🖨️</span><span class="name">In phiếu bài tập</span><span class="desc">Tạo phiếu giấy từ ngân hàng câu hỏi — đáp án ở trang cuối để chấm bài</span>';
      c2.addEventListener("click", function () { openWorksheet(); });
      grid.appendChild(c2);
    }
  }
  if (typeof renderSubjects === "function") {
    var origRS2 = renderSubjects;
    renderSubjects = function () { var r = origRS2.apply(this, arguments); try { injectCards(); } catch (e) {} return r; };
  }
  injectCards();

  /* ---------------- API phục vụ kiểm chứng (QA) ---------------- */
  window.__a2 = {
    openProfile: openProfile, renderProfile: renderProfile,
    openWorksheet: openWorksheet, genSheet: genSheet,
    setScope: setWsScope,
    setCount: function (n) { wsCount = n; },
    lastItems: function () { return wsItems; },
    lastBuilt: function () { return wsBuilt; },
    buildDoc: wsBuildDoc,
    docUrl: function (mode) { return wsUrls[mode] || null; }
  };
})();
/*__A2_FEATURES_END__*/
