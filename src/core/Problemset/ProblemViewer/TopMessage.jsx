import React, { Component } from 'react';
import svgWarn from './svg_warn.svg'
import svgMsg from './svg_msg.svg'

class TopMessage extends Component {
    constructor(props){
        super(props);
        this.state = { show: true }
        this.style = {
            width: '100%', paddingTop: '5px', paddingBottom: '5px', marginBottom: '10px',
            position: 'relative', overflow: 'hidden',
            background: 'rgb(247,90,90)', borderRadius: '13px'
        }
        this.styleImg = {
            position: 'absolute', top: '8px', left: '10px', width: '16px', height: '16px'
        }
        this.styleTxt = { fontSize: '15px', color: 'white', marginLeft: '33px', marginRight: '40px' }
        this.styleClose = {
            position: 'absolute', top: '5px', right: '12px',
            fontSize: '15px', color: 'rgb(210,210,210)'
        }
    }
    close(){
        this.setState({ show: false });
    }
    render() {
        if(this.state.show === false) return <></>;

        var imgSrc = undefined;
        var txt = '', background = '';

        if(this.props.type === 'banwarn'){
            imgSrc = svgWarn;
            txt = '이 문제는 제출이 금지되어 있습니다. 다른 문제를 도전해 보는 것은 어떨까요?';
            background = 'rgb(247,90,90)';
        }
        if(this.props.type === 'bookmark'){
            imgSrc = svgMsg;
            txt = '';
        }
        if(this.props.type === 'python3Warning'){
            imgSrc = svgMsg;
            txt = '파이썬 3';
            background = 'rgb(255,201,14)';
        }

        return (
            <div style={{ ...this.style, background: background }} className="ND">
                <img style={ this.styleImg } src={ imgSrc } alt=""/>
                <div style={ this.styleTxt }>{ txt }</div>
                <u style={ this.styleClose } className="BTNC" onClick={ () => this.close() }>닫기</u>
            </div>
        );
    }
}

export default TopMessage;