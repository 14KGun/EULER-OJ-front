import { Component, useState } from 'react';
import { useSpring, animated } from "@react-spring/web";

import imgGoogle from './img_google.png';
import imgNaver from './img_naver.png';
import imgKakao from './img_kakao.png';

const BtnSocial = (props) => {
    const [isHover, setHover] = useState(false);
    const styleBtn = {
        width: '60%', height: '38px', borderRadius: '20px', margin: 'auto', position: 'relative', overflow: 'hidden',
        border: props.border, background: props.background, marginBottom: '10px'
    };
    const styleImg = {
        position: 'absolute', width: '15px', height: '15px', top: '11px', left: '13px'
    }
    const styleText = {
        width: '100%', height: '38px', lineHeight: '38px', textAlign: 'center',
        color: props.textColor, paddingLeft: '10px'
    }
    const boxShadow = useSpring({
        boxShadow: isHover ? 'rgba(0,0,0,0.12) 0px 0px 10px 5px' : 'rgba(0,0,0,0) 0px 0px 10px 5px',
        config: { duration: 150 }
    });
    return (
        <a href={ props.href }>
            <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ ...styleBtn, ...boxShadow }}>
                <img style={ styleImg } src={ props.icon }/>
                <div style={ styleText }>{ props.text }</div>
            </animated.div>
        </a>
    )
}
const BtnBack = (props) => {
    const [isHover, setHover] = useState(false);
    const styleBtn = {
        width: '60%', height: '40px', borderRadius: '20px', margin: 'auto',
        textAlign: 'center', lineHeight: '40px',
        fontSize: '15px', fontWeight: '300', color: 'white'
    }
    const springBtn = useSpring({
        background: isHover ? 'rgb(175,175,175)' : 'rgb(190,190,190)',
        config: { duration: 100 }
    });
    return (
        <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) } onClick={ props.onClick }
        style={{ ...styleBtn, ...springBtn }} className="BTNC">뒤로가기</animated.div>
    )
}
class SocialLogin extends Component {
    constructor(props){
        super(props);
        this.styleTitle = {
            paddingTop: '40px', textAlign: 'center', height: '50px', lineHeight: '50px',
            fontSize: '26px', fontWeight: '700', color: 'rgb(50,50,50)'
        }
        this.styleText = {
            marginLeft: '75px', marginRight: '75px',
            fontSize: '13px', fontWeight: 300, color: 'rgb(70,70,70)'
        }
    }
    render() {
        return (
            <div>
                <div style={ this.styleTitle }>소셜 로그인</div>
                <div style={{ height: '30px' }}/>

                <BtnSocial icon={ imgGoogle } text="구글 계정으로 로그인"
                background="rgb(255,255,255)" border="1px solid rgb(200,200,200)" textColor="black"
                href="/login/auth/google"/>
                <BtnSocial icon={ imgNaver } text="네이버 계정으로 로그인"
                background="rgb(30,200,0)" border="1px solid rgb(30,200,0)" textColor="white"
                href="/login/auth/naver"/>
                <BtnSocial icon={ imgKakao } text="카카오 계정으로 로그인"
                background="rgb(255,220,0)" border="1px solid rgb(255,220,0)" textColor="rgb(60,30,30)"
                href="/login/auth/kakao"/>

                <div style={{ height: '30px' }}/>
                <div style={ this.styleText }>기존 오일러OJ 사용자는 로그인 후 계정 설정에서 소셜 연동이 가능합니다.</div>
                <div style={{ height: '50px' }}/>
                <BtnBack onClick={ () => this.props.movePage() }/>
            </div>
        );
    }
}

export default SocialLogin;