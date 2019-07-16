import IPFS from 'ipfs'
import eventBus from '../components/EventBus'

export const node = new IPFS({ repo: String(Math.random() + Date.now()) })
node.once('ready', () => {
    eventBus.broadcast('IPFS_READY')
    // console.log('IPFS node is ready')
    // node.cat('QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A', (err, data) => {
    //     if(err) console.log('oops, error!')
    //     console.log(data.toString())
    // })
})
