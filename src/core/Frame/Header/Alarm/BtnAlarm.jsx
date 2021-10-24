import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import svgAlarmWhite from './svg_alarm_white.svg';
import svgAlarmYellow from './svg_alarm_yellow.svg';
import svgAlarmBlack from './svg_alarm_black.svg';

const ImgAlarm = (props) => {
    const style = {
        position: 'absolute', top: 'calc(50% - 9px)', left: 'calc(50% - 9px)',
        width: '18px', height: '18px'
    }

    let src = svgAlarmWhite;
    if(props.color === 'black') src = svgAlarmBlack;

    return (
        <img src={ src } style={ style } alt="alarm"/>
    )
}
const BtnAlarm = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        background: isHover ? props.background[0] : props.background[1],
        float: 'right', position: 'relative', height: '100%', width: '36px'
    });

    return (
        <animated.div style={ style } className="BTNC" onClick={ () => props.onClick() }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <ImgAlarm color={ props.color }/>
        </animated.div>
    )
}

export default BtnAlarm;