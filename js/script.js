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
   // looping the buttons for DOM elements
   for (let i = 1; i <= numOfPages.length; i += 1) {
      if (i <= numOfPages) {
         const li = `
         <li>   
            <button type="button">${i+1}</button>
         </li>
         ` ;
         linkList.insertAdjacentHTML('beforeend', li);
      }
   }
   // Interactivity of the buttons
   buttons = linkList.querySelectorAll("li button");
   buttons.className = "active";
   firstButton = buttons[1];
   

   linkList.addEventListener('click', (e) => {
      const eventTarget = e.target;
  
      if (eventTarget.tagName === 'button') {
         const condition = firstButton.querySelector(".active");
         condition.className = "active"; 
      } else {
         condition.className = "";
      }
   const pageNumber = eventTarget.textContent;
   showPage (list, pageNumber);
   });
}



// Call functions
showPage(data, 1)
addPagination(data)