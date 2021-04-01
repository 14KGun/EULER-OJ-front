import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import imgEffect from './effect.png';
import imgTitle from './title.png';
import imgBook from './book.png';

const PageMaker = () => {
    const [xy, setXy] = useState([0, 0]);
    const [isHover, setHover] = useState(false);
    const calc = (e) => {
        const target = document.getElementById("gallerypage-3-main");
        const targetWidth = target.offsetWidth, targetHeight = target.offsetHeight;
        const top = target.getBoundingClientRect().top, left = target.getBoundingClientRect().left;
        const x = (e.clientX-left)/targetWidth-0.5, y = (e.clientY-top)/targetHeight-0.5;
        return [x, y]
    }

    const effectStyle = useSpring({
        top: `${(isHover ? -5 : 0) + xy[1]*5}%`,
        left: `${(isHover ? -5 : 0) + xy[0]*5}%`,
        width: isHover ? '115%' : '110%',
        height: isHover ? '115%' : '110%'
    });

    const [isBtnHover, serBtnHover] = useState(false);
    const btnStyle = useSpring({
        background:  isBtnHover ? 'rgb(0,114,171)' : 'rgb(0,134,191)'
    });

    return(
        <div id="gallerypage-3-main" style={{ height: '100%' }}
        onMouseEnter={ () => setHover(true) } onMouseMove={ (e) => setXy(calc(e)) } onMouseLeave={ () => setHover(false) }>
            <animated.img className="gallerypage-3-effect" src={ imgEffect } style={ effectStyle }/>
            <div className="FRAME_MAIN" style={{ height: '100%' }}>
                <img className="gallerypage-3-img" src={ imgBook }/>
                <div className="gallerypage-3-layleft">
                    <img src={ imgTitle }/>
                    <div className="gallerypage-3-title">코딩마법서 1권<br/>STONE VERSION</div>
                    <div className="gallerypage-3-txt">코딩 테스트를 위한 기초 실력을 키워나가는데 최적인 책!<br/>코딩마법서 1권 &lt;STONE VERSION&gt;은 여러분에게 마법과 같은 새로운 해법을 제시해 드립니다.</div>
                    <a href="https://smartstore.naver.com/eulerbooks/products/5080335014">
                        <animated.span className="gallerypage-2-btn" style={ btnStyle }
                        onMouseEnter={ () => serBtnHover(true) } onMouseLeave={ () => serBtnHover(false) }>바로가기</animated.span>
                    </a>
                </div>
            </div>
        </div>
    );
}
class Page3 extends Component {
    render() {
        return (
            <div className="gallerypage" style={{ background: 'rgb(200,200,200)' }}>
                <PageMaker/>
            </div>
        );
    }
}

export default Page3;