import { Component } from 'react';
import cookie from './core/Tool/cookie';

class Socket extends Component {
    constructor(props) {
        super(props);

        const array = [];
        if(cookie.getCookie('cookie') !== 'true') array.push({ type: 'cookie' });
        array.push({ type: 'scoring', progress: 0.7 })
        array.push({ type: 'scoring', progress: 1 });
        array.push({ type: 'scoring', progress: 1 });
        array.push({ type: 'scoring', progress: 1 });
        props.setAlarmList(array.reverse());
        if(array.length > 0) props.setAlarmVisible(true);
    }
    render() {
        return null;
    }
}

export default Socket;