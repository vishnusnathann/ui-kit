import * as React from "react";
import { cx } from "emotion";
import { checkbox, checkboxIconContainer } from "../style";
import {
  toggleInput,
  toggleInputApperances
} from "../../shared/styles/formStyles";
import { ToggleInput } from "../../toggleInput";
import { Icon } from "../../icon";
import { visuallyHidden, display } from "../../shared/styles/styleUtils";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import { iconSizeXs, white } from "../../design-tokens/build/js/designTokens";
import {
  ToggleInputAppearance,
  ToggleInputProps
} from "../../toggleInput/components/ToggleInput";

export interface CheckboxInputState {
  hasFocus: boolean;
}

export interface CheckboxInputProps extends ToggleInputProps {
  value: string;
}

class CheckboxInput extends React.PureComponent<
  CheckboxInputProps,
  CheckboxInputState
> {
  public static defaultProps: Partial<CheckboxInputProps> = {
    appearance: ToggleInputAppearance.Standard
  };

  constructor(props) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      hasFocus: false
    };
  }

  public render() {
    const {
      appearance,
      checked,
      id,
      inputLabel,
      showInputLabel,
      vertAlign,
      disabled,
      value,
      ...other
    } = this.props;
    delete other.onFocus;
    delete other.onBlur;

    return (
      <ToggleInput
        appearance={appearance}
        disabled={disabled}
        id={id}
        inputLabel={inputLabel}
        showInputLabel={showInputLabel}
        vertAlign={vertAlign}
      >
        <div
          className={cx(toggleInput, checkbox, {
            [toggleInputApperances[`${this.props.appearance}-focus`]]: this
              .state.hasFocus,
            [toggleInputApperances[`${this.props.appearance}-active`]]: checked,
            [toggleInputApperances["focus-active"]]:
              checked && this.state.hasFocus,
            [toggleInputApperances.disabled]: disabled,
            [toggleInputApperances["disabled-active"]]: disabled && checked
          })}
        >
          {/* tslint:disable react-a11y-role-has-required-aria-props */}
          <input
            type="checkbox"
            id={id}
            className={visuallyHidden}
            checked={checked}
            disabled={disabled}
            value={value}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...other}
          />
          {/* tslint:enable */}

          {checked && (
            <span className={cx(checkboxIconContainer, display("inline-flex"))}>
              <Icon shape={SystemIcons.Check} size={iconSizeXs} color={white} />
            </span>
          )}
        </div>
      </ToggleInput>
    );
  }

  private handleFocus(e) {
    this.setState({ hasFocus: true });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  private handleBlur(e) {
    this.setState({ hasFocus: false });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }
}

export default CheckboxInput;
