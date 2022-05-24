import React from "react";



class TOC extends React.Component {


    render() {
        const contents = this.props.contents;
        const content_list = contents.map((content) => (
            <li key={content.id}>
                <a
                    href={`/contents/${content.id}`}
                    data-id={content.id}
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.onChangePage(e.target.dataset.id);
                    }}>{content.title}</a></li>
        ))
        return (
            <div>
                <ul>
                    {content_list}
                </ul>
            </div>
        )
    }
}

export default TOC;