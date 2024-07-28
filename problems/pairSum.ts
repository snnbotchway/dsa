function pairSum(head: ListNode | null): number {
    let slow = head
    let fast = head
    let next = slow?.next
    let prev = null

    while(fast?.next?.next){
        prev = slow
        slow = next!
        fast = fast.next.next

        next = slow.next
        slow.next = prev
    }

    let max = -Infinity


    while(slow && next){
        const sum = slow.val + next!.val
        if(sum > max) max = sum
        slow = slow.next
        next = next.next
    }

    return max
};