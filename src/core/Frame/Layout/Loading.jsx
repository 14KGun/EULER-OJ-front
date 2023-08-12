import Loading from '../Loading/Loading';

const LoadingLay = (props) => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px',
            color: (props.theme==='light' ? 'black' : '#aaa') }}>
                { props.children }
            </div>
        </div>
    )
}

LoadingLay.defaultProps = {
    theme: 'light',
    children: '페이지 불러오는 중....'
}

export default LoadingLay;