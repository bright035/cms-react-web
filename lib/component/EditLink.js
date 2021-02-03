import { Typography } from "antd";
const { Link } = Typography;
export const EditLink = (props) => {
    return (
        <Link onClick={props.click}>
            Edit
        </Link>
    )
}