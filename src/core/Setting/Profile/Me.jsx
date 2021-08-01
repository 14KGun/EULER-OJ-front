import { Component } from 'react';
import ImageUploader from "react-images-upload";
import Layout from './Layout';
import svgProfile from './svg_profile.svg';
import svgStatus from './svg_status.svg';
import svgSchool from './svg_school.svg';
import svgName from './svg_name.svg';
import svgEmail from './svg_email.svg';

class Me extends Component {
    constructor(props) {
      super(props);
      this.state = { picture: undefined, pictureUrl: undefined, feeling: undefined };
    }
    onDrop(pictureFile, pictureDataURLs){
        console.log(pictureFile, pictureDataURLs);
        this.setState({ picture: pictureFile[0], pictureUrl: pictureDataURLs[0] })
    }
    onChange(key, value){
        const obj = {};
        obj[key] = value;
        this.setState(obj);
    }
    render(){
        //console.log(this.state.picture);
        const styleUploader = {
            boxShadow: 'none', border: 'none', outline: 'none', borderRadius: '15px',
            background: (this.props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)')
        }
        const styleUploaderLabel = {
            fontSize: '13px', fontWeight: 300, color: (this.props.theme==='light' ? 'black' : 'white')
        }
        const styleProf = {
            position: 'absolute', top: '0px', left: '0px', width: '170px', height: '174px', borderRadius: '15px',
            background: (this.props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)')
        };
        const styleProfTxt = {
            marginTop: '15px', marginLeft: '15px',
            fontSize: '16px', fontWeight: 300, color: (this.props.theme==='light' ? 'black' : 'white')
        };
        const styleProfContainer = {
            width: '100px', height: '100px', borderRadius: '52px', margin: 'auto', marginTop: '10px',
            background: 'white', overflow: 'hidden'
        };

        if(this.state.feeling === undefined) this.state.feeling = this.props.data.feeling;

        return (
            <div className="ND">
                <Layout.Title icon={ svgProfile } theme={ this.props.theme }>프로필 이미지</Layout.Title>
                <Layout.Content theme={ this.props.theme }>순위 및 내 프로필 페이지에 공개됩니다.</Layout.Content>

                <div style={{ position: 'relative' }}>
                    <div style={ styleProf }>
                        <div style={ styleProfTxt }>{ this.state.pictureUrl ? '업로드 된 이미지' : '현재 프로필 이미지' }</div>
                        <div style={ styleProfContainer }>
                            <img src={ this.state.pictureUrl ? this.state.pictureUrl : `https://euleroj.io/profile-img/${ this.props.data.id }.webp?size=100` } alt="profile-img" style={{ width: '100%', height: '100%' }}/>
                        </div>
                    </div>
                    <div style={{ marginLeft: '180px' }}>
                        <ImageUploader withIcon={ true } singleImage={ true } pictures={ [this.state.picture] }
                        buttonText="이미지 선택하기" label="1MB 이하의 파일만 업로드 가능합니다."
                        fileSizeError="파일의 사이즈가 너무 큽니다." fileTypeError="지원하지 않는 파일 형식입니다."
                        fileContainerStyle={ styleUploader } labelStyles={ styleUploaderLabel }
                        onChange={ (x,y) => this.onDrop(x,y) } imgExtension={ [".jpg", ".gif", ".png"] } maxFileSize="1048576"/>
                    </div>
                </div>

                <Layout.SubmitBtnAutoLay href="/json/setting/profile/me/profimg" ori="" value=""/>
                <Layout.Margin/>

                <Layout.Title icon={ svgStatus } theme={ this.props.theme }>상태</Layout.Title>
                <Layout.Content theme={ this.props.theme }>순위 및 내 프로필 페이지에 공개됩니다. 최대 30자까지 입력할 수 있습니다.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <Layout.Input type="text" theme={ this.props.theme } value={ this.state.feeling } onChange={ (x) => this.onChange('feeling', x) }/>
                <div style={{ height: '10px' }}/>
                <Layout.SubmitBtnAutoLay href="/json/setting/profile/me/feeling" ori={ this.props.data.feeling } value={ this.state.feeling }
                handler={ (x, cb) => this.props.stateHandler('feeling', x, cb) }/>
                <Layout.Margin/>

                <Layout.Title icon={ svgSchool } theme={ this.props.theme }>학교 또는 소속</Layout.Title>
                <Layout.Content theme={ this.props.theme }>변경 불가능 합니다. 내 프로필 페이지에 공개됩니다.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <Layout.Input type="text" theme={ this.props.theme } value={ this.props.data.school }/>
                <Layout.Margin/>

                <Layout.Title icon={ svgName } theme={ this.props.theme }>이름</Layout.Title>
                <Layout.Content theme={ this.props.theme }>변경 불가능 합니다. 내 프로필 페이지에 공개됩니다.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <Layout.Input type="text" theme={ this.props.theme } value={ this.props.data.name }/>
                <Layout.Margin/>

                <Layout.Title icon={ svgEmail } theme={ this.props.theme }>이메일</Layout.Title>
                <Layout.Content theme={ this.props.theme }>비밀번호 찾기에 사용됩니다.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <Layout.Input type="text" theme={ this.props.theme } value={ this.props.data.email }/>
            </div>
        )
    }
}

export default Me