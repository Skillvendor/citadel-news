import StandardRequest from "./standardRequest";

const SERVER = process.env.REACT_APP_DISCORD_API_ENDPOINT;

class DiscordRequest {
  constructor() {
    this.StandardRequest = new StandardRequest(SERVER);
  }

  get = async (url, headers) => this.StandardRequest.get(url, headers);

  post = async (url, params) => this.StandardRequest.post(url, params);

  getAuthorizationCode = async (authToken) => {
    var bodyFormData = new FormData();
    bodyFormData.append('client_id', process.env.REACT_APP_CLIENT_ID);
    bodyFormData.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
    bodyFormData.append('grant_type', 'authorization_code');
    bodyFormData.append('code', authToken);
    bodyFormData.append('redirect_uri', process.env.REACT_APP_REDIRECT_URL);

    return await this.StandardRequest.post('oauth2/token', bodyFormData);
  }
};

export default new DiscordRequest();
