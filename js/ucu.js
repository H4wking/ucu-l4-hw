// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,  
function validateMe(event) {
  event.preventDefault();

  const emailNode = event.target.elements['email'];
  validateEmail(emailNode);

  const nameNode = event.target.elements['name'];
  validateName(nameNode);

  const phoneNode = event.target.elements['phone'];
  validatePhone(phoneNode);
  
  const messageNode = event.target.elements['message'];
  validateMessage(messageNode);

  return false;
}

function validateEmail(node) {
  const emailErrorNode = node.parentNode.querySelector('p.help-block')
  emailErrorNode.innerHTML = '';

  let emailErrors = document.createElement('ul');
  emailErrors.setAttribute("role", "alert");

  validLength(node, emailErrors, 5, 50);

  validFormat(node, emailErrors, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  if (emailErrors.childElementCount > 0) {
    emailErrorNode.appendChild(emailErrors)
  }
}

function validateName(node) {
  const nameErrorNode = node.parentNode.querySelector('p.help-block')
  nameErrorNode.innerHTML = '';

  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute("role", "alert");

  validLength(node, nameErrors, 1);

  validFormat(node, nameErrors, /^(\w+\s\s\w+|\w+)$/);

  if (nameErrors.childElementCount > 0) {
    nameErrorNode.appendChild(nameErrors)
  }
}

function validatePhone(node) {
  const phoneErrorNode = node.parentNode.querySelector('p.help-block')
  phoneErrorNode.innerHTML = '';

  let phoneErrors = document.createElement('ul');
  phoneErrors.setAttribute("role", "alert");

  validLength(node, phoneErrors, 12);

  validFormat(node, phoneErrors, /^[+0][0-9]{3}[(]*[0-9]{2}[)]*[-\s][0-9]{3}[-\s][0-9]{2}[-\s][0-9]{2}$/);

  if (phoneErrors.childElementCount > 0) {
    phoneErrorNode.appendChild(phoneErrors)
  }
}

function validateMessage(node) {
  const messageErrorNode = node.parentNode.querySelector('p.help-block')
  messageErrorNode.innerHTML = '';

  let messageErrors = document.createElement('ul');
  messageErrors.setAttribute("role", "alert");

  validLength(node, messageErrors, 10);

  if (node.value.match(/^.*\b(?:ugly|dumb|stupid|pig|ignorant)\b.*$/)) {
    let li = document.createElement('li');
    li.innerText = 'Please restrain from using bad language';
    messageErrors.appendChild(li)
  }

  if (messageErrors.childElementCount > 0) {
    messageErrorNode.appendChild(messageErrors)
  }
}

function validLength(node, errors, lowerLimit=false, upperLimit=false) {
  if (lowerLimit) {
    if (node.value.length < lowerLimit ) {
      let li = document.createElement('li');
      li.innerText = 'Too short';
      errors.appendChild(li)
    }
  }

  if (upperLimit) {
    if (node.value.length > upperLimit ) {
      let li = document.createElement('li');
      li.innerText = 'Too long';
      errors.appendChild(li)
    }
  }
}

function validFormat(node, errors, format) {
  if (!node.value.match(format)) {
    let li = document.createElement('li');
    li.innerText = 'Invalid format';
    errors.appendChild(li)
  }
}
