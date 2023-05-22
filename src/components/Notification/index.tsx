import { Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

export const showConfirm = (title: string, msg: string[]) => {
    confirm({
        title: title,
        icon: <ExclamationCircleFilled />,
        content: msg.map((item: string, index: number) => <div key={index}>{index}. {item}</div>),
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
        style: { width: 500 }
    });
};
