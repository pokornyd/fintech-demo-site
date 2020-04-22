import { NextFC } from 'next';
import { ValidationMap } from 'prop-types';
import React from 'react';


export interface ISearchFormStateProps {
}

export interface ISearchFormDispatchProps {
}

interface ISearchFormProps extends ISearchFormStateProps, ISearchFormDispatchProps {
}

const propTypes: ValidationMap<ISearchFormProps> = {};

export const SearchForm: NextFC<ISearchFormProps> = () => {
  return (
    <div
      className="top-search collapse bg-light"
      id="search-open"
      data-parent="#search"
    >
      <div className="container">
        <div className="row position-relative">
          <div className="col-md-8 mx-auto py-5">
            <form>
              <div className="input-group">
                <input
                  className="form-control border-radius-right-0 border-right-0"
                  type="text"
                  name="search"
                  autoFocus
                  placeholder="What are you looking for?"
                />
                <button
                  type="button"
                  className="btn btn-grad border-radius-left-0 mb-0"
                >
                  Search
                </button>
              </div>
            </form>
            <p className="small mt-2 mb-0"><strong>e.g.</strong>Template, Wizixo, WordPress theme</p>
          </div>
          <a
            className="position-absolute top-0 right-0 mt-3 mr-3"
            data-toggle="collapse"
            href="#search-open"
          >
            <i className="fa fa-window-close" />
          </a>
        </div>
      </div>
    </div>
  );
};

SearchForm.displayName = 'SearchForm';
SearchForm.propTypes = propTypes;


export interface ISearchButtonStateProps {
}

export interface ISearchButtonDispatchProps {
}

interface ISearchButtonProps extends ISearchButtonStateProps, ISearchButtonDispatchProps {
}

export const SearchButton: NextFC<ISearchButtonProps> = () => {
  return (
    <div
      className="nav-item search border-0 pl-3 pr-0 px-lg-2"
      id="search"
    >
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#search-open"
      >
        <i className="ti-search" />
      </a>
    </div>
  );
};

SearchButton.displayName = 'SearchButton';
SearchButton.propTypes = {};
