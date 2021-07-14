import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../../Tool/axios';

class Problem extends Component {
    constructor(props){
        super(props);
        this.state = { onload: false, setting: undefined }
    }
    render() {
        if(this.state.onload === false){
            axios.get(`/json/problems/usersetting`).then((settingInfo) => {
                this.setState({ onload: true, setting: settingInfo.data.setting });
            });
            return <></>;
        }
        else{
            if(this.state.setting === 'editor'){
                return <></>;
            }
            else{
                return <Redirect to={ '/problemset/viewer/'+this.props.id }/>;
            }
        }
    }
}

export default Problem;