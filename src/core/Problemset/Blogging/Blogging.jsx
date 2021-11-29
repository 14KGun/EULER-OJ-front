import { Component } from "react";
import { Helmet } from "react-helmet";
import Top from '../Top/Top';
import Table from './BloggingTable';
import Loading from '../../Frame/Loading/Loading';
import Footer from '../../Frame/Footer/Footer';
import axios from '../../Tool/axios';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}

class Blogging extends Component {
    constructor(props){
        super(props);
        this.state = {}
        this.onCall = false;
    }
    render() {
        if(!this.onCall){
            this.onCall = true;
            axios.get(`/json/stats/blogging/${ this.props.id }`).then(({ data }) => {
                this.setState({ id: data.id, list: data.list }, () => {
                    this.onCall = false;
                    console.log(data.list);
                })
            })
        }

        let container = <LoadingLay/>

        if(this.state.list){
            container = (
                <div>
                    <div style={{ height: '50px' }}/>
                    <Table theme={ this.props.theme } list={ this.state.list }/>
                </div>
            )
        }

        return (
            <div>
                <Helmet><title>블로깅 (#{ this.props.id }) : 오일러OJ</title></Helmet>
                <Top id={ this.props.id } type="blogging"/>
                <div className="FRAME_MAIN">{ container }</div>
                <div className="BTM_EMPTY"></div>
                <Footer theme={ this.props.theme }/>
            </div>
        )
    }
}

export default Blogging;