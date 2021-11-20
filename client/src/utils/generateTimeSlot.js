import moment from 'moment';

export const generateSlot = (slot) => {
  const intervalSlot = 30;

  let startTime = moment(slot.start_time);
  const endTime = moment(slot.end_time);

  const times = [startTime];
  while (startTime < endTime) {
    startTime = moment(startTime).add(intervalSlot, 'minutes');
    times.push(startTime);
  }
  return times;
}

function isInBreak(slotTime, breakTimes) {
  return breakTimes.some((br) => {
    return slotTime >= moment(br[0], "HH:mm") && slotTime < moment(br[1], "HH:mm");
  });
}
