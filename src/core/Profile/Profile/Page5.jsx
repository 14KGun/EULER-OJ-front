import { Redirect } from 'react-router-dom';

const Page5 = (props) => {
    return <Redirect to={ props.data.redirect }/>;
}

export default Page5;