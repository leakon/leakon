#include <stdio.h>
#include <stdlib.h>

#include "myBook.h"

// SearchBook.exe
// ����ͼ���ţ����������������ѧ��
int main(int argc, char *argv[]) {

	int		i;
	char		emptyChar[] = "";
	char		bookID[3];

	int		bookLength;
	bookLength	= getBookSize() * lengthOfBooks;

	// ע�⣬һ��ҪԤ�ȷ�����㹻���ȵ�����ռ���ڴ�ռ䣬�����ں�������ļ�����ʱ�����
	struct Books	myPointer[bookLength];

	// ���ش�����ļ��е�ͼ����Ϣ
	loadFromFile(myPointer);

	// �Ӽ�������Ҫ���ҵ�ͼ����
	printf("Please input the bookID:");
	scanf("%s", bookID);

	if (bookID != NULL && 0 != strcmp(emptyChar, bookID)) {

		for (i = 0; i < lengthOfBooks; i++) {

		//	printf("%s\n", myPointer[i].bookName);	// debug

			if (myPointer[i].bookName != NULL && myPointer[i].bookID != NULL
				&& ( 0 != strcmp(emptyChar, myPointer[i].bookName) )
				&& ( 0 != strcmp(emptyChar, myPointer[i].bookID) )

				&& 0 == strcmp(bookID, myPointer[i].bookID)
			) {

				// �ҵ�ָ��ID��ͼ��

				// debug �����õĴ���Σ���ʽ����ʱӦ���ε����� 0 ��Ϊ if ������
				if (0) {

					printf("[[%s]]", myPointer[i].bookName);
					printf("[[%s]]", myPointer[i].bookID);
					printf("[[%8.2f]]", myPointer[i].unitPrice);
					printf("[[%s]]", myPointer[i].author);
					printf("[[%d]]", myPointer[i].exists);
					printf("[[%s]]", myPointer[i].borrowerName);
					printf("[[%s]]", myPointer[i].borrowerID);
					printf("\n");

				}

				// �ڿ��У�δ�����
				if (myPointer[i].exists == Y) {

					printf("Found the book, but it is in the library.");
					return	0;

				} else {
					// ���ڿ��У��ѽ��
					printf("Found the book, it is borrowed by %s, the borrowerID is %s.",
						myPointer[i].borrowerName, myPointer[i].borrowerID
					);
					return	0;

				}


			}
		}


	}

	// û�ҵ�
	printf("Sorry, the book you are looking for doesn't exist.");

	return 0;
}



