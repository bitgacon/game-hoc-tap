/* ================================================================
   GÓC GIẢI TRÍ — PHẦN LÕI ĐẦU (hàm dùng chung) + MỤC ĐỐ VUI DÂN GIAN
   File dữ liệu nạp lười của khu 🎉 Góc giải trí (ban-tach-v13).
   Khuôn lắp ráp và hợp đồng dữ liệu sao đúng chuyende.js/tienganh.js:
   helpers tự chứa, chủ đề đăng ký vào registry riêng, KHÔNG nằm
   trong GRADES (ngoài Kiểm tra / Thử thách ngày / In phiếu / tìm kiếm).
   ================================================================ */
window.__GT_TOPICS = window.__GT_TOPICS || [];

function gtRand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function gtPick(arr) { return arr[gtRand(0, arr.length - 1)]; }
function gtShuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = gtRand(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
/* Khóa GIÁ TRỊ của một lựa chọn (khử trùng theo giá trị như cổng của game). */
function gtEsc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function gtValKey(x) {
  var t = String(x == null ? "" : x).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().toLowerCase();
  var m = /^(-?\d+(?:[.,]\d+)?)\s*%$/.exec(t);
  if (m) return "n|" + (parseFloat(m[1].replace(",", ".")) / 100);
  m = /^(-?\d+)\s*\/\s*(-?\d+)$/.exec(t);
  if (m && +m[2] !== 0) return "n|" + (Math.round((+m[1] / +m[2]) * 1e9) / 1e9);
  if (/^-?\d+(?:[.,]\d+)?$/.test(t)) return "n|" + parseFloat(t.replace(",", "."));
  return "t|" + t;
}
/* MCQ của Góc giải trí: khử trùng nhiễu theo GIÁ TRỊ; không đủ 2 nhiễu sạch → null.
   opt: { visual, badge } */
function gtMCQ(prompt, correct, distractors, explain, opt) {
  opt = opt || {};
  correct = String(correct);
  var ck = gtValKey(correct), have = {}, pool = [];
  have[ck] = true;
  (distractors || []).forEach(function (d) {
    var s = String(d), k = gtValKey(s);
    if (!have[k]) { have[k] = true; pool.push(s); }
  });
  if (pool.length < 2) return null;
  var chosen = gtShuffle(pool).slice(0, 3);
  var all = gtShuffle([correct].concat(chosen));
  var q = {
    prompt: prompt, visual: opt.visual || "",
    options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }),
    answer: all.indexOf(correct), cols: opt.cols || (all.length >= 4 ? 2 : all.length),
    optStack: all.some(function (o) { return String(o).length > 16; })
  };
  if (opt.badge) q.badge = opt.badge;
  if (explain) q.explain = explain;
  return q;
}
/* Câu điền: thẻ đáp án chọn vào chỗ trống (khuôn cdBlank). */
function gtBlank(prompt, correct, distractors, explain, visualHTML) {
  correct = String(correct);
  var ck = gtValKey(correct), have = {}, pool = [];
  have[ck] = true;
  (distractors || []).forEach(function (d) {
    var s = String(d), k = gtValKey(s);
    if (!have[k]) { have[k] = true; pool.push(s); }
  });
  if (pool.length < 2) return null;
  var all = gtShuffle([correct].concat(gtShuffle(pool).slice(0, 2)));
  return {
    kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: prompt, blankText: correct,
    explain: explain || null,
    visual: visualHTML || "",
    options: all.map(function (o) { return { html: '<span class="opt-text">' + o + "</span>" }; }),
    answer: all.indexOf(correct), cols: 3, optStack: true
  };
}
/* TF: rounds = [{ stmt, truth, explain }] — người gọi tự bảo đảm không đồng loạt một phán quyết. */
function gtTF(rounds, prompt) {
  var rs = rounds.map(function (r) {
    return { visual: '<div class="sentence" style="font-size:clamp(20px,5vw,27px)">' + r.stmt + "</div>", truth: !!r.truth, explain: r.explain };
  });
  return tfQ(prompt || "Đúng hay sai? Chạm nhanh nhé!", rs);
}
/* Câu nối (bọc pairsMatch của vỏ: cặp dạng mảng [trái, phải] + gắn giải thích). */
function gtMatch(prompt, pairs, explain) {
  var q = pairsMatch(prompt, pairs);
  if (q && explain) q.explain = explain;
  return q;
}
/* Bọc 1 câu tĩnh {q,a,w,ex} thành bộ sinh (mỗi lần gọi dựng object mới). */
function gtStaticGen(f, badge) {
  var gen = function () {
    var q = gtMCQ(f.q, f.a, f.w, f.ex, { badge: badge || "" });
    if (q) q.roundIdentity = { type: "fact", facts: [f.q] };
    return q;
  };
  gen.__static = f;
  return gen;
}

/* ================================================================
   🌾 ĐỐ VUI DÂN GIAN — ngân hàng câu đố truyền thống (phạm vi công
   cộng), chọn lọc sạch, hợp học đường. Mỗi câu: nhóm g, nguyên văn q,
   đáp án a, đúng 3 nhiễu w CÙNG NHÓM, giải mã ẩn dụ ex.
   ================================================================ */
var GT_RIDDLES = [
  /* ---------- Nhóm: Đồ vật ---------- */
  { g: "Đồ vật", q: "Hai anh em ở một nhà, miệng cắn nhau suốt ngày, giúp người cắt vải, cắt giấy.", a: "Cái kéo", w: ["Cái kim", "Cái dao", "Cái cưa"], ex: "Hai lưỡi kéo bắt chéo như hai anh em một nhà; hai lưỡi khép mở 'cắn' vào nhau là cắt được vải, giấy." },
  { g: "Đồ vật", q: "Thân gầy như que, một mắt ở đuôi, suốt ngày chui qua vải để may áo cho người.", a: "Cây kim may", w: ["Cái kéo", "Sợi chỉ", "Cái cúc áo"], ex: "Kim may có lỗ xỏ chỉ ở phía đuôi — người xưa gọi là 'mắt kim'; kim chui qua vải để khâu áo." },
  { g: "Đồ vật", q: "Có xương mà không có thịt, trời mưa thì mở ra, trời nắng lại xếp vào.", a: "Cái ô", w: ["Cái quạt", "Tấm bạt", "Cái nón lá"], ex: "Cái ô (dù) có nan cứng như xương, vải phủ thay thịt; mưa thì mở che, nắng thì gấp lại." },
  { g: "Đồ vật", q: "Không phải cánh chim mà quạt được gió, cầm tay phe phẩy cho mát trưa hè.", a: "Cái quạt tay", w: ["Cái ô", "Tờ giấy", "Cái khăn tay"], ex: "Quạt giấy, quạt nan phe phẩy thì sinh gió mát — như một chiếc cánh quạt bằng tay." },
  { g: "Đồ vật", q: "Hai anh em sinh đôi, suốt đời ăn chung một mâm, bữa cơm nào cũng có mặt.", a: "Đôi đũa", w: ["Cái thìa", "Cái bát", "Đôi giày"], ex: "Đũa luôn đi thành đôi như anh em sinh đôi và chỉ xuất hiện cùng nhau trong bữa ăn để gắp thức ăn." },
  { g: "Đồ vật", q: "Mặt trong như mặt nước, soi vào thấy rõ mặt mình, mà sờ vào thì cứng và khô.", a: "Cái gương", w: ["Cái kính cửa sổ", "Cái chậu", "Tấm ảnh"], ex: "Gương sáng như mặt nước nên hiện rõ mặt người soi, nhưng gương là kính cứng; tấm ảnh chỉ giữ một hình cũ, không hiện mặt em ngay lúc soi." },
  { g: "Đồ vật", q: "Có kim mà không châm ai, đi không cần chân, tích tắc suốt ngày đêm để báo giờ.", a: "Cái đồng hồ", w: ["Cái cân", "Cái la bàn", "Cái nhiệt kế"], ex: "Đồng hồ có kim giờ, kim phút quay đều và kêu tích tắc để báo giờ; la bàn cũng có kim nhưng chỉ phương hướng, không báo giờ." },
  { g: "Đồ vật", q: "Hai đầu buộc chặt vào cây, ở giữa nằm đung đưa, ru người vào giấc ngủ trưa.", a: "Cái võng", w: ["Cái lều", "Cái nôi", "Tấm thảm"], ex: "Võng mắc hai đầu vào cây hoặc cột, phần giữa võng xuống đung đưa như ru ngủ." },
  { g: "Đồ vật", q: "Mỏng như chiếc lá, đội trên đầu che nắng che mưa, là bạn thân của người nông dân.", a: "Cái nón lá", w: ["Cái mũ vải", "Cái ô", "Tấm áo mưa"], ex: "Nón đan bằng lá nên mỏng nhẹ như lá, đội lên đầu để che nắng mưa khi ra đồng." },
  { g: "Đồ vật", q: "Hai chiếc sinh đôi, mỏng nhẹ hở ngón, xỏ chân vào là đi khắp nơi.", a: "Đôi dép", w: ["Đôi găng tay", "Đôi tất", "Đôi giày"], ex: "Dép đi thành đôi, mỏng và hở ngón chân; giày và tất đều bọc kín ngón nên không phải dép." },
  { g: "Đồ vật", q: "Có chân mà không biết đi, có lưng mà không biết nằm, suốt ngày cho người ngồi nghỉ.", a: "Cái ghế", w: ["Cái bàn", "Cái giường", "Cái tủ"], ex: "Ghế có chân ghế và lưng tựa nhưng không tự đi, không nằm được — ghế để người ngồi; giường thì dùng để nằm nên không khớp." },
  { g: "Đồ vật", q: "Đầu xù như tóc rối, cán dài thẳng, quét nhà sạch bong mỗi sáng.", a: "Cái chổi", w: ["Cây lau nhà", "Cái xẻng", "Cái hót rác"], ex: "Chổi rơm, chổi cọ có đầu xù tơi như mớ tóc rối, cán dài để quét nhà." },
  { g: "Đồ vật", q: "Có mỏ mà không biết hót, có quai cầm, bụng đựng nước sôi để pha trà.", a: "Cái ấm nước", w: ["Cái nồi", "Cái cốc", "Cái chai"], ex: "Ấm đun nước có vòi rót gọi là 'mỏ' ấm, có quai xách; ấm không phải con chim nên 'có mỏ mà không biết hót'." },
  { g: "Đồ vật", q: "Nằm ngang qua sông, không chân mà đứng vững, cho người và xe qua lại hằng ngày.", a: "Cái cầu", w: ["Con đò", "Cái phà", "Con đường đất"], ex: "Cầu bắc ngang sông, đứng yên một chỗ cho người xe qua; đò và phà thì di chuyển trên nước." },
  { g: "Đồ vật", q: "Uống dầu để sống, tim cháy sáng đêm, soi đường cho em học bài.", a: "Cái đèn dầu", w: ["Ngọn nến", "Cái đèn pin", "Cái bóng đèn"], ex: "Đèn dầu 'uống' dầu trong bầu đèn, bấc đèn như tim cháy sáng; nến cháy bằng sáp chứ không uống dầu." },
  { g: "Đồ vật", q: "Mặc áo gỗ, ruột đen bằng chì, viết vẽ lên giấy trắng mỗi ngày.", a: "Cái bút chì", w: ["Cái bút mực", "Viên phấn", "Cái thước kẻ"], ex: "Bút chì có vỏ gỗ bọc ngoài và ruột chì đen ở giữa; phấn không có áo gỗ." },
  { g: "Đồ vật", q: "Có nhiều trang chữ in sẵn, chứa bao nhiêu chuyện hay, mở ra là thấy cả thế giới.", a: "Quyển sách", w: ["Quyển vở", "Tờ báo", "Cái bản đồ"], ex: "Sách in sẵn bao nhiêu kiến thức và câu chuyện; vở thì để trống cho em tự viết." },
  { g: "Đồ vật", q: "Thân hai cây thẳng, nối bằng nhiều bậc ngang, dựa vào tường cho người leo lên cao.", a: "Cái thang", w: ["Cái ghế đẩu", "Tấm ván", "Cái cột nhà"], ex: "Thang có hai thanh dọc và các bậc ngang, dựng dựa tường để leo lên cao." },
  { g: "Đồ vật", q: "Có tay nắm mà không phải tay người, mở ra đón khách, đóng vào giữ nhà.", a: "Cánh cửa", w: ["Cửa sổ", "Cái tủ", "Bức tường"], ex: "Cửa ra vào có tay nắm cửa; mở cửa đón khách vào nhà, đóng cửa để giữ nhà — cửa sổ không phải lối đón khách." },
  { g: "Đồ vật", q: "Thân sắt nhỏ xíu, răng cưa xinh xinh, mở được khóa cửa nhà mình.", a: "Chiếc chìa khóa", w: ["Cái đinh", "Cái kéo", "Cái ổ khóa"], ex: "Chìa khóa nhỏ bằng kim loại, có răng khớp với ổ khóa; ổ khóa là thứ được mở chứ không phải vật đi mở." },
  { g: "Đồ vật", q: "Mặt đen phẳng lì, phấn trắng viết lên, cô dạy trò học mỗi ngày.", a: "Cái bảng đen", w: ["Quyển vở", "Cái bàn học", "Tờ giấy trắng"], ex: "Bảng đen trong lớp học có mặt đen, dùng phấn trắng viết bài giảng." },
  { g: "Đồ vật", q: "Hai bánh tròn quay, không ăn xăng dầu, chân đạp là chạy bon bon.", a: "Cái xe đạp", w: ["Cái xe máy", "Cái ô tô", "Con ngựa"], ex: "Xe đạp có hai bánh, chạy bằng sức đạp chân, không cần xăng như xe máy, ô tô." },
  { g: "Đồ vật", q: "Thân dài như rồng sắt, chạy trên đường ray, còi kêu tu tu vang xa.", a: "Tàu hỏa", w: ["Cái ô tô", "Tàu thủy", "Cái máy bay"], ex: "Tàu hỏa gồm nhiều toa nối dài như rồng, chạy trên đường ray và hú còi 'tu tu'." },
  { g: "Đồ vật", q: "Không có cánh mà bay cao, có dây dài giữ lại, chỉ bay khi trời có gió.", a: "Cái diều", w: ["Cái máy bay", "Con chim", "Cái khinh khí cầu"], ex: "Diều làm bằng giấy và tre, không cánh vẫn bay nhờ gió, người thả giữ bằng sợi dây dài." },
  { g: "Đồ vật", q: "Một cây kim nhỏ, đầu luôn chỉ về phương Bắc, dẫn đường cho người đi xa.", a: "Cái la bàn", w: ["Cái đồng hồ", "Cái bản đồ", "Cái nhiệt kế"], ex: "Kim la bàn là nam châm nên luôn chỉ hướng Bắc; bản đồ chỉ vẽ đường chứ không có kim chỉ hướng." },
  { g: "Đồ vật", q: "Mỗi ngày xé đi một tờ, cho biết hôm nay là ngày mấy, tháng mấy.", a: "Tờ lịch", w: ["Quyển sách", "Cái đồng hồ", "Tờ báo"], ex: "Lịch treo tường (lịch blốc) mỗi ngày xé một tờ, trên tờ lịch ghi rõ ngày tháng." },
  { g: "Đồ vật", q: "Mặt gỗ phẳng tròn, chịu dao băm chặt suốt ngày mà không kêu đau.", a: "Cái thớt", w: ["Cái đĩa", "Tấm ván", "Cái mâm"], ex: "Thớt gỗ dày và phẳng, là nơi đặt thực phẩm để dao băm, chặt, thái." },
  { g: "Đồ vật", q: "Bụng thủy tinh sáng trong, giữ nước nóng cả ngày, rót trà mời khách.", a: "Cái phích nước", w: ["Cái ấm nước", "Cái chai", "Cái cốc"], ex: "Phích (bình thủy) có ruột thủy tinh tráng bạc giữ nhiệt, giữ nước nóng lâu để pha trà." },
  { g: "Đồ vật", q: "Càng lấy đất đi càng lớn, càng đào càng sâu.", a: "Cái hố", w: ["Đống đất", "Cái xẻng", "Viên gạch"], ex: "Đào hố thì đất mất đi mà hố lại to và sâu thêm — ngược với mọi vật khác: càng lấy đi càng lớn." },
  /* ---------- Nhóm: Con vật ---------- */
  { g: "Con vật", q: "Đầu rồng, đuôi phụng, cánh tiên. Ngày năm bảy vợ, tối ngủ riêng một mình.", a: "Con gà trống", w: ["Con gà mái", "Con vịt", "Con ngỗng"], ex: "Gà trống có mào đỏ như đầu rồng, đuôi cong đẹp, theo đàn nhiều gà mái ('năm bảy vợ') nhưng tối đậu ngủ một mình trên cao." },
  { g: "Con vật", q: "Tám cẳng, hai càng, chẳng chịu đi thẳng, cứ bò ngang cả ngày.", a: "Con cua", w: ["Con nhện", "Con tôm", "Con rết"], ex: "Cua có 8 chân và 2 càng to, thân dẹt nên đi ngang; nhện cũng 8 chân nhưng không có càng và không bò ngang." },
  { g: "Con vật", q: "Mắt sáng trong đêm, râu dài hai bên, kêu 'meo meo', bắt chuột rất tài.", a: "Con mèo", w: ["Con chó", "Con cáo", "Con chồn"], ex: "Mèo nhìn rõ ban đêm, có râu cảm giác và tiếng kêu 'meo meo' — thợ săn chuột trong nhà." },
  { g: "Con vật", q: "Tai thính, mũi tinh, trung thành giữ nhà, thấy chủ về là vẫy đuôi mừng.", a: "Con chó", w: ["Con mèo", "Con sói", "Con cáo"], ex: "Chó thính tai, thính mũi, trông nhà và mừng chủ bằng cách vẫy đuôi." },
  { g: "Con vật", q: "Da đen bóng, sừng cong, kéo cày ngoài ruộng, chiều về đầm mình trong ao mát.", a: "Con trâu", w: ["Con bò", "Con ngựa", "Con lợn"], ex: "Trâu da đen, sức khỏe kéo cày và rất thích đầm mình dưới nước cho mát; bò thường da vàng nâu và ít đầm bùn." },
  { g: "Con vật", q: "Chạy nhanh như gió, bờm dài tung bay, hí vang khi phi nước đại.", a: "Con ngựa", w: ["Con trâu", "Con lừa", "Con nai"], ex: "Ngựa có bờm dài, chạy nhanh và tiếng hí vang đặc trưng." },
  { g: "Con vật", q: "Thân béo tròn, mõm dài, ăn no lại ngủ, kêu 'ủn ỉn' suốt ngày.", a: "Con lợn", w: ["Con chó", "Con mèo", "Con dê"], ex: "Lợn (heo) thân tròn béo, mõm dài để ủi đất tìm ăn và kêu ủn ỉn." },
  { g: "Con vật", q: "Tai dài, mắt đỏ, nhảy lò cò rất nhanh, thích gặm cà rốt.", a: "Con thỏ", w: ["Con chuột", "Con sóc", "Con mèo"], ex: "Thỏ có đôi tai dài, di chuyển bằng nhảy và rất thích ăn cà rốt." },
  { g: "Con vật", q: "Bốn chân ngắn, mang nhà trên lưng, gặp nguy rút đầu vào nhà, bơi lội cũng tài.", a: "Con rùa", w: ["Con ốc sên", "Con cua", "Con cá"], ex: "Mai rùa cứng như ngôi nhà trên lưng, rùa có bốn chân và biết bơi; ốc sên không có chân nên không phải đáp án." },
  { g: "Con vật", q: "Không chân mà bò được, mang nhà theo khắp nơi, hai sừng mềm thò ra thụt vào.", a: "Con ốc sên", w: ["Con giun đất", "Con sâu", "Con rùa"], ex: "Ốc sên bò bằng phần bụng, vác vỏ xoắn như ngôi nhà, hai xúc tu trên đầu trông như sừng mềm." },
  { g: "Con vật", q: "Không chân không tay mà bơi rất giỏi, sống dưới nước, thở bằng mang.", a: "Con cá", w: ["Con tôm", "Con cua", "Con ếch"], ex: "Cá bơi bằng vây, thở bằng mang dưới nước; tôm, cua, ếch đều có chân." },
  { g: "Con vật", q: "Da xanh trơn, mắt lồi, ngồi trên lá sen, mưa xuống kêu 'ồm ộp'.", a: "Con ếch", w: ["Con cóc", "Con cá", "Con vịt"], ex: "Ếch da xanh trơn, hay ngồi trên lá sen và kêu ồm ộp; cóc da sần màu nâu đất, không ngồi lá sen." },
  { g: "Con vật", q: "Nhỏ con, chân có màng, lạch bạch trên bờ, xuống ao bơi kêu 'cạp cạp'.", a: "Con vịt", w: ["Con ngỗng", "Con gà", "Con chim sẻ"], ex: "Vịt nhỏ con, chân màng bơi giỏi, dáng đi lạch bạch; ngỗng to hơn nhiều và cổ dài." },
  { g: "Con vật", q: "Nhỏ mà chăm chỉ, bay từ hoa này sang hoa khác hút mật, ai trêu thì đốt đau.", a: "Con ong", w: ["Con bướm", "Con ruồi", "Con kiến"], ex: "Ong hút mật làm mật ong và có ngòi đốt để tự vệ; bướm cũng thăm hoa nhưng không làm mật, không đốt." },
  { g: "Con vật", q: "Thân nhỏ xíu mà khỏe vô cùng, tha được mồi to gấp mấy lần mình, đi thành hàng dài.", a: "Con kiến", w: ["Con ong", "Con mối", "Con nhện"], ex: "Kiến tha được vật nặng gấp nhiều lần cơ thể và di chuyển thành đàn, thành hàng." },
  { g: "Con vật", q: "Ngày xưa là sâu xấu xí, nay hóa cánh đẹp rực rỡ bay lượn vườn hoa.", a: "Con bướm", w: ["Con ong", "Con chuồn chuồn", "Con đom đóm"], ex: "Bướm lớn lên qua biến thái: từ sâu (ấu trùng) hóa nhộng rồi thành bướm có cánh đẹp." },
  { g: "Con vật", q: "Ban đêm bay lập lòe, bụng phát sáng như chiếc đèn nhỏ trong bụi cây.", a: "Con đom đóm", w: ["Con bướm", "Con dế", "Con ve sầu"], ex: "Đom đóm tự phát sáng ở bụng vào ban đêm, bay lập lòe như đèn nhỏ." },
  { g: "Con vật", q: "Không chân mà trườn rất nhanh, thân dài uốn lượn, thỉnh thoảng lại lột da.", a: "Con rắn", w: ["Con giun đất", "Con lươn", "Con sâu"], ex: "Rắn không chân, trườn bằng thân uốn lượn và lột da khi lớn; lươn sống dưới nước, không trườn trên đất khô như rắn." },
  { g: "Con vật", q: "Đuôi xòe như chiếc quạt bảy sắc cầu vồng, đẹp kiêu sa nhất vườn chim.", a: "Con công", w: ["Con gà trống", "Con vẹt", "Con chim sẻ"], ex: "Công trống xòe đuôi thành hình quạt lớn với nhiều 'mắt' lông nhiều màu — đẹp nổi tiếng nhất loài chim." },
  { g: "Con vật", q: "Mỏ cong như móc câu, lông sặc sỡ, học nói tiếng người rất nhanh.", a: "Con vẹt", w: ["Con sáo", "Con chim khuyên", "Con bồ câu"], ex: "Vẹt có mỏ cong khoằm để tách hạt, bộ lông nhiều màu và bắt chước tiếng người giỏi; sáo mỏ thẳng nên không khớp." },
  { g: "Con vật", q: "Nhỏ, nhanh, răng sắc, chuyên gặm đồ trong nhà, thấy mèo là chạy trốn.", a: "Con chuột", w: ["Con thỏ", "Con sóc", "Con mèo"], ex: "Chuột nhỏ, răng cửa sắc để gặm nhấm và là con mồi quen thuộc của mèo." },
  { g: "Con vật", q: "Thân cong cong, râu dài, bơi giật lùi, nấu chín đỏ hồng cả thân.", a: "Con tôm", w: ["Con cua", "Con cá", "Con mực"], ex: "Tôm thân cong, có râu dài, bơi giật lùi và chín thì chuyển màu đỏ hồng; cua thân dẹt và bò ngang." },
  { g: "Con vật", q: "Thân dài mềm, mười tay ôm mồi, gặp nguy phun mực đen rồi trốn thoát.", a: "Con mực", w: ["Con bạch tuộc", "Con tôm", "Con sứa"], ex: "Mực có 8 tay ngắn và 2 xúc tu dài (cả thảy mười), phun mực đen che mắt kẻ thù; bạch tuộc chỉ có 8 tay và thân tròn." },
  { g: "Con vật", q: "Ẩn trong bụi cỏ, đêm về gảy đàn 'ri ri' không ngừng.", a: "Con dế", w: ["Con ve sầu", "Con ếch", "Con chim sẻ"], ex: "Dế sống trong bụi cỏ, hang đất; ban đêm dế trống cọ cánh kêu 'ri ri'; ve sầu kêu ban ngày trên cây cao." },
  { g: "Con vật", q: "Mùa hè đậu trên cây cao, kêu 've ve' ran cả trưa nắng.", a: "Con ve sầu", w: ["Con dế", "Con chim sẻ", "Con ong"], ex: "Tiếng ve sầu râm ran là âm thanh quen thuộc của trưa hè, phát ra từ trên các tán cây." },
  { g: "Con vật", q: "Mặt tròn, mắt to, đầu xoay gần vòng tròn, ban ngày ngủ, ban đêm bay lặng lẽ bắt chuột.", a: "Con cú mèo", w: ["Con dơi", "Con chim sẻ", "Con mèo"], ex: "Cú mèo có mặt tròn, mắt to nhìn đêm và cổ xoay rất rộng; dơi mắt nhỏ, định hướng bằng tai và sóng âm chứ không có mặt tròn." },
  /* ---------- Nhóm: Thiên nhiên ---------- */
  { g: "Thiên nhiên", q: "Không chân không tay, sáng mọc ở phương Đông, tối lặn ở phương Tây, sưởi ấm cả Trái Đất.", a: "Mặt trời", w: ["Mặt trăng", "Ngôi sao", "Đám mây"], ex: "Mặt trời mọc hướng Đông, lặn hướng Tây và tỏa hơi ấm cho Trái Đất; mặt trăng không sưởi ấm được như vậy." },
  { g: "Thiên nhiên", q: "Đêm đêm treo trên trời, khi tròn khi khuyết, ánh sáng dịu không chói mắt.", a: "Mặt trăng", w: ["Mặt trời", "Ngôi sao", "Cái đèn"], ex: "Mặt trăng thay đổi hình dạng tròn — khuyết theo ngày trong tháng và sáng dịu vào ban đêm." },
  { g: "Thiên nhiên", q: "Ở tít trên trời cao, nhấp nháy suốt đêm, nhỏ như hạt gạo.", a: "Ngôi sao", w: ["Con đom đóm", "Mặt trăng", "Đám mây"], ex: "Sao ở rất xa trên bầu trời đêm nên trông nhỏ như hạt gạo và nhấp nháy; đom đóm chỉ bay thấp gần mặt đất." },
  { g: "Thiên nhiên", q: "Trắng như bông, bay lơ lửng trên trời, lúc hóa thành mưa rơi xuống đất.", a: "Đám mây", w: ["Khói bếp", "Sương mù", "Bông vải"], ex: "Mây trắng như bông, trôi trên trời và khi hạt nước nặng sẽ thành mưa; khói tan nhanh, không hóa thành mưa." },
  { g: "Thiên nhiên", q: "Sau cơn mưa, bảy sắc cong cong bắc ngang bầu trời, đẹp mà không ai chạm tới được.", a: "Cầu vồng", w: ["Đám mây", "Cái cầu", "Mặt trăng"], ex: "Cầu vồng hiện sau mưa khi nắng chiếu qua hạt mưa, có bảy sắc và cong như chiếc cầu trên trời." },
  { g: "Thiên nhiên", q: "Không hình, không bóng, không màu, mà làm cây rung, sóng gợn, mát cả mặt người.", a: "Gió", w: ["Hơi nước", "Không khí", "Ánh nắng"], ex: "Gió là không khí đang chuyển động: mắt không thấy gió nhưng thấy cây rung, sóng gợn và thấy mát." },
  { g: "Thiên nhiên", q: "Từ trời cao rơi xuống muôn vàn hạt nước, tưới mát ruộng đồng, cây cối xanh tươi.", a: "Mưa", w: ["Sương", "Tuyết", "Nước suối"], ex: "Mưa rơi thành vô vàn hạt nước từ mây xuống; sương chỉ đọng nhẹ trên lá vào sáng sớm chứ không rơi thành hạt." },
  { g: "Thiên nhiên", q: "Uốn khúc quanh co, chảy hoài không nghỉ, từ núi cao đổ về biển lớn.", a: "Dòng sông", w: ["Con đường", "Hồ nước", "Biển"], ex: "Sông uốn khúc và chảy liên tục từ vùng cao về biển; hồ nước đứng yên, con đường không chảy." },
  { g: "Thiên nhiên", q: "Nước mặn mênh mông, sóng bạc đầu vỗ bờ không nghỉ, là nhà của muôn loài cá tôm.", a: "Biển", w: ["Hồ nước", "Dòng sông", "Ao làng"], ex: "Biển rộng mênh mông, nước mặn và có sóng lớn; hồ, ao nước ngọt và nhỏ hơn nhiều." },
  { g: "Thiên nhiên", q: "Cao lớn sừng sững, đầu đội mây trắng, đứng yên một chỗ từ ngàn năm.", a: "Ngọn núi", w: ["Ngọn đồi", "Tòa nhà cao", "Cây cổ thụ"], ex: "Núi rất cao, đỉnh thường chạm mây; đồi thấp hơn nhiều, không 'đội mây' như núi." },
  { g: "Thiên nhiên", q: "Đi đâu theo đấy, đứng đâu đứng cùng, nắng càng to càng rõ, sờ vào chẳng được gì.", a: "Cái bóng", w: ["Dấu chân", "Tấm ảnh", "Tiếng vọng"], ex: "Bóng của em luôn đi theo em dưới nắng, hiện rõ mà không sờ bắt được; dấu chân chỉ còn lại sau khi em đã đi qua." },
  { g: "Thiên nhiên", q: "Trời mưa giông, một tia sáng lóe ngang trời rồi tiếng nổ vang rền theo sau.", a: "Sấm sét", w: ["Pháo hoa", "Đèn pin", "Mặt trời"], ex: "Sét là tia điện sáng lóe trên trời giông, sấm là tiếng nổ vang theo sau; pháo hoa do người đốt trong ngày lễ, không phải lúc mưa giông." },
  /* ---------- Nhóm: Cây & quả ---------- */
  { g: "Cây & quả", q: "Quả gì vỏ cứng, đầu có ba con mắt, trong chứa nước ngọt và cơm trắng béo?", a: "Quả dừa", w: ["Quả dưa hấu", "Quả bưởi", "Quả mít"], ex: "Quả dừa có ba lỗ nhỏ trên đầu như ba con mắt; bên trong có nước dừa ngọt và cùi (cơm) dừa trắng." },
  { g: "Cây & quả", q: "Áo xanh, ruột đỏ, hạt đen, ăn vào mát ngọt những ngày hè.", a: "Quả dưa hấu", w: ["Quả thanh long", "Quả cam", "Quả dứa"], ex: "Dưa hấu vỏ xanh, ruột đỏ mọng nước, hạt đen; thanh long vỏ đỏ hồng và hạt nhỏ li ti nên không khớp." },
  { g: "Cây & quả", q: "Quả cong như lưỡi liềm, sinh thành từng nải, chín vàng thơm ngọt, bóc vỏ là ăn.", a: "Quả chuối", w: ["Quả xoài", "Quả đu đủ", "Quả mít"], ex: "Chuối cong cong, mọc thành nải thành buồng, chín vàng và bóc vỏ ăn ngay." },
  { g: "Cây & quả", q: "Quả to mọc ngay trên thân cây, vỏ đầy gai mềm, múi vàng thơm, hạt to luộc ăn bùi.", a: "Quả mít", w: ["Quả sầu riêng", "Quả dứa", "Quả bưởi"], ex: "Mít thường mọc từ thân cây, múi vàng thơm và hạt mít luộc ăn rất bùi; sầu riêng mọc trên cành cao và múi mềm béo, mùi nồng hơn." },
  { g: "Cây & quả", q: "Đầu đội vương miện lá xanh, thân đầy mắt, ruột vàng chua ngọt.", a: "Quả dứa", w: ["Quả mít", "Quả ngô", "Quả chuối"], ex: "Quả dứa (quả thơm) có chùm lá trên đầu như vương miện, vỏ chia thành từng 'mắt' và ruột vàng." },
  { g: "Cây & quả", q: "Thân rỗng có đốt, lá nhỏ xanh, mọc thành bụi, dẻo dai cong mà không gãy.", a: "Cây tre", w: ["Cây mía", "Cây cau", "Cây chuối"], ex: "Tre thân rỗng, chia đốt, mọc thành bụi và rất dẻo; mía cũng có đốt nhưng thân đặc chứa nước ngọt." },
  { g: "Cây & quả", q: "Thân cao thẳng tắp không một cành, lá chỉ ở trên ngọn, quả nhỏ kết buồng, ăn cùng lá trầu.", a: "Cây cau", w: ["Cây dừa", "Cây cọ", "Cây tre"], ex: "Cau thân thẳng không phân cành, quả cau nhỏ kết thành buồng, thường ăn với trầu; quả dừa to và có nước uống nên không khớp." },
  { g: "Cây & quả", q: "Sống ở ruộng nước, còn non xanh mướt, khi chín hạt vàng trĩu bông cúi đầu.", a: "Cây lúa", w: ["Cây ngô", "Cây mía", "Cây sắn"], ex: "Lúa trồng ở ruộng nước, bông lúa chín vàng nặng hạt nên cúi xuống; ngô trồng trên đất cạn." },
  { g: "Cây & quả", q: "Lá tròn nhô khỏi mặt nước, hoa hồng thơm ngát, giữa hoa có gương đầy hạt ăn bùi.", a: "Hoa sen", w: ["Hoa súng", "Hoa hồng", "Hoa cúc"], ex: "Sen có đài (gương) sen chứa hạt sen ăn bùi — hoa súng không có gương hạt như vậy." },
  { g: "Cây & quả", q: "To bằng nắm tay, vỏ dày sần sùi màu cam, múi to mọng nước chua ngọt.", a: "Quả cam", w: ["Quả quýt", "Quả bưởi", "Quả chanh"], ex: "Cam to, vỏ dày sần và múi to; quýt nhỏ hơn, vỏ mỏng dễ bóc nên không khớp với 'vỏ dày sần sùi'." },
  { g: "Cây & quả", q: "To tròn nằm trên mặt đất, vỏ cứng, ruột vàng, hạt dẹt đầy trong bụng.", a: "Quả bí đỏ", w: ["Quả dưa hấu", "Quả bầu", "Quả mít"], ex: "Bí đỏ (bí ngô) tròn to, ruột vàng và nhiều hạt dẹt màu trắng; dưa hấu ruột đỏ, hạt đen." },
  { g: "Cây & quả", q: "Cao vút trên bãi biển, lá xòe như quạt lớn, quả cho nước ngọt mát.", a: "Cây dừa", w: ["Cây cau", "Cây cọ", "Cây chuối"], ex: "Dừa mọc nhiều ở bãi biển, quả dừa cho nước ngọt; quả cau nhỏ, không có nước để uống." },
  { g: "Cây & quả", q: "Quả thơm nức khi chín, thịt vàng mềm, chỉ có một hạt to ở giữa.", a: "Quả xoài", w: ["Quả đu đủ", "Quả mít", "Quả đào"], ex: "Xoài có đúng một hạt to ở giữa quả; đu đủ có rất nhiều hạt nhỏ." },
  { g: "Cây & quả", q: "Vỏ xanh, ruột trắng hồng, hạt nhỏ li ti đầy ruột, ăn giòn chua ngọt.", a: "Quả ổi", w: ["Quả lê", "Quả táo", "Quả mận"], ex: "Ổi có rất nhiều hạt nhỏ nằm khắp ruột quả; lê và táo hạt chỉ ở giữa lõi." },
  /* ---------- Nhóm: Con người & nghề ---------- */
  { g: "Con người & nghề", q: "Cái gì là của em mà người khác dùng nhiều hơn em?", a: "Cái tên của em", w: ["Đôi dép", "Cái cặp sách", "Giọng nói"], ex: "Tên là của em nhưng mọi người xung quanh gọi tên em suốt ngày, còn em rất ít khi tự gọi tên mình." },
  { g: "Con người & nghề", q: "Đi thì nằm, đứng thì nằm, nằm thì đứng. Là gì?", a: "Bàn chân", w: ["Đôi dép", "Cái gối", "Đôi tay"], ex: "Khi đi hay đứng, bàn chân nằm ngang áp xuống đất; khi em nằm ngủ, bàn chân dựng đứng lên — nên 'nằm thì đứng'." },
  { g: "Con người & nghề", q: "Năm anh em ở một nhà, cao thấp khác nhau, cùng nhau nắm đồ, làm việc.", a: "Năm ngón tay", w: ["Năm ngón chân", "Năm hạt gạo", "Năm cánh sao"], ex: "Bàn tay có năm ngón dài ngắn khác nhau, cùng phối hợp để cầm nắm; ngón chân không cầm nắm đồ được." },
  { g: "Con người & nghề", q: "Hai cửa sổ nhỏ trên mặt, mở ra thấy cả thế giới, nhắm lại là tối om.", a: "Đôi mắt", w: ["Đôi tai", "Cái miệng", "Hai lỗ mũi"], ex: "Mắt như hai cửa sổ: mở mắt nhìn thấy mọi vật, nhắm mắt lại thì không thấy gì." },
  { g: "Con người & nghề", q: "Trong hang nhỏ, ba mươi hai anh trắng đứng quanh một anh đỏ nằm giữa.", a: "Răng và lưỡi", w: ["Tóc và đầu", "Mắt và mũi", "Tay và chân"], ex: "Miệng như cái hang: người lớn có 32 chiếc răng trắng bao quanh chiếc lưỡi đỏ ở giữa." },
  { g: "Con người & nghề", q: "Giữa mặt dựng một sống nhỏ, hai lỗ thở phì phò, ngửi được mùi thơm mùi thối.", a: "Cái mũi", w: ["Cái tai", "Con mắt", "Cái cằm"], ex: "Mũi nằm giữa mặt, có sống mũi và hai lỗ mũi để thở và ngửi mùi." },
  { g: "Con người & nghề", q: "Mọc trên đầu như rừng nhỏ, đen nhánh, cắt ngắn rồi lại mọc dài ra.", a: "Mái tóc", w: ["Đám cỏ", "Lông mày", "Cái mũ"], ex: "Tóc mọc trên đầu, cắt đi vẫn mọc dài lại; cỏ mọc ở đất chứ không ở trên đầu." },
  { g: "Con người & nghề", q: "Quanh năm chân lấm tay bùn, cày sâu cuốc bẫm cho lúa vàng đầy đồng. Là ai?", a: "Bác nông dân", w: ["Bác thợ mộc", "Cô giáo", "Chú công nhân"], ex: "Nông dân làm ruộng, chân tay lấm bùn đất, cày cuốc để có mùa lúa vàng." },
  { g: "Con người & nghề", q: "Mỗi sáng đến lớp với đàn em nhỏ, dạy chữ, dạy điều hay. Là ai?", a: "Cô giáo", w: ["Cô y tá", "Bác thợ may", "Cô bán hàng"], ex: "Cô giáo (thầy giáo) dạy học ở lớp mỗi ngày, dạy chữ và dạy điều hay cho học sinh." },
  { g: "Con người & nghề", q: "Tay cầm cưa, búa, đóng bàn đóng ghế cho mọi nhà. Là ai?", a: "Bác thợ mộc", w: ["Bác thợ xây", "Bác nông dân", "Chú thợ điện"], ex: "Thợ mộc làm nghề gỗ: cưa, bào, đóng bàn ghế; thợ xây thì xây nhà bằng gạch, vữa." }
];
/* ---------- Chủ đề gt-dovui ---------- */
(function () {
  var choose = GT_RIDDLES.map(function (f) {
    return gtStaticGen({ q: f.q, a: f.a, w: f.w, ex: f.ex }, "🌾 Đố vui dân gian");
  });
  function dovuiMatch() {
    var items = gtShuffle(GT_RIDDLES).slice(0, 14);
    var pairs = [], seenL = {}, seenR = {};
    for (var i = 0; i < items.length && pairs.length < 4; i++) {
      var f = items[i];
      var clue = f.q.length > 46 ? f.q.slice(0, 46) + "…" : f.q;
      var lk = gtValKey(clue), rk = gtValKey(f.a);
      if (seenL[lk] || seenR[rk]) continue;
      seenL[lk] = 1; seenR[rk] = 1;
      pairs.push([clue, f.a]);
    }
    if (pairs.length < 4) return null;
    return gtMatch("Nối nửa đầu câu đố với đáp án đúng của nó nhé!", pairs,
      "Mỗi câu đố chỉ khớp một đáp án: hãy bắt đúng hình ảnh ẩn dụ trong câu đố.");
  }
  function dovuiTF() {
    var rs = gtShuffle(GT_RIDDLES);
    if (rs.length < 4) return null;
    var a = rs[0], b = rs[1], c = rs[2], d = rs[3];
    var rounds = [
      { stmt: "Câu đố '" + a.q + "' — đáp án là: " + a.a, truth: true, explain: "Đúng. " + a.ex },
      { stmt: "Câu đố '" + b.q + "' — đáp án là: " + c.a, truth: false, explain: "Sai. Đáp án đúng là: " + b.a + ". " + b.ex },
      { stmt: "Câu đố '" + c.q + "' — đáp án là: " + c.a, truth: true, explain: "Đúng. " + c.ex },
      { stmt: "Câu đố '" + d.q + "' — đáp án là: " + a.a, truth: false, explain: "Sai. Đáp án đúng là: " + d.a + ". " + d.ex }
    ];
    return gtTF(gtShuffle(rounds), "Câu đố nào có đáp án đúng? Chạm Đúng hoặc Sai nhé!");
  }
  window.__GT_TOPICS.push({
    id: "gt-dovui", emoji: "🌾", name: "Đố vui dân gian",
    sub: "Câu đố truyền thống về đồ vật, con vật, cây quả — đoán hình ảnh ẩn dụ",
    pools: { choose: choose, match: [dovuiMatch], games: [dovuiTF] },
    knowledge: {
      notes: [
        "Câu đố dân gian giấu đáp án trong HÌNH ẢNH SO SÁNH: nghe 'có mỏ mà không biết hót' hãy nghĩ tới đồ vật có bộ phận giống cái mỏ (ấm nước).",
        "Đếm các chi tiết trong câu đố: số chân, số mắt, số anh em… thường là chìa khóa (tám cẳng hai càng → con cua).",
        "Chú ý chi tiết LOẠI TRỪ: 'có chân mà không biết đi' thì đáp án không phải con vật — đó là đồ vật có bộ phận tên giống chân (ghế).",
        "Khi phân vân giữa hai đáp án gần nhau, kiểm tra TỪNG chi tiết của câu đố: đáp án đúng phải khớp hết mọi chi tiết."
      ],
      facts: [
        { q: "Câu đố: 'Tám cẳng, hai càng, chẳng chịu đi thẳng, cứ bò ngang cả ngày.' Đáp án là gì?", a: "Con cua", ex: "Cua có 8 chân, 2 càng to và đi ngang." },
        { q: "Câu đố: 'Có xương mà không có thịt, trời mưa thì mở ra, trời nắng lại xếp vào.' Đáp án là gì?", a: "Cái ô", ex: "Ô có nan như xương, mưa mở nắng xếp." },
        { q: "Câu đố: 'Cái gì là của em mà người khác dùng nhiều hơn em?' Đáp án là gì?", a: "Cái tên của em", ex: "Mọi người gọi tên em suốt ngày, em ít khi tự gọi tên mình." }
      ],
      pairs: [["Tám cẳng, hai càng, bò ngang", "Con cua"], ["Có mỏ mà không biết hót", "Cái ấm nước"], ["Mang nhà trên lưng, bốn chân ngắn", "Con rùa"], ["Đầu đội vương miện lá, thân đầy mắt", "Quả dứa"], ["Đi thì nằm, nằm thì đứng", "Bàn chân"], ["Càng đào càng lớn", "Cái hố"]]
    }
  });
})();

/* ================================================================
   🏯 TÌM HIỂU LỊCH SỬ — BẢNG SỰ KIỆN (nguồn sự thật duy nhất trong
   game; bản đối chiếu cho QA: bang-su-kien.md ở thư mục cây v13).
   namSo = null → bộ sinh không hỏi năm của dòng đó.
   ng = mã "chủ thể thật" để chống mơ hồ bí danh (Nguyễn Huệ =
   Quang Trung; Nguyễn Tất Thành = Nguyễn Ái Quốc = Hồ Chí Minh;
   Lê Lợi gồm cả dòng Chi Lăng 1427 và Lam Sơn 1418…): bộ sinh
   người→sự kiện không bao giờ lấy nhiễu có cùng mã ng với câu hỏi.
   ================================================================ */
var GT_EVENTS = [
  { nv: "Hùng Vương", sk: "dựng nước Văn Lang — nhà nước đầu tiên của người Việt", nam: "khoảng thế kỉ VII trước Công nguyên", namSo: null, noi: "Phong Châu (nay thuộc Phú Thọ)", ng: "hungvuong" },
  { nv: "An Dương Vương", sk: "lập nước Âu Lạc, xây thành Cổ Loa", nam: "năm 208 trước Công nguyên", namSo: null, noi: "Cổ Loa (nay thuộc Đông Anh, Hà Nội)", ng: "adv" },
  { nv: "Hai Bà Trưng", sk: "khởi nghĩa chống quân Đông Hán", nam: "năm 40", namSo: 40, noi: "Mê Linh (nay thuộc Hà Nội)", ng: "hbt" },
  { nv: "Bà Triệu", sk: "khởi nghĩa chống quân Ngô", nam: "năm 248", namSo: 248, noi: "Thanh Hóa", ng: "batrieu" },
  { nv: "Lý Bí", sk: "khởi nghĩa thắng lợi, lập nước Vạn Xuân", nam: "năm 544", namSo: 544, noi: "Long Biên (nay thuộc Hà Nội)", ng: "lybi" },
  { nv: "Mai Thúc Loan", sk: "Khởi nghĩa Mai Thúc Loan", nam: "năm 713 – 722", namSo: null, noi: "Hoan Châu (nay thuộc Nghệ An, Hà Tĩnh)", ng: "mtl" },
  { nv: "Phùng Hưng", sk: "Khởi nghĩa Phùng Hưng", nam: "khoảng năm 766", namSo: null, noi: "Đường Lâm (nay thuộc Hà Nội)", ng: "phunghung" },
  { nv: "Khúc Thừa Dụ", sk: "giành quyền tự chủ cho đất nước, tự xưng Tiết độ sứ", nam: "năm 905", namSo: null, noi: "Đại La", ng: "ktd" },
  { nv: "Ngô Quyền", sk: "chiến thắng Bạch Đằng, đánh tan quân Nam Hán", nam: "năm 938", namSo: 938, noi: "sông Bạch Đằng", ng: "ngoquyen" },
  { nv: "Đinh Bộ Lĩnh", sk: "dẹp loạn 12 sứ quân, lập nước Đại Cồ Việt", nam: "năm 968", namSo: 968, noi: "Hoa Lư (nay thuộc Ninh Bình)", ng: "dinhbolinh" },
  { nv: "Lê Hoàn", sk: "đánh thắng quân xâm lược Tống", nam: "năm 981", namSo: 981, noi: "sông Bạch Đằng", ng: "lehoan" },
  { nv: "Lý Thái Tổ", sk: "dời đô về Đại La, đổi tên thành Thăng Long", nam: "năm 1010", namSo: 1010, noi: "Thăng Long (nay là Hà Nội)", ng: "lythaito" },
  { nv: "Lý Thường Kiệt", sk: "đại phá quân Tống ở phòng tuyến sông Như Nguyệt", nam: "năm 1077", namSo: 1077, noi: "sông Như Nguyệt (nay thuộc Bắc Ninh)", ng: "ltk" },
  { nv: "Trần Hưng Đạo", sk: "chỉ huy chiến thắng Bạch Đằng lần thứ ba, kết thúc thắng lợi cuộc kháng chiến chống Nguyên – Mông", nam: "năm 1288", namSo: 1288, noi: "sông Bạch Đằng", ng: "thd" },
  { nv: "Quân dân nhà Trần", sk: "ba lần đánh thắng quân xâm lược Nguyên – Mông", nam: "các năm 1258, 1285 và 1288", namSo: null, noi: null, ng: "thd" },
  { nv: "Trần Quốc Toản", sk: "mang lá cờ thêu sáu chữ vàng 'Phá cường địch, báo hoàng ân' tham gia kháng chiến chống Nguyên – Mông", nam: "thời nhà Trần", namSo: null, noi: null, ng: "tqt" },
  { nv: "Lê Lợi", sk: "lãnh đạo khởi nghĩa Lam Sơn thắng lợi, lập ra nhà Lê sơ", nam: "năm 1428", namSo: 1428, noi: "Lam Sơn (nay thuộc Thanh Hóa)", ng: "leloi" },
  { nv: "Nguyễn Trãi", sk: "viết Bình Ngô đại cáo, tuyên bố nền độc lập sau khởi nghĩa Lam Sơn", nam: "năm 1428", namSo: 1428, noi: null, ng: "nguyentrai" },
  { nv: "Lê Thánh Tông", sk: "ban hành bộ luật Hồng Đức", nam: "thế kỉ XV", namSo: null, noi: "Thăng Long", ng: "lethanhtong" },
  { nv: "Quang Trung", sk: "đại phá quân Thanh trong trận Ngọc Hồi – Đống Đa", nam: "năm 1789", namSo: 1789, noi: "Đống Đa (nay thuộc Hà Nội)", ng: "quangtrung" },
  { nv: "Gia Long", sk: "lập ra triều Nguyễn, chọn Phú Xuân làm kinh đô", nam: "năm 1802", namSo: 1802, noi: "Phú Xuân (nay là Huế)", ng: "gialong" },
  { nv: "Hàm Nghi", sk: "xuống chiếu Cần Vương, kêu gọi văn thân, sĩ phu đứng lên chống Pháp", nam: "năm 1885", namSo: 1885, noi: "Tân Sở (nay thuộc Quảng Trị)", ng: "hamnghi" },
  { nv: "Hoàng Hoa Thám", sk: "lãnh đạo khởi nghĩa Yên Thế chống Pháp", nam: "1884 – 1913 (làm thủ lĩnh từ năm 1892)", namSo: null, noi: "Yên Thế (nay thuộc Bắc Ninh)", ng: "hht" },
  { nv: "Phan Bội Châu", sk: "tổ chức phong trào Đông Du, đưa thanh niên sang Nhật Bản học tập", nam: "năm 1905", namSo: 1905, noi: "Nhật Bản", ng: "pbc" },
  { nv: "Nguyễn Tất Thành", sk: "rời bến Nhà Rồng ra đi tìm đường cứu nước", nam: "năm 1911", namSo: 1911, noi: "bến Nhà Rồng (nay thuộc Thành phố Hồ Chí Minh)", ng: "hcm" },
  { nv: "Nguyễn Ái Quốc", sk: "chủ trì hội nghị thành lập Đảng Cộng sản Việt Nam", nam: "ngày 3 tháng 2 năm 1930", namSo: 1930, noi: "Hương Cảng (Trung Quốc)", ng: "hcm" },
  { nv: null, sk: "Mặt trận Việt Minh được thành lập", nam: "năm 1941", namSo: 1941, noi: "Pác Bó (nay thuộc Cao Bằng)", ng: "hcm" },
  { nv: "Hồ Chí Minh", sk: "đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa", nam: "ngày 2 tháng 9 năm 1945", namSo: 1945, noi: "Quảng trường Ba Đình (Hà Nội)", ng: "hcm" },
  { nv: "Nhân dân cả nước", sk: "Tổng khởi nghĩa Cách mạng Tháng Tám thắng lợi", nam: "tháng 8 năm 1945", namSo: 1945, noi: null, ng: "hcm" },
  { nv: "Võ Nguyên Giáp", sk: "chỉ huy Chiến dịch Điện Biên Phủ toàn thắng", nam: "ngày 7 tháng 5 năm 1954", namSo: 1954, noi: "Điện Biên Phủ (nay thuộc Điện Biên)", ng: "vng" },
  { nv: null, sk: "Hiệp định Giơnevơ được kí kết, kết thúc chiến tranh ở Đông Dương", nam: "năm 1954", namSo: 1954, noi: "Giơnevơ (Thụy Sĩ)", ng: null },
  { nv: null, sk: "mở đường Hồ Chí Minh trên bộ qua dãy Trường Sơn để chi viện cho miền Nam", nam: "năm 1959", namSo: 1959, noi: "dãy Trường Sơn", ng: null },
  { nv: "Nhân dân Bến Tre", sk: "mở đầu phong trào Đồng Khởi", nam: "năm 1960", namSo: 1960, noi: "Bến Tre", ng: "danbentre" },
  { nv: null, sk: "Tổng tiến công và nổi dậy Tết Mậu Thân", nam: "năm 1968", namSo: 1968, noi: "miền Nam", ng: null },
  { nv: "Quân dân Hà Nội", sk: "chiến thắng 'Điện Biên Phủ trên không', bắn rơi nhiều pháo đài bay B-52 của Mĩ", nam: "năm 1972", namSo: 1972, noi: "Hà Nội", ng: "danhanoi" },
  { nv: null, sk: "Hiệp định Pari được kí kết, Mĩ phải rút quân khỏi miền Nam Việt Nam", nam: "ngày 27 tháng 1 năm 1973", namSo: 1973, noi: "Pari (Pháp)", ng: null },
  { nv: "Quân Giải phóng", sk: "tiến vào giải phóng Sài Gòn, kết thúc thắng lợi Đại thắng mùa Xuân", nam: "ngày 30 tháng 4 năm 1975", namSo: 1975, noi: "Sài Gòn", ng: "qgp" },
  { nv: null, sk: "Đại hội VI của Đảng đề ra đường lối Đổi mới đất nước", nam: "năm 1986", namSo: 1986, noi: "Hà Nội", ng: null },
  { nv: null, sk: "Việt Nam gia nhập Hiệp hội các quốc gia Đông Nam Á (ASEAN)", nam: "năm 1995", namSo: 1995, noi: null, ng: null },
  { nv: null, sk: "Việt Nam gia nhập Tổ chức Thương mại Thế giới (WTO)", nam: "năm 2007", namSo: 2007, noi: null, ng: null },
  { nv: "Chu Văn An", sk: "nhà giáo mẫu mực thời Trần, dâng Thất trảm sớ xin chém gian thần", nam: "thế kỉ XIV", namSo: null, noi: "Thăng Long", ng: "cva" },
  { nv: null, sk: "Giỗ Tổ Hùng Vương, lễ hội tưởng nhớ công ơn dựng nước của các vua Hùng", nam: "mùng 10 tháng 3 âm lịch", namSo: null, noi: "Đền Hùng (Phú Thọ)", ng: null },
  { nv: null, sk: "chiến thắng Chi Lăng – Xương Giang, buộc quân Minh phải xin hòa", nam: "năm 1427", namSo: 1427, noi: "Chi Lăng (nay thuộc Lạng Sơn)", ng: "leloi" },
  { nv: "Nguyễn Huệ", sk: "đại phá quân Xiêm trong trận Rạch Gầm – Xoài Mút", nam: "năm 1785", namSo: 1785, noi: "sông Tiền (nay thuộc Tiền Giang)", ng: "quangtrung" },
  { nv: null, sk: "phong trào Xô viết Nghệ – Tĩnh lên cao trào", nam: "năm 1930", namSo: 1930, noi: "Nghệ An và Hà Tĩnh", ng: null },
  { nv: null, sk: "chiến thắng Đông Khê, mở đầu thắng lợi của Chiến dịch Biên giới thu – đông", nam: "năm 1950", namSo: 1950, noi: "Đông Khê (nay thuộc Cao Bằng)", ng: null },
  { nv: null, sk: "Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập", nam: "ngày 22 tháng 12 năm 1944", namSo: 1944, noi: "khu rừng Trần Hưng Đạo (nay thuộc Cao Bằng)", ng: "vng" },
  { nv: null, sk: "Lời kêu gọi toàn quốc kháng chiến chống thực dân Pháp", nam: "ngày 19 tháng 12 năm 1946", namSo: 1946, noi: "Hà Nội", ng: "hcm" },
  { nv: "Lê Lợi", sk: "phất cờ khởi nghĩa ở Lam Sơn chống quân Minh", nam: "năm 1418", namSo: 1418, noi: "Lam Sơn (nay thuộc Thanh Hóa)", ng: "leloi" },
  { nv: "Nguyễn Huệ", sk: "lên ngôi Hoàng đế, lấy niên hiệu Quang Trung", nam: "năm 1788", namSo: 1788, noi: "Phú Xuân (nay là Huế)", ng: "quangtrung" },
  /* Bổ sung sau rà soát ngoài 2026-10-16: thủ lĩnh ĐẦU TIÊN của Yên Thế là Lương Văn Nắm
     (1884), không phải Hoàng Hoa Thám (thủ lĩnh từ 1892). Dùng chung mã ng "hht" (cùng
     một phong trào) để bộ sinh không lấy hai dòng này làm nhiễu chéo cho nhau. */
  { nv: "Lương Văn Nắm", sk: "thủ lĩnh đầu tiên của khởi nghĩa Yên Thế", nam: "năm 1884", namSo: 1884, noi: "Yên Thế (nay thuộc Bắc Ninh)", ng: "hht" },
  /* Vân Đồn: thuyền lương của Trương Văn Hổ bị Trần Khánh Dư diệt TRƯỚC trận Bạch Đằng
     1288 (ở Bạch Đằng bị diệt là thuyền chiến của Ô Mã Nhi). namSo để trống để năm 1288
     vẫn duy nhất cho dòng Trần Hưng Đạo; mã ng "thd" vì thuộc cùng chiến dịch. */
  { nv: "Trần Khánh Dư", sk: "đánh tan đoàn thuyền lương của Trương Văn Hổ ở Vân Đồn", nam: "năm 1288", namSo: null, noi: "Vân Đồn (nay thuộc Quảng Ninh)", ng: "thd" }
];

/* ---------- 12 THẺ KHÁM PHÁ (bài kể + hộp sự kiện + câu hỏi gắn thẻ) ---------- */
var GT_CARDS = [
  { id: "gt-the-hungvuong", icon: "👑", title: "Thời Hùng Vương – Âu Lạc: buổi đầu dựng nước",
    nam: "Khoảng thế kỉ VII TCN – năm 208 TCN", noi: "Phong Châu – Cổ Loa", nhanvat: "Các vua Hùng, An Dương Vương",
    story: "Ngày xưa, ở vùng đất Phong Châu, các vua Hùng nối nhau dựng nên nước Văn Lang — nhà nước đầu tiên của người Việt ta. Truyền thuyết kể có mười tám đời vua Hùng. Người Văn Lang biết trồng lúa nước, đúc trống đồng, ở nhà sàn và mở hội mùa xuân. Đến cuối thời Hùng Vương, Thục Phán — tức An Dương Vương — lên ngôi, lập nước Âu Lạc và xây thành Cổ Loa hình xoáy ốc ở vùng đất nay thuộc Đông Anh, Hà Nội. Truyện kể vua có nỏ thần bắn một phát ra nhiều mũi tên, nhờ vậy thành Cổ Loa đứng vững nhiều năm. Công lao dựng nước của các vua Hùng được con cháu đời đời ghi nhớ: hằng năm, vào mùng 10 tháng 3 âm lịch, nhân dân cả nước hướng về Đền Hùng ở Phú Thọ để dự Giỗ Tổ Hùng Vương, nhớ ơn tổ tiên đã mở mang bờ cõi.",
    qs: [
      { q: "Nhà nước đầu tiên của người Việt là nước nào?", a: "Văn Lang", w: ["Âu Lạc", "Vạn Xuân", "Đại Cồ Việt"], ex: "Các vua Hùng dựng nước Văn Lang — nhà nước đầu tiên của người Việt, đóng đô ở Phong Châu." },
      { q: "An Dương Vương lập ra nước nào?", a: "Âu Lạc", w: ["Văn Lang", "Vạn Xuân", "Đại Việt"], ex: "An Dương Vương (Thục Phán) lập nước Âu Lạc và xây thành Cổ Loa." },
      { q: "Thành Cổ Loa nay thuộc địa phương nào?", a: "Đông Anh, Hà Nội", w: ["Phú Thọ", "Ninh Bình", "Bắc Ninh"], ex: "Cổ Loa nay thuộc huyện Đông Anh, thành phố Hà Nội." },
      { q: "Giỗ Tổ Hùng Vương được tổ chức vào ngày nào?", a: "Mùng 10 tháng 3 âm lịch", w: ["Mùng 1 tháng 1 âm lịch", "Rằm tháng 8 âm lịch", "Mùng 5 tháng 5 âm lịch"], ex: "Giỗ Tổ Hùng Vương diễn ra vào mùng 10 tháng 3 âm lịch tại Đền Hùng, Phú Thọ." }
    ] },
  { id: "gt-the-haibatrung", icon: "⚔️", title: "Hai Bà Trưng phất cờ khởi nghĩa",
    nam: "Năm 40", noi: "Mê Linh (nay thuộc Hà Nội)", nhanvat: "Trưng Trắc và Trưng Nhị",
    story: "Đầu công nguyên, nước ta bị nhà Hán đô hộ. Thái thú Tô Định cai trị hà khắc, bắt nhân dân nộp nhiều của cải. Ở huyện Mê Linh có hai chị em Trưng Trắc và Trưng Nhị, con gái một vị lạc tướng, nổi tiếng giỏi võ nghệ và thương dân. Mùa xuân năm 40, hai bà phất cờ khởi nghĩa ở Hát Giang. Nhân dân khắp nơi hưởng ứng, quân khởi nghĩa nhanh chóng đánh chiếm được nhiều thành trì, Tô Định phải bỏ chạy. Trưng Trắc được tôn làm vua, đóng đô ở Mê Linh. Đất nước sạch bóng quân đô hộ được ba năm. Sau đó nhà Hán sai Mã Viện mang đại quân sang đàn áp; hai bà chiến đấu anh dũng ở Cấm Khê rồi gieo mình xuống sông Hát để giữ trọn khí tiết. Nhân dân đời đời lập đền thờ Hai Bà, nhớ ơn hai nữ anh hùng đầu tiên đã đứng lên giành lại non sông.",
    qs: [
      { q: "Hai Bà Trưng phất cờ khởi nghĩa vào năm nào?", a: "Năm 40", w: ["Năm 248", "Năm 544", "Năm 938"], ex: "Khởi nghĩa Hai Bà Trưng bùng nổ năm 40 ở Mê Linh." },
      { q: "Hai Bà Trưng khởi nghĩa chống quân xâm lược nào?", a: "Quân Đông Hán", w: ["Quân Nam Hán", "Quân Tống", "Quân Minh"], ex: "Hai Bà chống ách đô hộ của nhà Đông Hán; thái thú Tô Định phải bỏ chạy." },
      { q: "Sau thắng lợi, Trưng Trắc được tôn làm vua và đóng đô ở đâu?", a: "Mê Linh", w: ["Cổ Loa", "Hoa Lư", "Thăng Long"], ex: "Trưng Trắc đóng đô ở Mê Linh, quê hương của hai chị em." },
      { q: "Người chị trong hai chị em họ Trưng là ai?", a: "Trưng Trắc", w: ["Trưng Nhị", "Bà Triệu", "Phùng Hưng"], ex: "Trưng Trắc là chị, Trưng Nhị là em; cả hai cùng phất cờ khởi nghĩa năm 40." }
    ] },
  { id: "gt-the-ngoquyen", icon: "🌊", title: "Ngô Quyền và chiến thắng Bạch Đằng năm 938",
    nam: "Năm 938", noi: "Sông Bạch Đằng", nhanvat: "Ngô Quyền",
    story: "Cuối thời Bắc thuộc, hào trưởng Ngô Quyền ở Đường Lâm được nhân dân tin yêu. Năm 938, quân Nam Hán do Lưu Hoằng Tháo dẫn theo đường biển kéo vào nước ta. Ngô Quyền tính kế: cho quân đóng cọc gỗ lớn, đầu bịt sắt nhọn, cắm ngầm dưới lòng sông Bạch Đằng ở chỗ hiểm yếu. Khi thủy triều lên cao che khuất bãi cọc, ông cho thuyền nhẹ ra khiêu chiến rồi giả thua rút chạy, dụ thuyền giặc đuổi theo vào sâu. Đúng lúc triều rút, bãi cọc nhô lên, thuyền lớn của giặc mắc cạn và bị đâm thủng hàng loạt. Quân ta từ hai bờ đổ ra đánh, quân Nam Hán đại bại, Lưu Hoằng Tháo tử trận. Chiến thắng Bạch Đằng năm 938 kết thúc hơn một nghìn năm Bắc thuộc, mở ra thời kì độc lập lâu dài cho dân tộc. Từ đây, đất nước ta bước vào kỉ nguyên độc lập, tự chủ và ngày càng lớn mạnh.",
    qs: [
      { q: "Chiến thắng Bạch Đằng của Ngô Quyền diễn ra vào năm nào?", a: "Năm 938", w: ["Năm 981", "Năm 1077", "Năm 1288"], ex: "Năm 938 — ba mốc Bạch Đằng nổi tiếng là 938, 981 và 1288; mốc đầu tiên thuộc về Ngô Quyền." },
      { q: "Ngô Quyền đánh thắng quân xâm lược nào trên sông Bạch Đằng?", a: "Quân Nam Hán", w: ["Quân Đông Hán", "Quân Tống", "Quân Nguyên – Mông"], ex: "Năm 938, Ngô Quyền đánh tan quân Nam Hán do Lưu Hoằng Tháo chỉ huy." },
      { q: "Ngô Quyền cho đóng cọc ngầm ở đâu để chặn thuyền giặc?", a: "Dưới lòng sông Bạch Đằng", w: ["Sông Như Nguyệt", "Sông Tiền", "Dãy Trường Sơn"], ex: "Bãi cọc gỗ đầu bịt sắt cắm ngầm dưới sông Bạch Đằng, nhô lên khi thủy triều rút." },
      { q: "Điều gì làm thuyền giặc bị đâm thủng hàng loạt?", a: "Mắc vào bãi cọc khi triều rút", w: ["Gặp bão lớn", "Bị voi chiến giẫm", "Hết lương thực"], ex: "Thuyền giặc đuổi theo vào lúc triều cao, đến khi triều rút thì mắc cạn trên bãi cọc nhọn." }
    ] },
  { id: "gt-the-lythaito", icon: "🐉", title: "Lý Thái Tổ dời đô ra Thăng Long năm 1010",
    nam: "Năm 1010", noi: "Từ Hoa Lư về Thăng Long (Hà Nội)", nhanvat: "Lý Thái Tổ (Lý Công Uẩn)",
    story: "Lý Công Uẩn là vị tướng tài được triều đình và nhân dân tin phục; khi lên ngôi, ông lấy hiệu là Lý Thái Tổ, mở đầu triều Lý. Năm 1010, nhà vua quyết định dời đô từ Hoa Lư về thành Đại La. Theo nhà vua, Hoa Lư núi non chật hẹp, chỉ hợp thời chiến; còn Đại La ở giữa vùng đồng bằng rộng, sông ngòi thuận tiện, là nơi 'rồng cuộn hổ ngồi', muôn đời là đất đế vương. Vua ban Chiếu dời đô, đổi tên thành Đại La thành Thăng Long — nghĩa là 'rồng bay lên'. Từ đó Thăng Long, nay là Hà Nội, trở thành trái tim của đất nước: nơi hội tụ nhân tài, buôn bán sầm uất, văn hoá phát triển. Quyết định dời đô năm 1010 cho thấy tầm nhìn sáng suốt của Lý Thái Tổ về một đất nước hoà bình, thịnh vượng lâu dài.",
    qs: [
      { q: "Lý Thái Tổ dời đô về Đại La vào năm nào?", a: "Năm 1010", w: ["Năm 968", "Năm 1077", "Năm 1428"], ex: "Năm 1010, Lý Thái Tổ ban Chiếu dời đô từ Hoa Lư về Đại La." },
      { q: "Trước khi dời đô, kinh đô của nước ta đặt ở đâu?", a: "Hoa Lư", w: ["Cổ Loa", "Mê Linh", "Lam Sơn"], ex: "Hoa Lư (Ninh Bình) là kinh đô thời Đinh – Tiền Lê, trước khi Lý Thái Tổ dời đô." },
      { q: "Sau khi dời đô, thành Đại La được đổi tên thành gì?", a: "Thăng Long", w: ["Đại La", "Đông Đô", "Phú Xuân"], ex: "Đại La là tên cũ; vua đổi thành Thăng Long. Đông Đô là tên gọi khác về sau, Phú Xuân là kinh đô thời Nguyễn." },
      { q: "Tên gọi 'Thăng Long' có nghĩa là gì?", a: "Rồng bay lên", w: ["Hổ ngồi", "Sông lớn", "Đất thiêng"], ex: "Thăng Long nghĩa là rồng bay lên — tên gọi gửi gắm mong ước đất nước thịnh vượng." }
    ] },
  { id: "gt-the-lythuongkiet", icon: "🛡️", title: "Lý Thường Kiệt giữ vững bờ cõi năm 1077",
    nam: "Năm 1077", noi: "Sông Như Nguyệt (nay thuộc Bắc Ninh)", nhanvat: "Lý Thường Kiệt",
    story: "Thế kỉ XI, nhà Tống ở phương Bắc âm mưu xâm lược nước ta một lần nữa. Tướng Lý Thường Kiệt chủ trương 'ngồi yên đợi giặc không bằng mang quân đánh trước', tiến sang đất Tống phá tan kho tàng và thế chuẩn bị của giặc rồi rút về giữ nước. Năm 1077, quân Tống tràn vào, Lý Thường Kiệt lập phòng tuyến vững chắc bên bờ sông Như Nguyệt, nay thuộc Bắc Ninh. Tương truyền, trong đêm, từ ngôi đền bên sông vang lên bài thơ thần 'Nam quốc sơn hà', khẳng định sông núi nước Nam là của người Nam, kẻ nào xâm phạm ắt sẽ thất bại. Bài thơ làm quân ta thêm vững tin. Sau nhiều trận đánh quyết liệt, quân Tống bị đẩy lui, phải xin rút về nước. Chiến thắng Như Nguyệt năm 1077 giữ vững nền độc lập và bờ cõi Đại Việt.",
    qs: [
      { q: "Phòng tuyến chống Tống của Lý Thường Kiệt đặt ở sông nào?", a: "Sông Như Nguyệt", w: ["Sông Bạch Đằng", "Sông Tiền", "Sông Hồng"], ex: "Phòng tuyến sông Như Nguyệt (nay thuộc Bắc Ninh) chặn đứng quân Tống năm 1077." },
      { q: "Chiến thắng Như Nguyệt diễn ra vào năm nào?", a: "Năm 1077", w: ["Năm 981", "Năm 1010", "Năm 1288"], ex: "Năm 1077, quân Tống bị đẩy lui khỏi phòng tuyến Như Nguyệt." },
      { q: "Bài thơ thần gắn với chiến thắng Như Nguyệt có tên là gì?", a: "Nam quốc sơn hà", w: ["Bình Ngô đại cáo", "Hịch tướng sĩ", "Chiếu dời đô"], ex: "'Nam quốc sơn hà' được coi như bản tuyên ngôn độc lập đầu tiên của nước ta." },
      { q: "Lý Thường Kiệt đánh thắng quân xâm lược nào?", a: "Quân Tống", w: ["Quân Hán", "Quân Minh", "Quân Thanh"], ex: "Lý Thường Kiệt đại phá quân Tống ở phòng tuyến sông Như Nguyệt năm 1077." }
    ] },
  { id: "gt-the-nhatran", icon: "🏯", title: "Nhà Trần ba lần thắng quân Nguyên – Mông",
    nam: "Các năm 1258, 1285 và 1288", noi: "Cả nước — quyết chiến ở Bạch Đằng năm 1288", nhanvat: "Trần Hưng Đạo và quân dân nhà Trần",
    story: "Thế kỉ XIII, đế quốc Nguyên – Mông hùng mạnh ba lần mang quân xâm lược nước ta vào các năm 1258, 1285 và 1288. Nhà Trần đoàn kết toàn dân chống giặc: ở hội nghị Diên Hồng, các bô lão đồng thanh hô 'Đánh!'. Hưng Đạo Vương Trần Quốc Tuấn, tức Trần Hưng Đạo, chỉ huy quân đội và viết Hịch tướng sĩ để khích lệ binh sĩ. Thiếu niên Trần Quốc Toản mang lá cờ thêu sáu chữ vàng 'Phá cường địch, báo hoàng ân' ra trận. Quân dân nhà Trần dùng kế vườn không nhà trống, đánh tiêu hao, chờ giặc mệt mỏi mới phản công quyết liệt. Trước trận quyết chiến, tướng Trần Khánh Dư đã đánh tan đoàn thuyền chở lương của Trương Văn Hổ ở Vân Đồn, khiến quân giặc rơi vào cảnh thiếu lương trầm trọng. Năm 1288, trong trận Bạch Đằng cuối cùng, quân ta lại dùng bãi cọc ngầm dưới sông đánh tan đoàn thuyền của Ô Mã Nhi đang rút chạy và bắt sống Ô Mã Nhi. Ba lần xâm lược đều thất bại thảm hại. Chiến thắng của nhà Trần là niềm tự hào về tinh thần đoàn kết và ý chí bảo vệ non sông của dân tộc ta.",
    qs: [
      { q: "Nhà Trần ba lần đánh thắng quân Nguyên – Mông vào những năm nào?", a: "1258, 1285 và 1288", w: ["938, 981 và 1288", "1077, 1285 và 1428", "1285, 1428 và 1789"], ex: "Ba lần kháng chiến chống Nguyên – Mông: 1258, 1285 và 1288." },
      { q: "Ai chỉ huy quân dân nhà Trần trong ba lần kháng chiến?", a: "Trần Hưng Đạo", w: ["Ngô Quyền", "Lý Thường Kiệt", "Lê Lợi"], ex: "Hưng Đạo Vương Trần Quốc Tuấn (Trần Hưng Đạo) là tổng chỉ huy ba lần kháng chiến." },
      { q: "Sáu chữ vàng trên lá cờ của Trần Quốc Toản là gì?", a: "Phá cường địch, báo hoàng ân", w: ["Nam quốc sơn hà", "Toàn dân đánh giặc", "Giữ vững bờ cõi"], ex: "Trần Quốc Toản tự thêu cờ 'Phá cường địch, báo hoàng ân' khi còn là thiếu niên." },
      { q: "Trận quyết định năm 1288 diễn ra ở đâu?", a: "Sông Bạch Đằng", w: ["Sông Như Nguyệt", "Chi Lăng", "Đống Đa"], ex: "Năm 1288, trận Bạch Đằng lần thứ ba kết thúc thắng lợi cuộc kháng chiến." }
    ] }
];

GT_CARDS.push(
  { id: "gt-the-lamson", icon: "🔥", title: "Lê Lợi và khởi nghĩa Lam Sơn",
    nam: "Năm 1418 – 1428", noi: "Lam Sơn (nay thuộc Thanh Hóa)", nhanvat: "Lê Lợi, Nguyễn Trãi",
    story: "Đầu thế kỉ XV, quân Minh sang xâm lược và cai trị hà khắc nước ta. Năm 1418, ở vùng Lam Sơn thuộc Thanh Hóa ngày nay, Lê Lợi phất cờ khởi nghĩa. Những năm đầu, nghĩa quân thiếu lương thực, phải ăn rau măng qua ngày, có lúc gian nan tưởng chừng không qua nổi. Quân Minh nhiều lần bao vây nguy khốn nhưng nghĩa quân vẫn kiên cường bám đất, giữ lòng dân. Nguyễn Trãi — nhà văn hoá, nhà quân sự tài ba — về theo Lê Lợi, hiến 'Bình Ngô sách', giúp mưu lược và viết thư chiêu dụ các thành giặc. Sau mười năm chiến đấu, nghĩa quân thắng lớn ở Chi Lăng – Xương Giang năm 1427, buộc quân Minh phải xin hòa. Năm 1428, Lê Lợi lên ngôi vua, lập nhà Lê sơ; Nguyễn Trãi viết Bình Ngô đại cáo tuyên bố nền độc lập của đất nước.",
    qs: [
      { q: "Khởi nghĩa Lam Sơn bùng nổ vào năm nào?", a: "Năm 1418", w: ["Năm 1428", "Năm 1285", "Năm 1789"], ex: "Lê Lợi phất cờ khởi nghĩa ở Lam Sơn năm 1418; năm 1428 là năm ông lên ngôi." },
      { q: "Ai đã giúp Lê Lợi mưu lược và viết Bình Ngô đại cáo?", a: "Nguyễn Trãi", w: ["Trần Hưng Đạo", "Lý Thường Kiệt", "Chu Văn An"], ex: "Nguyễn Trãi là quân sư của khởi nghĩa Lam Sơn, tác giả của Bình Ngô đại cáo." },
      { q: "Chiến thắng nào năm 1427 buộc quân Minh phải xin hòa?", a: "Chi Lăng – Xương Giang", w: ["Bạch Đằng", "Như Nguyệt", "Ngọc Hồi – Đống Đa"], ex: "Chiến thắng Chi Lăng – Xương Giang năm 1427 là đòn quyết định của khởi nghĩa Lam Sơn." },
      { q: "Lê Lợi lên ngôi, lập nhà Lê sơ vào năm nào?", a: "Năm 1428", w: ["Năm 1418", "Năm 1010", "Năm 1802"], ex: "Năm 1428, khởi nghĩa thắng lợi hoàn toàn, Lê Lợi lên ngôi mở đầu nhà Lê sơ." }
    ] },
  { id: "gt-the-quangtrung", icon: "🐘", title: "Quang Trung đại phá quân Thanh năm 1789",
    nam: "Mùng 5 Tết năm 1789", noi: "Ngọc Hồi – Đống Đa (nay thuộc Hà Nội)", nhanvat: "Quang Trung (Nguyễn Huệ)",
    story: "Cuối thế kỉ XVIII, nước ta còn chia cắt, giặc Thanh ở phương Bắc kéo quân vào chiếm Thăng Long. Được tin cấp báo, Nguyễn Huệ đang ở Phú Xuân lập tức lên ngôi Hoàng đế, lấy niên hiệu Quang Trung vào năm 1788, rồi tự mình cầm quân ra Bắc. Giữa mùa đông giá rét, nghĩa quân hành quân thần tốc ngày đêm, ăn Tết sớm trên đường đi và chia làm nhiều mũi tiến công. Đêm mùng 4 và rạng sáng mùng 5 Tết Kỉ Dậu, tức năm 1789, quân Tây Sơn bất ngờ đánh vào các đồn Ngọc Hồi, Đống Đa ở cửa ngõ Thăng Long. Quân Thanh không kịp trở tay, tan vỡ hoàn toàn. Vua Quang Trung cưỡi voi tiến vào Thăng Long trong niềm hân hoan của nhân dân đúng ngày mùng 5 Tết. Chiến thắng Ngọc Hồi – Đống Đa là một trong những chiến công oanh liệt nhất trong lịch sử chống ngoại xâm của dân tộc ta.",
    qs: [
      { q: "Quang Trung đại phá quân Thanh ở Ngọc Hồi – Đống Đa vào năm nào?", a: "Năm 1789", w: ["Năm 1785", "Năm 1802", "Năm 1885"], ex: "Đại thắng Ngọc Hồi – Đống Đa diễn ra vào đầu xuân năm 1789." },
      { q: "Trước khi ra Bắc, Nguyễn Huệ lên ngôi lấy niên hiệu gì?", a: "Quang Trung", w: ["Gia Long", "Thái Tổ", "Hưng Đạo"], ex: "Nguyễn Huệ lên ngôi năm 1788 ở Phú Xuân, lấy niên hiệu Quang Trung." },
      { q: "Chiến thắng Ngọc Hồi – Đống Đa diễn ra vào dịp lễ nào?", a: "Tết Nguyên đán", w: ["Tết Trung thu", "Tết Đoan Ngọ", "Ngày Giỗ Tổ"], ex: "Quân Thanh chủ quan dịp Tết; vua Quang Trung vào Thăng Long đúng mùng 5 Tết năm 1789." },
      { q: "Quang Trung đánh thắng quân xâm lược nào ở Ngọc Hồi – Đống Đa?", a: "Quân Thanh", w: ["Quân Minh", "Quân Tống", "Quân Xiêm"], ex: "Năm 1789 là quân Thanh; quân Xiêm bị Nguyễn Huệ đánh tan năm 1785 ở Rạch Gầm – Xoài Mút." }
    ] },
  { id: "gt-the-bacho", icon: "🇻🇳", title: "Bác Hồ và bản Tuyên ngôn Độc lập năm 1945",
    nam: "Ngày 2 tháng 9 năm 1945", noi: "Quảng trường Ba Đình (Hà Nội)", nhanvat: "Chủ tịch Hồ Chí Minh",
    story: "Năm 1911, người thanh niên Nguyễn Tất Thành rời bến Nhà Rồng ở Sài Gòn trên một con tàu Pháp, bắt đầu hành trình ba mươi năm tìm đường cứu nước qua nhiều nước trên thế giới. Năm 1941, Người trở về Tổ quốc, trực tiếp lãnh đạo phong trào cách mạng; Mặt trận Việt Minh ra đời ở Pác Bó thuộc Cao Bằng, đoàn kết toàn dân đứng lên giành độc lập. Tháng 8 năm 1945, Cách mạng Tháng Tám thắng lợi trên cả nước. Ngày 2 tháng 9 năm 1945, tại Quảng trường Ba Đình ở Hà Nội, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa. Hàng chục vạn đồng bào hân hoan lắng nghe lời khẳng định: nước Việt Nam có quyền hưởng tự do và độc lập, và thật sự đã trở thành một nước tự do, độc lập.",
    qs: [
      { q: "Bản Tuyên ngôn Độc lập được Bác Hồ đọc vào ngày nào?", a: "Ngày 2 tháng 9 năm 1945", w: ["Ngày 3 tháng 2 năm 1930", "Ngày 7 tháng 5 năm 1954", "Ngày 30 tháng 4 năm 1975"], ex: "Ngày 2 tháng 9 năm 1945 — ngày Quốc khánh của nước ta." },
      { q: "Bác Hồ đọc Tuyên ngôn Độc lập ở đâu?", a: "Quảng trường Ba Đình", w: ["Bến Nhà Rồng", "Pác Bó", "Điện Biên Phủ"], ex: "Tại Quảng trường Ba Đình, Hà Nội. Bến Nhà Rồng là nơi Bác ra đi năm 1911, Pác Bó là nơi Người về nước năm 1941." },
      { q: "Năm 1911, Nguyễn Tất Thành ra đi tìm đường cứu nước từ đâu?", a: "Bến Nhà Rồng", w: ["Ba Đình", "Pác Bó", "Tân Sở"], ex: "Bến Nhà Rồng (Sài Gòn) là nơi người thanh niên Nguyễn Tất Thành lên tàu ra đi năm 1911." },
      { q: "Mặt trận Việt Minh được thành lập ở đâu?", a: "Pác Bó (Cao Bằng)", w: ["Mê Linh", "Lam Sơn", "Đường Lâm"], ex: "Năm 1941, Mặt trận Việt Minh ra đời tại Pác Bó, tỉnh Cao Bằng." }
    ] },
  { id: "gt-the-dienbien", icon: "🏔️", title: "Chiến thắng Điện Biên Phủ năm 1954",
    nam: "Ngày 7 tháng 5 năm 1954", noi: "Điện Biên Phủ (nay thuộc tỉnh Điện Biên)", nhanvat: "Đại tướng Võ Nguyên Giáp",
    story: "Sau chín năm kháng chiến chống Pháp, vào năm 1954, thực dân Pháp xây dựng ở Điện Biên Phủ một tập đoàn cứ điểm rất mạnh, kiêu ngạo gọi là 'pháo đài không thể công phá'. Đại tướng Võ Nguyên Giáp được giao chỉ huy chiến dịch. Bộ đội ta kéo pháo qua đèo cao, đào hào vây hãm, kiên trì 'đánh chắc, tiến chắc'. Dân công từ khắp nơi gánh gạo, tải đạn, mở đường lên mặt trận. Nhiều đơn vị bộ đội chiến đấu vô cùng anh dũng để giữ vững từng tấc đất, từng trận địa pháo. Sau 56 ngày đêm chiến đấu anh dũng, chiều ngày 7 tháng 5 năm 1954, quân ta cắm lá cờ 'Quyết chiến, quyết thắng' trên nóc hầm chỉ huy của địch, toàn bộ tập đoàn cứ điểm phải đầu hàng. Chiến thắng Điện Biên Phủ 'lừng lẫy năm châu, chấn động địa cầu', buộc Pháp phải kí Hiệp định Giơnevơ, kết thúc chiến tranh ở Đông Dương.",
    qs: [
      { q: "Chiến dịch Điện Biên Phủ toàn thắng vào ngày nào?", a: "Ngày 7 tháng 5 năm 1954", w: ["Ngày 2 tháng 9 năm 1945", "Ngày 30 tháng 4 năm 1975", "Ngày 27 tháng 1 năm 1973"], ex: "Chiều 7 tháng 5 năm 1954, tập đoàn cứ điểm Điện Biên Phủ đầu hàng." },
      { q: "Ai là chỉ huy của Chiến dịch Điện Biên Phủ?", a: "Võ Nguyên Giáp", w: ["Hồ Chí Minh", "Trần Hưng Đạo", "Nguyễn Huệ"], ex: "Đại tướng Võ Nguyên Giáp trực tiếp chỉ huy Chiến dịch Điện Biên Phủ." },
      { q: "Chiến thắng Điện Biên Phủ diễn ra ở địa phương nào?", a: "Điện Biên Phủ", w: ["Cao Bằng", "Sài Gòn", "Hà Nội"], ex: "Điện Biên Phủ nay thuộc tỉnh Điện Biên, vùng Tây Bắc đất nước." },
      { q: "Lá cờ nào được cắm trên nóc hầm chỉ huy của địch chiều 7-5-1954?", a: "Cờ 'Quyết chiến, quyết thắng'", w: ["Cờ thêu sáu chữ vàng", "Cờ Cần Vương", "Cờ Đông Du"], ex: "Lá cờ 'Quyết chiến, quyết thắng' tung bay trên nóc hầm Đờ Cát đánh dấu chiến thắng toàn diện." }
    ] },
  { id: "gt-the-1975", icon: "🕊️", title: "Đại thắng mùa Xuân năm 1975",
    nam: "Ngày 30 tháng 4 năm 1975", noi: "Sài Gòn", nhanvat: "Quân và dân cả nước",
    story: "Sau Hiệp định Pari năm 1973, Mĩ rút quân nhưng miền Nam vẫn chưa được giải phóng. Mùa xuân năm 1975, Quân Giải phóng mở cuộc Tổng tiến công và nổi dậy trên toàn miền Nam, giải phóng hết tỉnh này đến tỉnh khác. Quân địch tan rã nhanh chóng trước sức tiến công như vũ bão của quân và dân ta. Chiến dịch cuối cùng mang tên Chiến dịch Hồ Chí Minh, hướng thẳng vào Sài Gòn — sào huyệt đầu não của địch. Trưa ngày 30 tháng 4 năm 1975, xe tăng của quân Giải phóng húc đổ cổng Dinh Độc Lập, lá cờ cách mạng tung bay trên nóc dinh. Miền Nam hoàn toàn giải phóng, hai miền Bắc – Nam sum họp một nhà sau hơn hai mươi năm chia cắt. Đại thắng mùa Xuân năm 1975 là thắng lợi vĩ đại, kết thúc vẻ vang cuộc kháng chiến chống Mĩ, cứu nước của nhân dân ta.",
    qs: [
      { q: "Miền Nam hoàn toàn giải phóng vào ngày nào?", a: "Ngày 30 tháng 4 năm 1975", w: ["Ngày 7 tháng 5 năm 1954", "Ngày 2 tháng 9 năm 1945", "Ngày 27 tháng 1 năm 1973"], ex: "Trưa 30 tháng 4 năm 1975, Sài Gòn được giải phóng, đất nước thống nhất." },
      { q: "Chiến dịch cuối cùng giải phóng Sài Gòn mang tên gì?", a: "Chiến dịch Hồ Chí Minh", w: ["Chiến dịch Điện Biên Phủ", "Chiến dịch Biên giới", "Phong trào Đồng Khởi"], ex: "Chiến dịch Hồ Chí Minh là chiến dịch quyết định của cuộc Tổng tiến công mùa Xuân 1975." },
      { q: "Hiệp định nào năm 1973 buộc Mĩ phải rút quân khỏi miền Nam?", a: "Hiệp định Pari", w: ["Hiệp định Giơnevơ", "Bình Ngô đại cáo", "Chiếu dời đô"], ex: "Hiệp định Pari kí ngày 27 tháng 1 năm 1973; Hiệp định Giơnevơ là của năm 1954." },
      { q: "Xe tăng quân Giải phóng đã húc đổ cổng của tòa nhà nào trưa 30-4-1975?", a: "Dinh Độc Lập", w: ["Thành Cổ Loa", "Đền Hùng", "Quảng trường Ba Đình"], ex: "Dinh Độc Lập ở Sài Gòn — biểu tượng của chính quyền Sài Gòn lúc bấy giờ." }
    ] },
  { id: "gt-the-bachdang", icon: "⚓", title: "Sông Bạch Đằng — ba lần chiến thắng xâm lược",
    nam: "Các năm 938, 981 và 1288", noi: "Sông Bạch Đằng", nhanvat: "Ngô Quyền, Lê Hoàn, Trần Hưng Đạo",
    story: "Sông Bạch Đằng ở vùng Hải Phòng – Quảng Ninh là nơi ghi dấu ba chiến thắng vang dội của dân tộc ta trên cùng một dòng sông. Lần thứ nhất, năm 938, Ngô Quyền dùng bãi cọc ngầm đánh tan quân Nam Hán, chấm dứt hơn một nghìn năm Bắc thuộc. Lần thứ hai, năm 981, vua Lê Hoàn chỉ huy quân dân đánh thắng quân Tống xâm lược trên dòng sông này. Lần thứ ba, năm 1288, Hưng Đạo Vương Trần Quốc Tuấn lại dùng kế cọc ngầm trên Bạch Đằng, tiêu diệt đoàn thuyền của Ô Mã Nhi đang rút chạy, kết thúc thắng lợi cuộc kháng chiến lần thứ ba của nhà Trần. Ba chiến thắng cách nhau hàng trăm năm nhưng cùng một bài học: biết dựa vào địa hình sông nước, lòng dân và mưu trí sáng tạo, một dân tộc nhỏ bé vẫn đánh thắng được những đội quân xâm lược hùng mạnh hơn nhiều lần.",
    qs: [
      { q: "Ba chiến thắng trên sông Bạch Đằng diễn ra vào những năm nào?", a: "938, 981 và 1288", w: ["938, 1077 và 1288", "981, 1288 và 1428", "938, 981 và 1077"], ex: "938 (Ngô Quyền), 981 (Lê Hoàn), 1288 (Trần Hưng Đạo) — ba lần trên cùng một dòng sông." },
      { q: "Chiến thắng Bạch Đằng năm 981 do ai chỉ huy?", a: "Lê Hoàn", w: ["Ngô Quyền", "Trần Hưng Đạo", "Lý Thường Kiệt"], ex: "Vua Lê Hoàn (Lê Đại Hành) đánh thắng quân Tống năm 981." },
      { q: "Cả ba lần thắng giặc trên sông Bạch Đằng đều dùng chung kế sách gì?", a: "Đóng cọc ngầm dưới lòng sông", w: ["Đốt thuyền cỏ ban đêm", "Đào hào vây kín thành", "Dùng voi chiến đạp giặc"], ex: "Kế bãi cọc ngầm lợi dụng thủy triều là 'đặc sản' của dòng sông Bạch Đằng lịch sử." },
      { q: "Chiến thắng Bạch Đằng năm 938 mở ra điều gì cho đất nước?", a: "Kết thúc thời Bắc thuộc, mở ra độc lập lâu dài", w: ["Lập ra nhà Lê sơ", "Buộc Pháp kí hiệp định", "Thống nhất hai miền"], ex: "Thắng lợi năm 938 của Ngô Quyền chấm dứt hơn một nghìn năm Bắc thuộc." }
    ] }
);

/* ---------- Bộ sinh câu hỏi từ bảng sự kiện ---------- */
function gtYearLabel(r) { return r.namSo == null ? r.nam : (/(ngày|tháng|mùng)/.test(r.nam) ? (r.nam.charAt(0).toUpperCase() + r.nam.slice(1)) : "Năm " + r.namSo); }
function gtPlaceKey(s) { return String(s || "").replace(/\(.*?\)/g, "").toLowerCase().replace(/\s+/g, " ").trim(); }
/* Lớp chắn theo PHIẾU SỬA DỨT ĐIỂM V13 (2026-10-16):
   - "Dòng lộ" (gtIsLeak): tên sự kiện (sk) đã chứa sẵn tên nhân vật (nv) — ví dụ
     "Khởi nghĩa Mai Thúc Loan". Các dòng lộ bị loại khỏi mọi dạng hỏi nhân vật
     (thân câu/đáp án sẽ tự lộ đáp án); chúng vẫn xuất hiện ở dạng hỏi nơi/năm hợp lệ.
   - "Dòng anh em" (gtIsSibling): cùng sk hoặc cùng mã nhóm ng — không được làm
     nhiễu chéo cho nhau khi dựng dàn đáp án. */
function gtNormTxt(s) { return String(s || "").toLowerCase().replace(/[.,;:'"«»()\-–—\/]/g, " ").replace(/\s+/g, " ").trim(); }
function gtIsLeak(r) { return !!(r && r.nv && gtNormTxt(r.sk).indexOf(gtNormTxt(r.nv)) >= 0); }
function gtIsSibling(a, b) { return a.sk === b.sk || (!!a.ng && a.ng === b.ng); }
function gtOtherYears(r, n) {
  var pool = GT_EVENTS.filter(function (x) { return x.namSo != null && x.namSo !== r.namSo && !gtIsSibling(x, r); });
  var seen = {}, out = [];
  gtShuffle(pool.slice()).forEach(function (x) { if (!seen[x.namSo] && out.length < n) { seen[x.namSo] = 1; out.push(x); } });
  return out;
}
function lsYearOfEvent() {
  var rows = GT_EVENTS.filter(function (r) { return r.namSo != null; });
  var r = gtPick(rows); if (!r) return null;
  var ds = gtOtherYears(r, 3).map(function (x) { return "Năm " + x.namSo; });
  return gtMCQ("Sự kiện «" + r.sk + "» diễn ra vào thời gian nào?", gtYearLabel(r), ds,
    "Đúng mốc thời gian: sự kiện «" + r.sk + "» diễn ra vào " + r.nam + ".", { badge: "🏯 Mốc thời gian" });
}
function lsEventOfYear() {
  var counts = {}; GT_EVENTS.forEach(function (r) { if (r.namSo != null) counts[r.namSo] = (counts[r.namSo] || 0) + 1; });
  /* Đích phải là năm duy nhất và tên sự kiện (đáp án đúng) ≤ 60 ký tự theo chuẩn ngân hàng. */
  var rows = GT_EVENTS.filter(function (r) { return r.namSo != null && counts[r.namSo] === 1 && r.sk.length <= 60; });
  var r = gtPick(rows); if (!r) return null;
  var ds = gtShuffle(GT_EVENTS.filter(function (x) { return x.namSo != null && x.namSo !== r.namSo; }).slice()).slice(0, 3).map(function (x) { return x.sk; });
  return gtMCQ("Vào " + r.nam + ", sự kiện nào sau đây đã diễn ra?", r.sk, ds,
    "Vào " + r.nam + (r.nv ? ", " + r.nv : "") + " — " + r.sk + ".", { badge: "🏯 Mốc thời gian" });
}
function lsPersonOfEvent() {
  var rows = GT_EVENTS.filter(function (r) { return r.nv && !gtIsLeak(r); });
  var r = gtPick(rows); if (!r) return null;
  var ds = gtShuffle(rows.filter(function (x) { return x.ng !== r.ng; }).slice()).slice(0, 3).map(function (x) { return x.nv; });
  return gtMCQ("Sự kiện «" + r.sk + "» gắn liền với nhân vật (lực lượng) nào?", r.nv, ds,
    (r.nam ? "Vào " + r.nam + ", " : "") + r.nv + " — " + r.sk + ".", { badge: "🏯 Nhân vật" });
}
function lsEventOfPerson() {
  var rows = GT_EVENTS.filter(function (r) { return r.nv && r.sk.length <= 60 && !gtIsLeak(r); });
  var r = gtPick(rows); if (!r) return null;
  var ds = gtShuffle(GT_EVENTS.filter(function (x) { return x.ng !== r.ng; }).slice()).slice(0, 3).map(function (x) { return x.sk; });
  return gtMCQ("«" + r.nv + "» gắn liền với sự kiện nào sau đây?", r.sk, ds,
    r.nv + " — " + r.sk + (r.nam ? " (" + r.nam + ")" : "") + ".", { badge: "🏯 Nhân vật" });
}
function lsPlaceOfEvent() {
  var rows = GT_EVENTS.filter(function (r) { return r.noi; });
  var r = gtPick(rows); if (!r) return null;
  var seenP = {}, uniqRows = [];
  gtShuffle(rows.filter(function (x) { return gtPlaceKey(x.noi) !== gtPlaceKey(r.noi) && !gtIsSibling(x, r); }).slice()).forEach(function (x) {
    var k = gtPlaceKey(x.noi); if (!seenP[k]) { seenP[k] = 1; uniqRows.push(x); }
  });
  var ds = uniqRows.slice(0, 3).map(function (x) { return x.noi; });
  return gtMCQ("Sự kiện «" + r.sk + "» diễn ra ở đâu?", r.noi, ds,
    "Sự kiện «" + r.sk + "» diễn ra ở " + r.noi + (r.nam ? " (" + r.nam + ")" : "") + ".", { badge: "🏯 Địa danh" });
}
function lsEventOfPlace() {
  var counts = {}; GT_EVENTS.forEach(function (r) { if (r.noi) { var k = gtPlaceKey(r.noi); counts[k] = (counts[k] || 0) + 1; } });
  var rows = GT_EVENTS.filter(function (r) { return r.noi && counts[gtPlaceKey(r.noi)] === 1 && r.sk.length <= 60; });
  var r = gtPick(rows); if (!r) return null;
  var ds = gtShuffle(GT_EVENTS.filter(function (x) { return x.noi && gtPlaceKey(x.noi) !== gtPlaceKey(r.noi); }).slice()).slice(0, 3).map(function (x) { return x.sk; });
  return gtMCQ("Sự kiện nào sau đây diễn ra ở " + r.noi + "?", r.sk, ds,
    "Ở " + r.noi + " đã diễn ra sự kiện: " + r.sk + (r.nam ? " (" + r.nam + ")" : "") + ".", { badge: "🏯 Địa danh" });
}
function lsBlankYear() {
  var rows = GT_EVENTS.filter(function (r) { return r.namSo != null; });
  var r = gtPick(rows); if (!r) return null;
  var ds = gtOtherYears(r, 3).map(function (x) { return String(x.namSo); });
  var s = "Sự kiện «" + r.sk + "» diễn ra vào năm □.";
  return gtBlank(s, String(r.namSo), ds, "Năm đúng là " + r.namSo + ": sự kiện «" + r.sk + "» diễn ra vào " + r.nam + ".",
    '<div class="sentence">' + gtEsc(s).replace("□", (typeof blankSlot === "function" ? blankSlot() : "□")) + "</div>", { badge: "🏯 Điền năm" });
}
function lsBlankPlace() {
  var rows = GT_EVENTS.filter(function (r) { return r.noi; });
  var r = gtPick(rows); if (!r) return null;
  var corr = r.noi.replace(/\s*\(.*?\)\s*/g, "").trim();
  var seenP2 = {}, uniqRows2 = [];
  gtShuffle(rows.filter(function (x) { return gtPlaceKey(x.noi) !== gtPlaceKey(r.noi) && !gtIsSibling(x, r); }).slice()).forEach(function (x) {
    var k = gtPlaceKey(x.noi); if (!seenP2[k]) { seenP2[k] = 1; uniqRows2.push(x); }
  });
  var ds = uniqRows2.slice(0, 3).map(function (x) { return x.noi.replace(/\s*\(.*?\)\s*/g, "").trim(); });
  var s = "Sự kiện «" + r.sk + "» diễn ra ở □.";
  return gtBlank(s, corr, ds, "Nơi đúng là " + r.noi + ": sự kiện «" + r.sk + "» diễn ra ở đó" + (r.nam ? " vào " + r.nam : "") + ".",
    '<div class="sentence">' + gtEsc(s).replace("□", (typeof blankSlot === "function" ? blankSlot() : "□")) + "</div>", { badge: "🏯 Điền nơi" });
}
function gtMatchGen(prompt, badge, pickRows, leftFn, rightFn, exText) {
  return function () {
    var rows = pickRows(); if (!rows || rows.length < 4) return null;
    var seenL = {}, seenR = {}, pairs = [];
    for (var i = 0; i < rows.length && pairs.length < 4; i++) {
      var L = leftFn(rows[i]), R = rightFn(rows[i]);
      if (seenL[gtValKey(L)] || seenR[gtValKey(R)]) continue;
      seenL[gtValKey(L)] = 1; seenR[gtValKey(R)] = 1;
      pairs.push([L, R]);
    }
    if (pairs.length < 4) return null;
    var q = gtMatch(prompt, pairs, exText);
    if (q && badge) q.badge = badge;
    return q;
  };
}
var lsMatchPerson = gtMatchGen("Nối mỗi nhân vật (lực lượng) với sự kiện gắn liền với họ:", "🏯 Nối nhân vật – sự kiện",
  function () { return gtShuffle(GT_EVENTS.filter(function (r) { return r.nv && r.sk.length <= 60 && !gtIsLeak(r); }).slice()); },
  function (r) { return r.nv; }, function (r) { return r.sk; },
  "Mỗi nhân vật gắn với một sự kiện tiêu biểu trong bảng sự kiện lịch sử.");
var lsMatchYear = gtMatchGen("Nối mỗi sự kiện với mốc thời gian đúng của nó:", "🏯 Nối sự kiện – năm",
  function () { return gtShuffle(GT_EVENTS.filter(function (r) { return r.namSo != null && r.sk.length <= 60; }).slice()); },
  function (r) { return r.sk; }, function (r) { return "Năm " + r.namSo; },
  "Các mốc năm đều lấy từ bảng sự kiện đã kiểm chứng.");
var lsMatchPlace = gtMatchGen("Nối mỗi sự kiện với nơi diễn ra của nó:", "🏯 Nối sự kiện – nơi",
  function () { return gtShuffle(GT_EVENTS.filter(function (r) { return r.noi && r.sk.length <= 60; }).slice()); },
  function (r) { return r.sk; }, function (r) { return r.noi.replace(/\s*\(.*?\)\s*/g, "").trim(); },
  "Mỗi sự kiện gắn với một địa danh trong bảng sự kiện lịch sử.");
function lsTF() {
  function stmtYear(r, yr) { return "Sự kiện «" + r.sk + "» diễn ra vào năm " + yr + "."; }
  function stmtPerson(r, nv) { return "Sự kiện «" + r.sk + "» gắn liền với " + nv + "."; }
  function stmtPlace(r, noi) { return "Sự kiện «" + r.sk + "» diễn ra ở " + noi.replace(/\s*\(.*?\)\s*/g, "").trim() + "."; }
  var parts = [];
  var yearRows = GT_EVENTS.filter(function (r) { return r.namSo != null; });
  var t1 = gtPick(yearRows); if (t1) parts.push({ visual: stmtYear(t1, t1.namSo), truth: true, explain: "Đúng. Sự kiện «" + t1.sk + "» diễn ra vào " + t1.nam + "." });
  var f1 = gtPick(yearRows); if (f1) { var oy = gtOtherYears(f1, 1)[0]; if (oy) parts.push({ visual: stmtYear(f1, oy.namSo), truth: false, explain: "Chưa đúng. Sự kiện «" + f1.sk + "» diễn ra vào " + f1.nam + ", không phải năm " + oy.namSo + "." }); }
  var personRows = GT_EVENTS.filter(function (r) { return r.nv && !gtIsLeak(r); });
  var t2 = gtPick(personRows); if (t2) parts.push({ visual: stmtPerson(t2, t2.nv), truth: true, explain: "Đúng. " + t2.nv + " — " + t2.sk + "." });
  var f2 = gtPick(personRows); if (f2) { var op = gtPick(personRows.filter(function (x) { return x.ng !== f2.ng; })); if (op) parts.push({ visual: stmtPerson(f2, op.nv), truth: false, explain: "Chưa đúng. Sự kiện «" + f2.sk + "» gắn với " + f2.nv + ", không phải " + op.nv + "." }); }
  var f3 = gtPick(GT_EVENTS.filter(function (r) { return r.noi; })); if (f3) { var op3 = gtPick(GT_EVENTS.filter(function (x) { return x.noi && gtPlaceKey(x.noi) !== gtPlaceKey(f3.noi); })); if (op3) parts.push({ visual: stmtPlace(f3, op3.noi), truth: false, explain: "Chưa đúng. Sự kiện «" + f3.sk + "» diễn ra ở " + f3.noi + "." }); }
  if (parts.length < 3) return null;
  var hasT = parts.some(function (p) { return p.truth; }), hasF = parts.some(function (p) { return !p.truth; });
  if (!hasT || !hasF) return null;
  return tfQ("Mỗi ý sau đây đúng hay sai?", gtShuffle(parts).map(function (p) { return { visual: p.visual, truth: p.truth, explain: p.explain }; }), "🏯 Đúng – sai lịch sử");
}

/* ---------- Đăng kí chủ đề gt-lichsu ---------- */
(function registerGtLichSu() {
  var cardGens = [];
  GT_CARDS.forEach(function (c) { c.qs.forEach(function (f) { cardGens.push(gtStaticGen(f, "🏯 Thẻ khám phá")); }); });
  window.__GT_TOPICS.push({
    "id": "gt-lichsu", "name": "🏯 Tìm hiểu lịch sử", "tag": "Hành trình 4.000 năm dựng nước và giữ nước", "advanced": false, "hideNameInGame": false,
    "pools": {
      "choose": [lsYearOfEvent, lsEventOfYear, lsPersonOfEvent, lsEventOfPerson, lsPlaceOfEvent, lsEventOfPlace].concat(cardGens),
      "blank": [lsBlankYear, lsBlankPlace],
      "match": [lsMatchPerson, lsMatchYear, lsMatchPlace],
      "games": [lsTF]
    },
    "knowledge": {
      "grade": 0, "subject": "", "title": "🏯 Tìm hiểu lịch sử",
      "notes": [
        "Dòng chảy lớn: dựng nước Văn Lang – Âu Lạc → các cuộc khởi nghĩa giành độc lập (Hai Bà Trưng, Bà Triệu, Lý Bí…) → chiến thắng Bạch Đằng 938 mở thời kì độc lập lâu dài.",
        "Các triều đại và mốc vàng: dời đô về Thăng Long 1010; thắng Tống ở Như Nguyệt 1077; nhà Trần ba lần thắng Nguyên – Mông (1258, 1285, 1288); khởi nghĩa Lam Sơn thắng lợi 1428; Quang Trung đại phá quân Thanh 1789.",
        "Thời kì hiện đại: Bác Hồ ra đi tìm đường cứu nước 1911 → Cách mạng Tháng Tám và Tuyên ngôn Độc lập 1945 → Điện Biên Phủ 1954 → Đại thắng mùa Xuân 1975, đất nước thống nhất."
      ],
      "facts": [
        { "q": "Chiến thắng nào mở ra thời kì độc lập lâu dài sau hơn một nghìn năm Bắc thuộc?", "a": "Chiến thắng Bạch Đằng năm 938 của Ngô Quyền.", "ex": "Sau thắng lợi này, đất nước bước vào kỉ nguyên độc lập, tự chủ." },
        { "q": "Ai dời đô về Thăng Long năm 1010?", "a": "Lý Thái Tổ (Lý Công Uẩn).", "ex": "Vua ban Chiếu dời đô, đổi tên Đại La thành Thăng Long — nghĩa là 'rồng bay lên'." },
        { "q": "Bản Tuyên ngôn Độc lập được đọc khi nào, ở đâu?", "a": "Ngày 2 tháng 9 năm 1945 tại Quảng trường Ba Đình, Hà Nội.", "ex": "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn, khai sinh nước Việt Nam Dân chủ Cộng hòa." }
      ],
      "pairs": [["Ngô Quyền", "Bạch Đằng 938"], ["Lý Thái Tổ", "Dời đô 1010"], ["Trần Hưng Đạo", "Bạch Đằng 1288"], ["Lê Lợi", "Lam Sơn 1428"], ["Quang Trung", "Ngọc Hồi – Đống Đa 1789"], ["Võ Nguyên Giáp", "Điện Biên Phủ 1954"]]
    }
  });
})();

/* ---------- Chủ thể + context + hiển thị ---------- */
var GT_SUBJ = { id: "giaitri", name: "🎉 Góc giải trí", icon: "🎉", topics: window.__GT_TOPICS };
/* Chuẩn hoá Kiến thức ĐÚNG khuôn chuyende.js: t.knowledge = {facts:[{q,a,ex,visual}],
   pairs, grade, subject}; notes (mảng chuỗi) đăng ký vào __MATH_KNOWLEDGE_NOTES
   bằng gán thêm khóa — __showKnowledge gọi mathNotes[t.id].map(...) nên giá trị
   BẮT BUỘC là mảng, không phải object knowledge. */
var __gtMn = window.__MATH_KNOWLEDGE_NOTES = window.__MATH_KNOWLEDGE_NOTES || {};
window.__GT_TOPICS.forEach(function (t) {
  var k = t.knowledge || {};
  t.knowledge = {
    facts: (k.facts || []).map(function (f) { return { q: f.q, a: f.a, ex: f.ex || "", visual: f.visual || "" }; }),
    pairs: k.pairs || [],
    grade: 0,
    subject: "Góc giải trí"
  };
  if (k.notes && k.notes.length) __gtMn[t.id] = k.notes.slice();
});
window.__gtFindTopic = function (id) { for (var i = 0; i < GT_SUBJ.topics.length; i++) if (GT_SUBJ.topics[i].id === id) return GT_SUBJ.topics[i]; return null; };
var __gtPrevTopicContext = window.__gtTopicContext;
window.__gtTopicContext = function (parts) {
  var t = window.__gtFindTopic(parts[2]);
  if (t) {
    var ctx = { grade: profile.grade, subj: GT_SUBJ, topic: t };
    /* Câu đố dân gian: KHÔNG nạp vào Ôn câu sai (hết bất ngờ = hết vui) — vỏ kiểm tra ctx.noCapture trước khi ghi kho câu sai. */
    if (t.id === "gt-dovui") ctx.noCapture = true;
    return ctx;
  }
  return (typeof __gtPrevTopicContext === "function") ? __gtPrevTopicContext(parts) : null;
};
function gtStarsHtml(n) { var s = ""; for (var i = 0; i < 3; i++) s += i < n ? "⭐" : "☆"; return s; }
function gtTopicCardHtml(t) {
  var g = profile.grade, best = (profile.best && profile.best[g + "|giaitri|" + t.id]) || 0;
  return '<div class="cd-grade"><div class="cd-topic-grid">' +
    '<div class="card cd-topic"><div class="cd-topic-name">' + gtEsc(t.name) + '</div>' +
    '<div class="cd-topic-tag">' + gtEsc(t.tag || t.sub || "") + '</div>' +
    '<div class="cd-topic-best">Đã đạt: ' + gtStarsHtml(best) + '</div>' +
    '<div class="btn-row">' +
    '<button class="btn success" data-gt-play="' + gtEsc(t.id) + '">▶️ Chơi ngay</button>' +
    '<button class="btn ghost" data-gt-know="' + gtEsc(t.id) + '">📖 Kiến thức</button>' +
    "</div></div></div></div>";
}
function gtBindTopicCards() {
  document.querySelectorAll("[data-gt-play]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = window.__gtFindTopic(b.getAttribute("data-gt-play")); if (t) launchTopic(GT_SUBJ, t);
    });
  });
  document.querySelectorAll("[data-gt-know]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = window.__gtFindTopic(b.getAttribute("data-gt-know"));
      if (t) { t.knowledge.grade = profile.grade; __showKnowledge(t); }
    });
  });
}
function gtRenderDovui() {
  window.__gtView = "item";
  var html = '<div class="topbar"><div><h2>🌾 Đố vui dân gian</h2><p>Câu đố truyền thống của ông cha — đoán được đáp án là một niềm vui, biết thêm cách giải mã hình ảnh ẩn dụ còn vui hơn!</p></div></div>';
  window.__GT_TOPICS.forEach(function (t) { if (t.id === "gt-dovui") html += gtTopicCardHtml(t); });
  document.getElementById("gt-body").innerHTML = html;
  gtBindTopicCards();
}
function gtRenderLichSu() {
  window.__gtView = "item";
  window.__gtDetail = null;
  var html = '<div class="topbar"><div><h2>🏯 Tìm hiểu lịch sử</h2><p>Đọc các câu chuyện theo dòng thời gian rồi thử sức với ngân hàng câu hỏi từ bảng sự kiện đã kiểm chứng.</p></div></div>';
  window.__GT_TOPICS.forEach(function (t) { if (t.id === "gt-lichsu") html += gtTopicCardHtml(t); });
  html += '<h3 class="gt-cards-title">🗺️ Hành trình lịch sử qua 12 thẻ khám phá</h3><div class="gt-card-grid">';
  GT_CARDS.forEach(function (c, i) {
    html += '<button class="gt-explore-card" data-gt-card="' + gtEsc(c.id) + '"><span class="gt-explore-ic">' + c.icon + '</span><span class="gt-explore-tx"><b>' + (i + 1) + ". " + gtEsc(c.title) + '</b><small>' + gtEsc(c.nam) + " · " + gtEsc(c.noi) + "</small></span></button>";
  });
  html += "</div>";
  document.getElementById("gt-body").innerHTML = html;
  gtBindTopicCards();
  document.querySelectorAll("[data-gt-card]").forEach(function (b) {
    b.addEventListener("click", function () { gtOpenCard(b.getAttribute("data-gt-card")); });
  });
}
function gtOpenCard(cardId) {
  var c = null; GT_CARDS.forEach(function (x) { if (x.id === cardId) c = x; });
  if (!c) return;
  window.__gtDetail = c;
  var html = '<div class="topbar"><div><h2>' + c.icon + " " + gtEsc(c.title) + "</h2></div></div>";
  html += '<button class="btn ghost" id="gt-card-back">← Về danh sách thẻ</button>';
  html += '<div class="gt-story">' + gtEsc(c.story) + "</div>";
  html += '<div class="gt-factbox"><div>📅 <b>Thời gian:</b> ' + gtEsc(c.nam) + "</div><div>📍 <b>Nơi diễn ra:</b> " + gtEsc(c.noi) + "</div><div>👤 <b>Nhân vật:</b> " + gtEsc(c.nhanvat) + "</div></div>";
  html += '<div class="btn-row"><button class="btn success" id="gt-card-quiz">❓ Trả lời câu hỏi của thẻ này</button></div>';
  document.getElementById("gt-body").innerHTML = html;
  document.getElementById("gt-card-back").addEventListener("click", function () { window.__gtDetail = null; gtRenderLichSu(); });
  document.getElementById("gt-card-quiz").addEventListener("click", function () {
    var base = window.__gtFindTopic("gt-lichsu"); if (!base) return;
    var gens = c.qs.map(function (f) { return gtStaticGen(f, "🏯 Thẻ: " + c.title); });
    var temp = { id: "gt-lichsu", name: "🏯 " + c.title, tag: base.tag, advanced: false, hideNameInGame: false,
      pools: { choose: gens, blank: [], match: [], games: [] }, knowledge: base.knowledge };
    launchTopic(GT_SUBJ, temp);
  });
}
window.__GT = {
  subj: GT_SUBJ, topics: GT_SUBJ.topics, cards: GT_CARDS, events: GT_EVENTS, riddles: GT_RIDDLES,
  findTopic: window.__gtFindTopic,
  renderDovui: gtRenderDovui, renderLichSu: gtRenderLichSu, openCard: gtOpenCard,
  handleBack: function () {
    if (window.__gtDetail) { window.__gtDetail = null; gtRenderLichSu(); return true; }
    return false;
  }
};
