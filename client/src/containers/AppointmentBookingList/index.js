import React, {useEffect, useState} from 'react'
import {Table, Space} from 'antd';
import moment  from 'moment';
import {useDispatch, useSelector} from 'react-redux';

import {getAppointmentList, updateAppointmentStatus} from '../../redux/actions/appointments';
import './style.css';

export default function AppointmentBookingList () {
  const dispatch = useDispatch();
  const [filteredList, setFilteredList] = useState();
  const userDetail = useSelector(state => state.user.userDetail);
  const appointmentList = useSelector(state => state.appointment.list);

  useEffect(() => {
    dispatch(getAppointmentList({status: 'awaiting'}));
  }, []);

  const handleStatusUpdate = (bookingId, status) => {
    const payload = {
      status,
      approvedBy: userDetail.username
    }
    dispatch(updateAppointmentStatus(bookingId, payload))
  }

  const columns = [
    {
      title: 'User',
      dataIndex: 'user_id',
      key: 'user_id'
    },
    {
      title: 'Slot Date',
      dataIndex: 'appointment_date',
      key: 'appointment_date',
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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        record.status === 'awaiting' &&
        <Space size="middle">
          <a onClick={() => handleStatusUpdate(record._id, 'accepted')}>Accept</a>
          <a onClick={() => handleStatusUpdate(record._id, 'rejected')}>Reject</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      {
        <Table columns={columns} dataSource={appointmentList} rowKey={'_id'}/>
      }
    </>
  );
}
