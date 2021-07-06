import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import SocialLogin from './SocialLogin';
import svgCoding from './svg_coding.svg';

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
        width: '60%', height: '40px', borderRadius: '20px', margin: 'auto',
        textAlign: 'center', lineHeight: '40px',
        fontSize: '15px', fontWeight: '300', color: 'white'
    }
    const springBtn = useSpring({
        background: isHover ? 'rgb(30,110,220)' : 'rgb(50,140,250)',
        config: { duration: 200 }
    });
    return (
        <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) } onClick={ props.onClick }
        style={{ ...styleBtn, ...springBtn }} className="BTNC">Go</animated.div>
    )
}
const BtnSocial = (props) => {
    const [isHover, setHover] = useState(false);
    const styleBtn = {
        width: '60%', height: '40px', borderRadius: '20px', margin: 'auto',
        textAlign: 'center', lineHeight: '40px',
        fontSize: '15px', fontWeight: '300', color: 'white'
    }
    const springBtn = useSpring({
        background: isHover ? 'rgb(175,175,175)' : 'rgb(200,200,200)',
        config: { duration: 200 }
    });
    return (
        <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) } onClick={ props.onClick }
        style={{ ...styleBtn, ...springBtn }} className="BTNC">소셜 로그인</animated.div>
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
        this.state = { page: 'right' }
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
        this.styleInputContainer = {
            marginLeft: '75px', marginRight: '75px', height: '25px',
            borderBottom: '2px solid rgb(200,200,200)'
        }
        this.styleTxt2Container = {
            marginLeft: '75px', marginRight: '75px', position: 'relative'
        }
    }
    onClickLogin(){

    }
    pageMove(page){
        this.setState({ page: page });
    }
    render() {
        const pageLogin = (
            <>
                <div style={ this.styleTitle }>로그인</div>
                <div style={{ ...this.styleTxt1, marginTop: '30px' }}>ID</div>
                <div style={ this.styleInputContainer }>
                    <input id="input-id" type="txt" style={ this.styleInput }/>
                </div>
                <div style={{ ...this.styleTxt1, marginTop: '20px' }}>PASSWORD</div>
                <div style={ this.styleInputContainer }>
                    <input id="input-pw" type="password" style={{ ...this.styleInput, letterSpacing: '3px' }}/>
                </div>
                <div style={{ height: '60px' }}/>
                <BtnLogin onClick={ () => this.onClickLogin() }/>
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