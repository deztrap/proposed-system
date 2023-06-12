import { createStore } from 'vuex'
import { useToast } from "primevue/usetoast";
import GithubService from '../services/GithubService';

export default createStore({
  state: {
    githubToken: null,
    user: {
      data: null,
      token: null,
      loading: false,
      loaded: false,
      error: false,
      loggedIn: false,
    },
    deployments: {
      data: [
        {
          id: '123',
          name: 'Example Deployment',
          repo: 'github.com/some/repo',
          status: "pending"
        },
        {
          id: '1234',
          name: 'Sample Deployment',
          repo: 'github.com/other/repo',
          status: "success"
        },
        {
          id: '125',
          name: 'Cool Deployment',
          repo: 'github.com/rad/repo',
          status: "failed"
        },
      ],
      loading: false,
      loaded: false,
      error: false,
    },
    deployment: {
      data: {},
      loading: false,
      loaded: false,
      error: false,
      refreshing: false,
    },
    repos: {
      data: [],
      loading: false,
      loaded: false,
      error: false,
    }
  },
  mutations: {
    restoreFromLocalStorage (state) {
      state.user.data = JSON.parse(localStorage.getItem('user')) || null;
      state.user.token = localStorage.getItem('userToken') || null;
      state.user.loggedIn = localStorage.getItem('loggedIn') || false;
      state.githubToken = localStorage.getItem('githubToken') || null;
      state.deployments.data = JSON.parse(localStorage.getItem('deployments')) || [];
      state.deployment.data = JSON.parse(localStorage.getItem('deployment')) || {};
    },

    setUser (state, value) { state.user.data = value; localStorage.setItem('user', JSON.stringify(value)) },
    setUserToken (state, value) { state.user.token = value; localStorage.setItem('userToken', value) },
    setUserLoading (state, value) { state.user.loading = value; },
    setUserLoaded (state, value) { state.user.loaded = value },
    setUserError (state, value) { state.user.error = value },

    setLoggedIn (state, value) { state.user.loggedIn = value; localStorage.setItem('loggedIn', value) },
    setGithubToken (state, value) { state.githubToken = value; localStorage.setItem('githubToken', value) },

    setDeployments (state, value) { state.deployments.data = value; localStorage.setItem('deployments', JSON.stringify(value)) },
    setDeploymentsLoading (state, value) { state.deployments.loading = value },
    setDeploymentsLoaded (state, value) { state.deployments.loaded = value },
    setDeploymentsError (state, value) { state.deployments.error = value },

    setDeployment (state, value) { state.deployment.data = value; localStorage.setItem('deployment', JSON.stringify(value)) },
    setDeploymentLoading (state, value) { state.deployment.loading = value },
    setDeploymentLoaded (state, value) { state.deployment.loaded = value },
    setDeploymentError (state, value) { state.deployment.error = value },
    setDeploymentRefreshing (state, value) { state.deployment.refreshing = value; },

    setRepos (state, value) { state.repos.data = value },
    setReposLoading (state, value) { state.repos.loading = value },
    setReposLoaded (state, value) { state.repos.loaded = value },
    setReposError (state, value) { state.repos.error = value },
  },
  getters: {
    getUser (state) { return state.user },
    getGithubToken (state) { return state.githubToken },
    getDeployments (state) { return state.deployments },
    isUserLoggedIn (state) { return state.user.loggedIn },

    getDeployment (state) { return state.deployment },
    deploymentLoaded (state) { return state.deployment.loaded },
    deploymentRefreshing (state) { return state.deployment.refreshing },
    deploymentLoading (state) { return state.deployment.loading },

    getRepos (state) { return state.repos.data },
    getReposLoading (state) { return state.repos.loading },
  },
  actions: {
    async login ({ state, commit, dispatch }, { token }) {
      try {
        if (!token) throw new Error('Missing token in login action');
        commit('setUserLoading', true)
        const user = await GithubService.verifyOAuthCode(token)
        commit('setLoggedIn', true)
        commit('setGithubToken', token)
        commit('setUserToken', user.a)
        commit('setUser', user)
        commit('setUserLoading', false)
        commit('setUserLoaded', true)
        commit('setUserError', false)
      } catch (error) {
        commit('setUserError', true)
        commit('setUserLoading', false)
        dispatch('addErrorMessage', error.message || 'Error logging in')
      }
      dispatch("clearURLParams")
    },
    async logout ({ commit }) {
      commit('setLoggedIn', false)
      commit('setGithubToken', null)
      commit('setUser', null)
      localStorage.clear()
    },
    async fetchDeployments ({ commit, getters }) {
      try {
        commit('setDeploymentsLoading', true)
        const deployments = await GithubService.fetchDeployments({ token: getters.getGithubToken })
        const sortedDeployments = deployments.sort((a, b) => {
          return a?.live_url === undefined && b?.live_url ? 1 : -1
        });
        commit('setDeployments', sortedDeployments)
        commit('setDeploymentsLoaded', true)
        commit('setDeploymentsLoading', false)
        commit('setDeploymentsError', false)
      } catch (error) {
        console.error(error)
        commit('setDeploymentsError', true)
        commit('setDeploymentsLoading', false)
      }
    },
    async fetchDeployment ({ commit, getters, dispatch }, { deploymentId }) {
      try {
        commit('setDeploymentLoading', true)
        const deployment = await GithubService.fetchDeployment({ deploymentId, token: getters.getGithubToken })
        commit('setDeployment', deployment)
        commit('setDeploymentLoaded', true)
        commit('setDeploymentLoading', false)
        commit('setDeploymentError', false)
        dispatch('refreshDeployment', { deploymentId: deployment.id })
      } catch (error) {
        console.error(error)
        commit('setDeploymentError', true)
        commit('setDeploymentLoading', false)
      }

    },
    async createDeployment ({ commit, getters }, payload) {
      try {
        commit('setDeploymentLoading', true)
        // const deployment = await deployWebsite({ ...payload, userToken: getters.getUserToken })
        // commit('setDeployment', deployment)
        commit('setDeploymentLoaded', true)
        commit('setDeploymentLoading', false)
        commit('setDeploymentError', false)
      } catch (error) {
        commit('setDeploymentError', true)
        commit('setDeploymentLoading', false)
      }
    },
    async refreshDeployment ({ commit, getters }, { deploymentId }) {
      try {
        commit('setDeploymentRefreshing', true)
        // const deployment = await refreshDeployment({ deploymentId, userToken: getters.getUserToken })
        // commit('setDeployment', deployment)
        const oldDeployment = getters.getDeployment.data
        const newDeployment = { ...oldDeployment, name: 'New Example Deployment ' + Math.random() }
        commit('setDeployment', newDeployment)
        commit('setDeploymentRefreshing', false)
      } catch (error) {
        commit('setDeploymentRefreshing', false)
      }
    },
    async addErrorMessage ({ }, message) {
      const toast = useToast();
      toast.add({ severity: 'info', summary: 'Error', detail: message, life: 3000 });
    },
    async clearURLParams ({ }) {
      window.location.href = window.location.origin
    },
    async fetchUserRepos({ state, commit }) {
      try{ 
        commit('setReposLoading', true)
        const repos = await GithubService.getUserRepos({
          token: state.githubToken,
        })
        commit('setRepos', repos)
        commit('setReposLoading', false)

      } catch(error){
        console.error(error)
        commit('setReposError', true)
        commit('setReposLoading', false)
      }
    },
    async deployRepo({ state, commit, getters }, repo) {
      try{
        const deployment = await GithubService.createDeployment({
          token: state.githubToken,
          repo: repo,
        });
      } catch(error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
