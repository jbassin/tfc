import React, {Component} from 'react';
import * as R from "ramda";
import Container from "../../components/background/Container";
import LinkButton from "../../components/button/LinkButton";

export default class CompendiumHeader extends Component {
    render = () => {
        return (
            <>
                <Container>
                    <nav className="level">
                        <div className="level-left">
                            <p>
                                    <span className="title is-4">
                                        { R.concat(R.toUpper(R.head(this.props.title)), R.toLower(R.tail(this.props.title))) }
                                    </span>    <span className="subtitle is-5">
                                        by { this.props.author }
                                    </span>
                            </p>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <LinkButton
                                    to={`/compendium/edit/${R.replace(/\s/g, '_', R.toLower(this.props.title))}`}
                                    className="is-primary"
                                    text="Edit"/>
                            </div>
                        </div>
                    </nav>
                </Container>
            </>
        );
    };
}
