import { Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

//封装后的确认框
export const showConfirm = (title: string, msg: string[]) => {
    confirm({
        title: title,
        icon: <ExclamationCircleFilled />,
        content: msg.map((item: string, index: number) => <div key={index}>{index}. {item}</div>),
        onOk() {

        },
        onCancel() {

        },
        style: { width: 500 }
    });
};
