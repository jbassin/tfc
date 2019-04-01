import React, { Component } from 'react';

const headerStyle = {
    marginTop: '15px',
};

export default class Header extends Component {
    render = () => {
        return (
          <div className="container" style={headerStyle}>
              <div className="notification is-primary">
                  Hello World!
              </div>
          </div>
        );
    }
}
