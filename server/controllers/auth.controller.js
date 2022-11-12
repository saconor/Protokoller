/* eslint-disable @typescript-eslint/no-var-requires */
const db = require('../models/index');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
exports.checkAuthentication = (req, res) => {
  let access_token = req.cookies['access-token'];
  let status = 403
  let data = {}
  if (access_token) {
    try {
      let verify = jwt.verify(access_token, config.secret);
      data = verify.data;
      status = 200;
    } catch {
      status = 403;
    }
  } 
  console.log(data)
  res.status(status).json(data);
};


exports.signup = (req, res) => {
  // Save User to Database
  
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: 'User was registered successfully!' });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: 'User was registered successfully!' });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
    include: {
      model: Role,
      required: true,
    },
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }
    let sessiondata = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      accessToken: token,
    };
    var token = jwt.sign({ data: sessiondata }, config.secret, {
      expiresIn: 24*60*1000, // 24 hours
    });


    // user
    // .getRoles()
    // .then(roles => {
    // for (let i = 0; i < roles.length; i++) {
    // sessiondata.roles.push('ROLE_' + roles[i].name.toUpperCase());
    // }
    // })
    // .catch(err => {
    // res.status(500).send({ message: err.message });
    // });
    //

    res
      .cookie('access-token', token, { httpOnly: true, secure: false, maxAge: 24*60*60*1000 })
      .status(200)
      .json({ message: 'Logged in', data: sessiondata });
  });
};
