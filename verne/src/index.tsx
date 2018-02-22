import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Editor from './io/react/';

const root = document.getElementById('editable-area');
const html = root.innerHTML;

root.innerHTML = '';
ReactDOM.render(<Editor html={html} />, root);
