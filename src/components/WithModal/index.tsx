import React, { ForwardedRef, ReactNode, forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './index.module.less'

export interface IWithModalProps {
    componentList: ReactNode[];
}

export interface WithModalRef {
    showModal: () => void;
}

const WithModal = (
    props: IWithModalProps,
    ref: ForwardedRef<WithModalRef>
) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { componentList } = props;

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
        <Modal title="数据下载" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            {componentList.map(comp => comp)}
        </Modal>
    );
};

export default forwardRef<WithModalRef, IWithModalProps>(WithModal);