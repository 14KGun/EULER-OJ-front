import { Component } from 'react';
import Layout from './Layout';
import svgEditor from './svg_editor.svg';
import svgFont from './svg_font.svg';

class Editor extends Component {
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgEditor } theme={ this.props.theme }>에디터</Layout.Title>
                <Layout.Content theme={ this.props.theme }>소셜 계정을 연동하여 소셜 로그인을 사용할 수 있습니다.<br/>버튼을 눌러 계정 연동을 활성화 또는 비활성화 할 수 있습니다.</Layout.Content>
                <Layout.Margin/>
                <Layout.Title icon={ svgFont } theme={ this.props.theme }>에디터 폰트</Layout.Title>
                <Layout.Content theme={ this.props.theme }>에디터 내부의 폰트를 설정합니다.</Layout.Content>
            </div>
        )
    }
}

export default Editor