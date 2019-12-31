import { BasePod, constants } from './base';

const { defaultPodConfig, ValidOp } = constants;

/*
 post pod: id = 4
 * 一条post的格式
    {
        cid: 'xxxx',
        acl: [0,1,2],
        link: [cid],
        desc: {}
    }
*/
const POSTPOD_TYPE_TAG = '4';

const encodeCID = (cid, allow, deny) => {
    const isEncryptedCID = cid.startsWith('Qm');
    const prefix = POSTPOD_TYPE_TAG + isEncryptedCID ? '1' : '0'; // 0代表公开， 1代表加密
    if (isEncryptedCID) {
        return cid.replace(/Qm/, prefix);
    }
};

const createPost = data => {
    const { cid, acl = {}, link, desc } = data;
    if (acl && typeof acl !== 'object') throw new Error('ACL of PostPod must specified allow and deny');
    const { allow, deny } = acl;
    const key = encodeCID(cid, allow, deny);
    const post = { cid, allow, deny, link, desc };
    return { key, post };
};

export default class PostPod extends BasePod {
    constructor (props) {
        props.prefix = defaultPodConfig.POST.prefix;
        super(props);
        this.validOpList = ValidOp.concat(['addPost', 'deletePost']);
    }

    get posts () {
        return this.data;
    }

    update () {
        throw new Error('Cannot call update in postpod');
    }

    async addPost (data) {
        if (!this.isValidCID(data.cid)) throw new Error('Invalid CID');
        const { key, post } = createPost(data);
        await this.storeAPI.updatePod({ address: this.address }, {
            [key]: post
        }).catch(err => { throw err; });
        return key; // key is pid, pid is key
    }

    async getPost (data) {
        const { pid } = data;
        await this.hydrate().catch(err => { throw err; });
        return pid === '*' ? this.data : this.data[pid];
    }

    async deletePost (data) {
        const { pid } = data;
        const key = `data.${pid}`;
        await this.storeAPI.updatePod({ address: this.address }, {
            $unset: { [key]: '' }
        }, { omitUndefined: true }).catch(err => { throw err; });
        return true;
    }
};
