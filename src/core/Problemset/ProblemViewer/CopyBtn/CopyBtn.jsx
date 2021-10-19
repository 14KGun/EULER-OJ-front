import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import svgCopy from './svg_copy.svg';

const CopyBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const onMouseEnter = () => {
        setHover(true);
    }
    const onMouseLeave = () => {
        setHover(false);
    }
    const onCopy = (text, result) => {
    }
    const style = useSpring({
        background: isHover ? 'rgb(145,145,145)' : 'rgb(165,165,165)',
        config: { duration: 100 }
    })

    return (
        <>
            <CopyToClipboard text={ props.text } onCopy={ onCopy }>
                <animated.div style={ style }
                onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave }>
                    <img src={ svgCopy } alt="copy"/>
                </animated.div>
            </CopyToClipboard>
        </>
    );
}

export default CopyBtn;