import { updateNotification, showNotification } from '@mantine/notifications';
import { MediaConnection, Peer } from 'peerjs';
import { Phone, Check, X } from 'tabler-icons-react';
import { useForm } from '@mantine/form';
import * as React from 'react';
import {
  createStyles,
  ActionIcon,
  TextInput,
  Center,
  Button,
  Loader,
  Affix,
  Text,
  Box,
} from '@mantine/core';

type Props = {}

const useStyles = createStyles({
  userVideo: {
    minHeight: '100%',
    position: 'fixed',
    minWidth: '100%',
    zIndex: -1,
    bottom: 0,
    right: 0,
  },
});

export const Home: React.FC<Props> = (_: Props) => {
  const userVideo = React.useRef<HTMLVideoElement | null>(null);
  const [inCall, setInCall] = React.useState<boolean>(false);
  const [call, setCall] = React.useState<MediaConnection>();
  const [peer, setPeer] = React.useState<Peer>();
  const { classes } = useStyles();
  const callForm = useForm({
    initialValues: {
      userId: '',
    },
  });


  React.useEffect(() => {
    const newPeer = new Peer();

    newPeer.on('open', () => setPeer(newPeer));
    newPeer.on('call', (call: MediaConnection) => {
      setCall(call);
      setInCall(oldState => !oldState);
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      }).then(stream => {
        call.answer(stream);
        call.on('stream', (userStream: MediaStream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = userStream;
          }
        });

        call.on('error', () => {
          setInCall(oldState => !oldState);
        });

        call.on('close', () => {
          setInCall(oldState => !oldState);
        });
      });
    });

    return () => newPeer.destroy();
  }, []);

  if (inCall) {
    return (
      <>
        <video className={classes.userVideo} ref={userVideo} autoPlay />
        <Affix position={{ bottom: 16, right: 16 }}>
          <ActionIcon
            onClick={() => call?.close()}
            variant="filled"
            color="red"
            radius="xl"
            size="xl"
          >
            <Phone />
          </ActionIcon>
        </Affix>
      </>
    );
  }

  return (
    <Center sx={{ height: 'calc(100vh - 60px)' }}>
      {peer ? (
        <Box p="md">
          <Text color="dimmed" align="center">{peer.id}</Text>
          <form onSubmit={callForm.onSubmit(values => {
            setInCall(oldState => !oldState);
            callForm.setValues({ userId: '' });
            navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true,
            }).then(stream => {
              const call = peer.call(values.userId, stream);

              setCall(call);
              call.on('stream', (userStream: MediaStream) => {
                if (userVideo.current) {
                  userVideo.current.srcObject = userStream;
                }
              });

              call.on('error', () => {
                setInCall(oldState => !oldState);
              });

              call.on('close', () => {
                setInCall(oldState => !oldState);
              });
            });
          })}>
            <TextInput
              {...callForm.getInputProps('userId')}
              placeholder="User ID here"
              mt="md"
            />
            <Button
              type="submit"
              radius="xl"
              fullWidth
              mt="md"
            >
              Call
            </Button>
          </form>
        </Box>
      ) : (
        <Loader variant="dots" />
      )}
    </Center>
  );
};
