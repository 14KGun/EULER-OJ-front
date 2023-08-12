import React, { Component } from 'react';
import { useSpring, animated } from "@react-spring/web";

const LoadingMaker = () => {
    const ItemStyle = {
        position: 'absolute',
        width: '20px', height: '20px', borderRadius: '10px',
        background: 'orange'
    }
    const topSpring = useSpring({
        loop: true, config: { duration: 1200 },
        from: { top: 0 },
        to: { top: 80 }
    });
    const eachItemSpring = (yBefore, index) => {
        const yAfter = (yBefore + index*(80/8))%80;
        const topBefore = yAfter<=40 ? yAfter : 80-yAfter;
        const sig = (Math.cos(topBefore*Math.PI/40) + 1)/2;
        return sig*sig*40;
    }

    //console.log({...Item1Style});

    return (
        <div style={{ position: 'relative', margin: 'auto', width: '80px' }}>
            <animated.div style={{ ...ItemStyle, top: topSpring.top.to(top => eachItemSpring(top, 2)), left: '0px' }}></animated.div>
            <animated.div style={{ ...ItemStyle, top: topSpring.top.to(top => eachItemSpring(top, 1)), left: '30px' }}></animated.div>
            <animated.div style={{ ...ItemStyle, top: topSpring.top.to(top => eachItemSpring(top, 0)), left: '60px' }}></animated.div>
        </div>
    );
}
class Loading extends Component {
    render() {
        return (
            <div><LoadingMaker/></div>
        );
    }
}

export default Loading;