import { useSpring, animated } from 'react-spring';

const TaskTableItem = (props) => {
    const style = {
        height: '60px', position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid rgba(100,100,100,0.3)'
    }
    const styleItem = {
        position: 'absolute', top: '0px',
        height: '60px', lineHeight: '60px', fontSize: '16px', fontWeight: 300,
        color: (props.theme==='light' ? 'black' : 'white')
    }
    const styleIndex = {
        left: '30px', color: 'gray'
    }
    const styleResult = {
        left: '100px', fontWeight: 500
    }
    const styleTime = {
        right: '150px', width: '100px', textAlign: 'center'
    }
    const styleMemory = {
        right: '30px', width: '100px', textAlign: 'center'
    }

    return (
        <animated.div style={ style }>
            <div style={{ ...styleItem, ...styleIndex }}>{ props.index }</div>
            <div style={{ ...styleItem, ...styleResult }}>{ props.result }</div>
            <div style={{ ...styleItem, ...styleTime }}>{ props.time }</div>
            <div style={{ ...styleItem, ...styleMemory }}>{ props.memory }</div>
        </animated.div>
    )
}
const TaskTable = (props) => {
    const styleTop = {
        height: '60px', borderTop: '2px solid rgb(0,150,200)',
        borderBottom: '2px solid rgb(0, 150, 200)', position: 'relative'
    }
    const styleItem = {
        position: 'absolute', top: '0px',
        height: '60px', lineHeight: '60px', fontSize: '17px', fontWeight: 700,
        color: 'rgb(0, 150, 200)'
    }
    const styleResult = {
        left: '100px'
    }
    const styleTime = {
        right: '150px', width: '100px', textAlign: 'center'
    }
    const styleMemory = {
        right: '30px', width: '100px', textAlign: 'center'
    }

    const list = [];
    for(let i=0; i<props.task.res.length; i++){
        list.push(<TaskTableItem key={ i } index={ i+1 } theme={ props.theme }
        result={ props.task.res[i] } time={ props.task.time[i] } memory={ props.task.memory[i] }/>)
    }

    return (
        <>
            <div style={ styleTop }>
                <div style={{ ...styleItem, ...styleResult }}>결과</div>
                <div style={{ ...styleItem, ...styleTime }}>실행 시간</div>
                <div style={{ ...styleItem, ...styleMemory }}>메모리 사용량</div>
            </div>
            { list }
        </>
    )
}

export default TaskTable;