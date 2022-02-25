import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import Top from '../../Frame/Top/Top';

import svgTrophy from './svg_trophy.svg';
import svgPerson from './svg_person.svg';

const Icon = () => {
    return (
        <div style={{ width: '40px', height: '40px' }}>
            <img src={ svgTrophy } style={{ width: '36px', height: '36px', padding: '2px' }} alt=""/>
        </div>
    )
}

const Background = () => {
    const style = {
        position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
        background: 'rgb(220,210,130)'
    }
    const styleImg = {
        position: 'absolute', bottom: 'calc(50% - 165px)', right: '30px',
        width: '300px'
    }
    
    return (
        <div style={ style }>
            <img src={ svgPerson } alt="" style={ styleImg }/>
        </div>
    )
}

const TopBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? 'rgba(150,150,150,0.1)' : 'rgba(150,150,150,0)',
        config: { duration: 150 }
    });
    const opacity = useSpring({
        opacity : props.selected ? 1 : 0,
        config: { duration: 150 }
    });
    return (
        <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
        style={{ height: '50px', float: 'left', ...background }}>
            <div style={{ height: '46px', lineHeight: '46px', paddingLeft: '14px', paddingRight: '14px',
            fontSize: '17px', fontWeight: 300, color: 'rgb(255,255,255)' }}>{ props.name }</div>
            <animated.div style={{ width: '100%', height: '4px', background: 'rgba(170,120,70,0.5)', ...opacity }}/>
        </animated.div>
    )
}
const TopFixedLay = (props) => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Link to="/contest/list/ongoing">
                <TopBtn name="진행 중인 대회" selected={ props.category === "ongoing" }/>
            </Link>
            <Link to="/contest/list/past">
                <TopBtn name="지난 대회" selected={ props.category === "past" }/>
            </Link>
        </div>
    )
}

const ContestTop = (props) => {
    return (
        <Top icon={ <Icon/> } title="대회" background={ <Background/> }
        fixedLay={ <TopFixedLay category={ props.category }/> }/>
    )
}

export default ContestTop;