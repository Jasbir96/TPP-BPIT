class Counter {
    constructor() {
        this.state = {
            value: 0
        }
    }
    render() {
        console.log("Current counter State " + this.state.value);
    }
    setState(updateObj) {
        for (let key in updateObj) {
            this.state[key] = updateObj[key];
        }
        this.render();
    }
    increment() {
        this.setState({
            value: this.state.value + 1
        })
    }
    decrement() {
        this.setState({
            value: this.state.value
        })
    }
}
//  new counter
let c1 = new Counter();
// console.log(c1.state);
// render fn call
c1.render();
//  increment =>render
c1.increment();



