import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";

import img1 from './img1.png';
import img2 from './img2.png';
import img3 from './img3.png';
import img4 from './img4.png';
import img5 from './img5.png';

const Img1 = () => {
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', postion: 'relative' }}>
            <img src={ img1 } alt="교보문고" style={{ position: 'absolute', top: '41%', left: '50%', width: '140px', transform: 'translate(-50%, -50%)' }}/>
        </div>
    )
}
const Img2 = () => {
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', postion: 'relative' }}>
            <img src={ img2 } alt="YES24" style={{ position: 'absolute', top: '40%', left: '50%', width: '130px', transform: 'translate(-50%, -50%)' }}/>
        </div>
    )
}
const Img3 = () => {
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', postion: 'relative' }}>
            <img src={ img3 } alt="스마트스토어" style={{ position: 'absolute', top: '40%', left: '50%', width: '100px', transform: 'translate(-50%, -50%)' }}/>
        </div>
    )
}
const Img4 = () => {
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', postion: 'relative' }}>
            <img src={ img4 } alt="알라딘" style={{ position: 'absolute', top: '42%', left: '50%', width: '80px', transform: 'translate(-50%, -50%)' }}/>
        </div>
    )
}
const Img5 = () => {
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', postion: 'relative' }}>
            <img src={ img5 } alt="쿠팡" style={{ position: 'absolute', top: '44%', left: '50%', width: '110px', transform: 'translate(-50%, -50%)' }}/>
        </div>
    )
}

const PurchaseLink = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        width: '200px', height: '140px', borderRadius: '12px', position: 'relative',
        border: `1px solid ${ props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(40,40,40)' }`,
        background: (props.theme==='light' ? 'rgb(255,255,255)' : 'rgb(30,30,30)'),
        boxShadow: `0px 5px 20px 2px rgba(50,50,50,${ isHover ? 0.05 : 0 })`,
        transform: `scale(${ isHover ? 1.02 : 1.0 })`,
        config: { duration: 100 }
    })
    const styleText = {
        position: 'absolute', bottom: '10px', right: '10px',
        fontSize: '14px', fontWeight: 300, color: (props.theme==='light' ? 'rgb(120,120,120)' : 'rgb(100,100,100)')
    }
    return (
        <a href={ props.to } target="_blank">
            <animated.div style={ style } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                { props.img }
                <div style={ styleText }>{ props.name }로 이동</div>
            </animated.div>
        </a>
    )
}

const Item1 = (props) => <PurchaseLink theme={ props.theme } name="교보문고" img={ <Img1/> } to="https://search.kyobobook.co.kr/web/search?vPstrKeyWord=%ec%98%a4%ec%9d%bc%eb%9f%acBOOKS&orderClick=LOA&searchPcondition=1&searchPubCd=44125"/>;
const Item2 = (props) => <PurchaseLink theme={ props.theme } name="YES24" img={ <Img2/> } to="http://www.yes24.com/SearchCorner/Search?scode=032&ozsrank=2&company_yn=y&query=%bf%c0%c0%cf%b7%afbooks&domain=all"/>;
const Item3 = (props) => <PurchaseLink theme={ props.theme } name="스마트스토어" img={ <Img3/> } to="https://smartstore.naver.com/eulerbooks"/>;
const Item4 = (props) => <PurchaseLink theme={ props.theme } name="알라딘" img={ <Img4/> } to="https://www.aladin.co.kr/search/wsearchresult.aspx?PublisherSearch=%ec%98%a4%ec%9d%bc%eb%9f%acBOOKS@381478&BranchType=1"/>;
const Item5 = (props) => <PurchaseLink theme={ props.theme } name="쿠팡" img={ <Img5/> } to="https://www.coupang.com/np/search?component=&q=%EC%BD%94%EB%94%A9%EB%A7%88%EB%B2%95%EC%84%9C&channel=user"/>;

export default { Item1, Item2, Item3, Item4, Item5 };