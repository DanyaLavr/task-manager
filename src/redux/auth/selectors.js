export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUserIsLoading = state => state.auth.isLoading;
export const selectUser = state => state.auth.user;
export const selectIsAdmin = state => state.auth.user?.role === "admin";
