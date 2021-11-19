import { useState, useEffect } from 'react';
import { useSpring, animated, to } from 'react-spring';
import Top from '../../Frame/Top/Top';
import './StatusTop.css';

import svgItem1 from './svg_1.svg';
import svgItem2 from './svg_2.svg';
import svgItem3 from './svg_3.svg';
import svgItem4 from './svg_4.svg';

const Icon = () => {
    return <div></div>
}
const TopBackground = () => {
    const [height, setHeight] = useState(322);
    const [width, setWidth] = useState(0);
    const springValue = useSpring({ height: (Math.min(Math.max(height,50),322)-50)/272 }).height;
    const springWidth = useSpring({ width: Math.min(width,2300), config: { mass: 1, tension: 280, friction: 60 } }).width;
    
    const scrollevent = () => {
        const _height = document.getElementsByClassName('StatusTopBackground')[0].clientHeight;
        const _width = document.getElementsByClassName('StatusTopBackground')[0].clientWidth;
        if(height !== _height) setHeight(_height);
        if(width !== _width) setWidth(_width);
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollevent);
        window.addEventListener('resize', scrollevent);
        scrollevent();
        return () => {
            document.removeEventListener('scroll', scrollevent);
            window.removeEventListener('resize', scrollevent);
        };
    });

    const style = {
        position: 'relative', width: '100%', height: '100%', overflow: 'hidden'
    }
    const styleItem1 = {
        position: 'absolute', top: '-100px', width: '1000px',
        left: to([springWidth, springValue], (x, y) => `${ -((2300-x)*0.7+(1-y)*1000) }px`)
    }
    const styleItem2 = {
        position: 'absolute', top: '-180px', left: '0px', width: '1300px',
        left: to([springWidth, springValue], (x, y) => `${ -((2300-x)*0.5+(1-y)*800) }px`)
    }
    const styleItem3 = {
        position: 'absolute', top: `-330px`, left: '0px', width: '1600px',
        left: to([springWidth, springValue], (x, y) => `${ -((2300-x)*0.3+(1-y)*600) }px`)
    }
    const styleItem4 = {
        position: 'absolute', top: '-600px', left: '0px', width: '2000px',
        left: to([springWidth, springValue], (x, y) => `${ -((2300-x)*0.1+(1-y)*400) }px`)
    }
    return (
        <div style={ style } className="StatusTopBackground">
            <animated.img src={ svgItem1 } alt="" style={{ ...styleItem1 }}/>
            <animated.img src={ svgItem2 } alt="" style={{ ...styleItem2 }}/>
            <animated.img src={ svgItem3 } alt="" style={{ ...styleItem3 }}/>
            <animated.img src={ svgItem4 } alt="" style={{ ...styleItem4 }}/>
        </div>
    )
}
const TopFixedLay = (props) => {
    return <div></div>
}
const StatusTop = (props) => {
    return (
        <Top icon={ <Icon/> } title="채점" background={ <TopBackground/> }
        fixedLay={ <TopFixedLay/> }/>
    )
}

export default StatusTop;