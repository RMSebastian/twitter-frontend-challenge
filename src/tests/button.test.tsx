import Button from "../components/button/Button";
import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonType } from "../components/button/StyledButton";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "../util/LightTheme";

describe("<Button/>", () => {
  test("render <Button/> component", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <Button
          size={"100px"}
          buttonType={ButtonType.DEFAULT}
          text={"test"}
        ></Button>
      </ThemeProvider>
    );
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("test")).not.toBeDisabled();
  });

  test("disabling <Button/> component", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <Button
          text="test"
          size={"100px"}
          buttonType={ButtonType.DEFAULT}
          disabled={true}
        />
      </ThemeProvider>
    );

    expect(screen.getByText("test")).toBeDisabled();
  });

  test("functioning <Button/> component", () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider theme={LightTheme}>
        <Button
          text="test"
          size={"100px"}
          buttonType={ButtonType.DEFAULT}
          onClick={handleClick}
        />
      </ThemeProvider>
    );
    expect(screen.getByText("test")).toBeEnabled();
    fireEvent.click(screen.getByText("test"));
    expect(handleClick).toHaveBeenCalled();
  });
});
