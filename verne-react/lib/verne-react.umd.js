(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('react-dom'), require('@verne/verne')) :
	typeof define === 'function' && define.amd ? define(['react', 'react-dom', '@verne/verne'], factory) :
	(global.Verne = factory(global.React,global.ReactDOM,global.Verne));
}(this, (function (React,ReactDOM,Verne) { 'use strict';

var Verne__default = 'default' in Verne ? Verne['default'] : Verne;

const __assign = Object.assign || function (target) {
    for (var source, i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (var prop in source) {
            if (Object.prototype.hasOwnProperty.call(source, prop)) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
}

const debug = {
    log: {
        docRendering: false,
        nodeRendering: false,
        middlewareCalls: false,
        transformations: true,
    }
};

class NodeMap {
    static getTextNode(domNode) {
        return NodeMap.map.get(domNode) || null;
    }
    static getDomNode(textNode) {
        const entries = NodeMap.map.entries();
        for (const entry of entries) {
            if (entry[1].originId === textNode.originId)
                return entry[0];
        }
        return null;
    }
    static set(key, val) {
        NodeMap.map.set(key, val);
        return this;
    }
    static delete(key) {
        NodeMap.map.delete(key);
        return this;
    }
}
NodeMap.map = new Map();

class Text extends React.Component {
    constructor(...args) {
        super(...args);
        this.domNode = null;
    }
    componentDidMount() {
        NodeMap.set(ReactDOM.findDOMNode(this), this.props.node);
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.node.id !== this.props.node.id;
    }
    componentWillUnmount() {
        NodeMap.delete(ReactDOM.findDOMNode(this));
    }
    componentDidUpdate() {
        NodeMap.delete(this.domNode);
        NodeMap.set(ReactDOM.findDOMNode(this), this.props.node);
    }
    render() {
        if (debug.log.docRendering) {
            console.groupCollapsed('%cRendering %cText   %c%d %c%s', 'color: gray; font-weight: lighter;', 'color: black; font-weight: bold;', 'color: blue;', this.props.node.id, 'color: gray; font-weight: lighter;', this.props.node.text);
            console.log(this.props.node.text);
            console.groupEnd();
        }
        return this.props.node.text;
    }
}

class Inline extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.node.id !== this.props.node.id;
    }
    render() {
        if (debug.log.docRendering) {
            console.groupCollapsed('%cRendering %cInline %c%d %c%s', 'color: gray; font-weight: lighter;', 'color: black; font-weight: bold;', 'color: blue;', this.props.node.id, 'color: gray; font-weight: lighter;', this.props.node.attrs.join(', '));
            console.log(this.props.node);
            console.groupEnd();
        }
        return this.props.node.attrs
            .map(attr => Inline.attrElMap[attr] || 'span')
            .reduce((Prev, Cur) => React.createElement(Cur, null, Prev), React.createElement(Text, {node: this.props.node}));
    }
}
Inline.attrElMap = {
    bold: 'strong',
    italic: 'em',
    del: 'del',
};

class Block extends React.Component {
    static renderChild(node) {
        if (node instanceof Verne.Block)
            return React.createElement(Block, {key: node.id, node: node});
        if (node instanceof Verne.Text)
            return React.createElement(Inline, {key: node.id, node: node});
    }
    render() {
        const { node, node: { tagName: BlockTag } } = this.props;
        if (debug.log.docRendering) {
            console.groupCollapsed('%cRendering %cBlock  %c%d %c%s', 'color: gray; font-weight: lighter;', 'color: black; font-weight: bold;', 'color: blue;', node.id, 'color: gray; font-weight: lighter;', node.tagName);
            console.log(node);
            console.groupEnd();
        }
        return (React.createElement(BlockTag, null, node.children().map(child => Block.renderChild(child))));
    }
}

class Selection {
    constructor(anchorNode, focusNode, anchorOffset, focusOffset) {
        this.anchorNode = anchorNode;
        this.focusNode = focusNode;
        this.anchorOffset = anchorOffset;
        this.focusOffset = focusOffset;
    }
    static getUserSelection() {
        const nativeSelection = window.getSelection();
        const anchorNode = NodeMap.getTextNode(nativeSelection.anchorNode);
        const focusNode = NodeMap.getTextNode(nativeSelection.focusNode);
        const anchorOffset = nativeSelection.anchorOffset;
        const focusOffset = nativeSelection.focusOffset;
        return new Selection(anchorNode, focusNode, anchorOffset, focusOffset);
    }
    static setCaret(node, offset) {
        const domNode = NodeMap.getDomNode(node);
        const nativeSelection = window.getSelection();
        const nativeRange = document.createRange();
        nativeRange.setStart(domNode, offset);
        nativeRange.setEnd(domNode, offset);
        nativeSelection.removeAllRanges();
        nativeSelection.addRange(nativeRange);
    }
    toJson() {
        return {
            anchorNode: this.anchorNode,
            focusNode: this.focusNode,
            anchorOffset: this.anchorOffset,
            focusOffset: this.focusOffset,
        };
    }
}

function handleBeforeInput(editor, e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const selectionJson = Selection.getUserSelection().toJson();
        const action = { type: 'input', selection: selectionJson, str: e.data };
        const { doc, selection } = yield editor.editor.actions.dispatch(action);
        editor.setState(() => ({ doc }));
        if (selection)
            Selection.setCaret(selection.focusNode, selection.focusOffset);
    });
}

const keysToHandle = ['Backspace', 'Delete'];
function handleKeyDown(editor, e) {
    return __awaiter(this, void 0, void 0, function* () {
        if (keysToHandle.indexOf(e.key) !== -1) {
            e.preventDefault();
            const selectionJson = Selection.getUserSelection().toJson();
            const action = { type: 'input', selection: selectionJson, str: e.key };
            const { doc, selection } = yield editor.editor.actions.dispatch(action);
            editor.setState(() => ({ doc }));
            if (selection)
                Selection.setCaret(selection.focusNode, selection.focusOffset);
        }
    });
}

const eventHandlers = [
    ['onBeforeInput', handleBeforeInput],
    ['onKeyDown', handleKeyDown],
];
function getEventHandlers(editor) {
    return eventHandlers
        .map(([eventName, handler]) => {
        return [eventName, (event) => handler(editor, event)];
    })
        .reduce((acc, [eventName, handler]) => {
        return Object.assign({}, acc, { [eventName]: handler });
    }, {});
}

class Editor extends React.Component {
    constructor(...args) {
        super(...args);
        this.editor = Verne__default.fromHtml(this.props.html);
        this.state = { doc: this.editor.doc };
        this.eventHandlers = getEventHandlers(this);
        this.contentEditableProps = { contentEditable: true, suppressContentEditableWarning: true, spellCheck: false };
    }
    static renderNode(node) {
        if (node instanceof Verne.Block)
            return React.createElement(Block, {key: node.id, node: node});
        if (node instanceof Verne.Text)
            return React.createElement(Inline, {key: node.id, node: node});
    }
    render() {
        if (debug.log.docRendering) {
            console.groupCollapsed('%cRendering %cDoc    %c%d', 'color: gray; font-weight: lighter;', 'color: black; font-weight: bold;', 'color: blue;', this.state.doc.id);
            console.log(this.state.doc);
            console.groupEnd();
        }
        return (React.createElement("div", __assign({}, this.contentEditableProps, this.eventHandlers), this.state.doc.children().map(node => Editor.renderNode(node))));
    }
}

return Editor;

})));
