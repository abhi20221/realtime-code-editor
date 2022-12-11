import React from "react";
// import {EditorPage,Home} from "./pages";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast";
const App = () => {
  return(
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success:{
              theme:{
                primary:'#4aed88'
              }
            }
          }}
        >
        </Toaster>
      </div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/editor/:roomId" element={<EditorPage/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
  );
};

export default App;
