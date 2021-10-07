import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RouterScroll from './ReactScrollAuto';
import Frame from './core/Frame/Frame';
import LoginBoxFrame from './core/Frame/LoginBoxFrame/LoginBoxFrame';
import Main from './core/Main/Main';
import Login from './core/Login/Login';
import Findmypassword from './core/Login/Findmypassword/Findmypassword';
import Resetpassword from './core/Login/Findmypassword/Resetpassword';
import Problemset from './core/Problemset/Problemset/Problemset';
import ProblemsetBooks from './core/Problemset/Problemset/Books/Books';
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
const ProblemsetWithId = (props) => <Frame { ...props }><Problemset { ...props } category1={ useParams().Pnum1 } category2={ useParams().Pnum2 } page={ useParams().Pnum3 }/></Frame>
const ProblemWithId = (props) => <Frame { ...props } headerTxtColor="none"><Problem id={ useParams().Pnum }/></Frame>
const ProblemSubmitWithId = (props) => <Frame { ...props } headerTxtColor="none"><ProblemSubmit { ...props } id={ useParams().Pnum }/></Frame>
const TagWithId = (props) => <Frame { ...props }><Tag { ...props } id={ useParams().Pnum } page={1}/></Frame>
const TagWithIdPage = (props) => <Frame { ...props }><Tag { ...props } id={ useParams().Pnum1 } page={ useParams().Pnum2 }/></Frame>
const EulerRankingWithIdPage = (props) => <Frame { ...props }><EulerRanking { ...props } page={ useParams().Pnum }/></Frame>
const CompareWithIdId = (props) => <Frame { ...props }><Compare { ...props } id1={ useParams().Pnum1 } id2={ useParams().Pnum2 }/></Frame>
const ProfileWithId = (props) => <Frame { ...props }><Profile { ...props } id={ useParams().Pnum }/></Frame>

const getThemeFromCookie = () => {
  const theme = cookie.getCookie('theme');
  if(theme === 'dark') return 'dark';
  else return 'light';
}
function App() {
  /* Theme */
  const [theme, themeHandler] = useState(getThemeFromCookie());
  const setTheme = (_theme) => {
    cookie.setCookie('theme',_theme,1000);
    themeHandler(_theme);
  }
  
  /* Footer */
  const [appHeight, setAppHeight] = useState(0);
  const reFooter = () => {
    const ojFooter = document.getElementById('footer-empty');
    if(ojFooter){
      const height = ojFooter.offsetTop;
      if(height !== appHeight) setAppHeight(height);
    }
  };

  const ProblemViewerWithId = (props) => <Frame { ...props } headerTxtColor="none"><ProblemViewer { ...props } id={ useParams().Pnum }/></Frame>

  /* Router */
  const params = {
    theme: theme,
    setTheme: (x) => setTheme(x),
    reFooter: () => reFooter()
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Frame { ...params }><Main { ...params }/></Frame></Route>
        <Route exact path="/login"><LoginBoxFrame scalable background="img1"><Login/></LoginBoxFrame></Route>
        <Route exact path="/login/findmypassword"><LoginBoxFrame background="none"><Findmypassword/></LoginBoxFrame></Route>
        <Route exact path="/login/findmypassword/:Pnum1/:Pnum2"><FindmypasswordWithIdKey/></Route>

        <Route exact path="/problemset"><Frame { ...params }><Problemset { ...params }/></Frame></Route>
        <Route exact path="/problemset/list/books"><Frame { ...params }><ProblemsetBooks { ...params }/></Frame></Route>
        <Route exact path="/problemset/list/:Pnum1"><ProblemsetWithId { ...params }/></Route>
        <Route exact path="/problemset/list/:Pnum1/:Pnum2"><ProblemsetWithId { ...params }/></Route>
        <Route exact path="/problemset/list/:Pnum1/:Pnum2/:Pnum3"><ProblemsetWithId { ...params }/></Route>
        <Route exact path="/problemset/problem/:Pnum"><ProblemWithId { ...params }/></Route>
        <Route exact path="/problemset/viewer/:Pnum"><ProblemViewerWithId { ...params }/></Route>
        <Route exact path="/problemset/submit/:Pnum"><ProblemSubmitWithId { ...params }/></Route>

        <Route exact path="/tags"><Frame { ...params }><Tag { ...params } id={0} page={1}/></Frame></Route>
        <Route exact path="/tags/:Pnum"><TagWithId { ...params }/></Route>
        <Route exact path="/tags/:Pnum1/:Pnum2"><TagWithIdPage { ...params }/></Route>

        <Route exact path="/ranking"><Frame { ...params }><EulerRanking { ...params } page={1}/></Frame></Route>
        <Route exact path="/ranking/euler/:Pnum"><EulerRankingWithIdPage { ...params }/></Route>
        <Route exact path="/ranking/compare/:Pnum1/:Pnum2"><CompareWithIdId { ...params }/></Route>

        <Route path="/profile/unknown"><Frame { ...params } headerTxtColor="none"><ProfileUnknown/></Frame></Route>
        <Route path="/profile/:Pnum"><ProfileWithId { ...params }/></Route>

        <Route exact path="/setting/profile"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="me"/></Frame></Route>
        <Route exact path="/setting/profile/me"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="me"/></Frame></Route>
        <Route exact path="/setting/profile/password"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="password"/></Frame></Route>
        <Route exact path="/setting/profile/social"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="social"/></Frame></Route>
        <Route exact path="/setting/profile/theme"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="theme"/></Frame></Route>
        <Route exact path="/setting/profile/langsort"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="langsort"/></Frame></Route>
        <Route exact path="/setting/profile/editor"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="editor"/></Frame></Route>
        <Route exact path="/setting/profile/short"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="short"/></Frame></Route>
        <Route exact path="/setting/profile/logout"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="logout"/></Frame></Route>

        <Route exact path="/about"><Frame { ...params } headerTxtColor="none"><About { ...params } page="oj/manual"/></Frame></Route>
        <Route exact path="/about/oj/manual"><Frame { ...params } headerTxtColor="none"><About { ...params } page="oj/manual"/></Frame></Route>
        <Route exact path="/about/oj/stat"><Frame { ...params } headerTxtColor="none"><About { ...params } page="oj/stat"/></Frame></Route>
        <Route exact path="/about/oj/update"><Frame { ...params } headerTxtColor="none"><About { ...params } page="oj/update"/></Frame></Route>
        <Route exact path="/about/policy/privacy"><Frame { ...params } headerTxtColor="none"><About { ...params } page="policy/privacy"/></Frame></Route>

        <Route exact path="/nadmin"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="none"/></Frame></Route>
        <Route exact path="/nadmin/problem/add"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="problem/add"/></Frame></Route>
        <Route exact path="/nadmin/problem/list"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="problem/list"/></Frame></Route>
        <Route exact path="/nadmin/problem/gitpull"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="problem/gitpull"/></Frame></Route>
        <Route exact path="/nadmin/tag/tree"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="tag/tree"/></Frame></Route>
        <Route exact path="/nadmin/contest/make"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="contest/make"/></Frame></Route>
        <Route exact path="/nadmin/contest/list"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="contest/list"/></Frame></Route>

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

        <Route path="/"><Frame { ...params } headerTxtColor="none"><PageNotFound/></Frame></Route>
      </Switch>
      <RouterScroll { ...params } height={ appHeight }/>
    </Router>
  );
}

export default App;
