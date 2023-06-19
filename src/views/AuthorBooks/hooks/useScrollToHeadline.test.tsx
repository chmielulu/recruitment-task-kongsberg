import { render } from "@testing-library/react";
import { useScrollToHeadline } from "./useScrollToHeadline";
import { useEffect } from "react";

it("it scrolls to element when fn is executed", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  const TestComponent = () => {
    const { ref, handleAnimationComplete } = useScrollToHeadline();

    useEffect(() => {
      handleAnimationComplete();
    }, [handleAnimationComplete]);

    return (
      <div>
        <h2 ref={ref}>test</h2>
      </div>
    );
  };

  expect(document.documentElement.scrollTop).toEqual(0);
  render(<TestComponent />);
  expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
});
