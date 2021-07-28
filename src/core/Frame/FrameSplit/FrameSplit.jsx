import { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const NavigatorBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        minHeight: '40px', marginLeft: '20px', position: 'relative', overflow: 'hidden',
        borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px'
    }
    const styleImg = {
        position: 'absolute', top: '7px', left: '15px', width: '26px'
    }
    const styleTxt = {
        marginLeft: '50px', lineHeight: '40px',
        fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'rgb(80,80,80)' : 'rgb(150,150,150)')
    }
    const backgroundColor = (props.theme==='light' ? 220 : 60);
    const background = useSpring({
        background: `rgba(${backgroundColor},${backgroundColor},${backgroundColor},${ isHover ? 1 : 0 })`,
        config: { duration: 150 }
    });
    return (
        <Link to={ props.href }>
            <animated.div style={{ ...style, ...background }} onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <img src={ props.icon } style={ styleImg } alt=""/>
                <div style={ styleTxt }>{ props.name }</div>
            </animated.div>
        </Link>
    )
}
const Navigator = (props) => {
    const style = {
        marginLeft: '20px', marginRight: '10px', borderRadius: '15px',
    }
    const background = useSpring({ background: props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)' })
    const styleTxt1 = {
        marginLeft: '20px', marginRight: '20px', marginBottom: '5px',
        fontSize: '15px', fontWeight: 300, color: 'gray'
    }

    const container = [];
    for(var i=0; i<props.items.length; i++){
        container.push(<div style={ styleTxt1 }>{ props.items[i].title }</div>);
        props.items[i].list.map((item, index) => {
            container.push(<NavigatorBtn icon={ item.icon } name={ item.name } href={ item.href } theme={ props.theme }/>)
        })
    }

    return (
        <animated.div style={{ ...style, ...background }}>
            <div style={{ height: '15px' }}/>
            { container }
            <div style={{ height: '20px' }}/>
        </animated.div>
    )
}
class Frame extends Component {
    constructor(props){
        super(props);

        this.styleLayLeft = {
            position: 'absolute', top: '0px', left: '0px', width: '300px'
        }
        this.styleLayRight = {
            position: 'absolute', top: '0px', left: '310px', right: '20px'
        }
        this.styleLayRightCenter = {
            maxWidth: '900px', margin: 'auto'
        }
    }
    render(){
        return (
            <div>
                <div style={{ height: '80px' }}/>
                <div id="framesplit-lay-lr" style={{ position: 'relative', height: '500px' }}>
                    <div id="framesplit-lay-left" style={ this.styleLayLeft } className="ND">
                        <Navigator items={ this.props.navigator } theme={ this.props.theme }/>
                    </div>
                    <div id="framesplit-lay-right" style={ this.styleLayRight }>
                        <div style={ this.styleLayRightCenter }>{ this.props.children }</div>
                    </div>
                </div>
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
            </div>
        )
    }
    resizeEvent(){
        const layLeft = document.getElementById('framesplit-lay-left');
        const layRight = document.getElementById('framesplit-lay-right');
        const layContain = document.getElementById('framesplit-lay-lr');
        const maxHeight = Math.max(layLeft.clientHeight, layRight.clientHeight);
        layContain.style.height = `${ maxHeight }px`;
    }
    componentDidMount(){
        this.resizeEvent()
        window.addEventListener('resize', this.resizeEvent);
    }
    componentDidUpdate(){
        this.resizeEvent()
        window.addEventListener('resize', this.resizeEvent);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.resizeEvent);
    }
}

export default Frame;