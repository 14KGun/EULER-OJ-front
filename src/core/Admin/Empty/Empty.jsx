import Layout from '../Layout';

import svgAdmin from '../svg_admin.svg';

const Empty = (props) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <img src={ svgAdmin } style={{ width: '100px' }} alt=""/>
            <div style={{ color: (props.theme==='light' ? 'black' : 'white'), fontSize: '20px', fontWeight: 500 }}>관리자 모드</div>
        </div>
    )
}

export default Empty