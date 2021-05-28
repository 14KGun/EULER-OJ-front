import React, { Component } from 'react';
import Loading from '../../Frame/Loading/Loading';

class PopupContainer extends Component {
    constructor(props){
        super(props);
        this.style = {
            width: '100%', marginTop: '120px', textAlign: 'center',
            fontSize: '16px', fontWeight: '500', color: 'black'
        };
        this.style2 = {
            width: '100%', textAlign: 'center',
            fontSize: '16px', fontWeight: '500', color: 'black'
        }
    }
    render(){
        return <>
            <div style={{ height: '80px' }}></div>
            <Loading/>
            <div style={ this.style }>채점 대기중...</div>
            <div style={ this.style2 }>0개의 소스가 앞에서 채점 중입니다.</div>
        </>;
    }
}
const PopupBack = (props) => {
    const style = {
        position: 'absolute', top: '0px', left: '0px', width: '100%',
        background: 'rgb(0,0,0,0.8)',
        WebkitBackdropFilter: 'blur(3px)', backdropFilter: 'blur(3px)'
    };
    const stylePopup = {
        maxWidth: '300px', height: '300px', margin: 'auto', borderRadius: '20px',
        background: 'rgb(255,255,255,0.8)'
    };
    return (
        <div id="submitPagePopup" className="ND" style={ style }>
            <div style={{ height: '170px' }}/>
            <div style={ stylePopup }>
                <PopupContainer/>
            </div>
        </div>
    )
}
class ProblemSubmitPopup extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <PopupBack/>
        );
    }
    resizeEvent(){
        const body = document.body, html = document.documentElement;
        const pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const pageHeightBefore = document.getElementById('submitPagePopup').clientHeight;
        if(pageHeightBefore != pageHeight){
            console.log(pageHeight);
            document.getElementById("submitPagePopup").style.height = `${ pageHeight }px`;
        }
    }
    componentDidMount(){
        this.resizeEvent()
        window.addEventListener('resize', this.resizeEvent);
    }
    componentDidUpdate(){
        this.resizeEvent()
        window.addEventListener('resize', this.resizeEvent);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.resizeEvent);
    }
}

export default ProblemSubmitPopup;