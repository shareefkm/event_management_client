import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRouts from "./Routes/UserRouts";
import AdminRoute from "./Routes/AdminRoute";
// import './App.css'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={<UserRouts/>}/>
          <Route path='/admin/*' element={<AdminRoute/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
