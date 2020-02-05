import React, { Component } from 'react';
import s from './index.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class FoderInput extends Component {
    render () {
        const { onSubmit, onCancel, inputValue, handleChange } = this.props;
        return (
            <div className={s.container}>
                <div className={s.top}>
                    <TextField
                        fullWidth
                        id="outlined-name"
                        label="文件夹名称"
                        margin="normal"
                        variant="outlined"
                        value={inputValue}
                        onChange={handleChange}
                    />
                </div>
                <div className={s.bottom}>
                    <Button variant="contained" onClick={onCancel}>
                        取消
                    </Button>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        创建
                    </Button>
                </div>
            </div>
        );
    }
}
