import * as React from 'react';
import { IExamplesProps } from './IExamplesProps';
import ApplicationMain from '../../../common/ApplicationMain';
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../../common/auth/AuthProvider';
import { LoadingProvider } from '../../../common/components/spinner/LoadingContext';
import { AlertProvider } from '../../../common/components/alert/AlertContext';

export default class Examples extends React.Component<IExamplesProps, {}> {

  public render(): React.ReactElement<IExamplesProps> {
    return (
      <>
        <Router>
          <LoadingProvider>
            <AuthProvider>
              <AlertProvider>
                <ApplicationMain />
              </AlertProvider>
            </AuthProvider>
          </LoadingProvider>
        </Router>
      </>
    );
  }
}
