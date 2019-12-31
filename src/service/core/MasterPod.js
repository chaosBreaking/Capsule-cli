import { BasePod, constants } from './base';

const { defaultPodConfig } = constants;
export default class MasterPod extends BasePod {
    constructor (props = {}) {
        props.prefix = defaultPodConfig.MASTER.prefix;
        super(props);
    }

    addChild (child) {
        const { key, pod } = child;
        this.children[key] = pod;
    }

    get children () {
        return this.data;
    }

    addKey (key) {}

    deleteKey (key) {}

    removeChild (key) {}
};
