/* ================================================================
   GAME HỌC TẬP — FILE DỮ LIỆU RIÊNG LỚP 2 (assets/data/lop2.js)
   Dữ liệu Lớp 2 (gốc: nửa đầu block khung của master) + phần bổ sung Lớp 2 trong các block 6–9.
   Tách nguyên văn từ bản master đã kiểm chứng (MD5 5f54145de040cb8cefc9eeb7cb915cd5);
   trang vỏ nạp động file này khi người chơi chọn Lớp 2.
   ================================================================ */
    /* ================= TOÁN 2 — bộ sinh ================= */
    function g2PreSucc(){
      var n = rand(12, 98), before = Math.random()<0.5;
      var ans = before? n-1 : n+1;
      var q = calcMCQ(before? "Số liền trước của "+n+" là số nào?" : "Số liền sau của "+n+" là số nào?", n, ans, 0, 100, (before?"Số liền trước nhỏ hơn 1 đơn vị: ":"Số liền sau lớn hơn 1 đơn vị: ")+n+(before?" − 1 = ":" + 1 = ")+ans);
      /* Tia số chỉ khoanh và ghi số n đã cho trong đề; hai số kề bên để
         trống — số liền trước/sau cần tìm không ghi trong hình. */
      if (Math.random() < 0.8) { var lab = {}; lab[n] = String(n); q.figure = figNumLineSVG(n-2, n+2, { labels: lab, hl: [n] }); }
      return q;
    }
    function g2TiaSo(){
      var start = rand(0, 96); var seq=[start,start+1,start+2,start+3]; var miss = pick([1,2]); var ans = seq[miss];
      var opts = numOptions(ans, 0, 100, 3);
      /* Đợt hình Tiểu học (v22): tia số SVG thật thay hàng số chữ — các số
         đã cho là dữ kiện, ô thiếu hiện "?" (đúng điều đề hỏi). */
      var lab = {}; seq.forEach(function(x,i){ lab[x] = i===miss? "?" : String(x); });
      return { kind:"blank", badge:"✏️ Điền vào chỗ trống", prompt:"Điền số còn thiếu trên tia số!", visual:"", figure: figNumLineSVG(start, start+3, { labels: lab }), blankText:String(ans), options: opts.map(function(o){return {html:'<span class="opt-num">'+o+"</span>"};}), answer: opts.indexOf(ans), cols:3 };
    }
    function g2ThanhPhan(){
      var a = rand(11,60), b = rand(11,30); var sum=a+b;
      if (Math.random()<0.5) return mcqQ("Trong phép cộng "+a+" + "+b+" = "+sum+", số "+a+" gọi là gì?", ["Hiệu","Số trừ"], "Số hạng", "Cả hai số "+a+" và "+b+" đều là số hạng, "+sum+" là tổng.");
      return mcqQ("Trong phép trừ "+sum+" − "+b+" = "+a+", số "+sum+" gọi là gì?", ["Số trừ","Hiệu"], "Số bị trừ", "Số bị trừ − Số trừ = Hiệu.");
    }
    function g2HonKem(){
      /* B1-sửa lớp nhỏ (2026-10-15): giữ cả hai số trong phạm vi 100 của
         chủ đề (bản cũ a+d có thể tới 115 — "111 hơn 89" lọt vào m2-so100). */
      var a = rand(15,85), d = rand(3,15); var b = a+d;
      var q = calcMCQ(b+" hơn "+a+" bao nhiêu đơn vị?", b+" − "+a, d, 0, 40, "Muốn biết hơn nhau bao nhiêu, lấy số lớn trừ số bé: "+b+" − "+a+" = "+d+".");
      /* Tia số ghi hai số đã cho và ngoặc khoảng giữa chúng (dữ kiện);
         độ dài khoảng (đáp án) không ghi số. Chỉ vẽ khi khoảng đủ hẹp. */
      if (d <= 10 && Math.random() < 0.7) { var lab = {}; lab[a] = String(a); lab[b] = String(b); q.figure = figNumLineSVG(a-1, b+1, { labels: lab, bracket: [a, b] }); }
      return q;
    }
    function g2Qua10(add){
      return function(){
        var a,b,ans;
        if (add){ a = rand(6,9); b = rand(4,9); while(a+b<=10) b=rand(4,9); ans=a+b; }
        else { a = rand(11,18); b = rand(4,9); while(a-b>=10) b=rand(4,9); ans=a-b; }
        return calcMCQ(add?"Tính nhẩm (cộng qua 10)":"Tính nhẩm (trừ qua 10)", a+(add?" + ":" − ")+b+" = ?", ans, 0, 20, add? ("Tách để gộp cho đủ chục: "+a+" + "+(10-a)+" = 10, còn lại cộng tiếp được "+ans+".") : ("Trừ qua 10: tách số trừ để trừ đến 10 rồi trừ tiếp, được "+ans+"."));
      };
    }
    function g2CoNho(add){
      return function(){
        var a,b,ans,guard=0;
        if (add){ do{ a=rand(15,89); b=rand(6,9);}while(guard++<200 && (a%10)+b<10); if (Math.random()<0.5){ do{ a=rand(15,79); b=rand(15,69);}while(guard++<400 && ((a%10)+(b%10)<10 || a+b>=100)); } ans=a+b; }
        else { do{ a=rand(25,99); b=rand(6,9);}while(guard++<200 && (a%10)>=b); if (Math.random()<0.5){ do{ a=rand(35,99); b=rand(15,a-10);}while(guard++<400 && ((a%10)>=(b%10))); } ans=a-b; }
        return calcMCQ(add?"Phép cộng có nhớ trong phạm vi 100":"Phép trừ có nhớ trong phạm vi 100", a+(add?" + ":" − ")+b+" = ?", ans, 0, 120, "Đặt tính rồi tính từ phải sang trái, nhớ sang hàng bên trái khi cần. Kết quả: "+ans+".");
      };
    }
    function g2NhanChia(mul){
      return function(){
        var table = pick([2,5]); var k = rand(2,9), q;
        /* Đợt hình Tiểu học (v22): mảng chấm / đĩa chia đều là mô hình trực
           quan của phép nhân, chia (dữ kiện); tích, thương không in. */
        if (mul) { q = calcMCQ("Bảng nhân "+table, table+" × "+k+" = ?", table*k, 0, 50, table+" × "+k+" = "+(table*k)+"."); if (Math.random() < 0.88) q.figure = figArraySVG(table, k); return q; }
        var prod = table*k; q = calcMCQ("Bảng chia "+table, prod+" : "+table+" = ?", k, 0, 10, "Vì "+table+" × "+k+" = "+prod+" nên "+prod+" : "+table+" = "+k+"."); if (Math.random() < 0.88) q.figure = figDivGroupsSVG(prod, table); return q;
      };
    }
    function g2So1000Read(){
      var n = rand(101, 999); var hun = Math.floor(n/100), ten = Math.floor(n/10)%10, one = n%10;
      var opts = shuffle([n, hun*100+one*10+ten, ten*100+hun*10+one, n+10]);
      opts = opts.filter(function(x,i){return opts.indexOf(x)===i;});
      while(opts.length<4){ var d=rand(101,999); if(opts.indexOf(d)===-1) opts.push(d); }
      var q = { prompt:"Số gồm "+hun+" trăm, "+ten+" chục và "+one+" đơn vị là số nào?", visual:'<div class="expr">'+hun+" trăm "+ten+" chục "+one+" đơn vị</div>", options: opts.map(function(o){return {html:'<span class="opt-num">'+o+"</span>"};}), answer: opts.indexOf(n), cols:4, explain: hun+" trăm = "+(hun*100)+", "+ten+" chục = "+(ten*10)+", cộng thêm "+one+" đơn vị được "+n+"." };
      /* Khối trăm–chục–đơn vị là cách viết đã cho trong đề dựng thành hình
         (dữ kiện); số viết bằng chữ số không in trong hình. */
      if (Math.random() < 0.88) q.figure = figNumBlocksSVG(n);
      return q;
    }
    function g2TongTram(){
      var hun = rand(1,9), ten = rand(1,9), one = rand(1,9); var n = hun*100+ten*10+one;
      var q = mcqQ("Viết số "+n+" thành tổng các trăm, chục, đơn vị:", [hun*100+" + "+one+" + "+ten, ten*100+" + "+hun*10+" + "+one], hun*100+" + "+(ten*10)+" + "+one, n+" = "+(hun*100)+" + "+(ten*10)+" + "+one+".");
      if (Math.random() < 0.75) q.figure = figNumBlocksSVG(n);
      return q;
    }
    function g2SoSanh1000(){
      var a = rand(120, 980), b = rand(120, 980); while(b===a) b=rand(120,980);
      var bigger = Math.random()<0.5; var opts = shuffle([a,b]);
      return { prompt: bigger?"Số nào LỚN hơn?":"Số nào BÉ hơn?", visual:'<div class="expr">'+a+" &nbsp;? &nbsp; "+b+"</div>", options: opts.map(function(o){return {html:'<span class="opt-num">'+o+"</span>"};}), answer: opts.indexOf(bigger?Math.max(a,b):Math.min(a,b)), cols:2, explain:"So sánh từ hàng trăm trước, rồi đến hàng chục, hàng đơn vị." };
    }
    function g21000(add){
      return function(){
        var a = rand(120, 850), b = rand(110, 800);
        if (add){ while(a+b>1000){ a=rand(120,700); b=rand(110,280);} }
        else { while(b>=a){ a=rand(300,950); b=rand(110,280);} }
        var ans = add? a+b : a-b;
        return calcMCQ(add?"Cộng trong phạm vi 1000":"Trừ trong phạm vi 1000", a+(add?" + ":" − ")+b+" = ?", ans, 0, 1000, "Tính lần lượt từ hàng đơn vị sang trái. Kết quả: "+ans+".");
      };
    }
    function g2ClockMin(){
      var h = rand(1,12), m = pick([0,5,10,15,20,30,40,45,50]);
      var opts = shuffle([""+h+" giờ "+(m===0?"đúng":m+" phút"), ""+h+" giờ "+((m+10)%60)+" phút", ""+((h%12)+1)+" giờ "+m+" phút", ""+h+" giờ "+((m+30)%60)+" phút"]);
      return { prompt:"Đồng hồ chỉ mấy giờ mấy phút?", visual: clockSVG2(h,m), options: opts.map(function(o){return {html:'<span class="opt-text">'+o+"</span>"};}), answer: opts.indexOf(""+h+" giờ "+(m===0?"đúng":m+" phút")), cols:2, optStack:true, explain:"Kim ngắn chỉ giờ ("+h+"), kim dài chỉ phút. Mỗi vạch nhỏ là 5 phút: kim dài ở số "+(m/5===0?12:m/5)+" là "+m+" phút." };
    }
    var MATH2_TOPICS = [
      { id:"m2-so100", emoji:"🔢", name:"Số đến 100, tia số", sub:"Bài 1–6 • Số liền trước, liền sau, hơn kém nhau", pools:{ choose:[g2PreSucc, g2ThanhPhan, g2HonKem, function(){return qCompareNums(100);}], blank:[g2TiaSo, qBlankSeqFactory(99)], match:[mNumReadFactory(99)], games:[gMemNumReadFactory(99), gSortNumsFactory(99), gTFCalcFactory(100)] } },
      { id:"m2-20", emoji:"➕", name:"Cộng trừ phạm vi 20", sub:"Bài 7–14 • Cộng, trừ qua 10, bảng cộng trừ", pools:{ choose:[g2Qua10(true), g2Qua10(false)], blank:[qBlankCalcFactory(10)], match:[mCalcResultFactory(10)], games:[gMemCalcFactory(10), gTFCalcFactory(10), gCatchAnswerFactory(10)] } },
      { id:"m2-kg-lit", emoji:"⚖️", name:"Ki-lô-gam và Lít", sub:"Bài 15–18 • Khối lượng và dung tích", pools: knowledgePools([
          ["1 ki-lô-gam bằng bao nhiêu?", "1000 gam (1 kg)", "100 gam", "10 gam", "1 kg = 1000 g."],
          ["Đơn vị đo khối lượng trong bài là gì?", "Ki-lô-gam (kg)", "Lít (l)", "Mét (m)", "Khối lượng đo bằng ki-lô-gam, viết tắt là kg."],
          ["Đơn vị đo dung tích (sức chứa) là gì?", "Lít (l)", "Ki-lô-gam (kg)", "Đề-xi-mét (dm)", "Dung tích đo bằng lít, viết tắt là l."],
          ["Một can đựng 5 l nước, rót thêm 3 l. Can có bao nhiêu lít nước?", "8 l", "2 l", "15 l", "5 + 3 = 8 (l)."],
          ["Bao gạo nặng 10 kg, đã dùng 4 kg. Còn lại bao nhiêu ki-lô-gam?", "6 kg", "14 kg", "40 kg", "10 − 4 = 6 (kg)."],
          ["Vật nào thường được cân bằng ki-lô-gam?", "Bao gạo", "Chai nước", "Sợi dây", "Bao gạo nặng nên cân bằng kg; chai nước đo dung tích bằng lít."],
          ["2 kg + 5 kg = ?", "7 kg", "3 kg", "25 kg", "2 + 5 = 7 (kg)."],
          ["Chai nước 1 l rót vào cốc, còn lại nửa chai. Lượng nước đã rót khoảng bao nhiêu?", "Khoảng nửa lít", "Khoảng 2 lít", "Khoảng 5 lít", "Nửa của 1 lít là khoảng nửa lít."],
          ["Quả cân 2 kg thăng bằng với túi đường. Túi đường nặng bao nhiêu?", "2 kg", "1 kg", "4 kg", "Cân thăng bằng thì hai bên bằng nhau: 2 kg."],
          ["12 l − 7 l = ?", "5 l", "19 l", "7 l", "12 − 7 = 5 (l)."]
        ], [["1 kg","1000 g"],["Ki-lô-gam","Đo khối lượng"],["Lít","Đo dung tích"],["Cân đĩa","Đo khối lượng"]], "Nối cho đúng nhé!") },
      { id:"m2-nho100", emoji:"🧮", name:"Cộng trừ có nhớ phạm vi 100", sub:"Bài 19–24 • Cộng, trừ có nhớ", pools:{ choose:[g2CoNho(true), g2CoNho(false)], blank:[qBlankCalcFactory(100)], match:[mCalcResultFactory(100)], games:[gMemCalcFactory(100), gTFCalcFactory(100), gCatchAnswerFactory(100)] } },
      { id:"m2-hinh", emoji:"📐", name:"Hình phẳng", sub:"Bài 25–28 • Điểm, đoạn thẳng, đường gấp khúc, tứ giác", pools: knowledgePools([
          ["Đoạn thẳng được giới hạn bởi mấy điểm?", "2 điểm", "1 điểm", "Không có điểm nào", "Đoạn thẳng có hai đầu mút là hai điểm."],
          ["Hình tứ giác có bao nhiêu cạnh?", "4 cạnh", "3 cạnh", "5 cạnh", "Tứ giác có 4 cạnh và 4 góc."],
          ["Đường gấp khúc gồm những gì nối với nhau?", "Nhiều đoạn thẳng", "Nhiều đường tròn", "Nhiều điểm rời nhau", "Đường gấp khúc gồm các đoạn thẳng nối tiếp nhau."],
          ["Ba điểm thẳng hàng là ba điểm như thế nào?", "Cùng nằm trên một đường thẳng", "Tạo thành hình tam giác", "Cùng nằm trên một vòng tròn", "Ba điểm thẳng hàng cùng thuộc một đường thẳng."],
          ["Hình nào dưới đây là hình tứ giác?", "Hình chữ nhật", "Hình tròn", "Đoạn thẳng", "Hình chữ nhật có 4 cạnh nên là tứ giác."],
          ["Điểm thường được kí hiệu bằng gì?", "Chữ cái in hoa (A, B, C...)", "Chữ số", "Dấu chấm than", "Điểm được đặt tên bằng chữ cái in hoa."],
          ["Đường thẳng khác đoạn thẳng ở điểm nào?", "Kéo dài mãi về hai phía", "Có hai đầu mút", "Ngắn hơn", "Đường thẳng không bị giới hạn hai đầu; đoạn thẳng có hai đầu mút."],
          ["Một đường gấp khúc có 3 đoạn thẳng dài 2 cm, 3 cm, 4 cm. Độ dài đường gấp khúc là?", "9 cm", "7 cm", "24 cm", "2 + 3 + 4 = 9 (cm)."],
          ["Hình vuông có mấy cạnh bằng nhau?", "4 cạnh bằng nhau", "2 cạnh bằng nhau", "Không cạnh nào bằng nhau", "Hình vuông có 4 cạnh bằng nhau."],
          ["Để vẽ một đoạn thẳng, em cần tối thiểu mấy điểm?", "2 điểm", "1 điểm", "4 điểm", "Nối hai điểm ta được một đoạn thẳng."]
        ], [["Đoạn thẳng","Có 2 đầu mút"],["Hình tứ giác","4 cạnh"],["Đường gấp khúc","Nhiều đoạn thẳng nối nhau"],["Điểm","Kí hiệu chữ in hoa"]], "Nối khái niệm với ý đúng nhé!") },
      { id:"m2-gio", emoji:"🕐", name:"Ngày – giờ, giờ – phút", sub:"Bài 29–32 • Xem đồng hồ, ngày – tháng", pools:{ choose:[g2ClockMin, qClock, qWeek], blank:[qBlankClock], match:[mClockHour], games:[gSortDays, gMemClock, gTFClock] } },
      { id:"m2-nhanchia", emoji:"✖️", name:"Nhân, chia — bảng 2 và 5", sub:"Bài 37–45 • Phép nhân, phép chia", pools:{ choose:[g2NhanChia(true), g2NhanChia(false), function(){ return mcqQ("Trong phép nhân 2 × 4 = 8, số 8 gọi là gì?", ["Thừa số","Thương"], "Tích", "Các số nhân với nhau là thừa số, kết quả là tích."); }, function(){ return mcqQ("Trong phép chia 10 : 2 = 5, số 5 gọi là gì?", ["Tích","Số chia"], "Thương", "Số bị chia : Số chia = Thương."); }], blank:[function(){ var t=pick([2,5]),k=rand(2,9); return numBlankQ("Điền số còn thiếu vào chỗ trống!", '<div class="expr">'+t+" × "+blankSlot()+" = "+(t*k)+"</div>", k, 0, 10); }], match:[function(){ var t=pick([2,5]); var ks=shuffle([2,3,4,6]).slice(0,4); return matchQ("Nối phép nhân với tích đúng nhé!", ks.map(function(k){ return { l:'<span class="match-expr">'+t+" × "+k+"</span>", r:'<span class="opt-num">'+(t*k)+"</span>" }; })); }], games:[gMemCalcFactory(50), gTFCalcFactory(50), gCatchAnswerFactory(50)] } },
      { id:"m2-khoi", emoji:"🧊", name:"Khối trụ, khối cầu", sub:"Bài 46–47 • Làm quen hình khối", pools: knowledgePools([
          ["Vật nào có dạng khối cầu?", "Quả bóng", "Hộp sữa", "Lon nước", "Quả bóng tròn đều mọi phía — khối cầu."],
          ["Vật nào có dạng khối trụ?", "Lon nước", "Quả cam", "Hộp quà vuông", "Lon nước có hai mặt đáy là hình tròn — khối trụ."],
          ["Khối trụ có mấy mặt đáy là hình tròn?", "2 mặt đáy", "1 mặt đáy", "Không có mặt đáy tròn", "Khối trụ có 2 mặt đáy hình tròn bằng nhau."],
          ["Khối cầu có mặt nào phẳng không?", "Không, khối cầu chỉ có mặt cong", "Có 2 mặt phẳng", "Có 1 mặt phẳng", "Khối cầu lăn được mọi hướng và chỉ có mặt cong."],
          ["Vật nào sau đây KHÔNG phải khối trụ?", "Quả bóng bàn", "Cái cốc không quai", "Thân cây cột điện", "Quả bóng bàn là khối cầu."],
          ["Hộp sữa hình hộp chữ nhật khác khối trụ ở điểm nào?", "Hộp có các mặt phẳng hình chữ nhật", "Hộp lăn được như bóng", "Hộp không có mặt nào", "Hình hộp chữ nhật có 6 mặt là hình chữ nhật."],
          ["Khối nào lăn được về mọi phía?", "Khối cầu", "Khối trụ", "Khối hộp chữ nhật", "Chỉ khối cầu lăn được mọi phía."],
          ["Nắp chai, đồng xu xếp chồng lên nhau tạo thành hình gì gần đúng?", "Khối trụ", "Khối cầu", "Hình tam giác", "Các hình tròn bằng nhau chồng lên nhau tạo khối trụ."],
          ["Trái Đất có dạng gần với khối nào?", "Khối cầu", "Khối trụ", "Hình vuông", "Trái Đất dạng hình cầu."],
          ["Khối trụ đặt nằm ngang thì lăn theo hướng nào?", "Lăn sang hai bên", "Không lăn được", "Lăn mọi phía", "Khối trụ chỉ lăn sang hai bên theo mặt cong của nó."]
        ], [["Quả bóng","Khối cầu"],["Lon nước","Khối trụ"],["Hộp quà","Khối hộp chữ nhật"],["Trái Đất","Khối cầu"]], "Nối vật với khối của nó nhé!") },
      { id:"m2-1000", emoji:"💯", name:"Các số đến 1000", sub:"Bài 48–54 • Số có ba chữ số, so sánh", pools:{ choose:[g2So1000Read, g2TongTram, g2SoSanh1000], blank:[g2TiaSo], match:[mNumReadFactory(999)], games:[gSortNumsFactory(990), gMemNumReadFactory(999)] } },
      { id:"m2-dodai-tien", emoji:"📏", name:"Độ dài và tiền Việt Nam", sub:"Bài 55–58 • dm, m, km; tiền Việt Nam", pools: knowledgePools([
          ["1 mét bằng bao nhiêu đề-xi-mét?", "10 dm", "100 dm", "1000 dm", "1 m = 10 dm."],
          ["1 mét bằng bao nhiêu xăng-ti-mét?", "100 cm", "10 cm", "1000 cm", "1 m = 100 cm."],
          ["1 ki-lô-mét bằng bao nhiêu mét?", "1000 m", "100 m", "10 m", "1 km = 1000 m."],
          ["Đơn vị nào dùng đo quãng đường từ tỉnh này sang tỉnh khác?", "Ki-lô-mét (km)", "Xăng-ti-mét (cm)", "Đề-xi-mét (dm)", "Quãng đường dài đo bằng ki-lô-mét."],
          ["Tờ tiền nào có mệnh giá lớn nhất trong các tờ sau?", "5000 đồng", "1000 đồng", "2000 đồng", "5000 > 2000 > 1000."],
          ["Mua kẹo 2000 đồng, trả tờ 5000 đồng. Được trả lại bao nhiêu?", "3000 đồng", "2000 đồng", "7000 đồng", "5000 − 2000 = 3000 (đồng)."],
          ["2 tờ 1000 đồng và 1 tờ 2000 đồng có tất cả bao nhiêu tiền?", "4000 đồng", "3000 đồng", "5000 đồng", "1000 + 1000 + 2000 = 4000 (đồng)."],
          ["Chiều dài bàn học khoảng 1... Đơn vị hợp lí là?", "Mét (m)", "Ki-lô-mét (km)", "Gam (g)", "Bàn học dài khoảng 1 m."],
          ["5 dm bằng bao nhiêu xăng-ti-mét?", "50 cm", "5 cm", "500 cm", "1 dm = 10 cm nên 5 dm = 50 cm."],
          ["Hai tờ tiền 5000 đồng có tổng mệnh giá bao nhiêu?", "10 000 đồng", "5000 đồng", "1000 đồng", "5000 + 5000 = 10 000 (đồng)."]
        ], [["1 m","10 dm"],["1 km","1000 m"],["1 dm","10 cm"],["5000 đồng + 5000 đồng","10 000 đồng"]], "Nối cho đúng nhé!") },
      { id:"m2-1000calc", emoji:"🧮", name:"Cộng trừ phạm vi 1000", sub:"Bài 59–63 • Cộng, trừ trong phạm vi 1000", pools:{ choose:[g21000(true), g21000(false)], blank:[qBlankCalcFactory(999)], match:[mCalcResultFactory(999)], games:[gMemCalcFactory(999), gTFCalcFactory(999)] } },
      { id:"m2-thongke", emoji:"📊", name:"Thống kê, biểu đồ tranh", sub:"Bài 64–67 • Biểu đồ tranh; chắc chắn / có thể / không thể", pools:{ choose:[function(){ var a=rand(2,6), b=rand(2,6); while(b===a) b=rand(2,6); var correct = a>b? "Táo nhiều hơn, hơn "+(a-b)+" quả" : "Chuối nhiều hơn, hơn "+(b-a)+" quả"; var opts = shuffle([correct, "Hai loại bằng nhau", a>b? "Chuối nhiều hơn, hơn "+(a-b)+" quả" : "Táo nhiều hơn, hơn "+(b-a)+" quả"]); return { prompt:"Đếm biểu đồ tranh: loại quả nào nhiều hơn và nhiều hơn bao nhiêu quả?", visual:'<div class="chart-box">Táo: '+emojiRow("🍎",a)+"<br>Chuối: "+emojiRow("🍌",b)+"</div>", options: opts.map(function(o){return {html:'<span class="opt-text">'+o+"</span>"};}), answer: opts.indexOf(correct), cols:3, optStack:true, explain:"Đếm từng hàng: táo có "+a+" quả, chuối có "+b+" quả." }; }, function(){ return mcqQ("Túi chỉ có bi đỏ. Lấy ngẫu nhiên 1 viên bi. Viên bi lấy ra có màu gì?", ["Chắc chắn là màu xanh","Không thể là màu đỏ"], "Chắc chắn là màu đỏ", "Túi chỉ có bi đỏ nên chắc chắn lấy được bi đỏ."); }, function(){ return mcqQ("Ngày mai trời có mưa hay không, khi chưa xem dự báo, ta nói thế nào?", ["Chắc chắn có mưa","Không thể có mưa"], "Có thể có mưa, có thể không", "Chưa chắc chắn nên dùng từ “có thể”."); }, function(){ return mcqQ("Sự việc nào là KHÔNG THỂ xảy ra?", ["Mặt trời mọc vào ban đêm","Ngày mai là thứ Ba","Em được điểm 10"], "Mặt trời mọc vào ban ngày, không thể mọc vào ban đêm."); }], blank:[], match:[], games:[gSortNumsFactory(20)] } }
    ];
    /* ================= TIẾNG VIỆT 2 ================= */
    var TV2_TOPICS = [
      { id:"tv2-chinhta", emoji:"✏️", name:"Chính tả phân biệt", sub:"c/k • g/gh • ng/ngh • s/x • ch/tr • l/n • dấu hỏi/ngã", pools: knowledgePools([
          ["Từ nào viết đúng?", "kính", "cính", "qính", "Trước i, e, ê ta viết k (kính, kể, kê)."],
          ["Điền vào chỗ trống: “…à” (con vật nuôi lấy trứng)?", "gà", "ghà", "kà", "Con gà — viết g trước a. gh chỉ viết trước i, e, ê."],
          ["Từ nào viết đúng?", "nghỉ ngơi", "ngỉ ngơi", "nghĩ ngơi (sai nghĩa)", "“Nghỉ” viết ngh trước i."],
          ["Điền: “hoa …en” (hoa nở trên đầm)?", "sen", "xen", "shen", "Hoa sen viết s."],
          ["Từ nào viết đúng chính tả?", "trường học", "chường học", "truờng học", "“Trường” viết tr."],
          ["Điền: “…ọ” (con vật kêu meo meo)?", "mèo", "meò", "mẽo", "Con mèo — dấu huyền."],
          ["Từ nào có dấu hỏi?", "học sinh chăm chỉ học bài — từ “chỉ”", "bàn ghế", "sách vở mới", "“Chỉ” mang dấu hỏi."],
          ["Điền: “cái …ổi” (dụng cụ quét nhà)?", "chổi", "trổi", "chỗi", "Cái chổi viết ch."],
          ["Từ nào viết đúng?", "lớp học", "nớp học", "lớp hoc", "“Lớp” viết l ở đầu."],
          ["Điền: “…ưa” (thời gian giữa ngày)?", "trưa", "chưa (nghĩa khác)", "trua", "Buổi trưa viết tr."]
        ], [["kính","viết k trước i"],["gà","viết g trước a"],["hoa sen","viết s"],["trường học","viết tr"]], "Nối từ với quy tắc đúng nhé!") },
      { id:"tv2-tungu", emoji:"📚", name:"Từ ngữ theo chủ đề", sub:"Gia đình • Trường học • Tuổi thơ • Quê hương", pools: knowledgePools([
          ["Từ nào chỉ người trong gia đình?", "bà ngoại", "bàn học", "sân trường", "Bà ngoại là người thân trong gia đình."],
          ["Từ nào là hoạt động học tập?", "đọc sách", "leo núi", "bơi lội", "Đọc sách là hoạt động học tập."],
          ["“Thời khoá biểu” dùng để làm gì?", "Biết lịch học từng ngày", "Trang trí lớp học", "Đựng sách vở", "Thời khoá biểu cho biết các môn học theo ngày, tiết."],
          ["Từ nào chỉ đồ vật ở trường?", "cái trống trường", "luỹ tre", "hạt thóc", "Cái trống trường là đồ vật ở trường (bài “Cái trống trường em”)."],
          ["Bài đọc “Bóp nát quả cam” kể về ai?", "Trần Quốc Toản", "Mai An Tiêm", "Sơn Tinh", "Trần Quốc Toản là thiếu niên anh hùng thời Trần, nổi tiếng với câu chuyện bóp nát quả cam vì căm giận giặc."],
          ["Sự tích dưa hấu gắn với nhân vật nào trong sách?", "Mai An Tiêm", "Trần Quốc Toản", "Thánh Gióng", "Mai An Tiêm là nhân vật trong bài đọc về sự tích quả dưa hấu."],
          ["Từ nào chỉ cảnh đẹp thiên nhiên?", "luỹ tre xanh", "bảng đen", "ghế nhựa", "Luỹ tre là cảnh vật làng quê (bài “Luỹ tre”)."],
          ["“Hồ Gươm” ở đâu?", "Thủ đô Hà Nội", "Thành phố Huế", "Đà Nẵng", "Hồ Gươm (Hồ Hoàn Kiếm) ở trung tâm Hà Nội."],
          ["Từ nào chỉ hoạt động vui chơi tuổi thơ?", "thả diều", "cày ruộng", "đan len", "Thả diều là trò chơi tuổi thơ (bài “Thả diều”)."],
          ["Bài “Chuyện bốn mùa” có những mùa nào?", "Xuân, hạ, thu, đông", "Chỉ mùa xuân và mùa hạ", "Mùa mưa và mùa khô", "Bốn mùa trong năm: xuân, hạ, thu, đông."]
        ], [["bà ngoại","Gia đình"],["cái trống trường","Trường học"],["thả diều","Tuổi thơ"],["Hồ Gươm","Quê hương"]], "Nối từ với chủ đề nhé!") },
      { id:"tv2-daucau", emoji:"❓", name:"Dấu câu và viết hoa", sub:"Dấu . ? ! , • Viết hoa tên riêng", pools: knowledgePools([
          ["Câu hỏi kết thúc bằng dấu gì?", "Dấu chấm hỏi (?)", "Dấu chấm (.)", "Dấu phẩy (,)", "Câu dùng để hỏi kết thúc bằng dấu chấm hỏi."],
          ["Câu nào dùng dấu chấm than đúng?", "Ôi, đẹp quá!", "Ôi, đẹp quá.", "Ôi, đẹp quá,", "Dấu chấm than dùng cuối câu bộc lộ cảm xúc."],
          ["Tên riêng nào viết hoa đúng?", "Hà Nội", "hà Nội", "hà nội", "Tên riêng địa lí viết hoa cả hai chữ đầu: Hà Nội."],
          ["Câu kể thường kết thúc bằng dấu gì?", "Dấu chấm (.)", "Dấu chấm hỏi (?)", "Dấu chấm than (!)", "Câu kể kết thúc bằng dấu chấm."],
          ["Dấu phẩy dùng để làm gì?", "Ngăn cách các từ, ý trong câu", "Kết thúc câu hỏi", "Viết hoa tên riêng", "Dấu phẩy ngăn cách các bộ phận trong câu."],
          ["Tên người nào viết đúng?", "Nguyễn Văn A", "nguyễn Văn A", "Nguyễn văn a", "Họ và tên người viết hoa chữ cái đầu mỗi tiếng."],
          ["Đầu câu phải viết thế nào?", "Viết hoa chữ cái đầu câu", "Viết thường", "Viết số", "Chữ cái đầu câu luôn viết hoa."],
          ["Câu “Bạn tên là gì…” cần dấu gì ở cuối?", "Dấu chấm hỏi", "Dấu chấm", "Dấu phẩy", "Đây là câu hỏi nên kết thúc bằng dấu chấm hỏi."],
          ["Từ nào cần viết hoa vì là tên riêng?", "Trường Sa", "biển xanh", "con tàu", "Trường Sa là tên riêng địa danh nên viết hoa."],
          ["Sau dấu chấm, chữ tiếp theo viết thế nào?", "Viết hoa", "Viết thường", "Viết cách xa", "Hết câu, sang câu mới phải viết hoa chữ cái đầu."]
        ], [["Câu hỏi","Dấu ?"],["Câu kể","Dấu ."],["Cảm xúc","Dấu !"],["Ngăn cách","Dấu ,"]], "Nối loại câu với dấu câu nhé!") },
      { id:"tv2-sapxep", emoji:"🧩", name:"Sắp xếp thành câu", sub:"Sắp xếp từ thành câu • Sắp xếp câu", pools:{ choose:[
          function(){ return mcqQ("Sắp xếp thành câu đúng: “đi / em / học”", ["Em học đi chơi"], "Em đi học", "Câu đúng: Em đi học."); },
          function(){ return mcqQ("Sắp xếp thành câu đúng: “rất / chăm / bạn ấy / học”", ["Học chăm bạn ấy rất"], "Bạn ấy học rất chăm", "Câu đúng: Bạn ấy học rất chăm."); },
          function(){ return mcqQ("Câu nào là câu hoàn chỉnh?", ["Em yêu."], "Em yêu quê hương.", "“Em yêu quê hương” có đủ chủ ngữ và vị ngữ, là câu hoàn chỉnh."); },
          function(){ return mcqQ("Từ nào trả lời cho câu hỏi “Ai?” trong câu “Mẹ nấu cơm”?", ["nấu cơm"], "Mẹ", "“Mẹ” là bộ phận trả lời câu hỏi Ai."); },
          function(){ return mcqQ("Từ nào trả lời cho câu hỏi “Làm gì?” trong câu “Bé vẽ tranh”?", ["Bé"], "vẽ tranh", "“Vẽ tranh” trả lời câu hỏi Làm gì."); }
        ], blank:[], match:[], games:[
          function(){ return sortQ("Chạm các từ theo thứ tự để thành câu nhé!", ["Em","yêu","quê","hương"]); },
          function(){ return sortQ("Chạm các từ theo thứ tự để thành câu nhé!", ["Bạn","ấy","học","rất","chăm"]); },
          function(){ return sortQ("Sắp xếp các câu thành đoạn theo thứ tự hợp lí nhé!", ["Đầu tiên, em rửa tay.","Sau đó, em ăn cơm.","Cuối cùng, em đánh răng."]); }
        ] } }
    ];
    /* ================= TIẾNG ANH 2 — Global Success ================= */
    var UNITS2 = [
      { n:1, letter:"Pp", place:"At my birthday party", words:[["pasta","🍝","mì Ý"],["popcorn","🍿","bỏng ngô"],["pizza","🍕","bánh pizza"]], pattern:{q:"The popcorn is …?", a:"yummy", w:["yummy","sad","blue"]} },
      { n:2, letter:"Kk", place:"In the backyard", words:[["kite","🪁","cái diều"],["bike","🚲","xe đạp"],["kitten","🐱","mèo con"]], pattern:{q:"Is she flying a kite?", a:"Yes, she is.", w:["Yes, she is.","No, she is.","Yes, I am."]} },
      { n:3, letter:"Ss", place:"At the seaside", words:[["sail","⛵","thuyền buồm"],["sand","🏖️","cát"],["sea","🌊","biển"]], pattern:{q:"Let's look at the …!", a:"sea", w:["sea","sand","sail"]} },
      { n:4, letter:"Rr", place:"In the countryside", words:[["rainbow","🌈","cầu vồng"],["river","🏞️","con sông"],["road","🛣️","con đường"]], pattern:{q:"What can you see? — I can see a …", a:"rainbow", w:["rainbow","river","road"]} },
      { n:5, letter:"Qq", place:"In the classroom", words:[["question","❓","câu hỏi"],["square","⬜","hình vuông"],["quiz","📝","bài đố vui"]], pattern:{q:"What's he doing? — He's doing a …", a:"quiz", w:["quiz","question","square"]} },
      { n:6, letter:"Xx", place:"On the farm", words:[["box","📦","cái hộp"],["fox","🦊","con cáo"],["ox","🐂","con bò đực"]], pattern:{q:"Is there a fox?", a:"Yes, there is.", w:["Yes, there is.","No, it isn't.","Yes, I can."]} },
      { n:7, letter:"Jj", place:"In the kitchen", words:[["juice","🧃","nước ép"],["jelly","🍮","thạch"],["jam","🫙","mứt"]], pattern:{q:"Pass me the jam, please. — …", a:"Here you are.", w:["Here you are.","Thank you.","Goodbye."]} },
      { n:8, letter:"Vv", place:"In the village", words:[["village","🏘️","ngôi làng"],["van","🚐","xe van"],["volleyball","🏐","bóng chuyền"]], pattern:{q:"Can you draw a van?", a:"Yes, I can.", w:["Yes, I can.","No, I don't.","Yes, there is."]} },
      { n:9, letter:"Yy", place:"In the grocery store", words:[["yogurt","🥣","sữa chua"],["yams","🍠","khoai"],["yo-yos","🪀","đồ chơi yo-yo"]], pattern:{q:"What do you want? — I want some …", a:"yams", w:["yams","yogurt","yo-yos"]} },
      { n:10, letter:"Zz", place:"At the zoo", words:[["zoo","🦒","vườn thú"],["zebu","🐃","bò u"],["zebra","🦓","ngựa vằn"]], pattern:{q:"Do you like the zoo?", a:"Yes, I do.", w:["Yes, I do.","No, I can't.","Yes, she is."]} },
      { n:11, letter:"Ii", place:"In the playground", words:[["sliding","🛝","trượt cầu trượt"],["riding","🚴","đi xe đạp"],["driving","🚗","lái xe"]], pattern:{q:"What are they doing? — They're … cars.", a:"driving", w:["driving","sliding","riding"]} },
      { n:12, letter:"Aa", place:"At the café", words:[["grapes","🍇","nho"],["cake","🎂","bánh kem"],["table",SVG_DESK,"cái bàn"]], pattern:{q:"The cake is … the table.", a:"on", w:["on","in","under"], prep:true} },
      { n:13, letter:"Nn", place:"In the maths class", words:[["eleven","11","số 11"],["thirteen","13","số 13"],["fourteen","14","số 14"],["fifteen","15","số 15"]], pattern:{q:"What number is it? — It's …", a:"eleven", w:["eleven","thirteen","fifteen"]} },
      { n:14, letter:"Er", place:"At home", words:[["brother","👦","anh/em trai"],["sister","👧","chị/em gái"],["grandmother","👵","bà"]], pattern:{q:"How old is your brother? — He's …", a:"nineteen", w:["nineteen","fine","happy"]} },
      { n:15, letter:"Sh", place:"In the clothes shop", words:[["shirts","👕","áo sơ mi"],["shoes","👟","giày"],["shorts","🩳","quần đùi"]], pattern:{q:"Where are the shoes? — …", a:"Over there.", w:["Over there.","Yes, I can.","It's eleven."]} },
      { n:16, letter:"Tt", place:"At the campsite", words:[["tent","⛺","cái lều"],["teapot","🫖","ấm trà"],["blanket","🛏️","cái chăn"]], pattern:{q:"Is the blanket near the tent? — No, it isn't. It's … the tent.", a:"in", w:["in","on","near"], prep:true} }
    ];
    var ALL_WORDS2 = []; UNITS2.forEach(function(u){ u.words.forEach(function(w){ ALL_WORDS2.push(w); }); });
    function eng2Pools(u){
      var base = engPools(u.words);
      var pat = u.pattern;
      var patGen = function(){
        var all = shuffle(pat.w.slice());
        var q = { prompt: pat.q, visual: "", options: all.map(function(o){ return { html:'<span class="opt-text">'+o+"</span>" }; }), answer: all.indexOf(pat.a), cols: all.length, optStack:true };
        return q;
      };
      var yesNoGen = function(){
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
      };
      // engPools tf expects multiple rounds; our single-round tf still works via renderTF (needs rounds array)
      return { choose: base.choose.concat([patGen, patGen]), blank: base.blank, match: base.match, games: base.games };
    }
    /* ================= TNXH 2 + ĐẠO ĐỨC 2 ================= */
    var TNXH2_TOPICS = [
      topic("tn-giadinh","👨‍👩‍👧","Gia đình","Bài 1–5 • Thế hệ, nghề nghiệp, an toàn ở nhà",[
        ["Trong gia đình, ông bà thuộc thế hệ nào?", "Thế hệ lớn nhất (ông bà)", "Thế hệ con cháu", "Thế hệ cha mẹ", "Gia đình thường có nhiều thế hệ: ông bà lớn nhất, rồi cha mẹ, rồi con cháu."],
        ["Nghề nào thuộc nghề sản xuất?", "Nông dân trồng lúa", "Học sinh", "Em bé", "Nông dân làm ra lương thực nên thuộc nghề sản xuất."],
        ["Khi ở nhà một mình, người lạ gõ cửa xin vào, em nên làm gì?", "Không mở cửa, gọi điện cho bố mẹ", "Mở cửa mời vào", "Rủ bạn mở cửa cùng", "Không mở cửa cho người lạ khi ở nhà một mình để đảm bảo an toàn."],
        ["Vật nào có thể gây ngộ độc nếu em tự ý uống?", "Thuốc và hoá chất tẩy rửa", "Nước lọc", "Cơm", "Thuốc, hoá chất phải để xa tầm tay trẻ em và không tự ý dùng."],
        ["Việc nào giúp giữ nhà ở sạch sẽ?", "Quét nhà, cất đồ đúng chỗ", "Vứt rác ra sàn", "Để đồ đạc bừa bãi", "Giữ nhà sạch bằng cách dọn dẹp, cất đồ gọn gàng."],
        ["Ai trong gia đình thường đi làm để nuôi gia đình?", "Cha mẹ", "Em bé sơ sinh", "Không ai cả", "Cha mẹ là người lao động chính trong gia đình."],
        ["Khi dùng dao, kéo sắc nhọn, em cần làm gì?", "Cẩn thận và có người lớn hướng dẫn", "Chạy nhảy cầm dao", "Đưa cho em nhỏ chơi", "Vật sắc nhọn nguy hiểm, cần cẩn thận."],
        ["Thế hệ là gì?", "Các lớp người nối tiếp nhau trong gia đình", "Tên một nghề nghiệp", "Một loại đồ dùng", "Thế hệ là các lớp người: ông bà, cha mẹ, con cháu."],
        ["Em ngửi thấy mùi gas lạ trong bếp, em nên làm gì?", "Báo ngay cho người lớn, tránh bật lửa", "Tự bật bếp kiểm tra", "Mặc kệ", "Rò gas rất nguy hiểm, cần báo người lớn ngay."],
        ["Giữ sạch nhà ở giúp ích gì?", "Phòng tránh bệnh tật, nhà thoáng mát", "Không ích lợi gì", "Làm nhà bẩn hơn", "Nhà sạch giúp bảo vệ sức khoẻ."]
      ], [["Ông bà","Thế hệ lớn nhất"],["Cha mẹ","Thế hệ giữa"],["Con cháu","Thế hệ nhỏ nhất"],["Nông dân","Nghề sản xuất"]], "Nối cho đúng nhé!"),
      topic("tn-truong","🏫","Trường học","Bài 6–10 • Khai giảng, đọc sách, an toàn ở trường",[
        ["Ngày khai giảng là ngày gì?", "Ngày bắt đầu năm học mới", "Ngày nghỉ hè", "Ngày tổng kết", "Khai giảng mở đầu năm học mới, thường vào đầu tháng 9."],
        ["Ngày hội đọc sách ở trường nhằm mục đích gì?", "Khuyến khích em yêu thích đọc sách", "Thi chạy", "Trồng cây", "Ngày hội đọc sách giúp em ham đọc, mở rộng hiểu biết."],
        ["Hành động nào KHÔNG an toàn khi ở trường?", "Chạy nhảy trên cầu thang, leo lan can", "Đi nhẹ nhàng", "Xếp hàng ngay ngắn", "Leo lan can, chạy trên cầu thang dễ ngã, nguy hiểm."],
        ["Để giữ vệ sinh trường học, em nên làm gì?", "Bỏ rác đúng nơi quy định", "Vứt rác ra sân", "Vẽ bậy lên tường", "Bỏ rác đúng chỗ giúp trường sạch đẹp."],
        ["Khi thấy bạn bị ngã ở sân trường, em nên làm gì?", "Đỡ bạn dậy và báo thầy cô", "Cười và bỏ đi", "Mặc kệ", "Giúp bạn và báo thầy cô là việc làm đúng."],
        ["Thư viện trường là nơi để làm gì?", "Đọc và mượn sách", "Chơi trốn tìm", "Ăn quà", "Thư viện là nơi đọc, mượn sách."],
        ["Em nên làm gì khi tan học?", "Về nhà hoặc chờ người thân đón ở nơi quy định", "Đi theo người lạ", "Chơi ở cổng trường một mình", "Chỉ về với người thân, không đi theo người lạ."],
        ["Việc nào giúp lớp học sạch đẹp?", "Trực nhật, lau bảng, kê bàn ngay ngắn", "Khạc nhổ trong lớp", "Vứt giấy ra sàn", "Trực nhật giữ lớp sạch đẹp."],
        ["Khi chơi ở sân trường, em tránh điều gì?", "Xô đẩy, chen lấn bạn", "Chơi nhẹ nhàng", "Nhường bạn", "Xô đẩy dễ gây tai nạn."],
        ["Cờ Tổ quốc được treo trang trọng ở đâu trong ngày khai giảng?", "Trên sân trường / lễ đài", "Trong nhà vệ sinh", "Dưới đất", "Quốc kì được treo trang trọng trong các buổi lễ."]
      ], [["Khai giảng","Bắt đầu năm học"],["Thư viện","Đọc sách"],["Trực nhật","Giữ lớp sạch"],["Cầu thang","Đi nhẹ nhàng, an toàn"]], "Nối cho đúng nhé!"),
      topic("tn-congdong","🛒","Cộng đồng địa phương","Bài 11–15 • Mua bán hàng hoá, giao thông",[
        ["Hoạt động mua bán diễn ra phổ biến ở đâu?", "Chợ, cửa hàng, siêu thị", "Trên mái nhà", "Dưới lòng đất", "Mua bán diễn ra ở chợ, cửa hàng, siêu thị."],
        ["Khi mua hàng, người mua cần làm gì?", "Trả tiền cho người bán", "Lấy hàng rồi bỏ chạy", "Không cần trả tiền", "Mua hàng phải trả tiền theo giá."],
        ["Đèn tín hiệu giao thông màu đỏ có nghĩa là gì?", "Dừng lại", "Đi tiếp", "Đi nhanh hơn", "Đèn đỏ: dừng lại; đèn xanh: được đi; đèn vàng: đi chậm, chuẩn bị dừng."],
        ["Người đi bộ nên đi ở đâu?", "Trên vỉa hè, sang đường ở vạch kẻ", "Giữa lòng đường", "Nơi xe cộ đông đúc", "Đi bộ trên vỉa hè và sang đường đúng vạch kẻ an toàn hơn."],
        ["Khi tham gia giao thông bằng xe đạp, em nên đi phía nào?", "Đi bên phải, sát lề đường", "Đi bên trái ngược chiều", "Đi giữa đường", "Đi bên phải theo chiều xe chạy."],
        ["Hành động nào đúng khi qua đường?", "Quan sát hai bên, qua khi an toàn", "Chạy thật nhanh không nhìn", "Vừa đi vừa nghịch điện thoại", "Quan sát kĩ trước khi qua đường."],
        ["Người bán hàng ở chợ có vai trò gì?", "Cung cấp hàng hoá cho người mua", "Điều khiển giao thông", "Dạy học", "Người bán cung cấp hàng hoá, người mua trả tiền."],
        ["Biển báo giao thông giúp ích gì?", "Hướng dẫn mọi người đi lại an toàn", "Trang trí đường phố", "Không có tác dụng", "Biển báo hướng dẫn và cảnh báo để giao thông an toàn."],
        ["Khi ngồi trên xe máy, em bắt buộc đội gì?", "Mũ bảo hiểm", "Mũ vải thời trang", "Khăn trùm đầu", "Đội mũ bảo hiểm để bảo vệ đầu khi tham gia giao thông."],
        ["Giá tiền in trên nhãn hàng cho em biết điều gì?", "Số tiền cần trả khi mua", "Khối lượng hàng", "Hạn sử dụng", "Nhãn giá cho biết số tiền cần trả."]
      ], [["Đèn đỏ","Dừng lại"],["Đèn xanh","Được đi"],["Người bán","Cung cấp hàng hoá"],["Người mua","Trả tiền"]], "Nối cho đúng nhé!"),
      topic("tn-thucdong","🌳","Thực vật và động vật","Bài 16–20 • Nơi sống, bảo vệ môi trường sống",[
        ["Cây lúa thường sống ở đâu?", "Ruộng nước", "Sa mạc khô", "Đỉnh núi tuyết", "Lúa cần nhiều nước nên trồng ở ruộng."],
        ["Cá sống ở đâu?", "Dưới nước (ao, hồ, sông, biển)", "Trên cây", "Trong hang đất khô", "Cá sống và hô hấp dưới nước."],
        ["Cây xương rồng thường sống ở đâu?", "Nơi khô nóng như sa mạc", "Đầm lầy", "Đáy biển", "Xương rồng chịu hạn, sống ở nơi khô nóng."],
        ["Việc nào bảo vệ môi trường sống của cây và con vật?", "Không xả rác bừa bãi, trồng thêm cây", "Chặt phá rừng", "Xả rác xuống sông", "Giữ môi trường sạch, trồng cây giúp cây và vật sinh sống tốt."],
        ["Chim cánh cụt sống ở đâu?", "Vùng băng giá Nam Cực", "Sa mạc", "Rừng nhiệt đới nóng", "Chim cánh cụt sống ở vùng lạnh giá."],
        ["Con vật nào sống cả trên cạn và dưới nước?", "Ếch", "Cá vàng", "Gà", "Ếch sống được cả trên cạn và dưới nước."],
        ["Cây bèo thường sống ở đâu?", "Nổi trên mặt nước ao, hồ", "Trên cạn khô", "Trên núi cao", "Bèo là cây sống nổi trên mặt nước."],
        ["Vì sao không nên phá tổ chim, tổ ong bừa bãi?", "Làm hại nơi sống của động vật", "Không sao cả", "Giúp chim bay nhanh hơn", "Phá tổ làm động vật mất nơi ở, có thể nguy hiểm cho người."],
        ["Gấu trúc thích ăn gì và sống ở đâu?", "Ăn tre trúc, sống ở rừng núi", "Ăn cá, sống ở biển", "Ăn cỏ, sống ở đồng bằng", "Gấu trúc ăn tre trúc ở vùng rừng núi."],
        ["Em làm gì để chăm sóc cây ở trường?", "Tưới nước, không bẻ cành", "Bẻ lá chơi", "Khắc tên lên thân cây", "Tưới nước và bảo vệ cây giúp cây xanh tốt."]
      ], [["Cá","Dưới nước"],["Xương rồng","Nơi khô nóng"],["Ếch","Cả cạn và nước"],["Chim cánh cụt","Vùng băng giá"]], "Nối con vật / cây với nơi sống nhé!"),
      topic("tn-suckhoe","💪","Con người và sức khoẻ","Bài 21–27 • Cơ quan vận động, hô hấp, bài tiết",[
        ["Cơ quan vận động gồm những bộ phận nào?", "Xương và cơ", "Phổi và mũi", "Thận và da", "Cơ quan vận động gồm xương và cơ, giúp cơ thể cử động."],
        ["Để xương chắc khoẻ, em nên làm gì?", "Ăn đủ chất, tập thể dục, ngồi học đúng tư thế", "Ngồi cong lưng cả ngày", "Không vận động", "Ăn uống đủ chất, vận động và ngồi đúng tư thế giúp xương khoẻ."],
        ["Cơ quan hô hấp gồm những bộ phận nào?", "Mũi, khí quản, phổi", "Xương, cơ", "Dạ dày, ruột", "Hô hấp: mũi – khí quản – phổi."],
        ["Việc nào bảo vệ cơ quan hô hấp?", "Đeo khẩu trang nơi bụi, không hút thuốc gần em", "Hít khói bụi", "Chơi nơi nhiều khói", "Tránh khói bụi giúp phổi khoẻ."],
        ["Cơ quan bài tiết nước tiểu gồm bộ phận nào quan trọng lọc máu?", "Thận", "Phổi", "Xương", "Thận lọc máu tạo nước tiểu, cùng bàng quang và ống dẫn."],
        ["Để bảo vệ cơ quan bài tiết nước tiểu, em nên làm gì?", "Uống đủ nước, không nhịn tiểu lâu", "Nhịn uống nước cả ngày", "Nhịn tiểu cả buổi", "Uống đủ nước và đi tiểu đúng lúc giúp thận và bàng quang khoẻ."],
        ["Khi bị đau, sưng ở tay chân sau vận động mạnh, em nên làm gì?", "Nghỉ ngơi và báo người lớn / đi khám", "Tiếp tục chơi mạnh hơn", "Mặc kệ không nói ai", "Cần nghỉ và báo người lớn để được chăm sóc."],
        ["Không khí đi vào cơ thể qua đâu trước tiên?", "Mũi", "Phổi", "Miệng (khi thở bằng miệng)", "Bình thường không khí vào qua mũi, xuống khí quản vào phổi."],
        ["Tập thể dục thường xuyên giúp ích gì cho cơ quan vận động?", "Cơ và xương chắc khoẻ, cơ thể dẻo dai", "Làm xương yếu đi", "Không ích lợi gì", "Vận động hợp lí giúp cơ xương khoẻ."],
        ["Nước tiểu được chứa tạm thời ở đâu trước khi thải ra ngoài?", "Bàng quang (bóng đái)", "Thận", "Phổi", "Thận tạo nước tiểu, nước tiểu xuống bàng quang rồi thải ra ngoài."]
      ], [["Xương và cơ","Cơ quan vận động"],["Mũi, phổi","Cơ quan hô hấp"],["Thận","Lọc máu, tạo nước tiểu"],["Bàng quang","Chứa nước tiểu"]], "Nối cơ quan với chức năng nhé!"),
      topic("tn-traidat","🌦️","Trái đất và bầu trời","Bài 28–31 • Các mùa, thiên tai và ứng phó",[
        ["Một năm có mấy mùa (ở miền Bắc nước ta)?", "4 mùa: xuân, hạ, thu, đông", "2 mùa", "6 mùa", "Miền Bắc có 4 mùa rõ rệt; miền Nam có 2 mùa mưa – khô."],
        ["Mùa hạ thời tiết thường thế nào?", "Nóng, có mưa rào", "Rét buốt", "Khô lạnh", "Mùa hạ (mùa hè) nóng và hay có mưa rào."],
        ["Thiên tai nào gây ngập lụt nhà cửa, đường sá?", "Mưa lớn, bão, lũ lụt", "Nắng đẹp", "Gió nhẹ", "Bão, mưa lớn gây lũ lụt, ngập úng."],
        ["Khi có bão lớn, em nên làm gì?", "Ở trong nhà kiên cố, nghe hướng dẫn người lớn", "Ra ngoài chơi", "Đứng dưới cây to", "Khi bão: ở nơi an toàn, tránh xa cây to, cột điện."],
        ["Mùa đông ở miền Bắc thời tiết thế nào?", "Lạnh, rét", "Nóng bức", "Mưa phùn ấm", "Mùa đông miền Bắc lạnh, cần mặc ấm."],
        ["Sấm sét nguy hiểm, khi trời mưa dông em tránh điều gì?", "Tránh trú dưới cây to, tránh dùng điện thoại gần cửa sổ kim loại", "Ra sân chơi", "Tắm mưa", "Khi dông sét cần vào nhà, tránh cây to và vật kim loại."],
        ["Hạn hán là hiện tượng gì?", "Thiếu nước kéo dài do ít mưa", "Mưa quá nhiều", "Động đất", "Hạn hán là thiếu nước trong thời gian dài."],
        ["Mùa xuân thời tiết thường thế nào?", "Ấm áp, cây cối đâm chồi nảy lộc", "Rét đậm", "Nóng như lửa", "Mùa xuân ấm áp, là mùa cây sinh trưởng, có Tết Nguyên đán."],
        ["Nghe tin bão sắp đến, gia đình em nên chuẩn bị gì?", "Chằng chống nhà cửa, dự trữ nước và đồ ăn", "Mở hết cửa sổ", "Ra biển tắm", "Chuẩn bị trước giúp giảm thiệt hại do bão."],
        ["Hiện tượng nào KHÔNG phải thiên tai?", "Mưa phùn mùa xuân", "Bão", "Lũ lụt", "Mưa phùn là hiện tượng thời tiết bình thường, không phải thiên tai."]
      ], [["Mùa hạ","Nóng, mưa rào"],["Mùa đông","Lạnh, rét"],["Bão","Gây ngập lụt"],["Mùa xuân","Ấm áp, đâm chồi"]], "Nối cho đúng nhé!")
    ];
    var DAODUC2_TOPICS = [
      topic("dd-quehuong","🏡","Quê hương em","Chủ đề 1 • Vẻ đẹp quê hương, em yêu quê hương",[
        ["Việc nào thể hiện em yêu quê hương?", "Giữ gìn cảnh đẹp, không xả rác nơi công cộng ở quê", "Phá hoại cây xanh", "Vứt rác ra đường làng", "Yêu quê hương thể hiện qua việc giữ gìn và bảo vệ cảnh đẹp quê hương."],
        ["Khi đi xa, em nhớ về quê hương ở điều gì?", "Cảnh đẹp và người thân ở quê", "Không nhớ gì", "Chỉ nhớ quà bánh", "Quê hương gắn với cảnh đẹp và tình cảm gia đình."],
        ["Em giới thiệu quê hương với bạn bằng cách nào?", "Kể về cảnh đẹp, món ăn, lễ hội của quê", "Nói xấu quê mình", "Giấu không kể", "Tự hào giới thiệu vẻ đẹp quê hương là việc làm tốt."],
        ["Thấy rác ở đình làng, em nên làm gì?", "Nhặt bỏ vào thùng rác", "Vứt thêm rác", "Mặc kệ", "Giữ vệ sinh nơi công cộng ở quê hương."],
        ["Quê hương là gì?", "Nơi em sinh ra, lớn lên, có người thân", "Nơi xa lạ chưa từng đến", "Một món đồ chơi", "Quê hương là nơi chôn nhau cắt rốn, gắn bó tình cảm."],
        ["Hành động nào làm đẹp quê hương?", "Trồng hoa ven đường cùng mọi người", "Bẻ hoa công cộng", "Vẽ bậy lên tường đình", "Trồng cây, hoa làm quê hương thêm đẹp."]
      ], [["Quê hương","Nơi sinh ra, lớn lên"],["Yêu quê hương","Giữ gìn cảnh đẹp"],["Đình làng","Nơi sinh hoạt cộng đồng"],["Trồng hoa","Làm đẹp quê hương"]], "Nối cho đúng nhé!"),
      topic("dd-thayco-banbe","💐","Kính trọng thầy cô, yêu quý bạn bè","Chủ đề 2 • Bài 3–4",[
        ["Khi gặp thầy cô, em nên làm gì?", "Lễ phép chào hỏi", "Lờ đi như không thấy", "Chạy trốn", "Chào hỏi lễ phép thể hiện kính trọng thầy cô."],
        ["Ngày 20/11 là ngày gì?", "Ngày Nhà giáo Việt Nam, tôn vinh thầy cô", "Ngày Tết thiếu nhi", "Ngày khai giảng", "20/11 là ngày tri ân thầy cô giáo."],
        ["Bạn cùng lớp bị ốm nghỉ học, em nên làm gì?", "Thăm hỏi, chép bài giúp bạn", "Cười chê bạn", "Giấu bài không cho bạn mượn", "Quan tâm, giúp đỡ bạn thể hiện yêu quý bạn bè."],
        ["Việc nào KHÔNG thể hiện kính trọng thầy cô?", "Nói leo, làm việc riêng trong giờ học", "Chăm chú nghe giảng", "Chào thầy cô lễ phép", "Trong giờ học cần chăm chú, không nói leo."],
        ["Bạn làm rơi hộp bút, em nên làm gì?", "Nhặt giúp bạn", "Đá hộp bút đi xa hơn", "Mặc kệ", "Giúp đỡ bạn trong việc nhỏ cũng là yêu quý bạn."],
        ["Khi thầy cô giảng bài mà em chưa hiểu, em nên làm gì?", "Giơ tay xin thầy cô giảng lại", "Ngồi im không nói", "Nói chuyện với bạn", "Mạnh dạn hỏi lại bài là học tập tích cực và tôn trọng thầy cô."]
      ], [["20/11","Ngày Nhà giáo VN"],["Chào hỏi lễ phép","Kính trọng thầy cô"],["Thăm bạn ốm","Yêu quý bạn bè"],["Nghe giảng chăm chú","Tôn trọng giờ học"]], "Nối cho đúng nhé!"),
      topic("dd-thoigian","⏰","Quý trọng thời gian","Chủ đề 3 • Bài 5",[
        ["Việc nào thể hiện quý trọng thời gian?", "Làm việc đúng giờ, không để việc hôm nay sang ngày mai", "Ngủ nướng bỏ học", "Chơi mãi không làm bài", "Quý trọng thời gian là dùng thời gian hợp lí, đúng giờ."],
        ["Em lập thời gian biểu để làm gì?", "Sắp xếp học, chơi, nghỉ ngơi hợp lí", "Trang trí góc học tập", "Cho bạn xem chơi", "Thời gian biểu giúp em quản lí thời gian tốt."],
        ["Câu tục ngữ nào khuyên quý trọng thời gian?", "Thì giờ là vàng bạc", "Ăn quả nhớ kẻ trồng cây", "Lá lành đùm lá rách", "“Thì giờ là vàng bạc” — thời gian rất quý."],
        ["Đi học muộn thường xuyên là biểu hiện gì?", "Chưa quý trọng thời gian", "Rất đúng giờ", "Giỏi giang", "Đi học muộn làm mất thời gian của mình và ảnh hưởng lớp."],
        ["Khi đã hứa giờ chơi với bạn, em nên làm gì?", "Đến đúng giờ đã hẹn", "Đến muộn tuỳ thích", "Không đến mà không báo", "Giữ đúng giờ hẹn là quý trọng thời gian của mình và của bạn."],
        ["Thời gian đã trôi qua có lấy lại được không?", "Không, thời gian qua đi không trở lại", "Có, lấy lại dễ dàng", "Có, nếu xin phép", "Vì thời gian không trở lại nên càng phải quý trọng."]
      ], [["Thời gian biểu","Sắp xếp công việc"],["Đúng giờ","Quý trọng thời gian"],["Thì giờ","Là vàng bạc"],["Đi học muộn","Chưa quý trọng thời gian"]], "Nối cho đúng nhé!"),
      topic("dd-nhanloi","🙏","Nhận lỗi và sửa lỗi","Chủ đề 4 • Bài 6",[
        ["Em vô ý làm vỡ cốc của mẹ, em nên làm gì?", "Nhận lỗi và xin lỗi mẹ", "Giấu mảnh vỡ, đổ cho em nhỏ", "Mặc kệ bỏ đi", "Nhận lỗi, xin lỗi là dũng cảm và trung thực."],
        ["Khi nhận ra mình sai, điều quan trọng nhất là gì?", "Nhận lỗi và sửa chữa, không tái phạm", "Chỉ xin lỗi cho xong", "Tìm cách che giấu", "Nhận lỗi phải đi đôi với sửa lỗi."],
        ["Bạn nhận lỗi với em, em nên làm gì?", "Tha thứ cho bạn", "Giận bạn mãi", "Mách tội bạn thêm", "Tha thứ giúp tình bạn tốt đẹp hơn."],
        ["Việc nào cho thấy em chưa biết nhận lỗi?", "Đổ lỗi cho người khác khi mình làm sai", "Xin lỗi chân thành", "Tự giác dọn dẹp chỗ mình làm đổ", "Đổ lỗi là trốn tránh trách nhiệm."],
        ["Nhận lỗi kịp thời giúp ích gì?", "Được mọi người tin yêu, sửa sai nhanh hơn", "Bị mọi người ghét hơn", "Không ích gì", "Người biết nhận lỗi được tin tưởng và tiến bộ."],
        ["Em làm sai bài tập vì cẩu thả, em nên làm gì?", "Xem lại, sửa bài cẩn thận hơn", "Xoá bài đi giấu cô", "Chép bài bạn", "Sửa lỗi giúp em học tốt hơn."]
      ], [["Làm vỡ đồ","Nhận lỗi, xin lỗi"],["Đổ lỗi cho bạn","Chưa biết nhận lỗi"],["Tha thứ","Khi bạn nhận lỗi"],["Sửa bài cẩn thận","Sửa lỗi"]], "Nối cho đúng nhé!"),
      topic("dd-baoquan","🎒","Bảo quản đồ dùng","Chủ đề 5 • Bài 7–8",[
        ["Việc nào giúp bảo quản sách vở bền đẹp?", "Bọc sách, giữ sách khô sạch", "Để sách dưới mưa", "Xé trang sách gấp máy bay", "Bọc và giữ sách cẩn thận giúp sách dùng được lâu."],
        ["Dùng xong đồ dùng học tập, em nên làm gì?", "Cất vào cặp / hộp bút đúng chỗ", "Vứt lung tung", "Để quên ở lớp", "Cất gọn gàng giúp đồ dùng không thất lạc, hư hỏng."],
        ["Đồ dùng gia đình bị hỏng nhẹ, em nên làm gì?", "Báo người lớn để sửa chữa", "Tự ý đập phá thêm", "Giấu đi", "Báo người lớn để sửa giúp bảo quản đồ dùng gia đình."],
        ["Hành động nào làm hỏng đồ dùng?", "Dùng phá, ném mạnh đồ vật", "Lau chùi đồ vật sạch sẽ", "Dùng nhẹ nhàng", "Dùng đồ cẩn thận giúp đồ bền lâu."],
        ["Vì sao cần bảo quản đồ dùng?", "Để dùng được lâu, tiết kiệm tiền của gia đình", "Không có lí do", "Để đồ nhanh hỏng", "Bảo quản tốt giúp tiết kiệm và tôn trọng công sức lao động."],
        ["Quần áo mặc xong, em nên làm gì?", "Treo / gấp gọn hoặc bỏ vào giỏ giặt đúng chỗ", "Vứt xuống sàn nhà", "Nhét gầm giường", "Giữ quần áo gọn gàng là bảo quản đồ cá nhân."]
      ], [["Bọc sách","Bảo quản sách vở"],["Cất hộp bút","Giữ đồ học tập"],["Báo người lớn sửa đồ","Bảo quản đồ gia đình"],["Dùng nhẹ nhàng","Đồ bền lâu"]], "Nối cho đúng nhé!"),
      topic("dd-camxuc","😊","Cảm xúc của em","Chủ đề 6 • Bài 9–10",[
        ["Khi em rất tức giận, cách nào giúp bình tĩnh lại?", "Hít thở sâu, đếm từ 1 đến 10", "Hét to, đập phá đồ", "Đánh bạn", "Hít thở sâu, bình tĩnh lại giúp kiềm chế cảm xúc tiêu cực."],
        ["Khuôn mặt tươi cười thể hiện cảm xúc gì?", "Vui vẻ", "Buồn bã", "Tức giận", "Nụ cười thể hiện niềm vui."],
        ["Thấy bạn buồn khóc, em nên làm gì?", "An ủi, hỏi han bạn", "Cười chê bạn", "Bỏ đi không quan tâm", "An ủi bạn là chia sẻ cảm xúc tốt."],
        ["Cảm xúc nào là cảm xúc tiêu cực cần kiềm chế?", "Tức giận mất kiểm soát", "Vui vẻ", "Yêu thương", "Tức giận quá mức dễ làm việc sai nên cần kiềm chế."],
        ["Khi lo lắng trước giờ kiểm tra, em nên làm gì?", "Ôn bài kĩ, hít thở sâu, tự tin làm bài", "Bỏ không đi học", "Khóc suốt buổi", "Chuẩn bị kĩ và bình tĩnh giúp giảm lo lắng."],
        ["Em đoạt giải trong cuộc thi, cảm xúc tự nhiên là gì?", "Vui mừng, tự hào", "Buồn chán", "Sợ hãi", "Thành quả tốt đem lại niềm vui và tự hào."]
      ], [["Cười tươi","Vui vẻ"],["Hít thở sâu","Bình tĩnh lại"],["An ủi bạn","Chia sẻ cảm xúc"],["Tức giận quá mức","Cần kiềm chế"]], "Nối cho đúng nhé!"),
      topic("dd-hotro","🆘","Tìm kiếm sự hỗ trợ","Chủ đề 7 • Bài 11–13",[
        ["Ở nhà, em bị đứt tay chảy máu, em tìm ai hỗ trợ trước tiên?", "Người lớn trong gia đình", "Tự chịu đựng không nói ai", "Bạn hàng xóm nhỏ tuổi hơn", "Khi gặp nguy hiểm ở nhà, hãy gọi người lớn hỗ trợ ngay."],
        ["Ở trường, em bị bạn lớn bắt nạt, em nên báo ai?", "Thầy cô giáo", "Không nói với ai", "Tự đánh lại", "Báo thầy cô để được bảo vệ và giải quyết đúng cách."],
        ["Bị lạc ở nơi công cộng, em nên tìm ai?", "Chú công an, bảo vệ hoặc người lớn đáng tin cậy gần đó", "Đi theo người lạ hứa dẫn về", "Chạy đi thật xa", "Tìm công an, bảo vệ để được giúp đỡ an toàn."],
        ["Số điện thoại khẩn cấp gọi công an là số nào?", "113", "114", "115", "113 là số gọi công an khi khẩn cấp (114 cứu hoả, 115 cấp cứu)."],
        ["Khi ở nhà một mình và có cháy nhỏ, sau khi chạy ra nơi an toàn em gọi số nào?", "114 (cứu hoả)", "113", "1080 chơi", "114 là số điện thoại cứu hoả."],
        ["Em thấy bạn bị đuối nước ở ao, em nên làm gì?", "Hô hoán gọi người lớn, không tự nhảy xuống cứu", "Nhảy xuống cứu bạn ngay", "Đứng nhìn", "Trẻ em không tự xuống nước cứu người; gọi người lớn ngay là đúng."]
      ], [["Công an","113"],["Cứu hoả","114"],["Cấp cứu","115"],["Bị lạc","Tìm công an, bảo vệ"]], "Nối cho đúng nhé!"),
      topic("dd-congcong","🚦","Quy định nơi công cộng","Chủ đề 8 • Bài 14–15",[
        ["Ở thư viện, em cần tuân thủ quy định gì?", "Giữ im lặng, giữ gìn sách", "Nói chuyện ồn ào", "Ăn uống trong phòng đọc", "Thư viện là nơi cần yên tĩnh."],
        ["Khi xếp hàng mua vé, em nên làm gì?", "Xếp hàng theo thứ tự, không chen lấn", "Chen lên trước", "Xô đẩy người khác", "Xếp hàng văn minh là tuân thủ quy định nơi công cộng."],
        ["Ở bệnh viện, hành động nào đúng?", "Đi nhẹ, nói khẽ, giữ vệ sinh", "Chạy nhảy la hét", "Vứt rác bừa bãi", "Bệnh viện cần yên tĩnh để người bệnh nghỉ ngơi."],
        ["Trên xe buýt, em nên làm gì với người già, em nhỏ?", "Nhường ghế", "Tranh ghế", "Mặc kệ", "Nhường ghế là hành vi đẹp nơi công cộng."],
        ["Quy định nơi công cộng giúp ích gì?", "Giữ trật tự, an toàn, văn minh cho mọi người", "Làm mọi người khó chịu", "Không có ích", "Quy định chung giúp cộng đồng sinh hoạt thuận lợi."],
        ["Xem phim ở rạp, em nên làm gì?", "Tắt chuông điện thoại, không nói chuyện ồn", "Nói chuyện to suốt buổi", "Đá ghế phía trước", "Tôn trọng người xung quanh khi ở rạp chiếu phim."]
      ], [["Thư viện","Giữ im lặng"],["Xe buýt","Nhường ghế"],["Bệnh viện","Đi nhẹ nói khẽ"],["Mua vé","Xếp hàng thứ tự"]], "Nối cho đúng nhé!")
    ];
/* ---------- Đăng kí Lớp 2 (gốc: bảng GRADES của master) ---------- */
(function () {
  if (typeof GRADES !== "undefined" && GRADES && !GRADES[2]) {
    GRADES[2] = { label:"Lớp 2", subjects:[
        { id:"g2-math", emoji:"🔢", name:"Toán", desc:"Số đến 1000 • Nhân chia • Đo lường", cls:"c-coral", topics: MATH2_TOPICS },
        { id:"g2-tv", emoji:"📖", name:"Tiếng Việt", desc:"Chính tả • Từ ngữ • Dấu câu", cls:"c-pink", topics: TV2_TOPICS },
        { id:"g2-eng", emoji:"🔤", name:"Tiếng Anh", desc:"Global Success • 16 Unit", cls:"c-teal", topics: UNITS2.map(function(u){ return { id:"g2-u"+u.n, letter:u.letter, name:"Unit "+u.n+" — "+u.place, sub:u.words.map(function(w){return w[0];}).join(" • "), pools: eng2Pools(u) }; }).concat([{ id:"g2-review", emoji:"🌈", name:"Ôn tập tất cả", sub:"Trộn từ của cả 16 Unit", pools: engPools(ALL_WORDS2) }]) },
        { id:"g2-tnxh", emoji:"🌍", name:"Tự nhiên & Xã hội", desc:"Gia đình • Trường học • Sức khoẻ", cls:"c-leaf", topics: TNXH2_TOPICS },
        { id:"g2-dd", emoji:"💛", name:"Đạo đức", desc:"Tình huống ứng xử • 8 chủ đề", cls:"c-sun", topics: DAODUC2_TOPICS }
      ]};
  }
})();
/* ---------- Câu hỏi thật bổ sung (bảng EXTRA_FACTS_127 của master — phần Lớp 2) ---------- */
Object.assign(window.__EXTRA127 = window.__EXTRA127 || {}, {
  "dd-quehuong": [["Em có thể làm gì để giới thiệu quê hương với bạn ở xa?", "Kể về cảnh đẹp, đặc sản và con người quê hương", "Nói quê mình không có gì hay", "Giấu không cho bạn biết quê mình", "Tự hào giới thiệu quê hương là thể hiện tình yêu quê hương."]],
  "dd-thayco-banbe": [["Bạn mới chuyển đến lớp em, em nên làm gì?", "Chủ động làm quen và giúp bạn hoà nhập", "Không nói chuyện với bạn", "Trêu chọc bạn mới", "Giúp đỡ bạn mới thể hiện tình bạn đẹp."]],
  "dd-thoigian": [["Em có hẹn trả sách cho bạn vào sáng mai. Tối nay em nên làm gì?", "Để sách vào cặp sẵn để mai mang trả đúng hẹn", "Để mai dậy rồi tìm sách sau", "Quên luôn lời hẹn", "Chuẩn bị trước giúp em giữ đúng thời gian đã hẹn."]],
  "dd-nhanloi": [["Em viết sai chính tả trong vở, em nên làm gì?", "Gạch bỏ cẩn thận và viết lại cho đúng", "Xé trang vở đi", "Để nguyên không sửa", "Biết sửa lỗi giúp em tiến bộ."]],
  "dd-baoquan": [["Chiếc áo mưa dùng xong còn ướt, em nên làm gì?", "Phơi áo mưa cho khô rồi cất", "Vò áo mưa nhét ngay vào cặp", "Để áo mưa dưới sàn nhà", "Phơi khô rồi cất giúp áo mưa bền và không mốc."]],
  "dd-camxuc": [["Khi em vui vì được cô khen, em nên chia sẻ niềm vui thế nào?", "Cảm ơn cô và tiếp tục cố gắng", "Khoe khoang chê bai bạn khác", "Cho rằng mình không cần cố gắng nữa", "Niềm vui được chia sẻ đúng cách sẽ lan toả điều tốt đẹp."]],
  "dd-hotro": [["Số điện thoại gọi cấp cứu y tế là số nào?", "115", "113", "114", "115 là số cấp cứu y tế (113 công an, 114 cứu hoả)."]],
  "dd-congcong": [["Đi xem biểu diễn văn nghệ, khi chương trình đang diễn ra em nên làm gì?", "Ngồi yên, vỗ tay khi tiết mục kết thúc", "Nói chuyện ồn ào suốt buổi", "Đi lại tự do trong hội trường", "Giữ trật tự nơi công cộng là văn minh."]]
});
if (typeof __applyExtra127 === "function") __applyExtra127(2);
/* ---------- Bộ sinh biến thể Lớp 2 (gốc: block 7 của master) ---------- */
function g2WordMulDiv() {
  var v = rand(0, 2);
  if (v === 0) { var t = pick([2, 5]), k = rand(3, 9); return calcMCQ("Bài toán có lời văn", "Có " + k + " hộp kẹo, mỗi hộp có " + t + " cái kẹo. Hỏi tất cả có bao nhiêu cái kẹo? (" + t + " × " + k + ")", t * k, 0, 60, t + " × " + k + " = " + (t * k) + " (cái kẹo)."); }
  if (v === 1) { var t2 = pick([2, 5]), k2 = rand(3, 9), p = t2 * k2; return calcMCQ("Bài toán có lời văn", "Chia đều " + p + " cái bánh cho " + t2 + " bạn. Mỗi bạn được bao nhiêu cái bánh? (" + p + " : " + t2 + ")", k2, 0, 20, "Vì " + t2 + " × " + k2 + " = " + p + " nên mỗi bạn được " + k2 + " cái bánh."); }
  var n = rand(3, 8), each = pick([2, 5]);
  return calcMCQ("Bài toán có lời văn", "Một rổ có " + n + " chùm nho, mỗi chùm có " + each + " quả. Lấy ra 4 quả để ăn. Rổ còn bao nhiêu quả nho? (" + n + " × " + each + " − 4)", n * each - 4, 0, 60, "Tất cả có " + n + " × " + each + " = " + (n * each) + " quả; còn lại " + (n * each) + " − 4 = " + (n * each - 4) + " quả.");
}
function g2WordBig() {
  var add = Math.random() < 0.5, a = rand(125, 640), b = rand(110, 320), ans;
  if (add) { while (a + b > 1000) b = rand(110, 300); ans = a + b; }
  else { while (b >= a) a = rand(400, 950); ans = a - b; }
  var story = add ? ("Một kho chứa " + a + " kg gạo. Buổi chiều nhập thêm " + b + " kg gạo. Hỏi trong kho có tất cả bao nhiêu ki-lô-gam gạo?")
                  : ("Một thư viện có " + a + " quyển sách. Cho mượn " + b + " quyển. Hỏi thư viện còn lại bao nhiêu quyển sách?");
  return calcMCQ("Bài toán có lời văn", story + " (" + a + (add ? " + " : " − ") + b + ")", ans, 0, 1000, a + (add ? " + " : " − ") + b + " = " + ans + ".");
}
function g2PreSuccWord() {
  var n = rand(101, 998), mode = rand(0, 1), ans = mode === 0 ? n - 1 : n + 1;
  return calcMCQ(mode === 0 ? "Số liền trước của " + n + " là số nào?" : "Số liền sau của " + n + " là số nào?", String(n), ans, 0, 1000, (mode === 0 ? "Số liền trước bé hơn 1 đơn vị: " : "Số liền sau lớn hơn 1 đơn vị: ") + n + (mode === 0 ? " − 1 = " : " + 1 = ") + ans + ".");
}
/* B1-sửa lớp nhỏ (2026-10-15): biến thể cho chủ đề "Số đến 100" (m2-so100) —
   bản gốc sinh số 101–998 nên chủ đề đến-100 lẫn số ba chữ số (B1-đo §6.4
   ví dụ 5: "Số liền sau của 519" trong chủ đề Số đến 100). Ở đây số gốc
   12–99 để cả số liền trước (>=11) và liền sau (<=100) đều trong phạm vi. */
function g2PreSuccWord100() {
  var n = rand(12, 99), mode = rand(0, 1), ans = mode === 0 ? n - 1 : n + 1;
  return calcMCQ(mode === 0 ? "Số liền trước của " + n + " là số nào?" : "Số liền sau của " + n + " là số nào?", String(n), ans, 0, 100, (mode === 0 ? "Số liền trước bé hơn 1 đơn vị: " : "Số liền sau lớn hơn 1 đơn vị: ") + n + (mode === 0 ? " − 1 = " : " + 1 = ") + ans + ".");
}
(function () {
  if (!GRADES[2]) return;
  GRADES[2].subjects.forEach(function (s) {
    if (s.id !== "g2-eng") return;
    s.topics.forEach(function (t, i) { if (i < UNITS2.length) engExtraPush(t, UNITS2[i].words, ALL_WORDS2); });
  });
  var t;
  t = findTopic127(2, "m2-so100"); if (t) { t.pools.choose.push(g2PreSuccWord100, g2PreSuccWord100); }
  t = findTopic127(2, "m2-nhanchia"); if (t) { t.pools.choose.push(g2WordMulDiv, g2WordMulDiv); }
  t = findTopic127(2, "m2-1000calc"); if (t) { t.pools.choose.push(g2WordBig, g2WordBig); }
  t = findTopic127(2, "m2-1000"); if (t) { t.pools.choose.push(g2PreSuccWord); }
})();
/* ---------- Bổ sung chủ đề đặc biệt (block 7, phần 2) (nguyên văn master; chạy qua bộ lọc để chỉ áp dụng cho Lớp 2) ---------- */
(function () {
  var __findOrig = findTopic127;
  findTopic127 = function (gg, id) { return gg === 2 ? __findOrig(gg, id) : null; };
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
/* ---------- Bổ sung lần 2 (block 8) (nguyên văn master; chạy qua bộ lọc để chỉ áp dụng cho Lớp 2) ---------- */
(function () {
  var __findOrig = findTopic127;
  findTopic127 = function (gg, id) { return gg === 2 ? __findOrig(gg, id) : null; };
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
/* ---------- Bổ sung lần 3 (block 9) (nguyên văn master; chạy qua bộ lọc để chỉ áp dụng cho Lớp 2) ---------- */
(function () {
  var __findOrig = findTopic127;
  findTopic127 = function (gg, id) { return gg === 2 ? __findOrig(gg, id) : null; };
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
/* ---------- Công thức và cách làm (Toán) của Lớp 2 — tách từ bảng ghi chú chung của master ---------- */
window.__MATH_KNOWLEDGE_NOTES = window.__MATH_KNOWLEDGE_NOTES || {};
Object.assign(window.__MATH_KNOWLEDGE_NOTES, {
"m2-so100": ["Số liền sau hơn số đã cho 1 đơn vị; số liền trước kém 1 đơn vị.","Trên tia số, số ở bên phải lớn hơn số ở bên trái.","Số có hai chữ số: chữ số bên trái chỉ hàng chục, chữ số bên phải chỉ hàng đơn vị."],
"m2-20": ["Cộng qua 10: tách số thứ hai để gộp với số thứ nhất thành 10 rồi cộng tiếp. Ví dụ: 8 + 5 = 8 + 2 + 3 = 13.","Trừ qua 10: trừ đến 10 trước rồi trừ tiếp. Ví dụ: 13 − 5 = 13 − 3 − 2 = 8.","Học thuộc bảng cộng, bảng trừ qua 10 trong phạm vi 20 để tính nhanh."],
"m2-kg-lit": ["Ki-lô-gam (kg) là đơn vị đo khối lượng; lít (l) là đơn vị đo dung tích (lượng chất lỏng).","Đo khối lượng bằng cân; đo dung tích bằng ca, chai có chia vạch lít.","Vật có số ki-lô-gam lớn hơn thì nặng hơn; bình chứa được nhiều lít hơn thì dung tích lớn hơn."],
"m2-nho100": ["Cộng có nhớ: cộng hàng đơn vị trước; nếu tổng từ 10 trở lên thì viết chữ số đơn vị và nhớ 1 sang hàng chục.","Trừ có nhớ: chữ số đơn vị không trừ được thì mượn 1 chục (10 đơn vị) để trừ, hàng chục giảm đi 1.","Luôn đặt tính thẳng cột rồi tính từ phải sang trái."],
"m2-hinh": ["Đoạn thẳng nối hai điểm và có hai đầu mút; điểm là một dấu chấm nhỏ.","Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp; độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng.","Tứ giác là hình có 4 cạnh và 4 góc."],
"m2-gio": ["Kim phút chỉ số 12 là giờ đúng; kim phút chỉ số 6 là 30 phút (giờ rưỡi).","1 ngày có 24 giờ; 1 giờ = 60 phút.","Tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày; tháng 4, 6, 9, 11 có 30 ngày; tháng 2 có 28 hoặc 29 ngày."],
"m2-nhanchia": ["Phép nhân là cộng nhiều lần các số bằng nhau: 2 × 4 = 2 + 2 + 2 + 2 = 8.","Phép chia là chia đều thành các phần bằng nhau; thuộc bảng nhân 2 và 5 sẽ làm được bảng chia 2 và 5.","Đổi chỗ hai thừa số thì tích không đổi: 2 × 5 = 5 × 2."],
"m2-khoi": ["Khối trụ có hai mặt đáy là hình tròn (như lon sữa).","Khối cầu tròn đều như quả bóng, lăn được theo mọi hướng."],
"m2-1000": ["Số có ba chữ số gồm hàng trăm, hàng chục, hàng đơn vị: 356 = 3 trăm + 5 chục + 6 đơn vị.","So sánh số có ba chữ số: so hàng trăm trước, rồi đến hàng chục, rồi hàng đơn vị.","Số tròn trăm: 100, 200, …, 900; số 1000 có bốn chữ số."],
"m2-dodai-tien": ["1 m = 10 dm = 100 cm; 1 km = 1000 m.","Đo độ dài bằng thước và luôn đọc số đo kèm đơn vị (cm, dm, m, km).","Đổi tiền phải giữ nguyên giá trị: ví dụ 1000 đồng = hai tờ 500 đồng."],
"m2-1000calc": ["Cộng, trừ số có ba chữ số: đặt thẳng cột trăm, chục, đơn vị rồi tính từ phải sang trái.","Tính nhẩm số tròn trăm: 300 + 500 = 800 vì 3 trăm + 5 trăm = 8 trăm."],
"m2-thongke": ["Biểu đồ tranh: mỗi hình biểu tượng thay cho một số lượng; đếm số biểu tượng để biết số liệu.","Sự kiện chắc chắn là nhất định xảy ra; không thể là không bao giờ xảy ra; có thể là xảy ra hoặc không xảy ra.","Trước khi vẽ biểu đồ cần thu thập và kiểm đếm số lượng cẩn thận."]
});
  if (typeof __labelGrade127 === "function") __labelGrade127(2);
  if (typeof window.__phaseBProcessGrade === "function") window.__phaseBProcessGrade(2);
  if (typeof window.__phaseCompleteGrade === "function") window.__phaseCompleteGrade(2);

/* ================= ĐỢT HÌNH TIỂU HỌC (v22) — Lớp 2 =================
   Gắn hình theo dữ kiện (figTagFacts của vỏ): hình là dữ kiện/ngữ cảnh của
   chính câu đó; đáp án không nằm trong hình. */
(function () {
  function bp(e) { return '<div class="big-pic">' + e + "</div>"; }
  function cyl(v) { return function () { return figK5CylSVG(v, 1000, 250); }; }
  function money(list) { return function () { return figMoneySVG(list); }; }
  function solid(k) { return function () { return figSolidSVG(k); }; }
  function solidsRow(list) { return function () { return figSolidsRowSVG(list); }; }
  /* Hình phẳng mini cho m2-hinh (dữ kiện hình học cơ bản, không ghi đáp án). */
  function seg2SVG() {
    return figOpen("0 0 220 84", "Đoạn thẳng") +
      '<line x1="36" y1="44" x2="184" y2="44" stroke="' + FIG_INK + '" stroke-width="3.6"/>' +
      '<circle cx="36" cy="44" r="6" fill="' + FIG_MEAS + '"/><circle cx="184" cy="44" r="6" fill="' + FIG_MEAS + '"/>' +
      figText(36, 24, "A", "middle", 15) + figText(184, 24, "B", "middle", 15) + "</svg>";
  }
  function quad2SVG() {
    return figOpen("0 0 200 120", "Hình tứ giác") +
      '<polygon points="46,26 156,38 138,98 30,88" fill="' + FIG_FILL + '" stroke="' + FIG_ACC + '" stroke-width="3.2" stroke-linejoin="round"/>' + "</svg>";
  }
  function polyline2SVG(labels) {
    var pts = [[24, 88], [84, 34], [140, 76], [196, 28]], s = figOpen("0 0 220 116", "Đường gấp khúc");
    s += '<polyline points="' + pts.map(function (p) { return p[0] + "," + p[1]; }).join(" ") + '" fill="none" stroke="' + FIG_INK + '" stroke-width="3.4" stroke-linejoin="round"/>';
    pts.forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="' + FIG_MEAS + '"/>'; });
    if (labels) for (var i = 0; i < 3; i++) s += figText((pts[i][0] + pts[i + 1][0]) / 2, Math.min(pts[i][1], pts[i + 1][1]) - 8, labels[i], "middle", 13.5, FIG_ACC);
    return s + "</svg>";
  }
  function pointsLine2SVG() {
    return figOpen("0 0 220 84", "Ba điểm thẳng hàng") +
      '<line x1="22" y1="46" x2="198" y2="46" stroke="' + FIG_MUT + '" stroke-width="2.6"/>' +
      '<circle cx="52" cy="46" r="6" fill="' + FIG_MEAS + '"/><circle cx="110" cy="46" r="6" fill="' + FIG_MEAS + '"/><circle cx="168" cy="46" r="6" fill="' + FIG_MEAS + '"/>' +
      figText(52, 24, "A", "middle", 15) + figText(110, 24, "B", "middle", 15) + figText(168, 24, "C", "middle", 15) + "</svg>";
  }
  function pointLetter2SVG() {
    return figOpen("0 0 160 100", "Điểm") +
      '<circle cx="80" cy="52" r="7" fill="' + FIG_MEAS + '"/>' + figText(80, 30, "A", "middle", 19) + "</svg>";
  }
  /* Sửa M2 (2026-10-20): điểm KHÔNG ghi chữ — dùng cho dữ kiện hỏi "Điểm
     thường được kí hiệu bằng gì?" để hình không tự lộ quy ước đáp án. */
  function point2SVG() {
    return figOpen("0 0 160 100", "Điểm") +
      '<circle cx="80" cy="52" r="7" fill="' + FIG_MEAS + '"/>' + "</svg>";
  }
  function lineArrows2SVG() {
    return figOpen("0 0 220 84", "Đường thẳng") +
      '<line x1="18" y1="44" x2="202" y2="44" stroke="' + FIG_INK + '" stroke-width="3.4"/>' +
      '<path d="M18,44 l12,-5.5 v11 z" fill="' + FIG_INK + '"/><path d="M202,44 l-12,-5.5 v11 z" fill="' + FIG_INK + '"/>' + "</svg>";
  }
  /* Sửa kín đáp án (soi mắt 2026-10-20): [2] hỏi đơn vị dung tích (đáp án
     "lít") — ống đong in thang ml gây nhiễu; [7] ống đong mức 500 ml đọc
     thẳng ra đáp án "500 ml" — thay bằng tranh chủ đề không in đơn vị/mức. */
  figTagFacts(2, "m2-kg-lit", { 0: bp("⚖️"), 1: bp("⚖️"), 2: bp("🪣"), 3: bp("💧"), 4: bp("🌾"), 5: bp("⚖️"), 6: bp("⚖️"), 7: bp("🍶"), 8: bp("⚖️"), 9: bp("💧") });
  figTagFacts(2, "m2-hinh", { 0: seg2SVG, 1: quad2SVG, 2: function () { return polyline2SVG(null); }, 3: pointsLine2SVG, 4: quad2SVG, 5: point2SVG, 6: lineArrows2SVG, 7: function () { return polyline2SVG(["2 cm", "3 cm", "4 cm"]); }, 8: function () { return shapeSVG("vuong", "#4dabf7"); }, 9: seg2SVG });
  figTagFacts(2, "m2-khoi", { 0: solid("cau"), 1: solid("tru"), 2: solid("tru"), 3: solid("cau"), 4: solidsRow(["tru", "cau", "non"]), 5: bp("🥛"), 6: solidsRow(["tru", "cau"]), 7: bp("🪙") });
  /* Sửa M1 (2026-10-20): dữ kiện 9 "Khối trụ đặt nằm ngang…" KHÔNG gắn hình
     nữa — họ hình chỉ vẽ trụ ĐỨNG, gắn vào sẽ mâu thuẫn trạng thái đề nêu. */
  figTagFacts(2, "m2-dodai-tien", { 0: bp("📏"), 1: bp("📏"), 2: bp("🛣️"), 3: bp("🛣️"), 4: money([1000, 2000, 5000]), 5: money([5000]), 6: money([1000, 1000, 2000]), 7: bp("📏"), 8: bp("📏"), 9: money([5000, 5000]) });
  figTagFacts(2, "tv2-tungu", { 0: bp("🏠"), 1: bp("🎒"), 2: bp("🗓️"), 3: bp("🏫"), 4: bp("🍊"), 5: bp("🍉"), 6: bp("🌳"), 7: bp("🐢"), 8: bp("🎈"), 9: bp("🌸") });
  figTagFacts(2, "tn-giadinh", { 0: bp("👨‍👩‍👧"), 1: bp("🏠"), 2: bp("🚪"), 3: bp("⚠️"), 4: bp("🧹"), 5: bp("👨‍👩‍👧"), 6: bp("✂️"), 7: bp("👨‍👩‍👧"), 8: bp("⚠️"), 9: bp("🧹") });
  figTagFacts(2, "tn-truong", { 0: bp("🎉"), 1: bp("📚"), 2: bp("⚠️"), 3: bp("🧹"), 4: bp("🤝"), 5: bp("📚"), 6: bp("🏠"), 7: bp("🧹"), 8: bp("🤝"), 9: bp("🇻🇳") });
  figTagFacts(2, "tn-congdong", { 0: bp("🛒"), 1: bp("🛒"), 2: bp("🚦"), 3: bp("🚶"), 4: bp("🚲"), 5: bp("👀"), 6: bp("🛒"), 7: bp("🪧"), 8: bp("🏍️"), 9: bp("🏷️") });
  figTagFacts(2, "tn-thucdong", { 0: bp("🌾"), 1: bp("🐟"), 2: bp("🌵"), 3: bp("♻️"), 4: bp("🐧"), 5: bp("🌿"), 6: bp("🌱"), 7: bp("🪺"), 8: bp("🐼"), 9: bp("🌳") });
  figTagFacts(2, "tn-suckhoe", { 0: bp("💪"), 1: bp("🏃"), 2: bp("🌬️"), 3: bp("🌬️"), 4: bp("💧"), 5: bp("💧"), 6: bp("🩹"), 7: bp("🌬️"), 8: bp("🏃"), 9: bp("💧") });
  figTagFacts(2, "tn-traidat", { 0: bp("🗓️"), 1: bp("🌦️"), 2: bp("⚠️"), 3: bp("🌀"), 4: bp("🌡️"), 5: bp("⛈️"), 6: bp("🌡️"), 7: bp("🌸"), 8: bp("🌀"), 9: bp("🌦️") });
})();
