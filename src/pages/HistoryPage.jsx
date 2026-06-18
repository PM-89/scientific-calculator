import { useState } from "react";
import Navbar from "../components/Navbar";

function HistoryPage() {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <>
      <Navbar />

      <div className="history-container">
        <h1>Calculation History</h1>

        {history.length === 0 ? (
          <div className="empty-history">
            <h2>No Calculations Yet</h2>
          </div>
        ) : (
          <>
            {[...history].reverse().map((item, index) => (
              <div className="history-card" key={index}>
                <div>{item.expression}</div>
                <div>= {item.result}</div>
                <small>
                  {item.mode} • {item.time}
                </small>
              </div>
            ))}

            <button
              className="clear-btn"
              onClick={clearHistory}
            >
              Clear History
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default HistoryPage;