import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../../Tool/axios';
import Loading from '../../Frame/Loading/Loading';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '200px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}
class Problem extends Component {
    constructor(props){
        super(props);
        this.state = { env: 'undefined' }
        this.onCall = false;
    }
    render() {
        if(!this.onCall){
            this.onCall = true;
            axios.get(`/json/problems/quickeditor`).then(result => {
                this.setState({ env: result.data.content });
            });
        }

        if(this.state.env === 'true'){
            window.location.href = `https://euleroj.io/problemset/editor/${ this.props.id }`;
            return <LoadingLay/>;
        }
        if(this.state.env === 'false'){
            return <Redirect to={ '/problemset/viewer/'+this.props.id }/>;
        }
        return <LoadingLay/>;
    }
}

export default Problem;