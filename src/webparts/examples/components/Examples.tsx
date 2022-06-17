import * as React from 'react';
import styles from './Examples.module.scss';
import { IExamplesProps } from './IExamplesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Counter } from "../../../common/components/counter.component"

export default class Examples extends React.Component<IExamplesProps, {}> {
  public render(): React.ReactElement<IExamplesProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.examples} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <Counter  />
        </div>
      </section>
    );
  }
}
