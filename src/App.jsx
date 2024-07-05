import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useAuthContext } from "./context/AuthContext";
import StringProvider from "./context/StringContext";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Users from "./components/Users";

function App() {
  const { currentUser } = useAuthContext();

  return (
    <StringProvider>
      <Router>
        {currentUser && <Navbar />}
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </StringProvider>
  );
}

export default App;
