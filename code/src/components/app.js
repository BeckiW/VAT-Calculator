import React from "react"
import { exVatToIncVat, incVatToExtVat } from "../calculations"

class App extends React.Component {

  constructor(props) {
  super(props)
  this.state = {
    vatRate: 25,
    incVat: 0,
    exVat: 0,
    customPercentage: 0,
    userInputIncVat: ""
  }
}

handleRadioChange = (event) => {
    const vat = Number(event.target.value)
    if (this.state.userInputIncVat) {
      this.setState({
        percentageVat: vat,
        exVat: incVatToExtVat(vat, this.state.incVat).toFixed(2)
      })
    } else {
      this.setState({
        percentageVat: vat,
        incVat: exVatToIncVat(vat, this.state.exVat).toFixed(2)
      })
    }
}

handleIncVatChange = (event) => {
    const incVat = Number(event.target.value)
    this.setState({
      incVat,
      exVat: incVatToExtVat(this.state.percentageVat, incVat).toFixed(2),
      userInputIncVat: true
    })
  }

  handleExVatChange = (event) => {
    const exVat = Number(event.target.value)
    this.setState({
      incVat: exVatToIncVat(this.state.percentageVat, exVat).toFixed(2),
      exVat,
      userInputIncVat: false
    })
}

  setCustomPercentage = (event) => {
    const customPercentage = Number(event.target.value)
    this.setState({
      customPercentage,
      percentageVat: customPercentage
    })
    this.handleRadioChange(event)
  }


  render() {

    console.log(this.state.percentageVat)
    return (
      <div className="App">

       <h1>VAT Calculator</h1>
       <h3> The fastest way to calculate what VAT you will pay. </h3>
       <h4> Calculate what the VAT will be (0%, 6%, 12%, 25% or a custom amount) with our calculator. Select the VAT rate and you will see what the sum will be excluding and including VAT.

       Equally, fill in one of the amounts (including or excluding VAT) and you will see what it is excluding or including VAT.</h4>

      <form>

      <section>

      <div classname="radio-buttons">
        <div>
          <label htmlFor="vat25">25%?</label>
          <input
          name ="vatRadio"
            id="vat25"
            type="radio"
            value="25"
            checked={this.state.percentageVat === 25}
            onChange={this.handleRadioChange}
          />
        </div>


          <div>
            <label htmlFor="vat12">12%?</label>
            <input
              name ="vatRadio"
              id="vat12"
              type="radio"
              value="12"
              checked={this.state.percentageVat === 12}
              onChange={this.handleRadioChange}
            />
          </div>


        <div>
          <label htmlFor="vat6">6%?</label>
          <input
            name ="vatRadio"
            id="vat6"
            type="radio"
            value="6"
            checked={this.state.percentageVat === 6}
            onChange={this.handleRadioChange}
             />
        </div>

        <div>
          <label htmlFor="vatNone">None</label>
          <input
            name ="vatRadio"
            id="vatNone"
            type="radio"
            value="0"
            checked={this.state.percentageVAT === 0}
            onChange={this.handleRadioChange}  />
        </div>

          <div >
            <label htmlFor="vatCustom">Custom</label>
            <input
              name ="vatRadio"
              id="vatCustom"
              type="radio"
              value={`${this.state.customPercentage}`}
              checked={this.state.percentageVat === Number(`${this.state.customPercentage}`)}
              onChange={this.handleRadioChange}
              onClick={this.setCustomPercentage} />
        <input
              id="customPercentage"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="0"
              value={this.state.customPercentage}
              onChange={this.setCustomPercentage} />
        </div>

</div>

</section>

<section>

                          <div>
                            <label htmlFor="ink">Including VAT (kr)</label>
                            <input
                              id="ink"
                              type="number"
                              name="incVatField"
                              value={this.state.incVat}
                              onChange={this.handleIncVatChange} />
                          </div>

                          </section>
                          <section>

                          <div className="field">
                            <label htmlFor="exk">Excluding VAT (kr):</label>
                            <input
                              id="exk"
                              type="number"
                              name="exVatField"
                              value={this.state.exVat}
                              onChange={this.handleExVatChange} />
        </div>

</section>


<section>
        <div>
               <label htmlFor="moms">VAT Amount (kr):</label>
               <input
                 id="moms"
                 type="number"
                 name="totalVatField"
                 value={(this.state.incVat - this.state.exVat).toFixed(2)}
                 readOnly="readOnly" />
</div>
</section>

      </form>

    </div>



    )
  }

}

export default App
