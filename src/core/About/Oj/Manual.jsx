import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Layout from '../Layout';
import ConsoleSub from './ManualConsoleSub';

import svgInfo from '../svg_info.svg';
import svgIn from './svg_in.svg';
import svgCode from './svg_code.svg';
import svgOff from './svg_off.svg';
import svgOn from './svg_on.svg';

const Console = (props) => {
    const [isHover, setHover] = useState(false);
    const trans = useSpring({ 
        transform: `scale(${ isHover ? 1.01 : 1.0 })`
    })
    return (
        <animated.div style={{ background: 'rgb(20,20,02)', borderRadius: '12px', position: 'relative', ...trans }}
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <div style={{ height: '12px', paddingLeft: '15px', paddingTop: '15px', paddingBottom: '15px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '6px', background: 'rgb(250, 50,50)', float: 'left' }}/>
                <div style={{ width: '12px', height: '12px', borderRadius: '6px', background: 'rgb(250,185,55)', float: 'left', marginLeft: '7px' }}/>
                <div style={{ width: '12px', height: '12px', borderRadius: '6px', background: 'rgb(36, 228,36)', float: 'left', marginLeft: '7px' }}/>
            </div>
            <div style={{ paddingLeft: '15px', paddingRight: '15px', paddingBottom: '17px', color: 'white', fontWeight: 300, fontSize: '17px', letterSpacing: '1px' }} className="content-d">
                { props.children }
            </div>
            { props.add ? props.add : <></> }
        </animated.div>
    )
}

const Manual = (props) => {
    return (
        <div className="ND">
            <Layout.Title icon={ svgIn } theme={ props.theme }>오일러OJ 회원가입 하기</Layout.Title>
            <div style={{ paddingLeft: '15px' }}>
                <Layout.Content theme={ props.theme }>① https://euleroj.io 에 접속한 후 회원가입을 위해 상단 메뉴의 '로그인' 버튼을 클릭합니다.</Layout.Content>
                <Layout.Content theme={ props.theme }>② '회원가입' 버튼을 클릭합니다.</Layout.Content>
                <Layout.Content theme={ props.theme }>③ 이메일 주소를 인증하여 회원가입을 진행 할 수도 있고 소셜(SNS) 계정으로도 회원가입이 가능합니다.</Layout.Content>
                <Layout.Content theme={ props.theme }>④ 만일 이메일 주소로 회원가입을 진행하면 작성한 이메일 주소로 메일이 전송된다. 인증하기를 클릭하여 회원가입을 완료해주세요.</Layout.Content>
            </div>
            
            <div style={{ height: '60px' }}/>
            <Layout.Title icon={ svgCode } theme={ props.theme }>로그인 후 소스 코드 제출하기</Layout.Title>
            <div style={{ paddingLeft: '15px' }}>
                <Layout.Content theme={ props.theme }>① 상단 메뉴의 로그인 버튼을 눌러주세요.</Layout.Content>
                <Layout.Content theme={ props.theme }>② 이메일 주소로 회원가입을 하였으면 ID와 PASSWORD를 입력한 후 'GO' 버튼을 클릭하고 소셜(SNS) 계정으로 회원가입을 했으면 '소셜 로그인'을 클릭합니다.</Layout.Content>
            </div>
            
            <div style={{ height: '60px' }}/>
            <Layout.Title icon={ svgOff } theme={ props.theme }>온라인 채점 시 정답으로 인정되지 않는 경우</Layout.Title>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '15px' }}>
                <div style={{ width: 'calc(60% - 15px)' }}>
                    <Layout.Content theme={ props.theme }>출력이 입력 바로 다음 줄에 발생하지 않는 경우, 예를 들어서 1과 2를 입력한 후 출력의 첫째 줄에 3이 출력되어야 하는데 출력의 둘째 줄에 3이 출력되는 경우는 정답으로 인정되지 않습니다.</Layout.Content>
                </div>
                <div style={{ width: '40%' }}>
                    <Console>1<br/>2<br/><br/>3</Console>
                </div>
            </div>
            <div style={{ height: '10px' }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '15px' }}>
                <div style={{ width: 'calc(60% - 15px)' }}>
                    <Layout.Content theme={ props.theme }>출력의 예시에는 공백이 없는데 출력의 앞부분에 공백이 발생한 경우, 예를 들어서 출력의 첫째 줄에 3이 출력되어야 하는데 앞에 공백이 발생한 후 3이 출력되는 경우는 정답으로 인정되지 않습니다.</Layout.Content>
                </div>
                <div style={{ width: '40%' }}>
                    <Console>1<br/>2<br/>&nbsp;3</Console>
                </div>
            </div>
            <div style={{ height: '10px' }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '15px' }}>
                <div style={{ width: 'calc(60% - 15px)' }}>
                    <Layout.Content theme={ props.theme }>출력의 예시에는 공백이 없는데 출력의 사이에 공백이 발생한 경우, 예를 들어서 출력의 첫째 줄에 1+2=3이 출력되어야 하는데 1 + 2 = 3이 출력되는 경우 또는 반대로 공백이 발생되어 1 + 2 = 3이 출력되어야 하는데 1+2=3이 출력되는 경우는 정답으로 인정되지 않습니다.</Layout.Content>
                </div>
                <div style={{ width: '40%' }}>
                    <Console>1<br/>2<br/>1 + 2 = 3</Console>
                </div>
            </div>
            <div style={{ height: '10px' }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '15px' }}>
                <div style={{ width: 'calc(60% - 15px)' }}>
                    <Layout.Content theme={ props.theme }>대문자 YES가 출력되어야 하는데 소문자 yes가 출력되는 경우 또는 반대로 소문자 yes가 출력되어야 하는데 대문자 YES가 출력되는 경우는 정답으로 인정되지 않습니다.</Layout.Content>
                </div>
                <div style={{ width: '40%' }}>
                    <Console>yes</Console>
                </div>
            </div>

            <div style={{ height: '60px' }}/>
            <Layout.Title icon={ svgOn } theme={ props.theme }>온라인 채점 시 정답으로 인정되는 경우</Layout.Title>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '15px' }}>
                <div style={{ width: 'calc(60% - 15px)' }}>
                    <Layout.Content theme={ props.theme }>출력의 마지막에 공백이 발생하는 경우, 예를 들어서 출력의 첫째 줄에 3이 출력되어야 하는데 3이 출력된 후 뒤에 공백이 출력되는 경우는 정답으로 인정됩니다.</Layout.Content>
                </div>
                <div style={{ width: '40%' }}>
                    <Console add={ <ConsoleSub.T1/> }>1<br/>2<br/>3</Console>
                </div>
            </div>

            <div style={{ height: '20px' }}/>
            <div style={{ paddingLeft: '15px' }}>
                <Layout.Content theme={ props.theme }>테스트 케이스가 여러 개인 경우에는 모든 테스트 케이스를 입력받고 테스트 케이스에 대한 정답을 마지막에 각 줄에 출력하여도 정답으로 인정되지만 각각의 테스트 케이스에 대해서 테스트 케이스마다 각 줄에 정답을 출력하여도 정답으로 인정됩니다. 예를 들어서 두 개의 정수를 입력받아 각각의 정수에 대한 약수의 합을 구하는 프로그램을 작성한다고 해봅시다.</Layout.Content>
                <div style={{ height: '10px' }}/>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: 'calc(34% - 30px)' }}>
                        <Layout.Content theme={ props.theme }>1에 대한 약수의 합 1이 출력의 첫째 줄에 출력되고 6에 대한 약수의 합 12가 출력의 둘째 줄에 출력될 때 위의 두 가지 경우 모두 정답으로 인정됩니다.</Layout.Content>
                    </div>
                    <div style={{ width: '33%' }}>
                        <Console add={ <ConsoleSub.T2/> }>1<br/>6<br/>1<br/>12</Console>
                    </div>
                    <div style={{ width: '33%' }}>
                        <Console add={ <ConsoleSub.T3/> }>1<br/>1<br/>6<br/>12</Console>
                    </div>
                </div>
            </div>
            
            <div style={{ height: '60px' }}/>
            <Layout.Title icon={ svgCode } theme={ props.theme }>본인이 제출한 소스 코드 확인하기</Layout.Title>
            <div style={{ paddingLeft: '15px' }}>
                <Layout.Content theme={ props.theme }>제출한 소스코드의 확인은 본인이 작성한 코드만 가능합니다.</Layout.Content>
            </div>

            <div style={{ height: '60px' }}/>
            <Layout.Title icon={ svgInfo } theme={ props.theme }>그 밖의 메뉴 소개하기</Layout.Title>
        </div>
    );
}

export default Manual;