import { MoonStars, Sun } from 'tabler-icons-react';
import * as React from 'react';
import {
    useMantineColorScheme,
    useMantineTheme,
    createStyles,
    ActionIcon,
    Tooltip,
    Box,
} from '@mantine/core';

type Props = {}

const useStyles = createStyles(theme => ({
    wrapper: {
        padding: theme.spacing.md,
        alignItems: 'center',
        position: 'fixed',
        display: 'flex',
        width: '100%',
    },
}));

export const ColorSchemeButton: React.FC<Props> = (_: Props) => {
    const { toggleColorScheme, colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const { classes } = useStyles();
    const theme = useMantineTheme();

    return (
        <Box className={classes.wrapper}>
            <Tooltip label={dark ? 'Light mode' : 'Dark mode'}>
                <ActionIcon
                    onClick={() => toggleColorScheme()}
                    color={theme.primaryColor}
                    variant="hover"
                    radius="xl"
                >
                    {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                </ActionIcon>
            </Tooltip>
        </Box>
    );
};