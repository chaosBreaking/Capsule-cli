const navigation = {
    forward (url, query = {}) {
        const origin = location.origin;
        let search = location.search;
        const params = Object.entries(query).reduce((acc, curr) => {
            acc += `${curr[0]}=${curr[1]}&`;
            return acc;
        }, '');
        if (!search && params) search = '?';
        if (search.endsWith('&')) search += params;
        else search += `${params}`;
        location.href = origin + url + search;
    }
};

export default navigation;
