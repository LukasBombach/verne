import {MouseEvent} from "react";
import Node from '../../../document/node';
import Selection from '../selection';
import WriteSelection from '../../../selection';
import Editor from "../components/editor";

export default async function handleOnClick(editor: Editor, e: MouseEvent<Node>) {

  const selection = WriteSelection.fromJson(Selection.getUserSelection().toJson());
  const firstNode = selection.firstNode;
  const lastNode = selection.lastNode;


  // console.log(Node.nodesBetween(firstNode, lastNode));


  const map = new Map<Node, Node[]>();
  const tuples = Node.nodesBetween(firstNode, lastNode).map(node => [node.parent(), node]);
  tuples.forEach(([parent]) => map.set(parent, []));
  tuples.forEach(([parent, node]) => map.get(parent).push(node));

  for (const tuple of map) {
    const [parent, children] = tuple;
    console.log(parent);
    console.log(children);
  }

  // console.log(map);


}