import { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from "@react-spring/web";
import { Helmet } from "react-helmet";
import TaskTable from './ResultTaskTable';
import Editor from './ResultEditor';
import Res from '../../Frame/Res/Res';
import Footer from '../../Frame/Footer/Footer';
import Loading from '../../Frame/Loading/Loading';
import axios from '../../Tool/axios';
import socketio from 'socket.io-client';
import trans from '../../Tool/trans';
import resultSummary from './resultSummary';

import svgSubmit from './svg_submit.svg';
import svgTask from './svg_task.svg';
import svgCode from './svg_code.svg';
import svgError from './svg_error.svg';

const Title = (props) => {
    const txtStyle = {
        height: '50px', lineHeight: '50px', display: 'inline-block',
        fontSize: '27px', fontWeight: 700, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const styleImg = {
        width: '35px', height: '35px', verticalAlign: 'middle', marginTop: '-13px', marginRight: '7px'
    }
    return (
        <div style={{ marginBottom: '15px' }}>
            <img style={ styleImg } src={ props.img } alt=""/>
            <span style={ txtStyle }>{ props.title }</span>
        </div>
    )
}

const Lay1 = (props) => {
    const style = useSpring({
        position: 'relative', borderRadius: '15px', overflow: 'hidden',
        background: props.theme === 'light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'
    })
    const styleTxt1 = {
        display: 'inline-block', width: '100px',
        color: 'gray', fontSize: '15px', fontWeight: 400
    }
    const styleTxt2 = {
        fontSize: '16px', fontWeight: 500,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleTxt3 = {
        fontSize: '16px', fontWeight: 400,
        color: (props.theme==='light' ? 'rgb(50,50,50)' : 'rgb(190,190,190)')
    }
    const styleImg = {
        display: 'inline-block', marginRight: '7px', verticalAlign: 'middle', overflow: 'hidden',
        width: '40px', height: '40px', borderRadius: '20px',
        background: 'white', border: '1px solid rgba(120,120,120,0.3)'
    }

    const [isHover1, setHover1] = useState(false);
    const [isHover2, setHover2] = useState(false);
    const background1 = useSpring({
        background: `rgba(120,120,120,${ isHover1 ? 0.1 : 0 })`,
        config: { duration: 100 }
    })
    const background2 = useSpring({
        background: `rgba(120,120,120,${ isHover2 ? 0.1 : 0 })`,
        config: { duration: 100 }
    });

    // get byte from source
    const strByteLength = (s,b,i,c) => {
        for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
        return b
    }

    return (
        <>
            <animated.div style={{ ...style, height: '170px' }}>
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: 'calc(50% - 10px)', height: 'calc(100% - 20px)' }}>
                    <div style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '10px' }}>
                        <span style={ styleTxt1 }>채점 번호</span>
                        <span style={ styleTxt3 }>{ props.id }</span>
                    </div>
                    <Link to={ `/problemset/problem/${ props.problem.id }` }>
                        <animated.div style={{ padding: '10px', borderRadius: '10px', ...background1 }}
                        onMouseEnter={ () => setHover1(true) } onMouseLeave={ () => setHover1(false) }>
                            <span style={ styleTxt1 }>문제</span>
                            <span style={ styleTxt2 }>#{ props.problem.id } - { props.problem.title }</span>
                        </animated.div>
                    </Link>
                    <Link to={ `/profile/${ props.lid }` }>
                        <animated.div style={{ padding: '10px', borderRadius: '10px', ...background2 }}
                        onMouseEnter={ () => setHover2(true) } onMouseLeave={ () => setHover2(false) }>
                            <span style={{ ...styleTxt1, verticalAlign: 'middle' }}>아이디</span>
                            <span style={ styleImg }>
                                <img style={{ width: '100%', height: '100%' }} alt="prof-img"
                                src={ `https://euleroj.io/profile-img/${ props.lid }.webp?size=40` }/>
                            </span>
                            <span style={{ ...styleTxt2, verticalAlign: 'middle' }}>{ props.lid }</span>
                        </animated.div>
                    </Link>
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: 'calc(50% - 10px)', height: 'calc(100% - 20px)' }}>
                    <div style={{ padding: '10px' }}>
                        <span style={ styleTxt1 }>제출 시각</span>
                        <span style={ styleTxt3 }>{ trans.date(new Date(props.date)) }</span>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <span style={ styleTxt1 }>제출 언어</span>
                        <span style={ styleTxt2 }>{ props.compile }</span>
                    </div>
                    <div style={{ paddingTop: '10px', paddingLeft: '10px', position: 'relative', marginTop: '10px' }}>
                        <span style={ styleTxt1 }>결과</span>
                        <div style={{ position: 'absolute', top: '10px', left: '110px', width: '230px' }}>
                            <Res res={ props.res } theme={ props.theme } border={ props.theme==='light' ? '1px solid rgba(120,120,120,0)' : '1px solid rgba(120,120,120,0.8)' }/>
                        </div>
                    </div>
                </div>
            </animated.div>
            <animated.div style={{ ...style, height: '65px', marginTop: '10px' }}>
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: 'calc(33.3% - 13px)', height: 'calc(100% - 20px)' }}>
                    <div style={{ padding: '10px' }}>
                        <span style={ styleTxt1 }>실행 시간</span>
                        <span style={ styleTxt2 }>{ resultSummary(props.res, props.task)[0] }</span>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '10px', left: 'calc(33.3% + 20px)', width: 'calc(33.3% - 13px)', height: 'calc(100% - 20px)' }}>
                    <div style={{ padding: '10px' }}>
                        <span style={ styleTxt1 }>메모리 사용량</span>
                        <span style={ styleTxt2 }>{ resultSummary(props.res, props.task)[1] }</span>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: 'calc(33.3% - 13px)', height: 'calc(100% - 20px)' }}>
                    <div style={{ padding: '10px' }}>
                        <span style={ styleTxt1 }>소스코드 크기</span>
                        <span style={ styleTxt2 }>{ strByteLength(props.source) } Bytes</span>
                    </div>
                </div>
            </animated.div>
        </>
    )
}

const ErrorLay = (props) => {
    const style = useSpring({
        position: 'relative', borderRadius: '15px', overflow: 'hidden',
        background: props.theme === 'light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)',
        paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px',
        fontFamily: 'D2Coding', fontSize: '16px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : 'white')
    })

    if (!props.stderr) return null;
    let text = props.stderr.split('\n').join('<br>').split(' ').join('&nbsp;');
    
    if(text.startsWith('&error;')){
        text = text.substring(13);
        if(text.startsWith('ERROR&nbsp;:&nbsp;runtime&nbsp;error<br>')){
            text = text.replace('ERROR&nbsp;:&nbsp;runtime&nbsp;error','런타임 에러<br>');
        }
        else if(text.startsWith('ERROR&nbsp;:&nbsp;compile&nbsp;error<br>')){
            text = text.replace('ERROR&nbsp;:&nbsp;compile&nbsp;error','컴파일 에러<br>');
        }
        else if(text.startsWith('ERROR&nbsp;:&nbsp;output-limit&nbsp;error<br>')){
            text = text.replace('ERROR&nbsp;:&nbsp;output-limit&nbsp;error','출력 초과 에러<br>');
        }
        else if(text.startsWith('ERROR&nbsp;:&nbsp;compile&nbsp;timeout<br>')){
            text = text.replace('ERROR&nbsp;:&nbsp;compile&nbsp;timeout','컴파일 시간 초과<br>');
        }
        else if(text.startsWith('ERROR&nbsp;:&nbsp;time-limit&nbsp;error<br>')){
            text = text.replace('ERROR&nbsp;:&nbsp;time-limit&nbsp;error','시간 초과<br>');
        }
        else if(text.startsWith('ERROR&nbsp;:&nbsp;memory-limit&nbsp;error<br>')){
            text = text.replace('ERROR&nbsp;:&nbsp;memory-limit&nbsp;error','메모리 초과<br>');
        }
        else return null;

        return (
            <div>
                <div style={{ height: '70px' }}/>
                <Title theme={ props.theme } img={ svgError } title={ '경고 메시지' }/>
                <animated.div style={ style } dangerouslySetInnerHTML={{ __html: text }}/>
            </div>
        )
    }

    return null;
}

class Result extends Component {
    constructor(props) {
        super(props);
        this.socket = socketio('https://euleroj.io');
        this.state = { }
    }
    render() {
        if(!this.load) {
            if(this.state.id !== this.props.id || this.state.needLoad){
                this.load = true;
                axios.get(`/json/status/getResult/${ this.props.id }`).then(({ data }) => {
                    this.setState({
                        err: data.err, id: data.id, problem: data.problem, stderr: data.stderr,
                        lid: data.lid, compile: data.compile, status: data.status, date: data.time,
                        task: data.task, source: data.source, editor: data.editor
                    }, () => {
                        this.load = false;
                        this.socket.emit('joinRoom', `status_res_${ this.props.id }`);
                        this.socket.emit('status_res_reload', this.props.id);
                        this.socket.on('update_status_restask', (msg) => {
                            if(this.state.id !== msg.id) return;
                            if(this.state.status.indexOf('wait') !== -1){
                                if(msg.res.indexOf('wait') !== -1){
                                    const prev = Number(this.state.status.substr(5));
                                    const next = Number(msg.res.substr(5));
                                    if(prev >= next) return;
                                }
                                else{
                                    this.setState({ needLoad: true });
                                }
                                this.setState({ status: msg.res, task: msg.task });
                            }
                        });
                    });
                });
            }
        }

        if(!this.state.id){
            return (
                <>
                    <Helmet><title>채점 결과 ({ this.props.id }) : 오일러OJ</title></Helmet>
                    <div className="FRAME_MAIN ND">
                        <div style={{ height: '100px' }}/>
                        <Title theme={ this.props.theme } img={ svgSubmit } title={ '채점 결과' }/>
                        <div style={{ height: '100px' }}/>
                        <Loading/>
                        <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
                    </div>
                </>
            )
        }
        else if(this.state.err){
            return (
                <>
                    <Helmet><title>채점 결과 ({ this.props.id }) : 오일러OJ</title></Helmet>
                    <div className="FRAME_MAIN ND">
                        <div style={{ height: '100px' }}/>
                        <Title theme={ this.props.theme } img={ svgSubmit } title={ '채점 결과' }/>
                        <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px',
                        color: (this.props.theme==='light' ? 'black' : 'white') }}>해당 채점 결과는 존재하지 않습니다.</div>
                    </div>
                </>
            )
        }
        else{
            return (
                <>
                    <Helmet><title>채점 결과 ({ this.props.id }) : 오일러OJ</title></Helmet>
                    <div className="FRAME_MAIN ND">
                        <div style={{ height: '100px' }}/>
                        <Title theme={ this.props.theme } img={ svgSubmit } title={ '채점 결과' }/>
                        <Lay1 theme={ this.props.theme } id={ this.state.id } problem={ this.state.problem } lid={ this.state.lid }
                        date={ this.state.date } compile={ this.state.compile } res={ this.state.status }
                        task={ this.state.task } source={ this.state.source }/>

                        <ErrorLay stderr={ this.state.stderr } theme={ this.props.theme }/>
                        
                        <div style={{ height: '70px' }}/>
                        <Title theme={ this.props.theme } img={ svgTask } title={ '테스트 케이스' }/>
                        <TaskTable theme={ this.props.theme } task={ this.state.task }/>
                        
                        <div style={{ height: '90px' }}/>
                        <Title theme={ this.props.theme } img={ svgCode } title={ '소스 코드' }/>
                        <Editor theme={ this.props.theme } id={ this.state.id } problem={ this.state.problem }
                        lang={ this.state.compile } option={ this.state.editor } source={ this.state.source }/>
                    </div>
                    <div className="BTM_EMPTY"/>
                    <Footer theme={ this.props.theme }/>
                </>
            );
        }
    }
    componentWillUnmount(){
        if(this.socket) this.socket.disconnect();
    }
}

export default Result;