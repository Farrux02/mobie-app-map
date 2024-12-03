// App.tsx
import React from 'react';

const App: React.FC = () => {
  const isWeb = typeof window !== 'undefined' && typeof window.document !== 'undefined';

  const [AppComponent, setAppComponent] = React.useState<React.FC | null>(null);

  React.useEffect(() => {
    const loadComponent = async () => {
      if (isWeb) {
        const { default: AppWeb } = await import('./components/WebMap');
        setAppComponent(() => AppWeb);
      } else {
        const { default: AppMobile } = await import('./components/MobileMap');
        setAppComponent(() => AppMobile);
      }
    };

    loadComponent();
  }, [isWeb]);

  if (!AppComponent) {
    return null; 
  }

  return <AppComponent />;
};

export default App;
