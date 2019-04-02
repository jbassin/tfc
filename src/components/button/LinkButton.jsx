import React, {Component} from 'react';

export default class LinkButton extends Component {
    onClickHandler = (e) => {
        e.preventDefault();
        alert('AHHHH');
    };

    render = () => {
        return (
            <>
                <button
                    className={`button ${this.props.classes}`}
                    onClick={this.onClickHandler}>
                    <span>
                        { this.props.text }
                    </span>
                </button>
            </>
        );
    };
}
