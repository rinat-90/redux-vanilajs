import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from 'redux-logger'
import { rootReducer } from "./redux/rootReducer";
import { asyncIncrement, changeTheme, decrement, increment } from "./redux/actions";
import './styles.css'

const addBtn   = document.getElementById('add');
const subBtn   = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

let store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);

addBtn.addEventListener('click', () => {
  store.dispatch(increment())
});

subBtn.addEventListener('click', () => {
  store.dispatch(decrement())
});

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement())
});

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
  store.dispatch(changeTheme(newTheme))
});

store.subscribe(() => {
  const state = store.getState();

  document.getElementById('counter').textContent = state.counter;
  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
    btn.disabled = state.theme.disabled
  })
});

store.dispatch({ type: 'INIT_APP'});
