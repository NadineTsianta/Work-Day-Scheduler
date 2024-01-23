let today = dayjs();

let userInputEl = $('.description');
let saveBtnEl = $('.saveBtn');
let timeBlockEl = $('.time-block')


//To add the date on top of the screen
$('#currentDay').text(today.format("dddd D, MMMM"));


// Retrieve stored data on page load
function loadStoredData() {
    userInputEl.each(function () {
        let userInput = $(this);
        let timeBlock = userInput.closest('.row').find('.time-block').text();
        let key = today.format('YYYY-MM-DD') + ' ' + timeBlock;
        let storedData = localStorage.getItem(key);

        if (storedData) {
            userInput.val(storedData);
        }
    });
}

// Call the function to load stored data
loadStoredData();



function userSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    userInputEl.each(function () {
        let userInput = $(this);
        let timeBlock = userInput.closest('.row').find('.time-block').text();//Find  the closest parent with the class .row, then finds the child with the class. To ensure that I get the correct time block associated with the user input.
        let key = today.format('YYYY-MM-DD') + ' ' + timeBlock; //Create a key using the date . To ensure that each entry has a unique identifier.
        let toDo = userInput.val();
        localStorage.setItem(key, toDo); //to retrieve stored data
    });
}

saveBtnEl.on('click', userSubmit)



//to change the colour of the timeblocks

function updateColours() {

    let currentHour = today.hour();
    
    timeBlockEl.each(function () {
        let currentBlock = $(this);
        let timeText = currentBlock.closest('.row').find('.time-block').text();
        let blockTime = dayjs(timeText, 'hh a');
        
        if (blockTime.isBefore(today, 'hour')) {
            currentBlock.addClass('past').removeClass('present future');
        } else if (blockTime.isSame(today, 'hour')) {
            currentBlock.addClass('present').removeClass('past future');
        } else {
            currentBlock.addClass('future').removeClass('past present');
        }
    });
    
}

updateColours();



setInterval(function () {
    let newHour = dayjs().hour();
    if (newHour !== today.hour()) {
        today = dayjs();
        $('#currentDay').text(today.format("dddd D, MMMM"))
        updateColours()
    }
}, 60000);