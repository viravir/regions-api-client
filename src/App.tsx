import React, { FunctionComponent, ReactElement } from 'react'
import './App.css'
import Tree from './components/Tree'

// TODO -> add routing
const App: FunctionComponent = (): ReactElement => {
  return (
    <div className="App">
      <header className="App__header">
        <h1>Regions App</h1>
      </header>
      <main className="App__content">
        <Tree />
      </main>
    </div>
  )
}

export default App
