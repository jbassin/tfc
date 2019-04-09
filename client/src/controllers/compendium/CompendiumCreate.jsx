import React, {Component} from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import CompendiumRender from "./CompendiumRender";

export default class CompendiumCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text ? this.props.text : '',
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.text !== this.props.text) {
            this.setState({
                text: this.props.text ? this.props.text : '',
            })
        }
    };

    textAreaChange = (e) => {
        this.setState({
           text: e.target.value,
        });
    };

    render = () => {
        return (
            <>
                <div className="columns">
                    <div className="column is-half">
                        <TextareaAutosize
                            onInput={this.textAreaChange}
                            className="textarea"
                            value={this.state.text}
                            rows={28}/>
                    </div>
                    <div className="column is-half">
                        <CompendiumRender
                            text={this.state.text}/>
                    </div>
                </div>
            </>
        );
    };
}
