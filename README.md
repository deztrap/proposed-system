# Subsystems
1. Uploader
2. Elector
3. Builder & Distributor
4. Server

1. Uploader
  - the uploader is the responsible of
    - logging users into a github account
    - getting their repositories
    - getting the user to pick the repository they want to build (clone)
    - populates the deployments table with the selected repository
    - notifies the elector
  - is on port 8080
2. Elector
  - the elector is responsible for
    - asking every server for their current load
    - picking the least loaded server and notifying the builder
      - he must notify the builder with the id of the repository to build
  - is on port 9000
3. Builder
  - the builder is responsible for
    - cloning the repository
    - building the project
    - updating the status of the repository on the deployments table
      - set it to one of the following values:
        - "building"
        - "success"
        - "failure"
      - also write to deployment log
    - if success
      - zip the built website
      - call the distributor
  - the distributor is responsible for
    - getting the zip file
    - using p2p method to send it to the other servers
    - it is also a reciever of the zip files
      - in this case it saves the file to a folder
  - is on port 9001
4. Hoster/Server
  - serve the html pages
  - there will be N servers running
    - N is the number of replicas 
    - the server is hosted on K8s pods
    - the servers are the ones who both build and serve the websites
  - is on port 80

DataModels
- Deployment
  - id, name, repo_url, build_status, updated_at, live_url
  - enum build_status 
    - queued -> waiting to be elected
    - building -> picked by the builder
    - built -> builder finished building, waiting to be distributed
    - distributed -> fully sent to atleast one other node
    - success -> fully sent to all nodes
    - buildFailed -> failed to build
    - distributionFailed -> failed to distribute
- DeploymentLog
  - deployment_id, created_at,
  - message
- DeploymentFiles
  - deployment_id, path, created_at
- Server
  - id, name, ip, load, created_at, updated_at