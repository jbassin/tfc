import React, {Component} from 'react';
import LinkButton from "../../components/button/LinkButton";
import Container from "../../components/background/Container";

export default class NoPage extends Component {
    render = () => {
        return (
            <>
                <Container className="is-primary">
                    <h2 className="title is-2">
                        404 not found...
                    </h2>
                    <p>
                        You seem to be lost. Have you tried not doing what you just did? I feel like that would solve a lot of problems. To go back to the home page, press the button below.
                    </p>
                    <br/>
                    <nav className="level">
                        <div className="level-left"/>
                        <div className="level-right">
                            <div className="level-item">
                                <LinkButton
                                    to="/"
                                    text="HOME"
                                    className="is-link"/>
                            </div>
                        </div>
                    </nav>
                </Container>
            </>
        );
    };
}
