import { Component } from 'react';
import { Helmet } from "react-helmet";
import smoothScroll from '../Tool/smoothScroll';
import FrameSplit from '../Frame/FrameSplit/FrameSplit';
import Empty from './Empty/Empty';
import ProblemList from './Problem/List';
import ProblemGitpull from './Problem/Gitpull';
import TagTree from './Tag/Tree';
import axios from '../Tool/axios';

import svgAdd from './svg_add.svg';
import svgClouddown from './svg_clouddown.svg';
import svgList from './svg_list.svg';
import svgTree from './svg_tree.svg';

class Admin extends Component {
    constructor(props){
        super(props);

        this.lastPath = 'none';
        this.state = { loginInfo: undefined };
    }
    navigator(level){
        const navigator = [];

        if(level >= 10){
            navigator.push({
                title: '문제',
                list: [
                    { name: '새로운 문제 추가', icon: svgAdd, href: '/nadmin/problem/add' },
                    { name: '모든 문제', icon: svgList, href: '/nadmin/problem/list' },
                    { name: 'Git Pull', icon: svgClouddown, href: '/nadmin/problem/gitpull' },
                ]
            });
        }
        if(level >= 10){
            navigator.push({
                title: '태그',
                list: [
                    { name: '태그 추가 및 수정', icon: svgTree, href: '/nadmin/tag/tree' },
                ]
            });
        }
        if(level >= 5){
            navigator.push({
                title: '대회',
                list: [
                    { name: '새로운 대회 만들기', icon: svgAdd, href: '/nadmin/contest/make' },
                    { name: '내 대회 관리', icon: svgList, href: '/nadmin/contest/list' },
                ]
            });
        }

        return navigator;
    }
    requestLogininfo(){
        axios.get('/json/logininfo').then((userInfo) => {
            this.setState({ loginInfo: userInfo.data });
        })
    }
    render(){
        const currentUrl = window.location.pathname;
        if(currentUrl !== this.lastPath){
            this.lastPath = currentUrl;
            this.requestLogininfo();
        }
        let adminLevel = 0;
        if(this.state.loginInfo) adminLevel = this.state.loginInfo.level;
        
        const title = (adminLevel >= 5 ? '관리 : 오일러OJ' : '오일러OJ');

        let container = <div/>;
        if(this.props.page === 'problem/list' && adminLevel >= 10){
            container = <ProblemList theme={ this.props.theme }/>
        }
        else if(this.props.page === 'problem/gitpull' && adminLevel >= 10){
            container = <ProblemGitpull theme={ this.props.theme }/>
        }
        else if(this.props.page === 'tag/tree' && adminLevel >= 10){
            container = <TagTree theme={ this.props.theme }/>
        }
        else if(adminLevel >= 5){
            container = <Empty theme={ this.props.theme }/>;
        }

        return (
            <FrameSplit navigator={ this.navigator(adminLevel) } theme={ this.props.theme }>
                <Helmet><title>{ title }</title></Helmet>
                { container }
            </FrameSplit>
        )
    }
}

export default Admin;