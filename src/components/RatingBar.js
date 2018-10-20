import React from 'react'
import Button from '@material-ui/core/Button'

class RatingBar extends React.Component {

  state = {
    rating: 0
  }

  handleSlider = (e) => {
    this.setState({rating: e.target.value})
  }

  handleRating = () => {
    this.props.submit(this.state.rating)
  }

  render() {
    return (
      <div>
        <input type="range" min="-100" max="100" value={this.state.rating} className="slider" onChange={this.handleSlider}/>
        <Button onClick={this.handleRating}>RATE</Button>
      </div>
    )
  }
}



export default RatingBar
