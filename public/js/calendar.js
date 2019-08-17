document.addEventListener("DOMContentLoaded", function() {
  var calendarEl = document.getElementById("calendar");
  var taskInModal = null;
  var billInModal = null;

  // Create Datepickers
  $(".date-pick").datepicker({
    format: "mm/dd/yyyy"
  });

  // Set up the calendar
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["dayGrid", "interaction", "timeGrid", "list", "bootstrap"],
    timeZone: "local",
    themeSystem: "bootstrap",
    titleFormat: {
      year: "numeric",
      month: "short"
    },
    header: {
      left: "custom1,custom2",
      center: "title",
      right: ""
    },
    footer: {
      left: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      right: "prev,next"
    },
    editable: false,
    eventLimit: true, //too many events in a day, show popover
    eventColor: "#0069d9",
    eventTextColor: "#ffffff",
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
      if (info.event.extendedProps.isBill) {
        //event is a bill, show the bill modal
        billInModal = info.event;

        $("#billDataPayTo").text(info.event.title);
        $("#billDataAmount").text(info.event.extendedProps.amount.toFixed(2));
        $("#billDataDue").text(moment(info.event.start).format("MM-DD-YYYY"));
        $("#billDataReason").text(info.event.extendedProps.reason);
        $("#billDataRepeats").text(
          info.event.extendedProps.repeats ? "Yes" : "No"
        );

        // Convert the data into comething human readable
        if (info.event.extendedProps.repeats) {
          var interval = info.event.extendedProps.interval;
          var intervalString = interval.substring(0, interval.length - 1);

          var durationHop = interval[interval.length - 1];

          if (durationHop === "d") {
            intervalString += " Day(s)";
          } else if (durationHop === "w") {
            intervalString += " Week(s)";
          } else if (durationHop === "m") {
            intervalString += " Month(s)";
          }

          $("#billDataInterval").text(intervalString);
        } else {
          $("#billDataInterval").text("N/A");
        }

        $("#billDataModal").modal();
      } else {
        //event is a task, show the task modal
        taskInModal = info.event;

        $("#taskDataTitle").text(info.event.title);
        $("#taskDataPriority").text(info.event.extendedProps.priority);
        $("#taskDataStart").text(
          moment(info.event.start).format("MM-DD-YYYY hh:mm A")
        );
        $("#taskDataEnd").text(
          moment(info.event.end).format("MM-DD-YYYY hh:mm A")
        );
        $("#taskDataRepeats").text(
          info.event.extendedProps.repeats ? "Yes" : "No"
        );

        // Convert the data into comething human readable
        if (info.event.extendedProps.repeats) {
          var interval = info.event.extendedProps.interval;
          var intervalString = interval.substring(0, interval.length - 1);

          var durationHop = interval[interval.length - 1];

          if (durationHop === "d") {
            intervalString += " Day(s)";
          } else if (durationHop === "w") {
            intervalString += " Week(s)";
          } else if (durationHop === "m") {
            intervalString += " Month(s)";
          }

          $("#taskDataInterval").text(intervalString);
        } else {
          $("#taskDataInterval").text("N/A");
        }

        $("#taskDataModal").modal();
      }
    }
  });

  calendar.render();

  var selectedPatient;

  function getPatientData(patient) {
    // get Tasks and bills from the server
    selectedPatient = patient;
    calendar.getEvents().forEach(function(eve) {
      eve.remove();
    });
    $.ajax({
      url: "/api/patient/" + patient,
      method: "GET"
    }).done(function(data) {
      var taskData = data.Tasks;
      var billData = data.Bills;

      taskData.forEach(function(ele) {
        ele.taskId = ele.id;
      });

      var eventArray = taskData;

      // convert the bills into events
      for (var i = 0; i < billData.length; i++) {
        var billEvent = {
          start: billData[i].due,
          title: billData[i].payTo,
          allDay: true,
          color: "#00bb00",
          extendedProps: {
            billId: billData[i].id,
            reason: billData[i].reason,
            amount: billData[i].amount,
            PatientId: billData[i].PatientId,
            repeats: billData[i].repeats,
            interval: billData[i].interval,
            isBill: true
          }
        };

        eventArray.push(billEvent);
      }

      // Display on the calendar
      eventArray.forEach(function(eve) {
        calendar.addEvent(eve);
      });
    });
  }

  // Get our first patient on documents load.
  getPatientData(
    parseInt($("#startingPatient").val()) !== -1
      ? $("#startingPatient").val()
      : $("#patientDropdown a:first-child").attr("data-patientid")
  );

  $("#patientDropdown a").on("click", function() {
    getPatientData($(this).attr("data-patientid"));
  });

  $("#repeatsCheckTask").on("click", function() {
    // only allow editing of the interval if this is checked
    var check = $(this).prop("checked");
    $("#repeatNumberTask").attr("disabled", !check);
    $("#intervalSelectTask").attr("disabled", !check);
  });

  $("#repeatsCheckBill").on("click", function() {
    // only allow editing of the interval if this is checked
    var check = $(this).prop("checked");
    $("#repeatNumberBill").attr("disabled", !check);
    $("#intervalSelectBill").attr("disabled", !check);
  });

  $("#saveTaskBtn").on("click", function() {
    var newTask = {
      // https://fullcalendar.io/docs/event-parsing
      title: $("#taskTitle").val(),
      start: moment(
        $("#taskStart").val() + " " + $("#taskTimeStart").val(),
        "MM-DD-YYYY hh:mm A"
      ).format(),
      end: moment(
        $("#taskEnd").val() + " " + $("#taskTimeEnd").val(),
        "MM-DD-YYYY hh:mm A"
      ).format(),
      extendedProps: {
        // Where non-FullCalendar properties go
        priority: $("#prioritySelect").val(),
        repeats: $("#repeatsCheckTask").prop("checked"),
        interval: $("#repeatNumberTask").val() + $("#intervalSelectTask").val()
      }
    };
    var taskObject = {
      title: newTask.title,
      priority: newTask.extendedProps.priority,
      repeats: newTask.extendedProps.repeats,
      interval: newTask.extendedProps.repeats
        ? newTask.extendedProps.interval
        : null,
      start: newTask.start,
      end: newTask.end,
      PatientId: selectedPatient
    };
    $.ajax({
      url: "/api/task",
      method: "POST",
      data: taskObject
    })
      .done(function(data) {
        // Clear out modal
        $("#taskModal input:text").val("");
        $("#repeatsCheckTask").prop("checked", false);
        $("#intervalSelectTask").prop("selectedIndex", 0);
        $("#repeatNumberTask").attr("disabled", true);
        $("#intervalSelectTask").attr("disabled", true);
        $("#prioritySelect").prop("selectedIndex", 0);
        // add to calendar

        data.extendedProps = { taskId: data.id };

        calendar.addEvent(data);
        $("#taskModal").modal("hide");
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
      color: "#00bb00",
      // end: new Date($("#billEnd").val()),
      extendedProps: {
        // Where non-FullCalendar properties go
        amount: parseFloat($("#billAmount").val()),
        reason: $("#billReason").val(),
        repeats: $("#repeatsCheckBill").prop("checked"),
        interval: $("#repeatNumberBill").val() + $("#intervalSelectBill").val(),
        isBill: true
      }
    };
    var billObject = {
      payTo: newBill.title,
      due: newBill.start,
      amount: newBill.extendedProps.amount,
      interval: newBill.extendedProps.repeats
        ? newBill.extendedProps.interval
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
        newBill.extendedProps.billId = data.id;
        // Clear out modal
        $("#billModal input:text").val("");
        $("#repeatsCheckBill").prop("checked", false);
        $("#intervalSelectBill").prop("selectedIndex", 0);
        $("#repeatNumberBill").attr("disabled", true);
        $("#intervalSelectBill").attr("disabled", true);
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

  $("#taskDataModal").modal("hide");
  $("#billDataModal").modal("hide");

  // Reset our values when the modal is hidden
  $("#taskDataModal").on("hide.bs.modal", function() {
    taskInModal = null;
  });

  $("#billDataModal").on("hide.bs.modal", function() {
    billInModal = null;
  });

  // Delete events from the calendar
  $("#deleteTaskButton").on("click", function() {
    $.ajax({
      url: "/api/task/" + taskInModal.extendedProps.taskId,
      method: "DELETE"
    }).done(function() {
      taskInModal.remove();

      $("#taskDataModal").modal("hide");
    });
  });
  $("#deleteBillButton").on("click", function() {
    $.ajax({
      url: "/api/bill/" + billInModal.extendedProps.billId,
      method: "DELETE"
    }).done(function() {
      billInModal.remove();

      $("#billDataModal").modal("hide");
    });
  });
});
