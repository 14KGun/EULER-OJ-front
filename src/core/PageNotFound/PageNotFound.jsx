import React, { Component } from 'react';
import Footer from '../Frame/Footer'

class PageNotFound extends Component {
    render() {
        return (
            <div style={{ paddingTop: '100px' }}>
                <div className="FRAME_MAIN">해당 페이지를 찾을 수 없음</div>
                <Footer/>
            </div>
        );
    }
}

export default PageNotFound;