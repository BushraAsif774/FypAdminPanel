import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/Signup/Signup";
import List from "./pages/list/List";
import Listdriver from "./pages/listdriver/Listdriver";
import Listnormaluser from "./pages/listnormaluser/Listnormaluser";
import Normaluser from "./components/Normalusertable/Normaluser";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Addtruck from "./pages/Addtruck/Addtruck";
import Addnormaluser from "./pages/Addnormaluser/Addnormaluser";
import Singledriver from "./pages/singledriver/Singledriver";
import Singletruck from "./pages/Singletruck/Singletruck";
import AddAdmin from "./pages/AddAdmin/AddAdmin";
import ListAdmin from "./pages/ListAdmin/ListAdmin";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup/>} />
            <Route path="drivers">
              <Route index element={<Listdriver/>} />
              <Route path="singledriver" element={<Singledriver />} />
              <Route
                path="newdriver"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="trucks">
              <Route index element={<List />} />
              <Route path="singletruck" element={ <Singletruck/> } />
              <Route
                path="newtruck"
                element={<Addtruck inputs={productInputs} title="Add New Product" />}
              />
            </Route>
               {/* <Route path="admin">
              <Route index element={<Listdriver/>} />
              <Route path="singledriver/:id" element={<Singledriver />} />
              <Route
                path="newdriver"
                element={<New inputs={userInputs} title="Add New User" />}
              /> */}
              {/* <Route path="/normaluser" element={<Normaluser/>} ></Route> */}

              <Route path="normaluser">
                <Route index element={ <Listnormaluser/> } />
                {/* <Route path="singledriver/:id" element={<Singledriver />} /> */}
                <Route
                path="newnormaluser"
                element={<Addnormaluser title="Add New Normal User" />}
                /> 
              </Route>

              <Route path="admin">
                <Route index element={ <ListAdmin/> } />              
                <Route
                path="newadmin"
                element={<AddAdmin title="Add New Admin" button="ADD" />}
                /> 

                 <Route
                  path="update/:id"
                  element={<AddAdmin title="Edit Admin" button="UPDATE" />}
                  /> 
               
              
              </Route>
              
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
