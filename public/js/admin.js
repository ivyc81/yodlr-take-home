$(async function() {
  const users = await $.get('/users');
  console.log(users)
  showUsers(users);

  $('#userList').on("click", ".toggleState", await toggleState);
  $('#userList').on("click", ".delete", await deleteUser);
  $("#adminCreate").on("submit", createUser);
});

/**
 * accepts an array of users
 * appends users to userlist
 */
function showUsers(users){
  for(let user of users){
    let $userHTML = createUserHTML(user);
    $("#userList").append($userHTML)
  }
}

/**
 * accepts user object
 * returns userHTML
 */
function createUserHTML(user){
  const {firstName, lastName, id, state, email} = user;

  const userHTML =  $(
    `<tr id='${id}'>
      <td>${id}</td>
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td><input class='toggleState' type='checkbox' ${state === 'active' ? 'checked' : ''}></td>
      <td>${email}</td>
      <td><i class='far fa-trash-alt delete'></i></td>
    </tr>`
  );

  return userHTML;
}

/**
 * updates user state
 */
async function toggleState(evt){
  const {checked} = evt.target;
  const {id} = evt.target.parentNode.parentNode;

  const user = await $.get(`/users/${id}`);

  await $.ajax({
    method: "PUT",
    url: `/users/${id}`,
    data: {...user, state: checked ? "active" : "pending"}
  });
}

/**
 * delete user in database
 * delete user form table
 */
async function deleteUser(evt){
  const {id} = evt.target.parentNode.parentNode;
  console.log('id', id)

  await $.ajax({
    method: "DELETE",
    url: `/users/${id}`
  });
  $(`#${id}`).remove();
}

/**
 * create new user in database
 * append to table
 */
async function createUser(evt){
  evt.preventDefault();

  const email = $("#email").val();
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const state = $("#state").val() ? "active" : "pending";

  const currUsers = await $.get('/users');
  const currId = currUsers[currUsers.length - 1].id;

  const user = {email, firstName, lastName, state, id: currId + 1};
  await $.post('/users', user);

  $('form').trigger('reset');

  showUsers([user]);
}