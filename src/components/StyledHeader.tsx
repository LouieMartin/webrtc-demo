import { MoonStars, Sun } from 'tabler-icons-react';
import { useHotkeys } from '@mantine/hooks';
import * as React from 'react';
import {
    useMantineColorScheme,
    useMantineTheme,
    createStyles,
    ActionIcon,
    Container,
    Tooltip,
    Header,
    Text,
} from '@mantine/core';

type Props = {}

const useStyles = createStyles({
    header: {
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export const StyledHeader: React.FC<Props> = (_: Props) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const { classes } = useStyles();
    const theme = useMantineTheme();

    useHotkeys([
        ['mod+J', () => toggleColorScheme()],
    ]);

    return (
        <Header height={60} fixed>
            <Container className={classes.header} fluid>
                <Text color={theme.primaryColor} weight={900} size="xl">JustCall</Text>
                <Tooltip label={dark ? 'Light mode' : 'Dark mode'}>
                    <ActionIcon 
                        onClick={() => toggleColorScheme()} 
                        color={dark ? 'yellow' : 'blue'}
                        radius="xl"
                    >
                        {dark ? <MoonStars size={18} /> : <Sun size={18} />}
                    </ActionIcon>
                </Tooltip>
            </Container>
        </Header>
    );
};