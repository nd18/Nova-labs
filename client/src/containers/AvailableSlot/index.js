import React, {useState} from 'react';
import moment from 'moment';
import { Form, Button, Row, Col, Card, DatePicker, TimePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux';

import {createAvailableSlot} from '../../redux/actions/availableSlotAction';

import './style.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function AvailableSlot() {
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.user.userDetail);

  const onFinish = (formValues) => {
    const payload = {
      user_id: userDetail.username,
      slot_date: moment(formValues.date).format('L'),
      start_time: moment(`${moment(formValues.date).format('L')} ${moment(formValues.time[0]).format('LT')}`),
      end_time: moment(`${moment(formValues.date).format('L')} ${moment(formValues.time[1]).format('LT')}`)
    }
    dispatch(createAvailableSlot(payload));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const disabledDate = (current) => (current && current <= moment().endOf('hour'));

  return (
    <Row type="flex" justify="center" style={{minHeight: '100vh'}}>
      <Col>
        <div className="slot-header-wrapper">
          <span className="login-page-header">Add Your Availability</span>
        </div>
        <Card>
          <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Date"
              name="date"
              rules={[
                {
                  required: true,
                  message: 'Please select date!',
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate}/>
            </Form.Item>

            <Form.Item
              label="Time"
              name="time"
              rules={[
                {
                  required: true,
                  message: 'Please select time!',
                },
              ]}
            >
              <TimePicker.RangePicker format={'HH:mm'}/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
