import React, {Component} from 'react';

export default class ToggleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
        }
    }

    clickHandler = (e) => {
        e.preventDefault();
        this.setState(state => {
            this.props.onToggle(!state.isActive);
            return { isActive: !state.isActive }
        });
    };

    render = () => {
        return (
            <button
                className={this.props.classes + " button"}
                onClick={this.clickHandler}>
                <span className="icon">
                    <i className={this.state.isActive ? this.props.activeIcon : this.props.inactiveIcon}/>
                </span>
            </button>
        );
    };
}
