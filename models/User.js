const db = require('../config/db');

class User {
    // Create a new user
    static create(user) {
        return new Promise((resolve, reject) => {
            const { username, password, dob } = user; // Include only necessary fields
            const query = 'INSERT INTO users (username, password, dob) VALUES (?, ?, ?)';
            db.query(query, [username, password, dob], (err, results) => {
                if (err) {
                    console.error('Error creating user:', err); // Log the error
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    // Find user by username
static findByUsername(username) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) {
                console.error('Error finding user:', err); // Log the error
                return reject(err);
            }
            
            resolve(results);
        });
    });
}


    // Find user by ID
    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err); // Reject with error
                }
                resolve(results); // Resolve with results
            });
        });
    }

    // Update user image
    static updateImage(id, image) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET image = ? WHERE id = ?';
            db.query(query, [image, id], (err, results) => {
                if (err) {
                    return reject(err); // Reject with error
                }
                resolve(results); // Resolve with results
            });
        });
    }

    // Update user details
    static updateUser(id, userDetails) {
        return new Promise((resolve, reject) => {
            const { username, dob } = userDetails; // Get username and dob for updating
            const query = 'UPDATE users SET username = ?, dob = ? WHERE id = ?';
            db.query(query, [username, dob, id], (err, results) => {
                if (err) {
                    return reject(err); // Reject with error
                }
                resolve(results); // Resolve with results
            });
        });
    }
}

module.exports = User;




// const db = require('../config/db');

// class User {
//     // Create a new user
//     static create(user, callback) {
//         const { username, password, role, dob, image } = user; // Include image
//         const query = 'INSERT INTO users (username, password, role, dob, image) VALUES (?, ?, ?, ?, ?)';
//         db.query(query, [username, password, role, dob, image], callback);
//     }

//     // Find user by username
//     static findByUsername(username, callback) {
//         const query = 'SELECT * FROM users WHERE username = ?';
//         db.query(query, [username], callback);
//     }

//     // Find user by ID
//     static findById(id, callback) {
//         const query = 'SELECT * FROM users WHERE id = ?';
//         db.query(query, [id], callback);
//     }

//     // Update user image
//     static updateImage(id, image, callback) {
//         const query = 'UPDATE users SET image = ? WHERE id = ?';
//         db.query(query, [image, id], callback);
//     }

//     // Update user details
//     static updateUser(id, userDetails, callback) {
//         const { username, dob } = userDetails; // Get username and dob for updating
//         const query = 'UPDATE users SET username = ?, dob = ? WHERE id = ?';
//         db.query(query, [username, dob, id], callback);
//     }
// }

// module.exports = User;
