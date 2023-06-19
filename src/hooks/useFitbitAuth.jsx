import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
  revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
};

export default function useFitbitAuth() {
  const redirectUri = makeRedirectUri({
    scheme: 'dancetracker',
  });

  console.log('Fitbit Redirect URI:', redirectUri);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '23R6CZ',
      scopes: [
        'activity',
        'cardio_fitness',
        'electrocardiogram',
        'heartrate',
        'location',
        'nutrition',
        'oxygen_saturation',
        'profile',
        'respiratory_rate',
        'settings',
        'sleep',
        'social',
        'temperature',
        'weight',
      ],
      redirectUri,
    },
    discovery
  );

  React.useEffect(() => {
  if (response?.type === 'success') {
    const { code } = response.params;
    // Make a request to your server with the code to exchange it for an access token
    // Example using fetch:
    fetch('https://api.fitbit.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `client_id=CLIENT_ID&grant_type=authorization_code&code=${code}&redirect_uri=your.app://callback`,
    })
      .then((response) => response.json())
      .then((data) => {
        const { accessToken } = data;
        // Do something with the access token
        console.log('Access Token:', accessToken);
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
      });
  }
}, [response]);

  return {
    request,
    promptAsync,
  };
}
