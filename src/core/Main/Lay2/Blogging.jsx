import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import Frame from './Lay2Frame';
import Loading from '../../Frame/Loading/Loading';
import axios from '../../Tool/axios';
import trans from '../../Tool/trans';

import svgBlogging from './svg_blogging.svg';
import svgMore from './svg_more.svg';
import svgClose from './svg_close.svg';
import svgCode from './svg_code.svg';
import svgLink from './svg_link.svg';
import svgGood from './svg_good.svg';
import svgGoodFill from './svg_good_fill.svg';

const LoadingLay = () => {
    return (
        <div style={{ position: 'relative', paddingTop: '100px' }}>
            <Loading/>
        </div>
    )
}
const BtnItem = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        height: '22px', borderRadius: '11px',
        paddingLeft: '8px', paddingRight: '8px',
        background: `rgba(120,120,120,${ isHover ? 0.15 : 0 })`,
        config: { duration: 100 }
    })
    const styleImg = {
        width: '20px', height: '20px',
        verticalAlign: 'top', marginTop: '2px'
    }
    const styleTxt = {
        height: '22px', lineHeight: '22px', display: 'inline-block',
        fontSize: '14px', fontWeight: 400, color: 'orange',
        verticalAlign: 'top'
    }

    return (
        <animated.div style={ style }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <img src={ props.icon } style={ styleImg } alt=""/>
            <span style={ styleTxt }>{ props.text }</span>
        </animated.div>
    )
}
const Item = (props) => {
    const [isHover, setHover] = useState(false);
    const [layNum, setLayNum] = useState(0);

    const style = useSpring({
        height: '54px', position: 'relative', overflow: 'hidden',
        borderBottom: `1px solid ${ props.theme === 'light' ? 'rgb(220,220,220)' : 'rgb(60,60,60)' }`,
        background: isHover ? 'rgba(150,150,150,0.1)' : 'rgba(150,150,150,0)',
        config: { duration: 100 }
    });
    const styleLay1 = useSpring({
        width: '100%', height: '100%', position: 'absolute', top: '0px',
        right: (layNum === 0 ? '0%' : '100%')
    })
    const styleLay2 = useSpring({
        width: '100%', height: '100%', position: 'absolute', top: '0px',
        right: (layNum === 0 ? '-100%' : '0%')
    })
    const styleImg = {
        position: 'absolute', left: '7px', top: '14px',
        width: '26px', height: '26px'
    }
    const styleTxt = {
        position: 'absolute', top: '3px', left: '45px', right: '32px', overflow: 'hidden',
        height: '44px', lineHeight: '22px', textOverflow: 'ellipsis', wordBreak: 'break-all', /*whiteSpace: 'nowrap',*/
        fontSize: '15px', fotnWeight: 300, color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleMore = useSpring({
        position: 'absolute', top: '16px', right: '2px',
        width: '22px', height: '22px',
        opacity: (isHover ? 1 : 0),
        config: { duration: 100 }
    })
    const styleProf = {
        position: 'absolute', top: '10px', left: '10px',
        border: '2px solid rgba(120,120,120,0.5)', width: '34px', height: '34px', borderRadius: '18px',
        overflow: 'hidden', background: 'white',
        display: (props.login_id && props.login_id !== '' ? 'block' : 'none')
    }
    const styleDate = {
        position: 'absolute', bottom: '8px', left: '55px',
        fontSize: '14px', fontWeight: 400, color: 'gray'
    }
    const styleLay2Top = {
        position: 'absolute', top: '5px', left: '55px',
        display: 'flex'
    }

    return (
        <animated.div style={ style }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => { setHover(false); setLayNum(0); } }>
            <animated.div style={ styleLay1 }>
                <img src={ svgBlogging } alt="blogging" style={ styleImg }/>
                <a href={ props.url } target="_blank" rel="noreferrer">
                    <div style={ styleTxt }>{ props.name }</div>
                </a>
                <animated.img src={ svgMore } alt="more" style={ styleMore }
                className="BTNC" onClick={ () => setLayNum(1) }/>
            </animated.div>
            <animated.div style={ styleLay2 }>
                <div style={ styleProf }>
                    <Link to={ `/profile/${ props.login_id }` }>
                        <img src={ `/profile-img/${ props.login_id }.webp?size=34` } style={{ width: '100%', height: '100%' }}/>
                    </Link>
                </div>
                <div style={ styleDate }>{ trans.date2(new Date(props.date)) }</div>
                <div style={ styleLay2Top }>
                    <BtnItem icon={ svgGood } text="123"/>
                    <a href={ props.url } target="_blank" rel="noreferrer">
                        <BtnItem icon={ svgLink } text=""/>
                    </a>
                    <Link to={ `/problemset/problem/${ props.problem_id }` }>
                        <BtnItem icon={ svgCode } text=""/>
                    </Link>
                </div>
                <animated.img src={ svgClose } alt="close" style={ styleMore }
                className="BTNC" onClick={ () => setLayNum(0) }/>
            </animated.div>
        </animated.div>
    )
}
class Blogging extends Component {
    state = { list: undefined }
    constructor(props){
        super(props);

        this.state = {};
        axios.get('/json/main/blogginglist').then(({ data }) => {
            this.setState({ list: data.list });
        });
    }
    render() {
        let container = <LoadingLay/>;

        if(this.state.list){
            container = this.state.list.map((item, index) => {
                return (
                    <Item key={ index } theme={ this.props.theme } { ...item }/>
                )
            })
        }

        return (
            <Frame title="새로운 블로깅" theme={ this.props.theme }>
                { container }
            </Frame>
        );
    }
}

export default Blogging;