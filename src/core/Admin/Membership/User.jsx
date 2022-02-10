import { Component } from 'react';
import Layout from '../Layout';
import Loading from '../../Frame/Loading/Loading';

import svgBrain from '../svg_brain.svg';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>불러오는 중...</div>
        </div>
    )
}

class Edit extends Component {
    render(){
        return (
            <div>
            </div>
        )
    }
}

export default Edit;