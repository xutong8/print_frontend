import ProductSales from "@/components/Echarts";
import RegisterForm from "./RegisterForm";
import styles from "./index.module.less"

const AddMember = () => {
    return (
        <div className={styles.add_member}>
            {/* <RegisterForm></RegisterForm> */}
            <ProductSales></ProductSales>
        </div>
    )
}

export default AddMember;