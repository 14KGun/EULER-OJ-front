import { Component, useState } from 'react';
import { useSpring, animated } from "@react-spring/web";
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from '../Tool/axios';
import getHref from '../Tool/getHref';
import SocialLogin from './SocialLogin';

import svgCoding from './svg_coding.svg';
import svgRight from './svg_right.svg';
import imgGoogle from './img_google.png';
import imgFacebook from './img_facebook.png';
import imgNaver from './img_naver.png';
import imgKakao from './img_kakao.png';

const LayLeft = (props) => {
    const opacity = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 300, config: { duration: 400 }
    }).opacity;
    const styleImg = {
        position: 'absolute', top: '-380px', left: '-30px', height: '1040px'
    };

    return (
        <animated.div style={{ width: '100%', height: '100%', background: 'rgb(50,140,250)', opacity: opacity, overflow: 'hidden' }}>
            <img src={ svgCoding } style={ styleImg } alt=""/>
        </animated.div>
    )
}
const PageRight = (props) => {
    const defaultStyle = {
        position: 'absolute', top: '0px', width: '100%', height: '100%'
    }
    const springConfig = { mass: 1.0, tension: 100, friction: 20.0, precision: 0.01, velocity: 0.0 };
    const styleLeftLeft = useSpring({
        left: props.page==='right' ? '-100%' : '0%',
        config: springConfig
    }).left;
    const styleRightLeft = useSpring({
        left: props.page==='right' ? '0%' : '100%',
        config: springConfig
    }).left;

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <animated.div style={{ ...defaultStyle, left: styleLeftLeft }}>
                { props.left }
            </animated.div>

            <animated.div style={{ ...defaultStyle, left: styleRightLeft }}>
                { props.right }
            </animated.div>
        </div>
    )
}
const BtnLogin = (props) => {
    const [isHover, setHover] = useState(false);
    const styleBtn = {
        width: '60%', height: '40px', borderRadius: '20px',
        margin: 'auto', position: 'relative', overflow: 'hidden'
    }
    const springBtn = useSpring({
        background: isHover || props.canClick===false ? 'rgb(45,120,230)' : 'rgb(50,140,250)',
        config: { duration: 100 }
    });
    const styleTxt = {
        height: '40px', textAlign: 'center', lineHeight: '40px',
        fontSize: '15px', fontWeight: '300', color: 'white'
    }
    const styleImg = {
        position: 'absolute', top: '10px', left: '10px',
        height: '20px'
    }
    const handleClick = () => {
        if(props.canClick) props.onClick();
    }
    return (
        <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
        onClick={ handleClick } style={{ ...styleBtn, ...springBtn }} className="BTNC">
            <div style={ styleTxt }>Go</div>
            <img style={ styleImg } src={ svgRight } alt=""/>
        </animated.div>
    )
}
const SocialImg = (props) => {
    const style = {
        position: 'absolute', top: `${ 7 + props.top }px`, left: `${ 10 + props.left }px`,
        height: '14px', width: '14px', borderRadius: '8px',
        overflow: 'hidden', background: props.background
    }
    const styleImg = {
        position: 'absolute', top: '20%', left: '20%',
        width: '60%', height: '60%'
    }

    return (
        <div style={ style }>
            <img style={ styleImg } src={ props.src } alt=""/>
        </div>
    )
}
const BtnSocial = (props) => {
    const [isHover, setHover] = useState(false);
    const styleBtn = {
        width: '60%', height: '40px', borderRadius: '20px',
        margin: 'auto', position: 'relative', overflow: 'hidden'
    }
    const springBtn = useSpring({
        background: isHover ? 'rgb(175,175,175)' : 'rgb(190,190,190)',
        config: { duration: 100 }
    });
    const styleTxt = {
        height: '40px', textAlign: 'center', lineHeight: '40px',
        fontSize: '15px', fontWeight: '300', color: 'white'
    }
    return (
        <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
        onClick={ props.onClick } style={{ ...styleBtn, ...springBtn }} className="BTNC">
            <div style={ styleTxt }>소셜 로그인</div>
            <SocialImg src={ imgGoogle } background="rgb(255,255,255)" top={ 0 } left={ 0 }/>
            <SocialImg src={ imgFacebook } background="rgb(50,140,250)" top={ 0 } left={ 12 }/>
            <SocialImg src={ imgKakao } background="rgb(255,220,0)" top={ 12 } left={ 12 }/>
            <SocialImg src={ imgNaver } background="rgb(30,200,0)" top={ 12 } left={ 0 }/>
        </animated.div>
    )
}
const BtnFind = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        fontSize: '14px', float: 'left'
    }
    const springBtn = useSpring({
        color: isHover ? 'black' : 'rgb(100,100,100)',
        config: { duration: 100 }
    });
    return (
        <Link to="/login/findmypassword">
            <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ ...style, ...springBtn }}>비밀번호 찾기</animated.div>
        </Link>
    )
}
const BtnSignup = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        fontSize: '14px', float: 'right'
    }
    const springBtn = useSpring({
        color: isHover ? 'black' : 'rgb(100,100,100)',
        config: { duration: 100 }
    });
    return (
        <Link to="/login/joinus">
            <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ ...style, ...springBtn }}>회원가입</animated.div>
        </Link>
    )
}
class Login extends Component {
    constructor(props){
        super(props);
        this.state = { page: 'right', state: 'input', msg: '' }
        this.styleLayLeft = {
            position: 'absolute', top: '0px', right: '450px', width: '450px', height: '100%'
        }
        this.styleLayRight = {
            position: 'absolute', top: '0px', right: '0px', width: '100%', height: '100%', maxWidth: '450px', overflow: 'hidden'
        }
        this.styleTitle = {
            paddingTop: '40px', textAlign: 'center', height: '50px', lineHeight: '50px',
            fontSize: '26px', fontWeight: '700', color: 'rgb(50,50,50)'
        }
        this.styleTxt1 = {
            marginLeft: '75px', marginRight: '75px', height: '20px', lineHeight: '20px',
            fontSize: '13px', fontWeight: '300', color: 'rgb(70,70,70)'
        }
        this.styleInput = {
            width: '100%', height: '100%', fontSize: '17px', fontWeight: '300',
            border: 'none', outline: 'none'
        }
        this.styleMsg = {
            marginLeft: '75px', marginRight: '75px',
            fontSize: '13px', fontWeight: '300', color: 'red'
        }
        this.styleInputContainer = {
            marginLeft: '75px', marginRight: '75px', height: '25px',
            borderBottom: '2px solid rgb(200,200,200)'
        }
        this.styleTxt2Container = {
            marginLeft: '75px', marginRight: '75px', position: 'relative'
        }
    }
    onClickLogin(){
        const id = document.getElementById('input-id').value;
        const pw = document.getElementById('input-pw').value;
        if(id==='' || pw==='' || id.length>30 || pw.length>50) return;

        this.setState({ state: 'waiting' }, () => axios.post(`/json/login/try`, { id: id, pw: pw }).then((res) => {
            if(res.data.res === 'fault'){
                this.setState({ state: 'input', msg: '해당 계정을 찾을 수 없습니다.' });
            }
            else if(res.data.res === 'email'){
                this.setState({ state: 'input', msg: '이메일 인증을 완료하세요.' });
            }
            else if(res.data.res === 'done'){
                this.setState({ state: 'done' });
            }
            else{
                this.setState({ state: 'input', msg: '서버 오류로 인해 로그인 할 수 없습니다.' });
            }
        }));   
    }
    onKeyup(){
        if(window.event.keyCode === 13) this.onClickLogin();
    }
    pageMove(page){
        this.setState({ page: page });
    }
    render() {
        if(this.state.state === 'done'){
            const callback = getHref.hrefParse().query.callback;
            const add = getHref.hrefParse().query.add;

            if(callback) return <Redirect to={ getHref.decode(callback) }/>
            else if(add) window.location.href = getHref.decodeOld(add);
            else return <Redirect to="/"/>
        }
        const pageLogin = (
            <>
                <div style={ this.styleTitle }>로그인</div>
                <div style={{ ...this.styleTxt1, marginTop: '30px' }}>ID</div>
                <div style={ this.styleInputContainer }>
                    <input id="input-id" type="txt" style={ this.styleInput } onKeyUp={ () => this.onKeyup() }/>
                </div>
                <div style={{ ...this.styleTxt1, marginTop: '20px' }}>PASSWORD</div>
                <div style={ this.styleInputContainer }>
                    <input id="input-pw" type="password" style={{ ...this.styleInput, letterSpacing: '3px' }} onKeyUp={ () => this.onKeyup() }/>
                </div>
                <div style={{ height: '60px' }}>
                    <div style={ this.styleMsg }>{ this.state.msg }</div>
                </div>
                <BtnLogin onClick={ () => this.onClickLogin() } canClick={ this.state.state === 'input' }/>
                <div style={{ height: '15px' }}/>
                <BtnSocial onClick={ () => this.pageMove('left') }/>
                <div style={{ height: '35px' }}/>
                <div style={ this.styleTxt2Container }>
                    <BtnFind/><BtnSignup/>
                </div>
            </>
        );
        return (
            <div className="ND">
                <Helmet><title>로그인 : 오일러OJ</title></Helmet>
                <div style={{  ...this.styleLayRight }}>
                    <PageRight left={ <SocialLogin movePage={ () => this.pageMove('right') }/> } right={ pageLogin } page={ this.state.page }/>
                </div>
                <div style={ this.styleLayLeft }>
                    <LayLeft/>
                </div>
            </div>
        );
    }
}

export default Login;