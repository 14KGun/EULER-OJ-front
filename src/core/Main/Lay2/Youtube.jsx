import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from '../../Tool/axios';
import Frame from './Lay2Frame';
import Loading from '../../Frame/Loading/Loading';

const YoutubeItem = (props) => {
    const [isHover, setHover] = useState(false);

    const top = props.position[0]*205;
    const left = props.position[1]*173;
    const itemStyle = useSpring({
        position: 'absolute', overflow: 'hidden',
        textAlign: 'left', textAlignLast: 'left',
        background: ( props.theme === 'light' ? 'rgb(240,240,240)' : 'rgb(45,45,45)' ),
        borderRadius: '15px',
        top: `${ top }px`, left: `${ left }px`,
        width: `160px`, height: `190px`,
        boxShadow: isHover ? '0 0 5px 5px rgba(0,0,0,0.1)' : '0 0 5px 5px rgba(0,0,0,0)',
        border: isHover ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(0,0,0,0)',
        transform: `scale(${ isHover ? 1.03 : 1.0 })`,
        config: { duration: 150 }
    });
    const imgStyle = {
        width: '100%', height: '90px', objectFit: 'cover'
    };
    const titleStyle = {
        position: 'absolute', overflow: 'hidden', textOverflow: 'ellipsis', 
        top: '100px', bottom: '30px', left: '15px', right: '15px',
        fontSize: '14px', fontWeight: '400', color: (props.theme === 'light' ? 'black' : 'white'),
    };
    const timeStyle = {
        position: 'absolute', bottom: '10px', right: '15px',
        textAlign: 'right', textAlignLast: 'right',
        fontSize: '13px', fontWeight: '300', color: (props.theme === 'light' ? 'gray' : 'white')
    };

    return (
        <a href={ `https://youtu.be/${ props.id }` } target="_blank" rel="noreferrer">
            <animated.div style={ itemStyle }
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img style={ imgStyle } src={ props.imgSrc }/>
                <div style={ titleStyle }>{ props.title }</div>
                <div style={ timeStyle }>{ props.time }</div>
            </animated.div>
        </a>
    );
}
class Youtube extends Component {
    state = { youtubeList: undefined }
    constructor(props){
        super(props);

        axios.get('/json/main/youtubelist').then((youtubeList) => {
            this.setState({ youtubeList: youtubeList.data });
        });
    }
    render() {
        if(this.state.youtubeList === undefined){
            return (
                <Frame title="오일러TV" theme={ this.props.theme }>
                    <div style={{ position: 'relative', paddingTop: '100px' }}>
                        <Loading/>
                    </div>
                </Frame>
            );
        }
        else{
            return (
                <Frame title="오일러TV" theme={ this.props.theme }>
                    <div style={{ position: 'relative' }}>
                        { this.state.youtubeList.map((item, index) => {
                            const y = parseInt(index/2);
                            const pos = [y, index - y*2];
                            let comp;

                            try{
                                comp = <YoutubeItem key={ index } id={ item.yotubeId } title={ item.title } imgSrc={ item.img.medium.url } time="" position={ pos } theme={ this.props.theme }/>;
                            } catch(e){
                                comp = '';
                            }
                            return comp;
                        }) }
                    </div>
                </Frame>
            );
        }
    }
}

export default Youtube;