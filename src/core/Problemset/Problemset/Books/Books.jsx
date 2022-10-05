import { Component, useState } from "react";
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Top from '../ProblemsetTop';
import ImgBook from './Img/Img';
import PurchaseLink from './PurchaseLink/PurchaseLink'
import Footer from '../../../Frame/Footer/Footer';
import axios from '../../../Tool/axios';

import imgExp1 from './img_exp1.png';
import imgExp2 from './img_exp2.png';
import imgExp3 from './img_exp3.png';

const Title = (props) => {
    const style = {
        fontSize: '23px', fontWeight: 500, marginBottom: '15px',
        color: (props.theme==='light' ? 'rgb(0,0,0)' : 'white')
    }
    return (
        <div style={ style }>{ props.children }</div>
    )
}
const Title2 = (props) => {
    const style = {
        fontSize: '30px', fontWeight: 900, marginBottom: '15px',
        color: (props.theme==='light' ? 'rgb(60,60,60)' : 'rgb(200,200,200)')
    }
    return (
        <div style={ style }>{ props.children }</div>
    )
}
const Text = (props) => {
    const style = {
        fontSize: '17px', fontWeight: 300, marginBottom: '15px',
        color: (props.theme==='light' ? 'rgb(60,60,60)' : 'rgb(200,200,200)')
    }
    return (
        <div style={ style }>{ props.children }</div>
    )
}
const LevLisEle = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        postion: 'relative', display: 'flex', overflow: 'hidden', marginBottom: '7px',
        border: `1px solid ${ props.theme==='light' ? 'rgb(210,210,210)' : 'rgb(60,60,60)' }`,
        borderRadius: '10px', transform: `scale(${ isHover ? 1.01 : 1.0 })`,
        config: { duration: 150 }
    });
    const style1 = {
        width: '23%', padding: '10px',
        background: 'rgb(0,134,191)',
        fontSize: '17px', fontWeight: 500, color: 'white', textAlign: 'center'
    }
    const style2 = {
        width: '77%', padding: '10px',
        fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white')
    }
    return (
        <animated.div style={ style } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <div style={ style1 }>{ props.level } LEVEL</div>
            <div style={ style2 }>{ props.children }</div>
        </animated.div>
    )
}

const Progress = (props) => {
    const style = {
        position: 'absolute', left: '15px', bottom: '15px', width: 'calc(100% - 30px)', height: '10px',
        overflow: 'hidden', borderRadius: '5px', border: `1px solid ${ props.theme === 'light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)' }`
    }
    const stylePer = {
        height: '100%', background: 'rgb(0, 134, 191)'
    }
    const styleTxt = {
        position: 'absolute', right: '15px', bottom: '27px',
        fontSize: '13px', color: 'gray'
    }
    const width = useSpring({
        width: `${ props.value ? props.value[0]/props.value[1]*100 : 0 }%`
    })

    if(props.value === undefined) return <></>
    return (
        <>
            <div style={ styleTxt }>{ props.value[0] } / { props.value[1] }</div>
            <div style={{ ...style }}>
                <animated.div style={{ ...stylePer, ...width }}/>
            </div>
        </>
    )
}
const Book = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        width: '250px', height: '300px', borderRadius: '12px',
        overflow: 'hidden', position: 'relative',
        border: `1px solid ${ props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(40,40,40)' }`,
        background: (props.theme==='light' ? 'rgb(255,255,255)' : 'rgb(20,21,22)'),
        boxShadow: `0px 5px 30px 5px rgba(50,50,50,${ isHover ? 0.1 : 0 })`,
        transform: `scale(${ isHover ? 1.01 : 1.0 })`,
        config: { duration: 100 }
    })
    const styleName = {
        marginLeft: '15px', marginTop: '10px', marginRight: '15px',
        fontSize: '16px', fontWeight: 300, color: (props.theme==='light' ? 'black' : 'white'),
    }
    const styleSub = {
        marginLeft: '15px', marginTop: '2px', marginRight: '15px', textAlign: 'right',
        fontSize: '14px', fontWeight: 300, color: 'gray',
    }

    return (
        <Link to={ props.to }>
            <animated.div style={ style } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={{ height: '170px', background: 'gray' }}>{ props.img }</div>
                <div style={ styleName } dangerouslySetInnerHTML={{ __html: props.name }}/>
                <div style={ styleSub }>{ props.subname }</div>

                <Progress theme={ props.theme } value={ props.progress }/>
            </animated.div>
        </Link>
    )
}

class BooksList extends Component {
    constructor(props){
        super(props);

        this.onCall = false;
        this.state = {};
    }
    render(){
        if(this.onCall === false){
            this.onCall = true;
            axios.get('/json/problems-books/progress').then(({ data }) => {
                for(let i=0; i<data.array.length; i++){
                    if(data.array[i].id === 'c++_stone') this.setState({ prog1: data.array[i].progress }); 
                    if(data.array[i].id === 'python_stone') this.setState({ prog2: data.array[i].progress }); 
                    if(data.array[i].id === 'c++_iron') this.setState({ prog3: data.array[i].progress }); 
                    if(data.array[i].id === 'c++_bronze') this.setState({ prog4: data.array[i].progress }); 
                }
            })
        }

        return (
            <div className="ND">
                <Helmet><title>코딩마법서 : 오일러OJ</title></Helmet>
                <Top category="books"/>
                <div style={{ background: 'rgba(120,120,120,0.05)' }}>
                    <div className="FRAME_MAIN">
                        <div style={{ height: '30px' }}/>
                        <Title theme={ this.props.theme }>코딩마법서 문제 모음</Title>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 20px' }}>
                            <Book theme={ this.props.theme } img={ <ImgBook.Img01 theme={ this.props.theme }/> }
                            name="코딩마법서 1권<br>STONE VERSION" subname="C/C++" to="/problemset/list/books/c++_stone" progress={ this.state.prog1 }/>
                            <Book theme={ this.props.theme } img={ <ImgBook.Img02 theme={ this.props.theme }/> }
                            name="코딩마법서 1권<br>STONE VERSION" subname="파이썬" to="/problemset/list/books/python_stone" progress={ this.state.prog2 }/>
                            <Book theme={ this.props.theme } img={ <ImgBook.Img03 theme={ this.props.theme }/> }
                            name="코딩마법서 2권<br>IRON VERSION" subname="C/C++" to="/problemset/list/books/c++_iron" progress={ this.state.prog3 }/>
                            <Book theme={ this.props.theme } img={ <ImgBook.Img04 theme={ this.props.theme }/> }
                            name="코딩마법서 3권<br>BRONZE VERSION" subname="C/C++" to="/problemset/list/books/c++_bronze" progress={ this.state.prog4 }/>
                            <Book theme={ this.props.theme } img={ <ImgBook.ImgNone theme={ this.props.theme }/> }
                            name="기존 목록" to="/problemset/list/level" progress={ undefined }/>
                        </div>
                    </div>
                    <div style={{ height: '50px' }}/>
                </div>

                <div>
                    <div style={{ paddingTop: '60px', paddingBottom: '80px', display: 'flex', justifyContent: 'space-between' }} className="FRAME_MAIN">
                        <div style={{ width: 'calc(60% - 30px)' }}>
                            <Title2 theme={ this.props.theme }>왜 '코딩마법서' 이어야 하나요?</Title2>
                            <Text theme={ this.props.theme }>코딩테스트 왜 어렵냐면요. 여러분은 문법을 공부한 후에 모든 공부가 끝났다고 생각을 합니다. 그러나 막상 코딩테스트 시험이나 또는 온라인 저지시스템(Online Judge)에 가서 문제를 풀어보게 되면 문제가 해결되지 않는 경험을 한 번쯤은 해보셨을 겁니다. 문법도 중요하지만 문법을 공부한 후에 기본적인 수학 지식을 올리고, 그 위에 기초 자료구조를 올리고, 다시 그 위에 알고리즘을 쌓는 피라미드 구조여야 합니다. 하지만 시중에 나와있는 대부분 서적이나 강의들은 기초문법만 설명하거나 또는 고급 알고리즘만 설명하고 있습니다. 그래서 오일러는 여러분들이 체계적으로 학습할 수 있도록 학습서를 준비하였습니다.</Text>
                        </div>
                        <div style={{ width: '40%', height: '300px', borderRadius: '10px', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/7Go50kHhTME" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }}></div>
                    </div>
                </div>

                <div style={{ background: 'rgba(120,120,120,0.05)' }}>
                    <div style={{ paddingTop: '50px', paddingBottom: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="FRAME_MAIN">
                        <div style={{ width: '50%' }}>
                            <img src={ imgExp1 } alt="" style={{ width: '100%' }}/>
                        </div>
                        <div style={{ width: 'calc(50% - 60px)' }}>
                            <Title2 theme={ this.props.theme }>개념서를 통한 철저한 개념 학습</Title2>
                            <Text theme={ this.props.theme }>개념서는 코딩테스트를 하기 위해서 알아야 하는 기초 수학적 지식과 자료구조 그리고 알고리즘이 담겨 있습니다.</Text>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'rgba(120,120,120,0.0)' }}>
                    <div style={{ paddingTop: '50px', paddingBottom: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="FRAME_MAIN">
                        <div style={{ width: 'calc(50% - 60px)' }}>
                            <Title2 theme={ this.props.theme }>연습문제와 오일러OJ를 활용한 실전 테스트</Title2>
                            <Text theme={ this.props.theme }>코딩 교육을 위해서는 갖추고 있어야 할 시스템이 있습니다. 작성한 프로그램을 채점할 수 있는온라인저지(Online Judge) 시스템이 필요합니다. 그래야 내가 작성한 프로그램이 올바르게 실행되는지 채점 및 확인을 할 수 있기 때문입니다. 오일러는 온라인저지(Online Judge) 시스템인 '오일러OJ'를 20년동안 개발하며 교육해왔습니다. '코딩마법서'와 '오일러OJ' 그리고 '오일러TV'를 통해서 가장 기초부터 모든 것을 알려드리며 같이 공부해 나가도록 하겠습니다.</Text>
                        </div>
                        <div style={{ width: '50%' }}>
                            <img src={ imgExp2 } alt="" style={{ width: '100%' }}/>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'rgba(120,120,120,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' }} className="FRAME_MAIN">
                        <div style={{ width: '40%', paddingTop: '50px' }}>
                            <img src={ imgExp3 } alt="" style={{ width: '100%' }}/>
                        </div>
                        <div style={{ width: 'calc(60% - 60px)' }}>
                            <Title2 theme={ this.props.theme }>해법서를 통해서 오일러만의 비법 전수</Title2>
                            <Text theme={ this.props.theme }>정답지는 오일러만의 비법이 담겨있습니다. 내가 작성한 풀이도 좋지만, 오일러의 풀이를 참고한다면 나중에 더 어려운 문제를 풀 때 큰 도움이 될 것입니다. 코딩 문제 풀이를 한 이후에 정답지를 꼭! 보시길 추천드립니다.</Text>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'rgba(120,120,120,0.0)' }}>
                    <div style={{ paddingTop: '50px', paddingBottom: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="FRAME_MAIN">
                        <div style={{ width: 'calc(40% - 60px)' }}>
                            <Title2 theme={ this.props.theme }>코딩마법서 시리즈</Title2>
                            <Text theme={ this.props.theme }>코딩마법서는 기초부터 심화까지 모두 6단계로 나누어 순차적으로 출간할 예정입니다.</Text>
                        </div>
                        <div style={{ width: '60%' }}>
                            <LevLisEle theme={ this.props.theme } level="STONE">기본문법, 기초수학, 기초자료구조, STONE 100제</LevLisEle>
                            <LevLisEle theme={ this.props.theme } level="IRON">기본문법, 중급수학, 기초알고리즘1, IRON 100제</LevLisEle>
                            <LevLisEle theme={ this.props.theme } level="BRONZE">기본문법, 중급자료구조, 기초알고리즘2, BRONZE 100제</LevLisEle>
                            <LevLisEle theme={ this.props.theme } level="SILVER">기본문법, 고급자료구조, 중급알고리즘, SILVER 100제</LevLisEle>
                            <LevLisEle theme={ this.props.theme } level="GOLD">기본문법, 고급알고리즘, GOLD 100제</LevLisEle>
                            <LevLisEle theme={ this.props.theme } level="PLATINUM">국제대회 문제풀이 - 국제정보올림피아드(IOI), 아시아태평양(APIO), ACM-ICPC</LevLisEle>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'rgba(120,120,120,0.05)' }}>
                    <div className="FRAME_MAIN">
                        <div style={{ height: '30px' }}/>
                        <Title2 theme={ this.props.theme }>코딩마법서 구매하기</Title2>
                        <Text theme={ this.props.theme }>코딩마법서는 교보문고, YES24, 스마트스토어, 알라딘, 쿠팡에서 구매하실 수 있습니다.</Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 12px' }}>
                            <PurchaseLink.Item1 theme={ this.props.theme }/>
                            <PurchaseLink.Item2 theme={ this.props.theme }/>
                            <PurchaseLink.Item3 theme={ this.props.theme }/>
                            <PurchaseLink.Item4 theme={ this.props.theme }/>
                            <PurchaseLink.Item5 theme={ this.props.theme }/>
                        </div>
                    </div>
                    <div className="BTM_EMPTY"/>
                </div>
                <Footer theme={ this.props.theme }/>
            </div>
        )
    }
}

export default BooksList;