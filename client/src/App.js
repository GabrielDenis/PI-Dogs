import './App.css';
import React from 'react'
import { Route } from 'react-router-dom'
import Landing from './components/Landing/Landing.jsx'
import Home from './components/Home/Home.jsx'
import Detail from './components/Detail/Detail.jsx'

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Route exact path='/' component = {Landing}/>
        <Route exact path='/home' component = {Home}/>
        <Route exact path='/home/:id' component = {Detail}/>
      </React.Fragment>
    </div>
  );
}

export default App;
