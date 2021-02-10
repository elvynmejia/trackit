export const STATES = {
  'unscheduled': 'Unscheduled', // kind of doesn't make sense
  'phone_screen': 'Phone Screen',
  'take_home_or_technical': 'Take home or Technical',
  'onsite': 'Onsite',
  'offer': 'Offer',
  'hired': 'Hired',
  'not_a_good_fit': 'Not a good fit', // for me or for them
}

export const stateOptions = Object.keys(STATES).map(k => ({
  label: STATES[k],
  value: k,
}));

export default STATES;
