( async function () {
  await mainContainer()
  let foodsurvey = document.getElementById('foodsurvey')
  foodsurvey.addEventListener('submit', function (event) {
    let cuisines = document.querySelectorAll('input[name="mealCuisine"]:checked')
    let prefhelp = document.getElementById('prefhelp')
    if (!foodsurvey.checkValidity() || cuisines.length < 2) {
      event.preventDefault()
      event.stopPropagation()
      cuisines.length < 2 ? prefhelp.classList.add('text-danger') : prefhelp.classList.remove('text-danger')
      foodsurvey.classList.add('was-validated')
    }
    else {
      event.preventDefault()
      let formdata = new FormData(document.getElementById('foodsurvey'))
      let json = {}
      for (let key of formdata.keys()) {
        json[key] = formdata.getAll(key).join(', ')
      }
      foodsurvey.classList.remove('was-validated')
      prefhelp.classList.remove('text-danger')
      foodsurvey.reset();
      addToList(json)
    }
  }, false)
})()

async function addToList(data) {
  try {
    let formFirstName = data.formFirstName
    let formLastName = data.formLastName
    let gender = data.gender
    let formAddress = data.formAddress
    let city = data.city
    let state = data.state
    let country = data.country
    let zip = data.zip
    let mealCuisine = data.mealCuisine
    let resp = await fetch(`https://60f30ed76d44f300177888b3.mockapi.io/foodsurvey`, { method: 'POST', body: JSON.stringify({ formFirstName, formLastName,  gender,formAddress,city,state,country,zip,mealCuisine}), headers: { "Content-Type": "application/json" } })
    let respdata = await resp.json();
    getList();
  } catch (error) {
    console.log(error);
  }
}

//fetch to get list from mockapi
async function getList() {
  let resp = await fetch('https://60f30ed76d44f300177888b3.mockapi.io/foodsurvey')
  let data = await resp.json();
  updateList(data)
}
//renders the list
function updateList(data) {
  let cardresponses = document.getElementById('cardresponses')
  data.length !== 0 ? cardresponses.innerHTML = '' : cardresponses.innerHTML = `<div class='mb-4'>No responses recorded yet</div>`;
  for (let index = data.length; index > 0; index--) {
    const element = data[index-1]
    cardresponses.innerHTML += `
    <div class="col">
      <div class="card mb-3 bg-light">
        <div class="card-body">
          <h6 class="card-title mb-0">Name:</h6>
          <p class="card-text mb-2">${element.formFirstName} ${element.formLastName}</p>
          <h6 class="card-title mb-0 mt-2">Gender:</h6>
          <p class="card-text  mb-2">${element.gender}</p>
          <h6 class="card-title mb-0 mt-2">Address:</h6>
          <p class="card-text  mb-2">${element.formAddress} <br> ${element.city}, ${element.state}, ${element.country} ${element.zip}</p>
          <h6 class="card-title mb-0 mt-2">Cuisine Preferences:</h6>
          <p class="card-text  mb-2">${element.mealCuisine}</p>
        </div>
      </div>
    </div>`;
  }
}
getList();


async function mainContainer(){
let main = document.getElementById('main')

main.innerHTML = `<div class="row">
<div class="col-lg-5">
  <form
    class="bg-light p-5 needs-validation"
    id="foodsurvey"
    novalidate
  >
    <div class="border-bottom border-2 border-secondary mb-2">
      <h4>
        <b>Personal</b>
      </h4>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="formFirstName"
        placeholder="John"
        name="formFirstName"
        required
      />
      <label for="formFirstName">First Name</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="formLastName"
        placeholder="Smith"
        name="formLastName"
        required
      />
      <label for="formLastName">Last Name</label>
    </div>
    <div>
      <h5>Gender</h5>
    </div>

    <div class="form-check ms-2">
      <input
        class="form-check-input"
        type="radio"
        name="gender"
        id="radioMale"
        value="male"
        required
      />
      <label class="form-check-label" for="radioMale"> Male </label>
    </div>
    <div class="form-check ms-2">
      <input
        class="form-check-input"
        type="radio"
        name="gender"
        id="radioFemale"
        value="female"
        required
      />
      <label class="form-check-label" for="radioFemale"> Female </label>
    </div>
    <div class="form-check ms-2">
      <input
        class="form-check-input"
        type="radio"
        name="gender"
        id="radioOther"
        value="other"
        required
      />
      <label class="form-check-label" for="radioOther"> Other </label>
    </div>
    <div class="form-check ms-2">
      <input
        class="form-check-input"
        type="radio"
        name="gender"
        id="radioNotSay"
        value="Prefer not to say"
        required
        checked
      />
      <label class="form-check-label" for="radioNotSay">
        Prefer not to say
      </label>
    </div>
    <div class="border-bottom border-2 border-secondary mb-2 mt-4">
      <h4>
        <b>Contact</b>
      </h4>
    </div>
    <div class="form-floating mb-3">
      <textarea
        class="form-control address"
        placeholder="1020, Bronx, New York"
        id="formAddress"
        name="formAddress"
        required
      ></textarea>
      <label for="formAddress">Address</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="city"
        placeholder="Austin"
        name="city"
        required
      />
      <label for="City">City</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="zip"
        placeholder="Smith"
        pattern="[0-9]*"
        name="zip"
        required
      />
      <label for="zip">Zipcode</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="state"
        placeholder="Texas"
        name="state"
        required
      />
      <label for="State">State</label>
    </div>
    <div class="country form-floating">
      <select name="country" class="form-select" id="country" required>
        <option value="" label="Select a country... " selected disabled>
          Select a country...
        </option>
        <optgroup id="country-optgroup-Africa" label="Africa">
          <option value="DZ" label="Algeria">Algeria</option>
          <option value="AO" label="Angola">Angola</option>
          <option value="BJ" label="Benin">Benin</option>
          <option value="BW" label="Botswana">Botswana</option>
          <option value="BF" label="Burkina Faso">Burkina Faso</option>
          <option value="BI" label="Burundi">Burundi</option>
          <option value="CM" label="Cameroon">Cameroon</option>
          <option value="CV" label="Cape Verde">Cape Verde</option>
          <option value="CF" label="Central African Republic">
            Central African Republic
          </option>
          <option value="TD" label="Chad">Chad</option>
          <option value="KM" label="Comoros">Comoros</option>
          <option value="CG" label="Congo - Brazzaville">
            Congo - Brazzaville
          </option>
          <option value="CD" label="Congo - Kinshasa">
            Congo - Kinshasa
          </option>
          <option value="CI" label="Côte d’Ivoire">
            Côte d’Ivoire
          </option>
          <option value="DJ" label="Djibouti">Djibouti</option>
          <option value="EG" label="Egypt">Egypt</option>
          <option value="GQ" label="Equatorial Guinea">
            Equatorial Guinea
          </option>
          <option value="ER" label="Eritrea">Eritrea</option>
          <option value="ET" label="Ethiopia">Ethiopia</option>
          <option value="GA" label="Gabon">Gabon</option>
          <option value="GM" label="Gambia">Gambia</option>
          <option value="GH" label="Ghana">Ghana</option>
          <option value="GN" label="Guinea">Guinea</option>
          <option value="GW" label="Guinea-Bissau">
            Guinea-Bissau
          </option>
          <option value="KE" label="Kenya">Kenya</option>
          <option value="LS" label="Lesotho">Lesotho</option>
          <option value="LR" label="Liberia">Liberia</option>
          <option value="LY" label="Libya">Libya</option>
          <option value="MG" label="Madagascar">Madagascar</option>
          <option value="MW" label="Malawi">Malawi</option>
          <option value="ML" label="Mali">Mali</option>
          <option value="MR" label="Mauritania">Mauritania</option>
          <option value="MU" label="Mauritius">Mauritius</option>
          <option value="YT" label="Mayotte">Mayotte</option>
          <option value="MA" label="Morocco">Morocco</option>
          <option value="MZ" label="Mozambique">Mozambique</option>
          <option value="NA" label="Namibia">Namibia</option>
          <option value="NE" label="Niger">Niger</option>
          <option value="NG" label="Nigeria">Nigeria</option>
          <option value="RW" label="Rwanda">Rwanda</option>
          <option value="RE" label="Réunion">Réunion</option>
          <option value="SH" label="Saint Helena">Saint Helena</option>
          <option value="SN" label="Senegal">Senegal</option>
          <option value="SC" label="Seychelles">Seychelles</option>
          <option value="SL" label="Sierra Leone">Sierra Leone</option>
          <option value="SO" label="Somalia">Somalia</option>
          <option value="ZA" label="South Africa">South Africa</option>
          <option value="SD" label="Sudan">Sudan</option>
          <option value="SZ" label="Swaziland">Swaziland</option>
          <option value="ST" label="São Tomé and Príncipe">
            São Tomé and Príncipe
          </option>
          <option value="TZ" label="Tanzania">Tanzania</option>
          <option value="TG" label="Togo">Togo</option>
          <option value="TN" label="Tunisia">Tunisia</option>
          <option value="UG" label="Uganda">Uganda</option>
          <option value="EH" label="Western Sahara">
            Western Sahara
          </option>
          <option value="ZM" label="Zambia">Zambia</option>
          <option value="ZW" label="Zimbabwe">Zimbabwe</option>
        </optgroup>
        <optgroup id="country-optgroup-Americas" label="Americas">
          <option value="AI" label="Anguilla">Anguilla</option>
          <option value="AG" label="Antigua and Barbuda">
            Antigua and Barbuda
          </option>
          <option value="AR" label="Argentina">Argentina</option>
          <option value="AW" label="Aruba">Aruba</option>
          <option value="BS" label="Bahamas">Bahamas</option>
          <option value="BB" label="Barbados">Barbados</option>
          <option value="BZ" label="Belize">Belize</option>
          <option value="BM" label="Bermuda">Bermuda</option>
          <option value="BO" label="Bolivia">Bolivia</option>
          <option value="BR" label="Brazil">Brazil</option>
          <option value="VG" label="British Virgin Islands">
            British Virgin Islands
          </option>
          <option value="CA" label="Canada">Canada</option>
          <option value="KY" label="Cayman Islands">
            Cayman Islands
          </option>
          <option value="CL" label="Chile">Chile</option>
          <option value="CO" label="Colombia">Colombia</option>
          <option value="CR" label="Costa Rica">Costa Rica</option>
          <option value="CU" label="Cuba">Cuba</option>
          <option value="DM" label="Dominica">Dominica</option>
          <option value="DO" label="Dominican Republic">
            Dominican Republic
          </option>
          <option value="EC" label="Ecuador">Ecuador</option>
          <option value="SV" label="El Salvador">El Salvador</option>
          <option value="FK" label="Falkland Islands">
            Falkland Islands
          </option>
          <option value="GF" label="French Guiana">
            French Guiana
          </option>
          <option value="GL" label="Greenland">Greenland</option>
          <option value="GD" label="Grenada">Grenada</option>
          <option value="GP" label="Guadeloupe">Guadeloupe</option>
          <option value="GT" label="Guatemala">Guatemala</option>
          <option value="GY" label="Guyana">Guyana</option>
          <option value="HT" label="Haiti">Haiti</option>
          <option value="HN" label="Honduras">Honduras</option>
          <option value="JM" label="Jamaica">Jamaica</option>
          <option value="MQ" label="Martinique">Martinique</option>
          <option value="MX" label="Mexico">Mexico</option>
          <option value="MS" label="Montserrat">Montserrat</option>
          <option value="AN" label="Netherlands Antilles">
            Netherlands Antilles
          </option>
          <option value="NI" label="Nicaragua">Nicaragua</option>
          <option value="PA" label="Panama">Panama</option>
          <option value="PY" label="Paraguay">Paraguay</option>
          <option value="PE" label="Peru">Peru</option>
          <option value="PR" label="Puerto Rico">Puerto Rico</option>
          <option value="BL" label="Saint Barthélemy">
            Saint Barthélemy
          </option>
          <option value="KN" label="Saint Kitts and Nevis">
            Saint Kitts and Nevis
          </option>
          <option value="LC" label="Saint Lucia">Saint Lucia</option>
          <option value="MF" label="Saint Martin">Saint Martin</option>
          <option value="PM" label="Saint Pierre and Miquelon">
            Saint Pierre and Miquelon
          </option>
          <option value="VC" label="Saint Vincent and the Grenadines">
            Saint Vincent and the Grenadines
          </option>
          <option value="SR" label="Suriname">Suriname</option>
          <option value="TT" label="Trinidad and Tobago">
            Trinidad and Tobago
          </option>
          <option value="TC" label="Turks and Caicos Islands">
            Turks and Caicos Islands
          </option>
          <option value="VI" label="U.S. Virgin Islands">
            U.S. Virgin Islands
          </option>
          <option value="US" label="United States">
            United States
          </option>
          <option value="UY" label="Uruguay">Uruguay</option>
          <option value="VE" label="Venezuela">Venezuela</option>
        </optgroup>
        <optgroup id="country-optgroup-Asia" label="Asia">
          <option value="AF" label="Afghanistan">Afghanistan</option>
          <option value="AM" label="Armenia">Armenia</option>
          <option value="AZ" label="Azerbaijan">Azerbaijan</option>
          <option value="BH" label="Bahrain">Bahrain</option>
          <option value="BD" label="Bangladesh">Bangladesh</option>
          <option value="BT" label="Bhutan">Bhutan</option>
          <option value="BN" label="Brunei">Brunei</option>
          <option value="KH" label="Cambodia">Cambodia</option>
          <option value="CN" label="China">China</option>
          <option value="GE" label="Georgia">Georgia</option>
          <option value="HK" label="Hong Kong SAR China">
            Hong Kong SAR China
          </option>
          <option value="IN" label="India">India</option>
          <option value="ID" label="Indonesia">Indonesia</option>
          <option value="IR" label="Iran">Iran</option>
          <option value="IQ" label="Iraq">Iraq</option>
          <option value="IL" label="Israel">Israel</option>
          <option value="JP" label="Japan">Japan</option>
          <option value="JO" label="Jordan">Jordan</option>
          <option value="KZ" label="Kazakhstan">Kazakhstan</option>
          <option value="KW" label="Kuwait">Kuwait</option>
          <option value="KG" label="Kyrgyzstan">Kyrgyzstan</option>
          <option value="LA" label="Laos">Laos</option>
          <option value="LB" label="Lebanon">Lebanon</option>
          <option value="MO" label="Macau SAR China">
            Macau SAR China
          </option>
          <option value="MY" label="Malaysia">Malaysia</option>
          <option value="MV" label="Maldives">Maldives</option>
          <option value="MN" label="Mongolia">Mongolia</option>
          <option value="MM" label="Myanmar [Burma]">
            Myanmar [Burma]
          </option>
          <option value="NP" label="Nepal">Nepal</option>
          <option value="NT" label="Neutral Zone">Neutral Zone</option>
          <option value="KP" label="North Korea">North Korea</option>
          <option value="OM" label="Oman">Oman</option>
          <option value="PK" label="Pakistan">Pakistan</option>
          <option value="PS" label="Palestinian Territories">
            Palestinian Territories
          </option>
          <option
            value="YD"
            label="People's Democratic Republic of Yemen"
          >
            People's Democratic Republic of Yemen
          </option>
          <option value="PH" label="Philippines">Philippines</option>
          <option value="QA" label="Qatar">Qatar</option>
          <option value="SA" label="Saudi Arabia">Saudi Arabia</option>
          <option value="SG" label="Singapore">Singapore</option>
          <option value="KR" label="South Korea">South Korea</option>
          <option value="LK" label="Sri Lanka">Sri Lanka</option>
          <option value="SY" label="Syria">Syria</option>
          <option value="TW" label="Taiwan">Taiwan</option>
          <option value="TJ" label="Tajikistan">Tajikistan</option>
          <option value="TH" label="Thailand">Thailand</option>
          <option value="TL" label="Timor-Leste">Timor-Leste</option>
          <option value="TR" label="Turkey">Turkey</option>
          <option value="TM" label="Turkmenistan">Turkmenistan</option>
          <option value="AE" label="United Arab Emirates">
            United Arab Emirates
          </option>
          <option value="UZ" label="Uzbekistan">Uzbekistan</option>
          <option value="VN" label="Vietnam">Vietnam</option>
          <option value="YE" label="Yemen">Yemen</option>
        </optgroup>
        <optgroup id="country-optgroup-Europe" label="Europe">
          <option value="AL" label="Albania">Albania</option>
          <option value="AD" label="Andorra">Andorra</option>
          <option value="AT" label="Austria">Austria</option>
          <option value="BY" label="Belarus">Belarus</option>
          <option value="BE" label="Belgium">Belgium</option>
          <option value="BA" label="Bosnia and Herzegovina">
            Bosnia and Herzegovina
          </option>
          <option value="BG" label="Bulgaria">Bulgaria</option>
          <option value="HR" label="Croatia">Croatia</option>
          <option value="CY" label="Cyprus">Cyprus</option>
          <option value="CZ" label="Czech Republic">
            Czech Republic
          </option>
          <option value="DK" label="Denmark">Denmark</option>
          <option value="DD" label="East Germany">East Germany</option>
          <option value="EE" label="Estonia">Estonia</option>
          <option value="FO" label="Faroe Islands">
            Faroe Islands
          </option>
          <option value="FI" label="Finland">Finland</option>
          <option value="FR" label="France">France</option>
          <option value="DE" label="Germany">Germany</option>
          <option value="GI" label="Gibraltar">Gibraltar</option>
          <option value="GR" label="Greece">Greece</option>
          <option value="GG" label="Guernsey">Guernsey</option>
          <option value="HU" label="Hungary">Hungary</option>
          <option value="IS" label="Iceland">Iceland</option>
          <option value="IE" label="Ireland">Ireland</option>
          <option value="IM" label="Isle of Man">Isle of Man</option>
          <option value="IT" label="Italy">Italy</option>
          <option value="JE" label="Jersey">Jersey</option>
          <option value="LV" label="Latvia">Latvia</option>
          <option value="LI" label="Liechtenstein">
            Liechtenstein
          </option>
          <option value="LT" label="Lithuania">Lithuania</option>
          <option value="LU" label="Luxembourg">Luxembourg</option>
          <option value="MK" label="Macedonia">Macedonia</option>
          <option value="MT" label="Malta">Malta</option>
          <option value="FX" label="Metropolitan France">
            Metropolitan France
          </option>
          <option value="MD" label="Moldova">Moldova</option>
          <option value="MC" label="Monaco">Monaco</option>
          <option value="ME" label="Montenegro">Montenegro</option>
          <option value="NL" label="Netherlands">Netherlands</option>
          <option value="NO" label="Norway">Norway</option>
          <option value="PL" label="Poland">Poland</option>
          <option value="PT" label="Portugal">Portugal</option>
          <option value="RO" label="Romania">Romania</option>
          <option value="RU" label="Russia">Russia</option>
          <option value="SM" label="San Marino">San Marino</option>
          <option value="RS" label="Serbia">Serbia</option>
          <option value="CS" label="Serbia and Montenegro">
            Serbia and Montenegro
          </option>
          <option value="SK" label="Slovakia">Slovakia</option>
          <option value="SI" label="Slovenia">Slovenia</option>
          <option value="ES" label="Spain">Spain</option>
          <option value="SJ" label="Svalbard and Jan Mayen">
            Svalbard and Jan Mayen
          </option>
          <option value="SE" label="Sweden">Sweden</option>
          <option value="CH" label="Switzerland">Switzerland</option>
          <option value="UA" label="Ukraine">Ukraine</option>
          <option
            value="SU"
            label="Union of Soviet Socialist Republics"
          >
            Union of Soviet Socialist Republics
          </option>
          <option value="GB" label="United Kingdom">
            United Kingdom
          </option>
          <option value="VA" label="Vatican City">Vatican City</option>
          <option value="AX" label="Åland Islands">
            Åland Islands
          </option>
        </optgroup>
        <optgroup id="country-optgroup-Oceania" label="Oceania">
          <option value="AS" label="American Samoa">
            American Samoa
          </option>
          <option value="AQ" label="Antarctica">Antarctica</option>
          <option value="AU" label="Australia">Australia</option>
          <option value="BV" label="Bouvet Island">
            Bouvet Island
          </option>
          <option value="IO" label="British Indian Ocean Territory">
            British Indian Ocean Territory
          </option>
          <option value="CX" label="Christmas Island">
            Christmas Island
          </option>
          <option value="CC" label="Cocos [Keeling] Islands">
            Cocos [Keeling] Islands
          </option>
          <option value="CK" label="Cook Islands">Cook Islands</option>
          <option value="FJ" label="Fiji">Fiji</option>
          <option value="PF" label="French Polynesia">
            French Polynesia
          </option>
          <option value="TF" label="French Southern Territories">
            French Southern Territories
          </option>
          <option value="GU" label="Guam">Guam</option>
          <option value="HM" label="Heard Island and McDonald Islands">
            Heard Island and McDonald Islands
          </option>
          <option value="KI" label="Kiribati">Kiribati</option>
          <option value="MH" label="Marshall Islands">
            Marshall Islands
          </option>
          <option value="FM" label="Micronesia">Micronesia</option>
          <option value="NR" label="Nauru">Nauru</option>
          <option value="NC" label="New Caledonia">
            New Caledonia
          </option>
          <option value="NZ" label="New Zealand">New Zealand</option>
          <option value="NU" label="Niue">Niue</option>
          <option value="NF" label="Norfolk Island">
            Norfolk Island
          </option>
          <option value="MP" label="Northern Mariana Islands">
            Northern Mariana Islands
          </option>
          <option value="PW" label="Palau">Palau</option>
          <option value="PG" label="Papua New Guinea">
            Papua New Guinea
          </option>
          <option value="PN" label="Pitcairn Islands">
            Pitcairn Islands
          </option>
          <option value="WS" label="Samoa">Samoa</option>
          <option value="SB" label="Solomon Islands">
            Solomon Islands
          </option>
          <option value="TK" label="Tokelau">Tokelau</option>
          <option value="TO" label="Tonga">Tonga</option>
          <option value="TV" label="Tuvalu">Tuvalu</option>
          <option value="UM" label="U.S. Minor Outlying Islands">
            U.S. Minor Outlying Islands
          </option>
          <option value="VU" label="Vanuatu">Vanuatu</option>
          <option value="WF" label="Wallis and Futuna">
            Wallis and Futuna
          </option>
        </optgroup>
      </select>
      <label for="country">Country</label>
    </div>
    <div class="border-bottom border-2 border-secondary mb-2 mt-4">
      <h4>
        <b>Food Preferences</b>
      </h4>
    </div>
    <div>
      <h5>Please select your cuisine preferences</h5>
    </div>
    <div id="prefhelp" class="form-text mb-2">
      Please select atleast two cuisines.
    </div>
    <div class="form-check ms-2">
      <input
        class="form-check-input"
        type="checkbox"
        value="Indian"
        id="indian"
        name="mealCuisine"
      />
      <label class="form-check-label" for="indian">
        &#127835; Indian
      </label>
    </div>
    <div class="form-check ms-2">
      <input
        class="form-check-input no-validate"
        type="checkbox"
        value="Japanese"
        id="japanese"
        name="mealCuisine"
      />
      <label class="form-check-label no-validate" for="japanese">
        &#127843; Japanese
      </label>
    </div>
    <div class="form-check ms-2">
      <input
        class="form-check-input"
        type="checkbox"
        value="Desi Chinese"
        id="desichinese"
        name="mealCuisine"
      />
      <label class="form-check-label" for="desichinese">
        &#127857; Desi Chinese
      </label>
    </div>
    <div class="form-check ms-2">
      <input
        class="form-check-input"
        type="checkbox"
        value="Italian"
        id="italian"
        name="mealCuisine"
      />
      <label class="form-check-label" for="italian">
        &#127829; Italian
      </label>
    </div>
    <div class="form-check ms-2">
      <input
        class="form-check-input"
        type="checkbox"
        value="American"
        id="american"
        name="mealCuisine"
      />
      <label class="form-check-label" for="american">
        &#127828; American
      </label>
    </div>
    <div class="buttons btn-group d-flex justify-content-end mt-4">
      <button class="btn btn-primary me-1" type="submit">
        Save Preferences
      </button>
      <button class="btn btn-outline-secondary" type="reset">
        Clear
      </button>
    </div>
  </form>
</div>
<div class="col-lg-7 pt-3 pt-lg-5">
  <header class=" mb-4 border-bottom border-secondary border-2"><h4><b>Food Survey Responses</b></h4></header>
  <div class="row row-cols-1 row-cols-sm-2" id="cardresponses">
  </div>
</div>
</div>`
}