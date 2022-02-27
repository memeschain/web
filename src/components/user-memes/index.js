import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getMemes, getCurrentUser } from '../../actions';
import MemesList from '../memes-list';
import { Button, Alert } from 'antd';
import AppPlaceholders from '../app-placeholders';
import noData from '../../images/placeholders/no_data.svg';
import { getOffset } from '../../utils/pagination-utils';


class UserMemes extends Component {

  state = {
    memer: '',
    currentPage: 0,
    profilePathName: /^\/profile\/[a-zA-Z0-9_]+\/all\/?/,
    myMemesPathName: /^\/my-memes\/all\/?/,
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
    this.getUsersMemes({ offset: getOffset(this.getPageFromProps(this.props)) });
  }

  getUsersMemes({ offset } = {}) {
    const { location } = this.props;
    if (this.state.myMemesPathName.test(location.pathname)) {
      const { payload: { memer } } = this.props.getCurrentUser();
      this.props.getMemes({ memer, offset });
    } else if (this.state.profilePathName.test(location.pathname)) {
      this.setState({ memer: this.props.profile });
      this.props.getMemes({ memer: this.props.profile, offset });
    }
  }

  onPaginationChange({ page }) {
    const { location } = this.props;
    if (this.state.myMemesPathName.test(location.pathname)) {
      this.props.history.push(`/my-memes/all/${page}`);
    } else if (this.state.profilePathName.test(location.pathname)) {
      this.props.history.push(`/profile/${this.props.profile}/all/${page}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const page = this.getPageFromProps(nextProps);
    if (this.state.hardRefresh || this.state.currentPage !== page) {
      this.getUsersMemes({ offset: getOffset(page) });
      this.setState({ currentPage: page, hardRefresh: false });
    }
    
    // this.props.getAuctions({ offset });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props.memes) !== JSON.stringify(nextProps.memes) || JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  handleErrorAndReset(cb) {
    const { location } = this.props;
    if (this.state.myMemesPathName.test(location.pathname)) {
      this.props.history.push('/my-memes/all/1');
    } else if (this.state.profilePathName.test(location.pathname)) {
      this.props.history.push(`/profile/${this.props.profile}/all/1`);
    }
    this.setState({ hardRefresh: true });
    cb();
  }

  noMemesMessage() {
    return (
      <AppPlaceholders
        src={noData}
        upper="No memes owned yet!"
        lower="Own your most creative memes for free.."
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
      <React.Fragment>
        <MemesList
          memes={this.props.memes}
          noMemesMessage={this.noMemesMessage.bind(this)}
          memesErrorMessage={this.memesErrorMessage.bind(this)}
          onPaginationChange={this.onPaginationChange.bind(this)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ memesReducers }) => {
  const { memes } = memesReducers;
  return { memes };
};

export default withRouter(connect(mapStateToProps, {
  getMemes,
  getCurrentUser,
})(UserMemes));
