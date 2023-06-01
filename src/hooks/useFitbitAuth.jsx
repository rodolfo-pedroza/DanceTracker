import { useState, useEffect } from 'react';
import { makeRedirectUri, startAsync, useAuthRequest } from 'expo-auth-session';
import qs from 'qs';

const config = {
  clientId: '23QWQV',
  scopes: ['activity', 'heartrate', 'location', 'nutrition', 'profile', 'settings', 'sleep', 'social', 'weight'],
};

const redirectUri = makeRedirectUri({ useProxy: true });

const discovery = {
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
  revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
};

export const useFitbitAuth = () => {
  const [authToken, setAuthToken] = useState(null);
  console.log('Initializing useFitbitAuth hook', authToken)

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: config.clientId,
      scopes: config.scopes,
      redirectUri: redirectUri,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      setAuthToken(access_token);
    }
  }, [response]);

  const getFitbitAuthUrl = () => {
    const authUrl = 'https://www.fitbit.com/oauth2/authorize';
    const queryParams = qs.stringify({
      client_id: config.clientId,
      response_type: 'token',
      scope: config.scopes.join(' '),
      redirect_uri: redirectUri,
      expires_in: '31536000',
    });
    return `${authUrl}?${queryParams}`;
  };

  const handlePress = async () => {
    const authUrl = getFitbitAuthUrl();
    const result = await startAsync({ authUrl });

    if (result.type === 'success') {
      setAuthToken(result.params.access_token);
    }
  };

  return { authToken, useFitbitAuthRequest: handlePress };
};
