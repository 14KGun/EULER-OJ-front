import React from 'react';
import ReactDOM from 'react-dom';

const TooltipRender = (props) => {
    return (
        <>
            { props.tooltips }
        </>
    )
}
const Tootip = (props) => {
    const style = {
        position: 'absolute', opacity: 0.9,
        visibility: 'visible', display: 'block'
    }
    const styleMain = {
        paddingTop: '5px', paddingBottom: '5px',
        paddingLeft: '10px', paddingRight: '10px',
        fontSize: '15px', fontWeight: '300', color: 'white',
        background: 'rgb(0,150,200)', borderRadius: '12px'
    }
    const styleBtm = {
        width: '0px', height: '0px',
        position: 'absolute', left: '50%', marginLeft: '-3px',
        borderTop: '6px solid rgb(0,150,200)', borderBottom: '6px solid rgba(0,150,200,0)',
        borderRight: '6px solid transparent', borderLeft: '6px solid transparent'
    }

    return (
        <div id={ props.elementId } style={ style }>
            <div style={ styleMain } className="TOOLTIP-MAIN"
            dangerouslySetInnerHTML={{  __html: props.txt }}/>
            <div style={ styleBtm } className="TOOLTIP-BTM"/>
        </div>
    )

}
class TooltipCons{
    constructor(){
        this.tooltips = [];
        this.render();
    }
    isExist(elementId){
        var res = false;
        this.tooltips.map(item => {
            if(item.key === elementId) res = true;
        });
        return res;
    }
    newTooltip(txt){
        var id = 1;
        while(this.isExist(`TooltipItem-${ id }`)) id++;
        const elementId = `TooltipItem-${ id }`;

        return <Tootip key={ elementId } elementId={ elementId } txt={ txt }/>
    }
    create(item, position, txt, color = "rgb(0,150,200)"){
        const posX = window.pageXOffset + item.getBoundingClientRect().left;
        const posY = window.pageYOffset + item.getBoundingClientRect().top;
        const sizeX = item.clientWidth; //, sizeY = item.clientHeight;
        const elementOfReact = this.newTooltip(txt);

        this.tooltips.push(elementOfReact);
        this.render(() => {
            const element = document.getElementById(elementOfReact.key);
            const elementX = element.clientWidth, elementY = element.clientHeight;
            const elementMain = element.getElementsByClassName('TOOLTIP-MAIN')[0];
            const elementBtm = element.getElementsByClassName('TOOLTIP-BTM')[0];
            elementMain.style.background = color;
            elementBtm.style.borderTopColor = color;
            if(position === 'top'){
                element.style.left = `${ posX + sizeX/2 - elementX/2 }px`;
                element.style.top = `${ posY - elementY - 8 }px`;
            }
        });
        return elementOfReact.key;
    }
    remove(elementId){
        const element = document.getElementById(elementId);
        if(element) element.style.visibility = 'hidden';
    }
    clear(){
        this.tooltips = [];
        this.render();
    }
    render(callback = ()=>{}){
        ReactDOM.render(<TooltipRender tooltips={ this.tooltips }/>, document.getElementById('tooltip-container'), callback);
    }
}

export default TooltipCons;