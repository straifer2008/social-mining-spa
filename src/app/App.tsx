import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "router";
import { theme } from 'assets/theme';
import { ThemeProvider } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import APIErrorProvider from '../utils/APIError';
import './App.scss';


function App() {
	return (
    <div className="App">
	    <Suspense fallback={<h1>...loading</h1>}>
        <ThemeProvider theme={theme}>
	        <LocalizationProvider dateAdapter={AdapterMoment}>
		        <APIErrorProvider>
			        <RouterProvider router={router} />
		        </APIErrorProvider>
	        </LocalizationProvider>
        </ThemeProvider>
	    </Suspense>
    </div>
  );
}

export default App;
