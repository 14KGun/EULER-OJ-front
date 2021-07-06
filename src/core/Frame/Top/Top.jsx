import React, { Component } from 'react';

const TitleLay = (props) => {
    const style = {
        position: 'fixed', top: '100px', width: '100%'
    }
    return (
        <div className="ND" style={{ ...style, opacity: 1-props.scrolledTop/140 }}>
            <div className="FRAME_MAIN">
                <div style={{ position: 'absolute', left: '0px', top: '3px', width: '40px', height: '40px', overflow: 'hidden' }}>
                    { props.icon }
                </div>
                <div style={{ position: 'absolute', left: '50px', top: '0px', fontSize: '30px', fontWeight: '900', color: 'white' }}>{ props.title }</div>
            </div>
        </div>
    )
}
class Top extends Component {
    state = { scrolledTop: 0 }
    constructor(props){
        super(props);
        this.fixedBarStyle = {

        };
    }
    componentDidMount(){
        this.scrollevent();
        document.addEventListener('scroll', () => this.scrollevent());
    }
    scrollevent(){
        const scrolledHeight = document.documentElement.scrollTop;
        this.setState({ scrolledTop: scrolledHeight });
    }
    render() {
        return (
            <>
                <div className="ND" style={{ height: '322px', position: 'relative' }}>
                    <div style={{
                        position: 'absolute', left: '0xp', bottom: '0px', width: '100%',
                        height: `${ Math.max(322-this.state.scrolledTop, 120) }px`
                    }}>{ this.props.background }</div>
                </div>

                <div className="ND" style={{
                    width: '100%', height: '120px', left: '0px', zIndex: '50',
                    position: this.state.scrolledTop <= 202 ? 'absolute' : 'fixed',
                    top: this.state.scrolledTop <= 202 ? '202px' : '0px',
                    boxShadow: this.state.scrolledTop <= 202 ? 'none' : '0 0 10px 5px rgba(0,0,0,0.4)'
                }}>
                    <div style={{
                        width: '100%', height: '100%',
                        display: this.state.scrolledTop <= 202 ? 'none' : 'block'
                    }}>{ this.props.background }</div>
                    <div style={{ position: 'absolute', left: '0px', bottom: '0px', width: '100%', height: '50px' }}>
                        <div className="FRAME_MAIN" style={{ height: '100%', position: 'relative' }}>{ this.props.fixedLay }</div>
                    </div>
                </div>

                <TitleLay icon={ this.props.icon } title={ this.props.title } scrolledTop={ this.state.scrolledTop }/>
            </>
        );
    }
}

export default Top;