import { useState, Component, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import axios from '../../Tool/axios';
import getHref from '../../Tool/getHref';
import HeaderPopup from './HeaderPopup/HeaderPopup';
import svgEulerLogo from '../svg_eulerlogo.svg';
import svgThemeDark from './svg_theme_dark.svg';
import svgThemeLight from './svg_theme_light4.svg';
import './Header.css';

const HeaderBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        width: isHover ? '100%' : '0%',
        left: isHover ? '0%' : '50%',
        config: { tension: 500, friction: 40 }
    });

    return (
        <Link to={ props.url }>
            <div className="HEADER_BTN" onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <animated.div className="HEADER_BTN_A" style={ props.txtStyle }>{ props.name }</animated.div>
                <animated.div className="HEADER_BTN_B" style={ style }></animated.div>
            </div>
        </Link>
    );
}
const BtnLogo = (props) => {
    const [isHover, setHover] = useState(false);
    const logoStyle = useSpring({
        background: isHover || props.selected ? props.background[0] : props.background[1]
    });
    const logoSpringConfig = { duration: 150 };
    const logoImgStyle = useSpring({
        top: isHover || props.selected ? '13px' : '15px',
        left: isHover || props.selected ? '35px' : '31px',
        height: isHover || props.selected ? '30px' : '40px',
        config: logoSpringConfig
    });
    const logoTxtStyle = useSpring({
        top: isHover || props.selected ? '40px' : '40px',
        left: isHover || props.selected ? '10px' : '10px',
        opacity: isHover || props.selected ? 1 : 0,
        config: logoSpringConfig
    });
    const logoTxtABStyle = useSpring({
        fontSize: isHover || props.selected ? '12px' : '16px',
        config: logoSpringConfig
    });

    return (
        <>
            <animated.button id="header_btn0" className="BTNC" style={ logoStyle }
            onClick={ props.onClick }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <animated.img id="header_btn0_img" src={ svgEulerLogo } style={ logoImgStyle }/>
                <animated.div id="header_btn0_txt" style={ logoTxtStyle }>
                    <animated.span id="header_btn0_txt_A" style={ logoTxtABStyle }>오일러</animated.span>
                    <animated.span id="header_btn0_txt_B" style={ logoTxtABStyle }>OJ</animated.span>
                </animated.div>
            </animated.button>
            <div id="header_btn0line"/>
        </>
    )
}
const BtnLogin = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? props.background[0] : props.background[1]
    });

    return (
        <Link to={ getHref.loginCurrentUrl() }>
            <animated.button id="header_login" className="BTNC"
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ ...props.txtStyle, ...background }}>로그인</animated.button>
        </Link>
    )
}
const BtnProfile = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? props.background[0] : props.background[1]
    });

    return (
        <animated.button id="header_prof" className="BTNC"
        onClick={ props.onClick } style={{ ...background }}
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <div id="header_prof_imgborder">
                <img className="FULLIMG" src={`/profile-img/${ props.loginInfo.id }.webp?size=100`} alt=""/>
            </div>
        </animated.button>
    )
}
const BtnTheme = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? props.background[0] : props.background[1]
    });
    const onClick = () => {
        if(props.theme === 'light') props.setTheme('dark');
        else props.setTheme('light');
    }

    let img = <img src={ svgThemeLight } alt="theme" className="header_theme_img1"/>;
    if(props.theme === 'dark') img = <img src={ svgThemeDark } alt="theme" className="header_theme_img2"/>;

    return (
        <animated.button id="header_theme" className="BTNC"
        onClick={ () => onClick() } style={{ ...background }}
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            { img }
        </animated.button>
    )
}
const HeaderMaker = (props) => {
    /* SCROLL */
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollevent = () => {
        const scrolledHeight = document.documentElement.scrollTop;
        if(scrolledHeight >= 20) setIsScrolled(true);
        else setIsScrolled(false);
    };
    useEffect(() => {
        document.addEventListener('scroll', scrollevent);
        return () => {
            document.removeEventListener('scroll', scrollevent);
        }
    })

    /* Theme */
    const backgroundScrolled = `rgba(${ props.theme.r },${ props.theme.g },${ props.theme.b },0.6)`;
    const backgroundNone = `rgba(${ props.theme.r },${ props.theme.g },${ props.theme.b },0.0)`;
    const hoverBgd = 'rgba(230,230,230,0.4)';
    const hoverBgdNone = 'rgba(230,230,230,0.0)';

    /* PopupScreen */
    const [isLeftPopup, setLeftPopup] = useState(false);
    const [isRightPopup, setRightPopup] = useState(false);
    const onClickLeft = () => setLeftPopup(!isLeftPopup);
    const onClickRight = () => setRightPopup(!isRightPopup);

    /* Text Style */
    const headerStyle = useSpring({
        height: '70px', zIndex: 90,
        background: isScrolled ? backgroundScrolled : backgroundNone, 
        WebkitBackdropFilter: `blur(${ isScrolled ? 6 : 0 }px)`, backdropFilter: `blur(${ isScrolled ? 6 : 0 }px)`,
        boxShadow: `0 0 10px 5px rgba(0,0,0,${ isScrolled ? 0.1 : 0 })`
    });
    const headerTxtStyle = useSpring({
        color: isScrolled ? props.txtColorWithBgd : props.txtColor
    });

    /* Right */
    let rightLay = '';
    if(props.loginInfo === undefined);
    else if(props.loginInfo.id === ''){
        rightLay = <BtnLogin txtStyle={ headerTxtStyle } background={ [hoverBgd, hoverBgdNone] }/>;
    }
    else if(props.loginInfo){
        rightLay = <BtnProfile background={ [hoverBgd, hoverBgdNone] } onClick={ () => onClickRight() }
        loginInfo={ props.loginInfo }/>;
    }

    return (
        <>
            <HeaderPopup left={ isLeftPopup } right={ isRightPopup } loginInfo={ props.loginInfo }
            leftClose={ () => setLeftPopup(false) } rightClose={ () => setRightPopup(false) }/>

            <animated.div id="header" className="ND" style={ headerStyle }>
                <BtnLogo background={ [hoverBgd, hoverBgdNone] } onClick={ () => onClickLeft() }/>
                { props.urlList.map((item, index) => {
                    return <HeaderBtn key={ index } url={ item.url } txtStyle={ headerTxtStyle } name={ item.name }/>
                }) }
                { rightLay }
                <BtnTheme background={ [hoverBgd, hoverBgdNone] } setTheme={ props.setTheme } theme={ props.getTheme }/>
            </animated.div>
        </>
    );
}

class Header extends Component {
    constructor(props){
        super(props);
        this.state = { loginInfo: undefined }
        this.lastPath = 'none';
    }
    urlList(adminCheck = false){
        const urlList = [{ url: '/problemset', name: '문제' }, { url: '/tags', name: '태그' }, { url: '/contest', name: '대회' },
        { url: '/status', name: '채점' }, { url: '/ranking', name: '순위' }, { url: '/board', name: '공지' }];

        if(adminCheck){
            urlList.push({ url: '/nadmin', name: '관리' });
        }
        return urlList;
    }
    requestLogininfo(){
        axios.get('/json/logininfo').then((userInfo) => {
            this.setState({ loginInfo: userInfo.data });
        })
    }
    render(){
        const currentUrl = window.location.pathname;
        if(currentUrl !== this.lastPath){
            this.lastPath = currentUrl;
            this.requestLogininfo();
        }

        const urlList = this.urlList(this.state.loginInfo && this.state.loginInfo.level >= 5);

        let theme = { r: 255, g: 255, b: 255 };
        if(this.props.theme === 'dark') theme = { r: 50, g: 50, b: 50 };
        let color1 = { r: 0, g: 0, b: 0 };
        if(this.props.theme === 'dark') color1 = { r: 255, g: 255, b: 255 };
        let color2 = { r: 255, g: 255, b: 255 };

        let txtColor = 'white';
        if(this.props.theme === 'light' && this.props.txtColor === 'none') txtColor = 'black';
        if(this.props.txtColor !== 'none' && this.props.txtColor !== 'auto') txtColor = this.props.txtColor;

        let txtColorWithBgd = 'black';
        if(this.props.theme === 'dark') txtColorWithBgd = 'white';

        return (
            <HeaderMaker theme={ theme } txtColor={ txtColor } txtColorWithBgd={ txtColorWithBgd }
            urlList={ urlList } loginInfo={ this.state.loginInfo }
            setTheme={ this.props.setTheme } getTheme={ this.props.theme }/>
        )
    }
}

Header.defaultProps = {
    txtColor: 'auto'
}
export default Header;