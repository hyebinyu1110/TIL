
# 바닐라 자바스크립트 By 고승원

> * SNS 로그인
> 
> * 네이버 계정으로 로그인은 OAuth 2.0기반의 사용자 인증 기능을 제공해 우리가 개발하는 애플리케이션 내에서 네이버의 사용자 인증 기능을 이용할 수 있게 해주는 서비스
-----
  ## 공부한 내용

##  1. 0Auth 2.0 란?
    + 타사의 사이트에 대한 접근 권한을 얻고, 그 권한을 이용하여 개발할 수 있도록 도와주는 프레임워크이다.
    + 네이비브 앱키, 자바스크립트 앱키, REST API 키, Admin키 가 있는데, 자바스크립트로 구현할 것이기에,  JavaScript키를 사용한다.
    + 앱키는 우리가 구현하고 있는 애플리케이션 내에서 카카오 로그인 기능을 사용할 때 인증을 위해 사용한다. 

<br/>
<br/>


OAuth란, 타사의 사이트에 대한 접근 권한을 얻고, 그 권한을 이용하여 개발할 수 있도록 도와주는 프레임워크
[출처] [OAuth] OAuth 2.0 개념 정리|작성자 pjok1122

~~~Java Script
<!DOCTYPE html>
<html>
    <head>
        <title>Document</title>
        <!-- <pre>태그 안에 엄청난 양의 HTML요소가 적혀있었다. 밑의 링크로 들어가보니... -->
        <script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="UTF-8"></script>
    </head>

    <body>
        
        <div id="naverIdLogin"></div>
        <script>
            const naverLogin = new naver.LoginWithNaverId({
                clientId: "aHdN_FcwFD56rJTgTUR2", // 개발자센터에 등록한 ClientID 
                callBackUrl: "http://localhost:5500/naverlogin.html", // 개발자센터에 등록한 callback Url
                isPopup: true, // 팝업을 통한 연동처리 여부
                loginButton: { color: "green", type: 3, height: 60}, // 로그인버튼의 타입을 지정
                
            });

            // 설정정보를 초기화하고 연동을 준비
            naverLogin.init();

            function getLoginStatus(){
                naverLogin.getLoginStatus((status) =>{
                    if(status){
                        //status가 true면 로그인된 상태임
                        console.log(status);
                        console.log(naverLogin.user);

                        //필수적으로 받아야 하는 프로필정보가 있다면 callback 처리시점에 체크
                        let email = naverLogin.user.getEmail();
                        if(email === undefined || email === null){
                            alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
                            // 사용자 정보 재동의를 위하여 다시 네이버 아이디 동의페이지로 이동
                            naverLogin.reprompt();
                            return;

                        }
                    }else {
                        console.log("callback 처리에 실패하였습니다.");
                    }
                });
            }

            getLoginStatus(); // 네이버 아이디 로그인 성공 후 콜백 URL인 현재 페이지가 다시 열리게 되고, 이때 로그인 정보를 가져옴.

        </script>
    </body>
</html>
~~~

<공부할때 참조한 블로그>

* [출처: 작성자 pjok1122] [OAuth 2.0 란?](https://blog.naver.com/pjok1122/221583426424)
