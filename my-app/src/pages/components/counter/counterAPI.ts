export default function fetchCount (amount = 1) {
    return new Promise<{data:number}>((resolve:any) => {
        setTimeout(() => resolve({data:amount}),100)
    });
}