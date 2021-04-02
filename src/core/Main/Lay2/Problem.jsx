import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from '../../Tool/axios';
import Frame from './Lay2Frame';
import Loading from '../../Frame/Loading/Loading';

const ProblemItem = (props) => {
    const [isHover, setHover] = useState(false);

    const itemStyle = useSpring({
        height: '40px', position: 'relative',
        borderBottom: '1px solid rgb(220,220,220)',
        background: isHover ? 'rgba(150,150,150,0.15)' : 'rgba(150,150,150,0)'
    });
    const txt1Style = {
        position: 'absolute', left: '10px',
        height: '40px', lineHeight: '40px',
        fontSize: '16px', fontWeight: '300', color: 'rgb(70,70,70)'
    };
    const txt2Style = {
        position: 'absolute', left: '75px',
        height: '40px', lineHeight: '40px',
        fontSize: '16px', fontWeight: '500', color: 'black'
    };

    return(
        <a href={ `/problemset/problem/${ props.id }` }>
            <animated.div style={ itemStyle }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={ txt1Style }>{ '#'+props.id }</div>
                <div style={ txt2Style }>{ props.title }</div>
        </animated.div></a>
    );
}
class Problem extends Component {
    state = { problemList: undefined }
    constructor(props){
        super(props);

        axios.get('/json/main/problemlist').then((problemList) => {
            //console.log(problemList.data);
            this.setState({ problemList: problemList.data });
        });
    }
    render() {
        if(this.state.problemList == undefined){
            return (
                <Frame title="새로운 문제">
                    <div style={{ position: 'relative', paddingTop: '100px' }}>
                        <Loading/>
                    </div>
                </Frame>
            );
        }
        else{
            return (
                <Frame title="새로운 문제">
                    { this.state.problemList.map((item, index) => {
                        const title = item.title[0].kr;
                        return <ProblemItem key={ index } id={ item.id } title={ title } submit={ item.source_submit_len }/>
                    }) }
                </Frame>
            );

        }
    }
}

export default Problem;