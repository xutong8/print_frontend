// import React from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import type { UploadProps } from 'antd';
// import { Button, message, Upload } from 'antd';

// interface IUpload {
//     text: string;
//     url: string;
// }

// const UploadBase: React.FC<IUpload> = (props) => {
//     const uploadProps: UploadProps = {
//         name: 'file',
//         action: props.url,
//         headers: {
//             authorization: 'authorization-text',
//         },
//         onChange(info) {
//             if (info.file.status !== 'uploading') {
//                 console.log(info.file, info.fileList);
//             }
//             if (info.file.status === 'done') {
//                 message.success(`${info.file.name} file uploaded successfully`);
//             } else if (info.file.status === 'error') {
//                 message.error(`${info.file.name} file upload failed.`);
//             }
//         },
//     };
//     return (
//         <Upload {...uploadProps} >
//             <Button icon={<UploadOutlined />} style={{ marginBottom: 10 }}>{props.text}</Button>
//         </Upload>
//     );
// }

// export default UploadBase;

import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

export interface IUploaderBase {
    text: string;
    url: string;
}

export interface UploaderBaseRef {
    fileListLength: number;
    startUpload: () => void;
}

const UploaderBase = (
    props: IUploaderBase,
    ref: ForwardedRef<UploaderBaseRef>
) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file as RcFile);
        });
        setUploading(true);

        fetch(props.url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const uploadProps: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };

    useImperativeHandle(ref, () => ({
        fileListLength: fileList.length,
        startUpload: handleUpload
    }))

    return (
        <>
            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>{props.text}</Button>
            </Upload>
        </>
    );
};

export default forwardRef<UploaderBaseRef, IUploaderBase>(UploaderBase);