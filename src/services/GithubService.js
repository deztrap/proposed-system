import axios from './api';

export default {

  async verifyOAuthCode (code) {
    const { data } = await axios.post(`/github/auth`, { code });
    if (data?.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
    return data;
  },

  async getUserRepos ({
    token
  }) {
    const { data } = await axios.get('/github/repos', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data.data;
  },

  async createDeployment ({
    token,
    repo
  }) {
    const { data } = await axios({
      method: 'POST',
      url: `/deployments`,
      data: {
        repo,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data;
  },

  async fetchDeployments ({
    token
  }) {
    const { data } = await axios({
      method: 'GET',
      url: `/deployments`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data;
  },
  async fetchDeployment ({
    token,
    deploymentId,
  }) {
    const { data } = await axios({
      method: 'GET',
      url: `/deployments/${deploymentId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data;
  },

}