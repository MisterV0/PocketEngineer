#include <stdio.h>

void SortArray_and_checkMajorityElement (int array[], int size)
{
  //firstly let's order the array from lowest to highest number

  for(int i = 0; i < size; i++)
  { 
    for(int j = 0; j < size - 1; j++)
    {
        if (array[j] > array[j+1])
        {
            int temp = array[j];
            array[j] = array[j+1];
            array [j+1] = temp;
        }
    }
}
    for(int i = 0; i < size; i++)
    {
        printf("%d ",array[i]);
    }

    //assuming the array inserted is surely containing a majority element, we can simply check the middle number which contains it
    int majority = size / 2;

    printf("The number that is majoritary: %d",array[majority]);

}

void findUniqueElement (int array[],int size)
{
   
}


int main() {
    int myArray[] = {1,1,1,1,4,5,5,5,0,5,13,15,2,4,2,5,6,8,1,2,3,9,1,4,6};
    int size = sizeof (myArray) / sizeof(myArray[0]);
    //SortArray_and_checkMajorityElement(myArray, size);
    findUniqueElement(myArray, size);
    

    return 0;
}