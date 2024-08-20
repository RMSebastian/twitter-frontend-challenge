import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "../util/LightTheme";
import Reaction from "../components/tweet/reaction/Reaction";
import { IconType } from "../components/icon/Icon";

describe("<Reaction/>", () => {
  test("renders <Reaction/> component", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <Reaction
          img={IconType.LIKE}
          count={5}
          reacted={false}
          reactionFunction={jest.fn()}
          increment={1}
        />
      </ThemeProvider>
    );
    const reactionElement = screen.getByText("5");
    const svgElement = screen.getByTestId("svg-like-icon");
    expect(svgElement).toBeInTheDocument();
    expect(reactionElement).toBeInTheDocument();
  });

  test("handling event in <Reaction/> component", async () => {
    const mockReactionFunction = jest.fn();
    render(
      <ThemeProvider theme={LightTheme}>
        <Reaction
          img={IconType.LIKE}
          count={5}
          reacted={false}
          reactionFunction={mockReactionFunction}
          increment={1}
        />
      </ThemeProvider>
    );
    const svgElement = screen.getByTestId("svg-like-icon");

    fireEvent.click(svgElement);

    const reactionNewElementText = await screen.findByText("6");
    expect(mockReactionFunction).toHaveBeenCalledTimes(1);
    expect(reactionNewElementText).toHaveTextContent("6");
  });
});
