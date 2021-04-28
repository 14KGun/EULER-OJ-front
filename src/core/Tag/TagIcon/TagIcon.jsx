import React, { Component } from 'react';
import svgFolder from './svg_folder.svg';
import svgTagLight from './svg_tagLight.svg';
import svgTagDark from './svg_tagDark.svg';
import imgYoutubeLight from './img_youtubeLight.png';
import imgYoutubeDark from './img_youtubeDark.png';
import imgBlogLight from './img_blogLight.png';
import imgBlogDark from './img_blogDark.png';
import imgNosolveLight from './img_nosolveLight.png';
import imgNosolveDark from './img_nosolveDark.png';

const Folder = () => {
    return <img src={ svgFolder } style={{ width: '90%', height: '90%', overFit: 'contain', padding: '5%' }}/>
}
const TagLight = () => {
    return <img src={ svgTagLight } style={{ width: '100%', height: '100%', overFit: 'contain' }}/>
}
const TagDark = () => {
    return <img src={ svgTagDark } style={{ width: '100%', height: '100%', overFit: 'contain' }}/>
}
const YoutubeLight = () => {
    return <img src={ imgYoutubeLight } style={{ width: '90%', height: '90%', overFit: 'contain', padding: '5%' }}/>
}
const YoutubeDark = () => {
    return <img src={ imgYoutubeDark } style={{ width: '90%', height: '90%', overFit: 'contain', padding: '5%' }}/>
}
const BlogLight = () => {
    return <img src={ imgBlogLight } style={{ width: '90%', height: '90%', overFit: 'contain', padding: '5%' }}/>
}
const BlogDark = () => {
    return <img src={ imgBlogDark } style={{ width: '90%', height: '90%', overFit: 'contain', padding: '5%' }}/>
}
const NosolveLight = () => {
    return <img src={ imgNosolveLight } style={{ width: '90%', height: '90%', overFit: 'contain', padding: '5%' }}/>
}
const NosolveDark = () => {
    return <img src={ imgNosolveDark } style={{ width: '90%', height: '90%', overFit: 'contain', padding: '5%' }}/>
}

class TagIcon extends Component {
    constructor(props) {
        super(props);
        this.scale = this.props.scale;

        if(this.props.type === 'folder') this.icon = <Folder/>;
        else if(this.props.type === 'tag' && this.props.theme=="light") this.icon = <TagLight/>;
        else if(this.props.type === 'tag') this.icon = <TagDark/>;
        else if(this.props.type === 'youtube') this.icon = <YoutubeLight/>;
        else if(this.props.type === 'blog') this.icon = <BlogLight/>;
        else if(this.props.type === 'nosolve') this.icon = <NosolveLight/>;
        else this.icon = <TagDark/>;
    }
    render() {
        return (
            <span style={{ display: 'inline-block', width: this.scale, height: this.scale, overflow: 'hidden' }}>
                { this.icon }
            </span>
        );
    }
}

export default TagIcon;