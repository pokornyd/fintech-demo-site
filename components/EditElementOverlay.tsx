import PropTypes, { ValidationMap } from 'prop-types';
import React, {
  CSSProperties,
  RefObject,
} from 'react';
import { getPositionReferenceParent } from '../utilities/utils';
import { ContentItemElementContext } from './context/ContentItemElementContext';


export interface IEditElementOverlayStateProps {
  readonly parentRef: RefObject<HTMLDivElement>;
  readonly projectId: string;
}

export interface IEditElementOverlayDispatchProps {
}

interface IEditElementOverlayProps extends IEditElementOverlayStateProps, IEditElementOverlayDispatchProps {
}

const propTypes: ValidationMap<IEditElementOverlayProps> = {
  parentRef: PropTypes.any.isRequired,
};

const linkStyle: CSSProperties = {
  position: 'absolute',
  alignItems: 'center',
  background: 'rgba(255,255,255,0.8)',
  display: 'flex',
  justifyContent: 'center',
  top: 0,
  transition: 'opacity 300ms ease-in-out',
  zIndex: 999,
};

const divStyle: CSSProperties = {
  color: '#3a9c6f',
  fontSize: 16,
};

interface IOverlayState {
  readonly height: number;
  readonly left: number;
  readonly opacity: number;
  readonly top: number;
  readonly width: number;
}

export class EditElementOverlay extends React.PureComponent<IEditElementOverlayProps, IOverlayState> {
  static displayName = 'EditElementOverlay';
  static propTypes = propTypes;

  state: IOverlayState = {
    height: 0,
    left: 0,
    opacity: 0,
    top: 0,
    width: 0,
  };

  componentDidMount() {
    const { parentRef: { current: parent } } = this.props;
    if (parent) {
      const parentBox = getPositionReferenceParent(parent);
      if (parentBox) {
        const { top: boxTop, left: boxLeft } = parentBox.getBoundingClientRect();
        const { height, width, top: parentTop, left: parentLeft } = parent.getBoundingClientRect();
        this.setState(() => ({
          height,
          opacity: 1,
          top: parentTop - boxTop,
          left: parentLeft - boxLeft,
          width,
        }));
      }
    }
  }

  getElementEditLinkUrl = () => {
    const { elementCodename, itemId, language } = this.context;
    const { projectId } = this.props;
    return `https://app.kenticocloud.com/goto/edit-item/project/${projectId}/variant-codename/${language}/item/${itemId}/element/${elementCodename}`;
  };

  render() {
    const {
      height,
      left,
      opacity,
      top,
      width,
    } = this.state;
    return (
      <a
        style={Object.assign({}, linkStyle, {
          height,
          left,
          opacity,
          top,
          width,
        })}
        target="_blank"
        rel="noopener noreferrer"
        href={this.getElementEditLinkUrl()}
      >
        <svg
          className="icon"
          height="16"
          viewBox="0 0 1025 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#3a9c6f"
            d="M201.675742 124.830489c-54.615298 0-99.270649 44.376353-99.270649 99.269226l0 598.22598c0 54.613875 44.655351 98.991651 99.270649 98.991651l598.503555 0c54.613875 0 98.991651-44.377777 98.991651-98.991651L899.170948 429.194622l102.699764-99.269226 0 528.803855c0 91.312087-77.377841 165.270777-168.691351 165.270777L165.270763 1024.000028C73.96437 1024.000028-1.4e-05 950.041338-1.4e-05 858.729251L-1.4e-05 197.932257c0-91.306393 73.964384-175.508299 165.270777-175.508299l528.805279 0-98.991651 102.412225L201.675742 124.836183 201.675742 124.830489zM567.776741 610.96899l-221.870378 62.859976 63.432207-220.452612L567.776741 610.96899 567.776741 610.96899zM589.974171 588.782948 431.241343 431.473581l348.741909-346.461527L938.71608 242.310034 589.974171 588.782948 589.974171 588.782948zM1010.400082 171.198262l-47.507964 47.224696L804.166408 60.830322l47.50227-47.224696c17.642358-17.349126 45.227582-18.210319 61.447904-1.985726l99.269226 98.41942C1028.604707 126.248255 1027.743514 153.849137 1010.400082 171.198262L1010.400082 171.198262zM1010.400082 171.198262"
          />
        </svg>
        <div
          style={divStyle}
        >
          {' '}Edit
        </div>
      </a>
    );
  }
}

EditElementOverlay.contextType = ContentItemElementContext;
