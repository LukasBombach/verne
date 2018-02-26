import Verne from "./verne";
import Doc from "./document/doc";
import Selection from "./selection";
import middlewares from './middleware';

export interface ActionResult {
  doc: Doc;
  selection: Selection
}

export default class Actions {

  private verne: Verne;
  private composedMiddlewares: Function;

  constructor(verne: Verne) {
    this.composedMiddlewares = this.composeMiddlewares(middlewares, verne);
    this.verne = verne;
  }

  public dispatch(originalAction: any): Promise<ActionResult> {
    return new Promise(resolve => this.composedMiddlewares(async (finalAction: any) => {
      const { doc, selection } = await this.verne.doc.transform(finalAction);
      this.verne.doc = doc;
      resolve({ doc, selection });
      return { doc, selection };
    })(originalAction));
  }

  private composeMiddlewares(middlewares: Function[], verne: Verne): Function {
    if (middlewares.length === 0) return (arg: any) => arg;
    if (middlewares.length === 1) return middlewares[0];
    return middlewares
      .map(middleware => middleware(verne))
      .reduce((a, b) => (...args: any[]) => a(b(...args)));
  }

}
