const express=require('express');
const bodyParser=require('body-parser')
const Joi=require('joi'); //validation tool makes easy insted of if else. its a class so first latter should be uppercase Joi
let app =express()
app.use(express.json());//Its a middleware enable parsing of json object from body of request to read it when post 

const port=process.env.PORT||3000
const courses=[
    {id:1, name:"Course1"},
    {id:2, name:"Course2"},
    {id:3, name:"Course3"},
    {id:4, name:"Course4"},
    {id:5, name:"Course5"},
]


// app.get('/',(req,res)=>{
//     res.send("this is the homepage")
// }) 

app.get('/api/courses',(req,res)=>{
    res.send(courses)
})

app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find((c)=>c.id===parseInt(req.params.id))
    if(!course) res.status(404).send("Course with given ID not found")
    res.send(course)
})

app.post('/api/courses/',(req,res)=>{

    const {error}=validateCourse(req.body)

    if(error)return res.status(400).send(error.details[0].message)
    
    const course={
        id: courses[courses.length-1].id+1,
        name: req.body.name
    };
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id',(req,res)=>{

    const course=courses.find((c)=>c.id===parseInt(req.params.id))

    if(!course) {
        res.status(404).send("Course with given ID not found")
        return;}

    const {error}=validateCourse(req.body)

    if(error)return res.status(400).send(error.details[0].message)

    course.name=req.body.name
    res.send(course)

})

app.delete('/api/courses/:id',(req,res)=>{

    const course=courses.find((c)=>c.id===parseInt(req.params.id))
    
    if(!course) {
        res.status(404).send("Course with given ID not found")
        return;}

    const index=courses.indexOf(course)
    courses.splice(index,1);

    res.send(course)

})

function validateCourse(course) {
    const schema={
        name:Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

// app.get('/api/:year/:month',(req,res)=>{
//     res.send(req.params)
// })

// app.get('/api',(req,res)=>{
//     res.send(req.query) //http://localhost:3000/api/?sortBy=name gives the query in object {soryBy:name}
// })

app.listen(port, ()=>console.log("running in port: "+port))

// app.get()
// app.post()
// app.put()
// app.delete()