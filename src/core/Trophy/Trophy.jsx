import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { animated, useSpring } from "@react-spring/web";
import { Link, Redirect } from 'react-router-dom';
import Layout from '../Frame/Layout/Layout';
import Footer from '../Frame/Footer/Footer';
import axios from '../Tool/axios';
import getTrophyInfo from '../Tool/getTrophyInfo';
import getHref from '../Tool/getHref';

import svgTrophy from './svg_trophy.svg';
import svgCheck from './svg_check.svg';

const SelectLayBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        height: '40px', lineHeight: '40px', borderRadius: '20px',
        paddingLeft: '18px', paddingRight: '18px',
        fontSize: '16px', fontWeight: 300,
        color: (props.selected ? 'white' : (props.theme==='dark' ? '#ddd' : 'black'))
    }
    const background = useSpring({
        background: props.selected ? 'rgb(0,150,200)' : `rgba(140,140,140,${ isHover ? 0.3 : 0.2 })`,
        config: { duration: 100 }
    });

    return (
        <Link to={ `/trophy/list/${ props.category }` }>
            <animated.div style={{ ...style, ...background }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                { props.name }
            </animated.div>
        </Link>
    )
}
const SelectLay = (props) => {
    if(props.loginId === undefined && props.category !== 'all'){
        return <Redirect to={ getHref.loginCurrentUrl() }/>
    }
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            <SelectLayBtn theme={ props.theme } name="모든 업적" category="all"
            selected={ props.category === "all" }/>
            <SelectLayBtn theme={ props.theme } name="내 업적" category="success"
            selected={ props.category === "success" }/>
            <SelectLayBtn theme={ props.theme } name="내가 가지고 있지 않는 업적" category="fail"
            selected={ props.category === "fail" }/>
        </div>
    )
}

const TrophyItem = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        position: 'relative', overflow: 'hidden',
        background: isHover ? 'rgba(160,160,160,0.05)' : 'rgba(160,160,160,0)',
        borderBottom: '1px solid rgba(100,100,100,0.2)',
        config: { duration: 100 }
    })
    const styleImg = {
        position: 'absolute', top: 'calc(50% - 30px)', left: '20px',
        width: '60px', height: '60px'
    }
    const styleMain = {
        paddingTop: '20px', paddingBottom: '20px',
        paddingLeft: '105px', paddingRight: '15px'
    }
    const styleTitle = {
        fontSize: '19px', fontWeight: 400,
        color: props.theme === 'light' ? 'black' : '#aaa'
    }
    const styleSub = {
        fontSize: '15px', fontWeight: 300,
        color: props.theme === 'light' ? 'gray' : 'gray'
    }
    const styleAchieve = {
        position: 'absolute', top: 'calc(50% - 10px)', right: '30px',
        width: '20px', height: '20px', borderRadius: '15px', 
        background: (props.theme==='light' ? 'rgb(34,177,76)' : 'rgb(25,150,60)'),
        display: (props.achieve ? 'block' : 'none')
    }
    const styleCheck = {
        position: 'absolute', top: '0px', left: '0px',
        width: '80%', height: '80%', padding: '10%'
    }

    return (
        <Link to={ `/trophy/info/${ props.id }` }>
            <animated.div style={ style }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img src={ props.img } style={ styleImg } alt={ props.name }/>
                <div style={ styleMain }>
                    <div style={ styleTitle }>{ props.name }</div>
                    <div style={ styleSub }>{ props.sub }</div>
                </div>
                <div style={ styleAchieve }>
                    <img src={ svgCheck } alt="" style={ styleCheck }/>
                </div>
            </animated.div>
        </Link>
    )
}
const TrophyTable = (props) => {
    const trophys = getTrophyInfo.list;
    const list = [];

    for(let i=0; i<trophys.length; i++){
        if(props.category === "success" && props.achieve.indexOf(trophys[i].id) < 0) continue;
        if(props.category === "fail" && props.achieve.indexOf(trophys[i].id) >= 0) continue;

        list.push(<TrophyItem key={ i } id={ trophys[i].id } img={ trophys[i].icon }
        name={ trophys[i].name } sub={ trophys[i].hint } theme={ props.theme }
        achieve={ props.achieve.indexOf(trophys[i].id) >= 0 }/>);
    }

    return (
        <div>
            { list }
        </div>
    )
}

const Trophy = (props) => {
    const [myAchieve, setMyAchieve] = useState(undefined);
    useEffect(() => {
        axios.get('/json/trophy/achieve').then(({ data }) => {
            setMyAchieve(data);
        })
    }, []);


    return (
        <div>
            <Helmet><title>업적 : 오일러OJ</title></Helmet>
            <Layout.HeaderTitle theme={ props.theme } icon={ svgTrophy } title="업적"/>
            <div className="FRAME_MAIN">
                <SelectLay theme={ props.theme } category={ props.category }
                loginId={ myAchieve ? myAchieve.loginId : '' }/>
                <div style={{ height: '30px' }}/>
                <TrophyTable theme={ props.theme }
                category={ props.category }
                achieve={ myAchieve ? myAchieve.list : [] }/>
            </div>
            <div className="BTM_EMPTY"></div>
            <Footer theme={ props.theme }/>
        </div>
    )
}

export default Trophy;