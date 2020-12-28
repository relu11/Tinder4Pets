# The Client Side (The Scary ReactJS)

## Quick Start
1. install the dependencies:
```
npm i
```
2. Run the application
```
npm start
```

## wth is going on?
You should know about React by now. If you don't, check [this link](https://reactjs.org/).

But let's discuss the elephant in the room, the [state management](https://en.wikipedia.org/wiki/State_management#:~:text=State%20management%20refers%20to%20the,in%20a%20graphical%20user%20interface.&text=As%20applications%20grow%2C%20this%20can,problems%20in%20user%20interface%20development.).
While developing a complex react applicaiton, there are some pieces of data that needs to be shared among the components. An example of data is the data of the current logged in user. Due to the components hierarchy of React, this can be very messy, to organize it we use a `state management framework`.
In this project we'll be using [Redux](https://redux.js.org/). Redux is a state management framework that works
### How `Redux` works?
Redux works on three principles: `store`, `reducers`, `actions`.

1. A `store` is where all the information are stored in, a center place for all the components to reach. For better development, the `store` is combined of `sub-stores` that handle each category of data.
2. `actions` are basicly functions that modify a piece of data in the store.
3. `reducers` are the middleware between the actions and the store. An action triggers a reducer


### A look on the structure of the src folder:
- /components:
  - The components code. This contains the html, styles, and the basic logic of the component.
- /redux
  - store.js
    - The combined store
  - actions.js
    - The actions of the application
  - /reducers
    - The logic of the reducers
- index.js
  - You probably know what is it by now


