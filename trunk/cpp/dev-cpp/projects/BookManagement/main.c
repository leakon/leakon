#include <stdio.h>
#include <stdlib.h>

#include "myBook.h"

// BookManagement.exe
// 手工或通过 shell> BookManagement.exe < input.txt 录入图书内容
int main(int argc, char *argv[]) {

	struct	Books myBook[lengthOfBooks];			// 图书结构体数组，每个元素是一本图书的结构体

	FILE	*fp;
	fp	= fopen(outputFile, "wb+");			// 采用读写方式建立一个新的文件


	// 把结构体生成的内存区域全部置空
	memset(myBook, 0, getBookSize() * lengthOfBooks);


	int	i, index;

	// 必须为每一次循环分配一个独立的字符存放空间，否则 exists 属性会出错，目前还未找到根本原因
	char	existChar[lengthOfBooks];

	struct	Books oneBook;


	// 从键盘输入图书信息
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

		// debug 调试用的代码段，正式运行时应屏蔽掉：用 0 作为 if 的条件
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

	// 把图书信息输出到文件中保存

	int	writeQty;

	// 输出总共录入的书的数量
	writeQty	= fwrite(myBook, getBookSize(), lengthOfBooks, fp);
	printf("\nWrite [%d] elements", writeQty);

	return 0;
}



