const Container = (props) => {
    const style = {
        background: 'rgb(140,140,140,0.15)', borderRadius: '15px'
    }

    return (
        <div style={ style }>
            { props.children }
        </div>
    )
}

export default Container;