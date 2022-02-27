import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { withRouter, Link, Route } from 'react-router-dom';
import MemerInfo from '../../components/memer-info';
import UserMemes from '../../components/user-memes';
import SellingMemes from '../../components/selling-memes';
import './css/index.css';
import {
  getCurrentUser,
} from '../../actions';


class Profile extends Component {

  state = {
    currentTab: '1',
    profileAllMemesPathName: /^\/profile\/[a-zA-Z0-9_]+\/all\/?/,
    profileSellMemesPathName: /^\/profile\/[a-zA-Z0-9_]+\/sale\/?/,
  }

  componentWillMount() {
    const { location } = this.props;
    if (this.state.profileAllMemesPathName.test(location.pathname)) {
      this.setState({ currentTab: '1' });
    } else if (this.state.profileSellMemesPathName.test(location.pathname)) {
      this.setState({ currentTab: '2' });
    } else {
      this.props.history.push(`/profile/${this.props.match.params.id}/all`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    if (this.state.profileAllMemesPathName.test(location.pathname)) {
      this.setState({ currentTab: '1' });
    } else if (this.state.profileSellMemesPathName.test(location.pathname)) {
      this.setState({ currentTab: '2' });
    }
  }


  renderMemer() {
    return <MemerInfo memerName={this.props.match.params.id} {...this.props} />;
  }

  renderMemerMemes() {
    return (
      <Tabs activeKey={this.state.currentTab} className="memer-tabs">
        <Tabs.TabPane
          tab={
            <Link to={`/profile/${this.props.match.params.id}/all`} className="tab-link">
              All
            </Link>
          } key="1"
        >
          <Route
            path={`/profile/${this.props.match.params.id}/all/:page?`}
            render={routeProps => <UserMemes {...routeProps} profile={this.props.match.params.id} />}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <Link to={`/profile/${this.props.match.params.id}/sale`} className="tab-link">
              Selling
            </Link>
          } key="2"
        >
          <Route
            path={`/profile/${this.props.match.params.id}/sale/:page?`}
            render={routeProps => <SellingMemes {...routeProps} profile={this.props.match.params.id} />}
          />
        </Tabs.TabPane>
      </Tabs>
    );
  }

  render() {
    return (
      <div className="memer-page">
        { this.renderMemer() }
        { this.renderMemerMemes() }
      </div>
    );
  }
}

const mapStateToProps = ({ parseReducers }) => {
  const { currentUser } = parseReducers;
  return { currentUser };
};

export default withRouter(connect(mapStateToProps, {
  getCurrentUser,
})(Profile));
