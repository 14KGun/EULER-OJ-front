import React, { Component } from 'react';
import Header from './Header';

class Frame extends Component {
    render() {
        return (
            <div style={{ width: '100%', height: '100%', background: 'rgb(250,251,252)' }}>
                { this.props.children }
                <Header txtColor={ this.props.headerTxtColor }/>
            </div>
        );
    }
}

Frame.defaultProps = { headerTxtColor: 'white' }

export default Frame;