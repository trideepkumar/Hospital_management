import express from "express"
import {
    authenticate,
    validateUser,
    verifyEmail,
    validateLogin,
    loginUser,
    isUserLoggedin,
    getAdminDetails,
    logoutAdmin
} from '../controllers/authControllers.js'
import { addDepart, deleteDepart, editDepart, validateDepartment } from "../controllers/departmentControllers.js"
import { addEmployee, deleteEmployee, editEmployee, validateEmployees } from "../controllers/departHeadControlers.js"


const router = express.Router()

//auth routes
router.post('/register',validateUser,authenticate)
router.post("/login", validateLogin, loginUser)
router.get('/adminDetails',isUserLoggedin,getAdminDetails)
router.post("logout",isUserLoggedin,logoutAdmin)


//department routes

router.post('/addDepart',isUserLoggedin,validateDepartment,addDepart)
router.patch('/editDepart/:_id',isUserLoggedin,editDepart)
router.delete('/deleteDepart/:_id',isUserLoggedin,deleteDepart)


//employee-head routes

router.post('/addEmployee',isUserLoggedin,validateEmployees,addEmployee)
router.patch('/editEmployee/:_id',isUserLoggedin,editEmployee)
router.delete('/deleteEmployee/:_id',isUserLoggedin,deleteEmployee)





export default router