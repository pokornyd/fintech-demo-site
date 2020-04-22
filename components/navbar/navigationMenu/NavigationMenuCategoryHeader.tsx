import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import classNames from 'classnames';
import React from 'react';


export interface INavigationMenuCategoryHeaderStateProps {
  readonly customClassName?: string | null;
  readonly text: string;
}

export interface INavigationMenuCategoryHeaderDispatchProps {
}

interface INavigationMenuCategoryHeaderProps extends INavigationMenuCategoryHeaderStateProps, INavigationMenuCategoryHeaderDispatchProps {
}

const propTypes: ValidationMap<INavigationMenuCategoryHeaderProps> = {
  customClassName: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export const NavigationMenuCategoryHeader: NextFC<INavigationMenuCategoryHeaderProps> = (props) => {
  return (
    <li className={classNames('dropdown-header', props.customClassName)}>
      {props.text}
    </li>
  );
};

NavigationMenuCategoryHeader.displayName = 'NavigationMenuCategoryHeader';
NavigationMenuCategoryHeader.propTypes = propTypes;
