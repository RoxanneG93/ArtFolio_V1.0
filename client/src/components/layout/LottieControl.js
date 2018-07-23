import React, { Component } from 'react';
import Lottie from 'react-lottie';
import * as animationData from './data2.json';
// import { Transitions } from 'react-animation-components';

export default class LottieControl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isStopped: true, 
      isPaused: false
    }
  }

  render() {

    const buttonStyle = {
      display: 'block',
      margin: '10px auto'
    };

    const defaultOptions = {
      loop: false,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    // startDelay() {
    //   setTimeout(this.setState({isStopped: false}), 5000);
    // }
    return <div>
      <Lottie options={defaultOptions}
              height={700}
              width={1000}
              isStopped={this.state.isStopped}
              isPaused={this.state.isPaused}
              />
    </div>
  }
}

