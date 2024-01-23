let today = dayjs();
let time = dayjs.extend(relativeTime);
let userInputEl = $('.description');
let saveBtnEl = $('.saveBtn');
let timeBlockEl = $('.time-block')



$('#currentDay').text(today.format("dddd D, MMMM"));

let userSubmit = function (event) {
    event.preventDefault();

    let toDo = userInputEl.val();
};


saveBtnEl.on('click', userSubmit);

function updateColours() {
    timeBlockEl.each(function () {
        let timeBlock = $(this);
        let timeText = timeBlock.find('.time').text();
        let blockTime = dayjs(timeText, 'hh A');

        if (blockTime.isBefore(today, 'hour')) {
            timeBlock.addClass('past').removeClass('present future');
        } else if (blockTime.isSame(today, 'hour')) {
            timeBlock.addClass('present').removeClass('past future');
        } else {
            timeBlock.addClass('future').removeClass('past present');
        }
    });
}

updateColours();

setInterval(updateColours, 60000);