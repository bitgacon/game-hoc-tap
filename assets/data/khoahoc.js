"use strict";
/* ================================================================
   CHUYÊN ĐỀ "🔬 KHÁM PHÁ KHOA HỌC" — tệp dữ liệu tự chứa hoàn toàn
   (tiền tố kh*, không phụ thuộc chuyende.js), chép khuôn hợp đồng
   của assets/data/tienganh.js: window.__KH_BANDS + window.__KH
   = {bands, subj, findTopic, render}.
   vu chốt 2026-10-19 (THIET-KE-KHAM-PHA-KHOA-HOC.md mục 7):
   3 dải × chủ đề lớn dùng chung, 17 tiểu mục, nội dung được phép
   vượt chương trình SGK (neo SGK là nền, dữ kiện mở rộng phải
   đúng khoa học và đã kiểm chứng).

   VÒNG TÍCH HỢP (v21): dữ liệu thật của cả 17 tiểu mục (864 câu) đã
   được gộp sẵn trong tệp này qua chính hợp đồng __KH_PARTS +
   mergeParts() (phần DATA bên dưới, core tự gộp khi nạp), rồi
   __KH_PARTS được xoá để tránh gộp trùng. Pools tĩnh được bộ
   chuyển đổi kh* ở cuối tệp biến thành hàm sinh câu hỏi theo
   khuôn tienganh.js/chuyende.js. Tệp tự chứa hoàn toàn.
   ================================================================ */
window.__KH_BANDS = window.__KH_BANDS || [];

/* Dữ liệu thật nằm ở phần DATA cuối phần khai báo này (đã gộp). */
function khSkeletonTopic(id, emoji, name, sub) {
  return {
    id: id, emoji: emoji, name: name, sub: sub,
    pools: { choose: [], blank: [], match: [], games: [] },
    knowledge: {
      notes: ["🔬 Chủ đề đang được cập nhật nội dung — em quay lại khám phá sau nhé!"],
      facts: [],
      pairs: []
    }
  };
}

/* ---------- DẢI TIỂU HỌC — band "th", Lớp 1–5 (neo chính Lớp 3–5) ---------- */
(function () {
  var topics = [
    /* 💧 neo: Khoa học 4 CĐ1 + Khoa học 5 CĐ1 */
    khSkeletonTopic("cd-kh-th-chat", "💧", "Chất biến hình quanh em", "Nước, không khí, đất và sự chuyển thể của chất"),
    /* ⚡ neo: Khoa học 4 CĐ2 + Khoa học 5 CĐ2 (hình K6 mạch điện) */
    khSkeletonTopic("cd-kh-th-nangluong", "⚡", "Năng lượng quanh em", "Ánh sáng, âm thanh, nhiệt và điện trong nhà"),
    /* 🌍 neo: TN&XH 2 CĐ6 + TN&XH 3 CĐ6 + Khoa học 4 Bài 2, 6 */
    khSkeletonTopic("cd-kh-th-traidat", "🌍", "Trái Đất và bầu trời", "Các mùa, thời tiết, Mặt Trời – Trái Đất – Mặt Trăng"),
    /* 🌱 neo: TN&XH 1–3 CĐ4 + Khoa học 4 CĐ3/4/6 + Khoa học 5 CĐ3/4/6 */
    khSkeletonTopic("cd-kh-th-susong", "🌱", "Sự sống quanh em", "Cây, con vật, nấm, vi khuẩn và chuỗi thức ăn"),
    /* 💪 neo: TN&XH 3 CĐ5 + Khoa học 4 CĐ5 + Khoa học 5 CĐ5 (mức sách dạy; xâm hại chỉ ở mức an toàn) */
    khSkeletonTopic("cd-kh-th-cothe", "💪", "Cơ thể em khoẻ mạnh", "Dinh dưỡng, chăm sóc sức khoẻ và an toàn cho cơ thể"),
    /* 🔍 neo: TN&XH 1 CĐ6 + Khoa học 4 Bài 3, 12 + Khoa học 5 Bài 9 */
    khSkeletonTopic("cd-kh-th-thinghiem", "🔍", "Nhà khoa học nhí", "Quan sát, đoán trước, làm thử và rút ra kết luận")
  ];
  window.__KH_BANDS.push({ id: "th", name: "Khám phá Tiểu học — Lớp 1–5", grades: [1, 2, 3, 4, 5], topics: topics });
})();

/* ---------- DẢI THCS — band "thcs", Lớp 6–9 (neo: KHTN 6–9 KNTT) ---------- */
(function () {
  var topics = [
    /* 🧪 neo: KHTN 6 Ch. II–IV + KHTN 7 Ch. I–II + KHTN 8 Ch. I–II + KHTN 9 Ch. VI–X */
    khSkeletonTopic("cd-kh-thcs-chat", "🧪", "Chất và biến đổi", "Nguyên tử, phân tử và phản ứng hoá học quanh ta"),
    /* 🔌 neo: KHTN 6 Ch. VIII–IX + KHTN 7 Ch. III–VI + KHTN 8 Ch. III–VI + KHTN 9 Ch. I–V */
    khSkeletonTopic("cd-kh-thcs-nangluong", "🔌", "Lực, điện và năng lượng", "Lực, áp suất, điện, từ, ánh sáng và âm thanh"),
    /* 🪐 neo: KHTN 6 Ch. X (cầu nối TN&XH 3 CĐ6, Khoa học 4 Bài 2) */
    khSkeletonTopic("cd-kh-thcs-traidat", "🪐", "Trái Đất và vũ trụ", "Hệ Mặt Trời, vì sao có mùa, Mặt Trăng đổi hình"),
    /* 🧬 neo: KHTN 6 Ch. V–VII + KHTN 7 Ch. VII–X + KHTN 8 Ch. VII–VIII + KHTN 9 Ch. XI–XIV */
    khSkeletonTopic("cd-kh-thcs-susong", "🧬", "Sự sống và cơ thể người", "Tế bào, cơ thể người, di truyền và tiến hoá"),
    /* 📏 neo: KHTN 6 Ch. I (Bài 1–8) */
    khSkeletonTopic("cd-kh-thcs-thinghiem", "📏", "Phương pháp và đo lường", "Chọn dụng cụ đo, đọc số đo và an toàn phòng thực hành")
  ];
  window.__KH_BANDS.push({ id: "thcs", name: "Khám phá THCS — Lớp 6–9", grades: [6, 7, 8, 9], topics: topics });
})();

/* ---------- DẢI THPT — band "thpt", Lớp 10–12 (neo: Vật lí/Hoá/Sinh KNTT) ---------- */
(function () {
  var topics = [
    /* ⚛️ neo: Hoá 10 Ch. 1–3, 7 + Hoá 11 Ch. 3–6 + Hoá 12 Ch. 1–4, 6–8 + Vật lí 12 Ch. I */
    khSkeletonTopic("cd-kh-thpt-chat", "⚛️", "Nguyên tử, phân tử và vật liệu", "Cấu tạo nguyên tử, liên kết và vật liệu quanh ta"),
    /* 🌊 neo: Vật lí 10 Ch. II–VII + Vật lí 11 Ch. I–IV + Vật lí 12 Ch. II–IV + Hoá 10 Ch. 5–6, Hoá 11 Ch. 1, Hoá 12 Ch. 5 */
    khSkeletonTopic("cd-kh-thpt-nangluong", "🌊", "Năng lượng, điện và sóng", "Cơ học, dao động, sóng, điện và hạt nhân"),
    /* 🧫 neo: Sinh 10 Phần 1–2 + Sinh 11 Phần 3 + Sinh 12 Phần 4–6 */
    khSkeletonTopic("cd-kh-thpt-susong", "🧫", "Tế bào, di truyền và sinh thái", "Sinh học tế bào, di truyền, tiến hoá và sinh thái"),
    /* 🏭 neo: Vật lí 11 CĐ2–3 + Hoá 11 CĐ2 + Hoá 12 CĐ1, CĐ3 + Vật lí 12 Bài 24 + Sinh 12 Ch. 8 */
    khSkeletonTopic("cd-kh-thpt-ungdung", "🏭", "Khoa học trong đời sống", "Cảm biến, truyền thông, phân bón và phát triển bền vững"),
    /* 📊 neo: Vật lí 10 Bài 1–3 */
    khSkeletonTopic("cd-kh-thpt-phuongphap", "📊", "Số liệu, sai số và suy luận", "Đọc số liệu, tính sai số, phân biệt tương quan – nhân quả"),
    /* 🌌 tiểu mục TÁCH RIÊNG theo chốt 7.5 — neo cầu nối: KHTN 6 Ch. X + Địa lí (Trái Đất/vũ trụ) + mở rộng vũ trụ đúng khoa học */
    khSkeletonTopic("cd-kh-thpt-traidat", "🌌", "Trái Đất & vũ trụ", "Hệ Mặt Trời, các hành tinh và những điều chưa biết về vũ trụ")
  ];
  window.__KH_BANDS.push({ id: "thpt", name: "Khám phá THPT — Lớp 10–12", grades: [10, 11, 12], topics: topics });
})();

/* ================================================================
   HỌ HÌNH K6 — MẠCH ĐIỆN ĐƠN GIẢN (vu chốt 7.8: kéo lên đợt 1;
   neo Khoa học 5 Bài 9 + KHTN 8 Ch. V). Cài CÙNG KHUÔN K1–K5:
   dùng lại figOpen/figText và bảng màu FIG_* của index.html, trả
   về chuỗi <svg> để figHTML bọc khi câu hỏi gán vào q.figure.
   K1–K5 sống trong index.html; K6 đặt tại đây vì index.html của
   vòng này chỉ được đúng một điểm chạm (khối định tuyến __topics)
   — hàm vẫn dùng chung helpers/màu với K1–K5 và phơi qua
   window.khCircuitSVG + window.__KH.circuitSVG.

   Tham số: { cells: 1|2 (số cặp pin), bulbs: 1|2 (bóng đèn nối
   tiếp), resistor: true|false (điện trở trên nhánh phải),
   sw: "open"|"closed" (trạng thái công tắc), labels: false để
   tắt nhãn bộ phận (bắt buộc tắt khi câu hỏi hỏi nhận diện bộ
   phận). Mạch vẽ dạng vòng chữ nhật: pin ở nhánh trái, đèn ở
   nhánh trên, điện trở (nếu có) ở nhánh phải, công tắc ở nhánh
   dưới.

   KỶ LUẬT CHỐNG LỘ TUYỆT ĐỐI của K6:
   - Bóng đèn LUÔN vẽ trung tính y hệt nhau trong mọi trạng thái:
     vòng tròn nền sáng hằng số + sợi đốt chữ X; KHÔNG tô vàng,
     KHÔNG tia sáng, KHÔNG vùng phát sáng — hình không bao giờ nói
     đèn đang sáng hay tắt.
   - Trạng thái công tắc trong hình là DỮ KIỆN đề bài cho (tham số
     sw do câu hỏi đặt theo đề), không phải đáp án: khi câu hỏi hỏi
     dự đoán "đóng công tắc thì đèn thế nào?", hình chỉ vẽ mạch ở
     trạng thái đề nêu và đèn vẫn trung tính như trên.
   ================================================================ */
var khCircuitSVG = (function () {
  function bulb(cx, cy) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="15" fill="#fffdf6" stroke="' + FIG_INK + '" stroke-width="2.6"/>' +
      '<line x1="' + (cx - 9) + '" y1="' + (cy - 9) + '" x2="' + (cx + 9) + '" y2="' + (cy + 9) + '" stroke="' + FIG_INK + '" stroke-width="1.8"/>' +
      '<line x1="' + (cx - 9) + '" y1="' + (cy + 9) + '" x2="' + (cx + 9) + '" y2="' + (cy - 9) + '" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  }
  return function (o) {
    o = o || {};
    var cells = o.cells === 2 ? 2 : 1;
    var bulbs = o.bulbs === 2 ? 2 : 1;
    var hasR = !!o.resistor;
    var closed = o.sw === "closed";
    var labels = o.labels !== false;
    var LX = 46, RX = 294, TY = 42, BY = 158;
    var out = figOpen("0 0 340 200", "Sơ đồ mạch điện đơn giản");

    /* --- pin (nhánh trái): mỗi cặp = 1 vạch dài (cực +) + 1 vạch
       ngắn dày (cực −); dây dọc chỉ nối giữa các đầu cặp pin --- */
    var pairH = 22, totalH = cells * pairH, y0 = 100 - totalH / 2;
    var plates = [];
    for (var i = 0; i < cells; i++) { plates.push(y0 + i * pairH); plates.push(y0 + i * pairH + 10); }
    out += '<line x1="' + LX + '" y1="' + TY + '" x2="' + LX + '" y2="' + plates[0] + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
    for (var s = 0; s + 2 < plates.length; s += 2)
      out += '<line x1="' + LX + '" y1="' + plates[s + 1] + '" x2="' + LX + '" y2="' + plates[s + 2] + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
    out += '<line x1="' + LX + '" y1="' + plates[plates.length - 1] + '" x2="' + LX + '" y2="' + BY + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
    for (var p = 0; p < plates.length; p += 2) {
      out += '<line x1="' + (LX - 18) + '" y1="' + plates[p] + '" x2="' + (LX + 18) + '" y2="' + plates[p] + '" stroke="' + FIG_INK + '" stroke-width="2.6"/>';
      out += '<line x1="' + (LX - 10) + '" y1="' + plates[p + 1] + '" x2="' + (LX + 10) + '" y2="' + plates[p + 1] + '" stroke="' + FIG_INK + '" stroke-width="6"/>';
    }

    /* --- nhánh trên: dây + bóng đèn (trung tính, xem kỷ luật) --- */
    var bx = bulbs === 2 ? [128, 212] : [170];
    var cursor = LX;
    bx.forEach(function (x) {
      out += '<line x1="' + cursor + '" y1="' + TY + '" x2="' + (x - 15) + '" y2="' + TY + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
      cursor = x + 15;
    });
    out += '<line x1="' + cursor + '" y1="' + TY + '" x2="' + RX + '" y2="' + TY + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
    bx.forEach(function (x) { out += bulb(x, TY); });

    /* --- nhánh phải: dây (+ điện trở zigzag nếu có) --- */
    if (hasR) {
      var rz0 = 73, rz1 = 127, pts = [RX + "," + rz0];
      for (var z = 1; z <= 6; z++) pts.push((RX + (z % 2 ? -8 : 8)) + "," + (rz0 + z * 9));
      out += '<line x1="' + RX + '" y1="' + TY + '" x2="' + RX + '" y2="' + rz0 + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
      out += '<polyline points="' + pts.join(" ") + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
      out += '<line x1="' + RX + '" y1="' + rz1 + '" x2="' + RX + '" y2="' + BY + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
    } else {
      out += '<line x1="' + RX + '" y1="' + TY + '" x2="' + RX + '" y2="' + BY + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
    }

    /* --- nhánh dưới: công tắc (chốt quay ở x=110, tiếp điểm x=158).
       Lưỡi dao vẽ theo trạng thái ĐỀ CHO: đóng = nằm ngang nối
       tiếp điểm; mở = nâng lên ~37°. --- */
    out += '<line x1="' + LX + '" y1="' + BY + '" x2="110" y2="' + BY + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
    out += '<line x1="158" y1="' + BY + '" x2="' + RX + '" y2="' + BY + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
    out += '<circle cx="110" cy="' + BY + '" r="4.5" fill="' + FIG_INK + '"/>';
    out += '<circle cx="158" cy="' + BY + '" r="4.5" fill="' + FIG_INK + '"/>';
    if (closed) out += '<line x1="110" y1="' + BY + '" x2="158" y2="' + BY + '" stroke="' + FIG_INK + '" stroke-width="3.4"/>';
    else out += '<line x1="110" y1="' + BY + '" x2="150" y2="122" stroke="' + FIG_INK + '" stroke-width="3.4"/>';

    if (labels) {
      out += figText(21, 104, "Pin", "middle", 12, FIG_MUT);
      bx.forEach(function (x) { out += figText(x, 16, "Bóng đèn", "middle", 12, FIG_MUT); });
      out += figText(134, 184, "Công tắc", "middle", 12, FIG_MUT);
      if (hasR) out += figText(RX - 12, 104, "Điện trở", "end", 12, FIG_MUT);
    }
    return out + "</svg>";
  };
})();
window.khCircuitSVG = khCircuitSVG;

/* ================================================================
   DATA — NỘI DUNG THẬT 17 TIỂU MỤC (đã chuẩn hoá blank về khuôn
   pre/post, đã sửa lớp 3 theo SGK, đã gắn fig). Gán vào hợp đồng
   __KH_PARTS; phần lõi bên dưới tự gọi mergeParts() khi nạp.
   ================================================================ */
window.__KH_PARTS = {
 "th": {
  "topics": [
   {
    "id": "cd-kh-th-chat",
    "emoji": "💧",
    "name": "Chất biến hình quanh em",
    "sub": "Nước, không khí, đất và những biến đổi quanh em",
    "pools": {
     "choose": [
      {
       "q": "Em để cốc nước đá lạnh trên bàn. Sau vài phút, mặt ngoài cốc có nhiều giọt nước. Vì sao?",
       "ans": "Hơi nước ngưng tụ trên thành cốc lạnh",
       "wrong": [
        "Nước trong cốc thấm qua thành cốc",
        "Đá trong cốc chảy ra ngoài cốc",
        "Bụi trong phòng hoá thành nước"
       ],
       "ex": "Không khí quanh ta có hơi nước. Hơi nước gặp thành cốc lạnh sẽ ngưng tụ thành những giọt nước nhỏ bám bên ngoài cốc."
      },
      {
       "q": "Buổi sáng, em thấy lá cây ngoài vườn ướt sương dù đêm qua không mưa. Sương thường đọng trên lá vào lúc nào?",
       "ans": "Ban đêm khi trời mát lạnh",
       "wrong": [
        "Giữa trưa nắng gắt",
        "Khi gió thổi rất mạnh",
        "Ngay sau cơn mưa rào"
       ],
       "ex": "Ban đêm trời mát, hơi nước trong không khí gặp lá lạnh sẽ ngưng tụ thành sương. Nắng lên, sương sẽ bay hơi dần."
      },
      {
       "q": "Mẹ muốn quần áo giặt xong mau khô. Mẹ nên phơi quần áo ở đâu?",
       "ans": "Nơi có nắng và thoáng gió",
       "wrong": [
        "Trong tủ kín và tối",
        "Trong phòng tắm ẩm ướt",
        "Dưới gầm bàn học"
       ],
       "ex": "Nắng làm nước trong quần áo bay hơi nhanh, gió thổi hơi nước đi. Phơi nơi nắng và thoáng gió thì áo mau khô nhất."
      },
      {
       "q": "Mẹ mở vung nồi canh đang sôi, em thấy mặt dưới vung có nhiều giọt nước. Các giọt nước này từ đâu ra?",
       "ans": "Từ hơi nước trong nồi gặp vung mát hơn",
       "wrong": [
        "Từ dầu ăn bắn lên vung",
        "Từ nước ngoài nồi rò vào",
        "Từ khói bếp đọng lại"
       ],
       "ex": "Hơi nước bốc lên từ nồi canh gặp mặt vung mát hơn sẽ ngưng tụ thành giọt nước."
      },
      {
       "q": "Em để que kem đá ra ngoài một lúc, que kem nhỏ dần rồi biến mất. Thật ra kem đã đi đâu?",
       "ans": "Đá tan thành nước trong cốc",
       "wrong": [
        "Đá bay hơi hết vào không khí",
        "Đá chìm xuống và biến mất hẳn",
        "Đá biến thành muối trắng"
       ],
       "ex": "Kem đá không biến mất. Nó nóng chảy thành nước lỏng, vẫn còn trong cốc."
      },
      {
       "q": "Mẹ rót nước vào khay rồi đặt vào ngăn đá tủ lạnh. Sau vài giờ, nước biến thành đá. Sự biến đổi này gọi là gì?",
       "ans": "Đông đặc",
       "wrong": [
        "Nóng chảy",
        "Bay hơi",
        "Ngưng tụ"
       ],
       "ex": "Chất lỏng gặp lạnh đủ mức sẽ đông đặc thành chất rắn. Nước lỏng đông đặc thành nước đá.",
       "fig": {
        "f": "k1trans",
        "a": {
         "nc": "Nóng chảy",
         "dd": "",
         "bh": "Bay hơi",
         "nt": "Ngưng tụ"
        }
       }
      },
      {
       "q": "Để thanh sô-cô-la ngoài nắng một lúc, sô-cô-la mềm và chảy ra. Hiện tượng này gọi là gì?",
       "ans": "Nóng chảy",
       "wrong": [
        "Đông đặc",
        "Ngưng tụ",
        "Bay hơi"
       ],
       "ex": "Chất rắn gặp nóng sẽ nóng chảy thành chất lỏng. Sô-cô-la đã nóng chảy vì nắng nóng."
      },
      {
       "q": "Em khuấy thìa muối vào cốc nước, một lúc sau không còn thấy hạt muối nhưng nước có vị mặn. Điều gì đã xảy ra?",
       "ans": "Muối tan vào nước, vẫn còn trong nước",
       "wrong": [
        "Muối đã biến mất hoàn toàn",
        "Muối đã biến thành cát",
        "Muối đã bay lên trời"
       ],
       "ex": "Muối không biến mất. Muối tan ra thành hạt cực nhỏ hoà đều trong nước nên em không nhìn thấy, nhưng nước vẫn mặn."
      },
      {
       "q": "Em có một cốc nước lẫn cát không tan. Muốn tách cát ra khỏi nước, em làm cách nào?",
       "ans": "Lọc qua giấy lọc hoặc vải",
       "wrong": [
        "Khuấy thật mạnh cho cát tan",
        "Đun cho cát bay hơi",
        "Dùng nam châm hút cát"
       ],
       "ex": "Cát không tan trong nước nên bị giấy lọc giữ lại, nước trong chảy qua. Đó là cách lọc."
      },
      {
       "q": "Nước lấy từ ao lên rất đục, lẫn bùn cát. Muốn làm nước trong hơn để dùng, em nên làm gì trước?",
       "ans": "Để lắng rồi lọc qua cát, sỏi",
       "wrong": [
        "Khuấy thêm bùn cho đều",
        "Đổ thêm dầu ăn vào",
        "Phơi nắng cho bùn biến mất"
       ],
       "ex": "Để yên cho cặn lắng xuống, rồi lọc qua lớp cát, sỏi sẽ giữ lại cặn bẩn. Nước sau lọc trong hơn nhiều."
      },
      {
       "q": "Nước trong hồ gặp nắng nóng, biến thành hơi nước bay lên cao. Sự chuyển thể này gọi là gì?",
       "ans": "Bay hơi",
       "wrong": [
        "Đông đặc",
        "Nóng chảy",
        "Ngưng tụ"
       ],
       "ex": "Chất lỏng biến thành hơi gọi là bay hơi. Nắng càng nóng, nước bay hơi càng nhanh.",
       "fig": {
        "f": "k1trans",
        "a": {
         "nc": "Nóng chảy",
         "dd": "Đông đặc",
         "bh": "",
         "nt": "Ngưng tụ"
        }
       }
      },
      {
       "q": "Một chất có các hạt xếp gần nhau nhưng vẫn trượt lên nhau được, và chất không có hình dạng riêng. Chất đó đang ở thể nào?",
       "ans": "Thể lỏng",
       "wrong": [
        "Thể rắn",
        "Thể khí",
        "Thể bột"
       ],
       "ex": "Ở thể lỏng, các hạt gần nhau nhưng vẫn trượt được nên chất lỏng chảy và mang hình của vật chứa.",
       "fig": {
        "f": "k1panels",
        "a": [
         "ran",
         "long",
         "khi"
        ]
       }
      },
      {
       "q": "Hơi nước trên cao gặp lạnh, ngưng tụ thành mây. Khi giọt nước trong mây nặng dần, chúng rơi xuống đất. Hiện tượng đó gọi là gì?",
       "ans": "Mưa",
       "wrong": [
        "Sương mù",
        "Gió bão",
        "Nắng nóng"
       ],
       "ex": "Giọt nước trong mây lớn dần, nặng quá sẽ rơi xuống thành mưa. Mưa là một phần của vòng tuần hoàn nước.",
       "fig": {
        "f": "k3cycle",
        "a": "mua"
       }
      },
      {
       "q": "Em úp một chiếc cốc rỗng xuống chậu nước, thấy có bọt khí nổi lên khi nghiêng cốc. Điều đó cho biết gì?",
       "ans": "Trong cốc rỗng vẫn có không khí",
       "wrong": [
        "Trong cốc có nước sẵn",
        "Trong cốc có cát",
        "Trong cốc không có gì cả"
       ],
       "ex": "Cốc trông rỗng nhưng bên trong có không khí. Khi nghiêng cốc, không khí thoát ra thành bọt khí nổi lên."
      },
      {
       "q": "Gió mà em cảm thấy mát trên mặt thật ra là gì?",
       "ans": "Không khí đang chuyển động",
       "wrong": [
        "Hơi nước đang rơi xuống",
        "Ánh nắng đang thổi đi",
        "Đất đang quay nhanh"
       ],
       "ex": "Gió chính là không khí chuyển động từ nơi này sang nơi khác. Gió mạnh thì cây cối nghiêng theo."
      },
      {
       "q": "Nghe tin bão sắp về, gia đình em nên làm gì để an toàn?",
       "ans": "Chằng chống nhà cửa, ở nơi an toàn",
       "wrong": [
        "Ra biển xem sóng lớn",
        "Mở hết cửa cho gió lùa",
        "Trèo lên mái nhà chơi"
       ],
       "ex": "Khi bão về, cần chằng chống nhà cửa, cất đồ dễ bay và ở yên nơi an toàn, nghe lời người lớn."
      },
      {
       "q": "Em đào một nắm đất vườn lên xem. Đất gồm những thành phần nào?",
       "ans": "Chất khoáng, mùn, nước và không khí",
       "wrong": [
        "Chỉ có cát và đá",
        "Chỉ có nước và nhựa",
        "Chỉ có lá cây khô"
       ],
       "ex": "Đất không chỉ có cát đá. Trong đất còn có mùn, nước và không khí — nhờ vậy cây mới sống được trong đất."
      },
      {
       "q": "Em thả một cục đất khô vào cốc nước, thấy nhiều bọt khí nhỏ nổi lên. Các bọt khí đó là gì?",
       "ans": "Không khí",
       "wrong": [
        "Hơi nước sôi",
        "Khí từ cát cháy",
        "Bọt xà phòng"
       ],
       "ex": "Trong đất có nhiều khe nhỏ chứa không khí. Thả vào nước, nước tràn vào khe và đẩy không khí ra thành bọt."
      },
      {
       "q": "Một quả đồi bị chặt hết cây, sau trận mưa lớn đất bị trôi đi nhiều. Vì sao?",
       "ans": "Không có rễ cây giữ đất lại",
       "wrong": [
        "Vì mưa làm đất biến thành nước",
        "Vì đồi không có đá",
        "Vì gió thổi đất bay lên trời"
       ],
       "ex": "Rễ cây giữ đất như những bàn tay nhỏ. Đồi trọc không còn rễ giữ nên mưa lớn làm đất xói mòn, trôi đi."
      },
      {
       "q": "Việc làm nào làm cho đất bị ô nhiễm?",
       "ans": "Đổ rác nhựa và hoá chất ra đất",
       "wrong": [
        "Trồng thêm cây xanh",
        "Bón phân hữu cơ vừa đủ",
        "Nhặt rác quanh vườn"
       ],
       "ex": "Rác nhựa rất lâu phân huỷ và hoá chất độc ngấm vào đất làm đất ô nhiễm, cây khó sống."
      },
      {
       "q": "Em đốt một tờ giấy, giấy cháy thành tro đen và khói. Đây là loại biến đổi nào?",
       "ans": "Biến đổi hoá học",
       "wrong": [
        "Biến đổi trạng thái của chất",
        "Sự bay hơi của giấy",
        "Sự đông đặc của giấy"
       ],
       "ex": "Giấy cháy tạo ra chất mới là tro và khói, không lấy lại tờ giấy được nữa. Đó là biến đổi hoá học."
      },
      {
       "q": "Sáp nến bị đun chảy ra, để nguội lại đông cứng và vẫn là sáp nến. Đây là loại biến đổi nào?",
       "ans": "Biến đổi trạng thái của chất",
       "wrong": [
        "Biến đổi hoá học",
        "Sự phân huỷ của sáp",
        "Sự bay hơi của sáp"
       ],
       "ex": "Sáp chỉ đổi từ thể rắn sang thể lỏng rồi ngược lại, vẫn là sáp nến. Đó là biến đổi trạng thái, không tạo chất mới."
      },
      {
       "q": "Bạn nói: đường tan trong trà là đã biến thành chất mới. Nói vậy đúng chưa?",
       "ans": "Chưa, đường chỉ tan ra trong nước",
       "wrong": [
        "Đúng, đường đã thành trà",
        "Đúng, đường đã biến mất hẳn",
        "Chưa, vì đường đã thành đá"
       ],
       "ex": "Đường tan trong nước chỉ phân tán thành hạt nhỏ, vẫn là đường. Đun cho nước bay hơi, em sẽ thu lại được đường."
      },
      {
       "q": "Trên miệng ấm nước đang sôi có làn trắng như khói bay lên. Làn trắng đó thật ra là gì?",
       "ans": "Những giọt nước rất nhỏ đã ngưng tụ",
       "wrong": [
        "Khói từ củi cháy",
        "Bột trắng trong nước",
        "Hơi nước khô màu trắng"
       ],
       "ex": "Hơi nước thật ra không màu. Khi gặp không khí mát hơn, hơi nước ngưng tụ thành giọt nhỏ li ti trông như làn khói trắng."
      },
      {
       "q": "Muốn lấy lại muối từ một cốc nước muối, em làm cách nào?",
       "ans": "Đun cho nước bay hơi hết, muối còn lại",
       "wrong": [
        "Lọc qua giấy lọc",
        "Để vào ngăn đá tủ lạnh",
        "Khuấy thêm nước vào"
       ],
       "ex": "Muối đã tan nên lọc không giữ được. Đun hoặc phơi cho nước bay hơi hết, muối sẽ ở lại."
      },
      {
       "q": "Cô giáo viết phấn ướt lên bảng, một lúc sau vệt nước tự khô đi. Nước đã đi đâu?",
       "ans": "Bay hơi vào không khí",
       "wrong": [
        "Chảy vào trong viên phấn",
        "Biến thành bụi trắng",
        "Đông đặc trên bảng"
       ],
       "ex": "Nước trên bảng bay hơi dần vào không khí nên vệt nước khô đi, dù không ai lau."
      },
      {
       "q": "Không khí có ở những đâu quanh em?",
       "ans": "Ở khắp nơi quanh em",
       "wrong": [
        "Chỉ ở ngoài sân",
        "Chỉ ở trong bóng bay",
        "Chỉ ở trên cao"
       ],
       "ex": "Không khí ở khắp nơi: trong phòng học, trong cốc rỗng, trong đất và cả trong nước."
      },
      {
       "q": "Quả bóng bay để ngoài nắng một lúc thì nổ. Vì sao?",
       "ans": "Không khí trong bóng nóng lên, giãn nở ra",
       "wrong": [
        "Vì nắng làm cao su nặng thêm",
        "Vì gió thổi vào bóng",
        "Vì bóng tự sinh thêm không khí"
       ],
       "ex": "Nắng làm không khí trong bóng nóng lên và giãn nở, ép căng vỏ bóng. Căng quá mức, bóng sẽ nổ."
      },
      {
       "q": "Quả bóng bay căng để trong phòng lạnh một lúc lại hơi xẹp xuống. Vì sao?",
       "ans": "Không khí lạnh co lại",
       "wrong": [
        "Vì bóng bị thủng lỗ to",
        "Vì không khí biến thành nước",
        "Vì cao su tự hút không khí vào"
       ],
       "ex": "Không khí khi lạnh đi sẽ co lại, chiếm ít chỗ hơn nên quả bóng trông xẹp hơn."
      }
     ],
     "blank": [
      {
       "ans": "lỏng",
       "wrong": [
        "khí",
        "bột",
        "đá"
       ],
       "ex": "Bơ gặp nóng sẽ nóng chảy thành thể lỏng. Để lạnh, bơ lại đông cứng như trước.",
       "pre": "Khi đun nóng nhẹ, miếng bơ chuyển từ thể rắn sang thể ",
       "post": "."
      },
      {
       "ans": "ngưng tụ",
       "wrong": [
        "bay hơi",
        "nóng chảy",
        "đông đặc"
       ],
       "ex": "Hơi nước chuyển thành nước lỏng gọi là ngưng tụ. Sương trên lá là hơi nước ngưng tụ.",
       "pre": "Hơi nước gặp bề mặt lạnh sẽ ",
       "post": " thành giọt nước."
      },
      {
       "ans": "dung dịch",
       "wrong": [
        "khối rắn",
        "bọt khí",
        "miếng đá"
       ],
       "ex": "Chất rắn tan đều trong chất lỏng tạo thành dung dịch. Nước đường là một dung dịch.",
       "pre": "Đường khuấy tan đều trong nước tạo thành một ",
       "post": "."
      },
      {
       "ans": "gió",
       "wrong": [
        "mưa",
        "sương",
        "đất"
       ],
       "ex": "Gió là không khí đang chuyển động. Không khí chuyển động càng nhanh, gió càng mạnh.",
       "pre": "Không khí chuyển động từ nơi này sang nơi khác tạo thành ",
       "post": "."
      },
      {
       "ans": "mùn",
       "wrong": [
        "cát",
        "sỏi",
        "nhựa"
       ],
       "ex": "Mùn là phần xác sinh vật đã phân huỷ trong đất. Đất nhiều mùn thì tơi xốp và tốt cho cây.",
       "pre": "Xác cây và con vật phân huỷ trong đất tạo thành chất ",
       "post": "."
      },
      {
       "ans": "rắn",
       "wrong": [
        "lỏng",
        "khí",
        "hơi"
       ],
       "ex": "Nước có ba thể: rắn là nước đá, lỏng là nước thường, khí là hơi nước.",
       "pre": "Nước đá là nước ở thể ",
       "post": "."
      },
      {
       "ans": "mây",
       "wrong": [
        "gió",
        "đất",
        "lửa"
       ],
       "ex": "Mây là tập hợp rất nhiều giọt nước nhỏ và hạt băng li ti lơ lửng trên cao.",
       "pre": "Rất nhiều giọt nước nhỏ tụ lại trên cao tạo thành ",
       "post": "."
      },
      {
       "ans": "muối",
       "wrong": [
        "cát",
        "sỏi",
        "dầu ăn"
       ],
       "ex": "Muối tan trong nước biển không bay hơi. Nước bay hơi hết, muối ở lại — đó là cách làm muối.",
       "pre": "Phơi nước biển dưới nắng, nước bay hơi dần và ",
       "post": " còn lại trong ruộng."
      },
      {
       "ans": "sàng",
       "wrong": [
        "phễu",
        "thìa",
        "bình"
       ],
       "ex": "Sàng có lỗ vừa cho hạt nhỏ lọt qua, giữ hạt to lại. Đây là cách tách chất bằng sàng.",
       "pre": "Muốn tách đỗ xanh ra khỏi gạo, em dùng cái ",
       "post": " có lỗ vừa."
      },
      {
       "ans": "lắng",
       "wrong": [
        "nổi",
        "bay",
        "cháy"
       ],
       "ex": "Cặn nặng sẽ lắng xuống đáy khi để yên. Gạn nhẹ phần nước trong phía trên là cách lắng gạn.",
       "pre": "Để nước đục trong hơn, em để yên cho cặn ",
       "post": " xuống đáy rồi gạn phần nước trong."
      },
      {
       "ans": "riêng",
       "wrong": [
        "màu sắc",
        "trọng lượng",
        "thể tích"
       ],
       "ex": "Chất lỏng không có hình dạng riêng: đổ vào cốc thì hình cốc, đổ vào chai thì hình chai.",
       "pre": "Chất lỏng không có hình dạng ",
       "post": " mà mang hình dạng của vật chứa nó."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Nước lỏng không có hình dạng riêng, đổ vào vật nào thì mang hình của vật đó.",
       "truth": true,
       "explain": "Đúng: chất lỏng chảy và mang hình của vật chứa, không giữ một hình cố định như chất rắn."
      },
      {
       "stmt": "Nước đá tan thành nước là một biến đổi hoá học.",
       "truth": false,
       "explain": "Sai: đá tan chỉ là đổi thể từ rắn sang lỏng, vẫn là nước. Đó là biến đổi trạng thái."
      },
      {
       "stmt": "Trong đất vườn có chứa không khí.",
       "truth": true,
       "explain": "Đúng: đất có nhiều khe nhỏ chứa không khí. Thả cục đất khô vào nước sẽ thấy bọt khí nổi lên."
      },
      {
       "stmt": "Muối tan trong nước là đã biến mất hẳn, không còn trong nước nữa.",
       "truth": false,
       "explain": "Sai: muối chỉ tan ra thành hạt rất nhỏ hoà trong nước. Nước vẫn mặn và đun bay hơi nước sẽ thu lại muối."
      },
      {
       "stmt": "Đốt giấy cháy thành tro là biến đổi hoá học.",
       "truth": true,
       "explain": "Đúng: giấy cháy tạo ra chất mới là tro và khói, không trở lại thành giấy được."
      },
      {
       "stmt": "Phòng học đóng kín cửa thì bên trong không còn không khí.",
       "truth": false,
       "explain": "Sai: không khí vẫn ở khắp nơi trong phòng, đóng cửa chỉ làm không khí ít lưu thông thôi."
      },
      {
       "stmt": "Gió là không khí đang chuyển động.",
       "truth": true,
       "explain": "Đúng: khi không khí chuyển động từ nơi này sang nơi khác, ta cảm thấy gió."
      },
      {
       "stmt": "Nước chỉ bay hơi khi được đun sôi.",
       "truth": false,
       "explain": "Sai: nước bay hơi ở mọi lúc, như quần áo phơi tự khô. Đun nóng chỉ làm nước bay hơi nhanh hơn."
      },
      {
       "stmt": "Giấy lọc có thể giữ cát lại và cho nước trong đi qua.",
       "truth": true,
       "explain": "Đúng: cát không tan và hạt to hơn lỗ giấy lọc nên bị giữ lại, nước trong chảy qua."
      },
      {
       "stmt": "Dầu ăn khuấy với nước sẽ tan đều thành dung dịch.",
       "truth": false,
       "explain": "Sai: dầu ăn không tan trong nước, luôn nổi thành lớp riêng trên mặt nước."
      },
      {
       "stmt": "Sáp nến chảy ra rồi đông lại vẫn là sáp nến.",
       "truth": true,
       "explain": "Đúng: sáp chỉ thay đổi trạng thái rắn – lỏng, không biến thành chất khác."
      },
      {
       "stmt": "Đất ở nơi nào cũng giống hệt nhau.",
       "truth": false,
       "explain": "Sai: đất mỗi nơi khác nhau — có đất cát, đất sét, đất nhiều mùn — tuỳ thành phần trong đất."
      },
      {
       "stmt": "Khi có bão, em nên ở trong nhà chắc chắn và nghe lời người lớn.",
       "truth": true,
       "explain": "Đúng: bão có gió mạnh và mưa lớn rất nguy hiểm. Ở nơi an toàn và nghe người lớn là cách bảo vệ mình."
      },
      {
       "stmt": "Chiếc đinh sắt để lâu ngoài trời bị gỉ là biến đổi hoá học.",
       "truth": true,
       "explain": "Đúng: sắt gỉ tạo ra chất mới là gỉ sắt màu nâu đỏ, khác hẳn sắt ban đầu."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Khi gặp một hiện tượng, em hãy hỏi ba điều: chất đang ở thể nào, các chất có tan vào nhau không, và khi nóng lên hay lạnh đi thì chất thay đổi ra sao.",
      "Đoán trước rồi mới thử: nói ra dự đoán của em, làm một thử nghiệm nhỏ, rồi so kết quả với dự đoán.",
      "Biến đổi trạng thái chỉ làm chất đổi thể, chất vẫn là chất đó; biến đổi hoá học tạo ra chất mới.",
      "Nước đi vòng tròn: bay hơi lên cao, ngưng tụ thành mây, rơi xuống thành mưa, rồi lại chảy về sông hồ."
     ],
     "facts": [
      {
       "q": "Vì sao cốc nước đá lại ướt ở mặt ngoài?",
       "a": "Do hơi nước trong không khí ngưng tụ",
       "ex": "Hơi nước vô hình trong không khí gặp thành cốc lạnh liền ngưng tụ thành giọt nước bám bên ngoài cốc."
      },
      {
       "q": "Muốn lấy lại muối từ nước muối, em làm thế nào?",
       "a": "Đun cho nước bay hơi hết",
       "ex": "Muối tan nên không lọc được. Đun hoặc phơi cho nước bay hơi hết, muối sẽ còn lại."
      }
     ],
     "pairs": [
      [
       "Nước đá",
       "thể rắn"
      ],
      [
       "Nước trong hồ",
       "thể lỏng"
      ],
      [
       "Hơi nước",
       "thể khí"
      ],
      [
       "Muối và nước",
       "dung dịch"
      ],
      [
       "Cát và nước",
       "hỗn hợp không tan"
      ],
      [
       "Giấy cháy thành tro",
       "biến đổi hoá học"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-th-nangluong",
    "emoji": "⚡",
    "name": "Năng lượng quanh em",
    "sub": "Ánh sáng, âm thanh, nhiệt và điện trong đời sống",
    "pools": {
     "choose": [
      {
       "q": "Đang chơi trong phòng, điện tắt phụt, phòng tối om và em không nhìn thấy đồ vật nữa. Vì sao?",
       "ans": "Không có ánh sáng truyền vào mắt em",
       "wrong": [
        "Vì mắt em đã ngủ mất",
        "Vì đồ vật biến mất",
        "Vì bóng tối chui vào đồ vật"
       ],
       "ex": "Muốn nhìn thấy một vật, phải có ánh sáng từ vật đó truyền vào mắt em. Phòng tối om thì không có ánh sáng nên em không thấy gì."
      },
      {
       "q": "Ban ngày em ngồi đọc sách gần cửa sổ, không bật đèn vẫn đọc rõ chữ. Vì sao em nhìn thấy trang sách?",
       "ans": "Ánh sáng từ trang sách truyền vào mắt em",
       "wrong": [
        "Vì trang sách tự phát sáng",
        "Vì chữ tự bay vào mắt em",
        "Vì mắt em tự chiếu sáng trang sách"
       ],
       "ex": "Ánh sáng ngoài trời chiếu lên trang sách rồi truyền vào mắt em, nên em đọc được chữ."
      },
      {
       "q": "Em dùng đèn pin chiếu vào một con thú bông đặt trước tường. Nếu em đưa đèn lại gần con thú hơn, bóng của nó trên tường sẽ thế nào?",
       "ans": "Bóng to hơn trước",
       "wrong": [
        "Bóng nhỏ hơn trước",
        "Bóng biến mất",
        "Bóng đổi màu"
       ],
       "ex": "Nguồn sáng càng gần vật, bóng của vật càng to. Đưa đèn ra xa, bóng sẽ nhỏ lại.",
       "fig": {
        "f": "k4shadow",
        "a": false
       }
      },
      {
       "q": "Vật nào sau đây tự phát ra ánh sáng?",
       "ans": "Mặt Trời",
       "wrong": [
        "Mặt Trăng",
        "Chiếc gương",
        "Tờ giấy trắng"
       ],
       "ex": "Mặt Trời là nguồn sáng, tự phát ra ánh sáng. Mặt Trăng, gương và giấy chỉ hắt lại ánh sáng chiếu vào chúng."
      },
      {
       "q": "Bạn nói: Mặt Trăng là một nguồn sáng như Mặt Trời. Nói vậy đúng hay sai?",
       "ans": "Sai, Mặt Trăng chỉ phản chiếu ánh sáng Mặt Trời",
       "wrong": [
        "Đúng, Mặt Trăng tự phát sáng",
        "Đúng, Mặt Trăng sáng hơn Mặt Trời",
        "Sai, vì Mặt Trăng không hề sáng"
       ],
       "ex": "Mặt Trăng không tự phát sáng. Ta thấy Mặt Trăng sáng vì nó phản chiếu ánh sáng của Mặt Trời."
      },
      {
       "q": "Em gõ mạnh vào mặt trống, tiếng trống nghe thế nào so với khi gõ nhẹ?",
       "ans": "To hơn vì mặt trống rung mạnh hơn",
       "wrong": [
        "Nhỏ hơn vì mặt trống rung yếu",
        "Vẫn to như nhau",
        "Không phát ra tiếng nữa"
       ],
       "ex": "Vật rung mạnh thì phát ra âm thanh to. Gõ mạnh, mặt trống rung mạnh nên tiếng to hơn."
      },
      {
       "q": "Em áp tai xuống mặt bàn và nghe rõ tiếng gõ nhẹ ở đầu bàn bên kia. Âm thanh đã truyền qua đâu?",
       "ans": "Qua mặt bàn, một chất rắn",
       "wrong": [
        "Qua không khí dưới gầm bàn",
        "Qua ánh sáng trong phòng",
        "Qua bóng của chiếc bàn"
       ],
       "ex": "Âm thanh truyền được qua chất rắn. Mặt bàn gỗ truyền tiếng gõ tới tai em."
      },
      {
       "q": "Bạn em gõ trống ở sân trường. Em càng đi xa khỏi bạn, tiếng trống nghe thế nào?",
       "ans": "Nghe nhỏ hơn lúc ở gần",
       "wrong": [
        "Nghe to hơn lúc ở gần",
        "Vẫn to hệt như nhau",
        "Không nghe thấy gì ngay"
       ],
       "ex": "Càng xa nguồn âm, âm thanh nghe càng nhỏ. Vì vậy đứng gần trống lớn rất chói tai."
      },
      {
       "q": "Lớp học của em ở gần đường lớn, rất ồn. Việc làm nào giúp lớp bớt tiếng ồn?",
       "ans": "Nói khẽ và đóng cửa phía đường",
       "wrong": [
        "Mở hết cửa sổ phía đường",
        "Bật nhạc thật to át đi",
        "Gõ bàn thật mạnh"
       ],
       "ex": "Nói khẽ làm giảm tiếng ồn trong lớp, đóng cửa phía đường ngăn bớt tiếng xe cộ vọng vào."
      },
      {
       "q": "Em đeo tai nghe mở nhạc rất to trong nhiều giờ mỗi ngày. Việc đó có hại gì?",
       "ans": "Làm hại thính giác của em",
       "wrong": [
        "Giúp tai nghe rõ hơn",
        "Không hại gì cả",
        "Giúp em cao lớn hơn"
       ],
       "ex": "Âm thanh quá to và kéo dài làm hại thính giác. Em chỉ nên nghe vừa đủ nghe và không nghe quá lâu."
      },
      {
       "q": "Dụng cụ nào dùng để đo nhiệt độ của nước trong cốc?",
       "ans": "Nhiệt kế",
       "wrong": [
        "Thước kẻ",
        "Cân đĩa",
        "La bàn"
       ],
       "ex": "Nhiệt kế là dụng cụ đo nhiệt độ. Thước đo chiều dài, cân đo khối lượng, la bàn chỉ phương hướng."
      },
      {
       "q": "Em nhúng nhiệt kế vào cốc nước ấm. Cột chất lỏng trong nhiệt kế dừng lại đúng vạch 38. Nhiệt độ của nước là bao nhiêu?",
       "ans": "38 độ C",
       "wrong": [
        "30 độ C",
        "42 độ C",
        "50 độ C"
       ],
       "ex": "Cột chất lỏng dừng ở vạch nào thì nhiệt độ là số ở vạch đó. Ở đây cột dừng ở vạch 38 nên nước ấm 38 độ C.",
       "fig": {
        "f": "k5therm",
        "a": [
         38,
         0,
         50,
         2
        ]
       }
      },
      {
       "q": "Mẹ bắc nồi canh lên bếp, một lúc sau quai nồi bằng kim loại cũng nóng lên. Vì sao?",
       "ans": "Kim loại dẫn nhiệt tốt",
       "wrong": [
        "Vì quai nồi tự phát ra lửa",
        "Vì hơi canh bay vào quai",
        "Vì quai nồi dẫn điện"
       ],
       "ex": "Kim loại dẫn nhiệt tốt nên nhiệt từ thân nồi truyền nhanh ra quai. Vì vậy cầm quai nồi phải dùng lót tay."
      },
      {
       "q": "Quai của chiếc chảo thường làm bằng nhựa hoặc gỗ. Vì sao?",
       "ans": "Nhựa dẫn nhiệt kém, cầm không bỏng",
       "wrong": [
        "Vì nhựa cứng hơn sắt",
        "Vì nhựa dẫn nhiệt rất tốt",
        "Vì nhựa nhẹ hơn không khí"
       ],
       "ex": "Nhựa và gỗ dẫn nhiệt kém, nhiệt từ chảo truyền ra quai rất ít nên cầm không bị bỏng."
      },
      {
       "q": "Trời lạnh, em đắp chăn bông thấy ấm. Chăn bông giúp em ấm bằng cách nào?",
       "ans": "Giữ ấm bằng cách cách nhiệt tốt",
       "wrong": [
        "Chăn tự sinh ra lửa sưởi",
        "Chăn làm cơ thể tự nóng lên gấp đôi",
        "Chăn hút hết gió lạnh vào trong"
       ],
       "ex": "Chăn bông không tự sinh nhiệt. Chăn giữ nhiệt cơ thể, không cho nhiệt thoát ra ngoài nhanh nên em thấy ấm."
      },
      {
       "q": "Thiết bị nào sau đây dùng năng lượng điện để nấu chín cơm?",
       "ans": "Nồi cơm điện",
       "wrong": [
        "Bếp củi",
        "Bếp than hoa",
        "Nồi đất"
       ],
       "ex": "Nồi cơm điện biến năng lượng điện thành nhiệt để nấu cơm. Bếp củi và bếp than dùng năng lượng từ chất đốt."
      },
      {
       "q": "Em lắp mạch điện với pin và bóng đèn nhỏ nhưng đèn không sáng. Em nên kiểm tra điều gì đầu tiên?",
       "ans": "Xem mạch đã kín và dây đã nối chặt chưa",
       "wrong": [
        "Tháo pin ra cất đi",
        "Sơn lại vỏ bóng đèn",
        "Để đèn nghỉ một lúc"
       ],
       "ex": "Đèn chỉ sáng khi mạch điện kín. Hãy kiểm tra các đầu dây đã nối chặt và mạch có chỗ hở nào không."
      },
      {
       "q": "Vật nào sau đây dẫn điện?",
       "ans": "Chiếc thìa bằng inox",
       "wrong": [
        "Chiếc đũa gỗ khô",
        "Thước nhựa",
        "Cục tẩy cao su"
       ],
       "ex": "Kim loại như inox dẫn điện. Gỗ khô, nhựa và cao su là vật cách điện."
      },
      {
       "q": "Vì sao không được chạm tay ướt vào phích cắm điện?",
       "ans": "Nước dẫn điện, dễ bị điện giật",
       "wrong": [
        "Vì tay ướt làm điện mạnh thêm",
        "Vì nước làm phích cắm nặng hơn",
        "Vì tay ướt sẽ trơn"
       ],
       "ex": "Nước dẫn điện. Tay ướt chạm vào điện có thể bị điện giật rất nguy hiểm, nên tay phải thật khô."
      },
      {
       "q": "Việc làm nào giúp tiết kiệm điện ở nhà?",
       "ans": "Tắt đèn khi ra khỏi phòng",
       "wrong": [
        "Bật đèn cả ngày cho sáng",
        "Mở tivi rồi đi chơi",
        "Bật quạt trong phòng trống"
       ],
       "ex": "Tắt đèn và các thiết bị khi không dùng là cách tiết kiệm điện đơn giản mà em làm được mỗi ngày."
      },
      {
       "q": "Năng lượng Mặt Trời được dùng vào việc nào sau đây?",
       "ans": "Phơi thóc và cá cho khô nhanh",
       "wrong": [
        "Chiếu sáng ban đêm",
        "Làm quay tuabin gió",
        "Đun bếp gas"
       ],
       "ex": "Nắng Mặt Trời làm nước bay hơi nên phơi thóc, phơi cá mau khô. Nhiều nhà còn dùng nắng để làm nóng nước."
      },
      {
       "q": "Nhà máy điện gió tạo ra điện bằng cách nào?",
       "ans": "Nhờ gió làm quay tuabin",
       "wrong": [
        "Nhờ nước chảy từ trên cao",
        "Nhờ đốt than đá",
        "Nhờ ánh nắng chiếu vào pin"
       ],
       "ex": "Gió làm quay cánh quạt lớn nối với tuabin, tuabin quay sẽ tạo ra điện."
      },
      {
       "q": "Nhà máy thuỷ điện tạo ra điện nhờ nguồn năng lượng nào?",
       "ans": "Nhờ nước chảy từ trên cao xuống",
       "wrong": [
        "Nhờ gió thổi mạnh",
        "Nhờ nắng Mặt Trời",
        "Nhờ đốt dầu mỏ"
       ],
       "ex": "Nước từ hồ cao chảy xuống làm quay tuabin tạo điện. Đó là năng lượng của nước chảy."
      },
      {
       "q": "Bếp gas nhà em đun nước sôi. Năng lượng làm nóng nước đến từ đâu?",
       "ans": "Từ chất đốt cháy",
       "wrong": [
        "Từ không khí trong bếp",
        "Từ vỏ nồi tự sinh ra",
        "Từ nước tự nóng lên"
       ],
       "ex": "Gas là chất đốt. Khi cháy, chất đốt toả nhiệt làm nước nóng lên."
      },
      {
       "q": "Em đạp xe đi học, chân em có sức để đạp xe. Năng lượng đó đến từ đâu?",
       "ans": "Từ thức ăn em đã ăn vào",
       "wrong": [
        "Từ chiếc xe tự sinh ra",
        "Từ mặt đường đẩy lên",
        "Từ gió thổi vào người"
       ],
       "ex": "Thức ăn cung cấp năng lượng cho cơ thể. Nhờ năng lượng đó em mới vận động, học tập và vui chơi được."
      },
      {
       "q": "Chiếc quạt điện quay và tạo ra gió mát. Năng lượng điện đã biến thành gì?",
       "ans": "Điện biến thành chuyển động và gió",
       "wrong": [
        "Điện biến thành ánh sáng",
        "Điện biến thành thức ăn",
        "Điện biến mất không còn gì"
       ],
       "ex": "Quạt điện biến năng lượng điện thành chuyển động quay của cánh quạt, cánh quạt đẩy không khí tạo thành gió."
      },
      {
       "q": "Đèn pin của em bật không sáng dù công tắc đã mở. Nguyên nhân thường gặp nhất là gì?",
       "ans": "Pin đã hết điện",
       "wrong": [
        "Vì trời chưa tối hẳn",
        "Vì đèn pin cần phơi nắng",
        "Vì bóng đèn quá sáng"
       ],
       "ex": "Đèn pin cần pin còn điện. Pin hết điện thì đèn không sáng, thay pin mới là đèn sáng lại."
      },
      {
       "q": "Muốn biết một chiếc thìa có dẫn điện không mà vẫn an toàn, em thử cách nào?",
       "ans": "Kẹp vật vào mạch pin và đèn nhỏ",
       "wrong": [
        "Cắm thẳng vào ổ điện nhà",
        "Cho thìa vào miệng nếm",
        "Đun thìa trên bếp lửa"
       ],
       "ex": "Chỉ dùng pin tiểu cho thí nghiệm. Kẹp vật vào mạch pin và đèn: đèn sáng thì vật dẫn điện."
      },
      {
       "q": "Dây điện trong nhà có lõi đồng và vỏ nhựa bên ngoài. Vỏ nhựa có tác dụng gì?",
       "ans": "Vỏ nhựa cách điện, an toàn khi chạm vào",
       "wrong": [
        "Vỏ nhựa giúp điện chạy nhanh hơn",
        "Vỏ nhựa làm dây điện sáng lên",
        "Vỏ nhựa dẫn điện tốt hơn đồng"
       ],
       "ex": "Nhựa là vật cách điện. Vỏ nhựa bọc ngoài giúp em chạm vào dây an toàn, điện chỉ chạy trong lõi đồng."
      }
     ],
     "blank": [
      {
       "ans": "ánh sáng",
       "wrong": [
        "âm thanh",
        "hơi nước",
        "bóng tối"
       ],
       "ex": "Ta nhìn thấy vật khi ánh sáng từ vật truyền vào mắt. Không có ánh sáng thì mắt không thấy gì.",
       "pre": "Muốn nhìn thấy một vật, cần có ",
       "post": " từ vật truyền vào mắt em."
      },
      {
       "ans": "rung động",
       "wrong": [
        "đứng yên",
        "ngủ yên",
        "lạnh đi"
       ],
       "ex": "Mọi âm thanh đều do vật rung động tạo ra. Mặt trống, dây đàn rung động thì phát ra tiếng.",
       "pre": "Âm thanh được tạo ra khi một vật ",
       "post": "."
      },
      {
       "ans": "độ C",
       "wrong": [
        "mét",
        "lít",
        "ki-lô-gam"
       ],
       "ex": "Đơn vị đo nhiệt độ thường dùng là độ C. Mét đo chiều dài, lít đo thể tích, ki-lô-gam đo khối lượng.",
       "pre": "Nhiệt độ thường được đo bằng đơn vị ",
       "post": "."
      },
      {
       "ans": "dẫn",
       "wrong": [
        "cách",
        "chặn",
        "hút"
       ],
       "ex": "Kim loại dẫn điện tốt. Lõi dây điện thường bằng đồng vì đồng dẫn điện rất tốt.",
       "pre": "Kim loại là vật ",
       "post": " điện tốt nên được dùng làm lõi dây điện."
      },
      {
       "ans": "cách",
       "wrong": [
        "dẫn",
        "phát",
        "tích"
       ],
       "ex": "Nhựa cách điện, điện không truyền qua được. Vỏ bọc nhựa giúp người dùng an toàn.",
       "pre": "Nhựa là vật ",
       "post": " điện nên được dùng làm vỏ bọc dây điện cho an toàn."
      },
      {
       "ans": "kín",
       "wrong": [
        "hở",
        "ướt",
        "cong"
       ],
       "ex": "Mạch điện phải kín, dòng điện mới chạy được một vòng và làm đèn sáng.",
       "pre": "Đèn chỉ sáng khi mạch điện đã ",
       "post": " và không có chỗ hở."
      },
      {
       "ans": "than chì",
       "wrong": [
        "nhựa dẻo",
        "cao su",
        "gỗ khô"
       ],
       "ex": "Ruột bút chì là than chì. Than chì dẫn được điện, khác với gỗ và nhựa.",
       "pre": "Ruột bút chì làm bằng ",
       "post": " cũng dẫn được điện."
      },
      {
       "ans": "thuỷ điện",
       "wrong": [
        "nhiệt điện",
        "điện gió",
        "điện mặt trời"
       ],
       "ex": "Thuỷ điện dùng năng lượng nước chảy làm quay tuabin tạo điện, như các nhà máy ở vùng núi cao.",
       "pre": "Nhà máy điện dùng sức nước chảy để tạo điện gọi là nhà máy ",
       "post": "."
      },
      {
       "ans": "chất đốt",
       "wrong": [
        "chất lỏng",
        "kim loại",
        "vật cách điện"
       ],
       "ex": "Chất đốt khi cháy toả nhiệt để đun nấu. Củi, than, gas đều là chất đốt.",
       "pre": "Gas và than là những ",
       "post": " dùng để đun nấu."
      },
      {
       "ans": "gió",
       "wrong": [
        "nước chảy",
        "ánh nắng",
        "than đá"
       ],
       "ex": "Gió làm quay cánh quạt nối với tuabin để tạo điện. Nơi nào gió thổi mạnh và đều, nơi đó làm được điện gió.",
       "pre": "Cánh quạt của tuabin điện gió quay được nhờ sức ",
       "post": "."
      },
      {
       "ans": "tiết kiệm",
       "wrong": [
        "lãng phí",
        "tạo ra",
        "truyền đi"
       ],
       "ex": "Tiết kiệm điện là dùng điện vừa đủ, tắt khi không cần. Việc này giúp nhà em đỡ tốn tiền điện.",
       "pre": "Tắt điện khi không dùng là một cách ",
       "post": " điện."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Em chỉ nhìn thấy một vật khi có ánh sáng từ vật đó truyền vào mắt em.",
       "truth": true,
       "explain": "Đúng: ánh sáng từ vật truyền vào mắt thì em mới thấy vật. Trong phòng tối om, em không thấy gì."
      },
      {
       "stmt": "Mặt Trăng là một nguồn sáng như Mặt Trời.",
       "truth": false,
       "explain": "Sai: Mặt Trăng không tự phát sáng, nó chỉ phản chiếu ánh sáng của Mặt Trời."
      },
      {
       "stmt": "Âm thanh truyền được qua không khí, chất lỏng và chất rắn.",
       "truth": true,
       "explain": "Đúng: tiếng nói truyền qua không khí, tiếng cá heo truyền qua nước, tiếng gõ bàn truyền qua mặt bàn."
      },
      {
       "stmt": "Nghe nhạc càng to và càng lâu thì tai càng khoẻ.",
       "truth": false,
       "explain": "Sai: âm thanh quá to và kéo dài làm hại thính giác. Em nên nghe âm lượng vừa phải."
      },
      {
       "stmt": "Chiếc thìa kim loại để trong nồi canh nóng một lúc sẽ nóng lên.",
       "truth": true,
       "explain": "Đúng: kim loại dẫn nhiệt tốt, nhiệt từ canh truyền dọc theo thìa làm thìa nóng lên."
      },
      {
       "stmt": "Áo len tự sinh ra lửa để sưởi ấm cho em.",
       "truth": false,
       "explain": "Sai: áo len không sinh nhiệt. Áo len cách nhiệt tốt, giữ nhiệt cơ thể nên em thấy ấm."
      },
      {
       "stmt": "Bóng đèn chỉ sáng khi mạch điện đã kín.",
       "truth": true,
       "explain": "Đúng: mạch có chỗ hở thì dòng điện không chạy được một vòng, đèn sẽ không sáng."
      },
      {
       "stmt": "Tay ướt chạm vào phích cắm điện là rất an toàn.",
       "truth": false,
       "explain": "Sai: nước dẫn điện, tay ướt chạm điện có thể bị điện giật nguy hiểm. Phải lau tay thật khô."
      },
      {
       "stmt": "Ruột bút chì bằng than chì dẫn được điện.",
       "truth": true,
       "explain": "Đúng: than chì là vật dẫn điện, dù dẫn kém hơn kim loại."
      },
      {
       "stmt": "Năng lượng Mặt Trời không thể tạo ra điện.",
       "truth": false,
       "explain": "Sai: tấm pin mặt trời biến ánh sáng Mặt Trời thành điện, dùng được cho đèn và nhiều thiết bị."
      },
      {
       "stmt": "Tuabin gió quay được là nhờ sức gió.",
       "truth": true,
       "explain": "Đúng: gió làm quay cánh quạt nối với tuabin, từ đó tạo ra điện gió."
      },
      {
       "stmt": "Đứng càng xa trống, tiếng trống nghe càng to.",
       "truth": false,
       "explain": "Sai: càng xa nguồn âm, âm thanh càng nhỏ dần. Đứng gần mới nghe to."
      },
      {
       "stmt": "Tắt đèn khi ra khỏi phòng là tiết kiệm điện.",
       "truth": true,
       "explain": "Đúng: điện không dùng mà vẫn bật là lãng phí. Tắt khi không dùng giúp tiết kiệm điện."
      },
      {
       "stmt": "Nhiệt kế là dụng cụ dùng để đo chiều dài.",
       "truth": false,
       "explain": "Sai: nhiệt kế đo nhiệt độ. Dụng cụ đo chiều dài là thước."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Muốn giải thích một hiện tượng năng lượng, em hãy lần theo đường đi: năng lượng từ đâu tới, truyền qua đâu, và vật nào nhận được.",
      "Muốn kiểm chứng ánh sáng hay âm thanh có truyền qua một vật không, em thử che hoặc chặn đường truyền của chúng rồi quan sát.",
      "Thí nghiệm với điện chỉ dùng pin tiểu. Tuyệt đối không dùng ổ cắm điện trong nhà để thử nghiệm.",
      "Vật dẫn nhiệt tốt thì nóng lên nhanh và cũng nguội đi nhanh; vật cách nhiệt tốt thì giữ nhiệt được lâu."
     ],
     "facts": [
      {
       "q": "Đèn pin không sáng, em kiểm tra điều gì trước?",
       "a": "Mạch điện đã kín hay chưa",
       "ex": "Đèn chỉ sáng khi mạch kín. Kiểm tra các đầu nối và pin trước khi nghĩ đèn bị hỏng."
      },
      {
       "q": "Vì sao quai nồi thường làm bằng nhựa?",
       "a": "Vì nhựa dẫn nhiệt kém",
       "ex": "Nhựa dẫn nhiệt kém nên nhiệt từ nồi truyền ra quai rất ít, cầm vào không bị bỏng."
      }
     ],
     "pairs": [
      [
       "Bóng đèn điện",
       "năng lượng điện"
      ],
      [
       "Tuabin gió",
       "năng lượng gió"
      ],
      [
       "Thuỷ điện",
       "năng lượng nước chảy"
      ],
      [
       "Bếp than",
       "năng lượng chất đốt"
      ],
      [
       "Nhiệt kế",
       "đo nhiệt độ"
      ],
      [
       "Thìa inox",
       "vật dẫn điện"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-th-traidat",
    "emoji": "🌍",
    "name": "Trái Đất và bầu trời",
    "sub": "Mặt Trời, Mặt Trăng, các mùa và thời tiết",
    "pools": {
     "choose": [
      {
       "q": "Ban ngày, em thấy Mặt Trời như đi từ phía đông sang phía tây. Thật ra điều gì đang chuyển động?",
       "ans": "Trái Đất đang tự quay quanh trục",
       "wrong": [
        "Mặt Trời bay vòng quanh Trái Đất",
        "Mặt Trăng kéo Mặt Trời đi",
        "Bầu trời tự xoay tròn"
       ],
       "ex": "Trái Đất tự quay quanh trục nên ta thấy Mặt Trời như mọc ở đông và lặn ở tây. Đó là chuyển động nhìn thấy, không phải thật."
      },
      {
       "q": "Vì sao trên Trái Đất có ngày và đêm nối tiếp nhau?",
       "ans": "Trái Đất tự quay, phần hướng về Mặt Trời là ban ngày",
       "wrong": [
        "Vì Mặt Trời tự tắt mỗi tối",
        "Vì Mặt Trăng che Mặt Trời mỗi đêm",
        "Vì Trái Đất ngừng quay ban đêm"
       ],
       "ex": "Trái Đất tự quay: phần hướng về Mặt Trời có ánh sáng là ban ngày, phần quay đi là ban đêm."
      },
      {
       "q": "Buổi sáng, em muốn tìm hướng đông. Em nhìn vào đâu?",
       "ans": "Phía Mặt Trời đang mọc",
       "wrong": [
        "Phía Mặt Trời đang lặn",
        "Phía có nhiều mây nhất",
        "Phía gió thổi tới"
       ],
       "ex": "Buổi sáng Mặt Trời mọc ở phía đông. Đây là cách tìm phương hướng đơn giản nhất khi không có la bàn."
      },
      {
       "q": "Buổi sáng sớm, bóng của em đổ dài trên sân. Bóng đổ về phía nào?",
       "ans": "Về phía tây",
       "wrong": [
        "Về phía đông",
        "Về phía nam",
        "Bóng không đổ đi đâu"
       ],
       "ex": "Sáng sớm Mặt Trời ở phía đông nên bóng của vật đổ ngược lại, về phía tây."
      },
      {
       "q": "Đêm rằm trăng tròn, vài đêm sau trăng lại khuyết dần. Vì sao hình của Mặt Trăng thay đổi?",
       "ans": "Phần Mặt Trăng được chiếu sáng mà em thấy thay đổi",
       "wrong": [
        "Vì Mặt Trăng tự thay hình mỗi đêm",
        "Vì mây cắt Mặt Trăng thành miếng",
        "Vì Mặt Trăng quay nhanh hơn"
       ],
       "ex": "Mặt Trăng vẫn tròn. Phần được Mặt Trời chiếu sáng mà ta nhìn thấy thay đổi theo vị trí của Mặt Trăng nên trăng có lúc tròn, lúc khuyết."
      },
      {
       "q": "Những ngôi sao em thấy trên trời đêm thật ra là gì?",
       "ans": "Những mặt trời ở rất xa Trái Đất",
       "wrong": [
        "Những bóng đèn treo trên trời",
        "Những hạt cát phát sáng",
        "Những con đom đóm bay cao"
       ],
       "ex": "Sao là những ngôi sao xa như Mặt Trời của ta. Chúng ở rất xa nên trông chỉ như chấm sáng nhỏ."
      },
      {
       "q": "Vì sao nước ta có mùa nóng và mùa lạnh trong năm?",
       "ans": "Trái Đất quay quanh Mặt Trời với trục nghiêng",
       "wrong": [
        "Vì mùa hè Trái Đất gần Mặt Trời hơn",
        "Vì Mặt Trời nóng hơn vào mùa hè",
        "Vì Mặt Trăng che bớt nắng mùa đông"
       ],
       "ex": "Trục Trái Đất nghiêng nên mỗi bán cầu thay nhau nhận nhiều nắng hơn khi Trái Đất đi quanh Mặt Trời, tạo thành các mùa."
      },
      {
       "q": "Miền Nam nước ta khác miền Bắc ở điểm nào về mùa?",
       "ans": "Hai mùa rõ rệt: mùa mưa và mùa khô",
       "wrong": [
        "Có bốn mùa rõ như miền Bắc",
        "Quanh năm tuyết rơi",
        "Không có mùa mưa"
       ],
       "ex": "Miền Nam nóng quanh năm, chỉ có hai mùa rõ rệt là mùa mưa và mùa khô, không có mùa đông lạnh như miền Bắc."
      },
      {
       "q": "Khi bão lớn đổ bộ vào đất liền, điều nguy hiểm nào có thể xảy ra?",
       "ans": "Gió mạnh, mưa lớn, ngập lụt và đổ cây",
       "wrong": [
        "Trời nắng đẹp cả tuần",
        "Sông hồ cạn khô đi",
        "Cây cối mọc nhanh hơn"
       ],
       "ex": "Bão mang gió rất mạnh và mưa lớn, có thể làm đổ cây, tốc mái nhà và gây ngập lụt."
      },
      {
       "q": "Gia đình em sống ở vùng biển, nghe tin bão sắp đến. Việc làm nào là đúng?",
       "ans": "Theo dõi dự báo, neo tàu chắc và tránh ra biển",
       "wrong": [
        "Chèo thuyền ra khơi xem bão",
        "Ra bãi biển nhặt vỏ sò",
        "Mở cửa nhà cho thoáng"
       ],
       "ex": "Khi có bão, người dân vùng biển phải theo dõi dự báo, neo tàu thuyền chắc chắn và tuyệt đối không ra biển."
      },
      {
       "q": "Đang ngồi trong lớp, em thấy bàn ghế rung lắc, đèn chao đảo. Đó là hiện tượng gì?",
       "ans": "Động đất",
       "wrong": [
        "Giông sét",
        "Lũ lụt",
        "Nắng nóng"
       ],
       "ex": "Động đất là hiện tượng mặt đất rung lắc. Khi có động đất, em cần bình tĩnh làm theo hướng dẫn của thầy cô."
      },
      {
       "q": "Mưa lớn kéo dài nhiều ngày ở vùng thấp có thể gây ra điều gì?",
       "ans": "Lũ lụt",
       "wrong": [
        "Hạn hán",
        "Động đất",
        "Tuyết rơi"
       ],
       "ex": "Mưa lớn kéo dài làm nước sông dâng cao, tràn vào đồng ruộng và nhà cửa gây lũ lụt."
      },
      {
       "q": "Trên bề mặt Trái Đất, phần nào chiếm diện tích lớn hơn?",
       "ans": "Biển và đại dương",
       "wrong": [
        "Đất liền",
        "Sa mạc",
        "Núi cao"
       ],
       "ex": "Khoảng ba phần tư bề mặt Trái Đất là nước biển. Vì vậy nhìn từ xa, Trái Đất có màu xanh dương."
      },
      {
       "q": "Đới lạnh trên Trái Đất nằm ở đâu?",
       "ans": "Vùng gần Bắc Cực",
       "wrong": [
        "Vùng quanh xích đạo",
        "Vùng giữa hai chí tuyến",
        "Vùng ven biển nước ta"
       ],
       "ex": "Đới lạnh nằm ở hai đầu cực của Trái Đất, gần Bắc Cực và Nam Cực, quanh năm rất lạnh và có băng tuyết."
      },
      {
       "q": "Vì sao vùng quanh xích đạo quanh năm nóng?",
       "ans": "Nhận được nhiều ánh nắng Mặt Trời nhất",
       "wrong": [
        "Vì gần Mặt Trăng nhất",
        "Vì có nhiều núi lửa",
        "Vì ở gần tâm Trái Đất"
       ],
       "ex": "Vùng xích đạo nhận ánh nắng chiếu gần thẳng góc và nhiều nhất trong năm nên quanh năm nóng."
      },
      {
       "q": "Nước ở biển và hồ gặp nắng, biến thành hơi nước bay lên cao. Giai đoạn này trong vòng tuần hoàn của nước gọi là gì?",
       "ans": "Bốc hơi",
       "wrong": [
        "Ngưng tụ",
        "Mưa rơi",
        "Đông đặc"
       ],
       "ex": "Nắng làm nước ở biển, hồ, sông bốc hơi thành hơi nước bay lên cao, bắt đầu vòng tuần hoàn của nước.",
       "fig": {
        "f": "k3cycle",
        "a": "bochoi"
       }
      },
      {
       "q": "Nước bốc hơi lên cao, ngưng tụ thành mây, rơi xuống thành mưa rồi chảy về sông hồ. Cả quá trình đó gọi là gì?",
       "ans": "Vòng tuần hoàn của nước",
       "wrong": [
        "Vòng đời của mây",
        "Chuỗi thức ăn trong nước",
        "Sự đông đặc của nước"
       ],
       "ex": "Nước trong thiên nhiên đi vòng tròn không ngừng: bốc hơi, ngưng tụ, mưa, chảy đi rồi lại bốc hơi."
      },
      {
       "q": "Kim la bàn luôn chỉ theo hướng nào dù em đứng ở đâu?",
       "ans": "Hướng bắc – nam",
       "wrong": [
        "Hướng đông – tây",
        "Hướng Mặt Trời mọc",
        "Hướng gió thổi"
       ],
       "ex": "Kim la bàn luôn chỉ hướng bắc – nam. Nhờ vậy em xác định được các hướng còn lại."
      },
      {
       "q": "Chiều tối, em đứng ngắm hoàng hôn, mặt em hướng về phía Mặt Trời lặn. Mặt em đang hướng về phía nào?",
       "ans": "Hướng tây",
       "wrong": [
        "Hướng đông",
        "Hướng bắc",
        "Hướng nam"
       ],
       "ex": "Mặt Trời lặn ở phía tây. Buổi chiều nhìn theo Mặt Trời lặn là em đang nhìn về hướng tây."
      },
      {
       "q": "Mai lớp em đi dã ngoại. Muốn biết mai trời mưa hay nắng để chuẩn bị áo mưa, em làm gì?",
       "ans": "Xem dự báo thời tiết",
       "wrong": [
        "Đếm số mây trên trời",
        "Hỏi bạn bên cạnh",
        "Nhìn lịch treo tường"
       ],
       "ex": "Dự báo thời tiết cho biết trời sắp mưa hay nắng, nóng hay lạnh, giúp em chuẩn bị quần áo và đồ dùng phù hợp."
      },
      {
       "q": "Giữa trưa nắng gắt, em thấy bóng của cột cờ ngắn nhất trong ngày. Lúc đó Mặt Trời ở đâu?",
       "ans": "Mặt Trời ở vị trí cao nhất trên trời",
       "wrong": [
        "Mặt Trời vừa mới mọc",
        "Mặt Trời sắp lặn xuống",
        "Mặt Trời bị mây che kín"
       ],
       "ex": "Giữa trưa, Mặt Trời lên cao nhất nên bóng của vật ngắn nhất. Sáng và chiều, bóng dài hơn nhiều."
      },
      {
       "q": "Cầu vồng thường xuất hiện khi nào?",
       "ans": "Khi vừa mưa vừa có nắng",
       "wrong": [
        "Vào đêm tối không trăng",
        "Khi trời nắng khô cả tháng",
        "Khi có tuyết rơi"
       ],
       "ex": "Cầu vồng xuất hiện khi ánh nắng chiếu qua những giọt nước mưa còn lơ lửng trong không khí, thường lúc vừa mưa vừa nắng."
      },
      {
       "q": "Mây trên trời được tạo thành từ đâu?",
       "ans": "Hơi nước ngưng tụ thành giọt nước rất nhỏ",
       "wrong": [
        "Khói từ nhà máy bay lên",
        "Bông gòn bay lên trời",
        "Bụi đất thổi lên cao"
       ],
       "ex": "Hơi nước bay lên cao gặp lạnh, ngưng tụ thành vô số giọt nước li ti. Tập hợp các giọt đó chính là mây.",
       "fig": {
        "f": "k3cycle",
        "a": "ngungtu"
       }
      },
      {
       "q": "Trời đang giông sét rất to. Việc làm nào an toàn nhất?",
       "ans": "Vào trong nhà, không trú dưới cây to",
       "wrong": [
        "Trú mưa dưới gốc cây to",
        "Đứng giữa đồng trống",
        "Cầm ô kim loại chạy ngoài trời"
       ],
       "ex": "Khi giông sét, phải vào nhà ngay. Cây to và nơi trống rất dễ bị sét đánh, cầm vật kim loại cũng nguy hiểm."
      },
      {
       "q": "Trái Đất có hình dạng như thế nào?",
       "ans": "Hình cầu",
       "wrong": [
        "Hình vuông",
        "Hình dẹt như cái đĩa",
        "Hình tam giác"
       ],
       "ex": "Trái Đất có hình cầu. Ảnh chụp từ vũ trụ cho thấy Trái Đất tròn như một quả bóng xanh."
      },
      {
       "q": "Nhìn từ vũ trụ, Trái Đất có màu xanh dương là chủ yếu. Vì sao?",
       "ans": "Phần lớn bề mặt là nước biển",
       "wrong": [
        "Vì bầu trời sơn màu xanh",
        "Vì đất liền màu xanh dương",
        "Vì Mặt Trời chiếu đèn xanh"
       ],
       "ex": "Biển và đại dương chiếm phần lớn bề mặt Trái Đất nên hành tinh của ta trông xanh dương từ vũ trụ."
      },
      {
       "q": "Đêm nay trời nhiều mây, em không thấy ngôi sao nào. Các ngôi sao đã đi đâu?",
       "ans": "Mây che khuất bầu trời sao",
       "wrong": [
        "Sao đã tắt hết",
        "Sao bay đi nơi khác",
        "Sao chỉ sáng vào mùa hè"
       ],
       "ex": "Sao vẫn ở đó nhưng mây dày che khuất. Đêm quang mây, em sẽ thấy sao sáng khắp trời."
      },
      {
       "q": "Ở miền Bắc, gió mùa đông bắc thổi về thường báo hiệu mùa nào?",
       "ans": "Mùa đông",
       "wrong": [
        "Mùa hè",
        "Mùa mưa bão",
        "Mùa xuân ấm"
       ],
       "ex": "Gió mùa đông bắc mang không khí lạnh từ phương bắc xuống, báo hiệu mùa đông lạnh ở miền Bắc."
      },
      {
       "q": "Sáng sớm mùa đông, em thấy sương mù trắng xoá gần mặt đất. Sương mù là gì?",
       "ans": "Hơi nước ngưng tụ thành giọt nhỏ lơ lửng gần mặt đất",
       "wrong": [
        "Khói bếp bay khắp nơi",
        "Bụi phấn bay trong không khí",
        "Tuyết chưa kịp rơi"
       ],
       "ex": "Sương mù là hơi nước ngưng tụ thành giọt nhỏ li ti lơ lửng sát mặt đất, làm ta khó nhìn xa."
      }
     ],
     "blank": [
      {
       "ans": "đông",
       "wrong": [
        "tây",
        "bắc",
        "nam"
       ],
       "ex": "Mặt Trời mọc ở hướng đông mỗi buổi sáng. Nhớ điều này, em tìm được các hướng khác.",
       "pre": "Buổi sáng, Mặt Trời mọc ở hướng ",
       "post": "."
      },
      {
       "ans": "tây",
       "wrong": [
        "đông",
        "bắc",
        "nam"
       ],
       "ex": "Mặt Trời lặn ở hướng tây. Sáng mọc ở đông, chiều lặn ở tây là quy luật mỗi ngày.",
       "pre": "Buổi chiều, Mặt Trời lặn ở hướng ",
       "post": "."
      },
      {
       "ans": "ban ngày",
       "wrong": [
        "ban đêm",
        "mùa đông",
        "mùa mưa"
       ],
       "ex": "Phần được Mặt Trời chiếu sáng là ban ngày, phần quay đi khuất sáng là ban đêm.",
       "pre": "Phần Trái Đất hướng về Mặt Trời thì đang là ",
       "post": "."
      },
      {
       "ans": "trục",
       "wrong": [
        "quỹ đạo",
        "đường biên",
        "vòng tròn"
       ],
       "ex": "Trái Đất quay quanh trục của nó. Chính sự tự quay này tạo ra ngày và đêm nối tiếp nhau.",
       "pre": "Trái Đất tự quay quanh ",
       "post": " của nó, một vòng hết một ngày đêm."
      },
      {
       "ans": "la bàn",
       "wrong": [
        "nhiệt kế",
        "thước dây",
        "đồng hồ"
       ],
       "ex": "La bàn giúp em xác định phương hướng ở bất cứ đâu, kể cả khi trời nhiều mây không thấy Mặt Trời.",
       "pre": "Dụng cụ có kim luôn chỉ hướng bắc – nam, dùng để xác định phương hướng là ",
       "post": "."
      },
      {
       "ans": "nhiệt đới",
       "wrong": [
        "hàn đới",
        "ôn đới lạnh",
        "đới cực"
       ],
       "ex": "Việt Nam nằm ở đới nhiệt đới, nhận nhiều ánh nắng nên khí hậu nóng ẩm quanh năm.",
       "pre": "Nước ta nằm ở đới ",
       "post": " nên quanh năm ấm và nóng."
      },
      {
       "ans": "biển",
       "wrong": [
        "sông",
        "ao",
        "hồ"
       ],
       "ex": "Biển và đại dương chiếm khoảng ba phần tư bề mặt Trái Đất, nhiều hơn đất liền rất nhiều.",
       "pre": "Phần lớn bề mặt Trái Đất được bao phủ bởi nước của các ",
       "post": " và đại dương."
      },
      {
       "ans": "bão",
       "wrong": [
        "sương mù",
        "nắng nóng",
        "gió nhẹ"
       ],
       "ex": "Bão là thiên tai nguy hiểm với gió mạnh và mưa lớn. Khi có bão, em phải ở nơi an toàn.",
       "pre": "Cơn gió rất mạnh kèm mưa lớn, có thể làm đổ cây và tốc mái nhà gọi là ",
       "post": "."
      },
      {
       "ans": "phản chiếu",
       "wrong": [
        "tự tạo ra",
        "hút lấy",
        "che mất"
       ],
       "ex": "Mặt Trăng không tự phát sáng. Nó phản chiếu ánh sáng Mặt Trời về phía Trái Đất.",
       "pre": "Mặt Trăng sáng được là nhờ nó ",
       "post": " ánh sáng của Mặt Trời."
      },
      {
       "ans": "Mặt Trời",
       "wrong": [
        "Mặt Trăng",
        "ngôi sao Bắc Cực",
        "chính nó"
       ],
       "ex": "Trái Đất vừa tự quay quanh trục, vừa quay quanh Mặt Trời. Một vòng quanh Mặt Trời là một năm.",
       "pre": "Trái Đất quay quanh ",
       "post": " một vòng hết khoảng một năm."
      },
      {
       "ans": "mây",
       "wrong": [
        "gió",
        "cát",
        "khói"
       ],
       "ex": "Mây gồm vô số giọt nước li ti. Khi giọt nước lớn dần và nặng, chúng rơi xuống thành mưa.",
       "pre": "Những giọt nước rất nhỏ ngưng tụ lại lơ lửng trên cao tạo thành ",
       "post": "."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Ngày và đêm có là do Trái Đất tự quay quanh trục của nó.",
       "truth": true,
       "explain": "Đúng: Trái Đất quay một vòng mỗi ngày đêm. Phần hướng về Mặt Trời là ngày, phần khuất là đêm."
      },
      {
       "stmt": "Mặt Trời quay quanh Trái Đất nên mới có ngày và đêm.",
       "truth": false,
       "explain": "Sai: Trái Đất tự quay quanh trục và quay quanh Mặt Trời. Ta thấy Mặt Trời di chuyển là chuyển động nhìn thấy."
      },
      {
       "stmt": "Mặt Trăng tự phát ra ánh sáng của riêng nó.",
       "truth": false,
       "explain": "Sai: Mặt Trăng chỉ phản chiếu ánh sáng Mặt Trời. Nó không phải là nguồn sáng."
      },
      {
       "stmt": "Biển và đại dương chiếm phần lớn bề mặt Trái Đất.",
       "truth": true,
       "explain": "Đúng: biển và đại dương chiếm khoảng ba phần tư bề mặt Trái Đất, lớn hơn đất liền nhiều."
      },
      {
       "stmt": "Việt Nam nằm ở đới nhiệt đới nên quanh năm nóng ẩm.",
       "truth": true,
       "explain": "Đúng: nước ta nằm gần xích đạo, thuộc đới nhiệt đới, nhận nhiều nắng nên khí hậu nóng ẩm."
      },
      {
       "stmt": "La bàn chỉ đúng hướng vào những ngày nắng đẹp.",
       "truth": false,
       "explain": "Sai: kim la bàn luôn chỉ hướng bắc – nam, dù trời nắng hay nhiều mây."
      },
      {
       "stmt": "Khi có bão, ngư dân không nên ra khơi đánh cá.",
       "truth": true,
       "explain": "Đúng: bão có sóng to gió lớn rất nguy hiểm trên biển. Ngư dân phải vào bờ và neo tàu chắc chắn."
      },
      {
       "stmt": "Bão chỉ xảy ra trên đất liền, không có bão trên biển.",
       "truth": false,
       "explain": "Sai: bão hình thành trên biển rồi mới đổ bộ vào đất liền. Vùng biển là nơi bão sinh ra."
      },
      {
       "stmt": "Hơi nước ngưng tụ lại trên cao tạo thành mây.",
       "truth": true,
       "explain": "Đúng: hơi nước lên cao gặp lạnh ngưng tụ thành giọt nhỏ li ti, tập hợp thành mây."
      },
      {
       "stmt": "Động đất là do con người đào hầm gây ra.",
       "truth": false,
       "explain": "Sai: động đất do các lớp đất đá sâu trong lòng Trái Đất dịch chuyển, không phải do con người đào hầm."
      },
      {
       "stmt": "Xem dự báo thời tiết giúp em chuẩn bị tốt cho ngày mai.",
       "truth": true,
       "explain": "Đúng: biết trước trời mưa hay nắng, em chuẩn bị được áo mưa, ô hay quần áo phù hợp."
      },
      {
       "stmt": "Ban ngày các ngôi sao biến mất khỏi bầu trời.",
       "truth": false,
       "explain": "Sai: sao vẫn ở đó nhưng ánh sáng Mặt Trời quá mạnh làm ta không nhìn thấy sao vào ban ngày."
      },
      {
       "stmt": "Đứng quay lưng về phía Mặt Trời mọc, trước mặt em là hướng tây.",
       "truth": true,
       "explain": "Đúng: Mặt Trời mọc ở hướng đông. Quay lưng lại hướng đông thì trước mặt là hướng tây."
      },
      {
       "stmt": "Nước mưa rơi xuống đất là hết hẳn, không bao giờ quay lại sông hồ.",
       "truth": false,
       "explain": "Sai: nước mưa chảy về sông hồ, rồi lại bốc hơi lên thành mây và mưa tiếp. Nước đi vòng tròn không ngừng."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Muốn tìm phương hướng khi không có la bàn, em dựa vào Mặt Trời: sáng mọc ở đông, chiều lặn ở tây.",
      "Ngày và đêm là do Trái Đất tự quay, không phải do Mặt Trời chạy quanh Trái Đất.",
      "Ban ngày sao không biến mất; ánh sáng Mặt Trời quá mạnh nên mắt em không thấy sao.",
      "Khi có thiên tai như bão, lũ, động đất: nghe dự báo thời tiết và làm theo hướng dẫn của người lớn."
     ],
     "facts": [
      {
       "q": "Vì sao trên Trái Đất có ngày và đêm?",
       "a": "Vì Trái Đất tự quay quanh trục",
       "ex": "Trái Đất quay quanh trục của nó: phần hướng về Mặt Trời là ban ngày, phần quay đi là ban đêm."
      },
      {
       "q": "Mùa hè nóng có phải vì Trái Đất ở gần Mặt Trời hơn không?",
       "a": "Không, do trục Trái Đất nghiêng",
       "ex": "Các mùa sinh ra do trục Trái Đất nghiêng khi quay quanh Mặt Trời, không phải do Trái Đất gần hay xa Mặt Trời."
      }
     ],
     "pairs": [
      [
       "Mặt Trời mọc",
       "hướng đông"
      ],
      [
       "Mặt Trời lặn",
       "hướng tây"
      ],
      [
       "La bàn",
       "xác định phương hướng"
      ],
      [
       "Bão",
       "gió mạnh kèm mưa lớn"
      ],
      [
       "Động đất",
       "mặt đất rung lắc"
      ],
      [
       "Mây",
       "giọt nước nhỏ ngưng tụ"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-th-susong",
    "emoji": "🌱",
    "name": "Sự sống quanh em",
    "sub": "Cây, con vật, nấm, vi khuẩn và môi trường sống",
    "pools": {
     "choose": [
      {
       "q": "Em gieo hai chậu hạt giống nhau. Chậu A tưới nước mỗi ngày, chậu B không tưới. Sau vài ngày, chỉ chậu A nảy mầm. Thí nghiệm này cho biết hạt cần gì để nảy mầm?",
       "ans": "Nước",
       "wrong": [
        "Ánh nắng mạnh",
        "Đất màu đen",
        "Chậu bằng nhựa"
       ],
       "ex": "Hai chậu chỉ khác nhau ở nước tưới. Chậu có nước nảy mầm nên hạt cần nước để nảy mầm."
      },
      {
       "q": "Một chậu cây để trong phòng tối kín cả tuần, không có ánh sáng. Cây sẽ thế nào?",
       "ans": "Lá vàng và cây yếu dần",
       "wrong": [
        "Lá xanh tốt hơn",
        "Cây ra hoa nhiều hơn",
        "Cây lớn nhanh gấp đôi"
       ],
       "ex": "Cây xanh cần ánh sáng để tự làm thức ăn. Thiếu ánh sáng lâu ngày, lá vàng và cây yếu dần."
      },
      {
       "q": "Trời nắng nhiều ngày không mưa, mẹ nhắc em tưới cây trong vườn. Vì sao cây cần được tưới nước?",
       "ans": "Cây cần nước để sống và lớn lên",
       "wrong": [
        "Để lá cây đổi màu",
        "Để cây khỏi bay đi",
        "Để đất cứng lại"
       ],
       "ex": "Cây hút nước qua rễ để sống và lớn lên. Thiếu nước lâu, cây sẽ héo và chết."
      },
      {
       "q": "Chuỗi thức ăn dưới nước viết như sau: Tảo → Tôm → ? → Chim bói cá. Sinh vật nào ở chỗ chấm hỏi?",
       "ans": "Cá",
       "wrong": [
        "Rùa",
        "Mực",
        "Ốc"
       ],
       "ex": "Trong chuỗi này, tôm ăn tảo, cá ăn tôm, chim bói cá bắt cá. Sinh vật ở giữa là cá.",
       "fig": {
        "f": "k2chain",
        "a": [
         [
          "Tảo",
          "Tôm",
          "Cá",
          "Chim bói cá"
         ],
         2,
         false
        ]
       }
      },
      {
       "q": "Một khu vườn mọc nhiều cây xanh nuôi đàn thỏ. Nếu cây xanh bị chặt hết, đàn thỏ sẽ thế nào?",
       "ans": "Thỏ thiếu thức ăn nên giảm dần",
       "wrong": [
        "Thỏ ăn đất thay cỏ",
        "Thỏ đông hơn trước",
        "Thỏ không thay đổi gì"
       ],
       "ex": "Cây xanh là thức ăn đầu chuỗi của thỏ. Mất cây xanh, thỏ thiếu thức ăn nên số thỏ giảm dần."
      },
      {
       "q": "Miếng bánh mì để quên vài ngày mọc nấm mốc xanh. Nấm mốc lấy gì để sống trên bánh?",
       "ans": "Lấy chất dinh dưỡng trong bánh",
       "wrong": [
        "Lấy ánh sáng làm thức ăn",
        "Lấy không khí làm thức ăn",
        "Nấm tự tạo ra thức ăn"
       ],
       "ex": "Nấm không có lá xanh, không tự làm thức ăn được. Nấm mốc lấy chất dinh dưỡng từ bánh mì và làm bánh hỏng."
      },
      {
       "q": "Muốn ăn nấm một cách an toàn, em nên chọn nấm ở đâu?",
       "ans": "Chỉ ăn nấm được nuôi trồng hoặc mua nơi tin cậy",
       "wrong": [
        "Hái nấm lạ trong rừng",
        "Ăn nấm có màu đẹp",
        "Ăn nấm mọc sau mưa"
       ],
       "ex": "Nhiều loại nấm lạ trong rừng là nấm độc, ăn vào rất nguy hiểm. Chỉ ăn nấm nuôi trồng hoặc mua ở nơi tin cậy."
      },
      {
       "q": "Sữa chua thơm ngon được làm ra nhờ sinh vật nào?",
       "ans": "Vi khuẩn có ích",
       "wrong": [
        "Vi khuẩn gây bệnh",
        "Nấm độc",
        "Con giun đất"
       ],
       "ex": "Một số vi khuẩn có ích làm sữa lên men thành sữa chua. Không phải vi khuẩn nào cũng gây bệnh."
      },
      {
       "q": "Việc làm nào giúp em phòng bệnh do vi khuẩn gây ra?",
       "ans": "Rửa tay bằng xà phòng trước khi ăn",
       "wrong": [
        "Ăn bánh rơi xuống đất",
        "Uống nước lã ở ao",
        "Dùng chung khăn mặt"
       ],
       "ex": "Vi khuẩn gây bệnh bám trên tay bẩn. Rửa tay bằng xà phòng trước khi ăn giúp phòng nhiều bệnh."
      },
      {
       "q": "Cơm nấu xong để ngoài trời đến hôm sau bị thiu, có mùi chua. Vì sao cơm bị thiu?",
       "ans": "Vi khuẩn làm cơm bị hỏng",
       "wrong": [
        "Vì cơm tự đổi màu",
        "Vì nắng chiếu vào cơm",
        "Vì nồi cơm hết điện"
       ],
       "ex": "Vi khuẩn trong không khí rơi vào cơm, sinh sôi và làm cơm thiu, có mùi chua. Cơm thiu không nên ăn."
      },
      {
       "q": "Con sâu bướm lớn lên, hoá thành kén nằm yên một thời gian. Giai đoạn nằm trong kén gọi là gì?",
       "ans": "Nhộng",
       "wrong": [
        "Trứng",
        "Bướm trưởng thành",
        "Nòng nọc"
       ],
       "ex": "Vòng đời của bướm: trứng nở thành sâu, sâu hoá nhộng, nhộng biến thành bướm."
      },
      {
       "q": "Nòng nọc sống dưới ao, sau vài tuần mọc chân và mất đuôi thành ếch. Nòng nọc khác ếch trưởng thành ở điểm nào?",
       "ans": "Có đuôi và sống dưới nước",
       "wrong": [
        "Có cánh để bay",
        "Có vảy như cá chép",
        "Sống trên cây cao"
       ],
       "ex": "Nòng nọc có đuôi, bơi và sống dưới nước. Ếch trưởng thành hết đuôi, sống được cả trên cạn."
      },
      {
       "q": "Ong và bướm bay từ hoa này sang hoa khác hút mật. Việc đó giúp cây điều gì?",
       "ans": "Giúp hoa thụ phấn để tạo quả và hạt",
       "wrong": [
        "Giúp lá cây to hơn",
        "Giúp rễ cây dài ra",
        "Giúp cây cao thêm"
       ],
       "ex": "Khi hút mật, ong và bướm mang phấn hoa từ hoa này sang hoa khác, giúp hoa thụ phấn để tạo quả và hạt."
      },
      {
       "q": "Muốn trồng thêm cây sắn, người nông dân thường trồng bằng cách nào?",
       "ans": "Giâm đoạn thân (hom)",
       "wrong": [
        "Gieo hạt sắn",
        "Trồng bằng lá sắn",
        "Trồng bằng rễ sắn khô"
       ],
       "ex": "Cây sắn được trồng bằng cách giâm đoạn thân gọi là hom. Hom cắm xuống đất ẩm sẽ mọc rễ và thành cây mới."
      },
      {
       "q": "Trứng gà muốn nở thành gà con cần điều kiện gì?",
       "ans": "Được ấp đủ ấm",
       "wrong": [
        "Được phơi nắng gắt",
        "Được ngâm trong nước",
        "Được để trong tủ lạnh"
       ],
       "ex": "Trứng gà cần được gà mẹ ấp đủ ấm trong khoảng ba tuần mới nở thành gà con."
      },
      {
       "q": "Con vật nào sau đây đẻ con và nuôi con bằng sữa?",
       "ans": "Con bò",
       "wrong": [
        "Con gà",
        "Con cá chép",
        "Con ếch"
       ],
       "ex": "Bò đẻ con và cho con bú sữa. Gà, cá và ếch đều đẻ trứng."
      },
      {
       "q": "Cá voi sống dưới biển như cá, nhưng có điểm khác cá. Điểm đó là gì?",
       "ans": "Phải ngoi lên mặt nước để thở",
       "wrong": [
        "Thở bằng mang dưới nước",
        "Đẻ trứng như cá",
        "Không cần thở"
       ],
       "ex": "Cá voi là thú sống dưới nước, thở bằng phổi nên phải ngoi lên mặt nước để thở, không thở bằng mang như cá."
      },
      {
       "q": "Cây xương rồng ở sa mạc có lá biến thành gai nhọn. Điều đó giúp cây điều gì?",
       "ans": "Giảm mất nước cho cây",
       "wrong": [
        "Hút được nhiều nắng hơn",
        "Đuổi mây mưa đi",
        "Làm cây mọc nhanh hơn"
       ],
       "ex": "Sa mạc rất khô nóng. Lá thành gai giúp cây xương rồng giảm mất nước, sống được nơi khô hạn."
      },
      {
       "q": "Lạc đà sống ở sa mạc khô nóng. Đặc điểm nào giúp nó chịu khát và đi xa?",
       "ans": "Cái bướu trên lưng",
       "wrong": [
        "Đôi cánh dài",
        "Lớp vảy cứng",
        "Chiếc đuôi rất dài"
       ],
       "ex": "Bướu trên lưng lạc đà chứa mỡ dự trữ năng lượng, giúp nó đi xa trong sa mạc ít thức ăn và nước uống."
      },
      {
       "q": "Chim cánh cụt không bay được. Nó kiếm ăn bằng cách nào?",
       "ans": "Bơi lặn bắt cá",
       "wrong": [
        "Trèo cây bắt sâu",
        "Đào hang bắt giun",
        "Đợi cá tự nhảy lên bờ"
       ],
       "ex": "Chim cánh cụt bơi lặn rất giỏi dưới nước để bắt cá và tôm nhỏ. Đôi cánh của nó thành mái chèo bơi."
      },
      {
       "q": "Việc làm nào giúp bảo vệ nơi sống của các con vật dưới sông?",
       "ans": "Không xả rác xuống sông",
       "wrong": [
        "Đổ rác thải xuống sông",
        "Đổ nước xà phòng ra sông",
        "Chặt hết cây ven sông"
       ],
       "ex": "Rác và nước bẩn làm ô nhiễm sông, cá tôm không sống được. Giữ sông sạch là bảo vệ nơi sống của chúng."
      },
      {
       "q": "Rừng bị phá hết, điều gì xảy ra với các con vật sống trong rừng và đất rừng?",
       "ans": "Mất nơi sống và đất dễ xói mòn",
       "wrong": [
        "Con vật vui hơn vì thoáng",
        "Đất rừng tốt hơn trước",
        "Không có gì thay đổi"
       ],
       "ex": "Phá rừng làm con vật mất nơi sống và thức ăn, đất không còn rễ giữ nên dễ bị xói mòn khi mưa lớn."
      },
      {
       "q": "Bột mì làm bánh mì nở xốp được là nhờ sinh vật nào?",
       "ans": "Nấm men",
       "wrong": [
        "Nấm độc",
        "Vi khuẩn gây thiu",
        "Con ong"
       ],
       "ex": "Nấm men là một loại nấm có ích. Nấm men làm bột bánh nở xốp và thơm ngon khi nướng."
      },
      {
       "q": "Lá cây rụng và xác sinh vật chết trong rừng dần biến thành mùn trong đất. Nhờ sinh vật nào?",
       "ans": "Vi khuẩn và nấm phân huỷ",
       "wrong": [
        "Chim và bướm",
        "Cá và tôm",
        "Ong và kiến"
       ],
       "ex": "Vi khuẩn và nấm phân huỷ xác sinh vật thành mùn. Nhờ vậy đất được bổ sung chất dinh dưỡng cho cây."
      },
      {
       "q": "Con vật nào giúp đất vườn tơi xốp hơn?",
       "ans": "Con giun đất",
       "wrong": [
        "Con châu chấu",
        "Con bướm",
        "Con chuồn chuồn"
       ],
       "ex": "Giun đất đào hang và ăn đất, làm đất tơi xốp, thoáng khí. Vườn có giun đất thường tốt cho cây."
      },
      {
       "q": "Cây xanh cần những gì để sống và lớn lên?",
       "ans": "Nước, ánh sáng, không khí và chất khoáng",
       "wrong": [
        "Chỉ cần đất màu đen",
        "Chỉ cần bóng tối",
        "Chỉ cần nước đường"
       ],
       "ex": "Cây cần nước, ánh sáng, không khí và chất khoáng từ đất. Thiếu một thứ lâu ngày, cây sẽ yếu dần."
      },
      {
       "q": "Con vật cần những gì để sống khoẻ mạnh?",
       "ans": "Thức ăn, nước uống và không khí",
       "wrong": [
        "Chỉ cần chỗ ngủ",
        "Chỉ cần ánh nắng",
        "Chỉ cần đồ chơi"
       ],
       "ex": "Con vật cần thức ăn, nước uống, không khí để thở và nơi sống phù hợp mới sống khoẻ mạnh được."
      },
      {
       "q": "Người ta phun thuốc giết hết chim ăn sâu trong vườn. Sau đó điều gì có thể xảy ra?",
       "ans": "Sâu hại cây sẽ nhiều hơn",
       "wrong": [
        "Cây hết sâu ngay",
        "Sâu tự biến mất hết",
        "Chim quay lại đông hơn"
       ],
       "ex": "Chim ăn sâu là một mắt xích trong chuỗi thức ăn. Hết chim, sâu không bị ăn nên sinh sôi và phá cây nhiều hơn."
      },
      {
       "q": "Con tằm mà em nuôi nhả tơ là giai đoạn nào trong vòng đời của con ngài?",
       "ans": "Giai đoạn ấu trùng (con sâu)",
       "wrong": [
        "Giai đoạn trứng",
        "Giai đoạn trưởng thành",
        "Giai đoạn nhộng"
       ],
       "ex": "Con tằm là ấu trùng của con ngài. Tằm ăn lá dâu, lớn lên, nhả tơ làm kén rồi hoá nhộng và thành ngài."
      }
     ],
     "blank": [
      {
       "ans": "ếch",
       "wrong": [
        "cá",
        "thỏ",
        "bò"
       ],
       "ex": "Ếch ăn côn trùng như châu chấu, và rắn lại ăn ếch. Chuỗi đúng là Cỏ → Châu chấu → Ếch → Rắn.",
       "pre": "Trong chuỗi Cỏ → Châu chấu → ",
       "post": " → Rắn, sinh vật ở chỗ trống ăn châu chấu và bị rắn ăn.",
       "fig": {
        "f": "k2chain",
        "a": [
         [
          "Cỏ",
          "Châu chấu",
          "Ếch",
          "Rắn"
         ],
         2,
         false
        ]
       }
      },
      {
       "ans": "sâu",
       "wrong": [
        "bướm",
        "chim",
        "cá"
       ],
       "ex": "Vòng đời bướm: trứng nở thành sâu, sâu hoá nhộng, nhộng biến thành bướm.",
       "pre": "Trứng bướm nở ra ",
       "post": " trước khi hoá nhộng."
      },
      {
       "ans": "sinh sản",
       "wrong": [
        "tiêu hoá",
        "hô hấp",
        "vận động"
       ],
       "ex": "Hoa là cơ quan sinh sản của cây có hoa. Nhờ hoa thụ phấn mới tạo thành quả và hạt.",
       "pre": "Hoa là cơ quan ",
       "post": " của cây có hoa."
      },
      {
       "ans": "có ích",
       "wrong": [
        "gây bệnh",
        "làm thiu",
        "gây mốc"
       ],
       "ex": "Vi khuẩn có ích lên men sữa thành sữa chua. Nhiều vi khuẩn và nấm giúp ích cho con người.",
       "pre": "Sữa chua được làm nhờ vi khuẩn ",
       "post": "."
      },
      {
       "ans": "mốc",
       "wrong": [
        "men",
        "rơm",
        "kim châm"
       ],
       "ex": "Nấm mốc mọc trên thức ăn để lâu và làm thức ăn hỏng. Thức ăn bị mốc tuyệt đối không ăn.",
       "pre": "Bánh mì để lâu bị một loại nấm gọi là nấm ",
       "post": " mọc trên mặt."
      },
      {
       "ans": "ấp",
       "wrong": [
        "tưới",
        "phơi",
        "chôn"
       ],
       "ex": "Gà mẹ ấp trứng bằng hơi ấm cơ thể. Trứng đủ ấm khoảng ba tuần sẽ nở thành gà con.",
       "pre": "Trứng gà nở thành gà con khi được gà mẹ ",
       "post": " đủ ấm."
      },
      {
       "ans": "chất khoáng",
       "wrong": [
        "ánh sáng",
        "âm thanh",
        "bóng tối"
       ],
       "ex": "Rễ cây hút nước và chất khoáng từ đất. Ánh sáng thì cây nhận qua lá, không phải từ đất.",
       "pre": "Cây lấy ",
       "post": " từ đất qua rễ để lớn lên."
      },
      {
       "ans": "mang",
       "wrong": [
        "phổi",
        "da",
        "vây"
       ],
       "ex": "Cá thở bằng mang, lấy ô-xi hoà tan trong nước. Khác với cá, cá voi thở bằng phổi nên phải ngoi lên mặt nước.",
       "pre": "Cá thở bằng ",
       "post": " để lấy ô-xi hoà tan trong nước."
      },
      {
       "ans": "mùn",
       "wrong": [
        "cát",
        "sỏi",
        "nhựa"
       ],
       "ex": "Mùn là chất dinh dưỡng trong đất do xác sinh vật phân huỷ tạo thành, giúp cây lớn tốt.",
       "pre": "Xác cây lá rụng phân huỷ thành ",
       "post": " làm đất tốt hơn."
      },
      {
       "ans": "ong",
       "wrong": [
        "giun đất",
        "ốc sên",
        "sâu róm"
       ],
       "ex": "Ong hút mật và mang phấn hoa đi, giúp hoa thụ phấn tạo quả và hạt.",
       "pre": "Con ",
       "post": " bay từ hoa này sang hoa khác giúp hoa thụ phấn."
      },
      {
       "ans": "trứng",
       "wrong": [
        "nòng nọc",
        "nhộng",
        "hạt"
       ],
       "ex": "Ếch đẻ trứng dưới nước, trứng nở thành nòng nọc, nòng nọc lớn dần thành ếch.",
       "pre": "Vòng đời của ếch bắt đầu từ ",
       "post": " do ếch mẹ đẻ ra."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Cây xanh cần ánh sáng để sống và lớn lên.",
       "truth": true,
       "explain": "Đúng: cây dùng ánh sáng để tự làm thức ăn. Cây để trong tối lâu ngày sẽ vàng lá và yếu dần."
      },
      {
       "stmt": "Nấm là cây xanh, tự làm được thức ăn như cây.",
       "truth": false,
       "explain": "Sai: nấm không có lá xanh, không tự làm thức ăn được. Nấm lấy chất dinh dưỡng từ xác sinh vật hoặc thức ăn."
      },
      {
       "stmt": "Một số vi khuẩn có ích giúp làm ra sữa chua.",
       "truth": true,
       "explain": "Đúng: vi khuẩn có ích lên men sữa thành sữa chua, còn được dùng làm nhiều món ăn khác."
      },
      {
       "stmt": "Mọi vi khuẩn đều gây bệnh cho con người.",
       "truth": false,
       "explain": "Sai: nhiều vi khuẩn có ích cho tiêu hoá và làm thực phẩm. Chỉ một số vi khuẩn mới gây bệnh."
      },
      {
       "stmt": "Thấy nấm lạ mọc trong rừng, em không nên hái về ăn.",
       "truth": true,
       "explain": "Đúng: nấm lạ có thể là nấm độc rất nguy hiểm. Chỉ ăn nấm nuôi trồng hoặc mua nơi tin cậy."
      },
      {
       "stmt": "Trứng bướm nở ra là thành con bướm ngay.",
       "truth": false,
       "explain": "Sai: trứng bướm nở thành sâu, sâu hoá nhộng rồi mới biến thành bướm."
      },
      {
       "stmt": "Rửa tay bằng xà phòng trước khi ăn giúp phòng bệnh.",
       "truth": true,
       "explain": "Đúng: rửa tay sạch giúp loại bỏ vi khuẩn gây bệnh bám trên tay."
      },
      {
       "stmt": "Chặt hết cây trong rừng thì chim chóc vẫn đông như trước.",
       "truth": false,
       "explain": "Sai: hết cây, chim mất nơi ở và thức ăn nên sẽ giảm đi hoặc bỏ đi nơi khác."
      },
      {
       "stmt": "Hoa là cơ quan sinh sản của cây có hoa.",
       "truth": true,
       "explain": "Đúng: hoa thụ phấn sẽ tạo thành quả và hạt, từ hạt mọc cây mới."
      },
      {
       "stmt": "Cá voi thở bằng mang giống như cá.",
       "truth": false,
       "explain": "Sai: cá voi là thú, thở bằng phổi và phải ngoi lên mặt nước để thở."
      },
      {
       "stmt": "Giun đất giúp đất tơi xốp hơn.",
       "truth": true,
       "explain": "Đúng: giun đào hang và ăn đất, làm đất thoáng và tơi xốp, tốt cho cây trồng."
      },
      {
       "stmt": "Con vật nào cũng đẻ trứng.",
       "truth": false,
       "explain": "Sai: nhiều con vật đẻ con và nuôi con bằng sữa như bò, chó, mèo và cá voi."
      },
      {
       "stmt": "Bảo vệ rừng là bảo vệ nơi sống của nhiều con vật.",
       "truth": true,
       "explain": "Đúng: rừng là nhà của rất nhiều con vật và cây cối. Giữ rừng là giữ nơi sống cho chúng."
      },
      {
       "stmt": "Thức ăn ôi thiu để ngoài trời lâu, hâm lại vẫn ăn an toàn.",
       "truth": false,
       "explain": "Sai: thức ăn ôi thiu đã có nhiều vi khuẩn gây bệnh. Ăn vào có thể bị đau bụng, ngộ độc."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Đọc chuỗi thức ăn theo chiều mũi tên: sinh vật trước bị sinh vật sau ăn, năng lượng truyền dọc theo chuỗi.",
      "Muốn hiểu một sinh vật, em hỏi: nó ăn gì, uống gì, thở thế nào và sống ở đâu.",
      "Vi sinh vật có hai mặt: một số có ích làm sữa chua, làm bánh; một số gây bệnh và làm hỏng thức ăn.",
      "Vòng đời là một vòng tròn: trứng, con non, trưởng thành rồi lại sinh ra trứng. Phá một mắt xích sẽ ảnh hưởng cả chuỗi."
     ],
     "facts": [
      {
       "q": "Thấy nấm lạ mọc trong rừng, em có nên hái về ăn không?",
       "a": "Không ăn vì có thể là nấm độc",
       "ex": "Nhiều nấm lạ là nấm độc, ăn vào nguy hiểm đến tính mạng. Chỉ ăn nấm được nuôi trồng hoặc mua nơi tin cậy."
      },
      {
       "q": "Sữa chua được làm ra nhờ sinh vật nào?",
       "a": "Vi khuẩn có ích lên men sữa",
       "ex": "Vi khuẩn có ích biến sữa thành sữa chua chua dịu và thơm ngon. Đây là vi khuẩn có lợi."
      }
     ],
     "pairs": [
      [
       "Con ong",
       "thụ phấn cho hoa"
      ],
      [
       "Con giun đất",
       "làm đất tơi xốp"
      ],
      [
       "Nấm men",
       "làm bánh nở xốp"
      ],
      [
       "Châu chấu",
       "ăn lá cây"
      ],
      [
       "Con ếch",
       "ăn côn trùng"
      ],
      [
       "Cây xanh",
       "thức ăn đầu chuỗi"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-th-cothe",
    "emoji": "💪",
    "name": "Cơ thể em khoẻ mạnh",
    "sub": "Cơ quan cơ thể, dinh dưỡng, dậy thì và an toàn",
    "pools": {
     "choose": [
      {
       "q": "Thức ăn em nuốt xuống sẽ đi vào cơ quan nào để được nghiền nát và trộn với dịch tiêu hoá?",
       "ans": "Dạ dày",
       "wrong": [
        "Lá phổi",
        "Quả tim",
        "Bộ não"
       ],
       "ex": "Thức ăn từ miệng xuống thực quản rồi vào dạ dày. Dạ dày co bóp nghiền nát thức ăn thành dạng lỏng."
      },
      {
       "q": "Cơ quan nào trong ngực em đập không ngừng để bơm máu đi khắp cơ thể?",
       "ans": "Quả tim",
       "wrong": [
        "Lá gan",
        "Dạ dày",
        "Lá phổi"
       ],
       "ex": "Quả tim co bóp không ngừng để bơm máu mang chất dinh dưỡng và ô-xi đi nuôi khắp cơ thể."
      },
      {
       "q": "Việc làm nào tốt cho hệ thần kinh của em?",
       "ans": "Ngủ đủ giấc mỗi ngày",
       "wrong": [
        "Thức khuya chơi điện thoại",
        "Bỏ bữa sáng thường xuyên",
        "Ngồi yên cả ngày"
       ],
       "ex": "Ngủ đủ giấc giúp bộ não và hệ thần kinh nghỉ ngơi, em học tập tỉnh táo hơn. Thức khuya rất hại thần kinh."
      },
      {
       "q": "Đi ngang vườn hoa, em ngửi thấy hương thơm. Giác quan nào giúp em ngửi mùi?",
       "ans": "Mũi",
       "wrong": [
        "Đôi mắt",
        "Đôi tai",
        "Lưỡi"
       ],
       "ex": "Mũi là cơ quan khứu giác giúp em ngửi mùi. Mắt để nhìn, tai để nghe, lưỡi để nếm vị."
      },
      {
       "q": "Muốn xương và cơ khoẻ mạnh, em nên làm gì mỗi ngày?",
       "ans": "Tập thể dục và vận động",
       "wrong": [
        "Ngồi xem tivi cả ngày",
        "Ăn thật nhiều kẹo ngọt",
        "Ngủ nướng đến trưa"
       ],
       "ex": "Vận động và tập thể dục giúp xương chắc, cơ khoẻ và cơ thể dẻo dai. Em nên vận động mỗi ngày."
      },
      {
       "q": "Đi qua nơi nhiều bụi, em bảo vệ cơ quan hô hấp bằng cách nào?",
       "ans": "Đeo khẩu trang che mũi miệng",
       "wrong": [
        "Thở bằng miệng thật mạnh",
        "Nín thở thật lâu",
        "Không cần làm gì"
       ],
       "ex": "Khẩu trang ngăn bụi bẩn vào đường hô hấp, bảo vệ mũi và phổi của em."
      },
      {
       "q": "Uống đủ nước mỗi ngày giúp cơ thể điều gì?",
       "ans": "Giúp cơ quan bài tiết thải chất cặn ra ngoài",
       "wrong": [
        "Làm em cao thêm ngay",
        "Thay thế được bữa ăn",
        "Làm răng trắng hơn"
       ],
       "ex": "Nước giúp cơ thể bài tiết: chất cặn được thải ra ngoài theo nước tiểu và mồ hôi. Em nên uống đủ nước mỗi ngày."
      },
      {
       "q": "Một bữa ăn cân bằng cần có đủ mấy nhóm chất dinh dưỡng?",
       "ans": "4 nhóm chất",
       "wrong": [
        "2 nhóm chất",
        "3 nhóm chất",
        "6 nhóm chất"
       ],
       "ex": "Bữa ăn cân bằng có đủ 4 nhóm chất: chất bột đường, chất đạm, chất béo, vi-ta-min và chất khoáng."
      },
      {
       "q": "Em ăn thiếu chất lâu ngày, cơ thể sẽ thế nào?",
       "ans": "Gầy yếu và dễ bị bệnh",
       "wrong": [
        "Khoẻ mạnh hơn trước",
        "Cao lớn rất nhanh",
        "Không thay đổi gì"
       ],
       "ex": "Ăn thiếu chất lâu ngày làm cơ thể gầy yếu, chậm lớn và dễ mắc bệnh. Sách Khoa học 4 (Bài 25) gọi tình trạng trẻ thấp và nhẹ cân hơn chuẩn do ăn thiếu chất là bệnh suy dinh dưỡng thấp còi. Em cần ăn đủ chất mỗi ngày."
      },
      {
       "q": "Hộp sữa đã quá hạn sử dụng và có mùi chua. Em nên làm gì?",
       "ans": "Không uống và bỏ vào thùng rác",
       "wrong": [
        "Đun sôi lên rồi uống",
        "Cho thêm đường rồi uống",
        "Vẫn uống bình thường"
       ],
       "ex": "Sữa hết hạn đã bị hỏng, uống vào có thể đau bụng, ngộ độc. Dù đun sôi cũng không nên uống."
      },
      {
       "q": "Việc làm nào giúp em phòng tránh đuối nước?",
       "ans": "Học bơi và chỉ tắm nơi có người lớn trông",
       "wrong": [
        "Tắm sông một mình",
        "Nhảy xuống ao sâu chơi",
        "Bơi ra xa bờ thi với bạn"
       ],
       "ex": "Em chỉ tắm, bơi ở nơi an toàn có người lớn trông nom và nên học bơi để tự bảo vệ mình."
      },
      {
       "q": "Trứng của mẹ và tinh trùng của bố kết hợp với nhau tạo thành gì đầu tiên?",
       "ans": "Hợp tử",
       "wrong": [
        "Phôi",
        "Thai nhi",
        "Em bé"
       ],
       "ex": "Sự kết hợp giữa trứng và tinh trùng gọi là thụ tinh, tạo thành hợp tử. Hợp tử phát triển dần thành phôi rồi thành thai nhi."
      },
      {
       "q": "Cơ quan sinh dục của bố (nam) tạo ra gì?",
       "ans": "Tinh trùng",
       "wrong": [
        "Trứng",
        "Sữa mẹ",
        "Hợp tử"
       ],
       "ex": "Cơ quan sinh dục nam tạo ra tinh trùng. Cơ quan sinh dục nữ tạo ra trứng."
      },
      {
       "q": "Hợp tử được tạo thành sẽ phát triển thành phôi ở đâu trong cơ thể mẹ?",
       "ans": "Trong tử cung",
       "wrong": [
        "Trong dạ dày của mẹ",
        "Trong buồng trứng",
        "Trong ống dẫn trứng"
       ],
       "ex": "Hợp tử di chuyển vào tử cung, phát triển thành phôi rồi thành thai nhi trong tử cung của mẹ."
      },
      {
       "q": "Phôi trong tử cung lớn dần lên sẽ phát triển thành gì?",
       "ans": "Thai nhi",
       "wrong": [
        "Hợp tử",
        "Trứng",
        "Em bé trưởng thành"
       ],
       "ex": "Phôi phát triển thành thai nhi trong tử cung. Khoảng 9 tháng sau thụ tinh, em bé được sinh ra."
      },
      {
       "q": "Thai nhi được khoảng 3 tháng trong bụng mẹ có đặc điểm gì?",
       "ans": "Đã có hình dạng người",
       "wrong": [
        "Vẫn nhỏ như hạt đậu xanh",
        "Đã biết nói chuyện",
        "Đã mở mắt nhìn rõ"
       ],
       "ex": "Phôi 1 tháng nhỏ hơn hạt đậu xanh. Đến 3 tháng, thai đã có hình dạng người, tay chân bắt đầu cử động."
      },
      {
       "q": "Vì sao em bé sinh ra có nét giống bố hoặc giống mẹ?",
       "ans": "Vì em hình thành từ trứng của mẹ và tinh trùng của bố",
       "wrong": [
        "Vì em bé nhìn bố mẹ mỗi ngày",
        "Vì bố mẹ cho em ăn giống nhau",
        "Vì em bé tự chọn nét giống"
       ],
       "ex": "Em bé hình thành từ trứng của mẹ kết hợp tinh trùng của bố nên mang đặc điểm của cả bố và mẹ."
      },
      {
       "q": "Đặc điểm nào sau đây là đặc điểm sinh học của bạn nữ?",
       "ans": "Cơ quan sinh dục tạo ra trứng",
       "wrong": [
        "Thích màu hồng",
        "Để tóc dài",
        "Thích mặc váy"
       ],
       "ex": "Đặc điểm sinh học ít thay đổi: bạn nữ có cơ quan sinh dục tạo ra trứng. Sở thích màu sắc, tóc, trang phục là đặc điểm xã hội."
      },
      {
       "q": "Đặc điểm nào sau đây là đặc điểm xã hội, có thể thay đổi theo thời gian?",
       "ans": "Nghề nghiệp mình làm",
       "wrong": [
        "Màu mắt của mình",
        "Màu tóc tự nhiên",
        "Cấu tạo cơ quan sinh dục"
       ],
       "ex": "Nghề nghiệp, sở thích, trang phục là đặc điểm xã hội, thay đổi theo thời gian và lựa chọn. Màu mắt, màu tóc là đặc điểm sinh học."
      },
      {
       "q": "Khi bước vào tuổi dậy thì, bạn nam thường có thay đổi nào?",
       "ans": "Giọng nói trầm hơn, bắt đầu mọc râu",
       "wrong": [
        "Có kinh nguyệt mỗi tháng",
        "Cơ thể ngừng lớn hẳn",
        "Tóc chuyển màu trắng"
       ],
       "ex": "Tuổi dậy thì, bạn nam thường vỡ giọng trầm hơn, bắt đầu mọc râu. Đây là thay đổi bình thường của cơ thể."
      },
      {
       "q": "Tuổi dậy thì, chiều cao phát triển nhanh. Em nên ăn thực phẩm giàu can-xi vì sao?",
       "ans": "Xương đang phát triển nhanh về chiều cao",
       "wrong": [
        "Can-xi làm da trắng hơn",
        "Can-xi giúp tóc dài hơn",
        "Can-xi thay thế giấc ngủ"
       ],
       "ex": "Tuổi dậy thì xương phát triển nhanh để tăng chiều cao. Ăn đủ can-xi và vận động giúp xương phát triển tối đa."
      },
      {
       "q": "Cách chăm sóc cơ thể tuổi dậy thì nào là đúng?",
       "ans": "Tắm rửa bằng nước sạch mỗi ngày",
       "wrong": [
        "Mặc lại quần áo ẩm",
        "Nhiều ngày không tắm",
        "Tắm bằng nước bẩn ở ao"
       ],
       "ex": "Tuổi dậy thì cần tắm rửa sạch sẽ mỗi ngày bằng nước sạch, thay quần áo khô thoáng để phòng bệnh ngoài da."
      },
      {
       "q": "Có bạn nói nên dùng xà phòng để rửa cơ quan sinh dục cho thật sạch. Nói vậy đúng chưa?",
       "ans": "Không nên, dễ gây dị ứng, mẩn ngứa",
       "wrong": [
        "Đúng, càng nhiều xà phòng càng tốt",
        "Đúng, phải kỳ cọ thật mạnh",
        "Không nên, vì xà phòng đắt"
       ],
       "ex": "Sách dạy không dùng xà phòng để rửa cơ quan sinh dục vì dễ gây dị ứng, mẩn ngứa. Chỉ rửa nhẹ nhàng bằng nước sạch."
      },
      {
       "q": "Bạn nữ trong kì kinh nguyệt cần thay băng vệ sinh sau bao lâu?",
       "ans": "Mỗi 3 đến 4 giờ",
       "wrong": [
        "Mỗi ngày một lần",
        "Mỗi tuần một lần",
        "Không cần thay"
       ],
       "ex": "Trong kì kinh nguyệt, cần thay băng vệ sinh mỗi 3 đến 4 giờ một lần để giữ vệ sinh và phòng viêm nhiễm."
      },
      {
       "q": "Bạn nữ trong lớp bị đau bụng vì đến kì kinh nguyệt. Em nên làm gì?",
       "ans": "Không trêu chọc, giúp bạn khi bạn cần",
       "wrong": [
        "Cười và trêu chọc bạn",
        "Kể cho cả lớp cười",
        "Tránh xa không chơi với bạn"
       ],
       "ex": "Đau bụng khi đến kì kinh nguyệt là bình thường. Em nên thông cảm, không trêu chọc và giúp đỡ bạn khi cần."
      },
      {
       "q": "Một người lạ rủ em lên xe đi chơi và cho kẹo. Em nên làm gì?",
       "ans": "Nói «Không!», tránh xa và kể người lớn tin cậy",
       "wrong": [
        "Lên xe đi cùng",
        "Nhận kẹo rồi đi theo",
        "Đi một đoạn rồi xuống"
       ],
       "ex": "Người lạ rủ đi là dấu hiệu nguy hiểm. Em phải nói không, tránh xa ngay và kể với người lớn đáng tin cậy."
      },
      {
       "q": "Em ở nhà một mình, có người lạ gõ cửa xin vào nhà. Em nên làm gì?",
       "ans": "Không mở cửa cho người lạ",
       "wrong": [
        "Mở cửa mời vào nhà",
        "Mở hé cửa nói chuyện",
        "Cho vào nhà chờ bố mẹ"
       ],
       "ex": "Ở nhà một mình, em không mở cửa cho người lạ. Hãy ở yên trong nhà và gọi cho bố mẹ hoặc người thân."
      },
      {
       "q": "Khi em cảm thấy không an toàn hoặc bị ai làm em sợ, em nên kể với ai?",
       "ans": "Người lớn đáng tin cậy như bố mẹ, thầy cô",
       "wrong": [
        "Giữ kín không kể ai",
        "Kể với người lạ trên mạng",
        "Kể với bạn nhỏ bằng tuổi"
       ],
       "ex": "Hãy kể ngay với người lớn đáng tin cậy như bố mẹ, thầy cô, người thân để được bảo vệ và giúp đỡ."
      },
      {
       "q": "Em nên đánh răng vào những lúc nào mỗi ngày?",
       "ans": "Sáng sau khi dậy và tối trước khi ngủ",
       "wrong": [
        "Chỉ khi nào răng đau",
        "Mỗi tuần một lần",
        "Chỉ sau khi ăn kẹo"
       ],
       "ex": "Đánh răng sáng sau khi ngủ dậy và tối trước khi đi ngủ giúp răng chắc khoẻ, phòng sâu răng."
      }
     ],
     "blank": [
      {
       "ans": "mạch máu",
       "wrong": [
        "ống nước",
        "dây thần kinh",
        "đường ruột"
       ],
       "ex": "Máu chảy trong mạch máu đi khắp cơ thể, mang chất dinh dưỡng và ô-xi đến mọi cơ quan.",
       "pre": "Máu chảy trong các ",
       "post": " đi khắp cơ thể để nuôi các cơ quan."
      },
      {
       "ans": "Đôi mắt",
       "wrong": [
        "Đôi tai",
        "Cái mũi",
        "Cái miệng"
       ],
       "ex": "Đôi mắt là cơ quan thị giác giúp em nhìn. Đôi tai để nghe, mũi để ngửi, miệng để ăn và nói.",
       "pre": "Em dùng ",
       "post": " để nhìn các vật quanh mình."
      },
      {
       "ans": "thụ tinh",
       "wrong": [
        "nảy mầm",
        "thụ phấn",
        "quang hợp"
       ],
       "ex": "Trứng kết hợp với tinh trùng qua thụ tinh tạo thành hợp tử — khởi đầu của một cơ thể người mới.",
       "pre": "Sự kết hợp giữa trứng của mẹ và tinh trùng của bố gọi là ",
       "post": "."
      },
      {
       "ans": "tử cung",
       "wrong": [
        "dạ dày",
        "lá phổi",
        "quả tim"
       ],
       "ex": "Tử cung là một bộ phận của cơ quan sinh dục nữ, là nơi phôi và thai nhi phát triển.",
       "pre": "Hợp tử phát triển thành phôi và thai nhi trong ",
       "post": " của mẹ."
      },
      {
       "ans": "9",
       "wrong": [
        "3",
        "5",
        "12"
       ],
       "ex": "Thai nhi phát triển trong tử cung khoảng 9 tháng thì em bé được sinh ra.",
       "pre": "Khoảng ",
       "post": " tháng sau thụ tinh, em bé được sinh ra."
      },
      {
       "ans": "đạm",
       "wrong": [
        "đường",
        "muối",
        "nước"
       ],
       "ex": "Chất đạm giúp cơ thể xây dựng và lớn lên. Thịt, cá, trứng, sữa và đậu đều giàu chất đạm.",
       "pre": "Thịt, cá, trứng và sữa giàu chất ",
       "post": " giúp cơ thể lớn lên."
      },
      {
       "ans": "cân bằng",
       "wrong": [
        "thiếu chất",
        "quá ngọt",
        "toàn thịt"
       ],
       "ex": "Ăn uống cân bằng là ăn đủ 4 nhóm chất với lượng phù hợp, không thiên lệch một nhóm nào.",
       "pre": "Bữa ăn ",
       "post": " là bữa ăn có đủ các nhóm chất cần thiết cho cơ thể."
      },
      {
       "ans": "xâm phạm",
       "wrong": [
        "chăm sóc",
        "bảo vệ",
        "tôn trọng"
       ],
       "ex": "Thân thể của em là bất khả xâm phạm. Ai làm em đau hoặc làm em sợ là xâm phạm, em phải tránh xa và kể người lớn tin cậy.",
       "pre": "Theo Hiến pháp, không ai được ",
       "post": " vào sự an toàn của thân thể em."
      },
      {
       "ans": "can-xi",
       "wrong": [
        "đường",
        "muối",
        "dầu mỡ"
       ],
       "ex": "Can-xi giúp xương chắc khoẻ và phát triển chiều cao. Sữa, tôm, cua, cá nhỏ đều giàu can-xi.",
       "pre": "Tuổi dậy thì cần ăn thực phẩm giàu ",
       "post": " để xương phát triển."
      },
      {
       "ans": "tay",
       "wrong": [
        "chân",
        "tóc",
        "áo"
       ],
       "ex": "Rửa tay sạch trước khi ăn và sau khi đi vệ sinh giúp phòng nhiều bệnh truyền qua đường tiêu hoá.",
       "pre": "Trước khi ăn, em rửa ",
       "post": " bằng xà phòng và nước sạch."
      },
      {
       "ans": "kinh nguyệt",
       "wrong": [
        "sốt cao",
        "đau răng",
        "chóng mặt"
       ],
       "ex": "Kinh nguyệt là hiện tượng bình thường ở bạn nữ tuổi dậy thì, xuất hiện đều đặn mỗi tháng.",
       "pre": "Bạn nữ có ",
       "post": " đều đặn mỗi tháng khi đến tuổi dậy thì."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Quả tim bơm máu đi khắp cơ thể không ngừng nghỉ.",
       "truth": true,
       "explain": "Đúng: tim co bóp suốt ngày đêm để máu chảy khắp cơ thể, nuôi các cơ quan."
      },
      {
       "stmt": "Bộ não không tham gia điều khiển vận động của cơ thể.",
       "truth": false,
       "explain": "Sai: bộ não điều khiển suy nghĩ, cảm xúc và mọi vận động của cơ thể."
      },
      {
       "stmt": "Ăn đủ 4 nhóm chất giúp cơ thể khoẻ mạnh và lớn đều.",
       "truth": true,
       "explain": "Đúng: bữa ăn đủ chất bột đường, đạm, béo, vi-ta-min và khoáng chất giúp em phát triển cân đối."
      },
      {
       "stmt": "Sữa đã hết hạn, đun sôi lên là uống an toàn.",
       "truth": false,
       "explain": "Sai: sữa hết hạn đã bị vi khuẩn làm hỏng. Đun sôi cũng không làm sữa an toàn trở lại."
      },
      {
       "stmt": "Em không nên tắm ở sông, ao một mình vì dễ đuối nước.",
       "truth": true,
       "explain": "Đúng: tắm sông ao một mình rất nguy hiểm. Chỉ tắm nơi an toàn và có người lớn trông."
      },
      {
       "stmt": "Em bé chỉ được hình thành từ trứng của mẹ.",
       "truth": false,
       "explain": "Sai: cơ thể người hình thành từ trứng của mẹ kết hợp với tinh trùng của bố qua thụ tinh."
      },
      {
       "stmt": "Em bé phát triển trong tử cung khoảng 9 tháng rồi được sinh ra.",
       "truth": true,
       "explain": "Đúng: hợp tử thành phôi, phôi thành thai nhi trong tử cung khoảng 9 tháng thì em bé chào đời."
      },
      {
       "stmt": "Thích màu hồng là một đặc điểm sinh học của bạn nữ.",
       "truth": false,
       "explain": "Sai: thích màu sắc là đặc điểm xã hội, thay đổi theo sở thích. Đặc điểm sinh học là những điều như cơ quan sinh dục tạo trứng."
      },
      {
       "stmt": "Những thay đổi của cơ thể ở tuổi dậy thì là bình thường.",
       "truth": true,
       "explain": "Đúng: dậy thì ai cũng trải qua với những thay đổi về cơ thể và cảm xúc. Có điều chưa rõ, em hãy hỏi bố mẹ hoặc thầy cô."
      },
      {
       "stmt": "Mặc quần áo ẩm ướt là cách giữ vệ sinh đúng.",
       "truth": false,
       "explain": "Sai: quần áo ẩm dễ gây bệnh ngoài da và viêm nhiễm. Em cần mặc quần áo khô, sạch và thoáng."
      },
      {
       "stmt": "Người lạ rủ đi theo, em nên từ chối, tránh xa và kể người lớn tin cậy.",
       "truth": true,
       "explain": "Đúng: đó là cách tự bảo vệ mình. Kể với bố mẹ, thầy cô hoặc người thân đáng tin cậy ngay."
      },
      {
       "stmt": "Khi thấy không an toàn, em nên giấu kín không kể với ai.",
       "truth": false,
       "explain": "Sai: giấu kín làm em không được giúp đỡ. Hãy kể ngay với người lớn đáng tin cậy."
      },
      {
       "stmt": "Bạn nữ trong kì kinh nguyệt cần thay băng vệ sinh vài giờ một lần.",
       "truth": true,
       "explain": "Đúng: thay băng vệ sinh mỗi 3 đến 4 giờ giúp giữ vệ sinh và phòng viêm nhiễm."
      },
      {
       "stmt": "Uống nước ngọt thay nước lọc hằng ngày là rất tốt cho cơ thể.",
       "truth": false,
       "explain": "Sai: nước ngọt nhiều đường, uống thay nước lọc dễ sâu răng và thừa cân. Em nên uống nước lọc là chính."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Cơ thể em là một đội hình: tim bơm máu, phổi đưa không khí vào, dạ dày tiêu hoá thức ăn, não điều khiển mọi hoạt động.",
      "Muốn cơ thể khoẻ: ăn đủ chất, ngủ đủ giấc, vận động mỗi ngày và giữ vệ sinh sạch sẽ.",
      "Tuổi dậy thì có nhiều thay đổi là chuyện bình thường. Có điều thắc mắc, em cứ hỏi bố mẹ hoặc thầy cô.",
      "Cơ thể là của em: khi có nguy cơ bị xâm hại, em tránh xa và kể ngay với người lớn đáng tin cậy."
     ],
     "facts": [
      {
       "q": "Em bé trong bụng mẹ được hình thành từ đâu?",
       "a": "Trứng và tinh trùng kết hợp với nhau",
       "ex": "Trứng của mẹ kết hợp với tinh trùng của bố qua thụ tinh tạo thành hợp tử, rồi phát triển thành em bé."
      },
      {
       "q": "Người lạ rủ em đi theo, em làm gì?",
       "a": "Từ chối, tránh xa và kể người lớn tin cậy",
       "ex": "Nói không, tránh xa ngay và kể với bố mẹ, thầy cô hoặc người thân đáng tin cậy để được bảo vệ."
      }
     ],
     "pairs": [
      [
       "Quả tim",
       "bơm máu đi khắp cơ thể"
      ],
      [
       "Lá phổi",
       "đưa không khí vào cơ thể"
      ],
      [
       "Dạ dày",
       "tiêu hoá thức ăn"
      ],
      [
       "Bộ não",
       "điều khiển suy nghĩ, vận động"
      ],
      [
       "Đôi mắt",
       "nhìn các vật"
      ],
      [
       "Đôi tai",
       "nghe âm thanh"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-th-thinghiem",
    "emoji": "🔍",
    "name": "Nhà khoa học nhí",
    "sub": "Quan sát, dự đoán, thử nghiệm và đo lường",
    "pools": {
     "choose": [
      {
       "q": "Muốn biết hạt có cần nước để nảy mầm không, em làm thí nghiệm nào?",
       "ans": "Hai chậu hạt giống nhau, một chậu tưới nước, một chậu không",
       "wrong": [
        "Một chậu hạt, tưới thật nhiều nước",
        "Hai chậu hạt khác loại, đều tưới nước",
        "Gieo hạt vào tủ tối rồi chờ"
       ],
       "ex": "Phải có hai chậu giống nhau để so sánh: một chậu tưới nước, một chậu không tưới. Chậu nào nảy mầm sẽ cho em câu trả lời."
      },
      {
       "q": "Trước khi làm thí nghiệm, nhà khoa học nhí nên làm gì?",
       "ans": "Quan sát kĩ và đoán trước kết quả",
       "wrong": [
        "Viết ngay kết luận trước",
        "Đoán mò rồi không cần thử",
        "Hỏi bạn đáp án đúng"
       ],
       "ex": "Quan sát kĩ rồi đoán trước kết quả gọi là dự đoán. Sau khi thử, em so kết quả thật với dự đoán của mình."
      },
      {
       "q": "Khi làm thí nghiệm so sánh, vì sao chỉ nên thay đổi một điều kiện?",
       "ans": "Để biết rõ chính điều đó làm kết quả thay đổi",
       "wrong": [
        "Để thí nghiệm nhanh hơn",
        "Để khỏi phải ghi chép",
        "Thay đổi nhiều thứ cũng như nhau"
       ],
       "ex": "Nếu thay đổi nhiều điều cùng lúc, em không biết điều nào gây ra kết quả. Chỉ đổi một điều kiện thì kết luận mới rõ ràng."
      },
      {
       "q": "Đọc nhiệt kế vào lúc nào là đúng?",
       "ans": "Chờ cột chất lỏng đứng yên rồi mới đọc",
       "wrong": [
        "Vừa nhúng vào đọc ngay",
        "Khi cột đang dâng lên cao",
        "Lắc mạnh nhiệt kế rồi đọc"
       ],
       "ex": "Phải chờ cột chất lỏng trong nhiệt kế đứng yên, số đo lúc đó mới đúng với nhiệt độ thật."
      },
      {
       "q": "Em nhúng nhiệt kế vào nước và chờ cột chất lỏng đứng yên ở vạch 24. Nhiệt độ của nước là bao nhiêu?",
       "ans": "24 độ C",
       "wrong": [
        "20 độ C",
        "28 độ C",
        "42 độ C"
       ],
       "ex": "Cột chất lỏng đứng yên ở vạch 24 thì nhiệt độ là 24 độ C. Nhớ chờ cột đứng yên rồi mới đọc.",
       "fig": {
        "f": "k5therm",
        "a": [
         24,
         0,
         40,
         2
        ]
       }
      },
      {
       "q": "Em đổ nước vào ống đong, mặt nước dừng ở vạch 60. Thể tích nước là bao nhiêu?",
       "ans": "60 ml",
       "wrong": [
        "50 ml",
        "70 ml",
        "16 ml"
       ],
       "ex": "Đọc số ở vạch ngang với mặt nước. Mặt nước ở vạch 60 nên thể tích nước là 60 mi-li-lít.",
       "fig": {
        "f": "k5cyl",
        "a": [
         60,
         100,
         10
        ]
       }
      },
      {
       "q": "Em đặt cuốn sách dọc thước, một đầu sách ở vạch 0, đầu kia ở vạch 7. Chiều dài cuốn sách là bao nhiêu?",
       "ans": "7 cm",
       "wrong": [
        "6 cm",
        "8 cm",
        "17 cm"
       ],
       "ex": "Đo từ vạch 0, đầu kia ở vạch 7 thì vật dài 7 xăng-ti-mét. Nhớ đặt đầu vật trùng vạch 0.",
       "fig": {
        "f": "k5ruler",
        "a": 7
       }
      },
      {
       "q": "Muốn kiểm tra cây có cần ánh sáng để sống không, em làm thí nghiệm nào?",
       "ans": "Hai cây như nhau, một cây để sáng, một cây để tối",
       "wrong": [
        "Một cây để ngoài nắng và tưới nhiều",
        "Hai cây khác loại để cùng một nơi",
        "Một cây to để sáng, một cây nhỏ để tối"
       ],
       "ex": "Hai cây phải giống nhau, chăm như nhau, chỉ khác chỗ sáng và tối. Cây ở tối yếu đi sẽ cho biết cây cần ánh sáng."
      },
      {
       "q": "Muốn biết muối có tan trong nước không, em kiểm chứng thế nào?",
       "ans": "Khuấy muối vào nước trong và quan sát",
       "wrong": [
        "Ngửi mùi của hạt muối",
        "Cân hạt muối thật kĩ",
        "Để hạt muối ngoài nắng"
       ],
       "ex": "Cho muối vào nước trong, khuấy đều và quan sát: hạt muối biến mất khỏi mắt nhưng nước có vị mặn, tức là muối đã tan."
      },
      {
       "q": "Muốn thử một chiếc thìa có dẫn điện không, em làm cách nào an toàn?",
       "ans": "Kẹp thìa vào mạch pin và đèn nhỏ",
       "wrong": [
        "Cắm thìa vào ổ điện",
        "Đun thìa trên bếp",
        "Nhúng thìa vào nước sôi"
       ],
       "ex": "Chỉ dùng pin tiểu cho thí nghiệm. Kẹp vật vào mạch pin và đèn: đèn sáng thì vật dẫn điện."
      },
      {
       "q": "Muốn tìm hiểu vì sao Mặt Trăng thay đổi hình dạng, em nên quan sát thế nào?",
       "ans": "Quan sát và ghi lại hình Mặt Trăng nhiều tối liền",
       "wrong": [
        "Nhìn Mặt Trăng một lần thật lâu",
        "Hỏi một bạn duy nhất",
        "Xem tranh vẽ một đêm rằm"
       ],
       "ex": "Quan sát nhiều tối và ghi lại, em sẽ thấy Mặt Trăng thay đổi dần theo một vòng lặp đều đặn."
      },
      {
       "q": "Hai bạn tranh cãi cốc nước nào nóng hơn, chỉ sờ tay thì mỗi bạn nói một khác. Cách nào chắc chắn nhất?",
       "ans": "Dùng nhiệt kế để đo",
       "wrong": [
        "Sờ lại nhiều lần hơn",
        "Hỏi bạn thứ ba sờ thử",
        "Nhìn màu của nước"
       ],
       "ex": "Cảm giác bằng tay không chính xác. Dùng nhiệt kế đo sẽ cho con số rõ ràng để so sánh."
      },
      {
       "q": "Vì sao khi đo một vật, em nên đo lặp lại vài lần?",
       "ans": "Để kết quả đáng tin hơn, tránh sai sót",
       "wrong": [
        "Để tốn nhiều thời gian hơn",
        "Để được số đo to hơn",
        "Vì đo một lần là sai hết"
       ],
       "ex": "Đo lặp lại giúp phát hiện lần đo lệch và cho kết quả đáng tin hơn. Nhà khoa học luôn đo cẩn thận nhiều lần."
      },
      {
       "q": "Kết quả thí nghiệm khác hẳn với điều em dự đoán. Em nên làm gì?",
       "ans": "Ghi lại đúng kết quả thật và tìm hiểu vì sao",
       "wrong": [
        "Sửa kết quả cho giống dự đoán",
        "Xoá hết và làm lại đến khi giống",
        "Giấu không cho ai biết"
       ],
       "ex": "Dự đoán sai là bình thường. Nhà khoa học ghi lại kết quả thật và tìm hiểu nguyên nhân — đó là lúc học được điều mới."
      },
      {
       "q": "Muốn biết lọc qua cát sỏi có làm nước trong hơn không, em kiểm chứng thế nào?",
       "ans": "Lọc một cốc nước rồi so với cốc nước gốc",
       "wrong": [
        "Ngửi cốc nước thật kĩ",
        "Để cốc nước qua đêm",
        "Khuấy cốc nước thật mạnh"
       ],
       "ex": "Lọc một cốc, giữ một cốc gốc để so sánh. So hai cốc cạnh nhau sẽ thấy rõ nước sau lọc trong hơn."
      },
      {
       "q": "Muốn tách đỗ xanh lẫn trong gạo nhanh nhất, em dùng dụng cụ nào?",
       "ans": "Cái sàng có lỗ vừa",
       "wrong": [
        "Giấy lọc",
        "Nhiệt kế",
        "Nam châm"
       ],
       "ex": "Sàng có lỗ vừa cho gạo lọt qua và giữ đỗ lại. Chọn dụng cụ đúng việc là bước quan trọng của thí nghiệm."
      },
      {
       "q": "Muốn biết nam châm hút được những vật nào, em thử thế nào?",
       "ans": "Thử lần lượt từng vật và ghi lại kết quả",
       "wrong": [
        "Thử một vật duy nhất",
        "Đoán trước rồi kết luận luôn",
        "Hỏi bạn ngồi cạnh"
       ],
       "ex": "Đưa nam châm tới lần lượt sắt, gỗ, nhựa, nhôm... và ghi lại vật nào bị hút. Ghi lại giúp em kết luận đúng."
      },
      {
       "q": "Khi quan sát và đo đạc, việc ghi chép của nhà khoa học cần có gì?",
       "ans": "Ghi ngày tháng và số đo rõ ràng",
       "wrong": [
        "Chỉ cần nhớ trong đầu",
        "Ghi càng ít càng tốt",
        "Ghi kết quả trước khi đo"
       ],
       "ex": "Ghi rõ ngày tháng, số đo kèm đơn vị giúp em so sánh các lần quan sát và không bị quên."
      },
      {
       "q": "Muốn xem con sâu biến đổi thành bướm, em làm thế nào?",
       "ans": "Nuôi và quan sát sâu trong hộp thoáng nhiều ngày",
       "wrong": [
        "Nhìn con sâu một lần rồi kết luận",
        "Xem một bức tranh con bướm",
        "Đếm số lá trong vườn"
       ],
       "ex": "Sự biến đổi diễn ra trong nhiều ngày. Nuôi sâu trong hộp thoáng, cho lá ăn và quan sát ghi lại mỗi ngày, em sẽ thấy cả quá trình."
      },
      {
       "q": "Khi tự lắp mạch điện thí nghiệm, nguồn điện nào an toàn cho em?",
       "ans": "Pin tiểu thông thường",
       "wrong": [
        "Ổ cắm điện trong nhà",
        "Điện từ máy phát",
        "Dây điện ngoài cột"
       ],
       "ex": "Thí nghiệm của em chỉ dùng pin tiểu. Điện từ ổ cắm rất nguy hiểm, tuyệt đối không tự ý chạm vào."
      },
      {
       "q": "Vì sao khi đun nước làm thí nghiệm, em cần có người lớn ở bên?",
       "ans": "Vì nước nóng dễ gây bỏng nguy hiểm",
       "wrong": [
        "Vì người lớn đun nước nhanh hơn",
        "Vì nước sôi rất ồn",
        "Vì cần người lớn uống thử"
       ],
       "ex": "Nước nóng và bếp lửa dễ gây bỏng. Mọi việc đun nóng đều phải có người lớn hướng dẫn và ở bên."
      },
      {
       "q": "Em áp tai xuống bàn, bạn gõ nhẹ ở đầu bàn kia, em nghe rõ tiếng gõ. Thí nghiệm này cho biết điều gì?",
       "ans": "Âm thanh truyền qua được chất rắn",
       "wrong": [
        "Âm thanh chỉ truyền trong nước",
        "Âm thanh không truyền đi đâu",
        "Bàn tự phát ra âm thanh"
       ],
       "ex": "Tiếng gõ truyền qua mặt bàn gỗ tới tai em. Vậy âm thanh truyền qua được chất rắn."
      },
      {
       "q": "Muốn chứng tỏ chiếc cốc trông rỗng vẫn chứa không khí, em làm thế nào?",
       "ans": "Úp cốc xuống nước, nghiêng cốc xem bọt khí",
       "wrong": [
        "Đặt cốc lên cân",
        "Gõ vào thành cốc",
        "Để cốc ngoài nắng"
       ],
       "ex": "Úp cốc xuống nước rồi nghiêng nhẹ, bọt khí nổi lên. Đó là không khí trong cốc thoát ra."
      },
      {
       "q": "Khi đo chiều dài cuốn sách bằng thước, em đặt thước thế nào cho đúng?",
       "ans": "Đầu sách trùng với vạch số 0 của thước",
       "wrong": [
        "Đặt thước xéo qua cuốn sách",
        "Đặt đầu sách ở vạch số 5",
        "Đặt thước cách sách một đoạn"
       ],
       "ex": "Đặt thước dọc theo vật, đầu vật trùng vạch 0, đọc số ở đầu kia. Đặt lệch vạch 0 sẽ đo sai."
      },
      {
       "q": "Hai bạn đo cùng một chiếc bàn mà kết quả khác nhau khá nhiều. Nguyên nhân có thể là gì?",
       "ans": "Một bạn đặt lệch vạch 0 hoặc đọc sai vạch",
       "wrong": [
        "Chiếc bàn tự dài ra",
        "Thước tự ngắn lại",
        "Hai bạn nhìn khác nhau là đủ"
       ],
       "ex": "Đo khác nhau thường do đặt thước lệch vạch 0 hoặc đọc sai vạch. Hãy đo lại cẩn thận cùng một cách."
      },
      {
       "q": "Muốn biết cây đậu cao thêm bao nhiêu mỗi tuần, em làm thế nào?",
       "ans": "Đo vào cùng một ngày mỗi tuần và ghi lại",
       "wrong": [
        "Đo mỗi ngày một giờ khác nhau",
        "Nhìn cây và ước chừng",
        "Đo một lần vào cuối tháng"
       ],
       "ex": "Đo định kỳ cùng một ngày mỗi tuần và ghi lại số đo, em sẽ thấy rõ cây cao lên bao nhiêu."
      },
      {
       "q": "Một kết luận khoa học đáng tin khi nào?",
       "ans": "Khi thí nghiệm lặp lại vẫn cho kết quả giống nhau",
       "wrong": [
        "Khi em đoán trúng một lần",
        "Khi bạn em đồng ý với em",
        "Khi kết quả đúng ý em nhất"
       ],
       "ex": "Kết luận đáng tin khi thí nghiệm làm lại nhiều lần vẫn cho kết quả như cũ. Một lần đúng có thể chỉ là may mắn."
      },
      {
       "q": "Sáng ra em thấy lá cây ướt dù không mưa. Trình tự làm việc đúng của nhà khoa học nhí là gì?",
       "ans": "Quan sát, đặt câu hỏi, đoán, rồi kiểm chứng",
       "wrong": [
        "Kết luận ngay, không cần hỏi",
        "Đoán, rồi sửa kết quả theo ý mình",
        "Hỏi đáp án, rồi chép lại"
       ],
       "ex": "Nhà khoa học bắt đầu từ quan sát, đặt câu hỏi, đưa ra dự đoán rồi làm thí nghiệm kiểm chứng."
      },
      {
       "q": "Em trùm một túi ni-lông trong lên cành cây xanh một lúc. Điều gì sẽ xuất hiện trong túi?",
       "ans": "Thành túi có giọt nước đọng",
       "wrong": [
        "Túi tự đầy khí màu xanh",
        "Không có gì thay đổi",
        "Lá cây biến thành hoa"
       ],
       "ex": "Lá cây thoát hơi nước ra ngoài. Hơi nước gặp thành túi mát hơn sẽ ngưng tụ thành giọt nước đọng trong túi."
      }
     ],
     "blank": [
      {
       "ans": "dự đoán",
       "wrong": [
        "kết luận",
        "đáp án",
        "số đo"
       ],
       "ex": "Dự đoán là điều em nghĩ sẽ xảy ra trước khi thử. Đoán sai cũng không sao, quan trọng là kiểm chứng.",
       "pre": "Trước khi làm thí nghiệm, em nêu ",
       "post": " của mình về kết quả sắp xảy ra."
      },
      {
       "ans": "nhiệt kế",
       "wrong": [
        "thước kẻ",
        "cân đĩa",
        "la bàn"
       ],
       "ex": "Nhiệt kế đo nhiệt độ. Đo xong nhớ chờ cột chất lỏng đứng yên rồi mới đọc số.",
       "pre": "Dụng cụ dùng để đo nhiệt độ là ",
       "post": "."
      },
      {
       "ans": "ống đong",
       "wrong": [
        "nhiệt kế",
        "thước thẳng",
        "cái phễu"
       ],
       "ex": "Ống đong (bình chia độ) có vạch chia giúp em đọc thể tích chất lỏng như nước, dầu ăn.",
       "pre": "Dụng cụ có chia vạch, dùng để đo thể tích chất lỏng là ",
       "post": "."
      },
      {
       "ans": "một",
       "wrong": [
        "hai",
        "ba",
        "bốn"
       ],
       "ex": "Chỉ thay đổi một điều kiện, giữ mọi thứ khác giống nhau, em mới biết điều gì gây ra kết quả.",
       "pre": "Trong thí nghiệm công bằng, mỗi lần em chỉ thay đổi ",
       "post": " điều kiện."
      },
      {
       "ans": "ghi lại",
       "wrong": [
        "xoá đi",
        "giấu kín",
        "đoán mò"
       ],
       "ex": "Ghi lại ngay kết quả quan sát giúp em không quên và có số liệu để so sánh, kết luận.",
       "pre": "Quan sát được điều gì, em cần ",
       "post": " ngay vào sổ tay khoa học."
      },
      {
       "ans": "lọc",
       "wrong": [
        "đun sôi",
        "đông đá",
        "khuấy mạnh"
       ],
       "ex": "Lọc qua giấy lọc hoặc vải giữ cát lại, nước trong chảy qua. Đây là cách tách chất đơn giản.",
       "pre": "Muốn tách cát không tan ra khỏi nước, em dùng cách ",
       "post": "."
      },
      {
       "ans": "đơn vị",
       "wrong": [
        "đáp án",
        "kết luận",
        "dự đoán"
       ],
       "ex": "Số đo phải ghi kèm đơn vị: cm, mét, lít, độ C... Thiếu đơn vị, người khác không hiểu số đo của em.",
       "pre": "Em đo chiều dài bàn được 80 và ghi thêm chữ cm. Chữ cm là ",
       "post": " của số đo."
      },
      {
       "ans": "dẫn",
       "wrong": [
        "cách",
        "hút",
        "đẩy"
       ],
       "ex": "Kẹp vật vào mạch pin: đèn sáng thì vật dẫn điện, đèn không sáng thì vật cách điện.",
       "pre": "Muốn thử chiếc thìa có ",
       "post": " điện không, em kẹp thìa vào mạch pin và đèn."
      },
      {
       "ans": "ống nhòm",
       "wrong": [
        "nhiệt kế",
        "ống đong",
        "la bàn"
       ],
       "ex": "Ống nhòm giúp em nhìn các vật ở xa rõ hơn, như Mặt Trăng và các con chim ở xa.",
       "pre": "Muốn nhìn rõ Mặt Trăng hơn, em có thể dùng ",
       "post": "."
      },
      {
       "ans": "độ C",
       "wrong": [
        "cm",
        "ml",
        "kg"
       ],
       "ex": "Nhiệt độ đo bằng độ C. Cm đo chiều dài, ml đo thể tích, kg đo khối lượng.",
       "pre": "Nhiệt độ của nước là 24, đo bằng đơn vị ",
       "post": "."
      },
      {
       "ans": "câu hỏi",
       "wrong": [
        "kết luận",
        "số đo",
        "đơn vị"
       ],
       "ex": "Đặt câu hỏi rõ ràng là bước khởi đầu. Từ câu hỏi, em dự đoán rồi tìm cách kiểm chứng.",
       "pre": "Sau khi quan sát điều lạ, em đặt một ",
       "post": " rồi mới dự đoán và kiểm chứng."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Thí nghiệm công bằng là thí nghiệm chỉ thay đổi một điều kiện, giữ mọi điều khác giống nhau.",
       "truth": true,
       "explain": "Đúng: như vậy em mới biết chính điều kiện đó gây ra sự thay đổi kết quả."
      },
      {
       "stmt": "Đo một lần duy nhất là đủ, không cần đo lại.",
       "truth": false,
       "explain": "Sai: một lần đo dễ sai sót. Đo lặp lại vài lần cho kết quả đáng tin hơn."
      },
      {
       "stmt": "Dự đoán sai không sao, miễn là em ghi lại đúng kết quả thật.",
       "truth": true,
       "explain": "Đúng: dự đoán là để kiểm chứng. Ghi đúng kết quả thật mới là điều quan trọng của nhà khoa học."
      },
      {
       "stmt": "Nếu kết quả khác dự đoán, em nên sửa số liệu cho giống dự đoán.",
       "truth": false,
       "explain": "Sai: sửa số liệu là không trung thực. Nhà khoa học ghi đúng sự thật và tìm hiểu nguyên nhân."
      },
      {
       "stmt": "Khi tự làm thí nghiệm điện, em chỉ dùng pin tiểu, không dùng ổ cắm điện.",
       "truth": true,
       "explain": "Đúng: pin tiểu an toàn cho thí nghiệm của em. Điện ổ cắm rất nguy hiểm, không tự ý chạm vào."
      },
      {
       "stmt": "Vừa nhúng nhiệt kế vào nước, đọc số ngay lúc đó là chính xác nhất.",
       "truth": false,
       "explain": "Sai: phải chờ cột chất lỏng đứng yên mới đọc. Đọc ngay khi cột đang chạy sẽ sai số đo."
      },
      {
       "stmt": "Ghi chép cẩn thận giúp em so sánh kết quả các lần quan sát.",
       "truth": true,
       "explain": "Đúng: sổ tay khoa học lưu lại ngày tháng và số đo, giúp em thấy sự thay đổi theo thời gian."
      },
      {
       "stmt": "Chỉ cần gieo một chậu hạt và tưới nhiều nước là biết được hạt có cần nước không.",
       "truth": false,
       "explain": "Sai: cần hai chậu giống nhau, một tưới một không, để so sánh. Một chậu thì không có gì để đối chiếu."
      },
      {
       "stmt": "Lọc nước qua cát và sỏi giúp nước trong hơn.",
       "truth": true,
       "explain": "Đúng: cát sỏi giữ lại cặn bẩn khi nước chảy qua. Đây là cách làm sạch nước đơn giản."
      },
      {
       "stmt": "Hai cây một cây tưới nhiều một cây tưới ít, lại để hai nơi khác nhau, vẫn là thí nghiệm công bằng.",
       "truth": false,
       "explain": "Sai: hai cây khác cả nước tưới lẫn nơi để thì không công bằng. Chỉ được khác một điều kiện."
      },
      {
       "stmt": "Quan sát Mặt Trăng nhiều tối liền, em sẽ thấy hình Mặt Trăng thay đổi dần.",
       "truth": true,
       "explain": "Đúng: Mặt Trăng thay đổi hình theo vòng lặp khoảng một tháng. Quan sát và ghi lại sẽ thấy rõ."
      },
      {
       "stmt": "Sờ tay là cách đo nhiệt độ chính xác nhất.",
       "truth": false,
       "explain": "Sai: cảm giác tay dễ sai, mỗi người cảm thấy một khác. Muốn chính xác phải dùng nhiệt kế."
      },
      {
       "stmt": "Mọi việc với nước nóng và bếp lửa đều cần có người lớn ở bên.",
       "truth": true,
       "explain": "Đúng: nước nóng dễ gây bỏng nguy hiểm. Em chỉ làm khi có người lớn hướng dẫn, giám sát."
      },
      {
       "stmt": "Nam châm hút được cả vật bằng nhựa và gỗ.",
       "truth": false,
       "explain": "Sai: nam châm chỉ hút vật bằng sắt và một số kim loại. Nhựa và gỗ không bị nam châm hút."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Năm bước của nhà khoa học nhí: quan sát, đặt câu hỏi, dự đoán, làm thí nghiệm kiểm chứng, ghi lại và rút kết luận.",
      "Thí nghiệm công bằng: chỉ thay đổi một điều kiện, giữ mọi thứ còn lại giống nhau và có mẫu để so sánh.",
      "Đo đúng cách: đặt vật trùng vạch 0, chờ dụng cụ ổn định và đo lặp lại vài lần rồi so sánh.",
      "Trung thực với số liệu: kết quả thế nào ghi thế ấy. Dự đoán sai là cơ hội học thêm điều mới."
     ],
     "facts": [
      {
       "q": "Muốn biết hạt có cần nước để nảy mầm không, em làm thế nào?",
       "a": "Gieo hai chậu, một chậu tưới nước, một chậu không",
       "ex": "Hai chậu giống nhau chỉ khác nước tưới. Chậu được tưới nảy mầm, chậu không tưới không nảy mầm thì biết hạt cần nước."
      },
      {
       "q": "Đọc nhiệt kế vào lúc nào là đúng?",
       "a": "Khi cột chất lỏng đã đứng yên",
       "ex": "Cột chất lỏng còn di chuyển thì số đo chưa đúng. Chờ đứng yên rồi đọc là cách đo chuẩn."
      }
     ],
     "pairs": [
      [
       "Nhiệt kế",
       "đo nhiệt độ"
      ],
      [
       "Ống đong",
       "đo thể tích"
      ],
      [
       "Thước thẳng",
       "đo chiều dài"
      ],
      [
       "Pin tiểu",
       "nguồn điện an toàn"
      ],
      [
       "Giấy lọc",
       "tách cát khỏi nước"
      ],
      [
       "La bàn",
       "xác định phương hướng"
      ]
     ]
    }
   }
  ]
 },
 "thcs": {
  "topics": [
   {
    "id": "cd-kh-thcs-chat",
    "emoji": "🧪",
    "name": "Chất và biến đổi",
    "sub": "Dự đoán biến đổi chất, tách hỗn hợp, phản ứng quanh em",
    "pools": {
     "choose": [
      {
       "q": "Một nồi nước đang sôi sùng sục. Em vặn lửa thật to và đun thêm 20 phút nữa (nồi vẫn còn nước). Nhiệt độ của phần nước đang sôi lúc này khoảng bao nhiêu?",
       "ans": "Vẫn khoảng 100 °C",
       "wrong": [
        "Tăng lên khoảng 120 °C",
        "Tăng lên khoảng 150 °C",
        "Giảm xuống khoảng 80 °C"
       ],
       "ex": "Khi nước đã sôi, nhiệt lượng thêm vào chủ yếu dùng để biến nước thành hơi nên nhiệt độ của nước đang sôi giữ ở nhiệt độ sôi, khoảng 100 °C ở điều kiện thường."
      },
      {
       "q": "Khi nước sôi, những bong bóng lớn xuất hiện trong lòng nước và nổi lên mặt thoáng chủ yếu là gì?",
       "ans": "Hơi nước",
       "wrong": [
        "Không khí",
        "Khí oxygen",
        "Khí nitrogen"
       ],
       "ex": "Ở nhiệt độ sôi, nước lỏng chuyển thành hơi ngay trong lòng chất lỏng. Các bong bóng lớn đó là hơi nước, không phải không khí."
      },
      {
       "q": "Đốt cháy một chất trong một bình thật kín, không cho khí ra vào, rồi cân toàn bộ bình trước và sau phản ứng. Kết quả hai lần cân sẽ thế nào?",
       "ans": "Hai lần cân bằng nhau",
       "wrong": [
        "Lần sau nhẹ hơn hẳn",
        "Lần sau nặng hơn hẳn",
        "Không cân được vì bình có lửa"
       ],
       "ex": "Theo định luật bảo toàn khối lượng, trong hệ kín tổng khối lượng các chất trước và sau phản ứng luôn bằng nhau vì không có chất nào thoát ra hay đi vào."
      },
      {
       "q": "Khuấy một thìa đường vào cốc nước, một lúc sau không còn nhìn thấy hạt đường nữa nhưng nước có vị ngọt đều khắp cốc. Điều gì đã xảy ra với đường?",
       "ans": "Tan ra thành hạt cực nhỏ phân tán đều",
       "wrong": [
        "Biến mất hoàn toàn không còn nữa",
        "Biến thành nước lỏng",
        "Chìm hết xuống đáy cốc"
       ],
       "ex": "Đường không biến mất mà tan trong nước, phân tán thành những hạt cực nhỏ không nhìn thấy được. Vì thế nước ngọt đều và có thể thu lại đường bằng cách cô cạn."
      },
      {
       "q": "Ở ruộng muối, người ta dẫn nước biển vào ô ruộng nông rồi phơi nắng nhiều ngày để thu muối ăn. Cách tách muối này dựa vào hiện tượng nào?",
       "ans": "Nước bay hơi, muối ở lại",
       "wrong": [
        "Muối nổi lên mặt nước rồi được vớt",
        "Muối bị giấy lọc giữ lại",
        "Muối nóng chảy rồi đông cứng lại"
       ],
       "ex": "Nắng làm nước biển bay hơi dần, muối ăn đã tan không bay hơi nên ở lại và kết tinh trong ruộng. Đây là cách tách chất bằng bay hơi (cô cạn)."
      },
      {
       "q": "Sau cơn mưa, em có một cốc nước đục lẫn cát mịn không tan. Muốn lấy được nước trong nhanh, em nên làm gì trước tiên?",
       "ans": "Lọc qua giấy lọc hoặc vải mịn",
       "wrong": [
        "Đun cho nước bay hơi hết",
        "Cho thêm đường rồi khuấy đều",
        "Dùng nam châm khuấy trong cốc"
       ],
       "ex": "Cát không tan trong nước nên bị giữ lại trên giấy lọc, còn nước trong chảy qua. Lọc là cách tách chất rắn không tan ra khỏi chất lỏng."
      },
      {
       "q": "Dầu ăn nổi thành một lớp riêng trên mặt nước trong chai, khuấy thế nào cũng không tan. Cách nào tách được hai chất lỏng này gọn nhất?",
       "ans": "Chiết bằng phễu chiết",
       "wrong": [
        "Lọc qua giấy lọc",
        "Khuấy mạnh cho dầu tan vào nước",
        "Đun sôi cho dầu bay hơi trước"
       ],
       "ex": "Dầu và nước không tan vào nhau và có khối lượng riêng khác nhau nên tách thành hai lớp. Dùng phễu chiết sẽ gạn được từng lớp riêng ra."
      },
      {
       "q": "Hai đinh sắt giống hệt nhau: đinh A ngâm trong nước máy, để hở ngoài không khí; đinh B ngâm trong nước đã đun sôi và được phủ kín bằng một lớp dầu để cách li không khí. Sau vài ngày, dự đoán nào đúng?",
       "ans": "Đinh A gỉ nhiều hơn đinh B",
       "wrong": [
        "Đinh B gỉ nhiều hơn đinh A",
        "Cả hai đinh gỉ như nhau",
        "Cả hai đinh đều không gỉ"
       ],
       "ex": "Sắt gỉ cần đồng thời cả oxygen trong không khí và nước ẩm. Đinh B thiếu oxygen hoà tan và bị lớp dầu ngăn cách với không khí nên gỉ chậm hơn nhiều."
      },
      {
       "q": "Nhỏ giấm ăn lên mảnh vỏ trứng, em thấy sủi bọt mạnh. Khí sinh ra trong hiện tượng này là khí nào?",
       "ans": "Khí carbon dioxide",
       "wrong": [
        "Khí oxygen",
        "Khí hydrogen",
        "Khí nitrogen"
       ],
       "ex": "Vỏ trứng chứa hợp chất carbonate. Acetic acid trong giấm tác dụng với chất này sinh ra khí carbon dioxide, chính là các bọt khí em nhìn thấy."
      },
      {
       "q": "Tuyệt đối không được nếm hay sờ tay vào hoá chất lạ. Vậy muốn biết một dung dịch trong suốt có tính acid hay không, em làm cách nào an toàn và đúng?",
       "ans": "Nhúng giấy quỳ tím vào dung dịch",
       "wrong": [
        "Nếm thử một giọt nhỏ",
        "Nhúng ngón tay rồi chạm lên lưỡi",
        "Ngửi sát miệng lọ thật lâu"
       ],
       "ex": "Giấy quỳ tím đổi sang màu đỏ trong dung dịch acid và sang xanh trong dung dịch base. Dùng chất chỉ thị vừa cho kết quả rõ vừa an toàn."
      },
      {
       "q": "Ngâm một lá kẽm vào dung dịch copper(II) sulfate có màu xanh lam. Sau một thời gian, màu xanh nhạt dần và có lớp đồng đỏ bám trên lá kẽm. Giải thích nào đúng?",
       "ans": "Kẽm mạnh hơn nên đẩy đồng ra",
       "wrong": [
        "Đồng mạnh hơn nên đẩy kẽm ra",
        "Kẽm tan ra tạo khí hydrogen",
        "Màu xanh tự phai vì ánh sáng"
       ],
       "ex": "Trong dãy hoạt động hoá học, kẽm hoạt động mạnh hơn đồng nên đẩy đồng ra khỏi dung dịch muối của nó. Đồng sinh ra bám lên lá kẽm, dung dịch nhạt màu dần."
      },
      {
       "q": "Úp một cốc thuỷ tinh kín lên ngọn nến đang cháy, một lúc sau nến tắt dù sáp vẫn còn nhiều. Nguyên nhân chính là gì?",
       "ans": "Oxygen trong cốc đã cạn dần",
       "wrong": [
        "Sáp nến bị cốc làm lạnh đông lại",
        "Cốc thuỷ tinh hút hết nhiệt của lửa",
        "Gió bên ngoài thổi tắt nến"
       ],
       "ex": "Sự cháy cần khí oxygen. Trong cốc kín, oxygen bị tiêu thụ dần mà không được bổ sung, nên khi oxygen cạn thì ngọn lửa tắt."
      },
      {
       "q": "Một nguyên tử có 8 proton trong hạt nhân. Dù số neutron của nó có thể khác nhau đôi chút, nguyên tử đó vẫn thuộc nguyên tố nào?",
       "ans": "Nguyên tố oxygen",
       "wrong": [
        "Nguyên tố carbon",
        "Nguyên tố nitrogen",
        "Nguyên tố fluorine"
       ],
       "ex": "Số proton trong hạt nhân quyết định nguyên tố hoá học. Nguyên tử có 8 proton là oxygen; carbon có 6, nitrogen có 7 và fluorine có 9 proton."
      },
      {
       "q": "Phân tử carbon dioxide gồm 1 nguyên tử carbon (khối lượng 12 amu) và 2 nguyên tử oxygen (16 amu mỗi nguyên tử). Khối lượng phân tử của CO₂ là bao nhiêu?",
       "ans": "44 amu",
       "wrong": [
        "28 amu",
        "32 amu",
        "46 amu"
       ],
       "ex": "Khối lượng phân tử CO₂ bằng 12 + 16 × 2 = 44 amu. Nhiễu 32 amu là lỗi quên cộng nguyên tử carbon, còn 28 amu là lỗi chỉ cộng một oxygen và carbon."
      },
      {
       "q": "Hoà tan hoàn toàn 20 gam muối ăn vào 180 gam nước, được dung dịch muối ăn. Nồng độ phần trăm của dung dịch này là bao nhiêu?",
       "ans": "10%",
       "wrong": [
        "20%",
        "11,1%",
        "9%"
       ],
       "ex": "Khối lượng dung dịch là 20 + 180 = 200 gam. Nồng độ phần trăm bằng 20 : 200 × 100% = 10%. Lỗi thường gặp là lấy 20 : 180 nên ra 11,1%."
      },
      {
       "q": "Khối lượng mol của nước là 18 gam/mol. Một chai chứa 36 gam nước tinh khiết thì lượng chất nước trong chai là bao nhiêu?",
       "ans": "2 mol",
       "wrong": [
        "0,5 mol",
        "1 mol",
        "18 mol"
       ],
       "ex": "Số mol bằng khối lượng chia cho khối lượng mol: 36 : 18 = 2 mol. Con số 18 là khối lượng mol, không phải số mol."
      },
      {
       "q": "Cùng một lượng đá vôi như nhau: mẫu nghiền thành bột mịn sủi bọt với acid nhanh hơn hẳn mẫu để nguyên cục lớn. Vì sao?",
       "ans": "Bột có diện tích tiếp xúc lớn hơn",
       "wrong": [
        "Bột có khối lượng lớn hơn cục",
        "Bột mịn là một chất khác đá cục",
        "Acid không tác dụng với đá cục"
       ],
       "ex": "Nghiền nhỏ làm tăng diện tích bề mặt tiếp xúc giữa đá vôi và acid, nên phản ứng xảy ra nhanh hơn. Đây là một yếu tố làm thay đổi tốc độ phản ứng."
      },
      {
       "q": "Cho một ít bột manganese dioxide (MnO₂) vào dung dịch hydrogen peroxide, dung dịch phân huỷ nhanh và sinh khí oxygen. Khi phản ứng kết thúc hẳn, khối lượng MnO₂ còn lại sẽ thế nào?",
       "ans": "Gần như không đổi, vẫn thu lại được",
       "wrong": [
        "Giảm đi đúng một nửa",
        "Biến mất hoàn toàn",
        "Tăng lên gấp đôi"
       ],
       "ex": "MnO₂ ở đây là chất xúc tác: nó làm phản ứng nhanh hơn nhưng không bị tiêu hao trong phản ứng. Sau phản ứng, em vẫn thu lại được lượng MnO₂ gần như ban đầu."
      },
      {
       "q": "Cùng bếp và cùng cách nhóm lửa, củi khô bắt lửa nhanh còn củi vừa bị mưa ướt thì rất khó cháy. Vì sao?",
       "ans": "Củi ướt phải tốn nhiệt để nước bay hơi",
       "wrong": [
        "Củi ướt chứa nhiều oxygen hơn",
        "Nước trong củi là chất dễ cháy",
        "Củi khô nhẹ hơn nên cháy nhanh hơn"
       ],
       "ex": "Nhiệt ban đầu phải làm nóng và làm bay hơi lượng nước trong củi ướt trước khi gỗ đạt nhiệt độ bắt lửa. Củi khô không tốn phần nhiệt này nên cháy nhanh hơn."
      },
      {
       "q": "Một chai rượu vang đã mở nắp, để lâu ngày trong góc bếp thì dần có vị chua như giấm. Điều gì đã xảy ra với rượu?",
       "ans": "Ethylic alcohol bị biến thành acetic acid",
       "wrong": [
        "Rượu bay hơi hết chỉ còn lại nước",
        "Đường trong rượu biến thành muối ăn",
        "Rượu đông lại thành chất rắn chua"
       ],
       "ex": "Khi tiếp xúc lâu với không khí, ethylic alcohol trong rượu bị oxygen hoá thành acetic acid, tạo vị chua của giấm. Đây chính là nguyên lí làm giấm từ rượu."
      },
      {
       "q": "Khi luộc trứng, lòng trắng từ dạng lỏng trong suốt chuyển thành trắng đục và đông cứng lại. Hiện tượng này là do đâu?",
       "ans": "Protein bị biến tính khi gặp nhiệt",
       "wrong": [
        "Protein biến thành chất béo",
        "Protein tan hoàn toàn vào nước sôi",
        "Vỏ trứng tiết ra chất làm đông"
       ],
       "ex": "Lòng trắng trứng chứa nhiều protein. Gặp nhiệt độ cao, protein bị biến tính và đông tụ lại, làm lòng trắng chuyển từ trong suốt sang trắng đục và cứng."
      },
      {
       "q": "Một túi nylon chôn trong đất vườn nhiều năm vẫn gần như nguyên vẹn, trong khi lá cây chôn cùng lúc đã mục rữa sau vài tháng. Nguyên nhân chính là gì?",
       "ans": "Chuỗi polymer của nylon rất bền, khó phân huỷ",
       "wrong": [
        "Nylon nhẹ hơn lá cây rất nhiều",
        "Ở sâu trong đất không có nước",
        "Lá cây bị túi nylon đẩy ra ngoài"
       ],
       "ex": "Nylon là polymer tổng hợp có chuỗi phân tử dài và rất bền, vi sinh vật trong đất gần như không phân huỷ được. Vì thế rác nhựa tồn tại rất lâu trong môi trường."
      },
      {
       "q": "Các hang động đá vôi lớn, như hang ở Phong Nha, được tạo thành qua thời gian địa chất rất dài. Tác nhân chính tạo ra những hang này là gì?",
       "ans": "Nước mưa chứa CO₂ hoà tan đá vôi",
       "wrong": [
        "Gió thổi mòn đá theo từng mùa",
        "Động đất làm nứt đá thành hang",
        "Sông ngầm đẩy khối đá ra biển"
       ],
       "ex": "Nước mưa hoà tan khí CO₂ tạo tính acid yếu, thấm qua khe nứt và hoà tan dần đá vôi trong hàng vạn năm. Phần đá bị lấy đi để lại khoảng rỗng thành hang động."
      },
      {
       "q": "Dẫn khí ethene (C₂H₄) vào ống nghiệm đựng nước bromine có màu vàng cam. Dự đoán hiện tượng đúng là gì?",
       "ans": "Nước bromine bị mất màu",
       "wrong": [
        "Nước bromine đậm màu hơn",
        "Xuất hiện kết tủa trắng đục",
        "Sinh ra khí có mùi trứng thối"
       ],
       "ex": "Ethene có liên kết đôi nên tham gia phản ứng cộng với bromine, làm nước bromine mất màu. Phản ứng này dùng để nhận biết alkene như ethene."
      },
      {
       "q": "Thép là hợp kim của sắt với một ít carbon. Thép thường cứng và khó uốn hơn hẳn sắt nguyên chất. Vì sao hợp kim lại cứng hơn kim loại thành phần?",
       "ans": "Nguyên tử lạ cản các lớp nguyên tử sắt trượt",
       "wrong": [
        "Thép chứa nhiều khí hơn sắt",
        "Carbon làm thép nhẹ đi rất nhiều",
        "Thép không còn chứa nguyên tử sắt"
       ],
       "ex": "Trong sắt nguyên chất, các lớp nguyên tử dễ trượt lên nhau nên sắt mềm. Nguyên tử carbon chen vào làm lệch cấu trúc, cản sự trượt đó nên thép cứng hơn."
      },
      {
       "q": "Em nghi ngờ một chai thuỷ tinh trông có vẻ rỗng thực ra vẫn chứa đầy không khí. Thí nghiệm nào chứng minh rõ nhất điều đó?",
       "ans": "Úp ngược chai vào chậu nước, nước không vào đầy",
       "wrong": [
        "Lắc mạnh chai và nghe tiếng động",
        "Cân chai và thấy chai rất nhẹ",
        "Đặt chai cạnh quạt và thấy mát"
       ],
       "ex": "Úp thẳng chai xuống nước, nước chỉ dâng vào một ít rồi dừng vì không khí bên trong chiếm chỗ và bị nén lại. Điều đó cho thấy không khí là chất có thể tích, chiếm không gian."
      }
     ],
     "blank": [
      {
       "ans": "ngưng tụ",
       "wrong": [
        "bay hơi",
        "đông đặc",
        "nóng chảy"
       ],
       "ex": "Hơi nước gặp bề mặt lạnh sẽ ngưng tụ thành nước lỏng dạng giọt nhỏ. Đây là hiện tượng sương đọng trên kính, lá cây vào buổi sáng.",
       "pre": "Sáng sớm mùa đông, hơi nước trong không khí gặp mặt kính xe lạnh liền ",
       "post": " thành những giọt nước li ti bám trên kính."
      },
      {
       "ans": "nở ra",
       "wrong": [
        "co lại",
        "đông đặc lại",
        "biến mất"
       ],
       "ex": "Hầu hết chất lỏng nở ra khi nóng lên và co lại khi lạnh đi. Nhiệt kế hoạt động dựa vào sự nở vì nhiệt này để chỉ nhiệt độ.",
       "pre": "Khi bị đun nóng, chất lỏng màu trong ống của nhiệt kế ",
       "post": " và dâng lên cao hơn trong ống nhỏ."
      },
      {
       "ans": "nam châm",
       "wrong": [
        "giấy lọc",
        "phễu chiết",
        "đèn cồn"
       ],
       "ex": "Sắt có tính từ nên bị nam châm hút, còn cát thì không. Đây là cách tách chất dựa vào tính chất từ của sắt.",
       "pre": "Để lấy bột sắt lẫn trong đống cát khô, em đưa ",
       "post": " lại gần hỗn hợp, bột sắt sẽ bị hút tách ra khỏi cát."
      },
      {
       "ans": "proton",
       "wrong": [
        "neutron",
        "electron",
        "phân tử"
       ],
       "ex": "Hạt nhân gồm proton mang điện dương và neutron không mang điện. Electron mang điện âm chuyển động xung quanh hạt nhân.",
       "pre": "Trong hạt nhân của nguyên tử, hạt mang điện tích dương được gọi là hạt ",
       "post": "."
      },
      {
       "ans": "dung dịch iodine",
       "wrong": [
        "nước cất",
        "dầu ăn",
        "nước muối loãng"
       ],
       "ex": "Dung dịch iodine là thuốc thử quen thuộc của tinh bột: gặp tinh bột nó chuyển sang màu xanh tím đặc trưng. Nước, dầu ăn và nước muối đều không gây đổi màu này.",
       "pre": "Nhỏ vài giọt ",
       "post": " lên lát khoai, chỗ được nhỏ chuyển sang màu xanh tím, chứng tỏ trong khoai có chứa tinh bột."
      },
      {
       "ans": "trung tính",
       "wrong": [
        "có tính acid",
        "có tính base",
        "đậm đặc"
       ],
       "ex": "Thang pH: nhỏ hơn 7 là tính acid, bằng 7 là trung tính, lớn hơn 7 là tính base. Nước cất tinh khiết là ví dụ gần với dung dịch trung tính.",
       "pre": "Một dung dịch không làm đổi màu giấy quỳ tím và có giá trị pH bằng 7 được gọi là dung dịch ",
       "post": "."
      },
      {
       "ans": "32 gam",
       "wrong": [
        "12 gam",
        "44 gam",
        "56 gam"
       ],
       "ex": "Khối lượng chất trước phản ứng bằng khối lượng chất sau phản ứng: oxygen bằng 44 − 12 = 32 gam. Đây là ứng dụng trực tiếp của định luật bảo toàn khối lượng.",
       "pre": "Đốt cháy hoàn toàn 12 gam carbon trong khí oxygen tạo thành 44 gam khí carbon dioxide. Theo định luật bảo toàn khối lượng, khối lượng oxygen đã tham gia phản ứng là ",
       "post": "."
      },
      {
       "ans": "đỏ",
       "wrong": [
        "xanh lam",
        "đen",
        "trắng"
       ],
       "ex": "Sắt hoạt động hoá học mạnh hơn đồng nên đẩy đồng ra khỏi dung dịch. Đồng kim loại sinh ra có màu đỏ, bám lên bề mặt đinh sắt.",
       "pre": "Ngâm một đinh sắt sạch vào dung dịch copper(II) sulfate màu xanh lam, sau một lúc trên bề mặt đinh xuất hiện một lớp kim loại có màu ",
       "post": "."
      },
      {
       "ans": "acetic acid",
       "wrong": [
        "ethylic alcohol",
        "glucose",
        "sodium chloride"
       ],
       "ex": "Giấm ăn là dung dịch acetic acid loãng, khoảng vài phần trăm. Tính acid của nó làm quỳ tím hoá đỏ và tạo vị chua.",
       "pre": "Giấm ăn quen thuộc trong bếp là dung dịch loãng của ",
       "post": ", có vị chua và làm giấy quỳ tím hoá đỏ."
      },
      {
       "ans": "hydrocarbon",
       "wrong": [
        "protein",
        "acid béo",
        "polymer thiên nhiên"
       ],
       "ex": "Dầu mỏ chủ yếu gồm các hydrocarbon có số nguyên tử carbon khác nhau, mỗi loại sôi ở một khoảng nhiệt độ riêng. Chưng cất phân đoạn tách chúng thành xăng, dầu hoả, dầu diesel…",
       "pre": "Xăng và dầu hoả được tách ra từ dầu mỏ bằng phương pháp chưng cất phân đoạn, vì dầu mỏ là hỗn hợp của nhiều ",
       "post": " có nhiệt độ sôi khác nhau."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Đun một ấm nước càng lâu sau khi đã sôi thì nước trong ấm sẽ nóng dần lên tới 120 °C, 150 °C.",
       "truth": false,
       "explain": "Sai. Khi nước đang sôi ở áp suất thường, nhiệt độ giữ ở khoảng 100 °C; nhiệt thêm vào dùng để hoá hơi nước chứ không làm nước nóng thêm."
      },
      {
       "stmt": "Trong một bình kín, tổng khối lượng của cả bình trước và sau một phản ứng hoá học luôn bằng nhau.",
       "truth": true,
       "explain": "Đúng. Đây là định luật bảo toàn khối lượng áp dụng cho hệ kín: không có chất nào ra vào nên tổng khối lượng không đổi."
      },
      {
       "stmt": "Nguyên tử của cùng một nguyên tố hoá học có thể có số proton khác nhau tuỳ từng nguyên tử.",
       "truth": false,
       "explain": "Sai. Số proton là dấu hiệu quyết định nguyên tố: mọi nguyên tử của cùng một nguyên tố đều có cùng số proton. Khác nhau chỉ có thể là số neutron."
      },
      {
       "stmt": "Muối ăn đã tan hết trong nước vẫn còn nguyên trong dung dịch và có thể thu lại bằng cách đun cho nước bay hơi.",
       "truth": true,
       "explain": "Đúng. Tan không có nghĩa là biến mất: muối phân tán trong nước thành dung dịch, và cô cạn sẽ làm nước bay hơi, muối kết tinh trở lại."
      },
      {
       "stmt": "Có thể tách muối ăn đã tan trong nước bằng cách lọc qua giấy lọc, giống như tách cát khỏi nước.",
       "truth": false,
       "explain": "Sai. Muối đã tan thành hạt cực nhỏ đi xuyên qua giấy lọc cùng với nước. Muốn lấy muối phải dùng bay hơi (cô cạn) hoặc chưng cất, không dùng lọc."
      },
      {
       "stmt": "Đá vôi thả vào giấm ăn sẽ sủi bọt vì sinh ra khí carbon dioxide.",
       "truth": true,
       "explain": "Đúng. Đá vôi chứa calcium carbonate; acid trong giấm tác dụng với nó sinh khí carbon dioxide tạo bọt sủi, đồng thời đá bị mòn dần."
      },
      {
       "stmt": "Chất xúc tác tham gia phản ứng rồi bị tiêu hao dần và biến mất khi phản ứng kết thúc.",
       "truth": false,
       "explain": "Sai. Chất xúc tác chỉ làm thay đổi tốc độ phản ứng mà không bị tiêu hao; sau phản ứng khối lượng và bản chất của nó gần như giữ nguyên."
      },
      {
       "stmt": "Kẽm hoạt động hoá học mạnh hơn đồng nên kẽm đẩy được đồng ra khỏi dung dịch muối đồng.",
       "truth": true,
       "explain": "Đúng. Kim loại hoạt động mạnh hơn đẩy được kim loại yếu hơn ra khỏi dung dịch muối của nó; kẽm đứng trước đồng trong dãy hoạt động hoá học."
      },
      {
       "stmt": "Mọi kim loại đều bị nam châm hút mạnh như nhau, kể cả đồng và nhôm.",
       "truth": false,
       "explain": "Sai. Chỉ một số kim loại như sắt, nickel, cobalt bị nam châm hút mạnh. Đồng, nhôm và nhiều kim loại khác hầu như không bị nam châm hút."
      },
      {
       "stmt": "Rượu ethylic để tiếp xúc lâu với không khí có thể chuyển thành giấm chứa acetic acid.",
       "truth": true,
       "explain": "Đúng. Ethylic alcohol bị oxygen trong không khí oxygen hoá dần thành acetic acid. Đây là cơ sở của nghề làm giấm truyền thống từ rượu."
      },
      {
       "stmt": "Túi nylon và chai nhựa PE chôn trong đất sẽ phân huỷ nhanh như lá cây, chỉ sau vài tuần.",
       "truth": false,
       "explain": "Sai. Nhựa polymer tổng hợp rất bền, vi sinh vật khó phân huỷ, nên rác nhựa tồn tại trong đất hàng chục đến hàng trăm năm, khác hẳn lá cây mục rữa trong vài tháng."
      },
      {
       "stmt": "Có thể tách rượu ra khỏi hỗn hợp rượu và nước bằng chưng cất, vì rượu sôi ở nhiệt độ thấp hơn nước.",
       "truth": true,
       "explain": "Đúng. Ethylic alcohol sôi ở khoảng 78 °C, thấp hơn nước (100 °C), nên khi đun hỗn hợp, hơi rượu bay lên trước và được ngưng tụ thu riêng."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Muốn dự đoán một hiện tượng, hãy tự hỏi: chất nào tham gia, chất nào tạo thành, và điều kiện (nhiệt độ, không khí, nước) có gì đặc biệt?",
      "Thí nghiệm kiểm chứng tốt luôn có hai mẫu để so sánh: một mẫu có yếu tố cần thử và một mẫu không có, mọi điều kiện khác giữ giống nhau.",
      "Khối lượng không tự nhiên mất đi: nếu cân thấy nhẹ đi, hãy tìm phần chất đã bay đi dưới dạng khí; nếu thấy nặng lên, có thể chất khí từ không khí đã nhập vào.",
      "Tuyệt đối không nếm, ngửi sát hay sờ tay vào hoá chất lạ. Muốn biết tính acid hay base, hãy dùng giấy quỳ tím hoặc chất chỉ thị.",
      "Tách hỗn hợp là chọn đúng tính chất khác biệt: không tan thì lọc, tan trong nước thì cô cạn, hai chất lỏng không trộn lẫn thì chiết, sôi khác nhau thì chưng cất, có tính từ thì dùng nam châm."
     ],
     "facts": [
      {
       "q": "Khí nào chiếm phần lớn nhất thể tích của không khí quanh em?",
       "a": "Nitrogen, khoảng 78%",
       "ex": "Không khí là hỗn hợp: nitrogen chiếm khoảng 78%, oxygen khoảng 21%, phần còn lại là các khí khác như argon và carbon dioxide."
      },
      {
       "q": "Vì sao khi nước trong ấm sôi mạnh, nắp ấm lại bị bật kênh lên?",
       "a": "Hơi nước tạo áp suất đẩy nắp lên",
       "ex": "Nước sôi tạo nhiều hơi nước, làm áp suất trong ấm tăng lên. Khi áp suất đủ lớn, hơi đẩy nắp ấm kênh lên và thoát ra ngoài."
      }
     ],
     "pairs": [
      [
       "Muối ăn tan trong nước",
       "Phương pháp cô cạn"
      ],
      [
       "Cát lẫn trong nước",
       "Phương pháp lọc"
      ],
      [
       "Dầu ăn nổi trên nước",
       "Phương pháp chiết"
      ],
      [
       "Bột sắt lẫn trong cát",
       "Dùng nam châm hút"
      ],
      [
       "Rượu lẫn trong nước",
       "Chưng cất theo nhiệt độ sôi"
      ],
      [
       "Đá vôi gặp giấm ăn",
       "Sủi bọt khí CO₂"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-thcs-nangluong",
    "emoji": "🔌",
    "name": "Lực, điện và năng lượng",
    "sub": "Lực quanh em, mạch điện, ánh sáng và nhiệt trong đời sống",
    "pools": {
     "choose": [
      {
       "q": "Thả một đồng xu và một chiếc lông chim trong ống đã hút hết không khí. Kết quả nào đúng?",
       "ans": "Cùng chạm đất một lúc",
       "wrong": [
        "Đồng xu chạm đất trước rõ rệt",
        "Lông chim chạm đất trước",
        "Lông chim không rơi xuống"
       ],
       "ex": "Trong chân không không còn sức cản của không khí nên mọi vật rơi nhanh như nhau, dù nặng hay nhẹ. Ngoài không khí, lông chim rơi chậm vì bị không khí cản rất nhiều so với trọng lượng của nó."
      },
      {
       "q": "Mắc hai bóng đèn giống nhau nối tiếp. Ampe kế đo trước bóng đèn thứ nhất và ngay sau bóng đèn thứ nhất cho kết quả thế nào?",
       "ans": "Bằng nhau trước và sau bóng đèn",
       "wrong": [
        "Sau bóng đèn nhỏ hơn nhiều",
        "Sau bóng đèn chỉ còn một nửa",
        "Sau bóng đèn lớn hơn trước"
       ],
       "ex": "Trong mạch nối tiếp, cường độ dòng điện bằng nhau ở mọi vị trí. Bóng đèn không \"dùng hết\" dòng điện; nó chuyển hoá năng lượng của dòng điện thành ánh sáng và nhiệt."
      },
      {
       "q": "Một giọt nước đang sôi ở 100 °C và một nồi nước lớn ở 80 °C. Nhận xét nào đúng nhất?",
       "ans": "Giọt nước nóng hơn nhưng ít nội năng hơn",
       "wrong": [
        "Giọt nước có nội năng lớn hơn nồi nước",
        "Hai vật có nội năng bằng nhau",
        "Nồi nước có nhiệt độ cao hơn giọt nước"
       ],
       "ex": "Nhiệt độ của giọt nước cao hơn (100 °C > 80 °C), nhưng nồi nước có khối lượng lớn hơn rất nhiều nên tổng nội năng của nó lớn hơn. Nhiệt độ và nội năng không phải là một đại lượng."
      },
      {
       "q": "Mặc áo len vào ngày lạnh, em thấy ấm lên. Cách giải thích đúng là gì?",
       "ans": "Giữ nhiệt cơ thể, hạn chế mất nhiệt",
       "wrong": [
        "Áo len tự sinh ra nhiệt sưởi người",
        "Áo len làm máu nóng lên nhanh",
        "Áo len làm nhiệt độ cơ thể tăng cao"
       ],
       "ex": "Áo len không tự sinh ra nhiệt như bếp sưởi. Lớp len xốp giữ không khí và dẫn nhiệt kém, nên nhiệt của cơ thể mất ra ngoài chậm hơn và em cảm thấy ấm."
      },
      {
       "q": "Hai bóng đèn mắc nối tiếp đang sáng. Một bóng bị đứt dây tóc. Bóng còn lại sẽ thế nào?",
       "ans": "Cũng tắt vì mạch bị hở",
       "wrong": [
        "Sáng hơn lúc trước",
        "Sáng yếu đi một nửa",
        "Vẫn sáng như cũ"
       ],
       "ex": "Mạch nối tiếp chỉ có một đường đi duy nhất cho dòng điện. Dây tóc đứt làm mạch hở, dòng điện ngừng chạy nên bóng còn lại cũng tắt.",
       "fig": {
        "f": "circuit",
        "a": {
         "cells": 1,
         "bulbs": 2,
         "sw": "closed"
        }
       }
      },
      {
       "q": "Hai bóng đèn mắc song song trong nhà đang sáng. Một bóng bị cháy. Bóng còn lại sẽ thế nào?",
       "ans": "Vẫn sáng như bình thường",
       "wrong": [
        "Cũng tắt theo bóng kia",
        "Sáng gấp đôi lúc trước",
        "Nhấp nháy liên tục rồi tắt"
       ],
       "ex": "Mỗi bóng đèn song song nằm trên một nhánh riêng và vẫn được nối trực tiếp với nguồn điện. Nhánh này hỏng không cắt điện của nhánh còn lại."
      },
      {
       "q": "Cắm một chiếc đũa vào cốc nước trong, nhìn nghiêng thấy đũa như bị gãy khúc ở mặt nước. Vì sao?",
       "ans": "Ánh sáng bị khúc xạ tại mặt nước",
       "wrong": [
        "Nước làm đũa cong thật sự",
        "Mắt nhìn sai vì nước quá trong",
        "Đũa nở ra khi ngâm nước"
       ],
       "ex": "Tia sáng từ phần đũa dưới nước đi ra không khí bị đổi hướng ở mặt phân cách (khúc xạ). Mắt nhìn theo đường thẳng nên thấy phần đũa dưới nước như bị lệch đi."
      },
      {
       "q": "Em đứng trước một gương phẳng trong phòng. Ảnh của em trong gương có đặc điểm gì?",
       "ans": "Ảnh ảo, lớn bằng vật",
       "wrong": [
        "Ảnh thật, lớn bằng vật",
        "Ảnh ảo, nhỏ hơn vật nhiều",
        "Ảnh thật, ngược chiều và to hơn"
       ],
       "ex": "Gương phẳng cho ảnh ảo (không hứng được trên màn chắn), lớn bằng vật và cách gương một khoảng bằng khoảng cách từ vật đến gương."
      },
      {
       "q": "Đặt chuông điện đang kêu trong bình kín rồi hút dần không khí ra. Tiếng chuông sẽ thay đổi thế nào?",
       "ans": "Yếu dần rồi gần như mất hẳn",
       "wrong": [
        "To và rõ hơn trước",
        "Vẫn kêu to như cũ",
        "Cao hơn nhưng vẫn rõ"
       ],
       "ex": "Âm thanh cần môi trường vật chất (khí, lỏng, rắn) để truyền đi. Không khí càng loãng, âm truyền càng yếu; trong chân không âm không truyền được."
      },
      {
       "q": "Nam châm điện đang hút một số đinh sắt. Ngắt dòng điện qua cuộn dây. Điều gì xảy ra?",
       "ans": "Hầu như mất từ tính ngay",
       "wrong": [
        "Vẫn hút mạnh như cũ mãi",
        "Hút mạnh hơn lúc có điện",
        "Chỉ mất từ tính sau một ngày"
       ],
       "ex": "Từ tính của nam châm điện do dòng điện trong cuộn dây tạo ra. Ngắt điện, từ trường gần như mất ngay nên các đinh sắt rơi xuống."
      },
      {
       "q": "Một ô tô đi quãng đường 180 km trong 3 giờ với tốc độ không đổi. Tốc độ của ô tô là bao nhiêu?",
       "ans": "60 km/h",
       "wrong": [
        "30 km/h",
        "90 km/h",
        "540 km/h"
       ],
       "ex": "Áp dụng v = s/t = 180/3 = 60 km/h. Đáp án 540 km/h là lỗi nhân s với t thay vì chia."
      },
      {
       "q": "Mắc một điện trở 6 Ω vào hiệu điện thế 12 V. Cường độ dòng điện qua điện trở là bao nhiêu?",
       "ans": "2 A",
       "wrong": [
        "0,5 A",
        "6 A",
        "72 A"
       ],
       "ex": "Định luật Ohm: I = U/R = 12/6 = 2 A. Đáp án 72 A là lỗi nhân U với R."
      },
      {
       "q": "Một khối kim loại có khối lượng 540 g và thể tích 200 cm³. Khối lượng riêng của kim loại là bao nhiêu?",
       "ans": "2,7 g/cm³",
       "wrong": [
        "0,37 g/cm³",
        "27 g/cm³",
        "340 g/cm³"
       ],
       "ex": "Khối lượng riêng D = m/V = 540/200 = 2,7 g/cm³. Đáp án 0,37 là lỗi lấy V chia m; 340 là lỗi lấy hiệu m − V."
      },
      {
       "q": "Một vật ép lên mặt sàn với áp lực 200 N trên diện tích tiếp xúc 0,04 m². Áp suất do vật gây ra là bao nhiêu?",
       "ans": "5 000 Pa",
       "wrong": [
        "8 Pa",
        "500 Pa",
        "50 000 Pa"
       ],
       "ex": "Áp suất p = F/S = 200/0,04 = 5 000 Pa. Đáp án 8 Pa là lỗi nhân F với S thay vì chia."
      },
      {
       "q": "Một lực 20 N tác dụng vuông góc vào đầu cờ lê, cách trục quay 0,5 m. Moment lực là bao nhiêu?",
       "ans": "10 N·m",
       "wrong": [
        "5 N·m",
        "20 N·m",
        "40 N·m"
       ],
       "ex": "Moment lực M = F × d = 20 × 0,5 = 10 N·m, trong đó d là khoảng cách từ trục quay đến giá của lực."
      },
      {
       "q": "Thả một quả bóng từ trên cao xuống. Trong lúc bóng đang rơi (bỏ qua sức cản không khí), năng lượng của bóng thay đổi thế nào?",
       "ans": "Thế năng giảm, động năng tăng",
       "wrong": [
        "Thế năng tăng, động năng giảm",
        "Cả hai cùng tăng lên",
        "Cả hai cùng giảm xuống"
       ],
       "ex": "Khi rơi, độ cao giảm nên thế năng giảm; bóng rơi càng nhanh nên động năng tăng. Thế năng chuyển hoá dần thành động năng, cơ năng được bảo toàn nếu bỏ qua sức cản."
      },
      {
       "q": "Bóng đèn sợi đốt sáng một lúc, sờ vào thấy rất nóng. Phần lớn điện năng cấp cho đèn đã chuyển hoá thành gì?",
       "ans": "Hầu hết thành nhiệt hao phí",
       "wrong": [
        "Hầu hết thành ánh sáng nhìn thấy",
        "Hầu hết thành năng lượng âm thanh",
        "Hầu hết được tích trữ trong bóng đèn"
       ],
       "ex": "Đèn sợi đốt chỉ chuyển một phần nhỏ điện năng thành ánh sáng; phần lớn bị hao phí thành nhiệt làm nóng bóng đèn và không khí xung quanh."
      },
      {
       "q": "Khi bóp phanh, má phanh ép chặt vào vành xe và xe đạp chậm dần rồi dừng lại. Lực nào trực tiếp cản chuyển động ở má phanh?",
       "ans": "Ma sát má phanh làm xe chậm lại",
       "wrong": [
        "Lực hút của nam châm ở phanh",
        "Trọng lực kéo xe dừng lại",
        "Lực đẩy của gió phía trước"
       ],
       "ex": "Ma sát giữa má phanh và vành xe cản lại chuyển động quay của bánh xe. Đây là trường hợp ma sát có ích, giúp xe dừng lại an toàn."
      },
      {
       "q": "Thợ lặn xuống càng sâu dưới nước càng cảm thấy tức ngực hơn. Nguyên nhân là gì?",
       "ans": "Áp suất nước càng lớn",
       "wrong": [
        "Nước ở sâu nhẹ hơn nhiều",
        "Nhiệt độ nước tăng rất cao",
        "Không khí dưới nước đặc hơn"
       ],
       "ex": "Áp suất chất lỏng tăng theo độ sâu: càng xuống sâu, lớp nước phía trên ép xuống càng nhiều nên áp suất tác dụng lên cơ thể càng lớn."
      },
      {
       "q": "Chiếu đèn pin vào một quả bóng đặt trước tường trong phòng tối. Trên tường, phía sau quả bóng xuất hiện gì?",
       "ans": "Một bóng tối của quả bóng",
       "wrong": [
        "Một vùng sáng hơn xung quanh",
        "Ảnh màu của quả bóng",
        "Không có gì thay đổi"
       ],
       "ex": "Ánh sáng truyền theo đường thẳng nên vùng phía sau quả bóng không nhận được ánh sáng từ đèn, tạo thành bóng tối trên tường."
      },
      {
       "q": "Hai dây đàn cùng chất liệu, cùng độ căng. Một dây gảy trên đoạn dài, một dây gảy trên đoạn ngắn hơn. Âm của đoạn dây ngắn thế nào so với đoạn dây dài?",
       "ans": "Âm phát ra cao hơn",
       "wrong": [
        "Âm phát ra thấp hơn",
        "Âm to hơn gấp đôi",
        "Không phát ra âm"
       ],
       "ex": "Đoạn dây càng ngắn dao động càng nhanh, tần số dao động càng lớn. Tần số lớn thì âm phát ra càng cao."
      },
      {
       "q": "Tấm pin Mặt Trời trên mái nhà đang cấp điện cho đèn trong nhà. Sự chuyển hoá năng lượng chính ở tấm pin là gì?",
       "ans": "Năng lượng ánh sáng thành điện năng",
       "wrong": [
        "Nhiệt năng thành hoá năng",
        "Điện năng thành ánh sáng",
        "Cơ năng thành nhiệt năng"
       ],
       "ex": "Pin Mặt Trời chuyển hoá trực tiếp năng lượng ánh sáng thành điện năng. Việc điện năng thành ánh sáng xảy ra ở bóng đèn, không phải ở tấm pin."
      },
      {
       "q": "Dây điện trong nhà có lõi bằng đồng và vỏ bằng nhựa. Cách giải thích đúng về hai vật liệu này là gì?",
       "ans": "Đồng dẫn điện, nhựa cách điện",
       "wrong": [
        "Đồng cách điện, nhựa dẫn điện",
        "Cả hai đều dẫn điện tốt",
        "Cả hai đều cách điện tốt"
       ],
       "ex": "Đồng là vật dẫn điện tốt nên làm lõi truyền dòng điện; nhựa là vật cách điện nên làm vỏ bọc, giúp an toàn khi chạm vào dây."
      },
      {
       "q": "Giữa hai thanh ray đường sắt luôn có một khe hở nhỏ. Khe hở đó để làm gì?",
       "ans": "Chừa chỗ cho thanh ray nở ra",
       "wrong": [
        "Để nước mưa thoát xuống nhanh",
        "Để tàu chạy êm hơn qua khe",
        "Để tiết kiệm thép làm ray"
       ],
       "ex": "Khi trời nóng, thanh ray bằng thép nở dài ra vì nhiệt. Khe hở chừa sẵn khoảng trống để ray nở mà không bị cong, vênh gây nguy hiểm."
      },
      {
       "q": "Đưa nam châm lại gần rồi ra xa một cuộn dây nối với điện kế liên tục, kim điện kế bị lệch. Điều đó chứng tỏ gì?",
       "ans": "Có dòng điện cảm ứng xuất hiện",
       "wrong": [
        "Cuộn dây tự tạo ra điện mãi mãi",
        "Nam châm truyền điện sang dây",
        "Điện kế hỏng nên kim lệch"
       ],
       "ex": "Khi nam châm chuyển động, từ trường qua cuộn dây biến thiên và tạo ra dòng điện cảm ứng. Đây là nguyên tắc tạo ra dòng điện xoay chiều trong máy phát điện."
      },
      {
       "q": "Khi em hút sữa bằng ống hút, sữa đi lên ống vào miệng. Điều gì đã đẩy sữa lên?",
       "ans": "Áp suất khí quyển đẩy sữa lên",
       "wrong": [
        "Lực hút kéo sữa từ miệng",
        "Không khí trong miệng đẩy sữa",
        "Trọng lực kéo sữa đi lên"
       ],
       "ex": "Khi hút, em làm giảm áp suất không khí trong ống. Áp suất khí quyển tác dụng lên mặt sữa trong hộp lớn hơn nên đẩy sữa đi lên ống."
      }
     ],
     "blank": [
      {
       "ans": "5 m/s",
       "wrong": [
        "2 m/s",
        "20 m/s",
        "2 000 m/s"
       ],
       "ex": "v = s/t = 100/20 = 5 m/s. Đáp án 2 000 m/s là lỗi nhân s với t.",
       "pre": "Bạn An đi bộ 100 m trong 20 s với tốc độ không đổi. Tốc độ của An là ",
       "post": "."
      },
      {
       "ans": "3 A",
       "wrong": [
        "1 A",
        "6 A",
        "27 A"
       ],
       "ex": "Định luật Ohm: I = U/R = 9/3 = 3 A. Đáp án 27 A là lỗi nhân U với R.",
       "pre": "Mắc điện trở 3 Ω vào hiệu điện thế 9 V thì cường độ dòng điện qua điện trở là ",
       "post": "."
      },
      {
       "ans": "30 W",
       "wrong": [
        "15 W",
        "435 W",
        "6 750 W"
       ],
       "ex": "Công suất P = A/t = 450/15 = 30 W. Đáp án 6 750 W là lỗi nhân A với t.",
       "pre": "Một máy thực hiện được công 450 J trong 15 s. Công suất của máy là ",
       "post": "."
      },
      {
       "ans": "120 J",
       "wrong": [
        "12 J",
        "34 J",
        "1 200 J"
       ],
       "ex": "Thế năng Wt = m × g × h = 3 × 10 × 4 = 120 J. Đáp án 12 J là lỗi quên nhân với g.",
       "pre": "Một vật nặng 3 kg ở độ cao 4 m so với mặt đất (lấy g ≈ 10 m/s²) có thế năng trọng trường là ",
       "post": "."
      },
      {
       "ans": "thẳng",
       "wrong": [
        "cong",
        "gấp khúc",
        "xoắn ốc"
       ],
       "ex": "Đây là định luật truyền thẳng của ánh sáng; nhờ đó ta giải thích được bóng tối, bóng nửa tối và hiện tượng nhật thực, nguyệt thực.",
       "pre": "Trong môi trường trong suốt và đồng tính, ánh sáng truyền theo đường ",
       "post": "."
      },
      {
       "ans": "nhiễm điện",
       "wrong": [
        "nhiễm từ",
        "nóng lên",
        "ẩm ướt"
       ],
       "ex": "Cọ xát làm thước nhựa nhiễm điện (mang điện tích). Vật nhiễm điện có khả năng hút các vật nhẹ như mẩu giấy, sợi tóc.",
       "pre": "Cọ xát thước nhựa vào tóc khô nhiều lần, thước nhựa bị ",
       "post": " nên hút được các mẩu giấy nhỏ."
      },
      {
       "ans": "song song",
       "wrong": [
        "nối tiếp",
        "xen kẽ",
        "chồng lên nhau"
       ],
       "ex": "Mắc song song: mỗi bóng là một nhánh riêng nối với nguồn. Mắc nối tiếp thì một bóng cháy sẽ làm hở mạch và tắt tất cả.",
       "pre": "Trong nhà, các bóng đèn thường được mắc ",
       "post": " với nhau để một bóng cháy thì các bóng khác vẫn sáng."
      },
      {
       "ans": "sắt",
       "wrong": [
        "đồng",
        "nhôm",
        "nhựa"
       ],
       "ex": "Nam châm chỉ hút các vật liệu có tính từ như sắt, thép, niken, coban. Đồng, nhôm và nhựa không bị nam châm hút.",
       "pre": "Nam châm hút mạnh các vật làm bằng ",
       "post": " như đinh, kẹp giấy."
      },
      {
       "ans": "3 000 Pa",
       "wrong": [
        "30 Pa",
        "300 Pa",
        "2,7 Pa"
       ],
       "ex": "p = F/S = 90/0,03 = 3 000 Pa. Đáp án 2,7 Pa là lỗi nhân F với S thay vì chia.",
       "pre": "Ấn một vật với áp lực 90 N lên diện tích bị ép 0,03 m² thì áp suất gây ra là ",
       "post": "."
      },
      {
       "ans": "động năng",
       "wrong": [
        "nhiệt năng",
        "điện năng",
        "hoá năng"
       ],
       "ex": "Vật càng rơi xuống thấp, thế năng càng giảm trong khi tốc độ và động năng càng tăng: thế năng chuyển hoá thành động năng.",
       "pre": "Khi vật rơi từ trên cao xuống (bỏ qua sức cản không khí), thế năng của vật chuyển hoá dần thành ",
       "post": "."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Trong chân không, một hòn đá sẽ rơi nhanh hơn một chiếc lông chim rõ rệt.",
       "truth": false,
       "explain": "Sai. Trong chân không không có sức cản không khí nên mọi vật rơi nhanh như nhau. Ngoài đời lông chim rơi chậm là do bị không khí cản."
      },
      {
       "stmt": "Lốp xe có nhiều rãnh sâu giúp tăng ma sát với mặt đường, xe bám đường tốt hơn.",
       "truth": true,
       "explain": "Đúng. Rãnh lốp tăng ma sát và thoát nước khi đường ướt, giúp bánh xe bám đường, phanh và rẽ an toàn hơn."
      },
      {
       "stmt": "Dòng điện sau khi qua bóng đèn thứ nhất trong mạch nối tiếp sẽ yếu đi vì đã bị bóng đèn dùng bớt.",
       "truth": false,
       "explain": "Sai. Trong mạch nối tiếp cường độ dòng điện bằng nhau ở mọi vị trí. Bóng đèn chuyển hoá năng lượng của dòng điện chứ không làm dòng điện bị \"dùng hết\"."
      },
      {
       "stmt": "Đáy bể bơi trông nông hơn độ sâu thật vì ánh sáng từ đáy bể bị khúc xạ khi đi ra khỏi mặt nước.",
       "truth": true,
       "explain": "Đúng. Tia sáng từ đáy bể ra không khí bị đổi hướng ở mặt nước, mắt nhìn thẳng ngược lại nên thấy đáy như được nâng lên gần hơn."
      },
      {
       "stmt": "Một vật có nhiệt độ cao hơn thì luôn chứa nhiều năng lượng nhiệt hơn bất kì vật nào có nhiệt độ thấp hơn.",
       "truth": false,
       "explain": "Sai. Một giọt nước sôi có nhiệt độ cao hơn một nồi nước ấm, nhưng nồi nước có khối lượng lớn hơn nhiều nên tổng nội năng của nó lớn hơn. Nhiệt độ không quyết định một mình nội năng."
      },
      {
       "stmt": "Tăng cường độ dòng điện qua cuộn dây của nam châm điện thì nam châm điện hút mạnh hơn.",
       "truth": true,
       "explain": "Đúng. Dòng điện càng lớn, từ trường của cuộn dây càng mạnh nên lực hút của nam châm điện càng lớn."
      },
      {
       "stmt": "Áo len tự sinh ra nhiệt để sưởi ấm cho người mặc vào mùa lạnh.",
       "truth": false,
       "explain": "Sai. Áo len không sinh nhiệt. Nó dẫn nhiệt kém và giữ lớp không khí xốp, làm nhiệt cơ thể mất ra ngoài chậm hơn nên người mặc thấy ấm."
      },
      {
       "stmt": "Quai ba lô bản rộng làm áp suất lên vai nhỏ hơn quai hẹp khi cùng đeo một ba lô nặng như nhau.",
       "truth": true,
       "explain": "Đúng. Cùng một áp lực, diện tích bị ép càng lớn thì áp suất p = F/S càng nhỏ, nên vai đỡ đau hơn."
      },
      {
       "stmt": "Âm thanh truyền được trong chân không và còn truyền nhanh hơn trong không khí.",
       "truth": false,
       "explain": "Sai. Âm thanh cần môi trường vật chất để truyền và hoàn toàn không truyền được trong chân không."
      },
      {
       "stmt": "Quả bóng rơi tự do càng xuống thấp thì động năng của nó càng lớn.",
       "truth": true,
       "explain": "Đúng. Khi rơi, tốc độ của bóng tăng dần nên động năng tăng; đồng thời thế năng giảm vì độ cao giảm."
      },
      {
       "stmt": "Hai bóng đèn mắc song song trong nhà, nếu một bóng cháy thì bóng còn lại cũng tắt.",
       "truth": false,
       "explain": "Sai. Mỗi bóng song song là một nhánh riêng nối với nguồn điện, nên một bóng cháy không ảnh hưởng đến bóng còn lại."
      },
      {
       "stmt": "Thìa kim loại để trong cốc nước nóng sẽ nóng lên nhanh hơn thìa gỗ vì kim loại dẫn nhiệt tốt hơn gỗ.",
       "truth": true,
       "explain": "Đúng. Kim loại là vật dẫn nhiệt tốt, gỗ là vật dẫn nhiệt kém (cách nhiệt tốt hơn), nên cán thìa kim loại nhanh nóng hơn hẳn."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Luôn dự đoán kết quả trước, rồi mới tìm cơ chế: lực nào đang tác dụng, năng lượng nào đang chuyển hoá, dòng điện đi theo đường nào?",
      "Phân biệt các cặp dễ nhầm: nhiệt độ khác nội năng; dòng điện không bị bóng đèn \"dùng hết\"; áo len giữ nhiệt chứ không sinh nhiệt.",
      "Muốn kiểm chứng một dự đoán, thay đổi đúng một yếu tố và quan sát: hút hết không khí, đổi nối tiếp thành song song, thay đổi độ sâu hay diện tích bị ép.",
      "Câu có số liệu: viết công thức trước (v = s/t, I = U/R, D = m/V, p = F/S, M = F × d) rồi mới thay số và luôn kiểm tra đơn vị của đáp án."
     ],
     "facts": [
      {
       "q": "Vì sao trong chân không vật nặng và vật nhẹ rơi nhanh như nhau?",
       "a": "Vì không có sức cản không khí",
       "ex": "Ngoài không khí, vật nhẹ như lông chim bị sức cản không khí ảnh hưởng rất mạnh nên rơi chậm. Hút hết không khí, sức cản mất đi và mọi vật rơi cùng gia tốc."
      },
      {
       "q": "Dòng điện có bị bóng đèn \"dùng hết\" trong mạch nối tiếp không?",
       "a": "Không, cường độ vẫn bằng nhau khắp mạch",
       "ex": "Ampe kế mắc ở bất kì vị trí nào trong mạch nối tiếp đều cho cùng một số chỉ. Bóng đèn chuyển hoá năng lượng của dòng điện thành ánh sáng và nhiệt, không làm dòng điện yếu đi sau đèn."
      }
     ],
     "pairs": [
      [
       "Lực ma sát",
       "giúp má phanh làm xe dừng lại"
      ],
      [
       "Khúc xạ ánh sáng",
       "chiếc đũa trong nước trông gãy khúc"
      ],
      [
       "Nam châm điện",
       "ngắt điện là gần như mất từ tính"
      ],
      [
       "Mạch song song",
       "một đèn hỏng, đèn kia vẫn sáng"
      ],
      [
       "Thế năng",
       "chuyển thành động năng khi vật rơi"
      ],
      [
       "Áp suất",
       "nhỏ đi khi diện tích bị ép lớn lên"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-thcs-traidat",
    "emoji": "🪐",
    "name": "Trái Đất và vũ trụ",
    "sub": "Vì sao có mùa, Mặt Trăng đổi hình, hệ Mặt Trời quanh em",
    "pools": {
     "choose": [
      {
       "q": "Ở Việt Nam, mùa hè nắng nóng gay gắt. Nguyên nhân chính là gì?",
       "ans": "Nửa cầu Bắc ngả về phía Mặt Trời nhờ trục nghiêng",
       "wrong": [
        "Trái Đất ở gần Mặt Trời nhất trong năm",
        "Mặt Trời to ra vào mùa hè",
        "Gió mùa thổi hơi nóng từ xích đạo về"
       ],
       "ex": "Các mùa sinh ra do trục Trái Đất nghiêng và Trái Đất quay quanh Mặt Trời: khi nửa cầu Bắc ngả về phía Mặt Trời, nơi đó nhận nhiều ánh sáng và nhiệt hơn. Khoảng cách tới Mặt Trời thay đổi rất ít, không quyết định mùa."
      },
      {
       "q": "Một bạn nói: “Mùa đông lạnh vì Trái Đất ở xa Mặt Trời nhất”. Quan sát nào cho thấy cách giải thích đó sai?",
       "ans": "Khi Việt Nam mùa đông, nước Úc đang mùa hè",
       "wrong": [
        "Đo nhiệt độ ngoài trời vào mùa đông",
        "Xem lịch thấy mùa đông có ít ngày nắng",
        "Hỏi nhiều người xem họ có thấy lạnh không"
       ],
       "ex": "Nếu mùa do khoảng cách quyết định, cả Trái Đất phải cùng nóng hoặc cùng lạnh một lúc. Thực tế khi Bắc bán cầu là mùa đông thì Nam bán cầu đang là mùa hè, nên khoảng cách không thể là nguyên nhân của mùa."
      },
      {
       "q": "Tháng 1 ở Việt Nam trời lạnh, nhưng ở Úc học sinh đang nghỉ hè và tắm biển. Điều này chứng tỏ điều gì?",
       "ans": "Hai bán cầu có mùa ngược nhau",
       "wrong": [
        "Úc ở gần Mặt Trời hơn Việt Nam",
        "Úc không bao giờ có mùa đông",
        "Mặt Trời chỉ chiếu sáng nước Úc vào tháng 1"
       ],
       "ex": "Trục Trái Đất nghiêng nên khi nửa cầu Bắc ngả ra xa phía Mặt Trời (mùa đông ở Việt Nam) thì nửa cầu Nam ngả về phía Mặt Trời (mùa hè ở Úc): hai bán cầu luôn có mùa ngược nhau."
      },
      {
       "q": "Nếu trục Trái Đất không nghiêng mà đứng thẳng so với mặt phẳng quỹ đạo, điều gì xảy ra ở Việt Nam?",
       "ans": "Gần như không còn bốn mùa rõ rệt",
       "wrong": [
        "Trái Đất sẽ ngừng quay quanh Mặt Trời",
        "Ngày và đêm sẽ biến mất hoàn toàn",
        "Mặt Trăng sẽ không còn đổi hình nữa"
       ],
       "ex": "Chính độ nghiêng giữ nguyên hướng của trục trong khi Trái Đất đi quanh Mặt Trời làm lượng ánh sáng và nhiệt mỗi nơi nhận được thay đổi theo năm, tạo ra các mùa. Trục không nghiêng thì sự thay đổi đó gần như không còn."
      },
      {
       "q": "Sáng sớm em thấy Mặt Trời “mọc” ở phía đông. Thực ra thiên thể nào đang chuyển động tạo ra cảnh đó?",
       "ans": "Trái Đất tự quay từ tây sang đông",
       "wrong": [
        "Mặt Trời bay vòng quanh Trái Đất mỗi ngày",
        "Mặt Trăng đẩy Mặt Trời đi ngang bầu trời",
        "Các đám mây kéo Mặt Trời di chuyển"
       ],
       "ex": "Mặt Trời mọc và lặn là chuyển động nhìn thấy: Trái Đất tự quay quanh trục từ tây sang đông nên ta có cảm giác Mặt Trời đi ngang bầu trời theo chiều ngược lại, mọc ở phía đông và lặn ở phía tây."
      },
      {
       "q": "Vì sao cùng một lúc, ở Việt Nam là ban ngày còn ở phía bên kia Trái Đất là ban đêm?",
       "ans": "Chỉ nửa Trái Đất hướng về Mặt Trời được chiếu sáng",
       "wrong": [
        "Mặt Trời chỉ chiếu sáng được một nước một lúc",
        "Mặt Trăng che mất ánh sáng ở phía bên kia",
        "Nửa tối của Trái Đất tự tắt sáng đi"
       ],
       "ex": "Trái Đất là một khối cầu nên ánh sáng Mặt Trời chỉ tới được nửa đang hướng về phía nó; nửa còn lại khuất trong bóng tối là ban đêm. Trái Đất tự quay làm ngày và đêm luân phiên khắp nơi."
      },
      {
       "q": "Một ngày đêm dài 24 giờ. Con số đó gắn với chuyển động nào của Trái Đất?",
       "ans": "Trái Đất tự quay một vòng quanh trục",
       "wrong": [
        "Trái Đất quay một vòng quanh Mặt Trời",
        "Mặt Trăng quay một vòng quanh Trái Đất",
        "Mặt Trời tự quay một vòng quanh trục"
       ],
       "ex": "Một ngày đêm là thời gian để Trái Đất tự quay đúng một vòng quanh trục của nó, khoảng 24 giờ. Còn một vòng quanh Mặt Trời mất khoảng 365 ngày, tức là một năm."
      },
      {
       "q": "Đêm nào trời quang em cũng thấy Mặt Trăng đổi hình: tròn, nửa, lưỡi liềm. Vì sao vậy?",
       "ans": "Góc nhìn phần được chiếu sáng của Mặt Trăng thay đổi",
       "wrong": [
        "Mặt Trăng tự co giãn nên thay đổi hình dạng",
        "Bóng của Trái Đất che Mặt Trăng mỗi đêm",
        "Mây che Mặt Trăng theo những hình khác nhau"
       ],
       "ex": "Mặt Trăng luôn là một khối cầu và luôn có một nửa được Mặt Trời chiếu sáng. Khi Mặt Trăng đi quanh Trái Đất, ta nhìn nửa sáng đó ở các góc khác nhau nên thấy trăng tròn, trăng khuyết thay đổi dần — đó là các pha của Mặt Trăng."
      },
      {
       "q": "Bạn An nói Mặt Trăng tự phát sáng như một ngọn đèn. Bằng chứng nào cho thấy điều đó sai?",
       "ans": "Mặt Trăng có phần sáng, phần tối thay đổi theo vị trí",
       "wrong": [
        "Mặt Trăng ở rất xa Trái Đất",
        "Mặt Trăng nhỏ hơn Mặt Trời nhiều",
        "Ban ngày rất ít khi nhìn thấy Mặt Trăng"
       ],
       "ex": "Nếu tự phát sáng, Mặt Trăng phải luôn hiện tròn đầy và sáng cả mặt. Thực tế ta chỉ thấy phần được Mặt Trời chiếu sáng, phần còn lại tối hẳn — chứng tỏ ánh sáng của Mặt Trăng là ánh sáng Mặt Trời được phản chiếu lại."
      },
      {
       "q": "Đêm đầu tháng âm lịch gần như không thấy trăng. Lúc đó Mặt Trăng đang ở vị trí nào?",
       "ans": "Nằm giữa Mặt Trời và Trái Đất",
       "wrong": [
        "Nằm sau lưng Trái Đất so với Mặt Trời",
        "Bị Trái Đất che khuất hoàn toàn",
        "Bay ra xa khỏi hệ Mặt Trời"
       ],
       "ex": "Đầu tháng, Mặt Trăng nằm giữa Mặt Trời và Trái Đất: nửa hướng về Trái Đất là nửa không được chiếu sáng nên ta gần như không thấy trăng. Đó là pha trăng mới, còn gọi là trăng non."
      },
      {
       "q": "Đêm rằm, trăng tròn đầy. Vị trí của Mặt Trăng lúc đó như thế nào?",
       "ans": "Trái Đất nằm giữa Mặt Trời và Mặt Trăng",
       "wrong": [
        "Mặt Trăng nằm giữa Mặt Trời và Trái Đất",
        "Mặt Trăng ở gần Trái Đất nhất trong tháng",
        "Mặt Trăng quay mặt sáng nhất về Trái Đất"
       ],
       "ex": "Ngày rằm, Trái Đất nằm giữa Mặt Trời và Mặt Trăng nên ta nhìn đúng nửa Mặt Trăng đang được chiếu sáng, thấy trăng tròn đầy. Đây cũng là vị trí có thể xảy ra nguyệt thực."
      },
      {
       "q": "Nhật thực xảy ra khi nào?",
       "ans": "Mặt Trăng che khuất Mặt Trời với người trên Trái Đất",
       "wrong": [
        "Trái Đất che khuất Mặt Trời trên bầu trời",
        "Mặt Trời tự tắt sáng trong vài phút",
        "Một đám mây đen rất dày che kín Mặt Trời"
       ],
       "ex": "Nhật thực xảy ra vào ban ngày, khi Mặt Trăng đi vào giữa Mặt Trời và Trái Đất: bóng của Mặt Trăng đổ lên Trái Đất làm Mặt Trời bị che khuất một phần hoặc toàn phần ở một số nơi."
      },
      {
       "q": "Nguyệt thực khác nhật thực ở điểm nào?",
       "ans": "Trái Đất nằm giữa, bóng Trái Đất che Mặt Trăng",
       "wrong": [
        "Mặt Trăng tự tắt sáng vào ban đêm",
        "Mặt Trăng nằm giữa Mặt Trời và Trái Đất",
        "Chỉ nhìn thấy nguyệt thực bằng kính thiên văn"
       ],
       "ex": "Nguyệt thực xảy ra vào đêm rằm: Trái Đất nằm giữa Mặt Trời và Mặt Trăng, bóng của Trái Đất phủ lên Mặt Trăng làm trăng tối đi, có khi ngả màu đỏ sẫm. Nguyệt thực nhìn bằng mắt thường là an toàn."
      },
      {
       "q": "Vì sao không phải tháng nào cũng có nhật thực và nguyệt thực?",
       "ans": "Quỹ đạo Mặt Trăng nghiêng so với quỹ đạo Trái Đất",
       "wrong": [
        "Mặt Trăng đôi khi không bay qua trước Mặt Trời",
        "Bóng của Mặt Trăng thường quá nhỏ để thấy",
        "Mây che mất hầu hết các lần che khuất"
       ],
       "ex": "Quỹ đạo của Mặt Trăng quanh Trái Đất nghiêng một góc so với mặt phẳng quỹ đạo của Trái Đất quanh Mặt Trời, nên ba thiên thể chỉ thẳng hàng vào một số thời điểm nhất định trong năm, khi đó mới có nhật thực hoặc nguyệt thực."
      },
      {
       "q": "Nhìn bầu trời đêm, làm sao phân biệt một hành tinh với một ngôi sao ở xa?",
       "ans": "Hành tinh sáng đều, ít nhấp nháy hơn sao",
       "wrong": [
        "Hành tinh luôn trông to hơn mọi ngôi sao",
        "Sao đứng yên còn hành tinh thì nhấp nháy",
        "Hành tinh có màu đỏ còn sao có màu trắng"
       ],
       "ex": "Các sao ở rất xa, ánh sáng tới mắt gần như từ một điểm nên dễ nhấp nháy do khí quyển xáo động. Hành tinh ở gần hơn nhiều, hiện như một đĩa sáng nhỏ nên ánh sáng ổn định, ít nhấp nháy hơn."
      },
      {
       "q": "Vì sao các ngôi sao trông chỉ như chấm sáng nhỏ, dù nhiều sao to hơn Mặt Trời rất nhiều?",
       "ans": "Vì các sao ở cách chúng ta vô cùng xa",
       "wrong": [
        "Vì các sao thật ra đều nhỏ hơn Mặt Trời",
        "Vì ánh sáng sao bị Mặt Trăng che bớt",
        "Vì ban đêm mắt người nhìn vật nhỏ đi"
       ],
       "ex": "Vật ở càng xa trông càng nhỏ: các sao ở cách ta hàng năm ánh sáng nên chỉ còn là những chấm sáng, dù nhiều sao có kích thước và độ sáng thật còn lớn hơn Mặt Trời."
      },
      {
       "q": "Một vệt sáng vụt qua bầu trời đêm — “sao băng” — thực chất là gì?",
       "ans": "Mẩu đá nhỏ cháy sáng khi lao vào khí quyển",
       "wrong": [
        "Một ngôi sao rơi xuống Trái Đất",
        "Mảnh vỡ của Mặt Trăng rơi xuống",
        "Đốm sáng do máy bay để lại trên trời"
       ],
       "ex": "Sao băng không phải là sao rơi: đó là những mẩu đá và bụi vũ trụ nhỏ lao vào khí quyển Trái Đất với tốc độ rất lớn; ma sát với không khí làm chúng nóng lên, cháy và phát sáng thành một vệt."
      },
      {
       "q": "Ánh sáng Mặt Trời mất khoảng bao lâu để đi tới Trái Đất?",
       "ans": "Khoảng 8 phút",
       "wrong": [
        "Khoảng 8 giây",
        "Khoảng 8 giờ",
        "Khoảng 1 giây"
       ],
       "ex": "Mặt Trời cách Trái Đất khoảng 150 triệu km; ánh sáng đi khoảng 300 000 km trong một giây nên mất chừng 8 phút mới tới nơi. Nghĩa là ta luôn nhìn thấy Mặt Trời của “khoảng 8 phút trước”."
      },
      {
       "q": "“Một năm ánh sáng” là gì?",
       "ans": "Quãng đường ánh sáng đi được trong một năm",
       "wrong": [
        "Thời gian ánh sáng đi từ Mặt Trời tới Trái Đất",
        "Khoảng cách từ Trái Đất tới Mặt Trăng",
        "Tốc độ của ánh sáng trong một giây"
       ],
       "ex": "Năm ánh sáng là đơn vị đo khoảng cách, không phải đo thời gian: đó là quãng đường ánh sáng đi được trong một năm, khoảng 9 460 tỉ km. Người ta dùng nó để đo những khoảng cách vũ trụ khổng lồ."
      },
      {
       "q": "Từ năm 2006, Sao Diêm Vương không còn được tính là hành tinh. Hệ Mặt Trời còn bao nhiêu hành tinh?",
       "ans": "8 hành tinh",
       "wrong": [
        "9 hành tinh",
        "7 hành tinh",
        "10 hành tinh"
       ],
       "ex": "Năm 2006 Hiệp hội Thiên văn Quốc tế xếp Sao Diêm Vương vào nhóm hành tinh lùn, nên hệ Mặt Trời có 8 hành tinh: Sao Thuỷ, Sao Kim, Trái Đất, Sao Hoả, Sao Mộc, Sao Thổ, Sao Thiên Vương và Sao Hải Vương."
      },
      {
       "q": "Trái Đất quay quanh Mặt Trời một vòng mất bao lâu, và con số đó gắn với điều gì?",
       "ans": "Khoảng một năm, gắn với sự nối tiếp các mùa",
       "wrong": [
        "Khoảng một tháng, tạo ra các pha của Mặt Trăng",
        "Khoảng một ngày, tạo ra ngày và đêm",
        "Khoảng một tuần, tạo ra các ngày trong tuần"
       ],
       "ex": "Trái Đất đi một vòng quanh Mặt Trời mất khoảng 365 ngày, tức một năm. Kết hợp với trục Trái Đất nghiêng, chuyển động này làm các mùa nối tiếp nhau trong năm."
      },
      {
       "q": "“Sao Mai” sáng rực lúc gần sáng và “sao Hôm” lúc chập tối thực chất là thiên thể nào?",
       "ans": "Kim tinh — một hành tinh phản chiếu ánh sáng Mặt Trời",
       "wrong": [
        "Ngôi sao sáng nhất trên bầu trời đêm",
        "Mảnh vỡ phát sáng của Mặt Trăng",
        "Vệ tinh nhân tạo lớn nhất của Trái Đất"
       ],
       "ex": "Sao Mai và sao Hôm là cùng một thiên thể: Sao Kim (Kim tinh), một hành tinh trong hệ Mặt Trời. Nó không tự phát sáng mà phản chiếu mạnh ánh sáng Mặt Trời, và chỉ thấy gần chân trời lúc bình minh hoặc hoàng hôn."
      },
      {
       "q": "Vì sao người trên Trái Đất luôn chỉ nhìn thấy cùng một mặt của Mặt Trăng?",
       "ans": "Mặt Trăng tự quay khớp với vòng quay quanh Trái Đất",
       "wrong": [
        "Mặt Trăng không hề tự quay quanh trục",
        "Nửa kia của Mặt Trăng luôn bị mây che",
        "Mặt Trăng quay mặt tối về phía Trái Đất"
       ],
       "ex": "Mặt Trăng tự quay quanh trục trong đúng thời gian nó đi một vòng quanh Trái Đất (khoảng 27,3 ngày), nên cùng một phía của nó luôn hướng về Trái Đất. Mặt phía xa chỉ được chụp ảnh bằng tàu vũ trụ."
      },
      {
       "q": "Ở Việt Nam, khoảng tháng 6 ngày dài hơn đêm, khoảng tháng 12 thì ngược lại. Vì sao?",
       "ans": "Trục nghiêng làm nửa cầu Bắc nhận sáng lâu hơn vào tháng 6",
       "wrong": [
        "Tháng 6 Mặt Trời ở gần Trái Đất hơn hẳn",
        "Tháng 12 Mặt Trăng che Mặt Trời lâu hơn",
        "Tháng 6 Trái Đất tự quay nhanh hơn tháng 12"
       ],
       "ex": "Do trục nghiêng, khoảng tháng 6 nửa cầu Bắc ngả về phía Mặt Trời: Mặt Trời ở trên đường chân trời lâu hơn nên ngày dài hơn đêm và trời nóng — đó là mùa hè. Khoảng tháng 12 thì ngược lại, là mùa đông."
      },
      {
       "q": "Muốn xem nhật thực một cách an toàn, em cần làm gì?",
       "ans": "Dùng kính lọc chuyên dụng để xem nhật thực",
       "wrong": [
        "Nhìn thẳng lâu để mắt quen dần với sáng",
        "Dùng kính râm thường đeo khi đi nắng",
        "Đeo chồng hai chiếc kính râm lên nhau"
       ],
       "ex": "Ánh sáng Mặt Trời rất mạnh: nhìn trực tiếp, kể cả khi Mặt Trời bị che một phần, cũng có thể làm hỏng mắt. Chỉ xem nhật thực bằng kính lọc chuyên dụng hoặc xem gián tiếp qua ảnh chiếu bằng lỗ nhỏ; kính râm thường không đủ bảo vệ."
      },
      {
       "q": "Trên trạm vũ trụ bay quanh Trái Đất, phi hành gia “trôi” lơ lửng trong khoang. Vì sao?",
       "ans": "Trạm và người cùng rơi tự do quanh Trái Đất",
       "wrong": [
        "Trên trạm vũ trụ không còn lực hấp dẫn",
        "Trạm ở ngoài khí quyển nên hết trọng lực",
        "Không khí trong khoang đẩy người ta lên"
       ],
       "ex": "Ở độ cao của trạm vũ trụ, lực hấp dẫn của Trái Đất vẫn còn rất mạnh. Trạm và phi hành gia cùng rơi tự do liên tục quanh Trái Đất nên mọi vật trong khoang có cảm giác không trọng lượng và trôi lơ lửng."
      }
     ],
     "blank": [
      {
       "ans": "tự quay",
       "wrong": [
        "quay quanh Mặt Trời",
        "đứng yên",
        "quay quanh Mặt Trăng"
       ],
       "ex": "Trái Đất tự quay quanh trục từ tây sang đông, mỗi vòng khoảng 24 giờ: nơi đang hướng về Mặt Trời là ban ngày, nơi khuất đi là ban đêm.",
       "pre": "Hiện tượng ngày và đêm lặp lại là do Trái Đất ",
       "post": " quanh trục của nó."
      },
      {
       "ans": "vệ tinh",
       "wrong": [
        "hành tinh",
        "ngôi sao",
        "thiên thạch"
       ],
       "ex": "Mặt Trăng là vệ tinh tự nhiên của Trái Đất: nó quay quanh Trái Đất và không tự phát sáng, chỉ phản chiếu ánh sáng Mặt Trời.",
       "pre": "Mặt Trăng là ",
       "post": " tự nhiên duy nhất của Trái Đất."
      },
      {
       "ans": "Mặt Trời",
       "wrong": [
        "Trái Đất",
        "Mặt Trăng",
        "Sao Mộc"
       ],
       "ex": "Mặt Trời là ngôi sao ở trung tâm hệ Mặt Trời; cả 8 hành tinh, trong đó có Trái Đất, đều quay quanh Mặt Trời.",
       "pre": "Mọi hành tinh trong hệ Mặt Trời đều quay quanh thiên thể ở trung tâm là ",
       "post": "."
      },
      {
       "ans": "150",
       "wrong": [
        "15",
        "1 500",
        "384"
       ],
       "ex": "Khoảng cách trung bình từ Trái Đất tới Mặt Trời khoảng 150 triệu km — ánh sáng đi mất khoảng 8 phút. Con số 384 là khoảng cách tới Mặt Trăng tính bằng nghìn km.",
       "pre": "Mặt Trời cách Trái Đất khoảng ",
       "post": " triệu km."
      },
      {
       "ans": "nhật thực",
       "wrong": [
        "nguyệt thực",
        "sao băng",
        "trăng rằm"
       ],
       "ex": "Nhật thực xảy ra ban ngày khi Mặt Trăng nằm giữa Mặt Trời và Trái Đất. Ngược lại, khi bóng Trái Đất che Mặt Trăng vào đêm rằm thì gọi là nguyệt thực.",
       "pre": "Hiện tượng Mặt Trăng đi vào giữa, che khuất Mặt Trời gọi là ",
       "post": "."
      },
      {
       "ans": "Ngân Hà",
       "wrong": [
        "Sao Chổi",
        "Tinh vân",
        "Chòm sao"
       ],
       "ex": "Ngân Hà là thiên hà chứa hệ Mặt Trời cùng hàng trăm tỉ ngôi sao khác. Những đêm trời quang, ở nơi tối, ta có thể thấy một dải sáng mờ vắt ngang bầu trời — đó là một phần của Ngân Hà.",
       "pre": "Hệ Mặt Trời của chúng ta nằm trong một thiên hà gọi là ",
       "post": "."
      },
      {
       "ans": "toàn bộ",
       "wrong": [
        "một nửa",
        "một phần tư",
        "rất ít"
       ],
       "ex": "Đêm rằm Trái Đất nằm giữa Mặt Trời và Mặt Trăng, nên cả phần Mặt Trăng hướng về ta đều nằm trong vùng được chiếu sáng — ta thấy trăng tròn.",
       "pre": "Đêm rằm, phần Mặt Trăng hướng về Trái Đất được Mặt Trời chiếu sáng ",
       "post": "."
      },
      {
       "ans": "elip",
       "wrong": [
        "vuông",
        "tam giác",
        "đường thẳng"
       ],
       "ex": "Quỹ đạo của Trái Đất quanh Mặt Trời là một elip rất gần hình tròn, nên khoảng cách tới Mặt Trời thay đổi rất ít trong năm — thêm một bằng chứng mùa không do khoảng cách gây ra.",
       "pre": "Trái Đất quay quanh Mặt Trời theo một quỹ đạo gần giống hình ",
       "post": "."
      },
      {
       "ans": "phản chiếu",
       "wrong": [
        "tự phát ra",
        "hấp thụ hết",
        "che khuất"
       ],
       "ex": "Sao tự phát sáng nhờ các phản ứng trong lòng nó; hành tinh không tự phát sáng, ta thấy chúng vì chúng phản chiếu ánh sáng của Mặt Trời — Mặt Trăng cũng vậy.",
       "pre": "Ngôi sao tự phát sáng, còn hành tinh chỉ ",
       "post": " ánh sáng của ngôi sao."
      },
      {
       "ans": "nghiêng",
       "wrong": [
        "thẳng đứng",
        "quay ngược",
        "đổi hướng liên tục"
       ],
       "ex": "Trục Trái Đất nghiêng và luôn hướng về cùng một phía trong khi Trái Đất đi quanh Mặt Trời, nên khi thì nửa cầu Bắc, khi thì nửa cầu Nam ngả về phía Mặt Trời — sinh ra các mùa.",
       "pre": "Các mùa thay đổi chủ yếu do trục Trái Đất ",
       "post": " và giữ nguyên hướng khi quay quanh Mặt Trời."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Mặt Trời mọc ở phía đông, lặn ở phía tây là chuyển động nhìn thấy do Trái Đất tự quay.",
       "truth": true,
       "explain": "Đúng. Trái Đất tự quay quanh trục từ tây sang đông; người trên Trái Đất thấy Mặt Trời như di chuyển ngược lại, mọc ở đông và lặn ở tây."
      },
      {
       "stmt": "Mùa hè ở Việt Nam nóng vì lúc đó Trái Đất ở gần Mặt Trời nhất trong năm.",
       "truth": false,
       "explain": "Sai. Các mùa do trục Trái Đất nghiêng gây ra: mùa hè là khi nửa cầu Bắc ngả về phía Mặt Trời nên nhận nhiều ánh sáng và nhiệt hơn, không phải do Trái Đất ở gần Mặt Trời hơn."
      },
      {
       "stmt": "Ánh sáng ta thấy từ Mặt Trăng là ánh sáng Mặt Trời do Mặt Trăng phản chiếu lại.",
       "truth": true,
       "explain": "Đúng. Mặt Trăng không tự phát sáng; phần ta thấy sáng là phần bề mặt của nó đang được Mặt Trời chiếu sáng và phản chiếu ánh sáng về phía ta."
      },
      {
       "stmt": "Sao băng là một ngôi sao trên bầu trời rơi xuống Trái Đất.",
       "truth": false,
       "explain": "Sai. Sao băng là mẩu đá hoặc bụi vũ trụ nhỏ lao vào khí quyển, bị ma sát làm nóng cháy và phát sáng thành vệt; các ngôi sao thật ở rất xa và không “rơi” như vậy."
      },
      {
       "stmt": "Nguyệt thực chỉ có thể xảy ra vào đêm trăng tròn (ngày rằm).",
       "truth": true,
       "explain": "Đúng. Nguyệt thực cần Trái Đất nằm giữa Mặt Trời và Mặt Trăng để bóng Trái Đất phủ lên Mặt Trăng — đúng vị trí của trăng rằm."
      },
      {
       "stmt": "Nhật thực xảy ra vào ban đêm, khi Mặt Trăng ở pha tối nhất.",
       "truth": false,
       "explain": "Sai. Nhật thực xảy ra vào ban ngày, khi Mặt Trăng nằm giữa Mặt Trời và Trái Đất và che khuất Mặt Trời đối với người ở một số nơi trên Trái Đất."
      },
      {
       "stmt": "Khi Việt Nam đang là mùa hè thì nước Úc ở Nam bán cầu đang là mùa đông.",
       "truth": true,
       "explain": "Đúng. Do trục Trái Đất nghiêng, hai bán cầu nhận ánh sáng ngược nhau: nửa cầu Bắc ngả về Mặt Trời (mùa hè) thì nửa cầu Nam ngả ra xa (mùa đông)."
      },
      {
       "stmt": "Mặt Trăng tự phát sáng như một bóng đèn nên đêm nào nó cũng sáng tròn đầy.",
       "truth": false,
       "explain": "Sai. Mặt Trăng không tự phát sáng; ta chỉ thấy phần được Mặt Trời chiếu sáng, nên hình dạng phần sáng thay đổi theo vị trí của nó — có đêm tròn, có đêm khuyết, có đêm gần như không thấy."
      },
      {
       "stmt": "“Năm ánh sáng” là đơn vị đo khoảng cách trong vũ trụ, không phải đơn vị đo thời gian.",
       "truth": true,
       "explain": "Đúng. Một năm ánh sáng là quãng đường ánh sáng đi được trong một năm, khoảng 9 460 tỉ km — dùng để đo khoảng cách giữa các sao và thiên hà."
      },
      {
       "stmt": "Các hành tinh tự phát ra ánh sáng giống như các ngôi sao.",
       "truth": false,
       "explain": "Sai. Hành tinh không tự phát sáng; ta nhìn thấy chúng nhờ ánh sáng Mặt Trời phản chiếu trên bề mặt của chúng, giống như cách ta thấy Mặt Trăng."
      },
      {
       "stmt": "Từ Trái Đất, ta luôn nhìn thấy cùng một mặt của Mặt Trăng.",
       "truth": true,
       "explain": "Đúng. Mặt Trăng tự quay quanh trục trong đúng thời gian nó đi một vòng quanh Trái Đất, nên cùng một phía của nó luôn hướng về Trái Đất."
      },
      {
       "stmt": "Tháng nào cũng có cả nhật thực và nguyệt thực.",
       "truth": false,
       "explain": "Sai. Quỹ đạo Mặt Trăng nghiêng so với quỹ đạo Trái Đất, nên Mặt Trời – Trái Đất – Mặt Trăng chỉ thẳng hàng vào một số thời điểm trong năm; không phải tháng nào cũng có nhật thực hay nguyệt thực."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Gặp một hiện tượng trên trời, hãy hỏi trước: thiên thể nào đang chuyển động thật, và ta đang nhìn nó từ đâu? Rất nhiều điều “nhìn thấy” (Mặt Trời mọc, trăng đổi hình) là do vị trí và góc nhìn của người quan sát trên Trái Đất.",
      "Phá hiểu lầm về mùa: kiểm tra bằng bán cầu còn lại. Nếu một cách giải thích đúng cho Việt Nam nhưng sai cho nước Úc (đang mùa ngược lại) thì cách giải thích đó chưa đúng — mùa do trục nghiêng, không do khoảng cách.",
      "Muốn biết một thiên thể có tự phát sáng không, hãy xem nó có phần tối hay không: Mặt Trăng và các hành tinh có phần sáng — phần tối thay đổi, còn các sao luôn là nguồn sáng tự phát.",
      "Vũ trụ rất rộng: ánh sáng nhanh nhất cũng mất khoảng 8 phút từ Mặt Trời tới Trái Đất, nên người ta đo khoảng cách vũ trụ bằng năm ánh sáng — là quãng đường, không phải thời gian."
     ],
     "facts": [
      {
       "q": "Vì sao Việt Nam có bốn mùa thay đổi trong năm?",
       "a": "Do trục Trái Đất nghiêng khi quay quanh Mặt Trời",
       "ex": "Trục nghiêng giữ nguyên hướng trong lúc Trái Đất đi quanh Mặt Trời làm từng bán cầu lần lượt ngả về phía Mặt Trời, nhận nhiều ánh sáng và nhiệt hơn — sinh ra mùa. Bằng chứng: hai bán cầu luôn có mùa ngược nhau."
      },
      {
       "q": "Vì sao Mặt Trăng đêm tròn, đêm khuyết?",
       "a": "Do ta nhìn phần được chiếu sáng ở các góc khác nhau",
       "ex": "Một nửa Mặt Trăng luôn được Mặt Trời chiếu sáng; khi Mặt Trăng đi quanh Trái Đất, góc nhìn của ta với nửa sáng đó thay đổi dần nên thấy các pha trăng: non, lưỡi liềm, bán nguyệt, tròn."
      }
     ],
     "pairs": [
      [
       "Mặt Trời",
       "ngôi sao ở trung tâm hệ Mặt Trời"
      ],
      [
       "Mặt Trăng",
       "vệ tinh tự nhiên của Trái Đất"
      ],
      [
       "Nhật thực",
       "Mặt Trăng che khuất Mặt Trời"
      ],
      [
       "Nguyệt thực",
       "bóng Trái Đất che Mặt Trăng"
      ],
      [
       "Sao băng",
       "mẩu đá cháy sáng trong khí quyển"
      ],
      [
       "Năm ánh sáng",
       "đơn vị đo khoảng cách vũ trụ"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-thcs-susong",
    "emoji": "🧬",
    "name": "Sự sống và cơ thể người",
    "sub": "Tế bào, cơ thể em và thế giới sống vận hành thế nào",
    "pools": {
     "choose": [
      {
       "q": "Khi chạy nhanh, tim đập nhanh và mạnh hơn chủ yếu vì sao?",
       "ans": "Cơ cần thêm oxygen và năng lượng",
       "wrong": [
        "Tim tự nóng lên nên đập nhanh hơn",
        "Máu cần loãng ra để chảy nhanh hơn",
        "Phổi ngừng hoạt động khi đang chạy"
       ],
       "ex": "Khi vận động mạnh, tế bào cơ hô hấp mạnh hơn, cần nhiều oxygen và chất dinh dưỡng, đồng thời thải nhiều carbon dioxide. Tim tăng nhịp và lực co để máu vận chuyển kịp nhu cầu đó."
      },
      {
       "q": "Vì sao lá cây thường có màu xanh còn rễ mọc dưới đất thường trắng?",
       "ans": "Lá có diệp lục, rễ không có diệp lục",
       "wrong": [
        "Rễ bị lớp đất nhuộm thành màu trắng",
        "Lá được ánh nắng sơn thành màu xanh",
        "Rễ chứa rất nhiều tinh bột màu trắng"
       ],
       "ex": "Lá chứa nhiều lục lạp có diệp lục để quang hợp nên có màu xanh. Rễ nằm trong đất, không nhận ánh sáng và không có diệp lục nên thường trắng hoặc vàng nhạt."
      },
      {
       "q": "Một bạn nói: nấm mọc trên đất, không di chuyển nên nấm là thực vật. Vì sao kết luận này sai?",
       "ans": "Nấm không quang hợp, phải lấy thức ăn sẵn",
       "wrong": [
        "Nấm thuộc nhóm động vật bậc thấp",
        "Nấm có rễ, thân, lá như thực vật",
        "Nấm quang hợp mạnh hơn cây xanh"
       ],
       "ex": "Nấm không có diệp lục, không quang hợp được. Nấm lấy chất hữu cơ có sẵn từ xác sinh vật hoặc vật chủ, nên nấm thuộc một nhóm riêng, không phải thực vật."
      },
      {
       "q": "Vì sao virus không được coi là một tế bào sống hoàn chỉnh?",
       "ans": "Virus không có cấu tạo tế bào",
       "wrong": [
        "Virus có nhân và màng tế bào đầy đủ",
        "Virus tự quang hợp để tạo thức ăn",
        "Virus tự bơi được như vi khuẩn"
       ],
       "ex": "Virus chỉ gồm vật chất di truyền bao trong vỏ protein, không có màng tế bào, tế bào chất và các bào quan như một tế bào. Virus chỉ nhân lên được khi ở trong tế bào chủ."
      },
      {
       "q": "Một vết xước nhỏ trên da vài ngày đã liền lại. Quá trình nào ở tế bào giúp tạo ra phần da mới?",
       "ans": "Tế bào phân chia tạo tế bào mới",
       "wrong": [
        "Tế bào da tự phồng to mãi không ngừng",
        "Da mới được đưa từ thức ăn vào thẳng",
        "Tế bào chết tự sống lại để lấp vết xước"
       ],
       "ex": "Tế bào ở mép vết thương lớn lên và phân chia, tạo tế bào mới thay thế các tế bào đã mất, nhờ đó vết thương dần liền lại."
      },
      {
       "q": "Đặt một chậu cây xanh trong hộp tối kín vài tuần, cây dần vàng và yếu đi. Nguyên nhân chính là gì?",
       "ans": "Thiếu ánh sáng nên không quang hợp được",
       "wrong": [
        "Cây không cần ánh sáng, chỉ cần đất màu",
        "Trong tối cây hô hấp mạnh gấp trăm lần",
        "Hộp tối làm rễ cây ngừng hút nước ngay"
       ],
       "ex": "Không có ánh sáng, lá không quang hợp để tạo chất hữu cơ nuôi cây. Cây phải dùng dần chất dự trữ trong khi hô hấp vẫn tiếp diễn, nên cây yếu và vàng dần."
      },
      {
       "q": "Chạm nhẹ vào lá cây trinh nữ, lá lập tức cụp lại. Hiện tượng này cho thấy cây có tính chất nào?",
       "ans": "Cảm ứng với kích thích từ môi trường",
       "wrong": [
        "Cây biết sợ như động vật có thần kinh",
        "Lá cụp lại để quang hợp tốt hơn",
        "Cây đang sinh sản hữu tính bằng lá"
       ],
       "ex": "Cụp lá khi bị chạm là phản ứng cảm ứng của cây trước kích thích cơ học. Cây không có hệ thần kinh; phản ứng này do thay đổi sức trương nước trong tế bào ở gốc lá."
      },
      {
       "q": "Trong chuỗi thức ăn cỏ → châu chấu → ếch → rắn, nếu ếch bị giảm mạnh thì điều gì dễ xảy ra nhất?",
       "ans": "Châu chấu tăng, rắn thiếu thức ăn",
       "wrong": [
        "Cỏ tăng vì không còn sinh vật nào ăn",
        "Rắn chuyển sang tự quang hợp để sống",
        "Châu chấu giảm vì mất ếch bảo vệ"
       ],
       "ex": "Ếch ăn châu chấu và là thức ăn của rắn. Mất ếch, châu chấu bớt bị ăn nên tăng lên và ăn nhiều cỏ hơn, còn rắn mất nguồn thức ăn nên giảm theo."
      },
      {
       "q": "Một lưới thức ăn có nhiều loài và nhiều mối ăn nhau thường bền vững hơn một chuỗi thức ăn đơn lẻ vì sao?",
       "ans": "Mất một loài vẫn còn nguồn thức ăn khác",
       "wrong": [
        "Nhiều loài thì không loài nào cần ăn nữa",
        "Lưới thức ăn làm năng lượng tự tăng lên",
        "Mọi loài trong lưới đều ăn được mọi loài"
       ],
       "ex": "Trong lưới thức ăn, mỗi loài thường có nhiều nguồn thức ăn và nhiều kẻ thù tự nhiên. Nếu một loài giảm, các loài còn lại vẫn tìm được thức ăn khác nên hệ sinh thái ít bị sụp đổ hơn."
      },
      {
       "q": "Ở đậu Hà Lan, hạt vàng (A) trội hoàn toàn so với hạt xanh (a). Lai hai cây hạt vàng dị hợp Aa × Aa. Tỉ lệ kiểu hình ở đời con là bao nhiêu?",
       "ans": "3 hạt vàng : 1 hạt xanh",
       "wrong": [
        "1 hạt vàng : 1 hạt xanh",
        "Toàn bộ đều là hạt vàng",
        "1 hạt vàng : 3 hạt xanh"
       ],
       "ex": "Aa × Aa cho tỉ lệ kiểu gene 1 AA : 2 Aa : 1 aa. AA và Aa đều biểu hiện hạt vàng, chỉ aa cho hạt xanh, nên tỉ lệ kiểu hình là 3 vàng : 1 xanh."
      },
      {
       "q": "Ở đậu Hà Lan, hạt vàng (A) trội hoàn toàn so với hạt xanh (a). Muốn biết chắc một cây hạt vàng là AA hay Aa, cách làm chắc nhất là lai cây đó với cây nào?",
       "ans": "Cây hạt xanh có kiểu gene aa",
       "wrong": [
        "Cây hạt vàng thuần chủng AA",
        "Cây hạt vàng dị hợp Aa khác",
        "Cây có hoa tím thuần chủng"
       ],
       "ex": "Đây là phép lai phân tích: lai với kiểu gene đồng hợp lặn aa. Nếu cây cần kiểm tra là Aa, đời con sẽ xuất hiện hạt xanh; nếu là AA, đời con toàn hạt vàng. Lai với AA thì đời con luôn vàng nên không phân biệt được."
      },
      {
       "q": "Vì sao nguyên phân giúp cơ thể lớn lên nhưng vẫn giữ nguyên đặc điểm di truyền của tế bào mẹ?",
       "ans": "Tế bào con có bộ nhiễm sắc thể giống mẹ",
       "wrong": [
        "Tế bào con chỉ nhận một nửa bộ gene",
        "Mỗi lần phân chia gene tự thay đổi hết",
        "Tế bào con không chứa nhiễm sắc thể"
       ],
       "ex": "Trước nguyên phân, nhiễm sắc thể nhân đôi rồi phân li đều cho hai tế bào con, nên mỗi tế bào con có bộ nhiễm sắc thể giống hệt tế bào mẹ."
      },
      {
       "q": "Vì sao tỉ lệ sinh con trai và con gái trong tự nhiên xấp xỉ 1 : 1?",
       "ans": "Tinh trùng mang X và mang Y gần bằng nhau",
       "wrong": [
        "Mẹ quyết định hoàn toàn giới tính con",
        "Trứng mang cả X và Y như tinh trùng",
        "Môi trường sống chọn sẵn giới tính thai"
       ],
       "ex": "Mẹ chỉ cho trứng mang X. Bố cho hai loại tinh trùng mang X và mang Y với số lượng gần bằng nhau: XX thành con gái, XY thành con trai, nên tỉ lệ xấp xỉ 1 : 1."
      },
      {
       "q": "Bạn B nói tiến hoá là 'một con khỉ ngày nay biến thành người'. Cách hiểu đúng theo khoa học là gì?",
       "ans": "Người và khỉ có tổ tiên chung",
       "wrong": [
        "Khỉ ngày nay sẽ biến hết thành người",
        "Người là loài tiến hoá cao nhất tuyệt đối",
        "Mỗi cá thể tự biến đổi thành loài mới"
       ],
       "ex": "Tiến hoá diễn ra ở cấp quần thể qua nhiều thế hệ nhờ biến dị di truyền và chọn lọc tự nhiên. Người và các loài khỉ, vượn ngày nay cùng bắt nguồn từ một tổ tiên chung, không phải loài này biến thành loài kia."
      },
      {
       "q": "Trên thân cây xanh, sâu màu xanh ít bị chim ăn hơn sâu màu nâu. Qua nhiều thế hệ, sâu xanh trở nên phổ biến. Đây là ví dụ của quá trình nào?",
       "ans": "Chọn lọc tự nhiên giữ lại biến dị có lợi",
       "wrong": [
        "Sâu tự nhuộm xanh theo màu thân cây",
        "Chim dạy sâu cách đổi màu để sống sót",
        "Mọi sâu đều biến đổi giống hệt nhau"
       ],
       "ex": "Sâu xanh ngụy trang tốt hơn nên sống sót và sinh sản nhiều hơn, truyền lại đặc điểm màu xanh cho đời sau. Đây là chọn lọc tự nhiên, không phải từng cá thể tự đổi màu theo ý muốn."
      },
      {
       "q": "Nhai cơm trắng thật lâu, em thấy có vị ngọt nhẹ. Vì sao?",
       "ans": "Enzyme nước bọt biến tinh bột thành đường",
       "wrong": [
        "Cơm tự lên men thành đường trong miệng",
        "Răng nghiền cơm làm đường tự sinh ra",
        "Nước bọt vốn chứa rất nhiều đường ngọt"
       ],
       "ex": "Trong nước bọt có enzyme amylase, bắt đầu tiêu hoá hoá học tinh bột thành đường ngay trong miệng, nên nhai cơm lâu sẽ thấy vị ngọt nhẹ."
      },
      {
       "q": "Khi leo cầu thang nhanh, em thở gấp và sâu hơn. Cơ thể làm vậy để đáp ứng nhu cầu nào?",
       "ans": "Lấy thêm oxygen, thải carbon dioxide",
       "wrong": [
        "Làm mát phổi bằng không khí bên ngoài",
        "Đưa thức ăn từ dạ dày lên nhanh hơn",
        "Giảm lượng oxygen trong máu xuống"
       ],
       "ex": "Vận động làm tế bào hô hấp mạnh hơn, dùng nhiều oxygen và tạo nhiều carbon dioxide. Tăng nhịp thở và độ sâu hô hấp giúp trao đổi khí kịp với nhu cầu của cơ thể."
      },
      {
       "q": "Ngày nóng, ít uống nước, nước tiểu thường ít và vàng đậm hơn. Điều này cho thấy thận đang làm gì?",
       "ans": "Giữ lại nước để cân bằng môi trường trong",
       "wrong": [
        "Ngừng lọc máu hoàn toàn khi trời nóng",
        "Thải hết nước ra để cơ thể mát hơn",
        "Tạo thêm nước tiểu loãng để dự trữ"
       ],
       "ex": "Khi cơ thể thiếu nước, thận tăng tái hấp thu nước nên lượng nước tiểu giảm và nước tiểu cô đặc hơn. Đây là cơ chế điều hoà môi trường trong của cơ thể."
      },
      {
       "q": "Vừa chạm tay vào vật rất nóng, em rụt tay ngay trước khi kịp suy nghĩ. Đường đi nào tạo nên phản ứng nhanh này?",
       "ans": "Thụ quan → tuỷ sống → cơ tay co",
       "wrong": [
        "Thụ quan → não suy nghĩ lâu → cơ tay",
        "Cơ tay tự biết nóng không cần thần kinh",
        "Mắt nhìn thấy nóng rồi mới ra lệnh co"
       ],
       "ex": "Đây là phản xạ: xung thần kinh từ thụ quan ở da đi đến tuỷ sống rồi quay ngay ra cơ tay. Nhờ đường phản xạ ngắn, tay rụt lại nhanh để tránh tổn thương nặng hơn."
      },
      {
       "q": "Người thiếu insulin (hormone tuyến tuỵ) sẽ gặp vấn đề gì trước tiên về đường huyết?",
       "ans": "Đường trong máu cao, tế bào thiếu đường",
       "wrong": [
        "Đường máu luôn thấp sau mọi bữa ăn",
        "Cơ thể không tạo được hồng cầu mới",
        "Thận ngừng thải mọi chất độc ra ngoài"
       ],
       "ex": "Insulin giúp tế bào thu nhận glucose và làm hạ đường huyết. Thiếu insulin, glucose ứ lại trong máu trong khi tế bào vẫn thiếu năng lượng, lâu dài gây tổn thương nhiều cơ quan."
      },
      {
       "q": "Giâm một cành hồng xuống đất ẩm, cành ra rễ thành cây mới giống hệt cây mẹ. Đây là hình thức sinh sản nào?",
       "ans": "Sinh sản vô tính, chỉ từ một cơ thể mẹ",
       "wrong": [
        "Sinh sản hữu tính, có cả bố và mẹ",
        "Thụ phấn chéo giữa hai cây hồng khác",
        "Sinh sản bằng hạt nên giống hệt mẹ"
       ],
       "ex": "Giâm cành là sinh sản vô tính: cây mới chỉ phát sinh từ một phần của một cơ thể mẹ, không có sự kết hợp của giao tử, nên mang đặc điểm di truyền giống cây mẹ."
      },
      {
       "q": "Sữa chua cần ủ ấm mới đông và chua, còn sữa tươi để trong tủ lạnh thì lâu chua hơn. Điều này cho thấy vi khuẩn lên men hoạt động thế nào?",
       "ans": "Nhiệt độ ấm vừa giúp vi khuẩn lên men nhanh",
       "wrong": [
        "Lạnh làm vi khuẩn lên men nhanh hơn",
        "Vi khuẩn chỉ sống được trong tủ lạnh",
        "Nóng lạnh không ảnh hưởng gì đến vi khuẩn"
       ],
       "ex": "Hoạt động của vi khuẩn và enzyme chịu ảnh hưởng của nhiệt độ. Lạnh kìm hãm quá trình lên men nên sữa lâu chua; ủ ấm vừa phải giúp vi khuẩn lactic hoạt động mạnh, tạo acid lactic làm sữa chua."
      },
      {
       "q": "Một sườn đồi bị chặt hết cây, sau vài cơn mưa lớn đất bị cuốn trôi và nước suối đục hơn. Mất rừng gây ra điều này chủ yếu vì sao?",
       "ans": "Mất rễ giữ đất và tán lá chắn mưa",
       "wrong": [
        "Cây bị chặt làm mưa trở nên nặng hơn",
        "Đất tự tan ra khi không thấy cây xanh",
        "Suối đục vì cá không còn bóng mát"
       ],
       "ex": "Rễ cây giữ đất, tán lá và lớp thảm mục làm chậm dòng chảy trên mặt đất. Mất rừng, nước mưa đập thẳng xuống và cuốn trôi đất, gây xói mòn, lũ quét và bồi lắng sông suối."
      },
      {
       "q": "Dùng kháng sinh không đủ liều, vi khuẩn kháng thuốc dần chiếm đa số trong quần thể. Cơ chế nào giải thích tốt nhất hiện tượng này?",
       "ans": "Chọn lọc giữ lại vi khuẩn đã kháng thuốc",
       "wrong": [
        "Kháng sinh dạy từng vi khuẩn cách kháng",
        "Mọi vi khuẩn tự tạo thuốc giải độc mới",
        "Thuốc làm vi khuẩn yếu đi vĩnh viễn"
       ],
       "ex": "Trong quần thể vốn có sẵn một số ít vi khuẩn mang biến dị kháng thuốc. Kháng sinh diệt các vi khuẩn nhạy cảm, số kháng thuốc sống sót và sinh sôi. Đây là chọn lọc tự nhiên trên biến dị có sẵn, không phải thuốc 'dạy' vi khuẩn."
      },
      {
       "q": "Khi chạy nước rút rất gắng sức, cơ bắp mỏi và nóng rát. Một phần nguyên nhân là cơ tạo năng lượng trong điều kiện thiếu oxygen, sinh ra chất nào?",
       "ans": "Acid lactic tích lại trong cơ",
       "wrong": [
        "Đường glucose tích lại gây rát cơ",
        "Oxygen tích quá nhiều trong cơ bắp",
        "Carbon dioxide biến thành tinh bột"
       ],
       "ex": "Khi nhu cầu năng lượng vượt khả năng cung cấp oxygen, tế bào cơ lên men lactic để tạo năng lượng tạm thời. Acid lactic tích lại là một trong những yếu tố góp phần gây cảm giác mỏi và nóng rát ở cơ (cơ chế này sách giáo khoa sẽ trình bày rõ hơn ở cấp học sau)."
      },
      {
       "q": "Vì sao một cơ thể đa bào như em không phải chỉ là một đống tế bào rời rạc chồng lên nhau?",
       "ans": "Tế bào chuyên hoá và phối hợp thành hệ cơ quan",
       "wrong": [
        "Vì mọi tế bào đều giống hệt nhau hoàn toàn",
        "Vì tế bào không cần liên lạc với nhau",
        "Vì cơ thể chỉ gồm một tế bào rất lớn"
       ],
       "ex": "Ở cơ thể đa bào, tế bào phân hoá thành mô, cơ quan và hệ cơ quan; mỗi loại đảm nhiệm một chức năng rồi phối hợp nhịp nhàng, giúp cơ thể sống như một thể thống nhất."
      }
     ],
     "blank": [
      {
       "ans": "oxygen",
       "wrong": [
        "carbon dioxide",
        "nitrogen",
        "hydrogen"
       ],
       "ex": "Quang hợp sử dụng carbon dioxide và nước, tạo chất hữu cơ và giải phóng oxygen.",
       "pre": "Quá trình quang hợp ở lá giải phóng khí ",
       "post": " vào không khí."
      },
      {
       "ans": "tinh bột",
       "wrong": [
        "protein",
        "chất béo",
        "vitamin"
       ],
       "ex": "Enzyme trong nước bọt bắt đầu phân giải tinh bột thành đường ngay trong khoang miệng.",
       "pre": "Nhai cơm lâu thấy ngọt vì một phần ",
       "post": " trong cơm đã bị enzyme nước bọt biến thành đường."
      },
      {
       "ans": "hai",
       "wrong": [
        "một",
        "bốn",
        "tám"
       ],
       "ex": "Nguyên phân tạo ra hai tế bào con, mỗi tế bào con có bộ nhiễm sắc thể giống hệt tế bào mẹ. Bốn tế bào con là kết quả của giảm phân.",
       "pre": "Trong nguyên phân, từ một tế bào mẹ tạo ra ",
       "post": " tế bào con có bộ nhiễm sắc thể giống mẹ."
      },
      {
       "ans": "ăn thịt",
       "wrong": [
        "ăn cỏ",
        "ăn tạp",
        "phân giải"
       ],
       "ex": "Động vật ăn thịt lấy năng lượng bằng cách ăn các động vật khác; động vật ăn cỏ ăn thực vật, động vật ăn tạp ăn cả hai loại.",
       "pre": "Cọp chuyên săn và ăn thịt các động vật khác nên được gọi là động vật ",
       "post": "."
      },
      {
       "ans": "phản xạ",
       "wrong": [
        "tập tính",
        "thói quen",
        "kĩ năng"
       ],
       "ex": "Phản xạ là phản ứng nhanh, tự động của cơ thể qua cung phản xạ, khác với thói quen hay kĩ năng phải học và luyện tập mới có.",
       "pre": "Rụt tay khi chạm vật nóng là một ",
       "post": " không điều kiện giúp bảo vệ cơ thể."
      },
      {
       "ans": "hữu tính",
       "wrong": [
        "vô tính",
        "sinh dưỡng",
        "phân đôi"
       ],
       "ex": "Hạt hình thành sau thụ phấn và thụ tinh, có sự kết hợp vật chất di truyền của giao tử đực và giao tử cái nên là sinh sản hữu tính.",
       "pre": "Cây con mọc lên từ hạt thường mang đặc điểm của cả hai cây bố mẹ vì hạt hình thành qua sinh sản ",
       "post": "."
      },
      {
       "ans": "tế bào",
       "wrong": [
        "mô",
        "cơ quan",
        "hệ cơ quan"
       ],
       "ex": "Tế bào là đơn vị cơ bản của sự sống. Mô, cơ quan và hệ cơ quan là các mức tổ chức cao hơn, chỉ có ở cơ thể đa bào.",
       "pre": "Dù lớn như cây gỗ hay nhỏ như vi khuẩn, mọi cơ thể sống đều được cấu tạo từ đơn vị cơ bản là ",
       "post": "."
      },
      {
       "ans": "insulin",
       "wrong": [
        "adrenaline",
        "thyroxine",
        "testosterone"
       ],
       "ex": "Insulin giúp tế bào thu nhận glucose từ máu, làm giảm đường huyết sau bữa ăn.",
       "pre": "Sau bữa ăn, hormone ",
       "post": " do tuyến tuỵ tiết ra giúp hạ lượng đường trong máu."
      },
      {
       "ans": "acid lactic",
       "wrong": [
        "acid acetic",
        "ethanol",
        "protein"
       ],
       "ex": "Lên men lactic biến đường lactose trong sữa thành acid lactic, làm sữa đông lại và có vị chua.",
       "pre": "Vi khuẩn lactic biến đường trong sữa thành ",
       "post": ", tạo vị chua đặc trưng của sữa chua."
      },
      {
       "ans": "lặn",
       "wrong": [
        "trội",
        "trung gian",
        "đột biến"
       ],
       "ex": "Tính trạng lặn chỉ biểu hiện khi không có allele trội che lấp, tức là ở kiểu gene đồng hợp lặn aa. Tính trạng trội biểu hiện được cả ở AA và Aa.",
       "pre": "Ở đậu Hà Lan, hạt xanh chỉ xuất hiện khi cây mang kiểu gene aa. Hạt xanh là tính trạng ",
       "post": "."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Nấm là thực vật vì nấm không di chuyển được và mọc trên đất.",
       "truth": false,
       "explain": "Sai: nấm không có diệp lục, không quang hợp, phải lấy chất hữu cơ có sẵn. Nấm thuộc một nhóm riêng, không phải thực vật."
      },
      {
       "stmt": "Virus có cấu tạo tế bào hoàn chỉnh giống như vi khuẩn.",
       "truth": false,
       "explain": "Sai: virus không có cấu tạo tế bào, chỉ gồm vật chất di truyền và vỏ protein, phải sống trong tế bào chủ mới nhân lên được."
      },
      {
       "stmt": "Về trao đổi khí, quang hợp và hô hấp tế bào diễn ra ngược chiều nhau: quang hợp lấy carbon dioxide, thải oxygen; hô hấp lấy oxygen, thải carbon dioxide.",
       "truth": true,
       "explain": "Đúng: đó là chiều trao đổi khí tổng thể của hai quá trình. Nhờ vậy oxygen và carbon dioxide được luân chuyển trong tự nhiên."
      },
      {
       "stmt": "Tiến hoá có nghĩa là một con khỉ ngày nay sẽ biến thành người.",
       "truth": false,
       "explain": "Sai: tiến hoá là sự biến đổi của quần thể qua nhiều thế hệ. Người và khỉ, vượn ngày nay có tổ tiên chung, không loài nào biến thành loài kia."
      },
      {
       "stmt": "Giảm phân tạo ra giao tử có số nhiễm sắc thể giảm đi một nửa so với tế bào mẹ.",
       "truth": true,
       "explain": "Đúng: nhờ giảm phân, giao tử chỉ mang bộ nhiễm sắc thể đơn bội; khi thụ tinh, bộ nhiễm sắc thể lưỡng bội được khôi phục ở hợp tử."
      },
      {
       "stmt": "Mọi vi khuẩn đều gây bệnh cho người.",
       "truth": false,
       "explain": "Sai: nhiều vi khuẩn có lợi, ví dụ vi khuẩn lactic làm sữa chua, vi khuẩn phân giải xác sinh vật trong đất và vi khuẩn sống cộng sinh trong ruột."
      },
      {
       "stmt": "Khi trời lạnh, mạch máu dưới da co lại giúp cơ thể giảm mất nhiệt.",
       "truth": true,
       "explain": "Đúng: co mạch dưới da làm giảm lượng máu ấm đến bề mặt cơ thể, hạn chế toả nhiệt ra môi trường lạnh; trời nóng thì mạch giãn để thoát nhiệt."
      },
      {
       "stmt": "Cây xanh chỉ hô hấp vào ban đêm, ban ngày cây chỉ quang hợp.",
       "truth": false,
       "explain": "Sai: cây hô hấp suốt ngày đêm để lấy năng lượng sống. Ban ngày có ánh sáng, cây vừa quang hợp vừa hô hấp, nhưng quang hợp thường mạnh hơn."
      },
      {
       "stmt": "Sinh sản vô tính tạo ra các cây con mang đặc điểm di truyền giống hệt cây mẹ.",
       "truth": true,
       "explain": "Đúng: sinh sản vô tính chỉ cần một cơ thể mẹ, không có kết hợp giao tử, nên con non thường giống hệt mẹ và giống nhau."
      },
      {
       "stmt": "Một lưới thức ăn càng đa dạng thì hệ sinh thái càng dễ giữ cân bằng khi một loài bị giảm số lượng.",
       "truth": true,
       "explain": "Đúng: đa dạng tạo nhiều nguồn thức ăn thay thế và nhiều mối quan hệ bù trừ, nên mất một mắt xích ít gây sụp đổ dây chuyền."
      },
      {
       "stmt": "Tính trạng lặn sẽ biến mất hoàn toàn khỏi quần thể chỉ sau một thế hệ lai.",
       "truth": false,
       "explain": "Sai: allele lặn vẫn tồn tại ẩn trong các cá thể dị hợp Aa dù không biểu hiện ra kiểu hình, và có thể xuất hiện lại khi hai allele lặn gặp nhau (aa)."
      },
      {
       "stmt": "Hồng cầu trưởng thành ở người không có nhân, giúp chứa được nhiều hemoglobin để vận chuyển oxygen hơn.",
       "truth": true,
       "explain": "Đúng: mất nhân và hình đĩa lõm hai mặt giúp hồng cầu chứa nhiều hemoglobin và dễ len qua mao mạch hẹp để vận chuyển oxygen."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Gặp một hiện tượng lạ, hãy hỏi theo trình tự: chuyện gì xảy ra → bộ phận hay tế bào nào liên quan → cơ chế vì sao → làm thí nghiệm nào để kiểm chứng.",
      "Với chuỗi và lưới thức ăn, cứ lần theo chiều 'bị ăn bởi': mất một mắt xích thì kẻ ăn nó thiếu thức ăn, còn con mồi của nó được thả lỏng và tăng lên.",
      "Với bài toán Mendel, viết rõ tính trạng, allele trội/lặn và kiểu gene của bố mẹ trước, lập tỉ lệ giao tử rồi mới kết luận tỉ lệ đời con — đừng đoán tỉ lệ thuộc lòng.",
      "Ba hiểu lầm cần tránh: nấm không phải thực vật, virus không phải tế bào, và tiến hoá không phải một cá thể biến thành loài khác trong một đời."
     ],
     "facts": [
      {
       "q": "Vì sao vận động viên thở gấp sau khi chạy nước rút?",
       "a": "Cơ hô hấp mạnh, cần thêm oxygen và thải nhanh carbon dioxide",
       "ex": "Nhịp thở và nhịp tim cùng tăng để hệ hô hấp và tuần hoàn đáp ứng nhu cầu trao đổi chất tăng vọt khi vận động mạnh."
      },
      {
       "q": "Lai đậu hạt vàng dị hợp Aa với hạt xanh aa (vàng trội hoàn toàn) cho tỉ lệ kiểu hình nào?",
       "a": "1 hạt vàng : 1 hạt xanh",
       "ex": "Aa cho hai loại giao tử A và a với tỉ lệ bằng nhau, aa chỉ cho a. Đời con gồm 1 Aa (hạt vàng) : 1 aa (hạt xanh)."
      }
     ],
     "pairs": [
      [
       "Quang hợp",
       "Tạo chất hữu cơ và giải phóng oxygen"
      ],
      [
       "Hô hấp tế bào",
       "Phân giải chất hữu cơ để lấy năng lượng"
      ],
      [
       "Nguyên phân",
       "Tạo tế bào con giống hệt tế bào mẹ"
      ],
      [
       "Giảm phân",
       "Tạo giao tử giảm nửa số nhiễm sắc thể"
      ],
      [
       "Sinh vật sản xuất",
       "Cây xanh tự tổng hợp chất hữu cơ"
      ],
      [
       "Phản xạ",
       "Phản ứng nhanh qua cung phản xạ"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-thcs-thinghiem",
    "emoji": "📏",
    "name": "Phương pháp và đo lường",
    "sub": "Chọn dụng cụ, đọc số đo, kiểm chứng như nhà khoa học",
    "pools": {
     "choose": [
      {
       "q": "Em cần đo chiều dài chiếc bàn học dài khoảng 1,2 m. Dụng cụ nào phù hợp nhất?",
       "ans": "Thước cuộn",
       "wrong": [
        "Thước kẻ học sinh 20 cm",
        "Cân đồng hồ",
        "Bình chia độ"
       ],
       "ex": "Bàn dài 1,2 m, vượt xa GHĐ 20 cm của thước kẻ; thước cuộn có GHĐ vài mét nên đo một lần là đủ và ít sai số."
      },
      {
       "q": "Muốn đo đường kính một viên bi nhỏ khoảng 15 mm thật chính xác, em dùng dụng cụ nào?",
       "ans": "Thước kẹp",
       "wrong": [
        "Thước cuộn",
        "Thước dây vải",
        "Đồng hồ bấm giây"
       ],
       "ex": "Thước kẹp ôm sát hai phía viên bi và có ĐCNN rất nhỏ, cho số đo đường kính chính xác hơn hẳn thước thẳng."
      },
      {
       "q": "Thước có ĐCNN 1 mm. Đặt vật từ vạch 0, đầu kia của vật trùng vạch thứ 147. Chiều dài vật là bao nhiêu?",
       "ans": "14,7 cm",
       "wrong": [
        "14 cm",
        "14,07 cm",
        "147 cm"
       ],
       "ex": "Vật dài 147 mm. Đổi đơn vị: 147 mm = 147 : 10 = 14,7 cm."
      },
      {
       "q": "Đo bút chì bằng thước ĐCNN 1 mm: đầu bút ở vạch 2 cm, đuôi bút ở vạch 17,3 cm. Chiều dài bút là bao nhiêu?",
       "ans": "15,3 cm",
       "wrong": [
        "17,3 cm",
        "13,3 cm",
        "19,3 cm"
       ],
       "ex": "Phải trừ vạch xuất phát: 17,3 − 2,0 = 15,3 cm. Đọc thẳng 17,3 cm là lỗi quên trừ vạch đầu."
      },
      {
       "q": "Bình chia độ chứa 50 mL nước. Thả chìm một hòn đá, mực nước dâng lên vạch 78 mL. Thể tích hòn đá là bao nhiêu?",
       "ans": "28 mL",
       "wrong": [
        "78 mL",
        "50 mL",
        "128 mL"
       ],
       "ex": "Thể tích vật bằng phần nước dâng lên: 78 − 50 = 28 mL."
      },
      {
       "q": "Khi đọc thể tích chất lỏng trong bình chia độ, em phải đặt mắt như thế nào?",
       "ans": "Ngang mức chất lỏng",
       "wrong": [
        "Cao hơn mức chất lỏng",
        "Thấp hơn mức chất lỏng",
        "Xiên một góc 45 độ"
       ],
       "ex": "Đặt mắt ngang mức chất lỏng thì số đọc mới đúng; nhìn từ trên hay từ dưới xuống đều là đọc xiên và cho số đo sai."
      },
      {
       "q": "Cân Roberval thăng bằng khi đĩa quả cân có các quả 100 g, 50 g, 10 g và 5 g. Khối lượng vật ở đĩa bên kia là bao nhiêu?",
       "ans": "165 g",
       "wrong": [
        "155 g",
        "175 g",
        "160 g"
       ],
       "ex": "Cộng các quả cân: 100 + 50 + 10 + 5 = 165 g. Khi cân thăng bằng, khối lượng vật bằng tổng khối lượng các quả cân."
      },
      {
       "q": "Một bao gạo ghi khối lượng 2,5 kg. Khối lượng đó bằng bao nhiêu gam?",
       "ans": "2500 g",
       "wrong": [
        "250 g",
        "25 g",
        "25000 g"
       ],
       "ex": "1 kg = 1000 g nên 2,5 kg = 2,5 × 1000 = 2500 g."
      },
      {
       "q": "Đo thời gian bạn chạy 100 m trong giờ thể dục, dụng cụ nào cho kết quả tin cậy nhất?",
       "ans": "Đồng hồ bấm giây",
       "wrong": [
        "Đồng hồ treo tường",
        "Đồng hồ cát 1 phút",
        "Lịch để bàn"
       ],
       "ex": "Chạy 100 m chỉ mất vài chục giây và cần bấm đúng lúc xuất phát và về đích, nên phải dùng đồng hồ bấm giây."
      },
      {
       "q": "Đo chiều dài quyển sách 3 lần được 24,6 cm; 24,8 cm; 24,7 cm. Kết quả nên lấy là bao nhiêu?",
       "ans": "24,7 cm",
       "wrong": [
        "24,6 cm",
        "24,8 cm",
        "74,1 cm"
       ],
       "ex": "Lấy trung bình cộng: (24,6 + 24,8 + 24,7) : 3 = 74,1 : 3 = 24,7 cm. Giá trị 74,1 cm là lỗi quên chia cho 3."
      },
      {
       "q": "Vì sao khi đo, nhà khoa học thường đo lặp lại 3 lần rồi lấy giá trị trung bình?",
       "ans": "Để giảm sai số và tin cậy hơn",
       "wrong": [
        "Để kết quả luôn giống hệt nhau",
        "Để khỏi cần đọc số đo kĩ",
        "Để thí nghiệm trông lâu hơn"
       ],
       "ex": "Mỗi lần đo đều có sai số nhỏ; lấy trung bình của nhiều lần đo giúp kết quả gần đúng hơn và đáng tin hơn."
      },
      {
       "q": "Cần đo nhiệt độ của nước đang sôi (khoảng 100 °C). Dụng cụ nào dùng được?",
       "ans": "Nhiệt kế thuỷ ngân phòng thí nghiệm",
       "wrong": [
        "Nhiệt kế y tế",
        "Thước cuộn",
        "Cân đồng hồ"
       ],
       "ex": "Nhiệt kế y tế chỉ có GHĐ khoảng 42 °C nên không đo được 100 °C; phải dùng nhiệt kế phòng thí nghiệm có GHĐ từ 100 °C trở lên."
      },
      {
       "q": "Một nhiệt kế có độ chia nhỏ nhất 0,5 °C. Cột chất lỏng dừng đúng vạch nằm giữa vạch 36 °C và vạch 37 °C. Nhiệt độ đọc được là bao nhiêu?",
       "ans": "36,5 °C",
       "wrong": [
        "36 °C",
        "37 °C",
        "365 °C"
       ],
       "ex": "Theo cách đo trong SGK (KHTN 6, Bài 5 và Bài 8), ta đọc kết quả theo vạch chia gần nhất với mức chất lỏng và ghi theo độ chia nhỏ nhất của nhiệt kế. Các vạch của nhiệt kế này cách nhau 0,5 °C, nên vạch nằm giữa 36 °C và 37 °C chính là vạch 36,5 °C.",
       "fig": {
        "f": "k5therm",
        "a": [
         36.5,
         0,
         50,
         0.5
        ]
       }
      },
      {
       "q": "Lá cây vẫn đang trên cành, em muốn nhìn rõ các gân lá nhỏ mà không hái lá. Dụng cụ nào tiện nhất?",
       "ans": "Kính lúp",
       "wrong": [
        "Kính hiển vi quang học",
        "Nhiệt kế",
        "Bình chia độ"
       ],
       "ex": "Kính lúp cầm tay phóng to vật vừa phải và dùng trực tiếp tại chỗ; kính hiển vi cần cắt mẫu và đặt lên lam kính mới xem được."
      },
      {
       "q": "Khi dùng kính hiển vi quang học, mẫu vật cần quan sát được đặt lên bộ phận nào?",
       "ans": "Bàn kính",
       "wrong": [
        "Thị kính",
        "Ốc to",
        "Chân kính"
       ],
       "ex": "Mẫu đặt trên lam kính rồi để lên bàn kính, ngay dưới vật kính; thị kính là nơi đặt mắt nhìn, ốc to dùng để chỉnh nét."
      },
      {
       "q": "Muốn ngửi mùi một hoá chất trong phòng thực hành, cách nào đúng và an toàn?",
       "ans": "Phẩy tay nhẹ hướng hơi vào mũi",
       "wrong": [
        "Ghé sát mũi vào miệng lọ",
        "Nếm thử một ít hoá chất",
        "Đổ hoá chất ra lòng bàn tay"
       ],
       "ex": "Quy tắc an toàn: không ngửi trực tiếp và không nếm hoá chất; dùng tay phẩy nhẹ cho một ít hơi bay về phía mũi."
      },
      {
       "q": "Trong giờ thực hành, bạn làm vỡ nhiệt kế thuỷ ngân. Việc làm đúng nhất là gì?",
       "ans": "Báo ngay giáo viên, không chạm tay",
       "wrong": [
        "Tự dùng tay nhặt thuỷ ngân",
        "Quét nhanh vào thùng rác lớp",
        "Lấy khăn bàn lau sạch rồi học tiếp"
       ],
       "ex": "Thuỷ ngân rất độc. Phải tránh xa, không chạm tay vào và báo ngay giáo viên để xử lí đúng quy trình an toàn."
      },
      {
       "q": "Trước khi làm thí nghiệm hạt nảy mầm, bạn An dự đoán: hạt được tưới đủ nước sẽ nảy mầm nhanh hơn hạt khô. Câu dự đoán này gọi là gì?",
       "ans": "Giả thuyết",
       "wrong": [
        "Kết luận",
        "Số liệu đo",
        "Nhóm đối chứng"
       ],
       "ex": "Dự đoán đưa ra trước khi kiểm chứng, dựa trên quan sát, gọi là giả thuyết; chỉ sau thí nghiệm mới rút ra được kết luận."
      },
      {
       "q": "Thí nghiệm nảy mầm dùng 2 khay hạt giống nhau. Khay A tưới nước mỗi ngày, khay B không tưới, còn lại mọi điều kiện như nhau. Khay B đóng vai trò gì?",
       "ans": "Nhóm đối chứng",
       "wrong": [
        "Nhóm thí nghiệm",
        "Giả thuyết",
        "Kết luận"
       ],
       "ex": "Khay B không nhận yếu tố đang thử (nước) nên dùng để so sánh với khay A; khay B là nhóm đối chứng, khay A là nhóm thí nghiệm."
      },
      {
       "q": "Thí nghiệm mạch điện: dùng cùng một bóng đèn, 1 pin thì đèn mờ, 2 pin nối tiếp thì đèn sáng rõ hơn. Kết luận nào KHÔNG được suy ra từ kết quả này?",
       "ans": "Thêm pin làm bóng đèn bền hơn",
       "wrong": [
        "Hai pin làm đèn sáng hơn một pin",
        "Độ sáng của đèn phụ thuộc số pin",
        "Một pin cho ánh sáng mờ hơn hai pin"
       ],
       "ex": "Thí nghiệm chỉ ghi nhận độ sáng theo số pin, không hề đo độ bền của bóng đèn, nên không thể kết luận về độ bền."
      },
      {
       "q": "Bình chia độ có ĐCNN 2 mL. Mực chất lỏng dừng ở vạch thứ hai sau vạch 60 mL. Thể tích chất lỏng là bao nhiêu?",
       "ans": "64 mL",
       "wrong": [
        "60 mL",
        "62 mL",
        "70 mL"
       ],
       "ex": "Từ vạch 60 mL, qua hai khoảng chia, mỗi khoảng 2 mL: 60 + 2 × 2 = 64 mL. Đọc 62 mL là lỗi tưởng ĐCNN bằng 1 mL."
      },
      {
       "q": "Ở phòng y tế trường, cần cân một học sinh nặng khoảng 40 kg. Dụng cụ nào phù hợp?",
       "ans": "Cân y tế",
       "wrong": [
        "Cân Roberval",
        "Bình chia độ",
        "Thước kẹp"
       ],
       "ex": "Cân y tế có GHĐ lớn và thiết kế để cân người; cân Roberval trong phòng thí nghiệm chỉ dùng cân các vật nhỏ."
      },
      {
       "q": "Một thí nghiệm kéo dài 2 phút 30 giây. Thời gian đó bằng bao nhiêu giây?",
       "ans": "150 giây",
       "wrong": [
        "230 giây",
        "130 giây",
        "90 giây"
       ],
       "ex": "Đổi đơn vị: 2 phút = 2 × 60 = 120 giây; cộng thêm 30 giây được 120 + 30 = 150 giây. Giá trị 230 giây là lỗi ghép số."
      },
      {
       "q": "Chiều cao một bạn là 1,85 m. Chiều cao đó bằng bao nhiêu xăng-ti-mét?",
       "ans": "185 cm",
       "wrong": [
        "18,5 cm",
        "1850 cm",
        "1085 cm"
       ],
       "ex": "1 m = 100 cm nên 1,85 m = 1,85 × 100 = 185 cm."
      },
      {
       "q": "Theo phương pháp tìm hiểu tự nhiên, bước đầu tiên khi nghiên cứu một hiện tượng là gì?",
       "ans": "Quan sát và đặt câu hỏi",
       "wrong": [
        "Rút ra kết luận ngay",
        "Viết báo cáo kết quả",
        "Đo lặp lại ba lần"
       ],
       "ex": "Trình tự đúng: quan sát và đặt câu hỏi, rồi hình thành giả thuyết, lập kế hoạch kiểm tra, thực hiện kế hoạch và cuối cùng mới kết luận."
      },
      {
       "q": "Đo thời gian một vật rơi 3 lần được 12,4 s; 12,6 s; 12,5 s. Giá trị trung bình là bao nhiêu?",
       "ans": "12,5 s",
       "wrong": [
        "12,4 s",
        "12,6 s",
        "37,5 s"
       ],
       "ex": "Trung bình cộng: (12,4 + 12,6 + 12,5) : 3 = 37,5 : 3 = 12,5 s. Giá trị 37,5 s là lỗi quên chia cho số lần đo."
      }
     ],
     "blank": [
      {
       "ans": "liên tiếp",
       "wrong": [
        "xa nhất",
        "đầu tiên",
        "đẹp nhất"
       ],
       "ex": "ĐCNN là độ dài giữa hai vạch chia liên tiếp trên dụng cụ đo, ví dụ 1 mm trên thước kẻ học sinh.",
       "pre": "Khoảng cách giữa hai vạch chia ",
       "post": " trên thước được gọi là độ chia nhỏ nhất (ĐCNN)."
      },
      {
       "ans": "360",
       "wrong": [
        "36",
        "3600",
        "306"
       ],
       "ex": "1 m = 100 cm nên 3,6 m = 3,6 × 100 = 360 cm.",
       "pre": "Đổi đơn vị: 3,6 m = ",
       "post": " cm."
      },
      {
       "ans": "45",
       "wrong": [
        "165",
        "120",
        "285"
       ],
       "ex": "Thể tích vật bằng phần nước dâng lên: 165 − 120 = 45 mL.",
       "pre": "Bình chia độ đang có 120 mL nước. Thả chìm một vật, mực nước lên 165 mL. Thể tích của vật là ",
       "post": " mL."
      },
      {
       "ans": "100",
       "wrong": [
        "300",
        "99",
        "101"
       ],
       "ex": "Trung bình cộng: (102 + 98 + 100) : 3 = 300 : 3 = 100 g.",
       "pre": "Cân một mẫu đất 3 lần được 102 g; 98 g; 100 g. Khối lượng trung bình của mẫu là ",
       "post": " g."
      },
      {
       "ans": "1500",
       "wrong": [
        "150",
        "15",
        "1050"
       ],
       "ex": "1 L = 1000 mL nên 1,5 L = 1,5 × 1000 = 1500 mL.",
       "pre": "Đổi đơn vị: 1,5 L = ",
       "post": " mL."
      },
      {
       "ans": "ngang tầm",
       "wrong": [
        "cao hơn",
        "thấp hơn",
        "xiên xuống"
       ],
       "ex": "Đặt mắt ngang tầm mức chất lỏng mới đọc đúng; nhìn từ trên xuống hay từ dưới lên đều gây sai số do đọc xiên.",
       "pre": "Khi đọc số đo trên bình chia độ, em phải đặt mắt ",
       "post": " với mức chất lỏng."
      },
      {
       "ans": "đối chứng",
       "wrong": [
        "thí nghiệm",
        "giả thuyết",
        "kết luận"
       ],
       "ex": "Nhóm đối chứng giữ mọi điều kiện như nhóm thí nghiệm nhưng không nhận yếu tố đang thử, để đem so sánh kết quả.",
       "pre": "Trong thí nghiệm có đối chứng, nhóm không nhận yếu tố đang thử nghiệm được gọi là nhóm ",
       "post": "."
      },
      {
       "ans": "1,5",
       "wrong": [
        "9",
        "1",
        "90"
       ],
       "ex": "1 phút = 60 giây nên 90 giây = 90 : 60 = 1,5 phút.",
       "pre": "Đổi đơn vị: 90 giây = ",
       "post": " phút."
      },
      {
       "ans": "thị kính",
       "wrong": [
        "vật kính",
        "bàn kính",
        "ốc nhỏ"
       ],
       "ex": "Thị kính ở đầu trên của thân kính là nơi đặt mắt nhìn; vật kính ở phía dưới, gần mẫu vật trên bàn kính.",
       "pre": "Ở kính hiển vi quang học, bộ phận em đặt mắt vào để quan sát mẫu vật là ",
       "post": "."
      },
      {
       "ans": "kính bảo hộ",
       "wrong": [
        "găng tay",
        "khẩu trang",
        "mũ vải"
       ],
       "ex": "Kính bảo hộ che chắn cho mắt khỏi hoá chất bắn vào; găng tay chỉ bảo vệ tay, không thay được kính bảo hộ.",
       "pre": "Khi làm thí nghiệm với hoá chất, em phải đeo ",
       "post": " để bảo vệ mắt."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Đo một vật 3 lần rồi lấy giá trị trung bình sẽ cho kết quả đáng tin hơn đo 1 lần.",
       "truth": true,
       "explain": "Đúng: mỗi lần đo có sai số nhỏ khác nhau; trung bình của nhiều lần đo làm giảm ảnh hưởng của sai số."
      },
      {
       "stmt": "Đọc bình chia độ, đặt mắt cao hơn mức chất lỏng một chút vẫn cho số đo chính xác.",
       "truth": false,
       "explain": "Sai: nhìn từ trên xuống là đọc xiên nên số đo bị lệch. Phải đặt mắt ngang mức chất lỏng mới đọc đúng."
      },
      {
       "stmt": "Trước khi cân bằng cân Roberval, cần chỉnh cho đòn cân thăng bằng khi hai đĩa chưa có vật.",
       "truth": true,
       "explain": "Đúng: phải hiệu chỉnh cân về trạng thái thăng bằng ban đầu thì số đo khối lượng mới chính xác."
      },
      {
       "stmt": "Chỉ nếm một ít thôi thì vẫn an toàn, và nếm là cách nhanh nhất để nhận biết hoá chất.",
       "truth": false,
       "explain": "Sai: tuyệt đối không nếm hoá chất trong phòng thực hành vì nhiều chất rất độc và gây bỏng; đây là quy tắc an toàn bắt buộc."
      },
      {
       "stmt": "Kính lúp có thể phóng to hình ảnh của vật nhỏ như gân lá, giúp quan sát rõ hơn.",
       "truth": true,
       "explain": "Đúng: kính lúp cầm tay cho ảnh phóng to vài lần, rất hợp để quan sát các vật nhỏ như gân lá hay vân tay."
      },
      {
       "stmt": "Thước kẻ có GHĐ 20 cm có thể đo chính xác chiều dài sân trường 30 m chỉ trong một lần đặt thước.",
       "truth": false,
       "explain": "Sai: sân trường dài 30 m vượt xa GHĐ 20 cm; đo nối tiếp nhiều lần sẽ tích lũy sai số, nên phải dùng thước cuộn có GHĐ lớn."
      },
      {
       "stmt": "Trong thí nghiệm hạt nảy mầm có đối chứng, hai khay hạt phải giống nhau mọi điều kiện, chỉ khác yếu tố đang thử.",
       "truth": true,
       "explain": "Đúng: giữ giống nhau mọi điều kiện như hạt, đất, ánh sáng và chỉ thay đổi một yếu tố (ví dụ nước) thì mới kết luận được nguyên nhân."
      },
      {
       "stmt": "Nhiệt kế y tế có GHĐ 42 °C vẫn đo được nhiệt độ của nước đang sôi.",
       "truth": false,
       "explain": "Sai: nước sôi ở khoảng 100 °C, vượt xa GHĐ 42 °C của nhiệt kế y tế; cố đo như vậy sẽ làm hỏng nhiệt kế."
      },
      {
       "stmt": "Khi cần ngửi hoá chất, em dùng tay phẩy nhẹ phía trên miệng lọ để hơi bay về phía mũi.",
       "truth": true,
       "explain": "Đúng: đó là cách ngửi an toàn trong phòng thực hành; không ghé mũi sát miệng lọ và không ngửi trực tiếp."
      },
      {
       "stmt": "Kết quả đo một lần duy nhất luôn đáng tin hơn giá trị trung bình của ba lần đo.",
       "truth": false,
       "explain": "Sai: một lần đo dễ gặp sai số lớn; giá trị trung bình của nhiều lần đo mới đáng tin hơn."
      },
      {
       "stmt": "Đơn vị đo thời gian chuẩn trong khoa học là giây, kí hiệu là s.",
       "truth": true,
       "explain": "Đúng: giây (s) là đơn vị đo thời gian trong hệ đo lường quốc tế SI; phút và giờ là các đơn vị thường dùng thêm."
      },
      {
       "stmt": "Giả thuyết là kết luận cuối cùng mà nhà khoa học rút ra sau khi thí nghiệm kết thúc.",
       "truth": false,
       "explain": "Sai: giả thuyết là dự đoán đưa ra trước khi kiểm chứng; kết luận mới là điều rút ra sau khi phân tích kết quả thí nghiệm."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Cách nghĩ của nhà khoa học: quan sát và đặt câu hỏi, nêu giả thuyết, làm thí nghiệm kiểm chứng có nhóm đối chứng, đo đạc cẩn thận, rồi mới rút kết luận.",
      "Chọn dụng cụ theo việc: vật càng lớn cần dụng cụ có GHĐ càng lớn; muốn đo càng chính xác thì chọn dụng cụ có ĐCNN càng nhỏ.",
      "Đọc số đo đúng cách: đặt mắt ngang mức cần đọc, nhớ trừ vạch xuất phát nếu vật không bắt đầu ở vạch 0, và đo lặp lại 3 lần rồi lấy trung bình.",
      "An toàn là điều kiện đầu tiên: không nếm và không ngửi trực tiếp hoá chất, đeo kính bảo hộ, và báo ngay giáo viên khi có sự cố."
     ],
     "facts": [
      {
       "q": "Vì sao đo chiều dài thường đo 3 lần rồi lấy trung bình?",
       "a": "Để giảm sai số, kết quả tin cậy hơn",
       "ex": "Mỗi lần đo lệch một chút; lấy trung bình cộng của 3 lần đo (cộng tổng rồi chia 3) cho giá trị gần đúng nhất."
      },
      {
       "q": "Thước có các vạch cách nhau 1 mm thì ĐCNN là bao nhiêu?",
       "a": "1 mm (0,1 cm)",
       "ex": "ĐCNN là khoảng cách giữa hai vạch chia liên tiếp; ở thước này là 1 mm, tức 0,1 cm."
      }
     ],
     "pairs": [
      [
       "Thước cuộn",
       "đo chiều dài lớn như sân trường"
      ],
      [
       "Bình chia độ",
       "đo thể tích chất lỏng và vật rắn"
      ],
      [
       "Đồng hồ bấm giây",
       "đo thời gian ngắn như chạy 100 m"
      ],
      [
       "Nhiệt kế",
       "đo nhiệt độ"
      ],
      [
       "Cân Roberval",
       "đo khối lượng vật nhỏ"
      ],
      [
       "Kính hiển vi quang học",
       "quan sát vật rất nhỏ"
      ]
     ]
    }
   }
  ]
 },
 "thpt": {
  "topics": [
   {
    "id": "cd-kh-thpt-chat",
    "emoji": "⚛️",
    "name": "Nguyên tử, phân tử và vật liệu",
    "sub": "Cấu trúc quyết định tính chất — từ nguyên tử tới vật liệu quanh em",
    "pools": {
     "choose": [
      {
       "q": "Kim cương và than chì đều làm từ cacbon, nhưng kim cương cứng nhất trong tự nhiên còn than chì mềm, viết được lên giấy. Vì sao?",
       "ans": "Cách sắp xếp nguyên tử cacbon khác nhau",
       "wrong": [
        "Khối lượng nguyên tử của chúng khác nhau",
        "Than chì có lẫn chì nên mềm hơn",
        "Kim cương chứa thêm một nguyên tố khác"
       ],
       "ex": "Hai dạng thù hình của cacbon khác nhau ở cấu trúc: kim cương là mạng ba chiều chắc chắn, than chì gồm các lớp phẳng trượt lên nhau dễ dàng."
      },
      {
       "q": "Vì sao dây điện làm bằng kim loại còn vỏ bọc ngoài lại là nhựa?",
       "ans": "Kim loại có electron tự do di chuyển",
       "wrong": [
        "Kim loại nhẹ hơn nhựa rất nhiều",
        "Nhựa không chịu được điện áp cao",
        "Kim loại không bao giờ bị nóng lên"
       ],
       "ex": "Liên kết kim loại có các electron tự do mang điện đi khắp khối kim loại; nhựa không có electron tự do nên cách điện."
      },
      {
       "q": "Nước đá nổi trên mặt nước lỏng — hiện tượng khá hiếm trong tự nhiên. Giải thích đúng là:",
       "ans": "Đá có khối lượng riêng nhỏ hơn nước lỏng",
       "wrong": [
        "Đá chứa nhiều bọt khí nên nhẹ đi",
        "Nước lỏng ở 0°C nặng bất thường",
        "Đá bị lực đẩy của muối trong nước"
       ],
       "ex": "Khi đóng băng, các phân tử nước xếp thành mạng rỗng nhờ liên kết hydrogen, thể tích tăng nên khối lượng riêng của đá nhỏ hơn nước lỏng."
      },
      {
       "q": "Muối ăn tan nhanh trong nước nhưng dầu ăn thì không, dù khuấy mạnh cỡ nào. Vì sao?",
       "ans": "Nước phân cực nên tách được các ion của muối",
       "wrong": [
        "Muối nhẹ hơn dầu nên dễ tan hơn",
        "Dầu ăn có phân tử quá nhỏ để tan",
        "Nước chỉ hoà tan được chất có màu trắng"
       ],
       "ex": "Nước là dung môi phân cực: đầu phân cực của phân tử nước kéo các ion natri và clo ra khỏi tinh thể muối. Dầu không phân cực nên không bị nước tách ra."
      },
      {
       "q": "Mở lọ nước hoa trong phòng kín, ít phút sau cả phòng thơm dù không có gió. Hiện tượng này là do:",
       "ans": "Khuếch tán do phân tử chuyển động không ngừng",
       "wrong": [
        "Đối lưu của không khí trong phòng",
        "Phân tử nước hoa tự nhân lên nhiều lần",
        "Áp suất phòng đẩy mùi đi khắp nơi"
       ],
       "ex": "Các phân tử luôn chuyển động nhiệt hỗn loạn và va chạm lẫn nhau nên dần lan đều khắp thể tích phòng — đó là khuếch tán."
      },
      {
       "q": "Nồi áp suất nấu thức ăn nhanh chín hơn nồi thường chủ yếu vì:",
       "ans": "Áp suất cao làm nước sôi ở nhiệt độ cao hơn",
       "wrong": [
        "Nồi áp suất giữ lại toàn bộ vitamin",
        "Áp suất ép thức ăn chín từ bên trong",
        "Nồi áp suất làm nước sôi mạnh hơn ở 100°C"
       ],
       "ex": "Nắp kín làm áp suất trong nồi tăng, điểm sôi của nước vượt 100°C nên thức ăn nhận nhiệt độ cao hơn và chín nhanh hơn."
      },
      {
       "q": "Sắt để ngoài trời ẩm nhanh bị gỉ, còn nhôm cũng tiếp xúc không khí mà bền hơn nhiều. Vì sao?",
       "ans": "Nhôm có lớp oxit mỏng bền che phủ bề mặt",
       "wrong": [
        "Nhôm không phản ứng với oxi trong không khí",
        "Nhôm nhẹ hơn nên khó bị ăn mòn hơn",
        "Sắt bị gỉ do vi khuẩn chứ không phải hoá học"
       ],
       "ex": "Nhôm phản ứng với oxi ngay lập tức nhưng tạo lớp oxit nhôm mỏng, bền, bám chặt, ngăn oxi và nước thấm vào trong — nhôm tự bảo vệ mình."
      },
      {
       "q": "Thuỷ tinh bị va đập thì vỡ vụn, còn tấm kim loại chỉ bị móp. Khác biệt này bắt nguồn từ:",
       "ans": "Các lớp nguyên tử kim loại trượt được khi bị nén",
       "wrong": [
        "Kim loại luôn mềm hơn thuỷ tinh",
        "Thuỷ tinh chứa nhiều tạp chất dễ vỡ",
        "Kim loại có nhiệt độ nóng chảy thấp hơn"
       ],
       "ex": "Trong kim loại, biển electron tự do giữ các lớp nguyên tử với nhau ngay cả khi chúng trượt lên nhau, nên kim loại biến dạng thay vì vỡ."
      },
      {
       "q": "Xà phòng tẩy được vết dầu mỡ trên tay trong khi nước lã thì không. Bí mật nằm ở phân tử xà phòng:",
       "ans": "Một đầu ưa nước, một đầu kị nước bám dầu mỡ",
       "wrong": [
        "Phân tử xà phòng rất nhỏ, chui vào mọi kẽ",
        "Xà phòng có tính axit mạnh ăn mòn dầu mỡ",
        "Xà phòng làm nước nóng lên khi hoà tan"
       ],
       "ex": "Đầu kị nước của phân tử xà phòng bám vào dầu mỡ, đầu ưa nước hướng ra ngoài, kéo theo cả mảng bẩn vào nước dưới dạng các hạt nhỏ li ti."
      },
      {
       "q": "Glucose tan tốt trong nước và ngọt, còn tinh bột hầu như không tan dù cùng họ carbohydrate. Vì sao?",
       "ans": "Glucose là phân tử nhỏ, tinh bột là polymer rất lớn",
       "wrong": [
        "Tinh bột không chứa nguyên tố cacbon",
        "Glucose là chất lỏng còn tinh bột là chất rắn",
        "Tinh bột chỉ tan trong nước nóng sôi"
       ],
       "ex": "Tinh bột là polymer gồm hàng nghìn đơn vị glucose liên kết lại; phân tử càng lớn càng khó được nước tách ra và bao quanh để hoà tan."
      },
      {
       "q": "Túi nilon (nhựa PE) vứt ra môi trường hàng chục năm không mục. Nguyên nhân cốt lõi là:",
       "ans": "Chuỗi polymer dài, liên kết bền, khó bị phân cắt",
       "wrong": [
        "Nilon có màu nên vi sinh vật tránh xa",
        "Nilon nhẹ nên luôn nổi trên mặt đất",
        "Nilon được phủ một lớp chống thấm đặc biệt"
       ],
       "ex": "PE là polymer với chuỗi cacbon rất dài và bền; vi sinh vật hầu như không có enzyme cắt nổi chuỗi này, nên nhựa tồn tại rất lâu trong môi trường."
      },
      {
       "q": "Đun nóng một thanh sắt, thanh sắt dài ra một chút. Ở cấp độ phân tử, điều gì đã xảy ra?",
       "ans": "Phân tử dao động mạnh hơn, khoảng cách tăng",
       "wrong": [
        "Phân tử sắt nở to ra như quả bóng",
        "Có thêm phân tử mới chèn vào thanh sắt",
        "Electron bay hết ra ngoài làm thanh nhẹ đi"
       ],
       "ex": "Nhiệt độ tăng làm các nguyên tử dao động mạnh hơn quanh vị trí cân bằng, khoảng cách trung bình giữa chúng tăng lên — vật nở ra chứ bản thân nguyên tử không to lên."
      },
      {
       "q": "Một bạn nói: “Nguyên tử vàng khác nguyên tử bạc chỉ ở số electron lớp ngoài cùng”. Điểm cốt lõi bạn ấy nói sai là:",
       "ans": "Số proton trong hạt nhân khác nhau",
       "wrong": [
        "Số lớp electron khác nhau",
        "Khối lượng hạt nhân khác nhau",
        "Số nơtron trong hạt nhân khác nhau"
       ],
       "ex": "Nguyên tố được xác định bởi số proton (số hiệu nguyên tử): vàng có 79 proton, bạc có 47 proton. Khác số proton là khác hẳn nguyên tố."
      },
      {
       "q": "Các khí hiếm như heli, neon hầu như không tạo hợp chất với bất cứ chất nào. Vì sao?",
       "ans": "Lớp vỏ ngoài cùng đã đạt cấu hình bền",
       "wrong": [
        "Khí hiếm không có electron nào cả",
        "Hạt nhân khí hiếm không có proton",
        "Khí hiếm luôn ở trạng thái plasma"
       ],
       "ex": "Theo quy tắc octet, lớp electron ngoài cùng của khí hiếm đã đầy (2 với heli, 8 với neon…) nên chúng không cần nhận, cho hay dùng chung electron nữa."
      },
      {
       "q": "Trong bảng tuần hoàn, các nguyên tố cùng một nhóm (cột) thường có tính chất hoá học giống nhau vì:",
       "ans": "Có số electron lớp ngoài cùng bằng nhau",
       "wrong": [
        "Có khối lượng nguyên tử gần bằng nhau",
        "Có số lớp electron hoàn toàn bằng nhau",
        "Đều là kim loại hoặc đều là phi kim"
       ],
       "ex": "Tính chất hoá học quyết định chủ yếu bởi electron lớp ngoài cùng; cùng nhóm nghĩa là cùng số electron hoá trị nên cách phản ứng tương tự nhau."
      },
      {
       "q": "Nước bể bơi thường có mùi đặc trưng và hơi xót mắt. Mùi đó liên quan tới chất nào được dùng khử trùng?",
       "ans": "Clo tan tạo chất có tính oxi hoá diệt khuẩn",
       "wrong": [
        "Oxi hoà tan trong nước bể bơi",
        "Muối khoáng tự nhiên trong nước",
        "Khí cacbonic từ hơi thở người bơi"
       ],
       "ex": "Clo được cho vào nước để diệt vi sinh vật gây bệnh; clo tác dụng với nước tạo chất oxi hoá mạnh, đồng thời để lại mùi đặc trưng nếu dư."
      },
      {
       "q": "Cồn 70° sát trùng tốt hơn cồn 96°, nghe ngược đời nhưng đúng. Vì sao?",
       "ans": "Cồn quá đặc làm đông vón bề mặt, khó thấm sâu",
       "wrong": [
        "Cồn 96° bay hơi chậm hơn cồn 70°",
        "Cồn 70° chứa nhiều chất diệt khuẩn lạ",
        "Cồn 96° thực chất loãng hơn cồn 70°"
       ],
       "ex": "Cồn quá đặc làm protein ở bề mặt tế bào vi khuẩn đông vón ngay, tạo vỏ cứng ngăn cồn thấm vào trong; cồn 70° có thêm nước nên thấm qua màng tốt hơn và diệt khuẩn hiệu quả hơn."
      },
      {
       "q": "Thép (sắt pha thêm cacbon) cứng hơn hẳn sắt nguyên chất. Nguyên tử cacbon đã làm gì trong thép?",
       "ans": "Chen vào mạng sắt làm các lớp khó trượt",
       "wrong": [
        "Biến sắt thành một nguyên tố mới",
        "Làm sắt nhẹ đi nên cứng hơn",
        "Tạo lớp vỏ cacbon bọc ngoài thanh sắt"
       ],
       "ex": "Các nguyên tử cacbon nhỏ chen vào khe của mạng tinh thể sắt, cản trở các lớp nguyên tử trượt lên nhau — hợp kim vì thế cứng và bền hơn kim loại nguyên chất."
      },
      {
       "q": "Mở nắp chai nước ngọt có ga nghe tiếng “xì” và thấy bọt sủi mạnh. Giải thích đúng là:",
       "ans": "CO₂ hoà tan dưới áp suất, mở nắp áp suất giảm đột ngột",
       "wrong": [
        "Nước ngọt lên men sinh thêm khí khi mở nắp",
        "Không khí bên ngoài tràn vào tạo bọt",
        "CO₂ chỉ sinh ra khi gặp ánh sáng"
       ],
       "ex": "Trong chai kín, CO₂ bị nén hoà tan nhiều vào nước theo cân bằng hoá học. Mở nắp, áp suất giảm đột ngột, cân bằng dịch chuyển và CO₂ thoát ra thành bọt khí."
      },
      {
       "q": "Đá khô (CO₂ rắn) để ngoài không khí “bốc khói” rồi biến mất mà không để lại vệt nước. Đó là hiện tượng:",
       "ans": "Thăng hoa: chuyển thẳng từ rắn sang khí",
       "wrong": [
        "Nóng chảy rồi bay hơi rất nhanh",
        "Phản ứng hoá học với oxi trong không khí",
        "Đá khô thực chất là khói đóng băng"
       ],
       "ex": "Ở áp suất thường, CO₂ rắn không qua trạng thái lỏng mà chuyển thẳng thành khí — sự thăng hoa. “Khói” trắng là hơi nước trong không khí bị lạnh ngưng tụ quanh vùng khí CO₂ lạnh."
      },
      {
       "q": "Mỡ động vật để nguội đông đặc thành khối, còn dầu thực vật vẫn lỏng. Khác biệt này do:",
       "ans": "Mỡ giàu chất béo no nên nhiệt độ nóng chảy cao",
       "wrong": [
        "Dầu thực vật chứa nhiều nước hơn mỡ",
        "Mỡ động vật có thêm protein nên đông lại",
        "Dầu thực vật nhẹ hơn nên không đông được"
       ],
       "ex": "Chất béo no có mạch thẳng, các phân tử xếp khít nhau nên cần nhiều nhiệt mới tách ra được; chất béo không no có mạch cong, xếp lỏng lẻo nên nóng chảy ở nhiệt độ thấp hơn."
      },
      {
       "q": "Nước cất để lâu trong chai đã mở nắp dần có tính axit rất nhẹ. Thủ phạm là:",
       "ans": "CO₂ trong không khí tan vào tạo axit yếu",
       "wrong": [
        "Bụi trong không khí rơi vào chai",
        "Nước tự phân huỷ thành axit theo thời gian",
        "Chai nhựa thôi ra axit vào nước"
       ],
       "ex": "CO₂ trong không khí tan vào nước và tạo axit cacbonic yếu theo cân bằng hoá học; nước tinh khiết để tiếp xúc không khí lâu ngày sẽ hơi chua (pH dưới 7 một chút)."
      },
      {
       "q": "Mở nắp chai sâm-panh nghe tiếng “bốp”, miệng chai có hơi lạnh toả ra. Hơi lạnh đến từ đâu?",
       "ans": "Khí nén giãn nở đột ngột, thu nhiệt nên lạnh",
       "wrong": [
        "Chai được ướp lạnh nên khí cũng lạnh theo",
        "CO₂ phản ứng với không khí sinh hơi lạnh",
        "Hơi lạnh là do rượu bay hơi mang theo"
       ],
       "ex": "Khí CO₂ bị nén trong chai giãn nở rất nhanh khi mở nắp; quá trình giãn nở đột ngột làm khí mất năng lượng và hạ nhiệt độ, đồng thời hơi nước ngưng tụ thành làn khói mỏng."
      },
      {
       "q": "Đồ bạc để lâu bị xỉn đen, còn đồ vàng thì không. Lớp đen trên bạc là do:",
       "ans": "Bạc tạo lớp sunfua đen với lưu huỳnh không khí",
       "wrong": [
        "Bạc bị oxi hoá thành oxit đen như sắt gỉ",
        "Bụi bẩn bám lâu ngày thành lớp đen",
        "Bạc phản ứng với ánh sáng mặt trời"
       ],
       "ex": "Trong không khí luôn có vết hợp chất lưu huỳnh; bạc phản ứng tạo bạc sunfua (Ag₂S) màu đen bám trên bề mặt. Vàng trơ hơn nhiều nên không bị hiện tượng này."
      },
      {
       "q": "Một quảng cáo rao “vòng tay đá năng lượng phát ion âm giúp ngủ ngon, chữa đau nhức”. Cách kiểm chứng khoa học nhất là:",
       "ans": "Đo thực tế và so với vòng thường, che nhãn",
       "wrong": [
        "Đọc bình luận của người đã mua vòng",
        "Hỏi người bán về nguồn gốc của đá",
        "Tin vì đá là vật liệu hoàn toàn tự nhiên"
       ],
       "ex": "Muốn biết vòng có thật sự phát ion hay cải thiện giấc ngủ không, phải đo bằng thiết bị và so sánh có đối chứng, che nhãn để tránh hiệu ứng tâm lí — cảm nhận cá nhân không đủ làm bằng chứng."
      },
      {
       "q": "Nhiệt kế thuỷ ngân cũ bị vỡ rất nguy hiểm, dù lượng thuỷ ngân chỉ nhỏ bằng hạt đậu. Vì sao?",
       "ans": "Thuỷ ngân bay hơi ở nhiệt độ thường, hơi rất độc",
       "wrong": [
        "Thuỷ ngân cháy được trong không khí",
        "Thuỷ ngân phóng xạ nhẹ nên gây hại",
        "Thuỷ ngân ăn mòn được mọi vật liệu"
       ],
       "ex": "Thuỷ ngân là kim loại duy nhất lỏng ở nhiệt độ thường và bay hơi đáng kể; hơi thuỷ ngân không màu không mùi nhưng rất độc cho hệ thần kinh khi hít phải lâu dài."
      },
      {
       "q": "Đun nước lâu ngày, đáy ấm siêu tốc bám lớp cặn trắng. Lớp cặn đó chủ yếu là:",
       "ans": "Muối canxi/magie trong nước cứng kết tủa khi đun",
       "wrong": [
        "Bụi từ không khí lắng xuống đáy ấm",
        "Cặn của chính kim loại làm ấm bị bong ra",
        "Muối ăn có sẵn trong nước máy kết tinh"
       ],
       "ex": "Nước máy chứa ion canxi và magie hoà tan; khi đun nóng chúng kết tủa thành muối cacbonat bám vào đáy ấm — đó là dấu hiệu của nước cứng."
      }
     ],
     "blank": [
      {
       "pre": "Kim cương và than chì là hai dạng",
       "ans": "thù hình",
       "post": " của cacbon: cùng một nguyên tố nhưng cấu trúc khác nhau.",
       "wrong": [
        "đồng vị",
        "đồng phân tử",
        "đồng đẳng"
       ],
       "ex": "Thù hình là các dạng đơn chất khác nhau của cùng một nguyên tố, khác nhau ở cách sắp xếp nguyên tử — như kim cương/than chì của cacbon, oxi/khí ozon của oxi."
      },
      {
       "pre": "Hiện tượng các phân tử tự lan truyền và trộn đều vào nhau gọi là sự",
       "ans": "khuếch tán",
       "post": ".",
       "wrong": [
        "đối lưu",
        "bốc hơi",
        "ngưng tụ"
       ],
       "ex": "Khuếch tán xảy ra nhờ chuyển động nhiệt không ngừng của phân tử; nhiệt độ càng cao, khuếch tán càng nhanh."
      },
      {
       "pre": "Đá khô chuyển thẳng từ thể rắn sang thể khí, hiện tượng đó gọi là sự",
       "ans": "thăng hoa",
       "post": ".",
       "wrong": [
        "nóng chảy",
        "hoá hơi",
        "đông đặc"
       ],
       "ex": "Thăng hoa là chuyển thể trực tiếp rắn → khí, bỏ qua trạng thái lỏng; băng phiến (long não) cũng thăng hoa dần trong tủ quần áo."
      },
      {
       "pre": "Trong liên kết kim loại, các electron hoá trị trở thành electron",
       "ans": "tự do",
       "post": ", di chuyển trong toàn bộ khối kim loại.",
       "wrong": [
        "dùng chung",
        "cố định",
        "trung hoà"
       ],
       "ex": "Chính “biển” electron tự do này giúp kim loại dẫn điện, dẫn nhiệt và dễ biến dạng mà không gãy."
      },
      {
       "pre": "Kim loại bị kéo thành sợi hay dát thành lá mỏng mà không nứt là nhờ tính",
       "ans": "dẻo",
       "post": " của kim loại.",
       "wrong": [
        "cứng",
        "giòn",
        "xốp"
       ],
       "ex": "Tính dẻo của kim loại đến từ khả năng các lớp nguyên tử trượt lên nhau trong khi biển electron vẫn giữ chúng liên kết."
      },
      {
       "pre": "Phân tử xà phòng gồm một đầu ưa nước và một đầu",
       "ans": "kị nước",
       "post": " bám vào dầu mỡ.",
       "wrong": [
        "ưa nước",
        "trung tính",
        "dễ bay hơi"
       ],
       "ex": "Đầu kị nước (ưa dầu) chui vào vết bẩn dầu mỡ, đầu ưa nước hướng ra ngoài — nhờ đó xà phòng “bắt cầu” giữa dầu và nước."
      },
      {
       "pre": "Mỗi nguyên tố hoá học được xác định duy nhất bởi số",
       "ans": "proton",
       "post": " trong hạt nhân nguyên tử.",
       "wrong": [
        "nơtron",
        "electron",
        "lớp vỏ"
       ],
       "ex": "Số proton = số hiệu nguyên tử Z. Thay đổi số proton nghĩa là biến thành nguyên tố khác; thay đổi số nơtron chỉ tạo đồng vị."
      },
      {
       "pre": "Muối ăn tan được trong nước vì nước là dung môi",
       "ans": "phân cực",
       "post": ", tách được các ion khỏi tinh thể.",
       "wrong": [
        "không phân cực",
        "hữu cơ",
        "dễ cháy"
       ],
       "ex": "Nguyên tắc gần đúng: chất phân cực/ion tan tốt trong dung môi phân cực như nước; chất không phân cực tan tốt trong dung môi không phân cực như xăng, dầu."
      },
      {
       "pre": "Sắt bị ăn mòn trong không khí ẩm tạo thành lớp",
       "ans": "gỉ sắt",
       "post": " màu nâu đỏ, xốp và dễ bong.",
       "wrong": [
        "oxit nhôm",
        "sunfua sắt",
        "cacbonat đồng"
       ],
       "ex": "Gỉ sắt xốp, không bảo vệ được lớp sắt bên trong nên sắt cứ bị ăn mòn tiếp — khác hẳn lớp oxit bền, chặt của nhôm."
      },
      {
       "pre": "Nhựa PE, PVC được tạo thành từ rất nhiều đơn vị nhỏ giống nhau gọi là",
       "ans": "monome",
       "post": ", liên kết nối tiếp thành chuỗi dài.",
       "wrong": [
        "nguyên tử",
        "ion",
        "phân tử nước"
       ],
       "ex": "Phản ứng trùng hợp nối hàng nghìn phân tử monome thành một phân tử polymer khổng lồ — đó là cách tạo ra hầu hết chất dẻo quanh ta."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Một vật nặng hơn thì luôn chứa nhiều nguyên tử hơn một vật nhẹ hơn.",
       "truth": false,
       "explain": "Sai. Số nguyên tử còn tuỳ nguyên tử nặng hay nhẹ: 1 kg vàng chứa ít nguyên tử hơn hẳn 1 kg nhôm, vì mỗi nguyên tử vàng nặng hơn nhiều."
      },
      {
       "stmt": "Đun nóng chất khí đựng trong bình kín thì áp suất tăng vì các phân tử chuyển động nhanh hơn và va đập mạnh hơn.",
       "truth": true,
       "explain": "Đúng. Nhiệt độ tăng làm phân tử khí chuyển động nhanh hơn, va vào thành bình mạnh và thường xuyên hơn nên áp suất tăng."
      },
      {
       "stmt": "Trong lúc nước đá đang tan trong cốc nước 0°C, nhiệt độ của hỗn hợp tăng dần đều.",
       "truth": false,
       "explain": "Sai. Nhiệt cung cấp trong giai đoạn này dùng để phá vỡ cấu trúc tinh thể đá (nhiệt nóng chảy), nhiệt độ hỗn hợp giữ ở 0°C cho tới khi đá tan hết."
      },
      {
       "stmt": "Các đồng vị của cùng một nguyên tố có số proton khác nhau.",
       "truth": false,
       "explain": "Sai. Đồng vị có cùng số proton (cùng nguyên tố) nhưng khác số nơtron nên khối lượng khác nhau."
      },
      {
       "stmt": "Nhôm không bị ăn mòn vì nhôm hoàn toàn không phản ứng với oxi.",
       "truth": false,
       "explain": "Sai. Nhôm phản ứng với oxi rất nhanh nhưng sản phẩm là lớp oxit mỏng, bền, bám chặt, che chắn cho phần nhôm bên trong."
      },
      {
       "stmt": "Nước sôi ở nhiệt độ cao bất thường so với nhiều chất tương tự nhờ liên kết hydrogen giữa các phân tử nước.",
       "truth": true,
       "explain": "Đúng. Liên kết hydrogen giữ các phân tử nước với nhau khá chặt, cần nhiều năng lượng mới tách chúng ra thành hơi."
      },
      {
       "stmt": "Hoà tan càng nhiều chất vào nước thì dung dịch thu được càng dẫn điện tốt.",
       "truth": false,
       "explain": "Sai. Dung dịch đường (saccarozơ) dù rất đậm đặc cũng hầu như không dẫn điện, vì đường tan dưới dạng phân tử trung hoà chứ không tạo ion."
      },
      {
       "stmt": "Kim loại dẫn nhiệt tốt vì các electron tự do truyền năng lượng đi khắp khối kim loại.",
       "truth": true,
       "explain": "Đúng. Electron tự do di chuyển nhanh và mang theo năng lượng nhiệt, nên kim loại nóng đều rất nhanh — đó là lí do cán nồi thường bọc nhựa cách nhiệt."
      },
      {
       "stmt": "Băng phiến để trong tủ quần áo lâu ngày nhỏ dần đi dù không hề chảy thành nước, đó là do thăng hoa.",
       "truth": true,
       "explain": "Đúng. Băng phiến (naphtalen) chuyển thẳng từ thể rắn sang thể hơi ở nhiệt độ thường — cùng hiện tượng thăng hoa như đá khô, nên viên băng “hao” dần mà tủ vẫn khô ráo."
      },
      {
       "stmt": "Mọi nguyên tử đều có số nơtron đúng bằng số proton.",
       "truth": false,
       "explain": "Sai. Chỉ một số nguyên tử nhẹ mới gần bằng nhau; nguyên tử càng nặng càng cần nhiều nơtron hơn proton để hạt nhân bền (ví dụ urani-238 có 92 proton nhưng tới 146 nơtron)."
      },
      {
       "stmt": "Glucose và tinh bột đều là carbohydrate, nhưng chỉ glucose là đường đơn.",
       "truth": true,
       "explain": "Đúng. Glucose là monosaccarit (đường đơn); tinh bột là polisaccarit do hàng nghìn đơn vị glucose nối lại."
      },
      {
       "stmt": "Vàng cũng bị gỉ như sắt khi để lâu ngoài trời ẩm.",
       "truth": false,
       "explain": "Sai. Vàng là kim loại quý rất trơ về hoá học, hầu như không phản ứng với oxi và hơi ẩm nên giữ được độ sáng bóng hàng nghìn năm."
      },
      {
       "stmt": "Khi muối tan trong nước, mỗi ion được bao quanh bởi một lớp phân tử nước.",
       "truth": true,
       "explain": "Đúng. Các phân tử nước phân cực vây quanh ion, đầu mang điện trái dấu hướng vào ion — quá trình này gọi là sự hydrat hoá, giúp muối tan và dung dịch dẫn điện."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Nguyên tắc xuyên suốt: CẤU TRÚC quyết định TÍNH CHẤT. Hỏi “vì sao vật liệu này cứng/mềm/dẫn điện?” hãy tìm cách sắp xếp nguyên tử và loại liên kết.",
      "Thấy kim loại dẫn điện, dẫn nhiệt, dễ dát mỏng — nghĩ ngay tới electron tự do trong liên kết kim loại.",
      "Hiện tượng ở cấp độ mắt thường (nở vì nhiệt, khuếch tán mùi, điểm sôi cao) đều truy được về chuyển động và tương tác giữa các phân tử.",
      "Gặp tuyên bố “vật liệu thần kỳ” (vòng đá năng lượng, nước từ trường…): đòi số liệu đo được và phép so sánh có đối chứng trước khi tin."
     ],
     "facts": [
      {
       "q": "Vì sao bóng bay bơm căng để ngoài nắng gắt dễ bị nổ hơn để trong bóng râm?",
       "a": "Khí nở ra và áp suất tăng khi nóng lên",
       "ex": "Nắng làm khí trong bóng nóng lên, phân tử chuyển động mạnh và thể tích khí đòi tăng; vỏ bóng căng hết cỡ sẽ vỡ."
      },
      {
       "q": "Vì sao kim loại natri phải bảo quản ngập trong dầu hoả?",
       "a": "Natri phản ứng mạnh với nước và không khí",
       "ex": "Natri là kim loại kiềm hoạt động rất mạnh: gặp nước phản ứng mãnh liệt, để ngoài không khí cũng nhanh bị oxi hoá, nên phải cách ly bằng dầu hoả."
      }
     ],
     "pairs": [
      [
       "Kim cương",
       "mạng tinh thể ba chiều, rất cứng"
      ],
      [
       "Than chì",
       "cấu trúc lớp, mềm và dẫn điện"
      ],
      [
       "Liên kết ion",
       "electron chuyển hẳn sang nguyên tử khác"
      ],
      [
       "Liên kết cộng hoá trị",
       "hai nguyên tử dùng chung cặp electron"
      ],
      [
       "Thăng hoa",
       "rắn chuyển thẳng thành khí"
      ],
      [
       "Thù hình",
       "các dạng đơn chất khác nhau của một nguyên tố"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-thpt-nangluong",
    "emoji": "🌊",
    "name": "Năng lượng, điện và sóng",
    "sub": "Từ rơi tự do, sóng âm tới hạt nhân: năng lượng biến đổi thế nào?",
    "pools": {
     "choose": [
      {
       "q": "Thả rơi một quả bóng từ trên cao, càng rơi nó càng nhanh. Vì sao?",
       "ans": "Trọng lực liên tục sinh công làm tăng động năng",
       "wrong": [
        "Quả bóng nhẹ dần trong lúc rơi",
        "Không khí đẩy quả bóng đi nhanh hơn",
        "Trái Đất hút mạnh hơn khi vật ở gần mặt đất rất nhiều"
       ],
       "ex": "Trọng lực sinh công suốt quãng đường rơi, công đó biến thành động năng nên vận tốc của bóng tăng dần đều."
      },
      {
       "q": "Xe đạp đang xuống dốc, không đạp mà xe vẫn tăng tốc. Sách năng lượng nào đang diễn ra?",
       "ans": "Thế năng chuyển dần thành động năng khi xuống dốc",
       "wrong": [
        "Động năng tự sinh ra do ma sát với đường",
        "Thế năng tăng lên vì xe đi nhanh hơn",
        "Năng lượng mất đi hoàn toàn khi xuống dốc"
       ],
       "ex": "Ở trên cao xe có thế năng hấp dẫn lớn; khi xuống dốc độ cao giảm, thế năng chuyển hoá thành động năng làm xe nhanh dần."
      },
      {
       "q": "Đạp phanh xe đạp một lúc lâu khi xuống dốc dài, má phanh và vành bánh xe nóng lên rõ rệt. Vì sao?",
       "ans": "Ma sát biến động năng thành nhiệt năng",
       "wrong": [
        "Phanh xe sinh ra lửa do phản ứng hoá học",
        "Nhiệt từ mặt đường truyền ngược lên bánh xe",
        "Động năng biến mất không để lại dấu vết"
       ],
       "ex": "Lực ma sát ở má phanh làm công cản chuyển động; phần động năng bị mất chuyển thành nhiệt năng làm nóng vành và má phanh."
      },
      {
       "q": "Hai xe giống hệt nhau chạy 30 km/h và 60 km/h cùng phanh gấp. Quãng đường phanh của xe 60 km/h so với xe 30 km/h thì:",
       "ans": "Dài hơn khoảng bốn lần, không phải gấp đôi",
       "wrong": [
        "Dài hơn đúng gấp đôi",
        "Bằng nhau vì cùng một loại xe",
        "Ngắn hơn vì xe đi nhanh phanh ăn hơn"
       ],
       "ex": "Động năng tỉ lệ với bình phương vận tốc: gấp đôi vận tốc là gấp bốn động năng, phanh phải triệt tiêu năng lượng gấp bốn nên quãng đường trượt dài hơn nhiều."
      },
      {
       "q": "Súng trường khi bắn thì giật mạnh về phía sau. Hiện tượng này là hệ quả của:",
       "ans": "Động lượng bảo toàn: đạn đi trước, súng lùi sau",
       "wrong": [
        "Khí thuốc súng đẩy súng về phía sau mà thôi",
        "Người bắn luôn ngả người ra sau theo phản xạ",
        "Đạn nhẹ nên súng phải nặng thêm phía sau"
       ],
       "ex": "Trước khi bắn tổng động lượng bằng 0. Đạn bay về trước mang động lượng dương nên súng phải lùi về sau với động lượng ngược lại để tổng vẫn bằng 0."
      },
      {
       "q": "Xe máy vào cua nhanh mà không nghiêng theo cua rất dễ văng ra ngoài. Lực nào đang “thiếu” ở đây?",
       "ans": "Cần lực hướng tâm kéo xe đổi hướng liên tục",
       "wrong": [
        "Lực ma sát biến mất khi xe chạy nhanh",
        "Trọng lực giảm đi khi xe vào cua",
        "Lực đẩy của động cơ về phía trước"
       ],
       "ex": "Muốn đi theo đường cong, xe cần một lực hướng vào tâm cua (do ma sát và phản lực mặt đường tạo thành khi nghiêng xe). Thiếu lực này, xe theo quán tính lao thẳng ra ngoài."
      },
      {
       "q": "Tên lửa bay được ngay cả trong chân không vũ trụ, nơi không có không khí để “đẩy”. Vì sao?",
       "ans": "Khí phụt ra sau tạo phản lực đẩy về trước",
       "wrong": [
        "Tên lửa đẩy vào trường hấp dẫn của Trái Đất",
        "Không khí loãng vẫn đủ để cánh tên lửa bám vào",
        "Tên lửa nhẹ hơn không khí nên tự bay lên"
       ],
       "ex": "Theo định luật III Newton và bảo toàn động lượng: khí cháy phụt mạnh về sau mang động lượng âm, tên lửa nhận động lượng dương tiến về trước — không cần không khí bên ngoài."
      },
      {
       "q": "Các cây cầu dài luôn có khe hở ở hai đầu và đặt trên con lăn. Người ta chừa khe đó để làm gì?",
       "ans": "Vật liệu nở ra khi nóng, cần chỗ cho sự nở",
       "wrong": [
        "Để nước mưa thoát xuống nhanh hơn",
        "Để cầu nhẹ đi và tiết kiệm thép",
        "Để xe chạy qua tạo tiếng kêu cảnh báo"
       ],
       "ex": "Thép và bê tông nở dài khi trời nóng, co lại khi lạnh. Không có khe co giãn, cầu sẽ nứt hoặc cong vênh khi nhiệt độ thay đổi theo mùa."
      },
      {
       "q": "Thấy tia chớp loé lên rồi mấy giây sau mới nghe tiếng sấm. Kết luận đúng nhất là:",
       "ans": "Ánh sáng truyền nhanh hơn âm thanh rất nhiều",
       "wrong": [
        "Tiếng sấm sinh ra sau tia chớp vài giây",
        "Mây ở rất cao nên âm thanh đi đường vòng",
        "Tai người phản ứng chậm hơn mắt người"
       ],
       "ex": "Chớp và sấm sinh ra cùng lúc, nhưng ánh sáng đi gần 300.000 km/s còn âm thanh chỉ khoảng 340 m/s, nên ta thấy chớp gần như tức thì và nghe sấm muộn hơn (mỗi 3 giây chậm ≈ 1 km)."
      },
      {
       "q": "Phòng hoà nhạc và rạp chiếu phim thường ốp tường bằng vật liệu mềm, xốp, nhiều lỗ. Mục đích là:",
       "ans": "Vật liệu xốp hấp thụ âm, giảm tiếng vang dội",
       "wrong": [
        "Vật liệu xốp làm âm thanh to và rõ hơn",
        "Ốp mềm để cách nhiệt cho phòng kín",
        "Tường cứng sẽ làm hỏng loa của rạp"
       ],
       "ex": "Âm thanh dội qua lại giữa các tường cứng tạo tiếng vang kéo dài, nghe chồng chéo. Vật liệu xốp hút năng lượng sóng âm nên tiếng nghe gọn và rõ."
      },
      {
       "q": "Siết căng dây đàn ghita hơn rồi gảy, âm phát ra cao hơn. Vì sao?",
       "ans": "Dây căng rung nhanh hơn, tần số lớn hơn",
       "wrong": [
        "Dây căng dài ra nên âm trầm xuống",
        "Dây căng nhẹ hơn nên bay âm đi xa",
        "Âm cao thấp chỉ phụ thuộc vào thùng đàn"
       ],
       "ex": "Độ cao của âm do tần số quyết định. Dây càng căng, dao động càng nhanh, tần số càng lớn nên âm càng cao (trong khi độ to phụ thuộc biên độ dao động)."
      },
      {
       "q": "Máy siêu âm ở bệnh viện “nhìn” được thai nhi mà không dùng tia X. Sóng siêu âm làm được việc đó vì:",
       "ans": "Siêu âm là sóng cơ phản xạ trên ranh giới các mô",
       "wrong": [
        "Siêu âm là ánh sáng đặc biệt nhìn xuyên qua da",
        "Siêu âm làm cơ thể phát ra hình ảnh",
        "Siêu âm truyền qua mọi vật mà không phản xạ"
       ],
       "ex": "Sóng siêu âm gặp bề mặt phân cách giữa các mô khác nhau sẽ phản xạ một phần; máy thu sóng phản xạ và dựng thành hình ảnh, gần giống cách dơi và cá heo định vị."
      },
      {
       "q": "Chim đậu trên một dây điện cao thế trần mà không bị điện giật. Lí do chính là:",
       "ans": "Không có hiệu điện thế đáng kể giữa hai chân chim",
       "wrong": [
        "Chân chim có lớp sừng cách điện tuyệt đối",
        "Dây cao thế không có dòng điện chạy qua",
        "Chim nhẹ nên dòng điện bỏ qua cơ thể chim"
       ],
       "ex": "Dòng điện chỉ chạy khi có hiệu điện thế. Hai chân chim bám trên cùng một dây, cách nhau vài xăngtimét nên điện thế gần như bằng nhau — không có dòng điện đáng kể qua thân chim."
      },
      {
       "q": "Điện từ nhà máy được tăng lên hàng trăm nghìn vôn trước khi truyền đi xa, về gần nhà dân mới hạ xuống. Tăng áp như vậy để:",
       "ans": "Tăng điện áp giúp giảm dòng điện và hao phí nhiệt",
       "wrong": [
        "Điện áp cao chạy nhanh hơn điện áp thấp",
        "Điện áp cao làm dây dẫn bền hơn",
        "Nhà máy chỉ phát ra điện áp cao mà thôi"
       ],
       "ex": "Cùng một công suất, điện áp càng cao thì dòng điện càng nhỏ. Hao phí toả nhiệt trên dây tỉ lệ với bình phương dòng điện nên giảm dòng là cách giảm hao phí hiệu quả nhất."
      },
      {
       "q": "Bật cùng lúc bếp điện, ấm siêu tốc và máy lạnh, aptomat (cầu dao tự động) bị nhảy. Vì sao?",
       "ans": "Dòng điện tổng vượt mức, dây nóng lên nguy hiểm",
       "wrong": [
        "Các thiết bị tranh nhau điện nên aptomat ngắt",
        "Aptomat nhảy ngẫu nhiên để tự kiểm tra",
        "Điện áp trong nhà tăng vọt quá cao"
       ],
       "ex": "Các thiết bị mắc song song nên dòng tổng cộng dồn lại; vượt định mức thì dây dẫn nóng lên có thể cháy cách điện. Aptomat ngắt mạch để bảo vệ."
      },
      {
       "q": "Sạc nhanh điện thoại một lúc, cả cục sạc và máy đều ấm lên. Phần năng lượng “thất thoát” đó đã đi đâu?",
       "ans": "Một phần điện năng biến thành nhiệt do điện trở",
       "wrong": [
        "Điện năng biến mất trong quá trình sạc",
        "Pin đẩy ngược điện năng ra ngoài thành nhiệt",
        "Nhiệt là do tay người cầm máy truyền vào"
       ],
       "ex": "Dòng điện chạy qua điện trở của mạch sạc và pin luôn toả nhiệt (hiệu ứng Jun–Lenxơ). Sạc càng nhanh, dòng càng lớn, nhiệt toả ra càng nhiều."
      },
      {
       "q": "Đốt một thanh củi, lửa toả nhiệt làm ấm cả phòng. Xét cân bằng năng lượng của phản ứng cháy:",
       "ans": "Tổng năng lượng sản phẩm thấp hơn chất phản ứng",
       "wrong": [
        "Phản ứng cháy tạo ra năng lượng từ hư không",
        "Sản phẩm chứa nhiều năng lượng hơn chất đầu",
        "Nhiệt độ của ngọn lửa không liên quan năng lượng"
       ],
       "ex": "Phản ứng toả nhiệt có biến thiên enthalpy âm: năng lượng hoá học dự trữ trong củi và oxi lớn hơn trong tro, CO₂ và nước, phần chênh lệch thoát ra dạng nhiệt và ánh sáng."
      },
      {
       "q": "Cùng một lượng than, than nghiền nhỏ cháy nhanh và mạnh hơn than cục lớn. Yếu tố nào đã thay đổi?",
       "ans": "Diện tích tiếp xúc với oxi lớn hơn",
       "wrong": [
        "Than nhỏ chứa nhiều năng lượng hơn than lớn",
        "Than nghiền có thêm chất xúc tác tự nhiên",
        "Than cục không cháy được ở nhiệt độ thường"
       ],
       "ex": "Nghiền nhỏ làm tăng mạnh diện tích bề mặt tiếp xúc với oxi trong không khí — một trong các yếu tố quyết định tốc độ phản ứng cháy."
      },
      {
       "q": "Thức ăn để trong tủ lạnh lâu hỏng hơn để ngoài trời ấm. Lạnh làm chậm “cái gì”?",
       "ans": "Nhiệt độ thấp làm chậm tốc độ phản ứng phân huỷ",
       "wrong": [
        "Lạnh tiêu diệt hết vi khuẩn trong thức ăn",
        "Lạnh làm thức ăn mất hết nước nên không hỏng",
        "Lạnh ngăn không cho oxi chạm vào thức ăn"
       ],
       "ex": "Hạ nhiệt độ làm giảm tốc độ hầu hết phản ứng hoá học và hoạt động của vi sinh vật gây hỏng thức ăn. Tủ lạnh chỉ làm chậm chứ không dừng hẳn quá trình phân huỷ."
      },
      {
       "q": "Nhà máy sản xuất amoniac (nguyên liệu làm phân đạm) phải nén hỗn hợp khí ở áp suất rất cao. Áp suất cao giúp:",
       "ans": "Đẩy cân bằng về phía tạo ra ít phân tử khí hơn",
       "wrong": [
        "Làm cho khí nhẹ đi và dễ cháy hơn",
        "Ép các phân tử khí dính chặt vĩnh viễn",
        "Giảm nhiệt độ của phản ứng xuống thấp"
       ],
       "ex": "Phản ứng N₂ + 3H₂ ⇌ 2NH₃: vế phải có ít phân tử khí hơn (2 so với 4). Theo nguyên lí Le Chatelier, tăng áp suất làm cân bằng dịch chuyển sang phía ít khí hơn, tạo nhiều amoniac hơn."
      },
      {
       "q": "Khi sạc một chiếc pin, ta đang ép pin xảy ra điều mà lúc dùng pin nó tự chạy ngược lại. Quá trình sạc thuộc loại nào?",
       "ans": "Dùng điện năng ép phản ứng chạy ngược chiều tự phát",
       "wrong": [
        "Phản ứng tự phát sinh ra điện năng như khi xả",
        "Pin được nạp thêm electron từ ổ cắm vào vỏ",
        "Sạc pin thực chất là làm pin nóng lên"
       ],
       "ex": "Lúc xả, phản ứng hoá học tự phát sinh dòng điện. Khi sạc, dòng điện ngoài ép phản ứng chạy ngược (tương tự điện phân), khôi phục lại các chất ban đầu để pin dùng tiếp."
      },
      {
       "q": "Một nhà máy điện hạt nhân chỉ “đốt” lượng nhiên liệu rất nhỏ mà phát ra lượng điện khổng lồ. Vì sao?",
       "ans": "Mỗi phản ứng phân hạch giải phóng năng lượng rất lớn",
       "wrong": [
        "Urani cháy nóng hơn mọi nhiên liệu khác",
        "Lò hạt nhân không hề có hao phí năng lượng",
        "Điện hạt nhân lấy thêm năng lượng từ Mặt Trời"
       ],
       "ex": "Khi hạt nhân urani-235 phân hạch, một phần khối lượng biến thành năng lượng theo hệ thức E = mc². Mỗi phản ứng cho năng lượng lớn gấp hàng triệu lần một phản ứng cháy thông thường."
      },
      {
       "q": "Chất phóng xạ dùng trong chẩn đoán y học thường được chọn loại có chu kì bán rã ngắn (vài giờ). Lí do chính là:",
       "ans": "Hoạt độ giảm nhanh, giảm liều chiếu cho bệnh nhân",
       "wrong": [
        "Chất bán rã ngắn rẻ và dễ mua hơn",
        "Chất bán rã dài không phát ra tia nào cả",
        "Máy chụp chỉ đo được chất bán rã ngắn"
       ],
       "ex": "Chất đánh dấu cần phát tia đủ lâu để máy ghi hình, rồi phân rã nhanh hết để tổng liều phóng xạ bệnh nhân nhận là nhỏ nhất — cân bằng giữa chẩn đoán và an toàn."
      },
      {
       "q": "Lò vi sóng hâm nóng thức ăn “từ trong ra” khá đều, khác hẳn đun trên bếp. Cơ chế chính là:",
       "ans": "Vi sóng làm phân tử nước dao động mạnh, sinh nhiệt",
       "wrong": [
        "Vi sóng là tia nhiệt chiếu xuyên qua thức ăn",
        "Vi sóng làm nóng đĩa trước rồi truyền vào cơm",
        "Vi sóng phá vỡ phân tử thức ăn sinh nhiệt"
       ],
       "ex": "Vi sóng (sóng điện từ tần số cao) làm các phân tử nước — phân cực — trong thức ăn dao động cọ xát liên tục, biến năng lượng sóng thành nhiệt ngay trong khối thức ăn."
      },
      {
       "q": "Quạt điện và máy phát điện của nhà máy — cặp nào mô tả đúng chiều chuyển hoá năng lượng?",
       "ans": "Quạt: điện → cơ; máy phát: cơ → điện",
       "wrong": [
        "Cả hai đều biến điện năng thành cơ năng",
        "Cả hai đều biến cơ năng thành điện năng",
        "Quạt: cơ → điện; máy phát: điện → cơ"
       ],
       "ex": "Động cơ điện (quạt) dùng điện để quay; máy phát điện làm ngược lại: quay rôto bằng cơ năng (nước, hơi, gió) để sinh dòng điện nhờ hiện tượng cảm ứng điện từ."
      },
      {
       "q": "Đứng sát loa công suất lớn ở buổi biểu diễn, ta cảm thấy lồng ngực rung theo nhịp trống. Đó là bằng chứng của việc:",
       "ans": "Sóng âm cường độ lớn truyền năng lượng dao động mạnh",
       "wrong": [
        "Âm thanh đẩy không khí thành gió thổi liên tục",
        "Loa phát ra sóng điện từ làm rung cơ thể",
        "Tiếng trống làm thay đổi nhịp tim trực tiếp"
       ],
       "ex": "Sóng âm mang năng lượng; ở cường độ rất lớn, dao động áp suất không khí đủ mạnh để truyền sang cơ thể và ta “nghe” bằng cả lồng ngực chứ không chỉ bằng tai."
      },
      {
       "q": "Quảng cáo rao bán “phích cắm tiết kiệm 30% tiền điện, không cần thay đổi thói quen”. Điểm đáng ngờ nhất về mặt khoa học là:",
       "ans": "Không nêu cơ chế và số liệu đo độc lập nào",
       "wrong": [
        "Thiết bị tiết kiệm điện không thể có hình phích cắm",
        "Tiền điện không thể giảm quá 10% trong mọi trường hợp",
        "Sản phẩm bán trên mạng thì luôn là lừa đảo"
       ],
       "ex": "Điện năng tiêu thụ do các thiết bị trong nhà quyết định; một phích cắm thụ động không có cơ chế vật lí nào cắt giảm được, và quảng cáo không đưa ra phép đo kiểm chứng độc lập nào."
      }
     ],
     "blank": [
      {
       "pre": "Động năng của một vật tỉ lệ thuận với bình phương của",
       "ans": "vận tốc",
       "post": " của vật.",
       "wrong": [
        "khối lượng",
        "quãng đường",
        "thời gian"
       ],
       "ex": "Động năng Wđ = mv²/2: vận tốc tăng gấp đôi thì động năng tăng gấp bốn — lí do xe chạy càng nhanh càng nguy hiểm khi va chạm."
      },
      {
       "pre": "Khi vật rơi tự do (bỏ qua lực cản không khí), thế năng giảm dần còn",
       "ans": "động năng",
       "post": " tăng dần tương ứng.",
       "wrong": [
        "khối lượng",
        "trọng lượng",
        "áp suất"
       ],
       "ex": "Bỏ qua ma sát, cơ năng được bảo toàn: thế năng mất đi bao nhiêu thì động năng tăng thêm bấy nhiêu."
      },
      {
       "pre": "Đơn vị đo công suất là",
       "ans": "oát (W)",
       "post": ", cho biết tốc độ sinh công của một thiết bị.",
       "wrong": [
        "jun (J)",
        "niutơn (N)",
        "mét (m)"
       ],
       "ex": "Jun là đơn vị của công/năng lượng; oát = jun/giây là đơn vị công suất. Bóng đèn 100 W tiêu thụ 100 jun mỗi giây."
      },
      {
       "pre": "Sóng âm không truyền được trong",
       "ans": "chân không",
       "post": " vì sóng âm cần môi trường vật chất để lan truyền.",
       "wrong": [
        "nước",
        "không khí",
        "thép"
       ],
       "ex": "Sóng âm là sóng cơ — dao động của các phần tử môi trường; không có môi trường thì không có gì để dao động. Sóng điện từ thì khác, truyền được qua chân không."
      },
      {
       "pre": "Âm nghe cao hay thấp phụ thuộc vào",
       "ans": "tần số",
       "post": " của sóng âm.",
       "wrong": [
        "biên độ",
        "tốc độ truyền",
        "màu sắc âm"
       ],
       "ex": "Tần số lớn → âm cao (bổng); biên độ lớn → âm to. Hai đặc trưng này độc lập nhau: một âm có thể vừa nhỏ vừa cao."
      },
      {
       "pre": "Hao phí toả nhiệt trên dây truyền tải điện tỉ lệ với bình phương của",
       "ans": "cường độ dòng điện",
       "post": " chạy trong dây.",
       "wrong": [
        "điện áp nguồn",
        "chiều dài dây",
        "tiết diện dây"
       ],
       "ex": "Công suất hao phí P = I²R. Giảm dòng điện một nửa thì hao phí giảm bốn lần — đó là lí do phải tăng điện áp khi truyền tải xa."
      },
      {
       "pre": "Phản ứng toả nhiệt là phản ứng có biến thiên enthalpy",
       "ans": "âm (ΔH < 0)",
       "post": ".",
       "wrong": [
        "dương (ΔH > 0)",
        "bằng không",
        "không đổi dấu"
       ],
       "ex": "ΔH âm nghĩa là hệ mất năng lượng cho môi trường (toả nhiệt); ΔH dương là phản ứng thu nhiệt, như quá trình quang hợp tích trữ năng lượng."
      },
      {
       "pre": "Chất làm tăng tốc độ phản ứng nhưng bản thân không bị tiêu hao sau phản ứng gọi là chất",
       "ans": "xúc tác",
       "post": ".",
       "wrong": [
        "ức chế",
        "trung gian",
        "hoạt hoá"
       ],
       "ex": "Xúc tác mở đường phản ứng có năng lượng kích hoạt thấp hơn; nó tham gia vào các bước trung gian nhưng được hoàn lại ở cuối."
      },
      {
       "pre": "Hiện tượng sóng gặp mặt phân cách và quay trở lại môi trường cũ gọi là sự",
       "ans": "phản xạ",
       "post": " sóng.",
       "wrong": [
        "khúc xạ",
        "giao thoa",
        "nhiễu xạ"
       ],
       "ex": "Phản xạ sóng là cơ sở của gương, của sóng siêu âm y tế và của ra-đa; còn khúc xạ là sóng đổi hướng khi sang môi trường khác tốc độ."
      },
      {
       "pre": "Chu kì bán rã là thời gian để lượng chất phóng xạ đang có giảm xuống còn",
       "ans": "một nửa",
       "post": ".",
       "wrong": [
        "một phần tư",
        "không còn gì",
        "gấp đôi"
       ],
       "ex": "Sau mỗi chu kì bán rã, lượng chất còn một nửa của lúc trước: 100% → 50% → 25% → … giảm theo cấp số nhân chứ không mất hẳn sau hai chu kì."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Vật chuyển động thẳng đều trên mặt phẳng nằm ngang nhẵn thì động năng của vật không đổi.",
       "truth": true,
       "explain": "Đúng. Chuyển động thẳng đều nghĩa là vận tốc không đổi theo cả độ lớn, mà động năng chỉ phụ thuộc độ lớn vận tốc và khối lượng nên không đổi."
      },
      {
       "stmt": "Trọng lực sinh công bằng không khi vật di chuyển ngang mà độ cao không đổi.",
       "truth": true,
       "explain": "Đúng. Công của trọng lực chỉ phụ thuộc độ chênh lệch độ cao; di chuyển ngang, độ cao không đổi nên công bằng không."
      },
      {
       "stmt": "Âm thanh truyền trong thép nhanh hơn truyền trong không khí.",
       "truth": true,
       "explain": "Đúng. Âm truyền trong chất rắn thường nhanh hơn nhiều trong khí: trong thép khoảng 5.000 m/s, trong không khí chỉ khoảng 340 m/s."
      },
      {
       "stmt": "Mọi sóng đều cần môi trường vật chất mới truyền đi được.",
       "truth": false,
       "explain": "Sai. Sóng cơ cần môi trường, nhưng sóng điện từ (ánh sáng, sóng vô tuyến) truyền được qua chân không — đó là cách ánh sáng Mặt Trời đến được Trái Đất."
      },
      {
       "stmt": "Tăng vận tốc của vật lên gấp đôi thì động năng của nó tăng gấp đôi.",
       "truth": false,
       "explain": "Sai. Động năng tỉ lệ với bình phương vận tốc nên tăng gấp bốn lần khi vận tốc tăng gấp đôi."
      },
      {
       "stmt": "Chất xúc tác có thể làm một phản ứng vốn không thể xảy ra trở nên xảy ra được.",
       "truth": false,
       "explain": "Sai. Xúc tác chỉ làm phản ứng xảy ra nhanh hơn; phản ứng về mặt năng lượng không tự xảy ra được thì xúc tác cũng không thay đổi được điều đó."
      },
      {
       "stmt": "Với cùng một hiệu điện thế, dây dẫn có điện trở càng lớn thì dòng điện chạy qua càng nhỏ.",
       "truth": true,
       "explain": "Đúng. Theo định luật Ôm I = U/R: điện trở tăng thì dòng điện giảm tương ứng."
      },
      {
       "stmt": "Hiện tượng phóng xạ là quá trình tự phát, tốc độ phân rã không phụ thuộc nhiệt độ hay áp suất bên ngoài.",
       "truth": true,
       "explain": "Đúng. Phân rã phóng xạ do bản chất hạt nhân quyết định; nung nóng hay nén ép cũng không làm chất phóng xạ phân rã nhanh hay chậm đi."
      },
      {
       "stmt": "Mọi phản ứng hoá học khi xảy ra đều toả nhiệt ra môi trường.",
       "truth": false,
       "explain": "Sai. Có nhiều phản ứng thu nhiệt: ví dụ phân huỷ đá vôi nung vôi phải cung cấp nhiệt liên tục mới duy trì được."
      },
      {
       "stmt": "Khi sóng truyền đi, các phần tử của môi trường cũng di chuyển theo sóng tới nơi rất xa.",
       "truth": false,
       "explain": "Sai. Các phần tử môi trường chỉ dao động quanh vị trí cân bằng; cái truyền đi xa là năng lượng và trạng thái dao động, không phải vật chất."
      },
      {
       "stmt": "Hiệu suất của mọi máy móc thực tế đều nhỏ hơn 100%.",
       "truth": true,
       "explain": "Đúng. Luôn có một phần năng lượng hao phí thành nhiệt do ma sát, điện trở… nên năng lượng có ích thu được luôn nhỏ hơn năng lượng đưa vào."
      },
      {
       "stmt": "Với cùng một tốc độ truyền, sóng có tần số càng lớn thì bước sóng càng dài.",
       "truth": false,
       "explain": "Sai. Từ v = λf: tốc độ không đổi, tần số tăng thì bước sóng phải giảm — hai đại lượng tỉ lệ nghịch."
      },
      {
       "stmt": "Pin sạc được vì phản ứng hoá học bên trong pin có thể được điện năng “chạy ngược” khi nạp.",
       "truth": true,
       "explain": "Đúng. Khi sạc, dòng điện bên ngoài ép phản ứng diễn ra ngược chiều so với lúc phát điện, tích trữ lại năng lượng hoá học cho lần dùng sau."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Tách bạch hai khái niệm hay bị trộn: NĂNG LƯỢNG (có bao nhiêu jun) và CÔNG SUẤT (tiêu thụ bao nhiêu jun mỗi giây — oát). Bóng đèn sáng hơn vì công suất lớn, không phải vì “nhiều năng lượng hơn”.",
      "Hao phí truyền tải tỉ lệ với BÌNH PHƯƠNG dòng điện: muốn giảm hao phí, giảm dòng (tăng áp) hiệu quả hơn nhiều so với làm dây dày.",
      "Cân bằng hoá học là cân bằng ĐỘNG: khi điều kiện thay đổi (nhiệt độ, áp suất, nồng độ), cân bằng dịch chuyển theo chiều chống lại thay đổi đó (nguyên lí Le Chatelier).",
      "Gặp quảng cáo thiết bị “tiết kiệm điện thần kỳ”: kiểm tra bằng công tơ điện — đo điện năng tiêu thụ trước/sau trong điều kiện giống nhau, có thiết bị khác làm đối chứng."
     ],
     "facts": [
      {
       "q": "Vì sao truyền tải điện đi xa phải tăng điện áp lên rất cao?",
       "a": "Để giảm dòng điện và hao phí toả nhiệt",
       "ex": "Hao phí trên dây bằng I²R; tăng điện áp để cùng công suất thì dòng nhỏ đi, hao phí giảm theo bình phương của dòng."
      },
      {
       "q": "Cho viên đá lạnh vào cốc nước ấm, năng lượng nhiệt truyền theo chiều nào?",
       "a": "Từ nước ấm sang đá cho tới khi cân bằng nhiệt",
       "ex": "Nhiệt luôn tự truyền từ vật nóng hơn sang vật lạnh hơn; quá trình dừng khi hai vật bằng nhiệt độ — khi đó đá cũng đã tan hết hoặc nước đã lạnh xuống 0°C."
      }
     ],
     "pairs": [
      [
       "Động năng",
       "năng lượng vật có do chuyển động"
      ],
      [
       "Thế năng hấp dẫn",
       "năng lượng do vị trí trong trọng trường"
      ],
      [
       "Sóng dọc",
       "phần tử dao động song song hướng truyền"
      ],
      [
       "Sóng ngang",
       "phần tử dao động vuông góc hướng truyền"
      ],
      [
       "Chất xúc tác",
       "tăng tốc độ phản ứng, không bị tiêu hao"
      ],
      [
       "Phân hạch",
       "hạt nhân nặng vỡ thành các hạt nhẹ hơn"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-thpt-susong",
    "emoji": "🧫",
    "name": "Tế bào, di truyền và sinh thái",
    "sub": "Từ tế bào tới hệ sinh thái: sự sống vận hành và biến đổi ra sao?",
    "pools": {
     "choose": [
      {
       "q": "Tế bào thường chỉ nhỏ li ti chứ không lớn bằng quả bóng bàn. Giới hạn kích thước đó chủ yếu vì:",
       "ans": "Bề mặt trao đổi không đủ nuôi thể tích lớn",
       "wrong": [
        "Tế bào lớn sẽ nặng quá không di chuyển được",
        "Nhân tế bào không cho phép tế bào to ra",
        "Màng tế bào quá mỏng, dễ rách khi tế bào to"
       ],
       "ex": "Tế bào lấy chất và thải qua bề mặt. Thể tích (nhu cầu) tăng theo lũy thừa ba của kích thước, còn diện tích bề mặt (khả năng trao đổi) chỉ tăng theo lũy thừa hai — tế bào càng to càng “thiếu thở”."
      },
      {
       "q": "Lá cây thường mỏng, dẹt và xanh lục trải rộng. Hình dạng đó giúp cây tối ưu việc gì?",
       "ans": "Diện tích hứng sáng lớn, khí trao đổi dễ",
       "wrong": [
        "Lá nặng hơn để cành không bị gió quật",
        "Lá mỏng để côn trùng dễ ăn và thụ phấn hộ",
        "Màu xanh giúp lá ngụy trang trốn sâu bọ"
       ],
       "ex": "Lá mỏng dẹt tối đa hoá diện tích tiếp nhận ánh sáng cho quang hợp và rút ngắn đường khuếch tán của CO₂ tới lục lạp."
      },
      {
       "q": "Sau buổi tập nặng, huấn luyện viên khuyên ăn đủ thịt, trứng, sữa. Lời khuyên này dựa trên vai trò nào của protein?",
       "ans": "Protein là vật liệu xây dựng và sửa chữa cơ bắp",
       "wrong": [
        "Protein là nguồn năng lượng dự trữ chính của cơ",
        "Protein giúp cơ thể mát hơn khi vận động",
        "Protein thay thế hoàn toàn nước uống khi tập"
       ],
       "ex": "Cơ bắp bị tổn thương nhỏ li ti khi tập nặng; protein cung cấp axit amin để cơ thể tổng hợp lại mô cơ — đó là vai trò cấu trúc của protein."
      },
      {
       "q": "Ruột non của người dài vài mét, mặt trong lại chi chít lông nhung và vi nhung. Cấu trúc cầu kỳ đó để:",
       "ans": "Tăng diện tích hấp thụ chất dinh dưỡng",
       "wrong": [
        "Làm thức ăn di chuyển chậm lại cho no lâu",
        "Giữ thức ăn lại không cho xuống ruột già",
        "Tiết ra càng nhiều axit dạ dày càng tốt"
       ],
       "ex": "Lông nhung và vi nhung nhân diện tích bề mặt ruột non lên hàng trăm lần, giúp hấp thụ gần hết chất dinh dưỡng từ thức ăn — cùng nguyên lí “tăng bề mặt” như ở lá cây và tế bào nhỏ."
      },
      {
       "q": "Cây cảnh tưới nước quá nhiều, đất luôn sũng nước, sau vài tuần cây héo và chết dù “thừa nước”. Vì sao?",
       "ans": "Rễ thiếu oxi để hô hấp vì đất ngập nước",
       "wrong": [
        "Nước nhiều làm rễ cây bị rửa trôi hết lông hút",
        "Cây chỉ hấp thụ được nước khi đất khô",
        "Thừa nước làm lá cây ngừng quang hợp hẳn"
       ],
       "ex": "Rễ cũng phải hô hấp để lấy năng lượng hút khoáng. Đất ngập nước đẩy hết không khí ra khỏi kẽ đất, rễ bị ngạt, thối dần — cây chết khát ngay giữa “biển nước”."
      },
      {
       "q": "Trong ruột già của người có hàng nghìn tỉ vi khuẩn sinh sống. Chúng giúp ích chủ nhà bằng cách:",
       "ans": "Tổng hợp một số vitamin và ức chế vi khuẩn hại",
       "wrong": [
        "Tiêu hoá hộ toàn bộ chất xơ thành đường",
        "Sản xuất kháng thể thay cho hệ miễn dịch",
        "Làm cho phân có màu và mùi đặc trưng"
       ],
       "ex": "Hệ vi sinh đường ruột tổng hợp một số vitamin (như vitamin K, một số vitamin nhóm B), đồng thời chiếm chỗ và cạnh tranh khiến vi khuẩn gây bệnh khó phát triển."
      },
      {
       "q": "Bị cảm cúm thông thường, uống kháng sinh thường không khỏi. Lí do là:",
       "ans": "Cúm do virus, kháng sinh chỉ diệt vi khuẩn",
       "wrong": [
        "Kháng sinh bị dịch dạ dày phá huỷ hết",
        "Cúm là bệnh của phổi còn kháng sinh vào máu",
        "Kháng sinh chỉ có tác dụng sau 1 tháng"
       ],
       "ex": "Thuốc kháng sinh tấn công các cấu trúc của vi khuẩn (thành tế bào, ribosome vi khuẩn…). Virus không có các cấu trúc đó nên kháng sinh không chạm được; lạm dụng kháng sinh còn gây kháng thuốc."
      },
      {
       "q": "Rửa tay bằng xà phòng diệt được nhiều mầm bệnh. Xà phòng “đánh” vào cấu trúc nào của vi khuẩn và virus có vỏ?",
       "ans": "Màng tế bào có lớp lipid bị xà phòng phá vỡ",
       "wrong": [
        "Xà phòng phá vỡ DNA của mọi vi sinh vật",
        "Xà phòng làm vi khuẩn chết vì thay đổi pH máu",
        "Xà phòng chỉ cuốn trôi chứ không phá cấu trúc nào"
       ],
       "ex": "Màng tế bào và vỏ của nhiều virus làm từ lớp lipid kép. Phân tử xà phòng chèn vào và phá vỡ lớp lipid đó, khiến vi khuẩn/virus mất nguyên vẹn — đó là diệt khuẩn thật sự, không chỉ rửa trôi."
      },
      {
       "q": "Trong phân tử DNA, base A luôn bắt cặp với T, G luôn bắt cặp với X (C). Sự bắt cặp có quy tắc này gọi là:",
       "ans": "Các base bắt cặp bổ sung theo nguyên tắc cố định",
       "wrong": [
        "Các base bắt cặp ngẫu nhiên theo kích thước",
        "DNA bắt cặp tuỳ theo nhiệt độ môi trường",
        "Mỗi base bắt cặp với chính nó thành cặp đôi"
       ],
       "ex": "Nguyên tắc bổ sung (A–T, G–X) là chìa khoá để DNA tự sao chép chính xác: biết trình tự một mạch là suy ra mạch còn lại."
      },
      {
       "q": "Một gene bị đột biến thay đúng một base trong vùng mã hoá. Hậu quả nào sau đây CÓ THỂ xảy ra?",
       "ans": "Có thể đổi một axit amin hoặc tạo mã kết thúc sớm",
       "wrong": [
        "Chắc chắn làm sinh vật chết ngay lập tức",
        "Không bao giờ ảnh hưởng gì đến protein",
        "Luôn làm tăng gấp đôi lượng protein tạo ra"
       ],
       "ex": "Đột biến điểm có thể: thay một axit amin (đột biến nhầm nghĩa), tạo mã kết thúc sớm làm protein bị cụt (vô nghĩa), hoặc trùng mã cũ nên không đổi gì (đột biến câm). Hậu quả tuỳ vị trí."
      },
      {
       "q": "Con cái thường giống bố mẹ ở nhiều nét nhưng không bao giờ là bản sao y hệt (trừ sinh đôi cùng trứng). Vì sao?",
       "ans": "Tổ hợp lại gene và trao đổi chéo tạo biến dị",
       "wrong": [
        "Gene bị thay đổi hoàn toàn sau mỗi thế hệ",
        "Con chỉ nhận gene của mẹ chứ không của bố",
        "Môi trường làm thay đổi toàn bộ gene của con"
       ],
       "ex": "Giảm phân có trao đổi chéo và phân li độc lập tạo vô số loại giao tử; thụ tinh lại kết hợp ngẫu nhiên hai bộ giao tử — mỗi người con là một tổ hợp gene duy nhất."
      },
      {
       "q": "Một số bệnh di truyền (như máu khó đông) xuất hiện ở nam giới nhiều hơn hẳn nữ giới. Giải thích đúng là:",
       "ans": "Nam chỉ có một nhiễm sắc thể X",
       "wrong": [
        "Nam giới có nhiều gene hơn nữ giới",
        "Bệnh chỉ truyền qua tinh trùng của bố",
        "Nữ giới không mang gene gây bệnh bao giờ"
       ],
       "ex": "Gene gây bệnh nằm trên nhiễm sắc thể X và là gene lặn. Nữ có hai X nên cần cả hai đều mang bệnh mới biểu hiện; nam chỉ có một X nên mang một gene bệnh là biểu hiện ngay."
      },
      {
       "q": "Người nông dân xưa chọn những cây lúa hạt to nhất để làm giống cho vụ sau, lặp lại nhiều đời. Họ đang áp dụng nguyên lí nào?",
       "ans": "Chọn lọc cá thể có tính trạng mong muốn qua thế hệ",
       "wrong": [
        "Lai tạo gene bằng công nghệ phòng thí nghiệm",
        "Thay đổi trực tiếp DNA của cây lúa",
        "Dùng thuốc kích thích để hạt to ra tạm thời"
       ],
       "ex": "Đó là chọn lọc nhân tạo: con người giữ lại và cho sinh sản những cá thể có tính trạng có lợi; qua nhiều thế hệ, tính trạng đó trở nên phổ biến trong giống."
      },
      {
       "q": "Phun thuốc trừ sâu phổ rộng liên tục vài vụ, sau đó sâu hại bùng phát còn mạnh hơn trước. Một nguyên nhân quan trọng là:",
       "ans": "Giết cả thiên địch, sâu hại dễ bùng phát trở lại",
       "wrong": [
        "Thuốc trừ sâu làm sâu khoẻ lên sau mỗi vụ",
        "Sâu hại học được cách tránh thuốc sau một vụ",
        "Thuốc làm đất màu mỡ khiến sâu sinh sản nhanh"
       ],
       "ex": "Thuốc phổ rộng diệt cả chim, nhện, ong kí sinh — những “thiên địch” kìm hãm sâu hại. Mất thiên địch, số sâu sống sót (thường đã kháng thuốc) sinh sôi không còn đối thủ kìm hãm."
      },
      {
       "q": "Chuỗi thức ăn: cỏ → châu chấu → ếch → rắn → đại bàng. Nếu rắn bị con người bắt gần hết, hệ quả dễ thấy nhất là:",
       "ans": "Ếch bùng nổ, châu chấu giảm, cỏ mọc tốt hơn",
       "wrong": [
        "Châu chấu bùng nổ và ăn trụi cỏ ngay",
        "Đại bàng tăng số lượng vì ít đối thủ",
        "Cỏ chết dần vì không còn rắn bảo vệ"
       ],
       "ex": "Mất rắn, ếch thoát khỏi kẻ săn mồi nên tăng mạnh; ếch ăn nhiều châu chấu làm châu chấu giảm; châu chấu giảm thì cỏ được “giải phóng” và mọc tốt hơn — hiệu ứng dây chuyền qua các bậc dinh dưỡng.",
       "fig": {
        "f": "k2chain",
        "a": [
         [
          "Cỏ",
          "Châu chấu",
          "Ếch",
          "Rắn",
          "Đại bàng"
         ],
         -1,
         false
        ]
       }
      },
      {
       "q": "Trong chuỗi thức ăn, năng lượng giảm mạnh qua từng bậc: cỏ tích được 1000 đơn vị năng lượng, châu chấu ăn cỏ chỉ tích khoảng 100, ếch ăn châu chấu còn khoảng 10. Phần lớn năng lượng “biến đi đâu”?",
       "ans": "Phần lớn năng lượng mất dạng nhiệt và chất thải",
       "wrong": [
        "Năng lượng bị phá huỷ hoàn toàn ở mỗi bậc",
        "Năng lượng quay ngược lại cho cỏ sử dụng",
        "Động vật ăn thịt cất giữ năng lượng tốt hơn cỏ"
       ],
       "ex": "Sinh vật dùng phần lớn năng lượng cho hô hấp (thoát ra dạng nhiệt), vận động và thải chất không tiêu hoá được. Chỉ khoảng 10% năng lượng mới thành sinh khối cho bậc sau ăn tiếp."
      },
      {
       "q": "Một quần thể thỏ trên đảo ban đầu tăng số lượng rất nhanh, rồi chậm dần và ổn định quanh một mức. Điều gì đã “hãm” chúng lại?",
       "ans": "Thức ăn và nơi ở có hạn, cạnh tranh tăng",
       "wrong": [
        "Thỏ tự biết dừng sinh sản khi đông",
        "Khí hậu đảo thay đổi đúng lúc thỏ đông",
        "Thỏ hết tuổi sinh sản cùng một lúc"
       ],
       "ex": "Môi trường có sức chứa giới hạn: cỏ, nước và nơi trú ẩn chỉ nuôi nổi một số lượng nhất định. Quần thể chạm ngưỡng đó thì tử vong và sinh sản cân bằng nhau."
      },
      {
       "q": "Một khu rừng có hàng trăm loài cây và động vật thường vượt qua hạn hán tốt hơn một đồn điền trồng toàn một giống cây. Vì sao?",
       "ans": "Nhiều loài thay thế nhau khi một loài suy giảm",
       "wrong": [
        "Rừng nhiều loài làm cho mưa nhiều hơn",
        "Đa dạng loài làm đất tự sinh thêm nước",
        "Cây trong rừng luôn khỏe hơn cây trồng"
       ],
       "ex": "Đa dạng sinh học là “bảo hiểm” của hệ sinh thái: loài này suy giảm vì hạn thì loài khác chịu hạn tốt hơn thế chỗ giữ chức năng; hệ đơn loài sụp đổ dây chuyền khi giống duy nhất gặp nạn."
      },
      {
       "q": "Ao hồ gần khu dân cư và ruộng bón nhiều phân thường xuất hiện “thuỷ triều đỏ”, tảo nở hoa dày đặc rồi cá chết hàng loạt. Chuỗi nguyên nhân đúng là:",
       "ans": "Nước giàu dinh dưỡng (phú dưỡng) tảo sinh sôi mạnh",
       "wrong": [
        "Tảo từ biển theo mưa rơi xuống ao hồ",
        "Cá chết trước rồi tảo mới mọc trên xác cá",
        "Nắng nóng làm nước đổi màu đỏ tự nhiên"
       ],
       "ex": "Nitơ và photpho thừa (phân bón, nước thải) làm tảo bùng nổ; khi tảo chết và phân huỷ, vi khuẩn tiêu thụ gần hết oxi hoà tan khiến cá ngạt — đó là phú dưỡng."
      },
      {
       "q": "Cây họ đậu (đậu, lạc, điền thanh) trồng luân canh làm đất tốt lên rõ rệt. “Phép màu” nằm ở đâu?",
       "ans": "Vi khuẩn cộng sinh ở rễ cố định đạm từ không khí",
       "wrong": [
        "Rễ cây đậu tự chế tạo được phân đạm",
        "Lá đậu rụng xuống là phân hoá học tự nhiên",
        "Cây đậu hút đạm từ đất sâu lên mặt đất"
       ],
       "ex": "Vi khuẩn Rhizobium sống trong nốt sần rễ cây họ đậu biến nitơ khí trời (cây không dùng trực tiếp được) thành dạng đạm cây hấp thụ được — cây cho vi khuẩn chỗ ở và thức ăn, hai bên cùng có lợi."
      },
      {
       "q": "Sốt cao kéo dài ở người rất nguy hiểm, một phần vì nhiệt độ cao tác động xấu lên chính “công nhân hoá học” của tế bào. Đó là:",
       "ans": "Nhiệt cao làm biến tính protein và enzyme",
       "wrong": [
        "Nhiệt cao làm DNA trong tế bào bốc hơi",
        "Enzyme bị cháy thành than ở 40°C",
        "Sốt làm máu đông lại trong mạch"
       ],
       "ex": "Enzyme là protein có cấu trúc không gian tinh vi; nhiệt độ quá cao phá vỡ cấu trúc đó (biến tính) làm enzyme mất hoạt tính, hàng loạt phản ứng trao đổi chất rối loạn."
      },
      {
       "q": "Thịt cá ướp muối hoặc ngâm đường đậm đặc để được lâu hơn hẳn để tươi. Nguyên lí bảo quản ở đây là:",
       "ans": "Muối đường rút nước, vi sinh vật khó sống",
       "wrong": [
        "Muối và đường là chất độc giết mọi vi khuẩn",
        "Muối tạo lớp vỏ kín không cho không khí vào",
        "Đường làm thực phẩm ngọt nên vi khuẩn bỏ đi"
       ],
       "ex": "Dung dịch muối/đường đậm đặc có áp suất thẩm thấu cao, hút nước ra khỏi tế bào vi sinh vật làm chúng mất nước và ngừng phát triển — thịt muối, mứt, mật ong đều dùng nguyên lí này."
      },
      {
       "q": "Quảng cáo thực phẩm chức năng hứa “kích hoạt gene tốt, khoá gene xấu” cho người uống. Điểm phi khoa học cốt lõi của lời hứa này là:",
       "ans": "Gene không “tốt” tuyệt đối, phụ thuộc môi trường sống",
       "wrong": [
        "Thực phẩm chức năng không bao giờ có tác dụng gì",
        "Gene của người không thể thay đổi ở bất cứ đâu",
        "Mọi quảng cáo về sức khoẻ đều bị cấm đoán"
       ],
       "ex": "Biểu hiện của gene chịu ảnh hưởng mạnh của môi trường và lối sống (tương tác kiểu gene – môi trường); một gene có thể có lợi trong hoàn cảnh này, bất lợi ở hoàn cảnh khác. Hứa hẹn “khoá/mở gene” bằng viên uống là đơn giản hoá sai lệch."
      },
      {
       "q": "Virus bắt buộc phải sống trong tế bào của vật chủ mới nhân lên được. Lí do cốt lõi là:",
       "ans": "Virus không có bộ máy tự tổng hợp và trao đổi chất",
       "wrong": [
        "Virus quá nhỏ nên không tự di chuyển được",
        "Virus chỉ là độc tố hoá học thuần tuý",
        "Virus sợ ánh sáng nên phải trốn trong tế bào"
       ],
       "ex": "Virus chỉ gồm vật chất di truyền bọc trong vỏ protein, không có ribosome, không tự tạo năng lượng được — chúng phải “mượn” toàn bộ bộ máy của tế bào chủ để sao chép mình."
      },
      {
       "q": "Có người lo để chậu cây trong phòng ngủ ban đêm cây sẽ “hút hết oxi” gây ngạt. Đánh giá đúng theo khoa học là:",
       "ans": "Lượng oxi cây dùng ban đêm rất nhỏ, không đáng kể",
       "wrong": [
        "Đúng, cây ban đêm hô hấp như người vậy",
        "Cây ban đêm không hô hấp chút nào cả",
        "Phòng ngủ có cây là nguyên nhân gây khó thở"
       ],
       "ex": "Ban đêm cây chỉ hô hấp (dừng quang hợp) nhưng tốc độ rất chậm so với một người đang ngủ; một vài chậu cây không thể làm giảm oxi trong phòng tới mức nguy hiểm."
      },
      {
       "q": "Tiêm vaccine có thể phòng được bệnh truyền nhiễm từ trước khi mắc. Cơ chế bảo vệ dựa vào khả năng nào của cơ thể?",
       "ans": "Cơ thể tạo kháng thể và tế bào nhớ miễn dịch",
       "wrong": [
        "Vaccine giết sẵn mọi mầm bệnh trong người",
        "Vaccine làm cơ thể nóng lên khiến virus sợ",
        "Vaccine thay thế hoàn toàn hệ miễn dịch"
       ],
       "ex": "Vaccine đưa kháng nguyên (đã làm yếu/vô hiệu) vào cơ thể để hệ miễn dịch tập dượt: tạo kháng thể và ghi nhớ. Gặp mầm bệnh thật lần sau, phản ứng nhanh và mạnh hơn nhiều nên bệnh không kịp phát."
      },
      {
       "q": "Một cái ao nông bị bồi lắng theo năm tháng, dần biến thành bãi lầy rồi đồng cỏ. Quá trình thay thế dần nhau của các quần xã như vậy gọi là gì và do đâu?",
       "ans": "Bồi lắng và thực vật thay thế nhau theo giai đoạn",
       "wrong": [
        "Do cá trong ao ăn hết nước theo thời gian",
        "Do Mặt Trăng làm nước ao cạn dần",
        "Ao tự khô vì Trái Đất ngày càng nóng lên"
       ],
       "ex": "Đó là diễn thế sinh thái: phù sa bồi lắng làm ao nông dần, cây ưa nước nhường chỗ cho cây chịu hạn hơn, quần xã này nối tiếp quần xã kia theo hướng ổn định hơn."
      }
     ],
     "blank": [
      {
       "pre": "Đơn vị cấu trúc và chức năng cơ bản của mọi cơ thể sống là",
       "ans": "tế bào",
       "post": ".",
       "wrong": [
        "gene",
        "mô",
        "cơ quan"
       ],
       "ex": "Từ vi khuẩn đơn bào tới cây cổ thụ và con người, mọi hoạt động sống đều diễn ra trong tế bào — đơn vị nhỏ nhất của sự sống."
      },
      {
       "pre": "Quá trình cây xanh dùng năng lượng ánh sáng tổng hợp chất hữu cơ từ CO₂ và nước gọi là",
       "ans": "quang hợp",
       "post": ".",
       "wrong": [
        "hô hấp",
        "thoát hơi nước",
        "thụ phấn"
       ],
       "ex": "Quang hợp tích trữ năng lượng ánh sáng vào chất hữu cơ và nhả oxi — gần như toàn bộ sự sống trên Trái Đất sống nhờ quá trình này."
      },
      {
       "pre": "Vật chất di truyền chính trong nhân tế bào nhân thực là",
       "ans": "DNA",
       "post": ", mang thông tin di truyền dạng trình tự base.",
       "wrong": [
        "RNA",
        "protein",
        "lipid"
       ],
       "ex": "DNA lưu trữ thông tin di truyền dài hạn; RNA chủ yếu là bản sao tạm thời và là “thợ” thực thi trong quá trình tổng hợp protein."
      },
      {
       "pre": "Hình thức phân bào tạo ra giao tử (tinh trùng, trứng) gọi là",
       "ans": "giảm phân",
       "post": ".",
       "wrong": [
        "nguyên phân",
        "thụ tinh",
        "phân đôi"
       ],
       "ex": "Giảm phân làm số nhiễm sắc thể trong giao tử giảm một nửa; thụ tinh khôi phục lại bộ nhiễm sắc thể đầy đủ cho hợp tử."
      },
      {
       "pre": "Quan hệ giữa hai loài sống chung mà cả hai bên đều có lợi gọi là quan hệ",
       "ans": "cộng sinh",
       "post": ".",
       "wrong": [
        "kí sinh",
        "cạnh tranh",
        "hội sinh"
       ],
       "ex": "Ví dụ: vi khuẩn cố định đạm ở rễ cây họ đậu, vi khuẩn đường ruột và người. Khác với hội sinh (chỉ một bên lợi, bên kia không hại không lợi)."
      },
      {
       "pre": "Sinh vật tự tổng hợp được chất hữu cơ từ chất vô cơ được gọi là sinh vật",
       "ans": "tự dưỡng",
       "post": ".",
       "wrong": [
        "dị dưỡng",
        "phân giải",
        "kí sinh"
       ],
       "ex": "Cây xanh và vi khuẩn quang hợp là sinh vật tự dưỡng — “nhà sản xuất” của hệ sinh thái; động vật là sinh vật dị dưỡng, phải ăn chất hữu cơ có sẵn."
      },
      {
       "pre": "Đột biến thay thế đúng một cặp base trong gene được gọi là đột biến",
       "ans": "điểm",
       "post": ".",
       "wrong": [
        "cấu trúc",
        "lệch bội",
        "đa bội"
       ],
       "ex": "Đột biến điểm chỉ chạm tới một vị trí base trên DNA nhưng vẫn có thể đổi một axit amin hoặc tạo mã kết thúc sớm trong protein."
      },
      {
       "pre": "Chuỗi các mắt xích trong đó loài này là thức ăn của loài kia gọi là chuỗi",
       "ans": "thức ăn",
       "post": ".",
       "wrong": [
        "phản ứng",
        "di truyền",
        "phân giải"
       ],
       "ex": "Nhiều chuỗi thức ăn đan vào nhau thành lưới thức ăn — cấu trúc dinh dưỡng cốt lõi của quần xã."
      },
      {
       "pre": "Khả năng của cơ thể chống lại mầm bệnh và ghi nhớ chúng cho lần sau gọi là",
       "ans": "miễn dịch",
       "post": ".",
       "wrong": [
        "dị ứng",
        "sốc phản vệ",
        "nhiễm trùng"
       ],
       "ex": "Hệ miễn dịch gồm hàng rào bảo vệ, tế bào bạch cầu và kháng thể; vaccine hoạt động chính là nhờ “trí nhớ” miễn dịch này."
      },
      {
       "pre": "Nhóm sinh vật chuyên phân huỷ xác chết và chất thải, trả chất vô cơ về môi trường gọi là sinh vật",
       "ans": "phân giải",
       "post": ".",
       "wrong": [
        "sản xuất",
        "tiêu thụ",
        "kí sinh"
       ],
       "ex": "Vi khuẩn và nấm là những sinh vật phân giải chủ lực; thiếu chúng, xác chết và lá rụng sẽ chất đống và chu trình vật chất bị tắc."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Mọi tế bào trong tự nhiên đều có nhân hoàn chỉnh bao bọc vật chất di truyền.",
       "truth": false,
       "explain": "Sai. Tế bào nhân sơ (vi khuẩn) không có nhân hoàn chỉnh; hồng cầu trưởng thành của người cũng mất nhân trong quá trình phát triển."
      },
      {
       "stmt": "Giảm phân tạo ra bốn tế bào con, mỗi tế bào có số nhiễm sắc thể bằng một nửa tế bào mẹ.",
       "truth": true,
       "explain": "Đúng. Nhờ giảm phân, giao tử chỉ mang một nửa bộ nhiễm sắc thể; thụ tinh cộng hai nửa lại thành bộ đầy đủ, giữ số lượng ổn định qua các thế hệ."
      },
      {
       "stmt": "Mọi đột biến gene đều gây hại cho sinh vật mang chúng.",
       "truth": false,
       "explain": "Sai. Nhiều đột biến là trung tính (không đổi axit amin), một số có hại, và một số ít có lợi trong môi trường nhất định — chính chúng là nguyên liệu cho tiến hoá."
      },
      {
       "stmt": "Qua mỗi bậc dinh dưỡng, khoảng 90% năng lượng được giữ lại truyền cho bậc tiếp theo.",
       "truth": false,
       "explain": "Sai, ngược lại: chỉ khoảng 10% năng lượng được chuyển lên bậc sau, phần lớn mất đi qua hô hấp, nhiệt và chất thải. Đó là lí do chuỗi thức ăn hiếm khi dài quá 4–5 bậc."
      },
      {
       "stmt": "Vi khuẩn trong tự nhiên chủ yếu là loài gây bệnh cho người.",
       "truth": false,
       "explain": "Sai. Phần lớn vi khuẩn vô hại hoặc có ích thiết yếu: phân giải xác chết, cố định đạm, sống cộng sinh trong ruột người… Chỉ một phần nhỏ là mầm bệnh."
      },
      {
       "stmt": "Cây xanh chỉ quang hợp vào ban ngày và chỉ hô hấp vào ban đêm.",
       "truth": false,
       "explain": "Sai. Hô hấp diễn ra liên tục cả ngày lẫn đêm ở mọi tế bào sống; ban ngày quang hợp mạnh hơn hô hấp nên cây nhả oxi ròng, ban đêm chỉ còn hô hấp."
      },
      {
       "stmt": "Hai bố mẹ đều là người lành mang gene lặn gây bệnh (kiểu gene Aa) thì mỗi đứa con có khoảng 25% khả năng mắc bệnh đó.",
       "truth": true,
       "explain": "Đúng. Phép lai Aa × Aa cho tỉ lệ 1 AA : 2 Aa : 1 aa — chỉ tổ hợp aa (25%) mới biểu hiện bệnh lặn; đó là lí do bệnh lặn có thể “ẩn” qua nhiều thế hệ rồi xuất hiện."
      },
      {
       "stmt": "Quần xã càng có nhiều loài, lưới thức ăn của nó càng phức tạp và có nhiều mối liên kết.",
       "truth": true,
       "explain": "Đúng. Mỗi loài ăn và bị ăn bởi nhiều loài khác nhau; số loài tăng lên thì số mắt xích và đường truyền năng lượng trong lưới thức ăn tăng theo."
      },
      {
       "stmt": "Virus có thể tự nhân lên trong môi trường dinh dưỡng ngoài cơ thể nếu được cung cấp đủ chất.",
       "truth": false,
       "explain": "Sai. Virus không có bộ máy trao đổi chất và tổng hợp riêng; ngoài tế bào chủ chúng chỉ là hạt trơ, không thể tự sao chép dù môi trường giàu dinh dưỡng tới đâu."
      },
      {
       "stmt": "Chọn lọc tự nhiên tác động trực tiếp lên kiểu gene của từng cá thể để thay đổi nó.",
       "truth": false,
       "explain": "Sai. Chọn lọc tự nhiên “nhìn thấy” kiểu hình (đặc điểm biểu hiện) của cá thể: cá thể phù hợp sống sót và sinh sản nhiều hơn, nhờ đó tần số gene thay đổi dần trong quần thể."
      },
      {
       "stmt": "Sinh vật phân giải giúp khép kín chu trình vật chất trong hệ sinh thái.",
       "truth": true,
       "explain": "Đúng. Chúng biến chất hữu cơ trong xác chết, chất thải thành chất vô cơ (muối khoáng, CO₂, nước) để sinh vật sản xuất dùng lại — không có chúng, vật chất sẽ bị “khoá” trong xác chết."
      },
      {
       "stmt": "Mọi đột biến nhiễm sắc thể đều làm thay đổi số lượng gene của tế bào.",
       "truth": false,
       "explain": "Sai. Đột biến đảo đoạn chỉ đảo ngược thứ tự gene trên nhiễm sắc thể, số lượng gene giữ nguyên; mất đoạn/lặp đoạn mới làm thay đổi số lượng gene."
      },
      {
       "stmt": "Tế bào gốc có khả năng biệt hoá thành nhiều loại tế bào khác nhau của cơ thể.",
       "truth": true,
       "explain": "Đúng. Tế bào gốc (ở phôi, tuỷ xương…) phân chia và biệt hoá thành tế bào cơ, thần kinh, máu… — nền tảng của công nghệ tế bào và y học tái tạo."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Nguyên lí “bề mặt – thể tích” lặp lại khắp sinh học: tế bào nhỏ, lá mỏng, ruột đầy lông nhung, phổi đầy phế nang — đều để tăng diện tích trao đổi.",
      "Trong chuỗi thức ăn, chỉ ~10% năng lượng chuyển lên bậc sau; vì thế ăn ở bậc dinh dưỡng thấp “tiết kiệm” năng lượng cho hệ sinh thái hơn.",
      "Phân biệt rõ: ĐỘT BIẾN tạo ra biến dị mới, CHỌN LỌC (tự nhiên/nhân tạo) quyết định biến dị nào còn lại trong quần thể.",
      "Đọc tin sức khoẻ: “liên quan tới” (tương quan) khác hẳn “gây ra” (nhân quả). Hỏi tiếp: có nhóm đối chứng không, có cơ chế giải thích được không?"
     ],
     "facts": [
      {
       "q": "Vì sao con lai F1 giữa hai dòng thuần khác nhau thường khoẻ và năng suất cao hơn cả bố lẫn mẹ?",
       "a": "Ưu thế lai từ tổ hợp gene của hai dòng thuần",
       "ex": "Ở F1, nhiều gene ở trạng thái dị hợp; các gene lặn có hại bị gene trội lành che lấp, đồng thời tổ hợp mới phát huy điểm mạnh của cả hai dòng — hiện tượng ưu thế lai."
      },
      {
       "q": "Hệ sinh thái mất một loài ăn thịt đầu bảng (như sói, hổ) thì chuyện gì dễ xảy ra tiếp theo?",
       "a": "Loài bị săn mồi bùng nổ, cân bằng bị phá vỡ",
       "ex": "Mất kẻ kiểm soát ở đỉnh chuỗi thức ăn, loài ăn cỏ tăng vọt và gặm trụi thực vật — hiệu ứng thác dinh dưỡng từng được ghi nhận rõ ở vườn quốc gia Yellowstone khi sói trở lại."
      }
     ],
     "pairs": [
      [
       "Quang hợp",
       "lá cây tổng hợp chất hữu cơ nhờ ánh sáng"
      ],
      [
       "Giảm phân",
       "tạo giao tử, giảm một nửa số nhiễm sắc thể"
      ],
      [
       "Đột biến gene",
       "thay đổi trình tự base trong DNA của gene"
      ],
      [
       "Chuỗi thức ăn",
       "quan hệ ăn và bị ăn nối tiếp giữa các loài"
      ],
      [
       "Cộng sinh",
       "hai loài sống chung, cả hai cùng có lợi"
      ],
      [
       "Diễn thế sinh thái",
       "các quần xã thay thế nhau theo thời gian"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-thpt-ungdung",
    "emoji": "🏭",
    "name": "Khoa học trong đời sống",
    "sub": "Nguyên lí khoa học đằng sau công nghệ quanh em và sống bền vững",
    "pools": {
     "choose": [
      {
       "q": "Điện thoại di động nói chuyện được với nhau từ hai đầu thành phố nhờ loại sóng nào?",
       "ans": "Sóng vô tuyến (sóng điện từ tần số radio)",
       "wrong": [
        "Sóng âm truyền qua không khí",
        "Sóng siêu âm công suất lớn",
        "Sóng trên mặt nước của trường điện"
       ],
       "ex": "Thông tin thoại được điều chế lên sóng điện từ tần số radio, truyền với tốc độ ánh sáng giữa máy và trạm phát sóng — cùng bản chất với ánh sáng nhưng tần số thấp hơn nhiều."
      },
      {
       "q": "Sóng phát thanh dài (sóng trung/dài) lan truyền được qua đồi núi tới làng xa, còn sóng FM thường chỉ phủ được vùng phẳng gần đài. Khác biệt chính do:",
       "ans": "Sóng dài nhiễu xạ quanh vật cản tốt hơn",
       "wrong": [
        "Sóng dài chạy nhanh hơn sóng FM",
        "Sóng FM bị cây cối hút hết năng lượng",
        "Đài FM phát yếu hơn đài sóng dài cố ý"
       ],
       "ex": "Bước sóng càng dài, sóng càng dễ uốn quanh vật cản (nhiễu xạ). Sóng FM bước sóng ngắn nên bị đồi núi, nhà cao tầng chặn lại thành “vùng tối” sóng."
      },
      {
       "q": "Đèn sân tự sáng khi trời tối, tắt khi trời sáng — không ai bấm công tắc. Bộ phận nào “canh” ánh sáng đó?",
       "ans": "Quang điện trở thay đổi điện trở theo ánh sáng",
       "wrong": [
        "Một đồng hồ hẹn giờ giấu trong đèn",
        "Pin mặt trời tích điện ban ngày để dùng đêm",
        "Nam châm cảm nhận được bóng tối"
       ],
       "ex": "Cảm biến dùng quang điện trở: trời tối, điện trở tăng cao làm mạch điều khiển đóng điện cho đèn; trời sáng, điện trở giảm và mạch ngắt. Đó là nguyên lí của mọi cảm biến — biến tín hiệu môi trường thành tín hiệu điện."
      },
      {
       "q": "Điều khiển từ xa của TV dùng tia hồng ngoại thay vì sóng radio. Một lí do thực tế quan trọng là:",
       "ans": "Tia hồng ngoại không xuyên tường nên không nhiễu phòng bên",
       "wrong": [
        "Hồng ngoại truyền nhanh hơn sóng radio nhiều",
        "Mắt người nhìn thấy hồng ngoại nên dễ ngắm",
        "Sóng radio không thể mang tín hiệu điều khiển"
       ],
       "ex": "Hồng ngoại là ánh sáng không nhìn thấy, đi theo đường thẳng và bị tường chặn lại, nên bấm điều khiển ở phòng này không làm TV phòng bên nhảy kênh; đổi lại phải chĩa điều khiển về phía TV."
      },
      {
       "q": "Chưng cất tinh dầu sả: hơi nước đi qua lá sả rồi ngưng tụ thành hai lớp lỏng, lớp tinh dầu nổi lên trên. Nguyên lí tách ở đây là:",
       "ans": "Hơi nước cuốn tinh dầu bay hơi rồi ngưng tụ lại",
       "wrong": [
        "Tinh dầu tự tan hoàn toàn vào nước nóng",
        "Lá sả bị ép cơ học để vắt ra tinh dầu",
        "Tinh dầu nặng hơn nước nên lắng xuống đáy"
       ],
       "ex": "Đó là chưng cất lôi cuốn hơi nước: dù tinh dầu sôi ở nhiệt độ cao, hơi nước vẫn cuốn theo hơi tinh dầu ở nhiệt độ thấp hơn nhiệt độ sôi của nước, hỗn hợp ngưng tụ rồi tách lớp vì tinh dầu không tan trong nước."
      },
      {
       "q": "Bao phân bón ghi “NPK 16-16-8”. Ba con số đó cho người nông dân biết điều gì?",
       "ans": "Hàm lượng đạm – lân – kali khác nhau theo nhu cầu cây",
       "wrong": [
        "Giá tiền theo từng khu vực bán phân",
        "Số ngày phân tan hết trong đất",
        "Khối lượng tối đa bón cho mỗi cây"
       ],
       "ex": "Ba số là phần trăm khối lượng của đạm (N), lân (P₂O₅) và kali (K₂O) trong phân. Giai đoạn cây con cần nhiều đạm, giai đoạn ra hoa kết trái cần nhiều kali hơn — nên tỉ lệ NPK được pha khác nhau theo mục đích."
      },
      {
       "q": "Bón phân hoá học quá tay, cây không những không tốt lên mà còn héo rũ như bị “cháy”. Vì sao?",
       "ans": "Dung dịch đất quá đặc, rễ mất nước thay vì hút nước",
       "wrong": [
        "Phân hoá học nóng lên và đốt cháy rễ cây",
        "Cây hấp thụ quá nhiều đạm nên tự chết",
        "Phân làm đất chuyển thành axit ngay lập tức"
       ],
       "ex": "Dung dịch đất quá đậm đặc có áp suất thẩm thấu cao hơn dịch trong rễ, nước bị rút ngược ra khỏi rễ — cây héo vì mất nước dù đất đang ẩm, người nông dân gọi là “cháy phân”."
      },
      {
       "q": "Trong tháp chưng cất dầu mỏ, xăng được thu ở phần trên, dầu diesel và dầu nặng ở phần dưới. Thứ tự đó vì:",
       "ans": "Phần nhẹ, sôi ở nhiệt độ thấp, bay hơi trước",
       "wrong": [
        "Xăng nhẹ hơn nên tự nổi lên sau khi chưng",
        "Tháp chưng cất quay ly tâm tách các lớp dầu",
        "Dầu nặng được cho vào tháp sau cùng"
       ],
       "ex": "Chưng cất phân đoạn tách hỗn hợp theo nhiệt độ sôi: các hydrocarbon mạch ngắn (xăng) sôi thấp, bốc lên cao và ngưng tụ ở đỉnh tháp mát hơn; mạch dài sôi cao, ngưng tụ ở phần dưới nóng hơn."
      },
      {
       "q": "Dầu tràn ra biển loang thành một lớp màng mỏng khổng lồ và giết chết nhiều sinh vật biển. Màng dầu gây hại trước hết vì:",
       "ans": "Dầu nhẹ hơn và không tan, nổi thành màng ngăn oxi",
       "wrong": [
        "Dầu biển có màu đen làm nước biển nóng lên",
        "Dầu tan vào nước thành dung dịch độc ngay",
        "Sinh vật biển bị dầu làm cho nặng và chìm"
       ],
       "ex": "Dầu nhẹ hơn nước và không tan trong nước nên nổi thành màng, cản trao đổi oxi giữa không khí và biển, đồng thời bọc kín lông chim, mang cá khiến chúng ngạt và mất khả năng cách nhiệt."
      },
      {
       "q": "Nhà máy điện hạt nhân và nhà máy nhiệt điện than đều dùng tuabin hơi để phát điện. Điểm khác cốt lõi giữa hai nhà máy là:",
       "ans": "Nguồn nhiệt từ phân hạch thay cho đốt nhiên liệu",
       "wrong": [
        "Điện hạt nhân không cần tuabin và máy phát",
        "Nhiệt điện than dùng năng lượng Mặt Trời đun nước",
        "Điện hạt nhân phát ra dòng điện một chiều"
       ],
       "ex": "Cả hai đều là “đun nước → hơi quay tuabin → máy phát điện”. Khác nhau chỉ ở lò sinh nhiệt: lò phản ứng phân hạch thay cho lò đốt than, nên không thải CO₂ và khói bụi trong lúc vận hành."
      },
      {
       "q": "Nhiên liệu urani cho lò phản ứng phải qua công đoạn “làm giàu” trước khi dùng. Làm giàu để làm gì?",
       "ans": "Tăng tỉ lệ đồng vị U-235 dễ phân hạch",
       "wrong": [
        "Loại bỏ hết phóng xạ ra khỏi urani",
        "Ép urani thành viên nhỏ cho vừa lò",
        "Nhuộm màu urani để dễ nhận biết"
       ],
       "ex": "Urani tự nhiên chỉ chứa ~0,7% U-235 (đồng vị phân hạch được), còn lại là U-238. Làm giàu nâng tỉ lệ U-235 lên vài phần trăm để phản ứng dây chuyền duy trì được trong lò điện."
      },
      {
       "q": "Ứng dụng GPS trên điện thoại xác định được vị trí của em trên bản đồ. Nguyên lí cốt lõi của GPS là:",
       "ans": "Đo thời gian tín hiệu từ nhiều vệ tinh tới máy thu",
       "wrong": [
        "Điện thoại phát sóng radar quét mặt đất xung quanh",
        "Vệ tinh chụp ảnh và nhận diện người dùng",
        "Trạm phát sóng di động báo vị trí cho điện thoại"
       ],
       "ex": "Máy thu nhận tín hiệu từ ít nhất 4 vệ tinh, đo thời gian tín hiệu đi được để tính khoảng cách tới từng vệ tinh (vận tốc ánh sáng × thời gian), giao nhau tại một điểm duy nhất trên mặt đất."
      },
      {
       "q": "Đốt rác nhựa lộ thiên sau nhà là cách xử lí bị khuyến cáo tránh. Lí do khoa học chính là:",
       "ans": "Đốt lộ thiên sinh khí độc, khó kiểm soát phát thải",
       "wrong": [
        "Nhựa không cháy được nên đốt là vô ích",
        "Khói nhựa chỉ gây khó chịu chứ không độc",
        "Đốt nhựa làm mất đi nguồn năng lượng tái tạo"
       ],
       "ex": "Nhựa cháy không hoàn toàn ở nhiệt độ thấp sinh ra nhiều chất độc (có thể gồm dioxin với nhựa chứa clo) và hạt bụi mịn; lò đốt công nghiệp phải có nhiệt độ cao và hệ thống lọc khí mới kiểm soát được."
      },
      {
       "q": "Ven biển trồng rừng ngập mặn (đước, sú, vẹt) được coi là “lá chắn xanh” chống xói lở. Rừng ngập mặn bảo vệ bờ bằng cách:",
       "ans": "Rễ giữ đất, tán lá giảm lực hạt mưa đánh vào đất",
       "wrong": [
        "Cây ngập mặn uống nước biển làm mực nước hạ",
        "Lá cây tiết chất làm đất cứng như bê tông",
        "Rừng thu hút cá đến làm bờ biển chắc hơn"
       ],
       "ex": "Hệ rễ chằng chịt của cây ngập mặn giữ chặt bùn đất, làm chậm dòng chảy để phù sa lắng lại bồi thêm bờ, đồng thời tán cây giảm sức tàn phá của sóng và mưa — bảo vệ mềm mà bền hơn kè cứng đơn độc."
      },
      {
       "q": "Ao nuôi cá những ngày nắng nóng gay gắt rất dễ bị cá nổi đầu, chết ngạt dù nước ao vẫn đầy. Vì sao?",
       "ans": "Nước nóng giữ ít oxi hoà tan, cá dễ ngạt",
       "wrong": [
        "Nắng nóng làm nước ao chuyển thành axit",
        "Cá sợ nắng nên lặn sâu và chết ở đáy",
        "Nhiệt độ cao làm thức ăn của cá biến mất"
       ],
       "ex": "Khí hoà tan trong nước kém đi khi nhiệt độ tăng, trong khi cá và vi sinh vật lại hô hấp mạnh hơn lúc trời nóng — cung giảm cầu tăng, oxi tụt nhanh. Người nuôi phải sục khí hoặc quạt nước bổ sung oxi."
      },
      {
       "q": "Làm xà phòng thủ công từ dầu ăn và dung dịch NaOH là ứng dụng của phản ứng nào?",
       "ans": "Xà phòng hoá chất béo tạo xà phòng và glixerol",
       "wrong": [
        "Trung hoà axit bằng bazơ thông thường",
        "Lên men dầu ăn nhờ vi khuẩn",
        "Chưng cất dầu ăn để tinh chế xà phòng"
       ],
       "ex": "Chất béo (este của glixerol) tác dụng với kiềm mạnh NaOH/KOH tạo muối của axit béo — chính là xà phòng — kèm glixerol giữ ẩm. Đây là nghề làm xà phòng truyền thống và cũng là bài học hoá học hữu cơ quen thuộc."
      },
      {
       "q": "Trên các chai chất tẩy rửa có cảnh báo: tuyệt đối không trộn nước tẩy chứa clo với giấm hoặc chất tẩy rửa có tính axit. Trộn chúng sẽ tạo ra:",
       "ans": "Tạo khí clo độc gây nguy hiểm hô hấp",
       "wrong": [
        "Một chất tẩy mới mạnh và an toàn hơn",
        "Khí oxi làm cháy nổ trong nhà tắm",
        "Mùi thơm dễ chịu nhưng vô hại"
       ],
       "ex": "Chất tẩy chứa hipoclorit gặp axit sẽ giải phóng khí clo — khí độc từng dùng làm vũ khí hoá học, gây tổn thương phổi nặng. Nguyên tắc an toàn: không bao giờ tự pha trộn các hoá chất tẩy rửa."
      },
      {
       "q": "Đầu báo khói trong nhà phát hiện cháy sớm ngay khi khói còn rất mỏng. Loại đầu báo quang phổ biến “thấy” khói bằng cách:",
       "ans": "Hạt khói làm tán xạ ánh sáng trong buồng quang",
       "wrong": [
        "Đo nhiệt độ phòng tăng lên đột ngột",
        "Ngửi mùi khét bằng cảm biến hoá học",
        "Đếm số phân tử CO₂ trong không khí"
       ],
       "ex": "Trong buồng quang có tia sáng chiếu chéo qua cảm biến; không khí sạch không làm tia chạm vào cảm biến, nhưng hạt khói tán xạ ánh sáng lệch hướng vào cảm biến và chuông báo động kêu."
      },
      {
       "q": "Tấm pin mặt trời chỉ phát điện khi có nắng, ngày âm u sản lượng tụt hẳn. Nguyên nhân trực tiếp là:",
       "ans": "Cần photon ánh sáng đủ mạnh để kích thích electron",
       "wrong": [
        "Pin mặt trời cần nhiệt độ cao mới hoạt động",
        "Mây làm pin mặt trời bị ướt và hỏng tạm thời",
        "Pin mặt trời thực chất chạy bằng gió nhẹ"
       ],
       "ex": "Pin quang điện biến ánh sáng thành điện nhờ hiệu ứng quang điện trong chất bán dẫn: photon đủ năng lượng mới giải phóng được electron tạo dòng điện; trời âm u ít photon nên điện áp và dòng đều giảm."
      },
      {
       "q": "Nước thải sinh hoạt và nước rửa chén đổ thẳng ra sông là một nguyên nhân làm sông hồ bị phú dưỡng. Thủ phạm dinh dưỡng chính trong nước thải là:",
       "ans": "Nitơ và photpho từ chất tẩy rửa, phân bón thừa",
       "wrong": [
        "Muối ăn và đường trong nước thải nhà bếp",
        "Dầu mỡ nấu ăn còn sót lại trong nước",
        "Khí CO₂ hoà tan làm nước có tính axit"
       ],
       "ex": "Chất tẩy rửa chứa photphat, nước thải chứa hợp chất nitơ — đúng hai “món ăn” mà tảo cần để bùng nổ. Xử lí nước thải và giảm phân bón thừa là cách chặn phú dưỡng từ gốc."
      },
      {
       "q": "Nhiều vùng ven biển chọn trồng rừng ngập mặn kết hợp đê thay vì chỉ đổ bê tông làm kè cứng. Ưu điểm sinh thái nổi bật của rừng là:",
       "ans": "Rừng ngập mặn tiêu năng sóng và giữ bùn bồi",
       "wrong": [
        "Cây ngập mặn làm nước biển ngừng dâng vĩnh viễn",
        "Rừng làm cho bão không bao giờ đổ bộ vào bờ",
        "Bê tông không thể xây được ở gần biển"
       ],
       "ex": "Thân và rễ cây ngập mặn như một “bàn chải” khổng lồ làm sóng mất năng lượng dần, đồng thời giữ phù sa bồi đắp bờ biển tự nhiên; rừng còn là vườn ươm của tôm cá và nơi trú bão cho sinh vật — kè cứng không làm được những việc đó."
      },
      {
       "q": "Thuốc bảo vệ thực vật nhóm khó phân huỷ (như DDT ngày xưa) được tìm thấy trong mỡ chim ăn thịt với nồng độ cao hơn hẳn trong nước ao. Hiện tượng đó gọi là:",
       "ans": "Tích luỹ sinh học tăng dần qua bậc dinh dưỡng",
       "wrong": [
        "Thuốc tự tập trung về phía con mồi lớn nhất",
        "Chim ăn thịt uống nhiều nước ao hơn chim nhỏ",
        "Thuốc tự sinh sôi trong cơ thể động vật"
       ],
       "ex": "Chất độc khó phân huỷ và không đào thải được nên “gửi lại” qua từng bậc: sinh vật phù du → cá nhỏ → cá lớn → chim, nồng độ tăng dần theo chuỗi thức ăn — tích luỹ sinh học (khuếch đại sinh học)."
      },
      {
       "q": "Nhà kính trồng rau giữ được nhiệt ấm hơn ngoài trời vào ban đêm nhờ nguyên lí:",
       "ans": "Kính cho nắng vào nhưng cản nhiệt thoát ra",
       "wrong": [
        "Kính của nhà kính tự phát ra nhiệt",
        "Trong nhà kính không có gió nên tự ấm",
        "Đất trong nhà kính luôn nóng hơn đất ngoài"
       ],
       "ex": "Kính (và lớp nilon) cho bức xạ Mặt Trời sóng ngắn đi vào làm nóng đất và cây, nhưng cản phần lớn bức xạ nhiệt sóng dài thoát ngược ra — cùng cơ chế với hiệu ứng nhà kính của khí quyển."
      },
      {
       "q": "Quảng cáo máy lọc nước khẳng định “nước kiềm ion hoá chữa được bách bệnh”. Cách đánh giá đúng đắn nhất là:",
       "ans": "Đòi hỏi bằng chứng thử nghiệm lâm sàng độc lập",
       "wrong": [
        "Tin ngay vì máy được bán ở siêu thị lớn",
        "Chữa được bệnh hay không tuỳ cơ địa mỗi người",
        "Nước kiềm nghe có vẻ khoa học nên chắc đúng"
       ],
       "ex": "Tuyên bố chữa bệnh là tuyên bố y học — cần thử nghiệm lâm sàng có đối chứng, được kiểm chứng độc lập, chứ không phải lời chứng thực của người bán hay vài người dùng kể lại."
      },
      {
       "q": "Phân loại rác hữu cơ (rau thừa, vỏ trái cây) riêng khỏi rác khác ngay tại nhà giúp ích gì cho môi trường?",
       "ans": "Rác hữu cơ ủ thành phân compost, giảm rác chôn lấp",
       "wrong": [
        "Rác hữu cơ để riêng sẽ tự biến mất sau một đêm",
        "Để công nhân vệ sinh đỡ phải ngửi mùi rác",
        "Rác hữu cơ cháy tốt hơn khi đã phân loại"
       ],
       "ex": "Rác hữu cơ ủ hiếu khí thành compost trả chất hữu cơ về cho đất; chôn lẫn trong bãi rác, chúng phân huỷ yếm khí sinh khí mê-tan — một khí nhà kính mạnh."
      },
      {
       "q": "Tuabin gió thường được đặt trên tháp rất cao và ở nơi thoáng như đồi, ven biển. Vì sao phải “leo cao” như vậy?",
       "ans": "Gió trên cao mạnh và ổn định hơn gần mặt đất",
       "wrong": [
        "Trên cao có nhiều gió vì gần Mặt Trời hơn",
        "Tháp cao để tránh người dân nghe tiếng ồn mà thôi",
        "Gió chỉ tồn tại ở độ cao trên 50 mét"
       ],
       "ex": "Gần mặt đất, gió bị nhà cửa, cây cối và địa hình làm chậm và xoáy rối; càng lên cao gió càng mạnh và đều — mà công suất gió tăng theo luỹ thừa ba của tốc độ gió nên chênh lệch này rất đáng giá."
      },
      {
       "q": "Tường nhà xốp cách nhiệt giúp điều hoà chạy ít tốn điện hơn hẳn. Xốp cách nhiệt tốt vì:",
       "ans": "Xốp chứa nhiều không khí tù, dẫn nhiệt kém",
       "wrong": [
        "Xốp phản chiếu hết ánh sáng mặt trời như gương",
        "Xốp tự làm mát không khí xung quanh nó",
        "Xốp dày nên nhiệt không kịp truyền qua trong ngày"
       ],
       "ex": "Xốp chứa vô số bọt khí nhỏ bị “nhốt” không đối lưu được; không khí tĩnh là chất dẫn nhiệt rất kém nên nhiệt ngoài trời khó thấm vào nhà, điều hoà đỡ phải chạy bù."
      }
     ],
     "blank": [
      {
       "pre": "Điện thoại và đài phát thanh thu phát thông tin bằng sóng",
       "ans": "vô tuyến",
       "post": " trong phổ điện từ.",
       "wrong": [
        "âm thanh",
        "cơ học",
        "siêu âm"
       ],
       "ex": "Sóng vô tuyến là sóng điện từ có bước sóng dài, tần số thấp; đổi tần số là đổi “kênh” — đài FM, truyền hình và mạng di động dùng các dải tần khác nhau."
      },
      {
       "pre": "Thiết bị biến đổi một tín hiệu từ môi trường (ánh sáng, nhiệt, khói…) thành tín hiệu điện gọi là",
       "ans": "cảm biến",
       "post": ".",
       "wrong": [
        "máy phát",
        "ăng-ten",
        "bộ nhớ"
       ],
       "ex": "Cảm biến là “giác quan” của máy móc: cảm biến ánh sáng, nhiệt độ, khói, độ ẩm… mở đầu cho mọi hệ thống tự động hoá và Internet vạn vật."
      },
      {
       "pre": "Phương pháp tách tinh dầu khỏi lá cây bằng dòng hơi nước đi qua gọi là chưng cất",
       "ans": "lôi cuốn hơi nước",
       "post": ".",
       "wrong": [
        "phân đoạn",
        "thăng hoa",
        "sắc kí"
       ],
       "ex": "Hơi nước cuốn theo hơi tinh dầu dù tinh dầu có nhiệt độ sôi cao; hỗn hợp ngưng tụ thành hai lớp, gạn lấy lớp tinh dầu phía trên."
      },
      {
       "pre": "Ba nguyên tố dinh dưỡng chính mà phân bón cung cấp cho cây là đạm (N), lân (P) và",
       "ans": "kali (K)",
       "post": ".",
       "wrong": [
        "canxi (Ca)",
        "sắt (Fe)",
        "lưu huỳnh (S)"
       ],
       "ex": "Đạm giúp cây sinh trưởng lá, lân tốt cho rễ và hoa, kali giúp cây cứng cáp, chống chịu và ngọt quả — thiếu một trong ba, cây đều phát triển kém."
      },
      {
       "pre": "Quá trình tách dầu mỏ thành xăng, dầu hoả, diesel… theo nhiệt độ sôi tăng dần gọi là chưng cất",
       "ans": "phân đoạn",
       "post": ".",
       "wrong": [
        "lôi cuốn",
        "kết tinh",
        "điện phân"
       ],
       "ex": "Tháp chưng cất phân đoạn có nhiệt độ giảm dần từ đáy lên đỉnh; mỗi phân đoạn ngưng tụ ở tầng có nhiệt độ thích hợp với khoảng sôi của nó."
      },
      {
       "pre": "Nhiên liệu hạt nhân trong lò phản ứng điện hạt nhân chủ yếu là đồng vị",
       "ans": "urani-235",
       "post": ".",
       "wrong": [
        "cacbon-14",
        "hiđro-1",
        "sắt-56"
       ],
       "ex": "U-235 là đồng vị fissile — hạt nhân của nó vỡ ra khi hấp thụ một nơtron chậm, giải phóng năng lượng và thêm nơtron mới duy trì phản ứng dây chuyền có kiểm soát."
      },
      {
       "pre": "Hiện tượng một chất độc khó phân huỷ có nồng độ tăng dần qua các bậc của chuỗi thức ăn gọi là tích luỹ",
       "ans": "sinh học",
       "post": ".",
       "wrong": [
        "hoá học",
        "vật lí",
        "địa chất"
       ],
       "ex": "Vì chất độc không bị đào thải, sinh vật ở bậc cao “kế thừa” toàn bộ lượng độc của mọi con mồi chúng ăn — nồng độ có thể tăng hàng nghìn lần so với môi trường."
      },
      {
       "pre": "Ủ rác thải hữu cơ (rau, lá, phân chuồng) thành phân bón cho đất gọi là làm",
       "ans": "compost",
       "post": " — phân hữu cơ hoai mục từ rác sinh học.",
       "wrong": [
        "phân hoá học",
        "phân xanh",
        "tro bếp"
       ],
       "ex": "Ủ compost nhờ vi sinh vật hiếu khí phân huỷ chất hữu cơ; đống ủ đúng cách nóng lên tới 55–65°C, diệt được nhiều mầm bệnh và hạt cỏ dại."
      },
      {
       "pre": "Mưa axit hình thành chủ yếu do khí SO₂ và các oxit của",
       "ans": "nitơ",
       "post": " thải từ đốt nhiên liệu hoá thạch.",
       "wrong": [
        "cacbon",
        "hiđro",
        "oxi"
       ],
       "ex": "SO₂ và NOx gặp hơi nước trong khí quyển tạo axit sunfuric và axit nitric, theo mưa rơi xuống làm chua đất, nước và ăn mòn công trình. CO₂ chỉ tạo axit rất yếu trong nước mưa tự nhiên."
      },
      {
       "pre": "Vệ tinh địa tĩnh bay trên xích đạo ở độ cao khoảng",
       "ans": "36.000 km",
       "post": " nên quay cùng nhịp với Trái Đất và “đứng yên” trên một điểm.",
       "wrong": [
        "400 km",
        "2.000 km",
        "100.000 km"
       ],
       "ex": "Ở độ cao ~35.800 km, chu kì quay của vệ tinh đúng bằng một ngày đêm của Trái Đất; vệ tinh truyền hình và khí tượng địa tĩnh đậu ở quỹ đạo này để nhìn cố định một vùng."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Sóng vô tuyến có thể truyền qua chân không, không cần môi trường vật chất.",
       "truth": true,
       "explain": "Đúng. Sóng vô tuyến là sóng điện từ; bằng chứng rõ nhất là tín hiệu từ tàu vũ trụ và vệ tinh vẫn về tới Trái Đất qua khoảng không vũ trụ."
      },
      {
       "stmt": "Điện thoại tự điều chỉnh độ sáng màn hình theo ánh sáng môi trường nhờ một cảm biến ánh sáng.",
       "truth": true,
       "explain": "Đúng. Cảm biến ánh sáng xung quanh (ambient light sensor) đo độ sáng môi trường và hệ điều hành tăng/giảm độ sáng màn hình cho đỡ chói và tiết kiệm pin."
      },
      {
       "stmt": "Bón phân hoá học càng nhiều thì cây trồng càng cho năng suất cao, không có giới hạn nào.",
       "truth": false,
       "explain": "Sai. Quá liều phân gây “cháy” cây do thẩm thấu, ô nhiễm nguồn nước (phú dưỡng) và lãng phí; mỗi cây trồng có ngưỡng hấp thụ nhất định, thừa phân chỉ gây hại."
      },
      {
       "stmt": "Xăng và dầu diesel đều thu được từ dầu mỏ qua cùng một tháp chưng cất phân đoạn.",
       "truth": true,
       "explain": "Đúng. Chúng là hai phân đoạn khác nhau của dầu mỏ: xăng ngưng tụ ở tầng mát hơn phía trên, diesel ở tầng nóng hơn phía dưới của cùng tháp chưng cất."
      },
      {
       "stmt": "Nhà máy điện hạt nhân thải ra lượng CO₂ trong lúc vận hành ngang với nhà máy điện than cùng công suất.",
       "truth": false,
       "explain": "Sai. Khi vận hành, lò hạt nhân không đốt nhiên liệu hoá thạch nên gần như không thải CO₂ trực tiếp; thải CO₂ chỉ phát sinh ít ở khâu khai thác, xây dựng — thấp hơn điện than hàng chục lần."
      },
      {
       "stmt": "GPS trên điện thoại chỉ hoạt động khi có sóng di động hoặc kết nối Internet.",
       "truth": false,
       "explain": "Sai. GPS là hệ thống thu tín hiệu riêng từ vệ tinh định vị; điện thoại vẫn định vị được ở chế độ máy bay. Internet chỉ giúp tải bản đồ và tăng tốc định vị ban đầu."
      },
      {
       "stmt": "Đốt rác nhựa ngoài trời sau nhà là cách xử lí sạch vì nhựa cháy hết thành tro.",
       "truth": false,
       "explain": "Sai. Cháy lộ thiên nhiệt độ thấp và thiếu oxi khiến nhựa cháy không hoàn toàn, sinh khói độc và bụi mịn nguy hại cho cả khu dân cư xung quanh."
      },
      {
       "stmt": "Rừng ngập mặn giúp giảm thiệt hại do sóng bão và triều cường cho vùng ven biển.",
       "truth": true,
       "explain": "Đúng. Hàng cây ngập mặn dày đặc làm tiêu hao năng lượng sóng trước khi sóng ập vào bờ, đồng thời giữ đất chống xói lở — nhiều nghiên cứu sau bão lớn đã ghi nhận làng có rừng ngập mặn nguyên vẹn thiệt hại nhẹ hơn hẳn."
      },
      {
       "stmt": "Chất nào có nguồn gốc tự nhiên thì chắc chắn an toàn cho sức khoẻ con người.",
       "truth": false,
       "explain": "Sai. Nọc rắn, độc tố nấm mũ tử thần, thạch tín (asen) trong tự nhiên đều là chất tự nhiên nhưng cực độc. “Tự nhiên” và “an toàn” là hai chuyện hoàn toàn khác nhau."
      },
      {
       "stmt": "Tái chế một lon nhôm tốn ít năng lượng hơn rất nhiều so với luyện lon nhôm mới từ quặng bôxít.",
       "truth": true,
       "explain": "Đúng. Nấu chảy lại nhôm phế liệu chỉ tốn khoảng 5% năng lượng so với điện phân nhôm từ quặng — đó là lí do nhôm là một trong những vật liệu đáng tái chế nhất."
      },
      {
       "stmt": "Phân hữu cơ (phân chuồng, compost) thì bón bao nhiêu cũng không thể gây ô nhiễm nguồn nước.",
       "truth": false,
       "explain": "Sai. Bón quá nhiều phân hữu cơ, nhất là trước mưa lớn, nitơ và photpho vẫn bị rửa trôi xuống sông hồ gây phú dưỡng như phân hoá học; hữu cơ không có nghĩa là vô hại khi thừa."
      },
      {
       "stmt": "Nhà kính giữ ấm cho cây nhờ lớp kính cho nắng vào nhưng giữ lại phần lớn nhiệt bức xạ thoát ra.",
       "truth": true,
       "explain": "Đúng. Đó chính là cơ chế nhà kính thu nhỏ — và cũng là hình ảnh trực quan để hiểu hiệu ứng nhà kính của khí quyển Trái Đất."
      },
      {
       "stmt": "Thuốc trừ sâu phun lên cây chỉ tồn tại vài giờ rồi biến mất hoàn toàn khỏi môi trường.",
       "truth": false,
       "explain": "Sai. Nhiều loại thuốc (đặc biệt nhóm clo hữu cơ như DDT) tồn tại trong đất và mỡ sinh vật nhiều năm, tích luỹ qua chuỗi thức ăn — đó là lí do chúng đã bị cấm ở hầu hết các nước."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Mọi công nghệ quanh em đều là một nguyên lí khoa học + một bài toán điều kiện biên: cảm biến cần ngưỡng đúng, phân bón cần đúng liều, tháp chưng cất cần đúng nhiệt độ.",
      "“Đúng liều” là khái niệm xuyên suốt: clo khử trùng nước là cứu tinh ở liều thấp, là chất độc ở liều cao; phân bón cũng vậy.",
      "Đánh giá tuyên bố công nghệ/sức khoẻ: hỏi bằng chứng thử nghiệm độc lập ở đâu, ai kiểm chứng, có nhóm đối chứng không — đừng đánh giá theo độ bóng bẩy của quảng cáo.",
      "Bền vững phải xét cả vòng đời: sản xuất, sử dụng, thải bỏ. Một sản phẩm “xanh” ở khâu dùng nhưng độc hại ở khâu thải vẫn chưa bền vững."
     ],
     "facts": [
      {
       "q": "Vì sao khi làm xà phòng thủ công bằng NaOH phải đeo găng tay và kính bảo hộ?",
       "a": "Dung dịch kiềm NaOH ăn mòn da và mắt",
       "ex": "NaOH là bazơ mạnh, hoà tan protein và chất béo trong da; bắn vào mắt có thể gây tổn thương nghiêm trọng. An toàn phòng thực hành áp dụng y hệt khi làm ở nhà."
      },
      {
       "q": "Vì sao vệ tinh truyền hình thường dùng vệ tinh địa tĩnh thay vì vệ tinh bay thấp?",
       "a": "Nó quay cùng tốc độ với Trái Đất nên đứng yên một chỗ",
       "ex": "Ăng-ten chảo ở nhà chỉ cần cố định hướng một lần về phía vệ tinh địa tĩnh là thu được tín hiệu liên tục, không phải đuổi theo vệ tinh di chuyển như với vệ tinh quỹ đạo thấp."
      }
     ],
     "pairs": [
      [
       "Sóng vô tuyến",
       "mang thông tin cho điện thoại, radio, TV"
      ],
      [
       "Cảm biến",
       "biến tín hiệu môi trường thành tín hiệu điện"
      ],
      [
       "Chưng cất phân đoạn",
       "tách dầu mỏ theo khoảng nhiệt độ sôi"
      ],
      [
       "Phân hạch",
       "nguồn sinh nhiệt của nhà máy điện hạt nhân"
      ],
      [
       "Phú dưỡng",
       "thừa nitơ, photpho làm tảo bùng phát"
      ],
      [
       "Tích luỹ sinh học",
       "chất độc tăng dần qua chuỗi thức ăn"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-thpt-phuongphap",
    "emoji": "📊",
    "name": "Số liệu, sai số và suy luận",
    "sub": "Đọc số liệu, tính sai số và tránh bị tin tức khoa học dắt mũi",
    "pools": {
     "choose": [
      {
       "q": "Đo chiều dài chiếc bàn ba lần được 120,2 cm; 120,4 cm; 120,3 cm. Giá trị trung bình của phép đo là:",
       "ans": "120,3 cm",
       "wrong": [
        "120,2 cm",
        "120,4 cm",
        "120,9 cm"
       ],
       "ex": "(120,2 + 120,4 + 120,3) : 3 = 360,9 : 3 = 120,3 cm. Giá trị trung bình là ước lượng tốt nhất cho đại lượng đo khi có nhiều lần đo."
      },
      {
       "q": "Với ba lần đo trên (120,2; 120,4; 120,3 cm), sai số tuyệt đối lớn nhất của phép đo khoảng:",
       "ans": "0,1 cm",
       "wrong": [
        "0,3 cm",
        "0,05 cm",
        "1,0 cm"
       ],
       "ex": "Sai số tuyệt đối của từng lần = độ lệch so với trung bình 120,3: lần lượt 0,1; 0,1; 0,0 cm. Lớn nhất là 0,1 cm — kết quả đo ghi là 120,3 ± 0,1 cm."
      },
      {
       "q": "Trong phòng thực hành, thầy cô luôn bắt đo lặp lại một đại lượng 3–5 lần thay vì đo một lần. Lí do khoa học chính là:",
       "ans": "Giảm ảnh hưởng của sai số ngẫu nhiên",
       "wrong": [
        "Để học sinh quen tay với dụng cụ hơn",
        "Vì lần đo đầu tiên luôn luôn sai",
        "Để có thêm số liệu cho báo cáo dài hơn"
       ],
       "ex": "Sai số ngẫu nhiên làm kết quả lúc cao lúc thấp quanh giá trị thật; lấy trung bình nhiều lần đo, các lệch ngẫu nhiên triệt tiêu lẫn nhau một phần. (Lưu ý: đo lặp lại KHÔNG xoá được sai số hệ thống.)"
      },
      {
       "q": "Một kết quả đo được coi là ghi đúng quy ước khoa học khi nó gồm:",
       "ans": "Giá trị trung bình kèm sai số của phép đo",
       "wrong": [
        "Chỉ một con số đẹp, đã làm tròn tròn trịa",
        "Giá trị lớn nhất trong các lần đo",
        "Kết quả của lần đo cẩn thận nhất"
       ],
       "ex": "Con số đo trần trụi không cho biết độ tin cậy. Ghi dạng “giá trị trung bình ± sai số” mới cho người đọc biết kết quả chắc chắn tới mức nào."
      },
      {
       "q": "Bấm giây bằng tay có độ trễ phản ứng khoảng 0,2 giây. Đo thời gian vật rơi chỉ 0,5 giây bằng đồng hồ bấm tay sẽ kém tin cậy vì:",
       "ans": "Thời gian đo quá ngắn so với độ trễ phản ứng",
       "wrong": [
        "Đồng hồ bấm giây không đo được dưới 1 giây",
        "Vật rơi nhanh quá mắt thường không thấy",
        "Sai số chỉ phụ thuộc vào loại đồng hồ"
       ],
       "ex": "Sai số 0,2 giây trên tổng 0,5 giây là sai số tương đối tới 40%. Đại lượng càng ngắn/nhỏ so với giới hạn của dụng cụ và người đo, kết quả càng thiếu tin cậy."
      },
      {
       "q": "Hai nhóm học sinh đo gia tốc rơi tự do được hai kết quả rất khác nhau: 9,7 m/s² và 10,5 m/s². Cách xử lí đúng đắn nhất là:",
       "ans": "Cần lặp lại và tìm nguồn sai số hệ thống",
       "wrong": [
        "Lấy kết quả của nhóm học giỏi hơn làm đúng",
        "Cộng hai kết quả rồi chia đôi là xong",
        "Bỏ cả hai vì chắc chắn cả hai đều sai"
       ],
       "ex": "Chênh lệch lớn hơn hẳn sai số ngẫu nhiên cho thấy có sai số hệ thống (cách bấm giờ, điểm thả vật, dụng cụ lệch…). Cách khoa học là kiểm tra lại phương pháp và đo lại, không chọn theo cảm tính."
      },
      {
       "q": "Nhiệt độ 5 ngày liên tiếp ở một thành phố: 30, 31, 29, 30, 35°C. Thấy ngày thứ 5 nóng vọt, một bạn kết luận “khí hậu nơi này đang nóng lên”. Kết luận này vội ở chỗ:",
       "ans": "Mẫu quá ít và thời tiết khác khí hậu dài hạn",
       "wrong": [
        "Số liệu nhiệt độ không bao giờ đáng tin",
        "Phải đo đủ 7 ngày mới được kết luận gì",
        "Ngày thứ 5 chắc chắn là đo sai dụng cụ"
       ],
       "ex": "Thời tiết là biến động ngắn ngày; khí hậu là xu thế trung bình của hàng chục năm. Năm số đo không thể chứng minh hay bác bỏ một xu thế khí hậu — cần chuỗi số liệu dài và nhiều nơi."
      },
      {
       "q": "Thống kê cho thấy: tháng nào bán kem càng chạy thì số vụ đuối nước càng nhiều. Suy ra “ăn kem gây đuối nước” là sai vì:",
       "ans": "Sai: cả hai cùng tăng vì trời nóng (biến thứ ba)",
       "wrong": [
        "Số liệu thống kê nào cũng có thể bịa ra",
        "Kem và đuối nước ở hai lĩnh vực không liên quan",
        "Muốn kết luận phải hỏi ý kiến người bán kem"
       ],
       "ex": "Đây là tương quan giả tạo bởi biến thứ ba: trời nóng làm người ta vừa ăn kem nhiều vừa đi bơi nhiều. Hai biến cùng tăng giảm chưa chứng tỏ biến này gây ra biến kia."
      },
      {
       "q": "Một khảo sát thấy 90% người uống cà phê buổi sáng nói họ thấy tỉnh táo hơn. Để tin rằng cà phê THẬT SỰ gây tỉnh táo, khảo sát còn thiếu yếu tố then chốt nào?",
       "ans": "Nhóm đối chứng không uống cà phê để so sánh",
       "wrong": [
        "Số người tham gia phải là số chẵn",
        "Phải khảo sát vào buổi tối mới chính xác",
        "Phải đo lượng cà phê bằng cân điện tử"
       ],
       "ex": "Không có nhóm đối chứng (uống đồ giả cà phê/không uống), ta không tách được tác dụng của cà phê khỏi hiệu ứng tâm lí và thói quen. Mọi thử nghiệm nghiêm túc đều cần nhóm so sánh."
      },
      {
       "q": "Khi thử thuốc mới, một nhóm bệnh nhân được cho uống viên giả dược (không có hoạt chất) mà không biết. Việc này nhằm:",
       "ans": "Loại trừ hiệu ứng tâm lí và diễn biến tự nhiên",
       "wrong": [
        "Tiết kiệm thuốc thật cho bệnh nhân nặng",
        "Kiểm tra xem bệnh nhân có trung thực không",
        "Làm cho thí nghiệm kéo dài thêm thú vị"
       ],
       "ex": "Nhiều bệnh tự thuyên giảm, và niềm tin “đang được chữa” cũng làm bệnh nhân thấy đỡ (hiệu ứng giả dược). Nhóm giả dược cho biết thuốc thật hơn hẳn hai yếu tố đó bao nhiêu."
      },
      {
       "q": "Điểm trung bình môn Toán của lớp A cao hơn lớp B đúng 0,3 điểm. Kết luận “giáo viên lớp A dạy giỏi hơn” là chưa vững vì:",
       "ans": "Chưa xét đầu vào và độ lệch của từng lớp",
       "wrong": [
        "Chênh lệch 0,3 điểm là quá nhỏ để nhìn thấy",
        "Điểm số không phản ánh được điều gì cả",
        "Phải so sánh ít nhất 10 lớp mới kết luận"
       ],
       "ex": "Hai lớp có thể khác nhau sẵn về nền tảng học sinh, sĩ số, tỉ lệ chuyên cần… Muốn quy cho giáo viên, phải loại trừ các yếu tố khác đó — chênh lệch trung bình trần trụi chưa nói lên nguyên nhân."
      },
      {
       "q": "Một biểu đồ cột so sánh doanh thu hai hãng: hãng X cao 100, hãng Y cao 95, nhưng trục tung bắt đầu từ 90 khiến cột Y trông “thấp thảm hại”. Đây là thủ thuật:",
       "ans": "Cắt trục tung để phóng đại khác biệt nhỏ",
       "wrong": [
        "Dùng màu sắc nổi bật cho một cột",
        "Sắp xếp cột theo thứ tự thời gian",
        "Làm tròn số liệu doanh thu quá mức"
       ],
       "ex": "Trục tung không bắt đầu từ 0 làm chiều cao cột không còn tỉ lệ với giá trị thật: chênh 5% trông như chênh nhiều lần. Đọc biểu đồ, việc đầu tiên là nhìn trục số bắt đầu từ đâu."
      },
      {
       "q": "Một chiếc cân bị lệch chuẩn, mọi lần cân đều cho kết quả nặng hơn thật đúng 2 gam. Đây là loại sai số nào?",
       "ans": "Sai số hệ thống, cộng hằng số vào mọi lần đo",
       "wrong": [
        "Sai số ngẫu nhiên do người cân run tay",
        "Không phải sai số vì cân vẫn còn dùng được",
        "Sai số làm tròn của thang đo"
       ],
       "ex": "Sai số hệ thống lệch theo một chiều cố định (ở đây +2 g) do dụng cụ hoặc phương pháp; đo lặp lại bao nhiêu lần cũng không hết — chỉ có hiệu chuẩn lại cân hoặc trừ đi độ lệch mới xử lí được."
      },
      {
       "q": "Một phép đo cho giá trị 12,346 và sai số của nó là 0,2. Cách ghi kết quả đúng quy ước là:",
       "ans": "12,3 ± 0,2",
       "wrong": [
        "12,346 ± 0,2",
        "12 ± 0,246",
        "12,35 ± 0,20"
       ],
       "ex": "Giá trị đo chỉ ghi tới hàng thập phân tương ứng với sai số: sai số ở hàng phần mười (0,2) thì giá trị làm tròn tới hàng phần mười: 12,3 ± 0,2. Ghi 12,346 là “chính xác giả tạo”."
      },
      {
       "q": "Khi làm thí nghiệm kiểm tra một yếu tố (ví dụ phân bón) ảnh hưởng tới cây, nhà khoa học giữ nguyên mọi yếu tố khác (nước, sáng, đất). Việc “giữ nguyên” đó để:",
       "ans": "Để biết chắc nguyên nhân gây thay đổi kết quả",
       "wrong": [
        "Để thí nghiệm trông gọn gàng, ngăn nắp",
        "Để tiết kiệm thời gian chăm sóc cây",
        "Vì thay đổi nhiều yếu tố cùng lúc là bị cấm"
       ],
       "ex": "Nếu vừa đổi phân, vừa đổi lượng nước, cây tốt lên ta không biết nhờ yếu tố nào. Biến độc lập chỉ thay đổi một mình, các biến còn lại được kiểm soát — đó là xương sống của phương pháp thực nghiệm."
      },
      {
       "q": "Một bạn phỏng vấn 10 bạn cùng lớp thấy 8 bạn thích học buổi sáng, rồi kết luận “học sinh cả trường thích học sáng”. Lỗi lớn nhất của kết luận là:",
       "ans": "Mẫu quá nhỏ và không đại diện",
       "wrong": [
        "Bạn ấy phỏng vấn vào buổi chiều nên sai",
        "Số 8 không phải là số tròn chục",
        "Hỏi ý kiến thì không bao giờ tin được"
       ],
       "ex": "10 học sinh của một lớp không đại diện cho cả trường (khác khối, khác thói quen), và cỡ mẫu quá nhỏ khiến tỉ lệ dao động rất mạnh. Khảo sát muốn tổng quát phải có mẫu đủ lớn và chọn ngẫu nhiên đại diện."
      },
      {
       "q": "Tin tức viết: “Nghiên cứu phát hiện người ăn sáng đều đặn thường gầy hơn người hay bỏ bữa sáng”. Cách hiểu đúng nhất là:",
       "ans": "Đó mới là tương quan, chưa chứng minh nhân quả",
       "wrong": [
        "Ăn sáng chắc chắn làm người ta gầy đi",
        "Nghiên cứu dinh dưỡng không đáng tin chút nào",
        "Người gầy là do bỏ bữa tối chứ không liên quan"
       ],
       "ex": "Người ăn sáng đều thường cũng có lối sống điều độ hơn (ngủ đủ, vận động, thu nhập ổn định…). Nghiên cứu quan sát chỉ cho tương quan; muốn khẳng định ăn sáng GÂY gầy đi cần thử nghiệm có kiểm soát."
      },
      {
       "q": "Hai đồ thị “số điện thoại di động” và “nhiệt độ trung bình toàn cầu” cùng tăng đều trong 40 năm qua. Để kết luận điện thoại gây nóng lên toàn cầu, còn thiếu điều cốt lõi nào?",
       "ans": "Cơ chế giải thích và kiểm chứng độc lập",
       "wrong": [
        "Cần kéo dài đồ thị thêm 100 năm nữa",
        "Cần hai đồ thị tăng với tốc độ bằng nhau",
        "Cần số liệu của nhiều hãng điện thoại hơn"
       ],
       "ex": "Vô số biến cùng tăng theo thời gian (dân số, số ô tô, lượng pizza bán ra…). Nhân quả cần một cơ chế vật lí giải thích được (như khí nhà kính giữ nhiệt) cộng bằng chứng độc lập — chứ không phải hai đường cong giống nhau."
      },
      {
       "q": "Một bạn chạy với vận tốc 36 km/h. Đổi sang đơn vị m/s, vận tốc của bạn là:",
       "ans": "10 m/s",
       "wrong": [
        "36 m/s",
        "100 m/s",
        "3,6 m/s"
       ],
       "ex": "Đổi km/h sang m/s ta chia cho 3,6: 36 : 3,6 = 10 m/s. Nhân/chia nhầm 3,6 là lỗi đơn vị kinh điển trong bài tập vật lí."
      },
      {
       "q": "Đo điện trở ba lần được 10,1 Ω; 9,9 Ω; 15,0 Ω. Giá trị 15,0 Ω khả năng cao là:",
       "ans": "Số liệu bất thường, cần đo lại kiểm tra",
       "wrong": [
        "Giá trị đúng nhất vì lớn nhất trong ba lần",
        "Trung bình thật của điện trở cần tìm",
        "Bằng chứng điện trở tự thay đổi giá trị"
       ],
       "ex": "Hai lần đo gần nhau (10,1 và 9,9) còn một lần vọt hẳn (15,0) — dấu hiệu của sự cố khi đo (tiếp xúc lỏng, đọc nhầm thang). Cách xử lí: kiểm tra và đo lại, không lặng lẽ lấy nó tính trung bình."
      },
      {
       "q": "Một phép đo cho kết quả 50,0 ± 0,5 cm. Sai số tương đối của phép đo này là:",
       "ans": "1%",
       "wrong": [
        "0,5%",
        "5%",
        "0,1%"
       ],
       "ex": "Sai số tương đối = sai số tuyệt đối / giá trị đo = 0,5 / 50,0 = 0,01 = 1%. Sai số tương đối cho biết độ chính xác theo tỉ lệ — con số mới thực sự nói lên phép đo tốt cỡ nào."
      },
      {
       "q": "Vì sao các nhà khoa học khi công bố kết quả luôn trình bày cả phương pháp đo và số liệu gốc, không chỉ kết luận?",
       "ans": "Để người khác lặp lại và kiểm chứng được",
       "wrong": [
        "Để bài báo trông dài và uy tín hơn",
        "Vì tạp chí khoa học bắt buộc phải vậy",
        "Để che giấu những kết quả chưa đẹp"
       ],
       "ex": "Tính lặp lại được là nền tảng của khoa học: phòng thí nghiệm khác, làm đúng phương pháp đó, phải ra kết quả tương đương. Kết luận không ai kiểm chứng được thì chưa phải tri thức khoa học vững."
      },
      {
       "q": "Một thí nghiệm chỉ làm đúng một lần và cho kết quả “đúng như dự đoán”. Thái độ khoa học đúng là:",
       "ans": "Lặp lại nhiều lần trước khi tin kết quả",
       "wrong": [
        "Công bố ngay vì dự đoán đã thành hiện thực",
        "Kết luận rằng giả thuyết chắc chắn đúng 100%",
        "Không cần đo lại vì tốn thời gian vô ích"
       ],
       "ex": "Một lần đo có thể ăn may bởi sai số ngẫu nhiên hoặc điều kiện tình cờ. Khoa học đòi hỏi kết quả lặp lại được nhiều lần, bởi nhiều người, mới đáng tin."
      },
      {
       "q": "Muốn đo đường kính một sợi tóc (khoảng 0,1 mm), dụng cụ phù hợp nhất trong phòng thực hành phổ thông là:",
       "ans": "Thước panme chuyên đo kích thước nhỏ",
       "wrong": [
        "Thước mét cuộn dùng trong xây dựng",
        "Thước dây may đo quần áo",
        "Cân bàn để cân sợi tóc"
       ],
       "ex": "Chọn dụng cụ theo độ chia nhỏ nhất phù hợp đại lượng: thước kẻ học sinh chia tới 1 mm không đọc nổi 0,1 mm; panme (micrometer) đọc được tới 0,01 mm nên đo được sợi tóc."
      },
      {
       "q": "Đồ thị vận tốc – thời gian của một chuyển động là đường thẳng dốc lên đều. Chuyển động đó là:",
       "ans": "Nhanh dần đều với gia tốc không đổi",
       "wrong": [
        "Chuyển động thẳng đều với vận tốc không đổi",
        "Chuyển động chậm dần đều sắp dừng lại",
        "Vật đứng yên rồi đột ngột chuyển động"
       ],
       "ex": "Đường thẳng dốc lên trên đồ thị v–t nghĩa là vận tốc tăng tuyến tính theo thời gian — gia tốc bằng hệ số góc của đường thẳng và không đổi: chuyển động thẳng biến đổi đều."
      },
      {
       "q": "“Bạn A học thêm nên điểm cao, bạn B không học thêm điểm thấp — vậy học thêm chắc chắn làm tăng điểm.” Suy luận này bỏ sót điều gì?",
       "ans": "Bỏ qua khác biệt nền tảng và động lực ban đầu",
       "wrong": [
        "Bỏ qua việc điểm số có thể làm tròn lên",
        "Thiếu số liệu về học phí của lớp học thêm",
        "Hai bạn là mẫu quá lớn để kết luận"
       ],
       "ex": "Học sinh chọn đi học thêm thường đã có sẵn động lực hoặc nền tảng khác học sinh không đi. Muốn biết học thêm có tác dụng thật không, phải so sánh các nhóm tương đương nhau từ đầu — lại là vấn đề nhóm đối chứng."
      },
      {
       "q": "Hai bài báo đưa ra hai con số trái ngược nhau về cùng một vấn đề. Thái độ xử lí đúng nhất của người đọc là:",
       "ans": "Kiểm tra phương pháp đo và cỡ mẫu của cả hai",
       "wrong": [
        "Tin bài báo của tờ báo nổi tiếng hơn",
        "Lấy trung bình cộng hai con số cho công bằng",
        "Bỏ qua cả hai vì khoa học lúc nào cũng mâu thuẫn"
       ],
       "ex": "Con số chỉ đáng tin khi phương pháp sinh ra nó đáng tin: đo bằng gì, trên mẫu nào, ai tài trợ, có đối chứng không. So sánh phương pháp trước khi so sánh kết luận."
      }
     ],
     "blank": [
      {
       "pre": "Giá trị trung bình của ba lần đo 9,8; 10,0 và 10,2 là",
       "ans": "10,0",
       "post": ".",
       "wrong": [
        "9,9",
        "10,1",
        "30,0"
       ],
       "ex": "(9,8 + 10,0 + 10,2) : 3 = 30,0 : 3 = 10,0. Đáp án 30,0 là bẫy của việc quên chia cho số lần đo."
      },
      {
       "pre": "Sai số do dụng cụ lệch chuẩn hoặc phương pháp đo cố định gây ra, lệch cùng một chiều ở mọi lần đo, gọi là sai số",
       "ans": "hệ thống",
       "post": ".",
       "wrong": [
        "ngẫu nhiên",
        "tuyệt đối",
        "làm tròn"
       ],
       "ex": "Sai số hệ thống không mất đi khi đo lặp lại; muốn khử phải hiệu chuẩn lại dụng cụ hoặc sửa phương pháp đo."
      },
      {
       "pre": "Sai số tuyệt đối chia cho giá trị trung bình của đại lượng đo cho ta sai số",
       "ans": "tương đối",
       "post": ", thường biểu diễn theo phần trăm.",
       "wrong": [
        "hệ thống",
        "dụng cụ",
        "tuyệt đối"
       ],
       "ex": "Sai số tương đối mới cho thấy chất lượng phép đo: lệch 1 mm là lớn khi đo 1 cm nhưng là rất nhỏ khi đo 1 m."
      },
      {
       "pre": "Nhóm không nhận tác động đang thử nghiệm, chỉ dùng để so sánh kết quả, gọi là nhóm",
       "ans": "đối chứng",
       "post": ".",
       "wrong": [
        "thực nghiệm",
        "khảo sát",
        "đại diện"
       ],
       "ex": "Nhóm đối chứng là “mốc so sánh”: không có nó, ta không biết kết quả ở nhóm thử nghiệm là do tác động gây ra hay do tự nhiên diễn ra."
      },
      {
       "pre": "Hai hiện tượng cùng tăng hoặc cùng giảm theo nhau mới chỉ chứng tỏ chúng có",
       "ans": "tương quan",
       "post": ", chưa chứng tỏ quan hệ nhân quả.",
       "wrong": [
        "nhân quả",
        "phụ thuộc hoàn toàn",
        "quan hệ quyết định"
       ],
       "ex": "Tương quan là điều kiện cần chứ chưa đủ cho nhân quả. Giữa hai biến có thể tồn tại biến thứ ba cùng chi phối cả hai."
      },
      {
       "pre": "Muốn kết luận từ một cuộc khảo sát đúng cho số đông, mẫu được chọn phải đủ lớn và có tính",
       "ans": "đại diện",
       "post": " cho tổng thể.",
       "wrong": [
        "ngẫu hứng",
        "tiện lợi",
        "cá biệt"
       ],
       "ex": "Mẫu đại diện phản ánh đúng tỉ lệ các nhóm trong tổng thể (tuổi, vùng miền, giới…); mẫu tiện lợi như “hỏi bạn cùng lớp” thường lệch hẳn so với tổng thể."
      },
      {
       "pre": "Dụng cụ đo có độ chia nhỏ nhất càng nhỏ thì kết quả đo càng có độ",
       "ans": "chính xác",
       "post": " cao.",
       "wrong": [
        "nhanh chóng",
        "rẻ tiền",
        "đẹp mắt"
       ],
       "ex": "Thước chia tới milimét đọc được tới milimét; panme chia tới 0,01 mm cho kết quả chi tiết hơn nhiều — đổi lại đo chậm và đắt hơn."
      },
      {
       "pre": "Hiện tượng bệnh nhân dùng thuốc giả (không hoạt chất) mà vẫn thấy đỡ bệnh nhờ niềm tin được gọi là hiệu ứng",
       "ans": "giả dược (placebo)",
       "post": ".",
       "wrong": [
        "đối chứng",
        "mù đôi",
        "cỡ mẫu"
       ],
       "ex": "Hiệu ứng giả dược là thật về mặt cảm giác và sinh lí, đó là lí do thử thuốc bắt buộc phải có nhóm uống giả dược để trừ đi phần này."
      },
      {
       "pre": "Trong một thí nghiệm, yếu tố được nhà nghiên cứu chủ động thay đổi để xem tác dụng của nó gọi là biến",
       "ans": "độc lập",
       "post": ".",
       "wrong": [
        "phụ thuộc",
        "kiểm soát",
        "nhiễu"
       ],
       "ex": "Biến độc lập là cái ta thay đổi (liều phân bón), biến phụ thuộc là cái ta đo (chiều cao cây), các biến kiểm soát là mọi yếu tố còn lại phải giữ nguyên."
      },
      {
       "pre": "Khi báo cáo một phép đo, bên cạnh giá trị đo được bắt buộc phải ghi kèm",
       "ans": "sai số",
       "post": " để người đọc đánh giá độ tin cậy.",
       "wrong": [
        "dự đoán",
        "kết luận",
        "đồ thị"
       ],
       "ex": "Một con số không có sai số đi kèm là một con số “câm”: không ai biết nó chắc chắn tới hàng đơn vị hay hàng phần nghìn."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Chỉ cần đo một lần duy nhất thật cẩn thận là đủ để rút ra kết luận khoa học chắc chắn.",
       "truth": false,
       "explain": "Sai. Một lần đo không cho biết sai số ngẫu nhiên lớn cỡ nào và không kiểm chứng được tính lặp lại — hai yêu cầu tối thiểu của một kết quả đo đáng tin."
      },
      {
       "stmt": "Sai số ngẫu nhiên có thể được giảm bớt bằng cách đo lặp lại nhiều lần và lấy giá trị trung bình.",
       "truth": true,
       "explain": "Đúng. Các lệch ngẫu nhiên lúc dương lúc âm triệt tiêu nhau một phần khi lấy trung bình, nên trung bình của nhiều lần đo gần giá trị thật hơn từng lần đo riêng lẻ."
      },
      {
       "stmt": "Đo lặp lại càng nhiều lần thì sai số hệ thống cũng tự động biến mất theo.",
       "truth": false,
       "explain": "Sai. Sai số hệ thống lệch cùng một chiều ở mọi lần đo (ví dụ cân lệch +2 g) nên lấy trung bình cũng vẫn lệch y như vậy; phải hiệu chuẩn hoặc trừ độ lệch."
      },
      {
       "stmt": "Hai biến có tương quan rất chặt với nhau thì biến này chắc chắn là nguyên nhân gây ra biến kia.",
       "truth": false,
       "explain": "Sai. Tương quan chặt vẫn có thể do biến thứ ba cùng chi phối cả hai, hoặc do chiều nhân quả ngược lại. Nhân quả cần thêm cơ chế và thử nghiệm kiểm soát."
      },
      {
       "stmt": "Nhóm đối chứng giúp phân biệt tác dụng thật của thuốc với hiệu ứng giả dược và diễn biến tự nhiên của bệnh.",
       "truth": true,
       "explain": "Đúng. Cả hai nhóm cùng được theo dõi như nhau; phần chênh lệch duy nhất còn lại giữa nhóm thuốc thật và nhóm đối chứng mới quy được cho thuốc."
      },
      {
       "stmt": "Với mẫu được chọn đại diện, cỡ mẫu càng lớn thì tỉ lệ thống kê càng gần với thực tế của tổng thể.",
       "truth": true,
       "explain": "Đúng. Theo quy luật số lớn, mẫu càng lớn, dao động ngẫu nhiên của tỉ lệ càng nhỏ — với điều kiện mẫu được chọn không thiên lệch."
      },
      {
       "stmt": "Khi báo cáo kết quả đo, làm tròn con số thật đẹp (ví dụ 12,346 thành 12) là việc nên làm cho gọn.",
       "truth": false,
       "explain": "Sai. Làm tròn phải theo sai số của phép đo: sai số 0,2 thì ghi 12,3 ± 0,2. Làm tròn tuỳ tiện vừa mất thông tin vừa gây hiểu nhầm về độ chính xác."
      },
      {
       "stmt": "Biểu đồ có trục tung bị cắt ngắn (không bắt đầu từ 0) có thể khiến người xem đánh giá sai mức chênh lệch.",
       "truth": true,
       "explain": "Đúng. Mắt người so sánh chiều cao cột chứ không đọc kỹ trục số; cắt trục làm chênh lệch 5% trông như gấp đôi, gấp ba — thủ thuật trình bày rất hay gặp trong quảng cáo."
      },
      {
       "stmt": "Nếu một lần thí nghiệm cho kết quả xấu, khác mong đợi, nhà khoa học nên bỏ qua và chỉ công bố những lần đẹp.",
       "truth": false,
       "explain": "Sai. Chọn lọc kết quả để công bố (cherry-picking) là hành vi phi khoa học; kết quả không như mong đợi cũng là dữ liệu và có thể là manh mối quan trọng nhất."
      },
      {
       "stmt": "Dụng cụ có độ chia nhỏ nhất càng nhỏ thì sai số do dụng cụ gây ra càng nhỏ.",
       "truth": true,
       "explain": "Đúng. Sai số dụng cụ thường lấy bằng một nửa hoặc một độ chia nhỏ nhất; thước panme chia 0,01 mm cho sai số dụng cụ nhỏ hơn hẳn thước kẻ chia 1 mm."
      },
      {
       "stmt": "Một nghiên cứu đã được đăng trên tạp chí khoa học là bằng chứng cuối cùng, không cần ai lặp lại nữa.",
       "truth": false,
       "explain": "Sai. Đăng tạp chí mới là bước thẩm định ban đầu; giá trị của nghiên cứu được khẳng định khi các nhóm độc lập lặp lại được kết quả — nhiều kết quả nổi tiếng đã sụp đổ ở bước này."
      },
      {
       "stmt": "Ghi kết quả đo kèm theo sai số giúp người đọc đánh giá được độ tin cậy của kết quả.",
       "truth": true,
       "explain": "Đúng. “10,0 ± 0,1 cm” và “10 ± 2 cm” là hai kết quả có độ tin cậy rất khác nhau dù cùng một giá trị trung bình danh nghĩa."
      },
      {
       "stmt": "Giá trị trung bình cộng luôn là đại diện tốt cho một tập số liệu, kể cả khi có một vài giá trị bất thường cực đoan.",
       "truth": false,
       "explain": "Sai. Một giá trị bất thường cực đoan (ví dụ một bạn “thu nhập tỉ phú” trong lớp) kéo trung bình cộng lệch hẳn; khi đó số trung vị (median) đại diện trung thực hơn."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Ba câu hỏi vàng khi gặp bất kỳ con số nào: Đo bằng gì? Đo mấy lần, trên mẫu nào? So sánh với nhóm nào?",
      "Kết quả đo đúng chuẩn luôn có dạng: giá trị trung bình ± sai số. Thấy một con số “trần trụi” trong quảng cáo, hãy nghi ngờ.",
      "Tương quan không phải nhân quả: hãy luôn tự hỏi “còn biến thứ ba nào cùng gây ra cả hai không?” trước khi tin một kết luận nguyên nhân.",
      "Đọc biểu đồ theo thứ tự: tiêu đề → trục tung bắt đầu từ đâu → đơn vị → cỡ mẫu. Bốn cái đó quyết định 90% khả năng bị “dắt mũi”."
     ],
     "facts": [
      {
       "q": "Đo bốn lần một chiều dài được 2,1; 2,3; 2,2; 2,2 cm. Giá trị trung bình là bao nhiêu?",
       "a": "2,2 cm",
       "ex": "Tổng bốn lần đo: 2,1 + 2,3 + 2,2 + 2,2 = 8,8 cm; chia cho 4 lần được 2,2 cm."
      },
      {
       "q": "Vì sao chưa thể kết luận “dùng điện thoại nhiều gây cận thị” chỉ từ thống kê trẻ dùng điện thoại nhiều thì tỉ lệ cận cũng cao?",
       "a": "Đó là tương quan, còn nhiều yếu tố khác chưa loại trừ",
       "ex": "Trẻ dùng điện thoại nhiều thường cũng ít ra ngoài trời, đọc gần nhiều, có thể có yếu tố di truyền… Muốn kết luận nhân quả phải kiểm soát được các yếu tố đó trong nghiên cứu."
      }
     ],
     "pairs": [
      [
       "Sai số hệ thống",
       "lệch cố định do dụng cụ hoặc phương pháp"
      ],
      [
       "Sai số ngẫu nhiên",
       "lệch thất thường khác nhau từng lần đo"
      ],
      [
       "Nhóm đối chứng",
       "nhóm so sánh không nhận tác động thử nghiệm"
      ],
      [
       "Tương quan",
       "hai biến cùng thay đổi, chưa rõ nhân quả"
      ],
      [
       "Giả dược",
       "thuốc giả không hoạt chất dùng cho nhóm đối chứng"
      ],
      [
       "Cỡ mẫu",
       "số đối tượng được đo hoặc khảo sát"
      ]
     ]
    }
   },
   {
    "id": "cd-kh-thpt-traidat",
    "emoji": "🌌",
    "name": "Trái Đất & vũ trụ",
    "sub": "Mùa, Mặt Trăng, thuỷ triều và vũ trụ bao la — vì sao bầu trời vận hành như vậy?",
    "pools": {
     "choose": [
      {
       "q": "Một hiểu lầm rất phổ biến: “Mùa hè nóng vì lúc đó Trái Đất ở gần Mặt Trời nhất”. Sự thật là:",
       "ans": "Mùa do trục Trái Đất nghiêng, không do xa gần",
       "wrong": [
        "Mùa hè nóng vì Mặt Trời to ra theo mùa",
        "Mùa do Trái Đất quay nhanh hơn vào mùa hè",
        "Nửa Trái Đất hướng về Mặt Trời bị đốt nóng hơn"
       ],
       "ex": "Khoảng cách Trái Đất – Mặt Trời thay đổi rất ít trong năm và không đúng nhịp mùa (đầu tháng 1 Trái Đất còn ở gần Mặt Trời nhất, giữa mùa đông bán cầu Bắc). Mùa sinh ra vì trục Trái Đất nghiêng, khiến mỗi bán cầu lần lượt ngả về phía Mặt Trời."
      },
      {
       "q": "Khi bán cầu Bắc đang là mùa hè thì bán cầu Nam đang là mùa đông. Nguyên nhân trực tiếp là:",
       "ans": "Trục nghiêng làm hai bán cầu nhận nắng lệch nhau",
       "wrong": [
        "Mặt Trời chỉ chiếu sáng được một bán cầu mỗi năm",
        "Bán cầu Nam luôn ở xa Mặt Trời hơn bán cầu Bắc",
        "Hai bán cầu luân phiên quay mặt về Mặt Trời theo ngày"
       ],
       "ex": "Trục Trái Đất giữ nguyên hướng nghiêng khi quay quanh Mặt Trời; nửa năm bán cầu Bắc ngả về phía nắng (ngày dài, nắng gắt), nửa năm sau đến lượt bán cầu Nam — mùa ở hai bán cầu luôn ngược nhau."
      },
      {
       "q": "Vào ngày xuân phân và thu phân (khoảng 21/3 và 23/9), điều đặc biệt xảy ra trên toàn Trái Đất là:",
       "ans": "Cả hai bán cầu nhận nắng như nhau, ngày đêm xấp xỉ bằng",
       "wrong": [
        "Mặt Trời ngừng mọc ở hai vùng cực",
        "Trái Đất ở gần Mặt Trời nhất trong năm",
        "Mọi nơi trên Trái Đất đều nóng như nhau"
       ],
       "ex": "Hai ngày phân, tia nắng chiếu vuông góc với xích đạo và đường sáng – tối đi qua cả hai cực, nên mọi nơi ngày và đêm dài gần bằng nhau (khoảng 12 giờ)."
      },
      {
       "q": "Dù nhìn ở bất cứ thời đại nào, con người cũng chỉ thấy đúng một mặt của Mặt Trăng. Vì sao?",
       "ans": "Tự quay của Mặt Trăng khớp với vòng quay quanh Trái Đất",
       "wrong": [
        "Mặt Trăng không tự quay quanh trục của nó",
        "Nửa kia của Mặt Trăng luôn chìm trong bóng tối",
        "Mặt Trăng quay quá nhanh nên ta không kịp thấy mặt sau"
       ],
       "ex": "Mặt Trăng bị “khoá thuỷ triều”: thời gian nó tự quay một vòng (khoảng 27,3 ngày) đúng bằng thời gian quay quanh Trái Đất, nên cùng một bán cầu luôn hướng về phía ta. Mặt sau chỉ được thấy nhờ tàu vũ trụ."
      },
      {
       "q": "Trong một tháng âm lịch, Mặt Trăng khi tròn, khi khuyết, khi mất hẳn. Các “pha trăng” này do:",
       "ans": "Vị trí tương đối Mặt Trời – Mặt Trăng – Trái Đất thay đổi",
       "wrong": [
        "Mặt Trăng tự thay đổi hình dạng theo chu kì",
        "Bóng của Trái Đất che Mặt Trăng dần từng đêm",
        "Mây trong khí quyển che khuất một phần Mặt Trăng"
       ],
       "ex": "Một nửa Mặt Trăng luôn được Mặt Trời chiếu sáng; từ Trái Đất ta nhìn nửa sáng đó ở các góc khác nhau tuỳ vị trí của Mặt Trăng trên quỹ đạo, nên thấy phần sáng lúc đầy lúc vơi. (Bóng Trái Đất che là nguyệt thực — chuyện khác và hiếm hơn nhiều.)"
      },
      {
       "q": "Nhật thực xảy ra khi ba thiên thể xếp theo thứ tự nào?",
       "ans": "Mặt Trăng nằm giữa Mặt Trời và Trái Đất",
       "wrong": [
        "Trái Đất nằm giữa Mặt Trời và Mặt Trăng",
        "Mặt Trời nằm giữa Trái Đất và Mặt Trăng",
        "Mặt Trăng nằm sau Trái Đất so với Mặt Trời"
       ],
       "ex": "Nhật thực chỉ xảy ra vào ngày trăng non: Mặt Trăng chen vào giữa, bóng của nó quét một dải hẹp trên mặt đất — nơi đó ban ngày bỗng tối sầm vài phút."
      },
      {
       "q": "Nếu Mặt Trăng quay quanh Trái Đất đều đặn mỗi tháng, vì sao không phải tháng nào cũng có nhật thực và nguyệt thực?",
       "ans": "Quỹ đạo Mặt Trăng nghiêng so với quỹ đạo Trái Đất",
       "wrong": [
        "Mặt Trăng đôi khi bay lệch khỏi quỹ đạo của nó",
        "Nhật thực bị mây che nên ta không thấy hàng tháng",
        "Trái Đất quay không đều nên hiếm khi thẳng hàng"
       ],
       "ex": "Quỹ đạo Mặt Trăng nghiêng khoảng 5° so với mặt phẳng quỹ đạo Trái Đất, nên phần lớn các tháng bóng của Mặt Trăng trượt qua phía trên hoặc dưới Trái Đất. Chỉ khi trăng non/tròn đúng gần điểm giao nhau của hai quỹ đạo mới có thực."
      },
      {
       "q": "Nguyệt thực chỉ có thể xảy ra vào đêm trăng tròn. Vì sao?",
       "ans": "Trái Đất nằm giữa Mặt Trời và Mặt Trăng đúng hàng",
       "wrong": [
        "Đêm trăng tròn là đêm sáng nhất nên dễ thấy",
        "Mặt Trăng vào đêm tròn ở gần Trái Đất nhất",
        "Trăng tròn phát sáng mạnh nên bị che thấy rõ"
       ],
       "ex": "Nguyệt thực là Mặt Trăng đi vào bóng của Trái Đất; muốn vậy Mặt Trời – Trái Đất – Mặt Trăng phải thẳng hàng với Trái Đất ở giữa, và cấu hình đó ứng với lúc trăng tròn."
      },
      {
       "q": "Nước biển ở các cảng dâng lên hạ xuống theo chu kì đều đặn mỗi ngày — thuỷ triều. Lực chính gây ra thuỷ triều là:",
       "ans": "Lực hấp dẫn của Mặt Trăng (và một phần Mặt Trời)",
       "wrong": [
        "Gió thổi nước biển dồn vào bờ theo mùa",
        "Trái Đất quay làm nước văng ra hai bên",
        "Sóng thần nhỏ lặp lại hằng ngày theo chu kì"
       ],
       "ex": "Mặt Trăng gần Trái Đất nên lực hút của nó lên phía nước đối diện khác hẳn phía xa, kéo nước biển phình thành hai “bướu” đối xứng nhau. Mặt Trời cũng góp phần nhưng yếu hơn vì ở quá xa."
      },
      {
       "q": "Hầu hết các bờ biển mỗi ngày có tới hai lần triều lên. Điều này gắn với sự thật nào về thuỷ triều?",
       "ans": "Nước biển phình về hai phía đối diện của Trái Đất",
       "wrong": [
        "Mặt Trăng mọc hai lần trong một ngày",
        "Có hai đại dương lớn luân phiên dâng nước",
        "Sóng biển dội lại từ bờ bên kia của đại dương"
       ],
       "ex": "Hai bướu nước nằm ở phía gần Mặt Trăng nhất và phía đối diện; Trái Đất tự quay một vòng mỗi ngày nên mỗi vùng biển lần lượt đi qua cả hai bướu, cho hai lần nước lên (cách nhau khoảng 12 giờ 25 phút)."
      },
      {
       "q": "Triều cường — những ngày nước lên cao nhất và xuống thấp nhất — thường rơi vào đầu tháng và giữa tháng âm lịch (trăng non và trăng tròn). Vì sao?",
       "ans": "Khi Mặt Trời, Mặt Trăng, Trái Đất gần thẳng hàng",
       "wrong": [
        "Đầu tháng âm lịch Mặt Trăng ở gần Trái Đất nhất",
        "Trăng tròn hút nước mạnh hơn trăng khuyết",
        "Những ngày đó gió biển thổi mạnh nhất"
       ],
       "ex": "Khi ba thiên thể thẳng hàng, lực gây triều của Mặt Trời cộng hưởng cùng chiều với của Mặt Trăng nên triều đạt cực đại (triều cường); lúc trăng bán nguyệt hai lực lệch hướng nhau, triều yếu nhất (triều kém)."
      },
      {
       "q": "Ánh sáng từ Mặt Trời mất bao lâu mới truyền tới Trái Đất?",
       "ans": "Khoảng 8 phút 20 giây",
       "wrong": [
        "Khoảng 8 giây",
        "Ngay lập tức, không mất thời gian",
        "Khoảng 1 giờ 20 phút"
       ],
       "ex": "Khoảng cách Mặt Trời – Trái Đất ~150 triệu km, ánh sáng đi 300.000 km/s nên mất chừng 500 giây ≈ 8 phút 20 giây. Nghĩa là ta luôn nhìn thấy Mặt Trời của “8 phút trước”."
      },
      {
       "q": "Các nhà thiên văn nói “nhìn lên bầu trời đêm là nhìn về quá khứ”. Câu này đúng vì:",
       "ans": "Ánh sáng cần thời gian dài mới truyền tới mắt ta",
       "wrong": [
        "Các ngôi sao ta thấy đều đã chết từ lâu",
        "Kính thiên văn lưu lại hình ảnh cũ của vũ trụ",
        "Ánh sáng sao bị uốn cong nên tới muộn bất thường"
       ],
       "ex": "Ánh sáng sao cách ta hàng nghìn năm ánh sáng thì phải đi hàng nghìn năm mới tới nơi; hình ảnh ta nhận được hôm nay kể câu chuyện của ngôi sao từ hàng nghìn năm trước — có sao nay đã tắt mà ánh sáng vẫn đang trên đường đi."
      },
      {
       "q": "Thiên hà Tiên Nữ (Andromeda) — thiên hà lớn gần chúng ta nhất — cách Trái Đất khoảng:",
       "ans": "Khoảng 2,5 triệu năm ánh sáng",
       "wrong": [
        "Khoảng 2,5 nghìn năm ánh sáng",
        "Khoảng 250 năm ánh sáng",
        "Khoảng 2,5 tỉ năm ánh sáng"
       ],
       "ex": "Tiên Nữ cách ta ~2,5 triệu năm ánh sáng nhưng vẫn sáng đủ để mắt thường thấy được trong đêm tối quang đãng (một vệt mờ nhỏ) — đó là vật ở xa nhất mà mắt người trần nhìn thấy được."
      },
      {
       "q": "Người quan sát tinh ý sẽ thấy: các ngôi sao “nhấp nháy” liên tục còn các hành tinh (sao Kim, sao Mộc) sáng khá đều. Khác biệt là vì:",
       "ans": "Hành tinh gần hơn, hiện thành đĩa nhỏ nên ít nhấp nháy",
       "wrong": [
        "Hành tinh tự phát sáng ổn định hơn ngôi sao",
        "Ngôi sao nhấp nháy vì chúng đang cháy dở",
        "Khí quyển chỉ làm nhấp nháy vật ở trên cao"
       ],
       "ex": "Nhấp nháy do khí quyển nhiễu loạn bẻ cong tia sáng. Ngôi sao ở quá xa nên hiện như một điểm sáng duy nhất — dễ bị nhiễu loạn nuốt mất từng lúc; hành tinh gần hơn, hiện thành đĩa nhỏ gồm nhiều điểm sáng bù nhau nên trông ổn định."
      },
      {
       "q": "“Sao băng” vụt sáng trên trời đêm thực chất là gì?",
       "ans": "Mẩu đá vũ trụ cháy sáng khi lao vào khí quyển",
       "wrong": [
        "Một ngôi sao đang rơi xuống Trái Đất",
        "Vệ tinh nhân tạo bị cháy khi hết nhiệm vụ",
        "Tia lửa điện giữa các đám mây ở tầng cao"
       ],
       "ex": "Đó là thiên thạch nhỏ (cỡ hạt cát tới viên sỏi) lao vào khí quyển với tốc độ hàng chục km/s, ma sát với không khí làm nó nóng trắng và cháy rụi — không liên quan gì tới các ngôi sao thật."
      },
      {
       "q": "Trên Trạm Vũ trụ Quốc tế (ISS), phi hành gia lơ lửng như không có trọng lượng. Giải thích đúng là:",
       "ans": "Trạm và người cùng rơi tự do quanh Trái Đất",
       "wrong": [
        "Ở độ cao đó Trái Đất không còn hút nữa",
        "Trạm có máy tạo môi trường không trọng lực",
        "Phi hành gia nhẹ đi vì ở ngoài vũ trụ"
       ],
       "ex": "Ở độ cao ~400 km trọng lực Trái Đất vẫn còn khoảng 90% so với mặt đất. Trạm và mọi thứ trong đó cùng “rơi” liên tục quanh Trái Đất với cùng một gia tốc nên cảm giác như không trọng lượng — rơi tự do vĩnh viễn không chạm đất nhờ tốc độ ngang rất lớn."
      },
      {
       "q": "Trạm Vũ trụ Quốc tế bay ở độ cao khoảng bao nhiêu và mất bao lâu cho một vòng quanh Trái Đất?",
       "ans": "Khoảng 400 km, một vòng chừng 90 phút",
       "wrong": [
        "Khoảng 36.000 km, một vòng 24 giờ",
        "Khoảng 4.000 km, một vòng 12 giờ",
        "Khoảng 40 km, một vòng 30 phút"
       ],
       "ex": "ISS ở quỹ đạo thấp ~400 km, tốc độ ~28.000 km/h, quay một vòng khoảng 90 phút — phi hành đoàn thấy Mặt Trời mọc và lặn tới 16 lần trong một ngày đêm."
      },
      {
       "q": "Vệ tinh khí tượng địa tĩnh cho ảnh mây liên tục của đúng một vùng (ví dụ cả khu vực Đông Nam Á). Nó phải “đậu” ở đâu?",
       "ans": "Trên xích đạo, quay cùng tốc độ tự quay của Trái Đất",
       "wrong": [
        "Ngay trên cực Bắc để nhìn xuống toàn cầu",
        "Bay vòng qua hai cực mỗi 90 phút một vòng",
        "Đứng yên ngoài vũ trụ không cần quỹ đạo"
       ],
       "ex": "Ở độ cao ~36.000 km trên xích đạo, chu kì quay của vệ tinh khớp với một vòng tự quay của Trái Đất nên vệ tinh như dán cố định trên bầu trời của vùng đó — điều kiện để chụp ảnh mây liên tục."
      },
      {
       "q": "Việt Nam có một mùa mưa và một mùa khô rõ rệt, khác hẳn vùng xích đạo mưa quanh năm. Nguyên nhân chính là:",
       "ans": "Gió mùa đổi hướng theo mùa mang theo hơi ẩm khác nhau",
       "wrong": [
        "Việt Nam nằm đúng trên đường xích đạo",
        "Biển Đông lúc nóng lên lúc lạnh đi bất thường",
        "Mùa mưa do Mặt Trăng hút nước biển dâng cao"
       ],
       "ex": "Gió mùa mùa hè thổi từ biển vào mang hơi ẩm gây mưa; gió mùa mùa đông thổi từ lục địa lạnh khô ra biển. Sự đổi hướng gió theo mùa — do đất liền và biển nóng lên, lạnh đi lệch nhịp — tạo nên hai mùa mưa khô ở Việt Nam."
      },
      {
       "q": "Các đường chí tuyến (23,5° Bắc và Nam) và vòng cực trên bản đồ không phải vẽ tuỳ ý. Chúng tồn tại vì:",
       "ans": "Trục Trái Đất nghiêng 66°33' so với mặt phẳng quỹ đạo",
       "wrong": [
        "Các nhà địa lí thống nhất chia bản đồ cho đều",
        "Mặt Trời chỉ chiếu sáng được trong phạm vi đó",
        "Từ trường Trái Đất tạo ra các đường này"
       ],
       "ex": "SGK Địa lí 10 (Bài 5, tr.17 và tr.20) nêu: trục Trái Đất nghiêng với mặt phẳng quỹ đạo một góc khoảng 66°33', tức nghiêng 23°27' (khoảng 23,5°) so với đường thẳng vuông góc với mặt phẳng quỹ đạo, và hướng nghiêng không đổi trong năm. Vì vậy tia nắng chỉ chiếu vuông góc tới tối đa 23,5° Bắc và 23,5° Nam (hai chí tuyến), còn từ 66,5° trở về hai cực thì có hiện tượng ngày, đêm cực (hai vòng cực)."
      },
      {
       "q": "“Đêm trắng” và hiện tượng Mặt Trời nửa đêm (nửa đêm vẫn sáng) quan sát được ở đâu?",
       "ans": "Vùng gần cực vào mùa hè của bán cầu đó",
       "wrong": [
        "Ở xích đạo vào ngày xuân phân",
        "Ở mọi nơi thuộc chí tuyến vào mùa hè",
        "Chỉ trên tàu biển giữa Thái Bình Dương"
       ],
       "ex": "Vào mùa hè, vùng cực của bán cầu đang ngả về Mặt Trời được chiếu sáng suốt ngày đêm: Mặt Trời không lặn hẳn (Mặt Trời nửa đêm) hoặc chỉ khuất rất nông dưới chân trời nên trời vẫn sáng như hoàng hôn (đêm trắng)."
      },
      {
       "q": "Lúc hoàng hôn, Mặt Trời trông đỏ hơn và hơi “dẹt” so với giữa trưa. Nguyên nhân là:",
       "ans": "Ánh sáng xuyên lớp khí quyển dày, tán xạ mạnh",
       "wrong": [
        "Mặt Trời thật sự nguội đi vào buổi chiều",
        "Mắt người mệt sau một ngày nên nhìn sai màu",
        "Mặt Trời bị Trái Đất che khuất một phần"
       ],
       "ex": "Khi Mặt Trời ở thấp, tia sáng phải xuyên qua lớp khí quyển dày hơn nhiều: ánh sáng xanh bị tán xạ hết dọc đường, chỉ còn đỏ cam tới mắt; khúc xạ khí quyển không đều ở rìa dưới làm đĩa Mặt Trời trông hơi dẹt."
      },
      {
       "q": "Sóng thần khác hẳn sóng biển do gió ở điểm cốt lõi nào?",
       "ans": "Nguồn gốc từ động đất đáy biển, năng lượng khổng lồ",
       "wrong": [
        "Sóng thần chỉ xuất hiện vào ban đêm",
        "Sóng thần là sóng biển cao hơn bình thường một chút",
        "Sóng thần di chuyển chậm hơn sóng thường"
       ],
       "ex": "Sóng thần sinh ra khi đáy biển dịch chuyển đột ngột (động đất, sạt lở), làm cả cột nước khổng lồ chuyển động; ngoài khơi nó thấp nhưng cực dài và nhanh (tới 700 km/h), vào vùng nước nông mới dựng đứng thành bức tường nước tàn phá."
      },
      {
       "q": "Động đất và núi lửa trên Trái Đất không rải đều mà tập trung thành những vành đai (như vành đai lửa Thái Bình Dương). Vì sao?",
       "ans": "Nằm trên ranh giới các mảng kiến tạo",
       "wrong": [
        "Các vành đai đó nằm gần xích đạo nóng nhất",
        "Con người xây thành phố nhiều ở đó nên thấy rõ",
        "Núi lửa tự hút nhau thành chuỗi dài"
       ],
       "ex": "Vỏ Trái Đất gồm nhiều mảng cứng trôi dạt trên lớp vật chất nóng chảy; nơi các mảng va chạm, tách ra hoặc trượt qua nhau là nơi tích và giải phóng năng lượng — động đất, núi lửa vì thế xếp hàng dọc ranh giới mảng."
      },
      {
       "q": "Trên mạng xã hội thỉnh thoảng lan truyền tin “siêu trăng sắp tới sẽ gây động đất lớn, sóng thần”. Đánh giá đúng về tin này là:",
       "ans": "Chưa có bằng chứng đáng tin về mối liên hệ đó",
       "wrong": [
        "Đúng, siêu trăng luôn đi kèm thiên tai lớn",
        "Sai vì siêu trăng không phải hiện tượng có thật",
        "Chỉ đúng với các nước gần bờ biển phía đông"
       ],
       "ex": "“Siêu trăng” là trăng tròn trùng lúc Mặt Trăng ở gần Trái Đất — hiệu ứng triều có tăng chút ít nhưng thống kê khoa học dài hạn không cho thấy động đất lớn tăng theo siêu trăng. Thiên tai cần bằng chứng thống kê, không kết luận theo vài trùng hợp gây chú ý."
      },
      {
       "q": "Vị trí Mặt Trời mọc trên chân trời không cố định: mùa hè ở Việt Nam nó mọc lệch về phía bắc nhiều hơn mùa đông. Hiện tượng này do:",
       "ans": "Trục nghiêng làm góc chiếu nắng thay đổi theo mùa",
       "wrong": [
        "Mặt Trời đổi quỹ đạo theo từng mùa trong năm",
        "Chân trời của mỗi địa phương tự xoay theo mùa",
        "Trái Đất tiến gần Mặt Trời hơn vào mùa hè"
       ],
       "ex": "Vì trục Trái Đất nghiêng và giữ nguyên hướng trong lúc quay quanh Mặt Trời, góc nghiêng của tia nắng so với mỗi địa điểm thay đổi theo mùa — điểm mọc/lặn của Mặt Trời do đó trượt dần trên chân trời suốt năm (đây cũng là “chuyển động nhìn thấy” của Mặt Trời trong sách KHTN 6)."
      }
     ],
     "blank": [
      {
       "pre": "Khoảng cách trung bình từ Trái Đất tới Mặt Trời khoảng",
       "ans": "150 triệu km",
       "post": " — được lấy làm một đơn vị thiên văn (1 AU).",
       "wrong": [
        "384 nghìn km",
        "15 triệu km",
        "1,5 tỉ km"
       ],
       "ex": "384 nghìn km là khoảng cách tới Mặt Trăng. Đơn vị thiên văn giúp đo các khoảng cách trong hệ Mặt Trời cho gọn: Sao Mộc cách Mặt Trời khoảng 5,2 AU."
      },
      {
       "pre": "Khoảng cách trung bình từ Trái Đất tới Mặt Trăng khoảng",
       "ans": "384.000 km",
       "post": ".",
       "wrong": [
        "38.400 km",
        "3,84 triệu km",
        "150 triệu km"
       ],
       "ex": "Ánh sáng (và tín hiệu radio) mất chừng 1,3 giây để đi quãng đường này — các phi hành gia Apollo nói chuyện với Trái Đất luôn có độ trễ nhỏ như vậy."
      },
      {
       "pre": "Hiện tượng Mặt Trăng che khuất Mặt Trời khi nhìn từ Trái Đất gọi là",
       "ans": "nhật thực",
       "post": ".",
       "wrong": [
        "nguyệt thực",
        "sao băng",
        "cực quang"
       ],
       "ex": "Nhật thực xảy ra vào trăng non; nguyệt thực thì ngược lại — bóng Trái Đất che Mặt Trăng vào đêm trăng tròn."
      },
      {
       "pre": "Hiện tượng nước biển dâng lên và hạ xuống theo chu kì do lực hấp dẫn của Mặt Trăng được gọi là",
       "ans": "thuỷ triều",
       "post": ".",
       "wrong": [
        "sóng thần",
        "dòng biển",
        "lũ lụt"
       ],
       "ex": "Thuỷ triều đều đặn theo chu kì khoảng 12 giờ 25 phút cho một lần lên, gắn với chuyển động quay của Trái Đất dưới hai bướu nước do Mặt Trăng hút."
      },
      {
       "pre": "Hệ Mặt Trời của chúng ta nằm trong thiên hà có tên là",
       "ans": "dải Ngân Hà",
       "post": ".",
       "wrong": [
        "thiên hà Tiên Nữ",
        "thiên hà Tam Giác",
        "thiên hà Xoáy Nước"
       ],
       "ex": "Dải Ngân Hà chứa hàng trăm tỉ ngôi sao; vệt sáng trắng mờ vắt ngang trời đêm chính là ta đang nhìn dọc theo đĩa của thiên hà mình từ bên trong."
      },
      {
       "pre": "Hành tinh ở gần Mặt Trời nhất trong hệ Mặt Trời là",
       "ans": "Sao Thuỷ",
       "post": ".",
       "wrong": [
        "Sao Kim",
        "Sao Hoả",
        "Trái Đất"
       ],
       "ex": "Thứ tự từ Mặt Trời ra: Thuỷ – Kim – Trái Đất – Hoả – Mộc – Thổ – Thiên Vương – Hải Vương. Sao Thuỷ nhỏ nhất trong tám hành tinh và một năm ở đó chỉ dài 88 ngày Trái Đất."
      },
      {
       "pre": "Thời gian để ánh sáng từ Mặt Trời truyền tới Trái Đất khoảng",
       "ans": "8 phút",
       "post": " (hơn 8 phút một chút).",
       "wrong": [
        "8 giây",
        "1 giờ",
        "8 giờ"
       ],
       "ex": "Chính xác là khoảng 8 phút 20 giây. Mọi thứ ta thấy trên bầu trời đều là hình ảnh của quá khứ, chỉ khác nhau ở độ xa."
      },
      {
       "pre": "Vùng trên Trái Đất nhận được nhiều ánh nắng nhất quanh năm nằm ở gần",
       "ans": "xích đạo",
       "post": ".",
       "wrong": [
        "hai cực",
        "vòng cực Bắc",
        "chí tuyến Nam"
       ],
       "ex": "Ở xích đạo, tia nắng gần như vuông góc quanh năm và ngày đêm luôn xấp xỉ 12 giờ; càng về hai cực, nắng càng xiên và chênh lệch ngày đêm theo mùa càng cực đoan."
      },
      {
       "pre": "Mặt Trời mọc ở hướng đông, lặn ở hướng tây là chuyển động",
       "ans": "biểu kiến (nhìn thấy)",
       "post": ", sinh ra do Trái Đất tự quay quanh trục.",
       "wrong": [
        "thật của Mặt Trời quanh Trái Đất",
        "của Mặt Trăng quanh Trái Đất",
        "của các ngôi sao quanh cực"
       ],
       "ex": "KHTN 6 gọi đây là chuyển động nhìn thấy: Mặt Trời không hề chạy quanh Trái Đất mỗi ngày; chính Trái Đất tự quay từ tây sang đông làm ta thấy Mặt Trời, Mặt Trăng và sao “mọc – lặn” ngược lại."
      },
      {
       "pre": "Lớp vỏ khí bao quanh Trái Đất, nơi diễn ra mọi hiện tượng thời tiết, gọi là",
       "ans": "khí quyển",
       "post": ".",
       "wrong": [
        "thạch quyển",
        "thuỷ quyển",
        "sinh quyển"
       ],
       "ex": "Bốn “quyển” của Trái Đất trong Địa lí 10: thạch quyển (vỏ đá), khí quyển (vỏ khí), thuỷ quyển (nước) và sinh quyển (sự sống) — chúng tác động qua lại thành một hệ thống thống nhất."
      }
     ],
     "match": [],
     "games": [
      {
       "stmt": "Mùa hè ở bán cầu Bắc là thời gian Trái Đất ở gần Mặt Trời nhất trong năm.",
       "truth": false,
       "explain": "Sai, thậm chí ngược lại: đầu tháng 7 Trái Đất ở gần điểm xa Mặt Trời nhất. Mùa do độ nghiêng của trục quyết định, không phải do khoảng cách."
      },
      {
       "stmt": "Nguyệt thực có thể xảy ra vào bất kì đêm nào trong tháng âm lịch.",
       "truth": false,
       "explain": "Sai. Nguyệt thực cần Mặt Trời – Trái Đất – Mặt Trăng thẳng hàng với Trái Đất ở giữa, cấu hình chỉ ứng với đêm trăng tròn (giữa tháng âm lịch)."
      },
      {
       "stmt": "Mặt Trăng tự quay một vòng đúng bằng thời gian nó quay một vòng quanh Trái Đất.",
       "truth": true,
       "explain": "Đúng. Cả hai chu kì đều khoảng 27,3 ngày (khoá thuỷ triều) nên Mặt Trăng luôn hướng cùng một mặt về phía Trái Đất."
      },
      {
       "stmt": "Thuỷ triều chủ yếu do Mặt Trời gây ra, vì Mặt Trời to hơn Mặt Trăng rất nhiều.",
       "truth": false,
       "explain": "Sai. Lực gây triều phụ thuộc mạnh vào khoảng cách: Mặt Trăng ở gần Trái Đất hơn vô cùng nhiều nên gây triều mạnh gấp khoảng hai lần Mặt Trời, dù Mặt Trời lớn hơn hẳn."
      },
      {
       "stmt": "Ánh sáng của nhiều ngôi sao ta thấy đêm nay đã rời khỏi ngôi sao từ hàng nghìn năm trước.",
       "truth": true,
       "explain": "Đúng. Các sao ở cách ta hàng nghìn năm ánh sáng; ánh sáng của chúng đi suốt hàng nghìn năm mới tới nơi, nên ta đang xem “quá khứ” của chúng."
      },
      {
       "stmt": "Cực quang sinh ra khi các hạt mang điện từ gió Mặt Trời lao vào khí quyển ở vùng gần hai cực.",
       "truth": true,
       "explain": "Đúng. Từ trường Trái Đất dẫn các hạt điện tích từ Mặt Trời về hai vùng cực; chúng kích thích khí quyển tầng cao phát sáng thành những dải cực quang nhiều màu."
      },
      {
       "stmt": "Mọi nơi trên Trái Đất, quanh năm ngày và đêm đều dài đúng 12 giờ như nhau.",
       "truth": false,
       "explain": "Sai. Chỉ xích đạo mới gần đúng như vậy. Càng xa xích đạo, chênh lệch ngày – đêm theo mùa càng lớn, tới mức vùng cực có ngày dài 24 giờ và đêm dài 24 giờ."
      },
      {
       "stmt": "Ngoài khơi xa, sóng thần thường thấp và rất dài nhưng di chuyển cực nhanh; vào gần bờ nó mới dâng cao nguy hiểm.",
       "truth": true,
       "explain": "Đúng. Ở đại dương sâu, sóng thần chỉ cao vài chục xăngtimét nhưng bước sóng hàng trăm kilômét, tốc độ tới ~700 km/h; vào vùng nước nông, phần trước chậm lại, nước dồn lên thành tường cao."
      },
      {
       "stmt": "Các hành tinh trong hệ Mặt Trời tự phát sáng giống như các ngôi sao.",
       "truth": false,
       "explain": "Sai. Hành tinh không tự phát sáng đáng kể; ta thấy chúng nhờ ánh sáng Mặt Trời phản chiếu lại — đó cũng là lí do Mặt Trăng “sáng” được."
      },
      {
       "stmt": "Trái Đất quay quanh Mặt Trời một vòng mất khoảng 365,25 ngày, và phần lẻ 0,25 ngày là lí do có năm nhuận.",
       "truth": true,
       "explain": "Đúng. Bốn phần lẻ 0,25 ngày cộng lại thành một ngày; cứ bốn năm ta thêm ngày 29/2 để lịch không bị trôi dần so với các mùa."
      },
      {
       "stmt": "Nhật thực toàn phần xảy ra thì mọi nơi trên Trái Đất đều quan sát được cùng một lúc.",
       "truth": false,
       "explain": "Sai. Bóng của Mặt Trăng trên mặt đất chỉ rộng chừng 100–270 km; chỉ người đứng trong dải hẹp đó mới thấy nhật thực toàn phần, ngoài dải chỉ thấy nhật thực một phần hoặc không thấy gì."
      },
      {
       "stmt": "Gió mùa hình thành do đất liền và biển nóng lên, lạnh đi với tốc độ khác nhau theo mùa.",
       "truth": true,
       "explain": "Đúng. Mùa hè lục địa nóng nhanh hơn biển, tạo vùng áp thấp hút gió ẩm từ biển vào; mùa đông quá trình đảo ngược, gió khô lạnh thổi từ lục địa ra — cơ chế cốt lõi của gió mùa châu Á."
      },
      {
       "stmt": "Vệ tinh nhân tạo ở quỹ đạo thấp bay trên cao nên không còn chịu tác dụng của trọng lực Trái Đất.",
       "truth": false,
       "explain": "Sai. Chính trọng lực là lực hướng tâm giữ vệ tinh trên quỹ đạo; ở vài trăm kilômét độ cao, trọng lực vẫn mạnh khoảng 90% so với mặt đất. Vệ tinh không bị “thoát khỏi” trọng lực mà luôn rơi quanh Trái Đất."
      }
     ]
    },
    "knowledge": {
     "notes": [
      "Câu thần chú chống hiểu lầm về mùa: “Nghiêng trục, không phải xa gần”. Muốn kiểm chứng, hãy nhớ mùa ở hai bán cầu luôn ngược nhau — khoảng cách tới Mặt Trời không thể giải thích điều đó.",
      "Nhìn lên trời là nhìn về quá khứ: ánh sáng đi với tốc độ hữu hạn, vật càng xa, hình ảnh của nó càng “cũ”.",
      "Phân biệt chuyển động THẬT và chuyển động NHÌN THẤY (biểu kiến): Mặt Trời “mọc và lặn” là do Trái Đất tự quay, không phải Mặt Trời chạy quanh ta.",
      "Các dự báo thiên văn (nhật thực, thuỷ triều, siêu trăng) đều tính trước được bằng mô hình chuyển động — và kiểm chứng được bằng quan sát; tin đồn thiên tai không có mô hình và số liệu đi kèm thì không đáng tin."
     ],
     "facts": [
      {
       "q": "Vì sao trăng tròn luôn rơi vào khoảng giữa tháng âm lịch?",
       "a": "Nửa Mặt Trăng hướng về Trái Đất được chiếu sáng trọn",
       "ex": "Giữa tháng âm lịch, Mặt Trăng ở phía đối diện Mặt Trời so với Trái Đất nên toàn bộ nửa hướng về ta nằm trong vùng được chiếu sáng — ta thấy đĩa trăng tròn đầy."
      },
      {
       "q": "Vì sao cứ bốn năm lại có một năm nhuận thêm ngày 29 tháng 2?",
       "a": "Năm thiên văn dài hơn 365 ngày khoảng 6 giờ",
       "ex": "Một vòng Trái Đất quanh Mặt Trời mất ~365,25 ngày. Bốn phần thừa 0,25 ngày (6 giờ) mỗi năm dồn lại thành một ngày nhuận để lịch giữ đúng nhịp với các mùa."
      }
     ],
     "pairs": [
      [
       "Nhật thực",
       "Mặt Trăng che khuất Mặt Trời"
      ],
      [
       "Nguyệt thực",
       "bóng của Trái Đất che Mặt Trăng"
      ],
      [
       "Thuỷ triều",
       "nước biển dâng hạ do lực hút của Mặt Trăng"
      ],
      [
       "Năm ánh sáng",
       "quãng đường ánh sáng đi được trong một năm"
      ],
      [
       "Quỹ đạo địa tĩnh",
       "vệ tinh quay cùng nhịp, đứng yên trên xích đạo"
      ],
      [
       "Chí tuyến",
       "giới hạn vĩ độ tia nắng chiếu vuông góc tới được"
      ]
     ]
    }
   }
  ]
 }
};

/* ================================================================
   KHÁM PHÁ KHOA HỌC — PHẦN LÕI CUỐI (chép khuôn core-tail của
   tienganh.js): đăng ký Kiến thức, hợp đồng gộp dữ liệu
   __KH_PARTS, móc ngữ cảnh Ôn câu sai dạng xích, màn hình nhánh,
   phơi window.__KH.
   ================================================================ */
(function () {
  var BANDS = window.__KH_BANDS || [];
  var KH_SUBJ = { id: "chuyende", name: "🔬 Khám phá khoa học", emoji: "🔬", desc: "Khám phá khoa học", cls: "", topics: [] };
  BANDS.forEach(function (b) { (b.topics || []).forEach(function (t) { KH_SUBJ.topics.push(t); }); });

  function findTopic(id) {
    for (var i = 0; i < KH_SUBJ.topics.length; i++) if (KH_SUBJ.topics[i].id === id) return KH_SUBJ.topics[i];
    return null;
  }
  function bandOf(t) {
    for (var i = 0; i < BANDS.length; i++) { var ts = BANDS[i].topics || []; for (var j = 0; j < ts.length; j++) if (ts[j] === t) return BANDS[i]; }
    return null;
  }

  /* --- Đăng ký Kiến thức cho từng chủ đề (đúng khuôn tienganh.js):
     t.knowledge chuẩn hoá {facts, pairs, grade, subject}; notes
     đăng ký vào __MATH_KNOWLEDGE_NOTES theo id chủ đề. --- */
  var mn = window.__MATH_KNOWLEDGE_NOTES = window.__MATH_KNOWLEDGE_NOTES || {};
  function registerKnowledge(t) {
    var k = t.knowledge || {};
    if (k.__khRegistered && !k.notes && !k.facts) return;
    t.knowledge = {
      facts: (k.facts || []).map(function (f) { return { q: f.q, a: f.a, ex: f.ex || "", visual: f.visual || "" }; }),
      pairs: k.pairs || [],
      grade: (bandOf(t) || { grades: [3] }).grades[0],
      subject: "Khám phá khoa học"
    };
    if (k.notes && k.notes.length) mn[t.id] = k.notes.slice();
    t.knowledge.__khRegistered = true;
  }
  KH_SUBJ.topics.forEach(registerKnowledge);

  /* --- HỢP ĐỒNG GỘP DỮ LIỆU cho vòng tích hợp -------------------
     Các tệp phần gán window.__KH_PARTS.<bandId> = {topics: [...]}
     (topic đúng khuôn: id/emoji/name/sub/pools/knowledge), sau đó
     gọi window.__KH.mergeParts(). Gộp theo id:
     - id trùng khung: nối mảng pools theo từng dạng (choose/
       blank/match/games), thay knowledge/name/sub/emoji nếu phần
       có khai; đăng ký lại Kiến thức.
     - id chưa có: thêm nguyên chủ đề vào đúng dải (và KH_SUBJ).
     Trả về mảng id đã gộp. Tự chạy 1 lần ngay khi nạp (bên dưới)
     nếu __KH_PARTS đã tồn tại. --- */
  function mergeParts() {
    var parts = window.__KH_PARTS || {};
    var merged = [];
    Object.keys(parts).forEach(function (bandId) {
      var p = parts[bandId];
      if (!p || !p.topics || !p.topics.length) return;
      var band = null;
      BANDS.forEach(function (b) { if (b.id === bandId) band = b; });
      p.topics.forEach(function (pt) {
        if (!pt || !pt.id) return;
        var t = findTopic(pt.id);
        if (!t) {
          t = pt;
          t.pools = t.pools || { choose: [], blank: [], match: [], games: [] };
          t.knowledge = t.knowledge || { notes: [], facts: [], pairs: [] };
          if (band) band.topics.push(t);
          KH_SUBJ.topics.push(t);
        } else {
          if (pt.pools) ["choose", "blank", "match", "games"].forEach(function (k) {
            if (pt.pools[k] && pt.pools[k].length) {
              t.pools = t.pools || { choose: [], blank: [], match: [], games: [] };
              t.pools[k] = (t.pools[k] || []).concat(pt.pools[k]);
            }
          });
          if (pt.name) t.name = pt.name;
          if (pt.emoji) t.emoji = pt.emoji;
          if (pt.sub) t.sub = pt.sub;
          if (pt.knowledge) t.knowledge = pt.knowledge;
        }
        registerKnowledge(t);
        merged.push(pt.id);
      });
    });
    return merged;
  }
  mergeParts();

  /* --- Móc ngữ cảnh cho A1 (Ôn câu sai) — dạng XÍCH NỐI như
     tienganh.js: tra chủ đề Khoa học trước; không khớp thì uỷ
     quyền handler đã đăng ký trước, nên thứ tự nạp các tệp track
     thế nào cũng đúng. (Định tuyến cứng cd-kh- → "sci" nằm ở
     window.__topics trong index.html.) --- */
  var __prevKhCtx = window.__cdTopicContext;
  window.__cdTopicContext = function (parts) {
    try {
      if (parts && parts[1] === "chuyende") {
        var t = findTopic(parts[2]);
        if (t) return { grade: parseInt(parts[0], 10), subj: KH_SUBJ, topic: t };
      }
    } catch (e) {}
    return (typeof __prevKhCtx === "function") ? __prevKhCtx(parts) : null;
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
    intro.textContent = "Khám phá khoa học: nhìn hiện tượng, đoán trước, giải thích và tự kiểm chứng — mỗi câu đều có giải thích. Chọn một chủ đề để khám phá nhé!";
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
        card.innerHTML = '<span class="t-emoji">' + (t.emoji || "🔬") + '</span><span class="t-name">' + escT(t.name) + '</span><span class="t-sub">' + escT(t.sub || "") + "</span>" +
          (best ? '<span class="best-tag">⭐ Cao nhất: ' + best + "/10</span>" : "");
        card.addEventListener("click", function () { launchTopic(KH_SUBJ, t); });
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

  window.__KH = {
    bands: BANDS,
    subj: KH_SUBJ,
    findTopic: findTopic,
    render: render,
    mergeParts: mergeParts,
    circuitSVG: khCircuitSVG
  };
})();

/* ================================================================
   BỘ CHUYỂN ĐỔI kh* (vòng tích hợp v21): pools TĨNH trong DATA
   được biến thành HÀM SINH câu hỏi đúng khuôn vỏ (chép khuôn
   enMCQ/enBlank của tienganh.js + factsTF/pairsMatch của vỏ),
   tự chứa trong tệp này, không phụ thuộc tienganh.js/chuyende.js.
   - choose {q, ans, wrong[], ex, fig?} -> hàm sinh MCQ
   - blank {pre, ans, post, wrong[], ex, fig?} -> hàm sinh điền
   - games [{stmt, truth, explain}] -> 1 hàm rút 4 khẳng định khác
     nhau mỗi lần gọi (khớp cơ chế factsTF của vỏ)
   - knowledge.pairs -> hàm Nối cặp (pools.match) + Lật thẻ
     (pools.games), đúng như knowledgePools của vỏ.
   ================================================================ */
(function () {
  function khEsc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function khShuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function khValKey(s) {
    var t = String(s == null ? "" : s).normalize("NFC").replace(/\s+/g, " ").trim().toLocaleLowerCase("vi");
    var m = t.match(/^(-?\d+)[\.,](\d+)$/);
    if (m) return "n|" + (parseFloat(m[1] + "." + m[2]));
    if (/^-?\d+$/.test(t)) return "n|" + parseFloat(t);
    return "t|" + t;
  }
  function khCleanOptions(correct, wrongs) {
    var seen = {}, out = [];
    seen[khValKey(correct)] = 1;
    (wrongs || []).forEach(function (w) { var k = khValKey(w); if (!seen[k]) { seen[k] = 1; out.push(w); } });
    return out;
  }
  function khFig(spec) {
    try {
      if (!spec) return "";
      switch (spec.f) {
        case "circuit": return khCircuitSVG(spec.a || {});
        case "k1panels": return figK1PanelsSVG(spec.a);
        case "k1trans": return figK1TransSVG(spec.a);
        case "k2chain": return figK2ChainSVG(spec.a[0], spec.a[1], spec.a[2]);
        case "k3cycle": return figK3CycleSVG(spec.a);
        case "k4shadow": return figK4ShadowSVG(spec.a);
        case "k5therm": return figK5ThermSVG(spec.a[0], spec.a[1], spec.a[2], spec.a[3]);
        case "k5cyl": return figK5CylSVG(spec.a[0], spec.a[1], spec.a[2]);
        case "k5ruler": return figK5RulerSVG(spec.a);
      }
    } catch (e) {}
    return "";
  }
  function khMCQ(it) {
    var wrongs = khCleanOptions(it.ans, it.wrong);
    if (wrongs.length < 2) return null;
    var chosen = khShuffle(wrongs.slice()).slice(0, 3);
    var all = khShuffle([it.ans].concat(chosen));
    var q = {
      prompt: it.q,
      options: all.map(function (o) { return { html: '<span class="opt-text">' + khEsc(o) + "</span>" }; }),
      answer: all.indexOf(it.ans),
      explain: it.ex || ""
    };
    q.cols = all.length >= 4 ? 2 : all.length;
    q.optStack = all.some(function (o) { return String(o).length > 16; });
    var fig = khFig(it.fig);
    if (fig) q.figure = fig;
    return q;
  }
  function khBlank(it) {
    var wrongs = khCleanOptions(it.ans, it.wrong);
    if (wrongs.length < 2) return null;
    var chosen = khShuffle(wrongs.slice()).slice(0, 2);
    var all = khShuffle([it.ans].concat(chosen));
    var q = {
      kind: "blank", badge: "✏️ Điền vào chỗ trống",
      prompt: "Điền từ còn thiếu để hoàn thành câu!",
      blankText: it.ans,
      explain: it.ex || "",
      visual: '<div class="sentence">' + khEsc(it.pre) + " " + blankSlot() + " " + khEsc(it.post) + "</div>",
      options: all.map(function (o) { return { html: '<span class="opt-word">' + khEsc(o) + "</span>" }; }),
      answer: all.indexOf(it.ans),
      cols: 3, optStack: true
    };
    var fig = khFig(it.fig);
    if (fig) q.figure = fig;
    return q;
  }
  function khGamesGen(items) {
    return function () {
      var pool = khShuffle(items.slice());
      var rounds = pool.slice(0, 4).map(function (it) {
        return { visual: '<div class="sentence">' + khEsc(it.stmt) + "</div>", truth: !!it.truth, explain: it.explain || "" };
      });
      return tfQ("Đúng hay sai? Chạm nhanh nhé!", rounds);
    };
  }
  var topics = (window.__KH && window.__KH.subj && window.__KH.subj.topics) || [];
  topics.forEach(function (t) {
    /* Sau mergeParts(), pools của chủ đề đang chứa DỮ LIỆU TĨNH thô;
       chụp lại rồi thay bằng hàm sinh. */
    var st = { choose: (t.pools.choose || []).slice(), blank: (t.pools.blank || []).slice(), games: (t.pools.games || []).slice() };
    if (!st.choose.length && !st.blank.length && !st.games.length) return;
    t.pools.choose = st.choose.map(function (it) { return function () { return khMCQ(it); }; });
    t.pools.blank = st.blank.map(function (it) { return function () { return khBlank(it); }; });
    var games = [];
    if (st.games.length >= 4) games.push(khGamesGen(st.games));
    var pairs = (t.knowledge && t.knowledge.pairs) || [];
    if (pairs.length >= 4) {
      games.push(function () { return pairsMemory(pairs); });
      t.pools.match = [function () { return pairsMatch("Nối cặp đúng nhé!", pairs); }];
    }
    t.pools.games = games;
  });
  window.__KH_PARTS = null;
})();
