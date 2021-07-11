import { Component } from 'react';
import trans from '../../Tool/trans';

const Title = (props) => {
    return (
        <div style={{ fontSize: '27px', fontWeight: 700, color: 'black', marginBottom: '6px' }}>{ props.children }</div>
    )
}
const Container = (props) => {
    return (
        <div style={{ borderRadius: '10px', background: 'rgb(230,230,230)', padding: '20px', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
                { props.children }
            </div>
        </div>
    )
}

class Page4 extends Component {
    constructor(props){
        super(props);
        this.txt1Style = {
            display: 'inline-block', width: '100px',
            fontSize: '16px', fontWeight: 500, color: 'black'
        }
        this.txt2Style = {
            fontSize: '16px', fontWeight: 300, color: 'rgb(50,50,50)'
        }
    }
    render() {
        return (
            <div className="FRAME_MAIN ND" style={{ paddingTop: '50px' }}>
                <Title>추가 정보</Title>
                <Container>
                    <div><span style={ this.txt1Style }>이름</span><span style={ this.txt2Style }>{ this.props.data.name }</span></div>
                    <div><span style={ this.txt1Style }>소속</span><span style={ this.txt2Style }>{ this.props.data.school }</span></div>
                    <div><span style={ this.txt1Style }>최근 접속</span><span style={ this.txt2Style }>{ this.props.data.access === 'online' ? '온라인(현재 접속 중)' : trans.date(new Date(this.props.data.access)) }</span></div>
                    <div><span style={ this.txt1Style }>가입 날짜</span><span style={ this.txt2Style }>{ trans.date(new Date(this.props.data.create)) }</span></div>
                </Container>
            </div>
        );
    }
}

export default Page4;