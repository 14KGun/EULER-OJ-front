import { Component, useState } from 'react';
import Layout from '../Layout';
import svgGitpull from '../svg_clouddown.svg';
import svgRun from './svg_run.svg';

const PullBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        paddingLeft: '5px', paddingRight: '12px', display: 'inline-block',
        height: '30px', borderRadius: '15px',
        background: (isHover ? 'rgb(30,110,220)' : 'rgb(50,140,250)')
    }
    const styleImg = {
        verticalAlign: 'middle', marginTop: '-3px'
    }
    const styleTxt = {
        fontSize: '16px', fontWeight: 300, color: 'white', lineHeight: '30px'
    }
    return (
        <span style={{ ...style }} className="BTNC"
        onMouseLeave={ () => setHover(false) } onMouseEnter={ () => setHover(true) }>
            <img src={ svgRun } alt="" style={ styleImg }/>
            <span style={ styleTxt }>서버에 Git Pull 수행 명령하기</span>
        </span>
    )
}

const Terminal = (props) => {
    return (
        <div style={{ background: 'rgb(50,50,50)', borderRadius: '15px', overflow: 'hidden' }}>
            <div style={{ background: 'rgb(50,140,250)', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '15px' }}>실행 결과</div>
            <div style={{ padding: '15px' }}>
                <div style={{ fontSize: '16px', fontWeight: 300, color: 'yellow', fontFamily: 'D2Coding' }}>ERROR : UNDEFINED</div>
                <div style={{ fontSize: '16px', fontWeight: 300, color: 'white', fontFamily: 'D2Coding' }}>명령 대기중</div>
            </div>
        </div>
    )
}

class Gitpull extends Component {
    render(){
        return (
            <div className="">
                <Layout.Title icon={ svgGitpull } theme={ this.props.theme }>Git pull</Layout.Title>
                <Layout.Content theme={ this.props.theme }>https://github.com/EULER-BRAIN/EULER-OJ-problemset</Layout.Content>
                <Layout.Content theme={ this.props.theme }>에서 OJ 서버로 문제들을 업데이트 합니다.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <PullBtn/>
                <div style={{ height: '10px' }}/>
                <Terminal/>
            </div>
        )
    }
}

export default Gitpull