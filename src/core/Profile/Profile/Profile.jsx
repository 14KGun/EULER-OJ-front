import { Component } from 'react';
import { Helmet } from "react-helmet";
import { Redirect } from 'react-router-dom';
import axios from '../../Tool/axios';
import ProfileTop from '../ProfileTop/ProfileTop';
import Loading from '../../Frame/Loading/Loading';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Footer from '../../Frame/Footer/Footer';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = { page: 1, top: {}, trophy: {}, solve: {}, subinfo: {}, compare: {} };
    }
    changePage(page){
        this.setState({ page: page });
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.top.err) return prevState;
        if(String(nextProps.id) !== String(prevState.top.id)){
            return { page: 1, top: {}, trophy: {}, solve: {}, subinfo: {}, compare: {} };
        }
        return prevState;
    }
    render() {
        let container = <LoadingLay/>;

        if(this.state.top.id !== this.props.id){
            if(!this.loadTop){
                this.loadTop = true;
                axios.get(`/json/profile/main/${ this.props.id }`).then((result) => {
                    this.setState({ top: result.data }, () => {
                        this.loadTop = false;
                    });
                });
            }
        }

        if(this.state.top.err){
            container = <Redirect to="/profile/unknown"/>;
        }
        else if(this.state.page === 1){
            if(this.state.trophy.id !== this.props.id){
                if(!this.loadTrophy){
                    this.loadTrophy = true;
                    axios.get(`/json/profile/trophy/${ this.props.id }`).then((result) => {
                        this.setState({ trophy: result.data }, () => {
                            this.loadTrophy = false;
                        });
                    });
                }
            }
            else container = <Page1 data={ this.state.trophy } theme={ this.props.theme }/>;
        }
        else if(this.state.page === 2){
            if(this.state.solve.id !== this.props.id){
                if(!this.loadSolve){
                    this.loadSolve = true;
                    axios.get(`/json/profile/solve/${ this.props.id }`).then((result) => {
                        this.setState({ solve: result.data }, () => {
                            this.loadSolve = false;
                        });
                    });
                }
            }
            else container = <Page2 data={ this.state.solve } theme={ this.props.theme }/>;
        }
        else if(this.state.page === 3){
            if(this.state.solve.id !== this.props.id){
                if(!this.loadSolve){
                    this.loadSolve = true;
                    axios.get(`/json/profile/solve/${ this.props.id }`).then((result) => {
                        this.setState({ solve: result.data }, () => {
                            this.loadSolve = false;
                        });
                    });
                }
            }
            else container = <Page3 data={ this.state.solve } theme={ this.props.theme }/>;
        }
        else if(this.state.page === 4){
            if(this.state.subinfo.id !== this.props.id){
                if(!this.loadSubinfo){
                    this.loadSubinfo = true;
                    axios.get(`/json/profile/info/${ this.props.id }`).then((result) => {
                        this.setState({ subinfo: result.data }, () => {
                            this.loadSubinfo = false;
                        });
                    });
                }
            }
            else container = <Page4 data={ this.state.subinfo } theme={ this.props.theme }/>;
        }
        else if(this.state.page === 5){
            if(this.state.compare.id !== this.props.id){
                if(!this.loadCompare){
                    this.loadCompare = true;
                    axios.get(`/json/profile/comparewithme/${ this.props.id }`).then((result) => {
                        this.setState({ compare: result.data }, () => {
                            this.loadCompare = false;
                        });
                    });
                }
            }
            else container = <Page5 data={ this.state.compare }/>;
        }

        return (
            <div>
                <Helmet><title>{ this.props.id } : 오일러OJ</title></Helmet>
                <ProfileTop id={ this.props.id } data={ this.state.top } page={ this.state.page } changePage={ (x) => this.changePage(x) }/>
                { container }
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default Profile;