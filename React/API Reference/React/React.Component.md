  ### 참조: React 공식 홈페이지 : [API REFERENCE-React-constructor()](https://reactjs.org/docs/react-component.html#constructor)
  
  
  
  ## constructor()
~~~Java Script
constructor(props)
~~~

    - 만약 당신이 state 를 초기화 하지 않고, methods 를 bind 하지 않는 다면, 당신의 React 컴포넌트를 위해 constructor(생성자 함수)를
    실행할 필요가 없습니다.
    - React 컴포넌트를 위한 constructor 함수는 컴포넌트가 mount(상위 컴포넌트에 올라타기, 조립되기) 전에 호출되어 집니다. 
    React.Component 의 하위 클래스를 위한 constructor를 실행할 때, 당신은 super(props) 를 어떤 다른 표현식 전에 호출하여야 합니다. 
    그렇지 않으면 this.props 는 constructor 에서 undefined 가 될것이며, bug 를 초래할 수 있습니다.
    
    - 전형적으로, React에서 생성자들은 오직 두 가지 목적으로 사용되어 집니다. 
    
    1) 객체를 this.state로 배치함으로써, 지역 state를 초기화하기
    2) event handler 메서드를 instance로 binding 하기 // this.handleClick = this.handleClick.bind(this)

    - 당신은 setState() 를 constructor() 에서 호출하지 말아야합니다. 대신에 당신의 컴포넌트가 지역 state 를 사용할 필요가 있다면, 
     constructor 에서  바로 초기의 state 를 this.state 로 배정해야 합니다.  
~~~Java Script
constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
~~~
    - constructor 는 당신이 this.state 를 직접적으로 배정해야하는 유일한 장소 입니다. 다른 메서드에서는 대신 this.setState()를 사용할 필요가
    있습니다.
    - 어떠한 side-effects(부작용) 이나 (서비스)사용을 constructor 에서 도입하는 것을 피해주세요. 이러한 사용 경우를 위해,
    componentDidMount()를 대신에 사용하세요.

Note

- props 를 state 로 복사하는 것을 피하세요! 아래의 예가 흔한 실수를 보여줍니다. 
~~~Java Script
constructor(props) {
 super(props);
 // Don't do this!
 this.state = { color: props.color };
}
~~~
    - 문제(props를 state로 복사하는것) 는 불필요하며 (this.props.color를 대신에 바로 사용가능합니다.), 
      그리고 bug를 생성합니다.(color prop 으로의 업데이트가 state에 반영되지 않을 것입니다.)

    - 당신이 고의적으로 prop 업데이트를 무시하고 싶은 경우에만 이 pattern을 사용하세요. 그 경우에는 prop을 initialColor 나
    defaultColor 로 불리도록 다시 이름짓는 것이 이해가 쉽습니다.(타당합니다).
    - 그러면 당신은 필요할때 state의 key를 바꿈으로써 컴포넌트가 자체의 내부 state를 "reset" 하도록 강제할 수 있습니다. 
    
(Only use this pattern if you intentionally want to ignore prop updates. In that case, it makes sense to rename the prop to be called initialColor or defaultColor. You can then force a component to “reset” its internal state by changing its key when necessary.)



    -  만약 props에 의존하는 여러개의 state 가 필요하다고 생각한다면 무엇을 할지를 배우기 위해 derived state를 피하기위한 
    우리의 블로그 포스트를 읽어주세요.
    (Read our blog post on avoiding derived state to learn about what to do if you think you need some state
    to depend on the props.)
