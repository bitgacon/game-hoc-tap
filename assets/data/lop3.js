/* ================================================================
   GAME HỌC TẬP — FILE DỮ LIỆU RIÊNG LỚP 3 (assets/data/lop3.js)
   Dữ liệu Lớp 3 (gốc: block Lớp 3 + block mở rộng Lớp 3 của master; bộ hàm Toán Lớp 3 nằm ở thư viện dùng chung trong trang vỏ).
   Tách nguyên văn từ bản master đã kiểm chứng (MD5 5f54145de040cb8cefc9eeb7cb915cd5);
   trang vỏ nạp động file này khi người chơi chọn Lớp 3.
   ================================================================ */
    var MATH3_TOPICS = [
      { id: "m3-ontap", emoji: "🔢", name: "Ôn tập số đến 1000", sub: "Bài 1–8 • Đọc số, cộng trừ, tìm thành phần", pools: { choose: [g3ReadNum(999), g2SoSanh1000, g21000(true), g21000(false), g3FindComp, g3ComposeNum(false)], blank: [g3BlankComp, qBlankCalcFactory(999)], match: [g3MatchRead(999)], games: [g3MemRead(999), gTFCalcFactory(100), gCatchAnswerFactory(100)] } },
      { id: "m3-bang", emoji: "✖️", name: "Bảng nhân, bảng chia 2–9", sub: "Bài 9–15 • Bảng 6, 7, 8, 9 và ôn bảng 2–5", pools: { choose: [g3Table(true), g3Table(false), g3Table(true), g3Table(false), function () { return mcqQ("Trong phép nhân 7 × 8 = 56, số 56 gọi là gì?", ["Thừa số", "Thương"], "Tích", "Các số nhân với nhau là thừa số, kết quả của phép nhân là tích."); }, function () { return mcqQ("Trong phép chia 56 : 7 = 8, số 8 gọi là gì?", ["Tích", "Số bị chia"], "Thương", "Số bị chia : Số chia = Thương."); }], blank: [g3TableBlank], match: [g3TableMatch], games: [g3TableMem, g3TableTF, gCatchAnswerFactory(100)] } },
      { id: "m3-phan", emoji: "🍕", name: "Một phần mấy", sub: "Bài 13–14 • 1/2, 1/3, 1/4 … của một nhóm đồ vật", pools: { choose: [g3FracGroup, g3FracGroup, g3FracName], blank: [g3FracBlank], match: [g3FracMatch], games: [g3FracCatch, function () { return memQ("Lật thẻ tìm cặp đúng: phân số và cách đọc!", (function () { var ds = shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4); return ds.map(function (d) { return { a: '<span class="mem-expr">1/' + d + "</span>", b: '<span class="mem-text">Một phần ' + FRAC_READ3[d] + "</span>" }; }); })()); }] } },
      { id: "m3-hinh", emoji: "📐", name: "Hình phẳng và hình khối", sub: "Bài 16–22 • Trung điểm, hình tròn, góc vuông, khối hộp", pools: (function () { var kp = knowledgePools([
          ["Điểm nằm chính giữa đoạn thẳng, cách đều hai đầu đoạn thẳng, gọi là gì?", "Trung điểm", "Giao điểm", "Đỉnh", "Trung điểm là điểm ở giữa, chia đoạn thẳng thành hai phần bằng nhau."],
          ["Góc vuông có số đo bao nhiêu độ?", "90 độ", "45 độ", "180 độ", "Góc vuông bằng 90 độ, dùng ê ke để kiểm tra."],
          ["Hình tam giác có mấy cạnh, mấy đỉnh?", "3 cạnh, 3 đỉnh", "4 cạnh, 4 đỉnh", "2 cạnh, 2 đỉnh", "Tam giác có 3 cạnh và 3 đỉnh."],
          ["Hình tứ giác có mấy cạnh?", "4 cạnh", "3 cạnh", "5 cạnh", "Tứ giác là hình có 4 cạnh."],
          ["Hình chữ nhật có mấy góc vuông?", "4 góc vuông", "2 góc vuông", "Không có góc vuông", "Hình chữ nhật có 4 góc đều là góc vuông."],
          ["Hình vuông có đặc điểm nào?", "4 cạnh bằng nhau và 4 góc vuông", "Chỉ có 2 cạnh bằng nhau", "Không có góc vuông", "Hình vuông: 4 cạnh bằng nhau, 4 góc vuông."],
          ["Khối lập phương có mấy mặt?", "6 mặt", "4 mặt", "8 mặt", "Khối lập phương có 6 mặt, 8 đỉnh, 12 cạnh."],
          ["Khối hộp chữ nhật có mấy đỉnh?", "8 đỉnh", "6 đỉnh", "12 đỉnh", "Khối hộp chữ nhật có 6 mặt, 8 đỉnh, 12 cạnh."],
          ["Đường kính của hình tròn là đoạn thẳng thế nào?", "Đi qua tâm, nối hai điểm trên đường tròn", "Không đi qua tâm", "Nối tâm với một điểm trên đường tròn", "Đoạn đi qua tâm là đường kính; đoạn từ tâm ra đường tròn là bán kính."],
          ["Bán kính của hình tròn là đoạn thẳng nối từ đâu đến đâu?", "Từ tâm đến một điểm trên đường tròn", "Từ điểm này đến điểm kia ngoài tâm", "Từ ngoài hình tròn vào trong", "Bán kính nối tâm với một điểm trên đường tròn."]
        ], [["Trung điểm", "Điểm ở chính giữa đoạn thẳng"], ["Bán kính", "Tâm → điểm trên đường tròn"], ["Đường kính", "Đi qua tâm, gấp đôi bán kính"], ["Góc vuông", "90 độ"]], "Nối khái niệm với ý đúng nhé!");
        kp.choose = kp.choose.concat([g3Midpoint, g3Diameter]); return kp; })() },
      { id: "m3-nc100", emoji: "🧮", name: "Nhân, chia trong phạm vi 100", sub: "Bài 23–29 • Nhân 2 chữ số, chia có dư, gấp – giảm, toán 2 bước", pools: { choose: [g3Mul2x1, g3DivExact, g3DivRem, g3GapGam, g3TwoStep], blank: [g3BlankMulDiv], match: [g3MulMatch], games: [gMemCalcFactory(100), gTFCalcFactory(100), gCatchAnswerFactory(100)] } },
      { id: "m3-donvi", emoji: "🌡️", name: "Đơn vị đo: mm, gam, ml, độ C", sub: "Bài 30–35 • Độ dài, khối lượng, dung tích, nhiệt độ", pools: (function () { var kp = knowledgePools([
          ["1 cm bằng bao nhiêu mi-li-mét?", "10 mm", "100 mm", "1000 mm", "1 cm = 10 mm."],
          ["1 m bằng bao nhiêu xăng-ti-mét?", "100 cm", "10 cm", "1000 cm", "1 m = 100 cm."],
          ["1 kg bằng bao nhiêu gam?", "1000 g", "100 g", "10 g", "1 kg = 1000 g."],
          ["1 lít bằng bao nhiêu mi-li-lít?", "1000 ml", "100 ml", "10 ml", "1 l = 1000 ml."],
          ["Nhiệt độ được đo bằng đơn vị nào?", "Độ C (°C)", "Gam (g)", "Mi-li-mét (mm)", "Đơn vị đo nhiệt độ là độ C."],
          ["Nước đá tan chảy ở nhiệt độ nào?", "0°C", "100°C", "37°C", "Nước đá tan chảy ở 0°C."],
          ["Nước sôi ở nhiệt độ nào?", "100°C", "0°C", "50°C", "Nước sôi ở 100°C."],
          ["Để đo độ dày của một tờ giấy, đơn vị hợp lí là?", "Mi-li-mét (mm)", "Mét (m)", "Ki-lô-mét (km)", "Vật rất ngắn, rất mỏng đo bằng mi-li-mét."],
          ["Một gói mì tôm nặng khoảng 80 g. Đơn vị gam dùng để đo gì?", "Khối lượng", "Độ dài", "Dung tích", "Gam là đơn vị đo khối lượng."],
          ["Nhiệt độ cơ thể người khoẻ mạnh khoảng bao nhiêu?", "37°C", "0°C", "100°C", "Thân nhiệt bình thường khoảng 37°C."],
          ["Để đo lượng nước trong một thìa nhỏ, đơn vị hợp lí là?", "Mi-li-lít (ml)", "Lít (l)", "Ki-lô-gam (kg)", "Lượng chất lỏng ít đo bằng mi-li-lít."]
        ], [["mm", "Đo độ dài rất ngắn"], ["g", "Đo khối lượng"], ["ml", "Đo dung tích"], ["°C", "Đo nhiệt độ"]], "Nối đơn vị với đại lượng đo nhé!");
        kp.choose = kp.choose.concat([g3Convert, g3Convert]); return kp; })() },
      { id: "m3-nc1000", emoji: "💪", name: "Nhân, chia phạm vi 1000 và biểu thức", sub: "Bài 36–40 • Nhân chia 3 chữ số, thứ tự tính biểu thức", pools: { choose: [g3Mul3x1, g3Div3x1, g3ExprVal, g3ExprVal], blank: [g3BlankExpr, qBlankCalcFactory(999)], match: [g3ExprMatch], games: [gTFCalcFactory(100), gSortNumsFactory(999), gMemCalcFactory(100)] } },
      { id: "m3-so10000", emoji: "💯", name: "Các số đến 10 000", sub: "Bài 45–49 • Đọc, viết, so sánh, làm tròn", pools: { choose: [g3ReadNum(10000), g3ComposeNum(true), g3CompareBig(10000), g3Round(10), g3Round(100)], blank: [g3SeqBlank([100, 1000], 10000)], match: [g3MatchRead(10000)], games: [g3MemRead(10000), g3SortBig(10000), gTFCalcFactory(100)] } },
      { id: "m3-lama", emoji: "🏛️", name: "Chữ số La Mã", sub: "Bài 47 • I, V, X, L — đọc và viết số đến 20", pools: { choose: [g3RomanToNum, g3NumToRoman, function () { return mcqQ("Trong hệ chữ số La Mã, chữ L có giá trị là bao nhiêu?", ["10", "5"], "50", "I = 1, V = 5, X = 10, L = 50."); }, function () { return mcqQ("Số 4 viết bằng chữ số La Mã là?", ["IIII", "VI"], "IV", "Số 4 viết là IV (5 − 1), không viết IIII."); }], blank: [g3RomanBlank], match: [g3RomanMatch], games: g3RomanGames() } },
      { id: "m3-cvdt", emoji: "▦", name: "Chu vi và diện tích", sub: "Bài 50–53 • Tam giác, tứ giác, chữ nhật, hình vuông", pools: { choose: [g3PeriArea, g3PeriArea, g3PeriArea], blank: [g3BlankPeri], match: [g3PeriMatch], games: [gMemCalcFactory(100), gTFCalcFactory(100), gCatchAnswerFactory(100)] } },
      { id: "m3-calc10000", emoji: "🧮", name: "Tính trong phạm vi 10 000", sub: "Bài 54–58 • Cộng, trừ, nhân, chia số có bốn chữ số", pools: { choose: [g3AddSubBig(10000), g3AddSubBig(10000), g3Mul4x1, g3Div4x1], blank: [g3BlankBig], match: [g3MatchCalcBig], games: [gMemCalcFactory(100), gTFCalcFactory(100), g3SortBig(10000)] } },
      { id: "m3-so100000", emoji: "🚀", name: "Số đến 100 000 và tính toán", sub: "Bài 59–72 • Số 5 chữ số, làm tròn, cộng trừ nhân chia", pools: { choose: [g3ReadNum(100000), g3CompareBig(100000), g3Round(1000), g3Round(10000), g3AddSubBig(100000), g3MulDiv100000], blank: [g3SeqBlank([1000, 10000], 100000)], match: [g3MatchRead(100000)], games: [g3MemRead(100000), g3SortBig(100000), gTFCalcFactory(100)] } },
      { id: "m3-giotien", emoji: "🕐", name: "Đồng hồ, tháng – năm, tiền Việt Nam", sub: "Bài 66–69 • Giờ đến phút, lịch, các mệnh giá tiền", pools: { choose: [g2ClockMin, g3Money, g3Money, function () { return mcqQ("Tháng 2 của năm thường có bao nhiêu ngày?", ["30 ngày", "31 ngày"], "28 ngày", "Năm thường tháng 2 có 28 ngày; năm nhuận có 29 ngày."); }, function () { return mcqQ("Năm nhuận, tháng 2 có bao nhiêu ngày?", ["28 ngày", "30 ngày"], "29 ngày", "Cứ 4 năm có một năm nhuận, tháng 2 có 29 ngày."); }, function () { return mcqQ("Tháng nào sau đây có 31 ngày?", ["Tháng 4", "Tháng 6"], "Tháng 1", "Các tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày; tháng 4, 6, 9, 11 có 30 ngày."); }, function () { return mcqQ("Tháng 4 có bao nhiêu ngày?", ["31 ngày", "28 ngày"], "30 ngày", "Tháng 4, 6, 9, 11 có 30 ngày."); }, function () { return mcqQ("Một năm có bao nhiêu tháng?", ["10 tháng", "365 tháng"], "12 tháng", "Một năm có 12 tháng."); }], blank: [qBlankClock, g3MoneyBlank], match: [mClockHour, g3MoneyMatch], games: [gSortDays, gMemClock, gTFClock] } },
      { id: "m3-thongke", emoji: "📊", name: "Thống kê và xác suất", sub: "Bài 73–75 • Bảng số liệu; chắc chắn – có thể – không thể", pools: { choose: [g3TableRead, g3TableRead, function () { return mcqQ("Trong hộp chỉ có toàn bút xanh. Lấy ngẫu nhiên 1 cái bút. Sự kiện nào chắc chắn xảy ra?", ["Lấy được bút đỏ", "Không lấy được bút nào"], "Lấy được bút xanh", "Hộp chỉ có bút xanh nên chắc chắn lấy được bút xanh."); }, function () { return mcqQ("Sự kiện nào KHÔNG THỂ xảy ra?", ["Ngày mai em đi học", "Em được cô khen"], "Tung xúc xắc 6 mặt được mặt 8 chấm", "Xúc xắc chỉ có các mặt từ 1 đến 6, không thể ra mặt 8 chấm."); }, function () { return mcqQ("Chưa xem dự báo thời tiết, nói về trời ngày mai ta dùng cách nói nào?", ["Chắc chắn có mưa", "Không thể có mưa"], "Có thể có mưa, có thể không", "Khi sự việc chưa chắc chắn, ta dùng từ “có thể”."); }, function () { return mcqQ("Bảng số liệu dùng để làm gì?", ["Ghi lại và trình bày số liệu thu thập được", "Trang trí cho đẹp", "Thay cho bài kiểm tra"], "Bảng số liệu giúp ta dễ đọc, so sánh các số liệu."); }], blank: [], match: [function () { return pairsMatch("Nối tình huống với khả năng xảy ra nhé!", [["Túi chỉ có bi đỏ", "Chắc chắn lấy được bi đỏ"], ["Túi có bi đỏ và bi xanh", "Có thể lấy được bi đỏ"], ["Túi không có bi đỏ", "Không thể lấy được bi đỏ"], ["Gieo một con xúc xắc", "Có thể ra mặt 6 chấm"]]); }], games: [factsTF([["Bảng số liệu giúp ta dễ so sánh các số liệu", "Đúng", "Sai", null], ["Gieo xúc xắc có thể ra mặt 7 chấm", "Sai", "Đúng", null], ["Sự kiện chắc chắn là sự kiện luôn xảy ra", "Đúng", "Sai", null]])] } }
    ];
    /* ---------- TIẾNG VIỆT 3 ---------- */
    var TV3_TOPICS = [
      topic("tv3-chinhta", "✏️", "Chính tả phân biệt", "c/k • g/gh • ng/ngh • ch/tr • s/x • r/d/gi • l/n • v/d • hỏi/ngã • vần", [
        ["Từ nào viết đúng chính tả?", "kéo co", "céo co", "géo co", "Trước e, ta viết k: kéo."],
        ["Điền chữ đúng: “…ế” (đồ dùng để ngồi)?", "ghế", "gế", "khế (tên quả)", "Trước ê, ta viết gh: ghế."],
        ["Từ nào viết đúng chính tả?", "nghệ thuật", "ngệ thuật", "ghệ thuật", "Trước ê, ta viết ngh: nghệ."],
        ["Điền chữ đúng: “quả …anh” (quả chua họ cam)?", "chanh", "tranh (bức tranh)", "xanh", "Quả chanh viết ch."],
        ["Điền chữ đúng: “dòng …ông” (dòng nước lớn chảy ra biển)?", "sông", "xông", "công", "Dòng sông viết s."],
        ["Điền chữ đúng: “…a đình” (tổ ấm của mỗi người)?", "gia đình", "da đình", "ra đình", "Gia đình viết gi."],
        ["Từ nào viết đúng chính tả?", "niềm vui", "liềm vui", "nghiềm vui", "Niềm vui viết n."],
        ["Điền vần đúng: “buổi ch…ều” (thời gian cuối ngày)?", "chiều", "chìu", "triều", "Buổi chiều viết vần iêu: chiều."],
        ["Từ nào mang dấu hỏi?", "hỏi", "hõi", "hói", "Từ “hỏi” mang dấu hỏi."],
        ["Từ nào mang dấu ngã?", "sữa", "sửa", "sưa", "Từ “sữa” mang dấu ngã; “sửa” mang dấu hỏi."],
        ["Từ nào viết đúng chính tả?", "cái chén", "cái chéng", "cái chến", "“Chén” viết vần en."],
        ["Từ nào viết đúng chính tả?", "hạt cát", "hạt các", "hạt cạt", "Hạt cát viết vần at."],
        ["Từ nào viết đúng chính tả?", "vở bài tập", "dở bài tập", "giở bài tập", "Quyển vở viết v."]
      ], [["k, gh, ngh", "Đứng trước e, ê, i"], ["sông", "Viết s"], ["chanh", "Viết ch"], ["gia đình", "Viết gi"]], "Nối từ với quy tắc đúng nhé!"),
      topic("tv3-tungu", "📚", "Từ ngữ: đồng nghĩa, trái nghĩa, chủ đề", "Từ đồng nghĩa • Trái nghĩa • Từ ngữ theo 8 chủ đề sách", [
        ["Từ đồng nghĩa với “chăm chỉ” là từ nào?", "siêng năng", "lười biếng", "chậm chạp", "Chăm chỉ và siêng năng có nghĩa gần giống nhau."],
        ["Từ đồng nghĩa với “to lớn” là từ nào?", "khổng lồ", "nhỏ bé", "bé xíu", "To lớn ≈ khổng lồ: đều chỉ kích thước rất lớn."],
        ["Từ đồng nghĩa với “can đảm” là từ nào?", "dũng cảm", "nhút nhát", "sợ hãi", "Can đảm ≈ dũng cảm."],
        ["Từ trái nghĩa với “cao” là từ nào?", "thấp", "dài", "rộng", "Cao trái nghĩa với thấp."],
        ["Từ trái nghĩa với “nóng” là từ nào?", "lạnh", "nóng nực", "ấm áp", "Nóng trái nghĩa với lạnh."],
        ["Từ trái nghĩa với “sáng” (độ sáng) là từ nào?", "tối", "chói chang", "rực rỡ", "Sáng trái nghĩa với tối."],
        ["Nhóm từ nào chỉ đồ vật trong gia đình (chủ đề Mái nhà yêu thương)?", "bếp, giường, nồi cơm", "bảng đen, phấn, thước", "sông, núi, rừng", "Bếp, giường, nồi cơm là đồ vật trong nhà."],
        ["Từ nào chỉ hiện tượng của thiên nhiên?", "cơn mưa", "cái bàn", "quyển vở", "Cơn mưa là hiện tượng thiên nhiên (chủ đề Những sắc màu thiên nhiên)."],
        ["Từ “nhà rông” thuộc chủ đề nào trong sách?", "Đất nước ngàn năm", "Trái đất của chúng mình", "Những trải nghiệm thú vị", "Bài “Nhà rông” thuộc chủ đề Đất nước ngàn năm."],
        ["Từ nào thuộc chủ đề Trái đất của chúng mình?", "rô-bốt", "nhà rông", "bếp lửa", "Bài “Rô-bốt ở quanh ta” thuộc chủ đề Trái đất của chúng mình."]
      ], [["chăm chỉ", "siêng năng (đồng nghĩa)"], ["cao", "thấp (trái nghĩa)"], ["nhà rông", "Đất nước ngàn năm"], ["thư viện", "Cổng trường rộng mở"]], "Nối từ với nhóm đúng nhé!"),
      topic("tv3-cau", "❓", "Câu và dấu câu", "Kiểu câu • Dấu : – “ ” , • Câu hỏi Khi nào? Ở đâu? Bằng gì? Để làm gì? • So sánh", [
        ["Câu “Bạn đang làm gì?” là kiểu câu nào?", "Câu hỏi", "Câu kể", "Câu cảm", "Câu dùng để hỏi là câu hỏi, kết thúc bằng dấu chấm hỏi."],
        ["Câu “Ôi, bông hoa đẹp quá!” là kiểu câu nào?", "Câu cảm", "Câu hỏi", "Câu khiến", "Câu bộc lộ cảm xúc là câu cảm, kết thúc bằng dấu chấm than."],
        ["Câu “Em hãy gấp sách lại.” là kiểu câu nào?", "Câu khiến", "Câu kể", "Câu cảm", "Câu nêu yêu cầu, đề nghị là câu khiến."],
        ["Câu “Mẹ em là cô giáo.” là kiểu câu nào?", "Câu giới thiệu", "Câu hỏi", "Câu khiến", "Câu giới thiệu người: “Mẹ em là cô giáo.”"],
        ["Câu “Chim sơn ca hót líu lo trên cành.” là kiểu câu nào?", "Câu nêu hoạt động", "Câu giới thiệu", "Câu cảm", "Câu nêu hoạt động của sự vật (chim — hót)."],
        ["Câu “Bông hồng đỏ thắm.” là kiểu câu nào?", "Câu nêu đặc điểm", "Câu nêu hoạt động", "Câu hỏi", "Câu nêu đặc điểm (màu sắc) của sự vật."],
        ["Để hỏi về thời gian, em dùng câu hỏi nào?", "Khi nào bạn đi học?", "Bạn đi học ở đâu?", "Bạn đi học bằng gì?", "“Khi nào?” dùng để hỏi về thời gian."],
        ["Để hỏi về nơi chốn, em dùng từ hỏi nào?", "Ở đâu?", "Khi nào?", "Để làm gì?", "“Ở đâu?” dùng để hỏi về địa điểm."],
        ["Để hỏi về mục đích, em dùng từ hỏi nào?", "Để làm gì?", "Bằng gì?", "Khi nào?", "“Để làm gì?” dùng để hỏi về mục đích."],
        ["Để hỏi về phương tiện, cách thức, em dùng từ hỏi nào?", "Bằng gì?", "Ở đâu?", "Để làm gì?", "“Bằng gì?” dùng để hỏi về phương tiện, cách thức."],
        ["Dấu hai chấm (:) thường được dùng khi nào?", "Trước lời nói trực tiếp hoặc phần liệt kê", "Để kết thúc câu hỏi", "Giữa hai chữ bất kì", "Dấu hai chấm báo hiệu lời trích dẫn hoặc liệt kê ở phía sau."],
        ["Lời nói trực tiếp của nhân vật được đặt trong dấu nào?", "Dấu ngoặc kép (“ ”)", "Dấu phẩy", "Dấu chấm", "Lời nói trực tiếp đặt trong dấu ngoặc kép."],
        ["Trong đoạn hội thoại, đầu lời nói của mỗi nhân vật thường có dấu nào?", "Dấu gạch ngang đầu dòng (–)", "Dấu chấm than", "Dấu ngoặc đơn", "Dấu gạch ngang đầu dòng đánh dấu lời nói của nhân vật."],
        ["Câu nào sử dụng biện pháp so sánh?", "Mặt trời như quả bóng lửa.", "Mặt trời mọc ở phía đông.", "Mặt trời rất to.", "Từ so sánh “như”: mặt trời được so sánh với quả bóng lửa."],
        ["Trong câu “Đẹp tựa tranh vẽ”, từ nào là từ so sánh?", "tựa", "và", "của", "“Tựa” là từ so sánh, cùng nhóm với “như”, “bằng”."]
      ], [["Câu hỏi", "Khi nào? Ở đâu?"], ["Câu cảm", "Ôi, đẹp quá!"], ["Câu khiến", "Hãy ngồi xuống!"], ["So sánh", "Đẹp như hoa"]], "Nối cho đúng nhé!"),
      topic("tv3-dochieu", "📖", "Đọc hiểu", "Hai Bà Trưng • Cóc kiện Trời • Bác sĩ Y-éc-xanh • Sự tích ông Đùng bà Đùng", [
        ["Hai Bà Trưng là ai?", "Hai chị em Trưng Trắc và Trưng Nhị", "Hai anh em ruột", "Hai mẹ con", "Hai Bà Trưng là hai chị em, quê ở Mê Linh."],
        ["Hai Bà Trưng phất cờ khởi nghĩa vào năm nào?", "Năm 40", "Năm 1940", "Năm 140", "Khởi nghĩa Hai Bà Trưng nổ ra năm 40."],
        ["Hai Bà Trưng khởi nghĩa chống lại quân xâm lược nào?", "Quân nhà Hán", "Quân nhà Minh", "Quân Pháp", "Hai Bà Trưng chống lại ách đô hộ của nhà Hán."],
        ["Quê hương của Hai Bà Trưng là vùng nào?", "Mê Linh", "Hoa Lư", "Lam Sơn", "Hai Bà Trưng quê ở Mê Linh (nay thuộc Hà Nội)."],
        ["Vì sao Cóc lên kiện Trời?", "Vì trời hạn hán, lâu ngày không có mưa", "Vì trời mưa quá nhiều gây lụt", "Vì Cóc muốn được làm vua", "Đồng ruộng khô hạn, Cóc quyết lên kiện Trời để xin mưa."],
        ["Ai dẫn đầu đoàn lên kiện Trời?", "Con Cóc", "Con Cọp", "Con Ong", "Cóc là người đứng đầu đoàn đi kiện Trời."],
        ["Đoàn đi kiện Trời gồm những con vật nào?", "Cóc, cua, cọp, ong, cáo, gà", "Chó, mèo, lợn, vịt", "Voi, hổ, báo, nai", "Truyện kể Cóc cùng cua, cọp, ong, cáo và gà lên kiện Trời."],
        ["Kết quả việc kiện Trời của đoàn Cóc là gì?", "Trời phải cho mưa xuống", "Trời phạt cả đoàn", "Cả đoàn bỏ về tay không", "Nhờ đoàn kết và mưu trí, đoàn của Cóc thắng kiện, Trời cho mưa."],
        ["Câu tục ngữ nào gắn với truyện Cóc kiện Trời?", "Con cóc là cậu ông Trời", "Ếch ngồi đáy giếng", "Chó treo mèo đậy", "Tục ngữ quen thuộc: “Con cóc là cậu ông Trời”."],
        ["Bác sĩ Y-éc-xanh là người nước nào?", "Pháp", "Việt Nam", "Thuỵ Sĩ", "Y-éc-xanh (Alexandre Yersin) là bác sĩ người Pháp."],
        ["Bác sĩ Y-éc-xanh sống và làm việc lâu năm ở thành phố nào của Việt Nam?", "Nha Trang", "Hà Nội", "Đà Lạt", "Ông gắn bó với thành phố Nha Trang (Khánh Hoà)."],
        ["Bác sĩ Y-éc-xanh nổi tiếng với việc tìm ra vi khuẩn gây bệnh nào?", "Bệnh dịch hạch", "Bệnh cảm cúm", "Bệnh đau mắt", "Năm 1894, ông tìm ra vi khuẩn gây bệnh dịch hạch."],
        ["Ông Đùng và bà Đùng là gì của nhau?", "Hai vợ chồng", "Hai anh em", "Hai người bạn", "Ông Đùng và bà Đùng là hai vợ chồng trong truyện cổ."],
        ["Ông Đùng, bà Đùng có đặc điểm gì nổi bật?", "Thân hình khổng lồ, sức khoẻ phi thường", "Bay được như chim", "Biết tàng hình", "Hai vợ chồng nổi tiếng vì to lớn và khoẻ mạnh lạ thường."],
        ["Truyện “Sự tích ông Đùng, bà Đùng” thuộc chủ đề nào trong sách Tiếng Việt 3?", "Đất nước ngàn năm", "Những sắc màu thiên nhiên", "Bài học từ cuộc sống", "Bài 22 thuộc chủ đề Đất nước ngàn năm (Tập Hai)."]
      ], [["Trưng Trắc, Trưng Nhị", "Khởi nghĩa năm 40"], ["Cóc", "Dẫn đoàn kiện Trời"], ["Y-éc-xanh", "Bác sĩ ở Nha Trang"], ["Ông Đùng, bà Đùng", "Vợ chồng khổng lồ"]], "Nối nhân vật với nội dung đúng nhé!")
    ];
    /* ---------- TIẾNG ANH 3 — Global Success ---------- */
    var UNITS3 = [
      { n: 0, title: "Starter", words: [["one", "1️⃣", "số 1"], ["two", "2️⃣", "số 2"], ["three", "3️⃣", "số 3"], ["four", "4️⃣", "số 4"], ["five", "5️⃣", "số 5"], ["six", "6️⃣", "số 6"], ["seven", "7️⃣", "số 7"], ["eight", "8️⃣", "số 8"], ["nine", "9️⃣", "số 9"], ["ten", "🔟", "số 10"]],
        patterns: [{ q: "Count with me: one, two, three, …", a: "four", w: ["four", "five", "six"] }, { q: "How many fingers do you have? — I have … fingers.", a: "ten", w: ["ten", "two", "five"] }] },
      { n: 1, title: "Hello", words: [["hello", "👋", "xin chào"], ["hi", "🙌", "chào (thân mật)"], ["goodbye", "🙋", "tạm biệt"], ["bye", "🌅", "tạm biệt (ngắn)"], ["fine", "😊", "khoẻ, ổn"], ["thank you", "🙏", "cảm ơn bạn"], ["how", "🤔", "như thế nào"]],
        patterns: [{ q: "Hello! How are you? — I'm …, thank you.", a: "fine", w: ["fine", "hello", "goodbye"] }] },
      { n: 2, title: "Our names", words: [["name", "📛", "tên"], ["old", "🎂", "tuổi (trong câu hỏi tuổi)"], ["what", "❓", "cái gì"], ["your", "👉", "của bạn"], ["my", "🙋", "của tôi"], ["how", "🤔", "như thế nào"]],
        patterns: [{ q: "What's your name? — My name is …", a: "Nam", w: ["Nam", "fine", "eight"] }, { q: "How old are you? — I'm … years old.", a: "eight", w: ["eight", "fine", "Nam"] }] },
      { n: 3, title: "Our friends", words: [["friend", "🧑‍🤝‍🧑", "bạn"], ["teacher", "👩‍🏫", "giáo viên"], ["Mr", "👨", "ông, thầy (gọi kính trọng)"], ["Ms", "👩", "cô (gọi kính trọng)"], ["this", "👉", "này, đây"], ["that", "👈", "kia, đó"], ["yes", "✅", "vâng, đúng"], ["no", "❌", "không"]],
        patterns: [{ q: "Is this your friend? — Yes, …", a: "it is", w: ["it is", "it isn't", "I do"] }, { q: "This is my …", a: "teacher", w: ["teacher", "name", "old"] }] },
      { n: 4, title: "Our bodies", words: [["ear", "👂", "tai"], ["eye", "👁️", "mắt"], ["face", "😀", "khuôn mặt"], ["hair", "💇", "tóc"], ["hand", "✋", "bàn tay"], ["mouth", "👄", "miệng"], ["nose", "👃", "mũi"], ["touch", "👆", "chạm vào"], ["open", "📖", "mở ra"]],
        patterns: [{ q: "Touch your …!", a: "nose", w: ["nose", "name", "teacher"] }, { q: "What's this? — It's my …", a: "ear", w: ["ear", "friend", "fine"] }] },
      { n: 5, title: "My hobbies", words: [["cooking", "🍳", "nấu ăn"], ["dancing", "💃", "nhảy múa"], ["drawing", "✏️", "vẽ"], ["painting", "🎨", "tô màu, vẽ tranh"], ["running", "🏃", "chạy"], ["singing", "🎤", "hát"], ["swimming", "🏊", "bơi"], ["walking", "🚶", "đi bộ"]],
        patterns: [{ q: "What's your hobby? — I like …", a: "swimming", w: ["swimming", "teacher", "nose"] }] },
      { n: 6, title: "Our school", words: [["art room", "🎨", "phòng mĩ thuật"], ["classroom", "🏫", "lớp học"], ["computer room", "💻", "phòng máy tính"], ["gym", "🏋️", "phòng tập thể dục"], ["library", "📚", "thư viện"], ["music room", "🎵", "phòng âm nhạc"], ["playground", "🛝", "sân chơi"], ["school", "🎒", "trường học"]],
        patterns: [{ q: "Let's go to the …!", a: "library", w: ["library", "cooking", "nose"] }] },
      { n: 7, title: "Classroom instructions", words: [["close", "🚪", "đóng lại"], ["come in", "🚶‍➡️", "vào trong"], ["go out", "🚶", "ra ngoài"], ["sit down", "🪑", "ngồi xuống"], ["speak", "🗣️", "nói"], ["stand up", "🧍", "đứng lên"], ["please", "🙏", "làm ơn, xin mời"]],
        patterns: [{ q: "May I …? — Yes, you can.", a: "go out", w: ["go out", "goodbye", "library"] }, { q: "…, please! (yêu cầu ngồi xuống)", a: "Sit down", w: ["Sit down", "Thank you", "Goodbye"] }] },
      { n: 8, title: "My school things", words: [["book", "📖", "sách"], ["eraser", "🧽", "tẩy, cục tẩy"], ["notebook", "📓", "vở"], ["pen", "🖊️", "bút mực"], ["pencil", "✏️", "bút chì"], ["pencil case", "👝", "hộp bút"], ["ruler", "📏", "thước kẻ"], ["school bag", "🎒", "cặp sách"]],
        patterns: [{ q: "Do you have a …? — Yes, I do.", a: "ruler", w: ["ruler", "cooking", "nose"] }] },
      { n: 9, title: "Colours", words: [["black", "⬛", "màu đen"], ["blue", "🟦", "màu xanh dương"], ["brown", "🟫", "màu nâu"], ["green", "🟩", "màu xanh lá"], ["orange", "🟧", "màu cam"], ["red", "🟥", "màu đỏ"], ["white", "⬜", "màu trắng"], ["yellow", "🟨", "màu vàng"]],
        patterns: [{ q: "What colour is it? — It's …", a: "red", w: ["red", "ruler", "nose"] }] },
      { n: 10, title: "Break time activities", words: [["chat", "💬", "trò chuyện"], ["word puzzles", "🧩", "trò chơi ô chữ"], ["badminton", "🏸", "cầu lông"], ["basketball", "🏀", "bóng rổ"], ["chess", "♟️", "cờ vua"], ["football", "⚽", "bóng đá"], ["table tennis", "🏓", "bóng bàn"], ["volleyball", "🏐", "bóng chuyền"]],
        patterns: [{ q: "What do you do at break time? — I play …", a: "football", w: ["football", "red", "nose"] }] },
      { n: 11, title: "My family", words: [["father", "👨", "bố"], ["mother", "👩", "mẹ"], ["brother", "👦", "anh/em trai"], ["sister", "👧", "chị/em gái"], ["eleven", "11", "số 11"], ["twelve", "12", "số 12"], ["fifteen", "15", "số 15"], ["twenty", "20", "số 20"]],
        patterns: [{ q: "Who's this? — This is my …", a: "mother", w: ["mother", "eleven", "red"] }, { q: "How old is he? — He's …", a: "eleven", w: ["eleven", "fine", "mother"] }] },
      { n: 12, title: "Jobs", words: [["cook", "👨‍🍳", "đầu bếp"], ["doctor", "👨‍⚕️", "bác sĩ"], ["driver", "🚕", "tài xế"], ["farmer", "👨‍🌾", "nông dân"], ["nurse", "👩‍⚕️", "y tá"], ["singer", "🎤", "ca sĩ"], ["teacher", "👩‍🏫", "giáo viên"], ["worker", "👷", "công nhân"]],
        patterns: [{ q: "What's her job? — She's a …", a: "nurse", w: ["nurse", "mother", "red"] }] },
      { n: 13, title: "My house", words: [["bathroom", "🛁", "phòng tắm"], ["bedroom", "🛏️", "phòng ngủ"], ["kitchen", "🍳", "nhà bếp"], ["living room", "🛋️", "phòng khách"], ["chair", "🪑", "cái ghế"], ["lamp", "💡", "đèn bàn"], ["table", "🍽️", "cái bàn"], ["house", "🏠", "ngôi nhà"]],
        patterns: [{ q: "Where's the chair? — It's … the living room.", a: "in", w: ["in", "on", "under"] }, { q: "The lamp is … the table.", a: "on", w: ["on", "in", "under"] }] },
      { n: 14, title: "My bedroom", words: [["bed", "🛌", "giường ngủ"], ["desk", "🗄️", "bàn học"], ["door", "🚪", "cửa ra vào"], ["window", "🪟", "cửa sổ"], ["big", "🐘", "to, lớn"], ["small", "🐜", "nhỏ"], ["new", "✨", "mới"], ["old", "🕰️", "cũ"]],
        patterns: [{ q: "There's a … in my bedroom.", a: "desk", w: ["desk", "kitchen", "cook"] }, { q: "There … a bed in the room.", a: "is", w: ["is", "are", "do"] }] },
      { n: 15, title: "At the dining table", words: [["bean", "🫘", "hạt đậu"], ["bread", "🍞", "bánh mì"], ["chicken", "🍗", "thịt gà"], ["egg", "🥚", "trứng"], ["fish", "🐟", "cá"], ["juice", "🧃", "nước ép"], ["meat", "🥩", "thịt"], ["milk", "🥛", "sữa"], ["rice", "🍚", "cơm"], ["water", "💧", "nước"]],
        patterns: [{ q: "Would you like some …? — Yes, please.", a: "milk", w: ["milk", "desk", "nurse"] }, { q: "I'd like some …, please.", a: "rice", w: ["rice", "big", "door"] }] },
      { n: 16, title: "My pets", words: [["bird", "🐦", "chim"], ["cat", "🐱", "mèo"], ["dog", "🐶", "chó"], ["goldfish", "🐠", "cá vàng"], ["parrot", "🦜", "vẹt"], ["rabbit", "🐰", "thỏ"]],
        patterns: [{ q: "Do you have a …? — Yes, I do.", a: "parrot", w: ["parrot", "milk", "desk"] }, { q: "How many … do you have? — I have two.", a: "dogs", w: ["dogs", "milk", "desk"] }] },
      { n: 17, title: "Our toys", words: [["bus", "🚌", "xe buýt"], ["car", "🚗", "ô tô"], ["kite", "🪁", "cái diều"], ["plane", "✈️", "máy bay"], ["ship", "🚢", "tàu thuỷ"], ["teddy bear", "🧸", "gấu bông"], ["train", "🚂", "tàu hoả"], ["truck", "🚚", "xe tải"]],
        patterns: [{ q: "He has a …", a: "kite", w: ["kite", "parrot", "rice"] }] },
      { n: 18, title: "Playing and doing", words: [["reading", "📖", "đọc sách"], ["watching TV", "📺", "xem ti vi"], ["listening to music", "🎧", "nghe nhạc"], ["writing", "✍️", "viết"], ["drawing a picture", "🖼️", "vẽ tranh"], ["singing", "🎤", "hát"], ["dancing", "💃", "nhảy múa"], ["playing basketball", "🏀", "chơi bóng rổ"]],
        patterns: [{ q: "What are you doing? — I'm …", a: "reading", w: ["reading", "kite", "milk"] }] },
      { n: 19, title: "Outdoor activities", words: [["cycling", "🚴", "đạp xe"], ["flying a kite", "🪁", "thả diều"], ["skating", "⛸️", "trượt băng"], ["skipping", "🪢", "nhảy dây"], ["running", "🏃", "chạy"], ["walking", "🚶", "đi bộ"], ["painting", "🎨", "vẽ, tô màu"], ["playing badminton", "🏸", "chơi cầu lông"]],
        patterns: [{ q: "What's she doing? — She's …", a: "skating", w: ["skating", "reading", "kite"] }] },
      { n: 20, title: "At the zoo", words: [["elephant", "🐘", "voi"], ["horse", "🐴", "ngựa"], ["monkey", "🐵", "khỉ"], ["peacock", "🦚", "con công"], ["tiger", "🐯", "hổ"], ["climbing", "🧗", "leo trèo"], ["swinging", "🐒", "đu, đánh đu"], ["counting", "🔢", "đếm"]],
        patterns: [{ q: "What can you see? — I can see a …", a: "tiger", w: ["tiger", "skating", "rice"] }, { q: "What's the monkey doing? — It's …", a: "climbing", w: ["climbing", "tiger", "milk"] }] }
    ];
    var ALL_WORDS3 = [];
    UNITS3.forEach(function (u) { u.words.forEach(function (w) { ALL_WORDS3.push(w); }); });
    function eng3Pools(u) {
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
        var w = pick(u.words);
        var truth = Math.random() < 0.5;
        var shown = truth ? w : (engDistractors(w, ALL_WORDS3, 1)[0] || w);
        return { kind: "tf", badge: "🎮 Trò chơi!", prompt: "Đúng hay sai? Chạm nhanh nhé!", rounds: [{ visual: '<div class="big-pic">' + picHTML(w) + '</div><div class="big-word">' + shown[0] + "</div>", truth: truth, explain: "Từ đúng là “" + w[0] + "”" }] };
      }
      var choose = base.choose.slice();
      if (pats.length) choose.push(patGen, patGen);
      var blank = [function () { return qEngBlankLetter(u.words); }];
      if (pats.length) blank.push(patBlank);
      return { choose: choose, blank: blank, match: base.match, games: base.games.concat([yesNoGen]) };
    }
    function g3CountWord() {
      var words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
      var n = rand(1, 10), ans = words[n - 1];
      var others = shuffle(words.filter(function (w) { return w !== ans; })).slice(0, 2);
      var all = shuffle([ans].concat(others));
      return { prompt: "Đếm xem có bao nhiêu ngôi sao? Chọn từ tiếng Anh đúng nhé!", speak: ans, visual: countBox(n, "⭐"),
        options: all.map(function (o) { return { html: '<span class="opt-word">' + o + "</span>" }; }), answer: all.indexOf(ans), cols: 3 };
    }
    /* ---------- TỰ NHIÊN VÀ XÃ HỘI 3 ---------- */
    var TNXH3_TOPICS = [
      topic("tnxh3-giadinh", "👨‍👩‍👧", "Gia đình", "Bài 1–4 • Họ hàng, phòng tránh hoả hoạn, vệ sinh quanh nhà", [
        ["Bố của bố, em gọi là gì?", "Ông nội", "Ông ngoại", "Bác họ", "Bố của bố là ông nội; bố của mẹ là ông ngoại."],
        ["Mẹ của mẹ, em gọi là gì?", "Bà ngoại", "Bà nội", "Cô ruột", "Mẹ của mẹ là bà ngoại."],
        ["Ông bà nội là bố mẹ của ai?", "Của bố", "Của mẹ", "Của hàng xóm", "Ông bà nội là bố mẹ của bố; ông bà ngoại là bố mẹ của mẹ."],
        ["Khi thấy cháy nhỏ trong nhà, việc đầu tiên em nên làm là gì?", "Báo ngay cho người lớn, gọi 114 nếu cần", "Tự dội nước vào ổ điện đang cháy", "Chạy trốn mà không nói với ai", "An toàn trên hết: báo người lớn và gọi cứu hoả 114."],
        ["Số điện thoại của lực lượng cứu hoả là số nào?", "114", "113", "115", "Cứu hoả: 114; công an: 113; cấp cứu: 115."],
        ["Để phòng tránh hoả hoạn, em KHÔNG nên làm việc nào?", "Nghịch diêm, bật lửa gần vật dễ cháy", "Dùng điện cẩn thận", "Báo người lớn khi ngửi thấy mùi khét", "Không nghịch lửa và không để vật dễ cháy gần bếp."],
        ["Việc nào giúp giữ vệ sinh xung quanh nhà?", "Quét dọn nhà cửa, đổ rác đúng nơi, không để nước đọng", "Vứt rác ra đường", "Để nước đọng cho muỗi sinh sôi", "Nhà sạch, thoáng giúp phòng bệnh."],
        ["Vì sao không nên để nước đọng quanh nhà?", "Vì muỗi sinh sôi trong nước đọng và truyền bệnh", "Vì nước đọng làm nhà đẹp hơn", "Không có lí do gì", "Muỗi truyền bệnh sốt xuất huyết sinh sôi ở nơi nước đọng."]
      ], [["Ông bà nội", "Bố mẹ của bố"], ["Ông bà ngoại", "Bố mẹ của mẹ"], ["Cứu hoả", "Gọi 114"], ["Nước đọng", "Nơi muỗi sinh sôi"]], "Nối cho đúng nhé!"),
      topic("tnxh3-truonghoc", "🏫", "Trường học", "Bài 5–8 • Kết nối cộng đồng, truyền thống trường, an toàn và vệ sinh", [
        ["Truyền thống của trường được tìm hiểu qua điều gì?", "Lịch sử, ngày thành lập trường và các thế hệ thầy trò", "Chỉ qua lời đồn", "Không cần tìm hiểu", "Mỗi trường có lịch sử và truyền thống riêng để tự hào, giữ gìn."],
        ["Việc nào giúp giữ an toàn ở trường?", "Đi lại trật tự, không chen lấn xô đẩy ở cầu thang", "Đùa nghịch ở ban công", "Trèo lên lan can", "Đi lại trật tự giúp tránh tai nạn ở trường."],
        ["Việc nào giữ gìn vệ sinh ở trường?", "Bỏ rác vào thùng, giữ lớp học sạch sẽ", "Vứt giấy ra sân trường", "Vẽ bậy lên bàn ghế", "Giữ trường lớp sạch đẹp là trách nhiệm của học sinh."],
        ["Hoạt động nào là hoạt động kết nối với cộng đồng của trường?", "Tham gia vệ sinh khu phố, thăm hỏi gia đình chính sách", "Chỉ ngồi trong lớp cả ngày", "Không tham gia hoạt động nào", "Trường học gắn bó với cộng đồng qua nhiều hoạt động ý nghĩa."],
        ["Thấy bạn bị ngã ở sân trường, em nên làm gì?", "Đỡ bạn dậy và báo thầy cô nếu bạn bị đau", "Bỏ mặc bạn", "Đứng cười đùa", "Giúp đỡ bạn, báo người lớn khi cần."],
        ["Đến trường bằng cách đi bộ, em cần chú ý điều gì?", "Đi trên vỉa hè, sang đường đúng nơi quy định", "Chạy qua đường ở bất cứ chỗ nào", "Đùa nghịch dưới lòng đường", "Tuân thủ an toàn giao thông khi đến trường."]
      ], [["Cầu thang trường", "Đi trật tự, không chen lấn"], ["Thùng rác", "Bỏ rác đúng nơi"], ["Ngày thành lập trường", "Truyền thống nhà trường"], ["Bạn bị ngã", "Đỡ dậy, báo thầy cô"]], "Nối cho đúng nhé!"),
      topic("tnxh3-congdong", "🏘️", "Cộng đồng địa phương", "Bài 9–12 • Nông nghiệp, thủ công và công nghiệp, di tích và cảnh quan", [
        ["Hoạt động nào thuộc sản xuất nông nghiệp?", "Trồng lúa, trồng rau, chăn nuôi", "Dệt vải trong xưởng", "Làm gốm sứ", "Sản xuất nông nghiệp gồm trồng trọt và chăn nuôi."],
        ["Hoạt động nào thuộc sản xuất thủ công?", "Làm gốm, dệt vải, đan lát bằng tay và dụng cụ đơn giản", "Sản xuất ô tô trong nhà máy lớn", "Khai thác dầu mỏ", "Thủ công là làm bằng tay khéo léo với dụng cụ đơn giản."],
        ["Hoạt động nào thuộc sản xuất công nghiệp?", "Sản xuất hàng hoá trong nhà máy bằng máy móc", "Trồng rau trong vườn nhà", "Đan rổ tre bằng tay", "Công nghiệp dùng máy móc, sản xuất với số lượng lớn."],
        ["Di tích lịch sử – văn hoá là gì?", "Nơi, công trình gắn với sự kiện, nhân vật lịch sử và văn hoá", "Một trung tâm thương mại mới xây", "Một khu vui chơi giải trí", "Di tích là dấu tích quý giá cần được bảo vệ."],
        ["Khi tham quan di tích, em nên làm gì?", "Giữ vệ sinh, không viết vẽ, chạm khắc lên di tích", "Khắc tên mình lên tường di tích", "Hái hoa, bẻ cành trong khu di tích", "Bảo vệ di tích là trách nhiệm của mọi người."],
        ["Với cảnh quan thiên nhiên đẹp ở địa phương, em nên làm gì?", "Giữ gìn, bảo vệ để cảnh luôn tươi đẹp", "Khai thác tuỳ tiện", "Xả rác bừa bãi", "Bảo vệ cảnh quan thiên nhiên của quê hương."]
      ], [["Trồng lúa", "Sản xuất nông nghiệp"], ["Làm gốm", "Sản xuất thủ công"], ["Nhà máy", "Sản xuất công nghiệp"], ["Đền, chùa cổ", "Di tích lịch sử – văn hoá"]], "Nối hoạt động với loại hình đúng nhé!"),
      topic("tnxh3-thucvat", "🌱", "Thực vật và động vật", "Bài 13–17 • Bộ phận và chức năng, sử dụng hợp lí", [
        ["Bộ phận nào của cây hút nước và muối khoáng từ đất?", "Rễ cây", "Thân cây", "Lá cây", "Rễ hút nước và muối khoáng để nuôi cây."],
        ["Bộ phận nào của cây vận chuyển nước, chất dinh dưỡng và nâng đỡ cây?", "Thân cây", "Rễ cây", "Hoa", "Thân vận chuyển các chất và nâng đỡ toàn bộ cây."],
        ["Lá cây có chức năng chính nào?", "Quang hợp tạo chất dinh dưỡng cho cây", "Hút nước từ đất", "Nâng đỡ cây đứng thẳng", "Lá quang hợp, tạo thức ăn cho cây và thải khí ô-xi."],
        ["Hoa của cây có chức năng gì?", "Sinh sản để tạo quả và hạt", "Hút nước từ đất", "Vận chuyển chất dinh dưỡng", "Hoa là cơ quan sinh sản của cây có hoa."],
        ["Vì sao cần tưới nước, bón phân cho cây trồng?", "Để cây đủ nước, đủ dinh dưỡng mà sinh trưởng tốt", "Để cây nhanh héo úa", "Không cần thiết chút nào", "Chăm sóc đúng cách giúp cây lớn nhanh, khoẻ mạnh."],
        ["Bộ phận nào giúp cá hô hấp dưới nước?", "Mang cá", "Vây cá", "Đuôi cá", "Cá hô hấp bằng mang."],
        ["Bộ phận nào giúp chim bay được?", "Cánh và bộ lông nhẹ, xốp", "Mỏ chim", "Chân chim", "Cánh cùng bộ lông nhẹ giúp chim bay lên."],
        ["Sử dụng hợp lí thực vật và động vật nghĩa là gì?", "Khai thác vừa đủ, đồng thời bảo vệ và chăm sóc, gây trồng thêm", "Khai thác càng nhiều càng tốt", "Phá rừng, săn bắt tuỳ tiện", "Dùng hợp lí để tài nguyên không bị cạn kiệt."]
      ], [["Rễ", "Hút nước, muối khoáng"], ["Lá", "Quang hợp tạo chất dinh dưỡng"], ["Thân", "Vận chuyển và nâng đỡ"], ["Mang cá", "Giúp cá hô hấp"]], "Nối bộ phận với chức năng nhé!"),
      topic("tnxh3-suckhoe", "❤️", "Con người và sức khoẻ", "Bài 18–25 • Cơ quan tiêu hoá, tuần hoàn, thần kinh và cách chăm sóc", [
        ["Thức ăn đi qua các bộ phận nào theo đúng thứ tự?", "Miệng → thực quản → dạ dày → ruột", "Tim → mạch máu → não", "Não → tuỷ sống → dạ dày", "Đó là đường đi của thức ăn trong cơ quan tiêu hoá."],
        ["Dạ dày có nhiệm vụ gì trong tiêu hoá?", "Nhào trộn và nghiền nát thức ăn", "Bơm máu đi khắp cơ thể", "Điều khiển suy nghĩ", "Dạ dày co bóp, nhào trộn thức ăn với dịch vị."],
        ["Cơ quan nào bơm máu đi nuôi cơ thể?", "Tim", "Dạ dày", "Não", "Tim thuộc cơ quan tuần hoàn, bơm máu đi khắp cơ thể."],
        ["Máu lưu thông trong cơ thể nhờ hệ thống nào?", "Mạch máu", "Thực quản", "Dây thần kinh", "Máu chảy trong các mạch máu đến mọi cơ quan."],
        ["Cơ quan thần kinh gồm những bộ phận trung ương nào?", "Não và tuỷ sống", "Tim và mạch máu", "Dạ dày và ruột", "Não và tuỷ sống điều khiển hoạt động của cơ thể."],
        ["Việc nào chăm sóc tốt cơ quan tiêu hoá?", "Ăn chậm, nhai kĩ, ăn đúng bữa và đủ chất", "Ăn thật nhanh và hay bỏ bữa", "Chỉ ăn đồ cay nóng", "Ăn uống điều độ giúp bảo vệ cơ quan tiêu hoá."],
        ["Việc nào tốt cho tim và cơ quan tuần hoàn?", "Tập thể dục, vận động đều đặn", "Ngồi một chỗ cả ngày", "Thức khuya thường xuyên", "Vận động đều đặn giúp trái tim khoẻ mạnh."],
        ["Việc nào bảo vệ cơ quan thần kinh?", "Ngủ đủ giấc, học tập và nghỉ ngơi hợp lí", "Chơi điện tử thâu đêm", "Không bao giờ nghỉ ngơi", "Ngủ đủ giấc giúp não bộ tỉnh táo, học tốt."]
      ], [["Dạ dày", "Nhào trộn thức ăn"], ["Tim", "Bơm máu đi khắp cơ thể"], ["Não", "Điều khiển hoạt động"], ["Mạch máu", "Dẫn máu lưu thông"]], "Nối cơ quan với chức năng nhé!"),
      topic("tnxh3-traidat", "🌍", "Trái đất và bầu trời", "Bài 26–30 • Phương hướng, đới khí hậu, bề mặt Trái Đất, Mặt Trời – Trái Đất – Mặt Trăng", [
        ["Mặt Trời mọc ở phương nào?", "Phương Đông", "Phương Tây", "Phương Bắc", "Mặt Trời mọc ở phương Đông và lặn ở phương Tây."],
        ["Mặt Trời lặn ở phương nào?", "Phương Tây", "Phương Đông", "Phương Nam", "Chiều tối, Mặt Trời lặn ở phương Tây."],
        ["Dụng cụ nào dùng để xác định phương hướng?", "La bàn", "Nhiệt kế", "Thước kẻ", "Kim la bàn giúp ta xác định các phương trong không gian."],
        ["Kim của la bàn luôn chỉ về phương nào?", "Phương Bắc", "Phương Đông", "Phương Tây", "Đầu kim la bàn luôn chỉ phương Bắc."],
        ["Đới khí hậu quanh xích đạo, nóng quanh năm, gọi là đới nào?", "Đới nóng (nhiệt đới)", "Đới lạnh (hàn đới)", "Đới ôn hoà", "Khu vực gần xích đạo thuộc đới nóng."],
        ["Đới khí hậu nào rất lạnh, có băng tuyết quanh năm?", "Đới lạnh (hàn đới)", "Đới nóng", "Đới ôn hoà", "Gần hai cực của Trái Đất là đới lạnh."],
        ["Việt Nam nằm trong đới khí hậu nào?", "Đới nóng (nhiệt đới)", "Đới lạnh", "Đới ôn hoà lạnh", "Việt Nam thuộc đới nóng, khí hậu nhiệt đới gió mùa."],
        ["Phần lớn bề mặt Trái Đất là gì?", "Đại dương (phần nước)", "Lục địa (phần đất)", "Băng tuyết", "Đại dương chiếm phần lớn bề mặt Trái Đất."],
        ["Các khối đất lớn nổi trên bề mặt Trái Đất gọi là gì?", "Lục địa (châu lục)", "Đại dương", "Hồ nước", "Phần đất nổi lớn gọi là lục địa hay châu lục."],
        ["Vì sao trên Trái Đất có ngày và đêm?", "Vì Trái Đất tự quay quanh trục của nó", "Vì Mặt Trăng che khuất Mặt Trời", "Vì Mặt Trời quay quanh Trái Đất", "Phần Trái Đất hướng về Mặt Trời là ban ngày, phần còn lại là ban đêm."],
        ["Mặt Trăng quay quanh hành tinh nào?", "Trái Đất", "Mặt Trời", "Sao Hoả", "Mặt Trăng là vệ tinh tự nhiên của Trái Đất."],
        ["Trái Đất quay quanh vật thể nào?", "Mặt Trời", "Mặt Trăng", "Sao Bắc Cực", "Trái Đất quay quanh Mặt Trời, một vòng hết một năm."]
      ], [["Mặt Trời mọc", "Phương Đông"], ["La bàn", "Xác định phương hướng"], ["Đới nóng", "Quanh xích đạo"], ["Đại dương", "Chiếm phần lớn bề mặt Trái Đất"]], "Nối cho đúng nhé!")
    ];

    var DAODUC3_TOPICS = [
      topic("dd3-toquoc", "🇻🇳", "Em yêu Tổ quốc Việt Nam", "Bài 1–2 • Chào cờ, hát Quốc ca, tự hào về đất nước", [
        ["Khi chào cờ, em cần có thái độ thế nào?", "Đứng nghiêm trang, mắt hướng về Quốc kì", "Nói chuyện riêng với bạn bên cạnh", "Đùa nghịch trong hàng", "Chào cờ là nghi lễ trang nghiêm thể hiện lòng yêu nước."],
        ["Quốc kì của Việt Nam có đặc điểm gì?", "Nền đỏ, ngôi sao vàng năm cánh ở giữa", "Nền xanh, ngôi sao trắng", "Nền vàng, ngôi sao đỏ", "Lá cờ đỏ sao vàng là biểu tượng thiêng liêng của Tổ quốc."],
        ["Khi hát Quốc ca, em nên hát thế nào?", "Hát to, rõ ràng, nghiêm túc và đầy tự hào", "Hát thì thầm cho qua", "Không cần hát theo", "Quốc ca là bài hát thiêng liêng của dân tộc Việt Nam."],
        ["Việc nào thể hiện em tự hào về Tổ quốc Việt Nam?", "Tìm hiểu lịch sử và danh lam thắng cảnh của đất nước", "Chê bai quê hương của mình", "Không quan tâm đến đất nước", "Yêu quý và tự hào về Tổ quốc là tình cảm đáng trân trọng."],
        ["Thấy bạn vẽ bậy lên hình lá cờ Tổ quốc, em nên làm gì?", "Nhắc bạn dừng lại và biết giữ gìn Quốc kì", "Vẽ cùng bạn cho vui", "Mặc kệ không nói gì", "Quốc kì là biểu tượng thiêng liêng, cần được tôn trọng."]
      ], [["Chào cờ", "Đứng nghiêm trang"], ["Quốc kì", "Đỏ tươi, sao vàng năm cánh"], ["Quốc ca", "Hát nghiêm túc, tự hào"], ["Danh lam thắng cảnh", "Niềm tự hào Việt Nam"]], "Nối cho đúng nhé!"),
      topic("dd3-hangxom", "🏡", "Quan tâm hàng xóm láng giềng", "Bài 3 • Tình làng nghĩa xóm", [
        ["Hàng xóm láng giềng là những người thế nào?", "Sống gần nhà em, gần gũi và thân thiết", "Người ở rất xa, không quen biết", "Chỉ là người bán hàng ngoài chợ", "Câu tục ngữ nói: “Bán anh em xa, mua láng giềng gần”."],
        ["Nhà hàng xóm có người bị ốm, gia đình em nên làm gì?", "Sang thăm hỏi và giúp đỡ khi cần", "Mặc kệ không quan tâm", "Làm ồn để chọc tức", "Thăm hỏi, giúp đỡ là tình làng nghĩa xóm."],
        ["Chơi đùa gần nhà hàng xóm, em cần chú ý điều gì?", "Không làm ồn, không làm phiền giờ nghỉ của hàng xóm", "Hét thật to cho vui", "Ném đồ sang sân nhà bên cạnh", "Tôn trọng không gian và giờ giấc của hàng xóm."],
        ["Em nhặt được món đồ chơi của em bé nhà hàng xóm đánh rơi. Em nên làm gì?", "Mang trả lại cho em bé", "Cất đi chơi một mình", "Vứt vào thùng rác", "Trả lại đồ cho hàng xóm là việc làm đúng."],
        ["Hàng xóm gặp khó khăn đột xuất, thái độ đúng của gia đình em là?", "Chia sẻ, giúp đỡ trong khả năng của mình", "Đóng cửa không tiếp", "Mang chuyện đi kể khắp nơi", "Giúp đỡ hàng xóm khi hoạn nạn là truyền thống tốt đẹp."]
      ], [["Hàng xóm", "Láng giềng ở gần nhà"], ["Có người ốm", "Thăm hỏi, giúp đỡ"], ["Đồ của hàng xóm rơi", "Mang trả lại"], ["Làm ồn ào", "Làm phiền hàng xóm (không nên)"]], "Nối tình huống với việc nên làm nhé!"),
      topic("dd3-hamhoc", "🔎", "Ham học hỏi", "Bài 4 • Thích tìm hiểu, hay đặt câu hỏi", [
        ["“Ham học hỏi” nghĩa là thế nào?", "Thích tìm hiểu điều mới, hay đặt câu hỏi để hiểu rõ", "Chỉ học khi bị người lớn ép buộc", "Học thuộc lòng mà không cần hiểu", "Ham học hỏi giúp em thêm hiểu biết mỗi ngày."],
        ["Gặp bài khó chưa hiểu, em nên làm gì?", "Hỏi thầy cô, bạn bè hoặc tự tìm hiểu thêm", "Bỏ qua luôn, không cần hiểu", "Chép bài của bạn mà không hiểu gì", "Dám hỏi và tìm hiểu là cách học tích cực."],
        ["Việc nào cho thấy em là người ham học hỏi?", "Đọc sách, quan sát xung quanh và hay hỏi “vì sao?”", "Chỉ chơi, không chịu học", "Giấu dốt, sợ bị hỏi", "Đặt câu hỏi là cách học hỏi hiệu quả."],
        ["Nghe giảng mà chưa hiểu, em nên làm gì?", "Giơ tay xin thầy cô giảng lại", "Ngồi im lặng cho qua", "Quay sang nói chuyện với bạn", "Mạnh dạn hỏi lại thể hiện ham học."]
      ], [["Chưa hiểu bài", "Hỏi thầy cô, bạn bè"], ["Đọc sách", "Mở rộng hiểu biết"], ["Hay hỏi vì sao", "Ham học hỏi"], ["Giấu dốt, sợ hỏi", "Không nên"]], "Nối cho đúng nhé!"),
      topic("dd3-loihua", "🤝", "Giữ lời hứa", "Bài 5 • Đã hứa là cố gắng thực hiện", [
        ["Giữ lời hứa nghĩa là gì?", "Đã hứa điều gì thì cố gắng thực hiện đúng như vậy", "Hứa cho vui rồi quên đi", "Chỉ giữ lời hứa khi có lợi cho mình", "Người giữ lời hứa được mọi người tin yêu."],
        ["Em đã hứa giúp bạn ôn bài nhưng hôm đó em rất muốn đi chơi. Em nên làm gì?", "Vẫn giúp bạn như đã hứa, đi chơi sau", "Bỏ bạn để đi chơi luôn", "Nói dối rằng em bị ốm", "Đã hứa thì phải giữ lời."],
        ["Trước khi hứa một điều gì, em cần làm gì?", "Suy nghĩ xem mình có thực hiện được không", "Hứa đại cho xong chuyện", "Hứa thật nhiều việc cùng một lúc", "Chỉ nên hứa những điều mình làm được."],
        ["Nếu lỡ không giữ được lời hứa, em nên làm gì?", "Xin lỗi và giải thích thật lòng với người đó", "Trốn tránh, im lặng", "Đổ lỗi cho người khác", "Biết nhận lỗi khi không giữ được lời hứa."]
      ], [["Đã hứa", "Cố gắng thực hiện"], ["Hứa cho vui rồi quên", "Không giữ lời hứa"], ["Không giữ được hứa", "Xin lỗi, giải thích thật lòng"], ["Giữ lời hứa", "Được mọi người tin yêu"]], "Nối cho đúng nhé!"),
      topic("dd3-nhiemvu", "✅", "Tích cực hoàn thành nhiệm vụ", "Bài 6 • Chủ động, làm việc đến nơi đến chốn", [
        ["Được cô giáo giao nhiệm vụ trực nhật lớp, em nên làm thế nào?", "Làm đầy đủ, cẩn thận đến nơi đến chốn", "Làm qua loa cho xong chuyện", "Đùn đẩy hết cho bạn khác", "Tích cực hoàn thành nhiệm vụ được giao."],
        ["Trong hoạt động nhóm, phần việc được phân công, em nên làm thế nào?", "Chủ động hoàn thành tốt phần việc của mình", "Chờ bạn làm hộ", "Làm thật chậm để nhóm phải chờ", "Mỗi thành viên hoàn thành tốt phần việc thì nhóm mới thành công."],
        ["Việc nào thể hiện em tích cực hoàn thành nhiệm vụ?", "Chuẩn bị bài và đồ dùng đầy đủ trước khi đến lớp", "Đến lớp mới vội vàng làm bài", "Quên luôn nhiệm vụ được giao", "Chủ động và đúng hạn là biểu hiện của tích cực."],
        ["Gặp khó khăn khi thực hiện nhiệm vụ, em nên làm gì?", "Tìm cách khắc phục hoặc nhờ hỗ trợ, không bỏ dở", "Bỏ cuộc ngay lập tức", "Giấu đi và không làm nữa", "Kiên trì tìm cách hoàn thành nhiệm vụ."]
      ], [["Trực nhật lớp", "Làm cẩn thận, đầy đủ"], ["Việc của nhóm", "Hoàn thành phần của mình"], ["Gặp khó khăn", "Tìm cách khắc phục"], ["Bỏ dở giữa chừng", "Không nên"]], "Nối cho đúng nhé!"),
      topic("dd3-khampha", "🪞", "Khám phá bản thân", "Bài 7 • Điểm mạnh, điểm yếu và sở thích của em", [
        ["Khám phá bản thân là tìm hiểu điều gì?", "Điểm mạnh, điểm yếu và sở thích của chính mình", "Bí mật của bạn bè", "Đồ đạc trong nhà người khác", "Hiểu rõ mình để phát huy điểm mạnh và sửa điểm yếu."],
        ["Em nhận ra mình vẽ rất đẹp. Đó là em khám phá được gì?", "Điểm mạnh của bản thân", "Điểm yếu của bản thân", "Việc của người khác", "Nhận ra năng khiếu của mình là khám phá bản thân."],
        ["Biết mình còn hay quên đồ dùng học tập, em nên làm gì?", "Rèn thói quen soạn cặp sách từ tối hôm trước", "Mặc kệ, quên tiếp cũng được", "Đổ lỗi cho bố mẹ", "Nhận ra điểm yếu là bước đầu để khắc phục."],
        ["Bạn góp ý rằng em hát chưa hay. Em nên có thái độ thế nào?", "Bình tĩnh lắng nghe, luyện tập thêm nếu em yêu thích", "Giận dữ cãi lại ngay", "Khóc và bỏ cuộc", "Lắng nghe góp ý chân thành giúp em tiến bộ."]
      ], [["Vẽ đẹp, hát hay", "Điểm mạnh của em"], ["Hay quên đồ dùng", "Điểm cần rèn luyện"], ["Hiểu rõ chính mình", "Khám phá bản thân"], ["Điều em thích làm", "Sở thích của em"]], "Nối cho đúng nhé!"),
      topic("dd3-bathoa", "🕊️", "Xử lí bất hoà với bạn bè", "Bài 8 • Bình tĩnh, lắng nghe, xin lỗi, hoà giải", [
        ["Khi xảy ra bất hoà với bạn, việc đầu tiên em nên làm là gì?", "Bình tĩnh lại và lắng nghe bạn nói", "Đánh bạn ngay cho hả giận", "La hét thật to", "Bình tĩnh lắng nghe là bước đầu để hoà giải."],
        ["Hai bạn cùng muốn chơi một món đồ chơi, cách giải quyết tốt nhất là gì?", "Thương lượng: chơi luân phiên hoặc chơi cùng nhau", "Giật lấy về phía mình", "Vứt món đồ chơi đi", "Thương lượng giúp cả hai bạn cùng vui."],
        ["Nếu em là người có lỗi khiến bạn giận, em nên làm gì?", "Xin lỗi bạn một cách chân thành", "Im lặng giả vờ như không có chuyện gì", "Đổ lỗi ngược lại cho bạn", "Biết xin lỗi giúp hàn gắn tình bạn."],
        ["Việc nào KHÔNG nên làm khi bất hoà với bạn?", "Nói xấu và rủ bạn khác tẩy chay bạn ấy", "Nói chuyện hoà giải", "Nhờ thầy cô giúp đỡ", "Nói xấu, tẩy chay chỉ làm bất hoà thêm trầm trọng."],
        ["Khi hai bạn không tự hoà giải được, em nên nhờ ai giúp đỡ?", "Thầy cô giáo hoặc người lớn", "Không nhờ ai, cứ giận nhau mãi", "Một bạn ở lớp khác xa lạ", "Người lớn giúp hai bên hiểu nhau và làm hoà."]
      ], [["Xảy ra bất hoà", "Bình tĩnh, lắng nghe"], ["Có lỗi với bạn", "Xin lỗi chân thành"], ["Cùng muốn một món đồ chơi", "Chơi luân phiên"], ["Không tự hoà giải được", "Nhờ thầy cô giúp đỡ"]], "Nối tình huống với cách xử lí nhé!"),
      topic("dd3-atgt", "🚦", "An toàn giao thông", "Bài 9–10 • Đi bộ an toàn, an toàn khi đi các phương tiện", [
        ["Khi đi bộ, em cần đi ở đâu cho an toàn?", "Trên vỉa hè hoặc sát lề đường phía bên phải", "Giữa lòng đường", "Sát làn xe đang chạy nhanh", "Người đi bộ đi trên vỉa hè, sát lề đường."],
        ["Muốn sang đường an toàn, em cần làm gì?", "Sang ở vạch kẻ đường, quan sát kĩ hai phía", "Chạy thật nhanh qua đường", "Sang ở bất cứ chỗ nào tiện nhất", "Quan sát và sang đường đúng nơi quy định."],
        ["Đèn tín hiệu giao thông chuyển sang màu đỏ, người đi bộ phải làm gì?", "Dừng lại, chờ đèn xanh mới đi", "Cứ đi vì mình là người đi bộ", "Chạy thật nhanh qua", "Đèn đỏ phải dừng lại, đèn xanh mới được đi."],
        ["Đi xe đạp, em cần chú ý điều gì để an toàn?", "Đội mũ bảo hiểm, đi đúng phần đường, không đùa nghịch", "Đi hàng ba và buông cả hai tay", "Chở ba người trên một xe", "Tuân thủ quy định giúp em an toàn khi đi xe đạp."],
        ["Ngồi trên ô tô, em cần làm gì để an toàn?", "Thắt dây an toàn, ngồi yên, không thò đầu tay ra ngoài", "Thò đầu ra cửa sổ ngắm cảnh", "Đứng lên nhảy trên ghế xe", "Thắt dây an toàn giúp bảo vệ em khi xe phanh gấp."],
        ["Ngồi sau xe máy của bố mẹ, em bắt buộc phải làm việc gì?", "Đội mũ bảo hiểm và cài quai đúng cách", "Cầm ô che nắng cho bố mẹ", "Ngồi xoay ngược về phía sau", "Trẻ em đi xe máy phải đội mũ bảo hiểm."],
        ["Nơi nào nguy hiểm, em tuyệt đối không được chơi đùa?", "Dưới lòng đường và gần đường ray tàu hoả", "Trong sân trường", "Trong công viên có người lớn trông", "Không chơi ở nơi có xe cộ và tàu hoả qua lại."]
      ], [["Đèn đỏ", "Dừng lại chờ"], ["Vạch kẻ đường", "Nơi dành để sang đường"], ["Đi xe máy", "Đội mũ bảo hiểm"], ["Đi ô tô", "Thắt dây an toàn"]], "Nối cho đúng nhé!")
    ];
    /* ---------- TIN HỌC 3 ---------- */
    var TIN3_TOPICS = [
      topic("tin3-may", "🖥️", "Máy tính và em", "Bài 1–5 • Thông tin và quyết định, bộ phận máy tính, bàn phím", [
        ["Thông tin là gì?", "Những hiểu biết của em về sự vật, sự việc xung quanh", "Chỉ là các con số", "Chỉ là các hình ảnh", "Thông tin giúp em hiểu biết và quyết định đúng."],
        ["Xem dự báo thấy ngày mai có mưa nên em mang theo áo mưa. Đó là ví dụ về điều gì?", "Dùng thông tin để đưa ra quyết định", "Máy tính tự quyết định thay em", "Lưu trữ thông tin trong máy", "Thông tin giúp em quyết định mang áo mưa."],
        ["Máy tính xử lí thông tin như thế nào?", "Theo chương trình do con người tạo ra", "Tự suy nghĩ như con người", "Ngẫu nhiên, không theo quy tắc nào", "Máy tính làm việc theo chương trình."],
        ["Bộ phận nào của máy tính dùng để hiển thị chữ và hình ảnh?", "Màn hình", "Bàn phím", "Chuột máy tính", "Màn hình là thiết bị đưa thông tin ra."],
        ["Bộ phận nào dùng để gõ chữ vào máy tính?", "Bàn phím", "Màn hình", "Loa", "Bàn phím là thiết bị đưa thông tin vào máy tính."],
        ["Bộ phận quan trọng nằm trong thân máy, được coi là “bộ não” của máy tính, tên là gì?", "Bộ xử lí", "Màn hình", "Phím cách", "Bộ xử lí điều khiển mọi hoạt động của máy tính."],
        ["Phím dài nhất trên bàn phím, dùng để tạo khoảng trắng giữa các từ, là phím nào?", "Phím cách (Space)", "Phím Enter", "Phím xoá (Backspace)", "Phím cách là phím dài nhất ở hàng dưới cùng của bàn phím."],
        ["Phím Enter thường dùng để làm gì?", "Xuống dòng hoặc thực hiện một lệnh", "Xoá chữ vừa gõ", "Tắt máy tính ngay", "Enter dùng để xuống dòng hoặc xác nhận lệnh."],
        ["Tư thế ngồi làm việc với máy tính đúng là thế nào?", "Lưng thẳng, mắt cách màn hình một khoảng vừa phải", "Nằm dài người ra bàn", "Ngồi sát dí vào màn hình", "Tư thế đúng giúp bảo vệ mắt và cột sống."]
      ], [["Màn hình", "Hiển thị thông tin"], ["Bàn phím", "Gõ chữ vào máy tính"], ["Chuột", "Điều khiển con trỏ"], ["Bộ xử lí", "“Bộ não” của máy tính"]], "Nối bộ phận với chức năng nhé!"),
      topic("tin3-internet", "🌐", "Mạng máy tính và Internet", "Bài 6 • Khám phá thông tin trên Internet", [
        ["Internet là gì?", "Mạng máy tính khổng lồ kết nối các máy tính trên toàn thế giới", "Một trò chơi điện tử", "Một chiếc máy tính thật to", "Internet kết nối máy tính khắp thế giới để chia sẻ thông tin."],
        ["Trên Internet, em có thể tìm được những gì phục vụ học tập?", "Bài học, hình ảnh và video học tập", "Chỉ có trò chơi giải trí", "Không có thông tin gì hữu ích", "Internet là kho thông tin khổng lồ cho học tập."],
        ["Mọi thông tin trên Internet có phải lúc nào cũng đúng không?", "Không, em cần chọn lọc và hỏi người lớn khi chưa rõ", "Luôn luôn đúng tuyệt đối", "Luôn luôn sai", "Cần biết chọn lọc thông tin trên Internet."],
        ["Một trang web lạ yêu cầu em nhập họ tên và địa chỉ nhà. Em nên làm gì?", "Không nhập và báo cho bố mẹ hoặc thầy cô", "Nhập ngay cho nhanh", "Gửi đường link cho nhiều bạn cùng nhập", "Cẩn thận với yêu cầu cung cấp thông tin cá nhân."],
        ["Muốn tìm thông tin trên Internet, em thường gõ từ khoá cần tìm vào đâu?", "Ô tìm kiếm của trang tìm kiếm", "Bất cứ ô trống nào trên màn hình", "Trong cửa sổ trò chơi", "Dùng công cụ tìm kiếm với từ khoá phù hợp."]
      ], [["Internet", "Mạng máy tính toàn thế giới"], ["Trang web", "Nơi chứa thông tin trên Internet"], ["Từ khoá tìm kiếm", "Giúp tìm đúng thông tin cần"], ["Thông tin lạ, chưa rõ", "Hỏi bố mẹ, thầy cô"]], "Nối cho đúng nhé!"),
      topic("tin3-luutru", "🗂️", "Lưu trữ và tìm kiếm thông tin", "Bài 7–9 • Sắp xếp để dễ tìm, sơ đồ hình cây, tệp và thư mục", [
        ["Vì sao cần sắp xếp sách vở, tài liệu ngăn nắp theo nhóm?", "Để dễ tìm khi cần dùng", "Để trông cho vui mắt", "Để khó tìm hơn", "Sắp xếp khoa học giúp tìm kiếm nhanh, tiết kiệm thời gian."],
        ["Sơ đồ hình cây được dùng để làm gì?", "Tổ chức thông tin theo từng mức, từ chung đến riêng", "Vẽ cây để trang trí lớp học", "Đếm số lá trên cây", "Sơ đồ hình cây cho thấy cách phân loại và tổ chức thông tin."],
        ["Trong máy tính, “thư mục” (folder) dùng để làm gì?", "Chứa và tổ chức các tệp", "Gõ chữ vào máy tính", "Hiển thị hình ảnh", "Thư mục giúp sắp xếp các tệp cho dễ tìm."],
        ["“Tệp” trong máy tính là gì?", "Một tài liệu, bài làm được lưu lại trong máy tính", "Một phím trên bàn phím", "Một loại chuột máy tính", "Mỗi bài vẽ, bài viết của em được lưu thành một tệp."],
        ["Đặt tên tệp như thế nào là tốt?", "Tên ngắn gọn, dễ hiểu, gợi nhớ nội dung của tệp", "Đặt toàn các số 12345", "Không cần đặt tên", "Tên tệp rõ ràng giúp em tìm lại tệp dễ dàng."],
        ["Muốn tìm lại bài vẽ đã lưu từ tuần trước, cách nào tốt nhất?", "Mở đúng thư mục đã lưu và tìm theo tên tệp", "Tìm ngẫu nhiên khắp máy tính", "Vẽ lại một bài mới từ đầu", "Lưu trữ có tổ chức giúp tìm kiếm nhanh và chính xác."]
      ], [["Thư mục", "Chứa và tổ chức các tệp"], ["Tệp", "Tài liệu được lưu trong máy"], ["Sơ đồ hình cây", "Tổ chức thông tin theo mức"], ["Tên tệp rõ ràng", "Giúp dễ tìm lại"]], "Nối cho đúng nhé!"),
      topic("tin3-baove", "🛡️", "Bảo vệ thông tin khi dùng máy tính", "Bài 10 • Thông tin cá nhân, mật khẩu, người lạ trên mạng", [
        ["Thông tin nào của em KHÔNG nên chia sẻ cho người lạ trên mạng?", "Họ tên đầy đủ, địa chỉ nhà, trường học và mật khẩu", "Màu sắc em yêu thích", "Món ăn em thích", "Thông tin cá nhân cần được bảo vệ cẩn thận."],
        ["Mật khẩu tài khoản của em, em nên xử lí thế nào?", "Giữ bí mật, không chia sẻ cho người khác", "Cho bạn thân dùng chung thoải mái", "Đăng công khai lên mạng xã hội", "Mật khẩu là “chìa khoá” riêng của em."],
        ["Người lạ trên mạng rủ em ra ngoài gặp mặt. Em nên làm gì?", "Từ chối và báo ngay cho bố mẹ biết", "Đồng ý đi một mình", "Giữ bí mật, không nói với bố mẹ", "Không gặp người lạ trên mạng khi không có người lớn đi cùng."],
        ["Em nhận được tin nhắn lạ chứa đường link đáng ngờ. Em nên làm gì?", "Không bấm vào và hỏi ý kiến người lớn", "Bấm vào xem ngay cho biết", "Chuyển tiếp cho thật nhiều bạn", "Đường link lạ có thể chứa mã độc hoặc lừa đảo."],
        ["Dùng xong máy tính ở trường hoặc nơi công cộng, em nên làm gì?", "Đăng xuất khỏi tài khoản của mình", "Để nguyên tài khoản đang đăng nhập", "Cho bạn khác dùng chung tài khoản", "Đăng xuất giúp bảo vệ thông tin cá nhân của em."]
      ], [["Mật khẩu", "Giữ bí mật"], ["Người lạ trên mạng", "Không gặp, báo cho bố mẹ"], ["Đường link lạ", "Không bấm vào"], ["Thông tin cá nhân", "Không chia sẻ bừa bãi"]], "Nối tình huống với việc nên làm nhé!"),
      topic("tin3-trinhchieu", "🎞️", "Bài trình chiếu và luyện chuột", "Bài 11–13 • Trang chiếu, thao tác nháy chuột, kéo thả", [
        ["Bài trình chiếu được dùng để làm gì?", "Trình bày thông tin bằng các trang chiếu có chữ và hình ảnh", "Chơi trò chơi điện tử", "Nghe nhạc giải trí", "Trình chiếu giúp em trình bày bài trước lớp sinh động hơn."],
        ["Mỗi trang trong một bài trình chiếu được gọi là gì?", "Trang chiếu (slide)", "Thư mục", "Tệp nhạc", "Một bài trình chiếu gồm nhiều trang chiếu."],
        ["Thao tác “nháy đúp chuột” là gì?", "Bấm nhanh nút trái chuột hai lần liên tiếp", "Bấm giữ chuột thật lâu", "Lăn bánh xe ở giữa chuột", "Nháy đúp chuột thường dùng để mở thư mục hoặc tệp."],
        ["Thao tác “kéo thả” chuột là gì?", "Giữ nút chuột, di chuyển rồi thả ra ở vị trí mới", "Bấm chuột đúng một lần", "Tắt chuột đi", "Kéo thả dùng để di chuyển đối tượng trên màn hình."],
        ["Con trỏ chuột trên màn hình di chuyển theo điều gì?", "Theo sự di chuyển của chuột trên mặt bàn di chuột", "Tự chạy ngẫu nhiên trên màn hình", "Theo các phím mũi tên mà thôi", "Em di chuyển chuột thì con trỏ chuột di chuyển theo."],
        ["Thao tác bấm một lần nút trái chuột được gọi là gì?", "Nháy chuột (click)", "Kéo thả chuột", "Nháy đúp chuột", "Nháy chuột dùng để chọn một đối tượng."]
      ], [["Trang chiếu", "Một trang của bài trình chiếu"], ["Nháy đúp chuột", "Bấm trái chuột 2 lần nhanh"], ["Kéo thả chuột", "Di chuyển đối tượng"], ["Con trỏ chuột", "Di chuyển theo chuột"]], "Nối thao tác với ý nghĩa nhé!"),
      topic("tin3-giaiquyet", "🧩", "Giải quyết vấn đề với máy tính", "Bài 14–16 • Các bước thực hiện công việc, công việc theo điều kiện", [
        ["Để thực hiện tốt một công việc, em nên làm gì trước tiên?", "Xác định các bước và sắp xếp chúng theo thứ tự hợp lí", "Làm bừa, không theo bước nào", "Làm bước cuối cùng trước", "Công việc cần được chia thành các bước rõ ràng, theo thứ tự."],
        ["Câu “Nếu trời mưa thì em mang áo mưa” thể hiện điều gì?", "Một công việc được thực hiện theo điều kiện: nếu… thì…", "Một câu trong bài hát", "Một phép tính cộng", "Cấu trúc “nếu… thì…” diễn tả công việc theo điều kiện."],
        ["Máy tính giúp em giải quyết vấn đề bằng cách nào?", "Thực hiện nhanh và chính xác các bước theo chương trình", "Tự quyết định thay em mọi việc", "Không giúp được việc gì", "Máy tính là công cụ trợ giúp đắc lực cho con người."],
        ["Khi làm một bài trình chiếu, bước nào cần làm trước?", "Xác định chủ đề và chuẩn bị nội dung", "Đứng trình bày trước lớp luôn", "In bài ra giấy ngay", "Chuẩn bị nội dung là bước đầu tiên khi làm bài trình chiếu."],
        ["Trong câu “Nếu làm xong bài tập thì em được đi chơi”, nếu em CHƯA làm xong bài tập thì sao?", "Chưa được đi chơi, vì điều kiện chưa xảy ra", "Vẫn đi chơi như thường", "Được đi chơi gấp đôi", "Điều kiện không xảy ra thì việc sau “thì” không được thực hiện."]
      ], [["Nếu… thì…", "Công việc theo điều kiện"], ["Chia nhỏ công việc", "Thành các bước rõ ràng"], ["Máy tính", "Trợ giúp giải quyết vấn đề"], ["Thứ tự các bước", "Thực hiện đúng trình tự"]], "Nối cho đúng nhé!")
    ];
    /* Thêm mini-game riêng cho Tin học: bắt phím rơi + sắp xếp các bước */
    TIN3_TOPICS[0].pools.games.push(function () {
      var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var L = letters.charAt(rand(0, 25));
      var others = shuffle(letters.split("").filter(function (x) { return x !== L; })).slice(0, 3);
      var items = shuffle([L].concat(others));
      return catchQ("Bắt phím! Chạm vào phím “" + L + "” trên bàn phím nhé!", items.map(function (ch) { return { html: '<span class="opt-word">' + ch + "</span>", ok: ch === L }; }));
    });
    TIN3_TOPICS[5].pools.games.push(function () {
      return sortQ("Sắp xếp các bước pha một cốc nước chanh theo đúng thứ tự!", ["Rót nước vào cốc", "Cho nước cốt chanh và đường", "Khuấy đều cho tan", "Thưởng thức nước chanh"]);
    });
    /* ---------- CÔNG NGHỆ 3 ---------- */
    var CONGNGHE3_TOPICS = [
      topic("cn3-doisong", "💡", "Công nghệ và đời sống", "Bài 1–6 • Tự nhiên và công nghệ, đèn học, quạt điện, radio, ti vi, an toàn điện", [
        ["Vật nào sau đây là sản phẩm công nghệ?", "Cái quạt điện", "Cây xanh trước nhà", "Dòng sông", "Sản phẩm công nghệ do con người tạo ra để phục vụ đời sống."],
        ["Vật nào sau đây thuộc về tự nhiên?", "Cây cối, sông, núi", "Ti vi", "Đèn học", "Những thứ có sẵn trong thiên nhiên, không do con người chế tạo."],
        ["Sử dụng đèn học thế nào là đúng và tốt cho mắt?", "Đặt đèn phía tay không thuận, ánh sáng vừa đủ, tắt khi không dùng", "Để đèn sát vào mắt cho thật sáng", "Bật đèn cả ngày lẫn đêm", "Dùng đèn học đúng cách giúp bảo vệ mắt và tiết kiệm điện."],
        ["Sử dụng quạt điện thế nào là an toàn?", "Không thò tay vào lồng quạt khi quạt đang chạy", "Chạm tay vào cánh quạt đang quay", "Để quạt sát mặt nước", "Giữ khoảng cách an toàn khi quạt điện đang hoạt động."],
        ["Máy thu thanh (radio) được dùng để làm gì?", "Nghe tin tức, ca nhạc qua sóng phát thanh", "Xem hình ảnh chuyển động", "Nấu chín thức ăn", "Radio thu sóng phát thanh để nghe âm thanh."],
        ["Máy thu hình (ti vi) khác máy thu thanh (radio) ở điểm nào?", "Ti vi xem được cả hình ảnh và âm thanh", "Ti vi chỉ nghe được âm thanh", "Ti vi nhỏ hơn radio rất nhiều", "Ti vi trình chiếu hình ảnh kèm theo âm thanh."],
        ["Việc nào giúp tiết kiệm điện trong gia đình?", "Tắt đèn, quạt, ti vi khi không sử dụng", "Bật mọi thiết bị điện cả ngày", "Mở cửa tủ lạnh liên tục", "Tiết kiệm điện là bảo vệ môi trường và chi tiêu gia đình."],
        ["Khi tay đang ướt, em có được chạm vào ổ điện và công tắc không?", "Tuyệt đối không, rất dễ bị điện giật", "Được, không sao cả", "Chạm thật nhanh là được", "Tay ướt chạm vào điện cực kì nguy hiểm."],
        ["Thấy dây điện trong nhà bị hở, đứt, em nên làm gì?", "Báo ngay cho người lớn và tránh xa, không tự chạm vào", "Tự mình nối lại", "Cầm lên xem thử", "Việc về điện phải để người lớn xử lí."]
      ], [["Đèn học", "Chiếu sáng để học bài"], ["Quạt điện", "Làm mát"], ["Máy thu thanh (radio)", "Nghe phát thanh"], ["Máy thu hình (ti vi)", "Xem hình, nghe tiếng"]], "Nối thiết bị với công dụng nhé!"),
      topic("cn3-thucong", "✂️", "Thủ công kĩ thuật", "Bài 7–10 • Dụng cụ, vật liệu, làm đồ dùng học tập, biển báo, đồ chơi", [
        ["Dụng cụ nào dùng để cắt giấy khi làm thủ công?", "Kéo thủ công an toàn của học sinh", "Dao làm bếp của người lớn", "Kim khâu quần áo", "Học sinh dùng kéo thủ công đầu tù, an toàn."],
        ["Vật liệu nào thường dùng để làm đồ thủ công?", "Giấy màu, bìa, keo dán, bút màu", "Gạch và xi măng", "Sắt và thép", "Vật liệu thủ công nhẹ, dễ cắt và dán."],
        ["Khi sử dụng kéo cắt giấy, em cần chú ý điều gì?", "Cắt cẩn thận, không chĩa kéo về phía bạn", "Vung kéo đùa nghịch với bạn", "Cầm kéo chạy nhảy trong lớp", "An toàn là điều quan trọng nhất khi dùng dụng cụ thủ công."],
        ["Làm một đồ dùng học tập (như hộp đựng bút) thường theo thứ tự nào?", "Chuẩn bị vật liệu → cắt, gấp → dán và trang trí", "Trang trí trước rồi mới cắt giấy", "Làm tuỳ hứng, không cần theo bước", "Làm sản phẩm thủ công cần thực hiện theo các bước."],
        ["Biển báo giao thông hình tròn, viền đỏ thường là loại biển nào?", "Biển báo cấm", "Biển chỉ dẫn", "Biển báo hiệu lệnh", "Biển báo cấm có hình tròn, viền đỏ, nền trắng."],
        ["Biển báo giao thông hình tam giác, viền đỏ thường là loại biển nào?", "Biển cảnh báo nguy hiểm", "Biển báo cấm", "Biển chỉ dẫn địa điểm", "Biển tam giác viền đỏ cảnh báo nguy hiểm phía trước."],
        ["Biển báo có hình người đi bộ đi trên các vạch kẻ cho biết điều gì?", "Nơi dành cho người đi bộ sang đường", "Cấm người đi bộ qua lại", "Khu vực chơi bóng đá", "Biển chỉ dẫn vị trí sang đường cho người đi bộ."],
        ["Sau khi làm thủ công xong, em cần làm việc gì?", "Dọn dẹp, cất dụng cụ và thu gom giấy vụn", "Để nguyên mọi thứ bừa bãi", "Vứt hết dụng cụ đi", "Giữ gìn vệ sinh nơi làm việc sau khi làm thủ công."]
      ], [["Kéo thủ công", "Cắt giấy"], ["Keo dán", "Dán các bộ phận"], ["Biển tròn, viền đỏ", "Biển báo cấm"], ["Biển tam giác, viền đỏ", "Cảnh báo nguy hiểm"]], "Nối cho đúng nhé!")
    ];
    CONGNGHE3_TOPICS[1].pools.games.push(function () {
      return sortQ("Sắp xếp các bước làm một biển báo giao thông bằng giấy!", ["Chuẩn bị giấy, bìa, kéo, keo", "Vẽ và cắt hình biển báo", "Dán biển báo lên bìa cứng", "Tô màu và hoàn thiện"]);
    });
    /* ---------- ĐĂNG KÍ LỚP 3 ---------- */
    (function () {
      if (typeof GRADES === "undefined" || !GRADES || GRADES[3]) return;
      GRADES[3] = { label: "Lớp 3", subjects: [
        { id: "g3-math", emoji: "🔢", name: "Toán", desc: "14 chủ đề • Số đến 100 000 • Bảng nhân chia 2–9", cls: "c-coral", topics: MATH3_TOPICS },
        { id: "g3-tv", emoji: "📖", name: "Tiếng Việt", desc: "Chính tả • Từ ngữ • Câu và dấu câu • Đọc hiểu", cls: "c-pink", topics: TV3_TOPICS },
        { id: "g3-eng", emoji: "🔤", name: "Tiếng Anh", desc: "Global Success • Starter + 20 Unit", cls: "c-teal", topics: UNITS3.map(function (u) {
            if (u.n === 0) return { id: "g3-starter", emoji: "🌟", name: "Starter — Làm quen", sub: "Số 1–10 • Bảng chữ cái A–Z", pools: (function () { var p = eng3Pools(u); p.choose.push(g3CountWord, g3CountWord); return p; })() };
            return { id: "g3-u" + u.n, emoji: "📗", name: "Unit " + u.n + " — " + u.title, sub: u.words.map(function (w) { return w[0]; }).join(" • "), pools: eng3Pools(u) };
          }).concat([{ id: "g3-review", emoji: "🌈", name: "Ôn tập tất cả", sub: "Trộn từ của Starter và cả 20 Unit", pools: engPools(ALL_WORDS3) }]) },
        { id: "g3-tnxh", emoji: "🌍", name: "Tự nhiên & Xã hội", desc: "6 chủ đề • Gia đình, trường học, sức khoẻ, Trái Đất", cls: "c-leaf", topics: TNXH3_TOPICS },
        { id: "g3-dd", emoji: "💛", name: "Đạo đức", desc: "8 chủ đề • Tình huống ứng xử và an toàn giao thông", cls: "c-sun", topics: DAODUC3_TOPICS },
        { id: "g3-tin", emoji: "💻", name: "Tin học", desc: "6 chủ đề • Máy tính, Internet, tệp và thư mục", cls: "c-sky", topics: TIN3_TOPICS },
        { id: "g3-cn", emoji: "🛠️", name: "Công nghệ", desc: "Công nghệ và đời sống • Thủ công kĩ thuật", cls: "c-brown", topics: CONGNGHE3_TOPICS }
      ] };
      /* Vẽ lại các nút chọn lớp ở màn hình đăng nhập và màn hình chính để Lớp 3 sáng lên */
      function reloginTabs() {
        renderGradeTabs("login-grades", loginGrade, function (g) { loginGrade = g; reloginTabs(); }, function (g) { el("login-err").textContent = "Lớp " + g + " sắp ra mắt — hiện đã có Lớp 1, Lớp 2, Lớp 3 và Lớp 7 nhé!"; });
      }
      reloginTabs();
      if (typeof profile !== "undefined" && profile && profile.name && typeof renderSubjects === "function") { renderSubjects(); renderProfileBar(); }
    })();


/* ============================================================
   LỚP 3 — MỞ RỘNG NGÂN HÀNG CÂU HỎI + CHỐNG LẶP GIỮA CÁC LƯỢT
   - Mỗi chủ đề kiến thức được bổ sung thêm câu hỏi thật theo SGK,
     đạt tối thiểu 12 dữ kiện/chủ đề (nhân ra trắc nghiệm + điền
     trống + đúng/sai + bắt đồ vật = 40+ câu khác nhau).
   - Toán/Tiếng Anh được thêm bộ sinh biến thể mới.
   - Chống lặp: lưu các câu đã dùng gần đây vào localStorage theo
     từng chủ đề; lượt mới ưu tiên câu chưa dùng, trong 1 lượt
     không trùng câu; chỉ làm mới danh sách khi sắp dùng hết.
   - Nhãn "N+ câu hỏi" được cộng vào dòng mô tả của mỗi chủ đề.
   ============================================================ */
function qSig3(q) {
  if (!q) return "?";
  var s = (q.prompt || "") + "|";
  try {
    if (q.visual) s += String(q.visual).replace(/<[^>]+>/g, " ");
    if (q.pairs) s += q.pairs.map(function (p) { return (p.l || p.a || "") + "=" + (p.r || p.b || ""); }).join(";");
    if (q.items) s += q.items.map(function (it) { return it.html || ""; }).join(";");
    if (q.rounds) s += q.rounds.map(function (r) { return String(r.visual || "").replace(/<[^>]+>/g, " "); }).join(";");
  } catch (e) {}
  /* Bản điền trống của một dữ kiện dùng chung chữ ký với bản trắc nghiệm
     (bỏ phần "Đáp án: ?" hằng số) để một lượt không gặp lại cùng dữ kiện. */
  s = s.replace(/Đáp án:\s*\?/g, "");
  return s.replace(/\s+/g, " ").trim().slice(0, 140);
}

var G3_EXTRA_FACTS = {
  /* ---------- TIẾNG VIỆT 3 ---------- */
  "tv3-chinhta": [
    ["Từ nào viết đúng chính tả?", "trồng trọt", "chồng trọt", "trồng chọt", "Trồng trọt viết với tr."],
    ["Từ nào viết đúng chính tả?", "xanh xao", "sanh xao", "xanh sao", "Xanh xao viết với x."],
    ["Từ nào viết đúng chính tả?", "nghỉ ngơi", "ngĩ ngơi", "nghỉ ngoi", "Nghỉ ngơi viết ngh và dấu hỏi."],
    ["Từ nào viết đúng chính tả?", "gần gũi", "gần gủi", "ghần gũi", "Gần gũi viết g và dấu ngã."],
    ["Từ nào viết đúng chính tả?", "lung linh", "nung linh", "lung ninh", "Lung linh viết với l."]
  ],
  "tv3-tungu": [
    ["Từ đồng nghĩa với 'chăm chỉ' là:", "siêng năng", "lười biếng", "chậm chạp", "Chăm chỉ gần nghĩa với siêng năng."],
    ["Từ trái nghĩa với 'sạch sẽ' là:", "bẩn thỉu", "gọn gàng", "tươm tất", "Sạch sẽ trái nghĩa với bẩn thỉu."],
    ["Từ nào thuộc chủ đề 'Mái nhà yêu thương'?", "bữa cơm", "sóng biển", "máy bay", "Bữa cơm là hình ảnh gia đình đầm ấm."],
    ["Từ nào thuộc chủ đề 'Những sắc màu thiên nhiên'?", "cầu vồng", "bảng đen", "xe buýt", "Cầu vồng là vẻ đẹp của thiên nhiên."],
    ["Từ đồng nghĩa với 'vui vẻ' là:", "phấn khởi", "buồn bã", "lo lắng", "Vui vẻ gần nghĩa với phấn khởi."],
    ["Từ trái nghĩa với 'đoàn kết' là:", "chia rẽ", "gắn bó", "hoà thuận", "Đoàn kết trái nghĩa với chia rẽ."]
  ],
  "tv3-cau": [
    ["Dấu nào dùng để đánh dấu lời của nhân vật trong truyện?", "Dấu ngoặc kép", "Dấu hai chấm", "Dấu phẩy", "Lời nhân vật được đặt trong dấu ngoặc kép."],
    ["Câu 'Bạn hãy nhặt rác lên nhé!' thuộc kiểu câu nào?", "Câu khiến", "Câu kể", "Câu hỏi", "Câu khiến dùng để yêu cầu, đề nghị."],
    ["Để hỏi về mục đích, em dùng mẫu câu hỏi nào?", "Để làm gì?", "Ở đâu?", "Khi nào?", "Câu hỏi 'Để làm gì?' hỏi về mục đích."]
  ],
  "tv3-dochieu": [
    ["Vì sao Cóc dám lên kiện Trời?", "Vì hạn hán lâu ngày, muôn loài khổ sở", "Vì Cóc muốn đi chơi xa", "Vì Cóc giận các bạn", "Cóc kiện Trời để xin mưa cho muôn loài."],
    ["Hai Bà Trưng dựng cờ khởi nghĩa ở vùng nào?", "Hát Môn", "Thăng Long", "Hoa Lư", "Hai Bà Trưng phất cờ khởi nghĩa ở Hát Môn."],
    ["Bác sĩ Y-éc-xanh chọn sống và làm việc ở đâu tại Việt Nam?", "Nha Trang", "Hà Nội", "Đà Lạt", "Ông gắn bó với Nha Trang và viện Pasteur ở đó."]
  ],
  /* ---------- TỰ NHIÊN VÀ XÃ HỘI 3 ---------- */
  "tnxh3-giadinh": [
    ["Anh, chị, em của mẹ em được gọi là gì?", "Cậu, dì", "Bác, chú", "Ông, bà", "Anh chị em của mẹ gọi là cậu, dì."],
    ["Khi ngửi thấy mùi khét và khói trong nhà, việc đầu tiên em nên làm là:", "Báo ngay cho người lớn", "Lại gần xem cho rõ", "Giấu đi không nói", "Báo người lớn ngay để được giúp đỡ kịp thời."],
    ["Để giữ nhà cửa gọn gàng, sau khi chơi em nên:", "Cất đồ chơi vào đúng chỗ", "Để đồ chơi khắp sàn nhà", "Nhờ mẹ cất hộ mãi", "Cất đồ vào đúng chỗ giúp nhà gọn gàng."],
    ["Ngày giỗ trong gia đình là ngày để:", "Tưởng nhớ người đã khuất", "Đi chơi xa", "Mua sắm thật nhiều", "Ngày giỗ để con cháu tưởng nhớ tổ tiên, người đã mất."]
  ],
  "tnxh3-truonghoc": [
    ["Phòng nào ở trường dùng để đọc sách và mượn sách?", "Thư viện", "Phòng y tế", "Sân trường", "Thư viện là nơi đọc và mượn sách."],
    ["Thấy bạn ở lớp khác bị ngã ở sân trường, em nên:", "Đỡ bạn dậy và báo thầy cô", "Đứng nhìn cho vui", "Bỏ đi chơi tiếp", "Giúp bạn và báo thầy cô là việc làm tốt."],
    ["Để giữ vệ sinh trường lớp, em bỏ rác vào:", "Thùng rác", "Gầm bàn", "Giữa sân trường", "Bỏ rác đúng nơi quy định."],
    ["Khu vực nào ở trường em KHÔNG nên chạy nhảy đùa nghịch?", "Cầu thang", "Sân chơi", "Sân bóng", "Chạy nhảy ở cầu thang rất dễ bị ngã, nguy hiểm."],
    ["Hoạt động nào giúp trường em kết nối với cộng đồng?", "Quyên góp ủng hộ bạn khó khăn", "Vẽ bậy lên tường trường", "Xả rác ra cổng trường", "Quyên góp giúp đỡ là hoạt động gắn kết cộng đồng."],
    ["Sân trường, cây xanh của trường là tài sản của:", "Tất cả mọi người trong trường", "Riêng của em", "Không của ai cả", "Tài sản chung cần mọi người cùng giữ gìn."]
  ],
  "tnxh3-congdong": [
    ["Người dân trồng lúa, rau màu là hoạt động sản xuất nào?", "Nông nghiệp", "Công nghiệp", "Thủ công", "Trồng trọt, chăn nuôi thuộc nông nghiệp."],
    ["Đan lát, dệt vải bằng tay thuộc ngành sản xuất nào?", "Thủ công", "Công nghiệp", "Nông nghiệp", "Làm bằng tay khéo léo là sản xuất thủ công."],
    ["Nhà máy sản xuất giấy, đồ hộp thuộc ngành nào?", "Công nghiệp", "Nông nghiệp", "Thủ công", "Sản xuất bằng máy trong nhà máy là công nghiệp."],
    ["Di tích lịch sử ở địa phương cần được mọi người:", "Giữ gìn và bảo vệ", "Viết vẽ lên cho đẹp", "Bỏ mặc không quan tâm", "Di tích ghi dấu lịch sử nên cần được bảo vệ."],
    ["Cảnh quan thiên nhiên đẹp ở địa phương có tác dụng gì?", "Là nơi tham quan, nghỉ ngơi của mọi người", "Chỉ để khai thác hết tài nguyên", "Không có tác dụng gì", "Cảnh quan đẹp để tham quan và cần được giữ gìn."],
    ["Khi tham quan di tích, em nên:", "Giữ trật tự, không leo trèo lên hiện vật", "Chạm vào mọi hiện vật", "Hái hoa bẻ cành quanh di tích", "Tham quan văn minh, bảo vệ di tích."]
  ],
  "tnxh3-thucvat": [
    ["Hạt của cây có chức năng gì?", "Nảy mầm thành cây mới", "Hút nước nuôi cây", "Làm thức ăn cho lá", "Hạt chứa mầm sống, gieo xuống sẽ mọc cây mới."],
    ["Bộ phận nào giúp cây đứng vững và hút nước?", "Rễ cây", "Lá cây", "Hoa", "Rễ bám vào đất, hút nước và muối khoáng."],
    ["Chim dùng bộ phận nào để bay?", "Đôi cánh", "Cái mỏ", "Đôi chân", "Đôi cánh giúp chim bay lên trời."],
    ["Vì sao chúng ta nên trồng thêm cây xanh?", "Cây cho bóng mát và không khí trong lành", "Để có nhiều gỗ chặt", "Cho đỡ trống đất", "Cây xanh làm mát, làm sạch không khí và là nhà của nhiều loài."]
  ],
  "tnxh3-suckhoe": [
    ["Chất dinh dưỡng từ thức ăn đi vào cơ thể qua đâu?", "Thấm vào máu ở ruột non", "Quay lại miệng", "Đi ra ngoài ngay", "Chất dinh dưỡng thấm qua thành ruột non vào máu."],
    ["Khi chạy nhảy, tim đập nhanh hơn vì:", "Cơ thể cần nhiều máu và ô-xi hơn", "Tim bị yếu đi", "Cơ thể không cần máu nữa", "Vận động làm cơ thể cần nhiều ô-xi, tim đập nhanh để đưa máu đi nuôi cơ thể."],
    ["Việc nào tốt cho cơ quan thần kinh?", "Ngủ đủ giấc", "Thức khuya chơi điện tử", "Nghe tiếng ồn thật to", "Ngủ đủ giúp não nghỉ ngơi và ghi nhớ tốt."],
    ["Việc nào tốt cho hệ tiêu hoá?", "Đánh răng và ăn uống điều độ", "Ăn thật nhiều kẹo ngọt", "Uống nước ngọt thay nước lọc", "Vệ sinh răng miệng, ăn uống điều độ giúp tiêu hoá tốt."]
  ],
  /* ---------- TOÁN 3 (BƯỚC 1 — gia cố tầng nâng cao m3-giotien) ---------- */
  "m3-giotien": [
    ["Mẹ đưa tờ 50 000 đồng mua đồ hết 35 000 đồng. Người bán trả lại bao nhiêu tiền?", "15 000 đồng", "25 000 đồng", "5 000 đồng", "Tiền trả lại = 50 000 − 35 000 = 15 000 đồng."],
    ["Nam mua quyển vở 8 000 đồng và cây bút 5 000 đồng. Nam phải trả tất cả bao nhiêu tiền?", "13 000 đồng", "3 000 đồng", "40 000 đồng", "Tổng số tiền = 8 000 + 5 000 = 13 000 đồng."],
    ["Một tờ 100 000 đồng đổi được mấy tờ 10 000 đồng?", "10 tờ", "5 tờ", "100 tờ", "100 000 : 10 000 = 10 tờ."],
    ["Tờ tiền Việt Nam đang lưu hành có mệnh giá lớn nhất là tờ nào?", "500 000 đồng", "100 000 đồng", "200 000 đồng", "Tờ 500 000 đồng là mệnh giá lớn nhất đang lưu hành."],
    ["Tháng 12 có bao nhiêu ngày?", "31 ngày", "30 ngày", "28 ngày", "Tháng 12 thuộc nhóm tháng có 31 ngày: 1, 3, 5, 7, 8, 10, 12."],
    ["Tháng 9 có bao nhiêu ngày?", "30 ngày", "31 ngày", "28 ngày", "Các tháng 4, 6, 9, 11 có 30 ngày."],
    ["Một tuần lễ có bao nhiêu ngày?", "7 ngày", "5 ngày", "10 ngày", "Một tuần lễ có 7 ngày, từ thứ hai đến chủ nhật."],
    ["Trên đồng hồ, kim phút chỉ vào số 6 thì đó là bao nhiêu phút?", "30 phút", "6 phút", "60 phút", "Mỗi số trên mặt đồng hồ ứng với 5 phút: 6 × 5 = 30 phút."],
    ["Trên đồng hồ, kim phút chỉ vào số 3 thì đó là bao nhiêu phút?", "15 phút", "3 phút", "45 phút", "Mỗi số trên mặt đồng hồ ứng với 5 phút: 3 × 5 = 15 phút."],
    ["Em đến trường lúc 7 giờ sáng và ra về lúc 11 giờ trưa. Em ở trường bao nhiêu giờ?", "4 giờ", "3 giờ", "5 giờ", "Từ 7 giờ đến 11 giờ là 11 − 7 = 4 giờ."],
    ["Một bộ phim bắt đầu lúc 19 giờ, kéo dài 2 giờ. Phim kết thúc lúc mấy giờ?", "21 giờ", "17 giờ", "20 giờ", "Giờ kết thúc = 19 + 2 = 21 giờ."]
  ],
  /* ---------- ĐẠO ĐỨC 3 ---------- */
  "dd3-toquoc": [
    ["Khi hát Quốc ca, tư thế đúng là:", "Đứng nghiêm trang, hát rõ lời", "Ngồi hát cùng bạn", "Vừa đi vừa hát", "Hát Quốc ca với tư thế nghiêm trang thể hiện lòng yêu nước."],
    ["Quốc kì Việt Nam có đặc điểm gì?", "Nền đỏ, ngôi sao vàng năm cánh", "Nền xanh, ngôi sao trắng", "Nền vàng, ngôi sao đỏ", "Quốc kì Việt Nam nền đỏ, sao vàng năm cánh."],
    ["Em thể hiện lòng yêu nước khi:", "Học giỏi, yêu quý quê hương đất nước", "Chỉ nói mà không làm", "Chê bai quê hương mình", "Yêu nước thể hiện bằng những việc làm tốt mỗi ngày."],
    ["Bác Hồ là ai đối với nhân dân Việt Nam?", "Vị lãnh tụ kính yêu của dân tộc", "Một người bạn cùng lớp", "Một nhân vật trong truyện cổ tích", "Bác Hồ là lãnh tụ vĩ đại, được nhân dân kính yêu."],
    ["Thấy bạn vẽ bậy lên tượng đài, em nên:", "Nhắc bạn dừng lại, cùng giữ gìn tượng đài", "Vẽ cùng cho vui", "Đứng cổ vũ bạn", "Tượng đài là nơi tưởng nhớ, cần được giữ gìn."],
    ["Nghe Quốc ca trong lễ chào cờ, em nên:", "Đứng nghiêm, theo dõi trang trọng", "Ngồi nói chuyện riêng", "Chạy đi chơi", "Đứng nghiêm thể hiện sự tôn kính Tổ quốc."],
    ["Yêu Tổ quốc cũng là yêu:", "Quê hương, làng xóm của mình", "Chỉ những nơi nổi tiếng", "Chỉ các thành phố lớn", "Quê hương là một phần của Tổ quốc."]
  ],
  "dd3-hangxom": [
    ["Nhà hàng xóm có việc buồn (tang lễ), em nên:", "Giữ yên lặng, không đùa nghịch ồn ào", "Mở nhạc thật to", "Sang chơi ồn như thường", "Giữ yên lặng là cách chia sẻ với hàng xóm."],
    ["Hàng xóm nhờ em trông nhà lúc đi vắng, em nên:", "Nhận lời nếu làm được và trông cẩn thận", "Nhận lời rồi bỏ đi chơi", "Từ chối ngay, không nghe rõ", "Giúp đỡ hàng xóm khi có thể là việc tốt."],
    ["Nhà hàng xóm có em bé đang ngủ, em chơi bên nhà mình nên:", "Chơi nhẹ nhàng, giữ yên lặng", "Cứ chơi ồn như thường", "Gõ cửa trêu em bé", "Giữ yên lặng để em bé ngủ ngon."],
    ["Khi hàng xóm bị ốm, em có thể:", "Sang thăm hỏi và giúp việc nhỏ", "Tránh mặt, không quan tâm", "Sang đòi chơi ồn ào", "Thăm hỏi, giúp đỡ thể hiện tình làng nghĩa xóm."],
    ["Lá cây nhà em rụng sang sân hàng xóm, em nên:", "Sang quét dọn giúp", "Kệ, không phải sân nhà mình", "Quét đổ thêm sang cho gọn", "Chủ động dọn dẹp là người hàng xóm tốt."],
    ["Gặp hàng xóm lớn tuổi đang xách đồ nặng, em nên:", "Chào hỏi và phụ xách giúp", "Đi qua không nhìn", "Chạy trước cho nhanh", "Giúp người lớn tuổi là việc nên làm."],
    ["Tình làng nghĩa xóm được xây dựng bằng:", "Sự quan tâm, giúp đỡ lẫn nhau", "Sự ích kỉ chỉ lo nhà mình", "Những lần tranh cãi", "Quan tâm, giúp đỡ nhau làm xóm làng gắn bó."]
  ],
  "dd3-hamhoc": [
    ["Gặp bài toán khó, cách làm của bạn ham học là:", "Suy nghĩ, thử nhiều cách rồi hỏi thầy cô", "Bỏ qua luôn", "Chép bài của bạn", "Kiên trì tìm cách giải mới là ham học."],
    ["Em là học sinh ham học khi:", "Tự giác đọc thêm sách ngoài bài học", "Chỉ học khi bị nhắc nhở", "Học thuộc lòng mà không hiểu", "Tự giác tìm hiểu thêm là ham học hỏi."],
    ["Nghe thầy cô giảng mà chưa hiểu, em nên:", "Giơ tay hỏi lại", "Ngồi im cho qua chuyện", "Quay sang nói chuyện với bạn", "Hỏi lại giúp em hiểu bài hơn."],
    ["Để học tốt môn Tiếng Việt, em có thể:", "Đọc sách, truyện thường xuyên", "Không đọc gì thêm", "Chỉ xem tranh trong sách", "Đọc nhiều giúp em giàu từ ngữ và viết tốt hơn."],
    ["Bạn chỉ cho em một cách giải hay, em nên:", "Cảm ơn và học theo cách hay", "Chê bai cho qua", "Giấu cách giải của mình", "Học hỏi lẫn nhau giúp các bạn cùng tiến bộ."],
    ["Câu nói nào thể hiện tinh thần ham học hỏi?", "Học, học nữa, học mãi", "Biết rồi, khỏi học", "Học chi cho mệt", "«Học, học nữa, học mãi» là lời dạy về tinh thần ham học."],
    ["Ở nhà, em sắp xếp việc học thế nào là tốt?", "Có thời gian biểu và học đúng giờ", "Học tuỳ hứng lúc nào cũng được", "Chỉ học trước ngày kiểm tra", "Thời gian biểu giúp em học đều và hiệu quả."],
    ["Biết thêm một điều mới thú vị, em nên:", "Chia sẻ với bạn bè và thầy cô", "Giữ riêng cho mình", "Cho là điều vô ích", "Chia sẻ kiến thức giúp mọi người cùng học."]
  ],
  "dd3-loihua": [
    ["Em hứa cuối tuần giúp mẹ dọn nhà, đến hôm đó bạn rủ đi chơi, em nên:", "Làm việc đã hứa xong rồi mới đi chơi", "Bỏ lời hứa đi chơi ngay", "Nói dối mẹ là bận học", "Giữ lời hứa là điều quan trọng nhất."],
    ["Trót hứa nhưng việc quá khó, không làm được, em nên:", "Nói thật, xin lỗi và tìm cách khắc phục", "Giả vờ quên đi", "Đổ lỗi cho người khác", "Thành thật nhận lỗi là giữ chữ tín."],
    ["Hứa nộp bài đúng hạn mà chưa làm xong, em nên:", "Báo thầy cô và cố gắng hoàn thành sớm nhất", "Nộp bài của bạn thay vào", "Im lặng không nói gì", "Trung thực và cố gắng hoàn thành lời hứa."],
    ["Người biết giữ lời hứa sẽ được mọi người:", "Tin tưởng và quý mến", "Tránh xa", "Không tin nữa", "Giữ chữ tín giúp em được mọi người tin tưởng."],
    ["Trước khi hứa một điều gì, em cần:", "Nghĩ xem mình có làm được không", "Hứa cho vui miệng", "Hứa thật nhiều việc cùng lúc", "Chỉ nên hứa khi chắc chắn làm được."],
    ["Bạn nhờ em giữ bí mật về việc nguy hiểm bạn định làm, em nên:", "Báo cho thầy cô hoặc bố mẹ", "Giữ bí mật và làm theo bạn", "Im lặng hoàn toàn", "Bí mật gây hại thì cần báo người lớn để bảo vệ bạn."],
    ["Mượn sách của bạn và hứa trả đúng hẹn, em nên:", "Đọc xong trả đúng hẹn, giữ sách cẩn thận", "Để bao lâu cũng được", "Cho bạn khác mượn tiếp", "Trả đúng hẹn, giữ gìn sách là giữ lời hứa."],
    ["Lỡ thất hứa với em nhỏ, em nên:", "Xin lỗi và sửa lại ngay", "Bỏ mặc em", "Đổ lỗi cho em", "Nhận lỗi và sửa sai giúp em giữ được lòng tin."]
  ],
  "dd3-nhiemvu": [
    ["Được phân công trực nhật, em nên:", "Đến sớm, làm đúng phần việc của mình", "Nhờ bạn làm hộ hết", "Làm qua loa cho xong", "Hoàn thành tốt nhiệm vụ được giao là tích cực."],
    ["Việc nhóm khó, mọi người đùn đẩy nhau, em nên:", "Nhận một phần việc và rủ các bạn cùng làm", "Cũng đùn đẩy theo", "Bỏ nhóm đi chơi", "Chủ động nhận việc giúp cả nhóm hoàn thành nhiệm vụ."],
    ["Thầy cô giao em mang bản đồ lên lớp, em nên:", "Cầm cẩn thận mang ngay lên lớp", "Để quên ở nhà", "Đưa người khác mà không nói lại", "Hoàn thành nhiệm vụ đúng như được giao."],
    ["Khi nhiệm vụ làm chưa tốt, em nên:", "Nhận khuyết điểm và cố gắng làm lại tốt hơn", "Đổ lỗi cho hoàn cảnh", "Giấu đi không cho ai biết", "Nhận trách nhiệm và sửa chữa là tích cực."],
    ["Là tổ trưởng, thấy bạn trong tổ chưa làm bài, em nên:", "Nhắc nhở và giúp bạn hoàn thành", "Mặc kệ bạn", "Mắng bạn thật to", "Giúp đỡ bạn cùng hoàn thành nhiệm vụ chung."],
    ["Việc nhà được giao là cho gà ăn mỗi chiều, em nên:", "Làm đều đặn mỗi ngày, đúng việc được giao", "Thích thì làm, không thích thì thôi", "Đợi mẹ nhắc mới làm", "Chủ động làm việc được giao hằng ngày."],
    ["Phần việc của em trong giờ thủ công nhóm xong sớm, em nên:", "Giúp các bạn hoàn thành phần việc chung", "Ngồi chơi riêng", "Xin về trước", "Giúp bạn là hoàn thành tốt nhiệm vụ của nhóm."],
    ["Gặp nhiệm vụ mới lạ chưa biết cách làm, em nên:", "Hỏi người lớn cách làm rồi bắt tay vào làm", "Từ chối ngay", "Làm bừa cho xong", "Tìm hiểu cách làm trước khi thực hiện."]
  ],
  "dd3-khampha": [
    ["Khám phá bản thân là để biết:", "Điểm mạnh, điểm yếu và sở thích của mình", "Điểm yếu của bạn bè", "Mọi chuyện về người khác", "Hiểu mình giúp em phát huy điểm mạnh, sửa điểm yếu."],
    ["Em vẽ đẹp nhưng hát chưa hay, em nên:", "Phát huy năng khiếu vẽ, tập luyện thêm khi thích hát", "Buồn chán và bỏ cả việc vẽ", "Giấu không cho ai biết mình vẽ đẹp", "Mỗi người có điểm mạnh riêng, hãy phát huy nó."],
    ["Để biết mình thích và giỏi việc gì, em nên:", "Thử tham gia nhiều hoạt động khác nhau", "Chỉ ngồi đoán", "Bắt chước y hệt bạn", "Trải nghiệm nhiều hoạt động giúp em khám phá bản thân."],
    ["Bạn chê em chạy chậm, em nên:", "Bình tĩnh, biết mình còn điểm mạnh khác và tập luyện thêm", "Khóc và bỏ học thể dục", "Giận bạn mãi không thôi", "Hiểu điểm yếu của mình để cố gắng, không tự ti."],
    ["Sở thích đọc sách giúp em:", "Hiểu biết nhiều hơn và học tốt hơn", "Không có ích gì", "Kém hơn bạn bè", "Sở thích tốt nên được phát huy."],
    ["Em ước mơ thành bác sĩ, ngay từ bây giờ em nên:", "Học giỏi, chăm chỉ và rèn tính cẩn thận", "Chỉ mơ ước mà không học", "Đợi lớn lên mới tính", "Ước mơ được nuôi bằng việc học hôm nay."],
    ["Khi được khen về điểm mạnh của mình, em nên:", "Cảm ơn và tiếp tục cố gắng", "Kiêu căng, chê bai bạn", "Cho rằng mình giỏi nhất lớp", "Được khen vẫn cần khiêm tốn và cố gắng."],
    ["Em chưa giỏi Toán bằng bạn, cách nghĩ đúng là:", "Mỗi người giỏi một mặt, em sẽ cố gắng hơn", "Em là người kém nhất lớp", "Bỏ luôn môn Toán", "Không nên so sánh mình với bạn, hãy cố gắng tiến bộ mỗi ngày."]
  ],
  "dd3-bathoa": [
    ["Bị bạn hiểu lầm, em nên:", "Gặp bạn nói chuyện rõ ràng, bình tĩnh", "Giận và không chơi với bạn nữa", "Nói xấu bạn với người khác", "Nói chuyện rõ ràng giúp hoá giải hiểu lầm."],
    ["Hai bạn tranh nhau một món đồ chơi, cách giải quyết tốt là:", "Chia sẻ, chơi luân phiên với nhau", "Giành giật đến cùng", "Giấu món đồ chơi đi", "Chơi luân phiên là công bằng cho cả hai."],
    ["Em lỡ làm bạn buồn, em nên:", "Xin lỗi bạn chân thành", "Coi như không có chuyện gì", "Đổ lỗi cho bạn", "Xin lỗi là bước đầu để xử lí bất hoà."],
    ["Khi bạn đang tức giận nói to, em nên:", "Giữ bình tĩnh, đợi bạn dịu lại rồi nói chuyện", "Cũng hét lại thật to", "Đi mách ngay, không nghe bạn nói", "Bình tĩnh lắng nghe giúp hai bên hiểu nhau."],
    ["Bất hoà kéo dài, hai bạn không tự giải quyết được, em nên:", "Nhờ thầy cô hoặc người lớn giúp", "Để mãi như vậy", "Rủ thêm bạn vào phe của mình", "Người lớn sẽ giúp các em hoá giải công bằng."],
    ["Bạn không đồng ý với ý kiến của em, em nên:", "Lắng nghe và tôn trọng ý kiến khác", "Buộc bạn phải theo mình", "Giận dỗi bỏ đi", "Tôn trọng ý kiến khác giúp bạn bè hoà hợp."],
    ["Sau khi đã hoà giải, hai bạn nên:", "Cùng rút kinh nghiệm và chơi vui vẻ như trước", "Vẫn để bụng ghim nhau", "Kể lại lỗi của bạn cho mọi người", "Hoà giải xong là để vui vẻ trở lại."]
  ],
  "dd3-atgt": [
    ["Đi bộ qua đường nơi có vạch kẻ đường, em đi:", "Trên vạch kẻ dành cho người đi bộ và quan sát xe", "Chạy thật nhanh qua bất cứ chỗ nào", "Đi giữa lòng đường", "Sang đường đúng vạch, quan sát cả hai phía."],
    ["Ngồi trên xe máy cùng bố mẹ, em phải:", "Đội mũ bảo hiểm và cài quai đúng cách", "Không cần đội mũ", "Đội mũ nhưng không cài quai", "Đội mũ bảo hiểm đúng cách để bảo vệ em."],
    ["Đèn tín hiệu cho người đi bộ chuyển sang đỏ, em phải:", "Dừng lại chờ", "Chạy nhanh qua đường", "Đi tiếp vì xe còn ở xa", "Đèn đỏ cho người đi bộ nghĩa là phải dừng."],
    ["Đi xe đạp muốn rẽ, em nên:", "Ra hiệu bằng tay và quan sát phía sau", "Rẽ ngay không cần nhìn", "Đạp thật nhanh rồi rẽ", "Ra hiệu và quan sát giúp rẽ xe an toàn."],
    ["Nơi nào sau đây rất nguy hiểm để chơi đùa?", "Dưới lòng đường, gần xe cộ qua lại", "Trong sân trường", "Trong công viên", "Tuyệt đối không chơi đùa dưới lòng đường."]
  ],
  /* ---------- TIN HỌC 3 ---------- */
  "tin3-may": [
    ["Thiết bị nào dùng để nhập chữ vào máy tính?", "Bàn phím", "Màn hình", "Loa", "Bàn phím là thiết bị đưa thông tin vào máy tính."],
    ["Xem dự báo thời tiết rồi quyết định mang áo mưa là ví dụ về:", "Dùng thông tin để quyết định", "Xử lí thông tin bằng máy", "Lưu trữ thông tin", "Thông tin giúp em đưa ra quyết định đúng."],
    ["Bộ phận nào của máy tính được ví như 'bộ não'?", "Bộ xử lí trong thân máy", "Chuột máy tính", "Bàn phím", "Bộ xử lí điều khiển mọi hoạt động của máy tính."]
  ],
  "tin3-internet": [
    ["Muốn xem lại bài giảng của thầy cô, em có thể:", "Vào trang học tập trên Internet để xem", "Tắt máy đi chơi", "Chép bài của bạn", "Internet giúp em tìm lại thông tin học tập."],
    ["Gặp trang web có nội dung xấu, không phù hợp, em nên:", "Tắt ngay và báo cho người lớn", "Xem tiếp cho biết", "Gửi cho bạn xem cùng", "Tránh xa nội dung xấu và báo ngay cho người lớn."],
    ["Thông tin nào em KHÔNG nên đăng công khai trên mạng?", "Địa chỉ nhà và trường của em", "Tên một bài hát em thích", "Một bức tranh em tự vẽ", "Thông tin cá nhân cần được giữ kín."],
    ["Tìm được một thông tin trên mạng, trước khi tin ngay em nên:", "Hỏi thầy cô hoặc bố mẹ kiểm chứng", "Tin ngay lập tức", "Chia sẻ cho thật nhiều người", "Kiểm chứng thông tin trước khi tin và chia sẻ."],
    ["Dùng máy tính, điện thoại liên tục quá lâu sẽ:", "Mỏi mắt, hại sức khoẻ", "Giúp mắt sáng hơn", "Không ảnh hưởng gì", "Cần dùng thiết bị điều độ và nghỉ ngơi cho mắt."],
    ["Người lạ trên mạng rủ em gửi ảnh cá nhân, em nên:", "Từ chối và báo cho bố mẹ", "Gửi ngay cho vui", "Hẹn gặp người lạ", "Không gửi ảnh cho người lạ, báo ngay cho người lớn."],
    ["Muốn học tiếng Anh trên Internet, em có thể:", "Xem video bài học và nghe phát âm", "Chỉ chơi trò chơi điện tử", "Không học được gì trên mạng", "Internet có rất nhiều bài học bổ ích."]
  ],
  "tin3-luutru": [
    ["Sơ đồ hình cây giúp em điều gì?", "Thấy rõ cách sắp xếp từ lớn đến nhỏ, dễ tìm kiếm", "Trang trí cho đẹp", "Làm mọi thứ rối hơn", "Sơ đồ hình cây thể hiện cách phân loại, sắp xếp."],
    ["Muốn tìm nhanh một tệp trong máy, em nên:", "Đặt tên tệp rõ ràng, lưu vào đúng thư mục", "Đặt tên tuỳ tiện cho nhanh", "Lưu tất cả ở một chỗ lẫn lộn", "Tên rõ ràng và đúng thư mục giúp tìm tệp nhanh."],
    ["Thư mục trong máy tính giống như:", "Một ngăn tủ chứa đồ được phân loại", "Một tờ giấy", "Một cái bút", "Thư mục chứa và phân loại các tệp như ngăn tủ."],
    ["Trong thư mục 'Bài tập', em nên lưu:", "Các tệp bài tập của em", "Trò chơi và nhạc giải trí", "Ảnh gia đình", "Phân loại đúng nội dung giúp dễ tìm kiếm."],
    ["Sắp xếp sách vở theo từng môn học là cách để:", "Tìm sách nhanh khi cần dùng", "Tốn thời gian vô ích", "Làm phòng bừa bộn hơn", "Sắp xếp khoa học giúp tìm kiếm nhanh."],
    ["Tệp tin trong máy tính có thể chứa:", "Văn bản, hình ảnh, âm thanh", "Nước uống", "Đồ vật thật như bút, thước", "Tệp chứa dữ liệu như văn bản, hình ảnh, nhạc."]
  ],
  "tin3-baove": [
    ["Một mật khẩu tốt nên là mật khẩu:", "Khó đoán và chỉ mình em biết", "Là ngày sinh của em", "Là tên của em", "Mật khẩu khó đoán mới bảo vệ được tài khoản."],
    ["Bạn thân xin mật khẩu tài khoản học tập của em, em nên:", "Không cho, dù là bạn thân", "Cho ngay vì tin bạn", "Viết ra giấy đưa cho bạn", "Mật khẩu là của riêng, không chia sẻ cho bất cứ ai."],
    ["Thấy máy tính của người khác đang mở mà không có chủ ở đó, em nên:", "Không tự ý chạm vào", "Mở xem thoải mái", "Xoá bớt tệp cho vui", "Không dùng máy của người khác khi chưa được phép."],
    ["Có cửa sổ lạ hiện lên rủ em bấm vào để nhận quà, em nên:", "Đóng lại và báo cho người lớn", "Bấm ngay để nhận quà", "Điền thông tin cá nhân vào", "Cảnh giác với cửa sổ lạ, không bấm bừa."],
    ["Bị người lạ nhắn tin làm phiền trên mạng, em nên:", "Chặn lại và báo cho bố mẹ", "Nhắn lại cãi nhau", "Làm theo lời người lạ", "Báo người lớn và chặn kẻ làm phiền."],
    ["Thông tin nào là thông tin cá nhân cần bảo vệ?", "Số điện thoại của bố mẹ", "Tên một con vật em biết", "Màu sắc em yêu thích", "Số điện thoại, địa chỉ là thông tin riêng tư."],
    ["Dùng xong máy tính ở trường, em nên:", "Đăng xuất tài khoản hoặc tắt máy", "Để nguyên tài khoản cho bạn sau dùng", "Không cần làm gì cả", "Đăng xuất để bảo vệ thông tin của em."]
  ],
  "tin3-trinhchieu": [
    ["Một trang trình chiếu thường gồm:", "Tiêu đề, nội dung và hình ảnh", "Chỉ toàn con số", "Không có chữ nào", "Trang chiếu trình bày tiêu đề, nội dung và hình minh hoạ."],
    ["Muốn đưa hình ảnh vào trang chiếu, em dùng lệnh:", "Chèn hình ảnh", "Xoá trang chiếu", "Tắt máy tính", "Lệnh chèn hình giúp trang chiếu sinh động."],
    ["Khi trình chiếu bài trước lớp, em nên:", "Nói to, rõ ràng, nhìn về phía người nghe", "Nói lí nhí, quay lưng lại với lớp", "Đọc thật nhanh cho xong", "Trình bày tự tin, rõ ràng là rất quan trọng."],
    ["Con lăn (nút cuộn) trên chuột dùng để:", "Cuộn trang lên xuống", "Tắt máy tính", "Gõ chữ", "Con lăn chuột giúp cuộn nội dung trên màn hình."],
    ["Di chuyển chuột trên mặt bàn di chuột giúp:", "Con trỏ trên màn hình di chuyển theo", "Màn hình tự tắt đi", "Bàn phím sáng lên", "Chuột điều khiển con trỏ trên màn hình."],
    ["Trước buổi trình chiếu, em nên:", "Chuẩn bị nội dung và kiểm tra lại các trang", "Không cần chuẩn bị gì", "Đến giờ mới nghĩ nội dung", "Chuẩn bị kĩ giúp buổi trình chiếu thành công."]
  ],
  "tin3-giaiquyet": [
    ["Bước đầu tiên khi giải quyết một công việc là:", "Hiểu rõ yêu cầu của công việc", "Làm ngay không cần nghĩ", "Hỏi đáp án của người khác", "Hiểu rõ yêu cầu mới làm đúng việc được."],
    ["Câu 'Nếu trời mưa thì em mang áo mưa' thuộc dạng công việc nào?", "Công việc theo điều kiện", "Công việc không cần làm", "Công việc chỉ có một bước", "Có 'nếu... thì...' tức là công việc theo điều kiện."],
    ["Để pha một cốc nước chanh, bước nào nên làm trước?", "Cho nước, đường vào cốc rồi khuấy đều", "Uống ngay khi chưa pha", "Vứt hết nguyên liệu đi", "Mọi công việc cần làm theo đúng thứ tự các bước."],
    ["Làm bài theo các bước mà vẫn sai, em nên:", "Kiểm tra lại từng bước xem sai ở đâu", "Bỏ luôn không làm nữa", "Đổ lỗi cho đề bài", "Kiểm tra lại giúp em tìm ra chỗ sai."],
    ["Việc 'đánh răng' gồm bước nào sau đây?", "Lấy kem lên bàn chải rồi chải răng", "Ăn kẹo trước khi đánh răng", "Đi ngủ luôn", "Mọi công việc đều gồm các bước theo thứ tự."],
    ["'Nếu đèn giao thông đỏ thì người đi đường dừng lại' là công việc:", "Theo điều kiện", "Không theo điều kiện nào", "Làm tuỳ thích", "Đây là công việc theo điều kiện nếu... thì..."],
    ["Chia một công việc lớn thành các bước nhỏ giúp:", "Dễ làm và dễ kiểm tra", "Công việc khó hơn", "Mất nhiều thời gian hơn", "Chia nhỏ bước là cách giải quyết vấn đề tốt."]
  ],
  /* ---------- CÔNG NGHỆ 3 ---------- */
  "cn3-doisong": [
    ["Bóng đèn nào tiết kiệm điện hơn?", "Đèn LED", "Đèn sợi đốt", "Đèn dầu", "Đèn LED sáng tốt mà tốn ít điện."],
    ["Nghe dự báo thời tiết trên radio giúp em:", "Biết trước trời mưa nắng để chuẩn bị", "Không để làm gì", "Chỉ để nghe cho vui", "Radio cung cấp thông tin hữu ích như dự báo thời tiết."],
    ["Để xem ti vi tốt cho mắt, em nên:", "Ngồi cách ti vi một khoảng vừa phải, phòng đủ sáng", "Ngồi sát vào màn hình", "Xem trong phòng tối om", "Khoảng cách và ánh sáng phù hợp giúp bảo vệ mắt."]
  ],
  "cn3-thucong": [
    ["Khi dùng kéo cắt giấy, em cầm kéo sao cho an toàn?", "Mũi kéo hướng ra xa người, cắt cẩn thận", "Chĩa mũi kéo vào bạn bên cạnh", "Vừa chạy vừa cầm kéo", "Cầm kéo an toàn: mũi kéo hướng ra ngoài."],
    ["Biển báo giao thông hình tròn, nền xanh lam thường là:", "Biển hiệu lệnh phải tuân theo", "Biển cấm màu đỏ", "Biển trang trí đường phố", "Biển tròn nền xanh là biển hiệu lệnh."],
    ["Làm chong chóng giấy cần những vật liệu nào?", "Giấy màu, que tre và đinh ghim", "Sắt thép và xi măng", "Đất sét và gỗ to", "Chong chóng làm từ giấy, que và đinh ghim."],
    ["Sau khi làm thủ công xong, em nên:", "Dọn dẹp dụng cụ, cất đúng chỗ và rửa tay", "Để bừa bãi trên bàn", "Vứt dụng cụ sắc nhọn lung tung", "Dọn dẹp gọn gàng, an toàn sau khi làm."]
  ]
};

var G3_EXTRA_PAIRS = {
  "tv3-cau": [["Câu kể", "Kể lại sự việc"], ["Câu hỏi", "Hỏi điều chưa biết"], ["Câu cảm", "Bộc lộ cảm xúc"], ["Câu khiến", "Yêu cầu, đề nghị"]],
  "tnxh3-suckhoe": [["Tim", "Đưa máu đi khắp cơ thể"], ["Não", "Điều khiển suy nghĩ, hoạt động"], ["Dạ dày", "Nghiền nhỏ, trộn thức ăn"], ["Miệng", "Nhai và nuốt thức ăn"]],
  "tnxh3-traidat": [["Mặt Trời mọc", "Hướng đông"], ["Mặt Trời lặn", "Hướng tây"], ["La bàn", "Chỉ hướng bắc"], ["Lục địa", "Phần đất nổi lớn trên Trái Đất"]],
  "dd3-atgt": [["Đèn xanh", "Được phép đi"], ["Đèn đỏ", "Phải dừng lại"], ["Vạch kẻ đường", "Nơi sang đường an toàn"], ["Mũ bảo hiểm", "Bảo vệ đầu khi đi xe máy"]],
  "tin3-may": [["Bàn phím", "Gõ chữ, số"], ["Chuột", "Di chuyển con trỏ"], ["Màn hình", "Hiển thị hình ảnh"], ["Loa", "Phát ra âm thanh"]],
  "cn3-doisong": [["Đèn học", "Chiếu sáng khi học bài"], ["Quạt điện", "Làm mát"], ["Radio", "Nghe tin tức, dự báo thời tiết"], ["Ti vi", "Xem chương trình"]]
};

/* ---------- BỘ SINH TOÁN 3 MỚI (thêm biến thể, ngữ cảnh) ---------- */
function g3Biggest3(maxN) {
  return function () {
    var s = new Set();
    while (s.size < 3) s.add(rand(12, maxN));
    var a = Array.from(s), askBig = Math.random() < 0.5;
    var target = askBig ? Math.max.apply(null, a) : Math.min.apply(null, a);
    var opts = shuffle(a.slice()).map(function (n) { return { html: '<span class="opt-num">' + fmtN(n) + "</span>", text: String(fmtN(n)) }; });
    return { kind: "choose", big: true, prompt: (askBig ? "Số lớn nhất" : "Số bé nhất") + " trong ba số " + a.map(fmtN).join(", ") + " là số nào?", options: opts, answer: opts.findIndex(function (o) { return o.text === String(fmtN(target)); }), explain: (askBig ? "Số lớn nhất là " : "Số bé nhất là ") + fmtN(target) + "." };
  };
}
function g3DigitAsk(digits) {
  var PL = [[1, "đơn vị"], [10, "chục"], [100, "trăm"], [1000, "nghìn"], [10000, "chục nghìn"]];
  return function () {
    var lo = digits === 5 ? 10000 : 1000, hi = digits === 5 ? 99999 : 9999;
    var n = rand(lo, hi), places = PL.filter(function (p) { return p[0] < Math.pow(10, digits); });
    var p = pick(places), d = Math.floor(n / p[0]) % 10;
    var wrongs = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function (x) { return x !== d; })).slice(0, 2);
    return calcMCQ("Đọc số rồi trả lời nhé!", String(fmtN(n)), d, 0, 9, "Số " + fmtN(n) + ": chữ số ở hàng " + p[1] + " là " + d + ".");
  };
}
function g3SeqGap() {
  var step = pick([2, 5, 10, 25, 50, 100]), start = rand(1, 40) * (step >= 50 ? 2 : 1) + rand(0, 9);
  var seq = [0, 1, 2, 3].map(function (i) { return start + i * step; });
  var miss = pick([1, 2]), val = seq[miss];
  var row = seq.map(function (v, i) { return i === miss ? blankSlot() : '<span class="seq-num">' + fmtN(v) + "</span>"; }).join(" ");
  var vals = [val, val + step, val - step > 0 ? val - step : val + 2 * step];
  var opts = shuffle(vals.slice());
  return { kind: "blank", big: true, badge: "✏️ Điền vào chỗ trống", prompt: "Điền số còn thiếu trong dãy số:", visual: '<div class="seqrow">' + row + "</div>", blankText: String(val), options: opts.map(function (o) { return { html: '<span class="opt-num">' + fmtN(o) + "</span>" }; }), answer: opts.indexOf(val), cols: 3, explain: "Dãy số tăng dần mỗi lần thêm " + step + ": " + seq.map(fmtN).join(", ") + "." };
}
function g3FractionOfQty() {
  var n = pick([2, 3, 4, 5, 6, 7, 8, 9]), k = rand(2, 9), total = n * k;
  var thing = pick([["🍬", "cái kẹo"], ["🎈", "quả bóng"], ["✏️", "cái bút"], ["🍎", "quả táo"]]);
  return calcMCQ(thing[0] + " Tìm 1/" + n + " của " + total + " " + thing[1] + ":", total + " : " + n, k, 1, total, total + " : " + n + " = " + k + ". Vậy 1/" + n + " của " + total + " " + thing[1] + " là " + k + ".");
}
function g3UnitFracCompare() {
  var a = pick([2, 3, 4, 5, 6]), b = pick([2, 3, 4, 5, 6, 7, 8]);
  if (a === b) b = a + 2;
  var bigger = a < b ? a : b;
  return mcqQ("Phần nào lớn hơn: 1/" + a + " hay 1/" + b + "?", ["1/" + (bigger === a ? b : a), "Hai phần bằng nhau"], "1/" + bigger, "Hai phân số có cùng tử số 1: mẫu số càng nhỏ thì phần càng lớn. 1/" + bigger + " lớn hơn.");
}
function g3ExprMix() {
  return function () {
    var form = rand(0, 2), a = rand(2, 9), b = rand(2, 9), c = rand(2, 30), text, val;
    if (form === 0) { text = a + " × " + b + " + " + c; val = a * b + c; }
    else if (form === 1) { text = (a * b + c) + " − " + b + " × " + Math.ceil(c / b); val = a * b + c - b * Math.ceil(c / b); if (val < 0) { text = a + " × " + b + " + " + c; val = a * b + c; } }
    else { text = "(" + a + " + " + c + ") × " + b; val = (a + c) * b; }
    return calcMCQ("Tính giá trị biểu thức nhé!", text, val, Math.max(0, val - 15), val + 15, "Nhớ thứ tự: ngoặc trước, nhân chia trước, cộng trừ sau. " + text + " = " + val + ".");
  }();
}
function g3PeriInverse() {
  var s = rand(3, 15), p = s * 4;
  return calcMCQ("Một hình vuông có chu vi " + p + " cm. Cạnh của hình vuông dài bao nhiêu cm?", p + " : 4", s, 1, 30, "Cạnh hình vuông = chu vi : 4 = " + p + " : 4 = " + s + " (cm).");
}
function g3MoneyChange() {
  var price = rand(3, 45) * 1000, pay = price <= 45000 ? 50000 : 100000;
  if (price === pay) price -= 5000;
  var change = pay - price;
  return mcqQ("Mua đồ hết " + fmtN(price) + " đồng, đưa tờ " + fmtN(pay) + " đồng. Cô bán hàng trả lại bao nhiêu tiền?", [String(fmtN(change + 2000)) + " đồng", String(fmtN(Math.abs(change - 5000))) + " đồng"], String(fmtN(change)) + " đồng", "Tiền trả lại = " + fmtN(pay) + " − " + fmtN(price) + " = " + fmtN(change) + " đồng.");
}
function g3ClockElapsed() {
  var h = rand(1, 11), m1 = pick([0, 5, 10, 15, 20, 25, 30]), add = pick([10, 15, 20, 25, 30, 35, 40, 45]);
  var m2 = m1 + add, txt = function (m) { return h + " giờ " + (m === 0 ? "" : m + " phút"); };
  return calcMCQ("Từ " + txt(m1) + " đến " + txt(m2) + " là bao nhiêu phút?", txt(m1) + " → " + txt(m2), add, 5, 60, txt(m1) + " → " + txt(m2) + ": thêm " + add + " phút.");
}
function g3StatFill() {
  var vs = new Set();
  while (vs.size < 4) vs.add(rand(2, 9));
  var vals = Array.from(vs), names = ["Hoa", "Lan", "Tuấn", "Mai"];
  var cats = names.map(function (nm, i) { return [nm, vals[i]]; });
  var ti = rand(0, 3), target = cats[ti];
  var others = vals.filter(function (v) { return v !== target[1]; }).slice(0, 2);
  var opts = shuffle([target[1]].concat(others));
  var vis = "Số quyển sách đã đọc trong tháng:<br>" + cats.map(function (c) { return c[0] + ": " + c[1] + " quyển"; }).join(" &nbsp;•&nbsp; ");
  return { kind: "blank", big: true, badge: "✏️ Điền vào chỗ trống", prompt: "Nhìn bảng số liệu rồi điền:", visual: '<div class="bigvisual" style="font-size:19px">' + vis + "</div>", blankText: String(target[1]), options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(target[1]), cols: 3, explain: "Theo bảng, " + target[0] + " đã đọc " + target[1] + " quyển sách." };
}
function g3TwoStepShop() {
  var n = rand(2, 6), price = rand(2, 9), total = n * price, have = total + rand(2, 10);
  return calcMCQ("Mẹ có " + have + " nghìn đồng. Mẹ mua " + n + " quyển vở, mỗi quyển " + price + " nghìn đồng. Mẹ còn lại bao nhiêu nghìn đồng?", have + " − " + n + " × " + price, have - total, 0, have, "Tiền mua vở: " + n + " × " + price + " = " + total + " nghìn. Còn lại: " + have + " − " + total + " = " + (have - total) + " nghìn đồng.");
}
function g3TableBlankMissing() {
  var a = rand(2, 9), k = rand(2, 9);
  while (k === a) k = rand(2, 9);
  var prod = a * k, form = rand(0, 1);
  var eq = form === 0 ? a + " × " + blankSlot() + " = " + prod : blankSlot() + " × " + a + " = " + prod;
  var opts = shuffle([k, a, prod]);
  return { kind: "blank", big: true, badge: "✏️ Điền vào chỗ trống", prompt: "Điền số còn thiếu vào phép nhân:", visual: '<div class="bigvisual">' + eq + "</div>", blankText: String(k), options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(k), cols: 3, explain: a + " × " + k + " = " + prod + " nên số còn thiếu là " + k + "." };
}

/* ---------- TIẾNG ANH 3: BỘ SINH THÊM CHO MỖI UNIT ---------- */
function eng3OddOne(u) {
  var mine = shuffle(u.words.slice()).slice(0, 3);
  var others = ALL_WORDS3.filter(function (w) { return u.words.indexOf(w) === -1; });
  var foreign = pick(others);
  var opts = shuffle(mine.concat([foreign]).map(function (w) { return { html: '<span class="opt-emoji">' + w[2] + '</span> <span class="opt-word">' + w[0] + "</span>", text: w[0] }; }));
  return { kind: "choose", big: true, prompt: "Từ nào KHÁC nhóm với ba từ còn lại?", options: opts, answer: opts.findIndex(function (o) { return o.text === foreign[0]; }), explain: foreign[0] + " nghĩa là '" + foreign[1] + "' — không thuộc nhóm từ của bài này.", speak: foreign[0] };
}
function eng3BlankTail(u) {
  var w = pick(u.words), lastUp = w[0].slice(-1).toUpperCase();
  var letters = [lastUp], alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  while (letters.length < 3) { var L = alpha.charAt(rand(0, 25)); if (letters.indexOf(L) === -1) letters.push(L); }
  letters = shuffle(letters);
  return { kind: "blank", big: true, badge: "✏️ Điền vào chỗ trống", prompt: "Điền chữ cái CUỐI còn thiếu: " + w[2] + " (" + w[1] + ")", speak: w[0], blankText: w[0].slice(-1), visual: '<div class="big-word">' + w[0].slice(0, -1) + blankSlot() + "</div>", options: letters.map(function (x) { return { html: '<span class="opt-word">' + x + " " + x.toLowerCase() + "</span>" }; }), answer: letters.indexOf(lastUp), cols: 3, explain: w[0] + " — " + w[1] + ". Chữ cuối là '" + w[0].slice(-1) + "'." };
}
function eng3TFUnit(u) {
  return function () {
    var rounds = [], used = shuffle(u.words.slice());
    for (var i = 0; i < 3 && i < used.length; i++) {
      var w = used[i], truth = Math.random() < 0.5;
      var shown = truth ? w[1] : pick(u.words.filter(function (x) { return x !== w; }))[1];
      rounds.push({ visual: w[2] + " <b>" + w[0] + "</b> nghĩa là «" + shown + "»", truth: truth });
    }
    return tfQ("«" + u.title + "» — Đúng hay sai?", rounds);
  };
}

/* ---------- ÁP DỤNG: NẠP THÊM + ĐẾM + NHÃN + CHỐNG LẶP ---------- */
(function () {
  if (typeof GRADES === "undefined" || !GRADES[3]) return;
  /* Khử trùng từ vựng trộn toàn cục (vài từ xuất hiện ở 2 Unit, ví dụ walking)
     để bộ sinh không bao giờ bốc trùng một từ làm hai đáp án khác nhau. */
  if (typeof ALL_WORDS3 !== "undefined" && ALL_WORDS3.length) {
    var seenW = {};
    for (var wi = ALL_WORDS3.length - 1; wi >= 0; wi--) {
      if (seenW[ALL_WORDS3[wi][0]]) ALL_WORDS3.splice(wi, 1); else seenW[ALL_WORDS3[wi][0]] = 1;
    }
  }
  var LS_KEY = "gameHocTap_recentQ_v1";
  var recentStore = {};
  try { recentStore = JSON.parse(localStorage.getItem(LS_KEY) || "{}") || {}; } catch (e) { recentStore = {}; }
  function saveRecent() { try { localStorage.setItem(LS_KEY, JSON.stringify(recentStore)); } catch (e) {} }
  var G3BANK = {};
  var KNOWLEDGE = { "g3-tv": 1, "g3-tnxh": 1, "g3-dd": 1, "g3-tin": 1, "g3-cn": 1 };
  function capFor(key) { return Math.max(24, Math.min(80, G3BANK[key] || 30)); }
  function recentHas(key, sig) { return (recentStore[key] || []).indexOf(sig) !== -1; }
  function recentAdd(key, sig) {
    var arr = recentStore[key] || (recentStore[key] = []);
    if (arr.indexOf(sig) === -1) arr.push(sig);
    var cap = capFor(key);
    while (arr.length > cap) arr.shift();
    saveRecent();
  }

  GRADES[3].subjects.forEach(function (subj) {
    subj.topics.forEach(function (t) {
      /* 1) Nạp thêm câu hỏi thật cho môn kiến thức */
      var extra = G3_EXTRA_FACTS[t.id];
      if (extra && extra.length) {
        extra.forEach(function (f) {
          t.pools.choose.push(function () { return factMCQ(f); });
          t.pools.blank.push(function () { return factBlank(f); });
        });
        t.pools.games.push(factsTF(extra), factsCatch(extra));
      }
      var extraPairs = G3_EXTRA_PAIRS[t.id];
      if (extraPairs) t.pools.match.push(function () { return pairsMatch("Nối cho đúng nhé! 🧩", extraPairs); });
      /* 2) Thêm bộ sinh cho các chủ đề Toán cụ thể */
      if (t.id === "m3-ontap") { t.pools.choose.push(g3Biggest3(1000)); t.pools.blank.push(g3SeqGap); }
      if (t.id === "m3-bang") { t.pools.blank.push(g3TableBlankMissing); }
      if (t.id === "m3-phan") { t.pools.choose.push(g3FractionOfQty, g3UnitFracCompare); }
      if (t.id === "m3-nc100") { t.pools.choose.push(g3TwoStepShop); }
      if (t.id === "m3-nc1000") { t.pools.choose.push(g3ExprMix); }
      if (t.id === "m3-so10000") { t.pools.choose.push(g3DigitAsk(4)); }
      if (t.id === "m3-cvdt") { t.pools.choose.push(g3PeriInverse); }
      if (t.id === "m3-so100000") { t.pools.choose.push(g3DigitAsk(5), g3Biggest3(100000)); }
      if (t.id === "m3-giotien") { t.pools.choose.push(g3MoneyChange, g3ClockElapsed); }
      if (t.id === "m3-thongke") { t.pools.blank.push(g3StatFill); }
    });
  });

  /* 3) Tiếng Anh: thêm bộ sinh cho từng Unit (theo đúng thứ tự UNITS3) */
  var engSubj = null;
  GRADES[3].subjects.forEach(function (s) { if (s.id === "g3-eng") engSubj = s; });
  if (engSubj) {
    engSubj.topics.forEach(function (t, i) {
      if (i < UNITS3.length) {
        var u = UNITS3[i];
        t.pools.choose.push(function () { return eng3OddOne(u); });
        t.pools.blank.push(function () { return eng3BlankTail(u); });
        t.pools.games.push(eng3TFUnit(u));
      }
    });
  }

  /* 4) Đếm ngân hàng câu hỏi + gắn nhãn vào dòng mô tả chủ đề */
  var roundSeen3 = {};
  GRADES[3].subjects.forEach(function (subj) {
    subj.topics.forEach(function (t) {
      var key = "3|" + subj.id + "|" + t.id, bankN;
      if (KNOWLEDGE[subj.id]) {
        bankN = t.pools.choose.length * 3 + 4;
      } else {
        var sigs = {};
        ["choose", "blank", "match", "games"].forEach(function (pk) {
          (t.pools[pk] || []).forEach(function (g) {
            for (var i = 0; i < 12; i++) { try { sigs[qSig3(g())] = 1; } catch (e) {} }
          });
        });
        bankN = Object.keys(sigs).length;
      }
      G3BANK[key] = bankN;
      t.sub = t.sub + " • " + bankN + "+ câu hỏi";
      /* 5) Bọc chống lặp cho mọi bộ sinh của chủ đề */
      ["choose", "blank", "match", "games"].forEach(function (pk) {
        var rawPool = (t.pools[pk] || []).slice();
        if (!rawPool.length) return;
        t.pools[pk] = rawPool.map(function (gen) {
          return function () {
            if (roundSelectionActive) return gen();
            var q = gen(), sig = qSig3(q), tries = 0;
            while ((roundSeen3[sig] || recentHas(key, sig)) && tries < 12) {
              var alt = rawPool.length > 1 ? pick(rawPool) : gen;
              q = alt(); sig = qSig3(q); tries++;
            }
            roundSeen3[sig] = true;
            recentAdd(key, sig);
            return q;
          };
        });
      });
    });
  });

  /* 6) Lượt mới: xoá dấu vết trong-lượt; làm mới danh sách đã dùng khi sắp hết ngân hàng */
  var origStartGame = startGame;
  startGame = function (title, pools) {
    roundSeen3 = {};
    try {
      var key = (typeof currentTopicKey !== "undefined") ? currentTopicKey : "";
      if (key && G3BANK[key] && (recentStore[key] || []).length >= capFor(key)) { recentStore[key] = []; saveRecent(); }
    } catch (e) {}
    return origStartGame(title, pools);
  };
})();

/* ---------- Công thức và cách làm (Toán) của Lớp 3 — tách từ bảng ghi chú chung của master ---------- */
window.__MATH_KNOWLEDGE_NOTES = window.__MATH_KNOWLEDGE_NOTES || {};
Object.assign(window.__MATH_KNOWLEDGE_NOTES, {
"m3-ontap": ["Đọc, viết số trong phạm vi 1000 theo các hàng trăm, chục, đơn vị.","Tìm số hạng chưa biết: lấy tổng trừ đi số hạng đã biết. Tìm số bị trừ: lấy hiệu cộng với số trừ. Tìm số trừ: lấy số bị trừ trừ đi hiệu.","Cộng, trừ trong phạm vi 1000: đặt thẳng cột, tính từ phải sang trái."],
"m3-bang": ["Thuộc bảng nhân, bảng chia từ 2 đến 9; nhân và chia là hai phép tính ngược nhau.","Từ một phép nhân viết được hai phép chia: 6 × 7 = 42 thì 42 : 6 = 7 và 42 : 7 = 6.","Tìm thừa số chưa biết: lấy tích chia cho thừa số đã biết."],
"m3-phan": ["Một phần mấy của một nhóm: chia nhóm thành các phần bằng nhau rồi lấy 1 phần.","Muốn tìm 1 phần của một số, lấy số đó chia cho số phần. Ví dụ: 1/3 của 12 là 12 : 3 = 4.","Viết một phần hai là 1/2, một phần ba là 1/3; số ở dưới cho biết cả nhóm chia thành bao nhiêu phần bằng nhau."],
"m3-hinh": ["Trung điểm của đoạn thẳng nằm ở chính giữa và cách đều hai đầu mút.","Hình tròn có tâm; bán kính nối tâm với một điểm trên đường tròn; đường kính gấp đôi bán kính. Góc vuông là góc bằng góc ê-ke (90°).","Khối hộp chữ nhật có 6 mặt là hình chữ nhật, 8 đỉnh, 12 cạnh; khối lập phương có 6 mặt là hình vuông bằng nhau."],
"m3-nc100": ["Nhân số có hai chữ số với số có một chữ số: nhân từ hàng đơn vị, nhớ sang hàng chục khi cần.","Phép chia có dư: số dư luôn bé hơn số chia; số bị chia = thương × số chia + số dư.","Gấp một số lên nhiều lần thì nhân; giảm một số đi nhiều lần thì chia."],
"m3-donvi": ["1 cm = 10 mm; 1 m = 1000 mm.","1 kg = 1000 g; 1 l = 1000 ml.","Nhiệt độ đo bằng độ C (°C): nước đá đang tan ở 0°C, nước đang sôi ở 100°C."],
"m3-nc1000": ["Thứ tự tính biểu thức: trong ngoặc trước; không có ngoặc thì nhân, chia trước, cộng, trừ sau.","Biểu thức chỉ có cộng, trừ (hoặc chỉ có nhân, chia) thì tính lần lượt từ trái sang phải.","Nhân, chia số có ba chữ số với số có một chữ số: đặt tính thẳng cột như đã học."],
"m3-so10000": ["Số đến 10 000 gồm các hàng: chục nghìn, nghìn, trăm, chục, đơn vị.","So sánh các số: số có nhiều chữ số hơn thì lớn hơn; bằng nhau về số chữ số thì so từng hàng từ trái sang phải.","Làm tròn số đến hàng trăm: nhìn chữ số hàng chục — từ 5 trở lên thì tròn lên, dưới 5 thì tròn xuống."],
"m3-lama": ["Chữ số La Mã cơ bản: I = 1, V = 5, X = 10, L = 50.","Chữ nhỏ đứng trước chữ lớn thì trừ: IV = 4, IX = 9; chữ giống nhau lặp lại tối đa 3 lần: III = 3, XX = 20.","Đọc số La Mã từ trái sang phải, cộng giá trị các chữ số (trừ trường hợp trừ ở trên)."],
"m3-cvdt": ["Chu vi của hình bằng tổng độ dài các cạnh của hình.","Chu vi hình chữ nhật = (chiều dài + chiều rộng) × 2; chu vi hình vuông = độ dài 1 cạnh × 4.","Diện tích hình chữ nhật = chiều dài × chiều rộng; diện tích hình vuông = cạnh × cạnh (đơn vị diện tích: cm²)."],
"m3-calc10000": ["Cộng, trừ số có bốn chữ số: đặt thẳng cột theo hàng, tính từ phải sang trái.","Nhân, chia số có bốn chữ số với số có một chữ số làm như với số có ba chữ số; kiểm tra kết quả bằng phép tính ngược."],
"m3-so100000": ["Số có năm chữ số gồm các hàng: chục nghìn, nghìn, trăm, chục, đơn vị; số lớn nhất có năm chữ số là 99 999.","Làm tròn số đến hàng nghìn hay chục nghìn: xét chữ số ở hàng ngay bên phải hàng làm tròn.","Cộng, trừ, nhân, chia trong phạm vi 100 000 vẫn đặt tính theo hàng như các phạm vi đã học."],
"m3-giotien": ["Mỗi vạch số trên mặt đồng hồ ứng với 5 phút; kim phút chỉ số 6 là 30 phút, chỉ số 3 là 15 phút.","1 năm có 12 tháng; tháng có 31 ngày là 1, 3, 5, 7, 8, 10, 12; tháng 2 có 28 hoặc 29 ngày.","Khi mua hàng: tiền thừa = số tiền đưa cho người bán − giá tiền hàng."],
"m3-thongke": ["Đọc bảng số liệu: xác định đúng hàng và cột giao nhau để lấy số liệu cần dùng.","Sự kiện chắc chắn nhất định xảy ra; sự kiện không thể không bao giờ xảy ra; sự kiện có thể có thể xảy ra hoặc không."]
});
/* BƯỚC 1 — BỔ SUNG 2026-10-14: khối bù dữ kiện trong trang vỏ (harvestTopic)
   gọi hàm vnNum4 khi xử lí hai chủ đề m3-so10000 và m3-so100000, nhưng trang vỏ
   không định nghĩa hàm này → ReferenceError làm processTopic chết giữa chừng,
   hai chủ đề mất toàn bộ tầng nâng cao. Định nghĩa vnNum4 tại đây (trước khi
   gọi Phase B bên dưới), uỷ thác cho chính hàm đọc số vnNum3 của thư viện
   dùng chung để cách đọc số 4–5 chữ số khớp 100% với bộ sinh câu hỏi chuẩn. */
if (typeof window.vnNum4 !== "function") {
  window.vnNum4 = function (n) { return window.vnNum3(n); };
}
  if (typeof window.__phaseBProcessGrade === "function") window.__phaseBProcessGrade(3);
  if (typeof window.__phaseCompleteGrade === "function") window.__phaseCompleteGrade(3);
