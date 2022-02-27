import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Pagination } from 'antd';
import AppLoader from '../app-loader';
import Meme from '../meme';
import './css/index.css';

class MemesList extends Component {

  state = {
    current: 1,
  }

  componentWillMount() {
    this.setState({ current: +(this.props.match && this.props.match.params.page) || 1 });
  }

  // For browser back button
  componentWillReceiveProps(nextProps) {
    const page = +(nextProps.match && nextProps.match.params.page) || 1;
    this.setState({ current: page });
    // this.props.onPaginationChange({ offset: (page - 1) * 12 });
    // this.props.history.push(`/marketplace/sale/${page}`);

    // setTimeout(() => {
    //   this.props.onPaginationChange({ offset: (page - 1) * 12 });
    // }, 100);
  }

  itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a>Previous</a>;
    } else if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  }

  resetPagination() {
    this.setState({ current: 1 });
  }

  onPaginationChange(page) {
    this.setState({ current: page });
    this.props.onPaginationChange({ page });
  }

  renderMemes() {
    if (!this.props.memes.success.data.length) {
      return (
        <React.Fragment>
          { this.props.noMemesMessage() }
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            type="flex"
            align="middle"
            className="memes-list-wrapper"
          >
            {this.props.memes.success.data.map(meme => <Meme meme={meme} key={meme.memeId} />)}
          </Row>
          <Pagination
            total={this.props.memes.success.total}
            current={this.state.current}
            defaultCurrent={1}
            defaultPageSize={12}
            pageSize={12}
            size="large"
            itemRender={this.itemRender.bind(this)}
            className="memes-list-pagination"
            onChange={this.onPaginationChange.bind(this)}
          />
        </React.Fragment>      
      );
    }
  }

  renderError() {
    return (
      <div className="memes-list-error-wrapper">
        { this.props.memesErrorMessage(this.resetPagination.bind(this)) }
      </div>
    );
  }
  
  render() {
    if (this.props.memes.loading) {
      return (
        <div className="no-memes-wrapper">
          <AppLoader />
        </div>
      );
    } else {
      if (this.props.memes.success.ok) {
        return this.renderMemes();
      } else if (this.props.memes.errors.error) {
        return this.renderError();
      } else {
        return null;
      }
    }
  }
}

const mapStateToProps = () => {
  return { };
};

export default withRouter(connect(mapStateToProps, { })(MemesList));
