import { objectToQuery } from '../assets/util';

export default async (url, originQuery = {}, method = 'get') => {
    if (!url) {
        return new Error('必须接受一个 uri 参数');
    }
    url = url.replace('baobab.kaiyanapp.com', 'admin.itsheng.net');
    url = url.replace('www.eyepetizer.net', 'kaiyan.itsheng.net');

    Object.assign(originQuery, {
        _s: '45ad51bc80e7ba9dc028aabad3cdd124',
        v: '3.15.1',
        vc: '3951',
        f: 'iphone',
        net: 'wifi',
        p_product: 'EYEPETIZER_IOS',
        u: '33aeddea51fc808d6dfc9f3bb66f7b4eaa177900'
    });
    const query = objectToQuery(originQuery);

    url = `${url}${query}`;

    try {
        const res = await axios.request({
            url,
            method,
            timeout: 10000
        });
        return res.data || {};
    } catch (e) {
        throw e;
    }
}