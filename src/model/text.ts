import Component from "./component";
import { KeyDownEvent } from "../event";

export interface TextProps {
  text: string;
}

export default class Text extends Component {
  readonly text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }

  async keyDown({ offset, str }: KeyDownEvent): Promise<Text> {
    const oldText = this.text;
    const text = oldText.slice(0, offset) + str + oldText.slice(offset);
    return new Text(text);
  }

  render() {
    return this.text;
  }
}
