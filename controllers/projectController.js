const projects = require('../models/projectModel')

//add project 
exports.addProjectController = async (req,res)=> {
    console.log("Inside addProjectController");
    const userId = req.userId
    console.log(userId);
    console.log(req.body);
    console.log(req.file);
    const {title,languages,overview,github,website} = req.body
    const projectImage = req.file.filename

    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project Already exists... Please Upload Another")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)
    }   
}

//get home Projects

exports.getHomeProjectscontroller = async (req,res)=>{
    console.log("Inside getHomeProjectsController");
    try{
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)

    }catch(err){
        res.status(401).json(err)
    }
}

//get user Projects - authorized user

exports.getUserProjectscontroller = async (req,res)=>{
    console.log("Inside getUserProjectsController");
    const userId = req.userId
    try{
        const allUserProjects = await projects.find({userId})
        res.status(200).json(allUserProjects)

    }catch(err){
        res.status(401).json(err)
    }
}

//get all projects

exports.getAllProjectscontroller = async (req,res)=>{
    console.log("Inside getAllProjectsController");
    const searchKey = req.query.search
    try{
        const allProjects = await projects.find({
            languages:{
                $regex:searchKey,$options:"i"
            }
        })
        res.status(200).json(allProjects)

    }catch(err){
        res.status(401).json(err)
    }
}

//edit project          use findByIdAndUpdate in model

exports.editProjectController = async (req,res) =>{
    console.log("Inside editProjectController");
    //get project id fom req parameter 
    const {id} = req.params  
    const {title,languages,overview,github,website,projectImage} = req.body

    //to get file data
    const reUploadImageFile = req.file?req.file.filename:projectImage
    //to get useId - use jwt middleware

    const userId = req.userId
    console.log(id,title,languages,overview,github,website,reUploadImageFile,userId);
    try{
        const updatedProject = await projects.findByIdAndUpdate({_id:id},{
            title,languages,overview,github,website,projectImage:reUploadImageFile,userId
        },{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }catch(err){
        res.status(401).json(err)
    }
}

//remove 

exports.removeProjectController = async (req,res)=>{
    console.log("inside removeProjectController");
    // get id of the project from req params
    const {id} = req.params
    // delete project
    try {
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    } catch (err) {
        res.status(401).json(err)
    }
}