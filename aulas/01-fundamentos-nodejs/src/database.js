import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    // O # faz com que a propriedade seja privada, fazendo com que outros arquivos externos não 
    // consigam acessar as propriedades, apenas o proprio arquivo, que nesse caso seria database.js
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then((data) => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
        return data;
    }

}