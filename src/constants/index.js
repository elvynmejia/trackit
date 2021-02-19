export const LEAD_STATUSES = {
  'unscheduled': 'Unscheduled',
  'phone_screen': 'Phone screen',
  'project': 'Project',
  'onsite': 'Onsite',
  'offer': 'Offer',
  'hired': 'Hired',
};

export const STAGE_STATUSES = {
  'unscheduled': 'Unscheduled',
  'scheduled': 'Scheduled',
  'in_progress': 'In progress',
  'completed': 'Completed',
};

export const leadStatusesOptions = Object.keys(LEAD_STATUSES).map(k => ({
  label: LEAD_STATUSES[k],
  value: k,
}));

export const stagesOptions = Object.keys(STAGE_STATUSES).map(k => ({
  label: STAGE_STATUSES[k],
  value: k,
}));
