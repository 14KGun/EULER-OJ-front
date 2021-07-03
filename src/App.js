import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Frame from './core/Frame/Frame';
import Main from './core/Main/Main';
import Problem from './core/Problemset/Problem/Problem';
import ProblemViewer from './core/Problemset/ProblemViewer/ProblemViewer';
import ProblemSubmit from './core/Problemset/ProblemSubmit/ProblemSubmit';
import Tag from './core/Tag/Tag';
import PageNotFound from './core/PageNotFound/PageNotFound';
import './Font.css';
import './App.css';

const ProblemWithId = ({match}) => <Frame headerTxtColor="black"><Problem id={match.params.Pnum}/></Frame>
const ProblemViewerWithId = ({match}) => <Frame headerTxtColor="black"><ProblemViewer id={match.params.Pnum}/></Frame>
const ProblemSubmitWithId = ({match}) => <Frame headerTxtColor="black"><ProblemSubmit id={match.params.Pnum}/></Frame>
const TagWithId = ({match}) => <Frame><Tag id={match.params.Pnum} page={1}/></Frame>
const TagWithIdPage = ({match}) => <Frame><Tag id={match.params.Pnum1} page={match.params.Pnum2}/></Frame>

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Frame><Main/></Frame></Route>
        <Route exact path="/problemset/problem/:Pnum" component={ ProblemWithId }/>
        <Route exact path="/problemset/viewer/:Pnum" component={ ProblemViewerWithId }/>
        {/*<Route exact path="/problemset/submit/:Pnum" component={ ProblemSubmitWithId }/>*/}
        <Route path="/problemset" component={ () => { window.location.href = 'https://euleroj.io/problemset'; return null; } }/>
        <Route exact path="/tags"><Frame><Tag id={0} page={1}/></Frame></Route>
        <Route exact path="/tags/:Pnum" component={ TagWithId }></Route>
        <Route exact path="/tags/:Pnum1/:Pnum2" component={ TagWithIdPage }></Route>
        <Route path="/contest" component={ () => { window.location.href = 'https://euleroj.io/contest'; return null; } }/>
        <Route path="/status" component={ () => { window.location.href = 'https://euleroj.io/status'; return null; } }/>
        <Route path="/ranking" component={ () => { window.location.href = 'https://euleroj.io/ranking'; return null; } }/>
        <Route path="/board" component={ () => { window.location.href = 'https://euleroj.io/board'; return null; } }/>
        <Route path="/login" component={ () => { window.location.href = 'https://euleroj.io/login'; return null; } }/>
        <Route path="/logout" component={ () => { window.location.href = 'https://euleroj.io/logout'; return null; } }/>
        <Route path="/profile/:pnum" component={ (props) => { window.location.href = 'https://euleroj.io/profile/'+props.match.params.pnum; return null; } }/>
        <Route path="/setting/profile" component={ () => { window.location.href = 'https://euleroj.io/setting/profile'; return null; } }/>
        <Route path="/"><Frame headerTxtColor="black"><PageNotFound/></Frame></Route>
      </Switch>
    </Router>
  );
}

export default App;
