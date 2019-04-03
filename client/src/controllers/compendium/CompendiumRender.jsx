import React, {Component} from 'react';
import * as R from 'ramda'

export default class CompendiumRender extends Component {
    formatText = (text) => {
        const splitText = R.split('\n', text);
        return R.map(this.formatLine, splitText);
    };

    formatLine = (line) => {
        const headerTest = line.match(/(?<numbers>^#+\s)(?<header>.+)/g);
        if (headerTest) {
            const [intensity, header] = R.split(/ (.*)/, R.head(headerTest));
            const headerMargin = {
                marginTop: '10px',
            };

            return (
                <p
                    className={`title is-${R.min(R.length(intensity) + 1, 5)}`}
                    key={header}
                    style={headerMargin}
                    children={header}/>
            );
        }

        return (
            <p
                key={line}
                children={line}/>
        );
    };

    render = () => {
        return (
            <>
                <div
                    className="notification is-primary"
                    children={this.formatText(this.props.text)}/>
            </>
        );
    };
}
