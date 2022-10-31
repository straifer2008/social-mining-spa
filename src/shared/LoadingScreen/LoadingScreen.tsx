// created by Artem
import { FC } from 'react';
import './LoadingScreen.scss';

type LoadingScreenProps = {
	show?: boolean;
};
export const LoadingScreen: FC<LoadingScreenProps> = ({ show = true }) => {
	if (!show) return null;

	return (
		<div className="loader-wrapper">
			<div className="loader bg-white">
				<div className="whirly-loader"></div>
			</div>
		</div>
	);
};
