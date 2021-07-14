import { useHistory } from 'react-router-dom';

const Page5 = (props) => {
    const history = useHistory();
    history.push(props.data.redirect);
    return <div/>;
}

export default Page5;