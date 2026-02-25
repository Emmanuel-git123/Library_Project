const express=require('express');
const cors=require('cors');

const thesisRoutes = require('./Routes/thesisRoutes.js');
const deptRoutes = require('./Routes/deptRoutes');
const subjectRoutes = require('./Routes/subjectRoutes');
const userRoutes = require('./Routes/userRoutes');
const authRoutes=require('./Routes/authRoutes.js');

const { connectDB } = require('../config/db.js');

const app=express();

app.use(cors())
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use("/api/thesis",thesisRoutes);
app.use("/api/depts",deptRoutes);
app.use("/api/subjects",subjectRoutes);
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

connectDB().then(() => {
    app.listen(8080, () => {
        console.log("LISTENING TO SERVER AT PORT 8080...")
    })
})