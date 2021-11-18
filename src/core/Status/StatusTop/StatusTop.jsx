import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
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
    const springValue = useSpring({ height: (Math.min(Math.max(height,22),322)-22)/300 }).height;
    
    const scrollevent = () => {
        const _height = document.getElementsByClassName('StatusTopBackground')[0].clientHeight;
        const _width = document.getElementsByClassName('StatusTopBackground')[0].clientWidth;
        console.log(_height);
        if(height !== _height) setHeight(_height);
        if(width !== _width) setWidth(_width);
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollevent);
        scrollevent();
        return () => {
            document.removeEventListener('scroll', scrollevent);
        };
    });

    const style = {
        position: 'relative', width: '100%', height: '100%', overflow: 'hidden'
    }
    const styleItem1 = {
        position: 'absolute', top: '0px', left: '0px', width: '1000px'
    }
    const styleItem2 = {
        position: 'absolute', top: '-100px', left: '0px', width: '1300px'
    }
    const styleItem3 = {
        position: 'absolute', top: `-330px`, left: '0px', width: '1600px'
    }
    const styleItem4 = {
        position: 'absolute', top: '-600px', left: '0px', width: '2000px'
    }
    return (
        <div style={ style } className="StatusTopBackground">
            <img src={ svgItem1 } alt="" style={ styleItem1 }/>
            <img src={ svgItem2 } alt="" style={ styleItem2 }/>
            <img src={ svgItem3 } alt="" style={ styleItem3 }/>
            <img src={ svgItem4 } alt="" style={ styleItem4 }/>
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