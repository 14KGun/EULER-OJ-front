import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from "@react-spring/web";

import svgMedal1 from './svg_medal1.svg';
import svgMedal2 from './svg_medal2.svg';
import svgMedal3 from './svg_medal3.svg';

const StatusTop = () => {
    const borderLine = '2px solid rgb(0,150,200)';
    return (
        <div className="ND" style={{ borderBottom: borderLine }}/>
    )
}

const Empty = (props) => {

}

const Item = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        height: '60px', borderBottom: '1px solid rgba(100,100,100,0.3)',
        position: 'relative', overflow: 'hidden',
        background: isHover ? 'rgba(160,160,160,0.05)' : 'rgba(160,160,160,0)',
        config: { duration: 100 }
    });
    const styleMedal = {
        position: 'absolute', top: '13px', left: '13px',
        width: '34px', height: '34px'
    }
    const styleProf = {
        position: 'absolute', top: '12px', left: '65px',
        width: '36px', height: '36px', borderRadius: '19px',
        border: '1px solid rgba(100,100,100,0.3)',
        background: 'white', overflow: 'hidden'
    }
    const styleId = {
        position: 'absolute', top: '0px', left: '113px',
        height: '60px', lineHeight: '60px',
        fontSize: '16px', fontWeight: 500,
        color: (props.theme === 'light' ? 'black' : '#ccc')
    }
    const styleLang = {
        position: 'absolute', top: '0px',
        right: '115px', width: '100px', 
        height: '60px', lineHeight: '60px',
        fontSize: '16px', fontWeight: 300, textAlign: 'center',
        color: (props.theme === 'light' ? 'black' : '#ccc')
    }
    const styleValue = {
        position: 'absolute', top: '0px',
        right: '15px', width: '100px', 
        height: '60px', lineHeight: '60px',
        fontSize: '16px', fontWeight: 500, textAlign: 'center',
        color: (props.theme === 'light' ? 'black' : '#ccc')
    }

    let rankLay = null;
    if(props.rank <= 3){
        const icon = [svgMedal1, svgMedal2, svgMedal3][props.rank - 1];
        rankLay = (
            <img src={ icon } style={ styleMedal } alt=""/>
        )
    }

    return (
        <animated.div style={ style }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            { rankLay }
            <img style={ styleProf } src="https://euleroj.io/profile-img/SHRIMP_CHAN.webp" alt="profile"/>
            <div style={ styleId }>supernova</div>
            <div style={ styleLang }>Python3</div>
            <div style={ styleValue }>0.07 초</div>
        </animated.div>
    )
}

const Table = (props) => {
    return (
        <div>
            <StatusTop/>
            <Item rank={ 1 } theme={ props.theme }/>
            <Item rank={ 2 } theme={ props.theme }/>
            <Item rank={ 3 } theme={ props.theme }/>
            <Item rank={ 4 } theme={ props.theme }/>
            <Item rank={ 5 } theme={ props.theme }/>
        </div>
    )
}

export default Table