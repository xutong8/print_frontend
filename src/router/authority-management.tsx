import MemberList from "@/components/AuthorityManagement/MemberList";
import { OWNER } from "@/constants/data-management";

const authorityManagement = [
    {
        title: "成员列表",
        path: "member-list",
        element: <MemberList></MemberList>,
        authority: OWNER,
    },
];

export default authorityManagement;