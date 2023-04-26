import AddMember from "@/components/AuthorityManagement/AddMember";
import MemberList from "@/components/AuthorityManagement/MemberList";

const authorityManagement = [
    {
        title: "成员列表",
        path: "member-list",
        element: <MemberList></MemberList>,
        authority: 2,
    },
    {
        title: "新增成员",
        path: "add-member",
        element: <AddMember></AddMember>,
        authority: 0,
    }
];

export default authorityManagement;