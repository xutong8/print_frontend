import { ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Modal } from 'antd';
import RegisterForm, { RegisterFormRef } from '../AddMember/RegisterForm';
import { IMemberInfo } from '@/services/fetchAllMember';

export interface IMemberEditProps { };

export interface MemberEditRef {
    setShowModal: (showModal: boolean) => void;
    setUserInfo: React.Dispatch<React.SetStateAction<IMemberInfo>>;
    registerFormRef: React.RefObject<RegisterFormRef>;
}

const EditMember = (
    props: IMemberEditProps,
    ref: ForwardedRef<MemberEditRef>
) => {
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useState<IMemberInfo>({
        userName: "",
        userType: "",
        password: "",
        authority: 0,
    })
    const handleOk = () => {
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

    console.log("EditMember:", userInfo);
    return (
        <>
            <Modal title="成员信息编辑" open={showModal} onOk={handleOk} onCancel={handleCancel} width={720}>
                <RegisterForm userInfo={userInfo} ref={registerFormRef}></RegisterForm>
            </Modal>
        </>
    );
};

export default forwardRef<MemberEditRef>(EditMember);