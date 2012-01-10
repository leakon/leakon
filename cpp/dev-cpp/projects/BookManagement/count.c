#include <stdio.h>
#include <stdlib.h>

#include "myBook.h"

// CountBooks.exe
// 输出录入信息完整的（包含图书ID和图书名称）图书总数
int main(int argc, char *argv[]) {

	int		i, totalBooks = 0;
	char		emptyChar[] = "";	// 空字符，用于检查图书信息是否完整

	int		bookLength;
	bookLength	= getBookSize() * lengthOfBooks;

	// 注意，一定要预先分配好足够长度的数组空间和内存空间，否则在后面加载文件内容时会崩溃
	struct Books	myPointer[bookLength];

	// 加载存放于文件中的图书信息
	loadFromFile(myPointer);

	for (i = 0; i < lengthOfBooks; i++) {

	//	printf("%s\n", myPointer[i].bookName);	// debug

		// 检查图书的名称和编号，当二者都不为空值时，才认为图书是有效的
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



