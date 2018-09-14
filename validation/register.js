const isEmpty = require('./is-empty');
const Validator = require('validator');


module.exports = function validateRegisterInput(data) {
  let errors = {};

  if(!Validator.isLength(data.first_name, {min: 2, max: 30 })){
    errors.first_name = "name must be between 2 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
