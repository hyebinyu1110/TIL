### 참조: React 공식 홈페이지 : [FAQ-Passing Functions to Components](https://reactjs.org/docs/faq-functions.html#how-do-i-bind-a-function-to-a-component-instance)

## How do I pass an event handler (like onClick) to a component?
(컴포넌트에 event handler (onClick 과 같은)를 어떻게 전달하나요?)

    - event handler와 다른 함수를 props로서 자식 컴포넌트로 전달하세요. 
    
~~~Java Script
<button onClick={this.handleClick}>
~~~
    - 만약 event handler에 있는 부모 컴포넌트에 대해 접근할 필요가 있다면, 또한 당신은 컴포넌트 instance로 함수를
    bind 할 필요가 있습니다.(아래를 봐주세요)

## How do I bind a function to a component instance?
(어떻게 component instance로 함수를 bind 하나요?)

### Bind in Constructor (ES2015) (ES2015버전으로 생성자에서 bind 하기)
~~~Java Script
class Foo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
~~~
### Class Properties (Stage 3 Proposal)(클래스 속성으로 바인딩하기)
~~~Java Script
class Foo extends Component {
  // Note: this syntax is experimental and not standardized yet.
  // 이 구문은 아직 실험적이고 표준화되지 않았습니다.
  handleClick = () => {
    console.log('Click happened');
  }
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
~~~
### Bind in Render(렌더링 함수에서 bind 하기)
~~~Java Script
class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <button onClick={this.handleClick.bind(this)}>Click Me</button>;
  }
}
~~~
Note:
 
    - render 에서 Function.prototype.bind 를 사용하는 것은 component가 렌더링 할때마다 새로운 함수를 생성하는 것입니다. 
    이것은 어쩌면 성능에 영향을 끼칠지 모릅니다.(아래를 봐주세요)


Arrow Function in Render(render에서 화삺표 함수)
~~~Java Script
class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <button onClick={() => this.handleClick()}>Click Me</button>;
  }
}
~~~
Note:

    - render 에서 화살표 함수( () => {} )를 사용하는 것은 컴포넌트가 렌더링할 때마다 새로운 함수를 생성하는 것입니다. 
    새로운 함수를 생성하는 것이 strict identity comparison(엄격한 신원 확인)을 기반으로한 최적화(최대한의 이용)을 약화시킬지 모릅니다.
Using an arrow function in render creates a new function each time the component renders, which may break optimizations based on strict identity comparison.

## Is it OK to use arrow functions in render methods?
(화살표 함수를 render methods에서 사용하는 것이 괜찮은가요?)

     - 일반적으로 이야기하자면, 괜찮습니다. 그리고 종종 매개변수를 콜백함수에 전달하는 가장 쉬운 방법입니다.

     - 만약 성능 문제를 가지고 있다면 무슨 수를 쓰더라도, 최적화하십시오!(최대한 좋게 만드십시오!)


## Why is binding necessary at all?
(도대체 왜 binding 이 필요한가요?)
    - JavaScript 에서는 아래의 두 코드 토막은 동일하지 않습니다. 

1)
~~~Java Script
obj.method();
~~~

2)
~~~Java Script
var method = obj.method;
method();
~~~

    - Binding 메서드는 두번째 코드가 첫번째와 같은 방식으로 작동하도록 보장하게 합니다.

    - React로, 일반적으로 다른 컴포넌트로 당신이 전달하는 메서드만 bind 할 필요가 있습니다. 
    - 예를 들어 <button onClick={this.handleClick}> 는 this.handleClick을 전달합니다. 그래서 당신은 this.handleClick을 bind 하기를 원합니다.
    - 그러나 lifeCycle 메서드나 render 메서드를 bind 하는 것은 필요하지 않기에, 우리는 다른 component들로 (lifeCycle 메서드나 render 메서드)를 
    전달하지 않습니다.
    

Yehuda Katz가 적은 이 포스트는 binding이 무엇인지, 자바스크립트에서 어떻게 함수가 작동하는지 자세하게 설명합니다. 



