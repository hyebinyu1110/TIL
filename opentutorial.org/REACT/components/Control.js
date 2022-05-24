import React from "react";



class Control extends React.Component {

    render() {

        return (
            <div>
                <li>
                    <a href="/create" onClick={(e) => {
                        e.preventDefault();
                        this.props.onChangePage("create");
                    }}>Create</a>
                </li>
                <li>
                    <a href="/update" onClick={(e) => {
                        e.preventDefault();
                        this.props.onChangePage("update");
                    }}>update</a>
                </li>
                <li>
                    <a href="/delete" onClick={(e) => {
                        e.preventDefault();
                        this.props.onChangePage("delete");
                    }}>delete</a>
                </li>

            </div >
        )
    }
}

export default Control;