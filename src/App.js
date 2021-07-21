import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import { useState } from 'react';
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
import cookie from './core/Tool/cookie';
import './Font.css';
import './App.css';

const getThemeFromCookie = () => {
  const theme = cookie.getCookie('theme');
  if(theme === 'dark') return 'dark';
  else return 'light';
}
function App() {
  const [theme, themeHandler] = useState(getThemeFromCookie());

  const setTheme = (_theme) => {
    cookie.setCookie('theme',_theme,1000);
    themeHandler(_theme);
  }

  const FindmypasswordWithId = () => <LoginBoxFrame background="none"><Findmypassword/></LoginBoxFrame>
  const ProblemsetWithId = () => <Frame theme={ theme } setTheme={ (x) => setTheme(x) }><Problemset theme={ theme } category1={ useParams().Pnum1 } category2={ useParams().Pnum2 } page={ useParams().Pnum3 }/></Frame>
  const ProblemWithId = () => <Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Problem id={ useParams().Pnum }/></Frame>
  const ProblemViewerWithId = () => <Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><ProblemViewer theme={ theme } id={ useParams().Pnum }/></Frame>
  const ProblemSubmitWithId = () => <Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><ProblemSubmit id={ useParams().Pnum }/></Frame>
  const TagWithId = () => <Frame theme={ theme } setTheme={ (x) => setTheme(x) }><Tag theme={ theme } id={ useParams().Pnum } page={1}/></Frame>
  const TagWithIdPage = () => <Frame theme={ theme } setTheme={ (x) => setTheme(x) }><Tag theme={ theme } id={ useParams().Pnum1 } page={ useParams().Pnum2 }/></Frame>
  const EulerRankingWithIdPage = () => <Frame theme={ theme } setTheme={ (x) => setTheme(x) }><EulerRanking theme={ theme } page={ useParams().Pnum }/></Frame>
  const CompareWithIdId = () => <Frame theme={ theme } setTheme={ (x) => setTheme(x) }><Compare theme={ theme } id1={ useParams().Pnum1 } id2={ useParams().Pnum2 }/></Frame>
  const ProfileWithId = () => <Frame theme={ theme } setTheme={ (x) => setTheme(x) }><Profile theme={ theme } id={ useParams().Pnum }/></Frame>

  return (
    <Router>
      <Switch>
        <Route exact path="/"><Frame theme={ theme } setTheme={ (x) => setTheme(x) }><Main theme={ theme }/></Frame></Route>
        <Route exact path="/login"><LoginBoxFrame scalable background="img1"><Login/></LoginBoxFrame></Route>
        <Route exact path="/login/findmypassword"><LoginBoxFrame background="none"><Findmypassword/></LoginBoxFrame></Route>
        <Route exact path="/login/findmypassword/:Pnum"><FindmypasswordWithId/></Route>

        <Route exact path="/problemset"><Frame theme={ theme } setTheme={ (x) => setTheme(x) }><Problemset theme={ theme }/></Frame></Route>
        <Route exact path="/problemset/list/:Pnum1"><ProblemsetWithId/></Route>
        <Route exact path="/problemset/list/:Pnum1/:Pnum2"><ProblemsetWithId/></Route>
        <Route exact path="/problemset/list/:Pnum1/:Pnum2/:Pnum3"><ProblemsetWithId/></Route>
        <Route exact path="/problemset/problem/:Pnum"><ProblemWithId/></Route>
        <Route exact path="/problemset/viewer/:Pnum"><ProblemViewerWithId/></Route>
        {/*<Route exact path="/problemset/submit/:Pnum" component={ ProblemSubmitWithId }/>*/}

        <Route exact path="/tags"><Frame theme={ theme } setTheme={ (x) => setTheme(x) }><Tag theme={ theme } id={0} page={1}/></Frame></Route>
        <Route exact path="/tags/:Pnum"><TagWithId/></Route>
        <Route exact path="/tags/:Pnum1/:Pnum2"><TagWithIdPage/></Route>

        <Route exact path="/ranking"><Frame theme={ theme } setTheme={ (x) => setTheme(x) }><EulerRanking theme={ theme } page={1}/></Frame></Route>
        <Route exact path="/ranking/euler/:Pnum"><EulerRankingWithIdPage/></Route>
        <Route exact path="/ranking/compare/:Pnum1/:Pnum2"><CompareWithIdId/></Route>

        <Route path="/profile/unknown"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><ProfileUnknown/></Frame></Route>
        <Route path="/profile/:Pnum"><ProfileWithId/></Route>

        <Route path="/contest" component={ () => { window.location.href = 'https://euleroj.io/contest'; return null; } }/>
        <Route path="/status" component={ () => { window.location.href = 'https://euleroj.io/status'; return null; } }/>
        <Route path="/ranking/2001" component={ () => { window.location.href = 'https://euleroj.io/ranking/2001'; return null; } }/>
        <Route path="/board" component={ () => { window.location.href = 'https://euleroj.io/board'; return null; } }/>
        <Route path="/login/joinus" component={ () => { window.location.href = 'https://euleroj.io/login/joinus'; return null; } }/>
        <Route path="/login/auth/google" component={ () => { window.location.href = 'https://euleroj.io/login/auth/google'; return null; } }/>
        <Route path="/login/auth/naver" component={ () => { window.location.href = 'https://euleroj.io/login/auth/naver'; return null; } }/>
        <Route path="/login/auth/kakao" component={ () => { window.location.href = 'https://euleroj.io/login/auth/kakao'; return null; } }/>
        <Route path="/logout" component={ () => { window.location.href = 'https://euleroj.io/logout'; return null; } }/>
        <Route path="/timelog/trophy/:pnum" component={ (props) => { window.location.href = 'https://euleroj.io/timelog/trophy/'+props.match.params.pnum; return null; } }/>
        <Route path="/setting/profile" component={ () => { window.location.href = 'https://euleroj.io/setting/profile'; return null; } }/>

        <Route path="/"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><PageNotFound/></Frame></Route>
      </Switch>
    </Router>
  );
}

export default App;
