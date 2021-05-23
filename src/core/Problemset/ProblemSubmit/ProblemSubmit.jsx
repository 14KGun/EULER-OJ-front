import React, { Component } from 'react';

const Top = () => {
    return (
        <div>
            <div>소스 코드 제출</div>
        </div>
    )
}

class ProblemSubmit extends Component {
    render() {
        return (
            <div className="FRAME_MAIN">
                <Top/>
            </div>
        );
    }
}

export default ProblemSubmit;