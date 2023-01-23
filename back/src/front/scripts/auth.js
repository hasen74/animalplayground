function whichRole(theToken) {
  let codedPayload = theToken.split('.')[1];
  codedPayload = codedPayload.replace('-', '+').replace('_', '/');
  decodedPayload = JSON.parse(atob(codedPayload));
  return decodedPayload.role;
}

async function sendJSONdata() {
  const loginForm = document.querySelector('#loginForm');
  const success = document.querySelector('#success');
  try {
    const email =
      document.getElementById("log_email").value;
    const password =
      document.getElementById("log_pass").value;
    const response = await fetch(`http://localhost:3000/users/auth`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const jwt_token = await response.json();
    headerToken = JSON.stringify(jwt_token);
    splitToken = headerToken.split(':')[1];
    almostFinalToken = splitToken.replace(/}/g, '');
    stringToken = almostFinalToken.replace(/"/g, '');
    localStorage.setItem('tokens', stringToken);

    role = whichRole(headerToken);
     
    loginForm.style.display = 'none';
    success.style.display = 'block';

    if (whichRole(headerToken) === 1) {
    admin.style.display = 'block';
    } else if (whichRole(headerToken) === 0) {
    user.style.display = 'block';
    }
  } catch (error) {
    alert('Wrong email or password');
  }
}

function getToken() {
  const token = localStorage.getItem('tokens');
  document.getElementById("jwt").value = token;
};