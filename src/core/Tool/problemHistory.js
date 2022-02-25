import cookie from './cookie';
import getHref from './getHref';

const isActive = () => {
    if(cookie.getCookie('problemHistory-active') !== 'false') return true;
    return false;
}
const setActive = (x) => {
    if(x) cookie.setCookie('problemHistory-active', 'true', 1000);
    else{
        cookie.setCookie('problemHistory-active', 'false', 1000);
        cookie.setCookie('problemHistory-list', getHref.encodeObject([]), 1000);
    }
}
const getAll = () => {
    const list = cookie.getCookie('problemHistory-list');
    if(list){
        return getHref.decodeObject(list);
    }
    return [];
}
const add = (id) => {
    if(!isActive()) return;

    id = String(id);
    const list = getAll();
    const index = list.indexOf(id);

    if (index != -1) list.splice(index, 1);
    list.push(id);

    if(list.length > 50) list.shift();
    cookie.setCookie('problemHistory-list', getHref.encodeObject(list), 1000);
}
const removeAll = () => {
    cookie.setCookie('problemHistory-list', getHref.encodeObject([]), 1000);
}

const exp = { add, removeAll, getAll, isActive, setActive };
export default exp;