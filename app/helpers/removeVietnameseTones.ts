function removeVietnameseTones(str: string) {
    return str
        .normalize('NFD') // tách ký tự có dấu thành base + dấu
        .replace(/[\u0300-\u036f]/g, '') // xoá các dấu
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}
