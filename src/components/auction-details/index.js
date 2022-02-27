import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'underscore';
import {
  Button,
  Modal,
  Form,
  DatePicker,
  List,
  InputNumber,
  Popover,
  message,
  Table,
  Divider,
} from 'antd';
import { weiToFixedEther } from '../../utils/wei-ether';
import {
  getCurrentUser,
  getAuctionPrice,
  auctionMeme,
  cancelAuction,
  buyMeme,
  renderAuctionDeatilsInitialState,
} from '../../actions';
import './css/index.css';
import web3 from '../../utils/web3';
import PricingDetails from '../pricing-details';

const FormItem = Form.Item;
//@es-ignore
const AuctionCreateForm = (props) => {
    const { visible, onCancel, onCreate, form, auctionPrice, createMemeAuction } = props;
    // const { getFieldDecorator } = form;
    const priceLoading = auctionPrice.loading;
    const priceSuccess = !priceLoading && !auctionPrice.errors.error && auctionPrice.success.ok;
    const priceFailure = !priceLoading && auctionPrice.errors.error && !priceSuccess;
    const priceDisabled = true;//!!(!priceLoading && !priceFailure && priceSuccess && auctionPrice.success.ok);
    
    return (
      <Modal
        visible={visible}
        title="Put your meme up for auction"
        okText="Auction it!"
        onOk={onCreate}
        onCancel={onCancel}
        confirmLoading={createMemeAuction.loading}
      >
        <Form layout="vertical">
          <FormItem
            label={(
              <span>
                Auction starting price in ETH. 
                <Popover
                  placement="bottom"
                  content={<PricingDetails />}
                >
                <a> How is auction price calculated?</a>
                </Popover>
              </span>
            )}
          >
            {/* {getFieldDecorator('startingPrice', {
              rules: [{
                required: true,
                message: 'Please enter the starting price of your meme!',
                type: 'number',
              }],
              initialValue: auctionPrice.success.data,
            })(
              <InputNumber
                disabled={priceDisabled}
                className="auction-price-input"
              />,
            )} */}
						<InputNumber
							className="auction-price-input"
							required
							placeholder='Please enter the starting price of your meme'
							max={auctionPrice.success.data}
              min={0}
							defaultValue={auctionPrice.success.data}
							disabled={priceDisabled}
							id="auction-starting-price-input-field"
						/>
          </FormItem>
          <FormItem
            label={<span>Auction ending price in ETH. Should be less than or equal to start price</span>}
            className="auction-price-startup-price-input"
          >
						<InputNumber
							className="auction-price-input"
							required
							placeholder='Please enter the ending price of your meme!'
							max={auctionPrice.success.data}
              min={0}
							id="auction-ending-price-input-field"

						/>
            {/* {getFieldDecorator('endingPrice', {
              rules: [{
                required: true,
                message: 'Please enter the ending price of your meme!',
                type: 'number',
                max: auctionPrice.success.data,
                min: 0,
              }],
              initialValue: 0,
            })(
              <InputNumber
                className="auction-price-input"
              />,
            )} */}
          </FormItem>

          <FormItem
            label="Choose auction end time"
          >
            {/* {getFieldDecorator('endingAuctionTime', {
              rules: [{ type: 'object', required: true, message: 'Please select auction end time!' }],
            })(
              <DatePicker
                showTime={{
                  disabledSeconds: () => _.range(0, 60),
                  hideDisabledOptions: true,
                  minuteStep: 15,
                }}
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="When should this auction end?"
                className="auction-date-time-picker"
                // disabledDate={current => current && current < moment().endOf('day')}
              />,
            )} */}
						 <DatePicker
						 	required
							 placeholder="Please select auction end time!"
							showTime={{
								disabledSeconds: () => _.range(0, 60),
								hideDisabledOptions: true,
								minuteStep: 15,
							}}
							format="YYYY-MM-DD HH:mm:ss"
							placeholder="When should this auction end?"
							className="auction-date-time-picker"
							id="auction-time-interval-date-field"
							// disabledDate={current => current && current < moment().endOf('day')}
              />
          </FormItem>
          
        </Form>
      </Modal>
    );
  }


class AuctionDetails extends Component {

  state = {
    modalVisible: false,
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }
  
  componentWillReceiveProps(nextProps) {
    const { auctionPrice, createMemeAuction, cancelMemeAuction, buyMemeFromAuction } = nextProps;
    if (auctionPrice.errors.error) {
      message.error(`Could not get auction price, ${auctionPrice.errors.message}`);
    }
    if (createMemeAuction.errors.error) {
      message.error(createMemeAuction.errors.message);
    }
    if (createMemeAuction.success.ok) {
      // this.form.resetFields();
      this.setState({ modalVisible: false });
      window.location.reload();
    }

    if (cancelMemeAuction.errors.error) {
      message.error(cancelMemeAuction.errors.message);
    }

    if (cancelMemeAuction.success.ok) {
      message.info('Your meme is out of auction.');
      window.location.reload();
    }

    if (buyMemeFromAuction.success.ok) {
      message.success('You now own this meme! Cheers!');
      setTimeout(() => window.location.reload(), 2000);
    }

    if (buyMemeFromAuction.errors.error) {
      message.error(buyMemeFromAuction.errors.message);
    }
  }

  componentWillUnmount() {
    this.props.renderAuctionDeatilsInitialState();
  }

  onCancel() {
    this.setState({ modalVisible: false });
  }

  handleCreate = () => {
    const { memeId, memeRefId } = this.props.meme;
		const startingPrice = document.querySelector('#auction-starting-price-input-field').value; 
		const endingPrice = document.querySelector('#auction-ending-price-input-field').value; 
		const endingAuctionTime	= document.querySelector("#auction-time-interval-date-field").value;	
		if (!startingPrice || !endingPrice || !endingAuctionTime) {
			message.error("Please fill all the fields")
			return false;
		}
    // this.form.validateFields((err, values) => {
    //   if (err) {
    //     return false;
    //   }
      this.props.auctionMeme({
				startingPrice,
				endingAuctionTime,
				endingPrice,
				memeId,
				memeRefId
			});
    //});
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  cancelAuction() {
    const { memeId } = this.props.meme;
    this.props.cancelAuction(memeId);
  }

  async sellMeme() {
    this.props.renderAuctionDeatilsInitialState();
    const { memeRefId } = this.props.meme;
    this.props.getAuctionPrice({ memeRefId });
    this.setState({ modalVisible: true });
  }

  async buyMeme() {
    this.props.buyMeme(this.props.meme);
  }

  renderAuctionButton() {
    if (this.props.currentUser && (this.props.meme.owner.username === this.props.currentUser.username)) { // User is owner of meme
      // Ask him to put it up on auction
      if (!this.props.meme.auction) {
        return (
          <Button
            type="primary"
            className="app-primary-large"
            onClick={this.sellMeme.bind(this)}
            loading={this.props.auctionPrice.loading}
          >
            Sell
          </Button>
        );
      }
      return (
        <Button
          type="danger"
          ghost
          onClick={this.cancelAuction.bind(this)}
          loading={this.props.cancelMemeAuction.loading}
        >
          Cancel Auction
        </Button>
      );
    } else if (this.props.meme.auction) {
      if (this.props.currentUser) {
        const isRaisingAuction = parseFloat(
          web3.utils.fromWei((this.props.meme.auction.currentPrice)),
        ) > parseFloat(
          web3.utils.fromWei((this.props.meme.auction.startingPrice)),
        );
        
        // if (
        //   parseFloat(
        //     web3.utils.fromWei((this.props.meme.auction.currentPrice)),
        //   ) > parseFloat(
        //     web3.utils.fromWei((this.props.meme.auction.startingPrice)),
        //   )
        // ) {
        //   return (
        //     <Popover
        //       placement="left"
        //       title="Rising Auction"
        //       content={
        //         <React.Fragment>
        //           <p>The price for this meme does <strong>not</strong> decrease with time.</p>
        //           <p>You may have to pay a bit higher than the <strong>Buy now price.</strong></p>
        //           <p>Excess ETH will be refunded to your account.</p>
        //         </React.Fragment>
        //       }
        //       trigger="hover"
        //     >
        //       <Button
        //         type="primary"
        //         className="app-primary-large"
        //         onClick={this.buyMeme.bind(this)}
        //         loading={this.props.buyMemeFromAuction.loading}
        //       >
        //         Buy
        //       </Button>
        //     </Popover>
        //   );
        // }
        return (
          <Popover
            placement="left"
            title="Buy this meme!"
            overlayClassName="auction-buy-info-popover"
            content={
              <React.Fragment>
              <p>
                You will pay
                <strong> { weiToFixedEther({ wei: this.props.meme.auction.currentPrice }) } ETH </strong>
                to   
                  <Link
                    to={`/profile/${this.props.meme.owner.memer}/all`}
                    target="_blank" rel="noopener noreferrer"
                  > { this.props.meme.owner.memer } </Link> 
                 and in return this meme will be transferred to you and you will be 
                the owner of the meme.
              </p>
              {
                isRaisingAuction ? (
                  <div className="font-normal">
                    <Divider dashed> Rising Auction </Divider>
                    <p>The price for this meme does <strong>not</strong> decrease with time, hence
                     you may have to pay a bit higher than the <strong>Buy now price.</strong></p>
                    <p>PS: Excess ETH will be refunded to your account.</p>
                  </div>
                ) : null
              }
              </React.Fragment>
            }
            trigger="hover"
          >
            <Button
              type="primary"
              className="app-primary-large"
              onClick={this.buyMeme.bind(this)}
              loading={this.props.buyMemeFromAuction.loading}
            >
              Buy
            </Button>
          </Popover>
        );
      }
      return (
        <Link
          to="/signin"
        >
          <Button
            type="primary"
            ghost
          >
            Sign in to buy this meme
          </Button>
        </Link>
      );
    }
    return null;
  }

  renderAuctionInfo() {
    if (this.props.meme.auction) {
      const getDuration = () => {
        const onAuctionDuration = new Date(this.props.meme.auction.startedAt * 1000);
        onAuctionDuration.setSeconds(onAuctionDuration.getSeconds() + +this.props.meme.auction.duration);
        if (new Date() > onAuctionDuration) {
          return 'Few minutes';
        }
        return moment(onAuctionDuration).fromNow(true);
      };

      return (
        <List
          itemLayout="horizontal"
          className="auction-details-list"
        >
          <List.Item
            actions={[
              <b>{weiToFixedEther({
                wei: this.props.meme.auction.currentPrice,
                fixed: 5,
              })} ETH</b>
            ]}
          >
            <h4>Buy now price</h4>
          </List.Item>

          <List.Item
            actions={[
              <b>{getDuration()}</b>,
            ]}
          >
            <h4>Time left</h4>
          </List.Item>

          <List.Item
            actions={[
              <b>{weiToFixedEther({
                wei: this.props.meme.auction.startingPrice,
                fixed: 5,
              })} ETH</b>
            ]}
          >
            <h4>Price started at</h4>
          </List.Item>

          <List.Item
            actions={[
              <b>{weiToFixedEther({
                wei: this.props.meme.auction.endingPrice,
                fixed: 5,
              })} ETH</b>
            ]}
          >
            <h4>Price goes to</h4>
          </List.Item>
        </List>
      );
    } else {
      if (this.props.currentUser && (this.props.meme.owner.username === this.props.currentUser.username)) { // User is owner of meme
        // Ask him to put it up on auction
        return (
          <div className="align-center margin-large padding">
            <h3>This meme is currently not on auction.</h3>
            
          </div>
        );
      } else {
        return (
          <div className="align-center margin-large padding">
            <h3>This meme is currently not on auction.</h3>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="auctions-component-wrapper">
        <div className="auctions-heading">
          <h4>Auction</h4>
          { this.renderAuctionButton() }
        </div>
        { this.renderAuctionInfo() }
        <AuctionCreateForm
          ref={this.saveFormRef}
          visible={this.state.modalVisible && (!this.props.auctionPrice.loading && this.props.auctionPrice.success.ok)}
          onCreate={this.handleCreate}
          onCancel={this.onCancel.bind(this)}
          auctionPrice={this.props.auctionPrice}
          createMemeAuction={this.props.createMemeAuction}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ parseReducers, auctionReducers }) => {
  const { currentUser } = parseReducers;
  const { auctionPrice, createMemeAuction, cancelMemeAuction, buyMemeFromAuction } = auctionReducers;
  return { currentUser, auctionPrice, createMemeAuction, cancelMemeAuction, buyMemeFromAuction };
};


export default withRouter(connect(mapStateToProps, {
  getCurrentUser,
  getAuctionPrice,
  auctionMeme,
  cancelAuction,
  buyMeme,
  renderAuctionDeatilsInitialState,
})(AuctionDetails));
