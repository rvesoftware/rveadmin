import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import ChatScreen from "./screens/ChatScreen";

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
            <Route path="/chat" element={<ChatScreen />} exact></Route>
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
