import React from 'react';

const AlertBanner = (props) => {
  let banner;
  if (!props.alert) {
    return null;
  }
  if (props.alert === 'Successfully got repos!') {
    banner = "alert alert-success";
  } else {
    banner = "alert alert-danger";
  }
  return (
    <div className={banner}>
      {props.alert}
    </div>
  )
}

export default AlertBanner;