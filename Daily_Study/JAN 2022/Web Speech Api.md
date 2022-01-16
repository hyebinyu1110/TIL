# Web Speech Api.
> 웹화면에 음성 인식 시작 버튼과 종료 버튼이 있고, 사용자가 입력한 음성을 텍스트로 전화해서 input필드에 보여주는 예제 코드

~~~ web speech api
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
  </style>

</head>
<body>
  <input type="text" id="speech_result" />
  <button onClick="startSpeechRecognition();">Start Record</button>
  <button onClick="endSpeechRecognition();">Stop Record</button>
  <script>
    let recognition = null;
    function checkCompatibility(){
      recognition = new webkitSpeechRecognition();
      if(!recognition){ // Web Speech API를 사용할 수 없음
      alert("You cannot use speech api.")   
    };
    recognition.lang = "en"; // 사용할 언어 코드 지정
    recognition.maxAlternatives = 3;  // 음성에 대한 텍스트 전환시 음성에 가장 가까운 텍스트 3개까지 결과를 받게됨.
    console.log(recognition);
  }
  window.addEventListener("load", checkCompatibility);
// 음성인식 시작함수
function startSpeechRecognition(){
  recognition.addEventListener("speechstart", ()=>{
    // 음성시작
    console.log("speech start");
  });
recognition.addEventListener("speechend", ()=>{
  //음성 종료
  console.log("speech end");
});
recognition.addEventListener("result", (event) =>{
  //음성 결과 가져오기
  console.log("Speech Result", event.results);
  const text = event.results[0][0].transcript;
  document.getElementById("speech_result").value = text;
  //음성을 텍스트로 전환한 결과를 보여줌.
});
recognition.start(); //음성인식 시작
}
/*음성인식 종료 함수*/
function endSpeechRecognition(){
  recognition.stop(); //음성인식 종료
};
  </script>
</body>

</html>
~~~
