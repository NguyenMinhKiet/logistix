/**
 * Format ngày thành DD-MM-YYYY
 */
export function formatDate(date: Date | string): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

/**
 * Format số với dấu "," ngăn cách hàng nghìn
 */
export function formatNumber(num: number | string): string {
    return new Intl.NumberFormat('vi-VN').format(Number(num));
}
