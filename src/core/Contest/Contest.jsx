import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from '../Tool/axios';
import Top from '../Frame/Top/Top';
import Loading from '../Frame/Loading/Loading';
import Footer from '../Frame/Footer/Footer';
import ContestTable from './ContestTable';

const Contest = (props) => {
    return (
        <div>
            <Helmet><title>대회 : 오일러OJ</title></Helmet>
            <Top icon={ undefined } title="대회" background={ undefined } fixedLay={ undefined }/>
            <div style={{ background: 'rgba(120,120,120,0.05)' }}>
                <div style={{ height: '30px' }}/>
                <div className="FRAME_MAIN">
                    <ContestTable theme={ props.theme }/>
                </div>
                <div className="BTM_EMPTY"/>
            </div>
            <Footer theme={ props.theme }/>
        </div>
    )
}

export default Contest;