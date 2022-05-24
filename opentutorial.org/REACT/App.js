// 수업을 시작하기 위해선 nodejs, npm, npx, git 이 설치 되어 있어야 함

import React from "react";
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import Control from "./components/Control";
import UpdateContent from "./components/UpdateContent";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.max_content_id = 3;
        this.state = {

            mode: "welcome",
            subject: { title: "WEB", sub: "World Wide Web!" },
            selected_content_id: 1,
            welcome: { title: "welcome", desc: "Hello, React!" },
            contents: [
                { id: 1, title: "HTML", desc: "HTML is..." },
                { id: 2, title: "CSS", desc: "CSS is..." },
                { id: 3, title: "JavsScript", desc: "JavaScript is..." },
            ]
        }
        this.getReadContent = this.getReadContent.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    getReadContent() {
        const state = this.state;

        for (let i = 0; i < state.contents.length; i++) {
            let data = state.contents[i];
            if (state.selected_content_id === data.id) {
                return data;
            }
        }

    }


    getContent() {
        const state = this.state;
        let _title, _desc, _article;

        if (state.mode === "welcome") {
            _title = state.welcome.title;
            _desc = state.welcome.desc;
            _article = (<ReadContent
                title={_title}
                desc={_desc} />)
        } else if (state.mode === "read") {
            let data = this.getReadContent();
            _article = (<ReadContent
                title={data.title}
                desc={data.desc} />)
        } else if (state.mode === "create") {
            _article = (
                <CreateContent onSubmit={(_title, _desc) => {
                    this.max_content_id += 1;
                    let _contents = Array.from(state.contents);
                    _contents.push({
                        id: this.max_content_id,
                        title: _title,
                        desc: _desc
                    });

                    this.setState({
                        contents: _contents,
                        mode: "read",
                        selected_content_id: this.max_content_id
                    });
                }
                } />
            )

        } else if (state.mode === "update") {
            const state = this.state;
            let id = state.selected_content_id;
            _article = (
                <UpdateContent
                    id={state.contents[id - 1].id}
                    title={state.contents[id - 1].title}
                    desc={state.contents[id - 1].desc}
                    onSubmit={(_id, _title, _desc) => {
                        let _contents = Array.from(state.contents);
                        for (let i = 0; i < _contents.length; i++) {
                            if (_contents[i].id === _id) {
                                _contents[i] = {
                                    id: _id,
                                    title: _title,
                                    desc: _desc
                                }
                                break;
                            }
                        }
                        this.setState({
                            contents: _contents,
                            mode: "read",
                        })

                    }}
                />
            )

        } else if (state.mode === "delete") {
            if (window.confirm("Are you sure that you want to delete this data?")) {

            }


        }

        return _article;

    }

    render() {
        const state = this.state;


        return (
            <div>
                <Subject
                    title={state.subject.title}
                    sub={state.subject.sub}
                    onChangePage={() => {
                        this.setState({ mode: "welcome" })
                    }} />
                <TOC
                    contents={this.state.contents}
                    onChangePage={(id) => {
                        this.setState({
                            mode: "read",
                            selected_content_id: Number(id)
                        })
                    }} />

                <ul>
                    <Control
                        onChangePage={(mode) => {
                            if (mode === "delete") {
                                if (window.confirm("are you really sure that you like to delete this data?")) {
                                    let _contents = Array.from(state.contents);
                                    _contents.splice(_contents[state.selected_content_id - 1], 1);
                                    this.setState({
                                        contents: _contents,
                                        mode: "welcome",

                                    })
                                } else {
                                    return;
                                }
                            } else {
                                this.setState({
                                    mode: mode,
                                })
                            }
                        }} />
                </ul>

                <div>{this.getContent()}</div>











            </div >
        )
    }
}

export default App;