# The Driving Auxiliary

Previously known as Map.sg

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
