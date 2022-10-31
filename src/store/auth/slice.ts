import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, ProfileResponse } from 'types';
import { authAPI } from 'services';

const INITIAL_STATE: AuthState = {
	user: null,
	isAuthenticated: false,
};

const slice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
	extraReducers: (builder) => builder.addMatcher<PayloadAction<ProfileResponse>>(
		authAPI.endpoints.getUser.matchFulfilled,
		(state, { payload }) => {
			state.user = payload;
			if (payload.id) {
				state.isAuthenticated = true;
			}
		}
	).addMatcher(
		authAPI.endpoints.logout.matchFulfilled,
		(state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
	),
  reducers: {
    changeAuthenticationState: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload;
    }
  },
});

export const { changeAuthenticationState } = slice.actions;

export default slice.reducer;
