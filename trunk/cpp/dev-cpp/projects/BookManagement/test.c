#include <stdio.h>

int main(int argc, char *argv[]) {

	FILE	*fp;
	fp	= fopen("D:\\books_manager.txt", "rb");
	if (fp == NULL) {
		printf("Open file failed!\n");
		return;
	}

	char buffer[100];

	fread(buffer, 1, 1, fp);

	return 0;
}



