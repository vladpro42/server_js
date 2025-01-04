import {sequelize} from "../db/postgresql.js"
import bcrypt from "bcrypt"

class UserController {

    async getUsers(req, res) {
        try {
            const result = await sequelize.query('SELECT * FROM users');
            res.json(result.rows);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async createUser (req, res) {
        const { name, email, password} = req.body;
        try {
            let hashPassword = false;
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Ошибка хеширования:', err);
                } else {
                    hashPassword = hashedPassword
                }
            });

            const result = await sequelize.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [name, email, hashPassword]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Ошибка при добавлении данных:', error);
            res.status(500).json({ error: 'Ошибка сервера', message: error.message});
        }
    }

}

export default new UserController();

