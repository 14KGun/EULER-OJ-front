import { useState } from 'react';
import { useSpring, animated } from "@react-spring/web";
import { Helmet } from "react-helmet";

import imgTitle from './title.png';
import imgBook from './book.png';

const Space = () => {
    return (
        <div style={{ position: 'absolute', width: '100%', height: '500px', overflow: 'hidden' }}>
            <canvas id="gallerypage-4-space"/>
            <Helmet>
                <script>{ `
                    window.requestAnimFrame = ( function(){ return window.requestAnimationFrame } )();
                    var canvas = document.getElementById("gallerypage-4-space");
                    var c = canvas.getContext("2d");
        
                    var numStars = 1900;
                    var radius = '0.'+Math.floor(Math.random() * 9) + 1  ;
                    var focalLength = canvas.width *2;
                    var centerX, centerY;
                    
                    var stars = [], star;
                    var i;
        
                    initializeStars();
                    function executeFrame(){ requestAnimFrame(executeFrame);moveStars();drawStars(); }
                    function initializeStars(){
                        centerX=canvas.width/2; centerY=canvas.height/2;
                        stars = [];
                        for(i = 0; i < numStars; i++){
                            star = { x: Math.random()*canvas.width, y: Math.random()*canvas.height, z: Math.random()*canvas.width, o: '0.'+Math.floor(Math.random()*99)+1 };
                            stars.push(star);
                        }
                    }
                    function moveStars(){
                        for(i = 0; i < numStars; i++){
                            star = stars[i]; star.z--;
                            if(star.z <= 0) star.z = canvas.width;
                        }
                    }
                    function drawStars(){
                        var pixelX, pixelY, pixelRadius;
                        if(canvas.width != window.innerWidth || canvas.width != window.innerWidth){
                            canvas.width = window.innerWidth; canvas.height = 500; initializeStars();
                        }
                        const grd = c.createLinearGradient(0,0,0,canvas.height);
                        grd.addColorStop(0, '#309953');
                        grd.addColorStop(1, '#11998e');
                        c.fillStyle = grd;
                        c.fillRect(0,0, canvas.width, canvas.height);
                        for(i = 0; i < numStars; i++){
                            star = stars[i];
                            pixelX = (star.x - centerX) * (focalLength / star.z);
                            pixelX += centerX;
                            pixelY = (star.y - centerY) * (focalLength / star.z);
                            pixelY += centerY;
                            pixelRadius = 1 * (focalLength / star.z);
                            c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
                            c.fillStyle = "rgba(209, 255, 255, "+star.o+")";
                        }
                    }
                    executeFrame();`
                }</script>
            </Helmet>
        </div>
    )
}
const BtnGo = () => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        height: '30px', lineHeight: '30px', paddingLeft: '18px', paddingRight: '18px',
        border: '3px solid white', borderRadius: '18px',
        fontSize: '16px', fontWeight: 500, color: 'white',
        display: 'inline-block',
        background: `rgba(100,190,120,${ isHover ? 0.5 : 0 })`,
        config: { duration: 100 }
    })

    return (
        <a href="https://smartstore.naver.com/eulerbooks/products/6291557992" target="_blank" rel="noreferrer">
            <animated.span style={ style }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                확인하러 가기
            </animated.span>
        </a>
    )
}
const Page = () => {
    const styleText1 = {
        fontSize: '36px', fontWeight: 900, color: 'rgba(255,255,255,0.9)'
    }
    const styleText3 = {
        fontSize: '16px', fontWeight: 300, color: 'rgb(150,220,200)'
    }
    const styleText4 = {
        fontSize: '16px', fontWeight: 300, color: 'rgb(150,220,200)'
    }
    const styleBook = {
        position: 'absolute', right: '-90px', bottom: '-100px',
        width: '680px'
    }
    return (
        <div style={{ width: '100%', height: '500px' }} className="gallerypage-4-background">
            <Space/>
            <div style={{ height: '500px', position: 'relative' }} className="FRAME_MAIN">
                <img src={ imgBook } alt="" style={ styleBook }/>
                <div style={{ position: 'absolute', top: '160px', left: '0px' }}>
                    <img src={ imgTitle } alt="오일러 BOOKS" style={{ height: '22px' }}/>
                    <div style={ styleText1 }>코딩마법서 C/C++ 2권 IRON</div>
                    <div style={ styleText3 }>코딩 테스트를 위한 기초 실력을 키워나가는 최적인 책!</div>
                    <div style={ styleText4 }>코딩마법서 C/C++ IRON이 드디어 출시하였습니다.</div>
                    <div style={{ height: '20px' }}/>
                    <BtnGo/>
                </div>
            </div>
        </div>
    )
}

export default Page;