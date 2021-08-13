import imgTrophy1 from '../Trophy/TrophyImg/img_trophy1.png';
import imgTrophy2 from '../Trophy/TrophyImg/img_trophy2.png';
import imgTrophy3 from '../Trophy/TrophyImg/img_trophy3.png';
import imgTrophy4 from '../Trophy/TrophyImg/img_trophy4.png';
import imgTrophy5 from '../Trophy/TrophyImg/img_trophy5.png';
import imgTrophy6 from '../Trophy/TrophyImg/img_trophy6.png';
import imgTrophy7 from '../Trophy/TrophyImg/img_trophy7.png';
import imgTrophy8 from '../Trophy/TrophyImg/img_trophy8.png';
import imgTrophy9 from '../Trophy/TrophyImg/img_trophy9.png';
import imgTrophy10 from '../Trophy/TrophyImg/img_trophy10.png';
import imgTrophy11 from '../Trophy/TrophyImg/img_trophy11.png';
import imgTrophy12 from '../Trophy/TrophyImg/img_trophy12.png';
import imgTrophy13 from '../Trophy/TrophyImg/img_trophy13.png';
import imgTrophy14 from '../Trophy/TrophyImg/img_trophy14.png';
import imgTrophy15 from '../Trophy/TrophyImg/img_trophy15.png';

const trophySet = [
    { id: 1, icon: imgTrophy1, name: '시작이 좋아', hint: '첫 문제를 해결' },
    { id: 2, icon: imgTrophy2, name: '50 SOLVES', hint: '50 문제를 해결' },
    { id: 3, icon: imgTrophy3, name: '100 SOLVES', hint: '100 문제를 해결' },
    { id: 4, icon: imgTrophy4, name: '200 SOLVES', hint: '200 문제를 해결' },
    { id: 5, icon: imgTrophy5, name: '500 SOLVES', hint: '500 문제를 해결' },
    { id: 6, icon: imgTrophy6, name: '열 번 찍어 안 넘어가는 나무 없다', hint: '한 문제를 10번 넘게 시도' },
    { id: 7, icon: imgTrophy7, name: '개척자', hint: '아무도 안 푼 문제를 해결' },
    { id: 10, icon: imgTrophy10, name: '크리스토퍼 콜럼버스', hint: '아무도 안 푼 20개의 문제를 해결' },
    { id: 11, icon: imgTrophy11, name: '닐 암스트롱', hint: '아무도 안 푼 50개의 문제를 해결' },
    { id: 8, icon: imgTrophy8, name: '코딩홀릭', hint: '일주일에 10문제 이상 해결(현재 획득할 수 없습니다)' },
    { id: 9, icon: imgTrophy9, name: '콜라', hint: '#2016 콜라 문제를 해결' },
    { id: 14, icon: imgTrophy14, name: '이지팬갈비', hint: '#2004 이지팬갈비 문제를 해결(광고)' },
    { id: 12, icon: imgTrophy12, name: 'STONE', hint: '코딩마법서 STONE 난이도의 모든 문제를 해결(현재 획득할 수 없습니다)' },
    { id: 15, icon: imgTrophy15, name: '우승', hint: '오일러가 주최하는 대회에서 우승' },
    { id: 13, icon: imgTrophy13, name: '이 달의 1등', hint: '이 달의 순위에서 1위 달성(현재 획득할 수 없습니다)' },
]
const getInfoById = (id) => {
    for(var i=0; i<trophySet.length; i++){
        if(trophySet[i].id === id) return trophySet[i]
    }
    return undefined;
}

const exp = { list: trophySet, getInfoById: getInfoById };
export default exp;