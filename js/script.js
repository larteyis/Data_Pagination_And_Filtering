/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

//Function to accept data and index
function showPage (list, page) {
   const itemsPerPage = 9;
   const startIndex = (page*itemsPerPage)-itemsPerPage;
   const endIndex = page*itemsPerPage;
   const studentList = document.querySelector(".student-list");
   studentList.innerHTML = "";
   //Looping the profiles to display in the DOM
   for (let i = 0; i < list.length; i += 1) {
      let lists = list[i];
      
      if ( i >= startIndex && i < endIndex){
         const li = document.createElement('li');
         li.classList.add('student-item', 'cf');
         li.innerHTML = `
          <div class="student-details">
            <img class="avatar" src=${lists.picture.large} alt="Profile Picture">
            <h3> ${lists.name.first} ${lists.name.last} </h3>
            <span class="email"> ${lists.email} </span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${lists.registered.date}</span>
          </div>
       `;
      studentList.append(li);
      }
   }
     
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

//Function to accept parameter and create buttons.
function addPagination (list){
   const itemsPerPage = 9;
   let numOfPages = Math.ceil(list.length/itemsPerPage);
   let linkList = document.querySelector(".link-list");
   linkList.innerHTML = "";
   for (let i = 0; i <= list.length/itemsPerPage; i++) {
      let page = 1 + i;
         const li = `
         <li>   
            <button type="button">${page}</button>
         </li>
         ` ;
         linkList.insertAdjacentHTML('beforeend', li);
   }
   // Interactivity of the buttons
   buttons = linkList.querySelectorAll("li button");
   firstButton = buttons[0];
   firstButton.className = "active";

   linkList.addEventListener('click', (e) => {
      const eventTarget = e.target;
   // If pagination button is clicked highlight the active page
      if (eventTarget.type === 'button') {
         for (const button of buttons) 
         { button.classList.remove('active');
           eventTarget.classList.add('active');
         }
   const pageNumber = eventTarget.textContent;
   showPage (list, pageNumber);
      }
   });
}

// Call functions
showPage(data, 1)
addPagination(data)


// creates textbox and button for search
let searchBar =`
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

let h2 = document.querySelector('h2');
h2.insertAdjacentHTML('afterend', searchBar);

let input = document.querySelector('input');
let searchButton = document.querySelector('button');
const notFound = document.createElement('p'); //paragraph to hold not found message if search is unsuccessful
notFound.className = 'no-results';
const label = input.parentNode;
const div = search.parentNode;
div.appendChild(notFound);

let filter = () => {
   let text = input.value;
   let filteredStudents = [];
   notFound.textContent = '';

   if (text.includes(' ')) {   
      return [];
   } else {
      for (let i=0; i < data.length; i++) {
         const existingName = `${data[i]['name']['first']} ${data[i]['name']['last']}`.toUpperCase();
         if (existingName.includes(text.toUpperCase())) {
            filteredStudents.push(data[i]);

         }
      }
   }
   
   if (filteredStudents.length === 0 ) { // if there are no matches, shows "No results found" message 
      notFound.textContent = "No results found";
      const pagination = document.querySelector('.pagination');
      pagination.style.display = 'none';
   }
         showPage(filteredStudents, 1); 
         addPagination(filteredStudents);
}
         

// keyup event listener filters list in real-time as the user types the name. 
label.addEventListener('submit', filter);
input.addEventListener('keyup', filter);




