import { useRef, useState } from "react";
import styles from "./index.module.less"
import MemberTable from './MemberTable';
import getColumns from "./MemberTable/columns";
import { MemberEditRef } from "../EditMember";

const MemberList = () => {
    const [forceUpdate, setForceUpdate] = useState<{}>({});
    const editModalRef = useRef<MemberEditRef>(null);
    return (
        <div className={styles.member_list}>
            <MemberTable columns={getColumns(setForceUpdate, editModalRef)} forceUpdate={forceUpdate}></MemberTable>
        </div >
    );
};

export default MemberList;