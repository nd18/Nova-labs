import React from 'react';
import {Layout, Table} from 'antd';
import moment  from 'moment';
import {useSelector} from 'react-redux';

import './style.css';

const columns = [
  {
    title: 'User',
    dataIndex: 'user_id',
    key: 'user_id'
  },
  {
    title: 'Slot Date',
    dataIndex: 'slot_date',
    key: 'slot_date',
    render: date => (<span>{moment(date).format('L')}</span>)
  },
  {
    title: 'Start Time',
    dataIndex: 'start_time',
    key: 'start_time',
    render: date => (<span>{moment(date).format('LT')}</span>)
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    key: 'end_time',
    render: date => (<span>{moment(date).format('LT')}</span>)
  }
];

export default function AvailableSlotList () {
  const availableSlotList = useSelector(state => state.availableSlots.list);
  return (
    <>
      {
        <Table columns={columns} dataSource={availableSlotList} rowKey={'_id'}/>
      }
    </>
  );
}
