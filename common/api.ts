export const BASE_HREF = 'http://localhost:5000';



export const api = {
  TASK: `${BASE_HREF}/Tasks`,
  USER: `${BASE_HREF}/Accounts`,
  LOGIN: `${BASE_HREF}/Auth/Login`,
  PROFILE: `${BASE_HREF}/Profile`,
  TEAM: `${BASE_HREF}/Team`,
  ACCOUNTSBYTEAM: `${BASE_HREF}/Team/Accounts/`
}

export const getAuthToken = (): string| null => localStorage.getItem('bearerToken');
