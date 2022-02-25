import { Component, useState } from "react";
import { animated, useSpring } from 'react-spring';
import { Helmet } from "react-helmet";
import Top from '../ProblemsetTop';
import Footer from '../../../Frame/Footer/Footer';
import Loading from '../../../Frame/Loading/Loading';
import ProblemTable from '../../ProblemTable';
import axios from '../../../Tool/axios';
import problemHistory from '../../../Tool/problemHistory';

import svgCookie from './svg_cookie.svg';
import svgDelete from './svg_delete.svg';
import svgPower from './svg_power.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>기록 확인하는 중...</div>
        </div>
    )
}
const CookieHelp = (props) => {
    const style = useSpring({
        position: 'relative', borderRadius: '15px', overflow: 'hidden',
        background: props.theme === 'light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'
    })
    const styleTitle = {
        paddingBottom: '5px',
        fontSize: '19px', fontWeight: 600,
        color: (props.theme === 'light' ? 'black' : 'white')
    }
    const styleTxt = {
        fontSize: '16px', fontWeight: 300,
        color: (props.theme === 'light' ? 'black' : 'white')
    }

    const [isHover1, setHover1] = useState(false);
    const [isHover2, setHover2] = useState(false);
    const styleBtn = {
        height: '30px', lineHeight: '30px', paddingLeft: '7px', paddingRight: '7px',
        background: 'rgba(120,120,120,0.1)', borderRadius: '8px',
        fontSize: '16px', fontWeight: 300, color: (props.theme === 'light' ? 'rgb(50,50,50)' : 'rgb(200,200,200)')
    }
    const styleBtnImg = {
        height: '22px', verticalAlign: 'top', marginTop: '4px', marginRight: '1px'
    }
    const styleBtn1 = useSpring({
        background: `rgba(120,120,120,${ isHover1 ? 0.17 : 0.1 })`,
        config: { duration: 100 }
    })
    const styleBtn2 = useSpring({
        background: `rgba(120,120,120,${ isHover2 ? 0.17 : 0.1 })`,
        config: { duration: 100 }
    })
    const setActive = () => {
        problemHistory.setActive(!props.isActive);
        props.reload();
    }
    const removeAll = () => {
        problemHistory.removeAll();
        props.reload();
    }

    const activeText = (props.isActive ? '기록 비활성화' : '기록 활성화');

    return (
        <animated.div style={ style }>
            <div style={{ display: 'flex', gap: '20px', paddingTop: '15px', paddingLeft: '15px', paddingRight: '15px' }}>
                <img src={ svgCookie } alt="cookie" style={{ width: '120px', height: '120px' }}/>
                <div style={{ width: 'calc(100% - 140px)' }}>
                    <div style={ styleTitle }>최근 방문기록</div>
                    <div style={ styleTxt }>최근 방문기록은 웹브라우저의 쿠키에 저장됩니다.</div>
                    <div style={ styleTxt }>최근에 방문한 최대 50개의 문제들을 확인할 수 있습니다.</div>
                    <div style={ styleTxt }>기록을 비활성화 하거나 삭제할 수 있습니다.</div>
                </div>
            </div>
            <div style={{ display: 'flex',  justifyContent: 'flex-end', gap: '10px', paddingLeft: '15px', paddingRight: '15px', paddingBottom: '15px' }}>
                <animated.div style={{ ...styleBtn, ...styleBtn1 }} className="BTNC" onClick={ () => setActive() }
                onMouseEnter={ () => setHover1(true) } onMouseLeave={ () => setHover1(false) }><img src={ svgPower } style={ styleBtnImg } alt=""/>{ activeText }</animated.div>
                <animated.div style={{ ...styleBtn, ...styleBtn2 }} className="BTNC" onClick={ () => removeAll() }
                onMouseEnter={ () => setHover2(true) } onMouseLeave={ () => setHover2(false) }><img src={ svgDelete } style={ styleBtnImg } alt=""/>전체 기록 삭제</animated.div>
            </div>
        </animated.div>
    )
}

class History extends Component {
    constructor(props){
        super(props);
        this.state = { list: undefined }
    }
    reload(){
        this.onCall = false;
        this.setState({ list: undefined });
    }
    render(){
        if(!this.onCall){
            this.onCall = true;
            const list = problemHistory.getAll().reverse();
            axios.post("/json/problems/gettable", { list: JSON.stringify(list) }).then(({ data }) => {
                this.setState({ list: data.list });
            })
        }
        
        let container = <LoadingLay/>;
        if(this.state.list !== undefined){
            container =  <ProblemTable content={ this.state.list } theme={ this.props.theme }
            empty="문제가 존재하지 않습니다."/>;
        }

        return (
            <div className="ND">
                <Helmet><title>최근 방문기록 : 오일러OJ</title></Helmet>
                <Top category="history"/>
                <div className="FRAME_MAIN">
                    <div style={{ height: '30px' }}/>
                    <CookieHelp theme={ this.props.theme } isActive={ problemHistory.isActive() } reload={ () => this.reload() }/>
                    <div style={{ height: '40px' }}/>
                    { container }
                </div>
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
            </div>
        )
    }
    componentDidUpdate(){
        this.props.reFooter();
    }
}

export default History;