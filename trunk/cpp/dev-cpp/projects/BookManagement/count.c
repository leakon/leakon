#include <stdio.h>
#include <stdlib.h>

#include "myBook.h"

// CountBooks.exe
// ���¼����Ϣ�����ģ�����ͼ��ID��ͼ�����ƣ�ͼ������
int main(int argc, char *argv[]) {

	int		i, totalBooks = 0;
	char		emptyChar[] = "";	// ���ַ������ڼ��ͼ����Ϣ�Ƿ�����

	int		bookLength;
	bookLength	= getBookSize() * lengthOfBooks;

	// ע�⣬һ��ҪԤ�ȷ�����㹻���ȵ�����ռ���ڴ�ռ䣬�����ں�������ļ�����ʱ�����
	struct Books	myPointer[bookLength];

	// ���ش�����ļ��е�ͼ����Ϣ
	loadFromFile(myPointer);

	for (i = 0; i < lengthOfBooks; i++) {

	//	printf("%s\n", myPointer[i].bookName);	// debug

		// ���ͼ������ƺͱ�ţ������߶���Ϊ��ֵʱ������Ϊͼ������Ч��
		if (myPointer[i].bookName != NULL && myPointer[i].bookID != NULL
			&& ( 0 != strcmp(emptyChar, myPointer[i].bookName) )
			&& ( 0 != strcmp(emptyChar, myPointer[i].bookID) )
		) {
			totalBooks++;
		}
	}

	printf("There are %d books!", totalBooks);

	return 0;
}



