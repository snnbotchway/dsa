
 class ListNode {
     val: number
     next: ListNode | null
     constructor(val?: number, next?: ListNode | null) {
         this.val = (val===undefined ? 0 : val)
         this.next = (next===undefined ? null : next)
     }
 }
 

function deleteMiddle(head: ListNode | null): ListNode | null {
    if(!head?.next) return null

    let middle: ListNode = head
    let tip: ListNode | null = head
    let prev: ListNode  = head

    while(tip?.next){
        prev = middle
        middle = middle!.next!
        tip = tip.next.next
    }

    prev.next = middle!.next
    
    return head
};