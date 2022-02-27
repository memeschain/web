import React from 'react';
import './css/index.css';
import { Row, Col } from 'antd';

import meme1 from '../../images/landing/make-meme-l1-1.jpg';
import meme2 from '../../images/landing/make-meme-l1-2.jpg';
import meme3 from '../../images/landing/make-meme-l1-3.jpg';
import meme4 from '../../images/landing/make-meme-l1-4.jpg';
import meme5 from '../../images/landing/make-meme-l2-1.jpg';
import meme6 from '../../images/landing/make-meme-l2-2.jpg';
import meme7 from '../../images/landing/make-meme-l2-3.jpg';
import meme8 from '../../images/landing/make-meme-l2-4.jpg';
import meme9 from '../../images/landing/make-meme-l3-1.jpg';
import meme10 from '../../images/landing/make-meme-l1-5.jpg';
import meme11 from '../../images/landing/make-meme-l2-5.jpg';
import meme12 from '../../images/landing/make-meme-l3-2.jpg';

const AppLandingSlots = () => {
  return (
    <div className="landing-slots">
      <Row align="top" justify="start" type="flex">
        <Col className="landing-slot-cols">
          <Row align="top" justify="start" type="flex" className="landing-pattern" gutter={10}>
            <Col className="landing-meme-container">
              <img
                src={meme12}
                alt="meme"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={meme3}
                alt="meme"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={meme4}
                alt="meme"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={meme2}
                alt="meme"
                className="landing-meme"
              />
            </Col>
          </Row>
        </Col>
        <Col className="landing-slot-cols">
          <Row align="top" justify="start" type="flex" className="landing-pattern" gutter={10}>
            <Col className="landing-meme-container">
              <img
                src={meme4}
                alt="meme"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={meme10}
                alt="meme"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={meme1}
                alt="meme"
                className="landing-meme"
              />
            </Col>
            
            <Col className="landing-meme-container">
              <img
                src={meme8}
                alt="meme"
                className="landing-meme"
              />
            </Col>
          </Row>
        </Col>

        <Col className="landing-slot-cols">
          <Row align="top" justify="start" type="flex" className="landing-pattern" gutter={10}>

            <Col className="landing-meme-container">
              <img
                src={meme11}
                alt="meme"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={meme8}
                alt="meme"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={meme2}
                alt="meme"
                className="landing-meme"
              />
              <Col className="landing-meme-container">
                <img
                  src={meme6}
                  alt="meme"
                  className="landing-meme"
                />
              </Col>
            </Col>
          </Row>
        </Col>

      </Row>
    </div>
  );
};

export default AppLandingSlots;
