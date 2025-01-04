import { sequelize } from '../db/postgresql.js';

class MainModel {
    // Статическое свойство для имени таблицы
    static tableName = 'default';

    constructor(tableName) {
        this.tableName = tableName || '';
    }

    // Статический метод для получения имени таблицы
    static getTableName() {
        return this.tableName;
    }

    // Статический метод для выполнения запроса SELECT
    static async find() {
        try {
            const tableName = this.getTableName()
            if(!tableName) {
                throw new Error('Table name is not defined');
            }
            const query = `SELECT * from ${tableName}`;
            const result = await pool.query(query);
            return result.rows;
        } catch (err) {
            console.error('Error executing query', err);
            throw err;
        }
    }

    static async findById(id) {
        try {
            const numberId = Number(id)
            if(!numberId) {
                throw new Error('id is not correct');
            }
            const tableName = this.getTableName()
            if(!tableName) {
                throw new Error('Table name is not defined');
            }
            const query = `SELECT * FROM ${tableName} WHERE id = $1`;
            const result = await pool.query(query, [numberId]);
            return result.rows;
        } catch (err) {
            console.error('Error executing query', err);
            throw err;
        }
    }
    static async deleteById(id) {
        try {
            const numberId = Number(id)
            if(!numberId) {
                throw new Error('id is not correct');
            }
            const tableName = this.getTableName()
            if(!tableName) {
                throw new Error('Table name is not defined');
            }
            const query = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`;
            const result = await pool.query(query, [numberId]);
            return result.rows;
        } catch (err) {
            console.error('Error executing query', err);
            throw err;
        }
    }

    static async updateById(id, params) {
        try {
            const numberId = Number(id)
            if(!numberId) {
                throw new Error('id is not correct');
            }
            const tableName = this.getTableName()
            if(!tableName) {
                throw new Error('Table name is not defined');
            }
            let query = `UPDATE ${tableName} SET `;
            let queryParams = [];
            let setClause = [];

            const paramsArr = Object.entries(params);

            paramsArr.forEach((item, index) => {
                if (item[1]) {
                    setClause.push(`${item[0]} = $${index + 1}`);
                    queryParams.push(item[1]);
                }
            });
            query += setClause.join(', ') + ` WHERE id = $${setClause.length + 1}`;
            queryParams.push(numberId);
            console.log(query)
            const result = await pool.query(query, queryParams);
            return result.rows;
        } catch (err) {
            console.error('Error executing query', err);
            throw err;
        }
    }

    static async create() {
        try {

        }catch (error) {
            console.error('Error executing query', error.message);
            throw error;
        }
    }
}

export { MainModel };
