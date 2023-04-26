import { useState } from "react";
import styles from "./index.module.less"
import MemberTable from './MemberTable';
import getColumns from "./MemberTable/columns";

const MemberList = () => {
    const [forceUpdate, setForceUpdate] = useState<{}>({});
    return (
        <div className={styles.member_list}>
            <MemberTable columns={getColumns(setForceUpdate)} forceUpdate={forceUpdate}></MemberTable>
        </div >
    );
};

export default MemberList;