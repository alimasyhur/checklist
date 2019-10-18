import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from '../resolvers/user';
import templateResolvers from '../resolvers/template';
import checklistResolvers from '../resolvers/checklist';
import itemResolvers from '../resolvers/item';
import historyResolvers from '../resolvers/history';

const customScalarResolver = {
    Date: GraphQLDateTime,
};

export default [
    customScalarResolver,
    userResolvers,
    templateResolvers,
    checklistResolvers,
    itemResolvers,
    historyResolvers
];
