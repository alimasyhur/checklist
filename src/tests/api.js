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

//Template
export const templates = async (variables, token) =>
  axios.post(API_URL, {
    query: `
      query ($limit: Int!) {
        templates(limit: $limit) {
           id
           name
           checklist
           items
        }
      }
    `,
    variables,
  }, {
    headers: {
      'x-token': token,
    },
  });

  export const template = async (variables, token) =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        template(id: $id) {
          id
          name
          checklist
          items
        }
      }
    `,
    variables,
  }, {
    headers: {
      'x-token': token,
    },
  });

  export const createTemplate = async (variables, token) =>
  axios.post(API_URL, {
    query: `
      mutation ($name: String!, $checklist: ChecklistItemInput!, $items: [ChecklistItemInput]!) {
        createTemplate(name: $name, checklist: $checklist, items: $items) {
          id
          name
          checklist
          items
        }
      }
    `,
    variables,
  }, {
    headers: {
      'x-token': token,
    },
  });

  export const updateTemplate = async (variables, token) =>
  axios.post(API_URL, {
    query: `
      mutation ($id: ID!, $name: String!, $checklist: ChecklistItemInput, $items: [ChecklistItemInput]) {
        updateTemplate(id: $id, name: $name, checklist: $checklist, items: $items) {
          id
          name
          checklist
          items
        }
      }
    `,
    variables,
  }, {
    headers: {
      'x-token': token,
    },
  });


  export const deleteTemplate = async (variables, token) =>
    axios.post(
      API_URL,
      {
        query: `
          mutation ($id: ID!) {
            deleteTemplate(id: $id)
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


  //Checklist
  export const checklists = async (variables, token) =>
    axios.post(API_URL, {
      query: `
        query ($limit: Int!) {
          checklists(limit: $limit) {
             id
             object_domain
             object_id
             description
             is_completed
             due
             urgency
             completed_at
             updated_by
             created_by
             createdAt
             updatedAt
          }
        }
      `,
      variables,
    }, {
      headers: {
        'x-token': token,
      },
    });

  export const checklist = async (variables, token) =>
    axios.post(API_URL, {
      query: `
        query ($id: ID!) {
          checklist(id: $id) {
            id
            object_domain
            object_id
            description
            urgency
          }
        }
      `,
      variables,
    }, {
      headers: {
        'x-token': token,
      },
    });

  export const createChecklist = async (variables, token) =>
    axios.post(API_URL, {
      query: `
        mutation ($object_domain: String!,
                  $object_id: String!,
                  $description: String!,
                  $urgency: Int) {
          createChecklist(object_domain: $object_domain,
                          object_id: $object_id,
                          description: $description,
                          urgency: $urgency
                          ) {
                  id
                  object_domain
                  object_id
                  description
                  urgency
          }
        }
      `,
      variables,
    }, {
      headers: {
        'x-token': token,
      },
    });

    export const updateChecklist = async (variables, token) =>
    axios.post(API_URL, {
      query: `
        mutation ($id: ID!,
                  $object_domain: String!,
                  $object_id: String!,
                  $description: String!,
                  $urgency: Int
                  ) {
          updateChecklist(id: $id,
                          object_domain: $object_domain,
                          object_id: $object_id,
                          description: $description,
                          urgency: $urgency
                       ) {
                  id
                  object_domain
                  object_id
                  description
                  urgency
          }
        }
      `,
      variables,
    }, {
      headers: {
        'x-token': token,
      },
    });


    export const deleteChecklist = async (variables, token) =>
      axios.post(
        API_URL,
        {
          query: `
            mutation ($id: ID!) {
              deleteChecklist(id: $id)
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
