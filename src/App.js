import Header from "./components/Header";
import BooksList from "./components/BooksList";
import BookDetail from "./components/BookDetail";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </div>
  );
}

export default App;
