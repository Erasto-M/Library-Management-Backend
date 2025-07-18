import multer from 'multer';

/* Store in memory for s3 upload */
const storage = multer.memoryStorage(); 

const upload = multer({
storage,
limits: {
    fileSize: 5 * 1024 * 1024  // 5MB limit 
},
});

export default upload;

