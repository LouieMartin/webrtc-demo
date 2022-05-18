import { BrandGithub, MoonStars, Sun } from 'tabler-icons-react';
import {
  useMantineColorScheme,
  createStyles,
  ActionIcon,
  Container,
  Tooltip,
  Header,
  Group,
  Text,
} from '@mantine/core';
import * as React from 'react';

const useStyles = createStyles({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    height: 60,
  },
});

type Props = {}

export const StyledHeader: React.FC<Props> = (_: Props) => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { classes } = useStyles();

  return (
    <Header height={60} fixed>
      <Container className={classes.header} fluid>
        <Text color={dark ? 'yellow' : 'blue'} weight={900} size="xl">JustCall</Text>
        <Group>
          <Tooltip label="Source code">
            <ActionIcon<'a'>
              href="https://github.com/LouieMartin/webrtc-demo"
              color={dark ? 'gray' : 'dark'}
              variant="hover"
              component="a"
              radius="xl"
            >
              <BrandGithub size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={dark ? 'Light mode' : 'Dark mode'}>
            <ActionIcon
              onClick={() => toggleColorScheme()}
              color={dark ? 'yellow' : 'blue'}
              variant="hover"
              radius="xl"
            >
              {dark ? <Sun size={18} /> : <MoonStars size={18} />}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Container>
    </Header>
  );
};