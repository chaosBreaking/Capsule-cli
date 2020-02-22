import { Component } from 'react';

export default class BaseItem extends Component {
    constructor (props = {}) {
        super(props);
        this.state = {
            content: ''
        };
    }

    get store () {
        return this.props.store;
    }

    /*
        path: "QmcYAVaTJq3XT7Fmjk4feH1mTojvW5rSPmHXhj6Kd6yMXp"
        hash: "QmcYAVaTJq3XT7Fmjk4feH1mTojvW5rSPmHXhj6Kd6yMXp"
        size: 12373
        relativePath: null
        name: "57399649.jpeg"
        type: "image/jpeg"
        exifdata: {}
    */
    get data () {
        return this.props.file;
    }

    get name () {
        return this.data.name;
    }

    get type () {
        return this.data.type;
    }

    get size () {
        return this.data.size;
    }

    get hash () {
        return this.data.hash;
    }

    async fetchContent () {
        this.store.requestDataByCID(this.hash);
    }
}
