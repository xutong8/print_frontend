import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Button, Modal, message } from 'antd';
import UploaderBase, { UploaderBaseRef } from '@/components/uploadBase';
import { BASE_URL } from '@/services';

export interface IUploader {

}

export interface UploaderRef {
    showModal: () => void;
}

//这里不能是react.FC<IUploader>
const Uploader = (
    props: IUploader,
    ref: ForwardedRef<UploaderRef>
) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {

        if (loader_1.current) {
            if (loader_1.current.fileListLength === 0)
                message.error("没有可上传的文件！");
            else {
                loader_1.current.startUpload();
                setIsModalOpen(false);
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useImperativeHandle(ref, () => ({
        showModal
    }))

    const loader_1 = useRef<UploaderBaseRef>(null);

    return (
        <Modal title="数据上传" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div>
                <UploaderBase ref={loader_1} text={"上传产品系列文件"} url={BASE_URL + 'productSeries/upload'}></UploaderBase>
            </div>

        </Modal>
    );
};

export default forwardRef<UploaderRef, IUploader>(Uploader);