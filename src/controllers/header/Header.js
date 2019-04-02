import React, { Component } from 'react';
import ToggleButton from "../../components/button/ToggleButton";

const headerStyle = {
    marginTop: '15px',
};

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        };
    }
    
    toggleHandler = (showMenu) => {
        this.setState({
            showMenu,
        });
    };

    render = () => {
        return (
            <div className="container" style={headerStyle}>
                <div className="notification is-primary">
                    <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <ToggleButton
                                    onToggle={this.toggleHandler}
                                    classes="is-primary is-large"
                                    inactiveIcon="fas fa-bars"
                                    activeIcon="fas fa-minus"/>
                            </div>
                        </div>
                        <div className="level-item">
                            <p className="title is-1 has-text-centered">
                                { this.props.title }
                            </p>
                        </div>
                        <div className="level-right"/>
                    </nav>
                </div>
            </div>
        );
    }
}
