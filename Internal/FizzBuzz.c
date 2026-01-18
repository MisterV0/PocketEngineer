#include <stdio.h>

void FizzBuzz (int array[], int size) 
{
    for ( int i = 0; i < size; i++ )
    {
        if ( array[i] % 3 == 0 && array[i] % 5 == 0 )
        {
            printf("FizzBuzz\n");
        }
        else if ( array[i] % 3 == 0 )
        {
            printf("Fizz\n");
        }
        else if ( array[i] % 5 == 0 )
        {
            printf("Buzz\n");
        }
        else
        {
            printf("%d\n", array[i]);
        }
    }
}

int main() { 
    
    int myArray[] = {1,2,3,4,5,6,7,8,9,10};
    int size = 10;
    FizzBuzz(myArray, size);
    return 0;
}


