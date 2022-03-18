import { useRef } from 'react';
import { animated, useSpring } from 'react-spring';

const Tooltip = (props) => {
    const base = useRef();
    const me = useRef();

    let px = 0, py = 0;
    if(props.target.current && base.current && me.current){
        const targetOffset = props.target.current.getBoundingClientRect();
        const baseOffset = base.current.getBoundingClientRect();
        const meOffset = me.current.getBoundingClientRect();

        if(props.position === 'top'){
            px = targetOffset.x - baseOffset.x + targetOffset.width/2 - meOffset.width/2;
            py = targetOffset.y - baseOffset.y - meOffset.height - 7;
        }
        if(props.position === 'left'){
            px = targetOffset.x - baseOffset.x - meOffset.width - 7;
            py = targetOffset.y - baseOffset.y + targetOffset.height/2 - meOffset.height/2;
        }
    }

    const styleR = {
        position: 'absolute',
        top: `${ py }px`, left: `${ px }px`,
    }
    const style = useSpring({
        paddingLeft: '10px', paddingRight: '10px',
        paddingTop: '5px', paddingBottom: '5px',
        background: props.background, borderRadius: '8px',
        color: props.color,
        fontSize: '15px', fontWeight: 300,
        opacity: props.show ? 1 : 0,
        pointerEvents: props.show ? 'auto' : 'none',
        config: { duration: 200 }
    });

    return (
        <>
            <div style={{ position: 'absolute', top: '0px', left: '0px' }} ref={ base }/>
            <animated.div style={{ ...style, ...styleR }} ref={ me }>
                { props.children }
            </animated.div>
        </>
    )
}
Tooltip.defaultProps = {
    position: 'top',
    background: 'rgba(0,0,0,0.6)',
    color: 'white'
}

export default Tooltip;