export const API_ROUTES = {
  AUTH: {
    LOGIN: 'v2/auth/login',
    LOGOUT: '/v2/auth/logout',
    REGISTER: 'v2/auth/register',
    EMAIL_CONFIRM: '/v2/auth/email-confirm',
    EMAIL_CONFIRM_RESEND: '/v2/auth/resend-code',
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
