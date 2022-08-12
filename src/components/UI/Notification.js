import classes from './Notification.module.css';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/uiReducer';
const Notification = (props) => {
  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;
  const dispatch = useDispatch();
   const removeNotificationHandler = () =>{
        dispatch(uiActions.removeNotification());
   };
  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <button onClick={removeNotificationHandler}>X</button>
    </section>
  );
};

export default Notification;