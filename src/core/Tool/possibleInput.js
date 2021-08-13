const feeling = (x) => {
    if(x.length > 30) { return false; }
    else return true;
}
const name = (x) => {
    if(x == '') return false;
    else if(x.length > 10) return false;
    else return true;
}
const school = (x) => {
    if(x == '') return false;
    else if(x.length > 10) return false;
    return true;
}
const password = (x) => {
    if(x.length == 0) { return false }
    else if(x.length<6 || x.length>20) { return false }
    else return true;
}
const source = (x) => {
    if(x.length > 100000){ return false; }
    return true;
}

const possibleInput = { feeling, name, school, password, source }
export default possibleInput;