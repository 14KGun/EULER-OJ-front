import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Frame from './core/Frame/Frame';
import Main from './core/Main/Main';
import PageNotFound from './core/PageNotFound/PageNotFound';
import './Font.css';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Frame><Main/></Frame></Route>
        <Route path="/"><Frame><PageNotFound/></Frame></Route>
      </Switch>
    </Router>
  );
}

export default App;
