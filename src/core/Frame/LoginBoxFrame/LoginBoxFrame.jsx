import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import svgBackground01 from './svg_background1.svg';

const getBodyWidth = (scalable, bodyWidth) => {
    const margin = 40;
    const defaultWidth = `${ Math.min(450, bodyWidth-margin) }px`;
    const fullWidth = `900px`;

    if(bodyWidth-margin < 900) return defaultWidth;
    if(scalable) return fullWidth;
    return defaultWidth;
}
const LoginBoxFrame = (props) => {
    const [bodyWidth, setBodyWidth] = useState(document.body.clientWidth);
    const [bodyHeight, setBodyHeight] = useState(document.body.clientHeight);
    const resizeEvent = () => {
        const _bodyWidth = document.body.clientWidth;
        const _bodyHeight = document.body.clientHeight;
        if(bodyWidth!=_bodyWidth) setBodyWidth(_bodyWidth);
        if(bodyHeight!=_bodyHeight) setBodyHeight(_bodyHeight);
    }
    useEffect(() => {
        window.addEventListener('resize', resizeEvent);
        document.getElementById("root").style.height = "100%";
        return () => {
            window.removeEventListener('resize', resizeEvent);
            document.getElementById("root").style.height = "auto";
        }
    });

    const styleLayCenter = {
        width: '450px', height: '500px', margin: 'auto', overflow: 'hidden', position: 'relative',
        background: 'white', borderRadius: '25px', zIndex: '20'
    }
    const styleLayCenterWidth = useSpring({
        from: getBodyWidth(false, bodyWidth),
        width: getBodyWidth(props.scalable, bodyWidth),
        config: { mass: 1.0, tension: 100, friction: 20.0, precision: 0.01, velocity: 0.0 }
    });
    const styleBackground = {
        width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0px',
        objectFit: 'cover', zIndex: '0'
    };
    const styleBackgroundOpacity = useSpring({
        from: { opacity: 0 },
        opacity: props.background==="img1" ? 1 : 0,
        config: { duration: 400 }
    });

    return (
        <div style={{ width: '100%', height: 'max(100%, 725px)', background: 'rgb(235,235,235)', position: 'relative' }}>
            <div id="layTop" style={{ height: `${ Math.max(50, (bodyHeight-500)/3) }px` }}/>
            <div id="layMid">
                <animated.div id="layCenter" style={{ ...styleLayCenter, ...styleLayCenterWidth }}>
                    { props.children }
                </animated.div>
            </div>
            <div id="latBtm" style={{ height: '150px' }}/>
            <animated.img src={ svgBackground01 } style={{ ...styleBackground, ...styleBackgroundOpacity }}/>
        </div>
    )
}

export default LoginBoxFrame;