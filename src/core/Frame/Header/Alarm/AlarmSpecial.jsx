import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import getTrophyInfo from '../../../Tool/getTrophyInfo';

import svgClose from './svg_close.svg';

const LayBtm = (props) => {
    const style = {
        display: 'flex', justifyContent: 'flex-end',
        paddingLeft: props.paddingLeft, paddingRight: props.paddingRight,
        paddingTop: props.paddingTop, paddingBottom: props.paddingBottom
    };

    return (
        <div style={ style }>
            { props.children }
        </div>
    )
}
LayBtm.defaultProps = {
    paddingLeft: '15px', paddingRight: '15px', paddingTop: '0px', paddingBottom: '15px'
}
const BtnT1 = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        height: '26px', lineHeight: '26px', borderRadius: '15px',
        border: `2px solid ${ props.theme === 'light' ? 'rgb(100,100,100)' : 'rgb(180,180,180)' }`,
        color: /*isHover ? 'white' : */( props.theme === 'light' ? 'rgb(100,100,100)' : 'rgb(180,180,180)' ),
        background: ( props.theme === 'light' ? `rgba(100,100,100,${ isHover ? 0.3 : 0 })` : `rgb(180,180,180,${ isHover ? 0.3 : 0 })` ),
        paddingLeft: '10px', paddingRight: '10px',
        fontSize: props.fontSize, fontWeight: 400,
        config: { duration: 100 }
    });

    return (
        <animated.div className="BTNC" style={ style } onClick={ () => props.onClick() }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>{ props.children }</animated.div>
    )
}
BtnT1.defaultProps = {
    fontSize: '13px', onClick: () => {}
}

const BtnClose = (props) => {
    return (
        <img src={ svgClose } alt="close" className="BTNC" onClick={ props.onClick }
        style={{ position: 'absolute', top: '10px', right: '10px', width: '20px' }}/>
    )
}

const Cookie = (props) => {
    const styleText = {
        padding: '15px', paddingBottom: '5px',
        fontSize: '14px', fontWeight: 300,
        color: ( props.theme === 'light' ? 'black' : 'white' )
    }
    const onClick = () => {
        props.onClose();
    }
    // a ?????????
    return (
        <div>
            <div style={ styleText }>?????????OJ ??????????????? ????????? ???????????????. ????????? ?????? ????????? ?????? ??? ?????? ????????? <a href="/about/policy/privacy"><u style={{ fontSize: styleText.fontSize, color: styleText.color, fontWeight: 500 }}>????????????????????????</u></a>??? ??????????????? ????????? ??? ???????????? ???????????? ???????????? ?????? ?????????OJ??? ?????? ????????? ???????????? ???????????????.</div>
            <LayBtm>
                <BtnT1 theme={ props.theme } onClick={ () => onClick() }>??????</BtnT1>
            </LayBtm>
        </div>
    )
}

const Scoring = (props) => {
    return (
        <div>
            <BtnClose onClick={ props.onClose }/>
            <div style={{ padding: '15px', paddingBottom: '5px', fontSize: '14px',
            color: ( props.theme === 'light' ? 'black' : 'white' ) }}>#1234 ?????? ?????? ?????????
            </div>
            <LayBtm>
                <BtnT1 theme={ props.theme }>??????</BtnT1>
            </LayBtm>
        </div>
    )
}

const Trophy = (props) => {
    const color = props.theme === 'light' ? 'black' : 'white';
    const style = {
        padding: '15px', paddingLeft: '90px', paddingBottom: '5px'
    }
    const styleText1 = {
        fontSize: '14px', fontWeight: 300, color: color
    }
    const styleText2 = {
        fontSize: '14px', fontWeight: 500, color: color
    }
    const styleImg = {
        position: 'absolute', top: '15px', left: '15px', width: '60px', height: '60px'
    }

    return (
        <div>
            <BtnClose onClick={ props.onClose }/>
            <img src={ getTrophyInfo.getInfoById(1).icon } alt="trophy-img" style={ styleImg }/>
            <div style={ style }>
                <div style={ styleText1 }>????????? ?????? ??????!</div>
                <div><Link><u style={ styleText2 }>'????????? ??????'</u></Link></div>
            </div>
            <LayBtm>
                <BtnT1 theme={ props.theme }>???????????? ??????</BtnT1>
            </LayBtm>
        </div>
    )
}

export default { LayBtm, BtnT1, Cookie, Scoring, Trophy }