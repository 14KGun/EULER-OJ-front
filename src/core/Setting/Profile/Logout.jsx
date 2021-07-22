import { Component } from 'react';
import Layout from './Layout';
import svgLogout from './svg_logout.svg';

class Logout extends Component {
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgLogout } theme={ this.props.theme }>로그아웃</Layout.Title>
                <Layout.Content theme={ this.props.theme }>로그아웃 할까요?</Layout.Content>
            </div>
        )
    }
}

export default Logout