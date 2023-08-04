const nodemailer = require("nodemailer")

const sendMail = async (req, res) => {
    try {
        let testAccount = await nodemailer.createTestAccount()

        //connect to smtp server
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'frances.gleichner@ethereal.email',
                pass: '46DvNpfqQvQGtSz2JW'
            }
        });

        let info = await transporter.sendMail({
            from: '"Scotttt" <test@example.com>', // sender address
            to: "saadmalik4659@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        })
        console.log(`Message sent: ${info.messageId}`)
        res.json(info)


    } catch (error) {
        console.log(error)
        res.json({ message: "error" })
    }
}

module.exports = sendMail