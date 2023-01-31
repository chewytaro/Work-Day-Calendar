// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function (event) {

  //displays the time
  var timeDisplayEl = $('#currentDay'); 
    var timeNow = dayjs().format('MMM DD, YYYY');
    timeDisplayEl.text(timeNow);

  //Save Button
  var saveButtonEl = $('.saveBtn'); 
  saveButtonEl.on('click', function(event) {
    var parent =  $(this).parent().attr("id");
    var hour = parseInt(parent.slice(5));
    var todayDay = dayjs().format('YYYY-MM-DD' + hour); 
    var currentHour = dayjs(todayDay);
    var today = dayjs().format('YYYY-MM-DD H');
    var timePast = currentHour.diff(today, 'hour');
    var schedule = document.querySelector('#' + parent + ' textarea').value;
    localStorage.setItem(parent, schedule); 
  }); 

//Changes the color of the block depending on the time of day
  $('.time-block').each(function (event) {
    var parent =  $(this).attr("id");
    var hour = parseInt(parent.slice(5));
    var todayDay = dayjs().format('YYYY-MM-DD ' + hour); 
    var currentHour = dayjs(todayDay);
    var today = dayjs().format('YYYY-MM-DD H');
    var timePast = currentHour.diff(today, "hour");
    console.log(timePast);
    if (timePast === 0) {
      $(this).addClass('present');
    }
    if (timePast > 0) {
      $(this).addClass('future');
    } 
    if (timePast < 0) {
      $(this).addClass('past');
    } 
  });

  //Saves content to actual right block
  $('.time-block').each(function (event) {
    var parent =  $(this).attr("id");
    var hour = parseInt(parent.slice(5));
    var todayDay = dayjs().format('YYYY-MM-DD' + hour); 
    var currentHour = dayjs(todayDay);
    var today = dayjs().format('YYYY-MM-DD H');
    var timePast = currentHour.diff(timeNow);
    var schedule = localStorage.getItem(parent);
    if (schedule != null) {
      document.querySelector('#' + parent + ' textarea').value = schedule; 
    }
  });
  
});


