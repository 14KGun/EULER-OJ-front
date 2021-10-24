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
    return (
        <div>
            <div style={ styleText }>오일러OJ 웹사이트는 쿠키를 사용합니다. 쿠키에 대한 자세한 정보 및 삭제 방법은 <a href="/about/policy/privacy"><u style={{ fontSize: styleText.fontSize, color: styleText.color, fontWeight: 500 }}>개인정보처리방침</u></a>을 참고하시기 바라며 본 사이트를 계속해서 이용하는 것은 오일러OJ의 쿠키 사용에 동의함을 의미합니다.</div>
            <LayBtm>
                <BtnT1 theme={ props.theme } onClick={ () => onClick() }>확인</BtnT1>
            </LayBtm>
        </div>
    )
}

const Scoring = (props) => {
    return (
        <div>
            <BtnClose onClick={ props.onClose }/>
            <div style={{ padding: '15px', paddingBottom: '5px', fontSize: '14px',
            color: ( props.theme === 'light' ? 'black' : 'white' ) }}>#1234 문제 채점 대기중
            </div>
            <LayBtm>
                <BtnT1 theme={ props.theme }>이동</BtnT1>
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
                <div style={ styleText1 }>새로운 업적 달성!</div>
                <div><Link><u style={ styleText2 }>'시작이 좋아'</u></Link></div>
            </div>
            <LayBtm>
                <BtnT1 theme={ props.theme }>프로필로 이동</BtnT1>
            </LayBtm>
        </div>
    )
}

export default { LayBtm, BtnT1, Cookie, Scoring, Trophy }