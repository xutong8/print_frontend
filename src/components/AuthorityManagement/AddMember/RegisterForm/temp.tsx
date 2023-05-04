import React, { useEffect, useState } from 'react';
import { Select, Space } from 'antd';

const userTypeData = ['拥有者', '管理员', '成员'];

const authorityData = {
    拥有者: ['只读', '读写', '可编辑权限'],
    管理员: ['只读', '读写', '可编辑权限'],
    成员: ['只读', '读写']
};

type UserType = keyof typeof authorityData;

const CoSelect: React.FC = () => {
    const [authorities, setAuthorities] = useState(authorityData[userTypeData[0] as UserType]);
    const [secondAuthority, setSecondeAuthority] = useState(authorityData[userTypeData[0] as UserType][0]);

    const handleUserTypeChange = (value: UserType) => {
        setAuthorities(authorityData[value]);
        setSecondeAuthority(authorityData[value][0]);
    };

    const onsecondAuthorityChange = (value: UserType) => {
        setSecondeAuthority(value);
    };

    const typeName: string = '成员';
    const authority: string = '读写';

    useEffect(() => {
        setAuthorities(authorityData[typeName as UserType]);
        setSecondeAuthority(authority);
    }, [typeName])

    return (
        <Space wrap>
            <Select
                defaultValue={typeName as "拥有者" | "管理员" | "成员" | null | undefined}
                style={{ width: 120 }}
                onChange={handleUserTypeChange}
                options={userTypeData.map((province) => ({ label: province, value: province }))}
            />
            <Select
                style={{ width: 120 }}
                value={secondAuthority as "拥有者" | "管理员" | "成员" | null | undefined}
                onChange={onsecondAuthorityChange}
                options={authorities.map((city) => ({ label: city, value: city }))}
            />
        </Space>
    );
};

export default CoSelect;