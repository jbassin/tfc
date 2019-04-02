import React, {Component} from 'react';
import LinkButton from "../../components/button/LinkButton";
import Container from "../../components/background/Container";

export default class Links extends Component {
    render = () => {
        return (
            <>
                <Container className="is-primary">
                    <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <LinkButton
                                    to="/compendium"
                                    className="is-primary"
                                    text="Compendium"/>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <LinkButton
                                    to="/user"
                                    className="is-primary"
                                    text="Login"/>
                            </div>
                        </div>
                    </nav>
                </Container>
            </>
        );
    };
}
