import { useEffect, useState } from "react";
import { AppBar, Button, DatePicker, Grid, TextField, Typography } from "../components";
import { useAppContext } from "../Context";
import { adjustDateTimeForTimezone, getUser } from "../utils/core";
import { handleInputChange } from "../utils/action";
import { validateNumericFields } from "../utils/form";
import { get, save } from "../services/supabasedb";
import { signOut } from "../services/authentication";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const { translate, changeLanguage, supabase, showSnackbar } = useAppContext();
    const navigate = useNavigate();
    const user = getUser();
    const [data, setData] = useState({});

    const loadData = async () => {
        const result = await get("profile_student", [{field: "user_id", value: user.id }]);
        setData(result);
    }

    useEffect(() => {
        loadData();
    }, [])

    const verifyLanguage = (language) => {
        const storeLanguage = localStorage.getItem('language');
        if(storeLanguage === language) {
            return 'contained';
        }
        return 'outlined';
    }



    const handleSave = async () => {
        try {
            const invalidFields = validateNumericFields([data?.height, data?.weight]);
            if (invalidFields) {
                showSnackbar("Os campos altura e peso devem ser numéricos");
                return;
            }


            const localData = {...data, user_id: user.id};
            setData(localData);

            await save('profile_student', data);
            showSnackbar("Informações salvas com sucesso!");
            
        } catch(e) {
            showSnackbar("Erro ao salvar informações");
            console.error(e);
        }

    }

    return  <>
                <AppBar title={translate('settings')} />
                <Grid container spacing={2} sx={{...styles.boxAdjustment, ...styles.centerBox}}>
                    <Grid
                        sx={styles.marginTop}
                        size={{xs: 12}}>
                        <TextField
                            label={translate("name")}
                            placeholder={translate("name")}
                            fullWidth={true}
                            onChange={(event) => handleInputChange("name", event.target.value, data, setData)}
                            value={data?.name || ''}
                        />
                    </Grid>
                    <Grid
                        sx={styles.marginTop}
                        size={{xs: 12}}>
                        <TextField
                            label={translate("height")}
                            placeholder={translate("height")}
                            fullWidth={true}
                            onChange={(event) => handleInputChange("height", event.target.value, data, setData)}
                            value={data?.height || ''}
                        />
                    </Grid>
                    <Grid
                        sx={styles.marginTop}
                        size={{xs: 12}}>
                        <TextField
                            label={translate("weight")}
                            placeholder={translate("weight")}
                            fullWidth={true}
                            onChange={(event) => handleInputChange("weight", event.target.value, data, setData)}
                            value={data?.weight || ''}
                        />
                    </Grid>
                    <Grid
                        sx={styles.marginTop}
                        size={{xs: 12}}>
                        <DatePicker
                            label={translate("birth")}
                            value={data?.birth ? adjustDateTimeForTimezone(data?.birth) : null}
                            placeholder={translate("birth")}
                            name="birth"
                            fullWidth={true}
                            ampm={'false'}
                            format="DD/MM/YYYY"
                            onChange={(value) => {handleInputChange('birth', new Date(value.toString()), data, setData)}}
                        />
                    </Grid>
                    <Grid
                        size={{xs: 12}}>
                        <Button onClick={handleSave} fullWidth={true}>{translate('save')}</Button>
                    </Grid>
                    <Grid
                        sx={styles.marginTop}
                        size={{xs: 12}}>
                            <Typography variant="h5">{translate("app_language")}:</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button onClick={() => changeLanguage('en')}
                            variant={verifyLanguage('en')}
                            fullWidth={true}
                            sx={{...styles.button}}>{translate('english')}</Button>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button onClick={() => changeLanguage('es')}
                            variant={verifyLanguage('es')}
                            fullWidth={true}
                            sx={{...styles.button}}>{translate('spanish')}</Button>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button onClick={() => changeLanguage('pt')} 
                            variant={verifyLanguage('pt')}
                            fullWidth={true}
                            sx={{...styles.button}}>{translate('portugues')}</Button>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button onClick={() => signOut(supabase, navigate)} 
                            fullWidth={true}
                            color="error"
                            sx={{...styles.button}}>{translate('logout')}</Button>
                    </Grid>
                </Grid>
            </>
};

const styles = {
    centerBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    boxAdjustment: {
        height: 'calc(100vh - 56px)',
        padding: 2
    },
    marginTop: {
        marginTop: 2
    }
}

export default Settings;