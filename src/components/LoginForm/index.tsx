import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { ADDUSER } from '@/store/const';
import { useNavigate } from 'react-router-dom';
import styles from "./index.module.less";

import { useState } from 'react';
import { Drawer } from 'antd';
import { IUserLogin, login } from '@/services/login';


//只需要在这个函数中写提交用户登录信息，并设置用户信息
const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //处理登录逻辑
  const onFinish = async (values: any) => {
    const userLogin: IUserLogin = { userName: values.username, password: values.password };
    try {
      const res = await login(userLogin);
      dispatch({
        type: ADDUSER,
        user: { userName: res.data.data.userName, authority: res.data.data.authority },
      })
      message.success("登录成功！");
      console.log("login: ", res.data);
      navigate("/data/product-list");
    }
    catch (err) {
      if (typeof err === 'string')
        message.error(err as string);
      navigate("/login");
    }
  };

  //处理登录失败逻辑
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  //处理注册逻辑
  const handleRegister = () => {
    navigate("/register");
  }

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
        label="用户"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <a onClick={handleRegister}>没有账号？立即注册！</a>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登 录
        </Button>
      </Form.Item>
    </Form>
  )
}


const Login: React.FC = () => {
  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer title="登录" placement="right" onClose={onClose} open={open} width={720}>
        <LoginForm></LoginForm>
      </Drawer>
    </>
  );
};


export default Login;