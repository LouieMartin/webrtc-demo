import { MoonStars, Sun } from 'tabler-icons-react';
import * as React from 'react';
import {
    useMantineColorScheme,
    createStyles,
    ActionIcon,
    Tooltip,
    Box,
} from '@mantine/core';

type Props = {}

const useStyles = createStyles(theme => ({
    wrapper: {
        paddingLeft: theme.spacing.md,
        alignItems: 'center',
        display: 'flex',
        height: 60,
    },
}));

export const ColorSchemeButton: React.FC<Props> = (_: Props) => {
    const { toggleColorScheme, colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const { classes } = useStyles();

    return (
        <Box className={classes.wrapper}>
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
        </Box>
    );
};