const express =  require("express")
const router = new express.Router();
const controllers = require('../controllers/usersControllers.js')
const upload =  require('../multerConfig/storageConfig.js')

router.post('/user/register', upload.single('user_profile') ,controllers.userpost);
router.get('/user/details', controllers.userget)
router.get('/user/:id', controllers.singleuserget)
router.put("/user/edit/:id", upload.single("user_profile"), controllers.userEdit)
router.delete("/user/delete/:id", controllers.userDelete)
router.put("/user/status/:id", controllers.userStatus)
router.get("/userexport", controllers.userExport)





module.exports = router