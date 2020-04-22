import { DeliveryClient } from 'kentico-cloud-delivery';
import Head from 'next-server/head';
import { MouseEventHandler } from 'react';
import * as React from 'react';
import { Layout } from '../components/layout/layout';
import { getProjectIdFromQuery } from '../utilities/utils';
import fetch from 'cross-fetch';

enum Status {
  Initial = 'Initial',
  Sending = 'Sending',
  Success = 'Success',
  Fail = 'Fail',
}

type ApiKeyFormState = {
  readonly apiKey: string;
  readonly errorMessage: string | null;
  readonly sendingStatus: Status;
}

interface IApiKeyFormProps {
  readonly projectId: string;
}

class ApiKeyForm extends React.PureComponent<IApiKeyFormProps, ApiKeyFormState> {
  static displayName = 'ApiKeyForm';

  static getInitialProps = async ({ query }): Promise<IApiKeyFormProps> => {
    const projectId = getProjectIdFromQuery(query);

    return {
      projectId,
    };
  };

  state: ApiKeyFormState = {
    apiKey: '',
    errorMessage: null,
    sendingStatus: Status.Initial,
  };

  private _apiKeyChanged = (event) => {
    const { value: apiKey } = event.target;
    this.setState(() => ({
      apiKey,
    }));
  };

  private _refresh: MouseEventHandler = (event) => {
    event.preventDefault();
    location = location;
    return false;
  };

  private _saveApiKey = async () => {
    const { apiKey, sendingStatus } = this.state;
    const { projectId } = this.props;
    if (sendingStatus !== Status.Sending) {
      this.setState(() => ({ sendingStatus: Status.Sending }), async () => {
        try {
          const client = new DeliveryClient({
            projectId,
            enablePreviewMode: true,
            previewApiKey: apiKey,
          });
          await client.item('home_page').withParameter('depth', '10').getPromise();
          try {
            await fetch(`/api-key/${projectId}`, {
              method: 'PUT',
              body: JSON.stringify({ key: apiKey }),
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json',
              },
              redirect: 'follow', // manual, *follow, error
              referrer: 'no-referrer', // no-referrer, *client
            });
            this.setState(() => ({
              sendingStatus: Status.Success,
            }));
          }
          catch (e) {
            console.error(e);
            this.setState(() => ({
              errorMessage: e.message,
              sendingStatus: Status.Fail,
            }));
          }
        }
        catch (e) {
          this.setState(() => ({
            errorMessage: e.message,
            sendingStatus: Status.Fail,
          }));
        }
      });
    }
  };

  render() {
    const { apiKey, sendingStatus, errorMessage } = this.state;
    const { projectId } = this.props;

    return (
      <Layout>
        <Head>
          <meta charSet="utf-8" />
          <meta
            httpEquiv="X-UA-Compatible"
            content="IE=edge"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <meta
            name="description"
            content="Provide Api key"
          />

          {/*-- Favicon --*/}
          <link
            rel="shortcut icon"
            href="static/assets/images/favicon.ico"
          />
        </Head>
        <section className="p-0 position-relative height-900-responsive ie-height-800 bg-grad pattern-overlay-1 overflow-hidden">
          <div className="container d-flex h-100">
            <div className="row align-self-center w-100">
              <div className="col-md-6 mt-md-0 all-text-white">
                <h2 className="display-6 display-xl-4 font-weight-normal">Provide Delivery Preview API key for this project.</h2>
                <p className="h4 mb-4 font-weight-normal d-none d-sm-block">
                  It can be{' '}
                  <a
                    className="underline"
                    href={`https://app.kenticocloud.com/${projectId}/settings/api-keys`}
                    target="_blank"
                  >
                    found here
                  </a>
                  .
                </p>
                <textarea
                  className="align-self-center w-100 all-text-black"
                  onChange={this._apiKeyChanged}
                  value={apiKey}
                />
                <button
                  disabled={sendingStatus === Status.Sending}
                  onClick={this._saveApiKey}
                  className="btn btn-dark"
                >
                  Submit
                </button>
                {sendingStatus === Status.Fail && (
                  <p className="h4 mb-4 font-weight-normal d-none d-sm-block all-text-red position-absolute">
                    The provided API key is not working correctly. We've got this error message:
                    <br />
                    {errorMessage}
                  </p>
                )}
                {sendingStatus === Status.Sending && (
                  <p className="h4 mb-4 font-weight-normal d-none d-sm-block position-absolute">
                    Submitting
                  </p>
                )}
                {sendingStatus === Status.Success && (
                  <p className="h4 mb-4 font-weight-normal d-none d-sm-block position-absolute">
                    The apiKey appears to be alright.{' '}
                    <a
                      className="underline"
                      href="#"
                      onClick={this._refresh}
                    >
                      Refresh the page
                    </a>
                    {' '}to see the demo-site.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default ApiKeyForm;
