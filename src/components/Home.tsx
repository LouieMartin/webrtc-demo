import { TextInput, Button, Center, Loader, Title, Text, Box } from '@mantine/core';
import { MediaConnection, Peer } from 'peerjs';
import * as React from 'react';

type Props = {}

export const Home: React.FC<Props> = (_: Props) => {
    const userVideo = React.useRef<HTMLVideoElement | null>(null);
    const [inCall, setInCall] = React.useState<boolean>(false);
    const video = React.useRef<HTMLVideoElement | null>(null);
    const [userId, setUserId] = React.useState<string>('');
    const [peer, setPeer] = React.useState<Peer>();

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
        <Center sx={{ height: '100%' }}>
            {peer ? (
                <Box>
                    {!inCall ? (
                        <>
                            <Title align="center">WebRTC Demo</Title>
                            <Text color="dimmed" align="center" mt="xl">
                                A WebRTC demo or example built with Mantine, React.js, Vite.js, and PeerJS.
                                User ID: {peer?.id}
                            </Text>
                            <TextInput onChange={event => setUserId(event.target.value)} placeholder="User ID here" mt="md" />
                            <Button
                                onClick={() => {
                                    setInCall(oldState => !oldState);
                                    navigator.mediaDevices.getUserMedia({
                                        audio: true,
                                        video: true,
                                    }).then(stream => {
                                        if (video.current) {
                                            video.current.srcObject = stream;
                                        }

                                        const call = peer.call(userId, stream);

                                        call.on('stream', (userStream: MediaStream) => {
                                            if (userVideo.current) {
                                                userVideo.current.srcObject = userStream;
                                            }
                                        });

                                        call.on('close', () => {
                                            setInCall(oldState => !oldState);
                                        });
                                    });
                                }}
                                fullWidth
                                mt="md"
                            >
                                Call
                            </Button>
                        </>
                    ) : (
                        <>
                            <video autoPlay ref={userVideo} />
                            <video autoPlay ref={video} muted />
                        </>
                    )}
                </Box>
            ) : (
                <Loader variant="dots" />
            )}
        </Center>
    );
};