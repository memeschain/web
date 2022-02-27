import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { getMemes } from '../../actions';
import MemesList from '../memes-list';
import chilling from '../../images/placeholders/chilling.svg';
import AppPlaceholders from '../app-placeholders';
import { getOffset } from '../../utils/pagination-utils';
import './css/index.css';

class AllMemes extends Component {
  
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
    this.props.getMemes({ offset: getOffset(this.getPageFromProps(this.props)) });
  }

  onPaginationChange({ page }) {
    // this.props.getAuctions({ offset });
    this.props.history.push(`/marketplace/all/${page}`);
  }

  componentWillReceiveProps(nextProps) {
    const page = this.getPageFromProps(nextProps);
    if (this.state.hardRefresh || this.state.currentPage !== page) {
      this.props.getMemes({ offset: getOffset(page) });
      this.setState({ currentPage: page, hardRefresh: false });
    }
    
    // this.props.getAuctions({ offset });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props.memes) !== JSON.stringify(nextProps.memes) || JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  handleErrorAndReset(cb) {
    this.props.history.push('/marketplace/all/1');
    this.setState({ hardRefresh: true });
    cb();
  }

  noMemesMessage() {
    return (
      <AppPlaceholders
        src={chilling}
        upper="No Auctions!"
        lower="lower text.."
      >
        <Link to={`/create`}>
          <Button
            type="primary"
            size="large"
            className="app-primary-large"
          >
            Own a meme
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
          description={this.props.memes.errors.message}
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
    );
  }

  render() {
    return (
      <MemesList
        memes={this.props.memes}
        noMemesMessage={this.noMemesMessage.bind(this)}
        memesErrorMessage={this.memesErrorMessage.bind(this)}
        onPaginationChange={this.onPaginationChange.bind(this)}
      />
    );
  }
}

const mapStateToProps = ({ memesReducers }) => {
  const { memes } = memesReducers;
  return { memes };
};

export default withRouter(connect(mapStateToProps, {
  getMemes,
})(AllMemes));

