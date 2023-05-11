import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import AudioPlayer from "./AudioPlayer";

function LowForm() {

  let[contractCode, setContractCode] = useState("");
  let[responseChatgpt, setResponseChatgpt] = useState("");
  let[disableButton7, setDisableButton7] = useState(false);

  const api = process.env.REACT_APP_CHATGPT_API;
  const configuration = new Configuration({apiKey: api});
  const openai = new OpenAIApi(configuration);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableButton7(true);

{/*

    const formInput = ` ${contractCode} `;
    const formInput2 = `
    Imagine you are smart contract auditor. Take a look at the contract that I will be sharing below.
    Then try to see loopholes inside the contract. What are the weak points that hackers can exploit? Also,
    if you detect some vulnerabilities of the contract, mention them and provide solutions and suggestions.
    Tell us which lines of code should we check, what are the vulnerabilities. However,
    if you do not see any vulnerability, you can praise. For example, you can say "it is good that you put 
    require statement here....". Write 8 to 12 sentences in total. Half of them should be about the vulnerabilities.
    And the other half should be praising the contract code. Do not use repetitive sentences.
    Here is contract: ${contractCode}
  `; 
*/}
    const response = await openai.createCompletion({
        prompt: "how are you",
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 1000
    });
    const message = response.data.choices[0].text;
    setResponseChatgpt(message);
    setDisableButton7(false);
  }

  



  return (

    <div className='smallFormDiv'>

      <h2>SUBMIT YOUR CONTRACT</h2>
      <p>Before submitting the contract, please make sure you upload only one contract at a time. Do not upload multiple contracts.
      </p>
      <form onSubmit={handleSubmit} className='contractSubmitForm'>
          <textarea type="text" value={contractCode} onChange={ e => setContractCode(e.target.value) } required></textarea>
          {disableButton7 === true ? 
            <input type="submit" value="Wait..." disabled className='button-87'/>
          :
            <input type="submit" value="Send" className='button-87'/>
          }
          
      </form>
      <p>{responseChatgpt}</p>
     <AudioPlayer />
    </div>
  )
}

export default LowForm;

