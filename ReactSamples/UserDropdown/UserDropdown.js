import React, { PureComponent, PropTypes as T } from 'react';
import IT from 'react-immutable-proptypes';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import UserAvatar from 'generic/UserAvatar';
import { ListItem } from 'react-toolbox/lib/list';
import Navigation from 'react-toolbox/lib/navigation';
import FontIcon from 'react-toolbox/lib/font_icon';
import { switchIdentity, logout } from 'reducers/CurrentUser/actions';
import classNames from 'classnames';
import { USER_ROLES } from 'constants/common';
import classes from './UserDropdown.scss';

const getRoleParams = (list, roleName, userName) => {
  const roleList = list.find(item => (
    item.get('role') === roleName
  ));

  const roleListVariants = {
    [USER_ROLES.startupMember]: Map({
      id: roleList.get('id'),
      name: roleList.getIn(['startup', 'name']),
      logoUrl: roleList.getIn(['startup', 'logoUrl']),
      active: roleList.get('active')
    }),
    [USER_ROLES.expert]: Map({
      id: roleList.get('id'),
      name: userName,
      logoUrl: roleList.get('avatarUrl'),
      active: roleList.get('active')
    })
  };

  return roleListVariants[roleName] || null;
};

class UserDropdown extends PureComponent {
  static propTypes = {
    firstName: T.string,
    lastName: T.string,
    identities: IT.mapContains({
      startups: IT.listOf(T.string),
      expert: T.bool
    }),
    switchIdentity: T.func.isRequired,
    logout: T.func.isRequired,
  }

  constructor() {
    super();

    this.state = { expanded: false };
  }

  toggleDropDown = () =>
    this.setState({ expanded: !this.state.expanded });

  switchIdentity = (id) => {
    this.props.switchIdentity(id);
    this.toggleDropDown();
  }

  renderDropDownItem = item => {
    const id = item.get('id');
    const name = item.get('name');
    const active = item.get('active');

    return (
      <ListItem
        className={
          classNames(
            classes.item,
            active && classes.roleActive
          )
        }
        key={ id }
        caption={ name }
        onClick={ () => this.switchIdentity(id) }
        theme={ classes }
      />
    );
  }

  renderPreviewDropdown = () => {
    const { firstName, lastName } = this.props;
    const { expanded } = this.state;

    return (
      <div
        className={ classes.previewDropdownContainer }
        onClick={ this.toggleDropDown }
      >
        <UserAvatar theme={ classes } />
        <p className={ classes.userName }>
          { `${ firstName || '' } ${ lastName || '' }` }
        </p>
        <FontIcon
          value={ expanded ? 'expand_less' : 'expand_more' }
          className={ classes.expandButton }
        />
      </div>
    );
  }

  renderExpandedDropdown = () => {
    const { identities, firstName, lastName } = this.props;
    const userName = `${ firstName || '' } ${ lastName || '' }`;

    const expert = getRoleParams(identities, USER_ROLES.expert, userName);
    const startup = getRoleParams(identities, USER_ROLES.startupMember);

    return (
      <div className={ classes.dropdownContainer }>
        <Navigation className={classes.dropdownListContainer}>
          { List(identities).map(this.renderDropDownItem) }
          <ListItem
            leftIcon="power_settings_new"
            className={classes.logout}
            key={'logout'}
            caption={'Logout'}
            onClick={ () => this.props.logout() }
          />
        </Navigation>
      </div>
    );
  }

  render() {
    const { expanded } = this.state;

    return (
      <div className={ classes.componentContainer }>
        { this.renderPreviewDropdown() }
        { expanded && this.renderExpandedDropdown() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    logout: () => dispatch(logout()),
    switchIdentity: (id) => dispatch(switchIdentity(id)),
  }
);

const mapStateToProps = ({ currentUser }) => (
  {
    firstName: currentUser.get('firstName'),
    lastName: currentUser.get('lastName'),
    identities: currentUser.get('identities'),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
