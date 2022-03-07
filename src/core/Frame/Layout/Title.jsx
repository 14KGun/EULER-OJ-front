const Title = (props) => {
    const style = {
        fontSize: '27px', fontWeight: 700, marginLeft: '45px',
        color: (props.theme==='light' ? 'black' : 'white'),
        lineHeight: '40px'
    }
    const styleImg = {
        position: 'absolute', top: '2px', left: '0px',
        width: '36px'
    }
    
    return (
        <div style={{ position: 'relative', paddingBottom: '15px' }}>
            <img src={ props.icon } style={ styleImg } alt=""/>
            <div style={ style }>{ props.children }</div>
        </div>
    )
}

export default Title