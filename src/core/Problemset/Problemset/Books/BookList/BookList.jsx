import { Component } from 'react';
import Top from '../../../../Frame/Top/Top';
import SearchBox from '../../../../Search/SearchBox/SearchBox';
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

class BookList extends Component {
    render() {
        return (
            <div>
                <Top icon={ undefined }
                title={ '코딩 마법서' }
                background={ <TopBackground/> } fixedLay={ <TopFixedLay/> }/>
                <div className="BTM_EMPTY"/>
                <Footer theme={ this.props.theme }/>
            </div>
        );
    }
}

export default BookList;