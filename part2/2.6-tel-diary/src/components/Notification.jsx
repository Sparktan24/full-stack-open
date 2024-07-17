function Notification({ message, error }) {
  if (message === null) return null;
  return <div className={error ? 'error' : 'successful'}>{message}</div>;
}

export default Notification;
