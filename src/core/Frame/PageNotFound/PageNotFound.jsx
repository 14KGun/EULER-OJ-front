import React, { Component, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Footer from '../Footer/Footer'
import svgPNF from './svg_pagenotfound.svg';

const BtnBack = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: `rgba(230,230,230,${ isHover ? 1 : 0 })`,
        config: { duration: 150 }
    });
    const style = {
        display: 'inline-block', height: '42px', lineHeight: '42px', marginRight: '10px',
        paddingLeft: '25px', paddingRight: '25px', borderRadius: '23px', border: '2px solid rgb(120,120,120)',
        color: 'rgb(80,80,80)', fontSize: '16px', fontWeight: '300',
    };
    const history = useHistory();
    const onClickEvent = () => { history.goBack() };
    return (
        <animated.span onClick={ onClickEvent } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
        className="BTNC" style={{ ...style, ...background }}>이전 페이지</animated.span>
    )
}
const BtnHome = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? 'rgb(0,120,170)' : 'rgb(0,134,191)',
        config: { duration: 150 }
    });
    const style = {
        display: 'inline-block', height: '46px', lineHeight: '46px',
        paddingLeft: '25px', paddingRight: '25px', borderRadius: '23px',
        color: 'white', fontSize: '16px', fontWeight: '300'
    };
    return (
        <Link to="/">
            <animated.span onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ ...style, ...background }}>메인으로</animated.span>
        </Link>
    )
}
class PageNotFound extends Component {
    constructor(props){
        super(props);
        this.styleImg = { maxWidth: '500px', marginBottom: '10px' }
        this.styleTxt1 = { fontSize: '60px', fontWeight: '900', lineHeight: '50px', color: 'rgb(52,59,71)' }
        this.styleTxt2 = { fontSize: '22px', fontWeight: '600', marginBottom: '10px', color: 'rgb(52,59,71)' }
        this.styleTxt3 = { fontSize: '16px', fontWeight: '300', marginBottom: '30px', color: 'rgb(129,139,156)' }
    }
    render() {
        return (
            <div style={{ paddingTop: '100px' }}>
                <div className="FRAME_MAIN ND" style={{ textAlign: 'center' }}>
                    <img src={ svgPNF } alt="" style={ this.styleImg }/>
                    <div style={ this.styleTxt1 }>404</div>
                    <div style={ this.styleTxt2 }>OPPS! Page Not Found</div>
                    <div style={ this.styleTxt3 } dangerouslySetInnerHTML={ {__html: this.props.msg} }/>
                    <div><BtnBack/><BtnHome/></div>
                </div>
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

PageNotFound.defaultProps = {
    theme: 'light',
    msg: '요청하신 페이지의 주소가 잘못 입력되었거나,<br>페이지의 주소가 변경/삭제로 인하여 페이지를 찾을 수 없습니다.'
}

export default PageNotFound;