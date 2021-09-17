import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Frame = (props) => {
    const style = {
        width: '32%', height: '490px', marginTop: '30px',
        borderRadius: '20px', overflow: 'hidden'
    };
    const styleTitle = {
        fontSize: '25px', fontWeight: 700, marginBottom: '15px',
        color: (props.theme === 'light' ? 'black' : 'white')
    }
    const background = useSpring({
        background: props.theme === 'light' ? 'white' : 'rgb(30,31,32)',
        config: { duration: 100 }
    })

    return (
        <animated.div style={{ ...style, ...background }}>
            <div style={{ paddingLeft: '25px', paddingRight: '25px', paddingTop: '20px' }}>
                <div style={ styleTitle }>
                    { props.title }
                </div>
                { props.children }
            </div>
        </animated.div>
    );
}

export default Frame;