import { Component } from 'react';
import Layout from '../Layout';
import axios from '../../Tool/axios';

import svgAdd from '../svg_add.svg';
import svgTrue from './svg_true.svg';
import svgFalse from './svg_false.svg';

const Sample = (props) => {
    return (
        <div style={{ position: 'relative', height: '150px' }}>
            <div style={{ width: '50%', height: '100%', float: 'left' }}>
                <textarea style={{ width: 'calc(100% - 20px)', height: 'calc(100% - 20px)', resize: 'none', padding: '10px',
                background: 'none', color: (props.theme==='light' ? 'black' : 'white') }} value={ props.in }
                onChange={ (e) => props.inChange(e.target.value) }/>
            </div>
            <div style={{ width: '50%', height: '100%', float: 'left' }}>
                <textarea style={{ width: 'calc(100% - 20px)', height: 'calc(100% - 20px)', resize: 'none', padding: '10px',
                background: 'none', color: (props.theme==='light' ? 'black' : 'white') }} value={ props.out }
                onChange={ (e) => props.outChange(e.target.value) }/>
            </div>
        </div>
    )
}

class Add extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '', title: '', tag: '', memo: '', 
            time: '1.0', memory: '512', 
            input: 'Standard Input', output: 'Standard Output',
            sample1Input: '', sample1Output: '',
            sample2Input: '', sample2Output: '',
            sample3Input: '', sample3Output: '',
            sample4Input: '', sample4Output: '',
            sample5Input: '', sample5Output: '',
            youtube: '', blog: '', canSubmit: true, dataLen: '',
            checkId: undefined, check: { cid: false, chtml: false, cdata: 0 }
        }
    }
    onCheck(){
        if(!this.onCall){
            this.onCall = true;
            
            axios.post('/json/admin/problem/add/check', { id: this.state.id }).then(({ data }) => {
                this.setState({ checkId: data.id, check: data.token }, () => {
                    this.onCall = false;
                })
            })
        }
    }
    onAdd(){
        if(!this.onCall){
            this.onCall = true;
            axios.post('/json/admin/problem/add/try', { id: this.state.id, title: this.state.title, memo: this.state.memo,
            time: this.state.time, memory: this.state.memory, input: this.state.input, output: this.state.output,
            ex1in: this.state.sample1Input, ex1out: this.state.sample1Output, ex2in: this.state.sample2Input, ex2out: this.state.sample2Output,
            ex3in: this.state.sample3Input, ex3out: this.state.sample3Output, ex4in: this.state.sample4Input, ex4out: this.state.sample4Output,
            ez5in: this.state.sample5Input, ex5out: this.state.sample5Output, youtube: this.state.youtube, blog: this.state.blog,
            cansubmit: this.state.canSubmit, data: this.state.check.cdata }).then(({data}) => {

            })
        }
    }
    render(){
        let bottom = (
            <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'inline-block', height: '30px', lineHeight: '30px', color: 'white',
                background: 'rgb(50,140,250)', paddingLeft: '13px', paddingRight: '13px', borderRadius: '15px' }}
                className="BTNC" onClick={ () => this.onCheck() }>검사 진행하기</span>
            </div>
        )

        if(this.state.checkId == this.state.id && this.state.check.cid && this.state.check.chtml && this.state.cdata > 0){
            bottom = (
                <div>

                </div>
            )
        }
        return (
            <div className="">
                <Layout.Title icon={ svgAdd } theme={ this.props.theme }>새로운 문제 추가</Layout.Title>

                <div style={{ height: '20px' }}/>
                <Layout.Content2 theme={ this.props.theme }>문제 id</Layout.Content2>
                <Layout.Content theme={ this.props.theme }>(다른 문제와 중복될 수 없습니다)</Layout.Content>
                <Layout.Input theme={ this.props.theme } value={ this.state.id } onChange={ (x) => this.setState({ id: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>제목</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.title } onChange={ (x) => this.setState({ title: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>태그</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.tag } onChage={ () => {} }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>메모</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.memo } onChange={ (x) => this.setState({ memo: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>시간 제한</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.time } onChange={ (x) => this.setState({ time: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>메모리 제한</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.memory } onChange={ (x) => this.setState({ memory: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>입력 형식</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.input } onChange={ () => {} }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>출력 형식</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.output } onChange={ () => {} }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>입출력 예제 - 1</Layout.Content2>
                <Sample theme={ this.props.theme } in={ this.state.sample1Input } out={ this.state.sample1Output }
                inChange={ (x) => this.setState({ sample1Input: x }) } outChange={ (x) => this.setState({ sample1Output: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>입출력 예제 - 2</Layout.Content2>
                <Sample theme={ this.props.theme } in={ this.state.sample2Input } out={ this.state.sample2Output }
                inChange={ (x) => this.setState({ sample2Input: x }) } outChange={ (x) => this.setState({ sample2Output: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>입출력 예제 - 3</Layout.Content2>
                <Sample theme={ this.props.theme } in={ this.state.sample3Input } out={ this.state.sample3Output }
                inChange={ (x) => this.setState({ sample3Input: x }) } outChange={ (x) => this.setState({ sample3Output: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>입출력 예제 - 4</Layout.Content2>
                <Sample theme={ this.props.theme } in={ this.state.sample4Input } out={ this.state.sample4Output }
                inChange={ (x) => this.setState({ sample4Input: x }) } outChange={ (x) => this.setState({ sample4Output: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>입출력 예제 - 5</Layout.Content2>
                <Sample theme={ this.props.theme } in={ this.state.sample5Input } out={ this.state.sample5Output }
                inChange={ (x) => this.setState({ sample5Input: x }) } outChange={ (x) => this.setState({ sample5Output: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>유튜브</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.youtube } onChange={ (x) => this.setState({ youtube: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>블로그</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.blog } onChange={ (x) => this.setState({ blog: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>제출 가능 여부</Layout.Content2>
                <div style={{ background: (this.props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'), borderRadius: '15px',
                paddingLeft: '30px', paddingRight: '30px', paddingTop: '20px', paddingBottom: '20px' }}>
                    <input type="checkbox" checked={ this.state.canSubmit } onChange={ () => this.setState({ canSubmit: !this.state.canSubmit }) }/>
                    <label style={{ color: (this.props.theme==='light'?'black':'white'), marginLeft: '5px' }}>이 문제는 제출이 가능합니다</label>
                </div>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>문제 추가 가능 검사</Layout.Content2>
                <div style={{ background: (this.props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'), borderRadius: '15px',
                paddingLeft: '30px', paddingRight: '30px', paddingTop: '20px', paddingBottom: '20px' }}>
                    <div>
                        <img src={ this.state.checkId == this.state.id && this.state.check.cid ? svgTrue : svgFalse } alt="" style={{ verticalAlign: 'middle', height: '20px' }}/>
                        <label style={{ color: (this.props.theme==='light'?'black':'white'), marginLeft: '5px', verticalAlign: 'middle' }}>ID 중복 검사</label>
                    </div>
                    <div>
                        <img src={ this.state.checkId == this.state.id && this.state.check.chtml ? svgTrue : svgFalse } alt="" style={{ verticalAlign: 'middle', height: '20px' }}/>
                        <label style={{ color: (this.props.theme==='light'?'black':'white'), marginLeft: '5px', verticalAlign: 'middle' }}>채점 서버에 데이터 존재 여부 검사</label>
                    </div>
                    <div>
                        <img src={ this.state.checkId == this.state.id && this.state.check.cdata > 0 ? svgTrue : svgFalse } alt="" style={{ verticalAlign: 'middle', height: '20px' }}/>
                        <label style={{ color: (this.props.theme==='light'?'black':'white'), marginLeft: '5px', verticalAlign: 'middle' }}>문제 HTML 파일 존재 여부 검사</label>
                    </div>
                </div>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>데이터 개수</Layout.Content2>
                <Layout.Content theme={ this.props.theme }>(검사 후 자동 측정됨)</Layout.Content>
                <Layout.Input theme={ this.props.theme } value={ this.state.dataLen } onChange={ () => {} }/>
                
                <div style={{ height: '30px' }}/>
                { bottom }
            </div>
        )
    }
}

export default Add