// created by Artem
import { FC, SyntheticEvent } from 'react';
import { Button, Grid, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UserRoles } from 'types';

type RoleSwitcherProps = {
	onChange?: (...event: any[]) => void;
	setRole?: (role: UserRoles) => void;
	value: UserRoles;
};
export const RoleSwitcher: FC<RoleSwitcherProps> = ({ onChange, setRole, value }) => {
	const { t } = useTranslation();

	const setCustomerHandle = (e: SyntheticEvent) => {
		onChange && onChange({ ...e, target: { ...e.target, value: UserRoles.customer } });
		setRole && setRole(UserRoles.customer)
	}
	const setExecutorHandle = (e: SyntheticEvent) => {
		onChange && onChange({ ...e, target: { ...e.target, value: UserRoles.executor } });
		setRole && setRole(UserRoles.executor)
	}

	return (
		<StyledTabs container alignItems="center"  sx={{p: '5px'}}>
			<Grid item xs={6}>
				<Button
					sx={{height: 50}}
					variant={value === UserRoles.executor ? 'contained' : 'text'}
					onClick={setExecutorHandle}
					fullWidth
				>
					{t('registerForm.executor')}
				</Button>
			</Grid>
			<Grid item xs={6}>
				<Button
					sx={{height: 50}}
					variant={value === UserRoles.customer ? 'contained' : 'text'}
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
