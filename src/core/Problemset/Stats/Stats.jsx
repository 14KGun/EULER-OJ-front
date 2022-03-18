import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';
import Chart from "react-apexcharts";
import Layout from '../../Frame/Layout/Layout';
import Top from '../Top/Top';
import Footer from '../../Frame/Footer/Footer';
import PageNotFound from '../../Frame/PageNotFound/PageNotFound';
import axios from '../../Tool/axios';
import getHref from '../../Tool/getHref';

import svgChart from './svg_chart.svg';
import svgTag from './svg_tag.svg';
import svgTagEmpty from './svg_tagno.svg';
// import svgRank from './svg_rank.svg';
import svgAssess from './svg_assess.svg';

const StatLine = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        height: '30px', position: 'relative',
        background: `rgba(120,120,120,${ isHover ? 0.05 : 0 })`,
        config: { duration: 100 }
    });
    const styleTxt1 = {
        position: 'absolute', top: '0px', left: '10px',
        height: '30px', lineHeight: '30px',
        fontSize: '15px', fontWeight: 300,
        color: (props.theme==='light' ? '#555' : '#888')
    }
    const styleTxt2 = {
        position: 'absolute', top: '0px', left: '50%',
        height: '30px', lineHeight: '30px',
        fontSize: '16px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : '#aaa')
    }

    return (
        <animated.div style={ style }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <div style={ styleTxt1 }>{ props.name }</div>
            <div style={ styleTxt2 }>{ props.value }</div>
        </animated.div>
    )
}
const Stat = (props) => {
    const [isHover1, setHover1] = useState(false);
    const [isHover2, setHover2] = useState(false);
    const chartOptions = {
        colors: ["rgb(250,150,60)"],
        plotOptions: {
            radialBar: {
                hollow: { size: "50%" },
                track: {
                    dropShadow: { enabled: true, top: 2, left: 0, blur: 4, opacity: 0.15 },
                    background: 'rgba(120,120,120,0.15)',
                },
                dataLabels: {
                    name: { fontSize: "15px", color: "#888", fontWeight: 300, offsetY: -10, show: true },
                    value: { fontSize: "20px", color: "#888", fontWeight: 900, offsetY: -2, show: true }
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: { shade: "dark", type: "horizontal", gradientToColors: ["rgb(255,200,100)"], stops: [0, 100] }
        },
        stroke: { lineCap: "round" },
        labels: ["성공률"]
    }
    const styleBtn1 = useSpring({
        paddingTop: '5px', paddingBottom: '5px', borderRadius: '10px',
        background: `rgba(120,120,120,${ isHover1 ? 0.1 : 0 })`,
        config: { duration: 100 }
    })
    const styleBtn2 = useSpring({
        paddingTop: '5px', paddingBottom: '5px', borderRadius: '10px',
        background: `rgba(120,120,120,${ isHover2 ? 0.1 : 0 })`,
        config: { duration: 100 }
    })
    const styleTxt1 = {
        height: '22px', lineHeight: '22px',
        textAlign: 'center', fontSize: '15px', fontWeight: 300,
        color: (props.theme==='light' ? '#555' : '#888')
    }
    const styleTxt2 = {
        height: '25px', lineHeight: '25px',
        textAlign: 'center', fontSize: '17px', fontWeight: 500,
        color: (props.theme==='light' ? 'black' : '#aaa')
    }
    const styleBorder = {
        borderBottom: '1px solid rgba(120,120,120,0.3)'
    }
    return (
        <>
            <div style={{ height: '50px' }}/>
            <Layout.Title theme={ props.theme } icon={ svgChart }>통계</Layout.Title>
            <Layout.Container>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap',
                paddingLeft: '30px', paddingRight: '30px', gap: '20px' }}>
                    <div style={{ width: '220px', paddingBottom: '30px' }}>
                        <Chart type="radialBar" options={ chartOptions }
                        series={ [(props.stat.solves / props.stat.tot * 100).toFixed(2)] }
                        width="100%" height="250px"/>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '-20px' }}>
                            <div style={{ width: '100px' }}>
                                <Link to={ `/problemset/solves/${ props.id }` }>
                                    <animated.div style={ styleBtn1 }
                                    onMouseEnter={ () => setHover1(true) } onMouseLeave={ () => setHover1(false) }>
                                        <div style={ styleTxt1 }>맞은 사람</div>
                                        <div style={{ ...styleTxt2, color: 'green' }}>{ props.stat.solves }</div>
                                    </animated.div>
                                </Link>
                            </div>
                            <div style={{ width: '1px', height: '36px', marginTop: '7px', background: 'rgba(120,120,120,0.3)' }}/>
                            <div style={{ width: '100px' }}>
                                <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id }) }` }>
                                    <animated.div style={ styleBtn2 }
                                    onMouseEnter={ () => setHover2(true) } onMouseLeave={ () => setHover2(false) }>
                                        <div style={ styleTxt1 }>제출 횟수</div>
                                        <div style={ styleTxt2 }>{ props.stat.tot }</div>
                                    </animated.div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '300px', paddingTop: '30px', paddingBottom: '30px' }}>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "accepted" }) }` }>
                            <StatLine theme={ props.theme } name="맞았습니다" value={ props.stat.ac }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "partial" }) }` }>
                            <StatLine theme={ props.theme } name="부분 점수" value={ props.stat.part }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "time" }) }` }>
                            <StatLine theme={ props.theme } name="시간 초과" value={ props.stat.time }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "memory" }) }` }>
                            <StatLine theme={ props.theme } name="메모리 초과" value={ props.stat.mem }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "output" }) }` }>
                            <StatLine theme={ props.theme } name="출력 초과" value={ props.stat.out }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "runtime" }) }` }>
                            <StatLine theme={ props.theme } name="런타임 에러" value={ props.stat.run }/>
                        </Link>
                        <div style={ styleBorder }/>
                        <Link to={ `/status/${ getHref.encodeObject({ problemId: props.id, result: "compile" }) }` }>
                            <StatLine theme={ props.theme } name="컴파일 에러" value={ props.stat.comp }/>
                        </Link>
                    </div>
                </div>
            </Layout.Container>
        </>
    )
}
const TagItem = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        background: `rgba(120,120,120,${ isHover ? 0.19 : 0.12 })`,
        height: '36px', lineHeight: '36px', borderRadius: '10px',
        paddingLeft: '15px', paddingRight: '15px',
        fontSize: '16px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : '#aaa'),
        config: { duration: 100 }
    });

    return (
        <Link to={ props.to }>
            <animated.div style={ style }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                { props.children }
            </animated.div>
        </Link>
    )
}
const TagEmpty = (props) => {
    const styleText = {
        fontSize: '16px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : '#aaa'),
    }
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '5px' }}>
            <img src={ svgTagEmpty } alt="" style={{ height: '24px' }}/>
            <div style={ styleText }>지정된 태그가 없습니다.</div>
        </div>
    )
}
const Tag = (props) => {
    return (
        <>
            <div style={{ height: '50px' }}/>
            <Layout.Title theme={ props.theme } icon={ svgTag }>태그</Layout.Title>
            <Layout.Container>
                <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    { props.names.map((item, index) => <TagItem key={ index } to={ props.urls[index] } theme={ props.theme }>{ item }</TagItem>) }
                    {
                        props.names.length === 0 ?
                        <TagEmpty theme={ props.theme }/> : null
                    }
                </div>
            </Layout.Container>
        </>
    )
}

const LangStatItem = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        width: `${ props.value }%`, height: '100%',
        overflow: 'hidden', backgroundImage: props.color,
        opacity: isHover ? 1 : 0.8,
        config: { duration: 50 }
    })
    const styleText = {
        height: '100%', lineHeight: '30px',
        paddingLeft: '7px', fontSize: '15px', fontWeight: 300,
        color: props.theme==='light' ? 'black' : 'white'
    }
    const onHover = () => {
        setHover(true);
        props.setText(`${ props.text } 제출 횟수 : ${ props.cnt }`);
    }
    return (
        <animated.div style={ style }
        onMouseEnter={ () => onHover() } onMouseLeave={ () => setHover(false) }>
            <Link to={ props.to }>
                <div style={ styleText }>{ props.text }</div>
            </Link>
        </animated.div>
    )
}
const LangStat = (props) => {
    const [text, setText] = useState(`전체 제출 횟수 : ${ props.tot }`);

    const list = [];
    for (const langCode in props.stat) {
        if(props.stat[langCode] <= 0) continue;
        let name = langCode;
        if(langCode == 'c') name = 'C';
        else if(langCode == 'cpp') name = 'C++';
        else if(langCode == 'python') name = 'Python';
        else if(langCode == 'java') name = 'Java';
        else if(langCode == 'ruby') name = 'Ruby';
        else if(langCode == 'golang') name = 'Go';
        else if(langCode == 'r') name = 'R';
        list.push({
            lang: langCode, name: name, cnt: props.stat[langCode],
            percent: (props.stat[langCode] / props.tot * 100),
            to: `/status/${ getHref.encodeObject({ problemId: props.id, lang: langCode }) }`
        })
    }
    list.sort((x,y) => y.cnt - x.cnt);

    const colorSet = [
        'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(120deg, #fda085 0%, #f6d365 100%)',
        'linear-gradient(120deg, #96e6a1 0%, #d4fc79 100%)',
        'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
        'linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)',
        'linear-gradient(to right, #0ba360 0%, #3cba92 100%)',
        'linear-gradient(to right, #e6b980 0%, #eacda3 100%)'
    ];
    const styleStat = {
        width: '100%', height: '30px', borderRadius: '10px',
        position: 'relative', display: 'flex', overflow: 'hidden',
        border: '2px solid rgba(120,120,120,0.2)'
    }
    const styleBtm = {
        paddingLeft: '5px', paddingTop: '7px',
        fontSize: '16px', fontWeight: 300,
        color: props.theme==='light' ? 'black' : '#aaa'
    }

    return (
        <>
            <div style={{ height: '70px' }}/>
            <Layout.Title theme={ props.theme } icon={ svgAssess }>사용된 언어</Layout.Title>
            <Layout.Container>
                <div style={{ padding: '20px' }}>
                    <div style={ styleStat }>
                        { list.map((item, index) => <LangStatItem theme={ props.theme } color={ colorSet[index] }
                        value={ item.percent } text={ item.name } to={ item.to } cnt={ item.cnt } setText={ (x) => setText(x) }/>) }
                    </div>
                    <div style={ styleBtm }>{ text }</div>
                </div>
            </Layout.Container>
        </>
    )

}

const Stats = (props) => {
    const [info, setInfo] = useState(undefined);

    useEffect(() => {
        axios.get(`/json/problems/stats/info/${ props.id }`).then(({ data }) => {
            console.log(data);
            setInfo(data);
        })
    }, [props.id]);

    let container = <Layout.Loading theme={ props.theme }/>;
    if(info && info.err){
        return <PageNotFound theme={ props.theme } msg="요청하신 문제를 찾을 수 없습니다."/>;
    }
    if(info){
        container = (
            <div className="ND">
                <Stat id={ props.id } stat={ info.stat }
                theme={ props.theme }/>
                <Tag names={ info.tagsName } urls={ info.tagsUrl }
                theme={ props.theme }/>
                <LangStat id={ props.id } stat={ info.lang }
                tot={ info.stat.tot } theme={ props.theme }/>
            </div>
        )
    }

    return (
        <div>
            <Helmet><title>통계 (#{ props.id }) : 오일러OJ</title></Helmet>
            <Top id={ props.id } type="stats"/>
            <div className="FRAME_MAIN">{ container }</div>
            <div className="BTM_EMPTY"></div>
            <Footer theme={ props.theme }/>
        </div>
    );
}

export default Stats;