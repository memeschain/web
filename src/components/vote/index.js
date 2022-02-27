import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { postVote, getCurrentUser } from '../../actions';
import './css/index.css';


class Vote extends Component {
  state = {
    previous: this.props.meme.votes.voted,
    danked: false,
    basiced: false,
    dankCount: this.props.meme.votes.dank,
    basicCount: this.props.meme.votes.basic,
  }

  async postVote(memeRefId, vote) {
    const { payload: user } = getCurrentUser();
    if (!user) {
      message.info(
        <span>Please <a href="/signin"> Sign In </a> to vote a meme.</span>,
      );
      return false;
    }
    const { danked, basiced, previous, dankCount, basicCount } = this.state;
    if (vote === 'upvote') {
      this.setState((prevState) => {
        return {
          danked: true,
          basiced: false,
          previous: 1,
          dankCount: prevState.dankCount + 1,
          basicCount: previous === -1 ? prevState.basicCount - 1 : prevState.basicCount,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          danked: false,
          basiced: true,
          previous: -1,
          dankCount: previous === 1 ? prevState.dankCount - 1 : prevState.dankCount,
          basicCount: prevState.basicCount + 1,
        };
      });
    }
    this.props.postVote({
      memeRefId,
      vote,
      prevVotingState: {
        danked,
        basiced,
        previous,
        dankCount,
        basicCount,
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    const { votingErrors } = nextProps;
    if (votingErrors.error) {
      if (votingErrors.prevVotingState) {
        message.error('Error duing voting. Please try again');
        const { previous, basiced, danked, dankCount, basicCount } = votingErrors.prevVotingState;
        this.setState({
          previous,
          basiced,
          danked,
          dankCount,
          basicCount,
        });
      }
    }
  }

  render() {
    return (
      <div className="flex justify-space-around votes-wrapper">
        { this.state.danked || this.state.previous === 1 ? (
          <Button
            className="vote-buttons dank-vote"
            icon={<ArrowUpOutlined />}
            disabled
          >
            <span className="title">DANK</span>
            <div className="count">{ this.state.dankCount }</div>
          </Button>
        ) : (

          <Button
            onClick={() => this.postVote(this.props.meme.memeRefId, 'upvote')}
            className="vote-buttons dank-vote"
            icon={<ArrowUpOutlined />}
          >
            <span className="title">DANK</span>
            <div className="count">{ this.state.dankCount }</div>
          </Button>
        )}

        { this.state.basiced || this.state.previous === -1 ? (
                      
          <Button
            icon={<ArrowDownOutlined />}
            className="vote-buttons basic-vote"
            disabled
          >
            <span className="title">BASIC</span>
            <div className="count">{ this.state.basicCount }</div>
          </Button>
        ) : (
          <Button
            onClick={() => this.postVote(this.props.meme.memeRefId, 'downvote')}
            className="vote-buttons basic-vote"
            icon={<ArrowDownOutlined />}
          >
            <span className="title">BASIC</span>
            <div className="count">{ this.state.basicCount }</div>
          </Button>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ votesReducers }) => {
  const { votingErrors } = votesReducers;
  return { votingErrors };
};


export default withRouter(connect(mapStateToProps, {
  postVote,
})(Vote));