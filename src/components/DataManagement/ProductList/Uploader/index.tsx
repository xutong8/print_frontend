import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Button, Modal, message } from 'antd';
import UploaderBase from '@/components/uploadBase';
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
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useImperativeHandle(ref, () => ({
        showModal
    }))

    return (
        <Modal title="数据上传" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确定" cancelText="取消">
            <div>
                <UploaderBase text={"上传产品文件"} url={BASE_URL + 'product/upload'}></UploaderBase>
                <UploaderBase text={"上传产品-原料关联文件"} url={BASE_URL + 'product/uploadRelPR'}></UploaderBase>
                <UploaderBase text={"上传产品-滤饼关联文件"} url={BASE_URL + 'product/uploadRelPF'}></UploaderBase>
            </div>

        </Modal>
    );
};

export default forwardRef<UploaderRef, IUploader>(Uploader);