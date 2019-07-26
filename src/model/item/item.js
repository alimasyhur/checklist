const DAO = require('../../lib/dao')
const mySQLWrapper = require('../../lib/mysqlWrapper')

class Item extends DAO {


    static get TABLE_NAME() {
        return 'items'
    }

    static async getByID(_, {id}) {
        return await this.find(id)
    }

    static async getByChecklistID(_, fields) {
      console.log(fields)
    }

    static async findMatching(_, fields) {
        // Returns early with all bacons if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll()

        // Find matching bacons
        return this.findByFields({
            fields
        })
    }

    static async createEntry(_, fields) {
        const connection = await mySQLWrapper.getConnectionFromPool()
        try {
            let _result = await this.insert(connection, {
                data: fields
            })

            return this.getByID(_, {id: _result.insertId})
        } finally {
            // Releases the connection
            if (connection != null) connection.release()
        }
    }

    static async updateEntry(_, fields) {
        var id = fields.id;
        const connection = await mySQLWrapper.getConnectionFromPool()
        try {

            await this.update(connection, {
                id,
                data: fields
            })

            return this.getByID(_, {id})
        } finally {
            // Releases the connection
            if (connection != null) connection.release()
        }
    }

    static async deleteEntry(_, {id}) {
        const connection = await mySQLWrapper.getConnectionFromPool()
        try {
              await this.delete(connection, {id})

              return 'Deleted'
        } finally {
            if (connection != null) connection.release()
        }
    }
}

module.exports = Item
