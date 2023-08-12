import { Component, useState } from 'react';
import { useSpring, animated } from "@react-spring/web";
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import Loading from '../../Frame/Loading/Loading';
import axios from '../../Tool/axios';

import svgList from '../svg_list.svg';
import svgEdit from './svg_edit.svg';
import svgEditSp from './svg_editSp.svg';
import svgMove from './svg_move.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>문제 찾는 중...</div>
        </div>
    )
}

const ProblemItemBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        height: '30px', paddingLeft: '5px', paddingRight: '5px',
        borderRadius: '10px', marginLeft: '10px',
        background: `rgba(120,120,120,${ isHover ? 0.3 : 0.2 })`,
        config: { duration: 100 }
    });

    return (
        <animated.div style={ style } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <img src={ props.icon } alt="" style={{ verticalAlign: 'middle' }}/>
            <span style={{ display: 'inline-block', height: '30px', lineHeight: '30px', verticalAlign: 'middle',
            color: (props.theme==='light' ? 'black' : 'white') }}>{ props.name }</span>
        </animated.div>
    )
}

const ProblemItem = (props) => {
    const style = useSpring({
        background: (props.theme === 'light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'),
        marginTop: '20px', paddingLeft: '20px', paddingRight: '20px',
        borderRadius: '15px', position: 'relative'
    });

    return (
        <animated.div style={ style }>
            <div style={{ paddingTop: '10px', fontSize: '13px', color: 'gray' }}>#{ props.id }</div>
            <div style={{ fontSize: '17px', fontWeight: 500, color: (props.theme === 'light' ? 'black' : 'white') }}>{ props.title }</div>
            <div style={{ paddingTop: '10px', fontSize: '15px', color: (props.theme === 'light' ? 'black' : 'white') }}>solve = { props.solve } , submit = { props.submit }</div>
            <div style={{ paddingTop: '10px', fontSize: '15px', color: (props.theme === 'light' ? 'black' : 'white') }}>hidden = { props.hidden ? 'true' : 'false' } , canSubmit = { props.canSubmit ? 'true' : 'false' } , spj = { props.spj ? 'true' : 'false' }</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px' }}>
                <Link to={ `/problemset/problem/${ props.id }` }>
                    <ProblemItemBtn theme={ props.theme } icon={ svgMove } name="문제로 이동"/>
                </Link>
                <Link to={ `/nadmin/problem/editSp?id=${ props.id }` }>
                    <ProblemItemBtn theme={ props.theme } icon={ svgEditSp } name="비허용 수정"/>
                </Link>
                <a href={ `/newadmin/problem/edit?id=${ props.id }` }>
                    <ProblemItemBtn theme={ props.theme } icon={ svgEdit } name="수정"/>
                </a>
            </div>
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
                    axios.post(`/json/admin/problem/list/search/`, { str: str }).then(({ data }) => {
                        if(data.str === str){
                            console.log(data.list);
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
            container = this.state.list.map((item, index) => <ProblemItem key={ index } theme={ this.props.theme } { ...item }/>)
        }

        return (
            <div className="">
                <Layout.Title icon={ svgList } theme={ this.props.theme }>모든 문제</Layout.Title>
                <Layout.Content theme={ this.props.theme }>문제를 검색합니다.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <Layout.Input theme={ this.props.theme } type="text"
                value={ this.state.inputValue } onChange={ (x) => this.onSearch(x) }/>
                { container }
            </div>
        )
    }
}

export default List