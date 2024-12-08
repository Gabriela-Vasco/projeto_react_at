import { createContext, SetStateAction, useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Alert, Snackbar, Grid } from './components';
import { createClient } from '@supabase/supabase-js'

import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './theme';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const AppContext = createContext(null);

const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY || '';
const URL = import.meta.env.VITE_SUPABASE_URL || '';

const supabase = createClient(URL, API_KEY)

const AppProvider = ({ children }) => {
    const { t: translate, i18n } = useTranslation();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [alertMessage, setAlertMessage] = useState('');    
    const [alertSeverity, setAlertSeverity] = useState(undefined);
    const [alertVariant, setAlertVariant] = useState(null);
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const showSnackbar = (message) => {
        setOpenSnackbar(true);
        setSnackbarMessage(message)

        setTimeout(() => {
            setOpenSnackbar(false);
            setSnackbarMessage('');
        }, 5000)
    }

    const showAlertMessage = (message, severity, variant) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertVariant(variant);

        setTimeout(() => {
            setAlertMessage('');
            setAlertSeverity(undefined);
            setAlertVariant(null);
        }, 5000)
    }

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
    }

    const sharedState = {
        changeLanguage,
        showSnackbar,
        showAlertMessage,
        supabase,
        translate
    };

    useEffect(() => {
        const language = localStorage.getItem('language');
        if(language) {
           changeLanguage(language);
        } else {
            const browserLanguage = navigator.language;

            if(browserLanguage) {
                changeLanguage(browserLanguage);
            }
        }
    }, [])

    return (
        <div>
            <AppContext.Provider value={sharedState}>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    {children}

                    <Snackbar
                        open={openSnackbar}
                        message={snackbarMessage}
                        autoHideDuration={6000}
                        props={undefined}            
                    />

                    {
                        alertMessage 
                        ? 
                        <Grid container={true} sx={{
                            position: 'fixed',
                            bottom: 0,
                            width: '100%',
                        }}>
                            <Grid size={{ xs: 12 }}>
                                <Alert
                                    severity={alertSeverity}
                                    props={undefined}
                                    variant={alertVariant}
                                >
                                    {alertMessage}    
                                </ Alert> 
                            </Grid>
                        </Grid>
                        : 
                            null
                    }

                </ThemeProvider>
            </AppContext.Provider>
        </div>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}

export default AppProvider;