const apiCommon = 'http://localhost:80/api/pod';

const getUrl = (url = '', path) => {
    url = url || apiCommon;
    const needProtocol = !url.startsWith('http://') || !url.startsWith('https://');
    if (needProtocol) {
        url = 'http://' + url;
    }
    if (!url.endsWith('/api')) url += '/api';
    return url + path;
};

export const fetchPod = (provider, url, params) => provider.post(getUrl(url, '/pod/fetch'), params);
export const fetchData = (provider, url, params) => provider.post(getUrl(url, '/pod/query'), params);
export const registPod = (provider, url, params) => provider.post(getUrl(url, '/pod/regist'), params);
export const syncPod = (provider, url, params) => provider.post(getUrl(url, '/pod/update'), params);
export const fetchDataByCID = (provider, url, params) => provider.post(url, params);
