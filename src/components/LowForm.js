import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";


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
    const formInput2 = `
    Here is a phone conversation between two people. We are trying to prevent scammers.
    Can you analyze the phone conversation give one of the following answers: "POTENTIAL SCAMMER",
    "DEFINETELY A SCAMMER", "SAFE". If you the input you receive is not a phone conversation, then reply
    by saying "CAN YOU PLEASE SUBMIT A PHONE CONVERSATION?". Please do not write anything else. Only use the words 
    and sentences I shared. Here is the phone conversation: ${contractCode}
    `; 
    const response = await openai.createCompletion({
        prompt: formInput2,
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

      <h2>SUBMIT PHONE DIALOGUE</h2>
      <form onSubmit={handleSubmit} className='contractSubmitForm'>
          <textarea type="text" value={contractCode} onChange={ e => setContractCode(e.target.value) } required></textarea>
          {disableButton7 === true ? 
            <input type="submit" value="Wait..." disabled className='button-87'/>
          :
            <input type="submit" value="Send" className='button-87'/>
          }
          
      </form>
      <p>{responseChatgpt}</p>
    </div>
  )
}

export default LowForm;

