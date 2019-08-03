



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
        },
        defaultDate: today,
        navLinks: true, // can click day/week names to navigate views
        businessHours: true, // display business hours
        editable: true
    });

    calendar.render();
    });


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

    if (!eallday.checked) {
        eventstart = eventstartdate.value + "T" + eventstarttime.value + "-00"
        eventend = eventendtime.value + "T" + eventendtime.value + "-00"
        console.log(eventstart)
    }
    else {
        eventstart = eventstartdate.value
        eventend = eventendtime.value
    }
    
    var details = document.getElementsByClassName("edetails")
    var is_null = false
    for (let i=0; i<details.length; i++) {
        if (!details[i].value) 
            is_null = true
    }
    if (is_null)
        alert("Missing data, please try again")
    
    else {
        console.log("should be adding")
        calendar.addEvent({
            start: eventstart,
            end: eventend,
            title: eventname.value,
            description: eventdescrip.value,
            venue: eventvenue.value
            // priority: eventpriority.value
        })  

    
        eventstartdate.value = ""
        eventenddate.value = ""
        eventstarttime.value = ""
        eventendtime.value = ""
        eventname.value = ""
        eventdescrip.value = ""
        eventvenue.value = ""
        eventpriority.value = ""
        eventallday.checked = false

        alert("Successfully added an event!")
        closeAddEvent()
    }
    
}

function openAddEvent(){
    document.getElementById("addevent").style.display = "block";
}
function closeAddEvent() {
    document.getElementById("addevent").style.display = "none";
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