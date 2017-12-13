// import mongoose from 'mongoose';
// import crypto from 'crypto';
// var Schema = mongoose.Schema;

// var UserSchema = new Schema({  //Class schema
//       firstName: String,
//       lastName: String,
//       username: {
//             type: String,
//             unique: true, //ห้ามซ้ำ
//             required: 'Username is required', //ถ้าซ้ำจะโชว์คำแบบนี้
//             trim: true
//       },
//       email: { type: String, unique: true },
//       password: {
//             type: String,

//             validate: [
//                   (password) => { return password && password.length >= 1; },
//                   'Password cannot be empty'
//             ] //ถ้ามันผิดแปลก มันจะโชว์ password cannot be empty
//       },
//       created: {
//             type: Date,
//             default: Date.now
//       },
//       salt: {
//             type: String
//       },//
//       provider: {
//             type: String,
//             default: 'local'
//       },
//       providerId: String,
//       providerData: {}
// });

// UserSchema.pre('save', function (next) {
//       if (this.password) {
//             this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
//             this.password = this.hashPassword(this.password);
//       }
//       next();
// });

// UserSchema.methods.hashPassword = function (password) {
//       return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
// } //ทำการhashกี่ครั้ง (1000) , 64ได้กี่ตัวอักษร
// //2functionบน ทำการhash function

// UserSchema.methods.authenticate = function (password) {
//       return this.password === this.hashPassword(password);
// }

// UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
//       var _this = this;
//       var possibleUsername = username + (suffix || '');
//       _this.findOne({
//             username: possibleUsername
//       }, (err, user) => {
//             if (!err) {
//                   if (!user) callback(possibleUsername);
//                   else {
//                         return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
//                   }
//             }
//             else {
//                   callback(null);
//             }
//       });
// }

// mongoose.model('User', UserSchema);

import mongoose from 'mongoose';
import crypto from 'crypto';
var Schema = mongoose.Schema;

var UserSchema = new Schema({
      firstName: {
            type: String,
            default: '-'
      },
      lastName: {
            type: String,
            default: '-'
      },
      gender: {
            type: String,
            default: '-'
      },
      phone: {
            type: String,
            default: '-'
      },
      status: {
            type: String,
            default: 'user'
      },
      username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
      },
      password: {
            type: String,
            validate: [
                  (password) => { return password && password.length >= 1; },
                  'Password cannot be empty'
            ]
      },
      email: {
            type: String,
            default: '-'
      },
      providerId: String,
      providerData: {},
      created: {
            type: Date,
            default: Date.now
      },
      salt: {
            type: String
      },
      provider: {
            type: String,
            default: 'local'
      }
});


UserSchema.pre('save', function (next) {
      if (this.password) {
            this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
            this.password = this.hashPassword(this.password);
      }
      next();
});

UserSchema.methods.hashPassword = function (password) {
      return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
}

UserSchema.methods.authenticate = function (password) {
      return this.password === this.hashPassword(password);
}

UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
      var _this = this;
      var possibleUsername = username + (suffix || '');
      _this.findOne({
            username: possibleUsername
      }, (err, user) => {
            if (!err) {
                  if (!user) callback(possibleUsername);
                  else {
                        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                  }
            }
            else {
                  console.log(err + "1111111")
                  callback(null);
            }
      });
}

mongoose.model('User', UserSchema);