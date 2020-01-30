import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import s from './index.scss';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

@inject('store')
@observer
export default class Initilizer extends Component {
    get rootStore () {
        return this.props.store;
    }

    get store () {
        return this.props.store.initStore;
    }

    copy = text => {
        const textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('Copy', 'false', null);
        this.store.showToast('复制成功');
    }

    handleBack = e => {
        e.stopPropagation();
        this.store.stepBack();
    }

    handleNext = e => {
        e.stopPropagation();
        this.store.nextStep();
    }

    renderAccount () {
        this.store.buildLocalStore();
        const { secword, seckey, pubkey } = this.store.accountInfo;
        return (
            <Card className={s.card} variant="outlined">
                <h3>加密账户创建</h3>
                {
                    [
                        {
                            title: '助记词',
                            content: secword
                        },
                        {
                            title: '私钥',
                            content: seckey
                        },
                        {
                            title: '公钥',
                            content: pubkey
                        },
                    ].map((obj, index) => {
                        const { title, content } = obj;
                        return (
                            <CardContent className={s.content} key={index} onClick={() => this.copy(content)}>
                                <Typography variant="h6" component="h2">
                                    {title}
                                </Typography>
                                <Typography className={s.info} color="textSecondary">
                                    {content}
                                </Typography>
                            </CardContent>);
                    })
                }
            </Card>
        );
    }

    renderPod () {
        const { podConfig } = this.store;
        return (
            <div className={s.pod}>
                <h3>POD配置</h3>
                <span className={s.desc}>
                    pod是capsule存储系统的基本功能单位，可以把pod想象成数字密码箱<br />
                    pod不存储上传的具体内容，而是存放数据的身份标识<br />
                    有了这个标识就可以拿到具体数据，所以只要标识不泄露就能保证数据的隐私啦!
                </span>
                {podConfig.map((obj, index) => <FormControlLabel key={index} control={<Checkbox disabled={obj.disabled} color="primary" checked={obj.checked} />} label={obj.label} />)}
            </div>
        );
    }

    renderProvider () {
        const { selectedProvider, providerList, changeProvider } = this.store;
        return (
            <div className={s.provider}>
                <h3>Provider配置</h3>
                <FormControl>
                    <NativeSelect
                        value={selectedProvider}
                        onChange={changeProvider}
                        inputProps={{
                            name: 'age',
                            id: 'age-native-helper',
                        }}
                    >
                        <option value="" disabled>Placeholder</option>
                        {
                            providerList.map((obj, index) => <option value={obj.value} key={index}>{obj.label}</option>)
                        }
                    </NativeSelect>
                    <FormHelperText>选择POD存储服务提供商</FormHelperText>
                </FormControl>
            </div>
        );
    }

    renderContent () {
        const { currentStep } = this.store;
        if (currentStep === 0) {
            return this.renderAccount();
        } else if (currentStep === 1) {
            return this.renderPod();
        } else if (currentStep === 2) {
            return this.renderProvider();
        }
    }

    render () {
        const { steps, completed, nextStep, currentStep, isShowToast, toastMessage } = this.store;
        return (
            <>
            <Stepper nonLinear alternativeLabel activeStep={currentStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel onClick={e => nextStep(index)} completed={completed[index]}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {this.renderContent()}
            <div className={s.button}>
                {currentStep > 0 && <Button size="large" onClick={this.handleBack}>返回</Button>}
                <Button size="large" onClick={this.handleNext}>{currentStep < 2 ? '下一步' : '完成'}</Button>
            </div>
            <div className={s.toast}>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    key={'top,center'}
                    open={isShowToast}
                    message={toastMessage}
                />
            </div>
            </>
        );
    }
}
