import { Component } from 'react';
import Layout from '../Layout';

import svgTree from '../svg_tree.svg';

const TableTop = (props) => {
    const style = {
        height: '40px', lineHeight: '40px',
        fontSize: '15px', fontWeight: 400,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    return (
        <div style={{ display: 'flex', borderBottom: '2px solid gray', overflow: 'hidden' }}>
            <div style={{ ...style, width: '2%' }}></div>
            <div style={{ ...style, width: '10%' }}>id(Int)</div>
            <div style={{ ...style, width: '15%' }}>name(Object)</div>
            <div style={{ ...style, width: '20%' }}>prop1-mom(Int)</div>
            <div style={{ ...style, width: '31%' }}>prop2-child(Array)</div>
            <div style={{ ...style, width: '20%' }}></div>
            <div style={{ ...style, width: '2%' }}></div>
        </div>
    )
}
const TableItem = (props) => {
    const style = {
        background: 'none', outline: 'none', border: 'none',
        height: '40px', lineHeight: '40px',
        fontSize: '15px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    return (
        <div style={{ display: 'flex', borderBottom: '1px solid gray', overflow: 'hidden' }}>
            <div style={{ ...style, width: '2%' }}></div>
            <input style={{ ...style, width: '10%' }}/>
            <input style={{ ...style, width: '15%' }}/>
            <input style={{ ...style, width: '20%' }}/>
            <input style={{ ...style, width: '31%' }}/>
            <div style={{ ...style, width: '20%' }}/>
            <div style={{ ...style, width: '2%' }}/>
        </div>
    )
}

const MakeNewNode = (props) => {
    const style = {
        borderRadius: '15px', overflow: 'hidden',
        background: (props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)')
    };
    return (
        <div style={ style }>
            <TableTop theme={ props.theme }/>
            <TableItem theme={ props.theme }/>
        </div>
    )
}
const TagList = (props) => {
    const style = {
        borderRadius: '15px', overflow: 'hidden',
        background: (props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)')
    };
    return (
        <div style={ style }>
            <TableTop theme={ props.theme }/>
            <TableItem theme={ props.theme }/>
            <TableItem theme={ props.theme }/>
        </div>
    )
}
class Tree extends Component {
    update(){

    }
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgTree } theme={ this.props.theme }>태그 추가 및 수정</Layout.Title>
                <div style={{ height: '20px' }}/>
                <Layout.Content2 theme={ this.props.theme }>새로운 태그 추가</Layout.Content2>
                <div style={{ height: '10px' }}/>
                <Layout.Content theme={ this.props.theme }>새로운 태그를 추가합니다. 기존 태그와 id는 중복될 수 없습니다.</Layout.Content>
                <MakeNewNode theme={ this.props.theme } update={ () => this.update() }/>
                <div style={{ height: '30px' }}/>

                <Layout.Content2 theme={ this.props.theme }>기존 태그 수정</Layout.Content2>
                <div style={{ height: '10px' }}/>
                <TagList theme={ this.props.theme } update={ () => this.update() }/>
            </div>
        );
    }
}

export default Tree;