# TIL 정보 스택 저장소

> 자바스크립트를 공부하다가 발견한 에러를 해결하기위해 배운 정보를 여기에 매일 쌓아 놓고 기록하려고 한다.

-----------------

## 목차

1. Uncaught ReferenceError: SpeechRecognition is not defined

-----------------


## 1. Uncaught ReferenceError: SpeechRecognition is not defined 가 발생하는 이유
+ Vanila JavaScript 책을 공부하면서 Web Speech API를 공부하기위해 아래의 코드를 쳤는데 위의 오류가 발생하였다. 
+ 
     ` recognition = new SpeechRecognition();`
+ Stack Flow 에 찾아보니(아래의 URL 참조) HTML5로 개정되면서 API 함수 이름도 업데이트가 된듯!
+ Reference -  [Speech-to-text with javascript in Chrome doesn't recognize anything](https://stackoverflow.com/questions/22932636/speech-to-text-with-javascript-in-chrome-doesnt-recognize-anything/22933671)
+ 따라서 ` recognition = new SpeechRecognition();` 가 아니라 ` recognition = new webkitSpeechRecognition();` 로 적어야 정상 작동한다.

