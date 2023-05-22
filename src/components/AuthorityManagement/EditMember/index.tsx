import { Dispatch, ForwardedRef, SetStateAction, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Modal } from 'antd';
import RegisterForm, { RegisterFormRef } from '../AddMember/RegisterForm';
import { IMemberInfo } from '@/services/fetchAllMember';

export interface IMemberEditProps {
    setForceUpdate: Dispatch<SetStateAction<{}>>
};

export interface MemberEditRef {
    setShowModal: (showModal: boolean) => void;
    setUserInfo: React.Dispatch<React.SetStateAction<IMemberInfoType>>;
    registerFormRef: React.RefObject<RegisterFormRef>;
}

export type IMemberInfoType = IMemberInfo | null;

const EditMember = (
    props: IMemberEditProps,
    ref: ForwardedRef<MemberEditRef>
) => {
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useState<IMemberInfoType>(null)
    const handleOk = () => {
        // registerFormRef.current?.onFinish()
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    useImperativeHandle(ref, () => ({
        setShowModal,
        setUserInfo,
        registerFormRef
    }))

    const registerFormRef = useRef<RegisterFormRef>(null)

    return (
        <>
            <Modal title="成员信息编辑" open={showModal} onOk={handleOk} onCancel={handleCancel} width={720} footer={null}>
                <RegisterForm userInfo={userInfo} setForceUpdate={props.setForceUpdate} onOk={handleOk} ref={registerFormRef}></RegisterForm>
            </Modal>
        </>
    );
};

export default forwardRef<MemberEditRef, IMemberEditProps>(EditMember);