#include <cstdio>
#include <iostream> 

#include "Xor.cpp"
using namespace std;
int main()
{
	Xor<int> * x = new Xor<int>();
	x->add(1);
	x->add(2);
	cout << x->get(0)->val << endl;
	cout << x->get(1)->val << endl;

    return 0;
}

