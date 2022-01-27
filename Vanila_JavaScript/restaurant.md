<iDOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>restaurant payment</title>
        <style>
            div#display {

                width: 800px;
                height: 1000px;
                border: 1px solid #999;

            }

            div#menu,
            div#selected_menu,
            div#discount,
            div#message {

                font-size: 20px;
                font-weight: bold;
                margin-top: 20px;

            }

            div#button {

                width: 755px;
                height: 80px;
                margin: 5px;
                padding: 15px;
                border: 1px solid #999;
                background-color: aliceblue;
                font-size: 30px;

            }


            div#menu_price,
            div#discount_option {

                width: 755px;
                margin: 20px 20px 5px 5px;
                padding: 15px;
                border: 1px solid #999;
                background-color: aliceblue;

            }

            div#discount_option select {

                width: 100%;
                height: 25px;
                margin-bottom: 5px;
            }

            div#message {

                width: 755px;
                height: 200px;
                margin: 10px 120px 5px 5px;
                padding: 15px;
                border: 1px solid #999;
                background-color: aliceblue;

            }


            button {
                border-radius: 10px;
                font-size: 14px;
                cursor: pointer;
            }



            button:hover {

                border-radius: 10px;
                font-size: 14px;

            }

            table {

                width: 100%;
                border: 1px solid #999;
                border-collapse: collapse;

            }



            table td:nth-of-type(1),
            table td:nth-of-type(3),
            table td:nth-of-type(4) {

                width: 200;
                height: 40;
            }

            table td:nth-of-type(2) {

                width: 150;
                height: 40;
            }

            table thead {

                font-weight: bold;
                text-align: center;
            }


            table tfoot td:nth-of-type(1) {

                padding-right: 10px;
                text-align: right;
                font-weight: bold;
            }

            table tfoot td:nth-of-type(2) {

                text-align: left;
            }
        </style>

    </head>

    <body>

        <div id="display">

            <div id="menu">
                메뉴
                <br />
             
                    <div id="button">
                        <button type="button" id="salad">무제한 샐러드바(25000원)</button>
                        <button type="button" id="sirloin_steak">안심 스테이크(150g)(35500원)</button>
                        <button type="button" id="ripeye_steak">립아이 스테이크(210g)(22500원)</button>
                        <button type="button" id="tenderloin_steak">채끝 등심 스테이크(210g)(30500원)</button>
                        <button type="button" id="grapefruit_ade">자몽에이드(6500원)</button>
                        <button type="button" id="applemango_ade">애플망고에이드(6500원)</button>
                        <button type="button" id="draft_beer">생맥주(4000원)</button>
                    </div>
            </div>
            <div id="selected_menu">
                선택한 메뉴
                <br />
                <div id="menu_price">
                    <table border="1">
                        <thead>
                            <tr>
                                <td>메뉴명</td>
                                <td>가격</td>
                                <td>수량</td>
                                <td>합계</td>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan=3>합계</td>
                                <td id="total"></td>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div id="discount">
                제휴/할인카드/쿠폰/OK 캐쉬백 목록(중복 할인 가능한 쿠폰 외 할인 불가)
                <br />
                <div id="discount_option">
                    <table>
                        <select name="" id="card">
                            <option value="0">할인받을 카드 종류 선택하세요.</option>
                            <option value="1">CJ ONE 삼성카드</option>
                            <option value="2">CJ ONE 신한카드</option>
                            <option value="3">The CJ 카드</option>
                            <option value="4">삼성 6 V4카드</option>
                            <option value="5">신한 Lady 카드</option>
                            <option value="6">삼성 SFC</option>
                            <option value="7">삼성 S클래스</option>
                            <option value="8">이마트 KB카드</option>
                        </select>
                        </br>
                        <select name="" id="telecom_compay">
                            <option value="0">할인받을 통신사 할인혜택 선택하세요.</option>
                            <option value="9">KT 멤버쉽 일반 할인</option>
                            <option value="10">KT 멤버쉽 VIP 할인</option>
                            <option value="11">T 멤버쉽 실버 할인</option>
                            <option value="12">T 멤버쉽 VIP/골드 할인</option>
                        </select>
                        </br>
                        <select name="" id="point">
                            <option value="0">할인받을 포인트 결제 선택하세요.</option>
                            <option value="14">삼성카드 포인트</option>
                            <option value="15">현대카드 M</option>
                            <option value="16">신한 Hi-Point 카드</option>
                        </select>
                        </br>
                        <select name="" id="OK_cashback">
                            <option value="0">할인받을 OK 캐쉬백 선택하세요.</option>
                            <option value="13">OK 캐쉬백</option>
                        </select>
                        </br>
                        <select name="" id="coupon">
                            <option value="0">할인받을 쿠폰 선택하세요.</option>
                            <option value="1">5% 할인쿠폰(중복할인 가능)</option>
                            <option value="2">10% 할인쿠폰(중복할인 가능)</option>
                            <option value="3">15% 할인쿠폰(중복할인 가능)</option>
                            <option value="4">5000원 할인쿠폰(중복할인 가능)</option>
                            <option value="5">10,000원 할인쿠폰(중복할인 가능)</option>
                            <option value="6">20,000원 할인쿠폰(중복할인 가능)</option>
                            <option value="7">5% 할인쿠폰(중복할인 불가능)</option>
                            <option value="8">10% 할인쿠폰(중복할인 불가능)</option>
                            <option value="9">15% 할인쿠폰(중복할인 불가능)</option>
                            <option value="10">5000원 할인쿠폰(중복할인 불가능)</option>
                            <option value="11">10,000원 할인쿠폰(중복할인 불가능)</option>
                            <option value="12">20,000원 할인쿠폰(중복할인 불가능)</option>
                        </select>
                        </br>
                    </table>
                </div>

            </div>

            메시지
            <div id="message"></div>


            <div id="total_amount">최종 결제 금액 : <span></span></div>

            <script>
                const $buttons = document.querySelectorAll("button");
                const $tbody = document.getElementById("tbody");
                const $total = document.getElementById("total");
                let total = 0;

                const menu_List = {

                    salad: {
                        name: "무제한 샐러드바",
                        price: 25000,
                        piece: 1,
                    },

                    sirloin_steak: {
                        name: "안심 스테이크(150g)",
                        price: 35500,
                        piece: 1,
                    },

                    ripeye_steak: {
                        name: "립아이 스테이크(210g)",
                        price: 22500,
                        piece: 1,
                    },

                    tenderloin_steak: {
                        name: "채끝 등심 스테이크(210g)",
                        price: 30500,
                        piece: 1,
                    },

                    grapefruit_ade: {
                        name: "자몽에이드",
                        price: 6500,
                        piece: 1,
                    },

                    applemango_ade: {
                        name: "애플망고에이드",
                        price: 6500,
                        piece: 1,
                    },

                    draft_beer: {
                        name: "생맥주",
                        price: 4000,
                        piece: 1,
                    },

                }


                const order_List = {
                   
                    salad: { 
                        piece: 0,
                        totalAmount: salad.piece * 25000,
                    },

                    sirloin_steak: { 
                        piece: 0,
                        totalAmount: sirloin_steak.piece * 35500,
                    } ,

                    ripeye_steak: {  
                        piece: 0,
                        totalAmount: ripeye_steak.piece * 22500,
                    } ,

                    tenderloin_steak: {  
                        piece: 0,
                        totalAmount: tenderloin_steak.piece * 30500,
                    } ,

                    grapefruit_ade: { 
                        piece: 0,
                        totalAmount: grapefruit_ade.piece *6500,
                    } ,

                    applemango_ade: {  
                        piece: 0,
                        totalAmount:applemango_ade.piece * 6500,
                    } ,


                    draft_beer: {  
                        piece: 0,
                        totalAmount: draft_beer.piece * 4000,
                    } ,
  
                };




                function addMenuInTable(event) {
                
                    let menuAlreadyExists = false;
                    let selectedMenu;
                    let selectedMenuPiece;
                    let selectedMenuAmount;

                    let menuName = event.target.getAttribute("id");

                    for (let child of $tbody.children) {

                        if (child.getAttribute("id") === menuName) {
                            menuAlreadyExists = true;
                 
                        }
                    }

                    if (menuAlreadyExists) {

                        selectedMenu = $tbody.querySelector(`tr#${menuName}`);
                        order_List[menuName].piece += 1;
                        selectedMenu.querySelector("tr td input#piece").value = order_List[menuName].piece;
                        
                        selectedMenu.querySelector("tr td input#amount").value = menu_List[menuName].price * order_List[menuName].piece;

                        selectedMenuPiece = selectedMenu.querySelector("tr td input#piece").value;
                        selectedMenuAmount = selectedMenu.querySelector("tr td input#amount").value;
                    }

                    /*$tbody.foreach((td) => {
                               return td.getAttribute("id") === menuName;
                           });
                       }
                       */ // forEach문은 배열에만 사용한다는것을 기억할것

                    if (order_List[menuName].piece >1) {

                        return;

                    } else {

                        let array = [];
                        order_List[menuName].piece += 1;

                        array.push(`<tr id =${menuName}>`);
                        array.push(`<td>${menu_List[menuName].name}</td>`); // menuName과 name 둘 다 브라켓 쒸우니 undefined가 나옴. [menuName].name 해야 바르게 치환됨
                        array.push(`<td>${menu_List[menuName].price}</td>`); // [menuName]같이 브라켓으로 쒸어주니 변수가 치환이 된다. '.' 점으로 했을때는 치환이 되지 않았다.
                        array.push(`<td><input type="text" id ="piece" value="${menu_List[menuName].piece}" /></td>`);
                        array.push(`<td><input type="text" id ="amount" value="${menu_List[menuName].price}" /></td>`);
                        array.push("</tr>");
                        document.getElementById("tbody").innerHTML += array.join("");

                        total += menu_List[menuName].price * menu_List[menuName].piece;

                        $total.textContent = total;

                    }



                }

                // document.getElementById("tbody").insertAdjacentHTML("beforeend", array.join(""));
                // 여기에 메뉴를 제거하는 기능도 추가 하고 싶다.     


                $buttons.forEach((button) => {

                    button.addEventListener("click", addMenuInTable);

                });


                /*for(let menu in $buttons){

                     menu.addEventListener("click", addMenuInTable);
                 }

                 */ // 와우 이 케이스는 객체의 셀수 없는 모든 속성을 순서대로 변수에 대입한다.

                 // gitbash로 폴더 이름 변경하는법 찾아보기

            </script>
    </body>

    </html>
