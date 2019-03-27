#pragma once
#include<stdint.h>

template <class T>
struct Node {
	T val;
	intptr_t both;
};

template <class T>
class Xor
{
	Node<T> * start = 0;
	Node<T> * end = 0;

public:
	Xor() {};
	~Xor() {};
	
	void add(T val) {
		Node<T> * p = new Node<T>();
		p->val = val;

		if (this->end == 0) {
			this->start = this->end = p;
			p->both = 0;
			return;
		}
		this->end->both = 0 ^ this->end->both ^ reinterpret_cast<intptr_t>(p);
		p->both = reinterpret_cast<intptr_t>(this->end) ^ 0;
	};

	Node<T> * get(int i) {
		//记录总数的话可以先判断距离哪个近，这里略过
		Node<T> * rtn = start;
		intptr_t last = 0;
		for (int j = 0; j < i; j++) {
			intptr_t t = rtn->both ^ last;
			last = reinterpret_cast<intptr_t>(rtn);
			rtn = reinterpret_cast<Node<T> *>(t);
		}
		return rtn;
	};
	
};

