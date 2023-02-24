# Map.sg

## Description

Directions with step-by-step instruction web application with live traffic images (in Singapore). View history and bookmark frequent routes to start your journey immediately.

## Hosted app

Application is hosted on: https://cz2006-4bb77.web.app/

## How to run locally

After pulling into your workspace, run npm install to install the node-modules. Please ensure node.js is installed in your system.

File Structure
- src
  - Components
    - Map (map component)
      - index
    - Authentication (manage signin/signout)
      - SignIn
      - SignOut
      - SignUp
    - Firebase (firebase config)
      - Context
      - Firebase
      - Index
    - Home (where app.js points to)
      - index
    - Navigation (sidebar)
      - index
    - Session (session management)
      - index
      - Context
      - withAuthentication
      - withAuthorization
  - Constants (store constant variables)
      - values 
      - routes 
app.js (Where index.html points to. Handle routing here)
