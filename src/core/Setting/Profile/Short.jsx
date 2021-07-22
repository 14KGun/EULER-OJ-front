import { Component } from 'react';
import Layout from './Layout';
import svgShort from './svg_short.svg';

class Short extends Component {
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgShort } theme={ this.props.theme }>문제 클릭시 에디터로 바로 이동</Layout.Title>
                <Layout.Content theme={ this.props.theme }>문제 클릭시 에디터로 바로 이동합니다</Layout.Content>
            </div>
        )
    }
}

export default Short