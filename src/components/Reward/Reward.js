import React, { Component } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import emoji from './Emoji'

const transition = {
  type: 'spring',
  stiffness: 200,
  damping: 2
}

const SpringAnim = posed.div({
  emoji: {
    y: 5,
    transition
  },
  punished: {
    x: 5,
    transition
  },
  resting: {
    y: 0,
    x: 0,
    scale: 1,
    transition
  }
})

export default class Reward extends Component {
  state = {
    state: 'resting'
  }

  rewardMe = () => {
    const { type, config } = this.props
    const props = [this.container, config]
    switch (type) {
      case 'emoji': {
        this.handleAnimation(type)
        emoji(...props)
        break
      }
      default: {
        break
      }
    }
  }

  punishMe = () => {
    this.handlePunishAnimation()
  }

  rest = () => {
    setTimeout(() => {
      this.setState({ state: 'resting' })
    }, 100)
  }

  handleAnimation = (type) => {
    this.setState({ state: type }, () => {
      this.rest()
    })
  }

  handlePunishAnimation = () => {
    this.setState({ state: 'punished' }, () => {
      this.rest()
    })
  }

  render() {
    const { config, children } = this.props
    const { springAnimation = true, containerStyle = {} } = config
    const { state } = this.state
    return (
      <div className="absolute left-0 top-0">
        <div style={containerStyle} ref={(ref) => { this.container = ref }} />
        <div style={{...containerStyle, ...lottieContainerStyles}} ref={(ref) => { this.lottieContainer = ref }} />
        <SpringAnim pose={springAnimation && state}>
          {children}
        </SpringAnim>
      </div>
    )
  }
}

const lottieContainerStyles = { position: 'relative' }

Reward.propTypes = {
  type: PropTypes.string.isRequired,
  config: PropTypes.object
}

Reward.defaultProps = {
  config: {}
}
