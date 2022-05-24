import React from "react";


class CreateContent extends React.Component {
    render() {
        return (
            <div>
                <h4>Create</h4>
                <form action="/create_process" method="post" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmit(
                        e.target.title.value,
                        e.target.desc.value,
                    );
                }}>
                    <input type="text" name="title" placeholder="enter your title here" />
                    <p>
                        <textarea name="desc" placeholder="enter your content here" ></textarea>
                    </p>
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}


export default CreateContent;