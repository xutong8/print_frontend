import styles from "./index.module.less"
import WithModal from "@/components/WithModal";

const AddMember = () => {
    return (
        <div className={styles.add_member}>
            <WithModal componentList={[<div>world</div>, <div>world</div>, <div>world</div>]}></WithModal>
        </div >
    )
}

export default AddMember;