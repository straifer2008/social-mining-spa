import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "../router";
import { theme } from '../assets/theme';
import { ThemeProvider } from '@mui/material';


function App() {
	return (
    <div className="App">
	    <Suspense fallback={<h1>...loading</h1>}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
	    </Suspense>
    </div>
  );
}

export default App;
