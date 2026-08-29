export const arraySnippets = {
  declare: `int Size; // chosen by user
int arr[Size];
int length = 0;`,

  insert: `void InsertAt(int arr[], int& length, int pos, int value)
{
    if (pos < 0 || pos > length)
    {
        cout << "Out of Range!";
        return;
    }

    for (int i = length; i > pos; i--)
        arr[i] = arr[i - 1];

    arr[pos] = value;
    length++;
}`,

  delete: `void DeleteAt(int arr[], int& length, int pos)
{
    if (pos < 0 || pos >= length)
    {
        cout << "Out of Range!";
        return;
    }

    for (int i = pos; i < length - 1; i++)
        arr[i] = arr[i + 1];

    length--;
}`,

  print: `void PrintArray(int arr[], int length)
{
    for (int i = 0; i < length; i++)
        cout << arr[i] << "  ";
}`,
};

export const stackSnippets = {
  declare: `int Size; // chosen by user
int Stack[Size];
int top = -1;`,

  push: `void PushStack(int& top)
{
    int value = 0;

    if (top == Size - 1)
        cout << "Sorry, The stack is already Full!";
    else
    {
        cout << "Enter the value: ";
        cin >> value;
        top++;
        Stack[top] = value;
    }
}`,

  pop: `void PopStack(int& top)
{
    int value = 0;

    if (top == -1)
        cout << "Sorry, The stack is empty!";
    else
    {
        value = Stack[top];
        top--;
    }
}`,

  print: `void PrintStack(int& top)
{
    if (top == -1)
        cout << "Sorry, The stack is empty!";
    else
    {
        for (int i = top; i >= 0; i--)
            cout << Stack[i] << endl;
    }
}`,
};


export const queueSnippets = {
  declare: `int Size; // chosen by user
int Queue[Size];
int Front = -1, Rear = -1;`,

  insert: `void InsertQueue(int& Front, int& Rear)
{
    int value = 0;

    if (Rear == Size - 1)
        cout << "Sorry, Queue is Full!";
    else
    {
        cout << "Enter the value: ";
        cin >> value;
        Rear++;
        Queue[Rear] = value;
    }
    if (Front == -1)
        Front++;
}`,

  delete: `void DeleteQueue(int& Front, int& Rear)
{
    int value = 0;

    if (Front == -1)
        cout << "Sorry, Queue is empty!";

    else if (Front == Rear)
    {
        value = Queue[Front];
        Front = -1;
        Rear = -1;
    }
    else
    {
        value = Queue[Front];
        Front++;
    }
}`,

  print: `void PrintQueue(int& Front, int& Rear)
{
    if (Front == -1)
        cout << "Sorry, Queue is empty!";
    else
    {
        for (int i = Front; i <= Rear; i++)
            cout << Queue[i] << "  ";
    }
}`,
};


export const circularQueueSnippets = {
  declare: `int Size; // chosen by user
int CQueue[Size];
int Front = -1, Rear = -1;`,

  insert: `void InsertCqueue(int& Front, int& Rear)
{
    int value = 0;

    if ((Rear == Size - 1 && Front == 0) || Front == Rear + 1)
        cout << "Circular Queue is Full!";

    else if (Front > 0 && Rear == Size - 1)
    {
        cout << "Enter the value: ";
        cin >> value;
        Rear = 0;
        CQueue[Rear] = value;
    }
    else
    {
        cout << "Enter the value: ";
        cin >> value;
        Rear++;
        CQueue[Rear] = value;
    }

    if (Front == -1)
        Front++;
}`,

  delete: `void DeleteCqueue(int& Front, int& Rear)
{
    int value = 0;

    if (Front == -1)
        cout << "Circular Queue is Empty";

    else if (Front == Rear)
    {
        CQueue[Front] = value;
        Front = -1;
        Rear = -1;
    }
    else if (Front == Size - 1 && Front > Rear)
    {
        value = CQueue[Front];
        Front = 0;
    }
    else
    {
        value = CQueue[Front];
        Front++;
    }
}`,

  print: `void PrintCqueue(int& Front, int& Rear)
{
    if (Front == -1)
        cout << "Circular Queue is Empty";
    else if (Rear >= Front)
    {
        for (int i = Front; i <= Rear; i++)
            cout << CQueue[i] << "  ";
    }
    else
    {
        for (int i = Front; i < Size; i++)
            cout << CQueue[i] << "  ";
        for (int i = 0; i <= Rear; i++)
            cout << CQueue[i] << "  ";
    }
}`,
};


export const linkedListSnippets = {
  declare: `struct Node
{
    int data;
    Node* Next;
};

Node* Head = NULL;
Node* Last = NULL;
int Length = 0;`,

  insertStart: `void InsertStart()
{
    Node* newNode = new Node;
    newNode->data = value;

    if (Length == 0)
    {
        newNode->Next = NULL;
        Head = newNode;
        Last = newNode;
    }
    else
    {
        newNode->Next = Head;
        Head = newNode;
    }
    Length++;
}`,

  insertEnd: `void InsertEnd()
{
    Node* newNode = new Node;
    newNode->data = value;

    if (Length == 0)
    {
        newNode->Next = NULL;
        Head = newNode;
        Last = newNode;
    }
    else
    {
        Last->Next = newNode;
        newNode->Next = NULL;
        Last = newNode;
    }
    Length++;
}`,

  insertPos: `void InsertPos()
{
    if (Pos < 0 || Pos > Length)
        cout << "Out of Range";

    else if (Pos == 0)
        InsertStart();

    else if (Pos == Length)
        InsertEnd();

    else
    {
        Node* newNode = new Node;
        Node* CurNode = Head;
        newNode->data = value;

        for (int i = 1; i < Pos; i++)
            CurNode = CurNode->Next;

        newNode->Next = CurNode->Next;
        CurNode->Next = newNode;
        Length++;
    }
}`,

  deleteStart: `void DeleteStart()
{
    Node* CurrentNode = Head;

    if (Length == 0)
        cout << "List is empty!";

    else if (Length == 1)
    {
        Head = Last = NULL;
        delete(CurrentNode);
        Length--;
    }
    else
    {
        Head = Head->Next;
        delete(CurrentNode);
        Length--;
    }
}`,

  deleteEnd: `void DeleteEnd()
{
    Node* CurrentNode = Head;
    Node* PrevNode = Head;

    if (Length == 0)
        cout << "List is empty!";

    else if (Length == 1)
    {
        Head = Last = NULL;
        delete(CurrentNode);
        Length--;
    }
    else
    {
        while (CurrentNode->Next != NULL)
        {
            PrevNode = CurrentNode;
            CurrentNode = CurrentNode->Next;
        }
        PrevNode->Next = NULL;
        Last = PrevNode;
        delete(CurrentNode);
        Length--;
    }
}`,

  deletePos: `void DeletePos()
{
    if (Pos < 0 || Pos >= Length)
        cout << "Out of Range";

    else if (Pos == 0)
        DeleteStart();

    else if (Pos == Length - 1)
        DeleteEnd();

    else
    {
        Node* PrevNode = Head;
        Node* CurrentNode = Head->Next;

        for (int i = 1; i < Pos; i++)
        {
            PrevNode = CurrentNode;
            CurrentNode = CurrentNode->Next;
        }
        PrevNode->Next = CurrentNode->Next;
        delete(CurrentNode);
        Length--;
    }
}`,

  print: `void PrintList()
{
    Node* CurrentNode = Head;
    while (CurrentNode != NULL)
    {
        cout << CurrentNode->data << "  ";
        CurrentNode = CurrentNode->Next;
    }
}`,
};

export const circularLinkedListSnippets = {
  declare: `struct Node
{
    int data;
    Node* Next;
};

Node* Head = NULL;
Node* Last = NULL;
int Length = 0;`,

  insertStart: `void InsertStart()
{
    Node* newNode = new Node;
    newNode->data = value;

    if (Length == 0)
    {
        newNode->Next = newNode;
        Head = newNode;
        Last = newNode;
    }
    else
    {
        newNode->Next = Head;
        Head = newNode;
        Last->Next = newNode;
    }
    Length++;
}`,

  insertEnd: `void InsertEnd()
{
    Node* newNode = new Node;
    newNode->data = value;

    if (Length == 0)
    {
        newNode->Next = newNode;
        Head = newNode;
        Last = newNode;
    }
    else
    {
        Last->Next = newNode;
        newNode->Next = Head;
        Last = newNode;
    }
    Length++;
}`,

  insertPos: `void InsertPos()
{
    if (Pos < 0 || Pos > Length)
        cout << "Out of Range";

    else if (Pos == 0)
        InsertStart();

    else if (Pos == Length)
        InsertEnd();

    else
    {
        Node* newNode = new Node;
        Node* CurNode = Head;
        newNode->data = value;

        for (int i = 1; i < Pos; i++)
            CurNode = CurNode->Next;

        newNode->Next = CurNode->Next;
        CurNode->Next = newNode;
        Length++;
    }
}`,

  deleteStart: `void DeleteStart()
{
    Node* CurrentNode = Head;

    if (Length == 0)
        cout << "List is empty!";

    else if (Length == 1)
    {
        Head = Last = NULL;
        delete(CurrentNode);
        Length--;
    }
    else
    {
        Head = Head->Next;
        Last->Next = Head;
        delete(CurrentNode);
        Length--;
    }
}`,

  deleteEnd: `void DeleteEnd()
{
    Node* CurrentNode = Head;
    Node* PrevNode = Head;

    if (Length == 0)
        cout << "List is empty!";

    else if (Length == 1)
    {
        Head = Last = NULL;
        delete(CurrentNode);
        Length--;
    }
    else
    {
        while (CurrentNode->Next != Head)
        {
            PrevNode = CurrentNode;
            CurrentNode = CurrentNode->Next;
        }
        PrevNode->Next = Head;
        Last = PrevNode;
        delete(CurrentNode);
        Length--;
    }
}`,

  deletePos: `void DeletePos()
{
    if (Pos < 0 || Pos >= Length)
        cout << "Out of Range";

    else if (Pos == 0)
        DeleteStart();

    else if (Pos == Length - 1)
        DeleteEnd();

    else
    {
        Node* PrevNode = Head;
        Node* CurrentNode = Head->Next;

        for (int i = 1; i < Pos; i++)
        {
            PrevNode = CurrentNode;
            CurrentNode = CurrentNode->Next;
        }
        PrevNode->Next = CurrentNode->Next;
        delete(CurrentNode);
        Length--;
    }
}`,

  print: `void PrintList()
{
    Node* CurrentNode = Head;
    do
    {
        cout << CurrentNode->data << "  ";
        CurrentNode = CurrentNode->Next;
    } while (CurrentNode != Head);
}`,
};