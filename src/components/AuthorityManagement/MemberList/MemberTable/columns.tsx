import { deleteUserByName } from "@/services/deleteUserByName";
import { IMemberInfo } from "@/services/fetchAllMember";
import { Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";
import styles from "./index.module.less"
import { Dispatch, RefObject, SetStateAction } from "react";
import EditMember, { MemberEditRef } from "../../EditMember";

const getColumns = (
    setForceUpdate: Dispatch<SetStateAction<{}>>,
    editModalRef: RefObject<MemberEditRef>,
) => {
    const columns: ColumnsType<IMemberInfo> = [
        {
            title: '名称',
            dataIndex: 'userName',
            key: 'userName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '用户类型',
            dataIndex: 'userType',
            key: 'userType',
        },
        {
            title: '权限',
            dataIndex: 'authority',
            key: 'authority',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: IMemberInfo) => {

                // 处理删除逻辑
                const handleDelUser = async () => {
                    try {
                        await deleteUserByName(record.userName);
                        message.open({
                            type: "success",
                            content: "删除成功!",
                        });
                        setForceUpdate({});
                    } catch (err) {
                        message.open({
                            type: "error",
                            content: "删除失败!",
                        });
                    }
                };

                const handleEditMember = () => {
                    console.log("record:", record);
                    editModalRef.current?.setShowModal(true);
                    editModalRef.current?.setUserInfo({ ...record });
                    editModalRef.current?.registerFormRef.current?.setShowPasswordItem(false);
                }
                return (
                    <div className={styles.action}>
                        <Popconfirm
                            title="删除成员"
                            description="是否要删除该成员?"
                            okText="是"
                            cancelText="否"
                            onConfirm={handleDelUser}
                        >
                            <div className={styles.text}>删除</div>
                        </Popconfirm>
                        <div className={styles.text} onClick={handleEditMember}>
                            编辑
                        </div>
                        <EditMember ref={editModalRef}></EditMember>
                        {/* <div className={styles.text} onClick={handlePreviewProduct}>
                            查看详细信息
                        </div>
                        <ProductEdit ref={editModalRef} />
                        <ProductDetail ref={previewModalRef} /> */}
                    </div>
                );
            },
        },
    ];
    return columns;
}

export default getColumns;
