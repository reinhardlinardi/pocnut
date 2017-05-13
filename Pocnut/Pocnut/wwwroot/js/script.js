var timer; // timer variable

var selected = false; // true = player has select X or O
var first; // true = player first, false = AI first
var lock = true; // true = grid locked, cannot be clicked
var grid = "EEEEEEEEE"; // X = X, O = O, E = empty

function ShowMessage(val) {
    var html_string = "<button type=\"button\" class=\"btn restart\">Play again!</button>"; // html string of restart button
    var message = ""; // message

    if (val == 2) { // if AI wins
        message = "AI wins!";

        if (first) {
            $('#donut-message').text(message); // show message
            $('#donut-container').append(html_string); // add restart button
        }
        else {
            $('#pocky-message').text(message); // show message
            $('#pocky-container').append(html_string); // add restart button
        }
    }
    else {
        if (val == 1) message = "Draw!"; // if game draw
        else message = "Player wins!"; // else player wins

        if (first) {
            $('#donut-message').text('');
            $('#pocky-message').text(message); // show message
            $('#pocky-container').append(html_string); // add restart button
        }
        else {
            $('#pocky-message').text('');
            $('#donut-message').text(message); // show message
            $('#donut-container').append(html_string); // add restart button
        }
    }
}

function CheckGameOver(turn) { // true = player's turn next, false = AI's turn next
    $.ajax({ // request for game state
        url: '/Home/CheckGameOver',
        type: 'POST',
        data: { first : first, grid : grid },
        dataType: 'text',
        success: function (game_state_value) {
            var val = parseInt(game_state_value);

            if (val == 0) { // game is not over
                if (turn) {
                    lock = false; // release lock

                    if (first) {
                        $('#donut-message').text('');
                        $('#pocky-message').text('Your turn.'); // change message
                    }
                    else {
                        $('#pocky-message').text('');
                        $('#donut-message').text('Your turn.'); // change message
                    }
                }
                else AIMove(); // request for AI's move to server
            }
            else ShowMessage(val); // show win or draw message
        }
    });
}

function AIMove() {
    if (first) {
        $('#pocky-message').text('');
        $('#donut-message').text('Processing...'); // change message
    }
    else {
        $('#donut-message').text('');
        $('#pocky-message').text('Processing...'); // change message
    }

    $.ajax({ // request for AI's move
        url: '/Home/SendMove',
        type: 'POST',
        data: { first : first, grid : grid }, // data to be sent, key = parameter name, value = data
        dataType: 'text',
        success: function (id) {
            var grid_id = "#grid-div-" + id; // grid id to be updated
            $(grid_id).html(''); // remove image from link

            var html_string = "<img class=\"pocnut\" src=\"/images/"; // html string of img tag
            var new_grid = grid.substr(0, parseInt(id) - 1); // new grid state

            if (first) {
                html_string += "Donut.png"; // if player first, use Donut
                new_grid += "O";
            }
            else {
                html_string += "Pocky.png"; // else use Pocky
                new_grid += "X";
            }

            html_string += "\">";
            if (parseInt(id) != 9) new_grid += grid.substr(parseInt(id));
            grid = new_grid; // update grid state

            $(grid_id).html(''); // remove link (not clickable anymore)
            $(grid_id).append(html_string); // update grid picture
            CheckGameOver(true); // check game state
        }
    });
}

function ShowGrid(_first) {
    clearTimeout(timer); //clear timer

    $.ajax({ // request for grid HTML string
        url: '/Home/ShowGrid', // url : /ControllerName/MethodName
        type: 'POST', // request type : POST
        dataType: 'text', // expected return type : text
        success: function(html_string) { // html_string : return data from server
            $('#game').append(html_string); // add grid HTML string to page
            $('#game').fadeIn(500); // show grid, animation 500 ms
            
            if (!_first) AIMove(); // if AI first, request for AI's move to server
            else {
                lock = false; // release lock

                if (first) $('#pocky-message').text('Your turn.'); // show message
                else $('#donut-message').text('Your turn.');
            }
        }
    });
}

function HideSelection(_first) {
    selected = true; // prevent select more than once
    first = _first; // set first value

    $('#game').fadeOut(500, function() { // hide all selection, animation 500 ms
        $('#game').html(''); // remove selection
    });

    timer = setTimeout(function() { ShowGrid(_first); }, 500); // show grid in 500 ms
}

function ShowSelection() {
    clearTimeout(timer); // clear timer

    $.ajax({ // request for selection HTML string
        url: '/Home/ShowSelection',
        type: 'POST',
        dataType: 'text',
        success: function (html_string) {
            $('#game').append(html_string); // add selection
            $('#game').fadeIn(500); // show selection, animation 500 ms
        }
    });

    selected = false; // reset selection status
    lock = true; // reset lock
    grid = "EEEEEEEEE"; // reset grid state
}

function HideGrid() {
    $('#game').fadeOut(500, function () {
        $('#game').html(''); // remove grid
    });

    timer = setTimeout(ShowSelection, 500); // show selection in 500 ms
}

$(document).ready( // when page has loaded
    function () {
        $(document).on('click', '#Pocky', // Pocky on click
            function() {
                if (!selected) { // first time selection
                    HideSelection(true); // player first
                }
            }
        );

        $(document).on('click', '#Donut', // Donut on click
            function() {
                if (!selected) { // first time selection
                    HideSelection(false); // AI first
                }
            }
        );
        
        $(document).on('click', 'a.grid-link', // bind click event to grid (for dynamically added elements)
            function (event) { 
                if (!lock) { // prevent click more than once
                    lock = true; // lock grid

                    var img_id = $(event.target).attr('id'); // get id of sender
                    var img_number = img_id.charAt(4); // get id number only

                    var grid_id = "#grid-div-" + img_number; // grid id to be updated
                    $(grid_id).html(''); // remove image from link

                    var html_string = "<img class=\"pocnut\" src=\"/images/"; // html string of img tag
                    var new_grid = grid.substr(0, parseInt(img_number) - 1); // new grid state

                    if (first) {
                        html_string += "Pocky.png"; // if player first, use Pocky
                        new_grid += "X";
                    }
                    else {
                        html_string += "Donut.png"; // else use Donut
                        new_grid += "O";
                    }
                    
                    html_string += "\">";
                    if (parseInt(img_number) != 9) new_grid += grid.substr(parseInt(img_number));
                    grid = new_grid;  // update grid state

                    $(grid_id).html(''); // remove link (not clickable anymore)
                    $(grid_id).append(html_string); // update grid picture
                    CheckGameOver(false); // check game state
                }
            }
        );

        $(document).on('click', 'button.restart', HideGrid); // bind click event to restart button (for dynamically added elements)
    }
);