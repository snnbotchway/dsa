function reverseList(head: ListNode | null): ListNode | null {
    let prev = null
    let current = head

    while(current){
        const next = current.next
        current.next = prev

        prev = current
        current = next
    }

    return prev
};
