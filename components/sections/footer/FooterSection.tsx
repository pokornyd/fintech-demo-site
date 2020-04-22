import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';
import { FooterLogo } from '../../SVGs/FooterLogo';


export interface IFooterSectionStateProps {
  readonly data: ContentItem;
}

export interface IFooterSectionDispatchProps {
}

interface IFooterSectionProps extends IFooterSectionStateProps, IFooterSectionDispatchProps {
}

const propTypes: ValidationMap<IFooterSectionProps> = {
  data: PropTypes.any.isRequired,
};


const FooterLogoLink = getItemElementRenderer(
  'logotype_negative_version',
  React.forwardRef<HTMLAnchorElement, IAssetElementValue>(({ value }, ref) => (
    <a
      ref={ref}
      href="#"
      className="footer-logo"
    >
      <FooterLogo
        src={value[0].url}
      />
    </a>
  )),
);

const FooterAbout = getItemElementRenderer(
  'about_a_company',
  React.forwardRef<HTMLDivElement, IElementStringValue>(({ value }, ref) => (
    <div
      ref={ref}
      className="mt-3"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )),
);

const FooterAddress = getItemElementRenderer(
  'address',
  React.forwardRef<HTMLLIElement, IElementStringValue>(({ value }, ref) => (
    <li
      ref={ref}
      className="media mb-3"
    >
      <i className="mr-3 display-8 ti-map-alt" />
      {stripPTags(value)}
    </li>
  )),
);

const FooterPhone = getItemElementRenderer(
  'telephone',
  React.forwardRef<HTMLLIElement, IElementStringValue>(({ value }, ref) => (
    <li
      ref={ref}
      className="media mb-3"
    >
      <i className="mr-3 display-8 ti-headphone-alt" />
      {value}
    </li>
  )),
);

const FooterEMail = getItemElementRenderer(
  'email',
  React.forwardRef<HTMLLIElement, IElementStringValue>(({ value }, ref) => (
    <li
      ref={ref}
      className="media mb-3"
    >
      <i className="mr-3 display-8 ti-email" />
      {value}
    </li>
  )),
);

const FooterOpeningHours = getItemElementRenderer(
  'opening_hours',
  React.forwardRef<HTMLLIElement, IElementStringValue>(({ value }, ref) => (
    <li
      ref={ref}
      className="media mb-3"
    >
      <i className="mr-3 display-8 ti-time" />
      <p
        dangerouslySetInnerHTML={{
          __html: stripPTags(value),
        }}
      />
    </li>
  )),
);

export const FooterSection: React.SFC<IFooterSectionProps> = ({ data }) => {
  return (
    <footer className="footer bg-light pt-6">
      <div className="footer-content pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="widget">
                <FooterLogoLink
                  data={data}
                />
                <FooterAbout
                  data={data}
                />
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div
                className="widget address"
                style={{
                  backgroundImage: `url('assets/images/world-map.png')`,
                  backgroundPosition: '50% 20px',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                }}
              >
                <ul className="list-unstyled">
                  <FooterAddress
                    data={data}
                  />
                  <FooterPhone
                    data={data}
                  />
                  <FooterEMail
                    data={data}
                  />
                  <FooterOpeningHours
                    data={data}
                  />
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-sm-6">
              <div className="widget">
                <h6>Quick LInks</h6>
                <ul className="nav flex-column primary-hover">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="about-classic.html"
                    >About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="contact.html"
                    >Contact
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="index.html"
                    >Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="blog-grid-left-sidebar.html"
                    >Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="portfolio-grid-column-4.html"
                    >Portfolio
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="widget bg-grad p-4 all-text-white border-radius-3">
                <i className="ti-email newsletter-icon" />
                <p className="mb-2">Subscribe to our newsletter to receive exclusive offers.</p>
                <div className="form-group mb-0">
                  <input
                    className="form-control border-white mb-3"
                    type="email"
                    placeholder="Enter email..."
                  />
                  <button className="btn btn-dark mb-0">Join us</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider mt-3" />
      <div className="footer-copyright py-3">
        <div className="container">
          <div className="d-md-flex justify-content-between align-items-center py-3 text-center text-md-left">
            <div className="copyright-text">©2019 All Rights Reserved by <a href="#!"> Wizixo.</a></div>
            <div className="copyright-links primary-hover mt-3 mt-md-0">
              <ul className="list-inline">
                <li className="list-inline-item pl-2">
                  <a
                    className="list-group-item-action"
                    href="#"
                  >Home
                  </a>
                </li>
                <li className="list-inline-item pl-2">
                  <a
                    className="list-group-item-action"
                    href="#"
                  >About Us
                  </a>
                </li>
                <li className="list-inline-item pl-2">
                  <a
                    className="list-group-item-action"
                    href="#"
                  >Career
                  </a>
                </li>
                <li className="list-inline-item pl-2">
                  <a
                    className="list-group-item-action"
                    href="#"
                  >Privacy Policy
                  </a>
                </li>
                <li className="list-inline-item pl-2">
                  <a
                    className="list-group-item-action pr-0"
                    href="#"
                  >Use of terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

FooterSection.displayName = 'FooterSection';
FooterSection.propTypes = propTypes;
