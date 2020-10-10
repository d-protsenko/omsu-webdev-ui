import React from 'react';
import classNames from 'classnames';
import './style.css';

interface UsageProps {
  title: string;
  usage: number;
}

const UsageWidget: React.FC<UsageProps> = ({ title, usage }) => (
  <div className={classNames(`usage-widget`, usage > 80 ? `usage-bg-red` : `usage-bg-light`)}>
    <h1 className={`usage-current`}>{usage}</h1>
    <h2 className={`usage-title`}>{title} Usage</h2>
  </div>
);

export default UsageWidget;
