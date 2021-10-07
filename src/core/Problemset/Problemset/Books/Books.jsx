import { Component, useState } from "react";
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';
import Top from '../ProblemsetTop';
import ImgBook from './Img/Img';
import Footer from '../../../Frame/Footer/Footer';

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

const PurchaseLink = (props) => {
    const [isHover, setHover] = useState(false);
    const style = useSpring({
        width: '200px', height: '140px', borderRadius: '12px', position: 'relative',
        border: `1px solid ${ props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(40,40,40)' }`,
        background: (props.theme==='light' ? 'rgb(255,255,255)' : 'rgb(20,21,22)'),
        boxShadow: `0px 5px 20px 2px rgba(50,50,50,${ isHover ? 0.05 : 0 })`,
        transform: `scale(${ isHover ? 1.01 : 1.0 })`,
        config: { duration: 100 }
    })
    const styleText = {
        position: 'absolute', bottom: '10px', right: '10px',
        fontSize: '14px', fontWeight: 300, color: (props.theme==='light' ? 'rgb(0,0,0)' : 'white')
    }
    return (
        <a href={ props.to } target="_blank">
            <animated.div style={ style } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                <div style={ styleText }>{ props.name }로 이동</div>
            </animated.div>
        </a>
    )
}

const Progress = (props) => {
    const style = {
        position: 'absolute', left: '10px', bottom: '10px', width: 'calc(100% - 20px)', height: '10px',
        overflow: 'hidden', borderRadius: '5px', border: `1px solid ${ props.theme === 'light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)' }`
    }
    const stylePer = {
        height: '100%', background: 'rgb(0, 134, 191)'
    }
    return (
        <div style={{ ...style }}>
            <div style={{ ...stylePer, width: '50%' }}/>
        </div>
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

                <Progress theme={ props.theme } value="10%"/>
            </animated.div>
        </Link>
    )
}

class BooksList extends Component {
    render(){
        return (
            <div className="ND">
                <Top category="books"/>
                <div style={{ background: 'rgba(120,120,120,0.05)' }}>
                    <div className="FRAME_MAIN">
                        <div style={{ height: '30px' }}/>
                        <Title theme={ this.props.theme }>코딩 마법서 문제 모음</Title>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 20px' }}>
                            <Book theme={ this.props.theme } img={ <ImgBook.Img01 theme={ this.props.theme }/> }
                            name="코딩마법서 1권<br>STONE VERSION" subname="C/C++" to="/"/>
                            <Book theme={ this.props.theme } img={ <ImgBook.Img02 theme={ this.props.theme }/> }
                            name="코딩마법서 1권<br>STONE VERSION" subname="파이썬" to="/"/>
                            <Book theme={ this.props.theme } img={ <ImgBook.Img03 theme={ this.props.theme }/> }
                            name="코딩마법서 1권<br>IRON VERSION" subname="C/C++" to=""/>
                            <Book theme={ this.props.theme } img={ <ImgBook.Img03 theme={ this.props.theme }/> }
                            name="기존 목록" to="/problemset/list/level"/>
                        </div>
                    </div>
                    <div style={{ height: '50px' }}/>
                </div>

                <div>
                    <div style={{ paddingTop: '30px', paddingBottom: '50px', display: 'flex' }} className="FRAME_MAIN">
                        <div style={{ width: '60%' }}>
                            <Title2 theme={ this.props.theme }>왜 '코딩마법서' 이어야 하나요?</Title2>
                            오일러TV
                        </div>
                        <div style={{ width: '40%', height: '300px', borderRadius: '10px', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/7Go50kHhTME" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }}></div>
                    </div>
                </div>

                <div style={{ background: 'rgba(120,120,120,0.05)' }}>
                    <div style={{ paddingTop: '30px', paddingBottom: '50px', display: 'flex' }} className="FRAME_MAIN">
                        <div style={{ width: '40%' }}>
                        </div>
                        <div style={{ width: '60%' }}>
                            <Title2 theme={ this.props.theme }>개념서를 통한 철저한 개념 학습</Title2>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'rgba(120,120,120,0.0)' }}>
                    <div style={{ paddingTop: '30px', paddingBottom: '50px', display: 'flex' }} className="FRAME_MAIN">
                        <div style={{ width: '60%' }}>
                            <Title2 theme={ this.props.theme }>연습문제와 오일러OJ를 활용한 실전 테스트</Title2>
                        </div>
                        <div style={{ width: '40%' }}>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'rgba(120,120,120,0.05)' }}>
                    <div style={{ paddingTop: '30px', paddingBottom: '50px', display: 'flex' }} className="FRAME_MAIN">
                        <div style={{ width: '40%' }}>
                        </div>
                        <div style={{ width: '60%' }}>
                            <Title2 theme={ this.props.theme }>해법서를 통해서 오일러만의 비법 전수</Title2>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'rgba(120,120,120,0.0)' }}>
                    <div className="FRAME_MAIN">
                        <div style={{ height: '30px' }}/>
                        <Title2 theme={ this.props.theme }>코딩마법서 시리즈</Title2>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '100%' }}>코딩마법서는 기초부터 심화까지 모두 6단계로 나누어 순차적으로 출간할 예정입니다.</div>
                        </div>
                    </div>
                    <div style={{ height: '50px' }}/>
                </div>

                <div style={{ background: 'rgba(120,120,120,0.05)' }}>
                    <div className="FRAME_MAIN">
                        <div style={{ height: '30px' }}/>
                        <Title2 theme={ this.props.theme }>코딩마법서 구매하기</Title2>
                        <Text theme={ this.props.theme }>코딩마법서는 교보문고, YES24, 스마트스토어, 알라딘, 쿠팡에서 구매하실 수 있습니다.</Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 12px' }}>
                            <PurchaseLink theme={ this.props.theme } name="교보문고" to="https://search.kyobobook.co.kr/web/search?vPstrKeyWord=%ec%98%a4%ec%9d%bc%eb%9f%acBOOKS&orderClick=LOA&searchPcondition=1&searchPubCd=44125"/>
                            <PurchaseLink theme={ this.props.theme } name="YES24" to="http://www.yes24.com/SearchCorner/Search?scode=032&ozsrank=2&company_yn=y&query=%bf%c0%c0%cf%b7%afbooks&domain=all"/>
                            <PurchaseLink theme={ this.props.theme } name="스마트스토어" to="https://smartstore.naver.com/eulerbooks"/>
                            <PurchaseLink theme={ this.props.theme } name="알라딘" to="https://www.aladin.co.kr/search/wsearchresult.aspx?PublisherSearch=%ec%98%a4%ec%9d%bc%eb%9f%acBOOKS@381478&BranchType=1"/>
                            <PurchaseLink theme={ this.props.theme } name="쿠팡" to="https://www.coupang.com/np/search?component=&q=%EC%BD%94%EB%94%A9%EB%A7%88%EB%B2%95%EC%84%9C&channel=user"/>
                        </div>
                    </div>
                    <div style={{ height: '50px' }}/>
                </div>
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
            </div>
        )
    }
}

export default BooksList;