import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { HomeWithAuth, HomeWithoutAuth } from '../../components/app-home';
import {
  getCurrentUser,
} from '../../actions';

class Auth extends Component {

  componentWillMount() {
    this.props.getCurrentUser();
  }

  renderScreen() {
    if (this.props.currentUser) {
      return <HomeWithAuth {...this.props} />;
    } else {
      return <HomeWithoutAuth {...this.props} />;
    }
  }

  render() {
    return (
      <Route {...this.props} render={() => this.renderScreen()} />
    );
  }
}

const mapStateToProps = ({ parseReducers }) => {
  const { currentUser } = parseReducers;
  return { currentUser };
};

export default withRouter(connect(mapStateToProps, {
  getCurrentUser,
})(Auth));
