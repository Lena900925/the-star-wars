$(document).ready(function () {
    // SPACESHIP ANIMATION
    $("#divSpaceship").animate({ left: '-150%' }, 2000);
    var audio = new Audio("/static/spaceship.mp3");
    audio.play();

    var api = "http://swapi.co/api/planets/";
    // INDEX TABLE FUNCTION
    function appendTableData(data) {
        for (var idx in data) {
            $(".table tbody").append("<tr></tr>");
            $(".table tbody tr:last").append("<td></td>");
            $(".table tbody tr td:last").html(data[idx]['name']);
            $(".table tbody tr:last").append("<td></td>");
            $(".table tbody tr td:last").html(data[idx]['diameter'] + " km");
            $(".table tbody tr:last").append("<td></td>");
            $(".table tbody tr td:last").html(data[idx]['climate']);
            $(".table tbody tr:last").append("<td></td>");
            $(".table tbody tr td:last").html(data[idx]['terrain']);
            $(".table tbody tr:last").append("<td></td>");
            if (data[idx]['surface_water'] === 'unknown') {
                $(".table tbody tr td:last").html(data[idx]['surface_water'])
            } else {
                $(".table tbody tr td:last").html(data[idx]['surface_water'] + " %")
            }
            $(".table tbody tr:last").append("<td></td>");
            $(".table tbody tr td:last").html(data[idx]['population']);
            $(".table tbody tr:last").append("<td><button class='btn btn-default btn-sm' data-toggle='modal' data-target='#myModal'></button></td>");
            if (data[idx]['residents'].length === 0) {
                $(".table tbody tr td button:last").html("No known residents");
                $(".table tbody tr td button:last").attr("disabled", "disabled");
            } else {
                $(".table tbody tr td button:last").html(data[idx]['residents'].length + " residents");
                $(".table tbody tr td button:last").attr("data-planet", data[idx]['url']);
            }
        }
    }
    //LIST PLANETS
    $.getJSON(api, function (response) {
        var planets = response['results'];
        appendTableData(planets);
    });

    // MODAL TABLE
    $('#myModal').on('show.bs.modal', function (event) {
        var modal = $(this);
        var button = $(event.relatedTarget);
        var apiPlanet = button.data('planet');
        $.getJSON(apiPlanet, function (response) {
            var planetName = response['name'];
            modal.find('.modal-title').text('Residents of ' + planetName);
            var residents = response['residents'];
            for (idx in residents) {
                var apiResident = residents[idx]; // api resident
                $.getJSON(apiResident, function (response) {
                    modal.find('.table tbody').append("<tr></tr>");
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(response['name']);
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(response['height'] + " cm");
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(response['mass'] + " kg");
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(response['skin_color']);
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(response['hair_color']);
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(response['eye_color']);
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(response['birth_year']);
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(response['gender']);
                    modal.find('.table tbody tr').fadeIn(1500)
                });
            }
        });
    });

    $(".close, #close").click(function () {
        $("#myModal").find('.table tbody tr').remove()
    })

    //---BUTTONS---
    //NEXT
    $("#next").click(function () {
        $.getJSON(api, function (response) {
            api = response['next'];
            $(".table tbody tr").remove();
            $.getJSON(api, function (response) {
                var planets = response['results'];
                appendTableData(planets);
                //enable previous
                $("#pre").removeAttr("disabled");
                $("#pre").removeClass("disabled");
                //disable next if no data
                if (response['next'] === null) {
                    $("#next").addClass("disabled");
                    $("#next").attr("disabled", "disabled");
                }
            });
        });
    });
    //PREVIOUS
    $("#pre").click(function () {
        $.getJSON(api, function (response) {
            api = response['previous'];
            $(".table tbody tr").remove();
            $.getJSON(api, function (response) {
                var planets = response['results'];
                appendTableData(planets);
                //disable previous if no data
                if (response['previous'] === null) {
                    $("#previous").addClass("disabled");
                    $("#previous").attr("disabled", "disabled");
                };
                //enable next
                if ($("#next").attr("disabled") === "disabled") {
                    $("#next").removeAttr("disabled");
                    $("#next").removeClass("disabled");
                }
            });
        });
    });
    //---END---
});