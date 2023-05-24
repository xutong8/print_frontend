import { registerNewUser } from '@/services/RegisterNewUser';
import { Drawer, message } from 'antd';
import {
    Button,
    Form,
    Input,
} from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export interface IRegisterInfo {
    userName: string;
    password: string;
}

const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // 处理注册逻辑
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        const registerInfo: IRegisterInfo = {
            userName: values.userName,
            password: values.password
        }
        console.log("registerInfo: ", registerInfo);
        try {
            registerNewUser(registerInfo);
            message.info("注册成功！请登录");
        } catch (err) {
            message.error("注册失败！");
        }
        navigate("/login");
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            {/* 用户名 */}
            <Form.Item
                name="userName"
                label="用户名"
                rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
            >
                <Input />
            </Form.Item>

            {/* 密码 */}
            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            {/* 确认密码 */}
            <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            {/* 点击确认 */}
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    注 册
                </Button>
            </Form.Item>
        </Form>
    );
};

const Register: React.FC = () => {
    const [open, setOpen] = useState(true);

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer title="注册" placement="right" onClose={onClose} open={open} width={720}>
                <RegisterForm></RegisterForm>
            </Drawer>
        </>
    );
};

export default Register;