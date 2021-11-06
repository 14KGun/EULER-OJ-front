import { useSpring, animated } from 'react-spring';

const TaskTableItem = (props) => {
    const style = {
        height: '60px', position: 'relative',
        borderBottom: '1px solid rgba(100,100,100,0.3)'
    }

    return (
        <animated.div style={ style }>
        </animated.div>
    )
}
const TaskTable = (props) => {
    const styleTop = {
        height: '60px', borderTop: '2px solid rgb(0,150,200)',
        borderBottom: '2px solid rgb(0, 150, 200)', position: 'relative'
    }
    return (
        <>
            <div style={ styleTop }>

            </div>
            <TaskTableItem/>
            <TaskTableItem/>
            <TaskTableItem/>
        </>
    )
}

export default TaskTable;