import { expect, should } from 'chai';
import * as api from './api';

describe('templates', () => {
    describe('teamplate(id: String!): Template', () => {
        it('returns a template when template can be found', async () => {
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
                    template: {
                        id: '1',
                        name: 'Template 1',
                        checklist: {
                            description: "Checklist 1",
                            due: "asdf",
                            due_interval: 0,
                            due_unit: "hour"
                        },
                        items: [
                            {
                                description: "Item 1",
                                due: "asdf",
                                due_interval: 0,
                                due_unit: "hour"
                            },
                            {
                                description: "Item 2",
                                due: "asdf",
                                due_interval: 0,
                                due_unit: "hour"
                            }
                        ]
                    },
                },
            };

            const result = await api.template({ id: '1' }, token);

            expect(result.data).to.eql(expectedResult);
        });

        it('returns null when template cannot be found', async () => {
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

            const result = await api.template({ id: 13 }, token);

            should(result.data).exist('error')
        });
    });

    describe('createTemplate(name: String!, checklist: ChecklistItemInput!, items: [ChecklistItemInput]!): Boolean!', () => {
        it('create a template', async () => {
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
                    createTemplate: {
                        id: "3",
                        name: "Testing",
                        checklist: {
                            description: "description",
                            due_interval: 1,
                            due_unit: "minutes"
                        },
                        items: [
                            {
                                description: "description",
                                due_interval: 1,
                                due_unit: "minutes"
                            }
                        ]
                    }
                }
            }

            const result = await api.createTemplate({
                name: "Testing",
                checklist: {
                    description: "description",
                    due_unit: "minutes",
                    due_interval: 1,
                },
                items: [{
                    description: "description",
                    due_unit: "minutes",
                    due_interval: 1
                }]
            }, token);

            expect(result.data).to.eql(expectedResult);
        });
    });

    describe('updateTemplate(id: ID!, name: String!, checklist: ChecklistItemInput, items: [ChecklistItemInput]): Boolean!', () => {
        it('update a template', async () => {
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
                    updateTemplate: {
                        id: "3",
                        name: "Template Updated",
                        checklist: {
                            description: "description",
                            due_interval: 1,
                            due_unit: "minutes"
                        },
                        items: [
                            {
                                description: "description",
                                due_interval: 1,
                                due_unit: "minutes"
                            }
                        ]
                    }
                }
            }

            const result = await api.updateTemplate({
                id: "3",
                name: "Template Updated",
            }, token);

            expect(result.data).to.eql(expectedResult);
        });
    });

    describe('assignTemplate(id: ID!, object_id: String!, object_domain: String!): Checklist!', () => {
        it('assign a template into single domain', async () => {
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
                    assignTemplate: {
                        object_id: "3",
                        object_domain: "domain-one",
                        description: "Checklist 1",
                        items: [
                            {
                                description: "Item 1"
                            },
                            {
                                description: "Item 2"
                            }
                        ]
                    }
                }
            }

            const result = await api.assignTemplate({
                id: 1, object_id: "3", object_domain: "domain-one"
            }, token);

            expect(result.data).to.eql(expectedResult);
        });
    });

    describe('assignMultiTemplate(id: ID!, data: [ChecklistTemplateInput!]!): [Checklist!]!', () => {
        it('assign a template into multi domain', async () => {
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
                    assignMultiTemplate: [
                        {
                            object_id: "4",
                            object_domain: "domain-update",
                            description: "description update",
                            "items": [
                                {
                                    "description": "Create Item"
                                }
                            ]
                        },
                        {
                            object_id: "3",
                            object_domain: "domain-one",
                            description: "Checklist 1",
                            items: [
                                {
                                    description: "Item 1"
                                },
                                {
                                    description: "Item 2"
                                }
                            ]
                        },
                        {
                            object_id: "4",
                            object_domain: "domainstringtation",
                            description: "Checklist 1",
                            items: [
                                { description: "Item 1" },
                                { description: "Item 2" }
                            ]
                        },
                        {
                            description: "Checklist 1",
                            items: [
                                { description: "Item 1" },
                                { description: "Item 2" }
                            ],
                            object_domain: "domainstr",
                            object_id: "3"
                        }
                    ]
                }
            }

            const result = await api.assignMultiTemplate({
                id: 1,
                data: [{
                    object_id: "3",
                    object_domain: "domainstr"
                }, {
                    object_id: "4",
                    object_domain: "domainstringtation"
                }
                ]
            }, token);

            expect(result.data).to.eql(expectedResult);
        });
    });

    describe('deleteTemplate(id: String!): Boolean!', () => {
        it('returns delete a template', async () => {
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

            const expectedResult = { data: { deleteTemplate: true } }

            const result = await api.deleteTemplate({ id: '2' }, token);

            expect(result.data).to.eql(expectedResult);
        });
    });

});
