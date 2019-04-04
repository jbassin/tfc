import React, {Component } from 'react';
import * as R from 'ramda';
import * as u from 'uniqid';
import { Link } from 'react-router-dom';

export default class CompendiumRender extends Component {
    constructor(props) {
        super(props);
        this.tableActive = 0;
        this.tableHead = null;
        this.tableBody = [];
    }

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

        if (R.trim(line) === '{{') {
            this.tableActive = true;
            this.tableHead = (<thead key={u()}/>);
            this.tableBody = ([]);
            return;
        }

        if (R.trim(line) === '}}') {
            this.tableActive = false;
            return (
                <table
                    className="table is-fullwidth is-primary"
                    key={u()}>
                    { this.tableHead }
                    <tbody
                        className="has-background-primary"
                        key={u()}
                        children={this.tableBody}/>
                </table>
            );
        }

        if (this.tableActive) {
            if (R.head(R.trim(line)) === '<' && R.last(R.trim(line)) === '>') {
                this.tableHead = (
                    <thead
                        className="has-background-primary has-text-white"
                        key={u()}>
                        <tr>
                            {R.map(item => <th className="has-text-white" key={u()}> {R.trim(item)} </th>, R.split('|', this.dropEnds(R.trim(line))))}
                        </tr>
                    </thead>
                );
            } else {
                this.tableBody = R.append((
                    <tr key={u()}>
                        {R.map(item => <td className="has-text-white" key={u()}> {this.fullTransform(R.trim(item))} </td>, R.split('|', line))}
                    </tr>
                ), this.tableBody);
            }
            return;
        }

        if (R.isEmpty(R.trim(line))) {
            return (
                <br key={u()}/>
            );
        }

        return (
            <p
                key={u()}
                children={this.fullTransform(line)}/>
        );
    };

    fullTransform = (line) => {
        return R.map((item) => {
            if (R.type(item) !== 'String') return item;
            return R.replace('\\`', '`', R.replace('\\_', '_', R.replace('\\*', '*', item)));
        }, this.transformText(line))
    };

    transformText = (line) => {
        let returnArray = [line];
        returnArray = R.flatten(R.map(this.transformMatchSimple('\\*', 'has-text-weight-bold'), returnArray));
        returnArray = R.flatten(R.map(this.transformMatchSimple('_', 'is-italic'), returnArray));
        returnArray = R.flatten(R.map(this.transformMatchSimple('`', 'is-family-monospace'), returnArray));
        returnArray = R.flatten(R.map(this.transformMatch(this.transformLink, new RegExp('(\\[{2}.+?\\]{2})', 'g')), returnArray));
        return returnArray;
    };

    transformMatch = R.curry((mapFunction, pattern, line) => {
        if (R.type(line) !== 'String') return line;
        const tester = R.match(pattern, line);
        if (!R.isEmpty(tester)) {
            const splitTester = R.split(pattern, line);
            return R.map(mapFunction, splitTester);
        }
        return [line];
    });

    transformTextSimple = R.curry((delimiter, className, item) => {
        if (this.borderedBy(R.replace('\\', '', delimiter), item)) {
            return (
                <span
                    key={u()}
                    className={className}
                    children={this.transformText(this.dropEnds(item))}/>
            );
        }
        return this.transformText(item);
    });

    transformLink = R.curry((item) => {
        if (R.startsWith('[', item) && R.endsWith(']', item)) {
            const matches = R.filter(item => !R.isEmpty(item), R.split(new RegExp('(\\[[^\\[]*?[^\\]]])', 'g'), this.dropEnds(item)));
            if (R.length(matches) === 1) {
                return (
                  <Link
                      key={u()}
                      to={`/compendium/entry/${R.replace(/\s/g, '_', R.toLower(this.dropEnds(R.head(matches))))}`}>
                      {`${this.dropEnds(R.head(matches))}`}
                  </Link>
                );
            } else {
                return (
                    <Link
                        key={u()}
                        to={`/compendium/entry/${R.replace(/\s/g, '_', R.toLower(this.dropEnds(R.head(matches))))}`}>
                        {`${this.dropEnds(R.last(matches))}`}
                    </Link>
                );
            }
        }
        return this.transformText(item);
    });

    transformMatchSimple = R.curry((delimiter, className, line) => {
        return this.transformMatch(this.transformTextSimple(delimiter, className), new RegExp(`(?<!\\\\)(${delimiter}.+?${delimiter})`, 'g'), line)
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
