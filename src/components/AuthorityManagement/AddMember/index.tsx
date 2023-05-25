import ProductSales from "@/components/Echarts/LineRace";
import RegisterForm from "./EditForm";
import styles from "./index.module.less"
import Temp from "./EditForm/temp";
import HistoryBasePrice from "@/components/Echarts/BasicLineChart";
import WithModal from "@/components/WithModal";

const AddMember = () => {
    console.log("addMember")
    return (
        <div className={styles.add_member}>
            {/* <RegisterForm></RegisterForm> */}
            {/* <ProductSales></ProductSales> */}
            {/* <Temp></Temp> */}
            {/* <HistoryBasePrice
                datax={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                dataSeries={[150, 230, 224, 218, 135, 147, 260]}
            ></HistoryBasePrice> */}
            {/* {withModal([<div>hello</div>, <div>hello</div>, <div>hello</div>])} */}
            <WithModal componentList={[<div>world</div>, <div>world</div>, <div>world</div>]}></WithModal>
        </div >
    )
}

export default AddMember;