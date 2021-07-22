import { Component } from 'react';
import Layout from './Layout';
import svgPassword from './svg_password.svg';

class Password extends Component {
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgPassword } theme={ this.props.theme }>비밀번호 변경</Layout.Title>
                <Layout.Content theme={ this.props.theme }>비밀번호를 변경할 수 있습니다. 비밀번호는 최소 6자, 최대 20자까지 입력 가능합니다.</Layout.Content>
                <div style={{ height: '20px' }}/>
                <Layout.Content theme={ this.props.theme }>기존 비밀번호를 입력하세요.</Layout.Content>
                <Layout.Input type="password" theme={ this.props.theme }/>
                <div style={{ height: '20px' }}/>
                <Layout.Content theme={ this.props.theme }>새로운 비밀번호를 입력하세요.</Layout.Content>
                <Layout.Input type="password" theme={ this.props.theme }/>
                <div style={{ height: '20px' }}/>
                <Layout.Content theme={ this.props.theme }>새로운 비밀번호를 다시 한번 입력하세요.</Layout.Content>
                <Layout.Input type="password" theme={ this.props.theme }/>
            </div>
        )
    }
}

export default Password