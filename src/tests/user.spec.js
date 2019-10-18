import { expect } from 'chai';
import * as userApi from './api';

describe('users', () => {
    describe('user(id: String!): User', () => {
        it('returns a user when user can be found', async () => {
            const expectedResult = {
                data: {
                    user: {
                        id: '1',
                        username: 'alimasyhur',
                        email: 'alimasyhur@gmail.com'
                    },
                },
            };

            const result = await userApi.user({ id: '1' });

            expect(result.data).to.eql(expectedResult);
        });

        it('returns null when user cannot be found', async () => {
            const expectedResult = {
                data: {
                    user: null,
                },
            };

            const result = await userApi.user({ id: '13' });

            expect(result.data).to.eql(expectedResult);
        });
    });

    describe('deleteUser(id: String!): Boolean!', () => {
        it('returns delete a user', async () => {
            const {
                data: {
                    data: {
                        signIn: { token },
                    },
                },
            } = await userApi.signIn({
                login: 'alimasyhur',
                password: 'alimasyhur',
            });

            const expectedResult = { data: { deleteUser: true } }

            const result = await userApi.deleteUser({ id: '2' }, token);

            expect(result.data).to.eql(expectedResult);
        });
    });
});
