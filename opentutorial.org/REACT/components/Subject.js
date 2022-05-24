import React from "react";


class Subject extends React.Component {


    render() {
        return (
            <div>
                <h1>
                    <a href="/" onClick={(e) => {
                        e.preventDefault();
                        this.props.onChangePage();
                    }}>{this.props.title}</a>
                </h1 >
                <h3>{this.props.sub}</h3>
            </div >
        )
    }
}

export default Subject;