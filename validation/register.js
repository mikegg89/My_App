const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.user_name = !isEmpty(data.user_name) ? data.user_name : '';
  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.user_name, { min: 2, max: 30 })) {
    errors.user_name = 'User Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.user_name)) {
    errors.user_name = 'User Name field is required';
  }

  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = 'First Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = 'First Name field is required';
  }

  if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = 'Last Name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = 'Last Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
