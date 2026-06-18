import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalculatorPage from "./pages/CalculatorPage";
import HistoryPage from "./pages/HistoryPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalculatorPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;