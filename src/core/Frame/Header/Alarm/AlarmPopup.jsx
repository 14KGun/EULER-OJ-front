import { Component, useState } from "react";
import { useSpring, animated } from 'react-spring';
import SpecialAlarm from './AlarmSpecial';

const PopupItem = (props) => {
    const style = useSpring({
        width: '100%', borderRadius: '10px', marginBottom: '10px', overflow: 'hidden',
        background: ( 'rgba(255,255,255,0.6)' ),
        WebkitBackdropFilter: 'blur(6px)', backdropFilter: 'blur(6px)',
        border: `1px solid rgba(120,120,120,0.4)`
    })

    return (
        <animated.div style={ style }>
            <SpecialAlarm.Cookie/>
        </animated.div>
    )
}

const Popup = (props) => {
    const styleBorder = useSpring({
        position: 'absolute', top: '0px', width: '300px', height: '100%',
        right: props.moveLeft ? '310px' : '0px', overflow: 'hidden'
    })

    return (
        <animated.div style={ styleBorder }>
            <PopupItem theme={ props.theme }/>
            <PopupItem theme={ props.theme }/>
        </animated.div>
    )
}

class PopupWrap extends Component {
    constructor(props){
        super(props);
        this.style = {
            position: 'fixed', top: '80px', right: '10px', zIndex: '90',
            width: '610px', overflow: 'hidden'
        }
        this.state = { height: '600px' }
    }
    render(){
        return (
            <div style={{ ...this.style, height: this.state.height }}>
                <Popup theme={ this.props.theme } moveLeft={ this.props.moveLeft }/>
            </div>
        )
    }
}

export default PopupWrap;