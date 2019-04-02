import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class LinkButton extends Component {
    render = () => {
        return (
            <>
                <Link
                    to={this.props.to}
                    className={`button ${this.props.className}`}>
                    { this.props.text }
                </Link>
            </>
        );
    };
}
