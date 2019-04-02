import React, {Component} from 'react';
import LinkButton from "../../components/button/LinkButton";

const headerStyle = {
    marginTop: '10px',
};

export default class Links extends Component {
    render = () => {
        return (
            <>
                <div className="container" style={headerStyle}>
                    <div className="notification is-primary">
                        <nav className="level">
                            <div className="level-item">
                                <LinkButton
                                    classes="is-primary"
                                    text="Click Me!"/>
                            </div>
                        </nav>
                    </div>
                </div>
            </>
        );
    };
}
