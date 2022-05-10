
import { useState, useEffect } from "react";

function Hello(){
  useEffect(function(){
    console.log("created :0");
    return function(){
      console.log("bye :(");
    }
  }, [])
  return <h1>Hellow</h1>
}
function App() {
  const [showing, setShowing] = useState(true);
  const onClick = () => setShowing((prev)=> !prev);


  return (
    <div>
      {showing? <Hello />: null}
      <button onClick={onClick} >{showing? "HIDE" : "SHOW"}</button>
    </div>
  );
}

export default App;
