import { Component } from 'react';
import { Helmet } from "react-helmet";
import Top from './StatusTop/StatusTop';
import PageSelector from '../Frame/PageSelector';
import Footer from '../Frame/Footer/Footer';
import axios from '../Tool/axios';

class Status extends Component {
    render() {
        return (
            <div>
                <Helmet><title>채점 : 오일러OJ</title></Helmet>
                <Top/>
                <div className="FRAME_MAIN">123</div>
                <div className="BTM_EMPTY"></div>
                <div className="BTM_EMPTY"></div>
                <div className="BTM_EMPTY"></div>
                <div className="BTM_EMPTY"></div>
                <div className="BTM_EMPTY"></div>
                <div className="BTM_EMPTY"></div>
                <div className="BTM_EMPTY"></div>
                <div className="BTM_EMPTY"></div>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default Status;