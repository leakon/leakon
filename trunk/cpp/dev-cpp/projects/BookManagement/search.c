#include <stdio.h>
#include <stdlib.h>

#include "myBook.h"

// SearchBook.exe
// 输入图书编号，输出借书人姓名和学号
int main(int argc, char *argv[]) {

	int		i;
	char		emptyChar[] = "";
	char		bookID[3];

	int		bookLength;
	bookLength	= getBookSize() * lengthOfBooks;

	// 注意，一定要预先分配好足够长度的数组空间和内存空间，否则在后面加载文件内容时会崩溃
	struct Books	myPointer[bookLength];

	// 加载存放于文件中的图书信息
	loadFromFile(myPointer);

	// 从键盘输入要查找的图书编号
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

				// 找到指定ID的图书

				// debug 调试用的代码段，正式运行时应屏蔽掉：用 0 作为 if 的条件
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

				// 在库中（未借出）
				if (myPointer[i].exists == Y) {

					printf("Found the book, but it is in the library.");
					return	0;

				} else {
					// 不在库中，已借出
					printf("Found the book, it is borrowed by %s, the borrowerID is %s.",
						myPointer[i].borrowerName, myPointer[i].borrowerID
					);
					return	0;

				}


			}
		}


	}

	// 没找到
	printf("Sorry, the book you are looking for doesn't exist.");

	return 0;
}



