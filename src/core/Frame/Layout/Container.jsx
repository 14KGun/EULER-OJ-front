const Container = (props) => {
    const style = {
        background: 'rgb(130,130,130,0.1)', borderRadius: '15px'
    }

    return (
        <div style={ style }>
            { props.children }
        </div>
    )
}

export default Container;