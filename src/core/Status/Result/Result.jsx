import { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { Helmet } from "react-helmet";
import TaskTable from './ResultTaskTable';
import Editor from './ResultEditor';
import Footer from '../../Frame/Footer/Footer';

import imgSubmit from './img_submit.png';

const Title = (props) => {
    const txtStyle = {
        height: '50px', lineHeight: '50px', display: 'inline-block',
        fontSize: '27px', fontWeight: 700, color: (props.theme === 'light' ? 'black' : 'white')
    }
    const styleImg = {
        width: '50px', height: '50px', verticalAlign: 'middle', marginTop: '-13px'
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
    })

    return (
        <>
            <animated.div style={{ ...style, height: '170px' }}>
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: 'calc(50% - 10px)', height: 'calc(100% - 20px)' }}>
                    <div style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '10px' }}>
                        <span style={ styleTxt1 }>채점 번호</span>
                        <span style={ styleTxt3 }>12345</span>
                    </div>
                    <Link to="/problemset/problem/1001">
                        <animated.div style={{ padding: '10px', borderRadius: '10px', ...background1 }}
                        onMouseEnter={ () => setHover1(true) } onMouseLeave={ () => setHover1(false) }>
                            <span style={ styleTxt1 }>문제</span>
                            <span style={ styleTxt2 }>#1234 - 움직이는 잔나비</span>
                        </animated.div>
                    </Link>
                    <Link>
                        <animated.div style={{ padding: '10px', borderRadius: '10px', ...background2 }}
                        onMouseEnter={ () => setHover2(true) } onMouseLeave={ () => setHover2(false) }>
                            <span style={{ ...styleTxt1, verticalAlign: 'middle' }}>아이디</span>
                            <span style={ styleImg }>
                                <img style={{ width: '100%', height: '100%' }} alt="prof-img"
                                src={ `https://euleroj.io/profile-img/${ 'supernova' }.webp?size=40` }/>
                            </span>
                            <span style={{ ...styleTxt2, verticalAlign: 'middle' }}>supernova</span>
                        </animated.div>
                    </Link>
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: 'calc(50% - 10px)', height: 'calc(100% - 20px)' }}>
                    <div style={{ padding: '10px' }}>
                        <span style={ styleTxt1 }>제출 시각</span>
                        <span style={ styleTxt3 }>2021년 10월 24일 17시 54분</span>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <span style={ styleTxt1 }>제출 언어</span>
                        <span style={ styleTxt2 }>C++</span>
                    </div>
                    <div style={{ paddingTop: '10px', paddingLeft: '10px' }}>
                        <span style={ styleTxt1 }>결과</span>
                        <span style={ styleTxt2 }>123</span>
                    </div>
                </div>
            </animated.div>
            <animated.div style={{ ...style, height: '65px', marginTop: '10px' }}>
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: 'calc(33.3% - 13px)', height: 'calc(100% - 20px)' }}>
                    <div style={{ padding: '10px' }}>
                        <span style={ styleTxt1 }>실행 시간</span>
                        <span style={ styleTxt2 }>0.01 초</span>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '10px', left: 'calc(33.3% + 20px)', width: 'calc(33.3% - 13px)', height: 'calc(100% - 20px)' }}>
                    <div style={{ padding: '10px' }}>
                        <span style={ styleTxt1 }>메모리 사용량</span>
                        <span style={ styleTxt2 }>0.01 초</span>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: 'calc(33.3% - 13px)', height: 'calc(100% - 20px)' }}>
                    <div style={{ padding: '10px' }}>
                        <span style={ styleTxt1 }>소스코드 크기</span>
                        <span style={ styleTxt2 }>10123 자</span>
                    </div>
                </div>
            </animated.div>
        </>
    )
}

class Result extends Component {
    render() {
        return (
            <>
                <Helmet><title>채점 결과 ({ this.props.id }) : 오일러OJ</title></Helmet>
                <div className="FRAME_MAIN ND">
                    <div style={{ height: '100px' }}/>
                    <Title theme={ this.props.theme } img={ imgSubmit } title={ '채점 결과' }/>
                    <Lay1 theme={ this.props.theme } id={ this.props.id }/>
                    
                    <div style={{ height: '70px' }}/>
                    <Title theme={ this.props.theme } img={ imgSubmit } title={ 'Task' }/>
                    <TaskTable theme={ this.props.theme }/>
                    
                    <div style={{ height: '90px' }}/>
                    <Title theme={ this.props.theme } img={ imgSubmit } title={ '소스 코드' }/>
                    <Editor theme={ this.props.theme }/>
                </div>
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
            </>
        );
    }
}

export default Result;