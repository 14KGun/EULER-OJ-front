import { useHistory } from 'react-router-dom';
import Layout from './Layout';
import svgLogout from './svg_logout.svg';

const Logout = (props) => {
    const history = useHistory();
    const onClick = () => history.push('/logout');

    return (
        <div className="ND">
            <Layout.Title icon={ svgLogout } theme={ props.theme }>로그아웃</Layout.Title>
            <Layout.Content theme={ props.theme }>로그아웃 할까요?</Layout.Content>
            <div style={{ height: '10px' }}/>
            <Layout.SubmitBtnLay onClick={ () => onClick() }>로그아웃</Layout.SubmitBtnLay>
        </div>
    )
}

export default Logout