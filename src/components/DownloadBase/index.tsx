import { downloadFile } from "@/services/downloadFile";
import { Button } from "antd"
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.module.less';

export interface IDownloadProps {
    text: string;
    url: string;
}

const DownloadBase = (
    props: IDownloadProps
) => {
    const { text, url } = props;
    const handleDownload = () => {
        downloadFile(url);
    }
    return (
        <Button
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            className={styles.download_base}
        >
            {text}
        </Button>
    )
}

export default DownloadBase;