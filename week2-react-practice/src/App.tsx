import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Todo from "./pages/Todo";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/tasks" element={<Todo />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

export default App;