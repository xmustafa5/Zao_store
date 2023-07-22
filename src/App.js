import Home from "./Pages/Home";
import Dashpord from "./Pages/Dashpord";
import Layout from "./layout/Index";
import { Route, Routes } from 'react-router-dom';
import Items from "./Pages/Items";
import Requests from "./Pages/requests";
import SingleProduct from "./Pages/SingleProduct";

function App() {
  return (
    <>
    <Layout>
    <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/Dashpord" element={<Dashpord/>} />
   <Route path="/Items" element={<Items/> } />
   <Route path="/Requests" element={<Requests/> } />
   <Route path="/single-product/:productId" element={<SingleProduct />} />
    </Routes>
    </Layout>
    </>
  );
}

export default App;
