export const objectToQuery = obj => {
    const query = Object.entries(obj).map(item => item.join('=')).join('&');
    return `?${query}`;
}

export const queryToObject = query => {
    const arr = query.split('&').map(item => {
        return item.split('=');
    });
    const obj = {};
    arr.forEach(item => {
        obj[item[0]] = item[1];
    });

    return obj;
}

export const getVideoHeight = (videoWidth, videoHeight) => {
    const windowWidth = window.innerWidth;
    const scale =  windowWidth / videoWidth;
    return (videoHeight * scale) | 0;
}