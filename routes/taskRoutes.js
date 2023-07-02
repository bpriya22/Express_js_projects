const express = require("express")
const Task=require("../models/Task")
let taskRouter=express.Router()

taskRouter.get("/",async (req,res)=>{
    // res.send("this is task-man")
    try{
        let tasks=await Task.find().lean()  //to read the data
        res.render("home",{tasks:tasks})
    }
    catch(error){
        console.log(error)
    }
})
taskRouter.post("/",async (req,res)=>{
    let {task}=req.body

    // console.log(req.body)   //form data-> when clicked on create task button.
try{
    let duplicate= await Task.findOne({task:task})// to avoid duplicates
    if(duplicate){
        return res.redirect("/task")
    }
    else{
        await Task.create({
            task:task
        })
    }
}
catch(error){
console.log(error)
res.status(401).json({
    message:"cant create task"
})

}

})

//// taskRouter.get("/update",(req,res)=>{
//     res.send("this is task-man-update")
// })

taskRouter.get("/:id",async (req,res)=>{
    let id=req.params.id
    console.log(id);
    try{
        // let task=await Task.findOne({_id:id}).lean()
        let task=await Task.findById(id).lean()
        // console.log(task)
        res.render("update",{task})
    }
    catch(error){
        console.log(error)
    }
})


taskRouter.put("/:id",async (req,res)=>{
    let id=req.params.id
    let {task}=req.body
    try{
        await Task.updateOne({_id:id},{$set:{task:task}})
        res.redirect("/task")
    }
    catch(error){
        console.log(error)
        res.redirect("/task/:id")
    }
})

taskRouter.delete("/:id",async (req,res)=>{
    let id=req.params.id
    
    try{
        await Task.deleteOne({_id:id})
        res.redirect("/task")
    }
    catch(error){
        console.log(error)
        res.redirect("/task")
    }
})



module.exports=taskRouter