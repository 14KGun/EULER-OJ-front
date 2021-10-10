import { Component, useState } from 'react';
import Layout from '../Layout';
import axios from '../../Tool/axios';

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
        <span style={{ ...style }} className="BTNC" onClick={ () => props.onClick() }
        onMouseLeave={ () => setHover(false) } onMouseEnter={ () => setHover(true) }>
            <img src={ svgRun } alt="" style={ styleImg }/>
            <span style={ styleTxt }>서버에 Git Pull 수행 명령하기</span>
        </span>
    )
}

const Terminal = (props) => {
    let error = '확인되지 않음';

    if(props.error === undefined) error = '명령 대기 중...';
    else if(props.error) error = props.error;
    else error = '';

    return (
        <div style={{ background: 'rgb(50,50,50)', borderRadius: '15px', overflow: 'hidden' }}>
            <div style={{ background: 'rgb(80,80,80)', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '20px', color: 'white' }}>실행 결과</div>
            <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '16px', fontWeight: 300, color: 'yellow', fontFamily: 'D2Coding' }}>{ error }</div>
                <div style={{ fontSize: '16px', fontWeight: 300, color: 'white', fontFamily: 'D2Coding' }}>{ props.msg }</div>
            </div>
        </div>
    )
}

class Gitpull extends Component {
    constructor(props){
        super(props);
        this.state = { error: undefined, msg: '' }
        this.onCall = false;
    }
    gitpull(){
        if(!this.onCall){
            this.onCall = true;
            this.setState({ msg: '수행 중...' });
            axios.get('/json/admin/problem/gitpull').then(result => {
                this.onCall = false;
                this.setState({ error: result.data.err, msg: result.data.msg });
            })
        }
    }
    render(){
        return (
            <div className="">
                <Layout.Title icon={ svgGitpull } theme={ this.props.theme }>Git pull</Layout.Title>
                <Layout.Content theme={ this.props.theme }>https://github.com/EULER-BRAIN/EULER-OJ-problemset</Layout.Content>
                <Layout.Content theme={ this.props.theme }>에서 OJ 서버로 문제들을 업데이트 합니다.</Layout.Content>
                <div style={{ height: '20px' }}/>
                <PullBtn onClick={ () => this.gitpull() }/>
                <div style={{ height: '20px' }}/>
                <Terminal error={ this.state.error } msg={ this.state.msg }/>
            </div>
        )
    }
}

export default Gitpull