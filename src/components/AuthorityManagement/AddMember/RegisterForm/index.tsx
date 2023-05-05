import {
    Button,
    Form,
    Input,
    Select,
    message,
} from 'antd';
import { IMemberEditProps, IMemberInfoType } from '../../EditMember';
import { Dispatch, ForwardedRef, RefObject, SetStateAction, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import React from 'react';
import store from '@/store';
import { updateMemberInfo } from '@/services/updateMemberInfo';
import styles from './index.module.less'
import { updatePassword } from '@/services/updatePassword';

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

const checkShowPassword = (state: Boolean, setPassword: React.Dispatch<React.SetStateAction<string>>) => {
    if (state) {
        return (
            <Form
                {...formItemLayout}
                name="register"
                initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                    ]}
                    hasFeedback
                    style={{ marginLeft: -170 }}
                >
                    <Input.Password style={{ width: 400 }} />
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
                                    setPassword(value);
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入密码不相同!'));
                            },
                        }),
                    ]}
                    style={{ marginLeft: -170 }}
                >
                    <Input.Password style={{ width: 400 }} />
                </Form.Item>
            </Form >
        )
    }
    return <></>
}

export interface ISubmitInfo {
    applicant: string | undefined;
    userModified: string | undefined;
    userAuthority: number | undefined | UserType;
    userType: string | undefined;
}

export interface IUpdatePassword {
    applicant: string | undefined;
    userModified: string | undefined;
    password: string | undefined;
}

const handleSubmit = async (userInfo: ISubmitInfo) => {
    console.log("ISubmitInfo: ", userInfo);
    try {
        await updateMemberInfo(userInfo);
        message.info("修改成功！");
    } catch (err) {
        message.error("修改失败！");
    }
}

export interface RegisterFormRef {
    setShowPasswordItem: (state: boolean) => void;
    setForceUpdate: React.Dispatch<React.SetStateAction<{}>>;
    onFinish: (values: any) => void;
}

interface IRegisterForm {
    userInfo: IMemberInfoType;
    setForceUpdate: Dispatch<SetStateAction<{}>>;
    onOk: () => void;
}

// ----------------------------------------------------------------------------
const userTypeData = ['拥有者', '管理员', '成员'];

const authorityData = {
    拥有者: ['只读', '读写', '可编辑权限'],
    管理员: ['只读', '读写', '可编辑权限'],
    成员: ['只读', '读写']
};

const authorityMapping = {
    1: '只读',
    3: '读写',
    7: '可编辑权限'
}

const authorityReverseMapping = {
    只读: 1,
    读写: 3,
    可编辑权限: 7
}

const userTypeMapping = {
    owner: '拥有者',
    administrator: '管理员',
    user: '成员'
}

const userTypeReverseMapping = {
    拥有者: 'owner',
    管理员: 'administrator',
    成员: 'user'
}

type UserType = keyof typeof authorityData;
type AuthMapType = keyof typeof authorityMapping;
type UserTypeMapType = keyof typeof userTypeMapping;
type AuthRevMapType = keyof typeof authorityReverseMapping;
type UserTypeRevMapType = keyof typeof userTypeReverseMapping;
// ------------------------------------------------------------------------------

const RegisterForm = (
    props: IRegisterForm,
    ref: ForwardedRef<RegisterFormRef>
) => {
    const [showPasswordItem, setShowPasswordItem] = useState<Boolean>(false);
    const [forceUpdata, setForceUpdate] = useState<{}>({});

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);

    };

    useImperativeHandle(ref, () => ({
        setShowPasswordItem,
        setForceUpdate,
        onFinish,
    }))

    // -------------------------------------------------------------
    const [authorities, setAuthorities] = useState(authorityData[userTypeData[0] as UserType]);
    const [secondAuthority, setSecondeAuthority] = useState(authorityData[userTypeData[0] as UserType][0]);
    const [userType, setUserType] = useState<string>('成员');
    const [submitInfo, setSubmitInfo] = useState<ISubmitInfo>({
        applicant: store.getState().userName,
        userModified: props.userInfo?.userName,
        userAuthority: props.userInfo?.authority,
        userType: props.userInfo?.userType
    });
    const [password, setPassword] = useState<string>('');

    const handleUserTypeChange = (value: UserType) => {
        setAuthorities(authorityData[value]);
        setSecondeAuthority(authorityData[value][0]);
        setUserType(value);
        setSubmitInfo({
            ...submitInfo,
            userType: userTypeReverseMapping[value],
            userAuthority: authorityReverseMapping[authorityData[value][0] as AuthRevMapType]
        });
    };

    const onsecondAuthorityChange = (value: UserType) => {
        setSecondeAuthority(value);
        setSubmitInfo({ ...submitInfo, userAuthority: authorityReverseMapping[value as AuthRevMapType] });
    };

    useEffect(() => {
        setAuthorities(authorityData[userType as UserType]);
        setSecondeAuthority(authorityMapping[props.userInfo?.authority as AuthMapType]);
        setSubmitInfo({
            applicant: store.getState().userName,
            userModified: props.userInfo?.userName,
            userAuthority: props.userInfo?.authority,
            userType: props.userInfo?.userType
        })
        if (props.userInfo)
            setUserType(userTypeMapping[props.userInfo?.userType as UserTypeMapType]);
    }, [props])
    // --------------------------------------------------------------

    return (
        <div className={styles.register_form}>
            <div className={styles.item}>
                <span>名称：</span>
                <Input value={props.userInfo?.userName} style={{ width: 400, marginRight: 115 }} />
            </div>

            <div className={styles.item}>
                <span>类型：</span>
                <Select
                    value={userType as "拥有者" | "管理员" | "成员" | null | undefined}
                    style={{ width: 400, marginRight: 115 }}
                    onChange={handleUserTypeChange}
                    options={userTypeData.map((province) => ({ label: province, value: province }))}
                />
            </div>
            <div className={styles.item} style={{ marginBlock: 20 }}>
                <span>权限：</span>
                <Select
                    style={{ width: 400, marginRight: 115 }}
                    value={secondAuthority as "拥有者" | "管理员" | "成员" | null | undefined}
                    onChange={onsecondAuthorityChange}
                    options={authorities.map((city) => ({ label: city, value: city }))}
                />
            </div>
            {checkShowPassword(showPasswordItem, setPassword)}
            <a onClick={() => showPasswordItem ? setShowPasswordItem(false) : setShowPasswordItem(true)} style={{ marginLeft: 50, width: 90 }}>
                显示密码选项
            </a>
            <Button type="primary" style={{ display: 'block', width: 80, margin: '20px 0 0 50px' }} onClick={async () => {
                await handleSubmit(submitInfo);
                if (password)
                    updatePassword({
                        applicant: store.getState().userName,
                        userModified: props.userInfo?.userName,
                        password: password
                    })
                props.onOk();
                props.setForceUpdate({});
            }}>
                提 交
            </Button>
        </div >
    );
};


export default forwardRef<RegisterFormRef, IRegisterForm>(RegisterForm);
