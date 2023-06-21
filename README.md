# NodeJs app example
A simple NodeJs app example

## How to run
1. Install dependencies
```bash
npm install
```
2. Run the app
```bash
npm start
```
3. Open the browser and go to http://localhost:3000
```

## How to run tests
```bash
npm test
```

## How to run lint
```bash
npm run lint
```

## How to run lint fix
```bash
npm run lint:fix
```


ignore node_modules
```
git rm -r --cached node_modules
git commit -m 'Remove the now ignored directory node_modules'
git push origin master
```

add .gitignore
```
node_modules
```

kill address already in use 
```
sudo kill -9 $(sudo lsof -t -i:3000)
```