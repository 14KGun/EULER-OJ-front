import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import svgPersonGreen from './svg_personGreen.svg';
import svgPersonGray from './svg_personGray.svg';

const ProblemTop = () => {
    const borderLine = '2px solid rgb(0,150,200)';
    const ItemStyle = {
        height: '60px', lineHeight: '60px',
        fontSize: '17px', fontWeight: '700', color: 'rgb(0,150,200)',
        position: 'absolute', top: '0px',
        textAlign: 'center'
    }
    const Item1Style = { left: '20px', width: '78px' };
    const Item2Style = { left: '130px' }; 
    const Item3Style = { right: '20px', width: '80px' };
    const Item4Style = { right: '120px', width: '80px' };
    return (
        <div className="ND" style={{ height: '60px', borderTop: borderLine, borderBottom: borderLine, position: 'relative' }}>
            <div style={{ ...Item1Style, ...ItemStyle }}>#</div>
            <div style={{ ...Item2Style, ...ItemStyle }}>제목</div>
            <div style={{ ...Item3Style, ...ItemStyle }}>제출 횟수</div>
            <div style={{ ...Item4Style, ...ItemStyle }}>맞은 사람</div>
        </div>
    )
}
const ProblemItem = (props) => {
    const Item1Style = {
        float: 'left',
        width: '16px', marginLeft: '20px',
        height: '16px', marginTop: '22px', borderRadius: '8px',
        background: 'rgb(220,220,220)'
    };
    const Item2Style = {
        float: 'left',
        width: 'auto', marginLeft: '20px',
        height: '60px', lineHeight: '60px',
        fontSize: '16px', fontWeight: '300', color: 'rgb(70,70,70)'
    }
    const Item3Style = {
        position: 'absolute', top: '0px', left: '130px',
        height: '60px', overflow: 'hidden',
        width: '200px'
    }
    const Item3TxtStyle = {
        display: 'inline-block',
        height: '60px', lineHeight: '60px',
        fontSize: '16px', fontWeight: '500', color: 'black'
    }
    const Item3ImgStyle = {
        width: '20px', height: '20px',
        verticalAlign: 'middle', paddingBottom: '5px', marginLeft: '2px'
    }
    const Item4Style = {
        float: 'right', width: '80px', height: '60px', position: 'relative', marginRight: '20px'
    }
    const Item4Imgstye = {
        position: 'absolute', top: '22px', left: '0px',
        width: '16px', height: '16px'
    }
    const Item4Txtstye = {
        position: 'absolute', top: '0px', left: '22px',
        height: '60px', lineHeight: '60px'
    }
    
    const [ isHover, setHover ] = useState(false);
    const ItemBackground = useSpring({ background: isHover ? 'rgba(200,200,200,0.2)' : 'rgba(200,200,200,0)', config: { duration: 100 } }).background;

    return (
        <a href="#">
            <animated.div style={{ height: '60px', borderBottom: '1px solid rgba(100,100,100,0.3)', position: 'relative', overflow: 'hidden', background: ItemBackground }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={ Item1Style }></div>
                <div style={ Item2Style }>#1234</div>
                <div style={ Item3Style }>
                    <span style={ Item3TxtStyle }>UFO</span>
                </div>
                <div style={{ ...Item4Style }}>
                    <img style={ Item4Imgstye } src={ svgPersonGray }/>
                    <div style={ Item4Txtstye }>123</div>
                </div>
                <div style={{ ...Item4Style }}>
                    <img style={ Item4Imgstye } src={ svgPersonGreen }/>
                    <div style={ Item4Txtstye }>123</div>
                </div>
            </animated.div>
        </a>
    )
}
class ProblemTable extends Component {
    render() {
        return (
            <>
                <ProblemTop/>
                <ProblemItem/>
            </>
        );
    }
}

export default ProblemTable;