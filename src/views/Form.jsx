import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../Context";
import { Button, Diaper, Eat, Sleep, Grid, AppBar } from "../components";
import { useEffect, useState } from "react";
import { drop, get, save, update } from "../services/supabasedb";
import { getTitle, validateFields } from "../utils/action";
import { getUser } from "../utils/core";
import { useTheme } from "@mui/material/styles";

const Form = () => {
    const { translate, showAlertMessage } = useAppContext();
    const navigate = useNavigate();
    const theme = useTheme();

    const params = useParams();
    const actionType = params.type;
    const id = params.id;

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const getForm = (actionType) => {
        switch(actionType) {
            case "1":
            return <Sleep data={data} setData={setData} translate={translate}/>;

            case "2":
            return <Eat data={data} setData={setData} translate={translate}/>;

            case "3":
            return <Diaper data={data} setData={setData} translate={translate}/>;

            default:
            return <Eat data={data} setData={setData} translate={translate}/>;
        }
    }

    const loadData = async (id) => {
        if(id) {
            const result = await get("action_student", [{field: "id", value: id }, {field: "user_id", value: getUser()?.id }]);
            setData(result);
        }
    }

    useEffect(() => {
        if (params && params.id) {
            loadData(params.id);
        }
    }, [])

    return  <>
                <AppBar title={translate(getTitle(actionType))} id={id} _delete={() => {
                    // eslint-disable-next-line no-restricted-globals
                    const _confirm = confirm("Deseja mesmo deletar este item?");
                    if(_confirm) {
                        drop("action_student", id);
                        showAlertMessage("Item deletado com sucesso!!!", "success");
                        setTimeout(() => {
                            navigate("/");
                        }, 3000);
                    } else{
                        showAlertMessage("Ação cancelada", "error");
                    }
                }}/>
                <Grid container={true} spacing={2} sx={{
                    marginTop: '1em',
                    padding: '1em',
                    height: 'calc(100vh - 72px)',
                }}>
                    <Grid size={{ xs: 12 }}>
                        { getForm(actionType) }
                        <Button
                            loading={loading?.toString()}
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={async () => {
                                try{
                                    const fields = validateFields(data, actionType);
                                    if (fields.length === 0) {
                                        
                                        if(id){
                                            await update("action_student", data, id);
                                        }else {
                                            data.user_id = getUser().id;
                                            await save("action_student", data);
                                        }
                                        showAlertMessage(`Item ${id ? "editado" : "criado"} com sucesso!!!`, "success");
                                        setTimeout(() => {
                                            navigate("/");
                                        }, 3000);
                                    } else {
                                        showAlertMessage(`Os campos ${fields.join(", ")} são obrigatório`, "warning");
                                    }
                                } catch(err){
                                    showAlertMessage(`Erro ao ${id ? "editar" : "criar"} item: ` + err, "error");
                                }
                            }}
                            sx={{ 
                                mt: 3,
                                mb: 2,
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                borderRadius: '0 !important',
                                margin: 0,
                            }}
                        >
                            {translate('save')}
                        </Button>
                    </Grid>
                </Grid>
            </>
};

export default Form;