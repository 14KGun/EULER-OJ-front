import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Frame from './core/Frame/Frame';
import LoginBoxFrame from './core/Frame/LoginBoxFrame/LoginBoxFrame';
import Main from './core/Main/Main';
import Login from './core/Login/Login';
import Findmypassword from './core/Login/Findmypassword/Findmypassword';
import Problemset from './core/Problemset/Problemset/Problemset';
import Problem from './core/Problemset/Problem/Problem';
import ProblemViewer from './core/Problemset/ProblemViewer/ProblemViewer';
import ProblemSubmit from './core/Problemset/ProblemSubmit/ProblemSubmit';
import Tag from './core/Tag/Tag';
import EulerRanking from './core/Ranking/EulerRanking/EulerRanking';
import Compare from './core/Ranking/Compare/Compare';
import Profile from './core/Profile/Profile/Profile';
import ProfileUnknown from './core/Profile/ProfileUnknown/ProfileUnknown';
import PageNotFound from './core/PageNotFound/PageNotFound';
import './Font.css';
import './App.css';

const FindmypasswordWithId = ({match}) => <LoginBoxFrame background="none"><Findmypassword/></LoginBoxFrame>
const ProblemsetWithId = ({match}) => <Frame><Problemset category1={ match.params.Pnum1 } category2={ match.params.Pnum2 } page={ match.params.Pnum3 }/></Frame>
const ProblemWithId = ({match}) => <Frame headerTxtColor="black"><Problem id={match.params.Pnum}/></Frame>
const ProblemViewerWithId = ({match}) => <Frame headerTxtColor="black"><ProblemViewer id={match.params.Pnum}/></Frame>
const ProblemSubmitWithId = ({match}) => <Frame headerTxtColor="black"><ProblemSubmit id={match.params.Pnum}/></Frame>
const TagWithId = ({match}) => <Frame><Tag id={match.params.Pnum} page={1}/></Frame>
const TagWithIdPage = ({match}) => <Frame><Tag id={match.params.Pnum1} page={match.params.Pnum2}/></Frame>
const EulerRankingWithIdPage = ({match}) => <Frame><EulerRanking page={match.params.Pnum}/></Frame>
const CompareWithIdId = ({match}) => <Frame><Compare id1={match.params.Pnum1} id2={match.params.Pnum2}/></Frame>
const ProfileWithId = ({match}) => <Frame><Profile id={match.params.Pnum}/></Frame>

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Frame><Main/></Frame></Route>
        <Route exact path="/login"><LoginBoxFrame scalable background="img1"><Login/></LoginBoxFrame></Route>
        <Route exact path="/login/findmypassword"><LoginBoxFrame background="none"><Findmypassword/></LoginBoxFrame></Route>
        <Route exact path="/login/findmypassword/:Pnum" component={ FindmypasswordWithId }/>
        <Route exact path="/problemset"><Frame><Problemset/></Frame></Route>
        <Route exact path="/problemset/list/:Pnum1" component={ ProblemsetWithId }/>
        <Route exact path="/problemset/list/:Pnum1/:Pnum2" component={ ProblemsetWithId }/>
        <Route exact path="/problemset/list/:Pnum1/:Pnum2/:Pnum3" component={ ProblemsetWithId }/>
        <Route exact path="/problemset/problem/:Pnum" component={ ProblemWithId }/>
        <Route exact path="/problemset/viewer/:Pnum" component={ ProblemViewerWithId }/>
        {/*<Route exact path="/problemset/submit/:Pnum" component={ ProblemSubmitWithId }/>*/}
        <Route path="/problemset" component={ () => { window.location.href = 'https://euleroj.io/problemset'; return null; } }/>
        <Route exact path="/tags"><Frame><Tag id={0} page={1}/></Frame></Route>
        <Route exact path="/tags/:Pnum" component={ TagWithId }></Route>
        <Route exact path="/tags/:Pnum1/:Pnum2" component={ TagWithIdPage }></Route>

        <Route exact path="/ranking"><Frame><EulerRanking page={1}/></Frame></Route>
        <Route exact path="/ranking/euler/:Pnum" component={ EulerRankingWithIdPage }/>
        <Route exact path="/ranking/compare/:Pnum1/:Pnum2" component={ CompareWithIdId }/>

        <Route path="/profile/unknown"><Frame headerTxtColor="black"><ProfileUnknown/></Frame></Route>
        <Route path="/profile/:Pnum" component={ ProfileWithId }/>

        <Route path="/contest" component={ () => { window.location.href = 'https://euleroj.io/contest'; return null; } }/>
        <Route path="/status" component={ () => { window.location.href = 'https://euleroj.io/status'; return null; } }/>
        <Route path="/ranking/2001" component={ () => { window.location.href = 'https://euleroj.io/ranking/2001'; return null; } }/>
        <Route path="/ranking" component={ () => { window.location.href = 'https://euleroj.io/ranking'; return null; } }/>
        <Route path="/board" component={ () => { window.location.href = 'https://euleroj.io/board'; return null; } }/>
        <Route path="/login/joinus" component={ () => { window.location.href = 'https://euleroj.io/login/joinus'; return null; } }/>
        <Route path="/login/auth/google" component={ () => { window.location.href = 'https://euleroj.io/login/auth/google'; return null; } }/>
        <Route path="/login/auth/naver" component={ () => { window.location.href = 'https://euleroj.io/login/auth/naver'; return null; } }/>
        <Route path="/login/auth/kakao" component={ () => { window.location.href = 'https://euleroj.io/login/auth/kakao'; return null; } }/>
        <Route path="/login" component={ () => { window.location.href = 'https://euleroj.io/login'; return null; } }/>
        <Route path="/logout" component={ () => { window.location.href = 'https://euleroj.io/logout'; return null; } }/>
        <Route path="/profile/:pnum" component={ (props) => { window.location.href = 'https://euleroj.io/profile/'+props.match.params.pnum; return null; } }/>
        <Route path="/timelog/trophy/:pnum" component={ (props) => { window.location.href = 'https://euleroj.io/timelog/trophy/'+props.match.params.pnum; return null; } }/>
        <Route path="/setting/profile" component={ () => { window.location.href = 'https://euleroj.io/setting/profile'; return null; } }/>
        <Route path="/"><Frame headerTxtColor="black"><PageNotFound/></Frame></Route>
      </Switch>
    </Router>
  );
}

export default App;
