import { Component, useState, useEffect } from 'react';
import { useSpring, animated } from "@react-spring/web";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from '../../Tool/axios';
import Top from '../../Frame/Top/Top';
import Loading from '../../Frame/Loading/Loading';
import RankingTable from '../RankingTable';
import PageSelector from '../../Frame/PageSelector';
import Footer from '../../Frame/Footer/Footer';

import svgPodium from '../svg_podium.svg';
import svgRanking from '../svg_ranking.svg';
import '../EulerRanking.css';

const Icon = () => {
    return (
        <img src={ svgRanking } style={{ paddingTop: '4px' }} alt=""/>
    )
}
const TopBackground = (props) => {
    const [Height, setHeight] = useState(322);
    const stylePodium = {
        position: 'absolute', bottom: '-30px', right: '0px', width: '350px'
    };
    const styleRank1 = {
        position: 'absolute', bottom: '93px', right: '140px',
        width: '80px', height: '80px', background: 'white',
        borderRadius: '50px', border: '1px solid gray', overflow: 'hidden'
    }
    const styleRank2 = {
        position: 'absolute', bottom: '86px', right: '228px',
        width: '60px', height: '60px', background: 'white',
        borderRadius: '50px', border: '1px solid gray', overflow: 'hidden'
    }
    const styleRank3 = {
        position: 'absolute', bottom: '83px', right: '70px',
        width: '60px', height: '60px', background: 'white',
        borderRadius: '50px', border: '1px solid gray', overflow: 'hidden'
    }
    const styleRank1Txt = {
        position: 'absolute', bottom: '178px', right: '140px', width: '80px', textAlign: 'center',
        fontSize: '11px', fontWeight: 300, color: 'white'
    }
    const styleRank2Txt = {
        position: 'absolute', bottom: '151px', right: '228px', width: '60px', textAlign: 'center',
        fontSize: '11px', fontWeight: 300, color: 'white'
    }
    const styleRank3Txt = {
        position: 'absolute', bottom: '148px', right: '70px', width: '60px', textAlign: 'center',
        fontSize: '11px', fontWeight: 300, color: 'white'
    }
    const opacity = useSpring({
        opacity: Height > 265 ? 1 : 0,
        config: { duration: 300 }
    })
    
    const scrollevent = () => {
        const _Height = document.getElementsByClassName('eulerranking-topbackground')[0].clientHeight;
        setHeight(_Height);
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollevent);
        return () => {
            document.removeEventListener('scroll', scrollevent);
        };
    });

    let podium = '';
    if(props.top3.length > 0){
        podium = (
            <>
                <animated.img src={ svgPodium } style={{ ...stylePodium, ...opacity }} alt=""/>
                <animated.div style={{ ...styleRank1, ...opacity }}><img src={ `https://euleroj.io/profile-img/${ props.top3[0] }.webp` } style={{ width: '100%', height: '100%' }} alt=""/></animated.div>
                <animated.div style={{ ...styleRank2, ...opacity }}><img src={ `https://euleroj.io/profile-img/${ props.top3[1] }.webp` } style={{ width: '100%', height: '100%' }} alt=""/></animated.div>
                <animated.div style={{ ...styleRank3, ...opacity }}><img src={ `https://euleroj.io/profile-img/${ props.top3[2] }.webp` } style={{ width: '100%', height: '100%' }} alt=""/></animated.div>
                <animated.div style={{ ...styleRank1Txt, ...opacity }}>{ props.top3[0] }</animated.div>
                <animated.div style={{ ...styleRank2Txt, ...opacity }}>{ props.top3[1] }</animated.div>
                <animated.div style={{ ...styleRank3Txt, ...opacity }}>{ props.top3[2] }</animated.div>
            </>
        );
    }

    return (
        <div className="eulerranking-topbackground" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <div className="FRAME_MAIN" style={{ position: 'relative', height: '100%' }}>
                { podium }
            </div>
        </div>
    )
}
const TopBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? 'rgba(150,150,150,0.2)' : 'rgba(150,150,150,0)',
        config: { duration: 150 }
    });
    const opacity = useSpring({
        opacity : props.selected ? 1 : 0,
        config: { duration: 150 }
    });
    return (
        <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
        style={{ height: '50px', float: 'left', ...background }}>
            <div style={{ height: '46px', lineHeight: '46px', paddingLeft: '14px', paddingRight: '14px',
            fontSize: '17px', fontWeight: 300, color: 'rgb(220,220,220)' }}>{ props.name }</div>
            <animated.div style={{ width: '100%', height: '4px', background: 'rgb(230,100,70)', ...opacity }}/>
        </animated.div>
    )
}
const TopFixedLay = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Link to="/ranking"><TopBtn name="오일러 랭킹" selected/></Link>
            <Link to="/ranking/2001"><TopBtn name="오일러 2001"/></Link>
        </div>
    )
}
const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}

const defaultState = { requestPage: 'none', page: 1, maxPage: 1, list: [], top3: [] };
class EulerRanking extends Component {
    constructor(props){
        super(props);
        this.state = { ...defaultState };
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(String(nextProps.page) !== String(prevState.requestPage)){
            return { ...defaultState };
        }
        return prevState;
    }
    makeGetPageUrl(page){
        return `/ranking/euler/${ page }`;
    }
    render() {
        let container = <LoadingLay/>;
        if(String(this.props.page) === String(this.state.requestPage)){
            container = (
                <div className="FRAME_MAIN">
                    <div style={{ height: '50px' }}/>
                    <RankingTable list={ this.state.list } theme={ this.props.theme }/>
                    <PageSelector page={ this.state.page } max={ this.state.maxPage } get={ (x) => this.makeGetPageUrl(x) } theme={ this.props.theme }/>
                </div>
            );
        }
        else{
            axios.get(`/json/ranking/euler/?page=${ this.props.page }`).then((listInfo) => {
                this.setState({
                    requestPage: this.props.page, page: listInfo.data.page, maxPage: listInfo.data.maxPage,
                    list: listInfo.data.list, top3: listInfo.data.top3
                });
            });
        }
        
        return (
            <div>
                <Helmet><title>순위 : 오일러OJ</title></Helmet>
                <Top icon={ <Icon/> } title="순위" background={ <TopBackground top3={ this.state.top3 }/> } fixedLay={ <TopFixedLay/> }/>
                { container }
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default EulerRanking;