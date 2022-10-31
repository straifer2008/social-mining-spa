export const API_ROUTES = {
  AUTH: {
    LOGIN: 'v2/auth/login',
    LOGOUT: '/v2/auth/logout',
    REGISTER: 'v2/auth/register',
    EMAIL_CONFIRM: '/v2/auth/email-confirm',
    EMAIL_CONFIRM_RESEND: '/v2/auth/resend-code',
	  FORGOT_PASSWORD: '/v2/password/send-code',
	  FORGOT_SEND_CODE: '/v2/password/confirm-code',
	  RESET_PASSWORD: '/v2/password/reset',
    GET_USER: '/v2/auth/user',
	  GOOGLE_OPEN: '/v2/auth/google/open',
	  FACEBOOK_OPEN: '/v2/auth/facebook/open',
	  GOOGLE_AUTH: '/v2/auth/google',
	  FACEBOOK_AUTH: '/v2/auth/facebook',
	  WALLET_REGISTER: '/v2/auth/wallet/register',
	  WALLET_CONNECT: '/v2/auth/wallet/connect',
  },
	LOCATION: {
		COUNTRIES: '/v2/country/list'
	}
};

export const SOCIAL: { GOOGLE: string, FACEBOOK: string } = {
	GOOGLE: `${process.env.REACT_APP_API_URL}${API_ROUTES.AUTH.GOOGLE_OPEN}`,
	FACEBOOK: `${process.env.REACT_APP_API_URL}${API_ROUTES.AUTH.FACEBOOK_OPEN}`
}
