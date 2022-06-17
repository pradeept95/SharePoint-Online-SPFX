import * as React from 'react';
import { IExamplesProps } from './IExamplesProps';
import ApplicationMain from '../../../common/applicaiton-main.component';
import { HashRouter as Router } from 'react-router-dom';

export default class Examples extends React.Component<IExamplesProps, {}> {
  public render(): React.ReactElement<IExamplesProps> {
    return (
      <section>
        <Router>
          <ApplicationMain />
        </Router> 
      </section>
    );
  }
}
