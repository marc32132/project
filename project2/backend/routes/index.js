const express = require('express');
// const { authenticate } = require('passport');
const router = express.Router();
const { authenticateToken } = require('../config/auth');



router.get('/admin-page-students.html', authenticateToken, (req, res, next) => {
     if(req.user.position == 'admin'){
        next();
    }
})
router.get('/admin-page.html', authenticateToken, (req, res, next) => {
    if(req.user.position == 'admin'){
        next();
    }
})

router.get('/admin-page-teachers.html', authenticateToken, (req, res, next) => {
    if(req.user.position == 'admin'){
        next();
    }
})

router.get('/admin-page-groups.html', authenticateToken, (req, res, next) => {
    if(req.user.position == 'admin'){
        next();
    }
})

router.get('/student-page.html', authenticateToken, (req, res, next) => {
    if(req.user.position == 'Student'){
        next();
    }
})
router.get('/teacher-page.html', authenticateToken, (req, res, next) => {
    if(req.user.position == 'Teacher'){
        next();
    }
})
router.get('/teacher-page-groups.html', authenticateToken, (req, res, next) => {
    if(req.user.position == 'Teacher'){
        next();
    }
})
router.get('/currentUser', authenticateToken,(req,res) => {
    
    res.json(req.user); 
})

module.exports = router;