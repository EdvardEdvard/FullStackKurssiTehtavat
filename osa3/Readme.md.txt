### Sovellus internetissä ### 

Frontend (puhelinluettelo) on rakennettu Reactilla ja liitetty backendin yhteyteen build-vaiheessa. Frontendin kehitysympäristö on CodeSandboxissa.

## API

- GET `/api/persons`
- POST `/api/persons`
- PUT `/api/persons/:id`
- DELETE `/api/persons/:id`

## Frontend 
https://scftt3-3001.csb.app/

Frontend on toteutettu Reactilla. Sovellus käyttää backendin APIa
suhteellisella polulla `/api/persons`. Frontend on buildattu ja
kopioitu backendin `dist/`-hakemistoon, josta Express tarjoaa sen.

## Backend
https://scftt3-3001.csb.app/api/persons

Backend on toteutettu Node.js:llä ja Expressillä ja se tarjoaa REST-rajapinnan
puhelinluettelon tietojen käsittelyyn. Backend palvelee myös frontendin
staattiset tiedostot.



