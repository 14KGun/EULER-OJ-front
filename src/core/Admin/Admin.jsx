import { Component } from 'react';
import { Helmet } from "react-helmet";
import FrameSplit from '../Frame/FrameSplit/FrameSplit';
import Empty from './Empty/Empty';
import ProblemAdd from './Problem/Add';
import ProblemList from './Problem/List';
import ProblemGitpull from './Problem/Gitpull';
import TagTree from './Tag/Tree';
import BloggingPull from './Blogging/Pull';
import UserList from './User/List';
import axios from '../Tool/axios';

import svgAdd from './svg_add.svg';
import svgClouddown from './svg_clouddown.svg';
import svgList from './svg_list.svg';
import svgTree from './svg_tree.svg';
import svgPeople from './svg_people.svg';
import svgBlog from './svg_blog.svg';

class Admin extends Component {
    constructor(props){
        super(props);

        this.lastPath = 'none';
        this.state = { loginInfo: undefined };
    }
    navigator(level){
        const navigator = [];

        if(level >= 8){
            navigator.push({
                title: '문제',
                list: [
                    { name: '새로운 문제 추가', icon: svgAdd, href: '/nadmin/problem/add' },
                    { name: '모든 문제', icon: svgList, href: '/nadmin/problem/list' },
                    { name: 'Git Pull', icon: svgClouddown, href: '/nadmin/problem/gitpull' },
                ]
            });
        }
        if(level >= 5){
            navigator.push({
                title: '유저',
                list: [
                    { name: '유저 정보 수정', icon: svgPeople, href: '/nadmin/user/list' },
                ]
            });
        }
        if(level >= 5){
            navigator.push({
                title: '블로깅',
                list: [
                    { name: '요청된 블로깅 링크', icon: svgAdd, href: '/nadmin/blogging/pull' },
                    { name: '블로깅 링크 수정', icon: svgBlog, href: '/nadmin/blogging/list' },
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
        if(level >= 10){
            navigator.push({
                title: '태그',
                list: [
                    { name: '태그 추가 및 수정', icon: svgTree, href: '/nadmin/tag/tree' },
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
        if(this.props.page === 'problem/add' && adminLevel >= 8){
            container = <ProblemAdd theme={ this.props.theme }/>
        }
        else if(this.props.page === 'problem/list' && adminLevel >= 8){
            container = <ProblemList theme={ this.props.theme }/>
        }
        else if(this.props.page === 'problem/gitpull' && adminLevel >= 10){
            container = <ProblemGitpull theme={ this.props.theme }/>
        }
        else if(this.props.page === 'tag/tree' && adminLevel >= 10){
            container = <TagTree theme={ this.props.theme }/>
        }
        else if(this.props.page === 'blogging/pull' && adminLevel >= 5){
            container = <BloggingPull theme={ this.props.theme }/>
        }
        else if(this.props.page === 'user/list' && adminLevel >= 5){
            container = <UserList theme={ this.props.theme }/>
        }
        else if(adminLevel >= 5){
            container = <Empty theme={ this.props.theme }/>;
        }

        return (
            <FrameSplit navigator={ this.navigator(adminLevel) } theme={ this.props.theme } reFooter={ this.props.reFooter }>
                <Helmet><title>{ title }</title></Helmet>
                { container }
            </FrameSplit>
        )
    }
}

export default Admin;