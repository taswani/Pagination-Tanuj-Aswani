let students = $('.student-item'); //variable to hold all students in an array.
const studentList = []; //puts all students into any array.
const studentsNames = $('h3'); //variable to input all the students names for the search function.
const studentsEmails = $('.email'); //variable to input all the students emails for the search function.
let searchResults = []; //sets up an array to put all the search results into.
let currentPage = 1; //sets up a current page variable to backtrack to the current page after a search.
let searchMode = false; //boolean value to assess whether or not a search is being conducted.

//show page function to accurately hide students and display the ones that are between the range values.
//also designed to only display current page after search mode has been set to off or False.
function showPage(pageNumber, sList) {
  if (searchMode === false) {
    currentPage = pageNumber;
  }
  students.hide();
  for (let i = 0; i < sList.length; i++){
    if ((10 * (pageNumber - 1)) <= i && i <= ((pageNumber * 10) - 1)) {
      sList[i].show();
    }
  };
};

//appends links to the pages based on a click event that also adds an active class if the person is currently on the page.
//takes in a different array for a parameter depending on search or just base student pagination.
function appendPageLinks(sList) {
  let pageLinksSection = $('<div class="pagination"></div>').appendTo('.page');
  let pageNums = Math.ceil(sList.length / 10); //variable to hold the amount of pagination links needed.
  for (let i = 0; i < pageNums; i++) {
    $('.pagination').append('<li><a href="#' + (i + 1) + '">' + (i + 1) + '</a></li>');
  };
  $('a[href^="#1"]').addClass('active');
  $('a[href^="#"]').on('click', function(){
    $('a').removeClass('active');
    $(this).addClass('active');
    let numString = $(this).text();
    numString = parseInt(numString);
    showPage(numString, sList);
  })
};

//creates the array from the jquery selection of $('.student-item').
function createArr () {
  for (let i = 0; i < students.length; i++) {
    studentList.push(students.eq([i]));
  }
}

//creates the error message the user receives when they type in a search value that doesn't exist.
function displayNone () {
  $('.page').append('<div id="sorry">Sorry, no results matched your search.</div>');
}

//useful function to help reset any error messages, links, and irrelevant students every time there is a search.
function searchReset () {
  students.hide();
  $('.pagination').remove();
  $('#sorry').remove();
  searchResults = [];
}

//useful function that pairs the showPage and the appendPageLinks for the search function aspect of the pagination.
function searchLinkGeneration () {
  showPage(1, searchResults);
  appendPageLinks(searchResults);
}

//contains the majority of the process that occurs when the user activates a keyup or click event in the search box.
function searchProcess () {
  searchReset();
  let input = $('.search-input').val().toLowerCase();
  if (input === '') {
    searchMode = false;
    showPage(currentPage, studentList);
    appendPageLinks(studentList);
    $('a').removeClass('active');
    $('a[href^="#' + currentPage + '"]').addClass('active');
  } else {
    searchMode = true;
    let count = 0;
    for (let i = 0; i < studentList.length; i++) {
      if (studentsNames[i].innerHTML.toLowerCase().includes(input) == true ||
      studentsEmails[i].innerHTML.toLowerCase().includes(input) == true) {
        searchResults.push(studentList[i]);
        count += 1;
      }
    }
    searchLinkGeneration();
    if (count < 1) {
      displayNone();
    }}
}

//appends search bar into html and provides the keyup and click events for the user interaction.
function searchBar () {
  $('.page-header').append(
    '<div class="student-search">' +
    '<input class="search-input" placeholder="Search for students">' +
    '<button class="search-button">Search</button></div>'
  );
  $('.search-input').on('keyup', function() {
    searchProcess();
  });
  $('.search-button').on('click', function() {
    searchProcess();
  })
}

//calling all the functions necessary for the page to run.
createArr();
searchBar();
appendPageLinks(studentList);
showPage(1, studentList);
