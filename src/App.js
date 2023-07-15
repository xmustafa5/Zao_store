import Home from "./Pages/Home";
import Dashpord from "./Pages/Dashpord";
import Layout from "./layout/Index";
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
    <Layout>
    <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/Dashpord" element={<Dashpord/>} />
    </Routes>
    </Layout>
    </>
  );
}

export default App;
