import { useState } from 'react';
import { useSpring, animated } from "@react-spring/web";

import svgScreen from './svg_screen.svg';
import svgClose1 from './svg_close1.svg';
import svgClose2 from './svg_close2.svg';

const Screen = (props) => {
    const [isCloseHover, setCloseHover] = useState(false);
    const [text, setText] = useState(props.text);

    const styleSkeleton = {
        position: 'fixed', top: '90px', left: '0px',
        width: '100%', height: `calc(100% - 110px)`, zIndex: 85,
        pointerEvents: props.show ? 'auto' : 'none'
    };
    const style = useSpring({
        width: '100%', height: '100%', overflow: 'hidden', position: 'relative',
        background: (props.theme === 'light' ? 'rgb(255,255,255)' : 'rgb(30,30,30)'),
        borderRadius: '15px',
        border: `1px solid ${ props.theme === 'light' ? 'rgb(220,220,220)' : 'rgb(40,40,40)' }`,
        boxShadow: '0px 0px 20px 10px rgba(30,30,30,0.1)',
        opacity: (props.show ? 1 : 0 ), transform: `scale(${ props.show ? 1.0 : 0.7 })`,
        config: { duration: 200 }
    });
    const styleHeader = {
        width: '100%', height: '50px', overflow: 'hidden',
        background: (props.theme === 'light' ? 'rgb(220,220,220)' : 'rgb(45,45,45)')
    }
    const styleTitle = {
        height: '50px', lineHeight: '50px', paddingLeft: '18px',
        fontSize: '16px', fontWeight: 400,
        color: (props.theme === 'light' ? 'rgb(90,90,90)' : 'rgb(120,120,120)')
    }
    const styleClose = {
        position: 'absolute', top: '13px', right: '13px',
        width: '24px', height: '24px'
    }
    const styleTextarea = {
        width: '100%', height: '100%', padding: '15px', boxSizing: 'border-box',
        background: 'none', border: 'none', outline: 'none', resize: 'none',
        fontSize: '16px', fontWeight: 300, fontFamily: 'D2Coding',
        lineHeight: '140%', letterSpacing: '1.3px',
        color: (props.theme === 'light' ? 'black' : 'white')
    }

    return (
        <div style={ styleSkeleton }>
            <div className="FRAME_MAIN" style={{ height: '100%' }}>
                <animated.div style={ style }>
                    <div style={ styleHeader }>
                        <div style={ styleTitle }>{ props.title }</div>
                        <img style={ styleClose } src={ isCloseHover ? svgClose2 : svgClose1 } alt="close" className="BTNC"
                        onMouseEnter={ () => setCloseHover(true) } onMouseLeave={ () => setCloseHover(false) } onClick={ props.close }/>
                    </div>
                    <div style={{ width: '100%', height: 'calc(100% - 65px)', position: 'relative' }}>
                        <textarea style={ styleTextarea } value={ text } onChange={ (e) => setText(e.target.value) }/>
                    </div>
                </animated.div>
            </div>
        </div>
    )
}

const TxtscreenBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const [showScreen, setScreen] = useState(false);

    const style = useSpring({
        position: 'relative',
        width: isHover ? '80px' : '28px',
        marginTop: '6px', height: '28px',
        borderRadius: '8px', overflow: 'hidden',
        config: { duration: 150 }
    })
    const styleImg = {
        height: '20px', position: 'absolute', top: 'calc(50% - 10px)', left: '4px'
    }
    const styleBack = useSpring({
        height: '28px', lineHeight: '28px', width: '100px',
        position: 'absolute', top: '0px', left: '0px', paddingLeft: '27px',
        fontSize: '13px', fontWeight: 500, letterSpacing: '0px', color: 'gray',
        background: 'rgba(100,100,100,0.2)',
        opacity: isHover ? 1 : 0,
        config: { duration: 200 }
    })

    return (
        <>
            <Screen show={ showScreen } close={ () => setScreen(false) }
            title={ props.title } text={ props.text } theme={ props.theme }/>

            <animated.div style={ style } className="BTNC" onClick={ () => setScreen(true) }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <animated.div style={ styleBack }>넓게보기</animated.div>
                <img src={ svgScreen } style={ styleImg } alt="copy"/>
            </animated.div>
        </>
    )
}

export default TxtscreenBtn;