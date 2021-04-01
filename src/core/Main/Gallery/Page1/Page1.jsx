import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import '../Gallery.css';
import svgScreen from './screen.svg'
import svgP1 from './p1.svg'
import svgP2 from './p2.svg'
import svgS11 from './s1-1.svg'
import svgS12 from './s1-2.svg'
import svgS21 from './s2-1.svg'
import svgS22 from './s2-2.svg'
import svgS31 from './s3-1.svg'
import svgS32 from './s3-2.svg'
import svgS41 from './s4-1.svg'
import svgS42 from './s4-2.svg'
import svgS43 from './s4-3.svg'

const ScgImg = () => {
    const calc = (e) => {
        const target = document.getElementById("gallerypage-1-main");
        const targetWidth = target.offsetWidth, targetHeight = target.offsetHeight;
        const top = target.getBoundingClientRect().top, left = target.getBoundingClientRect().left;
        const x = (e.pageX-left)/targetWidth-0.5, y = (e.pageY-top)/targetHeight-0.5;
        return [x, y, 1];
    }
    const trans = (_xys, t) => `perspective(600px) rotateX(${-_xys[1]*20*t}deg) rotateY(${_xys[0]*20*t}deg) scale(${_xys[2]})`
    const [xys, setXys] = useState([0, 0, 1]);

    const springConfig = { mass: 10, tension: 550, friction: 140 };
    const styleScreen = useSpring({ top: `calc(15% + ${xys[1]*10}px)`, right: `calc(25px - ${xys[0]*10}px)`, height: '60%', transform: trans(xys,1), config: springConfig });
    const styleS11 = useSpring({ top: `calc(45% + ${xys[1]*20}px)`, right: `calc(400px - ${xys[0]*15}px)`, height: '12%', transform: trans(xys,1), config: springConfig });
    const styleS12 = useSpring({ top: `calc(30% + ${xys[1]*20}px)`, right: `calc(20px - ${xys[0]*15}px)`, height: '22%', transform: trans(xys,1.2), config: springConfig });
    const styleS21 = useSpring({ top: `calc(20% + ${xys[1]*30}px)`, right: `calc(460px - ${xys[0]*20}px)`, height: '15%', transform: trans(xys,1.2), config: springConfig });
    const styleS22 = useSpring({ top: `calc(21% + ${xys[1]*30}px)`, right: `calc(180px - ${xys[0]*20}px)`, height: '10%', transform: trans(xys,1.4), config: springConfig });
    const styleS31 = useSpring({ top: `calc(35% + ${xys[1]*40}px)`, right: `calc(300px - ${xys[0]*25}px)`, height: '10%', transform: trans(xys,1.4), config: springConfig });
    const styleS32 = useSpring({ top: `calc(60% + ${xys[1]*40}px)`, right: `calc(40px - ${xys[0]*25}px)`, height: '12%', transform: trans(xys,1.6), config: springConfig });
    const styleS41 = useSpring({ top: `calc(27% + ${xys[1]*50}px)`, right: `calc(350px - ${xys[0]*30}px)`, height: '12%', transform: trans(xys,1.6), config: springConfig });
    const styleS42 = useSpring({ top: `calc(48% + ${xys[1]*50}px)`, right: `calc(0px - ${xys[0]*30}px)`, height: '12%', transform: trans(xys,1.8), config: springConfig });
    const styleS43 = useSpring({ top: `calc(13% + ${xys[1]*50}px)`, right: `calc(20px - ${xys[0]*30}px)`, height: '15%', transform: trans(xys,1.8), config: springConfig });
    const styleP1 = useSpring({ top: `calc(25% + ${xys[1]*50}px)`, right: `calc(140px - ${xys[0]*35}px)`, height: '60%', transform: trans(xys,2), config: springConfig });
    const styleP2 = useSpring({ top: `calc(35% + ${xys[1]*50}px)`, right: `calc(360px - ${xys[0]*40}px)`, height: '60%', transform: trans(xys,2), config: springConfig });
    
    const [isBtnHover, serBtnHover] = useState(false);
    const btnStyle = useSpring({
        background:  isBtnHover ? 'rgb(0,134,191)' : 'rgb(255,255,255)',
        color:  isBtnHover ? 'white' : 'black',
    });
    
    return (
        <div id="gallerypage-1-main" style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }}
        onMouseMove={ (e) => setXys(calc(e)) }>
            <div className="FRAME_MAIN" style={{ height: '100%' }}>
                <animated.img src={ svgScreen } className="gallerypage-1-svg" style={ styleScreen }/>
                <animated.img src={ svgS11 } className="gallerypage-1-svg" style={ styleS11 }/>
                <animated.img src={ svgS12 } className="gallerypage-1-svg" style={ styleS12 }/>
                <animated.img src={ svgS21 } className="gallerypage-1-svg" style={ styleS21 }/>
                <animated.img src={ svgS22 } className="gallerypage-1-svg" style={ styleS22 }/>
                <animated.img src={ svgS31 } className="gallerypage-1-svg" style={ styleS31 }/>
                <animated.img src={ svgS32 } className="gallerypage-1-svg" style={ styleS32 }/>
                <animated.img src={ svgS41 } className="gallerypage-1-svg" style={ styleS41 }/>
                <animated.img src={ svgS42 } className="gallerypage-1-svg" style={ styleS42 }/>
                <animated.img src={ svgS43 } className="gallerypage-1-svg" style={ styleS43 }/>
                <animated.img src={ svgP1 } className="gallerypage-1-svg" style={ styleP1 }/>
                <animated.img src={ svgP2 } className="gallerypage-1-svg" style={ styleP2 }/>

                <div className="gallerypage-1-title">오일러OJ</div>
                <div className="gallerypage-1-subtitle">오일러에서 개발한 온라인 저지 사이트(Online Judge Site)입니다.<br/>다양한 코딩 문제들을 이용해서 폭넓고 깊은 학습을 하세요!</div>
                <a href="/problemset">
                    <animated.div className="gallerypage-1-btn" style={ btnStyle }
                    onMouseEnter={ () => serBtnHover(true) } onMouseLeave={ () => serBtnHover(false) }>이동하기</animated.div>
                </a>
            </div>
        </div>
    );
}
class Page extends Component {
    render() {
        return (
            <div className="gallerypage">
                <div className="gallerypage-1-background"/>
                <ScgImg/>
            </div>
        );
    }
}

export default Page;