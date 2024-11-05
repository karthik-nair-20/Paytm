import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./componets/Signup";
import Signin from "./componets/Signin";
import Dashboard from "./componets/Dasdboard";
import Send from "./componets/Send";
import Axios from 'axios';

Axios.defaults.baseURL = 'http://localhost:3000/api/v1';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />}  />
        <Route path="/signin" element={<Signin />}  />
        <Route path="/dashboard" element={<Dashboard />}  />
        <Route path="/send" element={<Send />}  />
      </Routes>
    </Router>
  )
}

export default App
