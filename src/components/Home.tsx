import { MediaConnection, Peer } from 'peerjs';
import { useForm } from '@mantine/form';
import * as React from 'react';
import {
  TextInput,
  Center,
  Button,
  Loader,
  Text,
  Box,
} from '@mantine/core';

type Props = {}

export const Home: React.FC<Props> = (_: Props) => {
  const userVideo = React.useRef<HTMLVideoElement | null>(null);
  const [inCall, setInCall] = React.useState<boolean>(false);
  const video = React.useRef<HTMLVideoElement | null>(null);
  const [peer, setPeer] = React.useState<Peer>();
  const callForm = useForm({
    initialValues: {
      userId: '',
    },
  });

  React.useEffect(() => {
    const newPeer = new Peer();

    newPeer.on('open', () => setPeer(newPeer));
    newPeer.on('call', (call: MediaConnection) => {
      setInCall(oldState => !oldState);
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      }).then(stream => {
        if (video.current) {
          video.current.srcObject = stream;
        }

        call.answer(stream);
        call.on('stream', (userStream: MediaStream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = userStream;
          }
        });

        call.on('close', () => {
          setInCall(oldState => !oldState);
        });
      });
    });

    return () => newPeer.destroy();
  }, []);

  return (
    <Center sx={{ height: 'calc(100vh - 60px)' }}>
      {peer ? (
        <Box p="md">
          {inCall ? (
            <>
              <video style={{ borderRadius: 16, marginRight: 16 }} ref={video} autoPlay muted />
              <video style={{ borderRadius: 16, marginRight: 16 }} ref={userVideo} autoPlay />
            </>
          ) : (
            <>
              <Text color="dimmed" align="center">{peer.id}</Text>
              <form onSubmit={callForm.onSubmit(values => {
                setInCall(oldState => !oldState);
                navigator.mediaDevices.getUserMedia({
                  audio: true,
                  video: true,
                }).then(stream => {
                  if (video.current) {
                    video.current.srcObject = stream;
                  }

                  const call = peer.call(values.userId, stream);

                  call.on('stream', (userStream: MediaStream) => {
                    if (userVideo.current) {
                      userVideo.current.srcObject = userStream;
                    }
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
            </>
          )}
        </Box>
      ) : (
          <Loader variant="dots" />
      )}
    </Center>
  );
};