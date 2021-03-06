const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req,res) =>{
        const {username, password, isAdmin} = req.body
        const db = req.app.get('db')
        const result = await db.get_user([username])
        const exitingUser = result[0]
        if (exitingUser) {
            return res.status(409).send('Username taken')
        }
        const salt = bcrypt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const registerUser = await db.register_user([isAdmin, username, hash])
        const user = registerUser[0]
        req.session.user = {isAdmin: user.is_admin, username: user.username, id: user.id}
        return res.
    }
}