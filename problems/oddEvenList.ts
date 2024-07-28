function oddEvenList(head: ListNode | null): ListNode | null {
    if(!head?.next) return head

    let odd = head
    let even = head.next
    let evenHead = even

    while(odd.next?.next || even.next?.next){
        if(odd.next?.next){
            odd.next = odd.next.next
            odd = odd.next
        }
        
        if(even.next?.next){
            even.next = even.next.next
            even = even.next
        }
    }

    even.next = null
    odd.next = evenHead
    return head
};