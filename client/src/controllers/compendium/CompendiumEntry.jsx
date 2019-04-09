import React, {Component} from 'react';
import CompendiumRender from "./CompendiumRender";
import Container from "../../components/background/Container";
import exports from '../../helpers/axios';
import CompendiumHeader from "./CompendiumHeader";
import LinkButton from "../../components/button/LinkButton";

export default class CompendiumEntry extends Component {
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
                <CompendiumHeader
                    title={this.props.match.params.entry}
                    author={this.state.success ? this.state.entry.author : 'you'}/>
                <Container>
                    { this.state.success === true ? (
                        <CompendiumRender text={this.state.entry.text}/>
                    ) : (
                        <>
                            <h2 className="title is-2">
                                404 not found...
                            </h2>
                            <p>
                                The entry you are looking for can't be found. If you'd like to make this page, press the edit button. Otherwise you can go back to the home page using the button below.
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
                        </>
                    )}
                </Container>
            </>
        );
    };
}
