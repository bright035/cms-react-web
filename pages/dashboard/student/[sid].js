import {useRouter} from 'next/router';

const studentDetails = () => {
    const router = useRouter();
    const {sid} = router.query;
    return (
        <>
            <p>Student: {sid}</p>
        </>
    );
};

export default studentDetails;