import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
export const AddButton = (props) => {
    return (
        <Button type="primary" icon={<PlusOutlined />} onClick={props.click}>
            Add
        </Button>
    )
}