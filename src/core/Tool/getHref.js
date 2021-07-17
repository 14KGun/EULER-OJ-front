import queryString from 'query-string';

const href = () => document.location.href;
const hrefParse = () => {
    const _href = href();
    const _url = _href.split('?')[0]; 
    const url = _url.charAt(_url.length-1) === '/' ? _url.substring(0, _url.length-1) : _url;
    const query = queryString.parse(_href.split('?')[1]);
    return { url, query }
}

const encode = (x) => encodeURIComponent(x);
const decode = (x) => decodeURIComponent(x);
const decodeOld = (x) => x.split(';and').join('&');
const loginUrl = (x) => `/login/?callback=${encode(x)}`;
const loginCurrentUrl = () => {
    const _href = href().split('http://').join('').split('https://').join('');
    const pos = _href.indexOf('/');
    if(pos === -1) return loginUrl('/');
    return loginUrl(_href.slice(pos,_href.length));
}

const exp = { href, hrefParse, encode, decode, decodeOld, loginUrl, loginCurrentUrl }
export default exp;