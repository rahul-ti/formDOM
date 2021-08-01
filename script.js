( function () {
  let foodsurvey = document.getElementById('foodsurvey')
  foodsurvey.addEventListener('submit', function (event) {
    let cuisines = document.querySelectorAll('input[name="mealCuisine"]:checked')
    let prefhelp = document.getElementById('prefhelp')
    if (!foodsurvey.checkValidity() || cuisines.length < 2) {
      event.preventDefault()
      event.stopPropagation()
      cuisines.length < 2 ? prefhelp.classList.add('text-danger') : prefhelp.classList.remove('text-danger')
      foodsurvey.classList.add('was-validated')
    }
    else {
      event.preventDefault()
      let formdata = new FormData(document.getElementById('foodsurvey'))
      let json = {}
      for (let key of formdata.keys()) {
        json[key] = formdata.getAll(key).join(', ')
      }
      console.log(json);
      foodsurvey.classList.remove('was-validated')
      prefhelp.classList.remove('text-danger')
      foodsurvey.reset();
      addToList(json)
    }
  }, false)
})()

async function addToList(data) {
  try {
    let formFirstName = data.formFirstName
    let formLastName = data.formLastName
    let gender = data.gender
    let formAddress = data.formAddress
    let city = data.city
    let state = data.state
    let country = data.country
    let zip = data.zip
    let mealCuisine = data.mealCuisine
    let resp = await fetch(`https://60f30ed76d44f300177888b3.mockapi.io/foodsurvey`, { method: 'POST', body: JSON.stringify({ formFirstName, formLastName,  gender,formAddress,city,state,country,zip,mealCuisine}), headers: { "Content-Type": "application/json" } })
    let respdata = await resp.json();
    console.log(respdata);
    getList();

  } catch (error) {
    console.log(error);
  }

  // let cardresponses = document.getElementById('cardresponses')
  // cardresponses.innerHTML += `
  // <div class="col">
  //   <div class="card mb-3 bg-light">
  //     <div class="card-body">
  //       <h6 class="card-title mb-0">Name:</h6>
  //       <p class="card-text mb-2">${data.formFirstName} ${data.formLastName}</p>
  //       <h6 class="card-title mb-0 mt-2">Gender:</h6>
  //       <p class="card-text  mb-2">${data.gender}</p>
  //       <h6 class="card-title mb-0 mt-2">Address:</h6>
  //       <p class="card-text  mb-2">${data.formAddress} <br> ${data.city}, ${data.state}, ${data.country} ${data.zip}</p>
  //       <h6 class="card-title mb-0 mt-2">Cuisine Preferences:</h6>
  //       <p class="card-text  mb-2">${data.mealCuisine}</p>
  //     </div>
  //   </div>
  // </div>`;
}




// //event listener needs to be added only once. if the line gets run multiple times, the will be n number of event listeners.
// document.getElementById("addName").addEventListener("click", function () { addName() });
// //Submits the form and refreshes the list to add a new name
// async function addName() {
//   try {
//     let name = document.getElementById('name').value;
//     let city = document.getElementById('city').value;
//     let date = document.getElementById('date').value;
//     let resp = await fetch(`https://60f30ed76d44f300177888b3.mockapi.io/hlist`, { method: 'POST', body: JSON.stringify({ name, city, date }), headers: { "Content-Type": "application/json" } })
//     let data = await resp.json();
//     console.log(data);
//     document.querySelector('form').reset();
//     getList();

//   } catch (error) {
//     console.log(error);
//   }
// }

//fetch to get list from mockapi
async function getList() {
  let resp = await fetch('https://60f30ed76d44f300177888b3.mockapi.io/foodsurvey')
  let data = await resp.json();
  console.log(data)
  updateList(data)
}
//renders the list
function updateList(data) {
  console.log(data,"in update list");
  let cardresponses = document.getElementById('cardresponses')
  data.length !== 0 ? cardresponses.innerHTML = '' : cardresponses.innerHTML = `<div class='mb-4'>No responses recorded yet</div>`;
  for (let index = data.length; index > 0; index--) {
    const element = data[index-1]
    console.log(element);

    cardresponses.innerHTML += `
    <div class="col">
      <div class="card mb-3 bg-light">
        <div class="card-body">
          <h6 class="card-title mb-0">Name:</h6>
          <p class="card-text mb-2">${element.formFirstName} ${element.formLastName}</p>
          <h6 class="card-title mb-0 mt-2">Gender:</h6>
          <p class="card-text  mb-2">${element.gender}</p>
          <h6 class="card-title mb-0 mt-2">Address:</h6>
          <p class="card-text  mb-2">${element.formAddress} <br> ${element.city}, ${element.state}, ${element.country} ${element.zip}</p>
          <h6 class="card-title mb-0 mt-2">Cuisine Preferences:</h6>
          <p class="card-text  mb-2">${element.mealCuisine}</p>
        </div>
      </div>
    </div>`;
  }
}

getList();