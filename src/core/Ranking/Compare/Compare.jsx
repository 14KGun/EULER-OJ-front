import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from '../../Tool/axios';
import getTrophyInfo from '../../Tool/getTrophyInfo';
import Top from '../../Frame/Top/Top';
import Loading from '../../Frame/Loading/Loading';
import Footer from '../../Frame/Footer/Footer';

import svgCompare from './svg_compare.svg';
import svgVsLight from './svg_vs_light.svg';
import svgVsDark from './svg_vs_dark.svg';
import svgSolve from '../../Profile/ProfileTop/svg_solve.svg';
import svgTrophy from '../../Profile/ProfileTop/svg_trophy.svg';
import svgActivity from '../../Profile/ProfileTop/svg_activity.svg';
import svgUnknown from './svg_unknown.svg';

const Icon = () => {
    return (
        <img src={ svgCompare } style={{ paddingTop: '3px' }} alt=""/>
    )
}
const TopBackground = (props) => {
    return (
        <div className="eulerranking-topbackground" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        </div>
    )
}
const TopFixedLay = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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

const Title = (props) => {
    return (
        <div style={{ fontSize: '27px', fontWeight: 700, color: (props.theme==='light' ? 'black' : 'white'), marginBottom: '6px' }}>{ props.children }</div>
    )
}
const SubTitle = (props) => {
    return (
        <span style={{
            display: 'inline-block', height: '28px', lineHeight: '28px', borderRadius: '14px',
            background: 'rgba(120,120,120,0.5)', paddingLeft: '8px', paddingRight: '8px', marginLeft: '5px',
            fontSize: '16px', fontWeight: 300, color: 'white'
        }}>{ props.children }</span>
    )
}
const Container = (props) => {
    return (
        <div style={{ borderRadius: '10px', background: (props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'), padding: '20px', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
                { props.children }
            </div>
        </div>
    )
}

const UserBoxItem = (props) => {
    return (
        <span style={{ display: 'inline-block', width: '40px', marginRight: '10px' }}>
            <img src={ props.src } alt={ props.alt } style={{ width: '30px', height: '30px', padding: '5px' }}/>
            <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: 500,
            color: (props.theme==='light' ? 'rgb(50,50,50)' : 'rgb(200,200,200)') }}>{ props.text }</div>
        </span>
    )
}
const UserBox = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? (props.theme==='light' ? 'rgba(100,100,100,0.3)' : 'rgba(180,180,180,0.3)') : 'rgba(140,140,140,0.3)',
        config: { duration: 100 }
    })
    const getHigh = (x, y) => {
        x = parseInt(x); y = parseInt(y);
        if(x && y){
            const percent = x/y*100;
            if(percent >= 10) return percent.toFixed(1);
            if(percent >= 1) return percent.toFixed(2);
            return percent.toFixed(3);
        }
        return 'NaN';
    }
    return (
        <Link to={ `/profile/${ props.id }` }>
            <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ width: '100%', height: '100%', borderRadius: '10px', ...background }}>
                <div style={{ textAlign: 'center', paddingTop: '17px' }}>
                    <span style={{ display: 'inline-block', width: '50px', height: '50px', background: 'white', borderRadius: '25px',
                    verticalAlign: 'middle', marginRight: '10px', overflow: 'hidden' }}>
                        <img src={ `https://euleroj.io/profile-img/${ props.id }.webp?size=50` } style={{ width: '100%', height: '100%' }} alt=""/>
                    </span>
                    <span style={{ display: 'inline-block', fontSize: '18px', fontWeight: 700, height: '50px', lineHeight: '50px',
                    color: (props.theme==='light' ? 'black' : 'white') }}>{ props.id }</span>
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 500,
                    color: (props.theme==='light' ? 'black' : 'white') }}>순위</span>
                    <span style={{ fontSize: '16px', fontWeight: 300,
                    color: (props.theme==='light' ? 'black' : 'rgb(230,230,230)') }}> { props.data.rank }위 (상위 { getHigh(props.data.rank, props.data.rankTot) }%)</span>
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <UserBoxItem src={ svgSolve } alt="solve" text={ props.data.solve } theme={ props.theme }/>
                    <UserBoxItem src={ svgTrophy } alt="trophy" text={ props.data.trophy } theme={ props.theme }/>
                    <UserBoxItem src={ svgActivity } alt="activity" text={ props.data.activity } theme={ props.theme }/>
                </div>
            </animated.div>
        </Link>
    )
}

const IdContainer = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        display: 'inline-block', height: '26px', lineHeight: '26px', borderRadius: '10px',
        paddingLeft: '7px', paddingRight: '7px', marginRight: '7px',
        fontSize: '16px', fontWeight: 300, color: 'black',
        background: 'rgb(200,200,200)',
        color: (props.theme==='light' ? 'black' : 'white')
    }
    const background = useSpring({
        background: isHover ? (props.theme==='light' ? 'rgba(100,100,100,0.3)' : 'rgba(180,180,180,0.3)') : 'rgba(140,140,140,0.3)',
        config: { duration: 100 }
    })
    return (
        <Link to={ `/problemset/problem/${ props.id }` }>
            <animated.span style={{ ...style, ...background }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>{ props.id }</animated.span>
        </Link>
    )
}

const Trophy = (props) => {
    const [width, setWidth] = useState(140);
    const [isHover, setHover] = useState(false);
    const style = {
        display: 'inline-block', width: '140px', height: `${ width + 50 }px`, overflow: 'hidden', marginRight: '5px',
        background: 'rgba(200,200,200,1)', borderRadius: '10px'
    }
    let styleImg = {
        width: `${ width-40 }px`, height: `${ width-40 }px`, marginTop: '20px', marginLeft: '20px', marginRight: '20px'
    }
    let styleTxt = {
        marginLeft: '15px', marginRight: '15px', marginTop: '10px', textAlign: 'center',
        fontSize: '15px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white')
    }
    const background = useSpring({
        background: isHover ? (props.theme==='light' ? 'rgba(220,220,220,1)' : 'rgba(60,60,60,1)') : (props.theme==='light' ? 'rgba(220,220,220,0)' : 'rgba(60,60,60,0)'),
        config: { duration: 100 }
    })

    if(!props.have){
        styleImg = { ...styleImg, filter: 'grayscale(100%)', opacity: 0.2 };
        styleTxt = { ...styleTxt, textDecoration: 'line-through' }
    }

    return (
        <Link to={ `/timelog/trophy/${ props.id }` }>
            <animated.span style={{ ...style, ...background }} className="profile-trophy-item"
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img src={ props.src } alt="" style={ styleImg }/>
                <div style={ styleTxt }>{ props.text }</div>
            </animated.span>
        </Link>
    )
}

const defaultState = { id1: 'none', id2: 'none', only1: [], only2: [], only1Trophy: [], only2Trophy: [], bothSolve: [], bothSubmit: [], bothTrophy: [], info1: {}, info2: {}, err1: undefined, err2: undefined };
class Compare extends Component {
    constructor(props){
        super(props);
        this.state = { ...defaultState };
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.err1 || prevState.err2) return prevState;
        if(nextProps.id1 !== prevState.id1 || nextProps.id2 !== prevState.id2){
            return { ...defaultState };
        }
        return prevState;
    }
    render() {
        let container = <LoadingLay/>;

        if(this.state.err1 || this.state.err2 || this.props.id1 === this.props.id2){
            let msg = '';
            if(this.state.err1 && this.state.err2) msg = `사용자 '${ this.props.id1 }'와 '${ this.props.id2 }'를 찾을 수 없습니다.`;
            else if(this.state.err1) msg = `사용자 '${ this.props.id1 }'를 찾을 수 없습니다.`;
            else if(this.state.err2) msg = `사용자 '${ this.props.id2 }'를 찾을 수 없습니다.`;
            else if(this.props.id1 === this.props.id2) msg = `동일 사용자는 비교할 수 없습니다.`;

            container = (
                <div className="FRAME_MAIN ND" style={{ textAlign: 'center' }}>
                    <div style={{ height: '50px' }}/>
                    <img src={ svgUnknown } alt="" style={{ maxWidth: '500px', marginBottom: '10px' }}/>
                    <div style={{ fontSize: '30px', fontWeight: 900, lineHeight: '50px',
                    color: (this.props.theme==='light' ? 'rgb(52,59,71)' : 'rgb(180,180,180)') }}>OPPS! Page Not Found</div>
                    <div style={{ fontSize: '16px', fontWeight: 300, marginBottom: '30px', color: 'rgb(120,120,120)' }}>{ msg }</div>
                </div>
            )
        }
        else if(this.state.id1 !== this.props.id1 || this.state.id2 !== this.props.id2){
            if(!this.load){
                this.load = true;
                axios.get(`/json/ranking/compare/${ this.props.id1 }/${ this.props.id2 }`).then((result) => {
                    this.setState({
                        id1: result.data.id1, id2: result.data.id2, only1: result.data.only1, only2: result.data.only2,
                        bothSolve: result.data.bothSolve, bothSubmit: result.data.bothSubmit,
                        only1Trophy: result.data.only1Trophy, only2Trophy: result.data.only2Trophy, bothTrophy: result.data.bothTrophy,
                        info1: result.data.info1, info2: result.data.info2,
                        err1: result.data.err1, err2: result.data.err2 
                    }, () => {
                        this.load = false;
                    });
                });
            }
        }
        else{
            container = (
                <div className="FRAME_MAIN ND">
                    <div style={{ height: '50px' }}/>
                    <Title theme={ this.props.theme }>비교 대상</Title>
                    <Container theme={ this.props.theme }>
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '0px', left: '0px', width: 'calc(50% - 45px)', height: '100%' }}>
                                <UserBox id={ this.state.id1 } data={ this.state.info1 } theme={ this.props.theme }/>
                            </div>
                            <div style={{ position: 'absolute', top: '0px', right: '0px', width: 'calc(50% - 45px)', height: '100%' }}>
                                <UserBox id={ this.state.id2 } data={ this.state.info2 } theme={ this.props.theme }/>
                            </div>
                            <img src={ this.props.theme==='light' ? svgVsLight : svgVsDark } alt=""
                            style={{ position: 'absolute', width: '50px', top: '45px', left: 'calc(50% - 25px)' }}/>
                        </div>
                    </Container>
                    
                    <div style={{ height: '40px' }}/>
                    <Title theme={ this.props.theme }>{ `'${ this.state.id2 }' 만 맞은 문제` }<SubTitle>{ this.state.only2.length }</SubTitle></Title>
                    <Container theme={ this.props.theme }>
                        <div style={{ textAlign: 'center', lineHeight: '33px' }}>
                            { this.state.only2.map((item, index) => <IdContainer key={ index } id={ item } theme={ this.props.theme }/>) }
                        </div>
                    </Container>
                    
                    <div style={{ height: '40px' }}/>
                    <Title theme={ this.props.theme }>{ `'${ this.state.id1 }' 만 맞은 문제` }<SubTitle>{ this.state.only1.length }</SubTitle></Title>
                    <Container theme={ this.props.theme }>
                        <div style={{ textAlign: 'center', lineHeight: '33px' }}>
                            { this.state.only1.map((item, index) => <IdContainer key={ index } id={ item } theme={ this.props.theme }/>) }
                        </div>
                    </Container>
                    
                    <div style={{ height: '40px' }}/>
                    <Title theme={ this.props.theme }>{ `'${ this.state.id2 }' 만 가지고 있는 업적` }<SubTitle>{ this.state.only2Trophy.length }</SubTitle></Title>
                    <Container theme={ this.props.theme }>
                        <div style={{ textAlign: 'center' }}>
                            { this.state.only2Trophy.map((item, index) => {
                                const trophy = getTrophyInfo.getInfoById(item);
                                if(trophy) return <Trophy key={ index } src={ trophy.icon } text={ trophy.name } hint={ trophy.hint } id={ trophy.id } theme={ this.props.theme } have/>
                                else return <></>
                            }) }
                        </div>
                    </Container>
                    
                    <div style={{ height: '40px' }}/>
                    <Title theme={ this.props.theme }>{ `'${ this.state.id1 }' 만 가지고 있는 업적` }<SubTitle>{ this.state.only1Trophy.length }</SubTitle></Title>
                    <Container theme={ this.props.theme }>
                        <div style={{ textAlign: 'center' }}>
                            { this.state.only1Trophy.map((item, index) => {
                                const trophy = getTrophyInfo.getInfoById(item);
                                if(trophy) return <Trophy key={ index } src={ trophy.icon } text={ trophy.name } hint={ trophy.hint } id={ trophy.id } theme={ this.props.theme } have/>
                                else return <></>
                            }) }
                        </div>
                    </Container>
                    
                    <div style={{ height: '40px' }}/>
                    <Title theme={ this.props.theme }>{ `둘 다 맞은 문제` }<SubTitle>{ this.state.bothSolve.length }</SubTitle></Title>
                    <Container theme={ this.props.theme }>
                        <div style={{ textAlign: 'center', lineHeight: '33px' }}>
                            { this.state.bothSolve.map((item, index) => <IdContainer key={ index } id={ item } theme={ this.props.theme }/>) }
                        </div>
                    </Container>
                    
                    <div style={{ height: '40px' }}/>
                    <Title theme={ this.props.theme }>{ `둘 다 틀린 문제` }<SubTitle>{ this.state.bothSubmit.length }</SubTitle></Title>
                    <Container theme={ this.props.theme }>
                        <div style={{ textAlign: 'center', lineHeight: '33px' }}>
                            { this.state.bothSubmit.map((item, index) => <IdContainer key={ index } id={ item } theme={ this.props.theme }/>) }
                        </div>
                    </Container>
                    
                    <div style={{ height: '40px' }}/>
                    <Title theme={ this.props.theme }>{ `둘 다 가지고 있는 업적` }<SubTitle>{ this.state.bothTrophy.length }</SubTitle></Title>
                    <Container theme={ this.props.theme }>
                        <div style={{ textAlign: 'center' }}>
                            { this.state.bothTrophy.map((item, index) => {
                                const trophy = getTrophyInfo.getInfoById(item);
                                if(trophy) return <Trophy key={ index } src={ trophy.icon } text={ trophy.name } hint={ trophy.hint } id={ trophy.id } theme={ this.props.theme } have/>
                                else return <></>
                            }) }
                        </div>
                    </Container>
                </div>
            )
        }

        return (
            <div>
                <Helmet><title>비교하기 : 오일러OJ</title></Helmet>
                <Top icon={ <Icon/> } title="비교하기" background={ <TopBackground/> } fixedLay={ <TopFixedLay/> }/>
                { container }
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
    componentDidUpdate(){
        this.props.reFooter();
    }
}

export default Compare;