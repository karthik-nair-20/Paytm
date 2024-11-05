import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./componets/Signup";
import Signin from "./componets/Signin";
import Dashboard from "./componets/Dasdboard";
import Send from "./componets/Send";
import Axios from 'axios';

Axios.defaults.baseURL = 'http://localhost:3000/api/v1';

function App() {

  return (
    <div className="bg-darkGray text-pureWhite">
      <Router>
        <Routes>
          <Route path="/signup" element={
            <div className="bg-lightGray">
              <Signup />
            </div>
          }
          />
          <Route
            path="/signin"
            element={
              <div className="bg-lightGray">
                <Signin />
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <div className="bg-gray-950">
                <Dashboard />
              </div>
            }
          />
          <Route
            path="/send"
            element={
              <div className="bg-paleGray">
                <Send />
              </div>
            }
          />

        </Routes>
      </Router>
    </div>
  )
}

export default App
