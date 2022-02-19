import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import ChatScreen from "./screens/ChatScreen";
import NoteScreen from "./screens/NoteScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import PostScreen from "./screens/PostScreen";
import TaskScreen from "./screens/TaskScreen";


function App() {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  console.log(adminInfo)
  return (
    <BrowserRouter>
      <>
        {adminInfo ? (
          <Layout>
            <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/products" element={<ProductScreen />} exact></Route>
            <Route path="/notes" element={<NoteScreen />} exact></Route>
            <Route path="/task" element={<TaskScreen />} exact></Route>
            <Route path="/chat" element={<ChatScreen />} exact></Route>
            <Route path="/hardwarePosts" element={<PostScreen />} exact></Route>
            </Routes>

          </Layout>
        ) : (
          <Routes>
            <Route path="/" element={<Auth />} exact></Route>
          </Routes>
        )}
      </>
    </BrowserRouter>
  );
}

export default App;
