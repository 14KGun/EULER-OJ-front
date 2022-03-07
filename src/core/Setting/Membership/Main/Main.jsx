import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Footer from '../../../Frame/Footer/Footer';

import svgBackground from './svg_background.svg';
import svgKey from './svg_key.svg';
import svgList from './svg_list.svg';
import svgGroup from './svg_group.svg';
import svgRank from './svg_rank.svg';
import svgNote from './svg_note.svg';
import svgSetting from './svg_setting.svg';
import svgToken from './svg_token.svg';

const BtnEDU = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        display: 'inline-block', height: '30px', lineHeight: '30px', borderRadius: '16px',
        paddingLeft: '13px', paddingRight: '13px',
        fontSize: '17px', fontWeight: 300,
        border: '2px solid gray',
        config: { duration: 100 }
    })

    return (
        <a href="http://www.euleredu.co.kr/" target="_blank" rel="noreferrer">
            <animated.span onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={ style }>오일러EDU로 이동하기</animated.span>
        </a>
    )
}

const Lay2Item = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        width: '200px', height: '200px', borderRadius: '10px',
        overflow: 'hidden', position: 'relative',
        border: `1px solid ${ props.theme==='light' ? 'rgb(200,200,200)' : 'rgb(60,60,60)' }`,
        boxShadow: `0px 5px 30px 5px rgba(50,50,50,${ isHover ? 0.1 : 0 })`,
        transform: `scale(${ isHover ? 1.01 : 1.0 })`,
        config: { duration: 100 }
    });
    const styleText = {
        position: 'absolute', top: '150px', left: '0px',
        width: '100%', textAlign: 'center',
        fontSize: '17px', fontWeight: 400,
        color: (props.theme==='light' ? 'rgb(30,30,30)' : 'rgb(220,220,220)')
    }
    const styleImg = {
        position: 'absolute', top: '30px', left: '50px',
        width: '100px'
    }
    return (
        <animated.div style={ style } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <img src={ props.icon } style={ styleImg } alt=""/>
            <div style={ styleText }>{ props.children }</div>
        </animated.div>
    )
}

const Main = (props) => {
    const styleTop = {
        background: 'rgba(120,120,160,0.3)',
        overflow: 'hidden', position: 'relative',
        height: '450px'
    }
    const styleTopImg = {
        position: 'absolute', bottom: '0px', right: '0px',
        height: '400px'
    }
    const styleTopTitle = {
        fontSize: '36px', fontWeight: 400,
        color: (props.theme==='light' ? 'rgb(30,30,30)' : 'rgb(220,220,220)')
    }
    const styleTopText = {
        fontSize: '17px', fontWeight: 300, paddingTop: '20px', paddingBottom: '40px',
        color: (props.theme==='light' ? 'rgb(30,30,30)' : 'rgb(220,220,220)')
    }

    const styleLay1 = {
        background: 'rgba(120,120,120,0.1)'
    }
    const styleLay1Img = {
        width: '40px', height: '40px'
    }
    const styleLay1Txt1 = {
        fontSize: '16px', height: '24px', lineHeight: '24px',
        fontWeight: 300, color: (props.theme==='light' ? 'rgb(30,30,30)' : 'rgb(190,190,190)')
    }
    const styleLay1Txt2 = {
        fontSize: '23px', height: '34px', lineHeight: '34px',
        fontWeight: 900, color: 'rgb(120,120,120)'
    }
    const styleLay1Txt3 = {
        fontSize: '16px', height: '23px', lineHeight: '23px',
        fontWeight: 300, color: 'gray', textAlign: 'right'
    }

    const styleLay2 = {
    }

    return (
        <div>
            <Helmet><title>Brain 멤버십 : 오일러OJ</title></Helmet>
            <div style={ styleTop }>
                <img src={ svgBackground } style={ styleTopImg } alt=""/>
                <div className="FRAME_MAIN ND" style={{ paddingTop: /*'100px'*/ '130px' }}>
                    <div style={ styleTopTitle }>Brain 멤버십 - Beta</div>
                    <div style={ styleTopText }>오일러OJ를 더 자유롭게 이용할 수 있습니다.</div>
                    <BtnEDU/>
                </div>
            </div>
            <div style={ styleLay1 }>
                <div className="FRAME_MAIN ND" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '58px', height: '40px' }}>
                            <img src={ svgKey } alt="token" style={ styleLay1Img }/>
                        </div>
                        <div style={{ width: 'calc(100% - 50px)' }}>
                            <div style={ styleLay1Txt1 }>남은 토큰</div>
                            <div style={ styleLay1Txt2 }>5 / 10</div>
                        </div>
                    </div>
                    <div style={ styleLay1Txt3 }>다음 토큰 충전 날짜 : 2022년 2월 1일</div>
                </div>
            </div>
            <div style={ styleLay2 }>
                <div className="FRAME_MAIN ND" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', /*justifyContent: 'space-between'*/ }}>
                        <Link to="/setting/membership/tokenlist">
                            <Lay2Item icon={ svgList } theme={ props.theme }>토큰 사용 내역</Lay2Item>
                        </Link>
                        <Lay2Item icon={ svgGroup } theme={ props.theme }>커뮤니티</Lay2Item>
                        <Link to="/ranking/membership">
                            <Lay2Item icon={ svgRank } theme={ props.theme }>순위</Lay2Item>
                        </Link>
                        <Lay2Item icon={ svgNote } theme={ props.theme }>도움말</Lay2Item>
                    </div>
                </div>
            </div>
            <Footer theme={ props.theme }/>
        </div>
    )
}

export default Main;