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
        plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list'],
        header: {
            left: 'prev,next today,addEventButton,searchEventButton',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        customButtons: {
            addEventButton: {
                text: 'add event',
                click: function() {                    
                    openAddEvent()
                    $("#add").off("click").on("click", function (event) {
                        event.preventDefault()
                        AddEvent(calendar, true, null)
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
                        if (!key) {
                            alert("Enter an event title")
                        }
                        else {
                            var events = calendar.getEvents()
                            console.log(key)
                            if (events.some(e => e.title === key)) {
                                console.log("true")
                                
                                // var index = events.indexOf(key)
                                var index = events.map(function(e) { return e.title; }).indexOf(key);
                                console.log(events[index])
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
                                alert("Event not found")
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
                title: "Police Serive Anniversary",
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

function openEventDetails(event, calendar) {
    var modal = document.getElementById("myModal")
    
    modal.style.display = "block";
    
    var child = modal.lastElementChild;  
        while (child) { 
            modal.removeChild(child); 
            child = modal.lastElementChild; 
        } 
    
    $("#myModal").append("<div class='modal-content'><span class='close'>&times;</span></div><br>")

    console.log("should open event details")
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
        
        $(".modal-content").append("<button type='button' class='btn' id='editevent'>Edit</button>")
        $(".modal-content").append("<button type='button' class='btn' id='deleteevent'>Delete</button><br>")        
    
        // functionality for edit button
        $("#editevent").off("click").on("click", function(e) {
            console.log("huy edit na please")
            modal.style.display = "none";
            openEditEvent()
            EditEvent(event, calendar)
        })
    
        // functionality for delete button
        $("#deleteevent").off("click").on("click", function(e) {
            console.log("should be removing event")
            event.remove()
            modal.style.display = "none";
            alert("Deleted event successfully")
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

function EditEvent(event, calendar) {    
    console.log(event)
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
      console.log("enddate in edit event: "+end)
    $("#estartdate").val(getDate(start))
    $("#eenddate").val(getDate(end))
    $("#ename").val(event.title)
    $("#edescrip").val(event.extendedProps.description)
    
    $("#evenue").val(event.extendedProps.venue)
    $("#eallday").prop('checked', event.allDay)

    if (!event.allDay) {
        var starttime = getTime(start)
        var endtime = getTime(end)
        $("estarttime").val(starttime)
        $("eendtime").val(endtime)
    }

    $("#edit").click(function (e) {
        e.preventDefault
        AddEvent(calendar, false, event)
    })
}


function AddEvent(calendar, is_adding, event) {    
    var eventstartdate = document.getElementById("estartdate");
    var eventenddate = document.getElementById("eenddate");
    var eventstarttime = document.getElementById("estarttime")
    var eventendtime = document.getElementById("eendtime")
    var eventname = document.getElementById("ename")
    var eventdescrip = document.getElementById("edescrip")
    var eventvenue = document.getElementById("evenue")
    var eventpriority = document.getElementById("epriority")
    var eventallday = document.getElementById("eallday")
    var eventstart
    var eventend
    var priority

    // combines date and time
    if (!eventallday.checked) {
        eventstart = eventstartdate.value + "T" + eventstarttime.value + ":00"
        eventend = eventenddate.value + "T" + eventendtime.value + ":00"
        console.log("but why?")
        console.log("enddateval: "+eventenddate.value)
        console.log("endtimeval"+eventendtime.value)
        console.log("eventend val: "+eventend)
    }
    else {
        
        eventstart = eventstartdate.value
        eventend = eventenddate.value
    }
    

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
    console.log("before check enddate: "+eventend)
    // for fixing bug
    eventend = check_enddate(eventend, eventallday.checked)

    // checks if there's a blank field
    var details = document.getElementsByClassName("edetails")
    var is_null = false
    for (let i=0; i<details.length && !is_null; i++) {
        if (!details[i].value) {
            is_null = true
        }            
    }
    if (is_null)
        alert("Missing data, please try again")
    
    // adding event
    else if (is_adding){
        console.log("should be adding")
        calendar.addEvent({
            id: id,
            start: eventstart,
            end: eventend,
            title: eventname.value,
            description: eventdescrip.value,
            venue: eventvenue.value,
            allDay: eventallday.checked,
            backgroundColor: priority
        })  
        console.log("end date: " + eventend)
        
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

        alert("Successfully added an event!")
        closeAddEvent()
    }

    // editing event
    else {        
        console.log("before edit: "+event.title)
        console.log("before eventname: "+eventname.value)
        event.start = eventstart
        event.end = eventend
        event.title = eventname.value
        // event.description = eventdescrip.value
        // event.venue = eventvenue.value
        // event.allDay = eventallday.checked
        // event.backgroundColor = priority
        console.log("after edit: "+event.title)
        console.log("after eventname: "+eventname.value)

        $("#calendar").fullCalendar('updateEvent', event)

        eventstartdate.value = ""
        eventenddate.value = ""
        eventstarttime.value = ""
        eventendtime.value = ""
        eventname.value = ""
        eventdescrip.value = ""
        eventvenue.value = ""
        eventpriority.selectedIndex = 0
        eventallday.checked = false

        alert("Successfully edited an event!")
        closeAddEvent()
    }
    
}



function openAddEvent(){
    document.getElementById("addevent").style.display = "block";
    $("#add").show()
    $("#edit").hide()
}
function closeAddEvent() {
    document.getElementById("addevent").style.display = "none";
}
function openEditEvent() {
    document.getElementById("addevent").style.display = "block";    
    $("#add").hide()
    $("#edit").show()
}
function openSearchEvent(){
    document.getElementById("searchevent").style.display = "block";
}
function closeSearchEvent(){
    document.getElementById("searchevent").style.display = "none";
}


function enableAllDay() {
    if (document.getElementById("eallday").checked) {
        document.getElementById("eendtime").disabled = true
        document.getElementById("estarttime").disabled = true
    } else {
        document.getElementById("eendtime").disabled = false
        document.getElementById("estarttime").disabled = false
    }          
}


function getDate(timezone) {
    timezone = timezone + ""
    var array = timezone.split(" ", 3)
    // remove commas
    // console.log(array)
    var year, day
    year = ''
    day = ''
    console.log("array: "+array)
    console.log("array[2]: "+array[2])
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
    console.log(sHours + ":" + sMinutes)
    return (sHours + ":" + sMinutes)
}

function check_enddate (enddate, checked) {
    if (checked) {
        console.log("di ka dapat dito")
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

function customed_display(enddate) {
    var add_one = enddate.slice(-2)
        add_one = Number(add_one)-1
        add_one = add_one + ''

        if (add_one.length == 1) {
            add_one = '0' + add_one
        }

        return enddate.slice(0, -2) + add_one
}

