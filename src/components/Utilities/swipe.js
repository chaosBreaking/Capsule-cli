import React from 'react';

export default function withSwipe (WrappedComponent) {
    return class Swipe extends React.Component {
        constructor (props = {}) {
            super();
            this.flag = 0;
            this.startX = 0;
            this.startY = 0;
            this.originX = 0;
            this.originY = 0;
        }

        msd (e) {
            e.preventDefault();
            this.flag = 1;
            this.startX = 0;
            this.startY = 0;
            this.startX = e.clientX;
            this.originX = e.clientX;
            this.startY = e.clientY;
            this.originY = e.clientY;
        }

        msm (e) {
            if (!this || !this.flag) return 0;
            const disY = this.startY - e.clientY;
            const disX = this.startX - e.clientX;
            this.startY = e.clientY;
            this.startX = e.clientX;
            setTimeout(() => {
                if (!this.flag) return 0;
                window.scrollBy({
                    top: disY,
                    left: disX,
                    behavior: 'instant'
                });
            }, 100);
        }

        msu (e) {
            e.preventDefault();
            if (!this || !this.flag) return 0;
            const disY = 2 * (this.originY - e.clientY);
            const disX = this.originX - e.clientX;
            window.scrollBy({
                top: disY,
                left: disX,
                behavior: 'smooth'
            });
            if (this.flag) this.flag = 0;
        }

        render () {
            return (
                <React.Fragment>
                    <div className="wrap" onMouseDown={e => this.msd(e)} onMouseMove={e => this.msm(e)} onMouseUp={e => this.msu(e)} onMouseLeave={e => this.msu(e)}>
                        <WrappedComponent></WrappedComponent>
                    </div>
                </React.Fragment>
            );
        }
    };
}
