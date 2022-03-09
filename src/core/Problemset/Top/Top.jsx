import { Component, useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import './Top.css';
import axios from '../../Tool/axios';
import getHref from '../../Tool/getHref';

import svgPattern from './svg_pattern.svg';

const TitleLay = (props) => {
    const style = {
        position: 'fixed', top: '100px', width: '100%'
    }
    return (
        <div className="ND" style={{ ...style, opacity: 1-props.scrolledTop/140 }}>
            <div className="FRAME_MAIN">
                <div style={{ position: 'absolute', left: '0px', top: '0px', fontSize: '16px', fontWeight: '500', color: 'rgb(240,240,230)' }}>#{ props.id }</div>
                <div style={{ position: 'absolute', left: '0px', top: '20px', fontSize: '30px', fontWeight: '900', color: 'white' }}>{ props.title }</div>
            </div>
        </div>
    )
}

const Background = () => {
    const [height, setHeight] = useState(322);
    const wrapHeight = (Math.min(Math.max(height,50),322)-50)/272;

    const scrollevent = () => {
        const _height = document.getElementsByClassName('ProblemTopBackground')[0].clientHeight;
        if(height !== _height) setHeight(_height);
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollevent);
        scrollevent();
        return () => {
            document.removeEventListener('scroll', scrollevent);
        };
    });
    
    const styleImg = useSpring({
        position: 'absolute', right: '0px',
        top: `${ -(1-wrapHeight)*100 }px`,
        height: `${ 322*(1.3 - wrapHeight*0.3)}px`
    });
    return (
        <div className="ProblemTopBackground">
            <animated.img src={ svgPattern } alt="" style={ styleImg }/>
        </div>
    )
}
const TopBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? 'rgba(150,150,150,0.1)' : 'rgba(150,150,150,0)',
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
            fontSize: '17px', fontWeight: 300, color: 'rgb(250,250,250)' }}>{ props.name }</div>
            <animated.div style={{ width: '100%', height: '4px', background: 'rgba(230,100,70,0.5)', ...opacity }}/>
        </animated.div>
    )
}
const FixedLay = (props) => {
    return (
        <div>
            <Link to={ `/problemset/problem/${ props.id }` }><TopBtn name="문제" selected={ props.type === 'problem' }/></Link>
            <Link to={ `/problemset/stats/${ props.id }` }><TopBtn name="통계" selected={ props.type === 'stats' }/></Link>
            <Link to={ `/problemset/solves/${ props.id }` }><TopBtn name="맞은 사람들" selected={ props.type === 'solves' }/></Link>
            <Link to={ `/problemset/blogging/${ props.id }` }><TopBtn name="블로깅" selected={ props.type === 'blogging' }/></Link>
            <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id }) }` }><TopBtn name="채점 기록" selected={ props.type === 'status' }/></Link>
            <Link to={ `/problemset/submit/${ props.id }` }><TopBtn name="제출" selected={ props.type === 'submit' }/></Link>
        </div>
    )
}

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
        this.onCall = false;
        this.scrollevent = this.scrollevent.bind(this);
    }
    render() {
        if(!this.onCall){
            this.onCall = true;
            axios.get(`/json/stats/header/${ this.props.id }`).then(({ data }) => {
                this.setState({ id: data.id, title: data.title });
            })
        }

        return (
            <div>
                <div className="ND" style={{ height: '322px', position: 'relative' }}>
                    <div style={{
                        position: 'absolute', left: '0px', bottom: '0px', width: '100%',
                        height: `${ Math.max(322-this.state.scrolledTop, 120) }px`
                    }}><Background/></div>
                </div>

                <div className="ND" style={{
                    width: '100%', height: '120px', left: '0px', zIndex: '50',
                    position: this.state.scrolledTop <= 202 ? 'absolute' : 'fixed',
                    top: this.state.scrolledTop <= 202 ? '202px' : '0px',
                    boxShadow: this.state.scrolledTop <= 202 ? 'none' : '0 0 10px 5px rgba(0,0,0,0.25)'
                }}>
                    <div style={{
                        width: '100%', height: '100%',
                        display: this.state.scrolledTop <= 202 ? 'none' : 'block'
                    }}><Background/></div>
                    <div style={{ position: 'absolute', left: '0px', bottom: '0px', width: '100%', height: '50px' }}>
                        <div className="FRAME_MAIN" style={{ height: '100%', position: 'relative' }}>
                            <FixedLay id={ this.props.id } type={ this.props.type }/>
                        </div>
                    </div>
                </div>

                <TitleLay id={ this.props.id } title={ this.state.title } scrolledTop={ this.state.scrolledTop }/>
            </div>
        )
    }
    scrollevent(){
        const scrolledHeight = document.documentElement.scrollTop;
        if(scrolledHeight !== this.state.scrolledTop) this.setState({ scrolledTop: scrolledHeight });
    }
    componentDidMount() {
        this.scrollevent();
        document.addEventListener('scroll', this.scrollevent);
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollevent);
    }
}

export default Top;