$(document).ready(function () {
    var url = "https://swapi.co/api/planets/";

    function create_table(data) {
        for (var one in data) {
            $(".table tbody").append("<tr></tr>");
            $(".table tbody tr:last").append("<td></td>");
            $(".table tbody tr td:last").html(data[one]['name']);
            $(".table tbody tr:last").append("<td></td>");
            $(".table tbody tr td:last").html(data[one]['diameter'] + " km");
            $(".table tbody tr:last").append("<td></td>");
            $(".table tbody tr td:last").html(data[one]['climate']);
            $(".table tbody tr:last").append("<td></td>");
            $(".table tbody tr td:last").html(data[one]['terrain']);
            $(".table tbody tr:last").append("<td></td>");
            if (data[one]['surface_water'] === 'unknown') {
                $(".table tbody tr td:last").html(data[one]['surface_water'])
            } else {
                $(".table tbody tr td:last").html(data[one]['surface_water'] + " %")
            }
            $(".table tbody tr:last").append("<td></td>");
            $(".table tbody tr td:last").html(data[one]['population']);
            $(".table tbody tr:last").append("<td><button class='btn btn-default btn-sm' data-toggle='modal' data-target='#myModal'></button></td>");
            if (data[one]['residents'].length === 0) {
                $(".table tbody tr td button:last").html("No known residents");
                $(".table tbody tr td button:last").attr("disabled", "disabled");
            } else {
                $(".table tbody tr td button:last").html(data[one]['residents'].length + " residents");
                $(".table tbody tr td button:last").attr("data-planet", data[one]['url']);
            }
        }
    }

    $.getJSON(url, function (data) {
        var api_info = data['results'];
        create_table(api_info);
    });

    $('#myModal').on('show.bs.modal', function (event) {
        var modal = $(this);
        var button = $(event.relatedTarget);
        var apiPlanet = button.data('planet');
        $.getJSON(apiPlanet, function (data) {
            var planetName = data['name'];
            modal.find('.modal-title').text('Residents of ' + planetName);
            var residents = data['residents'];
            for (var one in residents) {
                var apiResident = residents[one];
                $.getJSON(apiResident, function (data) {
                    modal.find('.table tbody').append("<tr></tr>");
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(data['name']);
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(data['height'] + " cm");
                    modal.find('.table tbody tr:last').append("<td></td>");
                    if (data['mass'] === 'unknown') {
                        modal.find('.table tbody tr td:last').text(data['mass']);}
                        else {
                        modal.find('.table tbody tr td:last').text(data['mass'] + " kg");
                    }
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(data['skin_color']);
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(data['hair_color']);
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(data['eye_color']);
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(data['birth_year']);
                    modal.find('.table tbody tr:last').append("<td></td>");
                    modal.find('.table tbody tr td:last').text(data['gender']);
                    modal.find('.table tbody tr').fadeIn(1500)
                });
            }
        });
    });

    $(".close, #close").click(function () {
        $("#myModal").find('.table tbody tr').remove()
    });

    $("#next").click(function () {
        $.getJSON(url, function (data) {
            url = data['next'];
            $(".table tbody tr").remove();
            $.getJSON(url, function (data) {
                var planets = data['results'];
                create_table(planets);
                //enable previous
                $("#previous").removeAttr("disabled");
                $("#previous").removeClass("disabled");
                //disable next if no data
                if (data['next'] === null) {
                    $("#next").addClass("disabled");
                    $("#next").attr("disabled", "disabled");
                }
            });
        });
    });
    $("#previous").click(function () {
        $.getJSON(url, function (data) {
            url = data['previous'];
            $(".table tbody tr").remove();
            $.getJSON(url, function (data) {
                var planets = data['results'];
                create_table(planets);

                if (data['previous'] === null) {
                    $("#previous").addClass("disabled");
                    $("#previous").attr("disabled", "disabled");
                };

                if ($("#next").attr("disabled") === "disabled") {
                    $("#next").removeAttr("disabled");
                    $("#next").removeClass("disabled");
                }
            });
        });
    });
});
