var express = require('express');
var router = express.Router();
var Dao = require('../modjs/dao.js');
const dao = new Dao();

router.get('/report', function(req, res, next) {
    if(req.query.message) {
        dao.save(req.query.message, req.query.userAgent);
    }
    res.send('');
});

router.get('/report/list', function(req, res, next) {
    dao.get(req.query.page || 1, req.query.userAgent || 20).then((result) => {
    	result && result.map((item)=>{
            try{
                item.message = JSON.parse(item.message);
    		    item.user_agent = JSON.parse(item.user_agent);
            } catch(e){}
    		
    	});
        res.json(result);
    });
});

module.exports = router;