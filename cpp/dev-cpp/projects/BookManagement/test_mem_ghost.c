#include <stdio.h>
#include <stdlib.h>

int	lengthOfBooks	= 5;				// ͼ������

char	*yesUpper	= "Y",
	*yesLower	= "y";

enum	{N = 0, Y = 1} ;

struct Books {
	char	bookID[3];			// ͼ����
	int	exists;				// �Ƿ����
};

int getBookSize() {
	struct Books oneBook;
	return	sizeof(oneBook);
}


int main(int argc, char *argv[]) {

	struct	Books myBook[lengthOfBooks];			// ͼ��ṹ�����飬ÿ��Ԫ����һ��ͼ��Ľṹ��

	// �ѽṹ�����ɵ��ڴ�����ȫ���ÿ�
	memset(myBook, 0, getBookSize() * lengthOfBooks);

	int	i;
	char	existChar[lengthOfBooks];

	// �Ӽ�������ͼ����Ϣ
	for (i = 0; i < lengthOfBooks; i++) {

		printf("\n----Loop %d----\n", i + 1);

		printf("Book ID:");
		scanf("%s", myBook[i].bookID);


		printf("Book exists[y/n]:");
		scanf("%s", &existChar[i]);


/*
		if (0 == strcmp(existChar, yesUpper) || 0 == strcmp(existChar, yesLower)) {
			myBook[i].exists	= Y;
		} else {
			myBook[i].exists	= N;
		}
*/


		printf("bookID	[%s]\n", myBook[i].bookID);


	}

	return 0;
}

