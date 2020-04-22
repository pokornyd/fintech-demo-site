import classNames from 'classnames';
import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import Link from 'next/link';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { getItemElementRenderer } from '../../ItemElementValue';


export interface INavigationMenuStateProps {
  readonly navigation: ContentItem;
}

export interface INavigationMenuDispatchProps {
}

interface INavigationMenuProps extends INavigationMenuStateProps, INavigationMenuDispatchProps {
}

const propTypes: ValidationMap<INavigationMenuProps> = {
  navigation: PropTypes.any.isRequired,
};


const NavMenuLink = getItemElementRenderer(
  'title',
  React.forwardRef<HTMLLIElement, IElementStringValue & {
    readonly url: string;
    readonly subItems: ReadonlyArray<ContentItem>;
  }>(({ value: title, url, subItems }, ref) => (
    <li
      ref={ref}
      className="nav-item dropdown"

    >
      <Link
        href={url}
      >
        <a
          className={classNames('nav-link', { 'dropdown-toggle': subItems.length > 0 })}
          href={url}
        >
          {title}
        </a>
      </Link>
    </li>
  )),
);

export const NavigationMenu: NextFC<INavigationMenuProps> = ({ navigation }) => {
  return (
    <>
      <button
        className="navbar-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarCollapse"
      >
        <ul className="navbar-nav ml-auto">
          {navigation.sub_items.map((navigationItem: ContentItem) => (
            <NavMenuLink
              key={navigationItem.system.id}
              data={navigationItem}
              subItems={navigationItem.sub_items}
              url={navigationItem.url.value}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

NavigationMenu.displayName = 'NavigationMenu';
NavigationMenu.propTypes = propTypes;
