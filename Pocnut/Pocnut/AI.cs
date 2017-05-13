using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pocnut
{
    public class AI
    {
        public char mark { get; set; } // AI's mark (X or O)
        public char[,] grid { get; set; } // grid state (in multidimensional char array)

        public AI(string _first, string _grid) // Constructor
        {
            if (Convert.ToBoolean(_first)) mark = 'X'; // if AI first, mark = 'X'
            else mark = 'O'; // else mark = 'O'

            grid = new char[3,3]; // allocation

            for(int i=0;i<9;i++)
            {
                // masukin ke matrix
            }
        }
    }
}
