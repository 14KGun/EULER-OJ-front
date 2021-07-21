import React, { Component } from 'react';

class Frame extends Component {
    constructor(props){
        super(props);

        this.FrameStyle = {
            display: 'inline-block', position: 'relative', overflow: 'hidden',
            width: '32%', height: '490px',
            background: 'white', borderRadius: '20px',
            marginTop: '30px', textAlign: 'left', textAlignLast: 'left'
        };
        this.TitleStyle = {
            fontSize: '25px', fontWeight: '700', marginBottom: '15px'
        }
    }
    render() {
        return (
            <span style={{ ...this.FrameStyle, background: (this.props.theme === 'light' ? 'white' : 'rgb(30,31,32)') }}>
                <div style={{ paddingLeft: '25px', paddingRight: '25px', paddingTop: '20px' }}>
                    <div style={{ ...this.TitleStyle, color: (this.props.theme === 'light' ? 'black' : 'white') }}>{ this.props.title }</div>
                    { this.props.children }
                </div>
            </span>
        );
    }
}

export default Frame;