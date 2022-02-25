import { useState, useRef, useEffect } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from '../Tool/axios';
import Top from './ContestTop/ContestTop';
import Loading from '../Frame/Loading/Loading';
import Footer from '../Frame/Footer/Footer';
import ContestTable from './ContestTable';

const LoadingLay = () => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px' }}>페이지 불러오는 중...</div>
        </div>
    )
}
const Contest = (props) => {
    const onCall = useRef(false);
    const [list, setList] = useStateWithCallbackLazy(undefined);
    const [category, setCategory] = useStateWithCallbackLazy(undefined);

    useEffect(() => {
        props.reFooter();
    }, [list]);

    if(!onCall.current && category !== props.category){
        onCall.current = true;
        setCategory("ongoing", () => {
            setList([], () => {
                onCall.current = false;
            })
        });
    }

    return (
        <div>
            <Helmet><title>대회 : 오일러OJ</title></Helmet>
            <Top category={ props.category }/>
            <div style={{ background: 'rgba(120,120,120,0.05)' }}>
                <div style={{ height: '30px' }}/>
                <div className="FRAME_MAIN">
                    { list ?  <ContestTable theme={ props.theme }/> : <LoadingLay/> }
                </div>
                <div className="BTM_EMPTY"/>
            </div>
            <Footer theme={ props.theme }/>
        </div>
    )
}

export default Contest;