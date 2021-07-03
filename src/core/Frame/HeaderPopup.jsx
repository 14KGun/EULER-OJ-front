import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import imgEuler from '../Main/img_card1.png';
import imgYoutube from '../Main/img_card2.png';
import imgBooks from '../Main/img_card3.png';
import imgBlog from '../Main/img_card4.png';
import svgProf from './HeaderPopupIcon/svg_prof.svg';
import svgBookmark from './HeaderPopupIcon/svg_bookmark.svg';
import svgSetting from './HeaderPopupIcon/svg_setting.svg';
import svgLogout from './HeaderPopupIcon/svg_logout.svg';

const BtnItem = (props) => {
    const [isHover, setHover] = useState(false);

    const style = {
        height: '60px', position: 'relative'
    }
    const springStyle = useSpring({
        background: isHover ? 'rgba(120,120,120,0.1)' : 'rgba(120,120,120,0)',
        config: { duration: 100 }
    })
    const imgStyle = {
        position: 'absolute', top: '15px', left: '15px',
        width: `${ 30 - 2*props.padding }px`,
        height: `${ 30 - 2*props.padding }px`,
        padding: `${ props.padding }px`
    }
    const txtStyle = {
        position: 'absolute', top: '0px', left: '60px',
        width: '200px', height: '60px', lineHeight: '60px',
        textAlign: 'center', fontSize: '16px', fontWeight: '300', color: 'black'
    }

    const content = (
        <animated.div style={{ ...style, ...springStyle }}
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <img style={ imgStyle } src={ props.icon } alt={ props.name }/>
            <div style={ txtStyle }>{ props.name }</div>
        </animated.div>
    )

    if(props.newtab) return <a href={ props.url } target="_blank" rel="noreferrer">{ content }</a>;
    else return <Link to={ props.url } onClick={ props.close }>{ content }</Link>;
}
BtnItem.defaultProps = {
    padding: 0
}
const HeaderRight = (props) => {
    const style = {
        position: 'fixed', top: '80px', right: '10px', width: '300px', zIndex: 89,
        borderRadius: '10px', overflow: 'hidden',
        background: 'white'
    };
    const springStyle = useSpring({
        height: props.show ? '450px' : '0px'
    });
    const lay1Style = {
        height: '180px', paddingTop: '30px',
        background: 'rgb(0,134,191)'
    }
    const imgBorderStyle = {
        height: '100px', width: '100px', borderRadius: '50px',
        margin: 'auto', overflow: 'hidden',
        border: '2px solid rgb(230,230,230)',
        background: 'white'
    }
    const Lay1IdStyle = {
        marginTop: '10px', textAlign: 'center',
        width: '100%', overflow: 'hidden',
        fontSize: '20px', fontWeight: '500', color: 'white',
    };

    if(props.loginInfo === undefined) return <></>;
    else{
        return (
            <animated.div className="ND" style={{ ...style, ...springStyle }}>
                <div style={ lay1Style }>
                    <div style={ imgBorderStyle }>
                        <img style={{ width: '100%', height: '100%' }}
                        src={ `https://euleroj.io/profile-img/${ props.loginInfo.id }.webp?size=100` }
                        alt={ props.loginInfo.id }/>
                    </div>
                    <div style={ Lay1IdStyle }>{ props.loginInfo.id }</div>
                </div>
                <BtnItem icon={ svgProf } name="내 프로필" url={ `/profile/${ props.loginInfo.id }` } close={ props.close } padding={ 3 }/>
                <BtnItem icon={ svgBookmark } name="내 북마크" url="/tags/bookmark" close={ props.close } padding={ 4 }/>
                <BtnItem icon={ svgSetting } name="계정 설정" url="/setting/profile" close={ props.close } padding={ 3 }/>
                <BtnItem icon={ svgLogout } name="로그아웃" url="/logout" close={ props.close } padding={ 4 }/>
            </animated.div>
        );
    }
}
const HeaderLeft = (props) => {
    const style = {
        position: 'fixed', top: '80px', left: '10px', width: '300px', zIndex: 89,
        borderRadius: '10px', overflow: 'hidden',
        background: 'white'
    };
    const springStyle = useSpring({
        height: props.show ? '350px' : '0px'
    });
    const topStyle = {
        width: '100%', height: '50px', background: 'rgb(231,22,26)', lineHeight: '50px',
        fontSize: '16px', fontWeight: '500', color: 'white', paddingLeft: '20px'
    };

    return (
        <animated.div className="ND" style={{ ...style, ...springStyle }}>
            <div style={ topStyle }>오일러 바로가기</div>
            <BtnItem icon={ imgEuler } name="메인" url="/" close={ props.close }/>
            <BtnItem icon={ imgEuler } name="오일러OJ" url="/problemset" close={ props.close }/>
            <BtnItem icon={ imgYoutube } name="오일러TV" url="https://www.youtube.com/channel/UCQQJLCWcgAvrWRdZaxLUXJQ" close={ props.close } newtab/>
            <BtnItem icon={ imgBooks } name="오일러BOOKS" url="https://smartstore.naver.com/eulerbooks" close={ props.close } newtab/>
            <BtnItem icon={ imgBlog } name="오일러BLOG" url="https://blog.naver.com/euleroj" close={ props.close } newtab/>
        </animated.div>
    );
}
const HeaderPopupMaker = (props) => {
    const BlurscreenStyle = useSpring({
        position: 'fixed', top: '0px', left:'0px', zIndex: 89,
        width: '100%', height: '100%',
        background: props.left|props.right ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0)',
        WebkitBackdropFilter: `blur(${ props.left|props.right ? 3 : 0 }px)`, backdropFilter: `blur(${ props.left|props.right ? 3 : 0 }px)`,
        display: props.left|props.right ? 'block' : 'none'
    });
    return (
        <>
            <animated.div style={ BlurscreenStyle }
            onClick={ () => { props.leftClose(); props.rightClose(); } }/>
            <HeaderLeft show={ props.left } close={ props.leftClose }/>
            <HeaderRight show={ props.right } close={ props.rightClose } loginInfo={ props.loginInfo }/>
        </>
    );
}
class HeaderPopup extends Component {
    render() {
        return <HeaderPopupMaker loginInfo={ this.props.loginInfo }
        left={ this.props.left } right={ this.props.right }
        leftClose={ this.props.leftClose } rightClose={ this.props.rightClose }/>;
    }
}

export default HeaderPopup;