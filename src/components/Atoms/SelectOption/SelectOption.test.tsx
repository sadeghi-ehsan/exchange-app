import { render, cleanup } from "@testing-library/react";
import { SelectOption } from ".";

describe("SelectOption should render with clas name of abc", () => {
  afterEach(cleanup);

  test("should have classNames it's been passed to", () => {
    const component = render(<SelectOption className="abc" />);

    expect(component.container.getElementsByClassName("abc").length).toBe(1);
  });
});
