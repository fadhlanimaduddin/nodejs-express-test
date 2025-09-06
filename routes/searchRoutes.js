const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);

router.get('/name', searchController.searchByName);
router.get('/nim', searchController.searchByNim);
router.get('/ymd', searchController.searchByYmd);

module.exports = router;
