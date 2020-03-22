import Component from "./Component";
import { KeyDownEvent } from "../events";

export default class Text extends Component<{ text: string }> {
  async keyDown({ offset, str }: KeyDownEvent): Promise<Text> {
    const oldText = this.props.text;
    const text = oldText.slice(0, offset) + str + oldText.slice(offset);
    return new Text({ text });
  }

  render() {
    return this.props.text;
  }
}
