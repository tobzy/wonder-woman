const env = process.env.NODE_ENV;

// export const baseURL = 'https://investment-app-staging.herokuapp.com/api/v1';
// export const baseURL = 'http://localhost:9000/v1';
export const baseURL = 'https://tierion-proxy.herokuapp.com/v1';

//----AUTH MANAGEMENT URLS---//

export const postIssue = baseURL + '/records';
export const getIssues = baseURL + '/records';
export const getOneIssue = (id)=>baseURL + '/records/' + id;



