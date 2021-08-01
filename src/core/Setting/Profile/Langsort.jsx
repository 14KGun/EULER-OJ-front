import { Component, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Layout from './Layout';
import svgSort from './svg_sort.svg';
import svgDrag from './svg_drag.svg';
import svgVisibility from './svg_visibility.svg';
import svgVisibilityOff from './svg_visibilityoff.svg';
import svgVisibilityDark from './svg_visibility-dark.svg';
import svgVisibilityOffDark from './svg_visibilityoff-dark.svg';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const BtnVisibility = (props) => {
    const [isHover, setHover] = useState(false);
    const bgdColorNum = props.theme==='light' ? 230 : 50;
    const borderColorNum = props.theme==='light' ? 200 : 80;
    const style = {
        width: '20px', height: '20px', borderRadius: '5px',
        background: `rgba(${ bgdColorNum },${ bgdColorNum },${ bgdColorNum },${ isHover ? 1 : 0 })`,
        border: `1px solid rgba(${ borderColorNum },${ borderColorNum },${ borderColorNum },${ isHover ? 1 : 0 })`
    }
    const styleImg = { width: '18px', height: '18px', margin: '1px' }

    let img = <img src={ svgVisibility } style={ styleImg }/>
    if(!props.isHidden && props.theme==='light') img = <img src={ svgVisibility } style={ styleImg }/>;
    else if(props.isHidden && props.theme==='light') img = <img src={ svgVisibilityOff } style={ styleImg }/>;
    else if(!props.isHidden) img = <img src={ svgVisibilityDark } style={ styleImg }/>;
    else img = <img src={ svgVisibilityOffDark } style={ styleImg }/>;

    const onClick = () => {
        props.handler(!props.isHidden);
    }

    return (
        <div style={ style } onClick={ () => onClick() }
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            { img }
        </div>
    )
}
const DragItem = (props) => {
    const style = {
        width: '100%', height: '100%', postion: 'relative'
    }
    const styleImg = {
        position: 'absolute', width: '22px', height: '22px',
        top: '7px', left: '10px'
    }
    const styleTxt = {
        position: 'absolute', height: '36px', lineHeight: '36px',
        top: '0px', left: '50px', fontSize: '16px', fontWeight: 300,
        color: props.theme==='light' ? 'black' : 'white'
    }
    const styleBtn = {
        position: 'absolute', top: '8px', right: '12px'
    }
    return (
        <div style={ style }>
            <img src={ svgDrag } alt="" style={ styleImg }/>
            <div style={ styleTxt }>{ props.children }</div>
            <div style={ styleBtn }>
                <BtnVisibility isHidden={ props.hidden } handler={ props.handler } theme={ props.theme }/>
            </div>
        </div>
    )
}

class Langsort extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
    }
    getItemStyle(isDragging, draggableStyle, theme){
        return {
            height: '36px', position: 'relative', borderRadius: '10px', marginBottom: '6px',
            background: theme==='light' ? 'rgb(250,251,252)' : 'rgb(30,31,32)',
            border: `1px solid ${ theme==='light' ? 'rgb(200,200,200)' : 'rgb(70,70,70)' }`,
            boxShadow: `0px 0px 10px 10px rgba(0,0,0,${ isDragging ? 0.08 : 0 })`,
            userSelect: 'none', ...draggableStyle
        }
    }
    onDragEnd(result) {
        if (!result.destination) return;
        const items = reorder(this.state.items, result.source.index, result.destination.index);
        this.setState({ items: items });
    }
    setHidden(index, hidden){
        const items = this.state.items.slice();
        items[index].hidden = hidden;
        this.setState({ items: items })
    }
    render(){
        const styleTable = {
            padding: '20px', borderRadius: '15px',
            background: (this.props.theme==='light' ? 'rgb(230,230,230)' : 'rgb(50,50,50)')
        }

        if(this.state.items.length <= 0){
            const hiddenCheck = {};
            this.props.data.langSort.forEach(element => {
                hiddenCheck[element.id] = true;
                this.state.items.push({ id: element.id, name: element.name, hidden: false })
            });
            this.props.data.langList.forEach(element => {
                if(!hiddenCheck[element.id]) this.state.items.push({ id: element.id, name: element.name, hidden: true })
            });
        }

        return (
            <div className="ND">
                <Layout.Title icon={ svgSort } theme={ this.props.theme }>언어 정렬</Layout.Title>
                <Layout.Content theme={ this.props.theme }>각 언어를 드래그 하면 순서를 바꿀 수 있습니다. 변경 된 순서는 채점과 에디터 페이지에서 사용할 언어의 우선순위에 반영됩니다.</Layout.Content>
                <Layout.Content theme={ this.props.theme }>사용하지 않는 언어는 눈 모양 버튼을 눌러 비활성화 할 수 있습니다.</Layout.Content>
                <div style={{ height: '20px' }}/>

                <DragDropContext onDragEnd={ (x) => this.onDragEnd(x) }>
                    <Droppable droppableId="langsort">
                        { (provided, snapshot) => (
                            <div ref={ provided.innerRef } { ...provided.droppableProps }
                            style={ styleTable }>
                                { this.state.items.map((item, index) => (
                                    <Draggable key={ item.id } draggableId={ item.id } index={ index }>
                                        { (provided, snapshot) => (
                                            <div ref={ provided.innerRef } { ...provided.draggableProps } { ...provided.dragHandleProps }
                                            style={ this.getItemStyle(snapshot.isDragging, provided.draggableProps.style, this.props.theme) }>
                                                <DragItem hidden={ item.hidden } theme={ this.props.theme }
                                                handler={ (x) => this.setHidden(index, x) }>{ item.name }</DragItem>
                                            </div>
                                        ) }
                                    </Draggable>
                                )) }
                                { provided.placeholder }
                            </div>
                        ) }
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}

export default Langsort