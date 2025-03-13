
const {PrismaClient} = require('@prisma/client')

const multer = require('multer')
const path = require('path')
const fs = require('fs')
const {Console} = require('console')

const prisma =  new PrismaClient()

// การอัปโหลดไฟล์----------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/users");
    } ,
    filename: (req, file, cb) => {
        cb(null, 'user_'+ Math.floor(Math.random()* Date.now()) + path.extname(file.originalname));
    }
})
exports.uploadUser = multer({
     storage: storage,
     limits: {
         fileSize: 1000000
     },
     fileFilter: (req, file, cb) => {
         const fileTypes = /jpeg|jpg|png/;
         const mimeType = fileTypes.test(file.mimetype);
         const extname = fileTypes.test(path.extname(file.originalname));
         if(mimeType && extname) {
             return cb(null, true);
         }
         cb("Error: Images Only");
     }
}).single("userImage");
// ==============================

// เอาข้อมูลที่ส่งมาจาก Frontend เพิ่ม (Create/Insert) ลงตารางใน DB========
exports.createUser =  async (request, response) => {
    try{
        const result = await prisma.user_tb.create({
            
                userFullname: request.body.userFullname,
                userName : request.body.username,
                userPassword : request.body.userPassword,
                userImage: request.file ? request.file.path.replace('images\\users\\', ''): '',
            
        })
        response.status(201).json({
            message: 'ok',
            info: result
        })

    }catch(error){
        response.status(500).json({
            message : `พบปัญหาในการทำงาน : ${error}`
        })}
        Console.log(`Error : ${error}`)
    
}

// ==============================