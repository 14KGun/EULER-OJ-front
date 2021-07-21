import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from '../../Tool/axios';
import Top from '../../Frame/Top/Top';
import SearchBox from '../../Search/SearchBox/SearchBox';
import imgBackground from './img_background.png';
import Loading from '../../Frame/Loading/Loading';
import ProblemTable from '../ProblemTable';
import PageSelector from '../../Frame/PageSelector';
import Footer from '../../Frame/Footer/Footer';
import svgCoding from './svg_coding.svg';

const Icon = () => {
    return (
        <img src={ svgCoding } style={{ paddingTop: '6px' }} alt=""/>
    )
}
const getCategory = (category1, category2, page) => {
    if(category1){
        if(category2){
            if(page) return [category1, category2, page];
            return [category1, category2, 1];
        }
        if(category1 === 'tag') return [category1, 0, 1];
        if(category1 === 'level') return [category1, 11, 1];
        if(category1 === 'number') return [category1, 1000, 1];
    }
    return ['tag', 0, 1];
}
const TopBackground = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'rgb(200,200,200)' }}>
            <img src={ imgBackground } style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
        </div>
    )
}
const TopBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? 'rgba(150,150,150,0.15)' : 'rgba(150,150,150,0)',
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
            <animated.div style={{ width: '100%', height: '4px', background: 'rgb(0,150,200)', ...opacity }}/>
        </animated.div>
    )
}
const TopFixedLay = (props) => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Link to="/problemset/list/tag"><TopBtn name="태그" selected={ props.category === 'tag' }/></Link>
            <Link to="/problemset/list/level"><TopBtn name="코딩마법서" selected={ props.category === 'level' }/></Link>
            <Link to="/problemset/list/number"><TopBtn name="문제 번호" selected={ props.category === 'number' }/></Link>
            <div style={{ position: 'absolute', width: '250px', top: '12px', right: '0px' }}>
                <SearchBox/>
            </div>
        </div>
    );
}
const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}
const SelectLayBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        display: 'inline-block', height: '30px', lineHeight: '30px', borderRadius: '15px',
        paddingLeft: '13px', paddingRight: '13px', marginRight: '5px', marginBottom: '5px',
        fontSize: '17px', fontWeight: 300, color: 'white'
    }
    let background = useSpring({
        background: isHover ? 'rgb(80,170,195)' : 'rgb(190,190,190)'
    }).background;
    if(props.selected) background = 'rgb(0,150,200)'
    return (
        <Link to={ `/problemset/list/${ props.category1 }/${ props.id }` }>
            <animated.span style={{ ...style, background }}>{ props.name }</animated.span>
        </Link>
    )
}
const SelectLay = (props) => {
    return (
        <div className="ND" style={{ paddingTop: '30px' }}>
            { props.items.map((item, index) => <SelectLayBtn key={ index } name={ item.name } category1={ props.category1 } id={ item.id } selected={ String(props.selected) === String(item.id) }/>) }
        </div>
    )
}

const defaultState = { category1: 'none', category2: 'none', requestPage: 'none', page: 1, maxPage: 1, nav: [], list: [] };
class Problemset extends Component {
    constructor(props) {
        super(props);
        this.state = { ...defaultState };
    }
    static getDerivedStateFromProps(nextProps, prevState){
        const propsCategory = getCategory(nextProps.category1, nextProps.category2, nextProps.page);
        if(String(propsCategory[0]) !== String(prevState.category1) || String(propsCategory[1]) !== String(prevState.category2) || String(propsCategory[2]) !== String(prevState.requestPage)){
            window.scrollTo(0,0);
            return { ...defaultState };
        }
        return prevState;
    }
    makeGetPageUrl(page){
        return `/problemset/list/${ this.state.category1 }/${ this.state.category2 }/${ page }`;
    }
    render() {
        const propsCategory = getCategory(this.props.category1, this.props.category2, this.props.page);

        let container = <LoadingLay/>;
        if(String(propsCategory[0]) === String(this.state.category1) && String(propsCategory[1]) === String(this.state.category2) && String(propsCategory[2]) === String(this.state.requestPage)){
            container = (
                <div className="FRAME_MAIN">
                    <SelectLay items={ this.state.nav } selected={ propsCategory[1] } category1={ propsCategory[0] }/>
                    <div style={{ height: '30px' }}/>
                    <ProblemTable content={ this.state.list } theme={ this.props.theme }/>
                    <PageSelector page={ this.state.page } max={ this.state.maxPage } get={ (x) => this.makeGetPageUrl(x) } theme={ this.props.theme }/>
                </div>
            );
        }
        else{
            const url = `/json/problems/getlist/?category1=${ propsCategory[0] }&category2=${ propsCategory[1] }&page=${ propsCategory[2] }`;
            axios.get(url).then((listInfo) => {
                this.setState({
                    category1: listInfo.data.category1, category2: listInfo.data.category2, page: listInfo.data.page, maxPage: listInfo.data.maxPage,
                    nav: listInfo.data.nav, list: listInfo.data.list, requestPage: propsCategory[2]
                });
            });
        }

        return (
            <div>
                <Helmet><title>문제 : 오일러OJ</title></Helmet>
                <Top icon={ <Icon/> } title="문제" background={ <TopBackground/> } fixedLay={ <TopFixedLay category={ propsCategory[0] }/> }/>
                { container }
                <div className="BTM_EMPTY"></div>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default Problemset;