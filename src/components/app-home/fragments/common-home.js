import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Parse from 'parse';
import { Row, Col, Button, Divider } from 'antd';
import AppLandingSlots from '../../../components/app-landing-slots';
import '../css/index.css';
import you from '../../../images/landing-intro/you.jpg';
import meme from '../../../images/landing-intro/meme.jpg';
import owned from '../../../images/landing-intro/owned.jpg';
import discord from '../../../images/vendor/discord.png';
import reddit from '../../../images/vendor/reddit.png';
import instagram from '../../../images/vendor/insta.jpeg';

class CommonHome extends Component {

  componentWillMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="route-home">
        <Row type="flex" className="padding-large flex-wrap-reverse">
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} className="landing-slots-wrapper">
            <AppLandingSlots />
          </Col>


          

          {/* <div class="ant-col-xs-24 ant-col-sm-24 ant-col-md-12">
    <div class="app-headline circular-medium">
        <div class="app-headline-two-part-wrapper">
            <div class="text">
                <h1>Create </h1>
                <h1>Own</h1>
                <h1>Sell</h1>
            </div>
            <div class="divider">
                <div class="ant-divider ant-divider-vertical"></div>
            </div>
            <div class="text">
                <h1>Dank Memes!</h1>
            </div>
        </div>
        <div class="margin-vertical-large">
            <p class="sub-heading no-margin align-center padding-horizontal">Your most creative memes need to be owned on the Blockchain!</p>
        </div><br>
        <div class="app-home-primary-action-wrapper align-center"><button type="button" class="ant-btn app-primary-large ant-btn-primary"><a href="/signin">Sign In</a></button></div>
    </div>
</div> */}



          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
            <div className="app-headline circular-medium">
              {/* <h1>Create Dank Memes.</h1>
              <h1>Own Memes.</h1>
              <h1>Sell Memes.</h1>

              <div className="margin-vertical-large">
                <p className="sub-heading no-margin">Your most creative memes need to be owned!</p>
              </div> */}


              <div className="app-headline-two-part-wrapper">
                <div className="text">
                    <h1>Create </h1>
                    <h1>Own</h1>
                    <h1>Sell</h1>
                </div>
                <div className="divider">
                    <div className="ant-divider ant-divider-vertical"></div>
                </div>
                <div className="text">
                    <h1>Dank Memes!</h1>
                </div>
              </div>
              
              <div className="margin-vertical-large">
                <p className="sub-heading no-margin align-center padding-horizontal">
                  Your most creative memes need&apos;s to be owned on the Blockchain!
                </p>
              </div>
              <br />
              <div className="app-home-primary-action-wrapper align-center">
                { Parse.User.current() ? (
                    <Button type="primary" className="app-primary-large">
                      <Link to="/my-memes/all">My Memes</Link>
                    </Button>
                  ) : (
                    <Button type="primary" className="app-primary-large">
                      <Link to="/signin">Sign In</Link>
                    </Button>
                  )
                }
              </div>
            </div>
          </Col>
        </Row>

        <div className="memes-chain-description">
          <div className="hero">
            <h2>What is MemesChain?</h2>
            <p>
              MemesChain is a platform that helps you own and monetize your most creative memes, 
              using the power of blockchain and AI.
            </p>
          </div>
        </div>


        <div className="meme-explainer align-center">
          <h2>How do I own my creative meme?</h2>
          <Row type="flex" justify="space-around">
            <Col className="eplainer-img-wrapper">
              <div>
                <p>You - @memer</p>
                <img src={you} className="full-width explainer" alt="" />
              </div>
              <div className="joiner">
                {/* <Icon type="heart" /> */}
              </div>
            </Col>
            <Col className="eplainer-img-wrapper">
              <div>
                <p>Your meme</p>
                <img src={meme} className="full-width explainer" alt="" />
              </div>
              <div className="joiner">
                {/* <Icon type="double-right" className="main-color" /> */}
              </div>
            </Col>
            <Col className="eplainer-img-wrapper">
              <div>
                <p>Owned it!</p>
                <img src={owned} className="full-width explainer" alt="" />
              </div>
            </Col>
          </Row>
        </div>

        <div className="memes-chain-description">
          <div className="hero">
            <h2>How is my ownership of a meme guaranteed?</h2>
            <p>
              MemesChain is an ownership platform, that is built on the Blockchain. Blockchain powers all of the cryptocurrencies like Bitcoin and Ethereum etc. You can buy, sell, or trade your Memes, safe in the knowledge that blockchain and AI will track ownership securely ensuring your memes are not plagiarized.
            </p>
          </div>
        </div>

        <div className="memes-chain-description" style={{ backgroundColor: 'white' }}>
          <div className="hero">
            <h2>Can I monetize my memes?</h2>
            <p>
              Yes! If you wish to, you can monetize your memes, via meme auctions and ads.
            </p>
          </div>
        </div>


        <div className="memes-chain-description">
          <div className="hero">
            <h3>What does ownership cost?</h3>
            <p>
              It's free! You can secure ownership of your memes and monetise for no cost!  
            </p>
            
              {
                Parse.User.current() ? (
                  <Link to="/create">
                    <Button type="primary" className="app-primary-large">
                      Own Memes
                    </Button>
                  </Link>
                ) : (
                  <Link to="/signin">
                    <Button type="primary" className="app-primary-large">
                      Get Started
                    </Button>
                  </Link>
                )

              }
          </div>
        </div>
      </div>
    );
  }
}

export default CommonHome;
