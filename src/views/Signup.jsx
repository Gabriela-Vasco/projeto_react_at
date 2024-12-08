
import { useState } from "react";
import { Grid, Avatar, Typography, Button, TextField } from "../components";
import logo from '../assets/svg/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../Context";
import { signUp } from "../services/authentication";
import { validateEmail, validatePassword } from "../utils/form";

const SignUp = () => {
    const navigate = useNavigate()
    const { supabase, showSnackbar, showAlertMessage, translate } = useAppContext()
    const [formData, setFormData] = useState({
        email: {
            value: "",
            error: false,
            helperText: ''
        },
        password: {
            value: "",
            error: false,
            helperText: ''
        },
        confirmPassword: {
            value: "",
            error: false,
            helperText: ''
        },
    })

    const verifyRegister = async () => {
        const emailValidation = validateEmail(formData.email.value)
        const passwordValidation = validatePassword(formData.password.value)

        setFormData((v) => ({
            ...v,
            email: {
                value: v.email.value,
                error: emailValidation.error,
                helperText: emailValidation.helperText
            },
            password: {
                value: v.password.value,
                error: passwordValidation.error,
                helperText: passwordValidation.helperText
            }
        }));

        if (emailValidation.error || passwordValidation.error) {
            return;
        }

        if (formData.password.value !== formData.confirmPassword.value) {
            showAlertMessage("As senhas não coincidem", "error");
            return;
        }

        let { data: response, error } = await signUp(formData.email.value, formData.password.value, supabase);

        if (error) {
            if (error.toString().indexOf("AuthApiError: User already registered") !== -1) {
                showSnackbar("Usuário registrado");
            } else {
                showSnackbar(error.toString());
            } 
        } else {
            showSnackbar("Usuário criado com sucesso!");
            navigate("/signin")
        }
    }

    return (
        <Grid
            container={true}
            sx={styles.conteiner}
        >
            <Grid xs={12} sx={styles.boxCenter}>
                <Avatar sx={{ width: 180, height: 180 }} src={logo} />
            </Grid>

            <Grid xs={12} sx={styles.boxCenter}>
                <Typography variant="h2" sx={styles.title}>{translate('sign-up')}</Typography>
            </Grid>

            <Grid xs={12} sx={styles.boxCenter}>
                <Typography variant="h4">{translate('welcome')}</Typography>
            </Grid>

            <Grid xs={12} sx={styles.boxCenter}>
                <TextField 
                    value={formData.email.value}
                    fullWidth={true}
                    label="E-mail"
                    type="email"
                    error={formData.email.error}
                    helperText={formData.email.helperText}
                    onChange={(e) => setFormData({ ...formData, email: { value: e.target.value, error: false, helperText: '' } })}
                />
            </Grid>

            <Grid xs={12} sx={styles.boxCenter}>
                <TextField
                    value={formData.password.value}
                    fullWidth={true}
                    label={translate('password')}
                    type="password"
                    error={formData.password.error}
                    helperText={formData.password.helperText}
                    onChange={(e) => setFormData({ ...formData, password: { value: e.target.value, error: false, helperText: '' } })}
                />
            </Grid>

            <Grid xs={12} sx={styles.boxCenter}>
                <TextField
                    value={formData.confirmPassword.value}
                    fullWidth={true}
                    label={translate('confirm-password')}
                    type="password"
                    error={formData.password.error}
                    helperText={formData.password.helperText}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: { value: e.target.value, error: false, helperText: '' } })}
                />
            </Grid>

            <Grid xs={12} sx={styles.boxCenter}>
                <Link to='/signin'>{translate('sign-in')}</Link>
            </Grid>

            <Grid xs={12}>
                <Button 
                    fullWidth={true}
                    onClick={verifyRegister}
                >
                    {translate('register')}
                </Button>
            </Grid>
        </Grid>
    )
};

const styles = {
    conteiner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#E6E6FA',
    },

    boxCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
    },

    title : {
        fontSize: '36px',
        color: '#301934'
    },

    boxPadding: {
        padding: '0 10px',
    }
}

export default SignUp;