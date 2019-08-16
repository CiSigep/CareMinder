document.addEventListener("DOMContentLoaded", function() {
  var calendarEl = document.getElementById("calendar");
  //console.log($("#startingPatient").val());
  var selectedPatient =
    $("#startingPatient").val() !== -1
      ? $("#startingPatient").val()
      : $("#patientDropdown a:first-child").attr("data-patientid");
  //console.log(selectedPatient);
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["dayGrid", "interaction", "timeGrid", "list", "bootstrap"],
    timeZone: "local",
    themeSystem: "bootstrap",
    header: {
      left: "prev,next, today, custom1, custom2",
      center: "title",
      right: ", dayGridMonth,timeGridWeek,timeGridDay,listMonth"
    },
    editable: false, // We want to update the events programmatically
    eventLimit: true, //too many events in a day, show popover
    customButtons: {
      custom1: {
        text: "add task",
        click: function() {
          $("#taskModal").modal();
        }
      },
      custom2: {
        text: "add bill",
        click: function() {
          $("#billModal").modal();
        }
      }
    },
    eventClick: function(info) {
      // https://fullcalendar.io/docs/eventClick
      $("#eventIdSpan").text(info.event.title);

      $("#eventClickModal").modal();
    }
  });

  calendar.render();

  $("#repeatsCheck").on("click", function() {
    // only allow editing of the interval if this is checked
    var check = $(this).prop("checked");
    $("#repeatNumber").attr("disabled", !check);
    $("#intervalSelect").attr("disabled", !check);
  });

  $("#saveTaskBtn").on("click", function() {
    var newTask = {
      // https://fullcalendar.io/docs/event-parsing
      title: $("#taskTitle").val(),
      start: moment(
        $("#taskStart").val() + " " + $("#taskTimeStart").val(),
        "MM-DD-YYYY HH:mm A"
      ).format(),
      end: moment(
        $("#taskEnd").val() + " " + $("#taskTimeEnd").val(),
        "MM-DD-YYYY HH:mm A"
      ).format(),
      extendedProps: {
        // Where non-FullCalendar properties go
        priority: $("#prioritySelect").val(),
        repeats: $("#repeatsCheckTask").prop("checked"),
        intervalNum: $("#repeatNumberTask").val(),
        time: $("#intervalSelectTask").val()
      }
    };
    var taskObject = {
      title: newTask.title,
      priority: newTask.extendedProps.priority,
      repeats: newTask.extendedProps.repeats,
      interval: newTask.extendedProps.repeats
        ? newTask.extendedProps.intervalNum + newTask.extendedProps.time
        : null,
      start: newTask.start,
      end: newTask.end,
      PatientId: selectedPatient
    };

    console.log(taskObject.start);
    $.ajax({
      url: "/api/task",
      method: "POST",
      data: taskObject
    })
      .done(function(data) {
        // Clear out modal
        $("#taskModal input:text").val("");
        // add to calendar
        calendar.addEvent(data);
        $("#saveTaskModal").modal("hide");
      })
      .fail(function(err) {
        console.log(err);
      });
  });
  $("#saveBillBtn").on("click", function() {
    var newBill = {
      // https://fullcalendar.io/docs/event-parsing
      title: $("#billPayTo").val(),
      start: moment($("#billDue").val(), "MM-DD-YYYY").format(),
      allDay: true,
      // end: new Date($("#billEnd").val()),
      extendedProps: {
        // Where non-FullCalendar properties go
        amount: $("#billAmount").val(),
        time: $("#intervalSelectBill").val(),
        reason: $("#billReason").val(),
        repeats: $("#repeatsCheckBill").prop("checked"),
        intervalNum: $("#repeatNumberBill").val()
      }
    };
    var billObject = {
      payTo: newBill.title,
      due: newBill.start,
      amount: newBill.extendedProps.amount,
      interval: newBill.extendedProps.repeats
        ? newBill.extendedProps.intervalNum + newBill.extendedProps.time
        : null,
      reason: newBill.extendedProps.reason,
      repeats: newBill.extendedProps.repeats,
      PatientId: selectedPatient
    };
    $.ajax({
      url: "/api/bill",
      method: "POST",
      data: billObject
    })
      .done(function(data) {
        newBill.id = data.id;
        // Clear out modal
        $("#billModal input:text").val("");
        // add to calendar
        calendar.addEvent(newBill);
        $("#billModal").modal("hide");
      })
      .fail(function(err) {
        console.log(err);
      });
  });
  //hide modals after saving user input
  $("#saveTaskModal").modal("hide");
  $("#billModal").modal("hide");
});
