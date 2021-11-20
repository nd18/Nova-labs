import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col, Card } from 'antd';

import userAction from '../../redux/actions/userAction';

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

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState();

  const onFinish = (formValues) => {
    setError();
    if (formValues.username === 'user' && formValues.password === 'user') {
      dispatch(userAction.setLoggedInUser({
        username: formValues.username
      }));
      history.push('/');
    } else if (formValues.username === 'admin' && formValues.password === 'admin') {
      dispatch(userAction.setLoggedInUser({
        username: formValues.username
      }));
      history.push('/');
    } else {
      setError('Invalid username or password');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
      <Col>
        <div className="login-header-wrapper">
          <span className="login-page-header">Appointment Booking</span>
        </div>
        <Card>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {error && <span>{error}</span>}

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
