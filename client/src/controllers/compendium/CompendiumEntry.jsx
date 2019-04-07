import React, {Component} from 'react';
import CompendiumRender from "./CompendiumRender";
import Container from "../../components/background/Container";

export default class CompendiumEntry extends Component {
    render = () => {
        return (
            <>
                <Container>
                    <CompendiumRender text={this.props.match.params.entry}/>
                </Container>
            </>
        );
    };
}
