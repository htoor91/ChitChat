const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  aviUrl: {
    type: String
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();


  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.pre('save', function(next){
  if(!this.aviUrl){
    const aviUrls = [
      'https://res.cloudinary.com/htoor91/image/upload/v1501461853/chitchat_1_bksazr.png',
      'https://res.cloudinary.com/htoor91/image/upload/v1501461853/chitchat_2_jwwm4s.png',
      'https://res.cloudinary.com/htoor91/image/upload/v1501461853/chitchat_3_ov1pzy.png',
      'https://res.cloudinary.com/htoor91/image/upload/v1501461853/chitchat_4_n9oahl.png',
      'https://res.cloudinary.com/htoor91/image/upload/v1501461853/chitchat_5_veiq3b.png',
      'https://res.cloudinary.com/htoor91/image/upload/v1501461853/chitchat_6_nh7wgh.png'
    ];
    const randomIndex = Math.floor(Math.random() * aviUrls.length);
    const aviUrl = aviUrls[randomIndex];
    this.aviUrl = aviUrl;
  }

  next();
});

UserSchema.methods = {
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return '';
    } else {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  },
  toJson: function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  }
};


module.exports = mongoose.model('user', UserSchema);
