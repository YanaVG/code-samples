import React, { PropTypes as T } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';
import classNames from 'classnames';
import classes from './SearchPreview.scss';

const SearchPreview = ({
  theme,
  placeholder,
  inputActive,
  inputValue,
  onInputChange
}) => (
  <div className={ classes.mainContainer }>
    <FontIcon
      className={
        classNames(
          classes.searchIcon,
          theme && theme.searchIcon,
          inputActive && classes.searchIconActive
        )
      }
      value="search"
    />
    <input
      type="text"
      placeholder={ placeholder }
      value={ inputValue }
      onChange={ onInputChange }
      className={
        classNames(
          classes.searchInput,
          inputActive && classes.searchInputActive,
        theme && theme.searchInput
        )
      }
    />
    <FontIcon
      className={
        classNames(
          classes.expandIcon,
          theme && theme.expandIcon,
          inputActive && classes.expandSearchIcon
        )
      }
      value={ inputActive ? 'expand_less' : 'expand_more' }
    />
  </div>
);

SearchPreview.propTypes = {
  theme: T.shape({
    expandIcon: T.string,
    searchInput: T.string,
    searchIcon: T.string
  }),
  placeholder: T.string,
  inputActive: T.bool,
  inputValue: T.string,
  onInputChange: T.func
};

export default SearchPreview;
