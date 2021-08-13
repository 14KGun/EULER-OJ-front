const smoothScroll = () => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: document.body.offsetTop
    });
}

export default smoothScroll;