
int	lengthOfBooks	= 20;				// ͼ������
char	outputFile[]	= "books_manager.txt";		// ������ļ�
char	*yesUpper	= "Y",
	*yesLower	= "y";

// ö�����ͣ����ڱ�ʶͼ���Ƿ����
enum	{N = 0, Y = 1} ;

struct Books {

	char	bookName[10];			// ͼ������
	char	bookID[3];			// ͼ����
	float	unitPrice;			// ����
	char	author[10];			// ����
	int	exists;				// �Ƿ����
	char	borrowerName[8];		// ����������
	char	borrowerID[3];			// ������ѧ��

};

int getBookSize() {
	struct Books oneBook;
	return	sizeof(oneBook);
}

// ���ش�����ļ��е�ͼ����Ϣ
void loadFromFile(struct Books *ptrBook) {

	FILE	*fp;
	fp	= fopen(outputFile, "rb");		// ����ֻ����ʽ��ȡ����һ���µ��ļ�
	if (fp == NULL) {
		printf("Open file failed!\n");
		return;
	}

	// ptrBook �������ⲿָ�룬��Ϊ�������ý��������ն�ջ���ڵ���������
	// ��˺����ڲ��ı���ָ���ǲ��������ⲿʹ�õ�
	// ���ⲿ�������㹻���ȵ��ڴ�ռ䣬ͨ��������ָ��������ݽ�������ֵ���ⲿ���ɶ�ȡ������
	fread(ptrBook, getBookSize(), lengthOfBooks, fp);
	return;

}

