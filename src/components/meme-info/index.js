import React from 'react';
import { Button, Popover, Tooltip, Modal, Input, message } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import Parse from 'parse';
import Vote from '../vote';
import { Link } from 'react-router-dom';
import './css/index.css';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  EmailShareButton,

  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  // GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon,
  EmailIcon,
} from 'react-share';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {
  postReport,
  onReportTextChanged,
  reportVisibility,
} from '../../actions';
import AuctionDetails from '../auction-details';

const MemeInfo = (props) => {
  const currentUser = Parse.User.current();
  let username;
  if (currentUser) {
    username = currentUser.get('username');
  }

  let userIsOwner = false;
  if (username === props.meme.success.owner.username) {
    userIsOwner = true;
  }

  const url=`https://www.memeschain.com/meme/${props.meme.success.memeId}`,

    hashtag="#memeschain",

    title = userIsOwner ? (
      'Hey, check out this meme I own on the Blockchain.'
     ) : `Hey, check out this meme owned by ${props.meme.success.owner.memer} on the Blockchain.`,
    
    via = 'MemesChain, at https://www.memeschain.com',
    
    media = props.meme.success.meme._url,
    
    tags = ['memeschain', 'blockchain'];
  
  const reportingStatus = {
    reportingVisible: false,
    uploadInProgress: false,
  }

  const onReportTextChanged = ({ target }) => {
    props.onReportTextChanged(target.value); 
  }

  const moreShareIcons = () => (
    <div className="more-share-icons">
      <FacebookShareButton url={url} hashtag={hashtag}>
        <FacebookIcon round size={32} />
      </FacebookShareButton>

      <TelegramShareButton title={title} url={url}>
        <TelegramIcon round size={32}/>
      </TelegramShareButton>

      <TumblrShareButton title={title} tags={tags} caption={url} url={url}>
        <TumblrIcon round size={32}/>
      </TumblrShareButton>

      <WhatsappShareButton title={title} url={url}>
        <WhatsappIcon round size={32}/>
      </WhatsappShareButton>

      <PinterestShareButton media={media} description={title} url={url}>
        <PinterestIcon round size={32}/>
      </PinterestShareButton>

      <LinkedinShareButton title={title} description={title} url={url}>
        <LinkedinIcon round size={32} />
      </LinkedinShareButton>

      <EmailShareButton subject={title} body={url} url={url}>
        <EmailIcon round size={32}/>
      </EmailShareButton>

      {/* <GooglePlusShareButton url={url}>
        <GooglePlusIcon round size={32} />
      </GooglePlusShareButton> */}
    </div>
  );

  const submitReport = async () => {
    try {
      reportingStatus.uploadInProgress =  true;

      await props.postReport({
        report: props.report.text,
        data: props.meme
      });

      reportingStatus.uploadInProgress = false;
      reportingStatus.reportingVisible = false;
      
      message.success("Your report has been posted. We will get back to you soon");
      props.reportVisibility(false);

    } catch (e) {
      message.error('Error posting your report. Please try again');
    }
  }
  
  return (
  <section className="meme-info">
  
    <div className="meme-img-wrapper">
      <img className="meme-img" src={props.meme.success.meme._url} />
    </div>

    <div className="meme-info-wrapper">
      <div className="owner-share-wrapper">
        <Link to={`/profile/${props.meme.success.owner.memer}/all`}>
          <div className="meme-owner-wrapper">
            <div>
              <img
                alt="meme"
                className="owner-img"
                src={`${process.env.REACT_APP_SERVER + process.env.REACT_APP_SERVER_PUBLIC}avatars/${props.meme.success.owner.avatar}`}
              />
            </div>
            <div className="owner-info">
              <p className="owner-name">{ props.meme.success.owner.memer }</p>
              <span className="owner">owner</span>
              <span className="owned-at">
                {moment(props.meme.success.createdAt).calendar()}
              </span>
            </div>
          </div>
        </Link>
      
        <div className="share-icons-wrapper">
      
          <div className="upper-share-icons">
            <RedditShareButton url={url} title={title}>
              <RedditIcon round size={32}/>
            </RedditShareButton>

            <TwitterShareButton url={url} title={title} via={via} hashtags={tags}>
              <TwitterIcon round size={32} />
            </TwitterShareButton>
            
            <Popover
              content={moreShareIcons()}
            >
              {/* <Icon type="ellipsis" className="more-icon"/> */}
            </Popover>
          </div>
        </div>
      </div>

      <div className="meme-info-votes-wrapper">
        <Vote meme={props.meme.success} />
      </div>
      <div className="auctions-wrapper">
        <AuctionDetails
          meme={props.meme.success}
        />
      </div>
      <div className="padding-large margin-vertical flex justify-end report-meme-wrapper">
        <Tooltip title="Report this meme">
          {/* <div className="report-meme-icon">
            <Icon type="exclamation-circle-o" onClick={() => props.reportVisibility(true) } />
          </div> */}
          <Button
            type="danger"
            ghost
            onClick={() => props.reportVisibility(true)}
            icon={<ExclamationCircleOutlined />}
          >
            Report
          </Button>
        </Tooltip>
      </div>
    </div>

      {/* <div className="meme-info-votes-wrapper">
        <Vote meme={props.meme.success} />
      </div> */}

    <Modal
      title="Report"
      visible={props.report.visibility}
      onOk={submitReport}
      confirmLoading={props.report.loading}
      onCancel={() => props.reportVisibility(false)}
      className="report-modal"
    >
      <p>Please add your query / complaint below.</p>
      <Input
        type="textarea"
        placeholder="Report information..."
        onChange={onReportTextChanged}
        value={props.report.text}
      />
      <p className="report-info">
        Please explain your report in brief
      </p>

    </Modal>
  </section>
  )
};

const mapStateToProps = ({ reportReducers }) => {
  const { report } = reportReducers;
  return { report };
};

export default connect(mapStateToProps, {
  postReport,
  onReportTextChanged,
  reportVisibility,
})(MemeInfo);
