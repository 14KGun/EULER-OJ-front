import React, { Component } from 'react';

class Top extends Component {
    state = { scrolledTop: 0 }
    constructor(props){
        super(props);
        this.fixedBarStyle = {

        };
        console.log(this.props.background)
    }
    componentDidMount(){
        this.scrollevent();
        document.addEventListener('scroll', () => this.scrollevent());
    }
    scrollevent(){
        const scrolledHeight = document.documentElement.scrollTop;
        this.setState({ scrolledTop: scrolledHeight });
        console.log(scrolledHeight);
    }
    render() {
        return (
            <>
                <div className="ND" style={{ height: '322px', position: 'relative' }}>
                    <div style={{
                        position: 'absolute', left: '0xp', bottom: '0px', width: '100%',
                        height: `${ Math.max(322-this.state.scrolledTop, 0) }px`
                    }}>{ this.props.background }</div>
                </div>

                <div className="ND" style={{
                    width: '100%', height: '120px', left: '0px',
                    position: this.state.scrolledTop <= 202 ? 'absolute' : 'fixed',
                    top: this.state.scrolledTop <= 202 ? '202px' : '0px'
                }}>
                    <div style={{
                        width: '100%', height: '100%',
                        display: this.state.scrolledTop <= 202 ? 'none' : 'block'
                    }}>{ this.props.background }</div>
                    <div style={{ position: 'absolute', left: '0px', bottom: '0px', width: '100%', height: '50px' }}>
                        <div className="FRAME_MAIN" style={{ height: '100%', position: 'relative' }}>{ this.props.fixedLay }</div>
                    </div>
                </div>
            </>
        );
    }
}

export default Top;