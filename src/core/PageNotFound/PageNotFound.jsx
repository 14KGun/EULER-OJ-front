import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Footer from '../Frame/Footer'
import svgPNF from './svg_pagenotfound.svg';

const BtnBack = (props) => {
    const style = {
        display: 'inline-block', height: '42px', lineHeight: '42px', marginRight: '10px',
        paddingLeft: '25px', paddingRight: '25px', borderRadius: '23px', border: '2px solid black',
        color: 'black', fontSize: '16px', fontWeight: '300',
    };
    const onClickEvent = () => { window.history.back() };
    return (
        <span onClick={ onClickEvent } className="BTNC" style={{ ...style }}>이전 페이지</span>
    )
}
const BtnHome = (props) => {
    const style = {
        display: 'inline-block', height: '46px', lineHeight: '46px',
        paddingLeft: '25px', paddingRight: '25px', borderRadius: '23px',
        color: 'white', fontSize: '16px', fontWeight: '300',
        background: 'black'
    };
    return (
        <Link to="/">
            <span style={{ ...style }}>메인으로</span>
        </Link>
    )
}
class PageNotFound extends Component {
    constructor(props){
        super(props);
        this.styleImg = { maxWidth: '500px', marginBottom: '10px' }
        this.styleTxt1 = { fontSize: '60px', fontWeight: '900', lineHeight: '50px' }
        this.styleTxt2 = { fontSize: '22px', fontWeight: '600', marginBottom: '10px' }
        this.styleTxt3 = { fontSize: '16px', marginBottom: '30px' }
    }
    render() {
        return (
            <div style={{ paddingTop: '100px' }}>
                <div className="FRAME_MAIN ND" style={{ textAlign: 'center' }}>
                    <img src={ svgPNF } alt="" style={ this.styleImg }/>
                    <div style={ this.styleTxt1 }>404</div>
                    <div style={ this.styleTxt2 }>OPPS! Page Not Found</div>
                    <div style={ this.styleTxt3 }>요청하신 페이지의 주소가 잘못 입력되었거나,<br/>페이지의 주소가 변경/삭제로 인하여 페이지를 찾을 수 없습니다.</div>
                    <div><BtnBack/><BtnHome/></div>
                </div>
                <div className="BTM_EMPTY"/>
                <Footer/>
            </div>
        );
    }
}

export default PageNotFound;