const mysql = require("mysql2");
const dbConfig = require("../config/config");

function ensureTableExists(next) {
    const checkTable = `SHOW TABLES LIKE 'suppliers';`;
    db_connection.query(checkTable, (err, result) => {
        if (err) return next(err);

        if (result.length === 0) {
            console.log("Table 'suppliers' does not exist. Creating table...");
            const createTable = `
                CREATE TABLE suppliers (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    address VARCHAR(255),
                    city VARCHAR(255),
                    state VARCHAR(255),
                    email VARCHAR(255),
                    phone VARCHAR(255)
                );
            `;
            db_connection.query(createTable, next);
        } else {
            console.log("Table 'suppliers' already exists.");
            next();
        }
    });
}

const Supplier = function (supplier) {
    this.id = supplier.id;
    this.name = supplier.name;
    this.address = supplier.address;
    this.city = supplier.city;
    this.state = supplier.state;
    this.email = supplier.email;
    this.phone = supplier.phone;
};

const db_connection = mysql.createPool({
    host: dbConfig.APP_DB_HOST,
    user: dbConfig.APP_DB_USER,
    password: dbConfig.APP_DB_PASSWORD,
    database: dbConfig.APP_DB_NAME
});

Supplier.create = (newSupplier, result) => {
    ensureTableExists(err => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        db_connection.query("INSERT INTO suppliers SET ?", newSupplier, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created supplier: ", {id: res.insertId, ...newSupplier});
            result(null, {id: res.insertId, ...newSupplier});
        });
    });
};

Supplier.getAll = result => {
    ensureTableExists(err => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        db_connection.query("SELECT * FROM suppliers", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("suppliers: ", res);
            result(null, res);
        });
    });
};


Supplier.findById = (supplierId, result) => {
    ensureTableExists(err => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        db_connection.query(`SELECT * FROM suppliers WHERE id = ${supplierId}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found supplier: ", res[0]);
                result(null, res[0]);
                return;
            }
            result({kind: "not_found"}, null);
        });
    });
};

Supplier.updateById = (id, supplier, result) => {
    ensureTableExists(err => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        db_connection.query(
            "UPDATE suppliers SET name = ?, city = ?, address = ?, email = ?, phone = ?, state = ? WHERE id = ?",
            [supplier.name, supplier.city, supplier.address, supplier.email, supplier.phone, supplier.state, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                if (res.affectedRows === 0) {
                    result({kind: "not_found"}, null);
                    return;
                }
                console.log("updated supplier: ", {id: id, ...supplier});
                result(null, {id: id, ...supplier});
            }
        );
    });
};

Supplier.delete = (id, result) => {
    ensureTableExists(err => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        db_connection.query("DELETE FROM suppliers WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows === 0) {
                result({kind: "not_found"}, null);
                return;
            }
            console.log("deleted supplier with id: ", id);
            result(null, res);
        });
    });
};

Supplier.removeAll = result => {
    ensureTableExists(err => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        db_connection.query("DELETE FROM suppliers", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log(`deleted ${res.affectedRows} suppliers`);
            result(null, res);
        });
    });
};

module.exports = Supplier;
