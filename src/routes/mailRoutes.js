import dotenv from 'dotenv'
import {Router} from 'express'
import nodemailer from 'nodemailer'
import { usersDao as api } from '../daos/index.js'


dotenv.config()

const mailRouter = Router();


mailRouter.get('/register', async (req,res)=>{
    try {

        const user = await api.getOne(req.session.passport.user)

        let name = user.name
        let lastName = user.lastName
        let email = user.email

        let htmlTemplate = `
        <h1>Bienvenido ${name} ${lastName}</h1>
        <p>
        Su correo ${email} ha sido registrado con éxito.
        </p>
        `;

        const transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            auth: {
              user: process.env.USER_SENDINGBLUE,
              pass: process.env.PASS_SENDINGBLUE,
            },
          });

        await transporter.sendMail({
            from: 'Victor Ruiz <ruizevictor@gmail.com>',
            to: email,
            subject: 'Regitro de user exitoso',
            html: htmlTemplate,
          });

          res.redirect("/index");

    } catch (error) {
        console.log(error)
    }    
});

export default mailRouter; 