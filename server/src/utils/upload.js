import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

export default multer({ storage: storage });
