import { Component, createElement } from 'react';
import { findDOMNode } from 'react-dom';
import Verne, { Block, Text } from '@verne/verne';

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

class Text$1 extends Component {
    constructor() {
        super(...arguments);
        this.domNode = null;
    }
    componentDidMount() {
        NodeMap.set(findDOMNode(this), this.props.node);
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.node.id !== this.props.node.id;
    }
    componentWillUnmount() {
        NodeMap.delete(findDOMNode(this));
    }
    componentDidUpdate() {
        NodeMap.delete(this.domNode);
        NodeMap.set(findDOMNode(this), this.props.node);
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

class Inline extends Component {
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
            .reduce((Prev, Cur) => createElement(Cur, null, Prev), createElement(Text$1, { node: this.props.node }));
    }
}
Inline.attrElMap = {
    bold: 'strong',
    italic: 'em',
    del: 'del',
};

class Block$1 extends Component {
    static renderChild(node) {
        if (node instanceof Block)
            return createElement(Block$1, { key: node.id, node: node });
        if (node instanceof Text)
            return createElement(Inline, { key: node.id, node: node });
    }
    render() {
        const { node, node: { tagName: BlockTag } } = this.props;
        if (debug.log.docRendering) {
            console.groupCollapsed('%cRendering %cBlock  %c%d %c%s', 'color: gray; font-weight: lighter;', 'color: black; font-weight: bold;', 'color: blue;', node.id, 'color: gray; font-weight: lighter;', node.tagName);
            console.log(node);
            console.groupEnd();
        }
        return (createElement(BlockTag, null, node.children().map(child => Block$1.renderChild(child))));
    }
}

class Selection {
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
    constructor(anchorNode, focusNode, anchorOffset, focusOffset) {
        this.anchorNode = anchorNode;
        this.focusNode = focusNode;
        this.anchorOffset = anchorOffset;
        this.focusOffset = focusOffset;
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

class Editor extends Component {
    constructor() {
        super(...arguments);
        this.editor = Verne.fromHtml(this.props.html);
        this.state = { doc: this.editor.doc };
        this.eventHandlers = getEventHandlers(this);
        this.contentEditableProps = { contentEditable: true, suppressContentEditableWarning: true, spellCheck: false };
    }
    static renderNode(node) {
        if (node instanceof Block)
            return createElement(Block$1, { key: node.id, node: node });
        if (node instanceof Text)
            return createElement(Inline, { key: node.id, node: node });
    }
    render() {
        if (debug.log.docRendering) {
            console.groupCollapsed('%cRendering %cDoc    %c%d', 'color: gray; font-weight: lighter;', 'color: black; font-weight: bold;', 'color: blue;', this.state.doc.id);
            console.log(this.state.doc);
            console.groupEnd();
        }
        return (createElement("div", Object.assign({}, this.contentEditableProps, this.eventHandlers), this.state.doc.children().map(node => Editor.renderNode(node))));
    }
}

export default Editor;
