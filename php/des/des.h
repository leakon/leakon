
//des.h

#ifndef __DES_H 
#define __DES_H 

#include <stdio.h>

class DES{
public: 

// Encrypt/decrypt the data in "data", according to the "key". 
// Caller is responsible for confirming the buffer size of "data" 
// points to is 8*"blocks" bytes. 
// The data encrypted/decrypted is stored in data. 
// The return code is 1:success, other:failed. 

int encrypt ( unsigned char key[8], unsigned char* data, int blocks = 1 ); 
int decrypt ( unsigned char key[8], unsigned char* data, int blocks = 1 ); 

// Encrypt/decrypt any size data,according to a special method. 
// Before calling yencrypt, copy data to a new buffer with size 
// calculated by extend. 

int yencrypt ( unsigned char key[8], unsigned char* data, int size ); 
int ydecrypt ( unsigned char key[8], unsigned char* in, int blocks, int* size = 0 ); 
int extend ( int size ) { return (size/8+1)*8; }; 

private: 
void des(unsigned char* in, unsigned char* out, int blocks); 
void des_block(unsigned char* in, unsigned char* out); 

private: 
unsigned long KnL[32];
enum Mode { ENCRYPT, DECRYPT }; 
void deskey(unsigned char key[8], Mode md); 
void usekey(unsigned long *); 
void cookey(unsigned long *); 

private: 
void scrunch(unsigned char *, unsigned long *); 
void unscrun(unsigned long *, unsigned char *); 
void desfunc(unsigned long *, unsigned long *); 

}; 
#endif 