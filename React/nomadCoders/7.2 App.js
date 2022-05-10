
import { useState } from "react";


function App() {
const [toDo, setToDo] = useState("");
const [toDos, setToDos] = useState([]);
const onChange = (event) => setToDo(event.target.value); console.log(toDo);
const onSubmit = (event) => {
  event.preventDefault();
  if(toDo === ""){
    return;
  }
  setToDos((prev)=> [toDo, ...prev]);
  setToDo("");
}
console.log(toDos);
  return <div>
    <form onSubmit={onSubmit}>
      <h1>To Do List({toDos.length})</h1>
    <input 
    onChange={onChange} 
    value={toDo}
    type="text" 
    placeholder="write what you want to do">
    </input>
    <button>Add to do</button>
    <hr/>
    <ul>
    {toDos.map((item, index)=><li key={index}>{item}</li>)}
    </ul>
    
    </form>

  </div>

}

export default App;
