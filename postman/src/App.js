import './App.css';

function App() {
  return (
    <div className="App">
        <p>Input Postman Collection ID</p>
        <div>
          <input/>
          <button>Test</button>
        </div>
          <div>
              <p className="current-results">Current Validation Results</p>
              <p className="previous-results">Previous Validation Results</p>
          </div>
    </div>
  );
}

export default App;
