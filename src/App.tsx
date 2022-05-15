import { useLocalStorage, useColorScheme } from '@mantine/hooks';
import { StyledHeader, Home } from './components';
import * as React from 'react';
import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
  AppShell,
} from '@mantine/core';

type Props = {}

export const App: React.FC<Props> = (_: Props) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    defaultValue: useColorScheme(),
    key: 'theme',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
  const dark = colorScheme === 'dark';

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          primaryColor: dark ? 'yellow' : 'blue',
          colorScheme,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          header={<StyledHeader />}
          styles={{
            main: {
              height: 'calc(100vh - 60px)',
              padding: 0,
            },
          }}
        >
          <Home />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}