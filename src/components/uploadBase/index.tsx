// import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, message, notification, Upload } from 'antd';
// import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
// import styles from './index.module.less';
// import { showConfirm } from '../Notification';

// export interface IUploaderBase {
//     text: string;
//     url: string;
// }

// export interface UploaderBaseRef {
//     fileListLength: number;
//     startUpload: () => void;
// }

// const UploaderBase = (
//     props: IUploaderBase,
//     ref: ForwardedRef<UploaderBaseRef>
// ) => {
//     const [fileList, setFileList] = useState<UploadFile[]>([]);
//     const [uploading, setUploading] = useState(false);

//     const [api, contextHolder] = notification.useNotification();

//     const openNotification = (msg: string, desc: string) => {
//         api['warning']({
//             message: msg,
//             description: desc,
//             duration: 0,
//         });
//     };

//     const handleUpload = () => {
//         const formData = new FormData();
//         fileList.forEach((file) => {
//             formData.append('file', file as RcFile);
//         });
//         setUploading(true);

//         fetch(props.url, {
//             method: 'POST',
//             body: formData,
//         })
//             .then((res) => res.json())
//             .then((res) => {
//                 setFileList([]);
//                 console.log("upload response: ", res);
//                 if (res.code === 201) {
//                     showConfirm(res.msg, res.data);
//                 }
//                 else {
//                     message.success('上传成功！');
//                 }
//             })
//             .catch(() => {
//                 message.error('上传失败.');
//             })
//             .finally(() => {
//                 setUploading(false);
//             });
//     };

//     const uploadProps: UploadProps = {
//         onRemove: (file) => {
//             const index = fileList.indexOf(file);
//             const newFileList = fileList.slice();
//             newFileList.splice(index, 1);
//             setFileList(newFileList);
//         },
//         beforeUpload: (file) => {
//             setFileList([...fileList, file]);

//             return false;
//         },
//         fileList,
//     };

//     useImperativeHandle(ref, () => ({
//         fileListLength: fileList.length,
//         startUpload: handleUpload
//     }))

//     return (
//         <div className={styles.upload_button}>
//             {contextHolder}
//             <Upload {...uploadProps}>
//                 <Button icon={<UploadOutlined />}>{props.text}</Button>
//             </Upload>
//         </div>
//     );
// };

// export default forwardRef<UploaderBaseRef, IUploaderBase>(UploaderBase);

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