import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MemeCreationType from '../../components/meme-creation-type';

class Create extends Component {
  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <Switch>
          <Route path={match.path} exact component={MemeCreationType} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  return { };
};

export default withRouter(connect(mapStateToProps, {})(Create));
