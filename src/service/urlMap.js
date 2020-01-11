const apiCommon = 'http://localhost:80/api/pod';

const getUrl = path => apiCommon + path;

export const fetchPod = (provider, params) => provider.post(getUrl('/fetch'), params);
export const fetchData = (provider, params) => provider.post(getUrl('/query'), params);
export const registPod = (provider, params) => provider.post(getUrl('/regist'), params);
