const postLogin = (username, password, setFunc) => fetch('https://nestspace-mini-project-api.vercel.app/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username: username, password: password }),
})
  .then(response => {
    if (!response.ok) {
      throw new Error('postLogin: Network response was not ok');
    }
    return response.json();
  })
  .then(j => verifyLogin(j, setFunc))
  .catch(error => {
    console.error('postLogin: There was a problem with your fetch:', error);
  });

const verifyLogin = (j, setFunc) => {
  if (j.message != "Login successful") {
    console.error('verifyLogin: Ur login was not successful:', j.message);
  } else {
    console.log('verifyLogin: ok')
    setFunc()
    window.location.replace('chat.html')
  }
}

const onClickLogin = () => {
  username = document.getElementById("usernameLogin").value
  password = document.getElementById("passwordLogin").value
  const setUser = () => {
    sessionStorage.setItem("username", username)
    sessionStorage.setItem("password", password)
  }
  postLogin(username, password, setUser)
}

