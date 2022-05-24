import React from "react";


class UpdateContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            desc: this.props.desc
        }
    }

    render() {

        return (
            <div>
                <h4>update</h4>
                <form
                    action="update_process"
                    method="post"
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.props.onSubmit(
                            this.state.id,
                            this.state.title,
                            this.state.desc,
                        );
                    }}>
                    <p>
                        <input
                            type="hidden"
                            name="id"
                            placeholder="enter your title here" />
                    </p>
                    <p>
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={(e) => {
                                console.log(e.target.value);
                                this.setState({
                                    title: e.target.value
                                })
                            }} />
                    </p>
                    <p>
                        <textarea
                            name="desc"
                            value={this.state.desc}
                            onChange={(e) => {
                                console.log(e.target.value);
                                this.setState({
                                    desc: e.target.value
                                })
                            }}>

                        </textarea>
                    </p>
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export default UpdateContent;