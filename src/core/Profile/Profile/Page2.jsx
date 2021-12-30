import { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import getHref from '../../Tool/getHref';

const Title = (props) => {
    return (
        <div style={{ fontSize: '27px', fontWeight: 700, color: (props.theme==='light' ? 'black' : 'white'), marginBottom: '6px' }}>{ props.children }</div>
    )
}
const SubTitle = (props) => {
    return (
        <span style={{
            display: 'inline-block', height: '28px', lineHeight: '28px', borderRadius: '14px',
            background: 'rgb(180,180,180)', paddingLeft: '8px', paddingRight: '8px', marginLeft: '5px',
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

const BoxTableItem = (props) => {
    let style = {
        position: 'absolute', top: `${ 16 * props.y + 18 }px`, left: `${ 16 * props.x + 13 }px`,
        width: '11px', height: '11px',
        border: '1px solid rgb(190,190,190)', borderRadius: '4px',
        background: 'rgb(250,250,250)'
    }

    if(props.count === 0) style = { ...style }
    else if(props.count === 1) style = { ...style, backgrond: 'rgb(157,234,190)' }
    else if(props.count === 2) style = { ...style, background: 'rgb(68,215,131)' }
    else if(props.count === 3) style = { ...style, background: 'rgb(36,166,91)' }
    else if(props.count >= 4) style = { ...style, background: 'rgb(27,126,69)' }
    else if(props.count >= 5) style = { ...style, background: 'rgb(17,81,45)' }
    else style = { ...style, visibility: 'hidden' }
    
    return (
        <div style={ style }>
        </div>
    )
}
const BoxTable = (props) => {
    const outArray = [];
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    while(true){
        const date = new Date(props.data[7].year, props.data[7].month-1, props.data[7].day);
        if(date.getDay()===1) break;
        props.data.unshift({ count: -1 });
    }

    const styleTop = {
        position: 'absolute', top: '0px', height: '18px', lineHeight: '18px',
        fontSize: '12px', fontWeight: 300, color: 'rgb(80,80,80)'
    }
    for(var i=0; i<53; i++){
        let text = '';
        for(var j=0; j<7; j++){
            if(i*7+j < props.data.length){
                if(props.data[i*7+j].day === 1) text = `${ props.data[i*7+j].month }월`;
            }
        }
        outArray.push(<div style={{ ...styleTop, left: (16 * i + 13) }}>{ text }</div>);
    }

    const styleLeft = {
        position: 'absolute', left: '0px', height: '16px', lineHeight: '16px',
        fontSize: '12px', fontWeight: 300, color: 'rgb(80,80,80)'
    }
    for(var i=0; i<7; i++){
        if(i%2 === 1){
            const date = new Date(props.data[i+7].year, props.data[i+7].month-1, props.data[i+7].day);
            outArray.push(<div style={{ ...styleLeft, top: ( 16 * i + 18 ) }}>{ week[date.getDay()] }</div>);
        }
    }

    for(var i=0; i<53; i++){
        for(var j=0; j<7; j++){
            outArray.push(<BoxTableItem key={ i*7+j } y={ j } x={ i } count={ i*7+j >= props.data.length ? -1 : props.data[i*7+j].count }/>);
        }
    }

    return (
        <div style={{ width: '100%', height: '130px', position: 'relative' }}>
            { outArray.map((item, index) => item) }
        </div>
    )
}

const IdContainer = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        display: 'inline-block', height: '26px', lineHeight: '26px', borderRadius: '10px',
        paddingLeft: '7px', paddingRight: '7px', marginRight: '7px',
        fontSize: '16px', fontWeight: 300, color: 'black',
        background: 'rgb(200,200,200)'
    }
    const background = useSpring({
        background: isHover ? 'rgb(180,180,180)' : 'rgb(200,200,200)',
        config: { duration: 200 }
    })
    return (
        <Link to={ `/problemset/problem/${ props.id }` }>
            <animated.span style={{ ...style, ...background }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>{ props.id }</animated.span>
        </Link>
    )
}
const BtnSearch = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        display: 'inline-block', height: '28px', lineHeight: '28px', borderRadius: '18px',
        paddingLeft: '9px', paddingRight: '9px',
        fontSize: '16px', fontWeight: 300, color: 'black',
        border: '2px solid rgb(200,200,200)'
    }
    const background = useSpring({
        background: isHover ? 'rgba(220,220,220,1)' : 'rgba(220,220,220,0)',
        config: { duration: 200 }
    })
    return (
        <Link to={ `/status/${ getHref.encodeObject({ loginId: props.id, result: 'accepted' }) }` }>
            <animated.span style={{ ...style, ...background }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>채점 기록으로 보기</animated.span>
        </Link>
    )
}

class Page2 extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="FRAME_MAIN ND" style={{ paddingTop: '50px' }}>
                <Title theme={ this.props.theme }>분석</Title>
                <Container theme={ this.props.theme }>
                    <BoxTable data={ this.props.data.table } count={ this.props.data.tableLength }/>
                    <div style={{ position: 'absolute', top: '0px', bottom: '0px', left: '860px', right: '0px', textAlign: 'center' }}>
                        <div style={{ paddingTop: '30px', fontSize: '15px', fontWeight: 300, color: 'rgb(40,40,40)' }}>최근 1년 간</div>
                        <div>
                            <span style={{fontSize: '20px', fontWeight: 600, color: 'rgb(80,80,80)' }}>{ this.props.data.tableLength }개</span>
                            <span style={{fontSize: '16px', fontWeight: 300, color: 'rgb(100,100,100)' }}>의 문제 맞음 기록</span>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 300, color: 'rgb(150,150,150)' }}>(문제가 중복되어 있을 수 있습니다)</div>
                    </div>
                </Container>

                <div style={{ height: '40px' }}/>
                <Title theme={ this.props.theme }>맞은 문제<SubTitle>{ this.props.data.solve.length }</SubTitle></Title>
                <Container theme={ this.props.theme }>
                    <div style={{ textAlign: 'center', lineHeight: '33px' }}>
                        { this.props.data.solve.map((item, index) => <IdContainer key={ item } id={ item }/>) }
                    </div>
                    <div style={{ textAlign: 'right', marginTop: '10px' }}><BtnSearch id={ this.props.data.id }/></div>
                </Container>
            </div>
        );
    }
}

export default Page2;