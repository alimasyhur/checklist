const resolvers = {
  Query: {
   async getChecklist (root, { id }, { models }) {
    return models.Checklist.findByPk(id)
  },
   async getAllChecklists (root, args, { models }){
    return models.Checklist.findAll()
  }
},
Mutation: {
  async addChecklist (root, { object_id, object_domain, description }, { models }) {
        return models.Checklist.create({
                                          object_id,
                                          object_domain,
                                          description
                                        })
    }
  },
}
