import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import '../Gallery.css';
import imgTitle from './title.png';
import imgMac from './mac.png';
import imgEffect from './effect.svg';

const PageMaker = () => {
    const effect1Style = useSpring({
        loop: true, config: { duration: 20000 },
        from: { top: '0%' },
        to: { top: '100%' },
    });
    const effect2Style = useSpring({
        loop: true, config: { duration: 20000 },
        from: { top: '-100%' },
        to: { top: '0%' },
    });

    const [isBtnHover, serBtnHover] = useState(false);
    const btnStyle = useSpring({
        background:  isBtnHover ? 'rgb(54,54,57)' : 'rgb(94,94,97)'
    });

    return (
        <>
            <animated.img className="gallerypage-2-effect" src={ imgEffect } style={ effect1Style }/>
            <animated.img className="gallerypage-2-effect" src={ imgEffect } style={ effect2Style }/>
            <div className="FRAME_MAIN" style={{ height: '100%' }}>
                <div className="gallerypage-2-board">
                    <div className="gallerypage-2-layleft">
                        <img src={ imgMac }/>
                    </div>
                    <div className="gallerypage-2-layright">
                        <img src={ imgTitle } />
                        <div className="gallerypage-2-txt">오일러EDU는 많은 사람들이 재미있고 더 쉽게 코딩에 다가갈 수 있도록 유튜브 채널과 연결하여 Uncontact 교육을 진행하고 있습니다.</div>
                        <a href="https://www.youtube.com/channel/UCQQJLCWcgAvrWRdZaxLUXJQ">
                            <animated.span className="gallerypage-2-btn" style={ btnStyle }
                            onMouseEnter={ () => serBtnHover(true) } onMouseLeave={ () => serBtnHover(false) }>바로가기</animated.span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
class Page2 extends Component {
    render() {
        return (
            <div className="gallerypage" style={{ background: 'rgb(164,52,56)' }}>
                <PageMaker/>
            </div>
        );
    }
}

export default Page2;