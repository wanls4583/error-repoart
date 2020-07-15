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
    save(message) {
        var addSql = 'INSERT IGNORE INTO error_message(message) VALUES(?)';
        var addSqlParams = [message];
        return this._select(addSql, addSqlParams);
    }
    //查询用户
    get(page, size) {
        var sql = 'SELECT * FROM error_message order by create_time desc limit ?,?';
        var sqlParams = [(page - 1) * size, page * size];
        return this._select(sql, sqlParams);
    }
}