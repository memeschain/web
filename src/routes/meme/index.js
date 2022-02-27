import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import MemeInfo from '../../components/meme-info';
import AppLoader from '../../components/app-loader';
import AppPlaceholders from '../../components/app-placeholders';
import dog from '../../images/placeholders/dog.svg';
import { Button } from 'antd';
import {
  getMeme,
  getMemeInitialState,
} from '../../actions';
import './css/index.css';

class Meme extends Component {
  
  componentWillMount() {
    this.props.getMeme({ meme: this.props.match.params.meme });
  }

  renderError() {
    return (
      <div className="align-center center-flex">
        <AppPlaceholders
          src={dog}
          upper="Oops! No meme found here"
          lower="Eh! Whatever, I'll own more memes"
        >
          <Link to="/">
            <Button
              className="app-primary-large"
              type="primary"
            >
              Back to home
            </Button>
          </Link>
        </AppPlaceholders>
      </div>
    )
  }

  render() {
    if (this.props.meme.loading) {
      return (
        <div className="meme-loading-wrapper">
          <AppLoader />
        </div>
      )
    } else {
      if (this.props.meme.success.ok) {
        return (
          <MemeInfo
            {...this.props}
          />
        );
      } else if (this.props.meme.errors.error) {
        return this.renderError();
      }
    }
  }
}

const mapStateToProps = ({ memeReducers }) => {
  const { meme } = memeReducers;
  return { meme };
};

export default withRouter(connect(mapStateToProps, {
  getMeme,
  getMemeInitialState,
})(Meme));
