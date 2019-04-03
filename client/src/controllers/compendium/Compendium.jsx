import React, {Component} from 'react';
import Container from "../../components/background/Container";
import CompendiumCreate from "./CompendiumCreate";

export default class Compendium extends Component {
    render = () => {
        return (
            <>
                <Container>
                    <CompendiumCreate/>
                </Container>
            </>
        );
    };
}
