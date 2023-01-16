import { render, cleanup } from "@testing-library/react";
import { FormElementWrapper } from ".";

describe("Form Element wrapper should render with class name of abc", () => {
  afterEach(cleanup);

  test("should have classNames it's been passed to", () => {
    const component = render(<FormElementWrapper className="abc" />);

    expect(component.container.getElementsByClassName("abc").length).toBe(1);
  });
});
