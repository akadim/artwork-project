const formatByteSize = (number: number, decimals = 2) => {
    if(number == 0) return '0 Bytes';
    const k = 1000,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(number) / Math.log(k));
    return parseFloat((number / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default formatByteSize;