import { useEffect } from "react";
import {useStore} from "mobx-utils";
import NotSpotify from "./components/NotSpotify";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

function AppSpotify() {
    const {initializeSpotifyData, access_token} = useStore().authData;
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.has('access_token') && params.has('refresh_token')) {
            //convert expires_in to int 
            initializeSpotifyData({
                access_token: params.get('access_token'),
                refresh_token: params.get('refresh_token'),
                token_type: params.get('token_type'),
                expires_in: Number(params.get('expires_in')),
                scope: params.get('scope'),
                client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
                client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
                redirect_uri: import.meta.env.VITE_REDIRECT_URI,
            });


            //TO DO - SAVE TOKENS IN LOCAL STORAGE AND REDIRECT TO HOME
            // window.history.pushState({}, document.title, "/");
        }
      }, []);
    
      const handleLogin = () => {
        window.location.href = 'http://localhost:3001/login';
      };

    return (
        <Container>
            {access_token ? (
                <NotSpotify />
                ) : (
                <>
                    <p>Not connected</p>
                    <button 
                    onClick={handleLogin}
                    >
                    Connect to NotSpotify
                    </button>
                </>
                )}
        </Container>
    )
}

export default observer(AppSpotify);