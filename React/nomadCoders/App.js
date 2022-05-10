
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);


  useEffect(() => {
    console.log("CALL THE API...")
  }, []);

  useEffect(() => {
    console.log("I run only when keyword changes");
  }, [keyword]);

  useEffect(() => {
    console.log("I run only when counter changes");
  }, [counter]);

  useEffect(() => {
    console.log("I run only when counter&counter changes");
  }, [counter, keyword]);

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange} 
        type="text" 
        placeholder="Search here...."></input>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
