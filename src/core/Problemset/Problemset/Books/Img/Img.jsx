import imgBook01 from './img_book1.jpeg'
import imgBook02 from './img_book2.jpeg'
import './img.css'

const ImgSkeleton = (props) => {
    const style = {
        width: '100%', height: '100%', overflow: 'hidden', position: 'relative'
    }
    const styleImg = {
        position: 'absolute', top: '10%', left: '50%',
        height: '80%', transform: 'translate(-50%, 0)'
    }
    return (
        <div style={ style } className={ `problemset-books-img-${ props.Num }-${ props.theme }` }>
            <img src={ props.img } style={ styleImg }/>
        </div>
    )
}
const Img01 = (props) => {
    return <ImgSkeleton img={ imgBook01 } Num="01" theme={ props.theme }/>
}
const Img02 = (props) => {
    return <ImgSkeleton img={ imgBook02 } Num="02" theme={ props.theme }/>
}
const Img03 = (props) => {
    return <ImgSkeleton img={ imgBook02 } Num="03" theme={ props.theme }/>
}

export default { Img01, Img02, Img03 }