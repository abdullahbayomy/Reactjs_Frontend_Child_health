const ValidateFormUser = (contact) => {
  let input = contact;
  let errors = {};
  let isValid = true;

  if (!input['name']) {
    isValid = false;
    errors['name'] = 'Please enter your name.';
  }

  if (!input['email']) {
    isValid = false;
    errors['email'] = 'Please enter your email Address.';
  }

  if (typeof input['email'] !== 'undefined') {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(input['email'])) {
      isValid = false;
      errors['email'] = 'Please enter valid email address.';
    }
  }

  if (!input['phone']) {
    isValid = false;
    errors['phone'] = 'Please enter your phone.';
  }

  if (!input['address']) {
    isValid = false;
    errors['address'] = 'Please enter your address.';
  }

  if (!input['password']) {
    isValid = false;
    errors['password'] = 'Please enter your password.';
  }

  if (!input['password2']) {
    isValid = false;
    errors['password2'] = 'Please enter your confirm password.';
  }

  if (
    typeof input['password'] !== 'undefined' &&
    typeof input['password2'] !== 'undefined'
  ) {
    if (input['password'] !== input['password2']) {
      isValid = false;
      errors['password'] = "Passwords don't match.";
    }
  }

  return {
    isValid,
    errors,
  };
};

export default ValidateFormUser;
