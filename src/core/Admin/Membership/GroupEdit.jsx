import { Component } from 'react';
import Layout from '../Layout';
import axios from '../../Tool/axios';
import getHref from '../../Tool/getHref';

import svgEdit from './svg_edit.svg';

class Edit extends Component {
    constructor(props){
        super(props);
        this.state = { id: undefined , leader: '', name: '' }
    }
    onDelete(){
        if(!this.onCall && this.state.id){
            this.onCall = true;
            axios.post('/json/admin/membership/group/remove', { id: this.state.id }).then(({ data }) => {
                if(data.result) alert('그룹이 삭제되었습니다.')
                else alert('삭제를 실패하였습니다.')
                this.onCall = false;
            })
        }
    }
    onEdit(){
        if(!this.onCall && this.state.name!==''){
            this.onCall = true;
            axios.post('/json/admin/membership/group/edit', { id: this.state.id, name: this.state.name }).then(({ data }) => {
                if(data.result) alert('수정되었습니다.')
                else alert('수정을 실패하였습니다.')
                this.onCall = false;
            })
        }
    }
    render(){
        const id = getHref.hrefParse().query.id;

        if(!this.onCall && this.state.id !== id){
            this.onCall = true;
            axios.post('/json/admin/membership/group/info', { id: id }).then(({ data }) => {
                if(data.result){
                    this.setState({ id: data.result._id, name: data.result.name, leader: data.result.leader }, () => {
                        this.onCall = false;
                    });
                }
            })
        }

        return (
            <div className="ND">
                <Layout.Title icon={ svgEdit } theme={ this.props.theme }>멤버십 그룹 수정</Layout.Title>
                <Layout.Content theme={ this.props.theme }>기존 멤버십 그룹을 수정합니다.</Layout.Content>

                <div style={{ height: '20px' }}/>
                <Layout.Content2 theme={ this.props.theme }>그룹 이름</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.name } onChange={ (x) => this.setState({ name: x }) }/>

                <div style={{ height: '50px' }}/>
                <Layout.Content2 theme={ this.props.theme }>그룹장 ID</Layout.Content2>
                <Layout.Input theme={ this.props.theme } value={ this.state.leader }/>
                
                <div style={{ height: '30px' }}/>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', height: '30px', lineHeight: '30px', color: 'white',
                    background: 'red', paddingLeft: '13px', paddingRight: '13px', borderRadius: '15px' }}
                    className="BTNC" onClick={ () => this.onDelete() }>삭제</span>

                    <span style={{ display: 'inline-block', height: '30px', lineHeight: '30px', color: 'white', marginLeft: '10px',
                    background: 'rgb(50,140,250)', paddingLeft: '13px', paddingRight: '13px', borderRadius: '15px' }}
                    className="BTNC" onClick={ () => this.onEdit() }>수정</span>
                </div>
            </div>
        )
    }
}

export default Edit;