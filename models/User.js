// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const SALT_WORK_FACTOR = 10;

// const UserSchema = new mongoose.Schema({
//     // user: {
//     //     type: String,
        
//     // },
//     user: {
//         type: String,
        
//     },
//     password: {
//         type: Date,
        
//     },
//     // repassword: {
//     //     type: String,
     
      
//     // },
//     // is_active: {
//     //     type: Boolean,
//     //     default: true,
//     // },
// });

// UserSchema.pre('save', function(next) {
//     const user = this;
//     if (!user.isModified('password')) return next();
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
//             user.password = hash;
//             next();
//         });
//     });
// });

// module.exports = mongoose.model('User', UserSchema);



// const user =  () => {
//     return client.query(`insert into administrador(id_user,email,password) values ('${user.id}', '${user.email}', '${user.password}')`);
// };