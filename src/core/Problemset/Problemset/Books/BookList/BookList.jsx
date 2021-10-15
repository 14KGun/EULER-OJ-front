import { Component } from 'react';
import Top from '../../../../Frame/Top/Top';
import SearchBox from '../../../../Search/SearchBox/SearchBox';
import Loading from '../../../../Frame/Loading/Loading';
import Footer from '../../../../Frame/Footer/Footer';

const TopBackground = (props) => {
    return (
        <div style={{ width: '100%', height: '100%' }} className="problemset-books-img-02-light">
        </div>
    )
}
const TopFixedLay = (props) => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div style={{ position: 'absolute', width: '250px', top: '12px', right: '0px' }}>
                <SearchBox/>
            </div>
        </div>
    )
}
const LoadingLay = (props) => {
    return (
        <div style={{ paddingTop: '100px', height: '300px' }}>
            <Loading/>
            <div style={{ textAlign: 'center', paddingTop: '100px', fontSize: '16px', color: (props.theme==='light'?'black':'white') }}>페이지 불러오는 중...</div>
        </div>
    )
}

class BookList extends Component {
    constructor(props){
        super(props);
        this.state = { category: undefined };
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.category !== nextProps.category){
            if(nextProps.category === 'c++_stone'){
                return { category: nextProps.category, title: '코딩마법서 1권 STONE VERSION C/C++' };
            }
            else if(nextProps.category === 'python_stone'){
                return { category: nextProps.category, title: '코딩마법서 1권 STONE VERSION 파이썬' };
            }
            else if(nextProps.category === 'c++_iron'){
                return { category: nextProps.category, title: '코딩마법서 2권 IRON VERSION C/C++' };
            }
            else{

            }
        }
        return prevState;
    }
    render() {
        return (
            <div>
                <Top icon={ undefined } title={ this.state.title }
                background={ <TopBackground theme={ this.props.theme } category={ this.props.category }/> }
                fixedLay={ <TopFixedLay/> }/>
                <LoadingLay theme={ this.props.theme }/>
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default BookList;