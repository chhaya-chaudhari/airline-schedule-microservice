import React, { Component } from 'react'

const lazyComponentLoad = (mycomponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            mycomponent()
                .then(cmp => {
                    this.setState({ component: cmp.default });
                });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : <></>;

        }

    }
}

export default lazyComponentLoad;
