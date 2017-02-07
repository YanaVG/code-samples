import React, { PropTypes as T } from 'react';
import { ListItem } from 'react-toolbox/lib/list';
import IT from 'react-immutable-proptypes';
import classNames from 'classnames';
import Icon from 'shared/Icon';
import classes from './SearchExpanded.scss';

const SearchExpanded = ({ theme, optionsList }) => (
  <div className={ classes.mainContainer }>
    {
      optionsList.size
        && optionsList.map(item => (
          <ListItem
            key={ item.text }
            className={
              classNames(
                classes.optionItem,
                theme.expandedSearchItem,
                classes[item.className]
              )
            }
            onClick={ item.onClickAction }
            caption={ item.text }
            theme={ classes }
            ripple
            leftIcon={ <Icon kind={ item.icon } size={ 20 } /> }
          />
      ))
    }
  </div>
);

SearchExpanded.propTypes = {
  theme: T.func,
  optionsList: IT.listOf(IT.mapContains({
    text: T.string,
    onClick: T.func
  })).isRequired
};

export default SearchExpanded;
