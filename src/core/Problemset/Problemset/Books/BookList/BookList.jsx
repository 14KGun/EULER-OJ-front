import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import Top from '../../../../Frame/Top/Top';
import SearchBox from '../../../../Search/SearchBox/SearchBox';
import Loading from '../../../../Frame/Loading/Loading';
import ProblemTable from '../../../ProblemTableV2';
import Footer from '../../../../Frame/Footer/Footer';
import axios from '../../../../Tool/axios';

import imgBackground from '../../img_background.png';
import svgCoding from '../../svg_coding.svg';

const Icon = () => {
    return (
        <img src={ svgCoding } style={{ paddingTop: '6px' }} alt=""/>
    )
}
const TopBackground = (props) => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'rgb(200,200,200)' }}>
            <img src={ imgBackground } style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
        </div>
    )
    /*return (
        <div style={{ width: '100%', height: '100%' }} className="problemset-books-img-02-light">
        </div>
    )*/
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
            <Link to="/problemset/list/tag"><TopBtn name="태그" selected={ false }/></Link>
            <Link to="/problemset/list/books"><TopBtn name="코딩마법서" selected={ true }/></Link>
            <Link to="/problemset/list/number"><TopBtn name="문제 번호" selected={ false }/></Link>
            <div style={{ position: 'absolute', top: '8px', right: '0px' }}>
                <SearchBox/>
            </div>
        </div>
    )
}
const LoadingLay = (props) => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px', color: (props.theme==='light'?'black':'white') }}>페이지 불러오는 중...</div>
        </div>
    )
}

class BookList extends Component {
    constructor(props){
        super(props);
        this.state = { category: undefined };
        this.onCall = false;
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.category !== nextProps.category){
            if(nextProps.category === 'c++_stone'){
                return { category: nextProps.category, title: '코딩마법서 1권 STONE VERSION C/C++', axios: ['level', '11'] };
            }
            else if(nextProps.category === 'python_stone'){
                return { category: nextProps.category, title: '코딩마법서 1권 STONE VERSION 파이썬', axios: ['level', '11'] };
            }
            else if(nextProps.category === 'c++_iron'){
                return { category: nextProps.category, title: '코딩마법서 2권 IRON VERSION C/C++', axios: ['level', '12'] };
            }
            else{
                return {};
            }
        }
        return prevState;
    }
    render() {
        if(this.state.problems === undefined && this.state.axios && this.onCall === false){
            this.onCall = true;
            axios.get(`https://euleroj.io/json/problems/getlist?category1=${ this.state.axios[0] }&category2=${ this.state.axios[1] }`).then(({ data }) => {
                this.setState({ problems: data.list }, () => {
                    this.onCall = false;
                    this.props.reFooter();
                })
            })
        }

        let container = <LoadingLay theme={ this.props.theme }/>
        if(this.state.problems){
            container = (
                <div className="FRAME_MAIN">
                    <div style={{ height: '30px' }}/>
                    <ProblemTable content={ this.state.problems } theme={ this.props.theme }/>
                </div>
            );
        }

        return (
            <div>
                <Top icon={ <Icon/> } title={ this.state.title } fixedLay={ <TopFixedLay/> }
                background={ <TopBackground theme={ this.props.theme } category={ this.props.category }/> }/>
                { container }
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default BookList;