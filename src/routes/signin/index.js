import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Alert, Button, message } from 'antd';
import {
  getMetaMaskStatus,
  validateMemerName,
  postUser,
  providerInstalled,
  providerNetwork,
  providerUnLocked,
  providerCurrentAccount,
  getFirstTime,
  iterateAvatar,
  revertToInitialState,
	providerEnabled,
} from '../../actions';
import NoMetaMask from '../../components/web3-status-fragments/fragments/no-meta-mask';
import BadMetaMaskNetwork from '../../components/web3-status-fragments/fragments/bad-network';
import EthNotENabled from '../../components/web3-status-fragments/fragments/eth-not-enabled';
import NoAccount from '../../components/web3-status-fragments/fragments/no-account';
import { generateMetaMaskSign } from '../../service/web3';
import './css/index.css';
import FAQ from '../../components/app-faq/index';
import AppLoader from '../../components/app-loader';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      getFirstTime: false,
    }
  }


  async componentWillMount() {
    window.scrollTo(0, 0);
    this.props.providerInstalled();
		await this.props.providerEnabled();
    this.props.providerNetwork();
    this.props.providerUnLocked();
    this.props.providerCurrentAccount();
    this.props.getMetaMaskStatus();
    this.props.iterateAvatar();
  }

  componentWillUnmount() {
    this.props.revertToInitialState();
  }

  onMemerNameChange = ({ target }) => {
    this.props.validateMemerName(target.value);
  }

  renderErrorDuringLoginSignUp() {
    return (
      <React.Fragment>
        <Alert
          message="Sign in failed!"
          description={this.props.signup.errors.message}
          type="error"
          showIcon
          className="full-width"
        />

      <div
        className="full-width margin-vertical-large"
      >
        <Button
          type="default"
          size="large"
          onClick={this.handleSubmit}
        >
          Try again
        </Button>
      </div>
          
      </React.Fragment>
    )
  }

  renderFirstTimeSignIn() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="hero">
          <h2>One last thing..</h2>
          <p>We need a unique memer name for your account.</p>
        </div>
        <div className="profile-picture">
          <img
            alt="memer profile"
            src={`${process.env.REACT_APP_SERVER + process.env.REACT_APP_SERVER_PUBLIC}avatars/${this.props.avatar}`}
            onClick={() => this.props.iterateAvatar(this.props.avatar)}
          />
        </div>
        <div>
          <div className="align-left">
            <label htmlFor="account">Wallet address</label>
            <Input
              size="large"
              type="text"
              id="account"
              name="account"
              placeholder="Wallet Address"
              value={this.props.web3.account}
              defaultValue={this.props.web3.account}
              maxLength="100"
              disabled
              onChange={null}
              className="signin-input"
            />
          </div>
          <br />
          <div className="align-left">
            <label htmlFor="user-name">Memer Name</label>
            <Input
              size="large"
              type="text"
              id="memername"
              name="memername"
              placeholder="Enter you memer name. Minimum 3 characaters long."
              value={this.props.auth.memername.memer}
              maxLength="32"
              onChange={this.onMemerNameChange}
              className="signin-input"
            />
            { this.renderAvailibility() }
          </div>
          <br />
          <div className="app-alert-message margin-vertical-large">
            <Alert
              description="Make sure to save your MetaMask login information and account recovery details! We can’t help you regain access if you lose it."
              type="warning"
              className="metamask-warning"
            />
          </div>
          <br />
            <Button
              type="primary"
              size="large"
              className="app-primary-large"
              disabled={!this.props.auth.memername.valid}
              onClick={this.handleSubmit}
              loading={this.props.signup.loading}
            >
              Sign In
            </Button>
            
        </div>
      </form>
    )
  }


  renderLogIn() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="hero">
          <h2>Log in to continue..</h2>
          <p>Ah! Looks like you have already registered. </p>
        </div>
        <div>
          <div className="align-left">
            <label htmlFor="account">Wallet address</label>
            <Input
              size="large"
              type="text"
              id="account"
              name="account"
              placeholder="Wallet Address"
              value={this.props.auth.new.success.username}
              defaultValue={this.props.auth.new.success.username}
              maxLength="100"
              disabled
              onChange={null}
              className="signin-input"
            />
          </div>
          <br />
          <div className="align-left">
            <label htmlFor="user-name">Memer Name</label>
            <Input
              size="large"
              type="text"
              id="memername"
              name="memername"
              placeholder="Enter you memer name"
              value={this.props.auth.new.success.memer}
              maxLength="32"
              onChange={null}
              className="signin-input"
              disabled
            />
          </div>
          <br />
          <div className="app-alert-message margin-vertical-large">
            <Alert
              description="Make sure to save your MetaMask login information and account recovery details! We can’t help you regain access if you lose it."
              type="warning"
              className="metamask-warning"
            />
          </div>
          <br />
          <Button
            type="primary"
            size="large"
            className="app-primary-large"
            onClick={this.handleSubmit}
          >
            Log In
          </Button>
            
        </div>
      </form>
    )
  }

  renderAvailibility() {
    if (this.props.auth.memername.memer) {
      if (this.props.auth.memername.searching) {
        return <p>Loading...</p>
      } else {
        if (this.props.auth.memername.valid) {
          return <span style={{ color: 'green' }}>Memer name is available</span>
        }
        return <span style={{ color: 'red' }}>Memer name is not available. Only letters, numbers and _</span>
      }
    }
    return null;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const [account] = this.props.metaMaskStatus.account;
    const { auth: { memername: { memer } }, avatar } = this.props;
    const data = [{
      type: 'string',
      name: 'Memer',
      value: memer.trim().toLowerCase(),
    }];
    try {
      const sign = await generateMetaMaskSign(account, data);
      await this.props.postUser({ sign, account, memer, avatar });
    } catch (e) {
      message.error(e.split("\n")[0]);
    }
  }

  signInPage() {
    if (this.props.auth.new.loading) {
      return <AppLoader />
    } else {
      if (this.props.auth.new.success.ok) {
        if (this.props.signup.attempted) {
          if (this.props.signup.status) {
            this.props.history.push('/');
            window.location.reload();
          } else {
            return this.renderErrorDuringLoginSignUp();
          }
        } else {
          if (this.props.auth.new.success.new) {
            return this.renderFirstTimeSignIn();
          } else {
            return this.renderLogIn();
          } 
        }
      } else if (this.props.auth.new.errors.error) {
        return <Alert
          message="Error"
          description={this.props.auth.new.errors.message}
          type="error"
          showIcon
          className="full-width"
        />
      } else {
        return null;
      }
    } 
  }
  
  getStatus() {
    if (this.props.web3.loading) {
      return <AppLoader />;
    } else {
			if (!this.props.web3.installed) {
        return <NoMetaMask />;
      } else if (!this.props.web3.enabled) {
				return <EthNotENabled />
			}
      else if (!this.props.web3.unlocked) {
        return <NoAccount />;
      } 
			else if (!this.props.web3.network) {
        return <BadMetaMaskNetwork network="" />;
      } 
			else {
        if (this.props.web3.account) {
          if(!this.state.getFirstTime) {
            this.props.getFirstTime(this.props.web3.account);
            this.setState({ getFirstTime: true });
          }
          return this.signInPage();
        } else {
          return null;
        }
      }
    }
  }

  render() {
		console.log(this.props)
    return (
      <div className="sign-in-wrapper">
        { this.getStatus() }
        <br /><br />
        <div className="faq full-width">
          <FAQ />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authReducers, web3Reducers }) => {
  const { metaMaskStatus, auth, signup, avatar } = authReducers;
  const { web3 } = web3Reducers;
  return { metaMaskStatus, auth, signup, web3, avatar };
};

export default withRouter(connect(mapStateToProps, {
  getMetaMaskStatus,
  validateMemerName,
  postUser,
  providerInstalled,
  providerNetwork,
  providerUnLocked,
  getFirstTime,
  providerCurrentAccount,
  iterateAvatar,
  revertToInitialState,
	providerEnabled,
})(SignIn));

