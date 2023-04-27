import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { httpRequest } from '@/services';
import { ADDUSER } from '@/store/const';
import { useNavigate } from 'react-router-dom';
import styles from "./index.module.less";

import { useState } from 'react';
import { Drawer } from 'antd';
import { AxiosResponse } from 'axios';
interface IUserLogin {
  userName: string;
  password: string;
};

interface IUserRes {
  status: number;
  userName: string;
  authority: number;
}

//只需要在这个函数中写提交用户登录信息，并设置用户信息
const Temp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const userLogin: IUserLogin = { userName: values.username, password: values.password };
    const res = (await httpRequest.post("/User/login", userLogin)) as AxiosResponse<IUserRes>;
    if (res.data.status === -1) {
      message.error("用户不存在或密码错误");
      navigate("/login");
      return;
    }

    dispatch({
      type: ADDUSER,
      user: { userName: res.data.userName, authority: res.data.authority },
    })
    navigate("/data/product-list");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles.loginform}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}


const LoginForm: React.FC = () => {
  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer title="登录" placement="right" onClose={onClose} open={open} width={720}>
        <Temp></Temp>
      </Drawer>
    </>
  );
};


export default LoginForm;