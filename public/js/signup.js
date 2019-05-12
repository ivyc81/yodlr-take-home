$(async function() {
  $("#signUpForm").on("submit", createUser);
});

/**
 * creates user in database
 */
async function createUser(evt){
  evt.preventDefault();

  const email = $("#email").val();
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const user = {email, firstName, lastName};

  await $.post('/users', user);

  $('form').trigger('reset');
}