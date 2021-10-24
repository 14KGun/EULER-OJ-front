import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from '../../Tool/axios';
import Frame from './Lay2Frame';
import Loading from '../../Frame/Loading/Loading';

const ProblemItem = (props) => {
    const [isHover, setHover] = useState(false);

    const itemStyle = useSpring({
        height: '40px', position: 'relative', overflow: 'hidden',
        borderBottom: `1px solid ${ props.theme === 'light' ? 'rgb(220,220,220)' : 'rgb(60,60,60)' }`,
        background: isHover ? 'rgba(150,150,150,0.15)' : 'rgba(150,150,150,0)'
    });
    const txt1Style = {
        position: 'absolute', left: '10px',
        height: '40px', lineHeight: '40px',
        fontSize: '16px', fontWeight: '300', color: (props.theme === 'light' ? 'rgb(70,70,70)' : 'rgb(180,180,180)')
    };
    const txt2Style = {
        position: 'absolute', left: '75px',
        height: '40px', lineHeight: '40px',
        fontSize: '16px', fontWeight: '500', color: (props.theme === 'light' ? 'black' : 'white')
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
        if(this.state.problemList === undefined){
            return (
                <Frame title="새로운 문제" theme={ this.props.theme }>
                    <div style={{ position: 'relative', paddingTop: '100px' }}>
                        <Loading/>
                    </div>
                </Frame>
            );
        }
        else{
            return (
                <Frame title="새로운 문제" theme={ this.props.theme }>
                    { this.state.problemList.map((item, index) => {
                        const title = item.title[0].kr;
                        return <ProblemItem key={ index } id={ item.id } title={ title } submit={ item.source_submit_len } theme={ this.props.theme }/>
                    }) }
                </Frame>
            );

        }
    }
}

export default Problem;