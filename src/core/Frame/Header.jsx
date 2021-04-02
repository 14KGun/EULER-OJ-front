import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from '../Tool/axios';
import './Header.css';
import eulerLogo from './svg_eulerlogo.svg';

const HeaderBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        width: isHover ? '100%' : '0%',
        left: isHover ? '0%' : '50%',
        config: { tension: 500, friction: 40 }
    });

    return (
        <a href={ props.url }>
            <div className="HEADER_BTN" onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <animated.div className="HEADER_BTN_A" style={ props.txtStyle }>{ props.name }</animated.div>
                <animated.div className="HEADER_BTN_B" style={ style }></animated.div>
            </div>
        </a>
    );
}
const HeaderMaker = (props) => {
    const urlList = props.urlList;
    const theme = props.theme;
    const height = '70px';
    const currentUrl = window.location.pathname;

    /* SCROLL */
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollevent = () => {
        const scrolledHeight = document.documentElement.scrollTop;
        if(scrolledHeight > 0) setIsScrolled(true);
        else setIsScrolled(false);
    };
    document.addEventListener('scroll', () => scrollevent());

    const headerStyle = useSpring({
        height: height, 
        background: isScrolled ? `rgba(${theme.r},${theme.g},${theme.b},0.6)` : `rgba(${theme.r},${theme.g},${theme.b},0)`, 
        WebkitBackdropFilter: `blur(${isScrolled ? 6 : 0}px)`, backdropFilter: `blur(${isScrolled ? 6 : 0}px)`,
        boxShadow: `0 0 10px 5px rgba(0,0,0,${isScrolled ? 0.1 : 0})`
    });
    const headerTxtStyle = useSpring({
        color: isScrolled ? 'black' : 'white'
    });

    const [isLogoHover, setLogoHover] = useState(false);
    const logoStyle = useSpring({
        background: isLogoHover ? 'rgba(230,230,230,0.4)' : 'rgba(230,230,230,0.0)'
    });

    const [isLoginHover, setLoginHover] = useState(false);
    const loginStyle = useSpring({
        background: isLoginHover ? 'rgba(230,230,230,0.4)' : 'rgba(230,230,230,0.0)'
    });

    /* Logo Hover */
    const logoSpringConfig = { duration: 150 };
    const logoImgStyle = useSpring({
        top: isLogoHover ? '13px' : '15px',
        left: isLogoHover ? '35px' : '31px',
        height: isLogoHover ? '30px' : '40px',
        config: logoSpringConfig
    });
    const logoTxtStyle = useSpring({
        top: isLogoHover ? '40px' : '40px',
        left: isLogoHover ? '10px' : '10px',
        opacity: isLogoHover ? 1 : 0,
        config: logoSpringConfig
    });
    const logoTxtABStyle = useSpring({
        fontSize: isLogoHover ? '12px' : '16px',
        config: logoSpringConfig
    });

    return (
        <animated.div id="header" className="ND" style={ headerStyle }>
            <animated.button id="header_btn0" className="BTNC" style={ logoStyle }
            onMouseEnter={ () => setLogoHover(true) }
            onMouseLeave={ () => setLogoHover(false) }>
                <animated.img id="header_btn0_img" src={ eulerLogo } style={ logoImgStyle }/>
                <animated.div id="header_btn0_txt" style={ logoTxtStyle }>
                    <animated.span id="header_btn0_txt_A" style={ logoTxtABStyle }>오일러</animated.span><animated.span id="header_btn0_txt_B" style={ logoTxtABStyle }>OJ</animated.span>
                </animated.div>
            </animated.button>
            <div id="header_btn0line"/>
            { urlList.map((item, index) => <HeaderBtn key={ index } url={ item.url } txtStyle={ headerTxtStyle } name={ item.name }/>) }

            <a href="/login"><animated.button id="header_login" className="BTNC"
            onMouseEnter={ () => setLoginHover(true) }
            onMouseLeave={ () => setLoginHover(false) }
            style={{ ...headerTxtStyle, ...loginStyle, display: props.loginInfo==undefined || props.loginInfo.id!='' ? 'none' : 'block' }}>로그인</animated.button></a>

            <animated.button id="header_prof" className="BTNC"
            onMouseEnter={ () => setLoginHover(true) }
            onMouseLeave={ () => setLoginHover(false) }
            style={{ ...loginStyle, display: props.loginInfo==undefined || props.loginInfo.id=='' ? 'none' : 'block' }}>
                <div id="header_prof_imgborder">
                    <img className="FULLIMG" src={`/profile-img/${ props.loginInfo ? props.loginInfo.id : 'none' }.webp?size=100`}/>
                </div>
            </animated.button>
        </animated.div>

    );
}
class Header extends Component {
    state = { loginInfo: undefined }
    constructor(props){
        super(props);

        this.urlList = [{ url: '/problemset', name: '문제' }, { url: '/tags', name: '태그' }, { url: '/contest', name: '대회' },
            { url: '/status', name: '채점' }, { url: '/ranking', name: '순위' }, { url: '/board', name: '공지' }];

        this.theme = { r: 255, g: 255, b: 255 };

        axios.get('/json/logininfo').then((userInfo) => {
            this.setState({ loginInfo: userInfo.data});
        });
    }
    render() {
        return <HeaderMaker urlList={ this.urlList } theme={ this.theme } loginInfo={ this.state.loginInfo }/>;
    }
}

export default Header;