import React, { PureComponent, PropTypes as T } from 'react';
import { Seq } from 'immutable';
import classNames from 'classnames';
import classes from './SearchBar.scss';
import SearchPreview from './SearchPreview';
import SearchExpanded from './SearchExpanded';

const OPTION_LIST = Seq([
  {
    text: 'Search for bids',
    onClickAction: () => null,
    className: 'optionBid',
    icon: 'searchBid'
  },
  {
    text: 'Search for Experts',
    onClickAction: () => null,
    className: 'optionExpert',
    icon: 'searchExpert'
  },
  {
    text: 'Search for Startups',
    onClickAction: () => null,
    className: 'optionStartup',
    icon: 'searchStartup'
  }
]);

class SearchBar extends PureComponent {
  static propTypes = {
    theme: T.shape({
      searchBarContainer: T.string
    }),
    placeholder: T.string
  }

  constructor() {
    super();

    this.state = {
      inputValue: '',
      inputActive: false
    };
  }

  handleOutsideInputClick = (event) => {
    event.stopPropagation();
    this.setState({ inputActive: false });
  }

  handleInputClick = event => {
    event.stopPropagation();
    this.setState({ inputActive: true });
  }

  handleInputChange = ({ target }) => {
    this.setState({ inputValue: target.value });
  }

  render() {
    const { theme, placeholder } = this.props;
    const { inputActive, inputValue } = this.state;

    return (
      <div
        className={
          classNames(
            classes.mainContainer,
            theme && theme.searchBarContainer,
            inputActive && classes.mainContainerActive
          )
        }
        tabIndex="0"
        onBlur={ this.handleOutsideInputClick }
        ref={ ref => { this.containerRef = ref; } }
      >
        <div
          onClick={ this.handleInputClick }
        >
          <SearchPreview
            placeholder={ placeholder }
            inputActive={ inputActive }
            theme={ theme }
            inputValue={ inputValue }
            onInputChange={ this.handleInputChange }
          />
          {
            inputActive &&  (
              <SearchExpanded
                optionsList={ OPTION_LIST }
                theme={ theme }
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default SearchBar;
