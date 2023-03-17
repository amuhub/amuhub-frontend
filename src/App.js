import React from "react";
import "./App.css";
import HomePage from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Feed from "./pages/Feed/Feed";
import QuestionListPage from "./pages/QuestionListPage/QuestionListPage";
import QuestionDetailsPage from "./pages/QuestionDetailsPage/QuestionDetailsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questions from "./components/Questions";
import ProfilePosts from "./components/ProfilePosts/ProfilePosts";
import ProfileAnswer from "./components/ProfileAnswer/ProfileAnswer.js"
import ProfileQuestion from "./components/ProfileQuestion/ProfileQuestion";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/question" element={<QuestionListPage />} />
          <Route path="/question/:id" element={<QuestionDetailsPage />} />
          <Route path = "/profile/:username" element = {<ProfilePage/>}>
            <Route index path = "answers" element = {<ProfileAnswer/>}/>
            <Route path = "questions" element = {<ProfileQuestion/>}/>
            <Route path = "posts" element = {<ProfilePosts/>}/>
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
