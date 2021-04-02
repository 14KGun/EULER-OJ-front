import React, { Component } from 'react';
import Top from '../Frame/Top/Top';
import Footer from '../Frame/Footer'
import Loading from '../Frame/Loading/Loading';

const TopBackground = () => {
    return (
        <div style={{ width: '100%', height: '100%', background: 'yellow' }}></div>
    )
}
class Tag extends Component {
    render() {
        return (
            <div>
                <Top background={ <TopBackground/> } fixedLay={ "sdfsdfsdfsdf" }/>
                <div className="FRAME_MAIN ND">
                    <div style={{ paddingTop: '100px', height: '300px' }}>
                        <Loading/>
                        <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Tag;