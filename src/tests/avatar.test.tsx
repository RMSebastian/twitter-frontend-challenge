import Button from "../components/button/Button";
import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonType } from "../components/button/StyledButton";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "../util/LightTheme";
import Avatar from "../components/common/avatar/Avatar";
import Icon from "../assets/icon.png";

describe("<Avatar/>", () => {
  test("render <Avatar/> component", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <Avatar src={Icon} alt={"name"} />
      </ThemeProvider>
    );
    expect(screen.getByAltText("name")).toBeInTheDocument();
    expect(screen.getByAltText("name")).toBeInTheDocument();
  });

  test("attributes <Avatar/> component", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <Avatar src={Icon} alt="name" width="100px" height="100px" />
      </ThemeProvider>
    );

    const styledAvatarContainer = screen.getByTestId("avatar-container");

    if (!styledAvatarContainer) {
      throw new Error("Container not found");
    }
    const imgElement = styledAvatarContainer.querySelector("img");

    expect(styledAvatarContainer).toHaveStyle("max-width: 100px");
    expect(styledAvatarContainer).toHaveStyle("min-width: 100px");
    expect(styledAvatarContainer).toHaveStyle("height: 100px");
    expect(styledAvatarContainer).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("alt", "name");
  });

  test("actu <Avatar/> component", () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider theme={LightTheme}>
        <Avatar src={Icon} alt="name" onClick={handleClick} />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByAltText("name"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test("src string is equal to null in <Avartar/> component", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <Avatar src={""} alt="name" />
      </ThemeProvider>
    );
    expect(screen.getByTestId("name-image")).toBeInTheDocument();
  });
  test("default <Avatar/> component values", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <Avatar src={Icon} alt="name" />
      </ThemeProvider>
    );

    const styledAvatarContainer = screen.getByTestId("avatar-container");

    expect(styledAvatarContainer).toHaveStyle("max-width: 48px");
    expect(styledAvatarContainer).toHaveStyle("min-width: 48px");
    expect(styledAvatarContainer).toHaveStyle("height: 48px");
  });
});
