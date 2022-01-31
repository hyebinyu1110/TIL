# 바닐라 자바스크립트 By 고승원

> 14장 실습예제 (1)
> 
> 음료 자판기 계산

## 주목할 함수

##  1. Element.className 
    + 특정요소의 클래스의 값을 설정하거나 가져올수 있다.
    + 아래의 코드에서 참조한 예시 
    1) document.getElementById("btnDrink" + drink.drinkId).className ="drink active"
    2) document.getElementById("btnDrink" + item.drinkId).className = "drink"
    + 보통은 Element.classList.add('추가할 클래스 이름')으로 클래스를 추가 했다.
    + 하지만 위의 예시와 같이 그냥 클래스 네임으로 대입하는 형식으로 클래스가 설정이 가능 하다.
    + 또한, 아래와 같이 클래스의 값을 가져올 수 있다.
    + 콘솔 상 결과(아래 예시)
    + const whatIsClassName = document.getElementById("btnDrink" + 1).className;
    + undefined
    + whatIsClassName
    + 'drink active'

##  2. Element.classList (Element.className 과 비슷한, 그러나 유용한 많은 메서드를 가지고 있는)
    + MDN에는 Element.classList가 요소의 클래스 속성의 콜렉션인 활성 DOMTokenList를 반환하는 읽기 전용 속성이라고 한다.
    + 콘솔에 이렇게만 작성하여 결과를 보면 document.getElementById("btnDrink" + 1).classList;
    + DOMTokenList(2) ['drink', 'active', value: 'drink active']
      0: "drink"
      1: "active"
      length: 2
      value: "drink active"
      [[Prototype]]: DOMTokenList
     + 배열처럼 보이지만 배열이 아닌 DOMTokenList라고 리스트 형식으로 나온다. 
     + classList는 DOMTokenList 형식을 가지고 있기에 아래와 같이 다양한 메서드가 사용가능하다.
     
     
##  3. Element.classList.add(추가할 클래스 문자열, ...여러개 가능)   
    + add 메서드를 사용해 클래스 값을 추가한다.
    
    
##  4. Element.classList.remove(제거하고픈 클래스 문자열, ...여러개 가능)   
    + 존재하지 않는 클래스를 제거하는 것은 `오류를 발생시키지 않는다`라고 한다.
    
    
##  5. Element.classList.item(숫자)
    + DOMTokenList 요소 중 인덱스 번호를 이용하여 인덱스 번호에 해당하는 클래스 속성값 반환


##  6. Element.classList.toggle( 문자열 [, force] )
    + 토글뒤에 지정된 클래스 값이 없으면 삽입하고 있으면 제거한다.
    + 옵션인 두번째 인자가 true로 판단되면, 첫번째 인자를 추가하고, false로 판단되면 제거한다.


##  7. Element.classList.contains(문자열)
    + 문자열과 동일한 클래스 값이 있는지 확인 후 , 존재하면 true, 존재하지 않으면 false 반환
    
    
##  8. Element.classList.replace(바뀔 클래스 값, 대체할 클래스 값)
    + 첫번째인자 클래스 값을 두번째 인자로 바꾼다.


~~~Java Script
<iDOCTYPE html>
    <html>

    <head>
        <title>음료 자판기</title>
        <style>
            .coin {
                padding: 5px;
                margin-right: 5px;
            }

            .drink {
                padding: 5px;
                margin-right: 5px;

            }

            .active {
                background-color: yellow;
            }
        </style>
    </head>

    <body>

        <div id="divCoins"></div>
        <br />
        <div>
            <label for="">음료 자판기에 저장된 총 금액</label>
            <input type="text" name="" id="total_vending_amount" value="1000" readonly />
            <label for="">투입금액</label>
            <input type="text" name="" id="total_input_amount" value="0" readonly />
            <label for="">내 지갑</label>
            <input type="text" name="" id="total_customer_amount" value="10000" readonly />
        </div>
        <br />
        <div id="divDrinks"></div>
        <br />
        <div id="output" style="width: 100%; height: 150px; overflow-y:auto;border: 2px solid #222">
        </div>
        <script>
            let total_vending_amount = 1000; // 자판기 잔고 금액
            let total_customer_amount = 10000; // 자판기에 투입된 금액
            let total_input_amount = 0; // 고객 지갑에 있는 금액

            const drinks = [ // 음료 자료구조
                {
                    drinkId: "1",
                    drinkName: "코카콜라",
                    price: 700,
                    stock: 5,

                },
                {
                    drinkId: "2",
                    drinkName: "오렌지주스",
                    price: 1200,
                    stock: 5,

                },
                {
                    drinkId: "3",
                    drinkName: "커피",
                    price: 500,
                    stock: 5,

                },
                {
                    drinkId: "4",
                    drinkName: "물",
                    price: 700,
                    stock: 5,

                },
                {
                    drinkId: "5",
                    drinkName: "옥수수수염차",
                    price: 1200,
                    stock: 5,

                },
                {
                    drinkId: "6",
                    drinkName: "밀키스",
                    price: 700,
                    stock: 5,

                },
                {
                    drinkId: "7",
                    drinkName: "트레비",
                    price: 700,
                    stock: 5,

                },
            ]
            /*
             * 동전 버튼을 클릭할때마다 투입한 금액 처리 함수
             * @param {Number} amount
             */
            
             function inputAmount(amount){
                 let output = document.getElementById("output"); //ouput은 결과알려주는 메시지창
                 if(amount <= total_customer_amount){
                     //고객 지갑에 투입하려는 금액만큼 있는지 체크
                     total_input_amount += amount;
                     total_customer_amount -= amount;
                     total_vending_amount += amount;

                     for(let drink of drinks){

                        if(drink.price <= total_input_amount){
                            document.getElementById("btnDrink" + drink.drinkId).className ="drink active"; // 요소의 클래스에 active를 추가 
                        }
                     }

                     document.getElementById("total_input_amount").value = total_input_amount;
                     document.getElementById("total_customer_amount").value = total_customer_amount;
                     document.getElementById("total_vending_amount").value =
                     total_vending_amount;

                     output.insertAdjacentHTML("beforeend", `<p>${amount}원이 투입되었습니다.</p>`);
                     output.insertAdjacentHTML("beforeend", `<p>총 투입 금액은 ${total_input_amount}입니다.</p>`);
                     output.insertAdjacentHTML("beforeend", `<p>당신의 지갑에는 ${total_customer_amount}이 남아있습니다.`);

                 }else{
                     output.insertAdjacentHTML("beforeend", `<p>내 지갑에 남아있는 돈이 ${total_customer_amount}입니다.</p>`);
                     output.insertAdjacentHTML("beforeend", `<p>${amount}를 투입할 수 없습니다.</p>`);
                     
                 }
                 console.log(`output.scrollTop = ${output.scrollTop}`);
                 output.scrollTop = output.scrollHeight;
               
                 console.log(`output.scrollHeight = ${output.scrollHeight}`);
                 console.log(`output.scrollTop = ${output.scrollTop}`);
                 console.log(`output.clientHeight=${output.clientHeight}`);
                }

                 /*
                  * 음료 버튼을 클릭하면, 음료구매가 가능한지 확인하는 함수
                  * @param {Number} drinkId
                  */
                 
                function requestDrinks(drinkId){
                    let output = document.getElementById("output");
                    let drink = drinks.filter((d) => d.drinkId == drinkId)[0];
                    if(drink.stock>0){
                        if(total_input_amount >=drink.price){
                            let changes = total_input_amount - drink.price;
                            if(total_vending_amount>=changes){
                                output.insertAdjacentHTML("beforeend", `<p>${drink.drinkName}음료가 나왔습니다.잔돈 ${changes}이 나옵니다.</p>`);
                                total_customer_amount +=changes;
                                drink.stock -=1;
                                total_input_amount = 0;
                                total_vending_amount -= changes;

                                document.getElementById("total_input_amount").value = total_input_amount;
                                document.getElementById("total_customer_amount").value = total_customer_amount;
                                document.getElementById("total_vending_amount").value = total_vending_amount;

                                document.getElementById("drink_stock" + drinkId).innerText = drink.stock;

                                output.insertAdjacentHTML(
                                    "beforeend",
                                    `<p>이제 당신 지갑에는 총 ${total_customer_amount} 있습니다.</p>`
                                );

                                for(let item of drinks){
                                    document.getElementById("btnDrink" + item.drinkId).className = "drink";
                                }

                            }else{

                                output.insertAdjacentHTML("befoeend", `<p>음료자판기에 잔돈이 없어서 ${drink.drinkName} 음료를 구매할 수 없습니다.</p>`);
                            }

                        }else{
                            output.insertAdjacentHTML("beforeend", `<p>투입하신 금액은 총 ${total_input_amount}인데, 음료가격은 ${drink.price}여서 구매할 수 없습니다.</p>`);
                        }
                    }else{
                        output.insertAdjacentHTML("beforeend", `<p>선택하신 음료 ${drink.drinkName}이 재고가 없습니다.</p>`);

                    }
                    output.scrollTop = output.scrollHeight;
                }

                /*
                 * 동전 버튼을 화면에 출력하는 함수
                 */

                 function renderCoins(){
                     const coins = [100,500, 1000];
                     const h = [];

                     for(const coin of coins){
                         h.push(`<button onclick="inputAmount(${coin});" class="coin">${coin}원투입</button>`
                         );
                     }
                     document.getElementById("divCoins").innerHTML = h.join("");
                 }
                 /*
                  * 음료 버튼을 화면에 출력하는 함수
                  */
                 
                  function renderDrinks(){

                    const h = [];
                    for(const drink of drinks){

                        h.push(`<button onclick="requestDrinks(${drink.drinkId})" id="btnDrink${drink.drinkId}" class="drink">${drink.drinkName}(${drink.price}원, 재고수<span id="drink_stock${drink.drinkId}">${drink.stock}</span>)</button>`
                        );
                    }
                    document.getElementById("divDrinks").innerHTML = h.join("");
                  }

                  window.addEventListener("load", function(){
                      renderCoins();
                      renderDrinks();
                  });     
        </script>
    </body>

    </html>
~~~
