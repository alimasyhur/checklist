import { expect, should } from 'chai';
import * as api from './api';

describe('checklists', () => {
  describe('checklist(id: String!): Checklist', () => {
    it('returns a checklist when checklist can be found', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await api.signIn({
        login: 'alimasyhur',
        password: 'alimasyhur',
      });

      const expectedResult = {
        data: {
          checklist: {
              id: "1",
              object_id: "3",
              object_domain: "domain",
              description: "checklist description",
              urgency: 1,
            },
          }
      };

      const result = await api.checklist({ id: '1' }, token);

      expect(result.data).to.eql(expectedResult);
    });

    it('returns null when checklist cannot be found', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await api.signIn({
        login: 'alimasyhur',
        password: 'alimasyhur',
      });

      const result = await api.checklist({ id: 13 }, token);

      should(result.data).exist('error')
    });
  });

  describe('createChecklist(object_id: String, object_domain: String!, description: String!, urgency: Int)', () => {
    it('create a checklist', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await api.signIn({
        login: 'alimasyhur',
        password: 'alimasyhur',
      });

      const expectedResult = {
            data: {
              createChecklist: {
                id: "2",
                object_id: "3",
                object_domain: "domain",
                description: "desc",
                urgency: 1,
                items: [
                  {description: "Checklist Item 1"},
                  {description: "Checklist Item 2"}
                ]
              }
            }
          }

      const result = await api.createChecklist({
                                  object_id: "3",
                                  object_domain: "domain",
                                  description: "desc",
                                  urgency: 1,
                                  items: [
                                    {description: "Checklist Item 1"},
                                    {description: "Checklist Item 2"}
                                  ]
       }, token);

      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('updateChecklist(id: ID!, object_id: String!, object_domain: String!, description: String!, urgency: Int)', () => {
    it('update a checklist', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await api.signIn({
        login: 'alimasyhur',
        password: 'alimasyhur',
      });

      const expectedResult = {
          data: {
            updateChecklist: {
              id: "1",
              object_id: "4",
							object_domain: "domain-update",
							description: "description update",
              urgency: 1
            }
          }
        }

      const result = await api.updateChecklist({
                id: 1,
                object_id: "4",
                object_domain: "domain-update",
                description: "description update",
                urgency: 1
       }, token);

      expect(result.data).to.eql(expectedResult);
    });
  });

  // describe('deleteChecklist(id: String!): Boolean!', () => {
  //   it('returns delete a checklist', async () => {
  //     const {
  //       data: {
  //         data: {
  //           signIn: { token },
  //         },
  //       },
  //     } = await api.signIn({
  //       login: 'alimasyhur',
  //       password: 'alimasyhur',
  //     });
  //
  //     const expectedResult = {data: {deleteChecklist: true}}
  //
  //     const result = await api.deleteChecklist({ id: '1' }, token);
  //
  //     expect(result.data).to.eql(expectedResult);
  //   });
  // });

});
