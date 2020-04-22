import { NextFC } from 'next';
import { ValidationMap } from 'prop-types';
import React from 'react';


export interface ISectionWaveSeparatorStateProps {
}

export interface ISectionWaveSeparatorDispatchProps {
}

interface ISectionWaveSeparatorProps extends ISectionWaveSeparatorStateProps, ISectionWaveSeparatorDispatchProps {
}

const propTypes: ValidationMap<ISectionWaveSeparatorProps> = {};

export const SectionWaveSeparator: NextFC<ISectionWaveSeparatorProps> = () => {
  return (
    <>{/*-- svg wave top--*/}
      <figure className="position-absolute top-0 left-0 w-100 d-none d-md-block ie-d-none mt-n3">
        <svg
          version="1.1"
          id="wave-1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 1920 43.4"
          style={{ enableBackground: 'new 0 0 1920 43.4' } as any}
          xmlSpace="preserve"
        >
          <path
            id="wave-1-path"
            className="fill-light"
            d="M0,23.3c0,0,405.1-43.5,697.6,0c316.5,1.5,108.9-2.6,480.4-14.1c0,0,139-12.2,458.7,14.3 c0,0,67.8,19.2,283.3-22.7v35.1H0V23.3z"
          />
        </svg>
      </figure>
      {/*-- svg wave bottom--*/}
      <figure className="position-absolute bottom-0 left-0 w-100 d-none d-md-block ie-d-none mb-n3">
        <svg
          version="1.1"
          id="wave-2"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 1920 43.4"
          style={{ enableBackground: 'new 0 0 1920 43.4' } as any}
          xmlSpace="preserve"
        >
          <path
            id="wave-2-path_"
            className="fill-white"
            d="M0,23.3c0,0,405.1-43.5,697.6,0c316.5,1.5,108.9-2.6,480.4-14.1c0,0,139-12.2,458.7,14.3 c0,0,67.8,19.2,283.3-22.7v35.1H0V23.3z"
          />
        </svg>
      </figure>
    </>
  );
};

SectionWaveSeparator.displayName = 'SectionWaveSeparator';
SectionWaveSeparator.propTypes = propTypes;
