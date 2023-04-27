import AddMember from "@/components/AuthorityManagement/AddMember";
import MemberList from "@/components/AuthorityManagement/MemberList";
import { OWNER } from "@/constants/data-management";

const authorityManagement = [
    {
        title: "成员列表",
        path: "member-list",
        element: <MemberList></MemberList>,
        authority: OWNER,
    },
    {
        title: "新增成员",
        path: "add-member",
        element: <AddMember></AddMember>,
        authority: OWNER,
    }
];

export default authorityManagement;