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
import ProblemsetBookList from './core/Problemset/Problemset/Books/BookList/BookList';
import ProblemsetHistory from './core/Problemset/Problemset/History/History';
import Problem from './core/Problemset/Problem/Problem';
import ProblemViewer from './core/Problemset/ProblemViewer/ProblemViewer';
import ProblemSubmit from './core/Problemset/ProblemSubmit/ProblemSubmit';
import ProblemBlogging from './core/Problemset/Blogging/Blogging';
import ProblemStat from './core/Problemset/Stats/Stats';
import ProblemSolves from './core/Problemset/Solves/Solves';
import Status from './core/Status/Status';
import StatusResult from './core/Status/Result/Result';
import Tag from './core/Tag/Tag';
import Contest from './core/Contest/Contest';
import EulerRanking from './core/Ranking/EulerRanking/EulerRanking';
import Compare from './core/Ranking/Compare/Compare';
import Profile from './core/Profile/Profile/Profile';
import ProfileUnknown from './core/Profile/ProfileUnknown/ProfileUnknown';
import Trophy from './core/Trophy/Trophy';
import TrophyInfo from './core/Trophy/Info/Info';
import Setting from './core/Setting/Setting';
import MembershipMain from './core/Setting/Membership/Main/Main';
import About from './core/About/About';
import Admin from './core/Admin/Admin';
import PageNotFound from './core/PageNotFound/PageNotFound';
import cookie from './core/Tool/cookie';
import './Font.css';
import './App.css';

const FindmypasswordWithIdKey = () => <LoginBoxFrame background="none"><Resetpassword id={ useParams().Pnum1 } SecurityKey={ useParams().Pnum2 }/></LoginBoxFrame>
const ProblemsetWithId = (props) => <Frame { ...props }><Problemset { ...props } category1={ useParams().Pnum1 } category2={ useParams().Pnum2 } page={ useParams().Pnum3 }/></Frame>
const BookListWithId = (props) => <Frame { ...props }><ProblemsetBookList { ...props } category={ useParams().Pnum }/></Frame>
const ProblemWithId = (props) => <Frame { ...props } headerTxtColor="none"><Problem id={ useParams().Pnum }/></Frame>
const ProblemViewerWithId = (props) => <Frame { ...props } headerTxtColor="none"><ProblemViewer { ...props } id={ useParams().Pnum }/></Frame>
const ProblemSubmitWithId = (props) => <Frame { ...props } headerTxtColor="none"><ProblemSubmit { ...props } id={ useParams().Pnum }/></Frame>
const ProblemBloggingWithId = (props) => <Frame { ...props }><ProblemBlogging { ...props } id={ useParams().Pnum }/></Frame>
const ProblemStatWithId = (props) => <Frame { ...props }><ProblemStat { ...props } id={ useParams().Pnum }/></Frame>
const ProblemSolvesWithId = (props) => <Frame { ...props }><ProblemSolves { ...props } id={ useParams().Pnum }/></Frame>
const StatusWithIdPage = (props) => <Frame { ...props }><Status { ...props } id={ useParams().Pnum }/></Frame>
const StatusResultWithId = (props) => <Frame { ...props } headerTxtColor="none"><StatusResult { ...props } id={ useParams().Pnum }/></Frame>
const TagWithId = (props) => <Frame { ...props }><Tag { ...props } id={ useParams().Pnum } page={1}/></Frame>
const TagWithIdPage = (props) => <Frame { ...props }><Tag { ...props } id={ useParams().Pnum1 } page={ useParams().Pnum2 }/></Frame>
const EulerRankingWithIdPage = (props) => <Frame { ...props }><EulerRanking { ...props } page={ useParams().Pnum }/></Frame>
const CompareWithIdId = (props) => <Frame { ...props }><Compare { ...props } id1={ useParams().Pnum1 } id2={ useParams().Pnum2 }/></Frame>
const ProfileWithId = (props) => <Frame { ...props }><Profile { ...props } id={ useParams().Pnum }/></Frame>
const TrophyWithId = (props) =>  <Frame { ...props } headerTxtColor="none"><TrophyInfo { ...props } id={ useParams().Pnum }/></Frame>

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
  useEffect(() => {
    const background = (theme === 'dark' ? 'rgb(30,31,33)' : 'rgb(250,251,252)');
    document.body.style.background = background;
  }, [theme]);

  /* Alarm */
  const [alarmList, setAlarmList] = useState([]);
  const [alarmVisible, setAlarmVisible] = useState(false);

  /* Router */
  const params = {
    theme: theme,
    setTheme: (x) => setTheme(x),
    alarmList: alarmList, setAlarmList: setAlarmList,
    alarmVisible: alarmVisible, setAlarmVisible: setAlarmVisible
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
        <Route exact path="/problemset/list/books/:Pnum"><BookListWithId { ...params }/></Route>
        <Route exact path="/problemset/list/history"><Frame { ...params }><ProblemsetHistory { ...params }/></Frame></Route>
        <Route exact path="/problemset/list/:Pnum1"><ProblemsetWithId { ...params }/></Route>
        <Route exact path="/problemset/list/:Pnum1/:Pnum2"><ProblemsetWithId { ...params }/></Route>
        <Route exact path="/problemset/list/:Pnum1/:Pnum2/:Pnum3"><ProblemsetWithId { ...params }/></Route>
        <Route exact path="/problemset/problem/:Pnum"><ProblemWithId { ...params }/></Route>
        <Route exact path="/problemset/viewer/:Pnum"><ProblemViewerWithId { ...params }/></Route>
        <Route exact path="/problemset/blogging/:Pnum"><ProblemBloggingWithId { ...params }/></Route>
        <Route exact path="/problemset/submit/:Pnum"><ProblemSubmitWithId { ...params }/></Route>
        <Route exact path="/problemset/stats/:Pnum"><ProblemStatWithId { ...params }/></Route>
        <Route exact path="/problemset/solves/:Pnum"><ProblemSolvesWithId { ...params }/></Route> { /**/ }

        <Route exact path="/status/result/:Pnum"><StatusResultWithId { ...params }/></Route>
        <Route exact path="/status"><StatusWithIdPage { ...params }/></Route>
        <Route exact path="/status/:Pnum"><StatusWithIdPage { ...params }/></Route>

        <Route exact path="/tags"><Frame { ...params }><Tag { ...params } id={0} page={1}/></Frame></Route>
        <Route exact path="/tags/:Pnum"><TagWithId { ...params }/></Route>
        <Route exact path="/tags/:Pnum1/:Pnum2"><TagWithIdPage { ...params }/></Route>

        <Route exact path="/ranking"><Frame { ...params }><EulerRanking { ...params } page={1}/></Frame></Route>
        <Route exact path="/ranking/euler/:Pnum"><EulerRankingWithIdPage { ...params }/></Route>
        <Route exact path="/ranking/compare/:Pnum1/:Pnum2"><CompareWithIdId { ...params }/></Route>
        
        <Route exact path="/contest"><Frame { ...params }><Contest { ...params } category="ongoing"/></Frame></Route> { /**/ }
        <Route exact path="/contest/list/ongoing"><Frame { ...params }><Contest { ...params } category="ongoing"/></Frame></Route>
        <Route exact path="/contest/list/past"><Frame { ...params }><Contest { ...params } category="past"/></Frame></Route>

        <Route path="/profile/unknown"><Frame { ...params } headerTxtColor="none"><ProfileUnknown/></Frame></Route>
        <Route path="/profile/:Pnum"><ProfileWithId { ...params }/></Route>

        <Route exact path="/trophy"><Frame { ...params } headerTxtColor="none"><Trophy { ...params } category="all"/></Frame></Route>
        <Route exact path="/trophy/list"><Frame { ...params } headerTxtColor="none"><Trophy { ...params } category="all"/></Frame></Route>
        <Route exact path="/trophy/list/all"><Frame { ...params } headerTxtColor="none"><Trophy { ...params } category="all"/></Frame></Route>
        <Route exact path="/trophy/list/success"><Frame { ...params } headerTxtColor="none"><Trophy { ...params } category="success"/></Frame></Route>
        <Route exact path="/trophy/list/fail"><Frame { ...params } headerTxtColor="none"><Trophy { ...params } category="fail"/></Frame></Route>
        <Route exact path="/trophy/info/:Pnum"><TrophyWithId { ...params }/></Route>

        <Route exact path="/setting/profile"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="me"/></Frame></Route>
        <Route exact path="/setting/profile/me"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="me"/></Frame></Route>
        <Route exact path="/setting/profile/password"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="password"/></Frame></Route>
        <Route exact path="/setting/profile/social"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="social"/></Frame></Route>
        <Route exact path="/setting/profile/theme"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="theme"/></Frame></Route>
        <Route exact path="/setting/profile/langsort"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="langsort"/></Frame></Route>
        <Route exact path="/setting/profile/editor"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="editor"/></Frame></Route>
        <Route exact path="/setting/profile/short"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="short"/></Frame></Route>
        <Route exact path="/setting/profile/logout"><Frame { ...params } headerTxtColor="none"><Setting { ...params } page="logout"/></Frame></Route>

        <Route exact path="/setting/membership"><Frame { ...params } headerTxtColor="none"><MembershipMain { ...params }/></Frame></Route>

        <Route exact path="/about"><Frame { ...params } headerTxtColor="none"><About { ...params } page="oj/update"/></Frame></Route>
        <Route exact path="/about/oj/manual"><Frame { ...params } headerTxtColor="none"><About { ...params } page="oj/manual"/></Frame></Route>
        <Route exact path="/about/oj/stat"><Frame { ...params } headerTxtColor="none"><About { ...params } page="oj/stat"/></Frame></Route>
        <Route exact path="/about/oj/update"><Frame { ...params } headerTxtColor="none"><About { ...params } page="oj/update"/></Frame></Route>
        <Route exact path="/about/policy/privacy"><Frame { ...params } headerTxtColor="none"><About { ...params } page="policy/privacy"/></Frame></Route>

        <Route exact path="/nadmin"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="none"/></Frame></Route>
        <Route exact path="/nadmin/problem/add"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="problem/add"/></Frame></Route>
        <Route exact path="/nadmin/problem/list"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="problem/list"/></Frame></Route>
        <Route exact path="/nadmin/problem/editSp"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="problem/editSp"/></Frame></Route>
        <Route exact path="/nadmin/tag/tree"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="tag/tree"/></Frame></Route>
        <Route exact path="/nadmin/contest/make"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="contest/make"/></Frame></Route>
        <Route exact path="/nadmin/contest/list"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="contest/list"/></Frame></Route>
        <Route exact path="/nadmin/blogging/pull"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="blogging/pull"/></Frame></Route>
        <Route exact path="/nadmin/blogging/fetch"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="blogging/fetch"/></Frame></Route>
        <Route exact path="/nadmin/blogging/list"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="blogging/list"/></Frame></Route>
        <Route exact path="/nadmin/user/list"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="user/list"/></Frame></Route>
        <Route exact path="/nadmin/membership/group"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="membership/group"/></Frame></Route>
        <Route exact path="/nadmin/membership/group/add"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="membership/group/add"/></Frame></Route>
        <Route exact path="/nadmin/membership/group/edit"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="membership/group/edit"/></Frame></Route>
        <Route exact path="/nadmin/membership/user"><Frame { ...params } headerTxtColor="none"><Admin { ...params } page="membership/user"/></Frame></Route>

        <Route path="/problemset/editor/:pnum1/:pnum2" component={ (props) => { window.location.href = 'https://euleroj.io/problemset/editor/'+props.match.params.pnum1+'/'+props.match.params.pnum2; return null; } }/>
        <Route path="/problemset/editor/:pnum" component={ (props) => { window.location.href = 'https://euleroj.io/problemset/editor/'+props.match.params.pnum; return null; } }/>
        <Route path="/ranking/2001" component={ () => { window.location.href = 'https://euleroj.io/ranking/2001'; return null; } }/>
        <Route path="/contest/pastmoc/:pnum" component={ (props) => { window.location.href = 'https://euleroj.io/contest/pastmoc/'+props.match.params.pnum; return null; } }/>
        <Route path="/contest/:pnum" component={ (props) => { window.location.href = 'https://euleroj.io/contest/'+props.match.params.pnum; return null; } }/>
        <Route path="/login/joinus" component={ () => { window.location.href = 'https://euleroj.io/login/joinus'; return null; } }/>
        <Route path="/login/auth/google" component={ () => { window.location.href = 'https://euleroj.io/login/auth/google'; return null; } }/>
        <Route path="/login/auth/naver" component={ () => { window.location.href = 'https://euleroj.io/login/auth/naver'; return null; } }/>
        <Route path="/login/auth/kakao" component={ () => { window.location.href = 'https://euleroj.io/login/auth/kakao'; return null; } }/>
        <Route path="/login/unlink/step1/google" component={ () => { window.location.href = 'https://euleroj.io/login/unlink/step1/google'; return null; } }/>
        <Route path="/login/unlink/step1/naver" component={ () => { window.location.href = 'https://euleroj.io/login/unlink/step1/naver'; return null; } }/>
        <Route path="/login/unlink/step1/kakao" component={ () => { window.location.href = 'https://euleroj.io/login/unlink/step1/kakao'; return null; } }/>
        <Route path="/logout" component={ () => { window.location.href = 'https://euleroj.io/logout'; return null; } }/>
        
        <Route path="/"><Frame { ...params } headerTxtColor="none"><PageNotFound/></Frame></Route>
      </Switch>
      <RouterScroll/>
    </Router>
  );
}

export default App;
