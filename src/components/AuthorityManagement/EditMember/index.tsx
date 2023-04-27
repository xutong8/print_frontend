import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';
import RegisterForm from '../AddMember/RegisterForm';
import { IMemberInfo } from '@/services/fetchAllMember';

export interface IMemberEditProps {
    userInfo: IMemberInfo;
};

export interface MemberEditRef {
    setShowModal: (showModal: boolean) => void;
}

const EditMember = (
    props: IMemberEditProps,
    ref: ForwardedRef<MemberEditRef>
) => {
    const [showModal, setShowModal] = useState(false);

    const handleOk = () => {
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    useImperativeHandle(ref, () => ({
        setShowModal
    }))

    return (
        <>
            <Modal title="成员信息编辑" open={showModal} onOk={handleOk} onCancel={handleCancel} width={720}>
                <RegisterForm userInfo={props.userInfo}></RegisterForm>
            </Modal>
        </>
    );
};

export default forwardRef<MemberEditRef, IMemberEditProps>(EditMember);