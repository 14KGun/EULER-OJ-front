import { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const Title = (props) => {
    return (
        <div style={{ fontSize: '27px', fontWeight: 700, color: (props.theme==='light' ? 'black' : 'white'), marginBottom: '6px' }}>{ props.children }</div>
    )
}
const SubTitle = (props) => {
    return (
        <span style={{
            display: 'inline-block', height: '28px', lineHeight: '28px', borderRadius: '14px',
            background: 'rgb(180,180,180)', paddingLeft: '8px', paddingRight: '8px', marginLeft: '5px',
            fontSize: '16px', fontWeight: 300, color: 'white'
        }}>{ props.children }</span>
    )
}
const Container = (props) => {
    return (
        <div style={{ borderRadius: '10px', background: (props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)'), padding: '20px', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
                { props.children }
            </div>
        </div>
    )
}

const IdContainer = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        display: 'inline-block', height: '26px', lineHeight: '26px', borderRadius: '10px',
        paddingLeft: '7px', paddingRight: '7px', marginRight: '7px',
        fontSize: '16px', fontWeight: 300, color: 'black',
        background: 'rgb(200,200,200)'
    }
    const background = useSpring({
        background: isHover ? 'rgb(180,180,180)' : 'rgb(200,200,200)',
        config: { duration: 200 }
    })
    return (
        <Link to={ `/problemset/problem/${ props.id }` }>
            <animated.span style={{ ...style, ...background }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>{ props.id }</animated.span>
        </Link>
    )
}
const BtnSearch = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        display: 'inline-block', height: '28px', lineHeight: '28px', borderRadius: '18px',
        paddingLeft: '9px', paddingRight: '9px',
        fontSize: '16px', fontWeight: 300, color: 'black',
        border: '2px solid rgb(200,200,200)'
    }
    const background = useSpring({
        background: isHover ? 'rgba(220,220,220,1)' : 'rgba(220,220,220,0)',
        config: { duration: 200 }
    })
    return (
        <a href={ `/status/?lid=${ props.id }` }>
            <animated.span style={{ ...style, ...background }}
            onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>채점 기록으로 보기</animated.span>
        </a>
    )
}

class Page3 extends Component {
    render() {
        return (
            <div className="FRAME_MAIN ND" style={{ paddingTop: '50px' }}>
                <Title theme={ this.props.theme }>틀린 문제<SubTitle>{ this.props.data.submit.length }</SubTitle></Title>
                <Container theme={ this.props.theme }>
                    <div style={{ textAlign: 'center', lineHeight: '33px' }}>
                        { this.props.data.submit.map((item, index) => <IdContainer key={ item } id={ item }/>) }
                    </div>
                    <div style={{ textAlign: 'right', marginTop: '10px' }}><BtnSearch id={ this.props.data.id }/></div>
                </Container>
            </div>
        );
    }
}

export default Page3;