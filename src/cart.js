/**
 * 購物車模組
 * 負責計算商品小計、折扣、運費與總金額
 */

// Bug 1（邊界條件）：數量為 0 或負數時應拋出錯誤，但這裡直接放行
function calculateSubtotal(price, quantity) {
    return price * quantity;
}

// Bug 2（邏輯錯誤）：折扣條件寫反了
// 原意：消費滿 1000 打九折，滿 2000 打八折
// 實際：金額越小折扣越大
function applyDiscount(subtotal) {
    if (subtotal > 2000) {
        return subtotal * 0.9;  // 應該是 0.8
    } else if (subtotal > 1000) {
        return subtotal * 0.8;  // 應該是 0.9
    }
    return subtotal;
}

// Bug 3（未處理例外）：items 為 null 或 undefined 時會直接 crash
function calculateTotal(items) {
    let subtotal = 0;

    for (const item of items) {
        subtotal += calculateSubtotal(item.price, item.quantity);
    }

    const discounted = applyDiscount(subtotal);

    // Bug 4（邏輯錯誤）：免運費門檻判斷寫成 < 而非 >=
    // 原意：滿 500 免運費，未滿收 60 元
    const shipping = discounted < 500 ? 0 : 60;

    return {
        subtotal,
        discounted,
        shipping,
        total: discounted + shipping,
    };
}

module.exports = { calculateSubtotal, applyDiscount, calculateTotal };
