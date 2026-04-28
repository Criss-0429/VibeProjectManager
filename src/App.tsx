/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { DashboardView } from './components/DashboardView';
import { InboxView } from './components/InboxView';
import { ProjectsView } from './components/ProjectsView';
import { DailyLogsView } from './components/DailyLogsView';
import { WebhooksView } from './components/WebhooksView';
import { GuideView } from './components/GuideView';
import { BackendView } from './components/BackendView';

function AppContent() {
  const [currentView, setCurrentView] = useState('guide');

  const renderView = () => {
    switch(currentView) {
      case 'guide': return <GuideView />;
      case 'backend': return <BackendView />;
      case 'dashboard': return <DashboardView />;
      case 'inbox': return <InboxView />;
      case 'projects': return <ProjectsView />;
      case 'daily': return <DailyLogsView />;
      case 'webhooks': return <WebhooksView />;
      case 'settings': return (
        <div className="p-8"><h1 className="text-2xl font-mono">System Settings...</h1></div>
      );
      default: return <DashboardView />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

export default function App() {
  return <AppContent />;
}
