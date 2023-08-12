import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSpring, animated } from "@react-spring/web";
import svgUnknown from './svg_unknown.svg';
import Footer from '../../Frame/Footer/Footer';

const BtnBack = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: `rgba(230,230,230,${ isHover ? 1 : 0 })`,
        config: { duration: 150 }
    });
    const style = {
        display: 'inline-block', height: '42px', lineHeight: '42px', marginRight: '10px',
        paddingLeft: '25px', paddingRight: '25px', borderRadius: '23px', border: '2px solid rgb(120,120,120)',
        color: 'rgb(80,80,80)', fontSize: '16px', fontWeight: '300',
    };
    const history = useHistory();
    const onClickEvent = () => { history.goBack() };
    return (
        <animated.span onClick={ onClickEvent } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
        className="BTNC" style={{ ...style, ...background }}>이전 페이지</animated.span>
    )
}
const BtnHome = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? 'rgb(0,120,170)' : 'rgb(0,134,191)',
        config: { duration: 150 }
    });
    const style = {
        display: 'inline-block', height: '46px', lineHeight: '46px',
        paddingLeft: '25px', paddingRight: '25px', borderRadius: '23px',
        color: 'white', fontSize: '16px', fontWeight: '300'
    };
    return (
        <Link to="/">
            <animated.span onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ ...style, ...background }}>메인으로</animated.span>
        </Link>
    )
}
const ProfileUnknown = (props) => {
    return (
        <div>
            <div className="FRAME_MAIN ND" style={{ paddingTop: '100px', textAlign: 'center'}}>
                <img src={ svgUnknown } style={{ maxWidth: '500px', marginBottom: '10px' }} alt=""/>
                <div style={{ fontSize: '30px', fontWeight: 900, lineHeight: '50px', color: 'rgb(52,59,71)' }}>OPPS! Page Not Found</div>
                <div style={{ fontSize: '16px', fontWeight: 300, marginBottom: '30px', color: 'rgb(129,139,156)' }}>해당 사용자는 존재하지 않거나 탈퇴하였습니다.</div>
                    <div><BtnBack/><BtnHome/></div>
            </div>
            <div className="BTM_EMPTY"/>
            <Footer/>
        </div>
    )
}

export default ProfileUnknown;