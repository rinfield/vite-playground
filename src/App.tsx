import { useState } from 'react'
import './App.css'

function Input({ id, label, value, setState }: {
  id: string,
  label: string,
  value: string,
  setState: React.Dispatch<React.SetStateAction<string>>
}) {
  return <div>
    <label>{label}: </label>
    <input type="text" id={id} name={id} value={value} onChange={event => setState(event.target.value)} />
  </div>;
}

function Link({ customScheme, userId, issuer, secret }: { customScheme: string, userId: string, issuer: string, secret: string }) {
  if (userId === "" || secret === "") {
    return <div>必須事項が足りません</div>
  }
  let otpRegistrationUrl = `${customScheme}://totp/${userId}?secret=${secret}`
  if (issuer) {
    const urlEncodedIssuer = encodeURI(issuer);
    otpRegistrationUrl = `${otpRegistrationUrl}&issuer=${urlEncodedIssuer}`
  }
  return <div><a href={otpRegistrationUrl}>OTP登録</a></div>

}

function App() {
  const [customScheme, setCustomScheme] = useState("otpauth")
  const [userId, setUserId] = useState("")
  const [issuer, setIssuer] = useState("")
  const [secret, setSecret] = useState("")

  return (
    <>
      <Input id="custom-scheme" label="Custom Scheme" value={customScheme} setState={setCustomScheme} />
      <Input id="userid" label="User ID" value={userId} setState={setUserId} />
      <Input id="secret" label="Secret" value={secret} setState={setSecret} />
      <Input id="issuer" label="Issuer (Optional)" value={issuer} setState={setIssuer} />

      <Link customScheme={customScheme} userId={userId} issuer={issuer} secret={secret} />
    </>
  )
}

export default App
