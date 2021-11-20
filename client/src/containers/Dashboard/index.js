import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {Row, Col} from 'antd';

import AvailableSlot from '../AvailableSlot';
import AvailableSlotList from '../AvailableSlotList';
import AppointmentBookingList from '../AppointmentBookingList';
import {getAvailableSlotList} from '../../redux/actions/availableSlotAction';
import AppointmentBooking from '../AppointmentBooking';
import userAction from '../../redux/actions/userAction';
import './style.css';

const { Header, Sider, Content } = Layout;

export default function Dashboard () {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetail = useSelector(state => state.user.userDetail);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logOut = () => {
    dispatch(userAction.unSetLoggedInUser());
    history.push('/login');
  }

  useEffect(() => {
    dispatch(getAvailableSlotList());
  }, []);

  return (
    <Layout style={{height: '100%'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"/>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="3" icon={<UploadOutlined />} onClick={logOut}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <span style={{padding: '5px', fontSize: 'large', fontWeight: 'bold'}}>{userDetail.username}</span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {
            userDetail.username === 'admin' &&
            <Row>
              <Col span={10}>
                <AvailableSlot />
              </Col>
              <Col span={14}>
                <AppointmentBookingList />
              </Col>
            </Row>
          }
          {
            userDetail.username === 'user' &&
            <Row>
              <Col span={10}>
                <AppointmentBooking />
              </Col>
              <Col span={14}>
                <AvailableSlotList />
              </Col>
            </Row>
          }
        </Content>
      </Layout>
    </Layout>
  );
}
