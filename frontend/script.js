
$(function() {
    $("#calendar").datepicker({
        onSelect: function(dateText) {
            $("#drop-zone").data("selectedDate", dateText);
        }
    });

    $("#drop-zone").on("dragover", function(event) {
        event.preventDefault();
    });

    $("#drop-zone").on("drop", function(event) {
        event.preventDefault();
        const files = event.originalEvent.dataTransfer.files;
        const date = $(this).data("selectedDate");

        if (!date) {
            alert("Please select a date on the calendar first.");
            return;
        }

        uploadFile(files[0], date);
    });

    $("#file-input").on("change", function(event) {
        const files = event.target.files;
        const date = $("#drop-zone").data("selectedDate");

        if (!date) {
            alert("Please select a date on the calendar first.");
            return;
        }

        uploadFile(files[0], date);
    });
});

function uploadFile(file, date) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('date', date);

    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Error:', error));
}
