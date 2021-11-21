import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from '../../Tool/axios';
import Frame from './Lay2Frame';
import Loading from '../../Frame/Loading/Loading';

class Blogging extends Component {
    state = { problemList: undefined }
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Frame title="새로운 블로깅" theme={ this.props.theme }>
                <div style={{ position: 'relative', paddingTop: '100px' }}>
                    <Loading/>
                </div>
            </Frame>
        );
    }
}

export default Blogging;