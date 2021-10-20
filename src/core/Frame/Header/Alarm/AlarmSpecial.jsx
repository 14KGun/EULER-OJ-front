const Cookie = () => {
    const styleText = {
        padding: '15px',
        fontSize: '14px', fontWeight: 300, color: 'black'
    }
    return (
        <div>
            <div style={ styleText }>오일러OJ 웹사이트는 쿠키를 사용합니다. 쿠키에 대한 자세한 정보 및 삭제 방법은 <a href="/about/policy/privacy"><u>개인정보처리방침</u></a>을 참고하시기 바라며 본 사이트를 계속해서 이용하는 것은 오일러OJ의 쿠키 사용에 동의함을 의미합니다.</div>
        </div>
    )
}

export default { Cookie }