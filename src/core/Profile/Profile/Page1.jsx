import { Component, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import trans from '../../Tool/trans';
import getTrophyInfo from '../../Tool/getTrophyInfo';

import svgNosolve from './svg_nosolve.svg';
import svgTrophy from './svg_trophy.svg';
import svgContest from './svg_contest.svg';
import svgClock from './svg_clock.svg';
import svgEmpty from './svg_empty.svg';

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
        <Link to={ `/trophy/info/${ props.id }` }>
            <animated.span style={{ ...style, ...background }} className="profile-trophy-item"
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img src={ props.src } alt="" style={ styleImg }/>
                <div style={ styleTxt }>{ props.text }</div>
            </animated.span>
        </Link>
    )
}

const BtnTrophy = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        height: '28px', lineHeight: '28px', borderRadius: '18px',
        paddingLeft: '13px', paddingRight: '13px',
        fontSize: '16px', fontWeight: 300, color: 'black',
        border: '2px solid rgba(120,120,120,0.7)',
        color: (props.theme==='light' ? 'rgb(110,110,110)' : 'rgb(140,140,140)')
    }
    const background = useSpring({
        background: isHover ? 'rgba(120,120,120,0.15)' : 'rgba(120,120,120,0)',
        config: { duration: 100 }
    })
    return (
        <Link to="/trophy">
            <animated.div style={{ ...style, ...background }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>모든 업적 보기</animated.div>
        </Link>
    )
}

const TrophyEmpty = (props) => {
    const styleText = {
        fontSize: '16px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : '#aaa'),
    }
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '5px' }}>
            <img src={ svgEmpty } alt="" style={{ height: '24px' }}/>
            <div style={ styleText }>달성한 업적이 없습니다.</div>
        </div>
    )
}

const ActitvityLine = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        height: '40px', position: 'relative', overflow: 'hidden'
    }
    if(!props.noline) style['borderBottom'] = '1px solid rgb(180,180,180)';
    const styleImg = {
        position: 'absolute', top: '9px', left: '14px', width: '22px', height: '22px'
    }
    const styleText = {
        position: 'absolute', top: '0px', left: '45px', height: '40px', lineHeight: '40px',
        fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleClock = {
        position: 'absolute', top: '12px', right: '220px',
        width: '16px', height: '16px'
    }
    const styleTime = {
        position: 'absolute', top: '0px', right: '13px', height: '40px', lineHeight: '40px',
        width: '200px', textAlign: 'center',
        fontSize: '16px', fontWeight: 300, color: 'rgb(120,120,120)'
    }
    const background = useSpring({
        background: isHover ? (props.theme==='light' ? 'rgba(220,220,220,1)' : 'rgba(60,60,60,1)') : (props.theme==='light' ? 'rgba(220,220,220,0)' : 'rgba(60,60,60,0)'),
        config: { duration: 100 }
    })

    let imgSrc = undefined;
    if(props.type === 'nosolve') imgSrc = svgNosolve;
    else if(props.type === 'trophy') imgSrc = svgTrophy;
    else if(props.type === 'contest') imgSrc = svgContest;

    return (
        <Link to={ props.link }>
            <animated.div style={{ ...style, ...background }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img src={ imgSrc } alt="" style={ styleImg }/>
                <div style={ styleText }>{ props.text }</div>
                <img src={ svgClock } alt="time" style={ styleClock }/>
                <div style={ styleTime }>{ props.time }</div>
            </animated.div>
        </Link>
    )
}

class Page1 extends Component {
    constructor(props){
        super(props);
        this.trophyTrans = {};
        for(var i=0; i<getTrophyInfo.list.length; i++){
            this.trophyTrans[getTrophyInfo.list[i].id] = getTrophyInfo.list[i].name;
        }
    }
    render() {
        const trophyList1 = [], trophyList2 = [];
        for(var i=0; i<getTrophyInfo.list.length; i++){
            let have = false;
            for(var j=0; j<this.props.data.trophy.length; j++){
                if(getTrophyInfo.list[i].id === this.props.data.trophy[j]) have = true;
            }
            if(have) trophyList1.push(getTrophyInfo.list[i]);
            else trophyList2.push(getTrophyInfo.list[i]);
        }

        const activityR = this.props.data.activity.slice().reverse();

        return (
            <div className="FRAME_MAIN ND" style={{ paddingTop: '50px' }}>
                <Title theme={ this.props.theme }>업적<SubTitle>{ trophyList1.length }</SubTitle></Title>
                <Container theme={ this.props.theme }>
                    <div style={{ textAlign: 'center' }}>
                        { trophyList1.map((item, index) => {
                            return <Trophy key={ index } src={ item.icon } text={ item.name } hint={ item.hint } id={ item.id } theme={ this.props.theme } have/>
                        }) }
                        {
                            trophyList1.length === 0 ?
                            <TrophyEmpty theme={ this.props.theme }/> : null
                        }
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <BtnTrophy theme={ this.props.theme }/>
                    </div>
                </Container>
                <div style={{ height: '40px' }}/>
                <Title theme={ this.props.theme }>활동<SubTitle>{ activityR.length }</SubTitle></Title>
                <Container theme={ this.props.theme }>
                    { activityR.map((item, index) => {
                        let text = '', time = '', link = '', type = '';
                        if(item.type === 'trophy'){
                            text = `업적 '${ this.trophyTrans[item.info] }'을(를) 달성하였습니다.`;
                            link = `/trophy/info/${ item.info }`;
                            type = 'trophy';
                        }
                        else if(item.type === 'nosolve'){
                            text = `문제 '#${ item.info } - ${ item.subinfo }'을(를) 최초로 해결하였습니다.`;
                            link = `/problemset/problem/${ item.info }`;
                            type = 'nosolve';
                        }
                        else if(item.type === 'contest'){
                            text = `대회 '${ item.subinfo }'에서 우승하였습니다.`;
                            link = `/contest/${ item.info }`;
                            type = 'contest';
                        }

                        const timeDate = new Date(item.time);
                        time = trans.date(timeDate);

                        return <ActitvityLine text={ text } time={ time } link={ link } type={ type } noline={ index === activityR.length-1 } theme={ this.props.theme }/>
                    }) }
                </Container>
            </div>
        );
    }
}

export default Page1;