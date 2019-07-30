import { expect, should } from 'chai';
import * as api from './api';

describe('histories', () => {
  describe('history(id: String!): History', () => {
    it('returns a history when history can be found', async () => {
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
          history: {
            id: '1',
            action: 'update',
            loggable_id: 1,
            loggable_type: 'asdf',
            value: "value",
            kwuid: null
          },
        },
      };

      const result = await api.history({ id: '1' }, token);

      expect(result.data).to.eql(expectedResult);
    });

    it('returns null when history cannot be found', async () => {
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

      const result = await api.history({ id: 13 }, token);

      should(result.data).exist('error')
    });
  });
});
