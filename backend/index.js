//express
//mongoose
//express-handlebars
//body-parser

//express
//mongojs
//body-parser

const express=require('express')
const app=express()
const mongojs=require('mongojs')
const db=mongojs('testdb',['testcollc'])
const bodyParse=require('body-parser')
app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())

const cors=require('cors')
app.use(cors())

app.post('/tasks',function(req,res){
    const name=req.body.name
    const price=req.body.price
    db.testcollc.insert({name,price,status:0},function(err,data){
        if(!err){
            return res.json(data)
        }
    })
})
app.get('/tasks',function(req,res){
    db.testcollc.find(function(err,data){
        if(!err){
            res.json(data)
        }
    })
})
app.get('/tasks/:id',function(req,res){
    const id=req.params.id
    db.testcollc.find({_id:mongojs.ObjectID(id)},function(err,data){
        if(!err){
            res.json(data);
        }
    })
})
app.patch('/tasks/:id',function(req,res){
    const id=req.params.id
    db.testcollc.find({_id:mongojs.ObjectID(id)},function(err,data){
        if(!err){
            const status=+!data[0].status
            db.testcollc.update(
                {_id:mongojs.ObjectID(id)},
                {$set:{status}},
                {multi:false},
                function(err,data){
                    if(!err){
                        res.json(data);
                    }
                }
            )
        }
    })
})
app.put('/tasks/:id',function(req,res){
    const id=req.params.id
    const name=req.body.name
    const price=req.body.price
    db.testcollc.update(
        {_id:mongojs.ObjectID(id)},
        {$set:{name,price}},
        {multi:false},
        function(err,data){
            if(!err){
                res.json(data)
            }
        }
    )
})
app.delete('/tasks/:id',function(req,res){
    const id=req.params.id
    db.testcollc.remove({_id:mongojs.ObjectID(id)},function(err,data){
        if(!err){
            res.json(data)
        }
    })
})
app.delete('/tasks',function(req,res){
    db.testcollc.remove({status:1},function(err,data){
        if(!err){
            res.json(data)
        }
    })
})
const port=5000
app.listen(port,function(){
    console.log('Server is started at port '+port)
})
