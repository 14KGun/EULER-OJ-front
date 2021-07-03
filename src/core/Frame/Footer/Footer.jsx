import React, { Component } from 'react';
import imgEulerLogoBlack from '../svg_eulerlogo-black.svg';
import imgBtn2 from './img_icon2.png';
import imgBtn3 from './img_icon3.png';
import imgBtn4 from './img_icon4.png';
import imgBtn5 from './img_icon5.png';
import imgBtn6 from './img_icon6.png';
import imgBtn7 from './img_icon7.png';

class Footer extends Component {
    state = { bodyWidth: 0, bodyHeight: 0 }
    constructor(props) {
        super(props);

        this.footerTopStyle = {
            width: '100%', height: '30px',
            background: 'rgba(120,120,120,0.2)'
        }
        this.lay1Style = { height: '85px', position: 'relative' }
        this.logoStyle = { height: '47px', verticalAlign: 'top' }
        this.logoTitleStyle = { fontSize: '34px', fontWeight: '900', height: '70px', marginLeft: '5px' }
        this.copyRightStyle = { fontSize: '13px', fontWeight: '300', color: 'gray', marginTop: '6px' }
        this.minibtnStyle = { height: '30px', borderRadius: '10px', marginLeft: '5px' }
        this.personalRightStyle = { fontSize: '15px', fontWeight: '300', color: 'gray', marginTop: '6px' }
    }
    componentDidMount(){
        this.reposition();
        window.addEventListener('resize', () => this.reposition());
    }
    reposition(){
        const bodyWidth = document.body.clientWidth;
        const bodyHeight = window.innerHeight;

        this.setState({ bodyWidth: bodyWidth });
        this.setState({ bodyHeight: bodyHeight });
    }
    render() {
        return (
            <>
                <div className="ND" style={{ height: '0px' }}/>
                <div className="ND" style={ this.footerTopStyle }/>
                <div id="footer" className="ND" style={{ paddingTop: '50px', paddingBottom: '100px' }}>
                    <div className="FRAME_MAIN">
                        <div style={ this.lay1Style }>
                            <div>
                                <div style={{ display: this.state.bodyWidth > 600 ? 'block' : 'none' }}>
                                    <img style={ this.logoStyle } src={ imgEulerLogoBlack } alt="EULER"/>
                                    <span style={ this.logoTitleStyle }>오일러</span>
                                </div>
                                <div style={{ ...this.copyRightStyle, textAlign: this.state.bodyWidth > 600 ? 'left' : 'center' }}>Copyright ⓒ 2001 EULER. All right reserved.</div>
                            </div>
                            <div style={{ position: this.state.bodyWidth > 600 ? 'absolute' : 'relative',
                            textAlign: this.state.bodyWidth > 600 ? 'right' : 'center',
                            top: '10px', right: '0px' }}>
                                <a href="https://smartstore.naver.com/eulerbooks"><img src={ imgBtn2 } style={ this.minibtnStyle } alt="EULER naver smartstore"/></a>
                                <a href="https://www.youtube.com/channel/UCQQJLCWcgAvrWRdZaxLUXJQ"><img src={ imgBtn3 } style={ this.minibtnStyle } alt="EULER youtube"/></a>
                                <a href="https://www.instagram.com/euler_lab/"><img src={ imgBtn4 } style={ this.minibtnStyle } alt="EULER instagram"/></a>
                                <a href="https://www.facebook.com/euleredu"><img src={ imgBtn5 } style={ this.minibtnStyle } alt="EULER facebook"/></a>
                                <a href="https://band.us/@euler"><img src={ imgBtn6 } style={ this.minibtnStyle } alt="EULER naver band"/></a>
                                <a href="https://blog.naver.com/euleredu"><img src={ imgBtn7 } style={ this.minibtnStyle } alt="EULER naver blog"/></a><br/>
                                <u><a href="/about" style={ this.personalRightStyle }>개인정보처리방침</a></u>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Footer;