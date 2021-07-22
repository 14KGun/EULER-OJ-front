import { Component } from 'react';
import Layout from './Layout';
import svgProfile from './svg_profile.svg';
import svgStatus from './svg_status.svg';
import svgSchool from './svg_school.svg';
import svgName from './svg_name.svg';
import svgEmail from './svg_email.svg';

class Me extends Component {
    render(){
        return (
            <div className="ND">
                <Layout.Title icon={ svgProfile } theme={ this.props.theme }>프로필 사진</Layout.Title>
                <Layout.Margin/>
                <Layout.Title icon={ svgStatus } theme={ this.props.theme }>상태</Layout.Title>
                <Layout.Content theme={ this.props.theme }>순위 및 내 프로필 페이지에 공개됩니다. 최대 30자까지 입력할 수 있습니다.</Layout.Content>
                <Layout.Input type="text" theme={ this.props.theme }/>
                <Layout.Margin/>
                <Layout.Title icon={ svgSchool } theme={ this.props.theme }>학교 또는 소속</Layout.Title>
                <Layout.Content theme={ this.props.theme }>재학 중인 학교나 자신의 소속을 입력해 주세요. 최대 10자까지 입력할 수 있습니다.</Layout.Content>
                <Layout.Input type="text" theme={ this.props.theme }/>
                <Layout.Margin/>
                <Layout.Title icon={ svgName } theme={ this.props.theme }>이름</Layout.Title>
                <Layout.Content theme={ this.props.theme }>변경 불가능 합니다. 내 프로필 페이지에 공개됩니다.</Layout.Content>
                <Layout.Input type="text" theme={ this.props.theme }/>
                <Layout.Margin/>
                <Layout.Title icon={ svgEmail } theme={ this.props.theme }>이메일</Layout.Title>
                <Layout.Content theme={ this.props.theme }>비밀번호 찾기에 사용됩니다.</Layout.Content>
                <Layout.Input type="text" theme={ this.props.theme }/>
            </div>
        )
    }
}

export default Me