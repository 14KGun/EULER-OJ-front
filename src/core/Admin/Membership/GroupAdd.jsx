import { Component } from 'react';
import Layout from '../Layout';
import axios from '../../Tool/axios';

import svgAdd from '../svg_add.svg';

class Edit extends Component {
    constructor(props){
        super(props);
        this.state = { id: '', name: '' }
    }
    onAdd(){
        if(!this.onCall && this.state.name!=='' && this.state.id!==''){
            this.onCall = true;
            axios.post('/json/admin/membership/group/add', { id: this.state.id, name: this.state.name }).then(({ data }) => {
                if(data.result) alert('새로운 그룹이 추가되었습니다.')
                else alert('그룹 추가를 실패하였습니다.')
                this.onCall = false;
            })
        }
    }
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgAdd } theme={ this.props.theme }>멤버십 그룹 추가</Layout.Title>
                <Layout.Content theme={ this.props.theme }>새로운 멤버십 그룹을 추가합니다.</Layout.Content>
                <Layout.Content theme={ this.props.theme }>그룹장의 ID는 오일러OJ에 존재하여야 하며 다른 그룹에 속할 수 없습니다.</Layout.Content>

                <div style={{ height: '20px' }}/>
                <Layout.Content2 theme={ this.props.theme }>그룹 이름</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.name } onChange={ (x) => this.setState({ name: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>그룹장 ID</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.id } onChange={ (x) => this.setState({ id: x }) }/>
                
                <div style={{ height: '30px' }}/>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', height: '30px', lineHeight: '30px', color: 'white',
                    background: 'rgb(50,140,250)', paddingLeft: '13px', paddingRight: '13px', borderRadius: '15px' }}
                    className="BTNC" onClick={ () => this.onAdd() }>그룹 추가하기</span>
                </div>
            </div>
        )
    }
}

export default Edit;