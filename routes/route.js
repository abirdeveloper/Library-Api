const express = require('express')
const router = express.Router()
const controller = require('../controller')

router.get('/', (req, res) => {  
    res.send('Welcome to Policy Dashboard')
})

router.get('/Policies', async(req, res) => {
    const data = await controller.getAll()
    res.send(data)
})

router.get('/policy/:_id', async(req,res) => {
    const { _id } = req.params
    const data = await controller.getOne(_id)
    res.send(data)
})

router.post('/addpolicy', (req, res) => {
    const newBook = {
        customername: req.body.customername,
        address: req.body.address,
        policynumber:req.body.policynumber,
        premium:req.body.premium,
        emailid:req.body.emailid,
        lob:req.body.lob
    }
    
    controller.addNewBook(newBook)
    res.send('Policy Created successfully!!')
})

router.put('/updatepolicy', (req, res) => {
    const newBook = {
        _id:req.body._id,
        customername: req.body.customername,
        address: req.body.address,
        policynumber:req.body.policynumber,
        premium:req.body.premium,
        emailid:req.body.emailid,
        lob:req.body.lob
    }
    
    controller.updateNewBook(newBook)
    res.send('Policy Updated successfully!!')
})

router.delete('/deletepolicy',(req,res)=>{
    let code = req.body._id
    controller.deleteBookByCode(code)
    res.send('Policy Deleted!!')
})
router.get('/search/:policynumber', (req,res)=>{
    const { policynumber } = req.params
    const data =  controller.searchBookname(policynumber)
    console.log(data)
    res.send(data)
})



// router.get('/book/:code', async(req,res) => {
//     const { code } = req.params
//     const data = await controller.getOne(code)
//     res.send(data)
// })

module.exports = router