### 참조: React 공식 홈페이지 : [FAQ-Passing Functions to Components](https://reactjs.org/docs/faq-functions.html#how-do-i-bind-a-function-to-a-component-instance)

## How do I pass an event handler (like onClick) to a component?
(컴포넌트에 event handler (onClick 과 같은)를 어떻게 전달하나요?)

    - event handler와 다른 함수를 props로서 자식 컴포넌트로 전달하세요. 
    Pass event handlers and other functions as props to child components:
~~~Java Script
<button onClick={this.handleClick}>
~~~
    - 만약 handler에 있는 부모 컴포넌트에 대해 접근할 필요가 있다면, 또한 컴포넌트 instance로 함수를 bind 할 필요가 있습니다.(아래를 봐주세요)
If you need to have access to the parent component in the handler, you also need to bind the function to the component instance (see below).


## How do I bind a function to a component instance?
