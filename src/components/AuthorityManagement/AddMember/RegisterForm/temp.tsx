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

import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

interface IUpload {
    text: string;
    url: string;
}

const Temp: React.FC<IUpload> = (props) => {
    const uploadProps: UploadProps = {
        name: 'file',
        action: props.url,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>{props.text}</Button>
        </Upload>
    );
}

export default Temp;