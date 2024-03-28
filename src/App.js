import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Login, Wallet } from './pages/Routes';

class App extends Component {
  render() {
    const { theme } = this.props;
    return (
      <div id="container-all" className={ theme }>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/carteira" component={ Wallet } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.toggleTheme.theme,
});

App.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(App);
