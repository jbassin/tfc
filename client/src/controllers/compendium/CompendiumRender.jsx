import React, {Component} from 'react';
import * as R from 'ramda'

export default class CompendiumRender extends Component {
    formatText = (text) => {
        const splitText = R.split('\n', text);
        return R.addIndex(R.map)(this.formatLine, splitText);
    };

    formatLine = (line, lineNum) => {
        const headerTest = R.match(/(?<numbers>^#+\s)(?<header>.+)/g, line);
        if (!R.isEmpty(headerTest)) {
            const [intensity, header] = R.split(/ (.*)/, R.head(headerTest));
            const headerMargin = {
                marginTop: lineNum === 0 ? '0' : '10px',
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

    // transformText = (line) => {
    //   const boldTest = line.match
    // };

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
