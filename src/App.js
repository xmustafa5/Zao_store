import Layout from "./layout/Index";
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <>
    <Layout>
    <Routes>
   <Route path="/" element={<Home />} />
    </Routes>
    </Layout>
    </>
  );
}

export default App;
