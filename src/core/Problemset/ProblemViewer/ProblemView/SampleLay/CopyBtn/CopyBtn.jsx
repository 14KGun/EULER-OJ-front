import { useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useSpring, animated } from "@react-spring/web";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import svgCopy from './svg_copy.svg';

const CopyBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const [isCopy, setCopy] = useStateWithCallbackLazy(null);

    const onCopy = () => {
        const pushedTime = new Date();
        setCopy(pushedTime, x => {
            setTimeout(() => setCopy(pushedTime-1), 800);
        });
    }
    const getBackground = () => {
        const current = new Date();
        if(current - isCopy < 400) return ['rgba(0,150,0,0.8)', '복사됨', 'rgb(220,220,220)'];
        return ['rgba(100,100,100,0.2)', '복사하기', 'rgb(120,120,120)'];
    }
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
        fontSize: '13px', fontWeight: 500, letterSpacing: '0px', color: getBackground()[2],
        background: getBackground()[0],
        opacity: isHover ? 1 : 0,
        config: { duration: 200 }
    })

    return (
        <CopyToClipboard text={ props.text } onCopy={ onCopy }>
            <animated.div style={ style } className="BTNC"
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <animated.div style={ styleBack }>{ getBackground()[1] }</animated.div>
                <img src={ svgCopy } style={ styleImg } alt="copy"/>
            </animated.div>
        </CopyToClipboard>
    );
}

export default CopyBtn;