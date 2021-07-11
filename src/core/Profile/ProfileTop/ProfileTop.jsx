import { Component, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import svgSolve from './svg_solve.svg';
import svgTrophy from './svg_trophy.svg';
import svgActivity from './svg_activity.svg';
import imgBg01 from './background/01.png';
import imgBg02 from './background/02.png';
import imgBg03 from './background/03.png';
import imgBg04 from './background/04.png';
import imgBg05 from './background/05.png';

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
        style={{ height: '50px', float: 'left', ...background }} className="BTNC" onClick={ () => props.onClick() }>
            <div style={{ height: '46px', lineHeight: '46px', paddingLeft: '14px', paddingRight: '14px',
            fontSize: '17px', fontWeight: 300, color: 'rgb(240,240,240)' }}>{ props.name }</div>
            <animated.div style={{ width: '100%', height: '4px', background: 'rgb(0,150,200)', ...opacity }}/>
        </animated.div>
    )
}
const TopFixedLay = (props) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <TopBtn name="업적 및 활동" selected={ props.page === 1 } onClick={ () => props.pageHandler(1) }/>
            <TopBtn name="맞은 문제" selected={ props.page === 2 } onClick={ () => props.pageHandler(2) }/>
            <TopBtn name="틀린 문제" selected={ props.page === 3 } onClick={ () => props.pageHandler(3) }/>
            <TopBtn name="추가 정보" selected={ props.page === 4 } onClick={ () => props.pageHandler(4) }/>
            <TopBtn name="나와 비교하기" selected={ props.page === 5 } onClick={ () => props.pageHandler(5) }/>
        </div>
    )
}
const TopRightSubLay = (props) => {
    const style = {
        width: '60px', position: 'absolute', left: props.left, top: '65px'
    }
    const styleImg = {
        width: '30px', height: '30px', marginLeft: '15px'
    }
    const styleTxt = {
        fontSize: '17px', fontWeight: 500, color: 'black', textAlign: 'center'
    }
    return (
        <div style={ style }>
            <img src={ props.src } style={ styleImg } alt={ props.alt }/>
            <div style={ styleTxt }>{ props.txt }</div>
        </div>
    )
}
const TopRightLay = (props) => {
    const style = {
        width: '100%', height: '100%', borderRadius: '15px',
        background: 'rgb(255,255,255,0.5)', backdropFilter: 'blur(10px)'
    }
    const txtStyle = {
        paddingLeft: '20px', paddingTop: '20px'
    }
    const spanStyle = {
        fontSize: '16px', fontWeight: 300, color: 'black'
    }
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
        <div style={{ ...style }}>
            <div style={ txtStyle }>
                <span style={{ ...spanStyle, fontWeight: 500, color: 'rgb(80,80,80)' }}>순위</span>&nbsp;<span style={{ ...spanStyle }}>{ props.data.rank }위 (상위 { getHigh(props.data.rank, props.data.rankTot) }%)</span>
            </div>
            <TopRightSubLay left="20px" src={ svgSolve } alt="solve" txt={ props.data.solve }/>
            <TopRightSubLay left="95px" src={ svgTrophy } alt="trophy" txt={ props.data.trophy }/>
            <TopRightSubLay left="170px" src={ svgActivity } alt="activity" txt={ props.data.activity }/>
        </div>
    )
}
const TopContainer = (props) => {
    const [height, setHeight] = useState(252);
    const springToken = useSpring({
        x: (Math.min(Math.max(height, 50),252)-50)/202
    }).x;
    const layRightOpacity = useSpring({
        opacity: height > 220 ? 1 : 0
    })
    const scrollEvent = () => {
        const _height = document.getElementsByClassName('profiletop-topbackground')[0].clientHeight;
        setHeight(_height);
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollEvent);
        return () => {
            document.removeEventListener('scroll', scrollEvent);
        }
    })
    const getLayTdWidth = () => {
        const elements = document.getElementsByClassName('profiletop-idcontainer');
        if(elements && elements[0]) return elements[0].clientWidth;
        return 0;
    }
    return (
        <div className="profiletop-topbackground" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <animated.div style={{ position: 'absolute', left: '0px', bottom: springToken.to(x => `${ 5 + x*75 }px`),
            width: springToken.to(x => `${ 36 + x*114 }px`), height: springToken.to(x => `${ 36 + x*114 }px`), background: 'white',
            borderRadius: springToken.to(x => `${ 22 + x*57 }px`), border: '2px solid gray', overflow: 'hidden'
            }}>
                <img style={{ width: '100%', height: '100%' }} src={ `https://euleroj.io/profile-img/${ props.id }.webp` } alt="profile-img"/>
            </animated.div>
            <animated.div className="profiletop-idcontainer" style={{ position: 'absolute',
            fontWeight: 500, color: 'white', height: '50px', lineHeight: '50px',
            left: springToken.to(x => `${ 47 + x*123 }px`), bottom: springToken.to(x => `${ x*145 }px`),
            fontSize: springToken.to(x => `${ 20 + x*4 }px`) }}>{ props.id }</animated.div>
            <animated.div style={{ position: 'absolute', fontWeight: 300, color: 'rgb(200,200,200)',
            left: springToken.to(x => `${ 47 + x*123 }px`), bottom: springToken.to(x => `${ x*130 }px`),
            fontSize: '16px', opacity: springToken }}>{ props.data.feeling }</animated.div>
            <animated.div style={{ position: 'absolute', bottom: '0px', right: '0px', height: '50px', overflow: 'hidden',
            left: springToken.to(x => `${ (80 + getLayTdWidth())*(1 - x) }px`) }}>
                <TopFixedLay page={ props.page } pageHandler={ props.pageHandler }/>
            </animated.div>
            <animated.div style={{ position: 'absolute', top: '20px', right: '0px', width: '250px', height: '150px', ...layRightOpacity }}>
                <TopRightLay data={ props.data }/>
            </animated.div>
        </div>
    )
}
class ProfileTop extends Component {
    state = { scrolledTop: 0 }
    scrollevent(){
        const scrolledHeight = document.documentElement.scrollTop;
        this.setState({ scrolledTop: scrolledHeight });
    }
    render() {
        const background = (
            <div style={{ width: '100%', height: '100%', background: 'rgb(200,200,200)', overflow: 'hidden' }}>
                <img src={ imgBg01 } style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
                <div style={{ width: '100%', position: 'absolute', top: '70px', bottom: '0px', left: '0px' }}>
                    <div className="FRAME_MAIN" style={{ height: '100%' }}>
                        <TopContainer id={ this.props.id } data={ this.props.data }
                        page={ this.props.page } pageHandler={ this.props.changePage }/>
                    </div>
                </div>
            </div>
        )

        return (
            <>
                <div className="ND" style={{
                    width: '100%', top: '0px', left: '0px', zIndex: '50', position: 'fixed',
                    height: `${ Math.max(322-this.state.scrolledTop, 120) }px`,
                    boxShadow: this.state.scrolledTop <= 202 ? 'none' : '0 0 10px 5px rgba(0,0,0,0.4)'
                }}>{ background }</div>
                <div className="ND" style={{ height: '322px' }}/>
            </>
        );
    }
    componentDidMount(){
        this.scrollevent();
        document.addEventListener('scroll', () => this.scrollevent());
    }
}

export default ProfileTop;