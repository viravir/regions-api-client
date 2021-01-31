import React from 'react';
import './App.css';
import Tree from './components/Tree';

// TODO -> add routing
function App() {
  return (
    <div className="App">
      <header className="App__header">
        <h1>Regions App</h1>
      </header>
      <main className="App__content">
        <Tree />
      </main>
    </div>
  );
}

export default App;
