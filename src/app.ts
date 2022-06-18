export class App {
  private container: HTMLElement | null = document.querySelector(
    "#en-range-slider"
  ) as HTMLDivElement;

  private options: { [key: string]: string } = {
    min: "5", // Minimum value of the range
    minMessage: "Please insert a minimum of 5 Euro", // Message to display when the minimum value is reached
    max: "100", // Maximum value of the range
    maxMessage:
      "You can donate as much as you like, please insert the amount of your choice below", // Message to display when the maximum value is reached
    step: "1", // Increment of the range
    defaultAmount: "10", // Default amount
    currencySymbol: "", // Default currency symbol
    currencyPosition: "left", // Currency position
    form: "true", // Show form
    oneTimeLabel: "", // Label for the one time donation
    monthlyLabel: "", // Label for the monthly donation
    annualLabel: "", // Label for the annually donation
    colorBg: "", // Background color
    colorTxt: "", // Text color
    colorFormTxt: "", // Text color of the form
    colorThumb: "", // Slider Thumb color
    colorThumbHover: "", // Slider Thumb hover color
    colorThumbActive: "", // Slider Thumb active color
  };

  constructor() {
    this.log("EN Range Slider: Debug mode is on");
    if (!this.shouldRun()) {
      this.log("EN Range Slider Not Running");
      return;
    }

    // Document Load
    if (document.readyState !== "loading") {
      this.run();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        this.run();
      });
    }
  }

  private get currency() {
    if (this.options.currencySymbol !== "") return this.options.currencySymbol;
    const currency = document.querySelector(
      "[name='transaction.paycurrency']"
    ) as HTMLInputElement;
    const currencies = {
      EUR: "€",
      USD: "$",
      GBP: "£",
    };
    return currency && currency.value in currencies
      ? currencies[currency.value as keyof typeof currencies]
      : "$";
  }

  private shouldRun(): boolean {
    return this.container !== null && !!this.getPageId();
  }

  private getPageId() {
    if ("pageJson" in window) return (window as any)?.pageJson?.campaignPageId;
    return 0;
  }

  private isDebug() {
    const regex = new RegExp("[\\?&]debug=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  private run() {
    this.log("EN Range Slider Running");
    this.loadOptions();
    this.renderCustomColors();
    this.renderRangeSlider();
    this.addEvents();
    this.calculateAmountPosition();
    this.addLiveVariables();
    this.updateLiveVariables("TOTAL", this.options.defaultAmount);
    this.updateLiveVariables("FREQUENCY", this.options.oneTimeLabel);
  }
  renderRangeSlider() {
    const slider = document.createElement("div");
    slider.classList.add("en-range-slider");
    slider.innerHTML = `
      <div class="en-range-slider__container">
        <div class="en-range-slider__min currency-${this.options.currencyPosition}">
          <span class="en-range-slider__currency">${this.currency}</span>
          <span class="en-range-slider__min-value">${this.options.min}</span>
        </div>
        <output class="en-range-slider__amount currency-${this.options.currencyPosition}">
          <span class="en-range-slider__currency">${this.currency}</span>
          <span class="en-range-slider__amount-value">${this.options.defaultAmount}</span>
        </output>
        <div class="en-range-slider__range">
          <input type="range" class="en-range-slider__range-input" min="${this.options.min}" max="${this.options.max}" step="${this.options.step}" value="${this.options.defaultAmount}">
        </div>
        <div class="en-range-slider__max currency-${this.options.currencyPosition}">
          <span class="en-range-slider__currency">${this.currency}</span>
          <span class="en-range-slider__max-value">${this.options.max}</span>
        </div>
      </div>
      <div class="en-range-slider__min-message">${this.options.minMessage}</div>
      <div class="en-range-slider__max-message">${this.options.maxMessage}</div>
    `;
    this.container.appendChild(slider);
    if (this.options.form === "true") {
      const sliderForm = document.createElement("div");
      sliderForm.classList.add("en-range-slider-form");
      sliderForm.innerHTML = `
    <div class="en-range-slider__form-container">
        <div class="en-range-slider__form-amount currency-${
          this.options.currencyPosition
        }">
          <span class="en-range-slider__currency">${this.currency}</span>
          <input type="text" class="en-range-slider__form-amount-input" placeholder="Amount" value="${
            this.options.defaultAmount
          }" autocomplete="off" data-lpignore="true" inputmode="decimal">
        </div>
        <div class="en-range-slider__form-frequency">
          ${this.getFrequency("oneTimeLabel")}
          ${this.getFrequency("monthlyLabel")}
          ${this.getFrequency("annualLabel")}       
        </div>
      </div>
    `;
      this.container.appendChild(sliderForm);
    }
  }
  private loadOptions() {
    const options = this.container?.dataset;
    if (options) {
      for (const key in options) {
        if (key in this.options) {
          this.options[key] = options[key];
          this.log(`EN Range Slider: ${key} = ${options[key]}`);
        }
      }
    }
  }
  private renderCustomColors() {
    if (this.options.colorBg !== "") {
      document.documentElement.style.setProperty(
        "--en-range-slider-color-bg",
        this.options.colorBg
      );
    }
    if (this.options.colorTxt !== "") {
      document.documentElement.style.setProperty(
        "--en-range-slider-color-txt",
        this.options.colorTxt
      );
    }
    if (this.options.colorFormTxt !== "") {
      document.documentElement.style.setProperty(
        "--en-range-slider-color-form-txt",
        this.options.colorFormTxt
      );
    }
    if (this.options.colorThumb !== "") {
      document.documentElement.style.setProperty(
        "--en-range-slider-color-thumb",
        this.options.colorThumb
      );
    }
    if (this.options.colorThumbHover !== "") {
      document.documentElement.style.setProperty(
        "--en-range-slider-color-thumb-hover",
        this.options.colorThumbHover
      );
    }
    if (this.options.colorThumbActive !== "") {
      document.documentElement.style.setProperty(
        "--en-range-slider-color-thumb-active",
        this.options.colorThumbActive
      );
    }
  }
  private addEvents() {
    const rangeInput = this.container?.querySelector(
      ".en-range-slider__range-input"
    ) as HTMLInputElement;
    const formAmountInput = this.container?.querySelector(
      ".en-range-slider__form-amount-input"
    ) as HTMLInputElement;
    const formFrequencyInputs = this.container?.querySelectorAll(
      ".en-range-slider__form-frequency-input"
    ) as NodeListOf<HTMLInputElement>;

    if (rangeInput) {
      rangeInput.addEventListener("input", () => {
        this.calculateAmountPosition();
      });
    }
    if (formAmountInput) {
      formAmountInput.addEventListener("change", () => {
        if (+formAmountInput.value < +this.options.min) {
          formAmountInput.value = this.options.min;
        }
        this.calculateAmountPosition(formAmountInput.value);
      });
    }
    if (formFrequencyInputs) {
      formFrequencyInputs.forEach((input) => {
        input.addEventListener("change", () => {
          (window as any).EngagingNetworks.require._defined.enjs.setFieldValue(
            "recurrfreq",
            input.value
          );
          this.updateLiveVariables(
            "FREQUENCY",
            input.parentNode.querySelector(
              ".en-range-slider__form-frequency-label-text"
            )?.innerHTML ?? ""
          );
        });
      });
    }
    window.addEventListener("resize", () => {
      this.calculateAmountPosition();
    });
  }
  private calculateAmountPosition(amount = "") {
    this.hideWarning();
    const rangeInput = this.container?.querySelector(
      ".en-range-slider__range-input"
    ) as HTMLInputElement;
    const output = this.container?.querySelector(
      ".en-range-slider__amount-value"
    ) as HTMLSpanElement;
    const amountContainer = this.container?.querySelector(
      ".en-range-slider__amount"
    ) as HTMLOutputElement;

    const maxContainer = this.container?.querySelector(
      ".en-range-slider__max"
    ) as HTMLDivElement;
    const minContainer = this.container?.querySelector(
      ".en-range-slider__min"
    ) as HTMLDivElement;

    const maxAmount = maxContainer.querySelector(
      ".en-range-slider__max-value"
    ) as HTMLSpanElement;

    if (amount) {
      if (parseFloat(amount) > parseFloat(this.options.max)) {
        rangeInput.max = parseInt(amount).toString();
        maxAmount.innerHTML = amount;
      } else {
        rangeInput.max = this.options.max;
        maxAmount.innerHTML = this.options.max;
      }
      rangeInput.value = amount;
    }

    const amountContainerPosition =
      ((+rangeInput.value - +rangeInput.min) /
        (+rangeInput.max - +rangeInput.min)) *
        (rangeInput.offsetWidth - 30 - 30) +
      30;

    if (output && amountContainer) {
      amountContainer.style.left = `${
        amountContainerPosition < 30 ? 30 : amountContainerPosition
      }px`;
      output.innerText = rangeInput.value;
      // Set the Engaging Networks Amount
      if (amount) {
        (window as any).EngagingNetworks.require._defined.enjs.setFieldValue(
          "donationAmt",
          parseFloat(amount).toFixed(2)
        );
      } else {
        (window as any).EngagingNetworks.require._defined.enjs.setFieldValue(
          "donationAmt",
          rangeInput.value
        );
      }

      if (!amount) {
        const amountInput = this.container?.querySelector(
          ".en-range-slider__form-amount-input"
        ) as HTMLInputElement;
        if (amountInput) amountInput.value = rangeInput.value;
      }
    }
    if (maxContainer) {
      maxContainer.style.opacity =
        parseInt(rangeInput.value) > parseInt(rangeInput.max) - 15 ? "0" : "1";
    }
    if (minContainer) {
      minContainer.style.opacity = amountContainerPosition < 64 ? "0" : "1";
    }
    if (rangeInput.value === rangeInput.min) this.showMinWarning();
    if (rangeInput.value === rangeInput.max) this.showMaxWarning();
    this.updateLiveVariables(
      "TOTAL",
      (window as any).EngagingNetworks.require._defined.enjs.getDonationTotal()
    );
  }
  private showMinWarning() {
    const minWarning = this.container?.querySelector(
      ".en-range-slider__min-message"
    ) as HTMLDivElement;
    if (minWarning) {
      minWarning.classList.add("show");
    }
  }
  private showMaxWarning() {
    const maxWarning = this.container?.querySelector(
      ".en-range-slider__max-message"
    ) as HTMLDivElement;
    if (maxWarning) {
      maxWarning.classList.add("show");
    }
  }
  private hideWarning() {
    const minWarning = this.container?.querySelector(
      ".en-range-slider__min-message"
    ) as HTMLDivElement;
    const maxWarning = this.container?.querySelector(
      ".en-range-slider__max-message"
    ) as HTMLDivElement;
    if (minWarning && maxWarning) {
      minWarning.classList.remove("show");
      maxWarning.classList.remove("show");
    }
  }
  private getFrequency(
    frequency: "oneTimeLabel" | "monthlyLabel" | "annualLabel"
  ) {
    if (this.options[frequency] === "") return "";
    switch (frequency) {
      case "oneTimeLabel":
        return `
          <label class="en-range-slider__form-frequency-label">
            <input type="radio" class="en-range-slider__form-frequency-input" name="frequency" value="ONETIME" checked>
            <span class="en-range-slider__form-frequency-label-text">${this.options.oneTimeLabel}</span>
          </label>
          `;
      case "monthlyLabel":
        return `
          <label class="en-range-slider__form-frequency-label">
            <input type="radio" class="en-range-slider__form-frequency-input" name="frequency" value="MONTHLY">
            <span class="en-range-slider__form-frequency-label-text">${this.options.monthlyLabel}</span>
          </label>
        `;
      case "annualLabel":
        return `
        <label class="en-range-slider__form-frequency-label">
          <input type="radio" class="en-range-slider__form-frequency-input" name="frequency" value="ANNUAL">
          <span class="en-range-slider__form-frequency-label-text">${this.options.annualLabel}</span>
        </label>
        `;
    }
  }

  private addLiveVariables() {
    const textComponents = document.querySelectorAll(
      ".en__component--copyblock, .en__component--codeblock, .en__submit button"
    ) as NodeListOf<HTMLDivElement>;
    if (textComponents.length > 0) {
      textComponents.forEach((component) => {
        if (component.innerText.includes("[[")) {
          const liveVariables = component.innerText.match(/\[\[(.*?)\]\]/g);
          if (liveVariables) {
            liveVariables.forEach((variable) => {
              const variableName = variable
                .replace(/\[\[/g, "")
                .replace(/\]\]/g, "");
              // console.log(variableName);
              component.innerHTML = component.innerHTML.replace(
                `[[${variableName}]]`,
                "<span class='en-live-variable' data-variable='" +
                  variableName +
                  "'></span>"
              );
            });
          }
        }
      });
    }
  }

  private updateLiveVariables(variableName: string, value: string) {
    const liveVariables = document.querySelectorAll(
      ".en-live-variable[data-variable='" + variableName + "']"
    ) as NodeListOf<HTMLDivElement>;
    if (liveVariables.length > 0) {
      liveVariables.forEach((variable) => {
        variable.innerText = value;
      });
    }
  }

  private log(message: string) {
    if (this.isDebug())
      console.log(
        `%c${message}`,
        "color: white; background: red; font-size: 1.2rem; font-weight: bold; padding: 2px; border-radius: 2px;"
      );
  }
}
