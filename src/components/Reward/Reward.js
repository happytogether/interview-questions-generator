import React, { Component } from 'react'
import PropTypes from 'prop-types'
import emoji from './Emoji'

const transition = {
  type: 'spring',
  stiffness: 200,
  damping: 2
}

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

  render() {
    const { config, children } = this.props
    const { springAnimation = true, containerStyle = {} } = config
    const { state } = this.state
    return (
      <div className="absolute left-0 top-0">
        <div style={containerStyle} ref={(ref) => { this.container = ref }} />
      </div>
    )
  }
}

Reward.propTypes = {
  type: PropTypes.string.isRequired,
  config: PropTypes.object
}

Reward.defaultProps = {
  config: {}
}
