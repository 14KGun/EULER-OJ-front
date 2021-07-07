import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from '../../Tool/axios';
import Top from '../../Frame/Top/Top';
import imgBackground from './img_background.png';
import Loading from '../../Frame/Loading/Loading';
import Footer from '../../Frame/Footer/Footer';

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
        <div className="TagTopBackground" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'rgb(200,200,200)' }}>
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
            { props.items.map((item, index) => <SelectLayBtn key={ index } name={ item.name } category1={ props.category1 } id={ item.id } selected={ props.selected === item.id }/>) }
        </div>
    )
}

const defaultState = { category1: 'none', category2: 'none', page: 1, list: [] };
class Problemset extends Component {
    constructor(props) {
        super(props);
        this.state = { ...defaultState };
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.category1 !== prevState.category1 || nextProps.category2 !== prevState.category2){
            window.scrollTo(0,0);
            return { ...defaultState };
        }
        return prevState;
    }
    render() {
        const propsCategory = getCategory(this.props.category1, this.props.category2, this.props.page);

        let container = <LoadingLay/>;
        if(propsCategory === [this.state.category1, this.state.category2, this.state.page]){
            container = (
                <div className="FRAME_MAIN">
                    <SelectLay items={ [{id:'1', name:'헬로'}, {id:'2', name:'와웅'}] } selected={ propsCategory[1] } category1={ propsCategory[0] }/>
                </div>
            );
        }
        else{
            const url = `/json/problems/getlist/?category1=${ propsCategory[0] }?category2=${ propsCategory[1] }?page=${ propsCategory[2] }`;
            axios.get(url).then((listInfo) => {
                
            });
        }

        return (
            <div>
                <Helmet><title>문제 : 오일러OJ</title></Helmet>
                <Top icon={ <div/> }
                title="문제" background={ <TopBackground/> } fixedLay={ <TopFixedLay category={ propsCategory[0] }/> }/>
                { container }
                <Footer/>
            </div>
        );
    }
}

export default Problemset;