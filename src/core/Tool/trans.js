const timeParsePositive = (t) => {
    t = t/1000;
    if(t<60) return `${ parseInt(t) }초`
    if(t<60*60) return `${ parseInt(t/60) }분`
    if(t<60*60*24) return `${ parseInt(t/60/60) }시간`
    if(t<60*60*24*30) return `${ parseInt(t/60/60/24) }일`
    if(t<60*60*24*365) return `${ parseInt(t/60/60/24/30) }개월`
    return `${ parseInt(t/60/60/24/365) }년`
}
const date = (t) => {
    return `${ t.getFullYear() }년 ${ t.getMonth()+1 }월 ${ t.getDate() }일 ${ t.getHours() }시 ${ t.getMinutes() }분`;
}

export default { timeParsePositive, date }