import { useSpring, animated } from 'react-spring';
import Layout from '../Layout';

import svgUpdate from '../svg_update.svg';
import svgClock from './svg_clock.svg';

const UpdateBox = (props) => {
    const style = {
        paddingTop: '10px', paddingLeft: '17px', paddingRight: '17px', paddingBottom: '12px',
        borderRadius: '15px', marginBottom: '13px'
    }
    const background = useSpring({ background: props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)' });

    return (
        <animated.div style={{ ...style, ...background }}>
            <div>
                <img src={ svgClock } alt="date" style={{ verticalAlign: 'middle', width: '18px' }}/>
                <span style={{ verticalAlign: 'middle', color: 'gray', fontSize: '16px', fontWeight: 400, marginLeft: '3px' }}>{ props.date }</span>
            </div>
            <div style={{ marginTop: '3px' }}>{ props.children }</div>
        </animated.div>
    )
}

const UpdateTxt = (props) => {
    const style = {
        fontSize: '16px', fontWeight: 300, marginBottom: '6px',
        color: (props.theme==='light' ? 'black' : 'white')
    }
    return (
        <div style={ style }>{ props.children }</div>
    )
}

const Update = (props) => {
    return (
        <div className="ND">
            <Layout.Title icon={ svgUpdate } theme={ props.theme }>업데이트 기록</Layout.Title>
            <div style={{ height: '20px' }}/>

            <UpdateBox theme={ props.theme } date="2021.11.30">
                <UpdateTxt theme={ props.theme }>블로깅이 추가되었습니다. 오일러OJ 메인에서 새로운 블로깅을 확인할 수 있으며 문제 페이지에서 블로깅 페이지에 접근이 가능합니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.11.11">
                <UpdateTxt theme={ props.theme }>채점 결과 페이지가 리모델링되었습니다. '에디터로 가져가기', '소스코드 다운로드'가 가능합니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.10.20">
                <UpdateTxt theme={ props.theme }>문제 페이지의 버그가 고쳐졌습니다. 문제 페이지에서 입출력 예제를 넓게 볼 수 있습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.10.15">
                <UpdateTxt theme={ props.theme }>문제/코딩마법서 페이지가 수정되었습니다. 각 코딩마법서 별 진도 현황을 확인할 수 있습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>페이지가 추가되었습니다. 페이지에서 '통계', '업데이트 기록', '개인정보 처리방침'을 확인할 수 있습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.08.10">
                <UpdateTxt theme={ props.theme }>소스 코드 제출 페이지에 에디터 설정이 반영됩니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.08.08">
                <UpdateTxt theme={ props.theme }>로그인 페이지에서 비밀번호 찾기가 가능합니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.08.05">
                <UpdateTxt theme={ props.theme }>계정 설정 페이지가 리모델링되었습니다. 설정 페이지의 언어 정렬에서 안 쓰는 언어를 숨길 수 있으며 '문제 클릭 시 에디터로 바로 이동' 기능이 추가되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.07.21">
                <UpdateTxt theme={ props.theme }>다크 테마 모드를 사용할 수 있습니다. 현재 일부 페이지는 지원되지 다크 모드가 지원되지 않습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.07.11">
                <UpdateTxt theme={ props.theme }>로그인 페이지가 리모델링되었습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>문제 목록 페이지가 리모델링되었습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>랭킹 페이지가 리모델링되었습니다.(랭킹 페이지에서 업적과 활동을 확인 할 수 있습니다.)</UpdateTxt>
                <UpdateTxt theme={ props.theme }>프로필 페이지가 리모델링되었습니다.(맞은 문제 분석 기능이 추가되었습니다.)</UpdateTxt>
                <UpdateTxt theme={ props.theme }>나와 비교하기 기능이 추가되었습니다.(두 사용자 간의 비교가 가능합니다. 프로필 페이지의 나와 비교하기 버튼을 눌러 사용할 수 있습니다.)</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.05.26">
                <UpdateTxt theme={ props.theme }>에디터에서 문제가 보이지 않던 버그가 고쳐졌습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.05.12">
                <UpdateTxt theme={ props.theme }>문제 페이지에서 자신의 최신 채점 결과를 확인할 수 있습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>북마크 기능을 사용할 수 있습니다. (문제 페이지에서 문제를 북마크에 추가한 뒤 태그/북마크 로 이동하여 확인할 수 있습니다.)</UpdateTxt>
                <UpdateTxt theme={ props.theme }>태그 페이지에서 시도했지만 틀린 문제를 확인할 수 있습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.05.10">
                <UpdateTxt theme={ props.theme }>오일러OJ의 태그 페이지가 리모델링되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.04.02">
                <UpdateTxt theme={ props.theme }>오일러OJ의 메인 페이지가 리모델링되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.03.12">
                <UpdateTxt theme={ props.theme }>오일러OJ의 문제 페이지가 리모델링되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.02.27">
                <UpdateTxt theme={ props.theme }>대회 페이지에서 '대회 기능 테스트'를 위한 '알파테스트 대회'가 개최되었습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>새로운 업적 '우승'이 추가되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.02.18">
                <UpdateTxt theme={ props.theme }>로그인 후 오일러OJ 헤더에서 채점 클릭시 내 채점 기록이 보여집니다. 모든 사용자의 채점 기록을 확인하시려면 '모든 채점 기록'을 클릭해 주세요.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2021.02.02">
                <UpdateTxt theme={ props.theme }>개인 설정에서 프로필 사진 변경시 장애가 발생하던 버그가 해결되었습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>채점 진행 사항이 실시간으로 표시되지 않는 버그가 해결되었습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>부분점수가 틀렸습니다로 표시되는 버그가 해결되었습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>일부 채점 결과에서 실행 시간과 메모리 사용량이 NaN으로 표시되는 버그가 해결되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.02.01">
                <UpdateTxt theme={ props.theme }>대회 및 지난 대회 페이지가 만들어졌습니다. 지난 대회 페이지에서 과거 오픈챌린지 대회 결과들을 확인할 수 있습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.01.24">
                <UpdateTxt theme={ props.theme }>PyPy3를 실행 및 채점할 수 있습니다. PyPy3로 제출시 Python3보다 실행 시간이 줄어들 수 있습니다. 이 점에 유의하여 소스 코드를 제출하시기 바랍니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.01.03">
                <UpdateTxt theme={ props.theme }>에디터 설정에서 폰트를 변경할 수 있습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.01.02">
                <UpdateTxt theme={ props.theme }>오일러OJ의 코딩 에디터가 리모델링되었습니다. (단축키, 초기화, 에러, 전체화면 등의 기능이 추가되었습니다.)</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.12.29">
                <UpdateTxt theme={ props.theme }>설정에서 언어정렬을 할 수 있습니다. 에디터, 제출 페이지의 언어 선택 창의 정렬 순서를 변경할 수 있습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.12.28">
                <UpdateTxt theme={ props.theme }>네이버 계정으로 소셜 로그인 및 연동이 가능합니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.12.26">
                <UpdateTxt theme={ props.theme }>회원가입에서 기존 사용자와 이메일 중복시 회원가입이 불가능합니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.12.25">
                <UpdateTxt theme={ props.theme }>구글 계정으로 소셜 로그인 및 연동이 가능합니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>프로필 사진 업로드시 압축되어 서버에 저장됩니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.12.24">
                <UpdateTxt theme={ props.theme }>카카오 계정으로 소셜 로그인 및 연동이 가능합니다. 로그인 시 소셜 로그인 버튼을 클릭하여 시도할 수 있으며, 내 계정 설정에서 연동된 소셜 계정들을 확인할 수 있습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.12.22">
                <UpdateTxt theme={ props.theme }>문제, 태그, 사용자 검색 기능이 추가되었습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>로그인 페이지가 리모델링되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.11.27">
                <UpdateTxt theme={ props.theme }>채점 페이지에서 언어를 기준으로 검색할 수 있습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>채점 페이지의 로딩 속도 개선이 이루어졌습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>일부 채점 결과가 '채점 진행중'에서 멈추는 버그가 해결되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.11.26">
                <UpdateTxt theme={ props.theme }>오일러OJ의 채점 페이지가 리모델링되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.11.24">
                <UpdateTxt theme={ props.theme }>오일러OJ의 문제 목록 페이지가 리모델링되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.11.21">
                <UpdateTxt theme={ props.theme }>오일러OJ의 헤더가 리모델링되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.11.04">
                <UpdateTxt theme={ props.theme }>새로운 업적 '이지팬갈비'가 생겼습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>4165번 채점이 가능합니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.10.25">
                <UpdateTxt theme={ props.theme }>오일러OJ의 문제 통계 페이지가 리모델링되었습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.10.23">
                <UpdateTxt theme={ props.theme }>Java(OpenJDK), R을 실행 및 채점할 수 있습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.10.22">
                <UpdateTxt theme={ props.theme }>태그 메뉴가 새롭게 추가되었습니다. 추후 북마크 기능이 새롭게 추가될 예정입니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.08.29">
                <UpdateTxt theme={ props.theme }>프로필에 업적과 활동이 추가되었습니다. 문제 풀이를 열심히하여 여러 업적들을 달성하시기 바랍니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.08.25">
                <UpdateTxt theme={ props.theme }>에디터 기능이 추가되었습니다. 문제 페이지에서 코딩 시작하기를 클릭하시면 사용하실 수 있습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.08.19">
                <UpdateTxt theme={ props.theme }>2104, 2142, 2143, 4332번 채점이 가능합니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.08.18">
                <UpdateTxt theme={ props.theme }>설정에서 프로필 사진 업로드를 할 수 있습니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.08.15">
                <UpdateTxt theme={ props.theme }>오일러STUDY에서 유튜브 영상을 시청할 수 있습니다. 오일러STUDY의 컨텐츠는 계속 새롭게 추가 될 예정입니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>프로필 페이지 접속 시간 문제가 해결되었습니다. 사이트의 전반적인 속도 계선이 지속적으로 이루어질 예정입니다.</UpdateTxt>
            </UpdateBox>
            <UpdateBox theme={ props.theme } date="2020.08.10">
                <UpdateTxt theme={ props.theme }>오일러OJ가 리뉴얼 되었습니다. 사이트 사용시 문제가 발생할 수 있으니 당황하지 마시고 오일러(eulerlab@naver.com) 또는 geon6757@kaist.ac.kr로 문의드리면 감사하겠습니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>기존 오일러OJ 사용자 분들은 기존 아이디로 로그인이 가능하되 비밀번호 재설정 부탁드립니다.</UpdateTxt>
                <UpdateTxt theme={ props.theme }>채점이 불가능한 문제ID: <strike>2104, 2142, 2143, 4165, 4332</strike>, 5418, 5443, 5447, 5454, 5478, 5490, 5516, 5525, 5526, 5558, 5560</UpdateTxt>
                <UpdateTxt theme={ props.theme }>프로필 페이지에 접속하는데 많은 시간이 소요되는 것이 확인되었습니다. 페이지를 불러오는 시간이 개선되도록 하겠습니다.</UpdateTxt>
            </UpdateBox>
        </div>
    )
}

export default Update;