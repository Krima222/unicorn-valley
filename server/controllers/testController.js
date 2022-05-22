import Test from '../models/test.js'

export const testGet = async (req, res) => {
    const reqTitle = req.query.title
    const data = await Test.find(reqTitle ? {title: reqTitle} : null)
    res.send(JSON.stringify(data))
}

export const testPost = (req, res) => {
    const {title, data} = req.body

    const post = new Test({
        title,
        data
    })

    post.save()
        .then(result => res.send(JSON.stringify({title: 'notification', message: 'data has been successfully recorded'})))
        .catch(err => res.send(JSON.stringify({title: 'error', error: err})))
}

export const testPut = (req, res) => {
    const reqTitle = req.query.title
    const {title, data} = req.body
    if (reqTitle) {
        Test.updateMany({title: reqTitle}, {title, data})
            .then(result => res.send(JSON.stringify({title: 'notification', message: 'data has been successfully changed'})))
            .catch(err => res.send(JSON.stringify({title: 'error', error: err})))
    } else {
        res.send(JSON.stringify({title: 'error', error: 'to update, you need to specify the title'}))
    }
}

export const testDel = (req, res) => {
    const reqTitle = req.query.title
    Test.deleteMany(reqTitle ? {title: reqTitle} : null)
        .then(result => res.send(JSON.stringify({title: 'notification', message: 'data has been successfully deleted'})))
        .catch(err => res.send(JSON.stringify({title: 'error', error: err})))
}
