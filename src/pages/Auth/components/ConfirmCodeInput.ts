import { styled, TextField } from '@mui/material';

export const ConfirmCodeInput = styled(TextField)`
	.MuiInputBase-root {
    padding: 50px 40px;
    background-color: #EBECF04D;
	}
	
	.MuiInputBase-input {
    color: #0E1D40;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
		letter-spacing: 40px;
    line-height: 141%;
		text-align: center;
		@media screen and (max-width: 768px) {
      font-size: 24px;
      letter-spacing: 30px;
			padding-right: 0;
			padding-left: 0;
		}
	}
`;
