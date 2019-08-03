



document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list'],
        header: {
            left: 'prev,next today,addEventButton',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        customButtons: {
            addEventButton: {
                text: 'add event',
                click: function() {                    
                    openAddEvent()
                    $("#add").click(function (event) {
                        console.log("clicked")
                        event.preventDefault()
                        AddEvent(calendar)
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
            // var venue = new Tooltip(info.el, {
            //     title: info.event.extendedProps.venue,
            //     placement: 'top',
            //     trigger: 'click',
            //     container: 'body'
            // })
        },
        eventClick: function(info) {
            // alert(info.event.title)
            // var eventObj = info.event
            EditEvent(info.event)
        },
        defaultDate: today,
        navLinks: true, // can click day/week names to navigate views
        businessHours: true, // display business hours
        editable: true
    });

    calendar.render();
    });

function EditEvent(event) {
    openEditEvent()
    console.log(event)
    var startdate = FullCalendar.formatDate(event.start, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        timeZoneName: 'short',
        timeZone: 'local'
      })
    var enddate = FullCalendar.formatDate(event.end, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        timeZoneName: 'short',
        timeZone: 'local'
      })
    console.log("startdate: " + startdate)
    console.log("enddate: " + enddate)
    $("#estartdate").val(startdate)
    $("#eenddate").val(enddate)
    $("#ename").text(event.title)
    console.log("description: " + event.extendedProps.description)
    $("#edescrip").text(event.extendedProps.description)
    
    $("#evenue").text(event.extendedProps.venue)
    $("#eallday").prop('checked', event.allDay)

    if (!event.allDay) {
        var starttime = event.start.getHours() + ":" + event.start.getMinutes()
        var endtime = event.end.getHours() + ":" + event.end.getMinutes()
        $("estarttime").val(starttime)
        $("eendtime").val(endtime)
    }


}

function AddEvent(calendar){    
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
        console.log(eventend)
    }
    else {
        eventstart = eventstartdate.value
        eventend = eventendtime.value
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

    // checks if there's a blank field
    var details = document.getElementsByClassName("edetails")
    var is_null = false
    for (let i=0; i<details.length; i++) {
        if (!details[i].value) {
            is_null = true
            console.log(details[i])
        }            
    }
    if (is_null)
        alert("Missing data, please try again")
    
    // adding event
    else {
        console.log("should be adding")
        calendar.addEvent({
            start: eventstart,
            end: eventend,
            title: eventname.value,
            description: eventdescrip.value,
            venue: eventvenue.value,
            allDay: eventallday.checked,
            backgroundColor: priority
        })  

    
        eventstartdate.value = ""
        eventenddate.value = ""
        eventstarttime.value = ""
        eventendtime.value = ""
        eventname.value = ""
        eventdescrip.value = ""
        eventvenue.value = ""
        eventpriority.selectedIndex = 0
        eventallday.checked = false

        alert("Successfully added an event!")
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

function enableAllDay() {
    if (document.getElementById("eallday").checked) {
        document.getElementById("eendtime").disabled = true
        document.getElementById("estarttime").disabled = true
    } else {
        document.getElementById("eendtime").disabled = false
        document.getElementById("estarttime").disabled = false
    }          
}