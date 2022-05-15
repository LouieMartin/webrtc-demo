import { useLocalStorage, useColorScheme } from '@mantine/hooks';
import { Home } from './components';
import * as React from 'react';
import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
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
        <Home />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}