import * as React from 'react';
import { IExamplesProps } from './IExamplesProps';
import ApplicationMain from '../../../common/applicaiton-main.component';
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../../common/auth/auth-provider.context';

export default class Examples extends React.Component<IExamplesProps, {}> {

  public render(): React.ReactElement<IExamplesProps> {
    return (
      <section>
        <Router>
          <AuthProvider>
            <ApplicationMain />
          </AuthProvider>
        </Router>
      </section>
    );
  }
}
