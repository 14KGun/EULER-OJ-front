import { Component } from 'react';
import { useSpring, animated } from "@react-spring/web";
import HeaderLeft from './HeaderPopupLeft';
import HeaderRight from './HeaderPopupRight';

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
            <HeaderLeft show={ props.left } close={ props.leftClose } theme={ props.theme }/>
            <HeaderRight show={ props.right } close={ props.rightClose } loginInfo={ props.loginInfo } theme={ props.theme }/>
        </>
    );
}
class HeaderPopup extends Component {
    render() {
        return <HeaderPopupMaker loginInfo={ this.props.loginInfo } theme={ this.props.theme }
        left={ this.props.left } leftClose={ this.props.leftClose }
        right={ this.props.right } rightClose={ this.props.rightClose }/>;
    }
}

export default HeaderPopup;