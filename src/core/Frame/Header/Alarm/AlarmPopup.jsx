import { Component, useState } from "react";
import { useSpring, animated } from 'react-spring';
import SpecialAlarm from './AlarmSpecial';

const PopupItem = (props) => {
    const style = useSpring({
        width: '100%', borderRadius: '10px', marginBottom: '10px', overflow: 'hidden',
        background: ( props.theme === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(40,40,40,0.6)' ),
        WebkitBackdropFilter: 'blur(6px)', backdropFilter: 'blur(6px)',
        border: `1px solid rgba(120,120,120,0.4)`, boxSizing: 'border-box'
    });

    const progress = (props.progress ? props.progress : 0);
    const styleProgress = useSpring({
        position: 'absolute', bottom: '0px', left: '0px',
        width: `${ progress * 100 }%`, height: '3px',
        background: 'rgb(0,134,191)'
    });

    const onClose = () => {

    }

    const defalutProps = { theme: props.theme, onClose: onClose }
    let container = '';
    if(props.type === 'cookie') container = <SpecialAlarm.Cookie { ...defalutProps }/>;
    else if(props.type === 'scoring') container = <SpecialAlarm.Scoring { ...defalutProps }/>;
    else if(props.type === 'trophy') container = <SpecialAlarm.Trophy { ...defalutProps }/>;

    return (
        <animated.div style={ style }>
            { container }
            <animated.div style={ styleProgress }/>
        </animated.div>
    )
}

const Popup = (props) => {
    const styleBorder = useSpring({
        position: 'absolute', top: '0px', width: '300px', height: '100%',
        right: props.moveLeft ? '310px' : '0px', overflow: 'hidden', overflowY: 'scroll'
    })

    return (
        <animated.div style={ styleBorder }>
            <PopupItem theme={ props.theme } type="cookie"/>
            <PopupItem theme={ props.theme } type="trophy"/>
        </animated.div>
    )
}

class PopupWrap extends Component {
    constructor(props){
        super(props);
        this.style = {
            position: 'fixed', top: '80px', right: '10px', zIndex: '90',
            width: '610px', //pointerEvents: 'auto'
        }
        this.state = { height: '600px' }
    }
    render(){
        const width = (this.props.moveLeft ? '6100px' : '300px');
        return (
            <div style={{ ...this.style, height: this.state.height, width: width }}>
                <Popup theme={ this.props.theme } moveLeft={ this.props.moveLeft }/>
            </div>
        )
    }
}

export default PopupWrap;