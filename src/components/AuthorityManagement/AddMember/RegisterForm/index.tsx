import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import { IMemberEditProps } from '../../EditMember';
import { ForwardedRef, RefObject, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { stat } from 'fs';
import React from 'react';
import { IMemberInfo } from '@/services/fetchAllMember';

const { Option } = Select;

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

const checkShowPassword = (state: Boolean) => {
    if (state) {
        return (
            <><Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再次确认密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入密码不相同!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item></>
        )
    }
    return <></>
}

export interface RegisterFormRef {
    setShowPasswordItem: (state: boolean) => void;
    setForceUpdate: React.Dispatch<React.SetStateAction<{}>>;
}

interface IRegisterForm {
    userInfo: IMemberInfo;
}

const RegisterForm = (
    props: IRegisterForm,
    ref: ForwardedRef<RegisterFormRef>
) => {
    const [form] = Form.useForm();
    const [showPasswordItem, setShowPasswordItem] = useState<Boolean>(false);
    const [forceUpdata, setForceUpdate] = useState<{}>({});

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    useImperativeHandle(ref, () => ({
        setShowPasswordItem,
        setForceUpdate
    }))

    console.log("RegisterForm", props.userInfo);
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{ maxWidth: 600, marginTop: "50px", marginLeft: "20px" }}
            scrollToFirstError
        >
            <Form.Item
                name="userName"
                label="名称"
                // tooltip="What do you want others to call you?"
                rules={[{ required: true, message: '请输入成员名称!', whitespace: true }]}
            >
                <Input
                    value={props.userInfo.userName}
                />
            </Form.Item>

            <Form.Item
                name="userType"
                label="成员类型"
                rules={[{ required: true, message: '请选择成员类型!' }]}
            >
                <Select placeholder="选择成员类型" value={`${props.userInfo.userType}`}>
                    <Option value="owner">拥有者</Option>
                    <Option value="administrator">管理员</Option>
                    <Option value="2">成员</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="authority"
                label="权限"
                rules={[{ required: true, message: '请选择成员权限!' }]}
            >
                <Select placeholder="选择成员权限" value={`${props.userInfo.authority}`}>
                    <Option value="1">只读</Option>
                    <Option value="3">读写</Option>
                    <Option value="7">拥有者权限</Option>
                </Select>
            </Form.Item>

            {checkShowPassword(showPasswordItem)}

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" onClick={() => showPasswordItem ? setShowPasswordItem(false) : setShowPasswordItem(true)}>
                    密码选项
                </Button>
            </Form.Item>
        </Form>
    );
};


export default forwardRef<RegisterFormRef, IRegisterForm>(RegisterForm);