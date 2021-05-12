import { Component, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from '../../../Tool/axios';
import svgChecked from './svg_checked.svg';
import svgUnchecked from './svg_unchecked.svg';

const style = {
    position: 'absolute', width: '32px', height: '32px', right: '0px', bottom: '10px',
    borderRadius: '16px'
}
const styleImg = {
    position: 'absolute', top: '5px', left: '8px',
    width: '15px', height: '22px'
}
const Bookmark = (props) => {
    const [isHover, setHover] = useState(false);
    const [tooltipId, setTooltipId] = useState(undefined);
    const background = useSpring({
        background: isHover ? 'rgba(220,220,220,1)' : 'rgba(220,220,220,0)',
        config: { duration: 100 }
    }).background

    const onMouseEnter = () => {
        setHover(true);
        const msg = props.check ? '북마크에서 이 문제 제거' : '북마크에 이 문제 추가';
        const id = props.tooltip.create(document.getElementById(`btnBookmark`), 'top', msg);
        setTooltipId(id);
    }
    const onMouseLeave = () => {
        setHover(false);
        props.tooltip.remove(tooltipId);
    }

    return (
        <animated.div id="btnBookmark" style={{ ...style, background }} className="BTNC ND"
        onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave } onClick={ props.onClick }>
            <img style={ styleImg } src={ props.check ? svgChecked : svgUnchecked }/>
        </animated.div>
    );
}

const defaultState = { id: undefined, loaded: false, available: false, check: false }
class bookmarkMaker extends Component {
    constructor(props){
        super(props);
        this.state = defaultState
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.id !== prevState.id){
            return { ...defaultState, id: nextProps.id, loaded: false };
        }
        return prevState;
    }
    onClick(){
        if(this.state.available == true){
            this.setState({ available: false });
            if(this.state.check){
                axios.get(`/json/problems/bookmark/delete/${ this.state.id }`).then(res => {
                    if(res.data.done){
                        this.setState({ available: true, check: false });
                    }
                })
            }
            else{
                axios.get(`/json/problems/bookmark/add/${ this.state.id }`).then(res => {
                    if(res.data.done){
                        this.setState({ available: true, check: true });
                    }
                })
            }
        }
    }
    render(){
        if(this.state.loaded == false){
            axios.get(`/json/problems/bookmark/check/${ this.state.id }`).then(bookmarkInfo => {
                this.setState({
                    loaded: true, available: bookmarkInfo.data.available, check: bookmarkInfo.data.check
                });
            })
        }
        return <Bookmark tooltip={ this.props.tooltip } check={ this.state.check } onClick={ () => this.onClick() }/>
    }
}

export default bookmarkMaker;