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


class Memer extends Component {

  state = {
    memer: '',
    currentTab: '1',
    memerAllMemesPathName: /^\/my-memes\/all\/?/,
    memerSellMemesPathName: /^\/my-memes\/sale\/?/,
  }

  componentWillMount() {
    this.highlightTab(this.props);
    this.props.getCurrentUser();
  }

  highlightTab(props) {
    const { location } = props;
    if (this.state.memerAllMemesPathName.test(location.pathname)) {
      this.setState({ currentTab: '1' });
    } else if (this.state.memerSellMemesPathName.test(location.pathname)) {
      this.setState({ currentTab: '2' });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.highlightTab(nextProps);
    if (nextProps.currentUser) {
      this.setState({ memer: nextProps.currentUser.memer });
    }
  }

  renderMemer() {
    return <MemerInfo memerName={this.state.memer} {...this.props} />;
  }

  renderMemerMemes() {
    return (
      <Tabs activeKey={this.state.currentTab} className="memer-tabs">
        <Tabs.TabPane
          tab={
            <Link to="/my-memes/all" className="tab-link">
              All
            </Link>
          } key="1"
        >
          <Route
            path={`/my-memes/all/:page?`}
            component={UserMemes}
            {...this.props}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <Link to="/my-memes/sale" className="tab-link">
              Selling
            </Link>
          }
          key="2"
        >
          <Route
            path={`/my-memes/sale/:page?`}
            component={SellingMemes}
            {...this.props}
          />
        </Tabs.TabPane>
      </Tabs>
    );
  }

  render() {
    if (this.state.memer) {
      return (
        <div className="memer-page">
          { this.renderMemer() }
          { this.renderMemerMemes() }
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = ({ parseReducers }) => {
  const { currentUser } = parseReducers;
  return { currentUser };
};

export default withRouter(connect(mapStateToProps, {
  getCurrentUser,
})(Memer));
