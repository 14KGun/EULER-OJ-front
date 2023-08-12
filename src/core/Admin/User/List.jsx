import { Component, useState } from 'react';
import { useSpring, animated } from "@react-spring/web";
import Layout from '../Layout';
import Loading from '../../Frame/Loading/Loading';
import axios from '../../Tool/axios';

import svgPeople from '../svg_people.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>유저 찾는 중...</div>
        </div>
    )
}

const UserItem = (props) => {
    const style = useSpring({
        background: (props.theme === 'light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'),
        marginTop: '20px', paddingLeft: '20px', paddingRight: '20px',
        borderRadius: '15px', position: 'relative', height: '100px'
    });

    return (
        <animated.div style={ style }>
            <div style={{ position: 'absolute', top: '15px', left: '15px', width: '40px', height: '40px', borderRadius: '20px', background: 'white', overflow: 'hidden' }}>
                <img style={{ width: '100%', height: '100%' }} src={ `https://euleroj.io/profile-img/${ props.id }.webp?size=40` } alt=""/>
            </div>
            <div style={{ position: 'absolute', top: '15px', left: '63px', height: '40px', lineHeight: '40px',
            fontSize: '16px', fontWeight: 400, color: (props.theme==='light' ? 'black' : 'white') }}>{ props.id }</div>
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', fontSize: '14px', fontWeight: 300, 
            color: (props.theme==='light' ? 'black' : 'white') }}>{ `{ solve: ${ props.solve }, submit: ${ props.submit }, naverBlog: ${ props.naverBlog !== '' ? props.naverBlog : 'undefined' } }` }</div>
        </animated.div>
    )
}

class List extends Component {
    constructor(props){
        super(props);
        this.state = { inputValue: '', resultValue: '', list: [] }
    }
    onSearch(str){
        if (str.length <= 30) {
            this.setState({ inputValue: str, list: [] }, () => {
                if(str.length >= 1){
                    axios.get(`/json/admin/user/search/${ str }`).then(({ data }) => {
                        if(data.str === str){
                            this.setState({ resultValue: data.str, list: data.list });
                        }
                    })
                }
            });
        }
    }
    render(){
        let container = <LoadingLay/>;

        if(this.state.inputValue === this.state.resultValue) {
            container = this.state.list.map((item, index) => <UserItem key={ index } theme={ this.props.theme } { ...item }/>)
        }

        return (
            <div className="ND">
                <Layout.Title icon={ svgPeople } theme={ this.props.theme }>유저 정보 수정</Layout.Title>
                <Layout.Content theme={ this.props.theme }>정보를 수정할 유저의 아이디를 입력하세요.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <Layout.Input theme={ this.props.theme } type="text"
                value={ this.state.inputValue } onChange={ (x) => this.onSearch(x) }/>
                { container }
            </div>
        )
    }
}

export default List
