'use strict'
const User = use('App/Models/User');

class LoginController {

    async login({ request, response, auth }) {
        const { email, password } = request.all();
        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email)
                let accessToken = await auth.generate(user)
                return response.json({ "user": user.username, "access_token": accessToken })
            }
        }
        catch (error) {
            return response.json({ message: 'Debes iniciar sesión' })
        }
    }
}

module.exports = LoginController
