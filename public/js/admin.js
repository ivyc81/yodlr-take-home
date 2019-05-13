let currUsers;

$(async function() {
  currUsers = await $.get('/users');
  showUsers(currUsers);

  $('#userList').on("click", ".toggleState", await toggleState);
  $('#userList').on("click", ".delete", await deleteUser);
  $('table').on("click", "th", await sortUser);
  $("#adminCreate").on("submit", await createUser);
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

  for(let user of currUsers){
    if(user.id === +id || user.id === id){
      user.state = user.state === "active" ? "pending" : "active";
    }
  }
}

/**
 * delete user in database
 * delete user form table
 */
async function deleteUser(evt){
  const {id} = evt.target.parentNode.parentNode;

  await $.ajax({
    method: "DELETE",
    url: `/users/${id}`
  });
  $(`#${id}`).remove();
  currUsers = currUsers.filter(user => user.id !== +id && user.id !== id);
}

/**
 * sort user by different criteria
 * sort asc if sorting by the tag for the first time
 * toggle beteen desc/asc if sorting by the same tag after the first time
 */
async function sortUser(evt){
  const tag = evt.target.getAttribute('name');
  const currSort = $(evt.target).children("i").attr('class');
  $("#userList").empty();

  if(currSort === "fas fa-sort" || currSort === "fas fa-sort-down"){
    $("th>i").attr("class", "fas fa-sort");
    $(evt.target).children("i").attr('class', "fas fa-sort-up");

    function compare(a, b){
      if (a[tag] < b[tag]){
        return -1;
      }
      if (a[tag] > b[tag]){
        return 1;
      }
      return 0;
    }
  } else {
    $(evt.target).children("i").attr('class', "fas fa-sort-down");

    function compare(a, b){
      if (a[tag] < b[tag]){
        return 1;
      }
      if (a[tag] > b[tag]){
        return -1;
      }
      return 0;
    }
  }

  const sortedUsers = currUsers.sort(compare);
  showUsers(currUsers);
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
  const state = $("#state").is(':checked') ? "active" : "pending";

  const user = {email, firstName, lastName, state};
  const newUser = await $.post('/users', user);

  $('form').trigger('reset');

  showUsers([newUser]);
  currUsers.push(newUser);
}