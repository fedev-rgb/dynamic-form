import { createApp } from 'vue';
import {
  Field, CellGroup, Button, Search,
} from 'vant';
import 'vant/lib/index.css';
import './assets/main.css';

import App from './App.vue';

const app = createApp(App);

app.use(Field);
app.use(CellGroup);
app.use(Button);
app.use(Search);

app.mount('#app');
