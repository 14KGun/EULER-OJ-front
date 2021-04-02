import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Frame from './core/Frame/Frame';
import Main from './core/Main/Main';
import Tag from './core/Tag/Tag';
import PageNotFound from './core/PageNotFound/PageNotFound';
import './Font.css';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Frame><Main/></Frame></Route>
        <Route exact path="/tags"><Frame><Tag/></Frame></Route>
        <Route exact path="/tags/:Pnum"><Frame><Tag/></Frame></Route>
        <Route path="/"><Frame><PageNotFound/></Frame></Route>
      </Switch>
    </Router>
  );
}

export default App;
