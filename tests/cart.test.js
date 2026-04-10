const { calculateSubtotal, applyDiscount, calculateTotal } = require('../src/cart');

function run(label, fn) {
    try {
        const result = fn();
        console.log(label, '=>', result);
    } catch (e) {
        console.log(label, '=> [Error]', e.message);
    }
}

// 測試 calculateSubtotal
console.log('=== calculateSubtotal ===');
run('(100, 3)  預期 300', () => calculateSubtotal(100, 3));
run('(100, 0)  預期拋出錯誤', () => calculateSubtotal(100, 0));
run('(100, -1) 預期拋出錯誤', () => calculateSubtotal(100, -1));

// 測試 applyDiscount
console.log('\n=== applyDiscount ===');
run('(500)  未達門檻，預期 500', () => applyDiscount(500));
run('(1500) 滿1000，預期九折 1350', () => applyDiscount(1500));
run('(2500) 滿2000，預期八折 2000', () => applyDiscount(2500));

// 測試 calculateTotal
console.log('\n=== calculateTotal ===');
const items = [
    { name: '鍵盤', price: 800, quantity: 1 },
    { name: '滑鼠', price: 300, quantity: 2 },
];
// subtotal=1400，九折=1260，滿500免運
// 預期：{ subtotal: 1400, discounted: 1260, shipping: 0, total: 1260 }
run('正常商品清單', () => calculateTotal(items));

console.log('\n=== calculateTotal 邊界測試 ===');
run('null 輸入，預期有意義的錯誤訊息', () => calculateTotal(null));
run('空陣列 []', () => calculateTotal([]));
