$(document).ready(function () {
    var url = "http://swapi.co/api/planets/";


    /*CREATE TABLE*/
    function create_table(data) {
        for (one_planet in data) {
            console.log("ASD");
            /*10-szer*/
            $(".table tbody").append("<tr></tr>");
            $(".table tr").append("<td>" + data[one_planet]['name'] + "</td>");

            $(".table tr").append("<td>" + data[one_planet]['diameter'] + " km" + "</td>");
            $(".table tr").append("<td>" + data[one_planet]['climate'] + "</td>");
            $(".table tbody tr").append("<td>" + data[one_planet]['terrain'] + "</td>");
            if (data[one_planet]['surface_water'] === 'unknown') {
                $(".table tbody  tr").append("<td>" + data[one_planet]['surface_water'] + "</td>");
            }
            else {
                $(".table tbody tr").append("<td>" + data[one_planet]['surface_water'] + " %" + "</td>");
            }
            $(".table tbody tr").append("<td>" + data[one_planet]['population'] + "</td>");
            $(".table tbody tr").append("<td><button class='btn btn-default btn-sm' data-toggle='modal' data-target='#myModal'></button></td>");
            if (data[one_planet]['residents'].length === 0) {
                $(".table tbody tr td button:last").html("No known residents");
                $(".table tbody tr td button:last").attr("disabled", "disabled");
            } else {
                $(".table tbody tr td button:last").html(data[one_planet]['residents'].length + " residents");
                $(".table tbody tr td button:last").attr("data-planet", data[one_planet]['url']);
            }
        }
    }

    $.getJSON(url, function (values) {
        var each = values['results'];
        create_table(each);
    });

    // MODAL
    $('#myModal').on('show.bs.modal', function (event) {
        var modal = $(this);
        var button = $(event.relatedTarget);
        var apiPlanet = button.data('planet'); // api planet

        $.getJSON(apiPlanet, function (response) {
            var planetName = response['name'];
            modal.find('.modal-title').text('Residents of ' + planetName);
            var residents = response['residents'];
            for (var idx in residents) {
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
                    modal.find('.table tbody tr').fadeIn(1500);
                });
            }
        });
    });

    $(".close, #close").click(function () {
        $("#myModal").find('.table tbody tr').remove()
    })

});