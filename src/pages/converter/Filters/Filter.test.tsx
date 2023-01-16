import { render, cleanup } from "@testing-library/react";
import Filters from "@/pages/converter/Filters/index";

describe("Filters", () => {
  afterEach(cleanup);

  test("should have classNames it's been passed to", () => {
    const component = render(<Filters className="abc" currentState={{ amount: 1 }} />);

    expect(component.container.getElementsByClassName("abc").length).toBe(0);
  });
});
