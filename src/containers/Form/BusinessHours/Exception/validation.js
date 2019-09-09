export const formValidation = values => ({
  startTimeMinutes:
    values.get('startTimeMinutes') > values.get('endTimeMinutes') &&
    values.get('endTimeMinutes') !== 0 &&
    'Start time should be ahead of end time.',
  date:
    values.get('date') &&
    new Date(
      values
        .get('date')
        .toJSON()
        .split('T')[0]
    ) < new Date(new Date().toJSON().split('T')[0]) &&
    'Please select a future date'
});
