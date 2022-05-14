import { // url 을 바라보고 있다가 url이 바뀌면 어떤걸 보여줄지 결정함 
  BrowserRouter as Router,
  Switch,
  Route,
  // 브라우저 새로고침 없어도 유저를 다른 페이지로 이동시켜주는 컴포넌트 
} from "react-router-dom"; // 스크린을 route 별로 생각하기
import Home from "./routes/Home";
import Detail from "./components/Details";

function App() {

  return <Router> 
    <Switch>
      <Route path="/movie/:id">
        <Detail />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
}
export default App;
