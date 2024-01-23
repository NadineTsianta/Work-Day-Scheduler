let today = dayjs();

let userInputEl = $('.description');
let saveBtnEl = $('.saveBtn');
let timeBlockEl = $('.time-block')


//To add the date on top of the screen
$('#currentDay').text(today.format("dddd D, MMMM"));





function userSubmit() {
    userInputEl.each(function () {
        let userInput = $(this);
        let storedData = localStorage.getItem(userInput.attr('id'));

        if (storedData) {
            // If there is stored data, update the input value
            userInput.val(storedData);
        }
    });
}



//to change the colour of the timeblocks

function updateColours() {

    
    timeBlockEl.each(function () {
        let timeBlock = $(this);
        let timeText = timeBlock.find('.time-block').text();
        let blockTime = dayjs(timeText, 'hh A');
        
        if (blockTime.isBefore(today, 'hour')) {
            timeBlock.addClass('past').removeClass('present future');
        } else if (blockTime.isSame(today, 'hour')) {
            timeBlock.addClass('present').removeClass('past future');
        } else {
            timeBlock.addClass('future').removeClass('past present');
        }
    });
    let relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    
    let time = dayjs.extend(relativeTime);
    dayjs().from(dayjs('1990-01-01')) // in 31 years
    dayjs().from(dayjs('1990-01-01'), true) // 31 years
    dayjs().fromNow()
    
    dayjs().to(dayjs('1990-01-01')) // "31 years ago"
    dayjs().toNow()
}

updateColours();

setInterval(updateColours, 60000);