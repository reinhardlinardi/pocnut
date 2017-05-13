using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pocnut
{
    public class AI
    {
        /* Attributes */
        public char mark { get; set; } // AI's mark (X or O)
        public char enemy_mark { get; set; } // player's mark
        public char[,] grid { get; set; } // grid state (in multidimensional char array)
        public int best_move; // best move

        /* Methods */

        public AI(string _first, string _grid) // Constructor
        {
            if (Convert.ToBoolean(_first))
            {
                mark = 'O'; // if player first, mark = 'O'
                enemy_mark = 'X'; // player's mark = 'X'
            }
            else
            {
                mark = 'X'; // else mark = 'X'
                enemy_mark = 'O'; // player's mark = 'O'
            }

            grid = new char[3,3]; // allocation

            for(int i=0;i<9;i++)
            {
                int row = i / 3;
                int col = i % 3;

                if (_grid[i] == 'E') grid[row, col] = '.'; // '.' = empty
                else if (_grid[i] == 'X') grid[row, col] = 'X';
                else grid[row, col] = 'O';
            }
        }

        public int IsGameOver() // check if game is over
        {
            /* row and col offset for each direction */
            int[] dr = new int[] { 0, 1, 1, 1, 0, -1, -1, -1 };
            int[] dc = new int[] { 1, 1, 0, -1, -1, -1, 0, 1 };

            bool draw = true;

            for(int i=0;i<3;i++) // for each grid
            {
                for(int j=0;j<3;j++)
                {
                    char grid_mark = grid[i, j];

                    if (grid_mark != '.') // only check non-empty grid
                    {
                        for (int k = 0; k < 8; k++) // for each directions
                        {
                            int nr = i;
                            int nc = j;

                            for (int cnt = 1; cnt <= 2; cnt++) // add offset twice
                            {
                                nr += dr[k];
                                nc += dc[k];

                                if (nr >= 0 && nr < 3 && nc >= 0 && nc < 3) // if still inside grid
                                {
                                    if (grid[nr, nc] == grid_mark)
                                    {
                                        if (cnt == 2) // get 3 in a row
                                        {
                                            if (mark == grid_mark) return 2; // AI wins
                                            else return -1; // AI loses
                                        }
                                        else continue; // continue
                                    }
                                    else break; // different marks
                                }
                                else break; // outside grid
                            }
                        }
                    }

                    draw = draw && (grid_mark != '.'); // check if every grid is filled
                }
            }

            if (draw) return 1; // draw
            else return 0; // game is not over
        }

        public int Minimax(int depth, bool turn) // turn, true = player's turn, false = AI's turn
        {
            int move = -1; // best move for this depth
            int score; // score for this depth
            char grid_mark; // mark to be set to grid

            if (turn) score = 20; // if player's turn, set initial score to maximum (minimize)
            else score = -20; // else set initial score to minimum (maximize)

            /* Base case */

            int game_state_value = IsGameOver(); // check is game over

            if (game_state_value == 2) return 20 - depth; // make AI wins as soon as possible
            else if (game_state_value == 1) return depth; // make AI draw as long as possible
            else if (game_state_value == -1) return -20 + depth; // make AI loses as long as possible
            else
            {
                /* Recurrence */

                for (int i = 0; i < 3; i++) // try each grid
                {
                    for (int j = 0; j < 3; j++)
                    {
                        if (grid[i, j] == '.') // if grid still empty
                        {
                            int grid_number = i * 3 + j + 1; // convert grid number to 1 - 9

                            if (turn) grid_mark = enemy_mark; // if player's turn, set grid to player's mark
                            else grid_mark = mark; // if AI's turn, set grid to AI's mark

                            grid[i, j] = grid_mark; // if we put mark here
                            int result = Minimax(depth + 1, !turn); // find out the score we got

                            if((turn && result < score) || (!turn && result > score)) // if we can minimize player score or maximize AI's score, take this move
                            {
                                score = result;
                                move = grid_number;
                            }

                            grid[i, j] = '.'; // reset grid to empty
                        }
                    }
                }
            }

            if (depth == 1) best_move = move; // set best move only when depth = 1
            return score; // return score from AI's perspective
        }

        public int GetNextMove()
        {
            int temp = Minimax(1, false); // start Minimax with depth = 1 and AI's turn
            return best_move; // return grid number
        }
    }
}