import { Component, useState, useEffect } from "react";
import { useSpring, animated } from 'react-spring';
import SpecialAlarm from './AlarmSpecial';
import './Alarm.css'

const PopupItem = (props) => {
    const style = useSpring({
        width: '300px', borderRadius: '10px', marginBottom: '10px', marginLeft: '10px', overflow: 'hidden',
        background: ( props.theme === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(40,40,40,0.6)' ),
        WebkitBackdropFilter: 'blur(6px)', backdropFilter: 'blur(6px)',
        border: `1px solid rgba(120,120,120,0.4)`, boxSizing: 'border-box',
        boxShadow: '0px 0px 6px 4px rgba(0,0,0,0.1)'
    });

    const progress = (props.progress ? props.progress : 0);
    const styleProgress = useSpring({
        position: 'absolute', bottom: '0px', left: '0px',
        width: `${ progress * 100 }%`, height: '3px',
        background: 'rgb(0,134,191)'
    });

    const defalutProps = { theme: props.theme, onClose: props.onClose }
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
        position: 'absolute', top: '0px', width: '320px', height: '100%', paddingTop: '10px',
        right: props.moveLeft ? '310px' : '0px', overflow: 'visible', overflowY: 'scroll',
        opacity: props.visible ? 1 : 0
    });
    const onClose = (index) => {
        const array = [];
        for(var i=0; i<index; i++) array.push(props.list[i]);
        for(var i=index+1; i<props.list.length; i++) array.push(props.list[i]);
        console.log(array);
        props.setList(array);
    }

    return (
        <animated.div className="header-alarm-border" style={ styleBorder }>
            <div id="header-alarm-container" style={{ pointerEvents: props.visible ? 'auto' : 'none' }}>
                { props.list.map((item, index) => <PopupItem theme={ props.theme } key={ index } onClose={ () => onClose(index) } { ...item }/>) }
                <div style={{ height: '10px' }}/>
            </div>
        </animated.div>
    )
}

class PopupWrap extends Component {
    constructor(props){
        super(props);
        this.style = {
            position: 'fixed', top: '70px', right: '0px', zIndex: '90',
            width: '300px', overflow: 'visible', pointerEvents: 'none'
        }
    }
    render(){
        const width = (this.props.moveLeft ? '300px' : '610px');
        return (
            <div id="header-alarm-wrap" style={{ ...this.style, width: width }}>
                <Popup list={ this.props.list } setList={ this.props.setList }
                theme={ this.props.theme } moveLeft={ this.props.moveLeft } visible={ this.props.visible }/>
            </div>
        )
    }
    resizeEvent(){
        let height = document.body.clientHeight - 70;
        const container = document.getElementById('header-alarm-container');
        const border = document.getElementsByClassName('header-alarm-border');
        if(container) height = Math.min(height, container.clientHeight+10);
        
        const wrap = document.getElementById('header-alarm-wrap');
        if(wrap) wrap.style.height = `${ height }px`;

        if(border && container){
            border[0].style.pointerEvents = (border[0].clientHeight < container.clientHeight ? 'auto' : 'none');
        }
    }
    componentDidMount(){
        this.resizeEvent();
        window.addEventListener('resize', this.resizeEvent);
    }
    componentDidUpdate(){
        this.resizeEvent();
        window.addEventListener('resize', this.resizeEvent);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.resizeEvent);
    }
}

export default PopupWrap;