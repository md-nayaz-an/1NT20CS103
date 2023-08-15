import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./Home";
import Train from "./Train";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/train" element={<Train />} />
    </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
