$(function() {
  $("#newPatientBtn").on("click", function(e) {
    e.preventDefault();

    $("#submitStatus")
      .removeClass("text-danger")
      .empty();

    $("#newPatientForm").validate({
      rules: {
        age: {
          required: true,
          digits: true
        }
      },
      errorPlacement: function(error, element) {
        if (element.attr("name") === "first") {
          error.appendTo($("#firstErr"));
        } else if (element.attr("name") === "last") {
          error.appendTo($("#lastErr"));
        } else if (element.attr("name") === "age") {
          error.appendTo($("#ageErr"));
        } else if (element.attr("name") === "gender") {
          error.appendTo($("#genderErr"));
        } else if (element.attr("name") === "address") {
          error.appendTo($("#addressErr"));
        } else if (element.attr("name") === "phone") {
          error.appendTo($("#phoneErr"));
        }
      }
    });

    if ($("#newPatientForm").valid()) {
      var newPatient = {
        firstName: $("#firstNameInput").val(),
        lastName: $("#lastNameInput").val(),
        age: $("#ageInput").val(),
        gender: $("#genderInput").val(),
        address: $("#addressInput").val(),
        phoneNumber: $("#phoneInput").val()
      };

      $.ajax({
        url: "/api/patients",
        data: newPatient,
        method: "POST"
      })
        .done(function(data) {
          var patientAnchor = $("<a>").addClass("dropdown-item");
          patientAnchor.attr("href", "/main/" + data.id);
          patientAnchor.text(data.firstName + " " + data.lastName);

          $("#patientDropdown").append(patientAnchor);
          $("#submitStatus").text("Patient Added!");
          $("#newPatientForm input").val("");
        })
        .fail(function(err) {
          console.log(err);

          $("#submitStatus")
            .addClass("text-danger")
            .text("An error has occured, please try again later.");
        });
    }
  });
});
