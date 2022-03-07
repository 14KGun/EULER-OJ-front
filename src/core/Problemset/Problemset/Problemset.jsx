import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Top from './ProblemsetTop';
import Loading from '../../Frame/Loading/Loading';
import ProblemTable from '../ProblemTable';
import PageSelector from '../../Frame/PageSelector';
import Footer from '../../Frame/Footer/Footer';
import axios from '../../Tool/axios';

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
        display: 'inline-block', height: '40px', lineHeight: '40px', borderRadius: '20px',
        paddingLeft: '18px', paddingRight: '18px', marginRight: '8px', marginBottom: '8px',
        fontSize: '16px', fontWeight: 300,
        color: (props.selected || props.theme==='dark' ? 'white' : 'black')
    }
    let background = useSpring({
        background: props.selected ? 'rgb(0,150,200)' : `rgba(140,140,140,${ isHover ? 0.3 : 0.2 })`,
        config: { duration: 100 }
    });

    return (
        <Link to={ `/problemset/list/${ props.category1 }/${ props.id }` }>
            <animated.span style={{ ...style, ...background }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>{ props.name }</animated.span>
        </Link>
    )
}
const SelectLay = (props) => {
    return (
        <div className="ND" style={{ paddingTop: '30px' }}>
            { props.items.map((item, index) => <SelectLayBtn key={ index } name={ item.name } category1={ props.category1 } id={ item.id }
            selected={ String(props.selected) === String(item.id) } theme={ props.theme }/>) }
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
                    <SelectLay items={ this.state.nav } selected={ propsCategory[1] } category1={ propsCategory[0] } theme={ this.props.theme }/>
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
                <Top category={ propsCategory[0] }/>
                { container }
                <div className="BTM_EMPTY"></div>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
    componentDidUpdate(){
        this.props.reFooter();
    }
}

export default Problemset;