import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Title = (props) => {
    return (
        <div style={{ position: 'relative', marginBottom: '10px' }}>
            <img src={ props.icon } alt="" style={{ position: 'absolute', top: '0px', left: '0px', width: '35px', height: '35px' }}/>
            <div style={{
                marginLeft: '42px', fontSize: '20px', fontWeight: 500, lineHeight: '35px',
                color: (props.theme==='light' ? 'rgb(80,80,80)' : 'rgb(170,170,170)')
            }}>{ props.children }</div>
        </div>
    )
}

const Content = (props) => {
    return (
        <div style={{ fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white') }}>
            { props.children }
        </div>
    )
}

const Input = (props) => {
    const [isFocus, setFocus] = useState(false);
    const borderFocus = 'gray';
    const borderDefault = 'rgb(200,200,200)';
    const border = useSpring({
        border: `2px solid ${ isFocus ? borderFocus : borderDefault }`
    }).border

    return (
        <animated.div style={{ paddingBottom: '5px', paddingTop: '5px', borderBottom: border, maxWidth: '600px' }}>
            <input type={ props.type } onFocus={ () => setFocus(true) } onBlur={ () => setFocus(false) }
            style={{ width: 'calc(100% - 14px)', border: 'none', outline: 'none', paddingLeft: '7px', paddingRight: '7px', background: 'none', fontSize: '16px' }}/>
        </animated.div>
    )
}

const Switch = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        width: '40px', height: '20px', borderRadius: '10px',
        overflow: 'hidden', position: 'relative'
    }
    const styleBgd = {
        position: 'absolute', top: '0px', left: '0px',
        width: '100%', height: '100%'
    }
    const styleToken = {
        position: 'absolute', width: '14px', height: '14px', borderRadius: '7px', top: '3px'
    }

    const background0 = useSpring({
        background: props.theme==='light' ? props.background.light0 : props.background.dark0
    });
    const background1 = useSpring({
        background: props.theme==='light' ? props.background.light1 : props.background.dark1
    });
    const backgroundToken = useSpring({
        background: props.theme==='light' ? props.background.lightT : props.background.darkT
    });

    const getLeft = () => {
        if(props.value==="on" && isHover) return 0.85;
        if(props.value==="on") return 1;
        if(props.value==="off" && isHover) return 0.15;
        if(props.value==="off") return 0;
        return 0.5;
    }
    const left = useSpring({
        left: `${ getLeft()*20 + 3 }px`
    })
    const opacity1 = useSpring({
        opacity: getLeft() <= 0.5 ? 1 : 0
    })
    const opacity2 = useSpring({
        opacity: getLeft() > 0.5 ? 1 : 0
    })

    const onClick = () => {
        if(props.value==="on") props.onChange('off');
        if(props.value==="off") props.onChange('on');
    }

    return (
        <div style={ style } className="BTNC" onClick={ () => onClick() }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <animated.div style={{ ...styleBgd, ...background0, ...opacity1 }}/>
            <animated.div style={{ ...styleBgd, ...background1, ...opacity2 }}/>
            <animated.div style={{ ...styleToken, ...backgroundToken, ...left }}/>
        </div>
    )
}
Switch.defaultProps = {
    background: {
        light0: 'rgb(220,220,220)', light1: 'rgb(77,216,99)', lightT: 'white',
        dark0: 'rgb(50,50,50)', dark1: 'rgb(50,150,50)', darkT: 'black'
    },
    onChange: () => {}
}

const Margin = () => {
    return <div style={{ height: '50px' }}/>
}

const res = { Title, Content, Input, Switch, Margin };
export default res;