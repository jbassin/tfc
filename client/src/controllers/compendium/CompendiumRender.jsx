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
                key={R.isEmpty(line) ? `${lineNum}` : line}
                children={this.transformText(line)}/>
        );
    };

    transformText = (line) => {
        let returnArray = [line];
        returnArray = R.flatten(R.map(this.transformMatch('\\*', 'has-text-weight-bold'), returnArray));
        returnArray = R.flatten(R.map(this.transformMatch('_', 'is-italic'), returnArray));
        returnArray = R.flatten(R.map(this.transformMatch('`', 'is-family-monospace'), returnArray));
        return R.flatten(returnArray);
    };

    transformMatch = R.curry((delimiter, className, line) => {
        if (R.type(line) !== 'String') return line;
        const tester = R.match(new RegExp(`(${delimiter}.+?${delimiter})`, 'g'), line);
        if (!R.isEmpty(tester)) {
            const splitTester = R.split(new RegExp(`(${delimiter}.+?${delimiter})`, 'g'), line);
            return R.map((item) => {
                if (this.borderedBy(R.replace('\\', '', delimiter), item)) {
                    return (
                        <span
                            key={item}
                            className={className}
                            children={this.transformText(this.dropEnds(item))}/>
                    );
                }
                return this.transformText(item);
            }, splitTester);
        }
        return [line];
    });

    borderedBy = (delimiter, item) => {
        return R.startsWith(delimiter, item) && R.endsWith(delimiter, item);
    };

    dropEnds = (item) => {
        return R.dropLast(1, R.drop(1, item));
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
