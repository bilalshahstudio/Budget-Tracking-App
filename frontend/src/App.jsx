import React from "react";
<<<<<<< HEAD
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Auth from "./components/layouts/AuthLayout/AuthLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddBudget from "./pages/AddBudget/AddBudget";
import Home from "./pages/Home/Home";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
<<<<<<< HEAD
<<<<<<< HEAD
        <Route path="/auth" exact element={<Auth />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signUp" exact element={<Signup />} />
        <Route path="/mainLayout" exact element={<MainLayout />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/addBudget" exact element={<AddBudget />} />
=======
        <Route path="/login" exact element={<Login />} />
        <Route path="/signUp" exact element={<Signup />} />
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/income" exact element={<Income />} />
        <Route path="/expense" exact element={<Expense />} />
>>>>>>> d859e4a (ant design and pages setup)
=======
        <Route path="/auth" exact element={<Auth />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signUp" exact element={<Signup />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/addBudget" exact element={<AddBudget />} />
>>>>>>> b8ad078 (ui changes)
      </Routes>
    </Router>
  );
}

export default App;

const Root = () => {
  //check if token exists in local storage
  // const isAuthenticated = !!localStorage.getItem("token");
  const isAuthenticated = true;

  //Redirected to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="mainLayout" />
  ) : (
    <Navigate to="auth" />
  );
};
=======

function App() {
  return <div className="text-3xl color">App</div>;
}

export default App;
>>>>>>> 11593fb (frontend initial setup)
