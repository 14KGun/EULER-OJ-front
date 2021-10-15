import svgManual0 from './svg_manual_square.svg';
import svgManual1 from './svg_manual_txt1.svg';
import svgManual2 from './svg_manual_txt2.svg';
import svgManual3 from './svg_manual_txt3.svg';

const T1 = () => {
    return (
        <>
            <img style={{ position: 'absolute', height: '14px', left: '28px', bottom: '20px' }} src={ svgManual0 } alt=""/>
            <img style={{ position: 'absolute', height: '13px', left: '48px', bottom: '20px' }} src={ svgManual1 } alt=""/>
        </>
    )
}
const T2 = () => {
    return (
        <>
            <img style={{ position: 'absolute', height: '13px', left: '43px', bottom: '40px' }} src={ svgManual2 } alt=""/>
            <img style={{ position: 'absolute', height: '13px', left: '43px', bottom: '20px' }} src={ svgManual3 } alt=""/>
        </>
    )
}
const T3 = () => {
    return (
        <>
            <img style={{ position: 'absolute', height: '13px', left: '43px', bottom: '60px' }} src={ svgManual2 } alt=""/>
            <img style={{ position: 'absolute', height: '13px', left: '43px', bottom: '20px' }} src={ svgManual3 } alt=""/>
        </>
    )
}

export default { T1, T2, T3 }