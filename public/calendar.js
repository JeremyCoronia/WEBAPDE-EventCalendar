var id = 0

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd
    var calendar = new FullCalendar.Calendar(calendarEl, {
        height: "parent",
        contentHeight: 500,
        plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list'],
        header: {
            left: 'prev,next today,addEventButton,searchEventButton',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listYear'
        },
        views: {
            listYear: {
                buttonText: 'all events'
            }
        },
        customButtons: {
            addEventButton: {
                text: 'add event',
                click: function() {                    
                    openAddEvent()
                    $("#add").off("click").on("click", function (event) {
                        event.preventDefault()
                        AddEvent(calendar, null, true)
                    })
                }   
            },
            searchEventButton: {
                text: 'search',
                click: function() {
                    openSearchEvent()
                    $("#search").off("click").on("click", function (e) {
                        e.preventDefault
                        var key = $("#sname").val()
                    
                        var events = calendar.getEvents()
                        var select = document.getElementById("searchby").value

                        if (select == "Event Title") {
                            if (events.some(e => e.title === key)) {
                                
                                // var index = events.indexOf(key)
                                var index = events.map(function(e) { return e.title; }).indexOf(key);
                                // alert("Event found")
                                var start = FullCalendar.formatDate(events[index].start, {
                                    month: 'long',
                                    year: 'numeric',
                                    day: 'numeric',
                                    timeZoneName: 'short',
                                    timeZone: 'local'
                                    })
                                var date = getDate(start)
                                calendar.gotoDate(date)
                            }
                            else 
                                $("#eventNotFound").show()
                                // alert("Event not found")
                        }
                        else {
                            var date = $("#sdate").val()

                            if (date)
                                calendar.gotoDate(date)
                            else
                                $("#invalidData").show()
                                // alert("Invalid date")
                            
                        }
                    })
                }
            }
        },
        eventRender: function(info) {
            var tooltip = new Tooltip(info.el, {
              title: info.event.extendedProps.description,
              placement: 'top',
              trigger: 'hover',
              container: 'body'
            })
        },
        eventClick: function(info) {
            openEventDetails(info.event, calendar)
        },
        events: [
            {
                title: "New Year's Day",
                start: "2019-01-01",
                editable: false
            },
            {
                title: "Araw ng Republikang Filipino",
                start: "2019-01-23",
                editable: false
            },
            {
                title: "Valentine's Day",
                start: "2019-02-14",
                editable: false
            },
            {
                title: "EDSA Day",
                start: "2019-02-25",
                editable: false
            },
            {
                title: "National Women's Day",
                start: "2019-03-08",
                editable: false
            },
            {
                title: "Holy Week",
                start: "2019-04-14",
                end: "2019-04-21",
                editable: false
            },
            {
                title: "Labor's Day",
                start: "2019-05-01",
                editable: false
            },
            {
                title: "Independence Day",
                start: "2019-06-12",
                editable: false
            },
            {
                title: "Republic Day",
                start: "2019-07-04",
                editable: false
            },
            {
                title: "Police Service Anniversary",
                start: "2019-08-08",
                editable: false
            },
            {
                title: "Philippine Medicine Day",
                start: "2019-09-15",
                editable: false
            },
            {
                title: "United Nations Day",
                start: "2019-10-24",
                editable: false
            },
            {
                title: "All Saints Day",
                start: "2019-11-01",
                editable: false
            },
            {
                title: "All Souls Day",
                start: "2019-11-02",
                editable: false
            },
            {
                title: "Bonifacio Day",
                start: "2019-11-30",
                editable: false
            },
            {
                title: "Christmas Day",
                start: "2019-12-25",
                editable: false
            },
            {
                title: "Rizal Day",
                start: "2019-12-30",
                editable: false
            },
            {
                title: "New Year's Eve",
                start: "2019-12-31",
                editable: false
            },
        ],
        defaultDate: today,
        navLinks: true, // can click day/week names to navigate views
        businessHours: true, // display business hours
        editable: true,
        eventStartEditable: true,
        eventLimit: true
    });

calendar.render();
});

$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      var events = $("#calendar").fullCalendar('clientEvents')
      $("#myUL").empty()
      for (let i = 0; i < events.length; i++)  {
          $("#myUL").append("<li><a href='#'>"+events[i].title+"</a></li>")
      }
      $("#myList li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
// calendar.option('aspectRatio', 2)


function openEventDetails(event, calendar) {
    var modal = document.getElementById("myModal")
    
    modal.style.display = "block";
    
    var child = modal.lastElementChild;  
        while (child) { 
            modal.removeChild(child); 
            child = modal.lastElementChild; 
        } 
    
    $("#myModal").append("<div class='modal-content'><span class='close'>&times;</span></div><br>")

    var span = document.getElementsByClassName("close")[0];
    
    var start = FullCalendar.formatDate(event.start, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        timeZoneName: 'short',
        timeZone: 'local'
      })
    var end = FullCalendar.formatDate(event.end, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        timeZoneName: 'short',
        timeZone: 'local'
      })
        
    
    if (!end){
        $(".modal-content").append("<h3>National Holiday</h3><br>")
        $(".modal-content").append("<span class='content'>Title: "+ event.title +"</span><br>")
        $(".modal-content").append("<span class='content'>Start: "+ getDate(start) +"</span><br>")
    }
    else{
        $(".modal-content").append("<span class='content'>Title: "+ event.title +"</span><br>")
        $(".modal-content").append("<span class='content'>Start: "+ getDate(start) +"</span><br>")
        if (event.allDay) {
            $(".modal-content").append("<span class='content'>End: "+ customed_display(getDate(end)) +"</span><br>")
            $(".modal-content").append("<span class='content'>All day: Yes</span><br>")
        }
        else {
            $(".modal-content").append("<span class='content'>End: "+ getDate(end) +"</span><br>")
            $(".modal-content").append("<span class='content'>All day: No</span><br>")
            $(".modal-content").append("<span class='content'>Start time: " + getTime(start) + "</span><br>")
            $(".modal-content").append("<span class='content'>End time: " + getTime(end) + "</span><br>")
        }
        $(".modal-content").append("<span class='content'>Description: "+ event.extendedProps.description +"</span><br>")
        $(".modal-content").append("<span class='content'>Venue: "+ event.extendedProps.venue +"</span><br>")
        if (event.backgroundColor == "#257E4A") {
            $(".modal-content").append("<span class='content'>Priority: Low </span><br>")
        }
        else if (event.backgroundColor == "#FFA600") {
            $(".modal-content").append("<span class='content'>Priority: Medium </span><br>")
        }
        else {
            $(".modal-content").append("<span class='content'>Priority: High </span><br>")
        }
        
        if (event.borderColor == "#00294f") {
            $(".modal-content").append("<span class='content'>Category: Work </span><br>")
        }
        else if (event.borderColor == "black") {
            $(".modal-content").append("<span class='content'>Category: Academic </span><br>")
        }
        else if (event.borderColor == "#500778") {
            $(".modal-content").append("<span class='content'>Category: Social </span><br>")
        }
        else if (event.borderColor == "#8C8279") {
            $(".modal-content").append("<span class='content'>Category: Personal </span><br>")
        }
        else {
            $(".modal-content").append("<span class='content'>Category: Others </span><br>")
        }
        
        $(".modal-content").append("<button type='button' class='btn' id='editevent'>Edit</button>")
        $(".modal-content").append("<button type='button' class='btn' id='deleteevent'>Delete</button><br>")        
    
        // functionality for edit button
        $("#editevent").off("click").on("click", function(e) {
            modal.style.display = "none";
            openEditEvent()
            editEventDetails(event, calendar)
        })
    
        // functionality for delete button
        $("#deleteevent").off("click").on("click", function(e) {
            event.remove()
            modal.style.display = "none";
            // alert("Deleted event successfully")
            $("#deletedEvent").show()
        })
    }
    
    window.onclick = function(e) {
        if (e.target == modal)
            modal.style.display = "none";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
}

function editEventDetails(event, calendar) {    
    var start = FullCalendar.formatDate(event.start, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        timeZoneName: 'short',
        timeZone: 'local'
      })
    var end = FullCalendar.formatDate(event.end, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        timeZoneName: 'short',
        timeZone: 'local'
      })
    $("#astartdate").val(getDate(start))
    $("#aenddate").val(customed_display(getDate(end)))
    $("#aname").val(event.title)
    $("#adescrip").val(event.extendedProps.description)
    
    $("#avenue").val(event.extendedProps.venue)
    $("#aallday").prop('checked', event.allDay)

    enableAllDay()
    
    if (!event.allDay) {
        var starttime = getTime(start)
        var endtime = getTime(end)
        $("astarttime").val(starttime)
        $("aendtime").val(endtime)
    }

    $("#edit").off("click").on("click", function (e) {
        e.preventDefault
        AddEvent(calendar, event, false)
    })
}


function AddEvent(calendar, event, is_adding) {    
    var eventstartdate = document.getElementById("astartdate");
    var eventenddate = document.getElementById("aenddate");
    var eventstarttime = document.getElementById("astarttime")
    var eventendtime = document.getElementById("aendtime")
    var eventname = document.getElementById("aname")
    var eventdescrip = document.getElementById("adescrip")
    var eventvenue = document.getElementById("avenue")
    var eventpriority = document.getElementById("apriority")
    var eventallday = document.getElementById("aallday")
    var ecategory = document.getElementById("acategory")
    var eventstart
    var eventend
    var priority, category

    if (ecategory.value == "work") {
        category = "#00294f"
    }
    else if (ecategory.value == "academic") {
        category = "black"
        console.log("pumasok here")
    }
    else if (ecategory.value == "social") {
        category = "#500778"
    }
    else if (ecategory.value == "personal") {
        category = "#8C8279"
    }
    else {
        category = "#A4DBE8"
    }
    // combines date and time
    if (!eventallday.checked) {
        eventstart = eventstartdate.value + "T" + eventstarttime.value + ":00"
        eventend = eventenddate.value + "T" + eventendtime.value + ":00"
    }
    else {
        
        eventstart = eventstartdate.value
        eventend = eventenddate.value
    }
    
    enableAllDay()

    // priority associate with background color
    if (eventpriority.value == "Low") {
        priority = "#257E4A"
    }
    else if (eventpriority.value == "Medium") {
        priority = "#FFA600"
    }
    else if (eventpriority.value == "High"){
        priority = "#FF3636"
    }
    // for fixing bug
    eventend = check_enddate(eventend, eventallday.checked)

    // checks if there's a blank field
    var details = document.getElementsByClassName("adetails")
    var is_null = false
    for (let i=0; i<details.length && !is_null; i++) {
        if (!details[i].value) {
            is_null = true
        }            
    }
    if (is_null)
        $("#missData").show()
        // alert("Missing data, please try again")

    
    // adding event
    else if (is_adding){
        calendar.addEvent({
            id: id,
            start: eventstart,
            end: eventend,
            title: eventname.value,
            description: eventdescrip.value,
            venue: eventvenue.value,
            allDay: eventallday.checked,
            backgroundColor: priority,
            borderColor: category
        })                  

        $("#addedEvent").show()
        // alert("Successfully added an event!")
        closeAddEvent()
        
        calendar.gotoDate(eventstartdate.value)

        eventstartdate.value = ""
        eventenddate.value = ""
        eventstarttime.value = ""
        eventendtime.value = ""
        eventname.value = ""
        eventdescrip.value = ""
        eventvenue.value = ""
        eventpriority.selectedIndex = 0
        eventallday.checked = false
        id++
    }

    // editing event
    else {
        event.setDates(eventstart, eventend, {
            allDay: eventallday.checked
        })
        event.setProp("title", eventname.value)
        event.setExtendedProp("description", eventdescrip.value)
        event.setExtendedProp("venue", eventvenue.value)
        event.setProp("backgroundColor", priority)
        event.setProp("borderColor", category)

        $("#calendar").fullCalendar('updateEvent', event)

        calendar.gotoDate(eventstartdate.value)
        $("#editedEvent").show()
        // alert("Successfully edited an event!")
        closeAddEvent()

        eventstartdate.value = ""
        eventenddate.value = ""
        eventstarttime.value = ""
        eventendtime.value = ""
        eventname.value = ""
        eventdescrip.value = ""
        eventvenue.value = ""
        eventpriority.selectedIndex = 0
        eventallday.checked = false
        
    }
}

// function EditEvent(calendar, event){

//     // kulang pa from add event

//     if (is_null)
//         alert("Missing data, please try again")
    
//     // editing event
//     else {        
        
        
//     }    
// }


var new_width

function openAddEvent(){
    $("#addevent").show()
    $("#add").show()
    $("#edit").hide()
    $("#searchevent").hide()
    new_width = $(window).width() - $("#addevent").width()

    $('#calendar').width(new_width + "px")
    $('#calendar-container').width(new_width + "px")
    
}
function closeAddEvent() {
    document.getElementById("addevent").style.display = "none";
    $("#calendar").width("90%")
    $("#calendar-container").width("100%")    
}
function openEditEvent() {
    $("#addevent").show()
    $("#searchevent").hide()
    $("#add").hide()
    $("#edit").show()
    new_width = $(window).width() - $("#addevent").width()
    $('#calendar').width(new_width + "px");
    $('#calendar-container').width(new_width + "px");
}
function closeEditEvent() {
    $("#editevent").hide()
    $("#calendar").width("90%")
    $("#calendar-container").width("100%")
}
function openSearchEvent(){
    document.getElementById("searchevent").style.display = "block";
    $("#addevent").hide()
    $("#editevent").hide()
    new_width = $(window).width() - $("#searchevent").width()    
    $('#calendar').width(new_width + "px");
    $('#calendar-container').width(new_width + "px");
}
function closeSearchEvent(){
    document.getElementById("searchevent").style.display = "none";
    $('#calendar').width("90%");
    $("#calendar-container").width("100%")
}


function enableAllDay() {
    if (document.getElementById("aallday").checked) {
        document.getElementById("aendtime").disabled = true
        document.getElementById("astarttime").disabled = true
    } else {
        document.getElementById("aendtime").disabled = false
        document.getElementById("astarttime").disabled = false
    }
    // if (document.getElementById("eallday").checked) {
    //     document.getElementById("eendtime").disabled = true
    //     document.getElementById("estarttime").disabled = true
    // } else {
    //     document.getElementById("eendtime").disabled = false
    //     document.getElementById("estarttime").disabled = false
    // }
}


function getDate(timezone) {
    timezone = timezone + ""
    var array = timezone.split(" ", 3)
    // remove commas

    var year, day
    year = ''
    day = ''
    year = array[2].substring(0, array[2].length - 1)
    day = array[1].substring(0, array[1].length - 1)
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
    var month = months.indexOf(array[0])+1 + ''

    if (day.length == 1) {
        day = '0' + day
    }
    if (month.length == 1) {
        month = '0' + month
    }

    return (year + "-" + month + "-" + day)
}

function getTime(timezone) {
    timezone = timezone + ""
    var array = timezone.split(" ", 5)
    var time = array[3] + " " + array[4]
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];

    if(AMPM == "PM" && hours<12) hours = hours+12;
    if(AMPM == "AM" && hours==12) hours = hours-12;

    var sHours = hours.toString();
    var sMinutes = minutes.toString();

    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;

    return (sHours + ":" + sMinutes)
}

// fixing fullcalendar bug, plus 1 day to the end date if event is all day
function check_enddate (enddate, checked) {
    if (checked) {
        var add_one = enddate.slice(-2)
        add_one = Number(add_one)+1
        add_one = add_one + ''

        if (add_one.length == 1) {
            add_one = '0' + add_one
        }

        return (enddate.slice(0, -2) + add_one)
    }

    return enddate
}

// fixing fullcalendar bug, displays plus 1 day to the end date if event is all day
function customed_display(enddate) {
    var add_one = enddate.slice(-2)
        add_one = Number(add_one)-1
        add_one = add_one + ''

        if (add_one.length == 1) {
            add_one = '0' + add_one
        }

        return enddate.slice(0, -2) + add_one
}

function closePopup(){
    $("#addedEvent").hide()
    $("#editedEvent").hide()
    $("#deletedEvent").hide()
    $("#eventNotFound").hide()
    $("#missData").hide()
    $("#invalidDate").hide()
}

// changes search by event title or by date
function change_search() {
    var select = document.getElementById("searchby").value
    if (select == "Event Title") {
        $("#sname").show()
        $("#sdate").hide()
    }
    else {
        $("#sname").hide()
        $("#sdate").show()
    }
}