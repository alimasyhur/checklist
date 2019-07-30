import axios from 'axios';

const API_URL = 'http://localhost:3000/graphql';

//User
export const user = async variables =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          username
          email
        }
      }
    `,
    variables,
  });

export const signIn = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          token
        }
      }
    `,
    variables,
  });

  export const deleteUser = async (variables, token) =>
    axios.post(
      API_URL,
      {
        query: `
          mutation ($id: ID!) {
            deleteUser(id: $id)
          }
        `,
        variables,
      },
      {
        headers: {
          'x-token': token,
        },
      },
    );

//History
export const histories = async (variables, token) =>
  axios.post(API_URL, {
    query: `
      query ($limit: Int!) {
        histories(limit: $limit) {
           id
           action
           loggable_id
           loggable_type
           value
           kwuid
        }
      }
    `,
    variables,
  }, {
    headers: {
      'x-token': token,
    },
  });

  export const history = async (variables, token) =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        history(id: $id) {
          id
          action
          loggable_id
          loggable_type
          value
          kwuid
        }
      }
    `,
    variables,
  }, {
    headers: {
      'x-token': token,
    },
  });
