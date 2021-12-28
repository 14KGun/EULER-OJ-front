import { Component } from 'react';
import Layout from '../Layout';
import Loading from '../../Frame/Loading/Loading';
import getHref from '../../Tool/getHref';
import axios from '../../Tool/axios';

import svgEdit from './svg_edit.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>불러오는 중...</div>
        </div>
    )
}

class Edit extends Component {
    constructor(props){
        super(props);
        this.state = { id: undefined, canSubmit: false, canRead: false, spj: false, dataLen: 0 };
    }
    onLoad(problemId){
        this.onCall = true;
        axios.post("/json/admin/problem/editSp/get", { id: problemId }).then(({ data }) => {
            this.setState({ id: data.id, canSubmit: data.canSubmit, canRead: !data.hidden, spj: data.spj, dataLen: data.dataLen }, () => {
                this.onCall = false;
            })
        })
    }
    onClick(){
        if(!this.onCall){
            this.onCall = true;
            axios.post("/json/admin/problem/editSp/edit", { id: this.state.id, canSubmit: this.state.canSubmit, 
            hidden: !this.state.canRead, spj: this.state.spj, dataLen: this.state.dataLen }).then(({ data }) => {
                if(data.result) alert('수정 완료');
                else alert('수정 실패');
                this.onCall = false;
            })
        }
    }
    render(){
        const problemId = getHref.hrefParse().query.id;
        let container = <LoadingLay/>;
        
        if((!this.onCall) && this.state.id !== problemId){
            this.onLoad(problemId);
        }

        container = (
            <div>
                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>특이 사항 설정</Layout.Content2>
                <div style={{ background: (this.props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'), borderRadius: '15px',
                paddingLeft: '30px', paddingRight: '30px', paddingTop: '20px', paddingBottom: '20px' }}>
                    <div>
                        <input type="checkbox" checked={ this.state.canSubmit } onChange={ () => this.setState({ canSubmit: !this.state.canSubmit }) }/>
                        <label style={{ color: (this.props.theme==='light'?'black':'white'), marginLeft: '5px' }}>소스 코드 제출을 허용합니다.</label>
                    </div>
                    <div>
                        <input type="checkbox" checked={ this.state.canRead } onChange={ () => this.setState({ canRead: !this.state.canRead }) }/>
                        <label style={{ color: (this.props.theme==='light'?'black':'white'), marginLeft: '5px' }}>문제를 읽을 수 있습니다.</label>
                    </div>
                    <div>
                        <input type="checkbox" checked={ this.state.spj } onChange={ () => this.setState({ spj: !this.state.spj }) }/>
                        <label style={{ color: (this.props.theme==='light'?'black':'white'), marginLeft: '5px' }}>스페셜 저지</label>
                    </div>
                </div>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>데이터 개수</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.dataLen } onChange={ (x) => this.setState({ dataLen: x }) }/>

                <div style={{ height: '50px' }}/>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="BTNC" onClick={ () => this.onClick() } style={{ height: '30px', lineHeight: '30px', borderRadius: '15px', 
                    paddingLeft: '16px', paddingRight: '16px', color: 'white', background: 'rgb(50,140,250)' }}>수정하기</div>
                </div>
            </div>
        )

        return (
            <div>
                <Layout.Title icon={ svgEdit } theme={ this.props.theme }>문제 수정 - #{ problemId }</Layout.Title>
                { container }
            </div>
        )
    }
}

export default Edit;