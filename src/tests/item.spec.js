import { expect, should } from 'chai';
import * as api from './api';

describe('items', () => {
  describe('checklistItem(checklistId: Int!, itemId: Int!): Item', () => {
    it('returns a item when item can be found', async () => {
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
          checklistItem: {
            id: "1",
            description: "Item description",
            urgency: 1,
            checklist: {
                id: "1",
                object_id: "4",
                object_domain: "domain-update",
                description: "description update",
              },
            }
          }
      };

      const result = await api.checklistItem({ checklistId: 1, itemId: 1 }, token);

      expect(result.data).to.eql(expectedResult);
    });
  });


  describe('createChecklistItem(checklistId: Int!, description: String!): Item!', () => {
      it('create a checklist item', async () => {
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
                "createChecklistItem": {
                  description: "Create Item",
                  checklist: {
                    object_id: "4",
                    object_domain: "domain-update"
                  }
                }
              }
            }

        const result = await api.createChecklistItem({
                                              checklistId: 1,
                                              description: "Create Item"
                                            }, token);

        expect(result.data).to.eql(expectedResult);
      });
    });

  describe('updateChecklistItem(checklistId: Int!, id: Int!, description: String!): Item!', () => {
      it('update a checklist item', async () => {
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
                "updateChecklistItem": {
                  id: "1",
                  description: "Updated Item",
                  checklist: {
                    id: "1",
                    object_id: "4",
                    object_domain: "domain-update"
                  }
                }
              }
            }

        const result = await api.updateChecklistItem({
                                              checklistId: 1,
                                              id: 1,
                                              description: "Updated Item"
                                            }, token);

        expect(result.data).to.eql(expectedResult);
      });
    });

    describe('deleteChecklistItem(checklistId: Int!, id: Int!): Boolean!', () => {
      it('returns delete a checklist item', async () => {
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


        const expectedResult = {data: {deleteChecklistItem: true}}

        const result = await api.deleteChecklistItem({ checklistId: 1, id: 1 }, token);

        expect(result.data).to.eql(expectedResult);
      });
    });

    describe('completeChecklistItems(data: [ItemsCompleteInput!]!): [ItemsCompleteResponse]', () => {
        it('complete Item(s)', async () => {
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
                                      completeChecklistItems: [
                                        {
                                          id: 1,
                                          itemId: 2,
                                          is_completed: true,
                                          checklistId: 2
                                        },
                                        {
                                          id: 2,
                                          itemId: 3,
                                          is_completed: true,
                                          checklistId: 2
                                        }
                                      ]
                                    }
                                  }

          const result = await api.completeChecklistItems({
                                      data: [
                                              {itemId: 2},
                                              {itemId: 3}
                                            ]}, token);

          expect(result.data).to.eql(expectedResult);
        });
      });

    describe('incompleteChecklistItems(data: [ItemsCompleteInput!]!): [ItemsCompleteResponse]', () => {
        it('incomplete Item(s)', async () => {
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
                    incompleteChecklistItems: [
                      {
                        id: 1,
                        itemId: 2,
                        is_completed: false,
                        checklistId: 2
                      },
                      {
                        id: 2,
                        itemId: 3,
                        is_completed: false,
                        checklistId: 2
                      }
                    ]
                  }
                }

          const result = await api.incompleteChecklistItems({
                                      data: [
                                              {itemId: 2},
                                              {itemId: 3}
                                            ]}, token);

          expect(result.data).to.eql(expectedResult);
        });
      });
});
