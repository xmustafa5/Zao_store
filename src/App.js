import Home from "./Pages/Home";
import Dashpord from "./Pages/Dashpord";
import Layout from "./layout/Index";
import { Route, Routes } from 'react-router-dom';
import Items from "./components/Items";


function App() {
  return (
    <>
    <Layout>
    <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/Dashpord" element={<Dashpord/>} />
   <Route path="/Items" element={<Items/> } />
    </Routes>
    </Layout>
    </>
  );
}

export default App;
