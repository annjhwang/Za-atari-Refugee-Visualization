// ****************************************************************** //
// ********************** PRIM'S ALGORITHM ************************** //
// ************************** CS124 PA2 ***************************** //
// ************************* JASON SHEN ***************************** //
// ************************* ANNIE HWANG **************************** //
// ****************************************************************** //
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <stdbool.h>
#include <time.h>
#include <math.h>



// ****************************************************************** //
// ********************** RUNNING THE CODE ************************** //
// ****************************************************************** //

int main(int argc, char** argv)
{
    time_t t;
    srand((unsigned) time(&t));

    time_t start, stop;
    clock_t ticks; long count;
    time(&start);

    int dim = atoi(argv[2]);
    char * inputfile = argv[3];

    int mat1[dim][dim];

    for (int i = 0; i < dim; i++){
    	for (int j = 0; j < dim; j++){
    		scanf("%d", &mat1[i][j]);
    	}
    }

    int mat2[dim][dim];

    for (int i = 0; i < dim; i++){
    	for (int j = 0; j < dim; j++){
    		scanf("%d", &mat2[i][j]);
    	}
    }

    int product[dim][dim] = strassenMult(mat1, mat2) 

    printf("")



}

int convMult (int * n1[], int * n2[]){

}

int strassenMult (int * n1[], int* n2[]){

}

