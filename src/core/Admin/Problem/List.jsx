import { Component } from 'react';
import Layout from '../Layout';

import svgList from '../svg_list.svg';

class List extends Component {
    render(){
        return (
            <div className="">
                <Layout.Title icon={ svgList } theme={ this.props.theme }>모든 문제</Layout.Title>
            </div>
        )
    }
}

export default List