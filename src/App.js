import "./App.css";
import { Formio } from "@formio/react";
import FormioContrib from "@formio/contrib";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Components from "./components/Components";
import Builder from "./components/Builder";
Formio.use(FormioContrib);

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes basename={"/react-app-starterkit"}>
        <Route path="/" element={<Builder />}></Route>
        <Route path="formBuilder" element={<Builder/>}></Route>
        <Route path="components" element={<Components />}></Route>
        <Route path="components" element={<Components />}></Route>
        <Route path="components" element={<Components />}></Route>
      </Routes>
    </div>
  );
}

export default App;
