import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { showConfirm } from '../Notification';

interface IUploadBase {
    text: string;
    url: string;
}

const UploaderBase: React.FC<IUploadBase> = (props) => {
    const { text, url } = props;
    const uploadProps: UploadProps = {
        name: 'file',
        action: url,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                const res = info.file.response;
                if (res.code === 201)
                    showConfirm(res.msg, res.data);
                else if (res.code === 301)
                    message.error(res.msg + ", 上传失败！");
                else
                    message.success(`${info.file.name} 上传成功！`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败！`);
            }
        },
    };
    return (
        <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>{text}</Button>
        </Upload>
    )
};

export default UploaderBase;