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
import GamingUsersScreen from "./screens/GamingUsersScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrdersScreen from "./screens/OrdersScreen";
import CreateHardwarePostScreen from "./screens/CreateHardwarePostScreen";
import ComputerScreen from "./screens/ComputerScreen";
import QuotationScreen from "./screens/QuotationScreen";


function App() {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  return (
    <BrowserRouter>
      <>
        {adminInfo ? (
          <Layout>
            <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/products" element={<ProductScreen />} exact></Route>
            <Route path="/notes" element={<NoteScreen />} ></Route>
            <Route path="/notes/:id" element={<NoteScreen />} ></Route>
            <Route path="/task" element={<TaskScreen />} exact></Route>
            <Route path="/chat" element={<ChatScreen />} exact></Route>
            <Route path="/hardwarePosts" element={<PostScreen />} exact></Route>
            <Route path="/createHardwarePost" element={<CreateHardwarePostScreen />} exact></Route>
            <Route path="/gamingusers" element={<GamingUsersScreen />} exact></Route>
            <Route path="/categories" element={<CategoriesScreen />} exact></Route>
            <Route path="/orders" element={<OrdersScreen />} exact></Route>
            <Route path="/computers" element={<ComputerScreen />} exact></Route>
            <Route path="/quotation" element={<QuotationScreen />} exact></Route>
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
