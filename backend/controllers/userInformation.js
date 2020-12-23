const { userInformation } = require('../services/database')
const { PythonShell } = require('python-shell')

const express = require('express'),
    router = express.Router()

router
    .get('/:username', async (req, res) => {
        let { username } = req.params

        let user = await userInformation.isUserExisted(username)

        res.send(`${username} is${!user ? ' not' : ''} existed`)
    })
    .post('/login', async (req, res) => {
        let { username, password } = req.body

        let User_ID = await userInformation.getUserID(username, password)

        if (!User_ID) return res.send('Username of Password is incorrect')

        res.send(User_ID)
    })
    .post('/createUser', async (req, res) => {
        let {username, password, firstname, lastname, email, mbtiid, learningstyleid} = req.body

        let user = await userInformation.isUserExisted(username)

        if (user) return res.send('Username is already existed')

        let mail = await userInformation.isEmailExisted(email)

        if (mail) return res.send('E-mail is already existed')

        await userInformation.addNewUser(username, password, firstname, lastname, email, mbtiid, learningstyleid)

        res.send(`${username} Added`)
    })
    .post('/information', async (req, res) => {
        const userId = req.body.userId

        if (!userId) return res.status(403).send('Unanthorized')

        let information = await userInformation.getInformation(userId)

        res.send(information)
    })
    .post('/avginformation', async (req, res) => {
        let avginformation = await userInformation.getAVGInformation()

        res.send(avginformation)
    })

    .post('/finishActivity', async (req, res) => {
        const userId = req.body.userId
        
        if (!userId) return res.status(403).send('Unanthorized')

        let activityCount = await userInformation.getFinishActivity(userId)

        res.send(activityCount+"")
    })
    router.post('/tree', async (req, res) => {
        const userId = req.body.userId
        console.log(userId)
        if (!userId) return res.status(403).send('Unanthorized')
    
        const pythonShellOptions = {
            args: [userId],
            scriptPath: 'backend'
        }
        PythonShell.run(
            'leafCalculation.py',
            pythonShellOptions,
            async (err, results) => {
                res.send(results)
            }
        )
        res.status(500).send('Bad Request')
    })
    .post('/firstName', async (req, res) => {
        const userId = req.body.userId

        if (!userId) return res.status(403).send('Unanthorized')

        let name = await userInformation.getFirstName(userId)

        res.send(name)
    })

    .post('/AVGName', async (req, res) => {
        const userId = 0

        let name = await userInformation.getFirstName(userId)

        res.send(name)
    })
    router.post('/ranking', async (req, res) => {
        const userId = req.body.userId
        console.log(userId)
        if (!userId) return res.status(403).send('Unanthorized')
    
        const pythonShellOptions = {
            args: [userId],
            scriptPath: 'backend'
        }
        PythonShell.run(
            'ranking.py',
            pythonShellOptions,
            async (err, results) => {
                res.send(results)
            }
        )
    })

module.exports = router

