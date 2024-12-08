
import { useState } from "react";
import { Grid, Avatar, Typography, Button, TextField, Box } from "../components";
import logo from '../assets/svg/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../Context";
import { signIn } from "../services/authentication";
import { handleChange } from "../utils/core";

const Signin = () => {
    const navigate = useNavigate()
    const { supabase, showSnackbar, translate, showAlertMessage } = useAppContext()
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
    })

    const verifyLogin = async () => {
        const { email, password } = formData;
        let { data, error } = await signIn(email.value, password.value, supabase)

        if(error && error.message === 'Invalid login credentials') {
            showSnackbar('Credenciais inválidas')
            return
        } else {
            localStorage.setItem('session', JSON.stringify(data?.session) || '')
            localStorage.setItem('user', JSON.stringify(data?.user))

            navigate('/')
        }
    }
    return (
        <Box
            sx={{
                height: '100vh',
            }}
        >
            <Grid
                container={true}
                sx={styles.conteiner}
            >
                <Grid xs={12} sx={styles.boxCenter}>
                    <Avatar sx={{ width: 180, height: 180 }} src={logo} />
                </Grid>

                <Grid xs={12} sx={styles.boxCenter}>
                    <Typography variant="h2" sx={styles.title}>Login</Typography>
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
                        onChange={(e) => setFormData({ ...formData, email: { value: e.target.value, error: false, helperText: '' } })}
                    />
                </Grid>

                <Grid xs={12} sx={styles.boxCenter}>
                    <TextField
                        value={formData.password.value}
                        fullWidth={true}
                        label="Senha"
                        type="password"
                        onChange={(e) => setFormData({ ...formData, password: { value: e.target.value, error: false, helperText: '' } })}
                    />
                </Grid>

                <Grid xs={12} sx={styles.boxCenter}>
                    <Link to='/signup'>Cadastrar</Link>
                </Grid>

                <Grid xs={12}>
                    <Button 
                        fullWidth={true}
                        onClick={verifyLogin}
                    >
                        Entrar
                    </Button>
                </Grid>
            </Grid>
        </Box> 
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

export default Signin;