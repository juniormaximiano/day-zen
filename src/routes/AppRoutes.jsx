import Cadastro from "../pages/Cadastro/index.jsx";
import Login from "../pages/Login/index.jsx";
import Home from "../pages/Home/index.jsx";
import { Route, Routes } from "react-router-dom";

function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/cadastro' element={<Cadastro />}></Route>
        </Routes>
    )
}

export default RouterConfig