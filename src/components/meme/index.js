import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import { Col } from 'antd';
import './css/index.css';
import web3 from '../../utils/web3';
import { connect } from 'react-redux';
import Vote from '../vote';
import { weiToFixedEther } from '../../utils/wei-ether';

class Meme extends Component {
  
  state = {
    current: 1,
    showAuctionPrice: false,
  }

  handleMouseHover() {
    this.setState(state => ({ showAuctionPrice: !state.showAuctionPrice }));
  }

  renderMeme() {
    const {
      memeId,
      width,
      height,
      meme: { _url },
      auction,
    } = this.props.meme;
    return (
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 8 }}
        lg={{ span: 8 }}
        xl={{ span: 8 }}
        justify="center"
        align="middle"
        key={memeId}
      >
        <div
          className="meme-wrapper"
          onMouseEnter={this.handleMouseHover.bind(this)}
          onMouseLeave={this.handleMouseHover.bind(this)}
        >
          <Link to={`/meme/${memeId}`}>
            { auction ? (
              <div>
                <div className="ribbon"><span>ON SALE</span></div>
              </div>
              ) : null
            }
            <div className="outer-wrapper">
              { auction ? (
                <Animated
                  animationIn="fadeInDown"
                  animationOut="fadeOut"
                  isVisible={this.state.showAuctionPrice}
                  animateOnMount={false}
                  className="price-animator"
                  style={{ display: 'block' }}
                >
                  <div className="auction-info-wrapper">
                    <div className="auction-price">
                      <span> { weiToFixedEther({ fixed: 5, wei: auction.currentPrice }) } ETH</span>
                    </div>
                  </div>
                </Animated>
                ) : null
              }
              <div className="inner-wrapper">
                <img alt="meme" className={`meme ${
                    (!((width / height) >= 0.8 && (width / height) <= 1.2)) ? ` object-fit-contain `: ` `
                    }
                  `} 
                  src={_url}
                />
              </div>
            </div>
          </Link>
          <Vote meme={this.props.meme} />
        </div>
      </Col>
    );
  }

  render() {
    return (
      <React.Fragment>
        { this.renderMeme() }
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  return { };
};


export default withRouter(connect(mapStateToProps, {
})(Meme));
