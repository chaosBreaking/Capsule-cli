import Event from 'events';
class EventBus extends Event {
    constructor (props = {}) {
        super(props);
        this.block = false;
    }

    broadcast (event, params, opt = {}) {
        this.emit(event, params, opt);
    }
}
const eventBus = new EventBus();
export default eventBus;
