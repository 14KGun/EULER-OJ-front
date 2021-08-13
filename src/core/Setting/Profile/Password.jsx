import { Component } from 'react';
import axios from '../../Tool/axios';
import possibleInput from '../../Tool/possibleInput';
import Layout from './Layout';
import svgPassword from './svg_password.svg';

class Password extends Component {
    constructor(props){
        super(props);
        this.state = { input1: '', input2: '', input3: '', msg: '', msgcolor: 'red' }
        this.oncall = false;
    }
    onChange(key, value){
        const obj = {};
        obj[key] = value;
        this.setState(obj);
    }
    onClick(){
        if(this.state.input1 === '' || this.state.input2 === '' || this.state.input3 === ''){
            this.setState({ msg: '입력란이 비어있습니다.', msgcolor: 'red' });
        }
        else if(this.state.input2 !== this.state.input3){
            this.setState({ msg: '새로운 비밀번호가 서로 일치하지 않습니다.', msgcolor: 'red' });
        }
        else if(possibleInput.password(this.state.input2) === false){
            this.setState({ msg: '불가능한 비밀번호 입니다.', msgcolor: 'red' });
        }
        else if(this.state.input1 === this.state.input2){
            this.setState({ msg: '기존 비밀번호와 변경하고자 하는 비밀번호가 일치합니다.', msgcolor: 'red' });
        }
        else if(this.oncall);
        else{
            this.oncall = true;
            axios.post('/json/setting/profile/password/edit', { ori: this.state.input1, content: this.state.input2 }).then((result) => {
                let state = {};
                if(result.data.err === 'incorrect') state = { msg: '기존 비밀번호가 일치하지 않습니다.', msgcolor: 'red' };
                else if(result.data.err) state = { msg: '서버 오류로 비밀번호 변경이 불가능 합니다.', msgcolor: 'red' };
                else if(result.data.content === 'done') state = { msg: '비밀번호가 성공적으로 변경되었습니다.', msgcolor: 'green' };
                this.setState(state, () => { this.oncall = false })
            });
        }
    }
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgPassword } theme={ this.props.theme }>비밀번호 변경</Layout.Title>
                <Layout.Content theme={ this.props.theme }>비밀번호를 변경할 수 있습니다. 비밀번호는 최소 6자, 최대 20자까지 입력 가능합니다.</Layout.Content>
                <div style={{ height: '20px' }}/>
                <Layout.Content theme={ this.props.theme }>기존 비밀번호를 입력하세요.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <Layout.Input type="password" theme={ this.props.theme } value={ this.state.input1 } onChange={ (x) => this.onChange('input1', x) }/>
                <div style={{ height: '20px' }}/>
                <Layout.Content theme={ this.props.theme }>새로운 비밀번호를 입력하세요.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <Layout.Input type="password" theme={ this.props.theme } value={ this.state.input2 } onChange={ (x) => this.onChange('input2', x) }/>
                <div style={{ height: '20px' }}/>
                <Layout.Content theme={ this.props.theme }>새로운 비밀번호를 다시 한번 입력하세요.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <Layout.Input type="password" theme={ this.props.theme } value={ this.state.input3 } onChange={ (x) => this.onChange('input3', x) }/>
                <div style={{ height: '10px' }}/>
                <div style={{ fontSize: '16px', fontWeight: 300, color: this.state.msgcolor, textAlign: 'right' }}>{ this.state.msg }</div>
                <div style={{ height: '10px' }}/>
                <Layout.SubmitBtnLay onClick={ () => this.onClick() }/>
            </div>
        )
    }
}

export default Password