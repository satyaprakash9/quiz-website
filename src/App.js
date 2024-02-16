import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Questions from "./components/Questions";
import Show from "./components/Show";
import Score from "./components/Score";
import Available from "./components/Available";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Home />
            </>
          }></Route>
          <Route path="/available" element={
            <>
              <Available/>
            </>
          }></Route>
          <Route path="/create" element={
            <>
              <Create />
            </>
          }></Route>
          <Route path='/questions' element={
            <>
              <Questions/>
            </>
          }></Route>
          <Route path='/show/:quizID' element={
            <>
              <Show/>
            </>
          }></Route>
          <Route path="/score/:quizID" element={
            <>
              <Score/>
            </>
          }></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
