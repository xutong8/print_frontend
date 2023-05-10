import ProductSales from "@/components/Echarts";
import RegisterForm from "./RegisterForm";
import styles from "./index.module.less"
import Temp from "./RegisterForm/temp";
import HistoryBasePrice from "@/components/Echarts/HistoryBasePrice";

const AddMember = () => {
    console.log("addMember")
    return (
        <div className={styles.add_member}>
            {/* <RegisterForm></RegisterForm> */}
            {/* <ProductSales></ProductSales> */}
            {/* <Temp></Temp> */}
            <HistoryBasePrice
                datax={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                dataSeries={[150, 230, 224, 218, 135, 147, 260]}
            ></HistoryBasePrice>
        </div>
    )
}

export default AddMember;