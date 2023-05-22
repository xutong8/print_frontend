import AddMember from "@/components/AuthorityManagement/AddMember";
import CoSelect from "@/components/AuthorityManagement/AddMember/RegisterForm/temp";
import MemberList from "@/components/AuthorityManagement/MemberList";
import { OWNER } from "@/constants/data-management";

const authorityManagement = [
    {
        title: "成员列表",
        path: "member-list",
        element: <MemberList></MemberList>,
        Element: <div></div>,
        authority: OWNER,
    },
    // {
    //     title: "功能测试",
    //     path: "add-member",
    //     element: <AddMember></AddMember>,
    //     // element: <CoSelect></CoSelect>,
    //     authority: OWNER,
    // }
];

export default authorityManagement;