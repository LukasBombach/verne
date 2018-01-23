import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Editor from './io/react/';

const html = document.getElementById('editable-area').innerHTML;
const root = document.getElementById('render-area');

document.getElementById('editable-area').remove();
ReactDOM.render(<Editor html={html} />, root);
