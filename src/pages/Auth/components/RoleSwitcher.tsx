// created by Artem
import { FC, SyntheticEvent } from 'react';
import { Button, Grid, styled } from '@mui/material';
import { USER_ROLES } from 'constants/common';
import { useTranslation } from 'react-i18next';

type RoleSwitcherProps = {
	onChange?: (...event: any[]) => void;
	setRole?: (role: 'customer' | 'executor') => void;
	value: 'customer' | 'executor';
};
export const RoleSwitcher: FC<RoleSwitcherProps> = ({ onChange, setRole, value }) => {
	const { t } = useTranslation();

	const setCustomerHandle = (e: SyntheticEvent) => {
		onChange && onChange({ ...e, target: { ...e.target, value: USER_ROLES.customer } });
		setRole && setRole(USER_ROLES.customer)
	}
	const setExecutorHandle = (e: SyntheticEvent) => {
		onChange && onChange({ ...e, target: { ...e.target, value: USER_ROLES.executor } });
		setRole && setRole(USER_ROLES.executor)
	}

	return (
		<StyledTabs container alignItems="center"  sx={{p: '5px'}}>
			<Grid item xs={6}>
				<Button
					sx={{height: 50}}
					variant={value === USER_ROLES.executor ? 'contained' : 'text'}
					onClick={setExecutorHandle}
					fullWidth
				>
					{t('registerForm.executor')}
				</Button>
			</Grid>
			<Grid item xs={6}>
				<Button
					sx={{height: 50}}
					variant={value === USER_ROLES.customer ? 'contained' : 'text'}
					onClick={setCustomerHandle}
					fullWidth
				>
					{t('registerForm.customer')}
				</Button>
			</Grid>
		</StyledTabs>
	);
};


const StyledTabs = styled(Grid)`
	border: 1px solid #B5BBC6;
	border-radius: 8px;
	margin-bottom: 40px;
	.MuiButton-textPrimary {
		color: #45516C;
	}
`;
