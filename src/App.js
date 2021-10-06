import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import { useState } from 'react';
import RouterScroll from './ReactScrollAuto';
import Frame from './core/Frame/Frame';
import LoginBoxFrame from './core/Frame/LoginBoxFrame/LoginBoxFrame';
import Main from './core/Main/Main';
import Login from './core/Login/Login';
import Findmypassword from './core/Login/Findmypassword/Findmypassword';
import Resetpassword from './core/Login/Findmypassword/Resetpassword';
import Problemset from './core/Problemset/Problemset/Problemset';
import Problem from './core/Problemset/Problem/Problem';
import ProblemViewer from './core/Problemset/ProblemViewer/ProblemViewer';
import ProblemSubmit from './core/Problemset/ProblemSubmit/ProblemSubmit';
import Tag from './core/Tag/Tag';
import EulerRanking from './core/Ranking/EulerRanking/EulerRanking';
import Compare from './core/Ranking/Compare/Compare';
import Profile from './core/Profile/Profile/Profile';
import ProfileUnknown from './core/Profile/ProfileUnknown/ProfileUnknown';
import Setting from './core/Setting/Setting';
import About from './core/About/About';
import Admin from './core/Admin/Admin';
import PageNotFound from './core/PageNotFound/PageNotFound';
import cookie from './core/Tool/cookie';
import './Font.css';
import './App.css';

const FindmypasswordWithIdKey = () => <LoginBoxFrame background="none"><Resetpassword id={ useParams().Pnum1 } SecurityKey={ useParams().Pnum2 }/></LoginBoxFrame>
const ProblemsetWithId = (props) => <Frame theme={ props.theme } setTheme={ (x) => props.setTheme(x) }><Problemset theme={ props.theme } category1={ useParams().Pnum1 } category2={ useParams().Pnum2 } page={ useParams().Pnum3 }/></Frame>
const ProblemWithId = (props) => <Frame theme={ props.theme } setTheme={ (x) => props.setTheme(x) } headerTxtColor="none"><Problem id={ useParams().Pnum }/></Frame>
const ProblemSubmitWithId = (props) => <Frame theme={ props.theme } setTheme={ (x) => props.setTheme(x) } headerTxtColor="none"><ProblemSubmit theme={ props.theme } id={ useParams().Pnum }/></Frame>
const TagWithId = (props) => <Frame theme={ props.theme } setTheme={ (x) => props.setTheme(x) }><Tag theme={ props.theme } id={ useParams().Pnum } page={1}/></Frame>
const TagWithIdPage = (props) => <Frame theme={ props.theme } setTheme={ (x) => props.setTheme(x) }><Tag theme={ props.theme } id={ useParams().Pnum1 } page={ useParams().Pnum2 }/></Frame>
const EulerRankingWithIdPage = (props) => <Frame theme={ props.theme } setTheme={ (x) => props.setTheme(x) }><EulerRanking theme={ props.theme } page={ useParams().Pnum }/></Frame>
const CompareWithIdId = (props) => <Frame theme={ props.theme } setTheme={ (x) => props.setTheme(x) }><Compare theme={ props.theme } id1={ useParams().Pnum1 } id2={ useParams().Pnum2 }/></Frame>
const ProfileWithId = (props) => <Frame theme={ props.theme } setTheme={ (x) => props.setTheme(x) }><Profile theme={ props.theme } id={ useParams().Pnum }/></Frame>

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
  
  const ProblemViewerWithId = (props) => <Frame theme={ props.theme } setTheme={ (x) => props.setTheme(x) } headerTxtColor="none"><ProblemViewer theme={ props.theme } id={ useParams().Pnum }/></Frame>

  return (
    <Router>
      <RouterScroll/>
      <Switch>
        <Route exact path="/"><Frame theme={ theme } setTheme={ (x) => setTheme(x) }><Main theme={ theme }/></Frame></Route>
        <Route exact path="/login"><LoginBoxFrame scalable background="img1"><Login/></LoginBoxFrame></Route>
        <Route exact path="/login/findmypassword"><LoginBoxFrame background="none"><Findmypassword/></LoginBoxFrame></Route>
        <Route exact path="/login/findmypassword/:Pnum1/:Pnum2"><FindmypasswordWithIdKey/></Route>

        <Route exact path="/problemset"><Frame theme={ theme } setTheme={ (x) => setTheme(x) }><Problemset theme={ theme }/></Frame></Route>
        <Route exact path="/problemset/list/:Pnum1"><ProblemsetWithId theme={ theme } setTheme={ (x) => setTheme(x) }/></Route>
        <Route exact path="/problemset/list/:Pnum1/:Pnum2"><ProblemsetWithId theme={ theme } setTheme={ (x) => setTheme(x) }/></Route>
        <Route exact path="/problemset/list/:Pnum1/:Pnum2/:Pnum3"><ProblemsetWithId theme={ theme } setTheme={ (x) => setTheme(x) }/></Route>
        <Route exact path="/problemset/problem/:Pnum"><ProblemWithId theme={ theme } setTheme={ (x) => setTheme(x) }/></Route>
        <Route exact path="/problemset/viewer/:Pnum"><ProblemViewerWithId theme={ theme } setTheme={ (x) => setTheme(x) }/></Route>
        <Route exact path="/problemset/submit/:Pnum"><ProblemSubmitWithId theme={ theme } setTheme={ (x) => setTheme(x) }/></Route>

        <Route exact path="/tags"><Frame theme={ theme } setTheme={ (x) => setTheme(x) }><Tag theme={ theme } id={0} page={1}/></Frame></Route>
        <Route exact path="/tags/:Pnum"><TagWithId theme={ theme } setTheme={ (x) => setTheme(x) }/></Route>
        <Route exact path="/tags/:Pnum1/:Pnum2"><TagWithIdPage theme={ theme } setTheme={ (x) => setTheme(x) }/></Route>

        <Route exact path="/ranking"><Frame theme={ theme } setTheme={ (x) => setTheme(x) }><EulerRanking theme={ theme } page={1}/></Frame></Route>
        <Route exact path="/ranking/euler/:Pnum"><EulerRankingWithIdPage theme={ theme } setTheme={ (x) => setTheme(x) }/></Route>
        <Route exact path="/ranking/compare/:Pnum1/:Pnum2"><CompareWithIdId theme={ theme } setTheme={ (x) => setTheme(x) }/></Route>

        <Route path="/profile/unknown"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><ProfileUnknown/></Frame></Route>
        <Route path="/profile/:Pnum"><ProfileWithId theme={ theme } setTheme={ (x) => setTheme(x) }/></Route>

        <Route exact path="/setting/profile"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Setting theme={ theme } page="me"/></Frame></Route>
        <Route exact path="/setting/profile/me"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Setting theme={ theme } page="me"/></Frame></Route>
        <Route exact path="/setting/profile/password"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Setting theme={ theme } page="password"/></Frame></Route>
        <Route exact path="/setting/profile/social"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Setting theme={ theme } page="social"/></Frame></Route>
        <Route exact path="/setting/profile/theme"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Setting theme={ theme } setTheme={ (x) => setTheme(x) } page="theme"/></Frame></Route>
        <Route exact path="/setting/profile/langsort"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Setting theme={ theme } page="langsort"/></Frame></Route>
        <Route exact path="/setting/profile/editor"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Setting theme={ theme } page="editor"/></Frame></Route>
        <Route exact path="/setting/profile/short"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Setting theme={ theme } page="short"/></Frame></Route>
        <Route exact path="/setting/profile/logout"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Setting theme={ theme } page="logout"/></Frame></Route>

        <Route exact path="/about"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><About theme={ theme } page="oj/manual"/></Frame></Route>
        <Route exact path="/about/oj/manual"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><About theme={ theme } page="oj/manual"/></Frame></Route>
        <Route exact path="/about/oj/stat"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><About theme={ theme } page="oj/stat"/></Frame></Route>
        <Route exact path="/about/oj/update"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><About theme={ theme } page="oj/update"/></Frame></Route>
        <Route exact path="/about/policy/privacy"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><About theme={ theme } page="policy/privacy"/></Frame></Route>

        <Route exact path="/nadmin"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Admin theme={ theme } page="none"/></Frame></Route>
        <Route exact path="/nadmin/problem/add"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Admin theme={ theme } page="problem/add"/></Frame></Route>
        <Route exact path="/nadmin/problem/list"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Admin theme={ theme } page="problem/list"/></Frame></Route>
        <Route exact path="/nadmin/problem/gitpull"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Admin theme={ theme } page="problem/gitpull"/></Frame></Route>
        <Route exact path="/nadmin/tag/tree"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Admin theme={ theme } page="tag/tree"/></Frame></Route>
        <Route exact path="/nadmin/contest/make"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Admin theme={ theme } page="contest/make"/></Frame></Route>
        <Route exact path="/nadmin/contest/list"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><Admin theme={ theme } page="contest/list"/></Frame></Route>

        <Route path="/contest" component={ () => { window.location.href = 'https://euleroj.io/contest'; return null; } }/>
        <Route path="/status/result/:pnum" component={ (props) => { window.location.href = 'https://euleroj.io/status/result/'+props.match.params.pnum; return null; } }/>
        <Route path="/status" component={ () => { window.location.href = 'https://euleroj.io/status'; return null; } }/>
        <Route path="/ranking/2001" component={ () => { window.location.href = 'https://euleroj.io/ranking/2001'; return null; } }/>
        <Route path="/board" component={ () => { window.location.href = 'https://euleroj.io/board'; return null; } }/>
        <Route path="/login/joinus" component={ () => { window.location.href = 'https://euleroj.io/login/joinus'; return null; } }/>
        <Route path="/login/auth/google" component={ () => { window.location.href = 'https://euleroj.io/login/auth/google'; return null; } }/>
        <Route path="/login/auth/naver" component={ () => { window.location.href = 'https://euleroj.io/login/auth/naver'; return null; } }/>
        <Route path="/login/auth/kakao" component={ () => { window.location.href = 'https://euleroj.io/login/auth/kakao'; return null; } }/>
        <Route path="/login/unlink/step1/google" component={ () => { window.location.href = 'https://euleroj.io/login/unlink/step1/google'; return null; } }/>
        <Route path="/login/unlink/step1/naver" component={ () => { window.location.href = 'https://euleroj.io/login/unlink/step1/naver'; return null; } }/>
        <Route path="/login/unlink/step1/kakao" component={ () => { window.location.href = 'https://euleroj.io/login/unlink/step1/kakao'; return null; } }/>
        <Route path="/logout" component={ () => { window.location.href = 'https://euleroj.io/logout'; return null; } }/>
        <Route path="/timelog/trophy/:pnum" component={ (props) => { window.location.href = 'https://euleroj.io/timelog/trophy/'+props.match.params.pnum; return null; } }/>
        <Route path="/setting/profile" component={ () => { window.location.href = 'https://euleroj.io/setting/profile'; return null; } }/>

        <Route path="/"><Frame theme={ theme } setTheme={ (x) => setTheme(x) } headerTxtColor="none"><PageNotFound/></Frame></Route>
      </Switch>
    </Router>
  );
}

export default App;
