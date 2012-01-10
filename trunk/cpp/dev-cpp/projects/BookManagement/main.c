#include <stdio.h>
#include <stdlib.h>

#include "myBook.h"

// BookManagement.exe
// �ֹ���ͨ�� shell> BookManagement.exe < input.txt ¼��ͼ������
int main(int argc, char *argv[]) {

	struct	Books myBook[lengthOfBooks];			// ͼ��ṹ�����飬ÿ��Ԫ����һ��ͼ��Ľṹ��

	FILE	*fp;
	fp	= fopen(outputFile, "wb+");			// ���ö�д��ʽ����һ���µ��ļ�


	// �ѽṹ�����ɵ��ڴ�����ȫ���ÿ�
	memset(myBook, 0, getBookSize() * lengthOfBooks);


	int	i, index;

	// ����Ϊÿһ��ѭ������һ���������ַ���ſռ䣬���� exists ���Ի����Ŀǰ��δ�ҵ�����ԭ��
	char	existChar[lengthOfBooks];

	struct	Books oneBook;


	// �Ӽ�������ͼ����Ϣ
	for (i = 0; i < lengthOfBooks; i++) {

		index	= i;

		printf("\n----Loop %d----\n", i);

		printf("Book name:");
		scanf("%s", myBook[index].bookName);

		printf("Book ID:");
		scanf("%s", myBook[index].bookID);

		printf("Book unit price:");
		scanf("%f", &myBook[index].unitPrice);

		printf("Book author:");
		scanf("%s", myBook[index].author);

		printf("Book exists[y/n]:");
		scanf("%s", &existChar[index]);

		if (0 == strcmp(&existChar[index], yesUpper) || 0 == strcmp(&existChar[index], yesLower)) {
			myBook[index].exists	= Y;
		} else {
			myBook[index].exists	= N;
		}

//		printf("[[%d]]", myBook[index].exists);		// debug

		printf("Book borrowerName:");
		scanf("%s", myBook[index].borrowerName);
//		printf("%s", myBook[index].borrowerName);	// debug

		printf("Book borrowerID:");
		scanf("%s", myBook[index].borrowerID);

		// debug �����õĴ���Σ���ʽ����ʱӦ���ε����� 0 ��Ϊ if ������
		if (0) {
				printf("\n<!--");
			//	printf("[[%s]]", myBook[index].bookName);
				printf("[[%s]]", myBook[index].bookID);
			//	printf("[[%8.2f]]", myBook[index].unitPrice);
			//	printf("[[%d]]", myBook[index].exists);

				/*
				printf("[[%s]]", myBook[index].author);
				printf("[[%d]]", myBook[index].exists);
				printf("[[%s]]", myBook[index].borrowerName);
				printf("[[%s]]", myBook[index].borrowerID);
				*/

				printf("-->\n");

		}


	}

	// ��ͼ����Ϣ������ļ��б���

	int	writeQty;

	// ����ܹ�¼����������
	writeQty	= fwrite(myBook, getBookSize(), lengthOfBooks, fp);
	printf("\nWrite [%d] elements", writeQty);

	return 0;
}



