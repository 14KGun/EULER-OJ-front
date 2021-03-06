import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Layout from '../Layout';
import Loading from '../../Frame/Loading/Loading';
import axios from '../../Tool/axios';

import svgAdd from '../svg_add.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>요청된 블로깅 링크 확인하는 중...</div>
        </div>
    )
}
const Item = (props) => {
    const [oncall, setOncall] = useState('false');
    const [resMsg, setResMsg] = useState('');
    const [name, setName] = useState(props.name);
    const [url, setUrl] = useState(props.url);
    const [loginId, setLoginId] = useState(props.login_id);
    const [problemId, setProblemId] = useState(props.problem_id);
    const style = useSpring({
        background: (props.theme === 'light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'),
        marginTop: '20px', paddingLeft: '20px', paddingRight: '20px',
        borderRadius: '15px', position: 'relative'
    });
    const styleT1 = {
        position: 'absolute', top: '0px', left: '0px',
        height: '30px', lineHeight: '30px',
        fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleT2 = {
        position: 'absolute', top: '0px', left: '100px', right: '0px', width: 'calc(100% - 120px)',
        height: '30px', lineHeight: '30px', paddingLeft: '5px', paddingRight: '5px',
        fontSize: '16px', fontWeight: 300,
        border: '1px solid gray', outline: 'none',
        background: (props.theme==='light' ? 'white' : 'black'),
        color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleBtn = {
        position: 'absolute', bottom: '15px',
        height: '30px', lineHeight: '30px', paddingLeft: '15px', paddingRight: '15px',
        fontSize: '16px', fontWeight: 300, color: 'white', borderRadius: '15px'
    }

    const onClick = (accepted) => {
        axios.post('/json/admin/blogging/push', {
            url: url, loginId: loginId, problemId: problemId,
            name: name, id: props._id, accepted: accepted
        }).then(({ data }) => {
            setOncall('end');
            if(data.msg) setResMsg(data.msg);
        });
    }
    const onClickUserUpdate = () => {
        axios.post('/json/admin/blogging/userupdate/naverblog', {
            loginId: loginId, blogUrl: props.blog_url
        }).then(({ data }) => {
            // console.log(data);
        });
    }

    let bottom = '';
    if(oncall === 'false'){
        bottom = (
            <>
                <div style={{ ...styleBtn, right: '20px', background: 'green' }} className="BTNC"
                onClick={ () => onClick('yes') }>수락</div>
                <div style={{ ...styleBtn, right: '85px', background: 'orange' }} className="BTNC"
                onClick={ () => onClick('no') }>거절</div>
                <div style={{ ...styleBtn, right: '150px', background: 'red' }} className="BTNC"
                onClick={ () => onClick('delete') }>삭제</div>
            </>
        )
    }
    else if(oncall === 'end'){
        bottom = (
            <div style={{ position: 'absolute', bottom: '15px', right: '20px',
            fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white') }}>{ resMsg }</div>
        )
    }

    return (
        <>
            <animated.div style={ style }>
                <div style={{ height: '10px' }}/>
                <div style={{ position: 'relative', height: '30px' }}>
                    <div style={{ position: 'absolute', height: '30px', top: '0px', left: '0px', width: 'calc(50% - 10px)' }}>
                        <div style={ styleT1 }>유저 아이디</div>
                        <input style={ styleT2 } value={ loginId } onChange={ (e) => setLoginId(e.target.value) }/>
                    </div>
                    <div style={{ position: 'absolute', height: '30px', top: '0px', left: '50%', width: '50%' }}>
                        <div style={ styleT1 }>문제</div>
                        <input style={ styleT2 } value={ problemId } onChange={ (e) => setProblemId(e.target.value) }/>
                    </div>
                </div>
                <div style={{ position: 'relative', height: '30px', marginTop: '10px' }}>
                    <div style={ styleT1 }>이름</div>
                    <input style={ styleT2 } value={ name } onChange={ (e) => setName(e.target.value) }/>
                </div>
                <div style={{ position: 'relative', height: '30px', marginTop: '10px' }}>
                    <div style={ styleT1 }>링크</div>
                    <input style={ styleT2 } value={ url }/>
                </div>
                <div style={{ position: 'relative', height: '30px', marginTop: '10px' }}>
                    <div style={ styleT1 }>요청자</div>
                        <input style={{ ...styleT2, background: 'rgba(120,120,120,0.1)' }} value="서버가 자동 검색함"/>
                </div>
                <div style={{ height: '60px' }}/>
                <a href={ url } target="_blank" rel="noreferrer">
                    <div style={{ ...styleBtn, left: '20px', background: 'gray' }} className="BTNC">새 탭에서 링크 열기</div>
                </a>
                { bottom }
            </animated.div>
            <animated.div style={{ ...style, display: (resMsg==='작업이 처리됨, 유저의 블로그에 등록할까요?' ? 'block' : 'none') }}>
                <div style={{ height: '15px' }}/>
                <div style={{ fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white') }}>유저 "{ loginId }"의 블로그 주소로 "{ props.blog_url }"을 저장할까요?</div>
            
                <div style={{ height: '60px' }}/>
                <div style={{ ...styleBtn, right: '20px', background: 'green' }} className="BTNC"
                onClick={ () => { setResMsg('작업이 처리됨'); onClickUserUpdate(); } }>수락</div>
                <div style={{ ...styleBtn, right: '85px', background: 'orange' }} className="BTNC"
                onClick={ () => setResMsg('작업이 처리됨') }>거절</div>
            </animated.div>
        </>
    )
}
class Pull extends Component {
    constructor(props){
        super(props);
        this.state={};
        axios.get('/json/admin/blogging/pull').then(({ data }) => {
            if(data.list){
                this.setState({ list: data.list });
            }
        })
    }
    render(){
        let container = <LoadingLay/>;

        if(this.state.list){
            container = [];
            this.state.list.forEach((item, index) => {
                container.push(
                    <Item key={ index } theme={ this.props.theme } { ...item }/>
                )
            });
        }

        return (
            <div className="ND">
                <Layout.Title icon={ svgAdd } theme={ this.props.theme }>요청된 블로깅 링크</Layout.Title>
                <Layout.Content theme={ this.props.theme }>자동 검색된 블로깅 링크 또는 요청된 블로깅 링크를 처리합니다.</Layout.Content>
                <div style={{ height: '20px' }}/>
                { container }
            </div>
        )
    }
}

export default Pull