import { useEffect, useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import SampleLay from './SampleLay/SampleLay';

import './ProblemView.css';

const htmlParser = (html) => {
    html = html.split('/sysfile/problems/img/').join('/exposure/problemsImg/');
    html = html.split('src="/exposure/problemsImg/').join('src="https://euleroj.io/exposure/problemsImg/');
    if(html.indexOf('<!--Separation:Bottom-->') !== -1){
        const sep = html.split('<!--Separation:Bottom-->');
        return [sep[0], sep[1]];
    }
    else return [html, '']
}

const ProblemView = (props) => {
    const [htmlList, setHtmlList] = useStateWithCallbackLazy(['','']);

    const rePainting = () => {
        const contents = document.getElementsByClassName('content');
        for(let i=0; i<contents.length; i++){
            if(props.theme === 'dark' && contents[i].style.color === '') contents[i].style.color = 'rgb(170, 170, 170)';
            if(props.theme === 'dark' && contents[i].style.color === 'black') contents[i].style.color = 'rgb(170, 170, 170)';
            if(props.theme === 'light' && contents[i].style.color === '') contents[i].style.color = 'black';
            if(props.theme === 'light' && contents[i].style.color === 'rgb(170, 170, 170)') contents[i].style.color = 'black';
        }
    }
    const imgResizing = () => {
        const contents = document.getElementsByClassName('content');
        for(let i=0; i<contents.length; i++){
            const centers = contents[i].getElementsByTagName('center');
            for(let j=0; j<centers.length; j++){
                const imgs = centers[j].getElementsByTagName('img');
                for(let k=0; k<imgs.length; k++){
                    const imgElement = imgs[k];
                    const doImgExpand = () => {
                        const width = imgElement.getBoundingClientRect().width;
                        if (width >= 940){
                            imgElement.style.width = "100%";
                        }
                    }
                    imgElement.onload = doImgExpand;
                    doImgExpand();
                }
            }
        }
    }

    useEffect(() => {
        setHtmlList(htmlParser(props.html), () => {
            rePainting();
            imgResizing();
        });
    }, [props.html])

    useEffect(() => {
        rePainting();
    }, [props.theme])

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="txt0">문제</div>
            <div dangerouslySetInnerHTML={{ __html: htmlList[0] }}/>
            <div className="txt1">입출력 예제</div>
            { props.sampleInput.map((item, index) => <SampleLay index={ index + 1 }
            input={ props.sampleInput[index] } output={ props.sampleOutput[index] } theme={ props.theme }/>) }
            { /* sample */ }
            <div dangerouslySetInnerHTML={{ __html: htmlList[1] }}/>
        </div>
    )
}

export default ProblemView;