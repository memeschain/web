import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { withRouter, Link, Route } from 'react-router-dom';
import AppPlaceholders from '../../components/app-placeholders';
import './css/index.css';
import AllMemes from '../../components/all-memes';
import { getCurrentUser } from '../../actions';
import OnSale from '../../components/on-sale';

class MarketPlace extends Component {

  state = {
    currentTab: '1',
  };

  componentWillMount() {
    this.setState({ currentTab: this.props.location && this.props.location.pathname.includes('/all') ? '2' : '1' });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.location) {
      if (nextProps.location && nextProps.location.pathname.includes('/all')) {
        this.setState({ currentTab: '2' });
      } else {
        this.setState({ currentTab: '1' });
      }
    }
  }

  renderTabInfo() {
    return (
      <React.Fragment>
        {
          this.state.currentTab === '1' ? (
            <header className="marketplace-info-wrapper">
              The most popular memes up for grabs!
            </header>
          ) : (
            <header className="marketplace-info-wrapper">
              New and shiny memes...
            </header>
          )
        }
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        { this.renderTabInfo() }
        <Tabs activeKey={this.state.currentTab} className="market-place-tabs">
          <Tabs.TabPane
            tab={
              <Link to="/marketplace/sale" className="tab-link">
                On Sale
              </Link>
            } key="1"
          >
            <div className="on-sale-wrapper">
              <Route
                path={`${this.props.match.path}marketplace/sale/:page?`}
                component={OnSale}
                {...this.props}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <Link to="/marketplace/all" className="tab-link">
                All Memes
              </Link>
            }
            key="2"
          >
            <Route path={`${this.props.match.path}marketplace/all/:page?`} component={AllMemes} />
          </Tabs.TabPane>
        </Tabs>
        {/* <Switch>
        <Route path={`${this.props.match.path}/sale/:page?`} render={() => (
          <Tabs defaultActiveKey="1" className="market-place-tabs" onChange={() => this.props.history.push(`${this.props.match.path}/sale/0`)}>
          <Tabs.TabPane tab="On Sale" key="1" >
            <div className="on-sale-wrapper">
              <OnSale />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="All Memes" key="2">
          </Tabs.TabPane>
        </Tabs>
        )} />
        <Route path={`${this.props.match.path}/all/:page?`} render={() => (
          <Tabs defaultActiveKey="2" className="market-place-tabs" onChange={() =>      this.props.history.push(`${this.props.match.path}/all/0`)        }>
          <Tabs.TabPane tab="On Sale" key="1" >
          </Tabs.TabPane>
          <Tabs.TabPane tab="All Memes" key="2">
            <AllMemes />
          </Tabs.TabPane>
        </Tabs>
        )}  />
        </Switch> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  return { };
};

export default withRouter(connect(mapStateToProps, {
  getCurrentUser,
})(MarketPlace));
