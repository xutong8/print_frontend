import { IMemberInfo, fetchAllMember } from "@/services/fetchAllMember";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

export interface IMemberTableProps {
    columns: ColumnsType<IMemberInfo>;
    forceUpdate: {};
}

const MemberTable = (props: IMemberTableProps) => {
    const { columns, forceUpdate } = props;
    const [data, setData] = useState<IMemberInfo[]>([]);
    const fetchApiData = async () => {
        setData(await fetchAllMember());
    }
    useEffect(() => {
        fetchApiData();
    }, [data.length, forceUpdate]);
    return (
        <div className={styles.member_list}>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record: IMemberInfo) => record.userName}
            />
        </div>
    );
};

export default MemberTable;