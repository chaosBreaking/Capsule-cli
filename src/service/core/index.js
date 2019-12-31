'use strict';
import { TypeMap, defaultPodConfig, PodModel } from './base/constants';
import PodStore from './base/storeApiClient';
import MasterPod from './MasterPod';
import DocumentPod from './DocPod';
import PostPod from './PostPod';

const PodLibMap = {
    MASTER: MasterPod,
    DOCUMENT: DocumentPod,
    POST: PostPod,
};

const ckeckPodExisted = async options => {
    const { address, type, pubkey } = options;
    if (!address && !type && !pubkey) throw new Error('Must specified address or pubkey with pod type');
    const podType = type.toUpperCase() || TypeMap[address[0]];
    const podModel = PodModel[podType];
    if (!podModel) throw new Error('Unsupported pod type ', podType);
    const store = PodStore.getPodStore(defaultPodConfig[podType].tableKey, podModel);
    const pod = await store.checkPodExists({ address, pubkey });
    return pod;
};

const createPod = (type = '', ...rest) => {
    const Proto = PodLibMap[type.toUpperCase()];
    if (!Proto) throw new Error('Cannot find required Pod implementation: ', type);
    return new Proto(...rest);
};

const fetchPod = async options => {
    const { address = '', type } = options;
    const typeFlag = type || +address[0];
    const podType = typeof typeFlag === 'number' ? TypeMap[typeFlag] : typeFlag;
    const pod = createPod(podType, options);
    await pod.hydrate();
    return pod.dehydrate();
};

const registPod = async (type, data, ...rest) => {
    const pod = createPod(type, { ...data, ...rest });
    await pod.regist().catch(err => { throw err; });
    return pod.dehydrate();
};

const updatePod = async option => {
    const { op = 'update', update, type, ...rest } = option;
    const pod = createPod(type, rest);
    if (!update) throw new Error('update must be specified');
    if (op === 'update') return pod.update(update).catch(err => { throw err; });
    return pod.handle(op, update).catch(err => { throw err; });
};

const queryData = async option => {
    const { op = 'query', update, type, ...rest } = option;
    const pod = createPod(type, rest);
    if (!update) throw new Error('update must be specified');
    if (op === 'query') return pod.update(update).catch(err => { throw err; });
    return pod.handle(op, update).catch(err => { throw err; });
};

export {
    PodLibMap,
    createPod,
    registPod,
    fetchPod,
    updatePod,
    queryData,
    ckeckPodExisted,
    TypeMap,
    defaultPodConfig
};
