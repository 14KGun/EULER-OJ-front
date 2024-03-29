import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from "@react-spring/web";
import Gallery from './Gallery/Gallery';
import Lay2Youtube from './Lay2/Youtube';
import Lay2Problem from './Lay2/Problem';
import Lay2Blogging from './Lay2/Blogging';
import Footer from '../Frame/Footer/Footer'
import './Main.css';
import imgCard1 from './img_card1.png';
import imgCard2 from './img_card2.png';
import imgCard3 from './img_card3.png';
import imgCard4 from './img_card4.png';

const Lay1Item = (props) => {
    const calc = (e) => {
        const targetWidth = e.target.offsetWidth, targetHeight = e.target.offsetHeight;
        const top = e.target.getBoundingClientRect().top, left = e.target.getBoundingClientRect().left;
        const x = (e.clientX-left)/targetWidth-0.5, y = (e.clientY-top)/targetHeight-0.5;
        return [-y*15, x*15, 1.04]
    }
    const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

    const [xys, setXys] = useState([0, 0, 1]);
    const [isHover, setHover] = useState(false);
    const cardStyleXys = useSpring({ xys: xys, config: { mass: 5, tension: 350, friction: 40, duration: 100 } });
    const cardStyle = useSpring({
        background: isHover ? 'rgba(220,220,220,0)' : 'rgba(220,220,220,0)',
        boxShadow: isHover ? '0px 10px 30px -5px rgba(0,0,0,0.3)' : '0px 10px 30px -5px rgba(0,0,0,0)',
        config: { duration: 100 }
    });

    const card = (
        <animated.div className="CARD"
        onMouseEnter={ () => setHover(true) }
        onMouseMove={ (e) => setXys(calc(e)) }
        onMouseLeave={ () => { setXys([0, 0, 1]); setHover(false); } }
        style={{ transform: cardStyleXys.xys.to(trans), background: cardStyle.background, boxShadow: cardStyle.boxShadow }}>
            <div className="CARD-NAME" style={{ color: (props.theme === 'light' ? 'black' : 'white') }}>{ props.name }</div>
            <img className="CARD-IMG" src={ props.img } alt={ props.name }/>
        </animated.div>
    );

    if(props.newTab){
        return (
            <div style={{ width: '25%', height: '100%', float: 'left', position: 'relative' }}>
                <a href={ props.url }>{ card }</a>
            </div>
        );
    }
    else{
        return (
            <div style={{ width: '25%', height: '100%', float: 'left', position: 'relative' }}>
                <Link to={ props.url }>{ card }</Link>
            </div>
        );
    }
};

class Main extends Component {
    constructor(props){
        super(props);
        this.state = { pageIndex: 2/*Math.floor(Math.random() * 2)*/, pageFix: undefined };

        const setPage = (pageIndex) => {
            this.setState({ pageIndex: pageIndex });
        }
        this.setPage = setPage;
    }
    componentDidMount(){
        document.title = "오일러OJ"
    }
    fixPage(pageIndex){
        this.setState({ pageFix: pageIndex });
        if(pageIndex !== undefined) this.setPage(pageIndex);
    }
    render() {
        return (
            <div>
                <Gallery pageIndex={ this.state.pageIndex } setPage={ this.setPage.bind(this) } pageFix={ this.state.pageFix }/>
                <div id="lay1" className="ND">
                    <div className="FRAME_MAIN" style={{ height: '200px' }}>
                        <span onMouseEnter={ () => this.fixPage(0) } onMouseLeave={ () => this.fixPage(undefined) }>
                            <Lay1Item img={ imgCard1 } name="오일러OJ" url="/problemset" theme={ this.props.theme }/>
                        </span>
                        <span onMouseEnter={ () => this.fixPage(1) } onMouseLeave={ () => this.fixPage(undefined) }>
                            <Lay1Item img={ imgCard2 } name="오일러TV" url="https://www.youtube.com/channel/UCQQJLCWcgAvrWRdZaxLUXJQ" theme={ this.props.theme } newTab/>
                        </span>
                        <span onMouseEnter={ () => this.fixPage(2) } onMouseLeave={ () => this.fixPage(undefined) }>
                            <Lay1Item img={ imgCard3 } name="오일러BOOKS" url="https://smartstore.naver.com/eulerbooks" theme={ this.props.theme } newTab/>
                        </span>
                        <Lay1Item img={ imgCard4 } name="오일러BLOG" url="https://blog.naver.com/euleredu" theme={ this.props.theme } newTab/>
                    </div>
                </div>
                <div id="lay2" style={{ background: 'rgba(120,120,120,0.1)' }}>
                    <div className="FRAME_MAIN ND" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                        <Lay2Problem theme={ this.props.theme }/>
                        <Lay2Youtube theme={ this.props.theme }/>
                        <Lay2Blogging theme={ this.props.theme }/>
                    </div>
                </div>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default Main;