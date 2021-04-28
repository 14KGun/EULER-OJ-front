import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Frame from './core/Frame/Frame';
import Main from './core/Main/Main';
import Tag from './core/Tag/Tag';
import PageNotFound from './core/PageNotFound/PageNotFound';
import './Font.css';
import './App.css';

const TagWithId = ({match}) => {
  return <Frame><Tag id={match.params.Pnum} page={1}/></Frame>
}
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Frame><Main/></Frame></Route>
        <Route path="/problemset" component={ () => { window.location.href = 'https://euleroj.io/problemset'; return null; } }/>
        <Route exact path="/tags"><Frame><Tag id={0} page={1}/></Frame></Route>
        <Route exact path="/tags/:Pnum" component={ TagWithId }></Route>
        <Route path="/contest" component={ () => { window.location.href = 'https://euleroj.io/contest'; return null; } }/>
        <Route path="/status" component={ () => { window.location.href = 'https://euleroj.io/status'; return null; } }/>
        <Route path="/ranking" component={ () => { window.location.href = 'https://euleroj.io/ranking'; return null; } }/>
        <Route path="/board" component={ () => { window.location.href = 'https://euleroj.io/board'; return null; } }/>
        <Route path="/login" component={ () => { window.location.href = 'https://euleroj.io/login'; return null; } }/>
        <Route path="/logout" component={ () => { window.location.href = 'https://euleroj.io/logout'; return null; } }/>
        <Route path="/profile/:pnum" component={ (props) => { window.location.href = 'https://euleroj.io/profile/'+props.match.params.pnum; return null; } }/>
        <Route path="/setting/profile" component={ () => { window.location.href = 'https://euleroj.io/setting/profile'; return null; } }/>
        <Route path="/"><Frame><PageNotFound/></Frame></Route>
      </Switch>
    </Router>
  );
}

export default App;