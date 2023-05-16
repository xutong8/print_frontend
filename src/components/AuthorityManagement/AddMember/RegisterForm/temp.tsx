// import React, { useEffect, useState } from 'react';
// import { Select, Space } from 'antd';

// const userTypeData = ['拥有者', '管理员', '成员'];

// const authorityData = {
//     拥有者: ['只读', '读写', '可编辑权限'],
//     管理员: ['只读', '读写', '可编辑权限'],
//     成员: ['只读', '读写']
// };

// type UserType = keyof typeof authorityData;

// const CoSelect: React.FC = () => {
//     const [authorities, setAuthorities] = useState(authorityData[userTypeData[0] as UserType]);
//     const [secondAuthority, setSecondeAuthority] = useState(authorityData[userTypeData[0] as UserType][0]);

//     const handleUserTypeChange = (value: UserType) => {
//         setAuthorities(authorityData[value]);
//         setSecondeAuthority(authorityData[value][0]);
//     };

//     const onsecondAuthorityChange = (value: UserType) => {
//         setSecondeAuthority(value);
//     };

//     const typeName: string = '成员';
//     const authority: string = '读写';

//     useEffect(() => {
//         setAuthorities(authorityData[typeName as UserType]);
//         setSecondeAuthority(authority);
//     }, [typeName])

//     return (
//         <Space wrap>
//             <Select
//                 defaultValue={typeName as "拥有者" | "管理员" | "成员" | null | undefined}
//                 style={{ width: 120 }}
//                 onChange={handleUserTypeChange}
//                 options={userTypeData.map((province) => ({ label: province, value: province }))}
//             />
//             <Select
//                 style={{ width: 120 }}
//                 value={secondAuthority as "拥有者" | "管理员" | "成员" | null | undefined}
//                 onChange={onsecondAuthorityChange}
//                 options={authorities.map((city) => ({ label: city, value: city }))}
//             />
//         </Space>
//     );
// };

// export default CoSelect;

// import type { DatePickerProps } from 'antd';
// import { DatePicker, Space } from 'antd';
// import React from 'react';

// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//     console.log(date, dateString);
// };

// const Temp: React.FC = () => (
//     <Space direction="vertical">
//         <DatePicker onChange={onChange} />
//     </Space>
// );

// export default Temp;

// import React from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import type { UploadProps } from 'antd';
// import { Button, message, Upload } from 'antd';

// interface IUpload {
//     text: string;
//     url: string;
// }

// const Temp: React.FC<IUpload> = (props) => {
//     const uploadProps: UploadProps = {
//         name: 'file',
//         action: props.url,
//         headers: {
//             authorization: 'authorization-text',
//         },
//         onChange(info) {
//             if (info.file.status !== 'uploading') {
//                 console.log(info.file, info.fileList);
//             }
//             if (info.file.status === 'done') {
//                 message.success(`${info.file.name} file uploaded successfully`);
//             } else if (info.file.status === 'error') {
//                 message.error(`${info.file.name} file upload failed.`);
//             }
//         },
//     };
//     return (
//         <Upload {...uploadProps}>
//             <Button icon={<UploadOutlined />}>{props.text}</Button>
//         </Upload>
//     );
// }

// export default Temp;

// import React from 'react';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Menu } from 'antd';

// type MenuItem = Required<MenuProps>['items'][number];

// function getItem(
//     label: React.ReactNode,
//     key: React.Key,
//     icon?: React.ReactNode,
//     children?: MenuItem[],
//     type?: 'group',
// ): MenuItem {
//     return {
//         key,
//         icon,
//         children,
//         label,
//         type,
//     } as MenuItem;
// }

// const items: MenuProps['items'] = [
//     getItem('Navigation One', 'sub1', <MailOutlined />, [
//         getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
//         getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
//     ]),

//     getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//         getItem('Option 5', '5'),
//         getItem('Option 6', '6'),
//         getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
//     ]),

//     { type: 'divider' },

//     getItem('Navigation Three', 'sub4', <SettingOutlined />, [
//         getItem('Option 9', '9'),
//         getItem('Option 10', '10'),
//         getItem('Option 11', '11'),
//         getItem('Option 12', '12'),
//     ]),

//     getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
// ];

// const Temp: React.FC = () => {
//     const onClick: MenuProps['onClick'] = (e) => {
//         console.log('click ', e);
//     };

//     return (
//         <Menu
//             onClick={onClick}
//             style={{ width: 256 }}
//             defaultSelectedKeys={['1']}
//             defaultOpenKeys={['sub1']}
//             mode="inline"
//             items={items}
//         />
//     );
// };

// export default Temp;

import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Axios from 'axios';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const Temp: React.FC = () => {
    const [openKeys, setOpenKeys] = useState(['sub1']);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return (
        <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{ width: 300, fontSize: 20 }}
            items={items}
            onClick={onClick}
        />
    );
};

export default Temp;

