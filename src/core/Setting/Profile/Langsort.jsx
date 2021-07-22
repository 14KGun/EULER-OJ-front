import { Component } from 'react';
import Layout from './Layout';
import svgSort from './svg_sort.svg';

class Langsort extends Component {
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgSort } theme={ this.props.theme }>언어 정렬</Layout.Title>
                <Layout.Content theme={ this.props.theme }>각 언어를 드래그 하면 위치를 바꿀 수 있습니다. 변경 된 순서는 채점과 에디터 페이지에서 사용할 언어의 우선순위에 반영됩니다.</Layout.Content>
            </div>
        )
    }
}

export default Langsort