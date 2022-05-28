const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
const req = require("express/lib/request")
var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS" ); 
    next(); });
var markModel=Mongoose.model("marks",
new Mongoose.Schema(
    {

    name: String,
    admno: String,
    cgpa: String
}))
Mongoose.connect("mongodb+srv://mzc:mzc@cluster0.m2f8m.mongodb.net/MarkDb")
app.get("/api/viewall",(req,res)=>{
markModel.find(
    (error,data)=>{
        if(error){
            res.send({"status":"error"})

        }
        else{
            res.send(data)

        }
    }
)
})
app.post("/api/delete",(req,res)=>{
    var getId=req.body
    markModel.findByIdAndDelete(getId,(error,data)=>{
        if(error){
            res.send({"status":"error"})
        }
        else{
            res.send({"status":"success"})
        }
    })
})
app.post("/api/search",(req,res)=>{
    var getAdmno=req.body
    console.log(getAdmno)
    markModel.find(getAdmno,(error,data)=>{
        if(error){
            res.send({"status":"error"})
        }
        else{
            res.send(data)
        }
    })
})

app.post("/api/addmark",(req,res)=>{
    var data=req.body
    let mymark=new markModel(data)
    mymark.save(
        (error,data)=>{
            if(error){
                res.send({"status":"error","error":error})

            }
            else
            {
                res.send({"status":"success","data":data})


            }
        
    })

})
app.listen(4500,()=>{
    console.log("server running")
})
 