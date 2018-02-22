import {debug} from "../config";
import WriteEditor from "../write_editor";

export default (editor: WriteEditor) => (next: Function) => async (action: any) => {

  const prevDoc = editor.doc;
  const nextDoc = await next(action);

  if (debug.log.transformations) {
    console.group('%cTransformation%c %s', 'color: gray; font-weight: lighter;', 'color: inherit;', action.type);
    console.log('%c prev doc: %O', 'color: #9E9E9E;', prevDoc);
    console.log('%c action:   %O', 'color: #03A9F4;', action);
    console.log('%c next doc: %O', 'color: #4CAF50;', nextDoc);
    console.groupEnd();
  }

  return nextDoc;

}
