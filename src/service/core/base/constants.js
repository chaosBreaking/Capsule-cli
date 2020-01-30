const defaultAccountConfig = {
    prefix: '00',
    path: 'master',
    type: 'BTC',
};
/*
    prefix: {
        MASTER: '00',
        DOCUMENT: '03',
        MEDIA: '05',
        POST: '07',
        MESSAGE: '0A',
        CHANNEL: '0C',
        GROUP: '0F'
    },
    typeMap: {
        1: 'MASTER', // 主pod，用于身份管理
        2: 'DOCUMENT', // 文档，主要是.doc/.csv/.pdf等
        3: 'MEDIA', // 媒体类，比如音视频等流类型
        4: 'POST', // 社交圈post，混合型内容
        5: 'MESSAGE', // 即时消息
        6: 'CHANNEL', // 单工，频道
        7: 'GROUP' // 群组
    }
*/
const defaultPodConfig = {
    MASTER: {
        prefix: '00',
        type: 1,
        tableKey: 'MasterPod'
    },
    DOCUMENT: {
        prefix: '03',
        type: 2,
        tableKey: 'DocumentPod'
    },
    MEDIA: {
        prefix: '05',
        type: 3,
        tableKey: 'MediaPod'
    },
    POST: {
        prefix: '07',
        type: 4,
        tableKey: 'PostPod'
    },
    MESSAGE: {
        prefix: '0A',
        type: 5,
        tableKey: 'MessagePod'
    },
    CHANNEL: {
        prefix: '0C',
        type: 6,
        tableKey: 'ChannelPod'
    },
    GROUP: {
        prefix: '0F',
        type: 7,
        tableKey: 'GroupPod'
    }
};

const BASE_POD_MODEL = {
    pubkey: {
        type: String,
        required: true,
        unique: true,
        default: ''
    },
    address: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: ''
    },
    deny: {
        type: {},
        default: {},
    },
    allow: {
        type: {},
        default: {}
    },
    data: {
        type: {},
        default: {},
    },
    option: {
        type: {},
        default: {}
    }
};
const PodModel = {
    BASE: BASE_POD_MODEL,
    MASTER: {
        ...BASE_POD_MODEL,
    },
    DOCUMENT: {
        ...BASE_POD_MODEL,
    },
    POST: {
        ...BASE_POD_MODEL,
    },
};

const TypeMap = Object.keys(defaultPodConfig).reduce((map, key) => {
    return Object.assign(map, { [defaultPodConfig[key].type]: key });
}, {});

const ValidOp = ['update', 'connect', 'fetch', 'regist'];
const DEFAULT_DEHYDRATE_OPTIONS = 'type pubkey address allow deny data';
export {
    DEFAULT_DEHYDRATE_OPTIONS,
    defaultPodConfig,
    defaultAccountConfig,
    PodModel,
    TypeMap,
    ValidOp,
};
