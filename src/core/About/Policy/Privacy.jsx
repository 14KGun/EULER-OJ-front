import Layout from '../Layout';
import svgGavel from '../svg_gavel.svg';

const Privacy = (props) => {
    return (
        <div className="ND">
            <Layout.Title icon={ svgGavel } theme={ props.theme }>개인정보 처리방침</Layout.Title>
            
            <div style={{ height: '30px' }}/>
            <Layout.Content theme={ props.theme }>오일러 주식회사는 이용자들의 개인정보를 철저히 보호하며 불법적인 정보사용, 정보유출 등으로 인한 피해가 발생하지 않도록 노력하고 있으며, 개인정보와 관련된 법령상의 개인정보보호 규정을 준수하고 있습니다.</Layout.Content>
            
            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>1. 수집하는 개인정보 항목 및 수집방법</Layout.Content2>
            <Layout.Content theme={ props.theme }>(1) 수집항목 : 이메일(필수사항), 학교(선택사항)<br/>(2) 개인정보 수집방법 : 홈페이지를 통한 회원가입</Layout.Content>

            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>2. 개인정보의 수집 및 이용목적</Layout.Content2>
            <Layout.Content theme={ props.theme }>사이트는 수집한 개인정보를 다음의 목적을 위해 활용합니다.<br/>(1) 회원 관리 : 회원제 서비스 이용에 따른 개인 식별, 불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 가입 및 가입횟수 제한, 분쟁 조정을 위한 기록 보존, 불만처리 등 민원처리, 고지사항 전달<br/>(2) 신규 서비스 개발 및 마케팅 및 광고에 활용 : 신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공, 서비스 유효성 확인, 이벤트 및 광고성 정보 제공 및 참여기회제공, 접속 빈도 파악, 회원의 서비스 이용에 대한 통계</Layout.Content>
        
            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>3. 개인정보의 보유 및 이용기간</Layout.Content2>
            <Layout.Content theme={ props.theme }>사이트는 회원가입일로부터 서비스를 제공하는 기간 동안에 한하여 이용자의 개인정보를 보유 및 이용하게 됩니다. 이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.<br/>(1) 보존 항목: 이메일, 아이디<br/>(2) 보존 근거: 서비스 이용의 혼선 방지, 불법적 사용자에 대한 관련 기관 수사협조<br/>(3) 보존 기간: 6개월<br/>그리고 관계법령의 규정에 의하여 보존할 필요가 있는 경우 사이트는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</Layout.Content>
        
            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>4. 개인정보 보관기간</Layout.Content2>
            <Layout.Content theme={ props.theme }>(1) 웹사이트 방문기록 : 3개월 (통신비밀보호법)<br/>(2) 본인확인에 관한 기록 : 6개월 (정보통신망 이용촉진 및 정보보호 등에 관한 법률)</Layout.Content>

            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>5. 개인정보의 파기절차 및 방법</Layout.Content2>
            <Layout.Content theme={ props.theme }>사이트는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.<br/>(1) 파기절차 : 이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다. 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.<br/>(2) 파기방법 : 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</Layout.Content>
        
            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>6. 개인정보 제공 및 공유</Layout.Content2>
            <Layout.Content theme={ props.theme }>사이트는 이용자들의 개인정보를 "개인정보의 수집 및 이용목적"에서 고지한 범위내에서 사용하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.<br/>(1) 이용자들이 사전에 동의한 경우 : 개인정보 제공 이전에 개인정보 제공자, 개인정보 제공 목적, 제공하는 개인정보의 항목 및 보유기간을 별도로 알리고 동의절차를 거치며, 이에 이용자가 동의하지 않을 경우에는 제 3자에게 이용자의 개인정보를 제공하지 않습니다.<br/>(2) 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</Layout.Content>
            
            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>7. 개인정보취급 위탁</Layout.Content2>
            <Layout.Content theme={ props.theme }>사이트는 개인정보 취급 업무를 외부 전문업체에 위탁하여 운영하고 있지 않습니다.</Layout.Content>

            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>8. 이용자 및 법정대리인의 권리와 그 행사방법</Layout.Content2>
            <Layout.Content theme={ props.theme }>이용자 및 법정대리인(본인의 위임을 받지 않고도 법률의 규정에 의하여 대리권의 효력이 발생하는 자로 미성년자에 대한 친권자나 후견인 등을 말함)은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다. 이용자 혹은 만 14세 미만 아동의 개인정보 조회/수정을 위해서는 '개인정보변경'(또는 '회원정보관리' 등)을 통하여 가능하며, 가입해지(동의철회)를 위해서는 "회원탈퇴"를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.<br/>또는 개인정보관리책임자에게 서면, 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.<br/>이용자가 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다. 사이트는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.</Layout.Content>
        
            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>9. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항</Layout.Content2>
            <Layout.Content theme={ props.theme }>사이트는 이용자에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의 정보를 수시로 저장하고 불러오는 '쿠키(cookie)'를 운용합니다. 쿠키란 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은 텍스트 파일로서 이용자의 컴퓨터 하드디스크에 저장됩니다. 사이트는 다음과 같은 목적을 위해 쿠키를 사용합니다.<br/>(1) 쿠키의 사용 목적 : 회원과 비회원의 접속 빈도나 방문 시간 등을 분석, 이용자의 취향과 관심분야를 파악 및 자취 추적, 방문 회수 파악 등을 통한 개인 맞춤 서비스 제공 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.<br/>(2) 쿠키 설정 거부 방법 : 쿠키 설정을 거부하는 방법으로는 이용자가 사용하는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다. 단, 쿠키 설치를 거부하였을 경우 로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다.</Layout.Content>
            
            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>10. 개인정보의 기술적, 관리적 보호 대책</Layout.Content2>
            <Layout.Content theme={ props.theme }>사이트는 이용자의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안정성 확보를 위하여 다음과 같은 기술적, 관리적 대책을 강구하고 있습니다.<br/>(1) 개인정보 암호화: 이용자의 개인정보는 비밀번호에 의해 보호되며, 중요한 데이터는 파일 및 전송 데이터를 암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 통해 보호 하고 있습니다.<br/>(2) 해킹 등에 대비한 기술적 대책 : 사이트는 해킹이나 컴퓨터 바이러스 등에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 침입 차단장치 이용 및 침입탐지시스템을 설치하여 24시간 감시하고 있습니다.<br/>(3) 개인정보처리시스템 접근 제한 : 사이트는 개인정보를 처리할 수 있도록 체계적으로 구성한 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소 등에 관한 기준을 수립하고 비밀번호의 생성 방법, 변경 주기 등을 규정 운영하며 기타 개인정보에 대한 접근통제를 위해 필요한 조치를 다하고 있습니다.<br/>(4) 개인 아이디와 비밀번호 관리: 이용자가 사용하는 아이디와 비밀번호는 원칙적으로 이용자만이 사용하도록 되어 있습니다. 사이트는 이용자의 개인적인 부주의로 ID, 비밀번호, 이메일 등 개인정보가 유출되어 발생한 문제와 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다. 비밀번호에 대한 보안 의식을 가지고 비밀번호를 자주 변경하며 공용PC에서의 로그인시 개인정보가 유출되지 않도록 각별한 주의를 기울여 주시기 바랍니다.</Layout.Content>
        
            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>11. 개인정보에 관한 민원서비스</Layout.Content2>
            <Layout.Content theme={ props.theme }>사이트는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인정보관리책임자를 지정하고 있습니다. 이용자는 사이트의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자에게 신고하실 수 있습니다. 사이트느 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.</Layout.Content>
        
            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>개인정보 관리책임자</Layout.Content2>
            <Layout.Content theme={ props.theme }>성명: 김선욱<br/>메일: eulerlab@naver.com</Layout.Content>

            <div style={{ height: '30px' }}/>
            <Layout.Content theme={ props.theme }>기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.<br/>개인정보침해신고센터 (www.118.or.kr / 118)<br/>정보보호마크인증위원회 (www.eprivacy.or.kr / 02-580-0533~4)<br/>대검찰청 첨단범죄수사과 (www.spo.go.kr / 02-3480-2000)<br/>경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02-392-0330)</Layout.Content>
            
            <div style={{ height: '30px' }}/>
            <Layout.Content2 theme={ props.theme }>12. 부칙</Layout.Content2>
            <Layout.Content theme={ props.theme }>법령 및 정책 또는 보안기술의 변경에 따라 내용의 추가. 삭제 및 수정이 있을 시에는 변경사항의 시행일의 최소 7일 전부터 사이트를 통하여 고지할 것 입니다. 다만, 회원의 권리 또는 의무에 중요한 내용의 변경은 최소 30일전에 고지하겠습니다.</Layout.Content>
            
            <div style={{ height: '30px' }}/>
            <Layout.Content theme={ props.theme }>시행일자 : 2019년 4월 1일</Layout.Content>
            <Layout.Margin/>
        </div>
    )
}

export default Privacy;