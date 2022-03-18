import { useState, useRef, useEffect } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import layout from '../Frame/Layout/Layout';
import axios from '../Tool/axios';
import Top from './ContestTop/ContestTop';
import Loading from '../Frame/Loading/Loading';
import Footer from '../Frame/Footer/Footer';
import ContestTable from './ContestTable';

const Contest = (props) => {
    const [list, setList] = useStateWithCallbackLazy([]);

    useEffect(() => {
        setList(undefined, () => {
            axios.get(`/json/contest/list/${ props.category }`).then(({ data }) => {
                if(data.category === props.category){
                    setList(data.list);
                }
            })
        })
    }, [props.category])

    return (
        <div>
            <Helmet><title>대회 : 오일러OJ</title></Helmet>
            <Top category={ props.category }/>
            <div style={{ background: 'rgba(120,120,120,0.05)' }}>
                <div style={{ height: '30px' }}/>
                <div className="FRAME_MAIN">
                    {
                        list !== undefined ? 
                        <ContestTable theme={ props.theme } list={ list }
                        empty="대회가 없습니다."/> :
                        <layout.Loading theme={ props.theme }/>
                    }
                </div>
                <div className="BTM_EMPTY"/>
            </div>
            <Footer theme={ props.theme }/>
        </div>
    )
}

export default Contest;