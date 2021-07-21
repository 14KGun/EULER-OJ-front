import React, { Component } from 'react';
import Frame from './Lay2Frame';

class Empty extends Component {
    render() {
        return (
            <Frame title=" " theme={ this.props.theme }/>
        );
    }
}

export default Empty;