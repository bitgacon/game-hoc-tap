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
      { id: "m3-so10000", emoji: "💯", name: "Các số đến 10 000", sub: "Bài 45–49 • Đọc, viết, so sánh, làm tròn", pools: { choose: [g3ReadNum(10000), g3ComposeNum(true), g3CompareBig(10000), g3Round(10), g3Round(100)], blank: [g3SeqBlank([100, 1000], 10000)], match: [g3MatchRead(10000)], games: [g3MemRead(10000), g3SortBigCap(10000), gTFCalcFactory(100)] } },
      { id: "m3-lama", emoji: "🏛️", name: "Chữ số La Mã", sub: "Bài 47 • I, V, X — đọc và viết số đến 20", pools: { choose: [g3RomanToNum, g3NumToRoman, function () { return mcqQ("Số 20 viết bằng chữ số La Mã là?", ["XV", "XIX"], "XX", "20 = 10 + 10 nên viết là XX (X = 10)."); }, function () { return mcqQ("Số 4 viết bằng chữ số La Mã là?", ["IIII", "VI"], "IV", "Số 4 viết là IV (5 − 1), không viết IIII."); }], blank: [g3RomanBlank], match: [g3RomanMatch], games: g3RomanGames() } },
      { id: "m3-cvdt", emoji: "▦", name: "Chu vi và diện tích", sub: "Bài 50–53 • Tam giác, tứ giác, chữ nhật, hình vuông", pools: { choose: [g3PeriArea, g3PeriArea, g3PeriArea], blank: [g3BlankPeri], match: [g3PeriMatch], games: [gMemCalcFactory(100), gTFCalcFactory(100), gCatchAnswerFactory(100)] } },
      { id: "m3-calc10000", emoji: "🧮", name: "Tính trong phạm vi 10 000", sub: "Bài 54–58 • Cộng, trừ, nhân, chia số có bốn chữ số", pools: { choose: [g3AddSubBig(10000), g3AddSubBig(10000), g3Mul4x1, g3Div4x1], blank: [g3BlankBig], match: [g3MatchCalcBig], games: [gMemCalcFactory(100), gTFCalcFactory(100), g3SortBig(10000)] } },
      { id: "m3-so100000", emoji: "🚀", name: "Số đến 100 000 và tính toán", sub: "Bài 59–72 • Số 5 chữ số, làm tròn, cộng trừ nhân chia", pools: { choose: [g3ReadNum(100000), g3CompareBig(100000), g3Round(1000), g3Round(10000), g3AddSubBig(100000), g3MulDiv100000], blank: [g3SeqBlank([1000, 10000], 100000)], match: [g3MatchRead(100000)], games: [g3MemRead(100000), g3SortBigCap(100000), gTFCalcFactory(100)] } },
      { id: "m3-giotien", emoji: "🕐", name: "Đồng hồ, tháng – năm, tiền Việt Nam", sub: "Bài 66–69 • Giờ đến phút, lịch, các mệnh giá tiền", pools: { choose: [g2ClockMin, gtMoneyStd, gtMoneyStd, function () { return mcqQ("Tháng 2 của năm thường có bao nhiêu ngày?", ["30 ngày", "31 ngày"], "28 ngày", "Năm thường tháng 2 có 28 ngày; năm nhuận có 29 ngày."); }, function () { return mcqQ("Năm nhuận, tháng 2 có bao nhiêu ngày?", ["28 ngày", "30 ngày"], "29 ngày", "Cứ 4 năm có một năm nhuận, tháng 2 có 29 ngày."); }, function () { return mcqQ("Tháng nào sau đây có 31 ngày?", ["Tháng 4", "Tháng 6"], "Tháng 1", "Các tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày; tháng 4, 6, 9, 11 có 30 ngày."); }, function () { return mcqQ("Tháng 4 có bao nhiêu ngày?", ["31 ngày", "28 ngày"], "30 ngày", "Tháng 4, 6, 9, 11 có 30 ngày."); }, function () { return mcqQ("Một năm có bao nhiêu tháng?", ["10 tháng", "365 tháng"], "12 tháng", "Một năm có 12 tháng."); }], blank: [qBlankClock, gtMoneyBlankStd], match: [mClockHour, g3MoneyMatch], games: [gSortDays, gMemClock, gTFClock] } },
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
        ["Đầu lời nói của nhân vật trong hội thoại thường có dấu nào?", "Dấu gạch ngang đầu dòng (–)", "Dấu chấm than", "Dấu ngoặc đơn", "Dấu gạch ngang đầu dòng đánh dấu lời nói của nhân vật."],
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
        ["Truyện “Sự tích ông Đùng, bà Đùng” thuộc chủ đề nào?", "Đất nước ngàn năm", "Những sắc màu thiên nhiên", "Bài học từ cuộc sống", "Bài 22 thuộc chủ đề Đất nước ngàn năm (Tập Hai)."]
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
        /* v16: vòng tranh chỉ dùng từ qua cổng tranh trong unit; thiếu từ thì lùi về TF khẳng định nghĩa (dạng chữ). */
        var pw = engPicWords(u.words);
        if (pw.length >= 2) {
          var w = pick(pw);
          var truth = Math.random() < 0.5;
          var shown = truth ? w : (engDistractors(w, u.words, 1, { pic: true, gloss: true })[0] || w);
          return { kind: "tf", badge: "🎮 Trò chơi!", prompt: "Đúng hay sai? Chạm nhanh nhé!", rounds: [{ visual: '<div class="big-pic">' + picHTML(w) + '</div><div class="big-word">' + shown[0] + "</div>", truth: truth, explain: "Từ đúng là “" + w[0] + "”" }] };
        }
        var w2 = pick(u.words);
        var truth2 = Math.random() < 0.5;
        var shown2 = truth2 ? w2 : (engDistractors(w2, u.words, 1, { gloss: true })[0] || w2);
        return { kind: "tf", badge: "🎮 Trò chơi!", prompt: "Đúng hay sai? Chạm nhanh nhé!", rounds: [{ visual: '<div class="big-word">' + w2[0] + '</div><div class="sentence">Nghĩa là “' + shown2[2] + "”</div>", truth: truth2, explain: "“" + w2[0] + "” nghĩa là “" + w2[2] + "”" }] };
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
        ["Lá cây có chức năng chính nào?", "Tạo chất dinh dưỡng cho cây", "Hút nước từ đất", "Nâng đỡ cây đứng thẳng", "Nhờ ánh sáng mặt trời, lá tạo ra chất dinh dưỡng để nuôi cây và thải khí ô-xi."],
        ["Hoa của cây có chức năng gì?", "Sinh sản để tạo quả và hạt", "Hút nước từ đất", "Vận chuyển chất dinh dưỡng", "Hoa là cơ quan sinh sản của cây có hoa."],
        ["Vì sao cần tưới nước, bón phân cho cây trồng?", "Để cây đủ nước, đủ dinh dưỡng mà sinh trưởng tốt", "Để cây nhanh héo úa", "Không cần thiết chút nào", "Chăm sóc đúng cách giúp cây lớn nhanh, khoẻ mạnh."],
        ["Bộ phận nào giúp cá hô hấp dưới nước?", "Mang cá", "Vây cá", "Đuôi cá", "Cá hô hấp bằng mang."],
        ["Bộ phận nào giúp chim bay được?", "Cánh và bộ lông nhẹ, xốp", "Mỏ chim", "Chân chim", "Cánh cùng bộ lông nhẹ giúp chim bay lên."],
        ["Sử dụng hợp lí thực vật và động vật nghĩa là gì?", "Khai thác vừa đủ, đồng thời bảo vệ và chăm sóc, gây trồng thêm", "Khai thác càng nhiều càng tốt", "Phá rừng, săn bắt tuỳ tiện", "Dùng hợp lí để tài nguyên không bị cạn kiệt."]
      ], [["Rễ", "Hút nước, muối khoáng"], ["Lá", "Tạo chất dinh dưỡng cho cây"], ["Thân", "Vận chuyển và nâng đỡ"], ["Mang cá", "Giúp cá hô hấp"]], "Nối bộ phận với chức năng nhé!"),
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
        ["Vùng quanh xích đạo nóng quanh năm thuộc đới nào?", "Đới nóng (nhiệt đới)", "Đới lạnh (hàn đới)", "Đới ôn hoà", "Khu vực gần xích đạo thuộc đới nóng."],
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
        ["Đã hứa giúp bạn ôn bài nhưng em lại muốn đi chơi. Em nên làm gì?", "Vẫn giúp bạn như đã hứa, đi chơi sau", "Bỏ bạn để đi chơi luôn", "Nói dối rằng em bị ốm", "Đã hứa thì phải giữ lời."],
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
        ["Đèn tín hiệu chuyển sang đỏ, người đi bộ phải làm gì?", "Dừng lại, chờ đèn xanh mới đi", "Cứ đi vì mình là người đi bộ", "Chạy thật nhanh qua", "Đèn đỏ phải dừng lại, đèn xanh mới được đi."],
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
        ["Thấy dự báo mai có mưa nên mang áo mưa — đó là ví dụ về điều gì?", "Dùng thông tin để đưa ra quyết định", "Máy tính tự quyết định thay em", "Lưu trữ thông tin trong máy", "Thông tin giúp em quyết định mang áo mưa."],
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
        ["Trang web lạ yêu cầu nhập họ tên, địa chỉ nhà. Em nên làm gì?", "Không nhập và báo cho bố mẹ hoặc thầy cô", "Nhập ngay cho nhanh", "Gửi đường link cho nhiều bạn cùng nhập", "Cẩn thận với yêu cầu cung cấp thông tin cá nhân."],
        ["Tìm thông tin trên Internet, em gõ từ khoá vào đâu?", "Ô tìm kiếm của trang tìm kiếm", "Bất cứ ô trống nào trên màn hình", "Trong cửa sổ trò chơi", "Dùng công cụ tìm kiếm với từ khoá phù hợp."]
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
        ["Nhận tin nhắn lạ có đường link đáng ngờ, em nên làm gì?", "Không bấm vào và hỏi ý kiến người lớn", "Bấm vào xem ngay cho biết", "Chuyển tiếp cho thật nhiều bạn", "Đường link lạ có thể chứa mã độc hoặc lừa đảo."],
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
        ["Câu “Nếu làm xong bài tập thì được đi chơi”: chưa làm xong thì sao?", "Chưa được đi chơi, vì điều kiện chưa xảy ra", "Vẫn đi chơi như thường", "Được đi chơi gấp đôi", "Điều kiện không xảy ra thì việc sau “thì” không được thực hiện."]
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
        ["Máy thu hình khác máy thu thanh ở điểm nào?", "Ti vi xem được cả hình ảnh và âm thanh", "Ti vi chỉ nghe được âm thanh", "Ti vi nhỏ hơn radio rất nhiều", "Ti vi trình chiếu hình ảnh kèm theo âm thanh."],
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
        ["Biển báo hình người đi bộ trên vạch kẻ cho biết điều gì?", "Nơi dành cho người đi bộ sang đường", "Cấm người đi bộ qua lại", "Khu vực chơi bóng đá", "Biển chỉ dẫn vị trí sang đường cho người đi bộ."],
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
  /* ---------- TOÁN 3 (B1-SỬA 2026-10-15 — đa dạng hoá phép tính nền) ---------- */
  "m3-so10000": [
    ["2413 + 3524 bằng bao nhiêu?", "5937", "6937", "4937", "2413 + 3524 = 5937."],
    ["4215 + 2683 bằng bao nhiêu?", "6898", "7898", "5898", "4215 + 2683 = 6898."],
    ["1346 + 5213 bằng bao nhiêu?", "6559", "7559", "5559", "1346 + 5213 = 6559."],
    ["3052 + 4716 bằng bao nhiêu?", "7768", "8768", "6768", "3052 + 4716 = 7768."],
    ["5240 + 3628 bằng bao nhiêu?", "8868", "9868", "7868", "5240 + 3628 = 8868."],
    ["6135 + 2457 bằng bao nhiêu?", "8592", "9592", "7592", "6135 + 2457 = 8592."],
    ["8742 − 3451 bằng bao nhiêu?", "5291", "6291", "4291", "8742 − 3451 = 5291."],
    ["7405 − 2184 bằng bao nhiêu?", "5221", "6221", "4221", "7405 − 2184 = 5221."],
    ["9631 − 4207 bằng bao nhiêu?", "5424", "6424", "4424", "9631 − 4207 = 5424."],
    ["6824 − 3462 bằng bao nhiêu?", "3362", "4362", "2362", "6824 − 3462 = 3362."],
    ["5290 − 2175 bằng bao nhiêu?", "3115", "4115", "2115", "5290 − 2175 = 3115."],
    ["9063 − 5248 bằng bao nhiêu?", "3815", "4815", "2815", "9063 − 5248 = 3815."],
    ["314 × 3 bằng bao nhiêu?", "942", "1942", "1042", "314 × 3 = 942."],
    ["2314 × 4 bằng bao nhiêu?", "9256", "10256", "8256", "2314 × 4 = 9256."],
    ["1205 × 6 bằng bao nhiêu?", "7230", "8230", "6230", "1205 × 6 = 7230."],
    ["9636 : 3 bằng bao nhiêu?", "3212", "4212", "2212", "9636 : 3 = 3212."],
    ["8848 : 4 bằng bao nhiêu?", "2212", "3212", "1212", "8848 : 4 = 2212."],
    ["7776 : 6 bằng bao nhiêu?", "1296", "2296", "296", "7776 : 6 = 1296."]
  ],
  "m3-so100000": [
    ["24135 + 31246 bằng bao nhiêu?", "55381", "56381", "54381", "24135 + 31246 = 55381."],
    ["45213 + 27584 bằng bao nhiêu?", "72797", "73797", "71797", "45213 + 27584 = 72797."],
    ["13457 + 52136 bằng bao nhiêu?", "65593", "66593", "64593", "13457 + 52136 = 65593."],
    ["62305 + 15478 bằng bao nhiêu?", "77783", "78783", "76783", "62305 + 15478 = 77783."],
    ["28540 + 36275 bằng bao nhiêu?", "64815", "65815", "63815", "28540 + 36275 = 64815."],
    ["11236 + 43509 bằng bao nhiêu?", "54745", "55745", "53745", "11236 + 43509 = 54745."],
    ["58742 − 23451 bằng bao nhiêu?", "35291", "36291", "34291", "58742 − 23451 = 35291."],
    ["74506 − 31284 bằng bao nhiêu?", "43222", "44222", "42222", "74506 − 31284 = 43222."],
    ["96318 − 45207 bằng bao nhiêu?", "51111", "52111", "50111", "96318 − 45207 = 51111."],
    ["43825 − 21463 bằng bao nhiêu?", "22362", "23362", "21362", "43825 − 21463 = 22362."],
    ["67290 − 34175 bằng bao nhiêu?", "33115", "34115", "32115", "67290 − 34175 = 33115."],
    ["85603 − 52348 bằng bao nhiêu?", "33255", "34255", "32255", "85603 − 52348 = 33255."],
    ["2314 × 3 bằng bao nhiêu?", "6942", "7942", "5942", "2314 × 3 = 6942."],
    ["12403 × 2 bằng bao nhiêu?", "24806", "25806", "23806", "12403 × 2 = 24806."],
    ["21305 × 4 bằng bao nhiêu?", "85220", "86220", "84220", "21305 × 4 = 85220."],
    ["36936 : 4 bằng bao nhiêu?", "9234", "10234", "8234", "36936 : 4 = 9234."],
    ["45630 : 5 bằng bao nhiêu?", "9126", "10126", "8126", "45630 : 5 = 9126."],
    ["84084 : 7 bằng bao nhiêu?", "12012", "13012", "11012", "84084 : 7 = 12012."]
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
    ["Một bộ phim bắt đầu lúc 19 giờ, kéo dài 2 giờ. Phim kết thúc lúc mấy giờ?", "21 giờ", "17 giờ", "20 giờ", "Giờ kết thúc = 19 + 2 = 21 giờ."],
    ["Em thức dậy lúc 6 giờ sáng và đến trường lúc 7 giờ. Từ lúc thức dậy đến lúc đến trường là bao nhiêu phút?", "60 phút", "30 phút", "45 phút", "Từ 6 giờ đến 7 giờ là 1 giờ = 60 phút."],
    ["Giờ vào học là 7 giờ 30 phút. Lúc đó kim phút chỉ số mấy?", "Số 6", "Số 3", "Số 12", "Mỗi số trên mặt đồng hồ ứng với 5 phút: 30 : 5 = 6, kim phút chỉ số 6."],
    ["Một quyển vở giá 8 000 đồng. Mua 3 quyển vở như thế hết bao nhiêu tiền?", "24 000 đồng", "11 000 đồng", "21 000 đồng", "8 000 × 3 = 24 000 đồng."],
    ["Một cây bút giá 5 000 đồng, một cái thước giá 3 000 đồng. Mua cả hai món hết bao nhiêu tiền?", "8 000 đồng", "2 000 đồng", "15 000 đồng", "5 000 + 3 000 = 8 000 đồng."],
    ["Vé xem phim giá 40 000 đồng. Em đưa tờ 50 000 đồng. Em được trả lại bao nhiêu tiền?", "10 000 đồng", "20 000 đồng", "90 000 đồng", "50 000 − 40 000 = 10 000 đồng."],
    ["Một ổ bánh mì giá 10 000 đồng. Mẹ mua 2 ổ bánh mì và đưa tờ 50 000 đồng. Mẹ được trả lại bao nhiêu tiền?", "30 000 đồng", "40 000 đồng", "20 000 đồng", "Hai ổ bánh mì hết 10 000 × 2 = 20 000 đồng; trả lại 50 000 − 20 000 = 30 000 đồng."],
    ["Tháng 10 có bao nhiêu ngày?", "31 ngày", "30 ngày", "29 ngày", "Tháng 10 thuộc nhóm tháng có 31 ngày: 1, 3, 5, 7, 8, 10, 12."],
    ["Tháng 11 có bao nhiêu ngày?", "30 ngày", "31 ngày", "28 ngày", "Các tháng 4, 6, 9, 11 có 30 ngày."],
    ["Hôm nay là thứ hai. Ngày mai là thứ mấy?", "Thứ ba", "Thứ tư", "Chủ nhật", "Sau thứ hai là thứ ba."],
    ["Hôm nay là thứ sáu. Hôm qua là thứ mấy?", "Thứ năm", "Thứ tư", "Thứ bảy", "Đứng ngay trước thứ sáu là thứ năm."],
    ["Một buổi học bắt đầu lúc 8 giờ và kết thúc lúc 10 giờ 30 phút. Buổi học kéo dài bao lâu?", "2 giờ 30 phút", "2 giờ", "3 giờ 30 phút", "Từ 8 giờ đến 10 giờ 30 phút là 2 giờ 30 phút."],
    ["Em tập thể dục từ 6 giờ 15 phút đến 6 giờ 45 phút. Em tập trong bao lâu?", "30 phút", "15 phút", "60 phút", "Từ 6 giờ 15 phút đến 6 giờ 45 phút là 45 − 15 = 30 phút."],
    ["Hai tờ 20 000 đồng và một tờ 10 000 đồng là bao nhiêu tiền?", "50 000 đồng", "40 000 đồng", "30 000 đồng", "20 000 + 20 000 + 10 000 = 50 000 đồng."],
    ["Một tờ 200 000 đồng đổi được mấy tờ 100 000 đồng?", "2 tờ", "5 tờ", "10 tờ", "200 000 : 100 000 = 2 tờ."],
    ["Em đi ngủ lúc 21 giờ. Đó là mấy giờ tối?", "9 giờ tối", "8 giờ tối", "10 giờ tối", "21 giờ là 9 giờ tối."],
    ["Đồng hồ chỉ 15 giờ. Đó là mấy giờ chiều?", "3 giờ chiều", "5 giờ chiều", "2 giờ chiều", "15 − 12 = 3, tức 3 giờ chiều."]
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
  /* TOÁN 3 (B1-SỬA 2026-10-15): cặp dữ kiện giờ – lịch – tiền cho m3-giotien */
  "m3-giotien": [["Kim phút chỉ số 6", "30 phút"], ["Kim phút chỉ số 3", "15 phút"], ["Kim phút chỉ số 9", "45 phút"], ["Kim phút chỉ số 12", "Giờ đúng (0 phút)"], ["Một tuần lễ", "7 ngày"], ["Tháng 2 của năm thường", "28 ngày"], ["Tháng 12", "31 ngày"], ["Một năm", "12 tháng"], ["Tờ 100 000 đồng", "10 tờ 10 000 đồng"], ["Tờ 50 000 đồng", "5 tờ 10 000 đồng"]],
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
    return calcMCQ("Chữ số ở hàng " + p[1] + " của số này là chữ số nào?", String(fmtN(n)), d, 0, 9, "Số " + fmtN(n) + ": chữ số ở hàng " + p[1] + " là " + d + ".");
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
  /* Sửa B1-P0 (2026-10-15): trước đây mốc cuối = h giờ (m1+add) phút KHÔNG trừ
     giờ khi phút >= 60 → sinh mốc không tồn tại kiểu "5 giờ 65 phút". Nay tính
     theo tổng số phút rồi đổi lại giờ–phút có nhớ (phút luôn 0–59). */
  var tot1 = h * 60 + m1, tot2 = tot1 + add;
  var txt = function (tot) { var hh = Math.floor(tot / 60), mm = tot % 60; return hh + " giờ" + (mm === 0 ? "" : " " + mm + " phút"); };
  return calcMCQ("Từ " + txt(tot1) + " đến " + txt(tot2) + " là bao nhiêu phút?", txt(tot1) + " → " + txt(tot2), add, 5, 60, txt(tot1) + " → " + txt(tot2) + ": thêm " + add + " phút.");
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

/* ================= B1-SỬA (2026-10-15) — XÂY LẠI NGÂN HÀNG MỎNG =================
   Ba chủ đề Toán 3 được xây lại tại nguồn:
   • m3-so100000 / m3-so10000: tầng nâng cao cũ suy biến quanh đúng 2 phép tính
     nền của trang vỏ (12345 + 23456 và 56789 − 12345 chiếm ~95% câu nâng cao đo
     được). Bộ sinh "nm" dưới đây bốc SỐ NGẪU NHIÊN MỚI trong đúng phạm vi chủ
     đề ở mỗi lần gọi — không còn phép tính nền cố định: bài toán có lời văn
     (hai bước, dữ kiện thừa, tìm số chưa biết), giá trị chữ số, đổi chỗ chữ số,
     làm tròn xuôi và ngược, tìm khẳng định sai (chỉ trong phạm trù số), dãy số.
   • m3-giotien: tiền luôn là số TRÒN hợp thực tế (bội của 1 000 đồng, nhiễu
     cũng tròn); khẳng định đúng/sai lấy từ ngân hàng khẳng định theo phạm trù
     (giờ / lịch / tiền) — khẳng định sai chỉ sai GIÁ TRỊ trong cùng phạm trù,
     không còn ghép "một tuần lễ" với "đồng". */
function g3SortBigCap(max) {
  /* Thay g3SortBig của trang vỏ cho hai chủ đề số: bản vỏ sinh dãy tới
     200 000 (chủ đề 100 000) và 43 000 (chủ đề 10 000) — vượt phạm vi bài. */
  return function () {
    var step = pick(max >= 100000 ? [100, 500, 1000, 5000] : [50, 100, 250, 500]);
    var kmax = Math.max(2, Math.floor((max - step * 3) / step));
    var start = step * rand(1, kmax);
    var arr = shuffle([0, 1, 2, 3].map(function (i) { return start + i * step; }));
    return sortQ("Sắp xếp các số sau theo thứ tự từ bé đến lớn nhé!", arr.map(function (n) { return { html: '<span class="opt-num">' + fmtN(n) + "</span>", text: String(fmtN(n)) }; }), "Thứ tự đúng: " + [0, 1, 2, 3].map(function (i) { return fmtN(start + i * step); }).join(", ") + ".");
  };
}
function nmNum(R) { return rand(Math.floor(R / 10), R - 1); }
function nmWrongs(res, steps) {
  var out = [];
  (steps || [1000, 100, 2000, 10, 500, 5000]).forEach(function (d) {
    [res + d, res - d].forEach(function (v) { if (out.length < 2 && v > 0 && v !== res && out.indexOf(v) === -1) out.push(v); });
  });
  while (out.length < 2) { var v = res + (out.length + 3) * 1000; if (out.indexOf(v) === -1) out.push(v); }
  return out;
}
function nmMCQ(prompt, res, explain) {
  var w = nmWrongs(res);
  return mcqQ(prompt, [String(fmtN(w[0])), String(fmtN(w[1]))], String(fmtN(res)), explain);
}
var NM_PLACE_NAMES = { 1: "đơn vị", 10: "chục", 100: "trăm", 1000: "nghìn", 10000: "chục nghìn" };
function nmPlacesOf(R) { return R >= 100000 ? [10000, 1000, 100, 10, 1] : [1000, 100, 10, 1]; }

function nmStoryAddSub(R) {
  return function () {
    var form = rand(0, 7), a, b, c, res;
    if (form === 0) {
      a = nmNum(R); b = rand(Math.floor(R / 20), Math.floor(a * 0.7));
      res = a - b;
      return nmMCQ("Thư viện trường có " + fmtN(a) + " quyển sách. Học sinh mượn " + fmtN(b) + " quyển. Thư viện còn lại bao nhiêu quyển sách?", res, fmtN(a) + " − " + fmtN(b) + " = " + fmtN(res) + " (quyển).");
    }
    if (form === 1) {
      a = nmNum(R); b = rand(Math.floor(R / 20), Math.floor(a * 0.7));
      res = a - b;
      return nmMCQ("Một cửa hàng có " + fmtN(a) + " kg gạo. Buổi sáng, cửa hàng bán được " + fmtN(b) + " kg gạo. Cửa hàng còn lại bao nhiêu ki-lô-gam gạo?", res, fmtN(a) + " − " + fmtN(b) + " = " + fmtN(res) + " (kg).");
    }
    if (form === 2) {
      a = rand(Math.floor(R / 10), Math.floor(R * 0.55)); b = rand(Math.floor(R / 10), Math.floor(R * 0.4));
      res = a + b;
      return nmMCQ("Trường Tiểu học A có " + fmtN(a) + " học sinh, trường Tiểu học B có " + fmtN(b) + " học sinh. Cả hai trường có tất cả bao nhiêu học sinh?", res, fmtN(a) + " + " + fmtN(b) + " = " + fmtN(res) + " (học sinh).");
    }
    if (form === 3) {
      a = rand(Math.floor(R / 10), Math.floor(R * 0.55)); b = rand(Math.floor(R / 10), Math.floor(R * 0.4));
      res = a + b;
      return nmMCQ("Một ô tô buổi sáng đi được " + fmtN(a) + " m, buổi chiều đi được " + fmtN(b) + " m. Cả ngày ô tô đi được bao nhiêu mét?", res, fmtN(a) + " + " + fmtN(b) + " = " + fmtN(res) + " (m).");
    }
    if (form === 4) {
      a = nmNum(R); b = rand(Math.floor(R / 20), Math.floor(a * 0.6));
      res = a - b;
      return nmMCQ("Xưởng thứ nhất làm được " + fmtN(a) + " sản phẩm. Xưởng thứ hai làm được ít hơn xưởng thứ nhất " + fmtN(b) + " sản phẩm. Xưởng thứ hai làm được bao nhiêu sản phẩm?", res, fmtN(a) + " − " + fmtN(b) + " = " + fmtN(res) + " (sản phẩm).");
    }
    if (form === 5) {
      a = nmNum(R); b = rand(Math.floor(R / 20), Math.floor(a * 0.8));
      res = a - b;
      return nmMCQ("Số " + fmtN(a) + " hơn số " + fmtN(b) + " bao nhiêu?", res, fmtN(a) + " − " + fmtN(b) + " = " + fmtN(res) + ".");
    }
    if (form === 6) {
      a = rand(Math.floor(R / 10), Math.floor(R * 0.5)); b = rand(Math.floor(R / 20), Math.floor(R * 0.3)); c = rand(50, Math.floor((a + b) * 0.6));
      res = a + b - c;
      return nmMCQ("Một kho có " + fmtN(a) + " bao gạo. Kho nhập thêm " + fmtN(b) + " bao gạo rồi xuất đi " + fmtN(c) + " bao gạo. Trong kho còn lại bao nhiêu bao gạo?", res, "Nhập thêm: " + fmtN(a) + " + " + fmtN(b) + " = " + fmtN(a + b) + "; còn lại: " + fmtN(a + b) + " − " + fmtN(c) + " = " + fmtN(res) + " (bao).");
    }
    a = rand(Math.floor(R / 10), Math.floor(R * 0.5)); b = rand(Math.floor(R / 20), Math.floor(R * 0.35));
    res = a + b;
    var extra = R >= 100000 ? "một hộp bút giá " + fmtN(rand(5, 40) * 1000) + " đồng" : "một cái thước kẻ dài 20 cm";
    return nmMCQ("Nam có " + fmtN(a) + " viên bi xanh, " + fmtN(b) + " viên bi đỏ và " + extra + ". Nam có tất cả bao nhiêu viên bi?", res, "Chỉ cộng số bi: " + fmtN(a) + " + " + fmtN(b) + " = " + fmtN(res) + " (viên). Dữ kiện về " + (R >= 100000 ? "hộp bút" : "cái thước") + " không dùng đến.");
  };
}
function nmStoryMulDiv(R) {
  return function () {
    var form = rand(0, 4), per, n, res;
    if (form === 0) {
      per = rand(12, Math.floor(R / 12)); n = rand(2, 9); res = per * n;
      return nmMCQ("Mỗi hộp có " + fmtN(per) + " cái bút. Có " + n + " hộp như thế. Có tất cả bao nhiêu cái bút?", res, fmtN(per) + " × " + n + " = " + fmtN(res) + " (cái).");
    }
    if (form === 1) {
      per = rand(12, Math.floor(R / 12)); n = rand(2, 9); res = per;
      return nmMCQ(fmtN(per * n) + " cái kẹo được chia đều cho " + n + " bạn. Mỗi bạn được bao nhiêu cái kẹo?", res, fmtN(per * n) + " : " + n + " = " + fmtN(per) + " (cái).");
    }
    if (form === 2) {
      per = rand(12, Math.floor(R / 12)); n = rand(2, 9); res = per;
      return nmMCQ("Có " + fmtN(per * n) + " quyển sách, xếp đều vào " + n + " chồng. Mỗi chồng có bao nhiêu quyển sách?", res, fmtN(per * n) + " : " + n + " = " + fmtN(per) + " (quyển).");
    }
    if (form === 3) {
      per = rand(12, Math.floor(R / 15)); n = rand(2, 9); var add = rand(5, 60); res = per * n + add;
      return nmMCQ("Cô giáo mua " + n + " hộp bút, mỗi hộp " + fmtN(per) + " cái, và mua thêm " + add + " cái bút lẻ. Cô giáo mua tất cả bao nhiêu cái bút?", res, n + " hộp có " + fmtN(per) + " × " + n + " = " + fmtN(per * n) + " cái; tất cả: " + fmtN(per * n) + " + " + add + " = " + fmtN(res) + " (cái).");
    }
    per = rand(12, Math.floor(R / 12)); n = rand(2, 9);
    if (Math.random() < 0.5) {
      res = per * n;
      return nmMCQ("Một sợi dây dài " + fmtN(per) + " cm. Một sợi dây khác dài gấp " + n + " lần sợi dây đó. Sợi dây khác dài bao nhiêu xăng-ti-mét?", res, fmtN(per) + " × " + n + " = " + fmtN(res) + " (cm).");
    }
    res = per;
    return nmMCQ("Một thùng có " + fmtN(per * n) + " quả cam, chia đều vào " + n + " túi. Số cam trong mỗi túi ít hơn số cam trong thùng bao nhiêu quả?", per * n - per, "Mỗi túi có " + fmtN(per * n) + " : " + n + " = " + fmtN(per) + " quả; ít hơn thùng: " + fmtN(per * n) + " − " + fmtN(per) + " = " + fmtN(per * n - per) + " (quả).");
  };
}
function nmDigitValue(R) {
  return function () {
    var n = 0, s = "", idxs = [], tries = 0;
    /* Chỉ hỏi chữ số xuất hiện ĐÚNG một lần trong số — tránh câu mơ hồ kiểu
       "chữ số 8 trong số 88 881" (bốn chữ số 8 có bốn giá trị khác nhau). */
    while (tries++ < 15) {
      n = nmNum(R); s = String(n); idxs = [];
      for (var i = 0; i < s.length; i++) if (s[i] !== "0" && s.split(s[i]).length - 1 === 1) idxs.push(i);
      if (idxs.length) break;
    }
    if (!idxs.length) return nmCompose(R)();
    var i = pick(idxs), d = +s[i], place = Math.pow(10, s.length - 1 - i), val = d * place;
    var cand = [d, d * 10, d * 100, d * 1000, d * 10000, place, val + place, val * 10].filter(function (v, ix, arr) { return v !== val && v > 0 && arr.indexOf(v) === ix; });
    var w = shuffle(cand).slice(0, 2);
    return mcqQ("Chữ số " + d + " trong số " + fmtN(n) + " có giá trị là bao nhiêu?", [String(fmtN(w[0])), String(fmtN(w[1]))], String(fmtN(val)), "Chữ số " + d + " ở hàng " + NM_PLACE_NAMES[place] + " nên có giá trị là " + fmtN(val) + ".");
  };
}
function nmDigitSwap(R) {
  return function () {
    var n = nmNum(R), s = String(n), tries = 0, i = -1;
    while (tries++ < 20) { var j = rand(0, s.length - 2); if (s[j] !== s[j + 1] && !(j === 0 && s[j + 1] === "0")) { i = j; break; } }
    if (i < 0) { i = 0; if (s[0] === s[1]) return nmDigitValue(R)(); }
    var arr = s.split(""); var tmp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = tmp;
    var n2 = +arr.join(""), diff = Math.abs(n2 - n);
    var p1 = Math.pow(10, s.length - 1 - i), p2 = Math.pow(10, s.length - 2 - i);
    var dir = n2 > n ? "Số mới lớn hơn số cũ: " + fmtN(n2) + " − " + fmtN(n) : "Số mới bé hơn số cũ: " + fmtN(n) + " − " + fmtN(n2);
    return nmMCQ("Đổi chỗ chữ số hàng " + NM_PLACE_NAMES[p1] + " và chữ số hàng " + NM_PLACE_NAMES[p2] + " của số " + fmtN(n) + ", ta được một số mới. Số mới và số cũ hơn kém nhau bao nhiêu?", diff, "Đổi chỗ hai chữ số được số " + fmtN(n2) + ". " + dir + " = " + fmtN(diff) + ".");
  };
}
function nmCompose(R) {
  return function () {
    var L = R >= 100000 ? 5 : 4, digs = [rand(1, 9)];
    for (var i = 1; i < L; i++) digs.push(rand(0, 9));
    var places = nmPlacesOf(R), n = 0;
    digs.forEach(function (d, ix) { n += d * places[ix]; });
    var parts = digs.map(function (d, ix) { return d + " " + NM_PLACE_NAMES[places[ix]]; });
    var swapIx = rand(0, L - 2), arr = digs.slice(), tmp = arr[swapIx]; arr[swapIx] = arr[swapIx + 1]; arr[swapIx + 1] = tmp;
    var nSwap = 0; arr.forEach(function (d, ix) { nSwap += d * places[ix]; });
    var wrongs = [nSwap, n + places[rand(0, L - 1)], n - places[rand(0, L - 1)]].filter(function (v, ix, a2) { return v > 0 && v !== n && a2.indexOf(v) === ix; }).slice(0, 2);
    while (wrongs.length < 2) { var v = n + (wrongs.length + 2) * 1000; if (wrongs.indexOf(v) === -1) wrongs.push(v); }
    return mcqQ("Số gồm " + parts.join(", ") + " là số nào?", wrongs.map(function (v) { return String(fmtN(v)); }), String(fmtN(n)), "Ghép các hàng theo thứ tự: " + parts.join(", ") + " → " + fmtN(n) + ".");
  };
}
function nmReadReverse(R) {
  return function () {
    var n = nmNum(R);
    var read = (typeof window !== "undefined" && (window.vnNum3 || window.vnNum4)) ? (window.vnNum3 || window.vnNum4)(n) : String(n);
    read = read.charAt(0).toUpperCase() + read.slice(1);
    var s = String(n), arr = s.split(""), j = rand(0, s.length - 2), tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
    var nSwap = +arr.join("");
    var place = pick(nmPlacesOf(R));
    var wrongs = [nSwap, n + place, n - place].filter(function (v, ix, a2) { return v > 0 && v !== n && a2.indexOf(v) === ix; }).slice(0, 2);
    while (wrongs.length < 2) { var v = n + (wrongs.length + 2) * 100; if (wrongs.indexOf(v) === -1) wrongs.push(v); }
    return mcqQ("Số nào dưới đây đọc là «" + read + "»?", wrongs.map(function (v) { return String(fmtN(v)); }), String(fmtN(n)), "«" + read + "» là cách đọc của số " + fmtN(n) + ".");
  };
}
function nmRevCalc(R) {
  return function () {
    var op = Math.random() < 0.5 ? "+" : "−", a, b;
    if (op === "+") { a = rand(Math.floor(R / 10), Math.floor(R * 0.6)); b = rand(Math.floor(R / 20), R - a); }
    else { a = nmNum(R); b = rand(Math.floor(R / 20), Math.floor(R * 0.5)); if (b >= a) b = Math.floor(a / 2); }
    var res = op === "+" ? a + b : a - b;
    function expr(x, o, y) { return fmtN(x) + " " + o + " " + fmtN(y); }
    function val(x, o, y) { return o === "+" ? x + y : x - y; }
    var correct = expr(a, op, b), seen = {}, opts = [correct]; seen[res] = 1;
    var variants = [[a + 1000, op, b], [a, op, b + 100], [a, op === "+" ? "−" : "+", b], [a - 1000, op, b], [a, op, b + 1000]];
    for (var i = 0; i < variants.length && opts.length < 4; i++) {
      var v = variants[i], vv = val(v[0], v[1], v[2]);
      if (v[0] > 0 && v[2] > 0 && vv > 0 && !seen[vv]) { seen[vv] = 1; opts.push(expr(v[0], v[1], v[2])); }
    }
    var o2 = shuffle(opts.slice()).map(function (e) { return { html: '<span class="opt-expr">' + e + "</span>", text: e }; });
    return { kind: "choose", big: true, prompt: "Phép tính nào dưới đây có kết quả bằng " + fmtN(res) + "?", options: o2, answer: o2.findIndex(function (o) { return o.text === correct; }), explain: correct + " = " + fmtN(res) + "." };
  };
}
function nmRoundTo(R) {
  return function () {
    var p = pick(R >= 100000 ? [1000, 10000] : [100, 1000]);
    var n = nmNum(R), tries = 0;
    while (tries++ < 6) { var dg = Math.floor(n / (p / 10)) % 10; if (dg >= 3 && dg <= 7) break; n = nmNum(R); }
    var d = Math.floor(n / (p / 10)) % 10;
    var res = (d >= 5 ? Math.floor(n / p) + 1 : Math.floor(n / p)) * p;
    return nmMCQ("Làm tròn số " + fmtN(n) + " đến hàng " + NM_PLACE_NAMES[p] + " được số nào?", res, "Chữ số hàng " + NM_PLACE_NAMES[p / 10] + " của " + fmtN(n) + " là " + d + (d >= 5 ? " (từ 5 trở lên) nên tròn lên" : " (dưới 5) nên tròn xuống") + ": " + fmtN(res) + ".");
  };
}
function nmRoundReverse(R) {
  return function () {
    var p = pick(R >= 100000 ? [1000, 10000] : [100, 1000]);
    var K = p * rand(2, Math.floor(R / p) - 2);
    function inRange(lo, hi) { return rand(Math.ceil(lo), Math.floor(hi)); }
    var correct = inRange(K - p / 2, K + p / 2 - 1);
    var w1 = inRange(K + p / 2, K + 3 * p / 2 - 1), w2 = inRange(K - 3 * p / 2, K - p / 2 - 1);
    var w3 = Math.random() < 0.5 ? inRange(K + p / 2, K + 3 * p / 2 - 1) : inRange(K - 3 * p / 2, K - p / 2 - 1);
    if (w3 === w1 || w3 === w2) w3 += 1;
    function rounded(x) { var d = Math.floor(x / (p / 10)) % 10; return (d >= 5 ? Math.floor(x / p) + 1 : Math.floor(x / p)) * p; }
    return mcqQ("Số nào dưới đây làm tròn đến hàng " + NM_PLACE_NAMES[p] + " được " + fmtN(K) + "?", [String(fmtN(w1)), String(fmtN(w2)), String(fmtN(w3))], String(fmtN(correct)), "Làm tròn đến hàng " + NM_PLACE_NAMES[p] + ": " + fmtN(correct) + " → " + fmtN(K) + "; còn " + fmtN(w1) + " → " + fmtN(rounded(w1)) + ", " + fmtN(w2) + " → " + fmtN(rounded(w2)) + ", " + fmtN(w3) + " → " + fmtN(rounded(w3)) + ".");
  };
}
function nmStmt(R, kind, wantTrue) {
  var a, b, c;
  if (kind === 0 || kind === 1) {
    a = nmNum(R); b = rand(Math.floor(R / 20), Math.floor(R * 0.5));
    if (kind === 0 && a + b > R) { a = Math.floor(R * 0.6); b = rand(Math.floor(R / 20), Math.floor(R * 0.35)); }
    var delta = pick([100, 1000, -100, -1000, 10, -10]);
    if (kind === 0) { c = a + b + (wantTrue ? 0 : delta); if (c <= 0) c = a + b + 1000; return { text: fmtN(a) + " + " + fmtN(b) + " = " + fmtN(c) + ".", truth: wantTrue, fix: fmtN(a) + " + " + fmtN(b) + " = " + fmtN(a + b) + "." }; }
    if (b >= a) b = Math.floor(a / 2);
    c = a - b + (wantTrue ? 0 : delta); if (c <= 0) c = a - b + 1000;
    return { text: fmtN(a) + " − " + fmtN(b) + " = " + fmtN(c) + ".", truth: wantTrue, fix: fmtN(a) + " − " + fmtN(b) + " = " + fmtN(a - b) + "." };
  }
  if (kind === 2) {
    var p = pick(R >= 100000 ? [1000, 10000] : [100, 1000]);
    a = nmNum(R); var d = Math.floor(a / (p / 10)) % 10;
    var real = (d >= 5 ? Math.floor(a / p) + 1 : Math.floor(a / p)) * p;
    c = wantTrue ? real : real + (Math.random() < 0.5 ? p : -p); if (c <= 0) c = real + p;
    return { text: "Làm tròn số " + fmtN(a) + " đến hàng " + NM_PLACE_NAMES[p] + " được " + fmtN(c) + ".", truth: wantTrue, fix: "Làm tròn số " + fmtN(a) + " đến hàng " + NM_PLACE_NAMES[p] + " được " + fmtN(real) + "." };
  }
  if (kind === 3) {
    a = nmNum(R); b = nmNum(R); if (a === b) b += 7;
    var bigger = Math.max(a, b), smaller = Math.min(a, b);
    var shownBig = wantTrue ? bigger : smaller, shownSmall = wantTrue ? smaller : bigger;
    return { text: "Số " + fmtN(shownBig) + " lớn hơn số " + fmtN(shownSmall) + ".", truth: wantTrue, fix: "Số " + fmtN(bigger) + " lớn hơn số " + fmtN(smaller) + "." };
  }
  a = nmNum(R); var s = String(a), places = nmPlacesOf(R);
  var ix = rand(0, s.length - 1), realD = +s[ix], place = places[ix];
  var shownD = wantTrue ? realD : (realD + rand(1, 9)) % 10;
  return { text: "Chữ số hàng " + NM_PLACE_NAMES[place] + " của số " + fmtN(a) + " là " + shownD + ".", truth: wantTrue, fix: "Chữ số hàng " + NM_PLACE_NAMES[place] + " của số " + fmtN(a) + " là " + realD + "." };
}
function nmFalseStmt(R) {
  return function () {
    var kinds = shuffle([0, 1, 2, 3, 4]).slice(0, 3);
    var truths = shuffle([true, true, false]);
    var ss = kinds.map(function (k, i) { return nmStmt(R, k, truths[i]); });
    var falseOne = ss.filter(function (x) { return !x.truth; })[0];
    var trueOnes = ss.filter(function (x) { return x.truth; }).map(function (x) { return x.text; });
    var q = mcqQ("Khẳng định nào dưới đây SAI?", trueOnes, falseOne.text, "Khẳng định sai là: «" + falseOne.text + "» Đúng phải là: «" + falseOne.fix + "»");
    q.roundIdentity = { type: "bundle", facts: ss.map(function (x) { return x.text; }) };
    return q;
  };
}
function nmTFCalc(R) {
  return function () {
    var kinds = shuffle([0, 1, 2, 3, 4]).slice(0, 3);
    var truths = shuffle([true, true, false]);
    var rounds = kinds.map(function (k, i) { var st = nmStmt(R, k, truths[i]); return { visual: '<div class="sentence" style="font-size:clamp(20px,5vw,27px)">' + st.text + "</div>", truth: st.truth }; });
    return tfQ("Đúng hay sai? Đọc kĩ từng ý nhé!", rounds);
  };
}
function nmSeqSteps(R) { return R >= 100000 ? [250, 500, 1000, 2500, 5000] : [50, 100, 250, 500]; }
function nmSeqData(R) {
  var step = pick(nmSeqSteps(R)) * (Math.random() < 0.3 ? -1 : 1);
  var start = Math.abs(step) * rand(2, Math.max(3, Math.floor(R / Math.abs(step)) - 6));
  if (step < 0) start = Math.abs(step) * rand(6, Math.max(7, Math.floor(R / Math.abs(step)) - 2));
  var terms = [0, 1, 2, 3, 4].map(function (i) { return start + i * step; });
  return { step: step, terms: terms };
}
function nmSeq(R) {
  return function () {
    var d = nmSeqData(R), terms = d.terms;
    if (Math.random() < 0.5) {
      var res = terms[4] + d.step;
      return nmMCQ("Số tiếp theo trong dãy số " + terms.map(fmtN).join(", ") + ", … là số nào?", res, "Dãy số " + (d.step > 0 ? "tăng" : "giảm") + " dần mỗi lần " + fmtN(Math.abs(d.step)) + ": số tiếp theo là " + fmtN(terms[4]) + (d.step > 0 ? " + " : " − ") + fmtN(Math.abs(d.step)) + " = " + fmtN(res) + ".");
    }
    var miss = rand(1, 3), val = terms[miss];
    var shown = terms.map(function (v, i) { return i === miss ? "…" : fmtN(v); }).join(", ");
    return nmMCQ("Số còn thiếu trong dãy số " + shown + " là số nào?", val, "Dãy số " + (d.step > 0 ? "tăng" : "giảm") + " dần mỗi lần " + fmtN(Math.abs(d.step)) + " nên số còn thiếu là " + fmtN(val) + ".");
  };
}
function nmSeqBlank(R) {
  return function () {
    var d = nmSeqData(R), terms = d.terms.slice(0, 4);
    var miss = rand(1, 2), val = terms[miss];
    var row = terms.map(function (v, i) { return i === miss ? blankSlot() : '<span class="seq-num">' + fmtN(v) + "</span>"; }).join(" ");
    var vals = shuffle([val, val + d.step, val - d.step].filter(function (v, i, a2) { return v > 0 && a2.indexOf(v) === i; }));
    return { kind: "blank", big: true, badge: "✏️ Điền vào chỗ trống", prompt: "Điền số còn thiếu trong dãy số:", visual: '<div class="seqrow">' + row + "</div>", blankText: String(val), options: vals.map(function (o) { return { html: '<span class="opt-num">' + fmtN(o) + "</span>" }; }), answer: vals.indexOf(val), cols: 3, explain: "Dãy số " + (d.step > 0 ? "tăng" : "giảm") + " dần mỗi lần " + fmtN(Math.abs(d.step)) + ": " + terms.map(fmtN).join(", ") + "." };
  };
}
function nmMissingBlank(R) {
  return function () {
    var form = rand(0, 4), a, b, c, ans, expr;
    if (form === 0) { a = rand(Math.floor(R / 10), Math.floor(R * 0.85)); ans = rand(50, R - a); c = a + ans; expr = fmtN(a) + " + " + blankSlot() + " = " + fmtN(c); }
    else if (form === 1) { b = rand(Math.floor(R / 20), Math.floor(R * 0.4)); ans = b + rand(Math.floor(R / 20), Math.floor(R * 0.4)); c = ans - b; expr = blankSlot() + " − " + fmtN(b) + " = " + fmtN(c); }
    else if (form === 2) { a = nmNum(R); c = rand(Math.floor(R / 20), Math.floor(a * 0.6)); ans = a - c; expr = fmtN(a) + " − " + blankSlot() + " = " + fmtN(c); }
    else if (form === 3) { a = rand(12, 999); ans = rand(2, 9); c = a * ans; expr = fmtN(a) + " × " + blankSlot() + " = " + fmtN(c); }
    else { b = rand(2, 9); var q4 = rand(12, Math.floor(R / 12)); ans = b * q4; expr = blankSlot() + " : " + b + " = " + fmtN(q4); }
    var dUp = ans < 20 ? pick([2, 3]) : pick([10, 100, 1000]);
    var dDn = ans < 20 ? 1 : pick([1, 10, 100]);
    var vals = shuffle([ans, ans + dUp, Math.max(1, ans - dDn)].filter(function (v, i, a2) { return v > 0 && a2.indexOf(v) === i; }));
    while (vals.length < 3) vals.push(ans + vals.length * 7 + 3);
    return { kind: "blank", big: true, badge: "✏️ Điền vào chỗ trống", prompt: "Điền số còn thiếu vào ô trống:", visual: '<div class="bigvisual">' + expr + "</div>", blankText: String(ans), options: vals.map(function (o) { return { html: '<span class="opt-num">' + fmtN(o) + "</span>" }; }), answer: vals.indexOf(ans), cols: 3, explain: "Số còn thiếu là " + fmtN(ans) + ": " + expr.replace(blankSlot(), fmtN(ans)) + "." };
  };
}
function nmCompareExpr(R) {
  return function () {
    var form = rand(0, 2), a = rand(Math.floor(R / 10), Math.floor(R * 0.5));
    var b = rand(100, Math.floor(R / 4)), c = rand(100, Math.floor(R / 4));
    if (b === c) c += 111;
    var e1, e2, sign, why;
    if (form === 0) { e1 = fmtN(a) + " + " + fmtN(b); e2 = fmtN(a) + " + " + fmtN(c); sign = b > c ? ">" : "<"; why = "Hai biểu thức cùng cộng với " + fmtN(a) + " nên chỉ cần so sánh " + fmtN(b) + " và " + fmtN(c) + "."; }
    else if (form === 1) { e1 = fmtN(a) + " − " + fmtN(b); e2 = fmtN(a) + " − " + fmtN(c); sign = b < c ? ">" : "<"; why = "Cùng trừ đi từ " + fmtN(a) + ": trừ số càng nhỏ thì hiệu càng lớn, nên so sánh " + fmtN(b) + " và " + fmtN(c) + " ngược lại."; }
    else { var bb = rand(2, 8), cc = bb + rand(1, 9 - bb); e1 = fmtN(a) + " × " + bb; e2 = fmtN(a) + " × " + cc; sign = "<"; why = "Cùng nhân với " + fmtN(a) + ": thừa số còn lại càng lớn thì tích càng lớn (" + bb + " < " + cc + ")."; }
    var wrongs = [">", "<", "="].filter(function (x) { return x !== sign; }).map(function (x) { return x === "<" ? "&lt;" : (x === ">" ? "&gt;" : x); });
    return mcqQ("Không cần tính kết quả, hãy chọn dấu đúng: " + e1 + " … " + e2, wrongs, sign === "<" ? "&lt;" : (sign === ">" ? "&gt;" : sign), why + " Vậy " + e1 + (sign === ">" ? " lớn hơn " : " bé hơn ") + e2 + ".");
  };
}
function nmMatchCalc(R) {
  return function () {
    var pairs = [], seenRes = {}, tries = 0;
    while (pairs.length < 4 && tries++ < 40) {
      var kind = pairs.length % 4, a, b, res, e;
      if (kind === 0) { a = rand(Math.floor(R / 10), Math.floor(R * 0.8)); b = rand(Math.floor(R / 20), R - a); res = a + b; e = fmtN(a) + " + " + fmtN(b); }
      else if (kind === 1) { a = nmNum(R); b = rand(Math.floor(R / 20), Math.floor(a * 0.6)); res = a - b; e = fmtN(a) + " − " + fmtN(b); }
      else if (kind === 2) { a = rand(12, Math.floor(R / 12)); b = rand(2, 9); res = a * b; e = fmtN(a) + " × " + b; }
      else { a = rand(12, Math.floor(R / 12)); b = rand(2, 9); res = a; a = a * b; e = fmtN(a) + " : " + b; }
      if (res > 0 && !seenRes[res]) { seenRes[res] = 1; pairs.push([e, String(fmtN(res))]); }
    }
    return pairsMatch("Nối phép tính với kết quả đúng nhé!", pairs);
  };
}
function nmAdvPools(R) {
  return {
    choose: [nmStoryAddSub(R), nmStoryMulDiv(R), nmDigitValue(R), nmDigitSwap(R), nmCompose(R), nmReadReverse(R), nmRevCalc(R), nmRoundTo(R), nmRoundReverse(R), nmFalseStmt(R), nmSeq(R), nmCompareExpr(R)],
    blank: [nmMissingBlank(R), nmSeqBlank(R)],
    match: [nmMatchCalc(R)],
    games: [nmTFCalc(R), g3SortBigCap(R), g3MemRead(R)]
  };
}

/* ---------- m3-giotien: tiền tròn, khẳng định cùng phạm trù ---------- */
var GT_DENOMS = [1000, 2000, 5000, 10000, 20000, 50000, 100000];
var GT_ITEMS = [["quyển vở", 8000], ["cây bút", 5000], ["cái thước", 3000], ["hộp bút chì", 12000], ["quyển truyện", 25000], ["ổ bánh mì", 10000], ["hộp sữa", 6000], ["chai nước", 5000], ["gói kẹo", 7000], ["cái bánh bao", 8000], ["tờ vé xe buýt", 5000], ["cốc trà sữa", 15000]];
function gtMoneyMCQ(prompt, res, explain) {
  var cand = [res + 1000, res - 1000, res + 2000, res - 2000, res + 5000, res - 5000, res + 10000, res - 10000].filter(function (v, i, a2) { return v > 0 && v !== res && a2.indexOf(v) === i; });
  var w = shuffle(cand).slice(0, 2);
  return mcqQ(prompt, [String(fmtN(w[0])) + " đồng", String(fmtN(w[1])) + " đồng"], String(fmtN(res)) + " đồng", explain);
}
function gtComboText(combo) {
  return combo.map(function (cd) { return cd[1] + " tờ " + fmtN(cd[0]) + " đồng"; }).join(" và ");
}
function gtCombo() {
  var ds = shuffle(GT_DENOMS.slice()).slice(0, rand(2, 3));
  return ds.map(function (d) { return [d, rand(1, 2)]; });
}
function gtComboTotal(combo) { return combo.reduce(function (s, cd) { return s + cd[0] * cd[1]; }, 0); }
/* Đợt hình Tiểu học (v22): trải tổ hợp tiền thành danh sách tờ để vẽ. */
function gtComboNotes(combo) { var out = []; combo.forEach(function (cd) { for (var i = 0; i < cd[1]; i++) out.push(cd[0]); }); return out; }
function gtMoneyStd() {
  var combo = gtCombo(), total = gtComboTotal(combo);
  var q = gtMoneyMCQ("Em có " + gtComboText(combo) + ". Em có tất cả bao nhiêu tiền?", total, "Cộng số tiền của các tờ: " + combo.map(function (cd) { return cd[1] + " × " + fmtN(cd[0]); }).join(" + ") + " = " + fmtN(total) + " đồng.");
  /* Các tờ tiền trong hình là dữ kiện của đề (đề cũng kể bằng lời); tổng
     tiền cần tìm không in trong hình. */
  if (Math.random() < 0.92) q.figure = figMoneySVG(gtComboNotes(combo));
  return q;
}
function gtMoneyBlankStd() {
  var combo = gtCombo(), total = gtComboTotal(combo);
  var vals = shuffle([total, total + 1000, total + 2000].filter(function (v, i, a2) { return a2.indexOf(v) === i; }));
  var q = { kind: "blank", big: true, badge: "✏️ Điền vào chỗ trống", prompt: "Điền số tiền còn thiếu:", visual: '<div class="sentence">Em có ' + gtComboText(combo) + ". Em có tất cả " + blankSlot() + " đồng.</div>", blankText: String(total), options: vals.map(function (o) { return { html: '<span class="opt-num">' + fmtN(o) + "</span>" }; }), answer: vals.indexOf(total), cols: 3, explain: "Tổng số tiền là " + fmtN(total) + " đồng." };
  if (Math.random() < 0.92) q.figure = figMoneySVG(gtComboNotes(combo));
  return q;
}
function gtMoneyChange() {
  return function () {
    var item = pick(GT_ITEMS), pay = item[1] <= 40000 ? pick([50000, 100000]) : 100000;
    var change = pay - item[1];
    return gtMoneyMCQ("Mua một " + item[0] + " giá " + fmtN(item[1]) + " đồng, em đưa tờ " + fmtN(pay) + " đồng. Người bán trả lại em bao nhiêu tiền?", change, "Tiền trả lại = " + fmtN(pay) + " − " + fmtN(item[1]) + " = " + fmtN(change) + " đồng.");
  };
}
function gtMoneyTwoStep() {
  return function () {
    var items = shuffle(GT_ITEMS.slice()).slice(0, 2);
    var total = items[0][1] + items[1][1], pay = total <= 50000 ? pick([50000, 100000]) : 100000;
    if (pay <= total) pay = 100000;
    var left = pay - total;
    return gtMoneyMCQ("Em có tờ " + fmtN(pay) + " đồng. Em mua một " + items[0][0] + " giá " + fmtN(items[0][1]) + " đồng và một " + items[1][0] + " giá " + fmtN(items[1][1]) + " đồng. Em còn lại bao nhiêu tiền?", left, "Hai món hết " + fmtN(items[0][1]) + " + " + fmtN(items[1][1]) + " = " + fmtN(total) + " đồng; còn lại " + fmtN(pay) + " − " + fmtN(total) + " = " + fmtN(left) + " đồng.");
  };
}
function gtMoneyDiff() {
  return function () {
    var c1 = gtCombo(), c2 = gtCombo(), t1 = gtComboTotal(c1), t2 = gtComboTotal(c2), tries = 0;
    while ((t1 === t2 || Math.abs(t1 - t2) < 3000) && tries++ < 12) { c2 = gtCombo(); t2 = gtComboTotal(c2); }
    var more = t1 > t2 ? ["Lan", c1, t1] : ["Mai", c2, t2], less = t1 > t2 ? ["Mai", c2, t2] : ["Lan", c1, t1];
    return gtMoneyMCQ("Lan có " + gtComboText(c1) + ". Mai có " + gtComboText(c2) + ". " + more[0] + " có nhiều hơn " + less[0] + " bao nhiêu tiền?", Math.abs(t1 - t2), more[0] + " có " + fmtN(more[2]) + " đồng, " + less[0] + " có " + fmtN(less[2]) + " đồng; hơn: " + fmtN(more[2]) + " − " + fmtN(less[2]) + " = " + fmtN(Math.abs(t1 - t2)) + " đồng.");
  };
}
function gtTimeText(tot) {
  var hh = Math.floor(tot / 60), mm = tot % 60;
  return hh + " giờ" + (mm === 0 ? "" : " " + mm + " phút");
}
function gtClockEnd() {
  return function () {
    var start = rand(6, 19) * 60 + pick([0, 15, 30, 35, 40, 45, 50]);
    var dur = pick([20, 25, 30, 35, 40, 45, 50, 55, 70, 80, 90]);
    var end = start + dur;
    var acts = [["Buổi học thêm", "buổi học"], ["Buổi tập thể dục", "buổi tập"], ["Chuyến xe buýt", "chuyến xe"], ["Buổi xem phim", "buổi xem phim"], ["Buổi tập bơi", "buổi tập"]];
    var act = pick(acts);
    var cand = [end, end + 15, end - 15, end + 30, end - 30].filter(function (v, i, a2) { return v > start && a2.indexOf(v) === i; });
    var w = shuffle(cand.filter(function (v) { return v !== end; })).slice(0, 2);
    return mcqQ(act[0] + " bắt đầu lúc " + gtTimeText(start) + " và kéo dài " + dur + " phút. " + act[0] + " kết thúc lúc mấy giờ?", [gtTimeText(w[0]), gtTimeText(w[1])], gtTimeText(end), act[1].charAt(0).toUpperCase() + act[1].slice(1) + " bắt đầu lúc " + gtTimeText(start) + ", kéo dài " + dur + " phút nên kết thúc lúc " + gtTimeText(end) + ".");
  };
}
var GT_WEEKDAYS = ["thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy", "chủ nhật"];
function gtCalendarAdv() {
  return function () {
    var form = rand(0, 2);
    if (form === 0) {
      var w0 = rand(0, 6), add = pick([7, 14]), day = rand(1, 31 - add);
      return mcqQ("Hôm nay là " + GT_WEEKDAYS[w0] + ", ngày " + day + ". Đúng " + (add === 7 ? "một tuần" : "hai tuần") + " nữa là " + GT_WEEKDAYS[w0] + ", ngày bao nhiêu?", [String(day + add + 1), String(day + add - 1)], String(day + add), "Sau mỗi tuần, thứ trong tuần giữ nguyên, ngày tăng thêm 7: " + day + " + " + add + " = " + (day + add) + ".");
    }
    if (form === 1) {
      var w1 = rand(0, 6), d1 = pick([8, 15, 22, 9, 16, 23, 10, 17, 24]);
      var wAns = (w1 + (d1 - 1)) % 7;
      var wrongs = shuffle(GT_WEEKDAYS.filter(function (x, ix) { return ix !== wAns; })).slice(0, 2);
      return mcqQ("Ngày 1 của tháng này là " + GT_WEEKDAYS[w1] + ". Ngày " + d1 + " của tháng này là thứ mấy?", wrongs, GT_WEEKDAYS[wAns], "Từ ngày 1 đến ngày " + d1 + " cách nhau " + (d1 - 1) + " ngày = " + Math.floor((d1 - 1) / 7) + " tuần" + ((d1 - 1) % 7 ? " và " + ((d1 - 1) % 7) + " ngày" : "") + " nên ngày " + d1 + " là " + GT_WEEKDAYS[wAns] + ".");
    }
    var w2 = rand(0, 6), days = pick([30, 31]);
    var wEnd = (w2 + days - 1) % 7;
    var wrongs2 = shuffle(GT_WEEKDAYS.filter(function (x, ix) { return ix !== wEnd; })).slice(0, 2);
    return mcqQ("Một tháng có " + days + " ngày và ngày 1 của tháng là " + GT_WEEKDAYS[w2] + ". Ngày cuối cùng của tháng là thứ mấy?", wrongs2, GT_WEEKDAYS[wEnd], "Ngày cuối là ngày " + days + ", cách ngày 1 đúng " + (days - 1) + " ngày = " + Math.floor((days - 1) / 7) + " tuần và " + ((days - 1) % 7) + " ngày nên là " + GT_WEEKDAYS[wEnd] + ".");
  };
}
var GT_STMTS = {
  gio: [
    ["Kim phút chỉ số 6 là 30 phút.", "Kim phút chỉ số 6 là 6 phút."],
    ["Kim phút chỉ số 3 là 15 phút.", "Kim phút chỉ số 3 là 3 phút."],
    ["Kim phút chỉ số 9 là 45 phút.", "Kim phút chỉ số 9 là 20 phút."],
    ["Một giờ có 60 phút.", "Một giờ có 100 phút."],
    ["Nửa giờ là 30 phút.", "Nửa giờ là 15 phút."],
    ["Kim phút quay một vòng là 60 phút.", "Kim phút quay một vòng là 12 phút."],
    ["7 giờ kém 15 phút là 6 giờ 45 phút.", "7 giờ kém 15 phút là 7 giờ 15 phút."],
    ["Kim giờ chỉ giữa số 7 và số 8, kim phút chỉ số 6 là 7 giờ 30 phút.", "Kim giờ chỉ giữa số 7 và số 8, kim phút chỉ số 6 là 6 giờ 30 phút."]
  ],
  lich: [
    ["Một tuần lễ có 7 ngày.", "Một tuần lễ có 5 ngày."],
    ["Một năm có 12 tháng.", "Một năm có 10 tháng."],
    ["Tháng 1 có 31 ngày.", "Tháng 1 có 30 ngày."],
    ["Tháng 4 có 30 ngày.", "Tháng 4 có 31 ngày."],
    ["Tháng 2 của năm thường có 28 ngày.", "Tháng 2 của năm thường có 30 ngày."],
    ["Tháng 12 là tháng cuối cùng của năm.", "Tháng 10 là tháng cuối cùng của năm."],
    ["Sau chủ nhật là thứ hai.", "Sau chủ nhật là thứ bảy."],
    ["Một năm thường có 365 ngày.", "Một năm thường có 360 ngày."]
  ],
  tien: [
    ["Tờ 500 000 đồng là tờ tiền có mệnh giá lớn nhất đang lưu hành.", "Tờ 100 000 đồng là tờ tiền có mệnh giá lớn nhất đang lưu hành."],
    ["Một tờ 100 000 đồng đổi được 10 tờ 10 000 đồng.", "Một tờ 100 000 đồng đổi được 5 tờ 10 000 đồng."],
    ["Ba tờ 20 000 đồng là 60 000 đồng.", "Ba tờ 20 000 đồng là 40 000 đồng."],
    ["Có tờ tiền mệnh giá 2 000 đồng.", "Có tờ tiền mệnh giá 3 000 đồng."],
    ["Một tờ 50 000 đồng bằng năm tờ 10 000 đồng.", "Một tờ 50 000 đồng bằng hai tờ 10 000 đồng."],
    ["Ba tờ 5 000 đồng là 15 000 đồng.", "Ba tờ 5 000 đồng là 10 000 đồng."],
    ["Một tờ 200 000 đồng đổi được hai tờ 100 000 đồng.", "Một tờ 200 000 đồng đổi được bốn tờ 100 000 đồng."]
  ]
};
function gtFindFalse() {
  var cat = pick(["gio", "lich", "tien"]);
  var bank = shuffle(GT_STMTS[cat].slice()).slice(0, 3);
  var fi = rand(0, 2);
  var trues = bank.filter(function (p, i) { return i !== fi; }).map(function (p) { return p[0]; });
  var q = mcqQ("Khẳng định nào dưới đây SAI?", trues, bank[fi][1], "Khẳng định sai là: «" + bank[fi][1] + "» Khẳng định đúng là: «" + bank[fi][0] + "»");
  q.roundIdentity = { type: "bundle", facts: bank.map(function (p, i) { return i === fi ? p[1] : p[0]; }) };
  return q;
}
function gtTF() {
  var all = GT_STMTS.gio.concat(GT_STMTS.lich, GT_STMTS.tien);
  var sel = shuffle(all.slice()).slice(0, 3);
  var pattern = shuffle(Math.random() < 0.5 ? [true, true, false] : [true, false, false]);
  var rounds = sel.map(function (p, i) {
    var truth = pattern[i];
    return { visual: '<div class="sentence" style="font-size:clamp(20px,5vw,27px)">' + (truth ? p[0] : p[1]) + "</div>", truth: truth };
  });
  return tfQ("Đúng hay sai? Đọc kĩ từng ý nhé!", rounds);
}
function gtMoneyBlank() {
  return function () {
    var item = pick(GT_ITEMS), pay = item[1] <= 40000 ? pick([50000, 100000]) : 100000;
    var change = pay - item[1];
    var vals = shuffle([change, change + 1000, change + 2000].filter(function (v, i, a2) { return a2.indexOf(v) === i; }));
    return { kind: "blank", big: true, badge: "✏️ Điền vào chỗ trống", prompt: "Điền số tiền còn thiếu:", visual: '<div class="sentence">Mua một ' + item[0] + " giá " + fmtN(item[1]) + " đồng, đưa tờ " + fmtN(pay) + " đồng. Người bán trả lại " + blankSlot() + " đồng.</div>", blankText: String(change), options: vals.map(function (o) { return { html: '<span class="opt-num">' + fmtN(o) + "</span>" }; }), answer: vals.indexOf(change), cols: 3, explain: "Tiền trả lại = " + fmtN(pay) + " − " + fmtN(item[1]) + " = " + fmtN(change) + " đồng." };
  };
}
function gtAdvPools() {
  return {
    choose: [gtMoneyStd, gtMoneyChange(), gtMoneyTwoStep(), gtMoneyDiff(), gtClockEnd(), gtCalendarAdv(), gtFindFalse, g3ClockElapsed, g3MoneyChange],
    blank: [gtMoneyBlank(), qBlankClock],
    match: [g3MoneyMatch, mClockHour],
    games: [gtTF, gSortDays, gMemClock, gTFClock]
  };
}
function nmRevFacts(factsArr) {
  /* B1-sửa lớp nhỏ (2026-10-15): bản cũ là bộ sinh hỏi ĐẢO NGƯỢC ("Đáp án
     … là câu trả lời đúng cho câu hỏi nào?") — cùng họ khuôn T4 mà chuẩn
     §6.3 loại khỏi Lớp 1–3. Nay hỏi thẳng vào nội dung dữ kiện, giữ nguyên
     vị trí bộ sinh trong pools nên ngân hàng không đổi cấu trúc. */
  return function () {
    var f = pick(factsArr);
    var wrongs = shuffle(factsArr.filter(function (x) { return x !== f && x[1] !== f[1]; })).slice(0, 2).map(function (x) { return x[1]; });
    return mcqQ(f[0], wrongs, f[1], f[4] || (f[0].replace(/\?$/, "") + ": " + f[1] + "."));
  };
}
function nmFixLabel(t) {
  var seen = {}, seenA = {}, n = 0, a = 0, k, g, i, q;
  ["choose", "blank", "match", "games"].forEach(function (pk) {
    (t.pools[pk] || []).forEach(function (gen) {
      for (i = 0; i < 20; i++) { try { q = gen(); } catch (e) { q = null; } if (q) { k = qSig3(q); if (!seen[k]) { seen[k] = 1; n++; } } }
    });
  });
  if (t.advPools) ["choose", "blank", "match", "games"].forEach(function (pk) {
    (t.advPools[pk] || []).forEach(function (gen) {
      for (i = 0; i < 20; i++) { try { q = gen(); } catch (e) { q = null; } if (q) { k = qSig3(q); if (!seenA[k]) { seenA[k] = 1; a++; } } }
    });
  });
  t.bankB = n; t.advBankB = a;
  t.sub = String(t.sub).replace(/ • \d+\+ câu( hỏi)?( · \d+\+ nâng cao)?$/, "") + " • " + n + "+ câu · " + a + "+ nâng cao";
  try { if (window.__BANKB) { for (var key in window.__BANKB) { if (key.split("|")[2] === t.id && window.__BANKB[key]) { window.__BANKB[key].n = n; window.__BANKB[key].adv = a; } } } } catch (e) {}
}
function nmRebuild3(gtLen) {
  if (typeof GRADES === "undefined" || !GRADES[3]) return;
  GRADES[3].subjects.forEach(function (s) {
    s.topics.forEach(function (t) {
      if (t.id === "m3-so10000") { t.advPools = nmAdvPools(10000); nmFixLabel(t); }
      if (t.id === "m3-so100000") { t.advPools = nmAdvPools(100000); nmFixLabel(t); }
      if (t.id === "m3-giotien") {
        if (gtLen) ["choose", "blank", "match", "games"].forEach(function (pk) {
          if (t.pools[pk] && gtLen[pk] != null && t.pools[pk].length > gtLen[pk]) t.pools[pk].length = gtLen[pk];
        });
        t.pools.choose.push(gtFindFalse, nmRevFacts(G3_EXTRA_FACTS["m3-giotien"]));
        t.pools.games.push(gtTF);
        t.advPools = gtAdvPools();
        nmFixLabel(t);
      }
    });
  });
}

/* ---------- TIẾNG ANH 3: BỘ SINH THÊM CHO MỖI UNIT ---------- */
function eng3OddOne(u) {
  var mine = shuffle(u.words.slice()).slice(0, 3);
  var others = ALL_WORDS3.filter(function (w) { return u.words.indexOf(w) === -1; });
  var foreign = pick(others);
  var opts = shuffle(mine.concat([foreign]).map(function (w) { return { html: '<span class="opt-emoji">' + w[1] + '</span> <span class="opt-word">' + w[0] + "</span>", text: w[0] }; }));
  return { kind: "choose", big: true, prompt: "Từ nào KHÁC nhóm với ba từ còn lại?", options: opts, answer: opts.findIndex(function (o) { return o.text === foreign[0]; }), explain: foreign[0] + " nghĩa là '" + foreign[2] + "' — không thuộc nhóm từ của bài này.", speak: foreign[0] };
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
    var items = [], used = shuffle(u.words.slice());
    for (var i = 0; i < 3 && i < used.length; i++) {
      var w = used[i], truth = Math.random() < 0.5;
      /* v16: ô "nghĩa là" phải là NGHĨA VIỆT (w[2]) — bản cũ lấy nhầm emoji
         (w[1]) nên khẳng định thành vô nghĩa; nhiễu cũng phải khác đầu-nghĩa. */
      var shown = truth ? w[2] : pick(u.words.filter(function (x) { return x !== w && engGlossHead(x[2]) !== engGlossHead(w[2]); }))[2];
      items.push({ w: w, truth: truth, shown: shown, correct: w[2] });
    }
    /* B6: cân bằng phán quyết — trước đây 3 vòng độc lập, ~25% màn đồng phán quyết
       (họ lớn nhất còn lại ở Lớp 3: các màn «Unit» — Đúng hay sai?). */
    tfBalanceItems(items, function (it) { var c = u.words.filter(function (x) { return x !== it.w && engGlossHead(x[2]) !== engGlossHead(it.w[2]); }); return c.length ? pick(c)[2] : null; });
    var rounds = items.map(function (it) { return { visual: it.w[2] + " <b>" + it.w[0] + "</b> nghĩa là «" + it.shown + "»", truth: it.truth }; });
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
"m3-lama": ["Chữ số La Mã cơ bản: I = 1, V = 5, X = 10. Lớp 3 viết các số La Mã trong phạm vi 20.","Chữ nhỏ đứng trước chữ lớn thì trừ: IV = 4, IX = 9; chữ giống nhau lặp lại tối đa 3 lần: III = 3, XX = 20.","Đọc số La Mã từ trái sang phải, cộng giá trị các chữ số (trừ trường hợp trừ ở trên)."],
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
  /* B1-SỬA (2026-10-15): cất độ dài pools của m3-giotien TRƯỚC Phase B để sau
     đó gỡ phần mở rộng tầng thường do trang vỏ thêm vào (nguồn câu tìm khẳng
     định sai lệch phạm trù + đáp án nhiễu tiền không tròn), thay bằng bộ sinh
     an toàn phạm trù của chính file này. */
  var __nmGtLen = null;
  try {
    GRADES[3].subjects.forEach(function (s) { s.topics.forEach(function (t) {
      if (t.id === "m3-giotien") { __nmGtLen = {}; ["choose", "blank", "match", "games"].forEach(function (k) { __nmGtLen[k] = (t.pools[k] || []).length; }); }
    }); });
  } catch (e) {}
/* ĐỢT 3 V24 — bank nâng cao thật viết tay theo cụm chương, dữ kiện mới,
   đã duyệt tay theo chương (luật Q5) trước khi nạp — biên bản: kiem-chung-v24/sau-dot3/DUYET-*. */
window.__ADV3BANKS24 = Object.assign(window.__ADV3BANKS24 || {}, {"g3-starter":[{"f":"A1","p":"Read: Mai has pencils in a box. She counts one, two, three, four, five, six. Then she puts one more pencil in the box. How many pencils are there now?","a":"Seven pencils","w":["Six pencils","Eight pencils","Five pencils"],"e":"Mai đếm đến 6 rồi thêm 1 cây nữa, vậy có 7 cây."},{"f":"A1","p":"Read: Tom has ten marbles. He gives two marbles to his friend Ben. Ben is happy. How many marbles does Tom have now?","a":"Eight marbles","w":["Ten marbles","Two marbles","Nine marbles"],"e":"Tom có 10, cho đi 2 nên còn 8."},{"f":"A1","p":"Read: Look at the ducks in the park. One, two, three, four, five ducks are white. Two ducks are brown. How many ducks are there in all?","a":"Seven ducks","w":["Five ducks","Two ducks","Six ducks"],"e":"5 vịt trắng + 2 vịt nâu = 7 vịt."},{"f":"A1","p":"Read: Anna is six years old. Her brother is three years older than Anna. He goes to school with her every day. How old is Anna's brother?","a":"He is nine years old","w":["He is six years old","He is three years old","He is ten years old"],"e":"Anh trai hơn Anna 3 tuổi: 6 + 3 = 9 tuổi."},{"f":"A1","p":"Read: The teacher writes one, two, three on the board. Then she writes the next number. The children say it aloud. What number does she write next?","a":"Four","w":["Three","Five","Ten"],"e":"Sau 1, 2, 3 là số 4."},{"f":"A1","p":"Read: Sam puts eight books on the table. One book falls down. Now Sam picks it up and puts it back. In the story, the word 'falls' means the book goes ___.","a":"down to the floor","w":["up to the sky","into a bag","onto the chair"],"e":"Trong ngữ cảnh, 'falls' nghĩa là rơi xuống sàn."},{"f":"A2","p":"Teacher: Count from one, please. Mai: One, two, three... What does Mai say next? — Mai: ___","a":"Four, five, six","w":["Goodbye, teacher","My name is Mai","I am fine, thanks"],"e":"Sau 1, 2, 3 thì đếm tiếp 4, 5, 6."},{"f":"A2","p":"Ben: How many pens do you have? Lan: I have five pens. Ben: ___","a":"Wow, five pens!","w":["It is a pencil","I am eight years old","Goodbye, Lan"],"e":"Ben đang nói về số bút nên câu khen về số lượng là hợp nhất."},{"f":"A2","p":"Teacher: Show me ten fingers, please. Nam: ___","a":"Here, teacher. One, two... ten!","w":["I have a school bag","It is red and blue","Thank you, goodbye"],"e":"Thầy yêu cầu giơ 10 ngón tay nên Nam vừa đếm vừa giơ tay."},{"f":"A2","p":"Hoa: I can count to ten! Minh: ___","a":"Great! Can you count again?","w":["My hobby is drawing","It is on the table","Yes, it is my friend"],"e":"Hoa khoe đếm đến 10, Minh khen và rủ đếm lại là hợp ngữ cảnh."}],"g3-u1":[{"f":"A1","p":"Read: Linh meets her teacher in the morning. She says, 'Hello, Ms Lan. How are you?' Ms Lan smiles and says she is fine. Linh is happy. How does Ms Lan feel?","a":"She is fine","w":["She is sad","She is hungry","She is tired"],"e":"Cô Lan nói 'I am fine' nghĩa là cô khoẻ/ổn."},{"f":"A1","p":"Read: It is the first day at a new school. Phong says hello to a girl. The girl says, 'Hi! I am Mai.' Phong smiles and says his name too. Why does Phong smile?","a":"He meets a new friend","w":["He is going home","He says goodbye","He is fine and tired"],"e":"Phong cười vì gặp bạn mới ở trường mới."},{"f":"A1","p":"Read: After school, Ben waves his hand to his friends. He says, 'Goodbye! See you tomorrow.' Then he walks home. When does Ben say goodbye?","a":"After school","w":["In the morning","At breakfast","At night in bed"],"e":"Ben chào tạm biệt sau giờ học, trước khi về nhà."},{"f":"A1","p":"Read: Anna says, 'Thank you' when her friend gives her a book. Her friend smiles. Anna is polite. In the story, 'polite' is about saying ___.","a":"thank you nicely","w":["goodbye loudly","hello quickly","hi sadly"],"e":"Lịch sự trong đoạn là biết nói cảm ơn một cách dễ thương."},{"f":"A1","p":"Read: Tom says, 'Hello! How are you?' His friend says, 'I am fine, thank you.' Tom is glad his friend is well. What is the main idea of the story?","a":"Friends say hello and ask about health","w":["Friends say goodbye at home","A boy gives a book","A girl walks to school"],"e":"Ý chính: bạn bè chào nhau và hỏi thăm sức khoẻ."},{"f":"A1","p":"Read: Mai says hello to Mr Brown in the morning. At the end of the day, she meets him again near the gate. Mai smiles at him. What should Mai say this time?","a":"Goodbye, Mr Brown","w":["Hello, good morning","Hi, how are you today","Thank you for the book"],"e":"Cuối ngày gặp lại ở cổng, Mai nên chào tạm biệt."},{"f":"A2","p":"A: Hello! I am Nam. B: ___","a":"Hi, Nam! I am Linh","w":["Goodbye, see you tomorrow","I am fine, thank you","It is a book"],"e":"Nam tự giới thiệu tên nên Linh giới thiệu lại tên mình."},{"f":"A2","p":"Teacher: How are you today, Mai? Mai: ___","a":"I am fine, thank you","w":["My name is Mai","Goodbye, teacher","Hello, I am Mai"],"e":"Câu hỏi hỏi sức khoẻ nên trả lời 'I am fine, thank you'."},{"f":"A2","p":"A: Thank you very much. B: ___","a":"You are welcome","w":["Hello, how are you","Goodbye, see you","I am fine today"],"e":"Khi được cảm ơn, đáp 'You are welcome' là hợp nhất."},{"f":"A2","p":"It is time to go home. Lan: ___ Teacher: Goodbye, Lan.","a":"Goodbye, teacher. See you tomorrow","w":["Hello, teacher. Good morning","Hi, I am fine, thanks","Thank you, I am Lan"],"e":"Đến giờ về, Lan chào tạm biệt và hẹn ngày mai."}],"g3-u2":[{"f":"A1","p":"Read: My name is Quan. I am eight years old. I am in Class 3A. My friend Mai is eight too. How old is Quan?","a":"He is eight years old","w":["He is seven years old","He is nine years old","His name is Mai"],"e":"Quan tự giới thiệu mình 8 tuổi."},{"f":"A1","p":"Read: A new girl comes to class. The teacher asks her name. She says, 'My name is Thao.' The children say hello to Thao. What is the new girl's name?","a":"Her name is Thao","w":["Her name is Mai","She is eight years old","She is in Class 3A"],"e":"Bạn gái mới tên là Thảo."},{"f":"A1","p":"Read: Phong is nine years old. His sister is five. Phong is older than his sister. How many years older is Phong?","a":"Four years older","w":["Nine years older","Five years older","Two years older"],"e":"9 - 5 = 4, Phong hơn em 4 tuổi."},{"f":"A1","p":"Read: Linh asks, 'What's your name?' The boy answers, 'My name is Duc.' Then Linh writes his name in her notebook. Why does Linh write in her notebook?","a":"To remember Duc's name","w":["To draw a picture","To count numbers","To say goodbye"],"e":"Linh ghi tên Đức để nhớ tên bạn."},{"f":"A1","p":"Read: Tom is seven. Ben is eight. Anna is nine. They stand in a line from young to old. Who stands in the middle?","a":"Ben stands in the middle","w":["Tom stands in the middle","Anna stands in the middle","Nobody stands there"],"e":"Thứ tự 7, 8, 9 nên Ben 8 tuổi đứng giữa."},{"f":"A1","p":"Read: Mai says, 'How old are you?' Nam says, 'I am eight years old.' They talk at school in the morning. In the talk, 'old' is about Nam's ___.","a":"age","w":["name","friend","school"],"e":"Trong câu hỏi tuổi, 'old' nói về tuổi của Nam."},{"f":"A2","p":"A: What's your name? B: ___","a":"My name is Hoa","w":["I am eight years old","I am fine, thank you","This is my friend"],"e":"Hỏi tên thì trả lời bằng tên của mình."},{"f":"A2","p":"A: How old are you, Ben? B: ___","a":"I am nine years old","w":["My name is Ben","I am fine, thank you","Yes, it is Ben"],"e":"Hỏi tuổi thì trả lời số tuổi."},{"f":"A2","p":"Teacher: What's his name? Mai (pointing to Nam): ___","a":"His name is Nam","w":["My name is Nam","I am eight years old","He is fine, thanks"],"e":"Hỏi tên người thứ ba (anh ấy) nên đáp 'His name is Nam'."},{"f":"A2","p":"A: This is my friend. Her name is Linh. B: ___","a":"Hello, Linh! Nice to meet you","w":["How old is the teacher","Goodbye, see you tomorrow","I am eight years old"],"e":"Khi được giới thiệu bạn mới, chào bạn ấy là hợp nhất."}],"g3-u3":[{"f":"A1","p":"Read: This is Ms Mai. She is my teacher. She is kind and she helps us every day. This is Tom. He is my friend. Who is Ms Mai?","a":"She is my teacher","w":["She is my friend Tom","She is a new pupil","She is my sister"],"e":"Ms Mai được giới thiệu là cô giáo."},{"f":"A1","p":"Read: Linh points to a boy near the door and says, 'That is Minh.' She points to a girl next to her and says, 'This is Hoa.' They are at school today. Where is Minh?","a":"Near the door","w":["Next to Linh","In the classroom corner","Behind the teacher"],"e":"Minh đứng gần cửa, dùng 'that' để chỉ xa."},{"f":"A1","p":"Read: A boy asks, 'Is this your friend?' Mai holds a photo in her hand. She looks at the photo and says, 'Yes, it is. She is Anna.' What is in Mai's hand?","a":"A photo of Anna","w":["A book about teachers","A picture of school","A photo of Mai"],"e":"Mai đang xem ảnh của bạn Anna."},{"f":"A1","p":"Read: Mr Long is a teacher. The children say, 'Hello, Mr Long!' He smiles and says hello. Why do the children call him 'Mr Long'?","a":"He is a man teacher","w":["He is a woman teacher","He is their friend","He is a new pupil"],"e":"Dùng 'Mr' để gọi thầy giáo / người đàn ông kính trọng."},{"f":"A1","p":"Read: Hoa has two friends. One is near her desk. The other is far, near the window. Hoa says 'this friend' and 'that friend'. The friend near the window is ___.","a":"that friend","w":["this friend","my teacher","Ms Hoa"],"e":"Bạn ở xa gần cửa sổ là 'that friend'."},{"f":"A1","p":"Read: Ben is my friend. He is nice. We play and learn together at school. What is the main idea?","a":"Ben is a good friend at school","w":["Ben is my teacher","Friends play at home only","We learn with Ms Ben"],"e":"Ý chính: Ben là bạn tốt ở trường."},{"f":"A2","p":"A: Is this your friend? B: ___","a":"Yes, it is. This is Anna","w":["No, I am eight years old","My name is Anna today","It is a teacher book"],"e":"Hỏi có phải bạn không, đáp đúng là Yes và giới thiệu bạn."},{"f":"A2","p":"A: Is that your teacher? B: ___","a":"No, it isn't. That is my friend","w":["Yes, I am fine, thanks","His name is eight years","This is a book, please"],"e":"Câu phủ định và sửa lại thông tin là hợp ngữ cảnh."},{"f":"A2","p":"Mai: This is my teacher, Ms Lan. Nam: ___","a":"Hello, Ms Lan","w":["Goodbye, my friend Tom","Yes, it is my friend","How old are you, book"],"e":"Được giới thiệu cô giáo, Nam chào cô là đúng."},{"f":"A2","p":"A: Who is that? B: ___","a":"That is Mr Brown, our teacher","w":["This is near my desk","I am fine, thank you","Yes, it is, please"],"e":"Hỏi người ở xa là ai, đáp tên và vai trò của thầy."}],"g3-u4":[{"f":"A1","p":"Read: In class, the teacher says, 'Touch your nose! Touch your ears!' The children laugh and touch their noses and ears. What do the children touch first?","a":"Their noses","w":["Their ears","Their hands","Their faces"],"e":"Lệnh đầu tiên là chạm vào mũi."},{"f":"A1","p":"Read: Anna has long hair. She has two eyes and a small mouth. She can see the board well. What can Anna do with her eyes?","a":"She can see the board","w":["She can hear music","She can touch the desk","She can open the book"],"e":"Mắt dùng để nhìn, Anna nhìn rõ bảng."},{"f":"A1","p":"Read: Tom washes his face and hands in the morning. Then he eats breakfast. He feels clean and happy. What does Tom wash?","a":"His face and hands","w":["His hair and ears","His eyes and nose","His mouth only"],"e":"Tom rửa mặt và tay vào buổi sáng."},{"f":"A1","p":"Read: The teacher says, 'Open your mouth, please.' The doctor looks at Mai's teeth. Mai is not scared. Why does Mai open her mouth?","a":"So the doctor can see her teeth","w":["To touch her nose","To wash her face","To say her name"],"e":"Mai mở miệng để bác sĩ xem răng."},{"f":"A1","p":"Read: Ben hears music with his ears. He sees colours with his eyes. He touches a soft teddy bear with his hands. In the story, 'soft' describes how the teddy bear feels when Ben ___.","a":"touches it","w":["hears it","sees it","opens it"],"e":"'Soft' là cảm giác khi chạm vào gấu bông."},{"f":"A1","p":"Read: Linh has black hair and brown eyes. Her friend Hoa has black hair too, but her eyes are black. They are good friends at school. How are Linh and Hoa the same?","a":"They both have black hair","w":["They both have brown eyes","They both have small hands","They both touch their ears"],"e":"Cả hai bạn đều có tóc đen."},{"f":"A2","p":"Teacher: Touch your ears! Class: ___","a":"Yes, teacher! (touching ears)","w":["Open your book, please","My name is Mai Linh","I have ten fingers now"],"e":"Cô ra lệnh chạm tai, cả lớp làm theo là hợp nhất."},{"f":"A2","p":"A: What's this? (pointing to his nose) B: ___","a":"It's your nose","w":["It's my hair today","Touch your hand, please","I am fine, thank you"],"e":"Chỉ vào mũi và hỏi thì đáp đó là mũi."},{"f":"A2","p":"Teacher: Open your books, please. Nam: ___","a":"Yes, teacher. I open my book","w":["Close your eyes, please","This is my mouth, teacher","How old are you now"],"e":"Cô yêu cầu mở sách, Nam làm theo và xác nhận."},{"f":"A2","p":"A: I have a headache. My head hurts. B: ___","a":"Oh no! Sit down and rest","w":["Touch your nose quickly","Open your mouth and sing","Count your fingers aloud"],"e":"Bạn đau đầu, khuyên bạn ngồi nghỉ là quan tâm, hợp ngữ cảnh."}],"g3-u5":[{"f":"A1","p":"Read: Mai likes drawing. She draws houses and flowers after school. Her pictures are colourful. What is Mai's hobby?","a":"Drawing","w":["Cooking","Swimming","Running"],"e":"Sở thích của Mai là vẽ."},{"f":"A1","p":"Read: Phong likes swimming. He swims in the pool on Sunday. He can swim very well. His sister likes dancing at home. What does Phong do on Sunday?","a":"He swims in the pool","w":["He dances at home","He draws pictures","He cooks dinner"],"e":"Chủ nhật Phong đi bơi ở bể bơi."},{"f":"A1","p":"Read: Linh's hobby is singing. She sings in the music room. Tom's hobby is cooking. He helps his mother cook rice. Where does Linh sing?","a":"In the music room","w":["In the kitchen","In the pool","At home in bed"],"e":"Linh hát trong phòng âm nhạc."},{"f":"A1","p":"Read: Ben walks to school every day. He likes walking. Anna runs in the park. She likes running. Who likes walking?","a":"Ben likes walking","w":["Anna likes walking","Tom likes walking","Nobody likes walking"],"e":"Ben thích đi bộ, Anna thích chạy."},{"f":"A1","p":"Read: Hoa paints a picture of the sea. She uses blue and green. The picture is beautiful. In the story, 'paints' means Hoa uses colours to make ___.","a":"a picture","w":["a song","a cake","a dance"],"e":"Tô/vẽ tranh là dùng màu tạo nên bức tranh."},{"f":"A1","p":"Read: My friends have many hobbies. Mai likes dancing, Nam likes drawing and I like swimming. We are happy together. What is the main idea?","a":"Friends have different hobbies","w":["All friends like swimming","Friends cook together daily","Hobbies are only at school"],"e":"Ý chính: mỗi bạn có một sở thích khác nhau."},{"f":"A2","p":"A: What's your hobby? B: ___","a":"I like painting pictures","w":["I am eight years old","This is my teacher","It is on the table"],"e":"Hỏi sở thích thì trả lời việc mình thích làm."},{"f":"A2","p":"A: I like swimming. What about you? B: ___","a":"I like running in the park","w":["My name is swimming","Yes, it is a pool book","Goodbye, see you later"],"e":"A hỏi 'còn bạn thì sao' nên B nói sở thích của mình."},{"f":"A2","p":"A: Do you like dancing? B: ___","a":"Yes, I do. I dance every day","w":["No, it is my nose","It is a red picture","He is my brother"],"e":"Trả lời Yes và nói thêm về nhảy múa là hợp nhất."},{"f":"A2","p":"A: Let's draw a house together. B: ___","a":"Great idea! I like drawing","w":["I like swimming in winter","Thank you, I am fine","Sit down, please now"],"e":"A rủ vẽ nhà, B đồng ý vì thích vẽ là hợp ngữ cảnh."}],"g3-u6":[{"f":"A1","p":"Read: Our school is big. We read books in the library. We sing in the music room. We play in the playground. Where do we read books?","a":"In the library","w":["In the music room","In the playground","In the gym"],"e":"Đọc sách ở thư viện của trường."},{"f":"A1","p":"Read: Today we have art. We go to the art room and paint pictures. The art room is next to the library. What lesson do we have today?","a":"Art lesson","w":["Music lesson","PE in the gym","Computer lesson"],"e":"Hôm nay lớp có tiết Mĩ thuật."},{"f":"A1","p":"Read: Nam learns with computers in the computer room. He is careful and quiet there. After that, he plays football in the playground. Where does Nam use computers?","a":"In the computer room","w":["In the playground","In the library","In his classroom only"],"e":"Nam dùng máy tính ở phòng máy tính."},{"f":"A1","p":"Read: The gym is large. Children run and jump there in PE lessons. On rainy days, they play in the gym, not in the playground. Why do they play in the gym on rainy days?","a":"Because it is rainy outside","w":["Because the gym is small","Because they like books","Because it is night time"],"e":"Trời mưa nên chơi trong phòng tập thay vì sân chơi."},{"f":"A1","p":"Read: Mai says, 'Let's go to the library!' She wants a story book. Her friend Linh goes with her. Why does Mai go to the library?","a":"She wants a story book","w":["She wants to sing a song","She wants to run and jump","She wants a computer"],"e":"Mai đến thư viện vì muốn lấy sách truyện."},{"f":"A1","p":"Read: Our classroom is clean. Our teacher is there. We learn and play in our school every day. What is the main idea?","a":"We learn and play at our school","w":["We only play at school","The library is very big","Computers are in the gym"],"e":"Ý chính: chúng ta học và chơi ở trường mỗi ngày."},{"f":"A2","p":"A: Let's go to the playground! B: ___","a":"OK! Let's play there","w":["I am in the library now","It is a music book","My name is playground"],"e":"A rủ ra sân chơi, B đồng ý đi chơi ở đó."},{"f":"A2","p":"A: Where is the library? B: ___","a":"It's next to the art room","w":["I like reading books","Let's sing a song now","Yes, you can go out"],"e":"Hỏi thư viện ở đâu, đáp vị trí cạnh phòng mĩ thuật."},{"f":"A2","p":"Teacher: Where do you sing songs? Mai: ___","a":"In the music room, teacher","w":["In the gym with balls","On the playground slide","In the computer room"],"e":"Hát ở phòng âm nhạc là đáp án đúng chức năng."},{"f":"A2","p":"A: This is our computer room. B: ___","a":"Wow! There are many computers","w":["I can read a book here","Let's play football now","Goodbye, computer room"],"e":"Thấy phòng máy tính, khen nhiều máy tính là hợp ngữ cảnh."}],"g3-u7":[{"f":"A1","p":"Read: The teacher says, 'Stand up, please. Come in and sit down.' The new pupil stands up, comes in and sits at his desk. What does the pupil do first?","a":"He stands up","w":["He sits down","He comes in","He goes out"],"e":"Việc đầu tiên cậu bé làm là đứng lên."},{"f":"A1","p":"Read: Mai wants to go out. She asks, 'May I go out, teacher?' The teacher says, 'Yes, you can.' Mai says thank you. Why does Mai ask the teacher?","a":"She wants to go out","w":["She wants to sit down","She wants to speak loudly","She wants to close the book"],"e":"Mai xin phép vì muốn ra ngoài."},{"f":"A1","p":"Read: In class, Nam speaks Vietnamese with his friend. The teacher says, 'Speak English, please.' Nam tries to say the words in English. What does the teacher want Nam to do?","a":"Speak English","w":["Sit down quietly","Close his book now","Go out of class"],"e":"Cô muốn Nam nói tiếng Anh trong lớp."},{"f":"A1","p":"Read: It is cold. The window is open. The teacher says, 'Close the window, please.' Linh closes it and the class feels warm. Why does Linh close the window?","a":"Because it is cold","w":["Because it is very hot","Because she goes out","Because she speaks English"],"e":"Trời lạnh nên Linh đóng cửa sổ theo lời cô."},{"f":"A1","p":"Read: At the door, Phong knocks and says, 'May I come in?' The teacher smiles and says yes. Phong is polite. In the story, Phong asks before he ___.","a":"comes in","w":["sits down","speaks English","closes the door"],"e":"Phong xin phép trước khi vào lớp."},{"f":"A1","p":"Read: Good pupils listen to the teacher. They sit down, open their books and speak when the teacher asks. Their books are open on their desks. What is the main idea?","a":"Pupils follow classroom instructions","w":["Pupils go out every lesson","Teachers sit down in class","Books are closed at school"],"e":"Ý chính: học sinh thực hiện các chỉ dẫn trong lớp."},{"f":"A2","p":"Teacher: Sit down, please. Pupil: ___","a":"Yes, teacher. (sitting down)","w":["May I go out now","I am fine, thank you","This is my school bag"],"e":"Cô yêu cầu ngồi xuống, học sinh làm theo là đúng."},{"f":"A2","p":"Pupil: May I come in, teacher? Teacher: ___","a":"Yes, you can. Come in, please","w":["No, I am eight years old","It is a classroom book","Goodbye, see you tomorrow"],"e":"Xin vào lớp, cô cho phép và mời vào là hợp nhất."},{"f":"A2","p":"Pupil: May I go out, please? Teacher: ___","a":"Yes, you can","w":["Stand up and sing now","Close your book, please","I like your pencil case"],"e":"Xin ra ngoài được đồng ý bằng 'Yes, you can'."},{"f":"A2","p":"Teacher: Speak English, please. Nam: ___","a":"OK, teacher. Hello, everyone!","w":["I speak Vietnamese at home","Sit down, please, teacher","Thank you, goodbye now"],"e":"Cô yêu cầu nói tiếng Anh, Nam chào bằng tiếng Anh là đúng."}],"g3-u8":[{"f":"A1","p":"Read: Mai has a school bag. In her bag, there is a book, a notebook and a pencil case. Her ruler is on the desk. What is in Mai's school bag?","a":"A book and a notebook","w":["A ruler and an eraser","A pen and a table","A school bag only"],"e":"Trong cặp của Mai có sách và vở."},{"f":"A1","p":"Read: Nam has a new pen. He writes in his notebook. His eraser is small and white. He puts his pen in his pencil case after class. Where does Nam put his pen after class?","a":"In his pencil case","w":["In his notebook","On his eraser","In his school bag only"],"e":"Sau giờ học Nam cất bút vào hộp bút."},{"f":"A1","p":"Read: Linh cannot find her ruler. She looks in her school bag. The ruler is under her book. She is happy now. Where is Linh's ruler?","a":"Under her book","w":["In her pencil case","On the teacher's desk","Next to her eraser"],"e":"Thước của Linh ở dưới quyển sách trong cặp."},{"f":"A1","p":"Read: Tom has two pencils. One pencil is long and one is short. He gives the long pencil to his friend. Which pencil does Tom keep?","a":"The short pencil","w":["The long pencil","Both pencils","A new notebook"],"e":"Tom cho bạn cây dài nên giữ lại cây ngắn."},{"f":"A1","p":"Read: Hoa's eraser is in her pencil case with her pencils. She uses the eraser when she writes a wrong word. Her pencil case is on her desk. In the story, Hoa uses the eraser to ___.","a":"fix a wrong word","w":["draw a long line","read a story book","open her school bag"],"e":"Hoa dùng tẩy để sửa chữ viết sai."},{"f":"A1","p":"Read: Good pupils keep their school things tidy. Books are in the bag, pencils are in the pencil case. Everyone knows where their things are. What is the main idea?","a":"Keep school things tidy and in place","w":["Buy new school things daily","Pencils are in the book","Erasers are very long"],"e":"Ý chính: giữ đồ dùng học tập gọn gàng, đúng chỗ."},{"f":"A2","p":"A: Do you have a ruler? B: ___","a":"Yes, I do. It's in my bag","w":["No, it is a notebook","I am eight years old","Let's go to the library"],"e":"Hỏi có thước không, đáp có và nói nơi để thước."},{"f":"A2","p":"A: Do you have an eraser? B: ___","a":"No, I don't. I have a pen","w":["Yes, this is my teacher","It is red and yellow","May I come in, please"],"e":"Trả lời không có tẩy nhưng có bút là hợp ngữ cảnh."},{"f":"A2","p":"A: What's in your school bag? B: ___","a":"There's a book and a notebook","w":["I like my school bag","It is on the desk now","Yes, I do have one"],"e":"Hỏi trong cặp có gì, liệt kê đồ vật là đúng."},{"f":"A2","p":"A: Can I use your pencil, please? B: ___","a":"Sure. Here you are","w":["No, I am a pupil today","It is my pencil case","Goodbye, see you later"],"e":"Bạn mượn bút chì, đưa bút và nói 'Here you are' là hợp nhất."}],"g3-u9":[{"f":"A1","p":"Read: Mai has a red bag and a blue book. Her pencil is yellow. Her ruler is green. What colour is Mai's bag?","a":"It is red","w":["It is blue","It is yellow","It is green"],"e":"Cặp của Mai màu đỏ."},{"f":"A1","p":"Read: The sky is blue today. The grass in the playground is green. Tom's ball is orange and black. What colour is the grass?","a":"It is green","w":["It is blue","It is orange","It is black"],"e":"Cỏ ở sân chơi màu xanh lá."},{"f":"A1","p":"Read: Linh draws a house. She colours the door brown and the windows white. The roof is red. Which part is white?","a":"The windows","w":["The door","The roof","The house walls"],"e":"Linh tô cửa sổ màu trắng."},{"f":"A1","p":"Read: Nam likes black pencils but today he uses a blue one. His sister likes yellow. She draws a yellow sun. Who draws the sun?","a":"Nam's sister","w":["Nam himself","Mai with a bag","Nobody draws it"],"e":"Em gái của Nam vẽ mặt trời màu vàng."},{"f":"A1","p":"Read: Hoa mixes red and yellow paint. She gets a new colour for her picture of fruit. The new colour is orange. What colour does she get?","a":"Orange","w":["Green","Brown","Black"],"e":"Đoạn nói rõ màu mới là cam (đỏ trộn với vàng)."},{"f":"A1","p":"Read: Look at the rainbow picture. It has red, orange, yellow and green. The children love the bright colours. What is the main idea?","a":"The rainbow has many bright colours","w":["The rainbow is only red","Children draw a black house","A ball is in the picture"],"e":"Ý chính: cầu vồng có nhiều màu tươi sáng."},{"f":"A2","p":"A: What colour is your book? B: ___","a":"It's blue","w":["I have a new book","Yes, it is my book","It's on the table"],"e":"Hỏi màu của sách, trả lời màu xanh dương."},{"f":"A2","p":"A: Is your pencil red? B: ___","a":"No, it isn't. It's yellow","w":["Yes, I am eight years old","It is a long pencil","My bag is red today"],"e":"Phủ định và nói đúng màu bút chì là hợp nhất."},{"f":"A2","p":"A: I like green. What colour do you like? B: ___","a":"I like orange","w":["Green is a nice colour book","This is my ruler here","Thank you very much"],"e":"Hỏi bạn thích màu gì, trả lời màu mình thích."},{"f":"A2","p":"A: Let's colour the sun yellow. B: ___","a":"OK! Yellow is good for the sun","w":["The sun is in my bag","I can count to ten now","Close the book, please"],"e":"Rủ tô mặt trời màu vàng, B đồng ý vì hợp màu mặt trời."}],"g3-u10":[{"f":"A1","p":"Read: At break time, Mai plays chess with Linh. Nam plays football with his friends. Hoa does word puzzles with Anna. What does Mai do at break time?","a":"She plays chess","w":["She plays football","She does word puzzles","She chats with Anna"],"e":"Giờ ra chơi Mai chơi cờ vua với Linh."},{"f":"A1","p":"Read: Phong likes badminton. He plays badminton at break time in the playground. His friend Tom plays basketball near the gym. Where does Phong play badminton?","a":"In the playground","w":["Near the gym","In the classroom","In the library"],"e":"Phong chơi cầu lông ở sân chơi."},{"f":"A1","p":"Read: Two girls chat under a tree at break time. They talk about a story book. They do not run or play ball. What do the girls do?","a":"They chat under a tree","w":["They play basketball","They play table tennis","They do word puzzles"],"e":"Hai bạn gái trò chuyện dưới gốc cây."},{"f":"A1","p":"Read: Ben plays table tennis very well. He wins the game today. His friends say, 'Well done!' Ben smiles. Why do Ben's friends say 'Well done'?","a":"Because Ben plays very well","w":["Because Ben is tired","Because break time ends","Because Ben reads a book"],"e":"Bạn bè khen vì Ben chơi bóng bàn rất giỏi và thắng."},{"f":"A1","p":"Read: At break time, some children play volleyball and some play football. The playground is busy and happy. The children laugh and talk with their friends. What is the main idea?","a":"Children do many activities at break time","w":["All children play football only","Break time is in the classroom","The playground is quiet today"],"e":"Ý chính: giờ ra chơi có nhiều hoạt động khác nhau."},{"f":"A1","p":"Read: Linh does word puzzles at break time. She finds words about colours and school things. The puzzles help her learn new words. In the story, word puzzles help Linh with ___.","a":"new words","w":["new songs","ball games","story books only"],"e":"Trò ô chữ giúp Linh học từ mới."},{"f":"A2","p":"A: What do you do at break time? B: ___","a":"I play badminton with friends","w":["I am in Class 3A today","Yes, it is break time","My school is very big"],"e":"Hỏi giờ ra chơi làm gì, đáp hoạt động cầu lông."},{"f":"A2","p":"A: Let's play chess! B: ___","a":"OK! I like chess","w":["I do word puzzles at home","Thank you, I am fine","Sit down, please now"],"e":"Rủ chơi cờ, đồng ý vì thích cờ là hợp nhất."},{"f":"A2","p":"A: Do you play football at break time? B: ___","a":"No, I don't. I play volleyball","w":["Yes, it is a football book","Football is a nice colour","He plays basketball well"],"e":"Phủ định và nói hoạt động đúng của mình."},{"f":"A2","p":"A: I play basketball at break time. What about you? B: ___","a":"I chat with my friends","w":["Basketball is in my bag","Break time is at school","Yes, you can play it"],"e":"A hỏi còn bạn, B nói mình trò chuyện với bạn."}],"g3-u11":[{"f":"A1","p":"Read: This is Mai's family. Her father is forty years old. Her mother is thirty-five. Mai has one brother. He is twelve years old. How old is Mai's brother?","a":"He is twelve years old","w":["He is forty years old","He is thirty-five years old","He is twenty years old"],"e":"Anh/em trai của Mai 12 tuổi."},{"f":"A1","p":"Read: Nam's sister is fifteen years old. Nam is eleven. Their mother takes them to school every morning. Who is older, Nam or his sister?","a":"His sister is older","w":["Nam is older","They are the same age","Their mother is younger"],"e":"Chị 15 tuổi lớn hơn Nam 11 tuổi."},{"f":"A1","p":"Read: Linh has a big family photo. In the photo, her father stands next to her mother. Her brother and sister sit in front. Where do the brother and sister sit?","a":"In front","w":["Next to father","Behind mother","Near the door only"],"e":"Anh chị em ngồi phía trước trong ảnh."},{"f":"A1","p":"Read: Phong's father is twenty plus fifteen years old. Phong counts: twenty, then fifteen more makes thirty-five. Phong writes the numbers in his notebook. How old is Phong's father?","a":"He is thirty-five years old","w":["He is twenty years old","He is fifteen years old","He is eleven years old"],"e":"20 + 15 = 35, bố của Phong 35 tuổi."},{"f":"A1","p":"Read: My mother is kind. My father is tall. My sister is funny and my brother is nice. We love our family. What is the main idea?","a":"The writer loves his family members","w":["The mother is a teacher","The family has eleven people","The brother is twenty years old"],"e":"Ý chính: người viết yêu các thành viên trong gia đình."},{"f":"A1","p":"Read: Hoa asks, 'Who's this?' Her friend says, 'This is my mother.' The woman in the photo wears a blue dress. Who is the woman in the photo?","a":"Her friend's mother","w":["Hoa's mother","Hoa's sister","Her friend's father"],"e":"Người phụ nữ trong ảnh là mẹ của bạn Hoa."},{"f":"A2","p":"A: Who's this? (pointing to a photo) B: ___","a":"This is my father","w":["He is eleven years old","Yes, it is my family","My name is father today"],"e":"Chỉ ảnh và hỏi là ai, đáp đó là bố mình."},{"f":"A2","p":"A: How old is your sister? B: ___","a":"She's fifteen years old","w":["Her name is Linh Mai","This is my sister photo","I am fine, thank you"],"e":"Hỏi tuổi của chị, trả lời tuổi của chị."},{"f":"A2","p":"A: How old is he? B: ___","a":"He's twenty years old","w":["She's my mother Linh","This is my brother book","Yes, he is my father"],"e":"Hỏi tuổi người nam, đáp anh ấy 20 tuổi."},{"f":"A2","p":"A: This is my family photo. B: ___","a":"Wow! Your family is nice","w":["How old is the photo bag","Goodbye, family photo","I have eleven books now"],"e":"Khoe ảnh gia đình, bạn khen gia đình đẹp là hợp nhất."}],"g3-u12":[{"f":"A1","p":"Read: Mai's mother is a nurse. She works in a hospital and helps sick people. Mai's father is a driver. He drives a taxi. What does Mai's mother do?","a":"She helps sick people","w":["She drives a taxi","She teaches pupils","She cooks in a hotel"],"e":"Mẹ của Mai là y tá, giúp đỡ người bệnh."},{"f":"A1","p":"Read: Mr Nam is a farmer. He works in the field and grows rice. His wife is a cook. She cooks good food in a restaurant. Where does Mr Nam work?","a":"In the field","w":["In a restaurant","In a hospital","In a school"],"e":"Ông Nam là nông dân, làm việc ngoài đồng."},{"f":"A1","p":"Read: A singer sings beautiful songs on stage. A teacher teaches children at school. A doctor helps sick people get well. Who teaches children at school?","a":"A teacher","w":["A singer","A doctor","A worker"],"e":"Giáo viên dạy học sinh ở trường."},{"f":"A1","p":"Read: Linh wants to be a doctor. She studies hard and helps her friends. Her brother wants to be a singer. What does Linh want to be?","a":"A doctor","w":["A singer","A nurse","A driver"],"e":"Linh muốn trở thành bác sĩ."},{"f":"A1","p":"Read: Workers build houses and roads. They work hard every day. We say thank you to them. In the story, workers build ___.","a":"houses and roads","w":["songs and dances","books and notebooks","food and drinks"],"e":"Công nhân xây nhà và làm đường."},{"f":"A1","p":"Read: Many people have different jobs. Cooks cook, farmers grow food and nurses help the sick. Teachers teach children at school. What is the main idea?","a":"Different jobs help everyone","w":["All people are teachers","Jobs are only in hospitals","Singers work in fields"],"e":"Ý chính: mỗi nghề đều giúp ích cho mọi người."},{"f":"A2","p":"A: What's her job? B: ___","a":"She's a nurse","w":["Her name is Mai nurse","She is twelve years old","This is my mother photo"],"e":"Hỏi nghề của cô ấy, đáp cô ấy là y tá."},{"f":"A2","p":"A: What's his job? B: ___","a":"He's a farmer","w":["He's in the classroom","His job is very nice book","Yes, he is my father"],"e":"Hỏi nghề của anh ấy, đáp anh ấy là nông dân."},{"f":"A2","p":"A: Is your father a doctor? B: ___","a":"No, he isn't. He's a driver","w":["Yes, I am fine, thanks","My father is forty now","It is a hospital book"],"e":"Phủ định và nói đúng nghề của bố là tài xế."},{"f":"A2","p":"A: I want to be a teacher. What about you? B: ___","a":"I want to be a singer","w":["Teachers work at school","Thank you very much today","Sit down, please now"],"e":"Hỏi ước mơ nghề nghiệp, B nói muốn làm ca sĩ."}],"g3-u13":[{"f":"A1","p":"Read: My house is small and nice. The living room has a table and chairs. The kitchen is next to the living room. We cook there. Where do we cook?","a":"In the kitchen","w":["In the living room","In the bathroom","In the bedroom"],"e":"Gia đình nấu ăn trong nhà bếp."},{"f":"A1","p":"Read: The lamp is on the table in the living room. The chairs are around the table. At night, the lamp is bright. Where is the lamp?","a":"On the table","w":["Under the table","In the kitchen","Next to the chairs only"],"e":"Đèn ở trên bàn trong phòng khách."},{"f":"A1","p":"Read: Mai's cat is under the chair in the kitchen. Her dog is in the living room, next to the table. The house is quiet in the morning. Where is the cat?","a":"Under the chair","w":["In the living room","Next to the table","In the bathroom"],"e":"Mèo ở dưới ghế trong bếp."},{"f":"A1","p":"Read: We wash in the bathroom. We sleep in the bedroom. We watch TV in the living room. Where do we sleep?","a":"In the bedroom","w":["In the bathroom","In the living room","In the kitchen"],"e":"Ngủ ở phòng ngủ."},{"f":"A1","p":"Read: Phong puts his book on the chair. Then he puts his bag under the table. His mother says the room is tidy. Where is Phong's bag?","a":"Under the table","w":["On the chair","On the table","In the bedroom"],"e":"Cặp của Phong ở dưới bàn."},{"f":"A1","p":"Read: Every room in my house has a job. The kitchen is for cooking and the bathroom is for washing. The living room is for sitting with family. What is the main idea?","a":"Each room is for a different thing","w":["The house has one room only","The living room is a kitchen","Chairs are in the bathroom"],"e":"Ý chính: mỗi phòng trong nhà có một công dụng riêng."},{"f":"A2","p":"A: Where's the chair? B: ___","a":"It's in the living room","w":["It's under a book today","Chair is a nice word","Yes, I have a house"],"e":"Hỏi ghế ở đâu, đáp ghế ở phòng khách."},{"f":"A2","p":"A: Where's the lamp? B: ___","a":"It's on the table","w":["It's a lamp in my house","I like the lamp very much","No, it isn't a chair"],"e":"Hỏi đèn ở đâu, đáp đèn ở trên bàn."},{"f":"A2","p":"A: Is the cat in the kitchen? B: ___","a":"No, it isn't. It's under the table","w":["Yes, the cat is a pet book","Kitchen is a big room","Thank you, I am fine"],"e":"Phủ định và nói đúng vị trí của mèo."},{"f":"A2","p":"A: Let's go to the living room and watch TV. B: ___","a":"OK! I like watching TV there","w":["The living room has chairs","My house is very small","Close the door, please"],"e":"Rủ vào phòng khách xem TV, đồng ý là hợp nhất."}],"g3-u14":[{"f":"A1","p":"Read: My bedroom is small but tidy. There is a bed, a desk and a window. My books are on the desk. What is on the desk?","a":"My books","w":["A bed","A window","A door"],"e":"Sách ở trên bàn học trong phòng ngủ."},{"f":"A1","p":"Read: Linh has a new bed. It is big and blue. Her old desk is small but she likes it. What is big and blue?","a":"Her new bed","w":["Her old desk","Her window","Her bedroom door"],"e":"Giường mới của Linh to và màu xanh."},{"f":"A1","p":"Read: Nam opens the window in his bedroom in the morning. Fresh air comes in. He feels happy. Why does Nam open the window?","a":"To let fresh air in","w":["To see his desk","To close the door","To make the room old"],"e":"Nam mở cửa sổ để không khí trong lành vào phòng."},{"f":"A1","p":"Read: There is a desk in Mai's bedroom. There are two chairs too. Her bed is next to the window. How many chairs are there?","a":"Two chairs","w":["One chair","A desk and a bed","Three chairs"],"e":"Trong phòng có hai cái ghế."},{"f":"A1","p":"Read: Tom's bedroom door is old. He wants a new door. His window is new and big. Which thing does Tom want to change?","a":"The old door","w":["The new window","The big bed","The small desk"],"e":"Tom muốn đổi cánh cửa cũ."},{"f":"A1","p":"Read: A tidy bedroom has a bed for sleeping and a desk for studying. Mai cleans her room every Sunday. Her desk is by the window. What is the main idea?","a":"Mai keeps her bedroom tidy","w":["Mai has a very big house","The desk is in the kitchen","Sunday is a school day"],"e":"Ý chính: Mai giữ phòng ngủ gọn gàng."},{"f":"A2","p":"A: Is there a bed in your bedroom? B: ___","a":"Yes, there is. It's big","w":["No, it is my desk book","My bedroom is very new","I am eight years old"],"e":"Hỏi có giường không, đáp có và mô tả giường."},{"f":"A2","p":"A: What's in your bedroom? B: ___","a":"There's a desk and a window","w":["I sleep in my bedroom","Yes, there is a bed now","My room is small and tidy"],"e":"Hỏi phòng có gì, liệt kê đồ vật là đúng."},{"f":"A2","p":"A: Is your desk new or old? B: ___","a":"It's new and big","w":["It's in my bedroom","Yes, there is a desk","Thank you very much"],"e":"Hỏi bàn mới hay cũ, đáp bàn mới và to."},{"f":"A2","p":"A: Let's open the window. The room is hot. B: ___","a":"OK! Fresh air is good","w":["The window is very big","Close the door, please","I have a new bed now"],"e":"Phòng nóng, đồng ý mở cửa sổ cho mát là hợp nhất."}],"g3-u15":[{"f":"A1","p":"Read: For breakfast, Mai has bread and milk. Her brother has an egg and juice. They eat at the dining table with their mother. What does Mai have for breakfast?","a":"Bread and milk","w":["An egg and juice","Rice and chicken","Fish and water"],"e":"Mai ăn bánh mì và uống sữa vào bữa sáng."},{"f":"A1","p":"Read: Mother asks, 'Would you like some chicken?' Nam says, 'Yes, please.' He likes chicken with rice. What does Nam eat chicken with?","a":"Rice","w":["Bread","Milk","Juice"],"e":"Nam ăn thịt gà với cơm."},{"f":"A1","p":"Read: Linh does not like fish. She eats meat and beans. Her father likes fish very much. Who likes fish?","a":"Her father","w":["Linh herself","Her mother","Nobody likes fish"],"e":"Bố của Linh rất thích cá."},{"f":"A1","p":"Read: There is water and juice on the table. Tom is thirsty after football. He drinks water first. Why does Tom drink water?","a":"Because he is thirsty","w":["Because he is hungry","Because he likes juice only","Because it is breakfast"],"e":"Tom khát sau khi đá bóng nên uống nước."},{"f":"A1","p":"Read: We say 'please' when we want food. Mai says, 'I'd like some rice, please.' Mother gives her rice and an egg. What does Mother give Mai?","a":"Rice and an egg","w":["Bread and milk","Chicken and fish","Juice and water"],"e":"Mẹ đưa cho Mai cơm và một quả trứng."},{"f":"A1","p":"Read: A good meal has rice, meat and vegetables like beans. We drink water and milk too. We eat together at the table. What is the main idea?","a":"A good meal has many kinds of food","w":["We only eat bread daily","Milk is not for meals","Fish is the only food"],"e":"Ý chính: bữa ăn tốt có nhiều loại thức ăn."},{"f":"A2","p":"A: Would you like some milk? B: ___","a":"Yes, please. I like milk","w":["No, it is a dining table","Milk is white and good book","Thank you, goodbye now"],"e":"Được mời sữa, nhận lời vì thích sữa là hợp nhất."},{"f":"A2","p":"A: Would you like some fish? B: ___","a":"No, thanks. I'd like some chicken","w":["Yes, please pass the water","Fish is on the table now","I am eight years old"],"e":"Từ chối cá và xin thịt gà thay thế là đúng ngữ cảnh."},{"f":"A2","p":"A: What would you like for lunch? B: ___","a":"I'd like some rice and meat, please","w":["I like the dining table","Yes, I would like it here","Breakfast is in the morning"],"e":"Hỏi muốn ăn trưa gì, nêu món kèm 'please' là đúng."},{"f":"A2","p":"A: Can I have some water, please? B: ___","a":"Sure. Here you are","w":["Water is very good today","No, I am thirsty too now","It is on the dining table"],"e":"Xin nước, đưa nước kèm 'Here you are' là hợp nhất."}],"g3-u16":[{"f":"A1","p":"Read: Mai has a cat and a dog. The cat is small and white. The dog is big and brown. They play in the garden. Which pet is big?","a":"The dog","w":["The cat","Both pets","A goldfish"],"e":"Con chó to và nâu, mèo nhỏ và trắng."},{"f":"A1","p":"Read: Nam has two parrots. The parrots are green and they can say 'hello'. Nam teaches them every day. What can Nam's parrots do?","a":"They can say hello","w":["They can swim fast","They can run and jump","They can read books"],"e":"Vẹt của Nam biết nói 'hello'."},{"f":"A1","p":"Read: Linh has three goldfish in a bowl. She gives them food every morning. The goldfish are orange and small. How many goldfish does Linh have?","a":"Three goldfish","w":["Two goldfish","One goldfish","Five goldfish"],"e":"Linh có ba con cá vàng."},{"f":"A1","p":"Read: Phong's rabbit likes carrots. It has long ears and white fur. It jumps in the garden. What does the rabbit like to eat?","a":"Carrots","w":["Fish","Rice","Bread"],"e":"Thỏ của Phong thích ăn cà rốt."},{"f":"A1","p":"Read: A bird can fly but a goldfish cannot fly. A goldfish can swim. Mai watches her bird fly in the morning. What can a goldfish do?","a":"It can swim","w":["It can fly","It can jump high","It can say hello"],"e":"Cá vàng biết bơi, không biết bay."},{"f":"A1","p":"Read: Pets need food, water and love. Mai feeds her cat and plays with her dog every day. Her pets are happy and healthy. What is the main idea?","a":"We must take good care of pets","w":["Cats are better than dogs","Pets live in the garden only","Mai has many pets at school"],"e":"Ý chính: cần chăm sóc thú cưng chu đáo."},{"f":"A2","p":"A: Do you have a pet? B: ___","a":"Yes, I do. I have a rabbit","w":["No, it is a pet book today","My pet is very nice name","Thank you, I am fine"],"e":"Hỏi có thú cưng không, đáp có và nói đó là thỏ."},{"f":"A2","p":"A: How many dogs do you have? B: ___","a":"I have two dogs","w":["My dog is big and brown","Yes, I do have dogs","Dogs are my pets now"],"e":"Hỏi số lượng chó, trả lời số lượng là đúng."},{"f":"A2","p":"A: What pet do you have? B: ___","a":"I have a parrot. It can talk","w":["It is in the garden now","Yes, I have a pet here","Parrots are green birds"],"e":"Hỏi có thú cưng gì, nêu vẹt và khả năng của nó."},{"f":"A2","p":"A: Look at my cat! It is small and white. B: ___","a":"Wow! It is so cute","w":["Cats can swim very well","I have three goldfish now","Goodbye, little cat today"],"e":"Khoe mèo, bạn khen mèo dễ thương là hợp nhất."}],"g3-u17":[{"f":"A1","p":"Read: Tom has a red car and a blue train. His sister has a teddy bear. They play with their toys in the living room. What colour is Tom's train?","a":"It is blue","w":["It is red","It is brown","It is green"],"e":"Tàu hoả của Tom màu xanh dương."},{"f":"A1","p":"Read: On a windy day, Mai flies a kite in the park. The kite is high in the sky. Her brother rides a bus toy at home. Where is Mai's kite?","a":"High in the sky","w":["At home with her brother","In the living room","Under a tree"],"e":"Diều của Mai bay cao trên bầu trời."},{"f":"A1","p":"Read: Nam has a big truck. He puts his small cars in the truck. His friend has a plane and a ship. Who has a plane?","a":"Nam's friend","w":["Nam himself","Mai with a kite","Tom with a train"],"e":"Bạn của Nam có máy bay và tàu thuỷ."},{"f":"A1","p":"Read: Linh's teddy bear is soft and brown. She sleeps with it every night. Her train is noisy and fun in the day. When does Linh sleep with her teddy bear?","a":"Every night","w":["Every morning","In the day time","At school only"],"e":"Linh ôm gấu bông ngủ mỗi đêm."},{"f":"A1","p":"Read: Ben has a ship. He plays with it in water. His car cannot go in water. It goes on the road. Where does Ben's car go?","a":"On the road","w":["In the water","In the sky","Under the bed"],"e":"Ô tô của Ben chạy trên đường."},{"f":"A1","p":"Read: Children love toys. Kites fly, trains run and teddy bears are soft friends at night. Children play with toys at home and in the park. What is the main idea?","a":"Different toys are fun in different ways","w":["All toys can fly high","Teddy bears run very fast","Ships go on the road"],"e":"Ý chính: mỗi đồ chơi vui theo một cách riêng."},{"f":"A2","p":"A: What toy do you have? B: ___","a":"I have a kite","w":["Yes, I do have toys","It is in the park now","My toy is very nice book"],"e":"Hỏi có đồ chơi gì, nêu cái diều là đúng."},{"f":"A2","p":"A: He has a new train. B: ___","a":"Wow! Is it big or small?","w":["Trains are toys for boys","Thank you very much today","Goodbye, train friend"],"e":"Nghe bạn có tàu mới, hỏi tàu to hay nhỏ là hợp nhất."},{"f":"A2","p":"A: Let's fly a kite in the park. B: ___","a":"Great! It is windy today","w":["Kites are my favourite toys","I have a bus and a car","Sit down, please now"],"e":"Rủ thả diều, đồng ý vì hôm nay có gió là hợp nhất."},{"f":"A2","p":"A: Do you have a teddy bear? B: ___","a":"Yes, I do. It's soft and brown","w":["No, it is a toy shop book","Teddy bears are cute pets","He has a teddy bear now"],"e":"Trả lời có gấu bông và mô tả nó là đúng."}],"g3-u18":[{"f":"A1","p":"Read: Now Mai is reading a story in her room. Her brother is watching TV in the living room. Their mother is listening to music. What is Mai doing?","a":"She is reading a story","w":["She is watching TV","She is listening to music","She is writing a letter"],"e":"Mai đang đọc truyện trong phòng."},{"f":"A1","p":"Read: Tom is writing in his notebook. He writes about his day at school. Anna is drawing a picture next to him. What is Anna doing?","a":"She is drawing a picture","w":["She is writing a notebook","She is singing a song","She is dancing now"],"e":"Anna đang vẽ tranh bên cạnh Tom."},{"f":"A1","p":"Read: In the music room, Linh is singing and Hoa is dancing. The teacher is playing the piano. The children are happy. Who is dancing?","a":"Hoa is dancing","w":["Linh is dancing","The teacher is dancing","Nobody is dancing"],"e":"Hoa đang nhảy múa, Linh đang hát."},{"f":"A1","p":"Read: Phong is playing basketball in the playground. He runs and jumps. His team is winning. Where is Phong playing basketball?","a":"In the playground","w":["In the music room","In his bedroom","In the living room"],"e":"Phong chơi bóng rổ ở sân chơi."},{"f":"A1","p":"Read: Nam is watching TV about animals. He learns that elephants are big. He tells his sister about them. Why does Nam tell his sister?","a":"Because he learns new things and wants to share them","w":["He is drawing a picture","He wants to sing now","He is writing homework"],"e":"Nam kể vì học được điều mới từ TV và muốn chia sẻ với chị."},{"f":"A1","p":"Read: Everyone is busy this afternoon. Some children read, some sing and some play games. It is a busy and happy afternoon. What is the main idea?","a":"Children are doing different activities","w":["All children are watching TV","Afternoon is for sleeping only","Music room is closed today"],"e":"Ý chính: các bạn đang làm nhiều hoạt động khác nhau."},{"f":"A2","p":"A: What are you doing? B: ___","a":"I'm reading a book","w":["I read books every day book","Yes, I am doing now thanks","This is my story book"],"e":"Hỏi đang làm gì, trả lời bằng thì hiện tại tiếp diễn."},{"f":"A2","p":"A: What is she doing? B: ___","a":"She's listening to music","w":["She listens at school daily","Her music is very nice","I am watching TV now"],"e":"Hỏi cô ấy đang làm gì, đáp cô ấy đang nghe nhạc."},{"f":"A2","p":"A: Are you writing, Nam? B: ___","a":"No, I'm not. I'm drawing","w":["Yes, I write every day thanks","Writing is my hobby now","This is my notebook here"],"e":"Phủ định và nói đúng việc đang làm là vẽ."},{"f":"A2","p":"A: I'm watching TV. What about you? B: ___","a":"I'm singing with my sister","w":["TV is in the living room","Thank you, I am fine today","Close the book, please"],"e":"Hỏi còn bạn, B nói việc mình đang làm."}],"g3-u19":[{"f":"A1","p":"Read: In the park, Mai is cycling with her brother. Hoa is skipping with her friends. Nam is running after his dog. What is Hoa doing?","a":"She is skipping","w":["She is cycling","She is running","She is painting"],"e":"Hoa đang nhảy dây với bạn."},{"f":"A1","p":"Read: It is a windy Sunday. Phong is flying a kite in the field. The kite is red and high. His sister is painting a picture of it. Why is today good for flying a kite?","a":"Because it is windy","w":["Because it is Sunday only","Because the kite is red","Because his sister paints"],"e":"Hôm nay có gió nên tốt để thả diều."},{"f":"A1","p":"Read: Linh is skating in the park. She is careful. Her friend is walking slowly and watching her. Who is walking?","a":"Linh's friend","w":["Linh herself","Mai in the park","Nobody is walking"],"e":"Bạn của Linh đang đi bộ chậm và xem bạn trượt."},{"f":"A1","p":"Read: Two boys are playing badminton outside. They hit the ball over the net. A girl is running around the playground. Where are the boys playing?","a":"Outside","w":["In the gym only","In the classroom","In the library"],"e":"Hai cậu bé chơi cầu lông ở ngoài trời."},{"f":"A1","p":"Read: Anna is painting a tree in the park. She sits under the tree and uses green and brown. Anna smiles as she paints. What colours does Anna use?","a":"Green and brown","w":["Red and blue","Green and yellow","Brown and black"],"e":"Anna dùng màu xanh lá và nâu để vẽ cây."},{"f":"A1","p":"Read: Outdoor activities are fun and good for health. Children cycle, run and fly kites in the fresh air. They play together after school. What is the main idea?","a":"Outdoor activities are fun and healthy","w":["Parks are only for walking","Kites are good for health only","Children paint at home daily"],"e":"Ý chính: hoạt động ngoài trời vui và tốt cho sức khoẻ."},{"f":"A2","p":"A: What's she doing? B: ___","a":"She's flying a kite","w":["She flies kites on Sunday","Her kite is red and big","I am cycling in the park"],"e":"Hỏi cô ấy đang làm gì, đáp đang thả diều."},{"f":"A2","p":"A: What are they doing in the park? B: ___","a":"They're playing badminton","w":["They play in the park book","Badminton is an outdoor game","Yes, they are in the park"],"e":"Hỏi họ đang làm gì, đáp họ đang chơi cầu lông."},{"f":"A2","p":"A: Is he cycling? B: ___","a":"No, he isn't. He's running","w":["Yes, he cycles every day","Cycling is good for him","This is his new bike here"],"e":"Phủ định và nói đúng việc anh ấy đang chạy."},{"f":"A2","p":"A: Let's go skating in the park! B: ___","a":"Great! I like skating","w":["Skating is an outdoor activity","My skates are new and red","Thank you very much today"],"e":"Rủ trượt băng, đồng ý vì thích là hợp nhất."}],"g3-u20":[{"f":"A1","p":"Read: At the zoo, Mai can see elephants and tigers. The elephants are big and grey. The tigers are orange and black. Which animals are big and grey?","a":"The elephants","w":["The tigers","The monkeys","The peacocks"],"e":"Voi to và màu xám."},{"f":"A1","p":"Read: The monkeys are climbing trees at the zoo. They are funny. Children laugh and watch them. What are the monkeys doing?","a":"They are climbing trees","w":["They are swinging in water","They are counting numbers","They are sleeping now"],"e":"Khỉ đang leo cây ở sở thú."},{"f":"A1","p":"Read: A peacock has beautiful long feathers. It walks slowly near the gate. Many visitors take photos of it. Why do visitors take photos of the peacock?","a":"Because it is beautiful","w":["Because it is climbing","Because it can count well","Because it is very big"],"e":"Du khách chụp ảnh vì con công đẹp."},{"f":"A1","p":"Read: Nam is counting horses at the zoo. One, two, three, four horses. They are brown and they can run fast. How many horses does Nam count?","a":"Four horses","w":["Three horses","Two horses","Five horses"],"e":"Nam đếm được bốn con ngựa."},{"f":"A1","p":"Read: The tiger is big and strong. It cannot climb trees like a monkey, but it can run very fast. The tiger lives at the zoo. What can the tiger do?","a":"It can run very fast","w":["It can climb trees well","It can swing on trees","It can count to ten"],"e":"Hổ chạy rất nhanh, không leo cây như khỉ."},{"f":"A1","p":"Read: At the zoo, we can see many animals. Some climb, some run and some walk slowly. The animals are interesting to watch. What is the main idea?","a":"The zoo has many different animals","w":["All zoo animals can climb","Monkeys are the only animals","Visitors count every animal"],"e":"Ý chính: sở thú có nhiều loài vật khác nhau."},{"f":"A2","p":"A: What can you see at the zoo? B: ___","a":"I can see a tiger","w":["Yes, I can see animals","The zoo is big and nice","Tigers are strong animals"],"e":"Hỏi nhìn thấy gì, nêu con hổ là đúng."},{"f":"A2","p":"A: What's the monkey doing? B: ___","a":"It's swinging","w":["It can climb trees well","Monkeys are funny animals","I can see a monkey now"],"e":"Hỏi khỉ đang làm gì, đáp nó đang đánh đu."},{"f":"A2","p":"A: Can you see the elephants? B: ___","a":"Yes, I can. They are very big","w":["Elephants are grey and big","I go to the zoo on Sunday","Thank you, I am fine today"],"e":"Trả lời thấy voi và mô tả voi to là hợp nhất."},{"f":"A2","p":"A: Look! The peacock is so beautiful. B: ___","a":"Yes! I love its long feathers","w":["Peacocks live at the zoo","Can you count them now","Goodbye, beautiful peacock"],"e":"Bạn khen con công đẹp, đồng ý và khen bộ lông dài."}],"g3-review":[{"f":"A1","p":"Read: My name is An. I am eight years old. I have a red school bag with a book and a ruler. At break time, I play chess with my friend. What colour is An's school bag?","a":"It is red","w":["It is blue","It is green","It is yellow"],"e":"Cặp của An màu đỏ."},{"f":"A1","p":"Read: Linh's mother is a nurse and her father is a farmer. At home, Linh has a small cat. The cat is under the chair in the living room. Where is Linh's cat?","a":"Under the chair","w":["In the kitchen","On the table","In the bedroom"],"e":"Mèo của Linh ở dưới ghế phòng khách."},{"f":"A1","p":"Read: At the zoo, Tom can see a tiger and monkeys. The monkeys are climbing. For lunch, Tom would like some rice and chicken. What are the monkeys doing?","a":"They are climbing","w":["They are eating rice","They are sleeping now","They are swimming fast"],"e":"Khỉ ở sở thú đang leo trèo."},{"f":"A1","p":"Read: Mai's bedroom has a new desk and a big bed. Her hobby is painting. Today she paints a yellow sun and a blue house. What is Mai's hobby?","a":"Painting","w":["Cooking","Dancing","Swimming"],"e":"Sở thích của Mai là vẽ/tô tranh."},{"f":"A1","p":"Read: Phong goes to the library to read books. At break time, he plays badminton in the playground. His pet dog runs with him after school. Where does Phong read books?","a":"In the library","w":["In the playground","In the music room","In his bedroom"],"e":"Phong đọc sách ở thư viện."},{"f":"A1","p":"Read: Hoa has breakfast with bread and milk. Then she counts her pencils: one, two, three, four, five. She puts them in her pencil case. How many pencils does Hoa have?","a":"Five pencils","w":["Four pencils","Three pencils","Six pencils"],"e":"Hoa đếm được năm cây bút chì."},{"f":"A2","p":"Pupil (at the classroom door): May I come in, teacher? Teacher: ___","a":"Yes, you can. Come in, please","w":["Sit down and open your book","Your name is eight years old","Goodbye, see you tomorrow"],"e":"Học sinh xin vào, cô cho phép và mời vào là đúng."},{"f":"A2","p":"In the playground, An asks his new friend: What's your hobby? B: ___","a":"I like swimming","w":["My hobby is a school bag","This is my teacher Mai","It is under the table"],"e":"Hỏi sở thích, trả lời thích bơi là đúng."},{"f":"A2","p":"A: Would you like some juice? B: ___","a":"Yes, please","w":["Juice is on the dining table","I have a pet parrot now","No, it is a colour book"],"e":"Được mời nước ép, nhận lời lịch sự là hợp nhất."},{"f":"A2","p":"A: What are you doing now? B: ___","a":"I'm listening to music","w":["I am nine years old today","This is my bedroom desk","Yes, I can see a tiger"],"e":"Hỏi đang làm gì, đáp đang nghe nhạc là đúng."}],"dd3-toquoc":[{"f":"X1","p":"Giờ chào cờ sáng thứ hai, An nghe một bạn nói chuyện cười đùa trong lúc hát Quốc ca. An nên làm gì?","a":"Nhắc bạn giữ nghiêm trang khi chào cờ","w":["Cười đùa cùng bạn","Hát thật to át tiếng bạn","Quay sang nhìn bạn suốt buổi"],"e":"Giữ nghiêm trang khi chào cờ thể hiện lòng yêu nước và tôn trọng Quốc kì."},{"f":"X1","p":"Lớp Bình được phân công chăm sóc bồn hoa trước cột cờ. Bình thấy hoa héo vì thiếu nước. Bình nên làm gì?","a":"Cùng các bạn tưới nước chăm sóc bồn hoa","w":["Mặc kệ vì không phải hoa nhà mình","Nhổ hoa héo vứt đi","Đổ lỗi cho tổ khác chăm sóc"],"e":"Chăm sóc cảnh quan trường, nơi có cột cờ, là việc làm yêu Tổ quốc gần gũi."},{"f":"X1","p":"Chi đi tham quan bảo tàng, thấy lá cờ Tổ quốc được trưng bày trang trọng. Chi nên có thái độ thế nào?","a":"Nghiêm trang, tự hào khi nghe giới thiệu","w":["Chạy nhảy ồn ào trong phòng trưng bày","Chạm tay sờ vào hiện vật","Nói chuyện riêng suốt buổi"],"e":"Thái độ nghiêm trang khi tham quan di tích thể hiện lòng yêu nước."},{"f":"X1","p":"Dũng nhặt được một lá cờ nhỏ bị rơi bẩn ở sân trường sau lễ kỉ niệm. Dũng nên làm gì?","a":"Nhặt cờ lên, phủi sạch và đưa cho thầy cô","w":["Để cờ nằm dưới đất mặc kệ","Giẫm lên cờ khi đi qua","Mang cờ về làm đồ chơi"],"e":"Nhặt và giữ gìn lá cờ thể hiện tôn trọng biểu tượng Tổ quốc."},{"f":"X1","p":"Hà rất thích tìm hiểu về các anh hùng nhỏ tuổi của đất nước. Hà có thể làm gì để học tập họ?","a":"Đọc sách về họ và chăm ngoan, học giỏi","w":["Chỉ xem tranh cho vui","Kể sai chuyện về họ cho bạn nghe","Cho rằng chuyện xưa không liên quan mình"],"e":"Học tập tấm gương anh hùng bằng việc chăm học là yêu nước thiết thực."},{"f":"X1","p":"Ngày lễ lớn, phố của Tuấn treo nhiều cờ đỏ sao vàng. Một lá cờ bị nghiêng sắp rơi. Tuấn nên làm gì?","a":"Báo người lớn trong nhà ra treo lại cờ ngay ngắn","w":["Để cờ rơi xuống đất cũng được","Lấy cờ xuống mang vào nhà chơi","Trèo lên cao tự treo lại một mình"],"e":"Báo người lớn treo lại cờ ngay ngắn là giữ gìn hình ảnh Tổ quốc."},{"f":"X1","p":"Lan được chọn đọc bài phát biểu dưới cờ nhưng Lan run và muốn từ chối. Lan nên nghĩ thế nào?","a":"Đây là vinh dự, cố gắng tập luyện để làm tốt","w":["Từ chối ngay vì sợ sai","Đọc qua loa cho xong","Nhờ bạn đọc thay mình"],"e":"Được phát biểu dưới cờ là vinh dự, em nên cố gắng hoàn thành."},{"f":"X1","p":"Minh xem tivi thấy đội tuyển Việt Nam thi đấu quốc tế và giành chiến thắng. Minh cảm thấy thế nào là phù hợp?","a":"Vui mừng và tự hào về đất nước","w":["Không quan tâm vì không quen ai","Thấy khó chịu khi mọi người vui mừng","Cho rằng thắng thua không đáng để ý"],"e":"Niềm tự hào khi đất nước được vinh danh là tình yêu Tổ quốc."},{"f":"X1","p":"Quân có bạn là người nước ngoài hỏi về Việt Nam. Quân nên giới thiệu điều gì?","a":"Những cảnh đẹp và truyền thống tốt đẹp của đất nước","w":["Nói xấu quê hương mình","Không biết gì vì chưa tìm hiểu","Chỉ kể những điều chưa tốt"],"e":"Giới thiệu điều tốt đẹp về đất nước thể hiện lòng tự hào dân tộc."},{"f":"X1","p":"Vy nghe cô kể về biển đảo quê hương. Vy muốn thể hiện tình yêu biển đảo bằng việc gì gần gũi nhất?","a":"Học giỏi và giữ gìn môi trường biển khi đi du lịch","w":["Vẽ bậy lên đá ở bãi biển","Mang san hô về nhà làm kỉ niệm","Xả rác ở bãi biển quê hương"],"e":"Yêu biển đảo thể hiện qua học tập và bảo vệ môi trường biển."}],"dd3-hangxom":[{"f":"X1","p":"Tối muộn, An và em trai chơi đùa hét rất to, nhà bên cạnh có em bé đang ngủ. Mẹ nhắc, An nên làm gì?","a":"Chơi nhẹ nhàng, giữ yên lặng cho hàng xóm nghỉ","w":["Vẫn hét to vì đang ở nhà mình","Hét qua cửa sổ trêu em bé","Giận mẹ vì bị nhắc"],"e":"Giữ yên lặng buổi tối là tôn trọng hàng xóm láng giềng."},{"f":"X1","p":"Bác hàng xóm của Bình bị ốm, con cái đi làm xa. Bình có thể giúp bác việc gì vừa sức?","a":"Hỏi thăm bác và giúp bác việc nhỏ như lấy nước","w":["Sang nhà bác chơi ồn ào","Mặc kệ vì không phải người thân","Đòi bác kể chuyện cho nghe"],"e":"Quan tâm hàng xóm khi ốm đau là tình làng nghĩa xóm."},{"f":"X1","p":"Chi làm bóng bay qua tường rơi vào sân nhà hàng xóm. Chi nên làm gì để lấy lại bóng?","a":"Sang gõ cửa xin phép bác hàng xóm rồi vào lấy","w":["Trèo tường vào lấy luôn","Đá vỡ chậu hoa nhà bác khi tức giận","Bỏ bóng, không cần lấy nữa"],"e":"Xin phép trước khi vào nhà hàng xóm là lễ phép và tôn trọng."},{"f":"X1","p":"Gia đình Dũng mới chuyển đến khu phố mới. Dũng muốn làm quen với hàng xóm. Dũng nên làm gì?","a":"Chào hỏi lễ phép khi gặp các bác hàng xóm","w":["Tránh mặt không chào ai","Chạy chơi ồn ào trước cửa nhà họ","Nhìn vào nhà họ qua cửa sổ"],"e":"Chào hỏi lễ phép giúp xây dựng quan hệ hàng xóm thân thiện."},{"f":"X1","p":"Nhà Hà có cây mít sai quả, quả chín rụng sang sân nhà bên. Hà nên ứng xử thế nào?","a":"Xin lỗi nhà bên và cùng dọn quả rụng","w":["Để mặc quả thối ở sân nhà bạn","Đòi nhà bên trả tiền quả mít","Trèo sang hái hết quả bên đó"],"e":"Xin lỗi và dọn dẹp khi cây nhà mình ảnh hưởng hàng xóm là ứng xử đẹp."},{"f":"X1","p":"Tuấn thấy bác hàng xóm già sống một mình đang xách nước nặng từ giếng về. Tuấn có thể làm gì?","a":"Xách giúp bác một xô nước nhỏ vừa sức","w":["Đứng nhìn bác xách cho quen","Chạy chơi, không liên quan mình","Đổ nước của bác cho nhẹ bớt"],"e":"Giúp đỡ hàng xóm già yếu việc vừa sức là nghĩa tình xóm giềng."},{"f":"X1","p":"Hai nhà hàng xóm cãi nhau vì tiếng ồn, Lan nghe thấy rõ. Lan nên làm gì?","a":"Không tham gia, báo bố mẹ nếu ồn ào kéo dài","w":["Sang xem và cổ vũ hai bên","Kể lại chuyện cho nhiều người nghe","Đứng giữa can ngăn hai người lớn"],"e":"Việc của người lớn, em nên tránh xa và báo bố mẹ khi cần."},{"f":"X1","p":"Minh đá cầu làm vỡ kính cửa sổ nhà bác hàng xóm. Minh rất sợ bị mắng. Minh nên làm gì?","a":"Cùng bố mẹ sang xin lỗi và nhận lỗi với bác","w":["Chạy trốn, không nhận là mình","Đổ cho bạn khác đá","Giấu chuyện này mãi mãi"],"e":"Nhận lỗi và xin lỗi hàng xóm khi làm hỏng đồ là trung thực, có trách nhiệm."},{"f":"X1","p":"Đầu năm mới, Quân cùng gia đình đi chúc Tết hàng xóm. Quân nên nói gì với các bác?","a":"Chúc các bác năm mới sức khỏe, an khang","w":["Chúc bác cho cháu nhiều lì xì","Không nói gì, chỉ chờ nhận lì xì","Chạy vào nhà bác tự lấy bánh kẹo"],"e":"Lời chúc Tết lễ phép thể hiện tình cảm hàng xóm tốt đẹp."},{"f":"X1","p":"Nhà Vy tổ chức tiệc nhỏ, nhạc mở hơi to đến khuya. Hàng xóm sang nhắc khéo. Vy nên góp ý với bố mẹ thế nào?","a":"Nên vặn nhỏ nhạc để không phiền hàng xóm","w":["Mở to hơn vì nhà mình có tiệc","Mặc kệ lời nhắc của hàng xóm","Ra cãi với bác hàng xóm"],"e":"Tôn trọng lời nhắc của hàng xóm giúp giữ hòa khí xóm giềng."}],"dd3-hamhoc":[{"f":"X1","p":"An rất tò mò vì sao lá cây lại có màu xanh. An nên làm gì để thỏa mãn trí tò mò đúng cách?","a":"Hỏi cô giáo và tìm đọc sách về cây xanh","w":["Bứt hết lá cây trong vườn xem thử","Đoán bừa một lí do rồi kể cho bạn","Bỏ qua vì câu hỏi khó quá"],"e":"Đặt câu hỏi và tìm đọc sách là biểu hiện của ham học hỏi."},{"f":"X1","p":"Bình đọc một cuốn truyện khoa học nhưng có nhiều từ khó không hiểu. Bình nên làm gì?","a":"Tra từ điển và hỏi người lớn những từ chưa hiểu","w":["Bỏ cuốn sách không đọc nữa","Bỏ qua hết các đoạn khó","Đoán nghĩa bừa cho qua"],"e":"Tìm hiểu từ khó giúp em đọc hiểu sâu hơn, đúng tinh thần ham học."},{"f":"X1","p":"Chi thấy bạn làm thí nghiệm đơn giản với nước và dầu ăn rất thú vị. Chi muốn học làm theo. Chi nên làm gì?","a":"Hỏi bạn cách làm và làm thử có người lớn bên cạnh","w":["Tự làm một mình với đồ nguy hiểm","Chê thí nghiệm của bạn chán","Giành đồ của bạn làm trước"],"e":"Học hỏi cách làm mới một cách an toàn là ham học hỏi."},{"f":"X1","p":"Dũng nghe cô giới thiệu về các hành tinh nhưng chưa nhớ hết. Sau giờ học, Dũng nên làm gì?","a":"Tìm sách ở thư viện đọc thêm về hành tinh","w":["Quên luôn vì cô không kiểm tra","Đợi đến lớp sau cô nhắc lại","Kể sai thông tin cho bạn nghe"],"e":"Chủ động tìm đọc thêm ngoài giờ học là ham học hỏi."},{"f":"X1","p":"Hà thích quan sát đàn kiến tha mồi ở sân trường mỗi giờ ra chơi. Việc làm nào giúp Hà học thêm điều mới?","a":"Ghi lại điều quan sát được và hỏi cô giáo","w":["Bắt kiến bỏ vào hộp mang về lớp nghịch","Phá tổ kiến xem bên trong","Rủ bạn giẫm lên đường đi của kiến"],"e":"Quan sát và ghi chép giúp em khám phá thế giới xung quanh."},{"f":"X1","p":"Trong giờ học, Tuấn có thắc mắc nhưng ngại giơ tay vì sợ bạn cười. Tuấn nên làm gì?","a":"Mạnh dạn giơ tay hỏi cô giáo điều chưa hiểu","w":["Giữ thắc mắc mãi không hỏi ai","Hỏi bạn bên cạnh trong lúc cô giảng","Bỏ qua phần đó không học"],"e":"Mạnh dạn đặt câu hỏi giúp em hiểu bài sâu hơn."},{"f":"X1","p":"Lan được tặng một bộ xếp hình khó, ghép mãi chưa xong. Lan nên có thái độ nào?","a":"Kiên trì tìm cách ghép và học từ các lần sai","w":["Vứt bộ xếp hình vì khó quá","Đòi bố mẹ ghép hộ hết","Giận dỗi khóc vì không ghép được"],"e":"Kiên trì trước thử thách mới là tinh thần ham học hỏi."},{"f":"X1","p":"Minh rất thích giờ kể chuyện lịch sử của cô. Minh muốn biết thêm về một nhân vật. Minh nên làm gì?","a":"Mượn sách lịch sử ở thư viện để đọc thêm","w":["Chỉ nghe kể một lần là đủ","Đợi lớn lên mới tìm hiểu","Kể lại sai lệch câu chuyện cho bạn"],"e":"Tìm đọc thêm về điều mình yêu thích là ham học hỏi."},{"f":"X1","p":"Quân thấy một loại cây lạ trong vườn trường không biết tên. Quân nên làm thế nào để biết tên cây?","a":"Hỏi thầy cô và tra sách về cây cối","w":["Bẻ một cành mang về nhà tự đoán","Gắn cho cây một cái tên tự nghĩ","Viết tên bừa lên bảng tên cây"],"e":"Tìm thông tin chính xác về điều chưa biết là ham học hỏi đúng cách."},{"f":"X1","p":"Vy học được một bài hát tiếng Anh mới ở lớp và rất thích. Về nhà, Vy nên làm gì để giỏi hơn?","a":"Luyện hát lại và học nghĩa của lời bài hát","w":["Chỉ hát một lần ở lớp là đủ","Khoe với bạn nhưng không luyện thêm","Quên luôn bài hát sau buổi học"],"e":"Ôn luyện thêm điều đã học giúp em tiến bộ mỗi ngày."}],"dd3-loihua":[{"f":"X1","p":"An hứa với bà sẽ gọi điện hỏi thăm bà mỗi cuối tuần. Tuần này An bận chơi với bạn. An nên làm gì?","a":"Vẫn gọi điện cho bà đúng như đã hứa","w":["Quên luôn lời hứa với bà","Gọi vào tuần sau gộp hai lần","Nhờ em gái gọi thay mình"],"e":"Đã hứa thì cố gắng thực hiện đúng, đó là giữ lời hứa."},{"f":"X1","p":"Bình hứa mượn truyện của bạn sẽ trả vào thứ hai. Thứ hai Bình quên mang theo. Bình nên làm gì?","a":"Xin lỗi bạn và mang trả ngay hôm sau","w":["Giả vờ đã trả rồi","Giấu truyện không trả nữa","Đổ lỗi cho mẹ không nhắc"],"e":"Quên trả đồ đã hứa thì xin lỗi và trả ngay khi nhớ ra."},{"f":"X1","p":"Chi hứa với cô sẽ hoàn thành bài vẽ trong tuần. Giữa tuần Chi vẫn chưa vẽ. Chi nên làm gì?","a":"Bắt tay vẽ ngay để kịp hoàn thành đúng hạn","w":["Để đến cuối tuần mới lo","Xin cô bỏ qua bài vẽ này","Nhờ bạn vẽ hộ cho kịp"],"e":"Chủ động thực hiện lời hứa đúng hạn là giữ lời hứa."},{"f":"X1","p":"Dũng hứa giúp bạn trực nhật chiều nay nhưng lại muốn về sớm đá bóng. Dũng nên chọn cách nào?","a":"Làm trực nhật xong rồi mới đi đá bóng","w":["Bỏ trực nhật đi đá bóng luôn","Nhờ bạn khác làm thay không nói trước","Làm qua loa thật nhanh cho xong"],"e":"Việc đã hứa cần làm trước việc chơi của bản thân."},{"f":"X1","p":"Hà hứa với mẹ sẽ không chơi điện thoại quá 30 phút mỗi ngày. Hôm nay Hà chơi quá giờ. Hà nên làm gì?","a":"Nhận lỗi với mẹ và tự giác cất điện thoại","w":["Giấu mẹ chuyện chơi quá giờ","Chơi thêm vì mẹ chưa phát hiện","Đổ cho em mượn máy lâu"],"e":"Nhận lỗi khi chưa giữ đúng lời hứa là trung thực và có trách nhiệm."},{"f":"X1","p":"Tuấn hứa tặng bạn một bức tranh do mình vẽ vào sinh nhật bạn. Gần đến ngày Tuấn chưa vẽ xong. Tuấn nên làm gì?","a":"Tranh thủ hoàn thành bức tranh để tặng đúng hẹn","w":["Mua tạm một món quà khác thay thế không nói gì","Quên luôn lời hứa tặng tranh","Xin lỗi bạn nhưng không vẽ nữa"],"e":"Cố gắng hoàn thành điều đã hứa thay vì bỏ dở."},{"f":"X1","p":"Lan hứa với em sẽ dạy em tập xe đạp vào chủ nhật. Chủ nhật trời nắng đẹp, bạn rủ Lan đi bơi. Lan nên làm gì?","a":"Dạy em tập xe như đã hứa, đi bơi sau","w":["Đi bơi với bạn, để em chờ","Dạy em qua loa vài phút rồi đi","Hẹn em sang tuần sau nữa"],"e":"Giữ lời hứa với em nhỏ giúp em tin tưởng vào chị."},{"f":"X1","p":"Minh hứa không tiết lộ bí mật mà bạn tin tưởng kể cho mình. Bạn khác gặng hỏi mãi. Minh nên làm gì?","a":"Giữ kín bí mật của bạn như đã hứa","w":["Kể cho một bạn thân khác nghe","Kể hết vì bạn kia hỏi nhiều lần","Gợi ý úp mở cho bạn kia đoán"],"e":"Giữ kín điều đã hứa giữ kín là biểu hiện giữ lời hứa."},{"f":"X1","p":"Quân hứa với bố sẽ đạt tiến bộ môn Toán kì này. Giữa kì Quân thấy Toán vẫn khó. Quân nên làm gì?","a":"Cố gắng học thêm và hỏi thầy cô để tiến bộ","w":["Bỏ cuộc vì khó quá","Giấu bố kết quả học tập","Nói dối bố là mình đã giỏi Toán"],"e":"Cố gắng thực hiện mục tiêu đã hứa là giữ lời hứa với bản thân và gia đình."},{"f":"X1","p":"Vy hứa mang sách trả thư viện đúng hạn cho cả nhóm mượn chung. Vy bận việc lớp. Vy nên làm gì?","a":"Tranh thủ mang sách trả đúng hạn","w":["Để quá hạn cũng không sao","Nhờ bạn khác trả nhưng không dặn dò kĩ","Giấu sách để khỏi phải trả"],"e":"Trả sách đúng hạn là giữ lời hứa và trách nhiệm với tập thể."}],"dd3-nhiemvu":[{"f":"X1","p":"Cô giao An nhiệm vụ đếm sĩ số lớp mỗi sáng trong tuần này. Một sáng An đến muộn. An nên làm gì?","a":"Báo cô và nhờ bạn hỗ trợ đếm hôm đó, mai làm bù","w":["Bỏ luôn nhiệm vụ cả tuần","Đoán bừa sĩ số cho xong","Giận bạn vì không đếm thay"],"e":"Chủ động báo và sắp xếp khi gặp khó khăn là hoàn thành nhiệm vụ có trách nhiệm."},{"f":"X1","p":"Bình được giao tưới cây ở góc lớp. Bình thấy cây vẫn ẩm đất. Bình nên làm gì?","a":"Kiểm tra đất, tưới vừa đủ cho cây","w":["Tưới thật nhiều nước cho chắc","Bỏ tưới luôn cả tuần","Đổ nước sang chậu khác"],"e":"Làm nhiệm vụ cẩn thận, phù hợp thực tế là làm đến nơi đến chốn."},{"f":"X1","p":"Chi được phân công làm tổ trưởng tuần này, nhiệm vụ kiểm tra vệ sinh tổ. Bạn thân của Chi để bàn bẩn. Chi nên làm gì?","a":"Nhắc bạn dọn bàn như với mọi bạn khác","w":["Bỏ qua vì là bạn thân","Tự dọn thay bạn mãi","Bao che khi cô hỏi"],"e":"Làm nhiệm vụ công bằng, không thiên vị là hoàn thành tốt nhiệm vụ."},{"f":"X1","p":"Dũng nhận nhiệm vụ mang bản đồ lên lớp cho tiết học sau nhưng giữa giờ Dũng quên mất. Nhớ ra, Dũng nên làm gì?","a":"Chạy đi lấy bản đồ ngay để kịp giờ học","w":["Để tiết sau cô tự đi lấy","Đổ lỗi cho bạn không nhắc","Bỏ luôn nhiệm vụ này"],"e":"Nhớ ra và sửa ngay giúp nhiệm vụ hoàn thành đúng lúc."},{"f":"X1","p":"Nhóm Hà được giao làm báo tường, Hà phụ trách phần vẽ. Các bạn viết xong mà Hà chưa vẽ. Hà nên làm gì?","a":"Tập trung hoàn thành phần vẽ đúng hẹn nhóm đã thống nhất","w":["Để các bạn chờ mình thong thả","Bỏ phần vẽ cho bạn khác làm","Vẽ qua loa cho có"],"e":"Hoàn thành phần việc đúng hẹn là trách nhiệm với nhóm."},{"f":"X1","p":"Tuấn được giao nhiệm vụ giữ trật tự hàng khi lớp xếp hàng ra về. Hàng hôm nay ồn. Tuấn nên làm gì?","a":"Nhắc các bạn giữ trật tự nhẹ nhàng, nghiêm túc","w":["La hét to hơn các bạn","Bỏ nhiệm vụ đứng nói chuyện riêng","Chỉ nhắc bạn mình ghét"],"e":"Thực hiện nhiệm vụ nghiêm túc giúp tập thể nề nếp."},{"f":"X1","p":"Lan nhận nhiệm vụ phát vở cho cả lớp. Phát đến cuối, Lan phát hiện thiếu một cuốn. Lan nên làm gì?","a":"Kiểm tra lại danh sách và báo cô giáo","w":["Phát bừa cho bạn cuối một cuốn khác","Giấu việc thiếu vở","Đổ cho bạn phát cùng làm mất"],"e":"Kiểm tra và báo ngay khi có sai sót là làm nhiệm vụ cẩn thận."},{"f":"X1","p":"Minh được giao nhiệm vụ cho cá cảnh của lớp ăn mỗi ngày. Một hôm, Minh quên cho cá ăn. Minh nên làm gì?","a":"Cho cá ăn ngay khi nhớ ra và rút kinh nghiệm ghi nhớ","w":["Bỏ luôn nhiệm vụ chăm cá","Cho cá ăn gấp đôi bù vào","Giấu cô chuyện quên cho cá ăn"],"e":"Biết sửa sai ngay trong nhiệm vụ được giao là có trách nhiệm."},{"f":"X1","p":"Quân phụ trách tắt điện, quạt khi lớp ra về. Hôm nay Quân vội về ăn cơm. Quân nên làm gì?","a":"Vẫn kiểm tra và tắt điện quạt rồi mới về","w":["Về luôn, mai tắt cũng được","Nhờ em lớp dưới vào tắt hộ","Để quạt chạy cho lớp mát mai học"],"e":"Hoàn thành nhiệm vụ đến cùng dù vội là tích cực hoàn thành nhiệm vụ."},{"f":"X1","p":"Vy được cô tin tưởng giao giữ chìa khóa tủ sách lớp trong tuần. Vy nên giữ chìa khóa thế nào?","a":"Cất cẩn thận và chỉ mở tủ khi cần, đúng quy định","w":["Cho bạn mượn chìa khóa tự mở tủ","Để chìa khóa lung tung trên bàn","Mang chìa khóa về nhà chơi"],"e":"Giữ gìn vật được giao cẩn thận là biểu hiện có trách nhiệm."}],"dd3-khampha":[{"f":"X1","p":"An vẽ rất đẹp nhưng hát chưa hay. Khi lớp chọn đội văn nghệ, An nên nghĩ thế nào về bản thân?","a":"Mình có điểm mạnh là vẽ, có thể đóng góp trang trí sân khấu","w":["Mình kém cỏi vì hát không hay","Không tham gia hoạt động nào của lớp","Chỉ bạn hát hay mới giỏi"],"e":"Hiểu điểm mạnh của mình giúp em đóng góp phù hợp cho tập thể."},{"f":"X1","p":"Bình chạy nhanh nhất lớp nhưng hay hấp tấp làm bài ẩu. Bình nên làm gì để tiến bộ?","a":"Nhận ra điểm yếu hấp tấp và tập làm bài chậm, cẩn thận","w":["Cho rằng mình giỏi nên không cần sửa","Bỏ luôn các bài cần cẩn thận","Đổ lỗi cho đề bài dài"],"e":"Nhận biết điểm yếu và sửa dần là khám phá và hoàn thiện bản thân."},{"f":"X1","p":"Chi chưa biết mình thích môn nào nhất. Cách nào giúp Chi khám phá sở thích của mình?","a":"Thử tham gia nhiều hoạt động và để ý điều mình say mê","w":["Ngồi chờ sở thích tự đến","Chọn theo bạn thân cho giống nhau","Không cần biết sở thích của mình"],"e":"Trải nghiệm nhiều hoạt động giúp em tìm ra sở thích thật sự."},{"f":"X1","p":"Dũng giỏi lắp ráp mô hình nhưng ngại nói trước đám đông. Dũng muốn rèn luyện thêm. Dũng nên bắt đầu thế nào?","a":"Tập trình bày mô hình của mình trước nhóm nhỏ","w":["Tránh mọi hoạt động nói trước lớp","Nhờ bạn nói hộ mãi mãi","Bỏ sở thích lắp mô hình"],"e":"Rèn luyện dần từ việc nhỏ giúp em vượt qua điểm yếu."},{"f":"X1","p":"Hà được cô nhận xét là chữ viết đẹp nhưng trình bày bài còn rối. Hà nên tiếp thu thế nào?","a":"Ghi nhận góp ý và luyện trình bày bài rõ ràng hơn","w":["Buồn và giấu bài đi","Cho rằng cô nhận xét sai về mình","Không cần thay đổi gì"],"e":"Lắng nghe góp ý giúp em hiểu mình và tiến bộ."},{"f":"X1","p":"Tuấn thích đá bóng nhưng không được chọn vào đội tuyển trường đợt này. Tuấn nên nghĩ thế nào?","a":"Mình còn yếu ở kĩ thuật, cần luyện tập thêm","w":["Mình là người kém nhất lớp","Đội tuyển chọn sai người","Bỏ đá bóng luôn từ nay"],"e":"Nhìn nhận khả năng thật của mình giúp em cố gắng đúng hướng."},{"f":"X1","p":"Lan hay quên đồ dùng học tập. Lan muốn khám phá nguyên nhân và sửa thói quen này. Lan nên làm gì?","a":"Ghi danh sách đồ cần soạn mỗi tối và kiểm tra theo danh sách","w":["Cho rằng quên là tính cách không sửa được","Nhờ mẹ soạn cặp mãi mãi","Mang hết mọi thứ đi cho khỏi quên"],"e":"Tìm cách khắc phục điểm yếu là khám phá và rèn luyện bản thân."},{"f":"X1","p":"Minh thích vẽ truyện tranh và muốn biết mình có năng khiếu kể chuyện không. Minh nên làm gì?","a":"Viết thử truyện ngắn và nhờ cô giáo góp ý","w":["Chỉ nghĩ trong đầu không làm thử","Chép truyện của người khác xem có ai khen","Bỏ ý định vì sợ không hay"],"e":"Thử làm và nhận góp ý giúp em khám phá khả năng của bản thân."},{"f":"X1","p":"Quân nhận ra mình học tốt hơn khi học nhóm cùng bạn. Quân nên vận dụng điều này thế nào?","a":"Chủ động rủ bạn học nhóm để phát huy cách học hợp với mình","w":["Chỉ học một mình cho yên tĩnh","Chép bài bạn trong giờ học nhóm","Không học nhóm vì ngại bạn"],"e":"Hiểu cách học phù hợp với mình giúp em học hiệu quả hơn."},{"f":"X1","p":"Vy muốn tham gia câu lạc bộ cờ vua dù chưa biết chơi. Vy nên có thái độ nào?","a":"Mạnh dạn đăng kí học từ đầu để khám phá khả năng mới","w":["Không dám vì sợ thua bạn","Chờ biết chơi giỏi mới đăng kí","Chê câu lạc bộ chán dù chưa thử"],"e":"Dám thử điều mới là cách khám phá bản thân."}],"dd3-bathoa":[{"f":"X1","p":"An và bạn thân tranh nhau chiếc ghế gần cửa sổ ở thư viện. Cả hai đều giận. An nên làm gì trước tiên?","a":"Bình tĩnh đề nghị hai bạn luân phiên ngồi ghế đó","w":["Giành ghế bằng cách ngồi lên trước","Không nói chuyện với bạn nữa","Đẩy bạn ra khỏi ghế"],"e":"Bình tĩnh tìm cách công bằng giúp hóa giải bất hòa."},{"f":"X1","p":"Bình vô tình làm rách bài vẽ của Chi khi đi qua bàn. Chi tức giận la Bình. Bình nên nói gì?","a":"Xin lỗi Chi và cùng Chi sửa lại bài vẽ","w":["La lại Chi vì Chi la mình","Bảo bài vẽ xấu rách cũng được","Chạy đi tránh mặt Chi"],"e":"Xin lỗi và cùng sửa chữa giúp hai bạn làm hòa."},{"f":"X1","p":"Dũng và bạn bất đồng ý kiến khi làm việc nhóm, cả hai đều cho mình đúng. Cách giải quyết tốt nhất là gì?","a":"Lắng nghe ý kiến của nhau rồi chọn cách hợp lí nhất","w":["Ai nói to hơn thì người đó thắng","Bỏ nhóm không làm nữa","Kéo các bạn khác về phe mình"],"e":"Lắng nghe lẫn nhau là chìa khóa xử lí bất hòa."},{"f":"X1","p":"Hà bị bạn hiểu lầm là nói xấu sau lưng. Hà rất ấm ức. Hà nên làm gì?","a":"Gặp bạn nói chuyện thẳng thắn để làm rõ hiểu lầm","w":["Nói xấu lại bạn cho bõ tức","Kể chuyện này cho cả lớp nghe","Tránh mặt bạn mãi mãi"],"e":"Nói chuyện thẳng thắn giúp xóa bỏ hiểu lầm giữa bạn bè."},{"f":"X1","p":"Tuấn bị bạn trêu chọc nhiều lần trong giờ ra chơi. Tuấn đã nhắc mà bạn vẫn tiếp tục. Tuấn nên làm gì?","a":"Báo cô giáo để cô giúp đỡ xử lí","w":["Đánh lại bạn cho sợ","Trêu chọc lại bạn nhiều hơn","Bỏ học về nhà"],"e":"Nhờ thầy cô hỗ trợ khi bất hòa không tự giải quyết được là đúng cách."},{"f":"X1","p":"Lan và bạn giận nhau vì chuyện mượn đồ không trả đúng hẹn. Lan muốn làm hòa. Lan nên làm gì trước?","a":"Chủ động xin lỗi phần lỗi của mình và nói chuyện lại với bạn","w":["Chờ bạn xin lỗi trước mới nói chuyện","Mượn đồ bạn khác không trả luôn","Nói với cả lớp là bạn xấu tính"],"e":"Chủ động làm hòa thể hiện thiện chí giải quyết bất hòa."},{"f":"X1","p":"Minh lỡ nói lời làm bạn buồn trước mặt nhiều người. Minh nhận ra điều đó sau giờ học. Minh nên làm gì?","a":"Tìm bạn xin lỗi riêng và rút kinh nghiệm","w":["Để chuyện qua đi không nhắc lại","Xin lỗi qua loa trước lớp cho xong","Đổ lỗi cho bạn nhạy cảm quá"],"e":"Xin lỗi chân thành giúp bạn bớt buồn và giữ tình bạn."},{"f":"X1","p":"Hai bạn Quân và bạn cùng bàn cãi nhau vì chỗ để cặp. Cách xử lí nào tốt nhất?","a":"Hai bạn tự thỏa thuận chia chỗ để cặp công bằng","w":["Ai khỏe hơn thì được chỗ rộng hơn","Kéo cặp của bạn xuống đất","Chiếm hết chỗ để cặp của mình"],"e":"Tự thỏa thuận công bằng giúp hai bạn giải quyết bất hòa nhỏ."},{"f":"X1","p":"Vy và bạn thân giận nhau ba ngày không nói chuyện, cả hai đều buồn. Vy nên làm gì?","a":"Chủ động bắt chuyện và rủ bạn làm hòa","w":["Tiếp tục giận cho bạn biết mặt","Tìm bạn thân mới ngay lập tức","Nói xấu bạn với người khác"],"e":"Chủ động làm hòa giúp tình bạn sớm trở lại tốt đẹp."},{"f":"X1","p":"Trong trò chơi nhóm, An cho rằng bạn phạm luật, bạn cãi là không. An nên xử lí thế nào?","a":"Cùng xem lại luật chơi đã thống nhất từ đầu","w":["Ai cũng giữ ý mình, bỏ trò chơi","La to để át tiếng bạn","Rủ cả nhóm tẩy chay bạn"],"e":"Dựa vào luật đã thống nhất giúp giải quyết tranh cãi công bằng."}],"dd3-atgt":[{"f":"X1","p":"An đi bộ về nhà, đến đoạn đường không có vỉa hè. An nên đi ở vị trí nào cho an toàn?","a":"Đi sát lề đường bên phải, chú ý quan sát xe","w":["Đi giữa lòng đường cho thoáng","Đi sát làn xe đang chạy nhanh","Vừa đi vừa đuổi nhau với bạn"],"e":"Đi sát lề phải và quan sát giúp em an toàn khi không có vỉa hè."},{"f":"X1","p":"Bình ngồi sau xe máy của bố. Bố đưa mũ bảo hiểm nhưng Bình thấy nóng. Bình nên làm gì?","a":"Đội mũ bảo hiểm và cài quai đúng cách","w":["Cầm mũ trên tay cho mát","Đội mũ nhưng không cài quai","Không đội vì đi đoạn đường ngắn"],"e":"Đội mũ cài quai đúng cách giúp bảo vệ đầu khi đi xe máy."},{"f":"X1","p":"Chi băng qua đường ở nơi có vạch kẻ dành cho người đi bộ. Chi nên qua đường thế nào?","a":"Quan sát hai phía, qua đường khi xe đã dừng nhường","w":["Chạy thật nhanh qua vạch","Vừa qua đường vừa xem điện thoại của mẹ","Đi ngược chiều xe cho dễ nhìn"],"e":"Qua đường trên vạch kẻ vẫn cần quan sát cẩn thận."},{"f":"X1","p":"Dũng thấy đèn tín hiệu dành cho người đi bộ đang đỏ nhưng đường vắng. Dũng nên làm gì?","a":"Chờ đèn xanh dành cho người đi bộ mới qua","w":["Qua luôn vì đường vắng xe","Chạy nhanh qua khi đèn còn đỏ","Đi theo một người lớn đang vượt đèn đỏ"],"e":"Tuân thủ đèn tín hiệu dù đường vắng là an toàn giao thông."},{"f":"X1","p":"Hà được anh chở bằng xe đạp, Hà ngồi sau và thò chân ra ngoài đung đưa. Việc làm đúng là gì?","a":"Ngồi vững, để chân đúng chỗ, không đung đưa","w":["Đung đưa chân cho vui","Đứng lên sau xe cho cao","Nhảy xuống xe khi xe đang chạy chậm"],"e":"Ngồi đúng tư thế trên xe giúp tránh tai nạn."},{"f":"X1","p":"Tuấn cùng nhóm bạn đi bộ, các bạn dàn hàng ngang nói chuyện giữa đường nhỏ. Tuấn nên nhắc bạn điều gì?","a":"Đi gọn thành hàng dọc sát lề đường","w":["Dàn hàng ngang cho vui","Đi giữa đường để xe tự tránh","Chạy nhảy qua lại hai bên đường"],"e":"Đi gọn sát lề đường không cản trở giao thông và an toàn cho mình."},{"f":"X1","p":"Lan ngồi trong ô tô của gia đình đi chơi xa. Lan nên làm gì để an toàn suốt chuyến đi?","a":"Ngồi yên và thắt dây an toàn đúng cách","w":["Đứng lên nhìn qua cửa sổ trời","Thò đầu ra ngoài cửa sổ","Ngồi vào lòng bố đang lái xe"],"e":"Thắt dây an toàn khi đi ô tô giúp bảo vệ em khi xe phanh gấp."},{"f":"X1","p":"Minh thấy một bạn nhỏ chạy đuổi theo quả bóng lăn ra giữa đường đông xe. Minh nên làm gì?","a":"Ngăn bạn lại và báo người lớn gần đó","w":["Chạy ra đường nhặt bóng giúp bạn","Đứng cổ vũ bạn chạy nhanh","Quay video cảnh đó"],"e":"Ngăn bạn chạy ra đường đông xe là bảo vệ an toàn cho bạn."},{"f":"X1","p":"Quân đi xe đạp đến trường, đến ngã tư Quân muốn rẽ trái. Quân nên làm gì?","a":"Giảm tốc độ, quan sát và ra hiệu trước khi rẽ","w":["Rẽ ngay không cần nhìn","Rẽ thật nhanh cho xe sau không kịp","Đi ngược chiều cho gần"],"e":"Quan sát và ra hiệu khi rẽ giúp tránh va chạm giao thông."},{"f":"X1","p":"Vy được bố đón bằng ô tô trước cổng trường đông đúc. Vy nên lên xe ở đâu cho an toàn?","a":"Lên xe ở phía vỉa hè khi xe đã dừng hẳn","w":["Chạy ra giữa đường đón xe","Mở cửa xe phía lòng đường","Đứng giữa đường vẫy bố"],"e":"Lên xe từ phía vỉa hè khi xe dừng hẳn là an toàn."}],"tnxh3-giadinh":[{"f":"K1","p":"Trong bếp, dầu ăn đang nóng trên chảo bỗng bốc lửa nhỏ. Nếu đổ nước vào chảo, điều gì sẽ xảy ra?","a":"Lửa bùng mạnh hơn, rất nguy hiểm","w":["Lửa tắt ngay an toàn","Không có gì xảy ra","Dầu biến thành nước"],"e":"Đổ nước vào chảo dầu đang cháy làm lửa bùng mạnh, cần tắt bếp và đậy vung hoặc báo người lớn."},{"f":"K1","p":"Mẹ để quên nồi canh trên bếp lửa nhỏ và đi ra ngoài lâu. Nồi canh sẽ thế nào và có nguy hiểm gì?","a":"Canh cạn dần, có thể cháy nồi, gây hoả hoạn","w":["Canh đầy lên thêm","Không nguy hiểm gì cả","Nồi tự tắt lửa ngay"],"e":"Để bếp cháy không trông coi dễ cạn nồi, cháy và gây hoả hoạn."},{"f":"K1","p":"Quanh nhà em có nhiều chai lọ đọng nước mưa để lâu ngày. Điều gì dễ xuất hiện ở những chỗ nước đọng đó?","a":"Bọ gậy và muỗi sinh sôi","w":["Cá lớn sinh sống","Không có con gì cả","Hoa thơm mọc lên"],"e":"Nước đọng lâu là nơi muỗi đẻ trứng, sinh bọ gậy."},{"f":"K1","p":"Em để thùng rác trong nhà nhiều ngày không đổ, rác thức ăn bị thiu. Nhà em sẽ thế nào?","a":"Có mùi hôi, ruồi nhặng bâu vào","w":["Thơm tho hơn","Không thay đổi gì","Rác tự biến mất"],"e":"Rác để lâu bị thiu, bốc mùi và thu hút ruồi nhặng."},{"f":"K1","p":"Buổi tối cả nhà bật đèn sáng, cửa sổ mở và không có màn chắn. Trong nhà sẽ thế nào?","a":"Nhiều côn trùng bay vào theo ánh sáng","w":["Không có con gì bay vào","Nhà tự tối đi","Muỗi tránh xa hoàn toàn"],"e":"Côn trùng thường bay về phía ánh sáng vào buổi tối."},{"f":"K1","p":"Nền nhà tắm vừa được xịt nước xà phòng còn rất trơn. Nếu đi nhanh qua, điều gì dễ xảy ra?","a":"Trượt ngã","w":["Đi chắc chân hơn","Không có gì xảy ra","Sàn tự khô ngay lập tức"],"e":"Sàn ướt xà phòng rất trơn, dễ trượt ngã."},{"f":"X1","p":"Em ngửi thấy mùi ga lạ trong bếp khi không có người lớn ở gần. Em nên làm gì đầu tiên?","a":"Không bật tắt điện, nhanh ra khỏi nhà rồi gọi người lớn","w":["Bật bếp thử xem ga còn không","Bật đèn soi kĩ khắp bếp","Đốt nến tìm chỗ rò ga"],"e":"Ga rò rất nguy hiểm: không bật tắt điện, phải ra khỏi nhà rồi mới gọi người lớn."},{"f":"X1","p":"Nhà em có nhiều vật sắc nhọn và thuốc men, lại có em bé nhỏ. Gia đình nên cất những vật đó thế nào?","a":"Cất cao, trong tủ khoá, xa tầm tay trẻ nhỏ","w":["Để trên bàn thấp cho tiện lấy","Để lẫn với đồ chơi của bé","Để trong hộp không nắp ở sàn"],"e":"Cất cao và khoá tủ giúp trẻ nhỏ tránh tai nạn với vật nguy hiểm."},{"f":"X1","p":"Sân quanh nhà sau mưa có nhiều chỗ nước đọng trong xô, chậu không dùng. Em nên làm gì để phòng sốt xuất huyết?","a":"Úp hoặc đổ bỏ nước đọng, vệ sinh quanh nhà","w":["Để nước đọng cho mát nhà","Nuôi bọ gậy chơi","Đổ thêm nước vào cho đầy"],"e":"Loại bỏ nước đọng giúp muỗi không có nơi sinh sôi gây bệnh."},{"f":"X1","p":"Khi có khói và lửa nhỏ xuất hiện trong nhà, em đang ở trong phòng. Em nên làm gì?","a":"Bình tĩnh ra ngoài an toàn và gọi người lớn, gọi cứu hoả","w":["Giấu mình trong tủ quần áo","Chạy vào nhà tắm khoá cửa lại","Mang theo thật nhiều đồ chơi khi chạy"],"e":"Thoát ra ngoài an toàn và báo cứu hoả là việc cần làm khi có cháy."}],"tnxh3-truonghoc":[{"f":"K1","p":"Sân trường có cây xanh toả bóng mát, một góc sân không có cây và nắng chiếu trực tiếp. Trưa hè, hai nơi đó khác nhau thế nào?","a":"Góc không cây nóng hơn nhiều","w":["Hai nơi mát như nhau","Góc nắng mát hơn","Góc nắng lạnh hơn"],"e":"Cây xanh che nắng và giúp không khí mát hơn nơi nắng trực tiếp."},{"f":"K1","p":"Lớp em để cây xanh trong lớp học ở góc tối, không có ánh sáng nhiều tuần. Cây sẽ thế nào?","a":"Cây còi cọc, lá vàng","w":["Cây lớn nhanh, lá xanh đậm","Cây ra hoa nhiều hơn","Cây không thay đổi"],"e":"Thiếu ánh sáng lâu ngày cây sẽ yếu và lá vàng."},{"f":"K1","p":"Nhà vệ sinh trường học không được dọn rửa thường xuyên. Điều gì sẽ xảy ra?","a":"Bốc mùi hôi, nhiều vi khuẩn gây bệnh","w":["Sạch thơm tự nhiên","Không ảnh hưởng gì","Học sinh thích dùng hơn"],"e":"Không vệ sinh thường xuyên làm nơi đó bẩn, có mùi và nhiều mầm bệnh."},{"f":"K1","p":"Giờ ra chơi, nhiều bạn cùng chạy xuống cầu thang hẹp và chen lấn. Điều nguy hiểm nào dễ xảy ra?","a":"Xô ngã nhau, bị thương","w":["Không có nguy hiểm gì","Đi nhanh hơn và an toàn hơn","Cầu thang tự rộng ra"],"e":"Chen lấn ở cầu thang dễ gây xô ngã và chấn thương."},{"f":"K1","p":"Em để chai nước uống mở nắp trên bàn học ngoài nắng cả buổi. Nước trong chai sẽ thế nào?","a":"Nóng lên và có thể nhiễm bụi bẩn","w":["Lạnh hơn như tủ lạnh","Tự đầy thêm nước sạch","Ngon hơn ban đầu"],"e":"Nước để ngoài nắng sẽ nóng lên và dễ nhiễm bẩn."},{"f":"K1","p":"Thùng rác lớp học đầy tràn và không được đổ nhiều ngày. Lớp học sẽ thế nào?","a":"Có mùi hôi, ruồi bâu, mất vệ sinh","w":["Thơm tho dễ chịu","Không thay đổi gì","Lớp tự sạch hơn"],"e":"Rác để lâu gây mùi hôi và mất vệ sinh lớp học."},{"f":"X1","p":"Trường em tổ chức ngày hội truyền thống, có nhiều khách đến thăm. Học sinh nên làm gì để giữ hình ảnh đẹp của trường?","a":"Giữ vệ sinh, lễ phép chào hỏi khách","w":["Vứt rác bừa bãi ở sân","Nói to đùa nghịch khi khách đến","Giấu mình không chào ai"],"e":"Giữ vệ sinh và lễ phép giúp trường đẹp trong mắt khách."},{"f":"X1","p":"Em thấy vòi nước ở khu rửa tay của trường bị rò rỉ chảy liên tục. Em nên làm gì?","a":"Khoá chặt vòi và báo thầy cô hoặc bác bảo vệ","w":["Để nước chảy cho mát sân","Vặn cho nước chảy mạnh hơn","Múc nước nghịch chơi"],"e":"Báo sửa vòi nước giúp tiết kiệm nước và tránh lãng phí."},{"f":"X1","p":"Một bạn mới chuyển đến lớp em còn rụt rè, chưa có bạn chơi cùng. Em nên làm gì?","a":"Rủ bạn cùng học, cùng chơi và giới thiệu với lớp","w":["Mặc kệ bạn một mình","Trêu chọc bạn mới","Không cho bạn ngồi gần"],"e":"Giúp bạn mới hoà nhập làm lớp đoàn kết và thân thiện."},{"f":"X1","p":"Khi tham gia hoạt động tập thể ở sân trường dưới nắng, em cần chuẩn bị gì để bảo vệ sức khoẻ?","a":"Đội mũ, mang nước uống và nghỉ khi mệt","w":["Không mang nước cho nhẹ người","Mặc áo mưa cho kín nắng","Chạy liên tục không nghỉ"],"e":"Đội mũ và uống nước giúp tránh say nắng khi hoạt động ngoài trời."}],"tnxh3-congdong":[{"f":"K1","p":"Người nông dân trồng lúa ở ruộng, đến mùa khô hạn kéo dài không có nước vào ruộng. Cây lúa sẽ thế nào?","a":"Lúa héo, cho ít hạt hoặc mất mùa","w":["Lúa tốt hơn bình thường","Lúa ra nhiều hạt hơn","Không ảnh hưởng gì"],"e":"Lúa cần nhiều nước, khô hạn làm lúa héo và giảm năng suất."},{"f":"K1","p":"Thợ gốm nặn xong chiếc bình đất sét rồi đem nung trong lò nóng. Sau khi nung, chiếc bình sẽ thế nào?","a":"Cứng chắc và bền hơn","w":["Mềm nhão ra","Tan thành bùn ngay","Nhẹ biến mất"],"e":"Nung nóng làm đồ gốm đất sét cứng chắc và bền."},{"f":"K1","p":"Buổi sáng sương còn đọng trên đồng rau, nắng lên cao dần. Đến trưa, rau ngoài đồng sẽ thế nào?","a":"Sương tan, lá rau khô ráo","w":["Sương nhiều thêm lên","Rau đông cứng lại","Rau biến thành quả ngay"],"e":"Nắng lên làm sương tan dần trên lá rau."},{"f":"K1","p":"Một xưởng làm nghề thủ công đổ nước thải bẩn ra con mương gần làng. Nước mương sẽ thế nào sau thời gian?","a":"Bẩn, có mùi, cá và cây dưới nước bị hại","w":["Trong sạch hơn trước","Không thay đổi gì","Cá nhiều lên gấp đôi"],"e":"Nước thải bẩn làm ô nhiễm mương nước và hại sinh vật sống ở đó."},{"f":"K1","p":"Ngày lễ hội ở di tích, rất nhiều khách đến thăm và một số người vứt rác bừa bãi. Khu di tích sẽ thế nào nếu không dọn?","a":"Bẩn, mất vẻ đẹp và hư hại cảnh quan","w":["Đẹp hơn trước","Tự sạch ngay sau lễ","Không bị ảnh hưởng"],"e":"Rác bừa bãi làm di tích bẩn và mất vẻ đẹp vốn có."},{"f":"K1","p":"Trời mưa to, đất ở triền đồi trọc không có cây che phủ. Đất ở đó dễ bị điều gì?","a":"Bị nước mưa cuốn trôi, xói mòn","w":["Chắc chắn hơn","Màu mỡ thêm ngay","Không bị sao cả"],"e":"Đất đồi trọc không cây che dễ bị mưa cuốn trôi."},{"f":"X1","p":"Địa phương em có làng nghề làm gốm truyền thống. Học sinh đến thăm làng nghề nên làm gì?","a":"Quan sát, học hỏi và giữ gìn sản phẩm của thợ","w":["Chạm phá sản phẩm trưng bày","Nói to đùa nghịch trong xưởng","Lấy sản phẩm mang về không hỏi"],"e":"Tôn trọng thợ và sản phẩm giúp giữ gìn làng nghề truyền thống."},{"f":"X1","p":"Em đi tham quan một di tích lịch sử cùng lớp. Em nên cư xử thế nào ở di tích?","a":"Đi nhẹ, nói khẽ, không leo trèo hay viết vẽ lên di tích","w":["Leo lên tượng để chụp ảnh","Khắc tên lên tường di tích","Hái hoa bẻ cành quanh di tích"],"e":"Giữ gìn di tích giúp di tích bền lâu cho nhiều người tham quan."},{"f":"X1","p":"Nông dân muốn rau ít sâu bệnh mà không lạm dụng thuốc hoá học. Cách làm nào hợp lí?","a":"Luân canh, bắt sâu, dùng biện pháp sinh học","w":["Phun thuốc thật nhiều lần mỗi ngày","Đổ thuốc xuống ao gần ruộng","Bỏ ruộng không chăm sóc"],"e":"Biện pháp sinh học và bắt sâu giúp bảo vệ rau và môi trường."},{"f":"X1","p":"Con đường làng em có nhiều ổ gà và rác hai bên đường. Dân làng cùng nhau làm gì sẽ tốt nhất?","a":"Dọn vệ sinh, sửa đường và bỏ rác đúng nơi","w":["Mỗi nhà vứt thêm rác ra đường","Mặc kệ đường hỏng dần","Đổ đất bẩn ra giữa đường"],"e":"Cùng dọn vệ sinh và sửa đường giúp cộng đồng sạch đẹp, đi lại an toàn."}],"tnxh3-thucvat":[{"f":"K1","p":"Em cắm một cành hoa trắng vào cốc nước pha màu đỏ. Sau vài giờ, cánh hoa sẽ thế nào?","a":"Cánh hoa dần nhuộm màu đỏ nhạt","w":["Cánh hoa không đổi màu chút nào","Hoa biến thành lá xanh","Nước trong cốc cạn ngay lập tức"],"e":"Thân cây hút và dẫn nước lên hoa nên màu theo nước lên cánh hoa."},{"f":"K1","p":"Một cây bị cắt bỏ hết lá nhưng rễ và thân còn nguyên, cây vẫn được tưới nước. Sau thời gian, cây sẽ thế nào?","a":"Cây yếu vì thiếu lá để làm thức ăn nuôi cây","w":["Cây khoẻ mạnh như bình thường","Cây lớn nhanh gấp đôi","Cây ra quả ngay lập tức"],"e":"Lá giúp cây tạo chất nuôi cây, mất hết lá cây sẽ yếu đi."},{"f":"K1","p":"Em gieo hai hạt giống, một hạt ở nơi có ánh sáng và một hạt trong hộp tối, cả hai đều đủ nước. Hạt trong hộp tối nảy mầm sẽ thế nào?","a":"Mầm vàng yếu, vươn dài tìm sáng","w":["Mầm xanh khoẻ như hạt ngoài sáng","Mầm không bao giờ mọc","Mầm biến thành quả ngay"],"e":"Mầm thiếu sáng sẽ vàng, yếu và vươn dài về phía sáng."},{"f":"K1","p":"Rễ của một cây bị đứt gần hết do đào xới mạnh tay. Dù lá còn xanh lúc đầu, sau ít ngày cây sẽ thế nào?","a":"Cây héo dần vì rễ không hút được nước","w":["Cây tươi tốt hơn trước","Cây không bị ảnh hưởng gì","Lá tự hút nước thay rễ ngay"],"e":"Rễ hút nước nuôi cây, rễ bị đứt nhiều cây sẽ héo dần."},{"f":"K1","p":"Con thỏ bị nhốt trong chuồng chỉ có cỏ khô, không có nước uống nhiều ngày nắng nóng. Con thỏ sẽ thế nào?","a":"Khát, mệt và yếu dần","w":["Khoẻ mạnh bình thường","Lớn nhanh hơn hẳn","Không cần nước vẫn sống tốt mãi"],"e":"Động vật cần nước uống, thiếu nước lâu sẽ yếu dần."},{"f":"K1","p":"Vào mùa đông, một số cây rụng hết lá, chỉ còn cành trơ trụi. Sang xuân ấm áp, cây sẽ thay đổi thế nào?","a":"Mọc chồi và lá non mới","w":["Chết hẳn không mọc lại","Biến thành cây khác hẳn","Ra quả chín ngay lập tức"],"e":"Nhiều cây rụng lá mùa đông rồi đâm chồi lá mới vào mùa xuân."},{"f":"X1","p":"Vườn trường có cây ăn quả đang ra hoa, nhiều ong bướm bay quanh. Học sinh nên làm gì để cây đậu quả tốt?","a":"Không phá hoa, bảo vệ ong bướm thụ phấn","w":["Bẻ hết hoa mang về chơi","Đuổi hết ong bướm đi","Rung cây cho hoa rụng"],"e":"Ong bướm giúp thụ phấn nên cần bảo vệ để cây đậu quả."},{"f":"X1","p":"Em muốn sử dụng lá và quả của cây trong vườn một cách hợp lí, không lãng phí. Em nên làm thế nào?","a":"Chỉ hái đủ dùng, không bẻ phá cây","w":["Hái hết quả non cho vui","Bẻ cành lớn mang về chơi","Đốn cây lấy quả một lần"],"e":"Hái đủ dùng và không phá cây giúp cây tiếp tục cho quả lâu dài."},{"f":"X1","p":"Một con vật nuôi trong nhà bị ốm, bỏ ăn nhiều ngày. Người nuôi nên làm gì?","a":"Đưa đến thú y khám và chăm sóc đúng cách","w":["Mặc kệ cho tự khỏi","Cho ăn thật nhiều đồ lạ","Đuổi ra ngoài đường"],"e":"Đưa vật nuôi đến thú y giúp chữa bệnh kịp thời."},{"f":"X1","p":"Em thấy cây xanh ven đường bị ai đó buộc dây thép chặt vào thân lâu ngày. Lâu dần thân cây chỗ đó sẽ bị sao và em nên báo ai?","a":"Thân bị thắt, cây yếu; báo người lớn hoặc đơn vị cây xanh","w":["Cây khoẻ hơn nhờ dây thép","Không bị sao cả","Báo bạn cùng lớp là đủ, không cần người lớn"],"e":"Dây thắt chặt làm thân cây bị tổn thương, cần báo người lớn xử lí."}],"tnxh3-suckhoe":[{"f":"K1","p":"Em ăn cơm vội, nhai qua loa rồi nuốt miếng to. Dạ dày của em sẽ làm việc thế nào so với khi nhai kĩ?","a":"Dạ dày phải làm việc vất vả hơn, dễ đau bụng","w":["Dạ dày nhàn hơn hẳn","Không khác gì nhau","Thức ăn tự tan ngay ở miệng"],"e":"Nhai kĩ giúp thức ăn nhỏ ra, dạ dày tiêu hoá dễ dàng hơn."},{"f":"K1","p":"Khi em chạy nhanh, tim đập nhanh hơn và em thở gấp. Vì sao cơ thể cần tim đập nhanh lúc đó?","a":"Để đưa máu mang khí và chất nuôi cơ thể kịp thời","w":["Để cơ thể ngủ ngon hơn","Để dừng vận động ngay","Không có lí do gì cả"],"e":"Vận động cần nhiều máu nuôi cơ bắp nên tim đập nhanh hơn."},{"f":"K1","p":"Em thức khuya nhiều đêm xem điện thoại, sáng dậy đi học. Não và cơ thể em sẽ thế nào?","a":"Mệt mỏi, buồn ngủ, khó tập trung học","w":["Tỉnh táo và học tốt hơn hẳn","Không ảnh hưởng gì cả","Nhớ bài lâu hơn nhiều"],"e":"Thiếu ngủ làm não mệt, khó tập trung và ghi nhớ kém."},{"f":"K1","p":"Em ăn đồ ăn đã ôi thiu có mùi lạ. Sau vài giờ, bụng em dễ gặp điều gì?","a":"Đau bụng, có thể tiêu chảy","w":["Khoẻ mạnh hơn","Không sao bao giờ","Đói nhanh hơn bình thường"],"e":"Đồ ăn ôi thiu có nhiều vi khuẩn gây đau bụng, tiêu chảy."},{"f":"K1","p":"Trời lạnh, em không mặc ấm và ngồi nơi gió lùa lâu. Cơ thể em dễ bị bệnh gì?","a":"Cảm lạnh, ho và sổ mũi","w":["Khoẻ hơn vì quen lạnh","Không bị bệnh gì cả","Chỉ bị đói bụng thôi"],"e":"Không giữ ấm nơi gió lùa dễ bị cảm lạnh và ho."},{"f":"K1","p":"Em nhìn chằm chằm vào màn hình máy tính ở cự li rất gần trong nhiều giờ liền. Mắt em sẽ thế nào?","a":"Mỏi mắt, có thể nhức và mờ tạm thời","w":["Mắt sáng khoẻ hơn hẳn","Không bị ảnh hưởng gì","Mắt tự khỏi cận thị"],"e":"Nhìn gần lâu làm mắt mỏi, cần nghỉ và nhìn xa thư giãn."},{"f":"X1","p":"Để hệ tiêu hoá khoẻ mạnh, thói quen ăn uống nào của học sinh là đúng?","a":"Ăn chậm, nhai kĩ, ăn đúng bữa","w":["Ăn thật nhanh cho xong bữa","Vừa ăn vừa chạy nhảy đùa nghịch","Bỏ bữa sáng thường xuyên"],"e":"Ăn chậm nhai kĩ và đúng bữa giúp tiêu hoá tốt."},{"f":"X1","p":"Em thấy bạn có dấu hiệu chảy máu cam ở lớp. Em nên giúp bạn thế nào cho đúng?","a":"Cho bạn ngồi, hơi cúi đầu về trước và báo thầy cô","w":["Ngửa đầu bạn ra sau thật lâu","Cho bạn chạy quanh lớp cho máu lưu thông","Bỏ mặc bạn tự xử lí"],"e":"Ngồi cúi đầu nhẹ về trước và báo người lớn giúp xử lí chảy máu cam an toàn."},{"f":"X1","p":"Muốn tim và mạch máu khoẻ, học sinh nên duy trì thói quen nào mỗi ngày?","a":"Vận động đều đặn và ăn uống cân bằng","w":["Ngồi yên cả ngày không vận động","Ăn thật nhiều đồ chiên rán mỗi ngày","Thức khuya chơi game thường xuyên"],"e":"Vận động đều và ăn cân bằng giúp tim mạch khoẻ mạnh."},{"f":"X1","p":"Khi học bài căng thẳng lâu, đầu em thấy nặng và khó nhớ thêm. Em nên làm gì để não hoạt động tốt hơn?","a":"Nghỉ giải lao ngắn, vận động nhẹ rồi học tiếp","w":["Học liên tục không nghỉ nhiều giờ nữa","Uống thật nhiều nước ngọt có ga","Thức trắng đêm học bài"],"e":"Nghỉ ngắn và vận động nhẹ giúp não tỉnh táo, nhớ tốt hơn."}],"tnxh3-traidat":[{"f":"K1","p":"Buổi sáng Mặt Trời mọc ở phương Đông, một cái cây đứng giữa sân. Bóng của cây buổi sáng đổ về phương nào?","a":"Phương Tây","w":["Phương Đông","Phương Nam","Không có bóng"],"e":"Bóng đổ ngược phía với Mặt Trời, sáng Mặt Trời ở Đông nên bóng về Tây."},{"f":"K1","p":"Trưa hè ở vùng xích đạo, Mặt Trời gần như trên đỉnh đầu. Bóng của một cột thẳng lúc đó sẽ thế nào?","a":"Rất ngắn, gần sát chân cột","w":["Dài hơn buổi sáng nhiều","Đổ dài về phía đông","Không thay đổi so với sáng"],"e":"Mặt Trời càng cao, bóng vật càng ngắn lại."},{"f":"K1","p":"Trái Đất quay quanh mình nó, nơi đang hướng về Mặt Trời là ban ngày. Sau nửa ngày quay, nơi đó sẽ thế nào?","a":"Chuyển sang ban đêm","w":["Vẫn ban ngày mãi mãi","Thành buổi trưa nắng nhất","Không thay đổi gì"],"e":"Trái Đất quay làm ngày và đêm thay đổi luân phiên."},{"f":"K1","p":"Vào mùa đông ở bán cầu Bắc, ban ngày ngắn hơn ban đêm. Trời sẽ tối vào lúc nào so với mùa hè?","a":"Tối sớm hơn","w":["Tối muộn hơn","Không thay đổi giờ tối","Không có ban đêm"],"e":"Mùa đông ngày ngắn đêm dài nên trời tối sớm hơn."},{"f":"K1","p":"Một vùng đất ở đới nóng gần xích đạo quanh năm nhận nhiều nắng. Khí hậu vùng đó thường thế nào?","a":"Nóng quanh năm","w":["Lạnh quanh năm","Có tuyết rơi thường xuyên","Mát lạnh như mùa đông miền Bắc"],"e":"Đới nóng nhận nhiều ánh nắng nên khí hậu nóng quanh năm."},{"f":"K1","p":"Mặt Trăng quay quanh Trái Đất, có hôm em thấy trăng tròn, sau nhiều ngày lại thấy trăng khuyết. Vì sao có sự thay đổi đó?","a":"Phần trăng được chiếu sáng nhìn từ Trái Đất thay đổi","w":["Mặt Trăng tự biến dạng thật sự","Mây che trăng mỗi đêm giống nhau","Trăng tự phát sáng yếu dần"],"e":"Hình dạng trăng ta thấy thay đổi do phần được chiếu sáng thay đổi."},{"f":"X1","p":"Em bị lạc trong rừng vào buổi sáng, muốn tìm phương Đông để định hướng. Em dựa vào đâu?","a":"Phía Mặt Trời mọc là phương Đông","w":["Phía có nhiều cây nhất là Đông","Phía mát nhất là Đông","Nghe tiếng chim hót đoán hướng"],"e":"Mặt Trời mọc ở phương Đông nên có thể dùng để định hướng buổi sáng."},{"f":"X1","p":"Gia đình em muốn đi du lịch biển vào mùa hè ít mưa bão. Em nên khuyên gia đình lưu ý điều gì?","a":"Xem dự báo thời tiết và tránh ngày có bão","w":["Đi đúng ngày bão để xem sóng lớn","Không cần xem thời tiết gì cả","Đi biển lúc mưa giông cho mát"],"e":"Xem dự báo giúp tránh đi biển vào ngày bão nguy hiểm."},{"f":"X1","p":"Ở vùng đới lạnh, người dân ra ngoài trời tuyết cần chuẩn bị gì để giữ sức khoẻ?","a":"Quần áo ấm dày, mũ, găng tay và giày kín","w":["Áo mỏng và dép lê","Không cần chuẩn bị gì đặc biệt","Mặc đồ bơi cho gọn"],"e":"Đới lạnh rất rét nên cần mặc ấm đầy đủ khi ra ngoài."},{"f":"X1","p":"Buổi tối em quan sát bầu trời và muốn ghi lại hình dạng Mặt Trăng thay đổi qua các ngày. Em nên làm gì?","a":"Quan sát cùng giờ nhiều đêm và vẽ lại hình trăng","w":["Chỉ nhìn một lần là đủ kết luận","Nhìn trăng qua kính đen tự chế sát mắt lâu","Không cần ghi lại gì cả"],"e":"Quan sát nhiều đêm và ghi lại giúp thấy trăng thay đổi hình dạng theo ngày."}],"tin3-may":[{"f":"K1","p":"Mai đang gõ bài thì bấm nhầm phím xoá làm mất một chữ. Nếu Mai bấm phím cách thay vì phím xoá thì điều gì xảy ra?","a":"Chỉ thêm một khoảng trắng, chữ không bị mất","w":["Chữ vẫn bị xoá mất","Máy tính tự tắt ngay","Cả bài bị xoá hết"],"e":"Phím cách chỉ tạo khoảng trắng giữa các từ, không xoá chữ."},{"f":"K1","p":"Sáng nay, Mai xem thời khoá biểu thấy tiết đầu là môn Toán. Dựa vào thông tin đó, Mai nên quyết định chuẩn bị gì trong cặp?","a":"Sách, vở Toán và đồ dùng học Toán","w":["Chỉ mang sách Tiếng Việt","Mang theo đồ bơi","Để trống cặp, không mang gì"],"e":"Xem thời khoá biểu là dùng thông tin để quyết định chuẩn bị sách vở đúng môn."},{"f":"K1","p":"Nếu em gõ phím Enter ở giữa một câu đang viết dở thì điều gì sẽ xảy ra?","a":"Phần chữ sau con trỏ xuống dòng mới","w":["Cả câu bị xoá sạch","Chữ biến thành số","Màn hình tắt phụt"],"e":"Phím Enter dùng để xuống dòng hoặc thực hiện lệnh."},{"f":"K1","p":"Lớp học mất điện đột ngột khi đang dùng máy tính. Điều gì sẽ xảy ra với máy tính ở phòng tin học?","a":"Máy ngừng hoạt động vì không có điện","w":["Máy chạy nhanh hơn","Máy tự in bài ra giấy","Máy phát ra nhạc"],"e":"Máy tính cần điện mới hoạt động được."},{"f":"K1","p":"Nếu em chỉ di chuyển chuột mà không bấm nút nào thì điều gì xảy ra trên màn hình?","a":"Con trỏ di chuyển theo chuột","w":["Một tệp tự mở ra","Chữ tự được gõ vào","Máy tự lưu bài"],"e":"Chuột điều khiển con trỏ; muốn mở tệp phải bấm chuột."},{"f":"X1","p":"Ngồi học với máy tính đã lâu, mắt em mỏi. Em nên làm gì là đúng nhất?","a":"Nghỉ mắt, nhìn ra xa một lúc","w":["Ngồi sát thêm vào màn hình","Tiếp tục nhìn không nghỉ","Dụi mắt thật mạnh rồi học tiếp"],"e":"Nghỉ giải lao và nhìn xa giúp mắt đỡ mỏi."},{"f":"X1","p":"Bạn cùng bàn vừa ăn bánh vừa gõ bàn phím làm vụn bánh rơi đầy phím. Em nên nhắc bạn điều gì?","a":"Không ăn uống cạnh máy tính, giữ bàn phím sạch","w":["Ăn nhanh hơn cho hết bánh","Đổ nước lên phím cho sạch vụn","Lắc bàn phím úp xuống bàn bạn"],"e":"Ăn uống gần máy tính làm bẩn và dễ hỏng thiết bị."},{"f":"X1","p":"Em vô tình làm đổ cốc nước gần máy tính ở nhà. Việc đầu tiên em nên làm là gì?","a":"Báo ngay cho bố mẹ và tránh xa chỗ nước đổ","w":["Tự cắm điện bật máy lên xem","Lau qua loa rồi dùng tiếp","Đổ thêm nước cho đều"],"e":"Nước gần thiết bị điện nguy hiểm, cần báo người lớn ngay."},{"f":"X1","p":"Giờ ra chơi, em thấy bạn đứng lên ghế để với lấy đồ trên nóc thùng máy. Em nên làm gì?","a":"Nhắc bạn xuống, không trèo lên thiết bị máy tính","w":["Trèo lên cùng bạn cho vui","Đẩy thùng máy sát vào cho bạn dễ với","Mặc kệ bạn"],"e":"Trèo lên thùng máy có thể làm đổ, hỏng máy và ngã đau."},{"f":"X1","p":"Cô giáo dặn mỗi bạn chỉ dùng máy tính một lúc rồi đổi cho bạn khác. Vì sao cần làm vậy?","a":"Để ai cũng được học và mắt được nghỉ ngơi","w":["Để máy tính đỡ buồn","Để chuột khỏi mòn","Để bàn phím mát hơn"],"e":"Dùng máy vừa thời gian giúp bảo vệ mắt và chia sẻ với bạn."}],"tin3-internet":[{"f":"K1","p":"Máy tính ở phòng tin học không kết nối được Internet. Điều gì sẽ xảy ra khi em mở trình duyệt tìm bài học?","a":"Không xem được trang web trên mạng","w":["Xem được mọi trang như thường","Máy in tự in bài học","Màn hình chuyển thành ti vi"],"e":"Muốn dùng Internet, máy tính phải được kết nối mạng."},{"f":"K1","p":"Nếu cả lớp cùng vào Internet xem video một lúc, mạng có thể thế nào?","a":"Mạng chậm, video bị giật, tải lâu","w":["Mạng nhanh hơn bình thường","Video tự chuyển thành tranh","Không ảnh hưởng gì"],"e":"Nhiều người dùng chung một lúc làm đường truyền chậm lại."},{"f":"K1","p":"Em gõ sai địa chỉ trang web học tập cô giáo cho. Điều gì có thể xảy ra?","a":"Trang cần tìm không hiện ra đúng","w":["Máy tự sửa thành trang đúng","Cô giáo bị trừ điểm","Bàn phím bị khoá"],"e":"Gõ đúng địa chỉ mới mở được đúng trang web."},{"f":"K1","p":"Nếu em bấm vào một đường liên kết trong trang học tập thì điều gì thường xảy ra?","a":"Máy mở ra trang thông tin liên quan","w":["Máy tính tắt ngay lập tức","Trang giấy trong vở tự mở","Mọi tệp trong máy bị xoá"],"e":"Bấm vào liên kết sẽ chuyển em tới trang khác có liên quan."},{"f":"K1","p":"Trời mưa bão làm mất mạng Internet ở nhà. Em vẫn có thể làm việc nào với máy tính?","a":"Mở bài vẽ đã lưu sẵn trong máy","w":["Tìm thông tin mới trên mạng","Xem video trực tuyến","Nhắn tin qua ứng dụng mạng"],"e":"Bài đã lưu trong máy vẫn mở được khi không có mạng."},{"f":"X1","p":"Khi chơi trò chơi trên mạng, một người lạ nhắn bảo em nạp thẻ điện thoại để nhận quà lớn. Em nên làm gì?","a":"Không nạp thẻ, không trả lời và báo bố mẹ","w":["Nạp thẻ ngay để nhận quà","Xin thẻ của bạn để nạp hộ","Nhắn lại hỏi quà trị giá bao nhiêu"],"e":"Người lạ dụ nạp thẻ để nhận quà là chiêu lừa đảo, cần báo người lớn."},{"f":"X1","p":"Một người lạ nhắn tin trong trò chơi trực tuyến hỏi em học trường nào, nhà ở đâu. Em nên làm gì?","a":"Không trả lời, báo cho bố mẹ hoặc thầy cô","w":["Trả lời thật đầy đủ","Hẹn gặp người đó ngoài đời","Gửi ảnh nhà mình cho họ"],"e":"Không chia sẻ thông tin cá nhân với người lạ trên mạng."},{"f":"X1","p":"Em muốn xem một trang web lạ mà bạn rủ rê, không rõ có phù hợp không. Em nên làm gì?","a":"Hỏi thầy cô hoặc bố mẹ trước khi xem","w":["Tự mở xem ngay","Rủ thêm nhiều bạn cùng xem","Xem lén lúc không ai để ý"],"e":"Hỏi người lớn trước giúp em tránh nội dung không phù hợp."},{"f":"X1","p":"Trong lớp học trực tuyến, đến lượt bạn phát biểu nhưng em cứ bật mic nói chen vào. Điều gì không hay sẽ xảy ra?","a":"Cả lớp khó nghe, buổi học bị lộn xộn","w":["Lớp học vui hơn hẳn","Cô giáo khen em nói nhiều","Bạn khác nghe rõ hơn"],"e":"Tắt mic khi chưa đến lượt là ứng xử lịch sự trên mạng lớp học."},{"f":"X1","p":"Em thấy video trên mạng có nội dung làm em sợ. Em nên làm gì?","a":"Tắt video và kể cho bố mẹ nghe","w":["Xem tiếp cho hết sợ","Chia sẻ cho các bạn cùng xem","Giấu không kể với ai"],"e":"Gặp nội dung làm em sợ, hãy tắt đi và kể với người lớn."}],"tin3-luutru":[{"f":"K1","p":"Em lưu bài vẽ vào thư mục 'Bài vẽ của em' thay vì để lung tung ngoài màn hình. Lần sau tìm lại sẽ thế nào?","a":"Tìm thấy nhanh vì biết bài nằm ở đâu","w":["Khó tìm hơn trước","Bài vẽ tự biến mất","Bài vẽ đổi thành bài văn"],"e":"Lưu đúng thư mục giúp em tìm lại tệp nhanh chóng."},{"f":"K1","p":"Nếu em đổi tên tệp 'bai1' thành 'Bai ve con meo' thì điều gì xảy ra?","a":"Tệp dễ nhận ra hơn, nội dung không đổi","w":["Nội dung bức vẽ bị xoá","Tệp biến thành thư mục","Máy tính bị chậm lại"],"e":"Đổi tên chỉ thay tên tệp, nội dung bên trong vẫn nguyên."},{"f":"K1","p":"Em tạo thư mục 'Lớp 3' rồi để hết bài Toán, Tiếng Việt, bài vẽ chung vào đó lẫn lộn. Khi cần tìm bài Toán, điều gì xảy ra?","a":"Phải lục tìm lâu giữa nhiều tệp lẫn lộn","w":["Tìm thấy ngay lập tức","Bài Toán tự nhảy ra đầu tiên","Các tệp tự sắp xếp theo môn"],"e":"Chia thư mục con theo môn học giúp tìm tệp dễ hơn."},{"f":"K1","p":"Nếu em xoá một tệp bài tập cũ vào thùng rác của máy tính thì điều gì xảy ra?","a":"Tệp rời khỏi thư mục cũ, nằm trong thùng rác","w":["Tệp in ra giấy ngay","Tệp gửi sang máy bạn","Tệp nhân đôi lên"],"e":"Xoá tệp là đưa tệp vào thùng rác, không còn ở chỗ cũ."},{"f":"K1","p":"Sơ đồ hình cây cho thấy thư mục 'Học tập' chứa 'Toán' và 'Tiếng Việt'. Nếu em mở thư mục 'Học tập' thì em sẽ thấy gì?","a":"Hai thư mục con Toán và Tiếng Việt","w":["Chỉ thấy một tệp trống","Thấy thư mục của lớp khác","Không thấy gì cả"],"e":"Thư mục lớn chứa các thư mục con ở cấp dưới."},{"f":"X1","p":"Máy tính của lớp báo ổ đĩa gần đầy vì nhiều bạn lưu bài lung tung, trùng lặp. Cả lớp nên làm gì?","a":"Xoá tệp rác, sắp xếp lại bài vào thư mục chung","w":["Cứ lưu thêm thật nhiều","Đập nhẹ vào thùng máy","Tắt máy để mai tính"],"e":"Dọn dẹp và sắp xếp tệp giúp máy gọn gàng, còn chỗ lưu bài."},{"f":"X1","p":"Em định xoá một thư mục nhưng không chắc bên trong có bài của bạn khác không. Em nên làm gì?","a":"Mở ra kiểm tra và hỏi cô giáo trước khi xoá","w":["Xoá luôn cho nhanh","Đổi tên thư mục đi","Giấu thư mục vào chỗ khác"],"e":"Kiểm tra trước khi xoá để không làm mất bài của người khác."},{"f":"X1","p":"Hai bạn cùng lưu bài tên 'Bai tap' vào cùng một thư mục chung của lớp. Điều gì dễ xảy ra và cần tránh?","a":"Dễ nhầm bài của nhau, nên thêm tên mình vào tên tệp","w":["Không sao, máy tự phân biệt","Bài của hai bạn gộp làm một","Máy sẽ từ chối cả hai bài"],"e":"Đặt tên tệp kèm tên mình giúp không nhầm bài với bạn."},{"f":"X1","p":"Em thấy thư mục bài học của lớp bị ai đó đổi tên lung tung. Em nên làm gì?","a":"Báo cô giáo để khôi phục tên đúng","w":["Tự đổi tên các thư mục khác theo","Xoá thư mục đó đi","Mặc kệ, không liên quan"],"e":"Báo thầy cô khi thấy dữ liệu của lớp bị thay đổi lạ."},{"f":"X1","p":"Bạn ngồi cạnh xoá nhầm bài vẽ của mình rồi lo lắng. Em nên khuyên bạn làm gì?","a":"Bình tĩnh báo cô giáo để được giúp tìm lại","w":["Tự ý xoá bài của bạn khác lại","Giấu cô giáo chuyện này","Tắt máy đi thật nhanh"],"e":"Báo thầy cô kịp thời có thể giúp khôi phục bài đã xoá nhầm."}],"tin3-baove":[{"f":"K1","p":"Nếu em cho bạn biết mật khẩu máy tính của mình thì điều gì có thể xảy ra?","a":"Bạn có thể vào và xem, sửa bài của em","w":["Không có gì thay đổi cả","Mật khẩu tự mạnh hơn","Máy tính khoá vĩnh viễn"],"e":"Mật khẩu là bí mật cá nhân, chia sẻ sẽ mất an toàn."},{"f":"K1","p":"Em đặt mật khẩu là ngày sinh của mình và ghi ra giấy dán lên màn hình. Mật khẩu đó có an toàn không?","a":"Không, người khác dễ đoán và nhìn thấy","w":["Rất an toàn tuyệt đối","An toàn vì chữ đẹp","An toàn vì giấy nhỏ"],"e":"Mật khẩu dễ đoán và để lộ ra ngoài thì không an toàn."},{"f":"K1","p":"Nếu em quên đăng xuất tài khoản trên máy tính dùng chung ở thư viện thì điều gì có thể xảy ra?","a":"Người dùng sau có thể xem thông tin của em","w":["Tài khoản tự xoá mất","Máy tính chạy nhanh hơn","Không ai dùng được máy nữa"],"e":"Dùng xong máy chung phải đăng xuất để bảo vệ tài khoản."},{"f":"X1","p":"Em bấm vào một tệp lạ không rõ từ đâu tới. Điều gì nên làm trước tiên theo bài học an toàn?","a":"Dừng lại, không mở nữa và báo thầy cô","w":["Mở nhanh xem có gì hay","Gửi tệp lạ cho các bạn","Đổi tên tệp rồi mở"],"e":"Tệp lạ có thể không an toàn, hãy báo thầy cô, bố mẹ."},{"f":"K1","p":"Nếu em đăng ảnh chụp rõ địa chỉ nhà lên mạng thì nguy cơ gì có thể xảy ra?","a":"Người lạ biết nhà em ở đâu, không an toàn","w":["Được nhiều người khen nhà đẹp","Ảnh tự mờ đi sau một ngày","Không có nguy cơ gì"],"e":"Địa chỉ nhà là thông tin cá nhân, không đăng công khai."},{"f":"X1","p":"Một bạn trong lớp xin mật khẩu của em để vào xem bài. Em nên ứng xử thế nào?","a":"Từ chối nhẹ nhàng, mật khẩu không chia sẻ với ai","w":["Cho bạn mượn một lần","Đổi mật khẩu rồi cho bạn","Viết mật khẩu ra giấy cho bạn"],"e":"Mật khẩu chỉ mình em biết, không cho ai mượn."},{"f":"X1","p":"Khi tạo mật khẩu mới cùng bố mẹ, em nên chọn mật khẩu thế nào?","a":"Khó đoán, chỉ em và bố mẹ biết","w":["Là tên của em viết thường","Là dãy số 123456 cho dễ nhớ","Là ngày sinh của em"],"e":"Mật khẩu khó đoán giúp bảo vệ thông tin của em."},{"f":"X1","p":"Em thấy bạn lớp khác đang cố gõ mật khẩu đoán vào máy của một bạn vắng mặt. Em nên làm gì?","a":"Nhắc bạn dừng lại và báo cô giáo","w":["Đứng xem bạn đoán đúng không","Đoán giúp bạn vài mật khẩu","Chụp ảnh lại để trêu bạn"],"e":"Đoán mật khẩu của người khác là việc sai, cần báo thầy cô."},{"f":"X1","p":"Em ngồi vào máy ở phòng tin học và thấy tài khoản của bạn học trước vẫn còn đăng nhập sẵn. Em nên làm gì?","a":"Đăng xuất tài khoản đó và báo thầy cô","w":["Dùng luôn tài khoản của bạn","Đọc tin nhắn trong tài khoản bạn","Đổi mật khẩu tài khoản của bạn"],"e":"Không dùng tài khoản của người khác; đăng xuất và báo thầy cô để bảo vệ thông tin."},{"f":"X1","p":"Một trang web lạ yêu cầu em nhập họ tên, trường lớp mới cho chơi tiếp. Em nên làm gì?","a":"Không nhập, thoát ra và báo bố mẹ","w":["Nhập đầy đủ cho nhanh","Nhập tên giả của bạn khác","Nhập một nửa thông tin"],"e":"Không cung cấp thông tin cá nhân cho trang web lạ."}],"tin3-trinhchieu":[{"f":"K1","p":"Em làm bài trình chiếu về con mèo nhưng quên lưu trước khi máy tắt. Lần mở lại, bài của em sẽ thế nào?","a":"Bài chưa lưu sẽ bị mất, phải làm lại","w":["Bài vẫn còn nguyên đầy đủ","Bài tự in ra giấy","Bài chuyển sang máy bạn"],"e":"Chưa lưu mà tắt máy thì công việc đang làm sẽ mất."},{"f":"K1","p":"Trong trình chiếu, nếu em chèn thêm một trang mới ở giữa thì điều gì xảy ra?","a":"Bài có thêm trang, các trang sau lùi xuống","w":["Trang cuối bị xoá mất","Cả bài biến thành một trang","Chữ trên các trang bị đổi màu"],"e":"Chèn trang mới làm tăng số trang của bài trình chiếu."},{"f":"K1","p":"Khi luyện chuột, nếu em bấm đúp quá chậm vào biểu tượng trò chơi thì điều gì thường xảy ra?","a":"Trò chơi không mở, chỉ chọn được biểu tượng","w":["Trò chơi mở hai lần","Biểu tượng biến mất","Máy tính rung lên"],"e":"Bấm đúp cần hai lần bấm nhanh liên tiếp mới mở được."},{"f":"K1","p":"Em kéo thả một hình ảnh sang góc khác của trang trình chiếu. Hình ảnh sẽ thế nào?","a":"Di chuyển đến vị trí mới em thả chuột","w":["Biến mất khỏi bài","Tự nhân thành hai hình","Đổi thành chữ viết"],"e":"Kéo thả là cách di chuyển đối tượng trên trang."},{"f":"K1","p":"Nếu em bấm nút trình chiếu mà loa đang tắt tiếng thì khán giả sẽ gặp điều gì?","a":"Chỉ thấy hình, không nghe được âm thanh em chèn","w":["Nghe tiếng to hơn bình thường","Bài trình chiếu không chạy","Chữ tự đọc thành tiếng"],"e":"Loa tắt tiếng thì âm thanh trong bài không phát ra được."},{"f":"X1","p":"Đến lượt em trình chiếu trước lớp mà em cứ đứng che hết màn hình. Buổi trình chiếu sẽ thế nào?","a":"Các bạn không nhìn thấy nội dung bài","w":["Các bạn thấy rõ hơn","Màn hình sáng hơn hẳn","Cô giáo khen em đứng đẹp"],"e":"Khi trình chiếu, em nên đứng sang một bên để lớp nhìn rõ màn hình."},{"f":"X1","p":"Em làm bài trình chiếu nhóm, một bạn muốn xoá hết trang của bạn khác để làm lại. Em nên nói gì?","a":"Trao đổi trong nhóm, tôn trọng phần việc của bạn","w":["Đồng ý xoá luôn cho nhanh","Tự xoá thêm trang của bạn nữa","Giấu bài không cho bạn xem"],"e":"Làm việc nhóm cần tôn trọng công sức của nhau."},{"f":"X1","p":"Khi luyện tập với chuột trên máy của lớp, em bấm rất mạnh và liên tục vì sốt ruột. Điều đó có hại gì?","a":"Chuột dễ hỏng, thao tác lại càng sai","w":["Chuột chạy nhanh và chính xác hơn","Cô giáo khen em nhanh tay","Máy tính mạnh lên"],"e":"Thao tác nhẹ nhàng, đúng cách giúp thiết bị bền và chính xác."},{"f":"X1","p":"Bài trình chiếu của em có chữ quá nhỏ, bạn ngồi cuối lớp không đọc được. Em nên sửa thế nào?","a":"Tăng cỡ chữ và chọn màu chữ rõ ràng","w":["Để nguyên vì em đọc được","Thêm thật nhiều chữ nữa","Cho chữ nhạt màu hơn"],"e":"Chữ to, rõ giúp mọi người trong lớp cùng đọc được bài."},{"f":"X1","p":"Trước khi trình chiếu, em phát hiện bài của nhóm bị lỗi không mở được. Em nên làm gì?","a":"Báo cô giáo và dùng bản đã lưu dự phòng nếu có","w":["Giấu lỗi, đến lượt thì im lặng","Đổ lỗi cho bạn trong nhóm","Bỏ lượt trình chiếu về chỗ ngồi"],"e":"Báo thầy cô và chuẩn bị bản dự phòng giúp buổi học không bị gián đoạn."}],"tin3-giaiquyet":[{"f":"K1","p":"Em thực hiện công việc 'đánh răng' nhưng bỏ qua bước lấy kem đánh răng. Kết quả sẽ thế nào?","a":"Chải răng không có kem, răng kém sạch","w":["Răng vẫn sạch như thường","Bàn chải biến mất","Không khác gì cả"],"e":"Thiếu một bước trong dãy việc thì kết quả không trọn vẹn."},{"f":"K1","p":"Việc 'nếu trời mưa thì mang áo mưa, nếu không mưa thì đội mũ' phụ thuộc vào điều kiện gì?","a":"Điều kiện thời tiết lúc ra khỏi nhà","w":["Màu áo mưa em thích","Số bạn cùng đi học","Giờ em thức dậy"],"e":"Công việc theo điều kiện thay đổi tùy tình huống xảy ra."},{"f":"K1","p":"Em làm các bước pha nước chanh nhưng cho đường vào sau cùng khi đã uống thử. Thứ tự này gây ra điều gì?","a":"Nước chanh lúc đầu chua, chưa ngọt đều","w":["Nước chanh ngon ngay từ đầu","Đường tự tan trước","Không ảnh hưởng gì"],"e":"Làm đúng thứ tự các bước cho kết quả tốt hơn."},{"f":"K1","p":"Robôt lớp em được dặn: gặp vật cản thì rẽ phải. Nếu đường đi không có vật cản nào thì rô-bốt sẽ làm gì?","a":"Đi thẳng như bình thường","w":["Cứ rẽ phải liên tục","Dừng lại không đi nữa","Quay đầu đi ngược lại"],"e":"Điều kiện không xảy ra thì rô-bốt làm việc như thường."},{"f":"K1","p":"Em chia việc 'chuẩn bị cặp sách' thành các bước nhỏ. Nếu bỏ bước kiểm tra thời khoá biểu thì điều gì dễ xảy ra?","a":"Có thể mang thiếu hoặc thừa sách vở","w":["Cặp sách nhẹ đi một nửa","Sách tự sắp xếp đúng hết","Không có gì xảy ra"],"e":"Chia bước và làm đủ bước giúp công việc chính xác."},{"f":"X1","p":"Cô giao việc nhóm: trang trí bảng lớp. Nhóm em cãi nhau vì ai cũng muốn làm phần dễ. Nhóm nên làm gì?","a":"Chia việc rõ ràng, mỗi bạn một phần vừa sức","w":["Để một bạn làm hết","Bỏ việc không làm nữa","Ai nhanh tay thì làm phần dễ"],"e":"Phân chia công việc rõ ràng giúp nhóm làm việc hiệu quả."},{"f":"X1","p":"Em làm bài tập theo các bước cô hướng dẫn nhưng đến bước 3 thì không hiểu. Em nên làm gì?","a":"Hỏi lại cô giáo hoặc bạn trước khi làm tiếp","w":["Bỏ qua bước 3 làm luôn bước 5","Làm bừa cho xong bài","Xé bài làm lại từ đầu"],"e":"Hỏi khi chưa hiểu giúp em làm đúng các bước tiếp theo."},{"f":"X1","p":"Hai cách làm một việc: cách A làm lần lượt từng bước, cách B nhảy bước lung tung. Cách nào cho kết quả tốt hơn và vì sao em chọn?","a":"Cách A, vì làm theo thứ tự ít bị sót việc","w":["Cách B, vì nhanh hơn hẳn","Cả hai như nhau","Cách B, vì vui hơn"],"e":"Làm việc theo trình tự giúp không bỏ sót và dễ kiểm tra."},{"f":"X1","p":"Em hẹn: nếu làm xong bài sớm thì được đọc truyện. Hôm nay em làm bài chậm, chưa xong. Em nên làm gì?","a":"Tiếp tục làm bài cho xong, để truyện sang lúc khác","w":["Tự thưởng truyện trước rồi làm sau","Giấu vở bài tập đi","Xin bạn làm hộ cho nhanh"],"e":"Thực hiện đúng điều kiện đã đặt ra giúp em tự giác hơn."},{"f":"X1","p":"Khi rửa tay, em chỉ xoa xà phòng một tay rồi xả nước luôn cho nhanh. Việc làm này sai ở đâu?","a":"Chưa làm đủ các bước rửa tay đúng cách","w":["Không sai gì cả","Xà phòng sẽ tự lan sang tay kia","Nước sẽ rửa sạch thay xà phòng"],"e":"Làm đủ bước theo hướng dẫn mới đạt kết quả như mong muốn."}],"cn3-doisong":[{"f":"K1","p":"Nếu em để quạt điện chạy cả ngày khi không có ai trong phòng thì điều gì xảy ra?","a":"Lãng phí điện, quạt nhanh mòn","w":["Phòng mát hơn cho ngày mai","Quạt chạy êm hơn hẳn","Tiết kiệm được điện"],"e":"Không dùng mà vẫn bật quạt là lãng phí điện."},{"f":"K1","p":"Em đặt đèn học quá xa quyển vở khi học buổi tối. Mắt em sẽ thế nào?","a":"Mỏi mắt vì ánh sáng không đủ rõ","w":["Nhìn chữ rõ hơn","Mắt khoẻ hơn","Chữ tự to lên"],"e":"Đèn học cần đặt đúng vị trí, đủ sáng để bảo vệ mắt."},{"f":"K1","p":"Nếu ti vi đang mở mà em đứng quá gần màn hình xem lâu thì điều gì có thể xảy ra?","a":"Mỏi mắt, không tốt cho thị lực","w":["Mắt sáng hơn hẳn","Nghe rõ hơn nhiều","Không ảnh hưởng gì"],"e":"Xem ti vi quá gần và quá lâu làm mỏi mắt."},{"f":"K1","p":"Radio để ở nơi ẩm ướt lâu ngày thì điều gì có thể xảy ra?","a":"Radio dễ hỏng, nghe rè hoặc mất tiếng","w":["Radio nghe hay hơn","Radio tự phát hình ảnh","Không sao cả"],"e":"Thiết bị điện cần để nơi khô ráo mới bền."},{"f":"K1","p":"Nếu em bật đèn học quay thẳng vào mặt bạn ngồi đối diện thì bạn sẽ thế nào?","a":"Bị chói mắt, khó nhìn rõ bài","w":["Nhìn bài rõ hơn","Ấm người hơn","Không bị ảnh hưởng"],"e":"Ánh sáng đèn cần chiếu vào trang sách, không chiếu vào mắt."},{"f":"X1","p":"Thấy em trai thò tay về phía lồng quạt đang quay, em phải làm gì ngay?","a":"Ngăn em lại và tắt quạt, báo người lớn","w":["Đứng xem em có sao không","Quay quạt về phía khác","Cười vì em nghịch vui"],"e":"Thò tay vào quạt đang chạy rất nguy hiểm, phải ngăn ngay."},{"f":"X1","p":"Trước khi đi ngủ, phòng khách còn bật ti vi, đèn mà không ai xem. Em nên làm gì?","a":"Tắt ti vi và đèn không cần thiết","w":["Để vậy cho nhà sáng","Mở thêm quạt cho mát","Gọi bạn sang xem cùng"],"e":"Tắt thiết bị khi không dùng giúp tiết kiệm điện."},{"f":"X1","p":"Dây sạc điện thoại của nhà em bị đứt một nửa, lộ sợi dây bên trong. Em nên làm gì?","a":"Ngừng dùng dây sạc đó, báo bố mẹ thay dây mới","w":["Dán băng dính rồi sạc tiếp","Cầm chỗ đứt kiểm tra khi đang sạc","Tự cắt nối lại dây sạc"],"e":"Dây sạc đứt hở rất nguy hiểm, chỉ người lớn mới được xử lí và thay mới."},{"f":"X1","p":"Khi cắm phích điện, tay em vừa rửa xong còn ướt. Em nên làm gì?","a":"Lau tay thật khô rồi mới chạm vào phích cắm","w":["Cắm ngay cho nhanh","Nhờ tay ướt cắm hộ","Đeo găng tay vải ướt"],"e":"Tay ướt chạm vào điện rất nguy hiểm, phải lau khô trước."},{"f":"X1","p":"Quạt điện nhà em phát ra tiếng kêu lạ và có mùi khét. Em nên làm gì?","a":"Tắt quạt, rút điện và báo người lớn","w":["Bật số to hơn cho hết kêu","Xịt nước vào quạt","Dùng tiếp đến khi quạt tự dừng"],"e":"Thiết bị có mùi khét phải ngừng dùng và báo người lớn ngay."}],"cn3-thucong":[{"f":"K1","p":"Nếu em gấp giấy không miết kĩ nếp gấp thì sản phẩm thủ công sẽ thế nào?","a":"Nếp gấp bung ra, sản phẩm kém đẹp và không chắc","w":["Sản phẩm đẹp hơn hẳn","Giấy tự dính lại","Không khác gì cả"],"e":"Miết kĩ nếp gấp giúp sản phẩm gọn và bền hơn."},{"f":"K1","p":"Em dùng quá nhiều hồ dán lên giấy mỏng. Điều gì sẽ xảy ra?","a":"Giấy bị nhăn, ướt và lâu khô","w":["Giấy khô nhanh hơn","Giấy cứng như bìa","Sản phẩm thơm hơn"],"e":"Dán vừa đủ hồ giúp giấy phẳng và sản phẩm đẹp."},{"f":"K1","p":"Nếu em cắt giấy bằng kéo cùn, đường cắt sẽ thế nào?","a":"Đường cắt nham nhở, giấy bị rách xước","w":["Đường cắt sắc nét hơn","Giấy tự thẳng hàng","Cắt nhanh hơn nhiều"],"e":"Dụng cụ phù hợp và sắc mới cho đường cắt đẹp."},{"f":"K1","p":"Em làm biển báo bằng giấy rồi để ngoài sân gặp mưa. Biển báo sẽ thế nào?","a":"Giấy ướt, nhòe chữ và dễ rách hỏng","w":["Chữ đậm rõ hơn","Biển cứng chắc hơn","Không bị ảnh hưởng"],"e":"Sản phẩm giấy cần để nơi khô ráo mới bền."},{"f":"K1","p":"Khi làm đồ chơi giấy, nếu em không chờ hồ khô đã cầm lên chơi thì điều gì xảy ra?","a":"Các phần dán dễ bung, sản phẩm bị hỏng","w":["Sản phẩm chắc hơn nhiều","Hồ tự khô ngay lập tức","Đồ chơi bay được"],"e":"Cần chờ hồ khô hẳn thì sản phẩm mới chắc chắn."},{"f":"X1","p":"Em dùng xong kéo thủ công, bạn xin mượn. Em đưa kéo cho bạn thế nào là an toàn?","a":"Đưa phần cán, lưỡi kéo hướng về phía mình","w":["Chĩa lưỡi kéo về phía bạn","Ném kéo sang bàn bạn","Chạy thật nhanh mang kéo đến cho bạn"],"e":"Đưa kéo bằng cán giúp bạn không bị lưỡi kéo làm đau."},{"f":"X1","p":"Trong giờ thủ công, bạn em làm rơi hộp ghim giấy, ghim văng khắp sàn lớp. Em nên làm gì?","a":"Báo cô giáo và cùng nhặt hết ghim bỏ vào hộp","w":["Kệ ghim trên sàn, học tiếp","Dùng chân gạt ghim vào gầm bàn","Cất vài chiếc ghim vào cặp mang về"],"e":"Ghim rơi dưới sàn dễ đâm vào chân; phải nhặt sạch, bỏ vào hộp và báo cô."},{"f":"X1","p":"Bạn dùng kéo cắt cả dây thừng cứng và bìa dày không đúng việc của kéo thủ công. Em nên nhắc bạn điều gì?","a":"Kéo sẽ bị cùn, hỏng; mỗi dụng cụ dùng đúng việc","w":["Cắt càng cứng kéo càng sắc","Kéo thủ công cắt được mọi thứ","Hỏng thì mua kéo khác"],"e":"Dùng dụng cụ đúng mục đích giúp dụng cụ bền và an toàn."},{"f":"X1","p":"Sau lễ hội, em muốn cất chiếc đèn lồng bằng giấy để năm sau dùng lại. Em nên bảo quản thế nào?","a":"Để nơi khô ráo, tránh nước và vật nặng đè lên","w":["Để ngoài sân cho khô nắng mưa","Đè sách nặng lên trên cho gọn","Cất trong nhà tắm ẩm ướt"],"e":"Đèn lồng giấy sợ nước và bị đè nặng sẽ méo hỏng, cần cất nơi khô ráo."},{"f":"X1","p":"Khi dùng dao rọc giấy có người lớn hướng dẫn, em sơ ý hướng lưỡi dao về phía tay mình. Cô giáo nhắc em điều gì?","a":"Luôn cắt hướng ra xa người, tập trung khi làm","w":["Cắt nhanh hơn cho xong","Vừa cắt vừa nói chuyện","Hướng dao vào tay cho chắc"],"e":"Dùng dụng cụ sắc phải cẩn thận, cắt xa người để an toàn."}],"tv3-chinhta":[{"f":"V1","p":"Trong bài tập, Lan phân vân giữa 'kéo co' và 'céo co'. Lan nhớ quy tắc trước e phải viết k. Cuối cùng Lan chọn cách viết đúng. Lan chọn cách viết nào?","a":"'kéo co' viết bằng k","w":["'céo co' viết bằng c","Cả hai đều đúng","Viết thế nào cũng được"],"e":"Trước e ta viết k nên 'kéo co' là đúng."},{"f":"V1","p":"Minh viết từ 'ghế' khi tả đồ dùng để ngồi. Minh viết gh vì chữ sau là ê. Một bạn viết 'gế'. Theo em, ai viết đúng?","a":"Minh viết đúng","w":["Bạn kia viết đúng","Cả hai cùng đúng","Cả hai cùng sai"],"e":"Trước ê phải viết gh nên 'ghế' là đúng."},{"f":"V1","p":"Trong giờ chính tả, cô đọc cho cả lớp viết từ 'gia đình'. Khi viết từ này, Tùng đã viết đúng âm đầu của tiếng đầu. Tùng đã viết âm đầu nào?","a":"Chữ gi","w":["Chữ d","Chữ r","Chữ g"],"e":"Từ 'gia đình' viết bằng gi."},{"f":"V1","p":"Hà đọc lại bài chính tả vừa viết. Em phát hiện mình viết 'xông' thay cho 'sông' và sửa ngay. Việc đọc lại giúp Hà điều gì?","a":"Tìm và sửa được lỗi chính tả","w":["Viết bài dài hơn","Đọc to hơn bạn","Không phải học nữa"],"e":"Đọc lại bài giúp phát hiện lỗi để sửa kịp thời."},{"f":"V1","p":"Trong giờ chính tả, nhiều bạn trong lớp còn lẫn dấu hỏi và dấu ngã. Cô dặn: muốn viết đúng dấu hỏi, dấu ngã, em cần đọc chậm và nghe kĩ từng tiếng. Cả lớp ghi nhớ lời cô dặn để viết đúng hơn. Làm theo lời cô sẽ giúp em điều gì?","a":"Phân biệt đúng dấu hỏi, ngã","w":["Viết nhanh hơn hẳn","Không cần nghe đọc","Viết chữ to hơn"],"e":"Đọc chậm, nghe kĩ giúp phân biệt dấu hỏi và dấu ngã."},{"f":"V1","p":"Hai bạn tranh luận về từ 'niềm vui'. Một bạn viết bằng n, bạn kia viết bằng l. Cách viết đúng là cách nào?","a":"Viết bằng n: 'niềm vui'","w":["Viết bằng l: 'liềm vui'","Viết bằng ngh","Viết bằng ng"],"e":"Từ 'niềm vui' viết bằng n."},{"f":"V1","p":"Trong giờ chính tả, lớp viết từ 'nghệ thuật'. Nhiều bạn viết đúng vì nhớ quy tắc về ngh. Quy tắc đó là gì?","a":"Trước ê phải viết ngh","w":["Trước mọi chữ viết ngh","Ngh chỉ viết cuối từ","Viết ng cũng đúng"],"e":"Trước i, e, ê ta viết ngh nên 'nghệ' viết bằng ngh."},{"f":"V1","p":"Bé An viết 'quả chanh' đúng chính tả. Bạn Bo lại viết 'quả tranh'. Lỗi của Bo nằm ở đâu?","a":"Bo viết tr thay cho ch","w":["Bo viết thiếu dấu","Bo viết thừa một chữ","Bo không có lỗi"],"e":"Quả chua họ cam viết là 'chanh' với ch."},{"f":"V1","p":"Mỗi tối, Sơn dành mười phút luyện viết những từ hay sai. Sau một tháng, bài của Sơn rất ít lỗi. Sơn tiến bộ nhờ đâu?","a":"Nhờ luyện tập đều đặn","w":["Nhờ bài tập dễ hơn","Nhờ bạn viết hộ","Nhờ viết ít đi"],"e":"Luyện viết đều đặn giúp Sơn nhớ cách viết đúng."},{"f":"V1","p":"Mai đang viết một đoạn văn kể về ngày nghỉ của mình. Trong đoạn có một từ khó mà Mai chưa biết viết thế nào cho đúng. Khi gặp một từ khó chưa biết viết thế nào, Mai tra từ điển rồi mới viết. Cách làm của Mai cho thấy điều gì?","a":"Mai cẩn thận, ham học hỏi","w":["Mai chưa thuộc bài","Mai viết chậm nhất lớp","Mai không tự tin"],"e":"Tra từ điển khi chưa chắc chắn cho thấy Mai cẩn thận."}],"tv3-tungu":[{"f":"V1","p":"Cô yêu cầu tìm từ đồng nghĩa với 'chăm chỉ'. Lan chọn 'siêng năng' và được khen đúng. Lan chọn đúng vì hai từ này có quan hệ gì?","a":"Có nghĩa gần giống nhau","w":["Có nghĩa trái ngược nhau","Cùng chỉ một đồ vật","Chỉ giống nhau về âm"],"e":"Chăm chỉ và siêng năng là từ đồng nghĩa, nghĩa gần giống nhau."},{"f":"V1","p":"Trời hôm nay nóng, còn hôm qua thì lạnh. Hai từ 'nóng' và 'lạnh' được dùng để so sánh thời tiết. Hai từ đó là cặp từ gì?","a":"Cặp từ trái nghĩa","w":["Cặp từ đồng nghĩa","Cặp từ chỉ tên riêng","Không có quan hệ gì"],"e":"Nóng và lạnh có nghĩa ngược nhau nên là từ trái nghĩa."},{"f":"V1","p":"Cả lớp ra công viên quan sát cái hồ lớn ở giữa công viên. Các bạn đứng ngắm mặt hồ rộng mênh mông trong buổi sáng đẹp trời. Bạn Hùng tả cái hồ là 'khổng lồ' vì hồ rất rộng lớn. Từ 'khổng lồ' đồng nghĩa gần nhất với từ nào?","a":"To lớn","w":["Nhỏ bé","Bé xíu","Hẹp hòi"],"e":"Khổng lồ chỉ kích thước rất lớn, gần nghĩa với to lớn."},{"f":"V1","p":"Mai viết một bài văn tả người lính cứu hỏa dũng cảm. Trong bài văn, Mai dùng từ 'dũng cảm' thay cho 'can đảm' mà ý câu không đổi. Cô giáo khen Mai biết chọn từ đồng nghĩa để bài văn hay hơn. Mai làm được vậy vì hai từ này thế nào?","a":"Là từ đồng nghĩa với nhau","w":["Là từ trái nghĩa","Là từ chỉ màu sắc","Không liên quan nhau"],"e":"Can đảm và dũng cảm đồng nghĩa nên thay thế được cho nhau."},{"f":"V1","p":"Cô giáo chuẩn bị hai thẻ từ cho bài học về độ sáng. Cả lớp chăm chú nhìn hai thẻ từ và suy nghĩ tìm điểm khác nhau. Cô viết hai từ 'sáng' và 'tối' lên bảng khi dạy về độ sáng. Cô muốn học sinh nhận ra điều gì về hai từ này?","a":"Chúng trái nghĩa với nhau","w":["Chúng đồng nghĩa nhau","Chúng là tên riêng","Chúng chỉ là một từ"],"e":"Sáng và tối trái nghĩa nhau về độ sáng."},{"f":"V1","p":"Trong trò chơi xếp từ đúng chủ đề, mỗi bạn phải chọn các từ cùng một nhóm. An đọc lại các từ mình đã chọn trước khi giơ tay trả lời cô. Khi sắp xếp từ theo chủ đề gia đình, An chọn: ông bà, cha mẹ, anh chị. An chọn đúng vì các từ này đều thuộc nhóm nào?","a":"Từ chỉ người thân trong nhà","w":["Từ chỉ đồ vật","Từ chỉ hoạt động","Từ chỉ thiên nhiên"],"e":"Ông bà, cha mẹ, anh chị đều là người thân trong gia đình."},{"f":"V1","p":"Một bạn viết bài văn tả người bạn thân của mình cho cả lớp nghe. Sau bài văn, cả lớp cùng thảo luận để tìm từ ngược nghĩa với từ được tả trong bài. Một bạn tả bạn mình 'nhút nhát' khi đứng trước lớp. Từ trái nghĩa với 'nhút nhát' là từ nào?","a":"Mạnh dạn","w":["Sợ hãi","Rụt rè","E thẹn"],"e":"Nhút nhát trái nghĩa với mạnh dạn, tự tin."},{"f":"V1","p":"Trên đường về quê, em đi qua một con đường làng nhỏ uốn quanh chân đồi. Đọc câu 'Con đường làng quanh co, uốn lượn', em hiểu con đường có hình dáng thế nào? Nhờ từ ngữ nào em biết điều đó?","a":"Đường cong, không thẳng nhờ 'quanh co'","w":["Đường thẳng tắp nhờ 'làng'","Đường rất rộng nhờ 'con'","Không biết được hình dáng"],"e":"Từ 'quanh co, uốn lượn' tả đường cong, không thẳng."},{"f":"V1","p":"Cô cho từ 'vui vẻ' và yêu cầu tìm từ trái nghĩa. Học sinh chọn 'buồn bã'. Lựa chọn đó đúng vì sao?","a":"Vì hai từ chỉ cảm xúc ngược nhau","w":["Vì hai từ dài bằng nhau","Vì hai từ cùng bắt đầu một âm","Vì bạn bên cạnh chọn thế"],"e":"Vui vẻ và buồn bã là hai cảm xúc trái ngược nhau."},{"f":"V1","p":"Nam viết một bài văn tả cây to ở trong sân trường của mình. Khi viết văn, Nam thay từ 'to' bằng 'to lớn', 'khổng lồ' ở vài chỗ cho bài sinh động. Cô giáo khen Nam biết dùng từ đồng nghĩa để bài văn phong phú hơn. Nam làm vậy có tác dụng gì?","a":"Bài văn phong phú, đỡ lặp từ","w":["Bài văn dài ra vô ích","Câu văn khó hiểu hơn","Không có tác dụng gì"],"e":"Dùng từ đồng nghĩa thay thế giúp bài văn phong phú, tránh lặp."}],"tv3-cau":[{"f":"V1","p":"Cô hỏi cả lớp: 'Bạn đang làm gì?' Lan đứng lên trả lời câu hỏi của cô. Câu cô vừa nói thuộc kiểu câu nào?","a":"Câu hỏi","w":["Câu kể","Câu cảm","Câu khiến"],"e":"Câu dùng để hỏi, kết thúc bằng dấu chấm hỏi là câu hỏi."},{"f":"V1","p":"Nhìn vườn hoa nở rực rỡ, Mai thốt lên: 'Ôi, hoa đẹp quá!' Câu nói của Mai bộc lộ cảm xúc của em. Đó là kiểu câu nào?","a":"Câu cảm","w":["Câu hỏi","Câu khiến","Câu kể"],"e":"Câu bộc lộ cảm xúc, kết thúc bằng dấu chấm than là câu cảm."},{"f":"V1","p":"Cô giáo nói: 'Em hãy gấp sách lại.' Đây là lời cô yêu cầu học sinh thực hiện. Câu này thuộc kiểu câu nào?","a":"Câu khiến","w":["Câu cảm","Câu hỏi","Câu kể"],"e":"Câu nêu yêu cầu, đề nghị là câu khiến."},{"f":"V1","p":"Trong bài tập, bạn An viết: 'Mẹ em là cô giáo.' Câu này giới thiệu về mẹ của An. Nó thuộc kiểu câu nào?","a":"Câu giới thiệu","w":["Câu nêu hoạt động","Câu hỏi","Câu cảm"],"e":"Câu 'Mẹ em là cô giáo' giới thiệu người nên là câu giới thiệu."},{"f":"V1","p":"Trong giờ luyện từ và câu, cô viết một câu lên bảng cho cả lớp cùng phân tích. Câu cô viết là: Đàn bướm bay lượn trên vườn hoa. Bộ phận nào trong câu nêu hoạt động của đàn bướm?","a":"'bay lượn'","w":["'đàn bướm'","'vườn hoa'","'trên'"],"e":"Bộ phận 'bay lượn' nêu hoạt động của đàn bướm."},{"f":"V1","p":"Trong giờ học câu so sánh, cô đọc một câu so sánh cho cả lớp nghe. Cả lớp cùng tìm xem vật nào được dùng để so sánh trong câu. Bạn Hùng viết câu so sánh: 'Mặt trăng tròn như cái đĩa.' Trong câu, mặt trăng được so sánh với vật gì?","a":"Cái đĩa","w":["Mặt trời","Ngôi sao","Đám mây"],"e":"Câu so sánh mặt trăng tròn như cái đĩa."},{"f":"V1","p":"Trong giờ luyện viết câu, các bạn tập đặt câu hỏi về nhiều điều khác nhau. Cô giáo kiểm tra bài của Lan và khen câu hỏi của bạn rất rõ ràng. Khi viết câu hỏi về thời gian, Lan dùng từ 'khi nào' và kết thúc bằng dấu chấm hỏi. Câu của Lan đang hỏi về điều gì?","a":"Thời gian sự việc xảy ra","w":["Nơi chốn sự việc","Nguyên nhân sự việc","Cách thức sự việc"],"e":"Từ 'khi nào' dùng để hỏi về thời gian."},{"f":"V1","p":"Cô đọc câu: 'Nhờ chăm chỉ học tập, Nam đạt kết quả cao.' Câu này cho biết nguyên nhân của việc đạt kết quả cao. Nguyên nhân đó là gì?","a":"Nhờ chăm chỉ học tập","w":["Vì Nam thông minh sẵn","Vì bài kiểm tra dễ","Vì bạn giúp Nam"],"e":"Phần 'nhờ chăm chỉ học tập' nêu nguyên nhân trong câu."},{"f":"V1","p":"Em đọc một đoạn đối thoại trong cuốn truyện tranh mang theo tới lớp. Cả lớp chú ý quan sát cách trình bày lời nói của nhân vật trong đoạn. Trong đoạn đối thoại, lời của nhân vật được đặt sau dấu hai chấm và trong dấu ngoặc kép. Cách trình bày đó cho người đọc biết điều gì?","a":"Đó là lời nói trực tiếp","w":["Đó là ý nghĩ thầm","Đó là phần chú thích","Đó là tên riêng"],"e":"Lời nói trực tiếp thường đặt trong dấu ngoặc kép sau dấu hai chấm."},{"f":"V1","p":"Bạn Mai viết: 'Bông hồng đỏ thắm.' Câu này nêu đặc điểm của bông hồng. Đây là kiểu câu nào?","a":"Câu nêu đặc điểm","w":["Câu nêu hoạt động","Câu giới thiệu","Câu khiến"],"e":"Câu nêu đặc điểm của sự vật là câu nêu đặc điểm."}],"tv3-dochieu":[{"f":"V1","p":"Đọc đoạn: 'Mùa hè, ve kêu râm ran trên những tán phượng đỏ rực. Sân trường vắng lặng vì học sinh đã nghỉ hè.' Đoạn văn cho em biết sân trường thế nào trong hè?","a":"Vắng lặng, không có học sinh","w":["Đông vui như ngày thường","Đang tổ chức hội thao","Có nhiều người đến thăm"],"e":"Đoạn nói sân trường vắng lặng vì học sinh nghỉ hè."},{"f":"V1","p":"Đọc đoạn: 'Bà ngoại trồng rau sau nhà. Mỗi sáng, bà tưới nước và nhổ cỏ rất cẩn thận. Nhờ vậy, vườn rau luôn xanh tốt.' Vườn rau xanh tốt là nhờ đâu?","a":"Nhờ bà chăm sóc cẩn thận","w":["Nhờ trời mưa nhiều","Nhờ đất tự tốt lên","Nhờ rau mọc nhanh sẵn"],"e":"Bà tưới nước, nhổ cỏ cẩn thận nên rau xanh tốt."},{"f":"V1","p":"Lan nhiều lần nói đùa rằng mình bị mất bút để các bạn xúm vào tìm giúp. Các bạn tìm mãi không thấy bút và biết Lan chỉ nói đùa cho vui. Đến hôm Lan bị mất bút thật, bạn kể mà không bạn nào tin lời bạn nữa. Bài học rút ra từ câu chuyện là gì?","a":"Nói dối sẽ làm mất lòng tin","w":["Nói đùa nhiều sẽ được bạn quý hơn","Mất bút thì nên tự tìm một mình","Bạn bè không nên giúp nhau tìm đồ"],"e":"Nói dối nhiều lần khiến bạn bè không còn tin khi ta nói thật."},{"f":"V1","p":"Đọc đoạn: 'Trời sắp mưa, kiến tha mồi về tổ rất nhanh. Con nào cũng chăm chỉ làm việc cùng nhau.' Đoạn văn cho thấy đàn kiến có đức tính gì?","a":"Chăm chỉ và đoàn kết","w":["Lười biếng, chậm chạp","Chỉ lo cho bản thân","Hay cãi nhau"],"e":"Kiến cùng nhau tha mồi chăm chỉ, thể hiện sự đoàn kết."},{"f":"V1","p":"Đọc đoạn: 'Mẹ ốm, Hoa tự giác quét nhà, nấu cháo và lấy nước cho mẹ. Mẹ mỉm cười, nắm tay Hoa đầy yêu thương.' Hoa là cô bé thế nào?","a":"Hiếu thảo, biết chăm sóc mẹ","w":["Chỉ biết chơi đùa","Hay làm nũng mẹ","Không quan tâm mẹ"],"e":"Tự giác chăm sóc mẹ khi ốm cho thấy Hoa hiếu thảo."},{"f":"V1","p":"Đọc đoạn: 'Sóc tích trữ hạt dẻ suốt mùa thu. Khi mùa đông lạnh giá đến, sóc vẫn có thức ăn trong hốc cây.' Vì sao sóc không bị đói trong mùa đông?","a":"Vì sóc đã chuẩn bị từ trước","w":["Vì sóc ngủ suốt mùa đông","Vì các bạn cho sóc ăn","Vì rừng còn nhiều quả"],"e":"Chuẩn bị thức ăn từ mùa thu giúp sóc qua mùa đông."},{"f":"V1","p":"Đọc đoạn: 'Bạn Nam bị ốm phải nghỉ học một tuần. Các bạn trong lớp thay nhau chép bài và giảng lại cho Nam khi bạn khỏi ốm.' Các bạn của Nam là những người thế nào?","a":"Tốt bụng, biết giúp đỡ bạn","w":["Chỉ lo học phần mình","Hay trêu chọc bạn","Không quan tâm bạn ốm"],"e":"Chép bài, giảng bài giúp bạn cho thấy các bạn tốt bụng."},{"f":"V1","p":"Đọc đoạn: 'Dòng sông quê em hiền hòa chảy qua cánh đồng. Hai bên bờ, hàng tre xanh rì rào trong gió. Ai đi xa cũng nhớ về dòng sông ấy.' Ý chính của đoạn văn là gì?","a":"Vẻ đẹp của dòng sông quê","w":["Cách bắt cá trên sông","Lịch sử của dòng sông","Các mùa trên quê hương"],"e":"Đoạn tập trung tả vẻ đẹp hiền hòa của dòng sông quê."},{"f":"V1","p":"Đọc đoạn: 'Cậu học trò nghèo học dưới ánh đèn dầu mỗi đêm. Dù nhà khó khăn, cậu vẫn không bỏ buổi học nào.' Cậu học trò có đức tính đáng quý nào?","a":"Ham học, vượt khó","w":["Giàu có, sung sướng","Chỉ học khi có đèn sáng","Hay than vãn"],"e":"Học chăm trong hoàn cảnh khó khăn cho thấy cậu ham học, vượt khó."},{"f":"V1","p":"Đọc đoạn: 'Chim khách tha từng sợi rơm về làm tổ trên cành cao. Nó làm đi làm lại rất kiên nhẫn cho đến khi tổ vững chắc.' Chim khách trong đoạn là con vật thế nào?","a":"Kiên nhẫn, chăm chỉ","w":["Vội vàng, làm ẩu","Lười biếng, bỏ dở","Chỉ làm khi có bạn giúp"],"e":"Làm tổ đi làm lại đến khi vững cho thấy chim kiên nhẫn."}]});
  if (typeof window.__phaseBProcessGrade === "function") window.__phaseBProcessGrade(3);
  /* B1-SỬA (2026-10-15): thay tầng nâng cao của m3-so10000 / m3-so100000 /
     m3-giotien bằng bộ sinh nm/gt ở trên (số ngẫu nhiên mới mỗi câu, tiền
     tròn, khẳng định cùng phạm trù) và đo lại nhãn số câu cho khớp. */
  try { nmRebuild3(__nmGtLen); } catch (e) {}
  if (typeof window.__phaseCompleteGrade === "function") window.__phaseCompleteGrade(3);

/* ================= ĐỢT HÌNH TIỂU HỌC (v22) — Lớp 3 =================
   Gắn hình theo dữ kiện (figTagFacts của vỏ): hình là dữ kiện/ngữ cảnh của
   chính câu đó; đáp án không nằm trong hình. */
(function () {
  function bp(e) { return '<div class="big-pic">' + e + "</div>"; }
  /* Hình phẳng mini cho m3-hinh: đoạn thẳng có trung điểm (vạch chia bằng
     nhau là dữ kiện), góc vuông, đa giác trơn không ghi số. */
  function segMidSVG() {
    return figOpen("0 0 240 92", "Đoạn thẳng và trung điểm") +
      '<line x1="30" y1="46" x2="210" y2="46" stroke="' + FIG_INK + '" stroke-width="3.4"/>' +
      '<line x1="66" y1="36" x2="78" y2="56" stroke="' + FIG_MEAS + '" stroke-width="2.6"/>' +
      '<line x1="162" y1="36" x2="174" y2="56" stroke="' + FIG_MEAS + '" stroke-width="2.6"/>' +
      '<circle cx="30" cy="46" r="5.5" fill="' + FIG_INK + '"/><circle cx="120" cy="46" r="6.5" fill="' + FIG_MEAS + '"/><circle cx="210" cy="46" r="5.5" fill="' + FIG_INK + '"/>' +
      figText(30, 26, "A", "middle", 15) + figText(120, 26, "M", "middle", 15, FIG_MEAS) + figText(210, 26, "B", "middle", 15) +
      figText(120, 80, "AM = MB", "middle", 13, FIG_MUT) + "</svg>";
  }
  function rightAngleSVG() {
    return figOpen("0 0 160 130", "Góc vuông") +
      '<line x1="34" y1="102" x2="140" y2="102" stroke="' + FIG_INK + '" stroke-width="3.6"/>' +
      '<line x1="34" y1="102" x2="34" y2="18" stroke="' + FIG_INK + '" stroke-width="3.6"/>' +
      '<path d="M34,76 L60,76 L60,102" fill="none" stroke="' + FIG_MEAS + '" stroke-width="3"/>' +
      '<circle cx="34" cy="102" r="5" fill="' + FIG_INK + '"/>' + "</svg>";
  }
  function polySVG(kind) {
    var inner;
    if (kind === "tamgiac") inner = '<polygon points="80,16 138,100 22,100" fill="' + FIG_FILL + '" stroke="' + FIG_ACC + '" stroke-width="3.2" stroke-linejoin="round"/>';
    else if (kind === "tugiac") inner = '<polygon points="38,30 128,18 142,96 24,104" fill="' + FIG_FILL + '" stroke="' + FIG_ACC + '" stroke-width="3.2" stroke-linejoin="round"/>';
    else inner = '<rect x="26" y="26" width="108" height="70" fill="' + FIG_FILL + '" stroke="' + FIG_ACC + '" stroke-width="3.2"/>';
    return figOpen("0 0 160 122", "Hình phẳng") + inner + "</svg>";
  }
  function therm(v) { return function () { return figK5ThermSVG(v, 0, 100, 10); }; }
  function cyl(v) { return function () { return figK5CylSVG(v, 1000, 100); }; }
  function ruler(cm) { return function () { return figK5RulerSVG(cm); }; }
  figTagFacts(3, "m3-hinh", { 0: segMidSVG, 1: rightAngleSVG, 2: function () { return polySVG("tamgiac"); }, 3: function () { return polySVG("tugiac"); }, 4: function () { return polySVG("chunhat"); }, 5: function () { return shapeSVG("vuong", "#4dabf7"); }, 6: bp("🧊"), 7: bp("📦"), 8: function () { return figCircleSVG(5, "d"); }, 9: function () { return figCircleSVG(5, "r"); } });
  /* Sửa kín đáp án (soi mắt 2026-10-20): bốn dữ kiện nhiệt độ là câu HỎI
     THUỘC (đơn vị đo / điểm tan chảy / điểm sôi / thân nhiệt) — nhiệt kế vẽ
     sẵn mức 0/100/37 và nhãn "°C" sẽ đọc ra đáp án, nên thay bằng tranh chủ
     đề 🌡️ trung tính. Ống đong ở [10] in đơn vị ml (đáp án) → thay 🥄. */
  figTagFacts(3, "m3-donvi", { 0: ruler(1), 1: bp("📏"), 2: bp("⚖️"), 3: cyl(500), 4: bp("🌡️"), 5: bp("🌡️"), 6: bp("🌡️"), 7: ruler(1), 8: bp("⚖️"), 9: bp("🌡️"), 10: bp("🥄") });
  figTagFacts(3, "tv3-tungu", { 0: bp("🐝"), 1: bp("🐘"), 2: bp("🦁"), 3: bp("↕️"), 4: bp("🌡️"), 5: bp("💡"), 6: bp("🏠"), 7: bp("🌈"), 8: bp("🇻🇳"), 9: bp("🌍") });
  figTagFacts(3, "tnxh3-giadinh", { 0: bp("👴"), 1: bp("👵"), 2: bp("👨‍👩‍👧"), 3: bp("🔥"), 4: bp("📞"), 5: bp("🔥"), 6: bp("🧹"), 7: bp("💧") });
  figTagFacts(3, "tnxh3-truonghoc", { 0: bp("🏫"), 1: bp("🏫"), 2: bp("🧹"), 3: bp("🤝"), 4: bp("🤝"), 5: bp("🚶") });
  figTagFacts(3, "tnxh3-congdong", { 0: bp("🏘️"), 1: bp("🏘️"), 2: bp("🏘️"), 3: bp("🏛️"), 4: bp("🏛️"), 5: bp("🏞️") });
  figTagFacts(3, "tnxh3-thucvat", { 0: bp("🌱"), 1: bp("🌳"), 2: bp("🍃"), 3: bp("🌸"), 4: bp("💧"), 5: bp("🐟"), 6: bp("🐦"), 7: bp("♻️") });
  figTagFacts(3, "tnxh3-suckhoe", { 0: bp("🍽️"), 1: bp("🍽️"), 2: bp("🩺"), 3: bp("🩸"), 4: bp("🧠"), 5: bp("🍽️"), 6: bp("🏃"), 7: bp("😴") });
  figTagFacts(3, "tnxh3-traidat", { 0: bp("🌅"), 1: bp("🌇"), 2: bp("🗺️"), 3: bp("🧭"), 4: bp("☀️"), 5: bp("🧊"), 6: bp("🗺️"), 7: bp("🌍"), 8: bp("🗺️"), 9: bp("🌗"), 10: bp("🌙"), 11: bp("🌍") });
  figTagFacts(3, "tin3-may", { 0: bp("💡"), 1: bp("🌦️"), 2: bp("💻"), 3: bp("💻"), 4: bp("💻"), 5: bp("🧠"), 6: bp("⌨️"), 7: bp("⌨️"), 8: bp("🪑") });
  figTagFacts(3, "tin3-trinhchieu", { 0: bp("🎞️"), 1: bp("🎞️"), 2: bp("🖱️"), 3: bp("🖱️"), 4: bp("🖱️"), 5: bp("🖱️") });
})();
