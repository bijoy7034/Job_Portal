import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth";
import Register from "./pages/register"
import MyJobs from "./pages/myJobs";
function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home/myjobs" element={<MyJobs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
