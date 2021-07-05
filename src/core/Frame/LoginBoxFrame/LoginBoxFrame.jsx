import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

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
        return () => {
            window.removeEventListener('resize', resizeEvent);
        }
    });

    const styleLayCenter = {
        width: '450px', height: '500px', margin: 'auto', overflow: 'hidden', position: 'relative',
        background: 'white', borderRadius: '25px'
    }
    const styleLayCenterWidth = useSpring({
        from: getBodyWidth(false, bodyWidth),
        width: getBodyWidth(props.scalable, bodyWidth),
        config: { duration: 400, tension: 1000, mass: 1, precision: 1 }
    });

    return (
        <div style={{ width: '100%', height: '100%', background: 'rgb(235,235,235)' }}>
            <div id="layTop" style={{ height: `${ Math.max(50, (bodyHeight-500)/3) }px` }}/>
            <div id="layMid">
                <animated.div id="layCenter" style={{ ...styleLayCenter, ...styleLayCenterWidth }}>
                    { props.children }
                </animated.div>
            </div>
            <div id="latBtm" style={{ height: '150px' }}/>
        </div>
    )
}

export default LoginBoxFrame;