var db = require('./db.js');
module.exports = class DAO {
    constructor() {}
    _select(sql, sqlParams) {
        return new Promise((resolve, reject) => {
            db.connect().then((connectioon) => {
                connectioon.query(sql, sqlParams, function(err, result) {
                    if (err) {
                        connectioon.release();
                        reject(err);
                        return;
                    }
                    resolve(result);
                    connectioon.release();
                });
            })
        });
    }
    //添加用户
    save(message, userAgent) {
        var messageObj = {};
        var browser = '';
        try {
            browser = _getBrowser(userAgent);
            messageObj = JSON.parse(message);
        } catch (e) {}
        var addSql = 'INSERT IGNORE INTO error_message(message, user_agent, browser, error_msg, error_line, error_column, error_src) VALUES(?, ?, ?, ?, ?, ?, ?)';
        var addSqlParams = [message, userAgent, browser, messageObj[0], messageObj[2], messageObj[3], messageObj[1]];
        return this._select(addSql, addSqlParams);

        function _getBrowser(userAgent) {
            var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
            var isIE = userAgent.indexOf("compatible") > -1 &&
                userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
            var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
            var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
            var isSafari = userAgent.indexOf("Safari") > -1 &&
                userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
            var isChrome = userAgent.indexOf("Chrome") > -1 &&
                userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

            if (isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if (fIEVersion == 7) {
                    return "IE7";
                } else if (fIEVersion == 8) {
                    return "IE8";
                } else if (fIEVersion == 9) {
                    return "IE9";
                } else if (fIEVersion == 10) {
                    return "IE10";
                } else if (fIEVersion == 11) {
                    return "IE11";
                } else {
                    return "IE";
                } //IE版本过低
                return "IE";
            }
            if (isOpera) {
                return "Opera";
            }
            if (isEdge) {
                return "Edge";
            }
            if (isFF) {
                return "FF";
            }
            if (isSafari) {
                return "Safari";
            }
            if (isChrome) {
                return "Chrome";
            }
        }
    }
    //查询用户
    get(page, size) {
        var sql = 'SELECT * FROM error_message order by create_time desc limit ?,?';
        var sqlParams = [(page - 1) * size, page * size];
        return this._select(sql, sqlParams);
    }
}