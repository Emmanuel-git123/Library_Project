const cloudinary = require("./cloudinary");

const uploadToCloud=(buffer)=>{
    return new Promise((resolve,reject)=>{
        const smtg=cloudinary.uploader.upload_stream(
            {
                resource_type:"auto",
                type: "upload", 
                folder:"thesis_pdfs",
                timeout: 600000
            },
            (error,uploadResult)=>{
            if(error){
                return reject(error);
            }
            resolve(uploadResult);
        })
        smtg.end(buffer);
    })
};

module.exports = { uploadToCloud };