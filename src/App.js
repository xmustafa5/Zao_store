import Home from "./Pages/Home";
import Dashpord from "./Pages/Dashpord";
import Layout from "./layout/Index";
import { Route, Routes } from 'react-router-dom';
import Items from "./Pages/Items";
import Requests from "./Pages/requests";
import SingleProduct from "./Pages/SingleProduct";
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <>
             <AuthProvider>

    <Layout>
    <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/Dashpord" element={<Dashpord/>} />
   <Route path="/Items" element={<Items/> } />
   <Route path="/Requests" element={<Requests/> } />
   <Route path="/single-product/:productId" element={<SingleProduct />} />

    </Routes>
    </Layout>
    </AuthProvider>

    </>
  );
}

export default App;
