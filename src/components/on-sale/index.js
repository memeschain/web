import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getAuctions } from '../../actions';
import './css/index.css';
import MemesList from '../memes-list';
import { Button, Alert } from 'antd';
import connecting from '../../images/placeholders/connecting.svg';
import AppPlaceholders from '../app-placeholders';
import { getOffset } from '../../utils/pagination-utils';

class OnSale extends Component {

  state = {
    currentPage: 0,
    hardRefresh: false,
  };

  getPageFromProps(props) {
    const { match } = props;
    const page = match && match.params.page ? +match.params.page : 1;
    return page;
  }

  componentWillMount() {
    this.setState({ currentPage: this.getPageFromProps(this.props) });
  }

  componentDidMount() {
    this.props.getAuctions({ offset: getOffset(this.getPageFromProps(this.props)) });
  }

  onPaginationChange({ page }) {
    // this.props.getAuctions({ offset });
    this.props.history.push(`/marketplace/sale/${page}`);
  }

  componentWillReceiveProps(nextProps) {
    const page = this.getPageFromProps(nextProps);
    if (this.state.hardRefresh || this.state.currentPage !== page) {
      this.props.getAuctions({ offset: getOffset(page) });
      this.setState({ currentPage: page, hardRefresh: false });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props.auctions) !== JSON.stringify(nextProps.auctions) || JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  handleErrorAndReset(cb) {
    this.props.history.push('/marketplace/sale/1');
    this.setState({ hardRefresh: true });
    cb();
  }

  noMemesMessage() {
    return (
      <AppPlaceholders
        src={connecting}
        upper="Ah! Cant see any memes on auction!"
        lower="Be the first to put your dank meme up for auction"
        >
        <Link to={`/my-memes/all`}>
          <Button
            type="primary"
            size="large"
            className="app-primary-large"
          >
          Auction Memes
          </Button>
        </Link>
      </AppPlaceholders>
    );
  }

  memesErrorMessage(cb) {
    return (
      <div className="error-wrapper">
        <Alert
          message="Error!"
          description={this.props.auctions.errors.message}
          type="error"
          showIcon
        />
        <div
          className="margin-vertical-large"
        >
          <Button
            type="default"
            size="large"
            onClick={() => this.handleErrorAndReset(cb)}
          >
            Try again
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <MemesList
        memes={this.props.auctions}
        noMemesMessage={this.noMemesMessage.bind(this)}
        memesErrorMessage={this.memesErrorMessage.bind(this)}
        onPaginationChange={this.onPaginationChange.bind(this)}
      />
    );
  }
}

const mapStateToProps = ({ auctionReducers }) => {
  const { auctions } = auctionReducers;
  return { auctions };
};

export default withRouter(connect(mapStateToProps, {
  getAuctions,
})(OnSale));
