import React, { PropTypes as T } from 'react';
import classNames from 'classnames';
import FontIcon from 'react-toolbox/lib/font_icon';
import classes from './NotificationIcon.scss';

const NotificationIcon = ({ iconType, value, theme }) => (
  <div
    className={
      classNames(
        classes.notificationContainer,
        theme && theme.notificationContainer
      )
    }
  >
    <FontIcon
      className={
        classNames(
          classes.notificationIcon,
          theme && theme.notificationIcon
        )
      }
      value={ iconType }
    />
    <p
      className={
        classNames(
          classes.notificationValue,
          theme && theme.notificationValue
        )
      }
    >
      { value || ''}
    </p>
  </div>
);

NotificationIcon.propTypes = {
  iconType: T.string,
  value: T.string,
  theme: T.shape({
    notificationContainer: T.string
  })
};

export default NotificationIcon;
