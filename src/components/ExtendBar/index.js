import React, { Component } from 'react'
import './index.scss'
import TopBar from '../FileContainer/widgets/TopBar';
import CascadingList from '../CascadingList';
const folderList = [
    {
        title: 'f1',
        children: [
            {
                title: 'f1-1',
                children: [
                    {
                        title: 'f1-1-1'
                    }
                ]
            },
            {
                title: 'f1-2'
            },
        ]
    },
    {
        title: 'f2'
    },
    {
        title: '图片和视频',
        children: [{
            title: 'f3-1'
        }]
    },
]
class ExtendBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const topBarTitle = <span>存储</span>
        return (
            <div className='ExtendBarContainer'>
                <div>
                    <TopBar middle={topBarTitle} color={'#eee'}></TopBar>
                </div>
                <div>
                    <CascadingList data={folderList}></CascadingList>
                </div>
            </div>
        )
    }
}

export default ExtendBar