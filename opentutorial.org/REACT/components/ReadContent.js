import React from "react";



class ReadContent extends React.Component {

    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <p>{this.props.desc}</p>

            </div>
        )
    }
}


export default ReadContent;