const ValidateFormChild = (contact) => {
  let input = contact;
  let errors = {};
  let isValid = true;

  if (!input['childName']) {
    isValid = false;
    errors['childName'] = 'Please enter child name.';
  }

  if (!input['registerNumber']) {
    isValid = false;
    errors['registerNumber'] = 'Please enter your register Number Address.';
  }

  if (!input['registerDate']) {
    isValid = false;
    errors['registerDate'] = 'Please enter your register Date.';
  }

  if (!input['birthDate']) {
    isValid = false;
    errors['birthDate'] = 'Please enter your Birth date.';
  }

  if (!input['birthPlace']) {
    isValid = false;
    errors['birthPlace'] = 'Please enter your birth place.';
  }

  return {
    isValid,
    errors,
  };
};

export default ValidateFormChild;
