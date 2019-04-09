import React, {Component} from 'react';
import Container from "../../components/background/Container";
import exports from "../../helpers/axios";
import CompendiumCreate from "./CompendiumCreate";

export default class CompendiumEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entry: {
                author: '',
                text: '',
            },
            success: true,
        };
    }

    componentDidMount = () => {
        this.getEntry().then(
            state => {
                this.setState(state);
            }
        );
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.match.params.entry !== this.props.match.params.entry) {
            this.getEntry().then(
                state => {
                    this.setState(state);
                }
            );
        }
    };

    getEntry = async () => {
        return await exports.post('/api/compendium/get', {
            title: this.props.match.params.entry,
        });
    };

    render = () => {
        return (
            <>
                <Container>
                    { this.state.success ? (
                        <>
                            <CompendiumCreate text={this.state.entry.text}/>
                        </>
                    ) : (
                        <>
                            <CompendiumCreate/>
                        </>
                    )}
                </Container>
            </>
        );
    };
}
