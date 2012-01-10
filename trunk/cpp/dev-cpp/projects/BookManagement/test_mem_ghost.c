#include <stdio.h>
#include <stdlib.h>

int	lengthOfBooks	= 5;				// 图书数量

char	*yesUpper	= "Y",
	*yesLower	= "y";

enum	{N = 0, Y = 1} ;

struct Books {
	char	bookID[3];			// 图书编号
	int	exists;				// 是否存在
};

int getBookSize() {
	struct Books oneBook;
	return	sizeof(oneBook);
}


int main(int argc, char *argv[]) {

	struct	Books myBook[lengthOfBooks];			// 图书结构体数组，每个元素是一本图书的结构体

	// 把结构体生成的内存区域全部置空
	memset(myBook, 0, getBookSize() * lengthOfBooks);

	int	i;
	char	existChar[lengthOfBooks];

	// 从键盘输入图书信息
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

