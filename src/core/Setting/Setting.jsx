import { Component } from 'react';
import { Helmet } from "react-helmet";
import { Redirect } from 'react-router-dom';
import axios from '../Tool/axios';
import getHref from '../Tool/getHref';
import FrameSplit from '../Frame/FrameSplit/FrameSplit';
import Loading from '../Frame/Loading/Loading';
import Me from './Profile/Me';
import Password from './Profile/Password';
import Social from './Profile/Social';
import Theme from './Profile/Theme';
import Langsort from './Profile/Langsort';
import Editor from './Profile/Editor';
import Short from './Profile/Short';
import Logout from './Profile/Logout';
import svgMe from './svg_me.svg';
import svgPassword from './svg_password.svg';
import svgSocial from './svg_social.svg';
import svgTheme from './svg_theme.svg';
import svgLangsort from './svg_langsort.svg';
import svgEditor from './svg_editor.svg';
import svgShort from './svg_short.svg';
import svgLogout from './svg_logout.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}
class Setting extends Component {
    constructor(props){
        super(props);
        this.state = { data: undefined }
        this.onload = false;

        this.navigator = [
            {
                title: '계정 설정',
                list: [
                    { name: '개인정보', icon: svgMe, href: '/setting/profile/me' },
                    { name: '비밀번호', icon: svgPassword, href: '/setting/profile/password' },
                    { name: '소셜 연동', icon: svgSocial, href: '/setting/profile/social' },
                    { name: '사이트 테마', icon: svgTheme, href: '/setting/profile/theme' },
                    { name: '언어 정렬', icon: svgLangsort, href: '/setting/profile/langsort' },
                    { name: '에디터', icon: svgEditor, href: '/setting/profile/editor' },
                    { name: '빠른 OJ 사용', icon: svgShort, href: '/setting/profile/short' },
                    { name: '로그아웃', icon: svgLogout, href: '/setting/profile/logout' },
                ]
            }
        ]
    }
    stateDataHandler(key, value, callback){
        const data = this.state.data;
        data[key] = value;
        this.setState({ data: data }, () => {
            if(callback) callback();
        });
    }
    render(){
        let container = <div/>;
        
        if(!this.onload){
            this.onload = true;
            axios.get(`/json/setting/profile/getdata`).then((result) => {
                this.setState({ data: result.data });
            });
        }
        
        if(this.state.data === undefined){
            container = <LoadingLay/>;
        }
        else if(this.state.data.err){
            if(this.state.data.err === 'login'){
                container = <Redirect to={ getHref.loginCurrentUrl() }/>
            }
        }
        else if(this.props.page === 'me'){
            container = <Me theme={ this.props.theme } data={ this.state.data } stateHandler={ (x,y,cb) => this.stateDataHandler(x,y,cb) }/>
        }
        else if(this.props.page === 'password'){
            container = <Password theme={ this.props.theme }/>
        }
        else if(this.props.page === 'social'){
            container = <Social theme={ this.props.theme } data={ this.state.data }/>
        }
        else if(this.props.page === 'theme'){
            container = <Theme theme={ this.props.theme } setTheme={ this.props.setTheme }/>
        }
        else if(this.props.page === 'langsort'){
            container = <Langsort theme={ this.props.theme } data={ this.state.data } stateHandler={ (x,y,cb) => this.stateDataHandler(x,y,cb) }/>
        }
        else if(this.props.page === 'editor'){
            container = <Editor theme={ this.props.theme } data={ this.state.data } stateHandler={ (x,y,cb) => this.stateDataHandler(x,y,cb) }/>
        }
        else if(this.props.page === 'short'){
            container = <Short theme={ this.props.theme } data={ this.state.data } stateHandler={ (x,y,cb) => this.stateDataHandler(x,y,cb) }/>
        }
        else if(this.props.page === 'logout'){
            container = <Logout theme={ this.props.theme }/>
        }

        return (
            <FrameSplit navigator={ this.navigator } theme={ this.props.theme }>
                <Helmet><title>계정 설정 : 오일러OJ</title></Helmet>
                { container }
            </FrameSplit>
        )
    }
}

export default Setting;