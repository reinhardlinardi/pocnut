using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pocnut;

namespace TicTacToe.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View(); // render HTML page
        }

        public IActionResult ShowGrid() // handle ajax request for grid HTML string
        {
            string grid = ""; // initialize with empty string
            
            // add HTML string
            grid += "<!-- Tic Tac Toe grid -->";
            grid += "\n<div class=\"container grid-container\">";
            grid += "\n    <div class=\"row\">";
            grid += "\n        <div class=\"col-xs-2\"></div>";
            grid += "\n        <div class=\"col-xs-8\">";
            grid += "\n            <div class=\"grid right bottom\"><a class=\"grid-link\" id=\"grid-1\" href=\"#\"><img id=\"img-1\" class=\"pocnut\" src=\"/images/Dummy.png\"></a></div>";
            grid += "\n            <div class=\"grid right bottom\"><a class=\"grid-link\" id=\"grid-2\" href=\"#\"><img id=\"img-2\" class=\"pocnut\" src=\"/images/Dummy.png\"></a></div>";
            grid += "\n            <div class=\"grid bottom\"><a class=\"grid-link\" id=\"grid-3\" href=\"#\"><img id=\"img-3\" class=\"pocnut\" src=\"/images/Dummy.png\"></a></div>";
            grid += "\n        </div>";
            grid += "\n        <div class=\"col-xs-2\"></div>";
            grid += "\n    </div>";
            grid += "\n</div>";
            grid += "\n";
            grid += "\n<div class=\"container grid-container\">";
            grid += "\n    <div class=\"row\">";
            grid += "\n        <div class=\"col-xs-2\"><img class=\"pocnut\" src=\"/images/Pocky.png\"></div>";
            grid += "\n        <div class=\"col-xs-8\">";
            grid += "\n            <div class=\"grid right bottom\"><a class=\"grid-link\" id=\"grid-4\" href=\"#\"><img id=\"img-4\" class=\"pocnut\" src=\"/images/Dummy.png\"></a></div>";
            grid += "\n            <div class=\"grid right bottom\"><a class=\"grid-link\" id=\"grid-5\" href=\"#\"><img id=\"img-5\" class=\"pocnut\" src=\"/images/Dummy.png\"></a></div>";
            grid += "\n            <div class=\"grid bottom\"><a class=\"grid-link\" id=\"grid-6\" href=\"#\"><img id=\"img-6\" class=\"pocnut\" src=\"/images/Dummy.png\"></a></div>";
            grid += "\n        </div>";
            grid += "\n        <div class=\"col-xs-2\"><img class=\"pocnut\" src=\"/images/Donut.png\"></div>";
            grid += "\n    </div>";
            grid += "\n</div>";
            grid += "\n";
            grid += "\n<div class=\"container grid-container\">";
            grid += "\n    <div class=\"row\">";
            grid += "\n        <div class=\"col-xs-2\">";
            grid += "\n            <h4 id=\"pocky-message\"></h4>";
            grid += "\n        </div>";
            grid += "\n        <div class=\"col-xs-8\">";
            grid += "\n            <div class=\"grid right\"><a class=\"grid-link\" id=\"grid-7\" href=\"#\"><img id=\"img-7\" class=\"pocnut\" src=\"/images/Dummy.png\"></a></div>";
            grid += "\n            <div class=\"grid right\"><a class=\"grid-link\" id=\"grid-8\" href=\"#\"><img id=\"img-8\" class=\"pocnut\" src=\"/images/Dummy.png\"></a></div>";
            grid += "\n            <div class=\"grid\"><a class=\"grid-link\" id=\"grid-9\" href=\"#\"><img id=\"img-9\" class=\"pocnut\" src=\"/images/Dummy.png\"></a></div>";
            grid += "\n        </div>";
            grid += "\n        <div class=\"col-xs-2\">";
            grid += "\n            <h4 id=\"donut-message\"></h4>";
            grid += "\n        </div>";
            grid += "\n    </div>";
            grid += "\n</div>";
            
            return Content(grid); // return HTML string
        }

        public IActionResult SendMove(string first, string grid) // first = player first or AI first, grid = grid state
        {
            AI ai = new AI(first, grid);
            return Content(Convert.ToString(ai.GetNextMove())); // return AI's move as string
        }

        public IActionResult CheckGameOver(string first, string grid) // grid = grid state
        {
            AI ai = new AI(first, grid);
            return Content(Convert.ToString(ai.IsGameOver())); // return game state
        }
    }
}