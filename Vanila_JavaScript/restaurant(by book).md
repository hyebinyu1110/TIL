
# 바닐라 자바스크립트 By 고승원

> 14장 실습예제 (3)
> 
> 패밀리 레스토랑 결제 금액 계산기

## 주목할 함수

##  1. filter() 메서드  
    +  filter() 메서드는 배열요소를 차례대로 방문하여 배열요소가 주어진 조건에 부합하면(true), 
    조건에 부합한 배열요소만 따로 모아 새로운 배열을 반환한다. 
    +  menus.filter((m) => m.menuId == menuId) => menus의 각 배열요소인 m을 차례대로 방문하여,  
    m.menuId == menuId을 만족하는 요소만 따로 모아,
       새로운 배열을 반환한다.
##  2. for...of
    + 배열의 요소 반복에서 사용한다. 
    + for(element of Array)
    
##  3. for...in  
    + 객체의 요소 반복에서 사용한다. 
    + for(element of Object)
    
##  4. HTML Collection 반환  
    + getElementsByClassName("line-sum)의 봔환 결과로 HTMLCollection이 반환 된것을 console에서 확인할 수 있었다.
    + HTMLcollection은 배열처럼 보이나 배열이 아니고, 리턴결과가 복수 인경우 사용되는 객체이다. 
    + 배열과 사용법이 비슷하다. 
    
##  5. ==와 === 의 다름 (코드 실행 후 오류발견)
    + 책에 적힌 대로 코드를 적다 == 를 평소 나는 ===로 쓰기때문에 나의 스타일대로 적었다.
    + 밑의 예시대로 코드를 적고, 실행하니 할인율이 적용되지 않아서 코드를 다시 보고 있었다. 
    + 코드 값들을 다 console.log 해보다가 발견 아! == 와 ===는 다르다!
    + '==' 는 왼쪽, 오른쪽 피연산자의 값을 비교하여 값만 같으면 true 반환
    + '==='는 왼쪽, 오른쪽 피연산자의 값과 타입까지 비교하여 같으면 true 반환한다.
    + 따라서 값만 비교하면 되는건데, 타입까지 확인하니 false 가 반환되서 코드가 제대로 실행되지 않았던 것!
    + 오늘의 빅 발견이였다.
    + 알고 있는 내용이였는데, 책에 적힌 대로 코드를 먼저 치고 코드를 이해하려고 노력하였으니... 코드를 하나하나 
    확인하고 이해하려고 하다가 발견 하였다!
    + 암튼 디버깅 완료!!
       
       
~~~Java Script
<iDOCTYPE html>
    <html>

    <head>
        <title>Document</title>
        <style>

            * {
                box-sizing: border-box;
            }

            button.menu {
                padding: 5px;
                margin: 5px;
                background-color: aquamarine;
                border-radius: 10px;
                font-size: large;
            }

            .container {
                border: 1px solid #222;
                background-color: aliceblue;
                padding: 20px;
                margin-bottom: 10px;

            }

            .bg-primary {
                background-color: beige !important;
            }

            .bg-secondary {
                background-color: bisque !important;
            }

            table,
            th,
            td {
                border-collapse: collapse;
            }

            th,
            td {
                border: 1px solid #222;
                padding: 10px;
            }

            select {
                font-size: large;
                width: 10%;
                padding: 5px;
                margin-bottom: 5px;
            }


            .btn-cal {
                font-size: large;
                padding: 15px;
                background-color: blueviolet;
                color: white;
                border-radius: 10px;
            }
        </style>
    </head>


    <body>
        <h2>메뉴</h2>
        <div id="divMenus" class="container"></div>
        <h2>선택한 메뉴</h2>
        <div id="divSelectedMenus" class="container bg-primary">
            <table style="width:100%">
                <thead>
                    <tr>
                        <th>메뉴명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>합계</th>
                    </tr>
                </thead>

                <tbody id="selectedMenusTb"></tbody>
                <tfoot id="selectedMenuTotal">
                    <tr>
                        <td colspan="3" style="text-align: right">합계</td>
                        <td><strong id="total"></strong></td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <h2>제휴/할인카드/쿠폰</h2>
        <div id="divDiscount" class="container">
            <div>
                <select name="" id="selCREDIT"></select>
            </div>
            <div>
                <select name="" id="selTELECOM"></select>
            </div>
            <div>
                <select name="" id="selPOINT"></select>
            </div>
            <div>
                <select name="" id="selOKCASHBAG"></select>
            </div>
            <div>
                <select name="" id="selCoupons"></select>
            </div>
        </div>
        <div style="padding: 10px; text-align:center">
            <button class="btn-cal" onclick="calculateAmount();">
                결제금액계산
            </button>
        </div>
        <div id="divRealTotal" style="display:none">
            <h2>최종결제금액: <strong id="realTotal"></strong></h2>
        </div>

        <script>
            // 메뉴목록
            const menus = [
                {
                    menuId: 1,
                    menuName: "무제한 샐러드바",
                    price: 25000,
                },
                {
                    menuId: 2,
                    menuName: "안심스테이크(150g)",
                    price: 35500,
                },
                {
                    menuId: 3,
                    menuName: "립아이스테이크(220g)",
                    price: 22500,
                },
                {
                    menuId: 4,
                    menuName: "채끝등심스테이크(210g)",
                    price: 30500,
                },
                {
                    menuId: 5,
                    menuName: "자몽에이드",
                    price: 6500,
                },
                {
                    menuId: 6,
                    menuName: "애플망고에이드",
                    price: 6500,
                },
                {
                    menuId: 7,
                    menuName: "생맥주",
                    price: 4000,
                },
            ];

            // 할인목록
            const cardTypes = [
                {
                    cardType: "CREDIT",
                    title: "신용카드",
                },
                {
                    cardType: "TELECOM",
                    title: "통신사",
                },
                {
                    cardType: "OKCASHBAG",
                    title: "OK캐시백",
                },
                {
                    cardType: "POINT",
                    title: "포인트결제",
                },
            ];

            //할인카드/통신사/포인트/OK캐시백
            const creditCards = [
                {
                    cardId: 1,
                    cardType: "CREDIT",
                    cardName: "CJ ONE 삼성카드",
                    discount: 30,
                    discountType: "%",
                },
                {
                    cardId: 2,
                    cardType: "CREDIT",
                    cardName: "CJ ONE 신한카드",
                    discount: 30,
                    discountType: "%",
                },
                {
                    cardId: 3,
                    cardType: "CREDIT",
                    cardName: "The CJ 카드",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 4,
                    cardType: "CREDIT",
                    cardName: "삼성 6 V4카드",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 5,
                    cardType: "CREDIT",
                    cardName: "신한 Lady카드",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 6,
                    cardType: "CREDIT",
                    cardName: "삼성 SFC",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 7,
                    cardType: "CREDIT",
                    cardName: "삼성 S클라스",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 8,
                    cardType: "CREDIT",
                    cardName: "하나 Yes Ok Saver",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 9,
                    cardType: "CREDIT",
                    cardName: "홈플러스 하나줄리엣카드",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 10,
                    cardType: "CREDIT",
                    cardName: "하나 줄리엣카드 & Yes 4ushopping",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 11,
                    cardType: "CREDIT",
                    cardName: "KB Star",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 12,
                    cardType: "CREDIT",
                    cardName: "이마트 KB 카드",
                    discount: 15,
                    discountType: "%",
                },
                {
                    cardId: 13,
                    cardType: "TELECOM",
                    cardName: "KT 멤버십 일반 할인",
                    discount: 5,
                    discountType: "%",
                },
                {
                    cardId: 14,
                    cardType:  "TELECOM",
                    cardName: "KT 멤버십 VIP 할인",
                    discount: 15,
                    discountType: "%",
                },
                {
                    cardId: 15,
                    cardType:  "TELECOM",
                    cardName: "T 멤버십 실버 할인",
                    discount: 5,
                    discountType: "%",
                },
                {
                    cardId: 16,
                    cardType:  "TELECOM",
                    cardName: "T 멤버십 VIP/골드 할인",
                    discount: 15,
                    discountType: "%",
                },
                {
                    cardId: 17,
                    cardType: "OKCASHBAG",
                    cardName: "OK캐시백",
                    discount: 30,
                    discountType: "%",
                },
                {
                    cardId: 18,
                    cardType: "POINT",
                    cardName: "BC Top 포인트",
                    discount: 100,
                    discountType: "%",
                },
                {
                    cardId: 19,
                    cardType: "POINT",
                    cardName: "기아멤버스 카드",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 20,
                    cardType: "POINT",
                    cardName: "삼성카드 포인트",
                    discount: 100,
                    discountType: "%",
                },
                {
                    cardId: 21,
                    cardType: "POINT",
                    cardName: "현대카드 M",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 22,
                    cardType: "POINT",
                    cardName: "신한 Hi-Point 카드",
                    discount: 20,
                    discountType: "%",
                },
                {
                    cardId: 23,
                    cardType: "POINT",
                    cardName: "블루 멤버스 카드",
                    discount: 20,
                    discountType: "%",
                },
            ]


            const coupons = [ // 데이터를 배열에 객체를 배열요소로 삼음. 
                
               {
                    couponId: 1,
                    title: "5% 할인쿠폰(중복할인 가능)",
                    discount: 5,
                    doubleDiscount: true,
                    discountType: "%",
                },

                {
                    couponId: 2,
                    title: "10% 할인쿠폰(중복할인 가능)",
                    discount: 10,
                    doubleDiscount: true,
                 },
                {
                    couponId: 3,
                    title: "15% 할인쿠폰(중복할인 가능)",
                    discount: 15,
                    doubleDiscount: true,
                    discountType: "%",
                },
                {
                    couponId: 4,
                    title: "5000 할인쿠폰(중복할인 가능)",
                    discount: 5000,
                    doubleDiscount: true,
                    discountType: "",
                },
                {
                    couponId: 5,
                    title: "10,000원 할인쿠폰(중복할인 가능)",
                    discount: 10000,
                    doubleDiscount: true,
                    discountType: "",
                },
                {
                    couponId: 6,
                    title: "20,000원 할인쿠폰(중복할인 가능)",
                    discount: 20000,
                    doubleDiscount: true,
                    discountType: "",
                },
                {
                    couponId: 7,
                    title: "5% 할인쿠폰(중복할인 불가능)",
                    discount: 5,
                    doubleDiscount: false,
                    discountType: "%",
                },

                {
                    couponId: 8,
                    title: "10% 할인쿠폰(중복할인 불가능)",
                    discount: 10,
                    doubleDiscount: false,
                    discountType: "%",
                },
                {
                    couponId: 9,
                    title: "15% 할인쿠폰(중복할인 불가능)",
                    discount: 15,
                    doubleDiscount: false,
                    discountType: "%",
                },
                {
                    couponId: 10,
                    title: "5000 할인쿠폰(중복할인 불가능)",
                    discount: 5000,
                    doubleDiscount: false,
                    discountType: "",
                },
                {
                    couponId: 11,
                    title: "10,000원 할인쿠폰(중복할인 불가능)",
                    discount: 10000,
                    doubleDiscount: false,
                    discountType: "",
                },
                {
                    couponId: 12,
                    title: "20,000원 할인쿠폰(중복할인 불가능)",
                    discount: 20000,
                    doubleDiscount: false,
                    discountType: "",
                },
            ];

            let total = 0; // 총 지불할 금액

            /*
             * 선택한 모든 메뉴에 대한 합계를 계산하는 함수
            */
            function calculateTotalAmount() {

                let lineSum = document.getElementsByClassName("line-sum");
                // 전체에서 line-sum이라는 클래스요소를 찾아 HTMLcollection 에 배열식으로 반환.( 배열이 아님)

                total = 0;
                for (let l of lineSum) {
                    total += parseInt(l.value)
                }
                document.getElementById("total").innerText = total;
            }

            /*
             * 선택한 메뉴에서 수량을 변경하면 합계를 계산하는 함수
             * @param {Event} e
             * @param {Number} price
             */

            function changeLineSum(e, price) {

                let qty = e.target.value; // 메뉴의 개수가 증가한 값을 대입한다.
                let lineSum =

                    e.target.parentNode.parentNode.getElementsByClassName("line-sum")[0]; // 선택된 메뉴의 부모<td>의 부모인 <tr>태그로 가 클래스 네임이 line-sum을 찾고(행의 가격부분), 클래스로 반환한게 HTMLCollection 이라 [0]도 붙여줌. 
                console.log(e.target.parentNode.parentNode.getElementsByClassName("line-sum"));
                //
                lineSum.value = price * parseInt(qty);
                // 가격의 value에 증가된 개수 만큼 변화한 금액을 대입한다. 

                calculateTotalAmount(); // 함수 호출
            }

            let oSelectFood = {};

            /*
             * 메뉴를 선택하면 메뉴 테이블에 추가하는 함수
             * @param {Number} menuId
           */

            function selectFood(menuId) {
                const menu = menus.filter((m) => m.menuId == menuId)[0];
           
                if (oSelectFood[menu.menuId]) { //oSelectFood 객체에 menu.menuId 번호를 가진 '키' 가 존재한다면 true 반환
                    return alert("이미 추가된 메뉴입니다.");
                }
                oSelectFood[menu.menuId] = menu;
     
                // 메뉴버튼을 클릭한적이 없으면 선택된 메뉴를 oSelectFood 객체의 키를 메뉴의 id번호로 대입한다. 
                // oSelectFood 라는 객체에 menuId의 이름으로 menu를 대입한다.
                // 예) oSelectFood = { 1: { }, 2: { }, 3: { } ,...}


                let tr = [];
                tr.push("<tr>");
                tr.push(`<td>${menu.menuName}</td>`);
                tr.push(`<td>${menu.price}</td>`);
                tr.push(
                    `<td><input type="number" value="1" step="1" min="1" style="width:100%;" onchange="changeLineSum(event, ${menu.price});"></td>`
                );
                tr.push(
                    `<td><input type="text" value="${menu.price * 1
                    }" style="width: 100%;" class="line-sum" readonly></td>`
                ); //선택된 메뉴의 갯수에 따라 금액이 달라지는 것을 class로 접근해서 계산하는 구나..
                tr.push("</tr>");
                document
                    .getElementById("selectedMenusTb")
                    .insertAdjacentHTML("beforeend", tr.join(""));

                calculateTotalAmount();

            }

            /*
             * 메뉴 버튼을 만드는 함수
             */


            function loadMenus() {
                let h = [];
                for (let menu of menus) {
                    h.push(
                        `<button class="menu" onclick="selectFood(${menu.
                            menuId});">${menu.menuName}(${menu.price}원)</button>`
                    ); // Menus 배열에서 각 배열요소의 메뉴이름과 가격을 요소의 내용으로 ,menu의 메뉴아이디 번호를 클릭시 selectFood의 매개변수로
                    // 보낸다.
                }
                document.getElementById("divMenus").innerHTML = h.join("");
            }


            /**
            * 신용카드 /통신사/ OK캐시백/ 포인트를 선택할수 있는 select 박스를 구성하는 함수 
            */

            function loadCards() {

                let oCards = {};

                for (let card of creditCards) { // for ... of 배열의 반복에서 사용
                    if (!oCards[card.cardType]) { // 객체에 credit.cardType의 이름을 가진 key 요소가 없는 경우
                    //, 예를 들어, CREDIT, TELECOM, POINT, OKCASHBACK

                        oCards[card.cardType] = [];
                        // 객체에 credit.cardType의 key 요소가 없는 경우, card.cardType의 이름을 가진 key요소에  
                        //배열을 초기화 한다. 예) oCards = { creditcard: []; }
                    }
                    oCards[card.cardType].push(card);
                    // 예) { creditcard: [ { }, { }, { }, ...], telecom: [ ]}


                }
                // for ...in 객체의 반복에서 사용
                for (key in oCards) { // 여기서 key 는 객체의 각 요소의 이름이다. 예) CREDIT, TELECOM, POINT, OKCASHBACK
              
                    let h = [];
                    h.push(
                        `<option value="">${cardTypes.filter((c) => c.cardType == key)[0].title 
                         } 선택하세요.</option>`
                        // 할인 종류의 cardType 이름이 key요소와 같으면 true 인것만 새 배열로 반환, 
                        //반환되는 배열요소가 하나기에 [0]으로 선택후, title 출력 => 신용카드, 통신사 등등
                       

                        
                    );

                    console.log(key[0]);
                    for (card of oCards[key]) { // 각 키의 배열요소 하나씩 방문
                        h.push(
                            `<option value="${card.discount}">${card.cardName}</option>`
                        );
                    }

                    document.getElementById("sel" + key).innerHTML = h.join("");
                    // id가 sel로 시작하는 각 select요소에 option 하위요소를 대입하여 선택 리스트를 만든다. 
                }
                let h = [];

                h.push(`<option value="">할인쿠폰을 선택하세요. </option>`);
                for (let coupon of coupons) {

                    h.push(`<option value =${coupon.couponId}>${coupon.title}</option>`);
                }

                document.getElementById("selCoupons").innerHTML = h.join("");
            }


            /**
            *선택한 메뉴와 할인종류에 따른 총 결제금액을 계산하는 함수
            */

            function calculateAmount() { // '결제 금액 계산' 버튼을 누르면

                if (total == 0) { // 선택된 메뉴의 총 금액이 '0'이면
                    return alert("메뉴를 먼저 선택하세요.");
                }

                let realTotal = total;
                let discount = 0;
                for (let type of cardTypes) {
                    if (document.getElementById("sel" + type.cardType).value != "") //select의 하위요소인 option이 선택되어 value가 있다면 

                    {
                        let cardDiscount = parseInt(
                            document.getElementById("sel" + type.cardType).value
                        ); // 선택된 option요소의 value를 정수화하여 변수에 대입한다.

                        if (cardDiscount > discount) {
                            discount = cardDiscount;
                        } //cardDiscount 율이 discount('0')보다 크면 discount에 cardDiscount 금액 대입
                        // 여기에 왜 0보다 크다는 걸 명시해 놨을까? 안해도 다 할인율이 '0'보다 크지 않나?
                    }
                }

                let couponId = document.getElementById("selCoupons").value;
                let coupon = null;
                if (couponId != "") { // 쿠폰이 선택됨.
                    coupon = coupons.filter((c) => c.couponId == couponId)[0];
                    // 선택된 option 의 value와 coupons 배열 중 방문한 객체에서 동일한 couponId를 찾으면 새로운 배열을 반환(filter() 메서드의 결과)하여 coupon 변수에 대입한다. 딱 한개로 구성된 배열이 만들어져서 [0]를 쓰는 거임
                    // 배열 내 객체가 coupon에 대입됨

                    /**(할인 값이 적용이 안됐던 버그의 이유)
                    * "==="는 값뿐만 아니라, 값의 타입까지 체크하기때문에 "=="로 변경함
                    * console.log(coupon); 이런 작은 디테일이 프로그램 전체의 오작동의 원인이 될 수 있구나... 그래도 디버깅 중 이유를 발견하고 이해 했다는 내가 대견하다.
                    * */
                }


                if (coupon != null && coupon.doubleDiscount) { // 쿠폰이 선택되었고 (coupon != null) 가 'true' && coupon의 doubleDiscount가 'true'인 경우에만 실행되는 조건문
                    let discountAmount = 0;

                    if (coupon.discountType == "%") {
                        discountAmount = Math.round(total * (coupon.discount / 100)); // 할인율을 총 금액과 곱해서 할인 금액을 구해서 대입 함

                    } else {

                        discountAmount = coupon.discount; // 할인 금액을 대입
                    }

                    realTotal = realTotal - discountAmount; // 총 금액에서 쿠폰 discountAmount를 뺀다.

                    if (discount > 0) { // 또한 , 카드 할인율이 선택된 경우
                        realTotal = realTotal - Math.round(realTotal * (discount / 100));
                    }// 여기서 discount는 카드의 discount의 할인율을 의미
                    // 쿠폰 할인 금액에서 신용카드의 할인 금액 추가적으로 최종금액에서 뺌.

                
            } else { // 쿠폰이 선택되지않았거나(null), 쿠폰의 더블할인 적용률이 false  인 경우여서 &&연산자의 결과가 false로 나옴

                if (discount > 0) {  // 카드의 할인율이 선택된경우(신용카드, 통신사,OK캐시백, 포인트)
                    const discountAmount = Math.round(realTotal * (discount / 100)); // 카드 할인금액을 대입

                    if (coupon != null) { // 카드의 할인율이 선택되고, coupon이 선택된경우지만 더블할인이 적용 안됨.
                        if (discountAmount > coupon.discount) { // 카드의 할인율이 큰 경우
                        // 카드의 할인 적용률과 쿠폰의 할인적용률의 금액을 비교하여 하나만 할인 적용한다.(할인이 중복되지 않도록)
                            realTotal = realTotal - discountAmount;
                        } else { // 쿠폰의 할인이 큰 경우(쿠폰이 선택된 경우이니)

                            realTotal = realTotal - coupon.discount; // 쿠폰의 할인율을 총 금액에서 적용한다.
                        }
                    } else { // 쿠폰이 선택되지 않은 경우 카드의 할인율만 적용한다. 
                        // 쿠폰도 선택안되니 자연스럽게 쿠폰율도 적용되지 않는 것(false)이다.

                        realTotal = realTotal - discountAmount; // 신용카드 할인율만 적용함.
                    }
                }
            }

            document.getElementById("realTotal").innerText = realTotal + "Won";
            document.getElementById("divRealTotal").style.display = "";
            }

            window.addEventListener("load", function () {
                loadMenus();
                loadCards();
            });
        </script>
    </body>

    </html>
 ~~~
