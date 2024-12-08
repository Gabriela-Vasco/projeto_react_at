import { Typography, AppBar } from "../components";
import { useAppContext } from "../Context";

const Dashboard = () => {
    const { translate } = useAppContext();

    return (
        <>
            <AppBar title={translate('dashboard')} />
            <Typography variant="h4">{translate('dashboard')}</Typography>
        </>
    );
};

export default Dashboard