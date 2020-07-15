var mysql = require('mysql');
var config = require('../config');
module.exports = {
    connect() {
        //连接还未关闭，直接返回连接
        // if (this.connected) {
        //     clearTimeout(this.closeTimer);
        //     return Promise.resolve(this.connection);
        // }
        // this.connection = mysql.createConnection({
        //     host: host,
        //     user: 'root',
        //     password: password,
        //     port: '3306',
        //     database: 'comic'
        // });
        // return new Promise((resolve, reject) => {
        //     this.connection.connect((err) => {
        //         if (err) {
        //             console.log(`mysql连接失败:${err}!`);
        //             return;
        //         }
        //         this.connected = true;
        //         resolve(this.connection);
        //     });
        // })
        if (!this.pool) {
            this.pool = mysql.createPool({
                connectionLimit: 100,
                host: config.db_host,
                user: 'root',
                password: config.db_password,
                port: '3306',
                database: 'jy_front_error'
            });
        }
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        });
    },
    // close() {
    //     return new Promise((resolve, reject) => {
    //         clearTimeout(this.closeTimer);
    //         //防止频繁调用关闭方法报错
    //         this.closeTimer = setTimeout(() => {
    //             this.connection.end((err) => {
    //                 if (err) {
    //                     console.log(`mysql关闭失败:${err}!`);
    //                     return;
    //                 }
    //                 resolve(this.connection);
    //                 this.connected = false;
    //             });
    //         }, 10000);
    //     })
    // }
}