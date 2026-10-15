/* ================================================================
   GAME HỌC TẬP — FILE DỮ LIỆU RIÊNG LỚP 7 (assets/data/lop7.js)
   Dữ liệu Lớp 7 (gốc: nửa sau block khung của master) + phần bổ sung Lớp 7 trong các block 6–9.
   Tách nguyên văn từ bản master đã kiểm chứng (MD5 5f54145de040cb8cefc9eeb7cb915cd5);
   trang vỏ nạp động file này khi người chơi chọn Lớp 7.
   ================================================================ */
    /* ================= TOÁN 7 ================= */
    function fmt(n){ return (Math.round(n*100)/100).toString().replace(".", ","); }
    function g7Fraction(n,d){
      if(!Number.isInteger(n)||!Number.isInteger(d)||d===0)throw Error('Invalid rational');
      if(d<0){n=-n;d=-d;}var a=Math.abs(n),b=d;while(b){var r=a%b;a=b;b=r;}var g=a||1;return (n/g)+'/'+(d/g);
    }
    function g7FractionQuestion(prompt,n,d,candidates,explain,visual){
      var answer=g7Fraction(n,d),values=[answer];
      (candidates||[]).concat([[n+d,d],[n-d,d],[n+2*d,d],[n-2*d,d],[-n,d]]).forEach(function(p){
        if(!p||p[1]===0||values.length>=4)return;var s=g7Fraction(p[0],p[1]);if(values.indexOf(s)<0)values.push(s);
      });
      for(var k=3;values.length<4;k++){var s=g7Fraction(n+k*d,d);if(values.indexOf(s)<0)values.push(s);}
      var options=shuffle(values),q={prompt:prompt,visual:visual||'',options:options.map(function(s){return {html:'<span class="opt-num rational-num">'+s+'</span>'};}),answer:options.indexOf(answer),cols:2,explain:explain||('Kết quả chính xác, rút gọn: '+answer+'.')};
      return identifyRoundFact(q,prompt+(visual?' | '+roundText(visual):''));
    }
    function g7FracCalc(){
      var a=rand(1,9), b=pick([2,3,4,5,6]), c=rand(1,9), d=pick([2,3,4,5,6]);
      var add = Math.random()<0.5;
      var n=add?a*d+c*b:a*d-c*b,den=b*d;
      return g7FractionQuestion('Tính: '+a+'/'+b+(add?' + ':' − ')+c+'/'+d,n,den,[[add?a+c:a-c,b+d]],'Quy đồng mẫu '+den+': '+n+'/'+den+' = '+g7Fraction(n,den)+'.');
    }
    function g7Power(){
      var base=pick([2,3,5]), e=pick([2,3]); var ans=Math.pow(base,e); var sup = e===2? "²" : "³";
      return g7FractionQuestion('Tính '+base+sup+' và viết kết quả dưới dạng phân số.',ans,1,[[base*e,1],[Math.pow(base,e-1),1]],base+sup+' = '+Array(e+1).join(base+'×').slice(0,-1)+' = '+g7Fraction(ans,1)+'.');
    }
    function g7Sqrt(){
      var r=pick([3,4,5,6,7,8,9,11,12,15]); var n=r*r;
      return calcMCQ("Căn bậc hai số học","√"+n+" = ?", r, 0, 30, "Vì "+r+"² = "+n+" và "+r+" ≥ 0 nên √"+n+" = "+r+".");
    }
    function g7Ratio(){
      var k=rand(2,6), x=rand(2,9); var y=x*k;
      return calcMCQ("Tỉ lệ thức","a/b = "+x+"/"+y+" và a = "+(x*2)+" thì b = ?", y*2, 0, 200, "Dãy tỉ số bằng nhau: nhân cả tử và mẫu với 2, b = "+y+" × 2 = "+(y*2)+".");
    }
    function g7ExprVal(){
      var x=rand(2,6); var ans=2*x+3;
      return calcMCQ("Giá trị biểu thức","2x + 3 với x = "+x, ans, 0, 40, "Thay x = "+x+": 2×"+x+" + 3 = "+ans+".");
    }
    function g7PolyAdd(){
      var a=rand(2,7), b=rand(2,7); var ans=a+b;
      return calcMCQ("Cộng đa thức","("+a+"x + 3) + ("+b+"x + 2) — hệ số của x là?", ans, 0, 30, "Cộng các hạng tử đồng dạng: "+a+"x + "+b+"x = "+ans+"x; hằng số 3 + 2 = 5.");
    }
    function g7Prob(){
      var total=pick([4,5,6,10,20]); var fav=rand(1,total-1);
      if (fav*2===total) fav = fav>1? fav-1 : fav+1; /* tránh đáp án trùng (total-fav)/total = fav/total */
      var ans = fav+"/"+total;
      var rawP = [ans, total+"/"+fav, fav+"/"+(total+fav), (total-fav)+"/"+total, "1/"+total];
      var uniqP = [];
      rawP.forEach(function(o){ if (uniqP.indexOf(o)===-1) uniqP.push(o); });
      var opts = shuffle(uniqP.slice(0,4));
      return { prompt:"Xác suất", visual:'<div class="sentence">Một hộp có '+total+" thẻ giống nhau, trong đó "+fav+" thẻ màu đỏ. Rút ngẫu nhiên 1 thẻ. Xác suất rút được thẻ đỏ là?</div>", options: opts.map(function(o){return {html:'<span class="opt-num">'+o+"</span>"};}), answer: opts.indexOf(ans), cols:4, explain:"Xác suất = số kết quả thuận lợi / tổng số kết quả = "+fav+"/"+total+"." };
    }
    function g7BoxVol(){
      var a=rand(2,6), b=rand(2,5), c=rand(2,5); var v=a*b*c;
      return calcMCQ("Thể tích hình hộp chữ nhật","Dài "+a+" cm, rộng "+b+" cm, cao "+c+" cm. V = ?", v, 0, 300, "V = dài × rộng × cao = "+a+"×"+b+"×"+c+" = "+v+" cm³.");
    }
    function g7ChartRead(){
      var mon=rand(10,40), tue=mon+rand(2,15);
      var correctTxt = "Tăng "+(tue-mon)+" cuốn";
      var optsCR = shuffle([correctTxt,"Giảm "+(tue-mon)+" cuốn","Không đổi"]);
      return { prompt:"Đọc biểu đồ đoạn thẳng", visual:'<div class="chart-box">Số sách bán được:<br>Thứ Hai: '+mon+" cuốn<br>Thứ Ba: "+tue+" cuốn</div>", options: optsCR.map(function(o){return {html:'<span class="opt-text">'+o+"</span>"};}), answer: optsCR.indexOf(correctTxt), cols:3, optStack:true, explain:"Thứ Ba bán nhiều hơn Thứ Hai: "+tue+" − "+mon+" = "+(tue-mon)+" cuốn." };
    }
    var MATH7_TOPICS = [
      { id:"m7-huu-ti", emoji:"➗", name:"Chương I: Số hữu tỉ", sub:"Bài 1–4 • Cộng trừ nhân chia, luỹ thừa", pools:{ choose:[g7FracCalc, g7Power], blank:[qBlankCalcFactory(30)], match:[mCalcResultFactory(30)], games:[gMemCalcFactory(30), gTFCalcFactory(30)] } },
      { id:"m7-so-thuc", emoji:"√", name:"Chương II: Số thực", sub:"Bài 5–7 • Số thập phân, căn bậc hai, số thực", pools: knowledgePools([
          ["Số nào là số vô tỉ?", "√2", "1/3", "0,25", "√2 là số thập phân vô hạn không tuần hoàn nên là số vô tỉ."],
          ["Số 0,333… (3 lặp lại) là số gì?", "Số thập phân vô hạn tuần hoàn", "Số vô tỉ", "Số nguyên", "Phần thập phân lặp lại theo chu kì là số thập phân vô hạn tuần hoàn."],
          ["Căn bậc hai số học của 25 là?", "5", "-5", "625", "√25 = 5 (chỉ lấy giá trị không âm)."],
          ["Tập hợp số thực gồm những số nào?", "Số hữu tỉ và số vô tỉ", "Chỉ số nguyên", "Chỉ số tự nhiên", "Số thực = hữu tỉ ∪ vô tỉ."],
          ["Số đối của −3/4 là?", "3/4", "−4/3", "4/3", "Số đối của a là −a; số đối của −3/4 là 3/4."],
          ["Giá trị tuyệt đối của −7 là?", "7", "-7", "0", "|−7| = 7."],
          ["Số nào lớn hơn?", "0,5", "0,45", "0,05", "So sánh phần thập phân: 0,5 > 0,45 > 0,05."],
          ["Làm tròn số 3,14159 đến hàng phần trăm được?", "3,14", "3,15", "3,1", "Chữ số sau hàng phần trăm là 1 < 5 nên giữ nguyên: 3,14."],
          ["Số 0,121212… là số thập phân nào?", "Vô hạn tuần hoàn", "Hữu hạn", "Vô hạn không tuần hoàn", "Phần 12 được lặp lại mãi nên đây là số thập phân vô hạn tuần hoàn."],
          ["Chu kì của số thập phân 0,272727… là bao nhiêu?", "27", "2", "7", "Phần lặp lại là 27 nên chu kì của số là 27."],
          ["Căn bậc hai số học của 36 là bao nhiêu?", "6", "12", "18", "6 nhân 6 bằng 36 và 6 là số không âm nên đáp án là 6."],
          ["Căn bậc hai số học của 81 là bao nhiêu?", "9", "-9", "27", "9 nhân 9 bằng 81 và căn bậc hai số học luôn là số không âm."],
          ["Số nào sau đây là số vô tỉ?", "Số π", "Số 3,14", "Số 22/7", "Số π là số thập phân vô hạn không tuần hoàn nên là số vô tỉ."],
          ["Số nào sau đây là số hữu tỉ?", "0,75", "√3", "Số π", "0,75 viết được dưới dạng phân số nên là số hữu tỉ."],
          ["Số đối của 5 là số nào?", "-5", "5", "1/5", "Hai số đối nhau có tổng bằng 0 nên số đối của 5 là -5."],
          ["Số đối của -1,5 là số nào?", "1,5", "-1,5", "0", "Đổi dấu của -1,5 ta được số đối là 1,5."],
          ["Giá trị tuyệt đối của -2,5 bằng bao nhiêu?", "2,5", "-2,5", "0", "Giá trị tuyệt đối là khoảng cách từ điểm đó đến 0 nên bằng 2,5."],
          ["Giá trị tuyệt đối của số 0 bằng bao nhiêu?", "0", "1", "10", "Số 0 cách gốc tọa độ 0 đơn vị nên giá trị tuyệt đối của nó bằng 0."],
          ["Tập hợp các số thực được kí hiệu bằng chữ cái nào?", "R", "Q", "N", "R là kí hiệu tập hợp số thực, Q là số hữu tỉ và N là số tự nhiên."],
          ["Số 0,125 là số thập phân nào?", "Hữu hạn", "Vô hạn tuần hoàn", "Vô hạn không tuần hoàn", "Số 0,125 chỉ có ba chữ số sau dấu phẩy nên là số thập phân hữu hạn."],
          ["Phân số 1/3 viết dưới dạng số thập phân là số nào?", "0,333…", "0,3", "0,33", "1 chia 3 được 0,333… với chữ số 3 lặp lại vô hạn."],
          ["Mỗi số thực được biểu diễn bởi bao nhiêu điểm trên trục số?", "Một điểm", "Hai điểm", "Không có điểm nào", "Mỗi số thực ứng với đúng một điểm trên trục số thực."],
          ["Trên trục số, số -2 nằm ở đâu so với số -5?", "Bên phải số -5", "Bên trái số -5", "Trùng với số -5", "Số lớn hơn nằm ở bên phải nên -2 nằm bên phải -5."],
          ["Số nào nhỏ hơn trong hai số -0,5 và 0?", "-0,5", "0", "Hai số bằng nhau", "Số âm luôn nhỏ hơn 0 nên -0,5 nhỏ hơn 0."],
          ["Làm tròn số 2,718 đến hàng phần mười được kết quả nào?", "2,7", "2,8", "2,72", "Chữ số hàng phần trăm là 1, nhỏ hơn 5 nên làm tròn xuống thành 2,7."],
          ["Làm tròn số 15,67 đến hàng đơn vị được kết quả nào?", "16", "15", "15,7", "Phần thập phân 0,67 lớn hơn 0,5 nên làm tròn lên thành 16."],
          ["Làm tròn số 48,72 đến hàng chục được kết quả nào?", "50", "40", "49", "Chữ số hàng đơn vị là 8 nên 48,72 được làm tròn lên thành 50."],
          ["Số thập phân 0,454545… có chu kì là bao nhiêu?", "45", "4", "5", "Phần lặp lại là 45 nên chu kì của số là 45."]
        ], [["√2","Số vô tỉ"],["0,333…","Tuần hoàn"],["|−7|","7"],["√25","5"],
        ["Chu kì", "Phần lặp lại trong số thập phân tuần hoàn"],
        ["Giá trị tuyệt đối của -4", "4"],
        ["Làm tròn 7,86 đến hàng phần mười", "7,9"]], "Nối cho đúng nhé!") },
      { id:"m7-goc", emoji:"📐", name:"Chương III: Góc và đường song song", sub:"Bài 8–11 • Góc đặc biệt, tiên đề Euclid", pools: knowledgePools([
          ["Hai góc kề bù có tổng số đo bằng bao nhiêu?", "180°", "90°", "360°", "Hai góc kề bù tổng bằng 180°."],
          ["Hai góc đối đỉnh thì thế nào?", "Bằng nhau", "Bù nhau", "Phụ nhau", "Hai góc đối đỉnh bằng nhau."],
          ["Tia phân giác của một góc là tia như thế nào?", "Chia góc thành hai góc bằng nhau", "Vuông góc với cạnh góc", "Đối của một cạnh", "Tia phân giác nằm trong góc và chia góc thành hai phần bằng nhau."],
          ["Dấu hiệu nhận biết hai đường thẳng song song: cặp góc so le trong thế nào?", "Bằng nhau thì song song", "Bù nhau thì song song", "Không liên quan", "Nếu hai góc so le trong bằng nhau thì hai đường thẳng song song."],
          ["Theo tiên đề Euclid, qua một điểm ngoài đường thẳng có mấy đường song song với đường đó?", "Đúng một đường", "Vô số đường", "Không có đường nào", "Tiên đề Euclid: chỉ có duy nhất một đường thẳng song song."],
          ["Hai đường thẳng song song bị cắt bởi một cát tuyến, cặp góc đồng vị thế nào?", "Bằng nhau", "Bù nhau", "Bằng một nửa nhau", "Các cặp góc đồng vị bằng nhau khi hai đường thẳng song song."],
          ["Góc vuông có số đo bao nhiêu?", "90°", "180°", "45°", "Góc vuông = 90°."],
          ["Một góc bằng 35°, góc phụ của nó (tổng 90°) bằng bao nhiêu?", "55°", "145°", "65°", "90° − 35° = 55°."],
          ["Hai góc kề nhau có đặc điểm nào sau đây?", "Chung một cạnh và không có điểm trong chung", "Không có đỉnh chung", "Chung cả hai cạnh", "Hai góc kề nhau có chung đỉnh, chung một cạnh và không có điểm trong chung."],
          ["Góc bẹt có số đo bằng bao nhiêu?", "180°", "90°", "360°", "Góc bẹt có hai cạnh là hai tia đối nhau và có số đo 180°."],
          ["Góc có số đo 60° là góc gì?", "Góc nhọn", "Góc tù", "Góc bẹt", "Góc có số đo nhỏ hơn 90° là góc nhọn."],
          ["Góc có số đo 120° là góc gì?", "Góc tù", "Góc nhọn", "Góc vuông", "Góc lớn hơn 90° và nhỏ hơn 180° là góc tù."],
          ["Một góc có số đo 80°, tia phân giác chia góc đó thành hai góc, mỗi góc bằng bao nhiêu?", "40°", "80°", "20°", "Tia phân giác chia góc thành hai góc bằng nhau, mỗi góc là 80° chia 2 bằng 40°."],
          ["Hai góc kề bù, một góc bằng 110° thì góc còn lại bằng bao nhiêu?", "70°", "110°", "90°", "Hai góc kề bù có tổng 180° nên góc còn lại là 180° trừ 110° bằng 70°."],
          ["Hai góc phụ nhau có tổng số đo bằng bao nhiêu?", "90°", "180°", "360°", "Hai góc phụ nhau là hai góc có tổng số đo bằng 90°."],
          ["Kí hiệu nào cho biết đường thẳng a song song với đường thẳng b?", "a // b", "a ⊥ b", "a = b", "Kí hiệu // dùng cho hai đường thẳng song song, còn ⊥ dùng cho vuông góc."],
          ["Hai đường thẳng cắt một đường thẳng tạo thành cặp góc trong cùng phía bù nhau thì hai đường thẳng đó thế nào?", "Song song với nhau", "Vuông góc với nhau", "Trùng nhau", "Cặp góc trong cùng phía bù nhau là một dấu hiệu nhận biết hai đường thẳng song song."],
          ["Hai đường thẳng song song bị một đường thẳng cắt, một góc trong cùng phía bằng 100° thì góc trong cùng phía còn lại bằng bao nhiêu?", "80°", "100°", "90°", "Với hai đường thẳng song song, hai góc trong cùng phía bù nhau nên góc còn lại là 80°."],
          ["Trong một định lí, phần được cho biết gọi là gì?", "Giả thiết", "Kết luận", "Chứng minh", "Phần đã cho trong định lí gọi là giả thiết của định lí."],
          ["Trong một định lí, điều cần suy ra gọi là gì?", "Kết luận", "Giả thiết", "Định nghĩa", "Điều cần suy ra trong định lí gọi là kết luận của định lí."],
          ["Hai đường thẳng vuông góc với nhau tạo thành góc có số đo bao nhiêu?", "90°", "180°", "60°", "Hai đường thẳng vuông góc tạo thành góc vuông có số đo 90°."],
          ["Góc bù với góc 90° có số đo bằng bao nhiêu?", "90°", "0°", "180°", "Hai góc bù nhau có tổng 180° nên góc cần tìm là 180° trừ 90° bằng 90°."],
          ["Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó có quan hệ gì với đường thẳng còn lại?", "Cũng vuông góc với đường còn lại", "Song song với đường còn lại", "Trùng với đường còn lại", "Đường thẳng vuông góc với một đường trong hai đường song song thì cũng vuông góc với đường kia."],
          ["Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì chúng có quan hệ gì với nhau?", "Song song với nhau", "Vuông góc với nhau", "Cắt nhau tại một điểm", "Hai đường thẳng phân biệt cùng song song với một đường thứ ba thì song song với nhau."],
          ["Tia Ot là tia phân giác của góc xOy thì góc xOt có quan hệ gì với góc xOy?", "Bằng nửa góc xOy", "Bằng góc xOy", "Gấp đôi góc xOy", "Tia phân giác chia góc thành hai phần bằng nhau nên góc xOt bằng nửa góc xOy."],
          ["Chứng minh một định lí là làm công việc gì?", "Dùng lập luận để khẳng định định lí đúng", "Vẽ hình cho định lí", "Đo các góc trong hình vẽ", "Chứng minh định lí là dùng lập luận từ giả thiết để khẳng định kết luận là đúng."],
          ["Hai đường thẳng song song phân biệt có bao nhiêu điểm chung?", "Không có điểm chung", "Một điểm chung", "Vô số điểm chung", "Hai đường thẳng song song phân biệt không cắt nhau nên không có điểm chung."],
          ["Định lí thường được phát biểu dưới dạng câu nào?", "Nếu … thì …", "Vì … nên …", "Hỏi … đáp …", "Định lí thường có dạng nếu thì, sau chữ nếu là giả thiết và sau chữ thì là kết luận."]
        ], [["Góc kề bù","180°"],["Góc đối đỉnh","Bằng nhau"],["Góc vuông","90°"],["Tia phân giác","Chia đôi góc"],
        ["Giả thiết", "Phần được cho biết trong định lí"],
        ["Kết luận", "Điều cần suy ra trong định lí"],
        ["Góc nhọn", "Góc có số đo nhỏ hơn 90°"]], "Nối khái niệm với ý đúng nhé!") },
      { id:"m7-tamgiac", emoji:"🔺", name:"Chương IV: Tam giác bằng nhau", sub:"Bài 12–16 • Các trường hợp bằng nhau, tam giác cân", pools: knowledgePools([
          ["Tổng ba góc trong một tam giác bằng bao nhiêu?", "180°", "90°", "360°", "Tổng ba góc trong tam giác luôn bằng 180°."],
          ["Trường hợp bằng nhau thứ nhất của tam giác (c.c.c) là gì?", "Ba cạnh tương ứng bằng nhau", "Ba góc bằng nhau", "Một cạnh và một góc bằng nhau", "c.c.c: cạnh – cạnh – cạnh tương ứng bằng nhau."],
          ["Tam giác cân là tam giác có đặc điểm gì?", "Có hai cạnh bằng nhau", "Có ba cạnh bằng nhau", "Có một góc vuông", "Tam giác cân có hai cạnh bên bằng nhau, hai góc ở đáy bằng nhau."],
          ["Tam giác có các góc 90°, 45°, 45° là tam giác gì?", "Vuông cân", "Đều", "Tù", "Vừa có góc vuông vừa có hai góc bằng nhau nên là vuông cân."],
          ["Đường trung trực của đoạn thẳng là đường thế nào?", "Vuông góc với đoạn thẳng tại trung điểm", "Song song với đoạn thẳng", "Đi qua một đầu mút", "Trung trực vuông góc tại trung điểm của đoạn thẳng."],
          ["Hai tam giác vuông bằng nhau theo trường hợp nào nếu có cạnh huyền và một cạnh góc vuông bằng nhau?", "Cạnh huyền – cạnh góc vuông", "Chỉ góc – góc", "Không bằng nhau được", "Trường hợp cạnh huyền – cạnh góc vuông dành riêng cho tam giác vuông."],
          ["Một tam giác có hai góc 60° và 70°, góc còn lại bằng bao nhiêu?", "50°", "60°", "130°", "180° − 60° − 70° = 50°."],
          ["Điểm nằm trên đường trung trực của đoạn thẳng thì thế nào?", "Cách đều hai đầu mút của đoạn thẳng", "Gần đầu mút trái hơn", "Thuộc đoạn thẳng", "Mọi điểm trên trung trực cách đều hai đầu đoạn thẳng."],
          ["Một tam giác có hai góc đo được 90° và 60° thì góc còn lại bằng bao nhiêu?", "30°", "40°", "150°", "Tổng ba góc là 180° nên góc còn lại là 180° trừ 90° trừ 60° bằng 30°."],
          ["Trường hợp bằng nhau góc – cạnh – góc của tam giác được viết tắt là gì?", "g.c.g", "c.c.c", "c.g.c", "Góc – cạnh – góc viết tắt theo đúng thứ tự là g.c.g."],
          ["Hai tam giác bằng nhau theo trường hợp c.g.c khi chúng có yếu tố nào bằng nhau?", "Hai cạnh và góc xen giữa", "Ba cạnh", "Ba góc", "Trường hợp c.g.c cần hai cạnh và góc xen giữa tương ứng bằng nhau."],
          ["Trong một tam giác vuông, tổng số đo hai góc nhọn bằng bao nhiêu?", "90°", "180°", "60°", "Góc vuông là 90° nên hai góc nhọn còn lại có tổng là 180° trừ 90° bằng 90°."],
          ["Trong tam giác cân, hai góc ở đáy có quan hệ gì với nhau?", "Bằng nhau", "Bù nhau", "Hơn kém nhau 90°", "Tam giác cân có hai góc ở đáy bằng nhau."],
          ["Tam giác cân có góc ở đỉnh bằng 100° thì mỗi góc ở đáy bằng bao nhiêu?", "40°", "80°", "100°", "Hai góc ở đáy bằng nhau và có tổng 80° nên mỗi góc bằng 40°."],
          ["Mỗi góc của một tam giác đều bằng bao nhiêu?", "60°", "90°", "45°", "Ba góc của tam giác đều bằng nhau và có tổng 180° nên mỗi góc là 60°."],
          ["Tam giác đều có bao nhiêu cạnh bằng nhau?", "Ba cạnh", "Hai cạnh", "Không có cạnh nào", "Tam giác đều là tam giác có ba cạnh bằng nhau."],
          ["Đường trung trực của một đoạn thẳng luôn đi qua điểm nào của đoạn thẳng đó?", "Trung điểm", "Một đầu mút", "Một điểm ngoài đoạn thẳng", "Đường trung trực đi qua trung điểm và vuông góc với đoạn thẳng."],
          ["Trong tam giác vuông cân, hai cạnh góc vuông có quan hệ gì với nhau?", "Bằng nhau", "Một cạnh gấp đôi cạnh kia", "Một cạnh vuông góc với cạnh huyền", "Tam giác vuông cân có hai cạnh góc vuông bằng nhau."],
          ["Hai tam giác vuông có cạnh huyền và một góc nhọn tương ứng bằng nhau thì hai tam giác đó thế nào?", "Bằng nhau", "Không bằng nhau", "Chỉ giống nhau về hình dạng", "Đây là trường hợp bằng nhau cạnh huyền – góc nhọn của tam giác vuông."],
          ["Góc ngoài của một tam giác bằng tổng của hai góc nào?", "Hai góc trong không kề với nó", "Hai góc trong kề với nó", "Cả ba góc trong", "Góc ngoài của tam giác bằng tổng hai góc trong không kề với nó."],
          ["Một tam giác có hai góc bằng 60° và 60° thì góc còn lại bằng bao nhiêu?", "60°", "120°", "90°", "Góc còn lại là 180° trừ 60° trừ 60° bằng 60°."],
          ["Hai tam giác bằng nhau thì các cạnh tương ứng có quan hệ gì với nhau?", "Bằng nhau", "Bù nhau", "Hơn nhau 10 cm", "Hai tam giác bằng nhau có các cạnh tương ứng bằng nhau."],
          ["Hai tam giác bằng nhau thì các góc tương ứng có quan hệ gì với nhau?", "Bằng nhau", "Phụ nhau", "Bù nhau", "Hai tam giác bằng nhau có các góc tương ứng bằng nhau."],
          ["Một tam giác có hai góc bằng nhau thì tam giác đó là tam giác gì?", "Tam giác cân", "Tam giác vuông", "Tam giác tù", "Tam giác có hai góc bằng nhau là tam giác cân."],
          ["Điểm cách đều hai đầu mút của một đoạn thẳng thì nằm trên đường nào?", "Đường trung trực của đoạn thẳng", "Đường thẳng qua một đầu mút", "Một đường tròn bất kì", "Điểm cách đều hai đầu mút của đoạn thẳng nằm trên đường trung trực của đoạn thẳng đó."],
          ["Tam giác vuông có một góc nhọn bằng 30° thì góc nhọn còn lại bằng bao nhiêu?", "60°", "30°", "150°", "Hai góc nhọn của tam giác vuông phụ nhau nên góc còn lại là 90° trừ 30° bằng 60°."],
          ["Tam giác ABC bằng tam giác DEF theo đúng thứ tự đỉnh tương ứng thì cạnh AB bằng cạnh nào?", "DE", "EF", "FD", "Đỉnh A ứng với D và đỉnh B ứng với E nên cạnh AB bằng cạnh DE."],
          ["Góc ngoài của một tam giác bằng 130°, một góc trong không kề với nó bằng 60° thì góc trong không kề còn lại bằng bao nhiêu?", "70°", "60°", "130°", "Góc ngoài bằng tổng hai góc trong không kề nên góc còn lại là 130° trừ 60° bằng 70°."]
        ], [["Tổng ba góc tam giác","180°"],["Tam giác cân","Hai cạnh bằng nhau"],["c.c.c","Ba cạnh bằng nhau"],["Trung trực","Vuông góc tại trung điểm"],
        ["Tam giác đều", "Ba góc đều bằng 60°"],
        ["Góc ngoài của tam giác", "Góc kề bù với một góc trong"],
        ["Trường hợp g.c.g", "Góc – cạnh – góc"]], "Nối cho đúng nhé!") },
      { id:"m7-dulieu", emoji:"📊", name:"Chương V: Dữ liệu và biểu đồ", sub:"Bài 17–19 • Biểu đồ quạt, biểu đồ đoạn thẳng", pools:{ choose:[g7ChartRead, function(){ return mcqQ("Trong biểu đồ hình quạt tròn, cả hình tròn tương ứng với bao nhiêu phần trăm?", ["50%","25%"], "100%", "Cả hình quạt tròn là 100%.", null); }, function(){ return mcqQ("Dữ liệu nào là dữ liệu định lượng (số liệu)?", ["Màu sắc yêu thích","Tên học sinh"], "Chiều cao của học sinh (cm)", "Số liệu đo được (chiều cao) là dữ liệu định lượng."); }], blank:[], match:[], games:[gSortNumsFactory(50)] } },
      { id:"m7-tile", emoji:"⚖️", name:"Chương VI: Tỉ lệ thức, đại lượng tỉ lệ", sub:"Bài 20–23 • Tỉ lệ thuận, tỉ lệ nghịch", pools:{ choose:[g7Ratio, function(){ var k=rand(2,5), x=rand(2,8); return calcMCQ("Đại lượng tỉ lệ thuận y = "+k+"x","x = "+x+" thì y = ?", k*x, 0, 100, "y = "+k+" × "+x+" = "+(k*x)+"."); }, function(){ return mcqQ("Hai đại lượng tỉ lệ nghịch thì tích của chúng thế nào?", ["Thay đổi theo x","Bằng thương không đổi"], "Không đổi (hằng số)", "x·y = a (không đổi) với đại lượng tỉ lệ nghịch."); }], blank:[qBlankCalcFactory(60)], match:[], games:[gTFCalcFactory(60)] } },
      { id:"m7-dathuc", emoji:"🔣", name:"Chương VII: Biểu thức đại số, đa thức", sub:"Bài 24–28 • Đa thức một biến", pools:{ choose:[g7ExprVal, g7PolyAdd, function(){ var a=rand(2,5), b=rand(2,5); return calcMCQ("Nhân đa thức",""+a+"x · "+b+"x — hệ số là?", a*b, 0, 60, a+"x · "+b+"x = "+(a*b)+"x²."); }], blank:[qBlankCalcFactory(40)], match:[], games:[gMemCalcFactory(40), gTFCalcFactory(40)] } },
      { id:"m7-xacsuat", emoji:"🎲", name:"Chương VIII: Biến cố và xác suất", sub:"Bài 29–30 • Biến cố, xác suất của biến cố", pools:{ choose:[g7Prob, function(){ return mcqQ("Biến cố “Ngày mai, mặt trời mọc ở phía Đông” là biến cố gì?", ["Biến cố ngẫu nhiên","Biến cố không thể"], "Biến cố chắc chắn", "Mặt trời luôn mọc phía Đông nên là biến cố chắc chắn."); }, function(){ return mcqQ("Gieo một con xúc xắc cân đối. Xác suất xuất hiện mặt 6 chấm là?", ["1/2","5/6"], "1/6", "Có 6 mặt đồng khả năng, 1 mặt thuận lợi: 1/6."); }], blank:[], match:[], games:[factsTF([["Gieo xúc xắc được mặt 7 chấm là biến cố không thể","Đúng","Sai",null],["Xác suất của biến cố chắc chắn bằng 1","Đúng","Sai",null],["Xác suất luôn nằm từ 0 đến 1","Đúng","Sai",null]])] } },
      { id:"m7-quanhe-tg", emoji:"📏", name:"Chương IX: Quan hệ trong tam giác", sub:"Bài 31–35 • Góc–cạnh, đường xiên, đồng quy", pools: knowledgePools([
          ["Trong một tam giác, cạnh đối diện với góc lớn nhất là cạnh thế nào?", "Cạnh lớn nhất", "Cạnh nhỏ nhất", "Bằng cạnh còn lại", "Góc lớn hơn đối diện với cạnh lớn hơn."],
          ["Bộ ba độ dài nào tạo thành một tam giác?", "3 cm, 4 cm, 5 cm", "1 cm, 2 cm, 10 cm", "2 cm, 2 cm, 5 cm", "Bất đẳng thức tam giác: tổng hai cạnh bất kì lớn hơn cạnh còn lại. 3 + 4 > 5."],
          ["Đường vuông góc và đường xiên kẻ từ một điểm ngoài đường thẳng, đường nào ngắn nhất?", "Đường vuông góc", "Đường xiên", "Bằng nhau", "Đường vuông góc là khoảng cách ngắn nhất."],
          ["Ba đường trung tuyến của tam giác cắt nhau tại đâu?", "Trọng tâm của tam giác", "Trực tâm", "Tâm đường tròn ngoại tiếp", "Ba trung tuyến đồng quy tại trọng tâm."],
          ["Giao điểm ba đường cao của tam giác gọi là gì?", "Trực tâm", "Trọng tâm", "Tâm nội tiếp", "Ba đường cao đồng quy tại trực tâm."],
          ["Trọng tâm cách đỉnh của tam giác theo tỉ lệ nào trên trung tuyến?", "2/3 độ dài trung tuyến", "1/2 độ dài", "1/4 độ dài", "Trọng tâm chia trung tuyến theo tỉ lệ 2:1, phần gần đỉnh bằng 2/3."],
          ["Trong tam giác, tổng hai cạnh bất kì so với cạnh còn lại thế nào?", "Lớn hơn", "Nhỏ hơn", "Bằng", "Bất đẳng thức tam giác."],
          ["Ba đường phân giác trong tam giác đồng quy tại điểm cách đều gì?", "Cách đều ba cạnh của tam giác", "Cách đều ba đỉnh", "Cách đều ba trung điểm", "Giao điểm ba phân giác (tâm nội tiếp) cách đều ba cạnh."],
          ["Trong một tam giác, đối diện với cạnh dài hơn là góc có đặc điểm gì?", "Góc lớn hơn", "Góc nhỏ hơn", "Góc vuông", "Trong cùng một tam giác, cạnh dài hơn đối diện với góc lớn hơn."],
          ["Hai đường xiên bằng nhau kẻ từ một điểm ngoài đường thẳng thì hai hình chiếu của chúng thế nào?", "Bằng nhau", "Khác nhau", "Một hình chiếu gấp đôi hình chiếu kia", "Hai đường xiên bằng nhau thì hai hình chiếu của chúng bằng nhau."],
          ["Bộ ba độ dài 2 cm, 3 cm, 6 cm có thể là ba cạnh của một tam giác không?", "Không", "Có", "Có nếu là tam giác vuông", "2 cộng 3 bằng 5, nhỏ hơn 6 nên không thỏa mãn bất đẳng thức tam giác."],
          ["Bộ ba độ dài 5 cm, 6 cm, 10 cm có thể là ba cạnh của một tam giác không?", "Có", "Không", "Có nếu là tam giác cân", "5 cộng 6 bằng 11, lớn hơn 10 nên bộ ba này thỏa mãn bất đẳng thức tam giác."],
          ["Một tam giác có hai cạnh dài 4 cm và 7 cm thì cạnh còn lại phải lớn hơn độ dài nào?", "3 cm", "11 cm", "7 cm", "Cạnh còn lại phải lớn hơn hiệu 7 trừ 4 bằng 3 cm và nhỏ hơn tổng 11 cm."],
          ["Đường trung tuyến của tam giác là đoạn thẳng nối một đỉnh với điểm nào?", "Trung điểm của cạnh đối diện", "Một đỉnh còn lại", "Chân đường vuông góc", "Đường trung tuyến của tam giác nối một đỉnh với trung điểm của cạnh đối diện."],
          ["Một đường trung tuyến của tam giác dài 9 cm thì đoạn từ đỉnh đến trọng tâm dài bao nhiêu?", "6 cm", "3 cm", "9 cm", "Trọng tâm nằm cách đỉnh hai phần ba trung tuyến nên đoạn đó là 9 nhân 2/3 bằng 6 cm."],
          ["Một đường trung tuyến dài 12 cm thì đoạn từ trọng tâm đến trung điểm của cạnh đối diện dài bao nhiêu?", "4 cm", "8 cm", "12 cm", "Đoạn từ trọng tâm đến trung điểm bằng một phần ba trung tuyến, tức 12 chia 3 bằng 4 cm."],
          ["Ba đường phân giác trong của một tam giác cắt nhau tại bao nhiêu điểm?", "Một điểm", "Hai điểm", "Ba điểm", "Ba đường phân giác của một tam giác đồng quy tại một điểm."],
          ["Giao điểm của ba đường trung trực trong tam giác cách đều ba điểm nào?", "Ba đỉnh của tam giác", "Ba cạnh của tam giác", "Ba trung điểm các cạnh", "Điểm đồng quy của ba đường trung trực cách đều ba đỉnh của tam giác."],
          ["Đường cao của tam giác là đoạn thẳng có đặc điểm gì?", "Kẻ từ đỉnh và vuông góc với cạnh đối diện", "Nối hai trung điểm", "Chia đôi một cạnh bên", "Đường cao kẻ từ một đỉnh và vuông góc với đường thẳng chứa cạnh đối diện."],
          ["Trực tâm của một tam giác vuông nằm ở đâu?", "Tại đỉnh góc vuông", "Ngoài tam giác", "Tại trung điểm cạnh huyền", "Hai cạnh góc vuông cũng là hai đường cao nên trực tâm chính là đỉnh góc vuông."],
          ["Trực tâm của một tam giác tù nằm ở vị trí nào?", "Ngoài tam giác", "Trong tam giác", "Tại đỉnh góc tù", "Trong tam giác tù, các đường cao kéo dài cắt nhau ở ngoài tam giác nên trực tâm nằm ngoài."],
          ["Trong tam giác cân, đường trung tuyến ứng với cạnh đáy còn là đường nào?", "Đường cao ứng với cạnh đáy", "Đường nối hai đỉnh", "Đường song song với cạnh bên", "Trong tam giác cân, trung tuyến ứng với cạnh đáy cũng là đường cao và đường phân giác."],
          ["Trong tam giác ABC, góc B bằng 70° và góc C bằng 50°. Cạnh AC và cạnh AB thế nào?", "AC dài hơn AB", "AB dài hơn AC", "AC bằng AB", "Cạnh AC đối diện góc B lớn hơn nên AC dài hơn cạnh AB đối diện góc C."],
          ["Khoảng cách từ một điểm đến một đường thẳng là độ dài của đoạn nào?", "Đoạn vuông góc kẻ từ điểm đó đến đường thẳng", "Một đoạn xiên bất kì", "Đoạn song song với đường thẳng", "Khoảng cách là độ dài đoạn vuông góc, cũng là đoạn ngắn nhất từ điểm đến đường thẳng."],
          ["Trong một tam giác, hiệu độ dài hai cạnh bất kì so với cạnh còn lại thì thế nào?", "Nhỏ hơn cạnh còn lại", "Lớn hơn cạnh còn lại", "Bằng cạnh còn lại", "Theo bất đẳng thức tam giác, hiệu độ dài hai cạnh luôn nhỏ hơn cạnh còn lại."],
          ["Một tam giác có bao nhiêu đường trung tuyến?", "Ba đường", "Một đường", "Sáu đường", "Mỗi đỉnh của tam giác có một đường trung tuyến nên tam giác có ba đường trung tuyến."],
          ["Trực tâm của một tam giác nhọn nằm ở vị trí nào?", "Trong tam giác", "Ngoài tam giác", "Tại một đỉnh của tam giác", "Cả ba đường cao của tam giác nhọn cắt nhau tại một điểm nằm trong tam giác."],
          ["Trong hai đường xiên kẻ từ một điểm ngoài đường thẳng, đường xiên lớn hơn thì hình chiếu của nó thế nào?", "Hình chiếu lớn hơn", "Hình chiếu nhỏ hơn", "Hình chiếu bằng nhau", "Đường xiên lớn hơn thì có hình chiếu lớn hơn."]
        ], [["Ba trung tuyến","Trọng tâm"],["Ba đường cao","Trực tâm"],["Đường ngắn nhất","Đường vuông góc"],["Bất đẳng thức tam giác","Tổng 2 cạnh > cạnh còn lại"],
        ["Khoảng cách từ một điểm đến đường thẳng", "Độ dài đoạn vuông góc kẻ từ điểm đó"],
        ["Trực tâm của tam giác vuông", "Đỉnh góc vuông"],
        ["Cạnh đối diện với góc lớn hơn", "Cạnh dài hơn"]], "Nối cho đúng nhé!") },
      { id:"m7-hinhkhoi", emoji:"🧊", name:"Chương X: Hình khối trong thực tiễn", sub:"Bài 36–37 • Hộp chữ nhật, lập phương, lăng trụ đứng", pools:{ choose:[g7BoxVol, function(){ var a=rand(2,8); return calcMCQ("Hình lập phương cạnh "+a+" cm","Thể tích V = ?", a*a*a, 0, 600, "V = a³ = "+a+"³ = "+(a*a*a)+" cm³."); }, function(){ var a=rand(2,6),b=rand(2,6); return calcMCQ("Diện tích xung quanh hình hộp","Sxq với chu vi đáy "+(2*(a+b))+" cm, chiều cao 5 cm — Sxq = ?", 2*(a+b)*5, 0, 400, "Sxq = chu vi đáy × chiều cao = "+(2*(a+b))+" × 5 = "+(2*(a+b)*5)+" cm²."); }], blank:[], match:[], games:[gMemCalcFactory(100)] } }
    ];
    /* ================= NGỮ VĂN 7 ================= */
    var NV7_TOPICS = [
      topic("nv1","🌤️","Bài 1: Bầu trời tuổi thơ","Bẩy chim chìa vôi • Đi lấy mật • Ngàn sao làm việc",[
        ["Tác giả truyện “Bẩy chim chìa vôi” là ai?", "Nguyễn Quang Thiều", "Đoàn Giỏi", "Võ Quảng", "“Bẩy chim chìa vôi” của Nguyễn Quang Thiều."],
        ["“Đi lấy mật” trích từ tác phẩm nào?", "Đất rừng phương Nam", "Dế Mèn phiêu lưu kí", "Tắt đèn", "Đi lấy mật trích Đất rừng phương Nam của Đoàn Giỏi."],
        ["Bài thơ “Ngàn sao làm việc” của tác giả nào?", "Võ Quảng", "Thanh Hải", "Tế Hanh", "Ngàn sao làm việc — Võ Quảng."],
        ["Chủ đề chung của Bài 1 là gì?", "Bầu trời tuổi thơ", "Giai điệu đất nước", "Thế giới viễn tưởng", "Bài 1 có chủ điểm “Bầu trời tuổi thơ”."],
        ["“Bẩy chim chìa vôi” thuộc thể loại nào?", "Truyện ngắn", "Thơ lục bát", "Kịch", "Đây là truyện ngắn viết về tuổi thơ và thiên nhiên."],
        ["Nhân vật chính trong “Đi lấy mật” cùng ai vào rừng lấy mật?", "Cò", "Mái", "Tía nuôi An", "An theo tía nuôi vào rừng U Minh lấy mật (Đất rừng phương Nam)."],
        ["Hai anh em trong truyện Bẩy chim chìa vôi tên là gì?", "Mon và Mên", "An và Cò", "Tí và Tèo", "Hai anh em Mon và Mên là nhân vật chính của truyện."],
        ["Tổ chim chìa vôi trong truyện được làm ở đâu?", "Trên bãi đất giữa sông", "Trên mái nhà trong làng", "Trong rừng sâu xa", "Chim chìa vôi làm tổ trên bãi đất giữa dòng sông."],
        ["Điều gì đe dọa đàn chim non trong một đêm mưa?", "Nước sông dâng ngập tổ", "Thú dữ đến tấn công", "Người đến bắt chim", "Nước sông dâng cao có thể ngập tổ chim non."],
        ["Khi nghĩ đến đàn chim non, hai anh em có tâm trạng thế nào?", "Lo lắng và thương xót", "Vui vẻ và vô tư", "Giận dữ và bực bội", "Hai anh em lo lắng, thương đàn chim non gặp nạn."],
        ["Truyện Bẩy chim chìa vôi chủ yếu ca ngợi điều gì?", "Tình yêu thương loài vật của trẻ thơ", "Cuộc thi bắt chim của trẻ em", "Chuyến đi xa của hai anh em", "Truyện ca ngợi lòng nhân ái của trẻ thơ với loài vật."],
        ["Rừng trong văn bản Đi lấy mật thuộc vùng đất nào?", "Đất rừng U Minh", "Đất rừng Tây Nguyên", "Đất rừng Việt Bắc", "Đi lấy mật lấy bối cảnh rừng U Minh ở phương Nam."],
        ["Trong Đi lấy mật, người cha hướng dẫn An điều gì?", "Cách lấy mật ong rừng", "Cách bẫy chim rừng", "Cách đốn cây làm nhà", "Người cha dạy An cách lấy mật ong trong rừng."],
        ["Ong mật trong Đi lấy mật làm tổ ở đâu?", "Trên kèo ong trong rừng", "Trong hang đá sâu", "Dưới lòng đất ẩm", "Ong rừng làm tổ trên các kèo ong do người chuẩn bị."],
        ["Văn bản Đi lấy mật giúp người đọc hiểu thêm điều gì?", "Thiên nhiên phong phú của phương Nam", "Cuộc sống nơi phố thị", "Phong tục miền núi phía Bắc", "Văn bản gợi vẻ đẹp giàu có của thiên nhiên phương Nam."],
        ["Bài thơ Ngàn sao làm việc miêu tả khung cảnh vào lúc nào?", "Vào ban đêm trên bầu trời", "Vào buổi trưa nắng gắt", "Vào lúc bình minh sớm", "Bài thơ miêu tả bầu trời đêm đầy sao đang làm việc."],
        ["Trong Ngàn sao làm việc, các ngôi sao được miêu tả thế nào?", "Như đang chăm chỉ làm việc", "Như đang ngủ say yên giấc", "Như đang vui đùa dưới sông", "Các ngôi sao được nhân hoá như đang chăm chỉ làm việc."],
        ["Tác giả văn bản thực hành đọc Ngôi nhà trên cây là ai?", "Cư-rô-ya-na-gi Tê-sư-cô", "Nguyễn Quang Thiều", "Võ Quảng", "Ngôi nhà trên cây của tác giả Cư-rô-ya-na-gi Tê-sư-cô."],
        ["Ngôi nhà trên cây được trích từ tác phẩm nào?", "Tốt-tô-chan bên cửa sổ", "Đất rừng phương Nam", "Những ngày thơ ấu", "Văn bản trích từ Tốt-tô-chan bên cửa sổ."],
        ["Kĩ năng viết chính của Bài 1 là gì?", "Tóm tắt văn bản theo độ dài khác nhau", "Viết bài thơ năm chữ", "Viết văn bản tường trình", "Bài 1 dạy tóm tắt văn bản với độ dài khác nhau."],
        ["Khi tóm tắt văn bản, người viết cần giữ lại điều gì?", "Những ý chính của văn bản gốc", "Mọi chi tiết vụn vặt", "Lời bình luận riêng dài dòng", "Tóm tắt phải giữ được ý chính của văn bản gốc."],
        ["Muốn tóm tắt ngắn hơn, người viết cần làm gì?", "Lược bỏ thêm chi tiết phụ", "Thêm nhiều ví dụ mới", "Đổi cốt truyện của văn bản", "Tóm tắt ngắn hơn bằng cách lược bỏ chi tiết phụ."],
        ["Văn bản tóm tắt cần tránh điều gì?", "Thêm ý không có trong văn bản gốc", "Dùng câu văn ngắn gọn", "Trình bày mạch lạc rõ ràng", "Không được thêm ý ngoài văn bản gốc khi tóm tắt."],
        ["Truyện Bẩy chim chìa vôi được kể theo ngôi thứ mấy?", "Ngôi thứ ba", "Ngôi thứ nhất số nhiều", "Ngôi thứ hai", "Người kể chuyện dùng ngôi thứ ba trong truyện."],
        ["Chi tiết nước sông dâng trong truyện có tác dụng gì?", "Tạo thử thách cho lòng nhân ái", "Làm truyện thêm hài hước", "Kết thúc câu chuyện ngay lập tức", "Nước dâng tạo tình huống thử thách lòng tốt của hai anh em."],
        ["Qua Bài 1, người học được bồi dưỡng tình cảm nào?", "Yêu thiên nhiên và tuổi thơ trong sáng", "Yêu thích thi đua tranh tài", "Ham mê khám phá máy móc", "Bài 1 bồi dưỡng tình yêu thiên nhiên và tuổi thơ."]
      ], [["Bẩy chim chìa vôi","Nguyễn Quang Thiều"],["Đi lấy mật","Đoàn Giỏi"],["Ngàn sao làm việc","Võ Quảng"],["Đất rừng phương Nam","Đoàn Giỏi"],
        ["Bẩy chim chìa vôi", "Truyện về hai anh em và đàn chim non"],
        ["Đi lấy mật", "Trích Đất rừng phương Nam của Đoàn Giỏi"],
        ["Ngàn sao làm việc", "Bài thơ của Võ Quảng về bầu trời đêm"]], "Nối tác phẩm với tác giả nhé!"),
      topic("nv2","🎵","Bài 2: Khúc nhạc tâm hồn","Đồng dao mùa xuân • Gặp lá cơm nếp • Trở gió",[
        ["“Đồng dao mùa xuân” là sáng tác của ai?", "Nguyễn Khoa Điềm", "Thanh Thảo", "Nguyễn Ngọc Tư", "Đồng dao mùa xuân — Nguyễn Khoa Điềm."],
        ["“Gặp lá cơm nếp” là bài thơ của ai?", "Thanh Thảo", "Hữu Thỉnh", "Tế Hanh", "Gặp lá cơm nếp — Thanh Thảo, gợi nỗi nhớ quê nhà của người lính."],
        ["“Trở gió” là truyện ngắn của tác giả nào?", "Nguyễn Ngọc Tư", "Đoàn Giỏi", "Nam Cao", "Trở gió — Nguyễn Ngọc Tư."],
        ["Thể thơ bốn chữ / năm chữ có đặc điểm gì?", "Mỗi dòng có 4 hoặc 5 tiếng", "Mỗi dòng có 7 tiếng", "Không giới hạn số tiếng", "Thơ bốn chữ: mỗi dòng 4 tiếng; thơ năm chữ: mỗi dòng 5 tiếng."],
        ["“Đồng dao” vốn là gì?", "Bài hát dân gian của trẻ em", "Một loại nhạc cụ", "Truyện cổ tích", "Đồng dao là thơ ca dân gian gắn với trẻ em."],
        ["Bài 2 có chủ điểm là gì?", "Khúc nhạc tâm hồn", "Cội nguồn yêu thương", "Màu sắc trăm miền", "Bài 2 — Khúc nhạc tâm hồn."],
        ["Hình ảnh mùa xuân trong Đồng dao mùa xuân gắn với nhân vật nào?", "Người lính trẻ", "Người nông dân già", "Cô giáo vùng cao", "Bài thơ gắn mùa xuân với hình ảnh người lính trẻ."],
        ["Người lính trong Đồng dao mùa xuân không trở về vì lí do gì?", "Anh đã hi sinh vì đất nước", "Anh chuyển nhà đi xa", "Anh quên mất đường về", "Người lính đã hi sinh, không thể trở về quê hương."],
        ["Tình cảm tác giả dành cho người lính trong Đồng dao mùa xuân là gì?", "Biết ơn và trân trọng", "Thương hại và xa lánh", "Ngưỡng mộ quyền lực", "Tác giả bày tỏ lòng biết ơn với người lính hi sinh."],
        ["Hương lá cơm nếp trong bài thơ gợi tác giả nhớ tới ai?", "Người mẹ ở quê nhà", "Người bạn học cũ", "Người thầy đầu tiên", "Mùi lá cơm nếp gợi nhớ người mẹ và quê nhà."],
        ["Lá cơm nếp trong bài thơ là loại lá dùng để làm gì?", "Nấu cơm nếp cho thơm", "Gói bánh chưng ngày Tết", "Làm thuốc chữa bệnh", "Lá cơm nếp dùng nấu cơm nếp cho thơm ngon."],
        ["Cảm xúc chủ đạo trong Gặp lá cơm nếp là gì?", "Nỗi nhớ quê hương da diết", "Niềm vui ngày chiến thắng", "Sự hào hứng khi khám phá", "Bài thơ chan chứa nỗi nhớ quê hương da diết."],
        ["Văn bản Trở gió thuộc thể loại nào?", "Tản văn", "Truyện ngụ ngôn", "Kịch bản sân khấu", "Trở gió là tản văn của Nguyễn Ngọc Tư."],
        ["Văn bản Trở gió tập trung miêu tả sự thay đổi của điều gì?", "Làn gió mùa ở quê nhà", "Dòng sông quê hương", "Cánh đồng lúa chín vàng", "Tản văn miêu tả làn gió đổi mùa ở quê nhà."],
        ["Cảm xúc của người viết trong Trở gió gắn với điều gì?", "Nỗi nhớ nhà khi gió đổi mùa", "Niềm vui được mùa lớn", "Sự lo lắng trước bão to", "Gió đổi mùa gợi nỗi nhớ nhà trong lòng người viết."],
        ["Tác giả văn bản thực hành đọc Chiều sông Thương là ai?", "Hữu Thỉnh", "Thanh Thảo", "Nguyễn Khoa Điềm", "Chiều sông Thương là bài thơ của Hữu Thỉnh."],
        ["Sông Thương trong Chiều sông Thương chảy qua vùng đất nào?", "Vùng đất Kinh Bắc", "Vùng đất Tây Nguyên", "Vùng đất Cà Mau", "Sông Thương chảy qua vùng Kinh Bắc, nay là Bắc Giang."],
        ["Khung cảnh trong Chiều sông Thương diễn ra vào thời điểm nào?", "Buổi chiều trên sông", "Buổi trưa nắng gắt", "Đêm khuya vắng lặng", "Nhan đề cho thấy khung cảnh buổi chiều trên sông Thương."],
        ["Kĩ năng viết thứ nhất của Bài 2 là gì?", "Tập làm thơ bốn chữ hoặc năm chữ", "Viết văn bản tường trình", "Phân tích nhân vật văn học", "Bài 2 dạy tập làm thơ bốn chữ hoặc năm chữ."],
        ["Kĩ năng viết thứ hai của Bài 2 là gì?", "Viết đoạn văn ghi lại cảm xúc về bài thơ", "Viết bài văn nghị luận xã hội", "Kể lại sự việc lịch sử", "Bài 2 còn dạy viết đoạn văn ghi lại cảm xúc về thơ."],
        ["Đoạn văn ghi lại cảm xúc sau khi đọc thơ cần nêu rõ điều gì?", "Cảm xúc và lí do yêu thích bài thơ", "Tiểu sử đầy đủ của tác giả", "Số câu và số chữ của bài thơ", "Đoạn văn cần nêu cảm xúc và lí do yêu thích bài thơ."],
        ["Khi tập làm thơ, người viết cần chú ý gieo vần ở đâu?", "Ở cuối các dòng thơ", "Ở đầu mỗi đoạn văn", "Trong nhan đề bài thơ", "Vần thơ thường được gieo ở cuối các dòng thơ."],
        ["Câu mở đầu đoạn văn cảm xúc về bài thơ nên làm gì?", "Nêu ấn tượng chung về bài thơ", "Kể lại toàn bộ cốt truyện", "Liệt kê các biện pháp tu từ", "Câu mở đoạn nên nêu ấn tượng chung về bài thơ."],
        ["Hình ảnh lá cơm nếp gợi liên tưởng đến điều gì?", "Bếp quê và bữa cơm ấm cúng", "Sân trường ngày khai giảng", "Bến cảng đông vui nhộn nhịp", "Lá cơm nếp gợi nhớ bếp quê và bữa cơm ấm cúng."],
        ["Giọng văn của Trở gió có đặc điểm thế nào?", "Nhẹ nhàng, giàu cảm xúc quê nhà", "Hùng hồn và đanh thép", "Khô khan và khoa học", "Tản văn có giọng nhẹ nhàng, đậm tình quê nhà."],
        ["Qua Gặp lá cơm nếp, tình quê được gợi lên qua giác quan nào nổi bật?", "Khứu giác qua mùi lá thơm", "Thính giác qua tiếng chim", "Thị giác qua màu cờ hoa", "Mùi thơm của lá cơm nếp gợi nhớ quê qua khứu giác."]
      ], [["Đồng dao mùa xuân","Nguyễn Khoa Điềm"],["Gặp lá cơm nếp","Thanh Thảo"],["Trở gió","Nguyễn Ngọc Tư"],["Chiều sông Thương","Hữu Thỉnh"],
        ["Đồng dao mùa xuân", "Bài thơ nhớ về người lính trẻ hi sinh"],
        ["Gặp lá cơm nếp", "Bài thơ về nỗi nhớ quê của Thanh Thảo"],
        ["Trở gió", "Tản văn của Nguyễn Ngọc Tư về gió quê"]], "Nối tác phẩm với tác giả nhé!"),
      topic("nv3","🏠","Bài 3: Cội nguồn yêu thương","Vừa nhắm mắt vừa mở cửa sổ • Người thầy đầu tiên • Quê hương",[
        ["“Quê hương” là bài thơ nổi tiếng của ai?", "Tế Hanh", "Thanh Hải", "Y Phương", "Quê hương — Tế Hanh, viết về làng chài quê hương."],
        ["“Người thầy đầu tiên” là tác phẩm của nhà văn nào?", "Trin-ghi-dơ Ai-tơ-ma-tốp", "Nguyễn Ngọc Thuần", "Nguyên Hồng", "Người thầy đầu tiên của Ai-tơ-ma-tốp (Cư-rơ-gư-dơ-xtan)."],
        ["“Vừa nhắm mắt vừa mở cửa sổ” của tác giả nào?", "Nguyễn Ngọc Thuần", "Ai-tơ-ma-tốp", "Tế Hanh", "Truyện của Nguyễn Ngọc Thuần."],
        ["Câu thơ “Quê hương là chùm khế ngọt” nằm trong bài thơ nào khác nổi tiếng?", "Quê hương (Đỗ Trung Quân)", "Quê hương (Tế Hanh) — câu này không có trong bài", "Mùa xuân nho nhỏ", "Lưu ý: “Quê hương là chùm khế ngọt” là của Đỗ Trung Quân, không phải bài Quê hương của Tế Hanh trong sách."],
        ["Chủ đề chính của Bài 3 là gì?", "Cội nguồn yêu thương (gia đình, thầy cô, quê hương)", "Thế giới viễn tưởng", "Bài học cuộc sống", "Bài 3 — Cội nguồn yêu thương."],
        ["Văn bản “Trong lòng mẹ” (thực hành đọc) trích từ hồi kí nào?", "Những ngày thơ ấu (Nguyên Hồng)", "Đất rừng phương Nam", "Tắt đèn", "Trong lòng mẹ trích Những ngày thơ ấu của Nguyên Hồng."],
        ["Người cha trong Vừa nhắm mắt vừa mở cửa sổ dạy con nhận biết hoa bằng cách nào?", "Nhắm mắt và dùng tay, mũi cảm nhận", "Nhìn qua tranh ảnh màu", "Học thuộc tên khoa học", "Người cha dạy con nhắm mắt, dùng tay và mũi nhận biết hoa."],
        ["Việc nhắm mắt trong truyện giúp cậu bé cảm nhận điều gì?", "Vẻ đẹp bằng các giác quan khác", "Tiếng ồn của khu vườn", "Màu sắc rực rỡ của hoa", "Nhắm mắt giúp cậu bé cảm nhận hoa bằng nhiều giác quan."],
        ["Thông điệp của Vừa nhắm mắt vừa mở cửa sổ là gì?", "Hãy cảm nhận thiên nhiên bằng cả trái tim", "Hãy chỉ tin vào đôi mắt", "Hãy tránh xa khu vườn hoa", "Truyện khuyên cảm nhận thiên nhiên bằng cả trái tim."],
        ["Vườn hoa trong truyện do ai chăm sóc hằng ngày?", "Người cha của cậu bé", "Người hàng xóm bên cạnh", "Ông bảo vệ trường học", "Người cha tự tay trồng và chăm sóc vườn hoa."],
        ["Thầy Đuy-sen đến làng với nhiệm vụ gì?", "Mở trường dạy chữ cho trẻ em", "Xây cầu qua con suối", "Chữa bệnh cho dân làng", "Thầy Đuy-sen đến làng mở trường dạy chữ cho trẻ."],
        ["Thầy Đuy-sen giúp học trò qua con suối bằng cách nào?", "Thầy cõng từng em qua suối", "Thầy đóng bè tre lớn", "Thầy bắc cầu gỗ dài", "Thầy cõng từng học trò qua suối để đến trường."],
        ["Cô học trò An-tư-nai sau này trở thành người thế nào?", "Một viện sĩ nổi tiếng", "Một nông dân trong làng", "Một cô giáo làng nhỏ", "An-tư-nai sau này trở thành viện sĩ nổi tiếng."],
        ["Tình cảm của học trò dành cho thầy Đuy-sen là gì?", "Kính trọng và biết ơn sâu sắc", "Sợ hãi và xa cách", "Thờ ơ và lạnh nhạt", "Học trò luôn kính trọng, biết ơn thầy Đuy-sen."],
        ["Làng quê trong bài thơ Quê hương làm nghề gì?", "Nghề đánh cá ngoài biển", "Nghề trồng lúa nước", "Nghề dệt vải lụa", "Quê hương của Tế Hanh là làng chài đánh cá."],
        ["Hình ảnh con thuyền trong Quê hương được so sánh với gì?", "Con tuấn mã mạnh mẽ", "Con chim én bay nhanh", "Con rồng uốn lượn", "Thuyền được so sánh hăng như con tuấn mã."],
        ["Dân chài trong Quê hương được miêu tả có làn da thế nào?", "Da ngăm rám nắng biển", "Da trắng mịn màng", "Da hồng hào đầy đặn", "Dân chài có làn da ngăm rám nắng biển khơi."],
        ["Khi thuyền trở về, cảnh bến cá trong Quê hương thế nào?", "Ồn ào, tấp nập vui tươi", "Vắng lặng và buồn tênh", "Tối tăm và lạnh lẽo", "Bến cá ngày thuyền về ồn ào, tấp nập."],
        ["Bài thơ Quê hương được viết khi tác giả ở đâu?", "Đang học xa quê ở Huế", "Đang sống tại làng chài", "Đang đi biển đánh cá", "Tế Hanh viết Quê hương khi học xa quê ở Huế."],
        ["Nhân vật chính trong Trong lòng mẹ là ai?", "Cậu bé Hồng", "Cậu bé An", "Thầy Đuy-sen", "Trong lòng mẹ xoay quanh cậu bé Hồng nhớ mẹ."],
        ["Bé Hồng trong Trong lòng mẹ khao khát điều gì?", "Được gặp mẹ và sống bên mẹ", "Được đi học ở thành phố", "Được trở nên giàu có", "Bé Hồng khao khát được gặp mẹ, sống bên mẹ."],
        ["Người cô trong Trong lòng mẹ có thái độ thế nào với bé Hồng?", "Cay nghiệt, gieo điều xấu về mẹ", "Hiền hậu và yêu thương", "Thờ ơ, không quan tâm", "Người cô cay nghiệt, nói xấu mẹ để làm Hồng đau khổ."],
        ["Khi gặp lại mẹ, bé Hồng có cảm giác thế nào?", "Hạnh phúc, tủi hờn vỡ oà", "Bình thản như thường ngày", "Sợ hãi muốn bỏ chạy", "Gặp mẹ, bé Hồng oà khóc vì hạnh phúc và tủi hờn."],
        ["Kĩ năng viết của Bài 3 là gì?", "Phân tích đặc điểm nhân vật văn học", "Viết thơ bốn chữ", "Viết bản tường trình", "Bài 3 dạy phân tích đặc điểm nhân vật văn học."],
        ["Khi phân tích nhân vật, cần dựa vào điều gì?", "Hành động, lời nói của nhân vật", "Ngoại hình của tác giả", "Số trang của tác phẩm", "Phân tích nhân vật dựa vào hành động, lời nói nhân vật."],
        ["Phần mở bài của bài văn phân tích nhân vật cần làm gì?", "Giới thiệu nhân vật được phân tích", "Kết luận về giá trị tác phẩm", "Kể lại toàn bộ cốt truyện", "Mở bài cần giới thiệu nhân vật sẽ phân tích."]
      ], [["Quê hương","Tế Hanh"],["Người thầy đầu tiên","Ai-tơ-ma-tốp"],["Vừa nhắm mắt vừa mở cửa sổ","Nguyễn Ngọc Thuần"],["Trong lòng mẹ","Nguyên Hồng"],
        ["Quê hương", "Bài thơ về làng chài của Tế Hanh"],
        ["Người thầy đầu tiên", "Truyện về thầy Đuy-sen dạy chữ"],
        ["Trong lòng mẹ", "Đoạn trích về bé Hồng nhớ mẹ"]], "Nối tác phẩm với tác giả nhé!"),
      topic("nv4","🎶","Bài 4: Giai điệu đất nước","Mùa xuân nho nhỏ • Gò Me",[
        ["“Mùa xuân nho nhỏ” là sáng tác của ai?", "Thanh Hải", "Tế Hanh", "Thanh Thảo", "Mùa xuân nho nhỏ — Thanh Hải, viết năm 1980."],
        ["Ước nguyện trong “Mùa xuân nho nhỏ” là gì?", "Làm một mùa xuân nhỏ góp vào mùa xuân lớn của đất nước", "Trở nên giàu có", "Đi xa quê hương mãi mãi", "Nhà thơ ước làm con chim, cành hoa, nốt trầm... góp mùa xuân nhỏ cho đời."],
        ["“Gò Me” là văn bản của tác giả nào?", "Hoàng Tố Nguyên", "Vũ Bằng", "Hoàng Phủ Ngọc Tường", "Gò Me (trích) — Hoàng Tố Nguyên."],
        ["Thể loại của “Mùa xuân nho nhỏ” là gì?", "Thơ", "Truyện ngắn", "Tuỳ bút", "Đây là bài thơ trữ tình nổi tiếng."],
        ["Hình ảnh “mùa xuân nho nhỏ” tượng trưng cho điều gì?", "Sự cống hiến lặng lẽ của mỗi cá nhân cho đất nước", "Mùa xuân ở một làng nhỏ", "Thời tiết lạnh", "Mỗi người là một mùa xuân nhỏ góp thành mùa xuân lớn của dân tộc."],
        ["Bài 4 có chủ điểm là gì?", "Giai điệu đất nước", "Khúc nhạc tâm hồn", "Trang sách và cuộc sống", "Bài 4 — Giai điệu đất nước."],
        ["Mùa xuân nho nhỏ được sáng tác trong hoàn cảnh nào?", "Khi tác giả nằm trên giường bệnh", "Khi tác giả đi công tác xa", "Khi tác giả còn rất trẻ", "Thanh Hải viết bài thơ khi nằm trên giường bệnh năm 1980."],
        ["Hình ảnh mở đầu Mùa xuân nho nhỏ là gì?", "Bông hoa tím trên dòng sông xanh", "Cánh đồng lúa vàng rực", "Đỉnh núi phủ tuyết trắng", "Bài thơ mở đầu bằng bông hoa tím trên dòng sông xanh."],
        ["Con chim được nhắc ở đầu bài Mùa xuân nho nhỏ là chim gì?", "Chim chiền chiện", "Chim sơn ca", "Chim hải âu", "Đầu bài thơ nhắc tiếng hót của chim chiền chiện."],
        ["Tiếng chim chiền chiện được tác giả đón nhận ra sao?", "Đưa tay hứng giọt long lanh", "Đứng lặng ngắm mây trời", "Ghi chép vào cuốn sổ tay", "Tác giả đưa tay hứng từng giọt long lanh tiếng chim."],
        ["Mùa xuân của đất nước trong bài thơ gắn với hình ảnh nào?", "Người cầm súng, người ra đồng", "Người đi biển, người lên rừng", "Người buôn bán, người thợ xây", "Bài thơ gắn mùa xuân với người cầm súng, người ra đồng."],
        ["Câu thơ về mùa xuân người ra đồng nhắc đến hình ảnh nào?", "Lộc trải dài trên nương mạ", "Hoa nở trắng trên cành cây", "Mưa rơi nhẹ trên mái nhà", "Mùa xuân người ra đồng, lộc trải dài nương mạ."],
        ["Ở khổ cuối, tác giả ví đất nước như hình ảnh nào?", "Như vì sao cứ đi lên phía trước", "Như dòng sông chảy êm đềm", "Như cánh chim bay về tổ", "Tác giả ví đất nước như vì sao đi lên phía trước."],
        ["Bài thơ Mùa xuân nho nhỏ có giọng điệu thế nào?", "Tha thiết, trân trọng, khiêm nhường", "Hào hùng và sôi nổi", "Bi thương và tuyệt vọng", "Giọng thơ tha thiết, trân trọng và khiêm nhường."],
        ["Gò Me là vùng đất thuộc tỉnh nào ngày nay?", "Thuộc tỉnh Tiền Giang", "Thuộc tỉnh Cà Mau", "Thuộc tỉnh Đồng Tháp", "Gò Me thuộc vùng Gò Công, tỉnh Tiền Giang."],
        ["Văn bản Gò Me thuộc thể loại nào?", "Thơ", "Truyện ngắn", "Tản văn", "Gò Me là bài thơ về quê hương của Hoàng Tố Nguyên."],
        ["Văn bản Gò Me thể hiện tình cảm gì với quê hương?", "Yêu mến, tự hào về quê nghèo", "Nhớ nhung thành phố lớn", "Buồn chán nơi quê nhà", "Bài thơ thể hiện tình yêu mến, tự hào về quê hương."],
        ["Trẻ con trong Gò Me thường vui đùa ở nơi nào?", "Ở ao làng quê nhà", "Ở sân vận động lớn", "Ở bến xe trong làng", "Hình ảnh ao làng gắn với trò vui đùa của trẻ thơ."],
        ["Văn bản thứ ba của Bài 4 bàn về bài thơ nào của Nguyễn Đình Thi?", "Bài thơ Đường núi", "Bài thơ Đất nước", "Bài thơ Nhớ", "Văn bản bàn về bài thơ Đường núi của Nguyễn Đình Thi."],
        ["Tác giả bài viết về thơ Nguyễn Đình Thi trong Bài 4 là ai?", "Vũ Quần Phương", "Thanh Hải", "Hoàng Tố Nguyên", "Bài viết về thơ Nguyễn Đình Thi do Vũ Quần Phương viết."],
        ["Kĩ năng viết của Bài 4 là gì?", "Viết bài văn biểu cảm về con người, sự việc", "Viết bài văn nghị luận", "Viết văn bản tường trình", "Bài 4 dạy viết bài văn biểu cảm về con người, sự việc."],
        ["Bài văn biểu cảm cần tập trung thể hiện điều gì?", "Tình cảm chân thành với đối tượng", "Số liệu thống kê chi tiết", "Quy tắc của trò chơi", "Văn biểu cảm tập trung thể hiện tình cảm chân thành."],
        ["Khi viết văn biểu cảm về con người, nên kể thêm điều gì?", "Kỉ niệm gắn với người đó", "Danh sách thành tích dài", "Sơ đồ quan hệ gia đình", "Kỉ niệm gắn với người đó làm bài văn thêm cảm xúc."],
        ["Bài thơ Chiều biên giới miêu tả vùng đất nào?", "Vùng biên giới phía Bắc", "Vùng biển miền Trung", "Vùng đồng bằng sông Cửu Long", "Chiều biên giới miêu tả vùng biên giới phía Bắc."],
        ["Khung cảnh biên giới trong Chiều biên giới hiện lên thế nào?", "Xanh tươi, yên bình, thơ mộng", "Hoang vu và lạnh lẽo", "Đông đúc và ồn ào", "Biên giới hiện lên xanh tươi, yên bình, thơ mộng."],
        ["Chữ lộc trong Mùa xuân nho nhỏ gợi sức sống nào?", "Sức sống mới của mùa xuân", "Sức mạnh của bão tố", "Sức hút của lễ hội", "Lộc tượng trưng cho sức sống mới của mùa xuân."]
      ], [["Mùa xuân nho nhỏ","Thanh Hải"],["Gò Me","Hoàng Tố Nguyên"],["Quê hương","Tế Hanh"],["Nói với con","Y Phương"],
        ["Mùa xuân nho nhỏ", "Bài thơ của Thanh Hải viết năm 1980"],
        ["Gò Me", "Bài thơ về quê hương Tiền Giang"],
        ["Chiều biên giới", "Bài thơ của Lò Ngân Sủn"]], "Nối tác phẩm với tác giả nhé!"),
      topic("nv5","🌏","Bài 5: Màu sắc trăm miền","Tháng Giêng... • Chuyện cơm hến • Hội lồng tồng",[
        ["“Chuyện cơm hến” viết về món ăn đặc sản của vùng nào?", "Huế", "Hà Nội", "Nam Bộ", "Cơm hến là đặc sản xứ Huế (Hoàng Phủ Ngọc Tường)."],
        ["“Tháng Giêng, mơ về trăng non rét ngọt” của tác giả nào?", "Vũ Bằng", "Hoàng Phủ Ngọc Tường", "Trần Quốc Vượng", "Văn bản của Vũ Bằng, viết về tháng Giêng đất Bắc."],
        ["“Hội lồng tồng” là lễ hội của đồng bào dân tộc nào?", "Dân tộc Tày", "Dân tộc Kinh", "Dân tộc Chăm", "Lồng tồng là lễ hội xuống đồng của người Tày."],
        ["Văn bản tường trình dùng để làm gì?", "Trình bày lại một sự việc đã xảy ra cho cấp trên / cơ quan biết", "Bày tỏ cảm xúc cá nhân", "Kể chuyện tưởng tượng", "Tường trình là văn bản hành chính trình bày sự việc khách quan."],
        ["Chủ điểm của Bài 5 là gì?", "Màu sắc trăm miền", "Bầu trời tuổi thơ", "Hoà điệu với tự nhiên", "Bài 5 — Màu sắc trăm miền, về văn hoá các vùng miền."],
        ["“Chuyện cơm hến” thuộc kiểu văn bản nào?", "Tuỳ bút / tản văn", "Truyện ngụ ngôn", "Thơ", "Chuyện cơm hến là tuỳ bút giàu chất trữ tình."],
        ["Tác giả Tháng Giêng nhớ về tháng Giêng ở nơi nào?", "Tháng Giêng ở Hà Nội", "Tháng Giêng ở Huế", "Tháng Giêng ở Sài Gòn", "Vũ Bằng xa quê, mơ nhớ tháng Giêng ở Hà Nội."],
        ["Tháng Giêng trong văn bản gắn với tiết trời nào?", "Rét ngọt của tháng Giêng", "Nắng nóng của mùa hạ", "Mưa ngâu của mùa thu", "Văn bản gợi rét ngọt đặc trưng của tháng Giêng."],
        ["Tháng Giêng, mơ về trăng non rét ngọt thuộc thể loại nào?", "Tuỳ bút", "Truyện ngụ ngôn", "Kịch nói", "Văn bản là tuỳ bút trữ tình của Vũ Bằng."],
        ["Hương vị tháng Giêng được Vũ Bằng nhớ qua hình ảnh nào?", "Trăng non đầu tháng Giêng", "Trăng rằm giữa tháng Tám", "Trăng khuya cuối tháng Chạp", "Nhan đề gợi hình ảnh trăng non đầu tháng Giêng."],
        ["Món cơm hến gồm nguyên liệu chính nào từ sông?", "Con hến nhỏ dưới sông", "Tôm hùm ngoài biển", "Cá hồi trên sông lớn", "Cơm hến làm từ con hến nhỏ bắt dưới sông."],
        ["Cơm hến thường được ăn kèm với thứ nước nào?", "Nước hến nóng chan cơm", "Nước mắm pha loãng", "Nước dừa tươi mát", "Cơm hến chan nước hến nóng khi ăn."],
        ["Vị đặc trưng của cơm hến là vị gì?", "Vị cay nồng đậm đà", "Vị ngọt thanh nhẹ nhàng", "Vị chua gắt khó ăn", "Cơm hến Huế nổi bật với vị cay nồng đậm đà."],
        ["Cơm hến gắn liền với cồn nào trên sông Hương?", "Cồn Hến", "Cồn Dã Viên", "Cồn Hến nổi tiếng", "Cơm hến gắn với Cồn Hến trên sông Hương."],
        ["Ai là tác giả của Chuyện cơm hến?", "Hoàng Phủ Ngọc Tường", "Vũ Bằng", "Trần Quốc Vượng", "Chuyện cơm hến do Hoàng Phủ Ngọc Tường viết."],
        ["Hội lồng tồng còn được gọi là hội gì?", "Hội xuống đồng", "Hội đua thuyền", "Hội chọi trâu", "Lồng tồng nghĩa là xuống đồng nên gọi hội xuống đồng."],
        ["Hội lồng tồng thường tổ chức vào thời gian nào?", "Vào đầu mùa xuân sau Tết", "Vào giữa mùa hè nóng", "Vào cuối mùa thu lạnh", "Hội lồng tồng tổ chức đầu xuân, sau Tết."],
        ["Nghi lễ cày đầu năm trong hội lồng tồng cầu mong điều gì?", "Mùa màng tốt tươi, no ấm", "Mưa thuận gió hoà cho biển", "Trẻ em học giỏi hơn", "Nghi lễ cày đầu năm cầu mùa màng tốt tươi, no ấm."],
        ["Người dân xuống ruộng trong hội lồng tồng để làm gì?", "Bắt đầu vụ cấy đầu năm", "Thu hoạch lúa chín vàng", "Đào mương dẫn nước mới", "Hội xuống đồng mở đầu vụ cấy mới của năm."],
        ["Một trong các tác giả của văn bản Hội lồng tồng là ai?", "Trần Quốc Vượng", "Vũ Bằng", "Hoàng Phủ Ngọc Tường", "Hội lồng tồng do Trần Quốc Vượng và các tác giả biên soạn."],
        ["Văn bản thực hành đọc của Bài 5 là văn bản nào?", "Những khuôn cửa dấu yêu", "Ngôi nhà trên cây", "Chiều sông Thương", "Bài 5 có văn bản thực hành đọc Những khuôn cửa dấu yêu."],
        ["Tác giả Những khuôn cửa dấu yêu là ai?", "Trương Anh Ngọc", "Vũ Bằng", "Nguyễn Vĩnh Nguyên", "Những khuôn cửa dấu yêu do Trương Anh Ngọc viết."],
        ["Phần đầu văn bản tường trình cần ghi rõ điều gì?", "Thời gian và địa điểm tường trình", "Cảm xúc của người viết", "Bài học rút ra sâu sắc", "Đầu tường trình ghi rõ thời gian, địa điểm tường trình."],
        ["Cuối văn bản tường trình, người viết phải làm gì?", "Kí và ghi rõ họ tên", "Vẽ sơ đồ sự việc", "Kể thêm chuyện khác", "Cuối tường trình, người viết kí và ghi rõ họ tên."],
        ["Văn bản tường trình cần trình bày sự việc theo yêu cầu nào?", "Trung thực, rõ ràng, đúng trình tự", "Bay bổng, giàu tưởng tượng", "Ngắn gọn, bỏ qua chi tiết chính", "Tường trình phải trung thực, rõ ràng, đúng trình tự."],
        ["Văn bản tường trình thường gửi tới ai?", "Người hoặc cơ quan có thẩm quyền", "Bạn bè thân thiết", "Độc giả trên mạng xã hội", "Tường trình gửi người hoặc cơ quan có thẩm quyền giải quyết."]
      ], [["Chuyện cơm hến","Huế"],["Tháng Giêng, mơ về trăng non","Vũ Bằng"],["Hội lồng tồng","Người Tày"],["Cơm hến","Đặc sản Huế"],
        ["Tháng Giêng", "Tuỳ bút nhớ Hà Nội của Vũ Bằng"],
        ["Chuyện cơm hến", "Kí về món ăn dân dã xứ Huế"],
        ["Hội lồng tồng", "Lễ hội xuống đồng đầu xuân"]], "Nối cho đúng nhé!"),
      topic("nv6","📖","Bài 6: Bài học cuộc sống","Đẽo cày giữa đường • Ếch ngồi đáy giếng • Tục ngữ",[
        ["Truyện “Ếch ngồi đáy giếng” phê phán điều gì?", "Hiểu biết hạn hẹp nhưng huênh hoang, coi thường xung quanh", "Lười lao động", "Không giữ chữ tín", "Ếch ở đáy giếng chỉ thấy trời nhỏ bằng vung nên kiêu ngạo — phê phán hiểu biết nông cạn, chủ quan."],
        ["Bài học từ “Đẽo cày giữa đường” là gì?", "Cần có chủ kiến, không nghe theo mọi ý kiến xung quanh một cách mù quáng", "Phải nghe tất cả mọi người", "Không nên làm cày", "Người đẽo cày nghe ai cũng sửa theo, cuối cùng hỏng cả cày — cần giữ chủ kiến."],
        ["“Con hổ có nghĩa” là truyện của tác giả nào?", "Vũ Trinh", "Trang Tử", "Nam Hương", "Con hổ có nghĩa — Vũ Trinh."],
        ["Tục ngữ thuộc loại sáng tác nào?", "Văn học dân gian", "Văn học viết hiện đại", "Kịch nói", "Tục ngữ là câu nói dân gian đúc kết kinh nghiệm."],
        ["Truyện ngụ ngôn thường mượn chuyện loài vật để làm gì?", "Gửi gắm bài học về con người", "Giải thích hiện tượng tự nhiên", "Kể chuyện lịch sử", "Ngụ ngôn mượn chuyện vật / người để nêu bài học làm người."],
        ["Câu tục ngữ “Uống nước nhớ nguồn” khuyên ta điều gì?", "Biết ơn người đã tạo ra thành quả cho mình", "Uống nhiều nước", "Nhớ tên các con sông", "Câu tục ngữ dạy lòng biết ơn."],
        ["Tác giả truyện Con mối và con kiến là ai?", "Nam Hương", "Vũ Trinh", "Crư-lốp", "Con mối và con kiến là truyện ngụ ngôn của Nam Hương."],
        ["Con mối và con kiến phê phán kiểu người nào?", "Người lười biếng, chỉ biết hưởng thụ", "Người chăm chỉ làm việc", "Người dũng cảm hi sinh", "Truyện phê phán kẻ lười biếng, chỉ biết hưởng thụ."],
        ["Truyện Thiên nga, cá măng và tôm hùm do ai sáng tác?", "I-van Crư-lốp", "Nam Hương", "Vũ Trinh", "Thiên nga, cá măng và tôm hùm của I-van Crư-lốp."],
        ["Trong truyện Thiên nga, cá măng và tôm hùm, ba con vật kéo xe thế nào?", "Mỗi con kéo một hướng riêng", "Cả ba cùng kéo một hướng", "Không con nào chịu kéo xe", "Ba con vật kéo xe mỗi con một hướng riêng."],
        ["Bài học từ Thiên nga, cá măng và tôm hùm là gì?", "Cần đồng lòng khi làm việc chung", "Nên làm việc một mình", "Ai mạnh hơn sẽ thắng", "Truyện dạy cần đồng lòng khi làm việc chung."],
        ["Trong Con hổ có nghĩa, hổ trả ơn cho ai đã giúp hổ sinh con?", "Bà đỡ từng giúp hổ cái sinh con", "Người tiều phu đốn củi", "Người nông dân trong làng", "Hổ mang của cải trả ơn bà đỡ đã giúp hổ sinh con."],
        ["Hành động trả ơn của con hổ cho thấy điều gì?", "Loài vật cũng biết trọng ân nghĩa", "Loài vật luôn hung dữ", "Con người không cần biết ơn", "Con hổ trả ơn cho thấy loài vật cũng trọng ân nghĩa."],
        ["Người thợ trong Đẽo cày giữa đường làm việc ở vị trí nào?", "Ngồi đẽo cày ngay giữa đường", "Làm việc trong xưởng kín", "Đẽo cày ở trong rừng sâu", "Người thợ ngồi đẽo cày ngay giữa đường đi."],
        ["Kết quả chiếc cày của người thợ đẽo cày ra sao?", "Cày bị đẽo hỏng, mất cả vốn", "Cày đẹp và bán được giá cao", "Cày được mọi người khen ngợi", "Nghe hết mọi người, chiếc cày bị đẽo hỏng, mất vốn."],
        ["Vì sao ếch tưởng bầu trời chỉ bé bằng vung?", "Vì ếch chỉ nhìn từ miệng giếng", "Vì ếch chưa từng mở mắt", "Vì bầu trời thật sự rất nhỏ", "Ếch ở đáy giếng nên tưởng trời bé bằng vung."],
        ["Khi ra khỏi giếng, ếch bị kết cục thế nào?", "Bị con trâu đi qua giẫm chết", "Được các vật tôn làm vua", "Quay lại giếng sống tiếp", "Ếch nghênh ngang ngoài giếng và bị trâu giẫm chết."],
        ["Tục ngữ Đói cho sạch, rách cho thơm khuyên con người điều gì?", "Giữ phẩm giá dù nghèo khó", "Chỉ lo ăn mặc đẹp đẽ", "Tránh xa người nghèo khó", "Tục ngữ khuyên giữ phẩm giá trong sạch dù nghèo khó."],
        ["Tục ngữ Thương người như thể thương thân khuyên điều gì?", "Yêu thương người như chính mình", "Chỉ thương người thân ruột thịt", "Thương mình hơn mọi người", "Tục ngữ khuyên yêu thương người như thương chính mình."],
        ["Tục ngữ Học thầy không tày học bạn đề cao điều gì?", "Việc học hỏi từ bạn bè", "Việc tự học một mình", "Việc học thuộc lòng sách", "Tục ngữ đề cao việc học hỏi lẫn nhau từ bạn bè."],
        ["Thành ngữ là cụm từ có đặc điểm nào?", "Có nghĩa bóng, cố định về cấu tạo", "Luôn có nghĩa đen rõ ràng", "Thay đổi cấu tạo tuỳ ý", "Thành ngữ cố định về cấu tạo và thường mang nghĩa bóng."],
        ["Biện pháp nói quá là gì?", "Phóng đại mức độ để nhấn mạnh", "Thu nhỏ sự vật đến mức tối đa", "Đổi tên sự vật bằng tên khác", "Nói quá là phóng đại mức độ nhằm nhấn mạnh ý."],
        ["Kinh nghiệm trong tục ngữ được đúc kết từ đâu?", "Từ lao động và đời sống lâu đời", "Từ sách vở nước ngoài", "Từ tưởng tượng của thi sĩ", "Tục ngữ đúc kết kinh nghiệm lao động, đời sống lâu đời."],
        ["Kĩ năng viết của Bài 6 là gì?", "Nghị luận về vấn đề đời sống, ý kiến tán thành", "Kể lại sự việc lịch sử", "Thuyết minh về quy tắc chơi", "Bài 6 dạy nghị luận về đời sống với ý kiến tán thành."],
        ["Bài văn nghị luận tán thành cần đưa ra điều gì để thuyết phục?", "Lí lẽ và bằng chứng phù hợp", "Cảm xúc cá nhân mơ hồ", "Câu chuyện tưởng tượng dài", "Nghị luận cần lí lẽ và bằng chứng phù hợp để thuyết phục."],
        ["Văn bản thực hành đọc của Bài 6 thuộc thể loại nào?", "Truyện ngụ ngôn của Crư-lốp", "Bài thơ trữ tình ngắn", "Văn bản thông tin khoa học", "Thiên nga, cá măng và tôm hùm là truyện ngụ ngôn."]
      ], [["Ếch ngồi đáy giếng","Hiểu biết hạn hẹp, huênh hoang"],["Đẽo cày giữa đường","Cần có chủ kiến"],["Uống nước nhớ nguồn","Lòng biết ơn"],["Con hổ có nghĩa","Vũ Trinh"],
        ["Con mối và con kiến", "Truyện ngụ ngôn của Nam Hương"],
        ["Con hổ có nghĩa", "Truyện về loài vật biết trả ơn"],
        ["Thiên nga, cá măng và tôm hùm", "Truyện ngụ ngôn của Crư-lốp"]], "Nối truyện / tục ngữ với bài học nhé!"),
      topic("nv7","🚀","Bài 7: Thế giới viễn tưởng","Hai vạn dặm dưới biển • Đường vào trung tâm vũ trụ",[
        ["“Hai vạn dặm dưới biển” là tiểu thuyết của nhà văn nào?", "Giuyn Véc-nơ", "Hà Thuỷ Nguyên", "I. A. E-phơ-rê-mốp", "Jules Verne (Giuyn Véc-nơ) — nhà văn Pháp, cha đẻ của khoa học viễn tưởng."],
        ["Phương tiện chính trong “Hai vạn dặm dưới biển” là gì?", "Tàu ngầm Nautilus", "Tàu vũ trụ", "Khinh khí cầu", "Tàu ngầm Nautilus do thuyền trưởng Nemo chỉ huy."],
        ["Truyện khoa học viễn tưởng thường dựa trên yếu tố nào?", "Giả tưởng khoa học về tương lai / vũ trụ", "Sự kiện lịch sử có thật 100%", "Thần thoại cổ đại", "Viễn tưởng dựa trên tưởng tượng khoa học."],
        ["“Đường vào trung tâm vũ trụ” là sáng tác của ai?", "Hà Thuỷ Nguyên", "Giuyn Véc-nơ", "Nhật Văn", "Đường vào trung tâm vũ trụ (trích Thiên Mã) — Hà Thuỷ Nguyên."],
        ["Nhân vật thuyền trưởng nổi tiếng trong Hai vạn dặm dưới biển là ai?", "Thuyền trưởng Nemo", "Giáo sư Aronnax là người kể chuyện", "Thuyền trưởng Hatteras", "Thuyền trưởng Nemo chỉ huy tàu Nautilus."],
        ["Chủ điểm của Bài 7 là gì?", "Thế giới viễn tưởng", "Trải nghiệm để trưởng thành", "Bài học cuộc sống", "Bài 7 — Thế giới viễn tưởng."],
        ["Giáo sư A-rôn-nác trong Cuộc chạm trán trên đại dương làm nghề gì?", "Giáo sư về khoa học tự nhiên", "Thuyền trưởng tàu chiến", "Thợ săn cá voi nổi tiếng", "A-rôn-nác là giáo sư về khoa học tự nhiên."],
        ["Người hầu trung thành đi cùng giáo sư A-rôn-nác tên là gì?", "Công-xây", "Nét Len", "Nê-mô", "Công-xây là người hầu trung thành của giáo sư."],
        ["Thợ săn cá voi đi cùng đoàn truy đuổi vật lạ tên là gì?", "Nét Len", "Công-xây", "A-rôn-nác", "Nét Len là thợ săn cá voi trong đoàn truy đuổi."],
        ["Con tàu được cử đi truy đuổi vật lạ trên biển tên là gì?", "Tàu A-bra-ham Lin-côn", "Tàu Nautilus", "Tàu Đi-xcơ-vơ-ri", "Tàu chiến A-bra-ham Lin-côn được cử đi truy đuổi vật lạ."],
        ["Sau khi rơi xuống biển, giáo sư A-rôn-nác được đưa lên đâu?", "Lên chiếc tàu ngầm bí ẩn", "Lên một hòn đảo hoang", "Lên tàu buôn gần đó", "Giáo sư được đưa lên chiếc tàu ngầm bí ẩn Nautilus."],
        ["Vật lạ trên biển khiến nhiều tàu thuyền gặp chuyện gì?", "Bị đâm thủng và gặp tai nạn", "Bị mất phương hướng nhẹ", "Bị chậm hành trình vài giờ", "Vật lạ bị cho là nguyên nhân đâm thủng nhiều tàu thuyền."],
        ["Tàu ngầm Nautilus di chuyển nhờ nguồn năng lượng nào?", "Năng lượng điện", "Sức gió từ cánh buồm", "Sức chèo của thuỷ thủ", "Tàu Nautilus vận hành chủ yếu bằng năng lượng điện."],
        ["Nhân vật Công-xây có tính cách nổi bật nào?", "Điềm tĩnh và trung thành", "Nóng nảy và liều lĩnh", "Hài hước và hay quên", "Công-xây điềm tĩnh, trung thành với giáo sư."],
        ["Văn bản Đường vào trung tâm vũ trụ trích từ tác phẩm nào?", "Trích từ tiểu thuyết Thiên Mã", "Trích từ Hai vạn dặm dưới biển", "Trích từ Tinh vân Tiên Nữ", "Đoạn trích lấy từ tiểu thuyết Thiên Mã."],
        ["Đề tài chính của Đường vào trung tâm vũ trụ là gì?", "Hành trình khám phá vũ trụ", "Cuộc thi thể thao học đường", "Chuyến đi biển đánh cá", "Văn bản viết về hành trình khám phá vũ trụ kì thú."],
        ["Hồ Khanh nổi tiếng vì phát hiện hang động nào?", "Hang Sơn Đoòng ở Quảng Bình", "Hang Sửng Sốt ở Hạ Long", "Động Phong Nha ở Quảng Bình", "Hồ Khanh là người đầu tiên phát hiện hang Sơn Đoòng."],
        ["Hồ Khanh làm nghề gì trước khi phát hiện hang động?", "Một người sơn tràng đi rừng", "Một hướng dẫn viên du lịch", "Một nhà khoa học địa chất", "Hồ Khanh vốn là người sơn tràng đi rừng ở Quảng Bình."],
        ["Hang Sơn Đoòng nằm trong vườn quốc gia nào?", "Vườn quốc gia Phong Nha – Kẻ Bàng", "Vườn quốc gia Cúc Phương", "Vườn quốc gia Cát Tiên", "Sơn Đoòng thuộc Vườn quốc gia Phong Nha – Kẻ Bàng."],
        ["Văn bản Dấu ấn Hồ Khanh thuộc kiểu văn bản nào?", "Văn bản thông tin", "Bài thơ trữ tình", "Truyện cổ tích", "Dấu ấn Hồ Khanh là văn bản thông tin về một phát hiện."],
        ["Kĩ năng viết của Bài 7 là gì?", "Kể lại sự việc liên quan nhân vật lịch sử", "Viết bài văn biểu cảm", "Viết văn bản tường trình", "Bài 7 dạy kể lại sự việc về nhân vật lịch sử."],
        ["Khi kể lại sự việc về nhân vật lịch sử, cần đảm bảo điều gì?", "Sự việc có thật, trình bày rõ ràng", "Thêm nhiều chi tiết tưởng tượng", "Đổi tên nhân vật lịch sử", "Kể về nhân vật lịch sử cần dựa trên sự việc có thật."],
        ["Văn bản thực hành đọc của Bài 7 là văn bản nào?", "Chiếc đũa thần", "Ngôi nhà trên cây", "Chiều sông Thương", "Bài 7 có văn bản thực hành đọc Chiếc đũa thần."],
        ["Chiếc đũa thần trích từ tiểu thuyết nào?", "Tiểu thuyết Tinh vân Tiên Nữ", "Tiểu thuyết Thiên Mã", "Tiểu thuyết Đất rừng phương Nam", "Chiếc đũa thần trích từ Tinh vân Tiên Nữ."],
        ["Tác giả Chiếc đũa thần là ai?", "I. A. E-phơ-rê-mốp", "Giuyn Véc-nơ", "Hà Thuỷ Nguyên", "Chiếc đũa thần do I. A. E-phơ-rê-mốp sáng tác."],
        ["Bối cảnh truyện khoa học viễn tưởng thường đặt ở đâu?", "Ở tương lai hoặc thế giới xa lạ", "Ở làng quê thời phong kiến", "Ở lớp học ngày thường", "Truyện viễn tưởng thường đặt ở tương lai, thế giới xa lạ."]
      ], [["Hai vạn dặm dưới biển","Giuyn Véc-nơ"],["Tàu ngầm","Nautilus"],["Thuyền trưởng","Nemo"],["Đường vào trung tâm vũ trụ","Hà Thuỷ Nguyên"],
        ["Hai vạn dặm dưới biển", "Tiểu thuyết viễn tưởng của Giuyn Véc-nơ"],
        ["Thiên Mã", "Tác phẩm có trích đoạn Đường vào trung tâm vũ trụ"],
        ["Hồ Khanh", "Người phát hiện hang Sơn Đoòng"]], "Nối cho đúng nhé!"),
      topic("nv8","🧭","Bài 8: Trải nghiệm để trưởng thành","Bản đồ dẫn đường • Nói với con",[
        ["Bài thơ “Nói với con” là của nhà thơ nào?", "Y Phương", "Thanh Hải", "Tế Hanh", "Nói với con — Y Phương, lời người cha dân tộc Tày dặn con."],
        ["“Nói với con” nhắc con nhớ điều gì?", "Cội nguồn quê hương và ý chí vươn lên", "Cách làm giàu", "Kĩ thuật đi rừng", "Bài thơ dặn con nhớ cội nguồn, sống mạnh mẽ như người đồng mình."],
        ["“Bản đồ dẫn đường” (văn bản thông tin) của tác giả nào?", "Đa-ni-en Gốt-li-ép", "Huỳnh Như Phương", "Đoàn Công Lê Huy", "Bản đồ dẫn đường — Daniel Gottlieb."],
        ["“Hãy cầm lấy và đọc” của tác giả nào?", "Huỳnh Như Phương", "Y Phương", "Daniel Gottlieb", "Hãy cầm lấy và đọc — Huỳnh Như Phương, bàn về văn hoá đọc."],
        ["“Người đồng mình” trong Nói với con chỉ ai?", "Người cùng quê hương, dân tộc với mình", "Người nước ngoài", "Bạn học cùng lớp", "Người đồng mình là người cùng bản làng, dân tộc."],
        ["Chủ điểm Bài 8 là gì?", "Trải nghiệm để trưởng thành", "Thế giới viễn tưởng", "Màu sắc trăm miền", "Bài 8 — Trải nghiệm để trưởng thành."],
        ["Hình ảnh mở đầu Nói với con gợi cảnh gì?", "Con tập đi trong vòng tay cha mẹ", "Con đi học xa nhà lần đầu", "Con ra đồng làm việc cùng cha", "Đầu bài thơ gợi cảnh con tập đi bên cha mẹ."],
        ["Cha mẹ trong Nói với con nuôi con lớn lên trong điều gì?", "Trong tình thương yêu của gia đình", "Trong sự nghiêm khắc lạnh lùng", "Trong cuộc sống giàu sang", "Con lớn lên trong tình thương yêu của gia đình."],
        ["Cha trong Nói với con khuyên con sống thế nào khi gặp khó khăn?", "Không chê bai, hãy vượt qua gian khó", "Hãy bỏ quê hương ra đi", "Hãy tránh mọi việc khó khăn", "Cha khuyên con không chê bai, vượt qua gian khó."],
        ["Đức tính cha mong con giữ khi bước vào đời là gì?", "Không nhỏ bé, phải vươn lên mạnh mẽ", "Luôn cúi đầu khuất phục", "Sống khép kín, ít giao tiếp", "Cha mong con vươn lên mạnh mẽ, không nhỏ bé."],
        ["Thể thơ của Nói với con là gì?", "Thơ tự do", "Thơ lục bát", "Thơ thất ngôn bát cú", "Nói với con được viết theo thể thơ tự do."],
        ["Giọng điệu bài thơ Nói với con như thế nào?", "Tâm tình, tha thiết của người cha", "Hào hùng như khúc tráng ca", "Châm biếm và hài hước", "Bài thơ có giọng tâm tình, tha thiết của người cha."],
        ["Quê hương của nhà thơ Y Phương thuộc vùng nào?", "Vùng núi Cao Bằng", "Vùng biển Khánh Hoà", "Vùng đồng bằng Nam Bộ", "Y Phương quê ở Trùng Khánh, Cao Bằng."],
        ["Cha dạy con sống như hình ảnh thiên nhiên nào?", "Như sông, như suối vượt ghềnh thác", "Như mây trôi lặng lẽ", "Như đá nằm yên một chỗ", "Cha dạy con sống như sông suối, vượt ghềnh thác."],
        ["Lời dặn ngắn ở cuối bài thơ Nói với con là gì?", "“Nghe con”", "“Đi con”", "“Nhớ con”", "Bài thơ khép lại bằng lời dặn ngắn “Nghe con”."],
        ["Tác giả Hãy cầm lấy và đọc khuyên người đọc cầm sách để làm gì?", "Để mở ra thế giới tri thức mới", "Để trang trí tủ sách đẹp", "Để khoe với bạn bè", "Cầm sách lên đọc là mở ra thế giới tri thức mới."],
        ["Theo Hãy cầm lấy và đọc, đọc sách giúp con người điều gì?", "Hiểu mình và hiểu thế giới hơn", "Quên hết mọi kiến thức cũ", "Tránh giao tiếp với mọi người", "Đọc sách giúp hiểu mình và hiểu thế giới hơn."],
        ["Hình ảnh cầm lấy và đọc gợi thái độ nào với sách?", "Chủ động đến với sách và tri thức", "Thụ động chờ người khác đọc hộ", "Chỉ đọc sách khi bị ép buộc", "Cầm lấy và đọc gợi thái độ chủ động đến với sách."],
        ["Hãy cầm lấy và đọc thuộc kiểu văn bản nào?", "Văn bản nghị luận về việc đọc sách", "Truyện ngắn hư cấu", "Bài thơ trữ tình ngắn", "Văn bản là bài nghị luận bàn về việc đọc sách."],
        ["Tấm bản đồ trong Bản đồ dẫn đường tượng trưng cho điều gì?", "Sự dẫn dắt giúp ta trưởng thành", "Chiếc chìa khoá mở kho báu", "Tấm vé đi du lịch xa", "Bản đồ tượng trưng cho sự dẫn dắt trên đường trưởng thành."],
        ["Bài học từ Bản đồ dẫn đường là gì?", "Hãy kiên trì tìm đường đi đúng", "Hãy phó mặc cho may rủi", "Hãy tránh mọi thử thách mới", "Văn bản dạy kiên trì tìm con đường đúng để trưởng thành."],
        ["Kĩ năng viết của Bài 8 là gì?", "Nghị luận về vấn đề đời sống, ý kiến phản đối", "Nghị luận với ý kiến tán thành", "Kể lại sự việc lịch sử", "Bài 8 dạy nghị luận về đời sống với ý kiến phản đối."],
        ["Khi phản đối một ý kiến, người viết cần có thái độ nào?", "Lịch sự, dựa trên lí lẽ đúng", "Gay gắt, xúc phạm người khác", "Im lặng, không nêu lí lẽ", "Phản đối cần lịch sự và dựa trên lí lẽ đúng đắn."],
        ["Phần kết bài của bài nghị luận phản đối cần làm gì?", "Khẳng định lại ý kiến của mình", "Kể thêm một câu chuyện mới", "Nêu thêm ví dụ chưa phân tích", "Kết bài cần khẳng định lại ý kiến phản đối của mình."],
        ["Văn bản thực hành đọc của Bài 8 là văn bản nào?", "Câu chuyện về con đường", "Chiếc đũa thần", "Thân thiện với môi trường", "Bài 8 có văn bản thực hành đọc Câu chuyện về con đường."],
        ["Tác giả Câu chuyện về con đường là ai?", "Đoàn Công Lê Huy", "Huỳnh Như Phương", "Đa-ni-en Gốt-li-ép", "Câu chuyện về con đường do Đoàn Công Lê Huy viết."]
      ], [["Nói với con","Y Phương"],["Bản đồ dẫn đường","Đa-ni-en Gốt-li-ép"],["Hãy cầm lấy và đọc","Huỳnh Như Phương"],["Người đồng mình","Người cùng quê, dân tộc"],
        ["Nói với con", "Bài thơ cha dặn con của Y Phương"],
        ["Hãy cầm lấy và đọc", "Văn bản về niềm vui đọc sách"],
        ["Bản đồ dẫn đường", "Văn bản về hành trình trưởng thành"]], "Nối cho đúng nhé!"),
      topic("nv9","🌿","Bài 9: Hoà điệu với tự nhiên","Thuỷ tiên tháng Một • Lễ rửa làng của người Lô Lô",[
        ["“Lễ rửa làng” là phong tục của đồng bào dân tộc nào?", "Người Lô Lô", "Người Tày", "Người Mường", "Lễ rửa làng của người Lô Lô (Hà Giang) nhằm xua đuổi điều xấu, cầu bình an."],
        ["“Thuỷ tiên tháng Một” bàn về vấn đề gì?", "Biến đổi khí hậu làm hoa thuỷ tiên nở sớm", "Cách trồng hoa thuỷ tiên", "Lễ hội hoa", "Văn bản của Thomas Friedman về dấu hiệu biến đổi khí hậu qua hoa nở sớm."],
        ["“Bản tin về hoa anh đào” có nội dung chính là gì?", "Thông tin về hoa anh đào nở ở Nhật Bản và ý nghĩa của nó", "Quảng cáo du lịch", "Dự báo thời tiết", "Bản tin cung cấp thông tin về mùa hoa anh đào (Nguyễn Vĩnh Nguyên)."],
        ["Kiểu văn bản của “Lễ rửa làng của người Lô Lô” là gì?", "Văn bản thông tin (giới thiệu phong tục)", "Truyện ngụ ngôn", "Thơ trữ tình", "Đây là văn bản thông tin giới thiệu một lễ hội / phong tục."],
        ["Chủ điểm Bài 9 là gì?", "Hoà điệu với tự nhiên", "Trang sách và cuộc sống", "Cội nguồn yêu thương", "Bài 9 — Hoà điệu với tự nhiên."],
        ["Bài viết thuyết minh về quy tắc / luật lệ cần trình bày như thế nào?", "Rõ ràng, theo trình tự, chính xác", "Tuỳ hứng không cần thứ tự", "Chỉ cần cảm xúc", "Thuyết minh quy tắc cần chính xác, mạch lạc, dễ làm theo."],
        ["Tác giả Thuỷ tiên tháng Một là nhà văn của nước nào?", "Tác giả người Mỹ", "Tác giả người Pháp", "Tác giả người Nhật Bản", "Thô-mát L. Phrít-man là tác giả người Mỹ."],
        ["Thuỷ tiên tháng Một thuộc kiểu văn bản nào?", "Văn bản thông tin về môi trường", "Truyện ngụ ngôn ngắn", "Bài thơ trữ tình", "Văn bản cung cấp thông tin về môi trường, khí hậu."],
        ["Hoa thuỷ tiên thường nở vào mùa nào khi khí hậu bình thường?", "Vào mùa xuân", "Vào mùa hạ", "Vào mùa đông", "Thuỷ tiên vốn là loài hoa nở vào mùa xuân."],
        ["Hoa nở sớm bất thường khiến nhà khoa học lo lắng điều gì ở thực vật?", "Nhịp sinh trưởng của cây bị thay đổi", "Màu sắc của hoa bị nhạt đi", "Kích thước của cây nhỏ lại", "Hoa nở sớm cho thấy nhịp sinh trưởng của cây bị thay đổi."],
        ["Lễ rửa làng của người Lô Lô nhằm xua đuổi điều gì khỏi làng?", "Điều xui rủi và tà ma", "Khách quý đến thăm làng", "Mùa màng của năm mới", "Lễ rửa làng nhằm xua đuổi tà ma, điều xui rủi."],
        ["Người Lô Lô sống chủ yếu ở tỉnh nào của Việt Nam?", "Tỉnh Hà Giang", "Tỉnh Cà Mau", "Tỉnh Tây Ninh", "Người Lô Lô sinh sống chủ yếu ở Hà Giang."],
        ["Ai là tác giả văn bản Lễ rửa làng của người Lô Lô?", "Phạm Thuỳ Dung", "Nguyễn Vĩnh Nguyên", "Nguyễn Hữu Quỳnh Hương", "Văn bản Lễ rửa làng do Phạm Thuỳ Dung viết."],
        ["Lễ rửa làng thể hiện niềm tin nào của người Lô Lô?", "Niềm tin vào thần linh bảo hộ làng", "Niềm tin vào khoa học hiện đại", "Niềm tin vào may rủi cá nhân", "Lễ rửa làng thể hiện niềm tin vào thần linh bảo hộ."],
        ["Người chủ trì lễ rửa làng là ai trong làng?", "Thầy cúng của làng", "Trưởng thôn hành chính", "Giáo viên trong làng", "Thầy cúng là người chủ trì lễ rửa làng."],
        ["Sau lễ rửa làng, dân làng kiêng điều gì trong ít ngày?", "Kiêng người lạ vào làng ít ngày", "Kiêng ra đồng làm việc", "Kiêng tổ chức lễ hội khác", "Sau lễ, làng kiêng người lạ vào làng trong ít ngày."],
        ["Tác giả Bản tin về hoa anh đào là ai?", "Nguyễn Vĩnh Nguyên", "Phạm Thuỳ Dung", "Thô-mát L. Phrít-man", "Bản tin về hoa anh đào do Nguyễn Vĩnh Nguyên viết."],
        ["Hoa anh đào là biểu tượng của đất nước nào?", "Đất nước Nhật Bản", "Đất nước Hàn Quốc", "Đất nước Trung Quốc", "Hoa anh đào là biểu tượng nổi tiếng của Nhật Bản."],
        ["Hoa anh đào nở báo hiệu mùa nào đến ở Nhật Bản?", "Mùa xuân đã đến", "Mùa thu đã đến", "Mùa đông đã đến", "Hoa anh đào nở báo hiệu mùa xuân đến ở Nhật Bản."],
        ["Bản tin thuộc kiểu văn bản nào?", "Văn bản thông tin ngắn gọn, kịp thời", "Văn bản nghị luận dài", "Văn bản biểu cảm trữ tình", "Bản tin là văn bản thông tin ngắn gọn, kịp thời."],
        ["Văn bản thực hành đọc của Bài 9 là văn bản nào?", "Thân thiện với môi trường", "Câu chuyện về con đường", "Chiếc đũa thần", "Bài 9 có văn bản thực hành đọc Thân thiện với môi trường."],
        ["Tác giả Thân thiện với môi trường là ai?", "Nguyễn Hữu Quỳnh Hương", "Nguyễn Vĩnh Nguyên", "Phạm Thuỳ Dung", "Thân thiện với môi trường do Nguyễn Hữu Quỳnh Hương viết."],
        ["Thân thiện với môi trường khuyên con người làm gì?", "Sống hài hoà, bảo vệ thiên nhiên", "Khai thác thiên nhiên tuỳ ý", "Tránh xa mọi thiên nhiên", "Văn bản khuyên sống hài hoà, bảo vệ thiên nhiên."],
        ["Khi viết thuyết minh luật lệ trò chơi, cần nêu rõ điều gì trước tiên?", "Mục đích và phạm vi áp dụng luật", "Tên người thắng cuộc gần nhất", "Cảm xúc của người chơi", "Thuyết minh luật lệ cần nêu mục đích, phạm vi áp dụng."],
        ["Văn bản thuyết minh quy tắc cần trình bày các điều khoản thế nào?", "Rõ ràng, theo thứ tự hợp lí", "Tuỳ hứng, không cần thứ tự", "Ngắn gọn, bỏ qua điều chính", "Các điều khoản cần rõ ràng, theo thứ tự hợp lí."],
        ["Văn bản thuyết minh khác văn bản tường trình ở mục đích nào?", "Giải thích để người đọc hiểu rõ", "Trình bày lại sự việc đã xảy ra", "Bày tỏ cảm xúc về con người", "Thuyết minh nhằm giải thích để người đọc hiểu rõ vấn đề."]
      ], [["Lễ rửa làng","Người Lô Lô"],["Thuỷ tiên tháng Một","Biến đổi khí hậu"],["Hoa anh đào","Nhật Bản"],["Hoà điệu với tự nhiên","Bài 9"],
        ["Thuỷ tiên tháng Một", "Văn bản về hoa nở sớm bất thường"],
        ["Lễ rửa làng", "Phong tục của người Lô Lô ở Hà Giang"],
        ["Bản tin về hoa anh đào", "Bản tin về mùa hoa ở Nhật Bản"]], "Nối cho đúng nhé!"),
      topic("nv10","📚","Bài 10: Trang sách và cuộc sống + Thực hành tiếng Việt","Ôn tập tổng hợp • Từ loại, biện pháp tu từ",[
        ["Biện pháp tu từ so sánh dùng các từ nào thường gặp?", "như, tựa, bằng, là", "và, với, cùng", "nhưng, tuy, song", "So sánh thường có từ so sánh: như, tựa như, bằng..."],
        ["Từ “xuân” trong “mùa xuân” và “tuổi xuân” có quan hệ gì?", "Đa nghĩa (nghĩa gốc và nghĩa chuyển)", "Đồng âm", "Trái nghĩa", "“Xuân” chỉ mùa và chỉ tuổi trẻ — quan hệ đa nghĩa."],
        ["Cặp từ nào là từ trái nghĩa?", "cao — thấp", "cao — lớn", "bàn — ghế", "Cao / thấp trái nghĩa nhau."],
        ["Nhân hoá là biện pháp gì?", "Gán đặc điểm của người cho vật", "So sánh hai vật", "Lặp lại từ ngữ", "Nhân hoá làm cho vật có hành động, tình cảm như người."],
        ["Chủ điểm Bài 10 là gì?", "Trang sách và cuộc sống", "Bầu trời tuổi thơ", "Giai điệu đất nước", "Bài 10 — Trang sách và cuộc sống, khép lại năm học với thử thách đọc sách."],
        ["Khi tóm tắt văn bản, cần giữ lại điều gì?", "Ý chính, nội dung cốt lõi của văn bản", "Mọi chi tiết nhỏ", "Chỉ câu đầu tiên", "Tóm tắt giữ ý chính, lược chi tiết phụ, không thêm ý kiến riêng."],
        ["Từ đồng nghĩa là những từ có nghĩa thế nào?", "Có nghĩa giống nhau hoặc gần nhau", "Có nghĩa hoàn toàn trái ngược", "Không có quan hệ về nghĩa", "Từ đồng nghĩa có nghĩa giống nhau hoặc gần nhau."],
        ["Từ Hán Việt là từ có nguồn gốc từ đâu?", "Có nguồn gốc tiếng Hán", "Có nguồn gốc tiếng Pháp", "Có nguồn gốc tiếng Anh", "Từ Hán Việt có nguồn gốc từ tiếng Hán."],
        ["Yếu tố Hán Việt gia trong gia đình có nghĩa là gì?", "Có nghĩa là nhà", "Có nghĩa là nước", "Có nghĩa là người", "Yếu tố gia trong gia đình có nghĩa là nhà."],
        ["Yếu tố Hán Việt quốc trong quốc gia có nghĩa là gì?", "Có nghĩa là nước", "Có nghĩa là nhà", "Có nghĩa là dân", "Yếu tố quốc trong quốc gia có nghĩa là nước."],
        ["Biện pháp ẩn dụ là gì?", "So sánh ngầm dựa trên nét tương đồng", "Lặp lại từ ngữ nhiều lần", "Phóng đại mức độ sự vật", "Ẩn dụ là so sánh ngầm dựa trên nét tương đồng."],
        ["Biện pháp điệp ngữ là gì?", "Lặp lại từ ngữ để nhấn mạnh", "Gọi tên vật bằng vật khác", "Nhân hoá đồ vật vô tri", "Điệp ngữ là lặp lại từ ngữ nhằm nhấn mạnh ý."],
        ["Biện pháp hoán dụ gọi tên sự vật dựa trên quan hệ nào?", "Quan hệ gần gũi giữa các sự vật", "Quan hệ tương đồng về hình dáng", "Quan hệ trái ngược về nghĩa", "Hoán dụ dựa trên quan hệ gần gũi giữa các sự vật."],
        ["Câu rút gọn là câu thiếu thành phần nào?", "Thiếu chủ ngữ hoặc vị ngữ", "Thiếu dấu chấm cuối câu", "Thiếu từ ngữ trang trí", "Câu rút gọn thiếu chủ ngữ hoặc vị ngữ."],
        ["Câu đặc biệt là câu có cấu tạo thế nào?", "Không theo mô hình chủ ngữ, vị ngữ", "Luôn có đủ chủ ngữ, vị ngữ", "Chỉ gồm toàn tính từ", "Câu đặc biệt không theo mô hình chủ ngữ, vị ngữ thông thường."],
        ["Dấu chấm lửng thường dùng để biểu thị điều gì?", "Lời nói bỏ dở hoặc ngập ngừng", "Kết thúc một đoạn văn", "Ngắt câu hỏi tu từ", "Dấu chấm lửng biểu thị lời nói bỏ dở, ngập ngừng."],
        ["Từ láy là từ được cấu tạo bằng cách nào?", "Lặp âm ở các tiếng trong từ", "Ghép hai từ trái nghĩa", "Vay mượn từ tiếng nước ngoài", "Từ láy được tạo bằng cách lặp âm giữa các tiếng."],
        ["Từ ghép là từ được cấu tạo thế nào?", "Gồm hai tiếng trở lên có quan hệ nghĩa", "Chỉ gồm một tiếng duy nhất", "Lặp lại nguyên một tiếng", "Từ ghép gồm hai tiếng trở lên có quan hệ về nghĩa."],
        ["Nghĩa của từ được hiểu đúng nhất khi đặt ở đâu?", "Đặt trong ngữ cảnh cụ thể", "Đặt riêng lẻ ngoài câu", "Đặt trong từ điển cổ", "Nghĩa của từ cần được hiểu trong ngữ cảnh cụ thể."],
        ["Kĩ năng viết của Bài 10 là gì?", "Phân tích nhân vật văn học yêu thích", "Viết văn bản tường trình", "Tập làm thơ năm chữ", "Bài 10 dạy phân tích nhân vật văn học yêu thích."],
        ["Khi phân tích nhân vật yêu thích, cần chọn nhân vật từ đâu?", "Từ cuốn sách mình đã đọc", "Từ bộ phim mới xem gần đây", "Từ câu chuyện bạn kể lại", "Nhân vật được chọn từ cuốn sách mình đã đọc."],
        ["Hoạt động nói và nghe cuối Bài 10 là hoạt động nào?", "Ngày hội với sách", "Hội thi kể chuyện cổ tích", "Ngày hội trồng cây xanh", "Bài 10 kết thúc bằng hoạt động Ngày hội với sách."],
        ["Thử thách đầu tiên của Bài 10 yêu cầu học sinh làm gì?", "Chinh phục những cuốn sách mới", "Sáng tác một bài thơ dài", "Tổ chức một buổi triển lãm", "Thử thách đầu tiên là chinh phục những cuốn sách mới."],
        ["Thử thách thứ hai của Bài 10 yêu cầu biến điều gì thành sản phẩm?", "Biến ý tưởng thành sản phẩm", "Biến bài học thành trò chơi điện tử", "Biến cuốn sách thành bộ phim", "Thử thách thứ hai là từ ý tưởng đến sản phẩm đọc sách."],
        ["Sản phẩm đọc sách trong Bài 10 có thể là hình thức nào?", "Tờ giới thiệu hoặc clip về sách", "Bài kiểm tra trắc nghiệm", "Sơ đồ lớp học sáng tạo", "Sản phẩm đọc sách có thể là tờ giới thiệu hoặc clip về sách."],
        ["Khi giới thiệu sách, cần nêu được điều gì quan trọng nhất?", "Nội dung và giá trị của cuốn sách", "Số trang và giá bán của sách", "Màu sắc bìa sách nổi bật", "Giới thiệu sách cần nêu nội dung và giá trị cuốn sách."]
      ], [["So sánh","như, tựa, bằng"],["Nhân hoá","Gán nét người cho vật"],["Cao — thấp","Từ trái nghĩa"],["Tóm tắt","Giữ ý chính"],
        ["Thách thức đầu tiên", "Chinh phục những cuốn sách mới"],
        ["Thách thức thứ hai", "Từ ý tưởng đến sản phẩm"],
        ["Về đích", "Ngày hội với sách"]], "Nối cho đúng nhé!")
    ];
    /* ================= TIẾNG ANH 7 ================= */
    function eng7Topic(id, name, sub, facts, pairs){ return topic(id, "🔤", name, sub, facts, pairs, "Match the words / phrases!"); }
    var ENG7_TOPICS = [
      eng7Topic("e7-u1","Unit 1: Hobbies","Sở thích • Hiện tại đơn • /ə/, /ɜː/",[
        ["“Collecting stamps” means…?", "Sưu tầm tem", "Nấu ăn", "Đạp xe", "Collect stamps = sưu tầm tem."],
        ["Choose the correct sentence:", "He likes gardening.", "He like gardening.", "He likes garden yesterday.", "Chủ ngữ He (ngôi 3 số ít) → likes."],
        ["“My hobby is …” — từ nào chỉ sở thích chụp ảnh?", "taking photos", "doing judo", "playing football", "Taking photos = chụp ảnh."],
        ["Âm /ɜː/ có trong từ nào?", "bird", "about", "cat", "Bird /bɜːd/ chứa âm /ɜː/."],
        ["“She … to music every evening.” Điền đúng:", "listens", "listen", "listened", "Thói quen + chủ ngữ She → listens (hiện tại đơn)."],
        ["Từ nào là một sở thích?", "painting", "homework", "breakfast", "Painting (vẽ tranh) là sở thích."],
        ["Từ “dollhouse” trong Unit 1 có nghĩa là gì?", "nhà búp bê", "nhà kho", "chuồng ngựa", "Dollhouse là nhà búp bê, một món đồ thủ công."],
        ["Cụm “making models” có nghĩa là gì?", "làm mô hình", "làm bánh", "trồng cây", "Making models là làm mô hình thu nhỏ."],
        ["She ___ swimming every Sunday.", "goes", "go", "going", "Chủ ngữ She số ít nên dùng goes với swimming."],
        ["My brother ___ football after school.", "plays", "play", "playing", "Chủ ngữ số ít thì động từ thêm s."],
        ["Từ nào kết thúc bằng âm /ə/?", "teacher", "bird", "cat", "Teacher kết thúc bằng âm /ə/."],
        ["Từ nào chứa âm /ɜː/?", "learn", "banana", "table", "Learn chứa âm /ɜː/ ở giữa."],
        ["He dislikes ___ in the evening.", "cooking", "cook", "cooks", "Sau dislike dùng động từ thêm ing."],
        ["Lan loves ___ cakes for her family.", "baking", "bake", "bakes", "Sau loves dùng động từ thêm ing."],
        ["Từ “jogging” có nghĩa là gì?", "chạy bộ thư giãn", "bơi lội", "câu cá", "Jogging là chạy bộ nhẹ nhàng để rèn sức khỏe."],
        ["They ___ to school by bike every day.", "go", "goes", "going", "Chủ ngữ They dùng động từ nguyên thể go."],
        ["Does Mai like reading books? — ___", "Yes, she does.", "Yes, she do.", "No, she is.", "Câu hỏi với Does trả lời bằng does."],
        ["Sở thích “horse riding” là gì?", "cưỡi ngựa", "chèo thuyền", "trượt băng", "Horse riding là cưỡi ngựa."],
        ["He ___ his homework every evening.", "does", "do", "doing", "Chủ ngữ He số ít nên dùng does."],
        ["I like ___ a bike at weekends.", "riding", "ride", "rides", "Sau like dùng động từ thêm ing."],
        ["Từ “unusual” có nghĩa là gì?", "khác thường", "quen thuộc", "nhàm chán", "Unusual nghĩa là khác lạ, ít gặp."],
        ["Thì hiện tại đơn thường diễn tả điều gì?", "thói quen lặp lại", "việc đang xảy ra", "kế hoạch ngày mai", "Hiện tại đơn diễn tả thói quen và sự thật."],
        ["My mother ___ yoga every morning.", "does", "do", "doing", "Does yoga là tập yoga, chủ ngữ số ít dùng does."],
        ["Từ nào có âm /ə/ ở âm tiết đầu?", "about", "bird", "work", "About có âm /ə/ ở âm tiết đầu."],
        ["He is fond of ___ the guitar.", "playing", "play", "plays", "Sau giới từ of dùng động từ thêm ing."],
        ["Cụm “collect coins” có nghĩa là gì?", "sưu tầm tiền xu", "sưu tầm tem", "trồng hoa", "Collect coins là sưu tầm tiền xu."]
      ], [["collect stamps","sưu tầm tem"],["gardening","làm vườn"],["taking photos","chụp ảnh"],["hobby","sở thích"],
        ["building dollhouses", "xây nhà búp bê"],
        ["going camping", "đi cắm trại"],
        ["doing yoga", "tập yoga"]]),
      eng7Topic("e7-u2","Unit 2: Healthy Living","Sức khoẻ • Câu đơn • /f/, /v/",[
        ["“Acne” means…?", "Mụn trứng cá", "Đau đầu", "Cảm cúm", "Acne = mụn trứng cá."],
        ["Lời khuyên đúng ngữ pháp:", "You should wash your face regularly.", "You should washes your face.", "You should washing your face.", "Should + động từ nguyên thể."],
        ["“Dim light” có hại cho bộ phận nào?", "Mắt (eyes)", "Tai", "Răng", "Đọc sách nơi thiếu sáng hại mắt."],
        ["Từ chứa âm /v/:", "vitamin", "fish", "cough", "Vitamin /ˈvɪtəmɪn/ bắt đầu bằng /v/."],
        ["“He eats a lot of fast food. He is …” — hệ quả hợp lí:", "getting fat / unhealthy", "very healthy", "stronger", "Ăn nhiều đồ ăn nhanh dễ tăng cân, không tốt cho sức khoẻ."],
        ["Câu nào là câu đơn?", "I do exercise every day.", "I do exercise and I eat well every day because it is good.", "When I exercise, I feel good.", "Câu đơn có một cụm chủ–vị độc lập."],
        ["Cụm “chapped lips” có nghĩa là gì?", "môi nứt nẻ", "môi đỏ", "môi thâm", "Chapped lips là tình trạng môi bị nứt nẻ."],
        ["Từ “sunburn” có nghĩa là gì?", "cháy nắng", "cảm lạnh", "đau bụng", "Sunburn là da bị cháy do nắng."],
        ["Cụm “soft drinks” có nghĩa là gì?", "nước ngọt có ga", "nước lọc", "sữa tươi", "Soft drinks là nước ngọt có ga."],
        ["Từ nào chứa âm /f/?", "fat", "love", "very", "Fat bắt đầu bằng âm /f/."],
        ["Từ nào chứa âm /v/?", "vegetables", "fish", "phone", "Vegetables bắt đầu bằng âm /v/."],
        ["Để khỏe mạnh, em nên làm gì mỗi ngày?", "tập thể dục đều đặn", "thức khuya chơi game", "bỏ bữa sáng", "Tập thể dục đều đặn giúp cơ thể khỏe mạnh."],
        ["Từ “vegetarian” chỉ ai?", "người ăn chay", "người ăn thịt", "người bán rau", "Vegetarian là người ăn chay."],
        ["Việc nào giúp phòng bệnh đơn giản?", "rửa tay bằng xà phòng", "dùng chung khăn mặt", "ăn đồ rơi xuống đất", "Rửa tay bằng xà phòng giúp phòng bệnh."],
        ["Từ “harmful” có nghĩa là gì?", "có hại", "có ích", "ngon miệng", "Harmful nghĩa là gây hại."],
        ["Uống đủ nước mỗi ngày giúp cơ thể thế nào?", "khỏe mạnh hơn", "mệt mỏi hơn", "dễ bị ốm hơn", "Nước cần cho mọi hoạt động của cơ thể."],
        ["Từ nào kết thúc bằng âm /f/?", "leaf", "leave", "love", "Leaf kết thúc bằng âm /f/."],
        ["Thức ăn nào tốt cho mắt theo Unit 2?", "rau củ màu đỏ và cam", "kẹo ngọt", "nước ngọt có ga", "Rau củ nhiều màu chứa vitamin tốt cho mắt."],
        ["Ngủ đủ giấc giúp em thế nào?", "tỉnh táo và khỏe mạnh", "buồn ngủ cả ngày", "hay quên bài học", "Ngủ đủ giấc giúp cơ thể hồi phục."],
        ["Cụm “skin condition” có nghĩa là gì?", "tình trạng da", "màu da", "kem dưỡng da", "Skin condition là tình trạng của làn da."],
        ["Em nên làm gì khi chơi ngoài nắng lâu?", "bôi kem chống nắng", "không đội mũ", "mặc áo tối màu dày", "Kem chống nắng bảo vệ da khỏi tia nắng."],
        ["Từ “tofu” có nghĩa là gì?", "đậu phụ", "thịt bò", "phô mai", "Tofu là đậu phụ, món ăn lành mạnh."],
        ["Hoạt động nào là lành mạnh?", "đạp xe mỗi chiều", "chơi game suốt đêm", "ăn vặt thay cơm", "Đạp xe là vận động tốt cho sức khỏe."],
        ["Từ “sweat” có nghĩa là gì?", "mồ hôi", "nước mắt", "nước bọt", "Sweat là mồ hôi tiết ra khi vận động."],
        ["Để tránh mỏi mắt khi đọc sách, em nên làm gì?", "ngồi nơi đủ ánh sáng", "đọc trong bóng tối", "để sách sát mắt", "Ánh sáng đủ giúp mắt không bị mỏi."]
      ], [["acne","mụn trứng cá"],["healthy","khoẻ mạnh"],["exercise","tập thể dục"],["vitamin","vi-ta-min"],
        ["chapped lips", "môi nứt nẻ"],
        ["sunburn", "cháy nắng"],
        ["coloured vegetables", "rau củ nhiều màu"]]),
      eng7Topic("e7-u3","Unit 3: Community Service","Hoạt động cộng đồng • Quá khứ đơn",[
        ["“Donate” means…?", "Quyên góp, tặng", "Mua sắm", "Vứt bỏ", "Donate = quyên góp."],
        ["“They … books to poor children last year.”", "donated", "donate", "donating", "“Last year” → quá khứ đơn: donated."],
        ["“Volunteer” là gì?", "Tình nguyện viên", "Giáo viên", "Bác sĩ", "Volunteer = người tình nguyện."],
        ["Quá khứ của “teach” là?", "taught", "teached", "teaching", "Teach – taught – taught (bất quy tắc)."],
        ["Hoạt động nào là hoạt động cộng đồng?", "Cleaning up the park", "Playing games alone at home", "Watching TV", "Dọn vệ sinh công viên phục vụ cộng đồng."],
        ["“We planted trees in 2022.” — động từ ở thì gì?", "Quá khứ đơn", "Hiện tại đơn", "Tương lai đơn", "Planted + mốc 2022 → quá khứ đơn."],
        ["Cụm “pick up litter” có nghĩa là gì?", "nhặt rác", "xả rác", "đốt rác", "Pick up litter là nhặt rác làm sạch nơi công cộng."],
        ["Cụm “nursing home” có nghĩa là gì?", "viện dưỡng lão", "bệnh viện nhi", "trường mẫu giáo", "Nursing home là nơi chăm sóc người cao tuổi."],
        ["Cụm “homeless children” có nghĩa là gì?", "trẻ em vô gia cư", "trẻ em mồ côi cha", "trẻ em khuyết tật", "Homeless children là trẻ em không có nhà ở."],
        ["Động từ “help” ở quá khứ đơn là gì?", "helped", "help", "helping", "Help thêm ed thành helped ở quá khứ."],
        ["Từ “helped” có âm cuối là gì?", "/t/", "/d/", "/ɪd/", "Sau âm /p/, đuôi ed đọc là /t/."],
        ["Từ “cleaned” có âm cuối là gì?", "/d/", "/t/", "/ɪd/", "Sau âm /n/, đuôi ed đọc là /d/."],
        ["Từ “wanted” có âm cuối là gì?", "/ɪd/", "/t/", "/d/", "Sau âm /t/, đuôi ed đọc là /ɪd/."],
        ["Students ___ old clothes for poor children last month.", "collected", "collect", "collecting", "Có last month nên dùng quá khứ đơn collected."],
        ["Động từ “go” ở quá khứ đơn là gì?", "went", "goed", "goes", "Go là động từ bất quy tắc, quá khứ là went."],
        ["Động từ “make” ở quá khứ đơn là gì?", "made", "maked", "making", "Make là động từ bất quy tắc, quá khứ là made."],
        ["Cụm “community service” có nghĩa là gì?", "dịch vụ cộng đồng", "dịch vụ thương mại", "công việc nhà", "Community service là hoạt động phục vụ cộng đồng."],
        ["Từ “worked” có âm cuối là gì?", "/t/", "/d/", "/ɪd/", "Sau âm /k/, đuôi ed đọc là /t/."],
        ["They ___ food to poor people last winter.", "provided", "provide", "providing", "Có last winter nên dùng quá khứ đơn provided."],
        ["She ___ at a local library last summer.", "volunteered", "volunteer", "volunteers", "Có last summer nên dùng volunteered."],
        ["Phủ định quá khứ đơn dùng cấu trúc nào?", "did not và động từ nguyên thể", "do not và động từ thêm ing", "was not và động từ thêm s", "Phủ định quá khứ dùng did not cộng động từ nguyên thể."],
        ["Đặt câu hỏi quá khứ đơn, sau Did dùng dạng nào?", "động từ nguyên thể", "động từ thêm ed", "động từ thêm ing", "Sau Did luôn dùng động từ nguyên thể."],
        ["Từ “recycle” có nghĩa là gì?", "tái chế", "vứt bỏ", "đốt cháy", "Recycle là tái chế đồ cũ thành đồ dùng mới."],
        ["Cụm “street children” có nghĩa là gì?", "trẻ em đường phố", "học sinh giỏi", "trẻ em nông thôn", "Street children là trẻ em sống trên đường phố."],
        ["We ___ trees in the park two years ago.", "grew", "grow", "growing", "Có two years ago nên dùng quá khứ của grow là grew."]
      ], [["donate","quyên góp"],["volunteer","tình nguyện viên"],["plant trees","trồng cây"],["clean up","dọn dẹp"],
        ["pick up litter", "nhặt rác"],
        ["nursing home", "viện dưỡng lão"],
        ["street children", "trẻ em đường phố"]]),
      eng7Topic("e7-u4","Unit 4: Music and Arts","Âm nhạc, nghệ thuật • So sánh as…as, like, different from",[
        ["“Classical music” là?", "Nhạc cổ điển", "Nhạc rock", "Nhạc dân ca", "Classical music = nhạc cổ điển."],
        ["“Her singing is … yours.” (giống nhau) Điền:", "as beautiful as", "more beautiful", "different from", "So sánh ngang bằng: as + adj + as."],
        ["“This painting is … that one.” (khác) Điền cụm đúng:", "different from", "as from", "like as", "Different from = khác với."],
        ["“Portrait” là tranh gì?", "Chân dung", "Phong cảnh", "Tĩnh vật", "Portrait = tranh chân dung."],
        ["“He plays the piano … a professional.” (giống như) Điền:", "like", "as as", "from", "Like + danh từ: giống như."],
        ["“Composer” là người làm nghề gì?", "Sáng tác nhạc", "Ca sĩ", "Nhạc công", "Composer = nhà soạn nhạc."],
        ["Từ “puppet” có nghĩa là gì?", "con rối", "búp bê", "diễn viên múa", "Puppet là con rối dùng trong biểu diễn."],
        ["Nghệ thuật “water puppetry” là gì?", "múa rối nước", "múa rối cạn", "kịch nói", "Water puppetry là múa rối nước truyền thống."],
        ["Từ “instrument” trong âm nhạc nghĩa là gì?", "nhạc cụ", "bài hát", "ca sĩ", "Instrument là nhạc cụ như đàn, trống."],
        ["Từ nào chứa âm /ʃ/?", "musician", "measure", "vision", "Musician chứa âm /ʃ/."],
        ["Từ nào chứa âm /ʒ/?", "television", "sheep", "chair", "Television chứa âm /ʒ/."],
        ["This song is not as ___ as that song.", "interesting", "interest", "interested in", "Cấu trúc not as cộng tính từ cộng as."],
        ["Cụm “folk music” có nghĩa là gì?", "nhạc dân gian", "nhạc cổ điển", "nhạc trẻ", "Folk music là nhạc dân gian truyền thống."],
        ["Cụm “art gallery” có nghĩa là gì?", "phòng trưng bày nghệ thuật", "rạp chiếu phim", "nhà hát lớn", "Art gallery là nơi trưng bày tác phẩm nghệ thuật."],
        ["Từ “perform” có nghĩa là gì?", "biểu diễn", "luyện tập", "sáng tác", "Perform là biểu diễn trước khán giả."],
        ["Từ “painter” có nghĩa là gì?", "họa sĩ", "nhạc sĩ", "ca sĩ", "Painter là người vẽ tranh, họa sĩ."],
        ["___ his brother, Nam can play the piano well.", "Like", "Likes", "Liking", "Like ở đây là giới từ nghĩa là giống như."],
        ["Từ nào chứa âm /ʃ/ ở đầu?", "brush", "genre", "measure", "Brush bắt đầu bằng âm /ʃ/."],
        ["Từ “concert” có nghĩa là gì?", "buổi hòa nhạc", "buổi triển lãm", "vở kịch", "Concert là buổi hòa nhạc."],
        ["Từ “exhibition” có nghĩa là gì?", "triển lãm", "hòa nhạc", "cuộc thi", "Exhibition là buổi triển lãm tranh hoặc hiện vật."],
        ["Từ “sculpture” có nghĩa là gì?", "tác phẩm điêu khắc", "bức tranh sơn dầu", "bài thơ", "Sculpture là tác phẩm điêu khắc."],
        ["The new painting is as ___ as the old one.", "colourful", "colour", "colours", "Cấu trúc as cộng tính từ cộng as chỉ sự bằng nhau."],
        ["Từ “talented” có nghĩa là gì?", "có tài năng", "nổi tiếng khắp nơi", "giàu có", "Talented nghĩa là có tài năng."],
        ["Từ “opera” có nghĩa là gì?", "nhạc kịch", "nhạc dân gian", "múa rối", "Opera là nhạc kịch kết hợp hát và diễn xuất."],
        ["This film is different ___ that film.", "from", "with", "than to", "Cụm different from nghĩa là khác với."],
        ["Người chơi đàn violin trong tiếng Anh gọi là gì?", "violinist", "pianist", "guitarist", "Violinist là người chơi đàn vĩ cầm."]
      ], [["portrait","tranh chân dung"],["composer","nhà soạn nhạc"],["classical music","nhạc cổ điển"],["different from","khác với"],
        ["water puppetry", "múa rối nước"],
        ["art gallery", "phòng trưng bày nghệ thuật"],
        ["musical instrument", "nhạc cụ"]]),
      eng7Topic("e7-u5","Unit 5: Food and Drink","Đồ ăn, thức uống • some, a lot of",[
        ["“Pho” is a famous … dish.", "Vietnamese", "Japanese only", "Mexican", "Phở là món ăn nổi tiếng của Việt Nam."],
        ["“How … sugar do you need?” (sugar không đếm được)", "much", "many", "fews", "Danh từ không đếm được dùng much."],
        ["“There is … bread on the table.” Điền:", "some", "a lots", "many", "Some + danh từ không đếm được trong câu khẳng định."],
        ["“Spring rolls” là món gì?", "Nem / chả giò rán", "Bánh mì", "Phở cuốn sống", "Spring rolls = nem rán (chả giò)."],
        ["“A lot of” dùng được với loại danh từ nào?", "Cả đếm được số nhiều và không đếm được", "Chỉ số ít", "Chỉ danh từ riêng", "A lot of + N số nhiều / N không đếm được."],
        ["“Lemonade” là nước gì?", "Nước chanh", "Nước cam", "Trà đá", "Lemonade = nước chanh."],
        ["Từ “omelette” có nghĩa là gì?", "trứng tráng", "trứng luộc", "trứng muối", "Omelette là món trứng tráng."],
        ["How ___ eggs do we need for the cake?", "many", "much", "a lot", "Eggs đếm được số nhiều nên dùng many."],
        ["How ___ rice is there in the pot?", "much", "many", "few", "Rice không đếm được nên dùng much."],
        ["Would you like ___ tea?", "some", "many", "a few", "Câu mời lịch sự dùng some với danh từ không đếm được."],
        ["Từ nào chứa âm /ɒ/?", "pot", "water", "pork", "Pot chứa âm /ɒ/."],
        ["Từ nào chứa âm /ɔː/?", "pork", "hot", "coffee", "Pork chứa âm /ɔː/."],
        ["Từ “beef” có nghĩa là gì?", "thịt bò", "thịt heo", "thịt gà", "Beef là thịt bò."],
        ["Từ “recipe” có nghĩa là gì?", "công thức nấu ăn", "thực đơn", "hóa đơn", "Recipe là công thức nấu ăn."],
        ["Từ “ingredient” có nghĩa là gì?", "nguyên liệu", "dụng cụ bếp", "món ăn", "Ingredient là nguyên liệu để nấu món ăn."],
        ["Từ “fry” có nghĩa là gì?", "chiên hoặc rán", "luộc", "hấp", "Fry là chiên hoặc rán trong dầu."],
        ["Từ “broth” có nghĩa là gì?", "nước dùng", "nước sốt cay", "nước ép", "Broth là nước dùng nấu từ xương hoặc rau."],
        ["There are ___ bottles of milk in the fridge.", "many", "much", "a little of", "Bottles đếm được số nhiều nên dùng many."],
        ["She drinks a lot of ___ every day.", "water", "apple", "egg", "Water không đếm được, dùng được với a lot of."],
        ["Từ “delicious” có nghĩa là gì?", "ngon miệng", "cay nồng", "mặn chát", "Delicious nghĩa là rất ngon."],
        ["Cụm “mineral water” có nghĩa là gì?", "nước khoáng", "nước mưa", "nước đá", "Mineral water là nước khoáng."],
        ["Cụm “green tea” có nghĩa là gì?", "trà xanh", "trà đen", "trà sữa", "Green tea là trà xanh."],
        ["Món “eel soup” là đặc sản của vùng nào?", "Nghệ An", "Hà Nội", "Đà Nẵng", "Súp lươn là đặc sản nổi tiếng của Nghệ An."],
        ["Từ “boil” có nghĩa là gì?", "luộc hoặc đun sôi", "chiên giòn", "nướng than", "Boil là luộc hoặc đun sôi trong nước."],
        ["We need a ___ of beef for dinner.", "kilo", "many", "much", "Đơn vị đo với thịt dùng a kilo of."],
        ["Từ nào chứa âm /ɔː/ ở giữa?", "water", "coffee", "pot", "Water chứa âm /ɔː/ ở âm tiết đầu."]
      ], [["spring rolls","nem rán"],["lemonade","nước chanh"],["some","một ít (khẳng định)"],["a lot of","nhiều"],
        ["omelette", "trứng tráng"],
        ["mineral water", "nước khoáng"],
        ["green tea", "trà xanh"]]),
      eng7Topic("e7-u6","Unit 6: A Visit to a School","Trường học • Giới từ thời gian, nơi chốn",[
        ["“The meeting starts … 7 a.m.” Điền giới từ:", "at", "on", "in", "Giờ cụ thể dùng at."],
        ["“Her birthday is … Sunday.” Điền:", "on", "at", "in", "Ngày / thứ dùng on."],
        ["“School library” là gì?", "Thư viện trường", "Phòng thí nghiệm", "Sân trường", "Library = thư viện."],
        ["“We have English … the morning.” Điền:", "in", "at", "on", "Buổi trong ngày (morning/afternoon) dùng in."],
        ["“Lower secondary school” tương ứng cấp học nào?", "Trường THCS", "Trường tiểu học", "Trường THPT", "Lower secondary = trung học cơ sở."],
        ["“The school is … the post office.” (đối diện) Cụm nào đúng?", "opposite", "between to", "nexts", "Opposite = đối diện."],
        ["School starts again ___ September.", "in", "on", "at", "Trước tháng dùng giới từ in."],
        ["Her birthday is ___ 5 May.", "on", "in", "at", "Trước ngày tháng cụ thể dùng on."],
        ["We have lunch ___ noon.", "at", "on", "in", "At noon là vào buổi trưa."],
        ["Từ nào chứa âm /tʃ/?", "chalk", "gym", "subject", "Chalk bắt đầu bằng âm /tʃ/."],
        ["Từ nào chứa âm /dʒ/?", "gym", "chalk", "teacher", "Gym bắt đầu bằng âm /dʒ/."],
        ["Cụm “playground” có nghĩa là gì?", "sân chơi", "phòng học", "thư viện", "Playground là sân chơi của trường."],
        ["Cụm “computer room” có nghĩa là gì?", "phòng máy tính", "phòng thí nghiệm", "phòng họp", "Computer room là phòng máy tính."],
        ["Từ “entrance” có nghĩa là gì?", "lối vào", "lối ra", "sân trường", "Entrance là lối vào của một tòa nhà."],
        ["Cụm “well-known” có nghĩa là gì?", "nổi tiếng", "hiện đại", "rộng lớn", "Well-known nghĩa là được nhiều người biết đến."],
        ["Từ nào chứa âm /tʃ/ ở giữa?", "lunch", "January", "gym", "Lunch chứa âm /tʃ/ ở cuối."],
        ["Từ nào chứa âm /dʒ/ ở đầu?", "January", "chalk", "school", "January bắt đầu bằng âm /dʒ/."],
        ["Cụm “school facilities” có nghĩa là gì?", "cơ sở vật chất trường học", "học sinh giỏi", "thời khóa biểu", "Facilities là cơ sở vật chất phục vụ học tập."],
        ["We have a test ___ Friday.", "on", "in", "at", "Trước thứ trong tuần dùng on."],
        ["The library is ___ the two classrooms.", "between", "on", "at", "Between dùng khi ở giữa hai vật."],
        ["Cụm “take a school tour” có nghĩa là gì?", "tham quan trường", "thi vào trường", "dọn dẹp trường", "School tour là chuyến tham quan trường."],
        ["Classes finish ___ 5 p.m.", "at", "on", "in", "Trước giờ cụ thể dùng at."],
        ["Từ “laboratory” có nghĩa là gì?", "phòng thí nghiệm", "phòng máy tính", "sân vận động", "Laboratory là phòng thí nghiệm."],
        ["Học sinh có năng khiếu được gọi là gì?", "gifted students", "new students", "bad students", "Gifted students là học sinh có năng khiếu."]
      ], [["library","thư viện"],["at 7 a.m.","giờ cụ thể"],["on Sunday","thứ / ngày"],["in the morning","buổi sáng"],
        ["playground", "sân chơi"],
        ["computer room", "phòng máy tính"],
        ["school yard", "sân trường"]]),
      eng7Topic("e7-u7","Unit 7: Traffic","Giao thông • should / shouldn't • It chỉ khoảng cách",[
        ["“You … wear a helmet when riding a motorbike.”", "should", "shouldn't", "mustn't to", "Nên đội mũ bảo hiểm → should."],
        ["“It is about 2 km … my house to school.” Điền:", "from", "to from", "at", "It is + khoảng cách + from A to B."],
        ["“Traffic jam” là gì?", "Tắc đường, kẹt xe", "Đèn giao thông", "Vạch qua đường", "Traffic jam = ùn tắc giao thông."],
        ["“Cyclists should ride on the …”", "right side of the road", "pavement only for walking fast", "middle of the motorway", "Đi xe đạp ở phía bên phải đường."],
        ["Biển báo hình tam giác thường là biển gì?", "Biển cảnh báo nguy hiểm", "Biển chỉ dẫn", "Biển quảng cáo", "Biển tam giác viền đỏ là biển báo nguy hiểm."],
        ["“You shouldn't … when driving.”", "use your phone", "wear a seat belt", "obey traffic rules", "Không dùng điện thoại khi lái xe."],
        ["Cụm “seat belt” có nghĩa là gì?", "dây an toàn", "vô lăng", "ghế ngồi", "Seat belt là dây an toàn trên ô tô."],
        ["Passengers in a car should ___ their seat belts.", "fasten", "fastening", "fastened", "Sau should dùng động từ nguyên thể."],
        ["Từ nào chứa âm /aɪ/?", "bike", "train", "plane", "Bike chứa âm /aɪ/."],
        ["Từ nào chứa âm /eɪ/?", "train", "bike", "fly", "Train chứa âm /eɪ/."],
        ["Từ “pedestrian” có nghĩa là gì?", "người đi bộ", "người lái xe", "hành khách", "Pedestrian là người đi bộ."],
        ["Cụm “zebra crossing” có nghĩa là gì?", "vạch sang đường", "ngã tư", "đèn giao thông", "Zebra crossing là vạch kẻ cho người sang đường."],
        ["Từ “passenger” có nghĩa là gì?", "hành khách", "tài xế", "cảnh sát", "Passenger là hành khách trên xe."],
        ["Câu “How far is it from A to B?” hỏi về điều gì?", "khoảng cách", "thời gian đi", "giá vé", "How far hỏi về khoảng cách giữa hai nơi."],
        ["Từ “distance” có nghĩa là gì?", "khoảng cách", "tốc độ", "hướng đi", "Distance là khoảng cách giữa hai điểm."],
        ["You should ___ traffic rules.", "obey", "obeys", "obeying", "Sau should dùng động từ nguyên thể obey."],
        ["Đèn đỏ báo hiệu điều gì?", "dừng lại", "đi tiếp", "rẽ trái ngay", "Đèn đỏ nghĩa là phải dừng lại."],
        ["Từ nào chứa âm /aɪ/ ở giữa?", "fly", "sail", "train", "Fly chứa âm /aɪ/."],
        ["Từ nào chứa âm /eɪ/ ở giữa?", "sail", "fly", "bike", "Sail chứa âm /eɪ/."],
        ["Cụm “cross the road” có nghĩa là gì?", "băng qua đường", "đi dọc đường", "sửa đường", "Cross the road là băng qua đường."],
        ["Từ “safely” có nghĩa là gì?", "một cách an toàn", "một cách nhanh chóng", "một cách ồn ào", "Safely là trạng từ nghĩa là an toàn."],
        ["You shouldn't ___ when the light is red.", "cross the road", "wait quietly", "stop your bike", "Đèn đỏ thì không được băng qua đường."],
        ["Từ “cycle” có nghĩa là gì?", "đi xe đạp", "đi xe máy", "đi ô tô", "Cycle là đi xe đạp."],
        ["Người lái xe nên làm gì ở vạch sang đường?", "nhường người đi bộ", "bấm còi liên tục", "tăng tốc qua nhanh", "Tài xế phải nhường đường cho người đi bộ."],
        ["Cụm “road sign” có nghĩa là gì?", "biển báo giao thông", "bản đồ đường đi", "tên đường", "Road sign là biển báo trên đường."],
        ["You should ___ your bike slowly in the rain.", "ride", "rides", "riding", "Sau should dùng động từ nguyên thể ride."]
      ], [["traffic jam","kẹt xe"],["helmet","mũ bảo hiểm"],["should","nên"],["shouldn't","không nên"],
        ["seat belt", "dây an toàn"],
        ["zebra crossing", "vạch sang đường"],
        ["pedestrian", "người đi bộ"]]),
      eng7Topic("e7-u8","Unit 8: Films","Phim ảnh • although / however",[
        ["“A comedy” là thể loại phim nào?", "Phim hài", "Phim kinh dị", "Phim tài liệu", "Comedy = hài kịch."],
        ["“The film was long. …, it was interesting.” Điền:", "However", "Although", "Despite", "However đứng đầu câu thứ hai, trước dấu phẩy, nối ý tương phản."],
        ["“Although he was tired, he … the film.” — mệnh đề sau although thế nào?", "Vế sau vẫn đầy đủ chủ–vị, không dùng but", "Bắt buộc có but", "Không cần chủ ngữ", "Although đã mang nghĩa tương phản nên không dùng thêm but."],
        ["“Horror film” là phim gì?", "Phim kinh dị", "Phim hoạt hình", "Phim tình cảm", "Horror = kinh dị."],
        ["“Boring” có nghĩa là?", "Nhàm chán", "Hấp dẫn", "Đáng sợ", "Boring = chán, tẻ nhạt."],
        ["Đánh giá phim “A must-see” nghĩa là?", "Phim rất đáng xem", "Phim dở tệ", "Phim cấm xem", "A must-see = bộ phim không nên bỏ lỡ."],
        ["Từ “animation” có nghĩa là gì?", "phim hoạt hình", "phim tài liệu", "phim hành động", "Animation là phim hoạt hình."],
        ["Cụm “science fiction film” là loại phim gì?", "phim khoa học viễn tưởng", "phim hài", "phim kinh dị", "Science fiction là khoa học viễn tưởng."],
        ["Từ nào chứa âm /ɪə/?", "here", "hair", "her", "Here chứa âm /ɪə/."],
        ["Từ nào chứa âm /eə/?", "hair", "here", "idea", "Hair chứa âm /eə/."],
        ["___ the film was long, I enjoyed it.", "Although", "However", "But", "Although đứng đầu mệnh đề nhượng bộ."],
        ["Từ “though” gần nghĩa với từ nào?", "although", "however", "because", "Though gần nghĩa với although."],
        ["Từ “frightening” có nghĩa là gì?", "đáng sợ", "buồn cười", "cảm động", "Frightening nghĩa là gây sợ hãi."],
        ["Từ “moving” khi tả phim có nghĩa là gì?", "cảm động", "nhàm chán", "bạo lực", "Moving film là bộ phim gây xúc động."],
        ["Từ “violent” có nghĩa là gì?", "bạo lực", "lãng mạn", "hài hước", "Violent nghĩa là có nhiều cảnh bạo lực."],
        ["Từ “documentary” có nghĩa là gì?", "phim tài liệu", "phim hoạt hình", "phim giả tưởng", "Documentary là phim tài liệu về đời thực."],
        ["Từ “actor” có nghĩa là gì?", "diễn viên nam", "đạo diễn", "nhà sản xuất", "Actor là diễn viên nam."],
        ["Từ “review” về phim có nghĩa là gì?", "bài đánh giá phim", "áp phích phim", "vé xem phim", "Review là bài nhận xét, đánh giá phim."],
        ["Từ “plot” có nghĩa là gì?", "cốt truyện", "nhân vật chính", "kết phim", "Plot là cốt truyện của bộ phim."],
        ["Từ nào chứa âm /ɪə/ ở giữa?", "idea", "care", "hair", "Idea chứa âm /ɪə/."],
        ["Từ nào chứa âm /eə/ ở giữa?", "care", "here", "near", "Care chứa âm /eə/."],
        ["Từ “fantasy” chỉ loại phim gì?", "phim giả tưởng", "phim tài liệu", "phim chiến tranh", "Fantasy là phim giả tưởng nhiều phép thuật."],
        ["Từ “gripping” khi tả phim nghĩa là gì?", "hấp dẫn và lôi cuốn", "tẻ nhạt", "khó hiểu", "Gripping nghĩa là hấp dẫn, giữ chân người xem."],
        ["Từ “director” có nghĩa là gì?", "đạo diễn", "diễn viên nữ", "người xem", "Director là đạo diễn của bộ phim."],
        ["Từ “character” trong phim nghĩa là gì?", "nhân vật", "đạo cụ", "phông nền", "Character là nhân vật trong phim."],
        ["Từ “ending” khi nói về phim có nghĩa là gì?", "kết thúc phim", "mở đầu phim", "áp phích phim", "Ending là phần kết thúc của bộ phim."]
      ], [["comedy","phim hài"],["horror film","phim kinh dị"],["however","tuy nhiên"],["boring","nhàm chán"],
        ["animation", "phim hoạt hình"],
        ["documentary", "phim tài liệu"],
        ["science fiction film", "phim khoa học viễn tưởng"]]),
      eng7Topic("e7-u9","Unit 9: Festivals Around the World","Lễ hội • Câu hỏi Yes/No",[
        ["“Tet” is the biggest festival in …?", "Viet Nam", "Japan", "Brazil", "Tết Nguyên đán là lễ hội lớn nhất ở Việt Nam."],
        ["Câu hỏi Yes/No đúng ngữ pháp:", "Did you enjoy the festival?", "You did enjoy the festival?", "Enjoyed you the festival?", "Câu hỏi Yes/No bắt đầu bằng trợ động từ: Did you...?"],
        ["“La Tomatina” (lễ hội cà chua) diễn ra ở nước nào?", "Tây Ban Nha", "Ý", "Pháp", "La Tomatina ở Buñol, Tây Ban Nha."],
        ["“Mid-Autumn Festival” là Tết gì?", "Tết Trung thu", "Tết Nguyên đán", "Tết Đoan Ngọ", "Mid-Autumn Festival = Trung thu."],
        ["Trọng âm của từ “festival” rơi vào âm tiết thứ mấy?", "Thứ nhất (FES-ti-val)", "Thứ hai", "Thứ ba", "Festival nhấn âm 1."],
        ["“Do they celebrate Christmas in Australia?” — trả lời ngắn đúng:", "Yes, they do.", "Yes, they does.", "Yes, they are do.", "Trả lời ngắn với Do → Yes, they do."],
        ["Lễ Giáng sinh trong tiếng Anh là gì?", "Christmas", "Easter", "Thanksgiving", "Christmas là lễ Giáng sinh vào tháng 12."],
        ["Từ “enjoy” nhấn trọng âm ở âm tiết nào?", "âm tiết thứ hai", "âm tiết thứ nhất", "không có trọng âm", "Enjoy nhấn âm tiết thứ hai."],
        ["Từ “perform” nhấn trọng âm ở âm tiết nào?", "âm tiết thứ hai", "âm tiết thứ nhất", "âm tiết thứ ba", "Perform nhấn âm tiết thứ hai."],
        ["Are you free this weekend? — ___", "Yes, I am.", "Yes, I do.", "Yes, I are.", "Câu hỏi với Are trả lời bằng am."],
        ["Is she going to the festival? — ___", "Yes, she is.", "Yes, she does.", "Yes, she can to", "Câu hỏi với Is trả lời bằng is."],
        ["Từ “Easter” có nghĩa là gì?", "lễ Phục sinh", "lễ Tạ ơn", "lễ Giáng sinh", "Easter là lễ Phục sinh vào mùa xuân."],
        ["Từ “Thanksgiving” có nghĩa là gì?", "lễ Tạ ơn", "lễ Phục sinh", "năm mới", "Thanksgiving là lễ Tạ ơn ở Bắc Mỹ."],
        ["Từ “parade” có nghĩa là gì?", "cuộc diễu hành", "buổi hòa nhạc", "cuộc thi nấu ăn", "Parade là cuộc diễu hành trên đường phố."],
        ["Từ “costume” có nghĩa là gì?", "trang phục hóa trang", "đồ ăn lễ hội", "nhạc cụ", "Costume là trang phục hóa trang trong lễ hội."],
        ["Halloween diễn ra vào ngày nào?", "31 tháng 10", "25 tháng 12", "1 tháng 1", "Halloween diễn ra vào 31 tháng 10."],
        ["Liên hoan phim Cannes diễn ra ở nước nào?", "Pháp", "Tây Ban Nha", "Brazil", "Cannes là liên hoan phim nổi tiếng ở Pháp."],
        ["Từ “celebrate” có nghĩa là gì?", "tổ chức ăn mừng", "trang trí nhà cửa", "chuẩn bị đồ ăn", "Celebrate là tổ chức ăn mừng một dịp lễ."],
        ["Từ “season” nhấn trọng âm ở âm tiết nào?", "âm tiết thứ nhất", "âm tiết thứ hai", "âm tiết thứ ba", "Season nhấn âm tiết thứ nhất."],
        ["Does he like festivals? — ___", "Yes, he does.", "Yes, he is.", "Yes, he do.", "Câu hỏi với Does trả lời bằng does."],
        ["Từ “traditional” có nghĩa là gì?", "truyền thống", "hiện đại", "nước ngoài", "Traditional nghĩa là thuộc về truyền thống."],
        ["Lễ hội Carnival nổi tiếng nhất diễn ra ở đâu?", "Rio, Brazil", "London, Anh", "Cannes, Pháp", "Rio Carnival ở Brazil là lễ hội hóa trang lớn."],
        ["Từ “mask” có nghĩa là gì?", "mặt nạ", "mũ lễ hội", "áo choàng", "Mask là mặt nạ đeo trong lễ hội."],
        ["Từ “decorate” có nghĩa là gì?", "trang trí", "ăn mừng", "biểu diễn", "Decorate là trang trí nhà cửa, đường phố."],
        ["Từ “special” nhấn trọng âm ở âm tiết nào?", "âm tiết thứ nhất", "âm tiết thứ hai", "âm tiết thứ ba", "Special nhấn âm tiết thứ nhất."],
        ["Từ “fireworks” có nghĩa là gì?", "pháo hoa", "đèn lồng", "nến thơm", "Fireworks là pháo hoa trong dịp lễ."]
      ], [["Tet","Tết Nguyên đán"],["Mid-Autumn Festival","Tết Trung thu"],["La Tomatina","Tây Ban Nha"],["festival","lễ hội"],
        ["Thanksgiving", "lễ Tạ ơn"],
        ["Easter", "lễ Phục sinh"],
        ["parade", "cuộc diễu hành"]]),
      eng7Topic("e7-u10","Unit 10: Energy Sources","Nguồn năng lượng • Hiện tại tiếp diễn",[
        ["“Solar energy” là năng lượng gì?", "Năng lượng mặt trời", "Năng lượng gió", "Thuỷ điện", "Solar = mặt trời."],
        ["“They … solar panels now.” Điền:", "are installing", "install yesterday", "installs", "Now → hiện tại tiếp diễn: are installing."],
        ["Nguồn nào là năng lượng tái tạo?", "Năng lượng gió", "Than đá", "Dầu mỏ", "Gió, mặt trời, nước là năng lượng tái tạo."],
        ["“Non-renewable” nghĩa là?", "Không tái tạo được", "Tái tạo nhanh", "Miễn phí", "Than, dầu là nguồn không tái tạo."],
        ["Cấu trúc hiện tại tiếp diễn là?", "am/is/are + V-ing", "will + V", "V-ed", "Present continuous: be + V-ing."],
        ["“Hydro energy” liên quan đến yếu tố nào?", "Nước", "Gió", "Mặt trời", "Hydro = nước (thuỷ điện)."],
        ["Từ “biogas” có nghĩa là gì?", "khí sinh học", "khí tự nhiên", "than đá", "Biogas là khí sinh học từ chất thải hữu cơ."],
        ["Từ “coal” có nghĩa là gì?", "than đá", "dầu mỏ", "khí đốt", "Coal là than đá, nhiên liệu hóa thạch."],
        ["Cụm “natural gas” có nghĩa là gì?", "khí tự nhiên", "khí sinh học", "hơi nước", "Natural gas là khí tự nhiên dưới lòng đất."],
        ["Workers ___ a wind farm now.", "are building", "builds", "built yesterday", "Có now nên dùng hiện tại tiếp diễn are building."],
        ["At the moment, we ___ too much electricity.", "are wasting", "wastes", "wasted", "At the moment là dấu hiệu hiện tại tiếp diễn."],
        ["Từ “energy” nhấn trọng âm ở âm tiết nào?", "âm tiết thứ nhất", "âm tiết thứ hai", "âm tiết thứ ba", "Energy nhấn âm tiết thứ nhất."],
        ["Từ “expensive” nhấn trọng âm ở âm tiết nào?", "âm tiết thứ hai", "âm tiết thứ nhất", "âm tiết thứ ba", "Expensive nhấn âm tiết thứ hai."],
        ["Từ “dangerous” nhấn trọng âm ở âm tiết nào?", "âm tiết thứ nhất", "âm tiết thứ hai", "âm tiết thứ ba", "Dangerous nhấn âm tiết thứ nhất."],
        ["Từ “available” có nghĩa là gì?", "sẵn có", "đắt đỏ", "nguy hiểm", "Available nghĩa là có sẵn để dùng."],
        ["Từ “reduce” có nghĩa là gì?", "giảm bớt", "tăng lên", "sản xuất", "Reduce nghĩa là giảm bớt lượng dùng."],
        ["Khí sinh học thuộc loại năng lượng nào?", "tái tạo được", "không tái tạo được", "hóa thạch", "Biogas tạo ra liên tục nên tái tạo được."],
        ["They ___ coal at the moment. (phủ định)", "aren't using", "doesn't use", "not use", "Phủ định hiện tại tiếp diễn dùng are not thêm ing."],
        ["Cụm “fossil fuels” có nghĩa là gì?", "nhiên liệu hóa thạch", "năng lượng tái tạo", "khí sinh học", "Fossil fuels gồm than đá, dầu mỏ và khí tự nhiên."],
        ["Cụm “run out” có nghĩa là gì?", "cạn kiệt", "bắt đầu", "tái tạo", "Run out nghĩa là dùng hết, cạn kiệt."],
        ["Từ “source” trong energy source nghĩa là gì?", "nguồn", "máy móc", "nhà máy", "Source nghĩa là nguồn cung cấp."],
        ["Từ “electricity” có nghĩa là gì?", "điện", "nhiệt", "ánh sáng", "Electricity là điện năng."],
        ["Are you using the fan now? — ___", "Yes, I am.", "Yes, I do.", "Yes, I use.", "Câu hỏi hiện tại tiếp diễn trả lời bằng am."],
        ["Dấu hiệu nào thường đi với hiện tại tiếp diễn?", "at the moment", "yesterday", "last year", "At the moment chỉ việc đang xảy ra."],
        ["Từ “environment” có nghĩa là gì?", "môi trường", "năng lượng", "thiết bị", "Environment là môi trường sống xung quanh."],
        ["Từ “produce” trong bài năng lượng nghĩa là gì?", "sản xuất ra", "tiết kiệm", "lãng phí", "Produce nghĩa là sản xuất ra năng lượng."]
      ], [["solar energy","năng lượng mặt trời"],["wind energy","năng lượng gió"],["renewable","tái tạo được"],["are installing","đang lắp đặt (hiện tại tiếp diễn)"],
        ["biogas", "khí sinh học"],
        ["fossil fuels", "nhiên liệu hóa thạch"],
        ["natural gas", "khí tự nhiên"]]),
      eng7Topic("e7-u11","Unit 11: Travelling in the Future","Giao thông tương lai • Tương lai đơn, sở hữu",[
        ["“We … by flying car in 2050.” Điền:", "will travel", "travel yesterday", "travels now", "Năm 2050 → tương lai đơn: will travel."],
        ["“This is not my bike. It's …” (của cô ấy) Điền đại từ sở hữu:", "hers", "her", "she", "Đại từ sở hữu: hers (không cần danh từ theo sau)."],
        ["“Hyperloop” là phương tiện gì?", "Tàu siêu tốc trong ống chân không", "Xe đạp điện", "Thuyền buồm", "Hyperloop là hệ thống tàu tốc độ rất cao."],
        ["Tính từ sở hữu trước danh từ “book”: “This is … book.” (của tôi)", "my", "mine", "me", "Trước danh từ dùng tính từ sở hữu my; mine đứng độc lập."],
        ["“Driverless car” là xe gì?", "Xe không người lái / tự lái", "Xe không có bánh", "Xe bay", "Driverless = không tài xế."],
        ["Dấu hiệu nhận biết thì tương lai đơn:", "will + động từ nguyên thể", "am/is/are + V-ing", "has + V3", "Future simple: will + V nguyên thể."],
        ["Cụm “flying car” có nghĩa là gì?", "ô tô bay", "ô tô tự lái", "tàu siêu tốc", "Flying car là ô tô có thể bay."],
        ["This bike is not yours. It is ___.", "mine", "my", "me", "Mine là đại từ sở hữu nghĩa là của tôi."],
        ["Those houses are not ours. They are ___.", "theirs", "their", "them", "Theirs là đại từ sở hữu nghĩa là của họ."],
        ["Từ “won't” là viết tắt của cụm nào?", "will not", "would not", "was not", "Won't là viết tắt của will not."],
        ["Will robots drive cars? — ___", "Yes, they will.", "Yes, they do.", "Yes, they are.", "Câu hỏi với Will trả lời bằng will."],
        ["Cụm “solar-powered ship” có nghĩa là gì?", "tàu chạy bằng năng lượng mặt trời", "tàu chạy bằng gió", "tàu ngầm", "Solar-powered là chạy bằng năng lượng mặt trời."],
        ["Cụm “eco-friendly” có nghĩa là gì?", "thân thiện với môi trường", "hiện đại", "tiện lợi", "Eco-friendly nghĩa là thân thiện với môi trường."],
        ["Từ “convenient” có nghĩa là gì?", "tiện lợi", "đắt đỏ", "nguy hiểm", "Convenient nghĩa là tiện lợi khi sử dụng."],
        ["Từ “teleporter” chỉ thiết bị gì?", "máy dịch chuyển tức thời", "máy bay không người lái", "tàu điện ngầm", "Teleporter giúp di chuyển tức thời tới nơi khác."],
        ["Từ “disappear” có nghĩa là gì?", "biến mất", "xuất hiện", "hạ cánh", "Disappear nghĩa là biến mất khỏi tầm nhìn."],
        ["In 2100, people ___ in houses under the sea.", "will live", "lived", "living", "In 2100 là tương lai nên dùng will live."],
        ["___ car is red. (của họ)", "Their", "Theirs", "Them", "Trước danh từ dùng tính từ sở hữu their."],
        ["The big house near the lake is ___. (của chúng tôi)", "ours", "our", "us", "Ours là đại từ sở hữu đứng một mình."],
        ["Tomorrow ___ sunny and warm.", "will be", "was be", "is been", "Dự đoán thời tiết tương lai dùng will be."],
        ["Future cars will ___ electricity.", "run on", "run out off", "runs on", "Run on nghĩa là chạy bằng một loại năng lượng."],
        ["Từ “appear” có nghĩa là gì?", "xuất hiện", "biến mất", "di chuyển", "Appear nghĩa là xuất hiện."],
        ["Từ “modern” có nghĩa là gì?", "hiện đại", "cổ xưa", "truyền thống", "Modern nghĩa là hiện đại."],
        ["Cụm “pilotless plane” có nghĩa là gì?", "máy bay không người lái", "máy bay chở khách lớn", "máy bay chạy bằng gió", "Pilotless plane là máy bay không cần phi công."],
        ["Is this umbrella ___? (của bạn)", "yours", "your", "you", "Yours là đại từ sở hữu nghĩa là của bạn."],
        ["We ___ a trip to Mars in 2040.", "will take", "took", "takes yesterday", "In 2040 là tương lai nên dùng will take."]
      ], [["will travel","sẽ di chuyển (tương lai)"],["hers","của cô ấy (sở hữu)"],["driverless car","xe tự lái"],["hyperloop","tàu siêu tốc"],
        ["flying car", "ô tô bay"],
        ["teleporter", "máy dịch chuyển tức thời"],
        ["solar-powered ship", "tàu năng lượng mặt trời"]]),
      eng7Topic("e7-u12","Unit 12: English-Speaking Countries","Các nước nói tiếng Anh • Mạo từ a/an/the",[
        ["Thủ đô của Australia là?", "Canberra", "Sydney", "London", "Thủ đô Australia là Canberra (Sydney là thành phố lớn nhất)."],
        ["“I visited … United States last year.” Điền:", "the", "a", "không cần mạo từ", "Tên nước có dạng hợp chúng quốc dùng the: the United States."],
        ["Quốc gia nào KHÔNG phải nước nói tiếng Anh bản ngữ phổ biến trong bài?", "France (Pháp)", "Canada", "New Zealand", "Pháp nói tiếng Pháp, không thuộc nhóm nước nói tiếng Anh."],
        ["“He is … honest man.” Điền:", "an", "a", "the one", "Honest phát âm bắt đầu bằng nguyên âm (h câm) → an."],
        ["Biểu tượng nổi tiếng của London là?", "Tháp đồng hồ Big Ben", "Tháp Eiffel", "Tượng Nữ thần Tự do", "Big Ben ở London, Anh."],
        ["“Scotland” thuộc quốc gia nào?", "Vương quốc Anh (the UK)", "Australia", "Canada", "Scotland là một phần của Vương quốc Anh."],
        ["Thủ đô của New Zealand là thành phố nào?", "Wellington", "Canberra", "Ottawa", "Wellington là thủ đô của New Zealand."],
        ["Thủ đô của Canada là thành phố nào?", "Ottawa", "London", "Washington D.C.", "Ottawa là thủ đô của Canada."],
        ["Người Australia trong tiếng Anh gọi là gì?", "Australians", "Americans", "Canadians", "Người Australia gọi là Australians."],
        ["Người Canada trong tiếng Anh gọi là gì?", "Canadians", "Australians", "New Zealanders", "Người Canada gọi là Canadians."],
        ["___ umbrella is on the table.", "An", "A", "Many", "Umbrella bắt đầu bằng nguyên âm nên dùng an."],
        ["Tượng Nữ thần Tự do nằm ở thành phố nào?", "New York", "London", "Sydney", "Tượng Nữ thần Tự do nằm ở New York, Mỹ."],
        ["Con vật nào là biểu tượng của Australia?", "kangaroo", "kiwi", "eagle", "Kangaroo là biểu tượng nổi tiếng của Australia."],
        ["Người New Zealand còn được gọi thân mật là gì?", "Kiwis", "Aussies", "Britons", "Người New Zealand được gọi thân mật là Kiwis."],
        ["Thủ đô của Vương quốc Anh là thành phố nào?", "London", "Edinburgh", "Cardiff", "London là thủ đô của Vương quốc Anh."],
        ["___ River Thames flows through London.", "The", "An", "A", "Tên sông dùng mạo từ the."],
        ["Canada is ___ English-speaking country.", "an", "a", "many", "English bắt đầu bằng nguyên âm nên dùng an."],
        ["Từ “castle” có nghĩa là gì?", "lâu đài", "hòn đảo", "thủ đô", "Castle là lâu đài, Scotland có nhiều lâu đài cổ."],
        ["Hồ Loch Ness nổi tiếng nằm ở nước nào?", "Scotland", "Canada", "Australia", "Loch Ness nằm ở Scotland, nổi tiếng với truyền thuyết quái vật."],
        ["Từ “island” có nghĩa là gì?", "hòn đảo", "lâu đài", "sa mạc", "Island là hòn đảo giữa biển hoặc hồ."],
        ["Người Mỹ trong tiếng Anh gọi là gì?", "Americans", "Australians", "Canadians", "Người Mỹ gọi là Americans."],
        ["___ United Kingdom is in Europe.", "The", "An", "A", "Tên nước có United dùng mạo từ the."],
        ["Từ “spectacular” có nghĩa là gì?", "ngoạn mục, hùng vĩ", "nhỏ bé", "bình thường", "Spectacular tả cảnh đẹp ngoạn mục, hùng vĩ."],
        ["Nhà hát Opera Sydney nằm ở thành phố nào?", "Sydney", "London", "Ottawa", "Nhà hát Opera Sydney là biểu tượng của thành phố Sydney."],
        ["She is ___ Australian student.", "an", "a", "many", "Australian bắt đầu bằng nguyên âm nên dùng an."],
        ["___ visit to London was wonderful.", "A", "An", "Many", "Visit bắt đầu bằng phụ âm nên dùng a."]
      ], [["Canberra","Thủ đô Australia"],["Big Ben","London"],["the United States","Hợp chủng quốc Hoa Kỳ"],["an honest man","an + nguyên âm"],
        ["kangaroo", "chuột túi"],
        ["castle", "lâu đài"],
        ["island", "hòn đảo"]])
    ];
    /* ================= KHTN 7 ================= */
    var KHTN7_TOPICS = [
      topic("kh-nguyentu","⚛️","Nguyên tử và bảng tuần hoàn","Bài 2–4 • Nguyên tử, nguyên tố hoá học",[
        ["Nguyên tử gồm hạt nhân và gì?", "Các electron chuyển động xung quanh", "Chỉ có proton", "Chỉ có nơtron", "Nguyên tử: hạt nhân (proton, nơtron) và vỏ electron."],
        ["Hạt nào mang điện tích dương trong nguyên tử?", "Proton", "Electron", "Nơtron", "Proton (+), electron (−), nơtron không mang điện."],
        ["Kí hiệu hoá học của nguyên tố oxi là?", "O", "Ox", "O2 là phân tử", "O là kí hiệu của nguyên tố oxi (oxygen)."],
        ["Nguyên tố hoá học là tập hợp các nguyên tử cùng loại có cùng gì?", "Số proton trong hạt nhân", "Số nơtron", "Khối lượng riêng lẻ", "Nguyên tố xác định bởi số proton."],
        ["Bảng tuần hoàn sắp xếp các nguyên tố theo chiều nào?", "Tăng dần của điện tích hạt nhân", "Theo bảng chữ cái", "Theo màu sắc", "Bảng tuần hoàn của Men-đê-lê-ép sắp xếp theo điện tích hạt nhân tăng dần."],
        ["Kí hiệu của nguyên tố hiđro là?", "H", "He", "Hi", "H — hydrogen. He là heli."],
        ["Trong nguyên tử trung hoà về điện, quan hệ giữa số proton và electron là?", "Bằng nhau", "Proton nhiều hơn", "Electron nhiều hơn", "Trung hoà: số proton = số electron."],
        ["Ô nguyên tố trong bảng tuần hoàn cho biết thông tin nào?", "Số hiệu nguyên tử, kí hiệu, tên, khối lượng nguyên tử", "Giá tiền nguyên tố", "Màu sắc thật của nguyên tố", "Mỗi ô chứa các thông tin cơ bản của nguyên tố."],
        ["Hạt electron trong nguyên tử mang điện tích gì?", "Điện tích âm", "Điện tích dương", "Không mang điện", "Electron là hạt mang điện tích âm chuyển động quanh hạt nhân."],
        ["Hạt neutron trong hạt nhân mang điện tích gì?", "Không mang điện", "Điện tích dương", "Điện tích âm", "Neutron là hạt không mang điện, nằm trong hạt nhân nguyên tử."],
        ["Hạt nhân nguyên tử gồm những hạt nào?", "Proton và neutron", "Proton và electron", "Electron và neutron", "Hạt nhân gồm proton mang điện dương và neutron không mang điện."],
        ["Khối lượng của nguyên tử tập trung chủ yếu ở đâu?", "Ở hạt nhân", "Ở vỏ electron", "Ở lớp vỏ ngoài cùng", "Proton và neutron nặng hơn electron rất nhiều nên khối lượng tập trung ở hạt nhân."],
        ["Kí hiệu hoá học của nguyên tố carbon là gì?", "C", "Ca", "Cl", "Carbon có kí hiệu là C, natri mới có kí hiệu Na."],
        ["Kí hiệu hoá học của nguyên tố natri là gì?", "Na", "N", "Ni", "Natri có kí hiệu là Na, lấy từ tên Latinh natrium."],
        ["Kí hiệu hoá học của nguyên tố sắt là gì?", "Fe", "S", "F", "Sắt có kí hiệu là Fe, lấy từ tên Latinh ferrum."],
        ["Kí hiệu hoá học của nguyên tố nhôm là gì?", "Al", "Ag", "Au", "Nhôm có kí hiệu là Al, còn Ag là kí hiệu của bạc."],
        ["Kí hiệu hoá học của nguyên tố đồng là gì?", "Cu", "C", "Co", "Đồng có kí hiệu là Cu, lấy từ tên Latinh cuprum."],
        ["Kí hiệu hoá học của nguyên tố lưu huỳnh là gì?", "S", "Si", "Sn", "Lưu huỳnh có kí hiệu là S, còn Si là kí hiệu của silic."],
        ["Kí hiệu hoá học của nguyên tố canxi là gì?", "Ca", "C", "Cu", "Canxi có kí hiệu là Ca, còn Cu là kí hiệu của đồng."],
        ["Kí hiệu hoá học của nguyên tố silic là gì?", "Si", "S", "Se", "Silic có kí hiệu là Si, còn S là kí hiệu của lưu huỳnh."],
        ["Đơn vị đo khối lượng nguyên tử là gì?", "amu", "gam", "kilogam", "Khối lượng nguyên tử được đo bằng đơn vị amu."],
        ["Nguyên tử có số hiệu nguyên tử bằng 6 thì có bao nhiêu proton?", "6 proton", "12 proton", "0 proton", "Số hiệu nguyên tử bằng đúng số proton trong hạt nhân."],
        ["Hàng ngang trong bảng tuần hoàn được gọi là gì?", "Chu kì", "Nhóm", "Ô nguyên tố", "Các nguyên tố xếp thành hàng ngang tạo thành một chu kì."],
        ["Cột dọc trong bảng tuần hoàn được gọi là gì?", "Nhóm", "Chu kì", "Hàng", "Các nguyên tố xếp thành cột dọc tạo thành một nhóm."],
        ["Bảng tuần hoàn các nguyên tố hoá học có bao nhiêu chu kì?", "7 chu kì", "5 chu kì", "10 chu kì", "Bảng tuần hoàn hiện nay gồm 7 chu kì."],
        ["Các nguyên tố trong cùng một nhóm thường có điểm chung nào?", "Tính chất hoá học tương tự nhau", "Cùng khối lượng nguyên tử", "Cùng số neutron", "Nguyên tố cùng nhóm có tính chất hoá học tương tự nhau."],
        ["Vỏ nguyên tử được tạo thành bởi hạt nào?", "Electron", "Proton", "Neutron", "Các electron chuyển động quanh hạt nhân tạo thành vỏ nguyên tử."],
        ["Hạt nào có khối lượng rất nhỏ so với proton?", "Electron", "Neutron", "Hạt nhân", "Khối lượng electron nhỏ hơn proton khoảng 1836 lần nên thường bỏ qua."]
      ], [["H","Hiđro"],["O","Oxi"],["Fe","Sắt"],["Cu","Đồng"],
        ["Proton", "Mang điện tích dương"],
        ["Neutron", "Không mang điện"],
        ["Electron", "Mang điện tích âm"]], "Nối kí hiệu với tên nguyên tố nhé!"),
      topic("kh-phantu","🧪","Phân tử, liên kết, hoá trị","Bài 5–7 • Đơn chất, hợp chất, công thức hoá học",[
        ["Phân tử nước H₂O gồm những nguyên tố nào?", "Hiđro và oxi", "Chỉ oxi", "Hiđro và cacbon", "H₂O: 2 nguyên tử H và 1 nguyên tử O."],
        ["Đơn chất là chất tạo nên từ mấy nguyên tố?", "Một nguyên tố", "Hai nguyên tố", "Ba nguyên tố", "Đơn chất: một nguyên tố (ví dụ O₂, Fe). Hợp chất: từ hai nguyên tố trở lên."],
        ["Hoá trị của oxi trong hầu hết hợp chất là?", "II", "I", "IV", "Oxi thường có hoá trị II."],
        ["Công thức hoá học của khí cacbonic là?", "CO₂", "CO", "H₂O", "CO₂ gồm 1 C và 2 O."],
        ["Theo quy tắc hoá trị, hợp chất AₓBᵧ (A hoá trị a, B hoá trị b) có quan hệ nào?", "x·a = y·b", "x + a = y + b", "x − a = y − b", "Quy tắc hoá trị: tích chỉ số và hoá trị của hai nguyên tố bằng nhau."],
        ["Chất nào là hợp chất?", "Muối ăn (NaCl)", "Khí oxi (O₂)", "Sắt (Fe)", "NaCl tạo từ hai nguyên tố Na và Cl nên là hợp chất."],
        ["Phân tử là hạt được tạo thành từ đâu?", "Các nguyên tử liên kết với nhau", "Các tế bào ghép lại", "Các phân tử khác tách ra", "Phân tử gồm hai hay nhiều nguyên tử liên kết với nhau."],
        ["Chất nào sau đây là đơn chất?", "Khí oxi", "Nước", "Muối ăn", "Khí oxi chỉ do một nguyên tố oxi tạo thành nên là đơn chất."],
        ["Hợp chất được tạo thành từ ít nhất bao nhiêu nguyên tố?", "Hai nguyên tố", "Một nguyên tố", "Năm nguyên tố", "Hợp chất do hai hay nhiều nguyên tố hoá học tạo thành."],
        ["Liên kết cộng hoá trị được hình thành nhờ sự kiện nào?", "Góp chung electron", "Cho và nhận electron", "Hút nhau giữa hai hạt nhân", "Trong liên kết cộng hoá trị, các nguyên tử góp chung electron."],
        ["Liên kết ion thường hình thành giữa hai loại nguyên tử nào?", "Kim loại điển hình và phi kim điển hình", "Hai phi kim với nhau", "Hai khí hiếm với nhau", "Liên kết ion hình thành khi kim loại cho electron và phi kim nhận electron."],
        ["Hoá trị của hidro trong hầu hết các hợp chất là bao nhiêu?", "I", "II", "IV", "Hidro thường có hoá trị I trong các hợp chất."],
        ["Hoá trị của natri trong các hợp chất là bao nhiêu?", "I", "II", "III", "Natri là kim loại kiềm nên có hoá trị I."],
        ["Hoá trị của magie trong các hợp chất là bao nhiêu?", "II", "I", "III", "Magie thường có hoá trị II, ví dụ trong MgO."],
        ["Hoá trị của nhôm trong các hợp chất là bao nhiêu?", "III", "I", "II", "Nhôm thường có hoá trị III, ví dụ trong Al₂O₃."],
        ["Trong phân tử CH₄, hoá trị của carbon là bao nhiêu?", "IV", "I", "II", "Một nguyên tử carbon liên kết với bốn nguyên tử hidro nên hoá trị IV."],
        ["Khối lượng phân tử của nước H₂O là bao nhiêu amu?", "18 amu", "16 amu", "20 amu", "Khối lượng phân tử H₂O bằng 2 nhân 1 cộng 16 bằng 18 amu."],
        ["Khối lượng phân tử của CO₂ là bao nhiêu amu?", "44 amu", "28 amu", "32 amu", "Khối lượng phân tử CO₂ bằng 12 cộng 2 nhân 16 bằng 44 amu."],
        ["Hợp chất tạo bởi magie hoá trị II và oxi hoá trị II có công thức nào?", "MgO", "Mg₂O", "MgO₂", "Hai hoá trị bằng nhau nên tỉ lệ nguyên tử là 1 chia 1, công thức là MgO."],
        ["Phân tử khí hidro H₂ gồm bao nhiêu nguyên tử?", "2 nguyên tử", "1 nguyên tử", "3 nguyên tử", "Chỉ số 2 sau kí hiệu H cho biết phân tử có hai nguyên tử hidro."],
        ["Chỉ số dưới chân trong công thức hoá học cho biết điều gì?", "Số nguyên tử của nguyên tố đó", "Hoá trị của nguyên tố", "Khối lượng của nguyên tố", "Chỉ số dưới chân cho biết số nguyên tử của mỗi nguyên tố trong phân tử."],
        ["Hoá trị của một nguyên tố biểu thị khả năng nào?", "Khả năng liên kết với nguyên tử khác", "Khả năng tan trong nước", "Khả năng dẫn điện", "Hoá trị là con số biểu thị khả năng liên kết của nguyên tử."],
        ["Chất nào sau đây là hợp chất?", "Nước", "Khí oxi", "Sắt", "Nước do hai nguyên tố hidro và oxi tạo thành nên là hợp chất."],
        ["Liên kết trong phân tử khí hidro H₂ thuộc loại liên kết nào?", "Liên kết cộng hoá trị", "Liên kết ion", "Liên kết kim loại", "Hai nguyên tử hidro góp chung một cặp electron tạo liên kết cộng hoá trị."],
        ["Trong hợp chất HCl, hoá trị của clo là bao nhiêu?", "I", "II", "VII", "Clo liên kết với một nguyên tử hidro hoá trị I nên clo cũng hoá trị I."],
        ["Phân tử khí nitơ có công thức hoá học là gì?", "N₂", "N", "NO", "Phân tử khí nitơ gồm hai nguyên tử nitơ nên có công thức N₂."]
      ], [["H₂O","Nước"],["CO₂","Khí cacbonic"],["O₂","Khí oxi (đơn chất)"],["NaCl","Muối ăn"],
        ["Khí nitơ", "N₂"],
        ["Magie oxit", "MgO"],
        ["Khối lượng phân tử của H₂O", "18 amu"]], "Nối công thức với tên chất nhé!"),
      topic("kh-tocdo","🏃","Tốc độ","Bài 8–11 • Tốc độ chuyển động, đồ thị quãng đường – thời gian",[
        ["Công thức tính tốc độ là?", "v = s / t", "v = s × t", "v = t / s", "Tốc độ = quãng đường / thời gian."],
        ["Đơn vị đo tốc độ thường dùng là?", "m/s và km/h", "kg và m", "s và phút", "Tốc độ đo bằng m/s hoặc km/h."],
        ["Một xe đi 60 km trong 2 giờ. Tốc độ của xe là?", "30 km/h", "120 km/h", "62 km/h", "v = 60 / 2 = 30 km/h."],
        ["Đồ thị quãng đường – thời gian là đường thẳng nằm ngang cho biết điều gì?", "Vật đứng yên", "Vật chuyển động nhanh dần", "Vật quay lại điểm xuất phát", "Đường nằm ngang: quãng đường không đổi theo thời gian → vật đứng yên."],
        ["Đổi 36 km/h sang m/s được bao nhiêu?", "10 m/s", "36 m/s", "100 m/s", "36 km/h = 36000 m / 3600 s = 10 m/s."],
        ["Để đo tốc độ của xe đồ chơi trong phòng thí nghiệm, cần đo những gì?", "Quãng đường và thời gian chuyển động", "Chỉ màu sắc xe", "Khối lượng xe", "Cần s và t để tính v = s/t."],
        ["Một vật đi được 100 m trong 10 s. Tốc độ của vật là bao nhiêu?", "10 m/s", "1000 m/s", "1 m/s", "Tốc độ bằng 100 chia 10 bằng 10 m/s."],
        ["Đổi tốc độ 72 km/h ra đơn vị m/s được bao nhiêu?", "20 m/s", "72 m/s", "12 m/s", "Muốn đổi km/h sang m/s ta chia cho 3,6; 72 chia 3,6 bằng 20 m/s."],
        ["Đổi tốc độ 5 m/s ra đơn vị km/h được bao nhiêu?", "18 km/h", "5 km/h", "50 km/h", "Muốn đổi m/s sang km/h ta nhân với 3,6; 5 nhân 3,6 bằng 18 km/h."],
        ["Xe đi với tốc độ 40 km/h trong 3 giờ. Quãng đường xe đi được là bao nhiêu?", "120 km", "43 km", "13 km", "Quãng đường bằng tốc độ nhân thời gian: 40 nhân 3 bằng 120 km."],
        ["Một người đi quãng đường 90 km với tốc độ 30 km/h. Thời gian đi là bao lâu?", "3 giờ", "30 giờ", "1 giờ", "Thời gian bằng quãng đường chia tốc độ: 90 chia 30 bằng 3 giờ."],
        ["Trên đồ thị quãng đường – thời gian, đoạn đồ thị xiên lên cho biết điều gì?", "Quãng đường tăng theo thời gian", "Vật đang đứng yên", "Thời gian bị giảm đi", "Đồ thị xiên lên nghĩa là vật đang chuyển động, quãng đường tăng dần."],
        ["Tốc độ chuyển động cho ta biết điều gì về chuyển động?", "Mức độ nhanh hay chậm", "Hướng di chuyển của vật", "Khối lượng của vật", "Tốc độ cho biết chuyển động nhanh hay chậm."],
        ["Hai bạn chạy cùng một quãng đường, bạn chạy hết ít thời gian hơn thì tốc độ thế nào?", "Lớn hơn", "Nhỏ hơn", "Bằng nhau", "Cùng quãng đường, ai mất ít thời gian hơn thì người đó chạy nhanh hơn."],
        ["Trong thí nghiệm đo tốc độ, cổng quang điện được dùng để làm gì?", "Đo thời gian chuyển động", "Đo chiều dài quãng đường", "Đo khối lượng vật", "Cổng quang điện nối với đồng hồ đo thời gian hiện số để đo thời gian."],
        ["Khi xe chạy càng nhanh, việc xử lí tình huống bất ngờ trên đường sẽ thế nào?", "Khó hơn và dễ gây tai nạn", "Dễ hơn rất nhiều", "Không thay đổi gì", "Tốc độ càng cao, xe càng khó dừng kịp nên nguy cơ tai nạn tăng."],
        ["Khoảng cách an toàn giữa hai xe trên đường cần thay đổi thế nào khi tốc độ tăng?", "Cần tăng lên", "Cần giảm xuống", "Giữ nguyên mọi trường hợp", "Xe chạy nhanh cần quãng đường phanh dài hơn nên khoảng cách an toàn phải lớn hơn."],
        ["Một người đi bộ được 1,5 m trong 1 s. Tốc độ của người đó là bao nhiêu?", "1,5 m/s", "15 m/s", "0,5 m/s", "Tốc độ bằng 1,5 chia 1 bằng 1,5 m/s, là tốc độ đi bộ thông thường."],
        ["Ô tô đi 180 km trong 3 giờ. Tốc độ trung bình của ô tô là bao nhiêu?", "60 km/h", "30 km/h", "90 km/h", "Tốc độ bằng 180 chia 3 bằng 60 km/h."],
        ["Tốc độ truyền ánh sáng trong chân không vào khoảng bao nhiêu?", "300 000 km/s", "340 km/s", "30 km/s", "Ánh sáng truyền đi rất nhanh, khoảng 300 000 km/s trong chân không."],
        ["Âm thanh truyền trong không khí ở điều kiện thường với tốc độ khoảng bao nhiêu?", "340 m/s", "34 m/s", "3400 m/s", "Tốc độ truyền âm trong không khí khoảng 340 m/s."],
        ["Đồ thị quãng đường – thời gian của chuyển động đều có dạng gì?", "Đường thẳng", "Đường cong bất kì", "Đường gấp khúc tuỳ ý", "Chuyển động đều có đồ thị quãng đường – thời gian là đường thẳng."],
        ["Khi biết tốc độ và thời gian, muốn tính quãng đường ta làm thế nào?", "Lấy tốc độ nhân với thời gian", "Lấy tốc độ chia cho thời gian", "Lấy thời gian chia cho tốc độ", "Công thức tính quãng đường là s bằng v nhân t."],
        ["Khi biết quãng đường và tốc độ, muốn tính thời gian ta làm thế nào?", "Lấy quãng đường chia cho tốc độ", "Lấy quãng đường nhân với tốc độ", "Lấy tốc độ chia cho quãng đường", "Công thức tính thời gian là t bằng s chia v."],
        ["Một xe đạp đi được 15 km trong 1 giờ. Tốc độ của xe đạp là bao nhiêu?", "15 km/h", "1,5 km/h", "150 km/h", "Tốc độ bằng 15 chia 1 bằng 15 km/h."],
        ["Người đi xe máy vi phạm thường gặp nhất liên quan đến tốc độ là hành vi nào?", "Chạy quá tốc độ quy định", "Chạy đúng tốc độ quy định", "Dừng xe khi đèn đỏ", "Chạy quá tốc độ cho phép là hành vi nguy hiểm và bị xử phạt."]
      ], [["v = s/t","Công thức tốc độ"],["km/h","Đơn vị tốc độ"],["Đường nằm ngang trên đồ thị s–t","Vật đứng yên"],["36 km/h","10 m/s"],
        ["72 km/h", "20 m/s"],
        ["5 m/s", "18 km/h"],
        ["180 km trong 3 giờ", "60 km/h"]], "Nối cho đúng nhé!"),
      topic("kh-amthanh","🔊","Âm thanh","Bài 12–14 • Sóng âm, độ to – độ cao, phản xạ âm",[
        ["Âm thanh truyền được qua môi trường nào?", "Chất rắn, lỏng, khí", "Chỉ qua chân không", "Chỉ qua chất khí", "Âm truyền qua rắn, lỏng, khí; không truyền qua chân không."],
        ["Độ cao của âm phụ thuộc vào yếu tố nào của nguồn âm?", "Tần số dao động", "Biên độ dao động", "Màu sắc nguồn âm", "Tần số lớn → âm cao (bổng); tần số nhỏ → âm thấp (trầm)."],
        ["Độ to của âm phụ thuộc vào yếu tố nào?", "Biên độ dao động", "Tần số dao động", "Tốc độ ánh sáng", "Biên độ lớn → âm to."],
        ["Hiện tượng phản xạ âm tạo ra hiện tượng nào khi gặp bề mặt cứng, nhẵn trong không gian lớn?", "Tiếng vang", "Âm bị tắt hẳn", "Âm đổi màu", "Tiếng vang là âm phản xạ nghe được tách biệt với âm trực tiếp."],
        ["Biện pháp nào chống ô nhiễm tiếng ồn?", "Trồng cây xanh, dùng vật liệu cách âm", "Mở loa thật to", "Bấm còi liên tục", "Cây xanh và vật liệu cách âm giúp giảm tiếng ồn."],
        ["Tai người nghe được âm có tần số khoảng nào?", "Từ khoảng 20 Hz đến 20 000 Hz", "Chỉ 100 Hz", "Mọi tần số vô hạn", "Vùng nghe của tai người khoảng 20 Hz – 20 000 Hz."],
        ["Âm thanh được tạo ra khi vật có trạng thái nào?", "Vật dao động", "Vật đứng yên hoàn toàn", "Vật bị nung nóng", "Mọi nguồn âm đều dao động khi phát ra âm thanh."],
        ["Âm truyền được qua môi trường là nhờ các phần tử môi trường có tính chất nào?", "Dao động truyền đi", "Tan ra trong không khí", "Đứng yên tại chỗ", "Dao động của phần tử này truyền sang phần tử khác tạo thành sóng âm."],
        ["Âm thanh có truyền được trong chân không không?", "Không truyền được", "Truyền nhanh nhất", "Truyền như trong không khí", "Chân không không có phần tử vật chất nên âm không truyền qua được."],
        ["Đơn vị đo tần số dao động là gì?", "Héc, kí hiệu Hz", "Mét, kí hiệu m", "Đề-xi-ben, kí hiệu dB", "Tần số được đo bằng đơn vị héc, kí hiệu là Hz."],
        ["Một vật dao động 50 lần trong 1 giây. Tần số dao động của vật là bao nhiêu?", "50 Hz", "5 Hz", "500 Hz", "Tần số bằng số dao động trong một giây, tức là 50 Hz."],
        ["Âm có tần số lớn hơn 20 000 Hz được gọi là gì?", "Siêu âm", "Hạ âm", "Âm nghe được", "Âm có tần số trên 20 000 Hz vượt ngưỡng nghe của người nên gọi là siêu âm."],
        ["Âm có tần số nhỏ hơn 20 Hz được gọi là gì?", "Hạ âm", "Siêu âm", "Tiếng vang", "Âm có tần số dưới 20 Hz thấp hơn ngưỡng nghe của người nên gọi là hạ âm."],
        ["Đơn vị đo độ to của âm là gì?", "Đề-xi-ben", "Héc", "Mét trên giây", "Độ to của âm được đo bằng đơn vị đề-xi-ben, kí hiệu dB."],
        ["Loài vật nào phát siêu âm để định vị và bắt mồi trong đêm tối?", "Con dơi", "Con mèo", "Con gà", "Dơi phát ra siêu âm và nghe tiếng phản xạ để xác định vị trí con mồi."],
        ["Khi gõ vào mặt trống, bộ phận nào dao động để phát ra âm?", "Mặt trống", "Dùi trống", "Thân trống bằng gỗ", "Mặt trống rung động khi bị gõ và tạo ra âm thanh."],
        ["Khi lên dây đàn căng hơn, âm phát ra từ dây đàn thay đổi thế nào?", "Âm cao hơn", "Âm thấp hơn hẳn", "Âm nhỏ đi", "Dây căng hơn dao động nhanh hơn, tần số lớn hơn nên âm cao hơn."],
        ["Âm truyền trong thép so với trong không khí thì thế nào?", "Nhanh hơn", "Chậm hơn", "Bằng nhau", "Âm truyền trong chất rắn như thép nhanh hơn trong không khí."],
        ["Muốn nghe được tiếng vang rõ ràng, âm phản xạ phải đến tai chậm hơn âm trực tiếp ít nhất bao lâu?", "Ít nhất 1/15 giây", "Ít nhất 1 giây", "Ngay lập tức cùng lúc", "Tai phân biệt được tiếng vang khi âm phản xạ đến sau ít nhất 1/15 giây."],
        ["Bề mặt nào sau đây phản xạ âm tốt?", "Bề mặt cứng và nhẵn", "Bề mặt mềm và xốp", "Bề mặt vải dày", "Vật cứng có bề mặt nhẵn như tường gạch, mặt đá phản xạ âm tốt."],
        ["Vật liệu nào sau đây hấp thụ âm tốt, thường dùng cách âm?", "Vật mềm, xốp, bề mặt gồ ghề", "Tấm thép phẳng", "Mặt kính nhẵn", "Bông khoáng, xốp và vải dày hấp thụ âm tốt nên dùng để cách âm."],
        ["Ô nhiễm tiếng ồn xảy ra khi nào?", "Khi tiếng ồn to và kéo dài", "Khi có một tiếng nói nhỏ", "Khi nghe nhạc trong 1 phút", "Tiếng ồn to, kéo dài trong môi trường gây khó chịu gọi là ô nhiễm tiếng ồn."],
        ["Khi làm việc lâu ở nơi rất ồn, đeo nút bịt tai có tác dụng gì?", "Giảm tiếng ồn truyền vào tai", "Tăng độ to của âm", "Tạo ra âm thanh mới", "Nút bịt tai ngăn bớt sóng âm, bảo vệ thính giác của người lao động."],
        ["Đứng trước vách đá, khoảng cách tối thiểu khoảng bao nhiêu mét để nghe được tiếng vang?", "Khoảng 11,3 m", "Khoảng 1 m", "Khoảng 340 m", "Với tốc độ âm 340 m/s và thời gian 1/15 giây, khoảng cách tối thiểu khoảng 11,3 m."],
        ["Vật dao động càng nhanh thì số dao động trong một giây thế nào?", "Càng nhiều", "Càng ít", "Không thay đổi", "Dao động nhanh nghĩa là thực hiện được nhiều dao động trong một giây."],
        ["Vật phát ra âm thanh được gọi chung là gì?", "Nguồn âm", "Vật cách âm", "Vật phản xạ âm", "Mọi vật dao động phát ra âm đều gọi là nguồn âm."]
      ], [["Tần số","Độ cao của âm"],["Biên độ","Độ to của âm"],["Tiếng vang","Âm phản xạ"],["Chân không","Âm không truyền qua"],
        ["Siêu âm", "Tần số trên 20 000 Hz"],
        ["Hạ âm", "Tần số dưới 20 Hz"],
        ["Đơn vị đo độ to của âm", "Đề-xi-ben"]], "Nối cho đúng nhé!"),
      topic("kh-anhsang","🔦","Ánh sáng","Bài 15–17 • Tia sáng, phản xạ, ảnh qua gương phẳng",[
        ["Theo định luật phản xạ ánh sáng, góc phản xạ so với góc tới thế nào?", "Bằng góc tới", "Gấp đôi góc tới", "Nhỏ hơn góc tới một nửa", "Góc phản xạ bằng góc tới (đo với pháp tuyến)."],
        ["Ảnh của vật qua gương phẳng có đặc điểm gì?", "Ảnh ảo, bằng vật, đối xứng qua gương", "Ảnh thật, nhỏ hơn vật", "Ảnh ngược chiều hoàn toàn thật", "Ảnh qua gương phẳng là ảnh ảo, cùng kích thước, khoảng cách đến gương bằng vật."],
        ["Vùng tối là vùng như thế nào?", "Không nhận được ánh sáng từ nguồn sáng", "Nhận được một phần ánh sáng", "Sáng nhất", "Vùng tối (bóng đen) không có ánh sáng chiếu tới."],
        ["Đường truyền của ánh sáng trong môi trường trong suốt, đồng tính là gì?", "Đường thẳng", "Đường cong", "Đường zích zắc", "Định luật truyền thẳng của ánh sáng."],
        ["Pháp tuyến là đường như thế nào?", "Vuông góc với mặt gương tại điểm tới", "Song song với mặt gương", "Trùng với tia tới", "Pháp tuyến vuông góc với bề mặt phản xạ tại điểm tới."],
        ["Vật cách gương phẳng 2 m thì ảnh của vật cách gương bao nhiêu?", "2 m", "4 m", "1 m", "Ảnh đối xứng: cách gương bằng vật, tức 2 m."],
        ["Tia sáng được biểu diễn bằng hình vẽ nào?", "Đường thẳng có mũi tên chỉ hướng", "Đường cong không có mũi tên", "Một chấm tròn lớn", "Tia sáng được vẽ bằng đường thẳng có mũi tên chỉ hướng truyền của ánh sáng."],
        ["Chùm sáng gồm các tia sáng song song với nhau gọi là chùm sáng gì?", "Chùm sáng song song", "Chùm sáng phân kì", "Chùm sáng hội tụ", "Các tia không giao nhau và song song tạo thành chùm sáng song song."],
        ["Chùm sáng có các tia loe rộng dần ra gọi là chùm sáng gì?", "Chùm sáng phân kì", "Chùm sáng song song", "Chùm sáng hội tụ", "Ánh sáng từ đèn pin loe rộng ra là chùm sáng phân kì."],
        ["Chùm sáng có các tia giao nhau tại một điểm gọi là chùm sáng gì?", "Chùm sáng hội tụ", "Chùm sáng phân kì", "Chùm sáng song song", "Các tia cắt nhau tại một điểm tạo thành chùm sáng hội tụ."],
        ["Vùng phía sau vật cản chỉ nhận được một phần ánh sáng gọi là gì?", "Bóng nửa tối", "Bóng tối hoàn toàn", "Vùng sáng rõ", "Bóng nửa tối nhận được một phần ánh sáng từ nguồn sáng rộng."],
        ["Thiết bị nào biến đổi năng lượng ánh sáng thành điện năng?", "Pin mặt trời", "Bóng đèn sợi đốt", "Quạt điện", "Pin mặt trời hấp thụ ánh sáng và tạo ra dòng điện."],
        ["Cây xanh sử dụng năng lượng ánh sáng Mặt Trời chủ yếu để làm gì?", "Quang hợp tạo chất hữu cơ", "Hô hấp giải phóng nhiệt", "Thoát hơi nước qua lá", "Cây dùng năng lượng ánh sáng để quang hợp, tổng hợp chất hữu cơ."],
        ["Một tia sáng tới gương phẳng với góc tới 40 độ. Góc phản xạ bằng bao nhiêu?", "40 độ", "50 độ", "90 độ", "Theo định luật phản xạ ánh sáng, góc phản xạ luôn bằng góc tới."],
        ["Tia sáng tới vuông góc với mặt gương phẳng thì góc tới bằng bao nhiêu?", "0 độ", "90 độ", "45 độ", "Tia tới trùng với pháp tuyến nên góc tới bằng 0 độ."],
        ["Ảnh của vật qua gương phẳng có hứng được trên màn chắn không?", "Không hứng được", "Hứng được rõ nét", "Hứng được nhưng mờ", "Ảnh qua gương phẳng là ảnh ảo nên không hứng được trên màn chắn."],
        ["Khi viết chữ rồi soi trước gương phẳng, chữ trong ảnh có đặc điểm gì?", "Bị ngược trái phải", "Giữ nguyên như chữ thật", "Bị lộn ngược lên xuống", "Ảnh qua gương phẳng bị đảo trái phải so với vật."],
        ["Vật nào sau đây là nguồn sáng tự nhiên?", "Mặt Trời", "Bóng đèn đang sáng", "Ngọn nến đang cháy", "Mặt Trời tự phát ra ánh sáng nên là nguồn sáng tự nhiên lớn nhất của Trái Đất."],
        ["Ta nhìn thấy một vật khi nào?", "Khi ánh sáng từ vật truyền tới mắt", "Khi vật ở gần mắt nhất", "Khi phòng tối hoàn toàn", "Mắt chỉ nhận biết vật khi có ánh sáng từ vật truyền vào mắt."],
        ["Vật sáng bao gồm những vật thuộc hai nhóm nào?", "Nguồn sáng và vật hắt lại ánh sáng", "Chỉ các vật màu trắng", "Chỉ các vật trong suốt", "Vật sáng gồm vật tự phát sáng và vật hắt lại ánh sáng chiếu vào nó."],
        ["Hiện tượng Mặt Trăng bị Trái Đất che khuất ánh sáng Mặt Trời gọi là gì?", "Nguyệt thực", "Nhật thực", "Trăng tròn", "Nguyệt thực xảy ra khi Trái Đất nằm giữa Mặt Trời và Mặt Trăng."],
        ["Hiện tượng Mặt Trăng che khuất ánh sáng Mặt Trời chiếu tới Trái Đất gọi là gì?", "Nhật thực", "Nguyệt thực", "Sao băng", "Nhật thực xảy ra khi Mặt Trăng nằm giữa Mặt Trời và Trái Đất."],
        ["Tia tới và tia phản xạ hợp với nhau một góc 90 độ. Góc tới bằng bao nhiêu?", "45 độ", "30 độ", "90 độ", "Góc tới bằng góc phản xạ và tổng bằng 90 độ nên mỗi góc bằng 45 độ."],
        ["Mặt phẳng chứa tia tới và pháp tuyến tại điểm tới được gọi là gì?", "Mặt phẳng tới", "Mặt gương", "Mặt nằm ngang", "Tia tới, tia phản xạ và pháp tuyến cùng nằm trong mặt phẳng tới."],
        ["Ánh sáng chiếu ra từ một chiếc đèn pin trong đêm thuộc loại chùm sáng nào?", "Chùm sáng phân kì", "Chùm sáng song song hoàn toàn", "Chùm sáng hội tụ", "Các tia sáng từ đèn pin loe rộng dần ra nên là chùm phân kì."],
        ["Khi vật tiến lại gần gương phẳng thêm 1 m, ảnh của vật thay đổi thế nào?", "Cũng tiến lại gần gương 1 m", "Lùi xa gương thêm 1 m", "Không thay đổi vị trí", "Khoảng cách từ ảnh đến gương luôn bằng khoảng cách từ vật đến gương."]
      ], [["Góc phản xạ","Bằng góc tới"],["Ảnh qua gương phẳng","Ảo, bằng vật"],["Ánh sáng truyền","Theo đường thẳng"],["Vùng tối","Không có ánh sáng tới"],
        ["Pin mặt trời", "Biến ánh sáng thành điện năng"],
        ["Nguyệt thực", "Trái Đất che ánh sáng tới Mặt Trăng"],
        ["Nhật thực", "Mặt Trăng che ánh sáng tới Trái Đất"]], "Nối cho đúng nhé!"),
      topic("kh-tu","🧲","Từ","Bài 18–20 • Nam châm, từ trường",[
        ["Hai cực cùng tên của hai nam châm đặt gần nhau sẽ thế nào?", "Đẩy nhau", "Hút nhau", "Không tác dụng", "Cùng cực đẩy nhau, khác cực hút nhau."],
        ["Nam châm có mấy cực?", "Hai cực: Bắc (N) và Nam (S)", "Một cực", "Ba cực", "Nam châm có hai cực N và S."],
        ["Kim nam châm (la bàn) khi tự do sẽ chỉ hướng nào?", "Bắc – Nam địa lí gần đúng", "Đông – Tây", "Chỉ xuống đất", "Kim la bàn chỉ hướng Bắc – Nam nhờ từ trường Trái Đất."],
        ["Vật liệu nào bị nam châm hút?", "Sắt, thép, niken, côban", "Gỗ, nhựa", "Đồng, nhôm (thường)", "Nam châm hút các vật liệu từ như sắt, thép."],
        ["Nam châm điện tạo ra bằng cách nào?", "Cuộn dây có dòng điện chạy qua, thường có lõi sắt non", "Nung nóng thanh sắt", "Cọ xát hai thanh gỗ", "Dòng điện chạy qua cuộn dây tạo từ trường — nam châm điện."],
        ["Từ trường tồn tại ở đâu?", "Xung quanh nam châm và dòng điện", "Chỉ bên trong nam châm", "Không tồn tại thật", "Từ trường là môi trường xung quanh nam châm / dòng điện."],
        ["Khi cắt đôi một thanh nam châm thành hai nửa, mỗi nửa có đặc điểm gì?", "Vẫn có hai cực Bắc và Nam", "Chỉ còn một cực duy nhất", "Mất hết từ tính", "Không tách riêng được cực của nam châm; mỗi nửa vẫn là một nam châm có hai cực."],
        ["Hình ảnh các đường mạt sắt sắp xếp xung quanh nam châm được gọi là gì?", "Từ phổ", "Điện phổ", "Quang phổ", "Rắc mạt sắt quanh nam châm ta thu được từ phổ cho thấy hình dạng từ trường."],
        ["Ở bên ngoài nam châm, đường sức từ có chiều đi như thế nào?", "Từ cực Bắc sang cực Nam", "Từ cực Nam sang cực Bắc", "Đi vòng quanh hạt nhân", "Quy ước chiều đường sức từ bên ngoài nam châm là ra Bắc vào Nam."],
        ["Dụng cụ nhỏ gọn dùng để phát hiện từ trường tại một điểm là gì?", "Kim nam châm thử", "Nhiệt kế", "Lực kế", "Đặt kim nam châm thử vào từ trường, kim sẽ lệch và định hướng theo từ trường."],
        ["Muốn nam châm điện hút mạnh hơn, ta thay đổi cường độ dòng điện thế nào?", "Tăng cường độ dòng điện", "Giảm cường độ dòng điện", "Ngắt hẳn dòng điện", "Dòng điện qua cuộn dây càng mạnh thì từ tính của nam châm điện càng lớn."],
        ["Muốn nam châm điện hút mạnh hơn, ta thay đổi số vòng dây quấn thế nào?", "Tăng số vòng dây", "Giảm số vòng dây", "Tháo hết các vòng dây", "Cuộn dây càng nhiều vòng thì nam châm điện càng mạnh."],
        ["Khi đổi chiều dòng điện chạy qua cuộn dây, hai cực của nam châm điện thay đổi thế nào?", "Đổi ngược vị trí cho nhau", "Giữ nguyên không đổi", "Biến mất hoàn toàn", "Đổi chiều dòng điện làm cực Bắc và cực Nam của nam châm điện đổi chỗ."],
        ["Nam châm điện dùng lõi sắt non sẽ thế nào khi ngắt dòng điện?", "Mất từ tính", "Giữ từ tính mãi mãi", "Mạnh lên gấp đôi", "Sắt non mất từ tính nhanh khi không còn dòng điện chạy qua cuộn dây."],
        ["Lõi của nam châm điện thường được làm bằng vật liệu nào?", "Sắt non", "Đồng đỏ", "Nhôm", "Lõi sắt non giúp nam châm điện mạnh hơn và mất từ tính nhanh khi ngắt điện."],
        ["Thiết bị nào dùng nam châm điện để nâng các vật bằng sắt thép nặng?", "Cần cẩu điện", "La bàn", "Đèn pin", "Cần cẩu điện dùng nam châm điện lớn để hút và di chuyển sắt thép."],
        ["Về mặt từ tính, Trái Đất được coi giống như vật nào?", "Một nam châm khổng lồ", "Một cục pin lớn", "Một thấu kính lớn", "Từ trường Trái Đất tương tự từ trường của một nam châm khổng lồ."],
        ["Kim la bàn định hướng được là nhờ tác dụng của yếu tố nào?", "Từ trường của Trái Đất", "Trọng lực của Mặt Trăng", "Ánh sáng Mặt Trời", "Kim la bàn là nam châm nhỏ chịu tác dụng của từ trường Trái Đất."],
        ["Trên một thanh nam châm, vùng nào hút sắt mạnh nhất?", "Hai đầu cực của nam châm", "Phần giữa thanh nam châm", "Toàn bộ đều hút như nhau", "Từ tính tập trung mạnh nhất ở hai đầu cực của nam châm."],
        ["Phần giữa của thanh nam châm thẳng hút các mạt sắt thế nào?", "Hút rất yếu", "Hút mạnh nhất", "Đẩy mạt sắt ra xa", "Phần giữa thanh nam châm gần như không hút được mạt sắt."],
        ["Ngoài dạng thanh thẳng, nam châm thường gặp còn có dạng nào?", "Hình chữ U", "Hình tam giác", "Hình cầu rỗng", "Nam châm hình chữ U hay còn gọi là nam châm móng ngựa rất phổ biến."],
        ["Một ống dây có dòng điện chạy qua có tính chất giống vật nào?", "Một nam châm thẳng", "Một cục pin", "Một gương phẳng", "Ống dây có dòng điện tạo ra từ trường giống một thanh nam châm."],
        ["Trong chuông điện, bộ phận nào hút cần gõ để tạo tiếng kêu lặp lại?", "Nam châm điện", "Pin khô", "Dây dẫn điện", "Nam châm điện hút cần gõ chuông liên tục khi có dòng điện chạy qua."],
        ["Nam châm tác dụng lên kim nam châm đặt gần nó thông qua loại lực nào?", "Lực từ", "Lực ma sát", "Lực đàn hồi", "Lực từ là lực nam châm tác dụng lên vật có từ tính ở gần nó."],
        ["Đường sức từ là các đường cong vẽ theo quy ước để mô tả điều gì?", "Từ trường", "Dòng điện trong dây", "Quỹ đạo của electron", "Đường sức từ giúp hình dung sự phân bố và chiều của từ trường."],
        ["Nam châm vĩnh cửu có khả năng giữ từ tính trong thời gian thế nào?", "Trong thời gian dài", "Chỉ vài giây ngắn ngủi", "Chỉ khi có dòng điện", "Nam châm vĩnh cửu làm từ vật liệu từ cứng nên giữ từ tính lâu dài."]
      ], [["Cực N","Cực Bắc"],["Cực S","Cực Nam"],["Cùng cực","Đẩy nhau"],["Khác cực","Hút nhau"],
        ["Từ phổ", "Hình ảnh mạt sắt quanh nam châm"],
        ["Tăng số vòng dây quấn", "Nam châm điện mạnh hơn"],
        ["Lõi của nam châm điện", "Sắt non"]], "Nối cho đúng nhé!"),
      topic("kh-traodoi","🌱","Trao đổi chất, quang hợp, hô hấp","Bài 21–32 • Quang hợp, hô hấp tế bào, trao đổi nước",[
        ["Quang hợp ở cây xanh cần những yếu tố nào?", "Ánh sáng, nước, khí cacbonic (CO₂)", "Chỉ bóng tối", "Chỉ đất khô", "Quang hợp: sáng + nước + CO₂ → chất hữu cơ + O₂."],
        ["Sản phẩm của quang hợp là gì?", "Chất hữu cơ (đường) và khí oxi", "Chỉ khí cacbonic", "Nước và muối", "Quang hợp tạo chất hữu cơ và giải phóng O₂."],
        ["Quá trình hô hấp tế bào có tác dụng gì?", "Giải phóng năng lượng cho hoạt động sống", "Tạo ra ánh sáng", "Làm cây cao lên ngay lập tức", "Hô hấp phân giải chất hữu cơ, giải phóng năng lượng."],
        ["Lá cây thoát hơi nước chủ yếu qua bộ phận nào?", "Khí khổng (lỗ khí) ở lá", "Thân cây", "Rễ cây", "Thoát hơi nước chủ yếu qua khí khổng trên lá."],
        ["Yếu tố nào làm tăng cường độ quang hợp trong giới hạn thích hợp?", "Tăng ánh sáng và CO₂ vừa đủ", "Che kín cây trong tối", "Tưới nước muối mặn", "Ánh sáng và CO₂ là điều kiện của quang hợp."],
        ["Cơ quan nào của cây hấp thụ nước và muối khoáng?", "Rễ", "Hoa", "Quả", "Rễ hấp thụ nước và muối khoáng từ đất."],
        ["Trao đổi chất ở sinh vật là quá trình cơ thể thực hiện việc gì với môi trường?", "Lấy chất vào và thải chất ra", "Chỉ ngủ và nghỉ ngơi", "Chỉ sinh sản ra con mới", "Trao đổi chất gồm lấy các chất cần thiết và thải chất cặn bã ra môi trường."],
        ["Quá trình chuyển hoá năng lượng trong cơ thể luôn gắn liền với quá trình nào?", "Trao đổi chất", "Ngủ đông", "Lột xác", "Trao đổi chất và chuyển hoá năng lượng là hai mặt của một quá trình thống nhất."],
        ["Cơ quan chính đảm nhiệm việc quang hợp ở cây xanh là gì?", "Lá cây", "Rễ cây", "Thân cây", "Lá có nhiều lục lạp chứa diệp lục nên là cơ quan quang hợp chính."],
        ["Chất diệp lục ở lá cây chứa trong bào quan nào của tế bào?", "Lục lạp", "Nhân tế bào", "Ti thể", "Diệp lục nằm trong lục lạp, là nơi diễn ra quang hợp."],
        ["Chất diệp lục có vai trò gì trong quá trình quang hợp?", "Hấp thụ năng lượng ánh sáng", "Hút nước từ đất", "Vận chuyển muối khoáng", "Diệp lục hấp thụ ánh sáng để cung cấp năng lượng cho quang hợp."],
        ["Lá cây thường có bản rộng và mỏng giúp ích gì cho quang hợp?", "Tăng diện tích hứng ánh sáng", "Giảm diện tích tiếp xúc gió", "Giữ nước lâu hơn trong lá", "Bản lá rộng hứng được nhiều ánh sáng hơn, tăng hiệu quả quang hợp."],
        ["Ở tế bào, hô hấp tế bào chủ yếu diễn ra tại bào quan nào?", "Ti thể", "Lục lạp", "Không bào", "Ti thể là nơi hô hấp tế bào giải phóng năng lượng cho hoạt động sống."],
        ["Hô hấp tế bào cần lấy khí nào từ môi trường vào?", "Khí oxi", "Khí nitơ", "Khí hiếm", "Hô hấp tế bào dùng oxi để phân giải chất hữu cơ lấy năng lượng."],
        ["Hạt đang nảy mầm có cường độ hô hấp như thế nào?", "Rất mạnh", "Rất yếu", "Bằng không", "Hạt nảy mầm cần nhiều năng lượng nên hô hấp diễn ra mạnh."],
        ["Để bảo quản hạt giống được lâu, cần giữ hạt trong điều kiện nào?", "Khô và thoáng mát", "Ẩm ướt và nóng", "Ngâm liên tục trong nước", "Giữ hạt khô, thoáng giúp hô hấp yếu đi, hạt bảo quản được lâu hơn."],
        ["Cá trao đổi khí với môi trường nước qua cơ quan nào?", "Mang", "Phổi", "Da ẩm", "Mang cá lấy oxi hoà tan trong nước và thải khí carbon dioxide."],
        ["Người và các loài thú trao đổi khí chủ yếu qua cơ quan nào?", "Phổi", "Mang", "Khí khổng", "Người và thú hô hấp bằng phổi nằm trong lồng ngực."],
        ["Nước chiếm khoảng bao nhiêu phần trăm khối lượng cơ thể người?", "Khoảng 70 phần trăm", "Khoảng 10 phần trăm", "Khoảng 30 phần trăm", "Cơ thể người có khoảng 70 phần trăm khối lượng là nước."],
        ["Trong cơ thể sinh vật, nước đóng vai trò quan trọng nào với các chất?", "Dung môi hoà tan nhiều chất", "Chất đốt tạo khói", "Chất cách điện hoàn toàn", "Nước hoà tan và vận chuyển nhiều chất cần thiết trong cơ thể."],
        ["Bộ phận nào của rễ cây đảm nhiệm chính việc hút nước và muối khoáng?", "Lông hút", "Chóp rễ cứng", "Mạch rây của rễ", "Lông hút ở miền hút của rễ là nơi hút nước và muối khoáng chủ yếu."],
        ["Mạch nào trong thân cây vận chuyển nước và muối khoáng từ rễ lên lá?", "Mạch gỗ", "Mạch rây", "Tầng sinh mạch", "Mạch gỗ dẫn nước và muối khoáng từ rễ đi lên các bộ phận trên mặt đất."],
        ["Mạch nào trong cây vận chuyển chất hữu cơ từ lá đến các bộ phận khác?", "Mạch rây", "Mạch gỗ", "Khí khổng", "Mạch rây dẫn chất hữu cơ do lá quang hợp tạo ra đi nuôi cây."],
        ["Nhóm chất dinh dưỡng nào cung cấp nhiều năng lượng nhất cho cơ thể?", "Chất béo", "Vitamin", "Nước", "Chất béo dự trữ và cung cấp nhiều năng lượng cho cơ thể."],
        ["Ở người, chất dinh dưỡng từ thức ăn được hấp thụ vào máu chủ yếu ở đâu?", "Ruột non", "Dạ dày", "Miệng", "Ruột non có nhiều lông ruột giúp hấp thụ chất dinh dưỡng vào máu."],
        ["Sự thoát hơi nước ở lá có tác dụng gì đối với việc vận chuyển nước trong cây?", "Tạo lực kéo nước từ rễ lên", "Làm ngừng hút nước", "Đẩy nước ngược xuống rễ", "Thoát hơi nước tạo động lực chính kéo dòng nước đi lên trong mạch gỗ."]
      ], [["Quang hợp","Tạo chất hữu cơ + O₂"],["Hô hấp tế bào","Giải phóng năng lượng"],["Khí khổng","Thoát hơi nước"],["Rễ","Hấp thụ nước"],
        ["Mạch gỗ", "Vận chuyển nước và muối khoáng"],
        ["Mạch rây", "Vận chuyển chất hữu cơ"],
        ["Lông hút của rễ", "Hút nước và muối khoáng"]], "Nối cho đúng nhé!"),
      topic("kh-camung","🐌","Cảm ứng ở sinh vật","Bài 33–35 • Cảm ứng và tập tính",[
        ["Cảm ứng ở sinh vật là gì?", "Khả năng tiếp nhận và phản ứng với kích thích của môi trường", "Khả năng sinh sản", "Khả năng lớn lên", "Cảm ứng giúp sinh vật thích nghi với môi trường."],
        ["Cây xấu hổ cụp lá khi chạm vào là ví dụ của hiện tượng gì?", "Cảm ứng ở thực vật", "Quang hợp", "Sinh sản vô tính", "Phản ứng cụp lá là cảm ứng ở thực vật."],
        ["Tập tính ở động vật là gì?", "Chuỗi phản ứng của động vật trả lời kích thích", "Kích thước cơ thể", "Màu sắc lông", "Tập tính là các phản ứng đặc trưng của loài."],
        ["Ví dụ nào là tập tính học được?", "Chó làm xiếc theo hiệu lệnh", "Nhện giăng tơ", "Chim xây tổ lần đầu", "Tập tính học được hình thành qua học tập, rèn luyện."],
        ["Ứng dụng cảm ứng ở thực vật vào thực tiễn: người ta làm gì để cây ra hoa đúng Tết?", "Điều chỉnh ánh sáng, nhiệt độ cho cây", "Không tưới nước", "Cắt hết lá", "Dựa vào tính cảm ứng với ánh sáng / nhiệt độ để điều khiển ra hoa."],
        ["Khi trời nóng, chó thè lưỡi là phản ứng nhằm mục đích gì?", "Toả nhiệt, làm mát cơ thể", "Tìm thức ăn", "Đe doạ kẻ thù", "Thè lưỡi giúp chó thoát nhiệt."],
        ["Hiện tượng thân cây mọc hướng về phía có ánh sáng được gọi là gì?", "Hướng sáng", "Hướng đất", "Hướng nước", "Thân cây có tính hướng sáng dương nên mọc về phía nguồn sáng."],
        ["Rễ cây mọc hướng xuống sâu trong đất là do tác động của yếu tố nào?", "Trọng lực", "Ánh sáng", "Âm thanh", "Rễ cây có tính hướng trọng lực dương nên mọc hướng xuống đất."],
        ["Rễ cây mọc hướng tới nơi có nguồn nước thể hiện tính hướng nào?", "Hướng nước", "Hướng sáng", "Hướng tiếp xúc", "Rễ tìm đến vùng đất ẩm nhờ tính hướng nước."],
        ["Ở động vật, phản ứng cảm ứng thường diễn ra nhanh nhờ hệ cơ quan nào?", "Hệ thần kinh", "Hệ tuần hoàn", "Hệ tiêu hoá", "Động vật cảm ứng nhờ hệ thần kinh và các giác quan nên phản ứng nhanh."],
        ["Ban ngày, hoa hướng dương thường quay mặt hoa về hướng nào?", "Hướng Mặt Trời", "Hướng ngược Mặt Trời", "Hướng xuống mặt đất", "Hoa hướng dương có tính hướng sáng nên quay theo Mặt Trời."],
        ["Tập tính có sẵn ngay từ khi sinh ra, không cần học tập gọi là gì?", "Tập tính bẩm sinh", "Tập tính học được", "Phản xạ có điều kiện mới", "Tập tính bẩm sinh được di truyền và có sẵn từ khi con vật sinh ra."],
        ["Việc nhện giăng tơ để bắt mồi thuộc loại tập tính nào?", "Tập tính bẩm sinh", "Tập tính học được", "Tập tính do con người dạy", "Nhện không cần học vẫn biết giăng tơ nên đó là tập tính bẩm sinh."],
        ["Chim di cư theo mùa để tránh rét thuộc loại tập tính nào?", "Tập tính bẩm sinh", "Tập tính học được", "Thói quen do nuôi nhốt", "Di cư là tập tính bẩm sinh giúp chim tránh điều kiện thời tiết xấu."],
        ["Tập tính học được ở động vật được hình thành nhờ quá trình nào?", "Học tập và rút kinh nghiệm", "Di truyền từ bố mẹ", "Có sẵn từ khi sinh ra", "Trong đời sống, động vật học tập và tích luỹ kinh nghiệm tạo tập tính học được."],
        ["Đèn bẫy côn trùng đặt ngoài đồng ruộng vào ban đêm lợi dụng tính chất nào của côn trùng?", "Tính hướng sáng", "Tính hướng nước", "Tính hướng đất", "Nhiều côn trùng gây hại bay về phía ánh sáng nên bị đèn bẫy thu hút."],
        ["Việc huấn luyện chó nghiệp vụ tìm đồ vật dựa trên loại tập tính nào?", "Tập tính học được", "Tập tính bẩm sinh", "Tập tính di cư", "Chó nghiệp vụ phải trải qua huấn luyện lâu dài mới hình thành kĩ năng."],
        ["Hiện tượng cảm ứng mang lại lợi ích gì cho sinh vật?", "Giúp thích nghi với môi trường", "Làm sinh vật yếu đi", "Ngăn sinh vật sinh sản", "Nhờ cảm ứng, sinh vật phản ứng kịp thời và thích nghi để tồn tại."],
        ["Khi trời rét, mèo thường cuộn tròn người và tìm nơi ấm áp. Đó là phản ứng gì?", "Cảm ứng với nhiệt độ thấp", "Cảm ứng với ánh sáng mạnh", "Tập tính di cư tránh rét", "Mèo phản ứng với cái lạnh bằng cách giảm mất nhiệt và tìm nơi ấm."],
        ["Cây trồng lâu ngày trong bóng râm thường có biểu hiện nào?", "Thân vươn dài và gầy yếu", "Thân mập và lá xanh đậm", "Ra hoa nhiều hơn hẳn", "Thiếu sáng khiến cây vươn dài tìm sáng, thân yếu và lá vàng."],
        ["Đặt chậu cây nằm ngang vài ngày, rễ cây sẽ mọc theo hướng nào?", "Mọc cong xuống phía dưới", "Mọc cong lên phía trên", "Mọc thẳng ngang mãi", "Rễ hướng trọng lực dương nên phần rễ sẽ cong xuống dưới."],
        ["Sâu bọ bay vào ánh đèn sáng vào ban đêm là do chúng có tính hướng nào?", "Hướng sáng", "Hướng hoá chất", "Hướng tiếp xúc", "Nhiều loài côn trùng bị thu hút bởi ánh sáng vào ban đêm."],
        ["Người nông dân dùng tiếng động lớn để xua đuổi chim phá hoại mùa màng là dựa vào khả năng nào của chim?", "Cảm ứng với âm thanh", "Cảm ứng với mùi vị", "Cảm ứng với từ trường", "Chim nghe tiếng động lớn bất thường sẽ sợ và bay đi."],
        ["Khi gặp kẻ thù nguy hiểm, thỏ thường có phản ứng tự vệ nào?", "Chạy trốn thật nhanh", "Đứng yên kêu thật to", "Tấn công bằng sừng", "Chạy trốn là phản ứng cảm ứng giúp thỏ tránh kẻ săn mồi."],
        ["Cây dây leo quấn quanh giàn hoặc thân cây khác để leo lên là phản ứng với tác nhân nào?", "Sự tiếp xúc với vật bám", "Ánh sáng quá mạnh", "Tiếng động lớn", "Thân dây leo có tính hướng tiếp xúc nên quấn vào vật bám để vươn lên."],
        ["Việc một bạn học sinh tập luyện lâu ngày và đi xe đạp thành thạo thuộc loại tập tính nào?", "Tập tính học được", "Tập tính bẩm sinh", "Tập tính xã hội bẩm sinh", "Đi xe đạp là kĩ năng hình thành qua học tập và luyện tập."]
      ], [["Cây xấu hổ cụp lá","Cảm ứng thực vật"],["Nhện giăng tơ","Tập tính bẩm sinh"],["Chó làm xiếc","Tập tính học được"],["Chó thè lưỡi","Toả nhiệt"],
        ["Thân cây mọc về phía ánh sáng", "Hướng sáng"],
        ["Nhện giăng tơ bắt mồi", "Tập tính bẩm sinh"],
        ["Huấn luyện thú làm xiếc mới", "Tập tính học được"]], "Nối cho đúng nhé!"),
      topic("kh-sinhtruong","🌿","Sinh trưởng và phát triển","Bài 36–38",[
        ["Sinh trưởng là gì?", "Sự tăng về kích thước, khối lượng của cơ thể", "Sự sinh ra thế hệ mới", "Sự thay đổi màu sắc", "Sinh trưởng: tăng kích thước và khối lượng."],
        ["Phát triển bao gồm những quá trình nào?", "Sinh trưởng, phân hoá và phát sinh hình thái", "Chỉ tăng chiều cao", "Chỉ tăng cân nặng", "Phát triển là quá trình biến đổi phức tạp gồm sinh trưởng và phân hoá."],
        ["Dấu hiệu sinh trưởng ở cây là gì?", "Cây cao lên, thân to ra, thêm lá", "Cây ra hoa (chủ yếu)", "Cây đổi màu lá theo mùa thu", "Cao lên, to ra là biểu hiện sinh trưởng rõ rệt."],
        ["Yếu tố nào ảnh hưởng đến sinh trưởng của cây trồng?", "Nước, ánh sáng, dinh dưỡng, nhiệt độ", "Chỉ màu đất", "Tiếng ồn", "Sinh trưởng chịu ảnh hưởng của nhiều yếu tố môi trường và chăm sóc."],
        ["Ứng dụng sinh trưởng: để cây cà chua cho năng suất cao, người trồng thường làm gì?", "Bấm ngọn, tỉa cành đúng kĩ thuật", "Không chăm sóc", "Tưới nước muối", "Bấm ngọn giúp cây phân cành, tăng quả."],
        ["Vòng đời của ếch gồm các giai đoạn nào?", "Trứng → nòng nọc → ếch con → ếch trưởng thành", "Trứng → ếch ngay", "Nòng nọc → cá", "Ếch phát triển qua biến thái."],
        ["Quá trình sinh trưởng ở cây diễn ra chủ yếu nhờ loại mô nào?", "Mô phân sinh", "Mô che chở", "Mô dẫn truyền", "Mô phân sinh gồm các tế bào có khả năng phân chia giúp cây lớn lên."],
        ["Mô phân sinh đỉnh của cây nằm ở những vị trí nào?", "Đầu thân và đầu rễ", "Giữa các đốt lá già", "Trong quả chín", "Mô phân sinh đỉnh ở chồi ngọn và chóp rễ giúp cây dài ra."],
        ["Mô phân sinh bên giúp cây thân gỗ thay đổi như thế nào?", "Thân to ra theo chiều ngang", "Thân dài ra rất nhanh", "Lá mọc nhiều hơn", "Mô phân sinh bên tạo lớp gỗ và vỏ mới làm thân to ra."],
        ["Trong vòng đời của bướm, giai đoạn nằm giữa sâu non và bướm trưởng thành là gì?", "Giai đoạn nhộng", "Giai đoạn trứng", "Giai đoạn sâu già", "Bướm phát triển qua biến thái hoàn toàn: trứng, sâu, nhộng, bướm."],
        ["Thứ tự đúng của vòng đời bướm là trứng, sâu, nhộng rồi đến giai đoạn nào?", "Bướm trưởng thành", "Trứng mới khác", "Nòng nọc", "Nhộng sẽ biến đổi thành bướm trưởng thành có cánh."],
        ["Yếu tố bên trong cơ thể ảnh hưởng đến sinh trưởng của sinh vật là gì?", "Di truyền và hormone", "Ánh sáng và gió", "Mưa và đất trồng", "Đặc điểm di truyền và hormone là các yếu tố bên trong điều tiết sinh trưởng."],
        ["Cây non bị thiếu ánh sáng lâu ngày thường có biểu hiện nào?", "Vươn dài, còi cọc, lá vàng", "Thân mập, lá xanh đậm", "Ra hoa và quả sớm", "Thiếu sáng cây quang hợp kém nên sinh trưởng chậm, thân yếu."],
        ["Bón phân hợp lí và đúng liều lượng có tác dụng gì với cây trồng?", "Giúp cây sinh trưởng tốt hơn", "Làm cây ngừng lớn ngay", "Làm đất khô cứng lại", "Phân bón cung cấp chất dinh dưỡng giúp cây sinh trưởng và cho năng suất cao."],
        ["Cây bắt đầu ra hoa và kết quả là dấu hiệu của quá trình nào?", "Phát triển", "Chỉ sinh trưởng đơn thuần", "Hô hấp tế bào", "Ra hoa, kết quả là biểu hiện của sự phát triển ở thực vật."],
        ["Ở trẻ em, chiều cao và cân nặng tăng lên theo tuổi là dấu hiệu của quá trình nào?", "Sinh trưởng", "Phát triển sinh sản", "Cảm ứng", "Tăng kích thước và khối lượng cơ thể là dấu hiệu sinh trưởng."],
        ["Giai đoạn dậy thì ở người thể hiện rõ nhất quá trình nào của cơ thể?", "Phát triển", "Thoát hơi nước", "Trao đổi khí", "Dậy thì có nhiều biến đổi về thể chất và sinh lí nên thuộc quá trình phát triển."],
        ["Chiếu sáng bổ sung cho cây trồng trong nhà kính vào ban đêm nhằm mục đích gì?", "Kích thích sinh trưởng và ra hoa", "Làm cây ngủ ngon hơn", "Diệt hết côn trùng ngay", "Ánh sáng nhân tạo giúp cây quang hợp và điều tiết ra hoa theo ý muốn."],
        ["Hạt đậu muốn nảy mầm tốt cần có đủ những điều kiện nào?", "Đủ nước và đủ khí oxi", "Đủ ánh sáng mạnh và gió", "Đủ phân bón hoá học", "Hạt nảy mầm cần nước để trương nở và oxi để hô hấp mạnh."],
        ["Khi nhiệt độ xuống quá thấp, hạt giống và cây non sẽ thế nào?", "Nảy mầm và sinh trưởng chậm", "Nảy mầm nhanh gấp đôi", "Không bị ảnh hưởng gì", "Nhiệt độ quá thấp ức chế hoạt động sống nên cây sinh trưởng chậm lại."],
        ["Chất kích thích sinh trưởng được dùng trong trồng trọt với mục đích gì?", "Thúc đẩy cây sinh trưởng nhanh", "Làm cây ngừng phát triển", "Diệt cỏ dại trong ruộng", "Chất kích thích sinh trưởng giúp cây lớn nhanh, ra rễ hoặc ra hoa sớm."],
        ["Vòng đời của một cây cam được tính bắt đầu từ giai đoạn nào?", "Hạt nảy mầm thành cây con", "Cây ra quả lần đầu", "Cây già và chết đi", "Vòng đời cây bắt đầu khi hạt nảy mầm và kết thúc khi cây già chết."],
        ["Con non của ếch vừa nở từ trứng được gọi là gì?", "Nòng nọc", "Ếch con có chân", "Nhộng", "Nòng nọc sống dưới nước, thở bằng mang rồi mới biến thành ếch."],
        ["Nòng nọc của ếch hô hấp bằng cơ quan nào khi sống dưới nước?", "Mang", "Phổi", "Da khô", "Nòng nọc thở bằng mang giống cá trước khi lên cạn."],
        ["Khi quan sát sự sinh trưởng của cây theo thời gian, người ta thường đo đại lượng nào?", "Chiều cao của cây", "Màu sắc của hoa", "Số lượng côn trùng đậu", "Chiều cao tăng dần theo thời gian là chỉ số sinh trưởng dễ đo nhất."],
        ["Dấu hiệu điển hình cho thấy cây đã chuyển sang giai đoạn phát triển là cây bắt đầu làm gì?", "Ra hoa", "Hút thêm nước", "Mọc thêm lá non", "Ra hoa đánh dấu cây chuyển từ giai đoạn sinh trưởng sang phát triển sinh sản."]
      ], [["Sinh trưởng","Tăng kích thước, khối lượng"],["Phát triển","Sinh trưởng + phân hoá"],["Bấm ngọn","Ứng dụng sinh trưởng"],["Ếch","Phát triển qua biến thái"],
        ["Mô phân sinh đỉnh", "Đầu thân và đầu rễ"],
        ["Giai đoạn giữa sâu và bướm", "Nhộng"],
        ["Cây ra hoa và kết quả", "Phát triển"]], "Nối cho đúng nhé!"),
      topic("kh-sinhsan","🌸","Sinh sản ở sinh vật","Bài 39–42 • Sinh sản vô tính, hữu tính",[
        ["Sinh sản vô tính là hình thức sinh sản như thế nào?", "Không có sự kết hợp của giao tử đực và cái", "Có thụ tinh", "Chỉ xảy ra ở động vật", "Sinh sản vô tính: cơ thể mới từ một phần cơ thể mẹ, không qua thụ tinh."],
        ["Ví dụ sinh sản vô tính ở thực vật là?", "Giâm cành, chiết cành, ghép", "Thụ phấn", "Gieo hạt (thường là hữu tính)", "Giâm, chiết, ghép là nhân giống vô tính."],
        ["Sinh sản hữu tính có đặc điểm gì?", "Có sự kết hợp giao tử đực và cái tạo hợp tử", "Con giống hệt mẹ 100% luôn", "Không cần tế bào sinh dục", "Hữu tính: giao tử đực + cái → hợp tử → cơ thể mới."],
        ["Cơ thể sinh vật là một thể thống nhất vì sao?", "Các cơ quan phối hợp hoạt động với nhau", "Mỗi cơ quan hoạt động độc lập", "Chỉ một cơ quan làm mọi việc", "Mọi cơ quan trong cơ thể phối hợp, thống nhất."],
        ["Yếu tố nào ảnh hưởng đến sinh sản của sinh vật?", "Nhiệt độ, ánh sáng, dinh dưỡng, hoocmôn", "Màu sắc của đất duy nhất", "Tiếng nhạc", "Nhiều yếu tố môi trường và nội tại ảnh hưởng sinh sản."],
        ["Hoa là cơ quan sinh sản của cây có hoa. Bộ phận nào chứa hạt phấn?", "Nhị hoa", "Nhuỵ hoa chứa noãn", "Cánh hoa", "Nhị là cơ quan sinh dục đực, tạo hạt phấn; nhuỵ chứa noãn."],
        ["Cây thuốc bỏng sinh sản vô tính nhờ bộ phận nào mọc cây con ở mép lá?", "Lá cây", "Hoa của cây", "Quả của cây", "Ở mép lá thuốc bỏng có chồi nhỏ rơi xuống đất sẽ mọc thành cây mới."],
        ["Trồng khoai tây bằng các củ có mầm là hình thức sinh sản nào?", "Sinh sản vô tính", "Sinh sản hữu tính", "Sinh sản bằng bào tử", "Cây khoai tây mới mọc từ củ của cây mẹ nên là sinh sản vô tính."],
        ["Rêu và dương xỉ sinh sản vô tính chủ yếu bằng gì?", "Bào tử", "Hạt có phôi", "Giâm cành", "Rêu và dương xỉ tạo bào tử nhỏ, nhẹ, phát tán nhờ gió và nước."],
        ["Thuỷ tức sinh sản vô tính bằng hình thức nào trên cơ thể mẹ?", "Nảy chồi", "Phân đôi tế bào", "Đẻ trứng", "Trên thân thuỷ tức mọc ra chồi, chồi lớn dần rồi tách thành cơ thể mới."],
        ["Trong sinh sản hữu tính, hợp tử được tạo thành từ sự kết hợp của những tế bào nào?", "Giao tử đực và giao tử cái", "Hai tế bào lá", "Hai tế bào rễ", "Thụ tinh là sự kết hợp giữa giao tử đực và giao tử cái tạo thành hợp tử."],
        ["Cơ quan sinh sản của cây hạt kín là bộ phận nào?", "Hoa", "Lá", "Thân", "Hoa chứa nhị và nhuỵ nên là cơ quan sinh sản của cây hạt kín."],
        ["Trong hoa, noãn nằm ở bên trong bộ phận nào của nhuỵ?", "Bầu nhuỵ", "Đầu nhuỵ", "Vòi nhuỵ", "Noãn nằm trong bầu nhuỵ và sẽ phát triển thành hạt sau thụ tinh."],
        ["Hiện tượng hạt phấn được chuyển đến đầu nhuỵ của hoa gọi là gì?", "Thụ phấn", "Thụ tinh", "Nảy mầm", "Thụ phấn là bước đầu tiên trước khi xảy ra thụ tinh ở hoa."],
        ["Sau khi thụ tinh, bầu nhuỵ của hoa phát triển thành bộ phận nào?", "Quả", "Hạt", "Lá mới", "Bầu nhuỵ phình to và biến đổi thành quả chứa hạt bên trong."],
        ["Sau khi thụ tinh, noãn trong bầu nhuỵ phát triển thành bộ phận nào?", "Hạt", "Quả", "Cánh hoa", "Noãn sau thụ tinh phát triển thành hạt của cây."],
        ["Khi ong và bướm hút mật hoa, chúng vô tình giúp hoa thực hiện quá trình nào?", "Thụ phấn", "Quang hợp", "Thoát hơi nước", "Hạt phấn dính vào cơ thể ong bướm và được mang sang hoa khác."],
        ["Cây ngô thụ phấn chủ yếu nhờ tác nhân nào trong tự nhiên?", "Gió", "Ong mật", "Chim ruồi", "Hoa ngô nhẹ và nhiều phấn nên thụ phấn nhờ gió là chủ yếu."],
        ["Gà và vịt sinh sản bằng hình thức nào?", "Đẻ trứng", "Đẻ con", "Nảy chồi", "Gà và vịt là động vật đẻ trứng, con non nở ra từ trứng."],
        ["Mèo và chó sinh sản bằng hình thức nào?", "Đẻ con", "Đẻ trứng", "Phân đôi", "Mèo và chó thuộc lớp thú, đẻ con và nuôi con bằng sữa."],
        ["Thụ tinh nhân tạo cho vật nuôi trong chăn nuôi nhằm mục đích chính gì?", "Cải tạo giống và tăng năng suất", "Làm vật nuôi ngừng sinh sản", "Giảm số lượng con sinh ra", "Thụ tinh nhân tạo giúp chọn giống tốt và nâng cao hiệu quả sinh sản."],
        ["Việc cắt bỏ tuyến sinh dục của vật nuôi đực trong chăn nuôi được gọi là gì?", "Thiến", "Ghép", "Chích ngừa", "Thiến giúp vật nuôi hiền hơn, lớn nhanh và cho chất lượng thịt tốt."],
        ["Cây gừng mới được trồng từ thân rễ của cây mẹ. Thân rễ là bộ phận nào?", "Thân ngầm dưới đất", "Rễ hút nước", "Lá biến dạng", "Thân rễ gừng nằm dưới đất, chứa mầm mọc thành cây mới."],
        ["Cây con sinh ra từ sinh sản vô tính có đặc điểm di truyền thế nào so với cây mẹ?", "Giống cây mẹ", "Khác hẳn cây mẹ", "Chỉ giống một nửa ngẫu nhiên", "Sinh sản vô tính chỉ từ một cơ thể mẹ nên cây con giống hệt cây mẹ."],
        ["Tế bào sinh dục đực ở người và động vật có vú được gọi là gì?", "Tinh trùng", "Trứng", "Hợp tử", "Tinh trùng là giao tử đực, kết hợp với trứng tạo thành hợp tử."],
        ["Tế bào sinh dục cái ở người và động vật có vú được gọi là gì?", "Trứng", "Tinh trùng", "Phôi", "Trứng là giao tử cái được thụ tinh bởi tinh trùng để tạo hợp tử."]
      ], [["Giâm cành","Sinh sản vô tính"],["Thụ tinh","Sinh sản hữu tính"],["Nhị hoa","Tạo hạt phấn"],["Nhuỵ hoa","Chứa noãn"],
        ["Cây thuốc bỏng", "Sinh sản bằng lá"],
        ["Thuỷ tức", "Nảy chồi"],
        ["Bầu nhuỵ sau thụ tinh", "Phát triển thành quả"]], "Nối cho đúng nhé!")
    ];
    /* ================= LỊCH SỬ & ĐỊA LÍ 7 ================= */
    var LSD7_TOPICS = [
      topic("ls-tayau","🏰","Lịch sử: Tây Âu phong kiến & phát kiến địa lí","Chương 1 • Phong kiến Tây Âu, phát kiến địa lí, Phục hưng",[
        ["Chế độ phong kiến Tây Âu hình thành vào khoảng thời gian nào?", "Từ thế kỉ V, sau khi đế quốc La Mã sụp đổ", "Thế kỉ XIX", "Thế kỉ XX", "Phong kiến Tây Âu hình thành từ thế kỉ V."],
        ["Cuộc phát kiến địa lí nổi tiếng năm 1492 gắn với ai?", "Cô-lôm-bô tìm ra châu Mỹ", "Ma-gien-lan", "Va-scô đơ Ga-ma", "Năm 1492, Cô-lôm-bô đến châu Mỹ."],
        ["Ai là người đầu tiên đi vòng quanh Trái Đất bằng đường biển?", "Đoàn thuỷ thủ của Ma-gien-lan", "Cô-lôm-bô", "Đi-át", "Chuyến đi của Ma-gien-lan (1519–1522) chứng minh Trái Đất hình cầu."],
        ["Phong trào Văn hoá Phục hưng bắt đầu ở nước nào?", "I-ta-li-a (Ý)", "Anh", "Nga", "Phục hưng khởi nguồn ở Ý từ thế kỉ XIV."],
        ["Phát kiến địa lí đem lại hệ quả nào?", "Mở ra con đường biển mới, thúc đẩy thương mại và quan hệ sản xuất tư bản chủ nghĩa", "Làm châu Âu nghèo đi ngay lập tức", "Chấm dứt mọi giao thương", "Phát kiến địa lí mở rộng thị trường, tích luỹ vốn cho chủ nghĩa tư bản."],
        ["Lãnh chúa và nông nô là hai giai cấp cơ bản trong xã hội nào?", "Xã hội phong kiến Tây Âu", "Xã hội tư bản", "Xã hội nguyên thuỷ", "Phong kiến Tây Âu: lãnh chúa phong kiến và nông nô."],
        ["Năm 476, đế quốc nào ở phương Tây sụp đổ, mở đầu thời trung đại ở Tây Âu?", "Đế quốc Tây La Mã", "Đế quốc Đông La Mã", "Đế quốc Pháp", "Năm 476 Tây La Mã sụp đổ sau các cuộc xâm nhập của người Giéc-man."],
        ["Ai là người Giéc-man đã lập nhiều vương quốc ở Tây Âu sau thế kỉ V?", "Các bộ tộc Giéc-man", "Người Mông Cổ", "Người Ả Rập", "Người Giéc-man xâm nhập và lập các vương quốc phong kiến ở Tây Âu."],
        ["Lãnh địa phong kiến ở Tây Âu có đặc điểm kinh tế nổi bật nào?", "Tự cung, tự cấp", "Sản xuất để bán khắp thế giới", "Chỉ buôn bán đường biển", "Lãnh địa là đơn vị kinh tế khép kín, tự cung tự cấp là chủ yếu."],
        ["Trong lãnh địa, đất của lãnh chúa được chia cho ai cày cấy?", "Nông nô", "Thương nhân thành thị", "Nô lệ chiến tranh", "Nông nô nhận đất của lãnh chúa để cày cấy và nộp tô, làm lao dịch."],
        ["Thành thị trung đại ở Tây Âu xuất hiện chủ yếu nhờ hoạt động nào phát triển?", "Thủ công nghiệp và thương nghiệp", "Chăn nuôi du mục", "Khai thác mỏ vàng", "Thủ công tách khỏi nông nghiệp, thợ tụ họp buôn bán nên thành thị ra đời."],
        ["Hội chợ ở thành thị trung đại có vai trò gì?", "Nơi trao đổi, buôn bán hàng hoá", "Nơi xét xử nông nô", "Nơi đóng quân của lãnh chúa", "Hội chợ là nơi tập trung mua bán, thúc đẩy thương nghiệp phát triển."],
        ["Năm 1488, Ba-tô-lô-mê-ô Đi-át đã đến được địa điểm nào?", "Mũi Hảo Vọng ở cực Nam châu Phi", "Châu Mỹ", "Ấn Độ", "Đi-át đến mũi Hảo Vọng, mở đường vòng quanh châu Phi."],
        ["Năm 1498, Va-scô đơ Ga-ma đến được Ca-li-cút thuộc nước nào?", "Ấn Độ", "Trung Quốc", "Nhật Bản", "Ga-ma đi đường biển vòng qua châu Phi và đến Ấn Độ năm 1498."],
        ["Cô-lôm-bô gọi thổ dân châu Mỹ là người Ấn Độ vì lí do nào?", "Ông tưởng đã đến Ấn Độ", "Ông đến từ Ấn Độ", "Thổ dân tự nhận như vậy", "Cô-lôm-bô nhầm tưởng châu Mỹ là Ấn Độ nên gọi thổ dân là người Ấn Độ."],
        ["Chuyến đi vòng quanh Trái Đất của Ma-gien-lan bắt đầu vào năm nào?", "Năm 1519", "Năm 1492", "Năm 1498", "Đoàn Ma-gien-lan khởi hành năm 1519 và hoàn thành năm 1522."],
        ["Ai đã chỉ huy đoàn tàu hoàn thành chuyến vòng quanh Trái Đất sau khi Ma-gien-lan mất?", "En-ca-nô", "Cô-lôm-bô", "Ga-ma", "Ma-gien-lan mất ở Phi-líp-pin, En-ca-nô đưa tàu về Tây Ban Nha năm 1522."],
        ["Tên châu Mỹ được đặt theo tên của nhà hàng hải nào?", "A-mê-ri-gô Vét-pu-xi", "Cô-lôm-bô", "Đi-át", "Vét-pu-xi xác nhận vùng đất mới là một lục địa mới nên được lấy để đặt tên."],
        ["Các phát kiến địa lí đã thúc đẩy thương mại thế giới như thế nào?", "Mở ra các tuyến đường biển mới", "Làm thương mại ngừng hẳn", "Chỉ buôn bán trong lãnh địa", "Đường biển mới nối châu Âu với châu Á, châu Mỹ, mở rộng thị trường."],
        ["Nguồn tích luỹ tư bản ban đầu ở Tây Âu chủ yếu đến từ đâu?", "Cướp bóc thuộc địa và buôn bán nô lệ", "Thuế của nông nô trong lãnh địa", "Sản xuất trong công xưởng thủ công", "Vàng bạc cướp ở châu Mỹ, châu Phi cùng buôn bán nô lệ tạo vốn ban đầu."],
        ["Văn hoá Phục hưng chủ yếu phục hưng di sản của nền văn hoá nào?", "Hy Lạp và La Mã cổ đại", "Ấn Độ cổ đại", "Trung Quốc cổ đại", "Phục hưng khôi phục giá trị văn hoá Hy Lạp, La Mã cổ đại bị lãng quên."],
        ["Tư tưởng trung tâm của Văn hoá Phục hưng là gì?", "Đề cao giá trị và vẻ đẹp con người", "Tôn thờ thần linh tuyệt đối", "Coi con người là tội lỗi", "Chủ nghĩa nhân văn đề cao con người, chống tư tưởng phong kiến lỗi thời."],
        ["Ai là tác giả bức tranh Nàng Mô-na Li-sa nổi tiếng thời Phục hưng?", "Lê-ô-na đơ Vanh-xi", "Mi-ken-lăng-giê-lô", "Sếch-xpia", "Lê-ô-na đơ Vanh-xi là hoạ sĩ, nhà khoa học tiêu biểu của Phục hưng Ý."],
        ["Nhà thiên văn nào đưa ra thuyết nhật tâm thời Phục hưng?", "Cô-péc-ních", "Ga-li-lê", "Niu-tơn", "Cô-péc-ních cho rằng Mặt Trời ở trung tâm, Trái Đất quay quanh Mặt Trời."],
        ["Năm 1517, Mác-tin Lu-thơ đã làm gì để khởi đầu Cải cách tôn giáo?", "Công bố bản Luận đề 95 điều", "Lập ra đạo Tin Lành ở Anh", "Đốt nhà thờ ở Rô-ma", "Lu-thơ dán Luận đề 95 điều phản đối việc bán thẻ xá tội của Giáo hội."],
        ["Cải cách tôn giáo ở Tây Âu đã dẫn tới sự ra đời của tôn giáo nào?", "Đạo Tin Lành", "Đạo Phật", "Đạo Hồi", "Cải cách làm Giáo hội phân hoá, đạo Tin Lành tách khỏi Công giáo."]
      ], [["1492","Cô-lôm-bô đến châu Mỹ"],["1519–1522","Ma-gien-lan vòng quanh Trái Đất"],["Phục hưng","Khởi nguồn ở Ý"],["Nông nô","Giai cấp bị bóc lột thời phong kiến"],
        ["Năm 476", "Tây La Mã sụp đổ"],
        ["Năm 1488", "Đi-át đến mũi Hảo Vọng"],
        ["Lê-ô-na đơ Vanh-xi", "Tác giả tranh Mô-na Li-sa"]], "Nối cho đúng nhé!"),
      topic("ls-trung-an","🐉","Lịch sử: Trung Quốc & Ấn Độ trung đại","Chương 2",[
        ["Triều đại nào thống nhất Trung Quốc năm 221 TCN?", "Nhà Tần (Tần Thuỷ Hoàng)", "Nhà Đường", "Nhà Minh", "Tần Thuỷ Hoàng thống nhất Trung Quốc năm 221 TCN."],
        ["Chế độ phong kiến Trung Quốc phát triển thịnh đạt dưới triều nào thường được nêu?", "Nhà Đường", "Nhà Thương", "Nhà Chu sơ kì", "Nhà Đường là thời kì thịnh trị điển hình của phong kiến Trung Quốc."],
        ["Ấn Độ thời trung đại nổi tiếng với vương triều Hồi giáo nào?", "Vương triều Mô-gôn", "Nhà Tần", "Nhà Lý", "Vương triều Mô-gôn (Mughal) ở Ấn Độ."],
        ["Công trình kiến trúc nổi tiếng của Ấn Độ thời Mô-gôn là?", "Đền Taj Mahal", "Vạn Lí Trường Thành", "Kim tự tháp", "Taj Mahal là lăng mộ nổi tiếng ở Ấn Độ."],
        ["Vạn Lí Trường Thành được xây dựng chủ yếu để làm gì?", "Phòng thủ chống xâm lấn từ phương Bắc", "Làm đường giao thương duy nhất", "Chứa nước", "Trường Thành là công trình phòng thủ quân sự của Trung Quốc phong kiến."],
        ["Trung Quốc phong kiến có những phát minh nổi tiếng nào?", "La bàn, giấy, kĩ thuật in, thuốc súng", "Điện thoại", "Máy bay", "Bốn phát minh lớn: giấy, in, la bàn, thuốc súng."],
        ["Sau khi thống nhất Trung Quốc, Tần Thuỷ Hoàng đặt kinh đô ở đâu?", "Hàm Dương", "Trường An", "Lạc Dương", "Tần Thuỷ Hoàng đóng đô ở Hàm Dương sau khi thống nhất năm 221 TCN."],
        ["Tần Thuỷ Hoàng đã thống nhất điều gì để quản lí đất nước hiệu quả hơn?", "Chữ viết, tiền tệ và đo lường", "Tôn giáo và nghệ thuật", "Trang phục của quý tộc", "Thống nhất chữ viết, tiền tệ, đo lường giúp nhà nước quản lí tập trung."],
        ["Triều đại nào ở Trung Quốc tồn tại từ năm 206 TCN đến năm 220?", "Nhà Hán", "Nhà Đường", "Nhà Tống", "Nhà Hán là triều đại lớn sau nhà Tần, kéo dài hơn bốn thế kỉ."],
        ["Con đường Tơ lụa thời Hán chủ yếu nối Trung Quốc với khu vực nào?", "Tây Á và châu Âu", "Châu Mỹ", "Châu Phi phía Nam", "Con đường Tơ lụa đưa tơ lụa Trung Quốc sang Tây Á và châu Âu."],
        ["Ai là người đã phát minh cách làm giấy ở Trung Quốc thời Hán?", "Thái Luân", "Tần Thuỷ Hoàng", "Đường Thái Tông", "Năm 105, Thái Luân cải tiến kĩ thuật làm giấy từ vỏ cây, vải rách."],
        ["Thời Đường, kinh đô Trường An nổi tiếng vì điều gì?", "Thành phố lớn, buôn bán sầm uất", "Chỉ là làng chài nhỏ", "Không có thương nhân nước ngoài", "Trường An thời Đường là đô thị lớn, giao thương quốc tế phát triển."],
        ["Dưới thời Tống, ngành kinh tế nào ở Trung Quốc phát triển mạnh?", "Thủ công nghiệp và thương nghiệp", "Chỉ nông nghiệp tự cấp", "Chăn nuôi du mục", "Thời Tống, gốm sứ, dệt, đóng tàu và buôn bán đường biển rất phát triển."],
        ["Người Trung Quốc đã phát minh ra la bàn dùng để làm gì?", "Định hướng khi đi biển", "Đo thời gian", "In sách nhanh hơn", "La bàn giúp tàu thuyền định hướng, thúc đẩy hàng hải phát triển."],
        ["Thuốc súng ở Trung Quốc ban đầu được dùng chủ yếu vào việc gì?", "Làm pháo hoa và tín hiệu", "Chế tạo máy hơi nước", "Sản xuất giấy", "Thuốc súng xuất hiện từ thời Đường, Tống rồi mới dùng nhiều trong quân sự."],
        ["Kĩ thuật in ở Trung Quốc đã giúp ích gì cho văn hoá?", "Phổ biến sách và tri thức rộng hơn", "Làm chữ viết bị mất đi", "Chỉ dùng để in tiền giấy", "In khắc gỗ rồi in chữ rời giúp sách rẻ hơn, tri thức lan rộng."],
        ["Vua nào của nhà Minh đã cử Trịnh Hoà đi biển nhiều lần?", "Minh Thành Tổ", "Tần Thuỷ Hoàng", "Thanh Cao Tông", "Đầu thế kỉ XV, Trịnh Hoà dẫn đoàn thuyền lớn sang Đông Nam Á, Ấn Độ, châu Phi."],
        ["Triều đại cuối cùng của chế độ phong kiến Trung Quốc là triều nào?", "Nhà Thanh", "Nhà Minh", "Nhà Tống", "Nhà Thanh trị vì từ năm 1644 đến năm 1912, là triều phong kiến cuối cùng."],
        ["Nho giáo ở Trung Quốc phong kiến có vai trò gì?", "Là hệ tư tưởng thống trị", "Bị cấm hoàn toàn", "Chỉ dùng trong quân đội", "Nho giáo là công cụ tư tưởng để củng cố trật tự phong kiến."],
        ["Vương triều Gu-ptơ ở Ấn Độ ra đời vào thế kỉ nào?", "Thế kỉ IV", "Thế kỉ I TCN", "Thế kỉ X", "Vương triều Gu-ptơ thành lập đầu thế kỉ IV, mở thời kì phát triển mới."],
        ["Người Ấn Độ thời Gu-ptơ đã có thành tựu toán học nổi bật nào?", "Phát minh chữ số 0 và hệ thập phân", "Phát minh máy in", "Phát minh la bàn", "Ấn Độ sáng tạo hệ chữ số thập phân gồm số 0, nay dùng khắp thế giới."],
        ["Vương triều Đê-li ở Ấn Độ do người theo tôn giáo nào lập nên?", "Hồi giáo", "Ấn Độ giáo", "Phật giáo", "Năm 1206, vương triều Hồi giáo Đê-li được thành lập ở Bắc Ấn Độ."],
        ["Vương triều Mô-gôn ở Ấn Độ được thành lập vào năm nào?", "Năm 1526", "Năm 1206", "Năm 1757", "Năm 1526, Ba-bua đánh thắng ở Pa-ni-pát và lập vương triều Mô-gôn."],
        ["Vua A-cơ-ba của vương triều Mô-gôn nổi tiếng với chính sách nào?", "Hoà hợp tôn giáo, khoan dung", "Cấm mọi tôn giáo khác", "Đóng cửa buôn bán", "A-cơ-ba thực hiện chính sách hoà hợp, đoàn kết các tôn giáo ở Ấn Độ."],
        ["Lăng Ta-giơ Ma-han được xây bằng chất liệu chính nào?", "Đá cẩm thạch trắng", "Gạch đỏ nung", "Gỗ lim", "Ta-giơ Ma-han nổi bật với đá cẩm thạch trắng và trang trí tinh xảo."],
        ["Ai là người cho xây lăng Ta-giơ Ma-han để tưởng nhớ vợ?", "Vua Sa Gia-han", "Vua A-cơ-ba", "Vua Ba-bua", "Sa Gia-han xây Ta-giơ Ma-han bên sông Yamuna để tưởng nhớ hoàng hậu."]
      ], [["221 TCN","Tần thống nhất Trung Quốc"],["Taj Mahal","Ấn Độ"],["Vạn Lí Trường Thành","Trung Quốc"],["La bàn, thuốc súng","Phát minh Trung Quốc"],
        ["Thái Luân", "Cải tiến kĩ thuật làm giấy"],
        ["Trịnh Hoà", "Các chuyến đi biển thời Minh"],
        ["A-cơ-ba", "Chính sách hoà hợp tôn giáo"]], "Nối cho đúng nhé!"),
      topic("ls-dna","🌏","Lịch sử: Đông Nam Á trung đại","Chương 3 • Các vương quốc phong kiến Đông Nam Á, Lào, Cam-pu-chia",[
        ["Vương quốc Cam-pu-chia thời trung đại nổi tiếng với công trình nào?", "Ăng-co Vát", "Tháp Chàm", "Hoàng thành Thăng Long", "Ăng-co là quần thể đền đài của Cam-pu-chia."],
        ["Vương quốc Lào thời trung đại có tên gọi / vương triều nổi bật nào?", "Lan Xang (Triệu Voi)", "Đại Việt", "Chăm-pa", "Lan Xang là vương quốc của người Lào, nghĩa là Triệu Voi."],
        ["Các vương quốc phong kiến Đông Nam Á hình thành và phát triển mạnh trong giai đoạn nào?", "Từ nửa sau thế kỉ X đến nửa đầu thế kỉ XVI", "Thế kỉ XX", "Thế kỉ I TCN", "Đây là giai đoạn thịnh đạt của các vương quốc phong kiến Đông Nam Á."],
        ["Ăng-co Vát ban đầu được xây dựng để thờ vị thần nào?", "Thần Vis-nu (Hindu giáo)", "Phật tổ duy nhất", "Thần Zeus", "Ăng-co Vát khởi đầu là đền Hindu thờ Vis-nu, sau trở thành di tích Phật giáo."],
        ["Nền kinh tế chủ đạo của các vương quốc Đông Nam Á trung đại là gì?", "Nông nghiệp trồng lúa nước", "Công nghiệp nặng", "Khai thác dầu mỏ", "Lúa nước là nền tảng kinh tế Đông Nam Á cổ truyền."],
        ["Vương quốc nào nằm trên lãnh thổ Lào ngày nay thời trung đại?", "Lan Xang", "Ăng-co", "Pagan của Mi-an-ma", "Lan Xang là vương quốc Lào xưa."],
        ["Vương quốc Phù Nam và Chân Lạp là tiền thân của nước nào ngày nay?", "Cam-pu-chia", "Lào", "Thái Lan", "Chân Lạp phát triển trên đất Cam-pu-chia ngày nay, để lại di sản Ăng-co."],
        ["Vương quốc Sri Vi-gia-ya mạnh lên nhờ kiểm soát hoạt động nào?", "Thương mại đường biển qua eo Ma-lắc-ca", "Trồng lúa ở vùng núi", "Khai thác mỏ sắt nội địa", "Sri Vi-gia-ya kiểm soát eo Ma-lắc-ca nên giàu mạnh nhờ buôn bán biển."],
        ["Vương quốc Ma-ta-ram ở In-đô-nê-xi-a nổi tiếng với công trình tôn giáo nào?", "Đền Bô-rô-bu-đua thờ Phật", "Tháp Chăm Mỹ Sơn", "Chùa tháp Bagan", "Bô-rô-bu-đua là đền Phật giáo lớn xây bằng đá ở Ma-ta-ram cổ."],
        ["Vương quốc Pa-gan là tiền thân của nước nào ngày nay?", "Mi-an-ma", "Việt Nam", "Ma-lai-xi-a", "Pa-gan thống nhất vùng sông I-ra-oa-đi, là nền tảng của Mi-an-ma."],
        ["Kinh đô của vương quốc Pa-gan nổi tiếng với hàng nghìn công trình nào?", "Chùa, tháp Phật giáo bằng gạch", "Tháp Chăm bằng gạch nung", "Kim tự tháp đá", "Pa-gan còn được gọi là vùng đất của hàng nghìn ngôi chùa tháp."],
        ["Vương quốc Su-khô-thay là vương quốc đầu tiên của người dân tộc nào?", "Người Thái", "Người Lào", "Người Khơ-me", "Su-khô-thay ra đời thế kỉ XIII, mở đầu lịch sử phong kiến Thái Lan."],
        ["Chữ viết của người Thái được sáng tạo dưới thời vương quốc nào?", "Su-khô-thay", "A-út-thay-a", "Lan Xang", "Vua Ram-kham-heng của Su-khô-thay sáng tạo chữ Thái vào thế kỉ XIII."],
        ["Vương quốc A-út-thay-a tồn tại lâu dài ở lưu vực sông nào?", "Sông Chao Phray-a", "Sông Mê Công", "Sông Hồng", "A-út-thay-a ở trung tâm Thái Lan ngày nay, mạnh về lúa gạo và buôn bán."],
        ["Cảng Ma-lắc-ca phát triển mạnh vào thế kỉ XV nhờ vị trí nào?", "Nằm trên tuyến biển Ấn Độ – Đông Á", "Nằm sâu trong sa mạc", "Nằm ở vùng núi cao", "Ma-lắc-ca kiểm soát eo biển cùng tên nên trở thành cảng trung chuyển lớn."],
        ["Năm 1353, Pha Ngum đã thống nhất các mường Lào và lập vương quốc nào?", "Lan Xang", "Lan Na", "Chăm-pa", "Pha Ngum lập Lan Xang năm 1353, đóng đô ở Luông Pha-bang."],
        ["Luông Pha-bang từng là kinh đô của vương quốc nào?", "Lan Xang của người Lào", "Ăng-co của người Khơ-me", "Pa-gan của người Miến", "Luông Pha-bang là kinh đô đầu tiên và trung tâm Phật giáo của Lan Xang."],
        ["Ngôi tháp Phật giáo nổi tiếng That Luông nằm ở thủ đô nào của Lào?", "Viêng Chăn", "Luông Pha-bang", "Chăm-pa-xắc", "That Luông ở Viêng Chăn là biểu tượng Phật giáo nổi tiếng của Lào."],
        ["Ai là người sáng lập đế chế Ăng-co vào năm 802?", "Gia-ya-vác-man II", "Gia-ya-vác-man VII", "Su-ri-a-vác-man II", "Năm 802, Gia-ya-vác-man II thống nhất Chân Lạp, mở đầu thời Ăng-co."],
        ["Ăng-co Vát được xây dựng dưới triều vua nào?", "Su-ri-a-vác-man II", "Gia-ya-vác-man II", "Gia-ya-vác-man VII", "Su-ri-a-vác-man II xây Ăng-co Vát vào đầu thế kỉ XII."],
        ["Khu đền Ăng-co Thom và tháp mặt người Ba-yon do vua nào xây?", "Gia-ya-vác-man VII", "Su-ri-a-vác-man II", "Gia-ya-vác-man II", "Cuối thế kỉ XII, Gia-ya-vác-man VII xây Ăng-co Thom và đền Ba-yon."],
        ["Người Khơ-me ở Ăng-co đã xây dựng công trình thuỷ lợi nổi bật nào?", "Hồ Ba-ray Tây và hệ thống kênh dẫn nước", "Đê sông Hồng", "Kênh đào Ma-lắc-ca", "Hồ chứa và kênh mương giúp Ăng-co trồng lúa nhiều vụ trong năm."],
        ["Chữ viết của người Khơ-me chịu ảnh hưởng từ chữ viết của nước nào?", "Ấn Độ", "Trung Quốc", "Ả Rập", "Văn hoá Ấn Độ truyền vào Đông Nam Á, chữ Khơ-me dựa trên chữ Ấn cổ."],
        ["Tôn giáo nào ảnh hưởng mạnh nhất đến Lan Xang từ thế kỉ XIV?", "Phật giáo Thượng toạ bộ", "Hồi giáo", "Thiên Chúa giáo", "Lan Xang lấy Phật giáo làm tôn giáo chính, chùa tháp mọc khắp nơi."],
        ["Các vương quốc Đông Nam Á hải đảo phát triển mạnh nhờ hoạt động nào?", "Thương mại đường biển", "Chăn nuôi du mục", "Khai mỏ trên núi cao", "Vị trí giữa Ấn Độ Dương và Thái Bình Dương giúp buôn bán biển phát đạt."],
        ["Gia vị nổi tiếng được buôn bán qua Đông Nam Á thời phong kiến là gì?", "Hồ tiêu, quế và đinh hương", "Cà phê và ca cao", "Cao su và dầu mỏ", "Quần đảo Gia vị ở In-đô-nê-xi-a cung cấp hồ tiêu, đinh hương cho thế giới."]
      ], [["Ăng-co Vát","Cam-pu-chia"],["Lan Xang","Lào"],["Lúa nước","Kinh tế chủ đạo ĐNA"],["Triệu Voi","Nghĩa của Lan Xang"],
        ["Năm 1353", "Pha Ngum lập vương quốc Lan Xang"],
        ["Năm 802", "Gia-ya-vác-man II lập đế chế Ăng-co"],
        ["Eo Ma-lắc-ca", "Tuyến thương mại biển quan trọng"]], "Nối cho đúng nhé!"),
      topic("ls-ngo-dinh","⚔️","Lịch sử: Ngô – Đinh – Tiền Lê (939–1009)","Chương 4 • Đất nước buổi đầu độc lập",[
        ["Chiến thắng nào năm 938 mở ra thời kì độc lập lâu dài của nước ta?", "Chiến thắng Bạch Đằng — Ngô Quyền đánh thắng quân Nam Hán", "Chi Lăng 1427", "Đống Đa 1789", "Năm 938, Ngô Quyền thắng quân Nam Hán trên sông Bạch Đằng."],
        ["Sau khi Ngô Quyền mất, tình hình đất nước thế nào?", "Loạn 12 sứ quân", "Thống nhất vững mạnh ngay", "Bị đô hộ lại ngay", "Cuối thời Ngô xảy ra loạn 12 sứ quân."],
        ["Ai dẹp loạn 12 sứ quân và xưng Hoàng đế, lập nhà Đinh?", "Đinh Bộ Lĩnh", "Lê Hoàn", "Ngô Quyền", "Đinh Bộ Lĩnh dẹp loạn, lên ngôi năm 968, đặt quốc hiệu Đại Cồ Việt."],
        ["Quốc hiệu nước ta thời Đinh – Tiền Lê là gì?", "Đại Cồ Việt", "Đại Việt", "Văn Lang", "Đại Cồ Việt (968–1054)."],
        ["Lê Hoàn lên ngôi lập triều đại nào và đánh thắng quân Tống năm 981?", "Tiền Lê", "Nhà Lý", "Nhà Trần", "Lê Hoàn (Lê Đại Hành) lập nhà Tiền Lê, kháng chiến chống Tống thắng lợi năm 981."],
        ["Kinh đô thời Ngô – Đinh – Tiền Lê đóng ở đâu?", "Hoa Lư (Ninh Bình)", "Thăng Long", "Phú Xuân", "Hoa Lư là kinh đô buổi đầu độc lập."],
        ["Ai đã mở đầu thời kì tự chủ của Việt Nam sau năm 905?", "Khúc Thừa Dụ", "Ngô Quyền", "Đinh Bộ Lĩnh", "Năm 905, Khúc Thừa Dụ chiếm thành Tống Bình, giành quyền tự chủ."],
        ["Khúc Hạo đã thực hiện cải cách nổi bật nào khi giữ quyền tự chủ?", "Chia đất nước thành các lộ, phủ, châu", "Dời đô về Hoa Lư", "Đặt quốc hiệu Đại Cồ Việt", "Khúc Hạo cải cách hành chính, đặt lộ, phủ, châu, xã để quản lí đất nước."],
        ["Năm 931, ai đã đánh đuổi quân Nam Hán và giữ quyền tự chủ?", "Dương Đình Nghệ", "Khúc Thừa Dụ", "Lê Hoàn", "Năm 931, Dương Đình Nghệ đánh đuổi quân Nam Hán, tiếp tục công cuộc tự chủ."],
        ["Kiều Công Tiễn đã cầu cứu lực lượng nào sau khi giết Dương Đình Nghệ?", "Quân Nam Hán", "Quân Tống", "Quân Nguyên", "Kiều Công Tiễn cầu cứu Nam Hán, tạo cớ cho quân Nam Hán xâm lược lần hai."],
        ["Ngô Quyền đã giết Kiều Công Tiễn ở thành nào trước trận Bạch Đằng?", "Thành Đại La", "Thành Hoa Lư", "Thành Cổ Loa", "Ngô Quyền kéo quân ra Bắc, giết Kiều Công Tiễn ở Đại La năm 938."],
        ["Ngô Quyền cho đóng cọc trên sông Bạch Đằng có đặc điểm gì?", "Cọc gỗ bịt sắt nhọn", "Cọc tre trơn", "Cọc đá lớn", "Cọc bịt sắt nhọn cắm ở cửa sông, khi thuỷ triều rút sẽ đâm thủng thuyền giặc."],
        ["Sau chiến thắng Bạch Đằng, Ngô Quyền xưng vương và đóng đô ở đâu?", "Cổ Loa", "Hoa Lư", "Thăng Long", "Năm 939, Ngô Quyền xưng vương, đóng đô ở Cổ Loa, mở thời kì độc lập lâu dài."],
        ["Sau khi Ngô Quyền mất năm 944, đất nước rơi vào tình trạng gì?", "Loạn cát cứ của các hào trưởng", "Thống nhất vững mạnh ngay", "Bị nhà Tống đô hộ lại", "Ngô Xương Văn mất, các hào trưởng nổi lên cát cứ thành loạn 12 sứ quân."],
        ["Đinh Bộ Lĩnh lớn lên ở vùng đất nào thuộc Ninh Bình ngày nay?", "Hoa Lư", "Cổ Loa", "Phong Châu", "Đinh Bộ Lĩnh quê ở Hoa Lư, từ nhỏ đã tập hợp trẻ chăn trâu tập trận."],
        ["Đinh Bộ Lĩnh đã liên kết với sứ quân nào để mạnh lên?", "Trần Lãm ở Bố Hải Khẩu", "Phạm Phòng Át", "Ngô Nhật Khánh", "Đinh Bộ Lĩnh nương nhờ và liên kết với Trần Lãm rồi thu phục các sứ quân khác."],
        ["Năm 968, sau khi dẹp loạn, Đinh Bộ Lĩnh lên ngôi với tôn hiệu gì?", "Đinh Tiên Hoàng đế", "Lý Thái Tổ", "Lê Đại Hành", "Đinh Bộ Lĩnh xưng hoàng đế, hiệu là Đinh Tiên Hoàng, mở triều Đinh."],
        ["Kinh đô của nước Đại Cồ Việt thời Đinh và Tiền Lê đặt ở đâu?", "Hoa Lư", "Thăng Long", "Cổ Loa", "Hoa Lư địa thế núi sông hiểm trở, là kinh đô của Đinh và Tiền Lê."],
        ["Đinh Tiên Hoàng đã đặt niên hiệu đầu tiên của Đại Cồ Việt là gì?", "Thái Bình", "Thuận Thiên", "Thiên Phúc", "Đinh Tiên Hoàng đặt niên hiệu Thái Bình và đúc tiền Thái Bình hưng bảo."],
        ["Đồng tiền đầu tiên của nước ta thời Đinh có tên là gì?", "Thái Bình hưng bảo", "Thuận Thiên nguyên bảo", "Hồng Đức thông bảo", "Tiền Thái Bình hưng bảo là tiền riêng đầu tiên của quốc gia độc lập."],
        ["Lê Hoàn lên ngôi năm 980 trong hoàn cảnh nào?", "Khi quân Tống chuẩn bị xâm lược", "Khi đất nước hoà bình lâu dài", "Sau khi thắng quân Minh", "Thái hậu Dương Vân Nga trao áo long cổn cho Lê Hoàn để chống Tống."],
        ["Năm 981, Lê Hoàn đã đánh thắng quân Tống ở những nơi nào?", "Bạch Đằng và Chi Lăng", "Như Nguyệt và Hàm Tử", "Đông Bộ Đầu và Vân Đồn", "Quân Tống bị đánh bại trên sông Bạch Đằng và ở ải Chi Lăng năm 981."],
        ["Ai là thái hậu đã trao ngôi cho Lê Hoàn năm 980?", "Dương Vân Nga", "Ỷ Lan", "Thượng Dương", "Dương Vân Nga vì lợi ích chống giặc đã trao ngôi cho thập đạo tướng quân Lê Hoàn."],
        ["Lê Hoàn đã cho mở lễ hội tịch điền nhằm khuyến khích điều gì?", "Sản xuất nông nghiệp", "Buôn bán đường biển", "Xây dựng chùa tháp", "Lê Hoàn cày tịch điền ở Đọi Sơn, khuyến khích nông nghiệp phát triển."],
        ["Quân đội thời Đinh và Tiền Lê được tổ chức thành bao nhiêu đạo?", "Mười đạo", "Năm đạo", "Ba đạo", "Lê Hoàn tổ chức quân đội thành thập đạo, do thập đạo tướng quân chỉ huy."],
        ["Sau thắng lợi năm 981, nhà Tống phải công nhận điều gì với Đại Cồ Việt?", "Công nhận nền độc lập của nước ta", "Đòi nước ta nộp vàng bạc mãi", "Đặt quan lại sang cai trị", "Thắng lợi 981 buộc Tống công nhận Đại Cồ Việt là nước độc lập."]
      ], [["938","Ngô Quyền thắng Bạch Đằng"],["968","Đinh Bộ Lĩnh, Đại Cồ Việt"],["981","Lê Hoàn thắng quân Tống"],["Hoa Lư","Kinh đô buổi đầu"],
        ["Năm 905", "Khúc Thừa Dụ giành quyền tự chủ"],
        ["Năm 939", "Ngô Quyền xưng vương, đóng đô Cổ Loa"],
        ["Dương Vân Nga", "Trao ngôi cho Lê Hoàn năm 980"]], "Nối sự kiện với mốc / nhân vật nhé!"),
      topic("ls-ly-tran","🛡️","Lịch sử: Lý – Trần – Hồ & kháng chiến","Chương 5 • Nhà Lý, kháng chiến chống Tống, nhà Trần, ba lần chống Mông – Nguyên",[
        ["Nhà Lý do ai sáng lập, dời đô về Thăng Long năm 1010?", "Lý Công Uẩn (Lý Thái Tổ)", "Trần Thái Tông", "Hồ Quý Ly", "Năm 1010, Lý Công Uẩn dời đô từ Hoa Lư về Đại La, đổi tên Thăng Long."],
        ["Cuộc kháng chiến chống Tống 1075–1077 gắn với danh tướng nào?", "Lý Thường Kiệt", "Trần Hưng Đạo", "Ngô Quyền", "Lý Thường Kiệt lãnh đạo kháng chiến chống Tống, với trận tuyến sông Như Nguyệt."],
        ["“Nam quốc sơn hà” được coi là bản tuyên ngôn độc lập đầu tiên, gắn với cuộc kháng chiến nào?", "Kháng chiến chống Tống thời Lý", "Chống Mông – Nguyên", "Khởi nghĩa Lam Sơn", "Bài thơ Nam quốc sơn hà gắn với kháng chiến chống Tống 1075–1077."],
        ["Ba lần kháng chiến chống Mông – Nguyên diễn ra dưới triều đại nào?", "Nhà Trần", "Nhà Lý", "Nhà Hồ", "Nhà Trần ba lần đánh thắng Mông – Nguyên (1258, 1285, 1287–88)."],
        ["Danh tướng chỉ huy ba lần kháng chiến chống Mông – Nguyên là ai?", "Trần Quốc Tuấn (Hưng Đạo Đại Vương)", "Lý Thường Kiệt", "Lê Lợi", "Trần Quốc Tuấn là tổng chỉ huy quân sự nhà Trần."],
        ["Nhà Hồ do ai lập, tồn tại trong giai đoạn nào?", "Hồ Quý Ly, 1400–1407, quốc hiệu Đại Ngu", "Lý Công Uẩn, 1009", "Trần Duệ Tông", "Hồ Quý Ly lập nhà Hồ (1400–1407), quốc hiệu Đại Ngu."],
        ["Lý Công Uẩn lên ngôi năm 1009, lập ra triều đại nào?", "Nhà Lý", "Nhà Trần", "Nhà Hồ", "Lý Công Uẩn sáng lập nhà Lý, trị vì từ năm 1009 đến 1225."],
        ["Chiếu dời đô của Lý Công Uẩn viết năm 1010 có tên gọi khác là gì?", "Thiên đô chiếu", "Hịch tướng sĩ", "Bình Ngô đại cáo", "Thiên đô chiếu là Chiếu dời đô từ Hoa Lư về Đại La, đổi tên Thăng Long."],
        ["Tên Thăng Long do Lý Công Uẩn đặt có nghĩa là gì?", "Rồng bay lên", "Rồng hạ xuống", "Thành phố hoa sen", "Thăng Long nghĩa là rồng bay lên, thể hiện khát vọng phát triển."],
        ["Năm 1070, nhà Lý đã xây dựng công trình giáo dục nào ở Thăng Long?", "Văn Miếu", "Quốc Tử Giám", "Thành Tây Đô", "Văn Miếu thờ Khổng Tử và các bậc hiền triết Nho giáo được xây năm 1070."],
        ["Năm 1076, trường đại học đầu tiên của nước ta được lập có tên là gì?", "Quốc Tử Giám", "Văn Miếu", "Hàn Lâm viện", "Quốc Tử Giám năm 1076 là trường dành cho con vua, quý tộc học tập."],
        ["Khoa thi đầu tiên của nhà Lý được tổ chức vào năm nào?", "Năm 1075", "Năm 1010", "Năm 1226", "Năm 1075, nhà Lý mở khoa thi Minh kinh bác sĩ, chọn người tài ra làm quan."],
        ["Vua Lý nào đã cho xây dựng Văn Miếu vào năm 1070?", "Lý Thánh Tông", "Lý Công Uẩn", "Lý Huệ Tông", "Năm 1070, Lý Thánh Tông cho xây Văn Miếu để thờ Khổng Tử."],
        ["Trong kháng chiến chống Tống, Lý Thường Kiệt đã chủ động làm gì năm 1075?", "Tấn công trước vào đất Tống", "Sang cầu hoà ở biên giới", "Rút quân về Thăng Long", "Lý Thường Kiệt đánh vào Ung Châu, Khâm Châu, Liêm Châu để phá chuẩn bị của Tống."],
        ["Phòng tuyến chống Tống năm 1077 được xây dựng dọc theo sông nào?", "Sông Như Nguyệt", "Sông Bạch Đằng", "Sông Hồng ở Thăng Long", "Phòng tuyến Như Nguyệt nay là sông Cầu đã chặn quân Tống tiến xuống."],
        ["Trận quyết chiến với quân Tống năm 1077 diễn ra ở đâu?", "Trên sông Như Nguyệt", "Ở Chi Lăng", "Ở Vân Đồn", "Quân Lý đánh thắng lớn ở Như Nguyệt, buộc Tống phải giảng hoà và rút quân."],
        ["Nhà Trần thành lập vào năm 1226 do ai nhường ngôi cho Trần Cảnh?", "Lý Chiêu Hoàng", "Lý Huệ Tông", "Lý Cao Tông", "Lý Chiêu Hoàng nhường ngôi cho chồng là Trần Cảnh, nhà Trần ra đời."],
        ["Hội nghị Diên Hồng năm 1284 đã thể hiện quyết tâm gì của nhân dân?", "Quyết chiến chống quân Nguyên", "Xin giảng hoà với Nguyên", "Dời đô vào phía Nam", "Các bô lão ở Diên Hồng đồng thanh hô đánh, thể hiện ý chí toàn dân."],
        ["Hịch tướng sĩ do Trần Quốc Tuấn viết nhằm mục đích gì?", "Khích lệ tướng sĩ đánh giặc Nguyên", "Kêu gọi mở khoa thi", "Dạy cách trồng lúa", "Hịch tướng sĩ nêu gương trung thần, khích lệ lòng yêu nước của binh sĩ."],
        ["Trận Vân Đồn năm 1288 do tướng nào chỉ huy đánh thắng đoàn thuyền lương Nguyên?", "Trần Khánh Dư", "Trần Quang Khải", "Phạm Ngũ Lão", "Trần Khánh Dư đánh chìm đoàn thuyền lương của Trương Văn Hổ ở Vân Đồn."],
        ["Chiến thắng Bạch Đằng năm 1288 gắn liền với tướng lĩnh nào?", "Trần Hưng Đạo", "Lý Thường Kiệt", "Lê Lợi", "Trần Quốc Tuấn chỉ huy bãi cọc Bạch Đằng, bắt sống Ô Mã Nhi năm 1288."],
        ["Trong ba lần chống Nguyên, trận Đông Bộ Đầu thuộc lần kháng chiến thứ mấy?", "Lần thứ hai, năm 1285", "Lần thứ nhất, năm 1258", "Lần thứ ba, năm 1288", "Năm 1285, quân Trần phản công thắng lớn ở Đông Bộ Đầu, giải phóng Thăng Long."],
        ["Chính sách ngụ binh ư nông thời Trần có nghĩa là gì?", "Binh lính luân phiên về cày ruộng", "Binh lính chỉ ở kinh đô", "Không có quân đội thường trực", "Ngụ binh ư nông giúp binh sĩ sản xuất lúc hoà bình, đánh giặc khi có chiến tranh."],
        ["Hồ Quý Ly đã thực hiện cải cách tiền tệ nổi bật nào?", "Phát hành tiền giấy thay tiền đồng", "Đúc tiền vàng cho quý tộc", "Cấm dùng tiền trong buôn bán", "Năm 1396, Hồ Quý Ly phát hành tiền giấy Thông bảo hội sao."],
        ["Thành Tây Đô do Hồ Quý Ly xây dựng hiện nay thuộc tỉnh nào?", "Thanh Hoá", "Nghệ An", "Ninh Bình", "Thành nhà Hồ ở Thanh Hoá xây bằng đá lớn, còn di tích đến ngày nay."],
        ["Nhà Hồ sụp đổ năm 1407 vì nguyên nhân chính nào?", "Quân Minh xâm lược và bị bắt", "Quân Nguyên xâm lược lần bốn", "Nội chiến giữa các vương hầu", "Năm 1407, quân Minh đánh bại nhà Hồ, nước ta rơi vào ách đô hộ Minh."]
      ], [["1010","Dời đô về Thăng Long"],["1075–1077","Lý Thường Kiệt chống Tống"],["1258–1288","Ba lần chống Mông – Nguyên"],["1400–1407","Nhà Hồ, Đại Ngu"],
        ["Năm 1070", "Xây dựng Văn Miếu ở Thăng Long"],
        ["Năm 1284", "Hội nghị Diên Hồng quyết đánh Nguyên"],
        ["Năm 1288", "Chiến thắng Bạch Đằng lần thứ ba"]], "Nối sự kiện với mốc thời gian nhé!"),
      topic("ls-lamson","🌾","Lịch sử: Khởi nghĩa Lam Sơn & Lê sơ","Chương 6 • 1418–1527",[
        ["Khởi nghĩa Lam Sơn do ai lãnh đạo, bùng nổ năm nào?", "Lê Lợi, năm 1418", "Nguyễn Trãi, năm 1400", "Trần Hưng Đạo, năm 1285", "Năm 1418, Lê Lợi dựng cờ khởi nghĩa ở Lam Sơn (Thanh Hoá)."],
        ["“Bình Ngô đại cáo” là tác phẩm của ai, tuyên cáo thắng lợi của khởi nghĩa nào?", "Nguyễn Trãi — khởi nghĩa Lam Sơn", "Lê Lợi — khởi nghĩa Lam Sơn tự viết", "Trần Hưng Đạo", "Nguyễn Trãi viết Bình Ngô đại cáo năm 1428 sau thắng lợi."],
        ["Khởi nghĩa Lam Sơn đánh thắng quân xâm lược nào?", "Quân Minh (Trung Quốc)", "Quân Tống", "Quân Mông – Nguyên", "Khởi nghĩa Lam Sơn chống quân Minh đô hộ."],
        ["Thời Lê sơ, bộ luật nào được ban hành dưới thời Lê Thánh Tông?", "Quốc triều hình luật (Luật Hồng Đức)", "Hình thư thời Lý", "Hoàng Việt luật lệ", "Luật Hồng Đức là bộ luật tiêu biểu thời Lê sơ."],
        ["Vị vua được coi là minh quân tiêu biểu, đưa Lê sơ đến thịnh trị là ai?", "Lê Thánh Tông", "Lê Lợi (chủ yếu công lao khởi nghĩa)", "Lê Chiêu Thống", "Lê Thánh Tông trị vì 1460–1497, thời kì thịnh trị của Lê sơ."],
        ["Đại Việt thời Lê sơ có quốc hiệu là gì?", "Đại Việt", "Đại Cồ Việt", "Đại Ngu", "Quốc hiệu Đại Việt được dùng từ thời Lý và tiếp tục thời Lê sơ."],
        ["Khởi nghĩa Lam Sơn bùng nổ vào mùa xuân năm nào?", "Năm 1418", "Năm 1407", "Năm 1428", "Ngày mồng hai Tết năm 1418, Lê Lợi xưng Bình Định Vương, phất cờ khởi nghĩa."],
        ["Căn cứ đầu tiên của nghĩa quân Lam Sơn đặt ở vùng nào?", "Lam Sơn, Thanh Hoá", "Chi Lăng, Lạng Sơn", "Nghệ An", "Lam Sơn là quê hương Lê Lợi và căn cứ đầu tiên của khởi nghĩa."],
        ["Ai là người đã đề xuất kế hoạch chuyển quân vào Nghệ An năm 1424?", "Nguyễn Chích", "Nguyễn Trãi", "Đinh Lễ", "Nguyễn Chích hiến kế chuyển vào Nghệ An, mở rộng căn cứ và lực lượng."],
        ["Nguyễn Trãi đã dâng bản kế hoạch nào cho Lê Lợi khi vào Lam Sơn?", "Bình Ngô sách", "Hịch tướng sĩ", "Chiếu dời đô", "Bình Ngô sách trình bày kế sách đánh Minh bằng nhân nghĩa, được Lê Lợi khen ngợi."],
        ["Chiến thắng Tốt Động – Chúc Động diễn ra vào năm nào?", "Năm 1426", "Năm 1418", "Năm 1427", "Năm 1426, nghĩa quân thắng lớn ở Tốt Động – Chúc Động, vây hãm Đông Quan."],
        ["Trận Chi Lăng – Xương Giang năm 1427 đã tiêu diệt lực lượng nào của Minh?", "Viện binh do Liễu Thăng chỉ huy", "Quân ở thành Đông Quan", "Thuỷ quân ở Bạch Đằng", "Liễu Thăng tử trận ở Chi Lăng, viện binh Minh bị đánh tan ở Xương Giang."],
        ["Tướng Minh nào đã tử trận ở ải Chi Lăng năm 1427?", "Liễu Thăng", "Vương Thông", "Mộc Thạnh", "Liễu Thăng chủ quan khinh địch, bị phục kích và tử trận ở Chi Lăng."],
        ["Hội thề Đông Quan cuối năm 1427 diễn ra giữa Lê Lợi và tướng Minh nào?", "Vương Thông", "Liễu Thăng", "Trương Phụ", "Vương Thông thề sẽ rút quân về nước, Lê Lợi cấp thuyền lương cho quân Minh về."],
        ["Lê Lợi lên ngôi hoàng đế năm 1428, đặt niên hiệu là gì?", "Thuận Thiên", "Hồng Đức", "Thái Bình", "Lê Thái Tổ đặt niên hiệu Thuận Thiên, quốc hiệu Đại Việt, đóng đô Thăng Long."],
        ["Bình Ngô đại cáo được coi là bản tuyên ngôn độc lập thứ mấy của nước ta?", "Thứ hai", "Thứ nhất", "Thứ ba", "Sau Nam quốc sơn hà, Bình Ngô đại cáo là tuyên ngôn độc lập thứ hai."],
        ["Tác phẩm Ức Trai thi tập và Quốc âm thi tập là của tác giả nào?", "Nguyễn Trãi", "Lê Thánh Tông", "Nguyễn Bỉnh Khiêm", "Nguyễn Trãi để lại nhiều thơ chữ Hán và thơ Nôm tiêu biểu thế kỉ XV."],
        ["Lê Thánh Tông lên ngôi và trị vì trong khoảng thời gian nào?", "Năm 1460 đến 1497", "Năm 1428 đến 1433", "Năm 1527 đến 1592", "Lê Thánh Tông trị vì 38 năm, đưa Đại Việt thời Lê sơ đến đỉnh cao."],
        ["Bộ luật Hồng Đức có tên chính thức là gì?", "Quốc triều hình luật", "Hoàng Việt luật lệ", "Hình thư thời Lý", "Quốc triều hình luật gồm hơn 700 điều, bảo vệ cả quyền lợi phụ nữ."],
        ["Năm 1471, Lê Thánh Tông đã mở rộng lãnh thổ Đại Việt đến đâu?", "Chiếm thành Trà Bàn, lập đạo Thừa tuyên Quảng Nam", "Đến tận đồng bằng sông Cửu Long", "Đến biên giới nhà Minh", "Thắng Chăm-pa năm 1471, Lê Thánh Tông lập Thừa tuyên Quảng Nam."],
        ["Lê Thánh Tông đã cho vẽ và hoàn thành bộ bản đồ nào của Đại Việt?", "Bản đồ Hồng Đức", "Đại Nam nhất thống toàn đồ", "Hoàng triều trực tỉnh địa dư", "Bản đồ Hồng Đức là bộ bản đồ đầu tiên vẽ khá đầy đủ lãnh thổ Đại Việt."],
        ["Chính sách quân điền thời Lê sơ nhằm mục đích gì?", "Chia ruộng đất công làng xã cho dân", "Thu hết ruộng đất cho vua", "Cấm dân cày ruộng công", "Quân điền chia ruộng công theo định kì, hạn chế chênh lệch giàu nghèo."],
        ["Hội Tao đàn do Lê Thánh Tông sáng lập hoạt động trong lĩnh vực nào?", "Văn học, sáng tác thơ", "Võ thuật", "Y học", "Tao đàn là hội thơ của vua và triều thần, thúc đẩy văn học phát triển."],
        ["Ai là trạng nguyên nổi tiếng thời Lê Thánh Tông với tài đối đáp khi đi sứ?", "Lương Thế Vinh", "Mạc Đĩnh Chi", "Chu Văn An", "Lương Thế Vinh đỗ trạng nguyên, nổi tiếng toán học và ngoại giao."],
        ["Thời Lê sơ, tôn giáo và học thuyết nào giữ địa vị độc tôn?", "Nho giáo", "Phật giáo", "Đạo giáo", "Lê Thánh Tông đề cao Nho giáo, dùng Nho giáo để quản lí xã hội."],
        ["Lê Thánh Tông đã chia đất nước thành bao nhiêu đạo thừa tuyên?", "13 đạo thừa tuyên", "10 đạo thừa tuyên", "5 đạo thừa tuyên", "Cải cách của Lê Thánh Tông chia nước thành 13 đạo thừa tuyên để quản lí."]
      ], [["1418","Lê Lợi khởi nghĩa Lam Sơn"],["1428","Bình Ngô đại cáo"],["Lê Thánh Tông","Luật Hồng Đức"],["Quân Minh","Đối tượng kháng chiến Lam Sơn"],
        ["Năm 1426", "Thắng lợi Tốt Động – Chúc Động"],
        ["Năm 1427", "Chiến thắng Chi Lăng – Xương Giang"],
        ["Lê Thánh Tông", "Ban hành luật Hồng Đức"]], "Nối cho đúng nhé!"),
      topic("ls-champa","🗿","Lịch sử: Chăm-pa & vùng đất Nam Bộ","Chương 7 • Vương quốc Chăm-pa và Nam Bộ đến đầu thế kỉ XVI",[
        ["Vương quốc Chăm-pa nằm ở khu vực nào của Việt Nam ngày nay?", "Duyên hải miền Trung", "Đồng bằng sông Hồng", "Tây Nguyên hoàn toàn", "Chăm-pa tồn tại ở miền Trung Việt Nam ngày nay."],
        ["Người Chăm nổi tiếng với loại hình kiến trúc nào còn đến ngày nay?", "Tháp Chăm bằng gạch nung", "Chùa hang đá", "Nhà sàn dài", "Tháp Chăm là di sản kiến trúc đặc trưng của Chăm-pa."],
        ["Vùng đất Nam Bộ từ đầu thế kỉ X đến đầu thế kỉ XVI thuộc / chịu ảnh hưởng của vương quốc nào được học trong bài?", "Chăm-pa và các tiểu quốc / Chân Lạp ở phía Nam", "Nhà Đường", "Nhật Bản", "Nam Bộ thời kì này gắn với Chăm-pa và Chân Lạp trước khi người Việt khai phá mạnh mẽ."],
        ["Tôn giáo ảnh hưởng lớn đến văn hoá Chăm-pa là?", "Ấn Độ giáo (Hindu) và Phật giáo, sau có Hồi giáo", "Thiên Chúa giáo duy nhất", "Nho giáo duy nhất", "Văn hoá Chăm-pa chịu ảnh hưởng Ấn Độ sâu sắc."],
        ["Kinh đô / trung tâm nổi tiếng của Chăm-pa là?", "Trà Kiệu, Vijaya (Đồ Bàn)", "Thăng Long", "Hoa Lư", "Vijaya (Đồ Bàn, Bình Định) là kinh đô lớn của Chăm-pa."],
        ["Di sản tháp Chăm nổi tiếng ở Quảng Nam là?", "Mỹ Sơn", "Phong Nha", "Cố đô Huế", "Thánh địa Mỹ Sơn là quần thể tháp Chăm nổi tiếng."],
        ["Vương quốc Chăm-pa được hình thành từ cuối thế kỉ nào?", "Cuối thế kỉ II", "Đầu thế kỉ X", "Thế kỉ VII TCN", "Năm 192, khu Liên lập Lâm Ấp, tiền thân của Chăm-pa sau này."],
        ["Kinh đô Sinhapura của Chăm-pa nay thuộc địa danh nào?", "Trà Kiệu, Quảng Nam", "Đồ Bàn, Bình Định", "Phan Rang, Ninh Thuận", "Sinhapura ở Trà Kiệu là kinh đô sớm của Chăm-pa."],
        ["Kinh đô Indrapura của Chăm-pa gắn với trung tâm Phật giáo nào?", "Đồng Dương, Quảng Nam", "Mỹ Sơn, Quảng Nam", "Trà Kiệu, Quảng Nam", "Indrapura và tu viện Đồng Dương là trung tâm Phật giáo lớn thế kỉ IX."],
        ["Thánh địa Mỹ Sơn là nơi thờ các vị thần của tôn giáo nào?", "Ấn Độ giáo, thờ thần Si-va", "Phật giáo Thượng toạ bộ", "Hồi giáo", "Mỹ Sơn thờ thần Si-va, là trung tâm tôn giáo của các vua Chăm-pa."],
        ["Tháp Chăm thường được xây bằng vật liệu gì?", "Gạch nung đỏ", "Đá cẩm thạch trắng", "Gỗ và tre", "Tháp Chăm xây bằng gạch nung xếp khít, chạm khắc tinh xảo, ít dùng vữa."],
        ["Đỉnh tháp Chăm thường tượng trưng cho ngọn núi thiêng nào?", "Núi Mê-ru", "Núi Phú Sĩ", "Núi Thái Sơn", "Hình dáng tháp mô phỏng núi Mê-ru, nơi ở của các vị thần Ấn Độ giáo."],
        ["Chữ viết cổ của người Chăm chịu ảnh hưởng từ chữ viết nào?", "Chữ Phạn của Ấn Độ", "Chữ Hán của Trung Quốc", "Chữ Nôm của Việt Nam", "Chữ Chăm cổ dựa trên chữ Phạn, ghi trên bia đá từ thế kỉ IV."],
        ["Bia Võ Cạnh ở Khánh Hoà là bia chữ Phạn cổ nhất ở khu vực nào?", "Đông Nam Á", "Đông Á", "Nam Á", "Bia Võ Cạnh thế kỉ II–III là minh chứng sớm của văn hoá Ấn Độ ở Chăm-pa."],
        ["Cư dân Chăm-pa trồng lúa nước chủ yếu ở vùng nào?", "Đồng bằng ven biển miền Trung", "Vùng núi cao Tây Nguyên", "Đồng bằng sông Cửu Long", "Đồng bằng hẹp ven biển thuận lợi trồng lúa, làm thuỷ lợi nhỏ."],
        ["Người Chăm nổi tiếng với nghề thủ công truyền thống nào còn đến nay?", "Dệt vải và làm gốm", "Đúc súng đại bác", "Khai thác dầu mỏ", "Làng gốm Bàu Trúc và dệt Mỹ Nghiệp ở Ninh Thuận nổi tiếng lâu đời."],
        ["Cảng thị của Chăm-pa buôn bán với thương nhân nước ngoài qua đường nào?", "Trung Quốc, Ấn Độ và Ả Rập", "Chỉ với Nhật Bản", "Vị trí ven biển giúp Chăm-pa giao thương với nhiều nước qua Biển Đông.", "Vị trí ven biển giúp Chăm-pa giao thương với nhiều nước qua Biển Đông."],
        ["Năm 1471, Vijaya thất thủ đã đánh dấu sự kiện gì của Chăm-pa?", "Chăm-pa suy yếu, mất phần lớn lãnh thổ phía Bắc", "Chăm-pa thống nhất Đông Nam Á", "Chăm-pa dời đô về Thăng Long", "Sau 1471, Chăm-pa chỉ còn vùng đất phía Nam, ngày càng thu hẹp."],
        ["Sau năm 1471, trung tâm của Chăm-pa chuyển về vùng nào?", "Pa-nđu-ran-ga, nay là Ninh Thuận – Bình Thuận", "Trà Kiệu, Quảng Nam", "Đồ Bàn, Bình Định", "Pa-nđu-ran-ga là tiểu quốc còn lại của Chăm-pa sau biến cố 1471."],
        ["Vùng đất Nam Bộ từ thế kỉ X đến XVI chủ yếu thuộc vương quốc nào?", "Chân Lạp", "Chăm-pa", "Đại Việt", "Nam Bộ lúc này thuộc Chân Lạp, cư dân Khơ-me là chủ yếu."],
        ["Văn hoá Óc Eo ở Nam Bộ là di sản của vương quốc cổ nào?", "Phù Nam", "Chăm-pa", "Lan Xang", "Óc Eo là cảng thị của Phù Nam, để lại nhiều hiện vật ở An Giang, Kiên Giang."],
        ["Cảng Óc Eo xưa nay thuộc tỉnh nào của Việt Nam?", "An Giang", "Cà Mau", "Trà Vinh", "Di tích Óc Eo – Ba Thê nằm ở huyện Thoại Sơn, tỉnh An Giang."],
        ["Người Khơ-me ở Nam Bộ trồng trọt chủ yếu dựa vào điều kiện nào?", "Mùa nước nổi và phù sa sông Mê Công", "Tuyết tan trên núi cao", "Mưa nhân tạo", "Đồng bằng thấp, kênh rạch chằng chịt giúp trồng lúa nước ở Nam Bộ."],
        ["Angkor là kinh đô của Chân Lạp, còn Nam Bộ chịu ảnh hưởng văn hoá nào?", "Văn hoá Khơ-me Ăng-co", "Văn hoá Chăm-pa biển", "Văn hoá Hoa Bắc", "Nam Bộ thuộc Chân Lạp nên mang đậm dấu ấn văn hoá Khơ-me."],
        ["Tháp Chăm Po Nagar ở Nha Trang thờ nữ thần nào?", "Nữ thần Pô A-nư Po Nagar, Mẹ xứ sở", "Nữ thần sông Hằng", "Quan Âm Bồ Tát", "Po Nagar thờ Mẹ xứ sở của người Chăm, nay vẫn là nơi lễ hội lớn."],
        ["Lễ hội lớn nhất của người Chăm theo Ấn Độ giáo là lễ hội nào?", "Lễ Ka-tê", "Lễ hội Ok Om Bok", "Tết Nguyên đán", "Ka-tê là lễ hội tưởng nhớ tổ tiên, thần linh của người Chăm Bà-la-môn."]
      ], [["Tháp Chăm","Kiến trúc Chăm-pa"],["Mỹ Sơn","Quảng Nam"],["Vijaya","Kinh đô Chăm-pa"],["Duyên hải miền Trung","Địa bàn Chăm-pa"],
        ["Mỹ Sơn", "Thánh địa Ấn Độ giáo của Chăm-pa"],
        ["Óc Eo", "Cảng thị cổ của Phù Nam ở Nam Bộ"],
        ["Po Nagar", "Tháp thờ Mẹ xứ sở ở Nha Trang"]], "Nối cho đúng nhé!"),
      topic("dl-chauau","🇪🇺","Địa lí: Châu Âu","Chương Địa 1 • Vị trí, tự nhiên, dân cư, EU",[
        ["Châu Âu nằm chủ yếu ở đới khí hậu nào?", "Ôn đới", "Nhiệt đới", "Hàn đới hoàn toàn", "Phần lớn châu Âu thuộc đới ôn hoà."],
        ["Dãy núi cao, đồ sộ nổi tiếng của châu Âu là?", "An-pơ (Alps)", "Hi-ma-lay-a", "An-đét", "An-pơ là dãy núi cao nhất châu Âu."],
        ["Liên minh châu Âu (EU) là tổ chức như thế nào?", "Liên minh kinh tế – chính trị của nhiều nước châu Âu", "Một quốc gia duy nhất", "Tổ chức quân sự của châu Á", "EU là liên minh của các quốc gia châu Âu hợp tác kinh tế, chính trị."],
        ["Dân cư châu Âu có đặc điểm nổi bật nào hiện nay?", "Tỉ lệ dân thành thị cao, dân số già", "Chủ yếu sống ở nông thôn", "Dân số trẻ nhất thế giới", "Châu Âu đô thị hoá cao và già hoá dân số."],
        ["Bán đảo lớn ở phía nam châu Âu là?", "I-bê-ria, I-ta-li-a, Ban-căng", "A-rập", "Ấn Độ", "Phía nam châu Âu có ba bán đảo lớn hướng ra Địa Trung Hải."],
        ["Châu Âu tiếp giáp với châu lục nào ở phía đông?", "Châu Á", "Châu Phi qua biển Địa Trung Hải là phía nam", "Châu Mỹ", "Ranh giới đông của châu Âu với châu Á là dãy U-ran."],
        ["Phía tây châu Âu tiếp giáp với đại dương nào?", "Đại Tây Dương", "Ấn Độ Dương", "Thái Bình Dương", "Phía tây châu Âu là Đại Tây Dương."],
        ["Phía nam châu Âu tiếp giáp với biển nào?", "Biển Địa Trung Hải", "Biển Đỏ", "Biển A-rap", "Phía nam châu Âu là biển Địa Trung Hải."],
        ["Dãy núi nào ở châu Âu được gọi là mái nhà của châu Âu với đỉnh Môn-blăng?", "Dãy An-pơ", "Dãy U-ran", "Dãy Cáp-ca", "Đỉnh Môn-blăng thuộc dãy An-pơ ở châu Âu."],
        ["Sông nào dài nhất châu Âu?", "Sông Von-ga", "Sông Đa-nuýp", "Sông Rai-nơ", "Sông Von-ga dài nhất châu Âu, đổ ra biển Ca-xpi."],
        ["Đồng bằng nào chiếm diện tích lớn nhất châu Âu?", "Đồng bằng Đông Âu", "Đồng bằng Bắc Âu", "Đồng bằng Tây Âu", "Đồng bằng Đông Âu rộng lớn ở phía đông châu Âu."],
        ["Châu Âu chủ yếu nằm trong đới khí hậu nào?", "Đới ôn hoà", "Đới nóng", "Đới lạnh", "Phần lớn châu Âu nằm trong đới ôn hoà."],
        ["Khí hậu ven biển phía tây châu Âu ẩm và ấm hơn phía đông chủ yếu do ảnh hưởng của yếu tố nào?", "Dòng biển nóng Bắc Đại Tây Dương", "Gió mùa mùa hạ", "Dòng biển lạnh", "Dòng biển nóng làm ven biển phía tây ấm và ẩm hơn."],
        ["Rừng lá kim ở châu Âu phân bố chủ yếu ở khu vực nào?", "Phía bắc châu lục", "Phía nam châu lục", "Ven Địa Trung Hải", "Rừng lá kim phân bố ở vùng ôn đới lạnh phía bắc."],
        ["EU dùng đồng tiền chung nào ở nhiều nước thành viên?", "Đồng ơ-rô", "Đồng đô la", "Đồng bảng Anh", "Nhiều nước EU dùng chung đồng ơ-rô."],
        ["Trụ sở chính của Liên minh châu Âu đặt tại thành phố nào?", "Brúc-xen", "Pa-ri", "Béc-lin", "Trụ sở chính của EU đặt tại Brúc-xen, nước Bỉ."],
        ["Sau khi Anh rời EU, Liên minh châu Âu còn bao nhiêu nước thành viên?", "27 nước", "28 nước", "25 nước", "EU hiện có 27 nước thành viên."],
        ["Đặc điểm nổi bật về cơ cấu dân số châu Âu là gì?", "Tỉ lệ người già cao", "Tỉ lệ trẻ em rất cao", "Dân số tăng rất nhanh", "Châu Âu có cơ cấu dân số già."],
        ["Ngôn ngữ và tôn giáo chủ yếu ở châu Âu là gì?", "Ki-tô giáo chiếm đa số", "Phật giáo chiếm đa số", "Hồi giáo chiếm đa số", "Phần lớn dân châu Âu theo Ki-tô giáo."],
        ["Châu Âu thu hút nhiều người nhập cư chủ yếu vì lí do nào?", "Kinh tế phát triển, mức sống cao", "Khí hậu nóng quanh năm", "Đất nông nghiệp rất rộng", "Mức sống cao thu hút lao động nhập cư đến châu Âu."],
        ["Trong khai thác rừng, châu Âu chú trọng biện pháp nào để bảo vệ thiên nhiên?", "Trồng rừng và khai thác bền vững", "Phá rừng lấy đất ở", "Khai thác trắng toàn bộ", "Châu Âu trồng rừng đi đôi với khai thác bền vững."],
        ["Vấn đề môi trường biển ở châu Âu cần quan tâm là gì?", "Ô nhiễm biển và suy giảm nguồn hải sản", "Biển đóng băng quanh năm", "Không có hoạt động đánh bắt", "Ô nhiễm biển đe dọa môi trường và nguồn hải sản châu Âu."],
        ["Khu vực nào ở châu Âu có nhiều núi già ở phía bắc và tây bắc?", "Bán đảo Xcan-đi-na-vi", "Bán đảo I-bê-ric", "Bán đảo Ban-căng", "Bán đảo Xcan-đi-na-vi có địa hình núi già và băng hà."],
        ["Sông Đa-nuýp chảy qua nhiều thủ đô châu Âu và đổ vào biển nào?", "Biển Đen", "Biển Ban-tích", "Biển Bắc", "Sông Đa-nuýp đổ vào Biển Đen."],
        ["Nền nông nghiệp châu Âu có đặc điểm nổi bật nào?", "Hiện đại, hiệu quả cao", "Lạc hậu, du canh", "Chỉ trồng cây nhiệt đới", "Nông nghiệp châu Âu hiện đại và đạt hiệu quả cao."],
        ["Biến đổi khí hậu đang gây ra hiện tượng nào rõ ở châu Âu?", "Nắng nóng và hạn hán gia tăng", "Băng giá quanh năm", "Mưa tuyết tăng mạnh", "Châu Âu ghi nhận nhiều đợt nắng nóng và hạn hán hơn."]
      ], [["An-pơ","Dãy núi châu Âu"],["EU","Liên minh châu Âu"],["Ôn đới","Khí hậu chủ yếu"],["U-ran","Ranh giới với châu Á"],
        ["Sông Von-ga", "sông dài nhất châu Âu"],
        ["Đồng bằng Đông Âu", "đồng bằng lớn nhất châu Âu"],
        ["Trụ sở EU", "thành phố Brúc-xen"]], "Nối cho đúng nhé!"),
      topic("dl-chaua","🌏","Địa lí: Châu Á","Chương Địa 2 • Vị trí, tự nhiên, dân cư châu Á",[
        ["Châu Á là châu lục có diện tích thế nào so với các châu lục khác?", "Lớn nhất thế giới", "Nhỏ nhất", "Thứ hai sau châu Phi là sai vì châu Á lớn nhất", "Châu Á rộng khoảng 44,4 triệu km², lớn nhất thế giới."],
        ["Đỉnh núi cao nhất thế giới nằm ở châu Á là?", "Ê-vơ-rét (Everest)", "An-pơ", "Phú Sĩ", "Everest (8848,86 m) thuộc dãy Hi-ma-lay-a."],
        ["Dân số châu Á có đặc điểm gì?", "Đông nhất thế giới", "Ít nhất thế giới", "Bằng châu Đại Dương", "Châu Á chiếm hơn một nửa dân số thế giới."],
        ["Khí hậu châu Á có đặc điểm nổi bật nào?", "Đa dạng, đủ các đới, có khí hậu gió mùa điển hình", "Chỉ có một kiểu khí hậu", "Chỉ lạnh quanh năm", "Lãnh thổ rộng lớn nên khí hậu châu Á rất đa dạng."],
        ["Hai quốc gia đông dân hàng đầu châu Á được học là?", "Trung Quốc và Ấn Độ", "Nhật Bản và Hàn Quốc", "Việt Nam và Thái Lan", "Trung Quốc, Ấn Độ là hai nước đông dân nhất."],
        ["Châu Á được chia thành mấy khu vực địa lí chính thường dùng?", "Bắc Á, Trung Á, Tây Á, Nam Á, Đông Á, Đông Nam Á", "Chỉ Đông và Tây", "Không chia khu vực", "Sách chia châu Á thành 6 khu vực."],
        ["Châu Á tiếp giáp với những đại dương nào?", "Thái Bình Dương, Ấn Độ Dương và Bắc Băng Dương", "Chỉ Thái Bình Dương", "Chỉ Đại Tây Dương", "Châu Á tiếp giáp ba đại dương lớn."],
        ["Sông nào dài nhất châu Á?", "Sông Trường Giang", "Sông Hoàng Hà", "Sông Mê Công", "Sông Trường Giang ở Trung Quốc dài nhất châu Á."],
        ["Cao nguyên nào được gọi là nóc nhà của thế giới?", "Cao nguyên Tây Tạng", "Cao nguyên I-ran", "Cao nguyên Đê-can", "Cao nguyên Tây Tạng cao nhất thế giới."],
        ["Hoang mạc Gô-bi nằm ở khu vực nào của châu Á?", "Trung Á", "Nam Á", "Đông Nam Á", "Hoang mạc Gô-bi thuộc vùng Trung Á khô hạn."],
        ["Đồng bằng Ấn – Hằng nằm ở khu vực nào?", "Nam Á", "Đông Á", "Tây Á", "Đồng bằng Ấn – Hằng thuộc Nam Á, rất màu mỡ."],
        ["Các tôn giáo lớn như Phật giáo và Ấn Độ giáo ra đời ở khu vực nào?", "Châu Á", "Châu Âu", "Châu Phi", "Nhiều tôn giáo lớn ra đời ở châu Á."],
        ["Châu Á có đặc điểm dân cư nào nổi bật về chủng tộc?", "Đa dạng các chủng tộc", "Chỉ một chủng tộc duy nhất", "Không có người bản địa", "Dân cư châu Á thuộc nhiều chủng tộc khác nhau."],
        ["Khu vực nào của châu Á có mật độ dân số cao nhất?", "Đông Á và Nam Á", "Bắc Á", "Trung Á", "Đông Á và Nam Á tập trung đông dân nhất."],
        ["Việt Nam thuộc khu vực nào của châu Á?", "Đông Nam Á", "Nam Á", "Tây Á", "Việt Nam thuộc khu vực Đông Nam Á."],
        ["Nhật Bản thuộc khu vực nào của châu Á?", "Đông Á", "Đông Nam Á", "Trung Á", "Nhật Bản là quốc đảo ở Đông Á."],
        ["Nền kinh tế lớn ở châu Á nổi bật với công nghệ cao và công nghiệp phát triển là nước nào?", "Nhật Bản", "Mông Cổ", "Lào", "Nhật Bản là nền kinh tế lớn, công nghệ cao ở châu Á."],
        ["Xin-ga-po được biết đến là một nền kinh tế có đặc điểm nào?", "Kinh tế mới nổi, dịch vụ và cảng biển phát triển", "Chỉ dựa vào nông nghiệp", "Không có cảng biển", "Xin-ga-po phát triển mạnh về dịch vụ và cảng biển."],
        ["Bán đảo A-rap thuộc khu vực nào của châu Á?", "Tây Á", "Đông Á", "Bắc Á", "Bán đảo A-rap thuộc Tây Á, giàu dầu mỏ."],
        ["Dãy Hi-ma-lay-a nằm ở phần nào của châu Á?", "Phía nam châu lục", "Cực bắc châu lục", "Phía đông nam ven biển", "Dãy Hi-ma-lay-a ở phía nam châu Á."],
        ["Khí hậu gió mùa châu Á gây ra đặc điểm thời tiết nào?", "Mùa hạ nóng ẩm, mưa nhiều; mùa đông khô lạnh", "Khô hạn quanh năm", "Mưa đều quanh năm không đổi", "Gió mùa làm mùa hạ mưa nhiều, mùa đông khô lạnh."],
        ["Sông Mê Công chảy qua Việt Nam và đổ ra biển nào?", "Biển Đông", "Biển A-rap", "Biển Đỏ", "Sông Mê Công đổ ra Biển Đông ở Việt Nam."],
        ["Nguồn tài nguyên nổi bật của Tây Á là gì?", "Dầu mỏ và khí tự nhiên", "Than đá là duy nhất", "Không có khoáng sản", "Tây Á có trữ lượng dầu mỏ lớn nhất thế giới."],
        ["Đặc điểm tự nhiên Bắc Á là gì?", "Khí hậu lạnh, rừng lá kim rộng lớn", "Khí hậu nhiệt đới nóng ẩm", "Hoang mạc chiếm toàn bộ", "Bắc Á lạnh giá với rừng tai-ga lá kim rộng."],
        ["Ấn Độ thuộc khu vực nào của châu Á?", "Nam Á", "Đông Á", "Trung Á", "Ấn Độ là nước lớn ở Nam Á."],
        ["Sự phân hoá khí hậu châu Á theo chiều bắc – nam thể hiện điều gì?", "Từ lạnh ở bắc đến nóng ở nam", "Chỉ có một kiểu khí hậu", "Từ nóng ở bắc đến lạnh ở nam", "Đi từ bắc xuống nam, khí hậu châu Á ấm dần."]
      ], [["Everest","Đỉnh cao nhất thế giới"],["Châu Á","Lớn và đông dân nhất"],["Gió mùa","Khí hậu điển hình"],["Đông Nam Á","Khu vực của Việt Nam"],
        ["Sông Trường Giang", "sông dài nhất châu Á"],
        ["Cao nguyên Tây Tạng", "nóc nhà của thế giới"],
        ["Tây Á", "khu vực giàu dầu mỏ"]], "Nối cho đúng nhé!"),
      topic("dl-chauphi","🌍","Địa lí: Châu Phi","Chương Địa 3",[
        ["Hoang mạc lớn nhất thế giới nằm ở châu Phi là?", "Xa-ha-ra (Sahara)", "Gô-bi", "A-ta-ca-ma", "Sahara ở Bắc Phi là hoang mạc nóng lớn nhất thế giới."],
        ["Sông dài nhất thế giới chảy qua châu Phi là?", "Sông Nin", "Sông A-ma-dôn", "Sông Mê Công", "Sông Nin dài khoảng 6650 km."],
        ["Châu Phi nằm chủ yếu ở đới khí hậu nào?", "Nhiệt đới (nóng)", "Hàn đới", "Ôn đới lạnh", "Xích đạo cắt ngang giữa châu Phi nên phần lớn nằm trong đới nóng."],
        ["Dân cư châu Phi có tốc độ gia tăng tự nhiên thế nào?", "Cao so với thế giới", "Âm (giảm mạnh)", "Bằng 0", "Châu Phi có tỉ suất gia tăng tự nhiên cao."],
        ["Cộng hoà Nam Phi nằm ở phần nào của châu lục?", "Cực Nam châu Phi", "Bắc Phi", "Trung Phi xích đạo", "Nam Phi ở phía nam nhất của châu lục."],
        ["Con người châu Phi khai thác thiên nhiên cần chú ý vấn đề gì lớn?", "Chống hoang mạc hoá, bảo vệ rừng và nguồn nước", "Không cần bảo vệ gì", "Phá hết rừng", "Hoang mạc hoá là vấn đề môi trường lớn ở châu Phi."],
        ["Châu Phi đứng thứ mấy về diện tích trong các châu lục?", "Thứ hai, sau châu Á", "Thứ nhất", "Thứ năm", "Châu Phi rộng thứ hai thế giới, sau châu Á."],
        ["Đường nào chạy ngang qua giữa châu Phi, chia châu lục thành hai phần gần bằng nhau?", "Đường Xích đạo", "Chí tuyến Nam", "Vòng cực Bắc", "Xích đạo đi qua khoảng giữa châu Phi."],
        ["Sông Công-gô có đặc điểm nổi bật nào?", "Lưu lượng nước lớn, chảy ở vùng xích đạo", "Khô cạn quanh năm", "Ngắn nhất châu Phi", "Sông Công-gô có lưu lượng nước rất lớn."],
        ["Hồ nào lớn nhất châu Phi?", "Hồ Vích-to-ri-a", "Hồ Sát", "Hồ Tan-ga-ni-ca về diện tích nhỏ hơn", "Hồ Vích-to-ri-a là hồ lớn nhất châu Phi."],
        ["Đảo nào lớn nhất châu Phi, nằm ở phía đông nam châu lục?", "Đảo Ma-đa-ga-xca", "Đảo Canary", "Đảo Seychelles", "Ma-đa-ga-xca là đảo lớn nhất châu Phi."],
        ["Hoang mạc Ca-la-ha-ri nằm ở khu vực nào của châu Phi?", "Phía nam châu lục", "Phía bắc châu lục", "Ven biển phía tây bắc", "Hoang mạc Ca-la-ha-ri ở phía nam châu Phi."],
        ["Châu Phi giàu tài nguyên nào phục vụ công nghiệp thế giới?", "Khoáng sản như kim cương, vàng, dầu mỏ", "Chỉ có gỗ rừng", "Không có khoáng sản", "Châu Phi giàu khoáng sản quý và dầu mỏ."],
        ["Vấn đề xã hội lớn mà nhiều nước châu Phi đang đối mặt là gì?", "Đói nghèo và bệnh tật", "Dân số quá già", "Thừa lao động trình độ cao", "Nhiều nước châu Phi còn đói nghèo và bệnh tật."],
        ["Tốc độ đô thị hoá ở châu Phi có đặc điểm nào?", "Nhanh nhưng còn nhiều khó khăn", "Rất chậm và ổn định", "Không có đô thị lớn", "Đô thị hoá nhanh gây áp lực việc làm và nhà ở."],
        ["Xung đột và bất ổn ở một số nơi châu Phi gây hậu quả gì?", "Cản trở phát triển kinh tế – xã hội", "Làm kinh tế tăng nhanh", "Không ảnh hưởng đời sống", "Xung đột cản trở phát triển ở châu Phi."],
        ["Trong khai thác thiên nhiên, vùng hoang mạc châu Phi cần chú trọng điều gì?", "Sử dụng hợp lí nước và chống sa mạc hoá", "Mở rộng phá rừng", "Khai thác cạn kiệt nước ngầm", "Vùng hoang mạc cần tiết kiệm nước và chống sa mạc hoá."],
        ["Rừng châu Phi bị suy giảm chủ yếu do nguyên nhân nào?", "Khai thác gỗ và mở rộng đất sản xuất quá mức", "Do tuyết rơi dày", "Do núi lửa phun trào", "Phá rừng lấy gỗ và đất làm rừng suy giảm."],
        ["Cộng hoà Nam Phi nằm ở vị trí nào của châu Phi?", "Cực nam châu Phi", "Cực bắc châu Phi", "Trung tâm châu Phi", "Cộng hoà Nam Phi ở cực nam châu lục."],
        ["Thủ đô hành chính của Cộng hoà Nam Phi là thành phố nào?", "Prê-tô-ri-a", "Cai-rô", "Na-i-rô-bi", "Prê-tô-ri-a là thủ đô hành chính của Nam Phi."],
        ["Nam Phi nổi tiếng thế giới về khai thác khoáng sản nào?", "Kim cương và vàng", "Chỉ khai thác muối", "Không khai thác khoáng sản", "Nam Phi nổi tiếng về kim cương và vàng."],
        ["Đặc điểm kinh tế của Cộng hoà Nam Phi là gì?", "Phát triển nhất châu Phi", "Kém phát triển nhất châu Phi", "Chỉ có nông nghiệp tự túc", "Nam Phi có nền kinh tế phát triển nhất châu Phi."],
        ["Dân cư châu Phi phân bố không đều, tập trung đông ở đâu?", "Ven biển và các thung lũng sông lớn", "Giữa hoang mạc Xa-ha-ra", "Vùng cực nam lạnh giá", "Dân cư tập trung ven biển và thung lũng sông."],
        ["Khí hậu châu Phi khô nóng gây khó khăn gì cho sản xuất nông nghiệp?", "Thiếu nước và hạn hán thường xuyên", "Ngập lụt quanh năm", "Băng tuyết kéo dài", "Hạn hán và thiếu nước gây khó cho nông nghiệp."],
        ["Sơn nguyên Đông Phi có đặc điểm địa hình nào?", "Cao, có nhiều hồ và núi lửa", "Thấp trũng ngập nước", "Toàn là đồng bằng phù sa", "Sơn nguyên Đông Phi cao với nhiều hồ sâu."],
        ["Việc bảo vệ thiên nhiên ở châu Phi gắn với hoạt động nào?", "Thành lập các vườn quốc gia và khu bảo tồn", "Săn bắn động vật hoang dã tự do", "Phá rừng làm nương rẫy", "Vườn quốc gia giúp bảo vệ thiên nhiên châu Phi."]
      ], [["Sahara","Hoang mạc lớn nhất"],["Sông Nin","Sông dài nhất"],["Châu Phi","Chủ yếu đới nóng"],["Nam Phi","Cực Nam châu lục"],
        ["Hồ Vích-to-ri-a", "hồ lớn nhất châu Phi"],
        ["Đảo Ma-đa-ga-xca", "đảo lớn nhất châu Phi"],
        ["Thủ đô hành chính Nam Phi", "thành phố Prê-tô-ri-a"]], "Nối cho đúng nhé!"),
      topic("dl-chaumy","🌎","Địa lí: Châu Mỹ","Chương Địa 4 • Bắc Mỹ, Trung và Nam Mỹ, rừng A-ma-dôn",[
        ["Ai là người châu Âu đầu tiên đến châu Mỹ năm 1492?", "Cô-lôm-bô", "Ma-gien-lan", "Đi-át", "Cô-lôm-bô đến châu Mỹ năm 1492."],
        ["Rừng A-ma-dôn nằm chủ yếu ở khu vực nào?", "Nam Mỹ", "Bắc Mỹ", "Châu Phi", "A-ma-dôn là rừng mưa nhiệt đới lớn nhất thế giới ở Nam Mỹ."],
        ["Dãy núi cao ở phía tây Bắc Mỹ là?", "Cooc-đi-e (Cordillera) / Rốc-ki", "An-pơ", "U-ran", "Hệ thống Cooc-đi-e chạy dọc phía tây châu Mỹ."],
        ["Rừng A-ma-dôn được gọi là gì của Trái Đất?", "“Lá phổi xanh” của Trái Đất", "Kho vàng", "Sa mạc xanh", "A-ma-dôn tạo nhiều oxi, hấp thụ CO₂ nên gọi là lá phổi xanh."],
        ["Bảo vệ rừng A-ma-dôn có ý nghĩa gì?", "Giữ đa dạng sinh học, điều hoà khí hậu toàn cầu", "Không có ý nghĩa toàn cầu", "Chỉ đẹp để ngắm", "Phá rừng A-ma-dôn ảnh hưởng khí hậu toàn cầu."],
        ["Châu Mỹ được chia thành những phần chính nào?", "Bắc Mỹ, Trung Mỹ và Nam Mỹ", "Chỉ Bắc Mỹ", "Đông và Tây Mỹ không tồn tại", "Châu Mỹ gồm Bắc Mỹ, Trung Mỹ (đất hẹp nối) và Nam Mỹ."],
        ["Châu Mỹ có diện tích khoảng bao nhiêu?", "Khoảng 42 triệu km2", "Khoảng 10 triệu km2", "Khoảng 20 triệu km2", "Châu Mỹ rộng khoảng 42 triệu km2."],
        ["Eo đất Pa-na-ma nối liền hai phần nào của châu Mỹ?", "Bắc Mỹ và Nam Mỹ", "Bắc Mỹ và châu Âu", "Nam Mỹ và châu Phi", "Eo Pa-na-ma nối Bắc Mỹ với Nam Mỹ."],
        ["Dãy núi nào cao và dài ở phía tây Nam Mỹ?", "Dãy An-đét", "Dãy A-pa-lát", "Dãy Cooc-đi-e chỉ ở Bắc Mỹ", "Dãy An-đét chạy dọc phía tây Nam Mỹ."],
        ["Đồng bằng nào lớn nhất Nam Mỹ?", "Đồng bằng A-ma-dôn", "Đồng bằng Pam-pa", "Đồng bằng La Pla-ta nhỏ hơn", "Đồng bằng A-ma-dôn lớn nhất Nam Mỹ."],
        ["Sông nào ở Bắc Mỹ dài và quan trọng nhất?", "Sông Mi-xi-xi-pi", "Sông A-ma-dôn", "Sông Pa-ra-na", "Sông Mi-xi-xi-pi là sông lớn ở Bắc Mỹ."],
        ["Hệ thống hồ lớn ở Bắc Mỹ được gọi là gì?", "Ngũ Hồ", "Hồ Bai-can", "Hồ Vích-to-ri-a", "Ngũ Hồ là nhóm năm hồ lớn ở Bắc Mỹ."],
        ["Dãy núi già ở phía đông Bắc Mỹ là dãy nào?", "Dãy A-pa-lát", "Dãy An-đét", "Dãy Cooc-đi-e", "Dãy A-pa-lát là núi già ở phía đông Bắc Mỹ."],
        ["Đồng bằng trung tâm Bắc Mỹ nằm giữa hai hệ thống núi nào?", "Cooc-đi-e và A-pa-lát", "An-đét và A-pa-lát", "U-ran và An-pơ", "Đồng bằng trung tâm nằm giữa Cooc-đi-e và A-pa-lát."],
        ["Dân cư Bắc Mỹ có nguồn gốc chủ yếu từ đâu?", "Người nhập cư từ nhiều châu lục", "Chỉ người bản địa", "Chỉ người châu Phi", "Dân Bắc Mỹ chủ yếu là dân nhập cư."],
        ["Phương thức khai thác tự nhiên bền vững ở Bắc Mỹ thể hiện ở điểm nào?", "Ứng dụng khoa học – kĩ thuật và bảo vệ môi trường", "Khai thác cạn kiệt không tái tạo", "Chỉ khai thác thủ công", "Bắc Mỹ khai thác hiện đại gắn với bảo vệ môi trường."],
        ["Văn hoá Mỹ La-tinh hình thành ở khu vực nào?", "Trung và Nam Mỹ", "Bắc Mỹ", "Chỉ ở Ca-na-đa", "Trung và Nam Mỹ mang văn hoá Mỹ La-tinh."],
        ["Tỉ lệ dân thành thị ở Trung và Nam Mỹ có đặc điểm nào?", "Cao nhưng đô thị hoá tự phát còn nhiều", "Rất thấp", "Không có dân thành thị", "Dân thành thị cao nhưng đô thị hoá tự phát nhiều."],
        ["Rừng A-ma-dôn phân bố chủ yếu ở quốc gia nào?", "Bra-xin", "Mê-hi-cô", "Ca-na-đa", "Phần lớn rừng A-ma-dôn thuộc Bra-xin."],
        ["Nguyên nhân chính làm rừng A-ma-dôn bị suy giảm là gì?", "Phá rừng lấy đất và khai thác gỗ", "Do khí hậu lạnh giá", "Do động đất thường xuyên", "Phá rừng là nguyên nhân chính làm suy giảm A-ma-dôn."],
        ["Biện pháp bảo vệ rừng A-ma-dôn được các nước thực hiện là gì?", "Hạn chế phá rừng và trồng lại rừng", "Mở rộng khai thác gỗ ồ ạt", "Đốt rừng lấy đất ở", "Bảo vệ A-ma-dôn cần hạn chế phá rừng, trồng lại rừng."],
        ["Khí hậu Bắc Mỹ phân hoá đa dạng chủ yếu do yếu tố nào?", "Lãnh thổ rộng lớn và địa hình đa dạng", "Chỉ do biển bao quanh", "Do nằm ở xích đạo", "Lãnh thổ rộng và địa hình làm khí hậu Bắc Mỹ đa dạng."],
        ["Quần đảo Ăng-ti nằm ở khu vực nào của châu Mỹ?", "Trung Mỹ, giữa các biển Ca-ri-bê", "Bắc Mỹ cực bắc", "Nam Mỹ cực nam", "Quần đảo Ăng-ti thuộc Trung Mỹ, vùng Ca-ri-bê."],
        ["Sông A-ma-dôn có đặc điểm nổi bật nào?", "Lưu lượng nước lớn nhất thế giới", "Khô cạn vào mùa hạ", "Ngắn nhất Nam Mỹ", "Sông A-ma-dôn có lưu lượng nước lớn nhất thế giới."],
        ["Người bản địa ở châu Mỹ trước khi Cô-lôm-bô đến là ai?", "Người Anh-điêng", "Người Viking là duy nhất", "Người châu Âu", "Người Anh-điêng là dân bản địa châu Mỹ."],
        ["Việc phát kiến ra châu Mỹ có ý nghĩa lịch sử nào?", "Mở ra sự giao lưu giữa các châu lục", "Làm châu Mỹ bị cô lập hoàn toàn", "Không ảnh hưởng thế giới", "Phát kiến châu Mỹ mở rộng giao lưu thế giới."]
      ], [["A-ma-dôn","Lá phổi xanh"],["1492","Cô-lôm-bô đến châu Mỹ"],["Cooc-đi-e","Núi phía tây châu Mỹ"],["Nam Mỹ","Nơi có rừng A-ma-dôn"],
        ["Dãy An-đét", "dãy núi phía tây Nam Mỹ"],
        ["Sông Mi-xi-xi-pi", "sông lớn nhất Bắc Mỹ"],
        ["Eo đất Pa-na-ma", "nối Bắc Mỹ và Nam Mỹ"]], "Nối cho đúng nhé!"),
      topic("dl-daiduong","🐧","Địa lí: Châu Đại Dương & Nam Cực","Chương Địa 5",[
        ["Châu Đại Dương gồm lục địa nào và các đảo?", "Lục địa Ô-xtrây-li-a và nhiều đảo ở Thái Bình Dương", "Chỉ có đảo Greenland", "Lục địa Nam Mỹ", "Châu Đại Dương trung tâm là Australia cùng các quần đảo Thái Bình Dương."],
        ["Châu Nam Cực có đặc điểm khí hậu gì?", "Lạnh nhất thế giới, băng tuyết bao phủ", "Nóng ẩm quanh năm", "Ôn hoà như châu Âu", "Nam Cực là châu lạnh nhất, gió mạnh nhất."],
        ["Có dân cư sinh sống thường xuyên ở châu Nam Cực không?", "Không có dân cư thường trú, chỉ có các trạm nghiên cứu", "Rất đông dân", "Có nhiều thành phố lớn", "Nam Cực chỉ có nhà khoa học ở các trạm nghiên cứu luân phiên."],
        ["Australia nổi tiếng với loài vật đặc trưng nào?", "Chuột túi (kangaroo), gấu túi (koala)", "Hổ Bengal", "Gấu Bắc cực", "Kangaroo và koala là biểu tượng động vật Australia."],
        ["Phần lớn lục địa Australia có khí hậu thế nào?", "Khô hạn, hoang mạc và bán hoang mạc rộng", "Mưa nhiều quanh năm khắp nơi", "Băng giá", "Nội địa Australia khô hạn, hoang mạc chiếm diện tích lớn."],
        ["Châu Nam Cực được các nước chung tay bảo vệ bằng hiệp ước với mục đích gì?", "Nghiên cứu khoa học và hoà bình, bảo vệ môi trường", "Khai thác quân sự tự do", "Xây thành phố du lịch ồ ạt", "Hiệp ước Nam Cực dành châu lục cho hoà bình và khoa học."],
        ["Ô-xtrây-li-a có thủ đô là thành phố nào?", "Can-be-ra", "Xít-ni", "Men-bơn", "Thủ đô Ô-xtrây-li-a là Can-be-ra."],
        ["Thành phố lớn nhất Ô-xtrây-li-a là thành phố nào?", "Xít-ni", "Can-be-ra", "Pớc", "Xít-ni là thành phố lớn nhất Ô-xtrây-li-a."],
        ["Phần lớn lãnh thổ Ô-xtrây-li-a có khí hậu như thế nào?", "Khô hạn, hoang mạc và bán hoang mạc", "Ẩm ướt quanh năm", "Lạnh giá quanh năm", "Nội địa Ô-xtrây-li-a khô hạn với nhiều hoang mạc."],
        ["Dãy núi nào chạy dọc phía đông Ô-xtrây-li-a?", "Dãy Trường Sơn của Ô-xtrây-li-a ở phía đông", "Dãy An-đét", "Dãy Hi-ma-lay-a", "Phía đông Ô-xtrây-li-a có dãy núi cao chạy dọc biển."],
        ["Rạn san hô lớn nhất thế giới nằm ở ven biển Ô-xtrây-li-a được gọi là gì?", "Rạn san hô Lớn", "Rạn san hô Đỏ", "Rạn san hô Ca-ri-bê", "Rạn san hô Lớn ở đông bắc Ô-xtrây-li-a lớn nhất thế giới."],
        ["Hệ thống sông lớn nhất Ô-xtrây-li-a là hệ thống sông nào?", "Sông Mu-rây – Đác-linh", "Sông A-ma-dôn", "Sông Nin", "Mu-rây – Đác-linh là hệ thống sông lớn nhất Ô-xtrây-li-a."],
        ["Dân cư Ô-xtrây-li-a tập trung chủ yếu ở đâu?", "Ven biển phía đông và đông nam", "Giữa hoang mạc trung tâm", "Phía bắc lạnh giá", "Dân cư tập trung ven biển đông và đông nam."],
        ["Mật độ dân số của Ô-xtrây-li-a thuộc loại nào?", "Rất thưa", "Rất đông đúc", "Đông nhất thế giới", "Ô-xtrây-li-a có mật độ dân số rất thưa."],
        ["Tỉ lệ dân thành thị của Ô-xtrây-li-a như thế nào?", "Rất cao", "Rất thấp", "Không có đô thị", "Phần lớn dân Ô-xtrây-li-a sống ở thành thị."],
        ["Các đảo ở Thái Bình Dương được chia thành mấy nhóm chính?", "Ba nhóm chính", "Một nhóm duy nhất", "Năm nhóm chính", "Các đảo Thái Bình Dương chia thành ba nhóm chính."],
        ["Niu Di-lân gồm hai đảo lớn chính được gọi là gì?", "Đảo Bắc và Đảo Nam", "Đảo Đông và Đảo Tây", "Đảo Lớn và Đảo Nhỏ", "Niu Di-lân gồm Đảo Bắc và Đảo Nam."],
        ["Pa-pua Niu Ghi-nê nằm ở phía nào của Ô-xtrây-li-a?", "Phía bắc Ô-xtrây-li-a", "Phía nam Ô-xtrây-li-a", "Phía tây Ô-xtrây-li-a", "Pa-pua Niu Ghi-nê ở phía bắc Ô-xtrây-li-a."],
        ["Châu Nam Cực có diện tích khoảng bao nhiêu?", "Khoảng 14 triệu km2", "Khoảng 5 triệu km2", "Khoảng 30 triệu km2", "Châu Nam Cực rộng khoảng 14 triệu km2."],
        ["Đặc điểm khí hậu nổi bật của châu Nam Cực là gì?", "Lạnh nhất, gió mạnh nhất thế giới", "Nóng nhất thế giới", "Mưa nhiều nhất thế giới", "Nam Cực là châu lục lạnh và gió mạnh nhất."],
        ["Lớp băng ở châu Nam Cực chứa phần lớn lượng nước ngọt ở dạng nào của Trái Đất?", "Nước ngọt đóng băng", "Nước biển mặn", "Nước ngầm duy nhất", "Băng Nam Cực giữ phần lớn nước ngọt đóng băng."],
        ["Động vật điển hình sống ở ven biển châu Nam Cực là con gì?", "Chim cánh cụt", "Gấu trắng", "Hươu cao cổ", "Chim cánh cụt sống nhiều ở ven biển Nam Cực."],
        ["Hoạt động chính của con người ở châu Nam Cực là gì?", "Nghiên cứu khoa học tại các trạm", "Khai thác mỏ quy mô lớn", "Xây thành phố thường trú", "Con người đến Nam Cực chủ yếu để nghiên cứu khoa học."],
        ["Ô-xtrây-li-a nổi tiếng với ngành khai thác nào?", "Khai thác khoáng sản như sắt và than", "Chỉ trồng lúa nước", "Không có công nghiệp", "Ô-xtrây-li-a giàu khoáng sản, nhất là sắt và than."],
        ["Nguyên nhân dân cư thưa ở nội địa Ô-xtrây-li-a là gì?", "Khí hậu khô hạn, hoang mạc rộng", "Băng giá quanh năm", "Núi lửa hoạt động liên tục", "Nội địa khô hạn nên dân cư rất thưa."],
        ["Châu Đại Dương gồm những bộ phận chính nào?", "Lục địa Ô-xtrây-li-a và các đảo Thái Bình Dương", "Chỉ lục địa Ô-xtrây-li-a", "Chỉ các đảo nhỏ", "Châu Đại Dương gồm Ô-xtrây-li-a và các đảo."]
      ], [["Australia","Lục địa châu Đại Dương"],["Nam Cực","Lạnh nhất thế giới"],["Kangaroo","Động vật Australia"],["Con người ở Nam Cực","Chỉ có nhà khoa học ở trạm nghiên cứu"],
        ["Thủ đô Ô-xtrây-li-a", "thành phố Can-be-ra"],
        ["Rạn san hô Lớn", "rạn san hô lớn nhất thế giới"],
        ["Chim cánh cụt", "động vật điển hình ở Nam Cực"]], "Nối cho đúng nhé!")
    ];
    /* ================= GDCD 7 ================= */
    var GDCD7_TOPICS = [
      topic("gd1","🏡","Bài 1: Tự hào truyền thống quê hương","Truyền thống quê hương",[
        ["Hành động nào thể hiện tự hào về truyền thống quê hương?", "Tham gia giữ gìn lễ hội, di tích của quê hương", "Chê bai phong tục quê mình", "Phá hoại di tích", "Tự hào đi đôi với giữ gìn và phát huy truyền thống tốt đẹp."],
        ["Truyền thống quê hương là gì?", "Những giá trị tốt đẹp được truyền từ đời này sang đời khác ở quê hương", "Bất kì thói quen xấu nào", "Chỉ là món ăn", "Truyền thống gồm phong tục, nghề, lễ hội, đức tính tốt đẹp của quê hương."],
        ["Em ở xa quê, cách nào giữ gìn truyền thống quê hương?", "Học hỏi, kể cho bạn bè về quê, về thăm và tham gia việc quê khi có dịp", "Quên hẳn quê hương", "Giấu gốc gác", "Giữ truyền thống bằng hiểu biết và hành động cụ thể."],
        ["Việc nào KHÔNG nên làm với truyền thống quê hương?", "Bài trừ mê tín dị đoan nhưng giữ nét đẹp văn hoá là đúng; phá bỏ tất cả không phân biệt là sai", "Giữ gìn lễ hội lành mạnh", "Học nghề truyền thống", "Cần giữ nét đẹp, loại bỏ hủ tục — không phá bỏ tất cả."],
        ["Nghề làm gốm được truyền qua nhiều đời ở quê em thuộc loại truyền thống nào?", "Nghề truyền thống của quê hương", "Nghề mới xuất hiện gần đây", "Nghề chỉ làm theo thời vụ", "Nghề truyền thống là nghề được cha ông truyền lại qua nhiều thế hệ."],
        ["Học sinh chủ động tìm hiểu lịch sử quê hương thể hiện điều gì?", "Lòng tự hào về quê hương", "Muốn được thầy cô khen", "Thích sưu tầm tranh ảnh", "Tìm hiểu lịch sử quê hương giúp hiểu và tự hào về cội nguồn."],
        ["Khi tham gia lễ hội quê hương, em nên ứng xử thế nào?", "Giữ vệ sinh và ứng xử văn minh", "Chen lấn để đứng gần nhất", "Vứt rác ngay tại sân đình", "Ứng xử văn minh góp phần giữ nét đẹp của lễ hội truyền thống."],
        ["Món ăn đặc sản lâu đời của quê hương thuộc truyền thống nào?", "Truyền thống ẩm thực quê hương", "Truyền thống hiếu học", "Truyền thống yêu nước", "Món ăn đặc sản lâu đời là một phần của truyền thống ẩm thực."],
        ["Việc học hát dân ca của quê hương có ý nghĩa gì?", "Gìn giữ nét văn hóa truyền thống", "Chỉ để biểu diễn lấy giải", "Chỉ để giải trí cuối tuần", "Học dân ca giúp lưu giữ và lan tỏa văn hóa quê hương."],
        ["Thấy bạn chê bai phong tục của quê mình, em nên làm gì?", "Giải thích để bạn hiểu và tôn trọng", "Hùa theo bạn để khỏi mất lòng", "Im lặng và tránh xa quê hương", "Giải thích nhẹ nhàng giúp bạn hiểu giá trị của phong tục quê hương."],
        ["Hành vi nào thể hiện chưa biết tự hào về quê hương?", "Xấu hổ, che giấu quê hương mình", "Kể về quê hương với bạn bè", "Tham gia dọn dẹp di tích quê", "Che giấu quê hương cho thấy chưa trân trọng cội nguồn của mình."],
        ["Truyền thống hiếu học của quê hương được thể hiện qua việc nào?", "Nhiều người đỗ đạt, ham học hỏi", "Nhiều người bỏ học đi làm sớm", "Ít trường lớp được xây dựng", "Hiếu học thể hiện qua tinh thần ham học và thành tích học tập."],
        ["Em ở thành phố, muốn giới thiệu quê hương với bạn, em nên làm gì?", "Kể về đặc sản và lễ hội quê hương", "Nói quê mình không có gì hay", "Giấu kín chuyện về quê hương", "Giới thiệu đặc sản và lễ hội là cách lan tỏa niềm tự hào quê hương."],
        ["Việc giữ gìn tiếng nói và trang phục truyền thống có tác dụng gì?", "Bảo vệ bản sắc văn hóa quê hương", "Làm cho quê hương lạc hậu hơn", "Chỉ tốn thời gian của mọi người", "Tiếng nói và trang phục truyền thống góp phần tạo nên bản sắc riêng."],
        ["Khi di tích quê hương bị xuống cấp, học sinh nên làm gì?", "Báo cho người lớn và cơ quan quản lí", "Tự ý sửa chữa di tích theo ý mình", "Mặc kệ vì không phải việc của mình", "Báo cho người có trách nhiệm là cách bảo vệ di tích đúng đắn."],
        ["Phong tục thờ cúng tổ tiên thể hiện truyền thống nào?", "Uống nước nhớ nguồn", "Tôn sư trọng đạo", "Lá lành đùm lá rách", "Thờ cúng tổ tiên nhắc nhớ công ơn của những người đi trước."],
        ["Hành động nào góp phần quảng bá truyền thống quê hương?", "Chia sẻ hình ảnh đẹp về quê hương", "Chê bai quê hương trên mạng", "Nói sai sự thật về quê hương", "Chia sẻ điều tốt đẹp giúp nhiều người biết đến quê hương hơn."],
        ["Làng nghề truyền thống gặp khó khăn, thanh niên quê hương nên làm gì?", "Học nghề và đổi mới cách làm", "Bỏ nghề ngay không cần suy nghĩ", "Cấm mọi người làm nghề truyền thống", "Học nghề kết hợp đổi mới giúp làng nghề tiếp tục phát triển."],
        ["Truyền thống yêu nước của quê hương thường gắn với điều gì?", "Những tấm gương chống giặc cứu nước", "Những câu chuyện giải trí vui nhộn", "Những món ăn ngon của địa phương", "Truyền thống yêu nước gắn với các anh hùng và sự kiện giữ nước."],
        ["Em nên làm gì khi được giao viết bài về quê hương?", "Tìm hiểu kĩ và viết bằng niềm tự hào", "Chép bài của bạn cho nhanh xong", "Viết qua loa cho đủ số chữ", "Tìm hiểu kĩ giúp bài viết chân thực và thể hiện tình yêu quê hương."],
        ["Việc tham gia đội văn nghệ dân gian ở trường có ý nghĩa gì?", "Tiếp nối truyền thống văn hóa quê", "Chỉ để được nghỉ học đi diễn", "Chỉ để chụp ảnh đăng mạng xã hội", "Văn nghệ dân gian giúp thế hệ trẻ tiếp nối văn hóa truyền thống."],
        ["Câu tục ngữ “Quê cha đất tổ” nhắc nhở điều gì?", "Luôn nhớ về cội nguồn quê hương", "Chỉ nên sống ở nơi mình sinh ra", "Không cần quan tâm đến quê hương", "Câu tục ngữ nhắc mỗi người luôn hướng về nơi chôn nhau cắt rốn."],
        ["Khi quê hương tổ chức quyên góp tu sửa đình làng, gia đình em nên làm gì?", "Đóng góp tùy theo khả năng của mình", "Từ chối vì đó là việc của người khác", "Bàn tán chê bai việc tu sửa đình", "Đóng góp tùy khả năng thể hiện trách nhiệm với quê hương."],
        ["Biểu hiện nào là tự hào đúng cách về quê hương?", "Học giỏi để xây dựng quê hương", "Khinh thường quê hương của bạn khác", "Cho rằng quê mình hơn hẳn mọi nơi", "Tự hào đúng cách là nỗ lực học tập để góp phần xây dựng quê nhà."],
        ["Sách và tư liệu về quê hương giúp em điều gì?", "Hiểu rõ hơn truyền thống quê hương", "Không giúp ích gì cho việc học", "Chỉ dùng để trang trí tủ sách", "Tư liệu giúp em có kiến thức chính xác về truyền thống quê hương."],
        ["Ngày giỗ tổ của làng được tổ chức hằng năm nhằm mục đích gì?", "Tưởng nhớ công lao của tổ tiên", "Chỉ để mọi người ăn uống vui chơi", "Chỉ để người lớn gặp gỡ nói chuyện", "Giỗ tổ là dịp tưởng nhớ và biết ơn những người có công với làng."]
      ], [["Lễ hội quê","Truyền thống"],["Nghề truyền thống","Giá trị quê hương"],["Giữ di tích","Tự hào quê hương"],["Hủ tục","Cần loại bỏ"],
        ["Hát quan họ", "Dân ca truyền thống Bắc Ninh"],
        ["Làng gốm Bát Tràng", "Nghề truyền thống Hà Nội"]], "Nối cho đúng nhé!"),
      topic("gd2","🤝","Bài 2: Quan tâm, cảm thông, chia sẻ","Quan tâm, chia sẻ với người khác",[
        ["Bạn cùng lớp có chuyện buồn trong gia đình, em nên làm gì?", "Quan tâm hỏi han, động viên và giúp đỡ trong khả năng", "Trêu chọc nỗi buồn của bạn", "Mặc kệ hoàn toàn", "Cảm thông, chia sẻ giúp bạn vượt qua khó khăn."],
        ["Cảm thông là gì?", "Đặt mình vào vị trí người khác để hiểu cảm xúc của họ", "Thương hại từ trên cao", "Bắt chước cảm xúc", "Cảm thông là hiểu và chia sẻ cảm xúc với người khác."],
        ["Hành động nào thể hiện sự chia sẻ?", "Quyên góp sách vở giúp bạn vùng lũ", "Giữ khư khư đồ của mình không giúp ai bao giờ là chưa chia sẻ", "Chỉ nói miệng không làm", "Chia sẻ thể hiện bằng hành động thiết thực."],
        ["Khi người khác thành công, thái độ đúng là?", "Chúc mừng và học hỏi", "Ghen tị, nói xấu", "Phá hoại thành quả của bạn", "Vui với niềm vui của người khác là biểu hiện đẹp."],
        ["Thấy bạn bị ốm phải nghỉ học nhiều ngày, em nên làm gì?", "Thăm hỏi và chép bài giúp bạn", "Mặc kệ vì bạn nghỉ là việc của bạn", "Tránh xa bạn để khỏi bị lây bệnh", "Thăm hỏi và giúp chép bài thể hiện sự quan tâm chân thành."],
        ["Khi bạn kể chuyện buồn, thái độ lắng nghe nào là đúng?", "Lắng nghe chăm chú và không ngắt lời", "Vừa nghe vừa bấm điện thoại chơi", "Cười đùa cho bạn quên đi nỗi buồn", "Lắng nghe chăm chú cho thấy em tôn trọng và cảm thông với bạn."],
        ["Quan tâm, cảm thông cần thể hiện bằng điều gì?", "Hành động giúp đỡ cụ thể, kịp thời", "Chỉ nói lời thương hại suông", "Chỉ nghĩ trong lòng là đủ rồi", "Cảm thông cần đi cùng hành động giúp đỡ thiết thực."],
        ["Bạn cùng lớp có hoàn cảnh khó khăn, em có thể chia sẻ bằng cách nào?", "Tặng bạn đồ dùng học tập còn tốt", "Cho bạn tiền rồi khoe với cả lớp", "Trêu chọc bạn vì nhà nghèo hơn mình", "Tặng đồ dùng còn tốt là chia sẻ thiết thực và tế nhị."],
        ["Thấy người già xách đồ nặng qua đường, em nên làm gì?", "Xin phép giúp cụ xách đồ qua đường", "Đứng nhìn vì sợ trễ giờ học thêm", "Đi nhanh qua như không nhìn thấy", "Giúp người già qua đường là biểu hiện quan tâm tới người khác."],
        ["Khi bạn đạt điểm thấp và tự ti, em nên nói gì?", "Động viên bạn cố gắng lần sau", "Chê bạn học kém trước cả lớp", "So sánh bạn với bạn học giỏi nhất", "Lời động viên giúp bạn bớt tự ti và có thêm động lực."],
        ["Chia sẻ niềm vui với người khác mang lại điều gì?", "Niềm vui được nhân lên nhiều lần", "Làm niềm vui của mình giảm đi", "Không mang lại điều gì đáng kể", "Chia sẻ niềm vui giúp gắn kết tình cảm giữa mọi người."],
        ["Hành vi nào thể hiện thiếu cảm thông với bạn bè?", "Cười nhạo khi bạn gặp thất bại", "An ủi khi bạn bị điểm kém", "Giúp bạn ôn bài trước kì kiểm tra", "Cười nhạo thất bại của bạn là thiếu cảm thông và gây tổn thương."],
        ["Em biết bạn bị bệnh lâu ngày ở nhà một mình, em nên làm gì?", "Đến thăm và trò chuyện cùng bạn", "Không liên lạc để bạn tự nghỉ ngơi", "Rủ cả lớp đến ồn ào làm phiền bạn", "Thăm hỏi và trò chuyện giúp bạn bớt cô đơn khi ốm."],
        ["Quan tâm đến người khác cần bắt đầu từ đâu?", "Từ những việc nhỏ trong cuộc sống", "Từ những việc thật lớn lao, hoành tráng", "Chỉ khi được người khác nhờ vả", "Sự quan tâm bắt đầu từ những việc nhỏ, gần gũi hằng ngày."],
        ["Khi em gái bị ngã đau và khóc, em nên làm gì trước tiên?", "Đỡ em dậy và hỏi xem em có sao không", "Mắng em vì tội chạy nhảy không cẩn thận", "Bỏ đi chơi tiếp với bạn của mình", "Đỡ em dậy và hỏi han thể hiện tình yêu thương trong gia đình."],
        ["Lớp quyên góp ủng hộ vùng bị bão lũ, em nên tham gia thế nào?", "Góp phần nhỏ tùy khả năng của mình", "Không góp vì nhà mình ở xa vùng lũ", "Góp thật nhiều để được nêu tên khen", "Quyên góp tùy khả năng là chia sẻ thiết thực với đồng bào gặp nạn."],
        ["Thấy bạn mới chuyển trường còn rụt rè, em nên làm gì?", "Chủ động làm quen và rủ bạn cùng chơi", "Lập nhóm riêng không cho bạn tham gia", "Đặt biệt danh trêu chọc bạn mới", "Chủ động làm quen giúp bạn mới hòa nhập nhanh với lớp."],
        ["Cảm thông khác với thương hại ở điểm nào?", "Cảm thông là đặt mình vào vị trí người khác", "Thương hại luôn tốt hơn cảm thông nhiều", "Cảm thông chỉ dành cho người thân quen", "Cảm thông là hiểu và chia sẻ từ vị trí của người được giúp."],
        ["Khi bạn vô tình làm hỏng đồ của em, thái độ cảm thông là gì?", "Bình tĩnh hỏi rõ và tha thứ cho bạn", "La hét và bắt bạn đền ngay lập tức", "Kể xấu bạn với tất cả mọi người", "Bình tĩnh và tha thứ thể hiện sự cảm thông, rộng lượng."],
        ["Việc nhường ghế cho phụ nữ mang thai trên xe buýt thể hiện điều gì?", "Sự quan tâm, chia sẻ với người khác", "Muốn được mọi người khen ngợi mình", "Sợ bị người khác nhắc nhở phê bình", "Nhường ghế là hành động quan tâm nhỏ nhưng đầy ý nghĩa."],
        ["Bạn thân đạt giải cao trong kì thi, em cảm thấy thế nào là đúng?", "Vui mừng thật lòng cùng với bạn", "Ghen tị và xa lánh bạn từ đó", "Cho rằng bạn chỉ gặp may mà thôi", "Vui cùng niềm vui của bạn là biểu hiện của tình bạn đẹp."],
        ["Để hiểu được cảm xúc của người khác, em cần làm gì?", "Quan sát và đặt mình vào hoàn cảnh họ", "Chỉ quan tâm đến cảm xúc của mình", "Đoán mò theo suy nghĩ chủ quan", "Đặt mình vào hoàn cảnh người khác giúp em cảm thông sâu sắc hơn."],
        ["Hành động nào là chia sẻ về mặt tinh thần?", "Trò chuyện, an ủi khi bạn buồn", "Cho bạn mượn tiền tiêu vặt", "Tặng bạn một món đồ chơi mới", "An ủi, trò chuyện là sự chia sẻ về tinh thần rất cần thiết."],
        ["Khi hàng xóm có tang sự buồn, gia đình em nên làm gì?", "Đến chia buồn và giúp đỡ việc cần thiết", "Mở nhạc thật to cho vui nhà vui cửa", "Tránh mặt vì sợ gặp điều không may", "Chia buồn và giúp đỡ thể hiện tình làng nghĩa xóm."],
        ["Em làm được việc tốt giúp bạn, bạn cảm ơn, em nên nói gì?", "Không có gì, bạn bè phải giúp nhau", "Lần sau bạn phải trả ơn cho mình", "Kể công để bạn nhớ mãi việc này", "Giúp đỡ vô tư, không kể công mới là chia sẻ chân thành."],
        ["Nhân vật chỉ quan tâm đến bản thân, không để ý ai gặp khó khăn bị gọi là gì?", "Người ích kỉ, vô cảm với mọi người", "Người sống tự lập và độc lập", "Người biết tiết kiệm thời gian", "Ích kỉ, vô cảm là thái độ trái ngược với quan tâm, cảm thông."]
      ], [["Cảm thông","Hiểu cảm xúc người khác"],["Chia sẻ","Giúp đỡ thiết thực"],["Bạn gặp khó khăn","Quan tâm, động viên"],["Bạn thành công","Chúc mừng"],
        ["Thăm bạn ốm", "Quan tâm sức khỏe bạn bè"],
        ["Lắng nghe bạn tâm sự", "Chia sẻ về tinh thần"]], "Nối cho đúng nhé!"),
      topic("gd3","📖","Bài 3: Học tập tự giác, tích cực","Tự giác, tích cực trong học tập",[
        ["Biểu hiện của học tập tự giác là gì?", "Tự làm bài, tự ôn tập không cần nhắc nhở", "Chỉ học khi bị ép buộc", "Chép bài bạn thường xuyên", "Tự giác là chủ động học không cần ai thúc ép."],
        ["Học tập tích cực khác học vẹt ở điểm nào?", "Chủ động tìm hiểu, đặt câu hỏi, vận dụng kiến thức", "Học thuộc lòng không hiểu", "Chỉ đọc mà không nghĩ", "Học tích cực gắn với hiểu và vận dụng."],
        ["Em gặp bài khó, cách xử lí tích cực là?", "Suy nghĩ, tra cứu, hỏi thầy cô / bạn", "Bỏ qua luôn mãi mãi", "Chép đáp án không hiểu bài", "Không ngại khó, tìm cách giải quyết là tích cực."],
        ["Lập kế hoạch học tập giúp em điều gì?", "Quản lí thời gian, học đều các môn", "Không có tác dụng", "Làm em mệt hơn vô ích", "Kế hoạch giúp học tập có hệ thống."],
        ["Học tập tự giác thể hiện rõ nhất qua việc nào?", "Tự làm bài tập không cần nhắc nhở", "Chỉ học khi cha mẹ ngồi kèm bên cạnh", "Chờ thầy cô nhắc mới mở sách vở ra", "Tự giác là chủ động học tập mà không cần ai nhắc nhở."],
        ["Trước ngày kiểm tra, học sinh tích cực sẽ làm gì?", "Ôn bài theo kế hoạch đã lập trước", "Đến sáng kiểm tra mới học vội vàng", "Không ôn vì tin vào may rủi điểm số", "Ôn bài theo kế hoạch giúp em nắm chắc kiến thức hơn."],
        ["Khi chưa hiểu một phần bài giảng, em nên làm gì?", "Ghi lại và hỏi thầy cô sau giờ học", "Bỏ qua và không bao giờ xem lại nữa", "Giấu dốt vì sợ bạn bè cười chê mình", "Hỏi lại phần chưa hiểu là biểu hiện học tập tích cực."],
        ["Việc tự đặt mục tiêu học tập mỗi học kì giúp em điều gì?", "Có hướng phấn đấu rõ ràng hơn", "Tạo áp lực không cần thiết cho mình", "Chỉ để khoe với bạn bè trong lớp", "Mục tiêu rõ ràng giúp em chủ động và kiên trì học tập."],
        ["Học sinh tích cực thường ghi chép bài như thế nào?", "Ghi ý chính và điều cần nhớ", "Chép nguyên văn mọi lời thầy nói", "Không ghi chép gì trong giờ học", "Ghi ý chính giúp em ôn lại bài nhanh và hiệu quả."],
        ["Sau khi làm xong bài kiểm tra, em nên làm gì để tiến bộ?", "Xem lại lỗi sai và rút kinh nghiệm", "Vứt bài đi không cần xem lại nữa", "Chỉ quan tâm đến điểm số đạt được", "Xem lại lỗi sai giúp em không lặp lại sai sót cũ."],
        ["Thói quen nào giúp học tập tự giác, hiệu quả?", "Học đúng giờ theo thời gian biểu", "Thức khuya học dồn vào một đêm", "Vừa học vừa xem điện thoại liên tục", "Thời gian biểu hợp lí giúp việc học đều đặn, không dồn ép."],
        ["Khi gặp từ mới trong bài đọc, học sinh tích cực sẽ làm gì?", "Tra từ điển và ghi vào sổ tay", "Đoán bừa nghĩa rồi bỏ qua luôn", "Bỏ cả bài đọc vì thấy khó hiểu", "Tra cứu và ghi lại giúp em mở rộng vốn từ của mình."],
        ["Học nhóm hiệu quả khi các thành viên làm gì?", "Cùng thảo luận và giúp nhau hiểu bài", "Chỉ chép bài của bạn học giỏi nhất", "Tụ tập nói chuyện riêng là chính", "Học nhóm hiệu quả khi mọi người cùng trao đổi, giúp đỡ nhau."],
        ["Biểu hiện nào chưa thể hiện học tập tích cực?", "Học thuộc lòng mà không hề hiểu bài", "Đặt câu hỏi khi chưa rõ vấn đề", "Tìm thêm ví dụ ngoài sách giáo khoa", "Học vẹt, không hiểu bài không phải là học tập tích cực."],
        ["Em muốn cải thiện môn học yếu nhất, em nên bắt đầu từ đâu?", "Ôn lại kiến thức cơ bản còn hổng", "Chỉ làm những bài tập thật khó", "Bỏ môn đó và chỉ học môn mình giỏi", "Nắm chắc kiến thức cơ bản là nền tảng để học tốt hơn."],
        ["Việc đọc trước bài mới ở nhà mang lại lợi ích gì?", "Dễ hiểu bài giảng trên lớp hơn", "Khiến giờ học trên lớp nhàm chán", "Không có lợi ích gì cho việc học", "Đọc trước giúp em chủ động tiếp thu bài mới trên lớp."],
        ["Khi được giao bài tập về nhà khó, thái độ đúng là gì?", "Suy nghĩ tự làm trước khi hỏi gợi ý", "Nhờ người khác làm hộ cho xong", "Bỏ trống không làm phần bài khó", "Tự suy nghĩ trước thể hiện tinh thần tự giác, tích cực."],
        ["Học sinh tự giác sẽ sắp xếp góc học tập như thế nào?", "Gọn gàng, đủ ánh sáng, ít xao nhãng", "Bừa bộn với nhiều đồ chơi xung quanh", "Học ở bất cứ đâu có tiếng ồn lớn", "Góc học tập gọn gàng giúp em tập trung học tốt hơn."],
        ["Để nhớ lâu kiến thức đã học, em nên làm gì?", "Ôn lại bài thường xuyên theo đợt", "Chỉ học một lần rồi không xem lại", "Học thật nhiều vào đêm trước thi", "Ôn tập thường xuyên giúp kiến thức được ghi nhớ lâu dài."],
        ["Tham gia câu lạc bộ học thuật ở trường giúp em điều gì?", "Mở rộng kiến thức và kĩ năng học tập", "Chỉ để vui chơi cho hết thời gian", "Làm giảm kết quả học tập trên lớp", "Câu lạc bộ học thuật bổ sung kiến thức ngoài giờ học chính khóa."],
        ["Khi thầy cô giao nhiệm vụ tự nghiên cứu, em nên làm gì?", "Tìm tài liệu và hoàn thành đúng hạn", "Chờ bạn làm xong rồi chép lại bài", "Không làm vì không ai kiểm tra mình", "Chủ động tìm tài liệu thể hiện tinh thần học tập tích cực."],
        ["Việc tự kiểm tra kiến thức bằng câu hỏi tự đặt giúp em gì?", "Biết rõ phần nào mình chưa nắm chắc", "Tốn thời gian mà không có ích lợi", "Chỉ dành cho học sinh giỏi trong lớp", "Tự kiểm tra giúp em phát hiện lỗ hổng kiến thức kịp thời."],
        ["Học tích cực đòi hỏi em phải làm gì trong giờ thảo luận?", "Phát biểu ý kiến và lắng nghe bạn", "Ngồi im không tham gia ý kiến nào", "Nói chuyện riêng với bạn bên cạnh", "Tham gia thảo luận giúp em hiểu sâu và nhớ bài lâu hơn."],
        ["Nếu kết quả học tập chưa tốt, học sinh tự giác sẽ làm gì?", "Tìm nguyên nhân và điều chỉnh cách học", "Đổ lỗi cho thầy cô dạy khó hiểu", "Buông xuôi và không cố gắng nữa", "Tìm nguyên nhân giúp em cải thiện kết quả một cách thực chất."],
        ["Sử dụng thư viện trường để học tập thể hiện điều gì?", "Tinh thần chủ động tìm kiếm tri thức", "Muốn trốn các hoạt động của lớp học", "Chỉ thích nơi yên tĩnh để ngủ trưa", "Chủ động tìm tri thức là dấu hiệu của học tập tích cực."],
        ["Câu nói “Học, học nữa, học mãi” khuyên chúng ta điều gì?", "Học tập suốt đời, không ngừng nghỉ", "Chỉ cần học hết cấp học là đủ rồi", "Học càng nhiều càng dễ bị mệt mỏi", "Câu nói khuyên mỗi người kiên trì học tập lâu dài."]
      ], [["Tự giác","Không cần nhắc nhở"],["Tích cực","Chủ động tìm hiểu"],["Bài khó","Hỏi và suy nghĩ"],["Kế hoạch học tập","Quản lí thời gian"],
        ["Lập thời gian biểu", "Học tập có kế hoạch"],
        ["Tự ôn bài ở nhà", "Học tập tự giác"]], "Nối cho đúng nhé!"),
      topic("gd4","🤞","Bài 4: Giữ chữ tín","Giữ lời hứa, chữ tín",[
        ["Giữ chữ tín là gì?", "Coi trọng lời hứa và lòng tin của người khác dành cho mình", "Hứa cho vui", "Nói một đằng làm một nẻo", "Giữ chữ tín: nói đi đôi với làm, giữ lời hứa."],
        ["Hành động nào làm mất chữ tín?", "Hứa giúp bạn rồi quên, không thực hiện nhiều lần", "Thực hiện đúng lời hứa", "Xin lỗi và hẹn lại khi có việc đột xuất chính đáng kèm báo trước", "Thất hứa nhiều lần không lí do làm mất lòng tin."],
        ["Người giữ chữ tín được mọi người thế nào?", "Tin tưởng, tôn trọng", "Xa lánh", "Không ai dám giao việc", "Chữ tín tạo niềm tin trong quan hệ."],
        ["Chẳng may không thực hiện được lời hứa đúng hẹn, em nên làm gì?", "Chủ động báo trước, xin lỗi và hẹn lại cụ thể", "Lờ đi như chưa hứa", "Đổ lỗi cho người khác", "Thông báo và xin lỗi thể hiện trách nhiệm với lời hứa."],
        ["Mượn sách của bạn và trả đúng ngày đã hẹn thể hiện điều gì?", "Giữ chữ tín với bạn bè", "Sợ bạn giận nên phải trả đúng hẹn", "Muốn mượn thêm sách khác của bạn", "Trả đồ đúng hẹn là biểu hiện rõ ràng của giữ chữ tín."],
        ["Người giữ chữ tín thường có biểu hiện nào?", "Nói được và làm được như đã nói", "Hứa nhiều nhưng ít khi thực hiện", "Chỉ giữ lời khi có người giám sát", "Nói đi đôi với làm là cốt lõi của chữ tín."],
        ["Hứa với cha mẹ sẽ về nhà đúng giờ, em cần làm gì?", "Thực hiện đúng lời hứa đã nói", "Về muộn cũng không sao nếu vui chơi", "Tìm lí do để biện minh cho việc muộn", "Thực hiện lời hứa với cha mẹ thể hiện sự tôn trọng và chữ tín."],
        ["Hành vi nào làm mất chữ tín với thầy cô?", "Nộp bài muộn nhiều lần không lí do", "Xin phép nghỉ học khi bị ốm mệt", "Hỏi lại bài khi chưa hiểu rõ bài", "Nộp bài muộn không lí do nhiều lần làm giảm niềm tin của thầy cô."],
        ["Khi không thể thực hiện lời hứa, việc làm đúng là gì?", "Thành thật giải thích và xin lỗi sớm", "Im lặng để người khác tự quên đi", "Đổ lỗi hoàn toàn cho người khác", "Thành thật và xin lỗi sớm giúp giữ được niềm tin của mọi người."],
        ["Giữ chữ tín trong kinh doanh được hiểu là gì?", "Bán hàng đúng chất lượng đã cam kết", "Quảng cáo quá sự thật để bán chạy", "Thay đổi giá tùy theo từng khách hàng", "Cam kết chất lượng và thực hiện đúng tạo nên uy tín kinh doanh."],
        ["Vì sao học sinh cần giữ chữ tín từ những việc nhỏ?", "Để tạo thói quen đáng tin cậy", "Chỉ để được thầy cô khen thưởng", "Việc nhỏ không ảnh hưởng đến ai cả", "Giữ tín trong việc nhỏ rèn luyện phẩm chất đáng tin lâu dài."],
        ["Bạn hứa giữ bí mật cho em nhưng lại kể cho người khác, bạn đã thế nào?", "Không giữ chữ tín với bạn bè", "Chỉ vô tình nên không có lỗi gì", "Rất thẳng thắn và đáng được khen", "Tiết lộ bí mật đã hứa giữ là hành vi thất tín."],
        ["Đến điểm hẹn đúng giờ thể hiện điều gì?", "Tôn trọng người khác và giữ chữ tín", "Sợ bị người khác trách mắng mình", "Không có việc gì khác để làm cả", "Đúng giờ là biểu hiện tôn trọng thời gian của người khác."],
        ["Người nhiều lần thất hứa sẽ gặp hậu quả gì?", "Mọi người dần mất niềm tin ở mình", "Được mọi người thông cảm nhiều hơn", "Không có hậu quả gì đáng kể cả", "Thất hứa nhiều lần khiến uy tín và niềm tin bị giảm sút."],
        ["Khi nhận nhiệm vụ trực nhật lớp, em cần làm gì để giữ tín?", "Hoàn thành đúng phần việc được giao", "Đẩy việc cho bạn khác làm thay mình", "Làm qua loa cho xong trách nhiệm", "Hoàn thành đúng nhiệm vụ được giao thể hiện trách nhiệm và chữ tín."],
        ["Lời hứa nào em không nên hứa với bạn?", "Việc vượt quá khả năng của mình", "Việc nhỏ mình chắc chắn làm được", "Việc giúp bạn ôn bài trước kiểm tra", "Không nên hứa điều mình không làm được để tránh thất tín."],
        ["Giữ chữ tín với bản thân được thể hiện qua việc nào?", "Tự thực hiện kế hoạch đã đặt ra", "Đặt kế hoạch rồi bỏ dở giữa chừng", "Chỉ làm khi có người nhắc nhở mình", "Tự thực hiện kế hoạch cho thấy em nghiêm túc với chính mình."],
        ["Trong nhóm học tập, giữ chữ tín là làm gì?", "Làm đúng phần việc đã nhận trong nhóm", "Để bạn khác gánh hết việc của nhóm", "Nhận việc nhưng không bao giờ làm", "Làm đúng phần việc đã nhận giúp nhóm tin tưởng và phối hợp tốt."],
        ["Cửa hàng bán hàng kém chất lượng so với quảng cáo đã vi phạm điều gì?", "Không giữ chữ tín với khách hàng", "Chỉ là cách kinh doanh khôn ngoan", "Không vi phạm điều gì nghiêm trọng", "Hàng không đúng cam kết là hành vi thiếu chữ tín trong mua bán."],
        ["Thấy bạn thất hứa với người khác, em nên khuyên bạn thế nào?", "Khuyên bạn xin lỗi và sửa lại lần sau", "Khuyên bạn mặc kệ không cần xin lỗi", "Khen bạn vì đã khôn khéo thoát việc", "Khuyên bạn sửa lỗi giúp bạn giữ được uy tín với mọi người."],
        ["Chữ tín được xây dựng qua điều gì?", "Qua nhiều lần giữ đúng lời hứa", "Chỉ qua một lời nói hay, ấn tượng", "Qua vẻ bề ngoài lịch sự, sang trọng", "Chữ tín hình thành từ những hành động giữ lời lặp lại nhiều lần."],
        ["Học sinh nói dối thầy cô về lí do nghỉ học đã làm gì?", "Đánh mất chữ tín và sự trung thực", "Chỉ là nói dối nhỏ không đáng kể", "Thể hiện mình rất thông minh, lanh lợi", "Nói dối làm mất niềm tin và trái với đức tính trung thực."],
        ["Khi vay tiền bạn mua đồ dùng học tập, em nên làm gì?", "Trả lại đầy đủ và đúng hẹn đã nói", "Trả dần khi nào bạn đòi mới trả", "Quên luôn vì số tiền không lớn lắm", "Trả đủ và đúng hẹn là biểu hiện giữ chữ tín trong vay mượn."],
        ["Giữ chữ tín giúp quan hệ bạn bè trở nên thế nào?", "Bền chặt và tin tưởng lẫn nhau", "Xa cách vì phải giữ khoảng cách", "Không thay đổi gì trong quan hệ", "Niềm tin là nền tảng giúp tình bạn bền chặt hơn."],
        ["Việc nào sau đây thể hiện giữ chữ tín trong lời nói?", "Chỉ nói điều mình chắc chắn làm được", "Hứa cho vui để người khác yên lòng", "Nói hay hơn những gì mình có thể làm", "Cân nhắc trước khi hứa giúp lời nói có trọng lượng và đáng tin."],
        ["Ông cha ta có câu “Một lần bất tín, vạn lần bất tin” để nhắc điều gì?", "Mất chữ tín rất khó lấy lại niềm tin", "Chỉ cần xin lỗi một lần là đủ rồi", "Thất hứa một lần không sao cả đâu", "Câu nói nhấn mạnh hậu quả lâu dài của việc thất tín."]
      ], [["Lời hứa","Phải giữ"],["Chữ tín","Niềm tin"],["Thất hứa nhiều lần","Mất tín nhiệm"],["Không làm được hẹn","Báo trước, xin lỗi"],
        ["Trả sách đúng hẹn", "Giữ chữ tín với bạn"],
        ["Đến đúng giờ hẹn", "Tôn trọng và giữ lời hứa"]], "Nối cho đúng nhé!"),
      topic("gd5","🏯","Bài 5: Bảo tồn di sản văn hoá","Bảo tồn di sản",[
        ["Di sản văn hoá gồm những gì?", "Di tích lịch sử, lễ hội, nghề truyền thống, tác phẩm nghệ thuật...", "Chỉ nhà cao tầng mới", "Chỉ đồ dùng hiện đại", "Di sản văn hoá vật thể và phi vật thể do cha ông để lại."],
        ["Hành động nào bảo tồn di sản văn hoá?", "Không khắc tên lên di tích, tuyên truyền giữ gìn di sản", "Vẽ bậy lên tường di tích", "Lấy cổ vật về nhà", "Bảo tồn bằng ý thức giữ gìn và lan toả giá trị."],
        ["Di sản nào của Việt Nam được UNESCO công nhận (ví dụ trong sách thường nêu)?", "Cố đô Huế, Hội An, ca trù, quan họ...", "Khu chung cư mới xây", "Siêu thị hiện đại", "Nhiều di sản Việt Nam được UNESCO vinh danh."],
        ["Trách nhiệm của học sinh với di sản quê hương là gì?", "Tìm hiểu, giữ gìn và giới thiệu di sản", "Không cần quan tâm", "Phá hoại cho vui", "Học sinh cũng có trách nhiệm bảo tồn di sản."],
        ["Di sản văn hóa phi vật thể là những gì?", "Phong tục, lễ hội, nghệ thuật dân gian", "Đền, chùa và các công trình cổ kính", "Hiện vật trưng bày trong bảo tàng", "Di sản phi vật thể gồm phong tục, lễ hội và nghệ thuật truyền thống."],
        ["Nhã nhạc cung đình Huế thuộc loại di sản nào?", "Di sản văn hóa phi vật thể", "Di sản thiên nhiên thế giới", "Di sản văn hóa vật thể", "Nhã nhạc là nghệ thuật trình diễn nên thuộc di sản phi vật thể."],
        ["Phố cổ Hội An nổi tiếng là di sản gì?", "Di sản văn hóa thế giới", "Di sản thiên nhiên thế giới", "Khu dự trữ sinh quyển thế giới", "Phố cổ Hội An được UNESCO công nhận là di sản văn hóa thế giới."],
        ["Hành vi nào gây hại cho di sản văn hóa?", "Vẽ bậy lên tường di tích cổ", "Dọn vệ sinh quanh khu di tích", "Tuyên truyền về giá trị di tích", "Vẽ bậy làm mất vẻ đẹp và hư hại di tích văn hóa."],
        ["Học sinh tham quan di tích cần tuân thủ điều gì?", "Nội quy tham quan của khu di tích", "Tự do sờ mó mọi hiện vật cổ", "Nói chuyện ồn ào trong khu di tích", "Tuân thủ nội quy giúp bảo vệ di tích và thể hiện văn hóa."],
        ["Ca trù, quan họ, đờn ca tài tử có điểm chung gì?", "Đều là di sản văn hóa phi vật thể", "Đều là công trình kiến trúc cổ", "Đều là di sản thiên nhiên quý hiếm", "Các loại hình nghệ thuật dân gian này đều là di sản phi vật thể."],
        ["Việc trùng tu di tích nhằm mục đích gì?", "Giữ gìn di tích cho thế hệ sau", "Biến di tích thành công trình mới", "Thu hút khách chỉ để thu tiền vé", "Trùng tu đúng cách giúp di tích tồn tại lâu dài."],
        ["Khi phát hiện hiện vật cổ, em nên làm gì?", "Báo cho người lớn và cơ quan chức năng", "Mang về nhà cất làm của riêng mình", "Mang bán lấy tiền tiêu vặt ngay", "Báo cho cơ quan chức năng giúp hiện vật được bảo tồn đúng cách."],
        ["Di sản thiên nhiên thế giới ở Việt Nam là địa danh nào?", "Vịnh Hạ Long ở Quảng Ninh", "Phố cổ Hội An ở Quảng Nam", "Cố đô Huế ở Thừa Thiên Huế", "Vịnh Hạ Long là di sản thiên nhiên nổi tiếng của Việt Nam."],
        ["Bảo tồn di sản văn hóa mang lại lợi ích gì cho địa phương?", "Thu hút du lịch và tạo việc làm", "Làm địa phương trở nên lạc hậu", "Không mang lại lợi ích thiết thực", "Di sản được bảo tồn tốt góp phần phát triển du lịch địa phương."],
        ["Hành động nào thể hiện ý thức bảo tồn di sản?", "Nhắc bạn không xả rác ở di tích", "Hái hoa, bẻ cành trong khu di tích", "Khắc tên lên cây cổ thụ ở di tích", "Nhắc nhở nhau giữ gìn di tích là hành động bảo tồn thiết thực."],
        ["Lễ hội truyền thống thuộc nhóm di sản nào?", "Di sản văn hóa phi vật thể", "Di sản văn hóa vật thể", "Di sản thiên nhiên của quốc gia", "Lễ hội là sinh hoạt văn hóa tinh thần nên thuộc phi vật thể."],
        ["Vì sao cần bảo tồn các làng nghề truyền thống?", "Giữ bản sắc văn hóa của dân tộc", "Để sản phẩm làm ra bán đắt hơn", "Chỉ để phục vụ khách nước ngoài", "Làng nghề truyền thống chứa đựng bản sắc văn hóa dân tộc."],
        ["Hành vi đào trộm cổ vật để bán bị coi là gì?", "Vi phạm pháp luật về di sản", "Cách làm giàu nhanh và hợp lí", "Việc làm không ảnh hưởng đến ai", "Đào trộm cổ vật là hành vi vi phạm pháp luật cần ngăn chặn."],
        ["Em có thể giới thiệu di sản quê hương bằng cách nào?", "Làm bài thuyết trình ở lớp học", "Giữ kín không chia sẻ với ai cả", "Chỉ nói về di sản của nước ngoài", "Thuyết trình về di sản giúp bạn bè hiểu và trân trọng hơn."],
        ["Di tích lịch sử giúp thế hệ trẻ hiểu điều gì?", "Truyền thống dựng nước và giữ nước", "Chỉ là nơi chụp ảnh tham quan đẹp", "Không liên quan đến bài học lịch sử", "Di tích là chứng tích giúp hiểu về quá khứ của dân tộc."],
        ["Khi xem biểu diễn nghệ thuật truyền thống, em nên làm gì?", "Trân trọng và cổ vũ nghệ nhân", "Chê bai vì cho rằng đã lỗi thời", "Bỏ về giữa chừng vì thấy nhàm chán", "Trân trọng nghệ nhân giúp nghệ thuật truyền thống được tiếp nối."],
        ["Việc ghi danh di sản vào danh sách UNESCO có ý nghĩa gì?", "Di sản được thế giới công nhận, bảo vệ", "Di sản thuộc về riêng một cá nhân", "Di sản không cần bảo tồn nữa rồi", "Được UNESCO ghi danh giúp di sản được quan tâm bảo vệ hơn."],
        ["Trang phục áo dài truyền thống thuộc loại di sản nào?", "Di sản văn hóa của dân tộc Việt", "Di sản thiên nhiên thế giới", "Hiện vật chỉ có trong bảo tàng", "Áo dài là biểu tượng văn hóa truyền thống của người Việt."],
        ["Hành động nào phá hoại cảnh quan di sản thiên nhiên?", "Xả rác và chặt phá rừng ở di sản", "Trồng thêm cây xanh quanh di sản", "Tuyên truyền bảo vệ môi trường sạch", "Xả rác, phá rừng làm suy thoái cảnh quan di sản thiên nhiên."],
        ["Trách nhiệm bảo tồn di sản thuộc về ai?", "Toàn xã hội, trong đó có học sinh", "Chỉ thuộc về các nhà quản lí văn hóa", "Chỉ thuộc về người dân địa phương đó", "Bảo tồn di sản là trách nhiệm chung của mọi người."],
        ["Sưu tầm và giữ gìn truyện cổ dân gian có ý nghĩa gì?", "Lưu giữ kho tàng văn hóa tinh thần", "Chỉ để đọc giải trí lúc rảnh rỗi", "Không còn phù hợp với thời nay nữa", "Truyện cổ dân gian là kho tàng văn hóa tinh thần cần lưu giữ."]
      ], [["Di tích","Di sản vật thể"],["Lễ hội, dân ca","Di sản phi vật thể"],["Khắc tên lên di tích","Hành vi phá hoại"],["UNESCO","Công nhận di sản thế giới"],
        ["Quan họ Bắc Ninh", "Di sản phi vật thể UNESCO"],
        ["Vịnh Hạ Long", "Di sản thiên nhiên thế giới"]], "Nối cho đúng nhé!"),
      topic("gd6","😮‍💨","Bài 6: Ứng phó với tâm lí căng thẳng","Ứng phó căng thẳng",[
        ["Dấu hiệu nào cho thấy em đang căng thẳng?", "Lo lắng, mệt mỏi, khó tập trung, dễ cáu gắt", "Luôn vui vẻ thoải mái", "Ngủ ngon, ăn ngon", "Nhận biết dấu hiệu căng thẳng là bước đầu ứng phó."],
        ["Cách ứng phó lành mạnh khi căng thẳng trước kì thi là?", "Lập kế hoạch ôn tập, nghỉ ngơi hợp lí, chia sẻ với người thân", "Thức trắng nhiều đêm liên tục", "Bỏ thi", "Kế hoạch hợp lí và chia sẻ giúp giảm căng thẳng."],
        ["Khi căng thẳng kéo dài không giảm, em nên làm gì?", "Tìm sự hỗ trợ của cha mẹ, thầy cô, chuyên gia tâm lí", "Giấu kín chịu đựng một mình mãi", "Bỏ học", "Tìm hỗ trợ kịp thời là cách làm đúng."],
        ["Hoạt động nào giúp thư giãn, giảm căng thẳng?", "Thể dục, nghe nhạc, đọc sách, hít thở sâu", "Thức khuya chơi game liên tục", "Cãi nhau với bạn", "Vận động và thư giãn lành mạnh giúp cân bằng tâm lí."],
        ["Tâm lí căng thẳng trước kì thi thường xuất phát từ đâu?", "Áp lực điểm số và kì vọng cao", "Do thời tiết thay đổi thất thường", "Do ăn uống không đúng bữa ăn", "Áp lực học tập và kì vọng là nguyên nhân phổ biến gây căng thẳng."],
        ["Dấu hiệu nào cho thấy cơ thể đang căng thẳng?", "Tim đập nhanh, khó tập trung học", "Ăn ngon miệng và ngủ rất sâu giấc", "Tinh thần vui vẻ, tràn đầy năng lượng", "Tim đập nhanh, khó tập trung là dấu hiệu thường gặp khi căng thẳng."],
        ["Cách thở nào giúp em bình tĩnh khi căng thẳng?", "Hít thở sâu và thở ra chậm rãi", "Thở thật nhanh và gấp gáp liên tục", "Nín thở càng lâu càng tốt cho mình", "Hít thở sâu giúp cơ thể và tinh thần thư giãn, bình tĩnh hơn."],
        ["Khi căng thẳng vì bài tập nhiều, em nên làm gì?", "Chia nhỏ việc và làm từng phần một", "Làm tất cả cùng lúc cho nhanh xong", "Bỏ hết bài tập và đi ngủ luôn ngay", "Chia nhỏ công việc giúp em đỡ áp lực và dễ hoàn thành hơn."],
        ["Ngủ đủ giấc có tác dụng gì với tâm lí căng thẳng?", "Giúp tinh thần ổn định, bớt mệt mỏi", "Làm em căng thẳng nhiều hơn trước", "Không ảnh hưởng gì đến tâm lí cả", "Ngủ đủ giấc giúp cơ thể hồi phục và giảm căng thẳng."],
        ["Hoạt động thể thao giúp giảm căng thẳng như thế nào?", "Giúp cơ thể khỏe và tâm trạng tốt hơn", "Làm em mệt nên căng thẳng tăng lên", "Chỉ tốn thời gian học tập của em", "Vận động giúp giải tỏa áp lực và cải thiện tâm trạng."],
        ["Khi căng thẳng kéo dài, em không nên làm gì?", "Tự chịu đựng và giấu kín một mình", "Chia sẻ với cha mẹ để được hỗ trợ", "Tìm đến thầy cô để được tư vấn thêm", "Giấu kín và chịu đựng một mình khiến căng thẳng nặng thêm."],
        ["Chia sẻ cảm xúc với bạn thân giúp ích gì khi căng thẳng?", "Giúp em nhẹ lòng và được đồng cảm", "Làm bạn cũng căng thẳng theo mình", "Không giải quyết được vấn đề gì cả", "Được lắng nghe và đồng cảm giúp em vơi bớt áp lực tâm lí."],
        ["Em nên sắp xếp thời gian thế nào để giảm căng thẳng học tập?", "Cân bằng giữa học tập và nghỉ ngơi", "Học liên tục không cần nghỉ ngơi gì", "Chỉ nghỉ ngơi và không cần học nữa", "Cân bằng học và nghỉ giúp em tránh quá tải, căng thẳng."],
        ["Nghe nhạc nhẹ nhàng khi căng thẳng có tác dụng gì?", "Giúp thư giãn và ổn định cảm xúc", "Làm em mất tập trung hoàn toàn luôn", "Khiến tâm trạng trở nên tệ hơn trước", "Âm nhạc nhẹ nhàng là cách thư giãn tinh thần hiệu quả."],
        ["Nguyên nhân nào có thể gây căng thẳng ở học sinh?", "Bị bạn bè trêu chọc, cô lập ở lớp", "Được thầy cô khen ngợi trước lớp", "Được nghỉ ngơi đầy đủ mỗi ngày", "Mâu thuẫn với bạn bè là nguyên nhân gây căng thẳng thường gặp."],
        ["Khi thấy bạn có biểu hiện căng thẳng nặng, em nên làm gì?", "Động viên bạn chia sẻ với người lớn", "Trêu chọc để bạn quên căng thẳng đi", "Mặc kệ vì đó là chuyện của bạn ấy", "Động viên bạn tìm sự hỗ trợ kịp thời là việc làm đúng đắn."],
        ["Thức khuya ôn bài nhiều đêm liền gây hậu quả gì?", "Mệt mỏi và căng thẳng tăng lên", "Giúp nhớ bài tốt hơn rất nhiều lần", "Không ảnh hưởng đến sức khỏe của em", "Thức khuya kéo dài làm cơ thể mệt mỏi, giảm khả năng tập trung."],
        ["Viết nhật kí cảm xúc giúp em điều gì khi căng thẳng?", "Nhìn rõ cảm xúc và bình tĩnh hơn", "Làm em nhớ lại chuyện buồn nhiều hơn", "Tốn giấy vở mà không có tác dụng", "Viết ra cảm xúc giúp em hiểu mình và giải tỏa áp lực."],
        ["Đặt mục tiêu quá cao so với khả năng dễ dẫn đến điều gì?", "Áp lực và căng thẳng cho bản thân", "Kết quả học tập luôn đạt cao nhất", "Được mọi người ngưỡng mộ, khen ngợi", "Mục tiêu vừa sức giúp em phấn đấu mà không quá áp lực."],
        ["Khi căng thẳng, em nên tránh hành vi nào?", "Trút giận lên người khác xung quanh", "Đi dạo nhẹ nhàng để thư giãn đầu óc", "Uống đủ nước và nghỉ ngơi hợp lí", "Trút giận lên người khác làm mối quan hệ xấu đi và không hết căng thẳng."],
        ["Tham gia hoạt động mình yêu thích giúp ích gì?", "Tái tạo năng lượng, giảm căng thẳng", "Làm em sao nhãng hoàn toàn việc học", "Chỉ dành cho người có nhiều thời gian", "Hoạt động yêu thích giúp tinh thần được thư giãn, cân bằng."],
        ["Dấu hiệu căng thẳng về cảm xúc thường là gì?", "Dễ cáu gắt, lo lắng và buồn bã", "Luôn vui vẻ và yêu đời hơn trước", "Tự tin và bình tĩnh trong mọi việc", "Thay đổi cảm xúc thất thường là dấu hiệu căng thẳng về cảm xúc."],
        ["Cha mẹ có thể hỗ trợ con giảm căng thẳng bằng cách nào?", "Lắng nghe và không gây thêm áp lực", "So sánh con với bạn bè cùng lớp học", "Đặt kì vọng điểm số thật cao cho con", "Lắng nghe, thấu hiểu giúp con vơi bớt áp lực học tập."],
        ["Tập thể dục buổi sáng đều đặn mang lại lợi ích gì?", "Cơ thể khỏe mạnh, tinh thần sảng khoái", "Làm em buồn ngủ cả ngày ở lớp học", "Không liên quan gì đến tâm lí của em", "Thể dục đều đặn giúp giảm căng thẳng và tăng sức khỏe."],
        ["Khi đối diện việc khó gây căng thẳng, thái độ đúng là gì?", "Bình tĩnh tìm cách giải quyết từng bước", "Hoảng sợ và bỏ chạy khỏi vấn đề đó", "Đổ lỗi cho hoàn cảnh và người khác", "Bình tĩnh, chia nhỏ vấn đề giúp em vượt qua căng thẳng."],
        ["Sử dụng điện thoại quá nhiều trước khi ngủ ảnh hưởng thế nào?", "Khó ngủ và dễ căng thẳng hơn", "Giúp ngủ ngon và sâu giấc hơn nhiều", "Không ảnh hưởng gì đến giấc ngủ cả", "Ánh sáng màn hình làm khó ngủ, ảnh hưởng đến tinh thần hôm sau."]
      ], [["Căng thẳng","Lo lắng, mệt mỏi"],["Ôn tập có kế hoạch","Giảm áp lực thi cử"],["Chia sẻ với người thân","Tìm hỗ trợ"],["Thể dục, hít thở sâu","Thư giãn"],
        ["Hít thở sâu", "Cách thư giãn khi căng thẳng"],
        ["Ngủ đủ giấc", "Giúp giảm mệt mỏi, căng thẳng"]], "Nối cho đúng nhé!"),
      topic("gd7","🛡️","Bài 7: Phòng, chống bạo lực học đường","Phòng chống bạo lực học đường",[
        ["Hành vi nào là bạo lực học đường?", "Đánh bạn, bắt nạt, cô lập, đe doạ bạn", "Giúp bạn học bài", "Chơi thể thao cùng nhau", "Bạo lực gồm thể chất, tinh thần, cả trên mạng."],
        ["Bị bắt nạt ở trường, em nên làm gì?", "Báo thầy cô, cha mẹ; không im lặng chịu đựng", "Đánh lại cho hả giận", "Bỏ học", "Tìm sự giúp đỡ của người lớn là cách an toàn, đúng đắn."],
        ["Chứng kiến bạn bị bắt nạt, em nên làm gì?", "Can ngăn trong khả năng an toàn và báo thầy cô", "Quay clip đăng mạng trêu chọc", "Cổ vũ kẻ bắt nạt", "Không làm ngơ và không tiếp tay cho bạo lực."],
        ["Phòng tránh bạo lực học đường cần xây dựng điều gì?", "Môi trường học đường thân thiện, tôn trọng nhau", "Bè phái mạnh yếu", "Văn hoá im lặng", "Đoàn kết, tôn trọng giúp ngăn bạo lực từ gốc."],
        ["Bạo lực học đường về tinh thần thường thể hiện qua việc nào?", "Lăng mạ, cô lập bạn trong lớp học", "Tranh luận thẳng thắn về bài học", "Góp ý nhẹ nhàng khi bạn làm sai", "Lăng mạ, cô lập gây tổn thương tinh thần cho nạn nhân."],
        ["Hành vi quay clip bạn bị đánh rồi đăng lên mạng là thế nào?", "Tiếp tay cho bạo lực học đường", "Hành động quay phim nghệ thuật hay", "Việc làm vô hại, chỉ để xem lại", "Đăng clip bạo lực làm tổn thương nạn nhân và tiếp tay cái xấu."],
        ["Khi bị bạn đe dọa trên đường đi học về, em nên làm gì?", "Báo ngay cho cha mẹ và thầy cô biết", "Giấu kín vì sợ bạn trả thù mình thêm", "Tự tìm cách đánh lại bạn cho hả giận", "Báo người lớn giúp em được bảo vệ an toàn kịp thời."],
        ["Nguyên nhân nào dễ dẫn đến bạo lực học đường?", "Thiếu kĩ năng kiềm chế cảm xúc", "Học sinh có nhiều bạn bè thân thiết", "Trường học có nhiều hoạt động vui", "Không kiềm chế được cảm xúc dễ dẫn đến hành vi bạo lực."],
        ["Bạo lực học đường gây hậu quả gì cho nạn nhân?", "Hoảng sợ, giảm sút học tập rõ rệt", "Trở nên mạnh mẽ và giỏi hơn hẳn", "Không ảnh hưởng gì đến cuộc sống", "Nạn nhân bạo lực thường lo sợ, ảnh hưởng học tập và tâm lí."],
        ["Để phòng tránh bị bắt nạt, em nên làm gì?", "Đi cùng bạn và tránh nơi vắng vẻ", "Đi một mình qua những nơi tối tăm", "Mang theo vật sắc nhọn để tự vệ", "Đi cùng bạn, tránh nơi vắng giúp em an toàn hơn."],
        ["Thấy hai bạn xô xát trong sân trường, em nên làm gì?", "Báo thầy cô hoặc bảo vệ gần nhất", "Đứng cổ vũ cho một bên thắng cuộc", "Lấy điện thoại quay lại cho vui mắt", "Báo người lớn kịp thời giúp ngăn chặn xô xát gây hại."],
        ["Hành vi nào là bạo lực trên không gian mạng?", "Bình luận xúc phạm bạn trên mạng", "Nhắn tin hỏi bài tập về nhà cho bạn", "Chia sẻ tài liệu học tập cho cả lớp", "Xúc phạm trên mạng cũng là một dạng bạo lực học đường."],
        ["Xây dựng tình bạn đẹp giúp phòng chống bạo lực như thế nào?", "Bạn bè biết tôn trọng, giúp đỡ nhau", "Bạn bè chỉ chơi với người học giỏi", "Bạn bè tụ tập thành nhóm riêng biệt", "Tình bạn đẹp tạo môi trường an toàn, không có bạo lực."],
        ["Khi bạn rủ em tham gia đánh bạn khác, em nên làm gì?", "Từ chối và khuyên bạn dừng lại ngay", "Đồng ý để không bị bạn bè tẩy chay", "Đứng xem và cổ vũ cho nhóm bạn", "Từ chối tham gia bạo lực là lựa chọn đúng đắn, dũng cảm."],
        ["Học sinh cần rèn kĩ năng nào để tránh xung đột bạo lực?", "Kĩ năng kiềm chế và giải quyết hòa bình", "Kĩ năng cãi nhau thắng mọi cuộc tranh luận", "Kĩ năng né tránh mọi giao tiếp bạn bè", "Kiềm chế cảm xúc giúp giải quyết mâu thuẫn không dùng bạo lực."],
        ["Việc nhà trường tổ chức tuyên truyền phòng chống bạo lực nhằm gì?", "Nâng cao nhận thức cho học sinh", "Chỉ để hoàn thành kế hoạch năm học", "Làm học sinh lo sợ khi đến trường", "Tuyên truyền giúp học sinh hiểu và phòng tránh bạo lực."],
        ["Bị bạn lấy đồ dùng học tập nhiều lần mà không trả, em nên làm gì?", "Nói rõ với bạn và nhờ thầy cô giúp", "Lấy lại đồ của bạn để trừ nợ nhau", "Im lặng chịu đựng không dám nói gì", "Trao đổi rõ ràng và nhờ hỗ trợ là cách giải quyết văn minh."],
        ["Hành vi ép bạn đưa tiền tiêu vặt bị coi là gì?", "Hành vi bắt nạt, chấn lột bạn bè", "Mượn tiền bạn bè một cách bình thường", "Trò đùa vui giữa các bạn thân thiết", "Ép lấy tiền là hành vi bạo lực, vi phạm quy định trường học."],
        ["Để trường học an toàn, mỗi học sinh cần làm gì?", "Tôn trọng và không xúc phạm bạn bè", "Chỉ quan tâm đến việc học của mình", "Lập nhóm riêng để bảo vệ lẫn nhau", "Tôn trọng bạn bè là nền tảng của môi trường học đường an toàn."],
        ["Khi mâu thuẫn với bạn, cách giải quyết tốt nhất là gì?", "Nói chuyện bình tĩnh để hiểu nhau", "Dùng nắm đấm để phân thắng bại ngay", "Nói xấu bạn khắp nơi trong trường", "Đối thoại bình tĩnh giúp hóa giải mâu thuẫn hiệu quả."],
        ["Người chứng kiến bạo lực mà im lặng sẽ gây hệ quả gì?", "Bạo lực có thể tiếp diễn và nặng hơn", "Mọi việc sẽ tự kết thúc êm đẹp ngay", "Không liên quan gì đến người chứng kiến", "Sự im lặng khiến hành vi bạo lực không bị ngăn chặn kịp thời."],
        ["Số điện thoại nào hỗ trợ trẻ em khi bị bạo lực, xâm hại?", "Tổng đài quốc gia 111 về trẻ em", "Tổng đài thông tin thời tiết hằng ngày", "Số điện thoại của cửa hàng gần nhà", "Tổng đài 111 là đường dây hỗ trợ, bảo vệ trẻ em miễn phí."],
        ["Hành vi giật tóc, xô đẩy bạn trong lớp thuộc loại bạo lực nào?", "Bạo lực về thể chất đối với bạn", "Trò đùa thân mật giữa bạn bè thân", "Hoạt động thể dục thể thao ở lớp", "Tác động vào thân thể người khác là bạo lực thể chất."],
        ["Gia đình có vai trò gì trong phòng chống bạo lực học đường?", "Quan tâm, lắng nghe con mỗi ngày", "Chỉ hỏi điểm số của con ở trường", "Mặc kệ vì đó là việc của nhà trường", "Gia đình quan tâm giúp phát hiện sớm dấu hiệu con bị bạo lực."],
        ["Câu khẩu hiệu nào phù hợp với phòng chống bạo lực học đường?", "Nói không với bạo lực học đường", "Thắng thua phải phân rõ bằng sức mạnh", "Ai mạnh hơn thì người đó đúng hơn", "Khẩu hiệu thể hiện quyết tâm xây dựng trường học an toàn."],
        ["Khi được bạn xin lỗi chân thành sau mâu thuẫn, em nên làm gì?", "Tha thứ và hòa giải với bạn của mình", "Không tha thứ và tìm cách trả đũa bạn", "Kể lại chuyện cũ để trách bạn mãi mãi", "Tha thứ giúp hóa giải mâu thuẫn và giữ tình bạn đẹp."]
      ], [["Bắt nạt","Bạo lực học đường"],["Bị bắt nạt","Báo thầy cô, cha mẹ"],["Chứng kiến bạo lực","Báo người lớn"],["Thân thiện, tôn trọng","Phòng ngừa bạo lực"],
        ["Tổng đài 111", "Hỗ trợ, bảo vệ trẻ em"],
        ["Cô lập bạn bè", "Bạo lực về tinh thần"]], "Nối cho đúng nhé!"),
      topic("gd8","💰","Bài 8: Quản lí tiền","Quản lí tiền hiệu quả",[
        ["Quản lí tiền hợp lí là làm những việc nào?", "Lập kế hoạch chi tiêu, tiết kiệm, chỉ mua thứ cần thiết", "Tiêu hết tiền ngay khi có", "Vay tiền bạn để ăn vặt thường xuyên", "Quản lí tiền: biết thu – chi hợp lí và tiết kiệm."],
        ["Em được cho 50.000 đồng tiêu vặt một tuần. Cách làm khôn ngoan là?", "Chia phần cho nhu cầu cần thiết và để dành một phần", "Mua hết đồ ăn vặt ngày đầu tiên", "Cho bạn mượn hết không ghi nhớ", "Chia ngân sách và tiết kiệm là quản lí tiền tốt."],
        ["Tiết kiệm tiền giúp em điều gì?", "Có khoản dự phòng và mua được món đồ cần thiết lớn hơn sau này", "Không có lợi ích", "Làm em keo kiệt bị bạn ghét chắc chắn", "Tiết kiệm là thói quen tài chính lành mạnh."],
        ["Trước khi mua một món đồ, câu hỏi nên tự đặt ra là?", "Mình có thật sự cần nó không?", "Bạn bè có khen không?", "Đồ càng đắt càng tốt phải không?", "Phân biệt “cần” và “muốn” giúp chi tiêu hợp lí."],
        ["Bước đầu tiên để quản lí tiền hiệu quả là gì?", "Xác định số tiền mình đang có", "Mua ngay món đồ mình thích nhất", "Vay thêm tiền từ bạn bè xung quanh", "Biết rõ số tiền hiện có là cơ sở để lập kế hoạch chi tiêu."],
        ["Phân biệt “cần” và “muốn” giúp em điều gì?", "Ưu tiên mua thứ thật sự cần thiết", "Mua được nhiều đồ hơn trước đây", "Không cần lập kế hoạch chi tiêu nữa", "Ưu tiên nhu cầu cần thiết giúp em tránh lãng phí tiền bạc."],
        ["Em được cho 100.000 đồng, cách quản lí hợp lí là gì?", "Chia phần chi tiêu và phần tiết kiệm", "Tiêu hết trong một ngày cho vui", "Cho bạn vay hết không cần ghi nhớ", "Chia phần rõ ràng giúp em vừa chi tiêu vừa có tiền để dành."],
        ["Ghi chép chi tiêu hằng ngày mang lại lợi ích gì?", "Biết tiền đã tiêu vào việc gì", "Làm em tiêu tiền nhiều hơn trước", "Chỉ tốn thời gian mà không ích gì", "Ghi chép giúp em kiểm soát và điều chỉnh chi tiêu hợp lí."],
        ["Tiền mừng tuổi đầu năm, em nên sử dụng thế nào?", "Gửi tiết kiệm phần lớn, chi phần nhỏ", "Tiêu hết vào đồ chơi và ăn vặt ngay", "Cho bạn bè mượn hết không lấy lại", "Tiết kiệm tiền mừng tuổi rèn thói quen quản lí tiền tốt."],
        ["Khi thấy bạn mua đồ mới, em nên tránh tâm lí nào?", "Mua theo bạn dù mình không cần dùng", "Tìm hiểu giá cả trước khi quyết định", "Cân nhắc nhu cầu thật của bản thân", "Mua theo phong trào dễ gây lãng phí tiền của cha mẹ."],
        ["Ống heo tiết kiệm giúp học sinh điều gì?", "Tích lũy dần tiền cho mục tiêu lớn", "Làm tiền bị mất giá trị nhanh hơn", "Chỉ là đồ vật trang trí trong phòng", "Bỏ ống heo đều đặn giúp em có khoản tiền dự phòng."],
        ["Trước khi mua món đồ đắt tiền, em nên làm gì?", "So sánh giá và chất lượng nhiều nơi", "Mua ngay nơi đầu tiên nhìn thấy nó", "Vay tiền bạn để mua cho bằng được", "So sánh kĩ giúp em mua được đồ tốt với giá hợp lí."],
        ["Chi tiêu nào được coi là lãng phí đối với học sinh?", "Mua nhiều đồ ăn vặt không cần thiết", "Mua sách và đồ dùng học tập cần dùng", "Để dành tiền mua xe đạp đi học mới", "Chi cho thứ không cần thiết, thừa thãi là lãng phí."],
        ["Lập kế hoạch chi tiêu theo tuần giúp em điều gì?", "Không bị hết tiền giữa tuần học", "Tiêu tiền thoải mái hơn mỗi ngày", "Không cần tiết kiệm thêm nữa rồi", "Kế hoạch theo tuần giúp em chủ động tiền bạc mỗi ngày."],
        ["Em muốn mua cuốn sách yêu thích nhưng chưa đủ tiền, em nên làm gì?", "Tiết kiệm dần từ tiền tiêu vặt", "Lấy tiền của cha mẹ không xin phép", "Bỏ ý định và không đọc sách nữa", "Tiết kiệm dần là cách đúng để đạt mục tiêu mua sắm."],
        ["Quản lí tiền tốt giúp em hình thành đức tính nào?", "Tiết kiệm và có trách nhiệm", "Hà tiện, không dám chi tiêu gì cả", "Chỉ biết nghĩ đến tiền bạc suốt ngày", "Quản lí tiền rèn tính tiết kiệm và trách nhiệm với đồng tiền."],
        ["Khi đi siêu thị với danh sách mua sắm, lợi ích là gì?", "Tránh mua những thứ không cần thiết", "Mua được nhiều đồ khuyến mãi hơn", "Đi siêu thị nhanh hơn người khác nhiều", "Danh sách mua sắm giúp em bám sát nhu cầu đã định."],
        ["Số tiền dự phòng được dùng trong trường hợp nào?", "Khi có việc cần thiết, bất ngờ xảy ra", "Khi muốn mua đồ chơi mới ra mắt", "Khi bạn bè rủ đi ăn uống vui chơi", "Tiền dự phòng dành cho việc cấp thiết, ngoài dự kiến."],
        ["Hành vi nào thể hiện chưa biết quản lí tiền?", "Tiêu hết tiền ngay khi vừa được cho", "Ghi lại các khoản đã chi tiêu ra", "Để dành một phần tiền mỗi tuần học", "Tiêu hết ngay cho thấy em chưa có kế hoạch chi tiêu."],
        ["Cha mẹ cho tiền ăn sáng, em nên sử dụng thế nào?", "Ăn sáng đầy đủ, còn thừa thì để dành", "Nhịn ăn sáng để tiêu vào việc khác", "Mua hết đồ ăn vặt cho bạn bè ăn cùng", "Dùng tiền đúng mục đích và tiết kiệm phần còn lại là hợp lí."],
        ["Mục tiêu tiết kiệm rõ ràng giúp em điều gì?", "Có động lực để dành tiền đều đặn", "Cảm thấy bị gò bó, khó chịu hơn", "Không cần quan tâm đến chi tiêu nữa", "Mục tiêu cụ thể tạo động lực tiết kiệm bền vững."],
        ["Khi món đồ bị hỏng nhưng vẫn sửa được, em nên làm gì?", "Sửa chữa để dùng tiếp, tránh lãng phí", "Vứt đi và mua ngay món đồ mới tinh", "Để đó không dùng đến nữa cho gọn nhà", "Sửa chữa để dùng tiếp là cách chi tiêu tiết kiệm, hợp lí."],
        ["Việc so sánh giá trước khi mua giúp em tránh điều gì?", "Mua hớ với giá cao hơn giá trị thật", "Mất cơ hội mua được món đồ yêu thích", "Bị người bán hàng không hài lòng với mình", "So sánh giá giúp em chi tiêu thông minh, không bị mua đắt."],
        ["Em nên dành tỉ lệ tiền tiêu vặt cho tiết kiệm thế nào?", "Một phần cố định mỗi khi có tiền", "Chỉ tiết kiệm khi còn thừa rất nhiều", "Không cần tiết kiệm phần nào cả đâu", "Trích một phần cố định giúp thói quen tiết kiệm bền vững."],
        ["Quản lí tiền khác với hà tiện ở điểm nào?", "Chi tiêu hợp lí, đúng việc cần thiết", "Không bao giờ chi tiền cho bất cứ việc gì", "Chỉ giữ tiền càng nhiều càng tốt nhất", "Quản lí tiền là chi tiêu có kế hoạch, không phải hà tiện."],
        ["Học quản lí tiền từ nhỏ mang lại lợi ích lâu dài gì?", "Tự chủ tài chính khi trưởng thành", "Chỉ có lợi trong thời gian đi học thôi", "Không ảnh hưởng đến cuộc sống sau này", "Kĩ năng quản lí tiền sớm giúp em tự chủ khi lớn lên."]
      ], [["Tiết kiệm","Để dành dự phòng"],["Kế hoạch chi tiêu","Quản lí tiền"],["Cần và muốn","Phân biệt khi mua sắm"],["Tiêu hết ngay","Quản lí tiền kém"],
        ["Ghi chép chi tiêu", "Theo dõi tiền đã dùng"],
        ["Tiền dự phòng", "Dùng cho việc bất ngờ"]], "Nối cho đúng nhé!"),
      topic("gd9","🚫","Bài 9: Phòng, chống tệ nạn xã hội","Tệ nạn xã hội",[
        ["Tệ nạn xã hội là gì?", "Những hành vi xấu, vi phạm pháp luật gây hại cho xã hội như ma tuý, cờ bạc...", "Hoạt động văn nghệ", "Thể thao học đường", "Tệ nạn xã hội gây hại cho cá nhân, gia đình, xã hội."],
        ["Người lạ rủ rê thử chất lạ / hút thuốc lá điện tử, em nên làm gì?", "Từ chối dứt khoát và báo người lớn", "Thử cho biết", "Rủ thêm bạn thử cùng", "Kiên quyết tránh xa tệ nạn và chất gây nghiện."],
        ["Cờ bạc ăn tiền ở lứa tuổi học sinh là hành vi thế nào?", "Sai trái, vi phạm quy định, cần tránh xa", "Trò vui vô hại", "Cách kiếm tiền tốt", "Cờ bạc là tệ nạn, học sinh tuyệt đối tránh."],
        ["Cách phòng chống tệ nạn xã hội hiệu quả cho học sinh là?", "Học tập, vui chơi lành mạnh, hiểu biết tác hại của tệ nạn", "Tò mò thử mọi thứ", "Giao du không chọn bạn", "Sống lành mạnh và hiểu biết giúp tránh tệ nạn."],
        ["Ma túy gây hại cho người sử dụng như thế nào?", "Hủy hoại sức khỏe và tinh thần nặng nề", "Giúp tỉnh táo và học giỏi hơn nhiều", "Không gây hại nếu chỉ dùng thử một lần", "Ma túy hủy hoại sức khỏe, tinh thần và tương lai người dùng."],
        ["Khi người lạ dụ dỗ cho tiền để vận chuyển gói lạ, em nên làm gì?", "Từ chối và báo ngay cho người lớn", "Nhận lời vì được cho nhiều tiền công", "Giữ im lặng và làm theo lời người lạ", "Từ chối và báo người lớn giúp em tránh vi phạm pháp luật."],
        ["Cờ bạc ăn tiền bị pháp luật quy định thế nào?", "Là hành vi vi phạm pháp luật", "Là trò chơi giải trí được phép tự do", "Chỉ bị nhắc nhở nhẹ nhàng mà thôi", "Đánh bạc ăn tiền là hành vi bị pháp luật nghiêm cấm."],
        ["Hậu quả của việc nghiện trò chơi cờ bạc là gì?", "Mất tiền, nợ nần và tan vỡ hạnh phúc", "Trở nên giàu có nhanh chóng hơn nhiều", "Không ảnh hưởng đến gia đình của mình", "Cờ bạc gây thiệt hại kinh tế và hạnh phúc gia đình."],
        ["Để phòng tránh tệ nạn xã hội, học sinh nên tham gia gì?", "Hoạt động thể thao, văn nghệ lành mạnh", "Tụ tập với nhóm bạn xấu ngoài giờ học", "Đến những nơi vui chơi thiếu lành mạnh", "Hoạt động lành mạnh giúp em tránh xa tệ nạn xã hội."],
        ["Người nghiện ma túy thường có biểu hiện nào?", "Sức khỏe suy giảm, học tập sa sút", "Trở nên khỏe mạnh và học giỏi hơn", "Không có biểu hiện gì khác thường cả", "Nghiện ma túy làm sức khỏe và học tập suy giảm rõ rệt."],
        ["Khi bạn thân rủ em hút thuốc lá điện tử, em nên làm gì?", "Từ chối và khuyên bạn không nên dùng", "Thử một lần cho biết cảm giác thế nào", "Im lặng hút cùng để bạn không giận mình", "Từ chối và khuyên bạn giúp bảo vệ sức khỏe cho cả hai."],
        ["Tệ nạn mại dâm gây ra hệ lụy gì cho xã hội?", "Lây lan bệnh tật và rối loạn trật tự", "Không gây hệ lụy gì đáng lo ngại cả", "Chỉ ảnh hưởng đến một vài cá nhân thôi", "Mại dâm gây nhiều hệ lụy về sức khỏe và trật tự xã hội."],
        ["Vai trò của gia đình trong phòng chống tệ nạn là gì?", "Quan tâm, giáo dục con tránh xa tệ nạn", "Chỉ cần cho con nhiều tiền tiêu vặt", "Mặc kệ con giao du với bất kì ai đó", "Gia đình quan tâm, giáo dục giúp con phòng tránh tệ nạn tốt hơn."],
        ["Khi phát hiện nơi tụ tập sử dụng ma túy, em nên làm gì?", "Báo cho cơ quan công an gần nhất", "Vào xem vì tò mò muốn biết rõ hơn", "Giữ kín không nói cho bất kì ai biết", "Báo công an là việc làm đúng, góp phần giữ an ninh trật tự."],
        ["Rượu bia gây hại gì cho học sinh đang tuổi lớn?", "Ảnh hưởng não bộ và sức khỏe lâu dài", "Giúp học sinh tự tin hơn khi giao tiếp", "Không gây hại gì nếu uống ít mỗi lần", "Rượu bia tác hại đến sự phát triển của thanh thiếu niên."],
        ["Kĩ năng nào giúp em tránh bị lôi kéo vào tệ nạn?", "Kĩ năng từ chối trước lời rủ rê xấu", "Kĩ năng làm theo mọi lời bạn bè rủ", "Kĩ năng giấu cha mẹ mọi hoạt động", "Biết từ chối dứt khoát giúp em tránh xa cám dỗ xấu."],
        ["Tham gia tuyên truyền phòng chống tệ nạn ở trường có ý nghĩa gì?", "Nâng cao nhận thức cho bạn bè xung quanh", "Chỉ để được cộng điểm thi đua của lớp", "Không có ý nghĩa thực tế gì đáng kể", "Tuyên truyền giúp cộng đồng hiểu và phòng tránh tệ nạn."],
        ["Hành vi mua bán ma túy bị xử lí như thế nào?", "Bị truy cứu trách nhiệm hình sự nặng", "Chỉ bị phạt cảnh cáo nhẹ nhàng thôi", "Được coi là kinh doanh bình thường", "Mua bán ma túy là tội phạm bị xử lí nghiêm theo pháp luật."],
        ["Lối sống nào giúp học sinh tránh xa tệ nạn xã hội?", "Lành mạnh, có mục tiêu học tập rõ ràng", "Buông thả, thích gì làm nấy tự do", "Giao du với mọi nhóm bạn không chọn lọc", "Lối sống lành mạnh, có mục tiêu giúp em tránh cám dỗ xấu."],
        ["Khi bị người xấu đe dọa ép tham gia việc phi pháp, em nên làm gì?", "Tìm cách báo người lớn và công an ngay", "Làm theo vì sợ bị người xấu trả thù", "Giấu kín không dám nói với ai cả đâu", "Báo người lớn và công an giúp em được bảo vệ an toàn."],
        ["Tệ nạn xã hội ảnh hưởng đến trật tự địa phương ra sao?", "Gây mất an ninh, trật tự nơi sinh sống", "Làm địa phương trở nên sôi động hơn", "Không ảnh hưởng đến đời sống người dân", "Tệ nạn làm xáo trộn đời sống và an ninh của cộng đồng."],
        ["Học sinh nghiện cờ bạc trên mạng thường dẫn đến hành vi gì?", "Trộm cắp tiền để có tiền chơi tiếp", "Học tập chăm chỉ hơn để kiếm tiền", "Biết quản lí tiền bạc tốt hơn trước", "Nghiện cờ bạc dễ dẫn đến hành vi vi phạm pháp luật khác."],
        ["Để giúp bạn từng sa vào tệ nạn, cộng đồng nên làm gì?", "Động viên bạn cai nghiện và hòa nhập lại", "Xa lánh, kì thị bạn mãi mãi về sau", "Cổ vũ bạn tiếp tục con đường cũ đó", "Động viên, hỗ trợ giúp người lầm lỡ làm lại cuộc đời."],
        ["Mê tín dị đoan được coi là tệ nạn vì lí do gì?", "Lừa đảo tiền bạc, gây mê muội con người", "Chỉ là tín ngưỡng bình thường của dân", "Không gây hại gì cho ai trong xã hội", "Mê tín dị đoan gây thiệt hại và mê muội, cần bài trừ."],
        ["Câu khẩu hiệu nào đúng về phòng chống ma túy?", "Nói không với ma túy, dù chỉ một lần", "Thử ma túy một lần cũng không sao cả", "Ma túy chỉ hại người lớn, không hại trẻ", "Khẩu hiệu nhấn mạnh tuyệt đối tránh xa ma túy."],
        ["Trách nhiệm của học sinh với phòng chống tệ nạn là gì?", "Tự bảo vệ mình và tuyên truyền cho bạn", "Chỉ cần lo việc học, không cần quan tâm", "Đó là việc riêng của cơ quan công an", "Học sinh vừa tự phòng tránh vừa góp phần tuyên truyền."]
      ], [["Ma tuý","Tệ nạn nguy hiểm"],["Từ chối chất lạ","Bảo vệ bản thân"],["Cờ bạc","Tệ nạn xã hội"],["Vui chơi lành mạnh","Phòng chống tệ nạn"],
        ["Cờ bạc ăn tiền", "Tệ nạn vi phạm pháp luật"],
        ["Từ chối rủ rê", "Kĩ năng tránh xa tệ nạn"]], "Nối cho đúng nhé!"),
      topic("gd10","👨‍👩‍👧","Bài 10: Quyền và nghĩa vụ trong gia đình","Quyền và nghĩa vụ của công dân trong gia đình",[
        ["Nghĩa vụ của con cháu đối với ông bà, cha mẹ là gì?", "Kính trọng, chăm sóc, phụng dưỡng khi già yếu", "Không cần quan tâm", "Chỉ nhận mà không cho đi", "Con cháu có nghĩa vụ kính trọng, chăm sóc ông bà cha mẹ."],
        ["Quyền của trẻ em trong gia đình gồm quyền nào?", "Được chăm sóc, học tập, bảo vệ, bày tỏ ý kiến phù hợp", "Quyết định mọi việc trong nhà thay cha mẹ", "Không cần đi học", "Trẻ em có quyền được yêu thương, chăm sóc, học hành."],
        ["Cha mẹ có nghĩa vụ gì với con cái?", "Nuôi dưỡng, giáo dục, bảo vệ con", "Bỏ mặc con tự lo", "Phân biệt đối xử giữa các con", "Cha mẹ có nghĩa vụ và quyền ngang nhau trong chăm sóc con."],
        ["Em muốn đóng góp cho gia đình, việc phù hợp là?", "Làm việc nhà vừa sức, học tập tốt", "Đòi hỏi mua sắm đắt tiền liên tục", "Không làm gì cả", "Việc nhà vừa sức là chia sẻ trách nhiệm gia đình."],
        ["Con cháu kính trọng ông bà thể hiện qua việc nào?", "Thăm hỏi, chăm sóc ông bà thường xuyên", "Chỉ thăm ông bà vào dịp lễ tết lớn", "Nói lời hay nhưng không hề quan tâm", "Thăm hỏi, chăm sóc thường xuyên thể hiện lòng kính trọng."],
        ["Quyền của trẻ em trong gia đình bao gồm quyền nào?", "Được học tập và vui chơi phù hợp", "Được quyết định mọi việc trong nhà", "Không phải làm bất kì việc nhà nào", "Trẻ em có quyền học tập, vui chơi phù hợp với lứa tuổi."],
        ["Cha mẹ có nghĩa vụ gì đối với con cái chưa thành niên?", "Nuôi dưỡng, giáo dục con nên người", "Chỉ cho con tiền tiêu vặt là đủ rồi", "Để con tự lớn lên không cần dạy dỗ", "Nuôi dưỡng, giáo dục là nghĩa vụ cơ bản của cha mẹ."],
        ["Anh chị em trong gia đình nên đối xử với nhau thế nào?", "Yêu thương, nhường nhịn lẫn nhau", "Tranh giành mọi thứ với nhau luôn", "Không cần quan tâm đến nhau gì cả", "Anh chị em yêu thương, nhường nhịn giúp gia đình hòa thuận."],
        ["Khi cha mẹ góp ý về khuyết điểm của em, em nên làm gì?", "Lắng nghe và sửa đổi để tiến bộ hơn", "Cãi lại và bỏ đi không nghe nữa đâu", "Giận dỗi, không nói chuyện với cha mẹ", "Lắng nghe góp ý giúp em hoàn thiện bản thân mỗi ngày."],
        ["Việc nhà nào phù hợp với học sinh lớp 7?", "Quét nhà, rửa bát giúp cha mẹ mình", "Sửa chữa điện nước phức tạp trong nhà", "Gánh vác toàn bộ kinh tế gia đình mình", "Làm việc nhà vừa sức giúp em chia sẻ với cha mẹ."],
        ["Trẻ em có nghĩa vụ gì trong gia đình của mình?", "Kính trọng, vâng lời người lớn dạy bảo", "Làm mọi việc người lớn sai bảo vô điều kiện", "Không có nghĩa vụ gì trong gia đình cả", "Kính trọng, vâng lời dạy bảo đúng là nghĩa vụ của con cháu."],
        ["Cha mẹ không được có hành vi nào đối với con cái?", "Bạo hành, ngược đãi con của mình", "Nhắc nhở khi con mắc lỗi sai phạm", "Đặt ra quy định sinh hoạt trong nhà", "Bạo hành trẻ em là hành vi bị pháp luật nghiêm cấm."],
        ["Gia đình hòa thuận, hạnh phúc cần điều gì?", "Mọi thành viên tôn trọng, chia sẻ nhau", "Chỉ cần có nhiều tiền bạc là đủ rồi", "Mỗi người sống riêng không quan tâm nhau", "Tôn trọng, chia sẻ là nền tảng của gia đình hạnh phúc."],
        ["Khi em bị ốm, cha mẹ chăm sóc em thể hiện quyền nào của em?", "Quyền được chăm sóc sức khỏe đầy đủ", "Quyền được quyết định mọi việc nhà", "Quyền không phải đi học bất cứ lúc nào", "Trẻ em có quyền được chăm sóc sức khỏe từ gia đình."],
        ["Con cái có bổn phận gì khi cha mẹ già yếu?", "Chăm sóc, phụng dưỡng cha mẹ tận tình", "Để cha mẹ tự lo liệu mọi việc một mình", "Chỉ gửi tiền là xong bổn phận của mình", "Phụng dưỡng cha mẹ già là bổn phận của con cái."],
        ["Hành vi nào của cha mẹ vi phạm quyền trẻ em?", "Bắt con bỏ học để đi làm kiếm tiền", "Cho con tham gia lớp học năng khiếu", "Quy định giờ tự học cho con ở nhà", "Bắt trẻ bỏ học đi làm vi phạm quyền được học tập của trẻ."],
        ["Em nên làm gì khi gia đình gặp khó khăn chung?", "Chia sẻ, động viên mọi người trong nhà", "Đòi hỏi cha mẹ đáp ứng mọi nhu cầu mình", "Trách móc cha mẹ vì không lo đủ cho mình", "Chia sẻ, động viên giúp gia đình vượt qua khó khăn."],
        ["Quyền và nghĩa vụ trong gia đình gắn liền với điều gì?", "Tình yêu thương và trách nhiệm chung", "Chỉ dựa trên tiền bạc của gia đình đó", "Chỉ do người lớn quyết định mọi việc", "Quyền và nghĩa vụ xuất phát từ tình thương và trách nhiệm."],
        ["Khi anh trai làm việc sai, em nên ứng xử thế nào?", "Góp ý nhẹ nhàng, tôn trọng anh của mình", "La hét và mách mọi người để anh xấu hổ", "Hùa theo anh làm việc sai trái đó luôn", "Góp ý nhẹ nhàng thể hiện tình cảm anh em và sự tôn trọng."],
        ["Cha mẹ cần đối xử với các con như thế nào?", "Công bằng, không phân biệt đối xử gì", "Thiên vị người con học giỏi hơn hẳn", "Chỉ quan tâm đến con trai trong nhà mình", "Đối xử công bằng giúp các con cảm thấy được yêu thương."],
        ["Trẻ em được bày tỏ ý kiến trong gia đình ở việc nào?", "Việc liên quan trực tiếp đến bản thân mình", "Mọi quyết định kinh tế lớn của gia đình", "Trẻ không được bày tỏ ý kiến gì cả đâu", "Trẻ có quyền bày tỏ ý kiến về việc liên quan đến mình."],
        ["Nghĩa vụ học tập của con trong gia đình được hiểu là gì?", "Chăm chỉ học tập để cha mẹ yên lòng", "Chỉ học khi cha mẹ kiểm tra bài vở mình", "Học thế nào là quyền tự do hoàn toàn", "Chăm chỉ học tập là cách con đền đáp công ơn cha mẹ."],
        ["Khi ông bà kể chuyện xưa, thái độ đúng của cháu là gì?", "Lắng nghe chăm chú và hỏi han ông bà", "Ngắt lời vì cho rằng chuyện đã cũ rồi", "Bỏ đi chơi với bạn cho vui hơn nhiều", "Lắng nghe ông bà thể hiện sự kính trọng và yêu thương."],
        ["Gia đình có trách nhiệm bảo vệ trẻ em khỏi điều gì?", "Mọi hành vi xâm hại, bạo lực gia đình", "Mọi lời nhắc nhở, dạy dỗ của thầy cô", "Mọi hoạt động học tập ở trường của trẻ", "Gia đình là nơi bảo vệ trẻ trước xâm hại và bạo lực."],
        ["Việc em tự giác dọn phòng của mình thể hiện điều gì?", "Trách nhiệm với không gian sống chung", "Chỉ để được cha mẹ khen thưởng mình", "Làm cho qua chuyện khi bị nhắc nhở", "Tự giác dọn dẹp thể hiện ý thức trách nhiệm trong gia đình."],
        ["Mối quan hệ gia đình tốt đẹp được xây dựng bằng gì?", "Yêu thương, tôn trọng và trách nhiệm", "Chỉ bằng vật chất đầy đủ cho mọi người", "Bằng việc mỗi người không can thiệp nhau", "Yêu thương và trách nhiệm là nền tảng của gia đình tốt đẹp."]
      ], [["Con cháu","Kính trọng, chăm sóc"],["Cha mẹ","Nuôi dưỡng, giáo dục"],["Trẻ em","Được chăm sóc, học tập"],["Việc nhà vừa sức","Chia sẻ gia đình"],
        ["Phụng dưỡng cha mẹ già", "Bổn phận của con cái"],
        ["Được học tập, vui chơi", "Quyền của trẻ em"]], "Nối cho đúng nhé!")
    ];
    /* ================= TIN HỌC 7 + CÔNG NGHỆ 7 ================= */
    var TIN7_TOPICS = [
      topic("th1","🖥️","Chủ đề 1: Máy tính và cộng đồng","Thiết bị vào – ra, phần mềm, quản lí dữ liệu",[
        ["Thiết bị nào là thiết bị VÀO?", "Bàn phím, chuột, micro", "Màn hình", "Loa", "Thiết bị vào đưa thông tin vào máy tính: bàn phím, chuột, micro, máy quét."],
        ["Thiết bị nào là thiết bị RA?", "Màn hình, máy in, loa", "Bàn phím", "Chuột", "Thiết bị ra đưa thông tin từ máy tính ra ngoài."],
        ["Phần mềm nào là hệ điều hành?", "Windows", "Microsoft Word", "Trình duyệt Chrome không phải hệ điều hành", "Hệ điều hành quản lí phần cứng và phần mềm khác (Windows, macOS, Linux...)."],
        ["Quản lí dữ liệu trong máy tính bằng cách nào hiệu quả?", "Tạo thư mục theo chủ đề, đặt tên tệp rõ ràng", "Để tất cả tệp chồng chất ở màn hình nền không tên", "Không bao giờ sao lưu", "Thư mục khoa học giúp tìm dữ liệu nhanh và an toàn."],
        ["Tệp (file) và thư mục (folder) khác nhau thế nào?", "Tệp chứa dữ liệu, thư mục chứa tệp và thư mục con", "Giống hệt nhau", "Thư mục chứa phần cứng", "Thư mục là nơi tổ chức các tệp."],
        ["Việc nào giúp bảo vệ dữ liệu?", "Sao lưu (backup) định kì", "Chia sẻ mật khẩu cho mọi người", "Mở mọi tệp lạ đính kèm", "Sao lưu giúp khôi phục dữ liệu khi có sự cố."],
        ["Máy quét có chức năng chính là gì?", "Đưa hình ảnh trên giấy vào máy tính", "Đưa hình ảnh ra giấy in", "Phát âm thanh cho người nghe", "Máy quét số hoá tài liệu giấy thành dữ liệu trong máy tính."],
        ["Khi học trực tuyến, webcam giúp thực hiện việc gì?", "Truyền hình ảnh của người học", "In bài học ra giấy", "Lưu trữ tệp lâu dài", "Webcam ghi hình để người học xuất hiện trên màn hình."],
        ["Phần mềm soạn thảo văn bản thuộc nhóm nào?", "Phần mềm ứng dụng", "Phần mềm hệ thống", "Thiết bị phần cứng", "Phần mềm ứng dụng phục vụ trực tiếp một công việc cụ thể."],
        ["Nhiệm vụ chính của hệ điều hành là gì?", "Quản lí và điều phối tài nguyên máy tính", "Soạn thảo văn bản thay người dùng", "Vẽ hình thay người dùng", "Hệ điều hành điều phối phần cứng và các chương trình khác."],
        ["Để máy tính hoạt động được, cần kết hợp điều gì?", "Phần cứng và phần mềm", "Chỉ cần màn hình", "Chỉ cần bàn phím", "Máy tính cần cả phần cứng lẫn phần mềm để hoạt động."],
        ["Phần mở rộng của tên tệp cho biết điều gì?", "Kiểu dữ liệu của tệp", "Ngày tạo thư mục", "Dung lượng của ổ đĩa", "Phần mở rộng giúp nhận biết tệp thuộc kiểu dữ liệu nào."],
        ["Thư mục con được hiểu là gì?", "Thư mục nằm trong một thư mục khác", "Tệp nằm ngoài mọi thư mục", "Ổ đĩa chứa nhiều thư mục", "Thư mục có thể chứa thư mục con và các tệp bên trong."],
        ["Dung lượng của tệp tin thường được đo bằng đơn vị nào?", "Byte và các bội số của Byte", "Mét và xăng-ti-mét", "Giờ và phút", "Dung lượng tệp được đo bằng Byte, Ki-lô-bai, Mê-ga-bai."],
        ["Khi di chuyển một tệp sang thư mục khác, tệp ở vị trí cũ sẽ thế nào?", "Không còn ở vị trí cũ", "Vẫn còn nguyên ở vị trí cũ", "Tự đổi thành thư mục", "Di chuyển làm tệp chỉ còn ở vị trí mới."],
        ["Sao chép tệp khác di chuyển tệp ở điểm nào?", "Sao chép vẫn giữ lại tệp gốc", "Sao chép xoá luôn tệp gốc", "Sao chép đổi tên tệp gốc", "Sao chép tạo thêm bản sao và giữ nguyên tệp gốc."],
        ["Thùng rác trên màn hình nền chứa những gì?", "Các tệp đã xoá tạm thời", "Các tệp đang soạn thảo", "Các chương trình đang chạy", "Tệp đã xoá được giữ tạm trong thùng rác trước khi xoá hẳn."],
        ["Thiết bị nào tiện để lưu và mang dữ liệu theo người?", "Ổ USB", "Màn hình máy tính", "Loa máy tính", "Ổ USB nhỏ gọn, dễ mang theo để trao đổi dữ liệu."],
        ["Lưu trữ trên đám mây có ưu điểm nổi bật nào?", "Truy cập dữ liệu qua Internet ở nhiều nơi", "Không cần kết nối Internet bao giờ", "Tự in dữ liệu ra giấy", "Dữ liệu trên đám mây có thể mở từ nhiều thiết bị có Internet."],
        ["Virus máy tính gây hại chủ yếu bằng cách nào?", "Phá hoại dữ liệu và làm máy hoạt động sai", "Giúp máy chạy nhanh hơn", "Tự sắp xếp lại thư mục gọn gàng", "Virus là chương trình độc hại gây hư hỏng dữ liệu."],
        ["Nên đặt tên tệp như thế nào để dễ quản lí?", "Ngắn gọn và gợi nhớ nội dung tệp", "Thật dài và không có ý nghĩa", "Giống hệt nhau cho mọi tệp", "Tên tệp gợi nhớ nội dung giúp tìm lại nhanh khi cần."],
        ["Khi tổ chức thư mục khoa học, mỗi thư mục nên chứa nội dung thế nào?", "Các tệp có nội dung liên quan nhau", "Các tệp hoàn toàn không liên quan", "Chỉ chứa một tệp duy nhất", "Nhóm tệp liên quan vào cùng thư mục giúp quản lí dễ dàng."],
        ["Bàn phím cho phép người dùng làm gì chủ yếu?", "Nhập chữ, số và lệnh vào máy tính", "Phát âm thanh ra ngoài", "Hiển thị hình ảnh lên màn hình", "Bàn phím là thiết bị vào để nhập kí tự và lệnh."],
        ["Loa và tai nghe có điểm chung là gì?", "Đều đưa âm thanh ra cho người nghe", "Đều nhập hình ảnh vào máy", "Đều lưu trữ dữ liệu lâu dài", "Loa và tai nghe đều là thiết bị ra về âm thanh."]
      ], [["Bàn phím","Thiết bị vào"],["Màn hình","Thiết bị ra"],["Windows","Hệ điều hành"],["Sao lưu","Bảo vệ dữ liệu"],
        ["Máy quét", "Đưa hình ảnh trên giấy vào máy tính"],
        ["Ổ USB", "Thiết bị lưu trữ dữ liệu di động"],
        ["Lưu trữ đám mây", "Lưu dữ liệu trên Internet"]], "Nối cho đúng nhé!"),
      topic("th2","🌐","Chủ đề 2–3: Mạng xã hội & ứng xử trên mạng","Mạng xã hội, đạo đức và văn hoá số",[
        ["Thông tin nào KHÔNG nên công khai trên mạng xã hội?", "Địa chỉ nhà, trường học chi tiết, số điện thoại cá nhân", "Sở thích âm nhạc chung chung", "Ảnh phong cảnh không có người", "Thông tin cá nhân nhạy cảm cần được bảo vệ."],
        ["Khi nhận tin nhắn lạ yêu cầu gửi mã xác thực / mật khẩu, em nên làm gì?", "Không gửi, báo người lớn", "Gửi ngay", "Chia sẻ cho bạn bè cùng gửi", "Không bao giờ chia sẻ mật khẩu, mã OTP."],
        ["Ứng xử văn minh trên mạng là?", "Tôn trọng người khác, không bình luận xúc phạm", "Nói xấu sau lưng", "Đăng tin giả cho vui", "Văn hoá số: tôn trọng, trung thực, có trách nhiệm."],
        ["Tin giả (fake news) phòng tránh bằng cách nào?", "Kiểm chứng từ nguồn tin cậy trước khi chia sẻ", "Chia sẻ ngay cho nóng", "Tin mọi tiêu đề giật gân", "Kiểm chứng nguồn tin là kĩ năng số quan trọng."],
        ["Mạng xã hội có lợi ích gì nếu dùng đúng cách?", "Kết nối, học tập, chia sẻ thông tin hữu ích", "Chỉ để lãng phí thời gian", "Thay thế hoàn toàn việc học", "Dùng hợp lí, có kiểm soát thời gian thì mạng xã hội có ích."],
        ["Bắt nạt trên mạng (cyberbullying) em xử lí thế nào?", "Chặn, lưu bằng chứng, báo người lớn / nhà trường", "Đáp trả bằng xúc phạm", "Im lặng chịu đựng mãi", "Tìm hỗ trợ và lưu bằng chứng khi bị bắt nạt online."],
        ["Mạng xã hội cho phép người dùng thực hiện hoạt động nào?", "Kết bạn và chia sẻ thông tin với nhau", "Tự sửa chữa phần cứng máy tính", "In tài liệu không cần máy in", "Mạng xã hội kết nối mọi người để trao đổi và chia sẻ."],
        ["Thư điện tử là kênh trao đổi thông tin có đặc điểm nào?", "Gửi và nhận thư qua Internet", "Chỉ gửi được khi gặp mặt trực tiếp", "Chỉ dùng để chơi trò chơi", "Thư điện tử giúp gửi nội dung và tệp đính kèm qua mạng."],
        ["Khi thấy tin nhắn báo trúng thưởng và yêu cầu bấm vào liên kết lạ, em nên làm gì?", "Không bấm vào và báo cho người lớn", "Bấm ngay để nhận thưởng", "Chia sẻ cho nhiều bạn cùng bấm", "Tin nhắn trúng thưởng lạ thường là hình thức lừa đảo."],
        ["Mật khẩu tài khoản mạng xã hội nên được đặt như thế nào?", "Đủ dài và khó đoán với người khác", "Là ngày sinh của bản thân", "Giống hệt tên đăng nhập", "Mật khẩu khó đoán giúp bảo vệ tài khoản khỏi bị xâm nhập."],
        ["Kết bạn với người hoàn toàn xa lạ trên mạng có nguy cơ gì?", "Bị lợi dụng hoặc lừa đảo", "Chắc chắn học giỏi hơn", "Tài khoản tự được bảo mật hơn", "Người lạ trên mạng có thể không đáng tin cậy."],
        ["Chia sẻ vị trí trực tiếp của mình lên mạng xã hội có thể gây điều gì?", "Lộ thông tin về nơi ở và lịch trình", "Giúp tài khoản an toàn hơn", "Tăng tốc độ mạng Internet", "Chia sẻ vị trí trực tiếp làm lộ thông tin riêng tư nguy hiểm."],
        ["Khi thấy nội dung xấu, độc hại trên mạng xã hội, em nên làm gì?", "Dùng chức năng báo cáo nội dung", "Chia sẻ lại cho nhiều người xem", "Bình luận cổ vũ nội dung đó", "Báo cáo giúp quản trị viên xử lí nội dung vi phạm."],
        ["Trước khi đăng ảnh có mặt bạn bè lên mạng, em cần làm gì?", "Hỏi ý kiến và được bạn đồng ý", "Đăng ngay không cần hỏi ai", "Chỉnh sửa ảnh tuỳ ý rồi đăng", "Tôn trọng quyền riêng tư nên cần xin phép người trong ảnh."],
        ["Khi bất đồng ý kiến trong thảo luận trên mạng, em nên ứng xử thế nào?", "Tranh luận văn minh, không công kích cá nhân", "Dùng lời lẽ xúc phạm đối phương", "Lôi kéo nhiều người vào chửi bới", "Tranh luận văn minh tập trung vào ý kiến, không xúc phạm người."],
        ["Việc lập tài khoản giả mạo người khác trên mạng là hành vi thế nào?", "Sai trái và vi phạm quy định", "Thông minh và đáng khuyến khích", "Hoàn toàn bình thường", "Giả mạo người khác gây hại và bị cấm trên mạng xã hội."],
        ["Nhóm trò chuyện của lớp trên mạng nên dùng chủ yếu để làm gì?", "Trao đổi học tập và thông báo của lớp", "Nói xấu bạn bè trong lớp", "Chia sẻ trò chơi suốt ngày đêm", "Nhóm lớp lập ra để phục vụ học tập và liên lạc chung."],
        ["Dấu hiệu nào cho thấy tài khoản của em có thể đã bị xâm nhập?", "Có hoạt động lạ mà em không thực hiện", "Tài khoản vẫn đăng nhập bình thường", "Em vừa đổi ảnh đại diện mới", "Hoạt động lạ không do mình làm là dấu hiệu bị xâm nhập."],
        ["Sử dụng mạng xã hội quá nhiều thời gian mỗi ngày có thể gây hại gì?", "Ảnh hưởng học tập và sức khoẻ", "Giúp mắt sáng và khoẻ hơn", "Không gây ảnh hưởng gì cả", "Dùng mạng quá lâu làm giảm thời gian học và nghỉ ngơi."],
        ["Khi muốn kiểm tra một thông tin trên mạng có đáng tin không, em nên làm gì?", "Đối chiếu với nguồn báo chí chính thống", "Tin ngay nếu nhiều lượt chia sẻ", "Chỉ xem tiêu đề rồi kết luận", "Đối chiếu nhiều nguồn tin cậy giúp tránh tin giả."],
        ["Diễn đàn trực tuyến khác mạng xã hội ở điểm nào nổi bật?", "Thảo luận tập trung theo chủ đề", "Chỉ dùng để xem phim", "Không cho phép đăng bài viết", "Diễn đàn tổ chức thảo luận theo từng chủ đề cụ thể."],
        ["Cuộc gọi video qua Internet giúp ích gì trong học tập?", "Trao đổi trực tiếp dù ở xa nhau", "Thay thế hoàn toàn việc học ở trường", "Chỉ dùng để chơi trò chơi", "Gọi video giúp thầy trò và bạn bè trao đổi từ xa."],
        ["Khi nhận được tệp lạ từ người không quen biết, em nên làm gì?", "Không mở tệp và xoá tin nhắn", "Mở ngay để xem nội dung", "Gửi tiếp cho bạn bè cùng mở", "Tệp lạ có thể chứa mã độc gây hại cho thiết bị."],
        ["Quay lén bạn bè rồi đăng lên mạng là hành vi thế nào?", "Xâm phạm quyền riêng tư của bạn", "Trò đùa vô hại nên làm", "Cách giúp bạn nổi tiếng", "Quay và đăng khi chưa được đồng ý là xâm phạm riêng tư."],
        ["Khi bị quấy rối bằng tin nhắn trên mạng, ngoài việc chặn người đó, em còn nên làm gì?", "Lưu bằng chứng và báo người lớn", "Xoá hết tin nhắn và im lặng chịu đựng", "Trả đũa bằng tin nhắn xúc phạm", "Giữ bằng chứng và nhờ người lớn hỗ trợ xử lí an toàn."],
        ["Viết bình luận trên mạng nên chú ý điều gì về ngôn ngữ?", "Rõ ràng, lịch sự và dễ hiểu", "Viết tắt thật nhiều cho nhanh", "Dùng nhiều từ ngữ khó hiểu", "Ngôn ngữ rõ ràng, lịch sự giúp giao tiếp hiệu quả và văn minh."]
      ], [["Mật khẩu","Không chia sẻ"],["Tin giả","Kiểm chứng nguồn"],["Bắt nạt online","Báo người lớn"],["Văn minh trên mạng","Tôn trọng người khác"],
        ["Thư điện tử", "Gửi và nhận thư qua Internet"],
        ["Báo cáo nội dung xấu", "Gửi phản ánh tới quản trị viên"],
        ["Mật khẩu mạnh", "Kết hợp chữ, số và kí tự đặc biệt"]], "Nối cho đúng nhé!"),
      topic("th3","📊","Chủ đề 4: Bảng tính và trình chiếu","Hàm SUM, AVERAGE, MAX, MIN; trình chiếu",[
        ["Hàm SUM trong bảng tính dùng để làm gì?", "Tính tổng các số", "Tính trung bình", "Tìm số lớn nhất", "SUM: tổng; AVERAGE: trung bình; MAX: lớn nhất; MIN: nhỏ nhất."],
        ["Muốn tính điểm trung bình môn, dùng hàm nào?", "AVERAGE", "SUM", "MAX", "AVERAGE tính giá trị trung bình."],
        ["Công thức trong bảng tính bắt đầu bằng kí tự nào?", "Dấu bằng (=)", "Dấu cộng (+)", "Dấu thăng (#)", "Mọi công thức / hàm đều bắt đầu bằng dấu =."],
        ["Hàm MAX cho kết quả gì?", "Giá trị lớn nhất trong vùng dữ liệu", "Giá trị nhỏ nhất", "Tổng số ô", "MAX → lớn nhất, MIN → nhỏ nhất."],
        ["Khi trình bày bảng tính, định dạng số tiền / phần trăm thuộc bước nào?", "Định dạng dữ liệu trong ô", "In ấn bắt buộc", "Xoá dữ liệu", "Định dạng giúp bảng tính rõ ràng, dễ đọc."],
        ["Một bài trình chiếu tốt cần có gì?", "Nội dung ngắn gọn, hình ảnh phù hợp, chữ dễ đọc", "Chữ dày đặc kín trang", "Màu nền và chữ chói nhau khó đọc", "Trang chiếu hiệu quả: ít chữ, rõ ý, hình minh hoạ hợp lí."],
        ["Ô tính trong bảng tính được xác định bởi điều gì?", "Giao của một hàng và một cột", "Màu sắc của trang tính", "Tên của tệp bảng tính", "Mỗi ô là giao điểm của một hàng và một cột."],
        ["Địa chỉ ô B3 cho biết ô đó thuộc vị trí nào?", "Cột B và hàng 3", "Cột 3 và hàng B", "Trang tính B và ô 3", "Địa chỉ ô gồm chữ cái cột đứng trước số hàng."],
        ["Hộp tên trong bảng tính thường hiển thị thông tin gì?", "Địa chỉ của ô đang được chọn", "Tên của người đang soạn bảng", "Dung lượng của tệp bảng tính", "Hộp tên cho biết địa chỉ ô hiện hành đang chọn."],
        ["Hàm MIN trong bảng tính dùng để làm gì?", "Tìm giá trị nhỏ nhất trong một vùng", "Tìm giá trị lớn nhất trong một vùng", "Đếm số ô có dữ liệu", "Hàm MIN trả về giá trị nhỏ nhất trong các ô được chọn."],
        ["Hàm COUNT trong bảng tính dùng để làm gì?", "Đếm số ô chứa dữ liệu số", "Tính tổng các số trong vùng", "Tính trung bình các số", "Hàm COUNT đếm các ô có chứa số trong vùng dữ liệu."],
        ["Khi sao chép công thức sang ô khác, địa chỉ ô trong công thức thường thay đổi thế nào?", "Tự điều chỉnh theo vị trí mới", "Giữ nguyên tuyệt đối mọi lúc", "Tự xoá khỏi công thức", "Địa chỉ tương đối tự thay đổi khi sao chép công thức."],
        ["Dùng địa chỉ ô trong công thức có lợi ích gì khi dữ liệu thay đổi?", "Kết quả tự cập nhật theo dữ liệu mới", "Phải gõ lại toàn bộ công thức", "Kết quả không bao giờ thay đổi", "Công thức dùng địa chỉ ô sẽ tính lại khi dữ liệu đổi."],
        ["Muốn chèn thêm một hàng mới phía trên hàng đang chọn, em dùng lệnh nào?", "Chèn hàng vào bảng tính", "Xoá toàn bộ trang tính", "Đổi tên tệp bảng tính", "Lệnh chèn hàng giúp bổ sung hàng mà không mất dữ liệu cũ."],
        ["Định dạng tiền tệ cho một cột số trong bảng tính giúp điều gì?", "Hiển thị số kèm đơn vị tiền dễ đọc", "Tự thay đổi giá trị của số", "Xoá các số có giá trị lớn", "Định dạng chỉ thay đổi cách hiển thị, không đổi giá trị số."],
        ["Sắp xếp dữ liệu tăng dần trong bảng tính nghĩa là gì?", "Xếp từ nhỏ đến lớn theo cột chọn", "Xếp từ lớn đến nhỏ theo cột chọn", "Xếp ngẫu nhiên không theo thứ tự", "Sắp xếp tăng dần đưa giá trị nhỏ lên trước."],
        ["Biểu đồ cột trong bảng tính thường dùng để làm gì?", "So sánh dữ liệu giữa các nhóm", "Soạn thảo một đoạn văn dài", "Tạo hiệu ứng cho trang chiếu", "Biểu đồ cột giúp so sánh số liệu một cách trực quan."],
        ["Một tệp bảng tính có thể chứa nhiều thành phần nào sau đây?", "Nhiều trang tính khác nhau", "Nhiều bài trình chiếu", "Nhiều tệp âm thanh dài", "Một bảng tính gồm nhiều trang tính để tổ chức dữ liệu."],
        ["Khi nhập dữ liệu số vào ô tính, số thường được căn lề thế nào mặc định?", "Căn về phía bên phải của ô", "Căn về phía bên trái của ô", "Căn đều ra hai bên ô", "Theo mặc định, dữ liệu số được căn phải trong ô tính."],
        ["Trong bài trình chiếu, mỗi trang chiếu thường nên trình bày thế nào?", "Tập trung vào một ý chính", "Chứa thật nhiều ý không liên quan", "Chỉ toàn chữ dày đặc", "Mỗi trang chiếu rõ một ý giúp người xem dễ theo dõi."],
        ["Mẫu định dạng trong phần mềm trình chiếu giúp ích gì?", "Tạo giao diện thống nhất cho bài trình chiếu", "Tự viết nội dung thay người làm", "Xoá các trang chiếu thừa", "Mẫu định dạng cho sẵn màu sắc, phông chữ thống nhất."],
        ["Để chèn hình ảnh vào trang chiếu, em cần thực hiện thao tác nào?", "Chọn lệnh chèn ảnh và chọn tệp ảnh", "Gõ công thức bắt đầu bằng dấu bằng", "Đổi tên tệp trình chiếu", "Lệnh chèn ảnh đưa hình từ tệp vào trang chiếu."],
        ["Thay đổi kích thước đối tượng trên trang chiếu bằng cách nào?", "Kéo các nút ở góc hoặc cạnh đối tượng", "Đổi tên của trang chiếu", "Thay đổi màu nền máy tính", "Kéo nút điều khiển ở góc giúp phóng to, thu nhỏ đối tượng."],
        ["Hiệu ứng chuyển trang trong trình chiếu tác động lên đối tượng nào?", "Toàn bộ trang chiếu khi sang trang mới", "Một chữ cái trong đoạn văn", "Một ô trong bảng tính", "Hiệu ứng chuyển trang áp dụng khi chuyển giữa các trang."],
        ["Tiêu đề của trang chiếu nên được viết thế nào?", "Ngắn gọn và đúng ý chính của trang", "Thật dài thành một đoạn văn", "Không cần liên quan nội dung trang", "Tiêu đề ngắn gọn giúp người xem nắm ý chính nhanh."],
        ["Trước khi trình chiếu trước lớp, em nên làm gì để bài thuyết trình tốt hơn?", "Kiểm tra lỗi và tập trình bày trước", "Không cần xem lại bài lần nào", "Thêm thật nhiều trang vào phút cuối", "Kiểm tra và luyện tập trước giúp trình bày tự tin, ít lỗi."]
      ], [["SUM","Tính tổng"],["AVERAGE","Tính trung bình"],["MAX","Giá trị lớn nhất"],["MIN","Giá trị nhỏ nhất"],
        ["Hàm MIN", "Tìm giá trị nhỏ nhất"],
        ["Địa chỉ ô B3", "Cột B, hàng 3"],
        ["Biểu đồ cột", "So sánh dữ liệu trực quan"]], "Nối hàm với công dụng nhé!"),
      { id:"th4", emoji:"🔍", name:"Chủ đề 5: Thuật toán tìm kiếm, sắp xếp", sub:"Tìm kiếm tuần tự, nhị phân; sắp xếp", pools:{ choose:[
          function(){ return mcqQ("Thuật toán tìm kiếm tuần tự thực hiện như thế nào?", ["Chỉ kiểm tra phần tử giữa"], "Xét lần lượt từng phần tử từ đầu đến cuối cho đến khi tìm thấy", "Tìm kiếm tuần tự duyệt từng phần tử theo thứ tự."); },
          function(){ return mcqQ("Tìm kiếm nhị phân yêu cầu danh sách phải thế nào trước?", ["Chưa sắp xếp cũng được"], "Đã được sắp xếp", "Tìm kiếm nhị phân chỉ áp dụng trên danh sách đã sắp xếp, mỗi bước loại một nửa."); },
          function(){ return mcqQ("Mỗi bước của tìm kiếm nhị phân làm gì?", ["Tăng gấp đôi vùng tìm kiếm"], "So sánh với phần tử giữa, loại bỏ một nửa danh sách", "So sánh phần tử giữa để thu hẹp một nửa vùng tìm kiếm."); },
          function(){ return mcqQ("Thuật toán sắp xếp nổi bọt (bubble sort) hoạt động bằng cách nào?", ["Đổi chỗ ngẫu nhiên"], "So sánh và đổi chỗ các cặp phần tử kề nhau không đúng thứ tự, lặp lại đến khi sorted", "Bubble sort: các phần tử lớn “nổi” dần về cuối qua các lượt đổi chỗ kề nhau."); },
          function(){ return mcqQ("Tìm trong danh sách 100 phần tử đã sắp xếp, tìm kiếm nhị phân cần tối đa khoảng mấy lần so sánh?", ["100 lần"], "Khoảng 7 lần", "Mỗi lần giảm một nửa: 100 → 50 → 25 → 13 → 7 → 4 → 2 → 1, khoảng 7 lần."); }
        ], blank:[], match:[], games:[
          function(){ return sortQ("Mô phỏng sắp xếp: chạm các số theo thứ tự tăng dần (kết quả của thuật toán sắp xếp)!", ["3","7","9","12","15"]); },
          function(){ return sortQ("Mô phỏng sắp xếp giảm dần: chạm các số từ lớn đến bé!", ["20","14","9","5","2"]); }
        ] } }
    ];
    var CN7_TOPICS = [
      { id:"cn1", emoji:"🌾", name:"Chương I: Trồng trọt", sub:"Làm đất → gieo trồng → chăm sóc → thu hoạch; nhân giống vô tính", pools:{ choose:[
          function(){ return mcqQ("Quy trình trồng trọt đúng thứ tự là?", ["Gieo trồng → làm đất → thu hoạch"], "Làm đất → gieo trồng → chăm sóc → thu hoạch", "Bốn bước cơ bản của trồng trọt theo đúng trình tự."); },
          function(){ return mcqQ("Mục đích của làm đất là gì?", ["Làm đất cứng lại", "Trang trí ruộng"], "Làm đất tơi xốp, diệt cỏ dại, mầm bệnh", "Làm đất tạo điều kiện tốt cho hạt nảy mầm và cây phát triển."); },
          function(){ return mcqQ("Nhân giống vô tính cây trồng gồm các cách nào?", ["Thụ phấn chéo"], "Giâm, chiết, ghép cành", "Giâm, chiết, ghép là nhân giống vô tính, giữ đặc tính cây mẹ."); },
          function(){ return mcqQ("Phòng trừ sâu bệnh cho cây trồng nên ưu tiên biện pháp nào trước?", ["Phun thuốc hoá học liều cao ngay"], "Biện pháp canh tác, sinh học, bắt tay; hoá học là cuối cùng và đúng liều", "Quản lí dịch hại tổng hợp ưu tiên biện pháp an toàn trước."); },
          function(){ return mcqQ("Thu hoạch sản phẩm trồng trọt cần chú ý điều gì?", ["Thu càng non càng tốt", "Để quá chín rụng hết"], "Thu hoạch đúng độ chín, nhẹ nhàng tránh dập nát", "Thu hoạch đúng lúc đảm bảo chất lượng sản phẩm."); }
        ], blank:[], match:[], games:[
          function(){ return sortQ("Sắp xếp quy trình trồng cây theo đúng thứ tự!", ["Làm đất","Gieo trồng","Chăm sóc","Thu hoạch"]); }
        ] } },
      topic("cn2","🌲","Chương II: Lâm nghiệp","Giới thiệu về rừng; trồng, chăm sóc, bảo vệ rừng",[
        ["Rừng có vai trò quan trọng nào?", "Điều hoà khí hậu, giữ đất, giữ nước, là nơi sống của nhiều sinh vật", "Chỉ để lấy gỗ", "Không có vai trò môi trường", "Rừng là “lá phổi” và tấm chắn tự nhiên của môi trường."],
        ["Hành động nào bảo vệ rừng?", "Không chặt phá rừng bừa bãi, phòng cháy rừng", "Đốt rừng làm nương không kiểm soát", "Săn bắt động vật rừng tuỳ tiện", "Bảo vệ rừng là trách nhiệm của mọi người."],
        ["Trồng rừng nên chọn thời vụ thế nào?", "Đầu mùa mưa để cây dễ sống", "Giữa mùa khô hạn nhất", "Bất kì lúc nào cũng như nhau", "Trồng đầu mùa mưa giúp cây đủ nước, tỉ lệ sống cao."],
        ["Chăm sóc rừng trồng gồm việc gì?", "Làm cỏ, bón phân, tỉa thưa, phòng trừ sâu bệnh", "Bỏ mặc hoàn toàn", "Chặt cây non", "Chăm sóc giúp rừng sinh trưởng tốt."],
        ["Phá rừng gây hậu quả gì?", "Xói mòn đất, lũ lụt, mất đa dạng sinh học", "Không hậu quả gì", "Làm khí hậu mát hơn chắc chắn", "Mất rừng gây nhiều thiên tai và suy giảm sinh thái."],
        ["Rừng phòng hộ đầu nguồn có tác dụng gì nổi bật?", "Giữ nước, chống xói mòn, giảm lũ", "Chỉ để tham quan", "Làm đường cao tốc", "Rừng đầu nguồn điều tiết nước, bảo vệ đất."],
        ["Rừng sản xuất được trồng và khai thác chủ yếu để làm gì?", "Cung cấp gỗ và các lâm sản", "Chỉ để ngắm cảnh du lịch", "Cấm mọi hoạt động khai thác", "Rừng sản xuất cung cấp gỗ, lâm sản phục vụ đời sống và kinh tế."],
        ["Rừng đặc dụng gồm những khu rừng nào điển hình?", "Vườn quốc gia và khu bảo tồn thiên nhiên", "Rừng trồng keo lấy gỗ", "Rừng ngập mặn ven biển nuôi tôm", "Rừng đặc dụng dùng để bảo tồn thiên nhiên và nghiên cứu."],
        ["Rừng phòng hộ ven biển có tác dụng nổi bật nào?", "Chắn gió bão và chống cát bay, xói lở", "Cung cấp gỗ quý để xuất khẩu", "Làm nơi nuôi gà thịt tập trung", "Rừng ven biển bảo vệ đất và làng mạc trước gió bão, cát bay."],
        ["Khai thác rừng hợp lí cần tuân thủ nguyên tắc nào?", "Khai thác không vượt quá khả năng phục hồi của rừng", "Khai thác toàn bộ cây trong một lần", "Chỉ khai thác cây non còn nhỏ", "Khai thác chọn lọc và trồng lại giúp rừng bền vững."],
        ["Tỉa thưa trong chăm sóc rừng trồng nhằm mục đích gì?", "Loại bỏ cây yếu để cây còn lại có không gian lớn", "Chặt bỏ toàn bộ cây khoẻ nhất", "Làm rừng rậm rạp thêm nữa", "Tỉa thưa giảm mật độ, giúp cây còn lại sinh trưởng tốt."],
        ["Chăm sóc rừng trồng trong những năm đầu cần làm công việc nào?", "Làm cỏ, xới đất và bón phân quanh gốc", "Không cần chăm sóc gì thêm", "Chặt bỏ cây trồng chính", "Rừng mới trồng cần làm cỏ, xới đất, bón phân để cây lớn nhanh."],
        ["Đường băng cản lửa trong rừng có tác dụng gì?", "Ngăn lửa cháy lan rộng trong rừng", "Dẫn nước tưới vào rừng", "Làm đường cho khách du lịch", "Đường băng trống cây giúp chặn đám cháy rừng lan rộng."],
        ["Mùa khô kéo dài làm tăng nguy cơ nào đối với rừng?", "Nguy cơ cháy rừng cao hơn", "Cây rừng ngừng rụng lá", "Đất rừng ẩm ướt hơn hẳn", "Mùa khô, lá khô dễ bắt lửa nên nguy cơ cháy rừng tăng."],
        ["Trồng rừng bằng cây con có bầu có ưu điểm gì?", "Cây dễ sống và sinh trưởng nhanh hơn", "Không cần tưới nước lần nào", "Cây cho thu hoạch ngay sau trồng", "Cây con có bầu giữ rễ nguyên vẹn nên tỉ lệ sống cao."],
        ["Hạt giống trồng rừng cần đạt yêu cầu nào?", "Hạt chắc, khoẻ và đúng giống tốt", "Hạt lép và mốc cũng dùng được", "Hạt thu từ cây sâu bệnh nặng", "Giống tốt là nền tảng để rừng trồng sinh trưởng khoẻ."],
        ["Việc khoanh nuôi phục hồi rừng nghĩa là làm gì?", "Bảo vệ để rừng tự tái sinh tự nhiên", "Chặt trắng rừng rồi trồng mới", "Xây dựng nhà ở trong rừng", "Khoanh nuôi bảo vệ diện tích rừng để cây tự mọc lại."],
        ["Sâu bệnh hại rừng nếu không phòng trừ kịp thời sẽ gây hậu quả gì?", "Cây rừng chết hàng loạt, giảm diện tích rừng", "Cây rừng lớn nhanh hơn hẳn", "Tăng chất lượng gỗ rõ rệt", "Sâu bệnh lan rộng làm rừng suy thoái và chết cây."],
        ["Người dân sống gần rừng có thể bảo vệ rừng bằng việc nào?", "Không đốt nương làm rẫy trái phép trong rừng", "Tự ý khai thác gỗ quý để bán", "Săn bắt động vật rừng quý hiếm", "Không đốt phá rừng là việc thiết thực để bảo vệ rừng."],
        ["Rừng giúp điều hoà khí hậu địa phương bằng cách nào?", "Giữ ẩm và làm mát không khí xung quanh", "Làm không khí khô nóng hơn", "Ngăn hoàn toàn mưa rơi xuống đất", "Tán rừng giữ ẩm, giảm nhiệt độ và điều hoà khí hậu."],
        ["Động vật rừng quý hiếm cần được bảo vệ vì lí do gì?", "Góp phần giữ đa dạng sinh học của rừng", "Để săn bắt phục vụ du lịch", "Chúng gây hại cho cây rừng", "Bảo vệ động vật quý hiếm giữ cân bằng hệ sinh thái rừng."],
        ["Khi phát hiện cháy rừng, việc cần làm ngay là gì?", "Báo cho lực lượng kiểm lâm và chính quyền", "Tự ý bỏ đi không thông báo ai", "Đốt thêm vùng xung quanh", "Báo ngay giúp lực lượng chức năng dập lửa kịp thời."],
        ["Trồng rừng trên đất trống đồi trọc giúp hạn chế thiên tai nào?", "Lũ quét và sạt lở đất", "Động đất và sóng thần", "Băng giá và tuyết rơi", "Rễ cây giữ đất nên giảm xói mòn, lũ quét và sạt lở."],
        ["Gỗ rừng trồng được khai thác khi nào là hợp lí?", "Khi cây đạt tuổi và kích thước khai thác", "Ngay sau khi cây mới bén rễ", "Bất cứ lúc nào tuỳ ý thích", "Khai thác đúng tuổi giúp gỗ đạt chất lượng và hiệu quả cao."],
        ["Làm cỏ và phát quang quanh gốc cây rừng non giúp cây thế nào?", "Giảm cạnh tranh ánh sáng và dinh dưỡng", "Làm cây chậm lớn hơn hẳn", "Thu hút sâu bệnh đến gốc cây", "Phát quang giúp cây non nhận đủ ánh sáng và dinh dưỡng."],
        ["Lâm nghiệp bền vững hướng tới mục tiêu nào?", "Khai thác gắn liền với trồng và bảo vệ rừng", "Khai thác hết rừng trong thời gian ngắn", "Chỉ trồng rừng mà không chăm sóc", "Phát triển bền vững cân bằng khai thác và bảo vệ rừng."]
      ], [["Rừng","Điều hoà khí hậu, giữ đất"],["Đầu mùa mưa","Thời vụ trồng rừng"],["Chặt phá rừng","Gây xói mòn, lũ lụt"],["Phòng cháy","Bảo vệ rừng"],
        ["Rừng sản xuất", "Cung cấp gỗ và lâm sản"],
        ["Rừng đặc dụng", "Bảo tồn thiên nhiên và nghiên cứu"],
        ["Đường băng cản lửa", "Ngăn cháy rừng lan rộng"]], "Nối cho đúng nhé!"),
      topic("cn3","🐔","Chương III: Chăn nuôi","Nuôi dưỡng, chăm sóc, phòng trị bệnh vật nuôi",[
        ["Nuôi dưỡng vật nuôi tốt cần đảm bảo điều gì?", "Đủ chất dinh dưỡng theo giai đoạn sinh trưởng", "Chỉ cho ăn một loại thức ăn mãi", "Nhịn ăn thường xuyên", "Khẩu phần cân đối giúp vật nuôi lớn nhanh, khoẻ mạnh."],
        ["Chuồng trại chăn nuôi cần điều kiện gì?", "Thoáng mát, khô ráo, sạch sẽ, đủ ánh sáng", "Kín mít, ẩm ướt, bẩn", "Càng chật càng tốt", "Chuồng tốt giảm bệnh tật cho vật nuôi."],
        ["Phòng bệnh cho vật nuôi bằng cách nào quan trọng?", "Tiêm vắc-xin định kì, vệ sinh chuồng trại", "Chỉ chữa khi bệnh nặng", "Không cần phòng bệnh", "Phòng bệnh hơn chữa bệnh trong chăn nuôi."],
        ["Khi vật nuôi bị bệnh, việc làm đúng là?", "Cách li con bệnh, báo thú y", "Bán ngay cho người khác", "Để chung đàn cho lây đều", "Cách li và điều trị đúng cách tránh lây lan."],
        ["Nuôi gà thịt trong nông hộ cần chú ý giai đoạn gà con điều gì?", "Úm ấm, đủ nhiệt độ, thức ăn dễ tiêu", "Để gà con chịu lạnh", "Không cho uống nước", "Gà con cần úm ấm cẩn thận những tuần đầu."],
        ["Thức ăn của vật nuôi gồm những nhóm chất chính nào?", "Chất đạm, bột đường, béo, khoáng, vitamin", "Chỉ nước", "Chỉ cỏ khô cho mọi loài", "Khẩu phần đầy đủ nhóm chất giúp vật nuôi phát triển cân đối."],
        ["Chăn nuôi có vai trò nào đối với đời sống con người?", "Cung cấp thịt, trứng, sữa cho con người", "Chỉ cung cấp phân bón cho cây", "Không liên quan đến thực phẩm", "Chăn nuôi cung cấp thực phẩm giàu dinh dưỡng hằng ngày."],
        ["Chọn giống vật nuôi tốt cần dựa vào tiêu chí nào?", "Ngoại hình khoẻ mạnh và năng suất cao", "Con vật ốm yếu và chậm lớn", "Chỉ dựa vào màu lông đẹp", "Giống tốt phải khoẻ mạnh, đúng đặc điểm giống và năng suất cao."],
        ["Thức ăn thô xanh cho vật nuôi gồm những loại nào điển hình?", "Cỏ tươi và rau xanh", "Cám gạo và ngô hạt", "Muối khoáng và vitamin", "Thức ăn thô xanh gồm cỏ, rau cung cấp chất xơ cho vật nuôi."],
        ["Thức ăn tinh cho vật nuôi có đặc điểm gì?", "Giàu năng lượng như ngô, cám", "Chỉ gồm nước uống hằng ngày", "Toàn là cỏ khô và rơm rạ", "Thức ăn tinh như ngô, cám cung cấp nhiều năng lượng."],
        ["Nước uống cho vật nuôi cần đảm bảo yêu cầu nào?", "Sạch và được cung cấp đầy đủ mỗi ngày", "Nước bẩn cũng dùng bình thường", "Chỉ cho uống khi vật nuôi khát", "Nước sạch đầy đủ giúp vật nuôi khoẻ mạnh, lớn nhanh."],
        ["Vệ sinh chuồng trại định kì giúp phòng ngừa điều gì?", "Mầm bệnh phát sinh và lây lan", "Vật nuôi tăng cân nhanh hơn", "Thức ăn tự tăng thêm dinh dưỡng", "Chuồng sạch, khử trùng định kì làm giảm mầm bệnh."],
        ["Khi vật nuôi có dấu hiệu bệnh nặng, người nuôi nên làm gì?", "Liên hệ thú y để được hướng dẫn điều trị", "Tự tăng gấp đôi liều thuốc tuỳ ý", "Bán ngay con bệnh cho người khác", "Nhờ thú y giúp chẩn đoán và điều trị đúng, an toàn."],
        ["Gà thịt nuôi trong nông hộ thường được nuôi theo hình thức nào?", "Nuôi trên nền chuồng có đệm lót", "Thả hoàn toàn ngoài biển", "Nuôi trong bể nước sâu", "Gà thịt nông hộ thường nuôi nhốt trên nền có đệm lót khô."],
        ["Đệm lót chuồng gà cần giữ ở trạng thái nào?", "Khô ráo và không ẩm mốc", "Ướt sũng và bốc mùi nặng", "Đổ đầy nước hằng ngày", "Đệm lót khô giúp chuồng sạch, gà ít bệnh đường hô hấp."],
        ["Mật độ nuôi gà quá dày trong chuồng gây hậu quả gì?", "Gà dễ stress, chậm lớn và dễ bệnh", "Gà lớn nhanh và khoẻ hơn hẳn", "Chuồng tự sạch hơn bình thường", "Nuôi quá dày làm gà cạnh tranh thức ăn, dễ sinh bệnh."],
        ["Nhiệt độ úm gà con trong tuần đầu cần đảm bảo thế nào?", "Đủ ấm khoảng ba mươi hai đến ba mươi bốn độ", "Càng lạnh càng tốt cho gà con", "Không cần quan tâm nhiệt độ úm", "Gà con mới nở cần úm ấm để tránh chết rét và yếu."],
        ["Quan sát đàn gà tụm lại dưới đèn úm cho thấy điều gì?", "Gà đang bị lạnh và cần tăng nhiệt", "Gà đang quá nóng cần giảm nhiệt", "Gà đang rất thoải mái, bình thường", "Gà tụm lại và kêu nhiều là dấu hiệu chuồng đang lạnh."],
        ["Thức ăn cho gà thịt thay đổi theo giai đoạn tuổi như thế nào?", "Gà nhỏ cần nhiều đạm hơn gà lớn", "Mọi giai đoạn dùng giống hệt nhau", "Gà lớn cần nhiều đạm nhất", "Gà con cần tỉ lệ đạm cao để phát triển cơ thể nhanh."],
        ["Lập kế hoạch chăn nuôi trong gia đình cần dự tính khoản nào?", "Chi phí giống, thức ăn và chuồng trại", "Chỉ cần tính tiền bán sản phẩm", "Không cần tính chi phí thức ăn", "Kế hoạch rõ chi phí giúp chăn nuôi hiệu quả, tránh lỗ."],
        ["Tiêm phòng cho vật nuôi cần thực hiện vào thời điểm nào?", "Theo lịch phòng bệnh của thú y địa phương", "Chỉ tiêm khi vật nuôi đã bệnh nặng", "Tiêm bất cứ lúc nào cũng giống nhau", "Tiêm đúng lịch giúp vật nuôi phòng bệnh chủ động, hiệu quả."],
        ["Phân và chất thải chăn nuôi nên được xử lí thế nào?", "Ủ hoai hoặc qua hầm biogas trước khi dùng", "Đổ thẳng ra ao hồ gần nhà", "Để tràn lan quanh chuồng trại", "Xử lí chất thải đúng cách giảm ô nhiễm và mầm bệnh."],
        ["Vật nuôi mới mua về nên được xử lí thế nào trước khi nhập đàn?", "Nuôi cách li theo dõi một thời gian", "Thả ngay chung với đàn cũ", "Không cần kiểm tra sức khoẻ", "Cách li vật nuôi mới giúp phát hiện bệnh trước khi nhập đàn."],
        ["Chuồng nuôi gà thịt cần có hệ thống nào để gà không bị nóng vào mùa hè?", "Thông gió và làm mát chuồng", "Bịt kín mọi khe hở của chuồng", "Tắt hết quạt thông gió", "Thông gió tốt giúp chuồng mát, gà ăn khoẻ và lớn nhanh."],
        ["Dụng cụ cho vật nuôi ăn uống cần được vệ sinh thế nào?", "Rửa sạch hằng ngày, tránh thức ăn ôi thiu", "Không cần rửa trong suốt vụ nuôi", "Chỉ rửa khi dụng cụ đã bẩn nặng", "Máng ăn uống sạch giúp vật nuôi tránh bệnh đường ruột."],
        ["Gà thịt đạt hiệu quả kinh tế tốt khi nào?", "Tăng trọng nhanh và tiêu tốn ít thức ăn", "Ăn nhiều nhưng tăng trọng rất chậm", "Thường xuyên bị bệnh trong vụ nuôi", "Hiệu quả thể hiện ở tăng trọng nhanh, ít hao tốn thức ăn."]
      ], [["Vắc-xin","Phòng bệnh"],["Chuồng thoáng sạch","Giảm bệnh tật"],["Úm gà con","Giữ ấm tuần đầu"],["Con bệnh","Cách li, chữa trị"],
        ["Thức ăn tinh", "Ngô và cám giàu năng lượng"],
        ["Đệm lót chuồng gà", "Giữ chuồng khô ráo, sạch sẽ"],
        ["Kế hoạch chăn nuôi", "Dự tính giống, thức ăn, chuồng trại"]], "Nối cho đúng nhé!"),
      topic("cn4","🐟","Chương IV: Thuỷ sản","Giới thiệu thuỷ sản; nuôi cá ao, nuôi cá cảnh",[
        ["Trước khi thả cá giống vào ao nuôi cần làm gì?", "Cải tạo ao, gây màu nước, chọn cá giống khoẻ", "Thả ngay vào ao bẩn", "Không cần chuẩn bị ao", "Chuẩn bị ao tốt giúp cá sống khoẻ, ít bệnh."],
        ["Cá giống tốt có đặc điểm gì?", "Khoẻ mạnh, bơi nhanh nhẹn, không dị hình, kích cỡ đồng đều", "Lờ đờ, nhiều vết thương", "Càng nhỏ yếu càng tốt", "Chọn giống khoẻ là khâu quan trọng trong nuôi cá."],
        ["Cho cá ăn cần chú ý điều gì?", "Đúng lượng, đúng giờ, thức ăn chất lượng; tránh thừa gây ô nhiễm nước", "Càng nhiều càng tốt mọi lúc", "Một tuần cho ăn một lần là đủ cho cá thịt", "Cho ăn hợp lí giúp cá lớn nhanh và nước ao sạch."],
        ["Nuôi cá cảnh trong bể cần thiết bị hỗ trợ nào thường dùng?", "Máy lọc nước, sủi oxi", "Đèn sưởi công suất cực lớn sát mặt nước", "Không cần gì cả mãi mãi", "Lọc và sủi oxi giữ nước sạch, đủ oxi cho cá cảnh."],
        ["Dấu hiệu cá bị bệnh thường gặp là?", "Cá bơi lờ đờ, bỏ ăn, có đốm lạ trên thân", "Cá bơi nhanh nhẹn, ăn mạnh", "Cá sinh trưởng đều", "Quan sát sớm giúp xử lí bệnh kịp thời."],
        ["Thuỷ sản cung cấp cho con người điều gì?", "Thực phẩm giàu đạm và nguồn thu nhập", "Chỉ để ngắm ở mọi loại", "Không có giá trị kinh tế", "Thuỷ sản là ngành kinh tế quan trọng, thực phẩm giàu dinh dưỡng."],
        ["Thuỷ sản gồm những đối tượng nuôi và khai thác nào?", "Cá, tôm và các loài sống dưới nước", "Chỉ gồm các loại cây trồng cạn", "Chỉ gồm gia súc và gia cầm", "Thuỷ sản là các loài sinh vật sống và nuôi trong môi trường nước."],
        ["Ao nuôi cá cần chọn vị trí có điều kiện nào thuận lợi?", "Gần nguồn nước sạch, dễ cấp và thoát nước", "Gần khu nước thải công nghiệp", "Nơi hoàn toàn không có nước ra vào", "Vị trí ao tốt giúp quản lí nước và chăm sóc cá dễ dàng."],
        ["Bước tát cạn và phơi đáy ao trước vụ nuôi có tác dụng gì?", "Diệt mầm bệnh và làm đáy ao sạch hơn", "Làm cá trong ao lớn nhanh hơn", "Tăng lượng bùn đen trong ao", "Phơi đáy ao giúp tiêu diệt mầm bệnh còn sót lại."],
        ["Bón vôi xuống ao nuôi cá nhằm mục đích gì?", "Khử chua và diệt tạp, mầm bệnh ở đáy ao", "Làm nước ao đục thêm nhiều", "Cung cấp thức ăn trực tiếp cho cá", "Vôi giúp cải tạo đáy ao, khử chua và diệt mầm bệnh."],
        ["Trước khi thả cá, nước lấy vào ao cần được xử lí thế nào?", "Lọc qua lưới để ngăn cá tạp và địch hại", "Lấy thẳng nước bẩn không cần lọc", "Đổ thêm nước thải vào ao", "Lọc nước ngăn sinh vật gây hại xâm nhập vào ao nuôi."],
        ["Mật độ thả cá quá dày trong ao sẽ gây hậu quả gì?", "Cá thiếu ôxi, chậm lớn và dễ bệnh", "Cá lớn nhanh hơn bình thường", "Nước ao tự trong sạch hơn", "Thả quá dày làm cá cạnh tranh thức ăn và ôxi trong nước."],
        ["Thức ăn của cá nuôi ao gồm những dạng nào phổ biến?", "Thức ăn tự nhiên và thức ăn bổ sung", "Chỉ gồm cỏ khô trên bờ ao", "Chỉ gồm thức ăn cho gà thịt", "Cá ao ăn sinh vật tự nhiên và thức ăn người nuôi bổ sung."],
        ["Cho cá ăn thừa quá nhiều sẽ gây tác hại gì cho ao nuôi?", "Thức ăn thừa làm ô nhiễm nước ao", "Nước ao trong sạch hơn hẳn", "Cá tự khoẻ mạnh hơn nhiều", "Thức ăn thừa phân huỷ làm nước bẩn, cá dễ thiếu ôxi."],
        ["Hiện tượng cá nổi đầu hàng loạt vào sáng sớm cho thấy điều gì?", "Nước ao đang thiếu ôxi cho cá", "Cá đang rất khoẻ và no đủ", "Nước ao có chất lượng rất tốt", "Cá nổi đầu là dấu hiệu thiếu ôxi, cần xử lí kịp thời."],
        ["Thay nước hoặc bổ sung nước mới cho ao nuôi giúp ích gì?", "Cải thiện chất lượng nước cho cá sống tốt", "Làm cá ngừng ăn hoàn toàn", "Khiến đáy ao tích tụ thêm bùn bẩn", "Nước mới giúp giảm chất độc và tăng ôxi trong ao."],
        ["Thu hoạch cá ao có thể thực hiện theo hình thức nào?", "Thu hoạch từng phần hoặc toàn bộ ao", "Chỉ thu hoạch bằng cách phơi khô ao", "Không được thu hoạch cá đã lớn", "Người nuôi có thể thu tỉa cá lớn hoặc thu toàn bộ vụ."],
        ["Bể cá cảnh cần đặt ở vị trí nào trong nhà là phù hợp?", "Nơi thoáng, tránh nắng gắt chiếu trực tiếp", "Ngoài sân dưới nắng cả ngày", "Cạnh bếp nấu ăn nhiều khói dầu", "Đặt bể tránh nắng gắt giúp nước ổn định, cá khoẻ."],
        ["Cây thuỷ sinh trong bể cá cảnh có vai trò gì?", "Tạo ôxi và nơi trú ẩn cho cá", "Làm nước bể đục và bẩn hơn", "Cản trở hoàn toàn cá bơi lội", "Cây thuỷ sinh làm đẹp bể, tạo ôxi và chỗ ẩn cho cá."],
        ["Khi nuôi cá cảnh, nên thay nước bể theo cách nào?", "Thay một phần nước định kì mỗi tuần", "Thay toàn bộ nước mỗi ngày", "Không bao giờ thay nước bể", "Thay một phần nước giúp môi trường bể ổn định cho cá."],
        ["Cho cá cảnh ăn quá nhiều trong một lần gây hậu quả gì?", "Thức ăn thừa làm bẩn nước bể nhanh", "Cá cảnh lớn nhanh gấp đôi ngay", "Nước bể tự trong hơn bình thường", "Ăn thừa làm nước bẩn, cá cảnh dễ sinh bệnh."],
        ["Lập kế hoạch nuôi cá cảnh cần dự tính chi phí nào?", "Bể, cá giống, thức ăn và thiết bị lọc", "Chỉ cần tính tiền mua cá giống", "Không cần tính tiền điện và thiết bị", "Kế hoạch chi phí đầy đủ giúp nuôi cá cảnh hiệu quả."],
        ["Cá giống thả nuôi cần được chọn từ nguồn nào?", "Nguồn uy tín, cá khoẻ và đồng đều", "Nguồn không rõ ràng, cá yếu ớt", "Cá bắt từ ao nước ô nhiễm", "Giống tốt từ nguồn uy tín giúp vụ nuôi đạt hiệu quả cao."],
        ["Vệ sinh ao và dụng cụ nuôi cá giúp phòng ngừa điều gì?", "Bệnh lây lan cho cá trong vụ nuôi", "Cá tăng trọng nhanh gấp đôi", "Nước ao tự giàu dinh dưỡng hơn", "Vệ sinh tốt làm giảm mầm bệnh trong môi trường nuôi."],
        ["Nuôi cá ao kết hợp thả vịt trên mặt ao cần lưu ý điều gì?", "Không thả vịt quá nhiều gây ô nhiễm nước", "Thả càng nhiều vịt càng tốt cho cá", "Vịt giúp nước ao sạch hoàn toàn", "Mật độ vịt cao làm nước bẩn, ảnh hưởng cá nuôi trong ao."],
        ["Kiểm tra cá nuôi thường xuyên giúp người nuôi làm gì?", "Phát hiện sớm cá yếu, bệnh để xử lí kịp thời", "Không cần thiết trong suốt vụ nuôi", "Chỉ để đếm số lượng cá trong ao", "Kiểm tra thường xuyên giúp xử lí sớm khi cá có dấu hiệu lạ."]
      ], [["Cá giống khoẻ","Bơi nhanh, đồng đều"],["Máy sủi oxi","Cho bể cá cảnh"],["Cho ăn đúng lượng","Tránh ô nhiễm nước"],["Thuỷ sản","Thực phẩm giàu đạm"],
        ["Bón vôi ao nuôi", "Khử chua và diệt mầm bệnh ở đáy ao"],
        ["Cây thuỷ sinh trong bể cá", "Tạo ôxi và nơi trú ẩn cho cá"],
        ["Thay nước bể cá cảnh", "Thay một phần nước định kì"]], "Nối cho đúng nhé!")
    ];
/* ---------- Đăng kí Lớp 7 (gốc: bảng GRADES của master) ---------- */
(function () {
  if (typeof GRADES !== "undefined" && GRADES && !GRADES[7]) {
    GRADES[7] = { label:"Lớp 7", subjects:[
        { id:"g7-math", emoji:"🔢", name:"Toán", desc:"10 chương • Có giải thích đáp án", cls:"c-coral", topics: MATH7_TOPICS },
        { id:"g7-nv", emoji:"📚", name:"Ngữ văn", desc:"Bài 1–10 • Tác phẩm – tác giả", cls:"c-grape", topics: NV7_TOPICS },
        { id:"g7-eng", emoji:"🔤", name:"Tiếng Anh", desc:"Global Success • 12 Unit", cls:"c-teal", topics: ENG7_TOPICS },
        { id:"g7-khtn", emoji:"🔬", name:"Khoa học tự nhiên", desc:"10 chương • Hoá – Lí – Sinh", cls:"c-sky", topics: KHTN7_TOPICS },
        { id:"g7-lsdl", emoji:"🗺️", name:"Lịch sử & Địa lí", desc:"Lịch sử 7 phần • Địa lí 5 phần", cls:"c-brown", topics: LSD7_TOPICS },
        { id:"g7-gdcd", emoji:"⚖️", name:"GDCD", desc:"10 bài • Tình huống ứng xử", cls:"c-slate", topics: GDCD7_TOPICS },
        { id:"g7-tin", emoji:"💻", name:"Tin học", desc:"5 chủ đề • Bảng tính, thuật toán", cls:"c-sky", topics: TIN7_TOPICS },
        { id:"g7-cn", emoji:"🌾", name:"Công nghệ", desc:"Trồng trọt • Lâm nghiệp • Chăn nuôi • Thuỷ sản", cls:"c-leaf", topics: CN7_TOPICS }
      ]};
  }
})();
/* ---------- Câu hỏi thật bổ sung (bảng EXTRA_FACTS_127 của master — phần Lớp 7) ---------- */
Object.assign(window.__EXTRA127 = window.__EXTRA127 || {}, {
  "gd1": [
    ["Việc làm nào sau đây thể hiện lòng tự hào về truyền thống quê hương?", "Học tập, rèn luyện để xây dựng quê hương giàu đẹp", "Chỉ tự hào khi quê hương đã giàu có sẵn", "Rời bỏ quê hương và chê bai nơi mình sinh ra", "Tự hào về quê hương gắn với hành động xây dựng quê hương ngày càng tốt đẹp."],
    ["Khi tiếp xúc với các hủ tục ở quê hương (như mê tín dị đoan), em nên có thái độ thế nào?", "Không làm theo, góp ý loại bỏ hủ tục", "Làm theo cho bằng mọi người", "Lôi kéo bạn bè cùng làm", "Truyền thống tốt đẹp cần giữ gìn; hủ tục lạc hậu cần được loại bỏ."]
  ],
  "gd2": [
    ["Khi bạn gặp chuyện không vui, câu nói nào thể hiện sự cảm thông?", "“Mình hiểu cảm giác của bạn, có mình ở đây.”", "“Chuyện đó có gì mà buồn.”", "“Kệ bạn, không phải việc của mình.”", "Lời nói đồng cảm giúp người khác vơi đi nỗi buồn."],
    ["Chia sẻ với người khác đem lại điều gì?", "Niềm vui được nhân lên, khó khăn được vơi đi", "Mất hết của cải của mình", "Bị mọi người lợi dụng mãi mãi", "“Niềm vui chia sẻ thì nhân đôi, nỗi buồn chia sẻ thì vơi nửa.”"]
  ],
  "gd3": [
    ["Để học tập tự giác, em nên thực hiện việc nào mỗi ngày?", "Tự ôn lại bài cũ và chuẩn bị bài mới", "Chỉ học trước ngày kiểm tra", "Đợi thầy cô nhắc mới học", "Ôn bài đều đặn mỗi ngày là biểu hiện rõ nhất của tự giác học tập."],
    ["“Học đi đôi với hành” trong học tập tích cực nghĩa là gì?", "Học lí thuyết gắn với thực hành, vận dụng vào đời sống", "Chỉ học thuộc lòng công thức", "Học xong là quên luôn", "Học tích cực là học để hiểu và biết vận dụng."]
  ],
  "gd4": [
    ["Người có chữ tín trong công việc thường được giao việc thế nào?", "Được tin tưởng giao những việc quan trọng", "Không được giao việc gì", "Chỉ được giao việc nhỏ nhặt mãi", "Chữ tín giúp con người được tin cậy và tôn trọng."],
    ["Câu thành ngữ nào nói về việc giữ chữ tín?", "Nói lời phải giữ lấy lời", "Nói một đằng, làm một nẻo", "Hứa cho qua chuyện", "“Nói lời phải giữ lấy lời, đừng như con bướm đậu rồi lại bay.”"]
  ],
  "gd5": [
    ["Di sản văn hoá phi vật thể gồm những gì?", "Lễ hội, dân ca, nghề truyền thống, phong tục tốt đẹp", "Đền, chùa, thành quách cổ", "Hiện vật trong bảo tàng", "Di sản phi vật thể là giá trị tinh thần: lễ hội, nghệ thuật, tri thức dân gian."],
    ["Khi tham quan di tích, hành động nào là đúng?", "Đi nhẹ, nói khẽ, không leo trèo lên hiện vật", "Khắc tên mình lên tường để lưu niệm", "Hái hoa trong khu di tích về làm quà", "Tham quan văn minh là một cách bảo tồn di sản."]
  ],
  "gd6": [
    ["Nguyên nhân nào thường gây căng thẳng cho học sinh?", "Áp lực học tập, kì vọng quá cao, mâu thuẫn với bạn bè", "Được nghỉ ngơi đầy đủ", "Chơi thể thao đều đặn", "Nhận biết nguyên nhân giúp em tìm cách ứng phó phù hợp."],
    ["Hoạt động nào sau đây KHÔNG giúp giảm căng thẳng lành mạnh?", "Chơi trò chơi điện tử thâu đêm suốt sáng", "Nghe nhạc, đọc sách", "Đi bộ, tập thể dục", "Thức khuya chơi game làm cơ thể mệt mỏi, căng thẳng hơn."]
  ],
  "gd7": [
    ["Bạo lực học đường gây ra hậu quả gì?", "Tổn thương thể chất và tinh thần cho nạn nhân, ảnh hưởng môi trường học đường", "Chỉ là chuyện đùa vui vô hại", "Giúp bạn bè thân thiết hơn", "Bạo lực học đường để lại hậu quả nghiêm trọng, cần ngăn chặn từ sớm."],
    ["Ứng xử nào giúp xây dựng tình bạn đẹp, phòng tránh bạo lực?", "Tôn trọng, lắng nghe và giải quyết mâu thuẫn bằng lời nói", "Dùng nắm đấm khi bất đồng", "Lập bè phái để áp đảo bạn khác", "Hoà giải bằng lời nói là cách giải quyết văn minh."]
  ],
  "gd8": [
    ["“Quỹ dự phòng” trong quản lí tiền dùng để làm gì?", "Dùng khi có việc cần thiết phát sinh bất ngờ", "Để mua đồ ăn vặt mỗi ngày", "Để cho bạn bè mượn thoải mái", "Có quỹ dự phòng giúp em chủ động khi có việc bất ngờ."],
    ["Khi muốn mua một món đồ chưa thật cần thiết, cách làm hợp lí là?", "Để dành tiền dần, khi đủ và vẫn thật cần thì mua", "Vay tiền bạn mua ngay", "Xin tiền bố mẹ bằng mọi cách ngay lập tức", "Tiết kiệm có mục tiêu giúp em mua được thứ cần mà không lãng phí."]
  ],
  "gd9": [
    ["Hậu quả của tệ nạn ma tuý đối với người sử dụng là gì?", "Suy sụp sức khoẻ, tinh thần, có thể vi phạm pháp luật nghiêm trọng", "Chỉ mệt một lúc rồi khoẻ lại", "Không ảnh hưởng gì đến học tập", "Ma tuý huỷ hoại sức khoẻ, tương lai của người sử dụng và gây hại cho xã hội."],
    ["Bạn bè rủ rê tham gia cá cược ăn tiền, em nên làm gì?", "Từ chối và khuyên bạn không tham gia", "Tham gia thử một lần cho biết", "Đứng xem và cổ vũ", "Cá cược ăn tiền là tệ nạn xã hội, học sinh cần tránh xa."]
  ],
  "gd10": [
    ["Trong gia đình, các thành viên cần đối xử với nhau thế nào?", "Yêu thương, tôn trọng và chia sẻ trách nhiệm với nhau", "Ai mạnh người đó quyết hết", "Không cần quan tâm đến nhau", "Gia đình hạnh phúc được xây dựng bằng yêu thương và tôn trọng lẫn nhau."],
    ["Trẻ em bị bỏ rơi, không được chăm sóc thì quyền nào bị xâm phạm?", "Quyền được chăm sóc, nuôi dưỡng", "Quyền được vui chơi", "Quyền được bày tỏ ý kiến", "Mọi trẻ em đều có quyền được chăm sóc, nuôi dưỡng và bảo vệ."]
  ]
});
if (typeof __applyExtra127 === "function") __applyExtra127(7);
/* ---------- Bộ sinh biến thể Lớp 7 (gốc: block 7 của master) ---------- */
function g7OppInvAbs() {
  var type = rand(0, 2);
  if (type === 0) { var a = rand(2, 9), b = pick([2, 3, 4, 5]); return g7FractionQuestion('Số đối của '+a+'/'+b+' là phân số nào?',-a,b,[[b,a],[-b,a],[a,b]],'Hai số đối có tổng bằng 0. Số đối cần tìm: '+g7Fraction(-a,b)+'.'); }
  if (type === 1) { var c = rand(2, 8), d = pick([3, 4, 5, 6]); return g7FractionQuestion('Số nghịch đảo của '+c+'/'+d+' là phân số nào?',d,c,[[c,d],[-d,c],[-c,d]],'Đổi tử và mẫu của phân số khác 0: '+g7Fraction(d,c)+'.'); }
  var e = rand(2, 12);
  return g7FractionQuestion('Giá trị tuyệt đối của '+(-e)+' viết dưới dạng phân số là bao nhiêu?',e,1,[[-e,1],[0,1]],'|'+(-e)+'| = '+g7Fraction(e,1)+'.');
}
function g7FracMulDiv() {
  var a = rand(1, 6), b = pick([2, 3, 4, 5]), c = rand(1, 6), d = pick([2, 3, 4, 5]), mul = Math.random() < 0.5;
  var num = mul ? a * c : a * d, den = mul ? b * d : b * c;
  function red(n, dd) { var g = 1; for (var i = 2; i <= Math.min(n, dd); i++) if (n % i === 0 && dd % i === 0) g = i; return (n / g) + "/" + (dd / g); }
  return g7FractionQuestion('Tính: '+a+'/'+b+(mul?' × ':' : ')+c+'/'+d,num,den,[[num+den,den],[num,den+num],[num+1,den]],(mul?'Nhân tử với tử, mẫu với mẫu':'Chia là nhân với nghịch đảo')+' rồi rút gọn: '+g7Fraction(num,den)+'.');
}
function g7PolyDegree() {
  var a = rand(2, 6), b = rand(2, 9), deg = pick([2, 3, 4]);
  return mcqQ("Đa thức " + b + "x^" + deg + " + " + a + "x + 5 có bậc là bao nhiêu?", ["1", String(deg + 1)], String(deg), "Bậc của đa thức là số mũ cao nhất của biến: x^" + deg + " nên bậc là " + deg + ".");
}
function g7ProbDice2() {
  var face = pick([2, 3, 4, 5, 6]);
  var favCount = 6 - face + 1;
  function red(n, dd) { var g = 1; for (var i = 2; i <= Math.min(n, dd); i++) if (n % i === 0 && dd % i === 0) g = i; return (n / g) + "/" + (dd / g); }
  var ans = red(favCount, 6);
  var raw = [ans, red(1, 6), red(5, 6), red(favCount + 1, 6), "1/2"];
  var un = []; raw.forEach(function (o) { if (un.indexOf(o) === -1) un.push(o); });
  var opts = shuffle(un.slice(0, 4));
  return { prompt: "Xác suất", visual: '<div class="sentence">Gieo một con xúc xắc cân đối. Xác suất xuất hiện mặt có số chấm lớn hơn hoặc bằng ' + face + " là?</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 4,
    explain: "Các mặt thuận lợi: " + favCount + " mặt (từ " + face + " đến 6) trên tổng 6 mặt: " + favCount + "/6 = " + ans + "." };
}
function g7PrismVol() {
  var base = rand(4, 20), h = rand(3, 9), v = base * h;
  return calcMCQ("Thể tích lăng trụ đứng", "Lăng trụ đứng có diện tích đáy " + base + " cm², chiều cao " + h + " cm. V = ?", v, 0, 300, "V = diện tích đáy × chiều cao = " + base + " × " + h + " = " + v + " cm³.");
}
(function () {
  if (!GRADES[7]) return;
  var t;
  t = findTopic127(7, "m7-huu-ti"); if (t) { t.pools.choose.push(g7OppInvAbs, g7FracMulDiv, g7OppInvAbs, g7FracMulDiv); }
  t = findTopic127(7, "m7-dathuc"); if (t) { t.pools.choose.push(g7PolyDegree, g7PolyDegree); }
  t = findTopic127(7, "m7-xacsuat");
  if (t) { Object.defineProperty(t.pools, "referenceFacts", { value: [["Gieo một đồng xu cân đối, xác suất xuất hiện mặt ngửa là bao nhiêu?", "1/2", "1/4", "1", "Đồng xu có hai mặt có khả năng như nhau và chỉ một mặt ngửa nên xác suất là 1/2."], ["Một túi có 1 bi đỏ và 3 bi xanh. Lấy ngẫu nhiên một bi, xác suất lấy được bi đỏ là bao nhiêu?", "1/4", "1/3", "3/4", "Có 1 bi đỏ trong tổng số 4 bi nên xác suất là 1/4."], ["Một túi có 2 bi đỏ và 2 bi xanh. Lấy ngẫu nhiên một bi, xác suất lấy được bi đỏ là bao nhiêu?", "1/2", "1/4", "3/4", "Có 2 bi đỏ trong 4 bi, phân số 2/4 rút gọn bằng 1/2."], ["Một túi có 2 bi xanh và 3 bi vàng. Lấy ngẫu nhiên một bi, xác suất lấy được bi xanh là bao nhiêu?", "2/5", "1/5", "3/5", "Có 2 bi xanh trong tổng số 5 bi nên xác suất là 2/5."], ["Gieo một con xúc xắc, xác suất xuất hiện mặt có số chấm lẻ là bao nhiêu?", "1/2", "1/6", "5/6", "Có ba mặt lẻ là 1, 3 và 5 trong sáu mặt, phân số 3/6 rút gọn bằng 1/2."], ["Gieo một con xúc xắc, xác suất xuất hiện mặt có số chấm nhỏ hơn 3 là bao nhiêu?", "1/3", "1/6", "2/3", "Có hai mặt thỏa mãn là 1 và 2, phân số 2/6 rút gọn bằng 1/3."], ["Vòng quay có 8 ô bằng nhau, trong đó có 1 ô trúng thưởng. Xác suất quay trúng ô thưởng là bao nhiêu?", "1/8", "1/4", "8", "Chỉ có 1 ô thưởng trong 8 ô bằng nhau nên xác suất là 1/8."], ["Biến cố gieo một con xúc xắc xuất hiện mặt 3 chấm thuộc loại biến cố nào?", "Biến cố ngẫu nhiên", "Biến cố chắc chắn", "Biến cố không thể", "Mặt 3 chấm có thể xuất hiện hoặc không nên là biến cố ngẫu nhiên."], ["Một túi chỉ có bi xanh. Biến cố rút được một bi đỏ từ túi thuộc loại nào?", "Biến cố không thể", "Biến cố chắc chắn", "Biến cố ngẫu nhiên", "Túi không có bi đỏ nào nên biến cố này không thể xảy ra."], ["Một túi có 5 bi và cả 5 bi đều là bi đỏ. Biến cố rút được một bi đỏ thuộc loại nào?", "Biến cố chắc chắn", "Biến cố không thể", "Biến cố ngẫu nhiên", "Mọi bi trong túi đều đỏ nên lần rút nào cũng được bi đỏ."], ["Xác suất của biến cố không thể bằng bao nhiêu?", "0", "1", "1/2", "Biến cố không thể không bao giờ xảy ra nên xác suất của nó bằng 0."], ["Một hộp có 10 thẻ ghi số từ 1 đến 10. Rút ngẫu nhiên một thẻ, xác suất rút được thẻ số 5 là bao nhiêu?", "1/10", "1/9", "1", "Chỉ có một thẻ số 5 trong 10 thẻ nên xác suất là 1/10."], ["Biến cố ngày mai trời có mưa thuộc loại biến cố nào?", "Biến cố ngẫu nhiên", "Biến cố chắc chắn", "Biến cố không thể", "Ngày mai trời có thể mưa hoặc không nên đây là biến cố ngẫu nhiên."], ["Biến cố gieo một con xúc xắc được mặt có số chấm nhỏ hơn 7 thuộc loại nào?", "Biến cố chắc chắn", "Biến cố không thể", "Biến cố ngẫu nhiên", "Sáu mặt xúc xắc đều có số chấm từ 1 đến 6, luôn nhỏ hơn 7."], ["Một túi có 2 bi đỏ và 6 bi xanh. Lấy ngẫu nhiên một bi, xác suất lấy được bi xanh là bao nhiêu?", "3/4", "1/4", "1/8", "Có 6 bi xanh trong 8 bi, phân số 6/8 rút gọn bằng 3/4."], ["Vòng quay chia thành 4 phần bằng nhau, có 3 phần màu xanh. Xác suất kim chỉ vào phần màu xanh là bao nhiêu?", "3/4", "1/4", "1/2", "Có 3 phần xanh trong 4 phần bằng nhau nên xác suất là 3/4."], ["Một lớp có 20 bạn, trong đó có 5 bạn nữ. Chọn ngẫu nhiên một bạn, xác suất bạn được chọn là bạn nữ là bao nhiêu?", "1/4", "1/2", "4/5", "Có 5 bạn nữ trong 20 bạn, phân số 5/20 rút gọn bằng 1/4."], ["Biến cố gieo một đồng xu xuất hiện mặt sấp hoặc mặt ngửa thuộc loại nào?", "Biến cố chắc chắn", "Biến cố ngẫu nhiên", "Biến cố không thể", "Đồng xu rơi xuống luôn cho mặt sấp hoặc mặt ngửa nên biến cố này chắc chắn."], ["Gieo một con xúc xắc có bao nhiêu kết quả có thể xảy ra?", "6 kết quả", "2 kết quả", "12 kết quả", "Xúc xắc có sáu mặt ghi số từ 1 đến 6 nên có 6 kết quả có thể."], ["Có ba thẻ ghi chữ A, B và C. Rút ngẫu nhiên một thẻ, xác suất rút được thẻ A là bao nhiêu?", "1/3", "1/2", "3", "Chỉ có một thẻ A trong ba thẻ nên xác suất là 1/3."]] }); Object.defineProperty(t.pools, "referencePairs", { value: [["Mặt trời mọc phía Đông", "Biến cố chắc chắn"], ["Gieo xúc xắc ra mặt 8 chấm", "Biến cố không thể"], ["Ngày mai trời mưa", "Biến cố ngẫu nhiên"], ["Xác suất biến cố chắc chắn", "Bằng 1"], ["Biến cố không thể", "Biến cố không bao giờ xảy ra"], ["Biến cố ngẫu nhiên", "Biến cố có thể xảy ra hoặc không xảy ra"], ["Biến cố chắc chắn", "Biến cố luôn luôn xảy ra"]] }); }
  t = findTopic127(7, "m7-xacsuat"); if (t) { t.pools.choose.push(g7ProbDice2, g7ProbDice2); }
  t = findTopic127(7, "m7-hinhkhoi");
  if (t) { Object.defineProperty(t.pools, "referenceFacts", { value: [["Hình hộp chữ nhật có bao nhiêu mặt?", "6 mặt", "8 mặt", "12 mặt", "Hình hộp chữ nhật: 6 mặt, 8 đỉnh, 12 cạnh."], ["Hình hộp chữ nhật có bao nhiêu đỉnh?", "8 đỉnh", "6 đỉnh", "12 đỉnh", "Hình hộp chữ nhật có 8 đỉnh."], ["Hình hộp chữ nhật có bao nhiêu cạnh?", "12 cạnh", "8 cạnh", "6 cạnh", "Hình hộp chữ nhật có 12 cạnh."], ["Các mặt của hình lập phương là những hình gì?", "Các hình vuông bằng nhau", "Các hình chữ nhật khác nhau", "Các hình tam giác đều", "Sáu mặt của hình lập phương là các hình vuông bằng nhau."], ["Thể tích hình hộp chữ nhật có các kích thước a, b, c tính bằng công thức nào?", "V = a · b · c", "V = a + b + c", "V = 2(a + b) · c", "Thể tích hộp chữ nhật bằng tích ba kích thước."], ["Hình hộp chữ nhật có kích thước 3 cm, 4 cm, 5 cm. Thể tích của nó là bao nhiêu?", "60 cm³", "47 cm³", "120 cm³", "V = 3 · 4 · 5 = 60 cm³."], ["Hình lập phương có cạnh 4 cm. Thể tích của nó là bao nhiêu?", "64 cm³", "16 cm³", "48 cm³", "V = 4³ = 64 cm³."], ["Diện tích xung quanh của hình hộp chữ nhật được tính bằng cách nào?", "Chu vi đáy nhân với chiều cao", "Diện tích đáy nhân với chiều cao", "Tổng diện tích cả 6 mặt", "Sxq = chu vi đáy × chiều cao."], ["Diện tích toàn phần của hình hộp chữ nhật bằng gì?", "Diện tích xung quanh cộng hai lần diện tích đáy", "Chỉ bằng diện tích xung quanh", "Chu vi đáy nhân với chiều cao", "Stp = Sxq + 2 · diện tích đáy."], ["Hai mặt đáy của lăng trụ đứng tam giác là những hình gì?", "Hai hình tam giác bằng nhau", "Hai hình vuông", "Hai hình tròn", "Đáy của lăng trụ đứng tam giác là hai tam giác bằng nhau và song song."], ["Các mặt bên của lăng trụ đứng là những hình gì?", "Hình chữ nhật", "Hình tam giác", "Hình thang", "Mặt bên của lăng trụ đứng đều là hình chữ nhật."], ["Thể tích của lăng trụ đứng được tính bằng công thức nào?", "Diện tích đáy nhân với chiều cao", "Chu vi đáy nhân với chiều cao", "Diện tích đáy cộng với chiều cao", "V = Sđáy · h."], ["Lăng trụ đứng tam giác có diện tích đáy 10 cm², chiều cao 6 cm. Thể tích là bao nhiêu?", "60 cm³", "16 cm³", "30 cm³", "V = 10 · 6 = 60 cm³."], ["Hình lập phương có cạnh 5 cm. Diện tích toàn phần của nó là bao nhiêu?", "150 cm²", "25 cm²", "125 cm²", "Stp = 6 · 5² = 150 cm²."], ["Diện tích xung quanh của hình lập phương có cạnh a bằng bao nhiêu?", "4a²", "6a²", "a²", "Xung quanh gồm 4 mặt: 4a²; toàn phần mới là 6a²."], ["Bể cá hình hộp chữ nhật dài 8 dm, rộng 5 dm, cao 4 dm chứa tối đa bao nhiêu lít nước?", "160 lít", "80 lít", "160 dm", "V = 8 · 5 · 4 = 160 dm³ = 160 lít."], ["Mặt đáy của lăng trụ đứng tứ giác là hình gì?", "Một tứ giác", "Một tam giác", "Một hình tròn", "Lăng trụ đứng tứ giác có hai đáy là hai tứ giác bằng nhau."], ["Hình hộp chữ nhật là trường hợp đặc biệt của hình nào?", "Lăng trụ đứng tứ giác", "Lăng trụ đứng tam giác", "Hình chóp", "Hộp chữ nhật là lăng trụ đứng có đáy là hình chữ nhật."]] }); }
  t = findTopic127(7, "m7-hinhkhoi"); if (t) { t.pools.choose.push(g7PrismVol, g7PrismVol); }
})();
/* ---------- Bổ sung chủ đề đặc biệt (block 7, phần 2) (nguyên văn master; chạy qua bộ lọc để chỉ áp dụng cho Lớp 7) ---------- */
(function () {
  var __findOrig = findTopic127;
  findTopic127 = function (gg, id) { return gg === 7 ? __findOrig(gg, id) : null; };
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
/* ---------- Bộ sinh xác suất Lớp 7 (gốc: block 8 của master) ---------- */
function g7ProbBag() {
  var r = rand(1, 6), b = rand(1, 6), tot = r + b, ans = probRed(r, tot);
  var opts = probOpts(ans, [probRed(b, tot), probRed(r + 1, tot + 1), "1/" + tot, probRed(1, tot)]);
  return { prompt: "Xác suất", visual: '<div class="sentence">Một hộp có ' + r + " bi đỏ và " + b + " bi xanh. Lấy ngẫu nhiên 1 viên bi. Xác suất lấy được bi đỏ là?</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 4,
    explain: "Có " + r + " bi đỏ trong tổng số " + tot + " bi: xác suất = " + r + "/" + tot + " = " + ans + "." };
}
function g7ProbSpin() {
  var n = rand(4, 10), ans = "1/" + n;
  var opts = probOpts(ans, ["1/" + (n + 1), "1/" + (n - 1), n + "/1", "1/2"]);
  return { prompt: "Xác suất", visual: '<div class="sentence">Một bánh xe may mắn có ' + n + " ô bằng nhau đánh số từ 1 đến " + n + ". Xác suất kim chỉ vào ô số 3 là?</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 4,
    explain: "Chỉ có 1 ô số 3 trong " + n + " ô bằng nhau: xác suất = 1/" + n + "." };
}
function g7ProbDiv() {
  var n = pick([9, 10, 12, 15, 20]), k = pick([2, 3, 5]);
  var cnt = Math.floor(n / k), ans = probRed(cnt, n);
  var opts = probOpts(ans, [probRed(cnt + 1, n), probRed(cnt, n + k), "1/" + k]);
  return { prompt: "Xác suất", visual: '<div class="sentence">Chọn ngẫu nhiên một số từ 1 đến ' + n + ". Xác suất chọn được số chia hết cho " + k + " là?</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 4,
    explain: "Từ 1 đến " + n + " có " + cnt + " số chia hết cho " + k + ": xác suất = " + cnt + "/" + n + " = " + ans + "." };
}
function g7PieBlank() {
  var p = pick([15, 20, 25, 30, 35, 40, 45, 60, 70, 75, 80]), ans = 100 - p, opts = numOptions(ans, 0, 100, 3);
  return { kind: "blank", badge: "✏️ Điền vào chỗ trống", prompt: "Đọc biểu đồ quạt rồi điền phần trăm còn lại!", blankText: String(ans),
    visual: '<div class="sentence">Biểu đồ quạt: học sinh đi bộ đến trường chiếm ' + p + "%. Tỉ lệ học sinh đi bằng các phương tiện khác chiếm " + blankSlot() + "%</div>",
    options: opts.map(function (o) { return { html: '<span class="opt-num">' + o + "</span>" }; }), answer: opts.indexOf(ans), cols: 4 };
}
function g7BarMost() {
  var cats = [["🍎 Táo", 0], ["🍌 Chuối", 0], ["🍊 Cam", 0]];
  var vals = shuffle([rand(3, 5), rand(6, 8), rand(9, 12)]);
  cats.forEach(function (c, i) { c[1] = vals[i]; });
  var most = Math.random() < 0.5;
  var target = cats.slice().sort(function (a, b) { return most ? b[1] - a[1] : a[1] - b[1]; })[0];
  var others = shuffle(cats.filter(function (c) { return c !== target; })).map(function (c) { return c[0]; });
  return mcqQ("Nhìn biểu đồ cột: loại quả nào bán được " + (most ? "NHIỀU" : "ÍT") + " nhất?", others, target[0],
    "Số lượng: " + cats.map(function (c) { return c[0] + " " + c[1]; }).join(", ") + ". Loại " + (most ? "nhiều" : "ít") + " nhất là " + target[0] + ".",
    '<div class="chart-box">' + cats.map(function (c) { return c[0] + ": " + emojiRow("🍏", Math.min(c[1], 10)) + " (" + c[1] + ")"; }).join("<br>") + "</div>");
}
/* ---------- Bổ sung lần 2 (block 8) (nguyên văn master; chạy qua bộ lọc để chỉ áp dụng cho Lớp 7) ---------- */
(function () {
  var __findOrig = findTopic127;
  findTopic127 = function (gg, id) { return gg === 7 ? __findOrig(gg, id) : null; };
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
/* ---------- Bộ sinh Lớp 7 (gốc: block 9 của master) ---------- */
function g7SeqSearch() {
  var n = pick([6, 8, 10]), list = [], used = {};
  while (list.length < n) { var v = rand(1, 30); if (!used[v]) { used[v] = 1; list.push(v); } }
  var k = rand(0, n - 1), ans = k + 1;
  return calcMCQ("Tìm kiếm tuần tự", "Danh sách: " + list.join(", ") + ". Tìm số " + list[k] + " bằng tìm kiếm tuần tự cần bao nhiêu lần so sánh?", ans, 0, 12,
    "Xét lần lượt từ đầu: số " + list[k] + " ở vị trí thứ " + ans + " nên cần " + ans + " lần so sánh.");
}
function g7BubbleSwaps() {
  var arr = shuffle([1, 2, 3, 4]).slice(0, 4), inv = 0;
  for (var i = 0; i < 4; i++) for (var j = i + 1; j < 4; j++) if (arr[i] > arr[j]) inv++;
  if (inv === 0) { arr = [2, 1, 3, 4]; inv = 1; }
  return calcMCQ("Sắp xếp nổi bọt", "Dãy " + arr.join(", ") + " được sắp xếp tăng dần bằng thuật toán nổi bọt. Cần bao nhiêu lần đổi chỗ?", inv, 0, 8,
    "Mỗi lần đổi chỗ sửa một cặp ngược thứ tự; dãy có " + inv + " cặp ngược nên cần " + inv + " lần đổi chỗ.");
}
function g7BinarySteps() {
  var list = [3, 7, 11, 15, 19, 23, 27], k = rand(0, 6), target = list[k];
  var lo = 0, hi = 6, steps = 0;
  while (lo <= hi) { var mid = Math.floor((lo + hi) / 2); steps++; if (list[mid] === target) break; if (list[mid] < target) lo = mid + 1; else hi = mid - 1; }
  return calcMCQ("Tìm kiếm nhị phân", "Danh sách đã sắp xếp: 3, 7, 11, 15, 19, 23, 27. Tìm số " + target + " bằng tìm kiếm nhị phân cần bao nhiêu lần so sánh?", steps, 0, 6,
    "Mỗi lần so sánh với phần tử giữa và loại bỏ một nửa danh sách: cần " + steps + " lần so sánh.");
}
/* ---------- Bổ sung lần 3 (block 9) (nguyên văn master; chạy qua bộ lọc để chỉ áp dụng cho Lớp 7) ---------- */
(function () {
  var __findOrig = findTopic127;
  findTopic127 = function (gg, id) { return gg === 7 ? __findOrig(gg, id) : null; };
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
/* ---------- Công thức và cách làm (Toán) của Lớp 7 — tách từ bảng ghi chú chung của master ---------- */
window.__MATH_KNOWLEDGE_NOTES = window.__MATH_KNOWLEDGE_NOTES || {};
Object.assign(window.__MATH_KNOWLEDGE_NOTES, {
"m7-huu-ti": ["Số hữu tỉ có dạng a/b với a, b nguyên, b ≠ 0.","Cộng/trừ bằng quy đồng; nhân/chia theo quy tắc phân số. Chú ý dấu âm, ngoặc và thứ tự phép tính."],
"m7-so-thuc": ["Số thực gồm số hữu tỉ và số vô tỉ; số vô tỉ có dạng thập phân vô hạn không tuần hoàn.","√a (a ≥ 0) không âm; |a| là khoảng cách từ a tới 0 trên trục số."],
"m7-goc": ["Hai góc đối đỉnh bằng nhau; kề bù có tổng 180°; phụ có tổng 90°.","Tia phân giác nằm trong góc và chia góc thành hai phần bằng nhau.","Với hai đường song song: góc so le trong và đồng vị bằng nhau; trong cùng phía bù nhau."],
"m7-tamgiac": ["Tổng ba góc tam giác là 180°. Tam giác cân có hai cạnh bên và hai góc ở đáy bằng nhau.","Các trường hợp bằng nhau: c.c.c; c.g.c với góc xen giữa; g.c.g với cạnh xen giữa.","Điểm trên trung trực cách đều hai đầu mút; trung trực vuông góc tại trung điểm đoạn thẳng."],
"m7-dulieu": ["Tổng tỉ lệ trên biểu đồ quạt bằng 100%. Phần p% có góc ở tâm 360°·p/100.","Biểu đồ đoạn thẳng thể hiện thay đổi theo thời gian; đọc rõ hai trục và các mốc."],
"m7-tile": ["a/b = c/d khi ad = bc, b và d khác 0.","Tỉ lệ thuận y = kx: tỉ số y/x không đổi khi x ≠ 0. Tỉ lệ nghịch y = a/x: tích xy không đổi."],
"m7-dathuc": ["Thay số để tính giá trị biểu thức. Thu gọn bằng cộng các hạng tử đồng dạng.","Bậc đa thức một biến khác 0 là số mũ lớn nhất sau thu gọn; a là nghiệm của P(x) khi P(a) = 0."],
"m7-xacsuat": ["Biến cố chắc chắn luôn xảy ra. Biến cố không thể là biến cố không bao giờ xảy ra. Biến cố ngẫu nhiên có thể xảy ra hoặc không.","Với các kết quả đồng khả năng: P = số kết quả thuận lợi / số kết quả có thể; 0 ≤ P ≤ 1."],
"m7-quanhe-tg": ["Cạnh lớn hơn đối diện góc lớn hơn. Tổng hai cạnh bất kì lớn hơn cạnh còn lại.","Đường vuông góc là đường ngắn nhất từ một điểm tới đường thẳng.","Ba trung tuyến gặp tại trọng tâm G; trên trung tuyến AM có AG = 2GM."],
"m7-hinhkhoi": ["Hộp chữ nhật V = abh; lập phương V = a³.","Lăng trụ đứng: V = Sđáy·h; Sxq = Pđáy·h; Stp = Sxq + 2Sđáy."]
});
  if (typeof __labelGrade127 === "function") __labelGrade127(7);
  if (typeof window.__phaseCompleteGrade === "function") window.__phaseCompleteGrade(7);

/* Bản vá bàn giao 15/10/2026: kết quả số của Chương I giữ dạng phân số.
   Các phép tính gốc ở trên đã tính bằng tử/mẫu nguyên trước khi thu hoạch
   dữ kiện. Lớp bao này chỉ chuẩn hoá cách hiển thị kết quả, không làm tròn. */
(function () {
  var subj=GRADES[7].subjects.find(function(s){return s.id==='g7-math';});
  var t=subj&&subj.topics.find(function(t){return t.id==='m7-huu-ti';});
  if(!t)return;
  function numberFraction(s){
    s=String(s).trim().replace(/−/g,'-').replace(',','.');
    var m=/^(-?\d+)\/(-?\d+)$/.exec(s);
    if(m&&+m[2]!==0)return g7Fraction(+m[1],+m[2]);
    m=/^(-?)(\d+)(?:\.(\d+))?$/.exec(s);
    if(!m)return null;
    var den=Math.pow(10,(m[3]||'').length),num=(+m[2]*den+ +(m[3]||0))*(m[1]?-1:1);
    return g7Fraction(num,den);
  }
  function face(html){var v=numberFraction(roundText(html));return v===null?html:'<span class="opt-num rational-num">'+v+'</span>';}
  function normalize(q){
    if(!q)return q;
    if(q.options)q.options.forEach(function(o){o.html=face(o.html);});
    if(q.blankText!=null){var v=numberFraction(q.blankText);if(v!==null)q.blankText=v;}
    if(q.pairs)q.pairs.forEach(function(p){['l','r','a','b'].forEach(function(k){if(p[k]!=null)p[k]=face(p[k]);});});
    if(q.kind==='catch'&&q.items)q.items.forEach(function(i){i.html=face(i.html);});
    return q;
  }
  [t.pools,t.advPools].forEach(function(pools){if(!pools)return;['choose','blank','match','games'].forEach(function(k){pools[k]=(pools[k]||[]).map(function(gen){return function(){return normalize(gen());};});});});
  if(t.knowledge){(t.knowledge.facts||[]).forEach(function(f){var v=numberFraction(f.a);if(v!==null)f.a=v;(f.wrongs||[]).forEach(function(w,i){var v=numberFraction(w);if(v!==null)f.wrongs[i]=v;});});(t.knowledge.examples||[]).forEach(function(e){var v=numberFraction(e.answer);if(v!==null)e.answer=v;});}
  if(t.knowledge&&t.knowledge.pairs)t.knowledge.pairs.forEach(function(p){var v=numberFraction(p[1]);if(v!==null)p[1]=v;});
  t.exactRationalResults=true;
})();
