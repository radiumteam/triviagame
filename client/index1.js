

$(document).ready(function () {
  // function open
  $('#goto-question-from-signup').click(() => {
    let user = $('#newuser').val();
    let pass = $('#newpass').val();
    console.log(user);
    console.log(pass);
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ newUsername: user, newPassword: pass }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: "include"
    })
      .then(obj => {
        if (obj.status === 200) {
          console.log(obj);
        } else {
          console.log('ERROR');
        }
      })
      .then(() => {
        // window.location.replace('/')

      })
      .catch(error => console.error('Error:', error));

  })
})
