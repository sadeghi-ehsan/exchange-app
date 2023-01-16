import { render, cleanup } from "@testing-library/react";
import { Divider } from ".";

describe("Divider", () => {
  afterEach(cleanup);

  test("should have classNames it's been passed to", () => {
    const component = render(<Divider className="abc" />);

    expect(component.container.getElementsByClassName("abc").length).toBe(1);
  });
});

/**
 *
 * 1.if the divider is vertical then its width should be 0
 *   and if it's horizontal then its height should be 0
 *
 * 2.it should accept additional and customizable classNames from its parent like border color
 *
 * 3.if it's vertical then its parent should be flex with row flex direction
 *   and if it's horizontal its parent should be either of display block or flex direction of column
 *
 */
