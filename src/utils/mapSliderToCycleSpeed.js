export const mapSliderToCycleSpeed = (sliderValue, in_min, in_max, out_min, out_max) => {
  return (sliderValue - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}