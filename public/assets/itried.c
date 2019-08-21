#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include <semaphore.h>

typedef char string30[30];

int read_file(int *n1, int *n2){
	FILE *fp;
	char line[1024]={0,};
	char temp[1024];
	int i=0, j=0;
	fp = fopen("fibo.txt", "r");	
	
	if (fp == NULL){
        printf("Error Reading File\n");
		system("pause");
		fclose(fp);
		return -1;
    }	
    
    while( fgets(line, sizeof(line), fp) ) 
    	i++;
	

    *n2 = atoi(line);
    
    fclose(fp);
    fp = fopen("fibo.txt", "r");
    
	while( fgets(line, sizeof(line), fp)) {
		j++;
		if (i-1 == j) {
			strcpy(temp, line);
		}
	}
		
    *n1 = atoi(temp);

    fclose(fp);
    
	return 0;
	
}

int compute_fibo(int n1, int n2) {
	return n1 + n2;
}

void write_fibo(int fibnum) {
	FILE *fp;
	fp = fopen("fibo.txt", "a");
	
	printf("fibnum = %d\n\n", fibnum);
	fprintf(fp, "\n%d", fibnum);
	
	
	fclose(fp);
}

void fibo( void ) {
	int n1, n2;
	if (read_file(&n1, &n2) == 0) {
		printf("n1 = %d\n", n1);
		printf("n2 = %d\n", n2);
		write_fibo(compute_fibo(n1, n2));
	}		
	
}


int main( void ){
    int p1ready=0;
    int p2ready=0;
    int pid;
    int exit_code;
	int n = 2, i;
    sem_t *sem1 = sem_open("test_semaphore", O_CREAT|O_EXCL);
    sem_t *sem2 = sem_open("test_semaphore", O_CREAT|O_EXCL);
    
    pid=fork();
	
    pid=fork();
    if(pid==0){
        sem_wait(sem1);
        int count1=0;
        for (i=1; i<=n; i++)
            fibo();
        exit(0);
    }
    else{
        pid=fork();
        if(pid==0){
        sem_wait(sem2);
        int count2=0;
        for (i=1; i<=n; i++)
                fibo();
            exit(0);
        }
        else{
         sem_post(sem1);
         sem_post(sem2);
         int status;
         wait(&status);
         wait(&status);
         }
    
	return 0;
    }}
