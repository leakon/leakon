
int	lengthOfBooks	= 20;				// 图书数量
char	outputFile[]	= "books_manager.txt";		// 输出的文件
char	*yesUpper	= "Y",
	*yesLower	= "y";

// 枚举类型，用于标识图书是否存在
enum	{N = 0, Y = 1} ;

struct Books {

	char	bookName[10];			// 图书名称
	char	bookID[3];			// 图书编号
	float	unitPrice;			// 单价
	char	author[10];			// 作者
	int	exists;				// 是否存在
	char	borrowerName[8];		// 借书人姓名
	char	borrowerID[3];			// 借书人学号

};

int getBookSize() {
	struct Books oneBook;
	return	sizeof(oneBook);
}

// 加载存放于文件中的图书信息
void loadFromFile(struct Books *ptrBook) {

	FILE	*fp;
	fp	= fopen(outputFile, "rb");		// 采用只读方式读取或建立一个新的文件
	if (fp == NULL) {
		printf("Open file failed!\n");
		return;
	}

	// ptrBook 必须是外部指针，因为函数调用结束后会清空堆栈段内的所有数据
	// 因此函数内部的变量指针是不能留给外部使用的
	// 在外部声明好足够长度的内存空间，通过参数把指针变量传递进来，赋值后外部即可读取到数据
	fread(ptrBook, getBookSize(), lengthOfBooks, fp);
	return;

}

