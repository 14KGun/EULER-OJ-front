import { Component } from 'react';
import Layout from './Layout';
import svgSocial from './svg_social.svg';

class Social extends Component {
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgSocial } theme={ this.props.theme }>소셜 계정 연동</Layout.Title>
                <Layout.Content theme={ this.props.theme }>소셜 계정을 연동하여 소셜 로그인을 사용할 수 있습니다.<br/>버튼을 눌러 계정 연동을 활성화 또는 비활성화 할 수 있습니다.</Layout.Content>
            </div>
        )
    }
}

export default Social