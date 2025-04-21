// Add this at the top of MyCart_screen.js, before the component
const getPaymentIcon = (paymentType) => {
    if (!paymentType) return 'credit-card-outline';

    const type = paymentType.toLowerCase();
    const iconMap = {
        'visa': 'credit-card',
        'mastercard': 'credit-card-multiple',
        'amex': 'credit-card',
        'discover': 'credit-card',
        'jcb': 'credit-card',
        'diners': 'credit-card',
        'paypal': 'paypal',
        'momo': 'cellphone',
        'zalopay': 'wallet',
        'vnpay': 'wallet',
    };

    return iconMap[type] || 'credit-card-outline';
};
export default getPaymentIcon;
