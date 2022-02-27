import React from 'react';
import { Table } from 'antd';

const PricingDetails = () => (
  <React.Fragment>
    <ul>
      <li>Auction price: Number of <strong>DANK</strong> votes * 0.001. </li>
      <li>Higher the upvotes, higher the auction price.</li>
      <li>Also, the votes of a meme persists when it is sold.</li>
      <li>Some examples below:</li>
    </ul>
    <Table
      columns={[
        {
          title: 'Dank Votes',
          dataIndex: 'votes',
          className: 'align-center',
          key: 1,
        },
        {
          title: 'Auction Price',
          dataIndex: 'price',
          className: 'align-center',
          key: 2,
        },
      ]}
      dataSource={[
        {
          votes: '10',
          price: '10 * 0.001 = 0.015 ETH',
          key: 1,
        },
        {
          votes: '250',
          price: '250 * 0.001 = 0.25 ETH',
          key: 2,
        },
      ]}
      bordered
      pagination={false}
    />
  </React.Fragment>
);

export default PricingDetails;
