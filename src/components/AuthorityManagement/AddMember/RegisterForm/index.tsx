import { IMemberInfo } from '@/services/fetchAllMember';
import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import { IMemberEditProps } from '../../EditMember';

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


const RegisterForm: React.FC<IMemberEditProps> = (props: IMemberEditProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

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
                initialValue={props.userInfo.userName}
            >
                <Input />
            </Form.Item>

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
            >
                <Input.Password value={props.userInfo.password} />
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
                <Input.Password value={props.userInfo.password} />
            </Form.Item>


            <Form.Item
                name="userType"
                label="成员类型"
                rules={[{ required: true, message: '请选择成员类型!' }]}
            >
                <Select placeholder="选择成员类型" defaultValue={`${props.userInfo.userType}`}>
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
                <Select placeholder="选择成员权限" defaultValue={`${props.userInfo.authority}`}>
                    <Option value="1">只读</Option>
                    <Option value="3">读写</Option>
                    <Option value="7">拥有者权限</Option>
                </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    确 认
                </Button>
            </Form.Item>
        </Form>
    );
};


export default RegisterForm;