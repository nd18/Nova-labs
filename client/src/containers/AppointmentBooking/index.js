import React, {useState} from 'react';
import moment from 'moment';
import _ from 'lodash';
import {Form, Button, Row, Col, Card, DatePicker, Radio, Space, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';

import {createAppointment} from '../../redux/actions/appointments'
import {generateSlot} from '../../utils/generateTimeSlot';

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

export default function AppointmentBooking() {
  const dispatch = useDispatch();
  const [slots, setSlots] = useState();
  const [disableBtn, setDisableBtn] = useState();
  const userDetail = useSelector(state => state.user.userDetail);
  const availableSlotList = useSelector(state => state.availableSlots.list);

  const onFinish = (formValues) => {
    const times = formValues.time.split(' - ');
    const payload = {
      user_id: userDetail.username,
      appointment_date: formValues.appointment_date,
      start_time: moment(`${moment(formValues.appointment_date).format('L')} ${times[0]}`),
      end_time: moment(`${moment(formValues.appointment_date).format('L')} ${times[1]}`),
      email: formValues.email
    }
    dispatch(createAppointment(payload));
  };

  const handleBookingDateChange = (date) => {
    if (date) {
      const selectedSlot = _.find(availableSlotList, (slot) =>
        moment(slot.slot_date).format('L') === moment(date).format('L'));
      if (selectedSlot) {
        const slots = generateSlot(selectedSlot);
        const radioSlots = [];
        for (let i = 0; i < slots.length - 1; i++) {
          const range = `${moment(slots[i]).format('LT')} - ${moment(slots[i + 1]).format('LT')}`
          radioSlots.push(<Radio value={range} key={i}>{range}</Radio>)
        }
        setSlots(radioSlots);
        setDisableBtn(false);
      } else {
        setSlots(<span style={{fontSize: 'large'}}>No Slots available for this day</span>);
        setDisableBtn(true);
      }
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const disabledDate = (current) => (current && current < moment().endOf('day'));

  return (
    <Row type="flex">
      <Col span={24}>
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
              name="appointment_date"
              rules={[
                {
                  required: true,
                  message: 'Please select date!',
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} onChange={handleBookingDateChange}/>
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
              <Radio.Group>
                <Space direction="vertical">
                  {slots}
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please add email!',
                },
              ]}
            >
              <Input placeholder="Enter email"/>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" disabled={disableBtn}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
