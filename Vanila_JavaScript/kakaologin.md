# 바닐라 자바스크립트 By 고승원

> * SNS 로그인
> 
> * 카카오 계정으로 로그인은 OAuth 2.0기반의 사용자 인증 기능을 제공해 우리가 개발하는 애플리케이션 내에서 카카오의 사용자 인증 기능을 이용할 수 있게 해주는 서비스
-----
  ## 공부한 내용

##  1. JavaScript 키
    + [카카오개발자센터](https://developers.kakao.com/)에 가입한 후, 개발 중인 어플리케이션에서 사용할 수 있는 JavaScript 앱 키를 
      발급받는다.
    + 네이비브 앱키, 자바스크립트 앱키, REST API 키, Admin키 가 있는데, 자바스크립트로 구현할 것이기에,  JavaScript키를 사용한다.
    + 앱키는 우리가 구현하고 있는 애플리케이션 내에서 카카오 로그인 기능을 사용할 때 인증을 위해 사용한다. 

<br/>
<br/>

##  2. localhost란?   
    + 
<br/>

##  3. 리다이렉트 URI 란?
    + 카카오 로그인 화면에서 사용자가 '동의하고 계속하기' 버튼을 클릭했을 때 호출되는 카카오 서비스가 내가 개발하고 있는 
      애플리케이션 URI이다. 
    + 여기에 등록된 Redirect URI를 통해 카카오 서비스에서 사용자의 기본정보를 보내주게 되고, 내가 개발하고 있는 애플리케이션
      내에서 이 정보를 이용해서 로그인 처리를 진행한다.
    + 책의 예제에 따라, kakaologin.html 파일을 만들어 카카오 로그인을 구현할 것이라서, Redirect URI는
      http://localhost:5500/kakaologin.html 이라 등록한다.
<br/>

##  4. 카카오 JavaScript SDK 란?
    + 카카오 로그인 컴포넌트를 구현하기에 앞서 카카오 로그인을 이용하기위해 카카오에서 제공하는 JavaScript SDK를 
      등록해야 한다.
~~~Java Script
  <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
~~~
    + 또한, 카카오 개발자 센터에서 애플리케이션을 생성받고 발급받은 JavaScript앱키를 등록한다. 
~~~Java Script
  Kakao.init("16a8e03a42c85cb0396b697340f4e11f"); // 발급받은 앱 키
~~~
<br/>

##  5. 로그인 및 로그아웃 함수구현(아래 예시)

~~~Java Script
 function kakaoLogin() {
                Kakao.Auth.login({
                    scope: "profile_nickname, account_email", // 동의항목에서 설정한 ID와 반드시 일치해야함.
                    success: function () {
                        //로그인성공
                        Kakao.API.request({
                            //사용자 정보를 가져오기 위한 API
                            url: "/v2/user/me",
                            success: (res) => {
                                //사용자 정보를 가져오는데 성공
                                const kakaoAccount = res.kakao_account; // 사용자 계정정보
                                console.log(kakaoAccount);
                                document.getElementById("custom-login-btn").style.display = "none"; //로그인 버튼 숨기기
                                document.getElemenyById("logout-btn").style.display = ""; // 로그아웃 버튼 보이기
                            },    
                });
            },
            fail: function(error){
                // 로그인 실패
                console.log(error);
            },
        });
    }
    function kakaoLogout(){
        if(!Kakao.Auth.getAccessToken()){
            // 로그인을 했으면 Access Token이 발급되어 있음. 없으면 아직 로그인하지 않은 것임.
            console.log("Not logged in.");
            return;
        }
        Kakao.Auth.logout((res) =>{
            // 로그아웃 함수 호출
            console.log(window.Kakao.Auth.getAccessToken());
            console.log(res);
            document.getElementById("custom-login-btn").style.display = "";
            // 로그인 버튼 보이기
            document.getElementById("logout-btn").style.display = "none";
            //로그아웃 버튼 숨기기
        });
    }
~~~


##  6. 로그인 시도시 `{error: 'unauthorized', error_description: 'unauthorized - unregistered website domain'}` 에러가 뜨는 이유는?
    + 





















